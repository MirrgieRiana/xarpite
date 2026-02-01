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
# [apple;banana]
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
# [apple;banana]
```

---

このとき、変数自体の内容が更新されていることに注意してください。

```shell
$ xa -q '
  array := ["apple"]
  oldArray := array

  OUT << "Old: $oldArray"
  OUT << "New: $array"

  OUT << "Update!"
  array += "banana"

  OUT << "Old: $oldArray"
  OUT << "New: $array"
'
# Old: [apple]
# New: [apple]
# Update!
# Old: [apple;banana]
# New: [apple;banana]
```

## インクリメント・デクリメント

インクリメント `formula++` とデクリメント `formula--` は式に1を加減算して代入する演算子です。

```shell
$ xa '
  a := 10
  a++
  a
'
# 11

$ xa '
  a := 10
  a--
  a
'
# 9
```

---

インクリメント・デクリメントは、式の値を評価し、1を加減算して、その結果を元の式に代入する操作と等価です。

### 後置版と前置版

インクリメント・デクリメント演算子には後置版のほかに、前置版 `++formula` `--formula` もあります。

後置版は加減算前の値を返し、前置版は加減算後の値を返します。

```shell
$ xa '
  a := 10
  a++
'
# 10

$ xa '
  a := 10
  ++a
'
# 11
```

可読性の観点から、後置版が使われる頻度が高いです。

### 後置版前置版インクリメント・デクリメント

「前置版」インクリメント・デクリメントには、「後置版前置版」インクリメント・デクリメント `formula.++` `formula.--` が存在します。

それは他の前置演算子の後置版と同様、前置演算子を後置表現として記述するためのシンタックスシュガーです。

すなわちその挙動は「前置版」と等しく、加減算後の値を返します。

```shell
$ xa '
  a := 10
  a.++
'
# 11
```

### 数値以外のインクリメント

`formula++` の挙動は概ね以下の疑似コードと同じです。

```
old := formula
new := old + 1
formula = new
old
```

---

実は `formula` が代入をサポートする式であり、かつ整数 `1` との加減算が定義されていれば、数値以外の型でもインクリメント・デクリメントが可能です。

```shell
$ xa '
  s := "abc"
  s++
  s
'
# abc1
```

### インクリメント・デクリメントのオーバーライド

インクリメント・デクリメント演算子は専用のメソッドでオーバーライドできます。

| 演算子         | メソッド名 | 説明        |
|-------------|-------|-----------|
| `formula++` | `_++` | 後置インクリメント |
| `++formula` | `++_` | 前置インクリメント |
| `formula--` | `_--` | 後置デクリメント  |
| `--formula` | `--_` | 前置デクリメント  |

これらのメソッドをオーバーライドすることで、インクリメント・デクリメントの動作をカスタマイズできます。

---

オーバーライドメソッドはオブジェクト自身の他に、式に対する取得・代入を行う関数 `accessor` を引数として取ります。

`accessor` に対して0個の引数で呼び出すと、式に対して値の取得操作が行われます。

`accessor` に対して1個の引数で呼び出すと、式に対して値の代入操作が行われます。

インクリメント・デクリメントの動作はオブジェクト自体の改変操作として定義することも、オブジェクト自体は不変で、代入動作として定義することもできます。

```shell
$ xa -q '
  MutableCounter := {
    new := value -> MutableCounter{value: value}
    `_++`: this, accessor -> (
      this.value++
    )
    `&_`: this -> this.value.&
  }

  old := MutableCounter.new(0)
  new := old

  OUT << "Old: $old"
  OUT << "New: $new"
  new++
  OUT << "Old: $old"
  OUT << "New: $new"
'
# Old: 0
# New: 0
# Old: 1
# New: 1
```

```shell
$ xa -q '
  ImmutableCounter := {
    new := value -> ImmutableCounter{value: value}
    `_++`: this, accessor -> (
      accessor(new(this.value + 1))
    )
    `&_`: this -> this.value.&
  }

  old := ImmutableCounter.new(0)
  new := old

  OUT << "Old: $old"
  OUT << "New: $new"
  new++
  OUT << "Old: $old"
  OUT << "New: $new"
'
# Old: 0
# New: 0
# Old: 0
# New: 1
```

---

演算子の戻り値にはオーバーライドメソッドの戻り値が返されます。

この性質上、前置版と後置版は互いに独立の操作として定義されており、片方がもう片方にフォールバックされることはありません。

```shell
$ xa -q '
  Object := {
    `_++`: this, accessor -> "suffix"
    `++_`: this, accessor -> "prefix"
  }

  object := Object{}

  OUT << object++
  OUT << ++object
'
# suffix
# prefix
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

# 委譲変数

`\variable` のように前置 `\` をつけて変数を宣言すると委譲変数となります。

委譲変数は取得や代入時に、変数実体へのアクセスを行う代わりに割り当てられた関数を実行します。

---

取得時はレシーバー関数が0引数で呼び出されます。

```shell
$ xa -q '
  time := 0
  \now := () -> time

  time = 100
  OUT << now
  time = 200
  OUT << now
'
# 100
# 200
```

---

代入時はレシーバー関数が1引数で丁度1回呼び出されます。

代入演算子は右辺値を返すため、レシーバー関数の戻り値は常に無視されます。

レシーバー関数がストリームを返した場合、ストリームは解決され、その結果は無視されます。

```shell
$ xa -q '
  time := 0
  \now := _ -> time = _

  now = 100
  OUT << time
  now = 110
  OUT << time
'
# 100
# 110
```

## 取得と代入の両方をサポートする委譲変数

取得と代入の両方をサポートする委譲変数を作るには、委譲された関数側で引数の個数を判定します。

```shell
$ xa -q '
  time := 0
  \now := _ -> __.$# == 0 ? time : (time = _)

  now = 100
  OUT << [time, now] >> CSV
  now = 110
  OUT << [time, now] >> CSV
'
# 100,100
# 110,110
```
