package mirrg.xarpite.cli

actual fun isKtorServerAvailable(): Boolean = false

actual suspend fun withKtorServer(block: suspend (KtorServerControl) -> Unit) {
    error("Ktor server is not available on Linux Native platform")
}
