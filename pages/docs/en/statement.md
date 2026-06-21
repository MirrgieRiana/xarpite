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

# Indent Block `:`

By writing an expression with a line break and indentation after `:`, it functions as a factor equivalent to parentheses `(` `)`.

```shell
$ xa '
  :
    1 + 2
'
# 3
```

---

Just like parentheses, compound statements can be written inside an indent block.

```shell
$ xa '
  :
    a := 100
    b := 20
    c := 3
    a + b + c
'
# 123
```

---

The value of an empty indent block is `NULL`.

```shell
$ xa '
  :
'
# NULL
```

---

Just like inside parentheses, variables declared inside an indent block do not affect the outside.

```shell
$ xa '
  a := 10
  :
    a := 20
    OUT << a
    a = 30
    OUT << a
  a
'
# 20
# 30
# 10
```

---

Writing indent blocks on the right side of operators can contribute to readability in some cases.

```shell
$ xa -q '
  f := x, y -> :
    x + y
  a := :
    f(10; 20)
  a == 30 && :
    1 .. 3 | :
      OUT << :
        a
'
# 30
# 30
# 30
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
