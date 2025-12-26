import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Job
import kotlinx.coroutines.cancel
import kotlinx.coroutines.coroutineScope
import kotlinx.coroutines.runBlocking
import mirrg.xarpite.cli.ShowUsage
import mirrg.xarpite.cli.main
import mirrg.xarpite.cli.parseArguments
import mirrg.xarpite.cli.showUsage
import kotlin.coroutines.coroutineContext

fun main(args: Array<String>) {
    val options = try {
        parseArguments(args.asIterable())
    } catch (_: ShowUsage) {
        showUsage()
        return
    }
    runBlocking {
        val daemonScope = CoroutineScope(coroutineContext + Job())
        try {
            coroutineScope {
                main(options, this, daemonScope)
            }
        } finally {
            daemonScope.cancel()
        }
    }
}
