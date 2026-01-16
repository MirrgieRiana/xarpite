package mirrg.xarpite.operations

import mirrg.xarpite.Environment
import mirrg.xarpite.OperatorMethod
import mirrg.xarpite.compilers.objects.FluoriteInt
import mirrg.xarpite.compilers.objects.FluoriteValue
import mirrg.xarpite.compilers.objects.getMethod
import mirrg.xarpite.compilers.objects.minus
import mirrg.xarpite.compilers.objects.plus

class PrefixIncrementGetter(private val getter: Getter, private val setter: Setter) : Getter {
    override suspend fun evaluate(env: Environment): FluoriteValue {
        val setterFunction = setter.evaluate(env)
        val oldValue = getter.evaluate(env)
        
        // フォールバックチェーン: ++_ → _++ → _+=_ → _+_
        val prefixIncrementMethod = oldValue.getMethod(OperatorMethod.PREFIX_INCREMENT.methodName)
        if (prefixIncrementMethod != null) {
            // ++_ メソッドが存在する場合
            val result = prefixIncrementMethod.call(arrayOf())
            setterFunction(result)
            return result
        }
        
        val suffixIncrementMethod = oldValue.getMethod(OperatorMethod.SUFFIX_INCREMENT.methodName)
        if (suffixIncrementMethod != null) {
            // _++ メソッドが存在する場合（前置版は _++ にフォールバック）
            val result = suffixIncrementMethod.call(arrayOf())
            setterFunction(result)
            return result
        }
        
        val plusAssignMethod = oldValue.getMethod(OperatorMethod.PLUS_ASSIGN.methodName)
        if (plusAssignMethod != null) {
            // _+=_ メソッドが存在する場合
            plusAssignMethod.call(arrayOf(FluoriteInt.ONE))
            val newValue = getter.evaluate(env)
            return newValue
        }
        
        // デフォルト: _+_ メソッドを使用
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
        
        // フォールバックチェーン: _++ → _+=_ → _+_
        val suffixIncrementMethod = oldValue.getMethod(OperatorMethod.SUFFIX_INCREMENT.methodName)
        if (suffixIncrementMethod != null) {
            // _++ メソッドが存在する場合
            suffixIncrementMethod.call(arrayOf())
            return oldValue
        }
        
        val plusAssignMethod = oldValue.getMethod(OperatorMethod.PLUS_ASSIGN.methodName)
        if (plusAssignMethod != null) {
            // _+=_ メソッドが存在する場合
            plusAssignMethod.call(arrayOf(FluoriteInt.ONE))
            return oldValue
        }
        
        // デフォルト: _+_ メソッドを使用
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
        
        // フォールバックチェーン: --_ → _-- → _-=_ → _-_
        val prefixDecrementMethod = oldValue.getMethod(OperatorMethod.PREFIX_DECREMENT.methodName)
        if (prefixDecrementMethod != null) {
            // --_ メソッドが存在する場合
            val result = prefixDecrementMethod.call(arrayOf())
            setterFunction(result)
            return result
        }
        
        val suffixDecrementMethod = oldValue.getMethod(OperatorMethod.SUFFIX_DECREMENT.methodName)
        if (suffixDecrementMethod != null) {
            // _-- メソッドが存在する場合（前置版は _-- にフォールバック）
            val result = suffixDecrementMethod.call(arrayOf())
            setterFunction(result)
            return result
        }
        
        val minusAssignMethod = oldValue.getMethod(OperatorMethod.MINUS_ASSIGN.methodName)
        if (minusAssignMethod != null) {
            // _-=_ メソッドが存在する場合
            minusAssignMethod.call(arrayOf(FluoriteInt.ONE))
            val newValue = getter.evaluate(env)
            return newValue
        }
        
        // デフォルト: _-_ メソッドを使用
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
        
        // フォールバックチェーン: _-- → _-=_ → _-_
        val suffixDecrementMethod = oldValue.getMethod(OperatorMethod.SUFFIX_DECREMENT.methodName)
        if (suffixDecrementMethod != null) {
            // _-- メソッドが存在する場合
            suffixDecrementMethod.call(arrayOf())
            return oldValue
        }
        
        val minusAssignMethod = oldValue.getMethod(OperatorMethod.MINUS_ASSIGN.methodName)
        if (minusAssignMethod != null) {
            // _-=_ メソッドが存在する場合
            minusAssignMethod.call(arrayOf(FluoriteInt.ONE))
            return oldValue
        }
        
        // デフォルト: _-_ メソッドを使用
        val newValue = oldValue.minus(FluoriteInt.ONE)
        setterFunction(newValue)
        return oldValue
    }

    override val code get() = "SuffixDecrementGetter[${getter.code};${setter.code}]"
}
