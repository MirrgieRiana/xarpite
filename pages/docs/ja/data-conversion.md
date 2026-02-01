---
title: "データ変換系関数"
---

<!-- toc -->

# データ変換系関数

## `BASE` 整数を任意の基数の文字列に変換

`BASE(radix: NUMBER; number: NUMBER): STRING`

`number` を `radix` 進数の文字列に変換します。

```shell
$ xa 'BASE(16; 248)'
# F8
```

出力は大文字で表記されます。

---

逆変換の `BASED` 関数もあります。

```shell
$ xa 'BASED(16; "F8")'
# 248
```

---

基数は2から36までサポートされます。

```shell
$ xa 'BASE(2; 248)'
# 11111000

$ xa 'BASED(2; "11111000")'
# 248
```

```shell
$ xa 'BASE(36; 248)'
# 6W

$ xa 'BASED(36; "6W")'
# 248
```

---

この関数はしばしば部分適用と実行パイプを組み合わせて書かれます。

```shell
$ xa '248 >> BASE[16] >> BASED[16]'
# 248
```

## `BASED` 任意の基数の文字列を整数に変換

`BASED(radix: NUMBER; string: STRING): NUMBER`

`radix` 進数で表記された文字列 `string` を整数に変換します。

```shell
$ xa 'BASED(16; "F8")'
# 248
```

---

この関数は `BASE` 関数の逆変換です。

基本的なことは `BASE` 関数を参照してください。

---

入力は大文字・小文字の両方を受け付けます。

```shell
$ xa '"FF" >> BASED[16]'
# 255

$ xa '"ff" >> BASED[16]'
# 255

$ xa '"fF" >> BASED[16]'
# 255
```

## `UTF8` 文字列をUTF-8でエンコードされたBLOBに変換

`UTF8(string: STRING): BLOB`

`string` をUTF-8でエンコードしたBLOBを返します。

```shell
$ xa ' "abc123αβγ" >> UTF8 '
# BLOB.of([97;98;99;49;50;51;206;177;206;178;206;179])
```

## `UTF8D` UTF-8でエンコードされたBLOBを文字列に変換

`UTF8D(blobLike: BLOB_LIKE): STRING`

`blobLike` をUTF-8でエンコードされたバイト列とみなして単一の文字列にデコードします。

`BLOB_LIKE` については [BLOB](./blob.md) を参照してください。

この関数は改行文字の正規化を行いません。

```shell
$ xa 'BLOB.of([97, 98, 99, 49, 50, 51]) >> UTF8D'
# abc123
```

---

この関数は入力されたバイト列の境界がUTF-8文字の途中で分割されている場合でも正しく動作します。

```shell
$ xa 'BLOB.of([206, 177, 206]), BLOB.of([178, 206, 179]) >> UTF8D
'
# αβγ
```

## `BASE64` 文字列をBase64文字列に変換

`BASE64(string: STRING): STRING`

`string` をBase64形式でエンコードした文字列を返します。

```shell
$ xa ' "Hello, World!" >> BASE64 '
# SGVsbG8sIFdvcmxkIQ==
```

---

出力は76文字ごとに改行されます。

```shell
$ xa ' "Hello, World!" * 10 >> BASE64 '
# SGVsbG8sIFdvcmxkIUhlbGxvLCBXb3JsZCFIZWxsbywgV29ybGQhSGVsbG8sIFdvcmxkIUhlbGxv
# LCBXb3JsZCFIZWxsbywgV29ybGQhSGVsbG8sIFdvcmxkIUhlbGxvLCBXb3JsZCFIZWxsbywgV29y
# bGQhSGVsbG8sIFdvcmxkIQ==
```

## `BASE64D` Base64文字列を文字列に変換

`BASE64D(string: STRING): STRING`

Base64形式でエンコードされた文字列 `string` をデコードした文字列を返します。

```shell
$ xa ' "SGVsbG8sIFdvcmxkIQ==" >> BASE64D '
# Hello, World!
```

---

改行文字や空白文字は無視されます。

```shell
$ xa ' "SGVsb \r G8sIF \n dvcmx \t kIQ==" >> BASE64D '
# Hello, World!
```

## `URL` 文字列をURLエンコード

`URL(string: STRING): STRING`

`string` を `application/x-www-form-urlencoded` 形式でエンコードします。

