package mirrg.xarpite

import kotlinx.coroutines.CoroutineScope
import okio.FileSystem

expect fun getProgramName(): String?
expect fun hasFreeze(): Boolean
expect fun getFileSystem(): Result<FileSystem>
expect fun isWindows(): Boolean
expect suspend fun executeProcess(process: String, args: List<String>, env: Map<String, String?>): String
