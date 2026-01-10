package mirrg.xarpite.mounts

import kotlinx.coroutines.CoroutineScope
import mirrg.xarpite.compilers.objects.FluoriteValue

fun usage(vararg usages: String): Nothing = throw IllegalArgumentException(listOf("Usage:", *usages.map { "  $it" }.toTypedArray()).joinToString("\n"))

fun createCommonMounts(coroutineScope: CoroutineScope, daemonScope: CoroutineScope): List<Map<String, FluoriteValue>> {
    return listOf(
        createClassMounts(),
        createLangMounts(coroutineScope),
        createControlStructuresMounts(),
        createMathMounts(),
        createConvertMounts(),
        createStreamMounts(daemonScope),
        createDataConversionMounts(),
        createStringMounts(),
    ).flatten()
}
