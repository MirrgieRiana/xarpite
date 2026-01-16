package mirrg.xarpite

import mirrg.kotlin.helium.join
import mirrg.xarpite.parser.ParseResult
import mirrg.xarpite.parser.Parser
import mirrg.xarpite.parser.Tuple0
import mirrg.xarpite.parser.parsers.leftAssociative
import mirrg.xarpite.parser.parsers.map
import mirrg.xarpite.parser.parsers.mapEx
import mirrg.xarpite.parser.parsers.normalize
import mirrg.xarpite.parser.parsers.not
import mirrg.xarpite.parser.parsers.oneOrMore
import mirrg.xarpite.parser.parsers.optional
import mirrg.xarpite.parser.parsers.or
import mirrg.xarpite.parser.parsers.parser
import mirrg.xarpite.parser.parsers.plus
import mirrg.xarpite.parser.parsers.times
import mirrg.xarpite.parser.parsers.unaryMinus
import mirrg.xarpite.parser.parsers.unaryPlus
import mirrg.xarpite.parser.parsers.unit
import mirrg.xarpite.parser.parsers.zeroOrMore
import mirrg.xarpite.parser.text

@Suppress("MemberVisibilityCanBePrivate", "unused")
class XarpiteGrammar(val location: String) {

    val lineComment: Parser<Tuple0> = -Regex("""(?:#|//)[^\r\n]*""")

    val blockCommentContent: Parser<Tuple0> = or(
        parser { blockComment },
        -Regex("""(?!\*/)(?: |[^ ])"""),
    )
    val blockComment: Parser<Tuple0> = -"/*" * -blockCommentContent.zeroOrMore * -"*/"

    val br: Parser<Char> = +Regex("""\n|\r\n?""") map { '\n' }
    val s: Parser<Tuple0> = -(+Regex("""[ \t]+""") + lineComment + blockComment).zeroOrMore
    val b: Parser<Tuple0> = s * -(br * s).zeroOrMore


    // 通常文字　および　\r\n\t以外の制御文字、DEL、すべての2バイト文字、サロゲートペアの片方
    val identifier: Parser<IdentifierNode> = +Regex("""(?:[a-zA-Z_]|[^\r\n\t -~])(?:[a-zA-Z_0-9]|[^\r\n\t -~])*""") map { IdentifierNode(it.value) }

    val quotedIdentifierContent: Parser<String> = or(
        +Regex("""[^`\\]+""") map { it.value.normalize() }, // ' \ 以外の文字
        +Regex("""\\x[0-9a-fA-F]{2}""") map { it.value.drop(2).toInt(16).toChar().toString() }, // 16進1バイト参照
        +Regex("""\\u[0-9a-fA-F]{4}""") map { it.value.drop(2).toInt(16).toChar().toString() }, // 文字参照
        +Regex("""\\[^\r\n]""") map { it.value[1].toString() }, // エスケープされた改行以外の文字
        +Regex("""\\(?:\n|\r\n?)""") map { "\n" }, // エスケープされた改行
    )
    val quotedIdentifier: Parser<IdentifierNode> = -'`' * quotedIdentifierContent.zeroOrMore * -'`' map { IdentifierNode(it.join("")) }

    val float: Parser<Node> = +Regex("""[0-9]+\.[0-9]+""") map { FloatNode(it.value) }

    val integer: Parser<Node> = +Regex("[0-9]+") map { IntegerNode(it.value) }

    val hexadecimal: Parser<Node> = +Regex("H#[0-9a-fA-F]+") map { HexadecimalNode(it.value.drop(2)) }

    val rawStringCharacter: Parser<String> = or(
        +Regex("""[^']+""") map { it.value.normalize() }, // ' 以外の文字
        -"''" map { "'" } // '
    )
    val rawStringContent: Parser<LiteralStringContent> = rawStringCharacter.zeroOrMore map { LiteralStringContent(it.join("")) }
    val rawString: Parser<Node> = -'\'' * rawStringContent * -'\'' map { RawStringNode(it) }

