package mirrg.xarpite

import okio.FileSystem

expect fun getProgramName(): String?
expect fun hasFreeze(): Boolean
expect fun getFileSystem(): Result<FileSystem>
expect fun isWindows(): Boolean
