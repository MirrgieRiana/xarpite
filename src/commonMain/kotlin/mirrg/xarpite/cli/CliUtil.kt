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

    // オプションセクションのパース
    run {
        while (true) {
            when (list.firstOrNull()) {

                "--" -> { // -- が来たらオプションセクションは終了
                    list.removeFirst()
                    return@run
                }

                "-h", "--help" -> { // ヘルプ表示
                    list.removeFirst()
                    throw ShowUsage
                }

                "-q" -> { // runnerモード
                    if (quiet) throw ShowUsage
                    list.removeFirst()
                    quiet = true
                    continue
                }

                "-f" -> { // スクリプトファイルの指定
                    if (scriptFile != null) throw ShowUsage
                    if (script != null) throw ShowUsage
                    list.removeFirst()
                    if (list.isEmpty()) throw ShowUsage
                    scriptFile = list.removeFirst()
                    continue
                }

                "-e" -> { // スクリプトの指定
                    if (scriptFile != null) throw ShowUsage
                    if (script != null) throw ShowUsage
                    list.removeFirst()
                    if (list.isEmpty()) throw ShowUsage
                    script = list.removeFirst()
                    continue
                }

                else -> { // どれもマッチしなかったのでオプションセクションは終了
                    return@run
                }
            }
        }
    }

    // 引数セクションのパース
    run {

        // -f も -e も指定されていなければ、最初の引数をスクリプトファイルやスクリプトとして扱う
        if (scriptFile == null && script == null) {
            if (list.isEmpty()) throw ShowUsage
            if (isShortCommand) {
                script = list.removeFirst()
            } else {
                scriptFile = list.removeFirst()
            }
        }

        // 残りの引数はすべてスクリプトへの引数
        arguments += list
        list.clear()

    }

    // -f オプションが指定された場合、ファイルからスクリプトを読み込む
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
    val firstArgName = if (isShortCommand) "script" else "scriptfile"
    println("Usage: $programName <Launcher Options> <Runtime Options> [--] [$firstArgName] <arguments>")
    println("Launcher Options:")
    println("  --native                 Use the native engine")
    println("  --jvm                    Use the JVM engine")
    println("  --node                   Use the Node.js engine")
    println("Runtime Options:")
    println("  -h, --help               Show this help")
    println("  -q                       Run script as a runner")
    println("  -f <scriptfile>          Read script from file")
    println("                           Omit [$firstArgName]")
    println("  -e <script>              Evaluate script directly")
    println("                           Omit [$firstArgName]")
}
