import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.SupervisorJob
import kotlinx.coroutines.cancel
import kotlinx.coroutines.flow.flow
import kotlinx.coroutines.flow.toList
import kotlinx.coroutines.test.runTest
import mirrg.xarpite.Evaluator
import mirrg.xarpite.cli.INB_MAX_BUFFER_SIZE
import mirrg.xarpite.cli.createCliMounts
import mirrg.xarpite.cli.createModuleMounts
import mirrg.xarpite.compilers.objects.FluoriteBlob
import mirrg.xarpite.compilers.objects.FluoriteStream
import mirrg.xarpite.compilers.objects.FluoriteValue
import mirrg.xarpite.compilers.objects.cache
import mirrg.xarpite.compilers.objects.toFluoriteString
import mirrg.xarpite.mounts.createCommonMounts
import java.io.ByteArrayInputStream
import java.io.ByteArrayOutputStream
import java.io.PrintStream
import kotlin.test.Test
import kotlin.test.assertContentEquals
import kotlin.test.assertEquals
import kotlin.test.assertTrue

@OptIn(ExperimentalUnsignedTypes::class)
class CliJvmTest {

    @Test
    fun inbReadsBinaryStream() = runTest {
        val originalIn = System.`in`
        try {
            System.setIn(ByteArrayInputStream(byteArrayOf(97, 98, 99)))
            val blobs = cliEvalJvm("INB").collectBlobsJvm()
            assertEquals(1, blobs.size)
            assertContentEquals(ubyteArrayOf(97u, 98u, 99u), blobs.first().value)
        } finally {
            System.setIn(originalIn)
        }
    }

    @Test
    fun inbSplitsByBufferSize() = runTest {
        val data = ByteArray(INB_MAX_BUFFER_SIZE + 1) { (it % 256).toByte() }
        val originalIn = System.`in`
        try {
            System.setIn(ByteArrayInputStream(data))
            val blobs = cliEvalJvm("INB").collectBlobsJvm()
            assertEquals(2, blobs.size)
            assertEquals(INB_MAX_BUFFER_SIZE, blobs[0].value.size)
            assertEquals(1, blobs[1].value.size)
            assertContentEquals(data.take(INB_MAX_BUFFER_SIZE).map { it.toUByte() }.toUByteArray(), blobs[0].value)
            assertEquals(data.last().toUByte(), blobs[1].value[0])
        } finally {
            System.setIn(originalIn)
        }
    }

    @Test
    fun outbWritesBinaryStream() = runTest {
        val originalOut = System.out
        val output = ByteArrayOutputStream()
        try {
            System.setOut(PrintStream(output))
            cliEvalJvm("OUTB(BLOB.of([65, 66, 67]))")
            assertContentEquals(byteArrayOf(65, 66, 67), output.toByteArray())
        } finally {
            System.setOut(originalOut)
        }
    }

    @Test
    fun outbWritesStreamAggregated() = runTest {
        val originalOut = System.out
        val output = ByteArrayOutputStream()
        try {
            System.setOut(PrintStream(output))
            cliEvalJvm("OUTB(65 .. 67)")
            assertContentEquals(byteArrayOf(65, 66, 67), output.toByteArray())
        } finally {
            System.setOut(originalOut)
        }
    }

    @Test
    fun execRedirectsStderrToXarpiteStderr() = runTest {
        val originalErr = System.err
        val errorOutput = ByteArrayOutputStream()
        try {
            System.setErr(PrintStream(errorOutput))

            // stderrに出力するコマンドを実行
            val result = cliEvalJvm("""EXEC("bash", "-c", "echo 'Error message' >&2; echo 'Output'")""")
            val output = result.toFluoriteString().value

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
    val evaluator = Evaluator()
    val daemonScope = CoroutineScope(coroutineContext + SupervisorJob())
    try {
        val defaultBuiltinMounts = listOf(
            createCommonMounts(this, daemonScope) {},
            createCliMounts(args.toList()) {},
        ).flatten()
        lateinit var mountsFactory: (String) -> List<Map<String, FluoriteValue>>
        mountsFactory = { location ->
            defaultBuiltinMounts + createModuleMounts(location, mountsFactory)
        }
        evaluator.defineMounts(mountsFactory("./-"))
        return evaluator.get(src).cache()
    } finally {
        daemonScope.cancel()
    }
}

private suspend fun FluoriteValue.collectBlobsJvm(): List<FluoriteBlob> {
    require(this is FluoriteStream) { "INB should return a stream" }
    return flow { this@collectBlobsJvm.flowProvider(this) }.toList().map { value ->
        value as? FluoriteBlob ?: error("Unexpected element: $value")
    }
}
