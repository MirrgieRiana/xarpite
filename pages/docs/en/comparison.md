---
title: "Comparison"
---

<!-- toc -->

# Comparison

You can perform various comparisons, such as comparing numbers or strings, or checking whether a specific element is contained in an array.

## Binding of Comparison Operators

The binding between comparison operators works in a special way, following these steps:

1. For all comparison operators, perform the comparison between their left and right operands
2. Take the logical AND of all those results

For example, `3 <= x <= 5` first evaluates `3 <= x`, then evaluates `x <= 5`, and finally takes their logical AND: `3 <= x && x <= 5`.

This allows you to write comparison chains concisely.

```shell
$ xa '3 <= 4 <= 5'
# TRUE

$ xa '3 <= 10 <= 5'
# FALSE
```

---

The following operators follow this specification:

- `>` `<` `>=` `<=` `==` `!=` `@` `!@` `?=`

# Comparison Operators

The comparison operators are as follows:

| Operator        | Meaning                                             |
|-----------------|-----------------------------------------------------|
| `left > right`  | Returns whether `left` is greater than `right`      |
| `left < right`  | Returns whether `left` is less than `right`         |
| `left >= right` | Returns whether `left` is greater than or equal to `right` |
| `left <= right` | Returns whether `left` is less than or equal to `right`    |

```shell
$ xa '[1 > 2, 2 > 2, 3 > 2]'
# [FALSE;FALSE;TRUE]

$ xa '[1 < 2, 2 < 2, 3 < 2]'
# [TRUE;FALSE;FALSE]

$ xa '[1 >= 2, 2 >= 2, 3 >= 2]'
# [FALSE;TRUE;TRUE]

$ xa '[1 <= 2, 2 <= 2, 3 <= 2]'
# [TRUE;TRUE;FALSE]
```

## Overriding Comparison Operators

Comparison operators actually determine their behavior based on the result of the spaceship operator.

When the spaceship operator is overridden, the behavior of the various comparison operators changes accordingly.

# Equality Operators

## Equality Operator

The equality operator `left == right` returns whether the values on both sides are equal.

```shell
$ xa '[1 == 2, 2 == 2, 3 == 2]'
# [FALSE;TRUE;FALSE]
```

Currently, it is only defined for some types such as numbers and strings.

## Inequality Operator

The inequality operator `left != right` returns whether the values on both sides are not equal.

This is the negation of the equality operator.

```shell
$ xa '[1 != 2, 2 != 2, 3 != 2]'
# [TRUE;FALSE;TRUE]
```

# Containment Operators

## Containment Operator

The containment operator `left @ right` returns whether `left` is contained in `right`.

The behavior for each right-hand type is as follows:

| Right Type | Return Value                                            |
|------------|--------------------------------------------------------|
| String     | Whether the left string is contained in the right string |
| Array      | Whether the left element is contained in the right array |
| Object     | Whether the left key is contained in the right object   |

```shell
$ xa '"bcd" @ "abcde"'
# TRUE

$ xa '"123" @ "abcde"'
# FALSE

$ xa '1 @ [1, 2, 3]'
# TRUE

$ xa '4 @ [1, 2, 3]'
# FALSE

$ xa '"a" @ {a: 1; b: 2; c: 3}'
# TRUE

$ xa '"d" @ {a: 1; b: 2; c: 3}'
# FALSE
```

The behavior of the containment operator is inconsistent: strings are substrings, arrays are elements, and objects are keys.

## Negative Containment Operator

The negative containment operator `left !@ right` returns whether `left` is not contained in `right`.

It behaves equivalently to the expression `!(left @ right)` using the containment operator.

```shell
$ xa '"bcd" !@ "abcde"'
# FALSE

$ xa '"123" !@ "abcde"'
# TRUE
```

## Overriding the Containment Operator

The containment operator is actually an operator that calls the `_@_` method of the right-hand value and returns its boolean conversion.

```shell
$ xa -q '
  Basket := {
    `_@_`: this, item -> item @ this.items
  }

  basket := Basket{items: ["apple", "orange", "banana"]}

  OUT << "Basket: $basket"
  "apple" @ basket && (OUT << "apple is in basket")
  "cherry" @ basket && (OUT << "cherry is in basket")
'
# Basket: {items:[apple;orange;banana]}
# apple is in basket
```

# InstanceOf Operator

The instanceOf operator `left ?= right` returns whether `left` is an instance of `right`.

More precisely, it determines whether object `left` is the same instance as `right`, or whether `right` exists somewhere in `left`'s inheritance chain.

```shell
$ xa -q '
  Animal := {}
  Human := Animal {}
  socrates := Human{}
  pythagoras := Human{}

  Animal ?= Animal && (OUT << "Animal is Animal")
  Human ?= Human && (OUT << "Human is Human")
  socrates ?= socrates && (OUT << "Socrates is Socrates")
  pythagoras ?= pythagoras && (OUT << "Pythagoras is Pythagoras")

  Human ?= Animal && (OUT << "Human is Animal")
  Animal ?= Human && (OUT << "Animal is Human")

  socrates ?= Human && (OUT << "Socrates is Human")
  Human ?= socrates && (OUT << "Human is Socrates")

  socrates ?= Animal && (OUT << "Socrates is Animal")
  Animal ?= socrates && (OUT << "Animal is Socrates")

  socrates ?= pythagoras && (OUT << "Socrates is Pythagoras")
  pythagoras ?= socrates && (OUT << "Pythagoras is Socrates")
'
# Animal is Animal
# Human is Human
# Socrates is Socrates
# Pythagoras is Pythagoras
# Human is Animal
# Socrates is Human
# Socrates is Animal
```

# Spaceship Operator

The spaceship operator `<=>` is an operator that returns the magnitude relationship between the left and right sides.

The relationship between the left-right magnitude relationship and the return value of the spaceship operator is as follows:

| Condition      | Return Value |
|----------------|--------------|
| Left < Right   | -1           |
| Left = Right   | 0            |
| Left > Right   | 1            |

```shell
$ xa '1 <=> 2'
# -1

$ xa '2 <=> 2'
# 0

$ xa '3 <=> 2'
# 1
```

---

When comparing strings, they are determined in lexicographic order.

```shell
$ xa ' "a" <=> "b" '
# -1

$ xa ' "aa" <=> "a" '
# 1
```

## Overriding the Spaceship Operator

The spaceship operator is actually an operator that calls the `_<=>_` method of the left-hand value and returns its return value.

```shell
$ xa '
  Person := {
    `_<=>_`: this, other -> this.age <=> other.age
  }

  alice := Person{age: 30}
  bob   := Person{age: 20}

  alice <=> bob
'
# 1
```

## Use in SORT Function and Others

The spaceship operator can be used as a comparison function in functions like `SORT`.

The following example sorts by string length.

```shell
$ xa '
  (
    "apple",
    "banana",
    "cherry",
    "durian",
    "elderberry",
    "fig",
    "grape",
  ) >> SORT[a, b -> $#a <=> $#b]
'
# fig
# apple
# grape
# banana
# cherry
# durian
# elderberry
```
