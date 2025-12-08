package mirrg.xarpite.compilers.objects

import mirrg.xarpite.OperatorMethod
import mirrg.xarpite.toFluoriteIntAsCompared

data class FluoriteString(val value: String) : FluoriteValue {
    companion object {
        val fluoriteClass by lazy {
            FluoriteObject(
                FluoriteValue.fluoriteClass, mutableMapOf(
                    OperatorMethod.PROPERTY.methodName to FluoriteFunction { arguments ->
                        val string = arguments[0] as FluoriteString
                        val index = arguments[1].toFluoriteNumber().roundToInt()
                        string.value.getOrNull(index)?.toString()?.toFluoriteString() ?: FluoriteNull
                    },
                    OperatorMethod.SET_PROPERTY.methodName to FluoriteFunction { arguments ->
                        throw IllegalArgumentException("Cannot set item to string") // TODO
                    },
                    OperatorMethod.CALL.methodName to FluoriteFunction { arguments ->
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
                                    val index2 = index.toFluoriteNumber().roundToInt()
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
                    OperatorMethod.BIND.methodName to FluoriteFunction { arguments ->
                        val string = arguments[0] as FluoriteString
                        when (arguments.size) {
                            1 -> string

                            2 -> {
                                val kotlinString = string.value
                                val sb = StringBuilder()
                                suspend fun append(index: FluoriteValue) {
                                    val index2 = index.toFluoriteNumber().roundToInt()
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
                    OperatorMethod.TO_NUMBER.methodName to FluoriteFunction { arguments ->
                        val string = (arguments[0] as FluoriteString).value
                        string.toFluoriteNumber()
                    },
                    OperatorMethod.TO_BOOLEAN.methodName to FluoriteFunction { ((it[0] as FluoriteString).value != "").toFluoriteBoolean() },
                    OperatorMethod.TO_STRING.methodName to FluoriteFunction { it[0] as FluoriteString },
                    OperatorMethod.PLUS.methodName to FluoriteFunction { arguments ->
                        val left = arguments[0] as FluoriteString
                        val right = arguments[1]
                        FluoriteString(left.value + right.toFluoriteString().value)
                    },
                    OperatorMethod.COMPARE.methodName to FluoriteFunction { arguments ->
                        val left = arguments[0] as FluoriteString
                        val right = arguments[1].toFluoriteString()
                        left.value.compareTo(right.value).toFluoriteIntAsCompared()
                    },
                    OperatorMethod.CONTAINS.methodName to FluoriteFunction { arguments ->
                        val right = arguments[0] as FluoriteString
                        val left = arguments[1]
                        when (left) {
                            is FluoriteRegex -> (left.regexCache.find(right.value) != null).toFluoriteBoolean()
                            else -> (left.toFluoriteString().value in right.value).toFluoriteBoolean()
                        }
                    },
                    "replace" to FluoriteFunction { arguments ->
                        if (arguments.size != 3) throw IllegalArgumentException("STRING::replace(old: STRING | REGEX; new: STRING | (match: VALUE) -> STRING): STRING")
                        val string = arguments[0] as FluoriteString
                        val old = arguments[1]
                        val new = arguments[2]

                        val sb = StringBuilder()
                        var index = 0

                        suspend fun yield(matchResult: FluoriteValue, fromIndex: Int, toIndex: Int) {
                            sb.append(string.value, index, fromIndex)
                            val newValue = if (new is FluoriteFunction) {
                                new.invoke(arrayOf(matchResult))
                            } else {
                                new
                            }
                            sb.append(newValue.toFluoriteString().value)
                            index = toIndex
                        }

                        when (old) {
                            is FluoriteRegex -> {
                                if (old.flagData.global) {
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
                                val oldString = old.toFluoriteString().value
                                if (oldString.isNotEmpty()) {
                                    while (true) {
                                        val foundIndex = string.value.indexOf(oldString, index)
                                        if (foundIndex == -1) break
                                        yield(createFluoriteMatchResult(listOf(oldString)), foundIndex, foundIndex + oldString.length)
                                    }
                                } else {
                                    yield(createFluoriteMatchResult(listOf("")), 0, 0)
                                    while (index < string.value.length) {
                                        val nextIndex = index + 1
                                        yield(createFluoriteMatchResult(listOf("")), nextIndex, nextIndex)
                                    }
                                }
                            }
                        }
                        sb.append(string.value, index, string.value.length)

                        sb.toString().toFluoriteString()
                    },
                )
            )
        }
        val EMPTY = FluoriteString("")
    }

    override fun toString() = value
    override val parent get() = fluoriteClass
}

fun String.toFluoriteString() = if (this.isEmpty()) FluoriteString.EMPTY else FluoriteString(this)
