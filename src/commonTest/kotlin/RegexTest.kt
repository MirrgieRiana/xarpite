import kotlinx.coroutines.ExperimentalCoroutinesApi
import kotlinx.coroutines.test.runTest
import mirrg.xarpite.compilers.objects.FluoriteNull
import mirrg.xarpite.compilers.objects.FluoriteRegex
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertNotEquals

@OptIn(ExperimentalCoroutinesApi::class)
class RegexTest {

    @Test
    fun literal() = runTest {
        assertEquals(FluoriteRegex("""ABC""", null), eval("""/ABC/""")) // 正規表現リテラル
        assertEquals(FluoriteRegex("""ABC""", "gim"), eval("""/ABC/gim""")) // フラグ付き
        assertEquals(10, eval("10\n// + 20").int) // 空の場合は行コメントが優先される
        assertEquals(FluoriteRegex("""A\wB""", null), eval("""/A\wB/""")) // エスケープがそのままパスされる
        assertEquals(FluoriteRegex("""A/B""", null), eval("""/A\/B/""")) // / のエスケープ
    }

    @Test
    fun contains() = runTest {
        assertEquals(true, eval(""" /B/ @ "ABC" """).boolean) // 部分一致
        assertEquals(false, eval(""" /D/ @ "ABC" """).boolean) // 部分一致しない
        assertEquals(false, eval(""" /b/ @ "ABC" """).boolean) // 大文字小文字を区別
        assertEquals(true, eval(""" /b/i @ "ABC" """).boolean) // 大文字小文字を区別しない
        assertEquals(false, eval(""" /^B/ @ "A\nB\nC" """).boolean) // 行頭一致しない
        assertEquals(true, eval(""" /^B/m @ "A\nB\nC" """).boolean) // 行頭一致する
    }

    @Test
    fun match() = runTest {
        assertNotEquals(FluoriteNull, eval(""" "ABC" =~ /B/ """)) // 部分一致
        assertEquals(FluoriteNull, eval(""" "ABC" =~ /D/ """)) // 部分一致しない
        assertEquals("B", eval(""" ("ABC" =~ /B/).0 """).string) // 一致部分の全体
        assertEquals("B", eval(""" ("ABC" =~ /A(\w)C/).1 """).string) // グループ
        assertEquals("[ABCDE;B;D]", eval(""" ("ABCDE" =~ /A(B)C(D)E/)[] """).array()) // 一致部分とグループの配列化
        assertEquals("B", eval(""" /A(\w)C/("ABC").1 """).string) // 関数呼び出しでも可

        assertEquals("A,B,C", eval(""" "ABC" =~ /./g | _.0 """).stream()) // 全件抽出
        assertEquals("B,E,H", eval(""" "ABC,DEF,GHI" =~ /\w(\w)\w/g | _.1 """).stream()) // 全件グループ抽出
    }

    @Test
    fun new() = runTest {
        assertEquals(FluoriteRegex("ABC", null), eval(""" REGEX.new("ABC") """)) // ファクトリ関数
        assertEquals(FluoriteRegex("ABC", "gim"), eval(""" REGEX.new("ABC"; "gim") """)) // フラグ指定版

        assertEquals("ABC", eval(""" /ABC/gim.pattern """).string) // patternの取得
        assertEquals("gim", eval(""" /ABC/gim.flags """).string) // flagsの取得
        assertEquals(FluoriteNull, eval(""" /ABC/.flags """)) // nullのflagsの取得
    }

}
