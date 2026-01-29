package mirrg.xarpite

import io.github.mirrgieriana.xarpeg.parseAllOrThrow
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.SupervisorJob
import kotlinx.coroutines.cancel
import kotlinx.coroutines.coroutineScope
import kotlinx.coroutines.withContext
import mirrg.xarpite.compilers.compileToGetter
import mirrg.xarpite.compilers.compileToRunner
import mirrg.xarpite.compilers.objects.FluoriteValue

class Evaluator {

    private var currentFrame: Frame? = null
    private var currentEnv: Environment? = null

    suspend fun defineMounts(maps: List<Map<String, Mount>>) {
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

    suspend fun get(location: String, src: String): FluoriteValue {
        val parseResult = XarpiteGrammar(location).rootParser.parseAllOrThrow(src)
        val frame = Frame(currentFrame)
        currentFrame = frame
        val getter = frame.compileToGetter(parseResult)
        val env = Environment(currentEnv, frame.nextVariableIndex, frame.mountCount)
        currentEnv = env
        return getter.evaluate(env)
    }

    suspend fun run(location: String, src: String) {
        val parseResult = XarpiteGrammar(location).rootParser.parseAllOrThrow(src)
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

suspend fun <T> CoroutineScope.withEvaluator(ioContext: IoContext, block: suspend (RuntimeContext, Evaluator) -> T): T {
    val daemonScope = CoroutineScope(coroutineContext + SupervisorJob() + StackTrace())
    try {
        return coroutineScope main@{
            withContext(StackTrace()) {
                block(RuntimeContext(this, daemonScope, ioContext), Evaluator())
            }
        }
    } finally {
        daemonScope.cancel()
    }
}
