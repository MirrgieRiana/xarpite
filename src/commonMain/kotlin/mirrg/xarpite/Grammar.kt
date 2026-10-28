package mirrg.xarpite

import io.github.mirrgieriana.xarpeg.ParseResult
import io.github.mirrgieriana.xarpeg.Parser
import io.github.mirrgieriana.xarpeg.Tuple0
import io.github.mirrgieriana.xarpeg.parsers.endOfInput
import io.github.mirrgieriana.xarpeg.parsers.fixed
import io.github.mirrgieriana.xarpeg.parsers.leftAssociative
import io.github.mirrgieriana.xarpeg.parsers.lookAhead
import io.github.mirrgieriana.xarpeg.parsers.map
import io.github.mirrgieriana.xarpeg.parsers.mapEx
import io.github.mirrgieriana.xarpeg.parsers.normalize
import io.github.mirrgieriana.xarpeg.parsers.not
import io.github.mirrgieriana.xarpeg.parsers.oneOrMore
import io.github.mirrgieriana.xarpeg.parsers.optional
import io.github.mirrgieriana.xarpeg.parsers.or
import io.github.mirrgieriana.xarpeg.parsers.plus
import io.github.mirrgieriana.xarpeg.parsers.ref
import io.github.mirrgieriana.xarpeg.parsers.times
import io.github.mirrgieriana.xarpeg.parsers.unaryMinus
import io.github.mirrgieriana.xarpeg.parsers.unaryPlus
import io.github.mirrgieriana.xarpeg.parsers.zeroOrMore
import io.github.mirrgieriana.xarpeg.text
import mirrg.kotlin.helium.join

@Suppress("MemberVisibilityCanBePrivate", "unused")
class XarpiteGrammar(val location: String, val apiVersion: Int) {

    val sharpLineCommentBody: Parser<Tuple0> = -Regex("""#[^\r\n]*""")
    val sharpLineComment: Parser<Tuple0> = if (apiVersion >= 5) {
        Parser { context, start ->
            if (start == 0) {
                context.parseOrNull(sharpLineCommentBody, start)
            } else {
                val previousCharacter = context.src[start - 1]
                if (previousCharacter == ' ' || previousCharacter == '\t' || previousCharacter == '\n' || previousCharacter == '\r') {
                    context.parseOrNull(sharpLineCommentBody, start)
                } else {
                    null
                }
            }
        }
    } else {
        sharpLineCommentBody
    }
    val slashLineComment: Parser<Tuple0> = -Regex("""//[^\r\n]*""")
    val lineComment: Parser<Tuple0> = sharpLineComment + slashLineComment

    val blockCommentContent: Parser<Tuple0> = or(
        ref { blockComment },
        -Regex("""(?!\*/)(?: |[^ ])"""),
    )
    val blockComment: Parser<Tuple0> = -"/*" * -blockCommentContent.zeroOrMore * -"*/"

    val br: Parser<Char> = +Regex("""\n|\r\n?""") map { '\n' }
    val s: Parser<Tuple0> = -(+Regex("""[ \t]+""") + lineComment + blockComment).zeroOrMore
    val ws: Parser<Tuple0> = -Regex("""[ \t]*""")
    val indent: Parser<Tuple0> = Parser { context, pos ->
        context as XarpiteParseContext
        val result = context.parseOrNull(ws, pos)!!
        if (result.end - pos < context.currentIndent) return@Parser null
        result
    }
    val b: Parser<Tuple0> = -((s * br).oneOrMore * indent).zeroOrMore * s

    private fun <T : Any> withIndent(hasIndent: Boolean, body: Parser<T>): Parser<T> = Parser { context, start ->
        context as XarpiteParseContext
        val oldIndent = context.currentIndent
        val newIndent = if (hasIndent) {
            val indentResult = context.parseOrNull(ws, start) ?: return@Parser null
            val newIndent = indentResult.end - indentResult.start
            if (newIndent <= context.currentIndent) return@Parser null
            newIndent
        } else {
            0
        }
        context.currentIndent = newIndent
        try {
            context.parseOrNull(body, start + newIndent)
        } finally {
            context.currentIndent = oldIndent
        }
    }


