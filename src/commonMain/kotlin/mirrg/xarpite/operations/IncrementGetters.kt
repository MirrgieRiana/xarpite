package mirrg.xarpite.operations

import mirrg.xarpite.Environment
import mirrg.xarpite.Position
import mirrg.xarpite.compilers.objects.FluoriteInt
import mirrg.xarpite.compilers.objects.FluoriteValue
import mirrg.xarpite.compilers.objects.minus
import mirrg.xarpite.compilers.objects.plus

class PrefixIncrementGetter(private val getter: Getter, private val setter: Setter, private val position: Position) : Getter {
    override suspend fun evaluate(env: Environment): FluoriteValue {
        val setterFunction = setter.evaluate(env)
        val oldValue = getter.evaluate(env)
        val newValue = oldValue.plus(position, FluoriteInt.ONE)
        setterFunction(newValue)
        return newValue
    }

    override val code get() = "PrefixIncrementGetter[${getter.code};${setter.code}]"
}

class SuffixIncrementGetter(private val getter: Getter, private val setter: Setter, private val position: Position) : Getter {
    override suspend fun evaluate(env: Environment): FluoriteValue {
        val setterFunction = setter.evaluate(env)
        val oldValue = getter.evaluate(env)
        val newValue = oldValue.plus(position, FluoriteInt.ONE)
        setterFunction(newValue)
        return oldValue
    }

    override val code get() = "SuffixIncrementGetter[${getter.code};${setter.code}]"
}

class PrefixDecrementGetter(private val getter: Getter, private val setter: Setter, private val position: Position) : Getter {
    override suspend fun evaluate(env: Environment): FluoriteValue {
        val setterFunction = setter.evaluate(env)
        val oldValue = getter.evaluate(env)
        val newValue = oldValue.minus(position, FluoriteInt.ONE)
        setterFunction(newValue)
        return newValue
    }

    override val code get() = "PrefixDecrementGetter[${getter.code};${setter.code}]"
}

class SuffixDecrementGetter(private val getter: Getter, private val setter: Setter, private val position: Position) : Getter {
    override suspend fun evaluate(env: Environment): FluoriteValue {
        val setterFunction = setter.evaluate(env)
        val oldValue = getter.evaluate(env)
        val newValue = oldValue.minus(position, FluoriteInt.ONE)
        setterFunction(newValue)
        return oldValue
    }

    override val code get() = "SuffixDecrementGetter[${getter.code};${setter.code}]"
}
