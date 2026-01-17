package mirrg.xarpite.mounts

import mirrg.xarpite.RuntimeContext
import mirrg.xarpite.compilers.objects.FluoriteFunction
import mirrg.xarpite.compilers.objects.FluoriteStream
import mirrg.xarpite.compilers.objects.FluoriteString
import mirrg.xarpite.compilers.objects.FluoriteValue
import mirrg.xarpite.compilers.objects.collect
import mirrg.xarpite.compilers.objects.colon
import mirrg.xarpite.compilers.objects.fluoriteArrayOf
import mirrg.xarpite.compilers.objects.toFluoriteStream
import mirrg.xarpite.compilers.objects.toFluoriteString

context(context: RuntimeContext)
fun createStringMounts(): List<Map<String, FluoriteValue>> {
    val mounts = mutableMapOf<String, FluoriteValue>()

    // String constants for special characters
    mounts["LT"] = "<".toFluoriteString()
    mounts["GT"] = ">".toFluoriteString()
    mounts["AMP"] = "&".toFluoriteString()
    mounts["APOS"] = "'".toFluoriteString()
    mounts["QUOT"] = "\"".toFluoriteString()
    mounts["BOM"] = "\uFEFF".toFluoriteString()

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
    }.also {
        mounts["UC"] = it
        mounts["::UC"] = fluoriteArrayOf(
            FluoriteString.fluoriteClass colon it,
        )
    }

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
    }.also {
        mounts["LC"] = it
        mounts["::LC"] = fluoriteArrayOf(
            FluoriteString.fluoriteClass colon it,
        )
    }

    FluoriteFunction { arguments ->
        if (arguments.size == 1) {
            val string = arguments[0].toFluoriteString(null).value
            // 改行で分割（LF、CR、CRLFをすべてサポート）
            val lines = string.split(Regex("\\r?\\n|\\r"))
            // 最後の改行は削除される：末尾が改行で終わる場合、最後の空文字列を除去
            val result = if (string.isNotEmpty() && (string.endsWith('\n') || string.endsWith('\r'))) {
                if (lines.lastOrNull() == "") {
                    lines.dropLast(1)
                } else {
                    lines
                }
            } else {
                lines
            }
            result.map { it.toFluoriteString() }.toFluoriteStream()
        } else {
            usage("LINES(string: STRING): STREAM<STRING>")
        }
    }.also {
        mounts["LINES"] = it
    }

    return listOf(mounts)
}
