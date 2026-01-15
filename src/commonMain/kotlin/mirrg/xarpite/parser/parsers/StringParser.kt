package mirrg.xarpite.parser.parsers

import mirrg.xarpite.hasFreeze
import mirrg.xarpite.parser.ParseContext
import mirrg.xarpite.parser.ParseResult
import mirrg.xarpite.parser.Parser

class StringParser(val string: String) : Parser<String> {
    override fun parseOrNull(context: ParseContext, start: Int): ParseResult<String>? {
        val nextIndex = start + string.length
        if (nextIndex > context.src.length) return null
        var index = 0
        while (index < string.length) {
            if (context.src[start + index] != string[index]) return null
            index++
        }
        return ParseResult(string, start, nextIndex)
    }

    companion object {
        val cache = mutableMapOf<String, StringParser>()
    }
}

fun String.toParser() = if (hasFreeze()) StringParser(this) else StringParser.cache.getOrPut(this) { StringParser(this) }
operator fun String.unaryPlus() = this.toParser()
operator fun String.unaryMinus() = -+this
operator fun String.not() = !+this
