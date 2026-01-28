---
title: "Data Conversion Functions"
---

<!-- toc -->

# Data Conversion Functions

## `BASE` Convert Integer to String in Arbitrary Radix

`BASE[radix: NUMBER](number: NUMBER): STRING`

Converts `number` to a string representation in base `radix`.

```shell
$ xa 'BASE(16; 248)'
# F8
```

Output is represented in uppercase.

---

The inverse transformation `BASED` function is also available.

```shell
$ xa 'BASED(16; "F8")'
# 248
```

---

Radix from 2 to 36 is supported.

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

This function is often used in combination with partial application and execution pipe.

```shell
$ xa '248 >> BASE[16] >> BASED[16]'
# 248
```

## `BASED` Convert String in Arbitrary Radix to Integer

`BASED[radix: NUMBER](string: STRING): NUMBER`

Converts the string `string` represented in base `radix` to an integer.

```shell
$ xa 'BASED(16; "F8")'
# 248
```

---

This function is the inverse transformation of the `BASE` function.

For basic usage, refer to the `BASE` function.

---

Input accepts both uppercase and lowercase characters.

```shell
$ xa '"FF" >> BASED[16]'
# 255

$ xa '"ff" >> BASED[16]'
# 255

$ xa '"fF" >> BASED[16]'
# 255
```

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

## `BASE64` Convert String to Base64 String

`BASE64(string: STRING): STRING`

Returns a string with `string` encoded in Base64 format.

```shell
$ xa ' "Hello, World!" >> BASE64 '
# SGVsbG8sIFdvcmxkIQ==
```

---

The output is wrapped at 76 characters.

```shell
$ xa ' "Hello, World!" * 10 >> BASE64 '
# SGVsbG8sIFdvcmxkIUhlbGxvLCBXb3JsZCFIZWxsbywgV29ybGQhSGVsbG8sIFdvcmxkIUhlbGxv
# LCBXb3JsZCFIZWxsbywgV29ybGQhSGVsbG8sIFdvcmxkIUhlbGxvLCBXb3JsZCFIZWxsbywgV29y
# bGQhSGVsbG8sIFdvcmxkIQ==
```

## `BASE64D` Convert Base64 String to String

`BASE64D(string: STRING): STRING`

Decodes the Base64-encoded string `string` and returns a string.

```shell
$ xa ' "SGVsbG8sIFdvcmxkIQ==" >> BASE64D '
# Hello, World!
```

---

Newline and whitespace characters are ignored.

```shell
$ xa ' "SGVsb \r G8sIF \n dvcmx \t kIQ==" >> BASE64D '
# Hello, World!
```

## `URL` Encode String to URL Format

`URL(string: STRING): STRING`

Encodes `string` in `application/x-www-form-urlencoded` format.

```shell
$ xa ' "Hello World" >> URL '
# Hello+World

$ xa ' "user_id=User1&password=p-a_s.s~w%o&r=d?" >> URL '
# user_id%3DUser1%26password%3Dp-a_s.s~w%25o%26r%3Dd%3F

$ xa ' "こんにちは" >> URL '
# %E3%81%93%E3%82%93%E3%81%AB%E3%81%A1%E3%81%AF
```

---

Each character is encoded as follows:

| Character                         | Encoding Method                         |
|-----------------------------------|-----------------------------------------|
| `A-Z` `a-z` `0-9` `-` `_` `.` `~` | The character itself                    |
| Space                             | `+`                                     |
| Other characters                  | UTF-8 byte sequence in `%XX` hex format |

## `URLD` Decode URL-Encoded String

`URLD(string: STRING): STRING`

Decodes `string` encoded in `application/x-www-form-urlencoded` format.

This function is the inverse of the `URL` function.

```shell
$ xa ' "Hello+World" >> URLD '
# Hello World

$ xa ' "user_id%3DUser1%26password%3Dp-a_s.s~w%25o%26r%3Dd%3F" >> URLD '
# user_id=User1&password=p-a_s.s~w%o&r=d?

$ xa ' "%E3%81%93%E3%82%93%E3%81%AB%E3%81%A1%E3%81%AF" >> URLD '
# こんにちは
```

## `PERCENT` Encode String with Percent Encoding

`PERCENT(string: STRING): STRING`

Encodes `string` with percent encoding.

Unlike the `URL` function, all non-alphanumeric characters including spaces are encoded in `%XX` format.

As a result, the encoded string contains no symbols other than `%`.

```shell
$ xa ' "Hello World" >> PERCENT '
# Hello%20World

$ xa ' "user_id=User1&password=p-a_s.s~w%o&r=d?" >> PERCENT '
# user%5Fid%3DUser1%26password%3Dp%2Da%5Fs%2Es%7Ew%25o%26r%3Dd%3F

$ xa ' "こんにちは" >> PERCENT '
# %E3%81%93%E3%82%93%E3%81%AB%E3%81%A1%E3%81%AF
```

---

Each character is encoded as follows:

| Character         | Encoding Method                         |
|-------------------|-----------------------------------------|
| `A-Z` `a-z` `0-9` | The character itself                    |
| Other characters  | UTF-8 byte sequence in `%XX` hex format |

## `PERCENTD` Decode Percent-Encoded String

`PERCENTD(string: STRING): STRING`

Decodes percent-encoded `string`.

This function is the inverse of the `PERCENT` function.

```shell
$ xa ' "Hello%20World" >> PERCENTD '
# Hello World

$ xa ' "user%5Fid%3DUser1%26password%3Dp%2Da%5Fs%2Es%7Ew%25o%26r%3Dd%3F" >> PERCENTD '
# user_id=User1&password=p-a_s.s~w%o&r=d?

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

## `JSONS` / `JSONL` Convert Stream of Values to Stream of JSON Strings

`JSONS(["indent": indent: STRING; ]values: STREAM<VALUE>): STREAM<STRING>`

`JSONL(["indent": indent: STRING; ]values: STREAM<VALUE>): STREAM<STRING>`

Returns a stream that converts each element of `values` to a JSON-formatted string.

`JSONL` is a synonym for `JSONS`.

```shell
$ xa '{a: 1}, {b: 2} >> JSONS'
# {"a":1}
# {"b":2}
```

## `JSONSD` / `JSONLD` Convert Stream of JSON Strings to Stream of Values

`JSONSD(jsons: STREAM<STRING>): STREAM<VALUE>`

`JSONLD(jsons: STREAM<STRING>): STREAM<VALUE>`

Returns a stream that converts each element of `jsons` to the corresponding value.

`JSONLD` is a synonym for `JSONSD`.

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
