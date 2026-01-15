---
title: "識別子"
---

<!-- toc -->

# 識別子

識別子 `identifier` は、変数、組み込み定数、組み込み関数、引数などを指し表すための文字列です。

```shell
$ xa '
  variable := 10
  variable
'
# 10

$ xa 'MATH.PI'
# 3.141592653589793

$ xa 'SQRT(4)'
# 2.0

$ xa '
  function := x, y, z -> x + y + z
  function(100; 20; 3)
'
# 123
```

## 識別子に使用できる文字

識別子には、以下の文字が利用できます。

- 英字 `a-zA-Z`
- 数字 `0-9`
- アンダースコア `_`
- すべてのマルチバイト文字

ただし、先頭は数字であってはいけません。

## クォート識別子

``` ` ` ``` で囲った識別子はクォート識別子と呼ばれます。

識別子とクォート識別子は、書き方が違うだけで同じ識別子を表します。

```shell
$ xa '
  `variable` := 10
  `variable`
'
# 10

$ xa '
  variable := 10
  `variable`
'
# 10
```

## 記号を含むクォート識別子

クォート識別子は記号を含むこともできます。

```shell
$ xa '
  `#` := 10
  `#`
'
# 10
```

## クォート識別子の文字参照

クォート識別子内では、以下の文字参照を使うことができます。

| 文字列      | 意味                           |
|----------|------------------------------|
| `\xXX`   | 指定したコードポイントU+0000～U+00FFの1文字 |
| `\uXXXX` | 指定したUTF-16のコード単位1個           |

```shell
$ xa '
  `\x21` := 10
  `!`
'
# 10
```

# 代入文

## 演算代入演算子

Xarpiteには `+=` 演算子などの演算と代入を同時に行う演算代入演算子が存在します。

`a += b` は、多くの場合 `a = a + b` と等価です。

```shell
$ xa -q '
  x := 100
  OUT << x
  x += 23
  OUT << x
'
# 100
# 123
```

## 演算代入のオーバーライド

演算代入のためのオーバーライド可能なメソッドが存在します。

`_+=_` メソッドは `a += b` が実行されるごとに丁度1回だけ呼び出されます。

当該メソッドの戻り値は無視されます。

ただし、戻り値がストリームであった場合は解決され、その結果は無視されます。

`_+=_` 以外の演算代入メソッドも同様です。

```shell
$ xa -q '
  Array := {
    `_+=_`: this, item -> this.value::push(item)
  }
  array := Array{value: ["apple"]}

  OUT << array.value
  array += "banana"
  OUT << array.value
'
# [apple]
# [apple,banana]
```

## 演算代入演算子の一覧

以下はXarpiteで利用可能な演算代入演算子の一覧です。

| 演算子  | 意味     |
|------|--------|
| `+=` | 加算して代入 |
| `-=` | 減算して代入 |

## 演算代入のフォールバック

演算代入のオーバーライドメソッドが存在しない場合、通常の演算と代入が行われます。

```shell
$ xa -q '
  Array := {
    `_+_`: this, item -> Array{value: this.value + [item]}
  }
  array := Array{value: ["apple"]}

  OUT << array.value
  array += "banana"
  OUT << array.value
'
# [apple]
# [apple,banana]
```

---

このとき、変数自体の内容が更新されていることに注意してください。

```shell
$ xa -q '
  array := ["apple"]
  oldArray := array

  OUT << array
  array += "banana"
  OUT << "New: $array"

  OUT << "Old: $oldArray"
'
# [apple]
# New: [apple,banana]
# Old: [apple]
```

# 変数

変数は、識別子によって値に名前を付けて格納・参照するための仕組みです。

```shell
$ xa '
  x := 100
  y :=  20
  z :=   3

  x + y + z
'
# 123
```

## 変数の宣言

変数の宣言には、変数宣言演算子 `variable := value` を使います。

変数宣言演算子は、書かれたスコープ内で変数を宣言しつつ、右辺の値で初期化します。

Xarpiteでは、変数は宣言と同時に何らかの値で初期化する必要があります。

```shell
$ xa '
  x := 10
  x
