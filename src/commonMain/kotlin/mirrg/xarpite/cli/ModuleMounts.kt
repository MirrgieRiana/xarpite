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

private const val MODULE_EXTENSION = ".xa1"

fun createModuleMounts(location: String, mountsFactory: (String) -> List<Map<String, FluoriteValue>>): List<Map<String, FluoriteValue>> {
    return mapOf(
        "USE" to run {
            val moduleCache = mutableMapOf<Path, FluoriteValue>()
            val baseDir by lazy {
                location.toPath().parent?.normalized() ?: throw FluoriteException("Cannot determine base directory.".toFluoriteString())
            }
            FluoriteFunction { arguments ->
                if (arguments.size != 1) usage("USE(file: STRING): VALUE")
                val file = arguments[0].toFluoriteString().value
                val modulePath = resolveModulePath(baseDir, file) ?: throw FluoriteException("Module file not found: $file".toFluoriteString())
                moduleCache.getOrPut(modulePath) {
                    val src = getFileSystem().getOrThrow().read(modulePath) { readUtf8() }
                    val evaluator = Evaluator()
                    evaluator.defineMounts(mountsFactory(modulePath.toString()))
                    evaluator.get(src)
                }
            }
        },
    ).let { listOf(it) }
}

private fun resolveModulePath(baseDir: Path, file: String): Path? {
    if (!file.startsWith("./")) throw FluoriteException("""Module file path must start with "./".""".toFluoriteString())
    val modulePath1 = baseDir.resolve(file.drop(2).toPath()).normalized()
    if (getFileSystem().getOrThrow().exists(modulePath1)) return modulePath1
    if (!file.endsWith(MODULE_EXTENSION)) {
        val modulePath2 = baseDir.resolve((file.drop(2) + MODULE_EXTENSION).toPath()).normalized()
        if (getFileSystem().getOrThrow().exists(modulePath2)) return modulePath2
    }
    return null
}
