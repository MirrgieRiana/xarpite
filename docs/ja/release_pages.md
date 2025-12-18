---
title: "リリース成果物とPages成果物の比較"
---

# リリース成果物とPages成果物の比較

release workflow と pages workflow をローカルで同じ手順で実行し、生成物の構成を比較する。

## 再現手順の概要

- Release workflow  
  - `APP_VERSION=0.0.0-test ./gradlew clean build` で `build/bundleRelease` を生成。  
  - `docs` 配下で `bundle exec jekyll build` を実行（出力は `docs/_site`）。  
  - `_site` 直下の成果物を workflow と同じように `build/bundleRelease/` 直下へコピー。  
- Pages workflow  
  - `docs` 配下で `bundle exec jekyll build --destination ./_site/docs` を実行。  
  - 得られた `docs/_site` をそのまま Pages アーティファクトとして使用。

## 生成物のディレクトリ構成

### Release workflow（releaseブランチに同期される内容）

```
build/bundleRelease/
├── .gitignore
├── googlea59f33fe422494f1.html
├── index.md
├── install-jvm.sh
├── install-native.sh
├── install-node.sh
├── xarpite
├── assets/...
├── bin/
│   ├── native/xarpite
│   ├── jvm/xarpite-jvm.jar
│   └── node/…（.mjs群とpackage.json）
├── docs/…（Markdownソース一式）
├── ja/…（Jekyll生成済みHTML）
└── playground/…（ブラウザ用バンドル）
```

### Pages workflow（Pagesにデプロイされる内容）

```
docs/_site/
└── docs/
    ├── assets/...
    └── ja/…（Jekyll生成済みHTML）
```

## 主な違い

- release ブランチ向け出力は実行ファイル（`xarpite` と `bin/*`）や各エンジン用インストールスクリプト、ブラウザ版 playground まで含むが、Pages 出力は静的ドキュメントのみ。
- リリース成果物は `_site` の内容をルートに展開するため `ja/` や `assets/` がトップレベルに配置され、同じ階層に CLI ランチャーやバイナリと混在する。Pages では `docs/` プレフィックスの下にのみ HTML とアセットが置かれ、バイナリは一切含まれない。
- release 側には Markdown ソース（`docs/`）も同梱されるが、Pages には生成物のみが含まれる。
