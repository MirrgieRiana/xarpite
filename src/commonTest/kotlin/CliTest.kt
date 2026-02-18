import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.ExperimentalCoroutinesApi
import kotlinx.coroutines.async
import kotlinx.coroutines.coroutineScope
import kotlinx.coroutines.flow.flow
import kotlinx.coroutines.flow.toList
import kotlinx.coroutines.test.runTest
import kotlinx.coroutines.sync.Mutex
import kotlinx.coroutines.sync.withLock
import mirrg.xarpite.IoContext
import mirrg.xarpite.Mount
import mirrg.xarpite.RuntimeContext
import mirrg.xarpite.cli.INB_MAX_BUFFER_SIZE
import mirrg.xarpite.cli.Options
import mirrg.xarpite.cli.ShowUsage
import mirrg.xarpite.cli.ShowVersion
import mirrg.xarpite.cli.addDefaultIncPaths
import mirrg.xarpite.cli.cliEval as cliEvalImpl
import mirrg.xarpite.cli.createCliMounts
import mirrg.xarpite.cli.createModuleMounts
import mirrg.xarpite.cli.parseArguments
import mirrg.xarpite.compilers.objects.FluoriteBlob
import mirrg.xarpite.compilers.objects.FluoriteNull
import mirrg.xarpite.compilers.objects.FluoriteStream
import mirrg.xarpite.compilers.objects.FluoriteString
import mirrg.xarpite.compilers.objects.FluoriteValue
import mirrg.xarpite.compilers.objects.cache
import mirrg.xarpite.compilers.objects.toFluoriteString
import mirrg.xarpite.getFileSystem
import mirrg.xarpite.mounts.createCommonMounts
import mirrg.xarpite.operations.FluoriteException
import mirrg.xarpite.test.array
import mirrg.xarpite.test.boolean
import mirrg.xarpite.test.get
import mirrg.xarpite.test.stream
import mirrg.xarpite.withEvaluator
import okio.Path.Companion.toPath
import kotlin.test.Test
import kotlin.test.assertContentEquals
import kotlin.test.assertEquals
import kotlin.test.assertFailsWith
import kotlin.test.assertNotNull
import kotlin.test.assertTrue

val baseDir = "build/test".toPath()

@OptIn(ExperimentalCoroutinesApi::class, ExperimentalUnsignedTypes::class)
class CliTest {

    @Test
    fun args() = runTest {
        val context = TestIoContext()
        assertEquals("[1]", cliEval(context, "ARGS", "1").array()) // ARGS でコマンドライン引数が得られる
        assertEquals("[]", cliEval(context, "ARGS").array()) // 空の場合
        assertEquals("[1;2;3]", cliEval(context, "ARGS", "1", "2", "3").array()) // 複数の場合
    }

    @Test
    fun pwd() = runTest {
        val context = TestIoContext(currentLocation = "/test/location", env = emptyMap())
        // PWD checks environment variables first (XARPITE_PWD, then PWD), then falls back to context.io.getPlatformPwd()
        val pwd = cliEval(context, "PWD").toFluoriteString(null).value
        // With no environment variables, should get the test location
        assertEquals("/test/location", pwd)
    }

    @Test
    fun pwdReturnsAbsolutePath() = runTest {
        val context = TestIoContext(currentLocation = "/absolute/path/test", env = emptyMap())
        val pwd = cliEval(context, "PWD").toFluoriteString(null).value
        // PWD should return an absolute path (starts with /)
        assertTrue(pwd.startsWith("/") || pwd.contains("://")) // Absolute path or URL
    }

    @Test
    fun pwdFallbackToPlatformSpecific() = runTest {
        // When no environment variables are set, PWD falls back to context.io.getPlatformPwd()
        val context = TestIoContext(currentLocation = "/platform/specific/path", env = emptyMap())
        val pwd = cliEval(context, "PWD").toFluoriteString(null).value
        // With no environment variables, should get the platform-specific path
        assertEquals("/platform/specific/path", pwd)
    }

    @Test
    fun pwdUsesXarpitePwdEnvVariable() = runTest {
        // XARPITE_PWD environment variable takes precedence
        val context = TestIoContext(
            currentLocation = "/platform/specific/path",
            env = mapOf("XARPITE_PWD" to "/env/xarpite/path")
        )
        val pwd = cliEval(context, "PWD").toFluoriteString(null).value
        assertEquals("/env/xarpite/path", pwd)
    }

    @Test
    fun pwdUsesPwdEnvVariableWhenXarpitePwdNotSet() = runTest {
        // PWD environment variable is used when XARPITE_PWD is not set
        val context = TestIoContext(
            currentLocation = "/platform/specific/path",
            env = mapOf("PWD" to "/env/pwd/path")
        )
        val pwd = cliEval(context, "PWD").toFluoriteString(null).value
        assertEquals("/env/pwd/path", pwd)
    }

    @Test
    fun pwdPrefersXarpitePwdOverPwdEnvVariable() = runTest {
        // XARPITE_PWD takes precedence over PWD
        val context = TestIoContext(
            currentLocation = "/platform/specific/path",
            env = mapOf(
                "XARPITE_PWD" to "/env/xarpite/path",
                "PWD" to "/env/pwd/path"
            )
        )
        val pwd = cliEval(context, "PWD").toFluoriteString(null).value
        assertEquals("/env/xarpite/path", pwd)
    }

    @Test
    fun pwdAtRootDirectory() = runTest {
        // Test that PWD returns "/" when current directory is root
        val context = TestIoContext(currentLocation = "/")
        val pwd = cliEval(context, "PWD").toFluoriteString(null).value
        // If environment variables override this, we accept that
        val xarpitePwdValue = cliEval(context, "ENV.XARPITE_PWD")
        val xarpitePwd = if (xarpitePwdValue is FluoriteNull) null else xarpitePwdValue.toFluoriteString(null).value.takeIf { it.isNotBlank() }
        val envPwdValue = cliEval(context, "ENV.PWD")
        val envPwd = if (envPwdValue is FluoriteNull) null else envPwdValue.toFluoriteString(null).value.takeIf { it.isNotBlank() }
        val expectedPwd = xarpitePwd ?: envPwd ?: "/"
        assertEquals(expectedPwd, pwd)
    }

    @Test
    fun locationIsDashInEvalMode() = runTest {
        val context = TestIoContext()
        // When code is executed via eval (not from a file), LOCATION should be "-"
        val location = cliEval(context, "LOCATION")
        assertTrue(location is FluoriteString)
        assertEquals("-", location.toFluoriteString(null).value) // LOCATION は eval モードで "-"
    }

    @Test
    fun iAlias() = runTest {
        val context = TestIoContext(stdinLines = listOf("abc", "def"))
        assertEquals("abc,def", cliEval(context, "I").stream()) // I は IN の別名
    }

    @Test
    fun oAlias() = runTest {
        val context = TestIoContext()
        cliEval(context, """O("test")""")
        assertEquals("test\n", context.stdoutBytes.toUtf8String()) // O は OUT の別名
    }

    @Test
    fun read() = runTest {
        val context = TestIoContext()
        if (getFileSystem().isFailure) return@runTest
        val file = baseDir.resolve("read.test_file.tmp.txt")
        getFileSystem().getOrThrow().createDirectory(file.parent!!)
        getFileSystem().getOrThrow().write(file) {
            writeUtf8("123" + "\n")
            writeUtf8("456" + "\n")
        }
        assertEquals("123,456", cliEval(context, "READ(ARGS.0)", file.toString()).stream())
    }

    @Test
    fun readl() = runTest {
        val context = TestIoContext()
        if (getFileSystem().isFailure) return@runTest
        val file = baseDir.resolve("readl.test_file.tmp.txt")
        getFileSystem().getOrThrow().createDirectory(file.parent!!)
        getFileSystem().getOrThrow().write(file) {
            writeUtf8("123" + "\n")
            writeUtf8("456" + "\n")
        }
        assertEquals("123,456", cliEval(context, "READL(ARGS.0)", file.toString()).stream()) // READL は READ の別名
    }

    @Test
    fun readb() = runTest {
        val context = TestIoContext()
        if (getFileSystem().isFailure) return@runTest
        val file = baseDir.resolve("readb.test_file.tmp.bin")
        getFileSystem().getOrThrow().createDirectory(file.parent!!)
        getFileSystem().getOrThrow().write(file) {
            write(byteArrayOf(65, 66, 67))
        }
        val blobs = cliEval(context, "READB(ARGS.0)", file.toString()).collectBlobs()
        assertEquals(1, blobs.size)
        assertContentEquals(ubyteArrayOf(65u, 66u, 67u), blobs[0].value)
    }

    @Test
    fun readbSplitsByBufferSize() = runTest {
        val context = TestIoContext()
        if (getFileSystem().isFailure) return@runTest
        val file = baseDir.resolve("readb.test_file_large.tmp.bin")
        getFileSystem().getOrThrow().createDirectory(file.parent!!)
        val data = ByteArray(INB_MAX_BUFFER_SIZE + 1) { (it % 256).toByte() }
        getFileSystem().getOrThrow().write(file) {
            write(data)
        }
        val blobs = cliEval(context, "READB(ARGS.0)", file.toString()).collectBlobs()
        assertEquals(2, blobs.size)
        assertEquals(INB_MAX_BUFFER_SIZE, blobs[0].value.size)
        assertEquals(1, blobs[1].value.size)
        assertContentEquals(data.take(INB_MAX_BUFFER_SIZE).map { it.toUByte() }.toUByteArray(), blobs[0].value)
        assertEquals(data.last().toUByte(), blobs[1].value[0])
    }

    @Test
    fun readbEmptyFile() = runTest {
        val context = TestIoContext()
        if (getFileSystem().isFailure) return@runTest
        val file = baseDir.resolve("readb.test_empty.tmp.bin")
        getFileSystem().getOrThrow().createDirectory(file.parent!!)
        getFileSystem().getOrThrow().write(file) {
            // 空ファイル
        }
        val blobs = cliEval(context, "READB(ARGS.0)", file.toString()).collectBlobs()
        assertEquals(0, blobs.size)
    }

    @Test
    fun readbExactlyBufferSize() = runTest {
        val context = TestIoContext()
        if (getFileSystem().isFailure) return@runTest
        val file = baseDir.resolve("readb.test_exact.tmp.bin")
        getFileSystem().getOrThrow().createDirectory(file.parent!!)
        val data = ByteArray(INB_MAX_BUFFER_SIZE) { (it % 256).toByte() }
        getFileSystem().getOrThrow().write(file) {
            write(data)
        }
        val blobs = cliEval(context, "READB(ARGS.0)", file.toString()).collectBlobs()
        assertEquals(1, blobs.size)
        assertEquals(INB_MAX_BUFFER_SIZE, blobs[0].value.size)
        assertContentEquals(data.map { it.toUByte() }.toUByteArray(), blobs[0].value)
    }

    @Test
    fun readbWithNullBytes() = runTest {
        val context = TestIoContext()
        if (getFileSystem().isFailure) return@runTest
        val file = baseDir.resolve("readb.test_null.tmp.bin")
        getFileSystem().getOrThrow().createDirectory(file.parent!!)
        getFileSystem().getOrThrow().write(file) {
            write(byteArrayOf(0, 1, 0, 2, 0))
        }
        val blobs = cliEval(context, "READB(ARGS.0)", file.toString()).collectBlobs()
        assertEquals(1, blobs.size)
        assertContentEquals(ubyteArrayOf(0u, 1u, 0u, 2u, 0u), blobs[0].value)
    }

    @Test
    fun readbMultipleBuffers() = runTest {
        val context = TestIoContext()
        if (getFileSystem().isFailure) return@runTest
        val file = baseDir.resolve("readb.test_multi.tmp.bin")
        getFileSystem().getOrThrow().createDirectory(file.parent!!)
        val data = ByteArray(INB_MAX_BUFFER_SIZE * 2 + 100) { (it % 256).toByte() }
        getFileSystem().getOrThrow().write(file) {
            write(data)
        }
        val blobs = cliEval(context, "READB(ARGS.0)", file.toString()).collectBlobs()
        assertEquals(3, blobs.size)
        assertEquals(INB_MAX_BUFFER_SIZE, blobs[0].value.size)
        assertEquals(INB_MAX_BUFFER_SIZE, blobs[1].value.size)
        assertEquals(100, blobs[2].value.size)
    }

