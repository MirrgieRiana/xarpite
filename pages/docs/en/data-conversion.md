---
title: "Data Conversion Functions"
---

<!-- toc -->

# Data Conversion Functions

## `UTF8` Convert String to UTF-8 Encoded BLOB

`UTF8(string: STRING): BLOB`

Returns a BLOB with `string` encoded in UTF-8.

```shell
$ xa ' "abc123αβγ" >> UTF8 '
# BLOB.of([97;98;99;49;50;51;206;177;206;178;206;179])
```

## `UTF8D` Convert UTF-8 Encoded BLOB to String

`UTF8D(blobLike: BLOB_LIKE): STRING`

Decodes `blobLike` as a byte sequence encoded in UTF-8 into a single string.

For `BLOB_LIKE`, see [BLOB](./blob.md).

This function does not normalize newline characters.

```shell
$ xa 'BLOB.of([97, 98, 99, 49, 50, 51]) >> UTF8D'
# abc123
```

---

This function works correctly even when the input byte sequence boundaries are split in the middle of UTF-8 characters.

```shell
$ xa 'BLOB.of([206, 177, 206]), BLOB.of([178, 206, 179]) >> UTF8D
'
# αβγ
```

## `URL` Encode String to URL Format

`URL(string: STRING): STRING`

Encodes `string` in `application/x-www-form-urlencoded` format.

Characters other than `A-Z a-z 0-9 - _ . ~` and space are encoded as UTF-8 byte sequences in `%XX` format.

Spaces are converted to `+`.

```shell
$ xa ' "Hello World" >> URL '
# Hello+World

$ xa ' "a=b&c=d" >> URL '
# a%3Db%26c%3Dd

$ xa ' "こんにちは" >> URL '
# %E3%81%93%E3%82%93%E3%81%AB%E3%81%A1%E3%81%AF
```

## `URLD` Decode URL-Encoded String

`URLD(string: STRING): STRING`

Decodes a string encoded in `application/x-www-form-urlencoded` format.

`+` is converted to space.

`%XX` format sequences are interpreted as UTF-8 byte sequences and decoded to a string.

```shell
$ xa ' "Hello+World" >> URLD '
# Hello World

$ xa ' "a%3Db%26c%3Dd" >> URLD '
# a=b&c=d

$ xa ' "%E3%81%93%E3%82%93%E3%81%AB%E3%81%A1%E3%81%AF" >> URLD '
# こんにちは
```

## `PERCENT` Encode String with Percent Encoding

`PERCENT(string: STRING): STRING`

Encodes `string` with percent encoding.

All characters other than `a-z A-Z 0-9` are encoded as UTF-8 byte sequences in `%XX` format.

This function is for general-purpose escaping and generates safe strings with no symbols other than `%`.

```shell
$ xa ' "Hello World" >> PERCENT '
# Hello%20World

$ xa ' "a-b_c.d" >> PERCENT '
# a%2Db%5Fc%2Ed

$ xa ' "こんにちは" >> PERCENT '
# %E3%81%93%E3%82%93%E3%81%AB%E3%81%A1%E3%81%AF
```

## `PERCENTD` Decode Percent-Encoded String

`PERCENTD(string: STRING): STRING`

Decodes a percent-encoded string.

`%XX` format sequences are interpreted as UTF-8 byte sequences and decoded to a string.

```shell
$ xa ' "Hello%20World" >> PERCENTD '
# Hello World

$ xa ' "a%2Db%5Fc%2Ed" >> PERCENTD '
# a-b_c.d

$ xa ' "%E3%81%93%E3%82%93%E3%81%AB%E3%81%A1%E3%81%AF" >> PERCENTD '
# こんにちは
```

## `JSON` Convert Value to JSON String

`JSON(["indent": indent: STRING; ]value: VALUE): STRING`

Converts `value` to a JSON-formatted string.

```shell
$ xa '{a: 1; b: 2} >> JSON[indent: "  "]'
# {
#   "a": 1,
#   "b": 2
# }
```

## `JSOND` Convert JSON String to Value

`JSOND(json: STRING): VALUE`

Converts `json` to the corresponding value.

```shell
$ xa ' "{\"a\": 1, \"b\": 2}" >> JSOND '
# {a:1;b:2}
```

## `JSONS` Convert Stream of Values to Stream of JSON Strings

`JSONS(["indent": indent: STRING; ]values: STREAM<VALUE>): STREAM<STRING>`

Returns a stream that converts each element of `values` to a JSON-formatted string.

```shell
$ xa '{a: 1}, {b: 2} >> JSONS'
# {"a":1}
# {"b":2}
```

## `JSONSD` Convert Stream of JSON Strings to Stream of Values

`JSONSD(jsons: STREAM<STRING>): STREAM<VALUE>`

Returns a stream that converts each element of `jsons` to the corresponding value.

```shell
$ xa ' "{\"a\": 1}", "{\"b\": 2}" >> JSONSD '
# {a:1}
# {b:2}
```

---

JSON can be split across multiple stream elements at places where line breaks are allowed.

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

## `CSV` Convert Array to CSV String

`CSV(["separator": separator: STRING; ]["quote": quote: STRING; ]value: ARRAY<STRING> | STREAM<ARRAY<STRING>>): STRING | STREAM<STRING>`

Encodes an array of strings or a stream thereof into a CSV row string or a stream thereof.

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

The separator character can be specified with the `separator` parameter.

The default is comma `,`.

```shell
$ xa ' [1;2;3] >> CSV[separator: "|"] '
# 1|2|3
```

---

Cells that contain leading or trailing half-width spaces or tab characters, or that contain the separator character, quote character, or newline character, are expressed by enclosing them in quotes.

The quote character can be specified with the `quote` parameter.

The default is double quote `"`.

```shell
$ xa ' [1;" 2 ";3] >> CSV '
# 1," 2 ",3

$ xa ' [1;" 2 ";3] >> CSV[quote: "|"] '
# 1,| 2 |,3
```

Cells containing the quote character are expressed by writing the quote character twice consecutively.

```shell
$ xa ' [1;" \"2\" ",3] >> CSV '
# 1," ""2"" ",3
```

## `CSVD` Convert CSV String to Array

`CSVD(["separator": separator: STRING; ]["quote": quote: STRING; ]csv: STRING | STREAM<STRING>): ARRAY<STRING> | STREAM<ARRAY<STRING>>`

Decodes a CSV row string or a stream thereof into an array of strings or a stream thereof.

Many specifications are common with `CSV`.

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

If a section separated by the separator character is empty, an empty string is returned.

```shell
$ xa ' ",1,,3," >> CSVD >> JSON '
# ["","1","","3",""]
```

---

Half-width spaces and tab characters at the beginning/end of lines or before/after separator characters are ignored.

```shell
$ xa ' " , 1 , , 3 , " >> CSVD >> JSON '
# ["","1","","3",""]
```
