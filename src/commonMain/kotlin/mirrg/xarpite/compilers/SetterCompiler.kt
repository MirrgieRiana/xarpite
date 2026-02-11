package mirrg.xarpite.compilers

import mirrg.xarpite.BracketsRightSimpleRoundNode
import mirrg.xarpite.Frame
import mirrg.xarpite.IdentifierNode
import mirrg.xarpite.InfixPeriodNode
import mirrg.xarpite.Node
import mirrg.xarpite.compilers.objects.FluoriteString
import mirrg.xarpite.getVariable
import mirrg.xarpite.operations.FunctionInvocationSetter
import mirrg.xarpite.operations.ItemAccessSetter
import mirrg.xarpite.operations.LiteralGetter
import mirrg.xarpite.operations.Setter
import mirrg.xarpite.operations.VariableSetter

fun Frame.compileToSetter(node: Node): Result<Setter> {
    return when (node) {
        is IdentifierNode -> {
            val name = node.string
            val (frameIndex, variableIndex) = getVariable(name) ?: return Result.failure(IllegalArgumentException("No such variable: $name"))
            Result.success(VariableSetter(frameIndex, variableIndex))
        }

        is BracketsRightSimpleRoundNode -> Result.success(FunctionInvocationSetter(compileToGetter(node.receiver), createSimpleArgumentGetters(node), node.position))

        is InfixPeriodNode -> {
            val receiverGetter = compileToGetter(node.left)
            val keyGetter = when (node.right) {
                is IdentifierNode -> LiteralGetter(FluoriteString(node.right.string))
                else -> compileToGetter(node.right)
            }
            Result.success(ItemAccessSetter(receiverGetter, keyGetter, node.position))
        }

        else -> Result.failure(IllegalArgumentException("Illegal setter: ${node::class}"))
    }
}
