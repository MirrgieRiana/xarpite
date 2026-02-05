package mirrg.xarpite.cli

import mirrg.kotlin.helium.join
import mirrg.kotlin.helium.notBlankOrNull
import mirrg.xarpite.Evaluator
import mirrg.xarpite.LazyMount
import mirrg.xarpite.Mount
import mirrg.xarpite.RuntimeContext
import mirrg.xarpite.compilers.objects.FluoriteArray
import mirrg.xarpite.compilers.objects.FluoriteFunction
import mirrg.xarpite.compilers.objects.FluoriteValue
import mirrg.xarpite.compilers.objects.cache
import mirrg.xarpite.compilers.objects.toFluoriteString
import mirrg.xarpite.define
import mirrg.xarpite.getFileSystem
import mirrg.xarpite.map
import mirrg.xarpite.mounts.usage
import mirrg.xarpite.operations.FluoriteException
import okio.Path
import okio.Path.Companion.toPath

private const val MODULE_EXTENSION = ".xa1"

context(context: RuntimeContext)
fun createModuleMounts(location: String, mountsFactory: (String) -> List<Map<String, Mount>>): List<Map<String, Mount>> {
    return mapOf(
        "LOCATION" define LazyMount { location.toFluoriteString() },
        "USE" define run {
            val moduleCache = mutableMapOf<String, FluoriteValue>()
            FluoriteFunction { arguments ->
                if (arguments.size != 1) usage("USE(reference: STRING): VALUE")
                val reference = arguments[0].toFluoriteString(null).value
                val baseDir = location.toPath().parent?.toString() ?: throw FluoriteException("Cannot determine base directory of $location.".toFluoriteString())
                val moduleLocation = resolveModuleLocation(context.inc, baseDir, reference)
                moduleCache.getOrPut(moduleLocation) {
                    val src = context.getModuleSrc(moduleLocation)
                    val evaluator = Evaluator()
                    evaluator.defineMounts(mountsFactory(moduleLocation))
                    evaluator.get(moduleLocation, src).cache()
                }
            }
        },
    ).let { listOf(it) }
}

private val WINDOWS_ABSOLUTE_PATH_REGEX = """^[a-zA-Z]:\\""".toRegex()

private suspend fun resolveModuleLocation(inc: FluoriteArray, baseDir: String, reference: String): String {
    val paths = mutableListOf<Path>()

    fun Path.tryToLoad(): Boolean {
        paths += this
        return getFileSystem().getOrThrow().exists(this)
    }

    fun fail(message: String): Nothing {
        val lines = mutableListOf<String>()
        lines += message
        if (paths.isNotEmpty()) {
            lines += "Tried paths:"
            paths.forEach {
                lines += "- $it"
            }
        }
        throw FluoriteException(lines.join("\n").toFluoriteString())
    }

    // ファイルパス
    if (reference.startsWith("./") || reference.startsWith(".\\") || reference.startsWith("/") || WINDOWS_ABSOLUTE_PATH_REGEX in reference) {
        val path = baseDir.toPath().resolve(reference.toPath()).normalized()
        path.let { if (it.tryToLoad()) return it.toString() }
        path.map { "$it$MODULE_EXTENSION" }.let { if (it.tryToLoad()) return it.toString() }
        fail("Module file not found: $reference")
    }

    // Maven座標
    run {
        val segments = reference.split(":")
        if (segments.size != 3) return@run
        val group = segments[0].notBlankOrNull ?: return@run
        val artifact = segments[1].notBlankOrNull ?: return@run
        val version = segments[2].notBlankOrNull ?: return@run

        val suffix = "${group.replace(".", "/")}/$artifact/$version/$artifact-$version$MODULE_EXTENSION"
        inc.values.forEach { value ->
            val path = value.toFluoriteString(null).value.toPath().resolve(suffix).normalized()
            path.let { if (it.tryToLoad()) return it.toString() }
        }
        fail("Maven artifact not found: $reference")
    }

    // INC相対パス
    run {
        inc.values.forEach { value ->
            val incPath = value.toFluoriteString(null).value.toPath()
            val path = incPath.resolve(reference.toPath()).normalized()
            path.let { if (it.tryToLoad()) return it.toString() }
            path.map { "$it$MODULE_EXTENSION" }.let { if (it.tryToLoad()) return it.toString() }
        }
        fail("Module not found in INC paths: $reference")
    }
}
