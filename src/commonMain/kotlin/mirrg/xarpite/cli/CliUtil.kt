package mirrg.xarpite.cli

import kotlinx.coroutines.CoroutineScope
import mirrg.kotlin.helium.notBlankOrNull
import mirrg.xarpite.IoContext
import mirrg.xarpite.Mount
import mirrg.xarpite.RuntimeContext
import mirrg.xarpite.compilers.objects.FluoriteStream
import mirrg.xarpite.compilers.objects.collect
import mirrg.xarpite.compilers.objects.toFluoriteString
import mirrg.xarpite.getFileSystem
import mirrg.xarpite.getProgramName
import mirrg.xarpite.mounts.createCommonMounts
import mirrg.xarpite.operations.FluoriteException
import mirrg.xarpite.readAllStringFromStdin
import mirrg.xarpite.withEvaluator
import okio.Path.Companion.toPath

class Options(val src: String, val arguments: List<String>, val quiet: Boolean, val verbose: Boolean, val apiVersion: Int?, val scriptFile: String?, val embedded: Boolean)

object ShowHelp : Throwable()
object ShowUsage : Throwable()
object ShowVersion : Throwable()

class ShowMessage(override val message: String) : Throwable()

suspend fun parseArguments(args: Iterable<String>, ioContext: IoContext): Options {
    val list = args.toMutableList()
    val arguments = mutableListOf<String>()
    var quiet = false
    var verbose = false
    var apiVersion: Int? = null
    var scriptFile: String? = null
    var script: String? = null
    var embedded = false
    val isShortCommand = !ioContext.getEnv()["XARPITE_SHORT_COMMAND"].isNullOrEmpty()

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
                    throw ShowHelp
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

                "--verbose" -> { // verboseモード
                    if (verbose) throw ShowUsage
                    list.removeFirst()
                    verbose = true
                    continue
                }

                "-A" -> { // APIバージョンの指定
                    if (apiVersion != null) throw ShowUsage
                    list.removeFirst()
                    if (list.isEmpty()) throw ShowUsage
                    apiVersion = list.removeFirst().toIntOrNull()?.takeIf { it >= 0 } ?: throw ShowUsage
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

                "-E" -> { // embeddedモード
                    if (embedded) throw ShowUsage
                    list.removeFirst()
                    embedded = true
                    continue
                }

                else -> { // どれもマッチしなかったのでオプションセクションは終了
                    return@run
                }
            }
        }
    }

    // -A が指定されなかった場合、XARPITE_API_VERSION 環境変数があればそれを採用する
    if (apiVersion == null) {
        val envApiVersion = ioContext.getEnv()["XARPITE_API_VERSION"]?.notBlankOrNull
        if (envApiVersion != null) {
            apiVersion = envApiVersion.toIntOrNull()?.takeIf { it >= 0 } ?: throw ShowMessage("XARPITE_API_VERSION must be a non-negative integer: $envApiVersion")
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
        if (scriptFile == "-") {
            // -f - の場合は標準入力から読み込む
            script = ioContext.readAllStringFromStdin()
        } else {
            val fileSystem = getFileSystem().getOrThrow()
            script = fileSystem.read(scriptFile.toPath()) {
                readUtf8()
            }
        }
    }

    return Options(script ?: throw ShowUsage, arguments, quiet, verbose, apiVersion, scriptFile, embedded)
}

suspend fun showMessage(ioContext: IoContext, message: String) {
    ioContext.writeBytesToStderr("$message\n".encodeToByteArray())
}

// ヘルプの要求への応答であるため標準出力へ出す
suspend fun showHelp(ioContext: IoContext) = printUsage(ioContext) { ioContext.writeBytesToStdout(it) }

// 引数の誤りの通知であるため標準エラー出力へ出す
suspend fun showUsage(ioContext: IoContext) = printUsage(ioContext) { ioContext.writeBytesToStderr(it) }

