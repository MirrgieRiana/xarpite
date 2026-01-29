package mirrg.xarpite

import kotlinx.cinterop.ByteVar
import kotlinx.cinterop.ExperimentalForeignApi
import kotlinx.cinterop.alloc
import kotlinx.cinterop.allocArray
import kotlinx.cinterop.memScoped
import kotlinx.cinterop.ptr
import kotlinx.cinterop.readValue
import kotlinx.cinterop.toKString
import mirrg.xarpite.compilers.objects.toFluoriteString
import mirrg.xarpite.operations.FluoriteException
import platform.posix.ERANGE
import platform.posix.errno
import platform.posix.fstat
import platform.posix.stat
import platform.posix.strerror

@OptIn(ExperimentalForeignApi::class)
private data class StatInfo(val dev: ULong, val ino: ULong)

@OptIn(ExperimentalForeignApi::class)
private fun getCurrentDirStat(): StatInfo = memScoped {
    val s = alloc<platform.posix.stat>()
    if (fstat(0, s.ptr) != 0) {
        val e = errno
        val errorMessage = strerror(e)?.toKString() ?: "Unknown error"
        throw FluoriteException("Failed to fstat current directory: $errorMessage (errno=$e)".toFluoriteString())
    }
    StatInfo(s.st_dev, s.st_ino)
}

@OptIn(ExperimentalForeignApi::class)
private fun statPath(path: String): StatInfo? = memScoped {
    val s = alloc<platform.posix.stat>()
    if (stat(path, s.ptr) == 0) {
        StatInfo(s.st_dev, s.st_ino)
    } else {
        null
    }
}

@OptIn(ExperimentalForeignApi::class)
private fun getCwdPhysical(): String {
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

@OptIn(ExperimentalForeignApi::class)
fun getPwdImpl(): String {
    // 1. XARPITE_PWD環境変数を最優先で使用（シェルスクリプト経由で設定）
    val xarpitePwd = platform.posix.getenv("XARPITE_PWD")?.toKString()
    if (xarpitePwd != null && xarpitePwd.startsWith("/")) {
        return xarpitePwd
    }
    
    // 2. PWD環境変数を検証してから使用
    val envPwd = platform.posix.getenv("PWD")?.toKString()
    if (envPwd != null && envPwd.startsWith("/")) {
        // 環境変数PWDのstatを取得
        val envStat = statPath(envPwd)
        if (envStat != null) {
            // カレントディレクトリのstatと比較
            val cwdStat = getCurrentDirStat()
            // デバイス番号とinode番号が一致する場合のみ論理パス（環境変数PWD）を返す
            if (envStat.dev == cwdStat.dev && envStat.ino == cwdStat.ino) {
                return envPwd
            }
        }
    }
    
    // 3. プラットフォーム固有の方法で取得（物理パス）
    return getCwdPhysical()
}
