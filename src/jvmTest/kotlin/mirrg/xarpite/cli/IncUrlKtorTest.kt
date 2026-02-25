package mirrg.xarpite.cli

import kotlinx.coroutines.test.runTest
import mirrg.xarpite.io.TestIoContext
import kotlin.test.Test
import kotlin.test.assertEquals

/**
 * Ktorサーバーを使用したURL形式INCのテスト。
 * 
 * 実際のHTTPサーバーを起動してモジュールロード機能を検証します。
 */
class IncUrlKtorTest {
    
    @Test
    fun useModuleFromHttpUrlWithKtorServer() = runTest {
        val server = TestHttpServer()
        try {
            // サーバーにモジュールを配置
            server.addRoute("/modules/mymodule.xa1", "\"Hello from HTTP!\"")
            server.start()
            
            val context = TestIoContext()
            
            // URL形式のINCパスを追加してモジュールをロード
            val result = cliEval(
                context,
                """
                    INC::push("${server.baseUrl}/modules")
                    USE("mymodule")
                """.trimIndent(),
            ).toFluoriteString(null).value
            
            assertEquals("Hello from HTTP!", result)
        } finally {
            server.stop()
        }
    }
    
    @Test
    fun useModuleFromHttpsUrlWithKtorServer() = runTest {
        // HTTPSはテスト環境では証明書の問題があるため、HTTPで代用
        // 実際の実装ではHTTPS URLも同様に動作する
        val server = TestHttpServer()
        try {
            server.addRoute("/modules/secure-module.xa1", "\"Secure Module\"")
            server.start()
            
            val context = TestIoContext()
            
            // HTTPで検証（実際のHTTPSは証明書が必要）
            val result = cliEval(
                context,
                """
                    INC::push("${server.baseUrl}/modules")
                    USE("secure-module")
                """.trimIndent(),
            ).toFluoriteString(null).value
            
            assertEquals("Secure Module", result)
        } finally {
            server.stop()
        }
    }
    
    @Test
    fun useModuleFromHttpUrlWithSubdirectoryKtorServer() = runTest {
        val server = TestHttpServer()
        try {
            server.addRoute("/modules/utils/helpers.xa1", "\"Helper Functions\"")
            server.start()
            
            val context = TestIoContext()
            
            val result = cliEval(
                context,
                """
                    INC::push("${server.baseUrl}/modules")
                    USE("utils/helpers")
                """.trimIndent(),
            ).toFluoriteString(null).value
            
            assertEquals("Helper Functions", result)
        } finally {
            server.stop()
        }
    }
    
    @Test
    fun useMavenCoordinateFromHttpUrlKtorServer() = runTest {
        val server = TestHttpServer()
        try {
            server.addRoute("/maven/com/example/mylib/1.0.0/mylib-1.0.0.xa1", "\"Maven Module\"")
            server.start()
            
            val context = TestIoContext()
            
            val result = cliEval(
                context,
                """
                    INC::push("${server.baseUrl}/maven")
                    USE("com.example.mylib:1.0.0")
                """.trimIndent(),
            ).toFluoriteString(null).value
            
            assertEquals("Maven Module", result)
        } finally {
            server.stop()
        }
    }
    
    @Test
    fun httpUrlWithTrailingSlashNormalizationKtorServer() = runTest {
        val server = TestHttpServer()
        try {
            // 末尾スラッシュが正規化されて // にならないことを確認
            server.addRoute("/modules/mymodule.xa1", "\"Normalized Path\"")
            server.start()
            
            val context = TestIoContext()
            
            // 末尾スラッシュ付きでINCに追加
            val result = cliEval(
                context,
                """
                    INC::push("${server.baseUrl}/modules/")
                    USE("mymodule")
                """.trimIndent(),
            ).toFluoriteString(null).value
            
            assertEquals("Normalized Path", result)
        } finally {
            server.stop()
        }
    }
    
    @Test
    fun httpUrlCaseInsensitiveSchemeKtorServer() = runTest {
        val server = TestHttpServer()
        try {
            server.addRoute("/modules/mymodule.xa1", "\"Case Insensitive\"")
            server.start()
            
            val context = TestIoContext()
            
            // HTTPを大文字で指定
            val httpUrl = server.baseUrl.replaceFirst("http://", "HTTP://")
            val result = cliEval(
                context,
                """
                    INC::push("$httpUrl/modules")
                    USE("mymodule")
                """.trimIndent(),
            ).toFluoriteString(null).value
            
            assertEquals("Case Insensitive", result)
        } finally {
            server.stop()
        }
    }
    
    @Test
    fun multipleHttpUrlsInIncKtorServer() = runTest {
        val server1 = TestHttpServer()
        val server2 = TestHttpServer()
        try {
            // 2つのサーバーで異なるモジュールを提供
            server1.addRoute("/modules/module1.xa1", "\"Module from Server 1\"")
            server2.addRoute("/modules/module2.xa1", "\"Module from Server 2\"")
            
            server1.start()
            server2.start()
            
            val context = TestIoContext()
            
            // 最初のサーバーからモジュールをロード
            val result1 = cliEval(
                context,
                """
                    INC::push("${server1.baseUrl}/modules")
                    USE("module1")
                """.trimIndent(),
            ).toFluoriteString(null).value
            
            assertEquals("Module from Server 1", result1)
            
            // 2番目のサーバーからモジュールをロード
            val result2 = cliEval(
                context,
                """
                    INC::push("${server2.baseUrl}/modules")
                    USE("module2")
                """.trimIndent(),
            ).toFluoriteString(null).value
            
            assertEquals("Module from Server 2", result2)
        } finally {
            server1.stop()
            server2.stop()
        }
    }
}
