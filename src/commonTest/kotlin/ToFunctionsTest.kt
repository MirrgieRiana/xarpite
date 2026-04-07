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
        // 基本的な動作 - TRUEを返す
        assertEquals(true, eval(""" OR(TRUE; TRUE) """).boolean)
        assertEquals(true, eval(""" OR(TRUE; FALSE) """).boolean)
        assertEquals(true, eval(""" OR(FALSE; TRUE) """).boolean)

        // すべて偽の場合 - FALSEを返す
        assertEquals(false, eval(""" OR(FALSE; FALSE) """).boolean)

        // 1個の引数 - 引数が真ならTRUE、偽ならFALSE
        assertEquals(true, eval(""" OR(TRUE) """).boolean)
        assertEquals(false, eval(""" OR(FALSE) """).boolean)

        // 最初に真である要素を返す
        assertEquals(1, eval(""" OR(1; 0) """).int)
        assertEquals("a", eval(""" OR(""; "a") """).string)

        // すべて偽の場合はFALSEを返す
        assertEquals(false, eval(""" OR(0; "") """).boolean)

        // ストリームの場合 - 最初に真の要素を返す
        assertEquals(true, eval(""" OR(TRUE, FALSE; TRUE, FALSE) """).boolean)
        assertEquals(true, eval(""" 1 .. 50 | _ != 39 >> OR """).boolean)

        // ストリームの場合 - すべて偽ならFALSEを返す
        assertEquals(false, eval(""" FALSE, FALSE >> OR """).boolean)
        assertEquals(false, eval(""" 0, "" >> OR """).boolean)

        // 要素が一つも無い場合はFALSEを返す
        assertEquals(false, eval(""" EMPTY >> OR """).boolean)

        // イテレーションのスキップ確認
        val result1 = eval("""
            list := []
            1, "a", TRUE, 0, "b" | (
                list += _
                _
            ) >> OR
            list
        """)
        assertEquals("[1]", result1.toString()) // [1] だけが評価される
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
        // すべて真の場合 - TRUEを返す
        assertEquals(true, eval(""" AND(TRUE; TRUE) """).boolean)

        // 偽の要素がある場合 - 最初の偽の要素を返す
        assertEquals(false, eval(""" AND(TRUE; FALSE) """).boolean)
        assertEquals(false, eval(""" AND(FALSE; TRUE) """).boolean)
        assertEquals(false, eval(""" AND(FALSE; FALSE) """).boolean)

        // 1個の引数 - 引数が真ならTRUE、偽ならその要素を返す
        assertEquals(true, eval(""" AND(TRUE) """).boolean)
        assertEquals(false, eval(""" AND(FALSE) """).boolean)

        // 最初に偽である要素を返す
        assertEquals(0, eval(""" AND(1, "a", TRUE, 0, "b") """).int)
        assertEquals("", eval(""" AND(1; "") """).string)

        // すべて真の場合はTRUEを返す
        assertEquals(true, eval(""" AND(1; "a") """).boolean)
        assertEquals(true, eval(""" AND("a"; "b") """).boolean)
        assertEquals(true, eval(""" AND(1, "a", TRUE, 2, "b") """).boolean)

        // ストリームの場合
        assertEquals(false, eval(""" AND(TRUE, FALSE; TRUE, FALSE) """).boolean)
        assertEquals(false, eval(""" 1 .. 50 | _ != 39 >> AND """).boolean)
        assertEquals(true, eval(""" 1 .. 50 | _ != 0 >> AND """).boolean)

        // 要素が一つも無い場合はTRUEを返す
        assertEquals(true, eval(""" EMPTY >> AND """).boolean)

        // イテレーションのスキップ確認
        val result2 = eval("""
            list := []
            5 .. -5 | (
                list += _
                _
            ) >> AND
            list
        """)
        assertEquals("[5;4;3;2;1;0]", result2.toString()) // 0 が見つかるまで評価される
    }

    @Test
    fun allTest() = runTest {
        // ALL は AND の別名
        assertEquals(true, eval(""" ALL(TRUE; TRUE) """).boolean)
        assertEquals(false, eval(""" ALL(TRUE; FALSE) """).boolean)
        assertEquals(true, eval(""" ALL(TRUE) """).boolean)
    }
}
