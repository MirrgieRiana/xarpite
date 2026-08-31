import kotlinx.coroutines.ExperimentalCoroutinesApi
import kotlinx.coroutines.test.runTest
import mirrg.xarpite.compilers.objects.FluoriteNull
import mirrg.xarpite.test.array
import mirrg.xarpite.test.double
import mirrg.xarpite.test.eval
import mirrg.xarpite.test.int
import mirrg.xarpite.test.obj
import mirrg.xarpite.test.stream
import mirrg.xarpite.test.string
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertFails
import kotlin.test.assertTrue

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
    fun slide() = runTest {
        assertEquals("[1;2;3],[2;3;4],[3;4;5]", eval("SLIDE(3; 1, 2, 3, 4, 5)").stream()) // SLIDE でスライディングウィンドウに分割する
        assertEquals("[1;2],[2;3],[3;4],[4;5]", eval("SLIDE(2; 1, 2, 3, 4, 5)").stream()) // サイズ2の場合
        assertEquals("[1;2]", eval("SLIDE(2; 1, 2)").stream()) // 全体の要素数が一致している場合、1個の配列になる
        assertEquals("", eval("SLIDE(2; 1)").stream()) // 要素数がサイズに満たない場合、空ストリームになる
        assertEquals("[1]", eval("SLIDE(1; 1)").stream()) // 第2引数が非ストリームの場合でもストリームの場合と同様に動作する
        assertEquals("", eval("SLIDE(2; ,)").stream()) // 空ストリームの場合、空ストリームになる
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
        assertEquals("2,4", eval("1 .. 5 >> FILTER [ by: x -> x %% 2 ]").stream()) // by指定でも同じ結果が得られる
    }

    @Test
    fun grep() = runTest {
        assertEquals("2,4", eval("1 .. 5 >> GREP [ x => x %% 2 ]").stream()) // GREP は FILTER のエイリアス
        assertEquals("2,4", eval("1 .. 5 >> GREP [ by: x -> x %% 2 ]").stream()) // GREPでもby指定できる
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
        assertEquals("1,2,3,0", eval("1, 2, 3, 3, 3, 2, 1, 0 >> UNIQ").stream()) // UNIQ は DISTINCT のエイリアス
        assertEquals("13,21,24", eval("13, 21, 24, 33, 31, 34 >> UNIQ[by: _ -> _ % 10]").stream()) // UNIQ でもby指定できる
    }

    @Test
    fun minMax() = runTest {
        assertEquals(1.0, eval("MIN(1.0, 2.0, 3.0)").double) // MIN で最小値を得る
        assertEquals(FluoriteNull, eval("MIN(,)")) // 空ストリームの場合、NULL
        assertEquals(3.0, eval("MAX(1.0, 2.0, 3.0)").double) // MAX で最大値を得る
        assertEquals(FluoriteNull, eval("MAX(,)")) // 空ストリームの場合、NULL
        assertEquals(1, eval("1 MIN 2").int) // 中置 MIN で2値の小さい方を得る（左が小さい）
        assertEquals(1, eval("2 MIN 1").int) // 中置 MIN で2値の小さい方を得る（右が小さい）
        assertEquals(5, eval("5 MIN 5").int) // 中置 MIN で2値が等しい場合はその値を得る
        assertEquals(2, eval("1 MAX 2").int) // 中置 MAX で2値の大きい方を得る（右が大きい）
        assertEquals(2, eval("2 MAX 1").int) // 中置 MAX で2値の大きい方を得る（左が大きい）
        assertEquals(5, eval("5 MAX 5").int) // 中置 MAX で2値が等しい場合はその値を得る
        assertEquals(1, eval("(1, 3) MIN (2, 4)").int) // 2引数をストリームとして MIN できる
        assertEquals(4, eval("(1, 3) MAX (2, 4)").int) // 2引数をストリームとして MAX できる
        assertEquals(FluoriteNull, eval("MIN(,; ,)")) // 両引数が空ストリームの場合、NULL
        assertEquals(FluoriteNull, eval("MAX(,; ,)")) // 両引数が空ストリームの場合、NULL
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
    fun get() = runTest {
        assertEquals(10, eval("GET(0; 10, 20, 30)").int) // インデックスは0から始まる
        assertEquals(20, eval("GET(1; 10, 20, 30)").int) // GET でインデックスに対応する要素を取得する
        assertEquals(30, eval("GET(2; 10, 20, 30)").int) // 末尾の要素も取得できる

        assertEquals(FluoriteNull, eval("GET(3; 10, 20, 30)")) // 範囲外のインデックスは NULL になる
        assertEquals(FluoriteNull, eval("GET(5; 10, 20, 30)")) // 大きく外れたインデックスも NULL になる

        assertFails { eval("GET(-1; 10, 20, 30)") } // 負のインデックスはエラーになる
        assertFails { eval("GET(-1, 0; 10, 20, 30)") } // インデックスがストリームでも負のインデックスが混入すればエラーになるのだ

        assertEquals("10,30", eval("GET(0, 2; 10, 20, 30)").stream()) // インデックスがストリームの場合、戻り値もストリームになるのだ
        assertEquals("20,30,40", eval("GET(1 .. 3; 10, 20, 30, 40, 50)").stream()) // 範囲指定で複数の要素を取得できるのだ
        assertEquals("10,NULL,30", eval("GET(0, 5, 2; 10, 20, 30)").stream()) // 範囲外のインデックスはその位置だけ NULL になるのだ
        assertEquals("", eval("GET(,; 10, 20, 30)").stream()) // インデックスが空ストリームの場合、空ストリームになるのだ

        assertEquals(10, eval("GET(0; 10)").int) // 値が非ストリームの場合でも要素を取得できる
        assertEquals(FluoriteNull, eval("GET(1; 10)")) // 非ストリームの値に対する範囲外は NULL になる

        assertEquals(FluoriteNull, eval("GET(0; ,)")) // 値が空ストリームかつインデックスが非ストリームの場合、NULL になるのだ
        assertEquals("NULL,NULL", eval("GET(0, 1; ,)").stream()) // 値が空ストリームかつインデックスがストリームの場合、NULL のストリームになるのだ

        assertEquals(20, eval("10, 20, 30, 40, 50 >> GET[1]").int) // インデックスが第1引数なので部分適用できる
        assertEquals("20,30,40", eval("10, 20, 30, 40, 50 >> GET[1 .. 3]").stream()) // インデックスストリームでも部分適用できるのだ

        assertEquals("[1;2;3]", eval("""
            array := []
            stream := 1 .. 100 | ( array::push << _ ; _ )
            GET(2; stream)
            array
        """).array()) // 必要なインデックスまでしか元ストリームを読まず、先読みもしない
        assertEquals("[1;2;3]", eval("""
            array := []
            stream := 1 .. 100 | ( array::push << _ ; _ )
            (GET(0, 2; stream)) >> VOID
            array
        """).array()) // インデックスがストリームの場合も最大のインデックスまでしか読まないのだ

        assertEquals(2, eval("""
            nat := GENERATE(yield -> ( i := 0 ; WHILE [ => TRUE ] ( => yield << i ; i = i + 1 ) ))
            GET(2; nat)
        """).int) // 無限の値ストリームでも必要な位置まで読めば打ち切れる

        assertFails {
            eval("""
                nat := GENERATE(yield -> ( i := 0 ; WHILE [ => TRUE ] ( => yield << i ; i = i + 1 ) ))
                GET(-1; nat)
            """)
        } // 負のインデックスは元ストリームを一切読まないので、無限ストリームでもハングせずエラーになる
    }

    @Test
    fun single() = runTest {
        // SINGLE with multiple elements should throw error
        assertFails { eval("SINGLE(4, 5, 6)") }

        // SINGLE with single element should return that element
        assertEquals(6, eval("SINGLE(6)").int)

        // SINGLE with empty stream should throw error
        assertFails { eval("SINGLE(,)") }

        // SINGLE with single element stream should return that element
        assertEquals(7, eval("SINGLE(7,)").int)
    }

    @Test
    fun indexed() = runTest {
        assertEquals("[0;a],[1;b],[2;c]", eval("\"a\", \"b\", \"c\" >> INDEXED").stream()) // INDEXED でストリームの各要素にインデックスを付与する
        assertEquals("[0;10],[1;20],[2;30]", eval("10, 20, 30 >> INDEXED").stream()) // 数値のストリームでも動作する
        assertEquals("[0;1]", eval("1 >> INDEXED").stream()) // 非ストリームの場合、インデックス0の1要素ストリームになる
        assertEquals("", eval(", >> INDEXED").stream()) // 空ストリームの場合、空ストリームになる
        assertEquals("[0;a],[1;b],[2;c]", eval("\"a\", \"b\", \"c\" | i, v => [i; v]").stream()) // パイプ演算子の i, v => と同様の効果を持つ
    }

    @Test
    fun transpose() = runTest {
        assertEquals("[1;4],[2;5],[3;6]", eval("TRANSPOSE([1, 2, 3], [4, 5, 6])").stream()) // TRANSPOSE で配列のストリームを転置する
        assertEquals("[1;4],[2;5],[3;6]", eval("ZIP([1, 2, 3], [4, 5, 6])").stream()) // ZIP は TRANSPOSE の別名
        assertEquals("[a;x],[b;y],[c;z]", eval("TRANSPOSE([\"a\", \"b\", \"c\"], [\"x\", \"y\", \"z\"])").stream()) // 文字列でも動作する
        assertEquals("[1;4;7],[2;5;8],[3;6;9]", eval("TRANSPOSE([1, 2, 3], [4, 5, 6], [7, 8, 9])").stream()) // 3つ以上の配列でも動作する
        assertEquals("[1;4]", eval("TRANSPOSE([1], [4])").stream()) // 要素が1つでも動作する
        assertEquals("", eval("TRANSPOSE(,)").stream()) // 空ストリームの場合、空ストリームになる
        assertFails { eval("TRANSPOSE([1, 2, 3], [4, 5])").stream() } // 長さが異なる場合、エラーになる
        assertEquals("[1;4],[2;5],[3;0]", eval("TRANSPOSE[fill: 0]([1, 2, 3], [4, 5])").stream()) // fill を指定すると、短い配列をパディングする
        assertEquals("[1;4;7],[2;5;0],[3;0;0]", eval("TRANSPOSE[fill: 0]([1, 2, 3], [4, 5], [7])").stream()) // 複数の配列が短い場合でもパディングする
        assertEquals("{name:Alice;age:30;city:Tokyo}", eval("keys := [\"name\", \"age\", \"city\"]; values := [\"Alice\", 30, \"Tokyo\"]; ZIP(keys, values) >> TO_OBJECT").obj) // keys と values からオブジェクトを構成できる
    }

    @Test
    fun group() = runTest {
        assertEquals("[1;[14]],[2;[25]]", eval("14, 25 >> GROUP[by: _ -> _.&.0]").stream()) // GROUPでグループのストリームになる
        assertEquals("[1;[14]]", eval("14 >> GROUP[by: _ -> _.&.0]").stream()) // 要素が1個でもよい
        assertEquals("", eval(", >> GROUP[by: _ -> _.&.0]").stream()) // 要素が0個でもよい
        assertEquals("[1;[14;15]]", eval("14, 15 >> GROUP[by: _ -> _.&.0]").stream()) // すべてが同じグループになってもよい
        assertEquals("[1;[14]],[2;[25]],[3;[36]]", eval("14, 25, 36 >> GROUP[by: _ -> _.&.0]").stream()) // 3要素でもよい
        assertEquals("[1;[14;15]],[3;[36]]", eval("14, 15, 36 >> GROUP[by: _ -> _.&.0]").stream()) // 部分的にグループ化されてもよい

        assertEquals("[1;[1;1]],[2;[2;2]],[3;[3]]", eval("1, 2, 1, 3, 2 >> GROUP").stream()) // byを省略した場合、要素自身がキーになる
        assertEquals("[1;[1]]", eval("1 >> GROUP").stream()) // 要素が1個でもよい
        assertEquals("", eval(", >> GROUP").stream()) // 要素が0個でもよい

        assertEquals("[apple;[apple;apple]],[cherry;[cherry]],[banana;[banana;banana]]", eval(""""apple", "cherry","banana", "banana", "apple" >> GROUP""").stream()) // 文字列のグループ化
    }

    @Test
    fun tally() = runTest {
        assertEquals("[1;1],[2;1]", eval("14, 25 >> TALLY[by: _ -> _.&.0]").stream()) // TALLYでキーと個数のストリームになる
        assertEquals("[1;1]", eval("14 >> TALLY[by: _ -> _.&.0]").stream()) // 要素が1個でもよい
        assertEquals("", eval(", >> TALLY[by: _ -> _.&.0]").stream()) // 要素が0個でもよい
        assertEquals("[1;2]", eval("14, 15 >> TALLY[by: _ -> _.&.0]").stream()) // すべてが同じキーになってもよい
        assertEquals("[1;1],[2;1],[3;1]", eval("14, 25, 36 >> TALLY[by: _ -> _.&.0]").stream()) // 3要素でもよい
        assertEquals("[1;2],[3;1]", eval("14, 15, 36 >> TALLY[by: _ -> _.&.0]").stream()) // 部分的に同じキーになってもよい

        assertEquals("[1;1],[2;1]", eval("14, 25 >> TALLY[_ -> _.&.0]").stream()) // 第1引数でもキー取得関数を指定できる

        assertEquals("[1;2],[2;2],[3;1]", eval("1, 2, 1, 3, 2 >> TALLY").stream()) // byを省略した場合、要素自身がキーになる
        assertEquals("[1;1]", eval("1 >> TALLY").stream()) // 要素が1個でもよい
        assertEquals("", eval(", >> TALLY").stream()) // 要素が0個でもよい

        assertEquals("[apple;2],[cherry;1],[banana;2]", eval(""""apple", "cherry","banana", "banana", "apple" >> TALLY""").stream()) // 文字列の数え上げ
        assertEquals("[c;1],[b;2],[a;3]", eval(""""c", "b", "b", "a", "a", "a" >> TALLY""").stream()) // 個数の順序ではなく、最初にキーが現れた順序になる

        assertEquals("[a;3],[b;2],[c;1]", eval(""""c", "b", "b", "a", "a", "a" >> TALLY >> SORTR[by: _ -> _.1]""").stream()) // SORTRで個数の降順に並べ替えられる
        assertEquals("{apple:2;cherry:1;banana:2}", eval(""""apple", "cherry","banana", "banana", "apple" >> TALLY >> TO_OBJECT""").obj) // TO_OBJECTでオブジェクトにまとめられる

        assertFails { eval("TALLY()") } // 引数なしの場合、エラーになる

        assertEquals("[1;2],[2;2],[3;1]", eval("1, 2, 1, 3, 2 >> HISTOGRAM").stream()) // HISTOGRAMはTALLYの別名
    }

    @Test
    fun tallyWidth() = runTest {
        assertEquals("[0;2],[100;3],[200;2]", eval("105, 230, 187, 42, 299, 150, 88 >> TALLY[width: 100]").stream()) // widthを指定すると、階級の下限値と度数のエントリーになる
        assertEquals("[100;2],[200;0],[300;0],[400;2]", eval("105, 187, 420, 450 >> TALLY[width: 100]").stream()) // 度数0の階級も含まれるが、値のある範囲の外側の階級は含まれない
        assertEquals("[999999900;1],[1000000000;1],[1000000100;1]", eval("999999900, 1000000000, 1000000100 >> TALLY[width: 100]").stream()) // 値が0から遠くても、0付近の階級は含まれない
        assertEquals("[200;1],[100;0],[0;1]", eval("250, 50 >> TALLY[width: 100] >> SORTR[by: _ -> _.0]").stream()) // 出力は階級の昇順であり、SORTRで降順に並べ替えられる

        assertEquals("[-200;1],[-100;1],[0;1]", eval("-150, -50, 50 >> TALLY[width: 100]").stream()) // 負の値でも階級の幅が保たれる
        assertEquals("[0;1],[100;1],[200;1]", eval("0, 100, 200 >> TALLY[width: 100]").stream()) // 階級の下限値そのものは、その階級に含まれる
        assertEquals("[0.25;2],[0.5;0],[0.75;1]", eval("0.3, 0.4, 0.8 >> TALLY[width: 0.25]").stream()) // widthが小数の場合、階級の下限値も小数になる

        assertEquals("[0;1]", eval("5 >> TALLY[width: 100]").stream()) // 第2引数が非ストリームの場合でもストリームの場合と同様に動作する
        assertEquals("", eval(", >> TALLY[width: 100]").stream()) // 空ストリームの場合、空ストリームになる

        assertEquals("[0;2],[100;3],[200;2]", eval("105, 230, 187, 42, 299, 150, 88 >> HISTOGRAM[width: 100]").stream()) // HISTOGRAMはTALLYの別名

        assertFails { eval("1, 2 >> TALLY[width: 100; by: _ -> _]").stream() } // widthとbyを同時に指定した場合、エラーになる
        assertFails { eval("1, 2 >> TALLY[width: 0]").stream() } // widthが0の場合、エラーになる
        assertFails { eval("1, 2 >> TALLY[width: 0 - 1]").stream() } // widthが負の場合、エラーになる
    }

    @Test
    fun shuffle() = runTest {
        assertEquals("1,2,3", eval("1, 2, 3 >> SHUFFLE >> SORT").stream()) // SHUFFLEでシャッフルする
        assertEquals("1", eval("1, >> SHUFFLE").stream()) // 1要素のストリームはその要素だけのストリームを返す
        assertEquals(1, eval("1 >> SHUFFLE").int) // 非ストリームはその要素を返す
        assertEquals("", eval(", >> SHUFFLE").stream()) // 空ストリームは空ストリームを返す
    }

    @Test
    fun random() = runTest {
        assertTrue(eval("1, 2, 3 >> RANDOM").int in 1..3) // RANDOMでストリームからランダムな要素を1つ選ぶ
        assertEquals(1, eval("1 >> RANDOM").int) // 非ストリームはその要素を返す
        assertEquals(FluoriteNull, eval(", >> RANDOM")) // 空ストリームの場合、NULLを返す
        assertEquals(42, eval("42, >> RANDOM").int) // 1要素のストリームはその要素を返す
        assertFails { eval("RANDOM()") } // 引数なしの場合、エラーを返す
    }

    @Test
    fun pipe() = runTest {
        // 複数回の読み取りで位置を記憶
        assertEquals(5, eval("""
            pipe := PIPE(1 .. 10)
            FIRST(pipe)
            TAKE(3; pipe)
            FIRST(pipe)
        """).int)

        // 副作用は1度だけ発生
        assertEquals("[1;2;3]", eval("""
            array := []
            pipe := PIPE(1 .. 3 | (
                array::push << _
                _
            ))
            pipe
            pipe
            array
        """).array())

        // 未消費時は副作用なし
        assertEquals("[]", eval("""
            array := []
            pipe := PIPE(1 .. 3 | (
                array::push << _
                _
            ))
            array
        """).array())

        // 空ストリーム
        assertEquals("", eval("""
            pipe := PIPE(,)
            pipe
        """).stream())

        // 非ストリーム
        assertEquals(42, eval("""
            pipe := PIPE(42)
            FIRST(pipe)
        """).int)
    }

    @Test
    fun void() = runTest {
        // VOIDの呼び出しごとにstreamは1回イテレートされる
        assertEquals("[1;2;3;1;2;3]", eval("""
            array := []
            stream := 1 .. 3 | (
                array::push << _
                _
            )
            VOID(stream)
            VOID(stream)
            array
        """).array())

        // VOIDの戻り値はNULLで、元のストリームとは無関係
        assertEquals(FluoriteNull, eval("""
            null := VOID(1 .. 3)
            null
        """))

        // 非ストリームでも動作する
        assertEquals(FluoriteNull, eval("VOID(42)"))

        // 空ストリームでも動作する
        assertEquals(FluoriteNull, eval("VOID(,)"))
    }


    @Test
    fun cache() = runTest {
        // CACHEの呼び出しごとにstreamは1回イテレートされる
        assertEquals("[1;2;3;1;2;3]", eval("""
            array := []
            stream := 1 .. 3 | (
                array::push << _
                _
            )
            CACHE(stream)
            CACHE(stream)
            array
        """).array())

        // CACHEの戻り値のストリームは何度評価しても副作用が発生しない
        assertEquals("[1;2;3]", eval("""
            array := []
            cached := CACHE(1 .. 3 | (
                array::push << _
                _
            ))
            cached
            cached
            array
        """).array())

        // 非ストリームでもそのまま返す
        assertEquals(42, eval("CACHE(42)").int)

        // 空ストリームも正しくキャッシュする
        assertEquals("", eval("CACHE(,)").stream())
    }

    @Test
    fun toStream() = runTest {
        // ストリーム入力 → そのまま返す
        assertEquals("1,2,3", eval("TO_STREAM(1, 2, 3)").stream())
        // 非ストリーム入力 → ストリームに変換
        assertEquals("1", eval("TO_STREAM(1)").stream())
        // 空ストリーム入力 → そのまま返す
        assertEquals("", eval("TO_STREAM(,)").stream())
    }


}
