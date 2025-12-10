import kotlinx.coroutines.ExperimentalCoroutinesApi
import kotlinx.coroutines.test.runTest
import mirrg.xarpite.test.boolean
import mirrg.xarpite.test.eval
import mirrg.xarpite.test.int
import mirrg.xarpite.test.obj
import mirrg.xarpite.test.stream
import kotlin.test.Test
import kotlin.test.assertEquals

@OptIn(ExperimentalCoroutinesApi::class)
class ObjectTest {

    @Test
    fun obj() = runTest {
        assertEquals("{a:1}", eval(""" {"a": 1} """).obj) // { } でオブジェクトを作れる
        assertEquals("{a:1}", eval("{a: 1}").obj) // キーの " は省略できる
        assertEquals("{1:2}", eval("{1: 2}").obj) // キーは数値でもよい
        assertEquals("{1:2}", eval("1 | a => {(a): 2}").obj) // キーに ( ) を付けると変数を参照できる
        assertEquals("{a:1;b:2}", eval("{a: 1; b: 2}").obj) // エントリーは ; で区切ることができる
        assertEquals("{a:1;b:2}", eval("{; ; a: 1; ; b: 2; ; }").obj) // ; は無駄に大量にあってもよい
        assertEquals("{}", eval("{; }").obj) // ; しかなくてもよい
        assertEquals("{a:1;b:2}", eval("{(a: 1), (b: 2)}").obj) // エントリーのストリームでもよい
        assertEquals("{a:1;b:2;c:3}", eval("{(a: 1), (b: 2); c: 3}").obj) // エントリーのストリームとエントリーが混在してもよい
        assertEquals("{1:2;2:4;3:6}", eval("{1 .. 3 | a => (a): a * 2}").obj) // エントリー列を返す式でもよい
        assertEquals("{}", eval(""" {} """).obj) // 空でもよい

        assertEquals(true, eval(""" A := {}; a := A {}; a ?= A """).boolean) // 親クラスを取るオブジェクト

        assertEquals("{a:100;b:123}", eval("{a := 100; b: a + 23}").obj) // オブジェクト内で変数が宣言できる
        assertEquals("{a:100;b:120;c:123}", eval("{a := 100; b := a + 20; c: b + 3}").obj) // 変数の初期化子の中からも変数を参照できる
        assertEquals("{a:100}", eval("{a := 100}").obj) // 変数宣言しかなくても初期化される
        assertEquals("{a:100;b:123}", eval("{b: a + 23; a := 100}").obj) // オブジェクトリテラル内の変数は参照した時点で初期化される
        assertEquals(20, eval("o := {v := 10; f: () -> v}; o.v = 20; o.f()").int) // オブジェクト変数はそのオブジェクトのエントリーの値と連動する
        assertEquals(20, eval("o := {v := 10; f: (n) -> v = n}; o.f(20); o.v").int) // 代入も可能
    }

    @Test
    fun keysValues() = runTest {
        assertEquals("a,b,c", eval("KEYS({a: 1; b: 2; c: 3})").stream()) // KEYS でオブジェクトのキーを得る
        assertEquals("1,2,3", eval("VALUES({a: 1; b: 2; c: 3})").stream()) // VALUES でオブジェクトの値を得る
    }

    @Test
    fun assignment() = runTest {
        assertEquals("{a:1;b:9}", eval("o := {a: 1; b: 2}; o.b = 9; o").obj) // オブジェクトのフィールドに代入できる
        assertEquals("{a:1;b:2;c:9}", eval("o := {a: 1; b: 2}; o.c = 9; o").obj) // 存在しないフィールドに代入すると新規追加される
    }

    @Test
    fun setCall() = runTest {
        // オブジェクトの代入呼び出しでキーが作られる
        """
            obj := {}
            obj("a") = 123
            obj.a
        """.let { assertEquals(123, eval(it).int) }

        // 既存キーを上書きできる
        """
            obj := {a: 789}
            obj("a") = 456
            obj("a") = 123
            obj.a
        """.let { assertEquals(123, eval(it).int) }
    }

}
