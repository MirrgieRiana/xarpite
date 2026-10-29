import com.ionspin.kotlin.bignum.integer.toBigInteger
import kotlinx.coroutines.ExperimentalCoroutinesApi
import kotlinx.coroutines.test.runTest
import mirrg.xarpite.RuntimeContext
import mirrg.xarpite.compilers.objects.FluoriteInt
import mirrg.xarpite.compilers.objects.invokeImmediate
import mirrg.xarpite.operations.FluoriteException
import mirrg.xarpite.test.big
import mirrg.xarpite.test.double
import mirrg.xarpite.test.eval
import mirrg.xarpite.test.int
import mirrg.xarpite.test.string
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertFailsWith
import kotlin.test.assertTrue

@OptIn(ExperimentalCoroutinesApi::class)
class MathTest {

    @Test
    fun specialValueConstants() = runTest {
        RuntimeContext.SUPPORTED_API_VERSIONS.forEach { apiVersion ->
            assertEquals(Double.POSITIVE_INFINITY, eval("INFINITY", apiVersion = apiVersion).double)
            assertEquals(Double.NEGATIVE_INFINITY, eval("NEGATIVE_INFINITY", apiVersion = apiVersion).double)
            assertTrue(eval("NAN", apiVersion = apiVersion).double.isNaN())
        }
        assertEquals(Double.NEGATIVE_INFINITY, eval("-INFINITY").double)
        assertEquals(Double.POSITIVE_INFINITY, eval("-NEGATIVE_INFINITY").double)
        assertEquals("Infinity", eval("&INFINITY").string)
        assertEquals("-Infinity", eval("&NEGATIVE_INFINITY").string)
        assertEquals("NaN", eval("&NAN").string)
    }

    @Test
    fun floor() = runTest {
        assertEquals(10, eval("FLOOR(10.1)").int) // FLOOR関数は小数点以下を切り捨てて内部的な型をINTにする
        assertEquals(10, eval("FLOOR(10)").int) // 整数はそのまま
        assertEquals(-11, eval("FLOOR(-10.1)").int) // 負の数も値が小さくなるように切り捨てる
    }

    @Test
    fun roundToIntRejectsNaN() = runTest {
        // 数値をINTに丸める箇所では、NaNを0として扱わずにエラーにする
        assertFailsWith<FluoriteException> { eval("[10;20;30](+'NaN')") } // 配列のインデックス
        assertFailsWith<FluoriteException> { eval("'abc'(+'NaN')") } // 文字列のインデックス
        assertFailsWith<FluoriteException> { eval("BASE(10; +'NaN')") } // BASE関数の数値引数
    }

    @Test
    fun abs() = runTest {
        assertEquals(10, eval("ABS(10)").int) // 正の整数
        assertEquals(10, eval("ABS(-10)").int) // 負の整数
        assertEquals(0, eval("ABS(0)").int) // 0
        assertEquals(10.5, eval("ABS(10.5)").double, 0.001) // 正の浮動小数点数
        assertEquals(10.5, eval("ABS(-10.5)").double, 0.001) // 負の浮動小数点数
        assertEquals(2147483648.0, eval("ABS(-2147483648)").double, 0.001) // INT_MINはDoubleにフォールバック
        assertEquals(10, eval("ABS('-10')").int) // 文字列からの変換
    }

    @Test
    fun lengthOfNumber() = runTest {
        assertEquals(10, eval("$#10").int) // 正の整数はそのまま
        assertEquals(10, eval("$#-10").int) // 負の整数は絶対値になる
        assertEquals(10.5, eval("$#10.5").double, 0.001) // 正の浮動小数点数
        assertEquals(10.5, eval("$#-10.5").double, 0.001) // 負の浮動小数点数
        assertEquals(2147483648.0, eval("$#-2147483648").double, 0.001) // INT_MINはDoubleにフォールバック
    }

    @Test
    fun div() = runTest {
        assertEquals(3, eval("DIV(10; 3)").int) // DIV関数は小数点以下を絶対値の小さい方に切り捨てる

        // 負の場合は符号だけが変わる
        assertEquals(3, eval("DIV(10; 3)").int)
        assertEquals(-3, eval("DIV(10; -3)").int)
        assertEquals(-3, eval("DIV(-10; 3)").int)
        assertEquals(3, eval("DIV(-10; -3)").int)

        // 浮動小数点の場合も整数化する
        assertEquals(3, eval("DIV(10; 3)").int)
        assertEquals(3.0, eval("DIV(10; 3.0)").double)
        assertEquals(3.0, eval("DIV(10.0; 3)").double)
        assertEquals(3.0, eval("DIV(10.0; 3.0)").double)
        assertEquals(-3, eval("DIV(-10; 3)").int)
        assertEquals(-3.0, eval("DIV(-10; 3.0)").double)
        assertEquals(-3.0, eval("DIV(-10.0; 3)").double)
        assertEquals(-3.0, eval("DIV(-10.0; 3.0)").double)
    }

