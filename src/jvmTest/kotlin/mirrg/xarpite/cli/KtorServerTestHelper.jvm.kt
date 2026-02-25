package mirrg.xarpite.cli

import io.ktor.server.application.*
import io.ktor.server.cio.*
import io.ktor.server.engine.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import kotlinx.coroutines.delay
import kotlinx.coroutines.test.TestScope
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
        delay(200)
    }
    
    fun stop() {
        server?.stop(1000, 2000)
        server = null
    }
}

actual suspend fun TestScope.withKtorServer(
    port: Int?,
    block: suspend (server: KtorServerControl) -> Unit
) {
    val actualPort = port ?: ServerSocket(0).use { it.localPort }
    val control = KtorServerControlImpl(actualPort)
    try {
        control.start()
        block(control)
    } finally {
        control.stop()
    }
}

actual fun isKtorServerAvailable(): Boolean = true
