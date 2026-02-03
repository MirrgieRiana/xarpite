package mirrg.xarpite.mounts

import mirrg.xarpite.Mount
import mirrg.xarpite.RuntimeContext
import mirrg.xarpite.compilers.objects.FluoriteFunction
import mirrg.xarpite.compilers.objects.FluoriteStream
import mirrg.xarpite.compilers.objects.FluoriteString
import mirrg.xarpite.compilers.objects.collect
import mirrg.xarpite.compilers.objects.colon
import mirrg.xarpite.compilers.objects.fluoriteArrayOf
import mirrg.xarpite.compilers.objects.toFluoriteString
import mirrg.xarpite.define

// パスを正規化する関数
// . や .. を解決し、冗長なスラッシュを削除する
// シンボリックリンクは解決しない
private fun normalizePath(path: String): String {
    val isAbsolute = path.startsWith("/")
    val segments = path.split("/").filter { it.isNotEmpty() }
    val stack = mutableListOf<String>()
    
    for (segment in segments) {
        when (segment) {
            "." -> {
                // カレントディレクトリを表す . は無視
            }
            ".." -> {
                if (stack.isNotEmpty() && stack.last() != "..") {
                    stack.removeAt(stack.lastIndex)
                } else if (!isAbsolute) {
                    // 相対パスの場合、先頭の .. は保持
                    stack.add(segment)
                }
                // 絶対パスの場合、ルートより上には行けないので .. は無視
            }
            else -> stack.add(segment)
        }
    }
    
    val result = if (isAbsolute) {
        "/" + stack.joinToString("/")
    } else {
        stack.joinToString("/")
    }
    
    return if (result.isEmpty()) if (isAbsolute) "/" else "." else result
}

context(context: RuntimeContext)
fun createStringMounts(): List<Map<String, Mount>> {
    return mapOf(

        // String constants for special characters
        "LT" define "<".toFluoriteString(),
        "GT" define ">".toFluoriteString(),
        "AMP" define "&".toFluoriteString(),
        "APOS" define "'".toFluoriteString(),
        "QUOT" define "\"".toFluoriteString(),
        "BOM" define "\uFEFF".toFluoriteString(),

        *run {
            FluoriteFunction { arguments ->
                if (arguments.size == 1) {
                    val argument = arguments[0]
                    if (argument is FluoriteStream) {
                        FluoriteStream {
                            argument.collect { item ->
                                emit(item.toFluoriteString(null).value.uppercase().toFluoriteString())
                            }
                        }
                    } else {
                        argument.toFluoriteString(null).value.uppercase().toFluoriteString()
                    }
                } else {
                    usage("UC(string: STRING): STRING | UC(string: STREAM<STRING>): STREAM<STRING>")
                }
            }.let {
                arrayOf(
                    "UC" define it,
                    "::UC" define fluoriteArrayOf(
                        FluoriteString.fluoriteClass colon it,
                    ),
                )
            }
        },

        *run {
            FluoriteFunction { arguments ->
                if (arguments.size == 1) {
                    val argument = arguments[0]
                    if (argument is FluoriteStream) {
                        FluoriteStream {
                            argument.collect { item ->
                                emit(item.toFluoriteString(null).value.lowercase().toFluoriteString())
                            }
                        }
                    } else {
                        argument.toFluoriteString(null).value.lowercase().toFluoriteString()
                    }
                } else {
                    usage("LC(string: STRING): STRING | LC(string: STREAM<STRING>): STREAM<STRING>")
                }
            }.let {
                arrayOf(
                    "LC" define it,
                    "::LC" define fluoriteArrayOf(
                        FluoriteString.fluoriteClass colon it,
                    ),
                )
            }
        },

        *run {
            FluoriteFunction { arguments ->
                if (arguments.size == 2) {
                    val dir = arguments[0].toFluoriteString(null).value
                    val file = arguments[1].toFluoriteString(null).value
                    
                    // dirとfileを結合
                    val combined = if (file.startsWith("/")) {
                        // fileが絶対パスの場合はそのまま使用
                        file
                    } else {
                        // 相対パスの場合は結合
                        val dirNormalized = if (dir.endsWith("/")) dir else "$dir/"
                        dirNormalized + file
                    }
                    
                    // パスを正規化
                    val normalized = normalizePath(combined)
                    normalized.toFluoriteString()
                } else {
                    usage("RESOLVE(dir: STRING; file: STRING): STRING")
                }
            }.let {
                arrayOf(
                    "RESOLVE" define it,
                    "::RESOLVE" define fluoriteArrayOf(
                        FluoriteString.fluoriteClass colon it,
                    ),
                )
            }
        },
    ).let { listOf(it) }
}
