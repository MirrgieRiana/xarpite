package mirrg.xarpite.cli

import mirrg.kotlin.helium.join
import mirrg.kotlin.helium.notBlankOrNull
import mirrg.xarpite.Evaluator
import mirrg.xarpite.LazyMount
import mirrg.xarpite.Mount
import mirrg.xarpite.RuntimeContext
import mirrg.xarpite.compilers.objects.FluoriteArray
import mirrg.xarpite.compilers.objects.FluoriteFunction
import mirrg.xarpite.compilers.objects.FluoriteNull
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
fun createModuleMounts(locationDir: String, locationFileName: String?, mountsFactory: (String, String?) -> List<Map<String, Mount>>): List<Map<String, Mount>> {
    return mapOf(
        "LOCATION" define LazyMount { locationFileName?.let { locationDir.toPath().resolve(it) }?.toString()?.toFluoriteString() ?: FluoriteNull },
        "LOCATION_DIR" define LazyMount { locationDir.toFluoriteString() },
        "LOCATION_FILE" define LazyMount { locationFileName?.toFluoriteString() ?: FluoriteNull },
        "USE" define run {
            val moduleCache = mutableMapOf<Path, FluoriteValue>()
            FluoriteFunction { arguments ->
                if (arguments.size != 1) usage("USE(reference: STRING): VALUE")
                val reference = arguments[0].toFluoriteString(null).value
                val modulePath = resolveModulePath(context.inc, locationDir, reference)
                moduleCache.getOrPut(modulePath) {
                    val src = context.getModuleSrc(modulePath.toString())
                    val evaluator = Evaluator()
                    val moduleLocationDir = modulePath.parent?.toString() ?: throw FluoriteException("Cannot determine module directory.".toFluoriteString())
                    val moduleLocationFileName = modulePath.toString()
                    evaluator.defineMounts(mountsFactory(moduleLocationDir, moduleLocationFileName))
                    evaluator.get(modulePath.toString(), src).cache()
                }
            }
        },
    ).let { listOf(it) }
}

private val WINDOWS_ABSOLUTE_PATH_REGEX = """^[a-zA-Z]:\\""".toRegex()

private suspend fun resolveModulePath(inc: FluoriteArray, baseDir: String, reference: String): Path {
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
        path.let { if (it.tryToLoad()) return it }
        path.map { "$it$MODULE_EXTENSION" }.let { if (it.tryToLoad()) return it }
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
            path.let { if (it.tryToLoad()) return it }
        }
        fail("Maven artifact not found: $reference")
    }

    fail("Invalid module reference format: $reference")
}
