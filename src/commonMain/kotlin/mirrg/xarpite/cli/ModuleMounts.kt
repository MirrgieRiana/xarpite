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
    val modulePath = when {
        file.startsWith("./") -> baseDir.resolve(file.drop(2).toPath()).normalized()
        file.startsWith("/") -> file.toPath().normalized()
        file.contains(":") -> {
            // Maven coordinate format: "group:artifact:version"
            val parts = file.split(":")
            if (parts.size != 3) {
                throw FluoriteException("""Invalid Maven coordinate format: $file. Expected "group:artifact:version".""".toFluoriteString())
            }
            if (parts.any { it.isEmpty() }) {
                throw FluoriteException("""Invalid Maven coordinate format: $file. All parts must be non-empty.""".toFluoriteString())
            }
            val group = parts[0].replace(".", "/")
            val artifact = parts[1]
            val version = parts[2]
            
            val relativePath = "$group/$artifact/$artifact-$version$MODULE_EXTENSION"
            baseDir.resolve(".xarpite").resolve(relativePath.toPath()).normalized()
        }
        else -> throw FluoriteException("""Module file path must start with "./", "/", or be in Maven coordinate format (containing ":").""".toFluoriteString())
    }
    if (getFileSystem().getOrThrow().exists(modulePath)) return modulePath

    if (!file.endsWith(MODULE_EXTENSION)) {
        val modulePathWithExtension = (modulePath.toString() + MODULE_EXTENSION).toPath().normalized()
        if (getFileSystem().getOrThrow().exists(modulePathWithExtension)) return modulePathWithExtension
    }

    return null
}
