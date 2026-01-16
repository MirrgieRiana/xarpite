package mirrg.xarpite

import mirrg.xarpite.operations.FluoriteException
import kotlin.coroutines.CoroutineContext
import kotlin.coroutines.coroutineContext

class StackTrace : CoroutineContext.Element {
    object Key : CoroutineContext.Key<StackTrace>

    override val key get() = Key

    val positions = mutableListOf<Position>()
}

fun StackTrace.copy() = StackTrace().also { stackTrace ->
    stackTrace.positions += this.positions
}

class Position(val location: String?, val index: Int?) {
    companion object {
        val UNKNOWN = Position(null, null)
    }

    override fun toString() = (location ?: "UNKNOWN") + if (index != null) ":$index" else ""
}

suspend inline fun <T> withStackTrace(position: Position, block: () -> T): T {
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
