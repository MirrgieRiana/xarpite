package mirrg.xarpite.js.test

import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.SupervisorJob
import kotlinx.coroutines.cancel
import kotlinx.coroutines.coroutineScope
import mirrg.xarpite.Evaluator
import mirrg.xarpite.IoContext
import mirrg.xarpite.RuntimeContext
import mirrg.xarpite.compilers.objects.FluoriteValue
import mirrg.xarpite.compilers.objects.cache
import mirrg.xarpite.js.createJsMounts
import mirrg.xarpite.mounts.createCommonMounts

context(context: RuntimeContext)
fun createDefaultBuiltinMounts() = createCommonMounts() + createJsMounts()

suspend fun CoroutineScope.evalJs(src: String, createExtraMounts: context(RuntimeContext) () -> List<Map<String, FluoriteValue>> = { emptyList() }): FluoriteValue {
    val daemonScope = CoroutineScope(coroutineContext + SupervisorJob())
    try {
        return coroutineScope main@{
            val context = RuntimeContext(
                this@main,
                daemonScope,
                object : IoContext {
                    override suspend fun out(value: FluoriteValue) = Unit
                },
            )
            val evaluator = Evaluator()
            evaluator.defineMounts(context.run { createDefaultBuiltinMounts() + createExtraMounts() })
            evaluator.get(src).cache()
        }
    } finally {
        daemonScope.cancel()
    }
}
