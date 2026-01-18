---
title: "Control Structures"
---

# Control Structures

Xarpite does not have syntax identical to "if statements" or "while statements" found in many programming languages.

Instead, it uses operators and functions to achieve similar control flow.

<!-- toc -->

## Control Operators

### Conditional Branching

Logical OR, logical AND, and ternary operators can be used for conditional branching.

See [Boolean](boolean.md) for details.

### Loops

Pipe operators can be used to express loops.

See [Stream](stream.md) for details.

### Labels and Returns

Label and return operators allow you to break out of arbitrary locations.

See [Jump](jump.md) for details.

### Error Handling

Throw and catch operators allow you to throw and catch errors.

See [Jump](jump.md) for details.

## Control Functions

### `WHILE`: Conditional Loop

`WHILE(condition: () -> BOOLEAN; block: () -> VALUE): NULL`

Repeatedly executes `block` while `condition` returns `TRUE`.

This function reproduces the common "while statement".

Since this function is intended for controlling blocks with side effects, it intentionally discards the return value of `block`.

```shell
$ xa '
  i := 0
  WHILE [ => i < 5 ] ( =>
    OUT << i
    i = i + 1
  )
'
# 0
# 1
# 2
# 3
# 4
# NULL
```

---

By combining with label/return operators, you can also break out of the loop midway.

```shell
$ xa '
  i := 0
  WHILE [ => i < 5 ] ( =>
    i == 3 && break!!
    OUT << i
    i = i + 1
  ) !: break
'
# 0
# 1
# 2
# NULL
```

---

If `block` returns a stream, the stream is resolved and its result is discarded.

Therefore, the side effect of `block` always occurs exactly once.

```shell
$ xa -q '
  i := 0
  WHILE [ => i < 4 ] ( =>
    0 ~ 2 | (
      OUT << i
      i = i + 1
    )
  )
  NULL
'
# 0
# 1
# 2
# 3
```

### `TRY`: Exception Catching

`<T> TRY(block: () -> T): PROMISE<T>`

Executes `block` and returns the result as a `PROMISE`.

If `block` completes successfully, returns a resolved `PROMISE` with its return value.

If an exception is thrown within `block`, returns a rejected `PROMISE` with that exception.

```shell
$ xa '
  promise := TRY ( =>
    "Success"
  )
  promise::await()
'
# Success
```

---

When an exception is thrown, the `PROMISE` is returned in a rejected state.

```shell
$ xa '
  promise := TRY ( =>
    !! "Error occurred"
  )
  promise::await() !? (e => "Caught: $e")
'
# Caught: Error occurred
```

---

Since `TRY` returns a `PROMISE`, it can also be used as a result type without using the catch operator.

```shell
$ xa '
  result := TRY ( =>
    !! "Failed"
  )
  result::isCompleted()
'
# TRUE
```

---

If the return value of `block` is a stream, it is automatically iterated once, and a copy of the element sequence is retained.

Therefore, the final processing of the `TRY` block always executes exactly once under any circumstances.

```shell
$ xa '
  counter := 0
  promise := TRY ( =>
    1 .. 3 | (
      counter = counter + 1
      counter
    )
  )
  [promise::await()], [promise::await()], [promise::await()], counter
'
# [1;2;3]
# [1;2;3]
# [1;2;3]
# 3
```
