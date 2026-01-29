package mirrg.xarpite

import okio.FileSystem

expect fun getProgramName(): String?
expect fun getPwd(): String
expect fun getEnv(): Map<String, String>
expect fun hasFreeze(): Boolean
expect fun getFileSystem(): Result<FileSystem>
expect fun isWindows(): Boolean
expect suspend fun readLineFromStdin(): String?
expect suspend fun readBytesFromStdin(): ByteArray?
expect suspend fun writeBytesToStdout(bytes: ByteArray)
expect suspend fun writeBytesToStderr(bytes: ByteArray)
expect suspend fun executeProcess(process: String, args: List<String>, env: Map<String, String?>): String
