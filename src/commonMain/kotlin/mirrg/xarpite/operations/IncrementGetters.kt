package mirrg.xarpite.operations

import mirrg.xarpite.Environment
import mirrg.xarpite.OperatorMethod
import mirrg.xarpite.Position
import mirrg.xarpite.compilers.objects.Callable
import mirrg.xarpite.compilers.objects.FluoriteInt
import mirrg.xarpite.compilers.objects.FluoriteObject
import mirrg.xarpite.compilers.objects.FluoriteValue
import mirrg.xarpite.compilers.objects.getMethod
import mirrg.xarpite.compilers.objects.minus
import mirrg.xarpite.compilers.objects.plus

private suspend fun FluoriteValue.getIncrementDecrementMethod(position: Position?, methodName: String): Callable? {
    // オブジェクト自身のマップを先に確認
    if (this is FluoriteObject) {
        val methodValue = this.map[methodName]
        if (methodValue != null) {
            // メソッドが見つかった場合、それを呼び出すCallableを作成
            return Callable { arguments ->
                when (methodValue) {
                    is mirrg.xarpite.compilers.objects.FluoriteFunction -> methodValue.function(arrayOf(this, *arguments))
                    else -> methodValue
                }
            }
        }
    }
    // 見つからなかった場合は親チェーンを確認
    return this.getMethod(position, methodName)
}

class PrefixIncrementGetter(private val getter: Getter, private val setter: Setter, private val position: Position) : Getter {
    override suspend fun evaluate(env: Environment): FluoriteValue {
        val setterFunction = setter.evaluate(env)
        val oldValue = getter.evaluate(env)
        
        // まず ++_ メソッドをチェック
        val customMethod = oldValue.getIncrementDecrementMethod(position, OperatorMethod.PREFIX_INCREMENT.methodName)
        val newValue = if (customMethod != null) {
            // カスタムメソッドが存在する場合はそれを呼び出す
            customMethod.call(arrayOf())
        } else {
            // カスタムメソッドが存在しない場合は従来の plus(1) を使用
            oldValue.plus(position, FluoriteInt.ONE)
        }
        
        setterFunction(newValue)
        return newValue
    }

    override val code get() = "PrefixIncrementGetter[${getter.code};${setter.code}]"
}

class SuffixIncrementGetter(private val getter: Getter, private val setter: Setter, private val position: Position) : Getter {
    override suspend fun evaluate(env: Environment): FluoriteValue {
        val setterFunction = setter.evaluate(env)
        val oldValue = getter.evaluate(env)
        
        // まず _++ メソッドをチェック
        val customMethod = oldValue.getIncrementDecrementMethod(position, OperatorMethod.SUFFIX_INCREMENT.methodName)
        val newValue = if (customMethod != null) {
            // カスタムメソッドが存在する場合はそれを呼び出す
            customMethod.call(arrayOf())
        } else {
            // カスタムメソッドが存在しない場合は従来の plus(1) を使用
            oldValue.plus(position, FluoriteInt.ONE)
        }
        
        setterFunction(newValue)
        return oldValue
    }

    override val code get() = "SuffixIncrementGetter[${getter.code};${setter.code}]"
}

class PrefixDecrementGetter(private val getter: Getter, private val setter: Setter, private val position: Position) : Getter {
    override suspend fun evaluate(env: Environment): FluoriteValue {
        val setterFunction = setter.evaluate(env)
        val oldValue = getter.evaluate(env)
        
        // まず --_ メソッドをチェック
        val customMethod = oldValue.getIncrementDecrementMethod(position, OperatorMethod.PREFIX_DECREMENT.methodName)
        val newValue = if (customMethod != null) {
            // カスタムメソッドが存在する場合はそれを呼び出す
            customMethod.call(arrayOf())
        } else {
            // カスタムメソッドが存在しない場合は従来の minus(1) を使用
            oldValue.minus(position, FluoriteInt.ONE)
        }
        
        setterFunction(newValue)
        return newValue
    }

    override val code get() = "PrefixDecrementGetter[${getter.code};${setter.code}]"
}

class SuffixDecrementGetter(private val getter: Getter, private val setter: Setter, private val position: Position) : Getter {
    override suspend fun evaluate(env: Environment): FluoriteValue {
        val setterFunction = setter.evaluate(env)
        val oldValue = getter.evaluate(env)
        
        // まず _-- メソッドをチェック
        val customMethod = oldValue.getIncrementDecrementMethod(position, OperatorMethod.SUFFIX_DECREMENT.methodName)
        val newValue = if (customMethod != null) {
            // カスタムメソッドが存在する場合はそれを呼び出す
            customMethod.call(arrayOf())
        } else {
            // カスタムメソッドが存在しない場合は従来の minus(1) を使用
            oldValue.minus(position, FluoriteInt.ONE)
        }
        
        setterFunction(newValue)
        return oldValue
    }

    override val code get() = "SuffixDecrementGetter[${getter.code};${setter.code}]"
}
