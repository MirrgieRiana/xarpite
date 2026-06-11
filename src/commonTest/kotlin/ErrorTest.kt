import kotlinx.coroutines.ExperimentalCoroutinesApi
import kotlinx.coroutines.test.runTest
import mirrg.xarpite.OperatorMethod
import mirrg.xarpite.compilers.objects.FluoriteError
import mirrg.xarpite.compilers.objects.FluoriteNull
import mirrg.xarpite.compilers.objects.callMethodImmediate
import mirrg.xarpite.compilers.objects.instanceOf
import mirrg.xarpite.compilers.objects.toFluoriteString
import mirrg.xarpite.test.eval
import mirrg.xarpite.test.string
import kotlin.test.Test
import kotlin.test.assertEquals

@OptIn(ExperimentalCoroutinesApi::class)
class ErrorTest {

    @Test
    fun message() = runTest {
        val withMessage = FluoriteError(RuntimeException("Something failed"))
        assertEquals("Something failed", withMessage.callMethodImmediate(null, OperatorMethod.PROPERTY.methodName, arrayOf("message".toFluoriteString())).string) // メッセージの取得

        val withoutMessage = FluoriteError(RuntimeException())
        assertEquals(FluoriteNull, withoutMessage.callMethodImmediate(null, OperatorMethod.PROPERTY.methodName, arrayOf("message".toFluoriteString()))) // メッセージが無い場合はNULL
    }

    @Test
    fun instanceOf() = runTest {
        val error = FluoriteError(RuntimeException("Something failed"))
        assertEquals(true, error.instanceOf(eval("ERROR"))) // ERRORのインスタンス
        assertEquals(true, error.instanceOf(eval("VALUE"))) // 継承チェーンの根のVALUEのインスタンス
        assertEquals(false, error.instanceOf(eval("PROMISE"))) // 無関係なクラスのインスタンスではない
    }

}
