import kotlinx.coroutines.coroutineScope
import kotlinx.coroutines.async
import kotlinx.coroutines.delay
import kotlinx.coroutines.runBlocking
import kotlin.system.measureTimeMillis
import kotlin.test.Test
import kotlinx.coroutines.channels.Channel

class ChannelBufferBenchmarkTest {

    @Test
    fun benchmarkChannelBuffers() = runBlocking {
        val buffers = listOf(0, 1, 100)
        val delays = listOf(0L, 1L)
        for (delayMs in delays) {
            val count = if (delayMs == 0L) 100_000 else 1_000
            for (buffer in buffers) {
                val (elapsedMs, consumed) = benchmark(buffer, count, delayMs)
                val throughputPerSec = count * 1000.0 / elapsedMs
                println(
                    "buffer=$buffer delay=${delayMs}ms -> $count items in ${elapsedMs}ms " +
                        "(~${"%.1f".format(throughputPerSec)} items/sec, consumed=$consumed)"
                )
            }
        }
    }

    private suspend fun benchmark(buffer: Int, count: Int, delayMs: Long): Pair<Long, Int> = coroutineScope {
        val channel = Channel<Int>(buffer)
        val receiver = async {
            repeat(count) {
                channel.receive()
                if (delayMs > 0) delay(delayMs)
            }
            count
        }
        val elapsedMs = measureTimeMillis {
            try {
                repeat(count) { channel.send(it) }
            } finally {
                channel.close()
            }
            receiver.await()
        }
        elapsedMs to count
    }
}
