---
title: "Object Literal `{entry; ...}`"
---

<!-- toc -->

# Object Literal `{entry; ...}`

`{` `}` is a literal for creating objects.

Inside the braces, you can write zero or more entries separated by `;`.

`{` `}` behaves as an object literal even when written at the statement level, not as a code block.

```shell
$ xa '{a: 1; b: 2}'
# {a:1;b:2}
```

---

Items separated by `;` don't have to be in `key: value` form; they can also be 2-element arrays or streams of such arrays.

The entry operator `:` is essentially independent of object literals—it's an operator that creates a 2-element array from its operands.

```shell
$ xa '{1 .. 3 | "Item$_": _ * 10; 4 .. 6 | ["Item$_", _ * 100]}'
# {Item1:10;Item2:20;Item3:30;Item4:400;Item5:500;Item6:600}
```

---

The notation of `;` in object literals is flexible.

Extra `;` before, after, or between items is not a problem.

Newlines can also substitute for `;`.

```shell
$ xa '{
  a: 1
  b: 2
  ; ; ; c: 3; ; ;
}'
# {a:1;b:2;c:3}
```

## Variable Declaration Inside Object Literals

When a variable is declared inside an object literal, that variable is included in the object's entries while also being accessible by name from within the object literal.

```shell
$ xa '
  {
    fruit := "apple"
    result: fruit & fruit
  }
'
# {fruit:apple;result:appleapple}
```

### Initialized When Accessed

When a variable declared inside an object literal is accessed, that entry is assigned to the object at that point.

```shell
$ xa '
  {
    result: fruit & fruit
    fruit := "apple"
  }
'
# {fruit:apple;result:appleapple}
```

In this example, at the time of calculating the value of `result`, no value has been set for `fruit` yet, so initialization occurs at the point of access.

# Streaming Objects `object()`

Similar to streaming arrays, this returns a stream of arrays composed of the key and value of each entry.

```shell
$ xa '{a: 1; b: 2; c: 3}()'
# [a;1]
# [b;2]
# [c;3]
```

---

The following is an example of transforming an object into one where each key has `z` appended to the end and each value is multiplied by 10.

```shell
$ xa '{a: 1; b: 2; c: 3}() | (_.0 & "z": _.1 * 10) >> TO_OBJECT'
# {az:10;bz:20;cz:30}
```

# Object Invocation

When you perform a function call like `object(key)` on an object, it retrieves that element.

`key` is evaluated as a string.

If `key` is a stream, it returns a stream that retrieves elements by stringifying each element.

```shell
$ xa '{a: 1; b: 2; c: 3}("b")'
# 2

$ xa '{a: 1; b: 2; c: 3}("b", "a")'
# 2
# 1

$ xa '"b", "a", "c" >> {a: 1; b: 2; c: 3}'
# 2
# 1
# 3
```

## Overriding Object Invocation

Object element access is actually a call to the `_(__)` method and can be overridden.

This allows you to create objects that behave like functions.

```shell
$ xa '
  adder := {
    `_(__)`: this, a, b -> a + b
  }{}
  adder(10; 20)
'
# 30

$ xa '
  adder := {
    `_(__)`: {
      `_(__)`: this2, this1, a, b -> a + b
    }{}
  }{}
  adder(10; 20)
'
# 30
```

## Assignment to Object Invocation

Assignment invocation like `object(key) = value` is possible.

`key` is evaluated as a string.

```shell
$ xa '
  obj := {fruit: "apple"}
  obj("fruit") = "banana"
  obj.fruit
'
# banana
```

## Overriding Assignment to Object Invocation

Like object invocation, assignment operations can also be overridden with the `_(__)=_` method.

## Property Access to Objects

`object.key` retrieves an element of an object.

If `key` is an identifier, it is evaluated as the string of the identifier itself, not as a variable reference.

To perform property access with an arbitrary expression, enclose the `key` part in parentheses like `object.(key)`.

## Assignment to Property Access to Objects

`object.key = value` assigns a value to an element of an object.

```shell
$ xa '
  object := {
    a: "one"
    b: "two"
    c: "three"
  }

  object.b = 99999

  object
'
# {a:one;b:99999;c:three}
```

If the key does not yet exist in that object, it is added anew.

## Deleting Keys from Objects

`object -= key` removes a key from an object.

```shell
$ xa '
  object := {a: "apple"; b: "banana"; c: "cherry"}
  object -= "b"
  object
'
# {a:apple;c:cherry}
```

---

If the key to delete does not exist, nothing happens.

```shell
$ xa '
  object := {a: "apple"; b: "banana"; c: "cherry"}
  object -= "d"
  object
'
# {a:apple;b:banana;c:cherry}
```

---

If the right-hand side is a stream, key deletion is performed for each element.

```shell
$ xa '
  object := {a: "apple"; b: "banana"; c: "cherry"}
  object -= "a", "c"
  object
'
# {b:banana}
```
