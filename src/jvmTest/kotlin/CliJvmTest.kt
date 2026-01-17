import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.test.runTest
import mirrg.xarpite.UnsupportedIoContext
import mirrg.xarpite.cli.createCliMounts
import mirrg.xarpite.cli.createModuleMounts
import mirrg.xarpite.compilers.objects.FluoriteValue
import mirrg.xarpite.compilers.objects.cache
import mirrg.xarpite.compilers.objects.toFluoriteString
import mirrg.xarpite.mounts.createCommonMounts
import mirrg.xarpite.test.get
import mirrg.xarpite.withEvaluator
import java.io.ByteArrayOutputStream
import java.io.PrintStream
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertTrue

@OptIn(ExperimentalUnsignedTypes::class)
class CliJvmTest {

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
        override suspend fun executeProcess(process: String, args: List<String>) = mirrg.xarpite.executeProcess(process, args)
    }) { context, evaluator ->
        val mounts = context.run { createCommonMounts() + createCliMounts(args.toList()) }
        lateinit var mountsFactory: (String) -> List<Map<String, FluoriteValue>>
        mountsFactory = { location ->
            mounts + context.run { createModuleMounts(location, mountsFactory) }
        }
        evaluator.defineMounts(mountsFactory("./-"))
        evaluator.get(src).cache()
    }
}
