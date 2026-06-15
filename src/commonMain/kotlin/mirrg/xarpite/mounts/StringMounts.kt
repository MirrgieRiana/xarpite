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
            val number = arguments[0].toFluoriteNumber(null)
            val code = number.roundToInt()
            if (code < 0 || code > 0xFFFF) throw FluoriteException("Argument must be between 0 and 65535, got $code".toFluoriteString())
            code.toChar().toString().toFluoriteString()
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
