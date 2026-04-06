import kotlinx.coroutines.ExperimentalCoroutinesApi
import kotlinx.coroutines.test.runTest
import mirrg.xarpite.UnsupportedIoContext
import mirrg.xarpite.compilers.objects.FluoriteNull
import mirrg.xarpite.mounts.createCommonMounts
import mirrg.xarpite.test.array
import mirrg.xarpite.test.boolean
import mirrg.xarpite.test.eval
import mirrg.xarpite.test.get
import mirrg.xarpite.test.int
import mirrg.xarpite.test.run
import mirrg.xarpite.test.string
import mirrg.xarpite.withEvaluator
import kotlin.test.Test
import kotlin.test.assertEquals

@OptIn(ExperimentalCoroutinesApi::class)
class IndentBlockTest {

    // region 基本動作

    @Test
    fun basicIndentBlock() = runTest {
        // : の後に改行＋インデントで式を書ける
        assertEquals(10, eval(":\n  10").int)

        // インデントブロック内で複数文を書ける（改行がセミコロン相当）
        assertEquals(3, eval(":\n  1\n  2\n  3").int)
    }

    @Test
    fun indentBlockEmpty() = runTest {
        // 空のインデントブロック（: の後に中身なし）を評価するとFluoriteNull（NULL値）になる
        assertEquals(FluoriteNull, eval(":\n"))
    }

    @Test
    fun indentBlockSingleExpression() = runTest {
        // インデントブロック内に1つの式だけ
        assertEquals(42, eval(":\n  42").int)
        assertEquals("hello", eval(":\n  \"hello\"").string)
    }

    @Test
    fun indentBlockMultipleStatements() = runTest {
        // インデントブロック内で変数宣言と計算を組み合わせる
        assertEquals(123, eval(":\n  a := 100\n  b := 20\n  c := 3\n  a + b + c").int)
    }

    @Test
    fun indentBlockRetainsScope() = runTest {
        // インデントブロックは独自のスコープを持つ
        assertEquals(10, eval(":\n  a := 10\n  a").int)
    }

    // endregion

    // region インデントの種類

    @Test
    fun indentBlockTabIndent() = runTest {
        // タブでもインデントできる
        assertEquals(10, eval(":\n\t10").int)
        assertEquals(3, eval(":\n\t1\n\t2\n\t3").int)
    }

    @Test
    fun indentBlockDeeperIndent() = runTest {
        // 2文字以上のインデント幅でもよい
        assertEquals(10, eval(":\n    10").int)
        assertEquals(10, eval(":\n        10").int)
    }

    // endregion

    // region ネスト

    @Test
    fun indentBlockNested() = runTest {
        // インデントブロックをネストできる
        assertEquals(30, eval(":\n  a := 10\n  b :=:\n    a * 2\n  a + b").int)
    }

    @Test
    fun indentBlockDeepNest() = runTest {
        // 深くネストしたインデントブロック
        assertEquals(6, eval(":\n  a := 1\n  :\n    b := 2\n    :\n      c := 3\n      a + b + c").int)
    }

    // endregion

    // region 演算子との組み合わせ

    @Test
    fun indentBlockInAssignment() = runTest {
        // 変数の右辺にインデントブロックを使用できる
        assertEquals(30, eval("a :=:\n  10 + 20\na").int)
    }

    @Test
    fun indentBlockInColonEqualAssignment() = runTest {
        // := の右辺にインデントブロックを使用し、複数文を書ける
        assertEquals(30, eval("a :=:\n  b := 10\n  c := 20\n  b + c\na").int)
    }

    @Test
    fun indentBlockInOrOperator() = runTest {
        // || の右辺にインデントブロックを使用できる
        assertEquals(10, eval("NULL ||:\n  10").int)
        assertEquals(5, eval("5 ||:\n  10").int)
    }

    @Test
    fun indentBlockInAndOperator() = runTest {
        // && の右辺にインデントブロックを使用できる
        assertEquals(10, eval("TRUE &&:\n  10").int)
    }

    @Test
    fun indentBlockWithPipe() = runTest {
        // パイプ演算子との組み合わせ
        assertEquals(6, eval(":\n  1 .. 3 >> SUM").int)
    }

    @Test
    fun indentBlockWithArithmetic() = runTest {
        // 算術演算子との組み合わせ
        assertEquals(15, eval(":\n  10 + 5").int)
        assertEquals(50, eval(":\n  10 * 5").int)
    }

    @Test
    fun indentBlockWithComparison() = runTest {
        // 比較演算子との組み合わせ
        assertEquals(true, eval(":\n  10 > 5").boolean)
        assertEquals(false, eval(":\n  10 < 5").boolean)
    }

    @Test
    fun indentBlockAfterBlock() = runTest {
        // インデントブロックの後に通常の式が続く場合
        assertEquals(30, eval("a :=:\n  10\nb :=:\n  20\na + b").int)
    }

    // endregion

    // region 関数とラムダ

    @Test
    fun indentBlockAsArgument() = runTest {
        // インデントブロックを関数の引数として使用
        assertEquals(10, eval("(a -> a)(:\n  10\n)").int)
    }

