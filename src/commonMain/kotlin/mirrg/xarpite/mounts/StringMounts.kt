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

        "CHAR_CODE" define FluoriteFunction.immediate { arguments ->
            if (arguments.size != 1) usage("CHAR_CODE(char: STRING): INT")
            val string = arguments[0].toFluoriteString(null).value
            if (string.length != 1) throw FluoriteException("Argument must be a string of exactly 1 UTF-16 code unit, got ${string.length} code units".toFluoriteString())
            FluoriteInt(string[0].code)
        },
        "CHAR_CODED" define FluoriteFunction.immediate { arguments ->
            if (arguments.size != 1) usage("CHAR_CODED(charCode: INT): STRING")
            val code = arguments[0].toFluoriteNumber(null).roundToInt()
            if (code < 0 || code > 0xFFFF) throw FluoriteException("Argument must be between 0 and 65535, got $code".toFluoriteString())
            code.toChar().toString().toFluoriteString()
        },
        "CHAR_CODES" define FluoriteFunction.immediate { arguments ->
            if (arguments.size != 1) usage("CHAR_CODES(string: STRING): STREAM<INT>")
            val string = arguments[0].toFluoriteString(null).value
            FluoriteStream {
                string.forEach { char ->
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
                if (code < 0 || code > 0xFFFF) throw FluoriteException("Each element must be between 0 and 65535, got $code".toFluoriteString())
                sb.append(code.toChar())
            }
            if (value is FluoriteStream) {
                value.collect { item ->
                    appendCode(item)
                }
            } else {
                appendCode(value)
            }
            sb.toString().toFluoriteString()
        },

        "CODE_POINT" define FluoriteFunction.immediate { arguments ->
            if (arguments.size != 1) usage("CODE_POINT(char: STRING): INT")
            val string = arguments[0].toFluoriteString(null).value
            val codePoint = when {
                string.isEmpty() -> throw FluoriteException("Argument must be a string of exactly 1 Unicode code point, got an empty string".toFluoriteString())
                string.length == 1 -> {
                    val char = string[0]
                    if (char.isSurrogate()) throw FluoriteException("Argument must not contain an isolated surrogate".toFluoriteString())
                    char.code
                }
                string.length == 2 -> {
                    val high = string[0]
                    val low = string[1]
                    if (!high.isHighSurrogate() || !low.isLowSurrogate()) {
                        if (high.isSurrogate() || low.isSurrogate()) throw FluoriteException("Argument must not contain an isolated surrogate".toFluoriteString())
                        throw FluoriteException("Argument must be a string of exactly 1 Unicode code point, got ${string.length} code units".toFluoriteString())
                    }
                    0x10000 + ((high.code - 0xD800) shl 10) + (low.code - 0xDC00)
                }
                else -> throw FluoriteException("Argument must be a string of exactly 1 Unicode code point, got ${string.length} code units".toFluoriteString())
            }
            FluoriteInt(codePoint)
        },
        "CODE_POINTD" define FluoriteFunction.immediate { arguments ->
            if (arguments.size != 1) usage("CODE_POINTD(codePoint: INT): STRING")
            val codePoint = arguments[0].toFluoriteNumber(null).roundToInt()
            if (codePoint < 0 || codePoint > 0x10FFFF) throw FluoriteException("Argument must be between 0 and 1114111, got $codePoint".toFluoriteString())
            if (codePoint in 0xD800..0xDFFF) throw FluoriteException("Argument must not be a surrogate code point, got $codePoint".toFluoriteString())
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
                    val char = string[i]
                    if (char.isHighSurrogate()) {
                        if (i + 1 < string.length && string[i + 1].isLowSurrogate()) {
                            val codePoint = 0x10000 + ((char.code - 0xD800) shl 10) + (string[i + 1].code - 0xDC00)
                            emit(FluoriteInt(codePoint))
                            i += 2
                        } else {
                            throw FluoriteException("Argument must not contain an isolated surrogate".toFluoriteString())
                        }
                    } else if (char.isLowSurrogate()) {
                        throw FluoriteException("Argument must not contain an isolated surrogate".toFluoriteString())
                    } else {
                        emit(FluoriteInt(char.code))
                        i++
                    }
                }
            }
        },

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

        ).let { listOf(it) }
}
