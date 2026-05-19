package mirrg.xarpite

actual fun Throwable.isRegexStackOverflow(): Boolean {
    if (this is StackOverflowError) return true
    // Java 21以降、コンパイル時のStackOverflowErrorはPatternSyntaxExceptionとして伝播することがある
    if (this is java.util.regex.PatternSyntaxException) {
        val msg = message ?: return false
        return msg.startsWith("Stack overflow during pattern compilation")
    }
    return false
}
