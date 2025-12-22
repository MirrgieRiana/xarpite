import okio.FileSystem

actual fun getFileSystem() = Result.success(FileSystem.SYSTEM)
