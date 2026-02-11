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
class CompoundAssignmentTest {

    @Test
    fun plusAssignmentBasicTest() = runTest {
        // += は変数に値を加算する
        assertEquals(123, eval("a := 100; a += 23; a").int)
    }

    @Test
    fun minusAssignmentBasicTest() = runTest {
        // -= は変数から値を減算する
        assertEquals(77, eval("a := 100; a -= 23; a").int)
    }

    @Test
    fun plusAssignmentReturnValueTest() = runTest {
        // += はオーバーライドメソッドがない場合、右辺値を返す
        assertEquals(23, eval("a := 100; a += 23").int)
    }

    @Test
    fun minusAssignmentReturnValueTest() = runTest {
        // -= はオーバーライドメソッドがない場合、右辺値を返す
        assertEquals(23, eval("a := 100; a -= 23").int)
    }

    @Test
    fun mutableCounterPlusAssignmentTest() = runTest {
        // MutableCounter: オブジェクト自体を改変する演算代入
        assertEquals(10, eval("""
            MutableCounter := {
                new := value -> MutableCounter{value: value}
                `_+=_`: this, amount, accessor -> (
                    this.value += amount
                )
            }
            old := MutableCounter.new(0)
            new := old
            new += 10
            old.value
        """).int)

        // 同じオブジェクトを参照しているため、oldもnewも同じ値
        assertEquals(10, eval("""
            MutableCounter := {
                new := value -> MutableCounter{value: value}
                `_+=_`: this, amount, accessor -> (
                    this.value += amount
                )
            }
            old := MutableCounter.new(0)
            new := old
            new += 10
            new.value
        """).int)
    }

    @Test
    fun immutableCounterPlusAssignmentTest() = runTest {
        // ImmutableCounter: オブジェクトは不変で、新しいオブジェクトを代入
        assertEquals(0, eval("""
            ImmutableCounter := {
                new := value -> ImmutableCounter{value: value}
                `_+=_`: this, amount, accessor -> (
                    accessor(new(this.value + amount))
                )
            }
            old := ImmutableCounter.new(0)
            new := old
            new += 10
            old.value
        """).int)

        // 新しいオブジェクトが代入されるため、oldとnewは異なる値
        assertEquals(10, eval("""
            ImmutableCounter := {
                new := value -> ImmutableCounter{value: value}
                `_+=_`: this, amount, accessor -> (
                    accessor(new(this.value + amount))
                )
            }
            old := ImmutableCounter.new(0)
            new := old
            new += 10
            new.value
        """).int)
    }

    @Test
    fun mutableCounterMinusAssignmentTest() = runTest {
        // MutableCounter: -= でも同様に動作
        assertEquals(40, eval("""
            MutableCounter := {
                new := value -> MutableCounter{value: value}
                `_-=_`: this, amount, accessor -> (
                    this.value -= amount
                )
            }
            old := MutableCounter.new(100)
            new := old
            new -= 60
            old.value
        """).int)
    }

    @Test
    fun immutableCounterMinusAssignmentTest() = runTest {
        // ImmutableCounter: -= でも同様に動作
        assertEquals(100, eval("""
            ImmutableCounter := {
                new := value -> ImmutableCounter{value: value}
                `_-=_`: this, amount, accessor -> (
                    accessor(new(this.value - amount))
                )
            }
            old := ImmutableCounter.new(100)
            new := old
            new -= 60
            old.value
        """).int)

        assertEquals(40, eval("""
            ImmutableCounter := {
                new := value -> ImmutableCounter{value: value}
                `_-=_`: this, amount, accessor -> (
                    accessor(new(this.value - amount))
                )
            }
            old := ImmutableCounter.new(100)
            new := old
            new -= 60
            new.value
        """).int)
    }

    @Test
    fun overridePlusAssignmentWithAccessorTest() = runTest {
        // アクセサを使用して値を取得・設定できる
        assertEquals(100, eval("""
            Object := {
                `_+=_`: this, amount, accessor -> (
                    oldObj := accessor()
                    newVal := oldObj.value * 2
                    accessor({value: newVal})
                    oldObj.value
                )
            }
            obj := Object{value: 100}
            obj += 50
        """).int)

        // 変数が更新されている
        assertEquals(200, eval("""
            Object := {
                `_+=_`: this, amount, accessor -> (
                    oldObj := accessor()
                    newVal := oldObj.value * 2
                    accessor({value: newVal})
                    oldObj.value
                )
            }
            obj := Object{value: 100}
            obj += 50
            obj.value
        """).int)
    }

    @Test
    fun overrideMinusAssignmentWithAccessorTest() = runTest {
        // -= でもアクセサを使用できる
        assertEquals(100, eval("""
            Object := {
                `_-=_`: this, amount, accessor -> (
                    oldObj := accessor()
                    newVal := DIV(oldObj.value; 2)
                    accessor({value: newVal})
                    oldObj.value
                )
            }
            obj := Object{value: 100}
            obj -= 40
        """).int)

        // 変数が更新されている
        assertEquals(50, eval("""
            Object := {
                `_-=_`: this, amount, accessor -> (
                    oldObj := accessor()
                    newVal := DIV(oldObj.value; 2)
                    accessor({value: newVal})
                    oldObj.value
                )
            }
            obj := Object{value: 100}
            obj -= 40
            obj.value
        """).int)
    }

