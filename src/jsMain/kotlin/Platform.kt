import okio.FileSystem

// TODO node
//import okio.NodeJsFileSystem

actual fun getProgramName(): String? = null

actual fun getEnv(): Map<String, String> {
    val env = process.env
    return Object_keys(env).associateWith { env[it].unsafeCast<String>() }
}

actual fun hasFreeze() = false

// TODO node
actual fun getFileSystem(): Result<FileSystem> = Result.failure(UnsupportedOperationException("Does not support file system operations on JS platform"))
//actual fun getFileSystem(): Result<FileSystem> = Result.success(NodeJsFileSystem)
