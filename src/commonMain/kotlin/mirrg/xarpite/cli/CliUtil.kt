package mirrg.xarpite.cli

import kotlinx.coroutines.CoroutineScope
import mirrg.xarpite.IoContext
import mirrg.xarpite.RuntimeContext
import mirrg.xarpite.StackTraceElement
import mirrg.xarpite.compilers.objects.FluoriteStream
import mirrg.xarpite.compilers.objects.FluoriteValue
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

class Options(val src: String, val arguments: List<String>, val quiet: Boolean)

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
    println("                           Omit [$firstArgName]")
    println("  -e <script>              Evaluate script directly")
    println("                           Omit [$firstArgName]")
}

fun showVersion() {
    val version = getEnv()["XARPITE_VERSION"] ?: "0.0.0-SNAPSHOT"
    println(version)
}

suspend fun CoroutineScope.cliEval(options: Options, createExtraMounts: RuntimeContext.() -> List<Map<String, FluoriteValue>> = { emptyList() }) {
    withEvaluator(object : IoContext {
        override suspend fun out(value: FluoriteValue) = println(value.toFluoriteString().value)
        override suspend fun err(value: FluoriteValue) = writeBytesToStderr("${value.toFluoriteString().value}\n".encodeToByteArray())
        override suspend fun readLineFromStdin() = mirrg.xarpite.readLineFromStdin()
        override suspend fun readBytesFromStdin() = mirrg.xarpite.readBytesFromStdin()
        override suspend fun writeBytesToStdout(bytes: ByteArray) = mirrg.xarpite.writeBytesToStdout(bytes)
        override suspend fun writeBytesToStderr(bytes: ByteArray) = mirrg.xarpite.writeBytesToStderr(bytes)
        override suspend fun executeProcess(process: String, args: List<String>) = mirrg.xarpite.executeProcess(process, args)
    }) { context, evaluator ->
        val mounts = context.run { createCommonMounts() + createCliMounts(options.arguments) + createExtraMounts() }
        lateinit var mountsFactory: (String) -> List<Map<String, FluoriteValue>>
        mountsFactory = { location ->
            mounts + context.run { createModuleMounts(location, mountsFactory) }
        }
        evaluator.defineMounts(mountsFactory("./-"))
        try {
            withStackTrace(StackTraceElement("./-", 0)) {
                if (options.quiet) {
                    evaluator.run("./-", options.src)
                } else {
                    val result = evaluator.get("./-", options.src)
                    if (result is FluoriteStream) {
                        result.collect {
                            println(it.toFluoriteString())
                        }
                    } else {
                        println(result.toFluoriteString())
                    }
                }
            }
        } catch (e: FluoriteException) {
            context.io.err("ERROR: ${e.message}".toFluoriteString())
            e.stackTrace?.reversed()?.forEach { element ->
                context.io.err("  at $element".toFluoriteString())
            }
        }
    }
}
