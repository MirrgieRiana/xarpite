package mirrg.xarpite.operations

import mirrg.xarpite.Environment
import mirrg.xarpite.OperatorMethod
import mirrg.xarpite.compilers.objects.FluoriteInt
import mirrg.xarpite.compilers.objects.FluoriteValue
import mirrg.xarpite.compilers.objects.getMethod
import mirrg.xarpite.compilers.objects.minus
import mirrg.xarpite.compilers.objects.minusAssign
import mirrg.xarpite.compilers.objects.plus
import mirrg.xarpite.compilers.objects.plusAssign

class PrefixIncrementGetter(private val getter: Getter, private val setter: Setter) : Getter {
    override suspend fun evaluate(env: Environment): FluoriteValue {
        val setterFunction = setter.evaluate(env)
        val oldValue = getter.evaluate(env)
        
        // フォールバック順: ++_ -> _++ -> _+=_ -> _+_ (with setter)
        val prefixIncrementMethod = oldValue.getMethod(OperatorMethod.PREFIX_INCREMENT.methodName)
        if (prefixIncrementMethod != null) {
            val newValue = prefixIncrementMethod.call(arrayOf())
            setterFunction(newValue)
            return newValue
        }
        
        val suffixIncrementMethod = oldValue.getMethod(OperatorMethod.SUFFIX_INCREMENT.methodName)
        if (suffixIncrementMethod != null) {
            val newValue = suffixIncrementMethod.call(arrayOf())
            setterFunction(newValue)
            return newValue
        }
        
        val plusAssignMethod = oldValue.getMethod(OperatorMethod.PLUS_ASSIGN.methodName)
        if (plusAssignMethod != null) {
            val newValue = plusAssignMethod.call(arrayOf(FluoriteInt.ONE))
            setterFunction(newValue)
            return newValue
        }
        
        // 最後のフォールバック: _+_ を使用してsetterを呼び出す
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
        
        // フォールバック順: _++ -> _+=_ -> _+_ (with setter)
        val suffixIncrementMethod = oldValue.getMethod(OperatorMethod.SUFFIX_INCREMENT.methodName)
        if (suffixIncrementMethod != null) {
            val result = suffixIncrementMethod.call(arrayOf())
            // 後置インクリメントは古い値を返すが、新しい値をセットする必要がある
            // メソッドが新しい値を返すと仮定してsetterを呼び出す
            setterFunction(result)
            return oldValue
        }
        
        val plusAssignMethod = oldValue.getMethod(OperatorMethod.PLUS_ASSIGN.methodName)
        if (plusAssignMethod != null) {
            val newValue = plusAssignMethod.call(arrayOf(FluoriteInt.ONE))
            setterFunction(newValue)
            return oldValue
        }
        
        // 最後のフォールバック: _+_ を使用してsetterを呼び出す
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
        
        // フォールバック順: --_ -> _-- -> _-=_ -> _-_ (with setter)
        val prefixDecrementMethod = oldValue.getMethod(OperatorMethod.PREFIX_DECREMENT.methodName)
        if (prefixDecrementMethod != null) {
            val newValue = prefixDecrementMethod.call(arrayOf())
            setterFunction(newValue)
            return newValue
        }
        
        val suffixDecrementMethod = oldValue.getMethod(OperatorMethod.SUFFIX_DECREMENT.methodName)
        if (suffixDecrementMethod != null) {
            val newValue = suffixDecrementMethod.call(arrayOf())
            setterFunction(newValue)
            return newValue
        }
        
        val minusAssignMethod = oldValue.getMethod(OperatorMethod.MINUS_ASSIGN.methodName)
        if (minusAssignMethod != null) {
            val newValue = minusAssignMethod.call(arrayOf(FluoriteInt.ONE))
            setterFunction(newValue)
            return newValue
        }
        
        // 最後のフォールバック: _-_ を使用してsetterを呼び出す
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
        
        // フォールバック順: _-- -> _-=_ -> _-_ (with setter)
        val suffixDecrementMethod = oldValue.getMethod(OperatorMethod.SUFFIX_DECREMENT.methodName)
        if (suffixDecrementMethod != null) {
            val result = suffixDecrementMethod.call(arrayOf())
            // 後置デクリメントは古い値を返すが、新しい値をセットする必要がある
            // メソッドが新しい値を返すと仮定してsetterを呼び出す
            setterFunction(result)
            return oldValue
        }
        
        val minusAssignMethod = oldValue.getMethod(OperatorMethod.MINUS_ASSIGN.methodName)
        if (minusAssignMethod != null) {
            val newValue = minusAssignMethod.call(arrayOf(FluoriteInt.ONE))
            setterFunction(newValue)
            return oldValue
        }
        
        // 最後のフォールバック: _-_ を使用してsetterを呼び出す
        val newValue = oldValue.minus(FluoriteInt.ONE)
        setterFunction(newValue)
        return oldValue
    }

    override val code get() = "SuffixDecrementGetter[${getter.code};${setter.code}]"
}
