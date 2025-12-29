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
import platform.posix.EACCES
import platform.posix.EAGAIN
import platform.posix.EINTR
import platform.posix.ENOENT
import platform.posix.EWOULDBLOCK
import platform.posix.F_GETFL
import platform.posix.F_SETFL
import platform.posix.O_NONBLOCK
import platform.posix.STDERR_FILENO
import platform.posix.STDOUT_FILENO
import platform.posix.__environ
import platform.posix.clearerr
import platform.posix.close
import platform.posix.dup2
import platform.posix.errno
import platform.posix.execvp
import platform.posix.exit
import platform.posix.fcntl
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
import platform.posix.stderr
import platform.posix.strerror
import platform.posix.usleep
import platform.posix.waitpid
import platform.posix.write
import kotlin.experimental.ExperimentalNativeApi

const val EXEC_MAX_BUFFER_SIZE = 4096

// POSIXマクロの実装（Kotlin/Nativeでは関数として提供されていない場合がある）
private fun WIFEXITED(status: Int): Boolean = ((status and 0x7f) == 0)
private fun WEXITSTATUS(status: Int): Int = ((status and 0xff00) shr 8)
// WIFSIGNALEDの実装: シグナルで終了した場合、下位7ビットが非ゼロかつ0x7fでない
private fun WIFSIGNALED(status: Int): Boolean {
    val term = status and 0x7f
    return term != 0 && term != 0x7f
}

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
        // パイプを作成（標準出力用と標準エラー出力用）
        val stdoutPipe = allocArray<IntVar>(2)
        val stderrPipe = allocArray<IntVar>(2)
        
        if (pipe(stdoutPipe) != 0) {
            throw FluoriteException("Failed to create stdout pipe".toFluoriteString())
        }
        
        if (pipe(stderrPipe) != 0) {
            // stdoutパイプをクリーンアップ
            close(stdoutPipe[0])
            close(stdoutPipe[1])
            throw FluoriteException("Failed to create stderr pipe".toFluoriteString())
        }
        
        val pid: pid_t
        try {
            pid = fork()
        } catch (t: Throwable) {
            // forkが失敗した場合、すべてのパイプをクリーンアップ
            close(stdoutPipe[0])
            close(stdoutPipe[1])
            close(stderrPipe[0])
            close(stderrPipe[1])
            throw t
        }
        
        when {
            pid < 0 -> {
                // fork失敗
                close(stdoutPipe[0])
                close(stdoutPipe[1])
                close(stderrPipe[0])
                close(stderrPipe[1])
                throw FluoriteException("Failed to fork process".toFluoriteString())
            }
            pid == 0 -> {
                // 子プロセス
                // 標準出力と標準エラー出力をパイプに接続
                close(stdoutPipe[0]) // 読み取り側を閉じる
                close(stderrPipe[0])
                
                if (dup2(stdoutPipe[1], STDOUT_FILENO) == -1) {
                    perror("dup2 stdout")
                    close(stdoutPipe[1])
                    close(stderrPipe[1])
                    exit(1)
                }
                close(stdoutPipe[1])
                
                if (dup2(stderrPipe[1], STDERR_FILENO) == -1) {
                    perror("dup2 stderr")
                    close(stderrPipe[1])
                    exit(1)
                }
                close(stderrPipe[1])
                
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
                // エラーの種類に応じて異なる終了コードを使用
                val exitCode = when (errno) {
                    ENOENT -> 127 // コマンドが見つからない
                    EACCES -> 126 // 実行権限がない
                    else -> 125 // その他のエラー
                }
                exit(exitCode)
                @Suppress("UNREACHABLE_CODE")
                error("Should not reach here")
            }
            else -> {
                // 親プロセス
                close(stdoutPipe[1]) // 書き込み側を閉じる
                close(stderrPipe[1])
                
                // パイプを非ブロッキングモードに設定してデッドロックを防ぐ
                val stdoutFlags = fcntl(stdoutPipe[0], F_GETFL, 0)
                fcntl(stdoutPipe[0], F_SETFL, stdoutFlags or O_NONBLOCK)
                
                val stderrFlags = fcntl(stderrPipe[0], F_GETFL, 0)
                fcntl(stderrPipe[0], F_SETFL, stderrFlags or O_NONBLOCK)
                
                try {
                    // 標準出力を読み取る
                    val outputBytes = mutableListOf<Byte>()
                    val stdoutBuffer = allocArray<ByteVar>(EXEC_MAX_BUFFER_SIZE)
                    
                    // 標準エラー出力を読み取る
                    val stderrBuffer = allocArray<ByteVar>(EXEC_MAX_BUFFER_SIZE)
                    
                    // 両方のパイプから非ブロッキングで読み取る
                    // これによりデッドロックを防ぎ、stdoutとstderrを並行して処理できる
                    var stdoutClosed = false
                    var stderrClosed = false
                    
                    while (!stdoutClosed || !stderrClosed) {
                        var dataRead = false
                        
                        // 標準出力を読み取り
                        if (!stdoutClosed) {
                            val bytesRead = read(stdoutPipe[0], stdoutBuffer, EXEC_MAX_BUFFER_SIZE.toULong())
                            when {
                                bytesRead > 0 -> {
                                    dataRead = true
                                    // バッファからバイトを収集
                                    for (i in 0 until bytesRead.toInt()) {
                                        outputBytes.add(stdoutBuffer[i])
                                    }
                                }
                                bytesRead == 0L -> stdoutClosed = true // EOF
                                bytesRead == -1L && errno == EINTR -> {} // シグナルで中断された場合は再試行
                                bytesRead == -1L && (errno == EAGAIN || errno == EWOULDBLOCK) -> {
                                    // データが利用可能になるまで待つ（非ブロッキング）
                                }
                                bytesRead == -1L -> {
                                    // その他のエラー
                                    val errorMessage = strerror(errno)?.toKString() ?: "Unknown error"
                                    throw FluoriteException(
                                        "Failed to read from child process stdout: $errorMessage (errno=$errno)".toFluoriteString()
                                    )
                                }
                                else -> error("Unexpected read result: $bytesRead")
                            }
                        }
                        
                        // 標準エラー出力を読み取り、Xarpiteのstderrに転送
                        if (!stderrClosed) {
                            val bytesRead = read(stderrPipe[0], stderrBuffer, EXEC_MAX_BUFFER_SIZE.toULong())
                            when {
                                bytesRead > 0 -> {
                                    dataRead = true
                                    // stderrに書き込む
                                    write(STDERR_FILENO, stderrBuffer, bytesRead.toULong())
                                }
                                bytesRead == 0L -> stderrClosed = true // EOF
                                bytesRead == -1L && errno == EINTR -> {} // シグナルで中断された場合は再試行
                                bytesRead == -1L && (errno == EAGAIN || errno == EWOULDBLOCK) -> {
                                    // データが利用可能になるまで待つ（非ブロッキング）
                                }
                                bytesRead == -1L -> {
                                    // stderrの読み取りエラーは無視
                                    // 標準出力の取得が主目的であり、stderrはデバッグ情報のため
                                    stderrClosed = true
                                }
                                else -> stderrClosed = true
                            }
                        }
                        
                        // 両方のパイプにデータがない場合、短時間スリープしてCPU使用率を抑える
                        if (!dataRead && (!stdoutClosed || !stderrClosed)) {
                            usleep(1000u) // 1ミリ秒スリープ
                        }
                    }
                    
                    // 子プロセスの終了を待つ
                    val statusPtr = alloc<IntVar>()
                    var waitResult: pid_t
                    do {
                        waitResult = waitpid(pid, statusPtr.ptr, 0)
                    } while (waitResult.toLong() == -1L && errno == EINTR)
                    
                    if (waitResult.toLong() == -1L) {
                        val errMsg = strerror(errno)?.toKString() ?: "Unknown error"
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
                    close(stderrPipe[0])
                }
            }
        }
    }
}
