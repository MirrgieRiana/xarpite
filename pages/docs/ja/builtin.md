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

数学系の組み込み定数です。

| 定数        | 意味    |
|-----------|-------|
| `MATH.PI` | 円周率   |
| `MATH.E`  | ネイピア数 |

---

文字列系の組み込み定数です。

| 定数     | 意味  |
|--------|-----|
| `LT`   | `<` |
| `GT`   | `>` |
| `AMP`  | `&` |
| `APOS` | `'` |
| `QUOT` | `"` |

# 数学系関数

## `ABS` 絶対値の取得

`ABS(value: NUMBER): NUMBER`

第1引数の絶対値を返します。

```shell
$ xa 'ABS(-10)'
# 10
```

## `FLOOR` 小数点以下切り捨て

`FLOOR(number: NUMBER): INTEGER`

第1引数の数値を、値が小さい方の整数に丸めます。

```shell
$ xa 'FLOOR(1.5)'
# 1
```

## `DIV` 除算の整数部

`DIV(x: NUMBER; y: NUMBER): NUMBER`

`x` を `y` で割り、その結果の整数部分を返します。

```shell
$ xa 'DIV(10; 3)'
# 3
```

## `SQRT` 平方根の取得

`SQRT(number: NUMBER): NUMBER`

第1引数の正の平方根を返します。

```shell
$ xa '"$%.3f(  SQRT(100.0)  )"'
# 10.000
```

## `SIN` 正弦

`SIN(number: NUMBER): NUMBER`

第1引数をラジアンとして解釈し、その正弦を返します。

```shell
$ xa '"$%.3f(  SIN(PI / 2)  )"'
# 1.000
```

## `COS` 余弦

`COS(number: NUMBER): NUMBER`

第1引数をラジアンとして解釈し、その余弦を返します。

```shell
$ xa '"$%.3f(  COS(0)  )"'
# 1.000
```

## `TAN` 正接

`TAN(number: NUMBER): NUMBER`

第1引数をラジアンとして解釈し、その正接を返します。

```shell
$ xa '"$%.3f(  TAN(PI / 4)  )"'
# 1.000
```

## `POW` べき乗

`POW(base: NUMBER; exponent: NUMBER): NUMBER`

第1引数を第2引数でべき乗した結果を返します。

```shell
$ xa 'POW(2; 3)'
# 8.0
```

## `EXP` 指数関数

`EXP(number: NUMBER): NUMBER`

第1引数の指数関数（底 e）を返します。

```shell
$ xa '"$%.3f(  EXP(1)  )"'
# 2.718

$ xa '"$%.3f(  EXP(2)  )"'
# 7.389
```

## `LOG` 自然対数

`LOG(number: NUMBER): NUMBER`

第1引数の自然対数（底 e）を返します。

```shell
$ xa '"$%.3f(  LOG(MATH.E)  )"'
# 1.000
```

## `RAND` 乱数の取得

`RAND(): DOUBLE`

`RAND([from: NUMBER; ]until: NUMBER): INT`

引数なしで呼び出された場合、0以上1未満の小数を返します。

1引数で呼び出された場合、0以上 `until` 未満の整数を返します。

2引数で呼び出された場合、`from` 以上 `until` 未満の整数を返します。

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

## `DISTINCT` ストリームの重複要素を除去

ストリームから重複する要素を取り除いたストリームを返します。

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

`SPLIT([separator: STRING; ]string: STRING): STREAM<STRING>`

第2引数の文字列を第1引数のセパレータで分割し、各部分をストリームとして返します。第1引数を省略した場合は `,` が使用されます。

パイプ演算子との親和性のために配列ではなくストリームとして返されることに注意してください。

`SPLIT` は概念的に `JOIN` と逆の操作を行います。

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

セパレータや分割対象文字列は文字列化されて評価されます。

---

部分適用とともに用いることで、パイプチェーンに組み込みやすくなります。

```shell
$ xa '"10|20|30" >> SPLIT["|"] | +_ / 10'
# 1.0
# 2.0
# 3.0
```

## `KEYS` オブジェクトのキーのストリームを取得

`KEYS(object: OBJECT): STREAM<STRING>`

第1引数のオブジェクトのキーのストリームを返します。

```shell
$ xa 'KEYS({a: 1; b: 2; c: 3})'
# a
# b
# c
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

第1引数のストリームの唯一の要素を返します。ストリームが空か複数要素を持つ場合は例外をスローします。

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

`<T, K> GROUP(by = key_getter: T -> K; stream: T,): [K; [T,]],`

`stream` の各要素に対して `key_getter` を適用し、同一のキーとなる値をエントリー配列にまとめてストリームで返します。

エントリー配列は、最初にそのキーが現れた順序になります。

```shell
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

`FILTER(predicate: VALUE -> BOOLEAN; stream: STREAM<VALUE>): STREAM<VALUE>`

第2引数のストリームの各要素に `predicate` を適用し、その結果が真となった要素のみを含むストリームを返します。

```shell
$ xa '1, 2, 3, 4, 5 >> FILTER [ x => x % 2 == 0 ]'
# 2
# 4
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

## `TO_NUMBER` 数値化

`TO_NUMBER(value: VALUE): NUMBER`

値を数値に変換します。

`+value` 演算子と同じ動作をします。

```shell
$ xa 'TO_NUMBER("123")'
# 123

$ xa '1, 2, 3 >> TO_NUMBER'
# 6

$ xa 'TO_NUMBER(NULL)'
# 0
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

## `::LET` 値をブロックに渡してブロックの戻り値を返す

`<I, O> I::LET(block: I -> O): O`

レシーバーの値をブロックに渡して実行し、ブロックの戻り値を返す拡張関数です。

値を変換するのに便利です。

```shell
$ xa '10::LET(x => x + x)'
# 20
```

---

`::LET`は連鎖して使用することもできます。

```shell
$ xa '10::LET(x => x + x)::LET(y => y * 10)'
# 200
```

---

ストリームに対して`::LET`を呼び出した場合、ブロックにはストリーム自体が渡されます。

```shell
$ xa '(1, 2, 3)::LET(s => s >> SUM)'
# 6
```

## `::ALSO` 値をブロックに渡して元の値を返す

`<T> T::ALSO(block: T -> VALUE): T`

レシーバーの値をブロックに渡して実行し、元の値を返す拡張関数です。

ブロックは実行されますが、その戻り値は破棄され、`::ALSO`は常にレシーバーの値を返します。

ただし、ブロックの戻り値がストリームの場合、ストリームは解決（消費）されます。

これは、値を変数に代入したり、ログ出力したりといった副作用を起こしつつ、その値をパイプチェーンに流したい場合に便利です。

```shell
$ xa '
  123::ALSO(x => 
    OUT << x
  )
'
# 123
# 123
```

---

`::ALSO`は連鎖して使用することもできます。

```shell
$ xa '
  100::ALSO(x => 
    OUT << x
  )::ALSO(y => 
    OUT << (y + 10)
  )
'
# 100
# 110
# 100
```

---

ストリームに対して`::ALSO`を呼び出した場合、ブロックにはストリーム自体が渡されます。

```shell
$ xa '
  (1, 2, 3)::ALSO(s => 
    OUT << "Processing"
  )
'
# Processing
# 123
```
