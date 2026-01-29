package mirrg.xarpite

import kotlinx.cinterop.ByteVar
import kotlinx.cinterop.ExperimentalForeignApi
import kotlinx.cinterop.allocArray
import kotlinx.cinterop.memScoped
import kotlinx.cinterop.toKString
import mirrg.xarpite.compilers.objects.toFluoriteString
import mirrg.xarpite.operations.FluoriteException
import platform.posix.ERANGE
import platform.posix.errno
import platform.posix.strerror

@OptIn(ExperimentalForeignApi::class)
fun getPwdImpl(): String {
    // 環境変数PWDを優先使用（シンボリックリンクを解決しない論理パス）
    platform.posix.getenv("PWD")?.toKString()?.let { return it }
    
    // 環境変数がない場合はgetcwd()を使用
    var bufferSize = 256
    val maxBufferSize = 1024 * 1024

    while (true) {
        memScoped {
            val buffer = allocArray<ByteVar>(bufferSize)
            val result = platform.posix.getcwd(buffer, bufferSize.toULong())
            if (result == null) {
                val e = errno
                if (e == ERANGE) {
                    bufferSize *= 2
                    if (bufferSize > maxBufferSize) {
                        throw FluoriteException("Failed to get current working directory: path too long (exceeds $maxBufferSize bytes)".toFluoriteString())
                    }
                    continue
                } else {
                    val errorMessage = strerror(e)?.toKString() ?: "Unknown error"
                    throw FluoriteException("Failed to get current working directory: $errorMessage (errno=$e)".toFluoriteString())
                }
            }
            return result.toKString()
        }
    }
}
