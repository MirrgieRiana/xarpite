import kotlinx.coroutines.runBlocking
import mirrg.xarpite.cli.CliIoContext
import mirrg.xarpite.cli.ShowHelp
import mirrg.xarpite.cli.ShowMessage
import mirrg.xarpite.cli.ShowUsage
import mirrg.xarpite.cli.ShowVersion
import mirrg.xarpite.cli.cliEval
import mirrg.xarpite.cli.parseArguments
import mirrg.xarpite.cli.showHelp
import mirrg.xarpite.cli.showMessage
import mirrg.xarpite.cli.showUsage
import mirrg.xarpite.cli.showVersion
import java.nio.file.Path

fun main(args: Array<String>) {
    runBlocking {
        val ioContext = object : CliIoContext() {
            override fun getEnv(): Map<String, String> = mirrg.xarpite.getEnv()
            override fun getPlatformPwd(): String = Path.of("").toAbsolutePath().normalize().toString()
            override suspend fun readLineFromStdin() = mirrg.xarpite.readLineFromStdin()
            override suspend fun readBytesFromStdin() = mirrg.xarpite.readBytesFromStdin()
            override suspend fun writeBytesToStdout(bytes: ByteArray) = mirrg.xarpite.writeBytesToStdout(bytes)
            override suspend fun writeBytesToStderr(bytes: ByteArray) = mirrg.xarpite.writeBytesToStderr(bytes)
            override suspend fun executeProcess(process: String, args: List<String>, env: Map<String, String?>) = mirrg.xarpite.executeProcess(process, args, env)

            override fun exit(code: Int): Nothing = mirrg.xarpite.exit(code)
        }
        val options = try {
            parseArguments(args.asIterable(), ioContext)
        } catch (_: ShowHelp) {
            showHelp(ioContext)
            return@runBlocking
        } catch (_: ShowUsage) {
            showUsage(ioContext)
            return@runBlocking
        } catch (_: ShowVersion) {
            showVersion(ioContext)
            return@runBlocking
        } catch (e: ShowMessage) {
            showMessage(ioContext, e.message)
            return@runBlocking
        }
        val exitCode = cliEval(ioContext, options)
        if (exitCode != 0) ioContext.exit(exitCode)
    }
}
