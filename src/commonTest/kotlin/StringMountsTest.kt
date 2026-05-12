import kotlinx.coroutines.ExperimentalCoroutinesApi
import kotlinx.coroutines.test.runTest
import mirrg.xarpite.test.eval
import mirrg.xarpite.test.int
import mirrg.xarpite.test.stream
import mirrg.xarpite.test.string
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertFailsWith

@OptIn(ExperimentalCoroutinesApi::class)
class StringMountsTest {
    @Test
    fun uc_lc() = runTest {
        assertEquals("AB", eval("UC('Ab')").string)
        assertEquals("ab", eval("LC('Ab')").string)

        assertEquals("A,B", eval("'A', 'b'>> UC").stream())
        assertEquals("a,b", eval("'A', 'b'>> LC").stream())

        assertEquals("AB", eval("'Ab'::UC()").string)
        assertEquals("ab", eval("'Ab'::LC()").string)
    }

    @Test
    fun stringConstants() = runTest {
        assertEquals("<", eval("LT").string) // LT定数は < を返す
        assertEquals(">", eval("GT").string) // GT定数は > を返す
        assertEquals("&", eval("AMP").string) // AMP定数は & を返す
        assertEquals("'", eval("APOS").string) // APOS定数は ' を返す
        assertEquals("\"", eval("QUOT").string) // QUOT定数は " を返す
        assertEquals("\uFEFF", eval("BOM").string) // BOM定数は \uFEFF を返す
    }

    @Test
    fun bom() = runTest {
        // BOM定数は文字列 "\uFEFF" を返す
        assertEquals("\uFEFF", eval("BOM").string)

        // BOMをUTF8でエンコードすると、UTF-8 BOMのバイト列になる
        assertEquals("BLOB.of([239;187;191])", eval("BOM >> UTF8 >> TO_STRING").string)

        // BOMとUTF8を組み合わせてBOM付きUTF-8を生成できる
        assertEquals("BLOB.of([239;187;191;97;98;99])", eval("BOM + 'abc' >> UTF8 >> TO_STRING").string)
    }

    @Test
    fun lines() = runTest {
        // 基本的な改行分割
        assertEquals("a,b,c", eval("LINES(\"a\\nb\\nc\")").stream())

        // 末尾に改行がある場合、最後の改行は削除される
        assertEquals("a,b,c", eval("LINES(\"a\\nb\\nc\\n\")").stream())

        // 空文字列の場合
        assertEquals("", eval("LINES(\"\")").stream())

        // 改行のみの場合
        assertEquals("", eval("LINES(\"\\n\")").stream())

        // 複数の改行のみの場合
        assertEquals(",", eval("LINES(\"\\n\\n\")").stream())

        // Windows形式の改行（CRLF）
        assertEquals("a,b,c", eval("LINES(\"a\\r\\nb\\r\\nc\")").stream())

        // 末尾がCRLFの場合
        assertEquals("a,b,c", eval("LINES(\"a\\r\\nb\\r\\nc\\r\\n\")").stream())

        // 旧Mac形式の改行（CR）
        assertEquals("a,b,c", eval("LINES(\"a\\rb\\rc\")").stream())

        // 末尾がCRの場合
        assertEquals("a,b,c", eval("LINES(\"a\\rb\\rc\\r\")").stream())

        // 混在する改行形式
        assertEquals("a,b,c,d", eval("LINES(\"a\\nb\\r\\nc\\rd\")").stream())

        // 空行を含む場合
        assertEquals("a,,b", eval("LINES(\"a\\n\\nb\")").stream())
    }

    @Test
    fun resolve() = runTest {
        // 基本的なパス結合
        assertEquals("/home/apple/Apple.txt", eval("RESOLVE('/home/apple'; 'Apple.txt')").string)

        // ルートディレクトリとの結合
        assertEquals("/Banana.txt", eval("RESOLVE('/'; 'Banana.txt')").string)

        // 拡張関数版と相対パスの解決
        assertEquals("/home/cherry/Cherry.txt", eval("'/home/apple/'::RESOLVE('../cherry/./Cherry.txt')").string)

        // . を含むパスの正規化
        assertEquals("/home/user/file.txt", eval("RESOLVE('/home/user'; './file.txt')").string)

        // 複数の .. を含むパス
        assertEquals("/file.txt", eval("RESOLVE('/home/user/dir'; '../../../file.txt')").string)

        // 拡張関数版
        assertEquals("/home/user/file.txt", eval("'/home/user'::RESOLVE('file.txt')").string)

        // 末尾にスラッシュがあるディレクトリパス
        assertEquals("/home/user/file.txt", eval("RESOLVE('/home/user/'; 'file.txt')").string)

        // 2段階の .. を含むパス
        assertEquals("/home/file.txt", eval("RESOLVE('/home/user/dir'; '../../file.txt')").string)
    }

