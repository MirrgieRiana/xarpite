import com.ionspin.kotlin.bignum.integer.toBigInteger
import kotlinx.coroutines.ExperimentalCoroutinesApi
import kotlinx.coroutines.test.runTest
import mirrg.xarpite.operations.FluoriteException
import mirrg.xarpite.test.big
import mirrg.xarpite.test.boolean
import mirrg.xarpite.test.double
import mirrg.xarpite.test.eval
import mirrg.xarpite.test.int
import mirrg.xarpite.test.string
import kotlin.math.abs
import kotlin.math.pow
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertFailsWith
import kotlin.test.assertTrue

/** 浮動小数点の計算結果を、期待値の絶対値に対する比で比較する */
private fun assertEqualsRelatively(expected: Double, actual: Double, relativeTolerance: Double = 1e-12) {
    assertTrue(abs(actual - expected) <= abs(expected) * relativeTolerance, "expected:<$expected> but was:<$actual>")
}

@OptIn(ExperimentalCoroutinesApi::class)
class NumberTest {

    @Test
    fun big() = runTest {
        // INTの範囲を超える整数の文字列を数値化すると、精度を失わずBIGになる
        assertEquals("9999999999999999999".toBigInteger(), eval(""" +"9999999999999999999" """).big)
        assertEquals("-9999999999999999999".toBigInteger(), eval(""" +"-9999999999999999999" """).big)
        assertEquals("9999999999999999999".toBigInteger(), eval(""" +"+9999999999999999999" """).big)
        assertEquals("123456789012345678901234567890".toBigInteger(), eval(""" +"123456789012345678901234567890" """).big)

        // INTの範囲に収まる整数はBIGにはならない
        assertEquals(2147483647, eval(""" +"2147483647" """).int)

        // 指数表記を含む文字列はBIGにはならずDOUBLEになる
        assertEquals(1e30, eval(""" +"1e30" """).double)

        // 文字列化すると数値のまま10進文字列になる
        assertEquals("9999999999999999999", eval(""" &+"9999999999999999999" """).string)

        // 数値化するとそのままBIGになる
        assertEquals("9999999999999999999".toBigInteger(), eval(""" +BIG.of("9999999999999999999") """).big)

        // 論理値化するとINTと同じ基準で判定される
        assertEquals(true, eval(""" ?BIG.of("9999999999999999999") """).boolean)
        assertEquals(false, eval(""" ?BIG.of(0) """).boolean)
    }

