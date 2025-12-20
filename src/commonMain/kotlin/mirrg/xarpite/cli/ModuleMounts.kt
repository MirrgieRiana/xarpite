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

fun createModuleMounts(filePath: String, mountsFactory: (String) -> List<Map<String, FluoriteValue>>): List<Map<String, FluoriteValue>> {
    return mapOf(
        "USE" to run {
            val moduleCache = mutableMapOf<Path, FluoriteValue>()
            val baseDir by lazy {
                filePath.toPath().parent?.normalized() ?: throw FluoriteException("Cannot determine base directory.".toFluoriteString())
            }
            FluoriteFunction { arguments ->
                if (arguments.size != 1) usage("USE(file: STRING): VALUE")
                val file = arguments[0].toFluoriteString().value
                if (!file.startsWith("./")) throw FluoriteException("""Path must start with "./".""".toFluoriteString())
                val fileSystem = getFileSystem().getOrThrow()
                val relativePath = file.drop(2)
                fun resolveModulePath(): Path {
                    val originalPath = baseDir.resolve(relativePath.toPath()).normalized()
                    val originalMetadata = fileSystem.metadataOrNull(originalPath)
                    if (originalMetadata != null) return originalPath
                    if (!file.endsWith(MODULE_EXTENSION)) {
                        val fallbackPath = baseDir.resolve("$relativePath$MODULE_EXTENSION".toPath()).normalized()
                        val fallbackMetadata = fileSystem.metadataOrNull(fallbackPath)
                        if (fallbackMetadata != null) return fallbackPath
                    }
                    return originalPath
                }
                val modulePath = resolveModulePath()
                moduleCache.getOrPut(modulePath) {
                    val src = fileSystem.read(modulePath) { readUtf8() }
                    val evaluator = Evaluator()
                    evaluator.defineMounts(mountsFactory(modulePath.toString()))
                    evaluator.get(src)
                }
            }
        },
    ).let { listOf(it) }
}
