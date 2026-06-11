package mirrg.xarpite.compilers.objects

import kotlinx.coroutines.CompletableDeferred
import mirrg.xarpite.mounts.usage
import mirrg.xarpite.operations.FluoriteException

class FluoritePromise : FluoriteValue {
    companion object {
        val fluoriteClass by lazy {
            FluoriteObject(
                FluoriteValue.fluoriteClass, mutableMapOf(
                    "new" to FluoriteFunction.immediate { arguments ->
                        FluoritePromise()
                    },
                    "complete" to FluoriteFunction.immediate { arguments ->
                        val (promise, value) = when (arguments.size) {
                            1 -> Pair(arguments[0] as FluoritePromise, FluoriteNull)
                            2 -> Pair(arguments[0] as FluoritePromise, arguments[1])
                            else -> usage("<T> PROMISE<T>::complete([value: T]): NULL")
                        }
                        promise.deferred.complete(value)
                        FluoriteNull
                    },
                    "fail" to FluoriteFunction.immediate { arguments ->
                        val (promise, error) = when (arguments.size) {
                            1 -> Pair(arguments[0] as FluoritePromise, FluoriteNull)
                            2 -> Pair(arguments[0] as FluoritePromise, arguments[1])
                            else -> usage("<T> PROMISE<T>::fail([error: VALUE]): NULL")
                        }
                        promise.deferred.completeExceptionally(FluoriteException(error))
                        FluoriteNull
                    },
                    "await" to FluoriteFunction.immediate { arguments ->
                        if (arguments.size != 1) usage("<T> PROMISE<T>::await(): T")
                        val promise = arguments[0] as FluoritePromise
                        promise.deferred.await()
                    },
                    "awaitException" to FluoriteFunction.immediate { arguments ->
                        if (arguments.size != 1) usage("<T> PROMISE<T>::awaitException(): VALUE")
                        val promise = arguments[0] as FluoritePromise
                        try {
                            promise.deferred.await()
                            FluoriteNull
                        } catch (e: FluoriteException) {
                            e.value
                        }
                    },
                    "isCompleted" to FluoriteFunction.immediate { arguments ->
                        if (arguments.size != 1) usage("<T> PROMISE<T>::isCompleted(): BOOLEAN")
                        val promise = arguments[0] as FluoritePromise
                        promise.deferred.isCompleted.toFluoriteBoolean()
                    },
                )
            )
        }
    }

    val deferred = CompletableDeferred<FluoriteValue>()

    override fun toString() = "PROMISE[state=${if (deferred.isCompleted) "completed" else "pending"}]"
    override val parent get() = fluoriteClass
}
