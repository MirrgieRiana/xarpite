# General Rules

## Conversation

### Follow the original prompt

**If the pull request has an original prompt or issue, you must not reference any non-original or AI-generated text, such as the title and summary, as they may contain misleading specification.**

### Follow the User’s Natural Language

When interacting with people on issues or pull requests, you must always write your natural-language text in the natural-language that the person normally uses.

Scope

- Including: Titles, descriptions, summaries, progress updates, and any other natural-language text on an issue or pull request.
- Including: Any comments and replies on GitHub.
- Including: Your thought-process text.
- Excluding: The contents of files that are part of commits, and commit metadata such as commit titles and descriptions.

Who to Follow

- When replying to someone, you must follow that user’s natural-language.
- When acting in a space managed by a human, you must follow that person’s natural-language.
- When acting in a space managed by an AI, you must follow the natural-language of the human who provided the prompt to that AI.

If you find existing natural-language text that violates this rule, you must fix it immediately. In particular, you must keep in mind that an AI will always initialize the pull request title and description in English, ignoring the natural-language of the original prompt and the original issue.

### Conversational Responses

Before you finish working on a pull request, you must explain the your work in the pull request.

### Declaration of Compliance with this Instructions

If you comply with the contents of this file, you must declare that you comply with this file when posting your first message in a conversation.

## Edit

## Consistency of Writing Style

Whenever you edit any text in this repository, you must first look for structurally similar sections within the repository and make a best effort to keep the style consistent—code formatting, layout, phrasing, and any other aspects of the writing.

## Execution

### Commit frequently

To ensure steady progress, you must:

- **Commit at least once every five minutes.**
- Divide your work into short steps based on this frequency.
- Each commit should represent a meaningful chunk of work.
- These are not orders that interrupt the execution in the middle of your task.
- **You must fully perform the given orders.**

# リポジトリ固有の指示

## 編集

### テスト

Xarpiteにはテストコードが存在します。
すべての機能はテストコードを伴い、テストを通過しなければなりません。

### ドキュメント

このプロジェクトには日本語ドキュメントが存在します。
すべての機能は `/docs` 以下に配置されている日本語ドキュメントの適切な位置に記載されなければなりません。

### 新機能の挿入位置

新しい機能を追加する場合、あなたはそれがどのソースコードに所属し、どの位置にあるべきかを必ず入念に検討しなければなりません。

## ビルドと実行

このプロジェクトは `gradlew build` でビルドできます。
ただし、js版のビルドに相当時間がかかるため、通常の使用は推奨されません。

プラットフォームを問わない機能のテストには `gradlew :jvmTest` を使うことが推奨されます。

## 諸命令

### GitHub Copilot実装プルリクエスト規定

以下の条件に適合する場合、あなたの命令は [copilot-implementation-pr-instructions.md](./copilot-implementation-pr-instructions.md) にある通りです。

- あなたはGitHub CopilotのAIである。
- あなたはプルリクエストにアサインされた。
- 直近の空でないコミットの内容が、日本語版ドキュメントへの加筆のみである。
- ユーザーはあなたに対して具体的な命令を行っていない。