    val templateStringCharacter: Parser<String> = or(
        +Regex("""[^"$\\]+""") map { it.value.normalize() }, // 通常文字
        +"\\\"" + +"\\$" + +"\\\\" map { it[1].toString() }, // エスケープされた記号
        -"\\t" map { "\t" },
        -"\\r" map { "\r" },
        -"\\n" map { "\n" },
        +Regex("""\\x[0-9a-fA-F]{2}""") map { it.value.drop(2).toInt(16).toChar().toString() }, // 16進1バイト参照
        +Regex("""\\u[0-9a-fA-F]{4}""") map { it.value.drop(2).toInt(16).toChar().toString() }, // 文字参照
    )
    val formatterFlag: Parser<FormatterFlag> = or(
        -'-' map { FormatterFlag.LEFT_ALIGNED },
        -'+' map { FormatterFlag.SIGNED },
        -' ' map { FormatterFlag.SPACE_FOR_SIGN },
        -'0' map { FormatterFlag.LEADING_ZEROS },
    )
    val formatterConversion: Parser<FormatterConversion> = or(
        -'d' map { FormatterConversion.DECIMAL },
        -'x' map { FormatterConversion.HEXADECIMAL },
        -'f' map { FormatterConversion.FLOAT },
        -'s' map { FormatterConversion.STRING },
    )
    val formatter: Parser<Formatter> = -"$%" * formatterFlag.zeroOrMore * (+Regex("[0-9]+")).optional * (-'.' * +Regex("[0-9]+")).optional * formatterConversion mapEx { context, result ->
        val flags = result.value.a.toSet()
        val width = result.value.b?.value?.toInt()
        val precision = result.value.c?.value?.toInt()
        val conversion = result.value.d
        Formatter(result.text(context), flags, width, precision, conversion)
    }
    val templateStringContent: Parser<StringContent> = or(
        templateStringCharacter.oneOrMore map { LiteralStringContent(it.join("")) },
        -'$' * parser { factor } map { NodeStringContent(it) },
        formatter * parser { brackets } map { FormattedStringContent(it.a, it.b) },
    )
    val templateString: Parser<Node> = -'"' * templateStringContent.zeroOrMore * -'"' map { TemplateStringNode(it) }

    val embeddedStringCharacter: Parser<String> = or(
        +Regex("""[^<]+""") map { it.value.normalize() }, // < 以外の通常文字
        +Regex("""(?:<(?!%))+""") map { it.value.normalize() }, // 通常の < （ (?!<%)< を使うと一部の環境で非常に長い入力でStackOverflowになる）
        -"<%%" map { "<%" }, // <%% で <% になる
    )
    val embeddedStringContent: Parser<StringContent> = or(
        embeddedStringCharacter.oneOrMore map { LiteralStringContent(it.join("")) },
        // %> が開始と埋め込みの終端を兼ねているため、expressionには出来ない
        // expressionが改行後の %> <% をリテラルとして消費することで終端がなくなってしまう
        -"<%=" * -b * parser { stream } * -b * -"%>" map { NodeStringContent(it) },
    )
    val embeddedString: Parser<Node> = -"%>" * embeddedStringContent.zeroOrMore * -"<%" * !'%' * !'=' map { EmbeddedStringNode(it) } // %>string<%

    val regexCharacter: Parser<String> = or(
        +Regex("""[^/\\]+""") map { it.value.normalize() }, // 通常文字
        -"\\/" map { "/" }, // エスケープされた /
        +Regex("""\\[^/\r\n]""") map { it.value }, // エスケープされた通常文字
        +Regex("""\\(?:\n|\r\n?)""") map { "\n" }, // エスケープされた改行
    )
    val regexContent: Parser<LiteralStringContent> = regexCharacter.oneOrMore map { LiteralStringContent(it.join("")) }
    val regex: Parser<Node> = -'/' * regexContent * -'/' * identifier.optional map { RegexNode(it.a, it.b) }

