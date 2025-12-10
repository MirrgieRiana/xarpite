package mirrg.xarpite.js.test

import kotlinx.coroutines.CoroutineScope
import mirrg.xarpite.Evaluator
import mirrg.xarpite.compilers.objects.FluoriteValue
import mirrg.xarpite.js.createJsMounts
import mirrg.xarpite.mounts.createCommonMounts

fun CoroutineScope.createDefaultBuiltinMounts(): List<Map<String, FluoriteValue>> {
    return listOf(
        createCommonMounts(this) {},
        createJsMounts(),
    ).flatten()
}

suspend fun CoroutineScope.evalJs(src: String, createExtraMounts: () -> List<Map<String, FluoriteValue>> = { emptyList() }): FluoriteValue {
    val evaluator = Evaluator()
    evaluator.defineMounts(
        listOf(
            createDefaultBuiltinMounts(),
            createExtraMounts(),
        ).flatten()
    )
    return evaluator.get(src)
}
