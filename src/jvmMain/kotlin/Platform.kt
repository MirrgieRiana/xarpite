import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import mirrg.xarpite.cli.INB_MAX_BUFFER_SIZE
import okio.FileSystem

actual fun getProgramName(): String? = null
actual fun getEnv(): Map<String, String> = System.getenv()
actual fun hasFreeze() = false
actual fun getFileSystem() = Result.success(FileSystem.SYSTEM)

actual suspend fun readLineFromStdin(): String? = withContext(Dispatchers.IO) { readlnOrNull() }

actual suspend fun readBytesFromStdin(): ByteArray? = withContext(Dispatchers.IO) {
    val byteArray = ByteArray(INB_MAX_BUFFER_SIZE)
    val readSize = System.`in`.read(byteArray)
    if (readSize == -1) return@withContext null
    if (readSize == INB_MAX_BUFFER_SIZE) byteArray else byteArray.copyOf(readSize)
}
