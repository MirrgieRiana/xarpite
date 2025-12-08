import kotlinx.coroutines.ExperimentalCoroutinesApi
import kotlinx.coroutines.test.runTest
import mirrg.xarpite.compilers.objects.FluoriteNull
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertTrue

@OptIn(ExperimentalCoroutinesApi::class)
class CoroutineTest {

    @Test
    fun coroutine() = runTest {

        // PROMISE と LAUNCH を使う基本的なテスト
        """
            sb := []
            trigger := PROMISE.new()
            sb::push << "A"
            job := LAUNCH ( =>
                sb::push << "C"
                trigger::await()
                sb::push << "F"
                123
            )
            sb::push << "B" // LAUNCHは遅延して開始する
            SLEEP() // ここで一旦サスペンドして次のイベントに回す
            sb::push << "D"
            trigger::complete()
            sb::push << "E"
            result := job::await()
            sb::push << "G"
            result, sb()
        """.let { assertEquals("123,A,B,C,D,E,F,G", eval(it).stream()) }

    }

    @Test
    fun promise() = runTest {

        // fail() すると await() 時に例外が発生する
        """
            trigger := PROMISE.new()
            job := LAUNCH ( =>
                (
                    trigger::await()
                    !!"Fail"
                ) !? TRUE
            )
            SLEEP()
            trigger::fail()
            job::await()
        """.let { assertTrue(eval(it).boolean) }

        // complete() すると NULL が得られる
        """
            trigger := PROMISE.new()
            job := LAUNCH ( =>
                trigger::await()
            )
            SLEEP()
            trigger::complete()
            job::await()
        """.let { assertEquals(FluoriteNull, eval(it)) }

        // complete(a) すると a が得られる
        """
            trigger := PROMISE.new()
            job := LAUNCH ( =>
                trigger::await()
            )
            SLEEP()
            trigger::complete(123)
            job::await()
        """.let { assertEquals(123, eval(it).int) }

        // fail(e) すると await() 時にその例外が発生する
        """
            trigger := PROMISE.new()
            job := LAUNCH ( =>
                (
                    trigger::await()
                    !!"Fail"
                ) !? (e => e)
            )
            SLEEP()
            trigger::fail("ERROR")
            job::await()
        """.let { assertEquals("ERROR", eval(it).string) }

        // isCompleted
        assertEquals(false, eval("promise := PROMISE.new(); promise::isCompleted()").boolean) // 初期状態では未完了
        assertEquals(true, eval("promise := PROMISE.new(); promise::complete(); promise::isCompleted()").boolean) // 完了すると完了になる
        assertEquals(true, eval("promise := PROMISE.new(); promise::fail(); promise::isCompleted()").boolean) // エラーで完了すると完了になる

    }

    @Test
    fun sleep() = runTest {
        // runTestを使うとdelayが即終了するので待機時間のテストは行わない

        assertEquals(FluoriteNull, eval("SLEEP(1000)")) // SLEEP で一定時間待つ
    }

    @Test
    fun generate() = runTest {
        // GENERATE で関数からストリームを生成する
        """
            [GENERATE(yield -> (
                yield << 1
                yield << 2
                yield << 3
            ))]
        """.let { assertEquals("[1;2;3]", eval(it).array()) }

        // yield関数がストリームを返した場合、その副作用は1度だけ実行される
        """
            [GENERATE(yield -> (
                1 .. 3 | yield << _
            ))]
        """.let { assertEquals("[1;2;3]", eval(it).array()) }
    }

}
