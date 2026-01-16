import kotlinx.coroutines.ExperimentalCoroutinesApi
import kotlinx.coroutines.test.runTest
import mirrg.xarpite.test.array
import mirrg.xarpite.test.eval
import mirrg.xarpite.test.int
import kotlin.test.Test
import kotlin.test.assertEquals

@OptIn(ExperimentalCoroutinesApi::class)
class VariableTest {

    @Test
    fun delegatedVariableGetterTest() = runTest {
        // 委譲変数による取得のテスト
        """
            time := 0
            \now := () -> time
            
            time = 100
            now
        """.let { assertEquals(100, eval(it).int) }
    }

    @Test
    fun delegatedVariableSetterTest() = runTest {
        // 委譲変数による代入のテスト
        """
            time := 0
            \now := _ -> time = _
            
            now = 100
            time
        """.let { assertEquals(100, eval(it).int) }
    }

    @Test
    fun delegatedVariableGetterAndSetterTest() = runTest {
        // 委譲変数による取得と代入の両方のテスト
        """
            time := 0
            \now := _ -> __.$# == 0 ? time : (time = _)
            
            now = 100
            [time, now]
        """.let { assertEquals("[100;100]", eval(it).array()) }
        
        """
            time := 0
            \now := _ -> __.$# == 0 ? time : (time = _)
            
            now = 110
            [time, now]
        """.let { assertEquals("[110;110]", eval(it).array()) }
    }

    @Test
    fun delegatedVariableAccessPropertyTest() = runTest {
        // 委譲変数でプロパティアクセスをシミュレート
        """
            object := {value: 1}
            \value := () -> object.value
            value
        """.let { assertEquals(1, eval(it).int) }
    }

    @Test
    fun delegatedVariableMultipleAccessTest() = runTest {
        // 委譲変数に複数回アクセス
        """
            counter := 0
            \next := () -> (counter = counter + 1)
            
            [next, next, next]
        """.let { assertEquals("[1;2;3]", eval(it).array()) }
    }

    @Test
    fun lazyBasicTest() = runTest {
        // LAZYの基本動作テスト
        """
            \sum := LAZY ( => 1 .. 3 >> SUM )
            sum
        """.let { assertEquals(6, eval(it).int) }
    }

    @Test
    fun lazyWithDelegatedVariableTest() = runTest {
        // LAZYと委譲変数の組み合わせテスト
        """
            time := 0
            \now := LAZY ( => time )
            
            time = 100
            [now, now]
        """.let { assertEquals("[100;100]", eval(it).array()) }
    }

    @Test
    fun lazyMultipleAccessTest() = runTest {
        // LAZYで複数回アクセスしても1回しか評価されないことを確認
        """
            time := 0
            \now := LAZY ( => time )
            
            time = 100
            first := now
            time = 110
            second := now
            [first, second]
        """.let { assertEquals("[100;100]", eval(it).array()) }
    }

    @Test
    fun lazyEvaluationCountTest() = runTest {
        // LAZYが実際に1回しか評価されないことをカウンターで確認
        """
            counter := 0
            \increment := LAZY ( => (counter = counter + 1) )
            
            [increment, increment, increment, counter]
        """.let { assertEquals("[1;1;1;1]", eval(it).array()) }
    }

    @Test
    fun lazyWithStreamTest() = runTest {
        // LAZYがストリームを返した場合、解決してキャッシュすることを確認
        """
            counter := 0
            lazy := LAZY ( => (
                counter = counter + 1
                1 .. 3
            ) )
            
            first := lazy() >> SUM
            second := lazy() >> SUM
            [first, second, counter]
        """.let { assertEquals("[6;6;1]", eval(it).array()) }
    }

}
