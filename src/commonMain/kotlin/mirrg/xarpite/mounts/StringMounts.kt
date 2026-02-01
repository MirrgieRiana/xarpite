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
    ).let { listOf(it) }
}
