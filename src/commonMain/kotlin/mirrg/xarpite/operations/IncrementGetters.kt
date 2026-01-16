package mirrg.xarpite.operations

import mirrg.xarpite.Environment
import mirrg.xarpite.OperatorMethod
import mirrg.xarpite.StackTraceElement
import mirrg.xarpite.compilers.objects.FluoriteInt
import mirrg.xarpite.compilers.objects.FluoriteValue
import mirrg.xarpite.compilers.objects.consume
import mirrg.xarpite.compilers.objects.getMethod
import mirrg.xarpite.compilers.objects.minus
import mirrg.xarpite.compilers.objects.plus
import mirrg.xarpite.withStackTrace

class PrefixIncrementGetter(private val getter: Getter, private val setter: Setter) : Getter {
    override suspend fun evaluate(env: Environment): FluoriteValue {
        val setterFunction = setter.evaluate(env)
        val oldValue = getter.evaluate(env)
        return incrementValue(getter, env, oldValue, setterFunction, true)
    }

    override val code get() = "PrefixIncrementGetter[${getter.code};${setter.code}]"
}

class SuffixIncrementGetter(private val getter: Getter, private val setter: Setter) : Getter {
    override suspend fun evaluate(env: Environment): FluoriteValue {
        val setterFunction = setter.evaluate(env)
        val oldValue = getter.evaluate(env)
        incrementValue(getter, env, oldValue, setterFunction, false)
        return oldValue
    }

    override val code get() = "SuffixIncrementGetter[${getter.code};${setter.code}]"
}

class PrefixDecrementGetter(private val getter: Getter, private val setter: Setter) : Getter {
    override suspend fun evaluate(env: Environment): FluoriteValue {
        val setterFunction = setter.evaluate(env)
        val oldValue = getter.evaluate(env)
        return decrementValue(getter, env, oldValue, setterFunction, true)
    }

    override val code get() = "PrefixDecrementGetter[${getter.code};${setter.code}]"
}

class SuffixDecrementGetter(private val getter: Getter, private val setter: Setter) : Getter {
    override suspend fun evaluate(env: Environment): FluoriteValue {
        val setterFunction = setter.evaluate(env)
        val oldValue = getter.evaluate(env)
        decrementValue(getter, env, oldValue, setterFunction, false)
        return oldValue
    }

    override val code get() = "SuffixDecrementGetter[${getter.code};${setter.code}]"
}

private suspend fun incrementValue(
    getter: Getter,
    env: Environment,
    oldValue: FluoriteValue,
    setterFunction: suspend (FluoriteValue) -> Unit,
    preferPrefix: Boolean,
): FluoriteValue {
    val methodOrder = buildList {
        if (preferPrefix) add(OperatorMethod.PREFIX_INCREMENT)
        add(OperatorMethod.SUFFIX_INCREMENT)
    }
    for (method in methodOrder) {
        val callable = oldValue.getMethod(method.methodName) ?: continue
        val newValue = withStackTrace(StackTraceElement.UNKNOWN) { callable.call(emptyArray()) }
        setterFunction(newValue)
        return newValue
    }

    oldValue.getMethod(OperatorMethod.PLUS_ASSIGN.methodName)?.let { callable ->
        withStackTrace(StackTraceElement.UNKNOWN) { callable.call(arrayOf(FluoriteInt.ONE)).consume() }
        return getter.evaluate(env)
    }

    val newValue = oldValue.plus(FluoriteInt.ONE)
    setterFunction(newValue)
    return newValue
}

private suspend fun decrementValue(
    getter: Getter,
    env: Environment,
    oldValue: FluoriteValue,
    setterFunction: suspend (FluoriteValue) -> Unit,
    preferPrefix: Boolean,
): FluoriteValue {
    val methodOrder = buildList {
        if (preferPrefix) add(OperatorMethod.PREFIX_DECREMENT)
        add(OperatorMethod.SUFFIX_DECREMENT)
    }
    for (method in methodOrder) {
        val callable = oldValue.getMethod(method.methodName) ?: continue
        val newValue = withStackTrace(StackTraceElement.UNKNOWN) { callable.call(emptyArray()) }
        setterFunction(newValue)
        return newValue
    }

    oldValue.getMethod(OperatorMethod.MINUS_ASSIGN.methodName)?.let { callable ->
        withStackTrace(StackTraceElement.UNKNOWN) { callable.call(arrayOf(FluoriteInt.ONE)).consume() }
        return getter.evaluate(env)
    }

    val newValue = oldValue.minus(FluoriteInt.ONE)
    setterFunction(newValue)
    return newValue
}
