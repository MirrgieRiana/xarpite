package mirrg.xarpite.cli

import mirrg.kotlin.helium.join
import mirrg.kotlin.helium.notBlankOrNull
import mirrg.xarpite.Evaluator
import mirrg.xarpite.LazyMount
import mirrg.xarpite.Mount
import mirrg.xarpite.RuntimeContext
import mirrg.xarpite.compilers.objects.FluoriteArray
import mirrg.xarpite.compilers.objects.FluoriteFunction
import mirrg.xarpite.compilers.objects.cache
import mirrg.xarpite.compilers.objects.toFluoriteString
import mirrg.xarpite.define
import mirrg.xarpite.isUrl
import mirrg.xarpite.map
import mirrg.xarpite.mounts.usage
import mirrg.xarpite.operations.FluoriteException
import okio.Path.Companion.toPath

private const val MODULE_EXTENSION = ".xa1"
private const val MODULE_DEFAULT_FILE_NAME = "main$MODULE_EXTENSION"

context(context: RuntimeContext)
fun createModuleMounts(location: String, mountsFactory: (String) -> List<Map<String, Mount>>): List<Map<String, Mount>> {
    return mapOf(
        "LOCATION" define LazyMount { location.toFluoriteString() },
        "USE" define run {
            FluoriteFunction { arguments ->
                if (arguments.size != 1) usage("USE(reference: STRING): VALUE")
                val reference = arguments[0].toFluoriteString(null).value
                val baseDir = location.toPath().parent?.toString() ?: throw FluoriteException("Cannot determine base directory of $location.".toFluoriteString())
                val (moduleLocation, src) = resolveModuleLocation(context.inc, baseDir, reference)
                context.moduleResults.getOrPut(moduleLocation) {
                    val evaluator = Evaluator()
                    evaluator.defineMounts(mountsFactory(moduleLocation))
                    evaluator.get(moduleLocation, src).cache()
                }
            }
        },
    ).let { listOf(it) }
}

context(context: RuntimeContext)
private suspend inline fun tryToLoad(locations: MutableList<String>, location: String, onFound: (Pair<String, String>) -> Unit) {
    locations += location
    val src = context.getModuleSrc(location)
    if (src != null) onFound(Pair(location, src))
}

context(context: RuntimeContext)
private suspend fun resolveModuleLocation(inc: FluoriteArray, baseDir: String, reference: String): Pair<String, String> {
    val locations = mutableListOf<String>()

    val (directoryPathInc, urlInc) = inc.values
        .map { it.toFluoriteString(null).value }
        .partition { !isUrl(it) }

    fun fail(message: String): Nothing {
        val lines = mutableListOf<String>()
        lines += message
        if (locations.isNotEmpty()) {
            lines += "Tried locations:"
            locations.forEach {
                lines += "- $it"
            }
        }
        throw FluoriteException(lines.join("\n").toFluoriteString())
    }

    // ファイルパス
    if (reference.toPath().isAbsolute || reference.startsWith("./") || reference.startsWith("../") || reference.startsWith(".\\") || reference.startsWith("..\\")) {
        val path = baseDir.toPath().resolve(reference).normalized()
        tryToLoad(locations, path.toString()) { return it }
        tryToLoad(locations, path.map { "$it$MODULE_EXTENSION" }.toString()) { return it }
        tryToLoad(locations, path.resolve(MODULE_DEFAULT_FILE_NAME).toString()) { return it }
        fail("Module file not found: $reference")
    }

    // URL
    if (isUrl(reference)) {
        tryToLoad(locations, reference) { return it }
        fail("Failed to load module: $reference")
    }

    // Maven座標
    run {
        val segments = reference.split(":")
        if (segments.size != 3) return@run
        val group = segments[0].notBlankOrNull ?: return@run
        val artifact = segments[1].notBlankOrNull ?: return@run
        val version = segments[2].notBlankOrNull ?: return@run

        val suffix = "${group.replace(".", "/")}/$artifact/$version/$artifact-$version$MODULE_EXTENSION"

        directoryPathInc.forEach { string ->
            val path = string.toPath().resolve(suffix).normalized()
            tryToLoad(locations, path.toString()) { return it }
        }
        urlInc.forEach { string ->
            val normalizedIncPath = string.trimEnd('/')
            val url = "$normalizedIncPath/$suffix"
            tryToLoad(locations, url) { return it }
        }

        fail("Maven artifact not found: $reference")
    }

    // INCを起点とした相対パス
    run {
        directoryPathInc.forEach { string ->
            val path = string.toPath().resolve(reference).normalized()
            tryToLoad(locations, path.toString()) { return it }
            tryToLoad(locations, path.map { "$it$MODULE_EXTENSION" }.toString()) { return it }
            tryToLoad(locations, path.resolve(MODULE_DEFAULT_FILE_NAME).toString()) { return it }
        }
        urlInc.forEach { string ->
            val normalizedIncPath = string.trimEnd('/')
            val url = "$normalizedIncPath/$reference"
            tryToLoad(locations, url) { return it }
        }

        fail("Module file not found in INC paths: $reference")
    }

}
