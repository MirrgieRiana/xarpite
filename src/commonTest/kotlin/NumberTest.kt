import kotlinx.coroutines.ExperimentalCoroutinesApi
import kotlinx.coroutines.test.runTest
import mirrg.xarpite.test.big
import mirrg.xarpite.test.double
import mirrg.xarpite.test.eval
import mirrg.xarpite.test.int
import mirrg.xarpite.test.string
import kotlin.test.Test
import kotlin.test.assertEquals

@OptIn(ExperimentalCoroutinesApi::class)
class NumberTest {

    @Test
    fun big() = runTest {
        // INTの範囲を超える整数の文字列を数値化すると、精度を失わずBIGになる
        assertEquals("9999999999999999999", eval(""" +"9999999999999999999" """).big)
        assertEquals("-9999999999999999999", eval(""" +"-9999999999999999999" """).big)
        assertEquals("123456789012345678901234567890", eval(""" +"123456789012345678901234567890" """).big)

        // INTの範囲に収まる整数はBIGにはならない
        assertEquals(2147483647, eval(""" +"2147483647" """).int)

        // 指数表記を含む文字列はBIGにはならずDOUBLEになる
        assertEquals(1e30, eval(""" +"1e30" """).double)

        // 文字列化すると数値のまま10進文字列になる
        assertEquals("9999999999999999999", eval(""" &+"9999999999999999999" """).string)
    }

    @Test
    fun bigOf() = runTest {
        // 文字列からBIGを生成できる
        assertEquals("123456789012345678901234567890", eval(""" BIG.of("123456789012345678901234567890") """).big)

        // INT・DOUBLEからもBIGを生成できる
        assertEquals("123", eval(""" BIG.of(123) """).big)
        assertEquals("100", eval(""" BIG.of(100.0) """).big)

        // 小数部のあるDOUBLEは切り捨てられる
        assertEquals("2", eval(""" BIG.of(2.5) """).big)

        // BIGを渡すとそのまま返る
        assertEquals("123456789012345678901234567890", eval(""" BIG.of(BIG.of("123456789012345678901234567890")) """).big)
    }
}
