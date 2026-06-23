import kotlinx.coroutines.ExperimentalCoroutinesApi
import kotlinx.coroutines.test.runTest
import mirrg.xarpite.compilers.objects.FluoriteNull
import mirrg.xarpite.compilers.objects.cache
import mirrg.xarpite.mounts.createCommonMounts
import mirrg.xarpite.test.array
import mirrg.xarpite.test.boolean
import mirrg.xarpite.test.eval
import mirrg.xarpite.test.get
import mirrg.xarpite.test.int
import mirrg.xarpite.test.stream
import mirrg.xarpite.test.string
import mirrg.xarpite.withEvaluator
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertFails
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
                ) !? ( e => e)
            )
            SLEEP()
            trigger::fail("ERROR")
            job::await()
        """.let { assertEquals("ERROR", eval(it).string) }

        // fail() に ERROR 型の値を渡すと、await() 時に元のネイティブ例外がそのまま再スローされる
        val nativeError = assertFails { eval("""ERROR.throwNativeError("boom")""") } // throwNativeError はネイティブ例外を送出する
        val rethrownError = assertFails {
            eval(
                """
                    error := TRY ( => ERROR.throwNativeError("boom") )::awaitException()
                    trigger := PROMISE.new()
                    trigger::fail(error)
                    trigger::await()
                """
            )
        } // ERROR を fail で渡して await で投げ直す
        assertEquals(nativeError::class, rethrownError::class) // FluoriteException で包まれず、元のネイティブ例外と同じクラスで再スローされる

        // awaitException() は fail() された場合に例外値を返す
        """
            trigger := PROMISE.new()
            trigger::fail("ERROR")
            trigger::awaitException()
        """.let { assertEquals("ERROR", eval(it).string) }

        // awaitException() は fail() で値が省略された場合に NULL を返す
        """
            trigger := PROMISE.new()
            trigger::fail()
            trigger::awaitException()
        """.let { assertEquals(FluoriteNull, eval(it)) }

        // awaitException() は complete() された場合に NULL を返す
        """
            trigger := PROMISE.new()
            trigger::complete("OK")
            trigger::awaitException()
        """.let { assertEquals(FluoriteNull, eval(it)) }

        // awaitException() は complete() で値が省略された場合にも NULL を返す
        """
            trigger := PROMISE.new()
            trigger::complete()
            trigger::awaitException()
        """.let { assertEquals(FluoriteNull, eval(it)) }

        // awaitException() は LAUNCH 内の例外値も取得できる
        """
            job := LAUNCH ( =>
                !!"Error in LAUNCH"
            )
            SLEEP()
            job::awaitException()
        """.let { assertEquals("Error in LAUNCH", eval(it).string) }

        // isCompleted
        assertEquals(false, eval("promise := PROMISE.new(); promise::isCompleted()").boolean) // 初期状態では未完了
        assertEquals(true, eval("promise := PROMISE.new(); promise::complete(); promise::isCompleted()").boolean) // 完了すると完了になる
        assertEquals(true, eval("promise := PROMISE.new(); promise::fail(); promise::isCompleted()").boolean) // エラーで完了すると完了になる

        // LAUNCH 内で例外が発生した場合、その例外は await() 時にスローされ、stderrにも出力される
        """
            job := LAUNCH ( =>
                !!"Error in LAUNCH"
            )
            SLEEP()
            (
                job::await()
                !!"Should not reach here"
            ) !? ( e => e)
        """.let { assertEquals("Error in LAUNCH", eval(it).string) }

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
        // runTestの仮想時間でdelayが進むため、待機したミリ秒数を currentTime の差分で検証する

        // APIバージョン4では引数をミリ秒として扱う
        val before4 = testScheduler.currentTime
        assertEquals(FluoriteNull, eval("SLEEP(1000)", apiVersion = 4))
        assertEquals(1000L, testScheduler.currentTime - before4)

        // APIバージョン5では引数を秒として扱い、小数も指定できる
        val before5 = testScheduler.currentTime
        assertEquals(FluoriteNull, eval("SLEEP(0.5)", apiVersion = 5))
        assertEquals(500L, testScheduler.currentTime - before5)
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

    @Test
    fun launch2Basic() = runTest {
        // LAUNCH2 は式渡し引数を使って非同期にコルーチンを起動する
        """
            promise := LAUNCH2 ("apple")
            promise::await()
        """.let { assertEquals("apple", eval(it).string) }

        // LAUNCH2 は LAUNCH と同様に動作する
        """
            result := PROMISE.new()
            LAUNCH2 (result::complete("apple"))
            result::await()
        """.let { assertEquals("apple", eval(it).string) }
    }

    @Test
    fun launch2ExceptionStderr() = runTest {
        // LAUNCH2内で例外が発生した場合、stderrに出力されることを検証
        val ioContext = TestIoContext()

        withEvaluator(ioContext) { context, evaluator ->
            evaluator.defineMounts(context.run { createCommonMounts() })

            // 例外を発生させるLAUNCH2
            val result = evaluator.get(
                """
                    job := LAUNCH2 (!!"Error in LAUNCH2")
                    SLEEP()
                    (
                        job::await()
                        !!"Should not reach here"
                    ) !? ( e => e)
                """
            ).cache()

            // 結果の検証：例外がキャッチされている
            assertEquals("Error in LAUNCH2", result.string)

            // stderrへの出力を検証
            val stderrOutput = ioContext.stderrBytes.toUtf8String()
            assertTrue(stderrOutput.contains("COROUTINE["), "stderr should contain 'COROUTINE[', but was: $stderrOutput")
            assertTrue(stderrOutput.contains("Error in LAUNCH2"), "stderr should contain the error message, but was: $stderrOutput")
        }
    }

    @Test
    fun launch2StreamLaunch() = runTest {
        // LAUNCH2 の式の評価結果がストリームの場合、awaitされなくても1度だけイテレートされる
        """
            promises := [PROMISE.new(), PROMISE.new()]
            LAUNCH2 (0 .. 1 | promises(_)::complete())
            promises(0)::await()
            promises(1)::await()
            TRUE
        """.let { assertTrue(eval(it).boolean) }

        // LAUNCH2 の式の評価結果がストリームの場合、何度awaitしても必ず1度だけ評価される
        """
            counter := 0
            promise := LAUNCH2 (1 .. 10 | counter = counter + _)
            promise::await()
            promise::await()
            promise::await()
            promise::await()
            promise::await()
            counter
        """.let { assertEquals(55, eval(it).int) }
    }


    @Test
    fun launchExceptionStderr() = runTest {
        // LAUNCH内で例外が発生した場合、stderrに出力されることを検証
        val ioContext = TestIoContext()

        withEvaluator(ioContext) { context, evaluator ->
            evaluator.defineMounts(context.run { createCommonMounts() })

            // 例外を発生させるLAUNCH
            val result = evaluator.get(
                """
                    job := LAUNCH ( =>
                        !!"Error in LAUNCH"
                    )
                    SLEEP()
                    (
                        job::await()
                        !!"Should not reach here"
                    ) !? ( e => e)
                """
            ).cache()

            // 結果の検証：例外がキャッチされている
            assertEquals("Error in LAUNCH", result.string)

            // stderrへの出力を検証
            val stderrOutput = ioContext.stderrBytes.toUtf8String()
            assertTrue(stderrOutput.contains("COROUTINE["), "stderr should contain 'COROUTINE[', but was: $stderrOutput")
            assertTrue(stderrOutput.contains("Error in LAUNCH"), "stderr should contain the error message, but was: $stderrOutput")
        }
    }

}
