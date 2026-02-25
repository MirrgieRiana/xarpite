package mirrg.xarpite.cli

import kotlinx.coroutines.test.TestScope

/**
 * Ktorサーバーを使用したテストのヘルパー関数。
 * JVMプラットフォームでのみ実装される。
 */
expect suspend fun TestScope.withKtorServer(
    port: Int? = null,
    block: suspend (server: KtorServerControl) -> Unit
)

/**
 * Ktorサーバーの制御インターフェース。
 */
interface KtorServerControl {
    val baseUrl: String
    fun addRoute(path: String, content: String)
}

/**
 * Ktorサーバーが利用可能かどうかを返します。
 */
expect fun isKtorServerAvailable(): Boolean
