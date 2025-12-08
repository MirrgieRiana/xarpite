package mirrg.xarpite.operations

import mirrg.xarpite.Environment
import mirrg.xarpite.compilers.objects.FluoriteValue

interface Operation {
    val code: String
}

val List<Operation>.code get() = this.joinToString(",") { it.code }

interface Getter : Operation {
    suspend fun evaluate(env: Environment): FluoriteValue
}

interface StringGetter : Operation {
    suspend fun evaluate(env: Environment): String
}

interface Comparator : Operation {
    suspend fun evaluate(env: Environment): suspend (FluoriteValue, FluoriteValue) -> Boolean
}

interface Runner : Operation {
    suspend fun evaluate(env: Environment)
}

interface Setter : Operation {
    suspend fun evaluate(env: Environment): suspend (FluoriteValue) -> Unit
}

interface ObjectInitializer : Operation {
    suspend fun initializeVariable(env: Environment, map: MutableMap<String, FluoriteValue>)
    suspend fun evaluate(env: Environment, map: MutableMap<String, FluoriteValue>)
}
