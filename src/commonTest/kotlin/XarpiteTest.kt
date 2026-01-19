import kotlinx.coroutines.ExperimentalCoroutinesApi
import kotlinx.coroutines.test.runTest
import mirrg.xarpite.UnsupportedIoContext
import mirrg.xarpite.compilers.objects.FluoriteNull
import mirrg.xarpite.mounts.createCommonMounts
import mirrg.xarpite.operations.FluoriteException
import mirrg.xarpite.test.array
import mirrg.xarpite.test.boolean
import mirrg.xarpite.test.double
import mirrg.xarpite.test.eval
import mirrg.xarpite.test.get
import mirrg.xarpite.test.int
import mirrg.xarpite.test.obj
import mirrg.xarpite.test.parse
import mirrg.xarpite.test.run
import mirrg.xarpite.test.stream
import mirrg.xarpite.test.string
import mirrg.xarpite.withEvaluator
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.fail

@OptIn(ExperimentalCoroutinesApi::class)
class XarpiteTest {

    @Test
    fun cacheTest() = runTest {
        // メモ化が行われているか
        assertEquals("a", eval(""" "$( "$( "$( "$( "$( "$( "$( "$( "$( "$( "a" )" )" )" )" )" )" )" )" )" )" """).string)
        assertEquals("a", eval(""" %><%= %><%= %><%= %><%= %><%= %><%= %>a<% %><% %><% %><% %><% %><% %><% """).string)
        assertEquals(1, eval("(((((((((1)))))))))").int)
        assertEquals("[[[[[[[[[1]]]]]]]]]", eval("&[[[[[[[[[1]]]]]]]]]").string)
        assertEquals("{a:{a:{a:{a:{a:{a:{a:{a:1}}}}}}}}", eval("&{a:{a:{a:{a:{a:{a:{a:{a:1}}}}}}}}").string)
        assertEquals(1, eval("a := x -> x; a(a(a(a(a(a(a(a(a(a(a(a(a(a(a(a(1))))))))))))))))").int)
        assertEquals(1, eval("1?1?1?1?1?1?1?1?1?1?1?1?1?1?1?1?1:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0").int)
        assertEquals(1, eval("0?0:0?0:0?0:0?0:0?0:0?0:0?0:0?0:0?0:0?0:0?0:0?0:0?0:0?0:0?0:0?0:1").int)
        assertEquals(1, eval("NULL?:NULL?:NULL?:NULL?:NULL?:NULL?:NULL?:NULL?:NULL?:NULL?:NULL?:NULL?:1").int)
        assertEquals("[0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;1]", eval("&[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1]").string)
        assertEquals("[0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;1]", eval("&[0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;1]").string)
    }

    @Test
    fun commentTest() = runTest {

        // 行コメントが書ける
        """
            [
                1
                2 # comment
                3
            ]
        """.let { assertEquals("[1;2;3]", eval(it).array()) }

        // // による行コメント
        """
            [
                1
                2 // comment
                3
            ]
        """.let { assertEquals("[1;2;3]", eval(it).array()) }

        // 行コメントの次の行に中置演算子としても解釈可能な前置演算子があったとしても、その行を結合しない
        """
            [
                1
                2 # comment
                -3
            ]
        """.let { assertEquals("[1;2;-3]", eval(it).array()) }
        """
            [
                1
                2 // comment
                -3
            ]
        """.let { assertEquals("[1;2;-3]", eval(it).array()) }

        // 行コメントの本文が空でもよい
        assertEquals(1, eval("1 #").int)
        assertEquals(1, eval("1 //").int)

        // 行コメントの後に改行が無くてもよい
        assertEquals(1, eval("1 # comment").int)
        assertEquals(1, eval("1 // comment").int)

        assertEquals("[1;2;3]", eval("[1, /* comment */2, 3]").array()) // ブロックコメントが書ける
        assertEquals("[1;2;3]", eval("[1, /**/2, 3]").array()) // ブロックコメントが空でもよい
        assertEquals("[1;2;3]", eval("[1, /* /* comment */ */2, 3]").array()) // ブロックコメントを入れ子にできる
        assertEquals("[1;2;3]", eval("/* comment */[1, 2, 3]").array()) // ブロックコメントの前に何もなくてもよい
        assertEquals("[1;2;3]", eval("[1, 2, 3]/* comment */").array()) // ブロックコメントの後に何もなくてもよい

        // ブロックコメントの途中に改行が入ってもよい
        """
            [
                1
                /*
                 * comment
                 */
                2
            ]
        """.let { assertEquals("[1;2]", eval(it).array()) }

    }

    @Test
    fun builtInConstantTest() = runTest {
        assertEquals(FluoriteNull, eval("NULL"))
        assertEquals(true, eval("TRUE").boolean)
        assertEquals(false, eval("FALSE").boolean)
        assertEquals(true, eval("LOOP ?= STREAM").boolean)
    }

    @Test
    fun numberTest() = runTest {
        assertEquals(1, eval("1").int) // 整数を記述できる
        assertEquals(0, eval("0").int) // 0も普通に書ける
        assertEquals(100, eval("00100").int) // 整数は先頭に余計な 0 があっても10進数として扱われる

        assertEquals(0x10, eval("H#10").int) // H# で16進数を記述できる
        assertEquals(-0x10, eval("-H#10").int) // 負の16進数
        assertEquals(0xabcdef, eval("H#abcdef").int) // 英字の16進数
        assertEquals(0xABCDEF, eval("H#ABCDEF").int) // 大文字の英字の16進数

        assertEquals(1.1, eval("1.1").double, 0.001) // 小数を記述できる
        assertEquals(0.0, eval("0.0").double) // 0.0も普通に書ける
        assertEquals(1.0, eval("1.0").double) // .0 を付けると浮動小数点数で整数値を得る
        assertEquals(100.0, eval("00100.00").double) // 小数も先頭と末尾に余計な 0 があっても10進数として扱われる

        assertEquals(-10, eval("-10").int) // 負の整数が書ける
        assertEquals(-1.1, eval("-1.1").double, 0.001) // 負の小数が書ける
    }

    @Test
    fun rawStringTest() = runTest {
        assertEquals("abcABC123", eval(" 'abcABC123' ").string) // ' で囲うと文字列になる

        // ASCII文字のテスト
        assertEquals(""" !"#$%& ()*+,-./""", eval(""" ' !"#$%& ()*+,-./' """).string) // ' はエスケープが必要
        assertEquals("""0123456789:;<=>?""", eval(""" '0123456789:;<=>?' """).string)
        assertEquals("""@ABCDEFGHIJKLMNO""", eval(""" '@ABCDEFGHIJKLMNO' """).string)
        assertEquals("""PQRSTUVWXYZ[\]^_""", eval(""" 'PQRSTUVWXYZ[\]^_' """).string) // \ すらもエスケープ不要
        assertEquals("""`abcdefghijklmno""", eval(""" '`abcdefghijklmno' """).string)
        assertEquals("""pqrstuvwxyz{|}~ """, eval(""" 'pqrstuvwxyz{|}~ ' """).string)

        assertEquals("あ", eval(" 'あ' ").string) // マルチバイト文字
        assertEquals("㎡", eval(" '㎡' ").string) // MS932
        assertEquals("🍰", eval(" '🍰' ").string) // サロゲートペア

        assertEquals(" ' ", eval(" ' '' ' ").string) // '' が ' になる

        assertEquals("\n \n \n", eval(" '\n \r \r\n' ").string) // 改行は \n に統一される
    }

    @Test
    fun templateStringTest() = runTest {
        assertEquals("abcABC123", eval(""" "abcABC123" """).string) // " で囲うと文字列になる

        // ASCII文字のテスト
        assertEquals(" ! # %&'()*+,-./", eval(""" " ! # %&'()*+,-./" """).string) // " $ はエスケープが必要
        assertEquals("0123456789:;<=>?", eval(""" "0123456789:;<=>?" """).string)
        assertEquals("@ABCDEFGHIJKLMNO", eval(""" "@ABCDEFGHIJKLMNO" """).string)
        assertEquals("PQRSTUVWXYZ[ ]^_", eval(""" "PQRSTUVWXYZ[ ]^_" """).string) // \ はエスケープが必要
        assertEquals("`abcdefghijklmno", eval(""" "`abcdefghijklmno" """).string)
        assertEquals("pqrstuvwxyz{|}~ ", eval(""" "pqrstuvwxyz{|}~ " """).string)

        assertEquals("あ", eval(""" "あ" """).string) // マルチバイト文字
        assertEquals("㎡", eval(""" "㎡" """).string) // MS932
        assertEquals("🍰", eval(""" "🍰" """).string) // サロゲートペア
        assertEquals("'", eval(""" "\x27" """).string) // 1バイト文字参照
        assertEquals("あ", eval(""" "\u3042" """).string) // 文字参照

        assertEquals(""" " $ \ """, eval(""" " \" \$ \\ " """).string) // エスケープが必要な記号
        assertEquals(" \r \n \t ", eval(""" " \r \n \t " """).string) // 制御文字のエスケープ

        assertEquals("10", eval(""" "$10" """).string) // 数値の埋め込み
        assertEquals("10", eval(""" (a -> "${'$'}a")(10) """).string) // 変数の埋め込み
        assertEquals("10", eval(""" "$(2 * 5)" """).string) // 式の埋め込み
        assertEquals(" abc ", eval(""" " $( "abc" ) " """).string) // 入れ子状の埋め込み

        assertEquals("\n \n \n", eval(""" "${"\n \r \r\n"}" """).string) // 改行は \n に統一される
    }

