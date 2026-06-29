import kotlinx.coroutines.ExperimentalCoroutinesApi
import kotlinx.coroutines.test.runTest
import mirrg.xarpite.MatrixPositionCalculator
import mirrg.xarpite.Position
import mirrg.xarpite.RuntimeContext
import mirrg.xarpite.UnsupportedIoContext
import kotlin.test.Test
import kotlin.test.assertEquals

@OptIn(ExperimentalCoroutinesApi::class)
class StackTraceTest {
    @Test
    fun renderPositionTest() = runTest {
        val context = RuntimeContext(this, this, object : UnsupportedIoContext() {
            override fun getEnv() = emptyMap<String, String>()
            override fun getPlatformPwd() = "/"
        })

        // 複数行のソースコードを設定
        val src = "abc def ghi\nklm nop qrs\ntuv wxy z"
        context.setSrc("test.xpr", src)

        // 1行目3列目（行の先頭に近い）
        val position1 = Position("test.xpr", 2) // "c" の位置
        val result1 = context.renderPosition(position1)
        // startColumnIndex = 0, errorPositionInSnippet = 2, leftMargin = 8
        // positionPadding = 4, 固定2空白
        // 4 + 2 + 8 = 14個の空白
        assertEquals("test.xpr:1:3              abc def ghi", result1)

        // 1行目1列目（行の先頭）
        val position2 = Position("test.xpr", 0) // "a" の位置
        val result2 = context.renderPosition(position2)
        // startColumnIndex = 0, errorPositionInSnippet = 0, leftMargin = 10
        // positionPadding = 4, 固定2空白
        // 4 + 2 + 10 = 16個の空白
        assertEquals("test.xpr:1:1                abc def ghi", result2)

        // 1行目10列目（まだ先頭に近い）
        val position3 = Position("test.xpr", 9) // "g" の位置
        val result3 = context.renderPosition(position3)
        // startColumnIndex = 0, errorPositionInSnippet = 9, leftMargin = 1
        // positionPadding = 3, 固定2空白
        // 3 + 2 + 1 = 6個の空白
        assertEquals("test.xpr:1:10      abc def ghi", result3)

        // 1行目11列目（ちょうど境界）
        val position4 = Position("test.xpr", 10) // "h" の位置
        val result4 = context.renderPosition(position4)
        // startColumnIndex = 0, errorPositionInSnippet = 10, leftMargin = 0
        // positionPadding = 3, 固定2空白
        // 3 + 2 + 0 = 5個の空白
        assertEquals("test.xpr:1:11     abc def ghi", result4)
    }

    @Test
    fun matrixPositionCalculatorTest() {
        val src = "abc def\nghi jkl\nmno"
        val calculator = MatrixPositionCalculator(src)

        // 1行目の各位置
        assertEquals(Pair(1, 1), calculator.toMatrixPosition(0))
        assertEquals(Pair(1, 2), calculator.toMatrixPosition(1))
        assertEquals(Pair(1, 3), calculator.toMatrixPosition(2))
        assertEquals(Pair(1, 7), calculator.toMatrixPosition(6))

        // 改行の位置（1行目の終わり）
        assertEquals(Pair(1, 8), calculator.toMatrixPosition(7))

        // 2行目の各位置
        assertEquals(Pair(2, 1), calculator.toMatrixPosition(8))
        assertEquals(Pair(2, 2), calculator.toMatrixPosition(9))

        // 行の取得
        assertEquals("abc def", calculator.getLine(1))
        assertEquals("ghi jkl", calculator.getLine(2))
        assertEquals("mno", calculator.getLine(3))
    }
}
