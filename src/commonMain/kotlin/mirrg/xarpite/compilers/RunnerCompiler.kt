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
import mirrg.xarpite.UnaryBackslashNode
import mirrg.xarpite.defineLabel
import mirrg.xarpite.defineVariable
import mirrg.xarpite.mount
import mirrg.xarpite.operations.AssignmentRunner
import mirrg.xarpite.operations.DelegatedVariableDefinitionSetter
import mirrg.xarpite.operations.Getter
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

        is InfixColonEqualNode -> compileToVariablesInitializer(node.left)(compileToGetter(node.right)) // 宣言文

        is InfixExclamationQuestionNode -> {
            val (name, rightNode) = if (node.right is InfixEqualGreaterNode) {
                require(node.right.left is IdentifierNode)
                Pair(node.right.left.string, node.right.right)
            } else {
                Pair("_", node.right)
            }
            val newFrame = Frame(this)
            val argumentVariableIndex = newFrame.defineVariable(name)
            listOf(TryCatchRunner(compileToRunner(node.left), newFrame.frameIndex, argumentVariableIndex, newFrame.compileToRunner(rightNode)))
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

fun Frame.compileToVariablesInitializer(definition: Node): (Getter) -> List<Runner> {
    return when (definition) {
        is IdentifierNode -> {
            val name = definition.string
            val variableIndex = defineVariable(name)
            ;
            { getter ->
                listOf(AssignmentRunner(VariableDefinitionSetter(frameIndex, variableIndex), getter))
            }
        }

        is UnaryBackslashNode if definition.main is IdentifierNode -> {
            val name = definition.main.string
            val variableIndex = defineVariable(name)
            ;
            { getter ->
                listOf(AssignmentRunner(DelegatedVariableDefinitionSetter(frameIndex, variableIndex, definition.position), getter))
            }
        }

        else -> throw IllegalArgumentException("Illegal variable definition: ${definition::class}")
    }
}
