package mirrg.xarpite.parser

import mirrg.xarpite.escapeJsonString
import mirrg.xarpite.parser.parsers.normalize

fun interface Parser<out T : Any> {
    fun parseOrNull(context: ParseContext, start: Int): ParseResult<T>?
}

class ParseContext(val src: String, val useCache: Boolean) {
    private val cache = mutableMapOf<Pair<Parser<*>, Int>, ParseResult<Any>?>()
    fun <T : Any> parseOrNull(parser: Parser<T>, start: Int): ParseResult<T>? {
        return if (useCache) {
            val key = Pair(parser, start)
            if (key in cache) {
                cache[key] as ParseResult<T>?
            } else {
                val result = parser.parseOrNull(this, start)
                cache[key] = result
                result
            }
        } else {
            parser.parseOrNull(this, start)
        }
    }
}

data class ParseResult<out T : Any>(val value: T, val start: Int, val end: Int)

fun ParseResult<*>.text(context: ParseContext) = context.src.substring(this.start, this.end).normalize()

open class ParseException(message: String, val position: Int) : Exception(message)


class UnmatchedInputParseException(message: String, position: Int) : ParseException(message, position)

class ExtraCharactersParseException(message: String, position: Int) : ParseException(message, position)

fun <T : Any> Parser<T>.parseAllOrThrow(src: String, useCache: Boolean = true): T {
    val context = ParseContext(src, useCache)
    val result = this.parseOrNull(context, 0) ?: throw UnmatchedInputParseException("Failed to parse.", 0) // TODO 候補
    if (result.end != src.length) {
        val string = src.drop(result.end).let { if (it.length > 10) "${it.take(10)}..." else it }.escapeJsonString()
        throw ExtraCharactersParseException("""Extra characters found after position ${result.end}: "$string"""", result.end)
    }
    return result.value
}


object NumberParser : Parser<Int> {
    override fun parseOrNull(context: ParseContext, start: Int): ParseResult<Int>? {
        val sb = StringBuilder()
        var index = start
        while (index < context.src.length) {
            val char = context.src[index]
            if (char in '0'..'9') {
                sb.append(char)
                index++
            } else {
                break
            }
        }
        if (sb.isEmpty()) return null
        val number = sb.toString().toInt()
        return ParseResult(number, start, index)
    }
}