    @Test
    fun divBig() = runTest {
        assertEquals(3.toBigInteger(), eval("DIV(BIG.of(10); BIG.of(3))").big)
        assertEquals((-3).toBigInteger(), eval("DIV(BIG.of(-10); BIG.of(3))").big)
        assertEquals((-3).toBigInteger(), eval("DIV(BIG.of(10); BIG.of(-3))").big)
        assertEquals(3.toBigInteger(), eval("DIV(BIG.of(-10); BIG.of(-3))").big)

        assertEquals(3.toBigInteger(), eval("DIV(BIG.of(10); 3)").big)
        assertEquals((-3).toBigInteger(), eval("DIV(BIG.of(-10); 3)").big)
        assertEquals((-3).toBigInteger(), eval("DIV(BIG.of(10); -3)").big)
        assertEquals(3.toBigInteger(), eval("DIV(BIG.of(-10); -3)").big)
        assertEquals(3.toBigInteger(), eval("DIV(10; BIG.of(3))").big)
        assertEquals((-3).toBigInteger(), eval("DIV(-10; BIG.of(3))").big)
        assertEquals((-3).toBigInteger(), eval("DIV(10; BIG.of(-3))").big)
        assertEquals(3.toBigInteger(), eval("DIV(-10; BIG.of(-3))").big)

        assertEquals(0.toBigInteger(), eval("DIV(BIG.of(0); -3)").big)
        assertEquals(0.toBigInteger(), eval("DIV(0; BIG.of(-3))").big)
        assertEquals(0.toBigInteger(), eval("DIV(BIG.of(-1); BIG.of(3))").big)
        assertEquals(2147483648L.toBigInteger(), eval("DIV(-2147483648; BIG.of(-1))").big)
        assertEquals(-2.0, eval("DIV(BIG.of(-7); 2.5)").double)
        assertEquals(-2.0, eval("DIV(-7.5; BIG.of(3))").double)

        val huge = "1" + "0".repeat(400)
        assertEquals("3".repeat(400).toBigInteger(), eval("""DIV(BIG.of("$huge"); 3)""").big)
        assertEquals("3".repeat(400).toBigInteger(), eval("""DIV(BIG.of("$huge"); BIG.of(3))""").big)
        assertEquals(1.toBigInteger(), eval("""DIV(BIG.of("$huge"); BIG.of("$huge"))""").big)
    }

    @Test
    fun floorDiv() = runTest {
        assertEquals(2, eval("FLOOR_DIV(7; 3)").int)
        assertEquals(-3, eval("FLOOR_DIV(-7; 3)").int)
        assertEquals(-3, eval("FLOOR_DIV(7; -3)").int)
        assertEquals(2, eval("FLOOR_DIV(-7; -3)").int)
        assertEquals(-2, eval("FLOOR_DIV(-6; 3)").int)
        assertEquals(-2, eval("FLOOR_DIV(6; -3)").int)
        assertEquals(0, eval("FLOOR_DIV(0; -3)").int)
        assertEquals(-1, eval("FLOOR_DIV(-1; 3)").int)
        assertEquals(-715827883, eval("FLOOR_DIV(-2147483648; 3)").int)
        assertEquals(-715827883, eval("FLOOR_DIV(2147483647; -3)").int)
        assertEquals(-3, eval("-7 FLOOR_DIV 3").int)
    }

