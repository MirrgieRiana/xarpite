---
title: "スクリプト"
---

# スクリプト

このページでは、Xarpiteリポジトリの `scripts` ディレクトリにある開発用スクリプトについて説明します。

## `get-version.sh` バージョン判定

```
Usage: ./scripts/get-version.sh
```

Gitリポジトリの状態からバージョン番号を判定し、標準出力に出力するシェルスクリプトです。

### バージョン判定の仕様

バージョンタグは `v1.2.3` の形式のみを受け付けます。`v1.2.3-alpha` などのサフィックス付きタグは無視されます。

#### 1. HEADにバージョンタグがある場合

HEADのコミットに `v1.2.3` 形式のタグが付いている場合、先頭の `v` を除いたバージョン番号を出力します。

```shell
$ git tag v1.2.3
$ ./scripts/get-version.sh
# 1.2.3
```

#### 2. 祖先のコミットにバージョンタグがある場合

HEADの祖先のコミットのうち、最も新しいコミットに付けられているバージョンタグを基準として、HEADがそこからどれだけ進んでいるかと、コミットのハッシュを含むバージョン番号を出力します。

フォーマット: `<version>+<commit_count>.g<hash>`

```shell
$ git tag v1.2.3
$ git commit --allow-empty -m "New commit"
$ git commit --allow-empty -m "Another commit"
$ ./scripts/get-version.sh
# 1.2.3+2.g1234abc
```

#### 3. バージョンタグが見つからない場合（浅いクローン）

リポジトリが浅いクローン（shallow clone）の場合、100件のコミットを追加で取得し、再度バージョンタグを探します。

#### 4. バージョンタグが見つからない場合

リポジトリが浅いクローンでなく、バージョンタグが見つからない場合は、`0.0.0` をベースバージョンとし、HEADとその祖先のコミット数を含むバージョン番号を出力します。

```shell
$ ./scripts/get-version.sh
# 0.0.0+42.g1234abc
```

### リターンコード

- `0`: 正常終了
- `1`: エラー（Gitリポジトリでない場合など）

### 使用例

```shell
# 現在のバージョンを取得
VERSION=$(./scripts/get-version.sh)
echo "Current version: $VERSION"

# ビルド時にバージョンを埋め込む
./scripts/get-version.sh > version.txt
```
