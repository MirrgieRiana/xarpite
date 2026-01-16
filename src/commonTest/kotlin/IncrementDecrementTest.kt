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
    fun suffixIncrementOverrideTest() = runTest {
        // _++ メソッドでオーバーライドできる
        assertEquals(200, eval("""
            Obj := {
                `_++`: this -> (this.value = this.value * 2)
            }
            obj := Obj{value: 100}
            obj++
            obj.value
        """).int)
    }

    @Test
    fun prefixIncrementOverrideTest() = runTest {
        // ++_ メソッドでオーバーライドできる
        assertEquals(300, eval("""
            Obj := {
                `++_`: this -> (this.value = this.value * 3)
            }
            obj := Obj{value: 100}
            ++obj
            obj.value
        """).int)
    }

    @Test
    fun prefixIncrementFallbackToSuffixTest() = runTest {
        // 前置版 ++a は ++_ メソッドがなければ _++ にフォールバック
        assertEquals(200, eval("""
            Obj := {
                `_++`: this -> (this.value = this.value * 2)
            }
            obj := Obj{value: 100}
            ++obj
            obj.value
        """).int)
    }

    @Test
    fun incrementFallbackToPlusAssignTest() = runTest {
        // インクリメントは _++ がなければ _+=_ にフォールバック（右辺はINTの1で固定）
        assertEquals(101, eval("""
            Obj := {
                `_+=_`: this, value -> (this.value = this.value + value)
            }
            obj := Obj{value: 100}
            obj++
            obj.value
        """).int)
    }

    @Test
    fun incrementFallbackToPlusTest() = runTest {
        // インクリメントは _+=_ もなければ _+_ にフォールバック
        assertEquals(101, eval("""
            Obj := {
                `_+_`: this, value -> Obj{value: this.value + value}
            }
            obj := Obj{value: 100}
            obj++
            obj.value
        """).int)
    }

    @Test
    fun suffixDecrementOverrideTest() = runTest {
        // _-- メソッドでオーバーライドできる
        assertEquals(50, eval("""
            Obj := {
                `_--`: this -> (this.value = this.value / 2)
            }
            obj := Obj{value: 100}
            obj--
            obj.value
        """).int)
    }

    @Test
    fun prefixDecrementOverrideTest() = runTest {
        // --_ メソッドでオーバーライドできる
        assertEquals(33, eval("""
            Obj := {
                `--_`: this -> (this.value = this.value / 3)
            }
            obj := Obj{value: 100}
            --obj
            obj.value
        """).int)
    }

    @Test
    fun prefixDecrementFallbackToSuffixTest() = runTest {
        // 前置版 --a は --_ メソッドがなければ _-- にフォールバック
        assertEquals(50, eval("""
            Obj := {
                `_--`: this -> (this.value = this.value / 2)
            }
            obj := Obj{value: 100}
            --obj
            obj.value
        """).int)
    }

    @Test
    fun decrementFallbackToMinusAssignTest() = runTest {
        // デクリメントは _-- がなければ _-=_ にフォールバック（右辺はINTの1で固定）
        assertEquals(99, eval("""
            Obj := {
                `_-=_`: this, value -> (this.value = this.value - value)
            }
            obj := Obj{value: 100}
            obj--
            obj.value
        """).int)
    }

    @Test
    fun decrementFallbackToMinusTest() = runTest {
        // デクリメントは _-=_ もなければ _-_ にフォールバック
        assertEquals(99, eval("""
            Obj := {
                `_-_`: this, value -> Obj{value: this.value - value}
            }
            obj := Obj{value: 100}
            obj--
            obj.value
        """).int)
    }
}
