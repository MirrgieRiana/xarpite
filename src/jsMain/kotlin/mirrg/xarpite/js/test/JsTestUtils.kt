package mirrg.xarpite.js.test

import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Job
import kotlinx.coroutines.SupervisorJob
import kotlinx.coroutines.cancel
import mirrg.xarpite.Evaluator
import mirrg.xarpite.compilers.objects.FluoriteValue
import mirrg.xarpite.compilers.objects.cache
import mirrg.xarpite.js.createJsMounts
import mirrg.xarpite.mounts.createCommonMounts
import kotlin.coroutines.coroutineContext

fun CoroutineScope.createDefaultBuiltinMounts(daemonScope: CoroutineScope): List<Map<String, FluoriteValue>> {
    return listOf(
        createCommonMounts(this, daemonScope, {}),
        createJsMounts(),
    ).flatten()
}

suspend fun CoroutineScope.evalJs(src: String, createExtraMounts: () -> List<Map<String, FluoriteValue>> = { emptyList() }): FluoriteValue {
    val evaluator = Evaluator()
    val daemonScope = CoroutineScope(coroutineContext + SupervisorJob())
    try {
        evaluator.defineMounts(
            listOf(
                createDefaultBuiltinMounts(daemonScope),
                createExtraMounts(),
            ).flatten()
        )
        return evaluator.get(src).cache()
    } finally {
        daemonScope.cancel()
    }
}
