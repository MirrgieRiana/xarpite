---
title: "Factor"
---

Within this document, operators are listed in order from highest to lowest binding precedence.

# Factor

Factors are literals and parentheses that function independently.

Factors have atomic properties in operator binding.

# Postfix Operators

Postfix operators are operators placed after the base.

Postfix operators are divided into unary and binary ones, both with left-associative binding.

## Postfix Representation of Prefix Unary Operators `value.+` ...

All prefix unary operators have a postfix operator variation that is written following `.`.

The following pairs all work the same way:

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

Using the postfix representation can reduce parentheses in some syntaxes and improve readability.

# Prefix Operators

Prefix operators are operators placed before the base.

Prefix operators have right-associative binding.

## Getting Length `$#value`

The prefix `$#` operator gets the "length" of a value.

```shell
$ xa '$#"123"'
# 3

$ xa '$#[1, 2, 3]'
# 3

$ xa '$#{a: 1; b: 2; c: 3}'
# 3
```

---

This operator returns different things depending on the type of value.

| Type   | Result                              |
|--------|-------------------------------------|
| String | Number of characters in UTF16       |
| Array  | Number of elements                  |
| Object | Number of entries, ignoring parent  |

(Additional operator categories and specific operators follow the same pattern as the Japanese version.)
