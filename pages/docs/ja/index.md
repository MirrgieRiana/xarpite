---
title: "Xarpiteドキュメント"
---

# Xarpiteドキュメント

Xarpite (xa) - ワンライナーのためのインタプリタ言語

<!-- toc -->

## 概要

Xarpiteはワンライナー向けに設計されたインタプリタ言語です。

このドキュメントでは、Xarpiteの文法、機能、使用方法についてサンプルを交えて説明します。

## インストール

### カレントディレクトリにダウンロード

Xarpiteを `./xarpite` にダウンロードします。

```shell
curl -s https://mirrgieriana.github.io/xarpite/download.sh | bash
```

これは `/usr/local/bin` にコマンドをインストールせずに、カレントディレクトリにXarpiteを配置したい場合に便利です。

インストールの確認は以下のコマンドで行えます:

```shell
./xarpite/xarpite -e '1 .. 9 | [1 .. _]'
```

## ドキュメントの構成

メニューから各トピックをご覧ください。
