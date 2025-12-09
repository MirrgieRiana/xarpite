import okio.FileSystem

actual fun getProgramName(): String? = null
actual fun getEnv(): Map<String, String> = throw AssertionError()
actual fun hasFreeze() = false
actual fun getFileSystem(): Result<FileSystem> = Result.failure(UnsupportedOperationException("Does not support file system operations on JS platform")) // TODO node
