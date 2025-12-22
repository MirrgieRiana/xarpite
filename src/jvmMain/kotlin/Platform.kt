import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.async
import kotlinx.coroutines.coroutineScope
import kotlinx.coroutines.withContext
import mirrg.xarpite.cli.INB_MAX_BUFFER_SIZE
import okio.FileSystem
import java.io.BufferedReader

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

actual suspend fun executeProcess(process: String, args: List<String>): String = coroutineScope {
    withContext(Dispatchers.IO) {
        val commandList = listOf(process) + args
        val processBuilder = ProcessBuilder(commandList)
        val proc = processBuilder.start()
        
        try {
            // 標準出力を非同期で読み取る（デッドロック回避のため）
            val outputDeferred = async {
                BufferedReader(proc.inputStream.reader()).use { reader ->
                    reader.readLines().joinToString("\n")
                }
            }
            
            // 標準エラー出力も非同期で読み取る（デッドロック回避のため）
            val errorDeferred = async {
                BufferedReader(proc.errorStream.reader()).use { reader ->
                    reader.readText()
                }
            }
            
            // プロセスの終了を待つ
            val exitCode = proc.waitFor()
            
            // 出力を取得
            val output = outputDeferred.await()
            val error = errorDeferred.await()
            
            // 終了コードが0でない場合は例外をスロー
            if (exitCode != 0) {
                val errorMessage = if (error.isNotEmpty()) {
                    "Process exited with code $exitCode: $error"
                } else {
                    "Process exited with code $exitCode"
                }
                throw IllegalStateException(errorMessage)
            }
            
            output
        } finally {
            proc.destroy()
        }
    }
}
