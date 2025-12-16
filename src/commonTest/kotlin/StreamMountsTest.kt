import kotlinx.coroutines.ExperimentalCoroutinesApi
import kotlinx.coroutines.test.runTest
import mirrg.xarpite.compilers.objects.FluoriteNull
import mirrg.xarpite.test.double
import mirrg.xarpite.test.eval
import mirrg.xarpite.test.int
import mirrg.xarpite.test.stream
import mirrg.xarpite.test.string
import kotlin.test.Test
import kotlin.test.assertEquals

@OptIn(ExperimentalCoroutinesApi::class)
class StreamMountsTest {

    @Test
    fun chunk() = runTest {
        assertEquals("[1;2],[3;4]", eval("CHUNK(2; 1, 2, 3, 4)").stream()) // CHUNK でストリームを分割する
        assertEquals("[1;2],[3;4],[5]", eval("CHUNK(2; 1, 2, 3, 4, 5)").stream()) // 要素が余る場合、余った部分だけの配列を生成する
        assertEquals("[1;2]", eval("CHUNK(2; 1, 2)").stream()) // 全体の要素数が一致している場合、その配列になる
        assertEquals("[1;2]", eval("CHUNK(4; 1, 2)").stream()) // 全体の要素数が足りない場合、その配列になる
        assertEquals("[1]", eval("CHUNK(2; 1)").stream()) // 第2引数が非ストリームの場合でもストリームの場合と同様に動作する
        assertEquals("", eval("CHUNK(2; ,)").stream()) // 空ストリームの場合、空ストリームになる
    }

    @Test
    fun takeDrop() = runTest {
        assertEquals("1,2", eval("TAKE(2; 1, 2, 3)").stream()) // TAKE で先頭を取得
        assertEquals("1,2", eval("TAKE(2; 1, 2)").stream()) // 要素が丁度の場合はそのまま返す
        assertEquals("1", eval("TAKE(2; 1)").stream()) // 要素が足りない場合はある分だけ返す
        assertEquals("", eval("TAKE(0; 1, 2)").stream()) // 0個取得の場合は空ストリームになる
        assertEquals("", eval("TAKE(2; ,)").stream()) // 空ストリームの場合、空ストリームになる

        assertEquals("2,3", eval("TAKER(2; 1, 2, 3)").stream()) // TAKER で末尾を取得
        assertEquals("1,2", eval("TAKER(2; 1, 2)").stream()) // 要素が丁度の場合はそのまま返す
        assertEquals("1", eval("TAKER(2; 1)").stream()) // 要素が足りない場合はある分だけ返す
        assertEquals("", eval("TAKER(0; 1, 2)").stream()) // 0個取得の場合は空ストリームになる
        assertEquals("", eval("TAKER(2; ,)").stream()) // 空ストリームの場合、空ストリームになる

        assertEquals("3", eval("DROP(2; 1, 2, 3)").stream()) // DROP で先頭を破棄
        assertEquals("", eval("DROP(2; 1, 2)").stream()) // 要素が丁度の場合は空ストリームになる
        assertEquals("", eval("DROP(2; 1)").stream()) // 要素が足りない場合は空ストリームになる
        assertEquals("1,2", eval("DROP(0; 1, 2)").stream()) // 0個破棄の場合は元のストリームになる
        assertEquals("", eval("DROP(2; ,)").stream()) // 空ストリームの場合、空ストリームになる

        assertEquals("1", eval("DROPR(2; 1, 2, 3)").stream()) // DROPR で末尾を破棄
        assertEquals("", eval("DROPR(2; 1, 2)").stream()) // 要素が丁度の場合は空ストリームになる
        assertEquals("", eval("DROPR(2; 1)").stream()) // 要素が足りない場合は空ストリームになる
        assertEquals("1,2", eval("DROPR(0; 1, 2)").stream()) // 0個破棄の場合は元のストリームになる
        assertEquals("", eval("DROPR(2; ,)").stream()) // 空ストリームの場合、空ストリームになる
    }

    @Test
    fun filter() = runTest {
        assertEquals("2,4", eval("1 .. 5 >> FILTER [ x => x %% 2 ]").stream()) // FILTER で条件を満たす要素のみを抽出する
    }


    @Test
    fun sum() = runTest {
        assertEquals(0, eval("SUM(,)").int) // 引数がない場合は0
        assertEquals(1, eval("SUM(1)").int) // 引数が1つの場合はそのまま
        assertEquals(3, eval("SUM(1, 2)").int) // 引数が2つ以上の場合は合計
    }

    @Test
    fun count() = runTest {
        assertEquals(0, eval("COUNT(,)").int) // 空ストリームなら0
        assertEquals(1, eval("COUNT(1)").int) // 非ストリームなら1
        assertEquals(2, eval("COUNT(1, 2)").int) // 複数要素なら個数
    }

    @Test
    fun reverse() = runTest {
        assertEquals("3,2,1", eval("REVERSE(1, 2, 3)").stream()) // REVERSE でストリームを逆順にする
        assertEquals("3:2:1", eval(" '1-2-3' >> SPLIT['-'] >> REVERSE >> JOIN[':'] ").string) // REVERSE はパイプと組み合わせて使うと便利
    }

