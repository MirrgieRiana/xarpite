package mirrg.xarpite.mounts

import mirrg.xarpite.RuntimeContext
import mirrg.xarpite.compilers.objects.FluoriteArray
import mirrg.xarpite.compilers.objects.FluoriteFunction
import mirrg.xarpite.compilers.objects.FluoriteInt
import mirrg.xarpite.compilers.objects.FluoriteStream
import mirrg.xarpite.compilers.objects.FluoriteString
import mirrg.xarpite.compilers.objects.FluoriteValue
import mirrg.xarpite.compilers.objects.asFluoriteArray
import mirrg.xarpite.compilers.objects.asFluoriteBlob
import mirrg.xarpite.compilers.objects.collect
import mirrg.xarpite.compilers.objects.toByteArrayAsBlobLike
import mirrg.xarpite.compilers.objects.toFluoriteNumber
import mirrg.xarpite.compilers.objects.toFluoriteString
import mirrg.xarpite.operations.FluoriteException
import mirrg.xarpite.pop
import mirrg.xarpite.toFluoriteValueAsJsons
import mirrg.xarpite.toFluoriteValueAsSingleJson
import mirrg.xarpite.toJsonsFluoriteValue
import mirrg.xarpite.toSingleJsonFluoriteValue
import okio.Buffer
import kotlin.io.encoding.Base64

