import kotlinx.coroutines.coroutineScope
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch
import kotlinx.coroutines.runBlocking
import kotlin.system.measureTimeMillis
import kotlin.test.Test
import kotlinx.coroutines.channels.Channel

class ChannelBufferBenchmarkTest {

    @Test
    fun benchmarkChannelBuffers() = runBlocking {
        val count = 1_000
        val buffers = listOf(0, 1, 100)
        val delays = listOf(0L, 1L)
        for (delayMs in delays) {
            for (buffer in buffers) {
                val (elapsedMs, consumed) = benchmark(buffer, count, delayMs)
                val throughputPerSec = count * 1000.0 / elapsedMs
                println("buffer=$buffer delay=${delayMs}ms -> $count items in ${elapsedMs}ms (~${"%.1f".format(throughputPerSec)} items/sec, consumed=$consumed)")
            }
        }
    }

    private suspend fun benchmark(buffer: Int, count: Int, delayMs: Long): Pair<Long, Int> = coroutineScope {
        val channel = Channel<Int>(buffer)
        var consumed = 0
        val receiver = launch {
            repeat(count) { value ->
                val v = channel.receive()
                consumed += v
                if (delayMs > 0) delay(delayMs)
            }
        }
        val elapsedMs = measureTimeMillis {
            repeat(count) { channel.send(it) }
            receiver.join()
        }
        channel.close()
        elapsedMs to consumed
    }
}
