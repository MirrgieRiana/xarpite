package mirrg.xarpite.cli

import io.ktor.server.application.*
import io.ktor.server.cio.*
import io.ktor.server.engine.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import kotlinx.coroutines.delay
import java.net.ServerSocket

/**
 * テスト用のHTTPサーバーユーティリティークラス。
 * 
 * 指定されたポート（または自動選択）でHTTPサーバーを起動し、
 * 特定のパスに対して特定のコンテンツを返すことができます。
 */
class TestHttpServer(
    private val port: Int = findFreePort(),
) {
    private var server: ApplicationEngine? = null
    private val routes = mutableMapOf<String, String>()
    
    companion object {
        /**
         * 利用可能な空きポートを見つけます。
         */
        fun findFreePort(): Int {
            return ServerSocket(0).use { it.localPort }
        }
    }
    
    /**
     * サーバーのベースURL。
     */
    val baseUrl: String
        get() = "http://localhost:$port"
    
    /**
     * 特定のパスに対するレスポンスを設定します。
     * 
     * @param path パス（例: "/modules/mymodule.xa1"）
     * @param content 返すコンテンツ
     */
    fun addRoute(path: String, content: String) {
        routes[path] = content
    }
    
    /**
     * サーバーを起動します。
     */
    suspend fun start() {
        server = embeddedServer(CIO, port = port) {
            routing {
                for ((path, content) in routes) {
                    get(path) {
                        call.respondText(content)
                    }
                }
            }
        }.start(wait = false)
        
        // サーバーが起動するまで少し待つ
        delay(100)
    }
    
    /**
     * サーバーを停止します。
     */
    fun stop() {
        server?.stop(1000, 2000)
        server = null
    }
}