    @Test
    fun floorDivBig() = runTest {
        assertEquals(2.toBigInteger(), eval("FLOOR_DIV(BIG.of(7); BIG.of(3))").big)
        assertEquals((-3).toBigInteger(), eval("FLOOR_DIV(BIG.of(-7); BIG.of(3))").big)
        assertEquals((-3).toBigInteger(), eval("FLOOR_DIV(BIG.of(7); BIG.of(-3))").big)
        assertEquals(2.toBigInteger(), eval("FLOOR_DIV(BIG.of(-7); BIG.of(-3))").big)

        assertEquals(2.toBigInteger(), eval("FLOOR_DIV(BIG.of(7); 3)").big)
        assertEquals((-3).toBigInteger(), eval("FLOOR_DIV(BIG.of(-7); 3)").big)
        assertEquals((-3).toBigInteger(), eval("FLOOR_DIV(BIG.of(7); -3)").big)
        assertEquals(2.toBigInteger(), eval("FLOOR_DIV(BIG.of(-7); -3)").big)
        assertEquals(2.toBigInteger(), eval("FLOOR_DIV(7; BIG.of(3))").big)
        assertEquals((-3).toBigInteger(), eval("FLOOR_DIV(-7; BIG.of(3))").big)
        assertEquals((-3).toBigInteger(), eval("FLOOR_DIV(7; BIG.of(-3))").big)
        assertEquals(2.toBigInteger(), eval("FLOOR_DIV(-7; BIG.of(-3))").big)

        assertEquals((-2).toBigInteger(), eval("FLOOR_DIV(BIG.of(-6); BIG.of(3))").big)
        assertEquals((-2).toBigInteger(), eval("FLOOR_DIV(BIG.of(6); BIG.of(-3))").big)
        assertEquals(0.toBigInteger(), eval("FLOOR_DIV(BIG.of(0); -3)").big)
        assertEquals(0.toBigInteger(), eval("FLOOR_DIV(0; BIG.of(-3))").big)
        assertEquals((-1).toBigInteger(), eval("FLOOR_DIV(BIG.of(-1); BIG.of(3))").big)
        assertEquals(2147483648L.toBigInteger(), eval("FLOOR_DIV(-2147483648; BIG.of(-1))").big)
        assertEquals((-3).toBigInteger(), eval("BIG.of(7) FLOOR_DIV -3").big)

        val huge = "1" + "0".repeat(400)
        val quotient = "3".repeat(400).toBigInteger()
        assertEquals(quotient, eval("""FLOOR_DIV(BIG.of("$huge"); 3)""").big)
        assertEquals(quotient, eval("""FLOOR_DIV(BIG.of("-$huge"); BIG.of(-3))""").big)
        assertEquals(-quotient - 1.toBigInteger(), eval("""FLOOR_DIV(BIG.of("-$huge"); 3)""").big)
        assertEquals(-quotient - 1.toBigInteger(), eval("""FLOOR_DIV(BIG.of("$huge"); BIG.of(-3))""").big)
        assertEquals(1.toBigInteger(), eval("""FLOOR_DIV(BIG.of("$huge"); BIG.of("$huge"))""").big)
        assertEquals((-1).toBigInteger(), eval("""FLOOR_DIV(1; BIG.of("-$huge"))""").big)
        assertEquals("4503599627370497".toBigInteger(), eval("""FLOOR_DIV(BIG.of("9007199254740995"); 2)""").big)
        assertEquals("-100000000000000000000001".toBigInteger(), eval("""FLOOR_DIV(BIG.of("-1000000000000000000000001"); 10)""").big)
    }

    @Test
    fun floorDivDouble() = runTest {
        assertEquals(2.0, eval("FLOOR_DIV(7.0; 3)").double)
        assertEquals(2.0, eval("FLOOR_DIV(7; 3.0)").double)
        assertEquals(2.0, eval("FLOOR_DIV(7.0; 3.0)").double)
        assertEquals(2.0, eval("FLOOR_DIV(BIG.of(7); 3.0)").double)
        assertEquals(2.0, eval("FLOOR_DIV(7.0; BIG.of(3))").double)
        assertEquals(-3.0, eval("FLOOR_DIV(-7.0; 3.0)").double)
        assertEquals(-3.0, eval("FLOOR_DIV(7.0; -3.0)").double)
        assertEquals(2.0, eval("FLOOR_DIV(-7.0; -3.0)").double)
        assertEquals(-2.0, eval("FLOOR_DIV(-6.0; 3.0)").double)
        assertEquals(3.0, eval("FLOOR_DIV(1.75; 0.5)").double)
        assertEquals(-4.0, eval("FLOOR_DIV(-1.75; 0.5)").double)
        assertEquals(-3.0, eval("FLOOR_DIV(BIG.of(-7); 2.5)").double)
        assertEquals(-3.0, eval("FLOOR_DIV(-7.5; BIG.of(3))").double)
        assertEquals(-1.0, eval("FLOOR_DIV(-0.5; 3)").double)
        assertEquals(2147483648.0, eval("FLOOR_DIV(4294967296.0; 2)").double)
        assertEquals(Double.POSITIVE_INFINITY, eval("FLOOR_DIV(1.0; 0)").double)
        assertEquals(Double.NEGATIVE_INFINITY, eval("FLOOR_DIV(-1; 0.0)").double)
        assertEquals(Double.POSITIVE_INFINITY, eval("FLOOR_DIV(BIG.of(1); 0.0)").double)
        assertEquals(Double.NEGATIVE_INFINITY, eval("FLOOR_DIV(-1.0; BIG.of(0))").double)
        assertEquals(true, eval("FLOOR_DIV(0.0; 0)").double.isNaN())
        assertEquals(true, eval("FLOOR_DIV(+'NaN'; 3)").double.isNaN())
        assertEquals(Double.POSITIVE_INFINITY, eval("FLOOR_DIV(+'Infinity'; 3)").double)
    }

