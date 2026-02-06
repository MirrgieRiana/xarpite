---
title: "Identifiers"
---

<!-- toc -->

# Identifiers

An identifier is a string used to refer to variables, built-in constants, built-in functions, parameters, and other named entities.

```shell
$ xa '
  variable := 10
  variable
'
# 10

$ xa 'MATH.PI'
# 3.141592653589793

$ xa 'SQRT(4)'
# 2.0

$ xa '
  function := x, y, z -> x + y + z
  function(100; 20; 3)
'
# 123
```

## Characters Allowed in Identifiers

The following characters can be used in identifiers:

- Letters `a-zA-Z`
- Digits `0-9`
- Underscore `_`
- All multibyte characters

However, the first character must not be a digit.

## Quoted Identifiers

Identifiers enclosed in ``` ` ` ``` are called quoted identifiers.

Identifiers and quoted identifiers represent the same identifier, just written differently.

```shell
$ xa '
  `variable` := 10
  `variable`
'
# 10

$ xa '
  variable := 10
  `variable`
'
# 10
```

## Quoted Identifiers with Symbols

Quoted identifiers can also include symbols.

```shell
$ xa '
  `#` := 10
  `#`
'
# 10
```

## Character Escapes in Quoted Identifiers

The following character escapes can be used within quoted identifiers:

| String     | Meaning                                        |
|------------|------------------------------------------------|
| `\xXX`     | 1 character at specified code point U+0000~U+00FF |
| `\uXXXX`   | 1 UTF-16 code unit at specified position       |

```shell
$ xa '
  `\x21` := 10
  `!`
'
# 10
```

# Assignment Statements

## Compound Assignment Operators

Xarpite has compound assignment operators such as the `+=` operator that perform both operation and assignment simultaneously.

`a += b` is equivalent to `a = a + b` in most cases.

```shell
$ xa -q '
  x := 100
  OUT << x
  x += 23
  OUT << x
'
# 100
# 123
```

## Overriding Compound Assignment

There is an overridable method for compound assignment.

The `_+=_` method is called exactly once each time `a += b` is executed.

The return value of this method is ignored.

However, if the return value is a stream, it is resolved and the result is ignored.

The same applies to other compound assignment methods besides `_+=_`.

```shell
$ xa -q '
  Array := {
    `_+=_`: this, item -> this.value::push(item)
  }
  array := Array{value: ["apple"]}

  OUT << array.value
  array += "banana"
  OUT << array.value
'
# [apple]
# [apple;banana]
```

## List of Compound Assignment Operators

The following is a list of compound assignment operators available in Xarpite.

| Operator | Meaning                  |
|----------|--------------------------|
| `+=`     | Add and assign           |
| `-=`     | Subtract and assign      |

## Compound Assignment Fallback

If the override method for compound assignment does not exist, normal operation and assignment are performed.

```shell
$ xa -q '
  Array := {
    `_+_`: this, item -> Array{value: this.value + [item]}
  }
  array := Array{value: ["apple"]}

  OUT << array.value
  array += "banana"
  OUT << array.value
'
# [apple]
# [apple;banana]
```

---

Note that at this time, the variable itself is being updated.

```shell
$ xa -q '
  array := ["apple"]
  oldArray := array

  OUT << "Old: $oldArray"
  OUT << "New: $array"

  OUT << "Update!"
  array += "banana"

  OUT << "Old: $oldArray"
  OUT << "New: $array"
'
# Old: [apple]
# New: [apple]
# Update!
# Old: [apple;banana]
# New: [apple;banana]
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

| Operator    | Method Name | Description       |
|-------------|-------------|-------------------|
| `formula++` | `_++`       | Postfix increment |
| `++formula` | `++_`       | Prefix increment  |
| `formula--` | `_--`       | Postfix decrement |
| `--formula` | `--_`       | Prefix decrement  |

By overriding these methods, you can customize the behavior of increment and decrement operations.

---

Override methods take an `accessor` function as an argument in addition to the object itself. This function performs get and set operations on the expression.

Calling `accessor` with 0 arguments performs a value get operation on the expression.

Calling `accessor` with 1 argument performs a value set operation on the expression.

Increment and decrement behavior can be defined either as an object mutation operation or as an immutable operation with assignment.

```shell
$ xa -q '
  MutableCounter := {
    new := value -> MutableCounter{value: value}
    `_++`: this, accessor -> (
      this.value++
    )
    `&_`: this -> this.value.&
  }

  old := MutableCounter.new(0)
  new := old

  OUT << "Old: $old"
  OUT << "New: $new"
  new++
  OUT << "Old: $old"
  OUT << "New: $new"
'
# Old: 0
# New: 0
# Old: 1
# New: 1
```

```shell
$ xa -q '
  ImmutableCounter := {
    new := value -> ImmutableCounter{value: value}
    `_++`: this, accessor -> (
      accessor(new(this.value + 1))
    )
    `&_`: this -> this.value.&
  }

  old := ImmutableCounter.new(0)
  new := old

  OUT << "Old: $old"
  OUT << "New: $new"
  new++
  OUT << "Old: $old"
  OUT << "New: $new"
'
# Old: 0
# New: 0
# Old: 0
# New: 1
```

---

The operator's return value is the return value of the override method.

Due to this property, prefix and postfix versions are defined as independent operations, and one does not fall back to the other.

```shell
$ xa -q '
  Object := {
    `_++`: this, accessor -> "suffix"
    `++_`: this, accessor -> "prefix"
  }

  object := Object{}

  OUT << object++
  OUT << ++object
'
# suffix
# prefix
```

### Increment/Decrement on Non-Assignable Expressions

