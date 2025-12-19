package mirrg.xarpite.cli

import kotlinx.coroutines.CoroutineScope
import mirrg.xarpite.Evaluator
import mirrg.xarpite.compilers.objects.FluoriteStream
import mirrg.xarpite.compilers.objects.FluoriteValue
import mirrg.xarpite.compilers.objects.collect
import mirrg.xarpite.compilers.objects.toFluoriteString
import mirrg.xarpite.mounts.createCommonMounts

suspend fun main(options: Options, coroutineScope: CoroutineScope, createExtraMounts: () -> List<Map<String, FluoriteValue>> = { emptyList() }) {
    val evaluator = Evaluator()
    val out: suspend (FluoriteValue) -> Unit = { println(it.toFluoriteString().value) }
    val defaultBuiltinMounts = listOf(
        createCommonMounts(coroutineScope, out),
        createCliMounts(options.arguments, coroutineScope, out),
        createExtraMounts(),
    ).flatten()
    evaluator.defineMounts(defaultBuiltinMounts)
    if (options.quiet) {
        evaluator.run(options.src)
    } else {
        val result = evaluator.get(options.src)
        if (result is FluoriteStream) {
            result.collect {
                println(it.toFluoriteString())
            }
        } else {
            println(result.toFluoriteString())
        }
    }
}
