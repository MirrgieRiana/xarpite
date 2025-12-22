package mirrg.xarpite.cli

import executeProcess
import getEnv
import getFileSystem
import mirrg.xarpite.compilers.objects.FluoriteFunction
import mirrg.xarpite.compilers.objects.FluoriteObject
import mirrg.xarpite.compilers.objects.FluoriteStream
import mirrg.xarpite.compilers.objects.FluoriteValue
import mirrg.xarpite.compilers.objects.asFluoriteBlob
import mirrg.xarpite.compilers.objects.toFluoriteArray
import mirrg.xarpite.compilers.objects.toFluoriteStream
import mirrg.xarpite.compilers.objects.toFluoriteString
import mirrg.xarpite.compilers.objects.toMutableList
import mirrg.xarpite.mounts.usage
import mirrg.xarpite.operations.FluoriteException
import okio.Path.Companion.toPath
import readBytesFromStdin
import readLineFromStdin

val INB_MAX_BUFFER_SIZE = 8192

fun createCliMounts(args: List<String>): List<Map<String, FluoriteValue>> {
    return mapOf(
        "ARGS" to args.map { it.toFluoriteString() }.toFluoriteArray(),
        "ENV" to FluoriteObject(FluoriteObject.fluoriteClass, getEnv().mapValues { it.value.toFluoriteString() }.toMutableMap()),
        "IN" to FluoriteStream {
            while (true) {
                val line = readLineFromStdin() ?: break
                emit(line.toFluoriteString())
            }
        },
        "INB" to FluoriteStream {
            while (true) {
                val bytes = readBytesFromStdin() ?: break
                @OptIn(ExperimentalUnsignedTypes::class)
                emit(bytes.asUByteArray().asFluoriteBlob())
            }
        },
        "READ" to FluoriteFunction { arguments ->
            if (arguments.size != 1) usage("READ(file: STRING): STREAM<STRING>")
            val file = arguments[0].toFluoriteString().value
            val fileSystem = getFileSystem().getOrThrow()
            FluoriteStream {
                fileSystem.read(file.toPath()) { // TODO charset
                    while (true) {
                        val line = readUtf8Line() ?: break
                        emit(line.toFluoriteString())
                    }
                }
            }
        },
        "FILES" to FluoriteFunction { arguments ->
            if (arguments.size != 1) usage("FILES(dir: STRING): STREAM<STRING>")
            val dir = arguments[0].toFluoriteString().value
            val fileSystem = getFileSystem().getOrThrow()
            fileSystem.list(dir.toPath()).map { it.name.toFluoriteString() }.toFluoriteStream()
        },
        "EXEC" to FluoriteFunction { arguments ->
            if (arguments.size != 1) usage("EXEC(command: STREAM<STRING>): STREAM<STRING>")
            
            val commandArg = arguments[0]
            val commandList = if (commandArg is FluoriteStream) {
                commandArg.toMutableList().map { it.toFluoriteString().value }
            } else {
                listOf(commandArg.toFluoriteString().value)
            }
            
            if (commandList.isEmpty()) {
                throw FluoriteException("EXEC requires at least one argument (the command to execute)".toFluoriteString())
            }
            
            val process = commandList[0]
            val processArgs = commandList.drop(1)
            val output = executeProcess(process, processArgs)
            
            val lines = output.lines()
            val nonEmptyLines = if (lines.isNotEmpty() && lines.last().isEmpty()) {
                lines.dropLast(1)
            } else {
                lines
            }
            nonEmptyLines.map { it.toFluoriteString() }.toFluoriteStream()
        },
    ).let { listOf(it) }
}
