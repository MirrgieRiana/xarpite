package mirrg.xarpite.mounts

import mirrg.xarpite.compilers.objects.FluoriteBoolean
import mirrg.xarpite.compilers.objects.FluoriteFunction
import mirrg.xarpite.compilers.objects.FluoriteNull
import mirrg.xarpite.compilers.objects.FluoriteValue
import mirrg.xarpite.compilers.objects.invoke

fun createControlStructuresMounts(): List<Map<String, FluoriteValue>> {
    return mapOf(
        "WHILE" to FluoriteFunction { arguments ->
            if (arguments.size != 2) usage("WHILE(condition: () -> BOOLEAN; block: () -> VALUE): NULL")
            val condition = arguments[0]
            val block = arguments[1]
            while (true) {
                val conditionResult = condition.invoke(emptyArray())
                if (!(conditionResult as FluoriteBoolean).value) break
                block.invoke(emptyArray()) // Execute but discard the result
            }
            FluoriteNull
        },
    ).let { listOf(it) }
}
