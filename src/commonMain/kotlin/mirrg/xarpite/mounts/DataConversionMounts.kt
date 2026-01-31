package mirrg.xarpite.mounts

import mirrg.xarpite.Mount
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
import mirrg.xarpite.define
import mirrg.xarpite.operations.FluoriteException
import mirrg.xarpite.partitionIfEntry
import mirrg.xarpite.pop
import mirrg.xarpite.toFluoriteValueAsJsons
import mirrg.xarpite.toFluoriteValueAsSingleJson
import mirrg.xarpite.toJsonsFluoriteValue
import mirrg.xarpite.toSingleJsonFluoriteValue
import okio.Buffer
import kotlin.io.encoding.Base64

context(context: RuntimeContext)
fun createDataConversionMounts(): List<Map<String, Mount>> {
    return mapOf(
        "BASE" define FluoriteFunction { arguments ->
            fun usage(): Nothing = usage("BASE(radix: NUMBER; number: NUMBER): STRING")
            if (arguments.size != 2) usage()
            val radix = arguments[0].toFluoriteNumber(null).roundToInt()
            if (radix !in 2..36) throw FluoriteException("Radix must be between 2 and 36, got $radix".toFluoriteString())
            val number = arguments[1].toFluoriteNumber(null).roundToInt()
            number.toString(radix).uppercase().toFluoriteString()
        },
        "BASED" define FluoriteFunction { arguments ->
            fun usage(): Nothing = usage("BASED(radix: NUMBER; string: STRING): NUMBER")
            if (arguments.size != 2) usage()
            val radix = arguments[0].toFluoriteNumber(null).roundToInt()
            if (radix !in 2..36) throw FluoriteException("Radix must be between 2 and 36, got $radix".toFluoriteString())
            val string = arguments[1].toFluoriteString(null).value
            FluoriteInt(string.toInt(radix))
        },
        "UTF8" define FluoriteFunction { arguments ->
            fun usage(): Nothing = usage("UTF8(string: STRING): BLOB")
            if (arguments.size != 1) usage()
            val string = arguments[0].toFluoriteString(null).value
            string.encodeToByteArray().asFluoriteBlob()
        },
        "UTF8D" define FluoriteFunction { arguments ->
            fun usage(): Nothing = usage("UTF8D(blobLike: BLOB_LIKE): STRING")
            if (arguments.size != 1) usage()
            val value = arguments[0]
            value.toByteArrayAsBlobLike().decodeToString().toFluoriteString()
        },
        *run {
            val base64 by lazy { Base64.Mime }
            arrayOf(
                "BASE64" define FluoriteFunction { arguments ->
                    fun usage(): Nothing = usage("BASE64(string: STRING): STRING")
                    if (arguments.size != 1) usage()
                    val string = arguments[0].toFluoriteString(null).value
                    base64.encode(string.encodeToByteArray()).replace("\r\n", "\n").toFluoriteString()
                },
                "BASE64D" define FluoriteFunction { arguments ->
                    fun usage(): Nothing = usage("BASE64D(string: STRING): STRING")
                    if (arguments.size != 1) usage()
                    val string = arguments[0].toFluoriteString(null).value
                    base64.decode(string).decodeToString().toFluoriteString()
                },
            )
        },
        "URL" define FluoriteFunction { arguments ->
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
        "URLD" define FluoriteFunction { arguments ->
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
        "PERCENT" define FluoriteFunction { arguments ->
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
        "PERCENTD" define FluoriteFunction { arguments ->
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
        "JSON" define FluoriteFunction { arguments ->
            fun usage(): Nothing = usage("JSON([indent: [indent: ]STRING | NUMBER; ]value: VALUE): STRING")
            val arguments2 = arguments.toMutableList()

            if (arguments2.isEmpty()) usage()
            val value = arguments2.removeLast()

            val (entries, arguments3) = arguments2.partitionIfEntry()

            suspend fun parseIndent(rawIndent: FluoriteValue?): String? {
                val indentString = rawIndent?.toFluoriteString(null)?.value ?: return null
                val indentNumber = indentString.toIntOrNull()
                if (indentNumber != null) {
                    if (indentNumber <= 0) throw FluoriteException("Indent must be positive".toFluoriteString())
                    return " ".repeat(indentNumber)
                }
                return indentString
            }

            var indent = parseIndent(entries.remove("indent") ?: arguments3.removeFirstOrNull())

            if (entries.isNotEmpty()) usage()
            if (arguments3.isNotEmpty()) usage()

            val (indent2, value2) = if (arguments2.isEmpty() && value is FluoriteStream) {
                val list = mutableListOf<FluoriteValue>()
                value.collect { list += it }
                if (list.isEmpty()) usage()
                val indentCandidate = if (indent == null && list.size >= 2) parseIndent(list.first()) else null
                val rest = if (indentCandidate != null) list.drop(1) else list
                if (rest.size != 1) usage()
                indentCandidate to rest.single()
            } else {
                null to value
            }
            val indent3 = indent2 ?: indent

            value2.toSingleJsonFluoriteValue(null, indent = indent3)
        },
        "JSOND" define FluoriteFunction { arguments ->
            fun usage(): Nothing = usage("JSOND(json: STRING): VALUE")
            if (arguments.size != 1) usage()
            val value = arguments[0]
            value.toFluoriteValueAsSingleJson(null)
        },
        "JSONS" define FluoriteFunction { arguments ->
            fun usage(): Nothing = usage("JSONS([indent: [indent: ]STRING | NUMBER; ]values: STREAM<VALUE>): STREAM<STRING>")
            val arguments2 = arguments.toMutableList()

            if (arguments2.isEmpty()) usage()
            val values = arguments2.removeLast()

            val (entries, arguments3) = arguments2.partitionIfEntry()

            suspend fun parseIndent(rawIndent: FluoriteValue?): String? {
                val indentString = rawIndent?.toFluoriteString(null)?.value ?: return null
                val indentNumber = indentString.toIntOrNull()
                if (indentNumber != null) {
                    if (indentNumber <= 0) throw FluoriteException("Indent must be positive".toFluoriteString())
                    return " ".repeat(indentNumber)
                }
                return indentString
            }

            var indent = parseIndent(entries.remove("indent") ?: arguments3.removeFirstOrNull())

            if (entries.isNotEmpty()) usage()
            if (arguments3.isNotEmpty()) usage()

            val (indent2, values2) = if (arguments2.isEmpty() && values is FluoriteStream) {
                val list = mutableListOf<FluoriteValue>()
                values.collect { list += it }
                if (list.isEmpty()) usage()
                val indentCandidate = if (indent == null && list.size >= 2) parseIndent(list.first()) else null
                val rest = if (indentCandidate != null) list.drop(1) else list
                if (rest.isEmpty()) usage()
                val stream = if (rest.size == 1) rest.single() else FluoriteStream {
                    rest.forEach { emit(it) }
                }
                indentCandidate to stream
            } else {
                null to values
            }
            val indent3 = indent2 ?: indent

            values2.toJsonsFluoriteValue(null, indent = indent3)
        },
        "JSONSD" define FluoriteFunction { arguments ->
            fun usage(): Nothing = usage("JSONSD(jsons: STREAM<STRING>): STREAM<VALUE>")
            if (arguments.size != 1) usage()
            val value = arguments[0]
            value.toFluoriteValueAsJsons(null)
        },
        "CSV" define FluoriteFunction { arguments ->
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
        "CSVD" define FluoriteFunction { arguments ->
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
