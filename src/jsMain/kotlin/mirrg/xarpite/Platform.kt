package mirrg.xarpite

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

var isWindowsImpl: (() -> Boolean)? = null
actual fun isWindows(): Boolean = isWindowsImpl!!()

var readLineFromStdinImpl: (suspend () -> String?)? = null
actual suspend fun readLineFromStdin(): String? = readLineFromStdinImpl!!()

var readBytesFromStdinImpl: (suspend () -> ByteArray?)? = null
actual suspend fun readBytesFromStdin(): ByteArray? = readBytesFromStdinImpl!!()

var writeBytesToStdoutImpl: (suspend (ByteArray) -> Unit)? = null
actual suspend fun writeBytesToStdout(bytes: ByteArray) = writeBytesToStdoutImpl!!(bytes)

var writeBytesToStderrImpl: (suspend (ByteArray) -> Unit)? = null
actual suspend fun writeBytesToStderr(bytes: ByteArray) = writeBytesToStderrImpl!!(bytes)

actual suspend fun executeProcess(process: String, args: List<String>, env: Map<String, String?>): String {
    throw WorkInProgressError("EXEC is an experimental feature and is currently only available on JVM and Native platforms")
}

// JS共通のactual実装（ブラウザとNode.jsで異なる動作）
actual fun getEnvironmentVariable(name: String): String? {
    // Node.js環境の場合はprocess.envから取得
    val processEnv = js("typeof process !== 'undefined' ? process.env : null")
    return if (processEnv != null) {
        processEnv[name]?.unsafeCast<String>()
    } else {
        null
    }
}

actual fun getPlatformSpecificPwd(): String {
    // Node.js環境の場合はprocess.cwd()を使用
    val processCwd = js("typeof process !== 'undefined' && typeof process.cwd === 'function' ? process.cwd() : null")
    return if (processCwd != null) {
        processCwd.unsafeCast<String>()
    } else {
        // ブラウザ環境ではサポートしないが、呼び出されることはないはず
        throw UnsupportedOperationException("getPlatformSpecificPwd is not supported in browser environment")
    }
}
