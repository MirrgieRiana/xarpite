import kotlinx.coroutines.test.runTest
import mirrg.xarpite.test.boolean
import mirrg.xarpite.test.eval
import mirrg.xarpite.test.int
import mirrg.xarpite.test.string
import kotlin.test.Test
import kotlin.test.assertEquals

class ToFunctionsTest {
    @Test
    fun toStringTest() = runTest {
        assertEquals("123", eval(""" TO_STRING(123) """).string)
        assertEquals("abc", eval(""" TO_STRING("abc") """).string)
        assertEquals("123", eval(""" 1, 2, 3 >> TO_STRING """).string)
    }

    @Test
    fun toNumberTest() = runTest {
        assertEquals(123, eval(""" TO_NUMBER("123") """).int)
        assertEquals(6, eval(""" 1, 2, 3 >> TO_NUMBER """).int)
        assertEquals(0, eval(""" TO_NUMBER(NULL) """).int)
    }

    @Test
    fun toBooleanTest() = runTest {
        assertEquals(false, eval(""" TO_BOOLEAN("") """).boolean)
        assertEquals(true, eval(""" TO_BOOLEAN("x") """).boolean)
        assertEquals(false, eval(""" TO_BOOLEAN(0) """).boolean)
        assertEquals(true, eval(""" TO_BOOLEAN(1) """).boolean)
        assertEquals(true, eval(""" FALSE, TRUE, FALSE >> TO_BOOLEAN """).boolean)
    }
}