    // 通常文字　および　\r\n\t以外の制御文字、DEL、すべての2バイト文字、サロゲートペアの片方
    val identifier: Parser<IdentifierNode> = +Regex("""(?:[a-zA-Z_]|[^\r\n\t -~])(?:[a-zA-Z_0-9]|[^\r\n\t -~])*""") mapWithNodeId { it, id -> IdentifierNode(it.value, id()) }

    val quotedIdentifierContent: Parser<String> = or(
        +Regex("""[^`\\]+""") map { it.value.normalize() }, // ' \ 以外の文字
        +Regex("""\\x[0-9a-fA-F]{2}""") map { it.value.drop(2).toInt(16).toChar().toString() }, // 16進1バイト参照
        +Regex("""\\u[0-9a-fA-F]{4}""") map { it.value.drop(2).toInt(16).toChar().toString() }, // 文字参照
        +Regex("""\\[^\r\n]""") map { it.value[1].toString() }, // エスケープされた改行以外の文字
        +Regex("""\\(?:\n|\r\n?)""") map { "\n" }, // エスケープされた改行
    )
    val quotedIdentifier: Parser<IdentifierNode> = -'`' * quotedIdentifierContent.zeroOrMore * -'`' mapWithNodeId { it, id -> IdentifierNode(it.join(""), id()) }

    val float: Parser<Node> = +Regex("""[0-9][0-9_]*\.[0-9][0-9_]*""") mapWithNodeId { it, id -> FloatNode(it.value, id()) }

    val integer: Parser<Node> = +Regex("[0-9][0-9_]*") mapWithNodeId { it, id -> IntegerNode(it.value, id()) }

    val hexadecimal: Parser<Node> = +Regex("H#[0-9a-fA-F][0-9a-fA-F_]*") mapWithNodeId { it, id -> HexadecimalNode(it.value.drop(2), id()) }

    val rawStringCharacter: Parser<String> = or(
        +Regex("""[^']+""") map { it.value.normalize() }, // ' 以外の文字
        -"''" map { "'" } // '
    )
    val rawStringContent: Parser<LiteralStringContent> = rawStringCharacter.zeroOrMore map { LiteralStringContent(it.join("")) }
    val rawString: Parser<Node> = -'\'' * rawStringContent * -'\'' mapWithNodeId { it, id -> RawStringNode(it, id()) }

    val templateStringCharacter: Parser<String> = or(
        +Regex("""[^"$\\]+""") map { it.value.normalize() }, // 通常文字
        +"\\\"" + +"\\$" + +"\\\\" map { it[1].toString() }, // エスケープされた記号
        -"\\t" map { "\t" },
        -"\\r" map { "\r" },
        -"\\n" map { "\n" },
        -"\\0" map { "\u0000" },
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
        -'x' map { FormatterConversion.LOWERCASE_HEXADECIMAL },
        -'X' map { FormatterConversion.UPPERCASE_HEXADECIMAL },
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
        (-'$').result * ref { factor } map { NodeStringContent(it.b, it.a.position) },
        formatter.result * ref { brackets } map { FormattedStringContent(it.a.value, it.b, it.a.position) },
    )
    val templateString: Parser<Node> = -'"' * templateStringContent.zeroOrMore * -'"' mapWithNodeId { it, id -> TemplateStringNode(it, id()) }

    val embeddedStringCharacter: Parser<String> = or(
        +Regex("""[^<]+""") map { it.value.normalize() }, // < 以外の通常文字
        +Regex("""(?:<(?!%))+""") map { it.value.normalize() }, // 通常の < （ (?!<%)< を使うと一部の環境で非常に長い入力でStackOverflowになる）
        -"<%%" map { "<%" }, // <%% で <% になる
    )
    val embeddedStringContent: Parser<List<StringContent>> = or(
        embeddedStringCharacter.oneOrMore map { listOf(LiteralStringContent(it.join(""))) },
        // %> が開始と埋め込みの終端を兼ねているため、expressionには出来ない
        // expressionが改行後の %> <% をリテラルとして消費することで終端がなくなってしまう
        (-"<%=").result * -b * ref { stream } * -b * -"%>" map { listOf(NodeStringContent(it.b, it.a.position)) },
        -"<%#" * -Regex("""[^%]*(?:%(?!>)[^%]*)*""") * -"%>" map { emptyList() }, // <%# ... %> コメント
    )
    val embeddedString: Parser<Node> = -"%>" * embeddedStringContent.zeroOrMore * -"<%" * !'%' * !'=' * !'#' mapWithNodeId { it, id -> EmbeddedStringNode(it.flatten(), id()) } // %>string<% ( <%=, <%# を除く)

