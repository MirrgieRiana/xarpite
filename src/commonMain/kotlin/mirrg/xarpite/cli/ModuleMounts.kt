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
                val modulePath = run {
                    val fileSystem = getFileSystem().getOrThrow()
                    val mainPath = baseDir.resolve(file.drop(2).toPath()).normalized()
                    val fileMetadata = fileSystem.metadataOrNull(mainPath)
                    if (fileMetadata != null) return@run mainPath
                    if (!file.endsWith(".xa1")) {
                        val altPath = baseDir.resolve("${file.drop(2)}.xa1".toPath()).normalized()
                        val altMetadata = fileSystem.metadataOrNull(altPath)
                        if (altMetadata != null) return@run altPath
                    }
                    mainPath
                }
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
