// Initialize Node.js support when this file is loaded
private val nodeInitialized = initializeNodeForTests().let { true }

actual fun isWindows(): Boolean {
    // In Node.js, check process.platform
    return try {
        val platform = js("typeof process !== 'undefined' ? process.platform : ''").unsafeCast<String>()
        platform == "win32"
    } catch (e: Throwable) {
        false
    }
}
