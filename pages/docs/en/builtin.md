---
title: "Built-in Object Class Constants"
---

Built-in constants are constants provided by the language that can be used without being defined in code.

Built-in constants are defined using only uppercase letters and `_`.

Built-in functions are also provided through the same mechanism as built-in constants.

<!-- toc -->

# Built-in Object Class Constants

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

# Constants

Various constants representing special values.

| Constant      | Meaning                               |
|---------------|---------------------------------------|
| `NULL` `N`    | NULL value                            |
| `TRUE` `T`    | True                                  |
| `FALSE` `F`   | False                                 |
| `EMPTY` `E`   | Empty stream                          |
| `LOOP`        | Stream that infinitely generates NULL |

---

Mathematical built-in constants.

| Constant    | Meaning          |
|-------------|------------------|
| `MATH.PI`   | Pi               |
| `MATH.E`    | Napier's number  |

---

String-related built-in constants.

| Constant | Meaning                      |
|----------|------------------------------|
| `LT`     | `<`                          |
| `GT`     | `>`                          |
| `AMP`    | `&`                          |
| `APOS`   | `'`                          |
| `QUOT`   | `"`                          |
| `BOM`    | `"\uFEFF"` (Byte Order Mark) |

# Mathematical Functions

## `ABS` Get Absolute Value

`ABS(value: NUMBER): NUMBER`

Returns the absolute value of the first argument.

```shell
$ xa 'ABS(-10)'
# 10
```

## `FLOOR` Round Down to Integer

`FLOOR(number: NUMBER): INTEGER`

Rounds the first argument down to the nearest smaller integer.

```shell
$ xa 'FLOOR(1.5)'
# 1
```

## `DIV` Integer Part of Division

`DIV(x: NUMBER; y: NUMBER): NUMBER`

Divides `x` by `y` and returns the integer part of the result.

```shell
$ xa 'DIV(10; 3)'
# 3
```

## `SQRT` Get Square Root

`SQRT(number: NUMBER): NUMBER`

Returns the positive square root of the first argument.

`SQRT(number: NUMBER): NUMBER`

Returns the positive square root of the first argument.

```shell
$ xa '"$%.3f(  SQRT(100.0)  )"'
# 10.000
```

## `SIN` Sine

`SIN(number: NUMBER): NUMBER`

Interprets the first argument as radians and returns its sine.

```shell
$ xa '"$%.3f(  SIN(PI / 2)  )"'
# 1.000
```

## `COS` Cosine

`COS(number: NUMBER): NUMBER`

Interprets the first argument as radians and returns its cosine.

```shell
$ xa '"$%.3f(  COS(0)  )"'
# 1.000
```

## `TAN` Tangent

`TAN(number: NUMBER): NUMBER`

Interprets the first argument as radians and returns its tangent.

```shell
$ xa '"$%.3f(  TAN(PI / 4)  )"'
# 1.000
```

## `POW` Power

`POW(base: NUMBER; exponent: NUMBER): NUMBER`

Returns the result of raising the first argument to the power of the second argument.

```shell
$ xa 'POW(2; 3)'
# 8.0
```

## `EXP` Exponential Function

`EXP(number: NUMBER): NUMBER`

Returns the exponential function (base e) of the first argument.

```shell
$ xa '"$%.3f(  EXP(1)  )"'
# 2.718

$ xa '"$%.3f(  EXP(2)  )"'
# 7.389
```

## `LOG` Natural Logarithm

`LOG(number: NUMBER): NUMBER`

Returns the natural logarithm (base e) of the first argument.

```shell
$ xa '"$%.3f(  LOG(MATH.E)  )"'
# 1.000
```

## `RAND` Get Random Number

`RAND(): DOUBLE`

`RAND([from: NUMBER; ]until: NUMBER): INT`

When called without arguments, returns a decimal between 0 (inclusive) and 1 (exclusive).

When called with 1 argument, returns an integer between 0 (inclusive) and `until` (exclusive).

When called with 2 arguments, returns an integer between `from` (inclusive) and `until` (exclusive).

# Stream Functions

## `REVERSE` Reverse Stream Order

`REVERSE(stream: STREAM<VALUE>): STREAM<VALUE>`

Returns a stream with the elements of the first argument stream in reverse order.

```shell
$ xa 'REVERSE(1 .. 3)'
# 3
# 2
# 1
```

## `SHUFFLE` Randomize Stream Order

`<T> SHUFFLE(stream: T,): T,`

Returns a stream with the elements of `stream` randomly rearranged.

## `DISTINCT` Remove Duplicate Elements from Stream

Returns a stream with duplicate elements removed.

`DISTINCT` can be called in 2 ways.

### Duplicate Determination by Elements Themselves

