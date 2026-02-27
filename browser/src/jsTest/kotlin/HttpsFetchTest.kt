import io.ktor.client.HttpClient
import io.ktor.client.request.get
import io.ktor.client.statement.readRawBytes
import kotlinx.coroutines.test.runTest
import kotlin.test.Test
import kotlin.test.assertEquals

class HttpsFetchTest {
    @Test
    fun httpsRequestWorks() = runTest {
        // HTTPS経由でMavenリポジトリからMD5ファイルを取得
        val url = "https://repo1.maven.org/maven2/io/github/mirrgieriana/xarpite-bin/4.104.0/xarpite-bin-4.104.0.pom.md5"
        val httpClient = HttpClient()
        try {
            val bytes = httpClient.get(url).readRawBytes()
            val content = bytes.decodeToString()
            // 正しいMD5ハッシュ値が取得できることを確認
            assertEquals("e84b8b1e71268402337d0ad3b94f6cc7", content.trim())
        } finally {
            httpClient.close()
        }
    }
}
