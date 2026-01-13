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
import mirrg.xarpite.compilers.objects.invoke

fun createLangMounts(coroutineScope: CoroutineScope, out: suspend (FluoriteValue) -> Unit): List<Map<String, FluoriteValue>> {
    val mounts = mutableMapOf<String, FluoriteValue>()

    mounts["NULL"] = FluoriteNull
    mounts["N"] = FluoriteNull
    mounts["TRUE"] = FluoriteBoolean.TRUE
    mounts["T"] = FluoriteBoolean.TRUE
    mounts["FALSE"] = FluoriteBoolean.FALSE
    mounts["F"] = FluoriteBoolean.FALSE
    mounts["EMPTY"] = FluoriteStream.EMPTY
    mounts["E"] = FluoriteStream.EMPTY
    mounts["LOOP"] = FluoriteStream {
        while (true) {
            emit(FluoriteNull)
        }
    }
    mounts["SLEEP"] = FluoriteFunction { arguments ->
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
    }
    mounts["CALL"] = FluoriteFunction { arguments ->
        if (arguments.size != 2) usage("CALL(function: FUNCTION; arguments: ARRAY<VALUE>): VALUE")
        val function = arguments[0]
        val argumentsArray = arguments[1] as FluoriteArray
        function.invoke(argumentsArray.values.toTypedArray())
    }
    mounts["LAUNCH"] = FluoriteFunction { arguments ->
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
    }
    mounts["OUT"] = FluoriteFunction { arguments ->
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
    }

    return listOf(mounts)
}
