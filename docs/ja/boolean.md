---
title: "論理値の概要"
---

# 論理値の概要

論理値は、真 `TRUE` または偽 `FALSE` の2つの値を持つデータ構造です。

それぞれ、組み込み定数 `TRUE` および `FALSE` によって参照されます。

```shell
$ xa 'TRUE'
# TRUE

$ xa 'FALSE'
# FALSE
```

# 論理値化

論理値化演算子 `?value` は、値の論理値化を行います。

```shell
$ xa '?1'
# TRUE

$ xa '?0'
# FALSE
```

## 値のタイプごとの論理値化

値のタイプによってどのように論理値化が行われるかが異なります。

全般的に、ある値のタイプにおいて、最も単純な値が `FALSE` で、それ以外は `TRUE` です。

| 値のタイプ  | 真 `TRUE` になるもの                | 偽 `FALSE` になるもの             |
|--------|-------------------------------|-----------------------------|
| NULL   | なし                            | `NULL`                      |
| 数値     | 0に等しくない値                      | 0に等しい値                      |
| 論理値    | `TRUE`                        | `FALSE`                     |
| 文字列    | 空文字列以外                        | 空文字列                        |
| ストリーム  | いずれかの要素が `TRUE`               | すべての要素が `FALSE`<br>空ストリーム   |
| 配列     | 空でない配列                        | 空配列                         |
| オブジェクト | 1個以上のエントリーがあるもの<br>※オーバーライド可能 | エントリーが1個もないもの<br>※オーバーライド可能 |

---

いくつかの、直観的には `FALSE` のように感じられる値が `TRUE` になることがあります。

- 文字列 `"FALSE"`
- 文字列 `"0"`
- 配列 `[FALSE]`
- オブジェクト `{a: NULL}`

## 論理値化のオーバーライド

論理値化は、値の `?_` メソッドを参照します。

オブジェクトの `?_` メソッドをオーバーライドすることで、論理値化の処理を変更することができます。

```shell
$ xa '
  Class := {
    `?_`: this -> this.value > 100
  }

  ?Class{value: 50},
  ?Class{value: 200},
'
# FALSE
# TRUE
```

## 否定論理値化

否定論理値化演算子 `!value` は、値の論理値化を行い、その否定を返します。

```shell
$ xa '!TRUE'
# FALSE

$ xa '!FALSE'
# TRUE

$ xa '!1'
# FALSE
```

# 論理演算子

## 論理積演算子

論理積演算子 `boolean && boolean` は、左辺が論理値化によって `FALSE` と評価される場合は左辺を返し、そうでない場合は右辺を返します。

---

両辺が論理値である場合、その結果は論理積演算と等価となります。

| 左辺値     | 右辺値     | 返却値     |
|---------|---------|---------|
| `FALSE` | `FALSE` | `FALSE` |
| `FALSE` | `TRUE`  | `FALSE` |
| `TRUE`  | `FALSE` | `FALSE` |
| `TRUE`  | `TRUE`  | `TRUE`  |

## 論理和演算子

論理和演算子 `boolean || boolean` は、左辺が論理値化によって `TRUE` と評価される場合は左辺を返し、そうでない場合は右辺を返します。

---

両辺が論理値である場合、その結果は論理和演算と等価となります。

| 左辺値     | 右辺値     | 返却値     |
|---------|---------|---------|
| `FALSE` | `FALSE` | `FALSE` |
| `FALSE` | `TRUE`  | `TRUE`  |
| `TRUE`  | `FALSE` | `TRUE`  |
| `TRUE`  | `TRUE`  | `TRUE`  |

## 論理演算子による条件分岐

論理演算子は、条件分岐の手段としても利用できます。

右辺の値が使われない場合、その値は評価自体が行われません。

| 演算子                   | 右辺が評価される条件                       |
|-----------------------|----------------------------------|
| `condition && then`   | `condition` の論理値化が `TRUE` である場合  |
| `condition \|\| else` | `condition` の論理値化が `FALSE` である場合 |

```shell
$ xa -q '
  check := value -> (
    value %% 2 && OUT("$value is divisible by 2")
    value %% 3 || OUT("$value is not divisible by 3")
  )

  check(4)
  check(9)
'
# 4 is divisible by 2
# 4 is not divisible by 3
```

# 条件演算子

## 三項演算子

三項演算子 `condition ? then : else` は、条件分岐のための演算子です。

`condition` の論理値化が `TRUE` として評価される場合は `then` 、そうでない場合は `else` を返します。

```shell
$ xa 'TRUE ? "Yes" : "No"'
# Yes

$ xa 'FALSE ? "Yes" : "No"'
# No
```

---

三項演算子も論理演算子と同様に不要な項は評価自体が行われないため、if文のように使うことができます。

```shell
$ xa -q '
  check := value -> (
    value %% 2 ? (
      OUT << "$value is even"
    ) : (
      OUT << "$value is odd"
    )
  )

  check(4)
  check(9)
'
# 4 is even
# 9 is odd
```

## 三項演算子の記法

三項演算子は入れ子にしたり、演算子の前で改行することができます。

```shell
$ xa '
  get_name := is_parent, is_man ->
    is_parent
      ? is_man
        ? "King"
        : "Queen"
      : is_man
        ? "Prince"
        : "Princess"

  get_name(TRUE; TRUE),
  get_name(TRUE; FALSE),
  get_name(FALSE; TRUE),
  get_name(FALSE; FALSE),
'
# King
# Queen
# Prince
# Princess
```

## エルビス演算子

エルビス演算子 `value ?: default` は、 `value` が `NULL` である場合に `default` 、そうでなければ `value` を返す演算子です。

```shell
$ xa '"Orange" ?: "Apple"'
# Orange

$ xa 'NULL ?: "Apple"'
# Apple
```
