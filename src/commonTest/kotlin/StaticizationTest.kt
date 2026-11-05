import io.github.mirrgieriana.xarpeg.parseAll
import kotlinx.coroutines.CompletableDeferred
import kotlinx.coroutines.ExperimentalCoroutinesApi
import kotlinx.coroutines.async
import kotlinx.coroutines.awaitCancellation
import kotlinx.coroutines.cancelAndJoin
import kotlinx.coroutines.test.runTest
import mirrg.xarpite.ConstantMount
import mirrg.xarpite.Environment
import mirrg.xarpite.Frame
import mirrg.xarpite.RuntimeContext
import mirrg.xarpite.UnsupportedIoContext
import mirrg.xarpite.XarpiteGrammar
import mirrg.xarpite.XarpiteParseContext
import mirrg.xarpite.cli.createCliMounts
import mirrg.xarpite.compilers.compileToGetter
import mirrg.xarpite.compilers.objects.FluoriteArray
import mirrg.xarpite.compilers.objects.FluoriteFunction
import mirrg.xarpite.mounts.createCommonMounts
import mirrg.xarpite.test.array
import mirrg.xarpite.test.eval
import mirrg.xarpite.test.get
import mirrg.xarpite.test.int
import mirrg.xarpite.test.run
import mirrg.xarpite.withEvaluator
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertNotSame
import kotlin.test.assertSame

@OptIn(ExperimentalCoroutinesApi::class)
class StaticizationTest {

    @Test
    fun prefixAndPostfix() = runTest {
        assertEquals(3, eval("$=(1 + 2)").int)
        assertEquals(3, eval("(1 + 2).$=").int)
        assertEquals(9, eval("(1 + 2).$= * 3").int)
        assertEquals(3, eval("[1; 2; 3].$=.$#").int)
    }

    @Test
    fun initializesOnFirstUse() = runTest {
        """
            counter := 0
            get := () -> (++counter).$=
            before := counter
            counter = 10
            first := get()
            counter = 20
            [before; first; get(); counter]
        """.let { assertEquals("[0;11;11;20]", eval(it).array()) }
    }

    @Test
    fun sharesAcrossCallsAndClosures() = runTest {
        """
            make := value -> () -> value.$=
            first := make(10)
            second := make(20)
            [second(); first(); second()]
        """.let { assertEquals("[20;20;20]", eval(it).array()) }
    }

    @Test
    fun separatesOccurrences() = runTest {
        """
            counter := 0
            first := () -> (++counter).$=
            second := () -> (++counter).$=
            [first(); second(); first(); second(); counter]
        """.let { assertEquals("[1;2;1;2;2]", eval(it).array()) }
    }

    @Test
    fun preservesObjectIdentity() = runTest {
        """
            get := () -> {value: 0}.$=
            object := get()
            object.value = 7
            [object; get(); get().value]
        """.let {
            val fluoriteArray = eval(it) as FluoriteArray
            assertSame(fluoriteArray.values[0], fluoriteArray.values[1])
            assertEquals(7, fluoriteArray.values[2].int)
        }
    }

    @Test
    fun cachesNull() = runTest {
        """
            counter := 0
            get := () -> (counter++; NULL).$=
            [get(); get(); counter]
        """.let { assertEquals("[NULL;NULL;1]", eval(it).array()) }
    }

    @Test
    fun resolvesStreamOnFirstUse() = runTest {
        """
            counter := 0
            get := () -> (1 .. 3 | (counter++; _)).$=
            first := get()
            afterInitialization := counter
            [[first]; [get()]; afterInitialization; counter]
        """.let { assertEquals("[[1;2;3];[1;2;3];3;3]", eval(it).array()) }
    }

    @Test
    fun cachesStandardInputContents() = runTest {
        withEvaluator(TestIoContext(stdinLines = listOf("a", "b"))) { context, evaluator ->
            evaluator.defineMounts(context.run { createCommonMounts() + createCliMounts(emptyList()) })
            """
                get := () -> INL.$=
                [[get()]; [get()]; [INL]]
            """.let { assertEquals("[[a;b];[a;b];[]]", evaluator.get(it).array()) }
        }
    }

