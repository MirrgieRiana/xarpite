import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import okio.FileSystem

actual fun getProgramName(): String? = null
actual fun getEnv(): Map<String, String> = System.getenv()
actual fun hasFreeze() = false
actual fun getFileSystem() = Result.success(FileSystem.SYSTEM)

actual suspend fun readLineFromStdin(): String? = withContext(Dispatchers.IO) { readlnOrNull() }
