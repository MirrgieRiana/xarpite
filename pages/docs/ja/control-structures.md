---
title: "制御構文"
---

# 制御構文

Xarpiteには多くのプログラミング言語に登場する「if文」や「while文」と全く同一の文法はありません。

代わりに演算子と関数を使って同様な制御を行います。

<!-- toc -->

## 制御演算子

### 条件分岐

論理和演算子、論理積演算子、三項演算子は条件分岐に利用できます。

詳細は論理値を参照してください。

### ループ

パイプ演算子を使うとループを表現できます。

詳細はストリームを参照してください。

### ラベルとリターン

ラベル演算子とリターン演算子を使うと任意の場所から抜け出すことができます。

詳細はジャンプを参照してください。

### 例外機構

スロー演算子とキャッチ演算子を使うと値をスローし、キャッチできます。

詳細はジャンプを参照してください。

### 静的化演算子`$=expression`

静的化演算子`$=expression`は、`expression`に対して遅延メモ化を行います。

メモ化のためのスペースは、ソースコードのトップレベルの匿名変数として確保されます。

そのため、同一コンパイル単位内での同一性と、異なるコンパイル単位間での分離性が保証されます。

`expression`の評価は初めてそこに到達したときまで遅延され、そのときのスコープによって評価されます。

2度目以降に評価をすると、初回評価時の値が再利用されます。

---

この演算子は、コンテキストに依存しない式の再評価を抑えて、リソースを節約するのに便利です。

```shell
$ xa '$=(1 + 2)'
# 3

$ xa ' ("abc123def" =~ REGEX.new(%>^[a-z]+([0-9]+)[a-z]+$<%).$=).1 '
# 123

$ xa '
  time := 0

  getCachedTime := () -> time.$=

  time = 100
  cachedTime1 := getCachedTime()

  time = 200
  cachedTime2 := getCachedTime()

  [cachedTime1, cachedTime2]
'
# [100;100]
```

---

同一の内容であっても、ソースコード上での出現位置が異なるものは、独立した領域に保持されます。

```shell
$ xa '
  time := 0

  getCachedTime1 := () -> time.$=
  getCachedTime2 := () -> time.$=

  time = 100
  cachedTime1 := getCachedTime1()

  time = 200
  cachedTime2 := getCachedTime2()

  [cachedTime1, cachedTime2]
'
# [100;200]
```

---

同一内容のソースコードの同一の位置であっても、スクリプトそのものを再評価した場合は、互いに独立した保持領域が確保されます。

```shell
$ xa '
  getCachedTimeFactory := timeGetter -> XA(%>
    timeGetter -> () -> timeGetter().$=
  <%)(timeGetter)

  time := 0

  getCachedTime1 := getCachedTimeFactory(() -> time)
  getCachedTime2 := getCachedTimeFactory(() -> time)

  time = 100
  cachedTime1 := getCachedTime1()

  time = 200
  cachedTime2 := getCachedTime2()

  [cachedTime1, cachedTime2]
'
# [100;200]
```

---

ミュータブルなオブジェクトのインスタンスの同一性も、同様に保証されます。

```shell
$ xa '
  getAndIncrement := () -> (
    counter := { value: 0 }.$=
    counter.value++
  )

  [getAndIncrement(), getAndIncrement(), getAndIncrement()]
'
# [0;1;2]
```

これは、おおよそ次のように変換が行われたものとして解釈できます。

```shell
$ xa '
  _tmp1 := NULL

  getAndIncrement := () -> (
    counter := (
      _tmp1 == NULL && (_tmp1 = { value: 0 })
      _tmp1
    )
    counter.value++
  )

  [getAndIncrement(), getAndIncrement(), getAndIncrement()]
'
# [0;1;2]
```

---

評価結果がストリームである場合、そのストリームは解決されます。

---

初回の評価中に別のコルーチンが同じ記述位置へ到達した場合は、初回の評価が完了するまで待機します。

---

評価が例外等で中断された場合は、結果を保持せず、次に到達したときに再評価します。

## 制御関数

### `WHILE`: 条件ループ

`WHILE(condition: () -> BOOLEAN; block: () -> VALUE): NULL`

`condition`が真を返す間、`block`を繰り返し実行します。

この関数はよくある「while文」の再現です。

この関数は副作用のあるブロックの制御を目的としているため、敢えて`block`の戻り値を破棄します。

```shell
$ xa '
  i := 0
  WHILE [ => i < 5 ] ( =>
    OUT << i
    i = i + 1
  )
'
# 0
# 1
# 2
# 3
# 4
# NULL
```

---

ラベル・リターン演算子と組み合わせることでループの途中で脱出することもできます。

```shell
$ xa '
  i := 0
  WHILE [ => i < 5 ] ( =>
    i == 3 && break!!
    OUT << i
    i = i + 1
  ) !: break
'
# 0
# 1
# 2
# NULL
```

---

`block`がストリームを返す場合、ストリームを解決し、その結果を破棄します。

このため`block`の副作用は必ず丁度1回だけ発生します。

```shell
$ xa -q '
  i := 0
  WHILE [ => i < 4 ] ( =>
    0 ~ 2 | (
      OUT << i
      i = i + 1
    )
  )
  NULL
'
# 0
# 1
# 2
# 3
```

### `WHILE2`: 条件ループ

`WHILE2(condition(): BOOLEAN; block(): VALUE): NULL`

`condition`が真を返す間、`block`を繰り返し実行します。

`WHILE`と同等ですが、引数を式渡し引数として受け取ります。

```shell
$ xa '
  i := 0
  WHILE2 [ i < 5 ] ((
    OUT << i
    i = i + 1
  ))
'
# 0
# 1
# 2
# 3
# 4
# NULL
```

### `TRY`: 例外の捕捉

`<T> TRY(block: () -> T): PROMISE<T>`

`block`をその場で実行し、結果を`PROMISE`で返します。

`block`内で例外がスローされた場合、その例外で拒否された`PROMISE`を返します。

```shell
$ xa '
  promise := TRY ( =>
    "Success"
  )
  promise::await()
'
# Success
```

```shell
$ xa '
  promise := TRY ( =>
    !! "Error"
  )
  promise::await() !? ( e => "Caught: $e" )
'
# Caught: Error
```

---

`TRY`は`PROMISE`を返すため、キャッチ演算子を使わずに結果型として扱うこともできます。

```shell
$ xa '
  result := TRY ( =>
    !! "Failed"
  )
  result::isCompleted()
'
# TRUE
```

---

`block`の戻り値がストリームだった場合、解決されます。

```shell
$ xa '
  counter := 0
  promise := TRY ( =>
    1 .. 3 | (
      counter = counter + 1
      counter
    )
  )
  [promise::await()], [promise::await()], [promise::await()], counter
'
# [1;2;3]
# [1;2;3]
# [1;2;3]
# 3
```

---

`TRY`はリターンをキャッチしません。

```shell
$ xa '
  (
    TRY ( =>
      label!! "returned"
    )
    "not returned"
  ) !: label
'
# returned
```

### `TRY2`: 例外の捕捉

`<T> TRY2(block(): T): PROMISE<T>`

`block`をその場で実行し、結果を`PROMISE`で返します。

`TRY`と同等ですが、引数を式渡し引数として受け取ります。

```shell
$ xa '
  promise := TRY2 ((
    "Success"
  ))
  promise::await()
'
# Success
```
