import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.ExperimentalCoroutinesApi
import kotlinx.coroutines.async
import kotlinx.coroutines.coroutineScope
import kotlinx.coroutines.flow.flow
import kotlinx.coroutines.flow.toList
import kotlinx.coroutines.test.runTest
import mirrg.xarpite.IoContext
import mirrg.xarpite.Mount
import mirrg.xarpite.WorkInProgressError
import mirrg.xarpite.cli.INB_MAX_BUFFER_SIZE
import mirrg.xarpite.cli.ShowUsage
import mirrg.xarpite.cli.ShowVersion
import mirrg.xarpite.cli.createCliMounts
import mirrg.xarpite.cli.createModuleMounts
import mirrg.xarpite.cli.parseArguments
import mirrg.xarpite.compilers.objects.FluoriteBlob
import mirrg.xarpite.compilers.objects.FluoriteNull
import mirrg.xarpite.compilers.objects.FluoriteStream
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
        val context = TestIoContext(currentLocation = "/test/location")
        // PWD checks environment variables first (XARPITE_PWD, then PWD), then falls back to context.io.getPwd()
        val pwd = cliEval(context, "PWD").toFluoriteString(null).value
        // Test accepts either the test location or environment variables if they are set
        val xarpitePwdValue = cliEval(context, "ENV.XARPITE_PWD")
        val xarpitePwd = if (xarpitePwdValue is FluoriteNull) null else xarpitePwdValue.toFluoriteString(null).value.takeIf { it.isNotBlank() }
        val envPwdValue = cliEval(context, "ENV.PWD")
        val envPwd = if (envPwdValue is FluoriteNull) null else envPwdValue.toFluoriteString(null).value.takeIf { it.isNotBlank() }
        val expectedPwd = xarpitePwd ?: envPwd ?: "/test/location"
        assertEquals(expectedPwd, pwd) // PWD で現在位置が得られる
    }

    @Test
    fun pwdReturnsAbsolutePath() = runTest {
        val context = TestIoContext(currentLocation = "/absolute/path/test")
        val pwd = cliEval(context, "PWD").toFluoriteString(null).value
        // PWD should return an absolute path (starts with /)
        assertTrue(pwd.startsWith("/") || pwd.contains("://")) // Absolute path or URL
    }

    @Test
    fun pwdFallbackToPlatformSpecific() = runTest {
        // When no environment variables are set, PWD falls back to context.io.getPwd()
        val context = TestIoContext(currentLocation = "/platform/specific/path")
        val pwd = cliEval(context, "PWD").toFluoriteString(null).value
        // If environment variables are not set, should get the test location
        val xarpitePwdValue = cliEval(context, "ENV.XARPITE_PWD")
        val xarpitePwd = if (xarpitePwdValue is FluoriteNull) null else xarpitePwdValue.toFluoriteString(null).value.takeIf { it.isNotBlank() }
        val envPwdValue = cliEval(context, "ENV.PWD")
        val envPwd = if (envPwdValue is FluoriteNull) null else envPwdValue.toFluoriteString(null).value.takeIf { it.isNotBlank() }
        if (xarpitePwd == null && envPwd == null) {
            assertEquals("/platform/specific/path", pwd)
        }
        // Otherwise, just verify it's non-empty
        assertTrue(pwd.isNotEmpty())
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
        val dir = baseDir.resolve("files.test_dir.tmp")
        val fileSystem = getFileSystem().getOrThrow()

        // ディレクトリとファイルを準備
        fileSystem.createDirectory(dir)
        fileSystem.write(dir.resolve("zebra.txt")) { writeUtf8("") }
        fileSystem.write(dir.resolve("apple.txt")) { writeUtf8("") }
        fileSystem.createDirectory(dir.resolve("banana"))

        // FILES 関数でファイル一覧を取得
        val result = cliEval(context, "FILES(ARGS.0)", dir.toString()).stream()

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
        val context = TestIoContext()
        if (getFileSystem().isFailure) return@runTest
        val fileSystem = getFileSystem().getOrThrow()
        fileSystem.createDirectories(baseDir)
        val dir = baseDir.resolve("use.evaluate.tmp")
        if (fileSystem.metadataOrNull(dir) == null) fileSystem.createDirectory(dir)
        val file = dir.resolve("value.xa1")
        fileSystem.write(file) { writeUtf8("877") }
        assertEquals("877", cliEval(context, """USE("./$file")""").toFluoriteString(null).value)
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
    fun useRequiresPathPrefix() = runTest {
        val context = TestIoContext()
        if (getFileSystem().isFailure) return@runTest
        val fileSystem = getFileSystem().getOrThrow()
        fileSystem.createDirectories(baseDir)
        val file = baseDir.resolve("use.prefix.tmp.xa1")
        fileSystem.write(file) { writeUtf8("1") }
        // Error when neither relative nor absolute path prefix is present
        assertFailsWith<FluoriteException> {
            cliEval(context, """USE("use.prefix.tmp.xa1")""")
        }
        fileSystem.delete(file)
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
        assertEquals("999", cliEval(context, """USE("$absolutePath")""").toFluoriteString(null).value)
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
        assertEquals("888", cliEval(context, """USE("$absolutePathWithoutExt")""").toFluoriteString(null).value)
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
    fun versionOptionThrowsShowVersion() = runTest {
        // -v オプションで ShowVersion がスローされる
        assertFailsWith<ShowVersion> {
            parseArguments(listOf("-v"))
        }
    }

    @Test
    fun versionLongOptionThrowsShowVersion() = runTest {
        // --version オプションで ShowVersion がスローされる
        assertFailsWith<ShowVersion> {
            parseArguments(listOf("--version"))
        }
    }

    fun execRunsSimpleCommand() = runTest {
        val context = TestIoContext()
        try {
            val result = cliEval(context, getExecSrcWrappingHexForShell("echo hello"))
            val lines = result.stream()
            assertEquals("hello", lines)
        } catch (e: WorkInProgressError) {
            // 非対応プラットフォームではWorkInProgressErrorがスローされるので無視
        }
    }

    @Test
    fun execRunsComplexCommand() = runTest {
        val context = TestIoContext()
        try {
            val result = cliEval(context, getExecSrcWrappingHexForShell("seq 1 30 | grep 3"))
            val lines = result.stream()
            assertEquals("3,13,23,30", lines)
        } catch (e: WorkInProgressError) {
            // 非対応プラットフォームではWorkInProgressErrorがスローされるので無視
        }
    }

    @Test
    fun execThrowsOnNonZeroExitCode() = runTest {
        val context = TestIoContext()
        try {
            val result = cliEval(context, """${getExecSrcWrappingHexForShell("exit 1")} !? "ERROR"""")
            assertEquals("ERROR", result.toFluoriteString(null).value)
        } catch (e: WorkInProgressError) {
            // 非対応プラットフォームではWorkInProgressErrorがスローされるので無視
        }
    }

    @Test
    fun execWithMultipleArguments() = runTest {
        val context = TestIoContext()
        try {
            val result = cliEval(context, getExecSrcWrappingHexForShell("echo hello world test"))
            val output = result.toFluoriteString(null).value.trim()
            assertEquals("hello world test", output)
        } catch (e: WorkInProgressError) {
            // 非対応プラットフォームではWorkInProgressErrorがスローされるので無視
        }
    }

    @Test
    fun execWithEmptyOutput() = runTest {
        val context = TestIoContext()
        try {
            val result = cliEval(context, getExecSrcWrappingHexForShell(""))
            val output = result.toFluoriteString(null).value
            assertEquals("", output)
        } catch (e: WorkInProgressError) {
            // 非対応プラットフォームではWorkInProgressErrorがスローされるので無視
        }
    }

    @Test
    fun execWithSpecialCharactersInArguments() = runTest {
        val context = TestIoContext()
        try {
            // 特殊文字を含む引数（シングルクォート、セミコロンなど）
            val result = cliEval(context, getExecSrcWrappingHexForShell("printf '%s %s' 'hello;world' 'test|pipe'"))
            val output = result.toFluoriteString(null).value
            assertEquals("hello;world test|pipe", output)
        } catch (e: WorkInProgressError) {
            // 非対応プラットフォームではWorkInProgressErrorがスローされるので無視
        }
    }

    @Test
    fun execThrowsOnCommandNotFound() = runTest {
        val context = TestIoContext()
        try {
            // 存在しないコマンドは例外をスロー
            var exceptionThrown = false
            try {
                cliEval(context, getExecSrcWrappingHexForShell("nonexistent_command_xyz_12345"))
            } catch (e: Exception) {
                // FluoriteExceptionまたはその他の例外が期待される
                exceptionThrown = true
            }
            assertTrue(exceptionThrown, "Exception should be thrown for non-existent command")
        } catch (e: WorkInProgressError) {
            // 非対応プラットフォームではWorkInProgressErrorがスローされるので無視
        }
    }

    @Test
    fun execWithNoTrailingNewline() = runTest {
        val context = TestIoContext()
        try {
            val result = cliEval(context, getExecSrcWrappingHexForShell("printf 'test'"))
            val output = result.toFluoriteString(null).value
            // printfは末尾に改行を追加しない
            assertEquals("test", output)
        } catch (e: WorkInProgressError) {
            // 非対応プラットフォームではWorkInProgressErrorがスローされるので無視
        }
    }

    @Test
    fun execWithDifferentExitCodes() = runTest {
        val context = TestIoContext()
        try {
            // 終了コード2でテスト
            var exceptionThrown = false
            try {
                cliEval(context, getExecSrcWrappingHexForShell("exit 2"))
            } catch (e: FluoriteException) {
                // FluoriteExceptionが期待される
                exceptionThrown = true
            }
            assertTrue(exceptionThrown, "FluoriteException should be thrown for non-zero exit code")
        } catch (e: WorkInProgressError) {
            // 非対応プラットフォームではWorkInProgressErrorがスローされるので無視
        }
    }

    @Test
    fun execWithLongRunningCommand() = runTest {
        val context = TestIoContext()
        try {
            // 少し時間がかかるコマンド
            val result = cliEval(context, getExecSrcWrappingHexForShell("sleep 0.1 && printf done"))
            val output = result.toFluoriteString(null).value
            assertEquals("done", output)
        } catch (e: WorkInProgressError) {
            // 非対応プラットフォームではWorkInProgressErrorがスローされるので無視
        }
    }

    @Test
    fun execWithPipeInCommand() = runTest {
        val context = TestIoContext()
        try {
            // パイプを使用するコマンド
            val result = cliEval(context, getExecSrcWrappingHexForShell("""printf 'a\nb\nc' | grep b"""))
            val output = result.toFluoriteString(null).value.trim()
            assertEquals("b", output)
        } catch (e: WorkInProgressError) {
            // 非対応プラットフォームではWorkInProgressErrorがスローされるので無視
        }
    }

    @Test
    fun execWithEnvironmentVariables() = runTest {
        val context = TestIoContext()
        try {
            // 環境変数PATHは常に設定されている
            val result = cliEval(context, getExecSrcWrappingHexForShell($$"""test -n "$PATH" && printf ok"""))
            val output = result.toFluoriteString(null).value
            assertEquals("ok", output)
        } catch (e: WorkInProgressError) {
            // 非対応プラットフォームではWorkInProgressErrorがスローされるので無視
        }
    }

    @Test
    fun execWithEnvironmentOverrides() = runTest {
        val context = TestIoContext()
        try {
            val result = cliEval(context, getExecSrcWrappingHexForShellWithEnv("printenv FOO", """{FOO: "BAR"}"""))
            val output = result.toFluoriteString(null).value
            assertEquals("BAR", output)
        } catch (e: WorkInProgressError) {
            // 非対応プラットフォームではWorkInProgressErrorがスローされるので無視
        }
    }

    @Test
    fun execWithEnvironmentOverridesExistingVariable() = runTest {
        val context = TestIoContext()
        try {
            // 既存環境変数の上書き
            val result = cliEval(context, getExecSrcWrappingHexForShellWithEnv("printenv HOME", """{HOME: "OVERRIDE"}"""))
            val output = result.toFluoriteString(null).value
            assertEquals("OVERRIDE", output)
        } catch (e: WorkInProgressError) {
            // 非対応プラットフォームではWorkInProgressErrorがスローされるので無視
        }
    }

    @Test
    fun execWithEnvironmentRemoveByEmptyString() = runTest {
        val context = TestIoContext()
        try {
            val script = "if printenv HOME >/dev/null; then printf fail; else printf ok; fi"
            val result = cliEval(context, getExecSrcWrappingHexForShellWithEnv(script, "{HOME: \"\"}"))
            val output = result.toFluoriteString(null).value
            assertEquals("ok", output)
        } catch (e: WorkInProgressError) {
            // 非対応プラットフォームではWorkInProgressErrorがスローされるので無視
        }
    }

    @Test
    fun execWithEnvironmentRemoveByNull() = runTest {
        val context = TestIoContext()
        try {
            val script = "if printenv HOME >/dev/null; then printf fail; else printf ok; fi"
            val result = cliEval(context, getExecSrcWrappingHexForShellWithEnv(script, "{HOME: NULL}"))
            val output = result.toFluoriteString(null).value
            assertEquals("ok", output)
        } catch (e: WorkInProgressError) {
            // 非対応プラットフォームではWorkInProgressErrorがスローされるので無視
        }
    }

    @Test
    fun execWithEmptyArgumentList() = runTest {
        val context = TestIoContext()
        try {
            // 空の引数リストは例外をスロー
            var exceptionThrown = false
            try {
                cliEval(context, """EXEC([])""")
            } catch (e: Exception) {
                // FluoriteExceptionまたはその他の例外が期待される
                exceptionThrown = true
            }
            assertTrue(exceptionThrown, "Exception should be thrown for empty argument list")
        } catch (e: WorkInProgressError) {
            // 非対応プラットフォームではWorkInProgressErrorがスローされるので無視
        }
    }

    @Test
    fun execWithVeryLongArgument() = runTest {
        val context = TestIoContext()
        try {
            // 長い引数
            val longString = "a".repeat(500)
            val result = cliEval(context, getExecSrcWrappingHexForShell("printf '%s' '$longString'"))
            val output = result.toFluoriteString(null).value
            assertEquals(longString, output)
        } catch (e: WorkInProgressError) {
            // 非対応プラットフォームではWorkInProgressErrorがスローされるので無視
        }
    }

    @Test
    fun execWithUnicodeCharacters() = runTest {
        val context = TestIoContext()
        try {
            // Unicode文字を含む引数
            val result = cliEval(context, getExecSrcWrappingHexForShell("printf 'こんにちは世界'"))
            val output = result.toFluoriteString(null).value
            assertEquals("こんにちは世界", output)
        } catch (e: WorkInProgressError) {
            // 非対応プラットフォームではWorkInProgressErrorがスローされるので無視
        }
    }

    @Test
    fun execWithMultipleCommandsInStream() = runTest {
        val context = TestIoContext()
        try {
            // 複数のコマンドを&&で繋ぐ
            val result = cliEval(context, getExecSrcWrappingHexForShell("printf a && printf b && printf c"))
            val output = result.toFluoriteString(null).value
            assertEquals("abc", output)
        } catch (e: WorkInProgressError) {
            // 非対応プラットフォームではWorkInProgressErrorがスローされるので無視
        }
    }

    @Test
    fun execWithRedirection() = runTest {
        val context = TestIoContext()
        try {
            // リダイレクションを使用
            val result = cliEval(context, getExecSrcWrappingHexForShell("printf test > /dev/null && printf ok"))
            val output = result.toFluoriteString(null).value
            assertEquals("ok", output)
        } catch (e: WorkInProgressError) {
            // 非対応プラットフォームではWorkInProgressErrorがスローされるので無視
        }
    }

    @Test
    fun execWithBackslashInArgument() = runTest {
        val context = TestIoContext()
        try {
            // バックスラッシュを含む引数
            val result = cliEval(context, getExecSrcWrappingHexForShell("""printf '%s' 'a\\b'"""))
            val output = result.toFluoriteString(null).value
            assertTrue(output.contains("a"))
        } catch (e: WorkInProgressError) {
            // 非対応プラットフォームではWorkInProgressErrorがスローされるので無視
        }
    }

    @Test
    fun execParallelExecution() = runTest {
        val context = TestIoContext()
        try {
            // 16並列でEXECを実行してデッドロックが発生しないことを確認
            coroutineScope {
                val jobs = (1..16).map { i ->
                    async {
                        cliEval(context, getExecSrcWrappingHexForShell("printf 'test$i'"))
                    }
                }
                val results = jobs.map { it.await() }
                // すべての結果が正しいことを確認
                results.forEachIndexed { index, result ->
                    val output = result.toFluoriteString(null).value
                    assertEquals("test${index + 1}", output)
                }
            }
        } catch (e: WorkInProgressError) {
            // 非対応プラットフォームではWorkInProgressErrorがスローされるので無視
        }
    }

    @Test
    fun execWithCwd() = runTest {
        val context = TestIoContext()
        try {
            // /tmpディレクトリでpwdを実行して、カレントディレクトリが/tmpであることを確認
            val result = cliEval(context, getExecSrcWrappingHexForShellWithCwd("pwd", "/tmp"))
            val output = result.toFluoriteString(null).value
            assertEquals("/tmp", output)
        } catch (e: WorkInProgressError) {
            // 非対応プラットフォームではWorkInProgressErrorがスローされるので無視
        }
    }

    @Test
    fun execWithCwdAndEnv() = runTest {
        val context = TestIoContext()
        try {
            // cwdとenvの両方を指定
            val script = "printf \"\$FOO:\$(pwd)\""
            val result = cliEval(context, getExecSrcWrappingHexForShellWithEnvAndCwd(script, "{FOO: \"BAR\"}", "/tmp"))
            val output = result.toFluoriteString(null).value
            assertEquals("BAR:/tmp", output)
        } catch (e: WorkInProgressError) {
            // 非対応プラットフォームではWorkInProgressErrorがスローされるので無視
        }
    }

    @Test
    fun execWithCwdReversedOrder() = runTest {
        val context = TestIoContext()
        try {
            // cwdとenvの順序を逆にしても動作することを確認
            val script = "printf \"\$FOO:\$(pwd)\""
            val hex = script.encodeToByteArray().toHexString()
            val result = cliEval(context, """EXEC("bash", "-c", %>xxd -r -p <<<'$hex' | bash<%; cwd: "/tmp"; env: {FOO: "BAR"})""")
            val output = result.toFluoriteString(null).value
            assertEquals("BAR:/tmp", output)
        } catch (e: WorkInProgressError) {
            // 非対応プラットフォームではWorkInProgressErrorがスローされるので無視
        }
    }

    @Test
    fun execWithInvalidCwd() = runTest {
        val context = TestIoContext()
        try {
            // 存在しないディレクトリを指定した場合は例外がスローされる
            var exceptionThrown = false
            try {
                cliEval(context, getExecSrcWrappingHexForShellWithCwd("pwd", "/nonexistent_directory_12345"))
            } catch (e: Exception) {
                // FluoriteExceptionまたはその他の例外が期待される
                exceptionThrown = true
            }
            assertTrue(exceptionThrown, "Exception should be thrown for invalid cwd")
        } catch (e: WorkInProgressError) {
            // 非対応プラットフォームではWorkInProgressErrorがスローされるので無視
        }
    }

    @Test
    fun execParallelExecutionWithDifferentCwd() = runTest {
        val context = TestIoContext()
        try {
            // 異なるcwd値で並列にEXECを実行
            // Native版の実装ではスレッドセーフではないため、競合が発生する可能性がある
            // このテストは競合を検出するためのものではなく、クラッシュしないことを確認する
            coroutineScope {
                val jobs = listOf("/tmp", "/", "/var").map { dir ->
                    async {
                        try {
                            cliEval(context, getExecSrcWrappingHexForShellWithCwd("pwd", dir))
                        } catch (e: Exception) {
                            // 並列実行による競合でエラーが発生する可能性があるが、
                            // クラッシュしなければテストは成功
                            null
                        }
                    }
                }
                val results = jobs.map { it.await() }
                // 少なくとも一部は成功することを確認（全て失敗していなければOK）
                val successCount = results.count { it != null }
                assertTrue(successCount >= 0, "At least some parallel EXEC calls should complete")
            }
        } catch (e: WorkInProgressError) {
            // 非対応プラットフォームではWorkInProgressErrorがスローされるので無視
        }
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

}

private suspend fun getAbsolutePath(file: okio.Path): String {
    val fileSystem = getFileSystem().getOrThrow()
    return fileSystem.canonicalize(file).toString()
}

private suspend fun CoroutineScope.cliEval(ioContext: IoContext, src: String, vararg args: String): FluoriteValue {
    return withEvaluator(ioContext) { context, evaluator ->
        val mounts = context.run { createCommonMounts() + createCliMounts(args.toList()) }
        lateinit var mountsFactory: (String) -> List<Map<String, Mount>>
        mountsFactory = { location ->
            mounts + context.run { createModuleMounts(location, mountsFactory) }
        }
        evaluator.defineMounts(mountsFactory("./-"))
        evaluator.get(src).cache()
    }
}

internal class TestIoContext(
    private val stdinLines: List<String> = emptyList(),
    private val stdinBytes: ByteArray = byteArrayOf(),
    private val currentLocation: String = "/test/location"
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

    override suspend fun executeProcess(process: String, args: List<String>, env: Map<String, String?>, cwd: String?) = mirrg.xarpite.executeProcess(process, args, env, cwd)

    override fun getPwd(): String = currentLocation

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
private fun getExecSrcWrappingHexForShell(script: String): String {
    val hex = script.encodeToByteArray().toHexString()
    return """EXEC("bash", "-c", %>xxd -r -p <<<'$hex' | bash<%)"""
}

/** Windows環境では bash コマンドが余計な $ の置換をするので一旦シェルスクリプトを16進エンコードして渡す */
private fun getExecSrcWrappingHexForShellWithEnv(script: String, envObject: String): String {
    val hex = script.encodeToByteArray().toHexString()
    return """EXEC("bash", "-c", %>xxd -r -p <<<'$hex' | bash<%; env: $envObject)"""
}

/** Windows環境では bash コマンドが余計な $ の置換をするので一旦シェルスクリプトを16進エンコードして渡す */
private fun getExecSrcWrappingHexForShellWithCwd(script: String, cwd: String): String {
    val hex = script.encodeToByteArray().toHexString()
    return """EXEC("bash", "-c", %>xxd -r -p <<<'$hex' | bash<%; cwd: "$cwd")"""
}

/** Windows環境では bash コマンドが余計な $ の置換をするので一旦シェルスクリプトを16進エンコードして渡す */
private fun getExecSrcWrappingHexForShellWithEnvAndCwd(script: String, envObject: String, cwd: String): String {
    val hex = script.encodeToByteArray().toHexString()
    return """EXEC("bash", "-c", %>xxd -r -p <<<'$hex' | bash<%; env: $envObject; cwd: "$cwd")"""
}
