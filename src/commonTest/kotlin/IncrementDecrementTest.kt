import kotlinx.coroutines.ExperimentalCoroutinesApi
import kotlinx.coroutines.test.runTest
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
    fun overrideSuffixIncrementTest() = runTest {
        // _++ メソッドをオーバーライド
        assertEquals(200, eval("""
            Obj := {
                `_++`: this -> {value: this.value * 2}
            }
            obj := Obj{value: 100}
            obj++
            obj.value
        """).int)
    }

    @Test
    fun overridePrefixIncrementTest() = runTest {
        // ++_ メソッドをオーバーライド
        assertEquals(300, eval("""
            Obj := {
                `++_`: this -> {value: this.value * 3}
            }
            obj := Obj{value: 100}
            ++obj
            obj.value
        """).int)
    }

    @Test
    fun overrideSuffixDecrementTest() = runTest {
        // _-- メソッドをオーバーライド
        // DIV関数を使って整数除算
        assertEquals(50, eval("""
            Obj := {
                `_--`: this -> {value: DIV(this.value; 2)}
            }
            obj := Obj{value: 100}
            obj--
            obj.value
        """).int)
    }

    @Test
    fun overridePrefixDecrementTest() = runTest {
        // --_ メソッドをオーバーライド
        assertEquals(25, eval("""
            Obj := {
                `--_`: this -> {value: DIV(this.value; 4)}
            }
            obj := Obj{value: 100}
            --obj
            obj.value
        """).int)
    }

    @Test
    fun suffixIncrementReturnValueTest() = runTest {
        // _++ の戻り値は後置版の戻り値として使われる（古い値を返す）
        assertEquals(100, eval("""
            Obj := {
                `_++`: this -> {value: this.value * 2}
            }
            obj := Obj{value: 100}
            result := obj++
            result.value
        """).int)
    }

    @Test
    fun prefixIncrementReturnValueTest() = runTest {
        // ++_ の戻り値は前置版の戻り値として使われる（新しい値を返す）
        assertEquals(300, eval("""
            Obj := {
                `++_`: this -> {value: this.value * 3}
            }
            obj := Obj{value: 100}
            result := ++obj
            result.value
        """).int)
    }

    @Test
    fun prefixIncrementFallbackToSuffixTest() = runTest {
        // ++_ が無ければ _++ にフォールバック
        assertEquals(200, eval("""
            Obj := {
                `_++`: this -> {value: this.value * 2}
            }
            obj := Obj{value: 100}
            ++obj
            obj.value
        """).int)
    }

    @Test
    fun incrementFallbackToPlusAssignTest() = runTest {
        // _++ が無ければ _+=_ にフォールバック
        assertEquals(110, eval("""
            Obj := {
                `_+=_`: this, value -> {value: this.value + value * 10}
            }
            obj := Obj{value: 100}
            obj++
            obj.value
        """).int)
    }

    @Test
    fun incrementFallbackToPlusTest() = runTest {
        // _+=_ も無ければ _+_ にフォールバック
        assertEquals(123, eval("""
            Obj := {
                `_+_`: this, value -> {value: this.value + value * 23}
            }
            obj := Obj{value: 100}
            obj++
            obj.value
        """).int)
    }

    @Test
    fun decrementFallbackToMinusAssignTest() = runTest {
        // _-- が無ければ _-=_ にフォールバック
        assertEquals(90, eval("""
            Obj := {
                `_-=_`: this, value -> {value: this.value - value * 10}
            }
            obj := Obj{value: 100}
            obj--
            obj.value
        """).int)
    }

    // NOTE: decrementFallbackToMinusTestは削除
    // FluoriteObjectにはデフォルトで_-=_が定義されているため、
    // 通常のオブジェクトでは_-_にフォールバックすることはありません。
    // _-_へのフォールバックは、_-=_が定義されていない特殊な型でのみ発生します。
}
