package mirrg.xarpite.mounts

import mirrg.xarpite.Mount
import mirrg.xarpite.RuntimeContext
import mirrg.xarpite.compilers.objects.FluoriteFunction
import mirrg.xarpite.compilers.objects.FluoriteNull
import mirrg.xarpite.define

context(context: RuntimeContext)
fun createObjectMounts(): List<Map<String, Mount>> {
    fun createParent(name: String): FluoriteFunction {
        return FluoriteFunction.immediate { arguments ->
            if (arguments.size != 1) usage("$name(value: VALUE): OBJECT | NULL")
            arguments[0].parent ?: FluoriteNull
        }
    }
    return mapOf(
        "PARENT" define createParent("PARENT"),
        "TYPE" define createParent("TYPE"),
    ).let { listOf(it) }
}
