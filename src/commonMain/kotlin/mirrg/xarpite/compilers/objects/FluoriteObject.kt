package mirrg.xarpite.compilers.objects

import mirrg.xarpite.OperatorMethod

class FluoriteObject(override val parent: FluoriteObject?, val map: MutableMap<String, FluoriteValue>) : FluoriteValue {
    companion object {
        val fluoriteClass: FluoriteObject by lazy {
            FluoriteObject(
                FluoriteValue.fluoriteClass, mutableMapOf(
                    OperatorMethod.PROPERTY.methodName to FluoriteFunction { arguments ->
                        val obj = arguments[0] as FluoriteObject
                        val key = arguments[1].toFluoriteString().value
                        obj.map[key] ?: FluoriteNull
                    },
                    OperatorMethod.SET_PROPERTY.methodName to FluoriteFunction { arguments ->
                        val obj = arguments[0] as FluoriteObject
                        val key = arguments[1].toFluoriteString().value
                        val value = arguments[2]
                        obj.map[key] = value
                        FluoriteNull
                    },
                    OperatorMethod.CALL.methodName to FluoriteFunction { arguments ->
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
                                suspend fun get(key: FluoriteValue) = obj.map[key.toFluoriteString().value] ?: FluoriteNull

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
                    OperatorMethod.SET_CALL.methodName to FluoriteFunction { arguments ->
                        val obj = arguments[0] as FluoriteObject
                        when (arguments.size) {
                            3 -> {
                                val key = arguments[1].toFluoriteString().value
                                val value = arguments[2]
                                obj.map[key] = value
                                FluoriteNull
                            }

                            else -> throw IllegalArgumentException("Invalid number of arguments: ${arguments.size}")
                        }
                    },
                    OperatorMethod.BIND.methodName to FluoriteFunction { arguments ->
                        // TODO
                        val obj = arguments[0] as FluoriteObject
                        val arguments1 = arguments.sliceArray(1 until arguments.size)
                        FluoriteFunction { arguments2 ->
                            obj.invoke(arguments1 + arguments2)
                        }
                    },
                    OperatorMethod.TO_STRING.methodName to FluoriteFunction { arguments ->
                        val sb = StringBuilder()
                        sb.append('{')
                        (arguments[0] as FluoriteObject).map.entries.forEachIndexed { i, (key, value) ->
                            if (i != 0) sb.append(';')
                            sb.append(key)
                            sb.append(':')
                            sb.append(value.toFluoriteString().value)
                        }
                        sb.append('}')
                        sb.toString().toFluoriteString()
                    },
                    OperatorMethod.TO_BOOLEAN.methodName to FluoriteFunction { (it[0] as FluoriteObject).map.isNotEmpty().toFluoriteBoolean() },
                    OperatorMethod.LENGTH.methodName to FluoriteFunction { arguments ->
                        val obj = arguments[0] as FluoriteObject
                        FluoriteInt(obj.map.size)
                    },
                    OperatorMethod.PLUS.methodName to FluoriteFunction { arguments ->
                        val left = arguments[0] as FluoriteObject
                        val right = arguments[1] as FluoriteObject
                        val map = mutableMapOf<String, FluoriteValue>()
                        map += left.map
                        map += right.map
                        FluoriteObject(fluoriteClass, map)
                    },
                    OperatorMethod.CONTAINS.methodName to FluoriteFunction { (it[1].toFluoriteString().value in (it[0] as FluoriteObject).map).toFluoriteBoolean() },
                )
            )
        }
    }

    override fun toString() = "{${map.entries.joinToString(";") { "${it.key}:${it.value}" }}}"
}
