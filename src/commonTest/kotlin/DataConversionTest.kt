import kotlinx.coroutines.ExperimentalCoroutinesApi
import kotlinx.coroutines.test.runTest
import mirrg.xarpite.compilers.objects.FluoriteNull
import mirrg.xarpite.test.boolean
import mirrg.xarpite.test.double
import mirrg.xarpite.test.empty
import mirrg.xarpite.test.eval
import mirrg.xarpite.test.int
import mirrg.xarpite.test.obj
import mirrg.xarpite.test.stream
import mirrg.xarpite.test.string
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertTrue

@OptIn(ExperimentalCoroutinesApi::class)
class DataConversionTest {

    @Test
    fun jsonFunction() = runTest {
        // JSON
        assertEquals("""{"a":[1,2.5,"3",true,false,null]}""", eval(""" {a: [1, 2.5, "3", TRUE, FALSE, NULL]} >> JSON """).string) // JSON で値をJson文字列に変換する
        assertEquals("1", eval("1 >> JSON").string) // プリミティブを直接指定できる
        assertEquals("[\n  1,\n  [\n    2,\n    3\n  ],\n  4\n]", eval(""" [1, [2, 3], 4] >> JSON[indent: "  "] """).string) // indentを指定できる
        assertEquals("[1],[2],[3]", eval("[1], [2], [3] >> JSONS").stream()) // ストリームを指定するとJsonのストリームになる

        // JSOND
        assertEquals("""{a:[1;2.5;3;TRUE;FALSE;NULL]}""", eval(""" '{"a":[1,2.5,"3",true,false,null]}' >> JSOND """).obj) // JSOND でJson文字列を値に変換する
        assertEquals(1, eval(""" "1" >> JSOND """).int) // プリミティブを直接指定できる
        assertEquals("[1],[2],[3]", eval(""" "[1]", "[2]", "[3]" >> JSONSD """).stream()) // Jsonのストリームを指定するとストリームになる
        assertEquals("[1],[2]", eval(""" "[", "1", "]", "[", "2", "]" >> JSONSD """).stream()) // Jsonは改行可能箇所でストリーム要素が切れていてもよい
        assertEquals("[1],[2]", eval(""" " ", "[", " ", "1", " ", "]", " ", "[", "2", "]", " " >> JSONSD """).stream()) // 余分な空白文字列があってもよい
        assertTrue(eval(""" " " >> JSONSD """).empty()) // ブランク文字列しかない場合、空ストリームになる
        assertTrue(eval(""" , >> JSONSD """).empty()) // 空ストリームの場合、空ストリームになる
    }