    @Test
    fun charCode() = runTest {
        // CHAR_CODE: UTF-16コード単位を返す
        assertEquals(65, eval("CHAR_CODE('A')").int) // 'A' のコードは65
        assertEquals(12354, eval("CHAR_CODE('\u3042')").int) // 'あ' のコードは12354

        // CHAR_CODE: 1コード単位でない場合はエラー
        assertFailsWith<Exception> { eval("CHAR_CODE('')") } // 空文字列はエラー
        assertFailsWith<Exception> { eval("CHAR_CODE('AB')") } // 2文字はエラー

        // CHAR_CODED: コード単位から文字列を返す
        assertEquals("A", eval("CHAR_CODED(65)").string) // 65 は 'A'
        assertEquals("\u3042", eval("CHAR_CODED(12354)").string) // 12354 は 'あ'

        // CHAR_CODED: 範囲外の場合はエラー
        assertFailsWith<Exception> { eval("CHAR_CODED(-1)") } // 負数はエラー
        assertFailsWith<Exception> { eval("CHAR_CODED(65536)") } // 65536はエラー

        // CHAR_CODES: 文字列からUTF-16コード単位のストリームを返す
        assertEquals("65,66,67", eval("CHAR_CODES('ABC')").stream()) // 'ABC'のコード列
        assertEquals("12354,12356", eval("CHAR_CODES('\u3042\u3044')").stream()) // 'あい'のコード列
        assertEquals("", eval("CHAR_CODES('')").stream()) // 空文字列は空ストリーム

        // CHAR_CODESD: コード単位のストリームから文字列を返す
        assertEquals("ABC", eval("CHAR_CODESD(65, 66, 67)").string) // コード列から文字列
        assertEquals("\u3042\u3044", eval("CHAR_CODESD(12354, 12356)").string) // 日本語文字
        assertEquals("A", eval("CHAR_CODESD(65)").string) // 単一のコード単位

        // CHAR_CODESD: 範囲外の場合はエラー
        assertFailsWith<Exception> { eval("CHAR_CODESD(-1)") } // 負数はエラー
        assertFailsWith<Exception> { eval("CHAR_CODESD(65536)") } // 65536はエラー

        // CHAR_CODESとCHAR_CODESDは逆変換
        assertEquals("Hello", eval("'Hello' >> CHAR_CODES >> CHAR_CODESD").string)
    }

    @Test
    fun codePoint() = runTest {
        // CODE_POINT: Unicodeコードポイントを返す
        assertEquals(65, eval("CODE_POINT('A')").int) // 'A' のコードポイントは65
        assertEquals(12354, eval("CODE_POINT('\u3042')").int) // 'あ' のコードポイントは12354
        // サロゲートペアの文字（U+1F600 😀 = 0x1F600 = 128512）
        assertEquals(128512, eval("CODE_POINT('\uD83D\uDE00')").int) // 😀 のコードポイント

        // CODE_POINT: 1コードポイントでない場合はエラー
        assertFailsWith<Exception> { eval("CODE_POINT('')") } // 空文字列はエラー
        assertFailsWith<Exception> { eval("CODE_POINT('AB')") } // 2文字はエラー

        // CODE_POINTD: コードポイントから文字列を返す
        assertEquals("A", eval("CODE_POINTD(65)").string) // 65 は 'A'
        assertEquals("\u3042", eval("CODE_POINTD(12354)").string) // 12354 は 'あ'
        assertEquals("\uD83D\uDE00", eval("CODE_POINTD(128512)").string) // 128512 は 😀

        // CODE_POINTD: 範囲外の場合はエラー
        assertFailsWith<Exception> { eval("CODE_POINTD(-1)") } // 負数はエラー
        assertFailsWith<Exception> { eval("CODE_POINTD(1114112)") } // U+110000はエラー
        assertFailsWith<Exception> { eval("CODE_POINTD(55296)") } // サロゲートはエラー（U+D800）

        // CODE_POINTS: 文字列からUnicodeコードポイントのストリームを返す
        assertEquals("65,66,67", eval("CODE_POINTS('ABC')").stream()) // 'ABC'のコードポイント列
        assertEquals("12354,12356", eval("CODE_POINTS('\u3042\u3044')").stream()) // 'あい'のコードポイント列
        assertEquals("128512", eval("CODE_POINTS('\uD83D\uDE00')").stream()) // 😀 のコードポイント
        assertEquals("", eval("CODE_POINTS('')").stream()) // 空文字列は空ストリーム

        // CODE_POINTSD: コードポイントのストリームから文字列を返す
        assertEquals("ABC", eval("CODE_POINTSD(65, 66, 67)").string) // コードポイント列から文字列
        assertEquals("\u3042\u3044", eval("CODE_POINTSD(12354, 12356)").string) // 日本語文字
        assertEquals("\uD83D\uDE00", eval("CODE_POINTSD(128512)").string) // 😀
        assertEquals("A", eval("CODE_POINTSD(65)").string) // 単一のコードポイント

        // CODE_POINTSD: 範囲外の場合はエラー
        assertFailsWith<Exception> { eval("CODE_POINTSD(-1)") } // 負数はエラー
        assertFailsWith<Exception> { eval("CODE_POINTSD(1114112)") } // U+110000はエラー
        assertFailsWith<Exception> { eval("CODE_POINTSD(55296)") } // サロゲートはエラー

        // CODE_POINTSとCODE_POINTSDは逆変換
        assertEquals("Hello", eval("'Hello' >> CODE_POINTS >> CODE_POINTSD").string)
        // サロゲートペアも往復できる
        assertEquals("\uD83D\uDE00", eval("'\uD83D\uDE00' >> CODE_POINTS >> CODE_POINTSD").string)
    }
}
