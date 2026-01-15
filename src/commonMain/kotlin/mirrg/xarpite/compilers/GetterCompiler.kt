package mirrg.xarpite.compilers

import com.ionspin.kotlin.bignum.integer.toBigInteger
import mirrg.xarpite.BracketsLiteralArrowedNode
import mirrg.xarpite.BracketsLiteralArrowedRoundNode
import mirrg.xarpite.BracketsLiteralSimpleCurlyNode
import mirrg.xarpite.BracketsLiteralSimpleRoundNode
import mirrg.xarpite.BracketsLiteralSimpleSquareNode
import mirrg.xarpite.BracketsRightArrowedCurlyNode
import mirrg.xarpite.BracketsRightArrowedNode
import mirrg.xarpite.BracketsRightArrowedRoundNode
import mirrg.xarpite.BracketsRightArrowedSquareNode
import mirrg.xarpite.BracketsRightNode
import mirrg.xarpite.BracketsRightSimpleCurlyNode
import mirrg.xarpite.BracketsRightSimpleNode
import mirrg.xarpite.BracketsRightSimpleRoundNode
import mirrg.xarpite.BracketsRightSimpleSquareNode
import mirrg.xarpite.CommasNode
import mirrg.xarpite.ComparisonOperatorType
import mirrg.xarpite.ComparisonsNode
import mirrg.xarpite.ConditionNode
import mirrg.xarpite.EmbeddedStringNode
import mirrg.xarpite.EmptyNode
import mirrg.xarpite.FloatNode
import mirrg.xarpite.FormattedStringContent
import mirrg.xarpite.Frame
import mirrg.xarpite.HexadecimalNode
import mirrg.xarpite.IdentifierNode
import mirrg.xarpite.InfixAmpersandAmpersandNode
import mirrg.xarpite.InfixAmpersandNode
import mirrg.xarpite.InfixAsteriskNode
import mirrg.xarpite.InfixCircumflexNode
import mirrg.xarpite.InfixColonColonNode
import mirrg.xarpite.InfixColonEqualNode
import mirrg.xarpite.InfixColonNode
import mirrg.xarpite.InfixEqualGreaterNode
import mirrg.xarpite.InfixEqualNode
import mirrg.xarpite.InfixEqualTildeNode
import mirrg.xarpite.InfixExclamationColonNode
import mirrg.xarpite.InfixExclamationIdentifierNode
import mirrg.xarpite.InfixExclamationPercentPercentNode
import mirrg.xarpite.InfixExclamationQuestionNode
import mirrg.xarpite.InfixGreaterGreaterNode
import mirrg.xarpite.InfixIdentifierNode
import mirrg.xarpite.InfixLessEqualGreaterNode
import mirrg.xarpite.InfixLessLessNode
import mirrg.xarpite.InfixMinusEqualNode
import mirrg.xarpite.InfixMinusGreaterNode
import mirrg.xarpite.InfixMinusNode
import mirrg.xarpite.InfixNode
import mirrg.xarpite.InfixPercentNode
import mirrg.xarpite.InfixPercentPercentNode
import mirrg.xarpite.InfixPeriodNode
import mirrg.xarpite.InfixPeriodPeriodNode
import mirrg.xarpite.InfixPipeNode
import mirrg.xarpite.InfixPipePipeNode
import mirrg.xarpite.InfixPlusEqualNode
import mirrg.xarpite.InfixPlusNode
import mirrg.xarpite.InfixQuestionColonColonNode
import mirrg.xarpite.InfixQuestionColonNode
import mirrg.xarpite.InfixQuestionPeriodNode
import mirrg.xarpite.InfixSlashNode
import mirrg.xarpite.InfixTildeNode
import mirrg.xarpite.IntegerNode
import mirrg.xarpite.LiteralStringContent
import mirrg.xarpite.Node
import mirrg.xarpite.NodeStringContent
import mirrg.xarpite.RawStringNode
import mirrg.xarpite.RegexNode
import mirrg.xarpite.ReturnNode
import mirrg.xarpite.SemicolonsNode
import mirrg.xarpite.SuffixMinusMinusNode
import mirrg.xarpite.SuffixPlusPlusNode
import mirrg.xarpite.TemplateStringNode
import mirrg.xarpite.ThrowNode
import mirrg.xarpite.UnaryAmpersandNode
import mirrg.xarpite.UnaryAsteriskNode
import mirrg.xarpite.UnaryAtNode
import mirrg.xarpite.UnaryBackslashNode
import mirrg.xarpite.UnaryDollarAmpersandNode
import mirrg.xarpite.UnaryDollarAsteriskNode
import mirrg.xarpite.UnaryDollarSharpNode
import mirrg.xarpite.UnaryExclamationNode
import mirrg.xarpite.UnaryMinusMinusNode
import mirrg.xarpite.UnaryMinusNode
import mirrg.xarpite.UnaryPlusNode
import mirrg.xarpite.UnaryPlusPlusNode
import mirrg.xarpite.UnaryQuestionNode
import mirrg.xarpite.compilers.objects.FluoriteRegex
import mirrg.xarpite.compilers.objects.FluoriteString
import mirrg.xarpite.compilers.objects.toFluoriteNumber
import mirrg.xarpite.defineLabel
import mirrg.xarpite.defineVariable
import mirrg.xarpite.getLabel
import mirrg.xarpite.getMountCounts
import mirrg.xarpite.getVariable
import mirrg.xarpite.operations.AndGetter
import mirrg.xarpite.operations.ArrayCreationGetter
import mirrg.xarpite.operations.AssignmentGetter
import mirrg.xarpite.operations.Comparator
import mirrg.xarpite.operations.ComparisonChainGetter
import mirrg.xarpite.operations.ContainsComparator
import mirrg.xarpite.operations.ConversionStringGetter
import mirrg.xarpite.operations.DivGetter
import mirrg.xarpite.operations.DivisibleGetter
import mirrg.xarpite.operations.ElvisGetter
import mirrg.xarpite.operations.EntryGetter
import mirrg.xarpite.operations.EqualComparator
import mirrg.xarpite.operations.ExclusiveRangeGetter
import mirrg.xarpite.operations.FormattedStringGetter
import mirrg.xarpite.operations.FromJsonGetter
import mirrg.xarpite.operations.FunctionBindGetter
import mirrg.xarpite.operations.FunctionGetter
import mirrg.xarpite.operations.FunctionInvocationGetter
import mirrg.xarpite.operations.FunctionalMethodAccessGetter
import mirrg.xarpite.operations.GetLengthGetter
import mirrg.xarpite.operations.Getter
import mirrg.xarpite.operations.GetterObjectInitializer
import mirrg.xarpite.operations.GreaterComparator
import mirrg.xarpite.operations.GreaterEqualComparator
import mirrg.xarpite.operations.IfGetter
import mirrg.xarpite.operations.InstanceOfComparator
import mirrg.xarpite.operations.ItemAccessGetter
import mirrg.xarpite.operations.LabelGetter
import mirrg.xarpite.operations.LessComparator
import mirrg.xarpite.operations.LessEqualComparator
import mirrg.xarpite.operations.LinesGetter
import mirrg.xarpite.operations.LiteralGetter
import mirrg.xarpite.operations.LiteralStringGetter
import mirrg.xarpite.operations.MatchGetter
import mirrg.xarpite.operations.MethodAccessGetter
import mirrg.xarpite.operations.MinusAssignmentGetter
import mirrg.xarpite.operations.MinusGetter
import mirrg.xarpite.operations.ModGetter
import mirrg.xarpite.operations.MountGetter
import mirrg.xarpite.operations.NewEnvironmentGetter
import mirrg.xarpite.operations.NotContainsComparator
import mirrg.xarpite.operations.NotDivisibleGetter
import mirrg.xarpite.operations.NotEqualComparator
import mirrg.xarpite.operations.NullGetter
import mirrg.xarpite.operations.ObjectCreationGetter
import mirrg.xarpite.operations.ObjectInitializer
import mirrg.xarpite.operations.OrGetter
import mirrg.xarpite.operations.PipeGetter
import mirrg.xarpite.operations.PlusAssignmentGetter
import mirrg.xarpite.operations.PlusGetter
import mirrg.xarpite.operations.PowerGetter
import mirrg.xarpite.operations.PrefixDecrementGetter
import mirrg.xarpite.operations.PrefixIncrementGetter
import mirrg.xarpite.operations.RangeGetter
import mirrg.xarpite.operations.ReturnGetter
import mirrg.xarpite.operations.SpaceshipGetter
import mirrg.xarpite.operations.StreamConcatenationGetter
import mirrg.xarpite.operations.StringConcatenationGetter
import mirrg.xarpite.operations.SuffixDecrementGetter
import mirrg.xarpite.operations.SuffixIncrementGetter
import mirrg.xarpite.operations.ThrowGetter
import mirrg.xarpite.operations.TimesGetter
import mirrg.xarpite.operations.ToBooleanGetter
import mirrg.xarpite.operations.ToJsonGetter
import mirrg.xarpite.operations.ToNegativeBooleanGetter
import mirrg.xarpite.operations.ToNegativeNumberGetter
import mirrg.xarpite.operations.ToNumberGetter
import mirrg.xarpite.operations.ToStringGetter
import mirrg.xarpite.operations.TryCatchGetter
import mirrg.xarpite.operations.TryCatchWithVariableGetter
import mirrg.xarpite.operations.VariableDefinitionObjectInitializer
import mirrg.xarpite.operations.VariableGetter

