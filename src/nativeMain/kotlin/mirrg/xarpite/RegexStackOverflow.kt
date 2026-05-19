package mirrg.xarpite

actual fun Throwable.isRegexStackOverflow(): Boolean {
    // Native環境でのスタックオーバーフローの扱いを確認する
    if (this::class.simpleName == "StackOverflowError") return true
    val msg = message ?: return false
    return msg.contains("stack", ignoreCase = true) && msg.contains("overflow", ignoreCase = true)
}
