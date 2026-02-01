package mirrg.xarpite

import kotlinx.coroutines.CoroutineScope
import mirrg.kotlin.helium.atLeast
import mirrg.kotlin.helium.atMost
import mirrg.kotlin.helium.notBlankOrNull
import mirrg.xarpite.compilers.objects.FluoriteValue
import okio.Path.Companion.toPath

class RuntimeContext(
    val coroutineScope: CoroutineScope,
    val daemonScope: CoroutineScope,
    val io: IoContext,
) {

    private val srcs = mutableMapOf<String, String>()

    fun setSrc(location: String, src: String) {
        srcs[location] = src
    }

    fun getModuleSrc(location: String): String {
        return srcs.getOrPut(location) {
            getFileSystem().getOrThrow().read(location.toPath()) { readUtf8() }
        }
    }


    private val matrixPositionCalculatorCache = mutableMapOf<String, MatrixPositionCalculator>()

    fun renderPosition(position: Position?): String {
        if (position == null) return "UNKNOWN"
        val src = srcs[position.location] ?: return position.location
        val matrixPositionCalculator = matrixPositionCalculatorCache.getOrPut(position.location) {
            MatrixPositionCalculator(src)
        }
        val (row, column) = matrixPositionCalculator.toMatrixPosition(position.index)
        val line = matrixPositionCalculator.getLine(row)
        val startColumnIndex = (column - 1) - 10 atLeast 0
        val endColumnIndex = (column - 1) + 11 atMost line.length
        val snippet = line.substring(startColumnIndex, endColumnIndex)
        val startEllipsis = if (startColumnIndex > 0) "..." else ""
        val endEllipsis = if (endColumnIndex < line.length) "..." else ""
        return "${position.location}:$row:$column  $startEllipsis$snippet$endEllipsis"
    }

}

interface IoContext {
    fun getPlatformPwd(): String
    suspend fun out(value: FluoriteValue)
    suspend fun err(value: FluoriteValue)
    suspend fun readLineFromStdin(): String?
    suspend fun readBytesFromStdin(): ByteArray?
    suspend fun writeBytesToStdout(bytes: ByteArray)
    suspend fun writeBytesToStderr(bytes: ByteArray)
    suspend fun executeProcess(process: String, args: List<String>, env: Map<String, String?>): String
}

fun IoContext.getPwd(): String = getEnv().run { this["XARPITE_PWD"]?.notBlankOrNull ?: this["PWD"]?.notBlankOrNull ?: getPlatformPwd() }

open class UnsupportedIoContext : IoContext {
    override fun getPlatformPwd(): String = throw UnsupportedOperationException()
    override suspend fun out(value: FluoriteValue) = throw UnsupportedOperationException()
    override suspend fun err(value: FluoriteValue) = throw UnsupportedOperationException()
    override suspend fun readLineFromStdin(): String? = throw UnsupportedOperationException()
    override suspend fun readBytesFromStdin(): ByteArray? = throw UnsupportedOperationException()
    override suspend fun writeBytesToStdout(bytes: ByteArray) = throw UnsupportedOperationException()
    override suspend fun writeBytesToStderr(bytes: ByteArray) = throw UnsupportedOperationException()
    override suspend fun executeProcess(process: String, args: List<String>, env: Map<String, String?>): String = throw UnsupportedOperationException()
}
