import kotlinx.coroutines.ExperimentalCoroutinesApi
import kotlinx.coroutines.test.runTest
import mirrg.xarpite.OperatorMethod
import mirrg.xarpite.compilers.objects.FluoriteNativeException
import mirrg.xarpite.compilers.objects.FluoriteNull
import mirrg.xarpite.compilers.objects.callMethodImmediate
import mirrg.xarpite.compilers.objects.instanceOf
import mirrg.xarpite.compilers.objects.toFluoriteString
import mirrg.xarpite.test.eval
import mirrg.xarpite.test.string
import kotlin.test.Test
import kotlin.test.assertEquals

@OptIn(ExperimentalCoroutinesApi::class)
class ExceptionTest {

    @Test
    fun message() = runTest {
        val withMessage = FluoriteNativeException(RuntimeException("Something failed"))
        assertEquals("Something failed", withMessage.callMethodImmediate(null, OperatorMethod.PROPERTY.methodName, arrayOf("message".toFluoriteString())).string) // メッセージの取得

        val withoutMessage = FluoriteNativeException(RuntimeException())
        assertEquals(FluoriteNull, withoutMessage.callMethodImmediate(null, OperatorMethod.PROPERTY.methodName, arrayOf("message".toFluoriteString()))) // メッセージが無い場合はNULL
    }

    @Test
    fun instanceOf() = runTest {
        val exception = FluoriteNativeException(RuntimeException("Something failed"))
        assertEquals(true, exception.instanceOf(eval("EXCEPTION"))) // EXCEPTIONのインスタンス
        assertEquals(true, exception.instanceOf(eval("VALUE"))) // 継承チェーンの根のVALUEのインスタンス
        assertEquals(false, exception.instanceOf(eval("PROMISE"))) // 無関係なクラスのインスタンスではない
    }

}
