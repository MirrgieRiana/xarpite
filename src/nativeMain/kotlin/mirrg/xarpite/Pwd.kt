package mirrg.xarpite

import kotlinx.cinterop.ByteVar
import kotlinx.cinterop.ExperimentalForeignApi
import kotlinx.cinterop.allocArray
import kotlinx.cinterop.memScoped
import kotlinx.cinterop.toKString
import platform.posix.errno
import platform.posix.strerror

private const val PATH_BUFFER_SIZE = 8192 // getcwd用のバッファサイズ（長いパス名に対応）

@OptIn(ExperimentalForeignApi::class)
fun getPwdImpl(): String {
    memScoped {
        val buffer = allocArray<ByteVar>(PATH_BUFFER_SIZE)
        val result = platform.posix.getcwd(buffer, PATH_BUFFER_SIZE.toULong())
        if (result != null) {
            return result.toKString()
        } else {
            val errorMessage = strerror(errno)?.toKString() ?: "Unknown error"
            throw IllegalStateException("Failed to get current working directory: $errorMessage (errno=$errno)")
        }
    }
}
