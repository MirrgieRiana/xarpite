package mirrg.xarpite.cli

import getEnv
import getFileSystem
import mirrg.xarpite.Evaluator
import mirrg.xarpite.compilers.objects.FluoriteFunction
import mirrg.xarpite.compilers.objects.FluoriteObject
import mirrg.xarpite.compilers.objects.FluoriteStream
import mirrg.xarpite.compilers.objects.FluoriteValue
import mirrg.xarpite.compilers.objects.asFluoriteBlob
import mirrg.xarpite.compilers.objects.toFluoriteArray
import mirrg.xarpite.compilers.objects.toFluoriteStream
import mirrg.xarpite.compilers.objects.toFluoriteString
import mirrg.xarpite.mounts.usage
import okio.Path.Companion.toPath
import readBytesFromStdin
import readLineFromStdin
import java.util.ArrayDeque
import okio.FileSystem
import okio.Path

val INB_MAX_BUFFER_SIZE = 8192

fun createCliMounts(args: List<String>, evaluator: Evaluator): List<Map<String, FluoriteValue>> {
    val useCache = mutableMapOf<Path, FluoriteValue>()
    val usePathStack = ArrayDeque<Path>()

    suspend fun evaluateFile(path: Path, fileSystem: FileSystem): FluoriteValue {
        val src = fileSystem.read(path) { readUtf8() }
        usePathStack.addLast(path)
        return try {
            evaluator.get(src)
        } finally {
            usePathStack.removeLast()
        }
    }

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
        "USE" to FluoriteFunction { arguments ->
            if (arguments.size != 1) usage("USE(file: STRING): VALUE")
            val file = arguments[0].toFluoriteString().value
            if (!file.startsWith("./")) usage("USE(file: STRING): VALUE")
            val fileSystem = getFileSystem().getOrThrow()
            val baseDir = usePathStack.lastOrNull()?.parent ?: fileSystem.canonicalize(".".toPath())
            val resolvedPath = baseDir.resolve(file.drop(2).toPath()).normalized()
            useCache[resolvedPath] ?: evaluateFile(resolvedPath, fileSystem).also {
                useCache[resolvedPath] = it
            }
        },
    ).let { listOf(it) }
}