When an expression doesn't support assignment, only the override method check is performed.

The `accessor` supports get operations only.

Typically, this behavior is defined as a mutation operation on mutable values.

```shell
$ xa '
  MutableCounter := {
    `_++`: this, accessor -> (
      this.value++
      this.value
    )
  }
  MutableCounter{value: 100}++
'
# 101
```

# Variables

Variables are a mechanism for storing and referencing values by naming them with identifiers.

```shell
$ xa '
  x := 100
  y :=  20
  z :=   3

  x + y + z
'
# 123
```

## Variable Declaration

To declare a variable, use the variable declaration operator `variable := value`.

The variable declaration operator declares a variable within the written scope while initializing it with the right-hand value.

In Xarpite, variables must be initialized with some value at the time of declaration.

```shell
$ xa '
  x := 10
  x
'
# 10
```

## Assigning Values to Variables

To assign a value to a variable, use the assignment operator `variable = value`.

The destination variable must already be declared.

```shell
$ xa -q '

  x := 10
  OUT << x

  x = 123
  OUT << x

'
# 10
# 123
```

## Variable Scope

Declared variables are valid only within their scope from the point of declaration onward.

Variables declared within operators that create a scope, such as `( )`, are destroyed when that scope is exited.

```shell
$ xa -q '

  x := "A (outer initial value)"
  OUT << x

  (
    x = "B (outer assigned value)"
    OUT << x

    x := "C (inner initial value)"
    OUT << x

    x = "D (inner assigned value)"
    OUT << x
  )

  OUT << x
'
# A (outer initial value)
# B (outer assigned value)
# C (inner initial value)
# D (inner assigned value)
# B (outer assigned value)
```

## Self-Reference from the Right-Hand Side of Variable Declaration Operator

On the right-hand side of the variable declaration operator, you can reference the variable itself.

This property is convenient when creating recursive functions.

```shell
$ xa '
  factorial := n -> n == 0 ? 1 : n * factorial(n - 1)
  factorial(5)
'
# 120
```

# Mount

Mount is a mechanism that allows identifiers without declared variables to reference values from a special table.

Mount is often used when utilizing libraries.

Built-in constants such as `TRUE` `NULL` and built-in functions such as `JOIN` `SQRT` are all provided using the mount mechanism.

```shell
$ xa '
  lib := {
    fruit: "apple"
  }

  @lib

  fruit
'
# apple
```

## Mount Operator

The mount operator `@object` mounts the contents of object `object` at the current location.

When attempting to access an undefined variable, it searches for the value from mounted entries.

```shell
$ xa '
  @{
    fruit: "apple"
  }

  fruit
'
# apple
```

`object` must be an object.

## Mount Operator Mounts the Contents of an Object

Mount is performed on each entry of the object, not the object itself.

Modifications to the object made after mounting are not reflected in the mount state.

```shell
$ xa '
  lib := {
    fruit: "apple"
  }

  @lib

  lib.fruit = "orange"

  fruit
'
# apple
```

For the same reason, method calls using mount are also not possible.

## Mounts Can Be Multiple

When mounting is performed again in a state where mounting has already been performed, both entries are in a mounted state.

```shell
$ xa '
  @{
    fruit: "apple"
  }

  @{
    drink: "coffee"
  }

  "fruit=$fruit, drink=$drink"
'
# fruit=apple, drink=coffee
```

## Mount Overwrites Existing Mounts

When multiple mounts are performed on the same name, later ones take precedence.

```shell
$ xa '
  @{
    fruit: "apple"
    bread: "epi"
  }

  @{
    vegetable: "tomato"
    fruit: "orange"
  }

  "fruit=$fruit, bread=$bread, vegetable=$vegetable"
'
# fruit=orange, bread=epi, vegetable=tomato
```

## Mount Has the Same Scope as Variables

Mount is released when exiting the scope.

The scope of a mount is the same as variables, from when it is mounted by the mount operator until exiting the parenthetical expression at that level.

```shell
$ xa -q '
  @{
    fruit: "apple"
  }

  (
    OUT << fruit

    @{
      fruit: "banana"
    }

    OUT << fruit
  )

  OUT << fruit
'
# apple
# banana
# apple
```

## Declared Variables Take Precedence Over Mounts

When both a variable and a mount are accessible with the same name, the variable always takes precedence regardless of declaration order.

```shell
$ xa '
  fruit := "apple"

  @{
    fruit: "banana"
  }

  fruit
'
# apple
```

This specification is provided to prevent unintended use of mounts.

# Delegated Variables

When you declare a variable with a prefix `\` like `\variable`, it becomes a delegated variable.

Delegated variables execute the assigned function instead of accessing the variable entity when getting or setting.

---

On get, the receiver function is called with 0 arguments.

```shell
$ xa -q '
  time := 0
  \now := () -> time

  time = 100
  OUT << now
  time = 200
  OUT << now
'
# 100
# 200
```

---

On set, the receiver function is called exactly once with 1 argument.

Since the assignment operator returns the right-hand value, the receiver function's return value is always ignored.

If the receiver function returns a stream, the stream is resolved and the result is ignored.

```shell
$ xa -q '
  time := 0
  \now := _ -> time = _

  now = 100
  OUT << time
  now = 110
  OUT << time
'
# 100
# 110
```

## Delegated Variables Supporting Both Get and Set

To create a delegated variable that supports both getting and setting, the delegated function determines the number of arguments.

```shell
$ xa -q '
  time := 0
  \now := _ -> __.$# == 0 ? time : (time = _)

  now = 100
  OUT << [time, now] >> CSV
  now = 110
  OUT << [time, now] >> CSV
'
# 100,100
# 110,110
```
