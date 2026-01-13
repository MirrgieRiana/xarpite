package mirrg.xarpite.mounts

import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch
import kotlinx.coroutines.yield
import mirrg.xarpite.compilers.objects.FluoriteArray
import mirrg.xarpite.compilers.objects.FluoriteBoolean
import mirrg.xarpite.compilers.objects.FluoriteFunction
import mirrg.xarpite.compilers.objects.FluoriteNull
import mirrg.xarpite.compilers.objects.FluoriteNumber
import mirrg.xarpite.compilers.objects.FluoritePromise
import mirrg.xarpite.compilers.objects.FluoriteStream
import mirrg.xarpite.compilers.objects.FluoriteValue
import mirrg.xarpite.compilers.objects.cache
import mirrg.xarpite.compilers.objects.collect
import mirrg.xarpite.compilers.objects.consume
import mirrg.xarpite.compilers.objects.invoke
import writeBytesToStderr

private var nextCoroutineId = 1

fun createLangMounts(coroutineScope: CoroutineScope, out: suspend (FluoriteValue) -> Unit): List<Map<String, FluoriteValue>> {
    return mapOf(
        "NULL" to FluoriteNull,
        "N" to FluoriteNull,
        "TRUE" to FluoriteBoolean.TRUE,
        "T" to FluoriteBoolean.TRUE,
        "FALSE" to FluoriteBoolean.FALSE,
        "F" to FluoriteBoolean.FALSE,
        "EMPTY" to FluoriteStream.EMPTY,
        "E" to FluoriteStream.EMPTY,
        "LOOP" to FluoriteStream {
            while (true) {
                emit(FluoriteNull)
            }
        },
        "SLEEP" to FluoriteFunction { arguments ->
            when (arguments.size) {
                0 -> yield()

                1 -> {
                    val time = arguments[0] as FluoriteNumber
                    val millis = time.toInt().toLong()
                    if (millis == 0L) {
                        yield()
                    } else {
                        delay(millis)
                    }
                }

                else -> usage("SLEEP([milliseconds: NUMBER]): NULL")
            }
            FluoriteNull
        },
        "CALL" to FluoriteFunction { arguments ->
            if (arguments.size != 2) usage("CALL(function: FUNCTION; arguments: ARRAY<VALUE>): VALUE")
            val function = arguments[0]
            val argumentsArray = arguments[1] as FluoriteArray
            function.invoke(argumentsArray.values.toTypedArray())
        },
        "LAUNCH" to FluoriteFunction { arguments ->
            if (arguments.size != 1) usage("<T> LAUNCH(function: () -> T): PROMISE<T>")
            val function = arguments[0]
            val promise = FluoritePromise()
            val coroutineId = nextCoroutineId
            coroutineScope.launch {
                try {
                    promise.deferred.complete(function.invoke(emptyArray()).cache())
                } catch (e: Throwable) {
                    try {
                        val errorMessage = "COROUTINE[$coroutineId]: ${e.message ?: e.toString()}\n"
                        writeBytesToStderr(errorMessage.encodeToByteArray())
                    } catch (_: Throwable) {
                        // stderrへの出力に失敗しても、元の例外処理は継続する
                    }
                    promise.deferred.completeExceptionally(e)
                }
            }
            nextCoroutineId++
            promise
        },
        "OUT" to FluoriteFunction { arguments ->
            arguments.forEach {
                if (it is FluoriteStream) {
                    it.collect { item ->
                        out(item)
                    }
                } else {
                    out(it)
                }
            }
            FluoriteNull
        },
    ).let { listOf(it) }
}
