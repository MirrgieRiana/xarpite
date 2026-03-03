package mirrg.xarpite.cli

import io.ktor.server.application.*
import io.ktor.server.cio.*
import io.ktor.server.engine.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import kotlinx.coroutines.delay

/**
 * Ktorサーバーのコントロールインターフェース
 */
interface KtorServerControl {
    val baseUrl: String
    fun addRoute(path: String, content: String)
    fun stop()
}

private class KtorServerControlImpl(
    private val port: Int
) : KtorServerControl {
    private var server: EmbeddedServer<*, *>? = null
    private val routes = mutableMapOf<String, String>()
    
    override val baseUrl: String
        get() = "http://localhost:$port"
    
    override fun addRoute(path: String, content: String) {
        routes[path] = content
    }
    
    override fun stop() {
        server?.stop(1000, 2000)
        server = null
    }
    
    fun getContent(path: String): String? {
        return routes[path]
    }
    
    suspend fun startServer() {
        // Ktor側でport = 0を使用して空きポートを自動割り当て
        server = embeddedServer(CIO, port = port) {
            routing {
                get("{...}") {
                    val path = call.request.local.uri
                    val content = getContent(path)
                    if (content != null) {
                        call.respondText(content)
                    } else {
                        call.response.status(io.ktor.http.HttpStatusCode.NotFound)
                        call.respondText("Not Found: $path")
                    }
                }
            }
        }.start(wait = false)
        
        // サーバーが実際に応答できるまで待つ
        var retries = 50
        while (retries > 0) {
            try {
                // 簡易的な接続確認
                java.net.Socket("localhost", port).use { }
                break
            } catch (e: Exception) {
                delay(100)
                retries--
            }
        }
        if (retries == 0) {
            throw IllegalStateException("Ktor server failed to start")
        }
    }
}

/**
 * Ktorサーバーを起動してテストを実行する
 * JVMプラットフォーム専用
 */
suspend fun withKtorServer(block: suspend (KtorServerControl) -> Unit) {
    // Ktor側でport = 0を指定して空きポートを自動割り当て
    val port = 0
    val control = KtorServerControlImpl(port)
    try {
        // サーバーを起動（ルートは動的に参照される）
        control.startServer()
        // ブロックを実行（ルート追加とテスト実行）
        block(control)
    } finally {
        control.stop()
    }
}