'
# 10
```

## 変数への値の代入

変数に値を代入するには、代入演算子 `variable = value` を使います。

代入先の変数はすでに宣言されている必要があります。

```shell
$ xa -q '

  x := 10
  OUT << x

  x = 123
  OUT << x

'
# 10
# 123
```

## 変数のスコープ

宣言された変数は、宣言以降、そのスコープ内でのみ有効です。

`( )` など、スコープを生成する演算子内で宣言された変数は、そのスコープを抜けると破棄されます。

```shell
$ xa -q '

  x := "A (outer initial value)"
  OUT << x

  (
    x = "B (outer assigned value)"
    OUT << x

    x := "C (inner initial value)"
    OUT << x

    x = "D (inner assigned value)"
    OUT << x
  )

  OUT << x
'
# A (outer initial value)
# B (outer assigned value)
# C (inner initial value)
# D (inner assigned value)
# B (outer assigned value)
```

## 変数宣言演算子の右辺からの自身の参照

変数宣言演算子の右辺では、その変数自身を参照することができます。

この性質は、再帰関数を作るときに便利です。

```shell
$ xa '
  factorial := n -> n == 0 ? 1 : n * factorial(n - 1)
  factorial(5)
'
# 120
```

# マウント

マウントは、変数が宣言されていない識別子が特殊なテーブルから値を参照することができる仕組みです。

マウントはライブラリを利用する際によく用いられます。

`TRUE` `NULL` などの組み込み定数、 `JOIN` `SQRT` などの組み込み関数は、すべてマウントの仕組みを利用して提供されています。

```shell
$ xa '
  lib := {
    fruit: "apple"
  }

  @lib

  fruit
'
# apple
```

## マウント演算子

マウント演算子 `@object` は、オブジェクト `object` の内容を現在の位置にマウントします。

定義されていない変数にアクセスしようとしたとき、マウントされているエントリーから値を探します。

```shell
$ xa '
  @{
    fruit: "apple"
  }

  fruit
'
# apple
```

`object` はオブジェクトである必要があります。

## マウント演算子はオブジェクトの中身をマウントする

マウントはオブジェクトそのものではなく、オブジェクトの各エントリーについて行われます。

マウント後に行われたオブジェクトへの改変は、マウント状態には反映されません。

```shell
$ xa '
  lib := {
    fruit: "apple"
  }

  @lib

  lib.fruit = "orange"

  fruit
'
# apple
```

また、同様の理由でマウントを使ったメソッド呼び出しもできません。

## マウントは多重にできる

既にマウントが行われた状態で更にマウントを行うと、両方のエントリーがマウントされた状態になります。

```shell
$ xa '
  @{
    fruit: "apple"
  }

  @{
    drink: "coffee"
  }

  "fruit=$fruit, drink=$drink"
'
# fruit=apple, drink=coffee
```

## マウントは既存のマウントを上書きする

同じ名前に対して複数のマウントが行われた場合、あとのものが優先されます。

```shell
$ xa '
  @{
    fruit: "apple"
    bread: "epi"
  }

  @{
    vegetable: "tomato"
    fruit: "orange"
  }

  "fruit=$fruit, bread=$bread, vegetable=$vegetable"
'
# fruit=orange, bread=epi, vegetable=tomato
```

## マウントは変数と同様のスコープを持つ

マウントは、スコープを抜けると解除されます。

マウントのスコープは、変数と同様に、マウント演算子によってマウントされてからその階層の括弧類を抜けるまでです。

```shell
$ xa -q '
  @{
    fruit: "apple"
  }

  (
    OUT << fruit

    @{
      fruit: "banana"
    }

    OUT << fruit
  )

  OUT << fruit
'
# apple
# banana
# apple
```

## 宣言済みの変数はマウントに優先する

同じ名前で変数とマウントの両方にアクセス可能な場合、宣言順序に関係なく常に変数が優先されます。

```shell
$ xa '
  fruit := "apple"

  @{
    fruit: "banana"
  }

  fruit
'
# apple
```

この仕様は、意図しないマウントの利用を防ぐために設けられています。
