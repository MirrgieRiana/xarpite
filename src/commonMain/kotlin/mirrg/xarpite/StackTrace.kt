package mirrg.xarpite

import kotlin.coroutines.CoroutineContext

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
