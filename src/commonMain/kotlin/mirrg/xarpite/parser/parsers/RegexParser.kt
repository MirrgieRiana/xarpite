package mirrg.xarpite.parser.parsers

import mirrg.xarpite.parser.ParseContext
import mirrg.xarpite.parser.ParseResult
import mirrg.xarpite.parser.Parser

class RegexParser(val regex: Regex) : Parser<MatchResult> {
    override fun parseOrNull(context: ParseContext, start: Int): ParseResult<MatchResult>? {
        @OptIn(ExperimentalStdlibApi::class)
        val matchResult = regex.matchAt(context.src, start) ?: return null
        return ParseResult(matchResult, start, matchResult.range.last + 1)
    }
}

fun Regex.toParser() = RegexParser(this)
operator fun Regex.unaryPlus() = this.toParser()
operator fun Regex.unaryMinus() = -+this
operator fun Regex.not() = !+this
