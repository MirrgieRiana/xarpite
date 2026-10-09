# Xarpite Kotlin コード（`src/commonMain/kotlin`）コーディング規約

これまでの実験であぶり出された規約を、テーマごとに整理したものです。
`escapeJsonString`・`MatrixPositionCalculator`・識別子名予想・`Formatter.format`・`removeExponent`・`mergeSort`・`toSingleJson` などの各実験で判明した規約を統合・再編しています。

## 型注釈と式

関数の戻り値型注釈は省略し、式本体（`fun … = …`）で型推論に委ねます。プロパティの型注釈も同様に省略します。

ただし、走査のように手続き的に値が定まり、宣言と初期化を分離せざるをえない場合は、`var mantissa: String` や `val exponent: Int` のように型注釈を付けて先に宣言し、後続の `run { … }` ブロックや分岐の中で代入します。初期化が宣言から離れて推論に委ねられないため、ここでは型注釈を明示します。

中間変数は最小化します。標準ライブラリ（`binarySearch` 等）と `.let { }` を組み合わせ、途中結果に名前を付けないまま式1本へ畳み込み、`return` に直接埋め込みます。この、途中結果を式1本へ畳み込む用途では `let` が主力です。

複数文を要するプロパティ初期化は、`buildList { … }` ではなく `run { val list = …; list }` で書きます（`buildList` は0件です）。

複数の値の組を生む大きな分岐は、宣言を先に出して各枝で代入するのではなく、`if`/`when` 式そのものの結果を `val (a, b) = …` の分解宣言で受けます。分岐の各枝はチェーン式を丸ごと書き切り、共通部分を手前にくくり出しません。

## 制御構造とイディオム

`for` 文は使わず、`forEach`/`forEachIndexed` に統一します。`continue` 相当も `return@forEach` で表します。`for` を残すのは、Channel 消費やネイティブのグルーコードなど、forEach で書けない箇所のみで、`commonMain` 本体には1件しかありません。

いっぽうで `while` は避けずに使います（`commonMain` で34件）。マージソートの併合や指数表記の桁送り、パーサのような分割統治・走査系の低水準処理では、stdlib に無理に畳み込まず、`while` と可変カウンタで手書きします。その際のループ添字は、`var i = 0`・`var j = 0` のように1文字を使います（`sb`/`ch` と同類の、確立した略語の例外です）。

スコープ関数は `let` と `run` の二本柱で、`with`・`apply`・`also` はほとんど使いません（`commonMain` で `run` 54件・`let` 30件に対し、`also` 1件・`apply`/`with` は0件）。`run { … }` は、使い捨てのローカルを閉じ込めて手続きの段を区切る局所スコープとして多用します。ラベル付きの `run a@{ … return@a }` で局所的な早期脱出を表し、フラグ変数や `break` の代わりにします（`return@run` は28件）。

入れ子のローカル関数も多用します（深いインデントの関数定義は75件）。外から見えない補助処理を、それを使う関数のスコープ内に閉じ込めるためで、`fun String.round()` のようなローカルな拡張関数も内側に定義します。

型に基づく分岐は `when (subject)` の `is 型 ->` で書きます（`is 型 ->` の分岐は188件）。シングルトンの `object` や `enum` の枝だけは `is` を付けず、値そのもので分岐します（`is FluoriteNull` ではなく `FluoriteNull -> …`）。

早期 return には elvis 演算子を好みます（`getOrNull(…) ?: return …`）。これは見つからない側（`null`）で抜ける向きです。反対に、補助関数を渡り歩いて「見つかったら即座に返す」を伝播させるときは、補助関数の戻り値を `T?` にして、各呼び出し地点で `val result = …` と受けてから `if (result != null) return result` で1段ずつ持ち上げます（`if (… != null) return …` は9件です）。`?.let { return it }` のような畳み込みにはしません。

コレクションの包含や範囲の判定は中置の `in`/`!in` で書きます（`keyString in entries`、`arguments.size !in 1..2` など。`!in` は7件です）。`.containsKey()` や `.contains()` でのコレクション判定は使いません（`.containsKey()` は0件です）。

関数をまたぐ大域脱出の合図には、引数を取らないシングルトンの `object … : Throwable()`（`ShowUsage`・`ShowVersion`・`IterationAborted` の3個）を新設して `throw` で投げ、受け手は `catch (_: IterationAborted)` のように例外値を `_` で捨てて捕えます（無名捕捉は5件です）。汎用エラーを既存の例外クラスに投げ分けるの（後述）とは別系統で、こちらは制御フローの合図に用います。ただし、ラベル付きの大域脱出で値を持ち帰る場合だけは、シングルトンではなく、ラベルと値を運ぶ専用の `Throwable`（`Returner`）を投げます。捕える側は `catch (returner: Returner)` で受け、`if (returner.label === label)` と参照同値でラベルの一致を確かめてから値を取り出し、一致しなければ `throw returner` でそのまま再送して外側の枠へ委ねます（`catch (returner:` は4件です）。

