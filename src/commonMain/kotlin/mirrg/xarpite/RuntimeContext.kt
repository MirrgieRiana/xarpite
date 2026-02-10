package mirrg.xarpite

import kotlinx.coroutines.CoroutineScope
import mirrg.kotlin.helium.atLeast
import mirrg.kotlin.helium.atMost
import mirrg.xarpite.cli.getPwd
import mirrg.xarpite.compilers.objects.FluoriteArray
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
        val pwdPath = io.getPwd().toPath()
        val locationPath = position.location.toPath()
        val location = if (pwdPath.isAncestorOf(locationPath)) {
            locationPath.relativeTo(pwdPath).toString()
        } else {
            position.location
        }
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
        val errorPositionInSnippet = column - 1 - startColumnIndex
        val leftMargin = " ".repeat(10 - errorPositionInSnippet)
        val rowDigits = row.toString().length
        val columnDigits = column.toString().length
        val positionPadding = " ".repeat((3 - rowDigits) + (3 - columnDigits))
        return "$location:$row:$column$positionPadding  $startEllipsis$leftMargin$snippet$endEllipsis"
    }


    val inc = FluoriteArray()
    val moduleResult = mutableMapOf<String, FluoriteValue>()

}

/**
 * すべてのメソッドはスレッドセーフです。
 */
interface IoContext {
    fun getEnv(): Map<String, String>
    fun getPlatformPwd(): String
    suspend fun out(value: FluoriteValue)
    suspend fun err(value: FluoriteValue)
    suspend fun readLineFromStdin(): String?
    suspend fun readBytesFromStdin(): ByteArray?
    suspend fun writeBytesToStdout(bytes: ByteArray)
    suspend fun writeBytesToStderr(bytes: ByteArray)
    suspend fun executeProcess(process: String, args: List<String>, env: Map<String, String?>): String
}

open class UnsupportedIoContext : IoContext {
    override fun getEnv(): Map<String, String> = throw UnsupportedOperationException()
    override fun getPlatformPwd(): String = throw UnsupportedOperationException()
    override suspend fun out(value: FluoriteValue): Unit = throw UnsupportedOperationException()
    override suspend fun err(value: FluoriteValue): Unit = throw UnsupportedOperationException()
    override suspend fun readLineFromStdin(): String? = throw UnsupportedOperationException()
    override suspend fun readBytesFromStdin(): ByteArray? = throw UnsupportedOperationException()
    override suspend fun writeBytesToStdout(bytes: ByteArray): Unit = throw UnsupportedOperationException()
    override suspend fun writeBytesToStderr(bytes: ByteArray): Unit = throw UnsupportedOperationException()
    override suspend fun executeProcess(process: String, args: List<String>, env: Map<String, String?>): String = throw UnsupportedOperationException()
}