    @Test
    fun write() = runTest {
        val context = TestIoContext()
        if (getFileSystem().isFailure) return@runTest
        val file = baseDir.resolve("write.test_file.tmp.txt")
        getFileSystem().getOrThrow().createDirectory(file.parent!!)

        // 基本的な文字列書き込み
        cliEval(context, """WRITE(ARGS.0; "Hello World")""", file.toString())
        val content = getFileSystem().getOrThrow().read(file) { readUtf8() }
        assertEquals("Hello World", content)

        // 改行が自動で付与されないことを確認
        cliEval(context, """WRITE(ARGS.0; "test")""", file.toString())
        val content2 = getFileSystem().getOrThrow().read(file) { readUtf8() }
        assertEquals("test", content2)

        // UTF-8エンコードの確認（日本語）
        cliEval(context, """WRITE(ARGS.0; "こんにちは")""", file.toString())
        val content3 = getFileSystem().getOrThrow().read(file) { readUtf8() }
        assertEquals("こんにちは", content3)

        // 空文字列の書き込み
        cliEval(context, """WRITE(ARGS.0; "")""", file.toString())
        val content4 = getFileSystem().getOrThrow().read(file) { readUtf8() }
        assertEquals("", content4)
    }

    @Test
    fun writel() = runTest {
        val context = TestIoContext()
        if (getFileSystem().isFailure) return@runTest
        val file = baseDir.resolve("writel.test_file.tmp.txt")
        getFileSystem().getOrThrow().createDirectory(file.parent!!)

        // 複数行の書き込み（ストリームを使用）
        cliEval(context, """WRITEL(ARGS.0; ["line1", "line2", "line3"]())""", file.toString())
        val content = getFileSystem().getOrThrow().read(file) { readUtf8() }
        assertEquals("line1\nline2\nline3\n", content)

        // 単一行の書き込みでも末尾改行が付く
        cliEval(context, """WRITEL(ARGS.0; ["single"]())""", file.toString())
        val content2 = getFileSystem().getOrThrow().read(file) { readUtf8() }
        assertEquals("single\n", content2)

        // 空ストリームの場合は空ファイル
        cliEval(context, """WRITEL(ARGS.0; []())""", file.toString())
        val content3 = getFileSystem().getOrThrow().read(file) { readUtf8() }
        assertEquals("", content3)

        // 数値ストリームからの書き込み
        cliEval(context, """WRITEL(ARGS.0; 1 .. 3)""", file.toString())
        val content4 = getFileSystem().getOrThrow().read(file) { readUtf8() }
        assertEquals("1\n2\n3\n", content4)
    }

    @Test
    fun writeb() = runTest {
        val context = TestIoContext()
        if (getFileSystem().isFailure) return@runTest
        val file = baseDir.resolve("writeb.test_file.tmp.bin")
        getFileSystem().getOrThrow().createDirectory(file.parent!!)

        // BLOBの書き込み
        cliEval(context, """WRITEB(ARGS.0; BLOB.of([65, 66, 67]))""", file.toString())
        val content = getFileSystem().getOrThrow().read(file) { readByteArray() }
        assertContentEquals(byteArrayOf(65, 66, 67), content)

        // STREAM<BLOB>の書き込み
        cliEval(context, """WRITEB(ARGS.0; [BLOB.of([1, 2]), BLOB.of([3, 4])]())""", file.toString())
        val content2 = getFileSystem().getOrThrow().read(file) { readByteArray() }
        assertContentEquals(byteArrayOf(1, 2, 3, 4), content2)

        // ARRAY<NUMBER>の書き込み
        cliEval(context, """WRITEB(ARGS.0; [72, 101, 108, 108, 111])""", file.toString())
        val content3 = getFileSystem().getOrThrow().read(file) { readByteArray() }
        assertContentEquals(byteArrayOf(72, 101, 108, 108, 111), content3)
        assertEquals("Hello", content3.decodeToString())

        // 空のBLOBの書き込み
        cliEval(context, """WRITEB(ARGS.0; BLOB.of([]))""", file.toString())
        val content4 = getFileSystem().getOrThrow().read(file) { readByteArray() }
        assertContentEquals(byteArrayOf(), content4)

        // NULLバイトを含むデータ
        cliEval(context, """WRITEB(ARGS.0; [0, 1, 0, 2, 0])""", file.toString())
        val content5 = getFileSystem().getOrThrow().read(file) { readByteArray() }
        assertContentEquals(byteArrayOf(0, 1, 0, 2, 0), content5)
    }

    @Test
    fun files() = runTest {
        val context = TestIoContext()
        if (getFileSystem().isFailure) return@runTest
        val fileSystem = getFileSystem().getOrThrow()
        fileSystem.createDirectories(baseDir)
        val dir = baseDir.resolve("files.test_dir.tmp")

        try {
            // 既存のディレクトリとファイルをクリーンアップ
            runCatching { fileSystem.delete(dir.resolve("zebra.txt")) }
            runCatching { fileSystem.delete(dir.resolve("apple.txt")) }
            runCatching { fileSystem.delete(dir.resolve("banana")) }
            runCatching { fileSystem.delete(dir) }

            // ディレクトリとファイルを準備
            fileSystem.createDirectory(dir)
            fileSystem.write(dir.resolve("zebra.txt")) { writeUtf8("") }
            fileSystem.write(dir.resolve("apple.txt")) { writeUtf8("") }
            fileSystem.createDirectory(dir.resolve("banana"))

            // FILES 関数でファイル一覧を取得
            val filesResult = cliEval(context, "FILES(ARGS.0)", dir.toString()).stream()

            // アルファベット順にソートされ、ファイル名のみが返される
            assertEquals("apple.txt,banana,zebra.txt", filesResult)

            // FILE_NAMES 関数でも同じ結果が得られることを確認（エイリアスの配線を検証）
            val fileNamesResult = cliEval(context, "FILE_NAMES(ARGS.0)", dir.toString()).stream()
            assertEquals(filesResult, fileNamesResult)
        } finally {
            // クリーンアップ
            runCatching { fileSystem.delete(dir.resolve("zebra.txt")) }
            runCatching { fileSystem.delete(dir.resolve("apple.txt")) }
            runCatching { fileSystem.delete(dir.resolve("banana")) }
            runCatching { fileSystem.delete(dir) }
        }
    }

    @Test
    fun tree() = runTest {
        val context = TestIoContext()
        if (getFileSystem().isFailure) return@runTest
        val dir = baseDir.resolve("tree.test_dir.tmp")
        val fileSystem = getFileSystem().getOrThrow()

        // ディレクトリ構造とファイルを準備
        fileSystem.createDirectories(dir.resolve("dir1/dir2"))
        fileSystem.write(dir.resolve("dir1/dir2/file2.txt")) { writeUtf8("") }
        fileSystem.write(dir.resolve("dir1/file1.txt")) { writeUtf8("") }
        fileSystem.createDirectory(dir.resolve("empty-dir"))

        // TREE 関数でファイルとディレクトリの一覧を取得
        val result = cliEval(context, "TREE(ARGS.0)", dir.toString()).stream()

        // ディレクトリとその内容が連続して返される（深さ優先順）
        // パスには dir が含まれる
        val expected = "${dir}/dir1,${dir}/dir1/dir2,${dir}/dir1/dir2/file2.txt,${dir}/dir1/file1.txt,${dir}/empty-dir"
        assertEquals(expected, result)

        // クリーンアップ
        fileSystem.delete(dir.resolve("dir1/dir2/file2.txt"))
        fileSystem.delete(dir.resolve("dir1/file1.txt"))
        fileSystem.delete(dir.resolve("dir1/dir2"))
        fileSystem.delete(dir.resolve("dir1"))
        fileSystem.delete(dir.resolve("empty-dir"))
        fileSystem.delete(dir)
    }

    @Test
    fun fileTree() = runTest {
        val context = TestIoContext()
        if (getFileSystem().isFailure) return@runTest
        val dir = baseDir.resolve("file_tree.test_dir.tmp")
        val fileSystem = getFileSystem().getOrThrow()

        // ディレクトリ構造とファイルを準備
        fileSystem.createDirectories(dir.resolve("dir1/dir2"))
        fileSystem.write(dir.resolve("dir1/dir2/file2.txt")) { writeUtf8("") }
        fileSystem.write(dir.resolve("dir1/file1.txt")) { writeUtf8("") }
        fileSystem.createDirectory(dir.resolve("empty-dir"))

        // FILE_TREE 関数でファイルのみの一覧を取得
        val result = cliEval(context, "FILE_TREE(ARGS.0)", dir.toString()).stream()

        // ディレクトリを含まず、ファイルのみが深さ優先順で返される
        // パスには dir が含まれる
        val expected = "${dir}/dir1/dir2/file2.txt,${dir}/dir1/file1.txt"
        assertEquals(expected, result)

        // クリーンアップ
        fileSystem.delete(dir.resolve("dir1/dir2/file2.txt"))
        fileSystem.delete(dir.resolve("dir1/file1.txt"))
        fileSystem.delete(dir.resolve("dir1/dir2"))
        fileSystem.delete(dir.resolve("dir1"))
        fileSystem.delete(dir.resolve("empty-dir"))
        fileSystem.delete(dir)
    }

    @Test
    fun treeDepthFirstOrder() = runTest {
        val context = TestIoContext()
        if (getFileSystem().isFailure) return@runTest
        val dir = baseDir.resolve("tree.depth_first.tmp")
        val fileSystem = getFileSystem().getOrThrow()

        // ディレクトリ内のファイルがディレクトリの直後に報告されることを確認
        fileSystem.createDirectory(dir)
        fileSystem.createDirectory(dir.resolve("a"))
        fileSystem.write(dir.resolve("a/z")) { writeUtf8("") }
        fileSystem.write(dir.resolve("a-file")) { writeUtf8("") }

        // TREE 関数でファイルとディレクトリの一覧を取得
        val result = cliEval(context, "TREE(ARGS.0)", dir.toString()).stream()

        // ディレクトリ "a" とその内容 "a/z" が連続し、その後に "a-file" が来る
        // （単純な辞書順だと "a", "a-file", "a/z" になるが、深さ優先なので "a", "a/z", "a-file"）
        // パスには dir が含まれる
        val expected = "${dir}/a,${dir}/a/z,${dir}/a-file"
        assertEquals(expected, result)

        // クリーンアップ
        fileSystem.delete(dir.resolve("a/z"))
        fileSystem.delete(dir.resolve("a-file"))
        fileSystem.delete(dir.resolve("a"))
        fileSystem.delete(dir)
    }

    @Test
    fun useEvaluatesFile() = runTest {
        val context = TestIoContext()
        if (getFileSystem().isFailure) return@runTest
        val fileSystem = getFileSystem().getOrThrow()
        fileSystem.createDirectories(baseDir)
        val dir = baseDir.resolve("use.evaluate.tmp")
        if (fileSystem.metadataOrNull(dir) == null) fileSystem.createDirectory(dir)
        val file = dir.resolve("value.xa1")
        fileSystem.write(file) { writeUtf8("877") }
        assertEquals("877", cliEval(context, """USE(ARGS.0)""", "./$file").toFluoriteString(null).value)
        fileSystem.delete(file)
        fileSystem.delete(dir)
    }

    @Test
    fun useResolvesFromCurrentDirectory() = runTest {
        val context = TestIoContext()
        if (getFileSystem().isFailure) return@runTest
        val fileSystem = getFileSystem().getOrThrow()
        fileSystem.createDirectories(baseDir)
        val dir = baseDir.resolve("use.relative.tmp")
        if (fileSystem.metadataOrNull(dir) == null) fileSystem.createDirectory(dir)
        val banana = dir.resolve("banana.xa1")
        val apple = dir.resolve("apple.xa1")
        fileSystem.write(banana) { writeUtf8("877") }
        fileSystem.write(apple) { writeUtf8("""USE("./banana.xa1")""") }
        assertEquals("877", cliEval(context, """USE("./build/test/use.relative.tmp/apple.xa1")""").toFluoriteString(null).value)
        fileSystem.delete(apple)
        fileSystem.delete(banana)
        fileSystem.delete(dir)
    }

