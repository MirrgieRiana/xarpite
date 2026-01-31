---
title: "組み込みオブジェクトのクラス定数"
---

組み込み定数は、コード上で定義することなく利用可能な、言語機能に付属する定数です。

組み込み定数は大文字および `_` のみを使って定義されます。

組み込みの関数も組み込み定数と同じメカニズムによって提供されます。

<!-- toc -->

# 組み込みオブジェクトのクラス定数

各種組み込みオブジェクトのクラスを参照できます。

- `VALUE`
- `NULL_CLASS`
- `INT`
- `DOUBLE`
- `BOOLEAN`
- `STRING`
- `REGEX`
- `ARRAY`
- `OBJECT`
- `FUNCTION`
- `STREAM`
- `PROMISE`
- `BLOB`

# 定数

各種、特別な値を表す定数です。

| 定数          | 意味                |
|-------------|-------------------|
| `NULL` `N`  | NULL値             |
| `TRUE` `T`  | 真                 |
| `FALSE` `F` | 偽                 |
| `EMPTY` `E` | 空のストリーム           |
| `LOOP`      | 無限にNULLを生成するストリーム |

---

文字列系の組み込み定数です。

| 定数     | 意味                           |
|--------|------------------------------|
| `LT`   | `<`                          |
| `GT`   | `>`                          |
| `AMP`  | `&`                          |
| `APOS` | `'`                          |
| `QUOT` | `"`                          |
| `BOM`  | `"\uFEFF"` (Byte Order Mark) |

# ストリーム系関数

## `REVERSE` ストリームを逆順にする

`REVERSE(stream: STREAM<VALUE>): STREAM<VALUE>`

第1引数のストリームの要素を逆順にしたストリームを返します。

```shell
$ xa 'REVERSE(1 .. 3)'
# 3
# 2
# 1
```

## `SHUFFLE` ストリームをランダムな順序にする

`<T> SHUFFLE(stream: T,): T,`

`stream` の要素をランダムに並べ替えたストリームを返します。

## `DISTINCT` / `UNIQ` ストリームの重複要素を除去

ストリームから重複する要素を取り除いたストリームを返します。

`UNIQ` は `DISTINCT` の別名であり、同一の動作を持ちます。

`DISTINCT` は、2種類の呼び出し方があります。

### 要素そのもので重複判定

`DISTINCT(stream: STREAM<VALUE>): STREAM<VALUE>`

1引数で呼び出した場合、そのストリームの要素そのものを使って重複を判定し、重複を除去したストリームを返します。

```shell
$ xa '1, 2, 3, 3, 3, 2, 1, 0 >> DISTINCT'
# 1
# 2
# 3
# 0
```

### キー取得関数による重複判定

`DISTINCT(by: keyGetter: VALUE -> VALUE; stream: STREAM<VALUE>): STREAM<VALUE>`

第1引数が `by` パラメータである場合、第2引数の各要素に対して `keyGetter` 関数を適用し、その結果で重複を判定します。

以下の例では、各要素を10で割った余りで重複を判定しています。

```shell
$ xa '13, 21, 24, 33, 31, 34 >> DISTINCT[by: x -> x % 10]'
# 13
# 21
# 24
```

## `JOIN` ストリームを文字列に連結

`JOIN([separator: STRING; ]stream: STREAM<STRING>): STRING`

第2引数のストリームの各要素を第1引数のセパレータで連結した文字列を返します。第1引数を省略した場合は `,` が使用されます。

```shell
$ xa 'JOIN("|"; "a", "b", "c")'
# a|b|c

$ xa 'JOIN("a", "b", "c")'
# a,b,c
```

---

セパレータやストリームの各要素は文字列化されます。

```shell
$ xa 'JOIN(0; 1, "b", {`&_`: _ -> "c"}{})'
# 10b0c
```

---

部分適用とともに用いることで、パイプチェーンに組み込みやすくなります。

```shell
$ xa '1 .. 3 | _ * 10 >> JOIN["|"]'
# 10|20|30
```

## `SPLIT` 文字列をストリームに分割

`SPLIT([separator: [by: ]STRING; ][limit: [limit: ]INT; ]string: STRING): STREAM<STRING>`

`string` を `separator` で分割し、各部分をストリームとして返します。 `separator` を省略した場合は `,` が使用されます。

パイプ演算子との親和性のために配列ではなくストリームとして返されることに注意してください。

`SPLIT` は概念的に `JOIN` と逆の操作を行います。

