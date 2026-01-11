package mirrg.xarpite.mounts

import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.flow.flow
import kotlinx.coroutines.flow.produceIn
import mirrg.xarpite.IterationAborted
import mirrg.xarpite.compilers.objects.FluoriteArray
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
import mirrg.xarpite.compilers.objects.collect
import mirrg.xarpite.compilers.objects.colon
import mirrg.xarpite.compilers.objects.compareTo
import mirrg.xarpite.compilers.objects.consume
import mirrg.xarpite.compilers.objects.invoke
import mirrg.xarpite.compilers.objects.toBoolean
import mirrg.xarpite.compilers.objects.toFluoriteArray
import mirrg.xarpite.compilers.objects.toFluoriteNumber
import mirrg.xarpite.compilers.objects.toFluoriteStream
import mirrg.xarpite.compilers.objects.toFluoriteString
import mirrg.xarpite.compilers.objects.toMutableList
import mirrg.xarpite.compilers.objects.cache
import mirrg.xarpite.compilers.objects.consume
import mirrg.xarpite.operations.FluoriteException

fun createStreamMounts(daemonScope: CoroutineScope): List<Map<String, FluoriteValue>> {
    return mapOf(
        "GENERATE" to FluoriteFunction { arguments ->
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
                generator.invoke(arrayOf(yieldFunction)).consume()
            }
        },
        "REVERSE" to FluoriteFunction { arguments ->
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
        "SHUFFLE" to FluoriteFunction { arguments ->
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
        "DISTINCT" to FluoriteFunction { arguments ->
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
                            val key = keyGetter.invoke(arrayOf(item))
                            if (set.add(key)) emit(item)
                        }
                    }
                } else {
                    stream
                }
            }
            usage(
                "DISTINCT(stream: STREAM<VALUE>): STREAM<VALUE>",
                "DISTINCT(by: keyGetter: VALUE -> VALUE; stream: STREAM<VALUE>): STREAM<VALUE>",
            )
        },
        "JOIN" to FluoriteFunction { arguments ->
            val separator: String
            val stream: FluoriteValue
            when (arguments.size) {
                2 -> {
                    separator = arguments[0].toFluoriteString().value
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
                    sb.append(value.toFluoriteString().value)
                }
                sb.toString().toFluoriteString()
            } else {
                stream.toFluoriteString()
            }
        },
        "SPLIT" to FluoriteFunction { arguments ->
            val separator: String
            val string: FluoriteValue
            when (arguments.size) {
                2 -> {
                    separator = arguments[0].toFluoriteString().value
                    string = arguments[1]
                }

                1 -> {
                    separator = ","
                    string = arguments[0]
                }

                else -> usage("SPLIT([separator: STRING; ]string: STRING): STREAM<STRING>")
            }

            if (separator.isEmpty()) {
                string.toFluoriteString().value.map { "$it".toFluoriteString() }.toFluoriteStream()
            } else {
                string.toFluoriteString().value.split(separator).map { it.toFluoriteString() }.toFluoriteStream()
            }
        },
        "KEYS" to FluoriteFunction { arguments ->
            if (arguments.size == 1) {
                val obj = arguments[0]
                if (obj is FluoriteObject) {
                    obj.map.keys.map { it.toFluoriteString() }.toFluoriteStream()
                } else {
                    usage("KEYS(object: OBJECT): STREAM<STRING>")
                }
            } else {
                usage("KEYS(object: OBJECT): STREAM<STRING>")
            }
        },
        "VALUES" to FluoriteFunction { arguments ->
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
        "INVERT" to FluoriteFunction { arguments ->
            if (arguments.size == 1) {
                val obj = arguments[0]
                if (obj is FluoriteObject) {
                    val invertedMap = mutableMapOf<String, FluoriteValue>()
                    for ((key, value) in obj.map) {
                        invertedMap[value.toString()] = key.toFluoriteString()
                    }
                    FluoriteObject(FluoriteObject.fluoriteClass, invertedMap)
                } else {
                    usage("INVERT(object: OBJECT<VALUE>): OBJECT<STRING>")
                }
            } else {
                usage("INVERT(object: OBJECT<VALUE>): OBJECT<STRING>")
            }
        },
        "SUM" to FluoriteFunction { arguments ->
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
        "MIN" to FluoriteFunction { arguments ->
            if (arguments.size == 1) {
                val stream = arguments[0]
                if (stream is FluoriteStream) {
                    var result: FluoriteValue? = null
                    stream.collect { item ->
                        val result2 = result
                        if (result2 == null || item.compareTo(result2).value < 0) {
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
        "MAX" to FluoriteFunction { arguments ->
            if (arguments.size == 1) {
                val stream = arguments[0]
                if (stream is FluoriteStream) {
                    var result: FluoriteValue? = null
                    stream.collect { item ->
                        val result2 = result
                        if (result2 == null || item.compareTo(result2).value > 0) {
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
        "COUNT" to FluoriteFunction { arguments ->
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
        "FIRST" to FluoriteFunction { arguments ->
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
        "LAST" to FluoriteFunction { arguments ->
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
        "SINGLE" to FluoriteFunction { arguments ->
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
        "REDUCE" to FluoriteFunction { arguments ->
            if (arguments.size == 2) {
                val function = arguments[0]
                val stream = arguments[1]
                if (stream is FluoriteStream) {
                    var result: FluoriteValue? = null
                    stream.collect { item ->
                        val result2 = result
                        result = (if (result2 == null) item else function.invoke(arrayOf(result2, item)))
                    }
                    result ?: FluoriteNull
                } else {
                    stream
                }
            } else {
                usage("REDUCE(function: VALUE, VALUE -> VALUE; stream: STREAM<VALUE>): VALUE")
            }
        },
        "SORT" to createSortFunction("SORT", false),
        "SORTR" to createSortFunction("SORTR", true),
        "CHUNK" to FluoriteFunction { arguments ->
            if (arguments.size == 2) {
                val size = arguments[0].toFluoriteNumber().toInt()
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
        "TAKE" to FluoriteFunction { arguments ->
            if (arguments.size == 2) {
                val count = arguments[0].toFluoriteNumber().roundToInt()
                require(count >= 0)
                val stream = arguments[1]
                FluoriteStream {
                    val flow = flow {
                        if (stream is FluoriteStream) {
                            stream.collect { item ->
                                emit(item)
                            }
                        } else {
                            emit(stream)
                        }
                    }

                    if (count <= 0) return@FluoriteStream
                    var remaining = count
                    try {
                        flow.collect { item ->
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
        "TAKER" to FluoriteFunction { arguments ->
            if (arguments.size == 2) {
                val count = arguments[0].toFluoriteNumber().roundToInt()
                require(count >= 0)
                val stream = arguments[1]
                FluoriteStream {
                    val flow = flow {
                        if (stream is FluoriteStream) {
                            stream.collect { item ->
                                emit(item)
                            }
                        } else {
                            emit(stream)
                        }
                    }

                    val deque = ArrayDeque<FluoriteValue>()
                    flow.collect { item -> // count == 0 の場合でもイテレーション自体はする
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
        "DROP" to FluoriteFunction { arguments ->
            if (arguments.size == 2) {
                val count = arguments[0].toFluoriteNumber().roundToInt()
                require(count >= 0)
                val stream = arguments[1]
                FluoriteStream {
                    val flow = flow {
                        if (stream is FluoriteStream) {
                            stream.collect { item ->
                                emit(item)
                            }
                        } else {
                            emit(stream)
                        }
                    }

                    var remaining = count
                    flow.collect { item ->
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
        "DROPR" to FluoriteFunction { arguments ->
            if (arguments.size == 2) {
                val count = arguments[0].toFluoriteNumber().roundToInt()
                require(count >= 0)
                val stream = arguments[1]
                FluoriteStream {
                    val flow = flow {
                        if (stream is FluoriteStream) {
                            stream.collect { item ->
                                emit(item)
                            }
                        } else {
                            emit(stream)
                        }
                    }

                    val deque = ArrayDeque<FluoriteValue>()
                    flow.collect { item ->
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
            fun createFilterFunction(name: String): FluoriteFunction {
                return FluoriteFunction { arguments ->
                    if (arguments.size == 2) {
                        val predicate = arguments[0]
                        val stream = arguments[1]
                        FluoriteStream {
                            if (stream is FluoriteStream) {
                                stream.collect { item ->
                                    if (predicate.invoke(arrayOf(item)).toBoolean()) {
                                        emit(item)
                                    }
                                }
                            } else {
                                if (predicate.invoke(arrayOf(stream)).toBoolean()) {
                                    emit(stream)
                                }
                            }
                        }
                    } else {
                        usage("$name(predicate: VALUE -> BOOLEAN; stream: STREAM<VALUE>): STREAM<VALUE>")
                    }
                }
            }
            arrayOf(
                "FILTER" to createFilterFunction("FILTER"),
                "GREP" to createFilterFunction("GREP"),
            )
        },
        "GROUP" to FluoriteFunction { arguments ->
            fun error(): Nothing = usage("<T, K> GROUP(by = key_getter: T -> K; stream: T,): [K; [T,]],")

            if (arguments.size != 2) error()
            val entry = arguments[0]
            if (entry !is FluoriteArray) error()
            if (entry.values.size != 2) error()
            val parameterName = entry.values[0]
            if (parameterName !is FluoriteString) error()
            if (parameterName.value != "by") error()
            val keyGetter = entry.values[1]
            val stream = arguments[1]

            return@FluoriteFunction FluoriteStream {
                val groups = mutableMapOf<FluoriteValue, MutableList<FluoriteValue>>()

                suspend fun add(value: FluoriteValue) {
                    val key = keyGetter.invoke(arrayOf(value))
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
        "PIPE" to FluoriteFunction { arguments ->
            if (arguments.size == 1) {
                val stream = arguments[0]

                val channel by lazy {
                    flow {
                        if (stream is FluoriteStream) {
                            stream.collect { item ->
                                emit(item)
                            }
                        } else {
                            emit(stream)
                        }
                    }.produceIn(daemonScope)
                }

                FluoriteStream {
                    for (item in channel) {
                        emit(item)
                    }
                }
            } else {
                usage("<T> PIPE(stream: STREAM<T>): STREAM<T>")
            }
        },
        "CACHE" to FluoriteFunction { arguments ->
            if (arguments.size == 1) {
                val stream = arguments[0]
                stream.cache()
            } else {
                usage("<T> CACHE(stream: STREAM<T>): STREAM<T>")
            }
        },
        "VOID" to FluoriteFunction { arguments ->
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
