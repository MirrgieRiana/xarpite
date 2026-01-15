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
    suspend fun readLineFromStdin(): String?
    suspend fun readBytesFromStdin(): ByteArray?
    suspend fun writeBytesToStdout(bytes: ByteArray)
    suspend fun writeBytesToStderr(bytes: ByteArray)
    suspend fun executeProcess(process: String, args: List<String>): String
}

open class UnsupportedIoContext : IoContext {
    override suspend fun out(value: FluoriteValue) = throw UnsupportedOperationException()
    override suspend fun readLineFromStdin(): String? = throw UnsupportedOperationException()
    override suspend fun readBytesFromStdin(): ByteArray? = throw UnsupportedOperationException()
    override suspend fun writeBytesToStdout(bytes: ByteArray) = throw UnsupportedOperationException()
    override suspend fun writeBytesToStderr(bytes: ByteArray) = throw UnsupportedOperationException()
    override suspend fun executeProcess(process: String, args: List<String>): String = throw UnsupportedOperationException()
}
