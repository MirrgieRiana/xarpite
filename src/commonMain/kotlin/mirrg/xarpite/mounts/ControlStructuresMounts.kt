package mirrg.xarpite.mounts

import mirrg.xarpite.Mount
import mirrg.xarpite.RuntimeContext
import mirrg.xarpite.compilers.objects.FluoriteFunction
import mirrg.xarpite.compilers.objects.FluoriteNull
import mirrg.xarpite.compilers.objects.FluoritePromise
import mirrg.xarpite.compilers.objects.cache
import mirrg.xarpite.compilers.objects.consume
import mirrg.xarpite.compilers.objects.invoke
import mirrg.xarpite.compilers.objects.toBoolean
import mirrg.xarpite.define
import mirrg.xarpite.operations.Returner
import kotlin.coroutines.cancellation.CancellationException

context(context: RuntimeContext)
fun createControlStructuresMounts(): List<Map<String, Mount>> {
    return mapOf(
        "WHILE" define FluoriteFunction { arguments ->
            if (arguments.size != 2) usage("WHILE(condition: () -> BOOLEAN; block: () -> VALUE): NULL")
            val condition = arguments[0]
            val block = arguments[1]
            while (true) {
                val conditionResult = condition.invoke(null, emptyArray())
                if (!conditionResult.toBoolean(null)) break
                block.invoke(null, emptyArray()).consume()
            }
            FluoriteNull
        },
        "TRY" define FluoriteFunction { arguments ->
            if (arguments.size != 1) usage("<T> TRY(block: () -> T): PROMISE<T>")
            val block = arguments[0]
            val promise = FluoritePromise()
            val value = try {
                block.invoke(null, emptyArray()).cache()
            } catch (e: Returner) {
                throw e
            } catch (e: CancellationException) {
                throw e
            } catch (e: Throwable) {
                promise.deferred.completeExceptionally(e)
                return@FluoriteFunction promise
            }
            promise.deferred.complete(value)
            promise
        },
    ).let { listOf(it) }
}
