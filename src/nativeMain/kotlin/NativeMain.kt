import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.SupervisorJob
import kotlinx.coroutines.cancel
import kotlinx.coroutines.coroutineScope
import kotlinx.coroutines.runBlocking
import mirrg.xarpite.cli.ShowUsage
import mirrg.xarpite.cli.ShowVersion
import mirrg.xarpite.cli.parseArguments
import mirrg.xarpite.cli.showUsage
import mirrg.xarpite.cli.showVersion
import mirrg.xarpite.main

fun main(args: Array<String>) {
    val options = try {
        parseArguments(args.asIterable())
    } catch (_: ShowUsage) {
        showUsage()
        return
    } catch (_: ShowVersion) {
        showVersion()
        return
    }
    runBlocking {
        val daemonScope = CoroutineScope(coroutineContext + SupervisorJob())
        try {
            coroutineScope main@{
                main(options, this@main, daemonScope)
            }
        } finally {
            daemonScope.cancel()
        }
    }
}