fun Frame.compileToGetter(node: Node): Getter {
    return when (node) {
        is EmptyNode -> NullGetter

        is IdentifierNode -> {
            val name = node.string
            val variable = getVariable(name)
            if (variable != null) {
                VariableGetter(variable.first, variable.second)
            } else {
                val mountCounts = mutableListOf<Int>()
                var frame = this
                while (true) {
                    mountCounts += frame.mountCount
                    frame = frame.parent ?: break
                }
                MountGetter(mountCounts.reversed().toIntArray(), name)
            }
        }

        is IntegerNode -> LiteralGetter(node.string.toFluoriteNumber())

        is HexadecimalNode -> LiteralGetter(node.string.toBigInteger(base = 16).toString().toFluoriteNumber())

        is FloatNode -> LiteralGetter(node.string.toFluoriteNumber())

        is RawStringNode -> LiteralGetter(FluoriteString(node.node.string))

        is TemplateStringNode -> {
            val getters = node.stringContents.map {
                when (it) {
                    is LiteralStringContent -> LiteralStringGetter(it.string)
                    is NodeStringContent -> ConversionStringGetter(compileToGetter(it.main))
                    is FormattedStringContent -> FormattedStringGetter(it.formatter, compileToGetter(it.main))
                }
            }
            StringConcatenationGetter(getters)
        }

        is EmbeddedStringNode -> {
            val getters = node.stringContents.map {
                when (it) {
                    is LiteralStringContent -> LiteralStringGetter(it.string)
                    is NodeStringContent -> ConversionStringGetter(compileToGetter(it.main))
                    is FormattedStringContent -> FormattedStringGetter(it.formatter, compileToGetter(it.main))
                }
            }
            StringConcatenationGetter(getters)
        }

        is RegexNode -> LiteralGetter(FluoriteRegex(node.node.string, node.flags?.string))

        is BracketsLiteralArrowedNode -> throw IllegalArgumentException("Unknown operator: $node ${node.arguments} ${node.body}")

        is BracketsLiteralSimpleRoundNode -> {
            val frame = Frame(this)
            val newNode = frame.compileToGetter(node.body)
            NewEnvironmentGetter(frame.nextVariableIndex, frame.mountCount, newNode)
        }

        is BracketsLiteralSimpleSquareNode -> {
            val nodes = if (node.body is SemicolonsNode) node.body.nodes else listOf(node.body)
            ArrayCreationGetter(nodes.filter { it !is EmptyNode }.map { compileToGetter(it) })
        }

        is BracketsLiteralSimpleCurlyNode -> compileObjectCreationToGetter(null, node.body)

        is UnaryPlusNode -> ToNumberGetter(compileToGetter(node.main))
        is UnaryMinusNode -> compileUnaryMinusToGetter(node.main)
        is UnaryQuestionNode -> ToBooleanGetter(compileToGetter(node.main))
        is UnaryExclamationNode -> ToNegativeBooleanGetter(compileToGetter(node.main))
        is UnaryAmpersandNode -> ToStringGetter(compileToGetter(node.main))
        is UnaryDollarSharpNode -> GetLengthGetter(compileToGetter(node.main))
        is UnaryDollarAmpersandNode -> ToJsonGetter(compileToGetter(node.main))
        is UnaryDollarAsteriskNode -> FromJsonGetter(compileToGetter(node.main))
        is UnaryAtNode -> throw IllegalArgumentException("Unknown operator: $node")
        is UnaryAsteriskNode -> {
            val variable = getVariable("_") ?: throw IllegalArgumentException("Unary asterisk operator requires variable _: not found")
            val functionGetter = compileToGetter(node.main)
            val argumentGetter = VariableGetter(variable.first, variable.second)
            FunctionInvocationGetter(functionGetter, listOf(argumentGetter))
        }

        is UnaryBackslashNode -> {
            // Transform body into lambda: _ -> body
            val newFrame = Frame(this)
            val argumentsVariableIndex = newFrame.defineVariable("__")
            val variableIndex = newFrame.defineVariable("_")
            val getter = newFrame.compileToGetter(node.main)
            FunctionGetter(newFrame.frameIndex, argumentsVariableIndex, listOf(variableIndex), getter)
        }

        is UnaryPlusPlusNode -> {
            val setter = compileToSetter(node.main)
            val getter = compileToGetter(node.main)
            PrefixIncrementGetter(getter, setter)
        }

        is UnaryMinusMinusNode -> {
            val setter = compileToSetter(node.main)
            val getter = compileToGetter(node.main)
            PrefixDecrementGetter(getter, setter)
        }

        is SuffixPlusPlusNode -> {
            val setter = compileToSetter(node.main)
            val getter = compileToGetter(node.main)
            SuffixIncrementGetter(getter, setter)
        }

        is SuffixMinusMinusNode -> {
            val setter = compileToSetter(node.main)
            val getter = compileToGetter(node.main)
            SuffixDecrementGetter(getter, setter)
        }

        is ThrowNode -> ThrowGetter(compileToGetter(node.right))

        is ReturnNode -> {
            require(node.left is IdentifierNode)
            val label = getLabel(node.left.string) ?: throw IllegalArgumentException("No such label: ${node.left.string}")
            ReturnGetter(label.first, label.second, compileToGetter(node.right))
        }

        is BracketsRightArrowedRoundNode -> compileFunctionalAccessToGetter(node, false, ::createArrowedArgumentGetters)
        is BracketsRightArrowedSquareNode -> compileFunctionalAccessToGetter(node, true, ::createArrowedArgumentGetters)
        is BracketsRightArrowedCurlyNode -> throw IllegalArgumentException("Unknown operator: $node ${node.receiver} ${node.arguments} ${node.body}")
        is BracketsRightSimpleRoundNode -> compileFunctionalAccessToGetter(node, false, ::createSimpleArgumentGetters)
        is BracketsRightSimpleSquareNode -> compileFunctionalAccessToGetter(node, true, ::createSimpleArgumentGetters)
        is BracketsRightSimpleCurlyNode -> compileObjectCreationToGetter(node.receiver, node.body)

        is InfixNode -> compileInfixOperatorToGetter(node)

        is InfixIdentifierNode -> FunctionInvocationGetter(compileToGetter(node.infix), listOf(compileToGetter(node.left), compileToGetter(node.right)))
        is InfixExclamationIdentifierNode -> ToNegativeBooleanGetter(FunctionInvocationGetter(compileToGetter(node.infix), listOf(compileToGetter(node.left), compileToGetter(node.right))))

        is ComparisonsNode -> {
            val termGetters = node.nodes.map { compileToGetter(it) }
            val operators: List<Comparator> = node.operators.map {
                when (it) {
                    ComparisonOperatorType.EQUAL -> EqualComparator
                    ComparisonOperatorType.EXCLAMATION_EQUAL -> NotEqualComparator
                    ComparisonOperatorType.GREATER -> GreaterComparator
                    ComparisonOperatorType.LESS -> LessComparator
                    ComparisonOperatorType.GREATER_EQUAL -> GreaterEqualComparator
                    ComparisonOperatorType.LESS_EQUAL -> LessEqualComparator
                    ComparisonOperatorType.QUESTION_EQUAL -> InstanceOfComparator
                    ComparisonOperatorType.AT -> ContainsComparator
                    ComparisonOperatorType.EXCLAMATION_AT -> NotContainsComparator
                }
            }
            ComparisonChainGetter(termGetters, operators)
        }

        is ConditionNode -> IfGetter(compileToGetter(node.condition), compileToGetter(node.ok), compileToGetter(node.ng))

        is CommasNode -> StreamConcatenationGetter(node.nodes.filter { it !is EmptyNode }.map { compileToGetter(it) })

        is SemicolonsNode -> {
            val runners = node.nodes.dropLast(1).flatMap { compileToRunner(it) }
            val getter = compileToGetter(node.nodes.last())
            if (runners.isEmpty()) return getter
            LinesGetter(runners, getter)
        }
    }
}

