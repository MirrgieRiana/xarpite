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
    
    // Write input to process stdin if provided
    val inputLines = input()
    if (inputLines.isNotEmpty()) {
        process.outputStream.bufferedWriter().use { writer ->
            inputLines.forEach { line ->
                writer.write(line)
                writer.newLine()
            }
        }
    } else {
        process.outputStream.close()
    }
    
    // Read output from process stdout
    val outputLines = process.inputStream.bufferedReader().readLines()
    
    // Wait for process to complete
    val exitCode = process.waitFor()
    
    if (exitCode != 0) {
        val errorOutput = process.errorStream.bufferedReader().readText()
        throw RuntimeException("Process exited with code $exitCode${if (errorOutput.isNotBlank()) ": $errorOutput" else ""}")
    }
    
    outputLines
}