    @Test
    fun plusAssignmentWithoutSetterRequiresMethodTest() = runTest {
        // 代入不可能な式でオーバーライドメソッドが必要
        assertFailsWith<Exception> {
            eval("10 += 5")
        }
    }

    @Test
    fun plusAssignmentErrorPositionTest() = runTest {
        // += のエラーポジションが正しく報告されることを確認
        val exception = assertFailsWith<FluoriteException> {
            eval("( 1 += 2 )")
        }
        // スタックトレースが設定されていることを確認
        val stackTrace = exception.stackTrace
        assertNotNull(stackTrace, "Stack trace should be set")
        assertTrue(stackTrace.isNotEmpty(), "Stack trace should not be empty")
        
        // 最初のポジションが += 演算子の位置（index 4）を指していることを確認
        val firstPosition = stackTrace.first()
        assertNotNull(firstPosition, "First position should not be null")
        assertEquals(4, firstPosition.index, "Error should point to += operator at index 4")
    }

    @Test
    fun minusAssignmentErrorPositionTest() = runTest {
        // -= のエラーポジションが正しく報告されることを確認
        val exception = assertFailsWith<FluoriteException> {
            eval("( 1 -= 2 )")
        }
        // スタックトレースが設定されていることを確認
        val stackTrace = exception.stackTrace
        assertNotNull(stackTrace, "Stack trace should be set")
        assertTrue(stackTrace.isNotEmpty(), "Stack trace should not be empty")
        
        // 最初のポジションが -= 演算子の位置（index 4）を指していることを確認
        val firstPosition = stackTrace.first()
        assertNotNull(firstPosition, "First position should not be null")
        assertEquals(4, firstPosition.index, "Error should point to -= operator at index 4")
    }

    @Test
    fun plusAssignmentOnNonAssignableExpressionTest() = runTest {
        // 代入不可能な式でもオーバーライドメソッドがあれば動作する
        // ミュータブルな値の改変操作として定義される
        assertEquals(123, eval("""
            MutableCounter := {
                `_+=_`: this, amount, accessor -> (
                    this.value += amount
                    this.value
                )
            }
            MutableCounter{value: 100} += 23
        """).int)
    }

    @Test
    fun minusAssignmentOnNonAssignableExpressionTest() = runTest {
        // -= でも同様に動作する
        assertEquals(77, eval("""
            MutableCounter := {
                `_-=_`: this, amount, accessor -> (
                    this.value -= amount
                    this.value
                )
            }
            MutableCounter{value: 100} -= 23
        """).int)
    }

    @Test
    fun accessorWithoutSetterCanOnlyGetTest() = runTest {
        // setter無しの場合、アクセサは取得のみ可能
        assertEquals(100, eval("""
            Object := {
                `_+=_`: this, amount, accessor -> (
                    accessor().value
                )
            }
            Object{value: 100} += 23
        """).int)
    }

    @Test
    fun accessorWithoutSetterCannotSetTest() = runTest {
        // setter無しの場合、アクセサは代入不可
        assertFailsWith<Exception> {
            eval("""
                Object := {
                    `_+=_`: this, amount, accessor -> (
                        accessor({value: 200})
                    )
                }
                Object{value: 100} += 23
            """)
        }
    }

    @Test
    fun methodNotFoundErrorPositionTest() = runTest {
        // 1::m() のエラーポジションが正しく報告されることを確認
        val exception = assertFailsWith<FluoriteException> {
            eval("1::m()")
        }
        // スタックトレースが設定されていることを確認
        val stackTrace = exception.stackTrace
        assertNotNull(stackTrace, "Stack trace should be set")
        assertTrue(stackTrace.isNotEmpty(), "Stack trace should not be empty")
        
        // 最初のポジションが :: 演算子の位置（index 1）を指していることを確認
        val firstPosition = stackTrace.first()
        assertNotNull(firstPosition, "First position should not be null")
        assertEquals(1, firstPosition.index, "Error should point to :: operator at index 1")
    }

    @Test
    fun methodNotFoundInParenthesisErrorPositionTest() = runTest {
        // ( 1::m() ) のエラーポジションが正しく報告されることを確認
        val exception = assertFailsWith<FluoriteException> {
            eval("( 1::m() )")
        }
        // スタックトレースが設定されていることを確認
        val stackTrace = exception.stackTrace
        assertNotNull(stackTrace, "Stack trace should be set")
        assertTrue(stackTrace.isNotEmpty(), "Stack trace should not be empty")
        
        // 最初のポジションが :: 演算子の位置（index 3）を指していることを確認
        val firstPosition = stackTrace.first()
        assertNotNull(firstPosition, "First position should not be null")
        assertEquals(3, firstPosition.index, "Error should point to :: operator at index 3")
    }
}
