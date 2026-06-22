---
title: "Factors and Operators"
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
