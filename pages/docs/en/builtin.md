---
title: "Built-in Object Class Constants"
---

# Built-in Constants

Built-in constants are constants that come with the language features and can be used without defining them in code.

Built-in constants are defined using only uppercase letters and `_`.

Built-in functions are also provided through the same mechanism as built-in constants.

## Built-in Object Class Constants

You can reference classes of various built-in objects.

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

## Constants

Various constants representing special values.

| Constant    | Meaning                         |
|-------------|---------------------------------|
| `NULL` `N`  | NULL value                      |
| `TRUE` `T`  | True                            |
| `FALSE` `F` | False                           |
| `EMPTY` `E` | Empty stream                    |
| `LOOP`      | Stream that generates NULL infinitely |

---

Mathematical built-in constants.

| Constant    | Meaning            |
|-------------|--------------------|
| `MATH.PI`   | Pi                 |
| `MATH.E`    | Euler's number     |

---

String-related built-in constants.

| Constant | Meaning |
|----------|---------|
| `LT`     | `<`     |
| `GT`     | `>`     |
| `AMP`    | `&`     |
| `APOS`   | `'`     |
| `QUOT`   | `"`     |

## Mathematical Functions

### `ABS` Get Absolute Value

`ABS(value: NUMBER): NUMBER`

Returns the absolute value of the first argument.

```shell
$ xa 'ABS(-10)'
# 10
```

### `FLOOR` Round Down to Integer

`FLOOR(number: NUMBER): INTEGER`

Rounds the first argument to the nearest integer towards negative infinity.

```shell
$ xa 'FLOOR(1.5)'
# 1
```

### `DIV` Integer Division

`DIV(x: NUMBER; y: NUMBER): NUMBER`

Divides `x` by `y` and returns the integer part of the result.

```shell
$ xa 'DIV(10; 3)'
# 3
```

### `SQRT` Get Square Root

`SQRT(number: NUMBER): NUMBER`

Returns the square root of the first argument.

```shell
$ xa 'SQRT(100)'
# 10.000
```

### `SIN` Sine

`SIN(radian: NUMBER): NUMBER`

Returns the sine of the argument in radians.

```shell
$ xa 'SIN(MATH.PI / 2)'
# 1.000
```

### `COS` Cosine

`COS(radian: NUMBER): NUMBER`

Returns the cosine of the argument in radians.

```shell
$ xa 'COS(0)'
# 1.000
```

### `TAN` Tangent

`TAN(radian: NUMBER): NUMBER`

Returns the tangent of the argument in radians.

```shell
$ xa 'TAN(MATH.PI / 4)'
# 1.000
```

### `POW` Power

`POW(base: NUMBER; exponent: NUMBER): NUMBER`

Returns `base` raised to the power of `exponent`.

```shell
$ xa 'POW(2; 3)'
# 8.0
```

### `EXP` Exponential Function

`EXP(x: NUMBER): NUMBER`

