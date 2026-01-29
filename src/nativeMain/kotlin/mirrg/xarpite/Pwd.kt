package mirrg.xarpite

import kotlinx.cinterop.ByteVar
import kotlinx.cinterop.ExperimentalForeignApi
import kotlinx.cinterop.allocArray
import kotlinx.cinterop.memScoped
import kotlinx.cinterop.toKString
import platform.posix.ERANGE
import platform.posix.errno
import platform.posix.strerror

@OptIn(ExperimentalForeignApi::class)
fun getPwdImpl(): String {
    // 初期バッファサイズ: 多くの環境で十分な256バイトから開始
    var bufferSize = 256
    val maxBufferSize = 1048576 // 最大1MBまで拡張（異常に長いパスを検出）
    
    while (bufferSize <= maxBufferSize) {
        memScoped {
            val buffer = allocArray<ByteVar>(bufferSize)
            val result = platform.posix.getcwd(buffer, bufferSize.toULong())
            if (result != null) {
                return result.toKString()
            } else {
                val e = errno
                if (e == ERANGE) {
                    // バッファが小さすぎる場合は2倍にして再試行
                    bufferSize *= 2
                } else {
                    // その他のエラーは即座に報告
                    val errorMessage = strerror(e)?.toKString() ?: "Unknown error"
                    throw IllegalStateException("Failed to get current working directory: $errorMessage (errno=$e)")
                }
            }
        }
    }
    
    // バッファサイズの上限に達した場合
    throw IllegalStateException("Failed to get current working directory: path too long (exceeds $maxBufferSize bytes)")
}
