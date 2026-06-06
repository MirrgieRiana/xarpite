import kotlinx.coroutines.ExperimentalCoroutinesApi
import kotlinx.coroutines.test.runTest
import mirrg.xarpite.compilers.objects.FluoriteNull
import mirrg.xarpite.test.eval
import mirrg.xarpite.test.string
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertFails

@OptIn(ExperimentalCoroutinesApi::class)
class StringTest {

    @Test
    fun subString() = runTest {
        assertEquals("abc", eval("'abc'[]").string) // 文字列そのものを返す
        assertEquals("b", eval("'abc'[1]").string) // 単一インデックスによる部分文字列の取得
        assertEquals("b", eval("'abc'['0.95']").string) // インデックスは数値化し、四捨五入される
        assertEquals("NULL", eval("'abc'[3]").string) // 範囲外のインデックスは NULL が返る
        assertEquals("c", eval("'abc'[-1]").string) // 負のインデックスは後ろから数える
        assertEquals("ccab", eval("'abc'[2, 2, 0, 1]").string) // インデックスのストリームは要素のストリームを返す

        assertEquals("bcd", eval("'abcde'[1 .. 3]").string) // 範囲指定による部分配列の取得
    }

    @Test
    fun concatenate() = runTest {
        assertEquals("ab", eval(" 'a' & 'b' ").string) // & で文字列の連結ができる
        assertEquals("12", eval(" 1 & 2 ").string) // 文字列に変換する
    }

    @Test
    fun take() = runTest {
        assertEquals("ab", eval("'abcde'::take(2)").string) // 先頭の n 文字を取得する
        assertEquals("ab", eval("'abcde'::takeFirst(2)").string) // takeFirst は take のシノニム
        assertEquals("", eval("'abcde'::take(0)").string) // 0 文字は空文字列になる
        assertEquals("abcde", eval("'abcde'::take(10)").string) // 長さを超える場合は文字列全体になる
        assertEquals("", eval("''::take(2)").string) // 空文字列からの取得
        assertEquals("ab", eval("'abcde'::take('1.5')").string) // 文字数は数値化し、四捨五入される
        assertEquals("あい", eval("'あいう'::take(2)").string) // マルチバイト文字の取得
        assertEquals("😀", eval("'😀x'::take(2)").string) // サロゲートペアは UTF-16 コードユニット 2 つ分として扱われる
        assertEquals(1, eval("'😀x'::take(1)").string.length) // サロゲートペアの途中（Char 単位）で分割される（既存の添字演算子と同じ挙動）
        assertFails { eval("'abcde'::take(-1)") } // 負の count はエラーになる
    }

    @Test
    fun taker() = runTest {
        assertEquals("de", eval("'abcde'::taker(2)").string) // 末尾の n 文字を取得する
        assertEquals("de", eval("'abcde'::takeLast(2)").string) // takeLast は taker のシノニム
        assertEquals("", eval("'abcde'::taker(0)").string) // 0 文字は空文字列になる
        assertEquals("abcde", eval("'abcde'::taker(10)").string) // 長さを超える場合は文字列全体になる
        assertEquals("", eval("''::taker(2)").string) // 空文字列からの取得
        assertEquals("いう", eval("'あいう'::taker(2)").string) // マルチバイト文字の取得
    }

    @Test
    fun drop() = runTest {
        assertEquals("cde", eval("'abcde'::drop(2)").string) // 先頭の n 文字を除く
        assertEquals("cde", eval("'abcde'::dropFirst(2)").string) // dropFirst は drop のシノニム
        assertEquals("abcde", eval("'abcde'::drop(0)").string) // 0 文字は文字列全体になる
        assertEquals("", eval("'abcde'::drop(10)").string) // 長さを超える場合は空文字列になる
        assertEquals("", eval("''::drop(2)").string) // 空文字列からの除去
        assertEquals("う", eval("'あいう'::drop(2)").string) // マルチバイト文字の除去
        assertFails { eval("'abcde'::drop(-1)") } // 負の count はエラーになる
    }

    @Test
    fun dropr() = runTest {
        assertEquals("abc", eval("'abcde'::dropr(2)").string) // 末尾の n 文字を除く
        assertEquals("abc", eval("'abcde'::dropLast(2)").string) // dropLast は dropr のシノニム
        assertEquals("abcde", eval("'abcde'::dropr(0)").string) // 0 文字は文字列全体になる
        assertEquals("", eval("'abcde'::dropr(10)").string) // 長さを超える場合は空文字列になる
        assertEquals("", eval("''::dropr(2)").string) // 空文字列からの除去
        assertEquals("あ", eval("'あいう'::dropr(2)").string) // マルチバイト文字の除去
    }