    @Test
    fun formatTest() = runTest {
        // %-+ 09d  空白埋め  0埋め  左揃え  符号表示  符号余白  変換

        // 整数
        run {
            val s = """123456, 12345, 123, 0, -123, -1234, -12345, -123456"""
            assertEquals("[123456;12345;123;0;-123;-1234;-12345;-123456]", eval(""" [$s | "$%d(_)"] """).array()) // %d で整数
            assertEquals("[123456;12345;  123;    0; -123;-1234;-12345;-123456]", eval(""" [$s | "$%5d(_)"] """).array()) // 空白埋め
            assertEquals("[123456;12345;00123;00000;-0123;-1234;-12345;-123456]", eval(""" [$s | "$%05d(_)"] """).array()) // 0埋め
            assertEquals("[123456;12345;123  ;0    ;-123 ;-1234;-12345;-123456]", eval(""" [$s | "$%-5d(_)"] """).array()) // 左揃え空白埋め
            assertEquals("[+123456;+12345;+123;+0;-123;-1234;-12345;-123456]", eval(""" [$s | "$%+d(_)"] """).array()) // 符号表示
            assertEquals("[ 123456; 12345; 123; 0;-123;-1234;-12345;-123456]", eval(""" [$s | "$% d(_)"] """).array()) // 符号余白
            assertEquals("[+123456;+12345; +123;   +0; -123;-1234;-12345;-123456]", eval(""" [$s | "$%+5d(_)"] """).array()) // 符号表示 空白埋め
            assertEquals("[ 123456; 12345;  123;    0; -123;-1234;-12345;-123456]", eval(""" [$s | "$% 5d(_)"] """).array()) // 符号余白 空白埋め
            assertEquals("[+123456;+12345;+0123;+0000;-0123;-1234;-12345;-123456]", eval(""" [$s | "$%+05d(_)"] """).array()) // 符号表示 0埋め
            assertEquals("[ 123456; 12345; 0123; 0000;-0123;-1234;-12345;-123456]", eval(""" [$s | "$% 05d(_)"] """).array()) // 符号余白 0埋め
        }

        // 16進数
        run {
            val s = """H#abcdef, H#abcde, H#abc, H#0, -H#abc, -H#abcd, -H#abcde, -H#abcdef"""
            assertEquals("[abcdef;abcde;abc;0;-abc;-abcd;-abcde;-abcdef]", eval(""" [$s | "$%x(_)"] """).array()) // %x で16進数
            assertEquals("[abcdef;abcde;  abc;    0; -abc;-abcd;-abcde;-abcdef]", eval(""" [$s | "$%5x(_)"] """).array()) // 空白埋め
            assertEquals("[abcdef;abcde;00abc;00000;-0abc;-abcd;-abcde;-abcdef]", eval(""" [$s | "$%05x(_)"] """).array()) // 0埋め
            assertEquals("[abcdef;abcde;abc  ;0    ;-abc ;-abcd;-abcde;-abcdef]", eval(""" [$s | "$%-5x(_)"] """).array()) // 左揃え空白埋め
            assertEquals("[+abcdef;+abcde;+abc;+0;-abc;-abcd;-abcde;-abcdef]", eval(""" [$s | "$%+x(_)"] """).array()) // 符号表示
            assertEquals("[ abcdef; abcde; abc; 0;-abc;-abcd;-abcde;-abcdef]", eval(""" [$s | "$% x(_)"] """).array()) // 符号余白
            assertEquals("[+abcdef;+abcde; +abc;   +0; -abc;-abcd;-abcde;-abcdef]", eval(""" [$s | "$%+5x(_)"] """).array()) // 符号表示 空白埋め
            assertEquals("[ abcdef; abcde;  abc;    0; -abc;-abcd;-abcde;-abcdef]", eval(""" [$s | "$% 5x(_)"] """).array()) // 符号余白 空白埋め
            assertEquals("[+abcdef;+abcde;+0abc;+0000;-0abc;-abcd;-abcde;-abcdef]", eval(""" [$s | "$%+05x(_)"] """).array()) // 符号表示 0埋め
            assertEquals("[ abcdef; abcde; 0abc; 0000;-0abc;-abcd;-abcde;-abcdef]", eval(""" [$s | "$% 05x(_)"] """).array()) // 符号余白 0埋め
        }

        // 小数
        run {
            assertEquals("1.5", eval(""" "$%f(1.5)" """).string) // 小数の埋め込み
            assertEquals("-1.5", eval(""" "$%f(-1.5)" """).string) // 負数
            assertEquals("0", eval(""" "$%f(0.0)" """).string) // 0
            assertEquals("1", eval(""" "$%f(1.0)" """).string) // 整数値は小数点以降が省略される
            assertEquals("0.5", eval(""" "$%f(0.5)" """).string) // 小数点の前は省略されない

            assertEquals("1.111", eval(""" "$%.3f(1.111222)" """).string) // 小数の切り詰め
            assertEquals("1.112", eval(""" "$%.3f(1.111777)" """).string) // 四捨五入をする
            assertEquals("1.112", eval(""" "$%.3f(1.111500)" """).string) // 真ん中は絶対値が大きい方に丸められる
            assertEquals("-1.112", eval(""" "$%.3f(-1.111500)" """).string) // 負の場合も絶対値が増える方向に丸められる
            assertEquals("100.000", eval(""" "$%.3f(99.999999)" """).string) // 丸めによって桁数が増える場合のテスト
            assertEquals("-100.000", eval(""" "$%.3f(-99.999999)" """).string) // 負の場合のテスト
            assertEquals("1.500", eval(""" "$%.3f(1.5)" """).string) // 小数の埋め合わせ
            assertEquals("1.111", eval(""" "$%.3f(1.111)" """).string) // 精度が丁度

            // 小数点以下0桁の場合、小数点も消える
            assertEquals("2", eval(""" "$%.0f(1.5)" """).string)
            assertEquals("1", eval(""" "$%.0f(1.0)" """).string)
            assertEquals("-2", eval(""" "$%.0f(-1.5)" """).string)
            assertEquals("-1", eval(""" "$%.0f(-1.0)" """).string)

            assertEquals("  1.5", eval(""" "$%5f(1.5)" """).string) // 空白埋め指定は全体の文字数に作用する
            assertEquals(" -1.5", eval(""" "$%5f(-1.5)" """).string) // 負の空白埋め
            assertEquals("12345.5", eval(""" "$%5f(12345.5)" """).string) // 空白埋めは文字数を切り詰めない
            assertEquals("1.5  ", eval(""" "$%-5f(1.5)" """).string) // 左詰め
            assertEquals("001.5", eval(""" "$%05f(1.5)" """).string) // 0埋め
            assertEquals("+01.5", eval(""" "$%+05f(1.5)" """).string) // +を表示
            assertEquals(" 01.5", eval(""" "$% 05f(1.5)" """).string) // 符号用余白
            assertEquals("1.000", eval(""" "$%.3f(1.0)" """).string) // もともと小数点が含まれず、精度が1以上

            assertEquals("-01.5", eval(""" "$%05f(-1.5)" """).string) // 負の0埋めは符号を先に書く
            assertEquals(" 01.5", eval(""" "$% 05f(1.5)" """).string) // 0埋めでも符号用の余白は空白を書く

            // 小数点なし左詰め0埋めは数学的に矛盾した挙動を示す
            assertEquals("10000", eval(""" "$%-05.0f(1.0)" """).string)
            assertEquals("20000", eval(""" "$%-05.0f(1.5)" """).string)

            assertEquals("  1.123", eval(""" "$%7.3f(1.123456)" """).string) // 空白埋めかつ精度指定
        }

        // 文字列
        run {
            val s = """ "", "abcd", "abcde", "abcdef" """
            assertEquals("[;abcd;abcde;abcdef]", eval(""" [$s | "$%s(_)"] """).array()) // %s で文字列
            assertEquals("[     ; abcd;abcde;abcdef]", eval(""" [$s | "$%5s(_)"] """).array()) // 空白埋め
            assertEquals("[     ;abcd ;abcde;abcdef]", eval(""" [$s | "$%-5s(_)"] """).array()) // 左揃え空白埋め
        }
    }

