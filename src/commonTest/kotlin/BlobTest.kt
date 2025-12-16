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
    fun ofFromBlob() = runTest {
        assertEquals("1,2,3", (eval("BLOB.of(BLOB.of([1,2,3]))").blob)) // BLOBからの生成
        assertEquals("", (eval("BLOB.of(BLOB.of([]))").blob)) // 空BLOBの場合
        assertEquals("1", (eval("BLOB.of(BLOB.of([1]))").blob)) // 1要素のBLOB
    }

    @Test
    fun ofFromStream() = runTest {
        // ストリームから生成：複数の配列を結合
        assertEquals("1,0,255,0,1,1,2", (eval("""
            BLOB.of(
                [1, 0, -1],
                [256, 257],
                [1.4, 1.6],
            )
        """).blob))

        // ストリームから生成：BLOBと配列の混在
        assertEquals("1,2,3,4,5", (eval("""
            BLOB.of(
                BLOB.of([1, 2]),
                [3, 4, 5],
            )
        """).blob))

        // ストリームから生成：空の要素を含む
        assertEquals("1,2", (eval("""
            BLOB.of(
                [1],
                [],
                [2],
            )
        """).blob))

        // ストリームから生成：全て空
        assertEquals("", (eval("""
            BLOB.of(
                [],
                [],
            )
        """).blob))
    }

    @Test
    fun toArray() = runTest {
        assertEquals("[1;2;3]", (eval("BLOB.of([1,2,3])::toArray()").array())) // 配列への変換
        assertEquals("[]", (eval("BLOB.of([])::toArray()").array())) // 空の場合
        assertEquals("[1]", (eval("BLOB.of([1])::toArray()").array())) // 1要素の場合

        assertEquals("[0]", (eval("BLOB.of([256])::toArray()").array())) // オーバーフローして戻す
        assertEquals("[255]", (eval("BLOB.of([-1])::toArray()").array())) // 負の領域も正の数として取り出される
        assertEquals("[1]", (eval("BLOB.of([257])::toArray()").array())) // 一旦下位8バイトになり、戻ってきたもの
    }

    companion object {
        @OptIn(ExperimentalUnsignedTypes::class)
        private val FluoriteValue.blob get() = (this as FluoriteBlob).value.map { "$it" }.join(",")
    }
}
