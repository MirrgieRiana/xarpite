import kotlinx.cinterop.ByteVar
import kotlinx.cinterop.CPointerVar
import kotlinx.cinterop.ExperimentalForeignApi
import kotlinx.cinterop.IntVar
import kotlinx.cinterop.allocArray
import kotlinx.cinterop.alloc
import kotlinx.cinterop.cstr
import kotlinx.cinterop.get
import kotlinx.cinterop.memScoped
import kotlinx.cinterop.ptr
import kotlinx.cinterop.toKString
import kotlinx.cinterop.value
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.IO
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext
import mirrg.xarpite.cli.INB_MAX_BUFFER_SIZE
import platform.posix.*
import kotlin.experimental.ExperimentalNativeApi

@OptIn(ExperimentalNativeApi::class)
actual fun getProgramName(): String? = Platform.programName

@OptIn(ExperimentalForeignApi::class)
actual fun getEnv(): Map<String, String> {
    val result = mutableMapOf<String, String>()
    var index = 0
    while (true) {
        val entryStringPointer = __environ?.get(index) ?: break
        val entryString = entryStringPointer.toKString()
        val keyLength = entryString.indexOf('=')
        if (keyLength >= 0) {
            val key = entryString.take(keyLength)
            val value = entryString.drop(keyLength + 1)
            result[key] = value
        }
        index++
    }
    return result
}

actual fun hasFreeze() = true

actual suspend fun readLineFromStdin(): String? = withContext(Dispatchers.IO) { readlnOrNull() }

@OptIn(ExperimentalForeignApi::class)
actual suspend fun readBytesFromStdin(): ByteArray? = withContext(Dispatchers.IO) {
    memScoped {
        val buffer = allocArray<ByteVar>(INB_MAX_BUFFER_SIZE)
        set_posix_errno(0)
        val readSize = fread(buffer, 1u, INB_MAX_BUFFER_SIZE.toULong(), stdin)
        if (ferror(stdin) != 0) {
            val e = errno
            val msg = strerror(e)?.toKString()
            clearerr(stdin)
            throw IllegalStateException("fread(stdin) failed: errno=$e${if (msg.isNullOrBlank()) "" else " $msg"}")
        }
        if (readSize == 0uL) null else ByteArray(readSize.toInt()) { buffer[it] }
    }
}

@OptIn(ExperimentalForeignApi::class)
actual suspend fun executeProcess(
    command: List<String>,
    env: Map<String, String>?,
    dir: String?,
    input: suspend () -> String?
): suspend () -> String? = withContext(Dispatchers.IO) {
    if (command.isEmpty()) {
        throw IllegalArgumentException("Command cannot be empty")
    }
    
    // Use popen for a simpler implementation
    // Note: This doesn't support env, dir, or stdin properly, but provides basic functionality
    
    val commandStr = command.joinToString(" ") { arg ->
        // Simple shell escaping
        if (arg.contains(" ") || arg.contains("'") || arg.contains("\"")) {
            "'${arg.replace("'", "'\\''")}'"
        } else {
            arg
        }
    }
    
    val pipe = popen(commandStr, "r") ?: throw IllegalStateException("Failed to execute command")
    
    // Buffer for reading output line by line
    val lineBuffer = mutableListOf<String>()
    var finished = false
    
    // Read all output into buffer
    memScoped {
        val buffer = allocArray<ByteVar>(4096)
        val currentLine = StringBuilder()
        
        while (true) {
            val result = fgets(buffer, 4096, pipe)
            if (result == null) break
            
            val line = buffer.toKString()
            currentLine.append(line)
            
            // Check if line ends with newline
            if (line.endsWith('\n')) {
                lineBuffer.add(currentLine.toString().trimEnd('\n', '\r'))
                currentLine.clear()
            }
        }
        
        // Add remaining content if any
        if (currentLine.isNotEmpty()) {
            lineBuffer.add(currentLine.toString())
        }
        
        val exitCode = pclose(pipe)
        if (exitCode != 0) {
            throw RuntimeException("Process exited with code $exitCode")
        }
    }
    
    // Return a function that reads lines from the buffer
    var index = 0
    suspend {
        if (index < lineBuffer.size) {
            lineBuffer[index++]
        } else {
            null
        }
    }
}
