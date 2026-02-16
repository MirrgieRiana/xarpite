package mirrg.xarpite.mounts

import kotlinx.coroutines.flow.firstOrNull
import kotlinx.coroutines.flow.flow
import kotlinx.coroutines.flow.produceIn
import kotlinx.coroutines.plus
import mirrg.xarpite.IterationAborted
import mirrg.xarpite.Mount
import mirrg.xarpite.RuntimeContext
import mirrg.xarpite.StackTrace
import mirrg.xarpite.compilers.objects.FluoriteArray
import mirrg.xarpite.compilers.objects.FluoriteBoolean
import mirrg.xarpite.compilers.objects.FluoriteDouble
import mirrg.xarpite.compilers.objects.FluoriteFunction
import mirrg.xarpite.compilers.objects.FluoriteInt
import mirrg.xarpite.compilers.objects.FluoriteNull
import mirrg.xarpite.compilers.objects.FluoriteNumber
import mirrg.xarpite.compilers.objects.FluoriteObject
import mirrg.xarpite.compilers.objects.FluoriteStream
import mirrg.xarpite.compilers.objects.FluoriteString
import mirrg.xarpite.compilers.objects.FluoriteValue
import mirrg.xarpite.compilers.objects.asFluoriteArray
import mirrg.xarpite.compilers.objects.cache
import mirrg.xarpite.compilers.objects.collect
import mirrg.xarpite.compilers.objects.colon
import mirrg.xarpite.compilers.objects.compareTo
import mirrg.xarpite.compilers.objects.consume
import mirrg.xarpite.compilers.objects.invoke
import mirrg.xarpite.compilers.objects.toBoolean
import mirrg.xarpite.compilers.objects.toFlow
import mirrg.xarpite.compilers.objects.toFluoriteArray
import mirrg.xarpite.compilers.objects.toFluoriteNumber
import mirrg.xarpite.compilers.objects.toFluoriteStream
import mirrg.xarpite.compilers.objects.toFluoriteString
import mirrg.xarpite.compilers.objects.toMutableList
import mirrg.xarpite.copy
import mirrg.xarpite.define
import mirrg.xarpite.operations.FluoriteException
import mirrg.xarpite.partitionIfEntry
import kotlin.coroutines.EmptyCoroutineContext
import kotlin.coroutines.coroutineContext