    @Test
    fun retriesFailedInitializationInCurrentEnvironment() = runTest {
        """
            attempts := 0
            get := value -> (attempts++; value == 1 ? (!!"fail") : value).$=
            get(1) !? NULL
            [get(2); get(3); attempts]
        """.let { assertEquals("[2;2;2]", eval(it).array()) }
    }

    @Test
    fun retriesFailedStreamInitialization() = runTest {
        """
            items := 0
            get := fail -> (1 .. 3 | (items++; fail && _ == 2 ? (!!"fail") : _)).$=
            get(TRUE) !? NULL
            [[get(FALSE)]; [get(TRUE)]; items]
        """.let { assertEquals("[[1;2;3];[1;2;3];5]", eval(it).array()) }
    }

    @Test
    fun sharesSuspendingInitialization() = runTest {
        """
            attempts := 0
            get := value -> (attempts++; SLEEP(); value).$=
            first := LAUNCH ( => get(10) )
            second := LAUNCH ( => get(20) )
            [first::await(); second::await(); attempts]
        """.let { assertEquals("[10;10;1]", eval(it).array()) }
    }

    @Test
    fun retriesCancelledInitialization() = runTest {
        val completableDeferred = CompletableDeferred<Unit>()
        var attempts = 0
        withEvaluator(UnsupportedIoContext()) { context, evaluator ->
            evaluator.defineMounts(context.run { createCommonMounts() })
            val function = FluoriteFunction.immediate { arguments ->
                attempts++
                if (attempts == 1) {
                    completableDeferred.complete(Unit)
                    awaitCancellation()
                }
                arguments[0]
            }
            evaluator.defineMounts(listOf(mapOf("INITIALIZE" to ConstantMount(function))))
            evaluator.run("get := value -> INITIALIZE(value).$=")
            val deferred = async { evaluator.get("get(1)") }
            completableDeferred.await()
            deferred.cancelAndJoin()
            assertEquals(2, evaluator.get("get(2)").int)
            assertEquals(2, evaluator.get("get(3)").int)
            assertEquals(2, attempts)
        }
    }

    @Test
    fun separatesSourceRoots() = runTest {
        withEvaluator(UnsupportedIoContext()) { context, evaluator ->
            evaluator.defineMounts(context.run { createCommonMounts() })
            evaluator.run("first := value -> value.$=")
            evaluator.run("second := value -> value.$=")
            assertEquals("[1;2;1;2]", evaluator.get("[first(1); second(2); first(3); second(4)]").array())
        }
    }

    @Test
    fun separatesEvaluationsOfSameSource() = runTest {
        withEvaluator(UnsupportedIoContext()) { _, evaluator ->
            val src = "[].$="
            val first = evaluator.get("test", src, false)
            val second = evaluator.get("test", src, false)
            assertNotSame(first, second)
        }
    }

    @Test
    fun compiledCodeDoesNotRetainRuntimeValues() = runTest {
        val node = XarpiteGrammar("test", RuntimeContext.SUPPORTED_API_VERSIONS.first).rootParser
            .parseAll("[].$=") { XarpiteParseContext(it) }.getOrThrow()
        val frame = Frame(isRoot = true)
        val getter = frame.compileToGetter(node)
        withEvaluator(UnsupportedIoContext()) { context, _ ->
            val firstEnvironment = Environment(context, null, frame.nextVariableIndex, frame.mountCount)
            val secondEnvironment = Environment(context, null, frame.nextVariableIndex, frame.mountCount)
            val value = getter.evaluate(firstEnvironment)
            assertSame(value, getter.evaluate(firstEnvironment))
            assertNotSame(value, getter.evaluate(secondEnvironment))
        }
    }

}
