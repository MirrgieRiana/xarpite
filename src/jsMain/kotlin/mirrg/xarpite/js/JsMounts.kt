package mirrg.xarpite.js

import kotlinx.coroutines.await
import mirrg.xarpite.Mount
import mirrg.xarpite.RuntimeContext
import mirrg.xarpite.compilers.objects.FluoriteFunction
import mirrg.xarpite.compilers.objects.toFluoriteString
import mirrg.xarpite.define
import kotlin.js.Promise

context(context: RuntimeContext)
fun createJsMounts(): List<Map<String, Mount>> {
    return mapOf(
        "JS_OBJECT" define FluoriteJsObject.fluoriteClass,
        "ASYNC" define FluoriteFunction { arguments ->
            if (arguments.size != 1) throw IllegalArgumentException("Invalid number of arguments: ${arguments.size}")
            val function = arguments[0] as FluoriteFunction
            FluoriteJsObject(function.toJsAsyncFunction())
        },
        "AWAIT" define FluoriteFunction { arguments ->
            if (arguments.size != 1) throw IllegalArgumentException("Invalid number of arguments: ${arguments.size}")
            val promise = arguments[0] as FluoriteJsObject
            convertToFluoriteValue((promise.value as Promise<*>).await())
        },
        "JS" define FluoriteFunction { arguments ->
            if (arguments.size != 1) throw IllegalArgumentException("Invalid number of arguments: ${arguments.size}")
            val js = arguments[0].toFluoriteString(null)
            convertToFluoriteValue(eval(js.value))
        },
    ).let { listOf(it) }
}
