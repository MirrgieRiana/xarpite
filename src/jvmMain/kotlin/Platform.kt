import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import okio.FileSystem

actual fun getProgramName(): String? = null
actual fun getEnv(): Map<String, String> = System.getenv()
actual fun hasFreeze() = false
actual fun getFileSystem() = Result.success(FileSystem.SYSTEM)

actual suspend fun readLineFromStdin(): String? = withContext(Dispatchers.IO) { readlnOrNull() }

actual suspend fun readBytesFromStdin(maxSize: Int): ByteArray? = withContext(Dispatchers.IO) {
    val buffer = ByteArray(maxSize)
    val bytesRead = System.`in`.read(buffer)
    if (bytesRead <= 0) null else buffer.copyOf(bytesRead)
}