    @Test
    fun floorDivAndMod() = runTest {
        listOf("-7", "-6", "0", "6", "7", "BIG.of(-7)", "BIG.of(-6)", "BIG.of(0)", "BIG.of(6)", "BIG.of(7)").forEach { left ->
            listOf("3", "-3", "BIG.of(3)", "BIG.of(-3)").forEach { right ->
                assertEquals(eval(left).toString(), eval("FLOOR_DIV($left; $right) * $right + MOD($left; $right)").toString())
            }
        }
    }

    @Test
    fun floorDivErrors() = runTest {
        assertFailsWith<FluoriteException> { eval("FLOOR_DIV()") }
        assertFailsWith<FluoriteException> { eval("FLOOR_DIV(1)") }
        assertFailsWith<FluoriteException> { eval("FLOOR_DIV(1; 2; 3)") }
        listOf("1", "BIG.of(1)", "1.0").forEach { number ->
            assertFailsWith<IllegalArgumentException> { eval("FLOOR_DIV(NULL; $number)") }
            assertFailsWith<IllegalArgumentException> { eval("FLOOR_DIV($number; NULL)") }
        }
        assertFailsWith<FluoriteException> { eval("FLOOR_DIV(1; 0)", apiVersion = 6) }
        assertFailsWith<ArithmeticException> { eval("FLOOR_DIV(BIG.of(1); 0)") }
        assertFailsWith<ArithmeticException> { eval("FLOOR_DIV(1; BIG.of(0))") }
        assertFailsWith<ArithmeticException> { eval("FLOOR_DIV(BIG.of(1); BIG.of(0))") }
    }

    @Test
    fun modBig() = runTest {
        assertEquals(1.toBigInteger(), eval("BIG.of(7) % BIG.of(3)").big)
        assertEquals(2.toBigInteger(), eval("BIG.of(-7) % BIG.of(3)").big)
        assertEquals((-2).toBigInteger(), eval("BIG.of(7) % BIG.of(-3)").big)
        assertEquals((-1).toBigInteger(), eval("BIG.of(-7) % BIG.of(-3)").big)
        assertEquals(0.toBigInteger(), eval("BIG.of(-6) % BIG.of(3)").big)
        assertEquals(0.toBigInteger(), eval("BIG.of(6) % BIG.of(-3)").big)
        assertEquals(0.toBigInteger(), eval("BIG.of(0) % BIG.of(-3)").big)

        assertEquals(1.toBigInteger(), eval("BIG.of(7) % 3").big)
        assertEquals(2.toBigInteger(), eval("BIG.of(-7) % 3").big)
        assertEquals((-2).toBigInteger(), eval("BIG.of(7) % -3").big)
        assertEquals((-1).toBigInteger(), eval("BIG.of(-7) % -3").big)
        assertEquals(1.toBigInteger(), eval("7 % BIG.of(3)").big)
        assertEquals(2.toBigInteger(), eval("-7 % BIG.of(3)").big)
        assertEquals((-2).toBigInteger(), eval("7 % BIG.of(-3)").big)
        assertEquals((-1).toBigInteger(), eval("-7 % BIG.of(-3)").big)

        assertEquals(1.0, eval("BIG.of(7) % 3.0").double)
        assertEquals(1.0, eval("7.0 % BIG.of(3)").double)
        assertEquals(-1.5, eval("7.5 % BIG.of(-3)").double)
        assertEquals(0.5, eval("BIG.of(-7) % 2.5").double)
        assertEquals(0.0, eval("BIG.of(-6) % 3.0").double, 0.0)
        assertEquals(0.0, eval("6.0 % BIG.of(-3)").double, 0.0)

        val huge = "1" + "0".repeat(400)
        assertEquals(1.toBigInteger(), eval("""BIG.of("$huge") % 3""").big)
        assertEquals((-2).toBigInteger(), eval("""BIG.of("$huge") % BIG.of(-3)""").big)
        assertEquals((-1).toBigInteger(), eval("""BIG.of("-$huge") % BIG.of(-3)""").big)
        assertEquals(0.toBigInteger(), eval("""BIG.of("$huge") % BIG.of("$huge")""").big)
        assertEquals(("-" + "9".repeat(400)).toBigInteger(), eval("""1 % BIG.of("-$huge")""").big)
        assertEquals(1.toBigInteger(), eval("""BIG.of("9007199254740993") % 2""").big)
    }

