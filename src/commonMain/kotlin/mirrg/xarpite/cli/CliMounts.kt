package mirrg.xarpite.cli

import mirrg.kotlin.helium.notBlankOrNull
import mirrg.xarpite.LazyMount
import mirrg.xarpite.Mount
import mirrg.xarpite.RuntimeContext
import mirrg.xarpite.compilers.objects.FluoriteFunction
import mirrg.xarpite.compilers.objects.FluoriteNull
import mirrg.xarpite.compilers.objects.FluoriteObject
import mirrg.xarpite.compilers.objects.FluoriteStream
import mirrg.xarpite.compilers.objects.FluoriteValue
import mirrg.xarpite.compilers.objects.asFluoriteBlob
import mirrg.xarpite.compilers.objects.collect
import mirrg.xarpite.compilers.objects.iterateBlobs
import mirrg.xarpite.compilers.objects.toFlow
import mirrg.xarpite.compilers.objects.toFluoriteArray
import mirrg.xarpite.compilers.objects.toFluoriteStream
import mirrg.xarpite.compilers.objects.toFluoriteString
import mirrg.xarpite.compilers.objects.toMutableList
import mirrg.xarpite.define
import mirrg.xarpite.getEnv
import mirrg.xarpite.getFileSystem
import mirrg.xarpite.mounts.usage
import mirrg.xarpite.operations.FluoriteException
import mirrg.xarpite.partitionIfEntry
import okio.Path.Companion.toPath

val INB_MAX_BUFFER_SIZE = 8192

context(context: RuntimeContext)
fun createCliMounts(args: List<String>): List<Map<String, Mount>> {
    return mapOf(
        "ARGS" define LazyMount { args.map { it.toFluoriteString() }.toFluoriteArray() },
        "PWD" define LazyMount {
            val env = getEnv()
            (env["XARPITE_PWD"]?.notBlankOrNull ?: env["PWD"]?.notBlankOrNull ?: context.io.getPwd()).toFluoriteString()
        },
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
        "WRITE" define FluoriteFunction { arguments ->
            if (arguments.size != 2) usage("WRITE(file: STRING; string: STRING): NULL")
            val file = arguments[0].toFluoriteString(null).value
            val string = arguments[1].toFluoriteString(null).value
            val fileSystem = getFileSystem().getOrThrow()
            fileSystem.write(file.toPath()) {
                writeUtf8(string)
            }
            FluoriteNull
        },
        "WRITEL" define FluoriteFunction { arguments ->
            if (arguments.size != 2) usage("WRITEL(file: STRING; lines: STREAM<STRING>): NULL")
            val file = arguments[0].toFluoriteString(null).value
            val lines = arguments[1].toFlow()
            val fileSystem = getFileSystem().getOrThrow()
            fileSystem.write(file.toPath()) {
                lines.collect { line ->
                    writeUtf8(line.toFluoriteString(null).value)
                    writeByte('\n'.code)
                }
            }
            FluoriteNull
        },
        "WRITEB" define FluoriteFunction { arguments ->
            if (arguments.size != 2) usage("WRITEB(file: STRING; blobLike: BLOB_LIKE): NULL")
            val file = arguments[0].toFluoriteString(null).value
            val blobLike = arguments[1]
            val fileSystem = getFileSystem().getOrThrow()
            fileSystem.write(file.toPath()) {
                iterateBlobs(blobLike) { bytes ->
                    write(bytes)
                }
            }
            FluoriteNull
        },
        "FILES" define FluoriteFunction { arguments ->
            if (arguments.size != 1) usage("FILES(dir: STRING): STREAM<STRING>")
            val dir = arguments[0].toFluoriteString(null).value
            val fileSystem = getFileSystem().getOrThrow()
            fileSystem.list(dir.toPath()).map { it.name.toFluoriteString() }.toFluoriteStream()
        },
        "EXEC" define FluoriteFunction { arguments ->
            fun usage(): Nothing = usage("EXEC(command: STREAM<STRING>[; env: env: OBJECT<STRING>][; cwd: cwd: STRING]): STREAM<STRING>")
            val arguments2 = arguments.toMutableList()

            val (entries, arguments3) = arguments2.partitionIfEntry()

            suspend fun parseCommand(commandStream: FluoriteValue): Pair<String, List<String>> {
                val command = if (commandStream is FluoriteStream) {
                    commandStream.toMutableList().map { it.toFluoriteString(null).value }
                } else {
                    listOf(commandStream.toFluoriteString(null).value)
                }
                if (command.isEmpty()) throw FluoriteException("EXEC requires at least one argument (the command to execute)".toFluoriteString())
                return Pair(command[0], command.drop(1))
            }

            suspend fun parseEnv(env: FluoriteObject): Map<String, String?> {
                return env.map.mapValues { entry ->
                    val value = entry.value
                    if (value is FluoriteNull) {
                        null
                    } else {
                        value.toFluoriteString(null).value
                    }
                }
            }

            val (process, args) = parseCommand(arguments3.removeFirstOrNull() ?: usage())
            val env = entries.remove("env")?.let { parseEnv(it as? FluoriteObject ?: usage()) } ?: emptyMap()
            val cwd = entries.remove("cwd")?.toFluoriteString(null)?.value

            if (entries.isNotEmpty()) usage()
            if (arguments3.isNotEmpty()) usage()

            val output = context.io.executeProcess(process, args, env, cwd)

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
