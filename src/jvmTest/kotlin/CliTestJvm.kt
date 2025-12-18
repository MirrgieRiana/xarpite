actual fun isWindows(): Boolean {
    return System.getProperty("os.name")?.lowercase()?.contains("windows") == true
}
