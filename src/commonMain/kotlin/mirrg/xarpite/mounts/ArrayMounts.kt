package mirrg.xarpite.mounts

import mirrg.xarpite.Mount
import mirrg.xarpite.RuntimeContext
import mirrg.xarpite.compilers.objects.FluoriteArray
import mirrg.xarpite.compilers.objects.FluoriteFunction
import mirrg.xarpite.compilers.objects.FluoriteStream
import mirrg.xarpite.compilers.objects.FluoriteValue
import mirrg.xarpite.compilers.objects.asFluoriteArray
import mirrg.xarpite.compilers.objects.collect
import mirrg.xarpite.compilers.objects.toFluoriteString
import mirrg.xarpite.define
import mirrg.xarpite.operations.FluoriteException

context(context: RuntimeContext)
fun createArrayMounts(): List<Map<String, Mount>> {
    return mapOf(
        "INTERCALATE" define FluoriteFunction { arguments ->
            if (arguments.size != 2) usage("<T> INTERCALATE(separator: ARRAY<T>; arrays: STREAM<ARRAY<T>>): ARRAY<T>")
            val separator = arguments[0]
            if (separator !is FluoriteArray) throw FluoriteException("First argument must be an array".toFluoriteString())
            val arrays = arguments[1]

            val result = mutableListOf<FluoriteValue>()
            var isFirst = true
            if (arrays is FluoriteStream) {
                arrays.collect { array ->
                    if (array !is FluoriteArray) throw FluoriteException("Stream elements must be arrays".toFluoriteString())
                    if (isFirst) {
                        isFirst = false
                    } else {
                        result.addAll(separator.values)
                    }
                    result.addAll(array.values)
                }
            } else {
                if (arrays !is FluoriteArray) throw FluoriteException("Second argument must be a stream of arrays or an array".toFluoriteString())
                result.addAll(arrays.values)
            }
            result.asFluoriteArray()
        },
    ).let { listOf(it) }
}