private fun Frame.compileObjectCreationToGetter(parentNode: Node?, bodyNode: Node): Getter {
    val parentGetter = parentNode?.let { compileToGetter(it) }
    val newFrame = Frame(this)
    val contentNodes = if (bodyNode is SemicolonsNode) bodyNode.nodes else listOf(bodyNode)
    val objectInitializerCreators: List<() -> ObjectInitializer> = contentNodes.mapNotNull { contentNode ->
        if (contentNode is EmptyNode) {
            null
        } else if (contentNode is InfixColonEqualNode && contentNode.left is IdentifierNode) {
            val variableIndex = newFrame.defineVariable(contentNode.left.string)
            ({ VariableDefinitionObjectInitializer(contentNode.left.string, newFrame.frameIndex, variableIndex, newFrame.compileToGetter(contentNode.right)) })
        } else {
            { GetterObjectInitializer(newFrame.compileToGetter(contentNode)) }
        }
    }
    return ObjectCreationGetter(parentGetter, newFrame.nextVariableIndex, objectInitializerCreators.map { it() })
}

private fun Frame.compileUnaryMinusToGetter(main: Node): Getter {
    return when (main) {
        is IntegerNode -> LiteralGetter("-${main.string}".toFluoriteNumber())
        is HexadecimalNode -> LiteralGetter("-${main.string}".toBigInteger(base = 16).toString().toFluoriteNumber())
        is FloatNode -> LiteralGetter("-${main.string}".toFluoriteNumber())
        else -> ToNegativeNumberGetter(compileToGetter(main))
    }
}