    val arrowRound: Parser<Node> = (-'(').result * -b * (parser { commas } * -b).optional * -"=>" * -b * (parser { expression } * -b).optional * -')' map { BracketsLiteralArrowedRoundNode(it.b ?: EmptyNode, it.c ?: EmptyNode, it.a.position) }
    val arrowSquare: Parser<Node> = (-'[').result * -b * (parser { commas } * -b).optional * -"=>" * -b * (parser { expression } * -b).optional * -']' map { BracketsLiteralArrowedSquareNode(it.b ?: EmptyNode, it.c ?: EmptyNode, it.a.position) }
    val arrowCurly: Parser<Node> = (-'{').result * -b * (parser { commas } * -b).optional * -"=>" * -b * (parser { expression } * -b).optional * -'}' map { BracketsLiteralArrowedCurlyNode(it.b ?: EmptyNode, it.c ?: EmptyNode, it.a.position) }
    val round: Parser<Node> = (-'(').result * -b * (parser { expression } * -b).optional * -')' map { BracketsLiteralSimpleRoundNode(it.b ?: EmptyNode, it.a.position) }
    val square: Parser<Node> = (-'[').result * -b * (parser { expression } * -b).optional * -']' map { BracketsLiteralSimpleSquareNode(it.b ?: EmptyNode, it.a.position) }
    val curly: Parser<Node> = (-'{').result * -b * (parser { expression } * -b).optional * -'}' map { BracketsLiteralSimpleCurlyNode(it.b ?: EmptyNode, it.a.position) }
    val brackets: Parser<Node> = arrowRound + arrowSquare + arrowCurly + round + square + curly

    val jump: Parser<Node> = or(
        (-"!!").result * -s * parser { commas } map { ThrowNode(it.b, it.a.position) },
        (-"!!").result map { ThrowNode(EmptyNode, it.position) },
        identifier * -s * -"!!" * -s * parser { commas } map { ReturnNode(it.a, it.b) },
        identifier * -s * -"!!" map { ReturnNode(it, EmptyNode) },
    )

    val nonFloatFactor: Parser<Node> = jump + hexadecimal + identifier + quotedIdentifier + integer + rawString + templateString + embeddedString + regex + brackets
    val factor: Parser<Node> = jump + hexadecimal + identifier + quotedIdentifier + float + integer + rawString + templateString + embeddedString + regex + brackets

    val unaryOperator: Parser<(Node, Side, Position) -> Node> = or(
        -"++" map { ::UnaryPlusPlusNode },
        -"--" map { ::UnaryMinusMinusNode },
        -'+' map { ::UnaryPlusNode },
        -'-' map { ::UnaryMinusNode },
        -'?' map { ::UnaryQuestionNode },
        -'!' * !'!' * !'?' map { ::UnaryExclamationNode },
        -'&' map { ::UnaryAmpersandNode },
        -'*' map { ::UnaryAsteriskNode },
        -"$#" map { ::UnaryDollarSharpNode },
        -"$&" map { ::UnaryDollarAmpersandNode },
        -"$*" map { ::UnaryDollarAsteriskNode },
        -'@' map { ::UnaryAtNode },
        -'\\' map { ::UnaryBackslashNode },
    )
    val rightOperator: Parser<(Node) -> Node> = or(
        -s * (-'(').result * -b * (parser { commas } * -b).optional * -"=>" * -b * (parser { expression } * -b).optional * -')' map { { main -> BracketsRightArrowedRoundNode(main, it.b ?: EmptyNode, it.c ?: EmptyNode, it.a.position) } },
        -s * (-'[').result * -b * (parser { commas } * -b).optional * -"=>" * -b * (parser { expression } * -b).optional * -']' map { { main -> BracketsRightArrowedSquareNode(main, it.b ?: EmptyNode, it.c ?: EmptyNode, it.a.position) } },
        -s * (-'{').result * -b * (parser { commas } * -b).optional * -"=>" * -b * (parser { expression } * -b).optional * -'}' map { { main -> BracketsRightArrowedCurlyNode(main, it.b ?: EmptyNode, it.c ?: EmptyNode, it.a.position) } },
        -s * (-'(').result * -b * (parser { expression } * -b).optional * -')' map { { main -> BracketsRightSimpleRoundNode(main, it.b ?: EmptyNode, it.a.position) } },
        -s * (-'[').result * -b * (parser { expression } * -b).optional * -']' map { { main -> BracketsRightSimpleSquareNode(main, it.b ?: EmptyNode, it.a.position) } },
        -s * (-'{').result * -b * (parser { expression } * -b).optional * -'}' map { { main -> BracketsRightSimpleCurlyNode(main, it.b ?: EmptyNode, it.a.position) } },

        -s * -"++" map { { main -> SuffixPlusPlusNode(main) } },
        -s * -"--" map { { main -> SuffixMinusMinusNode(main) } },

        -b * -'.' * -b * nonFloatFactor map { { main -> InfixPeriodNode(main, it) } },
        -b * -"?." * -b * nonFloatFactor map { { main -> InfixQuestionPeriodNode(main, it) } },
        -b * -"::" * -b * nonFloatFactor map { { main -> InfixColonColonNode(main, it) } },
        -b * -"?::" * -b * nonFloatFactor map { { main -> InfixQuestionColonColonNode(main, it) } },

        -b * -'.' * unaryOperator.result map { { main -> it.value(main, Side.RIGHT, it.position) } },
    )
    val right: Parser<Node> = factor * rightOperator.zeroOrMore map { it.b.fold(it.a) { node, f -> f(node) } }
    val pow: Parser<Node> = right * (-s * -'^' * -b * parser { left }).optional map {
        val right = it.b
        if (right != null) InfixCircumflexNode(it.a, right) else it.a
    }
    val left: Parser<Node> = (unaryOperator.result * -b).zeroOrMore * pow map { it.a.foldRight(it.b) { f, node -> f.value(node, Side.LEFT, f.position) } }

