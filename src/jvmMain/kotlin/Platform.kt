import okio.FileSystem

actual fun getProgramName(): String? = null
actual fun getEnv(): Map<String, String> = System.getenv()
actual fun hasFreeze() = false
actual fun getFileSystem() = Result.success(FileSystem.SYSTEM)
