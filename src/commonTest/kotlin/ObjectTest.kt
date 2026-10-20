import kotlinx.coroutines.ExperimentalCoroutinesApi
import kotlinx.coroutines.test.runTest
import mirrg.xarpite.operations.FluoriteException
import mirrg.xarpite.test.boolean
import mirrg.xarpite.test.eval
import mirrg.xarpite.test.int
import mirrg.xarpite.test.obj
import mirrg.xarpite.test.stream
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertFailsWith
import kotlin.test.assertTrue

@OptIn(ExperimentalCoroutinesApi::class)
class ObjectTest {

    @Test
    fun obj() = runTest {
        assertEquals("{a:1}", eval(""" {"a": 1} """).obj) // { } でオブジェクトを作れる
        assertEquals("{a:1}", eval("{a: 1}").obj) // キーの " は省略できる
        assertEquals("{1:2}", eval("{1: 2}").obj) // キーは数値でもよい
        assertEquals("{1:2}", eval("1 | a => {(a): 2}").obj) // キーに ( ) を付けると変数を参照できる
        assertEquals("{a:1;b:2}", eval("{a: 1; b: 2}").obj) // エントリーは ; で区切ることができる
        assertEquals("{a:1;b:2}", eval("{; ; a: 1; ; b: 2; ; }").obj) // ; は無駄に大量にあってもよい
        assertEquals("{}", eval("{; }").obj) // ; しかなくてもよい
        assertEquals("{a:1;b:2}", eval("{(a: 1), (b: 2)}").obj) // エントリーのストリームでもよい
        assertEquals("{a:1;b:2;c:3}", eval("{(a: 1), (b: 2); c: 3}").obj) // エントリーのストリームとエントリーが混在してもよい
        assertEquals("{1:2;2:4;3:6}", eval("{1 .. 3 | a => (a): a * 2}").obj) // エントリー列を返す式でもよい
        assertEquals("{}", eval(""" {} """).obj) // 空でもよい

        assertEquals(true, eval(""" A := {}; a := A {}; a ?= A """).boolean) // 親クラスを取るオブジェクト

        assertEquals("{a:100;b:123}", eval("{a := 100; b: a + 23}").obj) // オブジェクト内で変数が宣言できる
        assertEquals("{a:100;b:120;c:123}", eval("{a := 100; b := a + 20; c: b + 3}").obj) // 変数の初期化子の中からも変数を参照できる
        assertEquals("{a:100}", eval("{a := 100}").obj) // 変数宣言しかなくても初期化される
        assertEquals("{a:100;b:123}", eval("{b: a + 23; a := 100}").obj) // オブジェクトリテラル内の変数は参照した時点で初期化される
        assertEquals(20, eval("o := {v := 10; f: () -> v}; o.v = 20; o.f()").int) // オブジェクト変数はそのオブジェクトのエントリーの値と連動する
        assertEquals(20, eval("o := {v := 10; f: (n) -> v = n}; o.f(20); o.v").int) // 代入も可能
    }

    @Test
    fun keysValues() = runTest {
        assertEquals("a,b,c", eval("KEYS({a: 1; b: 2; c: 3})").stream()) // KEYS でオブジェクトのキーを得る
        assertEquals("1,2,3", eval("VALUES({a: 1; b: 2; c: 3})").stream()) // VALUES でオブジェクトの値を得る

        // KEYS のストリーム版
        assertEquals("a,b,c,d", eval("KEYS({a: 1; b: 2}, {c: 3; d: 4})").stream()) // KEYS でストリームのオブジェクトのキーを平坦化する
        assertEquals("x", eval("KEYS({x: 10})").stream()) // KEYS で単一のオブジェクトも動作する
        assertEquals("", eval("KEYS(E)").stream()) // KEYS で空のストリームは空のストリームを返す
    }

    @Test
    fun parent() = runTest {
        assertEquals(true, eval("PARENT(1) == INT").boolean) // PARENT で値の親オブジェクトを得る
        assertEquals(true, eval("PARENT(INT) == VALUE").boolean) // クラスの親はその親クラス
        assertEquals(true, eval("PARENT(VALUE) == NULL").boolean) // 親を持たない値は NULL を返す
        assertEquals(true, eval("PARENT({}) == OBJECT").boolean) // オブジェクトリテラルの親は OBJECT
        assertEquals(true, eval("A := {}; a := A{}; PARENT(a) == A").boolean) // インスタンスの親はそのクラス
        assertEquals(true, eval("Animal := {}; Human := Animal{}; PARENT(Human) == Animal").boolean) // クラスの親は親クラス
        assertEquals(true, eval("PARENT(1, 2, 3) == STREAM").boolean) // ストリームを渡すとストリーム自身の親 STREAM を返す
    }