    @Test
    fun embeddedStringTest() = runTest {
        assertEquals("abcABC123", eval(" %>abcABC123<% ").string) // %> <% で囲うと文字列になる

        // ASCII文字のテスト
        assertEquals(""" !"#$%&'()*+,-./""", eval(""" %> !"#$%&'()*+,-./<% """).string) // すべての文字はエスケープ不要
        assertEquals("""0123456789:;<=>?""", eval(""" %>0123456789:;<=>?<% """).string)
        assertEquals("""@ABCDEFGHIJKLMNO""", eval(""" %>@ABCDEFGHIJKLMNO<% """).string)
        assertEquals("""PQRSTUVWXYZ[\]^_""", eval(""" %>PQRSTUVWXYZ[\]^_<% """).string) // \ もエスケープ不要
        assertEquals("""`abcdefghijklmno""", eval(""" %>`abcdefghijklmno<% """).string)
        assertEquals("""pqrstuvwxyz{|}~ """, eval(""" %>pqrstuvwxyz{|}~ <% """).string)

        assertEquals("あ", eval(" %>あ<% ").string) // マルチバイト文字
        assertEquals("㎡", eval(" %>㎡<% ").string) // MS932
        assertEquals("🍰", eval(" %>🍰<% ").string) // サロゲートペア

        assertEquals(" <% ", eval(" %> <%% <%").string) // <%% で <% になる

        assertEquals(" 10 ", eval(" %> <%= 1 < 2 ? 10 : 100 %> <% ").string) // 式の埋め込み
        assertEquals(" abc ", eval(" %> <%= %>abc<% %> <% ").string) // 入れ子状の埋め込み

        assertEquals("_30_10_10", eval(" a := 10; b := %>_<%= (a := 20; a = 30; a) %>_<%= a %>_<%; b & a ").string) // expressionは置けない

        assertEquals("\n \n \n", eval(" %>\n \r \r\n<% ").string) // 改行は \n に統一される

        """
             %> <%=
                 123
             %> <%
        """.let { assertEquals("123", eval(it).string.trim()) } // <%= の後で改行しても正しくパースされる

    }

    @Test
    fun bracketsTest() = runTest {
        assertEquals(1, eval("(1)").int) // ( ) で囲うと中身をそのまま得られる
        assertEquals(FluoriteNull, eval("()")) // () でNULLになる
        assertEquals("", eval("(,)").stream()) // (,) で空ストリームになる
    }

    @Test
    fun toNumberTest() = runTest {
        // + で数値になる

        assertEquals(0, eval("+NULL").int) // NULLは0

        // 文字列の数値化
        assertEquals(123, eval("+'123'").int)
        assertEquals(123.456, eval("+'123.456'").double, 0.001)

        assertEquals(1, eval("+TRUE").int) // TRUEは1
        assertEquals(0, eval("+FALSE").int) // FALSEは0

        assertEquals(1, eval("+1").int) // 整数はそのまま
        assertEquals(1.0, eval("+1.0").double, 0.001) // 小数もそのまま

        assertEquals(55, eval("+(1 .. 10)").int) // ストリームは各要素の合計
        assertEquals(6, eval("+('1', '2', '3')").int) // ストリームは各要素の数値化の合計
        assertEquals(10, eval("+('10')").int) // 1要素のストリームはそれの数値化
        assertEquals(0, eval("+(,)").int) // 空ストリームはINTの0


        assertEquals(123, eval("+{`+_`: this -> 123}{}").int) // オブジェクトの数値化はTO_NUMBERメソッドでオーバーライドできる
    }

    @Test
    fun toBooleanTest() = runTest {
        // ? で論理値になる

        assertEquals(false, eval("?NULL").boolean) // NULLはFALSE

        assertEquals(false, eval("?FALSE").boolean) // FALSEはFALSE

        assertEquals(true, eval("?1").boolean) // 0以外であればTRUE
        assertEquals(false, eval("?0").boolean) // 0はFALSE
        assertEquals(true, eval("?-1").boolean) // 負の数もTRUE

        assertEquals(true, eval("?1.0").boolean) // 0.0以外であればTRUE
        assertEquals(false, eval("?0.0").boolean) // 0.0はFALSE
        assertEquals(true, eval("?-1.0").boolean) // 負の数もTRUE

        assertEquals(true, eval("?TRUE").boolean) // TRUEはTRUE
        assertEquals(false, eval("?FALSE").boolean) // FALSEはFALSE

        assertEquals(true, eval("?'0'").boolean) // '' 以外であればTRUE
        assertEquals(false, eval("?''").boolean) // '' はFALSE
        assertEquals(true, eval("?'FALSE'").boolean) // 'FALSE' もTRUE
        assertEquals(true, eval("?'false'").boolean) // 'false' もTRUE

        assertEquals(false, eval("?(FALSE, FALSE, FALSE)").boolean) // ストリームは各要素のORを取る
        assertEquals(true, eval("?(FALSE, TRUE, FALSE)").boolean) // 1個でもTRUEがあればTRUE
        assertEquals(false, eval("?EMPTY").boolean) // 空ストリームはFALSE


        assertEquals(false, eval("!TRUE").boolean) // TRUEはFALSE
        assertEquals(true, eval("!FALSE").boolean) // FALSEはTRUE
        assertEquals(true, eval("!0").boolean) // ! も論理値に自動変換される


        assertEquals(false, eval("?[]").boolean) // 空配列の論理値化はFALSE
        assertEquals(true, eval("?[NULL]").boolean) // 要素がある配列の論理値化はTRUE
        assertEquals(false, eval("?{}").boolean) // 空オブジェクトの論理値化はFALSE
        assertEquals(true, eval("?{a: 1}").boolean) // 要素があるオブジェクトの論理値化はTRUE
        assertEquals(true, eval("?{`?_`: this -> TRUE}{}").boolean) // `?_` メソッドでオーバーライドできる
        assertEquals(true, eval("TRUE::`?_`()").boolean) // 論理値に対しても `?_` が呼び出せる
    }

    @Test
    fun rightTest() {
        assertEquals("ToNumberGetter[LiteralGetter[100]]", parse("100.+"))

        assertEquals(parse("+100"), parse("100.+"))
        assertEquals(parse("-100"), parse("100.-"))
        assertEquals(parse("?100"), parse("100.?"))
        assertEquals(parse("!100"), parse("100.!"))
        assertEquals(parse("&100"), parse("100.&"))
        assertEquals(parse("$#100"), parse("100.$#"))
        assertEquals(parse("$&100"), parse("100.$&"))
        assertEquals(parse("$*100"), parse("100.$*"))

        assertEquals(parse("-+100"), parse("100.+.-"))
    }

    @Test
    fun toStringTest() = runTest {
        // & で文字列になる
        assertEquals("NULL", eval("&NULL").string)
        assertEquals("10", eval("&10").string)
        assertEquals("TRUE", eval("&TRUE").string)
        assertEquals("FALSE", eval("&FALSE").string)
        assertEquals("abc", eval("&'abc'").string)
        assertEquals("[1;2;3]", eval("&[1, 2, 3]").string)
        assertEquals("{a:1;b:2}", eval("&{a: 1; b: 2}").string)

        assertEquals("10", eval("&{`&_`: this -> &this.a}{a: 10}").string) // 文字列化のオーバーライド

        assertEquals("[1;2;3]", eval("&[1;2;3]").string) // 配列の文字列化
        assertEquals("{a:1;b:2}", eval("&{a:1;b:2}").string) // オブジェクトの文字列化
    }

    @Test
    fun exceptionTest() = runTest {
        // !! でオブジェクトをスローするとFluoriteExceptionになって出てくる
        try {
            eval("!!'a'")
            fail()
        } catch (e: FluoriteException) {
            assertEquals("a", e.value.string)
        }

        assertEquals("b", eval("(!!'a') !? 'b'").string) // !? で例外をキャッチできる
        assertEquals("b", eval("1 + [2 + !!'a'] !? 'b'").string) // !! は深い階層にあってもよい
        assertEquals("a", eval("(!!'a') !? (e => e)").string) // => でスローされた値を受け取れる
        assertEquals(1, eval("a := 1; 1 !? (a = 2); a").int) // !? の右辺は実行されなければ評価自体が行われない

        // !? は左辺のストリームをキャッシュする（副作用が1度だけ生じる）
        // ストリームが複数回消費された場合でも、副作用は1回のみ
        """
            count := 0
            stream := (
                1 .. 3 | (
                    count = count + 1
                    count
                )
            ) !? "error"
            [[stream], [stream], [stream], count]
        """.let { assertEquals("[[1;2;3];[1;2;3];[1;2;3];3]", eval(it).array()) }

        // ストリームが消費されない場合でも副作用は発生する
        """
            count := 0
            stream := (
                1 .. 3 | (
                    count = count + 1
                    count
                )
            ) !? "error"
            count
        """.let { assertEquals(3, eval(it).int) }
    }

    @Test
    fun accessTest() = runTest {
        assertEquals("b", eval(" 'abc'.1 ").string) // 文字列に数値アクセスするとそのインデックスの文字を得る
        assertEquals(FluoriteNull, eval(" 'abc'.(-1) ")) // 負のインデックスは無効
        assertEquals(FluoriteNull, eval(" 'abc'.3 ")) // 文字列の範囲外にアクセスすると NULL が返る
        assertEquals("c", eval(" 'abc'.(1 + 1) ").string) // キーを ( ) で囲むと式で参照できる

        assertEquals(20, eval(" [10, 20, 30].1 ").int) // 配列に数値アクセスするとそのインデックスの要素を得る
        assertEquals(FluoriteNull, eval(" [10, 20, 30].(-1) ")) // 負のインデックスは無効
        assertEquals(FluoriteNull, eval(" [10, 20, 30].3 ")) // 配列の範囲外にアクセスすると NULL が返る
        assertEquals(30, eval(" [10, 20, 30].(1 + 1) ").int) // キーを ( ) で囲むと式で参照できる

        assertEquals(10, eval(" {a: 10; b: 20}.a ").int) // オブジェクトに識別子アクセスするとその要素を得る
        assertEquals(10, eval(" {a: 10; b: 20}.'a' ").int) // キーは文字列リテラルでもよい
        assertEquals(FluoriteNull, eval(" {a: 10; b: 20}.c ")) // 存在しない要素にアクセスすると NULL が返る
        assertEquals(20, eval(" 'b' | a => {a: 10; b: 20}.(a) ").int) // キーを ( ) で囲むと式で参照できる
    }

