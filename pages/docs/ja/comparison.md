---
title: "比較"
---

<!-- toc -->

# 比較

数値同士や文字列同士の比較、特定の要素が配列に含まれているかといった様々な判定を行うことができます。

## 比較系演算子の結合

比較系演算子同士の結合は特殊で、以下の手順を踏みます。

1. すべての比較系演算子について、左右の辺による比較を行う
2. それらの論理積を取る

例えば、 `3 <= x <= 5` は、まず `3 <= x` を計算し、次に `x <= 5` を計算し、最後にその論理積 `3 <= x && x <= 5` を取ります。

これにより、比較の連鎖を簡潔に記述できます。

```shell
$ xa '3 <= 4 <= 5'
# TRUE

$ xa '3 <= 10 <= 5'
# FALSE
```

---

この仕様の対象となるのは、以下の演算子です。

- `>` `<` `>=` `<=` `==` `!=` `@` `!@` `?=`

# 比較演算子

比較演算子には以下のものがあります。

| 演算子             | 意味                           |
|-----------------|------------------------------|
| `left > right`  | `left` が `right` より大きいか否かを返す |
| `left < right`  | `left` が `right` より小さいか否かを返す |
| `left >= right` | `left` が `right` 以上であるか否かを返す |
| `left <= right` | `left` が `right` 以下であるか否かを返す |

```shell
$ xa '[1 > 2, 2 > 2, 3 > 2]'
# [FALSE;FALSE;TRUE]

$ xa '[1 < 2, 2 < 2, 3 < 2]'
# [TRUE;FALSE;FALSE]

$ xa '[1 >= 2, 2 >= 2, 3 >= 2]'
# [FALSE;TRUE;TRUE]

$ xa '[1 <= 2, 2 <= 2, 3 <= 2]'
# [TRUE;TRUE;FALSE]
```

## 比較演算子のオーバーロード

比較演算子の動作は、実際には宇宙船演算子の結果に基づいて判断しています。

宇宙船演算子のオーバーロードが行われると、各種比較演算子の動作も変わります。

# 等価系演算子

## 等価演算子

等価演算子 `left == right` は、両辺の値が等しいか否かを返します。

```shell
$ xa '[1 == 2, 2 == 2, 3 == 2]'
# [FALSE;TRUE;FALSE]
```

現在、数値や文字列などの一部の型においてのみ定義されています。

## 不等価演算子

不等価演算子 `left != right` は、両辺の値が等しくないか否かを返します。

等価演算子の否定です。

```shell
$ xa '[1 != 2, 2 != 2, 3 != 2]'
# [TRUE;FALSE;TRUE]
```

# 含有系演算子

## 含有演算子

含有演算子 `left @ right` は、 `left` が `right` に含まれているか否かを返します。

右辺のタイプごとの挙動は以下の通りです。

| 右辺のタイプ | 戻り値                       |
|--------|---------------------------|
| 文字列    | 左辺の文字列が右辺の文字列に含まれているか否か   |
| 配列     | 左辺の要素が右辺の配列に含まれているか否か     |
| オブジェクト | 左辺のキーが右辺のオブジェクトに含まれているか否か |

```shell
$ xa '"bcd" @ "abcde"'
# TRUE

$ xa '"123" @ "abcde"'
# FALSE

$ xa '1 @ [1, 2, 3]'
# TRUE

$ xa '4 @ [1, 2, 3]'
# FALSE

$ xa '"a" @ {a: 1; b: 2; c: 3}'
# TRUE

$ xa '"d" @ {a: 1; b: 2; c: 3}'
# FALSE
```

含有演算子の働きは、文字列は部分文字列、配列は要素、オブジェクトはキーと、一貫していません。

## 否定含有演算子

否定含有演算子 `left !@ right` は、 `left` が `right` に含まれていないかどうかを返します。

含有演算子を使った `!(left @ right)` という表現と等価な動作をします。

```shell
$ xa '"bcd" !@ "abcde"'
# FALSE

$ xa '"123" !@ "abcde"'
# TRUE
```

## 含有演算子のオーバーライド

含有演算子は、実際には右辺の値の `_@_` メソッドを呼び出し、論理値化したものを返す演算子です。

```shell
$ xa -q '
  Basket := {
    `_@_`: this, item -> item @ this.items
  }

  basket := Basket{items: ["apple", "orange", "banana"]}

  OUT << "Basket: $basket"
  "apple" @ basket && (OUT << "apple is in basket")
  "cherry" @ basket && (OUT << "cherry is in basket")
'
# Basket: {items:[apple;orange;banana]}
# apple is in basket
```

# instanceOf演算子

instanceOf演算子 `left ?= right` は、 `left` が `right` のインスタンスであるか否かを返します。

より厳密には、オブジェクト `left` が `right` と同一のインスタンスか、 `left` の継承チェーンのどこかに `right` が存在するかを判定します。

```shell
$ xa -q '
  Animal := {}
  Human := Animal {}
  socrates := Human{}
  pythagoras := Human{}

  Animal ?= Animal && (OUT << "Animal is Animal")
  Human ?= Human && (OUT << "Human is Human")
  socrates ?= socrates && (OUT << "Socrates is Socrates")
  pythagoras ?= pythagoras && (OUT << "Pythagoras is Pythagoras")

  Human ?= Animal && (OUT << "Human is Animal")
  Animal ?= Human && (OUT << "Animal is Human")

  socrates ?= Human && (OUT << "Socrates is Human")
  Human ?= socrates && (OUT << "Human is Socrates")

  socrates ?= Animal && (OUT << "Socrates is Animal")
  Animal ?= socrates && (OUT << "Animal is Socrates")

  socrates ?= pythagoras && (OUT << "Socrates is Pythagoras")
  pythagoras ?= socrates && (OUT << "Pythagoras is Socrates")
'
# Animal is Animal
# Human is Human
# Socrates is Socrates
# Pythagoras is Pythagoras
# Human is Animal
# Socrates is Human
# Socrates is Animal
```

# 宇宙船演算子

宇宙船演算子 `<=>` は左辺と右辺の大小関係を返す演算子です。

以下のように左右の大小関係と宇宙船演算子の戻り値の関係は、以下のようになります。

| 条件      | 戻り値 |
|---------|-----|
| 左辺 < 右辺 | -1  |
| 左辺 = 右辺 | 0   |
| 左辺 > 右辺 | 1   |

```shell
$ xa '1 <=> 2'
# -1

$ xa '2 <=> 2'
# 0

$ xa '3 <=> 2'
# 1
```

---

文字列同士を比較した場合は、辞書順で判定されます。

```shell
$ xa ' "a" <=> "b" '
# -1

$ xa ' "aa" <=> "a" '
# 1
```

## 宇宙船演算子のオーバーロード

宇宙船演算子は、実際には左辺の値の `_<=>_` メソッドを呼び出し、その戻り値を返す演算子です。

```shell
$ xa '
  Person := {
    `_<=>_`: this, other -> this.age <=> other.age
  }

  alice := Person{age: 30}
  bob   := Person{age: 20}

  alice <=> bob
'
# 1
```

## SORT関数などでの使用

宇宙船演算子は、 `SORT` 関数などの比較関数として使用できます。

以下の例は、文字列の長さでソートする例です。

```shell
$ xa '
  (
    "apple",
    "banana",
    "cherry",
    "durian",
    "elderberry",
    "fig",
    "grape",
  ) >> SORT[a, b -> $#a <=> $#b]
'
# fig
# apple
# grape
# banana
# cherry
# durian
# elderberry
```
