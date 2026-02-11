import kotlinx.coroutines.ExperimentalCoroutinesApi
import kotlinx.coroutines.test.runTest
import mirrg.xarpite.Position
import mirrg.xarpite.StackTrace
import mirrg.xarpite.operations.FluoriteException
import mirrg.xarpite.test.eval
import mirrg.xarpite.test.int
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertFailsWith
import kotlin.test.assertNotNull
import kotlin.test.assertTrue

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

    @Test
    fun incrementWithoutSetterRequiresMethodTest() = runTest {
        // 代入不可能な式でオーバーライドメソッドが必要
        assertFailsWith<Exception> {
            eval("10++")
        }
    }

    @Test
    fun incrementErrorPositionTest() = runTest {
        // ++ のエラーポジションが正しく報告されることを確認
        val exception = assertFailsWith<FluoriteException> {
            eval("( 1++ )")
        }
        // スタックトレースが設定されていることを確認
        val stackTrace = exception.stackTrace
        assertNotNull(stackTrace, "Stack trace should be set")
        assertTrue(stackTrace.isNotEmpty(), "Stack trace should not be empty")
        
        // 最初のポジションが ++ 演算子の位置（index 3）を指していることを確認
        val firstPosition = stackTrace.first()
        assertNotNull(firstPosition, "First position should not be null")
        assertEquals(3, firstPosition.index, "Error should point to ++ operator at index 3")
    }

    @Test
    fun decrementErrorPositionTest() = runTest {
        // -- のエラーポジションが正しく報告されることを確認
        val exception = assertFailsWith<FluoriteException> {
            eval("( 1-- )")
        }
        // スタックトレースが設定されていることを確認
        val stackTrace = exception.stackTrace
        assertNotNull(stackTrace, "Stack trace should be set")
        assertTrue(stackTrace.isNotEmpty(), "Stack trace should not be empty")
        
        // 最初のポジションが -- 演算子の位置（index 3）を指していることを確認
        val firstPosition = stackTrace.first()
        assertNotNull(firstPosition, "First position should not be null")
        assertEquals(3, firstPosition.index, "Error should point to -- operator at index 3")
    }

    @Test
    fun prefixIncrementErrorPositionTest() = runTest {
        // 前置 ++ のエラーポジションが正しく報告されることを確認
        val exception = assertFailsWith<FluoriteException> {
            eval("( ++1 )")
        }
        // スタックトレースが設定されていることを確認
        val stackTrace = exception.stackTrace
        assertNotNull(stackTrace, "Stack trace should be set")
        assertTrue(stackTrace.isNotEmpty(), "Stack trace should not be empty")
        
        // 最初のポジションが ++ 演算子の位置（index 2）を指していることを確認
        val firstPosition = stackTrace.first()
        assertNotNull(firstPosition, "First position should not be null")
        assertEquals(2, firstPosition.index, "Error should point to ++ operator at index 2")
    }

    @Test
    fun incrementOnNonAssignableExpressionTest() = runTest {
        // 代入不可能な式でもオーバーライドメソッドがあれば動作する
        // ミュータブルな値の改変操作として定義される
        assertEquals(101, eval("""
            MutableCounter := {
                `_++`: this, accessor -> (
                    this.value++
                    this.value
                )
            }
            MutableCounter{value: 100}++
        """).int)
    }

    @Test
    fun accessorWithoutSetterCanOnlyGetTest() = runTest {
        // setter無しの場合、アクセサは取得のみ可能
        assertEquals(100, eval("""
            Object := {
                `_++`: this, accessor -> (
                    accessor().value
                )
            }
            Object{value: 100}++
        """).int)
    }

    @Test
    fun accessorWithoutSetterCannotSetTest() = runTest {
        // setter無しの場合、アクセサは代入不可
        assertFailsWith<Exception> {
            eval("""
                Object := {
                    `_++`: this, accessor -> (
                        accessor({value: 200})
                    )
                }
                Object{value: 100}++
            """)
        }
    }
}