    @Test
    fun bracketsAccessTest() = runTest {
        assertEquals("[a;1],[b;2],[c;3]", eval("{a: 1; b: 2; c: 3}()").stream()) // object() でエントリーのストリームにする
        assertEquals(2, eval("{a: 1; b: 2; c: 3}('b')").int) // object(key) で要素を得る
        assertEquals("3,3,1,2", eval("{a: 1; b: 2; c: 3}('c', 'c', 'a', 'b')").stream()) // object(keys) で要素のストリームを得る

        assertEquals("a,b,c", eval("'abc'()").stream()) // string() で文字のストリームにする
        assertEquals("b", eval("'abc'(1)").string) // string(index) で文字を得る
        assertEquals("c", eval("'abc'(-1)").string) // 負のインデックスは後ろから数える
        assertEquals("c,c,a,b", eval("'abc'(2, 2, 0, 1)").stream()) // string(indices) で文字のストリームを得る
    }

    @Test
    fun invokeTest() = runTest {
        assertEquals(123, eval("(a -> a + 23)(100)").int) // function() で関数を呼び出せる
        assertEquals(123, eval("(a -> a + 23)::`_(__)`(100)").int) // INVOKEメソッドでも関数を呼び出せる
        assertEquals(123, eval("{`_(__)`: this, a, b -> a + b + 3}{}(100; 20)").int) // INVOKEメソッドを定義したオブジェクトも関数として呼び出せる
        assertEquals(123, eval("{`_(__)`: this, a, b -> a + b + 3}{}[100](20)").int) // INVOKEメソッドを定義したオブジェクトも部分適用できる
        assertEquals(123, eval("{`_(__)`: {`_(__)`: this2, this1, a, b -> a + b}{}}{}(100; 23)").int) // INVOKEの多重追跡
    }

    @Test
    fun powTest() = runTest {
        assertEquals(16.0, eval("4 ^ 2").double, 0.00001) // ^ でべき乗ができる、べき乗すると常に浮動小数点数になる

        // ^ は右優先結合
        assertEquals("PowerGetter[LiteralGetter[1];PowerGetter[LiteralGetter[2];LiteralGetter[3]]]", parse("1 ^ 2 ^ 3"))
        assertEquals(256.0, eval("2 ^ 2 ^ 3").double, 0.00001)
        assertEquals(64.0, eval("(2 ^ 2) ^ 3").double, 0.00001)

        // ^ は乗算よりも優先される
        assertEquals("TimesGetter[TimesGetter[LiteralGetter[1];PowerGetter[LiteralGetter[2];LiteralGetter[3]]];LiteralGetter[4]]", parse("1 * 2 ^ 3 * 4"))
        assertEquals(280.0, eval("5 * 2 ^ 3 * 7").double, 0.00001)

        // ^ は前置演算子よりも優先される
        assertEquals("ToNegativeNumberGetter[PowerGetter[LiteralGetter[1];LiteralGetter[2]]]", parse("- 1 ^ 2"))
        assertEquals(-16.0, eval("- 4 ^ 2").double, 0.00001)

        // ^ の右に前置演算子があってもよい
        assertEquals(0.0625, eval("4 ^ - 2").double, 0.00001)

        assertEquals(432.0, eval("- 2 * - 2 ^ - - 3 * - 3 ^ - - 2 * - 3").double, 0.00001) // 複合的なテスト
    }

    @Test
    fun timesTest() = runTest {
        assertEquals(6, eval("2 * 3").int) // * で乗算ができる

        // どちらかが浮動小数点数なら結果も浮動小数点数になる
        assertEquals(6.0, eval("2.0 * 3").double, 0.001)
        assertEquals(6.0, eval("2 * 3.0").double, 0.001)
        assertEquals(6.0, eval("2.0 * 3.0").double, 0.001)

        assertEquals("abcabcabc", eval("'abc' * 3").string) // 文字列の乗算は繰り返す
        assertEquals("[1;2;3;1;2;3;1;2;3]", eval("[1; 2; 3] * 3").array()) // 配列の乗算は繰り返す
    }

    @Test
    fun modTest() = runTest {
        assertEquals(1, eval("10 % 3").int) // % で余りを得る
        assertEquals(0.25, eval("1.75 % 0.5").double) // 浮動小数点数でもよい
        assertEquals(0.5, eval("2 % 0.75").double) // 右側だけが浮動小数点数でもよい
        assertEquals(0.25, eval("10.25 % 5").double) // 左側だけが浮動小数点数でもよい

        // 負の余りは正になるまで割る数を足したものの余りと同じ（-1 + 3 = 2） % 3
        // そのため同じ余りがループする
        assertEquals("[0;1;2;3;4;0;1;2;3;4;0;1;2;3;4;0;1;2;3;4;0]", eval("&[-10 .. 10 | _ % 5]").string)

        assertEquals(false, eval("10 %% 3").boolean) // %% は割り切れる場合にTRUE
        assertEquals(true, eval("10 %% 2").boolean) // %% は割り切れない場合にFALSE
        assertEquals(true, eval("-3 %% 3").boolean) // %% も負に対応
        assertEquals(true, eval("10.0 %% 2.0").boolean) // 浮動小数点数として表現されていてもよい
        assertEquals(true, eval("1.75 %% 0.25").boolean) // 2進数で割り切れるのであれば小数でもよい
        assertEquals(true, eval("25 %% 0.25").boolean) // 右側だけが浮動小数点数でもよい
        assertEquals(true, eval("25.0 %% 5").boolean) // 左側だけが浮動小数点数でもよい

        assertEquals(true, eval("7 !%% 4").boolean) // !%% は割り切れない場合にTRUE
        assertEquals(false, eval("10 !%% 2").boolean) // !%% は割り切れる場合にFALSE
        assertEquals(false, eval("-3 !%% 3").boolean) // !%% も負に対応
        assertEquals(false, eval("10.0 !%% 2.0").boolean) // 浮動小数点数として表現されていてもよい
        assertEquals(false, eval("1.75 !%% 0.25").boolean) // 2進数で割り切れるのであれば小数でもよい
        assertEquals(true, eval("1.75 !%% 0.5").boolean) // 割り切れない場合
        assertEquals(true, eval("7 !%% 4").boolean) // !%% は !(x %% y) と等価
        assertEquals(eval("!(7 %% 4)").boolean, eval("7 !%% 4").boolean) // !%% と !(x %% y) は同じ結果
    }

    @Test
    fun rangeTest() = runTest {
        assertEquals("1,2,3,4", eval("1 .. 4").stream()) // .. でその範囲をイテレートするストリームを得る
        assertEquals("0,1,2,3", eval("0 .. 4 - 1").stream()) // 項は0や四則演算等でもよい
        assertEquals("1", eval("1 .. 1").stream()) // 範囲が1つの要素の場合はその要素のみのストリームを返す
        assertEquals("-1,0,1", eval("-1 .. 1").stream()) // 項は前置演算子がついていたり、負の値でもよいし、正負をまたいでもよい
        assertEquals("[1;2;3;4],[1;2;3;4]", eval("a := 1 .. 4; [a], [a]").stream()) // 範囲ストリームは再利用できる
        assertEquals("4,3,2,1", eval("4 .. 1").stream()) // 下降も可能

        assertEquals("1,2,3", eval("1 ~ 4").stream()) // 半開区間演算子は終端を含まない
        assertEquals("", eval("1 ~ 1").stream()) // 範囲が一つの場合は空ストリームになる
        assertEquals("[1;2;3],[1;2;3]", eval("a := 1 ~ 4; [a], [a]").stream()) // 再利用のテスト
        assertEquals("", eval("4 ~ 1").stream()) // 右辺が左辺より小さい場合は空ストリームになる
    }

