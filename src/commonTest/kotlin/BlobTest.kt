import kotlinx.coroutines.ExperimentalCoroutinesApi
import kotlinx.coroutines.test.runTest
import mirrg.kotlin.helium.join
import mirrg.xarpite.compilers.objects.FluoriteBlob
import mirrg.xarpite.compilers.objects.FluoriteValue
import mirrg.xarpite.test.array
import mirrg.xarpite.test.eval
import kotlin.test.Test
import kotlin.test.assertEquals

@OptIn(ExperimentalCoroutinesApi::class)
class BlobTest {

    @Test
    fun of() = runTest {
        assertEquals("1,2,3", (eval("BLOB.of([1,2,3])").blob)) // 配列からの生成
        assertEquals("", (eval("BLOB.of([])").blob)) // 空配列の場合は空BLOB
        assertEquals("1", (eval("BLOB.of([1])").blob)) // 1要素のBLOB

        assertEquals("0", (eval("BLOB.of([256])").blob)) // 256で0にオーバーフローする
        assertEquals("255", (eval("BLOB.of([-1])").blob)) // -1でも255にオーバーフローする
        assertEquals("1", (eval("BLOB.of([257])").blob)) // 下位8ビットだけが使われる
    }

    @Test
    fun to_array() = runTest {
        assertEquals("[1;2;3]", (eval("BLOB.of([1,2,3])::to_array()").array())) // 配列への変換
        assertEquals("[]", (eval("BLOB.of([])::to_array()").array())) // 空の場合
        assertEquals("[1]", (eval("BLOB.of([1])::to_array()").array())) // 1要素の場合

        assertEquals("[0]", (eval("BLOB.of([256])::to_array()").array())) // オーバーフローして戻す
        assertEquals("[255]", (eval("BLOB.of([-1])::to_array()").array())) // 負の領域も正の数として取り出される
        assertEquals("[1]", (eval("BLOB.of([257])::to_array()").array())) // 一旦下位8バイトになり、戻ってきたもの
    }

    companion object {
        @OptIn(ExperimentalUnsignedTypes::class)
        private val FluoriteValue.blob get() = (this as FluoriteBlob).value.map { "$it" }.join(",")
    }
}
