import kotlinx.coroutines.ExperimentalCoroutinesApi
import kotlinx.coroutines.test.runTest
import mirrg.xarpite.test.eval
import mirrg.xarpite.test.stream
import mirrg.xarpite.test.string
import kotlin.test.Test
import kotlin.test.assertEquals

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
}