    @Test
    fun compareTest() = runTest {
        fun String.f() = this.replace(" ", "")

        // 比較ができる
        assertEquals("[FALSE;FALSE;TRUE ]".f(), eval("[0 >  1; 1 >  1; 2 >  1]").array())
        assertEquals("[TRUE ;FALSE;FALSE]".f(), eval("[0 <  1; 1 <  1; 2 <  1]").array())
        assertEquals("[FALSE;TRUE ;TRUE ]".f(), eval("[0 >= 1; 1 >= 1; 2 >= 1]").array())
        assertEquals("[TRUE ;TRUE ;FALSE]".f(), eval("[0 <= 1; 1 <= 1; 2 <= 1]").array())

        // 浮動小数でもよい
        assertEquals("[FALSE;FALSE;FALSE]".f(), eval("[1 >  1.0; 1.0 >  1; 1.0 >  1.0]").array())
        assertEquals("[FALSE;FALSE;FALSE]".f(), eval("[1 <  1.0; 1.0 <  1; 1.0 <  1.0]").array())
        assertEquals("[TRUE ;TRUE ;TRUE ]".f(), eval("[1 >= 1.0; 1.0 >= 1; 1.0 >= 1.0]").array())
        assertEquals("[TRUE ;TRUE ;TRUE ]".f(), eval("[1 <= 1.0; 1.0 <= 1; 1.0 <= 1.0]").array())

        // 比較のオーバーライド
        """
            LengthComparing := {
                `_<=>_`: this, other -> $#this.string <=> $#other.string
            }
            z := LengthComparing{string: "z"}
            a := LengthComparing{string: "a"}
            aaa := LengthComparing{string: "aaa"}
            [
                z > a,
                z < a,
                z >= a,
                z <= a,
                z > aaa,
                z < aaa,
                z >= aaa,
                z <= aaa,
            ]
        """.let { assertEquals("[FALSE;FALSE;TRUE;TRUE;FALSE;TRUE;FALSE;TRUE]", eval(it).array()) }
    }

    @Test
    fun containsTest() = runTest {
        // string @ string で部分一致
        assertEquals(true, eval("'abc' @ '---abc---'").boolean)
        assertEquals(false, eval("'123' @ '---abc---'").boolean)

        // value @ array で要素が含まれているかどうか
        assertEquals(true, eval("30 @ [10, 20, 30]").boolean)
        assertEquals(false, eval("40 @ [10, 20, 30]").boolean)

        // key @ object で要素が含まれているかどうか
        assertEquals(true, eval("'a' @ {a: 10; b: 20}").boolean)
        assertEquals(false, eval("'c' @ {a: 10; b: 20}").boolean)

        // CONTAINSメソッドで上書きできる
        assertEquals(true, eval("'abc' @ {`_@_`: this, value -> value @ '---abc---'}{}").boolean)
        assertEquals(false, eval("'123' @ {`_@_`: this, value -> value @ '---abc---'}{}").boolean)
    }

    @Test
    fun notContainsTest() = runTest {
        // string !@ string で部分一致しないことを確認
        assertEquals(false, eval("'bcd' !@ 'abcde'").boolean)
        assertEquals(true, eval("'123' !@ 'abcde'").boolean)

        // value !@ array で要素が含まれていないことを確認
        assertEquals(false, eval("30 !@ [10, 20, 30]").boolean)
        assertEquals(true, eval("40 !@ [10, 20, 30]").boolean)

        // key !@ object でキーが含まれていないことを確認
        assertEquals(false, eval("'a' !@ {a: 10; b: 20}").boolean)
        assertEquals(true, eval("'c' !@ {a: 10; b: 20}").boolean)

        // !(left @ right) と等価であることを確認
        assertEquals(true, eval("!('abc' @ '---abc---') == ('abc' !@ '---abc---')").boolean)
        assertEquals(true, eval("!('123' @ '---abc---') == ('123' !@ '---abc---')").boolean)
    }

    @Test
    fun andOrTest() = runTest {
        // && は左辺がTRUEの場合に右辺を、 || は左辺がFALSEの場合に右辺を返す
        assertEquals(0, eval("0 && 2").int)
        assertEquals(2, eval("1 && 2").int)
        assertEquals(2, eval("0 || 2").int)
        assertEquals(1, eval("1 || 2").int)

        // 評価されない右辺は副作用も発生させない
        assertEquals(1, eval("a := 1; 1 || (a = 2); a").int)
        assertEquals(1, eval("a := 1; 0 && (a = 2); a").int)

        // 結合優先度のテスト
        assertEquals(true, eval("1 < 2 && 1 < 2").boolean)
        assertEquals(false, eval("1 < 2 && 2 < 1").boolean)
        assertEquals(false, eval("2 < 1 && 1 < 2").boolean)
        assertEquals(false, eval("2 < 1 && 2 < 1").boolean)
        assertEquals(true, eval("1 < 2 || 1 < 2").boolean)
        assertEquals(true, eval("1 < 2 || 2 < 1").boolean)
        assertEquals(true, eval("2 < 1 || 1 < 2").boolean)
        assertEquals(false, eval("2 < 1 || 2 < 1").boolean)
        assertEquals(1, eval("0 && 0 || 1").int)
        assertEquals(0, eval("0 && (0 || 1)").int)
        assertEquals(1, eval("1 || 0 && 0").int)
        assertEquals(0, eval("(1 || 0) && 0").int)
    }

    @Test
    fun conditionTest() = runTest {
        // ? : で条件分岐ができる
        assertEquals(1, eval("TRUE ? 1 : 2").int)
        assertEquals(2, eval("FALSE ? 1 : 2").int)

        // ? : を入れ子にすると右側が優先的にくっつく
        assertEquals(1, eval("TRUE ? TRUE ? 1 : 2 : TRUE ? 3 : 4").int)
        assertEquals(2, eval("TRUE ? FALSE ? 1 : 2 : FALSE ? 3 : 4").int)
        assertEquals(3, eval("FALSE ? TRUE ? 1 : 2 : TRUE ? 3 : 4").int)
        assertEquals(4, eval("FALSE ? FALSE ? 1 : 2 : FALSE ? 3 : 4").int)

        assertEquals(1, eval("1 ?: 2").int) // ?: の左辺が非NULLの場合、左辺を得る
        assertEquals(2, eval("NULL ?: 2").int) // ?: の左辺がNULLの場合、右辺を得る
        assertEquals(false, eval("FALSE ?: 2").boolean) // FALSEは非NULLである

        // 三項演算子とエルビス演算子は混ぜて書ける
        assertEquals(1, eval("TRUE ? 1 ?: 2 : 3 ?: 4").int)
        assertEquals(2, eval("TRUE ? NULL ?: 2 : NULL ?: 4").int)
        assertEquals(3, eval("FALSE ? 1 ?: 2 : 3 ?: 4").int)
        assertEquals(4, eval("FALSE ? NULL ?: 2 : NULL ?: 4").int)

        assertEquals(4, eval("FALSE ? 1 : NULL ?: FALSE ? 3 : 4").int) // == FALSE ? 1 : (NULL ?: (FALSE ? 3 : 4))

        // 条件項は `?_` で論理値に変換される
        assertEquals(1, eval("{`?_`: _ -> TRUE}{} ? 1 : 2").int)
        assertEquals(2, eval("{`?_`: _ -> FALSE}{} ? 1 : 2").int)

        // 評価されない項は副作用も起こさない
        assertEquals(2, eval("a := 1; TRUE ? (a = 2) : 0; a").int)
        assertEquals(1, eval("a := 1; FALSE ? (a = 2) : 0; a").int)
        assertEquals(1, eval("a := 1; TRUE ? 0 : (a = 2); a").int)
        assertEquals(2, eval("a := 1; FALSE ? 0 : (a = 2); a").int)
        assertEquals(2, eval("a := 1; NULL ?: (a = 2); a").int)
        assertEquals(1, eval("a := 1; 0 ?: (a = 2); a").int)
    }

    @Test
    fun pipeTest() = runTest {
        // パイプ
        assertEquals("10,20,30", eval("1 .. 3 | _ * 10").stream()) // 左辺のストリームを変換する
        assertEquals(10, eval("1 | _ * 10").int) // 左辺が非ストリームなら、出力をストリームで梱包しない
        assertEquals("", eval("(,) | _ * 10").stream()) // 左辺が空ストリームなら、出力も空ストリームになる

        // 実行パイプ
        assertEquals("1:2:3", eval(""" 1, 2, 3 >> JOIN[":"] """).string) // >> で右辺の関数に左辺を適用する
        assertEquals(10.0, eval("100 >> SQRT").double, 0.001) // 右辺は非ストリーム用の関数でもよい
        assertEquals(20, eval("10 >> x -> x * 2").int) // 右辺はラムダでもよい

        // 左実行パイプ
        assertEquals("1:2:3", eval(""" JOIN[":"] << 1, 2, 3 """).string) // << は左右が逆になっただけだが、結合優先度が代入と同等
        assertEquals(2.0, eval(""" SQRT << SQRT << 16 """).double, 0.001) // << を並べると、右から左に実行される

        // パイプの連結
        assertEquals("55:33:11", eval(""" JOIN[":"] << 1 .. 5 >> FILTER[x -> !(x %% 2)] | _ & _ >> REVERSE """).string)

        // パイプと代入系演算子は相互に右優先結合だが、パイプ同士の連結部分だけは左優先結合になる
        assertEquals("1-21-2", eval("x := 0; f := s -> s >> SPLIT[','] >> JOIN['-'] | x = _ | _ * 2; f('1,2'); x").string)

        // パイプと引数指定演算子との組み合わせ
        assertEquals("10-20-30", eval(""" 1 .. 3 | x => x * 10 >> JOIN["-"] """).string)

        // パイプを多段にしても前の段の引数が見える
        assertEquals("14,15,16,24,25,26,34,35,36", eval("1 .. 3 | x => 4 .. 6 | y => x & y").stream())

        // パイプと実行パイプの組み合わせ
        assertEquals(4, eval("1 | _ + 2 | _ * 3 >> SQRT | _ + 5 | _ + 8 >> SQRT >> FLOOR").int)
        assertEquals("18:19:28:29", eval("f := () -> '1-2' >> SPLIT['-'] | x => 8, 9 | y => x & y >> a -> JOIN(':'; a); f()").string)
    }

