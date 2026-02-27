package mirrg.xarpite.cli

/**
 * Ktorサーバーのコントロールインターフェース
 */
interface KtorServerControl {
    val baseUrl: String
    fun addRoute(path: String, content: String)
    fun start()
    fun stop()
}

/**
 * Ktorサーバーが利用可能かどうかを返す
 * JVMプラットフォームでのみtrueを返す
 */
expect fun isKtorServerAvailable(): Boolean

/**
 * Ktorサーバーを起動してテストを実行する
 * JVMプラットフォームでのみ使用可能
 */
expect suspend fun withKtorServer(block: suspend (KtorServerControl) -> Unit)
