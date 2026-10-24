---
title: "Numbers"
---

# Numbers

Xarpite supports handling numeric values.

<!-- toc -->

## Overview

### Numeric Types

There are three numeric types: 32-bit integers `INT`, arbitrary-precision integers `BIG`, and 64-bit floating-point numbers `DOUBLE`.

### Distinction from Strings Representing Numbers

In Xarpite, numbers and strings representing numbers are strictly distinguished, affecting the behavior of operators and functions.

```shell
$ xa '123 + 1'
# 124

$ xa '"123" + 1'
# 1231
```

---

To convert a number to a string, use the stringification operator `&value`.

The reverse is the numeric conversion operator `+value`.

```shell
$ xa '&123 + 1'
# 1231

$ xa '+"123" + 1'
# 124
```

## Numeric Literals

### `123`: Integer Literal

A sequence of one or more digits becomes an integer literal.

```shell
$ xa '123'
# 123
```

---

Even digit sequences starting with 0 are always interpreted as decimal.

```shell
$ xa '00123'
# 123
```

### `H#123abc`: Hexadecimal Integer Literal

You can write hexadecimal numbers following `H#`.

The `H#` part must be uppercase, but the hexadecimal part is case-insensitive.

```shell
$ xa 'H#FF'
# 255
```

### `1.23`: Floating-Point Number Literal

You can write real numbers in the form "integer part `.` decimal part".

Representation and operations with real numbers involve rounding errors.

```shell
$ xa '1.5'
# 1.5
```

### Numeric Literal Separators

All numeric literals can include any number of `_` characters at any position except the beginning of the digit sequence.

The `_` characters are simply ignored.

This allows large numbers to be written more readably.

```shell
$ xa '1_000_000'
# 1000000

$ xa '1__2__3__'
# 123

$ xa 'H#FF_FF'
# 65535

$ xa '1_000.5'
# 1000.5

$ xa '1.5_0_0'
# 1.5
```

## Numeric Conversion

There are operators and functions to convert values to numbers.

The behavior of numeric conversion varies depending on the type of the value.

| Value Type | Numeric Conversion Result          |
|------------|-------------------------------------|
| NULL       | 0                                   |
| Number     | The number itself                   |
| Boolean    | 1 for TRUE, 0 for FALSE             |
| String     | Result of parsing as a number       |
| Stream     | Sum of all elements                 |

### `+value`: Numeric Conversion

The prefix `+` operator performs numeric conversion of a value.

The main purpose is to convert numeric data represented as strings into internal numeric values.

```shell
$ xa ' "+123"'
# +123

$ xa '+"+123"'
# 123
```

---

Numeric conversion references the `+_` method of the value.

You can change the numeric conversion process by overriding the `+_` method of an object.

```shell
$ xa '+{`+_`: this -> this.value * 2}{value: 100}'
# 200
```

### `-value`: Negative Numeric Conversion

The prefix `-` operator is similar to the numeric conversion operator, but negates the value.

This operator simultaneously performs "converting an arbitrary value to a number" and "negating the number".

```shell
$ xa '-"123"'
# -123

$ xa '-(100 + 20 + 3)'
# -123
```

### `TO_NUMBER`: Numeric Conversion

`TO_NUMBER(value: VALUE): NUMBER`

Converts a value to a number.

It behaves the same as the `+value` operator.

```shell
$ xa 'TO_NUMBER("123")'
# 123

$ xa '1, 2, 3 >> TO_NUMBER'
# 6

$ xa 'TO_NUMBER(NULL)'
# 0
```

## `BIG`: Arbitrary-Precision Integers

The arbitrary-precision integer type `BIG` can also handle integers too large to fit within the range of `INT`.

### Numeric Conversion of Integers Outside the INT Range

Converting a string representing an integer that does not fit within the range of `INT` produces a `BIG` value without losing precision.

```shell
$ xa '+"123456789012345678901234567890"'
# 123456789012345678901234567890
```

### `BIG.of`: Creating a BIG

`BIG.of(value: STRING | NUMBER): BIG`

Converts `value` to a `BIG` value.

```shell
$ xa 'BIG.of("123456789012345678901234567890")'
# 123456789012345678901234567890
```

### Arithmetic and Remainders on BIG

`BIG` values can be computed with the addition `+`, subtraction `-`, multiplication `*`, division `/`, and modulo `%` operators.

