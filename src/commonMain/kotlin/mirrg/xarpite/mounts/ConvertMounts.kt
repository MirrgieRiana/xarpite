package mirrg.xarpite.mounts

import kotlinx.coroutines.flow.first
import kotlinx.coroutines.flow.flow
import mirrg.xarpite.RuntimeContext
import mirrg.xarpite.compilers.objects.FluoriteArray
import mirrg.xarpite.compilers.objects.FluoriteBoolean
import mirrg.xarpite.compilers.objects.FluoriteFunction
import mirrg.xarpite.compilers.objects.FluoriteObject
import mirrg.xarpite.compilers.objects.FluoriteStream
import mirrg.xarpite.compilers.objects.FluoriteValue
import mirrg.xarpite.compilers.objects.asFluoriteArray
import mirrg.xarpite.compilers.objects.collect
import mirrg.xarpite.compilers.objects.concat
import mirrg.xarpite.compilers.objects.toFluoriteBoolean
import mirrg.xarpite.compilers.objects.toFluoriteNumber
import mirrg.xarpite.compilers.objects.toFluoriteStream
import mirrg.xarpite.compilers.objects.toFluoriteString
import mirrg.xarpite.compilers.objects.toMutableList

context(context: RuntimeContext)
fun createConvertMounts(): List<Map<String, FluoriteValue>> {
    return mapOf(
        "TO_STRING" to FluoriteFunction { arguments ->
            if (arguments.size == 1) {
                arguments[0].toFluoriteString(null)
            } else {
                usage("TO_STRING(value: VALUE): STRING")
            }
        },
        "TO_NUMBER" to FluoriteFunction { arguments ->
            if (arguments.size == 1) {
                arguments[0].toFluoriteNumber(null)
            } else {
                usage("TO_NUMBER(value: VALUE): NUMBER")
            }
        },
        "TO_BOOLEAN" to FluoriteFunction { arguments ->
            if (arguments.size == 1) {
                arguments[0].toFluoriteBoolean(null)
            } else {
                usage("TO_BOOLEAN(value: VALUE): BOOLEAN")
            }
        },
        *run {
            fun createOr(name: String): FluoriteFunction {
                return FluoriteFunction { arguments ->
                    if (arguments.size !in 1..2) {
                        usage("$name(boolean1: STREAM<VALUE>[; boolean2: STREAM<VALUE>]): VALUE | BOOLEAN")
                    }
                    // 引数をストリームとして連結
                    val stream = if (arguments.size == 1) {
                        if (arguments[0] is FluoriteStream) {
                            arguments[0] as FluoriteStream
                        } else {
                            listOf(arguments[0]).toFluoriteStream()
                        }
                    } else {
                        val stream1 = if (arguments[0] is FluoriteStream) arguments[0] as FluoriteStream else listOf(arguments[0]).toFluoriteStream()
                        val stream2 = if (arguments[1] is FluoriteStream) arguments[1] as FluoriteStream else listOf(arguments[1]).toFluoriteStream()
                        listOf(stream1, stream2).concat()
                    }
                    
                    // ストリームから要素を取得
                    flow<FluoriteValue> {
                        stream.collect { element ->
                            val boolValue = element.toFluoriteBoolean(null)
                            if (boolValue.value) {
                                // 最初に真である要素を返す
                                emit(element)
                            }
                        }
                        // すべて偽、または要素が一つも無い場合はFALSEを返す
                        emit(FluoriteBoolean.FALSE)
                    }.first()
                }
            }
            fun createAnd(name: String): FluoriteFunction {
                return FluoriteFunction { arguments ->
                    if (arguments.size !in 1..2) {
                        usage("$name(boolean1: STREAM<VALUE>[; boolean2: STREAM<VALUE>]): VALUE | BOOLEAN")
                    }
                    // 引数をストリームとして連結
                    val stream = if (arguments.size == 1) {
                        if (arguments[0] is FluoriteStream) {
                            arguments[0] as FluoriteStream
                        } else {
                            listOf(arguments[0]).toFluoriteStream()
                        }
                    } else {
                        val stream1 = if (arguments[0] is FluoriteStream) arguments[0] as FluoriteStream else listOf(arguments[0]).toFluoriteStream()
                        val stream2 = if (arguments[1] is FluoriteStream) arguments[1] as FluoriteStream else listOf(arguments[1]).toFluoriteStream()
                        listOf(stream1, stream2).concat()
                    }
                    
                    // ストリームから要素を取得
                    flow<FluoriteValue> {
                        stream.collect { element ->
                            val boolValue = element.toFluoriteBoolean(null)
                            if (!boolValue.value) {
                                // 最初に偽である要素を返す
                                emit(element)
                            }
                        }
                        // すべて真、または要素が一つも無い場合はTRUEを返す
                        emit(FluoriteBoolean.TRUE)
                    }.first()
                }
            }
            arrayOf(
                "OR" to createOr("OR"),
                "ANY" to createOr("ANY"),
                "AND" to createAnd("AND"),
                "ALL" to createAnd("ALL"),
            )
        },
        "TO_ARRAY" to FluoriteFunction { arguments ->
            if (arguments.size == 1) {
                val stream = arguments[0]
                val list = if (stream is FluoriteStream) {
                    stream.toMutableList()
                } else {
                    mutableListOf(stream)
                }
                list.asFluoriteArray()
            } else {
                usage("ARRAY(stream: STREAM<VALUE>): ARRAY<VALUE>")
            }
        },
        "TO_OBJECT" to FluoriteFunction { arguments ->
            if (arguments.size == 1) {
                val stream = arguments[0]
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
                FluoriteObject(FluoriteObject.fluoriteClass, map)
            } else {
                usage("OBJECT(stream: STREAM<ARRAY<STRING; VALUE>>): OBJECT")
            }
        },
    ).let { listOf(it) }
}
