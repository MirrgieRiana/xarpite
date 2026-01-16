package mirrg.xarpite.operations

import mirrg.xarpite.Environment
import mirrg.xarpite.OperatorMethod
import mirrg.xarpite.Position
import mirrg.xarpite.compilers.objects.FluoriteValue
import mirrg.xarpite.compilers.objects.consume
import mirrg.xarpite.compilers.objects.getMethod
import mirrg.xarpite.compilers.objects.minus
import mirrg.xarpite.compilers.objects.plus
import mirrg.xarpite.withStackTrace

class PlusAssignmentGetter(private val leftGetter: Getter, private val leftSetter: Setter, private val getter: Getter, private val position: Position) : Getter {
    override suspend fun evaluate(env: Environment): FluoriteValue {
        val left = leftGetter.evaluate(env)
        val right = getter.evaluate(env)
        val callable = left.getMethod(position, OperatorMethod.PLUS_ASSIGN.methodName)
        if (callable != null) {
            withStackTrace(position) {
                callable.call(arrayOf(right)).consume()
            }
        } else {
            val leftFunction = leftSetter.evaluate(env)
            leftFunction.invoke(left.plus(position, right))
        }
        return right
    }

    override val code get() = "PlusAssignmentGetter[${leftGetter.code};${leftSetter.code};${getter.code}]"
}

class MinusAssignmentGetter(private val leftGetter: Getter, private val leftSetter: Setter, private val getter: Getter, private val position: Position) : Getter {
    override suspend fun evaluate(env: Environment): FluoriteValue {
        val left = leftGetter.evaluate(env)
        val right = getter.evaluate(env)
        val callable = left.getMethod(position, OperatorMethod.MINUS_ASSIGN.methodName)
        if (callable != null) {
            withStackTrace(position) {
                callable.call(arrayOf(right)).consume()
            }
        } else {
            val leftFunction = leftSetter.evaluate(env)
            leftFunction.invoke(left.minus(position, right))
        }
        return right
    }

    override val code get() = "MinusAssignmentGetter[${leftGetter.code};${leftSetter.code};${getter.code}]"
}
