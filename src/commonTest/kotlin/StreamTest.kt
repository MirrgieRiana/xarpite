import kotlinx.coroutines.ExperimentalCoroutinesApi
import kotlinx.coroutines.test.runTest
import mirrg.xarpite.operations.FluoriteException
import mirrg.xarpite.test.array
import mirrg.xarpite.test.double
import mirrg.xarpite.test.empty
import mirrg.xarpite.test.eval
import mirrg.xarpite.test.int
import mirrg.xarpite.test.stream
import mirrg.xarpite.test.string
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
        assertEquals("a,b,c", eval("\"a\" .. \"c\"").stream()) // ラテン文字の範囲（ドキュメントの例）
        assertEquals("α,β,γ", eval("\"α\" .. \"γ\"").stream()) // ギリシャ文字の範囲（ドキュメントの例）
        assertEquals("z,y,x", eval("\"z\" .. \"x\"").stream()) // 降順の文字範囲
        assertEquals("あ,ぃ,い,ぅ,う", eval("\"あ\" .. \"う\"").stream()) // ひらがなの範囲（文字コード順）
        assertEquals("ん,を", eval("\"ん\" .. \"を\"").stream()) // ひらがなの降順範囲（ん U+3093 > を U+3092）

        // 半開区間演算子 ~ で1文字文字列の範囲
        assertEquals("a,b,c", eval("\"a\" ~ \"d\"").stream()) // ラテン文字の半開区間（ドキュメントの例）
        assertEquals("α,β,γ", eval("\"α\" ~ \"δ\"").stream()) // ギリシャ文字の半開区間（ドキュメントの例）
        assertEquals("", eval("\"d\" ~ \"a\"").stream()) // 降順の半開区間は空ストリーム
        assertEquals("あ,ぃ,い,ぅ", eval("\"あ\" ~ \"う\"").stream()) // ひらがなの半開区間（文字コード順）

        // 1文字でない場合はエラー
        try {
            eval("\"ab\" .. \"cd\"").stream()
            throw AssertionError("Should throw IllegalArgumentException")
        } catch (e: FluoriteException) {
            // 期待通り
        }

        try {
            eval("\"a\" .. \"bc\"").stream()
            throw AssertionError("Should throw IllegalArgumentException")
        } catch (e: FluoriteException) {
            // 期待通り
        }
    }

    @Test
    fun intersperse() = runTest {
        assertEquals("a,-,b,-,c", eval("""INTERSPERSE("-"; "a", "b", "c")""").stream()) // 各要素の間に区切りを挿入する
        assertEquals("1,0,2,0,3", eval("INTERSPERSE(0; 1, 2, 3)").stream()) // 区切りは文字列以外の値でもよい
        assertEquals("a,-,-,b,-,-,c", eval("""INTERSPERSE("-", "-"; "a", "b", "c")""").stream()) // 区切りは複数要素のストリームでもよい
        assertEquals("a,b,c", eval("""INTERSPERSE(,; "a", "b", "c")""").stream()) // 区切りが空ストリームの場合は単純に連結する
        assertEquals("a,-,b", eval("""INTERSPERSE("-"; "a", "b")""").stream()) // ストリームは2要素でもよい
        assertEquals("a", eval("""INTERSPERSE("-"; "a",)""").stream()) // ストリームは1要素でもよい
        assertEquals("", eval("""INTERSPERSE("-"; ,)""").stream()) // ストリームは空でもよい
        assertEquals("a", eval("""INTERSPERSE("-"; "a")""").string) // ストリームは非ストリームでもよい
        assertEquals("10,0,20,0,30", eval("1 .. 3 | _ * 10 >> INTERSPERSE[0]").stream()) // 部分適用でパイプチェーンに組み込める
        assertEquals("[]", eval("""
            array := []
            separator := 1 .. 1 | ( array::push << "s" ; "-" )
            INTERSPERSE(separator; "a",) >> VOID
            array
        """).array()) // 区切りを挟む相手がいない場合は区切りのストリームを読み取らない
        assertEquals("[s]", eval("""
            array := []
            separator := 1 .. 1 | ( array::push << "s" ; "-" )
            INTERSPERSE(separator; "a", "b", "c") >> VOID
            array
        """).array()) // 区切りのストリームは一度だけ読み取ってキャッシュし、各すき間で使い回す
    }

}
