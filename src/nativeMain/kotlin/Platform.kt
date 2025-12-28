import kotlinx.cinterop.ByteVar
import kotlinx.cinterop.ExperimentalForeignApi
import kotlinx.cinterop.IntVar
import kotlinx.cinterop.alloc
import kotlinx.cinterop.allocArray
import kotlinx.cinterop.allocArrayOf
import kotlinx.cinterop.cstr
import kotlinx.cinterop.get
import kotlinx.cinterop.memScoped
import kotlinx.cinterop.ptr
import kotlinx.cinterop.refTo
import kotlinx.cinterop.toKString
import kotlinx.cinterop.value
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.IO
import kotlinx.coroutines.withContext
import mirrg.xarpite.cli.INB_MAX_BUFFER_SIZE
import mirrg.xarpite.compilers.objects.toFluoriteString
import mirrg.xarpite.operations.FluoriteException
import platform.posix.EINTR
import platform.posix.STDERR_FILENO
import platform.posix.STDOUT_FILENO
import platform.posix.WEXITSTATUS
import platform.posix.WIFEXITED
import platform.posix.WIFSIGNALED
import platform.posix.__environ
import platform.posix.clearerr
import platform.posix.close
import platform.posix.dup2
import platform.posix.errno
import platform.posix.execvp
import platform.posix.exit
import platform.posix.ferror
import platform.posix.fork
import platform.posix.fread
import platform.posix.fflush
import platform.posix.fwrite
import platform.posix.perror
import platform.posix.pid_t
import platform.posix.pipe
import platform.posix.read
import platform.posix.set_posix_errno
import platform.posix.stdin
import platform.posix.stdout
import platform.posix.strerror
import platform.posix.waitpid
import kotlin.experimental.ExperimentalNativeApi

val EXEC_MAX_BUFFER_SIZE = 4096

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
    memScoped {
        // パイプを作成（標準出力用）
        val stdoutPipe = allocArray<IntVar>(2)
        if (pipe(stdoutPipe) != 0) {
            throw FluoriteException("Failed to create pipe".toFluoriteString())
        }
        
        val pid: pid_t = fork()
        
        when {
            pid < 0 -> {
                // fork失敗
                close(stdoutPipe[0])
                close(stdoutPipe[1])
                throw FluoriteException("Failed to fork process".toFluoriteString())
            }
            pid == 0 -> {
                // 子プロセス
                // 標準出力をパイプに接続
                close(stdoutPipe[0]) // 読み取り側を閉じる
                if (dup2(stdoutPipe[1], STDOUT_FILENO) == -1) {
                    perror("dup2")
                    close(stdoutPipe[1])
                    exit(1)
                }
                close(stdoutPipe[1])
                
                // 引数配列を構築
                // cstrオブジェクトをリストに保持してGCから保護
                val cstrArgs = listOf(process.cstr) + args.map { it.cstr }
                val argv = allocArrayOf(
                    *cstrArgs.map { it.ptr }.toTypedArray(),
                    null
                )
                
                // プロセスを実行
                execvp(process, argv)
                
                // execvpが戻ってきた場合はエラー
                // エラー情報をstderrに出力
                perror("execvp")
                exit(127)
            }
            else -> {
                // 親プロセス
                close(stdoutPipe[1]) // 書き込み側を閉じる
                
                try {
                    // 標準出力を読み取る
                    val outputBytes = mutableListOf<Byte>()
                    val buffer = allocArray<ByteVar>(EXEC_MAX_BUFFER_SIZE)
                    while (true) {
                        val bytesRead = read(stdoutPipe[0], buffer, EXEC_MAX_BUFFER_SIZE.toULong())
                        when {
                            bytesRead > 0 -> {
                                // バッファからバイトを収集
                                for (i in 0 until bytesRead.toInt()) {
                                    outputBytes.add(buffer[i])
                                }
                            }
                            bytesRead == 0L -> break // EOF
                            errno == EINTR -> continue // シグナルで中断された場合は再試行
                            else -> {
                                // その他のエラー
                                val errorCode = errno
                                val errorMessage = strerror(errorCode)?.toKString() ?: "Unknown error"
                                throw FluoriteException(
                                    "Failed to read from child process: $errorMessage (errno=$errorCode)".toFluoriteString()
                                )
                            }
                        }
                    }
                    
                    // 子プロセスの終了を待つ
                    val statusPtr = alloc<IntVar>()
                    var waitResult: pid_t
                    do {
                        waitResult = waitpid(pid, statusPtr.ptr, 0)
                    } while (waitResult.toLong() == -1L && errno == EINTR)
                    
                    if (waitResult.toLong() == -1L) {
                        val errMsg = strerror(errno)?.toKString() ?: "unknown error"
                        throw FluoriteException("waitpid failed: $errMsg (errno=$errno)".toFluoriteString())
                    }
                    
                    val status = statusPtr.value
                    
                    // 終了コードをチェック
                    when {
                        WIFEXITED(status) -> {
                            val exitCode = WEXITSTATUS(status)
                            if (exitCode != 0) {
                                throw FluoriteException("Process exited with code $exitCode".toFluoriteString())
                            }
                        }
                        WIFSIGNALED(status) -> {
                            throw FluoriteException("Process terminated by signal".toFluoriteString())
                        }
                        else -> {
                            throw FluoriteException("Process terminated abnormally (status=$status)".toFluoriteString())
                        }
                    }
                    
                    // バイト配列を文字列に変換
                    outputBytes.toByteArray().decodeToString()
                } finally {
                    close(stdoutPipe[0])
                }
            }
        }
    }
}
