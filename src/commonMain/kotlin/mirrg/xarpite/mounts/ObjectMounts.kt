package mirrg.xarpite.mounts

import mirrg.xarpite.Mount
import mirrg.xarpite.RuntimeContext
import mirrg.xarpite.compilers.objects.FluoriteFunction
import mirrg.xarpite.compilers.objects.FluoriteNull
import mirrg.xarpite.define

context(context: RuntimeContext)
fun createObjectMounts(): List<Map<String, Mount>> {
    return mapOf(
        "PARENT" define FluoriteFunction.immediate { arguments ->
            if (arguments.size != 1) usage("PARENT(value: VALUE): OBJECT | NULL")
            arguments[0].parent ?: FluoriteNull
        },
    ).let { listOf(it) }
}
