package mirrg.xarpite.io

import io.ktor.client.HttpClient
import io.ktor.client.request.get
import io.ktor.client.statement.readRawBytes

suspend fun fetch(url: String): ByteArray {
    val client = HttpClient()
    try {
        return client.get(url).readRawBytes()
    } finally {
        client.close()
    }
}
