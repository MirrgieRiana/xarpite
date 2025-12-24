import kotlinx.coroutines.ExperimentalCoroutinesApi
import kotlinx.coroutines.test.runTest
import mirrg.xarpite.test.array
import mirrg.xarpite.test.eval
import kotlin.test.Test
import kotlin.test.assertEquals

@OptIn(ExperimentalCoroutinesApi::class)
class OperationTest {

    @Test
    fun whileLoop() = runTest {
        // WHILE で条件がtrueの間、ブロックを繰り返し実行する
        """
            i := 0
            [WHILE [ => i < 5 ] ( =>
                result := i
                i = i + 1
                result
            )]
        """.let { assertEquals("[0;1;2;3;4]", eval(it).array()) }

        // 条件が初めからfalseの場合、空のストリームを返す
        """
            [WHILE [ => FALSE ] ( =>
                1
            )]
        """.let { assertEquals("[]", eval(it).array()) }

        // ブロックの戻り値がストリームの場合、それを平坦化する
        """
            i := 0
            [WHILE [ => i < 3 ] ( =>
                i = i + 1
                1 .. i
            )]
        """.let { assertEquals("[1;1;2;1;2;3]", eval(it).array()) }
    }

}