    @Test
    fun bigDivisionAndRemainderErrors() = runTest {
        assertFailsWith<ArithmeticException> { eval("DIV(BIG.of(1); 0)") }
        assertFailsWith<ArithmeticException> { eval("DIV(1; BIG.of(0))") }
        assertFailsWith<ArithmeticException> { eval("DIV(BIG.of(1); BIG.of(0))") }
        assertFailsWith<ArithmeticException> { eval("BIG.of(1) % 0") }
        assertFailsWith<ArithmeticException> { eval("1 % BIG.of(0)") }
        assertFailsWith<ArithmeticException> { eval("BIG.of(1) % BIG.of(0)") }
        assertEquals(true, eval("DIV(BIG.of(1); 0.0)").double.isNaN())
        assertEquals(true, eval("DIV(1.0; BIG.of(0))").double.isNaN())
        assertEquals(true, eval("BIG.of(1) % 0.0").double.isNaN())
        assertEquals(true, eval("1.0 % BIG.of(0)").double.isNaN())
    }

    @Test
    fun mod() = runTest {
        assertEquals(1, eval("MOD(7; 3)").int)
        assertEquals(2, eval("MOD(-7; 3)").int)
        assertEquals(-2, eval("MOD(7; -3)").int)
        assertEquals(-1, eval("MOD(-7; -3)").int)
        assertEquals(0, eval("MOD(-6; 3)").int)
        assertEquals(0, eval("MOD(6; -3)").int)

        assertEquals(1.toBigInteger(), eval("MOD(BIG.of(7); BIG.of(3))").big)
        assertEquals(2.toBigInteger(), eval("MOD(BIG.of(-7); BIG.of(3))").big)
        assertEquals((-2).toBigInteger(), eval("MOD(BIG.of(7); BIG.of(-3))").big)
        assertEquals((-1).toBigInteger(), eval("MOD(BIG.of(-7); BIG.of(-3))").big)
        assertEquals(0.toBigInteger(), eval("MOD(BIG.of(-6); BIG.of(3))").big)
        assertEquals(0.toBigInteger(), eval("MOD(BIG.of(6); BIG.of(-3))").big)
        assertEquals(0.toBigInteger(), eval("MOD(BIG.of(0); BIG.of(-3))").big)

        assertEquals(1.toBigInteger(), eval("MOD(BIG.of(7); 3)").big)
        assertEquals(1.toBigInteger(), eval("MOD(7; BIG.of(3))").big)
        assertEquals(2.toBigInteger(), eval("MOD(BIG.of(-7); 3)").big)
        assertEquals(2.toBigInteger(), eval("MOD(-7; BIG.of(3))").big)
        assertEquals((-2).toBigInteger(), eval("MOD(BIG.of(7); -3)").big)
        assertEquals((-2).toBigInteger(), eval("MOD(7; BIG.of(-3))").big)

        assertEquals(1.0, eval("MOD(7.0; 3)").double)
        assertEquals(1.0, eval("MOD(7; 3.0)").double)
        assertEquals(1.0, eval("MOD(7.0; 3.0)").double)
        assertEquals(1.0, eval("MOD(BIG.of(7); 3.0)").double)
        assertEquals(1.0, eval("MOD(7.0; BIG.of(3))").double)
        assertEquals(2.0, eval("MOD(-7.0; 3.0)").double)
        assertEquals(-2.0, eval("MOD(7.0; -3.0)").double)
        assertEquals(-1.0, eval("MOD(-7.0; -3.0)").double)
        assertEquals(0.0, eval("MOD(-6.0; 3.0)").double, 0.0)
        assertEquals(0.25, eval("MOD(1.75; 0.5)").double)
        assertEquals(-1.5, eval("MOD(7.5; BIG.of(-3))").double)
        assertEquals(0.5, eval("MOD(BIG.of(-7); 2.5)").double)
    }

