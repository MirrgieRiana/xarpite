import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.flow.flow
import kotlinx.coroutines.flow.toList
import kotlinx.coroutines.test.runTest
import mirrg.xarpite.Evaluator
import mirrg.xarpite.cli.INB_MAX_BUFFER_SIZE
import mirrg.xarpite.cli.createCliMounts
import mirrg.xarpite.cli.createJvmCliMounts
import mirrg.xarpite.cli.createModuleMounts
import mirrg.xarpite.compilers.objects.FluoriteBlob
import mirrg.xarpite.compilers.objects.FluoriteStream
import mirrg.xarpite.compilers.objects.FluoriteValue
import mirrg.xarpite.compilers.objects.toFluoriteString
import mirrg.xarpite.mounts.createCommonMounts
import okio.Path.Companion.toPath
import java.io.ByteArrayInputStream
import kotlin.test.Test
import kotlin.test.assertContentEquals
import kotlin.test.assertEquals

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
    fun execRunsSimpleCommand() = runTest {
        val result = cliEvalJvm("""EXEC("echo", "Hello, World!")""")
        val lines = result.collectStringsJvm()
        assertEquals(1, lines.size)
        assertEquals("Hello, World!", lines[0])
    }

    @Test
    fun execRunsComplexCommand() = runTest {
        val result = cliEvalJvm("""EXEC("bash", "-c", "seq 1 30 | grep 3")""")
        val lines = result.collectStringsJvm()
        assertEquals(4, lines.size)
        assertEquals("3", lines[0])
        assertEquals("13", lines[1])
        assertEquals("23", lines[2])
        assertEquals("30", lines[3])
    }
}

private suspend fun CoroutineScope.cliEvalJvm(src: String, vararg args: String): FluoriteValue {
    val evaluator = Evaluator()
    val defaultBuiltinMounts = listOf(
        createCommonMounts(this) {},
        createCliMounts(args.toList()),
        createJvmCliMounts(),
    ).flatten()
    lateinit var mountsFactory: (String) -> List<Map<String, FluoriteValue>>
    mountsFactory = { location ->
        defaultBuiltinMounts + createModuleMounts(location, mountsFactory)
    }
    evaluator.defineMounts(mountsFactory("./-"))
    return evaluator.get(src)
}

private suspend fun FluoriteValue.collectBlobsJvm(): List<FluoriteBlob> {
    require(this is FluoriteStream) { "INB should return a stream" }
    return flow { this@collectBlobsJvm.flowProvider(this) }.toList().map { value ->
        value as? FluoriteBlob ?: error("Unexpected element: $value")
    }
}

private suspend fun FluoriteValue.collectStringsJvm(): List<String> {
    require(this is FluoriteStream) { "EXEC should return a stream" }
    return flow { this@collectStringsJvm.flowProvider(this) }.toList().map { value ->
        value.toFluoriteString().value
    }
}
