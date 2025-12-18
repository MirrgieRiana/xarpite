import kotlinx.cinterop.*
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.IO
import kotlinx.coroutines.coroutineScope
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
    
    // Create pipes
    val stdinPipe = IntArray(2)
    val stdoutPipe = IntArray(2)
    val stderrPipe = IntArray(2)
    
    memScoped {
        val stdinPipeNative = allocArray<IntVar>(2)
        val stdoutPipeNative = allocArray<IntVar>(2)
        val stderrPipeNative = allocArray<IntVar>(2)
        
        if (pipe(stdinPipeNative) != 0) {
            throw IllegalStateException("Failed to create stdin pipe: errno=$errno")
        }
        stdinPipe[0] = stdinPipeNative[0]
        stdinPipe[1] = stdinPipeNative[1]
        
        if (pipe(stdoutPipeNative) != 0) {
            close(stdinPipe[0])
            close(stdinPipe[1])
            throw IllegalStateException("Failed to create stdout pipe: errno=$errno")
        }
        stdoutPipe[0] = stdoutPipeNative[0]
        stdoutPipe[1] = stdoutPipeNative[1]
        
        if (pipe(stderrPipeNative) != 0) {
            close(stdinPipe[0])
            close(stdinPipe[1])
            close(stdoutPipe[0])
            close(stdoutPipe[1])
            throw IllegalStateException("Failed to create stderr pipe: errno=$errno")
        }
        stderrPipe[0] = stderrPipeNative[0]
        stderrPipe[1] = stderrPipeNative[1]
    }
    
    val pid = fork()
    
    if (pid < 0) {
        // Fork failed
        close(stdinPipe[0])
        close(stdinPipe[1])
        close(stdoutPipe[0])
        close(stdoutPipe[1])
        close(stderrPipe[0])
        close(stderrPipe[1])
        throw IllegalStateException("Failed to fork process: errno=$errno")
    }
    
    if (pid == 0) {
        // Child process
        
        // Redirect stdin
        close(stdinPipe[1])
        dup2(stdinPipe[0], STDIN_FILENO)
        close(stdinPipe[0])
        
        // Redirect stdout
        close(stdoutPipe[0])
        dup2(stdoutPipe[1], STDOUT_FILENO)
        close(stdoutPipe[1])
        
        // Redirect stderr
        close(stderrPipe[0])
        dup2(stderrPipe[1], STDERR_FILENO)
        close(stderrPipe[1])
        
        // Change directory if specified
        if (dir != null) {
            if (chdir(dir) != 0) {
                perror("chdir failed")
                _exit(1)
            }
        }
        
        // Prepare environment if specified
        if (env != null) {
            val currentEnv = getEnv().toMutableMap()
            currentEnv.putAll(env)
            currentEnv.forEach { (key, value) ->
                setenv(key, value, 1)
            }
        }
        
        // Prepare arguments using memScoped for child process
        memScoped {
            val argc = command.size
            val argv = allocArray<CPointerVar<ByteVar>>(argc + 1)
            for (i in command.indices) {
                argv[i] = command[i].cstr.ptr
            }
            argv[argc] = null
            
            // Execute the command
            execvp(command[0], argv)
            
            // If execvp returns, it failed
            perror("execvp failed")
            _exit(1)
        }
        // This should never be reached
        error("Child process did not exit after exec")
    }
    
    // Parent process
    // Parent process
    
    // Close unused pipe ends
    close(stdinPipe[0])
    close(stdoutPipe[1])
    close(stderrPipe[1])
    
    val stdinFd = stdinPipe[1]
    val stdoutFd = stdoutPipe[0]
    val stderrFd = stderrPipe[0]
    
    // Set stdout and stderr to non-blocking
    fcntl(stdoutFd, F_SETFL, fcntl(stdoutFd, F_GETFL, 0) or O_NONBLOCK)
    fcntl(stderrFd, F_SETFL, fcntl(stderrFd, F_GETFL, 0) or O_NONBLOCK)
    
    // Shared state for streaming
    val outputBuffer = StringBuilder()
    val stderrBuffer = StringBuilder()
    var stdinClosed = false
    var stdoutEOF = false
    var processExited = false
    var exitCode = 0
    
    // Launch coroutines for input/stderr handling
    coroutineScope {
        // Handle stdin writes
        launch {
            try {
                while (!stdinClosed) {
                    val line = input() ?: break
                    val data = "$line\n"
                    memScoped {
                        val bytes = data.encodeToByteArray()
                        var offset = 0
                        while (offset < bytes.size) {
                            val written = write(stdinFd, bytes.refTo(offset), (bytes.size - offset).toULong())
                            if (written < 0) {
                                if (errno == EAGAIN || errno == EWOULDBLOCK) {
                                    kotlinx.coroutines.delay(10)
                                    continue
                                }
                                break
                            }
                            offset += written.toInt()
                        }
                    }
                }
            } finally {
                close(stdinFd)
                stdinClosed = true
            }
        }
        
        // Handle stderr reading
        launch {
            memScoped {
                val buffer = allocArray<ByteVar>(4096)
                while (!processExited) {
                    val bytesRead = read(stderrFd, buffer, 4096u)
                    if (bytesRead > 0) {
                        for (i in 0 until bytesRead.toInt()) {
                            stderrBuffer.append(buffer[i].toInt().toChar())
                        }
                    } else if (bytesRead == 0L) {
                        break
                    } else {
                        if (errno != EAGAIN && errno != EWOULDBLOCK) {
                            break
                        }
                        kotlinx.coroutines.delay(10)
                    }
                }
                close(stderrFd)
            }
        }
    }
    
    // Return streaming reader function
    val reader: suspend () -> String? = reader@{
        // Try to extract a complete line from buffer
        val newlineIndex = outputBuffer.indexOf('\n')
        if (newlineIndex >= 0) {
            val line = outputBuffer.substring(0, newlineIndex)
            // Remove the line from buffer
            val remaining = outputBuffer.substring(newlineIndex + 1)
            outputBuffer.clear()
            outputBuffer.append(remaining)
            return@reader line
        }
        
        // Read more data from stdout
        if (!stdoutEOF) {
            memScoped {
                val buffer = allocArray<ByteVar>(4096)
                while (true) {
                    val bytesRead = read(stdoutFd, buffer, 4096u)
                    
                    if (bytesRead > 0) {
                        for (i in 0 until bytesRead.toInt()) {
                            outputBuffer.append(buffer[i].toInt().toChar())
                        }
                        
                        // Check if we now have a complete line
                        val idx = outputBuffer.indexOf('\n')
                        if (idx >= 0) {
                            val line = outputBuffer.substring(0, idx)
                            val remaining = outputBuffer.substring(idx + 1)
                            outputBuffer.clear()
                            outputBuffer.append(remaining)
                            return@reader line
                        }
                        // Continue reading
                    } else if (bytesRead == 0L) {
                        // EOF reached
                        stdoutEOF = true
                        close(stdoutFd)
                        
                        // Wait for process to exit
                        if (!processExited) {
                            memScoped {
                                val statusPtr = alloc<IntVar>()
                                val result = waitpid(pid, statusPtr.ptr, 0)
                                if (result > 0) {
                                    processExited = true
                                    // Extract exit code using bit operations (WEXITSTATUS macro equivalent)
                                    exitCode = (statusPtr.value shr 8) and 0xFF
                                    
                                    if (exitCode != 0) {
                                        val stderrText = stderrBuffer.toString()
                                        throw RuntimeException("Process exited with code $exitCode${if (stderrText.isNotEmpty()) ": $stderrText" else ""}")
                                    }
                                }
                            }
                        }
                        break
                    } else {
                        // Would block or error
                        if (errno == EAGAIN || errno == EWOULDBLOCK) {
                            kotlinx.coroutines.delay(10)
                            continue
                        }
                        break
                    }
                }
            }
        }
        
        // Return remaining buffer content if any
        if (outputBuffer.isNotEmpty()) {
            val line = outputBuffer.toString()
            outputBuffer.clear()
            return@reader line
        }
        
        null
    }
    reader
}
