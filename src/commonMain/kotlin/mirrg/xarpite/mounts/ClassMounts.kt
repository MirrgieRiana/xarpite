package mirrg.xarpite.mounts

import mirrg.xarpite.compilers.objects.FluoriteArray
import mirrg.xarpite.compilers.objects.FluoriteBoolean
import mirrg.xarpite.compilers.objects.FluoriteDouble
import mirrg.xarpite.compilers.objects.FluoriteFunction
import mirrg.xarpite.compilers.objects.FluoriteInt
import mirrg.xarpite.compilers.objects.FluoriteNull
import mirrg.xarpite.compilers.objects.FluoriteObject
import mirrg.xarpite.compilers.objects.FluoritePromise
import mirrg.xarpite.compilers.objects.FluoriteRegex
import mirrg.xarpite.compilers.objects.FluoriteStream
import mirrg.xarpite.compilers.objects.FluoriteString
import mirrg.xarpite.compilers.objects.FluoriteValue

fun createClassMounts(): List<Map<String, FluoriteValue>> {
    return mapOf(
        "VALUE" to FluoriteValue.fluoriteClass,
        "NULL_CLASS" to FluoriteNull.fluoriteClass,
        "INT" to FluoriteInt.fluoriteClass,
        "DOUBLE" to FluoriteDouble.fluoriteClass,
        "BOOLEAN" to FluoriteBoolean.fluoriteClass,
        "STRING" to FluoriteString.fluoriteClass,
        "REGEX" to FluoriteRegex.fluoriteClass,
        "ARRAY" to FluoriteArray.fluoriteClass,
        "OBJECT" to FluoriteObject.fluoriteClass,
        "FUNCTION" to FluoriteFunction.fluoriteClass,
        "STREAM" to FluoriteStream.fluoriteClass,
        "PROMISE" to FluoritePromise.fluoriteClass,
    ).let { listOf(it) }
}