`separator` や `string` は文字列化されて評価されます。

```shell
$ xa 'SPLIT("|"; "a|b|c")'
# a
# b
# c

$ xa 'SPLIT("a,b,c")'
# a
# b
# c
```

---

`limit` が指定された場合、最大で `limit` 個の要素に分割され、 `limit` 個目の要素には残りの文字列全体が含まれます。

```shell
$ xa 'SPLIT("|"; limit: 2; "a|b|c|d")'
# a
# b|c|d
```

---

部分適用とともに用いることでパイプチェーンに組み込みやすくなります。

```shell
$ xa '"10|20|30" >> SPLIT["|"] | +_ / 10'
# 1.0
# 2.0
# 3.0
```

## `LINES` 文字列を行ごとに分割

`LINES(string: STRING): STREAM<STRING>`

`string` を改行で分割し、各行をストリームとして返します。

結果の各行からは改行文字が除去されます。

`string` の末尾に改行がある場合、その改行は1個だけ無視されます。

```shell
$ xa 'LINES("A\nB\nC") >> TO_ARRAY >> JSONS'
# ["A","B","C"]

$ xa 'LINES("A\nB\nC\n") >> TO_ARRAY >> JSONS'
# ["A","B","C"]

$ xa 'LINES("A\nB\nC\n\n") >> TO_ARRAY >> JSONS'
# ["A","B","C",""]
```

---

空文字列の場合は空ストリーム、1個の改行のみの場合は空文字列1個のストリームを返します。

```shell
$ xa 'LINES("") >> TO_ARRAY >> JSONS'
# []

$ xa 'LINES("\n") >> TO_ARRAY >> JSONS'
# [""]
```

---

改行文字（LF、CR、CRLF）はすべて認識されます。

```shell
$ xa 'LINES("A\rB\nC\r\nD")'
# A
# B
# C
# D
```

## `KEYS` オブジェクトのキーのストリームを取得

`KEYS(object: OBJECT | STREAM<OBJECT>): STREAM<STRING>`

`object` のキーのストリームを返します。

```shell
$ xa 'KEYS({a: 1; b: 2; c: 3})'
# a
# b
# c
```

---

`object` がストリームの場合、各要素のオブジェクトのキーを順番に返す平坦化されたストリームを返します。

```shell
$ xa 'KEYS({a: 1; b: 2}, {c: 3; d: 4})'
# a
# b
# c
# d
```

## `VALUES` オブジェクトの値のストリームを取得

`VALUES(object: OBJECT): STREAM<VALUE>`

第1引数のオブジェクトの値のストリームを返します。

```shell
$ xa 'VALUES({a: 1; b: 2; c: 3})'
# 1
# 2
# 3
```

## `INVERT` 値からキーを引くオブジェクトを返す

`INVERT(object: OBJECT<VALUE>): OBJECT<STRING>`

`object` の各エントリーの値からキーを引くオブジェクトを生成して返します。

```shell
$ xa 'INVERT({a: "apple"; b: "banana"; c: "cherry"})'
# {apple:a;banana:b;cherry:c}
```

---

値はキーとして扱ううえで一度文字列化されます。

```shell
$ xa '
  Fruit := {
    new: value -> Fruit{value: value}
    `&_`: this -> "Fruit[$(this.value)]"
  }
  INVERT({
    a: Fruit.new("apple")
    b: Fruit.new("banana")
    c: Fruit.new("cherry")
  })
'
# {Fruit[apple]:a;Fruit[banana]:b;Fruit[cherry]:c}
```

---

値が重複していた場合、その中のいずれかのエントリーのキーがマッピングされます。

```shell
$ xa '
  object   := {a: "apple"; b: "banana"; c: "apple"}
  inverted := INVERT(object)
  inverted.apple >> object
'
# apple
```

どのキーがマッピングされるかは未定義です。

## `SUM` ストリームの要素の合計

`SUM(numbers: STREAM<NUMBER>): NUMBER`

第1引数のストリームの各要素を加算した値を返します。

```shell
$ xa 'SUM(1 .. 3)'
# 6
```

## `MIN` ストリームの最小値

`MIN(numbers: STREAM<NUMBER>): NUMBER`

第1引数のストリームの最小値を返します。

ストリームが空の場合は `NULL` を返します。

```shell
$ xa 'MIN(3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5)'
# 1

$ xa 'MIN(,)'
# NULL
```

## `MAX` ストリームの最大値

`MAX(numbers: STREAM<NUMBER>): NUMBER`

