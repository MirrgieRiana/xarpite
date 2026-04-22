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

詳細は[論理値](boolean.md)を参照してください。

### ループ

パイプ演算子を使うとループを表現できます。

詳細は[ストリーム](stream.md)を参照してください。

### ラベルとリターン

ラベル演算子とリターン演算子を使うと任意の場所から抜け出すことができます。

詳細は[ジャンプ](jump.md)を参照してください。

### 例外機構

スロー演算子とキャッチ演算子を使うと値をスローし、キャッチできます。

詳細は[ジャンプ](jump.md)を参照してください。

## 制御関数

### `WHILE`: 条件ループ

`WHILE(condition: () -> BOOLEAN; block: () -> VALUE): NULL`

`condition` が `TRUE` を返す間、 `block` を繰り返し実行します。

この関数はよくある「while文」の再現です。

この関数は副作用のあるブロックの制御を目的としているため、敢えて `block` の戻り値を破棄します。

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

`block` がストリームを返す場合、ストリームを解決し、その結果を破棄します。

このため `block` の副作用は必ず丁度1回だけ発生します。

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

### `WHILE2`: 条件ループ（遅延評価引数版）

`WHILE2(condition: *BOOLEAN; block: *VALUE): NULL`

`condition` が `TRUE` を返す間、 `block` を繰り返し実行します。

`WHILE` と同等ですが、引数を遅延評価引数として受け取ります。

`condition` と `block` は、関数呼び出し構文を含むいくつかの場面において、引数の評価が実際の評価時まで遅延されます。また、ループの繰り返しのたびに複数回評価されます。

```shell
$ xa '
  i := 0
  WHILE2 (i < 5; (
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

`block` をその場で実行し、結果を `PROMISE` で返します。

`block` 内で例外がスローされた場合、その例外で拒否された `PROMISE` を返します。

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

`TRY` は `PROMISE` を返すため、キャッチ演算子を使わずに結果型として扱うこともできます。

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

`block` の戻り値がストリームだった場合、解決されます。

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

`TRY` はリターンをキャッチしません。

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

### `TRY2`: 例外の捕捉（遅延評価引数版）

`<T> TRY2(block: *T): PROMISE<T>`

`block` をその場で実行し、結果を `PROMISE` で返します。

`TRY` と同等ですが、引数を遅延評価引数として受け取ります。

`block` は、関数呼び出し構文を含むいくつかの場面において、引数の評価が実際の評価時まで遅延されます。

```shell
$ xa '
  TRY2 ("Success")::await()
'
# Success
```

```shell
$ xa '
  TRY2 (!! "Error")::await() !? ( e => "Caught: $e" )
'
# Caught: Error
```