context(context: RuntimeContext)
fun createStreamMounts(): List<Map<String, Mount>> {
    return mapOf(
        "GENERATE" define FluoriteFunction { arguments ->
            if (arguments.size != 1) usage("<T> GENERATE(generator: (yield: (item: STREAM<T>) -> NULL) -> NULL): STREAM<T>")
            val generator = arguments[0]
            FluoriteStream {
                val yieldFunction = FluoriteFunction { arguments2 ->
                    if (arguments2.size != 1) usage("yield: (item: STREAM<T>) -> NULL")
                    val value = arguments2[0]
                    if (value is FluoriteStream) {
                        value.collect { item ->
                            emit(item)
                        }
                    } else {
                        emit(value)
                    }
                    FluoriteNull
                }
                generator.invoke(null, arrayOf(yieldFunction)).consume()
            }
        },
        "REVERSE" define FluoriteFunction { arguments ->
            if (arguments.size == 1) {
                val stream = arguments[0]
                if (stream is FluoriteStream) {
                    val list = stream.toMutableList()
                    list.reverse()
                    list.toFluoriteStream()
                } else {
                    stream
                }
            } else {
                usage("REVERSE(stream: STREAM<VALUE>): STREAM<VALUE>")
            }
        },
        "SHUFFLE" define FluoriteFunction { arguments ->
            if (arguments.size == 1) {
                val stream = arguments[0]
                if (stream is FluoriteStream) {
                    val list = stream.toMutableList()
                    list.shuffle()
                    list.toFluoriteStream()
                } else {
                    stream
                }
            } else {
                usage("<T> SHUFFLE(stream: T,): T,")
            }
        },
        *run {
            fun create(name: String): FluoriteFunction {
                return FluoriteFunction { arguments ->
                    run { // DISTINCT(stream: STREAM<VALUE>): STREAM<VALUE>
                        if (arguments.size != 1) return@run
                        val stream = arguments[0]

                        return@FluoriteFunction if (stream is FluoriteStream) {
                            FluoriteStream {
                                val set = mutableSetOf<FluoriteValue>()
                                stream.collect { item ->
                                    if (set.add(item)) emit(item)
                                }
                            }
                        } else {
                            stream
                        }
                    }
                    run { // DISTINCT(by: keyGetter: VALUE -> VALUE; stream: STREAM<VALUE>): STREAM<VALUE>
                        if (arguments.size != 2) return@run
                        val entry = arguments[0]
                        if (entry !is FluoriteArray) return@run
                        if (entry.values.size != 2) return@run
                        val parameterName = entry.values[0]
                        if (parameterName !is FluoriteString) return@run
                        if (parameterName.value != "by") return@run
                        val keyGetter = entry.values[1]
                        val stream = arguments[1]

                        return@FluoriteFunction if (stream is FluoriteStream) {
                            FluoriteStream {
                                val set = mutableSetOf<FluoriteValue>()
                                stream.collect { item ->
                                    val key = keyGetter.invoke(null, arrayOf(item))
                                    if (set.add(key)) emit(item)
                                }
                            }
                        } else {
                            stream
                        }
                    }
                    usage(
                        "$name(stream: STREAM<VALUE>): STREAM<VALUE>",
                        "$name(by: keyGetter: VALUE -> VALUE; stream: STREAM<VALUE>): STREAM<VALUE>",
                    )
                }
            }
            arrayOf(
                "DISTINCT" define create("DISTINCT"),
                "UNIQ" define create("UNIQ"),
            )
        },
        "JOIN" define FluoriteFunction { arguments ->
            val separator: String
            val stream: FluoriteValue
            when (arguments.size) {
                2 -> {
                    separator = arguments[0].toFluoriteString(null).value
                    stream = arguments[1]
                }

                1 -> {
                    separator = ","
                    stream = arguments[0]
                }

                else -> usage("JOIN([separator: STRING; ]stream: STREAM<STRING>): STRING")
            }

            if (stream is FluoriteStream) {
                val sb = StringBuilder()
                var isFirst = true
                stream.collect { value ->
                    if (isFirst) {
                        isFirst = false
                    } else {
                        sb.append(separator)
                    }
                    sb.append(value.toFluoriteString(null).value)
                }
                sb.toString().toFluoriteString()
            } else {
                stream.toFluoriteString(null)
            }
        },
        "INTERCALATE" define FluoriteFunction { arguments ->
            val separator: String
            val stream: FluoriteValue
            when (arguments.size) {
                2 -> {
                    separator = arguments[0].toFluoriteString(null).value
                    stream = arguments[1]
                }

                1 -> {
                    separator = ","
                    stream = arguments[0]
                }

                else -> usage("<T> INTERCALATE([separator: STRING; ]stream: STREAM<T>): STRING")
            }

            if (stream is FluoriteStream) {
                val sb = StringBuilder()
                var isFirst = true
                stream.collect { value ->
                    if (isFirst) {
                        isFirst = false
                    } else {
                        sb.append(separator)
                    }
                    sb.append(value.toFluoriteString(null).value)
                }
                sb.toString().toFluoriteString()
            } else {
                stream.toFluoriteString(null)
            }
        },
        "SPLIT" define FluoriteFunction { arguments ->
            fun usage(): Nothing = usage("SPLIT([separator: [by: ]STRING; ][limit: [limit: ]INT; ]string: STRING): STREAM<STRING>")
            val arguments2 = arguments.toMutableList()

            if (arguments2.isEmpty()) usage()
            val string = arguments2.removeLast().toFluoriteString(null).value

            val (entries, arguments3) = arguments2.partitionIfEntry()

            val separator = (entries.remove("by") ?: arguments3.removeFirstOrNull())?.toFluoriteString(null)?.value ?: ","
            val limit = (entries.remove("limit") ?: arguments3.removeFirstOrNull())?.toFluoriteNumber(null)?.roundToInt()

            if (entries.isNotEmpty()) usage()
            if (arguments3.isNotEmpty()) usage()

            if (limit != null && limit <= 0) throw FluoriteException("Limit must be positive or NULL".toFluoriteString())
            if (limit == 1) return@FluoriteFunction string.toFluoriteString()

            val strings = if (separator.isEmpty()) {
                if (limit == null || limit >= string.length) {
                    string.map { "$it" }
                } else {
                    listOf(
                        *string.substring(0, limit - 1).map { "$it" }.toTypedArray(),
                        string.substring(limit - 1),
                    )
                }
            } else {
                string.split(separator, limit = limit ?: 0)
            }

            strings.map { it.toFluoriteString() }.toFluoriteStream()
        },
        "LINES" define FluoriteFunction { arguments ->
            if (arguments.size == 1) {
                val string = arguments[0].toFluoriteString(null).value
                if (string.isEmpty()) return@FluoriteFunction FluoriteStream.EMPTY
                val lines = string.split(Regex("""\r\n|\n|\r""")).toMutableList()
                if (string.endsWith('\n') || string.endsWith('\r')) lines.removeLast()
                lines.map { it.toFluoriteString() }.toFluoriteStream()
            } else {
                usage("LINES(string: STRING): STREAM<STRING>")
            }
        },
        "KEYS" define FluoriteFunction { arguments ->
            fun usage(): Nothing = usage("KEYS(object: OBJECT | STREAM<OBJECT>): STREAM<STRING>")
            if (arguments.size == 1) {
                val obj = arguments[0]
                if (obj is FluoriteStream) {
                    FluoriteStream {
                        obj.collect { item ->
                            if (item is FluoriteObject) {
                                item.map.keys.forEach {
                                    emit(it.toFluoriteString())
                                }
                            } else {
                                usage()
                            }
                        }
                    }
                } else {
                    if (obj is FluoriteObject) {
                        obj.map.keys.map { it.toFluoriteString() }.toFluoriteStream()
                    } else {
                        usage()
                    }
                }
            } else {
                usage()
            }
        },
        "VALUES" define FluoriteFunction { arguments ->
            if (arguments.size == 1) {
                val obj = arguments[0]
                if (obj is FluoriteObject) {
                    obj.map.values.toFluoriteStream()
                } else {
                    usage("VALUES(object: OBJECT): STREAM<VALUE>")
                }
            } else {
                usage("VALUES(object: OBJECT): STREAM<VALUE>")
            }
        },
        "INVERT" define FluoriteFunction { arguments ->
            if (arguments.size == 1) {
                val obj = arguments[0]
                if (obj is FluoriteObject) {
                    val map = mutableMapOf<String, FluoriteValue>()
                    obj.map.forEach { (key, value) ->
                        map[value.toFluoriteString(null).value] = key.toFluoriteString()
                    }
                    FluoriteObject(FluoriteObject.fluoriteClass, map)
                } else {
                    usage("INVERT(object: OBJECT<VALUE>): OBJECT<STRING>")
                }
            } else {
                usage("INVERT(object: OBJECT<VALUE>): OBJECT<STRING>")
            }
        },
        "SUM" define FluoriteFunction { arguments ->
            if (arguments.size == 1) {
                val stream = arguments[0]
                if (stream is FluoriteStream) {
                    var sum = 0.0
                    stream.collect { value ->
                        sum += (value as FluoriteNumber).toDouble()
                    }
                    if (sum.toInt().toDouble() == sum) {
                        FluoriteInt(sum.toInt())
                    } else {
                        FluoriteDouble(sum)
                    }
                } else {
                    stream
                }
            } else {
                usage("SUM(numbers: STREAM<NUMBER>): NUMBER")
            }
        },
        "MIN" define FluoriteFunction { arguments ->
            if (arguments.size == 1) {
                val stream = arguments[0]
                if (stream is FluoriteStream) {
                    var result: FluoriteValue? = null
                    stream.collect { item ->
                        val result2 = result
                        if (result2 == null || item.compareTo(null, result2).value < 0) {
                            result = item
                        }
                    }
                    result ?: FluoriteNull
                } else {
                    stream
                }
            } else {
                usage("MIN(numbers: STREAM<NUMBER>): NUMBER")
            }
        },
        "MAX" define FluoriteFunction { arguments ->
            if (arguments.size == 1) {
                val stream = arguments[0]
                if (stream is FluoriteStream) {
                    var result: FluoriteValue? = null
                    stream.collect { item ->
                        val result2 = result
                        if (result2 == null || item.compareTo(null, result2).value > 0) {
                            result = item
                        }
                    }
                    result ?: FluoriteNull
                } else {
                    stream
                }
            } else {
                usage("MAX(numbers: STREAM<NUMBER>): NUMBER")
            }
        },
        "COUNT" define FluoriteFunction { arguments ->
            if (arguments.size == 1) {
                val stream = arguments[0]
                if (stream is FluoriteStream) {
                    var count = 0
                    stream.collect {
                        count++
                    }
                    FluoriteInt(count)
                } else {
                    FluoriteInt(1)
                }
            } else {
                usage("COUNT(stream: STREAM<VALUE>): INT")
            }
        },
        *run {
            fun create(name: String): FluoriteFunction {
                return FluoriteFunction { arguments ->
                    if (arguments.size !in 1..2) usage("<T> $name(boolean1: STREAM<T>[; boolean2: STREAM<T>]): T | BOOLEAN")
                    arguments.forEach { stream ->
                        if (stream is FluoriteStream) {
                            val result = flow {
                                stream.collect { item ->
                                    if (!item.toBoolean(null)) emit(item)
                                }
                            }.firstOrNull()
                            if (result != null) return@FluoriteFunction result
                        } else {
                            if (!stream.toBoolean(null)) return@FluoriteFunction stream
                        }
                    }
                    FluoriteBoolean.TRUE
                }
            }
            arrayOf(
                "AND" define create("AND"),
                "ALL" define create("ALL"),
            )
        },
        *run {
            fun create(name: String): FluoriteFunction {
                return FluoriteFunction { arguments ->
                    if (arguments.size !in 1..2) usage("<T> $name(boolean1: STREAM<T>[; boolean2: STREAM<T>]): T | BOOLEAN")
                    arguments.forEach { stream ->
                        if (stream is FluoriteStream) {
                            val result = flow {
                                stream.collect { item ->
                                    if (item.toBoolean(null)) emit(item)
                                }
                            }.firstOrNull()
                            if (result != null) return@FluoriteFunction result
                        } else {
                            if (stream.toBoolean(null)) return@FluoriteFunction stream
                        }
                    }
                    FluoriteBoolean.FALSE
                }
            }
            arrayOf(
                "OR" define create("OR"),
                "ANY" define create("ANY"),
            )
        },
        "FIRST" define FluoriteFunction { arguments ->
            if (arguments.size == 1) {
                val value = arguments[0]
                if (value is FluoriteStream) {
                    var result: FluoriteValue? = null
                    try {
                        value.collect { item ->
                            result = item
                            throw IterationAborted
                        }
                    } catch (_: IterationAborted) {

                    }
                    result ?: FluoriteNull
                } else {
                    value
                }
            } else {
                usage("FIRST(stream: STREAM<VALUE>): VALUE")
            }
        },
        "LAST" define FluoriteFunction { arguments ->
            if (arguments.size == 1) {
                val value = arguments[0]
                if (value is FluoriteStream) {
                    var result: FluoriteValue? = null
                    value.collect { item ->
                        result = item
                    }
                    result ?: FluoriteNull
                } else {
                    value
                }
            } else {
                usage("LAST(stream: STREAM<VALUE>): VALUE")
            }
        },
        "SINGLE" define FluoriteFunction { arguments ->
            if (arguments.size == 1) {
                val value = arguments[0]
                if (value is FluoriteStream) {
                    var result: FluoriteValue? = null
                    value.collect { item ->
                        if (result != null) throw FluoriteException("Stream has multiple elements".toFluoriteString())
                        result = item
                    }
                    if (result == null) throw FluoriteException("Stream is empty".toFluoriteString())
                    result
                } else {
                    value
                }
            } else {
                usage("SINGLE(stream: STREAM<VALUE>): VALUE")
            }
        },
        "REDUCE" define FluoriteFunction { arguments ->
            if (arguments.size == 2) {
                val function = arguments[0]
                val stream = arguments[1]
                if (stream is FluoriteStream) {
                    var result: FluoriteValue? = null
                    stream.collect { item ->
                        val result2 = result
                        result = (if (result2 == null) item else function.invoke(null, arrayOf(result2, item)))
                    }
                    result ?: FluoriteNull
                } else {
                    stream
                }
            } else {
                usage("REDUCE(function: VALUE, VALUE -> VALUE; stream: STREAM<VALUE>): VALUE")
            }
        },
        *run {
            fun create(name: String, isDescending: Boolean): FluoriteFunction {
                return FluoriteFunction { arguments ->
                    run { // SORT(stream: STREAM<VALUE>): STREAM<VALUE>
                        if (arguments.size != 1) return@run
                        val stream = arguments[0]

                        return@FluoriteFunction if (stream is FluoriteStream) {
                            stream.toMutableList().mergeSort(isDescending) { a, b -> a.compareTo(null, b).value }.toFluoriteStream()
                        } else {
                            stream
                        }
                    }
                    run { // SORT(by: key_getter: VALUE -> VALUE; stream: STREAM<VALUE>): STREAM<VALUE>
                        if (arguments.size != 2) return@run
                        val entry = arguments[0]
                        if (entry !is FluoriteArray) return@run
                        if (entry.values.size != 2) return@run
                        val parameterName = entry.values[0]
                        if (parameterName !is FluoriteString) return@run
                        if (parameterName.value != "by") return@run
                        val keyGetter = entry.values[1]
                        val stream = arguments[1]

                        return@FluoriteFunction if (stream is FluoriteStream) {
                            stream.toMutableList().mergeSort(isDescending) { a, b -> keyGetter.invoke(null, arrayOf(a)).compareTo(null, keyGetter.invoke(null, arrayOf(b))).value }.toFluoriteStream()
                        } else {
                            stream
                        }
                    }
                    run { // SORT(comparator: VALUE, VALUE -> INT; stream: STREAM<VALUE>): STREAM<VALUE>
                        if (arguments.size != 2) return@run
                        val comparator = arguments[0]
                        val stream = arguments[1]

                        return@FluoriteFunction if (stream is FluoriteStream) {
                            stream.toMutableList().mergeSort(isDescending) { a, b -> (comparator.invoke(null, arrayOf(a, b)) as FluoriteInt).value }.toFluoriteStream()
                        } else {
                            stream
                        }
                    }
                    usage(
                        "$name(stream: STREAM<VALUE>): STREAM<VALUE>",
                        "$name(comparator: VALUE, VALUE -> INT; stream: STREAM<VALUE>): STREAM<VALUE>",
                        "$name(by: key_getter: VALUE -> VALUE; stream: STREAM<VALUE>): STREAM<VALUE>",
                    )
                }
            }
            arrayOf(
                "SORT" define create("SORT", false),
                "SORTR" define create("SORTR", true),
            )
        },
        "CHUNK" define FluoriteFunction { arguments ->
            if (arguments.size == 2) {
                val size = arguments[0].toFluoriteNumber(null).toInt()
                require(size > 0)
                val stream = arguments[1]
                FluoriteStream {
                    var buffer = mutableListOf<FluoriteValue>()
                    if (stream is FluoriteStream) {
                        stream.collect { item ->
                            buffer += item
                            if (buffer.size == size) {
                                emit(buffer.asFluoriteArray())
                                buffer = mutableListOf()
                            }
                        }
                    } else {
                        buffer += stream
                    }
                    if (buffer.isNotEmpty()) emit(buffer.asFluoriteArray())
                }
            } else {
                usage("CHUNK(size: NUMBER; stream: STREAM<VALUE>): STREAM<ARRAY<VALUE>>")
            }
        },
        "TAKE" define FluoriteFunction { arguments ->
            if (arguments.size == 2) {
                val count = arguments[0].toFluoriteNumber(null).roundToInt()
                require(count >= 0)
                val stream = arguments[1]
                FluoriteStream {
                    if (count <= 0) return@FluoriteStream
                    var remaining = count
                    try {
                        stream.toFlow().collect { item ->
                            emit(item)
                            remaining--
                            if (remaining <= 0) throw IterationAborted
                        }
                    } catch (_: IterationAborted) {

                    }
                }
            } else {
                usage("TAKE(count: INT; stream: STREAM<VALUE>): STREAM<VALUE>")
            }
        },
        "TAKER" define FluoriteFunction { arguments ->
            if (arguments.size == 2) {
                val count = arguments[0].toFluoriteNumber(null).roundToInt()
                require(count >= 0)
                val stream = arguments[1]
                FluoriteStream {
                    val deque = ArrayDeque<FluoriteValue>()
                    stream.toFlow().collect { item -> // count == 0 の場合でもイテレーション自体はする
                        deque += item
                        if (deque.size > count) deque.removeFirst()
                    }
                    deque.forEach { item ->
                        emit(item)
                    }
                }
            } else {
                usage("TAKER(count: INT; stream: STREAM<VALUE>): STREAM<VALUE>")
            }
        },
        "DROP" define FluoriteFunction { arguments ->
            if (arguments.size == 2) {
                val count = arguments[0].toFluoriteNumber(null).roundToInt()
                require(count >= 0)
                val stream = arguments[1]
                FluoriteStream {
                    var remaining = count
                    stream.toFlow().collect { item ->
                        if (remaining > 0) {
                            remaining--
                        } else {
                            emit(item)
                        }
                    }
                }
            } else {
                usage("DROP(count: INT; stream: STREAM<VALUE>): STREAM<VALUE>")
            }
        },
        "DROPR" define FluoriteFunction { arguments ->
            if (arguments.size == 2) {
                val count = arguments[0].toFluoriteNumber(null).roundToInt()
                require(count >= 0)
                val stream = arguments[1]
                FluoriteStream {
                    val deque = ArrayDeque<FluoriteValue>()
                    stream.toFlow().collect { item ->
                        deque += item
                        if (deque.size > count) {
                            emit(deque.removeFirst())
                        }
                    }
                }
            } else {
                usage("DROPR(count: INT; stream: STREAM<VALUE>): STREAM<VALUE>")
            }
        },
        *run {
            fun create(name: String): FluoriteFunction {
                return FluoriteFunction { arguments ->
                    fun usage(): Nothing = usage("$name(predicate: [by: ]VALUE -> BOOLEAN; stream: STREAM<VALUE>): STREAM<VALUE>")
                    val arguments2 = arguments.toMutableList()

                    if (arguments2.isEmpty()) usage()
                    val stream = arguments2.removeLast()

                    val (entries, arguments3) = arguments2.partitionIfEntry()

                    val predicate = (entries.remove("by") ?: arguments3.removeFirstOrNull()) ?: usage()

                    if (entries.isNotEmpty()) usage()
                    if (arguments3.isNotEmpty()) usage()

                    FluoriteStream {
                        if (stream is FluoriteStream) {
                            stream.collect { item ->
                                if (predicate.invoke(null, arrayOf(item)).toBoolean(null)) {
                                    emit(item)
                                }
                            }
                        } else {
                            if (predicate.invoke(null, arrayOf(stream)).toBoolean(null)) {
                                emit(stream)
                            }
                        }
                    }
                }
            }
            arrayOf(
                "FILTER" define create("FILTER"),
                "GREP" define create("GREP"),
            )
        },
        "INDEXED" define FluoriteFunction { arguments ->
            fun usage(): Nothing = usage("<T> INDEXED(stream: STREAM<T>): STREAM<[INT; T]>")
            val arguments2 = arguments.toMutableList()

            val stream = arguments2.removeFirstOrNull() ?: usage()

            val (entries, arguments3) = arguments2.partitionIfEntry()

            if (entries.isNotEmpty()) usage()
            if (arguments3.isNotEmpty()) usage()

            FluoriteStream {
                var index = 0
                if (stream is FluoriteStream) {
                    stream.collect { item ->
                        emit(FluoriteInt(index) colon item)
                        index++
                    }
                } else {
                    emit(FluoriteInt(0) colon stream)
                }
            }
        },
        "GROUP" define FluoriteFunction { arguments ->
            fun usage(): Nothing = usage("<T, K> GROUP([keyGetter: [by: ]T -> K; ]stream: STREAM<T>): STREAM<[K; ARRAY<T>]>")
            val arguments2 = arguments.toMutableList()

            if (arguments2.isEmpty()) usage()
            val stream = arguments2.removeLast()

            val (entries, arguments3) = arguments2.partitionIfEntry()

            val keyGetter = entries.remove("by") ?: arguments3.removeFirstOrNull()

            if (entries.isNotEmpty()) usage()
            if (arguments3.isNotEmpty()) usage()

            FluoriteStream {
                val groups = mutableMapOf<FluoriteValue, MutableList<FluoriteValue>>()

                suspend fun add(value: FluoriteValue) {
                    val key = keyGetter?.invoke(null, arrayOf(value)) ?: value
                    val list = groups.getOrPut(key) { mutableListOf() }
                    list += value
                }

                if (stream is FluoriteStream) {
                    stream.collect { item ->
                        add(item)
                    }
                } else {
                    add(stream)
                }

                groups.forEach { (key, list) ->
                    emit(key colon list.toFluoriteArray())
                }
            }
        },
        "PIPE" define FluoriteFunction { arguments ->
            if (arguments.size == 1) {
                val stream = arguments[0]

                val stackTrace = coroutineContext[StackTrace.Key]?.copy() ?: EmptyCoroutineContext
                val channel by lazy { stream.toFlow().produceIn(context.daemonScope + stackTrace) }

                FluoriteStream {
                    for (item in channel) {
                        emit(item)
                    }
                }
            } else {
                usage("<T> PIPE(stream: STREAM<T>): STREAM<T>")
            }
        },
        "CACHE" define FluoriteFunction { arguments ->
            if (arguments.size == 1) {
                val stream = arguments[0]
                stream.cache()
            } else {
                usage("<T> CACHE(stream: STREAM<T>): STREAM<T>")
            }
        },
        "VOID" define FluoriteFunction { arguments ->
            if (arguments.size == 1) {
                val stream = arguments[0]
                stream.consume()
                FluoriteNull
            } else {
                usage("VOID(stream: STREAM): NULL")
            }
        },
    ).let { listOf(it) }
}
