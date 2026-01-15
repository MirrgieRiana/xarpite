package mirrg.xarpite.mounts

import mirrg.xarpite.RuntimeContext
import mirrg.xarpite.compilers.objects.FluoriteValue

fun usage(vararg usages: String): Nothing = throw IllegalArgumentException(listOf("Usage:", *usages.map { "  $it" }.toTypedArray()).joinToString("\n"))

context(context: RuntimeContext)
fun createCommonMounts(): List<Map<String, FluoriteValue>> {
    return listOf(
        createClassMounts(),
        createLangMounts(),
        createControlStructuresMounts(),
        createMathMounts(),
        createConvertMounts(),
        createStreamMounts(),
        createDataConversionMounts(),
        createStringMounts(),
    ).flatten()
}
