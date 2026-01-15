package mirrg.xarpite.js.browser

import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.SupervisorJob
import kotlinx.coroutines.await
import kotlinx.coroutines.cancel
import kotlinx.coroutines.coroutineScope
import kotlinx.coroutines.promise
import mirrg.xarpite.Evaluator
import mirrg.xarpite.RuntimeContext
import mirrg.xarpite.compilers.objects.FluoriteStream
import mirrg.xarpite.compilers.objects.FluoriteValue
import mirrg.xarpite.compilers.objects.cache
import mirrg.xarpite.compilers.objects.collect
import mirrg.xarpite.compilers.objects.toFluoriteString
import mirrg.xarpite.js.createJsMounts
import mirrg.xarpite.js.scope
import mirrg.xarpite.mounts.createCommonMounts
import kotlin.js.Promise

@OptIn(ExperimentalJsExport::class)
@JsExport
fun evaluate(src: String, quiet: Boolean, out: (dynamic) -> Promise<Unit>): Promise<dynamic> = scope.promise {
    val daemonScope = CoroutineScope(coroutineContext + SupervisorJob())
    try {
        coroutineScope main@{
            val context = object : RuntimeContext {
                override val coroutineScope get() = this@main
                override val daemonScope get() = daemonScope
                override suspend fun out(value: FluoriteValue) = out(value).await()
            }
            val evaluator = Evaluator()
            evaluator.defineMounts(context.run { createCommonMounts() + createJsMounts() + createJsBrowserMounts() })
            if (quiet) {
                evaluator.run(src)
                undefined
            } else {
                evaluator.get(src).cache()
            }
        }
    } finally {
        daemonScope.cancel()
    }
}

@OptIn(ExperimentalJsExport::class)
@JsExport
fun log(value: dynamic): Promise<Unit> = scope.promise {
    val value = value.unsafeCast<FluoriteValue>()
    if (value is FluoriteStream) {
        value.collect {
            console.log(it)
        }
    } else {
        console.log(value)
    }
}

@OptIn(ExperimentalJsExport::class)
@JsExport
fun stringify(value: dynamic): Promise<String> = scope.promise {
    val value = value.unsafeCast<FluoriteValue>()
    suspend fun f(value: FluoriteValue): String {
        return if (value is FluoriteStream) {
            val sb = StringBuilder()
            var isFirst = true
            value.collect {
                if (isFirst) {
                    isFirst = false
                } else {
                    sb.append('\n')
                }
                sb.append(f(it))
            }
            sb.toString()
        } else {
            value.toFluoriteString().value
        }
    }
    f(value)
}
