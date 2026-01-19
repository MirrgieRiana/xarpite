---
title: "Numbers"
---

# Numbers

Xarpite supports handling numeric values.

<!-- toc -->

## Overview

### Numeric Types

There are two numeric types: 32-bit integers `INT` and 64-bit floating-point numbers `DOUBLE`.

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

### `number % number`: Modulo

The modulo operator divides two values and returns the remainder.

```shell
$ xa '7 % 4'
# 3
```

---

It can also handle decimals.

```shell
$ xa '1.75 % 0.5'
# 0.25
```

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

## Increment/Decrement

Increment `formula++` and decrement `formula--` are operators that add or subtract 1 to/from an expression and assign the result.

```shell
$ xa '
  a := 10
  a++
  a
'
# 11

$ xa '
  a := 10
  a--
  a
'
# 9
```

---

Increment and decrement operations are equivalent to evaluating the expression, adding or subtracting 1, and assigning the result back to the original expression.

### Postfix and Prefix Versions

In addition to the postfix version, increment/decrement operators also have prefix versions `++formula` and `--formula`.

The postfix version returns the value before addition/subtraction, while the prefix version returns the value after addition/subtraction.

```shell
$ xa '
  a := 10
  a++
'
# 10

$ xa '
  a := 10
  ++a
'
# 11
```

From a readability perspective, the postfix version is more commonly used.

### Postfix-of-Prefix Increment/Decrement

The "prefix" increment/decrement operators have "postfix-of-prefix" versions `formula.++` and `formula.--`.

Like other postfix versions of prefix operators, these are syntactic sugar for writing prefix operators in postfix notation.

That is, their behavior is equivalent to the "prefix" version, returning the value after addition/subtraction.

```shell
$ xa '
  a := 10
  a.++
'
# 11
```

### Incrementing Non-Numeric Values

The behavior of `formula++` is roughly equivalent to the following pseudocode:

```
old = get(formula)
new = plus(old, 1)
set(formula, new)
return old
```

---

Actually, as long as `formula` supports assignment and addition/subtraction with the integer `1` is defined, increment/decrement can work with non-numeric types as well.

```shell
$ xa '
  s := "abc"
  s++
  s
'
# abc1
```

### Overriding Increment/Decrement

Increment and decrement operators can be overridden with dedicated methods.

| Operator | Method Name | Description |
|----------|-------------|-------------|
| `++formula` | `++_` | Prefix increment |
| `formula++` | `_++` | Postfix increment |
| `--formula` | `--_` | Prefix decrement |
| `formula--` | `_--` | Postfix decrement |

By defining these methods on an object, you can customize the behavior of increment/decrement operations.

Overridden methods are expected to mutate (modify the value of) the object itself.

```shell
$ xa '
  obj := {
    `_++`: this -> (this.value = this.value * 2; this.value)
    value: 100
  }
  obj++
  obj.value
'
# 200
```

---

When an overridden method exists, no assignment to the variable is performed. The method must mutate the object within itself.

If no overridden method exists, the traditional addition/subtraction using the `_+_` and `_-_` methods is performed, and the result is assigned to the variable.

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

`FLOOR(number: NUMBER): INTEGER`

Rounds the first argument down to the nearest integer toward negative infinity.

```shell
$ xa 'FLOOR(1.5)'
# 1
```

### `DIV`: Integer Part of Division

`DIV(x: NUMBER; y: NUMBER): NUMBER`

Divides `x` by `y` and returns the integer part of the result.

```shell
$ xa 'DIV(10; 3)'
# 3
```

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

### `LOG`: Natural Logarithm

`LOG(number: NUMBER): NUMBER`

Returns the natural logarithm (base e) of the first argument.

```shell
$ xa '"$%.3f(  LOG(MATH.E)  )"'
# 1.000
```

### `RAND`: Get Random Number

`RAND(): DOUBLE`

`RAND([from: NUMBER; ]until: NUMBER): INT`

When called with no arguments, returns a decimal number greater than or equal to 0 and less than 1.

When called with one argument, returns an integer greater than or equal to 0 and less than `until`.

When called with two arguments, returns an integer greater than or equal to `from` and less than `until`.
