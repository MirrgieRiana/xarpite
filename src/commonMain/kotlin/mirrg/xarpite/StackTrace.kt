package mirrg.xarpite

import mirrg.xarpite.operations.FluoriteException
import kotlin.coroutines.CoroutineContext
import kotlin.coroutines.coroutineContext

class StackTrace : CoroutineContext.Element {
    object Key : CoroutineContext.Key<StackTrace>

    override val key get() = Key

    val elements = mutableListOf<StackTraceElement>()
}

fun StackTrace.copy() = StackTrace().also { stackTrace ->
    stackTrace.elements += this.elements
}

class StackTraceElement(val location: String?, val index: Int?) {
    companion object {
        val UNKNOWN = StackTraceElement(null, null)
    }

    override fun toString() = (location ?: "UNKNOWN") + if (index != null) ":$index" else ""
}

suspend inline fun <T> withStackTrace(element: StackTraceElement, block: () -> T): T {
    val stackTrace = coroutineContext[StackTrace.Key]
    return if (stackTrace == null) {
        block()
    } else {
        stackTrace.elements.add(element)
        try {
            block()
        } catch (e: FluoriteException) {
            if (e.stackTrace == null) e.stackTrace = stackTrace.elements.toList()
            throw e
        } finally {
            stackTrace.elements.removeLast()
        }
    }
}
