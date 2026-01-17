package mirrg.xarpite.compilers.objects

import kotlinx.coroutines.flow.FlowCollector
import kotlinx.coroutines.flow.first
import kotlinx.coroutines.flow.flow
import mirrg.xarpite.OperatorMethod

class FluoriteStream(val flowProvider: suspend FlowCollector<FluoriteValue>.() -> Unit) : FluoriteValue {
    companion object {
        val fluoriteClass by lazy {
            FluoriteObject(
                FluoriteValue.fluoriteClass, mutableMapOf(
                    OperatorMethod.TO_NUMBER.methodName to FluoriteFunction { arguments ->
                        var sum: FluoriteValue? = null
                        (arguments[0] as FluoriteStream).collect { item ->
                            val number = item.toFluoriteNumber(null)
                            sum = sum?.callMethod(null, OperatorMethod.PLUS.methodName, arrayOf(number)) ?: number
                        }
                        sum ?: FluoriteInt.ZERO
                    },
                    OperatorMethod.TO_BOOLEAN.methodName to FluoriteFunction { arguments ->
                        flow {
                            (arguments[0] as FluoriteStream).collect {
                                if (it.toBoolean(null)) emit(FluoriteBoolean.TRUE)
                            }
                            emit(FluoriteBoolean.FALSE)
                        }.first()
                    },
                    OperatorMethod.TO_STRING.methodName to FluoriteFunction { arguments ->
                        val stream = arguments[0] as FluoriteStream
                        val sb = StringBuilder()
                        stream.collect { item ->
                            sb.append(item.toFluoriteString(null).value)
                        }
                        "$sb".toFluoriteString()
                    },
                    OperatorMethod.PROPERTY.methodName to FluoriteFunction { arguments ->
                        val stream = arguments[0] as FluoriteStream
                        val key = arguments[1]
                        FluoriteStream {
                            stream.collect { item ->
                                val result = item.callMethod(null, OperatorMethod.PROPERTY.methodName, arrayOf(key))
                                if (result is FluoriteStream) {
                                    result.flowProvider(this)
                                } else {
                                    emit(result)
                                }
                            }
                        }
                    },
                    OperatorMethod.METHOD.methodName to FluoriteFunction { arguments ->
                        val stream = arguments[0] as FluoriteStream
                        val method = arguments[1] as FluoriteString
                        FluoriteFunction { arguments2 ->
                            FluoriteStream {
                                stream.collect { item ->
                                    val result = item.callMethod(null, method.value, arguments2)
                                    if (result is FluoriteStream) {
                                        result.flowProvider(this)
                                    } else {
                                        emit(result)
                                    }
                                }
                            }
                        }
                    },
                    OperatorMethod.GET_LENGTH.methodName to FluoriteFunction { arguments ->
                        val stream = arguments[0] as FluoriteStream
                        var sum: FluoriteValue? = null
                        stream.collect { item ->
                            val length = item.getLength(null)
                            sum = sum?.callMethod(null, OperatorMethod.PLUS.methodName, arrayOf(length)) ?: length
                        }
                        sum ?: FluoriteInt.ZERO
                    },
                )
            )
        }
        val EMPTY = FluoriteStream {}
    }

    override val parent get() = fluoriteClass
}

fun FluoriteStream(vararg values: FluoriteValue) = FluoriteStream {
    values.forEach {
        emit(it)
    }
}

fun FluoriteStream(values: Iterable<FluoriteValue>) = FluoriteStream {
    values.forEach {
        emit(it)
    }
}

fun Iterable<FluoriteValue>.toFluoriteStream() = FluoriteStream(this)

operator fun FluoriteStream.plus(other: FluoriteStream) = FluoriteStream {
    this@plus.flowProvider(this)
    other.flowProvider(this)
}

fun Iterable<FluoriteStream>.concat() = FluoriteStream {
    this@concat.forEach {
        it.flowProvider(this)
    }
}

// ↓ flowProvider { のように書くとJSでemitが呼び出せないエラーになる
suspend fun FluoriteStream.collect(block: suspend (FluoriteValue) -> Unit) = this.flowProvider(FlowCollector {
    block(it)
})

suspend fun FluoriteStream.toMutableList(): MutableList<FluoriteValue> {
    val list = mutableListOf<FluoriteValue>()
    this.collect {
        list.add(it)
    }
    return list
}

suspend fun FluoriteValue.consume() {
    if (this is FluoriteStream) {
        this.collect {
            // イテレーションは行うがその結果は握りつぶす
        }
    }
}

suspend fun FluoriteValue.cache(): FluoriteValue {
    return if (this is FluoriteStream) {
        val list = mutableListOf<FluoriteValue>()
        this.collect { item ->
            list += item
        }
        list.toFluoriteStream()
    } else {
        this
    }
}
