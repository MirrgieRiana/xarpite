package mirrg.xarpite.mounts

import mirrg.xarpite.Mount
import mirrg.xarpite.RuntimeContext
import mirrg.xarpite.compilers.objects.FluoriteFunction
import mirrg.xarpite.compilers.objects.FluoriteNull
import mirrg.xarpite.compilers.objects.FluoriteObject
import mirrg.xarpite.compilers.objects.FluoriteValue
import mirrg.xarpite.compilers.objects.callMethod
import mirrg.xarpite.compilers.objects.colon
import mirrg.xarpite.compilers.objects.consume
import mirrg.xarpite.compilers.objects.fluoriteArrayOf
import mirrg.xarpite.define

context(context: RuntimeContext)
fun createObjectMounts(): List<Map<String, Mount>> {
    return mapOf(
        "PARENT" define FluoriteFunction.immediate { arguments ->
            if (arguments.size != 1) usage("PARENT(value: VALUE): OBJECT | NULL")
            arguments[0].parent ?: FluoriteNull
        },
        *run {
            fun create(signature: String): FluoriteValue {
                return FluoriteFunction.create { arguments ->
                    if (arguments.isEmpty()) usage(signature)
                    val clazz = arguments[0]() as FluoriteObject
                    val instance = FluoriteObject(clazz, mutableMapOf())
                    instance.callMethod(null, "init", arguments.sliceArray(1 until arguments.size)).consume()
                    instance
                }
            }
            arrayOf(
                "NEW" define create("NEW(clazz: OBJECT; arguments: VALUE...): OBJECT"),
                "::NEW" define fluoriteArrayOf(
                    FluoriteObject.fluoriteClass colon create("OBJECT::NEW(arguments: VALUE...): OBJECT"),
                ),
            )
        },
    ).let { listOf(it) }
}