    @Test
    fun extensionNew() = runTest {
        // ::NEW はレシーバーを親とするインスタンスを作って、その `<>` を呼ぶ
        """
            Animal := {
                `<>`: this -> :
                    this.legs = 4
            }
            Animal::NEW()
        """.let { assertEquals("{legs:4}", eval(it).obj) }

        // 第 2 引数以降が `<>` へ渡る
        """
            Animal := {
                `<>`: this, age -> :
                    this.age = age
            }
            Animal::NEW(3)
        """.let { assertEquals("{age:3}", eval(it).obj) }

        // 継承したクラスから呼ぶと、そのクラスのインスタンスが返り、`<>` から親の `<>` を名前で呼べる
        """
            Animal := {
                `<>`: this, age -> :
                    this.age = age
            }
            Human := Animal {
                `<>`: this, age, name -> :
                    Animal.`<>`(this; age)
                    this.name = name
            }
            Human::NEW(22; "Herirmina")
        """.let { assertEquals("{age:22;name:Herirmina}", eval(it).obj) }

        // `<>` から呼ぶメソッドは、子クラスでオーバーライドされたものが使われる
        """
            Animal := {
                `<>`: this -> :
                    this.species = this::getSpecies()
                getSpecies: this -> "Animal"
            }
            Human := Animal {
                getSpecies: this -> "Human"
            }
            Human::NEW()
        """.let { assertEquals("{species:Human}", eval(it).obj) }

        // 返るインスタンスの親はレシーバー
        """
            Animal := {`<>`: this -> NULL}
            Human := Animal {`<>`: this -> NULL}
            PARENT(Human::NEW()) == Human
        """.let { assertEquals(true, eval(it).boolean) }

        // `<>` がストリームを返しても、その副作用は起こる
        """
            result := NULL
            Counter := {
                `<>`: this -> 1 .. 3 | _ => result = _
            }
            Counter::NEW()
            result
        """.let { assertEquals(3, eval(it).int) }

        // 親のクラスが NEW メソッドを持つ場合は、そちらが優先される
        """
            Animal := {
                NEW: this -> "NEW!"
            }
            animal := Animal{}
            animal::NEW()
        """.let { assertEquals("NEW!", eval(it).toString()) }

        // `<>` を持たないクラスに対しては失敗する
        val exception = assertFailsWith<FluoriteException> { eval("{}::NEW()") }
        assertTrue(exception.message!!.contains("<>")) // 見つからなかったメソッドが `<>` であることが分かる
    }

    @Test
    fun functionNew() = runTest {
        // NEW は第 1 引数をレシーバーとして受け取る
        """
            Animal := {
                `<>`: this -> :
                    this.legs = 4
            }
            NEW(Animal)
        """.let { assertEquals("{legs:4}", eval(it).obj) }

        // 第 2 引数以降が `<>` へ渡る
        """
            Animal := {
                `<>`: this, age -> :
                    this.age = age
            }
            NEW(Animal; 3)
        """.let { assertEquals("{age:3}", eval(it).obj) }

        // レシーバーが NEW メソッドを持っていても、こちらは関数だから影響を受けない
        """
            Animal := {
                NEW: this -> "NEW!"
                `<>`: this -> :
                    this.legs = 4
            }
            NEW(Animal)
        """.let { assertEquals("{legs:4}", eval(it).obj) }
    }

