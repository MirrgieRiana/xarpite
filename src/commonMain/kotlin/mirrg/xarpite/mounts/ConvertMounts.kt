package mirrg.xarpite.mounts

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
import mirrg.xarpite.compilers.objects.toFluoriteBoolean
import mirrg.xarpite.compilers.objects.toFluoriteNumber
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