    @Test
    fun bigArithmetic() = runTest {
        val a = """ BIG.of("123456789012345678901234567890") """

        // BIG同士の加減乗除ができる
        assertEquals("246913578024691357802469135780".toBigInteger(), eval(""" $a + $a """).big)
        assertEquals("0".toBigInteger(), eval(""" $a - $a """).big)
        assertEquals("15241578753238836750495351562536198787501905199875019052100".toBigInteger(), eval(""" $a * $a """).big)
        assertEquals(1.0, eval(""" $a / $a """).double)

        // BIGとINTを混ぜると、精度を失わずBIGになる
        assertEquals("123456789012345678901234567891".toBigInteger(), eval(""" $a + 1 """).big)
        assertEquals("123456789012345678901234567891".toBigInteger(), eval(""" 1 + $a """).big)
        assertEquals("123456789012345678901234567889".toBigInteger(), eval(""" $a - 1 """).big)
        assertEquals("-123456789012345678901234567889".toBigInteger(), eval(""" 1 - $a """).big)
        assertEquals("246913578024691357802469135780".toBigInteger(), eval(""" $a * 2 """).big)
        assertEquals("246913578024691357802469135780".toBigInteger(), eval(""" 2 * $a """).big)

        // BIGとDOUBLEを混ぜると、INT同士の除算と同じくDOUBLEになる
        // 右辺が丸め落とされない小さいBIGを使うのは、巨大な値だと右辺を無視する実装を見逃すからなのだ。
        val b = """ BIG.of(2) """
        assertEquals(2.5, eval(""" $b + 0.5 """).double)
        assertEquals(2.5, eval(""" 0.5 + $b """).double)
        assertEquals(1.5, eval(""" $b - 0.5 """).double)
        assertEquals(-1.5, eval(""" 0.5 - $b """).double)
        assertEquals(1.0, eval(""" $b * 0.5 """).double)
        assertEquals(1.0, eval(""" 0.5 * $b """).double)
        assertEquals(4.0, eval(""" $b / 0.5 """).double)
        assertEquals(0.25, eval(""" 0.5 / $b """).double)

        // 巨大なBIGでも、DOUBLEと混ぜるとDOUBLEになる
        // 浮動小数点の末尾の桁は計算の経路で変わるから、絶対値に対する比で許容する
        assertEqualsRelatively(1.2345678901234568e29, eval(""" $a + 0.5 """).double)
        assertEqualsRelatively(6.172839450617284e28, eval(""" $a * 0.5 """).double)

        // 除算は常にDOUBLEになる
        assertEqualsRelatively(1.2345678901234568e29, eval(""" $a / 1 """).double)
        assertEqualsRelatively(8.1000000729e-30, eval(""" 1 / $a """).double)
        assertEqualsRelatively(2.4691357802469136e29, eval(""" $a / 0.5 """).double)

        // Doubleの範囲を超える大きさでも、商が保たれる
        val huge = "1" + "0".repeat(400)
        val hugeTwice = "2" + "0".repeat(400)
        val large = "1" + "0".repeat(100)
        assertEquals(1.0, eval(""" BIG.of("$huge") / BIG.of("$huge") """).double)
        assertEquals(2.0, eval(""" BIG.of("$hugeTwice") / BIG.of("$huge") """).double)
        assertEquals(0.5, eval(""" BIG.of("$huge") / BIG.of("$hugeTwice") """).double)
        assertEqualsRelatively(1e300, eval(""" BIG.of("$huge") / BIG.of("$large") """).double)
        assertEqualsRelatively(1e-300, eval(""" BIG.of("$large") / BIG.of("$huge") """).double)

        // 商がDoubleの範囲を外れると、無限大や0になる
        assertEquals(Double.POSITIVE_INFINITY, eval(""" BIG.of("$huge") / 2 """).double)
        assertEquals(0.0, eval(""" 2 / BIG.of("$huge") """).double)

        // 0で割ると、INT同士の除算と同じく無限大やNaNになる
        assertEquals(Double.POSITIVE_INFINITY, eval(""" $a / 0 """).double)
        assertEquals(true, eval(""" BIG.of(0) / 0 """).double.isNaN())

        // 10進の中間丸めを挟むと二重丸めで最も近いDoubleから外れるから、整数の商と余りから直接丸める
        // 2^53 + 11 を 2^53 で割った商は、1と1 + 2^-52の刻みのちょうど中点にあたる
        assertEquals(1.0000000000000013, eval(""" BIG.of("9007199254741003") / BIG.of("9007199254740992") """).double)

        // 中点では、刻みの偶数側へ送る
        // 2^70の近くのDoubleの刻みは2^18だから、2^70 + 2^17は中点にあたり、偶数側の2^70へ送られる
        val two = 2.toBigInteger()
        assertEquals(2.0.pow(70), eval(""" BIG.of("${two.pow(70) + two.pow(17)}") / 1 """).double)

        // subnormalの刻みは最小の2^-1074そのもので、その領域でも中点では偶数側へ送る
        assertEquals(Double.MIN_VALUE, eval(""" 1 / BIG.of("${two.pow(1074)}") """).double)
        assertEquals(0.0, eval(""" 1 / BIG.of("${two.pow(1075)}") """).double)
        assertEquals(Double.MIN_VALUE * 2, eval(""" 3 / BIG.of("${two.pow(1075)}") """).double)
        assertEquals(Double.MIN_VALUE * 4, eval(""" 7 / BIG.of("${two.pow(1075)}") """).double)

        // 分子が0のときは、分母の符号が符号付きのゼロへ引き継がれる
        // 符号を見分けるために、そのゼロを分母にして無限大の符号へ写す
        assertEquals(Double.NEGATIVE_INFINITY, eval(""" 1 / (BIG.of(0) / -1) """).double)
        assertEquals(Double.NEGATIVE_INFINITY, eval(""" 1 / (0 / BIG.of(-1)) """).double)
        assertEquals(Double.NEGATIVE_INFINITY, eval(""" 1 / (BIG.of(0) / BIG.of(-1)) """).double)
        assertEquals(Double.POSITIVE_INFINITY, eval(""" 1 / (BIG.of(0) / 1) """).double)
    }

    @Test
    fun bigOf() = runTest {
        // 文字列からBIGを生成できる
        assertEquals("123456789012345678901234567890".toBigInteger(), eval(""" BIG.of("123456789012345678901234567890") """).big)

        // INT・DOUBLEからもBIGを生成できる
        assertEquals("123".toBigInteger(), eval(""" BIG.of(123) """).big)
        assertEquals("100".toBigInteger(), eval(""" BIG.of(100.0) """).big)

        // 小数部のあるDOUBLEは切り捨てられる
        assertEquals("2".toBigInteger(), eval(""" BIG.of(2.5) """).big)

        // BIGを渡すとそのまま返る
        assertEquals("123456789012345678901234567890".toBigInteger(), eval(""" BIG.of(BIG.of("123456789012345678901234567890")) """).big)

        // 引数の個数が不正な場合はエラーになる
        assertFailsWith<FluoriteException> { eval(""" BIG.of() """) }

        // 非有限なDOUBLEはエラーになる
        assertFailsWith<FluoriteException> { eval(""" BIG.of(1.0 / 0.0) """) }
        assertFailsWith<FluoriteException> { eval(""" BIG.of(0.0 / 0.0) """) }
    }
}