    val regexCharacter: Parser<String> = or(
        +Regex("""[^/\\]+""") map { it.value.normalize() }, // 通常文字
        -"\\/" map { "/" }, // エスケープされた /
        +Regex("""\\[^/\r\n]""") map { it.value }, // エスケープされた通常文字
        +Regex("""\\(?:\n|\r\n?)""") map { "\n" }, // エスケープされた改行
    )
    val regexContent: Parser<LiteralStringContent> = regexCharacter.oneOrMore map { LiteralStringContent(it.join("")) }
    val regex: Parser<Node> = -'/' * regexContent * -'/' * identifier.optional mapWithNodeId { it, id -> RegexNode(it.a, it.b, id()) }

    val arrowRound: Parser<Node> = (-'(').result * withIndent(false, -b * (ref { commas } * -b).optional * -"=>" * -b * (ref { expression } * -b).optional) * -')' mapWithNodeId { it, id -> BracketsLiteralArrowedRoundNode(it.b ?: EmptyNode(id()), it.c ?: EmptyNode(id()), it.a.position, id()) }
    val arrowSquare: Parser<Node> = (-'[').result * withIndent(false, -b * (ref { commas } * -b).optional * -"=>" * -b * (ref { expression } * -b).optional) * -']' mapWithNodeId { it, id -> BracketsLiteralArrowedSquareNode(it.b ?: EmptyNode(id()), it.c ?: EmptyNode(id()), it.a.position, id()) }
    val arrowCurly: Parser<Node> = (-'{').result * withIndent(false, -b * (ref { commas } * -b).optional * -"=>" * -b * (ref { expression } * -b).optional) * -'}' mapWithNodeId { it, id -> BracketsLiteralArrowedCurlyNode(it.b ?: EmptyNode(id()), it.c ?: EmptyNode(id()), it.a.position, id()) }
    val round: Parser<Node> = (-'(').result * withIndent(false, -b * (ref { expression } * -b).optional) * -')' mapWithNodeId { it, id -> BracketsLiteralSimpleRoundNode(it.b ?: EmptyNode(id()), it.a.position, id()) }
    val square: Parser<Node> = (-'[').result * withIndent(false, -b * (ref { expression } * -b).optional) * -']' mapWithNodeId { it, id -> BracketsLiteralSimpleSquareNode(it.b ?: EmptyNode(id()), it.a.position, id()) }
    val curly: Parser<Node> = (-'{').result * withIndent(false, -b * (ref { expression } * -b).optional) * -'}' mapWithNodeId { it, id -> BracketsLiteralSimpleCurlyNode(it.b ?: EmptyNode(id()), it.a.position, id()) }
    val brackets: Parser<Node> = arrowRound + arrowSquare + arrowCurly + round + square + curly

    val indentBlockBody: Parser<Node> = -(s * br).oneOrMore * withIndent(true, -s * ref { semicolons })
    val indentBlockEnd: Parser<Tuple0> = -s * -(br.lookAhead + endOfInput)
    val indentBlock: Parser<Node> = or(
        (-':' * indentBlockBody * indentBlockEnd).result mapWithNodeId { it, id -> IndentBlockNode(it.value, it.position, id()) },
        (-':' * indentBlockEnd).result mapWithNodeId { it, id -> IndentBlockNode(EmptyNode(id()), it.position, id()) },
    )
    val prefixColon: Parser<Node> = -':' * !':' * -s * ref { condition }

    val jump: Parser<Node> = or(
        (-"!!").result * -s * ref { commas } mapWithNodeId { it, id -> ThrowNode(it.b, it.a.position, id()) },
        (-"!!").result mapWithNodeId { it, id -> ThrowNode(EmptyNode(id()), it.position, id()) },
        identifier * -s * -"!!" * -s * ref { commas } mapWithNodeId { it, id -> ReturnNode(it.a, it.b, id()) },
        identifier * -s * -"!!" mapWithNodeId { it, id -> ReturnNode(it, EmptyNode(id()), id()) },
    )