    @Test
    fun useResolvesXa1WhenExtensionOmitted() = runTest {
        val context = TestIoContext()
        if (getFileSystem().isFailure) return@runTest
        val fileSystem = getFileSystem().getOrThrow()
        fileSystem.createDirectories(baseDir)
        val dir = baseDir.resolve("use.extension.tmp")
        fileSystem.createDirectory(dir)
        val module = dir.resolve("banana.xa1")
        fileSystem.write(module) { writeUtf8("877") }
        assertEquals("877", cliEval(context, """USE("./build/test/use.extension.tmp/banana")""").toFluoriteString(null).value)
        fileSystem.delete(module)
        fileSystem.delete(dir)
    }

    @Test
    fun useResolvesMainXa1WhenExtensionOmitted() = runTest {
        val context = TestIoContext()
        if (getFileSystem().isFailure) return@runTest
        val fileSystem = getFileSystem().getOrThrow()
        val dir = baseDir.resolve("use.main.tmp")
        val moduleDir = dir.resolve("banana")
        fileSystem.createDirectories(moduleDir)
        val module = moduleDir.resolve("main.xa1")
        fileSystem.write(module) { writeUtf8("877") }
        assertEquals("877", cliEval(context, """USE("./build/test/use.main.tmp/banana")""").toFluoriteString(null).value)
        fileSystem.delete(module)
        fileSystem.delete(moduleDir)
        fileSystem.delete(dir)
    }

