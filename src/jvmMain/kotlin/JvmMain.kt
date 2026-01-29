import kotlinx.coroutines.runBlocking
import mirrg.xarpite.IoContext
import mirrg.xarpite.cli.ShowUsage
import mirrg.xarpite.cli.ShowVersion
import mirrg.xarpite.cli.cliEval
import mirrg.xarpite.cli.parseArguments
import mirrg.xarpite.cli.showUsage
import mirrg.xarpite.cli.showVersion
import mirrg.xarpite.compilers.objects.FluoriteValue
import mirrg.xarpite.compilers.objects.toFluoriteString
import java.nio.file.Files
import java.nio.file.Path
import kotlin.io.path.exists

fun main(args: Array<String>) {
    val options = try {
        parseArguments(args.asIterable())
    } catch (_: ShowUsage) {
        showUsage()
        return
    } catch (_: ShowVersion) {
        showVersion()
        return
    }
    runBlocking {
        val ioContext = object : IoContext {
            override fun getPwd(): String {
                // 1. XARPITE_PWD環境変数を最優先で使用（シェルスクリプト経由で設定）
                val xarpitePwd = System.getenv("XARPITE_PWD")
                if (xarpitePwd != null && xarpitePwd.startsWith("/")) {
                    return xarpitePwd
                }
                
                // 2. PWD環境変数を検証してから使用
                val envPwd = System.getenv("PWD")
                if (envPwd != null && envPwd.startsWith("/")) {
                    val envPath = Path.of(envPwd)
                    val currentPath = Path.of("").toAbsolutePath()
                    if (envPath.exists()) {
                        try {
                            if (Files.isSameFile(envPath, currentPath)) {
                                return envPwd
                            }
                        } catch (_: Exception) {
                            // isSameFileが失敗した場合は次へ
                        }
                    }
                }
                
                // 3. プラットフォーム固有の方法で取得（信頼性が高い）
                return Path.of("").toAbsolutePath().normalize().toString()
            }
            override suspend fun out(value: FluoriteValue) = println(value.toFluoriteString(null).value)
            override suspend fun err(value: FluoriteValue) = writeBytesToStderr("${value.toFluoriteString(null).value}\n".encodeToByteArray())
            override suspend fun readLineFromStdin() = mirrg.xarpite.readLineFromStdin()
            override suspend fun readBytesFromStdin() = mirrg.xarpite.readBytesFromStdin()
            override suspend fun writeBytesToStdout(bytes: ByteArray) = mirrg.xarpite.writeBytesToStdout(bytes)
            override suspend fun writeBytesToStderr(bytes: ByteArray) = mirrg.xarpite.writeBytesToStderr(bytes)
            override suspend fun executeProcess(process: String, args: List<String>, env: Map<String, String?>) = mirrg.xarpite.executeProcess(process, args, env)
        }
        cliEval(ioContext, options)
    }
}
