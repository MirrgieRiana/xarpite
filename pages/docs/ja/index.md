---
title: "Xarpiteドキュメント"
---

# Xarpiteドキュメント

Xarpite (xa) - ワンライナーのためのインタプリタ言語

<!-- toc -->

## 概要

Xarpiteはワンライナー向けに設計されたインタプリタ言語です。

このドキュメントでは、Xarpiteの文法、機能、使用方法についてサンプルを交えて説明します。

## ドキュメントの構成

メニューから各トピックをご覧ください。

## インストール

### カレントディレクトリにダウンロード

Xarpiteを `./xarpite` にダウンロードします。

```sh
curl -s https://mirrgieriana.github.io/xarpite/download.sh | bash
```

以下のコマンドでダウンロードされたXarpiteが動作することを確認できます。

```sh
$ ./xarpite/xarpite -e ' "Hello, World!!" '
Hello, World!!
```
