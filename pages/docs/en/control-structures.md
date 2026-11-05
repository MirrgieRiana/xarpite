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

See Boolean for details.

### Loops

Pipe operators can be used to express loops.

See Stream for details.

### Labels and Returns

Label and return operators allow you to break out of arbitrary locations.

See Jump for details.

### Exception Mechanism

Throw and catch operators allow you to throw and catch values.

See Jump for details.

### Staticization Operator `$=expression`

The staticization operator `$=expression` performs lazy memoization of `expression`.

Storage for memoization is allocated as an anonymous variable at the top level of the source code.

This guarantees identity within the same compilation unit and isolation between different compilation units.

Evaluation of `expression` is deferred until execution first reaches it and uses the scope at that time.

Subsequent evaluations reuse the value from the first evaluation.

---

This operator helps save resources by avoiding repeated evaluation of expressions that do not depend on context.

```shell
$ xa '$=(1 + 2)'
# 3

$ xa ' ("abc123def" =~ REGEX.new(%>^[a-z]+([0-9]+)[a-z]+$<%).$=).1 '
# 123

$ xa '
  time := 0

  getCachedTime := () -> time.$=

  time = 100
  cachedTime1 := getCachedTime()

  time = 200
  cachedTime2 := getCachedTime()

  [cachedTime1, cachedTime2]
'
# [100;100]
```

---

Occurrences at different positions in the source code have independent storage, even if their contents are identical.

```shell
$ xa '
  time := 0

  getCachedTime1 := () -> time.$=
  getCachedTime2 := () -> time.$=

  time = 100
  cachedTime1 := getCachedTime1()

  time = 200
  cachedTime2 := getCachedTime2()

  [cachedTime1, cachedTime2]
'
# [100;200]
```

---

Evaluating the script itself again allocates independent storage, even for the same position in identical source code.

```shell
$ xa '
  getCachedTimeFactory := timeGetter -> XA(%>
    timeGetter -> () -> timeGetter().$=
  <%)(timeGetter)

  time := 0

  getCachedTime1 := getCachedTimeFactory(() -> time)
  getCachedTime2 := getCachedTimeFactory(() -> time)

  time = 100
  cachedTime1 := getCachedTime1()

  time = 200
  cachedTime2 := getCachedTime2()

  [cachedTime1, cachedTime2]
'
# [100;200]
```

---

The same instance identity guarantee also applies to mutable objects.

```shell
$ xa '
  getAndIncrement := () -> (
    counter := { value: 0 }.$=
    counter.value++
  )

  [getAndIncrement(), getAndIncrement(), getAndIncrement()]
'
# [0;1;2]
```

This can be understood as approximately the following transformation.

```shell
$ xa '
  _tmp1 := NULL

  getAndIncrement := () -> (
    counter := (
      _tmp1 == NULL && (_tmp1 = { value: 0 })
      _tmp1
    )
    counter.value++
  )

  [getAndIncrement(), getAndIncrement(), getAndIncrement()]
'
# [0;1;2]
```

---

If the result is a stream, that stream is resolved.

---

If another coroutine reaches the same occurrence during the first evaluation, it waits for that evaluation to finish.

---

If evaluation is interrupted by an exception or similar event, no result is stored, and the next access retries evaluation.

## Control Functions

### `WHILE`: Conditional Loop

`WHILE(condition: () -> BOOLEAN; block: () -> VALUE): NULL`

Repeatedly executes `block` while `condition` returns true.

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

### `WHILE2`: Conditional Loop

`WHILE2(condition(): BOOLEAN; block(): VALUE): NULL`

Repeatedly executes `block` while `condition` returns true.

Equivalent to `WHILE`, but receives arguments as pass-by-formula arguments.

```shell
$ xa '
  i := 0
  WHILE2 [ i < 5 ] ((
    OUT << i
    i = i + 1
  ))
'
# 0
# 1
# 2
# 3
# 4
# NULL
```

### `TRY`: Exception Catching

`<T> TRY(block: () -> T): PROMISE<T>`

Executes `block` on the spot and returns the result as a `PROMISE`.

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

```shell
$ xa '
  promise := TRY ( =>
    !! "Error"
  )
  promise::await() !? ( e => "Caught: $e" )
'
# Caught: Error
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

If the return value of `block` is a stream, it will be resolved.

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

---

`TRY` does not catch returns.

```shell
$ xa '
  (
    TRY ( =>
      label!! "returned"
    )
    "not returned"
  ) !: label
'
# returned
```

### `TRY2`: Exception Catching

`<T> TRY2(block(): T): PROMISE<T>`

Executes `block` on the spot and returns the result as a `PROMISE`.

Equivalent to `TRY`, but receives the argument as a pass-by-formula argument.

```shell
$ xa '
  promise := TRY2 ((
    "Success"
  ))
  promise::await()
'
# Success
```
