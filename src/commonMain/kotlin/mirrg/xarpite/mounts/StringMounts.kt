package mirrg.xarpite.mounts

import mirrg.xarpite.compilers.objects.FluoriteFunction
import mirrg.xarpite.compilers.objects.FluoriteStream
import mirrg.xarpite.compilers.objects.FluoriteString
import mirrg.xarpite.compilers.objects.FluoriteValue
import mirrg.xarpite.compilers.objects.collect
import mirrg.xarpite.compilers.objects.colon
import mirrg.xarpite.compilers.objects.fluoriteArrayOf
import mirrg.xarpite.compilers.objects.toFluoriteString

fun createStringMounts(): List<Map<String, FluoriteValue>> {
    val mounts = mutableMapOf<String, FluoriteValue>()

    // String constants for special characters
    mounts["LT"] = "<".toFluoriteString()
    mounts["GT"] = ">".toFluoriteString()
    mounts["AMP"] = "&".toFluoriteString()
    mounts["APOS"] = "'".toFluoriteString()
    mounts["QUOT"] = "\"".toFluoriteString()

    FluoriteFunction { arguments ->
        if (arguments.size == 1) {
            val argument = arguments[0]
            if (argument is FluoriteStream) {
                FluoriteStream {
                    argument.collect { item ->
                        emit(item.toFluoriteString().value.uppercase().toFluoriteString())
                    }
                }
            } else {
                argument.toFluoriteString().value.uppercase().toFluoriteString()
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
                        emit(item.toFluoriteString().value.lowercase().toFluoriteString())
                    }
                }
            } else {
                argument.toFluoriteString().value.lowercase().toFluoriteString()
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

    return listOf(mounts)
}
