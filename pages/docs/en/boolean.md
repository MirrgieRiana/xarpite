---
title: "Boolean Overview"
---

<!-- toc -->

# Boolean Overview

A boolean is a data structure that has two possible values: true (`TRUE`) or false (`FALSE`).

These are referenced by the built-in constants `TRUE` and `FALSE` respectively.

```shell
$ xa 'TRUE'
# TRUE

$ xa 'FALSE'
# FALSE
```

# Booleanization

The booleanization operator `?value` converts a value to a boolean.

```shell
$ xa '?1'
# TRUE

$ xa '?0'
# FALSE
```

## Booleanization by Value Type

How booleanization is performed differs depending on the type of value.

Generally, for any value type, the simplest value becomes `FALSE`, and everything else becomes `TRUE`.

| Value Type | Becomes `TRUE`                           | Becomes `FALSE`                              |
|------------|------------------------------------------|----------------------------------------------|
| NULL       | None                                     | `NULL`                                       |
| Number     | Values not equal to 0                    | Values equal to 0                            |
| Boolean    | `TRUE`                                   | `FALSE`                                      |
| String     | Non-empty strings                        | Empty string                                 |
| Stream     | If any element is `TRUE`                 | All elements are `FALSE`<br>Empty stream     |
| Array      | Non-empty arrays                         | Empty array                                  |
| Object     | Has one or more entries<br>※Overridable  | Has no entries<br>※Overridable               |

---

Some values that intuitively feel like `FALSE` actually become `TRUE`.

- String `"FALSE"`
- String `"0"`
- Array `[FALSE]`
- Object `{a: NULL}`

## Overriding Booleanization

Booleanization references the `?_` method of a value.

By overriding the `?_` method of an object, you can modify the booleanization behavior.

```shell
$ xa '
  Class := {
    `?_`: this -> this.value > 100
  }

  ?Class{value: 50},
  ?Class{value: 200},
'
# FALSE
# TRUE
```

## Negated Booleanization

The negated booleanization operator `!value` performs booleanization of a value and returns its negation.

```shell
$ xa '!TRUE'
# FALSE

$ xa '!FALSE'
# TRUE

$ xa '!1'
# FALSE
```

# Logical Operators

## Logical AND Operator

The logical AND operator `boolean && boolean` returns the left side if it evaluates to `FALSE` through booleanization, otherwise returns the right side.

---

When both sides are boolean values, the result is equivalent to a logical AND operation.

| Left Value | Right Value | Return Value |
|------------|-------------|--------------|
| `FALSE`    | `FALSE`     | `FALSE`      |
| `FALSE`    | `TRUE`      | `FALSE`      |
| `TRUE`     | `FALSE`     | `FALSE`      |
| `TRUE`     | `TRUE`      | `TRUE`       |

## Logical OR Operator

The logical OR operator `boolean || boolean` returns the left side if it evaluates to `TRUE` through booleanization, otherwise returns the right side.

---

When both sides are boolean values, the result is equivalent to a logical OR operation.

| Left Value | Right Value | Return Value |
|------------|-------------|--------------|
| `FALSE`    | `FALSE`     | `FALSE`      |
| `FALSE`    | `TRUE`      | `TRUE`       |
| `TRUE`     | `FALSE`     | `TRUE`       |
| `TRUE`     | `TRUE`      | `TRUE`       |

## Conditional Branching with Logical Operators

Logical operators can also be used as a means of conditional branching.

When the right side value is not used, it is not evaluated at all.

| Operator              | Condition for Right Side Evaluation            |
|-----------------------|------------------------------------------------|
| `condition && then`   | When booleanization of `condition` is `TRUE`   |
| `condition \|\| else` | When booleanization of `condition` is `FALSE`  |

```shell
$ xa -q '
  check := value -> (
    value %% 2 && OUT("$value is divisible by 2")
    value %% 3 || OUT("$value is not divisible by 3")
  )

  check(4)
  check(9)
'
# 4 is divisible by 2
# 4 is not divisible by 3
```

# Conditional Operators

## Ternary Operator

The ternary operator `condition ? then : else` is an operator for conditional branching.

It returns `then` if the booleanization of `condition` evaluates to `TRUE`, otherwise returns `else`.

```shell
$ xa 'TRUE ? "Yes" : "No"'
# Yes

$ xa 'FALSE ? "Yes" : "No"'
# No
```

---

Like logical operators, the ternary operator does not evaluate unnecessary branches, so it can be used like an if statement.

```shell
$ xa -q '
  check := value -> (
    value %% 2 ? (
      OUT << "$value is even"
    ) : (
      OUT << "$value is odd"
    )
  )

  check(4)
  check(9)
'
# 4 is even
# 9 is odd
```

## Ternary Operator Notation

The ternary operator can be nested and you can add line breaks before operators.

```shell
$ xa '
  get_name := is_parent, is_man ->
    is_parent
      ? is_man
        ? "King"
        : "Queen"
      : is_man
        ? "Prince"
        : "Princess"

  get_name(TRUE; TRUE),
  get_name(TRUE; FALSE),
  get_name(FALSE; TRUE),
  get_name(FALSE; FALSE),
'
# King
# Queen
# Prince
# Princess
```

## Elvis Operator

The Elvis operator `value ?: default` returns `default` if `value` is `NULL`, otherwise returns `value`.

```shell
$ xa '"Orange" ?: "Apple"'
# Orange

$ xa 'NULL ?: "Apple"'
# Apple
```
