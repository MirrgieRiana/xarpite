import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.ExperimentalCoroutinesApi
import kotlinx.coroutines.test.runTest
import mirrg.xarpite.Evaluator
import mirrg.xarpite.cli.createCliMounts
import mirrg.xarpite.compilers.objects.FluoriteStream
import mirrg.xarpite.compilers.objects.FluoriteValue
import mirrg.xarpite.mounts.createCommonMounts
import mirrg.xarpite.test.array
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
    fun inb() = runTest {
        // INB はストリームとして存在することを確認
        val inb = cliEval("INB")
        assertEquals(true, inb is FluoriteStream)
    }

    @Test
    fun exec() = runTest {
        // EXEC で外部プロセスを実行できる
        // bash を使用することでWindows上のIDEAからでもWSLのbashが起動される
        assertEquals("Hello, World!", cliEval("""EXEC("bash", "-c", "echo 'Hello, World!'")""").stream())
    }

    @Test
    fun execWithEnv() = runTest {
        // EXEC で環境変数を指定できる
        // bash を使用することでWindows上のIDEAからでもWSLのbashが起動される
        val result = cliEval("""EXEC("bash", "-c", %>echo ${'$'}FRUIT<%; env: {FRUIT: "apple"})""").stream()
        assertEquals("apple", result)
    }

    @Test
    fun execWithInput() = runTest {
        // EXEC で標準入力を指定できる
        // bash を使用することでWindows上のIDEAからでもWSLのbashが起動される
        // 4番目の引数として直接ストリームを渡す
        val result = cliEval("""EXEC("bash", "-c", "wc -l"; "line1", "line2", "line3")""").stream().trim()
        assertEquals("3", result)
    }

}

private suspend fun CoroutineScope.cliEval(src: String, vararg args: String): FluoriteValue {
    val evaluator = Evaluator()
    evaluator.defineMounts(createCommonMounts(this) {})
    evaluator.defineMounts(createCliMounts(args.toList()))
    return evaluator.get(src)
}
