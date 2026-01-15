import kotlinx.coroutines.runBlocking
import mirrg.xarpite.cli.ShowUsage
import mirrg.xarpite.cli.ShowVersion
import mirrg.xarpite.cli.cliEval
import mirrg.xarpite.cli.parseArguments
import mirrg.xarpite.cli.showUsage
import mirrg.xarpite.cli.showVersion

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
        cliEval(options)
    }
}