Addition, subtraction, multiplication, and modulo operations that mix `BIG` and `INT` produce a `BIG` value without losing precision.

When a `DOUBLE` is mixed in, and for division, the result is a `DOUBLE` value.

```shell
$ xa 'BIG.of("123456789012345678901234567890") + 1'
# 123456789012345678901234567891
```

## `DOUBLE`: Floating-Point Numbers

The floating-point type `DOUBLE` represents 64-bit floating-point numbers.

### `DOUBLE.of`: Creating a DOUBLE

`DOUBLE.of(value: STRING | NUMBER): DOUBLE`

Converts `value` to a `DOUBLE` value.

```shell
$ xa 'DOUBLE.of(123)'
# 123.0

$ xa 'DOUBLE.of("1.23e2")'
# 123.0

$ xa 'DOUBLE.of(BIG.of(123))'
# 123.0
```

---

Numbers that cannot be represented exactly by `DOUBLE` are rounded to its precision.

Values with an absolute value that is too large become positive or negative infinity.

Strings representing `Infinity`, `-Infinity`, and `NaN` can also be converted.

Signed zeros retain their sign when converted.

```shell
$ xa 'DOUBLE.of("1e400")'
# Infinity

$ xa '1 / DOUBLE.of("-0")'
# -Infinity
```

---

An error occurs when a string cannot be parsed as a number, or when the value is neither a string nor a number.

## Addition/Subtraction Operators

Addition/subtraction operators consist of operators that perform addition/subtraction-like operations.

Addition/subtraction operators have left-associative binding.

### `number + number`: Addition

The addition operator adds two values.

```shell
$ xa '1 + 2'
# 3
```

---

The addition operator behaves differently depending on the type of the left operand.

| Left Type | Behavior                                                       |
|-----------|----------------------------------------------------------------|
| Number    | Returns the sum of left and right                              |
| String    | Returns a string concatenating left and right                  |
| Array     | Generates an array concatenating left and right                |
| Object    | Generates an object with right entries assigned to left object |

#### Overriding Addition Operation

You can customize the addition operation of an object by implementing the addition method `_+_`.

```shell
$ xa '
  Obj := {
    `_+_`: this, other -> this.value + other.value
  }

  Obj{value: 100} + Obj{value: 23}
'
# 123
```

### `number - number`: Subtraction

The subtraction operator subtracts two values.

```shell
$ xa '3 - 1'
# 2
```

---

Like the addition operator, the subtraction operator can be overridden.

```shell
$ xa '
  Obj := {
    `_-_`: this, other -> this.value - other.value
  }

  Obj{value: 123} - Obj{value: 23}
'
# 100
```

## Multiplication/Division Operators

Multiplication/division operators consist of operators that perform multiplication/division-like operations.

Multiplication/division operators have left-associative binding.

### `number * number`: Multiplication

The multiplication operator multiplies two values.

```shell
$ xa '2 * 3'
# 6
```

---

Multiplication of strings repeats that string.

```shell
$ xa '"abc" * 3'
# abcabcabc
```

---

Multiplication of arrays repeats that array.

```shell
$ xa '[1, 2, 3] * 3'
# [1;2;3;1;2;3;1;2;3]
```

### `number / number`: Division

The division operator divides two values.

```shell
$ xa '6 / 3'
# 2.0
```

---

Even division of integers returns the result as a floating-point number.

```shell
$ xa '7 / 4'
# 1.75
```

---

Up to API version 5, division by zero returns infinity or `NaN`.

In API version 6 and later, division by an `INT` or `BIG` zero raises an error regardless of the numerator's numeric type.

Division by a `DOUBLE` zero continues to return infinity or `NaN`.

### `number % number`: Modulo

The modulo operator divides two values and returns the remainder.

```shell
$ xa '7 % 4'
# 3
```

---

The remainder is either 0 or has the same sign as the right operand.

```shell
$ xa '-7 % 3'
# 2

$ xa '7 % -3'
# -2

$ xa '-7 % -3'
# -1
```

---

When the division is exact, the result is 0 regardless of the signs of the operands.

```shell
$ xa '-6 % 3'
# 0

$ xa '6 % -3'
# 0
```

---

It can also handle decimals.