`DISTINCT(stream: STREAM<VALUE>): STREAM<VALUE>`

When called with 1 argument, it uses the stream's elements themselves to determine duplicates and returns a stream with duplicates removed.

```shell
$ xa '1, 2, 3, 3, 3, 2, 1, 0 >> DISTINCT'
# 1
# 2
# 3
# 0
```

### Duplicate Determination by Key Getter Function

`DISTINCT(by: keyGetter: VALUE -> VALUE; stream: STREAM<VALUE>): STREAM<VALUE>`

When the first argument is a `by` parameter, it applies the `keyGetter` function to each element of the second argument and determines duplicates based on the result.

The following example determines duplicates by the remainder when each element is divided by 10.

```shell
$ xa '13, 21, 24, 33, 31, 34 >> DISTINCT[by: x -> x % 10]'
# 13
# 21
# 24
```

## `JOIN` Concatenate Stream into String

`JOIN([separator: STRING; ]stream: STREAM<STRING>): STRING`

Returns a string with each element of the second argument stream concatenated with the first argument separator. If the first argument is omitted, `,` is used.

```shell
$ xa 'JOIN("|"; "a", "b", "c")'
# a|b|c

$ xa 'JOIN("a", "b", "c")'
# a,b,c
```

---

The separator and each element of the stream are stringified.

```shell
$ xa 'JOIN(0; 1, "b", {`&_`: _ -> "c"}{})'
# 10b0c
```

---

When used with partial application, it becomes easier to incorporate into pipe chains.

```shell
$ xa '1 .. 3 | _ * 10 >> JOIN["|"]'
# 10|20|30
```

## `SPLIT` Split String into Stream

`SPLIT([separator: STRING; ]string: STRING): STREAM<STRING>`

Splits the second argument string by the first argument separator and returns each part as a stream. If the first argument is omitted, `,` is used.

Note that it returns a stream rather than an array for compatibility with the pipe operator.

`SPLIT` conceptually performs the inverse operation of `JOIN`.

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

Separator and target string are stringified and evaluated.

---

By using with partial application, it becomes easier to incorporate into pipe chains.

```shell
$ xa '"10|20|30" >> SPLIT["|"] | +_ / 10'
# 1.0
# 2.0
# 3.0
```

## `KEYS` Get Stream of Object Keys

`KEYS(object: OBJECT): STREAM<STRING>`

Returns a stream of keys of the first argument object.

```shell
$ xa 'KEYS({a: 1; b: 2; c: 3})'
# a
# b
# c
```

## `VALUES` Get Stream of Object Values

`VALUES(object: OBJECT): STREAM<VALUE>`

Returns a stream of values of the first argument object.

```shell
$ xa 'VALUES({a: 1; b: 2; c: 3})'
# 1
# 2
# 3
```

## `INVERT` Returns Object Mapping Values to Keys

`INVERT(object: OBJECT<VALUE>): OBJECT<STRING>`

Returns a new object where the values of `object` map to their corresponding keys.

```shell
$ xa 'INVERT({a: "apple"; b: "banana"; c: "cherry"})'
# {apple:a;banana:b;cherry:c}
```

---

Values are stringified when treated as keys.

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

If values are duplicated, one of the keys for that value will be mapped.

```shell
$ xa '
  object   := {a: "apple"; b: "banana"; c: "apple"}
  inverted := INVERT(object)
  inverted.apple >> object
'
# apple
```

Which key is mapped is undefined.

## `SUM` Sum of Stream Elements

`SUM(numbers: STREAM<NUMBER>): NUMBER`

Returns the value obtained by adding each element of the first argument stream.

```shell
$ xa 'SUM(1 .. 3)'
# 6
```

## `MIN` Minimum Value of Stream

`MIN(numbers: STREAM<NUMBER>): NUMBER`

Returns the minimum value of the first argument stream.

If the stream is empty, returns `NULL`.

```shell
$ xa 'MIN(3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5)'
# 1

$ xa 'MIN(,)'
# NULL
```

## `MAX` Maximum Value of Stream

`MAX(numbers: STREAM<NUMBER>): NUMBER`

Returns the maximum value of the first argument stream.

If the stream is empty, returns `NULL`.

```shell
$ xa 'MAX(3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5)'
# 9

$ xa 'MAX(,)'
# NULL
```

## `COUNT` Number of Stream Elements

`COUNT(stream: STREAM<VALUE>): INT`

Returns the number of elements in the first argument stream.

For non-streams, returns 1.

```shell
$ xa 'COUNT(1, 2, 3)'
# 3

$ xa 'COUNT(1)'
# 1

$ xa 'COUNT(,)'
# 0
```

## `FIRST` Get First Element of Stream

`FIRST(stream: STREAM<VALUE>): VALUE`

