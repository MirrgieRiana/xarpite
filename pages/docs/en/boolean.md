---
title: "Boolean"
---

<!-- toc -->

# Boolean

The boolean type represents true or false values.

## Boolean Literals

Xarpite provides the following boolean literal constants:

- `TRUE` ... Represents truth
- `FALSE` ... Represents falsity  
- `T` ... Alias for `TRUE`
- `F` ... Alias for `FALSE`

```shell
$ xa 'TRUE'
# TRUE

$ xa 'T'
# TRUE
```

## Boolean Operators

### Logical NOT `!value`

The prefix `!` operator returns the logical NOT of a value.

```shell
$ xa '!TRUE'
# FALSE

$ xa '!FALSE'
# TRUE
```

### Logical AND `left && right`

The `&&` operator returns `TRUE` if both the left and right sides are true, otherwise `FALSE`.

```shell
$ xa 'TRUE && TRUE'
# TRUE

$ xa 'TRUE && FALSE'
# FALSE
```

---

The logical AND operator has short-circuit evaluation.

If the left side is false, the right side is not evaluated and `FALSE` is returned.

```shell
$ xa -q 'FALSE && OUT << "This will not be executed"'
```

### Logical OR `left || right`

The `||` operator returns `TRUE` if either the left or right side is true, otherwise `FALSE`.

```shell
$ xa 'TRUE || FALSE'
# TRUE

$ xa 'FALSE || FALSE'
# FALSE
```

---

The logical OR operator has short-circuit evaluation.

If the left side is true, the right side is not evaluated and `TRUE` is returned.

```shell
$ xa -q 'TRUE || OUT << "This will not be executed"'
```

### XOR `left ^^ right`

The `^^` operator returns `TRUE` if exactly one of the left or right side is true, otherwise `FALSE`.

```shell
$ xa 'TRUE ^^ FALSE'
# TRUE

$ xa 'TRUE ^^ TRUE'
# FALSE
```

## Ternary Operator

### If-Else `condition ? trueValue : falseValue`

The `?` `:` ternary operator evaluates `trueValue` if `condition` is true, otherwise evaluates `falseValue`.

```shell
$ xa '1 + 1 == 2 ? "correct" : "incorrect"'
# correct
```

---

The ternary operator has short-circuit evaluation.

```shell
$ xa -q 'TRUE ? OUT << "true" : OUT << "false"'
# true

$ xa -q 'FALSE ? OUT << "true" : OUT << "false"'
# false
```

### If `condition ? value`

The `?` operator returns `value` if `condition` is true, otherwise returns an empty stream.

```shell
$ xa 'TRUE ? "apple"'
# apple

$ xa 'FALSE ? "apple"'
```

---

This can be combined with the `||` operator to achieve if-else behavior.

```shell
$ xa 'TRUE ? "apple" || "banana"'
# apple

$ xa 'FALSE ? "apple" || "banana"'
# banana
```

## Truthiness

### Truthiness of Values

In Xarpite, the truthiness of values is defined as follows:

| Type | Truthiness |
|------|------------|
| `TRUE` | True |
| `FALSE` | False |
| `NULL` | False |
| Empty string | False |
| Empty stream | False |
| Number 0 | False |
| Other values | True |

### Conversion to Boolean `?value`

The prefix `?` operator converts a value to a boolean.

```shell
$ xa '?"abc"'
# TRUE

$ xa '?""'
# FALSE

$ xa '?0'
# FALSE
```

### Double Boolean Negation `!!value`

The prefix `!!` operator is equivalent to `?` (conversion to boolean).

This is an idiom borrowed from JavaScript.

```shell
$ xa '!!"abc"'
# TRUE

$ xa '!!""'
# FALSE
```

## Boolean Conversion of Streams

When a stream is converted to boolean, it becomes `FALSE` if empty, `TRUE` otherwise.

```shell
$ xa '?(1, 2, 3)'
# TRUE

$ xa '?(,)'
# FALSE
```

---

Note that streams are lazy-evaluated, so truthiness check only evaluates elements as needed.

```shell
$ xa -q '
  ?(
    OUT << 1
    OUT << 2
    OUT << 3
  )
'
# 1
# TRUE
```
