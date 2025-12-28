# GPG Signing for Maven Artifacts

このプロジェクトは、Maven アーティファクトに GPG 署名を付けることができます。

## ローカルでのテスト

ダミーの GPG キーを生成してテストする場合:

```bash
# ダミーキーを生成
bash scripts/generate-dummy-gpg-key.sh

# 環境変数を設定
export GPG_SIGNING_ZIP_BASE64=$(cat build/gpg-test/private-key-base64.txt)
export GPG_SIGNING_PASSPHRASE=""

# 署名付きでビルド
./gradlew publishXarpiteBinAllPublicationToBuildLocalRepository
```

生成されたファイル:
- `build/gpg-test/private-key.asc` - 秘密鍵 (ASCII armor形式)
- `build/gpg-test/public-key.asc` - 公開鍵 (ASCII armor形式)
- `build/gpg-test/private-key-base64.txt` - Base64エンコードされた秘密鍵 (環境変数用)

## CI/CD での使用

GitHub Actions などの CI/CD 環境で使用する場合、以下の手順で設定します:

### 1. GPG キーペアの生成

```bash
# 本番用のGPGキーを生成 (対話形式)
gpg --full-generate-key

# キーIDを確認
gpg --list-secret-keys --keyid-format LONG

# 秘密鍵をエクスポート
gpg --armor --export-secret-keys YOUR_KEY_ID > private-key.asc

# Base64エンコード
base64 -w 0 private-key.asc > private-key-base64.txt
```

### 2. GitHub Secrets への登録

リポジトリの Settings → Secrets and variables → Actions で以下を追加:

- `GPG_SIGNING_ZIP_BASE64`: `private-key-base64.txt` の内容
- `GPG_SIGNING_PASSPHRASE`: GPG キーのパスフレーズ

### 3. GitHub Actions での使用例

```yaml
- name: Publish with GPG signing
  env:
    GPG_SIGNING_ZIP_BASE64: ${{ secrets.GPG_SIGNING_ZIP_BASE64 }}
    GPG_SIGNING_PASSPHRASE: ${{ secrets.GPG_SIGNING_PASSPHRASE }}
  run: ./gradlew publishXarpiteBinAllPublicationToBuildLocalRepository
```

## 署名なしでのビルド

環境変数が設定されていない場合、署名はスキップされますが、ビルドは正常に完了します:

```bash
./gradlew publishXarpiteBinAllPublicationToBuildLocalRepository
```

## 生成されるファイル

署名が有効な場合、以下のファイルが生成されます:

```
build/maven/io/github/mirrgieriana/xarpite/xarpite-bin/unspecified/
├── xarpite-bin-unspecified-all.tar.gz
├── xarpite-bin-unspecified-all.tar.gz.asc          ← GPG署名
├── xarpite-bin-unspecified-all.tar.gz.asc.md5
├── xarpite-bin-unspecified-all.tar.gz.asc.sha1
├── xarpite-bin-unspecified-all.tar.gz.asc.sha256
├── xarpite-bin-unspecified-all.tar.gz.asc.sha512
├── xarpite-bin-unspecified-all.tar.gz.md5
├── xarpite-bin-unspecified-all.tar.gz.sha1
├── xarpite-bin-unspecified-all.tar.gz.sha256
├── xarpite-bin-unspecified-all.tar.gz.sha512
├── xarpite-bin-unspecified.pom
├── xarpite-bin-unspecified.pom.asc                  ← GPG署名
├── xarpite-bin-unspecified.pom.asc.md5
├── xarpite-bin-unspecified.pom.asc.sha1
├── xarpite-bin-unspecified.pom.asc.sha256
└── xarpite-bin-unspecified.pom.asc.sha512
```

## 署名の検証

```bash
# 公開鍵をインポート
gpg --import build/gpg-test/public-key.asc

# 署名を検証
gpg --verify \
  build/maven/io/github/mirrgieriana/xarpite/xarpite-bin/unspecified/xarpite-bin-unspecified-all.tar.gz.asc \
  build/maven/io/github/mirrgieriana/xarpite/xarpite-bin/unspecified/xarpite-bin-unspecified-all.tar.gz
```
