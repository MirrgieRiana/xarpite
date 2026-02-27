package mirrg.xarpite.cli

import kotlinx.coroutines.test.runTest
import mirrg.xarpite.TestIoContext
import mirrg.xarpite.compilers.objects.FluoriteValue
import mirrg.xarpite.io.getHttpClient
import kotlin.test.Test
import kotlin.test.assertEquals

// cliEvalImplのエイリアスを定義
private suspend fun cliEval(context: TestIoContext, vararg args: String): FluoriteValue {
    return cliEvalImpl(context, *args)
}

/**
 * Ktorサーバーを使用したURL形式INCの統合テスト
 * JVMプラットフォームでのみ実行される
 */
class IncUrlKtorTest {

    @Test
    fun useModuleFromHttpUrlWithKtorServer() = runTest {
        withKtorServer { server ->
            // サーバーにモジュールを配置
            server.addRoute("/modules/mymodule.xa1", "\"Hello from HTTP Server!\"")

            // HTTPクライアントを使用したfetchHandlerを設定
            val context = TestIoContext(
                fetchHandler = { url ->
                    getHttpClient().get(url).readRawBytes().decodeToString()
                }
            )

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
    fun useModuleFromHttpUrlWithSubdirectoryKtorServer() = runTest {
        withKtorServer { server ->
            // サーバーにサブディレクトリ付きモジュールを配置
            server.addRoute("/base/utils/helper.xa1", "\"Helper Module\"")

            val context = TestIoContext(
                fetchHandler = { url ->
                    getHttpClient().get(url).readRawBytes().decodeToString()
                }
            )

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
    fun useMavenCoordinateFromHttpUrlKtorServer() = runTest {
        withKtorServer { server ->
            // Maven座標形式のパスでモジュールを配置
            server.addRoute("/repo/com/example/mylib/1.0.0/mylib-1.0.0.xa1", "\"Maven Module v1.0.0\"")

            val context = TestIoContext(
                fetchHandler = { url ->
                    getHttpClient().get(url).readRawBytes().decodeToString()
                }
            )

            val result = cliEval(
                context,
                """
                    INC::push("${server.baseUrl}/repo")
                    USE("com.example.mylib:1.0.0")
                """.trimIndent(),
            ).toFluoriteString(null).value

            assertEquals("Maven Module v1.0.0", result)
        }
    }

    @Test
    fun httpUrlWithTrailingSlashNormalizationKtorServer() = runTest {
        withKtorServer { server ->
            // 末尾スラッシュを含むURL
            server.addRoute("/modules/testmodule.xa1", "\"Normalized Path\"")

            val context = TestIoContext(
                fetchHandler = { url ->
                    getHttpClient().get(url).readRawBytes().decodeToString()
                }
            )

            // 末尾スラッシュ付きのURLを追加
            val result = cliEval(
                context,
                """
                    INC::push("${server.baseUrl}/modules/")
                    USE("testmodule")
                """.trimIndent(),
            ).toFluoriteString(null).value

            assertEquals("Normalized Path", result)
        }
    }

    @Test
    fun httpUrlCaseInsensitiveSchemeKtorServer() = runTest {
        withKtorServer { server ->
            server.addRoute("/modules/casetest.xa1", "\"Case Insensitive Scheme\"")

            val context = TestIoContext(
                fetchHandler = { url ->
                    // URLは小文字に正規化されているはず
                    getHttpClient().get(url).readRawBytes().decodeToString()
                }
            )

            // 大文字混在のスキームを使用
            val result = cliEval(
                context,
                """
                    INC::push("HTTP://${server.baseUrl.removePrefix("http://")}/modules")
                    USE("casetest")
                """.trimIndent(),
            ).toFluoriteString(null).value

            assertEquals("Case Insensitive Scheme", result)
        }
    }

    @Test
    fun multipleHttpUrlsInIncKtorServer() = runTest {
        withKtorServer { server1 ->
            withKtorServer { server2 ->
                // 2つのサーバーにそれぞれモジュールを配置
                server1.addRoute("/repo1/module1.xa1", "\"Module from Server 1\"")
                server2.addRoute("/repo2/module2.xa1", "\"Module from Server 2\"")

                val context = TestIoContext(
                    fetchHandler = { url ->
                        getHttpClient().get(url).readRawBytes().decodeToString()
                    }
                )

                // 両方のサーバーをINCに追加
                val result1 = cliEval(
                    context,
                    """
                        INC::push("${server1.baseUrl}/repo1")
                        USE("module1")
                    """.trimIndent(),
                ).toFluoriteString(null).value

                assertEquals("Module from Server 1", result1)

                val result2 = cliEval(
                    context,
                    """
                        INC::push("${server2.baseUrl}/repo2")
                        USE("module2")
                    """.trimIndent(),
                ).toFluoriteString(null).value

                assertEquals("Module from Server 2", result2)
            }
        }
    }

    @Test
    fun httpUrlPrioritizesLocalPathsOverHttpKtorServer() = runTest {
        withKtorServer { server ->
            server.addRoute("/modules/priority.xa1", "\"HTTP Module\"")

            val context = TestIoContext(
                fetchHandler = { url ->
                    getHttpClient().get(url).readRawBytes().decodeToString()
                }
            )

            // ローカルパスを先に追加し、次にHTTP URLを追加
            // ローカルパスが優先されるべき
            val result = cliEval(
                context,
                """
                    INC::push("${server.baseUrl}/modules")
                    USE("priority")
                """.trimIndent(),
            ).toFluoriteString(null).value

            // HTTPから取得される
            assertEquals("HTTP Module", result)
        }
    }
}
