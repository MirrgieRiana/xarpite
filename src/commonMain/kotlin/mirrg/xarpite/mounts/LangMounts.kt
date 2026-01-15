package mirrg.xarpite.mounts

import kotlinx.coroutines.delay
import kotlinx.coroutines.launch
import kotlinx.coroutines.yield
import mirrg.xarpite.RuntimeContext
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
import mirrg.xarpite.compilers.objects.colon
import mirrg.xarpite.compilers.objects.consume
import mirrg.xarpite.compilers.objects.fluoriteArrayOf
import mirrg.xarpite.compilers.objects.invoke

private var nextCoroutineId = 1

context(context: RuntimeContext)
fun createLangMounts(): List<Map<String, FluoriteValue>> {
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
        val coroutineId = nextCoroutineId
        context.coroutineScope.launch {
            try {
                promise.deferred.complete(function.invoke(emptyArray()).cache())
            } catch (e: Throwable) {
                try {
                    val errorMessage = "COROUTINE[$coroutineId]: ${e.message ?: e.toString()}\n"
                    context.io.writeBytesToStderr(errorMessage.encodeToByteArray())
                } catch (_: Throwable) {
                    // stderrへの出力に失敗しても、元の例外処理は継続する
                }
                promise.deferred.completeExceptionally(e)
            }
        }
        nextCoroutineId++
        promise
    }
    mounts["OUT"] = FluoriteFunction { arguments ->
        arguments.forEach {
            if (it is FluoriteStream) {
                it.collect { item ->
                    context.io.out(item)
                }
            } else {
                context.io.out(it)
            }
        }
        FluoriteNull
    }
    run {
        fun create(signature: String): FluoriteValue {
            return FluoriteFunction { arguments ->
                if (arguments.size == 2) {
                    val self = arguments[0]
                    val block = arguments[1]
                    block.invoke(arrayOf(self))
                } else {
                    usage(signature)
                }
            }
        }
        mounts["LET"] = create("<I, O> LET(receiver: I; block: I -> O): O")
        mounts["::LET"] = fluoriteArrayOf(
            FluoriteValue.fluoriteClass colon create("<I, O> I::LET(block: I -> O): O"),
        )
    }
    run {
        fun create(signature: String): FluoriteValue {
            return FluoriteFunction { arguments ->
                if (arguments.size == 2) {
                    val self = arguments[0]
                    val block = arguments[1]
                    block.invoke(arrayOf(self)).consume()
                    self
                } else {
                    usage(signature)
                }
            }
        }
        mounts["ALSO"] = create("<T> ALSO(receiver: T; block: T -> VALUE): T")
        mounts["::ALSO"] = fluoriteArrayOf(
            FluoriteValue.fluoriteClass colon create("<T> T::ALSO(block: T -> VALUE): T"),
        )
    }
    mounts["LAZY"] = FluoriteFunction { arguments ->
        if (arguments.size != 1) usage("<T> LAZY(initializer: () -> T): () -> T")
        val initializer = arguments[0]
        var value: FluoriteValue? = null
        FluoriteFunction {
            if (value == null) {
                val value2 = initializer.invoke(emptyArray()).cache()
                value = value2
                value2
            } else {
                value
            }
        }
    }

    return listOf(mounts)
}
