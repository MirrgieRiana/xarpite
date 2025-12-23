---
title: "データ変換系関数"
---

<!-- toc -->

# データ変換系関数

## `UTF8` 文字列をUTF-8でエンコードされたBLOBに変換

`UTF8(string: STRING): BLOB`

`string` をUTF-8でエンコードしたBLOBを返します。

```shell
$ xa ' "abc123αβγ" >> UTF8 '
# BLOB.of([97;98;99;49;50;51;206;177;206;178;206;179])
```

## `UTF8D` UTF-8でエンコードされたBLOBを文字列に変換

`UTF8D(blob: STREAM<BLOB>): STRING`

`blob` をUTF-8でエンコードされたバイト列とみなして単一の文字列にデコードします。

`blob` がストリームであった場合、すべてのBLOBを連結したバイト列をUTF-8文字列に変換します。

したがって、この関数はBLOBの境界がUTF-8文字の途中で分割されている場合でも正しく動作します。

この関数は改行文字の正規化を行いません。

```shell
$ xa '
  BLOB.of([ 97,  98,  99]),
  BLOB.of([ 49,  50,  51]),
  BLOB.of([206, 177, 206]),
  BLOB.of([178, 206, 179]),
  >> UTF8D
'
# abc123αβγ
```

## `JSON` 値をJSON文字列に変換

`JSON(["indent": indent: STRING; ]value: VALUE): STRING`

`value` をJSON形式の文字列に変換します。

```shell
$ xa '{a: 1; b: 2} >> JSON[indent: "  "]'
# {
#   "a": 1,
#   "b": 2
# }
```

## `JSOND` JSON文字列を値に変換

`JSOND(json: STRING): VALUE`

`json` を対応する値に変換します。

```shell
$ xa ' "{\"a\": 1, \"b\": 2}" >> JSOND '
# {a:1;b:2}
```

## `JSONS` 値のストリームをJSON文字列のストリームに変換

`JSONS(["indent": indent: STRING; ]values: STREAM<VALUE>): STREAM<STRING>`

`values` の各要素をJSON形式の文字列に変換するストリームを返します。

```shell
$ xa '{a: 1}, {b: 2} >> JSONS'
# {"a":1}
# {"b":2}
```

## `JSONSD` JSON文字列のストリームを値のストリームに変換

`JSONSD(jsons: STREAM<STRING>): STREAM<VALUE>`

`jsons` の各要素を対応する値に変換するストリームを返します。

```shell
$ xa ' "{\"a\": 1}", "{\"b\": 2}" >> JSONSD '
# {a:1}
# {b:2}
```

---

Jsonは改行が可能な場所で複数のストリーム要素に分割されていてもかまいません。

```shell
$ xa '
  "{",
  "  \"a\": 1",
  "}",
  "{",
  "  \"b\": 2",
  "}" >> JSONSD
'
# {a:1}
# {b:2}
```

## `CSV` 配列をCSV文字列に変換

`CSV(["separator": separator: STRING; ]["quote": quote: STRING; ]value: ARRAY<STRING> | STREAM<ARRAY<STRING>>): STRING | STREAM<STRING>`

文字列の配列やそのストリームを、CSV行の文字列やそのストリームにエンコードします。

```shell
$ xa ' [1;2;3] >> CSV '
# 1,2,3

$ xa '
  (
    [1;2;3],
    [4;5;6],
    [7;8;9],
  ) >> CSV
'
# 1,2,3
# 4,5,6
# 7,8,9
```

---

区切り文字は `separator` パラメータで指定できます。

デフォルトはカンマ `,` です。

```shell
$ xa ' [1;2;3] >> CSV[separator: "|"] '
# 1|2|3
```

---

前後に半角空白やタブ文字を含むか、区切り文字か引用符か改行文字を含むセルは、引用符で囲むことで表現します。

引用符は `quote` パラメータで指定できます。

デフォルトはダブルクォート `"` です。

```shell
$ xa ' [1;" 2 ";3] >> CSV '
# 1," 2 ",3

$ xa ' [1;" 2 ";3] >> CSV[quote: "|"] '
# 1,| 2 |,3
```

引用符を含むセルは、引用符を2つ連続して書くことで表現します。

```shell
$ xa ' [1;" \"2\" ",3] >> CSV '
# 1," ""2"" ",3
```

## `CSVD` CSV文字列を配列に変換

`CSVD(["separator": separator: STRING; ]["quote": quote: STRING; ]csv: STRING | STREAM<STRING>): ARRAY<STRING> | STREAM<ARRAY<STRING>>`

CSV行の文字列やそのストリームを、文字列の配列やそのストリームにデコードします。

多くの仕様は `CSV` と共通です。

```shell
$ xa '
  (
    "1,2,3",
    "4,5,6",
    "7,8,9",
  ) >> CSVD
'
# [1;2;3]
# [4;5;6]
# [7;8;9]
```

---

区切り文字で区切られたセクションが空である場合、空文字列が返されます。

```shell
$ xa ' ",1,,3," >> CSVD >> JSON '
# ["","1","","3",""]
```

---

行頭・行末・区切り文字の前後にある半角空白やタブ文字は無視されます。

```shell
$ xa ' " , 1 , , 3 , " >> CSVD >> JSON '
# ["","1","","3",""]
```
