package mirrg.xarpite.cli

import mirrg.kotlin.helium.notBlankOrNull
import mirrg.xarpite.Evaluator
import mirrg.xarpite.Mount
import mirrg.xarpite.RuntimeContext
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

val WINDOWS_ABSOLUTE_PATH_REGEX = """^[a-zA-Z]:\\""".toRegex()

private fun resolveModulePath(baseDir: Path, reference: String): Path? {
    fun Path.canLoad() = getFileSystem().getOrThrow().exists(this)

    // 相対パス
    if (reference.startsWith("./") || reference.startsWith(".\\")) {
        val path = baseDir.resolve(reference.toPath()).normalized()
        path.let { if (it.canLoad()) return it }
        path.map { "$it$MODULE_EXTENSION" }.let { if (it.canLoad()) return it }
        return null
    }

    // 絶対パス
    if (reference.startsWith("/") || WINDOWS_ABSOLUTE_PATH_REGEX in reference) {
        val path = reference.toPath().normalized()
        path.let { if (it.canLoad()) return it }
        path.map { "$it$MODULE_EXTENSION" }.let { if (it.canLoad()) return it }
        return null
    }

    // Maven座標
    run {
        val segments = reference.split(":")
        if (segments.size != 3) return@run
        val group = segments[0].notBlankOrNull ?: return@run
        val artifact = segments[1].notBlankOrNull ?: return@run
        val version = segments[2].notBlankOrNull ?: return@run

        val path = ".xarpite/${group.replace(".", "/")}/$artifact/$artifact-$version$MODULE_EXTENSION".toPath().normalized()
        path.let { if (it.canLoad()) return it }
        return null
    }

    throw FluoriteException("Invalid module reference: $reference".toFluoriteString())
}