    @Test
    fun rem() = runTest {
        assertEquals(1, eval("REM(7; 3)").int)
        assertEquals(-1, eval("REM(-7; 3)").int)
        assertEquals(1, eval("REM(7; -3)").int)
        assertEquals(-1, eval("REM(-7; -3)").int)
        assertEquals(0, eval("REM(-6; 3)").int)
        assertEquals(0, eval("REM(6; -3)").int)

        assertEquals(1.toBigInteger(), eval("REM(BIG.of(7); BIG.of(3))").big)
        assertEquals((-1).toBigInteger(), eval("REM(BIG.of(-7); BIG.of(3))").big)
        assertEquals(1.toBigInteger(), eval("REM(BIG.of(7); BIG.of(-3))").big)
        assertEquals((-1).toBigInteger(), eval("REM(BIG.of(-7); BIG.of(-3))").big)
        assertEquals(0.toBigInteger(), eval("REM(BIG.of(-6); BIG.of(3))").big)
        assertEquals(0.toBigInteger(), eval("REM(BIG.of(6); BIG.of(-3))").big)
        assertEquals(0.toBigInteger(), eval("REM(BIG.of(0); BIG.of(-3))").big)

        assertEquals(1.toBigInteger(), eval("REM(BIG.of(7); 3)").big)
        assertEquals(1.toBigInteger(), eval("REM(7; BIG.of(3))").big)
        assertEquals((-1).toBigInteger(), eval("REM(BIG.of(-7); 3)").big)
        assertEquals((-1).toBigInteger(), eval("REM(-7; BIG.of(3))").big)
        assertEquals(1.toBigInteger(), eval("REM(BIG.of(7); -3)").big)
        assertEquals(1.toBigInteger(), eval("REM(7; BIG.of(-3))").big)

        assertEquals(1.0, eval("REM(7.0; 3)").double)
        assertEquals(1.0, eval("REM(7; 3.0)").double)
        assertEquals(1.0, eval("REM(7.0; 3.0)").double)
        assertEquals(1.0, eval("REM(BIG.of(7); 3.0)").double)
        assertEquals(1.0, eval("REM(7.0; BIG.of(3))").double)
        assertEquals(-1.0, eval("REM(-7.0; 3.0)").double)
        assertEquals(1.0, eval("REM(7.0; -3.0)").double)
        assertEquals(-1.0, eval("REM(-7.0; -3.0)").double)
        assertEquals(0.0, eval("REM(-6.0; 3.0)").double, 0.0)
        assertEquals(-0.25, eval("REM(-1.75; 0.5)").double)
        assertEquals(1.5, eval("REM(7.5; BIG.of(-3))").double)
        assertEquals(-2.0, eval("REM(BIG.of(-7); 2.5)").double)
    }

    @Test
    fun bigRemainderPrecision() = runTest {
        val huge = "1" + "0".repeat(400)
        assertEquals(1.toBigInteger(), eval("""MOD(BIG.of("$huge"); 3)""").big)
        assertEquals(1.toBigInteger(), eval("""REM(BIG.of("$huge"); 3)""").big)
        assertEquals((-2).toBigInteger(), eval("""MOD(BIG.of("$huge"); BIG.of(-3))""").big)
        assertEquals(1.toBigInteger(), eval("""REM(BIG.of("$huge"); BIG.of(-3))""").big)
        assertEquals((-1).toBigInteger(), eval("""REM(BIG.of("-$huge"); BIG.of(-3))""").big)
        assertEquals(1.toBigInteger(), eval("""MOD(BIG.of("9007199254740993"); 2)""").big)
        assertEquals(1.toBigInteger(), eval("""REM(BIG.of("9007199254740993"); 2)""").big)
    }

    @Test
    fun modAndRemErrors() = runTest {
        listOf("MOD", "REM").forEach { name ->
            assertFailsWith<FluoriteException> { eval("$name()") }
            assertFailsWith<FluoriteException> { eval("$name(1)") }
            assertFailsWith<FluoriteException> { eval("$name(1; 2; 3)") }
            assertFailsWith<IllegalArgumentException> { eval("$name(NULL; 1)") }
            assertFailsWith<IllegalArgumentException> { eval("$name(1; NULL)") }
            assertFailsWith<ArithmeticException> { eval("$name(BIG.of(1); 0)") }
            assertFailsWith<ArithmeticException> { eval("$name(1; BIG.of(0))") }
            assertFailsWith<ArithmeticException> { eval("$name(BIG.of(1); BIG.of(0))") }
            assertEquals(true, eval("$name(BIG.of(1); 0.0)").double.isNaN())
            assertEquals(true, eval("$name(1.0; BIG.of(0))").double.isNaN())
            assertEquals(true, eval("$name(1.0; 0)").double.isNaN())
        }
    }

    @Test
    fun integerZeroDivisorInApiVersion6() = runTest {
        listOf("0", "1", "-1", "BIG.of(0)", "BIG.of(1)", "BIG.of(-1)", "0.0", "1.5", "-1.5", "+'Infinity'", "+'-Infinity'", "+'NaN'").forEach { left ->
            listOf("0", "BIG.of(0)").forEach { right ->
                listOf(
                    "DIV(($left); $right)",
                    "FLOOR_DIV(($left); $right)",
                    "MOD(($left); $right)",
                    "REM(($left); $right)",
                    "($left) % $right",
                    "($left) / $right",
                ).forEach { code ->
                    val exception = assertFailsWith<FluoriteException>(code) { eval(code, apiVersion = 6) }
                    assertEquals("Division by zero", exception.message)
                    assertEquals("Division by zero", eval("($code) !? (error => error)", apiVersion = 6).string)
                }
            }
        }
    }