Returns e (Euler's number) raised to the power of `x`.

```shell
$ xa 'EXP(1)'
# 2.718

$ xa 'EXP(2)'
# 7.389
```

### `LOG` Natural Logarithm

`LOG(x: NUMBER): NUMBER`

Returns the natural logarithm (base e) of `x`.

```shell
$ xa 'LOG(MATH.E)'
# 1.000
```

### `RAND` Get Random Number

`RAND(): NUMBER`

Returns a random number from 0 (inclusive) to 1 (exclusive).

Each time it is called, it returns a different random number.

```shell
$ xa 'RAND()'
# (random value between 0 and 1)
```

## Stream Functions

### `REVERSE` Reverse Stream

`REVERSE(stream: STREAM<T>): STREAM<T>`

Returns a stream with elements in reverse order.

```shell
$ xa '1 .. 3 >> REVERSE'
# 3
# 2
# 1
```

### `SHUFFLE` Shuffle Stream

`SHUFFLE(stream: STREAM<T>): STREAM<T>`

Returns a stream with elements in random order.

### `DISTINCT` Remove Duplicate Elements from Stream

`DISTINCT(stream: STREAM<T>): STREAM<T>`

`DISTINCT(stream: STREAM<T>; key_getter: (T) -> K): STREAM<T>`

Removes duplicate elements from the stream.

### Duplicate Detection by Element Itself

If no key getter function is provided, duplicate detection is performed based on the elements themselves.

```shell
$ xa '1, 2, 3, 2, 1, 0 >> DISTINCT'
# 1
# 2
# 3
# 0
```

### Duplicate Detection by Key Getter Function

If a key getter function is provided, duplicate detection is performed based on the key returned by that function.

```shell
$ xa '13, 21, 24, 14, 11 >> DISTINCT(_ % 10)'
# 13
# 21
# 24
```

### `JOIN` Concatenate Stream to String

`JOIN(stream: STREAM<STRING>): STRING`

`JOIN(stream: STREAM<STRING>; separator: STRING): STRING`

Concatenates stream elements into a single string.

If no separator is provided, elements are concatenated without any separator.

```shell
$ xa '"a", "b", "c" >> JOIN("|")'
# a|b|c

$ xa '"a", "b", "c" >> JOIN(",")'
# a,b,c

$ xa '
  "a", "b", "c"
    >> JOIN(separator: "|"; prefix: "10"; suffix: "0")
'
# 10b0c

$ xa '10, 20, 30 >> JOIN("|")'
# 10|20|30
```

### `SPLIT` Split String to Stream

`SPLIT(string: STRING; separator: STRING): STREAM<STRING>`

`SPLIT(string: STRING; separator: REGEX): STREAM<STRING>`

Splits the string by the separator and returns a stream.

### Split by String

```shell
$ xa '"a|b|c" >> SPLIT("|")'
# a
# b
# c

$ xa '"a,,b,,,c" >> SPLIT(",")'
# a
# 
# b
# 
# 
# c
```

### Split by Regular Expression

```shell
$ xa '"1.0 2.0 3.0" >> SPLIT(/\s+/)'
# 1.0
# 2.0
# 3.0
```

### `KEYS` Get Stream of Object Keys

`KEYS(object: OBJECT): STREAM<STRING>`

Returns a stream of the object's keys.

```shell
$ xa '{a: 1; b: 2; c: 3} >> KEYS'
# a
# b
# c
```

### `VALUES` Get Stream of Object Values

`VALUES(object: OBJECT): STREAM<T>`

Returns a stream of the object's values.

```shell
$ xa '{a: 1; b: 2; c: 3} >> VALUES'
# 1
# 2
# 3
```

### `SUM` Sum of Stream Elements

`SUM(stream: STREAM<NUMBER>): NUMBER`

Returns the sum of stream elements.

```shell
$ xa '1 .. 3 >> SUM'
# 6
```

### `MIN` Minimum Value of Stream

`MIN(stream: STREAM<T>): T | NULL`

Returns the minimum value of the stream.

Returns `NULL` if the stream is empty.

```shell
$ xa '1, 5, 3, 9 >> MIN'
# 1

$ xa 'EMPTY >> MIN'
# NULL
```

### `MAX` Maximum Value of Stream

`MAX(stream: STREAM<T>): T | NULL`

Returns the maximum value of the stream.

Returns `NULL` if the stream is empty.

```shell
$ xa '1, 5, 3, 9 >> MAX'
# 9

$ xa 'EMPTY >> MAX'
# NULL
```

### `COUNT` Count Stream Elements

`COUNT(stream: STREAM<T>): INTEGER`

Returns the number of stream elements.

```shell
$ xa '1 .. 3 >> COUNT'
# 3

$ xa 'NULL >> COUNT'
# 1

$ xa 'EMPTY >> COUNT'
# 0
```

### `FIRST` Get First Element of Stream

`FIRST(stream: STREAM<T>): T | NULL`

Returns the first element of the stream.

Returns `NULL` if the stream is empty.

```shell
$ xa '4, 5, 6 >> FIRST'
# 4

$ xa '4 >> FIRST'
# 4

$ xa 'EMPTY >> FIRST'
# NULL
```

### `LAST` Get Last Element of Stream

`LAST(stream: STREAM<T>): T | NULL`

Returns the last element of the stream.

Returns `NULL` if the stream is empty.

```shell
$ xa '4, 5, 6 >> LAST'
# 6

$ xa '6 >> LAST'
# 6

$ xa 'EMPTY >> LAST'
# NULL
```

### `SINGLE` Get Single Element of Stream

`SINGLE(stream: STREAM<T>): T`

Returns the only element if the stream has exactly one element.

Throws an error if the stream has zero or more than one elements.

```shell
$ xa '1, 2 >> SINGLE'
# Error

$ xa '6 >> SINGLE'
# 6

$ xa 'EMPTY >> SINGLE'
# Error
```

### `SORT` Sort Stream in Ascending Order

`SORT(stream: STREAM<T>): STREAM<T>`

`SORT(stream: STREAM<T>; comparator: (T; T) -> NUMBER): STREAM<T>`

`SORT(stream: STREAM<T>; key_getter: (T) -> K): STREAM<T>`

Sorts the stream in ascending order.

### Sort by Natural Ordering

```shell
$ xa '5, 1, 9, 3, 5, 2, 4, 1, 6, 3, 5 >> SORT'
# 1 1 2 3 3 4 5 5 5 6 9
```

### Sort by Comparator Function

```shell
$ xa '1, 2, 3, 4, 5, 6, 7, 8, 9 >> SORT((a; b) -> a % 3 - b % 3)'
# 3 6 9 1 4 7 2 5 8
```

### Sort by Key Getter Function

```shell
$ xa '1, 2, 3, 4, 5, 6, 7, 8, 9 >> SORT(_ % 3)'
# 3 6 9 1 4 7 2 5 8
```

### `SORTR` Sort Stream in Descending Order

`SORTR(stream: STREAM<T>): STREAM<T>`

`SORTR(stream: STREAM<T>; comparator: (T; T) -> NUMBER): STREAM<T>`

`SORTR(stream: STREAM<T>; key_getter: (T) -> K): STREAM<T>`

Sorts the stream in descending order.

Other specifications are the same as `SORT`.

```shell
$ xa '5, 1, 9, 3, 5, 2, 4, 1, 6, 3, 5 >> SORTR'
# 9 6 5 5 5 4 3 3 2 1 1
```

### `GROUP` Group Stream by Key

`GROUP(stream: STREAM<T>; key_getter: (T) -> K): STREAM<[K; ARRAY<T>]>`

Groups stream elements by key.

Each element of the resulting stream is a pair of key and array of elements with that key.

```shell
$ xa '
  [
    {category: "fruit"; value: "apple"}
    {category: "fruit"; value: "banana"}
    {category: "animal"; value: "cat"}
  ]()
    >> GROUP(_.category)
'
# [fruit;[{category:fruit;value:apple};{category:fruit;value:banana}]]
# [animal;[{category:animal;value:cat}]]
```

---

You can use the second element of each grouped element.

```shell
$ xa '
  [
    {category: "fruit"; value: "apple"}
    {category: "fruit"; value: "banana"}
    {category: "animal"; value: "cat"}
  ]()
    >> GROUP(_.category)
    | _[1]()
    | _.value
'
# apple
# banana
```

### `CHUNK` Split Stream into Fixed-Size Arrays

`CHUNK(stream: STREAM<T>; size: INTEGER): STREAM<ARRAY<T>>`

Splits the stream into arrays of the specified size.

```shell
$ xa '1 .. 5 >> CHUNK(2)'
# [1;2]
# [3;4]
# [5]
```

### `TAKE` Get First Elements of Stream

`TAKE(stream: STREAM<T>; count: INTEGER): STREAM<T>`

Returns a stream of the first `count` elements.

```shell
$ xa '1 .. 3 >> TAKE(2)'
# 1
# 2
```

### `TAKER` Get Last Elements of Stream

`TAKER(stream: STREAM<T>; count: INTEGER): STREAM<T>`

Returns a stream of the last `count` elements.

```shell
$ xa '1 .. 3 >> TAKER(2)'
# 2
# 3
```

### `DROP` Drop First Elements of Stream

`DROP(stream: STREAM<T>; count: INTEGER): STREAM<T>`

Returns a stream with the first `count` elements removed.

```shell
$ xa '1 .. 3 >> DROP(2)'
# 3
```

### `DROPR` Drop Last Elements of Stream

`DROPR(stream: STREAM<T>; count: INTEGER): STREAM<T>`

Returns a stream with the last `count` elements removed.

```shell
$ xa '1 .. 3 >> DROPR(2)'
# 1
```

### `FILTER` Filter Stream by Condition

`FILTER(stream: STREAM<T>; predicate: (T) -> BOOLEAN): STREAM<T>`

Returns a stream of elements that satisfy the condition.

```shell
$ xa '1 .. 4 >> FILTER(_ % 2 == 0)'
# 2
# 4
```

### `REDUCE` Accumulate Stream Elements

`REDUCE(stream: STREAM<T>; accumulator: (ACC; T) -> ACC): ACC`

`REDUCE(stream: STREAM<T>; initial: ACC; accumulator: (ACC; T) -> ACC): ACC`

Accumulates stream elements using the accumulator function.

```shell
$ xa '1 .. 4 >> REDUCE(0; (a; b) -> a + b)'
# 10

$ xa '1 .. 4 >> REDUCE((a; b) -> a + b)'
# 10
```

---

If no initial value is provided, the first element is used as the initial value.

If the stream is empty and no initial value is provided, an error is thrown.

```shell
$ xa '1 >> REDUCE((a; b) -> a + b)'
# 1

$ xa 'EMPTY >> REDUCE(0; (a; b) -> a + b)'
# 0

$ xa 'EMPTY >> REDUCE((a; b) -> a + b)'
# NULL
```

### `TO_STRING` Convert to String

`TO_STRING(value: T): STRING`

Converts the value to a string.

This is equivalent to the `&` operator.

```shell
$ xa 'TO_STRING(123)'
# 123

$ xa '&123'
# 123
```

### `TO_NUMBER` Convert to Number

`TO_NUMBER(value: T): NUMBER`

Converts the value to a number.

This is equivalent to the `+` operator.

```shell
$ xa 'TO_NUMBER("123")'
# 123

$ xa '1 .. 3 >> TO_NUMBER'
# 6

$ xa 'TO_NUMBER(FALSE)'
# 0
```

### `TO_BOOLEAN` Convert to Boolean

`TO_BOOLEAN(value: T): BOOLEAN`

Converts the value to a boolean.

This is equivalent to the `?` operator.

```shell
$ xa 'TO_BOOLEAN(0)'
# FALSE

$ xa 'TO_BOOLEAN(1)'
# TRUE

$ xa 'TO_BOOLEAN("")'
# TRUE
```

### `TO_ARRAY` Convert Stream to Array

`TO_ARRAY(stream: STREAM<T>): ARRAY<T>`

Converts the stream to an array.

```shell
$ xa '1 .. 3 >> TO_ARRAY'
# [1;2;3]
```

### `TO_OBJECT` Convert Entry Stream to Object

`TO_OBJECT(stream: STREAM<[STRING; T]>): OBJECT<T>`

Converts a stream of entries to an object.

```shell
$ xa '[["a", 1], ["b", 2], ["c", 3]]() >> TO_OBJECT'
# {a:1;b:2;c:3}
```
