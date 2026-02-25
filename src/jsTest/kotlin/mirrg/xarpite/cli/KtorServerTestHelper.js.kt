package mirrg.xarpite.cli

import kotlinx.coroutines.test.TestScope

actual suspend fun TestScope.withKtorServer(
    port: Int?,
    block: suspend (server: KtorServerControl) -> Unit
) {
    // JSプラットフォームではKtorサーバーは利用不可
    throw UnsupportedOperationException("Ktor server is not available on JS platform")
}

actual fun isKtorServerAvailable(): Boolean = false
