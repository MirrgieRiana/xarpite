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
    fun mutableCounterIncrementTest() = runTest {
        // MutableCounter: オブジェクト自体を改変するインクリメント
        assertEquals(1, eval("""
            MutableCounter := {
                new := value -> MutableCounter{value: value}
                `_++`: this, accessor -> (
                    this.value++
                )
            }
            old := MutableCounter.new(0)
            new := old
            new++
            old.value
        """).int)

        // 同じオブジェクトを参照しているため、oldもnewも同じ値
        assertEquals(1, eval("""
            MutableCounter := {
                new := value -> MutableCounter{value: value}
                `_++`: this, accessor -> (
                    this.value++
                )
            }
            old := MutableCounter.new(0)
            new := old
            new++
            new.value
        """).int)
    }

    @Test
    fun immutableCounterIncrementTest() = runTest {
        // ImmutableCounter: オブジェクトは不変で、新しいオブジェクトを代入
        assertEquals(0, eval("""
            ImmutableCounter := {
                new := value -> ImmutableCounter{value: value}
                `_++`: this, accessor -> (
                    accessor(new(this.value + 1))
                )
            }
            old := ImmutableCounter.new(0)
            new := old
            new++
            old.value
        """).int)

        // 新しいオブジェクトが代入されるため、oldとnewは異なる値
        assertEquals(1, eval("""
            ImmutableCounter := {
                new := value -> ImmutableCounter{value: value}
                `_++`: this, accessor -> (
                    accessor(new(this.value + 1))
                )
            }
            old := ImmutableCounter.new(0)
            new := old
            new++
            new.value
        """).int)
    }

    @Test
    fun prefixPostfixIndependenceTest() = runTest {
        // 前置版と後置版は独立しており、片方がもう片方にフォールバックしない
        assertEquals("suffix", eval("""
            Object := {
                `_++`: this, accessor -> "suffix"
                `++_`: this, accessor -> "prefix"
            }
            obj := Object{value: 0}
            obj++
        """).toString())

        assertEquals("prefix", eval("""
            Object := {
                `_++`: this, accessor -> "suffix"
                `++_`: this, accessor -> "prefix"
            }
            obj := Object{value: 0}
            ++obj
        """).toString())
    }

    @Test
    fun overrideIncrementWithAccessorTest() = runTest {
        // アクセサを使用して値を取得・設定できる
        assertEquals(100, eval("""
            Object := {
                `_++`: this, accessor -> (
                    oldObj := accessor()
                    newVal := oldObj.value * 2
                    accessor({value: newVal})
                    oldObj.value
                )
            }
            obj := Object{value: 100}
            obj++
        """).int)

        // 変数が更新されている
        assertEquals(200, eval("""
            Object := {
                `_++`: this, accessor -> (
                    oldObj := accessor()
                    newVal := oldObj.value * 2
                    accessor({value: newVal})
                    oldObj.value
                )
            }
            obj := Object{value: 100}
            obj++
            obj.value
        """).int)
    }

    @Test
    fun overrideDecrementWithAccessorTest() = runTest {
        // デクリメントでもアクセサを使用できる
        assertEquals(100, eval("""
            Object := {
                `_--`: this, accessor -> (
                    oldObj := accessor()
                    newVal := DIV(oldObj.value; 2)
                    accessor({value: newVal})
                    oldObj.value
                )
            }
            obj := Object{value: 100}
            obj--
        """).int)

        // 変数が更新されている
        assertEquals(50, eval("""
            Object := {
                `_--`: this, accessor -> (
                    oldObj := accessor()
                    newVal := DIV(oldObj.value; 2)
                    accessor({value: newVal})
                    oldObj.value
                )
            }
            obj := Object{value: 100}
            obj--
            obj.value
        """).int)
    }
}
