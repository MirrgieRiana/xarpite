package mirrg.xarpite.parser.parsers

import mirrg.xarpite.parser.ParseContext
import mirrg.xarpite.parser.ParseResult
import mirrg.xarpite.parser.Parser

object NothingParser : Parser<Nothing> {
    override fun parseOrNull(context: ParseContext, start: Int): ParseResult<Nothing>? {
        return null
    }
}

val nothing get() = NothingParser
