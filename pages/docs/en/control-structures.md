---
title: "Control Structures"
---

<!-- toc -->

# Control Structures

## `WHILE`: Conditional Loop

`<T> WHILE(condition: () -> BOOLEAN; block: () -> T): STREAM<T>`

Repeatedly executes `block` while `condition` returns `TRUE`, returning the results as a stream.

If `condition` is `FALSE` from the start, returns an empty stream.

```shell
$ xa '
  i := 0
  WHILE [ => i < 5 ] ( =>
    result := i
    i = i + 1
    result
  )
'
# 0
# 1
# 2
# 3
# 4
```

---

When the return value of `block` is a stream, it is automatically flattened.

```shell
$ xa '
  i := 0
  [WHILE [ => i < 3 ] ( =>
    i = i + 1
    1 .. i
  )]
'
# [1;1;2;1;2;3]
```

---

By combining with label operators, you can break out of the loop early.

```shell
$ xa '
  i := 0
  [WHILE [ => i < 100 ] ( =>
    i = i + 1
    i >= 5 && break!!
    i
  ) !: break]
'
# [1;2;3;4]
```