途中の文字列変換は `String` の拡張関数として定義し、`.a().b().c()` とメソッドチェーンで一列に流します。引数渡しの入れ子呼び出しにはしません。

## レイアウトと改行

メソッドチェーンは、レシーバ（`this` 等）を単独行に置き、後続の `.method` をすべて同一インデントの行頭ドットで揃えます。

行の長さでは折り返しません。リンタ設定は無く、1つの文法規則などは何文字でも1行に収めます。代わりに、メソッド呼び出しの区切りなど意味の境界では積極的に折ります。

クラス本体は、`{` の直後に空行を置かずに始めます。

`require(…)` のメッセージラムダは、長くても1行に保ちます。`require(…)` の後は1行空けて主処理に入ります。

## 命名

ローカル変数やプロパティには型名を埋め込まず、囲うクラスや型が与える文脈に委ねた短名（`receiver`/`left`/`right`）にします。ローカル変数は型名の lowerCamelCase をそのまま使います。

AST ノードのクラスは、演算の意味語ではなく構文・トークンの見た目で命名します（`Decrement` でなく `MinusMinus`、丸括弧は `Round`、角括弧は `Square`）。演算クラスは役割を表すサフィックス（`Getter`/`Setter`/`Comparator`）を固定し、接頭は具体語にします（`Until` でなく `Exclusive`、判定系は `Comparator` 家系に分類します）。値の変換は、逆変換であっても `parse`/`from` を使わず、`to○○As○○` の形で方向を統一します。

動詞の選択は独特です。探索は `get`、呼び出しは `call`、整列は実装名の `mergeSort` を使い、中核 API も超短い `get`/`run` です。真偽を返す関数でも `is` を付けません。

Map を保持するプロパティは `○○Table`、生成用のラムダは `○○Provider` と、サフィックスを固定します。

識別子は略さないフルワードを主流とし、確立した略語（`sb`/`ch`/`env`/`inc`）だけを許容します（`context` は544件すべてフルスペルで、`ctx` は0件です）。

`a to b` は「キー→値」の写像エントリ、`Pair(a, b)` は対等な2値のタプルとして、意味論的に使い分けます。

## 構造とプラットフォーム

`commonMain` では `java.*` を import せず、多倍長小数は ionspin の BigDecimal、絶対値は単項マイナスなど、マルチプラットフォームで使える手段に揃えます。

import はワイルドカード（`import パッケージ.*`）を使わず、すべて1つずつ明示的に列挙します（`commonMain` の714件の import はすべて明示で、ワイルドカードは0件です）。

汎用的なエラーは専用の例外クラスを新設せず、既存の `IllegalArgumentException`/`FluoriteException`/`RuntimeException` で投げ分けます。

単なる値の入れ物のために `data class` を増やしません（全193クラス中4件です）。

コンパイル済みの演算子ノードは、マーカー役の基底インターフェース `Operation` に評価メソッドを1つ足しただけの小さなインターフェース家系で表します。`Getter`・`StringGetter`・`Comparator`・`Runner`・`Setter`・`ObjectInitializer` は、いずれも `Operation` を継承し、戻り値型だけが異なる単一の `suspend fun evaluate(env: Environment)` を持ちます。

各ノードは、デバッグ用のソース風文字列を返す `code` プロパティを必ず実装します（`Operation` に `val code: String` を宣言し、実装側は `override val code get() = "…"` の式本体で返します。`commonMain` で80件です）。書式は `クラス名[フィールド;子ノードの code;…]` で、フィールドの区切りは `;`、子ノードは `${getter.code}` のように再帰的に展開します（角括弧付きは70件、フィールドを持たない葉ノードはクラス名だけの10件です）。`List<Operation>` には `,` 区切りで連結する拡張プロパティ `val List<Operation>.code` を用意して使います。

## コメント

ドキュメンテーションコメント（KDoc `/** … */`）はほとんど使いません（`commonMain` 全体で1件です）。代わりに、説明は処理の途中に置く日本語の行コメント（`//`）で行います（`commonMain` の日本語行コメントは104件です）。`if`/`when` の分岐の各枝にその条件を説明するコメントを添えるほか、長い手続きを段ごとに区切り、各段の頭に「指数表記の分割」「余分な0の除去」のような見出し的なコメントを置きます。

## 弱い規約・傾向

弱い傾向として、ドメインに合う場面では演算子オーバーロードや中置記法を定義することがあります（`operator fun Path.contains`、`infix fun String.define` など。`commonMain` で operator 2件・infix 3件です）。
