package mirrg.xarpite.cli

import kotlinx.coroutines.CoroutineScope
import mirrg.kotlin.helium.notBlankOrNull
import mirrg.xarpite.IoContext
import mirrg.xarpite.Mount
import mirrg.xarpite.Position
import mirrg.xarpite.RuntimeContext
import mirrg.xarpite.compilers.objects.FluoriteStream
import mirrg.xarpite.compilers.objects.collect
import mirrg.xarpite.compilers.objects.toFluoriteString
import mirrg.xarpite.getEnv
import mirrg.xarpite.getFileSystem
import mirrg.xarpite.getProgramName
import mirrg.xarpite.mounts.createCommonMounts
import mirrg.xarpite.operations.FluoriteException
import mirrg.xarpite.withEvaluator
import mirrg.xarpite.withStackTrace
import okio.Path.Companion.toPath

data class Options(val src: String, val arguments: List<String>, val quiet: Boolean, val isStdinScript: Boolean = false)

object ShowUsage : Throwable()
object ShowVersion : Throwable()

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

                "-v", "--version" -> { // バージョン表示
                    list.removeFirst()
                    throw ShowVersion
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
    var isStdinScript = false
    if (scriptFile != null) {
        if (scriptFile == "-") {
            // -f - の場合は標準入力から読み込むためのマーカーを設定
            isStdinScript = true
            script = "" // 空文字列をプレースホルダーとして設定
        } else {
            val fileSystem = getFileSystem().getOrThrow()
            script = fileSystem.read(scriptFile.toPath()) {
                readUtf8()
            }
        }
    }

    return Options(script ?: throw ShowUsage, arguments, quiet, isStdinScript)
}

suspend fun loadScriptFromStdin(ioContext: IoContext): String {
    val lines = mutableListOf<String>()
    while (true) {
        val line = ioContext.readLineFromStdin() ?: break
        lines.add(line)
    }
    return lines.joinToString("\n")
}

fun showUsage() {
    val programName = getEnv()["XARPITE_PROGRAM_NAME"] ?: getProgramName() ?: "xarpite"
    val engine = getEnv()["XARPITE_ENGINE"] ?: "native"
    val version = getEnv()["XARPITE_VERSION"] ?: "0.0.0-SNAPSHOT"
    val isShortCommand = !getEnv()["XARPITE_SHORT_COMMAND"].isNullOrEmpty()
    val firstArgName = if (isShortCommand) "script" else "scriptfile"
    println("Xarpite (xa) $version $engine")
    println("Usage: $programName <Launcher Options> <Runtime Options> [--] [$firstArgName] <arguments>")
    println("Launcher Options:")
    println("  --native                 Use the native engine")
    println("  --jvm                    Use the JVM engine")
    println("  --node                   Use the Node.js engine")
    println("Runtime Options:")
    println("  -h, --help               Show this help")
    println("  -v, --version            Show version")
    println("  -q                       Run script as a runner")
    println("  -f <scriptfile>          Read script from file")
    println("                           Use '-' to read from stdin")
    println("                           Omit [$firstArgName]")
    println("  -e <script>              Evaluate script directly")
    println("                           Omit [$firstArgName]")
}

fun showVersion() {
    val version = getEnv()["XARPITE_VERSION"] ?: "0.0.0-SNAPSHOT"
    println(version)
}

suspend fun CoroutineScope.cliEval(ioContext: IoContext, options: Options, createExtraMounts: RuntimeContext.() -> List<Map<String, Mount>> = { emptyList() }) {
    withEvaluator(ioContext) { context, evaluator ->
        context.inc.values += "./.xarpite/maven".toFluoriteString()
        context.setSrc("-", options.src)
        val mounts = context.run { createCommonMounts() + createCliMounts(options.arguments) + createExtraMounts() }
        lateinit var mountsFactory: (String) -> List<Map<String, Mount>>
        mountsFactory = { location ->
            mounts + context.run { createModuleMounts(location, mountsFactory) }
        }
        evaluator.defineMounts(mountsFactory("./-"))
        try {
            withStackTrace(Position("-", 0)) {
                if (options.quiet) {
                    evaluator.run("-", options.src)
                } else {
                    val result = evaluator.get("-", options.src)
                    if (result is FluoriteStream) {
                        result.collect {
                            println(it.toFluoriteString(null))
                        }
                    } else {
                        println(result.toFluoriteString(null))
                    }
                }
            }
        } catch (e: FluoriteException) {
            context.io.err("ERROR: ${e.message}".toFluoriteString())
            e.stackTrace?.reversed()?.forEach { position ->
                context.io.err("  at ${context.renderPosition(position)}".toFluoriteString())
            }
        }
    }
}

fun IoContext.getPwd(): String {
    val env = getEnv()
    return env["XARPITE_PWD"]?.notBlankOrNull ?: env["PWD"]?.notBlankOrNull ?: this.getPlatformPwd()
}