    @Test
    fun firstAndLast() = runTest {
        assertEquals("a", eval("'abc'::first()").string) // 先頭の 1 文字を取得する
        assertEquals("c", eval("'abc'::last()").string) // 末尾の 1 文字を取得する
        assertEquals(FluoriteNull, eval("''::first()")) // 空文字列の先頭は NULL が返る
        assertEquals(FluoriteNull, eval("''::last()")) // 空文字列の末尾は NULL が返る
        assertEquals("あ", eval("'あいう'::first()").string) // マルチバイト文字の先頭
        assertEquals("う", eval("'あいう'::last()").string) // マルチバイト文字の末尾
        assertEquals(1, eval("'😀x'::first()").string.length) // first はコードユニット単位なのでサロゲートペアの片方を返す（既存の添字演算子と同じ挙動）
        assertFails { eval("'abc'::first(123)") } // 余分な引数はエラーになる
        assertFails { eval("'abc'::last(123)") } // 余分な引数はエラーになる
    }

    @Test
    fun replace() = runTest {
        assertEquals("aBc", eval("'abc'::replace('b'; 'B')").string) // 文字列の置換ができる
        assertEquals("aBCd", eval("'abcd'::replace('bc'; 'BC')").string) // 複数文字の文字列による置換
        assertEquals("aBBc", eval("'abc'::replace('b'; 'BB')").string) // 文字列長が増える置換
        assertEquals("aBd", eval("'abcd'::replace('bc'; 'B')").string) // 文字列長が減る置換
        assertEquals("ac", eval("'abc'::replace('b'; '')").string) // 空文字列への置換
        assertEquals("Abc", eval("'abc'::replace('a'; 'A')").string) // 先頭の文字の置換
        assertEquals("abC", eval("'abc'::replace('c'; 'C')").string) // 末尾の文字の置換
        assertEquals("ABC", eval("'abc'::replace('abc'; 'ABC')").string) // 文字列全体の置換
        assertEquals("aBcaBc", eval("'abcabc'::replace('b'; 'B')").string) // 複数回の置換
        assertEquals("", eval("'aaa'::replace('a'; '')").string) // 文字列全体が消える置換
        assertEquals("abc", eval("'abc'::replace('d'; 'D')").string) // １回もマッチしない置換
        assertEquals("", eval("''::replace('a'; 'A')").string) // 空文字列に対する置換
        assertEquals("AaAbAcA", eval("'abc'::replace(''; 'A')").string) // 空文字列からの置換
        assertEquals("A", eval("''::replace(''; 'A')").string) // 空文字列に対する空文字列からの置換
        assertEquals("abc", eval("'abc'::replace(''; '')").string) // 空文字列から空文字列への置換
        assertEquals("あイう", eval("'あいう'::replace('い'; 'イ')").string) // マルチバイト文字の置換
        assertEquals("aAcde", eval("'abcde'::replace(/[b-d]/; 'A')").string) // 正規表現からの置換
        assertEquals("aAAAe", eval("'abcde'::replace(/[b-d]/g; 'A')").string) // グローバル正規表現からの置換
        assertEquals("abbc", eval("'abc'::replace('b'; m -> m.0 * 2)").string) // 関数への置換
        assertEquals("abbccdde", eval("'abcde'::replace(/[b-d]/g; m -> m.0 * 2)").string) // グローバル正規表現から関数への置換
        assertEquals("AaAbAcA", eval("'abc'::replace(/(?:)/g; 'A')").string) // 空のグローバル正規表現からの置換
        assertEquals("AabcA", eval("'abc'::replace(/^|$/g; 'A')").string) // 場所にマッチする空のグローバル正規表現からの置換
        assertEquals("ace", eval("'abcde'::replace(/b(.)d/g; m -> m.1)").string) // グローバル正規表現からグループへの置換
    }

