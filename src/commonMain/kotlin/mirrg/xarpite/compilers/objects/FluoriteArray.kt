package mirrg.xarpite.compilers.objects

import mirrg.xarpite.OperatorMethod

class FluoriteArray(val values: MutableList<FluoriteValue>) : FluoriteValue {
    companion object {
        val fluoriteClass by lazy {
            FluoriteObject(
                FluoriteValue.fluoriteClass, mutableMapOf(
                    OperatorMethod.PROPERTY.methodName to FluoriteFunction { arguments ->
                        val array = arguments[0] as FluoriteArray
                        val index = arguments[1].toFluoriteNumber(null).roundToInt()
                        array.values.getOrNull(index) ?: FluoriteNull
                    },
                    OperatorMethod.SET_PROPERTY.methodName to FluoriteFunction { arguments ->
                        val array = arguments[0] as FluoriteArray
                        val index = arguments[1].toFluoriteNumber(null).roundToInt()
                        val value = arguments[2]
                        array.values[index] = value
                        FluoriteNull
                    },
                    OperatorMethod.CALL.methodName to FluoriteFunction { arguments ->
                        val array = arguments[0] as FluoriteArray
                        when (arguments.size) {
                            1 -> array.values.toFluoriteStream()

                            2 -> {
                                suspend fun get(index: FluoriteValue): FluoriteValue {
                                    val index2 = index.toFluoriteNumber(null).roundToInt()
                                    return array.values.getOrNull(if (index2 >= 0) index2 else index2 + array.values.size) ?: FluoriteNull
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
                    OperatorMethod.SET_CALL.methodName to FluoriteFunction { arguments ->
                        val array = arguments[0] as FluoriteArray
                        when (arguments.size) {
                            3 -> {
                                val index = arguments[1].toFluoriteNumber(null).roundToInt()
                                val value = arguments[2]
                                if (value is FluoriteStream) throw IllegalArgumentException("Stream assignment is not supported")
                                array.values[index] = value
                                FluoriteNull
                            }

                            else -> throw IllegalArgumentException("Invalid number of arguments: ${arguments.size}")
                        }
                    },
                    OperatorMethod.BIND.methodName to FluoriteFunction { arguments ->
                        val array = arguments[0] as FluoriteArray
                        when (arguments.size) {
                            1 -> array.values.toFluoriteArray()

                            2 -> {
                                suspend fun get(index: FluoriteValue): FluoriteValue {
                                    val index2 = index.toFluoriteNumber(null).roundToInt()
                                    return array.values.getOrNull(if (index2 >= 0) index2 else index2 + array.values.size) ?: FluoriteNull
                                }

                                val argument = arguments[1]
                                if (argument is FluoriteStream) {
                                    val items = mutableListOf<FluoriteValue>()
                                    argument.collect { index ->
                                        items += get(index)
                                    }
                                    items.asFluoriteArray()
                                } else {
                                    fluoriteArrayOf(get(argument))
                                }
                            }

                            else -> throw IllegalArgumentException("Invalid number of arguments: ${arguments.size}")
                        }
                    },
                    OperatorMethod.TO_STRING.methodName to FluoriteFunction { arguments ->
                        val sb = StringBuilder()
                        sb.append('[')
                        (arguments[0] as FluoriteArray).values.forEachIndexed { i, value ->
                            if (i != 0) sb.append(';')
                            sb.append(value.toFluoriteString(null).value)
                        }
                        sb.append(']')
                        sb.toString().toFluoriteString()
                    },
                    OperatorMethod.TO_BOOLEAN.methodName to FluoriteFunction { (it[0] as FluoriteArray).values.isNotEmpty().toFluoriteBoolean() },
                    OperatorMethod.GET_LENGTH.methodName to FluoriteFunction { arguments ->
                        val array = arguments[0] as FluoriteArray
                        FluoriteInt(array.values.size)
                    },
                    OperatorMethod.PLUS.methodName to FluoriteFunction { arguments ->
                        val left = arguments[0] as FluoriteArray
                        val right = arguments[1] as FluoriteArray
                        val list = mutableListOf<FluoriteValue>()
                        list += left.values
                        list += right.values
                        list.asFluoriteArray()
                    },
                    OperatorMethod.CONTAINS.methodName to FluoriteFunction { (it[1] in (it[0] as FluoriteArray).values).toFluoriteBoolean() }, // TODO EQUALSメソッドの使用
                    OperatorMethod.PLUS_ASSIGN.methodName to FluoriteFunction { arguments ->
                        val array = arguments[0] as FluoriteArray
                        val value = arguments[1]
                        if (value is FluoriteStream) {
                            value.collect { item ->
                                array.values.add(item)
                            }
                        } else {
                            array.values.add(value)
                        }
                        FluoriteNull
                    },
                    OperatorMethod.MINUS_ASSIGN.methodName to FluoriteFunction { arguments ->
                        val array = arguments[0] as FluoriteArray
                        val value = arguments[1]
                        if (value is FluoriteStream) {
                            value.collect { item ->
                                val index = array.values.indexOf(item) // TODO EQUALSメソッドの使用
                                if (index != -1) array.values.removeAt(index)
                            }
                        } else {
                            val index = array.values.indexOf(value) // TODO EQUALSメソッドの使用
                            if (index != -1) array.values.removeAt(index)
                        }
                        FluoriteNull
                    },
                    "push" to FluoriteFunction { arguments ->
                        if (arguments.size != 2) throw IllegalArgumentException("Invalid number of arguments: ${arguments.size}")
                        val array = arguments[0] as FluoriteArray
                        val value = arguments[1]
                        if (value is FluoriteStream) {
                            value.collect { item ->
                                array.values.add(item)
                            }
                        } else {
                            array.values.add(value)
                        }
                        FluoriteNull
                    },
                    "pop" to FluoriteFunction { arguments ->
                        if (arguments.size != 1) throw IllegalArgumentException("Invalid number of arguments: ${arguments.size}")
                        val array = arguments[0] as FluoriteArray
                        array.values.removeLast()
                    },
                    "unshift" to FluoriteFunction { arguments ->
                        if (arguments.size != 2) throw IllegalArgumentException("Invalid number of arguments: ${arguments.size}")
                        val array = arguments[0] as FluoriteArray
                        val value = arguments[1]
                        if (value is FluoriteStream) {
                            var index = 0
                            value.collect { item ->
                                array.values.add(index, item)
                                index++
                            }
                        } else {
                            array.values.add(0, value)
                        }
                        FluoriteNull
                    },
                    "shift" to FluoriteFunction { arguments ->
                        if (arguments.size != 1) throw IllegalArgumentException("Invalid number of arguments: ${arguments.size}")
                        val array = arguments[0] as FluoriteArray
                        array.values.removeFirst()
                    },
                )
            )
        }
    }

    override fun toString() = "[${values.joinToString(";") { "$it" }}]"
    override val parent get() = fluoriteClass
}

fun FluoriteArray() = FluoriteArray(mutableListOf())

fun MutableList<FluoriteValue>.asFluoriteArray() = FluoriteArray(this)

fun fluoriteArrayOf(vararg values: FluoriteValue) = FluoriteArray(values.toMutableList())

fun Array<FluoriteValue>.toFluoriteArray() = FluoriteArray(this.toMutableList())

fun Iterable<FluoriteValue>.toFluoriteArray() = FluoriteArray(this.toMutableList())

infix fun FluoriteValue.colon(right: FluoriteValue) = fluoriteArrayOf(this, right)
