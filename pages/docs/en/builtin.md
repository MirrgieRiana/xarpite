---
title: "Built-in Object Class Constants"
---

Built-in constants are constants that come with language features and can be used without defining them in code.

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

| Constant    | Meaning                                |
|-------------|----------------------------------------|
| `NULL` `N`  | NULL value                             |
| `TRUE` `T`  | True                                   |
| `FALSE` `F` | False                                  |
| `EMPTY` `E` | Empty stream                           |
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

# Mathematical Functions

## `ABS` Get Absolute Value

`ABS(value: NUMBER): NUMBER`

Returns the absolute value of the first argument.

```shell
$ xa 'ABS(-10)'
# 10
```

## `FLOOR` Round Down

`FLOOR(number: NUMBER): INTEGER`

Rounds the first argument down to the nearest integer.

```shell
$ xa 'FLOOR(1.5)'
# 1
```

## `DIV` Integer Division

`DIV(x: NUMBER; y: NUMBER): NUMBER`

Divides `x` by `y` and returns the integer part of the result.

```shell
$ xa 'DIV(10; 3)'
# 3
```

## `SQRT` Get Square Root

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

When called with no arguments, returns a decimal number from 0 (inclusive) to 1 (exclusive).

When called with 1 argument, returns an integer from 0 (inclusive) to `until` (exclusive).

When called with 2 arguments, returns an integer from `from` (inclusive) to `until` (exclusive).

# Stream Functions

## `REVERSE` Reverse Stream

`REVERSE(stream: STREAM<VALUE>): STREAM<VALUE>`

Returns a stream with the elements of the first argument in reverse order.

```shell
$ xa 'REVERSE(1 .. 3)'
# 3
# 2
# 1
```