fun Frame.createArrowedArgumentGetters(node: BracketsRightArrowedNode): List<Getter> {
    val functionNewFrame = Frame(this)
    val argumentsVariableIndex = functionNewFrame.defineVariable("__")
    val variables = parseArguments(node.arguments)
    val variableIndices = variables.map { functionNewFrame.defineVariable(it) }
    val functionBodyGetter = run {
        val bracketsNewFrame = Frame(functionNewFrame)
        val bracketsBodyGetter = bracketsNewFrame.compileToGetter(node.body)
        NewEnvironmentGetter(bracketsNewFrame.nextVariableIndex, bracketsNewFrame.mountCount, bracketsBodyGetter)
    }
    return listOf(FunctionGetter(functionNewFrame.frameIndex, argumentsVariableIndex, variableIndices, functionBodyGetter))
}

fun Frame.createSimpleArgumentGetters(node: BracketsRightSimpleNode): List<Getter> {
    val argumentNodes = when (node.body) {
        is EmptyNode -> listOf()
        is SemicolonsNode -> node.body.nodes
        else -> listOf(node.body)
    }
    return argumentNodes.map { compileToGetter(it) }
}

fun Frame.compileToMethodAccessGetter(receiverNode: Node, methodNode: Node, argumentGetters: List<Getter>, isBinding: Boolean, isNullSafe: Boolean): Getter {
    return when (methodNode) {
        is IdentifierNode -> {
            val receiverGetter = compileToGetter(receiverNode)
            val name = methodNode.string
            val variable = getVariable("::$name")
            val mountCounts = getMountCounts()
            MethodAccessGetter(receiverGetter, variable, mountCounts, name, argumentGetters, isBinding, isNullSafe)
        }

        is BracketsLiteralSimpleRoundNode -> {
            val receiverGetter = compileToGetter(receiverNode)
            val functionGetter = compileToGetter(methodNode)
            FunctionalMethodAccessGetter(receiverGetter, functionGetter, argumentGetters, isBinding, isNullSafe)
        }

        else -> throw IllegalArgumentException("Must be IdentifierNode or BracketsLiteralSimpleRoundNode: $methodNode")
    }
}

