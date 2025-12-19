import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.ExperimentalCoroutinesApi
import kotlinx.coroutines.test.runTest
import mirrg.xarpite.Evaluator
import mirrg.xarpite.cli.createCliMounts
import mirrg.xarpite.compilers.objects.FluoriteStream
import mirrg.xarpite.compilers.objects.FluoriteValue
import mirrg.xarpite.compilers.objects.toFluoriteString
import mirrg.xarpite.mounts.createCommonMounts
import mirrg.xarpite.test.array
import mirrg.xarpite.test.string
import mirrg.xarpite.test.stream
import okio.Path.Companion.toPath
import kotlin.test.Test
import kotlin.test.assertEquals

val baseDir = "build/test".toPath()

@OptIn(ExperimentalCoroutinesApi::class)
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
    fun use_basic() = runTest {
        if (getFileSystem().isFailure) return@runTest
        val fileSystem = getFileSystem().getOrThrow()
        val file = baseDir.resolve("use.basic.tmp.xa")
        if (!fileSystem.exists(file.parent!!)) {
            fileSystem.createDirectory(file.parent!!)
        }
        fileSystem.write(file) {
            writeUtf8("123")
        }
        assertEquals("123", cliEval("USE(ARGS.0)", file.toString()).toFluoriteString().value)
        fileSystem.delete(file)
    }

    @Test
    fun use_cache() = runTest {
        if (getFileSystem().isFailure) return@runTest
        val fileSystem = getFileSystem().getOrThrow()
        val file = baseDir.resolve("use.cache.tmp.xa")
        if (!fileSystem.exists(file.parent!!)) {
            fileSystem.createDirectory(file.parent!!)
        }
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
        assertEquals(
            "[banana;banana]",
            cliEval(
                """
                a := USE(ARGS.0)
                b := USE(ARGS.0)
                a.variables.fruit = "banana"
                [a.variables.fruit; b.variables.fruit]
                """.trimIndent(),
                file.toString(),
            ).array(),
        )
        fileSystem.delete(file)
    }

    @Test
    fun use_resolves_relative_to_module() = runTest {
        if (getFileSystem().isFailure) return@runTest
        val fileSystem = getFileSystem().getOrThrow()
        val rootDir = baseDir.resolve("use.relative.tmp")
        val nestedDir = rootDir.resolve("nested")
        if (!fileSystem.exists(baseDir)) {
            fileSystem.createDirectory(baseDir)
        }
        if (!fileSystem.exists(rootDir)) {
            fileSystem.createDirectory(rootDir)
        }
        if (!fileSystem.exists(nestedDir)) {
            fileSystem.createDirectory(nestedDir)
        }
        val module1 = rootDir.resolve("module1.xa")
        val module2 = nestedDir.resolve("module2.xa")
        fileSystem.write(module1) {
            writeUtf8("""USE("nested/module2.xa")""")
        }
        fileSystem.write(module2) {
            writeUtf8(""""pear"""")
        }
        assertEquals("pear", cliEval("USE(ARGS.0)", module1.toString()).string)
        fileSystem.delete(module1)
        fileSystem.delete(module2)
        fileSystem.delete(nestedDir)
        fileSystem.delete(rootDir)
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
    val out: suspend (FluoriteValue) -> Unit = {}
    evaluator.defineMounts(createCommonMounts(this, out))
    evaluator.defineMounts(createCliMounts(args.toList(), this, out))
    return evaluator.get(src)
}
