package mirrg.xarpite.js.node

import envGetter
import executeProcessImpl
import fileSystemGetter
import kotlinx.coroutines.await
import kotlinx.coroutines.channels.Channel
import kotlinx.coroutines.channels.ReceiveChannel
import kotlinx.coroutines.coroutineScope
import kotlinx.coroutines.flow.flow
import kotlinx.coroutines.flow.produceIn
import kotlinx.coroutines.launch
import mirrg.xarpite.cli.INB_MAX_BUFFER_SIZE
import mirrg.xarpite.cli.ShowUsage
import mirrg.xarpite.cli.main
import mirrg.xarpite.cli.parseArguments
import mirrg.xarpite.cli.showUsage
import mirrg.xarpite.js.Object_keys
import mirrg.xarpite.js.createJsMounts
import mirrg.xarpite.js.scope
import okio.NodeJsFileSystem
import readBytesFromStdinImpl
import readLineFromStdinImpl
import kotlin.js.Promise
import kotlin.math.min

suspend fun main() {
    envGetter = {
        val env = process.env
        Object_keys(env).associateWith { env[it].unsafeCast<String>() }
    }
    fileSystemGetter = { NodeJsFileSystem }
    readLineFromStdinImpl = { readLineFromStdinIterator.receiveCatching().getOrNull() }
    readBytesFromStdinImpl = { readBytesFromStdinIterator.receiveCatching().getOrNull() }
    executeProcessImpl = { command, env, dir, input ->
        executeProcessNode(command, env, dir, input)
    }

    val options = try {
        parseArguments(process.argv.drop(2))
    } catch (_: ShowUsage) {
        showUsage()
        return
    }
    coroutineScope {
        main(options, this) {
            createJsMounts()
        }
    }
}

val readLineFromStdinIterator: ReceiveChannel<String> by lazy {
    flow {
        process.stdin.setEncoding("utf8")
        val stringIterator = js("(function(x) { return x[Symbol.asyncIterator](); })")(process.stdin)
        val sb = StringBuilder()
        var afterR = false
        while (true) {
            val result = stringIterator.next().unsafeCast<Promise<dynamic>>().await()
            if (result.done) {
                if (sb.isNotEmpty()) {
                    emit(sb.toString())
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
                    emit(sb.toString())
                    sb.clear()
                    index = lineEnd + 1
                    afterR = string[lineEnd] == '\r'
                }
            }
        }
    }.produceIn(scope)
}

val readBytesFromStdinIterator: ReceiveChannel<ByteArray> by lazy {
    flow {
        val bytesIterator = js("(function(x) { return x[Symbol.asyncIterator](); })")(process.stdin)
        while (true) {
            val result = bytesIterator.next().unsafeCast<Promise<dynamic>>().await()
            if (result.done) break
            val buffer = result.value.unsafeCast<dynamic>()
            val byteArray = ByteArray(buffer.length.unsafeCast<Int>()) { i -> buffer[i].unsafeCast<Byte>() }
            if (byteArray.size <= INB_MAX_BUFFER_SIZE) {
                emit(byteArray)
            } else {
                var offset = 0
                while (offset < byteArray.size) {
                    val chunkSize = min(INB_MAX_BUFFER_SIZE, byteArray.size - offset)
                    emit(byteArray.copyOfRange(offset, offset + chunkSize))
                    offset += chunkSize
                }
            }
        }
    }.produceIn(scope)
}

suspend fun executeProcessNode(
    command: List<String>,
    env: Map<String, String>?,
    dir: String?,
    input: suspend () -> String?
): suspend () -> String? = coroutineScope {
    val childProcess = js("require('child_process')")
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
    val proc = childProcess.spawn(command[0], command.drop(1).toTypedArray(), options)
    
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
