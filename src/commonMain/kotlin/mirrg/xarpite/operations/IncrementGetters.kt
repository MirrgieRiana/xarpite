package mirrg.xarpite.operations

import mirrg.xarpite.Environment
import mirrg.xarpite.OperatorMethod
import mirrg.xarpite.Position
import mirrg.xarpite.compilers.objects.Callable
import mirrg.xarpite.compilers.objects.FluoriteFunction
import mirrg.xarpite.compilers.objects.FluoriteInt
import mirrg.xarpite.compilers.objects.FluoriteObject
import mirrg.xarpite.compilers.objects.FluoriteValue
import mirrg.xarpite.compilers.objects.getMethod
import mirrg.xarpite.compilers.objects.minus
import mirrg.xarpite.compilers.objects.plus
import mirrg.xarpite.withStackTrace

private suspend fun FluoriteValue.getIncrementDecrementMethod(position: Position?, methodName: String): Callable? {
    // オブジェクト自身のマップを先に確認
    if (this is FluoriteObject) {
        val methodValue = this.map[methodName]
        if (methodValue != null) {
            // メソッドが見つかった場合、それを呼び出すCallableを作成
            return Callable { arguments ->
                when (methodValue) {
                    is FluoriteFunction -> methodValue.function(arrayOf(this, *arguments))
                    else -> methodValue
                }
            }
        }
    }
    // 見つからなかった場合は親チェーンを確認
    return this.getMethod(position, methodName)
}

/**
 * インクリメント・デクリメント演算子の共通基底クラス
 * 
 * カスタムメソッドが存在する場合はアクセサを渡して呼び出し、
 * 存在しない場合はフォールバック処理を実行する。
 */
abstract class IncrementDecrementGetter(
    protected val getter: Getter,
    protected val setter: Setter,
    protected val position: Position
) : Getter {
    /**
     * カスタムメソッド名を返す
     */
    protected abstract val methodName: String
    
    /**
     * フォールバック時の演算を実行する（plus または minus）
     */
    protected abstract suspend fun fallbackOperation(oldValue: FluoriteValue): FluoriteValue
    
    /**
     * 戻り値を決定する（prefix: newValue, suffix: oldValue）
     */
    protected abstract suspend fun getReturnValue(oldValue: FluoriteValue, newValue: FluoriteValue): FluoriteValue
    
    override suspend fun evaluate(env: Environment): FluoriteValue {
        val oldValue = getter.evaluate(env)
        
        // カスタムメソッドをチェック
        val customMethod = oldValue.getIncrementDecrementMethod(position, methodName)
        return if (customMethod != null) {
            // カスタムメソッドが存在する場合、アクセサ関数を作成して渡す
            val accessor = createAccessor(env)
            withStackTrace(position) {
                customMethod.call(arrayOf(accessor))
            }
        } else {
            // カスタムメソッドが存在しない場合はフォールバック処理を実行
            val setterFunction = setter.evaluate(env)
            val newValue = fallbackOperation(oldValue)
            setterFunction(newValue)
            getReturnValue(oldValue, newValue)
        }
    }
    
    /**
     * アクセサ関数を作成する
     * 0引数呼び出しでget、1引数呼び出しでsetを実行
     */
    private fun createAccessor(env: Environment) = FluoriteFunction { args ->
        if (args.isEmpty()) {
            // get: 0引数の場合は現在の値を取得
            getter.evaluate(env)
        } else {
            // set: 1引数以上の場合は最初の引数で値を設定
            val setterFunction = setter.evaluate(env)
            setterFunction(args[0])
            args[0]
        }
    }
}

class PrefixIncrementGetter(
    getter: Getter,
    setter: Setter,
    position: Position
) : IncrementDecrementGetter(getter, setter, position) {
    override val methodName get() = OperatorMethod.PREFIX_INCREMENT.methodName
    
    override suspend fun fallbackOperation(oldValue: FluoriteValue): FluoriteValue =
        oldValue.plus(position, FluoriteInt.ONE)
    
    override suspend fun getReturnValue(oldValue: FluoriteValue, newValue: FluoriteValue): FluoriteValue =
        newValue
    
    override val code get() = "PrefixIncrementGetter[${getter.code};${setter.code}]"
}

class SuffixIncrementGetter(
    getter: Getter,
    setter: Setter,
    position: Position
) : IncrementDecrementGetter(getter, setter, position) {
    override val methodName get() = OperatorMethod.SUFFIX_INCREMENT.methodName
    
    override suspend fun fallbackOperation(oldValue: FluoriteValue): FluoriteValue =
        oldValue.plus(position, FluoriteInt.ONE)
    
    override suspend fun getReturnValue(oldValue: FluoriteValue, newValue: FluoriteValue): FluoriteValue =
        oldValue
    
    override val code get() = "SuffixIncrementGetter[${getter.code};${setter.code}]"
}

class PrefixDecrementGetter(
    getter: Getter,
    setter: Setter,
    position: Position
) : IncrementDecrementGetter(getter, setter, position) {
    override val methodName get() = OperatorMethod.PREFIX_DECREMENT.methodName
    
    override suspend fun fallbackOperation(oldValue: FluoriteValue): FluoriteValue =
        oldValue.minus(position, FluoriteInt.ONE)
    
    override suspend fun getReturnValue(oldValue: FluoriteValue, newValue: FluoriteValue): FluoriteValue =
        newValue
    
    override val code get() = "PrefixDecrementGetter[${getter.code};${setter.code}]"
}

class SuffixDecrementGetter(
    getter: Getter,
    setter: Setter,
    position: Position
) : IncrementDecrementGetter(getter, setter, position) {
    override val methodName get() = OperatorMethod.SUFFIX_DECREMENT.methodName
    
    override suspend fun fallbackOperation(oldValue: FluoriteValue): FluoriteValue =
        oldValue.minus(position, FluoriteInt.ONE)
    
    override suspend fun getReturnValue(oldValue: FluoriteValue, newValue: FluoriteValue): FluoriteValue =
        oldValue
    
    override val code get() = "SuffixDecrementGetter[${getter.code};${setter.code}]"
}
