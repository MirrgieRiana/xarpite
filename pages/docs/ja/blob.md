---
title: "BLOB"
---

# BLOB

BLOBはバイト列を保持する型で、バイナリデータを高速に扱うために一部のAPIが扱います。

BLOBが格納するバイト列は符号なし8bit整数として管理されます。

## BLOBの合成

`BLOB_LIKE := STREAM<NUMBER | ARRAY<NUMBER> | BLOB>`

BLOBの合成は、 `BLOB_LIKE` から単一のBLOBを生成する際の規則です。

`BLOB_LIKE` は実際のクラスではなく、BLOBに変換することのできる型を表す便宜上の型です。

- `BLOB_LIKE` が数値の場合、小数点以下の四捨五入と下位8ビット以外のビットの削除が行われた状態で新しいBLOBに追加されます。
- `BLOB_LIKE` が配列の場合、各要素は数値として処理されます。
- `BLOB_LIKE` がBLOBの場合、そのまま新しいBLOBインスタンスにコピーされます。
- `BLOB_LIKE` がストリームの場合、各要素が上記の方法で新しいBLOBに追加されます。

## `BLOB.of` 配列からのBLOBの生成

`BLOB.of(blobLike: BLOB_LIKE): BLOB`

`blobLike` から新しいBLOBを合成します。

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

## 配列への変換

BLOBは `blob::toArray()` で直接配列に変換できます。

```shell
$ xa 'BLOB.of([1, 2, 3])::toArray()'
# [1;2;3]
```
