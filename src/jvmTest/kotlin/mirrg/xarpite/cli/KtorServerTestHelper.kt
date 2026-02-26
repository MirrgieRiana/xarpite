package mirrg.xarpite.cli

import io.ktor.server.application.*
import io.ktor.server.cio.*
import io.ktor.server.engine.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import kotlinx.coroutines.delay
import kotlinx.coroutines.test.TestScope
import java.net.ServerSocket

/**
 * Ktorサーバーの制御インターフェース。
 */
interface KtorServerControl {
    val baseUrl: String
    fun addRoute(path: String, content: String)
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
    
    suspend fun start() {
        // ルートを登録してからサーバーを起動
        val routesToRegister = routes.toMap()
        server = embeddedServer(CIO, port = port) {
            routing {
                for ((path, content) in routesToRegister) {
                    get(path) {
                        call.respondText(content)
                    }
                }
            }
        }.start(wait = false)
        
        // サーバーが起動するまで少し待つ
        delay(200)
    }
    
    fun stop() {
        server?.stop(1000, 2000)
        server = null
    }
}

/**
 * Ktorサーバーを使用したテストのヘルパー関数。
 * JVMプラットフォーム専用。
 * 
 * setup: ルートを追加する関数
 * test: サーバー起動後にテストを実行する関数
 */
suspend fun TestScope.withKtorServer(
    port: Int? = null,
    setup: (server: KtorServerControl) -> Unit,
    test: suspend (server: KtorServerControl) -> Unit
) {
    val actualPort = port ?: ServerSocket(0).use { it.localPort }
    val control = KtorServerControlImpl(actualPort)
    try {
        // ルートを追加
        setup(control)
        // サーバーを起動
        control.start()
        // テストを実行
        test(control)
    } finally {
        control.stop()
    }
}
