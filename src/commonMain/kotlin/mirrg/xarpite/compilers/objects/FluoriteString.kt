package mirrg.xarpite.compilers.objects

import mirrg.xarpite.OperatorMethod
import mirrg.xarpite.toFluoriteIntAsCompared

data class FluoriteString(val value: String) : FluoriteValue {
    companion object {
        val fluoriteClass by lazy {
            FluoriteObject(
                FluoriteValue.fluoriteClass, mutableMapOf(
                    OperatorMethod.PROPERTY.methodName to FluoriteFunction.immediate { arguments ->
                        val string = arguments[0] as FluoriteString
                        when (val key = arguments[1]) {
                            is FluoriteRegex -> key.match(null, string)
                            else -> {
                                val index = key.toFluoriteNumber(null).roundToInt()
                                string.value.getOrNull(index)?.toString()?.toFluoriteString() ?: FluoriteNull
                            }
                        }
                    },
                    OperatorMethod.SET_PROPERTY.methodName to FluoriteFunction.immediate { arguments ->
                        throw IllegalArgumentException("Cannot set item to string") // TODO
                    },
                    OperatorMethod.CALL.methodName to FluoriteFunction.immediate { arguments ->
                        val string = (arguments[0] as FluoriteString).value
                        when (arguments.size) {
                            1 -> {
                                FluoriteStream {
                                    string.forEach {
                                        emit(it.toString().toFluoriteString())
                                    }
                                }
                            }

                            2 -> {
                                suspend fun get(index: FluoriteValue): FluoriteValue {
                                    val index2 = index.toFluoriteNumber(null).roundToInt()
                                    return string.getOrNull(if (index2 >= 0) index2 else index2 + string.length)?.toString()?.toFluoriteString() ?: FluoriteNull
                                }

                                val argument = arguments[1]
                                if (argument is FluoriteStream) {
                                    FluoriteStream {
                                        argument.collect { index ->
                                            emit(get(index))
                                        }
                                    }
                                } else {
                                    get(argument)
                                }
                            }

                            else -> throw IllegalArgumentException("Invalid number of arguments: ${arguments.size}")
                        }
                    },
                    OperatorMethod.BIND.methodName to FluoriteFunction.immediate { arguments ->
                        val string = arguments[0] as FluoriteString
                        when (arguments.size) {
                            1 -> string

                            2 -> {
                                val kotlinString = string.value
                                val sb = StringBuilder()
                                suspend fun append(index: FluoriteValue) {
                                    val index2 = index.toFluoriteNumber(null).roundToInt()
                                    val index3 = if (index2 >= 0) index2 else index2 + kotlinString.length
                                    if (index3 >= 0 && index3 < kotlinString.length) {
                                        sb.append(kotlinString[index3])
                                    } else {
                                        sb.append("NULL")
                                    }
                                }

                                val argument = arguments[1]
                                if (argument is FluoriteStream) {
                                    argument.collect { index ->
                                        append(index)
                                    }
                                } else {
                                    append(argument)
                                }
                                FluoriteString(sb.toString())
                            }

                            else -> throw IllegalArgumentException("Invalid number of arguments: ${arguments.size}")
                        }
                    },
                    OperatorMethod.TO_NUMBER.methodName to FluoriteFunction.immediate { arguments ->
                        val string = (arguments[0] as FluoriteString).value
                        string.toFluoriteNumber()
                    },
                    OperatorMethod.TO_BOOLEAN.methodName to FluoriteFunction.immediate { ((it[0] as FluoriteString).value != "").toFluoriteBoolean() },
                    OperatorMethod.TO_STRING.methodName to FluoriteFunction.immediate { it[0] as FluoriteString },
                    OperatorMethod.GET_LENGTH.methodName to FluoriteFunction.immediate { arguments ->
                        val string = arguments[0] as FluoriteString
                        FluoriteInt(string.value.length)
                    },
                    OperatorMethod.PLUS.methodName to FluoriteFunction.immediate { arguments ->
                        val left = arguments[0] as FluoriteString
                        val right = arguments[1]
                        FluoriteString(left.value + right.toFluoriteString(null).value)
                    },
                    OperatorMethod.COMPARE.methodName to FluoriteFunction.immediate { arguments ->
                        val left = arguments[0] as FluoriteString
                        val right = arguments[1].toFluoriteString(null)
                        left.value.compareTo(right.value).toFluoriteIntAsCompared()
                    },
                    OperatorMethod.CONTAINS.methodName to FluoriteFunction.immediate { arguments ->
                        val right = arguments[0] as FluoriteString
                        val left = arguments[1]
                        when (left) {
                            is FluoriteRegex -> (left.regexCache.find(right.value) != null).toFluoriteBoolean()
                            else -> (left.toFluoriteString(null).value in right.value).toFluoriteBoolean()
                        }
                    },
                    *run {
                        fun create(name: String, transform: (String, Int) -> String): FluoriteValue {
                            return FluoriteFunction.immediate { arguments ->
                                if (arguments.size != 2) throw IllegalArgumentException("STRING::$name(count: INT): STRING")
                                val string = arguments[0] as FluoriteString
                                val count = arguments[1].toFluoriteNumber(null).roundToInt()
                                require(count >= 0) { "STRING::$name(count: INT): STRING <- count must be non-negative, got $count" }
                                transform(string.value, count).toFluoriteString()
                            }
                        }
                        arrayOf(
                            "take" to create("take") { string, count -> string.take(count) },
                            "takeFirst" to create("takeFirst") { string, count -> string.take(count) },
                            "taker" to create("taker") { string, count -> string.takeLast(count) },
                            "takeLast" to create("takeLast") { string, count -> string.takeLast(count) },
                            "drop" to create("drop") { string, count -> string.drop(count) },
                            "dropFirst" to create("dropFirst") { string, count -> string.drop(count) },
                            "dropr" to create("dropr") { string, count -> string.dropLast(count) },
                            "dropLast" to create("dropLast") { string, count -> string.dropLast(count) },
                        )
                    },
                    *run {
                        fun create(name: String, transform: (String) -> String): FluoriteValue {
                            return FluoriteFunction.immediate { arguments ->
                                if (arguments.size != 1) throw IllegalArgumentException("STRING::$name(): STRING")
                                val string = arguments[0] as FluoriteString
                                transform(string.value).toFluoriteString()
                            }
                        }
                        arrayOf(
                            "trim" to create("trim") { it.trim() },
                            "trimStart" to create("trimStart") { it.trimStart() },
                            "trimEnd" to create("trimEnd") { it.trimEnd() },
                        )
                    },
                    "first" to FluoriteFunction.immediate { arguments ->
                        if (arguments.size != 1) throw IllegalArgumentException("STRING::first(): STRING | NULL")
                        val string = arguments[0] as FluoriteString
                        string.value.firstOrNull()?.toString()?.toFluoriteString() ?: FluoriteNull
                    },
                    "last" to FluoriteFunction.immediate { arguments ->
                        if (arguments.size != 1) throw IllegalArgumentException("STRING::last(): STRING | NULL")
                        val string = arguments[0] as FluoriteString
                        string.value.lastOrNull()?.toString()?.toFluoriteString() ?: FluoriteNull
                    },
                    *run {
                        fun create(name: String, forceAllOrFirst: Boolean?): FluoriteValue {
                            return FluoriteFunction.immediate { arguments ->

                                if (arguments.size != 3) throw IllegalArgumentException("STRING::$name(old: STRING | REGEX; new: STRING | (match: VALUE) -> STRING): STRING")
                                val string = arguments[0] as FluoriteString
                                val old = arguments[1]
                                val new = arguments[2]

                                val sb = StringBuilder()
                                var index = 0

                                suspend fun yield(matchResult: FluoriteValue, fromIndex: Int, toIndex: Int) {
                                    sb.append(string.value, index, fromIndex)
                                    val newValue = if (new is FluoriteFunction) {
                                        new.invokeImmediate(null, arrayOf(matchResult))
                                    } else {
                                        new
                                    }
                                    sb.append(newValue.toFluoriteString(null).value)
                                    index = toIndex
                                }

                                when (old) {
                                    is FluoriteRegex -> {
                                        if (forceAllOrFirst == true || forceAllOrFirst != false && old.flagData.global) {
                                            old.regexCache.findAll(string.value).forEach { result ->
                                                yield(result.toFluoriteValue(), result.range.first, result.range.last + 1)
                                            }
                                        } else {
                                            old.regexCache.find(string.value)?.let { result ->
                                                yield(result.toFluoriteValue(), result.range.first, result.range.last + 1)
                                            }
                                        }
                                    }

                                    else -> {
                                        val oldString = old.toFluoriteString(null).value
                                        if (oldString.isNotEmpty()) {
                                            while (true) {
                                                val foundIndex = string.value.indexOf(oldString, index)
                                                if (foundIndex == -1) break
                                                yield(createFluoriteMatchResult(listOf(oldString)), foundIndex, foundIndex + oldString.length)
                                                if (forceAllOrFirst == false) break
                                            }
                                        } else {
                                            yield(createFluoriteMatchResult(listOf("")), 0, 0)
                                            if (forceAllOrFirst != false) {
                                                while (index < string.value.length) {
                                                    val nextIndex = index + 1
                                                    yield(createFluoriteMatchResult(listOf("")), nextIndex, nextIndex)
                                                }
                                            }
                                        }
                                    }
                                }
                                sb.append(string.value, index, string.value.length)

                                sb.toString().toFluoriteString()
                            }
                        }
                        arrayOf(
                            "replace" to create("replace", null),
                            "replaceAll" to create("replaceAll", true),
                            "replaceFirst" to create("replaceFirst", false),
                        )
                    },
                )
            )
        }
        val EMPTY = FluoriteString("")
    }

    override fun toString() = value
    override val parent get() = fluoriteClass
    override fun strictEquals(other: FluoriteValue) = this == other
}

fun String.toFluoriteString() = if (this.isEmpty()) FluoriteString.EMPTY else FluoriteString(this)
