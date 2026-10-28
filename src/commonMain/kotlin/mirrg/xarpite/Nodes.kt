package mirrg.xarpite

sealed class Node(val id: Int)
class EmptyNode(id: Int) : Node(id)
class IdentifierNode(val string: String, id: Int) : Node(id)
sealed class NumberNode(val string: String, id: Int) : Node(id)
class IntegerNode(string: String, id: Int) : NumberNode(string, id)
class HexadecimalNode(string: String, id: Int) : NumberNode(string, id)
class FloatNode(string: String, id: Int) : NumberNode(string, id)
class RawStringNode(val node: LiteralStringContent, id: Int) : Node(id)
class TemplateStringNode(val stringContents: List<StringContent>, id: Int) : Node(id)
class EmbeddedStringNode(val stringContents: List<StringContent>, id: Int) : Node(id)
class RegexNode(val node: LiteralStringContent, val flags: IdentifierNode?, id: Int) : Node(id)
sealed class BracketsNode(val body: Node, val position: Position, id: Int) : Node(id)
sealed class BracketsLiteralNode(body: Node, position: Position, id: Int) : BracketsNode(body, position, id)
sealed class BracketsLiteralArrowedNode(val arguments: Node, body: Node, position: Position, id: Int) : BracketsLiteralNode(body, position, id)
class BracketsLiteralArrowedRoundNode(arguments: Node, body: Node, position: Position, id: Int) : BracketsLiteralArrowedNode(arguments, body, position, id)
class BracketsLiteralArrowedSquareNode(arguments: Node, body: Node, position: Position, id: Int) : BracketsLiteralArrowedNode(arguments, body, position, id)
class BracketsLiteralArrowedCurlyNode(arguments: Node, body: Node, position: Position, id: Int) : BracketsLiteralArrowedNode(arguments, body, position, id)
sealed class BracketsLiteralSimpleNode(body: Node, position: Position, id: Int) : BracketsLiteralNode(body, position, id)
class BracketsLiteralSimpleRoundNode(body: Node, position: Position, id: Int) : BracketsLiteralSimpleNode(body, position, id)
class BracketsLiteralSimpleSquareNode(body: Node, position: Position, id: Int) : BracketsLiteralSimpleNode(body, position, id)
class BracketsLiteralSimpleCurlyNode(body: Node, position: Position, id: Int) : BracketsLiteralSimpleNode(body, position, id)
class IndentBlockNode(body: Node, position: Position, id: Int) : BracketsLiteralSimpleNode(body, position, id)
sealed class BracketsRightNode(val receiver: Node, body: Node, position: Position, id: Int) : BracketsNode(body, position, id)
sealed class BracketsRightArrowedNode(receiver: Node, val arguments: Node, body: Node, position: Position, id: Int) : BracketsRightNode(receiver, body, position, id)
class BracketsRightArrowedRoundNode(receiver: Node, arguments: Node, body: Node, position: Position, id: Int) : BracketsRightArrowedNode(receiver, arguments, body, position, id)
class BracketsRightArrowedSquareNode(receiver: Node, arguments: Node, body: Node, position: Position, id: Int) : BracketsRightArrowedNode(receiver, arguments, body, position, id)
class BracketsRightArrowedCurlyNode(receiver: Node, arguments: Node, body: Node, position: Position, id: Int) : BracketsRightArrowedNode(receiver, arguments, body, position, id)
sealed class BracketsRightSimpleNode(receiver: Node, body: Node, position: Position, id: Int) : BracketsRightNode(receiver, body, position, id)
class BracketsRightSimpleRoundNode(receiver: Node, body: Node, position: Position, id: Int) : BracketsRightSimpleNode(receiver, body, position, id)
class BracketsRightSimpleSquareNode(receiver: Node, body: Node, position: Position, id: Int) : BracketsRightSimpleNode(receiver, body, position, id)
class BracketsRightSimpleCurlyNode(receiver: Node, body: Node, position: Position, id: Int) : BracketsRightSimpleNode(receiver, body, position, id)
class ThrowNode(val right: Node, val position: Position, id: Int) : Node(id)
class ReturnNode(val left: Node, val right: Node, id: Int) : Node(id)
class PostfixPlusPlusNode(val main: Node, val position: Position, id: Int) : Node(id)
class PostfixMinusMinusNode(val main: Node, val position: Position, id: Int) : Node(id)
sealed class UnaryNode(val main: Node, val side: Side, val position: Position, id: Int) : Node(id)
class UnaryPlusPlusNode(main: Node, side: Side, position: Position, id: Int) : UnaryNode(main, side, position, id)
class UnaryMinusMinusNode(main: Node, side: Side, position: Position, id: Int) : UnaryNode(main, side, position, id)
class UnaryPlusNode(main: Node, side: Side, position: Position, id: Int) : UnaryNode(main, side, position, id)
class UnaryMinusNode(main: Node, side: Side, position: Position, id: Int) : UnaryNode(main, side, position, id)
class UnaryQuestionNode(main: Node, side: Side, position: Position, id: Int) : UnaryNode(main, side, position, id)
class UnaryExclamationNode(main: Node, side: Side, position: Position, id: Int) : UnaryNode(main, side, position, id)
class UnaryAmpersandNode(main: Node, side: Side, position: Position, id: Int) : UnaryNode(main, side, position, id)
class UnaryDollarSharpNode(main: Node, side: Side, position: Position, id: Int) : UnaryNode(main, side, position, id)
class UnaryDollarAmpersandNode(main: Node, side: Side, position: Position, id: Int) : UnaryNode(main, side, position, id)
class UnaryDollarAsteriskNode(main: Node, side: Side, position: Position, id: Int) : UnaryNode(main, side, position, id)
class UnaryAtNode(main: Node, side: Side, position: Position, id: Int) : UnaryNode(main, side, position, id)
class UnaryAsteriskNode(main: Node, side: Side, position: Position, id: Int) : UnaryNode(main, side, position, id)
class UnaryBackslashNode(main: Node, side: Side, position: Position, id: Int) : UnaryNode(main, side, position, id)
sealed class InfixNode(val left: Node, val right: Node, val position: Position, id: Int) : Node(id)
class InfixPeriodNode(left: Node, right: Node, position: Position, id: Int) : InfixNode(left, right, position, id)
class InfixQuestionPeriodNode(left: Node, right: Node, position: Position, id: Int) : InfixNode(left, right, position, id)
class InfixColonColonNode(left: Node, right: Node, position: Position, id: Int) : InfixNode(left, right, position, id)
class InfixQuestionColonColonNode(left: Node, right: Node, position: Position, id: Int) : InfixNode(left, right, position, id)
class InfixPlusNode(left: Node, right: Node, position: Position, id: Int) : InfixNode(left, right, position, id)
class InfixAmpersandNode(left: Node, right: Node, position: Position, id: Int) : InfixNode(left, right, position, id)
class InfixMinusNode(left: Node, right: Node, position: Position, id: Int) : InfixNode(left, right, position, id)
class InfixAsteriskNode(left: Node, right: Node, position: Position, id: Int) : InfixNode(left, right, position, id)
class InfixSlashNode(left: Node, right: Node, position: Position, id: Int) : InfixNode(left, right, position, id)
class InfixPercentPercentNode(left: Node, right: Node, position: Position, id: Int) : InfixNode(left, right, position, id)
class InfixExclamationPercentPercentNode(left: Node, right: Node, position: Position, id: Int) : InfixNode(left, right, position, id)
class InfixPercentNode(left: Node, right: Node, position: Position, id: Int) : InfixNode(left, right, position, id)
class InfixCircumflexNode(left: Node, right: Node, position: Position, id: Int) : InfixNode(left, right, position, id)
class InfixPeriodPeriodNode(left: Node, right: Node, position: Position, id: Int) : InfixNode(left, right, position, id)
class InfixEqualTildeNode(left: Node, right: Node, position: Position, id: Int) : InfixNode(left, right, position, id)
class InfixExclamationTildeNode(left: Node, right: Node, position: Position, id: Int) : InfixNode(left, right, position, id)
class InfixLessEqualGreaterNode(left: Node, right: Node, position: Position, id: Int) : InfixNode(left, right, position, id)
class InfixTildeNode(left: Node, right: Node, position: Position, id: Int) : InfixNode(left, right, position, id)
class InfixAmpersandAmpersandNode(left: Node, right: Node, position: Position, id: Int) : InfixNode(left, right, position, id)
class InfixPipePipeNode(left: Node, right: Node, position: Position, id: Int) : InfixNode(left, right, position, id)
class InfixQuestionColonNode(left: Node, right: Node, position: Position, id: Int) : InfixNode(left, right, position, id)
class InfixColonNode(left: Node, right: Node, position: Position, id: Int) : InfixNode(left, right, position, id)
class InfixEqualNode(left: Node, right: Node, position: Position, id: Int) : InfixNode(left, right, position, id)
class InfixEqualColonNode(left: Node, right: Node, position: Position, id: Int) : InfixNode(left, right, position, id)
class InfixMinusGreaterNode(left: Node, right: Node, position: Position, id: Int) : InfixNode(left, right, position, id)
class InfixPlusEqualNode(left: Node, right: Node, position: Position, id: Int) : InfixNode(left, right, position, id)
class InfixMinusEqualNode(left: Node, right: Node, position: Position, id: Int) : InfixNode(left, right, position, id)
class InfixPipeNode(left: Node, right: Node, position: Position, id: Int) : InfixNode(left, right, position, id)
class InfixGreaterGreaterNode(left: Node, right: Node, position: Position, id: Int) : InfixNode(left, right, position, id)
class InfixLessLessNode(left: Node, right: Node, position: Position, id: Int) : InfixNode(left, right, position, id)
class InfixColonEqualNode(left: Node, right: Node, position: Position, id: Int) : InfixNode(left, right, position, id)
class InfixEqualGreaterNode(left: Node, right: Node, position: Position, id: Int) : InfixNode(left, right, position, id)
class InfixExclamationQuestionNode(left: Node, right: Node, position: Position, id: Int) : InfixNode(left, right, position, id)
class InfixExclamationColonNode(left: Node, right: Node, position: Position, id: Int) : InfixNode(left, right, position, id)
class InfixIdentifierNode(val left: Node, val infix: IdentifierNode, val right: Node, val position: Position, id: Int) : Node(id)
class InfixExclamationIdentifierNode(val left: Node, val infix: IdentifierNode, val right: Node, val position: Position, id: Int) : Node(id)
class ComparisonsNode(val nodes: List<Node>, val operators: List<Pair<ComparisonOperatorType, Position>>, id: Int) : Node(id)
class ConditionNode(val condition: Node, val ok: Node, val ng: Node, val position: Position, id: Int) : Node(id)
class CommasNode(val nodes: List<Node>, id: Int) : Node(id)
class SemicolonsNode(val nodes: List<Node>, id: Int) : Node(id)

enum class Side {
    LEFT,
    RIGHT,
}

enum class ComparisonOperatorType {
    EQUAL_EQUAL,
    EXCLAMATION_EQUAL,
    GREATER,
    LESS,
    GREATER_EQUAL,
    LESS_EQUAL,
    QUESTION_EQUAL,
    EXCLAMATION_QUESTION_EQUAL,
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
