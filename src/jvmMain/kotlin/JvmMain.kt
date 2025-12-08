import kotlinx.coroutines.runBlocking
import mirrg.xarpite.cli.cliMain

fun main(args: Array<String>) {
    cliMain(args) {
        runBlocking {
            it()
        }
    }
}
