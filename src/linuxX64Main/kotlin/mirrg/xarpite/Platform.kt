package mirrg.xarpite

import kotlinx.cinterop.ByteVar
import kotlinx.cinterop.CPointer
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
import mirrg.xarpite.compilers.objects.toFluoriteString
import mirrg.xarpite.operations.FluoriteException
import okio.FileSystem
import platform.linux.posix_spawn_file_actions_addclose
import platform.linux.posix_spawn_file_actions_adddup2
import platform.linux.posix_spawn_file_actions_destroy
import platform.linux.posix_spawn_file_actions_init
import platform.linux.posix_spawn_file_actions_t
import platform.linux.posix_spawnp
import platform.posix.EAGAIN
import platform.posix.EINTR
import platform.posix.EWOULDBLOCK
import platform.posix.F_GETFL
import platform.posix.F_SETFL
import platform.posix.O_NONBLOCK
import platform.posix.POLLIN
import platform.posix.SIGKILL
import platform.posix.STDERR_FILENO
import platform.posix.STDOUT_FILENO
import platform.posix.close
import platform.posix.errno
import platform.posix.fcntl
import platform.posix.kill
import platform.posix.perror
import platform.posix.pid_t
import platform.posix.pid_tVar
import platform.posix.pipe
import platform.posix.poll
import platform.posix.pollfd
import platform.posix.read
import platform.posix.strerror
import platform.posix.usleep
import platform.posix.waitpid
import platform.posix.write

actual fun getFileSystem() = Result.success(FileSystem.SYSTEM)
actual fun isWindows(): Boolean = false

// EXEC関数の定数（nativeMainから継承）
private const val EXEC_MAX_BUFFER_SIZE = 4096
private const val WAITPID_MAX_RETRIES = 1000
private const val WAITPID_RETRY_SLEEP_MICROS = 1000u // 1ミリ秒

// POSIXマクロの実装（nativeMainから継承）
// 注: これらのビットマスクはLinux固有の実装です。
private fun WIFEXITED(status: Int): Boolean = ((status and 0x7f) == 0)
private fun WEXITSTATUS(status: Int): Int = ((status and 0xff00) shr 8)
private fun WIFSIGNALED(status: Int): Boolean {
    val termsig = status and 0x7f
    return termsig != 0 && termsig != 0x7f
}

private fun WTERMSIG(status: Int): Int = (status and 0x7f)

