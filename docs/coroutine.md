---
title: "Coroutines"
---

<!-- toc -->

# Coroutines

Coroutines are a programming concept consisting of function suspension (suspend) and resumption, and the spawning of asynchronous processing (coroutine launch).

## Launching Coroutines

You can launch a new coroutine using the `LAUNCH` function.

### `LAUNCH`: Launch a New Coroutine

`<T> LAUNCH(function: () -> T): PROMISE<T>`

Launches `function` asynchronously as a coroutine.

The launched coroutine is executed when the thread that called `LAUNCH` next suspends.

This function returns a `PROMISE` that stores the return value of `function` or the exception thrown within `function`.

```shell
$ xa '
  promise := LAUNCH ( =>
    "apple"
  )
  promise::await()
'
# apple
```

---

`function` is launched independently of the caller and is executed as soon as the calling thread is suspended.

```shell
$ xa '
  result := PROMISE.new()
  LAUNCH ( =>
    result::complete("apple")
  )
  result::await()
'
# apple
```

---

If the return value of `function` is a stream, it automatically iterates only once, holds a copy of the element sequence, and returns a copied stream upon `await`.

Therefore, the processing at the end of the `LAUNCH` block is always executed exactly once in any situation.

```shell
$ xa '
  promises := [PROMISE.new(), PROMISE.new(), PROMISE.new()]
  LAUNCH ( =>
    0 .. 2 | (
      promises(_)::complete(_ * 10)
    )
  )
  promises(0)::await(), promises(1)::await(), promises(2)::await()
'
# 0
# 10
# 20
```

```shell
$ xa '
  counter := 0
  promise := LAUNCH ( =>
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

Here is a sample using `LAUNCH` to asynchronously accept commands from standard input.

If you remove the first block part, the program will actually terminate with the user's `stop` command.

```shell
$ { sleep 0.5; echo stop; } | xa -q '
  stop := PROMISE.new()
  LAUNCH ( =>
    IN | (
      _ == "stop" && (
        OUT << "Stopping..."
        stop::complete()
        break!!
      )
    ) !: break
  )
  LOOP | i, _ => (
    stop::isCompleted() && break!!
    SLEEP << 100
  ) !: break
  OUT << "Stopped!"
'
# Stopping...
# Stopped!
```

## `PROMISE`: Asynchronous Result Container

`PROMISE` is a container whose contents are determined with delay.

### `new`: Generate a New `PROMISE`

`<T> PROMISE.new(): PROMISE<T>`

Generates a new incomplete `PROMISE`.

### `complete`: Complete a `PROMISE`

`<T> PROMISE<T>::complete([value: T]): NULL`

Completes the `PROMISE` with the contents of `VALUE`.

If `value` is omitted, the `PROMISE` is completed with `NULL` as its contents.

### `fail`: Complete a `PROMISE` as Failed

`<T> PROMISE<T>::fail([error: VALUE]): NULL`

Completes the `PROMISE` as failed with `error`.

### `await`: Wait for `PROMISE` Completion and Retrieve Contents

`<T> PROMISE<T>::await(): T`

Waits until the contents of the `PROMISE` are complete and returns the contents.

---

If the `PROMISE` is completed as failed, `await` throws that exception.

```shell
$ xa '
  promise := PROMISE.new()
  promise::fail("ERROR!!")
  promise::await() !? (e => e)
'
# ERROR!!
```

### `isCompleted`: Check `PROMISE` Completion Status

`<T> PROMISE<T>::isCompleted(): BOOLEAN`

Returns whether the `PROMISE` is completed or completed as failed.

## `SLEEP`: Suspend Processing for a Specified Time

`SLEEP([milliseconds: NUMBER]): NULL`

Suspends processing for `milliseconds`.

This function does not block the thread but suspends the function.

If `milliseconds` is 0 or omitted, the function suspends once and returns immediately.

---

In the following sample code, `Hello, world!` is output after 1 second from execution.

```shell
$ xa '
  SLEEP(1000)
  "Hello, world!"
'
# Hello, world!
```

## `GENERATE`: Generate Stream from Function

`GENERATE(generator: (yield: (value: VALUE) -> NULL) -> NULL | STREAM): STREAM<VALUE>`

Executes the generator function of the first argument and returns the values passed to the `yield` function within that function as a stream.

If the `yield` function returns a stream, that stream is iterated only once.

The `yield` function suspends when called.

```shell
$ xa '
  GENERATE ( yield =>
    yield << 1
    yield << 2
    yield << 3
  )
'
# 1
# 2
# 3
```
