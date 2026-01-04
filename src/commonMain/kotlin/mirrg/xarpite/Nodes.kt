package mirrg.xarpite

sealed class Node
object EmptyNode : Node()
class IdentifierNode(val string: String) : Node()
sealed class NumberNode(val string: String) : Node()
class IntegerNode(string: String) : NumberNode(string)
class HexadecimalNode(string: String) : NumberNode(string)
class FloatNode(string: String) : NumberNode(string)
class RawStringNode(val node: LiteralStringContent) : Node()
class TemplateStringNode(val stringContents: List<StringContent>) : Node()
class EmbeddedStringNode(val stringContents: List<StringContent>) : Node()
class RegexNode(val node: LiteralStringContent, val flags: IdentifierNode?) : Node()
sealed class BracketsNode(val body: Node) : Node()
sealed class BracketsLiteralNode(body: Node) : BracketsNode(body)
sealed class BracketsLiteralArrowedNode(val arguments: Node, body: Node) : BracketsLiteralNode(body)
class BracketsLiteralArrowedRoundNode(arguments: Node, body: Node) : BracketsLiteralArrowedNode(arguments, body)
class BracketsLiteralArrowedSquareNode(arguments: Node, body: Node) : BracketsLiteralArrowedNode(arguments, body)
class BracketsLiteralArrowedCurlyNode(arguments: Node, body: Node) : BracketsLiteralArrowedNode(arguments, body)
sealed class BracketsLiteralSimpleNode(body: Node) : BracketsLiteralNode(body)
class BracketsLiteralSimpleRoundNode(body: Node) : BracketsLiteralSimpleNode(body)
class BracketsLiteralSimpleSquareNode(body: Node) : BracketsLiteralSimpleNode(body)
class BracketsLiteralSimpleCurlyNode(body: Node) : BracketsLiteralSimpleNode(body)
sealed class BracketsRightNode(val receiver: Node, body: Node) : BracketsNode(body)
sealed class BracketsRightArrowedNode(receiver: Node, val arguments: Node, body: Node) : BracketsRightNode(receiver, body)
class BracketsRightArrowedRoundNode(receiver: Node, arguments: Node, body: Node) : BracketsRightArrowedNode(receiver, arguments, body)
class BracketsRightArrowedSquareNode(receiver: Node, arguments: Node, body: Node) : BracketsRightArrowedNode(receiver, arguments, body)
class BracketsRightArrowedCurlyNode(receiver: Node, arguments: Node, body: Node) : BracketsRightArrowedNode(receiver, arguments, body)
sealed class BracketsRightSimpleNode(receiver: Node, body: Node) : BracketsRightNode(receiver, body)
class BracketsRightSimpleRoundNode(receiver: Node, body: Node) : BracketsRightSimpleNode(receiver, body)
class BracketsRightSimpleSquareNode(receiver: Node, body: Node) : BracketsRightSimpleNode(receiver, body)
class BracketsRightSimpleCurlyNode(receiver: Node, body: Node) : BracketsRightSimpleNode(receiver, body)
class ThrowNode(val right: Node) : Node()
class ReturnNode(val left: Node, val right: Node) : Node()
sealed class UnaryNode(val main: Node, val side: Side) : Node()
class UnaryPlusNode(main: Node, side: Side) : UnaryNode(main, side)
class UnaryMinusNode(main: Node, side: Side) : UnaryNode(main, side)
class UnaryQuestionNode(main: Node, side: Side) : UnaryNode(main, side)
class UnaryExclamationNode(main: Node, side: Side) : UnaryNode(main, side)
class UnaryAmpersandNode(main: Node, side: Side) : UnaryNode(main, side)
class UnaryDollarSharpNode(main: Node, side: Side) : UnaryNode(main, side)
class UnaryDollarAmpersandNode(main: Node, side: Side) : UnaryNode(main, side)
class UnaryDollarAsteriskNode(main: Node, side: Side) : UnaryNode(main, side)
class UnaryAtNode(main: Node, side: Side) : UnaryNode(main, side)
class UnaryAsteriskNode(main: Node, side: Side) : UnaryNode(main, side)
class UnaryBackslashNode(main: Node, side: Side) : UnaryNode(main, side)
class UnaryPlusPlusNode(main: Node, side: Side) : UnaryNode(main, side)
class UnaryMinusMinusNode(main: Node, side: Side) : UnaryNode(main, side)
sealed class InfixNode(val left: Node, val right: Node) : Node()
class InfixPeriodNode(left: Node, right: Node) : InfixNode(left, right)
class InfixQuestionPeriodNode(left: Node, right: Node) : InfixNode(left, right)
class InfixColonColonNode(left: Node, right: Node) : InfixNode(left, right)
class InfixQuestionColonColonNode(left: Node, right: Node) : InfixNode(left, right)
class InfixPlusNode(left: Node, right: Node) : InfixNode(left, right)
class InfixAmpersandNode(left: Node, right: Node) : InfixNode(left, right)
class InfixMinusNode(left: Node, right: Node) : InfixNode(left, right)
class InfixAsteriskNode(left: Node, right: Node) : InfixNode(left, right)
class InfixSlashNode(left: Node, right: Node) : InfixNode(left, right)
class InfixPercentPercentNode(left: Node, right: Node) : InfixNode(left, right)
class InfixExclamationPercentPercentNode(left: Node, right: Node) : InfixNode(left, right)
class InfixPercentNode(left: Node, right: Node) : InfixNode(left, right)
class InfixCircumflexNode(left: Node, right: Node) : InfixNode(left, right)
class InfixPeriodPeriodNode(left: Node, right: Node) : InfixNode(left, right)
class InfixEqualTildeNode(left: Node, right: Node) : InfixNode(left, right)
class InfixLessEqualGreaterNode(left: Node, right: Node) : InfixNode(left, right)
class InfixTildeNode(left: Node, right: Node) : InfixNode(left, right)
class InfixAmpersandAmpersandNode(left: Node, right: Node) : InfixNode(left, right)
class InfixPipePipeNode(left: Node, right: Node) : InfixNode(left, right)
class InfixQuestionColonNode(left: Node, right: Node) : InfixNode(left, right)
class InfixColonNode(left: Node, right: Node) : InfixNode(left, right)
class InfixEqualNode(left: Node, right: Node) : InfixNode(left, right)
class InfixMinusGreaterNode(left: Node, right: Node) : InfixNode(left, right)
class InfixPipeNode(left: Node, right: Node) : InfixNode(left, right)
class InfixGreaterGreaterNode(left: Node, right: Node) : InfixNode(left, right)
class InfixLessLessNode(left: Node, right: Node) : InfixNode(left, right)
class InfixColonEqualNode(left: Node, right: Node) : InfixNode(left, right)
class InfixEqualGreaterNode(left: Node, right: Node) : InfixNode(left, right)
class InfixExclamationQuestionNode(left: Node, right: Node) : InfixNode(left, right)
class InfixExclamationColonNode(left: Node, right: Node) : InfixNode(left, right)
class InfixIdentifierNode(val left: Node, val infix: IdentifierNode, val right: Node) : Node()
class InfixExclamationIdentifierNode(val left: Node, val infix: IdentifierNode, val right: Node) : Node()
class ComparisonsNode(val nodes: List<Node>, val operators: List<ComparisonOperatorType>) : Node()
class ConditionNode(val condition: Node, val ok: Node, val ng: Node) : Node()
class CommasNode(val nodes: List<Node>) : Node()
class SemicolonsNode(val nodes: List<Node>) : Node()

enum class Side {
    LEFT,
    RIGHT,
}

enum class ComparisonOperatorType {
    EQUAL,
    EXCLAMATION_EQUAL,
    GREATER,
    LESS,
    GREATER_EQUAL,
    LESS_EQUAL,
    QUESTION_EQUAL,
    AT,
    EXCLAMATION_AT,
}

sealed class StringContent
class LiteralStringContent(val string: String) : StringContent()
class NodeStringContent(val main: Node) : StringContent()
class FormattedStringContent(val formatter: Formatter, val main: Node) : StringContent()

class Formatter(val string: String, val flags: Set<FormatterFlag>, val width: Int?, val precision: Int?, val conversion: FormatterConversion)

enum class FormatterFlag {
    LEFT_ALIGNED,
    SIGNED,
    SPACE_FOR_SIGN,
    LEADING_ZEROS,
}

enum class FormatterConversion {
    DECIMAL,
    HEXADECIMAL,
    FLOAT,
    STRING,
}
