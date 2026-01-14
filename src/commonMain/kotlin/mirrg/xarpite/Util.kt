package mirrg.xarpite

import kotlinx.serialization.json.Json
import kotlinx.serialization.json.JsonArray
import kotlinx.serialization.json.JsonElement
import kotlinx.serialization.json.JsonNull
import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.JsonPrimitive
import mirrg.xarpite.compilers.objects.FluoriteArray
import mirrg.xarpite.compilers.objects.FluoriteBoolean
import mirrg.xarpite.compilers.objects.FluoriteDouble
import mirrg.xarpite.compilers.objects.FluoriteInt
import mirrg.xarpite.compilers.objects.FluoriteNull
import mirrg.xarpite.compilers.objects.FluoriteObject
import mirrg.xarpite.compilers.objects.FluoriteStream
import mirrg.xarpite.compilers.objects.FluoriteString
import mirrg.xarpite.compilers.objects.FluoriteValue
import mirrg.xarpite.compilers.objects.callMethod
import mirrg.xarpite.compilers.objects.collect
import mirrg.xarpite.compilers.objects.toFluoriteArray
import mirrg.xarpite.compilers.objects.toFluoriteNumber
import mirrg.xarpite.compilers.objects.toFluoriteString

fun String.escapeJsonString() = this
    .replace("\\", "\\\\")
    .replace("\r", "\\r")
    .replace("\n", "\\n")
    .replace("\"", "\\\"")


private val jsons = mutableMapOf<String, Json>()

suspend fun FluoriteValue.toSingleJson(indent: String?): String {
    suspend fun FluoriteValue.toJsonElement(): JsonElement = when (this) {
        is FluoriteObject -> JsonObject(this.map.mapValues { it.value.toJsonElement() })
        is FluoriteArray -> JsonArray(this.values.map { it.toJsonElement() })
        is FluoriteInt -> JsonPrimitive(this.value)
        is FluoriteDouble -> JsonPrimitive(this.value)
        is FluoriteString -> JsonPrimitive(this.value)
        is FluoriteBoolean -> JsonPrimitive(this.value)
        FluoriteNull -> JsonNull
        is FluoriteStream -> throw IllegalArgumentException("Cannot convert FluoriteStream to single JSON")
        else -> this.callMethod("$&_").toJsonElement()
    }

    val jsonElement = this.toJsonElement()

    val effectiveIndent = indent ?: "  "
    if (effectiveIndent == "") return Json.encodeToString(jsonElement)
    val oldJson = jsons[effectiveIndent]
    val json = if (oldJson != null) {
        oldJson
    } else {
        val newJson = Json {
            prettyPrint = true
            prettyPrintIndent = effectiveIndent
        }
        if (jsons.size >= 10) jsons.clear()
        jsons[effectiveIndent] = newJson
        newJson
    }
    return json.encodeToString(jsonElement)
}

suspend fun FluoriteValue.toSingleJsonFluoriteValue(indent: String?) = this.toSingleJson(indent).toFluoriteString()

suspend fun FluoriteValue.toJsonsFluoriteValue(indent: String?): FluoriteValue {
    val effectiveIndent = indent ?: ""
    return if (this is FluoriteStream) {
        FluoriteStream {
            this@toJsonsFluoriteValue.collect {
                emit(it.toSingleJsonFluoriteValue(effectiveIndent))
            }
        }
    } else {
        this.toSingleJsonFluoriteValue(effectiveIndent)
    }
}


fun String.toFluoriteValueAsSingleJson(): FluoriteValue {
    fun JsonElement.toFluoriteValue(): FluoriteValue = when (this) {
        is JsonObject -> FluoriteObject(FluoriteObject.fluoriteClass, this.mapValues { it.value.toFluoriteValue() }.toMutableMap())
        is JsonArray -> this.map { it.toFluoriteValue() }.toFluoriteArray()
        JsonNull -> FluoriteNull
        is JsonPrimitive -> when {
            this.isString -> this.content.toFluoriteString()
            this.content == "true" -> FluoriteBoolean.TRUE
            this.content == "false" -> FluoriteBoolean.FALSE
            else -> this.content.toFluoriteNumber()
        }
    }
    return Json.decodeFromString<JsonElement>(this).toFluoriteValue()
}

suspend fun FluoriteValue.toFluoriteValueAsSingleJson() = this.toFluoriteString().value.toFluoriteValueAsSingleJson()

class JsonSplitter(private val listener: suspend (String) -> Unit) {
    private val lines = mutableListOf<String>()
    private var blockLevel = 0

