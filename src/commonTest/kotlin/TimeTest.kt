import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.delay
import kotlinx.coroutines.test.runTest
import kotlinx.coroutines.withContext
import mirrg.xarpite.RuntimeContext
import mirrg.xarpite.UnsupportedIoContext
import mirrg.xarpite.compilers.objects.FluoriteBig
import mirrg.xarpite.mounts.createCommonMounts
import mirrg.xarpite.operations.FluoriteException
import mirrg.xarpite.test.eval
import mirrg.xarpite.test.get
import mirrg.xarpite.test.string
import mirrg.xarpite.withEvaluator
import kotlin.test.Test
import kotlin.test.assertFailsWith
import kotlin.test.assertTrue
import kotlin.time.Clock

class TimeTest {

    @Test
    fun now() = runTest {
        RuntimeContext.SUPPORTED_API_VERSIONS.forEach { apiVersion ->
            val before = Clock.System.now().epochSeconds
            val now = eval("NOW()", apiVersion = apiVersion)
            val after = Clock.System.now().epochSeconds
            assertTrue(now is FluoriteBig)
            assertTrue(now.toString().toLong() in minOf(before, after)..maxOf(before, after))
        }
    }

    @Test
    fun nowIsNotCached() = runTest {
        withEvaluator(UnsupportedIoContext()) { context, evaluator ->
            evaluator.defineMounts(context.run { createCommonMounts() })
            evaluator.get("NOW()")
            withContext(Dispatchers.Default) { delay(1100) }
            val before = Clock.System.now().epochSeconds
            val now = evaluator.get("NOW()").toString().toLong()
            val after = Clock.System.now().epochSeconds
            assertTrue(now in minOf(before, after)..maxOf(before, after))
        }
    }

    @Test
    fun nowInString() = runTest {
        assertTrue(Regex("""\d+-title\.md""").matches(eval(""" "$(NOW())-title.md" """).string))
    }

    @Test
    fun nowErrors() = runTest {
        assertFailsWith<FluoriteException> { eval("NOW(0)") }
        assertFailsWith<FluoriteException> { eval("NOW(0; 1)") }
    }

}
