---
title: "制御構文"
---

<!-- toc -->

# 制御構文

## `WHILE`: 条件ループ

`<T> WHILE(condition: () -> BOOLEAN; block: () -> T): STREAM<T>`

`condition` が `TRUE` を返す間、 `block` を繰り返し実行し、その戻り値をストリームとして返します。

`condition` が最初から `FALSE` の場合、空のストリームを返します。

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

`block` の戻り値がストリームの場合、自動的に平坦化されます。

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

ラベル演算子と組み合わせることで、途中でループから脱出することもできます。

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
