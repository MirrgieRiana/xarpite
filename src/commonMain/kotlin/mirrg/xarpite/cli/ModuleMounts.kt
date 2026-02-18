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
            FluoriteFunction { arguments ->
                if (arguments.size != 1) usage("USE(reference: STRING): VALUE")
                val reference = arguments[0].toFluoriteString(null).value
                val baseDir = location.toPath().parent?.toString() ?: throw FluoriteException("Cannot determine base directory of $location.".toFluoriteString())
                val moduleLocation = resolveModuleLocation(context.inc, baseDir, reference)
                context.moduleResult.getOrPut(moduleLocation) {
                    val src = context.getModuleSrc(moduleLocation)
                    val evaluator = Evaluator()
                    evaluator.defineMounts(mountsFactory(moduleLocation))
                    evaluator.get(moduleLocation, src).cache()
                }
            }
        },
    ).let { listOf(it) }
}

private suspend fun resolveModuleLocation(inc: FluoriteArray, baseDir: String, reference: String): String {
    val paths = mutableListOf<Path>()

    fun Path.tryToLoad(): Boolean {
        paths += this
        val metadata = getFileSystem().getOrThrow().metadataOrNull(this) ?: return false
        return metadata.isRegularFile
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
    if (reference.toPath().isAbsolute || reference.startsWith("./") || reference.startsWith("../") || reference.startsWith(".\\") || reference.startsWith("..\\")) {
        val path = baseDir.toPath().resolve(reference).normalized()
        path.let { if (it.tryToLoad()) return it.toString() }
        path.map { "$it$MODULE_EXTENSION" }.let { if (it.tryToLoad()) return it.toString() }
        path.resolve("main$MODULE_EXTENSION").let { if (it.tryToLoad()) return it.toString() }
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
            val incPath = value.toFluoriteString(null).value
            if (isUrlFormat(incPath)) {
                // URL形式の場合、子パスとして解決
                val urlPath = "$incPath/$suffix"
                // file:// の場合はファイルパスに変換してチェック
                if (incPath.startsWith("file://")) {
                    val filePath = urlPath.substring("file://".length).toPath()
                    if (filePath.tryToLoad()) return filePath.toString()
                } else {
                    // http:// や https:// の場合は常に成功とみなす
                    paths += urlPath.toPath()
                    return urlPath
                }
            } else {
                val path = incPath.toPath().resolve(suffix).normalized()
                path.let { if (it.tryToLoad()) return it.toString() }
            }
        }
        fail("Maven artifact not found: $reference")
    }

    // INCを起点とした相対パス
    run {
        inc.values.forEach { value ->
            val incPath = value.toFluoriteString(null).value
            if (isUrlFormat(incPath)) {
                // URL形式の場合、子パスを構築
                if (incPath.startsWith("file://")) {
                    // file:// の場合はファイルパスに変換してチェック
                    val fileBasePath = incPath.substring("file://".length).toPath()
                    
                    // 拡張子なし
                    val path1 = fileBasePath.resolve(reference).normalized()
                    if (path1.tryToLoad()) return path1.toString()
                    
                    // 拡張子あり
                    val path2 = fileBasePath.resolve("$reference$MODULE_EXTENSION").normalized()
                    if (path2.tryToLoad()) return path2.toString()
                    
                    // main.xa1
                    val path3 = fileBasePath.resolve("$reference/main$MODULE_EXTENSION").normalized()
                    if (path3.tryToLoad()) return path3.toString()
                } else {
                    // http:// や https:// の場合は常に成功とみなす
                    val basePath = "$incPath/$reference"
                    paths += basePath.toPath()
                    
                    // 拡張子なし
                    val pathWithExt = "$basePath$MODULE_EXTENSION"
                    paths += pathWithExt.toPath()
                    return pathWithExt
                }
            } else {
                // 通常のファイルパスとして処理
                val path = incPath.toPath().resolve(reference).normalized()
                path.let { if (it.tryToLoad()) return it.toString() }
                path.map { "$it$MODULE_EXTENSION" }.let { if (it.tryToLoad()) return it.toString() }
                path.resolve("main$MODULE_EXTENSION").let { if (it.tryToLoad()) return it.toString() }
            }
        }
        fail("Module file not found in INC paths: $reference")
    }

}

private fun isUrlFormat(path: String): Boolean {
    return path.startsWith("file://") || path.startsWith("http://") || path.startsWith("https://")
}
