package mirrg.xarpite.mounts

import mirrg.xarpite.Mount
import mirrg.xarpite.RuntimeContext
import mirrg.xarpite.compilers.objects.FluoriteFunction
import mirrg.xarpite.compilers.objects.FluoriteStream
import mirrg.xarpite.compilers.objects.FluoriteString
import mirrg.xarpite.compilers.objects.FluoriteValue
import mirrg.xarpite.compilers.objects.collect
import mirrg.xarpite.compilers.objects.colon
import mirrg.xarpite.compilers.objects.fluoriteArrayOf
import mirrg.xarpite.compilers.objects.toFluoriteString
import mirrg.xarpite.define
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
            fun create(signature: String): FluoriteValue {
                return FluoriteFunction { arguments ->
                    if (arguments.size == 2) {
                        val dir = arguments[0].toFluoriteString(null).value
                        val file = arguments[1].toFluoriteString(null).value
                        val resolved = dir.toPath().resolve(file).normalized()
                        resolved.toString().toFluoriteString()
                    } else {
                        usage(signature)
                    }
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
