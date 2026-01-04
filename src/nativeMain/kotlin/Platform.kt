import kotlinx.cinterop.ByteVar
import kotlinx.cinterop.CPointer
import kotlinx.cinterop.CPointerVar
import kotlinx.cinterop.ExperimentalForeignApi
import kotlinx.cinterop.IntVar
import kotlinx.cinterop.alloc
import kotlinx.cinterop.allocArray
import kotlinx.cinterop.allocArrayOf
import kotlinx.cinterop.cstr
import kotlinx.cinterop.get
import kotlinx.cinterop.memScoped
import kotlinx.cinterop.plus
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
import platform.posix.errno
import platform.posix.fcntl
import platform.posix.ferror
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
import platform.posix.spawn.posix_spawn
import platform.posix.spawn.posix_spawn_file_actions_addclose
import platform.posix.spawn.posix_spawn_file_actions_adddup2
import platform.posix.spawn.posix_spawn_file_actions_destroy
import platform.posix.spawn.posix_spawn_file_actions_init
import platform.posix.spawn.posix_spawn_file_actions_tVar
import kotlin.experimental.ExperimentalNativeApi

// EXEC関数の定数
const val EXEC_MAX_BUFFER_SIZE = 4096

// リトライ制限
const val WAITPID_MAX_RETRIES = 1000
const val STDERR_WRITE_MAX_RETRIES = 100

// スリープ時間（マイクロ秒）
const val STDERR_WRITE_RETRY_SLEEP_MICROS = 1000u // 1ミリ秒
const val IO_POLLING_SLEEP_MICROS = 10000u // 10ミリ秒
const val WAITPID_RETRY_SLEEP_MICROS = 1000u // 1ミリ秒

// POSIXマクロの実装（Kotlin/Nativeでは関数として提供されていない場合がある）
// 注: これらのビットマスクはLinux固有の実装です。他のPOSIXシステムでは異なる可能性があります。
private fun WIFEXITED(status: Int): Boolean = ((status and 0x7f) == 0)
private fun WEXITSTATUS(status: Int): Int = ((status and 0xff00) shr 8)
// WIFSIGNALEDの実装: シグナルで終了した場合、下位7ビットが非ゼロかつ0x7fでない
private fun WIFSIGNALED(status: Int): Boolean {
    val term = status and 0x7f
    return term != 0 && term != 0x7f
}
// WTERMSIGの実装: プロセスを終了させたシグナル番号を取得
private fun WTERMSIG(status: Int): Int = (status and 0x7f)

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

/**
 * パイプを非ブロッキングモードに設定するヘルパー関数
 * @param fd ファイルディスクリプタ
 * @param name デバッグ用の名前
 * @throws FluoriteException 設定に失敗した場合
 */
