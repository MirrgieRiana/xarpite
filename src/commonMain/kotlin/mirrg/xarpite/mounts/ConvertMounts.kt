package mirrg.xarpite.mounts

import mirrg.xarpite.Mount
import mirrg.xarpite.RuntimeContext
import mirrg.xarpite.compilers.objects.FluoriteFunction
import mirrg.xarpite.compilers.objects.FluoriteObject
import mirrg.xarpite.compilers.objects.FluoriteStream
import mirrg.xarpite.compilers.objects.asFluoriteArray
import mirrg.xarpite.compilers.objects.toFluoriteBoolean
import mirrg.xarpite.compilers.objects.toFluoriteNumber
import mirrg.xarpite.compilers.objects.toFluoriteString
import mirrg.xarpite.compilers.objects.toMutableList
import mirrg.xarpite.define

context(context: RuntimeContext)
fun createConvertMounts(): List<Map<String, Mount>> {
    return mapOf(
        "TO_STRING" define FluoriteFunction { arguments ->
            if (arguments.size == 1) {
                arguments[0].toFluoriteString(null)
            } else {
                usage("TO_STRING(value: VALUE): STRING")
            }
        },
        "TO_NUMBER" define FluoriteFunction { arguments ->
            if (arguments.size == 1) {
                arguments[0].toFluoriteNumber(null)
            } else {
                usage("TO_NUMBER(value: VALUE): NUMBER")
            }
        },
        "TO_BOOLEAN" define FluoriteFunction { arguments ->
            if (arguments.size == 1) {
                arguments[0].toFluoriteBoolean(null)
            } else {
                usage("TO_BOOLEAN(value: VALUE): BOOLEAN")
            }
        },
        "TO_ARRAY" define FluoriteFunction { arguments ->
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
        "TO_OBJECT" define FluoriteFunction { arguments ->
            if (arguments.size == 1) {
                FluoriteObject.fromStream(arguments[0])
            } else {
                usage("OBJECT(stream: STREAM<ARRAY<STRING; VALUE>>): OBJECT")
            }
        },
    ).let { listOf(it) }
}
