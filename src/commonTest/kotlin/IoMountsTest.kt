import kotlinx.coroutines.ExperimentalCoroutinesApi
import kotlinx.coroutines.test.runTest
import mirrg.xarpite.RuntimeContext
import mirrg.xarpite.UnsupportedIoContext
import mirrg.xarpite.test.eval
import mirrg.xarpite.test.string
import kotlin.test.Test
import kotlin.test.assertEquals

@OptIn(ExperimentalCoroutinesApi::class)
class IoMountsTest {
    @Test
    fun fetch() = runTest {
        // FETCH関数のテスト：モック動作で要求が適切な形で来たことを確認し、
        // ダミーの結果を返し、それが関数から適切に返されることを検証
        var capturedUrl: String? = null
        val mockResponse = "Hello, World!".encodeToByteArray()
        
        val result = eval(
            """FETCH("https://example.com/test")""",
            ioContext = object : UnsupportedIoContext() {
                override suspend fun fetch(context: RuntimeContext, url: String): ByteArray {
                    capturedUrl = url
                    return mockResponse
                }
            }
        )
        
        assertEquals("https://example.com/test", capturedUrl)
        assertEquals("Hello, World!", result.string)
    }

    @Test
    fun fetchb() = runTest {
        // FETCHB関数のテスト：モック動作で要求が適切な形で来たことを確認し、
        // ダミーの結果を返し、それが関数から適切に返されることを検証
        var capturedUrl: String? = null
        val mockResponse = byteArrayOf(0x48, 0x65, 0x6C, 0x6C, 0x6F) // "Hello"
        
        val result = eval(
            """FETCHB("https://example.com/data") >> TO_STRING""",
            ioContext = object : UnsupportedIoContext() {
                override suspend fun fetch(context: RuntimeContext, url: String): ByteArray {
                    capturedUrl = url
                    return mockResponse
                }
            }
        )
        
        assertEquals("https://example.com/data", capturedUrl)
        // BLOBの内容を検証
        assertEquals("BLOB.of([72;101;108;108;111])", result.string)
    }

    @Test
    fun fetchReturnsCorrectContent() = runTest {
        // FETCH関数が正しくコンテンツを返すことを検証
        val content = "Test content with special chars: こんにちは"
        val result = eval(
            """FETCH("https://example.com/utf8")""",
            ioContext = object : UnsupportedIoContext() {
                override suspend fun fetch(context: RuntimeContext, url: String): ByteArray = content.encodeToByteArray()
            }
        )
        assertEquals(content, result.string)
    }

    @Test
    fun fetchbReturnsCorrectBytes() = runTest {
        // FETCHB関数が正しくバイト列を返すことを検証
        val bytes = byteArrayOf(0x01, 0x02, 0x03, 0xFF.toByte())
        val result = eval(
            """FETCHB("https://example.com/binary") >> TO_STRING""",
            ioContext = object : UnsupportedIoContext() {
                override suspend fun fetch(context: RuntimeContext, url: String): ByteArray = bytes
            }
        )
        assertEquals("BLOB.of([1;2;3;255])", result.string)
    }
}
