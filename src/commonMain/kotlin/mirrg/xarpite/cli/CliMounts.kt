package mirrg.xarpite.cli

import getEnv
import getFileSystem
import mirrg.xarpite.compilers.objects.FluoriteFunction
import mirrg.xarpite.compilers.objects.FluoriteObject
import mirrg.xarpite.compilers.objects.FluoriteStream
import mirrg.xarpite.compilers.objects.FluoriteValue
import mirrg.xarpite.compilers.objects.toFluoriteArray
import mirrg.xarpite.compilers.objects.toFluoriteStream
import mirrg.xarpite.compilers.objects.toFluoriteString
import mirrg.xarpite.mounts.usage
import okio.Path.Companion.toPath
import readLineFromStdin

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
    ).let { listOf(it) }
}
