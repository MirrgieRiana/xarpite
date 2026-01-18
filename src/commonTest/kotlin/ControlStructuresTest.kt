import kotlinx.coroutines.ExperimentalCoroutinesApi
import kotlinx.coroutines.test.runTest
import mirrg.xarpite.compilers.objects.FluoriteNull
import mirrg.xarpite.test.eval
import mirrg.xarpite.test.int
import mirrg.xarpite.test.string
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

    @Test
    fun trySuccess() = runTest {
        // TRY は正常に実行された場合、解決済みのPROMISEを返す
        """
            TRY ( =>
                "Success"
            )::await()
        """.let { assertEquals("Success", eval(it).string) }

        // TRY ブロックの戻り値が正しくPROMISEに格納される
        """
            TRY ( =>
                42
            )::await()
        """.let { assertEquals(42, eval(it).int) }

        // PROMISEは完了状態になる
        """
            TRY ( =>
                "Test"
            )::isCompleted()
        """.let { assertEquals(true, eval(it).boolean) }
    }

    @Test
    fun tryFailure() = runTest {
        // TRY は例外がスローされた場合、拒否されたPROMISEを返す
        """
            TRY ( =>
                !! "Error occurred"
            )::await() !? (e => "Caught: ${"$"}e")
        """.let { assertEquals("Caught: Error occurred", eval(it).string) }

        // TRY 内の例外はPROMISEに格納され、外部には漏れない
        """
            TRY ( =>
                !! "Failed"
            )::isCompleted()
        """.let { assertEquals(true, eval(it).boolean) }

        // 例外の値が正しく伝達される
        """
            TRY ( =>
                !! 12345
            )::await() !? (e => e)
        """.let { assertEquals(12345, eval(it).int) }
    }

    @Test
    fun tryStreamResolution() = runTest {
        // TRY ブロックがストリームを返す場合、自動的に解決される
        """
            counter := 0
            promise := TRY ( =>
                1 .. 3 | (
                    counter = counter + 1
                    counter
                )
            )
            [promise::await()], [promise::await()], [promise::await()], counter
        """.let {
            val result = eval(it)
            // ストリームが1度だけ評価され、counterが3になる
            assertEquals(3, result.int)
        }
    }

}
