---
title: Length
---

# Length

Array-like objects and numbers have a defined concept of length.

<!-- toc -->

## Definition of Length

The definition of length varies by value type.

| Type   | Length Definition                      |
|--------|----------------------------------------|
| String | Number of UTF-16 code units            |
| Array  | Number of elements                     |
| Object | Number of entries, ignoring parent     |
| Number | Absolute value                         |
| BLOB   | Number of bytes                        |
| Stream | Sum of lengths of each element         |

Length is defined as some numeric value, but is not necessarily an integer.

## Length Operator `$#array`

The length operator `$#array` gets the length of a value.

```shell
$ xa '$#"123"'
# 3

$ xa '$#-10'
# 10

$ xa '$#[1, 2, 3]'
# 3

$ xa '$#{a: 1; b: 2; c: 3}'
# 3

$ xa '$#BLOB.of([1, 2, 3])'
# 3

$ xa '$#("abc", "def", "ghi")'
# 9
```

## Overriding the Length Operator

Length retrieval is performed by calling the `$#_` method on the value.

You can change the behavior of length retrieval by overriding the `$#_` method.

```shell
$ xa '
  Object := {
    `$#_`: this -> this.length
  }
  object := Object{length: 123}
  $#object
'
# 123
```

Length can be a decimal value.

```shell
$ xa '
  Line := {
    `$#_`: this -> ((this.b.0 - this.a.0) ^ 2 + (this.b.1 - this.a.1) ^ 2) ^ 0.5
  }
  object := Line{
    a: [1, 2]
    b: [2, 3]
  }
  "$%.4f($#object)"
'
# 1.4142
```
