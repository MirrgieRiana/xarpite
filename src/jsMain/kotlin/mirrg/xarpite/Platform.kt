package mirrg.xarpite

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
