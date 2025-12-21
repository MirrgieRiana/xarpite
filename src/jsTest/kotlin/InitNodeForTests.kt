import envGetter
import executeProcessImpl
import fileSystemGetter
import kotlinx.coroutines.await
import kotlinx.coroutines.channels.Channel
import kotlinx.coroutines.coroutineScope
import kotlinx.coroutines.launch
import mirrg.xarpite.js.Object_keys
import readBytesFromStdinImpl
import readLineFromStdinImpl
import kotlin.js.Promise

// External Node.js child_process module
@JsModule("child_process")
@JsNonModule
external object childProcessModule {
    fun spawn(command: String, args: Array<String>, options: dynamic): dynamic
}

// Initialize Node.js implementations for testing
fun initializeNodeForTests() {
    // Check if we're running in Node.js environment
    val isNode = try {
        js("typeof process !== 'undefined' && process.versions != null && process.versions.node != null").unsafeCast<Boolean>()
    } catch (e: Throwable) {
        false
    }
    
    if (!isNode) return
    
    // Initialize environment variable getter
    envGetter = {
        val env = js("process.env")
        Object_keys(env).associateWith { env[it].unsafeCast<String>() }
    }
    
    // Initialize file system - use dynamic import to avoid compile-time dependency
    fileSystemGetter = {
        try {
            val NodeJsFileSystem = js("require('okio').NodeJsFileSystem")
            NodeJsFileSystem.unsafeCast<okio.FileSystem>()
        } catch (e: Throwable) {
            throw IllegalStateException("NodeJsFileSystem not available", e)
        }
    }
    
    // Initialize stdin readers (not used in tests but required)
    readLineFromStdinImpl = { null }
    readBytesFromStdinImpl = { null }
    
    // Initialize process execution
    executeProcessImpl = { command, env, dir, input ->
        executeProcessForTests(command, env, dir, input)
    }
}

suspend fun executeProcessForTests(
    command: List<String>,
    env: Map<String, String>?,
    dir: String?,
    input: suspend () -> String?
): suspend () -> String? = coroutineScope {
    val options = js("({})")
    
    if (env != null) {
        val mergedEnv = js("Object.assign({}, process.env)")
        env.forEach { (k, v) -> mergedEnv[k] = v }
        options.env = mergedEnv
    }
    
    if (dir != null) {
        options.cwd = dir
    }
    
    // Spawn the process
    val proc = childProcessModule.spawn(command[0], command.drop(1).toTypedArray(), options)
    
    // Handle stdin
    launch {
        try {
            while (true) {
                val line = input() ?: break
                proc.stdin.write("$line\n")
            }
            proc.stdin.end()
        } catch (e: Throwable) {
            // Input stream closed
        }
    }
    
    // Collect stdout
    val outputChannel = Channel<String>(Channel.UNLIMITED)
    proc.stdout.setEncoding("utf8")
    val stdoutIterator = js("(function(x) { return x[Symbol.asyncIterator](); })")(proc.stdout)
    
    launch {
        try {
            val sb = StringBuilder()
            var afterR = false
            while (true) {
                val result = stdoutIterator.next().unsafeCast<Promise<dynamic>>().await()
                if (result.done) {
                    if (sb.isNotEmpty()) {
                        outputChannel.send(sb.toString())
                        sb.clear()
                    }
                    break
                }
                val string = result.value.unsafeCast<String>()
                var index = 0
                while (index < string.length) {
                    if (afterR && string[index] == '\n') {
                        index++
                        afterR = false
                        continue
                    }
                    val r = string.indexOf('\r', index)
                    val n = string.indexOf('\n', index)
                    val lineEnd = if (r == -1) n else if (n == -1) r else minOf(r, n)
                    if (lineEnd == -1) {
                        sb.append(string.substring(index))
                        index = string.length
                        afterR = false
                    } else {
                        sb.append(string.substring(index, lineEnd))
                        outputChannel.send(sb.toString())
                        sb.clear()
                        index = lineEnd + 1
                        afterR = string[lineEnd] == '\r'
                    }
                }
            }
        } finally {
            outputChannel.close()
        }
    }
    
    // Collect stderr
    val stderrBuilder = StringBuilder()
    proc.stderr.setEncoding("utf8")
    proc.stderr.on("data") { chunk -> stderrBuilder.append(chunk.unsafeCast<String>()) }
    
    // Wait for exit
    val exitPromise = Promise<Int> { resolve, _ ->
        proc.on("exit") { code -> resolve(code.unsafeCast<Int>()) }
    }
    
    // Return output reader
    suspend {
        val line = outputChannel.receiveCatching().getOrNull()
        if (line == null) {
            // No more output, check exit code
            val exitCode = exitPromise.await()
            if (exitCode != 0) {
                val errorOutput = stderrBuilder.toString()
                throw RuntimeException("Process exited with code $exitCode${if (errorOutput.isNotBlank()) ": $errorOutput" else ""}")
            }
        }
        line
    }
}