    @Test
    fun json() = runTest {
        // $& でFluoriteValueがjson文字列になる
        assertEquals("10", eval("$&10").string) // トップレベルがJsonArrayやJsonObjectでなくてもよい
        assertEquals("10.5", eval("$&10.5").string)
        assertEquals("\"abc\"", eval("$&'abc'").string)
        assertEquals(""""a\"b\nc\\d"""", eval(""" $&"a\"b\nc\\d" """).string)
        assertEquals("true", eval("$&TRUE").string)
        assertEquals("false", eval("$&FALSE").string)
        assertEquals("null", eval("$&NULL").string)
        assertEquals("[1,2,3]", eval("$&[1; 2; 3]").string)
        assertEquals("{\"a\":1,\"b\":2}", eval("$&{a: 1; b: 2}").string)

        // $* でjson文字列がFluoriteValueになる
        assertEquals(10, eval("$*'10'").int)
        assertEquals(10.5, eval("$*'10.5'").double, 0.001)
        assertEquals("abc", eval("$*'\"abc\"'").string)
        assertEquals("a\"b\nc\\d", eval(""" $*'"a\"b\nc\\d"' """).string)
        assertEquals(true, eval("$*'true'").boolean)
        assertEquals(false, eval("$*'false'").boolean)
        assertEquals(FluoriteNull, eval("$*'null'"))
        assertEquals("[1;2;3]", eval("&$*'[1,2,3]'").string)
        assertEquals("{a:1;b:2}", eval("&$*'{\"a\":1,\"b\":2}'").string)
    }

    @Test
    fun csv() = runTest {
        assertEquals("""a,b""", eval(""" ["a","b"] >> CSV """).string) // CSV で配列を文字列に変換できる
        assertEquals("""["a","b"]""", eval(""" "a,b" >> CSVD >> JSON """).string) // CSVD で文字列を配列に変換できる

        // ストリームは各要素が変換される
        assertEquals("""a,b,c,d""", eval(""" ["a","b"],["c","d"] >> CSV """).stream())
        assertEquals("""["a","b"],["c","d"]""", eval(""" "a,b","c,d" >> CSVD >> JSONS """).stream())

        // 空文字列は空文字列を1個含む配列になる
        assertEquals("", eval(""" [""] >> CSV """).string)
        assertEquals("""[""]""", eval(""" "" >> CSVD >> JSON """).string)

        // 区切り文字を含むセルはクォートされる
        assertEquals("\"a,b\"", eval(""" ["a,b"] >> CSV """).string)
        assertEquals("""["a,b"]""", eval(""" "\"a,b\"" >> CSVD >> JSON """).string)

        // クォートを含むセルはクォートされ、クォートが2重になる
        assertEquals("\"a\"\"b\"", eval(""" ["a\"b"] >> CSV """).string)
        assertEquals("""["a\"b"]""", eval(""" "\"a\"\"b\"" >> CSVD >> JSON """).string)

        // 前後に半角空白やタブがあるセルはクォートされる
        assertEquals("\" a \",\"\tb\t\"", eval(""" [" a ","\tb\t"] >> CSV """).string)
        assertEquals("""[" a ","\tb\t"]""", eval(""" "\" a \",\"\tb\t\"" >> CSVD >> JSON """).string)

        // 改行を含むセルはクォートされる
        assertEquals("\"a\r\n\",\"\nb\"", eval(""" ["a\r\n","\nb"] >> CSV """).string)
        assertEquals("""["a\r\n","\nb"]""", eval(""" "\"a\r\n\",\"\nb\"" >> CSVD >> JSON """).string)

        // 区切り文字とクォート文字の指定
        assertEquals("%a|%|%%%b%", eval(""" ["a|","%b"] >> CSV[separator: "|"; quote: "%"] """).string)
        assertEquals("""["a|","%b"]""", eval(""" "%a|%|%%%b%" >> CSVD[separator: "|"; quote: "%"] >> JSON """).string)

        // CSVDのフォーマット
        assertEquals("""["a","","b"]""", eval(""" "a,,b" >> CSVD >> JSON """).string) // 空のセクションは空文字列になる
        assertEquals("""["","a","b"]""", eval(""" ",a,b" >> CSVD >> JSON """).string) // 先頭のカンマの前は空文字列になる
        assertEquals("""["a","b",""]""", eval(""" "a,b," >> CSVD >> JSON """).string) // 末尾のカンマの後は空文字列になる
        assertEquals("""["","a","","c",""]""", eval(""" " , a , , c , " >> CSVD >> JSON """).string) // 余計な空白はトリムされる

        assertEquals("""["","a","","b",""]""", eval(""" " \t a \t \t b \t " >> CSVD[separator: "\t"] >> JSON """).string) // 区切り文字がタブの場合、タブを空白文字扱いしない
        assertEquals("""["","a","","b",""]""", eval(""" "\t \ta\t \t \tb\t \t" >> CSVD[separator: " "] >> JSON """).string) // 区切り文字が半角空白の場合、半角空白を空白文字扱いしない
    }

    @Test
    fun utf8() = runTest {
        // UTF8 で文字列をUTF-8 BLOBに変換
        assertEquals("BLOB.of([97;98;99])", eval(""" "abc" >> UTF8 >> TO_STRING """).string) // ASCII文字列
        assertEquals("BLOB.of([97;98;99;49;50;51;206;177;206;178;206;179])", eval(""" "abc123αβγ" >> UTF8 >> TO_STRING """).string) // マルチバイト文字を含む文字列
        assertEquals("BLOB.of([])", eval(""" "" >> UTF8 >> TO_STRING """).string) // 空文字列は空BLOB

        // UTF8D でUTF-8 BLOBを文字列に変換
        assertEquals("abc", eval(""" BLOB.of([97, 98, 99]) >> UTF8D """).string) // ASCII
        assertEquals("abc123αβγ", eval(""" BLOB.of([97, 98, 99, 49, 50, 51, 206, 177, 206, 178, 206, 179]) >> UTF8D """).string) // マルチバイト文字
        assertEquals("", eval(""" BLOB.of([]) >> UTF8D """).string) // 空BLOB

        // UTF8D はストリームからも変換できる
        assertEquals("abc123αβγ", eval("""
            BLOB.of([97, 98, 99]),
            BLOB.of([49, 50, 51]),
            BLOB.of([206, 177, 206]),
            BLOB.of([178, 206, 179])
            >> UTF8D
        """).string) // ストリームのBLOBを連結してデコード

        // BLOBの境界がUTF-8文字の途中で分割されている場合でも正しく動作する
        assertEquals("αβγ", eval("""
            BLOB.of([206]),
            BLOB.of([177, 206, 178]),
            BLOB.of([206, 179])
            >> UTF8D
        """).string) // UTF-8文字の途中で分割されたBLOBを正しくデコード

        // UTF8D は改行文字の正規化を行わない
        assertEquals("a\r\nb\nc\rd", eval(""" BLOB.of([97, 13, 10, 98, 10, 99, 13, 100]) >> UTF8D """).string) // \r\n, \n, \r がそのまま保持される

        // UTF8とUTF8Dは逆変換の関係
        assertEquals("Hello, World!", eval(""" "Hello, World!" >> UTF8 >> UTF8D """).string)
        assertEquals("こんにちは世界", eval(""" "こんにちは世界" >> UTF8 >> UTF8D """).string)
        assertEquals("🌟✨🎉", eval(""" "🌟✨🎉" >> UTF8 >> UTF8D """).string) // 絵文字も正しく変換される
        assertEquals("a\r\nb\nc\rd", eval(""" "a\r\nb\nc\rd" >> UTF8 >> UTF8D """).string) // 改行文字も正規化されずに保持される
    }

}
