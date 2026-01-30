package mirrg.xarpite.mounts

import mirrg.xarpite.Mount
import mirrg.xarpite.RuntimeContext
import mirrg.xarpite.compilers.objects.FluoriteArray
import mirrg.xarpite.compilers.objects.FluoriteBlob
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
import mirrg.xarpite.define

context(context: RuntimeContext)
fun createClassMounts(): List<Map<String, Mount>> {
    return mapOf(
        "VALUE" define FluoriteValue.fluoriteClass,
        "NULL_CLASS" define FluoriteNull.fluoriteClass,
        "INT" define FluoriteInt.fluoriteClass,
        "DOUBLE" define FluoriteDouble.fluoriteClass,
        "BOOLEAN" define FluoriteBoolean.fluoriteClass,
        "STRING" define FluoriteString.fluoriteClass,
        "REGEX" define FluoriteRegex.fluoriteClass,
        "ARRAY" define FluoriteArray.fluoriteClass,
        "OBJECT" define FluoriteObject.fluoriteClass,
        "FUNCTION" define FluoriteFunction.fluoriteClass,
        "BLOB" define FluoriteBlob.fluoriteClass,
        "STREAM" define FluoriteStream.fluoriteClass,
        "PROMISE" define FluoritePromise.fluoriteClass,
    ).let { listOf(it) }
}