第1引数のストリームの最大値を返します。

ストリームが空の場合は `NULL` を返します。

```shell
$ xa 'MAX(3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5)'
# 9

$ xa 'MAX(,)'
# NULL
```

## `COUNT` ストリームの要素数

`COUNT(stream: STREAM<VALUE>): INT`

第1引数のストリームの要素数を返します。

非ストリームの場合、1を返します。

```shell
$ xa 'COUNT(1, 2, 3)'
# 3

$ xa 'COUNT(1)'
# 1

$ xa 'COUNT(,)'
# 0
```

## `FIRST` ストリームの先頭要素を取得

`FIRST(stream: STREAM<VALUE>): VALUE`

第1引数のストリームの先頭要素を返します。ストリームが空の場合は `NULL` を返します。

非ストリームを渡した場合は、その値をそのまま返します。

```shell
$ xa 'FIRST(4, 5, 6)'
# 4

$ xa 'FIRST(4)'
# 4

$ xa 'FIRST(,)'
# NULL
```

## `LAST` ストリームの末尾要素を取得

`LAST(stream: STREAM<VALUE>): VALUE`

第1引数のストリームの末尾要素を返します。ストリームが空の場合は `NULL` を返します。

非ストリームを渡した場合は、その値をそのまま返します。

```shell
$ xa 'LAST(4, 5, 6)'
# 6

$ xa 'LAST(6)'
# 6

$ xa 'LAST(,)'
# NULL
```

## `SINGLE` ストリームの唯一の要素を取得

`<T> SINGLE(stream: STREAM<T>): T`

第1引数のストリームの唯一の要素を返します。ストリームが空か複数要素を持つ場合はエラーをスローします。

非ストリームを渡した場合は、その値をそのまま返します。

```shell
$ xa 'SINGLE(4, 5, 6) !? "Error"'
# Error

$ xa 'SINGLE(6)'
# 6

$ xa 'SINGLE(,) !? "Error"'
# Error
```

## `SORT` ストリームを昇順にソートする

ストリームを昇順にソートします。

`SORT` は、3種類の呼び出し方があります。

### 自然順序付けによるソート

`SORT(stream: STREAM<VALUE>): STREAM<VALUE>`

1引数で呼び出した場合、そのストリームの要素を昇順にソートしたストリームを返します。

```shell
$ xa '3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5 >> SORT >> JOIN[" "]'
# 1 1 2 3 3 4 5 5 5 6 9
```

### 比較関数によるソート

`SORT(comparator: VALUE, VALUE -> INT; stream: STREAM<VALUE>): STREAM<VALUE>`

2引数で呼び出した場合、第1引数の比較関数を使用して第2引数のストリームをソートします。

以下の例では、各要素を3で割った余りでソートしています。

```shell
$ xa '1 .. 9 >> SORT[a, b -> a % 3 <=> b % 3] >> JOIN[" "]'
# 3 6 9 1 4 7 2 5 8
```

### キー取得関数によるソート

`SORT(by: key_getter: VALUE -> VALUE; stream: STREAM<VALUE>): STREAM<VALUE>`

第1引数が `by` パラメータである場合、第2引数の各要素に対して `key_getter` 関数を適用し、その結果を比較してソートします。

以下の例では、各要素を3で割った余りでソートしています。

```shell
$ xa '1 .. 9 >> SORT[by: x -> x % 3] >> JOIN[" "]'
# 3 6 9 1 4 7 2 5 8
```

## `SORTR` ストリームを降順にソートする

`SORTR(stream: STREAM<VALUE>): STREAM<VALUE>`

`SORTR(comparator: VALUE, VALUE -> INT; stream: STREAM<VALUE>): STREAM<VALUE>`

`SORTR(by: key_getter: VALUE -> VALUE; stream: STREAM<VALUE>): STREAM<VALUE>`

ストリームを降順にソートします。

ソートが降順である点を除き、 `SORT` 関数と同じです。

```shell
$ xa '3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5 >> SORTR >> JOIN[" "]'
# 9 6 5 5 5 4 3 3 2 1 1
```

## `GROUP` ストリームをキーでグループ化

`<T, K> GROUP([keyGetter: [by: ]T -> K; ]stream: STREAM<T>): STREAM<[K; ARRAY<T>]>`

`stream` の各要素に対して `keyGetter` を適用し、同一のキーとなる値を配列でエントリーにまとめてストリームで返します。

`keyGetter` を省略した場合は要素そのものをキーとしてグループ化します。

