package mirrg.xarpite

import kotlinx.coroutines.CoroutineScope
import mirrg.xarpite.compilers.objects.FluoriteValue

class RuntimeContext(
    val coroutineScope: CoroutineScope,
    val daemonScope: CoroutineScope,
    val io: IoContext,
)

interface IoContext {
    suspend fun out(value: FluoriteValue)
}

open class UnsupportedIoContext : IoContext {
    override suspend fun out(value: FluoriteValue) = throw UnsupportedOperationException()
}
