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

private const val PREFIX_INCREMENT_METHOD = "++_"
private const val SUFFIX_INCREMENT_METHOD = "_++"
private const val PREFIX_DECREMENT_METHOD = "--_"
private const val SUFFIX_DECREMENT_METHOD = "_--"

private suspend fun callOperatorOrNull(value: FluoriteValue, methodName: String, arguments: Array<FluoriteValue>): FluoriteValue? {
    val callable = value.getMethod(methodName) ?: return null
    return withStackTrace(StackTraceElement.UNKNOWN) {
        callable.call(arguments)
    }
}

private suspend fun callAssignmentOrNull(value: FluoriteValue, methodName: String, arguments: Array<FluoriteValue>): Boolean {
    val callable = value.getMethod(methodName) ?: return false
    withStackTrace(StackTraceElement.UNKNOWN) {
        callable.call(arguments).consume()
    }
    return true
}

class PrefixIncrementGetter(private val getter: Getter, private val setter: Setter) : Getter {
    override suspend fun evaluate(env: Environment): FluoriteValue {
        val setterFunction = setter.evaluate(env)
        val oldValue = getter.evaluate(env)
        callOperatorOrNull(oldValue, PREFIX_INCREMENT_METHOD, emptyArray())?.let { return it }
        callOperatorOrNull(oldValue, SUFFIX_INCREMENT_METHOD, emptyArray())?.let { return it }
        if (callAssignmentOrNull(oldValue, OperatorMethod.PLUS_ASSIGN.methodName, arrayOf(FluoriteInt.ONE))) {
            return oldValue
        }
        val newValue = oldValue.plus(FluoriteInt.ONE)
        setterFunction(newValue)
        return newValue
    }

    override val code get() = "PrefixIncrementGetter[${getter.code};${setter.code}]"
}

class SuffixIncrementGetter(private val getter: Getter, private val setter: Setter) : Getter {
    override suspend fun evaluate(env: Environment): FluoriteValue {
        val setterFunction = setter.evaluate(env)
        val oldValue = getter.evaluate(env)
        callOperatorOrNull(oldValue, SUFFIX_INCREMENT_METHOD, emptyArray())?.let { return it }
        if (callAssignmentOrNull(oldValue, OperatorMethod.PLUS_ASSIGN.methodName, arrayOf(FluoriteInt.ONE))) {
            return oldValue
        }
        val newValue = oldValue.plus(FluoriteInt.ONE)
        setterFunction(newValue)
        return oldValue
    }

    override val code get() = "SuffixIncrementGetter[${getter.code};${setter.code}]"
}

class PrefixDecrementGetter(private val getter: Getter, private val setter: Setter) : Getter {
    override suspend fun evaluate(env: Environment): FluoriteValue {
        val setterFunction = setter.evaluate(env)
        val oldValue = getter.evaluate(env)
        callOperatorOrNull(oldValue, PREFIX_DECREMENT_METHOD, emptyArray())?.let { return it }
        callOperatorOrNull(oldValue, SUFFIX_DECREMENT_METHOD, emptyArray())?.let { return it }
        if (callAssignmentOrNull(oldValue, OperatorMethod.MINUS_ASSIGN.methodName, arrayOf(FluoriteInt.ONE))) {
            return oldValue
        }
        val newValue = oldValue.minus(FluoriteInt.ONE)
        setterFunction(newValue)
        return newValue
    }

    override val code get() = "PrefixDecrementGetter[${getter.code};${setter.code}]"
}

class SuffixDecrementGetter(private val getter: Getter, private val setter: Setter) : Getter {
    override suspend fun evaluate(env: Environment): FluoriteValue {
        val setterFunction = setter.evaluate(env)
        val oldValue = getter.evaluate(env)
        callOperatorOrNull(oldValue, SUFFIX_DECREMENT_METHOD, emptyArray())?.let { return it }
        if (callAssignmentOrNull(oldValue, OperatorMethod.MINUS_ASSIGN.methodName, arrayOf(FluoriteInt.ONE))) {
            return oldValue
        }
        val newValue = oldValue.minus(FluoriteInt.ONE)
        setterFunction(newValue)
        return oldValue
    }

    override val code get() = "SuffixDecrementGetter[${getter.code};${setter.code}]"
}
