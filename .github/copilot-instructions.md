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

## 全般

### 最終確認

**あなたは、どのような場合でも、作業の終了前に、すべてのインストラクション類を再度見直し、すべての文言に忠実に厳守した状態にしなければなりません。**

## 会話

### 自然言語

このリポジトリでは、あなたは以下を含む全域を自然で流暢な日本語で記述しなければなりません。

- Issueやプルリクエストのタイトル
- Issueやプルリクエストの説明文
- プルリクエストのプログレッション
- GitHub内のすべてのコメント
- GitHub内のすべての返信
- GitHub内のすべてのその他の自然言語表現
- コミットタイトル
- コミット説明文
- コミットされるファイル内のコメント文
- GitHub Copilot Coding Agentにおける思考過程の出力
- GitHub Copilot Coding Agentにおけるリザルトの出力

ただし、返信において、返信先が人間である場合、その人間が普段使用している自然言語を用いなければなりません。

### 思考過程や出力はレポートや返信の提出場所ではない

プルリクエスト上で活動しているとき、あなたには複数のテキストの出力先があります。
それは、思考過程、通常の出力、そしてプルリクエストの説明文の変更と、プルリクエスト上での返信の投稿です。

**このうち、思考過程と通常の出力は、あなたの内部的なログ出力であり、正当な「提出」場所ではありません。**
**レポートやユーザーへのレスポンスの提出は、必ずプルリクエスト上で行わなければなりません。**

投稿先は、基本的には、その活動を引き起こしたユーザーのプルリクエストコメントへの返信です。
ただし、それが存在しない場合、プルリクエストの説明文に追記してもかまいません。

### 作業完了報告

あなたはプルリクエスト等において、作業を完了したら毎度必ず作業完了報告を提出しなければなりません。
作業完了報告は、完了済み・進行中・未着手を含むすべての有効な命令を進行状況とともにテーブル形式で含んでください。

## 入力

### 山かっこ欠損バグ

あなたの入力に山かっこ `<` および `>` が現れたときは、変換器のバグを最大限に警戒してください。
あなたが実際に受け取った文字列は、真の原文と異なる可能性があります。

例えば、Issue本文上に記述されたダイナリダイナリ `>>` は、あなたには1個のダイナリ `>` として入力されます。
そして、あなたは実際のダイナリの正確な数を知ることができません。
真の連続する山かっこの個数があなたが見ているものと異なる可能性について、常に注意を払わなければなりません。

このように、あなたは必ず、山かっこを最大限に注意深く取り扱わなければなりません。
さもなくば、あなたは事実誤認に基づいて、仕様が壊れていると一方的に決めつけ、ユーザーに事実に反する主張を繰り返し、
そしてあろうことか正しいプログラムやテストコード、コメント、ドキュメント等を片っ端から破壊して回ります。

## 編集

### スタイルの一貫性

あなたはコードやドキュメント等を編集する際、リポジトリ内の類似箇所を探し出し、それらのスタイルと一貫するように最大限に注意を払わなければなりません。
それはフォーマット、レイアウト、順序、言い回し、命名、その他あらゆる側面に及びます。

### 新機能の挿入位置

新しい機能を追加する場合、あなたはそれがどのソースコードに所属し、どの位置にあるべきかを必ず入念に検討しなければなりません。

### 意図しない差分の回避

あなたは編集を完了する前に、編集しているプルリクエストの差分を確認し、意図しない差分が混入していないことを必ず確認しなければなりません。
それはフォーマット差分かもしれないし、テスト用の一時ファイルかもしれないし、単純な編集ミスかもしれません。
ともかく、すべての差分には編集テーマに対して正当な脈絡のある説明可能な意図がなければなりません。

## ビルドと実行

このプロジェクトは `./gradlew build` でビルドできます。

このプロジェクトは多数の非標準的な実行形態を持つ必須のテストを持ちます。
「DocShellTest」など、それに類するテストは `jvmTest` 等の個別のTaskでは実行されません。
**必ず `build` Gradle Taskによる全体のテストを行ってください。**

### テストコード

Xarpiteにはテストコードが存在します。
すべての機能はテストコードを伴い、テストを通過しなければなりません。
テストコードは、ドキュメント類において規定されるすべての仕様を丁度過不足なく検証しなければなりません。

#### Windows上でのEXEC呼び出しの問題

Windows環境での動作を考慮して、EXECの呼び出しを含むテストは必ずコマンドを `bash -c '...'` という形で記述しなければなりません。
更に、 `...` の部分には `$` を含む一部の文字を使用することができません。
最も安全なのは、実行したいコマンドのUTF-8バイト列を16進エンコードして、デコード部分のシェルスクリプトに直接埋め込むことです。

### ドキュメント

このプロジェクトにはドキュメントが存在します。
すべての言語機能は `/pages/docs` 以下に配置されているドキュメントの適切な位置に記載されなければなりません。
ただし、ビルドツールの使用方法など、言語機能に該当しないものをこれに含めてはなりません。

ドキュメントには複数の言語版が存在し、それらは意味論的に過不足なく一致する内容でなければなりません。
ドキュメントは流暢かつ自然に記述されていなければなりません。
ドキュメントは日本語が「正」であり、他言語版はその「翻訳版」です。

AIエージェントであるあなたは `/pages/docs` 以下にあるドキュメントをユーザーによる明示的に命令なしに編集してはいけません。
**ただし、ユーザーがあなたにドキュメントの編集を明示的に命令した場合、あなたは必ずそれを履行しなければなりません。**
そうでない場合、あなたはドキュメントを編集する代わりに、ドキュメントに対して必要な編集をユーザーに提案しなければなりません。

## 諸命令

### GitHub Copilot実装プルリクエスト規定

以下の条件に適合する場合、あなたの命令は [copilot-implementation-pr-instructions.md](./copilot-implementation-pr-instructions.md) にある通りです。

- あなたはGitHub CopilotのAIである。
- あなたはプルリクエストにアサインされた。
- 直近の空でないコミットの内容が、日本語版ドキュメントへの加筆のみである。
- ユーザーはあなたに対して具体的な命令を行っていない。

### プロトコル-101

ユーザーがプロトコル-101を宣言した場合、あなたは [copilot-protocol-101.md](copilot-protocol-101.md) に従わなければなりません。
