package mirrg.xarpite.cli

import mirrg.xarpite.RuntimeContext
import mirrg.xarpite.compilers.objects.FluoriteFunction
import mirrg.xarpite.compilers.objects.FluoriteNull
import mirrg.xarpite.compilers.objects.FluoriteObject
import mirrg.xarpite.compilers.objects.FluoriteStream
import mirrg.xarpite.compilers.objects.FluoriteValue
import mirrg.xarpite.compilers.objects.asFluoriteBlob
import mirrg.xarpite.compilers.objects.collect
import mirrg.xarpite.compilers.objects.iterateBlobs
import mirrg.xarpite.compilers.objects.toFluoriteArray
import mirrg.xarpite.compilers.objects.toFluoriteStream
import mirrg.xarpite.compilers.objects.toFluoriteString
import mirrg.xarpite.compilers.objects.toMutableList
import mirrg.xarpite.getEnv
import mirrg.xarpite.getFileSystem
import mirrg.xarpite.mounts.usage
import mirrg.xarpite.operations.FluoriteException
import okio.Path.Companion.toPath

val INB_MAX_BUFFER_SIZE = 8192

context(context: RuntimeContext)
fun createCliMounts(args: List<String>): List<Map<String, FluoriteValue>> {
    return mapOf(
        "ARGS" to args.map { it.toFluoriteString() }.toFluoriteArray(),
        "ENV" to FluoriteObject(FluoriteObject.fluoriteClass, getEnv().mapValues { it.value.toFluoriteString() }.toMutableMap()),
        "IN" to FluoriteStream {
            while (true) {
                val line = context.io.readLineFromStdin() ?: break
                emit(line.toFluoriteString())
            }
        },
        "INB" to FluoriteStream {
            while (true) {
                val bytes = context.io.readBytesFromStdin() ?: break
                emit(bytes.asFluoriteBlob())
            }
        },
        "ERR" to FluoriteFunction { arguments ->
            arguments.forEach {
                if (it is FluoriteStream) {
                    it.collect { item ->
                        context.io.err(item)
                    }
                } else {
                    context.io.err(it)
                }
            }
            FluoriteNull
        },
        "OUTB" to FluoriteFunction { arguments ->
            if (arguments.size != 1) usage("OUTB(blobLike: BLOB_LIKE): NULL")
            iterateBlobs(arguments[0]) { bytes ->
                context.io.writeBytesToStdout(bytes)
            }
            FluoriteNull
        },
        "ERRB" to FluoriteFunction { arguments ->
            if (arguments.size != 1) usage("ERRB(blobLike: BLOB_LIKE): NULL")
            iterateBlobs(arguments[0]) { bytes ->
                context.io.writeBytesToStderr(bytes)
            }
            FluoriteNull
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
            val output = context.io.executeProcess(process, processArgs)

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
