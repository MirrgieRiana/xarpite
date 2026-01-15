package mirrg.xarpite.js.test

import kotlinx.coroutines.ExperimentalCoroutinesApi
import kotlinx.coroutines.test.runTest
import mirrg.xarpite.UnsupportedIoContext
import mirrg.xarpite.compilers.objects.FluoriteNull
import mirrg.xarpite.test.int
import mirrg.xarpite.test.string
import mirrg.xarpite.withEvaluator
import kotlin.test.Test
import kotlin.test.assertEquals

@OptIn(ExperimentalCoroutinesApi::class)
class JsTest {

    @Test
    fun js() = runTest {
        assertEquals(123, evalJs("JS('100 + 23')").int) // JSでJavaScriptが実行できる
    }

    @Test
    fun property() = runTest {
        withEvaluator(UnsupportedIoContext()) { context, evaluator ->
            evaluator.defineMounts(context.run { createDefaultBuiltinMounts() })

            evaluator.run("obj := JS('({a: 100})')")

            assertEquals(100, evaluator.get("obj.a").int) // プロパティを取得できる
            assertEquals(123, evaluator.get("obj.b = obj.a + 23; obj.b").int) // プロパティを設定できる
        }
    }

    @Test
    fun functionCall() = runTest {
        assertEquals(123, evalJs("JS('(function(a, b) { return a + b; })')(100; 23)").int) // JavaScriptの関数を呼び出せる
    }

    @Test
    fun new() = runTest {
        withEvaluator(UnsupportedIoContext()) { context, evaluator ->
            evaluator.defineMounts(context.run { createDefaultBuiltinMounts() })

            """
                Obj := JS(%>
                    function Obj(arg1) {
                        if (this !== undefined) this.arg1 = arg1;
                    }
                    Obj.prototype.toString = function() {
                        return "" + this.arg1;
                    }
                    Obj;
                <%)
            """.let { evaluator.run(it) }

            assertEquals(FluoriteNull, evaluator.get("Obj(123)"))
            assertEquals("123", evaluator.get("&Obj::new(123)").string)
        }
    }

    @Test
    fun methodCall() = runTest {
        withEvaluator(UnsupportedIoContext()) { context, evaluator ->
            evaluator.defineMounts(context.run { createDefaultBuiltinMounts() })

            """
                obj := JS(%>
                    ({
                        method1: function() {
                            return 100;
                        },
                        method2: function(argument1) {
                            return 100 + argument1;
                        }
                    })
                <%)
            """.let { evaluator.run(it) }

            assertEquals(100, evaluator.get("obj::method1()").int) // メソッド呼び出し
            assertEquals(123, evaluator.get("obj::method2(23)").int) // 引数のあるメソッド呼び出し
        }
    }

    @Test
    fun async() = runTest {
        assertEquals(123, evalJs("AWAIT(JS('Promise')::new(ASYNC(c -> c(123))))").int) // async関数を生成できる
    }

    @Test
    fun await() = runTest {
        assertEquals(123, evalJs("AWAIT(JS('new Promise(callback => callback(123))'))").int) // Promiseに対してAWAITするとサスペンドして取得する
        assertEquals(123, evalJs("AWAIT(JS('async () => 123')())").int) // async関数を実行した結果も同様
    }

}
