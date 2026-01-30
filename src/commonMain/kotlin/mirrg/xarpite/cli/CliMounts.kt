package mirrg.xarpite.cli

import mirrg.kotlin.helium.notBlankOrNull
import mirrg.xarpite.LazyMount
import mirrg.xarpite.Mount
import mirrg.xarpite.RuntimeContext
import mirrg.xarpite.compilers.objects.FluoriteArray
import mirrg.xarpite.compilers.objects.FluoriteFunction
import mirrg.xarpite.compilers.objects.FluoriteNull
import mirrg.xarpite.compilers.objects.FluoriteObject
import mirrg.xarpite.compilers.objects.FluoriteStream
import mirrg.xarpite.compilers.objects.FluoriteString
import mirrg.xarpite.compilers.objects.FluoriteValue
import mirrg.xarpite.compilers.objects.asFluoriteBlob
import mirrg.xarpite.compilers.objects.collect
import mirrg.xarpite.compilers.objects.iterateBlobs
import mirrg.xarpite.compilers.objects.toFluoriteArray
import mirrg.xarpite.compilers.objects.toFluoriteStream
import mirrg.xarpite.compilers.objects.toFluoriteString
import mirrg.xarpite.compilers.objects.toMutableList
import mirrg.xarpite.define
import mirrg.xarpite.getEnv
import mirrg.xarpite.getFileSystem
import mirrg.xarpite.mounts.usage
import mirrg.xarpite.operations.FluoriteException
import okio.Path.Companion.toPath

val INB_MAX_BUFFER_SIZE = 8192

context(context: RuntimeContext)
fun createCliMounts(args: List<String>): List<Map<String, Mount>> {
    return mapOf(
        "ARGS" define LazyMount { args.map { it.toFluoriteString() }.toFluoriteArray() },
        "PWD" define LazyMount { (getEnv()["XARPITE_PWD"]?.notBlankOrNull ?: getEnv()["PWD"]?.notBlankOrNull ?: context.io.getPwd()).toFluoriteString() },
        "ENV" define LazyMount { FluoriteObject(FluoriteObject.fluoriteClass, getEnv().mapValues { it.value.toFluoriteString() }.toMutableMap()) },
        *run {
            val inStream = FluoriteStream {
                while (true) {
                    val line = context.io.readLineFromStdin() ?: break
                    emit(line.toFluoriteString())
                }
            }
            arrayOf(
                "IN" define inStream,
                "I" define inStream,
            )
        },
        "INB" define FluoriteStream {
            while (true) {
                val bytes = context.io.readBytesFromStdin() ?: break
                emit(bytes.asFluoriteBlob())
            }
        },
        "ERR" define FluoriteFunction { arguments ->
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
        "OUTB" define FluoriteFunction { arguments ->
            if (arguments.size != 1) usage("OUTB(blobLike: BLOB_LIKE): NULL")
            iterateBlobs(arguments[0]) { bytes ->
                context.io.writeBytesToStdout(bytes)
            }
            FluoriteNull
        },
        "ERRB" define FluoriteFunction { arguments ->
            if (arguments.size != 1) usage("ERRB(blobLike: BLOB_LIKE): NULL")
            iterateBlobs(arguments[0]) { bytes ->
                context.io.writeBytesToStderr(bytes)
            }
            FluoriteNull
        },
        "READ" define FluoriteFunction { arguments ->
            if (arguments.size != 1) usage("READ(file: STRING): STREAM<STRING>")
            val file = arguments[0].toFluoriteString(null).value
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
        "READB" define FluoriteFunction { arguments ->
            if (arguments.size != 1) usage("READB(file: STRING): STREAM<BLOB>")
            val file = arguments[0].toFluoriteString(null).value
            val fileSystem = getFileSystem().getOrThrow()
            FluoriteStream {
                fileSystem.read(file.toPath()) {
                    while (true) {
                        val byteArray = ByteArray(INB_MAX_BUFFER_SIZE)
                        val readSize = read(byteArray)
                        if (readSize == -1) break
                        val byteArray2 = if (readSize == INB_MAX_BUFFER_SIZE) byteArray else byteArray.copyOf(readSize)
                        emit(byteArray2.asFluoriteBlob())
                    }
                }
            }
        },
        "FILES" define FluoriteFunction { arguments ->
            if (arguments.size != 1) usage("FILES(dir: STRING): STREAM<STRING>")
            val dir = arguments[0].toFluoriteString(null).value
            val fileSystem = getFileSystem().getOrThrow()
            fileSystem.list(dir.toPath()).map { it.name.toFluoriteString() }.toFluoriteStream()
        },
        "EXEC" define FluoriteFunction { arguments ->
            fun usage(): Nothing = usage("EXEC(command: STREAM<STRING>[; env: OBJECT<STRING>]): STREAM<STRING>")
            suspend fun parseEnvOverrides(argument: FluoriteValue): Map<String, String?> {
                val envEntry = argument as? FluoriteArray ?: usage()
                if (envEntry.values.size != 2) usage()
                val envKey = envEntry.values[0] as? FluoriteString ?: usage()
                if (envKey.value != "env") usage()
                val envObject = envEntry.values[1] as? FluoriteObject ?: usage()
                return envObject.map.mapValues { entry ->
                    val value = entry.value
                    if (value is FluoriteNull) {
                        null
                    } else {
                        value.toFluoriteString(null).value
                    }
                }
            }
            val (commandArg, env) = when (arguments.size) {
                1 -> Pair(arguments[0], emptyMap())
                2 -> Pair(arguments[0], parseEnvOverrides(arguments[1]))
                else -> usage()
            }
            val commandList = if (commandArg is FluoriteStream) {
                commandArg.toMutableList().map { it.toFluoriteString(null).value }
            } else {
                listOf(commandArg.toFluoriteString(null).value)
            }

            if (commandList.isEmpty()) {
                throw FluoriteException("EXEC requires at least one argument (the command to execute)".toFluoriteString())
            }

            val process = commandList[0]
            val processArgs = commandList.drop(1)
            val output = context.io.executeProcess(process, processArgs, env)

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
