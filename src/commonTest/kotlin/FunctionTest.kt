import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.ExperimentalCoroutinesApi
import kotlinx.coroutines.Job
import kotlinx.coroutines.cancel
import kotlinx.coroutines.test.runTest
import mirrg.xarpite.Evaluator
import mirrg.xarpite.mounts.createCommonMounts
import mirrg.xarpite.test.array
import mirrg.xarpite.test.boolean
import mirrg.xarpite.test.eval
import mirrg.xarpite.test.int
import mirrg.xarpite.test.string
import kotlin.coroutines.coroutineContext
import kotlin.test.Test
import kotlin.test.assertEquals

@OptIn(ExperimentalCoroutinesApi::class)
class FunctionTest {

    @Test
    fun lambda() = runTest {
        assertEquals(10, eval("((a) -> a)(10)").int) // (a) -> b で関数を作り、 f(a) で実行する
        assertEquals(12, eval("((a; b) -> a * b)(3; 4)").int) // ; で引数を複数取れる
        assertEquals(12, eval("((a, b) -> a * b)(3; 4)").int) // ラムダ引数は , で区切ってもよい
        assertEquals(10, eval("(() -> 10)()").int) // () で引数を無しにできる
        assertEquals(10, eval("(a -> a)(10)").int) // 引数がある場合、 ( ) は省略してもよい
        assertEquals(12, eval("(a, b -> a * b)(3; 4)").int) // 引数が複数の場合も ( ) を省略できる
        assertEquals(12, eval("((, a, , b, ) -> a * b)(3; 4)").int) // 区切り文字を余計に書いてもよい
        assertEquals(10, eval("(, -> 10)()").int) // , 1個でも引数無しを表せる

        assertEquals("[1;2;3;4]", eval("(s -> &[s])(1, 2, 3, 4)").string) // 引数で , を使うとストリームを渡せる

        assertEquals("[1;2;3;4;5]", eval("(() -> &__)(1; 2; 3; 4; 5)").string) // __ で引数を配列で受け取れる
        assertEquals("[4;5;6]", eval("(() -> &[__.1])(1 .. 3; 4 .. 6; 7 .. 9)").string) // 引数列ではストリームを展開しない

        assertEquals(120, eval("f := n -> n == 0 ? 1 : n * f(n - 1); f(5)").int) // 再帰関数の例
        assertEquals(120, eval("(f -> f(f))(f -> n -> n == 0 ? 1 : n * f(f)(n - 1))(5)").int) // 複雑なラムダ計算の例

        // 同じ関数を再帰的に2度呼び出した場合に、関数のフレームが分離されているかどうかのテスト
        assertEquals("[2;1;2]", eval("f := n -> n == 1 ? 1 : [n, f(1), n]; f(2)").array())
    }

    @Test
    fun bind() = runTest {
        assertEquals("12", eval("(a, b -> a & b)[1](2)").string) // [ ] で関数に部分適用できる
        assertEquals("12", eval("(a, b -> a & b)[1; 2]()").string) // [ ] の中に複数の引数があってもよい
        assertEquals("12", eval("(a, b -> a & b)[](1; 2)").string) // [ ] の中が空でもよい
        assertEquals("12", eval("(a, b -> a & b)[1][2]()").string) // [ ] を連続して書いてもよい
        assertEquals("12", eval("{m: _, a, b -> a & b}{}::m[1](2)").string) // メソッド呼び出しにも使用できる
    }

    @Test
    fun infixCall() = runTest {
        assertEquals(5, eval("add := a, b -> a + b; 2 add 3").int) // identifierを使った中置関数呼び出し
        assertEquals(5, eval("add := a, b -> a + b; 2 `add` 3").int) // 引用符付きでもよい
        assertEquals(true, eval("lt := a, b -> a < b; 2  lt 3").boolean) // 論理値を返す中置換数
        assertEquals(false, eval("lt := a, b -> a < b; 2 !lt 3").boolean) // 否定中置換数
    }

