package mirrg.xarpite.compilers.objects

import kotlinx.coroutines.CompletableDeferred
import mirrg.xarpite.mounts.usage
import kotlin.coroutines.cancellation.CancellationException

class FluoritePromise(override val parent: FluoriteObject) : FluoriteValue {
    companion object {
        // APIバージョン6からはisCompletedが削除されるため、その有無だけが異なる2種類のクラスを用意するのだ
        private val fluoriteClass by lazy { createFluoriteClass(hasIsCompleted = true) }
        private val fluoriteClassWithoutIsCompleted by lazy { createFluoriteClass(hasIsCompleted = false) }

        fun getFluoriteClass(apiVersion: Int) = if (apiVersion >= 6) fluoriteClassWithoutIsCompleted else fluoriteClass

        private fun createFluoriteClass(hasIsCompleted: Boolean): FluoriteObject {
            lateinit var fluoriteClass: FluoriteObject
            fluoriteClass = FluoriteObject(
                FluoriteValue.fluoriteClass, mutableMapOf<String, FluoriteValue>().apply {
                    put("new", FluoriteFunction.immediate { arguments ->
                        FluoritePromise(fluoriteClass)
                    })
                    put("complete", FluoriteFunction.immediate { arguments ->
                        val (promise, value) = when (arguments.size) {
                            1 -> Pair(arguments[0] as FluoritePromise, FluoriteNull)
                            2 -> Pair(arguments[0] as FluoritePromise, arguments[1])
                            else -> usage("<T> PROMISE<T>::complete([value: T]): NULL")
                        }
                        promise.deferred.complete(value)
                        FluoriteNull
                    })
                    put("fail", FluoriteFunction.immediate { arguments ->
                        val (promise, error) = when (arguments.size) {
                            1 -> Pair(arguments[0] as FluoritePromise, FluoriteNull)
                            2 -> Pair(arguments[0] as FluoritePromise, arguments[1])
                            else -> usage("<T> PROMISE<T>::fail([error: VALUE]): NULL")
                        }
                        promise.deferred.completeExceptionally(error.toThrowable())
                        FluoriteNull
                    })
                    put("await", FluoriteFunction.immediate { arguments ->
                        if (arguments.size != 1) usage("<T> PROMISE<T>::await(): T")
                        val promise = arguments[0] as FluoritePromise
                        promise.deferred.await()
                    })
                    put("awaitException", FluoriteFunction.immediate { arguments ->
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
                    })
                    put("awaitIsSuccess", FluoriteFunction.immediate { arguments ->
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
                    })
                    put("awaitIsFailure", FluoriteFunction.immediate { arguments ->
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
                    })
                    if (hasIsCompleted) {
                        put("isCompleted", FluoriteFunction.immediate { arguments ->
                            if (arguments.size != 1) usage("<T> PROMISE<T>::isCompleted(): BOOLEAN")
                            val promise = arguments[0] as FluoritePromise
                            promise.deferred.isCompleted.toFluoriteBoolean()
                        })
                    }
                    put("isFinished", FluoriteFunction.immediate { arguments ->
                        if (arguments.size != 1) usage("<T> PROMISE<T>::isFinished(): BOOLEAN")
                        val promise = arguments[0] as FluoritePromise
                        promise.deferred.isCompleted.toFluoriteBoolean()
                    })
                }
            )
            return fluoriteClass
        }
    }

    val deferred = CompletableDeferred<FluoriteValue>()

    override fun toString() = "PROMISE[state=${if (deferred.isCompleted) "completed" else "pending"}]"
    override fun strictEquals(other: FluoriteValue) = this === other
}
