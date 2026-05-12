package mirrg.xarpite.mounts

import mirrg.xarpite.Mount
import mirrg.xarpite.RuntimeContext
import mirrg.xarpite.compilers.objects.FluoriteFunction
import mirrg.xarpite.compilers.objects.FluoriteInt
import mirrg.xarpite.compilers.objects.FluoriteStream
import mirrg.xarpite.compilers.objects.FluoriteString
import mirrg.xarpite.compilers.objects.FluoriteValue
import mirrg.xarpite.compilers.objects.collect
import mirrg.xarpite.compilers.objects.colon
import mirrg.xarpite.compilers.objects.fluoriteArrayOf
import mirrg.xarpite.compilers.objects.toFluoriteNumber
import mirrg.xarpite.compilers.objects.toFluoriteString
import mirrg.xarpite.define
import mirrg.xarpite.operations.FluoriteException
import okio.Path.Companion.toPath

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
            fun create(signature: String): FluoriteFunction {
                return FluoriteFunction.immediate { arguments ->
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
                        usage(signature)
                    }
                }
            }
            arrayOf(
                "UC" define create("UC(string: STRING): STRING | UC(string: STREAM<STRING>): STREAM<STRING>"),
                "::UC" define fluoriteArrayOf(
                    FluoriteString.fluoriteClass colon create("STRING::UC(): STRING"),
                ),
            )
        },
        *run {
            fun create(signature: String): FluoriteFunction {
                return FluoriteFunction.immediate { arguments ->
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
                        usage(signature)
                    }
                }
            }
            arrayOf(
                "LC" define create("LC(string: STRING): STRING | LC(string: STREAM<STRING>): STREAM<STRING>"),
                "::LC" define fluoriteArrayOf(
                    FluoriteString.fluoriteClass colon create("STRING::LC(): STRING"),
                ),
            )
        },

        *run {
            fun create(signature: String): FluoriteValue {
                return FluoriteFunction.immediate { arguments ->
                    if (arguments.size != 2) usage(signature)
                    val dir = arguments[0].toFluoriteString(null).value
                    val file = arguments[1].toFluoriteString(null).value
                    dir.toPath().resolve(file).normalized().toString().toFluoriteString()
                }
            }
            arrayOf(
                "RESOLVE" define create("RESOLVE(dir: STRING; file: STRING): STRING"),
                "::RESOLVE" define fluoriteArrayOf(
                    FluoriteString.fluoriteClass colon create("STRING::RESOLVE(file: STRING): STRING"),
                ),
            )
        },

        "CHAR_CODE" define FluoriteFunction.immediate { arguments ->
            if (arguments.size != 1) usage("CHAR_CODE(char: STRING): INT")
            val string = arguments[0].toFluoriteString(null).value
            if (string.length != 1) throw FluoriteException("CHAR_CODE: 引数はUTF-16コード単位が丁度1個の文字列でなければなりません。${string.length}個のコード単位が渡されました".toFluoriteString())
            FluoriteInt(string[0].code)
        },
        "CHAR_CODED" define FluoriteFunction.immediate { arguments ->
            if (arguments.size != 1) usage("CHAR_CODED(charCode: INT): STRING")
            val code = arguments[0].toFluoriteNumber(null).roundToInt()
            if (code < 0 || code > 0xFFFF) throw FluoriteException("CHAR_CODED: 引数は0から65535の範囲でなければなりません。$code が渡されました".toFluoriteString())
            code.toChar().toString().toFluoriteString()
        },
        "CHAR_CODES" define FluoriteFunction.immediate { arguments ->
            if (arguments.size != 1) usage("CHAR_CODES(string: STRING): STREAM<INT>")
            val string = arguments[0].toFluoriteString(null).value
            FluoriteStream {
                for (char in string) {
                    emit(FluoriteInt(char.code))
                }
            }
        },
        "CHAR_CODESD" define FluoriteFunction.immediate { arguments ->
            if (arguments.size != 1) usage("CHAR_CODESD(charCodes: STREAM<INT>): STRING")
            val value = arguments[0]
            val sb = StringBuilder()
            suspend fun appendCode(item: FluoriteValue) {
                val code = item.toFluoriteNumber(null).roundToInt()
                if (code < 0 || code > 0xFFFF) throw FluoriteException("CHAR_CODESD: 各要素は0から65535の範囲でなければなりません。$code が渡されました".toFluoriteString())
                sb.append(code.toChar())
            }
            if (value is FluoriteStream) {
                value.collect { item -> appendCode(item) }
            } else {
                appendCode(value)
            }
            sb.toString().toFluoriteString()
        },

        "CODE_POINT" define FluoriteFunction.immediate { arguments ->
            if (arguments.size != 1) usage("CODE_POINT(char: STRING): INT")
            val string = arguments[0].toFluoriteString(null).value
            val codePoint = when {
                string.isEmpty() -> throw FluoriteException("CODE_POINT: 引数はUnicodeコードポイントが丁度1個の文字列でなければなりません。空文字列が渡されました".toFluoriteString())
                string.length == 1 -> {
                    val c = string[0]
                    if (c.isHighSurrogate() || c.isLowSurrogate()) throw FluoriteException("CODE_POINT: 引数に孤立サロゲートが含まれています".toFluoriteString())
                    c.code
                }
                string.length == 2 -> {
                    val high = string[0]
                    val low = string[1]
                    if (!high.isHighSurrogate() || !low.isLowSurrogate()) throw FluoriteException("CODE_POINT: 引数はUnicodeコードポイントが丁度1個の文字列でなければなりません。${string.length}個のコード単位が渡されました".toFluoriteString())
                    0x10000 + ((high.code - 0xD800) shl 10) + (low.code - 0xDC00)
                }
                else -> throw FluoriteException("CODE_POINT: 引数はUnicodeコードポイントが丁度1個の文字列でなければなりません。${string.length}個のコード単位が渡されました".toFluoriteString())
            }
            FluoriteInt(codePoint)
        },
        "CODE_POINTD" define FluoriteFunction.immediate { arguments ->
            if (arguments.size != 1) usage("CODE_POINTD(codePoint: INT): STRING")
            val codePoint = arguments[0].toFluoriteNumber(null).roundToInt()
            if (codePoint < 0 || codePoint > 0x10FFFF) throw FluoriteException("CODE_POINTD: 引数は0から1114111の範囲でなければなりません。$codePoint が渡されました".toFluoriteString())
            if (codePoint in 0xD800..0xDFFF) throw FluoriteException("CODE_POINTD: 引数にサロゲートコードポイントは使用できません。$codePoint が渡されました".toFluoriteString())
            val string = if (codePoint < 0x10000) {
                codePoint.toChar().toString()
            } else {
                val offset = codePoint - 0x10000
                val high = 0xD800 + (offset shr 10)
                val low = 0xDC00 + (offset and 0x3FF)
                "${high.toChar()}${low.toChar()}"
            }
            string.toFluoriteString()
        },
        "CODE_POINTS" define FluoriteFunction.immediate { arguments ->
            if (arguments.size != 1) usage("CODE_POINTS(string: STRING): STREAM<INT>")
            val string = arguments[0].toFluoriteString(null).value
            FluoriteStream {
                var i = 0
                while (i < string.length) {
                    val c = string[i]
                    if (c.isHighSurrogate() && i + 1 < string.length && string[i + 1].isLowSurrogate()) {
                        val codePoint = 0x10000 + ((c.code - 0xD800) shl 10) + (string[i + 1].code - 0xDC00)
                        emit(FluoriteInt(codePoint))
                        i += 2
                    } else {
                        emit(FluoriteInt(c.code))
                        i++
                    }
                }
            }
        },
        "CODE_POINTSD" define FluoriteFunction.immediate { arguments ->
            if (arguments.size != 1) usage("CODE_POINTSD(codePoints: STREAM<INT>): STRING")
            val value = arguments[0]
            val sb = StringBuilder()
            suspend fun appendCodePoint(item: FluoriteValue) {
                val codePoint = item.toFluoriteNumber(null).roundToInt()
                if (codePoint < 0 || codePoint > 0x10FFFF) throw FluoriteException("CODE_POINTSD: 各要素は0から1114111の範囲でなければなりません。$codePoint が渡されました".toFluoriteString())
                if (codePoint in 0xD800..0xDFFF) throw FluoriteException("CODE_POINTSD: 各要素にサロゲートコードポイントは使用できません。$codePoint が渡されました".toFluoriteString())
                if (codePoint < 0x10000) {
                    sb.append(codePoint.toChar())
                } else {
                    val offset = codePoint - 0x10000
                    sb.append((0xD800 + (offset shr 10)).toChar())
                    sb.append((0xDC00 + (offset and 0x3FF)).toChar())
                }
            }
            if (value is FluoriteStream) {
                value.collect { item -> appendCodePoint(item) }
            } else {
                appendCodePoint(value)
            }
            sb.toString().toFluoriteString()
        },

        ).let { listOf(it) }
}
