package mirrg.xarpite.compilers.objects

import kotlinx.coroutines.CompletableDeferred
import mirrg.xarpite.mounts.usage
import kotlin.coroutines.cancellation.CancellationException

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
                        promise.deferred.completeExceptionally(error.toThrowable())
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
                        } catch (e: CancellationException) {
                            throw e
                        } catch (e: Throwable) {
                            e.toFluoriteValue()
                        }
                    },
                    "awaitIsSuccess" to FluoriteFunction.immediate { arguments ->
                        if (arguments.size != 1) usage("<T> PROMISE<T>::awaitIsSuccess(): BOOLEAN")
                        val promise = arguments[0] as FluoritePromise
                        try {
                            promise.deferred.await()
                            true.toFluoriteBoolean()
                        } catch (e: CancellationException) {
                            throw e
                        } catch (e: Throwable) {
                            false.toFluoriteBoolean()
                        }
                    },
                    "awaitIsFailure" to FluoriteFunction.immediate { arguments ->
                        if (arguments.size != 1) usage("<T> PROMISE<T>::awaitIsFailure(): BOOLEAN")
                        val promise = arguments[0] as FluoritePromise
                        try {
                            promise.deferred.await()
                            false.toFluoriteBoolean()
                        } catch (e: CancellationException) {
                            throw e
                        } catch (e: Throwable) {
                            true.toFluoriteBoolean()
                        }
                    },
                    "isCompleted" to FluoriteFunction.immediate { arguments ->
                        if (arguments.size != 1) usage("<T> PROMISE<T>::isCompleted(): BOOLEAN")
                        val promise = arguments[0] as FluoritePromise
                        promise.deferred.isCompleted.toFluoriteBoolean()
                    },
                    "isFinished" to FluoriteFunction.immediate { arguments ->
                        if (arguments.size != 1) usage("<T> PROMISE<T>::isFinished(): BOOLEAN")
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
    override fun strictEquals(other: FluoriteValue) = this === other
}
