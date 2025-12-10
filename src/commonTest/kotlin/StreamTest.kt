import kotlinx.coroutines.ExperimentalCoroutinesApi
import kotlinx.coroutines.test.runTest
import mirrg.xarpite.test.empty
import mirrg.xarpite.test.eval
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

}