// CPointer<ByteVar>からByteArrayを作成するヘルパー関数
@OptIn(ExperimentalForeignApi::class)
private fun CPointer<ByteVar>.copyToByteArray(size: Int): ByteArray {
    val result = ByteArray(size)
    for (i in 0 until size) {
        result[i] = this[i]
    }
    return result
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
actual suspend fun executeProcess(process: String, args: List<String>, env: Map<String, String?>): String = withContext(Dispatchers.IO) {
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

        // posix_spawn_file_actions_tのメモリを適切なアラインメントで確保
        // alloc<>を使用することで、型に応じた適切なサイズとアラインメントでメモリが確保される
        // ByteVar配列でのメモリ確保とキャストは、アラインメント要件を満たさない可能性がある
        val fileActionsPtr = alloc<posix_spawn_file_actions_t>().ptr

        // posix_spawn_file_actionsを初期化
        if (posix_spawn_file_actions_init(fileActionsPtr) != 0) {
            close(stdoutPipe[0])
            close(stdoutPipe[1])
            close(stderrPipe[0])
            close(stderrPipe[1])
            throw FluoriteException("Failed to initialize posix_spawn file actions".toFluoriteString())
        }

        try {
            // 子プロセスでのファイルディスクリプタ操作を設定
            // これらの操作はposix_spawnp()が子プロセスを起動した直後、
            // 指定されたプログラムを実行する前に実行される

            // 子プロセス側で標準出力をパイプの書き込み側にリダイレクト
            if (posix_spawn_file_actions_adddup2(fileActionsPtr, stdoutPipe[1], STDOUT_FILENO) != 0) {
                close(stdoutPipe[0])
                close(stdoutPipe[1])
                close(stderrPipe[0])
                close(stderrPipe[1])
                throw FluoriteException("Failed to add dup2 for stdout".toFluoriteString())
            }

            // 子プロセス側で標準エラー出力をパイプの書き込み側にリダイレクト
            if (posix_spawn_file_actions_adddup2(fileActionsPtr, stderrPipe[1], STDERR_FILENO) != 0) {
                close(stdoutPipe[0])
                close(stdoutPipe[1])
                close(stderrPipe[0])
                close(stderrPipe[1])
                throw FluoriteException("Failed to add dup2 for stderr".toFluoriteString())
            }

            // 子プロセス側で不要になったパイプの読み取り側を閉じる
            // これにより、子プロセスが親プロセスのパイプFDを継承しないようにする
            if (posix_spawn_file_actions_addclose(fileActionsPtr, stdoutPipe[0]) != 0) {
                close(stdoutPipe[0])
                close(stdoutPipe[1])
                close(stderrPipe[0])
                close(stderrPipe[1])
                throw FluoriteException("Failed to add close for stdout read end".toFluoriteString())
            }
            if (posix_spawn_file_actions_addclose(fileActionsPtr, stderrPipe[0]) != 0) {
                close(stdoutPipe[0])
                close(stdoutPipe[1])
                close(stderrPipe[0])
                close(stderrPipe[1])
                throw FluoriteException("Failed to add close for stderr read end".toFluoriteString())
            }

            // 子プロセス側でパイプの書き込み側も閉じる
            // dup2でSTDOUT_FILENO/STDERR_FILENOにコピーした後は元のFDは不要
            if (posix_spawn_file_actions_addclose(fileActionsPtr, stdoutPipe[1]) != 0) {
                close(stdoutPipe[0])
                close(stdoutPipe[1])
                close(stderrPipe[0])
                close(stderrPipe[1])
                throw FluoriteException("Failed to add close for stdout write end".toFluoriteString())
            }
            if (posix_spawn_file_actions_addclose(fileActionsPtr, stderrPipe[1]) != 0) {
                close(stdoutPipe[0])
                close(stdoutPipe[1])
                close(stderrPipe[0])
                close(stderrPipe[1])
                throw FluoriteException("Failed to add close for stderr write end".toFluoriteString())
            }

            // 引数配列を構築
            // cstrオブジェクトをリストに保持してGCから保護する
            val cstrArgs = listOf(process.cstr) + args.map { it.cstr }
            val argv = allocArrayOf(
                *cstrArgs.map { it.ptr }.toTypedArray(),
                null  // 配列の終端をnullでマーク（POSIX要件）
            )

            // 環境変数配列を構築
            val mergedEnv = getEnv().toMutableMap()
            env.forEach { (key, value) ->
                if (value.isNullOrEmpty()) {
                    mergedEnv.remove(key)
                } else {
                    mergedEnv[key] = value
                }
            }
            val envp = allocArrayOf(
                *mergedEnv.map { "${it.key}=${it.value}".cstr.ptr }.toTypedArray(),
                null
            )

            // posix_spawnpでプロセスを起動
            // posix_spawnpはPATH環境変数を検索してプログラムを見つける（execvpと同等）
            // fork()とは異なり、posix_spawnp()はスレッドセーフであるため、
            // マルチスレッド環境でも安全に使用できる
            // pid_tは環境依存の整数型のため、pid_tVarを使用する
            val pidVar = alloc<pid_tVar>()
            val spawnResult = posix_spawnp(pidVar.ptr, process, fileActionsPtr, null, argv, envp)

            // posix_spawnp()のエラーチェック
            // fork()とは異なり、posix_spawnp()はエラーの場合に0以外を返す（errnoではない）
            // glibcでは子側のexec失敗時は親に0を返し、終了コード127になる実装のため、
            // spawnResultからENOENT/EACCESを断定できない
            if (spawnResult != 0) {
                // posix_spawnp()失敗時はパイプをすべてクローズ
                close(stdoutPipe[0])
                close(stdoutPipe[1])
                close(stderrPipe[0])
                close(stderrPipe[1])
                val msg = strerror(spawnResult)?.toKString()
                val errorMessage = "Failed to spawn process: $process (error code: $spawnResult${if (msg.isNullOrBlank()) "" else ", $msg"})"
                throw FluoriteException(errorMessage.toFluoriteString())
            }

            // 親プロセス側でパイプの書き込み側を閉じる
            // これにより、子プロセスが終了したときにEOFを正しく検出できる
            // posix_spawnp()成功後にのみクローズする
            close(stdoutPipe[1])
            close(stderrPipe[1])

            val pid = pidVar.value

            // パイプを非ブロッキングモードに設定してデッドロックを防ぐ
            // 子プロセスが大量のデータを書き込む場合、パイプバッファが満杯になると
            // 子プロセスがブロックし、親プロセスも別のパイプの読み取りでブロックすると
            // デッドロックが発生する可能性がある。非ブロッキングモードにすることで、
            // 両方のパイプ（stdoutとstderr）を並行して読み取ることができる
            try {
                setNonBlocking(stdoutPipe[0], "stdout")
                setNonBlocking(stderrPipe[0], "stderr")
            } catch (e: Throwable) {
                // setNonBlocking()失敗時もパイプをクローズし、子プロセスを適切に待機して
                // ゾンビプロセスを防ぐ
                close(stdoutPipe[0])
                close(stderrPipe[0])
                // 子プロセスを終了させるためにSIGKILLを送信
                kill(pid, SIGKILL)
                // 子プロセスの終了を待機してゾンビプロセスを回避
                val statusPtr = alloc<IntVar>()
                waitpid(pid, statusPtr.ptr, 0)
                throw e
            }

            try {
                // 標準出力を読み取る（ByteArray chunk化で効率化）
                val outputChunks = mutableListOf<ByteArray>()
                val stdoutBuffer = allocArray<ByteVar>(EXEC_MAX_BUFFER_SIZE)

                // 標準エラー出力を読み取る（バッファリングでデッドロック回避）
                val stderrChunks = mutableListOf<ByteArray>()
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
                                // ByteArrayの塊として取り込む（1バイトずつList追加するよりも効率的）
                                outputChunks.add(stdoutBuffer.copyToByteArray(bytesRead.toInt()))
                            }

                            bytesRead == 0L -> stdoutClosed = true  // EOF
                            bytesRead == -1L && errno == EINTR -> {}  // シグナルで中断された場合は再試行
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
                                // stderrはバッファに溜める（デッドロック回避のため即時転送しない）
                                // 親のSTDERR_FILENOがパイプ等にリダイレクトされて読み手が詰まると
                                // write()がブロックし、デッドロックが成立する可能性がある
                                stderrChunks.add(stderrBuffer.copyToByteArray(bytesRead.toInt()))
                            }

                            bytesRead == 0L -> stderrClosed = true  // EOF
                            bytesRead == -1L && errno == EINTR -> {}  // シグナルで中断された場合は再試行
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

                    // 両方のパイプにデータがない場合、poll()で読み取り可能待ち
                    // usleepによるポーリングよりもCPUとレイテンシの両面で有利
                    if (!dataRead && (!stdoutClosed || !stderrClosed)) {
                        memScoped {
                            val fds = allocArray<pollfd>(2)
                            var nfds = 0
                            if (!stdoutClosed) {
                                fds[nfds].fd = stdoutPipe[0]
                                fds[nfds].events = POLLIN.toShort()
                                nfds++
                            }
                            if (!stderrClosed) {
                                fds[nfds].fd = stderrPipe[0]
                                fds[nfds].events = POLLIN.toShort()
                                nfds++
                            }
                            // タイムアウト100msで待機
                            // poll()がエラーを返した場合は適切に処理する
                            while (true) {
                                val pollResult = poll(fds, nfds.toULong(), 100)
                                if (pollResult >= 0) {
                                    break
                                }
                                if (errno == EINTR) {
                                    // シグナル割り込みの場合は再試行
                                    continue
                                }
                                // その他のエラーは例外として扱う
                                val errorMessage = strerror(errno)?.toKString() ?: "Unknown error"
                                throw FluoriteException(
                                    "poll failed while waiting for child process output: $errorMessage (errno=$errno)".toFluoriteString()
                                )
                            }
                        }
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
                        if (exitCode == 127) {
                            // 終了コード127は子プロセスのexec失敗の可能性を示す
                            // （ただし127を正規終了コードとして使うプログラムと区別不能）
                            throw FluoriteException("Process may have failed to execute (exit code 127 - possible exec failure): $process".toFluoriteString())
                        } else if (exitCode != 0) {
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

                // 子プロセスが正常終了した後、バッファリングしたstderrを出力
                // デッドロック回避のため、子プロセス終了後にまとめて出力する
                // chunk単位で出力することでO(n^2)の全量連結とtempBufferコピーを回避
                for (chunk in stderrChunks) {
                    if (chunk.isNotEmpty()) {
                        // 部分書き込みとEINTRを考慮してSTDERR_FILENOに書き込む
                        var totalWritten = 0
                        while (totalWritten < chunk.size) {
                            val written = write(STDERR_FILENO, chunk.refTo(totalWritten), (chunk.size - totalWritten).toULong())
                            when {
                                written > 0 -> totalWritten += written.toInt()
                                written == -1L && errno == EINTR -> continue  // シグナル中断は再試行
                                else -> break  // その他のエラーは諦める（デバッグ情報のため）
                            }
                        }
                    }
                }

                // ByteArrayのchunkを連結して文字列に変換
                // 事前に総サイズを算出して1回だけByteArrayを確保し、copyIntoで詰めることでO(n^2)を回避
                val outputSize = outputChunks.sumOf { it.size }
                val outputBytes = ByteArray(outputSize)
                var outputOffset = 0
                for (chunk in outputChunks) {
                    chunk.copyInto(outputBytes, outputOffset)
                    outputOffset += chunk.size
                }
                outputBytes.decodeToString()
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
            // file actionsをクリーンアップ
            // posix_spawn_file_actions_init()で確保されたリソースを解放
            posix_spawn_file_actions_destroy(fileActionsPtr)
        }
    }
}