private suspend fun printUsage(ioContext: IoContext, writeBytes: suspend (ByteArray) -> Unit) {
    suspend fun printLine(line: String) = writeBytes("$line\n".encodeToByteArray())
    val programName = ioContext.getEnv()["XARPITE_PROGRAM_NAME"] ?: getProgramName() ?: "xarpite"
    val engine = ioContext.getEnv()["XARPITE_ENGINE"] ?: "native"
    val version = ioContext.getEnv()["XARPITE_VERSION"] ?: "0.0.0-SNAPSHOT"
    val isShortCommand = !ioContext.getEnv()["XARPITE_SHORT_COMMAND"].isNullOrEmpty()
    val firstArgName = if (isShortCommand) "script" else "scriptfile"
    printLine("Xarpite (xa) $version $engine")
    printLine("Usage: $programName <Launcher Options> <Runtime Options> [--] [$firstArgName] <arguments>")
    printLine("Launcher Options:")
    printLine("  --native                 Use the native engine")
    printLine("  --jvm                    Use the JVM engine")
    printLine("  --node                   Use the Node.js engine")
    printLine("Runtime Options:")
    printLine("  -h, --help               Show this help")
    printLine("  -v, --version            Show version")
    printLine("  -q                       Run script as a runner")
    printLine("  --verbose                Display Kotlin stack traces")
    printLine("  -A <apiversion>          Set the API version")
    printLine("  -f <scriptfile>          Read script from file")
    printLine("                           Use '-' to read from stdin")
    printLine("                           Omit [$firstArgName]")
    printLine("  -e <script>              Evaluate script directly")
    printLine("                           Omit [$firstArgName]")
    printLine("  -E                       Interpret the entire script as an embedded string literal")
    printLine("")
    printLine("Repository: https://github.com/MirrgieRiana/xarpite")
}

fun showVersion(ioContext: IoContext) {
    val version = ioContext.getEnv()["XARPITE_VERSION"] ?: "0.0.0-SNAPSHOT"
    println(version)
}

fun RuntimeContext.addDefaultIncPaths() {
    inc.values += "https://repo1.maven.org/maven2".toFluoriteString()
    inc.values += "./.xarpite/maven".toFluoriteString()
    inc.values += "./.xarpite/lib".toFluoriteString()
}

suspend fun CoroutineScope.cliEval(ioContext: IoContext, options: Options, createExtraMounts: RuntimeContext.() -> List<Map<String, Mount>> = { emptyList() }): Int {
    return withEvaluator(ioContext) { context, evaluator ->
        if (options.apiVersion != null) {
            if (options.apiVersion !in RuntimeContext.SUPPORTED_API_VERSIONS) {
                context.io.err("ERROR: This runtime does not support API version ${options.apiVersion}".toFluoriteString())
                return@withEvaluator 0
            }
            context.apiVersion = options.apiVersion
        }
        context.addDefaultIncPaths()
        val location = ioContext.getPwd().toPath().resolve(options.scriptFile ?: "-").normalized().toString()
        context.setSrc(location, options.src)
        val mounts = context.run { createCommonMounts() + createCliMounts(options.arguments) + createExtraMounts() }
        lateinit var mountsFactory: (String) -> List<Map<String, Mount>>
        mountsFactory = { location ->
            mounts + context.run { createModuleMounts(location, mountsFactory) }
        }
        evaluator.defineMounts(mountsFactory(location))
        try {
            if (options.quiet) {
                evaluator.run(location, options.src, options.embedded)
            } else {
                val result = evaluator.get(location, options.src, options.embedded)
                if (options.embedded) {
                    context.io.writeBytesToStdout(result.toFluoriteString(null).value.encodeToByteArray())
                } else if (result is FluoriteStream) {
                    result.collect {
                        println(it.toFluoriteString(null))
                    }
                } else {
                    println(result.toFluoriteString(null))
                }
            }
            0
        } catch (e: FluoriteException) {
            context.io.err("ERROR: ${e.message}".toFluoriteString())
            e.stackTrace?.reversed()?.forEach { position ->
                context.io.err("  at ${context.renderPosition(position)}".toFluoriteString())
            }
            if (options.verbose) {
                context.io.err(e.stackTraceToString().toFluoriteString())
            }
            if (context.apiVersion >= 5) 1 else 0
        }
    }
}

fun IoContext.getPwd(): String {
    val env = getEnv()
    return env["XARPITE_PWD"]?.notBlankOrNull ?: env["PWD"]?.notBlankOrNull ?: this.getPlatformPwd()
}
