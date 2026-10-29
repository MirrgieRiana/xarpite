import kotlinx.coroutines.test.runTest
import mirrg.xarpite.RuntimeContext
import mirrg.xarpite.UnsupportedIoContext
import mirrg.xarpite.withEvaluator
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertFailsWith

class ApiVersionTest {

    @Test
    fun normalRuntimeRejectsUnsupportedVersions() = runTest {
        withEvaluator(UnsupportedIoContext()) { context, _ ->
            val versions = RuntimeContext.SUPPORTED_API_VERSIONS
            listOf(versions.first - 1, versions.last + 1).forEach { version ->
                assertFailsWith<IllegalStateException> { context.apiVersion = version }
                assertEquals(versions.first, context.apiVersion)
            }
        }
    }

    @Test
    fun testRuntimeAllowsOnlyTheUpperBoundToBeExceeded() = runTest {
        withEvaluator(UnsupportedIoContext()) { context, _ ->
            val versions = RuntimeContext.SUPPORTED_API_VERSIONS
            context.allowFutureApiVersions = true
            assertEquals(versions.first, context.apiVersion)
            context.apiVersion = versions.last + 1
            assertEquals(versions.last + 1, context.apiVersion)
            assertFailsWith<IllegalStateException> { context.apiVersion = versions.first - 1 }
            assertEquals(versions.last + 1, context.apiVersion)
        }
    }

}