    val mulOperator: Parser<(Node, Node) -> InfixNode> = or(
        -'*' map { ::InfixAsteriskNode },
        -'/' map { ::InfixSlashNode },
        -"!%%" map { ::InfixExclamationPercentPercentNode },
        -"%%" map { ::InfixPercentPercentNode },
        -'%' map { ::InfixPercentNode },
    )
    val mul: Parser<Node> = leftAssociative(left, -s * mulOperator * -b) { left, operator, right -> operator(left, right) }
    val addOperator: Parser<(Node, Node) -> InfixNode> = or(
        -'+' map { ::InfixPlusNode },
        -'-' * !'>' map { ::InfixMinusNode },
        -'&' * !'&' map { ::InfixAmpersandNode },
    )
    val add: Parser<Node> = leftAssociative(mul, -s * addOperator * -b) { left, operator, right -> operator(left, right) }
    val rangeOperator: Parser<(Node, Node) -> InfixNode> = or(
        -".." map { ::InfixPeriodPeriodNode },
        -'~' map { ::InfixTildeNode },
    )
    val range: Parser<Node> = leftAssociative(add, -s * rangeOperator * -b) { left, operator, right -> operator(left, right) }
    val infixIdentifierOperator: Parser<(Node, Node) -> Node> = or(
        identifier + quotedIdentifier map { { left, right -> InfixIdentifierNode(left, it, right) } },
        -'!' * (identifier + quotedIdentifier) map { { left, right -> InfixExclamationIdentifierNode(left, it, right) } },
    )
    val infixIdentifier: Parser<Node> = leftAssociative(range, -s * infixIdentifierOperator * -b) { left, operator, right -> operator(left, right) }
    val matchOperator: Parser<(Node, Node) -> InfixNode> = -"=~" map { ::InfixEqualTildeNode }
    val match: Parser<Node> = leftAssociative(infixIdentifier, -s * matchOperator * -b) { left, operator, right -> operator(left, right) }
    val spaceshipOperator: Parser<(Node, Node) -> InfixNode> = -"<=>" map { ::InfixLessEqualGreaterNode }
    val spaceship: Parser<Node> = leftAssociative(match, -s * spaceshipOperator * -b) { left, operator, right -> operator(left, right) }
    val comparisonOperator: Parser<ComparisonOperatorType> = or(
        -"==" map { ComparisonOperatorType.EQUAL }, // ==
        -"!=" map { ComparisonOperatorType.EXCLAMATION_EQUAL }, // !=
        -">=" map { ComparisonOperatorType.GREATER_EQUAL }, // >=
        -'>' * !'>' map { ComparisonOperatorType.GREATER }, // >
        -"<=" map { ComparisonOperatorType.LESS_EQUAL }, // <=
        -'<' * !'<' map { ComparisonOperatorType.LESS }, // <
        -"?=" map { ComparisonOperatorType.QUESTION_EQUAL }, // ?=
        -"!@" map { ComparisonOperatorType.EXCLAMATION_AT }, // !@
        -'@' map { ComparisonOperatorType.AT }, // @
    )
    val comparison: Parser<Node> = spaceship * (-s * comparisonOperator * -b * spaceship).zeroOrMore map {
        if (it.b.isNotEmpty()) {
            ComparisonsNode(listOf(it.a, *it.b.map { t -> t.b }.toTypedArray()), it.b.map { t -> t.a })
        } else {
            it.a
        }
    }
    val andOperator: Parser<(Node, Node) -> InfixNode> = -"&&" map { ::InfixAmpersandAmpersandNode }
    val and: Parser<Node> = leftAssociative(comparison, -s * andOperator * -b) { left, operator, right -> operator(left, right) }
    val orOperator: Parser<(Node, Node) -> InfixNode> = -"||" map { ::InfixPipePipeNode }
    val or: Parser<Node> = leftAssociative(and, -s * orOperator * -b) { left, operator, right -> operator(left, right) }
    val condition: Parser<Node> = or(
        or * -b * -'?' * -b * parser { condition } * -b * -':' * !':' * -b * parser { condition } map { it -> ConditionNode(it.a, it.b, it.c) },
        or * -b * -"?:" * -b * parser { condition } map { InfixQuestionColonNode(it.a, it.b) },
        or * -b * -"!?" * -b * parser { condition } map { InfixExclamationQuestionNode(it.a, it.b) },
        or,
    )

