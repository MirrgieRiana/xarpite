# Xarpite ドキュメント - 目次（TOC）機能

## 概要

Xarpiteドキュメントサイトは、JekyllとKramdownの組み込み機能を使用して、ドキュメントページの目次（TOC）を自動生成する機能をサポートしています。

## ドキュメントページでTOCを有効にする方法

ドキュメントページに自動生成される目次を追加するには:

### 1. Front Matter設定を追加

Markdownファイルのfront matterに`toc: true`を追加してください:

```yaml
---
title: "ページタイトル"
toc: true
---
```

### 2. これだけです！

目次は自動的にドキュメントの冒頭に挿入されます。**手動でincludeステートメントを追加する必要はありません！**

レイアウトが`toc: true`フラグを自動的に検出し、適切なTOCテンプレートを挿入します。

### 3. 見出し階層を構造化

ドキュメントで適切な見出し階層を使用してください:
- `#` トップレベルセクション
- `##` サブセクション
- `###` サブサブセクション

TOCはこれらの見出し（デフォルトではレベル1〜3）から自動的に生成されます。

## 例

**日本語ドキュメントページ:**
```markdown
---
title: "組み込み関数"
toc: true
---

# 数学系関数

## ABS

絶対値関数...

## SQRT

平方根関数...

# ストリーム系関数

## MAP

マップ関数...
```

## 設定

TOC機能は`_config.yml`で設定されています:

```yaml
kramdown:
  auto_ids: true
  toc_levels: 1..3
```

- `auto_ids: true` - 見出しに自動的にIDを生成
- `toc_levels: 1..3` - レベル1からレベル3までの見出しをTOCに含める

## スタイリング

TOCスタイリングは`/assets/css/style.css`の`.table-of-contents`および`#markdown-toc`セレクタで定義されています。TOCの特徴:

- 赤いアクセントボーダー付きの明るい背景
- 階層的インデント
- リンクのホバー効果
- 各項目の赤い矢印インジケーター

## 仕組み

TOCシステムは以下で構成されています:

1. **レイアウト統合** (`pages/_layouts/default.html`) - front matterの`toc: true`を自動検出し、TOC includeを挿入
2. **TOCテンプレート** (`pages/_includes/toc-ja.md`) - 日本語の見出しでTOCを生成
3. **Kramdown処理** - `{:toc}`マーカーがKramdownに見出しからTOCを生成するよう指示
4. **CSSスタイリング** (`pages/assets/css/style.css`) - 視覚的スタイリングを提供

## 変更されたファイル

- `pages/_config.yml` - Kramdown TOC設定を追加
- `pages/_layouts/default.html` - front matterに基づいた自動TOC挿入を追加
- `pages/_includes/toc-ja.md` - 日本語用TOC includeテンプレートを作成
- `pages/assets/css/style.css` - TOCスタイリングを追加
- ドキュメントファイル (`builtin.md`, `cli.md`, `syntax.md`) - front matterに`toc: true`のみで設定

## 利点

1. **完全自動化** - front matterで`toc: true`を設定するだけで動作、手動挿入不要
2. **一貫性** - すべてのTOCが同じフォーマットとスタイルに従う
3. **保守性** - 見出しが変更されるとTOCが自動的に更新される
4. **手作業不要** - 手動でTOCを作成、更新、挿入する必要がない
5. **カスタマイズ可能** - TOCの深さ、スタイリング、配置を簡単に調整可能
