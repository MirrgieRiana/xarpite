package mirrg.xarpite.operations

import mirrg.xarpite.Environment
import mirrg.xarpite.Variable
import mirrg.xarpite.compilers.objects.FluoriteArray
import mirrg.xarpite.compilers.objects.FluoriteStream
import mirrg.xarpite.compilers.objects.FluoriteValue
import mirrg.xarpite.compilers.objects.collect

class ObjectEntryVariable(private val env: Environment, private val map: MutableMap<String, FluoriteValue>, private val key: String, private val getter: Getter) : Variable {
    override suspend fun get(): FluoriteValue {
        val value = map[key]
        return if (value == null) {
            val newValue = getter.evaluate(env)
            map[key] = newValue
            newValue
        } else {
            value
        }
    }

    override suspend fun set(value: FluoriteValue) {
        map[key] = value
    }
}

class VariableDefinitionObjectInitializer(private val key: String, private val frameIndex: Int, private val variableIndex: Int, private val getter: Getter) : ObjectInitializer {
    override suspend fun initializeVariable(env: Environment, map: MutableMap<String, FluoriteValue>) {
        env.variableTable[frameIndex][variableIndex] = ObjectEntryVariable(env, map, key, getter)
    }

    override suspend fun evaluate(env: Environment, map: MutableMap<String, FluoriteValue>) {
        map[key] = getter.evaluate(env)
    }

    override val code get() = "VariableDefinitionObjectInitializer[$key;$frameIndex;$variableIndex;${getter.code}]"
}

class GetterObjectInitializer(private val entriesGetter: Getter) : ObjectInitializer {
    override suspend fun initializeVariable(env: Environment, map: MutableMap<String, FluoriteValue>) {

    }

    override suspend fun evaluate(env: Environment, map: MutableMap<String, FluoriteValue>) {
        val value = entriesGetter.evaluate(env)
        if (value is FluoriteStream) {
            value.collect { item ->
                require(item is FluoriteArray)
                require(item.values.size == 2)
                map[item.values[0].toString()] = item.values[1]
            }
        } else {
            require(value is FluoriteArray)
            require(value.values.size == 2)
            map[value.values[0].toString()] = value.values[1]
        }
    }

    override val code get() = "GetterObjectInitializer[${entriesGetter.code}]"
}