```shell
$ xa ' "Hello World" >> URL '
# Hello+World

$ xa ' "user_id=User1&password=p-a_s.s~w%o&r=d?" >> URL '
# user_id%3DUser1%26password%3Dp-a_s.s~w%25o%26r%3Dd%3F

$ xa ' "こんにちは" >> URL '
# %E3%81%93%E3%82%93%E3%81%AB%E3%81%A1%E3%81%AF
```

---

各文字ごとに、以下の方法でエンコードされます。

| 文字                                | エンコード方法                     |
|-----------------------------------|-----------------------------|
| `A-Z` `a-z` `0-9` `-` `_` `.` `~` | その文字自体                      |
| 半角スペース                            | `+`                         | 
| 上記を除く文字                           | `%XX` 形式の16進数表記によるUTF-8バイト列 |

## `URLD` URLエンコードされた文字列をデコード

`URLD(string: STRING): STRING`

`application/x-www-form-urlencoded` 形式でエンコードされた文字列である `string` をデコードします。

この関数は `URL` 関数の逆変換です。

```shell
$ xa ' "Hello+World" >> URLD '
# Hello World

$ xa ' "user_id%3DUser1%26password%3Dp-a_s.s~w%25o%26r%3Dd%3F" >> URLD '
# user_id=User1&password=p-a_s.s~w%o&r=d?

$ xa ' "%E3%81%93%E3%82%93%E3%81%AB%E3%81%A1%E3%81%AF" >> URLD '
# こんにちは
```

## `PERCENT` 文字列をパーセントエンコード

`PERCENT(string: STRING): STRING`

`string` をパーセントエンコードします。

`URL` 関数と異なり、半角スペースを含むすべての英数字以外の文字が `%XX` 方式でエンコードされます。

その結果、エンコードされた文字列には `%` 以外の記号が一切出現しません。

```shell
$ xa ' "Hello World" >> PERCENT '
# Hello%20World

$ xa ' "user_id=User1&password=p-a_s.s~w%o&r=d?" >> PERCENT '
# user%5Fid%3DUser1%26password%3Dp%2Da%5Fs%2Es%7Ew%25o%26r%3Dd%3F

$ xa ' "こんにちは" >> PERCENT '
# %E3%81%93%E3%82%93%E3%81%AB%E3%81%A1%E3%81%AF
```

---

各文字ごとに、以下の方法でエンコードされます。

| 文字                | エンコード方法                     |
|-------------------|-----------------------------|
| `A-Z` `a-z` `0-9` | その文字自体                      |
| 上記を除く文字           | `%XX` 形式の16進数表記によるUTF-8バイト列 |

## `PERCENTD` パーセントエンコードされた文字列をデコード

`PERCENTD(string: STRING): STRING`

パーセントエンコードされた文字列である `string` をデコードします。

この関数は `PERCENT` 関数の逆変換です。

```shell
$ xa ' "Hello%20World" >> PERCENTD '
# Hello World

$ xa ' "user%5Fid%3DUser1%26password%3Dp%2Da%5Fs%2Es%7Ew%25o%26r%3Dd%3F" >> PERCENTD '
# user_id=User1&password=p-a_s.s~w%o&r=d?

$ xa ' "%E3%81%93%E3%82%93%E3%81%AB%E3%81%A1%E3%81%AF" >> PERCENTD '
# こんにちは
```

## `JSON` 値をJSON文字列に変換

`JSON([indent: [indent: ]STRING | NUMBER; ]value: VALUE): STRING`

`value` をJSON形式の文字列に変換します。

```shell
$ xa '{a: 1; b: 2} >> JSON'
# {"a":1,"b":2}
```

---

`indent` に文字列を指定した場合、その文字列がインデントとして使用されます。

```shell
$ xa '{a: 1; b: 2} >> JSON[indent: "  "]'
# {
#   "a": 1,
#   "b": 2
# }
```

---

`indent` に数値を指定した場合、その個数の半角空白がインデントとして使用されます。

```shell
$ xa '{a: 1; b: 2} >> JSON[indent: 2]'
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

`JSONS([indent: [indent: ]STRING | NUMBER; ]values: STREAM<VALUE>): STREAM<STRING>`

`values` の各要素をJSON形式の文字列に変換するストリームを返します。

```shell
$ xa '{a: 1}, {b: 2} >> JSONS'
# {"a":1}
# {"b":2}
```

---

`indent` に関する仕様は `JSON` 関数と同様です。

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