    @Test
    fun integerZeroDivisorBeforeApiVersion6() = runTest {
        listOf(4, 5).forEach { apiVersion ->
            listOf("0", "BIG.of(0)").forEach { right ->
                listOf("DIV(1.0; $right)", "MOD(1.0; $right)", "REM(1.0; $right)", "1.0 % $right").forEach { code ->
                    assertEquals(true, eval(code, apiVersion = apiVersion).double.isNaN())
                }
                assertEquals(Double.POSITIVE_INFINITY, eval("FLOOR_DIV(1.0; $right)", apiVersion = apiVersion).double)
                assertEquals(Double.NEGATIVE_INFINITY, eval("FLOOR_DIV(-1.0; $right)", apiVersion = apiVersion).double)
                assertEquals(true, eval("FLOOR_DIV(0.0; $right)", apiVersion = apiVersion).double.isNaN())
                assertEquals(Double.POSITIVE_INFINITY, eval("1.0 / $right", apiVersion = apiVersion).double)
                assertEquals(Double.NEGATIVE_INFINITY, eval("-1.0 / $right", apiVersion = apiVersion).double)
                assertEquals(true, eval("0.0 / $right", apiVersion = apiVersion).double.isNaN())
            }
            assertEquals(Double.POSITIVE_INFINITY, eval("1 / 0", apiVersion = apiVersion).double)
            assertEquals(Double.POSITIVE_INFINITY, eval("BIG.of(1) / BIG.of(0)", apiVersion = apiVersion).double)
            listOf("DIV", "FLOOR_DIV", "MOD", "REM").forEach { name ->
                assertFailsWith<ArithmeticException> { eval("$name(BIG.of(1); BIG.of(0))", apiVersion = apiVersion) }
            }
            assertFailsWith<ArithmeticException> { eval("BIG.of(1) % BIG.of(0)", apiVersion = apiVersion) }
        }
    }

    @Test
    fun doubleZeroDivisor() = runTest {
        listOf(4, 5, 6).forEach { apiVersion ->
            listOf("0", "1", "-1", "BIG.of(0)", "BIG.of(1)", "BIG.of(-1)", "0.0", "1.5", "-1.5", "+'Infinity'", "+'-Infinity'", "+'NaN'").forEach { left ->
                val number = eval(left).toString().toDouble()
                listOf("0.0", "-(0.0)").forEach { right ->
                    listOf("DIV(($left); $right)", "MOD(($left); $right)", "REM(($left); $right)", "($left) % $right").forEach { code ->
                        assertEquals(true, eval(code, apiVersion = apiVersion).double.isNaN())
                    }
                    val expected = number / if (right == "0.0") 0.0 else -0.0
                    listOf("FLOOR_DIV(($left); $right)", "($left) / $right").forEach { code ->
                        val actual = eval(code, apiVersion = apiVersion).double
                        if (expected.isNaN()) {
                            assertEquals(true, actual.isNaN())
                        } else {
                            assertEquals(expected, actual)
                        }
                    }
                }
            }
        }
    }

    @Test
    fun nonZeroDivisorInApiVersion6() = runTest {
        assertEquals(-2, eval("DIV(-7; 3)", apiVersion = 6).int)
        assertEquals((-2).toBigInteger(), eval("DIV(BIG.of(-7); 3)", apiVersion = 6).big)
        assertEquals(-2.0, eval("DIV(-7.0; 3)", apiVersion = 6).double)
        assertEquals(-3, eval("FLOOR_DIV(-7; 3)", apiVersion = 6).int)
        assertEquals((-3).toBigInteger(), eval("FLOOR_DIV(BIG.of(-7); 3)", apiVersion = 6).big)
        assertEquals(-3.0, eval("FLOOR_DIV(-7.0; 3)", apiVersion = 6).double)
        assertEquals(9.0, eval("FLOOR_DIV(0.9; 0.1)", apiVersion = 6).double)
        assertEquals(2, eval("MOD(-7; 3)", apiVersion = 6).int)
        assertEquals((-1).toBigInteger(), eval("REM(BIG.of(-7); 3)", apiVersion = 6).big)
        assertEquals(2.0, eval("-7.0 % 3", apiVersion = 6).double)
        assertEquals(1.5, eval("3 / BIG.of(2)", apiVersion = 6).double)
        assertEquals("dir/0", eval("'dir' / 0", apiVersion = 6).string)
        assertEquals("dir/0", eval("'dir' / BIG.of(0)", apiVersion = 6).string)
        assertEquals(0, eval("x := 0; y := 0; y == 0 ? 0 : DIV(x; y)", apiVersion = 6).int)
    }

