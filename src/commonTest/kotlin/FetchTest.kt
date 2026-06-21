import io.ktor.client.HttpClient
import kotlin.test.Test
import kotlin.test.assertTrue

class FetchTest {
    @Test
    fun httpClientExists() {
        // HttpClientクラスが存在することを確認（ktorのインポートが成功している）
        val className = HttpClient::class.toString()
        assertTrue(className.contains("HttpClient"), "Expected class name to contain 'HttpClient', got: $className")
    }
}
