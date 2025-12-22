import mirrg.xarpite.WorkInProgressError
import okio.FileSystem

actual fun getProgramName(): String? = null

var envGetter: () -> Map<String, String> = { emptyMap() }
actual fun getEnv(): Map<String, String> = envGetter()

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

var readLineFromStdinImpl: (suspend () -> String?)? = null
actual suspend fun readLineFromStdin(): String? = readLineFromStdinImpl!!()

var readBytesFromStdinImpl: (suspend () -> ByteArray?)? = null
actual suspend fun readBytesFromStdin(): ByteArray? = readBytesFromStdinImpl!!()

actual suspend fun executeProcess(process: String, args: List<String>): String {
    throw WorkInProgressError("EXEC is an experimental feature and is currently only available on JVM platform")
}
