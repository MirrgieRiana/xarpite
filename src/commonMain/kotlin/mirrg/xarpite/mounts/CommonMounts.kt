package mirrg.xarpite.mounts

import mirrg.xarpite.RuntimeContext
import mirrg.xarpite.compilers.objects.FluoriteValue
import mirrg.xarpite.compilers.objects.toFluoriteString
import mirrg.xarpite.operations.FluoriteException

fun usage(vararg usages: String): Nothing = throw FluoriteException(listOf("Usage:", *usages.map { "  $it" }.toTypedArray()).joinToString("\n").toFluoriteString())

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