    val nonFloatFactor: Parser<Node> = indentBlock + prefixColon + jump + hexadecimal + identifier + quotedIdentifier + integer + rawString + templateString + embeddedString + regex + brackets
    val factor: Parser<Node> = indentBlock + prefixColon + jump + hexadecimal + identifier + quotedIdentifier + float + integer + rawString + templateString + embeddedString + regex + brackets

    val unaryOperator: Parser<(Node, Side, Position) -> Node> = or(
        -"++" mapWithNodeId { _, id -> (::UnaryPlusPlusNode).withNodeId(id) },
        -"--" mapWithNodeId { _, id -> (::UnaryMinusMinusNode).withNodeId(id) },
        -'+' mapWithNodeId { _, id -> (::UnaryPlusNode).withNodeId(id) },
        -'-' mapWithNodeId { _, id -> (::UnaryMinusNode).withNodeId(id) },
        -'?' mapWithNodeId { _, id -> (::UnaryQuestionNode).withNodeId(id) },
        -'!' * !'!' * !'?' mapWithNodeId { _, id -> (::UnaryExclamationNode).withNodeId(id) },
        -'&' mapWithNodeId { _, id -> (::UnaryAmpersandNode).withNodeId(id) },
        -'*' mapWithNodeId { _, id -> (::UnaryAsteriskNode).withNodeId(id) },
        -"$#" mapWithNodeId { _, id -> (::UnaryDollarSharpNode).withNodeId(id) },
        -"$&" mapWithNodeId { _, id -> (::UnaryDollarAmpersandNode).withNodeId(id) },
        -"$*" mapWithNodeId { _, id -> (::UnaryDollarAsteriskNode).withNodeId(id) },
        -'@' mapWithNodeId { _, id -> (::UnaryAtNode).withNodeId(id) },
        -'\\' mapWithNodeId { _, id -> (::UnaryBackslashNode).withNodeId(id) },
    )
    val rightOperator: Parser<(Node) -> Node> = or(
        -s * (-'(').result * withIndent(false, -b * (ref { commas } * -b).optional * -"=>" * -b * (ref { expression } * -b).optional) * -')' mapWithNodeId { it, id -> { main -> BracketsRightArrowedRoundNode(main, it.b ?: EmptyNode(id()), it.c ?: EmptyNode(id()), it.a.position, id()) } },
        -s * (-'[').result * withIndent(false, -b * (ref { commas } * -b).optional * -"=>" * -b * (ref { expression } * -b).optional) * -']' mapWithNodeId { it, id -> { main -> BracketsRightArrowedSquareNode(main, it.b ?: EmptyNode(id()), it.c ?: EmptyNode(id()), it.a.position, id()) } },
        -s * (-'{').result * withIndent(false, -b * (ref { commas } * -b).optional * -"=>" * -b * (ref { expression } * -b).optional) * -'}' mapWithNodeId { it, id -> { main -> BracketsRightArrowedCurlyNode(main, it.b ?: EmptyNode(id()), it.c ?: EmptyNode(id()), it.a.position, id()) } },
        -s * (-'(').result * withIndent(false, -b * (ref { expression } * -b).optional) * -')' mapWithNodeId { it, id -> { main -> BracketsRightSimpleRoundNode(main, it.b ?: EmptyNode(id()), it.a.position, id()) } },
        -s * (-'[').result * withIndent(false, -b * (ref { expression } * -b).optional) * -']' mapWithNodeId { it, id -> { main -> BracketsRightSimpleSquareNode(main, it.b ?: EmptyNode(id()), it.a.position, id()) } },
        -s * (-'{').result * withIndent(false, -b * (ref { expression } * -b).optional) * -'}' mapWithNodeId { it, id -> { main -> BracketsRightSimpleCurlyNode(main, it.b ?: EmptyNode(id()), it.a.position, id()) } },

        -s * (-"++").result mapWithNodeId { it, id -> { main -> PostfixPlusPlusNode(main, it.position, id()) } },
        -s * (-"--").result mapWithNodeId { it, id -> { main -> PostfixMinusMinusNode(main, it.position, id()) } },

        -b * (-'.').result * -b * nonFloatFactor mapWithNodeId { it, id -> { main -> InfixPeriodNode(main, it.b, it.a.position, id()) } },
        -b * (-"?.").result * -b * nonFloatFactor mapWithNodeId { it, id -> { main -> InfixQuestionPeriodNode(main, it.b, it.a.position, id()) } },
        -b * (-"::").result * -b * nonFloatFactor mapWithNodeId { it, id -> { main -> InfixColonColonNode(main, it.b, it.a.position, id()) } },
        -b * (-"?::").result * -b * nonFloatFactor mapWithNodeId { it, id -> { main -> InfixQuestionColonColonNode(main, it.b, it.a.position, id()) } },

        -b * -'.' * unaryOperator.result map { { main -> it.value(main, Side.RIGHT, it.position) } },
    )
    val right: Parser<Node> = factor * rightOperator.zeroOrMore map { it.b.fold(it.a) { node, f -> f(node) } }
    val pow: Parser<Node> = right * (-s * (-'^').result * -b * ref { left }).optional mapWithNodeId { it, id ->
        val right = it.b
        if (right != null) InfixCircumflexNode(it.a, right.b, right.a.position, id()) else it.a
    }
    val left: Parser<Node> = (unaryOperator.result * -b).zeroOrMore * pow map { it.a.foldRight(it.b) { f, node -> f.value(node, Side.LEFT, f.position) } }

