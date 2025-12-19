---
title: "スクリプト"
---

# スクリプト

このページでは、Xarpiteリポジトリの `scripts` ディレクトリにある開発用スクリプトについて説明します。

## `get-version.kts` バージョン判定

```
Usage: kotlin ./scripts/get-version.kts
```

Gitリポジトリの状態からバージョン番号を判定し、標準出力に出力するKotlinスクリプトです。

### 出力形式

- バージョン文字列は標準出力（stdout）に出力されます
- ログや説明は標準エラー出力（stderr）に出力されます
- 正規表現 `^v[0-9]+\.[0-9]+\.[0-9]+$` に一致するタグのみを対象とします（注釈付きタグ・軽量タグの両方に対応）
- `v1.2.3-alpha` や `v1.2.3-beta` などのサフィックス付きタグは無視されます

### バージョン判定の仕様

#### 1. 特殊ケース

以下の場合、`0.0.0+0.g0000000.dirty` を出力して終了コード 0 で終了します：

- git コマンドが見つからない場合
- git リポジトリではない場合
- HEAD が存在しない場合（初期コミット前など）

#### 2. 作業領域がクリーンでHEADにバージョンタグがある場合

作業領域に変更がなく、HEADのコミットに `v1.2.3` 形式のタグが付いている場合、先頭の `v` を除いたバージョン番号を出力します。

```shell
$ git tag v1.2.3
$ ./scripts/get-version.sh
# 1.2.3
```

#### 3. 祖先のコミットにバージョンタグがある場合

HEADの祖先のコミットのうち、最も新しいコミットに付けられているバージョンタグを基準として、HEADがそこからどれだけ進んでいるかと、コミットのハッシュを含むバージョン番号を出力します。

フォーマット: `<version>+<commit_count>.g<hash>` または `<version>+<commit_count>.g<hash>.dirty`

```shell
$ git tag v1.2.3
$ git commit --allow-empty -m "New commit"
$ git commit --allow-empty -m "Another commit"
$ ./scripts/get-version.sh
# 1.2.3+2.g1234abc
```

#### 4. バージョンタグが見つからない場合（浅いクローン）

リポジトリが浅いクローン（shallow clone）の場合、100件のコミットを追加で取得し、再度バージョンタグを探します。

#### 5. バージョンタグが見つからない場合

リポジトリが浅いクローンでなく、バージョンタグが見つからない場合は、`0.0.0` をベースバージョンとし、HEADとその祖先のコミット数を含むバージョン番号を出力します。

```shell
$ ./scripts/get-version.sh
# 0.0.0+42.g1234abc
```

### dirty判定

作業領域に変更がある場合（`git status --porcelain` が空でない場合）、バージョン文字列の末尾に `.dirty` が付与されます。

```shell
# 変更がある場合
$ echo "test" > newfile.txt
$ kotlin ./scripts/get-version.kts
# 1.2.3+2.g1234abc.dirty
```

### リターンコード

- `0`: 正常終了（すべてのケースで 0 を返します）

### 使用例

```shell
# 現在のバージョンを取得（ログを除外）
VERSION=$(kotlin ./scripts/get-version.kts 2>/dev/null)
echo "Current version: $VERSION"

# ビルド時にバージョンを埋め込む
kotlin ./scripts/get-version.kts > version.txt
```
