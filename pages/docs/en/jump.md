---
title: "Jump"
---

# Jump

<!-- toc -->

# Labels and Returns

You can attach labels to expression elements and explicitly return values to those labels, allowing early exit from the process.

## Simple Example

The label operator `formula !: label` attaches a label to the expression `formula`.

Within `formula`, you can use the return operator `label!! value` to return a value to that label.

```shell
$ xa '
  (
    label!! 10
    20
  ) !: label
'
# 10
```

---

Labels are managed in a separate table from variables and can only be referenced from the left operand of the return operator.

---

The label operator `formula !: label` has a very distinctive appearance, intentionally designed to be similar to the Elvis operator `value ?: default`.

Both operators can have special states on the left side that are handled on the right side.

However, the label operator has low binding precedence, allowing `formula` to include pipes `|` or right-execution pipes `>>`.

---

The return operator `label!! value` provides decent readability when `label` is a string like `return`, as in `return!! "Result"`.

The `!!` operator's appearance corresponds to the throw operator `!! error`, and their behaviors are also similar.

## Escaping from Loops

Return can also be used to escape from loops mid-iteration.

In the following example, we loop through integers from 1 to 100, searching for a number divisible by 2, 3, and 5.

```shell
$ xa '
  (
    1 .. 100 | (
      (_ % 2 == 0 && _ % 3 == 0 && _ % 5 == 0) && found!! _
    )
    NULL
  ) !: found
'
# 30
```

## Return from Inside Lambda Expressions

You can also return to an outer label from inside a lambda expression passed to a function.

```shell
$ xa '
  forEach := array, block -> array() | *block
  (
    array := [1 .. 100]
    forEach[array] ( _ =>
      (_ % 2 == 0 && _ % 3 == 0 && _ % 5 == 0) && found!! _
    )
    NULL
  ) !: found
'
# 30
```

## Side Effects of Streams

If the return value of `formula` in the label operator is a stream, it is always evaluated exactly once on the spot, and side effects also occur exactly once.

```shell
$ xa '
  count := 0
  stream := (
    1 .. 3 | (
      count = count + 1
      count
    )
  ) !: break
  [stream], [stream], [stream], count
'
# [1;2;3]
# [1;2;3]
# [1;2;3]
# 3
```

---

This is also true when the stream that is the return value of the label is never evaluated.

```shell
$ xa '
  count := 0
  stream := (
    1 .. 3 | (
      count = count + 1
      count
    )
  ) !: break
  count
'
# 3
```

---

To achieve this behavior, a label that is an expression (getter) caches the element sequence of the stream returned by `formula` in an array.

This processing can be suppressed by executing the label as a statement (runner), which can save memory.

```shell
$ xa '
  (
    1 .. 1000 | (
      [1 .. 1000]
    )
  ) !: break;
'
# NULL
```

## Omitting Return Value

The return operator can also be written as `label!!` with the `value` clause omitted.

In this case, `NULL` is returned.

```shell
$ xa '
  (
    label!!
    20
  ) !: label
'
# NULL
```

## Binding Precedence of Return and Label Operators

The return operator is treated as a type of literal operator, and the `value` clause can contain comma operators and any expression with higher binding precedence.

In the following example, the `value` clause directly contains the comma operator.

```shell
$ xa '
  (
    value := 10
    value > 5 && result!! "Larger than 5:", value
    "Not larger than 5:", value
  ) !: result
'
# Larger than 5:
# 10
```

---

On the other hand, when co-occurring with a label operator, the return operator can reference the label by the outer label operator.

This is because the binding precedence of the label operator is lower than the return operator and at the same level as the right-execution pipe.

```shell
$ xa '
  result!! "123" !: result
'
# 123
```

---

Only identifiers can be specified on the left side of the return operator.

Also, when a prefix operator is applied to the return operator, that prefix operator receives the entire return operator.

The following example shows how to make the entire return operator into a function using the function operator.

```shell
$ xa '
  (
    fail := \break!! "Failed: $_"

    1 == 1 || fail("1 is not equal to 1")
    1 == 2 || fail("1 is not equal to 2")

    "Success"
  ) !: break
'
# Failed: 1 is not equal to 2
```

---

The label operator `!:` has the same binding precedence level as the right-execution pipe `>>`.

The left side can take pipe `|` or right-execution pipe `>>`, and pipes or right-execution pipes can also take label operators on their left side.

In the following example, the label operator `!:` takes the entire loop by the pipe to its left, so the return `!!` causes the loop to escape midway.

And the pipe on the right side can take the entire label operator.

