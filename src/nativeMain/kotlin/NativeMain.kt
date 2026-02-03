import kotlinx.coroutines.runBlocking
import mirrg.xarpite.IoContext
import mirrg.xarpite.cli.ShowUsage
import mirrg.xarpite.cli.ShowVersion
import mirrg.xarpite.cli.cliEval
import mirrg.xarpite.cli.loadScriptFromStdin
import mirrg.xarpite.cli.parseArguments
import mirrg.xarpite.cli.showUsage
import mirrg.xarpite.cli.showVersion
import mirrg.xarpite.compilers.objects.FluoriteValue
import mirrg.xarpite.compilers.objects.toFluoriteString
import mirrg.xarpite.getPwdImpl

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
        val ioContext = object : IoContext {
            override fun getPlatformPwd() = getPwdImpl()
            override suspend fun out(value: FluoriteValue) = println(value.toFluoriteString(null).value)
            override suspend fun err(value: FluoriteValue) = writeBytesToStderr("${value.toFluoriteString(null).value}\n".encodeToByteArray())
            override suspend fun readLineFromStdin() = mirrg.xarpite.readLineFromStdin()
            override suspend fun readBytesFromStdin() = mirrg.xarpite.readBytesFromStdin()
            override suspend fun writeBytesToStdout(bytes: ByteArray) = mirrg.xarpite.writeBytesToStdout(bytes)
            override suspend fun writeBytesToStderr(bytes: ByteArray) = mirrg.xarpite.writeBytesToStderr(bytes)
            override suspend fun executeProcess(process: String, args: List<String>, env: Map<String, String?>) = mirrg.xarpite.executeProcess(process, args, env)
        }
        val finalOptions = if (options.isStdinScript) {
            val src = loadScriptFromStdin(ioContext)
            options.copy(src = src, isStdinScript = false)
        } else {
            options
        }
        cliEval(ioContext, finalOptions)
    }
}
