package mirrg.xarpite.js.test

import kotlinx.coroutines.CoroutineScope
import mirrg.xarpite.Mount
import mirrg.xarpite.RuntimeContext
import mirrg.xarpite.UnsupportedIoContext
import mirrg.xarpite.compilers.objects.FluoriteValue
import mirrg.xarpite.compilers.objects.cache
import mirrg.xarpite.js.createJsMounts
import mirrg.xarpite.mounts.createCommonMounts
import mirrg.xarpite.test.get
import mirrg.xarpite.withEvaluator

context(context: RuntimeContext)
fun createDefaultBuiltinMounts() = createCommonMounts() + createJsMounts()

suspend fun CoroutineScope.evalJs(src: String, createExtraMounts: context(RuntimeContext) () -> List<Map<String, Mount>> = { emptyList() }): FluoriteValue {
    return withEvaluator(UnsupportedIoContext()) { context, evaluator ->
        evaluator.defineMounts(context.run { createDefaultBuiltinMounts() + createExtraMounts() })
        evaluator.get(src).cache()
    }
}
