import okio.FileSystem

expect fun getProgramName(): String?
expect fun getEnv(): Map<String, String>
expect fun hasFreeze(): Boolean
expect fun getFileSystem(): Result<FileSystem>
expect suspend fun readLineFromStdin(): String?
expect suspend fun readBytesFromStdin(): ByteArray?
