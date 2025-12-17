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
    input: suspend () -> List<String>
): List<String> = withContext(Dispatchers.IO) {
    val processBuilder = ProcessBuilder(command)
    
    if (env != null) {
        processBuilder.environment().putAll(env)
    }
    
    if (dir != null) {
        processBuilder.directory(java.io.File(dir))
    }
    
    val process = processBuilder.start()
    
    // Handle stdin, stdout, and stderr concurrently to avoid deadlock
    val inputLines = input()
    
    kotlinx.coroutines.coroutineScope {
        // Start writing to stdin in a separate coroutine
        val stdinJob = launch(Dispatchers.IO) {
            process.outputStream.bufferedWriter().use { writer ->
                inputLines.forEach { line ->
                    writer.write(line)
                    writer.newLine()
                }
            }
        }
        
        // Read stdout and stderr concurrently
        val stdoutJob = async(Dispatchers.IO) {
            process.inputStream.bufferedReader().readLines()
        }
        
        val stderrJob = async(Dispatchers.IO) {
            process.errorStream.bufferedReader().readText()
        }
        
        // Wait for all I/O to complete
        stdinJob.join()
        val outputLines = stdoutJob.await()
        val errorOutput = stderrJob.await()
        
        // Wait for process to complete
        val exitCode = process.waitFor()
        
        if (exitCode != 0) {
            throw RuntimeException("Process exited with code $exitCode${if (errorOutput.isNotBlank()) ": $errorOutput" else ""}")
        }
        
        outputLines
    }
}
