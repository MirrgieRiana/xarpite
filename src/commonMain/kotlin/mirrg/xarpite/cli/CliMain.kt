package mirrg.xarpite.cli

import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.coroutineScope
import mirrg.xarpite.Evaluator
import mirrg.xarpite.compilers.objects.FluoriteStream
import mirrg.xarpite.compilers.objects.collect
import mirrg.xarpite.compilers.objects.toFluoriteString
import mirrg.xarpite.mounts.createCommonMounts

fun cliMain(args: Array<String>, runBlocking: (suspend () -> Unit) -> Unit) {
    val options = try {
        parseArguments(args)
    } catch (_: ShowUsage) {
        showUsage()
        return
    }
    runBlocking {
        coroutineScope {
            main(options, this)
        }
    }
}

private suspend fun main(options: Options, coroutineScope: CoroutineScope) {
    val evaluator = Evaluator()
    val defaultBuiltinMounts = listOf(
        createCommonMounts(coroutineScope) { println(it.toFluoriteString().value) },
        createCliMounts(options.arguments),
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
