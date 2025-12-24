package mirrg.xarpite.mounts

import mirrg.xarpite.compilers.objects.FluoriteBoolean
import mirrg.xarpite.compilers.objects.FluoriteFunction
import mirrg.xarpite.compilers.objects.FluoriteStream
import mirrg.xarpite.compilers.objects.FluoriteValue
import mirrg.xarpite.compilers.objects.invoke

fun createOperationMounts(): List<Map<String, FluoriteValue>> {
    return mapOf(
        "WHILE" to FluoriteFunction { arguments ->
            if (arguments.size != 2) usage("<T> WHILE(condition: () -> BOOLEAN; block: () -> T): STREAM<T>")
            val condition = arguments[0]
            val block = arguments[1]
            FluoriteStream {
                while (true) {
                    val conditionResult = condition.invoke(emptyArray())
                    if (!(conditionResult as FluoriteBoolean).value) break
                    val result = block.invoke(emptyArray())
                    if (result is FluoriteStream) {
                        result.flowProvider(this)
                    } else {
                        emit(result)
                    }
                }
            }
        },
    ).let { listOf(it) }
}