fun <T : BracketsRightNode> Frame.compileFunctionalAccessToGetter(node: T, isBinding: Boolean, argumentGettersFactory: (T) -> List<Getter>): Getter {
    return if (node.receiver is InfixColonColonNode) { // メソッド呼出し
        compileToMethodAccessGetter(node.receiver.left, node.receiver.right, argumentGettersFactory(node), isBinding, false)
    } else if (node.receiver is InfixQuestionColonColonNode) {
        compileToMethodAccessGetter(node.receiver.left, node.receiver.right, argumentGettersFactory(node), isBinding, true)
    } else { // 関数呼び出し
        val functionGetter = compileToGetter(node.receiver)
        val argumentGetters = argumentGettersFactory(node)
        if (!isBinding) {
            FunctionInvocationGetter(functionGetter, argumentGetters)
        } else {
            FunctionBindGetter(functionGetter, argumentGetters)
        }
    }
}

private fun Frame.compileInfixOperatorToGetter(node: InfixNode): Getter {
    return when (node) {
        is InfixPeriodNode -> {
            val receiverGetter = compileToGetter(node.left)
            val nameGetter = when (node.right) {
                is IdentifierNode -> LiteralGetter(FluoriteString(node.right.string))
                else -> compileToGetter(node.right)
            }
            ItemAccessGetter(receiverGetter, nameGetter, false)
        }

        is InfixQuestionPeriodNode -> {
            val receiverGetter = compileToGetter(node.left)
            val nameGetter = when (node.right) {
                is IdentifierNode -> LiteralGetter(FluoriteString(node.right.string))
                else -> compileToGetter(node.right)
            }
            ItemAccessGetter(receiverGetter, nameGetter, true)
        }

        is InfixColonColonNode -> compileToMethodAccessGetter(node.left, node.right, listOf(), true, false)
        is InfixQuestionColonColonNode -> compileToMethodAccessGetter(node.left, node.right, listOf(), true, true)

        is InfixPlusNode -> PlusGetter(compileToGetter(node.left), compileToGetter(node.right))
        is InfixAmpersandNode -> StringConcatenationGetter(listOf(ConversionStringGetter(compileToGetter(node.left)), ConversionStringGetter(compileToGetter(node.right))))
        is InfixMinusNode -> MinusGetter(compileToGetter(node.left), compileToGetter(node.right))
        is InfixAsteriskNode -> TimesGetter(compileToGetter(node.left), compileToGetter(node.right))
        is InfixSlashNode -> DivGetter(compileToGetter(node.left), compileToGetter(node.right))
        is InfixPercentPercentNode -> DivisibleGetter(compileToGetter(node.left), compileToGetter(node.right))
        is InfixExclamationPercentPercentNode -> NotDivisibleGetter(compileToGetter(node.left), compileToGetter(node.right))
        is InfixPercentNode -> ModGetter(compileToGetter(node.left), compileToGetter(node.right))
        is InfixCircumflexNode -> PowerGetter(compileToGetter(node.left), compileToGetter(node.right))
        is InfixPeriodPeriodNode -> RangeGetter(compileToGetter(node.left), compileToGetter(node.right))
        is InfixEqualTildeNode -> MatchGetter(compileToGetter(node.left), compileToGetter(node.right))
        is InfixLessEqualGreaterNode -> SpaceshipGetter(compileToGetter(node.left), compileToGetter(node.right))
        is InfixTildeNode -> ExclusiveRangeGetter(compileToGetter(node.left), compileToGetter(node.right))
        is InfixAmpersandAmpersandNode -> AndGetter(compileToGetter(node.left), compileToGetter(node.right))
        is InfixPipePipeNode -> OrGetter(compileToGetter(node.left), compileToGetter(node.right))
        is InfixQuestionColonNode -> ElvisGetter(compileToGetter(node.left), compileToGetter(node.right))

        is InfixExclamationQuestionNode -> {
            val (name, rightNode) = if (node.right is BracketsLiteralArrowedRoundNode) {
                require(node.right.arguments is IdentifierNode)
                Pair(node.right.arguments.string, node.right.body)
            } else {
                Pair(null, node.right)
            }
            if (name != null) {
                val newFrame = Frame(this)
                val argumentVariableIndex = newFrame.defineVariable(name)
                TryCatchWithVariableGetter(compileToGetter(node.left), newFrame.frameIndex, argumentVariableIndex, newFrame.compileToGetter(rightNode))
            } else {
                TryCatchGetter(compileToGetter(node.left), compileToGetter(rightNode))
            }
        }

        is InfixExclamationColonNode -> {
            require(node.right is IdentifierNode)
            val newFrame = Frame(this)
            val labelIndex = newFrame.defineLabel(node.right.string)
            LabelGetter(newFrame.frameIndex, labelIndex, newFrame.compileToGetter(node.left))
        }

        is InfixColonNode -> {
            val leftGetter = when (node.left) {
                is IdentifierNode -> LiteralGetter(FluoriteString(node.left.string))
                else -> compileToGetter(node.left)
            }
            EntryGetter(leftGetter, compileToGetter(node.right))
        }

        is InfixEqualNode -> {
            val setter = compileToSetter(node.left)
            val getter = compileToGetter(node.right)
            AssignmentGetter(setter, getter)
        }

        is InfixMinusGreaterNode -> {
            val commasNode = if (node.left is BracketsLiteralSimpleRoundNode) {
                node.left.body
            } else {
                node.left
            }
            val variables = parseArguments(commasNode)
            val newFrame = Frame(this)
            val argumentsVariableIndex = newFrame.defineVariable("__")
            val variableIndices = variables.map { newFrame.defineVariable(it) }
            val getter = newFrame.compileToGetter(node.right)
            FunctionGetter(newFrame.frameIndex, argumentsVariableIndex, variableIndices, getter)
        }

        is InfixPlusEqualNode -> {
            val leftGetter = compileToGetter(node.left)
            val leftSetter = compileToSetter(node.left)
            val getter = compileToGetter(node.right)
            PlusAssignmentGetter(leftGetter, leftSetter, getter)
        }

        is InfixMinusEqualNode -> {
            val leftGetter = compileToGetter(node.left)
            val leftSetter = compileToSetter(node.left)
            val getter = compileToGetter(node.right)
            MinusAssignmentGetter(leftGetter, leftSetter, getter)
        }

        is InfixPipeNode -> {
            val streamGetter = compileToGetter(node.left)
            val (indexVariable, valueVariable, contentNode) = run {
                val bodyNode = node.right
                if (bodyNode !is InfixEqualGreaterNode) {
                    Triple(null, "_", bodyNode)
                } else {
                    val argumentsNode = bodyNode.left
                    when (argumentsNode) {
                        is IdentifierNode -> Triple(null, argumentsNode.string, bodyNode.right)

                        is CommasNode -> when (argumentsNode.nodes.size) {
                            2 -> run fail@{
                                val indexVariableNode = argumentsNode.nodes[0] as? IdentifierNode ?: return@fail null
                                val valueVariableNode = argumentsNode.nodes[1] as? IdentifierNode ?: return@fail null
                                Triple(indexVariableNode.string, valueVariableNode.string, bodyNode.right)
                            }

                            else -> null
                        }

                        else -> null
                    } ?: throw IllegalArgumentException("Invalid pipe arguments: $argumentsNode")
                }
            }
            val newFrame = Frame(this)
            val indexVariableIndex = indexVariable?.let { newFrame.defineVariable(it) }
            val valueVariableIndex = newFrame.defineVariable(valueVariable)
            val contentGetter = newFrame.compileToGetter(contentNode)
            PipeGetter(streamGetter, newFrame.frameIndex, indexVariableIndex, valueVariableIndex, contentGetter)
        }

        is InfixGreaterGreaterNode -> {
            val valueGetter = compileToGetter(node.left)
            val functionGetter = compileToGetter(node.right)
            FunctionInvocationGetter(functionGetter, listOf(valueGetter))
        }

        is InfixLessLessNode -> {
            val valueGetter = compileToGetter(node.right)
            val functionGetter = compileToGetter(node.left)
            FunctionInvocationGetter(functionGetter, listOf(valueGetter))
        }

        else -> throw IllegalArgumentException("Unknown operator: A $node B")
    }
}

private fun parseArguments(argumentsNode: Node): List<String> {
    val identifierNodes = when (argumentsNode) {
        is EmptyNode -> listOf()
        is CommasNode -> argumentsNode.nodes
        is SemicolonsNode -> argumentsNode.nodes
        else -> listOf(argumentsNode)
    }
    val strings = identifierNodes.mapNotNull {
        when (it) {
            is IdentifierNode -> it.string
            is EmptyNode -> null
            else -> throw IllegalArgumentException("Invalid argument: $it")
        }
    }
    return strings
}
