import kotlinx.cinterop.ByteVar
import kotlinx.cinterop.ExperimentalForeignApi
import kotlinx.cinterop.allocArray
import kotlinx.cinterop.get
import kotlinx.cinterop.memScoped
import kotlinx.cinterop.refTo
import kotlinx.cinterop.toKString
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.IO
import kotlinx.coroutines.withContext
import mirrg.xarpite.cli.INB_MAX_BUFFER_SIZE
import mirrg.xarpite.compilers.objects.toFluoriteString
import mirrg.xarpite.operations.FluoriteException
import platform.posix.FILE
import platform.posix.WEXITSTATUS
import platform.posix.WIFEXITED
import platform.posix.__environ
import platform.posix.clearerr
import platform.posix.errno
import platform.posix.ferror
import platform.posix.fclose
import platform.posix.fgets
import platform.posix.fread
import platform.posix.fflush
import platform.posix.fwrite
import platform.posix.pclose
import platform.posix.popen
import platform.posix.set_posix_errno
import platform.posix.stdin
import platform.posix.stdout
import platform.posix.strerror
import kotlin.experimental.ExperimentalNativeApi

@OptIn(ExperimentalNativeApi::class)
actual fun getProgramName(): String? = Platform.programName

@OptIn(ExperimentalForeignApi::class)
actual fun getEnv(): Map<String, String> {
    val result = mutableMapOf<String, String>()
    var index = 0
    while (true) {
        val entryStringPointer = __environ?.get(index) ?: break
        val entryString = entryStringPointer.toKString()
        val keyLength = entryString.indexOf('=')
        if (keyLength >= 0) {
            val key = entryString.take(keyLength)
            val value = entryString.drop(keyLength + 1)
            result[key] = value
        }
        index++
    }
    return result
}

actual fun hasFreeze() = true

actual suspend fun readLineFromStdin(): String? = withContext(Dispatchers.IO) { readlnOrNull() }

@OptIn(ExperimentalForeignApi::class)
actual suspend fun readBytesFromStdin(): ByteArray? = withContext(Dispatchers.IO) {
    memScoped {
        val buffer = allocArray<ByteVar>(INB_MAX_BUFFER_SIZE)
        set_posix_errno(0)
        val readSize = fread(buffer, 1u, INB_MAX_BUFFER_SIZE.toULong(), stdin)
        if (ferror(stdin) != 0) {
            val e = errno
            val msg = strerror(e)?.toKString()
            clearerr(stdin)
            throw IllegalStateException("fread(stdin) failed: errno=$e${if (msg.isNullOrBlank()) "" else " $msg"}")
        }
        if (readSize == 0uL) null else ByteArray(readSize.toInt()) { buffer[it] }
    }
}

@OptIn(ExperimentalForeignApi::class)
actual suspend fun writeBytesToStdout(bytes: ByteArray) = withContext(Dispatchers.IO) {
    memScoped {
        if (bytes.isEmpty()) {
            fflush(stdout)
            return@memScoped
        }
        set_posix_errno(0)
        val writtenSize = fwrite(bytes.refTo(0), 1u, bytes.size.toULong(), stdout)
        val errorFlag = ferror(stdout)
        if (writtenSize.toInt() != bytes.size || errorFlag != 0) {
            val e = errno
            val msg = strerror(e)?.toKString()
            if (errorFlag != 0) {
                clearerr(stdout)
            }
            throw IllegalStateException("fwrite(stdout) failed: errno=$e${if (msg.isNullOrBlank()) "" else " $msg"}")
        }
        fflush(stdout)
    }
}

@OptIn(ExperimentalForeignApi::class)
actual suspend fun executeProcess(process: String, args: List<String>): String = withContext(Dispatchers.IO) {
    val commandList = listOf(process) + args
    // シェルコマンドとして実行するためにエスケープ処理を行う
    val escapedCommand = commandList.joinToString(" ") { arg ->
        if (arg.contains(" ") || arg.contains("'") || arg.contains("\"") || arg.contains("\\") || arg.contains("\$") || arg.contains("`")) {
            "'" + arg.replace("'", "'\\''") + "'"
        } else {
            arg
        }
    }
    
    // popenで標準出力を取得（標準エラー出力は別途処理）
    val pipe: FILE? = popen(escapedCommand, "r")
    
    if (pipe == null) {
        throw FluoriteException("Failed to execute command: $escapedCommand".toFluoriteString())
    }
    
    try {
        val output = StringBuilder()
        memScoped {
            val buffer = allocArray<ByteVar>(4096)
            while (true) {
                val line = fgets(buffer, 4096, pipe)
                if (line == null) break
                output.append(line.toKString())
            }
        }
        
        // プロセスを閉じて終了コードを取得
        val status = pclose(pipe)
        
        // 終了コードが0でない場合は例外をスロー
        if (WIFEXITED(status) && WEXITSTATUS(status) != 0) {
            throw FluoriteException("Process exited with code ${WEXITSTATUS(status)}".toFluoriteString())
        }
        
        output.toString()
    } catch (e: FluoriteException) {
        throw e
    } catch (e: Exception) {
        throw FluoriteException("Error executing command: ${e.message}".toFluoriteString())
    }
}
