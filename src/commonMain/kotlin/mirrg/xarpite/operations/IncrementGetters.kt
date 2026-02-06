package mirrg.xarpite.operations

import mirrg.xarpite.Environment
import mirrg.xarpite.OperatorMethod
import mirrg.xarpite.Position
import mirrg.xarpite.compilers.objects.FluoriteFunction
import mirrg.xarpite.compilers.objects.FluoriteInt
import mirrg.xarpite.compilers.objects.FluoriteValue
import mirrg.xarpite.compilers.objects.cache
import mirrg.xarpite.compilers.objects.getMethod
import mirrg.xarpite.compilers.objects.minus
import mirrg.xarpite.compilers.objects.plus
import mirrg.xarpite.mounts.usage
import mirrg.xarpite.withStackTrace

class IncrementGetter(
    private val getter: Getter,
    private val setter: Setter?,
    private val isIncrement: Boolean,
    private val isSuffix: Boolean,
    private val position: Position,
) : Getter {
    private val methodName = if (isIncrement) {
        if (isSuffix) {
            OperatorMethod.SUFFIX_INCREMENT
        } else {
            OperatorMethod.PREFIX_INCREMENT
        }
    } else {
        if (isSuffix) {
            OperatorMethod.SUFFIX_DECREMENT
        } else {
            OperatorMethod.PREFIX_DECREMENT
        }
    }.methodName

    override suspend fun evaluate(env: Environment): FluoriteValue {
        val old = getter.evaluate(env)
        val callable = old.getMethod(position, methodName)
        return if (callable != null) {
            val accessor = if (setter != null) {
                FluoriteFunction { arguments ->
                    if (arguments.isEmpty()) {
                        getter.evaluate(env)
                    } else if (arguments.size == 1) {
                        val setterFunction = setter.evaluate(env)
                        setterFunction(arguments[0])
                        arguments[0]
                    } else {
                        usage("accessor(): VALUE | <T> accessor(value: T): T")
                    }
                }
            } else {
                FluoriteFunction { arguments ->
                    if (arguments.isEmpty()) {
                        getter.evaluate(env)
                    } else {
                        usage("accessor(): VALUE")
                    }
                }
            }
            withStackTrace(position) {
                callable.call(arrayOf(accessor)).cache()
            }
        } else {
            if (setter == null) {
                usage("No method `$methodName` found")
            }
            val setterFunction = setter.evaluate(env)
            val new = if (isIncrement) old.plus(position, FluoriteInt.ONE) else old.minus(position, FluoriteInt.ONE)
            setterFunction(new)
            if (isSuffix) old else new
        }
    }

    override val code get() = "IncrementGetter[${getter.code};${setter?.code};$isIncrement;$isSuffix]"
}
