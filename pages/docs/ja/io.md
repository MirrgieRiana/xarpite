---
title: "IO"
---

<!-- toc -->

# IO

プログラム外部とのデータの入出力に関する機能を提供します。

## 組み込み関数

### `FETCH`: URLからテキストコンテンツを取得

`FETCH(url: STRING): STRING`

`url` からGETリクエストによってUTF-8テキストコンテンツを取得します。

### `FETCHB`: URLからバイナリコンテンツを取得

`FETCHB(url: STRING): BLOB`

`url` からGETリクエストによってバイナリコンテンツを取得します。
