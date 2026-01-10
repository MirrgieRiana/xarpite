package mirrg.xarpite.cli

import kotlinx.coroutines.CoroutineScope
import mirrg.xarpite.Evaluator
import mirrg.xarpite.compilers.objects.FluoriteStream
import mirrg.xarpite.compilers.objects.FluoriteValue
import mirrg.xarpite.compilers.objects.collect
import mirrg.xarpite.compilers.objects.toFluoriteString
import mirrg.xarpite.mounts.createCommonMounts

suspend fun main(options: Options, coroutineScope: CoroutineScope, daemonScope: CoroutineScope, createExtraMounts: () -> List<Map<String, FluoriteValue>> = { emptyList() }) {
    val evaluator = Evaluator()
    val defaultBuiltinMounts = listOf(
        createCommonMounts(
            coroutineScope,
            daemonScope,
            out = { println(it.toFluoriteString().value) },
            err = { System.err.println(it.toFluoriteString().value) }
        ),
        createCliMounts(
            options.arguments,
            err = { System.err.println(it.toFluoriteString().value) }
        ),
        createExtraMounts(),
    ).flatten()
    lateinit var mountsFactory: (String) -> List<Map<String, FluoriteValue>>
    mountsFactory = { location ->
        defaultBuiltinMounts + createModuleMounts(location, mountsFactory)
    }
    evaluator.defineMounts(mountsFactory("./-"))
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
