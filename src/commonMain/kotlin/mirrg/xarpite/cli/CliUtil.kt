package mirrg.xarpite.cli

import getEnv
import getFileSystem
import getProgramName
import okio.Path.Companion.toPath

class Options(val src: String, val arguments: List<String>, val quiet: Boolean, val short: Boolean)

object ShowUsage : Throwable()

fun parseArguments(args: Iterable<String>): Options {
    val list = args.toMutableList()
    var src: String? = null
    val arguments = mutableListOf<String>()
    var quiet = false
    var short = false
    var scriptFile: String? = null
    var evaluateMode = false

    run {
        while (true) {

            if (list.firstOrNull() == "--") {
                list.removeFirst()

                if (list.isEmpty() && scriptFile == null && !evaluateMode) throw ShowUsage

                if (scriptFile == null && !evaluateMode) {
                    src = list.removeFirst()
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

            if (list.firstOrNull() == "--short") {
                if (short) throw ShowUsage
                short = true
                list.removeFirst()
                continue
            }

            if (list.firstOrNull() == "-f") {
                if (scriptFile != null) throw ShowUsage
                if (evaluateMode) throw ShowUsage
                list.removeFirst()
                if (list.isEmpty()) throw ShowUsage
                scriptFile = list.removeFirst()
                continue
            }

            if (list.firstOrNull() == "-e") {
                if (evaluateMode) throw ShowUsage
                if (scriptFile != null) throw ShowUsage
                evaluateMode = true
                list.removeFirst()
                if (list.isEmpty()) throw ShowUsage
                src = list.removeFirst()
                continue
            }

            if (list.isEmpty()) {
                // -f が指定されていれば、残りの引数がなくてもOK
                if (scriptFile != null || evaluateMode) {
                    return@run
                }
                // --short モードで -f も -e も指定されていない場合はエラー
                if (short) {
                    throw ShowUsage
                }
                throw ShowUsage
            }

            // -f または -e が指定されていた場合、残りの引数はすべてスクリプトへの引数
            if (scriptFile != null || evaluateMode) {
                arguments += list
                list.clear()
                return@run
            }

            // --short モードで -f も -e も指定されていない場合、最初の引数をスクリプトとして扱う
            if (short) {
                src = list.removeFirst()
                arguments += list
                list.clear()
                return@run
            }

            src = list.removeFirst()
            arguments += list
            list.clear()
            return@run
        }
    }

    // -f オプションが指定された場合、ファイルからソースコードを読み込む
    if (scriptFile != null) {
        val fileSystem = getFileSystem().getOrThrow()
        src = fileSystem.read(scriptFile.toPath()) {
            readUtf8()
        }
    }

    return Options(src ?: throw ShowUsage, arguments, quiet, short)
}

fun showUsage() {
    val programName = getEnv()["XARPITE_PROGRAM_NAME"] ?: getProgramName() ?: "xarpite"
    println("Usage: $programName [<Launcher Options>] [<Runtime Options>] [--] <code> <arguments...>")
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
    println("  --short                  Treat first argument as script (for xa command)")
}
