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
    ).let { listOf(it) }
}
