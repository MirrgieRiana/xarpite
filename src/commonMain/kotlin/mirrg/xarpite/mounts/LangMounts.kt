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
import mirrg.xarpite.compilers.objects.colon
import mirrg.xarpite.compilers.objects.collect
import mirrg.xarpite.compilers.objects.consume
import mirrg.xarpite.compilers.objects.fluoriteArrayOf
import mirrg.xarpite.compilers.objects.invoke

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
            coroutineScope.launch {
                try {
                    promise.deferred.complete(function.invoke(emptyArray()).cache())
                } catch (e: Throwable) {
                    promise.deferred.completeExceptionally(e)
                }
            }
            promise
        },
        "GENERATE" to FluoriteFunction { arguments ->
            if (arguments.size != 1) usage("GENERATE(generator: (yield: (value: VALUE) -> NULL) -> NULL | STREAM): STREAM<VALUE>")
            val generator = arguments[0]
            FluoriteStream {
                val yieldFunction = FluoriteFunction { arguments2 ->
                    if (arguments2.size != 1) usage("yield(value: VALUE): NULL")
                    val value = arguments2[0]
                    emit(value)
                    FluoriteNull
                }
                generator.invoke(arrayOf(yieldFunction)).consume()
            }
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
        "::LET" to fluoriteArrayOf(
            FluoriteValue.fluoriteClass colon FluoriteFunction { arguments ->
                if (arguments.size != 2) usage("<I, O> I::LET(block: I -> O): O")
                val self = arguments[0]
                val block = arguments[1]
                block.invoke(arrayOf(self))
            },
            FluoriteStream.fluoriteClass colon FluoriteFunction { arguments ->
                if (arguments.size != 2) usage("<I, O> I::LET(block: I -> O): O")
                val self = arguments[0]
                val block = arguments[1]
                block.invoke(arrayOf(self))
            },
        ),
        "::ALSO" to fluoriteArrayOf(
            FluoriteValue.fluoriteClass colon FluoriteFunction { arguments ->
                if (arguments.size != 2) usage("<T> T::ALSO(block: T -> VALUE): T")
                val self = arguments[0]
                val block = arguments[1]
                block.invoke(arrayOf(self)).consume()
                self
            },
            FluoriteStream.fluoriteClass colon FluoriteFunction { arguments ->
                if (arguments.size != 2) usage("<T> T::ALSO(block: T -> VALUE): T")
                val self = arguments[0]
                val block = arguments[1]
                block.invoke(arrayOf(self)).consume()
                self
            },
        ),
    ).let { listOf(it) }
}
