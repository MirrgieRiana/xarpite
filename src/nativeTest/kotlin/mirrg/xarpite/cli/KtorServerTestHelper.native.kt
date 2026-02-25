package mirrg.xarpite.cli

import kotlinx.coroutines.test.TestScope

actual suspend fun TestScope.withKtorServer(
    port: Int?,
    block: suspend (server: KtorServerControl) -> Unit
) {
    // Nativeプラットフォームでは現在のところKtorサーバーは利用不可
    throw UnsupportedOperationException("Ktor server is not available on Native platform")
}

actual fun isKtorServerAvailable(): Boolean = false
