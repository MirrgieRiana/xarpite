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
}
