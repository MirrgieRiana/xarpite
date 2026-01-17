package mirrg.xarpite.mounts

import mirrg.xarpite.compilers.objects.FluoriteArray
import mirrg.xarpite.compilers.objects.FluoriteFunction
import mirrg.xarpite.compilers.objects.FluoriteInt
import mirrg.xarpite.compilers.objects.FluoriteStream
import mirrg.xarpite.compilers.objects.FluoriteString
import mirrg.xarpite.compilers.objects.FluoriteValue
import mirrg.xarpite.compilers.objects.compareTo
import mirrg.xarpite.compilers.objects.invoke
import mirrg.xarpite.compilers.objects.toFluoriteStream
import mirrg.xarpite.compilers.objects.toMutableList

fun createSortFunction(name: String, isDescending: Boolean): FluoriteFunction {
    return FluoriteFunction { arguments ->
        run { // SORT(stream: STREAM<VALUE>): STREAM<VALUE>
            if (arguments.size != 1) return@run
            val stream = arguments[0]

            return@FluoriteFunction if (stream is FluoriteStream) {
                stream.toMutableList().mergeSort(isDescending) { a, b -> a.compareTo(null, b).value }.toFluoriteStream()
            } else {
                stream
            }
        }
        run { // SORT(by: key_getter: VALUE -> VALUE; stream: STREAM<VALUE>): STREAM<VALUE>
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
                stream.toMutableList().mergeSort(isDescending) { a, b -> keyGetter.invoke(null, arrayOf(a)).compareTo(null, keyGetter.invoke(null, arrayOf(b))).value }.toFluoriteStream()
            } else {
                stream
            }
        }
        run { // SORT(comparator: VALUE, VALUE -> INT; stream: STREAM<VALUE>): STREAM<VALUE>
            if (arguments.size != 2) return@run
            val comparator = arguments[0]
            val stream = arguments[1]

            return@FluoriteFunction if (stream is FluoriteStream) {
                stream.toMutableList().mergeSort(isDescending) { a, b -> (comparator.invoke(null, arrayOf(a, b)) as FluoriteInt).value }.toFluoriteStream()
            } else {
                stream
            }
        }
        usage(
            "$name(stream: STREAM<VALUE>): STREAM<VALUE>",
            "$name(comparator: VALUE, VALUE -> INT; stream: STREAM<VALUE>): STREAM<VALUE>",
            "$name(by: key_getter: VALUE -> VALUE; stream: STREAM<VALUE>): STREAM<VALUE>",
        )
    }
}

private suspend fun List<FluoriteValue>.mergeSort(isDescending: Boolean, comparator: suspend (FluoriteValue, FluoriteValue) -> Int): List<FluoriteValue> {
    if (this.size <= 1) return this

    val middle = this.size / 2
    val left = this.subList(0, middle).mergeSort(isDescending, comparator)
    val right = this.subList(middle, this.size).mergeSort(isDescending, comparator)

    return merge(isDescending, comparator, left, right)
}

private suspend fun merge(isDescending: Boolean, comparator: suspend (FluoriteValue, FluoriteValue) -> Int, left: List<FluoriteValue>, right: List<FluoriteValue>): List<FluoriteValue> {
    val result = mutableListOf<FluoriteValue>()
    var i = 0
    var j = 0

    while (i < left.size && j < right.size) {
        val compared = if (isDescending) {
            comparator(left[i], right[j]) >= 0
        } else {
            comparator(left[i], right[j]) <= 0
        }
        if (compared) {
            result.add(left[i])
            i++
        } else {
            result.add(right[j])
            j++
        }
    }
    while (i < left.size) {
        result.add(left[i])
        i++
    }
    while (j < right.size) {
        result.add(right[j])
        j++
    }

    return result
}