context(context: RuntimeContext)
fun createDataConversionMounts(): List<Map<String, FluoriteValue>> {
    return mapOf(
        "BASE" to FluoriteFunction { arguments ->
            fun usage(): Nothing = usage("BASE(radix: NUMBER; number: NUMBER): STRING")
            if (arguments.size != 2) usage()
            val radix = arguments[0].toFluoriteNumber(null).roundToInt()
            if (radix !in 2..36) throw FluoriteException("Radix must be between 2 and 36, got $radix".toFluoriteString())
            val number = arguments[1].toFluoriteNumber(null).roundToInt()
            number.toString(radix).uppercase().toFluoriteString()
        },
        "BASED" to FluoriteFunction { arguments ->
            fun usage(): Nothing = usage("BASED(radix: NUMBER; string: STRING): NUMBER")
            if (arguments.size != 2) usage()
            val radix = arguments[0].toFluoriteNumber(null).roundToInt()
            if (radix !in 2..36) throw FluoriteException("Radix must be between 2 and 36, got $radix".toFluoriteString())
            val string = arguments[1].toFluoriteString(null).value
            FluoriteInt(string.toInt(radix))
        },
        "UTF8" to FluoriteFunction { arguments ->
            fun usage(): Nothing = usage("UTF8(string: STRING): BLOB")
            if (arguments.size != 1) usage()
            val string = arguments[0].toFluoriteString(null).value
            string.encodeToByteArray().asFluoriteBlob()
        },
        "UTF8D" to FluoriteFunction { arguments ->
            fun usage(): Nothing = usage("UTF8D(blobLike: BLOB_LIKE): STRING")
            if (arguments.size != 1) usage()
            val value = arguments[0]
            value.toByteArrayAsBlobLike().decodeToString().toFluoriteString()
        },
        *run {
            val base64 by lazy { Base64.Mime }
            arrayOf(
                "BASE64" to FluoriteFunction { arguments ->
                    fun usage(): Nothing = usage("BASE64(string: STRING): STRING")
                    if (arguments.size != 1) usage()
                    val string = arguments[0].toFluoriteString(null).value
                    base64.encode(string.encodeToByteArray()).replace("\r\n", "\n").toFluoriteString()
                },
                "BASE64D" to FluoriteFunction { arguments ->
                    fun usage(): Nothing = usage("BASE64D(string: STRING): STRING")
                    if (arguments.size != 1) usage()
                    val string = arguments[0].toFluoriteString(null).value
                    base64.decode(string).decodeToString().toFluoriteString()
                },
            )
        },
        "URL" to FluoriteFunction { arguments ->
            fun usage(): Nothing = usage("URL(string: STRING): STRING")
            if (arguments.size != 1) usage()
            val string = arguments[0].toFluoriteString(null).value
            val sb = StringBuilder()
            string.encodeToByteArray().forEach { byte ->
                val char = byte.toInt().toChar()
                when (char) {
                    in 'A'..'Z', in 'a'..'z', in '0'..'9' -> sb.append(char)
                    '-', '_', '.', '~' -> sb.append(char)
                    ' ' -> sb.append('+')
                    else -> sb.append("%${byte.toUByte().toString(16).uppercase().padStart(2, '0')}")
                }
            }
            sb.toString().toFluoriteString()
        },
        "URLD" to FluoriteFunction { arguments ->
            fun usage(): Nothing = usage("URLD(string: STRING): STRING")
            if (arguments.size != 1) usage()
            val string = arguments[0].toFluoriteString(null).value
            val buffer = Buffer()
            var i = 0
            while (i < string.length) {
                val char = string[i]
                when (char) {
                    '+' -> {
                        buffer.writeByte(' '.code)
                        i++
                    }

                    '%' if i + 3 <= string.length -> {
                        val hex = string.substring(i + 1, i + 3)
                        buffer.writeByte(hex.toInt(16))
                        i += 3
                    }

                    else -> {
                        buffer.writeUtf8CodePoint(char.code)
                        i++
                    }
                }
            }
            buffer.readUtf8().toFluoriteString()
        },
        "PERCENT" to FluoriteFunction { arguments ->
            fun usage(): Nothing = usage("PERCENT(string: STRING): STRING")
            if (arguments.size != 1) usage()
            val string = arguments[0].toFluoriteString(null).value
            val sb = StringBuilder()
            string.encodeToByteArray().forEach { byte ->
                val char = byte.toInt().toChar()
                when (char) {
                    in 'A'..'Z', in 'a'..'z', in '0'..'9' -> sb.append(char)
                    else -> sb.append("%${byte.toUByte().toString(16).uppercase().padStart(2, '0')}")
                }
            }
            sb.toString().toFluoriteString()
        },
        "PERCENTD" to FluoriteFunction { arguments ->
            fun usage(): Nothing = usage("PERCENTD(string: STRING): STRING")
            if (arguments.size != 1) usage()
            val string = arguments[0].toFluoriteString(null).value
            val buffer = Buffer()
            var i = 0
            while (i < string.length) {
                val char = string[i]
                when (char) {
                    '%' if i + 3 <= string.length -> {
                        val hex = string.substring(i + 1, i + 3)
                        buffer.writeByte(hex.toInt(16))
                        i += 3
                    }

                    else -> {
                        buffer.writeUtf8CodePoint(char.code)
                        i++
                    }
                }
            }
            buffer.readUtf8().toFluoriteString()
        },
        "JSON" to FluoriteFunction { arguments ->
            fun usage(): Nothing = usage("JSON([indent: indent: STRING; ]value: VALUE): STRING")
            val (indent, value) = when (arguments.size) {
                1 -> Pair(null, arguments[0])
                2 -> {
                    val indentParameter = arguments[0] as? FluoriteArray ?: usage()
                    if (indentParameter.values.size != 2) usage()
                    val indentKey = indentParameter.values[0] as? FluoriteString ?: usage()
                    if (indentKey.value != "indent") usage()
                    Pair(indentParameter.values[1].toFluoriteString(null).value, arguments[1])
                }

                else -> usage()
            }
            value.toSingleJsonFluoriteValue(null, indent = indent)
        },
        "JSOND" to FluoriteFunction { arguments ->
            fun usage(): Nothing = usage("JSOND(json: STRING): VALUE")
            if (arguments.size != 1) usage()
            val value = arguments[0]
            value.toFluoriteValueAsSingleJson(null)
        },
        *run {
            fun createJsonsFunction(name: String): FluoriteFunction {
                return FluoriteFunction { arguments ->
                    fun usage(): Nothing = usage("$name([indent: indent: STRING; ]values: STREAM<VALUE>): STREAM<STRING>")
                    val (indent, value) = when (arguments.size) {
                        1 -> Pair(null, arguments[0])
                        2 -> {
                            val indentParameter = arguments[0] as? FluoriteArray ?: usage()
                            if (indentParameter.values.size != 2) usage()
                            val indentKey = indentParameter.values[0] as? FluoriteString ?: usage()
                            if (indentKey.value != "indent") usage()
                            Pair(indentParameter.values[1].toFluoriteString(null).value, arguments[1])
                        }

                        else -> usage()
                    }
                    value.toJsonsFluoriteValue(null, indent = indent)
                }
            }
            arrayOf(
                "JSONS" to createJsonsFunction("JSONS"),
                "JSONL" to createJsonsFunction("JSONL"),
            )
        },
        *run {
            fun createJsonsdFunction(name: String): FluoriteFunction {
                return FluoriteFunction { arguments ->
                    fun usage(): Nothing = usage("$name(jsons: STREAM<STRING>): STREAM<VALUE>")
                    if (arguments.size != 1) usage()
                    val value = arguments[0]
                    value.toFluoriteValueAsJsons(null)
                }
            }
            arrayOf(
                "JSONSD" to createJsonsdFunction("JSONSD"),
                "JSONLD" to createJsonsdFunction("JSONLD"),
            )
        },
        "CSV" to FluoriteFunction { arguments ->
            fun usage(): Nothing = usage("""CSV(["separator": separator: STRING; ]["quote": quote: STRING; ]value: ARRAY<STRING> | STREAM<ARRAY<STRING>>): STRING | STREAM<STRING>""")
            if (arguments.isEmpty()) usage()
            val parameters = arguments.dropLast(1)
                .associate {
                    val array = it as? FluoriteArray ?: usage()
                    if (array.values.size != 2) usage()
                    val key = array.values[0] as? FluoriteString ?: usage()
                    val value = array.values[1]
                    key.value to value
                }
                .toMutableMap()
            val separator = parameters.pop("separator", {
                val string = it.toFluoriteString(null).value
                check(string.length == 1)
                string
            }) { "," } // StringでやらないとJSの謎バグでChar同士の比較が成功しない
            val quote = parameters.pop("quote", {
                val string = it.toFluoriteString(null).value
                check(string.length == 1)
                string
            }) { "\"" } // StringでやらないとJSの謎バグでChar同士の比較が成功しない
            if (parameters.isNotEmpty()) usage()
            val value = arguments.last()

            suspend fun toCsv(value: FluoriteValue): FluoriteString {
                val sb = StringBuilder()
                (value as FluoriteArray).values.forEachIndexed { index, value2 ->
                    if (index > 0) sb.append(separator)
                    val string = value2.toFluoriteString(null).value
                    if (string.isEmpty()) return@forEachIndexed
                    val needQuote = run {
                        val first = string.first()
                        if (first == ' ') return@run true
                        if (first == '\t') return@run true
                        val last = string.last()
                        if (last == ' ') return@run true
                        if (last == '\t') return@run true
                        if (separator in string) return@run true
                        if (quote in string) return@run true
                        if ('\r' in string) return@run true
                        if ('\n' in string) return@run true
                        false
                    }
                    if (needQuote) {
                        sb.append(quote)
                        sb.append(string.replace(quote, "$quote$quote"))
                        sb.append(quote)
                    } else {
                        sb.append(string)
                    }
                }
                return sb.toString().toFluoriteString()
            }

            if (value is FluoriteStream) {
                FluoriteStream {
                    value.collect {
                        emit(toCsv(it))
                    }
                }
            } else {
                toCsv(value)
            }
        },
        "CSVD" to FluoriteFunction { arguments ->
            fun usage(): Nothing = usage("""CSVD(["separator": separator: STRING; ]["quote": quote: STRING; ]csv: STRING | STREAM<STRING>): ARRAY<STRING> | STREAM<ARRAY<STRING>>""")
            if (arguments.isEmpty()) usage()
            val parameters = arguments.dropLast(1)
                .associate {
                    val array = it as? FluoriteArray ?: usage()
                    if (array.values.size != 2) usage()
                    val key = array.values[0] as? FluoriteString ?: usage()
                    val value = array.values[1]
                    key.value to value
                }
                .toMutableMap()
            val separator = parameters.pop("separator", {
                val string = it.toFluoriteString(null).value
                check(string.length == 1)
                string
            }) { "," } // StringでやらないとJSの謎バグでChar同士の比較が成功しない
            val quote = parameters.pop("quote", {
                val string = it.toFluoriteString(null).value
                check(string.length == 1)
                string
            }) { "\"" } // StringでやらないとJSの謎バグでChar同士の比較が成功しない
            if (parameters.isNotEmpty()) usage()
            val value = arguments.last()

            suspend fun fromCsv(csv: FluoriteValue): FluoriteArray {
                val list = mutableListOf<FluoriteValue>()
                val sb = StringBuilder()
                val quoted = mutableListOf<Boolean>()

                val STATE_NOT_QUOTED = 0
                val STATE_QUOTED = 1
                val STATE_AFTER_QUOTED = 2
                var state = STATE_NOT_QUOTED

                fun flush() {
                    var head = 0
                    while (true) {
                        if (head >= sb.length) break
                        if (quoted[head]) break
                        if (sb[head] != ' ' && sb[head] != '\t') break
                        head++
                    }

                    var tail = sb.length - 1
                    while (true) {
                        if (tail + 1 <= head) break
                        if (quoted[tail]) break
                        if (sb[tail] != ' ' && sb[tail] != '\t') break
                        tail--
                    }

                    list += sb.substring(head, tail + 1).toFluoriteString()
                    sb.clear()
                    quoted.clear()
                }

                csv.toFluoriteString(null).value.forEach { ch2 ->
                    val ch = ch2.toString()
                    if (state == STATE_NOT_QUOTED) {
                        if (ch == quote) {
                            state = STATE_QUOTED
                        } else if (ch == separator) {
                            flush()
                        } else {
                            sb.append(ch)
                            quoted += false
                        }
                    } else if (state == STATE_QUOTED) {
                        if (ch == quote) {
                            state = STATE_AFTER_QUOTED
                        } else {
                            sb.append(ch)
                            quoted += true
                        }
                    } else if (state == STATE_AFTER_QUOTED) {
                        if (ch == quote) {
                            sb.append(ch)
                            quoted += false
                            state = STATE_QUOTED
                        } else if (ch == separator) {
                            flush()
                            state = STATE_NOT_QUOTED
                        } else {
                            sb.append(ch)
                            quoted += false
                            state = STATE_NOT_QUOTED
                        }
                    } else {
                        throw AssertionError()
                    }
                }
                flush()

                return list.asFluoriteArray()
            }

            if (value is FluoriteStream) {
                FluoriteStream {
                    value.collect {
                        emit(fromCsv(it))
                    }
                }
            } else {
                fromCsv(value)
            }
        },
    ).let { listOf(it) }
}
