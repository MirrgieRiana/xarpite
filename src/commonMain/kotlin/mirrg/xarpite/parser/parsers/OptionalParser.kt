package mirrg.xarpite.parser.parsers

import mirrg.xarpite.parser.ParseContext
import mirrg.xarpite.parser.ParseResult
import mirrg.xarpite.parser.Parser
import mirrg.xarpite.parser.Tuple1

class OptionalParser<out T : Any>(val parser: Parser<T>) : Parser<Tuple1<T?>> {
    override fun parseOrNull(context: ParseContext, start: Int): ParseResult<Tuple1<T?>> {
        val result = context.parseOrNull(parser, start)
        return if (result != null) {
            ParseResult(Tuple1(result.value), result.start, result.end)
        } else {
            ParseResult(Tuple1(null), start, start)
        }
    }
}

val <T : Any> Parser<T>.optional get() = OptionalParser(this)
