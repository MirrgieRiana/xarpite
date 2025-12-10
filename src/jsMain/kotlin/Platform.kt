import okio.FileSystem

actual fun getProgramName(): String? = null

var envGetter: () -> Map<String, String> = { emptyMap() }
actual fun getEnv(): Map<String, String> = envGetter()

actual fun hasFreeze() = false

var fileSystemGetter: (() -> FileSystem)? = null
actual fun getFileSystem(): Result<FileSystem> {
    val fileSystemGetter = fileSystemGetter
    return if (fileSystemGetter != null) {
        Result.success(fileSystemGetter())
    } else {
        Result.failure(IllegalStateException("Does not support file system operations on JS Browser platform"))
    }
}
