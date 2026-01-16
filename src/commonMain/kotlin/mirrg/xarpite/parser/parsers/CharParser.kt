package mirrg.xarpite.parser.parsers

import mirrg.xarpite.hasFreeze
import mirrg.xarpite.parser.ParseContext
import mirrg.xarpite.parser.ParseResult
import mirrg.xarpite.parser.Parser

class CharParser(val char: Char) : Parser<Char> {
    override fun parseOrNull(context: ParseContext, start: Int): ParseResult<Char>? {
        if (start >= context.src.length) return null
        if (context.src[start] != char) return null
        return ParseResult(char, start, start + 1)
    }

    companion object {
        val cache = mutableMapOf<Char, CharParser>()
    }
}

fun Char.toParser() = if (hasFreeze()) CharParser(this) else CharParser.cache.getOrPut(this) { CharParser(this) }
operator fun Char.unaryPlus() = this.toParser()
operator fun Char.unaryMinus() = -+this
operator fun Char.not() = !+this
