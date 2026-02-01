package mirrg.xarpite

import kotlinx.cinterop.ByteVar
import kotlinx.cinterop.ExperimentalForeignApi
import kotlinx.cinterop.allocArray
import kotlinx.cinterop.convert
import kotlinx.cinterop.memScoped
import kotlinx.cinterop.toKString
import mirrg.xarpite.compilers.objects.toFluoriteString
import mirrg.xarpite.operations.FluoriteException
import platform.posix.ERANGE
import platform.posix.errno
import platform.posix.getcwd
import platform.posix.strerror

@OptIn(ExperimentalForeignApi::class)
fun getPwdImpl(): String {
    var bufferSize = 256
    val maxBufferSize = 1024 * 1024

    while (true) {
        memScoped {
            val buffer = allocArray<ByteVar>(bufferSize)
            val result = getcwd(buffer, bufferSize.convert())
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
