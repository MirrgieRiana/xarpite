package mirrg.xarpite

import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.SupervisorJob
import kotlinx.coroutines.cancel
import kotlinx.coroutines.coroutineScope
import mirrg.xarpite.cli.Options
import mirrg.xarpite.cli.createCliMounts
import mirrg.xarpite.cli.createModuleMounts
import mirrg.xarpite.compilers.compileToGetter
import mirrg.xarpite.compilers.compileToRunner
import mirrg.xarpite.compilers.objects.FluoriteStream
import mirrg.xarpite.compilers.objects.FluoriteValue
import mirrg.xarpite.compilers.objects.collect
import mirrg.xarpite.compilers.objects.toFluoriteString
import mirrg.xarpite.mounts.createCommonMounts
import mirrg.xarpite.parser.parseAllOrThrow

class Evaluator {

    private var currentFrame: Frame? = null
    private var currentEnv: Environment? = null

    suspend fun defineMounts(maps: List<Map<String, FluoriteValue>>) {
        val frame = Frame(currentFrame)
        currentFrame = frame
        val runners = maps.map {
            frame.defineBuiltinMount(it)
        }
        val env = Environment(currentEnv, frame.nextVariableIndex, frame.mountCount)
        currentEnv = env
        runners.forEach {
            it.evaluate(env)
        }
    }

    suspend fun get(src: String): FluoriteValue {
        val parseResult = XarpiteGrammar.rootParser.parseAllOrThrow(src)
        val frame = Frame(currentFrame)
        currentFrame = frame
        val getter = frame.compileToGetter(parseResult)
        val env = Environment(currentEnv, frame.nextVariableIndex, frame.mountCount)
        currentEnv = env
        return getter.evaluate(env)
    }

    suspend fun run(src: String) {
        val parseResult = XarpiteGrammar.rootParser.parseAllOrThrow(src)
        val frame = Frame(currentFrame)
        currentFrame = frame
        val runners = frame.compileToRunner(parseResult)
        val env = Environment(currentEnv, frame.nextVariableIndex, frame.mountCount)
        currentEnv = env
        runners.forEach {
            it.evaluate(env)
        }
    }

}

suspend fun CoroutineScope.eval(options: Options, createExtraMounts: context(RuntimeContext) () -> List<Map<String, FluoriteValue>> = { emptyList() }) {
    val daemonScope = CoroutineScope(coroutineContext + SupervisorJob())
    try {
        coroutineScope main@{
            val context = RuntimeContext(
                this@main,
                daemonScope,
                object : IoContext {
                    override suspend fun out(value: FluoriteValue) = println(value.toFluoriteString().value)
                },
            )
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
    } finally {
        daemonScope.cancel()
    }
}
