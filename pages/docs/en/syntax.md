---
title: "Factors"
---

Within this document, operators are listed in order from highest to lowest binding precedence.

<!-- toc -->

# Factors

Factors refer to literals and parenthetical constructs that function independently.

Factors have atomic properties in terms of operator binding.

# Postfix Operators

Postfix operators are operators that are appended after their operand.

Postfix operators are divided into unary and binary types, both with left-associative binding.

## Postfix Representation of Prefix Unary Operators `value.+` ...

All prefix unary operators have a postfix operator variant written after a `.`.

The following pairs all function identically:

```
 +A  A.+
 -A  A.-
 ?A  A.?
!!A  A.!!
 !A  A.!
 &A  A.&
$#A  A.$#
$&A  A.$&
$*A  A.$*
 \A  A.\
```

Using postfix representation can reduce parentheses in some syntactic contexts and improve readability.

# Prefix Operators

Prefix operators are operators that are prepended before their operand.

Prefix operators have right-associative binding.

# Object Inheritance `parent{entry; ...}`

Postfixing `{` `}` to an object creates a child object with that object as parent.

Object inheritance is mainly used for method lookup and entry inheritance does not occur.

The method of creating objects is shared with object literals.

```shell
$ xa '{a: 1; m: this -> 3}{b: 2}'
# {b:2}

$ xa '{a: 1; m: this -> 3}{b: 2}.a'
# NULL

$ xa '{a: 1; m: this -> 3}{b: 2}::m()'
# 3
```

# Object Element Access `object.key`

You can access object elements with the `.` operator.

```shell
$ xa '{x: 123}.x'
# 123
```

---

Even if the object has a parent object, the parent object's elements are not inherited.

```shell
$ xa '{x: 123}{}.x'
# NULL
```

---

By placing parentheses on the right side of `.`, you can reference with arbitrary expressions.

```shell
$ xa '
  obj := {item1: 123; item2: 456}
  index := 2
  obj.("item$index")
'
# 456
```

---

`.` has the property that when the right side is an identifier, it interprets it as a key rather than a variable.

Therefore, there is a difference in the entry referenced depending on the presence or absence of parentheses.

```shell
$ xa '
  key := "item1"
  obj := {key: 123; item1: 456}
  [obj.key; obj.(key)]
'
# [123;456]
```

---

Keys are automatically stringified.

```shell
$ xa '{1: 123}.1'
# 123
```

# Null-Safe Element Access `object?.key`

The `?.` operator returns `NULL` instead of attempting to get the element when the left side is `NULL`.

```shell
$ xa '{x: 1}, NULL, {x: 3} | _?.x'
# 1
# NULL
# 3
```
