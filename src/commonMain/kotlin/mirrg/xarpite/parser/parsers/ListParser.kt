package mirrg.xarpite.parser.parsers

import mirrg.xarpite.parser.ParseContext
import mirrg.xarpite.parser.ParseResult
import mirrg.xarpite.parser.Parser

class ListParser<out T : Any>(val parser: Parser<T>, val min: Int, val max: Int) : Parser<List<T>> {
    override fun parseOrNull(context: ParseContext, start: Int): ParseResult<List<T>>? {
        val results = mutableListOf<T>()
        var nextIndex = start
        while (true) {
            val result = context.parseOrNull(parser, nextIndex) ?: break
            results += result.value
            nextIndex = result.end
            if (results.size >= max) break
        }
        if (results.size < min) return null
        return ParseResult(results, start, nextIndex)
    }
}

fun <T : Any> Parser<T>.list(min: Int = 0, max: Int = Int.MAX_VALUE) = ListParser(this, min, max)
val <T : Any> Parser<T>.zeroOrMore get() = this.list()
val <T : Any> Parser<T>.oneOrMore get() = this.list(min = 1)
