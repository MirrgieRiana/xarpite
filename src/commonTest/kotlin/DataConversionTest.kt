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
        assertEquals(
            eval(""" {a: 1} >> JSON[indent: "  "] """).string,
            eval(""" {a: 1} >> JSON["  "] """).string
        ) // indentは位置引数でも指定できる
        assertEquals(
            eval(""" {a: 1} >> JSON[indent: "  "] """).string,
            eval(""" {a: 1} >> JSON[indent: 2] """).string
        ) // indentは数値でも指定でき、その数だけ空白が使用される

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
        // JSONS との連携は indent 指定時のみ検証
        assertEquals(
            """
                [
                  "a",
                  "b"
                ],
                [
                  "c",
                  "d"
                ]
            """.trimIndent().replace("\n", ""),
            eval(""" "a,b","c,d" >> CSVD >> JSONS[indent: "  "] """).stream().replace("\n", "")
        )

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

        // UTF8D はARRAYも受け付ける
        assertEquals("abc123αβγ", eval(""" [97, 98, 99, 49, 50, 51, 206, 177, 206, 178, 206, 179] >> UTF8D """).string) // 配列から直接デコード
        
        // UTF8D は数値も受け付ける
        assertEquals("a", eval(""" 97 >> UTF8D """).string) // 単一の数値
        
        // UTF8D はARRAYとBLOBの混在したストリームも受け付ける
        assertEquals("abc123αβγ", eval("""
            [97, 98, 99],
            BLOB.of([49, 50, 51]),
            [206, 177, 206],
            BLOB.of([178, 206, 179])
            >> UTF8D
        """).string) // 配列とBLOBの混在ストリームをデコード
    }

    @Test
    fun url() = runTest {
        // URL で文字列をURLエンコード
        assertEquals("Hello+World", eval(""" "Hello World" >> URL """).string) // スペースは+に変換される
        assertEquals("a%3Db%26c%3Dd", eval(""" "a=b&c=d" >> URL """).string) // 記号はエンコードされる
        assertEquals("%E3%81%93%E3%82%93%E3%81%AB%E3%81%A1%E3%81%AF", eval(""" "こんにちは" >> URL """).string) // マルチバイト文字はエンコードされる
        assertEquals("abc123", eval(""" "abc123" >> URL """).string) // 英数字はそのまま
        assertEquals("A-Z_a-z.0-9~", eval(""" "A-Z_a-z.0-9~" >> URL """).string) // URL安全文字はそのまま
        assertEquals("user_id%3DUser1%26password%3Dp-a_s.s~w%25o%26r%3Dd%3F", eval(""" "user_id=User1&password=p-a_s.s~w%o&r=d?" >> URL """).string) // ドキュメント例

        // URLD でURLエンコードされた文字列をデコード
        assertEquals("Hello World", eval(""" "Hello+World" >> URLD """).string) // +はスペースに変換される
        assertEquals("a=b&c=d", eval(""" "a%3Db%26c%3Dd" >> URLD """).string) // エンコードされた記号がデコードされる
        assertEquals("こんにちは", eval(""" "%E3%81%93%E3%82%93%E3%81%AB%E3%81%A1%E3%81%AF" >> URLD """).string) // エンコードされたマルチバイト文字がデコードされる
        assertEquals("abc123", eval(""" "abc123" >> URLD """).string) // 英数字はそのまま
        assertEquals("A-Z_a-z.0-9~", eval(""" "A-Z_a-z.0-9~" >> URLD """).string) // URL安全文字はそのまま
        assertEquals("user_id=User1&password=p-a_s.s~w%o&r=d?", eval(""" "user_id%3DUser1%26password%3Dp-a_s.s~w%25o%26r%3Dd%3F" >> URLD """).string) // ドキュメント例

        // URLとURLDは逆変換の関係
        assertEquals("Hello, World!", eval(""" "Hello, World!" >> URL >> URLD """).string)
        assertEquals("こんにちは世界", eval(""" "こんにちは世界" >> URL >> URLD """).string)
        assertEquals("a=b&c=d test", eval(""" "a=b&c=d test" >> URL >> URLD """).string)
    }

    @Test
    fun percent() = runTest {
        // PERCENT で文字列をパーセントエンコード
        assertEquals("Hello%20World", eval(""" "Hello World" >> PERCENT """).string) // スペースは%20に変換される
        assertEquals("a%3Db%26c%3Dd", eval(""" "a=b&c=d" >> PERCENT """).string) // 記号はエンコードされる
        assertEquals("%E3%81%93%E3%82%93%E3%81%AB%E3%81%A1%E3%81%AF", eval(""" "こんにちは" >> PERCENT """).string) // マルチバイト文字はエンコードされる
        assertEquals("abc123", eval(""" "abc123" >> PERCENT """).string) // 英数字はそのまま
        assertEquals("A%2DZ%5Fa%2Dz%2E0%2D9%7E", eval(""" "A-Z_a-z.0-9~" >> PERCENT """).string) // URL安全文字もエンコードされる（PERCENTは英数字のみ保持）
        assertEquals("user%5Fid%3DUser1%26password%3Dp%2Da%5Fs%2Es%7Ew%25o%26r%3Dd%3F", eval(""" "user_id=User1&password=p-a_s.s~w%o&r=d?" >> PERCENT """).string) // ドキュメント例

        // PERCENTD でパーセントエンコードされた文字列をデコード
        assertEquals("Hello World", eval(""" "Hello%20World" >> PERCENTD """).string) // %20はスペースに変換される
        assertEquals("a=b&c=d", eval(""" "a%3Db%26c%3Dd" >> PERCENTD """).string) // エンコードされた記号がデコードされる
        assertEquals("こんにちは", eval(""" "%E3%81%93%E3%82%93%E3%81%AB%E3%81%A1%E3%81%AF" >> PERCENTD """).string) // エンコードされたマルチバイト文字がデコードされる
        assertEquals("abc123", eval(""" "abc123" >> PERCENTD """).string) // 英数字はそのまま
        assertEquals("A-Z_a-z.0-9~", eval(""" "A%2DZ%5Fa%2Dz%2E0%2D9%7E" >> PERCENTD """).string) // エンコードされた記号がデコードされる
        assertEquals("user_id=User1&password=p-a_s.s~w%o&r=d?", eval(""" "user%5Fid%3DUser1%26password%3Dp%2Da%5Fs%2Es%7Ew%25o%26r%3Dd%3F" >> PERCENTD """).string) // ドキュメント例

        // PERCENTとPERCENTDは逆変換の関係
        assertEquals("Hello, World!", eval(""" "Hello, World!" >> PERCENT >> PERCENTD """).string)
        assertEquals("こんにちは世界", eval(""" "こんにちは世界" >> PERCENT >> PERCENTD """).string)
        assertEquals("a=b&c=d test", eval(""" "a=b&c=d test" >> PERCENT >> PERCENTD """).string)
    }

    @Test
    fun base() = runTest {
        // BASE で数値を任意の基数の文字列に変換
        assertEquals("100", eval(""" 256 >> BASE[16] """).string) // 16進数: 256 → "100"
        assertEquals("FF", eval(""" 255 >> BASE[16] """).string) // 16進数: 255 → "FF"
        assertEquals("10", eval(""" 16 >> BASE[16] """).string) // 16進数: 16 → "10"
        assertEquals("0", eval(""" 0 >> BASE[16] """).string) // 16進数: 0 → "0"
        assertEquals("100000000", eval(""" 256 >> BASE[2] """).string) // 2進数: 256 → "100000000"
        assertEquals("11111111", eval(""" 255 >> BASE[2] """).string) // 2進数: 255 → "11111111"
        assertEquals("400", eval(""" 256 >> BASE[8] """).string) // 8進数: 256 → "400"
        assertEquals("80", eval(""" 256 >> BASE[32] """).string) // 32進数: 256 → "80"

        // BASED で任意の基数の文字列を数値に変換
        assertEquals(256, eval(""" "100" >> BASED[16] """).int) // 16進数: "100" → 256
        assertEquals(255, eval(""" "FF" >> BASED[16] """).int) // 16進数: "FF" → 255
        assertEquals(255, eval(""" "ff" >> BASED[16] """).int) // 16進数: "ff" → 255 (小文字も可)
        assertEquals(16, eval(""" "10" >> BASED[16] """).int) // 16進数: "10" → 16
        assertEquals(0, eval(""" "0" >> BASED[16] """).int) // 16進数: "0" → 0
        assertEquals(256, eval(""" "100000000" >> BASED[2] """).int) // 2進数: "100000000" → 256
        assertEquals(255, eval(""" "11111111" >> BASED[2] """).int) // 2進数: "11111111" → 255
        assertEquals(256, eval(""" "400" >> BASED[8] """).int) // 8進数: "400" → 256
        assertEquals(256, eval(""" "80" >> BASED[32] """).int) // 32進数: "80" → 256
        assertEquals(520, eval(""" "g8" >> BASED[32] """).int) // 32進数: "g8" → 520 (小文字も可)

        // BASEとBASEDは逆変換の関係
        assertEquals(256, eval(""" 256 >> BASE[16] >> BASED[16] """).int)
        assertEquals(12345, eval(""" 12345 >> BASE[10] >> BASED[10] """).int)
        assertEquals(1023, eval(""" 1023 >> BASE[2] >> BASED[2] """).int)
        assertEquals(1000, eval(""" 1000 >> BASE[36] >> BASED[36] """).int)

        // さまざまな基数で変換できる
        assertEquals("1010", eval(""" 10 >> BASE[2] """).string) // 2進数
        assertEquals("22", eval(""" 10 >> BASE[4] """).string) // 4進数
        assertEquals("12", eval(""" 10 >> BASE[8] """).string) // 8進数
        assertEquals("A", eval(""" 10 >> BASE[16] """).string) // 16進数
        assertEquals("A", eval(""" 10 >> BASE[36] """).string) // 36進数
    }

    @Test
    fun base64() = runTest {
        // BASE64 で文字列をBase64文字列に変換
        assertEquals("SGVsbG8sIFdvcmxkIQ==", eval(""" "Hello, World!" >> BASE64 """).string)
        assertEquals("YWJj", eval(""" "abc" >> BASE64 """).string)
        assertEquals("", eval(""" "" >> BASE64 """).string) // 空文字列は空文字列

        // BASE64D でBase64文字列を文字列に変換
        assertEquals("Hello, World!", eval(""" "SGVsbG8sIFdvcmxkIQ==" >> BASE64D """).string)
        assertEquals("abc", eval(""" "YWJj" >> BASE64D """).string)
        assertEquals("", eval(""" "" >> BASE64D """).string) // 空文字列は空文字列

        // BASE64とBASE64Dは逆変換の関係
        assertEquals("Hello, World!", eval(""" "Hello, World!" >> BASE64 >> BASE64D """).string)
        assertEquals("こんにちは世界", eval(""" "こんにちは世界" >> BASE64 >> BASE64D """).string)
        assertEquals("🌟✨🎉", eval(""" "🌟✨🎉" >> BASE64 >> BASE64D """).string)

        // BASE64 は76文字ごとに改行される (LF)
        val longString = "a".repeat(100)
        val encoded = eval(""" "$longString" >> BASE64 """).string
        val lines = encoded.split("\n")
        // 最後の行以外は76文字
        for (i in 0 until lines.size - 1) {
            assertEquals(76, lines[i].length, "Line $i should be 76 characters")
        }

        // BASE64D は改行や空白を無視する
        assertEquals("Hello, World!", eval(""" "SGVsbG8sIFdvcmxkIQ==\n" >> BASE64D """).string)
        assertEquals("Hello, World!", eval(""" " SGVsbG8sIFdvcmxkIQ== " >> BASE64D """).string)
    }


}
