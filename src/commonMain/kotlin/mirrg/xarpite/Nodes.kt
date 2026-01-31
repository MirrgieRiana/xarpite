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
sealed class BracketsNode(val body: Node, val position: Position) : Node()
sealed class BracketsLiteralNode(body: Node, position: Position) : BracketsNode(body, position)
sealed class BracketsLiteralArrowedNode(val arguments: Node, body: Node, position: Position) : BracketsLiteralNode(body, position)
class BracketsLiteralArrowedRoundNode(arguments: Node, body: Node, position: Position) : BracketsLiteralArrowedNode(arguments, body, position)
class BracketsLiteralArrowedSquareNode(arguments: Node, body: Node, position: Position) : BracketsLiteralArrowedNode(arguments, body, position)
class BracketsLiteralArrowedCurlyNode(arguments: Node, body: Node, position: Position) : BracketsLiteralArrowedNode(arguments, body, position)
sealed class BracketsLiteralSimpleNode(body: Node, position: Position) : BracketsLiteralNode(body, position)
class BracketsLiteralSimpleRoundNode(body: Node, position: Position) : BracketsLiteralSimpleNode(body, position)
class BracketsLiteralSimpleSquareNode(body: Node, position: Position) : BracketsLiteralSimpleNode(body, position)
class BracketsLiteralSimpleCurlyNode(body: Node, position: Position) : BracketsLiteralSimpleNode(body, position)
sealed class BracketsRightNode(val receiver: Node, body: Node, position: Position) : BracketsNode(body, position)
sealed class BracketsRightArrowedNode(receiver: Node, val arguments: Node, body: Node, position: Position) : BracketsRightNode(receiver, body, position)
class BracketsRightArrowedRoundNode(receiver: Node, arguments: Node, body: Node, position: Position) : BracketsRightArrowedNode(receiver, arguments, body, position)
class BracketsRightArrowedSquareNode(receiver: Node, arguments: Node, body: Node, position: Position) : BracketsRightArrowedNode(receiver, arguments, body, position)
class BracketsRightArrowedCurlyNode(receiver: Node, arguments: Node, body: Node, position: Position) : BracketsRightArrowedNode(receiver, arguments, body, position)
sealed class BracketsRightSimpleNode(receiver: Node, body: Node, position: Position) : BracketsRightNode(receiver, body, position)
class BracketsRightSimpleRoundNode(receiver: Node, body: Node, position: Position) : BracketsRightSimpleNode(receiver, body, position)
class BracketsRightSimpleSquareNode(receiver: Node, body: Node, position: Position) : BracketsRightSimpleNode(receiver, body, position)
class BracketsRightSimpleCurlyNode(receiver: Node, body: Node, position: Position) : BracketsRightSimpleNode(receiver, body, position)
class ThrowNode(val right: Node, val position: Position) : Node()
class ReturnNode(val left: Node, val right: Node) : Node()
sealed class UnaryNode(val main: Node, val side: Side, val position: Position) : Node()
class UnaryPlusPlusNode(main: Node, side: Side, position: Position) : UnaryNode(main, side, position)
class UnaryMinusMinusNode(main: Node, side: Side, position: Position) : UnaryNode(main, side, position)
class UnaryPlusNode(main: Node, side: Side, position: Position) : UnaryNode(main, side, position)
class UnaryMinusNode(main: Node, side: Side, position: Position) : UnaryNode(main, side, position)
class UnaryQuestionNode(main: Node, side: Side, position: Position) : UnaryNode(main, side, position)
class UnaryExclamationNode(main: Node, side: Side, position: Position) : UnaryNode(main, side, position)
class UnaryAmpersandNode(main: Node, side: Side, position: Position) : UnaryNode(main, side, position)
class UnaryDollarSharpNode(main: Node, side: Side, position: Position) : UnaryNode(main, side, position)
class UnaryDollarAmpersandNode(main: Node, side: Side, position: Position) : UnaryNode(main, side, position)
class UnaryDollarAsteriskNode(main: Node, side: Side, position: Position) : UnaryNode(main, side, position)
class UnaryAtNode(main: Node, side: Side, position: Position) : UnaryNode(main, side, position)
class UnaryAsteriskNode(main: Node, side: Side, position: Position) : UnaryNode(main, side, position)
class UnaryBackslashNode(main: Node, side: Side, position: Position) : UnaryNode(main, side, position)
class SuffixPlusPlusNode(val main: Node, val position: Position) : Node()
class SuffixMinusMinusNode(val main: Node, val position: Position) : Node()
sealed class InfixNode(val left: Node, val right: Node, val position: Position) : Node()
class InfixPeriodNode(left: Node, right: Node, position: Position) : InfixNode(left, right, position)
class InfixQuestionPeriodNode(left: Node, right: Node, position: Position) : InfixNode(left, right, position)
class InfixColonColonNode(left: Node, right: Node, position: Position) : InfixNode(left, right, position)
class InfixQuestionColonColonNode(left: Node, right: Node, position: Position) : InfixNode(left, right, position)
class InfixPlusNode(left: Node, right: Node, position: Position) : InfixNode(left, right, position)
class InfixAmpersandNode(left: Node, right: Node, position: Position) : InfixNode(left, right, position)
class InfixMinusNode(left: Node, right: Node, position: Position) : InfixNode(left, right, position)
class InfixAsteriskNode(left: Node, right: Node, position: Position) : InfixNode(left, right, position)
class InfixSlashNode(left: Node, right: Node, position: Position) : InfixNode(left, right, position)
class InfixPercentPercentNode(left: Node, right: Node, position: Position) : InfixNode(left, right, position)
class InfixExclamationPercentPercentNode(left: Node, right: Node, position: Position) : InfixNode(left, right, position)
class InfixPercentNode(left: Node, right: Node, position: Position) : InfixNode(left, right, position)
class InfixCircumflexNode(left: Node, right: Node, position: Position) : InfixNode(left, right, position)
class InfixPeriodPeriodNode(left: Node, right: Node, position: Position) : InfixNode(left, right, position)
class InfixEqualTildeNode(left: Node, right: Node, position: Position) : InfixNode(left, right, position)
class InfixLessEqualGreaterNode(left: Node, right: Node, position: Position) : InfixNode(left, right, position)
class InfixTildeNode(left: Node, right: Node, position: Position) : InfixNode(left, right, position)
class InfixAmpersandAmpersandNode(left: Node, right: Node, position: Position) : InfixNode(left, right, position)
class InfixPipePipeNode(left: Node, right: Node, position: Position) : InfixNode(left, right, position)
class InfixQuestionColonNode(left: Node, right: Node, position: Position) : InfixNode(left, right, position)
class InfixColonNode(left: Node, right: Node, position: Position) : InfixNode(left, right, position)
class InfixEqualNode(left: Node, right: Node, position: Position) : InfixNode(left, right, position)
class InfixMinusGreaterNode(left: Node, right: Node, position: Position) : InfixNode(left, right, position)
class InfixPlusEqualNode(left: Node, right: Node, position: Position) : InfixNode(left, right, position)
class InfixMinusEqualNode(left: Node, right: Node, position: Position) : InfixNode(left, right, position)
class InfixPipeNode(left: Node, right: Node, position: Position) : InfixNode(left, right, position)
class InfixGreaterGreaterNode(left: Node, right: Node, position: Position) : InfixNode(left, right, position)
class InfixLessLessNode(left: Node, right: Node, position: Position) : InfixNode(left, right, position)
class InfixColonEqualNode(left: Node, right: Node, position: Position) : InfixNode(left, right, position)
class InfixEqualGreaterNode(left: Node, right: Node, position: Position) : InfixNode(left, right, position)
class InfixExclamationQuestionNode(left: Node, right: Node, position: Position) : InfixNode(left, right, position)
class InfixExclamationColonNode(left: Node, right: Node, position: Position) : InfixNode(left, right, position)
class InfixIdentifierNode(val left: Node, val infix: IdentifierNode, val right: Node, val position: Position) : Node()
class InfixExclamationIdentifierNode(val left: Node, val infix: IdentifierNode, val right: Node, val position: Position) : Node()
class ComparisonsNode(val nodes: List<Node>, val operators: List<Pair<ComparisonOperatorType, Position>>) : Node()
class ConditionNode(val condition: Node, val ok: Node, val ng: Node, val position: Position) : Node()
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
class NodeStringContent(val main: Node, val position: Position) : StringContent()
class FormattedStringContent(val formatter: Formatter, val main: Node, val position: Position) : StringContent()

class Formatter(val string: String, val flags: Set<FormatterFlag>, val width: Int?, val precision: Int?, val conversion: FormatterConversion)

enum class FormatterFlag {
    LEFT_ALIGNED,
    SIGNED,
    SPACE_FOR_SIGN,
    LEADING_ZEROS,
}

enum class FormatterConversion {
    DECIMAL,
    LOWERCASE_HEXADECIMAL,
    UPPERCASE_HEXADECIMAL,
    FLOAT,
    STRING,
}
