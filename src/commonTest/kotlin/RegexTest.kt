import kotlinx.coroutines.ExperimentalCoroutinesApi
import kotlinx.coroutines.test.runTest
import mirrg.xarpite.compilers.objects.FluoriteNull
import mirrg.xarpite.compilers.objects.FluoriteRegex
import mirrg.xarpite.operations.FluoriteException
import mirrg.xarpite.test.array
import mirrg.xarpite.test.boolean
import mirrg.xarpite.test.eval
import mirrg.xarpite.test.int
import mirrg.xarpite.test.stream
import mirrg.xarpite.test.string
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertFailsWith
import kotlin.test.assertNotEquals
import kotlin.test.assertSame

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
    fun match_period() = runTest {
        assertEquals("l", eval(""" "apple"./pp(.)/.1 """).string) // プロパティアクセスによるマッチとグループ参照
        assertEquals("abc", eval(""" "1abc1"./1(.*)1/.1 """).string) // 括弧なしでマッチとグループ参照を連鎖
        assertNotEquals(FluoriteNull, eval(""" "ABC"./B/ """)) // 部分一致
        assertEquals(FluoriteNull, eval(""" "ABC"./D/ """)) // 部分一致しない
        assertEquals("B", eval(""" "ABC"./B/.0 """).string) // 一致部分の全体
        assertEquals("B", eval(""" "ABC"./A(\w)C/.1 """).string) // グループ
        assertEquals("[ABCDE;B;D]", eval(""" "ABCDE"./A(B)C(D)E/[] """).array()) // 一致部分とグループの配列化

        assertEquals("A,B,C", eval(""" "ABC"././g | _.0 """).stream()) // 全件抽出
        assertEquals("B,E,H", eval(""" "ABC,DEF,GHI"./\w(\w)\w/g | _.1 """).stream()) // 全件グループ抽出

        assertEquals("abc", eval(""" r := /1(.*)1/; "1abc1".(r).1 """).string) // キーは正規表現リテラルに限らない
        assertEquals("2", eval(""" Obj := {`_._`: this, regex -> this("value") =~ regex}; Obj{value: "a2c"}./\w(\d)\w/.1 """).string) // カスタム型の _._ オーバーライドが尊重される
    }

    @Test
    fun not_match() = runTest {
        assertEquals(false, eval(""" "ABC" !~ /B/ """).boolean) // 部分一致
        assertEquals(true, eval(""" "ABC" !~ /D/ """).boolean) // 部分一致しない
        assertEquals(false, eval(""" "ABC" !~ /b/i """).boolean) // 大文字小文字を区別しない
        assertEquals(false, eval(""" "ABC" !~ /B/g """).boolean) // グローバルマッチで一致
        assertEquals(true, eval(""" "ABC" !~ /D/g """).boolean) // グローバルマッチで一致しない（空ストリームは偽）
    }

    @Test
    fun match_stream() = runTest {
        assertEquals(
            eval(""" ("1", "2", "3" =~ /\d/) | _.0 """).stream(),
            eval(""" ("1", "2", "3" | _ =~ /\d/) | _.0 """).stream(),
        )
    }

    @Test
    fun not_match_stream() = runTest {
        assertEquals(
            eval(""" ("ABC", "DEF", "GHI") | _ !~ /D/ """).stream(),
            eval(""" ("ABC", "DEF", "GHI") !~ /D/ """).stream(),
        )
    }

    @Test
    fun new() = runTest {
        assertEquals(FluoriteRegex("ABC", null), eval(""" REGEX.new("ABC") """)) // ファクトリ関数
        assertEquals(FluoriteRegex("ABC", "gim"), eval(""" REGEX.new("ABC"; "gim") """)) // フラグ指定版

        assertEquals("ABC", eval(""" /ABC/gim.pattern """).string) // patternの取得
        assertEquals("gim", eval(""" /ABC/gim.flags """).string) // flagsの取得
        assertEquals(FluoriteNull, eval(""" /ABC/.flags """)) // nullのflagsの取得
    }

    @Test
    fun withFlag() = runTest {
        assertEquals(FluoriteRegex("abc", "g"), eval(""" /abc/::withFlag("g"; TRUE) """)) // 基本形でフラグを付与
        assertEquals(FluoriteRegex("abc", null), eval(""" /abc/g::withFlag("g"; FALSE) """)) // 基本形でフラグを除去

        assertEquals(FluoriteRegex("abc", "g"), eval(""" /abc/::withFlag("g") """)) // 第2引数省略で付与
        assertEquals(FluoriteRegex("abc", null), eval(""" /abc/g::withoutFlag("g") """)) // withoutFlagで除去
        assertEquals(FluoriteRegex("abc", "g"), eval(""" /abc/ + "g" """)) // +演算子で付与
        assertEquals(FluoriteRegex("abc", null), eval(""" /abc/g - "g" """)) // -演算子で除去

        assertEquals(FluoriteRegex("abc", "gi"), eval(""" /abc/gi::withFlag("g") """)) // 既にあるフラグの付与は結果を変えない
        assertEquals(FluoriteRegex("abc", "gi"), eval(""" /abc/gi::withoutFlag("m") """)) // 無いフラグの除去は結果を変えない

        assertEquals(FluoriteRegex("abc", "ig"), eval(""" /abc/i::withFlag("g") """)) // 正規化せず常に末尾に追記

        assertEquals(FluoriteRegex("abc", "gi"), eval(""" /abc/::withFlag("gi") """)) // 複数文字をまとめて付与
        assertEquals(FluoriteRegex("abc", "gi"), eval(""" /abc/g::withFlag("gi") """)) // 既存分は飛ばして残りのみ末尾に追記
        assertEquals(FluoriteRegex("abc", null), eval(""" /abc/gm::withoutFlag("gm") """)) // 複数文字をまとめて除去
        assertEquals(FluoriteRegex("abc", "g"), eval(""" /abc/ + "gi" - "i" """)) // 演算子でも複数文字が使える

        assertEquals(FluoriteNull, eval(""" /abc/g::withoutFlag("g").flags """)) // 全フラグを除去するとflagsはNULL

        assertFailsWith<FluoriteException> { eval(""" /abc/::withFlag("x") """) } // 不正フラグはエラー
        assertFailsWith<FluoriteException> { eval(""" /abc/::withoutFlag("x") """) } // 除去でも不正フラグはエラー
        assertFailsWith<FluoriteException> { eval(""" /abc/ + "x" """) } // +演算子でも不正フラグはエラー
        assertFailsWith<FluoriteException> { eval(""" /abc/g - "x" """) } // -演算子でも不正フラグはエラー

        assertFailsWith<FluoriteException> { eval(""" /abc/::withFlag() """) } // withFlagは引数不足でエラー
        assertFailsWith<FluoriteException> { eval(""" /abc/::withFlag("g"; TRUE; TRUE) """) } // withFlagは引数過多でエラー
        assertFailsWith<FluoriteException> { eval(""" /abc/::withoutFlag() """) } // withoutFlagは引数不足でエラー
        assertFailsWith<FluoriteException> { eval(""" /abc/::withoutFlag("g"; TRUE) """) } // withoutFlagは引数過多でエラー
    }

    @Test
    fun withFlagIdentity() = runTest {
        val withG = FluoriteRegex("abc", "g")
        assertSame(withG, withG.withFlag("g", true)) // 既に満たしていれば元のインスタンスをそのまま返す
        val withoutG = FluoriteRegex("abc", null)
        assertSame(withoutG, withoutG.withFlag("g", false)) // 既に満たしていれば元のインスタンスをそのまま返す
    }

}
