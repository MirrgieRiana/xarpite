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

以下のコマンドでXarpiteを `./xarpite/` 以下にダウンロードします。

```sh
curl -s https://mirrgieriana.github.io/xarpite/download.sh | bash
```

以下のコマンドでダウンロードしたXarpiteの動作を確認できます。

```sh
$ ./xarpite/xarpite -e ' "Hello, World!" '
Hello, World!
```

### 環境にインストール

以下のコマンドでXarpiteを任意のディレクトリに展開し、任意のディレクトリに実行ファイルへのリンクを作成します。

```sh
curl -s https://mirrgieriana.github.io/xarpite/install.sh | bash -s -- <install_dir> <bin_dir>
```

---

以下のコマンドはユーザー環境にインストールする例です。

```sh
curl -s https://mirrgieriana.github.io/xarpite/install.sh | bash -s -- ~/.local/share/xarpite ~/.local/bin
```

---

以下のコマンドはシステム全体にインストールする例です。

```sh
curl -s https://mirrgieriana.github.io/xarpite/install.sh | sudo bash -s -- /usr/local/lib/xarpite /usr/local/bin
```
