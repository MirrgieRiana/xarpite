package mirrg.xarpite.parser.parsers

import mirrg.xarpite.parser.ParseResult
import mirrg.xarpite.parser.Parser

fun String.normalize() = this.replace("\r\n", "\n").replace("\r", "\n")

fun <T : Any, O : Any> leftAssociative(term: Parser<T>, operator: Parser<O>, combinator: (T, O, T) -> T) = Parser { context, start ->
    var result = context.parseOrNull(term, start) ?: return@Parser null
    while (true) {
        val operatorResult = context.parseOrNull(operator, result.end) ?: break
        val rightResult = context.parseOrNull(term, operatorResult.end) ?: break
        result = ParseResult(combinator(result.value, operatorResult.value, rightResult.value), result.start, rightResult.end)
    }
    result
}

fun <T : Any, O : Any> rightAssociative(term: Parser<T>, operator: Parser<O>, combinator: (T, O, T) -> T) = Parser { context, start ->
    val termResults = mutableListOf<ParseResult<T>>()
    val operatorResults = mutableListOf<ParseResult<O>>()
    val leftResult = context.parseOrNull(term, start) ?: return@Parser null
    termResults += leftResult
    var nextIndex = leftResult.end
    while (true) {
        val operatorResult = context.parseOrNull(operator, nextIndex) ?: break
        val rightResult = context.parseOrNull(term, operatorResult.end) ?: break
        operatorResults += operatorResult
        termResults += rightResult
        nextIndex = rightResult.end
    }
    if (termResults.size == 1) return@Parser termResults.single()
    var result = termResults.last()
    var i = operatorResults.size - 1
    while (i >= 0) {
        result = ParseResult(combinator(termResults[i].value, operatorResults[i].value, result.value), termResults[i].start, result.end)
        i--
    }
    result
}
