import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.async
import kotlinx.coroutines.launch
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

actual suspend fun executeProcess(
    command: List<String>,
    env: Map<String, String>?,
    dir: String?,
    input: suspend () -> String?
): suspend () -> String? = withContext(Dispatchers.IO) {
    val processBuilder = ProcessBuilder(command)
    
    if (env != null) {
        processBuilder.environment().putAll(env)
    }
    
    if (dir != null) {
        processBuilder.directory(java.io.File(dir))
    }
    
    val process = processBuilder.start()
    
    // Handle stdin, stdout, and stderr concurrently to avoid deadlock
    kotlinx.coroutines.coroutineScope {
        // Start writing to stdin in a separate coroutine
        launch(Dispatchers.IO) {
            process.outputStream.bufferedWriter().use { writer ->
                while (true) {
                    val line = input() ?: break
                    writer.write(line)
                    writer.newLine()
                }
            }
        }
        
        // Read stdout line by line
        val reader = process.inputStream.bufferedReader()
        
        // Start reading stderr in background
        val stderrJob = async(Dispatchers.IO) {
            process.errorStream.bufferedReader().readText()
        }
        
        // Return a suspend function that reads lines one at a time
        val outputReader: suspend () -> String? = suspend {
            withContext(Dispatchers.IO) {
                val line = reader.readLine()
                if (line == null) {
                    // No more output, wait for process to complete
                    val exitCode = process.waitFor()
                    val errorOutput = stderrJob.await()
                    
                    if (exitCode != 0) {
                        throw RuntimeException("Process exited with code $exitCode${if (errorOutput.isNotBlank()) ": $errorOutput" else ""}")
                    }
                }
                line
            }
        }
        
        outputReader
    }
}
