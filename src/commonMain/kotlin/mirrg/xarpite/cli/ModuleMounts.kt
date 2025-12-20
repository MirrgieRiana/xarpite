package mirrg.xarpite.cli

import getFileSystem
import mirrg.xarpite.Evaluator
import mirrg.xarpite.compilers.objects.FluoriteFunction
import mirrg.xarpite.compilers.objects.FluoriteValue
import mirrg.xarpite.compilers.objects.toFluoriteString
import mirrg.xarpite.mounts.usage
import mirrg.xarpite.operations.FluoriteException
import okio.Path
import okio.Path.Companion.toPath

fun createModuleMounts(filePath: Path, mountsFactory: (Path) -> List<Map<String, FluoriteValue>>): List<Map<String, FluoriteValue>> {
    return mapOf(
        "USE" to run {
            val useCache = mutableMapOf<Path, FluoriteValue>()
            val baseDir by lazy { getFileSystem().getOrThrow().canonicalize(filePath.parent ?: ".".toPath()) }
            FluoriteFunction { arguments ->
                if (arguments.size != 1) usage("USE(file: STRING): VALUE")
                val file = arguments[0].toFluoriteString().value
                if (!file.startsWith("./")) throw FluoriteException("Path must start with \"./\"".toFluoriteString())
                val fileSystem = getFileSystem().getOrThrow()
                val resolvedPath = baseDir.resolve(file.drop(2).toPath()).normalized()
                useCache.getOrPut(resolvedPath) {
                    val src = fileSystem.read(resolvedPath) { readUtf8() }
                    val evaluator = Evaluator()
                    evaluator.defineMounts(mountsFactory(resolvedPath))
                    evaluator.get(src)
                }
            }
        },
    ).let { listOf(it) }
}