    @Test
    fun arrowCall() = runTest {
        val evaluator = Evaluator()
        val daemonScope = CoroutineScope(coroutineContext + Job())
        try {
            evaluator.defineMounts(createCommonMounts(this, daemonScope) {})

            // _::_ でフォールバックメソッドを定義する
            """
                register := listener -> listener(23)
    
                Obj := {
                    register: this, listener -> listener(this.x + 3)
                }
                obj := Obj{x: 20}
            """.let { evaluator.run(it) }

            assertEquals(123, evaluator.get("register ( event => 100 + event )").int) // クロージャ付き関数呼び出し
            assertEquals(123, evaluator.get("register [ event => 100 + event ]()").int) // クロージャ付き関数の部分適用
            assertEquals(123, evaluator.get("obj::register ( event => 100 + event )").int) // クロージャ付きメソッド呼び出し
            assertEquals(123, evaluator.get("obj::register [ event => 100 + event ]()").int) // クロージャ付きメソッドの部分適用

            assertEquals(123, evaluator.get("register ( event => 9; 9; 9; 100 + event )").int) // クロージャは ; を文の区切りとして解釈する

            // クロージャがフレームを正しく生成することのテスト
            // 実行時に余計にフレームを追加している場合、 c のためのフレームが不足してエラーになる
            assertEquals(123, evaluator.get("(f -> f()) ( => (a := 100; (b := 20; c := 3; a + b + c)) )").int)

            // クロージャ直下で変数を宣言するテスト
            assertEquals(123, evaluator.get("(f -> f()) ( => a := 123; 123 )").int)
        } finally {
            daemonScope.cancel()
        }
    }

    @Test
    fun call() = runTest {
        assertEquals(6, eval("CALL(a, b -> a * b; [2; 3])").int) // 関数の呼び出し
        assertEquals(123, eval("CALL(() -> 123; [])").int) // 空の引数
        assertEquals(6, eval("CALL({m: a, b -> a.v * b}{v: 2}::m; [3])").int) // メソッド参照の呼び出し
    }

    @Test
    fun setCall() = runTest {

        // 代入呼び出しができる
        """
            value := NULL
            function := new -> value = new
            function() = 123
            value
        """.let { assertEquals(123, eval(it).int) }

        // 代入値は引数列の最後に受け取る
        """
            value := NULL
            function := a, new -> value = a + new
            function(100) = 23
            value
        """.let { assertEquals(123, eval(it).int) }

        // メソッドのオーバーライドが可能
        """
            value := NULL
            function := {
                `_(__)=_`: this, new -> value = new
            }{}
            function() = 123
            value
        """.let { assertEquals(123, eval(it).int) }

    }

    @Test
    fun backslashOperator() = runTest {
        // 前置 \ 演算子は _ -> body という1引数のラムダ式を作る
        assertEquals(10, eval("""(\10)(5)""").int) // 引数を無視して定数を返す
        assertEquals(5, eval("""(\(_))(5)""").int) // 引数をそのまま返す
        assertEquals(15, eval("""(\(_ + 10))(5)""").int) // 引数を使った計算
        assertEquals(50, eval("""(\(_ * 10))(5)""").int) // 引数を使った乗算
        assertEquals(3, eval("""(\(_ - 2))(5)""").int) // 引数から減算

        // 後置 \ 演算子も同様に動作する
        assertEquals(10, eval("""10.\(5)""").int) // 後置版: 定数を返す
        assertEquals(5, eval("""_.\(5)""").int) // 後置版: 引数をそのまま返す
        assertEquals(15, eval("""(_ + 10).\(5)""").int) // 後置版: 引数を使った計算
        assertEquals(3, eval("""(_ - 2).\(5)""").int) // 後置版: 引数から減算

        // 関数を変数に代入して使用
        assertEquals(15, eval("""f := \(_ + 10); f(5)""").int) // 変数に代入して使用
        assertEquals(20, eval("""g := \(_ * 2); g(10)""").int) // 別の変数で使用
    }

    @Test
    fun asteriskOperator() = runTest {
        // 前置 * 演算子は、 `_` の値を引数として関数を呼び出す
        assertEquals(10, eval("10 | *(x -> 10)").int) // 引数を無視して定数を返す
        assertEquals(10, eval("10 | *(x -> x)").int) // パイプで渡された値をそのまま返す
        assertEquals(15, eval("10 | *(x -> x + 5)").int) // パイプで渡された値に計算を行う

        // ストリームに対しても各要素を引数に呼び出せる
        assertEquals("[2;1;0;1;2]", eval("[ -2 .. 2 | *ABS ]").array())
    }

}