    val commasPart: Parser<List<Node>> = or(
        (condition * -b + unit(EmptyNode)) * -',' * (-b * parser { commasPart } + unit(listOf(EmptyNode))) map { listOf(it.a) + it.b },
        condition map { listOf(it) },
    )
    val commas: Parser<Node> = commasPart map { if (it.size == 1) it.single() else CommasNode(it) }

    val pipeOperator: Parser<(Node, Node) -> InfixNode> = or(
        -'|' map { ::InfixPipeNode }, // |
    )
    val argumentsOperator: Parser<(Node, Node) -> InfixNode> = or(
        -"=>" map { ::InfixEqualGreaterNode }, // =>
    )
    val executionOperator: Parser<(Node, Node) -> InfixNode> = or(
        -">>" map { ::InfixGreaterGreaterNode }, // >>
        -"!:" map { ::InfixExclamationColonNode }, // !:
    )
    val assignmentOperator: Parser<(Node, Node) -> InfixNode> = or(
        -'=' * !'>' map { ::InfixEqualNode }, // =
        -':' * !'=' * !':' map { ::InfixColonNode }, // :
        -":=" map { ::InfixColonEqualNode }, // :=
        -"<<" map { ::InfixLessLessNode }, // <<
        -"->" map { ::InfixMinusGreaterNode }, // ->
        -"+=" map { ::InfixPlusEqualNode }, // +=
        -"-=" map { ::InfixMinusEqualNode }, // -=
    )

    val pipeOperatorPart: Parser<(Node, Node) -> InfixNode> = -b * pipeOperator * -b + -s * argumentsOperator * -b
    val executionOperatorPart: Parser<(Node, Node) -> InfixNode> = -b * executionOperator * -b
    val assignmentOperatorPart: Parser<(Node, Node) -> InfixNode> = -s * assignmentOperator * -b

    val pipeRight: Parser<Node> = or(
        commas * pipeOperatorPart * parser { pipeRight } map { it.b(it.a, it.c) },
        commas * assignmentOperatorPart * parser { stream } map { it.b(it.a, it.c) },
        commas,
    )
    val executionRight: Parser<Node> = or(
        commas * assignmentOperatorPart * parser { stream } map { it.b(it.a, it.c) },
        commas,
    )
    val streamRightPart: Parser<(Node) -> Node> = or(
        pipeOperatorPart * pipeRight map { { left -> it.a(left, it.b) } },
        executionOperatorPart * executionRight map { { left -> it.a(left, it.b) } },
    )
    val stream: Parser<Node> = or(
        commas * assignmentOperatorPart * parser { stream } map { it.b(it.a, it.c) },
        commas * streamRightPart.zeroOrMore map { it.b.fold(it.a) { left, part -> part(left) } },
    )

    val semicolonsPart: Parser<List<Node>> = or(
        stream * -s * -br * -b * parser { semicolonsPart } map { listOf(it.a) + it.b },
        (stream * -s + unit(EmptyNode)) * -';' * (-b * parser { semicolonsPart } + unit(listOf(EmptyNode))) map { listOf(it.a) + it.b },
        stream map { listOf(it) },
    )
    val semicolons: Parser<Node> = semicolonsPart map { if (it.size == 1) it.single() else SemicolonsNode(it) }
    val expression: Parser<Node> = semicolons

    val rootParser: Parser<Node> = -b * (expression * -b).optional map { it.a ?: EmptyNode }

    private val <T : Any> Parser<T>.result get() = this.mapEx { _, result -> result }
    private val ParseResult<*>.position get() = Position(location, start)
}
