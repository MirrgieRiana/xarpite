package mirrg.xarpite.cli

import io.ktor.server.application.*
import io.ktor.server.cio.*
import io.ktor.server.engine.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import kotlinx.coroutines.delay
import java.net.ServerSocket

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
    
    override fun start() {
        // 何もしない（startは自動的に呼ばれる）
    }
    
    override fun stop() {
        server?.stop(1000, 2000)
        server = null
    }
    
    fun getContent(path: String): String? {
        return routes[path]
    }
    
    suspend fun startServer() {
        // 動的にルートを参照するサーバーを起動
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
        
        // サーバーが起動するまで少し待つ
        delay(200)
    }
}

actual fun isKtorServerAvailable(): Boolean = true

actual suspend fun withKtorServer(block: suspend (KtorServerControl) -> Unit) {
    val port = ServerSocket(0).use { it.localPort }
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
