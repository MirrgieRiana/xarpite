package mirrg.xarpite.mounts

import mirrg.xarpite.compilers.objects.FluoriteValue

suspend fun List<FluoriteValue>.mergeSort(isDescending: Boolean, comparator: suspend (FluoriteValue, FluoriteValue) -> Int): List<FluoriteValue> {
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
