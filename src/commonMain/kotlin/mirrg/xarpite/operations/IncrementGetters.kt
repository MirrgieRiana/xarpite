package mirrg.xarpite.operations

import mirrg.xarpite.Environment
import mirrg.xarpite.OperatorMethod
import mirrg.xarpite.Position
import mirrg.xarpite.compilers.objects.FluoriteInt
import mirrg.xarpite.compilers.objects.FluoriteValue
import mirrg.xarpite.compilers.objects.getMethod
import mirrg.xarpite.compilers.objects.minus
import mirrg.xarpite.compilers.objects.plus

class PrefixIncrementGetter(private val getter: Getter, private val setter: Setter, private val position: Position) : Getter {
    override suspend fun evaluate(env: Environment): FluoriteValue {
        val setterFunction = setter.evaluate(env)
        val oldValue = getter.evaluate(env)
        
        // ++_ メソッドを試す
        val prefixIncrementMethod = oldValue.getMethod(position, OperatorMethod.PREFIX_INCREMENT.methodName)
        if (prefixIncrementMethod != null) {
            val newValue = prefixIncrementMethod.call(arrayOf())
            setterFunction(newValue)
            return newValue
        }
        
        // _++ メソッドを試す
        val suffixIncrementMethod = oldValue.getMethod(position, OperatorMethod.SUFFIX_INCREMENT.methodName)
        if (suffixIncrementMethod != null) {
            val newValue = suffixIncrementMethod.call(arrayOf())
            setterFunction(newValue)
            return newValue
        }
        
        // _+=_ メソッドを試す
        val plusAssignMethod = oldValue.getMethod(position, OperatorMethod.PLUS_ASSIGN.methodName)
        if (plusAssignMethod != null) {
            val newValue = plusAssignMethod.call(arrayOf(FluoriteInt.ONE))
            setterFunction(newValue)
            return newValue
        }
        
        // _+_ メソッドにフォールバック
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
        
        // _++ メソッドを試す
        val suffixIncrementMethod = oldValue.getMethod(position, OperatorMethod.SUFFIX_INCREMENT.methodName)
        if (suffixIncrementMethod != null) {
            val result = suffixIncrementMethod.call(arrayOf())
            setterFunction(result)
            return oldValue
        }
        
        // _+=_ メソッドを試す
        val plusAssignMethod = oldValue.getMethod(position, OperatorMethod.PLUS_ASSIGN.methodName)
        if (plusAssignMethod != null) {
            val newValue = plusAssignMethod.call(arrayOf(FluoriteInt.ONE))
            setterFunction(newValue)
            return oldValue
        }
        
        // _+_ メソッドにフォールバック
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
        
        // --_ メソッドを試す
        val prefixDecrementMethod = oldValue.getMethod(position, OperatorMethod.PREFIX_DECREMENT.methodName)
        if (prefixDecrementMethod != null) {
            val newValue = prefixDecrementMethod.call(arrayOf())
            setterFunction(newValue)
            return newValue
        }
        
        // _-- メソッドを試す
        val suffixDecrementMethod = oldValue.getMethod(position, OperatorMethod.SUFFIX_DECREMENT.methodName)
        if (suffixDecrementMethod != null) {
            val newValue = suffixDecrementMethod.call(arrayOf())
            setterFunction(newValue)
            return newValue
        }
        
        // _-=_ メソッドを試す
        val minusAssignMethod = oldValue.getMethod(position, OperatorMethod.MINUS_ASSIGN.methodName)
        if (minusAssignMethod != null) {
            val newValue = minusAssignMethod.call(arrayOf(FluoriteInt.ONE))
            setterFunction(newValue)
            return newValue
        }
        
        // _-_ メソッドにフォールバック
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
        
        // _-- メソッドを試す
        val suffixDecrementMethod = oldValue.getMethod(position, OperatorMethod.SUFFIX_DECREMENT.methodName)
        if (suffixDecrementMethod != null) {
            val result = suffixDecrementMethod.call(arrayOf())
            setterFunction(result)
            return oldValue
        }
        
        // _-=_ メソッドを試す
        val minusAssignMethod = oldValue.getMethod(position, OperatorMethod.MINUS_ASSIGN.methodName)
        if (minusAssignMethod != null) {
            val newValue = minusAssignMethod.call(arrayOf(FluoriteInt.ONE))
            setterFunction(newValue)
            return oldValue
        }
        
        // _-_ メソッドにフォールバック
        val newValue = oldValue.minus(position, FluoriteInt.ONE)
        setterFunction(newValue)
        return oldValue
    }

    override val code get() = "SuffixDecrementGetter[${getter.code};${setter.code}]"
}
