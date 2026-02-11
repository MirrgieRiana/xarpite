package mirrg.xarpite.mounts

import mirrg.xarpite.Mount
import mirrg.xarpite.RuntimeContext
import mirrg.xarpite.compilers.objects.toFluoriteString
import mirrg.xarpite.operations.FluoriteException

fun usage(vararg usages: String): Nothing {
    if (usages.isEmpty()) {
        throw FluoriteException("No usage information available.".toFluoriteString())
    } else if (usages.size == 1) {
        throw FluoriteException("Usage: ${usages.single()}".toFluoriteString())
    } else {
        throw FluoriteException(listOf("Usage:", *usages.map { "  $it" }.toTypedArray()).joinToString("\n").toFluoriteString())
    }
}

context(context: RuntimeContext)
fun createCommonMounts(): List<Map<String, Mount>> {
    return listOf(
        createClassMounts(),
        createLangMounts(),
        createControlStructuresMounts(),
        createMathMounts(),
        createConvertMounts(),
        createStreamMounts(),
        createDataConversionMounts(),
        createStringMounts(),
        createIoMounts(),
    ).flatten()
}
