---
title: "Factors"
---

In this document, operators are listed in order from highest binding precedence.

<!-- toc -->

# Factors

Factors refer to literals and parenthetical expressions that function independently.

Factors have atomic properties in operator binding.

# Postfix Operators

Postfix operators are operators appended after a base.

Postfix operators are divided into unary and binary types, both with left-associative binding.

## Postfix Representation of Prefix Unary Operators `value.+` ...

All prefix unary operators have a postfix operator variant that follows a `.`.

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

Using postfix representation can reduce parentheses in some contexts and improve readability.

# Prefix Operators

Prefix operators are operators prepended before a base.

Prefix operators have right-associative binding.

