package mirrg.xarpite

import kotlinx.coroutines.CoroutineScope
import mirrg.xarpite.cli.Options
import mirrg.xarpite.cli.createCliMounts
import mirrg.xarpite.cli.createModuleMounts
import mirrg.xarpite.compilers.objects.FluoriteStream
import mirrg.xarpite.compilers.objects.FluoriteValue
import mirrg.xarpite.compilers.objects.collect
import mirrg.xarpite.compilers.objects.toFluoriteString
import mirrg.xarpite.mounts.createCommonMounts

suspend fun main(options: Options, coroutineScope: CoroutineScope, daemonScope: CoroutineScope, createExtraMounts: context(RuntimeContext) () -> List<Map<String, FluoriteValue>> = { emptyList() }) {
    val context = object : RuntimeContext {
        override val coroutineScope get() = coroutineScope
        override val daemonScope get() = daemonScope
        override suspend fun out(value: FluoriteValue) = println(value.toFluoriteString().value)
    }
    val mounts = context.run { createCommonMounts() + createCliMounts(options.arguments) + createExtraMounts() }
    lateinit var mountsFactory: (String) -> List<Map<String, FluoriteValue>>
    mountsFactory = { location ->
        mounts + context.run { createModuleMounts(location, mountsFactory) }
    }
    val evaluator = Evaluator()
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
