package mirrg.xarpite.operations

import mirrg.xarpite.Environment
import mirrg.xarpite.OperatorMethod
import mirrg.xarpite.Position
import mirrg.xarpite.compilers.objects.FluoriteFunction
import mirrg.xarpite.compilers.objects.FluoriteValue
import mirrg.xarpite.compilers.objects.cache
import mirrg.xarpite.compilers.objects.getMethod
import mirrg.xarpite.compilers.objects.minus
import mirrg.xarpite.compilers.objects.plus
import mirrg.xarpite.compilers.objects.toFluoriteString
import mirrg.xarpite.mounts.usage
import mirrg.xarpite.withStackTrace

class PlusAssignmentGetter(private val leftGetter: Getter, private val leftSetter: Setter?, private val getter: Getter, private val position: Position) : Getter {
    override suspend fun evaluate(env: Environment): FluoriteValue {
        val left = leftGetter.evaluate(env)
        val right = getter.evaluate(env)
        val callable = left.getMethod(position, OperatorMethod.PLUS_ASSIGN.methodName)
        return if (callable != null) {
            val accessor = if (leftSetter != null) {
                FluoriteFunction { arguments ->
                    if (arguments.isEmpty()) {
                        leftGetter.evaluate(env)
                    } else if (arguments.size == 1) {
                        val setterFunction = leftSetter.evaluate(env)
                        setterFunction(arguments[0])
                        arguments[0]
                    } else {
                        usage("accessor(): VALUE | <T> accessor(value: T): T")
                    }
                }
            } else {
                FluoriteFunction { arguments ->
                    if (arguments.isEmpty()) {
                        leftGetter.evaluate(env)
                    } else {
                        usage("accessor(): VALUE")
                    }
                }
            }
            withStackTrace(position) {
                callable.call(arrayOf(right, accessor)).cache()
            }
        } else {
            if (leftSetter == null) throw FluoriteException("Compound assignment operation is not defined.".toFluoriteString())
            val leftFunction = leftSetter.evaluate(env)
            leftFunction(left.plus(position, right))
            right
        }
    }

    override val code get() = "PlusAssignmentGetter[${leftGetter.code};${leftSetter?.code};${getter.code}]"
}

class MinusAssignmentGetter(private val leftGetter: Getter, private val leftSetter: Setter?, private val getter: Getter, private val position: Position) : Getter {
    override suspend fun evaluate(env: Environment): FluoriteValue {
        val left = leftGetter.evaluate(env)
        val right = getter.evaluate(env)
        val callable = left.getMethod(position, OperatorMethod.MINUS_ASSIGN.methodName)
        return if (callable != null) {
            val accessor = if (leftSetter != null) {
                FluoriteFunction { arguments ->
                    if (arguments.isEmpty()) {
                        leftGetter.evaluate(env)
                    } else if (arguments.size == 1) {
                        val setterFunction = leftSetter.evaluate(env)
                        setterFunction(arguments[0])
                        arguments[0]
                    } else {
                        usage("accessor(): VALUE | <T> accessor(value: T): T")
                    }
                }
            } else {
                FluoriteFunction { arguments ->
                    if (arguments.isEmpty()) {
                        leftGetter.evaluate(env)
                    } else {
                        usage("accessor(): VALUE")
                    }
                }
            }
            withStackTrace(position) {
                callable.call(arrayOf(right, accessor)).cache()
            }
        } else {
            if (leftSetter == null) throw FluoriteException("Compound assignment operation is not defined.".toFluoriteString())
            val leftFunction = leftSetter.evaluate(env)
            leftFunction(left.minus(position, right))
            right
        }
    }

    override val code get() = "MinusAssignmentGetter[${leftGetter.code};${leftSetter?.code};${getter.code}]"
}
