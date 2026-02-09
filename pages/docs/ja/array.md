---
title: "配列の概要"
---

<!-- toc -->

# 配列の概要

配列は、順序によって管理される複数の要素を扱うデータ構造です。

Xarpiteにおける配列は可変であり、要素の代入や長さの変更が可能です。

配列のインデックスは0から始まります。

# 配列の生成

配列は配列リテラル `[value; ...]` によって生成します。

角括弧内には、 `;` で区切って0個以上の値を書くことができます。

```shell
$ xa '[1; 2; 3]'
# [1;2;3]
```

## 配列リテラルのセパレータ

配列リテラル内での `;` の記述は柔軟です。

項の前後や中間に `;` を余計に多く書いても問題ありません。

また、改行は `;` の代わりになります。

```shell
$ xa '
  [
    1
    2
    ; ; ; 3; ; ;
  ]
'
# [1;2;3]
```

## ストリームによる配列の生成

`;` で区切られた項がストリームである場合、ストリームそのものではなく、ストリームの各要素が配列に格納されます。

```shell
$ xa '[1 .. 3; 4, 5, 6]'
# [1;2;3;4;5;6]

$ xa '
  [
    1 .. 3 | _ * 10
    4 .. 6 | _ * 100
  ]
'
# [10;20;30;400;500;600]
```

# 配列の要素の参照

Xarpiteにおいて、配列の要素にアクセスする手段は大きく二つに分かれます。

- 配列呼び出し
- 配列要素のプロパティアクセス

## 配列呼び出し

配列は、インデックスを受け取って要素を返す関数 `array(index)` として扱うことができます。

```shell
$ xa '
  array := ["zero", "one", "two", "three", "four"]

  array(2)
'
# two
```

このため、Xarpiteでは配列の要素を得るのに角括弧 `[ ]` ではなく丸括弧 `( )` を使用します。

### 範囲外のインデックス

範囲外のインデックスを指定した場合、 `NULL` が返されます。

```shell
$ xa '
  array := ["zero", "one", "two", "three", "four"]

  array(5)
'
# NULL
```

### 負のインデックス

インデックスが負の場合、配列の末尾からの相対位置として解釈されます。

```shell
$ xa '
  array := ["zero", "one", "two", "three", "four"]

  array(-1)
'
# four
```

### インデックスのストリーム

インデックスはストリームであってもかまいません。

その場合、ストリームの各要素のインデックスに対応する配列要素のストリームが返されます。

```shell
$ xa '
  array := ["zero", "one", "two", "three", "four"]

  array(2, 4, 0)
'
# two
# four
# zero
```

---

これにより、配列は、ストリームを加工する関数のように利用できます。

```shell
$ xa '
  array := ["zero", "one", "two", "three", "four"]

  3 .. 1 >> array
'
# three
# two
# one
```

### インデックスの評価方法

インデックスは、数値化したうえで四捨五入されます。

```shell
$ xa '
  array := ["zero", "one", "two", "three", "four"]

  array("2.95")
'
# three
```

---

この性質により、計算上整数になる小数の計算結果を使ったアクセスが容易になります。

```shell
$ xa '
  array := ["zero", "one", "two", "three", "four"]

  array(SQRT(16) - SQRT(9))
'
# one
```

### 配列のストリーム化

`array()` により、その配列のすべての要素を順番にイテレートするストリームが生成されます。

```shell
$ xa '
  array := ["zero", "one", "two", "three", "four"]

  array()
'
# zero
# one
# two
# three
# four
```

### 部分配列の取得

`array[indices]` により、配列の部分配列を取得することができます。

```shell
$ xa '
  array := ["zero", "one", "two", "three", "four"]

  array[1 .. 3]
'
# [one;two;three]
```

`indices` は空ストリームや、ストリームでない単一のインデックスであってもかまいません。

---

この文法は、配列のストリーム化と合わせて、 `array(indices)` と `array[indices]()` が等しいことを成り立たせます。

```shell
$ xa '
  array := ["zero", "one", "two", "three", "four"]

  array(1 .. 3)
'
# one
# two
# three

$ xa '
  array := ["zero", "one", "two", "three", "four"]

  array[1 .. 3]()
'
# one
# two
# three
```

この性質は、関数呼び出しと関数の部分適用の関係に似ています。

### 配列の複製

`array[]` で配列の浅いコピーを生成します。

生成された配列に対する変更は、元の配列には反映されません。

```shell
$ xa -q '
  array := ["zero", "one", "two", "three", "four"]
  new_array := array[]

  new_array(2) = 99999

  OUT << array
  OUT << new_array
'
# [zero;one;two;three;four]
# [zero;one;99999;three;four]
```

