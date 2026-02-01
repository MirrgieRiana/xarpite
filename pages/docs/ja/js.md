---
title: "JavaScript上での動作"
---

<!-- toc -->

# JavaScript上での動作

XarpiteはJavaScript上での動作をサポートしています。

## JavaScriptオブジェクトの扱い

JavaScript側のオブジェクトは、 `JS_OBJECT` クラスで表現されます。

## 暗黙の型変換

関数呼び出しなどいくつかの状況では、XarpiteとJavaScriptの間で自動的に変換が行われます。

| 変換元<br>Xarpite | 変換先<br>JavaScript |
|----------------|-------------------|
| `JS_OBJECT`    | そのままの値            |
| `INT`          | `Number`          |
| `DOUBLE`       | `Number`          |
| `STRING`       | `String`          |
| `BOOLEAN`      | `Boolean`         |
| `ARRAY`        | `Array`           |
| `NULL`         | `null`            |
| `FUNCTION`     | `Function`        |
| それ以外           | 非対応によるエラー         |

| 変換元<br>JavaScript | 変換先<br>Xarpite |
|-------------------|----------------|
| そのままの値            | `JS_OBJECT`    |
| 整数 `Number`       | `INT`          |
| 小数 `Number`       | `DOUBLE`       |
| `String`          | `STRING`       |
| `Boolean`         | `BOOLEAN`      |
| `Array`           | `ARRAY`        |
| `null`            | `NULL`         |
| `undefined`       | `NULL`         |
| それ以外              | `JS_OBJECT`    |

# 各種機能

## 関数呼び出し

JavaScriptの関数は、Xarpiteの関数のように呼び出すことができます。

引数と戻り値の間で暗黙の型変換が行われます。

## プロパティアクセス

`js_object.property` によってJavaScriptのプロパティを取得できます。

`js_object.property = value` によって代入もできます。

どちらも暗黙の型変換が行われます。

```
obj := JS('({a: 100})')
obj.b = obj.a + 23
obj.b
# 123
```

## メソッド呼び出し

`js_object::method(arguments)` によってJavaScriptオブジェクトのメソッドを呼び出すことができます。

引数および戻り値は暗黙の型変換が行われます。

```
date := JS("new Date(946652400000)")
date::getFullYear()
# 2000
```

# JavaScript版限定組み込み定数・関数

JavaScript版Xarpiteでのみ利用可能な定数および関数です。

## `JS_OBJECT` JavaScriptオブジェクトのクラス

`JS_OBJECT` はJavaScriptのオブジェクト全般を表すクラスです。

### `::new(arguments)` JavaScriptコンストラクターの呼び出し

`jsObject::new(argument: VALUE; ...): JS_OBJECT`

JavaScriptの関数オブジェクトをコンストラクタとして呼び出します。

各引数および戻り値は暗黙の型変換が行われます。

```
Basket := JS(%>
  function Basket(item) {
    this.item = item
  }
  Basket.prototype.toString = function() {
    return "Basket[" + this.item + "]";
  }
  Basket;
<%)
Basket::new("apple")
# Basket[apple]
```

## `OUT` コンソールに出力

`OUT(value: VALUE): NULL`

値をWebアプリケーションごとに決められた出力欄に出力します。

## `WINDOW` windowオブジェクトの取得

`WINDOW: JS_OBJECT | NULL`

その実行環境から参照可能である場合、windowオブジェクトを返します。

## `JS` JavaScriptコードの実行

`JS(code: STRING): VALUE`

第1引数のJavaScriptコードを実行します。

戻り値は暗黙の型変換が行われます。

```
JS('1 + 2')
# 3
```

```
JS('(function(a, b) {
  return a + b;
})(1, 2)')
# 3
```

## `ASYNC` 非同期関数の生成

`ASYNC(function: FUNCTION): JS_OBJECT`

第1引数のXarpite関数をJavaScriptのasync関数に変換します。

通常、Xarpiteの関数は暗黙の型変換によって非asyncなJavaScript関数に変換されます。

この関数を使うことで明示的にasync関数を生成することができます。

```
AWAIT(JS("Promise")::new(ASYNC(callback -> (
  SLEEP(100)
  callback(123)
))))
# 123
```

## `AWAIT` Promiseの結果の取得

`AWAIT(promise: JS_OBJECT): VALUE`

第1引数のPromiseの結果をサスペンドして所得します。

結果は暗黙の型変換が行われます。

---

Promiseはコンストラクタで明示的に生成するほか、async関数の呼び出しでも生成されます。

```
promise := JS('new Promise(callback => callback("apple"))')
AWAIT(promise)
# apple
```

```
async_function := JS('async () => "apple"')
promise := async_function()
AWAIT(promise)
# apple
```
