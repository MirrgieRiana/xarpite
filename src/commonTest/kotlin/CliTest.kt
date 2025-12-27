import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.ExperimentalCoroutinesApi
import kotlinx.coroutines.SupervisorJob
import kotlinx.coroutines.cancel
import kotlinx.coroutines.flow.flow
import kotlinx.coroutines.flow.toList
import kotlinx.coroutines.test.runTest
import mirrg.xarpite.Evaluator
import mirrg.xarpite.WorkInProgressError
import mirrg.xarpite.cli.ShowUsage
import mirrg.xarpite.cli.createCliMounts
import mirrg.xarpite.cli.createModuleMounts
import mirrg.xarpite.cli.parseArguments
import mirrg.xarpite.compilers.objects.FluoriteBlob
import mirrg.xarpite.compilers.objects.FluoriteStream
import mirrg.xarpite.compilers.objects.FluoriteValue
import mirrg.xarpite.compilers.objects.cache
import mirrg.xarpite.compilers.objects.toFluoriteString
import mirrg.xarpite.mounts.createCommonMounts
import mirrg.xarpite.operations.FluoriteException
import mirrg.xarpite.test.array
import mirrg.xarpite.test.boolean
import mirrg.xarpite.test.stream
import okio.Path.Companion.toPath
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertFailsWith
import kotlin.test.assertTrue

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
    fun useResolvesXa1WhenExtensionOmitted() = runTest {
        if (getFileSystem().isFailure) return@runTest
        val fileSystem = getFileSystem().getOrThrow()
        fileSystem.createDirectories(baseDir)
        val dir = baseDir.resolve("use.extension.tmp")
        fileSystem.createDirectory(dir)
        val module = dir.resolve("banana.xa1")
        fileSystem.write(module) { writeUtf8("877") }
        assertEquals("877", cliEval("""USE("./build/test/use.extension.tmp/banana")""").toFluoriteString().value)
        fileSystem.delete(module)
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
        assertTrue(cliEval("INB ?= STREAM").boolean)
    }

    @Test
    fun fileOption() = runTest {
        if (getFileSystem().isFailure) return@runTest
        val fileSystem = getFileSystem().getOrThrow()
        fileSystem.createDirectories(baseDir)
        val file = baseDir.resolve("fileoption.test_script.tmp.xa1")

        // テスト用のスクリプトファイルを作成
        fileSystem.write(file) {
            writeUtf8("1 + 2")
        }

        // -f オプションでファイルを指定して引数を解析
        val options = parseArguments(listOf("-f", file.toString(), "arg1", "arg2"))

        // ソースコードがファイルから読み込まれている
        assertEquals("1 + 2", options.src)
        // 引数が正しく設定されている
        assertEquals(listOf("arg1", "arg2"), options.arguments)
        // quiet フラグが false である
        assertEquals(false, options.quiet)

        // クリーンアップ
        fileSystem.delete(file)
    }

    @Test
    fun fileOptionWithQuiet() = runTest {
        if (getFileSystem().isFailure) return@runTest
        val fileSystem = getFileSystem().getOrThrow()
        fileSystem.createDirectories(baseDir)
        val file = baseDir.resolve("fileoption_quiet.test_script.tmp.xa1")

        // テスト用のスクリプトファイルを作成
        fileSystem.write(file) {
            writeUtf8("OUT << 'Hello'")
        }

        // -q と -f オプションを組み合わせる
        val options = parseArguments(listOf("-q", "-f", file.toString()))

        // ソースコードがファイルから読み込まれている
        assertEquals("OUT << 'Hello'", options.src)
        // quiet フラグが true である
        assertEquals(true, options.quiet)

        // クリーンアップ
        fileSystem.delete(file)
    }

    @Test
    fun fileOptionWithDoubleDash() = runTest {
        if (getFileSystem().isFailure) return@runTest
        val fileSystem = getFileSystem().getOrThrow()
        fileSystem.createDirectories(baseDir)
        val file = baseDir.resolve("fileoption_doubledash.test_script.tmp.xa1")

        // テスト用のスクリプトファイルを作成
        fileSystem.write(file) {
            writeUtf8("ARGS")
        }

        // -f と -- を組み合わせる
        val options = parseArguments(listOf("-f", file.toString(), "--"))

        // ソースコードがファイルから読み込まれている
        assertEquals("ARGS", options.src)
        // 引数は空
        assertEquals(emptyList(), options.arguments)

        // クリーンアップ
        fileSystem.delete(file)
    }

    @Test
    fun fileOptionWithDoubleDashAndArguments() = runTest {
        if (getFileSystem().isFailure) return@runTest
        val fileSystem = getFileSystem().getOrThrow()
        fileSystem.createDirectories(baseDir)
        val file = baseDir.resolve("fileoption_doubledash_args.test_script.tmp.xa1")

        // テスト用のスクリプトファイルを作成
        fileSystem.write(file) {
            writeUtf8("ARGS")
        }

        // -f と -- と引数を組み合わせる
        val options = parseArguments(listOf("-f", file.toString(), "--", "arg1", "arg2"))

        // ソースコードがファイルから読み込まれている
        assertEquals("ARGS", options.src)
        // -- 後の引数がスクリプトに渡される
        assertEquals(listOf("arg1", "arg2"), options.arguments)

        // クリーンアップ
        fileSystem.delete(file)
    }

    @Test
    fun fileOptionDuplicateThrowsError() = runTest {
        if (getFileSystem().isFailure) return@runTest
        val fileSystem = getFileSystem().getOrThrow()
        fileSystem.createDirectories(baseDir)
        val file1 = baseDir.resolve("fileoption_dup1.test_script.tmp.xa1")
        val file2 = baseDir.resolve("fileoption_dup2.test_script.tmp.xa1")

        // テスト用のスクリプトファイルを作成
        fileSystem.write(file1) { writeUtf8("1") }
        fileSystem.write(file2) { writeUtf8("2") }

        // -f を重複して指定するとエラー
        assertFailsWith<ShowUsage> {
            parseArguments(listOf("-f", file1.toString(), "-f", file2.toString()))
        }

        // クリーンアップ
        fileSystem.delete(file1)
        fileSystem.delete(file2)
    }

    @Test
    fun fileOptionNonExistentFileThrowsError() = runTest {
        if (getFileSystem().isFailure) return@runTest
        val file = baseDir.resolve("nonexistent.xa1")

        // 存在しないファイルを指定するとエラー
        assertFailsWith<Exception> {
            parseArguments(listOf("-f", file.toString()))
        }
    }

    @Test
    fun eOptionEvaluatesCode() = runTest {
        // -e オプションを指定すると、直接コードを評価する
        val options = parseArguments(listOf("-e", "5 + 6", "arg1", "arg2"))

        assertEquals("5 + 6", options.src)
        assertEquals(listOf("arg1", "arg2"), options.arguments)
        assertEquals(false, options.quiet)
    }

    @Test
    fun eOptionAndFileOptionAreMutuallyExclusive() = runTest {
        if (getFileSystem().isFailure) return@runTest
        val fileSystem = getFileSystem().getOrThrow()
        fileSystem.createDirectories(baseDir)
        val file = baseDir.resolve("e_and_f.test_script.tmp.xa1")

        fileSystem.write(file) {
            writeUtf8("1")
        }

        // -e と -f は排他的
        assertFailsWith<ShowUsage> {
            parseArguments(listOf("-e", "1", "-f", file.toString()))
        }

        assertFailsWith<ShowUsage> {
            parseArguments(listOf("-f", file.toString(), "-e", "1"))
        }

        fileSystem.delete(file)
    }

    // Note: XARPITE_SHORT_COMMAND environment variable tests are handled by integration tests
    // because Kotlin multiplatform doesn't provide a standard way to mock environment variables

    @Test
    fun execRunsSimpleCommand() = runTest {
        try {
            val result = cliEval("""EXEC("bash", "-c", "echo hello")""")
            val lines = result.stream()
            assertEquals("hello", lines)
        } catch (e: WorkInProgressError) {
            // 非対応プラットフォームではWorkInProgressErrorがスローされるので無視
        }
    }

    @Test
    fun execRunsComplexCommand() = runTest {
        try {
            val result = cliEval("""EXEC("bash", "-c", "seq 1 30 | grep 3")""")
            val lines = result.stream()
            assertEquals("3,13,23,30", lines)
        } catch (e: WorkInProgressError) {
            // 非対応プラットフォームではWorkInProgressErrorがスローされるので無視
        }
    }

    @Test
    fun execThrowsOnNonZeroExitCode() = runTest {
        try {
            val result = cliEval("""EXEC("bash", "-c", "exit 1") !? "ERROR"""")
            assertEquals("ERROR", result.toFluoriteString().value)
        } catch (e: WorkInProgressError) {
            // 非対応プラットフォームではWorkInProgressErrorがスローされるので無視
        }
    }

}

private suspend fun CoroutineScope.cliEval(src: String, vararg args: String): FluoriteValue {
    val evaluator = Evaluator()
    val daemonScope = CoroutineScope(coroutineContext + SupervisorJob())
    try {
        val defaultBuiltinMounts = listOf(
            createCommonMounts(this, daemonScope) {},
            createCliMounts(args.toList()),
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

private suspend fun FluoriteValue.collectBlobs(): List<FluoriteBlob> {
    require(this is FluoriteStream) { "INB should return a stream" }
    return flow { this@collectBlobs.flowProvider(this) }.toList().map { value ->
        value as? FluoriteBlob ?: error("Unexpected element: $value")
    }
}
