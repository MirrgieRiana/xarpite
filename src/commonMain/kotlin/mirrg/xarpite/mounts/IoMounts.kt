package mirrg.xarpite.mounts

import mirrg.xarpite.Mount
import mirrg.xarpite.RuntimeContext
import mirrg.xarpite.compilers.objects.FluoriteFunction
import mirrg.xarpite.compilers.objects.asFluoriteBlob
import mirrg.xarpite.compilers.objects.toFluoriteString
import mirrg.xarpite.define

context(context: RuntimeContext)
fun createIoMounts(): List<Map<String, Mount>> {
    return mapOf(
        "FETCH" define FluoriteFunction { arguments ->
            if (arguments.size != 1) usage("FETCH(url: STRING): STRING")
            val url = arguments[0].toFluoriteString(null).value
            val bytes = context.io.fetch(url)
            bytes.decodeToString().toFluoriteString()
        },
        "FETCHB" define FluoriteFunction { arguments ->
            if (arguments.size != 1) usage("FETCHB(url: STRING): BLOB")
            val url = arguments[0].toFluoriteString(null).value
            val bytes = context.io.fetch(url)
            bytes.asFluoriteBlob()
        },
    ).let { listOf(it) }
}
