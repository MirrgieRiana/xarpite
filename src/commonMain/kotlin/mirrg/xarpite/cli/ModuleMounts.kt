package mirrg.xarpite.cli

import mirrg.xarpite.Evaluator
import mirrg.xarpite.LazyMount
import mirrg.xarpite.Mount
import mirrg.xarpite.RuntimeContext
import mirrg.xarpite.compilers.objects.FluoriteFunction
import mirrg.xarpite.compilers.objects.FluoriteNull
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
fun createModuleMounts(scriptName: String, location: String, mountsFactory: (String, String) -> List<Map<String, Mount>>): List<Map<String, Mount>> {
    // location が "./-" の場合はファイルから読み込まれていないのでNULL
    val isFileLocation = location != "./-"
    return mapOf(
        "LOCATION" define LazyMount {
            if (isFileLocation) location.toFluoriteString() else FluoriteNull
        },
        "LOCATION_DIR" define LazyMount {
            if (isFileLocation) {
                location.toPath().parent?.toString()?.toFluoriteString() ?: FluoriteNull
            } else {
                FluoriteNull
            }
        },
        "LOCATION_FILE" define LazyMount {
            if (isFileLocation) location.toPath().name.toFluoriteString() else FluoriteNull
        },
        "USE" define run {
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
                    evaluator.defineMounts(mountsFactory(modulePath.toString(), modulePath.toString()))
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
        else -> throw FluoriteException("""Module file path must start with "./" or "/".""".toFluoriteString())
    }
    if (getFileSystem().getOrThrow().exists(modulePath)) return modulePath

    if (!file.endsWith(MODULE_EXTENSION)) {
        val modulePathWithExtension = (modulePath.toString() + MODULE_EXTENSION).toPath().normalized()
        if (getFileSystem().getOrThrow().exists(modulePathWithExtension)) return modulePathWithExtension
    }

    return null
}
