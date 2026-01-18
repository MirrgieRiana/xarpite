import kotlinx.coroutines.ExperimentalCoroutinesApi
import kotlinx.coroutines.test.runTest
import mirrg.xarpite.compilers.objects.FluoriteInt
import mirrg.xarpite.compilers.objects.invoke
import mirrg.xarpite.test.double
import mirrg.xarpite.test.eval
import mirrg.xarpite.test.int
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertTrue

@OptIn(ExperimentalCoroutinesApi::class)
class MathTest {

    @Test
    fun floor() = runTest {
        assertEquals(10, eval("FLOOR(10.1)").int) // FLOOR関数は小数点以下を切り捨てて内部的な型をINTEGERにする
        assertEquals(10, eval("FLOOR(10)").int) // 整数はそのまま
        assertEquals(-11, eval("FLOOR(-10.1)").int) // 負の数も値が小さくなるように切り捨てる
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

        // POW
        assertEquals(8.0, eval("POW(2; 3)").double, 0.001)

        // EXP
        assertEquals(2.718281828459045, eval("EXP(1)").double, 0.001)
        assertEquals(7.389056098930649, eval("EXP(2)").double, 0.001)

        // LOG (自然対数)
        assertEquals(1.0, eval("LOG(MATH.E)").double, 0.001)
    }

    @Test
    fun rand() = runTest {
        val random = eval("RAND")

        repeat(100) {
            val d = random.invoke(null, arrayOf()).double
            assertTrue(d >= 0.0 && d < 1.0)
        }
        repeat(100) {
            val i = random.invoke(null, arrayOf(FluoriteInt(4))).int
            assertTrue(i >= 0 && i < 4)
        }
        repeat(100) {
            val i = random.invoke(null, arrayOf(FluoriteInt(4), FluoriteInt(10))).int
            assertTrue(i >= 4 && i < 10)
        }
    }

    @Test
    fun numericSeparator() = runTest {
        // 整数リテラル
        assertEquals(1000000, eval("1_000_000").int)
        assertEquals(123, eval("1_2_3").int)
        assertEquals(1234, eval("1_234").int)

        // 16進整数リテラル
        assertEquals(0xFFFFFF, eval("H#FF_FF_FF").int)
        assertEquals(0xFF, eval("H#F_F").int)
        assertEquals(0xABCD, eval("H#AB_CD").int)

        // 浮動小数点数リテラル
        assertEquals(1234.56789, eval("1_234.567_89").double, 0.000001)
        assertEquals(1000.5, eval("1_000.5").double, 0.000001)
        assertEquals(3.14159, eval("3.1_4_1_5_9").double, 0.000001)

        // 単項マイナス演算子との組み合わせ
        assertEquals(-1000000, eval("-1_000_000").int)
        assertEquals(-0xFFFFFF, eval("-H#FF_FF_FF").int)
        assertEquals(-1234.56789, eval("-1_234.567_89").double, 0.000001)

        // 演算での使用
        assertEquals(2000000, eval("1_000_000 + 1_000_000").int)
        assertEquals(1000, eval("1_000_000 / 1_000").int)
    }

}
