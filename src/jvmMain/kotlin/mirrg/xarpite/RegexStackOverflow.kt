package mirrg.xarpite

actual fun Throwable.isRegexStackOverflow(): Boolean {
    if (this is StackOverflowError) return true
    // Java 21以降、コンパイル時のStackOverflowErrorはPatternSyntaxExceptionとして伝播することがある
    if (this is java.util.regex.PatternSyntaxException) {
        val msg = message ?: return false
        return msg.contains("Stack overflow", ignoreCase = true) && msg.contains("pattern compilation", ignoreCase = true)
    }
    return false
}
