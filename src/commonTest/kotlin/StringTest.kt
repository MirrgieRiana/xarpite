import kotlinx.coroutines.ExperimentalCoroutinesApi
import kotlinx.coroutines.test.runTest
import mirrg.xarpite.test.eval
import mirrg.xarpite.test.string
import kotlin.test.Test
import kotlin.test.assertEquals

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