    val mulOperator: Parser<(Node, Node, Position) -> InfixNode> = or(
        -'*' mapWithNodeId { _, id -> (::InfixAsteriskNode).withNodeId(id) },
        -'/' mapWithNodeId { _, id -> (::InfixSlashNode).withNodeId(id) },
        -"!%%" mapWithNodeId { _, id -> (::InfixExclamationPercentPercentNode).withNodeId(id) },
        -"%%" mapWithNodeId { _, id -> (::InfixPercentPercentNode).withNodeId(id) },
        -'%' mapWithNodeId { _, id -> (::InfixPercentNode).withNodeId(id) },
    )
    val mul: Parser<Node> = leftAssociative(left, -s * mulOperator.result * -b) { left, operator, right -> operator.value(left, right, operator.position) }
    val addOperator: Parser<(Node, Node, Position) -> InfixNode> = or(
        -'+' mapWithNodeId { _, id -> (::InfixPlusNode).withNodeId(id) },
        -'-' * !'>' mapWithNodeId { _, id -> (::InfixMinusNode).withNodeId(id) },
        -'&' * !'&' mapWithNodeId { _, id -> (::InfixAmpersandNode).withNodeId(id) },
    )
    val add: Parser<Node> = leftAssociative(mul, -s * addOperator.result * -b) { left, operator, right -> operator.value(left, right, operator.position) }
    val rangeOperator: Parser<(Node, Node, Position) -> InfixNode> = or(
        -".." mapWithNodeId { _, id -> (::InfixPeriodPeriodNode).withNodeId(id) },
        -'~' mapWithNodeId { _, id -> (::InfixTildeNode).withNodeId(id) },
    )
    val range: Parser<Node> = leftAssociative(add, -s * rangeOperator.result * -b) { left, operator, right -> operator.value(left, right, operator.position) }
    val infixIdentifierOperator: Parser<(Node, Node) -> Node> = or(
        (identifier + quotedIdentifier).result mapWithNodeId { it, id -> { left, right -> InfixIdentifierNode(left, it.value, right, it.position, id()) } },
        (-'!').result * (identifier + quotedIdentifier) mapWithNodeId { it, id -> { left, right -> InfixExclamationIdentifierNode(left, it.b, right, it.a.position, id()) } },
    )
    val infixIdentifier: Parser<Node> = leftAssociative(range, -s * infixIdentifierOperator * -b) { left, operator, right -> operator(left, right) }
    val matchOperator: Parser<(Node, Node, Position) -> InfixNode> = or(
        -"=~" mapWithNodeId { _, id -> (::InfixEqualTildeNode).withNodeId(id) },
        -"!~" mapWithNodeId { _, id -> (::InfixExclamationTildeNode).withNodeId(id) },
    )
    val match: Parser<Node> = leftAssociative(infixIdentifier, -s * matchOperator.result * -b) { left, operator, right -> operator.value(left, right, operator.position) }
    val spaceshipOperator: Parser<(Node, Node, Position) -> InfixNode> = -"<=>" mapWithNodeId { _, id -> (::InfixLessEqualGreaterNode).withNodeId(id) }
    val spaceship: Parser<Node> = leftAssociative(match, -s * spaceshipOperator.result * -b) { left, operator, right -> operator.value(left, right, operator.position) }
    val comparisonOperator: Parser<ComparisonOperatorType> = or(
        -"==" map { ComparisonOperatorType.EQUAL_EQUAL }, // ==
        -"!=" map { ComparisonOperatorType.EXCLAMATION_EQUAL }, // !=
        -">=" map { ComparisonOperatorType.GREATER_EQUAL }, // >=
        -'>' * !'>' map { ComparisonOperatorType.GREATER }, // >
        -"<=" map { ComparisonOperatorType.LESS_EQUAL }, // <=
        -'<' * !'<' map { ComparisonOperatorType.LESS }, // <
        -"?=" map { ComparisonOperatorType.QUESTION_EQUAL }, // ?=
        -"!?=" map { ComparisonOperatorType.EXCLAMATION_QUESTION_EQUAL }, // !?=
        -"!@" map { ComparisonOperatorType.EXCLAMATION_AT }, // !@
        -'@' map { ComparisonOperatorType.AT }, // @
    )
    val comparison: Parser<Node> = spaceship * (-s * comparisonOperator.result * -b * spaceship).zeroOrMore mapWithNodeId { it, id ->
        if (it.b.isNotEmpty()) {
            ComparisonsNode(listOf(it.a, *it.b.map { t -> t.b }.toTypedArray()), it.b.map { t -> Pair(t.a.value, t.a.position) }, id())
        } else {
            it.a
        }
    }
    val andOperator: Parser<(Node, Node, Position) -> InfixNode> = -"&&" mapWithNodeId { _, id -> (::InfixAmpersandAmpersandNode).withNodeId(id) }
    val and: Parser<Node> = leftAssociative(comparison, -s * andOperator.result * -b) { left, operator, right -> operator.value(left, right, operator.position) }
    val orOperator: Parser<(Node, Node, Position) -> InfixNode> = -"||" mapWithNodeId { _, id -> (::InfixPipePipeNode).withNodeId(id) }
    val or: Parser<Node> = leftAssociative(and, -s * orOperator.result * -b) { left, operator, right -> operator.value(left, right, operator.position) }
    val condition: Parser<Node> = or(
        or * -b * (-'?' * !':').result * -b * ref { condition } * -b * -':' * !':' * -b * ref { condition } mapWithNodeId { it, id -> ConditionNode(it.a, it.c, it.d, it.b.position, id()) },
        or * -b * (-"?:").result * -b * ref { condition } mapWithNodeId { it, id -> InfixQuestionColonNode(it.a, it.c, it.b.position, id()) },
        or * -b * (-"!?").result * -b * ref { condition } mapWithNodeId { it, id -> InfixExclamationQuestionNode(it.a, it.c, it.b.position, id()) },
        or,
    )