Returns the first element of the first argument stream. If the stream is empty, returns `NULL`.

If a non-stream is passed, returns that value as-is.

```shell
$ xa 'FIRST(4, 5, 6)'
# 4

$ xa 'FIRST(4)'
# 4

$ xa 'FIRST(,)'
# NULL
```

## `LAST` Get Last Element of Stream

`LAST(stream: STREAM<VALUE>): VALUE`

Returns the last element of the first argument stream. If the stream is empty, returns `NULL`.

If a non-stream is passed, returns that value as-is.

```shell
$ xa 'LAST(4, 5, 6)'
# 6

$ xa 'LAST(6)'
# 6

$ xa 'LAST(,)'
# NULL
```

## `SINGLE` Get Only Element of Stream

`<T> SINGLE(stream: STREAM<T>): T`

Returns the only element of the first argument stream. Throws an exception if the stream is empty or has multiple elements.

If a non-stream is passed, returns that value as-is.

```shell
$ xa 'SINGLE(4, 5, 6) !? "Error"'
# Error

$ xa 'SINGLE(6)'
# 6

$ xa 'SINGLE(,) !? "Error"'
# Error
```

## `SORT` Sort Stream in Ascending Order

Sorts a stream in ascending order.

`SORT` has 3 ways of calling.

### Sort by Natural Ordering

`SORT(stream: STREAM<VALUE>): STREAM<VALUE>`

When called with 1 argument, returns a stream with the elements of that stream sorted in ascending order.

```shell
$ xa '3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5 >> SORT >> JOIN[" "]'
# 1 1 2 3 3 4 5 5 5 6 9
```

### Sort by Comparison Function

`SORT(comparator: VALUE, VALUE -> INT; stream: STREAM<VALUE>): STREAM<VALUE>`

When called with 2 arguments, sorts the second argument stream using the first argument comparison function.

The following example sorts by the remainder when dividing each element by 3.

```shell
$ xa '1 .. 9 >> SORT[a, b -> a % 3 <=> b % 3] >> JOIN[" "]'
# 3 6 9 1 4 7 2 5 8
```

### Sort by Key Getter Function

`SORT(by: key_getter: VALUE -> VALUE; stream: STREAM<VALUE>): STREAM<VALUE>`

If the first argument is a `by` parameter, applies the `key_getter` function to each element of the second argument, compares the results, and sorts.

The following example sorts by the remainder when dividing each element by 3.

```shell
$ xa '1 .. 9 >> SORT[by: x -> x % 3] >> JOIN[" "]'
# 3 6 9 1 4 7 2 5 8
```

## `SORTR` Sort Stream in Descending Order

`SORTR(stream: STREAM<VALUE>): STREAM<VALUE>`

`SORTR(comparator: VALUE, VALUE -> INT; stream: STREAM<VALUE>): STREAM<VALUE>`

`SORTR(by: key_getter: VALUE -> VALUE; stream: STREAM<VALUE>): STREAM<VALUE>`

Sorts a stream in descending order.

Except that the sort is in descending order, it is the same as the `SORT` function.

```shell
$ xa '3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5 >> SORTR >> JOIN[" "]'
# 9 6 5 5 5 4 3 3 2 1 1
```

## `GROUP` Group Stream by Key

`<T, K> GROUP(by = key_getter: T -> K; stream: T,): [K; [T,]],`

Applies `key_getter` to each element of `stream`, groups values with the same key into entry arrays, and returns them as a stream.

Entry arrays are in the order in which that key first appeared.

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

If the keys can be stringified, they can be easily grouped into objects by the `TO_OBJECT` function.

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

## `CHUNK` Split Stream into Fixed-Size Arrays

`CHUNK(size: NUMBER; stream: STREAM<VALUE>): STREAM<ARRAY<VALUE>>`

Returns a stream of arrays grouping elements of the second argument stream by the size specified in the first argument.

```shell
$ xa '1, 2, 3, 4, 5 >> CHUNK[2]'
# [1;2]
# [3;4]
# [5]
```

## `TAKE` Get Beginning of Stream

`TAKE(count: INT; stream: STREAM<VALUE>): STREAM<VALUE>`

Returns a stream with the first `count` elements extracted from the second argument stream.

```shell
$ xa '1, 2, 3 >> TAKE[2]'
# 1
# 2
```

## `TAKER` Get End of Stream

`TAKER(count: INT; stream: STREAM<VALUE>): STREAM<VALUE>`

Returns a stream with the last `count` elements extracted from the second argument stream.

```shell
$ xa '1, 2, 3 >> TAKER[2]'
# 2
# 3
```

## `DROP` Discard Beginning of Stream

`DROP(count: INT; stream: STREAM<VALUE>): STREAM<VALUE>`

Returns a stream with the first `count` elements removed from the second argument stream.

