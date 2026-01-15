package mirrg.xarpite.mounts

import mirrg.xarpite.RuntimeContext
import mirrg.xarpite.compilers.objects.FluoriteFunction
import mirrg.xarpite.compilers.objects.FluoriteNull
import mirrg.xarpite.compilers.objects.FluoriteValue
import mirrg.xarpite.compilers.objects.consume
import mirrg.xarpite.compilers.objects.invoke
import mirrg.xarpite.compilers.objects.toBoolean

context(context: RuntimeContext)
fun createControlStructuresMounts(): List<Map<String, FluoriteValue>> {
    return mapOf(
        "WHILE" to FluoriteFunction { arguments ->
            if (arguments.size != 2) usage("WHILE(condition: () -> BOOLEAN; block: () -> VALUE): NULL")
            val condition = arguments[0]
            val block = arguments[1]
            while (true) {
                val conditionResult = condition.invoke(emptyArray())
                if (!conditionResult.toBoolean()) break
                block.invoke(emptyArray()).consume()
            }
            FluoriteNull
        },
    ).let { listOf(it) }
}
