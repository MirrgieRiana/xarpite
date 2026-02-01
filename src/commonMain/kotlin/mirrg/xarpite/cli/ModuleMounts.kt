package mirrg.xarpite.cli

import mirrg.xarpite.Evaluator
import mirrg.xarpite.Mount
import mirrg.xarpite.RuntimeContext
import mirrg.xarpite.compilers.objects.FluoriteFunction
import mirrg.xarpite.compilers.objects.FluoriteValue
import mirrg.xarpite.compilers.objects.cache
import mirrg.xarpite.compilers.objects.toFluoriteString
import mirrg.xarpite.define
import mirrg.xarpite.getFileSystem
import mirrg.xarpite.mounts.usage
import mirrg.xarpite.operations.FluoriteException
import okio.Path
import okio.Path.Companion.toPath

private const val MODULE_EXTENSION = ".xa1"

context(context: RuntimeContext)
fun createModuleMounts(location: String, mountsFactory: (String) -> List<Map<String, Mount>>): List<Map<String, Mount>> {
    return mapOf(
        "USE" define run {
            val moduleCache = mutableMapOf<Path, FluoriteValue>()
            val baseDir by lazy {
                location.toPath().parent?.normalized() ?: throw FluoriteException("Cannot determine base directory.".toFluoriteString())
            }
            FluoriteFunction { arguments ->
                if (arguments.size != 1) usage("USE(reference: STRING): VALUE")
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
    // Helper function to check if file exists
    fun checkFileExists(path: Path): Path? {
        return if (getFileSystem().getOrThrow().exists(path)) path else null
    }
    
    return when {
        // Relative path: starts with ./ or .\
        file.startsWith("./") || file.startsWith(".\\") -> {
            val pathStr = if (file.startsWith(".\\")) file.drop(2).replace("\\", "/") else file.drop(2)
            val modulePath = baseDir.resolve(pathStr.toPath()).normalized()
            checkFileExists(modulePath) ?: run {
                if (!file.endsWith(MODULE_EXTENSION)) {
                    checkFileExists((modulePath.toString() + MODULE_EXTENSION).toPath().normalized())
                } else {
                    null
                }
            }
        }
        // Absolute path: starts with / or Windows drive (e.g., C:\)
        file.startsWith("/") || (file.length >= 3 && file[1] == ':' && (file[2] == '\\' || file[2] == '/')) -> {
            val pathStr = file.replace("\\", "/")
            val modulePath = pathStr.toPath().normalized()
            checkFileExists(modulePath) ?: run {
                if (!file.endsWith(MODULE_EXTENSION)) {
                    checkFileExists((modulePath.toString() + MODULE_EXTENSION).toPath().normalized())
                } else {
                    null
                }
            }
        }
        // Maven coordinate format: "group:artifact:version" (3 non-blank parts)
        file.contains(":") -> {
            val parts = file.split(":")
            if (parts.size != 3 || parts.any { it.isBlank() }) {
                throw FluoriteException("""Invalid Maven coordinate format: $file. Expected "group:artifact:version" with non-blank parts.""".toFluoriteString())
            }
            val group = parts[0].replace(".", "/")
            val artifact = parts[1]
            val version = parts[2]
            
            val relativePath = "$group/$artifact/$artifact-$version$MODULE_EXTENSION"
            val modulePath = baseDir.resolve(".xarpite").resolve(relativePath.toPath()).normalized()
            checkFileExists(modulePath)
        }
        else -> throw FluoriteException("""Module file path must start with "./", ".\", "/", Windows drive letter, or be in Maven coordinate format (containing ":").""".toFluoriteString())
    }
}