```shell
$ xa '1.75 % 0.5'
# 0.25
```

---

When both operands are integers and at least one is `BIG`, returns a `BIG` remainder without losing precision.

```shell
$ xa 'BIG.of("5008005008005008005008005") % BIG.of("2003002003002003002003002")'
# 1002001002001002001002001
```

---

When a `DOUBLE` is included, computes the result using `DOUBLE` values.

---

Up to API version 5, the behavior of division by an integer zero depends on the execution environment and the operand types.

In API version 6 and later, an `INT` or `BIG` zero on the right raises an error regardless of the left operand's numeric type.

Division by a `DOUBLE` zero returns `NaN`.

### `integer %% integer`: Divisibility

Returns whether the left value is divisible by the right value.

```shell
$ xa '7 %% 4'
# FALSE
```

---

It can also handle decimals.

```shell
$ xa '1.5 %% 0.5'
# TRUE

$ xa '1.75 %% 0.5'
# FALSE
```

### `integer !%% integer`: Non-Divisibility

Returns whether the left value is not divisible by the right value.

This operator is equivalent to the negation of the divisibility operator `!(integer %% integer)`.

```shell
$ xa '7 !%% 4'
# TRUE
```

## Exponentiation Operators

Exponentiation operators consist only of the exponentiation operator.

Exponentiation operators have right-associative binding.

### `number ^ number`: Exponentiation

The exponentiation operator raises the left value to the power of the right value.

Even the result of raising an integer to an integer power is returned as a floating-point number.

```shell
$ xa '2 ^ 3'
# 8.0
```

---

There is also a function `POW` that can do the same thing.

```shell
$ xa 'POW(2; 3)'
# 8.0
```

## Absolute Value

The length operator `$#number` returns the absolute value of a number.

```shell
$ xa '$#10'
# 10

$ xa '$#-10'
# 10
```

## Built-in Constants

Numeric built-in constants.

| Constant | Meaning         |
|----------|-----------------|
| `MATH.PI` | Pi (π)          |
| `MATH.E`  | Euler's number (e) |

## Built-in Functions

### `ABS`: Get Absolute Value

`ABS(value: NUMBER): NUMBER`

Returns the absolute value of the first argument.

```shell
$ xa 'ABS(-10)'
# 10
```

### `FLOOR`: Round Down

`FLOOR(number: NUMBER): INT`

Rounds the first argument down to the nearest integer toward negative infinity.

```shell
$ xa 'FLOOR(1.5)'
# 1
```

### `DIV`: Integer Part of Division

`DIV(x: NUMBER; y: NUMBER): NUMBER`

Divides `x` by `y` and returns the integer part of the result.

```shell
$ xa '7 DIV 3'
# 2

$ xa '-7 DIV 3'
# -2

$ xa 'BIG.of(7) DIV -3'
# -2
```

---

Returns an `INT` when both arguments are `INT`, or a `BIG` without losing precision when both arguments are integers and at least one is `BIG`.

When a `DOUBLE` is included, computes the result using `DOUBLE` arguments and returns a `DOUBLE`.

```shell
$ xa 'DIV(BIG.of("123456789012345678901234567890"); 10)'
# 12345678901234567890123456789
```

---

Up to API version 5, the behavior of division by an integer zero depends on the execution environment and the argument types.

In API version 6 and later, division by an `INT` or `BIG` zero raises an error regardless of the numerator's numeric type.

Division by a `DOUBLE` zero returns `NaN`.

```shell
$ xa -A 6 'DIV(1.0; 0) !? (error => error)'
# Division by zero
```

### `FLOOR_DIV`: Floor Division

`FLOOR_DIV(x: NUMBER; y: NUMBER): NUMBER`

Divides `x` by `y` and rounds the result down toward negative infinity.

Dividing by zero raises an error when both arguments are integers.

When a `DOUBLE` is included, dividing by zero returns `NaN`, positive infinity, or negative infinity.

In API version 6 and later, division by an `INT` or `BIG` zero raises an error regardless of the numerator's numeric type.

The remainder corresponding to the quotient returned by this function can be obtained with `MOD`.

```shell
$ xa '7 FLOOR_DIV 3'
# 2

$ xa '-7 FLOOR_DIV 3'
# -3

$ xa 'BIG.of(7) FLOOR_DIV -3'
# -3
```

---

