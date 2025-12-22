import okio.FileSystem

actual fun getFileSystem() = Result.success(FileSystem.SYSTEM)

actual suspend fun executeProcess(process: String, args: List<String>): String {
    throw UnsupportedOperationException("EXEC is an experimental feature and is currently only available on JVM platform")
}
