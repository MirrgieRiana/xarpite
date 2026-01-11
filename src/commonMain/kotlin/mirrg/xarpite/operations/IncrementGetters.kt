package mirrg.xarpite.operations

import mirrg.xarpite.Environment
import mirrg.xarpite.compilers.objects.FluoriteInt
import mirrg.xarpite.compilers.objects.FluoriteValue

class PrefixIncrementGetter(private val getter: Getter, private val setter: Setter) : Getter {
    override suspend fun evaluate(env: Environment): FluoriteValue {
        val setter = setter.evaluate(env)
        val oldValue = getter.evaluate(env)
        val newValue = PlusGetter(LiteralGetter(oldValue), LiteralGetter(FluoriteInt.ONE)).evaluate(env)
        setter.invoke(newValue)
        return newValue
    }

    override val code get() = "PrefixIncrementGetter[${getter.code};${setter.code}]"
}

class SuffixIncrementGetter(private val getter: Getter, private val setter: Setter) : Getter {
    override suspend fun evaluate(env: Environment): FluoriteValue {
        val setter = setter.evaluate(env)
        val oldValue = getter.evaluate(env)
        val newValue = PlusGetter(LiteralGetter(oldValue), LiteralGetter(FluoriteInt.ONE)).evaluate(env)
        setter.invoke(newValue)
        return oldValue
    }

    override val code get() = "SuffixIncrementGetter[${getter.code};${setter.code}]"
}

class PrefixDecrementGetter(private val getter: Getter, private val setter: Setter) : Getter {
    override suspend fun evaluate(env: Environment): FluoriteValue {
        val setter = setter.evaluate(env)
        val oldValue = getter.evaluate(env)
        val newValue = MinusGetter(LiteralGetter(oldValue), LiteralGetter(FluoriteInt.ONE)).evaluate(env)
        setter.invoke(newValue)
        return newValue
    }

    override val code get() = "PrefixDecrementGetter[${getter.code};${setter.code}]"
}

class SuffixDecrementGetter(private val getter: Getter, private val setter: Setter) : Getter {
    override suspend fun evaluate(env: Environment): FluoriteValue {
        val setter = setter.evaluate(env)
        val oldValue = getter.evaluate(env)
        val newValue = MinusGetter(LiteralGetter(oldValue), LiteralGetter(FluoriteInt.ONE)).evaluate(env)
        setter.invoke(newValue)
        return oldValue
    }

    override val code get() = "SuffixDecrementGetter[${getter.code};${setter.code}]"
}
