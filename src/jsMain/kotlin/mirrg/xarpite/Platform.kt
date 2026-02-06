package mirrg.xarpite

import kotlinx.coroutines.CoroutineScope
import okio.FileSystem

actual fun getProgramName(): String? = null

actual fun hasFreeze() = false

var fileSystemGetter: (() -> FileSystem)? = null
actual fun getFileSystem(): Result<FileSystem> {
    val fileSystemGetter = fileSystemGetter
    return if (fileSystemGetter != null) {
        Result.success(fileSystemGetter())
    } else {
        Result.failure(IllegalStateException("Does not support file system operations on JS Browser platform"))
    }
}

var isWindowsImpl: (() -> Boolean)? = null
actual fun isWindows(): Boolean = isWindowsImpl!!()

actual suspend fun executeProcess(ioContext: IoContext, coroutineScope: CoroutineScope, process: String, args: List<String>, env: Map<String, String?>): String {
    throw WorkInProgressError("EXEC is an experimental feature and is currently only available on JVM and Native platforms")
}
