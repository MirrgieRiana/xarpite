package mirrg.xarpite.js.node

import envGetter
import fileSystemGetter
import kotlinx.coroutines.await
import kotlinx.coroutines.channels.ReceiveChannel
import kotlinx.coroutines.coroutineScope
import kotlinx.coroutines.flow.flow
import kotlinx.coroutines.flow.produceIn
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

suspend fun main() {
    envGetter = {
        val env = process.env
        Object_keys(env).associateWith { env[it].unsafeCast<String>() }
    }
    fileSystemGetter = { NodeJsFileSystem }
    readLineFromStdinImpl = { readLineFromStdinIterator.receiveCatching().getOrNull() }
    readBytesFromStdinImpl = { maxSize -> readBytesFromStdinIterator(maxSize).receiveCatching().getOrNull() }

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

fun readBytesFromStdinIterator(maxSize: Int): ReceiveChannel<ByteArray> {
    return flow {
        val byteIterator = js("(function(x) { return x[Symbol.asyncIterator](); })")(process.stdin)
        while (true) {
            val result = byteIterator.next().unsafeCast<Promise<dynamic>>().await()
            if (result.done) break
            val buffer = result.value.unsafeCast<dynamic>() // Buffer or Uint8Array
            val byteArray = ByteArray(buffer.length as Int) { i -> buffer[i].unsafeCast<Byte>() }
            if (byteArray.size <= maxSize) {
                emit(byteArray)
            } else {
                // Split into chunks
                var offset = 0
                while (offset < byteArray.size) {
                    val chunkSize = minOf(maxSize, byteArray.size - offset)
                    emit(byteArray.copyOfRange(offset, offset + chunkSize))
                    offset += chunkSize
                }
            }
        }
    }.produceIn(scope)
}
