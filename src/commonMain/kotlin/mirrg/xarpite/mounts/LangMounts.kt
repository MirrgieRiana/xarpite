package mirrg.xarpite.mounts

import kotlinx.coroutines.delay
import kotlinx.coroutines.launch
import kotlinx.coroutines.yield
import mirrg.xarpite.Mount
import mirrg.xarpite.RuntimeContext
import mirrg.xarpite.StackTrace
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
import mirrg.xarpite.compilers.objects.contains
import mirrg.xarpite.compilers.objects.fluoriteArrayOf
import mirrg.xarpite.compilers.objects.invoke
import mirrg.xarpite.compilers.objects.invokeImmediate
import mirrg.xarpite.compilers.objects.toFluoriteString
import mirrg.xarpite.copy
import mirrg.xarpite.define
import kotlin.coroutines.EmptyCoroutineContext
import kotlin.coroutines.coroutineContext
import kotlin.math.roundToLong

private var nextCoroutineId = 1

context(context: RuntimeContext)
fun createLangMounts(): List<Map<String, Mount>> {
    return mapOf(

        "NULL" define FluoriteNull,
        "N" define FluoriteNull,
        "TRUE" define FluoriteBoolean.TRUE,
        "T" define FluoriteBoolean.TRUE,
        "FALSE" define FluoriteBoolean.FALSE,
        "F" define FluoriteBoolean.FALSE,
        "EMPTY" define FluoriteStream.EMPTY,
        "E" define FluoriteStream.EMPTY,
        "LOOP" define FluoriteStream {
            while (true) {
                emit(FluoriteNull)
            }
        },
        "SLEEP" define FluoriteFunction.immediate { arguments ->
            when (arguments.size) {
                0 -> yield()

                1 -> {
                    val time = arguments[0] as FluoriteNumber
                    val millis = if (context.apiVersion >= 5) (time.toDouble() * 1000.0).roundToLong() else time.toInt().toLong()
                    if (millis == 0L) {
                        yield()
                    } else {
                        delay(millis)
                    }
                }

                else -> usage(if (context.apiVersion >= 5) "SLEEP([seconds: NUMBER]): NULL" else "SLEEP([milliseconds: NUMBER]): NULL")
            }
            FluoriteNull
        },
        "NOP" define FluoriteFunction.immediate { arguments ->
            if (arguments.size != 0) usage("NOP(): NULL")
            FluoriteNull
        },
        "RUN" define FluoriteFunction.immediate { arguments ->
            if (arguments.size != 1) usage("<T> RUN(function: () -> T): T")
            val function = arguments[0]
            function.invokeImmediate(null, emptyArray())
        },
        "CALL" define FluoriteFunction.immediate { arguments ->
            if (arguments.size != 2) usage("<A..., T> CALL(function: (A) -> T; arguments: [A]): T")
            val function = arguments[0]
            val argumentsArray = arguments[1] as FluoriteArray
            function.invokeImmediate(null, argumentsArray.values.toTypedArray())
        },
        "LAUNCH" define FluoriteFunction.immediate { arguments ->
            if (arguments.size != 1) usage("<T> LAUNCH(function: () -> T): PROMISE<T>")
            val function = arguments[0]
            val promise = FluoritePromise()
            val coroutineId = nextCoroutineId
            context.coroutineScope.launch(coroutineContext[StackTrace.Key]?.copy() ?: EmptyCoroutineContext) {
                try {
                    promise.deferred.complete(function.invoke(null, emptyArray()).cache())
                } catch (e: Throwable) {
                    try {
                        context.io.err("COROUTINE[$coroutineId]: ${e.message ?: e.toString()}".toFluoriteString())
                    } catch (_: Throwable) {
                        // stderrへの出力に失敗しても、元の例外処理は継続する
                    }
                    promise.deferred.completeExceptionally(e)
                }
            }
            nextCoroutineId++
            promise
        },
        "LAUNCH2" define FluoriteFunction.create { arguments ->
            if (arguments.size != 1) usage("<T> LAUNCH2(function(): T): PROMISE<T>")
            val function = arguments[0]
            val promise = FluoritePromise()
            val coroutineId = nextCoroutineId
            context.coroutineScope.launch(coroutineContext[StackTrace.Key]?.copy() ?: EmptyCoroutineContext) {
                try {
                    promise.deferred.complete(function().cache())
                } catch (e: Throwable) {
                    try {
                        context.io.err("COROUTINE[$coroutineId]: ${e.message ?: e.toString()}".toFluoriteString())
                    } catch (_: Throwable) {
                        // stderrへの出力に失敗しても、元の例外処理は継続する
                    }
                    promise.deferred.completeExceptionally(e)
                }
            }
            nextCoroutineId++
            promise
        },
        *run {
            fun create(): FluoriteValue {
                return FluoriteFunction.immediate { arguments ->
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
            }
            arrayOf(
                "OUT" define create(),
                "O" define create(),
            )
        },
        *run {
            fun create(signature: String): FluoriteValue {
                return FluoriteFunction.immediate { arguments ->
                    if (arguments.size == 2) {
                        val self = arguments[0]
                        val block = arguments[1]
                        block.invokeImmediate(null, arrayOf(self))
                    } else {
                        usage(signature)
                    }
                }
            }
            arrayOf(
                "LET" define create("<I, O> LET(receiver: I; block: I -> O): O"),
                "::LET" define fluoriteArrayOf(
                    FluoriteValue.fluoriteClass colon create("<I, O> I::LET(block: I -> O): O"),
                ),
            )
        },
        *run {
            fun create(signature: String): FluoriteValue {
                return FluoriteFunction.immediate { arguments ->
                    if (arguments.size == 2) {
                        val self = arguments[0]
                        val block = arguments[1]
                        block.invokeImmediate(null, arrayOf(self)).consume()
                        self
                    } else {
                        usage(signature)
                    }
                }
            }
            arrayOf(
                "ALSO" define create("<T> ALSO(receiver: T; block: T -> VALUE): T"),
                "::ALSO" define fluoriteArrayOf(
                    FluoriteValue.fluoriteClass colon create("<T> T::ALSO(block: T -> VALUE): T"),
                ),
            )
        },
        "::CONTAINS" define fluoriteArrayOf(
            FluoriteValue.fluoriteClass colon FluoriteFunction.immediate { arguments ->
                if (arguments.size != 2) usage("VALUE::CONTAINS(content: VALUE): BOOLEAN")
                arguments[0].contains(null, arguments[1])
            },
        ),
        "PARENT" define FluoriteFunction.immediate { arguments ->
            if (arguments.size == 1) {
                arguments[0].parent ?: FluoriteNull
            } else {
                usage("PARENT(value: VALUE): OBJECT | NULL")
            }
        },
        "LAZY" define FluoriteFunction.immediate { arguments ->
            if (arguments.size != 1) usage("<T> LAZY(initializer: () -> T): () -> T")
            val initializer = arguments[0]
            var value: FluoriteValue? = null
            FluoriteFunction.immediate {
                if (value == null) {
                    val value2 = initializer.invoke(null, emptyArray()).cache()
                    value = value2
                    value2
                } else {
                    value
                }
            }
        },
        "LAZY2" define FluoriteFunction.create { arguments ->
            if (arguments.size != 1) usage("<T> LAZY2(initializer(): T): () -> T")
            val initializer = arguments[0]
            var value: FluoriteValue? = null
            FluoriteFunction.immediate {
                if (value == null) {
                    val value2 = initializer().cache()
                    value = value2
                    value2
                } else {
                    value
                }
            }
        },

        ).let { listOf(it) }
}
