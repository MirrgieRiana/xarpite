package mirrg.xarpite.cli

import mirrg.xarpite.Evaluator
import mirrg.xarpite.RuntimeContext
import mirrg.xarpite.compilers.objects.FluoriteFunction
import mirrg.xarpite.compilers.objects.FluoriteValue
import mirrg.xarpite.compilers.objects.cache
import mirrg.xarpite.compilers.objects.toFluoriteString
import mirrg.xarpite.getFileSystem
import mirrg.xarpite.mounts.usage
import mirrg.xarpite.operations.FluoriteException
import okio.Path
import okio.Path.Companion.toPath

private const val MODULE_EXTENSION = ".xa1"

context(context: RuntimeContext)
fun createModuleMounts(location: String, mountsFactory: (String) -> List<Map<String, FluoriteValue>>): List<Map<String, FluoriteValue>> {
    return mapOf(
        "USE" to run {
            val moduleCache = mutableMapOf<Path, FluoriteValue>()
            val baseDir by lazy {
                location.toPath().parent?.normalized() ?: throw FluoriteException("Cannot determine base directory.".toFluoriteString())
            }
            FluoriteFunction { arguments ->
                if (arguments.size != 1) usage("USE(file: STRING): VALUE")
                val file = arguments[0].toFluoriteString(null).value
                val modulePath = resolveModulePath(baseDir, file) ?: throw FluoriteException("Module file not found: $file".toFluoriteString())
                moduleCache.getOrPut(modulePath) {
                    val src = context.getModuleSrc(modulePath.toString())
                    val evaluator = Evaluator()
                    evaluator.defineMounts(mountsFactory(modulePath.toString()))
                    evaluator.get(modulePath.toString(), src).cache()
                }
            }
        },
    ).let { listOf(it) }
}

private fun resolveModulePath(baseDir: Path, file: String): Path? {
    val path = when {
        file.startsWith("./") -> {
            // 相対パス
            baseDir.resolve(file.drop(2).toPath()).normalized()
        }
        file.startsWith("/") -> {
            // 絶対パス
            file.toPath().normalized()
        }
        else -> {
            throw FluoriteException("""Module file path must start with "./" or "/".""".toFluoriteString())
        }
    }
    
    // まず指定されたパスをそのまま試す
    if (getFileSystem().getOrThrow().exists(path)) return path
    
    // 拡張子がない場合、.xa1を付けたパスを試す
    if (!file.endsWith(MODULE_EXTENSION)) {
        val pathWithExtension = (path.toString() + MODULE_EXTENSION).toPath().normalized()
        if (getFileSystem().getOrThrow().exists(pathWithExtension)) return pathWithExtension
    }
    
    return null
}
