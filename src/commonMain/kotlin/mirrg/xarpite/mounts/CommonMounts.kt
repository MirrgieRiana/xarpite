package mirrg.xarpite.mounts

import kotlinx.coroutines.CoroutineScope
import mirrg.xarpite.compilers.objects.FluoriteValue

fun usage(vararg usages: String): Nothing = throw IllegalArgumentException(listOf("Usage:", *usages.map { "  $it" }.toTypedArray()).joinToString("\n"))

fun createCommonMounts(coroutineScope: CoroutineScope, daemonScope: CoroutineScope, out: suspend (FluoriteValue) -> Unit, err: suspend (FluoriteValue) -> Unit): List<Map<String, FluoriteValue>> {
    return listOf(
        createClassMounts(),
        createLangMounts(coroutineScope, out),
        createControlStructuresMounts(),
        createMathMounts(),
        createConvertMounts(),
        createStreamMounts(daemonScope),
        createDataConversionMounts(),
        createStringMounts(),
    ).flatten()
}