    @Test
    fun invert() = runTest {
        // 基本的な反転
        assertEquals("{apple:a;banana:b;cherry:c}", eval("INVERT({a: \"apple\"; b: \"banana\"; c: \"cherry\"})").obj)

        // 数値も文字列化される
        assertEquals("{1:a;2:b;3:c}", eval("INVERT({a: 1; b: 2; c: 3})").obj)

        // カスタムオブジェクトの文字列化
        assertEquals("{Fruit[apple]:a;Fruit[banana]:b;Fruit[cherry]:c}", eval("""
            Fruit := {
                new: value -> Fruit{value: value}
                `&_`: this -> "Fruit[${'$'}(this.value)]"
            }
            INVERT({
                a: Fruit.new("apple")
                b: Fruit.new("banana")
                c: Fruit.new("cherry")
            })
        """).obj)

        // 値が重複している場合はいずれかのキーがマッピングされる
        val invertedKey = eval("""
            object   := {a: "apple"; b: "banana"; c: "apple"}
            inverted := INVERT(object)
            inverted.apple
        """).toString()
        // inverted.appleの結果は "a" または "c" のいずれか
        assertTrue(invertedKey == "a" || invertedKey == "c")

        // そのキーをobjectで引くと元の値"apple"が返る
        val finalResult = eval("""
            object   := {a: "apple"; b: "banana"; c: "apple"}
            inverted := INVERT(object)
            inverted.apple >> object
        """).toString()
        assertEquals("apple", finalResult)
    }


    @Test
    fun toObject() = runTest {
        assertEquals("{a:1;b:2;c:3}", eval("TO_OBJECT((a: 1), (b: 2), (c: 3))").obj) // TO_OBJECT はストリームをオブジェクトにする
        assertEquals("{a:100}", eval("TO_OBJECT(a: 100)").obj) // ストリームでなくてもよい
        assertEquals("{1:10;2:20;3:30}", eval("1 .. 3 | ((_): _ * 10) >> TO_OBJECT").obj) // TO_OBJECT はパイプ演算子と組み合わせて使うと便利
        assertEquals("{a:1;b:2}", eval("((a: 1), (b: 2)).{}").obj) // .{} オブジェクト化演算子
        assertEquals("{az:10;bz:20;cz:30}", eval("({a: 1; b: 2; c: 3}() | (_.0 & \"z\": _.1 * 10)).{}").obj) // .{} オブジェクト化演算子とパイプの組み合わせ
        assertEquals("{a:100}", eval("(a: 100).{}").obj) // ストリームでなくてもよい
    }

    @Test
    fun toObjectUsage() = runTest {
        val exception = assertFailsWith<FluoriteException> { eval("TO_OBJECT(1; 2)") } // 引数の数が不正だと usage メッセージを出す
        assertTrue(exception.message!!.contains("TO_OBJECT")) // usage メッセージの関数名が TO_OBJECT になっている
    }


    @Test
    fun assignment() = runTest {
        assertEquals("{a:1;b:9}", eval("o := {a: 1; b: 2}; o.b = 9; o").obj) // オブジェクトのフィールドに代入できる
        assertEquals("{a:1;b:2;c:9}", eval("o := {a: 1; b: 2}; o.c = 9; o").obj) // 存在しないフィールドに代入すると新規追加される
    }

    @Test
    fun deleteKey() = runTest {
        assertEquals("{a:1;c:3}", eval("o := {a: 1; b: 2; c: 3}; o -= \"b\"; o").obj) // オブジェクトのキーを削除できる
        assertEquals("{a:1;b:2}", eval("o := {a: 1; b: 2}; o -= \"nonexistent\"; o").obj) // 存在しないキーの削除は何もしない
        assertEquals("{b:2;c:3}", eval("o := {a: 1; b: 2; c: 3}; o -= \"a\"; o").obj) // 最初のキーも削除できる
        assertEquals("{a:1;b:2}", eval("o := {a: 1; b: 2; c: 3}; o -= \"c\"; o").obj) // 最後のキーも削除できる
        assertEquals("{}", eval("o := {a: 1}; o -= \"a\"; o").obj) // すべてのキーを削除できる
        assertEquals("{b:2}", eval("o := {a: 1; b: 2; c: 3}; o -= \"a\", \"c\"; o").obj) // ストリームで複数のキーを削除できる
        assertEquals("{}", eval("o := {a: 1; b: 2; c: 3}; o -= \"a\", \"b\", \"c\"; o").obj) // ストリームですべてのキーを削除できる
    }

    @Test
    fun setCall() = runTest {
        // オブジェクトの代入呼び出しでキーが作られる
        """
            obj := {}
            obj("a") = 123
            obj.a
        """.let { assertEquals(123, eval(it).int) }

        // 既存キーを上書きできる
        """
            obj := {a: 789}
            obj("a") = 456
            obj("a") = 123
            obj.a
        """.let { assertEquals(123, eval(it).int) }
    }

}