@OptIn(ExperimentalForeignApi::class)
private fun setNonBlocking(fd: Int, name: String) {
    val flags = fcntl(fd, F_GETFL, 0)
    if (flags == -1) {
        perror("fcntl F_GETFL $name")
        throw FluoriteException("Failed to get flags for $name pipe".toFluoriteString())
    }
    if (fcntl(fd, F_SETFL, flags or O_NONBLOCK) == -1) {
        perror("fcntl F_SETFL $name")
        throw FluoriteException("Failed to set non-blocking mode for $name pipe".toFluoriteString())
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
        
        // posix_spawn用のfile actionsを設定
        val fileActions = alloc<posix_spawn_file_actions_tVar>()
        if (posix_spawn_file_actions_init(fileActions.ptr) != 0) {
            close(stdoutPipe[0])
            close(stdoutPipe[1])
            close(stderrPipe[0])
            close(stderrPipe[1])
            throw FluoriteException("Failed to initialize posix_spawn file actions".toFluoriteString())
        }
        
        try {
            // 子プロセス側で標準出力をパイプに接続
            if (posix_spawn_file_actions_adddup2(fileActions.ptr, stdoutPipe[1], STDOUT_FILENO) != 0) {
                throw FluoriteException("Failed to add dup2 for stdout".toFluoriteString())
            }
            // 子プロセス側で標準エラー出力をパイプに接続
            if (posix_spawn_file_actions_adddup2(fileActions.ptr, stderrPipe[1], STDERR_FILENO) != 0) {
                throw FluoriteException("Failed to add dup2 for stderr".toFluoriteString())
            }
            
            // 子プロセス側でパイプの読み取り側を閉じる
            if (posix_spawn_file_actions_addclose(fileActions.ptr, stdoutPipe[0]) != 0) {
                throw FluoriteException("Failed to add close for stdout read end".toFluoriteString())
            }
            if (posix_spawn_file_actions_addclose(fileActions.ptr, stderrPipe[0]) != 0) {
                throw FluoriteException("Failed to add close for stderr read end".toFluoriteString())
            }
            
            // 子プロセス側でパイプの書き込み側を閉じる（dup2の後なので不要になる）
            if (posix_spawn_file_actions_addclose(fileActions.ptr, stdoutPipe[1]) != 0) {
                throw FluoriteException("Failed to add close for stdout write end".toFluoriteString())
            }
            if (posix_spawn_file_actions_addclose(fileActions.ptr, stderrPipe[1]) != 0) {
                throw FluoriteException("Failed to add close for stderr write end".toFluoriteString())
            }
            
            // 引数配列を構築
            // cstrオブジェクトをリストに保持してGCから保護
            val cstrArgs = listOf(process.cstr) + args.map { it.cstr }
            val argv = allocArrayOf(
                *cstrArgs.map { it.ptr }.toTypedArray(),
                null
            )
            
            // posix_spawnでプロセスを起動
            val pidVar = alloc<IntVar>()
            val spawnResult = posix_spawn(pidVar.ptr, process, fileActions.ptr, null, argv, __environ)
            
            // 親プロセス側でパイプの書き込み側を閉じる
            close(stdoutPipe[1])
            close(stderrPipe[1])
            
            if (spawnResult != 0) {
                // posix_spawnが失敗した場合
                close(stdoutPipe[0])
                close(stderrPipe[0])
                val errorMessage = when (spawnResult) {
                    ENOENT -> "Command not found: $process"
                    EACCES -> "Permission denied: $process"
                    else -> {
                        val msg = strerror(spawnResult)?.toKString()
                        "Failed to spawn process: $process${if (msg.isNullOrBlank()) "" else " ($msg)"}"
                    }
                }
                throw FluoriteException(errorMessage.toFluoriteString())
            }
            
            val pid = pidVar.value
            
            // パイプを非ブロッキングモードに設定してデッドロックを防ぐ
            try {
                setNonBlocking(stdoutPipe[0], "stdout")
                setNonBlocking(stderrPipe[0], "stderr")
            } catch (e: Throwable) {
                close(stdoutPipe[0])
                close(stderrPipe[0])
                throw e
            }
            
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
                                // stderrに書き込む（部分書き込みとEINTRを考慮）
                                var totalWritten = 0
                                var writeRetryCount = 0
                                while (totalWritten < bytesRead.toInt()) {
                                    val remaining = (bytesRead.toInt() - totalWritten).toULong()
                                    // ポインター演算でstderrバッファの適切な位置を取得
                                    val ptr = stderrBuffer + totalWritten
                                    val written = write(STDERR_FILENO, ptr, remaining)
                                    when {
                                        written > 0 -> {
                                            totalWritten += written.toInt()
                                            writeRetryCount = 0 // リセット
                                        }
                                        written == -1L && errno == EINTR -> {
                                            // シグナルによる一時的な中断は再試行
                                            continue
                                        }
                                        written == 0L -> {
                                            // 進捗なし: ビジーウェイトを避けるためスリープ
                                            writeRetryCount++
                                            if (writeRetryCount >= STDERR_WRITE_MAX_RETRIES) {
                                                // 無限ループ防止: 諦める
                                                perror("stderr write: too many retries with no progress")
                                                break
                                            }
                                            usleep(STDERR_WRITE_RETRY_SLEEP_MICROS)
                                        }
                                        else -> {
                                            // それ以外のエラーの場合は、このチャンクの転送を諦める
                                            val errMsg = strerror(errno)?.toKString() ?: "unknown"
                                            perror("stderr write failed: $errMsg (errno=$errno)")
                                            break
                                        }
                                    }
                                }
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
                        usleep(IO_POLLING_SLEEP_MICROS)
                    }
                }
                
                // 子プロセスの終了を待つ
                val statusPtr = alloc<IntVar>()
                var waitResult: pid_t
                var waitRetryCount = 0
                do {
                    waitResult = waitpid(pid, statusPtr.ptr, 0)
                    if (waitResult.toLong() == -1L && errno == EINTR) {
                        waitRetryCount++
                        if (waitRetryCount >= WAITPID_MAX_RETRIES) {
                            throw FluoriteException("waitpid interrupted by signal too many times".toFluoriteString())
                        }
                        usleep(WAITPID_RETRY_SLEEP_MICROS)
                    }
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
                        val signalNumber = WTERMSIG(status)
                        throw FluoriteException("Process terminated by signal $signalNumber".toFluoriteString())
                    }
                    else -> {
                        throw FluoriteException("Process terminated abnormally (status=$status)".toFluoriteString())
                    }
                }
                
                // バイト配列を文字列に変換
                outputBytes.toByteArray().decodeToString()
            } finally {
                // close()が失敗してもtryブロックの例外をマスクしないようにする
                try {
                    close(stdoutPipe[0])
                } catch (_: Throwable) {
                    // close失敗は無視してtryブロックの例外を優先
                }
                try {
                    close(stderrPipe[0])
                } catch (_: Throwable) {
                    // close失敗は無視してtryブロックの例外を優先
                }
            }
        } finally {
            posix_spawn_file_actions_destroy(fileActions.ptr)
        }
    }
}
