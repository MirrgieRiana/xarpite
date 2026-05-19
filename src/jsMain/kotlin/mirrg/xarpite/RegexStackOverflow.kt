package mirrg.xarpite

actual fun Throwable.isRegexStackOverflow(): Boolean {
    // JS環境ではKotlin/JSのStackOverflowErrorのほか、
    // JavaScriptのRangeError("Maximum call stack size exceeded")が
    // Throwableとして伝播する可能性があるため、メッセージも確認する
    if (this::class.simpleName == "StackOverflowError") return true
    val msg = message ?: return false
    return msg.contains("stack", ignoreCase = true) && msg.contains("overflow", ignoreCase = true) ||
        msg.contains("Maximum call stack", ignoreCase = true)
}