The return type follows the same rules as `DIV`.

### `MOD`: Remainder with the Sign of the Divisor

`MOD(x: NUMBER; y: NUMBER): NUMBER`

Returns the remainder of dividing `x` by `y`.

Has the same behavior as the `%` operator.

The remainder is either 0 or has the same sign as `y`.

```shell
$ xa '7 MOD 3'
# 1

$ xa '-7 MOD 3'
# 2

$ xa 'BIG.of(7) MOD -3'
# -2
```

---

The return type and handling of division by zero follow the same rules as `DIV`.

### `REM`: Remainder with the Sign of the Dividend

`REM(x: NUMBER; y: NUMBER): NUMBER`

Returns the remainder of dividing `x` by `y`.

The remainder is either 0 or has the same sign as `x`.

```shell
$ xa '7 REM 3'
# 1

$ xa '-7 REM 3'
# -1

$ xa 'BIG.of(7) REM -3'
# 1
```

---

The return type and handling of division by zero follow the same rules as `DIV`.

### `SQRT`: Get Square Root

`SQRT(number: NUMBER): NUMBER`

Returns the positive square root of the first argument.

```shell
$ xa '"$%.3f(  SQRT(100.0)  )"'
# 10.000
```

### `SIN`: Sine

`SIN(number: NUMBER): NUMBER`

Interprets the first argument as radians and returns its sine.

```shell
$ xa '"$%.3f(  SIN(PI / 2)  )"'
# 1.000
```

### `COS`: Cosine

`COS(number: NUMBER): NUMBER`

Interprets the first argument as radians and returns its cosine.

```shell
$ xa '"$%.3f(  COS(0)  )"'
# 1.000
```

### `TAN`: Tangent

`TAN(number: NUMBER): NUMBER`

Interprets the first argument as radians and returns its tangent.

```shell
$ xa '"$%.3f(  TAN(PI / 4)  )"'
# 1.000
```

### `ASIN`: Arcsine

`ASIN(number: NUMBER): NUMBER`

Returns the arcsine of the first argument in radians.

This function is the inverse of the `SIN` function.

```shell
$ xa '"$%.3f(  ASIN(1)  )"'
# 1.571
```

### `ACOS`: Arccosine

`ACOS(number: NUMBER): NUMBER`

Returns the arccosine of the first argument in radians.

This function is the inverse of the `COS` function.

```shell
$ xa '"$%.3f(  ACOS(0)  )"'
# 1.571
```

### `ATAN`: Arctangent

`ATAN(number: NUMBER): NUMBER`

Returns the arctangent of the first argument in radians.

This function is the inverse of the `TAN` function.

```shell
$ xa '"$%.3f(  ATAN(1)  )"'
# 0.785
```

### `ATAN2`: Angle of a coordinate

`ATAN2(y: NUMBER; x: NUMBER): NUMBER`

Returns the angle of the coordinate `(x, y)` in radians.

```shell
$ xa '"$%.3f(  ATAN2(1; 1)  )"'
# 0.785
```

### `POW`: Power

`POW(base: NUMBER; exponent: NUMBER): NUMBER`

Returns the result of raising the first argument to the power of the second argument.

```shell
$ xa 'POW(2; 3)'
# 8.0
```

### `EXP`: Exponential Function

`EXP(number: NUMBER): NUMBER`

Returns the exponential function (base e) of the first argument.

```shell
$ xa '"$%.3f(  EXP(1)  )"'
# 2.718

$ xa '"$%.3f(  EXP(2)  )"'
# 7.389
```

### `LOG`: Logarithm

`LOG([base: NUMBER; ]number: NUMBER): NUMBER`

Returns the logarithm of `number` with `base` as the base.

When `base` is omitted, returns the natural logarithm with base e.

```shell
$ xa '"$%.3f(  LOG(MATH.E)  )"'
# 1.000

$ xa '"$%.3f(  LOG(2; 8)  )"'
# 3.000
```

### `RAND`: Get Random Number

`RAND(): DOUBLE`

`RAND([from: NUMBER; ]until: NUMBER): INT`

When called with no arguments, returns a decimal number greater than or equal to 0 and less than 1.

When called with one argument, returns an integer greater than or equal to 0 and less than `until`.

When called with two arguments, returns an integer greater than or equal to `from` and less than `until`.
