package mirrg.xarpite.operations

import mirrg.xarpite.Environment
import mirrg.xarpite.OperatorMethod
import mirrg.xarpite.Position
import mirrg.xarpite.compilers.objects.FluoriteValue
import mirrg.xarpite.compilers.objects.cache
import mirrg.xarpite.compilers.objects.callImmediate
import mirrg.xarpite.compilers.objects.getSolvedMethod
import mirrg.xarpite.compilers.objects.minus
import mirrg.xarpite.compilers.objects.plus
import mirrg.xarpite.compilers.objects.toFluoriteString
import mirrg.xarpite.withStackTrace

class PlusAssignmentGetter(private val leftGetter: Getter, private val leftSetter: Setter?, private val getter: Getter, private val position: Position) : Getter {
    override suspend fun evaluate(env: Environment): FluoriteValue {
        val left = leftGetter.evaluate(env)
        val callable = left.getSolvedMethod(position, OperatorMethod.PLUS_ASSIGN.methodName)
        return if (callable != null) {
            val right = getter.evaluate(env)
            val accessor = createAccessor(leftGetter, leftSetter, env)
            withStackTrace(position) {
                callable.callImmediate(arrayOf(right, accessor)).cache()
            }
        } else {
            if (leftSetter == null) {
                withStackTrace(position) {
                    throw FluoriteException("Cannot perform compound assignment on non-assignable expression without override method `_+=_`.".toFluoriteString())
                }
            }
            val right = getter.evaluate(env)
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
        val callable = left.getSolvedMethod(position, OperatorMethod.MINUS_ASSIGN.methodName)
        return if (callable != null) {
            val right = getter.evaluate(env)
            val accessor = createAccessor(leftGetter, leftSetter, env)
            withStackTrace(position) {
                callable.callImmediate(arrayOf(right, accessor)).cache()
            }
        } else {
            if (leftSetter == null) {
                withStackTrace(position) {
                    throw FluoriteException("Cannot perform compound assignment on non-assignable expression without override method `_-=_`.".toFluoriteString())
                }
            }
            val right = getter.evaluate(env)
            val leftFunction = leftSetter.evaluate(env)
            leftFunction(left.minus(position, right))
            right
        }
    }

    override val code get() = "MinusAssignmentGetter[${leftGetter.code};${leftSetter?.code};${getter.code}]"
}
