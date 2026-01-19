import kotlinx.coroutines.ExperimentalCoroutinesApi
import kotlinx.coroutines.test.runTest
import mirrg.xarpite.test.double
import mirrg.xarpite.test.eval
import mirrg.xarpite.test.int
import kotlin.test.Test
import kotlin.test.assertEquals

@OptIn(ExperimentalCoroutinesApi::class)
class NumberLiteralTest {

    @Test
    fun integerWithUnderscore() = runTest {
        // 数字の後にアンダースコアを任意個続けることができる
        assertEquals(1000000, eval("1_000_000").int)
        assertEquals(123456789, eval("123_456_789").int)
        
        // アンダースコアが1つの場合
        assertEquals(1000, eval("1_000").int)
        
        // アンダースコアが複数連続する場合
        assertEquals(1000, eval("1__000").int)
        assertEquals(1000, eval("1___000").int)
        
        // 様々な位置にアンダースコアを配置
        assertEquals(12345, eval("1_2_3_4_5").int)
        assertEquals(123, eval("1_23").int)
        assertEquals(123, eval("12_3").int)
        
        // アンダースコアなしでも動作する
        assertEquals(123, eval("123").int)
    }

    @Test
    fun hexadecimalWithUnderscore() = runTest {
        // 16進数でもアンダースコアが使える
        assertEquals(16777215, eval("H#FF_FF_FF").int)
        assertEquals(255, eval("H#F_F").int)
        
        // 大文字小文字混在
        assertEquals(16777215, eval("H#Ff_fF_Ff").int)
        
        // アンダースコアなしでも動作する
        assertEquals(255, eval("H#FF").int)
    }

    @Test
    fun floatWithUnderscore() = runTest {
        // 浮動小数点数でもアンダースコアが使える
        assertEquals(3.141592, eval("3.14_15_92").double, 0.000001)
        assertEquals(1000.5, eval("1_000.5").double, 0.000001)
        assertEquals(1.5, eval("1.5_0").double, 0.000001)
        
        // 整数部と小数部の両方にアンダースコア
        assertEquals(1234.5678, eval("1_234.56_78").double, 0.000001)
        
        // アンダースコアなしでも動作する
        assertEquals(1.5, eval("1.5").double, 0.000001)
    }

    @Test
    fun negativeNumberWithUnderscore() = runTest {
        // 負の数でもアンダースコアが使える
        assertEquals(-1000000, eval("-1_000_000").int)
        assertEquals(-3.141592, eval("-3.14_15_92").double, 0.000001)
        assertEquals(-16777215, eval("-H#FF_FF_FF").int)
    }

    @Test
    fun underscoreInExpressions() = runTest {
        // 演算式内でも使える
        assertEquals(2000000, eval("1_000_000 + 1_000_000").int)
        assertEquals(1000000000000, eval("1_000_000 * 1_000_000").int)
        assertEquals(6.283184, eval("3.14_15_92 * 2").double, 0.000001)
    }

}