    @Test
    fun builtInClassTest() = runTest {
        // 各クラスのtrue判定
        assertEquals(true, eval("1 ?= VALUE").boolean)
        assertEquals(true, eval("NULL ?= NULL_CLASS").boolean)
        assertEquals(true, eval("1 ?= INT").boolean)
        assertEquals(true, eval("1.2 ?= DOUBLE").boolean)
        assertEquals(true, eval("TRUE ?= BOOLEAN").boolean)
        assertEquals(true, eval("'a' ?= STRING").boolean)
        assertEquals(true, eval("[1] ?= ARRAY").boolean)
        assertEquals(true, eval("{a: 1} ?= OBJECT").boolean)
        assertEquals(true, eval("(a -> 1) ?= FUNCTION").boolean)
        assertEquals(true, eval("(1, 2) ?= STREAM").boolean)

        // falseテスト
        assertEquals(false, eval("'10' ?= INT").boolean)
        assertEquals(false, eval("10 ?= STRING").boolean)
        assertEquals(false, eval("(1, 2) ?= ARRAY").boolean)
        assertEquals(false, eval("1.2 ?= INT").boolean)
        assertEquals(false, eval("1 ?= DOUBLE").boolean)
    }

    @Test
    fun variableTest() = runTest {
        assertEquals(10, eval("a := 10; a").int) // := で変数を定義できる
        assertEquals(20, eval("a := 10; a = 20; a").int) // = で既存の変数に代入できる
        assertEquals(10, eval("a := 10; (a := 20; a = 30); a").int) // 変数は ( ) の外部に伝搬しない
    }

    @Test
    fun methodTest() = runTest {
        assertEquals(10, eval("{method: () -> 10}{}::method()").int) // a::b() でaのbを呼び出せる
        assertEquals(10, eval("{method: this -> this.a}{a: 10}::method()").int) // メソッド関数は最初の引数にthisを受け取る
        assertEquals(20, eval("{method: this, b -> this.a * b}{a: 10}::method(2)").int) // 2個目以降の引数にメソッド呼び出し時の引数を受け取る

        assertEquals("10", eval("10::`&_`()").string) // 組み込みメソッドの呼び出し

        assertEquals(10, eval("A := {m: _ -> _.v}; a := A {v: 10}; a::m()").int) // メソッドの継承

        assertEquals("{&_:1}", eval("&{`&_`: 1}").string) // オブジェクトキーがメソッド名と衝突する場合でもオーバーライドしない

        assertEquals(6, eval("mul := a, b -> a * b; 2::(mul)(3)").int) // 関数へのメソッド呼び出し
        assertEquals(6, eval("2::(a, b -> a * b)(3)").int) // ラムダ式を使った関数へのメソッド呼び出し
    }

    @Test
    fun methodReferenceTest() = runTest {
        assertEquals(123, eval("({m: this, y -> this.x + y + 3}{x: 100}::m)(20)").int) // メソッド参照

        // メソッド参照を使った左実行パイプ
        """
            out := []
            out::push << "1"
            out::push << "a"
            out
        """.let { assertEquals("[1;a]", eval(it).array()) }

        assertEquals(6, eval("mul := a, b -> a * b; f := 2::(mul); f(3)").int) // 関数へのメソッド参照
    }

    @Test
    fun nullSafeTest() = runTest {
        assertEquals("1,NULL,3", eval("{v:1},NULL,{v:3}|_?.v").stream()) // Null安全要素アクセス
        assertEquals("1,NULL,3", eval("{m:_->1}{},NULL,{m:_->3}{}|_?::m()").stream()) // Null安全メソッド呼び出し
        assertEquals("1,NULL,3", eval("{m:_->1}{},NULL,{m:_->3}{}|_?::m[]()").stream()) // Null安全メソッド部分適用
        assertEquals("1,NULL,3", eval("{m:_->1}{},NULL,{m:_->3}{}|(_?::m)()").stream()) // Null安全メソッド参照
        assertEquals("1,NULL,3", eval("m:=_->_.x;{x:1},NULL,{x:3}|_?::(m)()").stream()) // 関数へのNull安全メソッド呼び出し
        assertEquals("1,NULL,3", eval("m:=_->_.x;{x:1},NULL,{x:3}|_?::(m)[]()").stream()) // 関数へのNull安全メソッド部分適用
        assertEquals("1,NULL,3", eval("m:=_->_.x;{x:1},NULL,{x:3}|(_?::(m))()").stream()) // 関数へのNull安全メソッド参照
    }

    @Test
    fun runnerTest() = runTest {
        assertEquals(55, eval("x := 0; 1 .. 10 | x = x + _; x").int) // runner部分がストリームの式だった場合、イテレーションはする
    }

    @Test
    fun rootTest() = runTest {
        assertEquals(10, eval("10").int) // 式を書ける
        assertEquals(20, eval("10; 20").int) // ; で区切ると左は式文になり、右が使われる
        assertEquals(20, eval("10\n20").int) // 改行で区切ってもよい
        assertEquals(FluoriteNull, eval("10;")) // 式を省略した場合、NULLになる
        assertEquals(10, eval("10\n").int) // 式の前後に余計な改行があっても無視される
        assertEquals(FluoriteNull, eval("10;\n")) // ; の後に改行があった場合もNULLになる
        assertEquals(30, eval("10; 20; 30").int) // ; が複数あってもよい
        assertEquals(20, eval("; 10; ; 20").int) // ; の左は省略されていてもよい
        assertEquals(20, eval("\n\n;;\n\n10\n\n;;\n\n;;\n\n20\n\n").int) // 改行と;が無駄に大量にあってもよい
        assertEquals(FluoriteNull, eval("")) // 何も書かない場合、NULLになる
        assertEquals(FluoriteNull, eval(" \t\n ")) // 空白を書いても何もないのと同じになる
    }

    @Test
    fun objectFunctionTest() = runTest {
        assertEquals("{a:1;b:2;c:3}", eval("TO_OBJECT((a: 1), (b: 2), (c: 3))").obj) // OBJECT関数はストリームをオブジェクトにする
        assertEquals("{a:100}", eval("TO_OBJECT(a: 100)").obj) // ストリームでなくてもよい
        assertEquals("{1:10;2:20;3:30}", eval("1 .. 3 | ((_): _ * 10) >> TO_OBJECT").obj) // OBJECT関数はパイプ演算子と組み合わせて使うと便利
    }

    @Test
    fun joinSplitTest() = runTest {
        // JOIN
        assertEquals("a|b|c", eval(""" JOIN("|"; "a", "b", "c") """).string) // JOIN で文字列を結合できる
        assertEquals("abc", eval(""" JOIN(""; "a", "b", "c") """).string) // セパレータは空文字でもよい
        assertEquals("a123b123c", eval(""" JOIN("123"; "a", "b", "c") """).string) // セパレータは複数文字でもよい
        assertEquals("a|b", eval(""" JOIN("|"; "a", "b") """).string) // ストリームは2要素でもよい
        assertEquals("a", eval(""" JOIN("|"; "a",) """).string) // ストリームは1要素でもよい
        assertEquals("", eval(""" JOIN("|"; ,) """).string) // ストリームは空でもよい
        assertEquals("a", eval(""" JOIN("|"; "a") """).string) // ストリームは非ストリームでもよい
        assertEquals("10|[20]|30", eval(""" JOIN("|"; 10, [20], {`&_`: _ -> 30}{}) """).string) // ストリームは文字列化される
        assertEquals("a1b1c", eval(""" JOIN(1; "a", "b", "c") """).string) // セパレータも文字列化される
        assertEquals("a|b|c", eval(""" JOIN["|"]("a", "b", "c") """).string) // 部分適用を使用した例
        assertEquals("a,b,c", eval(""" JOIN("a", "b", "c") """).string) // 引数を省略した場合はカンマ区切りになる

        // SPLIT
        assertEquals("a,b,c", eval(""" SPLIT("|"; "a|b|c") """).stream()) // SPLIT で文字列を分割できる
        assertEquals("a,b,c", eval(""" SPLIT(""; "abc") """).stream()) // セパレータは空文字でもよい
        assertEquals("a,b,c", eval(""" SPLIT("123"; "a123b123c") """).stream()) // セパレータは複数文字でもよい
        assertEquals("a,b", eval(""" SPLIT("|"; "a|b") """).stream()) // 文字列は2要素でもよい
        assertEquals("a", eval(""" SPLIT("|"; "a") """).stream()) // 文字列は1要素でもよい
        assertEquals("", eval(""" SPLIT("|"; "") """).stream()) // 文字列は空でもよい
        assertEquals("1,2,3", eval(""" SPLIT("0"; 10203) """).stream()) // 文字列は文字列化される
        assertEquals("a,b,c", eval(""" SPLIT(1; "a1b1c") """).stream()) // セパレータは文字列化される
        assertEquals("a,b,c", eval(""" SPLIT["|"]("a|b|c") """).stream()) // 部分適用を使用した例
        assertEquals("a,b,c", eval(""" SPLIT("a,b,c") """).stream()) // 引数を省略した場合はカンマ区切りになる

        // パイプ連携
        assertEquals("10ABC20ABC30", eval(""" "10abc20abc30" >> SPLIT["abc"] >> JOIN["ABC"] """).string)
    }