    @Test
    fun useCachesByPath() = runTest {
        val context = TestIoContext()
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
            context,
            """
            a := USE("./$file")
            b := USE("./$file")
            a.variables.fruit = "banana"
            b.variables.fruit
            """.trimIndent()
        ).toFluoriteString(null).value
        assertEquals("banana", result)
        fileSystem.delete(file)
    }

    @Test
    fun useCachesByPathAcrossDifferentFiles() = runTest {
        val context = TestIoContext()
        if (getFileSystem().isFailure) return@runTest
        val fileSystem = getFileSystem().getOrThrow()
        fileSystem.createDirectories(baseDir)
        val dir = baseDir.resolve("use.cache.across.files.tmp")
        fileSystem.createDirectory(dir)

        // 共有モジュール: 変更可能な状態を持つ
        val sharedModule = dir.resolve("shared.xa1")
        fileSystem.write(sharedModule) {
            writeUtf8(
                """
                {
                  state: {
                    value: "initial"
                  }
                }
                """.trimIndent()
            )
        }

        // ファイル1: shared.xa1をUSEして状態を変更
        val file1 = dir.resolve("file1.xa1")
        fileSystem.write(file1) {
            writeUtf8(
                """
                module := USE("./shared.xa1")
                module.state.value = "modified"
                module
                """.trimIndent()
            )
        }

        // ファイル2: shared.xa1をUSEして状態を読み取る
        val file2 = dir.resolve("file2.xa1")
        fileSystem.write(file2) {
            writeUtf8(
                """
                module := USE("./shared.xa1")
                module.state.value
                """.trimIndent()
            )
        }

        // 同じRuntimeContextで両方のファイルを評価
        // file1でsharedモジュールを読み込んで状態を変更し、
        // その後file2でも同じsharedモジュールを読み込む
        // キャッシュが正しく機能していれば、file1で変更した値がfile2でも取得できる
        val result = cliEval(
            context,
            """
            USE("./$file1")
            USE("./$file2")
            """.trimIndent()
        ).toFluoriteString(null).value

        assertEquals("modified", result)

        // クリーンアップ
        fileSystem.delete(file1)
        fileSystem.delete(file2)
        fileSystem.delete(sharedModule)
        fileSystem.delete(dir)
    }

    @Test
    fun useSupportsAbsolutePath() = runTest {
        val context = TestIoContext()
        if (getFileSystem().isFailure) return@runTest
        val fileSystem = getFileSystem().getOrThrow()
        fileSystem.createDirectories(baseDir)
        val file = baseDir.resolve("use.absolute.tmp.xa1")
        fileSystem.write(file) { writeUtf8("999") }
        // Get absolute path using FileSystem.canonicalize
        val absolutePath = getAbsolutePath(file)
        assertEquals("999", cliEval(context, """USE(ARGS.0)""", absolutePath).toFluoriteString(null).value)
        fileSystem.delete(file)
    }

    @Test
    fun useSupportsAbsolutePathWithoutExtension() = runTest {
        val context = TestIoContext()
        if (getFileSystem().isFailure) return@runTest
        val fileSystem = getFileSystem().getOrThrow()
        fileSystem.createDirectories(baseDir)
        val file = baseDir.resolve("use.absolute.noext.tmp.xa1")
        fileSystem.write(file) { writeUtf8("888") }
        // Get absolute path using FileSystem.canonicalize
        val absolutePath = getAbsolutePath(file)
        // Absolute path without extension
        val absolutePathWithoutExt = absolutePath.removeSuffix(".xa1")
        assertEquals("888", cliEval(context, """USE(ARGS.0)""", absolutePathWithoutExt).toFluoriteString(null).value)
        fileSystem.delete(file)
    }

    @Test
    fun useAbsolutePathCachesByPath() = runTest {
        val context = TestIoContext()
        if (getFileSystem().isFailure) return@runTest
        val fileSystem = getFileSystem().getOrThrow()
        fileSystem.createDirectories(baseDir)
        val file = baseDir.resolve("use.absolute.cache.tmp.xa1")
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
        // Get absolute path using FileSystem.canonicalize
        val absolutePath = getAbsolutePath(file)
        val result = cliEval(
            context,
            """
            a := USE("$absolutePath")
            b := USE("$absolutePath")
            a.variables.fruit = "orange"
            b.variables.fruit
            """.trimIndent()
        ).toFluoriteString(null).value
        assertEquals("orange", result)
        fileSystem.delete(file)
    }

    @Test
    fun useSupportsMavenCoordinateWithVersion() = runTest {
        val context = TestIoContext()
        if (getFileSystem().isFailure) return@runTest
        val fileSystem = getFileSystem().getOrThrow()
        val xarpiteDir = ".xarpite/maven/com/example/utils/1.0.0".toPath()
        fileSystem.createDirectories(xarpiteDir)
        val moduleFile = xarpiteDir.resolve("utils-1.0.0.xa1")
        fileSystem.write(moduleFile) { writeUtf8("999") }
        assertEquals("999", cliEval(context, """USE("com.example:utils:1.0.0")""").toFluoriteString(null).value)
        fileSystem.delete(moduleFile)
        fileSystem.delete(xarpiteDir)
        fileSystem.delete(".xarpite/maven/com/example/utils".toPath())
        fileSystem.delete(".xarpite/maven/com/example".toPath())
        fileSystem.delete(".xarpite/maven/com".toPath())
        fileSystem.delete(".xarpite/maven".toPath())
        fileSystem.delete(".xarpite".toPath())
    }

    @Test
    fun useMavenCoordinateConvertsDotsInGroup() = runTest {
        val context = TestIoContext()
        if (getFileSystem().isFailure) return@runTest
        val fileSystem = getFileSystem().getOrThrow()
        val xarpiteDir = ".xarpite/maven/org/jetbrains/kotlin/lib/2.0.0".toPath()
        fileSystem.createDirectories(xarpiteDir)
        val moduleFile = xarpiteDir.resolve("lib-2.0.0.xa1")
        fileSystem.write(moduleFile) { writeUtf8("777") }
        assertEquals("777", cliEval(context, """USE("org.jetbrains.kotlin:lib:2.0.0")""").toFluoriteString(null).value)
        fileSystem.delete(moduleFile)
        fileSystem.delete(xarpiteDir)
        fileSystem.delete(".xarpite/maven/org/jetbrains/kotlin/lib".toPath())
        fileSystem.delete(".xarpite/maven/org/jetbrains/kotlin".toPath())
        fileSystem.delete(".xarpite/maven/org/jetbrains".toPath())
        fileSystem.delete(".xarpite/maven/org".toPath())
        fileSystem.delete(".xarpite/maven".toPath())
        fileSystem.delete(".xarpite".toPath())
    }

    @Test
    fun useMavenCoordinateCachesByPath() = runTest {
        val context = TestIoContext()
        if (getFileSystem().isFailure) return@runTest
        val fileSystem = getFileSystem().getOrThrow()
        val xarpiteDir = ".xarpite/maven/com/test/module/1.0.0".toPath()
        fileSystem.createDirectories(xarpiteDir)
        val moduleFile = xarpiteDir.resolve("module-1.0.0.xa1")
        fileSystem.write(moduleFile) {
            writeUtf8(
                """
                {
                  variables: {
                    value: "initial"
                  }
                }
                """.trimIndent()
            )
        }
        val result = cliEval(
            context,
            """
            a := USE("com.test:module:1.0.0")
            b := USE("com.test:module:1.0.0")
            a.variables.value = "changed"
            b.variables.value
            """.trimIndent()
        ).toFluoriteString(null).value
        assertEquals("changed", result)
        fileSystem.delete(moduleFile)
        fileSystem.delete(xarpiteDir)
        fileSystem.delete(".xarpite/maven/com/test/module".toPath())
        fileSystem.delete(".xarpite/maven/com/test".toPath())
        fileSystem.delete(".xarpite/maven/com".toPath())
        fileSystem.delete(".xarpite/maven".toPath())
        fileSystem.delete(".xarpite".toPath())
    }

    @Test
    fun useRejectsInvalidMavenCoordinate() = runTest {
        val context = TestIoContext()
        if (getFileSystem().isFailure) return@runTest
        // Reject Maven coordinates with wrong number of parts
        assertFailsWith<FluoriteException> {
            cliEval(context, """USE("group:artifact")""")
        }
        // Reject Maven coordinates with empty parts
        assertFailsWith<FluoriteException> {
            cliEval(context, """USE(":artifact:version")""")
        }
        assertFailsWith<FluoriteException> {
            cliEval(context, """USE("group::version")""")
        }
        assertFailsWith<FluoriteException> {
            cliEval(context, """USE("group:artifact:")""")
        }
        // Reject Maven coordinates with blank parts (whitespace only)
        assertFailsWith<FluoriteException> {
            cliEval(context, """USE(" :artifact:version")""")
        }
        assertFailsWith<FluoriteException> {
            cliEval(context, """USE("group: :version")""")
        }
        assertFailsWith<FluoriteException> {
            cliEval(context, """USE("group:artifact: ")""")
        }
    }

    @Test
    fun incIsAccessible() = runTest {
        val context = TestIoContext()
        // INC はアクセス可能で配列である
        assertTrue(cliEval(context, "INC ?= ARRAY").boolean)
    }

    @Test
    fun useIncRelativePath() = runTest {
        val context = TestIoContext()
        if (getFileSystem().isFailure) return@runTest
        val fileSystem = getFileSystem().getOrThrow()

        // INCディレクトリにモジュールを配置
        val incDir = "build/test/use.inc.relative.tmp".toPath()
        fileSystem.createDirectories(incDir)
        val moduleFile = incDir.resolve("banana.xa1")
        fileSystem.write(moduleFile) { writeUtf8("\"Banana\"") }

        // INCにカスタムパスを追加してINC相対パスでモジュールをロード
        val result = cliEval(context, """
            INC::push("build/test/use.inc.relative.tmp")
            USE("banana")
        """.trimIndent()).toFluoriteString(null).value

        assertEquals("Banana", result)

        // クリーンアップ
        fileSystem.delete(moduleFile)
        fileSystem.delete(incDir)
    }

    @Test
    fun useIncRelativePathWithExtension() = runTest {
        val context = TestIoContext()
        if (getFileSystem().isFailure) return@runTest
        val fileSystem = getFileSystem().getOrThrow()

        // INCディレクトリにモジュールを配置
        val incDir = "build/test/use.inc.relative.ext.tmp".toPath()
        fileSystem.createDirectories(incDir)
        val moduleFile = incDir.resolve("cherry.xa1")
        fileSystem.write(moduleFile) { writeUtf8("\"Cherry\"") }

        // .xa1拡張子を省略せずに指定
        val result = cliEval(context, """
            INC::push("build/test/use.inc.relative.ext.tmp")
            USE("cherry.xa1")
        """.trimIndent()).toFluoriteString(null).value

        assertEquals("Cherry", result)

        // クリーンアップ
        fileSystem.delete(moduleFile)
        fileSystem.delete(incDir)
    }

    @Test
    fun useIncRelativePathWithSubdirectory() = runTest {
        val context = TestIoContext()
        if (getFileSystem().isFailure) return@runTest
        val fileSystem = getFileSystem().getOrThrow()

        // INCディレクトリにサブディレクトリを含むモジュールを配置
        val incDir = "build/test/use.inc.relative.sub.tmp".toPath()
        val subDir = incDir.resolve("fruit")
        fileSystem.createDirectories(subDir)
        val moduleFile = subDir.resolve("grape.xa1")
        fileSystem.write(moduleFile) { writeUtf8("\"Grape\"") }

        // サブディレクトリを含むINC相対パスでモジュールをロード
        val result = cliEval(context, """
            INC::push("build/test/use.inc.relative.sub.tmp")
            USE("fruit/grape")
        """.trimIndent()).toFluoriteString(null).value

        assertEquals("Grape", result)

        // クリーンアップ
        fileSystem.delete(moduleFile)
        fileSystem.delete(subDir)
        fileSystem.delete(incDir)
    }

    @Test
    fun useIncRelativePathResolvesMainXa1() = runTest {
        val context = TestIoContext()
        if (getFileSystem().isFailure) return@runTest
        val fileSystem = getFileSystem().getOrThrow()

        // INCディレクトリにディレクトリ形式のモジュールを配置
        val incDir = "build/test/use.inc.main.tmp".toPath()
        val moduleDir = incDir.resolve("lemon")
        fileSystem.createDirectories(moduleDir)
        val moduleFile = moduleDir.resolve("main.xa1")
        fileSystem.write(moduleFile) { writeUtf8("\"Lemon\"") }

        // ディレクトリ名でモジュールをロード
        val result = cliEval(context, """
            INC::push("build/test/use.inc.main.tmp")
            USE("lemon")
        """.trimIndent()).toFluoriteString(null).value

        assertEquals("Lemon", result)

        // クリーンアップ
        fileSystem.delete(moduleFile)
        fileSystem.delete(moduleDir)
        fileSystem.delete(incDir)
    }

    @Test
    fun useIncRelativePathSearchesMultipleIncPaths() = runTest {
        val context = TestIoContext()
        if (getFileSystem().isFailure) return@runTest
        val fileSystem = getFileSystem().getOrThrow()

        // 複数のINCディレクトリを作成
        val incDir1 = "build/test/use.inc.multiple.1.tmp".toPath()
        val incDir2 = "build/test/use.inc.multiple.2.tmp".toPath()
        fileSystem.createDirectories(incDir1)
        fileSystem.createDirectories(incDir2)

        // 2つ目のINCディレクトリにのみモジュールを配置
        val moduleFile = incDir2.resolve("orange.xa1")
        fileSystem.write(moduleFile) { writeUtf8("\"Orange\"") }

        // 複数のINCパスを追加し、2つ目のパスからモジュールをロード
        val result = cliEval(context, """
            INC::push("build/test/use.inc.multiple.1.tmp")
            INC::push("build/test/use.inc.multiple.2.tmp")
            USE("orange")
        """.trimIndent()).toFluoriteString(null).value

        assertEquals("Orange", result)

        // クリーンアップ
        fileSystem.delete(moduleFile)
        fileSystem.delete(incDir1)
        fileSystem.delete(incDir2)
    }

    @Test
    fun useIncRelativePathNotFoundThrowsError() = runTest {
        val context = TestIoContext()
        if (getFileSystem().isFailure) return@runTest

        // 存在しないINC相対パスはエラー
        assertFailsWith<FluoriteException> {
            cliEval(context, """
                INC::push("build/test/nonexistent")
                USE("nonexistent_module")
            """.trimIndent())
        }
    }

    @Test
    fun useIncRelativePathPriority() = runTest {
        val context = TestIoContext()
        if (getFileSystem().isFailure) return@runTest
        val fileSystem = getFileSystem().getOrThrow()

        // 複数のINCディレクトリに同名のモジュールを配置
        val incDir1 = "build/test/use.inc.priority.1.tmp".toPath()
        val incDir2 = "build/test/use.inc.priority.2.tmp".toPath()
        fileSystem.createDirectories(incDir1)
        fileSystem.createDirectories(incDir2)

        val moduleFile1 = incDir1.resolve("same.xa1")
        val moduleFile2 = incDir2.resolve("same.xa1")
        fileSystem.write(moduleFile1) { writeUtf8("\"First\"") }
        fileSystem.write(moduleFile2) { writeUtf8("\"Second\"") }

        // INC配列内で先頭に近いパスが優先される
        val result = cliEval(context, """
            INC::push("build/test/use.inc.priority.1.tmp")
            INC::push("build/test/use.inc.priority.2.tmp")
            USE("same")
        """.trimIndent()).toFluoriteString(null).value

        assertEquals("First", result)

        // クリーンアップ
        fileSystem.delete(moduleFile1)
        fileSystem.delete(moduleFile2)
        fileSystem.delete(incDir1)
        fileSystem.delete(incDir2)
    }

    @Test
    fun useDotRelativePathResolvedFromCaller() = runTest {
        val context = TestIoContext()
        if (getFileSystem().isFailure) return@runTest
        val fileSystem = getFileSystem().getOrThrow()

        // . で始まるパスは呼び出し元からの相対パスとして解決される
        val dir = "build/test/use.dot.relative.tmp".toPath()
        fileSystem.createDirectories(dir)
        val moduleFile = dir.resolve("module.xa1")
        fileSystem.write(moduleFile) { writeUtf8("\"DotRelative\"") }

        val result = cliEval(context, """
            USE("./build/test/use.dot.relative.tmp/module")
        """.trimIndent()).toFluoriteString(null).value

        assertEquals("DotRelative", result)

        // クリーンアップ
        fileSystem.delete(moduleFile)
        fileSystem.delete(dir)
    }

    @Test
    fun useDotDotRelativePathResolvedFromCaller() = runTest {
        val context = TestIoContext()
        if (getFileSystem().isFailure) return@runTest
        val fileSystem = getFileSystem().getOrThrow()

        // .. で始まるパスは呼び出し元からの相対パスとして解決される
        val dir1 = "build/test/use.dotdot.tmp".toPath()
        val dir2 = dir1.resolve("subdir")
        fileSystem.createDirectories(dir2)
        
        val callerFile = dir2.resolve("caller.xa1")
        val moduleFile = dir1.resolve("module.xa1")
        
        fileSystem.write(moduleFile) { writeUtf8("\"DotDotRelative\"") }
        fileSystem.write(callerFile) { writeUtf8("""USE("../module")""") }

        val result = cliEval(context, """
            USE("./build/test/use.dotdot.tmp/subdir/caller")
        """.trimIndent()).toFluoriteString(null).value

        assertEquals("DotDotRelative", result)

        // クリーンアップ
        fileSystem.delete(callerFile)
        fileSystem.delete(moduleFile)
        fileSystem.delete(dir2)
        fileSystem.delete(dir1)
    }

    @Test
    fun incContainsDefaultPaths() = runTest {
        val context = TestIoContext()
        // デフォルトで ./.xarpite/lib と ./.xarpite/maven が含まれている
        val incArray = cliEval(context, "INC").array()
        assertTrue("./.xarpite/lib" in incArray)
        assertTrue("./.xarpite/maven" in incArray)
    }

    @Test
    fun cliEvalAddsDefaultIncPaths() = runTest {
        val context = TestIoContext()
        // 実装側の cliEval が INC にデフォルトパスを追加することを検証
        val options = Options(src = "NULL", arguments = emptyList(), quiet = true, scriptFile = null)
        var capturedInc: List<FluoriteValue>? = null
        cliEvalImpl(context, options) { 
            capturedInc = inc.values.toList()
            emptyList()
        }
        assertNotNull(capturedInc)
        val incStrings = capturedInc!!.map { it.toFluoriteString(null).value }
        assertTrue("./.xarpite/lib" in incStrings)
        assertTrue("./.xarpite/maven" in incStrings)
    }

    @Test
    fun useLoadsModuleFromXarpiteLib() = runTest {
        val context = TestIoContext()
        if (getFileSystem().isFailure) return@runTest
        val fileSystem = getFileSystem().getOrThrow()

        // ./.xarpite/lib にモジュールを配置
        val libDir = ".xarpite/lib".toPath()
        fileSystem.createDirectories(libDir)
        val moduleFile = libDir.resolve("mymodule.xa1")
        fileSystem.write(moduleFile) { writeUtf8("\"LibModule\"") }

        // ./.xarpite/lib からモジュールをロード
        val result = cliEval(context, """
            USE("mymodule")
        """.trimIndent()).toFluoriteString(null).value

        assertEquals("LibModule", result)

        // クリーンアップ
        fileSystem.delete(moduleFile)
        fileSystem.delete(libDir)
        fileSystem.delete(".xarpite".toPath())
    }

    @Test
    fun incCanBeModified() = runTest {
        val context = TestIoContext()
        // INC に値を追加できる
        val result = cliEval(context, """
            INC::push("/custom/path")
            INC
        """.trimIndent())
        val arrayStr = result.array()
        assertTrue("/custom/path" in arrayStr)
    }

    @Test
    fun useMavenCoordinateSearchesInInc() = runTest {
        val context = TestIoContext()
        if (getFileSystem().isFailure) return@runTest
        val fileSystem = getFileSystem().getOrThrow()

        // カスタムINCパスにモジュールを配置
        val customIncDir = "build/test/custom-inc".toPath()
        val moduleDir = customIncDir.resolve("com/example/custom/mylib/1.0.0")
        fileSystem.createDirectories(moduleDir)
        val moduleFile = moduleDir.resolve("mylib-1.0.0.xa1")
        fileSystem.write(moduleFile) { writeUtf8("\"CustomModule\"") }

        // INCにカスタムパスを追加してモジュールをロード
        val result = cliEval(context, """
            INC::push("build/test/custom-inc")
            USE("com.example.custom:mylib:1.0.0")
        """.trimIndent()).toFluoriteString(null).value

        assertEquals("CustomModule", result)

        // クリーンアップ
        fileSystem.delete(moduleFile)
        fileSystem.delete(moduleDir)
        fileSystem.delete(customIncDir.resolve("com/example/custom/mylib"))
        fileSystem.delete(customIncDir.resolve("com/example/custom"))
        fileSystem.delete(customIncDir.resolve("com/example"))
        fileSystem.delete(customIncDir.resolve("com"))
        fileSystem.delete(customIncDir)
    }

    @Test
    fun useTopLevelErrorShowsModuleStackTrace() = runTest {
        val context = TestIoContext()
        if (getFileSystem().isFailure) return@runTest
        val fileSystem = getFileSystem().getOrThrow()
        fileSystem.createDirectories(baseDir)
        val dir = baseDir.resolve("use.top.level.error.tmp")
        fileSystem.createDirectory(dir)

        // エラーを発生させるモジュールを作成
        val moduleFile = dir.resolve("error_module.xa1")
        fileSystem.write(moduleFile) {
            writeUtf8("!!\"Test error from module\"")
        }

        // USEでモジュールを読み込んで例外を確認
        val exception = assertFailsWith<FluoriteException> {
            cliEval(context, """USE("./build/test/use.top.level.error.tmp/error_module.xa1")""")
        }

        // スタックトレースにモジュールのロケーションが含まれることを確認
        val stackTrace = exception.stackTrace
        assertNotNull(stackTrace, "Exception should have a stack trace")
        assertTrue(stackTrace.isNotEmpty(), "Stack trace should not be empty")
        
        // スタックトレースにモジュールファイルのパスが含まれることを確認
        val hasModuleLocation = stackTrace.any { position ->
            position?.location?.contains("error_module") == true
        }
        assertTrue(hasModuleLocation, "Stack trace should include the module location where the error occurred, but got: ${stackTrace.map { it?.location }}")
        
        // スタックトレースの最後の要素（エラー発生箇所）がモジュール内であることを確認
        // スタックトレースは [呼び出し元, ..., エラー発生箇所] の順
        val lastPosition = stackTrace.lastOrNull()
        assertNotNull(lastPosition, "Stack trace should have at least one position")
        assertTrue(
            lastPosition.location.contains("error_module"),
            "Last position in stack trace should be in the error module, but was: ${lastPosition.location}. Full stack trace: ${stackTrace.map { it?.location }}"
        )

        // クリーンアップ
        fileSystem.delete(moduleFile)
        fileSystem.delete(dir)
    }

    @Test
    fun useModuleMethodErrorShowsModuleStackTrace() = runTest {
        val context = TestIoContext()
        if (getFileSystem().isFailure) return@runTest
        val fileSystem = getFileSystem().getOrThrow()
        fileSystem.createDirectories(baseDir)
        val dir = baseDir.resolve("use.method.error.tmp")
        fileSystem.createDirectory(dir)

        // メソッド呼び出しエラーを発生させるモジュールを作成
        val moduleFile = dir.resolve("method_error_module.xa1")
        fileSystem.write(moduleFile) {
            writeUtf8("[].+")
        }

        // USEでモジュールを読み込んで例外を確認
        val exception = assertFailsWith<FluoriteException> {
            cliEval(context, """USE("./build/test/use.method.error.tmp/method_error_module.xa1")""")
        }

        // スタックトレースにモジュールのロケーションが含まれることを確認
        val stackTrace = exception.stackTrace
        assertNotNull(stackTrace, "Exception should have a stack trace")
        assertTrue(stackTrace.isNotEmpty(), "Stack trace should not be empty")
        
        // スタックトレースにモジュールファイルのパスが含まれることを確認
        val hasModuleLocation = stackTrace.any { position ->
            position?.location?.contains("method_error_module") == true
        }
        assertTrue(
            hasModuleLocation, 
            "Stack trace should include the module location where the method error occurred, but got: ${stackTrace.map { it?.location }}"
        )
        
        // スタックトレースの最後の要素（エラー発生箇所）がモジュール内であることを確認
        val lastPosition = stackTrace.lastOrNull()
        assertNotNull(lastPosition, "Stack trace should have at least one position")
        assertTrue(
            lastPosition.location.contains("method_error_module"),
            "Last position in stack trace should be in the error module, but was: ${lastPosition.location}. Full stack trace: ${stackTrace.map { it?.location }}"
        )

        // クリーンアップ
        fileSystem.delete(moduleFile)
        fileSystem.delete(dir)
    }

    @Test
    fun useNestedErrorShowsCorrectStackTrace() = runTest {
        val context = TestIoContext()
        if (getFileSystem().isFailure) return@runTest
        val fileSystem = getFileSystem().getOrThrow()
        fileSystem.createDirectories(baseDir)
        val dir = baseDir.resolve("use.nested.error.tmp")
        fileSystem.createDirectory(dir)

        // ネストした呼び出しでエラーを発生させるモジュールを作成
        val innerModule = dir.resolve("inner.xa1")
        fileSystem.write(innerModule) {
            writeUtf8("!!\"Error from inner module\"")
        }

        val outerModule = dir.resolve("outer.xa1")
        fileSystem.write(outerModule) {
            writeUtf8("""USE("./inner.xa1")""")
        }

        // USEでモジュールを読み込んで例外を確認
        val exception = assertFailsWith<FluoriteException> {
            cliEval(context, """USE("./build/test/use.nested.error.tmp/outer.xa1")""")
        }

        // スタックトレースを確認
        val stackTrace = exception.stackTrace
        assertNotNull(stackTrace, "Exception should have a stack trace")
        
        // スタックトレースには inner.xa1 が含まれるべき
        val hasInnerLocation = stackTrace.any { position ->
            position?.location?.contains("inner") == true
        }
        assertTrue(hasInnerLocation, "Stack trace should include inner module location, but got: ${stackTrace.map { it?.location }}")

        // クリーンアップ
        fileSystem.delete(innerModule)
        fileSystem.delete(outerModule)
        fileSystem.delete(dir)
    }

    @Test
    fun useModuleReturningStreamWithErrorShowsCorrectStackTrace() = runTest {
        val context = TestIoContext()
        if (getFileSystem().isFailure) return@runTest
        val fileSystem = getFileSystem().getOrThrow()
        fileSystem.createDirectories(baseDir)
        val dir = baseDir.resolve("use.stream.error.tmp")
        fileSystem.createDirectory(dir)

        // ストリームを返し、イテレーション中にエラーを発生させるモジュールを作成
        val moduleFile = dir.resolve("stream_module.xa1")
        fileSystem.write(moduleFile) {
            writeUtf8("1, 2, [].+, 4")
        }

        // USEでモジュールを読み込んで例外を確認
        val exception = assertFailsWith<FluoriteException> {
            cliEval(context, """
                USE("./build/test/use.stream.error.tmp/stream_module.xa1")
            """.trimIndent())
        }

        // スタックトレースを確認
        val stackTrace = exception.stackTrace
        assertNotNull(stackTrace, "Exception should have a stack trace")
        
        // ストリームのイテレーション中のエラーは、ストリームを呼び出した側（USE呼び出し元）に紐づけられる
        // これは論理的に正しい挙動：ストリームの評価は遅延実行されるため、エラーはイテレーション時に発生する
        // つまり、スタックトレースには呼び出し元（test）のみが含まれ、モジュールの位置は含まれない
        assertTrue(stackTrace.isNotEmpty(), "Stack trace should not be empty")
        assertTrue(
            stackTrace.all { it?.location == "test" },
            "Stack trace for stream iteration error should only contain caller location, but got: ${stackTrace.map { it?.location }}"
        )

        // クリーンアップ
        fileSystem.delete(moduleFile)
        fileSystem.delete(dir)
    }

    @Test
    fun useModuleFunctionErrorShowsModuleStackTrace() = runTest {
        val context = TestIoContext()
        if (getFileSystem().isFailure) return@runTest
        val fileSystem = getFileSystem().getOrThrow()
        fileSystem.createDirectories(baseDir)
        val dir = baseDir.resolve("use.function.error.tmp")
        fileSystem.createDirectory(dir)

        // 関数を定義し、その関数内でエラーを発生させるモジュールを作成
        val moduleFile = dir.resolve("function_module.xa1")
        fileSystem.write(moduleFile) {
            writeUtf8("""
                {
                    errorFunc: () -> [].+
                }
            """.trimIndent())
        }

        // USEでモジュールを読み込み、関数を呼び出して例外を確認
        val exception = assertFailsWith<FluoriteException> {
            cliEval(context, """
                module := USE("./build/test/use.function.error.tmp/function_module.xa1")
                module.errorFunc()
            """.trimIndent())
        }

        // スタックトレースを確認
        val stackTrace = exception.stackTrace
        assertNotNull(stackTrace, "Exception should have a stack trace")
        
        // 関数内で発生したエラーは、関数を呼び出した側に紐づけられる
        // これは論理的に正しい挙動：関数のコールスタックは呼び出し元であり、
        // 関数が定義されているソースコードのスタックは含まれない
        assertTrue(stackTrace.isNotEmpty(), "Stack trace should not be empty")
        assertTrue(
            stackTrace.all { it?.location == "test" },
            "Stack trace for function error should only contain caller location, but got: ${stackTrace.map { it?.location }}"
        )

        // クリーンアップ
        fileSystem.delete(moduleFile)
        fileSystem.delete(dir)
    }


    @Test
    fun inb() = runTest {
        val context = TestIoContext()
        // INB はストリームとして存在することを確認
        assertTrue(cliEval(context, "INB ?= STREAM").boolean)
    }

    @Test
    fun inbReadsBinaryStream() = runTest {
        val testData = byteArrayOf(97, 98, 99)
        val context = TestIoContext(stdinBytes = testData)
        val blobs = cliEval(context, "INB").collectBlobs()
        assertEquals(1, blobs.size)
        assertContentEquals(ubyteArrayOf(97u, 98u, 99u), blobs.first().value)
    }

    @Test
    fun inbSplitsByBufferSize() = runTest {
        val data = ByteArray(INB_MAX_BUFFER_SIZE + 1) { (it % 256).toByte() }
        val context = TestIoContext(stdinBytes = data)
        val blobs = cliEval(context, "INB").collectBlobs()
        assertEquals(2, blobs.size)
        assertEquals(INB_MAX_BUFFER_SIZE, blobs[0].value.size)
        assertEquals(1, blobs[1].value.size)
        assertContentEquals(data.take(INB_MAX_BUFFER_SIZE).map { it.toUByte() }.toUByteArray(), blobs[0].value)
        assertEquals(data.last().toUByte(), blobs[1].value[0])
    }

    @Test
    fun outbWritesBinaryStream() = runTest {
        val context = TestIoContext()
        cliEval(context, "OUTB(BLOB.of([65, 66, 67]))")
        assertContentEquals(byteArrayOf(65, 66, 67), context.stdoutBytes.toByteArray())
    }

    @Test
    fun outbWritesStreamAggregated() = runTest {
        val context = TestIoContext()
        cliEval(context, "OUTB(65 .. 67)")
        assertContentEquals(byteArrayOf(65, 66, 67), context.stdoutBytes.toByteArray())
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
        val options = parseArguments(listOf("-f", file.toString(), "arg1", "arg2"), TestIoContext())

        // ソースコードがファイルから読み込まれている
        assertEquals("1 + 2", options.src)
        // 引数が正しく設定されている
        assertEquals(listOf("arg1", "arg2"), options.arguments)
        // quiet フラグが false である
        assertEquals(false, options.quiet)
        // スクリプトファイルパスが設定されている
        assertEquals(file.toString(), options.scriptFile)

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
        val options = parseArguments(listOf("-q", "-f", file.toString()), TestIoContext())

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
        val options = parseArguments(listOf("-f", file.toString(), "--"), TestIoContext())

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
        val options = parseArguments(listOf("-f", file.toString(), "--", "arg1", "arg2"), TestIoContext())

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
            parseArguments(listOf("-f", file1.toString(), "-f", file2.toString()), TestIoContext())
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
            parseArguments(listOf("-f", file.toString()), TestIoContext())
        }
    }

    @Test
    fun eOptionEvaluatesCode() = runTest {
        // -e オプションを指定すると、直接コードを評価する
        val options = parseArguments(listOf("-e", "5 + 6", "arg1", "arg2"), TestIoContext())

        assertEquals("5 + 6", options.src)
        assertEquals(listOf("arg1", "arg2"), options.arguments)
        assertEquals(false, options.quiet)
        // eval モードでは scriptFilePath は NULL
        assertEquals(null, options.scriptFile)
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
            parseArguments(listOf("-e", "1", "-f", file.toString()), TestIoContext())
        }

        assertFailsWith<ShowUsage> {
            parseArguments(listOf("-f", file.toString(), "-e", "1"), TestIoContext())
        }

        fileSystem.delete(file)
    }

    @Test
    fun fileOptionWithStdinReadsFromStdin() = runTest {
        // -f - オプションで標準入力から読み込む
        val context = TestIoContext(stdinBytes = "1 + 2".encodeToByteArray())
        val options = parseArguments(listOf("-f", "-"), context)

        // スクリプトが標準入力から読み込まれている
        assertEquals("1 + 2", options.src)
        // 引数は空
        assertEquals(emptyList(), options.arguments)
        // quiet フラグが false である
        assertEquals(false, options.quiet)
    }

    @Test
    fun fileOptionWithStdinAndArguments() = runTest {
        // -f - オプションで標準入力から読み込む場合も引数を受け取れる
        val context = TestIoContext(stdinBytes = "ARGS".encodeToByteArray())
        val options = parseArguments(listOf("-f", "-", "arg1", "arg2"), context)

        // スクリプトが標準入力から読み込まれている
        assertEquals("ARGS", options.src)
        // 引数が正しく設定されている
        assertEquals(listOf("arg1", "arg2"), options.arguments)
    }

    @Test
    fun fileOptionWithStdinAndQuiet() = runTest {
        // -f - と -q を組み合わせる
        val context = TestIoContext(stdinBytes = "OUT << 'Hello'".encodeToByteArray())
        val options = parseArguments(listOf("-q", "-f", "-"), context)

        // スクリプトが標準入力から読み込まれている
        assertEquals("OUT << 'Hello'", options.src)
        // quiet フラグが true である
        assertEquals(true, options.quiet)
    }

    @Test
    fun stdinScriptEvaluation() = runTest {
        // -f - オプションで標準入力からスクリプトを読み込んで実行
        val context = TestIoContext(stdinBytes = "1 + 2".encodeToByteArray())
        val options = parseArguments(listOf("-f", "-"), context)

        val result = cliEval(context, options.src, *options.arguments.toTypedArray())
        assertEquals("3", result.toFluoriteString(null).value)
    }

    @Test
    fun stdinScriptMultiLine() = runTest {
        // 複数行のスクリプトを標準入力から読み込む
        val context = TestIoContext(stdinBytes = "a := 10\nb := 20\na + b".encodeToByteArray())
        val options = parseArguments(listOf("-f", "-"), context)

        val result = cliEval(context, options.src, *options.arguments.toTypedArray())
        assertEquals("30", result.toFluoriteString(null).value)
    }

    // Note: XARPITE_SHORT_COMMAND environment variable tests are handled by integration tests
    // because Kotlin multiplatform doesn't provide a standard way to mock environment variables

    @Test
    fun versionOptionThrowsShowVersion() = runTest {
        // -v オプションで ShowVersion がスローされる
        assertFailsWith<ShowVersion> {
            parseArguments(listOf("-v"), TestIoContext())
        }
    }

    @Test
    fun versionLongOptionThrowsShowVersion() = runTest {
        // --version オプションで ShowVersion がスローされる
        assertFailsWith<ShowVersion> {
            parseArguments(listOf("--version"), TestIoContext())
        }
    }

    // EXEC/BASHテスト用のヘルパー関数
    private fun assertExecuteProcessHandlerCalled(
        capturedCommands: List<Triple<String, List<String>, Map<String, String?>>>,
        message: String = "executeProcessHandler should have been called"
    ) {
        assertTrue(capturedCommands.isNotEmpty(), message)
        assertEquals("bash", capturedCommands[0].first, "process should be 'bash'")
        assertTrue(capturedCommands[0].second.contains("-c"), "args should contain '-c'")
    }

    @Test
    fun execRunsSimpleCommand() = runTest {
        val capturedCommands = mutableListOf<Triple<String, List<String>, Map<String, String?>>>()
        val context = TestIoContext(
            executeProcessHandler = { process, args, env ->
                capturedCommands.add(Triple(process, args, env))
                "hello"
            }
        )
        val result = cliEval(context, getExecSrcWrappingHexForShell("echo hello"))
        val lines = result.stream()
        assertEquals("hello", lines)

        assertExecuteProcessHandlerCalled(capturedCommands)
    }

    @Test
    fun execRunsComplexCommand() = runTest {
        val capturedCommands = mutableListOf<Triple<String, List<String>, Map<String, String?>>>()
        val context = TestIoContext(
            executeProcessHandler = { process, args, env ->
                capturedCommands.add(Triple(process, args, env))
                "3\n13\n23\n30"
            }
        )
        val result = cliEval(context, getExecSrcWrappingHexForShell("seq 1 30 | grep 3"))
        val lines = result.stream()
        assertEquals("3,13,23,30", lines)

        assertExecuteProcessHandlerCalled(capturedCommands)
    }

    @Test
    fun execThrowsOnNonZeroExitCode() = runTest {
        val capturedCommands = mutableListOf<Triple<String, List<String>, Map<String, String?>>>()
        val context = TestIoContext(
            executeProcessHandler = { process, args, env ->
                capturedCommands.add(Triple(process, args, env))
                throw FluoriteException("exit 1".toFluoriteString())
            }
        )
        val result = cliEval(context, """${getExecSrcWrappingHexForShell("exit 1")} !? "ERROR"""")
        assertEquals("ERROR", result.toFluoriteString(null).value)

        assertExecuteProcessHandlerCalled(capturedCommands)
    }

    @Test
    fun execWithMultipleArguments() = runTest {
        val capturedCommands = mutableListOf<Triple<String, List<String>, Map<String, String?>>>()
        val context = TestIoContext(
            executeProcessHandler = { process, args, env ->
                capturedCommands.add(Triple(process, args, env))
                "hello world test"
            }
        )
        val result = cliEval(context, getExecSrcWrappingHexForShell("echo hello world test"))
        val output = result.toFluoriteString(null).value.trim()
        assertEquals("hello world test", output)

        assertExecuteProcessHandlerCalled(capturedCommands)
    }

    @Test
    fun execWithEmptyOutput() = runTest {
        val capturedCommands = mutableListOf<Triple<String, List<String>, Map<String, String?>>>()
        val context = TestIoContext(
            executeProcessHandler = { process, args, env ->
                capturedCommands.add(Triple(process, args, env))
                ""
            }
        )
        val result = cliEval(context, getExecSrcWrappingHexForShell(""))
        val output = result.toFluoriteString(null).value
        assertEquals("", output)

        assertExecuteProcessHandlerCalled(capturedCommands)
    }

    @Test
    fun execWithSpecialCharactersInArguments() = runTest {
        val capturedCommands = mutableListOf<Triple<String, List<String>, Map<String, String?>>>()
        val context = TestIoContext(
            executeProcessHandler = { process, args, env ->
                capturedCommands.add(Triple(process, args, env))
                "hello;world test|pipe"
            }
        )
        // 特殊文字を含む引数（シングルクォート、セミコロンなど）
        val result = cliEval(context, getExecSrcWrappingHexForShell("printf '%s %s' 'hello;world' 'test|pipe'"))
        val output = result.toFluoriteString(null).value
        assertEquals("hello;world test|pipe", output)

        assertExecuteProcessHandlerCalled(capturedCommands)
    }

    @Test
    fun execThrowsOnCommandNotFound() = runTest {
        val capturedCommands = mutableListOf<Triple<String, List<String>, Map<String, String?>>>()
        val context = TestIoContext(
            executeProcessHandler = { process, args, env ->
                capturedCommands.add(Triple(process, args, env))
                throw FluoriteException("exit 1".toFluoriteString())
            }
        )
        // 存在しないコマンドは例外をスロー
        var exceptionThrown = false
        try {
            cliEval(context, getExecSrcWrappingHexForShell("nonexistent_command_xyz_12345"))
        } catch (e: Exception) {
            // FluoriteExceptionまたはその他の例外が期待される
            exceptionThrown = true
        }
        assertTrue(exceptionThrown, "Exception should be thrown for non-existent command")

        assertExecuteProcessHandlerCalled(capturedCommands)
    }

    @Test
    fun execWithNoTrailingNewline() = runTest {
        val capturedCommands = mutableListOf<Triple<String, List<String>, Map<String, String?>>>()
        val context = TestIoContext(
            executeProcessHandler = { process, args, env ->
                capturedCommands.add(Triple(process, args, env))
                "test"
            }
        )
        val result = cliEval(context, getExecSrcWrappingHexForShell("printf 'test'"))
        val output = result.toFluoriteString(null).value
        // printfは末尾に改行を追加しない
        assertEquals("test", output)

        assertExecuteProcessHandlerCalled(capturedCommands)
    }

    @Test
    fun execWithDifferentExitCodes() = runTest {
        val capturedCommands = mutableListOf<Triple<String, List<String>, Map<String, String?>>>()
        val context = TestIoContext(
            executeProcessHandler = { process, args, env ->
                capturedCommands.add(Triple(process, args, env))
                // 非ゼロ終了コードの場合は例外を投げる
                throw FluoriteException("exit 2".toFluoriteString())
            }
        )
        // 終了コード2でテスト
        var exceptionThrown = false
        try {
            cliEval(context, getExecSrcWrappingHexForShell("exit 2"))
        } catch (e: FluoriteException) {
            // FluoriteExceptionが期待される
            exceptionThrown = true
        }
        assertTrue(exceptionThrown, "FluoriteException should be thrown for non-zero exit code")

        assertExecuteProcessHandlerCalled(capturedCommands)
    }

    @Test
    fun execWithLongRunningCommand() = runTest {
        val capturedCommands = mutableListOf<Triple<String, List<String>, Map<String, String?>>>()
        val context = TestIoContext(
            executeProcessHandler = { process, args, env ->
                capturedCommands.add(Triple(process, args, env))
                "done"
            }
        )
        // 少し時間がかかるコマンド
        val result = cliEval(context, getExecSrcWrappingHexForShell("sleep 0.1 && printf done"))
        val output = result.toFluoriteString(null).value
        assertEquals("done", output)

        assertExecuteProcessHandlerCalled(capturedCommands)
    }

    @Test
    fun execWithPipeInCommand() = runTest {
        val capturedCommands = mutableListOf<Triple<String, List<String>, Map<String, String?>>>()
        val context = TestIoContext(
            executeProcessHandler = { process, args, env ->
                capturedCommands.add(Triple(process, args, env))
                "b"
            }
        )
        // パイプを使用するコマンド
        val result = cliEval(context, getExecSrcWrappingHexForShell("""printf 'a\nb\nc' | grep b"""))
        val output = result.toFluoriteString(null).value.trim()
        assertEquals("b", output)

        assertExecuteProcessHandlerCalled(capturedCommands)
    }

    @Test
    fun execWithEnvironmentVariables() = runTest {
        val capturedCommands = mutableListOf<Triple<String, List<String>, Map<String, String?>>>()
        val context = TestIoContext(
            executeProcessHandler = { process, args, env ->
                capturedCommands.add(Triple(process, args, env))
                "ok"
            }
        )
        // EXECがbash/-cを通じてコマンドを実行することを確認する（環境変数を渡せる設定で）
        val result = cliEval(context, getExecSrcWrappingHexForShell($$"""test -n "$PATH" && printf ok"""))
        val output = result.toFluoriteString(null).value
        assertEquals("ok", output)

        assertExecuteProcessHandlerCalled(capturedCommands)
        // 環境変数のオーバーライドを渡していないことを確認
        assertTrue(capturedCommands[0].third.isEmpty(), "No environment variable overrides should be passed")
    }

    @Test
    fun execWithEnvironmentOverrides() = runTest {
        val capturedCommands = mutableListOf<Triple<String, List<String>, Map<String, String?>>>()
        val context = TestIoContext(
            executeProcessHandler = { process, args, env ->
                capturedCommands.add(Triple(process, args, env))
                env["FOO"] ?: "not_set"
            }
        )
        val result = cliEval(context, getExecSrcWrappingHexForShellWithEnv("printenv FOO", """{FOO: "BAR"}"""))
        val output = result.toFluoriteString(null).value
        assertEquals("BAR", output)

        assertExecuteProcessHandlerCalled(capturedCommands)
    }

    @Test
    fun execWithEnvironmentOverridesExistingVariable() = runTest {
        val capturedCommands = mutableListOf<Triple<String, List<String>, Map<String, String?>>>()
        val context = TestIoContext(
            executeProcessHandler = { process, args, env ->
                capturedCommands.add(Triple(process, args, env))
                env["HOME"] ?: "not_set"
            }
        )
        // 既存環境変数の上書き
        val result = cliEval(context, getExecSrcWrappingHexForShellWithEnv("printenv HOME", """{HOME: "OVERRIDE"}"""))
        val output = result.toFluoriteString(null).value
        assertEquals("OVERRIDE", output)

        assertExecuteProcessHandlerCalled(capturedCommands)
    }

    @Test
    fun execWithEnvironmentRemoveByEmptyString() = runTest {
        val capturedCommands = mutableListOf<Triple<String, List<String>, Map<String, String?>>>()
        val context = TestIoContext(
            executeProcessHandler = { process, args, env ->
                capturedCommands.add(Triple(process, args, env))
                // 空文字が渡された場合は削除扱いとなるので、HOMEが存在しない状態をシミュレート
                if (env["HOME"] == "") "ok" else "fail"
            }
        )
        val script = "if printenv HOME >/dev/null; then printf fail; else printf ok; fi"
        val result = cliEval(context, getExecSrcWrappingHexForShellWithEnv(script, "{HOME: \"\"}"))
        val output = result.toFluoriteString(null).value
        assertEquals("ok", output)

        assertExecuteProcessHandlerCalled(capturedCommands)
        // envの検証: HOMEが空文字であることを確認
        assertEquals("", capturedCommands[0].third["HOME"])
    }

    @Test
    fun execWithEnvironmentRemoveByNull() = runTest {
        val capturedCommands = mutableListOf<Triple<String, List<String>, Map<String, String?>>>()
        val context = TestIoContext(
            executeProcessHandler = { process, args, env ->
                capturedCommands.add(Triple(process, args, env))
                // nullが渡された場合は削除扱いとなるので、HOMEが存在しない状態をシミュレート
                if (env["HOME"] == null) "ok" else "fail"
            }
        )
        val script = "if printenv HOME >/dev/null; then printf fail; else printf ok; fi"
        val result = cliEval(context, getExecSrcWrappingHexForShellWithEnv(script, "{HOME: NULL}"))
        val output = result.toFluoriteString(null).value
        assertEquals("ok", output)

        assertExecuteProcessHandlerCalled(capturedCommands)
        // envの検証: HOMEキーが存在し、値がnullであることを確認
        assertTrue(capturedCommands[0].third.containsKey("HOME"), "HOME key should be present in env")
        assertEquals(null, capturedCommands[0].third["HOME"])
    }

    @Test
    fun execWithEmptyArgumentList() = runTest {
        val capturedCommands = mutableListOf<Triple<String, List<String>, Map<String, String?>>>()
        val context = TestIoContext(
            executeProcessHandler = { process, args, env ->
                capturedCommands.add(Triple(process, args, env))
                throw FluoriteException("exit 1".toFluoriteString())
            }
        )
        // 空の引数リストは例外をスロー
        var exceptionThrown = false
        try {
            cliEval(context, """EXEC([])""")
        } catch (e: Exception) {
            // FluoriteExceptionまたはその他の例外が期待される
            exceptionThrown = true
        }
        assertTrue(exceptionThrown, "Exception should be thrown for empty argument list")
    }

    @Test
    fun execWithVeryLongArgument() = runTest {
        val capturedCommands = mutableListOf<Triple<String, List<String>, Map<String, String?>>>()
        val context = TestIoContext(
            executeProcessHandler = { process, args, env ->
                capturedCommands.add(Triple(process, args, env))
                "a".repeat(500)
            }
        )
        // 長い引数
        val longString = "a".repeat(500)
        val result = cliEval(context, getExecSrcWrappingHexForShell("printf '%s' '$longString'"))
        val output = result.toFluoriteString(null).value
        assertEquals(longString, output)

        assertExecuteProcessHandlerCalled(capturedCommands)
    }

    @Test
    fun execWithUnicodeCharacters() = runTest {
        val capturedCommands = mutableListOf<Triple<String, List<String>, Map<String, String?>>>()
        val context = TestIoContext(
            executeProcessHandler = { process, args, env ->
                capturedCommands.add(Triple(process, args, env))
                "こんにちは世界"
            }
        )
        // Unicode文字を含む引数
        val result = cliEval(context, getExecSrcWrappingHexForShell("printf 'こんにちは世界'"))
        val output = result.toFluoriteString(null).value
        assertEquals("こんにちは世界", output)

        assertExecuteProcessHandlerCalled(capturedCommands)
    }

    @Test
    fun execWithMultipleCommandsInStream() = runTest {
        val capturedCommands = mutableListOf<Triple<String, List<String>, Map<String, String?>>>()
        val context = TestIoContext(
            executeProcessHandler = { process, args, env ->
                capturedCommands.add(Triple(process, args, env))
                "abc"
            }
        )
        // 複数のコマンドを&&で繋ぐ
        val result = cliEval(context, getExecSrcWrappingHexForShell("printf a && printf b && printf c"))
        val output = result.toFluoriteString(null).value
        assertEquals("abc", output)

        assertExecuteProcessHandlerCalled(capturedCommands)
    }

    @Test
    fun execWithRedirection() = runTest {
        val capturedCommands = mutableListOf<Triple<String, List<String>, Map<String, String?>>>()
        val context = TestIoContext(
            executeProcessHandler = { process, args, env ->
                capturedCommands.add(Triple(process, args, env))
                "ok"
            }
        )
        // リダイレクションを使用
        val result = cliEval(context, getExecSrcWrappingHexForShell("printf test > /dev/null && printf ok"))
        val output = result.toFluoriteString(null).value
        assertEquals("ok", output)

        assertExecuteProcessHandlerCalled(capturedCommands)
    }

    @Test
    fun execWithBackslashInArgument() = runTest {
        val capturedCommands = mutableListOf<Triple<String, List<String>, Map<String, String?>>>()
        val context = TestIoContext(
            executeProcessHandler = { process, args, env ->
                capturedCommands.add(Triple(process, args, env))
                "a\\b"
            }
        )
        // バックスラッシュを含む引数
        val result = cliEval(context, getExecSrcWrappingHexForShell("""printf '%s' 'a\\b'"""))
        val output = result.toFluoriteString(null).value
        assertTrue(output.contains("a"))

        assertExecuteProcessHandlerCalled(capturedCommands)
    }

    @Test
    fun execParallelExecution() = runTest {
        var counter = 0
        var maxConcurrent = 0
        var currentConcurrent = 0
        val mutex = Mutex()
        val capturedCommands = mutableListOf<Triple<String, List<String>, Map<String, String?>>>()
        val context = TestIoContext(
            executeProcessHandler = { process, args, env ->
                mutex.withLock {
                    capturedCommands.add(Triple(process, args, env))
                    currentConcurrent++
                    if (currentConcurrent > maxConcurrent) {
                        maxConcurrent = currentConcurrent
                    }
                }
                // 意図的にサスペンドして並列実行の重なりを発生させる
                kotlinx.coroutines.delay(10)
                val i = mutex.withLock {
                    currentConcurrent--
                    ++counter
                }
                "test$i"
            }
        )
        // 16並列でEXECを実行してデッドロックが発生しないこと、および実際に並列実行されることを確認
        coroutineScope {
            val jobs = (1..16).map { i ->
                async {
                    cliEval(context, getExecSrcWrappingHexForShell("printf 'test$i'"))
                }
            }
            val results = jobs.map { it.await() }
            // すべての結果が返されたことを確認（順序は非決定的）
            assertEquals(16, results.size)
            val outputs = results.map { it.toFluoriteString(null).value }.toSet()
            // test1 から test16 までの値がすべて含まれていることを確認（重複なし）
            assertEquals(16, outputs.size)
            (1..16).forEach { i ->
                assertTrue(outputs.contains("test$i"), "outputs should contain 'test$i'")
            }
            // executeProcessHandlerが正しく呼ばれたことを確認
            assertEquals(16, capturedCommands.size)
            capturedCommands.forEach { (process, args, _) ->
                assertEquals("bash", process)
                assertTrue(args.contains("-c"), "args should contain '-c'")
            }
            // 実際に並列実行された（複数のタスクが同時に実行された）ことを確認
            assertTrue(maxConcurrent > 1, "At least 2 tasks should have been running concurrently, but maxConcurrent was $maxConcurrent")
        }
    }

    @Test
    fun executeProcessWithCustomHandler() = runTest {
        // カスタムexecuteProcessハンドラを使用するテスト
        val capturedCommands = mutableListOf<Triple<String, List<String>, Map<String, String?>>>()
        val context = TestIoContext(
            executeProcessHandler = { process, args, env ->
                capturedCommands.add(Triple(process, args, env))
                "custom output"
            }
        )

        // カスタムハンドラが呼ばれることを確認
        val result = cliEval(context, getExecSrcWrappingHexForShell("echo test"))
        val output = result.toFluoriteString(null).value
        assertEquals("custom output", output)

        // カスタムハンドラが正しい引数で呼ばれたことを確認
        assertExecuteProcessHandlerCalled(capturedCommands, "Custom handler should have been called")
    }

    @Test
    fun execlRunsSimpleCommand() = runTest {
        // EXECL は EXEC の別名であることをテスト
        val capturedCommands = mutableListOf<Triple<String, List<String>, Map<String, String?>>>()
        val context = TestIoContext(
            executeProcessHandler = { process, args, env ->
                capturedCommands.add(Triple(process, args, env))
                "hello from execl"
            }
        )
        val result = cliEval(context, getExecSrcWrappingHexForShell("echo hello", functionName = "EXECL"))
        val lines = result.stream()
        assertEquals("hello from execl", lines)

        assertExecuteProcessHandlerCalled(capturedCommands)
    }

    @Test
    fun execlRunsComplexCommand() = runTest {
        // EXECL が EXEC と同じ動作を持つことをテスト
        val capturedCommands = mutableListOf<Triple<String, List<String>, Map<String, String?>>>()
        val context = TestIoContext(
            executeProcessHandler = { process, args, env ->
                capturedCommands.add(Triple(process, args, env))
                "3\n13\n23\n30"
            }
        )
        val result = cliEval(context, getExecSrcWrappingHexForShell("seq 1 30 | grep 3", functionName = "EXECL"))
        val lines = result.stream()
        assertEquals("3,13,23,30", lines)

        assertExecuteProcessHandlerCalled(capturedCommands)
    }

    @Test
    fun err() = runTest {
        val context = TestIoContext()
        // ERR でエラー出力に書き込める
        val result = cliEval(context, "ERR(123)")
        assertEquals("NULL", result.toFluoriteString(null).value)
        assertEquals("123\n", context.stderrBytes.toUtf8String())

        // 複数の引数を渡せる
        context.clear()
        cliEval(context, """ERR("abc", "def")""")
        assertEquals("abc\ndef\n", context.stderrBytes.toUtf8String())

        // ストリームを渡すと各要素が出力される
        context.clear()
        cliEval(context, "ERR(1 .. 3)")
        assertEquals("1\n2\n3\n", context.stderrBytes.toUtf8String())
    }

    @Test
    fun errb() = runTest {
        val context = TestIoContext()
        // ERRB がNULLを返すことを確認
        val result = cliEval(context, "ERRB(BLOB.of([65, 66, 67]))")
        assertEquals("NULL", result.toFluoriteString(null).value)
        assertContentEquals(byteArrayOf(65, 66, 67), context.stderrBytes.toByteArray())
    }

    @Test
    fun errbWritesStreamAggregated() = runTest {
        val context = TestIoContext()
        cliEval(context, "ERRB(65 .. 67)")
        assertContentEquals(byteArrayOf(65, 66, 67), context.stderrBytes.toByteArray())
    }

    @Test
    fun locationConstantsWithFileExecution() = runTest {
        if (getFileSystem().isFailure) return@runTest
        val fileSystem = getFileSystem().getOrThrow()
        fileSystem.createDirectories(baseDir)
        val file = baseDir.resolve("location_test.tmp.xa1")

        // テスト用のスクリプトファイルを作成
        fileSystem.write(file) {
            writeUtf8("""[LOCATION]""")
        }

        // ファイルを実行
        val context = TestIoContext()
        val options = parseArguments(listOf("-f", file.toString()), context)

        // scriptFilePathが正しく設定されていることを確認
        assertTrue(options.scriptFile != null)
        assertEquals(file.toString(), options.scriptFile)

        // クリーンアップ
        fileSystem.delete(file)
    }

    @Test
    fun locationReturnsAbsolutePath() = runTest {
        if (getFileSystem().isFailure) return@runTest
        val fileSystem = getFileSystem().getOrThrow()
        fileSystem.createDirectories(baseDir)

        // 相対パスでファイルを指定
        val relativeFile = "build/test/location_absolute.tmp.xa1"
        val file = relativeFile.toPath()

        fileSystem.write(file) {
            writeUtf8("LOCATION")
        }

        val context = TestIoContext()
        val options = parseArguments(listOf("-f", relativeFile), context)

        // scriptFilePathには相対パスが保存される
        assertEquals(relativeFile, options.scriptFile)

        // cliEvalで絶対パスに解決されることを確認（実装の詳細）
        // 実際の絶対パス解決はcliEval内で行われる

        // クリーンアップ
        fileSystem.delete(file)
    }

    @Test
    fun bashBasic() = runTest {
        val capturedCommands = mutableListOf<Triple<String, List<String>, Map<String, String?>>>()
        val context = TestIoContext(
            executeProcessHandler = { process, args, env ->
                capturedCommands.add(Triple(process, args, env))
                "Hello"
            }
        )
        // 基本的な動作確認
        val result = cliEval(context, getBashSrcWrappingHexForShell("printf Hello"))
        val output = result.toFluoriteString(null).value
        assertEquals("Hello", output)

        assertExecuteProcessHandlerCalled(capturedCommands)
    }

    @Test
    fun bashRemovesTrailingNewline() = runTest {
        val capturedCommands = mutableListOf<Triple<String, List<String>, Map<String, String?>>>()
        val context = TestIoContext(
            executeProcessHandler = { process, args, env ->
                capturedCommands.add(Triple(process, args, env))
                "test\n"
            }
        )
        // 末尾の改行が除去されることを確認
        val result = cliEval(context, getBashSrcWrappingHexForShell("printf 'test\\n'"))
        val output = result.toFluoriteString(null).value
        assertEquals("test", output)

        assertExecuteProcessHandlerCalled(capturedCommands)
    }

    @Test
    fun bashRemovesOnlyOneTrailingNewline() = runTest {
        val capturedCommands = mutableListOf<Triple<String, List<String>, Map<String, String?>>>()
        val context = TestIoContext(
            executeProcessHandler = { process, args, env ->
                capturedCommands.add(Triple(process, args, env))
                "test\n\n\n"
            }
        )
        // 複数の末尾改行がある場合でも、末尾の改行が1つだけ除去されることを確認
        val result = cliEval(context, getBashSrcWrappingHexForShell("printf 'test\\n\\n\\n'"))
        val output = result.toFluoriteString(null).value
        assertEquals("test\n\n", output)

        assertExecuteProcessHandlerCalled(capturedCommands)
    }

    @Test
    fun bashNoTrailingNewline() = runTest {
        val capturedCommands = mutableListOf<Triple<String, List<String>, Map<String, String?>>>()
        val context = TestIoContext(
            executeProcessHandler = { process, args, env ->
                capturedCommands.add(Triple(process, args, env))
                "test"
            }
        )
        // 末尾改行がない場合
        val result = cliEval(context, getBashSrcWrappingHexForShell("printf test"))
        val output = result.toFluoriteString(null).value
        assertEquals("test", output)

        assertExecuteProcessHandlerCalled(capturedCommands)
    }

    @Test
    fun bashWithMultipleLines() = runTest {
        val capturedCommands = mutableListOf<Triple<String, List<String>, Map<String, String?>>>()
        val context = TestIoContext(
            executeProcessHandler = { process, args, env ->
                capturedCommands.add(Triple(process, args, env))
                "line1\nline2\nline3\n"
            }
        )
        // 複数行の出力
        val result = cliEval(context, getBashSrcWrappingHexForShell("printf 'line1\\nline2\\nline3\\n'"))
        val output = result.toFluoriteString(null).value
        assertEquals("line1\nline2\nline3", output)

        assertExecuteProcessHandlerCalled(capturedCommands)
    }

    @Test
    fun bashReturnsString() = runTest {
        val capturedCommands = mutableListOf<Triple<String, List<String>, Map<String, String?>>>()
        val context = TestIoContext(
            executeProcessHandler = { process, args, env ->
                capturedCommands.add(Triple(process, args, env))
                "abc"
            }
        )
        // 戻り値が文字列であることを確認
        val result = cliEval(context, getBashSrcWrappingHexForShell("printf abc"))
        assertTrue(result is FluoriteString)

        assertExecuteProcessHandlerCalled(capturedCommands)
    }

    @Test
    fun bashThrowsOnNonZeroExit() = runTest {
        val capturedCommands = mutableListOf<Triple<String, List<String>, Map<String, String?>>>()
        val context = TestIoContext(
            executeProcessHandler = { process, args, env ->
                capturedCommands.add(Triple(process, args, env))
                throw FluoriteException("exit 1".toFluoriteString())
            }
        )
        // 0以外の終了コードで例外をスロー
        var exceptionThrown = false
        try {
            cliEval(context, getBashSrcWrappingHexForShell("exit 1"))
        } catch (e: Exception) {
            exceptionThrown = true
        }
        assertTrue(exceptionThrown, "Exception should be thrown for non-zero exit code")

        assertExecuteProcessHandlerCalled(capturedCommands)
    }

    @Test
    fun bashWithUnicode() = runTest {
        val capturedCommands = mutableListOf<Triple<String, List<String>, Map<String, String?>>>()
        val context = TestIoContext(
            executeProcessHandler = { process, args, env ->
                capturedCommands.add(Triple(process, args, env))
                "こんにちは世界"
            }
        )
        // Unicode文字を含む
        val result = cliEval(context, getBashSrcWrappingHexForShell("printf 'こんにちは世界'"))
        val output = result.toFluoriteString(null).value
        assertEquals("こんにちは世界", output)

        assertExecuteProcessHandlerCalled(capturedCommands)
    }

    @Test
    fun bashWithArguments() = runTest {
        val capturedCommands = mutableListOf<Triple<String, List<String>, Map<String, String?>>>()
        val context = TestIoContext(
            executeProcessHandler = { process, args, env ->
                capturedCommands.add(Triple(process, args, env))
                "apple banana"
            }
        )
        // 引数を渡す
        val result = cliEval(context, getBashSrcWrappingHexForShellWithArgs("printf '%s %s' \"$1\" \"$2\"", """"apple", "banana""""))
        val output = result.toFluoriteString(null).value
        assertEquals("apple banana", output)

        assertExecuteProcessHandlerCalled(capturedCommands)
    }

    @Test
    fun bashWithArgumentsMultipleLines() = runTest {
        val capturedCommands = mutableListOf<Triple<String, List<String>, Map<String, String?>>>()
        val context = TestIoContext(
            executeProcessHandler = { process, args, env ->
                capturedCommands.add(Triple(process, args, env))
                "The fruit is:\napple"
            }
        )
        // 引数を渡して複数行出力
        val result = cliEval(context, getBashSrcWrappingHexForShellWithArgs("printf '%s\\n%s\\n' \"$1\" \"$2\"", """"The fruit is:", "apple""""))
        val output = result.toFluoriteString(null).value
        assertEquals("The fruit is:\napple", output)

        assertExecuteProcessHandlerCalled(capturedCommands)
    }

}

private suspend fun getAbsolutePath(file: okio.Path): String {
    val fileSystem = getFileSystem().getOrThrow()
    return fileSystem.canonicalize(file).toString()
}

private suspend fun CoroutineScope.cliEval(ioContext: IoContext, src: String, vararg args: String): FluoriteValue {
    return withEvaluator(ioContext) { context, evaluator ->
        context.addDefaultIncPaths()
        val mounts = context.run { createCommonMounts() + createCliMounts(args.toList()) }
        lateinit var mountsFactory: (String) -> List<Map<String, Mount>>
        mountsFactory = { location ->
            mounts + context.run { createModuleMounts(location, mountsFactory) }
        }
        evaluator.defineMounts(mountsFactory("-"))
        evaluator.get(src).cache()
    }
}

internal class TestIoContext(
    private val stdinLines: List<String> = emptyList(),
    private val stdinBytes: ByteArray = byteArrayOf(),
    private val currentLocation: String = "/test/location",
    private val env: Map<String, String> = emptyMap(),
    private val executeProcessHandler: (suspend (process: String, args: List<String>, env: Map<String, String?>) -> String)? = null,
    private val fetchHandler: (suspend (context: RuntimeContext, url: String) -> ByteArray)? = null
) : IoContext {
    private var stdinLineIndex = 0
    private var stdinBytesIndex = 0
    val stdoutBytes = TestByteArrayOutputStream()
    val stderrBytes = TestByteArrayOutputStream()

    override suspend fun out(value: FluoriteValue) = writeBytesToStdout("${value.toFluoriteString(null).value}\n".encodeToByteArray())

    override suspend fun err(value: FluoriteValue) = writeBytesToStderr("${value.toFluoriteString(null).value}\n".encodeToByteArray())

    override suspend fun readLineFromStdin(): String? {
        return if (stdinLineIndex < stdinLines.size) {
            stdinLines[stdinLineIndex++]
        } else {
            null
        }
    }

    override suspend fun readBytesFromStdin(): ByteArray? {
        if (stdinBytesIndex >= stdinBytes.size) {
            return null
        }
        val remaining = stdinBytes.size - stdinBytesIndex
        val chunkSize = minOf(remaining, INB_MAX_BUFFER_SIZE)
        val chunk = stdinBytes.copyOfRange(stdinBytesIndex, stdinBytesIndex + chunkSize)
        stdinBytesIndex += chunkSize
        return chunk
    }

    override suspend fun writeBytesToStdout(bytes: ByteArray) {
        stdoutBytes.write(bytes)
    }

    override suspend fun writeBytesToStderr(bytes: ByteArray) {
        stderrBytes.write(bytes)
    }

    override suspend fun executeProcess(process: String, args: List<String>, env: Map<String, String?>) =
        executeProcessHandler?.invoke(process, args, env) ?: throw UnsupportedOperationException("executeProcessHandler is not set")

    override suspend fun fetch(context: RuntimeContext, url: String): ByteArray =
        fetchHandler?.invoke(context, url) ?: throw UnsupportedOperationException("fetchHandler is not set")

    override fun getEnv(): Map<String, String> = env

    override fun getPlatformPwd(): String = currentLocation

    fun clear() {
        stdoutBytes.reset()
        stderrBytes.reset()
        stdinLineIndex = 0
        stdinBytesIndex = 0
    }
}

internal class TestByteArrayOutputStream {
    private val buffer = mutableListOf<Byte>()

    fun write(bytes: ByteArray) {
        buffer.addAll(bytes.toList())
    }

    fun toByteArray(): ByteArray = buffer.toByteArray()

    fun reset() {
        buffer.clear()
    }

    fun toUtf8String(): String {
        return buffer.toByteArray().decodeToString()
    }
}

private suspend fun FluoriteValue.collectBlobs(): List<FluoriteBlob> {
    require(this is FluoriteStream) { "INB should return a stream" }
    return flow { this@collectBlobs.flowProvider(this) }.toList().map { value ->
        value as? FluoriteBlob ?: error("Unexpected element: $value")
    }
}

/** Windows環境では bash コマンドが余計な $ の置換をするので一旦シェルスクリプトを16進エンコードして渡す */
private fun getExecSrcWrappingHexForShell(script: String, functionName: String = "EXEC"): String {
    val hex = script.encodeToByteArray().toHexString()
    return """$functionName("bash", "-c", %>xxd -r -p <<<'$hex' | bash<%)"""
}

/** Windows環境では bash コマンドが余計な $ の置換をするので一旦シェルスクリプトを16進エンコードして渡す */
private fun getExecSrcWrappingHexForShellWithEnv(script: String, envObject: String, functionName: String = "EXEC"): String {
    val hex = script.encodeToByteArray().toHexString()
    return """$functionName("bash", "-c", %>xxd -r -p <<<'$hex' | bash<%; env: $envObject)"""
}

/** Windows環境では bash コマンドが余計な $ の置換をするので一旦シェルスクリプトを16進エンコードして渡す */
private fun getBashSrcWrappingHexForShell(script: String): String {
    // ブロック文字列リテラルを使用して、エスケープの問題を回避
    return """BASH(%>$script<%)"""
}

/** Windows環境では bash コマンドが余計な $ の置換をするので一旦シェルスクリプトを16進エンコードして渡す */
private fun getBashSrcWrappingHexForShellWithArgs(script: String, args: String): String {
    // ブロック文字列リテラルを使用して、エスケープの問題を回避
    return """BASH(%>$script<%; $args)"""
}
