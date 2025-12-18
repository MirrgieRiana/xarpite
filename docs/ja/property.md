---
title: "プロパティアクセス"
---

# プロパティアクセス

プロパティアクセスは、オブジェクト、配列、文字列などのデータ構造の「要素」を取得・設定するための構文です。

プロパティアクセスの具体的な挙動は、プロパティを提供するコンテナの型によって異なります。

---

以下はコンテナの型ごとのプロパティアクセスの一例です。

| コンテナの型   | プロパティアクセスの挙動      |
|----------|-------------------|
| `OBJECT` | キーによるプロパティの取得・設定  |
| `ARRAY`  | インデックスによる要素の取得・設定 |
| `STRING` | インデックスによる文字の取得    |

## プロパティアクセスの基本構文

`container.key` により、コンテナのプロパティを取得できます。

`container.key = value` により、コンテナのプロパティを設定できます。

## プロパティアクセスのオーバーライド

これらの操作は、 `container` の `_._` メソッドおよび `_._=_` メソッドをオーバーライドすることでカスタマイズできます。

```shell
$ xa -q '
  globalVariableTable := {}
  DelegatedObject := {
    `_._` : this, key        -> globalVariableTable."item_$key"
    `_._=_`: this, key, value -> globalVariableTable."item_$key" = value
  }
  delegatedObject := DelegatedObject{}

  delegatedObject.a = 100
  delegatedObject.b = delegatedObject.a + 23

  OUT << "globalVariableTable = $globalVariableTable"
  OUT << "delegatedObject = $delegatedObject"
'
# globalVariableTable = {item_a:100;item_b:123}
# delegatedObject = {}
```