言い換えると、配列の複製は、元のすべての要素を持つ部分配列の取得操作と同じです。

### 配列呼び出しへの代入

`array(index) = value` により、配列の要素に値を代入できます。

```shell
$ xa '
  array := ["zero", "one", "two", "three", "four"]

  array(2) = 99999

  array
'
# [zero;one;99999;three;four]
```

## 配列要素のプロパティアクセス

配列要素のプロパティアクセス `array.index` は、配列要素に対する低レイヤーなアクセス手段を提供します。

```shell
$ xa '
  array := ["zero", "one", "two", "three", "four"]

  array.2
'
# two
```

### プロパティアクセスによる代入

`array.index = value` により、配列要素に値を代入できます。

```shell
$ xa '
  array := ["zero", "one", "two", "three", "four"]

  array.2 = 99999

  array
'
# [zero;one;99999;three;four]
```

### 式によるプロパティアクセス

`array.(index)` のように丸括弧で囲むことで、インデックスを式で指定できます。

```shell
$ xa '
  array := ["zero", "one", "two", "three", "four"]

  array.(1 + 2)
'
# three
```

### プロパティアクセスの制限

配列呼び出しと異なり、以下の「気の利いた」機能は提供されません。

- 負のインデックス
- ストリームによるインデックスの指定
- 部分配列の取得

---

その代わり、配列の要素にストリームを展開せずに直接代入することができます。

```shell
$ xa '
  array := ["zero", "one", "two", "three", "four"]

  array.2 = 1 .. 3

  array
'
# [zero;one;123;three;four]
```

### プロパティアクセスの連鎖

プロパティアクセスは複数連続して書くことができます。

```shell
$ xa '
  array := [["one", "two"], ["three", "four"]]

  array.0.1
'
# two
```

# 配列の長さの取得

`$#array` により、配列の要素数を取得できます。

詳細は [長さの取得](./length.md) を参照してください。

# 配列の連結

配列同士の加算 `array + array` は、左右の配列を連結した配列を新たに生成して返します。

```shell
$ xa '
  array1 := ["zero", "one"]
  array2 := ["two", "three"]

  array1 + array2
'
# [zero;one;two;three]
```

# 配列の両端に追加・削除するメソッド

`unshift` `shift` `push` `pop` メソッドは、それぞれ配列の末尾・先頭に要素を追加・削除します。

これらのメソッドは、破壊的な操作を行います。

| メソッド      | 操作対象 | 操作内容  | 返り値    |
|-----------|------|-------|--------|
| `unshift` | 先頭   | 要素を追加 | `NULL` |
| `shift`   | 先頭   | 要素を削除 | 削除した要素 |
| `push`    | 末尾   | 要素を追加 | `NULL` |
| `pop`     | 末尾   | 要素を削除 | 削除した要素 |

```shell
$ xa -q '
  array := ["zero", "one", "two", "three", "four"]

  array::unshift("minus one")
  OUT << array

  OUT << array::shift()
  OUT << array

  array::push("five")
  OUT << array

  OUT << array::pop()
  OUT << array
'
# [minus one;zero;one;two;three;four]
# minus one
# [zero;one;two;three;four]
# [zero;one;two;three;four;five]
# five
# [zero;one;two;three;four]
```

## ストリームの `unshift` `push`

`unshift` `push` メソッドにストリームを渡すと、そのストリームの各要素が配列に追加されます。

```shell
$ xa -q '
  array := ["zero", "one", "two", "three", "four"]

  array::unshift("minus two", "minus one")
  OUT << array

  array::push("five", "six")
  OUT << array
'
# [minus two;minus one;zero;one;two;three;four]
# [minus two;minus one;zero;one;two;three;four;five;six]
```

## `array += item`: 配列への要素の追加

加算代入演算子を使って配列に要素を追加することができます。

左辺の変数自体には代入操作は行われず、配列自体が変化します。

概ね `push` メソッドと同様の動作をします。

```shell
$ xa '
  array := ["apple"]
  array += "banana"
  array
'
# [apple;banana]
```

## `array -= item`: 配列からの要素の削除

減算代入演算子を使って配列から要素を削除することができます。

左辺の変数自体には代入操作は行われず、配列自体が変化します。

指定した値と等しい要素が最初に見つかった位置から削除されます。

該当する要素が存在しない場合は何も起こりません。

```shell
$ xa '
  array := ["apple", "banana", "cherry"]
  array -= "banana"
  array
'
# [apple;cherry]
```
