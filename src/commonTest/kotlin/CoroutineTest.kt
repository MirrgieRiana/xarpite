import kotlinx.coroutines.ExperimentalCoroutinesApi
import kotlinx.coroutines.test.runTest
import mirrg.xarpite.compilers.objects.FluoriteNull
import mirrg.xarpite.test.array
import mirrg.xarpite.test.boolean
import mirrg.xarpite.test.eval
import mirrg.xarpite.test.int
import mirrg.xarpite.test.stream
import mirrg.xarpite.test.string
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
    fun streamLaunch() = runTest {

        // LAUNCH ラムダの戻り値のストリームは、awaitされなくても1度だけイテレートされる
        """
            promises := [PROMISE.new(), PROMISE.new()]
            LAUNCH ( =>
              0 .. 1 | promises(_)::complete()
            )
            promises(0)::await()
            promises(1)::await()
            TRUE
        """.let { assertTrue(eval(it).boolean) }

        // LAUNCH ラムダの戻り値のストリームは、何度awaitしても必ず1度だけ評価される
        """
            counter := 0
            promise := LAUNCH ( =>
              1 .. 10 | counter = counter + _
            )
            promise::await()
            promise::await()
            promise::await()
            promise::await()
            promise::await()
            counter
        """.let { assertEquals(55, eval(it).int) }

        // LAUNCH ラムダの戻り値のストリームは、何度awaitしても最初に評価されたときと同じシーケンスを返す
        """
            counter := 0
            promise := LAUNCH ( =>
              0 ~ 3 | (
                counter = counter + 1
                counter
              )
            )
            promise::await(), promise::await(), promise::await(), counter
        """.let { assertEquals("1,2,3,1,2,3,1,2,3,3", eval(it).stream()) }

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
