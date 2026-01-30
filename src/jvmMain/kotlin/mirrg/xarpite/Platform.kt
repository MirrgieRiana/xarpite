package mirrg.xarpite

import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.async
import kotlinx.coroutines.coroutineScope
import kotlinx.coroutines.withContext
import mirrg.xarpite.cli.INB_MAX_BUFFER_SIZE
import mirrg.xarpite.compilers.objects.toFluoriteString
import mirrg.xarpite.operations.FluoriteException
import okio.FileSystem
import java.io.BufferedReader
import java.io.File

actual fun getProgramName(): String? = null
actual fun getEnv(): Map<String, String> = System.getenv()
actual fun hasFreeze() = false
actual fun getFileSystem() = Result.success(FileSystem.SYSTEM)

actual fun isWindows(): Boolean {
    val os = System.getProperty("os.name")
    return os != null && os.lowercase().startsWith("windows")
}

actual suspend fun readLineFromStdin(): String? = withContext(Dispatchers.IO) { readlnOrNull() }

actual suspend fun readBytesFromStdin(): ByteArray? = withContext(Dispatchers.IO) {
    val byteArray = ByteArray(INB_MAX_BUFFER_SIZE)
    val readSize = System.`in`.read(byteArray)
    if (readSize == -1) return@withContext null
    if (readSize == INB_MAX_BUFFER_SIZE) byteArray else byteArray.copyOf(readSize)
}

actual suspend fun writeBytesToStdout(bytes: ByteArray) = withContext(Dispatchers.IO) {
    System.out.write(bytes)
    System.out.flush()
}

actual suspend fun writeBytesToStderr(bytes: ByteArray) = withContext(Dispatchers.IO) {
    System.err.write(bytes)
    System.err.flush()
}

actual suspend fun executeProcess(process: String, args: List<String>, env: Map<String, String?>, cwd: String?): String = coroutineScope {
    withContext(Dispatchers.IO) {
        val commandList = listOf(process) + args
        val processBuilder = ProcessBuilder(commandList)
        val environment = processBuilder.environment()
        env.forEach { (key, value) ->
            if (value.isNullOrEmpty()) {
                environment.remove(key)
            } else {
                environment[key] = value
            }
        }
        if (cwd != null) processBuilder.directory(File(cwd))
        val processInstance = processBuilder.start()

        try {
            // 標準出力を非同期で読み取る
            val outputDeferred = async {
                BufferedReader(processInstance.inputStream.reader()).use { reader ->
                    reader.readText()
                }
            }

            // 標準エラー出力を非同期で読み取り、Xarpiteのstderrに転送
            val errorDeferred = async {
                BufferedReader(processInstance.errorStream.reader()).use { reader ->
                    reader.forEachLine { line ->
                        System.err.println(line)
                    }
                }
            }

            // プロセスの終了を待つ
            val exitCode = processInstance.waitFor()

            // 出力を取得
            val output = outputDeferred.await()
            errorDeferred.await()

            // 終了コードが0でない場合は例外をスロー
            if (exitCode != 0) {
                throw FluoriteException("Process exited with code $exitCode".toFluoriteString())
            }

            output
        } finally {
            processInstance.destroy()
        }
    }
}
