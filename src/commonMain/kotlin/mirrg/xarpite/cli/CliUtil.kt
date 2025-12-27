package mirrg.xarpite.cli

import getEnv
import getFileSystem
import getProgramName
import okio.Path.Companion.toPath

class Options(val src: String, val arguments: List<String>, val quiet: Boolean)

object ShowUsage : Throwable()

fun parseArguments(args: Iterable<String>): Options {
    val list = args.toMutableList()
    val arguments = mutableListOf<String>()
    var quiet = false
    var scriptFile: String? = null
    var script: String? = null
    val isShortCommand = !getEnv()["XARPITE_SHORT_COMMAND"].isNullOrEmpty()

    run {
        while (true) {

            if (list.firstOrNull() == "--") {
                list.removeFirst()

                if (list.isEmpty() && scriptFile == null && script == null) throw ShowUsage

                if (scriptFile == null && script == null) {
                    script = list.removeFirst()
                }
                arguments += list
                list.clear()
                return@run
            }

            if (list.firstOrNull() == "-h") throw ShowUsage
            if (list.firstOrNull() == "--help") throw ShowUsage

            if (list.firstOrNull() == "-q") {
                if (quiet) throw ShowUsage
                quiet = true
                list.removeFirst()
                continue
            }

            if (list.firstOrNull() == "-f") {
                if (scriptFile != null) throw ShowUsage
                if (script != null) throw ShowUsage
                list.removeFirst()
                if (list.isEmpty()) throw ShowUsage
                scriptFile = list.removeFirst()
                continue
            }

            if (list.firstOrNull() == "-e") {
                if (script != null) throw ShowUsage
                if (scriptFile != null) throw ShowUsage
                list.removeFirst()
                if (list.isEmpty()) throw ShowUsage
                script = list.removeFirst()
                continue
            }

            if (list.isEmpty()) {
                // -f が指定されていれば、残りの引数がなくてもOK
                if (scriptFile != null || script != null) {
                    return@run
                }
                // short command モードで -f も -e も指定されていない場合はエラー
                if (isShortCommand) {
                    throw ShowUsage
                }
                throw ShowUsage
            }

            // -f または -e が指定されていた場合、残りの引数はすべてスクリプトへの引数
            if (scriptFile != null || script != null) {
                arguments += list
                list.clear()
                return@run
            }

            // short command モードで -f も -e も指定されていない場合、最初の引数をスクリプトとして扱う
            if (isShortCommand) {
                script = list.removeFirst()
                arguments += list
                list.clear()
                return@run
            }

            script = list.removeFirst()
            arguments += list
            list.clear()
            return@run
        }
    }

    // -f オプションが指定された場合、ファイルからソースコードを読み込む
    if (scriptFile != null) {
        val fileSystem = getFileSystem().getOrThrow()
        script = fileSystem.read(scriptFile.toPath()) {
            readUtf8()
        }
    }

    return Options(script ?: throw ShowUsage, arguments, quiet)
}

fun showUsage() {
    val programName = getEnv()["XARPITE_PROGRAM_NAME"] ?: getProgramName() ?: "xarpite"
    val isShortCommand = !getEnv()["XARPITE_SHORT_COMMAND"].isNullOrEmpty()
    val firstArgName = if (isShortCommand) "<script>" else "<code>"
    
    println("Usage: $programName [<Launcher Options>] [<Runtime Options>] [--] $firstArgName <arguments...>")
    println("")
    println("Launcher Options:")
    println("  --native                 Use the native engine")
    println("  --jvm                    Use the JVM engine")
    println("  --node                   Use the Node.js engine")
    println("")
    println("Runtime Options:")
    println("  -h, --help               Show this help")
    println("  -q                       Run script as a runner")
    println("  -f <file>                Read script from file")
    println("  -e <code>                Evaluate code directly")
}
