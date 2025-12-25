import kotlinx.coroutines.ExperimentalCoroutinesApi
import kotlinx.coroutines.test.runTest
import mirrg.xarpite.test.empty
import mirrg.xarpite.test.eval
import mirrg.xarpite.test.int
import mirrg.xarpite.test.stream
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertTrue

@OptIn(ExperimentalCoroutinesApi::class)
class StreamTest {

    @Test
    fun stream() = runTest {
        assertEquals("1,2,3", eval("1, 2, 3").stream()) // , でストリームが作れる
        assertEquals("1,2,3", eval(", , 1, 2, , , 3, , ").stream()) // , は無駄に大量にあってもよい
        assertEquals("1,2,3,4,5,6,7,8,9", eval("(1, 2), 3, ((4 .. 6), 7, (8, 9))").stream()) // ストリームを結合すると自動的に平坦になる
        assertEquals("", eval(",").stream()) // 単体の , で空ストリームになる
        assertEquals("1", eval("1,").stream()) // 値に , を付けると単独でストリームになる
    }

    @Test
    fun property() = runTest {
        assertEquals("1,2", eval("({a: 1}, {a: 2}).a").stream()) // ストリームのプロパティーは要素のプロパティーの連結
        assertEquals("1,NULL", eval("({a: 1}, {b: 2}).a").stream()) // プロパティをサポートするかは要素ごとに変わる
        assertEquals("1,2", eval("([1], [2]).0").stream()) // 数値以外のキーも指定可能
        assertEquals("[1],[2],[3],[4]", eval("({a: 1, 2}, {a: 3, 4}).a | [_]").stream()) // プロパティーのストリームは連結される
        assertTrue(eval("(,).a").empty()) // 空ストリームのプロパティーは空ストリーム
    }

    @Test
    fun indexedPipe() = runTest {
        assertEquals("[0;1],[1;2],[2;3]", eval("1 .. 3 | i, v => [i, v]").stream()) // 右辺の引数が2項目だとindexを渡す
        assertTrue(eval(", | i, v => [i, v]").empty()) // 空ストリームでも動作する
    }

    @Test
    fun length() = runTest {
        assertEquals(9, eval("$#(\"abc\", \"def\", \"ghi\")").int) // ストリームの長さは各要素の長さの合計
        assertEquals(0, eval("$#(,)").int) // 空ストリームの長さは0
        assertEquals(3, eval("$#(\"abc\",)").int) // 単一要素のストリームの長さは要素の長さ
        assertEquals(6, eval("$#([1; 2; 3], [4; 5; 6])").int) // 配列のストリームの長さ
        assertEquals(7, eval("$#({a: 1; b: 2}, {c: 3}, {d: 4; e: 5; f: 6; g: 7})").int) // オブジェクトのストリームの長さ
        assertEquals(9, eval("(\"abc\", \"def\", \"ghi\")::`$#_`()").int) // メソッド形式での長さの取得
    }

}