エントリーの配列は、最初にそのキーが現れた順序になります。

```shell
$ xa '"apple", "cherry","banana", "banana", "apple" >> GROUP'
# [apple;[apple;apple]]
# [cherry;[cherry]]
# [banana;[banana;banana]]

$ xa '
  {category: "fruit" ; value: "apple" },
  {category: "fruit" ; value: "banana"},
  {category: "animal"; value: "cat"   },
  >> GROUP[by: x -> x.category]
'
# [fruit;[{category:fruit;value:apple};{category:fruit;value:banana}]]
# [animal;[{category:animal;value:cat}]]
```

---

キーが文字列化可能な場合、 `TO_OBJECT` 関数によって簡単にオブジェクトにまとめることができます。

```shell
$ xa '
  object := (
    {category: "fruit" ; value: "apple" },
    {category: "fruit" ; value: "banana"},
    {category: "animal"; value: "cat"   },
    >> GROUP[by: x -> x.category]
    >> TO_OBJECT
  )
  object.fruit() | _.value
'
# apple
# banana
```

## `CHUNK` ストリームを一定サイズの配列に分割

`CHUNK(size: NUMBER; stream: STREAM<VALUE>): STREAM<ARRAY<VALUE>>`

第2引数のストリームの要素を第1引数で指定したサイズごとにまとめた配列のストリームを返します。

```shell
$ xa '1, 2, 3, 4, 5 >> CHUNK[2]'
# [1;2]
# [3;4]
# [5]
```

## `TAKE` ストリームの先頭を取得

`TAKE(count: INT; stream: STREAM<VALUE>): STREAM<VALUE>`

第2引数のストリームから先頭 `count` 個の要素を取り出したストリームを返します。

```shell
$ xa '1, 2, 3 >> TAKE[2]'
# 1
# 2
```

## `TAKER` ストリームの末尾を取得

`TAKER(count: INT; stream: STREAM<VALUE>): STREAM<VALUE>`

第2引数のストリームから末尾 `count` 個の要素を取り出したストリームを返します。

```shell
$ xa '1, 2, 3 >> TAKER[2]'
# 2
# 3
```

## `DROP` ストリームの先頭を破棄

`DROP(count: INT; stream: STREAM<VALUE>): STREAM<VALUE>`

第2引数のストリームから先頭 `count` 個の要素を取り除いたストリームを返します。

```shell
$ xa '1, 2, 3 >> DROP[2]'
# 3
```

## `DROPR` ストリームの末尾を破棄

`DROPR(count: INT; stream: STREAM<VALUE>): STREAM<VALUE>`

第2引数のストリームから末尾 `count` 個の要素を取り除いたストリームを返します。

```shell
$ xa '1, 2, 3 >> DROPR[2]'
# 1
```

## `FILTER` ストリームを条件で抽出

`FILTER(predicate: [by: ]VALUE -> BOOLEAN; stream: STREAM<VALUE>): STREAM<VALUE>`

`stream` の各要素に `predicate` を適用し、真となった要素のみを含むストリームを返します。

```shell
$ xa '1 .. 5 >> FILTER [ x => x % 2 == 1 ]'
# 1
# 3
# 5

$ xa '1 .. 5 >> FILTER[by: x -> x % 2 == 1]'
# 1
# 3
# 5
```

## `GREP` ストリームを条件で抽出

`FILTER` のエイリアスです。

## `REDUCE` ストリームの要素を累積する

`REDUCE(function: VALUE, VALUE -> VALUE; stream: STREAM<VALUE>): VALUE`

`REDUCE` は `stream` の隣り合った要素を `function` によって累積し、一つの値に集約する関数です。

`REDUCE` は、しばしば部分適用によってストリームを処理する関数として用いられます。

```shell
$ xa 'REDUCE(a, b -> a + b; 1 .. 4)'
# 10

$ xa '1 .. 4 >> REDUCE[a, b -> a + b]'
# 10
```

この例は、1から4までのすべての隣接する値に対して `a + b` を適当します。

すなわち、 `1 + 2 + 3 + 4` と同じです。

---

ストリームの要素が1つしかない、もしくはストリームでない場合、その要素をそのまま返します。

```shell
$ xa '1 >> REDUCE[a, b -> a + b]'
# 1
```

---

ストリームが空の場合、 `NULL` を返します。

```shell
$ xa ', >> REDUCE[a, b -> a + b]'
# NULL
```

## `TO_STRING` 文字列化

