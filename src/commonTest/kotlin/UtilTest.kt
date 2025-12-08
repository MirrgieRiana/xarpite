import mirrg.xarpite.removeExponent
import kotlin.test.Test
import kotlin.test.assertEquals

class UtilTest {
    @Test
    fun toDecimalStringTest() {

        // 基底
        assertEquals("1", "1".removeExponent())
        assertEquals("1", "01".removeExponent())
        assertEquals("1000000000000000000000000000000000000", "1000000000000000000000000000000000000".removeExponent())
        assertEquals("1000000000000000000000000000000000001", "1000000000000000000000000000000000001".removeExponent())

        // 小数部がある
        assertEquals("1", "1.0".removeExponent())
        assertEquals("0.00000000000000000000000000000000001", "0.00000000000000000000000000000000001".removeExponent())

        // 仮数部が負
        assertEquals("-1", "-1".removeExponent())
        assertEquals("-1000000000000000000000000000000000000", "-1000000000000000000000000000000000000".removeExponent())
        assertEquals("-1000000000000000000000000000000000001", "-1000000000000000000000000000000000001".removeExponent())
        assertEquals("-1", "-1.0".removeExponent())
        assertEquals("-0.00000000000000000000000000000000001", "-0.00000000000000000000000000000000001".removeExponent())

        // 仮数部が+付き
        assertEquals("+1", "+1".removeExponent())
        assertEquals("+1", "+1.0".removeExponent())

        // 指数部がある
        assertEquals("0.000000000000000000000000000001", "1E-30".removeExponent())
        assertEquals("0.1", "1E-1".removeExponent())
        assertEquals("1", "1E0".removeExponent())
        assertEquals("10", "1E1".removeExponent())
        assertEquals("1000000000000000000000000000000", "1E30".removeExponent())

        // 大文字の指数部
        assertEquals("10", "1E1".removeExponent())

        // 指数部が+付き
        assertEquals("10", "1E+1".removeExponent())

        // 小数部も指数部もある
        assertEquals("0.00000000000000000000000000000123", "1.23E-30".removeExponent())
        assertEquals("0.123", "1.23E-1".removeExponent())
        assertEquals("1.23", "1.23E0".removeExponent())
        assertEquals("12.3", "1.23E1".removeExponent())
        assertEquals("1230000000000000000000000000000", "1.23E30".removeExponent())

        // 計算中に整数部か小数部が0桁になる
        assertEquals("0.12345", "12345e-5".removeExponent())
        assertEquals("12345", "0.12345e5".removeExponent())

        // 計算中に整数部か小数部が足りない
        assertEquals("0.012345", "12345e-6".removeExponent())
        assertEquals("123450", "0.12345e6".removeExponent())

        // 両端の0は切り詰める
        assertEquals("1", "001.00".removeExponent())
        assertEquals("1", "0.0100e2".removeExponent())
        assertEquals("1", "00100e-2".removeExponent())

        // 複雑なパターン
        assertEquals("-0.00000123456", "-123.456E-8".removeExponent())
        assertEquals("+12345600000", "+123.456E+8".removeExponent())

    }
}
