package mirrg.xarpite.js.node

import envGetter
import fileSystemGetter
import kotlinx.coroutines.coroutineScope
import mirrg.xarpite.cli.ShowUsage
import mirrg.xarpite.cli.main
import mirrg.xarpite.cli.parseArguments
import mirrg.xarpite.cli.showUsage
import mirrg.xarpite.js.Object_keys
import mirrg.xarpite.js.createJsMounts
import okio.NodeJsFileSystem

suspend fun main() {
    envGetter = {
        val env = process.env
        Object_keys(env).associateWith { env[it].unsafeCast<String>() }
    }
    fileSystemGetter = { NodeJsFileSystem }

    val options = try {
        parseArguments(process.argv.drop(2))
    } catch (_: ShowUsage) {
        showUsage()
        return
    }
    coroutineScope {
        main(options, this) {
            createJsMounts()
        }
    }
}
