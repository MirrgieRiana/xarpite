package mirrg.xarpite.js.browser

import io.ktor.client.request.get
import io.ktor.client.statement.readRawBytes
import kotlinx.browser.window
import kotlinx.coroutines.await
import kotlinx.coroutines.promise
import mirrg.xarpite.IoContext
import mirrg.xarpite.RuntimeContext
import mirrg.xarpite.compilers.objects.FluoriteStream
import mirrg.xarpite.compilers.objects.FluoriteValue
import mirrg.xarpite.compilers.objects.cache
import mirrg.xarpite.compilers.objects.collect
import mirrg.xarpite.compilers.objects.toFluoriteString
import mirrg.xarpite.js.createJsMounts
import mirrg.xarpite.js.scope
import mirrg.xarpite.mounts.createCommonMounts
import mirrg.xarpite.operations.FluoriteException
import mirrg.xarpite.withEvaluator
import kotlin.js.Promise

@OptIn(ExperimentalJsExport::class)
@JsExport
fun evaluate(src: String, quiet: Boolean, out: (dynamic) -> Promise<Unit>): Promise<dynamic> = scope.promise {
    withEvaluator(object : IoContext {
        override fun getEnv() = throw UnsupportedOperationException()
        override fun getPlatformPwd() = window.location.href
        override suspend fun out(value: FluoriteValue) = out(value).await()
        override suspend fun err(value: FluoriteValue) = out(value).await()
        override suspend fun readLineFromStdin() = throw UnsupportedOperationException()
        override suspend fun readBytesFromStdin() = throw UnsupportedOperationException()
        override suspend fun writeBytesToStdout(bytes: ByteArray) = throw UnsupportedOperationException()
        override suspend fun writeBytesToStderr(bytes: ByteArray) = throw UnsupportedOperationException()
        override suspend fun executeProcess(process: String, args: List<String>, env: Map<String, String?>) = throw UnsupportedOperationException()
        override suspend fun fetch(context: RuntimeContext, url: String): ByteArray = context.httpClient.get(url).readRawBytes()
        override fun exit(code: Int): Nothing = throw UnsupportedOperationException("EXIT is not supported in browser environment")
    }) { context, evaluator ->
        context.setSrc("-", src)
        evaluator.defineMounts(context.run { createCommonMounts() + createJsMounts() + createJsBrowserMounts() })
        try {
            if (quiet) {
                evaluator.run("-", src)
                undefined
            } else {
                evaluator.get("-", src).cache()
            }
        } catch (e: FluoriteException) {
            context.io.err("ERROR: ${e.message}".toFluoriteString())
            e.stackTrace?.reversed()?.forEach { position ->
                context.io.err("  at ${context.renderPosition(position)}".toFluoriteString())
            }
        }
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
            value.toFluoriteString(null).value
        }
    }
    f(value)
}
