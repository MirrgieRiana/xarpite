import kotlinx.coroutines.ExperimentalCoroutinesApi
import kotlinx.coroutines.test.runTest
import mirrg.xarpite.test.double
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
        
        // ネストしたストリームの長さ
        assertEquals(6, eval("$#((\"ab\", \"cd\"), (\"ef\",))").int) // ネストしたストリームは平坦化される
        
        // BLOB を含むストリームの長さ
        assertEquals(6, eval("$#(BLOB.of([1; 2; 3]), BLOB.of([4; 5; 6]))").int) // BLOB のストリームの長さ
        
        // 混合型ストリームの長さ
        assertEquals(9, eval("$#(\"abc\", [1; 2; 3], {a: 1; b: 2; c: 3})").int) // 異なる型の要素を持つストリームの長さ
        
        // カスタム長さメソッドを持つオブジェクトのストリーム
        """
          Obj := {
            `$#_`: this -> this.value
          }
          $#(Obj{value: 5}, Obj{value: 3}, Obj{value: 2})
        """.let { assertEquals(10, eval(it).int) } // カスタム長さメソッドを持つオブジェクトのストリームの長さ
        
        // 小数の長さを持つストリームの長さ
        """
          Line := {
            `$#_`: this -> ((this.b(0) - this.a(0)) ^ 2 + (this.b(1) - this.a(1)) ^ 2) ^ 0.5
          }
          line1 := Line{a: [0; 0]; b: [3; 4]}
          line2 := Line{a: [0; 0]; b: [1; 0]}
          $#(line1, line2)
        """.let { assertEquals(6.0, eval(it).double, 0.0001) } // 小数の長さを持つストリームの合計
    }

    @Test
    fun rangeOperatorWithStrings() = runTest {
        // 閉区間演算子 .. で1文字文字列の範囲
        assertEquals("a,b,c", eval("\"a\" .. \"c\"").stream()) // 昇順の文字範囲
        assertEquals("z,y,x", eval("\"z\" .. \"x\"").stream()) // 降順の文字範囲
        assertEquals("あ,い,う", eval("\"あ\" .. \"う\"").stream()) // ひらがなの範囲
        assertEquals("ん,を,ゑ", eval("\"ん\" .. \"ゑ\"").stream()) // ひらがなの降順範囲
        
        // 半開区間演算子 ~ で1文字文字列の範囲
        assertEquals("a,b,c", eval("\"a\" ~ \"d\"").stream()) // 昇順の文字範囲（半開区間）
        assertEquals("", eval("\"d\" ~ \"a\"").stream()) // 降順の半開区間は空ストリーム
        assertEquals("あ,い", eval("\"あ\" ~ \"う\"").stream()) // ひらがなの半開区間
        
        // 1文字でない場合はエラー
        try {
            eval("\"ab\" .. \"cd\"").stream()
            throw AssertionError("Should throw IllegalArgumentException")
        } catch (e: IllegalArgumentException) {
            // 期待通り
        }
        
        try {
            eval("\"a\" .. \"bc\"").stream()
            throw AssertionError("Should throw IllegalArgumentException")
        } catch (e: IllegalArgumentException) {
            // 期待通り
        }
    }

}