    @Test
    fun tryRunnerTest() = runTest {
        assertEquals("end", eval("(1 .. 3 | !!'error') !? 'ignore'; 'end'").string) // パイプRunnerの中でエラーが発生してもキャッチできる

        // !? を文として使用した場合、左辺のストリームが必ず1回だけ実行される（副作用が1度だけ生じる）
        """
            count := 0
            (
                1 .. 3 | (
                    count = count + 1
                    count
                )
            ) !? "error"
            count
        """.let { assertEquals(3, eval(it).int) }

        // Runner で !? の右辺で例外オブジェクトを受け取れる（引数あり）
        """
            result := NULL
            (!!'error_value') !? (e => result = e);
            result
        """.let { assertEquals("error_value", eval(it).string) }

        // Runner で !? の右辺が例外発生時に実行される（引数なし）
        """
            count := 0
            (!!'error') !? (count = 1);
            count
        """.let { assertEquals(1, eval(it).int) }
    }

    @Test
    fun identifier() = runTest {
        assertEquals(123, eval("abc := 123; abc").int) // 英数字

        assertEquals(123, eval("_ := 123; _").int) // アンダースコア1個
        assertEquals(123, eval("__ := 123; __").int) // アンダースコア2個

        assertEquals(123, eval("あ := 123; あ").int) // 全角文字
        assertEquals(123, eval("亜 := 123; 亜").int) // 漢字
        assertEquals(123, eval("아 := 123; 아").int) // ハングル文字
        assertEquals(123, eval("√ := 123; √").int) // 全角記号
        assertEquals(123, eval("　:=123;　").int) // 全角空白
        assertEquals(123, eval("\uD83C\uDF70 := 123; \uD83C\uDF70").int) // 絵文字 🍰
        assertEquals(123, eval("surströmming := 123; surströmming").int) // ラテン文字とマルチバイト文字の混在
    }

    @Test
    fun quotedIdentifier() = runTest {
        assertEquals(123, eval("abc := 123; `abc`").int) // 識別子とクォート識別子は同じ
        assertEquals(123, eval("`a` := 123; a").int) // 逆でもよい

        assertEquals(123, eval("{`#abc`: 123}.`#abc`").int) // 記号を含むクォート識別子

        assertEquals(123, eval("(`a` -> a)(123)").int) // ラムダ引数のクォート識別子
        assertEquals(123, eval("123 | `a` => a").int) // パイプ引数のクォート識別子
        assertEquals(123, eval("{`abc`: 123}.abc").int) // エントリーキーのクォート識別子
        assertEquals(123, eval("{abc: 123}.`abc`").int) // プロパティアクセスのクォート識別子
        assertEquals(123, eval("{abc: this -> 123}{}::`abc`()").int) // メソッドのクォート識別子
        assertEquals(123, eval("""`\x27` := 123; `'`""").int) // 1バイト文字参照
        assertEquals(123, eval("""`\u3042` := 123; あ""").int) // 文字参照
    }

    @Test
    fun mount() = runTest {
        assertEquals(123, eval("@{a: 123}; a").int) // 値のマウント
        assertEquals(123, eval("@{add: a, b -> a + b}; add(100; 23)").int) // 関数のマウント
        assertEquals(123, eval("@{a: () -> 123}; @{b: () -> a()}; b()").int) // マウントの統合
        assertEquals(123, eval("@{a: 100}; @{a: 123}; a").int) // マウントのオーバーライド
        assertEquals(123, eval("a := 123; @{a: 100}; a").int) // 変数はマウントに優先する
        assertEquals(123, eval("@{a: 123}; (@{a: 100};); a").int) // マウントはスコープに制限される
        assertEquals(123, eval("@{a: 123}; b := () -> a; @{a: 100}; b()").int) // マウントはそれより上には影響しない
        assertEquals(123, eval("@{a: 123}; m := {}; @m; m.a = 100; a").int) // マウントに使ったオブジェクトを改変しても影響しない
    }

    @Test
    fun extensionMethod() = runTest {

        // 変数による拡張関数
        """
            `::m` := (INT): this -> "V"
            100::m()
        """.let { assertEquals("V", eval(it).string) }

        // マウントによる拡張関数
        """
            @{`::m`: (INT): this -> "M"}
            100::m()
        """.let { assertEquals("M", eval(it).string) }


        // 配列にすることでオーバーロードできる
        """
            `::m` := [
                (INT): this -> "Vi"
                (STRING): this -> "Vs"
            ]
            [
                100::m()
                "abc"::m()
            ]
        """.let { assertEquals("[Vi;Vs]", eval(it).array()) }

        // マウントのオーバーロード
        """
            @{`::m`: [
                (INT): this -> "Mi"
                (STRING): this -> "Ms"
            ]}
            [
                100::m()
                "abc"::m()
            ]
        """.let { assertEquals("[Mi;Ms]", eval(it).array()) }


        // 変数による拡張関数はシャドーイングする
        """
            Obj := {m: this -> "I"}
            `::m` := (Obj): this -> "V"
            `::m` := (INT): this -> "V"
            Obj{}::m()
        """.let { assertEquals("I", eval(it).string) }

        // マウントによる拡張関数はマージされる
        """
            Obj := {}
            @{`::m`: (Obj): this -> "M"}
            @{`::m`: (INT): this -> "M"}
            Obj{}::m()
        """.let { assertEquals("M", eval(it).string) }


        // 変数による拡張関数はインスタンスメソッドを上書きする
        """
            Obj := {m: this -> "I"}
            `::m` := (Obj): this -> "V"
            Obj{}::m()
        """.let { assertEquals("V", eval(it).string) }

        // マウントによる拡張関数はインスタンスメソッドに上書きされる
        """
            Obj := {m: this -> "I"}
            @{`::m`: (Obj): this -> "M"}
            Obj{}::m()
        """.let { assertEquals("I", eval(it).string) }

        // 変数による拡張関数はマウントによる拡張関数を上書きする
        """
            Obj := {}
            @{`::m`: (Obj): this -> "M"}
            `::m` := (Obj): this -> "V"
            Obj{}::m()
        """.let { assertEquals("V", eval(it).string) }

    }

    @Test
    fun plus() = runTest {
        """
            Obj := {
                `_+_`: this, other -> this.x + other.x
            }
            Obj{x: 100} + Obj{x: 23}
        """.let { assertEquals(123, eval(it).int) }
    }

    @Test
    fun objectPlus() = runTest {
        assertEquals("{a:1;b:2}", eval("{a: 1} + {b: 2}").obj) // + でマージできる
        assertEquals("{b:2}", eval("{} + {b: 2}").obj) // 左辺が空でもよい
        assertEquals("{a:1}", eval("{a: 1} + {}").obj) // 右辺が空でもよい
        assertEquals("{}", eval("{} + {}").obj) // 両方空の場合空になる
        assertEquals("{a:5;b:2}", eval("{a: 1; b: 2} + {a: 5}").obj) // 既にある場合は右が優先される
    }

    @Test
    fun spaceship() = runTest {
        // 数値
        assertEquals(-1, eval("1 <=> 2").int) // <=> は左辺が小さい場合は-1
        assertEquals(0, eval("1 <=> 1").int) // 等しい場合は0
        assertEquals(1, eval("2 <=> 1").int) // 左辺が大きい場合は1

        // 文字列
        assertEquals(-1, eval(" 'a' <=> 'b' ").int) // <=> は左辺が小さい場合は-1
        assertEquals(0, eval(" 'a' <=> 'a' ").int) // 等しい場合は0
        assertEquals(1, eval(" 'b' <=> 'a' ").int) // 左辺が大きい場合は1
        assertEquals(true, eval(" 'aa' > 'a' ").boolean) // 末尾に付け足した場合は大きい扱い

        // 宇宙船演算子のオーバーライド
        """
            LengthComparing := {
                `_<=>_`: this, other -> $#this.string <=> $#other.string
            }
            z := LengthComparing{string: "z"}
            a := LengthComparing{string: "a"}
            aaa := LengthComparing{string: "aaa"}
            [
                z <=> a,
                z <=> aaa,
            ]
        """.let { assertEquals("[0;-1]", eval(it).array()) }
    }

