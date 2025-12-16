# 会話

## Follow the user’s natural language

When replying to a user, or when setting natural-language text for something attributable to a specific user, you must first determine the natural language that user speaks and follow it, unless the user provides explicit language instructions.

If the pull request includes the original prompt, use it as a clue for determining the user’s natural language.

# プロジェクトの一貫性

## テスト

Xarpiteにはテストコードが存在します。
すべての機能はテストコードを伴い、テストを通過しなければなりません。

## ドキュメント

このプロジェクトには日本語ドキュメントが存在します。
すべての機能は `/docs` 以下に配置されている日本語ドキュメントの適切な位置に記載されなければなりません。

# 体裁の一貫性

## 新機能の挿入位置

新しい機能を追加する場合、あなたはそれがどのソースコードに所属し、どの位置にあるべきかを必ず入念に検討しなければなりません。

## フォーマットの一貫性

あなたがプログラム、ドキュメントもしくは設定ファイルなどに新しいコードを追加するとき、あなたは必ず既存の類似する部分のフォーマットや表現スタイルを厳密に尊重しなければなりません。

# ビルドと実行

このプロジェクトは `gradlew build` でビルドできます。
ただし、js版のビルドに相当時間がかかるため、通常の使用は推奨されません。

プラットフォームを問わない機能のテストには `gradlew :jvmTest` を使うことが推奨されます。

# 諸命令

## GitHub Copilot実装プルリクエスト規定

以下の条件に適合する場合、あなたの命令は [copilot-implementation-pr-instructions.md](./copilot-implementation-pr-instructions.md) にある通りです。

- あなたはGitHub CopilotのAIである。
- あなたはプルリクエストにアサインされた。
- 直近の空でないコミットの内容が、日本語版ドキュメントへの加筆のみである。
- ユーザーはあなたに対して具体的な命令を行っていない。
