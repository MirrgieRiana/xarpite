package mirrg.xarpite.cli

import kotlinx.coroutines.CoroutineScope
import getFileSystem
import mirrg.xarpite.Evaluator
import mirrg.xarpite.compilers.objects.FluoriteStream
import mirrg.xarpite.compilers.objects.FluoriteValue
import mirrg.xarpite.compilers.objects.collect
import mirrg.xarpite.compilers.objects.toFluoriteString
import mirrg.xarpite.mounts.createCommonMounts
import okio.Path
import okio.Path.Companion.toPath

suspend fun main(options: Options, coroutineScope: CoroutineScope, createExtraMounts: () -> List<Map<String, FluoriteValue>> = { emptyList() }) {
    val evaluator = Evaluator()
    val defaultBuiltinMounts = listOf(
        createCommonMounts(coroutineScope) { println(it.toFluoriteString().value) },
        createCliMounts(options.arguments),
        createExtraMounts(),
    ).flatten()
    lateinit var mountsFactory: (Path) -> List<Map<String, FluoriteValue>>
    mountsFactory = { filePath ->
        defaultBuiltinMounts + createModuleMounts(filePath, mountsFactory)
    }
    val dummyPath = ".".toPath().resolve("-")
    evaluator.defineMounts(mountsFactory(dummyPath))
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
