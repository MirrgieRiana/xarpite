package mirrg.xarpite.compilers

import mirrg.xarpite.EmptyNode
import mirrg.xarpite.Frame
import mirrg.xarpite.IdentifierNode
import mirrg.xarpite.InfixColonEqualNode
import mirrg.xarpite.InfixEqualGreaterNode
import mirrg.xarpite.InfixEqualNode
import mirrg.xarpite.InfixExclamationColonNode
import mirrg.xarpite.InfixExclamationQuestionNode
import mirrg.xarpite.Node
import mirrg.xarpite.SemicolonsNode
import mirrg.xarpite.UnaryAtNode
import mirrg.xarpite.defineLabel
import mirrg.xarpite.defineVariable
import mirrg.xarpite.mount
import mirrg.xarpite.operations.AssignmentRunner
import mirrg.xarpite.operations.GetterRunner
import mirrg.xarpite.operations.LabelRunner
import mirrg.xarpite.operations.MountRunner
import mirrg.xarpite.operations.Runner
import mirrg.xarpite.operations.TryCatchRunner
import mirrg.xarpite.operations.VariableDefinitionSetter

fun Frame.compileToRunner(node: Node): List<Runner> {
    return when (node) {
        is EmptyNode -> listOf()

        is InfixEqualNode -> { // 代入文
            val setter = compileToSetter(node.left)
            val getter = compileToGetter(node.right)
            listOf(AssignmentRunner(setter, getter))
        }

        is InfixColonEqualNode -> when { // 宣言文
            node.left is IdentifierNode -> {
                val name = node.left.string
                val variableIndex = defineVariable(name)
                listOf(AssignmentRunner(VariableDefinitionSetter(frameIndex, variableIndex), compileToGetter(node.right)))
            }

            else -> throw IllegalArgumentException("Illegal definition: ${node.left::class} := ${node.right::class}")
        }

        is InfixExclamationQuestionNode -> {
            val (name, rightNode) = if (node.right is InfixEqualGreaterNode) {
                require(node.right.left is IdentifierNode)
                Pair(node.right.left.string, node.right.right)
            } else {
                Pair("_", node.right)
            }
            val leftGetter = compileToGetter(node.left)
            val newFrame = Frame(this)
            val argumentVariableIndex = newFrame.defineVariable(name)
            listOf(TryCatchRunner(listOf(GetterRunner(leftGetter)), newFrame.frameIndex, argumentVariableIndex, newFrame.compileToRunner(rightNode)))
        }

        is InfixExclamationColonNode -> {
            require(node.right is IdentifierNode)
            val newFrame = Frame(this)
            val labelIndex = newFrame.defineLabel(node.right.string)
            listOf(LabelRunner(newFrame.frameIndex, labelIndex, newFrame.compileToRunner(node.left)))
        }

        is UnaryAtNode -> {
            val getter = compileToGetter(node.main)
            val newMountIndex = mount()
            listOf(MountRunner(frameIndex, newMountIndex, getter))
        }

        is SemicolonsNode -> node.nodes.flatMap { compileToRunner(it) }

        else -> listOf(GetterRunner(compileToGetter(node))) // 式文
    }
}
