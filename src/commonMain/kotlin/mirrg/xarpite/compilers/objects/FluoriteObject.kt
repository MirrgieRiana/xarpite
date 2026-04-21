package mirrg.xarpite.compilers.objects

import mirrg.xarpite.OperatorMethod

class FluoriteObject(override val parent: FluoriteObject?, val map: MutableMap<String, FluoriteValue>) : FluoriteValue {
    companion object {
        val fluoriteClass: FluoriteObject by lazy {
            FluoriteObject(
                FluoriteValue.fluoriteClass, mutableMapOf(
                    OperatorMethod.PROPERTY.methodName to FluoriteFunction.immediate { arguments ->
                        val obj = arguments[0] as FluoriteObject
                        val key = arguments[1].toFluoriteString(null).value
                        obj.map[key] ?: FluoriteNull
                    },
                    OperatorMethod.SET_PROPERTY.methodName to FluoriteFunction.immediate { arguments ->
                        val obj = arguments[0] as FluoriteObject
                        val key = arguments[1].toFluoriteString(null).value
                        val value = arguments[2]
                        obj.map[key] = value
                        FluoriteNull
                    },
                    OperatorMethod.CALL.methodName to FluoriteFunction.immediate { arguments ->
                        val obj = arguments[0] as FluoriteObject
                        when (arguments.size) {
                            1 -> {
                                FluoriteStream {
                                    obj.map.entries.forEach {
                                        emit(fluoriteArrayOf(it.key.toFluoriteString(), it.value))
                                    }
                                }
                            }

                            2 -> {
                                suspend fun get(key: FluoriteValue) = obj.map[key.toFluoriteString(null).value] ?: FluoriteNull

                                val argument = arguments[1]
                                if (argument is FluoriteStream) {
                                    FluoriteStream {
                                        argument.collect { key ->
                                            emit(get(key))
                                        }
                                    }
                                } else {
                                    get(argument)
                                }
                            }

                            else -> throw IllegalArgumentException("Invalid number of arguments: ${arguments.size}")
                        }
                    },
                    OperatorMethod.SET_CALL.methodName to FluoriteFunction.immediate { arguments ->
                        val obj = arguments[0] as FluoriteObject
                        when (arguments.size) {
                            3 -> {
                                val key = arguments[1].toFluoriteString(null).value
                                val value = arguments[2]
                                obj.map[key] = value
                                FluoriteNull
                            }

                            else -> throw IllegalArgumentException("Invalid number of arguments: ${arguments.size}")
                        }
                    },
                    OperatorMethod.BIND.methodName to FluoriteFunction.immediate { arguments ->
                        // TODO
                        val obj = arguments[0] as FluoriteObject
                        val arguments1 = arguments.sliceArray(1 until arguments.size)
                        FluoriteFunction.immediate { arguments2 ->
                            obj.invoke(null, arguments1 + arguments2)
                        }
                    },
                    OperatorMethod.TO_STRING.methodName to FluoriteFunction.immediate { arguments ->
                        val sb = StringBuilder()
                        sb.append('{')
                        (arguments[0] as FluoriteObject).map.entries.forEachIndexed { i, (key, value) ->
                            if (i != 0) sb.append(';')
                            sb.append(key)
                            sb.append(':')
                            sb.append(value.toFluoriteString(null).value)
                        }
                        sb.append('}')
                        sb.toString().toFluoriteString()
                    },
                    OperatorMethod.TO_BOOLEAN.methodName to FluoriteFunction.immediate { (it[0] as FluoriteObject).map.isNotEmpty().toFluoriteBoolean() },
                    OperatorMethod.GET_LENGTH.methodName to FluoriteFunction.immediate { arguments ->
                        val obj = arguments[0] as FluoriteObject
                        FluoriteInt(obj.map.size)
                    },
                    OperatorMethod.PLUS.methodName to FluoriteFunction.immediate { arguments ->
                        val left = arguments[0] as FluoriteObject
                        val right = arguments[1] as FluoriteObject
                        val map = mutableMapOf<String, FluoriteValue>()
                        map += left.map
                        map += right.map
                        FluoriteObject(fluoriteClass, map)
                    },
                    OperatorMethod.CONTAINS.methodName to FluoriteFunction.immediate { (it[1].toFluoriteString(null).value in (it[0] as FluoriteObject).map).toFluoriteBoolean() },
                    OperatorMethod.MINUS_ASSIGN.methodName to FluoriteFunction.immediate { arguments ->
                        val obj = arguments[0] as FluoriteObject
                        val key = arguments[1]
                        if (key is FluoriteStream) {
                            key.collect { item ->
                                obj.map.remove(item.toFluoriteString(null).value)
                            }
                        } else {
                            obj.map.remove(key.toFluoriteString(null).value)
                        }
                        FluoriteNull
                    },
                )
            )
        }

        suspend fun fromStream(stream: FluoriteValue): FluoriteObject {
            val map = mutableMapOf<String, FluoriteValue>()
            if (stream is FluoriteStream) {
                stream.collect { item ->
                    require(item is FluoriteArray)
                    require(item.values.size == 2)
                    map[item.values[0].toString()] = item.values[1]
                }
            } else {
                require(stream is FluoriteArray)
                require(stream.values.size == 2)
                map[stream.values[0].toString()] = stream.values[1]
            }
            return FluoriteObject(fluoriteClass, map)
        }
    }

    override fun toString() = "{${map.entries.joinToString(";") { "${it.key}:${it.value}" }}}"
}