```shell
$ xa '1, 2, 3 >> DROP[2]'
# 3
```

## `DROPR` Discard End of Stream

`DROPR(count: INT; stream: STREAM<VALUE>): STREAM<VALUE>`

Returns a stream with the last `count` elements removed from the second argument stream.

```shell
$ xa '1, 2, 3 >> DROPR[2]'
# 1
```

## `FILTER` Filter Stream by Condition

`FILTER(predicate: VALUE -> BOOLEAN; stream: STREAM<VALUE>): STREAM<VALUE>`

Applies `predicate` to each element of the second argument stream and returns a stream containing only elements where the result is true.

```shell
$ xa '1, 2, 3, 4, 5 >> FILTER [ x => x % 2 == 0 ]'
# 2
# 4
```

## `GREP` Filter Stream by Condition

An alias for `FILTER`.

## `REDUCE` Accumulate Stream Elements

`REDUCE(function: VALUE, VALUE -> VALUE; stream: STREAM<VALUE>): VALUE`

`REDUCE` is a function that accumulates adjacent elements of `stream` by `function` and aggregates them into a single value.

`REDUCE` is often used as a function that processes streams by partial application.

```shell
$ xa 'REDUCE(a, b -> a + b; 1 .. 4)'
# 10

$ xa '1 .. 4 >> REDUCE[a, b -> a + b]'
# 10
```

This example applies `a + b` to all adjacent values from 1 to 4.

In other words, it is the same as `1 + 2 + 3 + 4`.

---

If the stream has only one element or is not a stream, returns that element as-is.

```shell
$ xa '1 >> REDUCE[a, b -> a + b]'
# 1
```

---

If the stream is empty, returns `NULL`.

```shell
$ xa ', >> REDUCE[a, b -> a + b]'
# NULL
```

## `TO_STRING` Stringification

`TO_STRING(value: VALUE): STRING`

Converts a value to a string.

Has the same behavior as the `&value` operator.

```shell
$ xa 'TO_STRING(123)'
# 123

$ xa '1, 2, 3 >> TO_STRING'
# 123
```

## `TO_NUMBER` Numericalization

`TO_NUMBER(value: VALUE): NUMBER`

Converts a value to a number.

Has the same behavior as the `+value` operator.

```shell
$ xa 'TO_NUMBER("123")'
# 123

$ xa '1, 2, 3 >> TO_NUMBER'
# 6

$ xa 'TO_NUMBER(NULL)'
# 0
```

## `TO_BOOLEAN` Booleanization

`TO_BOOLEAN(value: VALUE): BOOLEAN`

Converts a value to a boolean.

Has the same behavior as the `?value` operator.

```shell
$ xa 'TO_BOOLEAN("")'
# FALSE

$ xa 'TO_BOOLEAN("a")'
# TRUE

$ xa 'FALSE, TRUE, FALSE >> TO_BOOLEAN'
# TRUE
```

## `TO_ARRAY` Convert Stream to Array

`ARRAY(stream: STREAM<VALUE>): ARRAY<VALUE>`

Converts each element of the first argument stream to an array.

```shell
$ xa 'TO_ARRAY(1 .. 3)'
# [1;2;3]
```

## `TO_OBJECT` Convert Stream of Entries to Object

`OBJECT(stream: STREAM<ARRAY<STRING; VALUE>>): OBJECT`

Converts each element of the first argument stream into an object as entries.

```shell
$ xa 'TO_OBJECT(("a": 1), ("b": 2), ("c": 3))'
# {a:1;b:2;c:3}
```

## `::LET` / `LET` Pass Value to Block and Return Block's Result

`<I, O> I::LET(block: I -> O): O`

An extension function that passes the receiver's value to `block`, executes it, and returns the `block`'s return value.

Useful for transforming values in the middle of method chains.

```shell
$ xa '"apple"::LET ( s => s & "banana" )::UC()'
# APPLEBANANA
```

---

`::LET` can also be used in a chain.

```shell
$ xa '"apple"::LET ( s => s & "banana" )::LET ( s => s::UC() )'
# APPLEBANANA
```

### Usage with Streams

Due to the nature of streams applying all methods to each element, the `::LET` extension method cannot be used with streams.

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

Instead, use the `LET` function which can also handle streams.

While 2 characters longer, it works roughly the same way as `stream::(LET) ( s => ... )`.

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

## `::ALSO` / `ALSO` Pass Value to Block and Return Original Value

`<T> T::ALSO(block: T -> VALUE): T`

An extension function that passes the receiver's value to `block`, executes it, and returns the receiver's value.

Per invocation, the side effects of `block` occur exactly once.

Useful for using or modifying values in the middle of method chains.

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

Other characteristics are generally the same as `LET`.
