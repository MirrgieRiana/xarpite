---
title: "配列"
---

<!-- toc -->

# 配列

配列は、順序付けられた0個以上の要素を扱うデータ構造です。

Xarpiteにおける配列は可変であり、要素の代入や長さの変更が可能です。

配列のインデックスは0から始まります。

## 配列の生成

### `[value; ...]`: 配列リテラル

配列リテラルは配列を生成する最も基本的な方法です。

`[ ]` 内には `;` で区切った0個以上の式を書くことができます。

```shell
$ xa '[1; 2; 3]'
# [1;2;3]
```

---

Xarpiteでは `;` を改行で代用できるため、1行ごとに要素を書くことで `;` を省略することもできます。

```shell
$ xa '
  [
    1
    2
    3
  ]
'
# [1;2;3]
```

---

また、 `;` は無駄に多く書いても構いません。

```shell
$ xa '[; ; ; 1; ; ; 2; 3; ; ]'
# [1;2;3]
```

#### 配列リテラルのストリーム要素

配列リテラルの要素がストリームである場合、そのストリーム自体ではなく各要素が配列に格納されます。

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

## `stream.[]`: 配列化演算子

配列化演算子 `.[]` は、ストリームを配列に変換します。

```shell
$ xa '(1, 2, 3).[]'
# [1;2;3]
```

---

この演算子は、パイプ演算子などと組み合わせてストリームを加工した結果を配列にする場合に便利です。

```shell
$ xa '(1 .. 3 | _ * 10).[]'
# [10;20;30]
```

---

ストリームでない単一の値に対しても使用でき、その場合は1要素の配列を生成します。

```shell
$ xa '100.[]'
# [100]
```

### `stream.[]`: 配列化演算子

配列化演算子はストリームを配列に変換します。

```shell
$ xa '(1 .. 3).[]'
# [1;2;3]
```

---

配列化演算子は、ストリームを返す変数や関数呼び出しと組み合わせてストリームを最短の記述で配列に変換する場合に便利です。

```shell
$ seq 1 3 | xa 'I.[]'
# [1;2;3]
```

## 配列要素へのアクセス

Xarpiteにおいて、配列の要素にアクセスする手段は大きく二つに分かれます。

- 配列呼び出し
- 配列要素のプロパティアクセス

### `array(index)`: 配列呼び出し

配列は、インデックスを受け取って要素を返す関数として扱うことができます。

```shell
$ xa '
  array := ["zero", "one", "two", "three", "four"]

  array(2)
'
# two
```

このため、Xarpiteでは配列の要素を得るのに角括弧 `[ ]` ではなく丸括弧 `( )` を使用します。

#### 範囲外のインデックス

範囲外のインデックスを指定した場合、 `NULL` が返されます。

```shell
$ xa '
  array := ["zero", "one", "two", "three", "four"]

  array(5)
'
# NULL
```

#### 負のインデックス

インデックスが負の場合、配列の末尾からの相対位置として解釈されます。

```shell
$ xa '
  array := ["zero", "one", "two", "three", "four"]

  array(-1)
'
# four
```

#### ストリームによるインデックス

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

#### インデックスの整数化

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

### `array()`: 配列のストリーム化

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

### `array[indices]` 部分配列の取得

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

### `array[]`: 配列の複製

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

### `array(index) = value`: 配列呼び出しへの代入

`array(index) = value` により、配列の要素に値を代入できます。

```shell
$ xa '
  array := ["zero", "one", "two", "three", "four"]

  array(2) = 99999

  array
'
# [zero;one;99999;three;four]
```

### `array.index`: 配列要素のプロパティアクセス

配列要素のプロパティアクセス `array.index` は、配列要素に対する低レイヤーなアクセス手段を提供します。

```shell
$ xa '
  array := ["zero", "one", "two", "three", "four"]

  array.2
'
# two
```

#### プロパティアクセスの制限

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

#### プロパティアクセスの連鎖

プロパティアクセスは複数連続して書くことができます。

```shell
$ xa '
  array := [["one", "two"], ["three", "four"]]

  array.0.1
'
# two
```

---

これは、 `array.0.1` における `0.1` の部分が小数リテラルではなくプロパティアクセスの連鎖として解釈されることを意味します。

### `array.index = value`: 配列要素のプロパティアクセスによる代入

`array.index = value` により、配列要素に値を代入できます。

```shell
$ xa '
  array := ["zero", "one", "two", "three", "four"]

  array.2 = 99999

  array
'
# [zero;one;99999;three;four]
```

### `array.(index)`: 式による配列要素のプロパティアクセス

`array.(index)` のように丸括弧で囲むことで、インデックスを式で指定できます。

```shell
$ xa '
  array := ["zero", "one", "two", "three", "four"]

  array.(1 + 2)
'
# three
```

## `$#array`: 配列の長さの取得

`$#array` により、配列の要素数を取得できます。

詳細は [長さの取得](./length.md) を参照してください。

## `array + array`: 配列の連結

配列同士の加算 `array + array` は、左右の配列を連結した配列を新たに生成して返します。

```shell
$ xa '
  array1 := ["zero", "one"]
  array2 := ["two", "three"]

  array1 + array2
'
# [zero;one;two;three]
```

## `unshift` `shift` `push` `pop`: 配列の両端に追加・削除するメソッド

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

### ストリームの `unshift` `push`

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

減算代入演算子を使って配列 `array` から要素 `item` を削除できます。

`array` 変数自体には代入操作は行われず、配列 `array` 自体が改変されます。

該当する要素が複数ある場合、最も先頭に近いものが削除されます。

該当する要素が存在しない場合は何も起こりません。

`item` がストリームの場合、その各要素について削除操作が行われます。

```shell
$ xa -q '
  array := ["apple", "banana", "cherry", "banana"]
  OUT << array
  array -= "banana"
  OUT << array
  array -= "apple", "banana", "durian"
  OUT << array
'
# [apple;banana;cherry;banana]
# [apple;cherry;banana]
# [cherry]
```