    @Test
    fun math() = runTest {
        assertEquals(3.141592653589793, eval("MATH.PI").double, 0.001)
        assertEquals(2.718281828459045, eval("MATH.E").double, 0.001)

        assertEquals(3.141592653589793, eval("PI").double, 0.001)

        // SQRT
        assertEquals(10.0, eval("SQRT(100)").double, 0.001)

        // SIN
        assertEquals(0.0, eval("SIN(0)").double, 0.001)
        assertEquals(1.0, eval("SIN(PI / 2)").double, 0.001)

        // COS
        assertEquals(1.0, eval("COS(0)").double, 0.001)
        assertEquals(-1.0, eval("COS(PI)").double, 0.001)

        // TAN
        assertEquals(1.0, eval("TAN(PI / 4)").double, 0.001)

        // ASIN
        assertEquals(0.0, eval("ASIN(0)").double, 0.001)
        assertEquals(1.5707963267948966, eval("ASIN(1)").double, 0.001) // PI / 2

        // ACOS
        assertEquals(1.5707963267948966, eval("ACOS(0)").double, 0.001) // PI / 2
        assertEquals(0.0, eval("ACOS(1)").double, 0.001)

        // ATAN
        assertEquals(0.0, eval("ATAN(0)").double, 0.001)
        assertEquals(0.7853981633974483, eval("ATAN(1)").double, 0.001) // PI / 4

        // ATAN2
        assertEquals(0.7853981633974483, eval("ATAN2(1; 1)").double, 0.001) // 点(1, 1)の偏角 PI / 4
        assertEquals(2.356194490192345, eval("ATAN2(1; -1)").double, 0.001) // 点(-1, 1)の偏角 3 * PI / 4
        assertEquals(0.0, eval("ATAN2(0; 1)").double, 0.001) // 点(1, 0)の偏角

        // POW
        assertEquals(8.0, eval("POW(2; 3)").double, 0.001)

        // EXP
        assertEquals(2.718281828459045, eval("EXP(1)").double, 0.001)
        assertEquals(7.389056098930649, eval("EXP(2)").double, 0.001)

        // LOG (自然対数)
        assertEquals(1.0, eval("LOG(MATH.E)").double, 0.001)

        // LOG (底指定)
        assertEquals(3.0, eval("LOG(2; 8)").double, 0.001) // 2を底とした8の対数
        assertEquals(2.0, eval("LOG(10; 100)").double, 0.001) // 10を底とした100の対数
    }

    @Test
    fun rand() = runTest {
        val random = eval("RAND")

        repeat(100) {
            val d = random.invokeImmediate(null, arrayOf()).double
            assertTrue(d >= 0.0 && d < 1.0)
        }
        repeat(100) {
            val i = random.invokeImmediate(null, arrayOf(FluoriteInt(4))).int
            assertTrue(i >= 0 && i < 4)
        }
        repeat(100) {
            val i = random.invokeImmediate(null, arrayOf(FluoriteInt(4), FluoriteInt(10))).int
            assertTrue(i >= 4 && i < 10)
        }
    }

    @Test
    fun numericLiteralWithUnderscore() = runTest {
        // 整数リテラル
        assertEquals(1000000, eval("1_000_000").int) // アンダースコア区切りの整数
        assertEquals(123, eval("1_2_3").int) // 各桁にアンダースコア
        assertEquals(42, eval("4__2").int) // 連続したアンダースコア

        // 16進整数リテラル
        assertEquals(255, eval("H#F_F").int) // アンダースコア区切りの16進数
        assertEquals(4095, eval("H#F_F_F").int) // 複数のアンダースコア
        assertEquals(255, eval("H#F__F").int) // 連続したアンダースコア

        // 浮動小数点数リテラル
        assertEquals(1000.5, eval("1_000.5").double, 0.001) // 整数部にアンダースコア
        assertEquals(1.5, eval("1.5_0_0").double, 0.001) // 小数部にアンダースコア
        assertEquals(1234.5678, eval("1_2_3_4.5_6_7_8").double, 0.001) // 両方にアンダースコア
        assertEquals(123.456, eval("1_2_3.4_5_6").double, 0.001) // 複数のアンダースコア

        // 負の数とアンダースコア
        assertEquals(-1000000, eval("-1_000_000").int) // 負の整数
        assertEquals(-1000.5, eval("-1_000.5").double, 0.001) // 負の浮動小数点数
        assertEquals(-255, eval("-H#F_F").int) // 負の16進数

        // 演算でも動作する
        assertEquals(2000000, eval("1_000_000 + 1_000_000").int)
        assertEquals(2000.0, eval("1_000.0 * 2.0").double, 0.001)

        // 末尾アンダースコアのテスト（正式仕様）
        assertEquals(123, eval("123_").int) // 整数の末尾アンダースコア
        assertEquals(123, eval("1__2__3__").int) // 連続アンダースコアと末尾アンダースコア
        assertEquals(255, eval("H#FF_").int) // 16進数の末尾アンダースコア
        assertEquals(255, eval("H#F_F_").int) // 16進数の連続と末尾アンダースコア
        assertEquals(1.5, eval("1.5_").double, 0.001) // 浮動小数点数の末尾アンダースコア
        assertEquals(1.5, eval("1.5_0_0_").double, 0.001) // 小数部の連続と末尾アンダースコア
    }

}
