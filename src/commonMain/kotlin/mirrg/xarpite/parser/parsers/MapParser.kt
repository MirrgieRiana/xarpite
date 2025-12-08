package mirrg.xarpite.parser.parsers

import mirrg.xarpite.parser.ParseContext
import mirrg.xarpite.parser.ParseResult
import mirrg.xarpite.parser.Parser

infix fun <I : Any, O : Any> Parser<I>.map(function: (I) -> O) = Parser { context, start ->
    val result = context.parseOrNull(this, start) ?: return@Parser null
    ParseResult(function(result.value), result.start, result.end)
}

infix fun <I : Any, O : Any> Parser<I>.mapEx(function: (ParseContext, ParseResult<I>) -> O) = Parser { context, start ->
    val result = context.parseOrNull(this, start) ?: return@Parser null
    ParseResult(function(context, result), result.start, result.end)
}
