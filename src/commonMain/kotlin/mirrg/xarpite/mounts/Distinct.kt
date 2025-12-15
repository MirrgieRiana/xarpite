package mirrg.xarpite.mounts

import mirrg.xarpite.compilers.objects.FluoriteArray
import mirrg.xarpite.compilers.objects.FluoriteFunction
import mirrg.xarpite.compilers.objects.FluoriteStream
import mirrg.xarpite.compilers.objects.FluoriteString
import mirrg.xarpite.compilers.objects.FluoriteValue
import mirrg.xarpite.compilers.objects.collect
import mirrg.xarpite.compilers.objects.invoke

fun createDistinctFunction(): FluoriteFunction {
    return FluoriteFunction { arguments ->
        run { // DISTINCT(stream: STREAM<VALUE>): STREAM<VALUE>
            if (arguments.size != 1) return@run
            val stream = arguments[0]

            return@FluoriteFunction if (stream is FluoriteStream) {
                FluoriteStream {
                    val set = mutableSetOf<FluoriteValue>()
                    stream.collect { item ->
                        if (set.add(item)) emit(item)
                    }
                }
            } else {
                stream
            }
        }
        run { // DISTINCT(by: keyGetter: VALUE -> VALUE; stream: STREAM<VALUE>): STREAM<VALUE>
            if (arguments.size != 2) return@run
            val entry = arguments[0]
            if (entry !is FluoriteArray) return@run
            if (entry.values.size != 2) return@run
            val parameterName = entry.values[0]
            if (parameterName !is FluoriteString) return@run
            if (parameterName.value != "by") return@run
            val keyGetter = entry.values[1]
            val stream = arguments[1]

            return@FluoriteFunction if (stream is FluoriteStream) {
                FluoriteStream {
                    val set = mutableSetOf<FluoriteValue>()
                    stream.collect { item ->
                        val key = keyGetter.invoke(arrayOf(item))
                        if (set.add(key)) emit(item)
                    }
                }
            } else {
                stream
            }
        }
        usage(
            "DISTINCT(stream: STREAM<VALUE>): STREAM<VALUE>",
            "DISTINCT(by: keyGetter: VALUE -> VALUE; stream: STREAM<VALUE>): STREAM<VALUE>",
        )
    }
}
