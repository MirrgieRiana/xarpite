import kotlinx.coroutines.ExperimentalCoroutinesApi
import kotlinx.coroutines.test.runTest
import mirrg.xarpite.test.array
import mirrg.xarpite.test.eval
import mirrg.xarpite.test.int
import kotlin.test.Test
import kotlin.test.assertEquals

@OptIn(ExperimentalCoroutinesApi::class)
class IncrementDecrementTest {

    @Test
    fun prefixIncrementTest() = runTest {
        // 前置 ++ は変数に1を加算し、新しい値を返す
        assertEquals(11, eval("a := 10; ++a").int)
        assertEquals(11, eval("a := 10; ++a; a").int)
    }

    @Test
    fun postfixIncrementTest() = runTest {
        // 後置 ++ は変数に1を加算し、古い値を返す
        assertEquals(10, eval("a := 10; a++").int)
        assertEquals(11, eval("a := 10; a++; a").int)
    }

    @Test
    fun prefixDecrementTest() = runTest {
        // 前置 -- は変数から1を減算し、新しい値を返す
        assertEquals(9, eval("a := 10; --a").int)
        assertEquals(9, eval("a := 10; --a; a").int)
    }

    @Test
    fun postfixDecrementTest() = runTest {
        // 後置 -- は変数から1を減算し、古い値を返す
        assertEquals(10, eval("a := 10; a--").int)
        assertEquals(9, eval("a := 10; a--; a").int)
    }

    @Test
    fun postfixOfPrefixIncrementTest() = runTest {
        // a.++ は「後置版前置演算子」で、前置版と同じ挙動（新しい値を返す）
        assertEquals(11, eval("a := 10; a.++").int)
        assertEquals(11, eval("a := 10; a.++; a").int)
    }

    @Test
    fun postfixOfPrefixDecrementTest() = runTest {
        // a.-- は「後置版前置演算子」で、前置版と同じ挙動（新しい値を返す）
        assertEquals(9, eval("a := 10; a.--").int)
        assertEquals(9, eval("a := 10; a.--; a").int)
    }

    @Test
    fun incrementInExpressionTest() = runTest {
        // 式の中で使用できる
        assertEquals(21, eval("a := 10; ++a + 10").int)
        assertEquals(20, eval("a := 10; a++ + 10").int)
        assertEquals(11, eval("a := 10; a++ + 10; a").int)
    }

    @Test
    fun decrementInExpressionTest() = runTest {
        // 式の中で使用できる
        assertEquals(19, eval("a := 10; --a + 10").int)
        assertEquals(20, eval("a := 10; a-- + 10").int)
        assertEquals(9, eval("a := 10; a-- + 10; a").int)
    }

    @Test
    fun doubleIncrementTest() = runTest {
        // 浮動小数点数でも動作する
        assertEquals("11.5", eval("a := 10.5; ++a").toString())
        assertEquals("10.5", eval("a := 10.5; a++").toString())
        assertEquals("11.5", eval("a := 10.5; a++; a").toString())
    }

    @Test
    fun nonNumericIncrementTest() = runTest {
        // 数値以外の型でも動作する（加算が定義されていれば）
        assertEquals("abc1", eval("s := \"abc\"; s++; s").toString())
    }

    @Test
    fun postfixIncrementOverrideTest() = runTest {
        // _++ によるオーバーライド
        assertEquals(
            "[123;15]",
            eval(
                """
                    counter := 10
                    Obj := {`_++`: this -> (counter = counter + 5; 123)}
                    obj := Obj{}
                    result := obj++
                    [result; counter]
                """.trimIndent(),
            ).array(),
        )
    }

    @Test
    fun prefixIncrementOverrideTest() = runTest {
        // ++_ が優先される
        assertEquals(
            "[200;3]",
            eval(
                """
                    counter := 1
                    Obj := {`++_`: this -> (counter = counter + 2; 200), `_++`: this -> (counter = counter + 5; 500)}
                    obj := Obj{}
                    result := ++obj
                    [result; counter]
                """.trimIndent(),
            ).array(),
        )
    }

    @Test
    fun prefixIncrementFallbackToPostfixTest() = runTest {
        // ++_ が無い場合は _++ にフォールバック
        assertEquals(
            "[123;15]",
            eval(
                """
                    counter := 10
                    Obj := {`_++`: this -> (counter = counter + 5; 123)}
                    obj := Obj{}
                    result := ++obj
                    [result; counter]
                """.trimIndent(),
            ).array(),
        )
    }

    @Test
    fun incrementFallbackToPlusAssignTest() = runTest {
        // _+=_ にフォールバックする
        assertEquals(
            11,
            eval(
                """
                    counter := 1
                    Obj := {`_+=_`: this, other -> (counter = counter + other + 9), `_+_`: this, other -> (counter = counter + other)}
                    obj := Obj{}
                    obj++
                    counter
                """.trimIndent(),
            ).int,
        )
    }

    @Test
    fun incrementFallbackToPlusTest() = runTest {
        // _+_ にフォールバックする
        assertEquals(
            "[7;7]",
            eval(
                """
                    counter := 1
                    Obj := {`_+_`: this, other -> (counter = counter + other + 5; counter)}
                    obj := Obj{}
                    obj++
                    [obj; counter]
                """.trimIndent(),
            ).array(),
        )
    }

    @Test
    fun postfixDecrementOverrideTest() = runTest {
        // _-- によるオーバーライド
        assertEquals(
            "[321;6]",
            eval(
                """
                    counter := 10
                    Obj := {`_--`: this -> (counter = counter - 4; 321)}
                    obj := Obj{}
                    result := obj--
                    [result; counter]
                """.trimIndent(),
            ).array(),
        )
    }

    @Test
    fun prefixDecrementOverrideTest() = runTest {
        // --_ が優先される
        assertEquals(
            "[400;8]",
            eval(
                """
                    counter := 10
                    Obj := {`--_`: this -> (counter = counter - 2; 400), `_--`: this -> (counter = counter - 5; 500)}
                    obj := Obj{}
                    result := --obj
                    [result; counter]
                """.trimIndent(),
            ).array(),
        )
    }

    @Test
    fun prefixDecrementFallbackToPostfixTest() = runTest {
        // --_ が無い場合は _-- にフォールバック
        assertEquals(
            "[321;6]",
            eval(
                """
                    counter := 10
                    Obj := {`_--`: this -> (counter = counter - 4; 321)}
                    obj := Obj{}
                    result := --obj
                    [result; counter]
                """.trimIndent(),
            ).array(),
        )
    }

    @Test
    fun decrementFallbackToMinusAssignTest() = runTest {
        // _-=_ にフォールバックする
        assertEquals(
            0,
            eval(
                """
                    counter := 10
                    Obj := {`_-=_`: this, other -> (counter = counter - other - 9), `_-_`: this, other -> (counter = counter - other)}
                    obj := Obj{}
                    obj--
                    counter
                """.trimIndent(),
            ).int,
        )
    }

    @Test
    fun decrementFallbackToMinusTest() = runTest {
        // _-_ にフォールバックする
        assertEquals(
            "[3;3]",
            eval(
                """
                    counter := 10
                    Obj := {`_-_`: this, other -> (counter = counter - other - 6; counter)}
                    obj := Obj{}
                    obj--
                    [obj; counter]
                """.trimIndent(),
            ).array(),
        )
    }
}