```shell
$ xa '1 .. 100 | (_ %% 3 && _ %% 5) && found!! _ !: found | _ * 10'
# 150
```

# Exception Mechanism

The exception mechanism is a system for returning values through paths other than expression return values.

The exception mechanism consists of throwing and catching values.

Throwing can be done with values of any type, and the thrown value (= exception value) propagates across expression and function call hierarchies until it is caught.

If an exception value is not caught, the dispatcher at the top of the call hierarchy handles the exception.

The exception mechanism is often used to throw values defined as errors to represent processing "failures," but it is not necessarily limited to this use.

You may use the exception mechanism simply as a control structure to return values from deep inside function or expression call hierarchies to the outside.

## Throw Operator

In Xarpite, value throwing is done with the throw operator `!! value`.

The value to throw can be of any type.

The thrown value is passed to the right side of the catch operator `try !? catch`.

```shell
$ xa '
  (
    !! 12345
  ) !? ( e =>
    "Error: $e"
  )
'
# Error: 12345
```

### Omitting Throw Value

The throw operator can also be written simply as `!!` with the `value` clause omitted.

In this case, `NULL` is thrown.

```shell
$ xa '(!!) !? (e => "Error: $e")'
# Error: NULL
```

## Catch Operator

The catch operator `try !? catch` returns the value from the `try` clause if no value is thrown, or the value from the `catch` clause if a value is thrown.

The value to be thrown can be of any type.

```shell
$ xa '"OK" !? "Failed"'
# OK

$ xa '(!! "Error") !? "Failed"'
# Failed
```

### Receiving Thrown Values

With the catch operator with argument `try !? (error => catch)`, you can receive the thrown value.

```shell
$ xa '
  (
    !! "Error, world!"
  ) !? ( e =>
    "ERROR: $e"
  )
'
# ERROR: Error, world!
```

### Stream Resolution

If the return value of the `try` clause is a stream, that stream is resolved.

```shell
$ xa '
  count := 0

  stream := (
    1 .. 3 | (
      count++
      count
    )
  ) !? "ERROR"

  [stream], [stream], [stream], count
'
# [1;2;3]
# [1;2;3]
# [1;2;3]
# 3
```

---

As a result, even if the stream that is the return value of the catch operator is never evaluated, the side effects of the `try` clause always occur exactly once.

```shell
$ xa '
  count := 0

  stream := (
    1 .. 3 | (
      count++
      count
    )
  ) !? "ERROR"

  count
'
# 3
```

---

If an exception value is thrown inside the `try` clause's stream, it is also caught, and the return value of the catch operator becomes the return value of the `catch` clause.

```shell
$ xa '
  count := 0

  stream := (
    1 .. 3 | (
      _ == 3 && !! "The last element error"
      count++
      count
    )
  ) !? ( e =>
    "ERROR: $e"
  )

  [stream], count
'
# [ERROR: The last element error]
# 2
```

### Statement-Level Catch Operator

The catch operator functions at both expression and statement levels.

A catch operator written at statement level attempts to interpret both sides as statements.

At the statement level, the `try` clause's stream is resolved, and side effects also occur only once.

```shell
$ xa '
  count := 0

  (
    1 .. 3 | (
      count++
    )
  ) !? "ERROR"

  count
'
# 3
```

### Binding Precedence of Throw and Catch Operators

The throw operator `!! value` has the same binding rules as the return operator `label!! value`, and the `value` clause can contain comma operators and any expression with higher binding precedence.

In the following example, the `value` clause directly contains the comma operator.

```shell
$ xa '
  (
    value := 10
    value > 5 && !! "Larger than 5:", value
    "Not larger than 5:", value
  ) !? (e => e)
'
# Larger than 5:
# 10
```

---

**On the other hand, the binding precedence of the catch operator `try !? catch` is at the same level as the Elvis operator `value ?: default`.**

This is because, unlike the label operator `formula !: label` where the return operator is always written inside `formula`, the `try` in the actual catch operator `try !? catch` is often a single function call or operator.

Xarpite's catch operator is not a try-catch statement as in typical programming languages, but is better understood as similar to the ternary operator.

For this reason, the catch operator has higher binding precedence than the comma.

```shell
$ xa '
  evenOrThrow := x -> x % 2 == 0 || !! "Not even: $x"

  x := 5
  "Number: $x", evenOrThrow(x) !? (e => "Caught error: $e"), "Mod 2: $(x % 2)"
'
# Number: 5
# Caught error: Not even: 5
# Mod 2: 1
```

---

The `try` in the catch operator `try !? catch` can include up to logical operators but cannot include pipe operators.

To include pipe operators, you need to enclose them in parentheses.
