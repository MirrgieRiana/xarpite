import kotlinx.coroutines.ExperimentalCoroutinesApi
import kotlinx.coroutines.test.runTest
import mirrg.xarpite.compilers.objects.FluoriteNull
import mirrg.xarpite.test.eval
import mirrg.xarpite.test.int
import kotlin.test.Test
import kotlin.test.assertEquals

@OptIn(ExperimentalCoroutinesApi::class)
class ControlStructuresTest {

    @Test
    fun whileLoop() = runTest {
        // WHILE は条件がtrueの間、ブロックを繰り返し実行し、NULLを返す
        """
            i := 0
            WHILE [ => i < 5 ] ( =>
                i = i + 1
            )
        """.let { assertEquals(FluoriteNull, eval(it)) }

        // WHILEの副作用でカウンタが正しく更新される
        """
            i := 0
            WHILE [ => i < 5 ] ( =>
                i = i + 1
            )
            i
        """.let { assertEquals(5, eval(it).int) }

        // 条件が初めからfalseの場合、ブロックは実行されずNULLを返す
        """
            i := 0
            WHILE [ => FALSE ] ( =>
                i = i + 1
            )
            i
        """.let { assertEquals(0, eval(it).int) }

        // ラベル・リターンと組み合わせて途中で脱出できる
        """
            i := 0
            WHILE [ => i < 100 ] ( =>
                i == 3 && break!!
                i = i + 1
            ) !: break
            i
        """.let { assertEquals(3, eval(it).int) }
    }

}
