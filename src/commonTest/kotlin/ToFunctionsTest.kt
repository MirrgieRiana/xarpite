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

    @Test
    fun orTest() = runTest {
        // 基本的な動作
        assertEquals(true, eval(""" OR(TRUE; TRUE) """).boolean)
        assertEquals(true, eval(""" OR(TRUE; FALSE) """).boolean)
        assertEquals(true, eval(""" OR(FALSE; TRUE) """).boolean)
        assertEquals(false, eval(""" OR(FALSE; FALSE) """).boolean)

        // 1個の引数
        assertEquals(true, eval(""" OR(TRUE) """).boolean)
        assertEquals(false, eval(""" OR(FALSE) """).boolean)

        // 論理値化を伴う動作
        assertEquals(true, eval(""" OR(1; 0) """).boolean)
        assertEquals(false, eval(""" OR(0; "") """).boolean)
        assertEquals(true, eval(""" OR(""; "a") """).boolean)
    }

    @Test
    fun anyTest() = runTest {
        // ANY は OR の別名
        assertEquals(true, eval(""" ANY(TRUE; FALSE) """).boolean)
        assertEquals(false, eval(""" ANY(FALSE; FALSE) """).boolean)
        assertEquals(true, eval(""" ANY(TRUE) """).boolean)
    }

    @Test
    fun andTest() = runTest {
        // 基本的な動作
        assertEquals(true, eval(""" AND(TRUE; TRUE) """).boolean)
        assertEquals(false, eval(""" AND(TRUE; FALSE) """).boolean)
        assertEquals(false, eval(""" AND(FALSE; TRUE) """).boolean)
        assertEquals(false, eval(""" AND(FALSE; FALSE) """).boolean)

        // 1個の引数
        assertEquals(true, eval(""" AND(TRUE) """).boolean)
        assertEquals(false, eval(""" AND(FALSE) """).boolean)

        // 論理値化を伴う動作
        assertEquals(true, eval(""" AND(1; "a") """).boolean)
        assertEquals(false, eval(""" AND(1; "") """).boolean)
        assertEquals(true, eval(""" AND("a"; "b") """).boolean)
    }

    @Test
    fun allTest() = runTest {
        // ALL は AND の別名
        assertEquals(true, eval(""" ALL(TRUE; TRUE) """).boolean)
        assertEquals(false, eval(""" ALL(TRUE; FALSE) """).boolean)
        assertEquals(true, eval(""" ALL(TRUE) """).boolean)
    }
}