    @Test
    fun replaceAll() = runTest {
        assertEquals("aBc", eval("'abc'::replaceAll('b'; 'B')").string) // 文字列の置換ができる
        assertEquals("aBCd", eval("'abcd'::replaceAll('bc'; 'BC')").string) // 複数文字の文字列による置換
        assertEquals("aBBc", eval("'abc'::replaceAll('b'; 'BB')").string) // 文字列長が増える置換
        assertEquals("aBd", eval("'abcd'::replaceAll('bc'; 'B')").string) // 文字列長が減る置換
        assertEquals("ac", eval("'abc'::replaceAll('b'; '')").string) // 空文字列への置換
        assertEquals("Abc", eval("'abc'::replaceAll('a'; 'A')").string) // 先頭の文字の置換
        assertEquals("abC", eval("'abc'::replaceAll('c'; 'C')").string) // 末尾の文字の置換
        assertEquals("ABC", eval("'abc'::replaceAll('abc'; 'ABC')").string) // 文字列全体の置換
        assertEquals("aBcaBc", eval("'abcabc'::replaceAll('b'; 'B')").string) // 複数回の置換
        assertEquals("", eval("'aaa'::replaceAll('a'; '')").string) // 文字列全体が消える置換
        assertEquals("abc", eval("'abc'::replaceAll('d'; 'D')").string) // １回もマッチしない置換
        assertEquals("", eval("''::replaceAll('a'; 'A')").string) // 空文字列に対する置換
        assertEquals("AaAbAcA", eval("'abc'::replaceAll(''; 'A')").string) // 空文字列からの置換
        assertEquals("A", eval("''::replaceAll(''; 'A')").string) // 空文字列に対する空文字列からの置換
        assertEquals("abc", eval("'abc'::replaceAll(''; '')").string) // 空文字列から空文字列への置換
        assertEquals("あイう", eval("'あいう'::replaceAll('い'; 'イ')").string) // マルチバイト文字の置換
        assertEquals("aAAAe", eval("'abcde'::replaceAll(/[b-d]/; 'A')").string) // 正規表現からの置換（グローバルフラグを無視）
        assertEquals("aAAAe", eval("'abcde'::replaceAll(/[b-d]/g; 'A')").string) // グローバル正規表現からの置換
        assertEquals("abbc", eval("'abc'::replaceAll('b'; m -> m.0 * 2)").string) // 関数への置換
        assertEquals("abbccdde", eval("'abcde'::replaceAll(/[b-d]/g; m -> m.0 * 2)").string) // グローバル正規表現から関数への置換
        assertEquals("AaAbAcA", eval("'abc'::replaceAll(/(?:)/g; 'A')").string) // 空のグローバル正規表現からの置換
        assertEquals("AabcA", eval("'abc'::replaceAll(/^|$/g; 'A')").string) // 場所にマッチする空のグローバル正規表現からの置換
        assertEquals("ace", eval("'abcde'::replaceAll(/b(.)d/g; m -> m.1)").string) // グローバル正規表現からグループへの置換
    }

    @Test
    fun replaceFirst() = runTest {
        assertEquals("aBc", eval("'abc'::replaceFirst('b'; 'B')").string) // 文字列の最初の置換ができる
        assertEquals("aBCd", eval("'abcd'::replaceFirst('bc'; 'BC')").string) // 複数文字の文字列による置換
        assertEquals("aBBc", eval("'abc'::replaceFirst('b'; 'BB')").string) // 文字列長が増える置換
        assertEquals("aBd", eval("'abcd'::replaceFirst('bc'; 'B')").string) // 文字列長が減る置換
        assertEquals("ac", eval("'abc'::replaceFirst('b'; '')").string) // 空文字列への置換
        assertEquals("Abc", eval("'abc'::replaceFirst('a'; 'A')").string) // 先頭の文字の置換
        assertEquals("abC", eval("'abc'::replaceFirst('c'; 'C')").string) // 末尾の文字の置換
        assertEquals("ABC", eval("'abc'::replaceFirst('abc'; 'ABC')").string) // 文字列全体の置換
        assertEquals("aBcabc", eval("'abcabc'::replaceFirst('b'; 'B')").string) // 最初の１つのみ置換
        assertEquals("aa", eval("'aaa'::replaceFirst('a'; '')").string) // 最初の１つのみ削除
        assertEquals("abc", eval("'abc'::replaceFirst('d'; 'D')").string) // １回もマッチしない置換
        assertEquals("", eval("''::replaceFirst('a'; 'A')").string) // 空文字列に対する置換
        assertEquals("Aabc", eval("'abc'::replaceFirst(''; 'A')").string) // 空文字列からの置換
        assertEquals("A", eval("''::replaceFirst(''; 'A')").string) // 空文字列に対する空文字列からの置換
        assertEquals("abc", eval("'abc'::replaceFirst(''; '')").string) // 空文字列から空文字列への置換
        assertEquals("あイう", eval("'あいう'::replaceFirst('い'; 'イ')").string) // マルチバイト文字の置換
        assertEquals("aAcde", eval("'abcde'::replaceFirst(/[b-d]/; 'A')").string) // 正規表現からの置換
        assertEquals("aAcde", eval("'abcde'::replaceFirst(/[b-d]/g; 'A')").string) // グローバル正規表現でも最初の１つのみ置換
        assertEquals("abbc", eval("'abc'::replaceFirst('b'; m -> m.0 * 2)").string) // 関数への置換
        assertEquals("abbcde", eval("'abcde'::replaceFirst(/[b-d]/g; m -> m.0 * 2)").string) // グローバル正規表現でも最初の１つのみ関数で置換
    }

}