    val commasPart: Parser<List<Node>> = or(
        (condition * -b + fixed(Unit).mapWithNodeId { _, id -> EmptyNode(id()) }) * -',' * (-b * ref { commasPart } + fixed(Unit).mapWithNodeId { _, id -> listOf(EmptyNode(id())) }) map { listOf(it.a) + it.b },
        condition map { listOf(it) },
    )
    val commas: Parser<Node> = commasPart mapWithNodeId { it, id -> if (it.size == 1) it.single() else CommasNode(it, id()) }

    val pipeOperator: Parser<(Node, Node, Position) -> InfixNode> = or(
        -'|' mapWithNodeId { _, id -> (::InfixPipeNode).withNodeId(id) }, // |
    )
    val argumentsOperator: Parser<(Node, Node, Position) -> InfixNode> = or(
        -"=>" mapWithNodeId { _, id -> (::InfixEqualGreaterNode).withNodeId(id) }, // =>
    )
    val executionOperator: Parser<(Node, Node, Position) -> InfixNode> = or(
        -">>" mapWithNodeId { _, id -> (::InfixGreaterGreaterNode).withNodeId(id) }, // >>
        -"!:" mapWithNodeId { _, id -> (::InfixExclamationColonNode).withNodeId(id) }, // !:
    )
    val assignmentOperator: Parser<(Node, Node, Position) -> InfixNode> = or(
        -'=' * !'>' * !':' mapWithNodeId { _, id -> (::InfixEqualNode).withNodeId(id) }, // =
        -"=:" mapWithNodeId { _, id -> (::InfixEqualColonNode).withNodeId(id) }, // =:
        -':' * !'=' * !':' mapWithNodeId { _, id -> (::InfixColonNode).withNodeId(id) }, // :
        -":=" mapWithNodeId { _, id -> (::InfixColonEqualNode).withNodeId(id) }, // :=
        -"<<" mapWithNodeId { _, id -> (::InfixLessLessNode).withNodeId(id) }, // <<
        -"->" mapWithNodeId { _, id -> (::InfixMinusGreaterNode).withNodeId(id) }, // ->
        -"+=" mapWithNodeId { _, id -> (::InfixPlusEqualNode).withNodeId(id) }, // +=
        -"-=" mapWithNodeId { _, id -> (::InfixMinusEqualNode).withNodeId(id) }, // -=
    )

