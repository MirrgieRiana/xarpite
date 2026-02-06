import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.test.runTest
import mirrg.xarpite.Mount
import mirrg.xarpite.UnsupportedIoContext
import mirrg.xarpite.cli.createCliMounts
import mirrg.xarpite.cli.createModuleMounts
import mirrg.xarpite.compilers.objects.FluoriteValue
import mirrg.xarpite.compilers.objects.cache
import mirrg.xarpite.compilers.objects.toFluoriteString
import mirrg.xarpite.mounts.createCommonMounts
import mirrg.xarpite.test.get
import mirrg.xarpite.withEvaluator
import okio.Path.Companion.toPath
import java.io.ByteArrayOutputStream
import java.io.PrintStream
import java.nio.file.Path
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertTrue

@OptIn(ExperimentalUnsignedTypes::class)
class CliJvmTest {

    @Test
    fun locationReturnsAbsolutePath() = runTest {
        // LOCATION定数は絶対パスを返すことを確認
        // cliEvalJvmは引数なしで呼ばれるとLOCATIONは"-"（ダミーファイル名）
        val result = cliEvalJvm("LOCATION")
        val location = result.toFluoriteString(null).value
        assertEquals("-", location) // eval モードでは "-"
    }

    @Test
    fun locationWithFilePathReturnsPath() = runTest {
        // ファイルパスを指定してLOCATION定数を取得
        val testPath = Path.of("/test/path/script.xa1").toAbsolutePath().normalize().toString()
        val result = cliEvalJvmWithLocation("LOCATION", testPath)
        val location = result.toFluoriteString(null).value
        assertEquals(testPath, location)
    }

    @Test
    fun execRedirectsStderrToXarpiteStderr() = runTest {
        val originalErr = System.err
        val errorOutput = ByteArrayOutputStream()
        try {
            System.setErr(PrintStream(errorOutput))

            // stderrに出力するコマンドを実行
            val result = cliEvalJvm("""EXEC("bash", "-c", "echo 'Error message' >&2; echo 'Output'")""")
            val output = result.toFluoriteString(null).value

            // 標準出力は正しく取得される
            assertEquals("Output", output)

            // 標準エラー出力がXarpiteのstderrにリダイレクトされている
            val stderrContent = errorOutput.toString()
            assertTrue(stderrContent.contains("Error message"), "stderr should contain 'Error message', but was: $stderrContent")
        } finally {
            System.setErr(originalErr)
        }
    }
}

private suspend fun CoroutineScope.cliEvalJvm(src: String, vararg args: String): FluoriteValue {
    return withEvaluator(object : UnsupportedIoContext() {
        override fun getPlatformPwd(): String = Path.of("").toAbsolutePath().normalize().toString()
        override suspend fun executeProcess(coroutineScope: CoroutineScope, process: String, args: List<String>, env: Map<String, String?>) = 
            mirrg.xarpite.executeProcess(this, coroutineScope, process, args, env)
    }) { context, evaluator ->
        val mounts = context.run { createCommonMounts() + createCliMounts(args.toList()) }
        lateinit var mountsFactory: (String) -> List<Map<String, Mount>>
        mountsFactory = { location ->
            mounts + context.run { createModuleMounts(location, mountsFactory) }
        }
        evaluator.defineMounts(mountsFactory("-"))
        evaluator.get(src).cache()
    }
}

private suspend fun CoroutineScope.cliEvalJvmWithLocation(src: String, scriptPath: String?, vararg args: String): FluoriteValue {
    return withEvaluator(object : UnsupportedIoContext() {
        override fun getPlatformPwd(): String = Path.of("").toAbsolutePath().normalize().toString()
        override suspend fun executeProcess(coroutineScope: CoroutineScope, process: String, args: List<String>, env: Map<String, String?>) = 
            mirrg.xarpite.executeProcess(this, coroutineScope, process, args, env)
    }) { context, evaluator ->
        val mounts = context.run { createCommonMounts() + createCliMounts(args.toList()) }
        lateinit var mountsFactory: (String) -> List<Map<String, Mount>>
        mountsFactory = { location ->
            mounts + context.run { createModuleMounts(location, mountsFactory) }
        }
        val location = scriptPath?.let { Path.of("").toAbsolutePath().normalize().resolve(it).normalize().toString() } ?: "-"
        evaluator.defineMounts(mountsFactory(location))
        evaluator.get(src).cache()
    }
}