    @Test
    fun distinct() = runTest {
        assertEquals("1,2,3,0", eval("1, 2, 3, 3, 3, 2, 1, 0 >> DISTINCT").stream()) // DISTINCT で重複を除去する
        assertEquals(1, eval("1 >> DISTINCT").int) // 非ストリームの場合、それがそのまま出てくる
        assertEquals("", eval(", >> DISTINCT").stream()) // 空ストリームの場合、空ストリームになる

        assertEquals("13,21,24", eval("13, 21, 24, 33, 31, 34 >> DISTINCT[by: _ -> _ % 10]").stream()) // byでキーを指定して重複を除去できる
    }

    @Test
    fun minMax() = runTest {
        assertEquals(1.0, eval("MIN(1.0, 2.0, 3.0)").double) // MIN で最小値を得る
        assertEquals(FluoriteNull, eval("MIN(,)")) // 空ストリームの場合、NULL
        assertEquals(3.0, eval("MAX(1.0, 2.0, 3.0)").double) // MAX で最大値を得る
        assertEquals(FluoriteNull, eval("MAX(,)")) // 空ストリームの場合、NULL
    }

    @Test
    fun reduce() = runTest {
        assertEquals(10, eval("1 .. 4 >> REDUCE[a, b -> a + b]").int) // ストリームの集約を行う REDUCE 関数
        assertEquals(123, eval("123 >> REDUCE[a, b -> a + b]").int) // ストリームでない場合、その値がそのまま帰ってくる
        assertEquals(123, eval("123, >> REDUCE[a, b -> a + b]").int) // 長さが1のストリームでもその値がそのまま帰ってくる
        assertEquals(FluoriteNull, eval(", >> REDUCE[a, b -> a + b]")) // 長さが0のストリームはNULLになる
    }

    @Test
    fun sort() = runTest {
        assertEquals("1,2,3", eval("3, 1, 2 >> SORT").stream()) // SORT でストリームをソートできる
        assertEquals("3,2,1", eval("3, 1, 2 >> SORTR").stream()) // SORTR で降順にソートする

        assertEquals("21,32,13", eval("13, 21, 32 >> SORT[a, b -> a % 10 <=> b % 10]").stream()) // 2引数の関数を指定して比較をカスタマイズできる

        assertEquals("21,32,13", eval("13, 21, 32 >> SORT[by: _ -> _ % 10]").stream()) // byでソートキーを指定できる
    }

    @Test
    fun firstLast() = runTest {
        // FIRST
        assertEquals(4, eval("FIRST(4, 5, 6)").int)
        assertEquals(4, eval("FIRST(4)").int)
        assertEquals(FluoriteNull, eval("FIRST(,)"))

        // LAST
        assertEquals(6, eval("LAST(4, 5, 6)").int)
        assertEquals(6, eval("LAST(6)").int)
        assertEquals(FluoriteNull, eval("LAST(,)"))
    }

    @Test
    fun single() = runTest {
        // SINGLE with multiple elements should throw error
        assertEquals("Error", eval("SINGLE(4, 5, 6) !? 'Error'").string)
        
        // SINGLE with single element should return that element
        assertEquals(6, eval("SINGLE(6)").int)
        
        // SINGLE with empty stream should throw error
        assertEquals("Error", eval("SINGLE(,) !? 'Error'").string)
        
        // SINGLE with single element stream should return that element
        assertEquals(7, eval("SINGLE(7,)").int)
    }

    @Test
    fun group() = runTest {
        assertEquals("[1;[14]],[2;[25]]", eval("14, 25 >> GROUP[by: _ -> _.&.0]").stream()) // GROUPでグループのストリームになる
        assertEquals("[1;[14]]", eval("14 >> GROUP[by: _ -> _.&.0]").stream()) // 要素が1個でもよい
        assertEquals("", eval(", >> GROUP[by: _ -> _.&.0]").stream()) // 要素が0個でもよい
        assertEquals("[1;[14;15]]", eval("14, 15 >> GROUP[by: _ -> _.&.0]").stream()) // すべてが同じグループになってもよい
        assertEquals("[1;[14]],[2;[25]],[3;[36]]", eval("14, 25, 36 >> GROUP[by: _ -> _.&.0]").stream()) // 3要素でもよい
        assertEquals("[1;[14;15]],[3;[36]]", eval("14, 15, 36 >> GROUP[by: _ -> _.&.0]").stream()) // 部分的にグループ化されてもよい
    }

    @Test
    fun shuffle() = runTest {
        assertEquals("1,2,3", eval("1, 2, 3 >> SHUFFLE >> SORT").stream()) // SHUFFLEでシャッフルする
        assertEquals("1", eval("1, >> SHUFFLE").stream()) // 1要素のストリームはその要素だけのストリームを返す
        assertEquals(1, eval("1 >> SHUFFLE").int) // 非ストリームはその要素を返す
        assertEquals("", eval(", >> SHUFFLE").stream()) // 空ストリームは空ストリームを返す
    }

}