    @Test
    fun fallbackMethod() = runTest {
        withEvaluator(UnsupportedIoContext()) { context, evaluator ->
            evaluator.defineMounts(context.run { createCommonMounts() })

            // _::_ でフォールバックメソッドを定義する
            """
                Obj := {
                    `_::_`: this, method ->
                        method == "apple"  ? (() -> "Fallback apple") :
                        method == "banana" ? (x, y, z -> "Fallback", this, method, x, y, z, __ >> JOIN[" "]) :
                        method == "cherry" ? (() -> !!"ERROR") :
                        method == "durian" ? (() -> "Fallback durian") :
                                             NULL
                    cherry: this -> "Method cherry"
                }
                @{
                    `::durian`: (Obj): this -> !!"ERROR"
                    `::elderberry`: (Obj): this -> "Mount elderberry"
                }
                obj := Obj{item: 123}
            """.let { evaluator.run(it) }

            assertEquals("Fallback apple", evaluator.get("obj::apple()").string) // 存在しないメソッドが呼び出された場合、フォールバックメソッドが呼ばれる
            assertEquals("Fallback {item:123} banana 1 2 3 [1;2;3]", evaluator.get("obj::banana(1; 2; 3)").string) // 引数は委譲された関数の方にバラで渡される
            assertEquals("Method cherry", evaluator.get("obj::cherry()").string) // メソッドが定義されている場合はフォールバックしない
            assertEquals("Fallback durian", evaluator.get("obj::durian()").string) // フォールバックメソッドはマウントによる拡張関数に優先する
            assertEquals("Mount elderberry", evaluator.get("obj::elderberry()").string) // フォールバックメソッドがNULLを返した場合、メソッドが定義されていない扱いになる
        }
    }

    @Test
    fun streamMethod() = runTest {
        // ストリームの通常メソッド呼び出しは各要素のメソッド呼び出しの結合になる
        assertEquals("caa,aca,aac", eval(" 'baa', 'aba', 'aab'  | _::replace('b'; 'c')").stream())
        assertEquals("caa,aca,aac", eval("('baa', 'aba', 'aab')    ::replace('b'; 'c')").stream())
    }

    @Test
    fun returnTest() = runTest {

        // label!! の右辺を省略すると NULL を返して脱出できる
        """
            (
                label!!
            ) !: label
        """.let { assertEquals(FluoriteNull, eval(it)) }

        // !! の直後で改行すると右辺は結合されず、以降の式は実行されない
        """
            t := 0
            (
                label!!
                t = 1
            ) !: label
            t
        """.let { assertEquals(0, eval(it).int) }

        // label!! と !? が隣接しても RHS として取り込まれず、外側の !? として扱われる
        """
            (
                label!! !? "On Error!"
                "unreached"
            ) !: label
        """.let { assertEquals(FluoriteNull, eval(it)) }

        // !! 単体は NULL をスローする
        assertEquals("handled", eval(""" !! !? "handled" """).string)

        // getter label!! value でreturnできる
        """
            (
                label!! 123
                456
            ) !: label
        """.let { assertEquals(123, eval(it).int) }

        // getterラベルブロックの末尾式のgetterストリームからの脱出
        // getterラベルブロックは戻り値のストリームを素通りさせず、1度その場で一通り評価してキャッシュする
        """
            (
                1 .. 3 | label!! 123
            ) !: label
        """.let { assertEquals(123, eval(it).int) }

        // getterラベルブロックの戻り値がストリームであり、returnされないパターン
        """
            (
                1 .. 3 | _
            ) !: label
        """.let { assertEquals("1,2,3", eval(it).stream()) }

        // getterラベルブロックの戻り値のストリームは1度だけ評価される
        """
            t := 0
            stream := (
                1 .. 3 | (
                    t = t + 1
                    t
                )
            ) !: label
            [stream; stream; stream; t]
        """.let { assertEquals("[1;2;3;1;2;3;1;2;3;3]", eval(it).array()) }

        // runner label!! value でreturnできる
        """
            (
                label!! 123
                !! "fail"
            ) !: label
            NULL
        """.let { assertEquals(FluoriteNull, eval(it)) }

        // runnerラベルは戻り値のストリームを1度だけ評価する
        """
            t := 0
            (
                1 .. 3 | t = t + 1
            ) !: label
            t
        """.let { assertEquals(3, eval(it).int) }

        // !! の結合優先度は左から見るとリテラル系と同等
        // なので前置単項すらそのままつけれる
        // 右から見ると commas 以下
        assertEquals("1,2,3", eval("($# label!! 1, 2, 3) !: label").stream())

        // 同名のラベルが複数存在した場合、最も内側のラベルを出る
        """
            (
                (
                    label!! 1
                    2
                ) !: label
                3
            ) !: label
        """.let { assertEquals(3, eval(it).int) }

        // !: はラムダ右辺よりも結合優先度が高い
        """
            prime_only := x -> (
                x == 1 && fail!! "!1"
                (x != 2 && x %% 2) && fail!! "!2n"
                (x != 3 && x %% 3) && fail!! "!3n"
                (x != 5 && x %% 5) && fail!! "!5n"
                x
            ) !: fail
            1 .. 10 | prime_only(_)
        """.let { assertEquals("!1,2,3,!2n,5,!2n,7,!2n,!3n,!2n", eval(it).stream()) }

        // ラムダの中から外に !! 出来る
        """
            run := block -> block()
            run ( =>
                return!! 123
                456
            ) !: return
        """.let { assertEquals(123, eval(it).int) }

        // ラムダの中から外に !! 出来る
        """
            (
                1 .. 50 | (
                    (
                        _ % 2 != 0 && next!! NULL // 2で割り切れない！
                        _ % 3 != 0 && next!! NULL // 3で割り切れない！
                        _ % 5 != 0 && next!! NULL // 5で割り切れない！
                        found!! _                 // 2でも3でも5でも割り切れる
                    ) !: next
                )
                NULL
            ) !: found
        """.let { assertEquals(30, eval(it).int) }

        // !? は ?: と全く同じ結合優先度を持つ（エルビス演算子と同等）
        // !!'a' !? 'b' は (!!'a') !? 'b' と解釈され、例外がキャッチされる
        assertEquals("b", eval("(!!'a') !? 'b'").string)
        // !? の対象範囲は比較的狭い
        assertEquals("b", eval("1 + [2 + !!'a'] !? 'b'").string)

        // Issue #62 のテストケース: ラベルはstreamより低い優先度で動作

        // ケース1: `aaa | (bbb && break!!) !: break`
        // !: はstreamよりも低い優先度なので、パイプ全体を捕捉する
        // つまり `(aaa | (...)) !: break` と解釈される
        // breakが発生すると全体がNULLを返す
        """
            1 .. 3 | (
                _ == 2 && break!!
                _ * 10
            ) !: break
        """.let { assertEquals(FluoriteNull, eval(it)) }

        // ケース1b: breakしない場合、全要素が正常に処理される
        """
            1 .. 3 | (
                _ == 99 && break!!
                _ * 10
            ) !: break
        """.let { assertEquals("10,20,30", eval(it).stream()) }

        // ケース2: 集約演算の中断
        """
            1 .. 5 | (
                _ == 3 && break!!
                _
            ) >> SUM !: break
        """.let { assertEquals(FluoriteNull, eval(it)) }

        // ケース3: 代入の右辺でも同様に全体を捕捉
        """
            result := 1 .. 3 | (
                _ == 2 && break!!
                _ * 10
            ) !: break
            result
        """.let { assertEquals(FluoriteNull, eval(it)) }

        // ケース3b: breakしない場合
        """
            result := 1 .. 3 | (
                _ == 99 && break!!
                _ * 10
            ) !: break
            result
        """.let { assertEquals("10,20,30", eval(it).stream()) }
        // !?がカンマよりも強いことを示す
        // ((!!), 1 !? 2, 3) !? 4 は ((!!), (1 !? 2), 3) !? 4 と解釈される
        """((!!), 1 !? 2, 3) !? 4""".let { assertEquals(4, eval(it).int) }

        // !?がorよりも弱いことを示す
        // (!!) || 1 !? 2 は ((!!) || 1) !? 2 と解釈される
        """(!!) || 1 !? 2""".let { assertEquals(2, eval(it).int) }

        // !:が代入を取れないことを示す
        // ((a!! 1): 2 !: a; !!) !: a は ((a!! 1): 2) !: a の後に (!!) !: a が続く
        """((a!! 1): 2 !: a; !!) !: a""".let { assertEquals(1, eval(it).int) }

        // !:が左辺にパイプと右実行パイプを取れることを示す
        // (a!! 1) | 2 >> TO_ARRAY !: a は ((a!! 1) | 2 >> TO_ARRAY) !: a と解釈される
        """(a!! 1) | 2 >> TO_ARRAY !: a""".let { assertEquals(1, eval(it).int) }

        // !:が右辺にパイプを取れないことを示す
        // (1 !: a | (!!)) !? 2 は (1 !: (a | (!!))) !? 2 と解釈され、a | (!!)がエラーになる
        """(1 !: a | (!!)) !? 2""".let { assertEquals(2, eval(it).int) }

        // Issue #62 のテストケース: catchはtry節の範囲を狭める

        // ケース5: f() !? else のように関数呼び出しのみをキャッチ
        """
            f := () -> !! "error"
            result := f() !? "caught"
            result
        """.let { assertEquals("caught", eval(it).string) }

        // ケース6: 複雑な式全体をキャッチしたい場合は括弧が必要
        """
            (1 + 2 + !! "error") !? "caught"
        """.let { assertEquals("caught", eval(it).string) }

        // ケース7: !? と ?: が同じ優先度なので、自然にチェーンできる
        """
            value := NULL
            result := value ?: (!! "error") !? "default"
            result
        """.let { assertEquals("default", eval(it).string) }

    }

}
