package mirrg.xarpite.js

import kotlinx.coroutines.await
import mirrg.xarpite.RuntimeContext
import mirrg.xarpite.compilers.objects.FluoriteFunction
import mirrg.xarpite.compilers.objects.FluoriteValue
import mirrg.xarpite.compilers.objects.toFluoriteString
import kotlin.js.Promise

context(context: RuntimeContext)
fun createJsMounts(): List<Map<String, FluoriteValue>> {
    return mapOf(
        "JS_OBJECT" to FluoriteJsObject.fluoriteClass,
        "ASYNC" to FluoriteFunction { arguments ->
            if (arguments.size != 1) throw IllegalArgumentException("Invalid number of arguments: ${arguments.size}")
            val function = arguments[0] as FluoriteFunction
            FluoriteJsObject(function.toJsAsyncFunction())
        },
        "AWAIT" to FluoriteFunction { arguments ->
            if (arguments.size != 1) throw IllegalArgumentException("Invalid number of arguments: ${arguments.size}")
            val promise = arguments[0] as FluoriteJsObject
            convertToFluoriteValue((promise.value as Promise<*>).await())
        },
        "JS" to FluoriteFunction { arguments ->
            if (arguments.size != 1) throw IllegalArgumentException("Invalid number of arguments: ${arguments.size}")
            val js = arguments[0].toFluoriteString()
            convertToFluoriteValue(eval(js.value))
        },
    ).let { listOf(it) }
}
