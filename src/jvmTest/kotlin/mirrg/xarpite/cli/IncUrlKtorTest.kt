package mirrg.xarpite.cli

import io.ktor.client.HttpClient
import io.ktor.client.engine.cio.CIO
import io.ktor.client.request.get
import io.ktor.client.statement.readRawBytes
import kotlinx.coroutines.test.runTest
import mirrg.xarpite.IoContext
import mirrg.xarpite.RuntimeContext
import mirrg.xarpite.compilers.objects.FluoriteValue
import mirrg.xarpite.compilers.objects.toFluoriteString
import mirrg.xarpite.getFileSystem
import mirrg.xarpite.mounts.createCommonMounts
import okio.Path.Companion.toPath
import kotlin.test.Test
import kotlin.test.assertEquals

/**
 * JVMプラットフォーム専用：Ktorサーバーを使用したHTTP/HTTPS URL形式INCのテスト
 */
class IncUrlKtorTest {
    
    @Test
    fun useModuleFromHttpUrl() = runTest {
        withKtorServer { server ->
            // サーバーにモジュールを配置
            server.addRoute("/modules/mymodule.xa1", "\"Hello from HTTP Server!\"")
            
            // HTTPクライアントを使用したテスト用IoContext
            val context = createTestContext { _, url ->
                HttpClient(CIO).use { client ->
                    client.get(url).readRawBytes()
                }
            }
            
            // URL形式のINCパスを追加してモジュールをロード
            val result = cliEval(
                context,
                """
                    INC::push("${server.baseUrl}/modules")
                    USE("mymodule")
                """.trimIndent(),
            ).toFluoriteString(null).value
            
            assertEquals("Hello from HTTP Server!", result)
        }
    }
    
    @Test
    fun useModuleFromHttpUrlWithSubdirectory() = runTest {
        withKtorServer { server ->
            // サーバーにサブディレクトリ付きモジュールを配置
            server.addRoute("/base/utils/helper.xa1", "\"Helper Module\"")
            
            val context = createTestContext { _, url ->
                HttpClient(CIO).use { client ->
                    client.get(url).readRawBytes()
                }
            }
            
            val result = cliEval(
                context,
                """
                    INC::push("${server.baseUrl}/base")
                    USE("utils/helper")
                """.trimIndent(),
            ).toFluoriteString(null).value
            
            assertEquals("Helper Module", result)
        }
    }
    
    @Test
    fun useMavenCoordinateFromHttpUrl() = runTest {
        withKtorServer { server ->
            // Maven座標形式のパスでモジュールを配置
            server.addRoute("/maven/com/example/mylib/1.0.0/mylib-1.0.0.xa1", "\"Maven Module\"")
            
            val context = createTestContext { _, url ->
                HttpClient(CIO).use { client ->
                    client.get(url).readRawBytes()
                }
            }
            
            val result = cliEval(
                context,
                """
                    INC::push("${server.baseUrl}/maven")
                    USE("com.example.mylib:mylib:1.0.0")
                """.trimIndent(),
            ).toFluoriteString(null).value
            
            assertEquals("Maven Module", result)
        }
    }
    
    @Test
    fun httpUrlWithTrailingSlashNormalization() = runTest {
        withKtorServer { server ->
            // 末尾スラッシュがあるINCパスでもモジュールをロードできることを確認
            server.addRoute("/api/modules/test.xa1", "\"Normalized Path\"")
            
            val context = createTestContext { _, url ->
                HttpClient(CIO).use { client ->
                    client.get(url).readRawBytes()
                }
            }
            
            val result = cliEval(
                context,
                """
                    INC::push("${server.baseUrl}/api/modules/")
                    USE("test")
                """.trimIndent(),
            ).toFluoriteString(null).value
            
            assertEquals("Normalized Path", result)
        }
    }
    
    @Test
    fun httpUrlCaseInsensitiveScheme() = runTest {
        withKtorServer { server ->
            // HTTPスキームの大文字小文字を区別しないことを確認
            server.addRoute("/modules/test.xa1", "\"Case Insensitive\"")
            
            val context = createTestContext { _, url ->
                HttpClient(CIO).use { client ->
                    client.get(url.replace("HTTP://", "http://", ignoreCase = true)).readRawBytes()
                }
            }
            
            val result = cliEval(
                context,
                """
                    INC::push("HTTP://${server.baseUrl.removePrefix("http://")}/modules")
                    USE("test")
                """.trimIndent(),
            ).toFluoriteString(null).value
            
            assertEquals("Case Insensitive", result)
        }
    }
    
    // テスト用のIoContextを作成するヘルパー関数
    private fun createTestContext(
        fetchHandler: suspend (RuntimeContext, String) -> ByteArray
    ): IoContext {
        return object : IoContext {
            override suspend fun out(value: FluoriteValue) {}
            override suspend fun err(value: FluoriteValue) {}
            override suspend fun readLineFromStdin(): String? = null
            override suspend fun readBytesFromStdin(): ByteArray? = null
            override suspend fun writeBytesToStdout(bytes: ByteArray) {}
            override suspend fun writeBytesToStderr(bytes: ByteArray) {}
            override suspend fun executeProcess(process: String, args: List<String>, env: Map<String, String?>): String {
                throw UnsupportedOperationException("executeProcess is not supported in test")
            }
            override suspend fun fetch(context: RuntimeContext, url: String): ByteArray {
                return fetchHandler(context, url)
            }
            override fun getCurrentLocation(): String = "/test/location"
            override fun getEnv(key: String): String? = null
            override fun exit(code: Int): Nothing {
                throw RuntimeException("exit($code)")
            }
        }
    }
    
    // cliEval関数のローカル実装
    private suspend fun cliEval(io: IoContext, code: String): FluoriteValue {
        val fileSystem = getFileSystem().getOrNull()
        val pwd = if (fileSystem != null) {
            fileSystem.canonicalize("build/test".toPath())
        } else {
            "/test".toPath()
        }
        
        val context = RuntimeContext(
            kotlinx.coroutines.test.TestScope().backgroundScope,
            io = io,
            rootMounts = createCommonMounts { pwd },
            mounts = mutableListOf(),
            pwd = pwd,
        )
        
        return mirrg.xarpite.cli.cliEval(context, code)
    }
}
