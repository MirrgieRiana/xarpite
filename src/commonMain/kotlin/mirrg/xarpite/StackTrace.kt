package mirrg.xarpite

import mirrg.xarpite.compilers.objects.FluoriteString
import mirrg.xarpite.operations.FluoriteException
import mirrg.xarpite.operations.Returner
import kotlin.coroutines.CoroutineContext
import kotlin.coroutines.coroutineContext

class StackTrace : CoroutineContext.Element {
    object Key : CoroutineContext.Key<StackTrace>

    override val key get() = Key

    val positions = mutableListOf<Position?>()
}

fun StackTrace.copy() = StackTrace().also { stackTrace ->
    stackTrace.positions += this.positions
}

class Position(val location: String, val index: Int)

class MatrixPositionCalculator(private val src: String) {
    private val lineStartIndices = run {
        val list = mutableListOf(0)
        src.forEachIndexed { index, char ->
            if (char == '\n') list.add(index + 1)
        }
        list
    }

    fun toMatrixPosition(index: Int): Pair<Int, Int> {
        require(index in 0..src.length) { "index ($index) is out of range for src of length ${src.length}" }

        val lineIndex = lineStartIndices.binarySearch(index).let { if (it >= 0) it else -it - 2 }
        val lineStart = lineStartIndices[lineIndex]
        return Pair(lineIndex + 1, index - lineStart + 1)
    }

    fun getLine(row: Int): String {
        val lineStart = lineStartIndices.getOrNull(row - 1) ?: return ""
        val lineEnd = lineStartIndices.getOrNull(row) ?: src.length
        return src.substring(lineStart, lineEnd).trimEnd('\n')
    }
}

suspend inline fun <T> withStackTrace(position: Position?, block: () -> T): T {
    val stackTrace = coroutineContext[StackTrace.Key]
    return if (stackTrace == null) {
        block()
    } else {
        stackTrace.positions.add(position)
        try {
            block()
        } catch (e: FluoriteException) {
            if (e.stackTrace == null) e.stackTrace = stackTrace.positions.toList()
            throw e
        } finally {
            stackTrace.positions.removeLast()
        }
    }
}
