---
title: "I/O"
---

<!-- toc -->

# I/O

I/O関連の機能を提供します。

## `FETCH`: URLからテキストコンテンツを取得

`FETCH(url: STRING): STRING`

`url` で指定されたURLからHTTPリクエストでテキストコンテンツを取得します。

レスポンスボディをUTF-8としてデコードして文字列として返します。

## `FETCHB`: URLからバイナリコンテンツを取得

`FETCHB(url: STRING): BLOB`

`url` で指定されたURLからHTTPリクエストでバイナリコンテンツを取得します。

レスポンスボディをBLOBとして返します。
