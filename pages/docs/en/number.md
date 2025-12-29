---
title: "Integer Literal `123`"
---

<!-- toc -->

# Integer Literal `123`

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

# Hexadecimal Integer Literal `H#123abc`

You can write hexadecimal numbers following `H#`.

The `H#` part must be uppercase, but the hexadecimal part is case-insensitive.

```shell
$ xa 'H#FF'
# 255
```

# Floating-Point Number Literal `1.23`

You can write real numbers in the form "integer part `.` decimal part".

Representation and operations with real numbers involve rounding errors.

```shell
$ xa '1.5'
# 1.5
```

# Numeric Conversion `+value`

The prefix `+` operator performs numeric conversion of a value.

| Value Type | Numeric Conversion Result          |
|------------|-------------------------------------|
| NULL       | 0                                   |
| Number     | The number itself                   |
| Boolean    | 1 for TRUE, 0 for FALSE             |
| String     | Result of parsing as a number       |
| Stream     | Sum of all elements                 |

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

# Negative Numeric Conversion `-value`

The prefix `-` operator is similar to the numeric conversion operator, but negates the value.

This operator simultaneously performs "converting an arbitrary value to a number" and "negating the number".

```shell
$ xa '-"123"'
# -123

$ xa '-(100 + 20 + 3)'
# -123
```

# Exponentiation Operators

Exponentiation operators consist only of the exponentiation operator.

Exponentiation operators have right-associative binding.

## Exponentiation `number ^ number`

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

# Multiplication/Division Operators

Multiplication/division operators consist of operators that perform multiplication/division-like operations.

Multiplication/division operators have left-associative binding.

## Multiplication `number * number`

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

## Division `number / number`

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

## Modulo `number % number`

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

## Divisibility `integer %% integer`

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

## Non-Divisibility `integer !%% integer`

Returns whether the left value is not divisible by the right value.

This operator is equivalent to the negation of the divisibility operator `!(integer %% integer)`.

```shell
$ xa '7 !%% 4'
# TRUE
```

# Addition/Subtraction Operators

Addition/subtraction operators consist of operators that perform addition/subtraction-like operations.

Addition/subtraction operators have left-associative binding.

## Addition `number + number`

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

### Overriding Addition Operation

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

## Subtraction `number - number`

The subtraction operator subtracts two values.

```shell
$ xa '3 - 1'
# 2
```
