package mirrg.xarpite.js.node

import kotlinx.coroutines.await
import kotlinx.coroutines.channels.ReceiveChannel
import kotlinx.coroutines.coroutineScope
import kotlinx.coroutines.flow.flow
import kotlinx.coroutines.flow.produceIn
import kotlinx.coroutines.suspendCancellableCoroutine
import mirrg.xarpite.IoContext
import mirrg.xarpite.WorkInProgressError
import mirrg.xarpite.cli.INB_MAX_BUFFER_SIZE
import mirrg.xarpite.cli.ShowUsage
import mirrg.xarpite.cli.ShowVersion
import mirrg.xarpite.cli.cliEval
import mirrg.xarpite.cli.parseArguments
import mirrg.xarpite.cli.showUsage
import mirrg.xarpite.cli.showVersion
import mirrg.xarpite.compilers.objects.FluoriteValue
import mirrg.xarpite.compilers.objects.toFluoriteString
import mirrg.xarpite.fileSystemGetter
import mirrg.xarpite.isWindowsImpl
import mirrg.xarpite.js.Object_keys
import mirrg.xarpite.js.createJsMounts
import mirrg.xarpite.js.scope
import okio.NodeJsFileSystem
import kotlin.coroutines.resume
import kotlin.coroutines.resumeWithException
import kotlin.js.Promise
import kotlin.math.min

suspend fun main() {
    val envGetter: () -> Map<String, String> = {
        val env = process.env
        Object_keys(env).associateWith { env[it].unsafeCast<String>() }
    }
    fileSystemGetter = { NodeJsFileSystem }
    isWindowsImpl = { process.platform === "win32" }
    val readLineFromStdinImpl: suspend () -> String? = { readLineFromStdinIterator.receiveCatching().getOrNull() }
    val readBytesFromStdinImpl: suspend () -> ByteArray? = { readBytesFromStdinIterator.receiveCatching().getOrNull() }
    val writeBytesToStdoutImpl: suspend (ByteArray) -> Unit = { bytes ->
        val uint8Array = js("new Uint8Array(bytes.length)")
        var i = 0
        while (i < bytes.size) {
            uint8Array[i] = bytes[i].toUByte().toInt()
            i++
        }
        suspendCancellableCoroutine { cont ->
            process.stdout.write(uint8Array) { error ->
                if (!cont.isActive) return@write
                if (error == null) {
                    cont.resume(Unit)
                } else {
                    cont.resumeWithException(error.unsafeCast<Throwable>())
                }
            }
        }
    }
    val writeBytesToStderrImpl: suspend (ByteArray) -> Unit = { bytes ->
        val uint8Array = js("new Uint8Array(bytes.length)")
        var i = 0
        while (i < bytes.size) {
            uint8Array[i] = bytes[i].toUByte().toInt()
            i++
        }
        suspendCancellableCoroutine { cont ->
            process.stderr.write(uint8Array) { error ->
                if (!cont.isActive) return@write
                if (error == null) {
                    cont.resume(Unit)
                } else {
                    cont.resumeWithException(error.unsafeCast<Throwable>())
                }
            }
        }
    }

    coroutineScope {
        val ioContext = object : IoContext {
            override fun getEnv(): Map<String, String> = envGetter()
            override fun getPlatformPwd(): String = process.cwd()
            override suspend fun out(value: FluoriteValue) = println(value.toFluoriteString(null).value)
            override suspend fun err(value: FluoriteValue) = writeBytesToStderr("${value.toFluoriteString(null).value}\n".encodeToByteArray())
            override suspend fun readLineFromStdin() = readLineFromStdinImpl()
            override suspend fun readBytesFromStdin() = readBytesFromStdinImpl()
            override suspend fun writeBytesToStdout(bytes: ByteArray) = writeBytesToStdoutImpl(bytes)
            override suspend fun writeBytesToStderr(bytes: ByteArray) = writeBytesToStderrImpl(bytes)
            override suspend fun executeProcess(process: String, args: List<String>, env: Map<String, String?>) = throw WorkInProgressError("EXEC is an experimental feature and is currently only available on JVM and Native platforms")
        }
        val options = try {
            parseArguments(process.argv.drop(2), ioContext)
        } catch (_: ShowUsage) {
            showUsage(ioContext)
            return@coroutineScope
        } catch (_: ShowVersion) {
            showVersion(ioContext)
            return@coroutineScope
        }
        cliEval(ioContext, options) {
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
