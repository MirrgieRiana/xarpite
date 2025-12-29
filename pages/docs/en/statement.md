---
title: "Parentheses `(value)`"
---

<!-- toc -->

# Parentheses `(value)`

Parentheses `(` `)` are a no-op factor that can contain any expression inside.

Parentheses can be used to change the order of calculation, among other things.

```shell
$ xa '(1 + 2) * 10'
# 30
```

---

Inside parentheses, you can actually write compound statements.

In the following sample code, variable `a` is initialized to 0, then 100 is assigned to `a` within the parentheses, and the parentheses themselves return `a + 20` which is 120. The value of the parentheses is summed with 3, resulting in the program output being 123.

In Xarpite, unlike many programming languages, you cannot use `{` `}` for compound statements.

```shell
$ xa '
  a := 0
  (
    a = 100
    a + 20
  ) + 3
'
# 123
```

---

Variables declared inside parentheses do not affect the outside of the parentheses.

```shell
$ xa '
  a := 10
  (
    a := 20
    OUT << a
    a = 30
    OUT << a
  )
  a
'
# 20
# 30
# 10
```

# Root Node

The root node defines the rules for places where any expression can be written, such as the entire file or directly under parentheses.

## Compound Statements `runner; ...; getter`

A compound statement is a sequence of zero or more statements and a tail expression that becomes the value of the compound statement itself, connected by `;`.

In the following sample code, only the last `a` line is treated as an expression (getter), and the 3 lines above it are treated as statements (runner).

In the following sample code, variable `a` is declared while 10 is assigned to it, the value of `a` which contains 10 is output, then 20 is assigned to `a`, and `a` containing 20 is specified as the tail expression.

```shell
$ xa '
  a := 10;
  OUT << a;
  a = 20;
  a
'
# 10
# 20
```

---

The tail expression can be omitted.

In that case, a trailing `;` may be necessary to indicate that a statement is not a tail expression.

The value of a compound statement with an omitted tail expression is always `NULL`.

```shell
$ xa '1 + 2;'
# NULL

$ xa ''
# NULL
```

---

The notation of `;` in compound statements is flexible except at the end.

Having extra `;` before or between terms is not a problem.

A semicolon cannot be written after the tail expression.

Also, line breaks act as a substitute for `;`.

```shell
$ xa '
  a := 10
  OUT << a
  ; ; ; a = 20; ; ;
  a
'
# 10
# 20
```
