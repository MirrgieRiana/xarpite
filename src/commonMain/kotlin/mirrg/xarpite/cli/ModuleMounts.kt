package mirrg.xarpite.cli

import io.ktor.http.URLBuilder
import io.ktor.http.takeFrom
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
import mirrg.xarpite.partitionIfEntry
import okio.Path.Companion.toPath

private const val MODULE_EXTENSION = ".xa1"
private const val MODULE_DEFAULT_FILE_NAME = "main$MODULE_EXTENSION"

context(context: RuntimeContext)
fun createModuleMounts(location: String, mountsFactory: (String) -> List<Map<String, Mount>>): List<Map<String, Mount>> {
    return mapOf(
        "LOCATION" define LazyMount { location.toFluoriteString() },
        "USE" define run {
            FluoriteFunction.immediate { arguments ->
                if (arguments.size != 1) usage("USE(reference: STRING): VALUE")
                val reference = arguments[0].toFluoriteString(null).value
                val candidates = resolveModuleLocation(context.inc, location, reference)

                // APIバージョン6以降では、候補の中に既に読み込み済みのロケーションがあれば、ランナーを走らせずにそれを再利用する。
                // これにより、INCの後付けや取得タイミングによらず、同一のreferenceが最初に読み込んだインスタンスに固定される。
                if (context.apiVersion >= 6) {
                    candidates.runners.forEach { (moduleLocation, _) ->
                        if (moduleLocation in context.moduleResults) return@immediate context.moduleResults.getValue(moduleLocation)
                    }
                }

                // 候補を優先順にランナーで取得し、最初に存在したロケーションを評価する
                candidates.runners.forEach { (moduleLocation, load) ->
                    val src = load() ?: return@forEach
                    return@immediate context.moduleResults.getOrPut(moduleLocation) {
                        val evaluator = Evaluator(context)
                        evaluator.defineMounts(mountsFactory(moduleLocation))
                        evaluator.get(moduleLocation, src, false).cache()
                    }
                }
                candidates.fail()
            }
        },
        "XA" define FluoriteFunction.immediate { arguments ->
            fun usage(): Nothing = usage("XA(script: STRING[; reference: reference: STRING]): VALUE")

            val (entries, arguments2) = arguments.toList().partitionIfEntry()
            val referenceArgument = entries.remove("reference")
            val script = (arguments2.removeFirstOrNull() ?: usage()).toFluoriteString(null).value
            if (entries.isNotEmpty()) usage()
            if (arguments2.isNotEmpty()) usage()

            val reference = referenceArgument?.toFluoriteString(null)?.value ?: "./-"
            val scriptLocation = resolveScriptLocation(location, reference)

            val evaluator = Evaluator(context)
            evaluator.defineMounts(mountsFactory(scriptLocation))
            evaluator.get(scriptLocation, script, false)
        },
    ).let { listOf(it) }
}

// 優先順に並んだ候補ロケーションと、それぞれを取得する遅延ランナーの列。
// runnersのランナーは、走らせるとそのロケーションのソースを取得し、存在しなければnullを返す。
private class ModuleCandidates(
    val runners: List<Pair<String, suspend () -> String?>>,
    private val notFoundMessage: String,
) {
    fun fail(): Nothing {
        val lines = mutableListOf<String>()
        lines += notFoundMessage
        if (runners.isNotEmpty()) {
            lines += "Tried locations:"
            runners.forEach { (location, _) ->
                lines += "- $location"
            }
        }
        throw FluoriteException(lines.join("\n").toFluoriteString())
    }
}

context(context: RuntimeContext)
private suspend fun resolveModuleLocation(inc: FluoriteArray, baseLocation: String, reference: String): ModuleCandidates {
    val runners = mutableListOf<Pair<String, suspend () -> String?>>()

    fun candidate(location: String) {
        runners += location to suspend { context.getModuleSrc(location) }
    }

    val (directoryPathInc, urlInc) = inc.values
        .map { it.toFluoriteString(null).value }
        .reversed()
        .partition { !isUrl(it) }

    // ファイルパス
    if (reference.toPath().isAbsolute || reference.startsWith("./") || reference.startsWith("../") || reference.startsWith(".\\") || reference.startsWith("..\\")) {
        if (isUrl(baseLocation)) {
            candidate(URLBuilder(baseLocation).takeFrom(reference).buildString())
        } else {
            val parentPath = baseLocation.toPath().parent ?: throw FluoriteException("Cannot determine parent path of $baseLocation.".toFluoriteString())
            val path = parentPath.resolve(reference).normalized()
            candidate(path.toString())
            candidate(path.map { "$it$MODULE_EXTENSION" }.toString())
            candidate(path.resolve(MODULE_DEFAULT_FILE_NAME).toString())
        }
        return ModuleCandidates(runners, "Module file not found: $reference")
    }

    // URL
    if (isUrl(reference)) {
        candidate(reference)
        return ModuleCandidates(runners, "Failed to load module: $reference")
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
            candidate(string.toPath().resolve(suffix).normalized().toString())
        }
        urlInc.forEach { string ->
            candidate("${string.trimEnd('/')}/$suffix")
        }

        return ModuleCandidates(runners, "Maven artifact not found: $reference")
    }

    // INCを起点とした相対パス
    directoryPathInc.forEach { string ->
        val path = string.toPath().resolve(reference).normalized()
        candidate(path.toString())
        candidate(path.map { "$it$MODULE_EXTENSION" }.toString())
        candidate(path.resolve(MODULE_DEFAULT_FILE_NAME).toString())
    }
    urlInc.forEach { string ->
        candidate("${string.trimEnd('/')}/$reference")
    }

    return ModuleCandidates(runners, "Module file not found in INC paths: $reference")
}

private fun resolveScriptLocation(baseLocation: String, reference: String): String {

    // ファイルパス
    if (reference.toPath().isAbsolute || reference.startsWith("./") || reference.startsWith("../") || reference.startsWith(".\\") || reference.startsWith("..\\")) {
        if (isUrl(baseLocation)) {
            return URLBuilder(baseLocation).takeFrom(reference).buildString()
        } else {
            val parentPath = baseLocation.toPath().parent ?: throw FluoriteException("Cannot determine parent path of $baseLocation.".toFluoriteString())
            return parentPath.resolve(reference).normalized().toString()
        }
    }

    // URL
    if (isUrl(reference)) {
        return reference
    }

    throw FluoriteException("Location must be a URL, an absolute path, or a relative path beginning with \"./\" or \"../\": $reference".toFluoriteString())
}
