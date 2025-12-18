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
): suspend () -> String? {
    if (command.isEmpty()) {
        throw IllegalArgumentException("Command cannot be empty")
    }
    
    return withContext(Dispatchers.IO) {
        // Create pipes for stdin, stdout, stderr
        memScoped {
            val stdinPipe = allocArray<IntVar>(2)
            val stdoutPipe = allocArray<IntVar>(2)
            val stderrPipe = allocArray<IntVar>(2)
            
            if (pipe(stdinPipe) != 0) {
                throw IllegalStateException("Failed to create stdin pipe: errno=$errno")
            }
            if (pipe(stdoutPipe) != 0) {
                close(stdinPipe[0])
                close(stdinPipe[1])
                throw IllegalStateException("Failed to create stdout pipe: errno=$errno")
            }
            if (pipe(stderrPipe) != 0) {
                close(stdinPipe[0])
                close(stdinPipe[1])
                close(stdoutPipe[0])
                close(stdoutPipe[1])
                throw IllegalStateException("Failed to create stderr pipe: errno=$errno")
            }
            
            val pid = fork()
            
            when {
                pid < 0 -> {
                    // Fork failed
                    close(stdinPipe[0])
                    close(stdinPipe[1])
                    close(stdoutPipe[0])
                    close(stdoutPipe[1])
                    close(stderrPipe[0])
                    close(stderrPipe[1])
                    throw IllegalStateException("Failed to fork process: errno=$errno")
                }
                pid == 0 -> {
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
                            exit(1)
                        }
                    }
                    
                    // Prepare arguments - memScoped ensures cstr memory stays valid
                    val argc = command.size
                    val argStrings = command.map { it.cstr }
                    val argv = allocArray<CPointerVar<ByteVar>>(argc + 1)
                    for (i in argStrings.indices) {
                        argv!![i] = argStrings[i].ptr
                    }
                    argv!![argc] = null
                    
                    // Prepare environment if specified
                    val envp = if (env != null) {
                        val currentEnv = getEnv().toMutableMap()
                        currentEnv.putAll(env)
                        val envList = currentEnv.map { "${it.key}=${it.value}" }
                        val envStrings = envList.map { it.cstr }
                        val envArray = allocArray<CPointerVar<ByteVar>>(envStrings.size + 1)
                        for (i in envStrings.indices) {
                            envArray!![i] = envStrings[i].ptr
                        }
                        envArray!![envStrings.size] = null
                        envArray
                    } else {
                        __environ
                    }
                    
                    // Execute the command
                    execve(command[0], argv, envp)
                    
                    // If execve returns, it failed
                    perror("execve failed")
                    exit(1)
                }
                else -> {
                    // Parent process
                    
                    // Close unused pipe ends
                    close(stdinPipe[0])
                    close(stdoutPipe[1])
                    close(stderrPipe[1])
                    
                    val stdinFd = stdinPipe[1]
                    val stdoutFd = stdoutPipe[0]
                    val stderrFd = stderrPipe[0]
                    
                    // Set pipes to non-blocking mode
                    fcntl(stdoutFd, F_SETFL, fcntl(stdoutFd, F_GETFL, 0) or O_NONBLOCK)
                    fcntl(stderrFd, F_SETFL, fcntl(stderrFd, F_GETFL, 0) or O_NONBLOCK)
                    
                    // Shared state for the reader - use mutable list instead of StringBuilder
                    val outputLines = mutableListOf<String>()
                    val currentLine = StringBuilder()
                    val stderrLines = mutableListOf<String>()
                    var processExited = false
                    var stdinClosed = false
                    
                    // Launch coroutines within a scope
                    kotlinx.coroutines.coroutineScope {
                        // Launch coroutine to write input
                        launch {
                            withContext(Dispatchers.IO) {
                                try {
                                    while (!stdinClosed) {
                                        val line = input() ?: break
                                        val data = "$line\n"
                                        var offset = 0
                                        while (offset < data.length) {
                                            val written = write(stdinFd, data.substring(offset).cstr.ptr, (data.length - offset).toULong())
                                            if (written < 0) {
                                                if (errno == EAGAIN || errno == EWOULDBLOCK) {
                                                    // Would block, wait a bit
                                                    kotlinx.coroutines.delay(10)
                                                    continue
                                                }
                                                break
                                            }
                                            offset += written.toInt()
                                        }
                                    }
                                } finally {
                                    close(stdinFd)
                                    stdinClosed = true
                                }
                            }
                        }
                        
                        // Launch coroutine to collect stderr
                        launch {
                            withContext(Dispatchers.IO) {
                                val buffer = allocArray<ByteVar>(4096)
                                while (!processExited) {
                                    val bytesRead = read(stderrFd, buffer, 4096u)
                                    if (bytesRead > 0) {
                                        val text = buffer.toKString().substring(0, bytesRead.toInt())
                                        stderrLines.add(text)
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
                    
                    // Return reader function for streaming output
                    val reader: suspend () -> String? = label@{
                        // Try to read a line from existing lines
                        if (outputLines.isNotEmpty()) {
                            return@label outputLines.removeAt(0)
                        }
                        
                        // Try to get a complete line from current buffer
                        val newlineIndex = currentLine.indexOf('\n')
                        if (newlineIndex >= 0) {
                            val line = currentLine.substring(0, newlineIndex)
                            // Remove the line from buffer
                            val remaining = currentLine.substring(newlineIndex + 1)
                            currentLine.clear()
                            currentLine.append(remaining)
                            return@label line
                        }
                        
                        // Read more data from stdout
                        val buffer = allocArray<ByteVar>(4096)
                        while (true) {
                            val bytesRead = read(stdoutFd, buffer, 4096u)
                            
                            if (bytesRead > 0) {
                                val text = buffer.toKString().substring(0, bytesRead.toInt())
                                currentLine.append(text)
                                
                                // Try to extract lines
                                val lines = currentLine.toString().split('\n')
                                if (lines.size > 1) {
                                    // We have at least one complete line
                                    currentLine.clear()
                                    currentLine.append(lines.last())
                                    // Add all but last to output lines
                                    for (i in 0 until lines.size - 1) {
                                        outputLines.add(lines[i])
                                    }
                                    if (outputLines.isNotEmpty()) {
                                        return@label outputLines.removeAt(0)
                                    }
                                }
                                // Continue reading
                            } else if (bytesRead == 0L) {
                                // EOF reached
                                if (!processExited) {
                                    // Wait for process to exit
                                    val statusPtr = alloc<IntVar>()
                                    val result = waitpid(pid, statusPtr.ptr, 0)
                                    if (result > 0) {
                                        processExited = true
                                        val exitCode = (statusPtr.value shr 8) and 0xFF
                                        close(stdoutFd)
                                        
                                        if (exitCode != 0) {
                                            val stderrText = stderrLines.joinToString("")
                                            throw RuntimeException("Process exited with code $exitCode${if (stderrText.isNotEmpty()) ": $stderrText" else ""}")
                                        }
                                    }
                                }
                                
                                // Return remaining buffer content if any
                                if (currentLine.isNotEmpty()) {
                                    val line = currentLine.toString()
                                    currentLine.clear()
                                    return@label line
                                }
                                
                                return@label null
                            } else {
                                // Error or would block
                                if (errno == EAGAIN || errno == EWOULDBLOCK) {
                                    // Would block, wait a bit
                                    kotlinx.coroutines.delay(10)
                                    continue
                                }
                                // Real error
                                break
                            }
                        }
                        
                        null
                    }
                    
                    reader
                }
            }
        }
    }
}