    @Test
    fun indentBlockInFunctionBody() = runTest {
        // 関数の本体にインデントブロックをネストして使用する
        // スコープが分離されるため、外側の変数をキャプチャしない
        assertEquals(10, eval("f := () ->:\n  10\nf()").int)
    }

    // endregion

    // region 制御構造

    @Test
    fun indentBlockWithWhileLoop() = runTest {
        // 既存の括弧構文を使ったWHILEループが引き続き動作する
        """
            i := 0
            WHILE [ => i < 5 ] ( =>
                i = i + 1
            )
            i
        """.let { assertEquals(5, eval(it).int) }
    }

    @Test
    fun indentBlockWithExceptionHandling() = runTest {
        // 例外処理にインデントブロックを使用する
        assertEquals(42, eval(":\n  42 !? 0").int)
    }

    // endregion

    // region 既存構文との互換性

    @Test
    fun indentBlockPreservesExistingSyntax() = runTest {
        // 既存の括弧構文が引き続き動作する
        assertEquals(10, eval("(10)").int)
        assertEquals(10, eval("(a -> a)(10)").int)
        assertEquals(123, eval("(a := 100; b := 20; c := 3; a + b + c)").int)
    }

    @Test
    fun indentBlockPreservesExistingMultiline() = runTest {
        // 既存の複数行を使った括弧構文が引き続き動作する
        """
            (
                a := 100
                b := 20
                c := 3
                a + b + c
            )
        """.let { assertEquals(123, eval(it).int) }
    }

    @Test
    fun indentBlockPreservesArrowLiteral() = runTest {
        // 既存のアロー構文が引き続き動作する
        withEvaluator(UnsupportedIoContext()) { context, evaluator ->
            evaluator.defineMounts(context.run { createCommonMounts() })
            evaluator.run("register := listener -> listener(23)")

            assertEquals(123, evaluator.get("register ( event => 100 + event )").int)
            assertEquals(123, evaluator.get("register [ event => 100 + event ]()").int)
        }
    }

    @Test
    fun indentBlockPreservesMultilineArrowLiteral() = runTest {
        // 複数行のアロー構文が引き続き動作する
        withEvaluator(UnsupportedIoContext()) { context, evaluator ->
            evaluator.defineMounts(context.run { createCommonMounts() })
            evaluator.run("register := listener -> listener(23)")

            assertEquals(123, evaluator.get("""
                register ( event =>
                    100 + event
                )
            """).int)
        }
    }

    @Test
    fun indentBlockPreservesConditional() = runTest {
        // 既存の条件演算子が引き続き動作する
        assertEquals(10, eval("TRUE ? 10 : 20").int)
        assertEquals(20, eval("FALSE ? 10 : 20").int)
    }

    @Test
    fun indentBlockPreservesElvis() = runTest {
        // 既存のエルビス演算子が引き続き動作する
        assertEquals(10, eval("NULL ?: 10").int)
        assertEquals(5, eval("5 ?: 10").int)
    }

    @Test
    fun indentBlockPreservesObjectLiteral() = runTest {
        // 既存のオブジェクトリテラル構文が引き続き動作する
        assertEquals("{a:1}", eval("&{a: 1}").string)
    }

    @Test
    fun indentBlockPreservesArrayLiteral() = runTest {
        // 既存の配列リテラル構文が引き続き動作する
        assertEquals("[1;2;3]", eval("&[1; 2; 3]").string)
    }

    @Test
    fun indentBlockPreservesBindSyntax() = runTest {
        // 既存のバインド構文が引き続き動作する
        assertEquals("12", eval("(a, b -> a & b)[1](2)").string)
    }

    @Test
    fun indentBlockPreservesLabelReturn() = runTest {
        // 既存のラベル・リターンが引き続き動作する
        """
            i := 0
            WHILE [ => i < 100 ] ( =>
                i == 3 && break!!
                i = i + 1
            ) !: break
            i
        """.let { assertEquals(3, eval(it).int) }
    }

    // endregion

    // region 実用的なパターン

    @Test
    fun indentBlockSequentialCalculation() = runTest {
        // 連続した計算を行う実用的な例
        assertEquals(55, eval(":\n  sum := 0\n  i := 1\n  sum = sum + i\n  i = i + 1\n  sum = sum + i\n  i = i + 1\n  sum = sum + i\n  i = i + 1\n  sum = sum + i\n  i = i + 1\n  sum = sum + i\n  i = i + 1\n  sum = sum + i\n  i = i + 1\n  sum = sum + i\n  i = i + 1\n  sum = sum + i\n  i = i + 1\n  sum = sum + i\n  i = i + 1\n  sum = sum + i\n  sum").int)
    }

    @Test
    fun indentBlockStringConcat() = runTest {
        // 文字列連結を行う実用的な例
        assertEquals("HelloWorld", eval(":\n  a := \"Hello\"\n  b := \"World\"\n  a & b").string)
    }

    @Test
    fun indentBlockWithNestedFunctions() = runTest {
        // ネストした関数定義と呼び出し
        assertEquals(25, eval(":\n  square := x -> x * x\n  square(5)").int)
    }

    // endregion
}