    val pipeOperatorPart: Parser<ParseResult<(Node, Node, Position) -> InfixNode>> = -b * pipeOperator.result * -b + -s * argumentsOperator.result * -b
    val executionOperatorPart: Parser<ParseResult<(Node, Node, Position) -> InfixNode>> = -b * executionOperator.result * -b
    val assignmentOperatorPart: Parser<ParseResult<(Node, Node, Position) -> InfixNode>> = -s * assignmentOperator.result * -b

    val pipeRight: Parser<Node> = or(
        commas * pipeOperatorPart * ref { pipeRight } map { it.b.value(it.a, it.c, it.b.position) },
        commas * assignmentOperatorPart * ref { stream } map { it.b.value(it.a, it.c, it.b.position) },
        commas,
    )
    val executionRight: Parser<Node> = or(
        commas * assignmentOperatorPart * ref { stream } map { it.b.value(it.a, it.c, it.b.position) },
        commas,
    )
    val streamRightPart: Parser<(Node) -> Node> = or(
        pipeOperatorPart * pipeRight map { { left -> it.a.value(left, it.b, it.a.position) } },
        executionOperatorPart * executionRight map { { left -> it.a.value(left, it.b, it.a.position) } },
    )
    val stream: Parser<Node> = or(
        commas * assignmentOperatorPart * ref { stream } map { it.b.value(it.a, it.c, it.b.position) },
        commas * streamRightPart.zeroOrMore map { it.b.fold(it.a) { left, part -> part(left) } },
    )

    val semicolonsPart: Parser<List<Node>> = or(
        stream * -(s * br).oneOrMore * -indent * -s * ref { semicolonsPart } map { listOf(it.a) + it.b },
        (stream * -s + fixed(Unit).mapWithNodeId { _, id -> EmptyNode(id()) }) * -';' * (-b * ref { semicolonsPart } + fixed(Unit).mapWithNodeId { _, id -> listOf(EmptyNode(id())) }) map { listOf(it.a) + it.b },
        stream map { listOf(it) },
    )
    val semicolons: Parser<Node> = semicolonsPart mapWithNodeId { it, id -> if (it.size == 1) it.single() else SemicolonsNode(it, id()) }
    val expression: Parser<Node> = semicolons

    val rootParser: Parser<Node> = -b * (expression * -b).optional mapWithNodeId { it, id -> it.a ?: EmptyNode(id()) }

    val shebang: Parser<Tuple0> = -Regex("""#![^\r\n]*(?:\n|\r\n?)?""") // 最外部の先頭限定のシバン行（末尾の改行ごと消費）
    val rootEmbeddedParser: Parser<Node> = -shebang.optional * embeddedStringContent.zeroOrMore mapWithNodeId { it, id -> EmbeddedStringNode(it.flatten(), id()) } // 最外部を埋め込み文字列の本体として解釈する

    private infix fun <T : Any, R : Any> Parser<T>.mapWithNodeId(transform: (T, () -> Int) -> R): Parser<R> {
        return mapEx { context, result ->
            transform(result.value, (context as XarpiteParseContext)::allocateNodeId)
        }
    }

    private fun <A, B, C, R : Node> ((A, B, C, Int) -> R).withNodeId(id: () -> Int): (A, B, C) -> R {
        return { first, second, third -> this(first, second, third, id()) }
    }

    private val <T : Any> Parser<T>.result get() = this.mapEx { _, result -> result }
    private val ParseResult<*>.position get() = Position(location, start)
}