    suspend fun add(line: String) {
        if (line.isBlank()) return
        lines.add(line)
        var isInString = false
        var isAfterEscape = false
        line.forEach { ch ->
            if (isInString) {
                if (isAfterEscape) {
                    isAfterEscape = false
                } else {
                    when (ch) {
                        '\\' -> isAfterEscape = true
                        '"' -> isInString = false
                    }
                }
            } else {
                when (ch) {
                    '"' -> isInString = true
                    '{', '[' -> blockLevel++
                    '}', ']' -> {
                        if (blockLevel > 0) {
                            blockLevel--
                        } else {
                            throw IllegalStateException("Unmatched closing bracket")
                        }
                    }
                }
            }
        }
        if (isInString) throw IllegalStateException("Unclosed string literal")
        if (isAfterEscape) throw IllegalStateException("Dangling escape character")
        if (blockLevel == 0 && lines.isNotEmpty()) {
            listener(lines.joinToString("\n"))
            lines.clear()
        }
    }

    suspend fun end() {
        if (lines.isNotEmpty()) {
            listener(lines.joinToString("\n"))
            lines.clear()
        }
    }
}

suspend fun FluoriteValue.toFluoriteValueAsJsons(): FluoriteValue {
    return if (this is FluoriteStream) {
        FluoriteStream {
            val jsonSplitter = JsonSplitter { json ->
                emit(json.toFluoriteValueAsSingleJson())
            }
            this@toFluoriteValueAsJsons.collect {
                val line = it.toFluoriteString().value
                jsonSplitter.add(line)
            }
            jsonSplitter.end()
        }
    } else {
        val json = this.toFluoriteString().value
        if (json.isBlank()) {
            FluoriteStream.EMPTY
        } else {
            json.toFluoriteValueAsSingleJson()
        }
    }
}


/**
 * 指数表記の文字列を小数表記の文字列にします。
 * 指数表記にはeもしくはEを使うことができます。
 * 先頭と末尾の不要な0は常に削除されます。
 */
fun String.removeExponent(): String {

    // 指数表記の分割
    var mantissa: String
    val exponent: Int
    run a@{

        // eを含む指数表記
        run {
            val index = this.indexOf('e')
            if (index != -1) {
                mantissa = this.take(index)
                exponent = this.drop(index + 1).toInt()
                return@a
            }
        }

        // Eを含む指数表記
        run {
            val index = this.indexOf('E')
            if (index != -1) {
                mantissa = this.take(index)
                exponent = this.drop(index + 1).toInt()
                return@a
            }
        }

        // 指数表記ではない
        mantissa = this
        exponent = 0
    }

    // 仮数部から符号を除去
    val sign = when {
        mantissa.startsWith('-') -> '-'
        mantissa.startsWith('+') -> '+'
        else -> null
    }
    if (sign != null) mantissa = mantissa.drop(1)

    // 仮数部を小数点で分離
    var integer: String
    var decimal: String
    run {
        val index = mantissa.indexOf('.')
        if (index != -1) {
            // 小数点があった
            integer = mantissa.take(index)
            decimal = mantissa.drop(index + 1)
        } else {
            // 小数点がなかった
            integer = mantissa
            decimal = ""
        }
    }

    // 小数点の移動
    if (exponent > 0) {
        // 指数部が正
        // 数字を小数部から整数部に移動
        val amount = exponent

        // 小数部の右に0を補充
        val lack = amount - decimal.length
        if (lack > 0) decimal = (decimal + "0".repeat(lack))

        integer = (integer + decimal.take(amount))
        decimal = decimal.drop(amount)
    } else if (exponent < 0) {
        // 指数部が負
        // 数字を整数部から小数部に移動
        val amount = -exponent

        // 整数部の左に0を補充
        val lack = amount - integer.length
        if (lack > 0) integer = ("0".repeat(lack) + integer)

        decimal = (integer.takeLast(amount) + decimal)
        integer = integer.dropLast(amount)
    }

    // 余分な0の除去
    run {
        var i = 0
        while (i < integer.length) {
            if (integer[i] != '0') break
            i++
        }
        if (i > 0) integer = integer.drop(i)
    }
    run {
        var i = 0
        while (i < decimal.length) {
            if (decimal[decimal.length - 1 - i] != '0') break
            i++
        }
        if (i > 0) decimal = decimal.dropLast(i)
    }

    // 文字列化
    if (integer.isEmpty()) integer = "0" // 整数部が空だった場合、0を補填
    val real = if (decimal.isEmpty()) integer else "$integer.$decimal" // 小数部が空だった場合、小数点を追加しない
    val result = if (sign != null) "$sign$real" else real

    return result
}

// これを使わない場合、js環境で　null?.let { a(it) } ?: b　みたいに書くと a が実行されてしまうKotlin JSのバグを踏む
suspend fun <T : Any> MutableMap<String, FluoriteValue>.pop(key: String, block: suspend (FluoriteValue) -> T, or: suspend () -> T): T {
    return this.remove(key)?.let { block(it) } ?: or() // しかしなぜここの ?.let がうまくいくのかは謎
}

fun Int.toFluoriteIntAsCompared(): FluoriteInt {
    return when {
        this < 0 -> FluoriteInt.MINUS_ONE
        this == 0 -> FluoriteInt.ZERO
        else -> FluoriteInt.ONE
    }
}

object IterationAborted : Throwable()

class WorkInProgressError(message: String) : Error(message)