`TO_STRING(value: VALUE): STRING`

値を文字列に変換します。

`&value` 演算子と同じ動作をします。

```shell
$ xa 'TO_STRING(123)'
# 123

$ xa '1, 2, 3 >> TO_STRING'
# 123
```

## `TO_BOOLEAN` 論理値化

`TO_BOOLEAN(value: VALUE): BOOLEAN`

値を論理値に変換します。

`?value` 演算子と同じ動作をします。

```shell
$ xa 'TO_BOOLEAN("")'
# FALSE

$ xa 'TO_BOOLEAN("a")'
# TRUE

$ xa 'FALSE, TRUE, FALSE >> TO_BOOLEAN'
# TRUE
```

## `TO_ARRAY` ストリームを配列に変換

`ARRAY(stream: STREAM<VALUE>): ARRAY<VALUE>`

第1引数のストリームの各要素を配列に変換します。

```shell
$ xa 'TO_ARRAY(1 .. 3)'
# [1;2;3]
```

## `TO_OBJECT` エントリーのストリームをオブジェクトに変換

`OBJECT(stream: STREAM<ARRAY<STRING; VALUE>>): OBJECT`

第1引数のストリームの各要素をエントリーとしてオブジェクトに変換します。

```shell
$ xa 'TO_OBJECT(("a": 1), ("b": 2), ("c": 3))'
# {a:1;b:2;c:3}
```

## `::LET` / `LET` 値をブロックに渡してブロックの戻り値を返す

`<I, O> I::LET(block: I -> O): O`

`<I, O> LET(receiver: I; block: I -> O): O`

レシーバーの値を `block` に渡して実行し、 `block` の戻り値を返す拡張関数です。

メソッドチェーンの途中で値を変換するのに便利です。

```shell
$ xa '"apple"::LET ( s => s & "banana" )::UC()'
# APPLEBANANA
```

---

`::LET`は連鎖して使用することもできます。

```shell
$ xa '"apple"::LET ( s => s & "banana" )::LET ( s => s::UC() )'
# APPLEBANANA
```

### ストリームに対する使用

ストリームはすべてのメソッドを各要素に対して適用する性質上、 `::LET` 拡張メソッドを利用することができません。

```shell
$ xa '
  Object := {
    new: value -> Object{value: value}
    LET: this, block -> "LET!"
  }
  stream := Object.new(1), Object.new(2), Object.new(3)

  stream::LET ( s => s.value >> SUM )
'
# LET!
# LET!
# LET!
```

---

そのため、代わりにストリームも取れる `LET` 関数を使用します。

2文字長い代わりに、 `stream::(LET) ( s => ... )` という形で概ね同じように動作します。

```shell
$ xa '
  Object := {
    new: value -> Object{value: value}
    LET: this, block -> "LET!"
  }
  stream := Object.new(1), Object.new(2), Object.new(3)

  stream::(LET) ( s => s.value >> SUM )
'
# 6
```

## `::ALSO` / `ALSO` 値をブロックに渡して元の値を返す

`<T> T::ALSO(block: T -> VALUE): T`

`<T> ALSO(receiver: T; block: T -> VALUE): T`

レシーバーの値を `block` に渡して実行し、レシーバーの値を返す拡張関数です。

1度の呼び出しにつき、 `block` の副作用も丁度1度だけ発生します。

メソッドチェーンの途中で値を使用や改変するのに便利です。

```shell
$ xa '
  variable := ""
  "apple"::ALSO ( s => 
    variable = variable & s
  )
  variable
'
# apple
```

その他の性質は概ね `LET` と同じです。

## `LAZY` 遅延評価・キャッシュ関数

`<T> LAZY(initializer: () -> T): () -> T`

遅延評価とキャッシュをする関数を返します。

`initializer` は `LAZY` の戻り値の関数の初回呼び出し時に1度だけ呼び出され、その結果はキャッシュされます。

`initializer` がストリームを返した場合、そのストリームは解決されます。

```shell
$ xa -q '
  counter := 1
  lazy := LAZY ( =>
    counter++
    counter
  )
  OUT << lazy()
  OUT << lazy()
  OUT << lazy()
'
# 2
# 2
# 2
```

---

この関数は委譲変数と組み合わせると関数呼び出し演算子を省略できて便利です。

```shell
$ xa -q '
  time := 0
  \now := LAZY ( => time )

  time = 100
  OUT << now
  time = 200
  OUT << now
'
# 100
# 100
```
