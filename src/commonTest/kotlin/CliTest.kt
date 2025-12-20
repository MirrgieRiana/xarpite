import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.ExperimentalCoroutinesApi
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
import mirrg.xarpite.compilers.objects.toFluoriteString
import mirrg.xarpite.operations.FluoriteException
import mirrg.xarpite.mounts.createCommonMounts
import mirrg.xarpite.test.array
import mirrg.xarpite.test.stream
import okio.Path.Companion.toPath
import kotlin.test.Test
import kotlin.test.assertContentEquals
import kotlin.test.assertEquals
import kotlin.test.assertFailsWith

val baseDir = "build/test".toPath()

@OptIn(ExperimentalCoroutinesApi::class, ExperimentalUnsignedTypes::class)
class CliTest {

    @Test
    fun args() = runTest {
        assertEquals("[1]", cliEval("ARGS", "1").array()) // ARGS でコマンドライン引数が得られる
        assertEquals("[]", cliEval("ARGS").array()) // 空の場合
        assertEquals("[1;2;3]", cliEval("ARGS", "1", "2", "3").array()) // 複数の場合
    }

    @Test
    fun read() = runTest {
        if (getFileSystem().isFailure) return@runTest
        val file = baseDir.resolve("read.test_file.tmp.txt")
        getFileSystem().getOrThrow().createDirectory(file.parent!!)
        getFileSystem().getOrThrow().write(file) {
            writeUtf8("123" + "\n")
            writeUtf8("456" + "\n")
        }
        assertEquals("123,456", cliEval("READ(ARGS.0)", file.toString()).stream())
    }

    @Test
    fun files() = runTest {
        if (getFileSystem().isFailure) return@runTest
        val dir = baseDir.resolve("files.test_dir.tmp")
        val fileSystem = getFileSystem().getOrThrow()
        
        // ディレクトリとファイルを準備
        fileSystem.createDirectory(dir)
        fileSystem.write(dir.resolve("zebra.txt")) { writeUtf8("") }
        fileSystem.write(dir.resolve("apple.txt")) { writeUtf8("") }
        fileSystem.createDirectory(dir.resolve("banana"))
        
        // FILES 関数でファイル一覧を取得
        val result = cliEval("FILES(ARGS.0)", dir.toString()).stream()
        
        // アルファベット順にソートされ、ファイル名のみが返される
        assertEquals("apple.txt,banana,zebra.txt", result)
        
        // クリーンアップ
        fileSystem.delete(dir.resolve("zebra.txt"))
        fileSystem.delete(dir.resolve("apple.txt"))
        fileSystem.delete(dir.resolve("banana"))
        fileSystem.delete(dir)
    }

    @Test
    fun useEvaluatesFile() = runTest {
        if (getFileSystem().isFailure) return@runTest
        val fileSystem = getFileSystem().getOrThrow()
        fileSystem.createDirectories(baseDir)
        val dir = baseDir.resolve("use.evaluate.tmp")
        if (fileSystem.metadataOrNull(dir) == null) fileSystem.createDirectory(dir)
        val file = dir.resolve("value.xa1")
        fileSystem.write(file) { writeUtf8("877") }
        assertEquals("877", cliEval("""USE("./$file")""").toFluoriteString().value)
        fileSystem.delete(file)
        fileSystem.delete(dir)
    }

    @Test
    fun useResolvesFromCurrentDirectory() = runTest {
        if (getFileSystem().isFailure) return@runTest
        val fileSystem = getFileSystem().getOrThrow()
        fileSystem.createDirectories(baseDir)
        val dir = baseDir.resolve("use.relative.tmp")
        if (fileSystem.metadataOrNull(dir) == null) fileSystem.createDirectory(dir)
        val banana = dir.resolve("banana.xa1")
        val apple = dir.resolve("apple.xa1")
        fileSystem.write(banana) { writeUtf8("877") }
        fileSystem.write(apple) { writeUtf8("""USE("./banana.xa1")""") }
        assertEquals("877", cliEval("""USE("./build/test/use.relative.tmp/apple.xa1")""").toFluoriteString().value)
        fileSystem.delete(apple)
        fileSystem.delete(banana)
        fileSystem.delete(dir)
    }

    @Test
    fun useCachesByPath() = runTest {
        if (getFileSystem().isFailure) return@runTest
        val fileSystem = getFileSystem().getOrThrow()
        fileSystem.createDirectories(baseDir)
        val file = baseDir.resolve("use.cache.tmp.xa1")
        fileSystem.write(file) {
            writeUtf8(
                """
                {
                  variables: {
                    fruit: "apple"
                  }
                }
                """.trimIndent()
            )
        }
        val result = cliEval(
            """
            a := USE("./$file")
            b := USE("./$file")
            a.variables.fruit = "banana"
            b.variables.fruit
            """.trimIndent()
        ).toFluoriteString().value
        assertEquals("banana", result)
        fileSystem.delete(file)
    }

    @Test
    fun useRequiresRelativePrefix() = runTest {
        if (getFileSystem().isFailure) return@runTest
        val fileSystem = getFileSystem().getOrThrow()
        val file = baseDir.resolve("use.prefix.tmp.xa1")
        fileSystem.write(file) { writeUtf8("1") }
        assertFailsWith<FluoriteException> {
            cliEval("""USE("$file")""")
        }
        fileSystem.delete(file)
    }

    @Test
    fun inb() = runTest {
        // INB はストリームとして存在することを確認
        val inb = cliEval("INB")
        assertEquals(true, inb is FluoriteStream)
    }

}

private suspend fun CoroutineScope.cliEval(src: String, vararg args: String): FluoriteValue {
    val evaluator = Evaluator()
    val defaultBuiltinMounts = listOf(
        createCommonMounts(this) {},
        createCliMounts(args.toList()),
    ).flatten()
    lateinit var mountsFactory: (String) -> List<Map<String, FluoriteValue>>
    mountsFactory = { filePath ->
        defaultBuiltinMounts + createModuleMounts(filePath, mountsFactory)
    }
    evaluator.defineMounts(mountsFactory("./-"))
    return evaluator.get(src)
}

private suspend fun FluoriteValue.collectBlobs(): List<FluoriteBlob> {
    require(this is FluoriteStream) { "INB should return a stream" }
    return flow { this@collectBlobs.flowProvider(this) }.toList().map { value ->
        value as? FluoriteBlob ?: error("Unexpected element: $value")
    }
}
