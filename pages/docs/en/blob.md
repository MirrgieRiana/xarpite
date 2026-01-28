---
title: "BLOB"
---

<!-- toc -->

# BLOB

BLOB is a type that holds byte sequences, and some APIs handle it for fast processing of binary data.

The byte sequence stored in a BLOB is managed as unsigned 8-bit integers.

## BLOB Composition

`BLOB_LIKE := STREAM<NUMBER | ARRAY<BLOB_LIKE> | BLOB>`

BLOB composition is the rule for generating a single BLOB from `BLOB_LIKE`.

`BLOB_LIKE` is not an actual class but a convenience type representing types that can be converted to BLOB.

- If `BLOB_LIKE` is a number, it is added to the new BLOB after rounding the decimal part and removing bits other than the lower 8 bits.
- If `BLOB_LIKE` is an array, each element is recursively treated as `BLOB_LIKE`. This allows arrays to contain BLOBs or other arrays.
- If `BLOB_LIKE` is a BLOB, it is copied as-is to the new BLOB instance.
- If `BLOB_LIKE` is a stream, each element is added to the new BLOB using the above methods.

---

Examples with arrays containing arrays or BLOBs:

```shell
$ xa 'BLOB.of([BLOB.of([1, 2]), BLOB.of([3, 4])])::toArray()'
# [1;2;3;4]
```

```shell
$ xa 'BLOB.of([[1, 2], [3, 4]])::toArray()'
# [1;2;3;4]
```

## `BLOB.of` Generating BLOB from Array

`BLOB.of(blobLike: BLOB_LIKE): BLOB`

Composes a new BLOB from `blobLike`.

```shell
$ xa '
  BLOB.of(
    [1, 0, -1],
    [256, 257],
    [1.4, 1.6],
  )
'
# BLOB.of([1;0;255;0;1;1;2])
```

## Getting Length

The `$#` operator can get the number of bytes in a BLOB.

See [Getting Length](./length.md) for details.

## Converting to Array

A BLOB can be directly converted to an array with `blob::toArray()`.

```shell
$ xa 'BLOB.of([1, 2, 3])::toArray()'
# [1;2;3]
```
