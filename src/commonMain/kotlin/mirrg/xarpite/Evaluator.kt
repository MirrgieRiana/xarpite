package mirrg.xarpite

import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.SupervisorJob
import kotlinx.coroutines.cancel
import kotlinx.coroutines.coroutineScope
import mirrg.xarpite.compilers.compileToGetter
import mirrg.xarpite.compilers.compileToRunner
import mirrg.xarpite.compilers.objects.FluoriteValue
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

suspend fun <T> CoroutineScope.withEvaluator(ioContext: IoContext, block: suspend context(RuntimeContext) (Evaluator) -> T): T {
    val daemonScope = CoroutineScope(coroutineContext + SupervisorJob())
    try {
        return coroutineScope main@{
            RuntimeContext(this, daemonScope, ioContext).run {
                block(Evaluator())
            }
        }
    } finally {
        daemonScope.cancel()
    }
}
