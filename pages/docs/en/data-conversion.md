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

For details about `BLOB_LIKE`, see [BLOB](./blob.md).

If `blobLike` is a stream, it converts the byte sequence obtained by concatenating all elements into a UTF-8 string.

Therefore, this function works correctly even when BLOB boundaries are split in the middle of UTF-8 characters.

This function does not normalize newline characters.

```shell
$ xa '
  BLOB.of([ 97,  98,  99]),
  BLOB.of([ 49,  50,  51]),
  BLOB.of([206, 177, 206]),
  BLOB.of([178, 206, 179]),
  >> UTF8D
'
# abc123αβγ

$ xa ' [97, 98, 99, 49, 50, 51, 206, 177, 206, 178, 206, 179] >> UTF8D '
# abc123αβγ
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
