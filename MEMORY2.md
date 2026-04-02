# インデントブロックリテラル `:` — 考察メモ

> **前提**
> - xarpeg は最新版（6.2.0）に更新する前提
> - 構文は `:` で始まる単一の新しい「インデントブロックリテラル」のみ
> - 3種類の括弧（`()`, `[]`, `{}`）との区別は不要

---

## 1. 提案する構文

```
: 改行 インデント (行 行末)*
```

`:` を先頭に持つインデントブロックが、新しい種類の「括弧類」として文法に追加される。

### 1.1 具体例

```xarpite
# 関数本体
f := args ->:
    result := compute(args)
    result + 1

# クロージャ渡し
LAUNCH(task =>:
    OUT << "Hello"
    OUT << "World"
)

# パイプの右辺
1 .. 10 | x =>:
    result := x * 2
    OUT << result
    result

# 単独のブロック
result := :
    a := compute()
    a + 1
```

### 1.2 等価な括弧表現

インデントブロック `:` は意味論的に **丸括弧 `()`** と等価：

| インデントブロック | 等価な括弧表現 |
|---|---|
| `->:` 改行 インデント body | `-> (body)` |
| `\|:` 改行 インデント body | `\| (body)` |
| `=>:` 改行 インデント body | `=> (body)` |
| `:` 改行 インデント body | `(body)` |

インデントブロックは常に `()` と同じ意味を持つ。`[]` や `{}` の代わりにはならない。

---

## 2. 現在の `:` の文法上の役割（7箇所）

Grammar.kt における `:` を含むトークンの完全列挙：

| # | トークン | パーサー定義位置 | 優先順位レベル | 用途 |
|---|---------|---------------|-------------|------|
| 1 | `::` | rightOperator (L169) | 後置演算子 | メソッドバインド |
| 2 | `?::` | rightOperator (L170) | 後置演算子 | Null安全メソッドバインド |
| 3 | `?:` | condition (L233) | 条件式 | Elvis演算子 |
| 4 | `? ... :` | condition (L232) | 条件式 | 三項演算子の一部 |
| 5 | `!:` | executionOperator (L252) | 実行演算子 | ラベル定義 |
| 6 | `:` | assignmentOperator (L256) | 代入演算子 | エントリー演算子 |
| 7 | `:=` | assignmentOperator (L257) | 代入演算子 | 変数宣言 |

### 2.1 エントリー演算子 `:` のパース条件

```kotlin
-':' * !'=' * !':' map { ::InfixColonNode }
```

`:` の後に `=` でも `:` でもないものが続く場合にマッチする。

### 2.2 三項演算子 `:` のパース条件

```kotlin
or * -b * (-'?').result * -b * ref { condition } * -b * -':' * !':' * -b * ref { condition }
```

`?` の後の式、その後に `:` （`::` でない）、その後に式。

---

## 3. xarpeg 6.2.0 の新機能

xarpeg を 5.1.0 から 6.2.0 にアップグレードすることで、インデント感知パーサーに必要な機能がすべて利用可能になる。

### 3.1 `getState()` による状態依存メモ化（v5.2.0+）

```kotlin
open class DefaultParseContext(override val src: String) : ... {
    open fun getState(): Any = Unit
    
    override fun <T : Any> parseOrNull(parser: Parser<T>, start: Int): ParseResult<T>? {
        val memo = memoTable.getOrPut(getState()) { mutableMapOf() }
        // メモテーブルがstateごとに分割される
    }
}
```

カスタム `ParseContext` サブクラスでインデントスタックを状態として持てる。メモ化テーブルはインデントレベルごとに分割されるため、同一位置でもインデント深さが異なればキャッシュが分離される。

### 3.2 `mapEx` 内での `parseOrNull()` 呼び出し

```kotlin
infix fun <I : Any, O : Any> Parser<I>.mapEx(
    function: (ParseContext, ParseResult<I>) -> O?
) = Parser { context, start ->
    val result = context.parseOrNull(this, start) ?: return@Parser null
    val mapped = function(context, result) ?: return@Parser null
    ParseResult(mapped, result.start, result.end)
}
```

`mapEx` の中で `context.parseOrNull()` を呼び出せるため、現在のインデントレベルに基づいて条件的にサブパーサーを起動できる。

### 3.3 `map` / `mapEx` の null 返却によるパース失敗（v6.2.0）

`map` や `mapEx` から `null` を返すとパース失敗として扱われる。これにより、インデントレベルが正しくない場合にパースを拒否できる。

### 3.4 xarpeg サンプルの indentation-sensitive parser

xarpeg リポジトリの `samples/online-parser` に、これらの機能を使った完全なインデント感知パーサーの実装例がある：

- `OnlineParserParseContext` — `indentStack` を持つカスタムコンテキスト
- `indented()` パーサー — インデントレベルを測定・強制
- `getState()` をオーバーライドして `indentStack.toList()` を返す

---

## 4. `:` がfactor位置に来る場合の衝突分析

### 4.1 パーサーの優先順位階層

```
factor → rightOperator → pow → left → mul → add → range → infixIdentifier →
match → spaceship → comparison → and → or → condition → commas →
pipeRight → stream(assignment/execution) → semicolons → expression
```

### 4.2 「factor位置」とは何か

factorが期待される位置：
1. 式の先頭
2. 中置演算子の右辺（各優先順位レベルで右辺にはより高い優先順位の式が期待される）
3. 前置演算子の後
4. 括弧内の式の先頭

### 4.3 中置演算子 `:` との競合

`:` が中置演算子（エントリー演算子）として使われる場合、必ず**左辺が存在する**：
```xarpite
key : value
```

`:` がfactor位置（式の先頭）に来る場合、左辺は存在しない：
```xarpite
result := :
    body
```

**PEGパーサーでは、左辺がある場合は中置演算子として消費され、factor位置では新しいインデントブロックとしてマッチする。両者は構造的に異なる位置にあるため衝突しない。**

### 4.4 三項演算子 `? ... :` との競合

三項演算子の `:` は `condition` パーサー内で消費される。これは `stream` → `commas` → ... → `condition` → ... → `factor` の解決チェーンにおいて、`factor` より上位の優先順位で処理される。

三項演算子の `:` の後に来る式は `condition` レベルの式であり、その先頭でfactorが試行される。**ここで `:` インデントブロックがfactorとしてマッチする可能性がある。**

```xarpite
a ? b : :
    c
    d
```

これは `a ? b : (c; d)` と等価になる。三項演算子の偽の枝（else節）としてインデントブロックが使われる。**文法的に正しい。**

### 4.5 その他の `:` トークンとの競合

| トークン | 競合の有無 | 理由 |
|---------|-----------|------|
| `::` | なし | 2文字トークンで先にマッチ |
| `?::` | なし | 3文字トークンで先にマッチ |
| `?:` | なし | 2文字トークンで先にマッチ |
| `!:` | なし | 2文字トークンで先にマッチ |
| `:=` | なし | 2文字トークンで先にマッチ |
| `:` (エントリー) | なし | 中置演算子位置（左辺あり）vs factor位置（左辺なし） |
| `:` (三項) | なし | condition内で消費済み、偽の枝の先頭でfactorとして使用可能 |

**結論: `:` インデントブロックを factor に追加しても既存の文法と衝突しない。**

---

## 5. インデントブロックのパーサー設計

### 5.1 必要なインフラ

1. **カスタム `ParseContext`** — インデントスタックを管理
2. **インデント測定パーサー** — 現在行の先頭空白数を計測
3. **インデントブロックパーサー** — `:` を検出し、次の行からインデントブロックを開始

### 5.2 カスタム ParseContext

```kotlin
class XarpiteParseContext(src: String, val location: String) : DefaultParseContext(src) {
    val indentStack = mutableListOf(0)
    val currentIndent get() = indentStack.last()
    
    override fun getState(): Any = indentStack.toList()
}
```

### 5.3 インデントブロックパーサーの概略

```kotlin
val colonIndentBlock: Parser<Node> = (-':').result * -s * -br * indentedBody mapEx { context, result ->
    // body をパースして BracketsLiteralSimpleRoundNode に変換
    BracketsLiteralSimpleRoundNode(result.value, result.start.toPosition())
}
```

ここで `indentedBody` は：
1. 現在行のインデントレベルを測定
2. そのインデントレベル以上の行を連続して消費
3. 各行を `semicolons` として解釈
4. デインデント（インデントレベルが下がった行）で終了

### 5.4 インデントブロックの終了条件

インデントブロックは以下のいずれかで終了する：
1. **デインデント** — 次の非空行のインデントがブロックの基底インデントより浅い
2. **ファイル末尾** — 入力の終端に達した
3. **空行** — 空行はブロックの一部として扱い、デインデントではない（空行を跨いでブロックが継続）

### 5.5 factor への追加

```kotlin
val factor: Parser<Node> = jump + hexadecimal + identifier + quotedIdentifier +
    float + integer + rawString + templateString + embeddedString + regex + 
    brackets + colonIndentBlock  // ← 追加
```

---

## 6. ASTノード設計

### 6.1 新しいノード型は不要

インデントブロックは `()` と等価であるため、既存の `BracketsLiteralSimpleRoundNode` をそのまま使う。

```kotlin
// `:` + インデントブロック → BracketsLiteralSimpleRoundNode(body, position)
```

**GetterCompiler での評価:**
```kotlin
is BracketsLiteralSimpleRoundNode -> {
    val frame = Frame(this)
    val newNode = frame.compileToGetter(node.body)
    NewEnvironmentGetter(frame.nextVariableIndex, frame.mountCount, newNode)
}
```

- 新しい変数スコープを作成
- ブロック内の式を評価
- 最後の式の値を返す

### 6.2 ノード追加が不要である理由

1. コンパイラ側の変更が不要（既存の丸括弧処理がそのまま使える）
2. ランタイムの変更が不要
3. テストの既存パスが維持される

**ただし、デバッグやエラーメッセージの観点から、将来的に `IndentBlockNode` を独立させる可能性はある。**

---

## 7. 後置位置でのインデントブロック

### 7.1 必要性

Issue #177 の核心的なユースケースは**関数呼び出し時のクロージャ渡し**：

```xarpite
LAUNCH(task =>:
    OUT << "Hello"
    OUT << "World"
)
```

ここで `:` はクロージャ本体の先頭に来る。`=>` の右辺としてfactorが期待される位置にあるため、**factorとしての `:` インデントブロックで対応可能。**

### 7.2 `->` の右辺

```xarpite
f := args ->:
    a
    b
```

`->` は `assignmentOperator` として定義されている。右辺には `stream` が期待され、`stream` → `commas` → ... → `factor` の解決で `:` インデントブロックがマッチする。**対応可能。**

### 7.3 `|` の右辺

```xarpite
1 .. 10 |:
    result := _ * 2
    result
```

`|` は `pipeOperator` で、右辺に `stream` が期待される。同様にfactorとして `:` がマッチ。**対応可能。**

### 7.4 `||` の右辺

```xarpite
value ||:
    compute_default()
```

`||` は `orOperator` で、右辺に `and` が期待され、最終的にfactorに到達。**対応可能。**

### 7.5 独立したインデントブロック

```xarpite
result := :
    a := compute()
    a + 1
```

`:=` の右辺としてfactorが期待され、`:` インデントブロックがマッチ。**対応可能。**

---

## 8. エッジケース分析

### 8.1 空のインデントブロック

```xarpite
result := :
```

`:` の後にインデントされた行がない場合。
→ **パースエラーにするべき。** 空ブロックは `()` で書く。

### 8.2 ネストされたインデントブロック

```xarpite
f := args ->:
    inner := x ->:
        x + 1
    inner(args)
```

外側ブロックは4スペース、内側は8スペース。デインデントで内側ブロックが終了し、`inner(args)` は外側ブロックに属する。
→ **インデントスタックの管理で正しく処理可能。**

### 8.3 三項演算子の偽の枝でのインデントブロック

```xarpite
x > 0 ? "positive" : :
    compute_negative()
```

三項演算子の `:` の後にfactorとしてインデントブロックがマッチ。
→ **正しく動作する。**

### 8.4 エントリー演算子の右辺でのインデントブロック

```xarpite
key: :
    compute_value()
```

エントリー演算子 `:` の右辺としてfactorが期待される位置で、さらに `:` インデントブロックがマッチ。
→ **正しく動作する。** `key: (compute_value())` と等価。

### 8.5 インデントブロック内のセミコロン

```xarpite
f := :
    a := 1; b := 2
    a + b
```

→ **問題なし。** 既存の `semicolons` パーサーがセミコロンと改行の両方を処理。

### 8.6 コメントのみの行

```xarpite
f := :
    # これはコメント
    body
```

→ **コメント行はインデント判定から除外するべき。** 空行と同様に扱う。

### 8.7 空行を跨ぐブロック

```xarpite
f := :
    a := 1

    a + 1
```

→ **空行はブロックを終了させない。** 次の非空行のインデントで判定。

### 8.8 タブとスペースの混在

→ **エラーにするか、タブを固定幅スペースに変換するか決める必要がある。** Pythonと同様にエラーにするのが安全。

### 8.9 `:` の直後にコメントがある場合

```xarpite
f := : # ここにコメント
    body
```

→ **対応可能。** `:` の後の `-s`（水平空白+コメント）を消費してから改行を期待する。

### 8.10 パイプチェーンの途中

```xarpite
data
    | validate
    | x =>:
        transformed := transform(x)
        enriched := enrich(transformed)
        enriched
    | save
```

インデントブロックのデインデントと次のパイプ `|` の関係。パイプ `|` は外側のインデントレベルにあるため、インデントブロックはデインデントで閉じ、`| save` は外側のチェーンに属する。
→ **正しく動作する。**

---

## 9. xarpeg 6.2.0 を使った具体的実装設計

### 9.1 カスタム ParseContext

```kotlin
class XarpiteParseContext(src: String, val location: String) : DefaultParseContext(src) {
    var indentStack = mutableListOf(0)
    
    val currentIndent: Int get() = indentStack.last()
    
    fun pushIndent(level: Int) { indentStack.add(level) }
    fun popIndent() { indentStack.removeLastOrNull() }
    
    override fun getState(): Any = indentStack.toList()
}
```

### 9.2 インデント測定

```kotlin
// 現在位置が行頭であることを前提に、先頭の空白数を返すパーサー
val measureIndent: Parser<Int> = (+Regex("""[ \t]*""")).mapEx { ctx, result ->
    result.text(ctx).length
}
```

### 9.3 コロンインデントブロックパーサー（概略）

```kotlin
val colonIndentBlock: Parser<Node> = Parser { context, start ->
    if (context !is XarpiteParseContext) return@Parser null
    
    // 1. ':' を消費
    val colonResult = context.parseOrNull(-':', start) ?: return@Parser null
    var pos = colonResult.end
    
    // 2. 水平空白+コメントを消費
    val sResult = context.parseOrNull(s, pos)
    if (sResult != null) pos = sResult.end
    
    // 3. 改行を消費
    val brResult = context.parseOrNull(br, pos) ?: return@Parser null
    pos = brResult.end
    
    // 4. 次の行のインデントレベルを測定
    val indentResult = context.parseOrNull(measureIndent, pos) ?: return@Parser null
    val blockIndent = indentResult.value
    pos = indentResult.end
    
    // 5. ブロックインデントが現在より深いことを確認
    if (blockIndent <= context.currentIndent) return@Parser null
    
    // 6. インデントスタックにプッシュ
    context.pushIndent(blockIndent)
    
    // 7. expression をパース（インデントブロック内）
    val bodyResult = context.parseOrNull(ref { expression }, pos)
    
    // 8. インデントスタックからポップ
    context.popIndent()
    
    if (bodyResult == null) return@Parser null
    
    ParseResult(
        BracketsLiteralSimpleRoundNode(bodyResult.value, Position(location, start)),
        start,
        bodyResult.end
    )
}
```

**注意:** これは概略であり、以下の詳細は実装時に詰める必要がある：
- `semicolons` パーサーがインデントレベルを考慮して行を消費する仕組み
- デインデント検出の正確なタイミング
- バックトラック時のインデントスタックの整合性

### 9.4 semicolons パーサーのインデント対応

現在の `semicolonsPart`:
```kotlin
val semicolonsPart: Parser<List<Node>> = or(
    stream * -s * -br * -b * ref { semicolonsPart },  // 改行区切り
    stream * -s * -';' * -b * ref { semicolonsPart },  // セミコロン区切り
    stream,                                            // 単一文
)
```

インデント対応版では、改行区切りの際に**次の行のインデントレベルがブロックの基底レベル以上であること**を確認する必要がある：

```kotlin
// 改行の後、次の行のインデントがcurrentIndent以上の場合のみ継続
stream * -s * -br * indentCheck * -s * ref { semicolonsPart }
```

ここで `indentCheck` は：
```kotlin
val indentCheck: Parser<Tuple0> = Parser { context, start ->
    if (context !is XarpiteParseContext) return@Parser ParseResult(Tuple0, start, start)
    val indent = measureIndentAt(context.src, start)
    if (indent >= context.currentIndent) ParseResult(Tuple0, start, start)
    else null  // デインデント → セミコロンチェーンを終了
}
```

### 9.5 既存文法への影響最小化

**変更が必要な箇所:**
1. `factor` に `colonIndentBlock` を追加
2. `semicolonsPart` の改行区切りにインデントチェックを追加
3. `XarpiteGrammar` のインスタンス化時に `XarpiteParseContext` を使用
4. `Evaluator.kt` のパース呼び出しで `XarpiteParseContext` を使用

**変更が不要な箇所:**
- Nodes.kt — 既存ノードを再利用
- GetterCompiler.kt — 丸括弧ノードの評価ロジックはそのまま
- RunnerCompiler.kt — 変更不要
- すべてのランタイムコード — 変更不要

---

## 10. 「`:` は頭に来ないという前提の崩壊」の再分析

Issue #177 のコメントにある懸念：

> `:` を頭に持つインデント括弧が定義できればいい。ただ、 `:` は頭に来ないという前提が崩壊する

### 10.1 前提の崩壊は文法レベルでは問題にならない

`:` が中置演算子として使われる場合、左辺が**必ず**存在する。PEGパーサーでは：

1. `a : b` → `a` がfactor、`:` が中置演算子、`b` がfactor
2. `result := :` → `result` がfactor、`:=` が代入演算子、`:` がfactor（インデントブロック）

ケース2では、`:=` の右辺として `:` がfactor位置に来る。エントリー演算子の `:` は `assignmentOperator` レベルで処理されるが、右辺のfactorとしての `:` はそれより高い優先順位でマッチする。

### 10.2 条件: `:` の直後に改行+インデント増加がある場合のみ

インデントブロックの `:` がマッチする条件：
1. `:` がfactor位置にある
2. `:` の直後に（水平空白・コメントを除いて）改行がある
3. 次の非空行のインデントが現在のブロックインデントより深い

これらの条件がすべて揃わない限り、`:` は通常のエントリー演算子/三項演算子の一部として処理される。

**結論: 「前提の崩壊」は発生しない。条件が十分に厳格であるため、既存の `:` 使用と区別可能。**

---

## 11. 実装の段階的計画

### Phase 1: xarpeg アップグレード
- xarpeg を 5.1.0 → 6.2.0 に更新
- `getState()`, nullable `map`/`mapEx`, `parseOrNull` in `mapEx` が利用可能になる

### Phase 2: カスタム ParseContext
- `XarpiteParseContext` を作成（インデントスタック管理）
- `Evaluator.kt` のパース呼び出しを更新

### Phase 3: インデントブロックパーサー
- `colonIndentBlock` パーサーを実装
- `factor` に追加
- `semicolonsPart` にインデントチェックを追加

### Phase 4: テスト
- 基本的なインデントブロックのテスト
- ネストされたインデントブロック
- 既存テスト（337+件）の全パス確認
- エッジケース（空行、コメント、タブ混在等）

### Phase 5: ドキュメント
- 新構文のドキュメント作成
- 既存ドキュメントとの整合性確認

---

## 12. 旧考察（`:(`, `:[`, `:{` 方式）との差異

| 観点 | 旧考察 | 新考察 |
|------|--------|--------|
| 括弧の種類 | 3種（`:(`, `:[`, `:{`） | **1種のみ（`:` = `()`）** |
| トークン | 2文字トークン | **1文字 + インデント** |
| xarpeg改修 | 不要（前処理方式を推奨） | **不要（6.2.0にアップグレード）** |
| 前処理 | 必要 | **不要（パーサー内で処理）** |
| ASTノード追加 | なし（既存ノード再利用） | **なし（同じく再利用）** |
| コンパイラ変更 | なし | **なし** |
| 三項演算子との衝突 | 前処理で区別困難 | **パーサー優先順位で自然に解決** |
| 実装の複雑さ | 前処理の字句解析再実装 | **xarpegの機能を活用** |

---

## 13. 未解決の課題

### 13.1 `b` パーサーの改行消費問題

現在の `b` パーサーは改行を自由に消費する：
```kotlin
val b: Parser<Tuple0> = s * -(br * s).zeroOrMore
```

多くの演算子の間に `-b` が使われているため、演算子の途中で意図しないデインデントを跨いでしまう可能性がある：

```xarpite
a +
b
```

現在は `a + b` として正しくパースされる（`b` が改行を消費）。インデント感知を導入しても、この動作は維持する必要がある。

**解決策:** `b` パーサー自体は変更せず、**`semicolonsPart` の改行区切り時のみインデントチェックを追加する。** これにより、式の途中の改行は引き続き自由だが、文の区切りとしての改行はインデントレベルに従う。

### 13.2 バックトラックとミュータブル状態

PEGパーサーはバックトラックするため、ミュータブルなインデントスタックが不整合になるリスクがある。

**解決策:** xarpeg 6.2.0 の `getState()` によるメモ化分割がこの問題を緩和する。また、`colonIndentBlock` パーサー内でスタックの push/pop を確実にペアにする。バックトラック時は `parseOrNull` が `null` を返し、パーサーは別の選択肢を試すが、その前に `popIndent()` が呼ばれる。

### 13.3 エラーメッセージの品質

インデント関連のエラー（不正なインデントレベル、タブ混在等）に対する分かりやすいエラーメッセージが必要。

### 13.4 `b` パーサー内でのインデント追跡

`:` インデントブロック内では、`b` が改行を消費する際にインデントレベルを超えたデインデントを消費しないようにする必要があるかもしれない。これは `b` を `indentAwareB` に置き換えることで対応可能だが、既存の文法全体に影響する大きな変更になる。

**代替アプローチ:** `b` は変更せず、`semicolonsPart` の改行文区切りでのみインデントチェックを行う。式途中の改行（演算子の前後等）はインデントレベルに関係なく許容する。これは「ゆるい」インデント規則だが、Xarpiteの既存の改行の自由度と整合する。

---

## 14. 結論

### 14.1 技術的実現可能性

xarpeg 6.2.0 へのアップグレードにより、**パーサー内部でインデント感知パーサーを実装することが技術的に可能。** 前処理（プリプロセス）は不要。

### 14.2 文法的安全性

`:` をfactor位置のインデントブロックとして追加しても、**既存の7箇所の `:` 使用と衝突しない。** PEGの優先順位と位置の区別により自然に分離される。

### 14.3 実装の影響範囲

- **変更が必要:** Grammar.kt（パーサー定義）, Evaluator.kt（ParseContext）
- **変更不要:** Nodes.kt, GetterCompiler.kt, RunnerCompiler.kt, ランタイム全体
- **既存テスト:** すべてパスするはず（後方互換性あり）

### 14.4 設計の単純さ

1種類の括弧（`:` = `()`）に絞ったことで、設計が大幅に単純化された。括弧の種類を指定する必要がなく、既存のノード型を再利用でき、コンパイラの変更も不要。

---

## 15. `?:` 演算子との衝突 — 深層分析

### 15.1 問題の発見

セクション4.5で「`?:` は2文字トークンで先にマッチするため衝突しない」と結論したが、これは**不正確**である。

`?:` がPEGパーサー上で「2文字トークンとして先にマッチする」のは `condition` パーサーの選択肢2（L233）においてのみ。PEGは**順序付き選択**であるため、選択肢1（三項演算子パターン）が**先に**試行される。

### 15.2 2文字中置演算子で衝突が起こるメカニズム

中置演算子 `XY` が非衝突であるための条件は、`Y` で始まる式が存在しないことである。

- `->` が衝突しない理由: `>` で始まる式は存在しない
- `<-` が衝突する理由（仮に存在した場合）: `-` で始まる式（前置マイナス）が存在するため、`a < -b` と `a <- b` が曖昧になる
- `?:` が**従来**衝突しなかった理由: `:` で始まる式が存在しなかった

**`:` で始まるインデントブロックを追加すると、この前提が崩壊する。**

### 15.3 `condition` パーサーの精密なパーストレース

Grammar.kt L231-236:
```kotlin
val condition: Parser<Node> = or(
    // 選択肢1: 三項演算子  or ? condition : condition
    or * -b * (-'?').result * -b * ref { condition } * -b * -':' * !':' * -b * ref { condition },
    // 選択肢2: Elvis  or ?: condition
    or * -b * (-"?:").result * -b * ref { condition },
    // 選択肢3: !?
    or * -b * (-"!?").result * -b * ref { condition },
    // 選択肢4: 素通し
    or,
)
```

PEGの順序付き選択により、入力に対して**選択肢1が最初に試行**される。

### 15.4 トレース: `a ?: ⏎(indent) b`

入力:
```
a ?:
    b
```

**選択肢1（三項演算子パターン）の試行:**

1. `or` → `a` を消費。成功。
2. `-b` → 空白を消費。成功。
3. `(-'?').result` → `?` を消費。成功。位置は `:` の手前。
4. `-b` → **ここが鍵。`b` パーサーは `s * -(br * s).zeroOrMore` であり、改行を自由に消費する。** `:⏎    ` を跨いで `b` の位置に到達。

    **待て。`b` パーサーはまず `s`（水平空白）を消費する。`s` = `-(+Regex("""[ \t]+""") + lineComment + blockComment).zeroOrMore` であり、`:` は水平空白でもコメントでもないため、`s` は何も消費しない。次に `-(br * s).zeroOrMore` を試すが、現在位置は `:` であり改行ではないので、これも何も消費しない。**

    **したがって `-b` は何も消費せず、位置は `:` の直前のまま。**

5. `ref { condition }` → 位置 `:` からの式のパースを試行。

    `condition` → `or` → ... → `factor` の解決チェーンで `:` をfactorとして試行。

    **`:` インデントブロック**がfactorとして追加されていれば：
    - `:` を消費
    - 改行+インデント増加を確認 → `⏎    b` にマッチ
    - `b` を本体としてインデントブロックが成功
    - `ref { condition }` = `(:⏎    b)` （`b` を含むインデントブロック）

6. `-b` → ブロック終了後、ファイル末尾なので成功（空消費）。
7. `-':' * !':'` → **もう `:` は残っていない。** パース失敗。
8. **選択肢1全体が失敗。**

**選択肢2（Elvisパターン）の試行:**

1. `or` → `a` を消費。成功。
2. `-b` → 空白を消費。成功。
3. `(-"?:").result` → `?:` を2文字トークンとして消費。成功。
4. `-b` → `⏎    ` を消費。成功。
5. `ref { condition }` → `b` を消費。成功。
6. **選択肢2全体が成功。結果: `a ?: b`（Elvis演算子）。**

**この入力では衝突しない。** インデントブロック `:` がfactorとして先にマッチしても、三項演算子パターンの残りの `:` が見つからず選択肢1が失敗し、選択肢2にフォールバックする。

### 15.5 トレース: `a ?: ⏎(indent) b: c`

入力:
```
a ?:
    b: c
```

**選択肢1（三項演算子パターン）の試行:**

ステップ1-5: 上記と同じ。`ref { condition }` で `:` インデントブロックが試行される。

`:` の直後に改行+インデント増加があるか？
- 位置: `?` の直後、`:` の直前
- `:` を消費した後、次は `⏎    b: c`
- 改行あり、インデント増加あり → **`:` インデントブロックがマッチする可能性**

インデントブロックの本体は `b: c`（`b` エントリー `c`）。

`ref { condition }` = `(:⏎    b: c)` として成功すると仮定する。

6. `-b` → ブロック終了後。
7. `-':' * !':'` → **もう `:` は残っていない。** パース失敗。
8. **選択肢1全体が失敗。**

**選択肢2（Elvisパターン）の試行:**

1. `or` → `a` を消費。
2. `-b` → 空白を消費。
3. `(-"?:").result` → `?:` を消費。
4. `-b` → `⏎    ` を消費。
5. `ref { condition }` → `b: c` を消費。
    - `condition` → `or` → ... → `factor` → `b`
    - `stream` レベルで `assignmentOperator` の `:` にマッチ
    - 結果: `b : c`（エントリー演算子）
6. **選択肢2全体が成功。結果: `a ?: (b : c)`**

**従来どおり。衝突しない。**

### 15.6 トレース: `a ?: ⏎(indent) :⏎(deeper-indent) body`

入力:
```
a ?:
    :
        body
```

**選択肢1（三項演算子パターン）の試行:**

1. `or` → `a`
2. `-b` → 空白
3. `(-'?')` → `?`
4. `-b` → **`?` の直後は `:`。`b` は `s * -(br * s).zeroOrMore`。`s` は `:` を消費しない。`br` でもない。何も消費せず。**
5. `ref { condition }` → 位置 `:⏎    :⏎        body` から。

    `condition` → `or` → ... → `factor` で `:` インデントブロック：
    - `:` を消費
    - 直後に `⏎` （改行）あり
    - 次の行 `    :⏎        body` のインデントが増加 → マッチ
    - **本体: さらに `:` インデントブロック** → `:⏎        body` → 本体 `body`
    - `ref { condition }` = 2段ネストのインデントブロック

6. `-b` → ブロック終了後。
7. `-':' * !':'` → `:` が残っていない。失敗。
8. **選択肢1全体が失敗。**

**選択肢2（Elvisパターン）の試行:**

1. `or` → `a`
2. `-b` → 空白
3. `(-"?:").result` → `?:` を消費
4. `-b` → `⏎    ` を消費
5. `ref { condition }` → `:⏎        body` から。`:` インデントブロック → `body`
6. **成功。結果: `a ?: (:⏎        body)`**

**衝突しない。** Elvisとして正しく解釈される。

### 15.7 真に衝突するケース: `a ? :⏎(indent) body : c`

入力:
```
a ? :
    body
: c
```

**選択肢1（三項演算子パターン）の試行:**

1. `or` → `a`
2. `-b` → 空白
3. `(-'?')` → `?`
4. `-b` → ` `（`?` と `:` の間のスペース）を消費
5. `ref { condition }` → `:⏎    body` から。

    `condition` → `or` → ... → `factor` で `:` インデントブロック：
    - `:` を消費
    - `⏎    body` → インデント増加 → マッチ
    - `ref { condition }` = `(:⏎    body)`

6. `-b` → `⏎` を消費（デインデント後の行頭）
7. `-':' * !':'` → `:` にマッチ。`::` でもない。成功。
8. `-b` → ` ` を消費
9. `ref { condition }` → `c` を消費

**選択肢1が成功。結果: `a ? (:⏎    body) : c`（三項演算子）。**

これは**新しい構文として意図された動作**であり、衝突ではなく**正当な三項演算子の使用**。

もしインデントブロックがなければ、この入力は：
- `a ? : ...` → `?` の後にfactorが必要だが `:` はfactorではない → 選択肢1失敗
- `a ?: ...` → Elvis → ... → 何らかの結果
  しかし `? :` の間にスペースがあるため `?:` として消費されない可能性がある。

**実際には:** `(-"?:").result` は `?:` が隣接している場合のみマッチ。`? :` のようにスペースが挟まる場合は `(-'?').result` が先に `?` だけを消費する。したがって、このケースは従来からElvisではなく、三項演算子のパターンで処理される（ただし従来は `:` がfactorでないため失敗していた）。

### 15.8 真に衝突するケース: `a ?:⏎(indent) :⏎(deeper-indent) body : c`

入力:
```
a ?:
    :
        body
    : c
```

**選択肢1（三項演算子パターン）の試行:**

1. `or` → `a`
2. `-b` → 空白
3. `(-'?')` → `?`
4. `-b` → 何も消費しない（次は `:`）
5. `ref { condition }` → `:⏎    :⏎        body⏎    : c` から。

    `:` インデントブロック: `:` を消費、`⏎    ` → インデント増加。

    **インデントブロックの本体:** 基底インデント4スペース。
    - 行1: `:⏎        body` → さらにインデントブロック、本体 `body`
    - 行2: `    : c` → 基底インデント4スペース → `:` エントリー演算子 `c`
    - セミコロンで区切られた2文: `(:⏎        body); (: c)` → `(body); ([EMPTY] : c)`

    `ref { condition }` = インデントブロック全体

6. `-b` → ブロック終了後。ファイル末尾（または次の非インデント行）。
7. `-':' * !':'` → `:` が残っていない。失敗。
8. **選択肢1全体が失敗。**

**選択肢2（Elvisパターン）の試行:**

1. `or` → `a`
2. `-b` → 空白
3. `(-"?:").result` → `?:` を消費
4. `-b` → `⏎    ` を消費
5. `ref { condition }` → `:⏎        body⏎    : c` から。`:` インデントブロック。
6. **成功。結果: `a ?: ((:⏎        body); ([EMPTY] : c))`**

**衝突しない。** `:` がインデントブロック内に吸収され、三項演算子の `:` として外側に漏れ出ない。

### 15.9 衝突分析の結論

**`:` インデントブロックの追加による `?:` 演算子への影響を精密にトレースした結果、衝突は発生しない。**

その理由:

1. **`?:` トークンの原子性:** `(-"?:").result` は `?` と `:` が隣接している場合にのみマッチする。間にスペースや改行があれば `?:` としてはマッチしない。

2. **三項演算子パターンの優先試行と失敗:** PEGの選択肢1（三項演算子）が先に試行されるが、`:` インデントブロックが `condition` の中間式として消費されると、三項演算子に必要な2番目の `:` が残らず、選択肢1は失敗する。その後、選択肢2（Elvis）が試行され成功する。

3. **`-b` パーサーの挙動:** `-b` は `s * -(br * s).zeroOrMore` であり、`s` が先に試行される。`s` は `[ \t]+` やコメントにのみマッチし、`:` には**マッチしない**。したがって `-b` が `:` を飛び越えることはなく、`?` の直後に `:` がある場合、`-b` は何も消費しない。

### 15.10 一般化: 2文字中置演算子 `XY` と前置 `Y` の衝突条件

2文字中置演算子 `XY` が衝突するのは、以下が**すべて**成立する場合：

1. `Y` で始まる式（factor）が追加される
2. `X` を単独の前置/中置演算子として消費するパスが存在する
3. そのパスで `Y` で始まる式が右辺として消費された後、残りのトークン列が元の `XY` 演算子のパース結果と異なる意味を持つ

`?:` の場合:
- 条件1: `:` インデントブロックの追加により成立 ✓
- 条件2: 三項演算子パターンで `?` が単独消費される ✓
- 条件3: `:` インデントブロックが中間式を消費した後、2番目の `:` が見つからず三項演算子パターンが**失敗**する → Elvisにフォールバック → 最終的な意味は変わらない ✗

**条件3が成立しないため、`?:` は衝突しない。**

ただし、以下のような入力は注意が必要：

```
a ?:
    body
: c
```

- 従来: `(a ?: body) : c`（Elvis → エントリー）
- 新規: これも同じ。`?:` が先にElvisとして消費され、`body` が右辺。次に `: c` がstream（assignmentOperator）レベルで処理される。

**`:` インデントブロックは、`?:` の直後に改行+インデント増加がある場合でも、Elvisの右辺として通常の式がパースされるため影響しない。** インデントブロックが「factor位置」に来るのは、`:` 自体がfactor位置にある場合のみであり、`?:` の `:` は中置演算子の一部としてトークン化されるため、factorの `:` とは競合しない。

---

## 16. 既存構文への後方互換性 — 網羅的検証

### 16.1 検証の方針

colonIndentBlockをfactorに追加した場合、**既存の有効なソースコードが従来と同一のASTを維持するか**を検証する。

方針:
1. colonIndentBlockがマッチする条件は「`:` がfactor位置にあり、直後に改行+インデント増加」
2. factorの選択肢リストの**末尾**に追加されるため、他のfactor選択肢より先にマッチすることはない
3. したがって、既存コードへの影響はPEGの**バックトラック経路の変化**を通じてのみ起こりうる

影響パターン: PEGの順序付き選択で、従来は選択肢Nが成功していたが、colonIndentBlockの追加により選択肢M（M < N）が新たに成功し、異なるASTを生成する。

### 16.2 影響が起こるための必要条件

colonIndentBlockの追加で既存コードのパースが変わるには、以下が**すべて**成立する必要がある:

1. 既存の有効なコード中に `:` が存在する
2. PEGの解析過程で、その `:` がfactor位置で試行される（バックトラック経路を含む）
3. colonIndentBlockがその位置でマッチする（`:` + 改行 + インデント増加）
4. そのマッチにより、上位の選択肢が新たに成功する
5. その新たな成功が、従来の成功パスと異なるASTを生成する

**条件2が成立する場面を文法規則ごとに網羅的に列挙する。**

### 16.3 文法中のfactor試行位置の完全列挙

factorが試行される位置:

| # | 文法規則 | factor試行のコンテキスト |
|---|---------|----------------------|
| F1 | `right` (L174) | `factor * rightOperator.zeroOrMore` — 式の最初のトークン |
| F2 | `rightOperator` `.` (L167) | `.` の右辺: `nonFloatFactor` |
| F3 | `rightOperator` `?.` (L168) | `?.` の右辺: `nonFloatFactor` |
| F4 | `rightOperator` `::` (L169) | `::` の右辺: `nonFloatFactor` |
| F5 | `rightOperator` `?::` (L170) | `?::` の右辺: `nonFloatFactor` |
| F6 | `templateStringContent` (L96) | `$` の直後: `ref { factor }` |
| F7 | `formattedString` (L97) | `$%...` の直後: `ref { brackets }` ← factorではなくbracketsのみ |

F2-F5はnonFloatFactor経由、F6は直接factor経由。F7はbracketsのみなので`:` は関係しない。

**factorは常に式の解析チェーンの最下層（F1）で試行される。** つまり、以下のすべての優先順位レベルでfactorが最終的に到達する:

```
factor ← right ← pow ← left ← mul ← add ← range ← infixIdentifier ←
match ← spaceship ← comparison ← and ← or ← condition ← commas ←
pipeRight/executionRight ← stream ← semicolons ← expression
```

### 16.4 既存の有効なコード中で `:` がfactor位置で試行される場面

**重要な洞察: 既存の有効なコードでは、`:` はfactorではないため、factor位置に `:` があればfactorは必ず失敗する。factorが失敗した場合、上位パーサーもfactorの結果に依存しているため連鎖的に失敗する。**

したがって、既存コードでfactor位置に `:` が来る場面とは、**PEGのバックトラック過程で一時的にfactor位置に `:` が試行されるが、その選択肢全体は最終的に失敗し、別の選択肢が成功する**という状況に限られる。

### 16.5 バックトラック経路の網羅的列挙

文法中の `or()` による選択肢（バックトラックが起こる場所）を列挙し、各選択肢内でfactorが `:` 位置で試行されうるかを検証する。

#### 16.5.1 `condition` パーサー (L231-236)

```kotlin
val condition: Parser<Node> = or(
    // A: 三項演算子  or ? condition : condition
    or * -b * (-'?').result * -b * ref { condition } * -b * -':' * !':' * -b * ref { condition },
    // B: Elvis  or ?: condition
    or * -b * (-"?:").result * -b * ref { condition },
    // C: !?
    or * -b * (-"!?").result * -b * ref { condition },
    // D: 素通し
    or,
)
```

**選択肢Aの中間の `ref { condition }`（`?` の後）でfactorが `:` 位置で試行される。**

これは§15で詳細に分析済み。結論: 選択肢AでcolonIndentBlockがマッチしても、三項演算子の2番目の `:` が残らず選択肢Aは失敗する。選択肢B（Elvis）にフォールバックし、従来と同じASTが得られる。

ただし、以下の入力パターンについてさらに精密に検証する:

**パターン1: `a ?: b` （同一行、改行なし）**
- 選択肢A: `?` 消費 → `ref { condition }` at `:` → colonIndentBlock: `:` 消費、次は ` b` — 改行なし → colonIndentBlock失敗 → factor失敗 → 選択肢A失敗
- 選択肢B: `?:` 消費 → `b` → `a ?: b` ✓
- **変化なし** ✓

**パターン2: `a ?:\n    b` （改行+インデントあり）**
- 選択肢A: `?` 消費 → `-b` は `:` を消費しない（`s` は `[ \t]+` のみ） → `ref { condition }` at `:` → colonIndentBlock: `:`, `\n`, indent=4>0 → マッチ、body=`b` → 成功 → `-b` → `-':' * !':'` → `:` なし → **選択肢A失敗**
- 選択肢B: `?:` 消費 → `-b` で `\n    ` 消費 → `b` → `a ?: b` ✓
- **変化なし** ✓

**パターン3: `a ?:\n    b: c` （改行+インデント、右辺にエントリー）**
- 選択肢A: colonIndentBlockがbody `b: c` を吸収 → 2番目の `:` なし → **選択肢A失敗**
- 選択肢B: `?:` 消費 → `-b` → `b: c` → stream中で `b : c`（エントリー） → Elvis: `a ?: (b : c)` ✓
- **変化なし** ✓

**パターン4: `a ?:\n b` （改行+1スペースインデント）**
- 選択肢A: colonIndentBlock: indent=1>0 → マッチ → 2番目の `:` なし → **選択肢A失敗**
- 選択肢B: `?:` 消費 → `-b` → `b` → `a ?: b` ✓
- **変化なし** ✓

**パターン5: `a ?:\nb` （改行、インデントなし = 0文字目）**
- 選択肢A: colonIndentBlock: indent=0, currentIndent=0, 0>0は偽 → **colonIndentBlock失敗**
- 選択肢B: `?:` → `-b` → `b` → `a ?: b` ✓
- **変化なし** ✓

#### 16.5.2 `stream` パーサー (L281-284)

```kotlin
val stream: Parser<Node> = or(
    // A: 代入系
    commas * assignmentOperatorPart * ref { stream },
    // B: パイプ/実行
    commas * streamRightPart.zeroOrMore,
)
```

`assignmentOperatorPart` = `-s * assignmentOperator.result * -b`

`assignmentOperator` (L254-262) の中で `:` を使うもの:
- `:` → `-':' * !'=' * !':'`
- `:=` → `-":="`

選択肢Aで `commas` が成功した後、`assignmentOperatorPart` で `:` が消費される。**これはfactor位置ではない。** `:` はassignmentOperator位置で消費されるため、colonIndentBlockの対象外。

選択肢Aの `ref { stream }` 内でfactorが試行される場面: **右辺の式の先頭。** 既存の有効なコードでは、`:` は右辺の先頭に来ない（factorではないため）。

**変化なし** ✓

#### 16.5.3 `pipeRight` パーサー (L268-272)

```kotlin
val pipeRight: Parser<Node> = or(
    commas * pipeOperatorPart * ref { pipeRight },
    commas * assignmentOperatorPart * ref { stream },
    commas,
)
```

`pipeOperatorPart` 内にも `assignmentOperatorPart` 内にも `:` を含む演算子がある。しかしこれらはすべて中置演算子位置であり、factor位置ではない。

**変化なし** ✓

#### 16.5.4 `executionRight` パーサー (L273-276)

```kotlin
val executionRight: Parser<Node> = or(
    commas * assignmentOperatorPart * ref { stream },
    commas,
)
```

同上。**変化なし** ✓

#### 16.5.5 `semicolonsPart` パーサー (L286-290)

```kotlin
val semicolonsPart: Parser<List<Node>> = or(
    // A: 改行区切り
    stream * -s * -br * -b * ref { semicolonsPart },
    // B: セミコロン区切り
    (stream * -s + fixed(EmptyNode)) * -';' * (-b * ref { semicolonsPart } + fixed(listOf(EmptyNode))),
    // C: 単文
    stream,
)
```

選択肢Aの `ref { semicolonsPart }` 内で、次の文の先頭にfactorが試行される。既存の有効なコードでは、`:` は文の先頭に来ない。

**変化なし** ✓

#### 16.5.6 `commasPart` パーサー (L238-241)

```kotlin
val commasPart: Parser<List<Node>> = or(
    (condition * -b + fixed(EmptyNode)) * -',' * (-b * ref { commasPart } + fixed(listOf(EmptyNode))),
    condition,
)
```

カンマの後に来る式。`:` が来ることはない（既存では）。**変化なし** ✓

#### 16.5.7 `factor` 自体 (L139)

```kotlin
val factor: Parser<Node> = jump + hexadecimal + identifier + quotedIdentifier +
    float + integer + rawString + templateString + embeddedString + regex + brackets
```

colonIndentBlockは**末尾に追加**。PEGの順序付き選択により、既存の選択肢が先に試行される。既存の選択肢のいずれかが成功すれば、colonIndentBlockは試行されない。

**唯一の影響: 既存の選択肢がすべて失敗した場合にcolonIndentBlockが試行される。** これは `:` が既存のfactorでない場合のみ。既存の有効なコードでは、factor位置にはfactorとして有効なトークンが来るため、colonIndentBlockに到達することはない。

**変化なし** ✓

#### 16.5.8 左結合演算子パーサー群

`mul`, `add`, `range`, `infixIdentifier`, `match`, `spaceship`, `comparison`, `and`, `or` — すべて `leftAssociative()` を使用。

```kotlin
leftAssociative(lower, -s * operator.result * -b) { left, op, right -> ... }
```

演算子の右辺は `lower` レベルの式。factor位置に到達するまで下降する。`add` の `-` は `-'-' * !'>'` だが、これはfactor位置ではなく演算子位置。

**変化なし** ✓

#### 16.5.9 `rightOperator` (L156-173)

```kotlin
val rightOperator: Parser<(Node) -> Node> = or(
    ...
    -b * (-"::").result * -b * nonFloatFactor,   // L169
    -b * (-"?::").result * -b * nonFloatFactor,  // L170
    ...
)
```

`::` と `?::` の右辺で `nonFloatFactor` が試行される。**nonFloatFactor にもcolonIndentBlockを追加するかどうか**は設計判断だが、仮に追加しても、既存コードで `::` や `?::` の後に `:` が来ることはない（既存ではfactorではないため）。

**変化なし** ✓

#### 16.5.10 `pow` パーサー (L175-178)

```kotlin
val pow: Parser<Node> = right * (-s * (-'^').result * -b * ref { left }).optional
```

`^` の右辺は `ref { left }`。`left` → `unaryOperator.zeroOrMore * pow` → `pow` → `right` → `factor`。既存コードで `^` の右辺に `:` は来ない。

**変化なし** ✓

#### 16.5.11 `left` パーサー (L179)

```kotlin
val left: Parser<Node> = (unaryOperator.result * -b).zeroOrMore * pow
```

前置演算子 `?`（L146）の後に `-b` → `pow` → `right` → factor。`?` の後に `:` が来る場合:

```
?:
    body
```

既存: `?` は前置演算子。その後factorが期待される。`:` はfactorではない → 失敗。この入力は無効。

colonIndentBlock追加後: `?` 前置演算子の後に `:` → colonIndentBlock → `?(indent_block(body))` — **新規の有効な構文。** 既存の有効なコードではないため後方互換性に影響なし。

**変化なし** ✓

### 16.6 `condition` 選択肢Aの再帰構造と `?:` の精密検証

§15.3-15.8で分析した内容を踏まえ、ここでは**conditionの再帰構造**に焦点を当てる。

`condition` の選択肢Aは再帰的:
```
or ? condition : condition
```

1番目の `condition` も再び `condition` のor選択を試行する。もし1番目の `condition` 内で**さらにElvisが使われていた場合**:

**パターン6: `a ? b ?: c : d`（三項の中にElvis）**

```
a ? b ?: c : d
```

解析:
- 選択肢A: `or` → `a`. `?`. `ref { condition }`:
  - 再帰的に `condition` をパース。入力: `b ?: c : d`
  - 内側の condition 選択肢A: `or` → `b`. `?`. `ref { condition }`:
    - 入力: `: c : d` の位置。factor at `:` → 失敗（既存）/ colonIndentBlock: `:` の後が ` c`、改行なし → 失敗。
  - 内側の condition 選択肢B: `or` → `b`. `?:`. `ref { condition }`:
    - 入力: `c : d`。condition → `c`（orレベルで停止）。
    - Elvis: `b ?: c`。
  - 1番目の condition = `b ?: c`。
- `-b` → ` `. `-':' * !':'` → `:`. `-b` → ` `. `ref { condition }` → `d`.
- 三項: `a ? (b ?: c) : d` ✓

colonIndentBlock追加後: 同じ。内側のfactorで colonIndentBlock は改行なしのため失敗。**変化なし** ✓

**パターン7: `a ? b ?:\n    c\n: d`（改行を含む三項+Elvis複合）**

```
a ? b ?:
    c
: d
```

解析:
- 選択肢A: `or` → `a`. `?`. `-b` → ` `. `ref { condition }`:
  - 入力: `b ?:\n    c\n: d`
  - 内側の condition 選択肢A: `or` → `b`. `?`. `-b` → nothing（次は `:`）. `ref { condition }`:
    - 入力: `:\n    c\n: d`
    - colonIndentBlockなし: factor at `:` → 失敗 → condition失敗 → 選択肢A失敗
    - colonIndentBlockあり: factor → colonIndentBlock: `:`, `\n`, indent=4>0, body=`c` → 成功。condition = `indent_block(c)`.
    - 戻って: `-b` → `\n` 消費。`-':' * !':'` at `: d` → `:` 消費。`-b` → ` `. `ref { condition }` → `d`.
    - **内側の選択肢A成功!** `b ? indent_block(c) : d` ← 三項演算子！
  - 1番目の condition = `b ? indent_block(c) : d`。

  外側に戻る:
  - `-b` → ファイル末尾。`-':' * !':'` → `:` なし → **選択肢A失敗**。

- 選択肢B: `or` → `a`. `?:` → `a ?:\n` ...wait。`(-"?:").result` は位置 `?` から `?:` を連続2文字として消費する。`?` の後の文字は `:` で隣接 → マッチ。
  - `-b` → `\n    ` 消費。
  - `ref { condition }` at `c`:
    - condition → or → ... → factor → `c`。condition → `c`。
  - Elvis: `a ?: c`。position は `c` の後、`\n: d`。

  commas → `a ?: c`。stream:
  - assignmentOperatorPart: `-s` → nothing at `\n`。assignmentOperator at `\n` → どれもマッチしない。失敗。
  - streamRightPart.zeroOrMore → empty。stream → `a ?: c`。

  semicolonsPart:
  - 選択肢A: stream(`a ?: c`) * -s → nothing * -br → `\n` * -b → nothing * ref { semicolonsPart }:
    - 入力: `: d`。stream → commas → ... → factor at `:` → 失敗（既存）。semicolonsPart失敗。
  - 選択肢C: stream → `a ?: c`。

  expression → `a ?: c`。rootParser: expression → `a ?: c`。残り `\n: d` は消費されず。**パース不完全 → 実質パースエラー。**

**これは既存の有効なコードではない!** `a ?:\n    c\n: d` は現在パースに成功しない。

colonIndentBlock追加後:
- 選択肢Aの内側で `b ? indent_block(c) : d` が成功 → 外側の condition = `b ? indent_block(c) : d` → しかし外側の三項の2番目の `:` がない → 選択肢A失敗。
- 選択肢B: Elvis `a ?: c` → ...

しかし待て。**colonIndentBlock追加後、`ref { semicolonsPart }` で `: d` は colonIndentBlock でパースできるか？**

`: d` — colonIndentBlockは `:` の後に改行を要求する。`d` は改行ではない → colonIndentBlock失敗。

**この入力はcolonIndentBlock追加後もパース不完全。** ← ただしこれは元々無効なコード。

**パターン8: `a ? b ?:\n    c\n:\n    d`（全パーツがインデントブロック）**

```
a ? b ?:
    c
:
    d
```

既存: 無効。colonIndentBlock追加後:
- 選択肢A: `?` 消費 → condition: `b ?:\n    c\n:\n    d`
  - 内側 選択肢A: `b` → `?` → condition at `:\n    c\n:\n    d`:
    - colonIndentBlock: `:`, `\n`, indent(`    c`)=4>0 → body=`c` → 成功。
  - 内側 `-b` → `\n` 消費。`:` at `:\n    d` → `!':'`: 次は `\n` ≠ `:` → `:` 消費。
  - `-b` → `\n    ` 消費。condition → `d`。
  - 内側三項: `b ? (indent_block c) : d`。
- 外側 `-b` → ファイル末尾。`-':' * !':'` → `:` なし → 外側選択肢A失敗。
- 選択肢B: `a` → `?:` 消費 → `-b` → `\n    ` → condition at `c`:
  - `c` → condition → `c`。
- Elvis: `a ?: c`。position after `c`, at `\n:\n    d`。
- semicolonsPart: stream(`a ?: c`) → `-s` → nothing → `-br` → `\n` → `-b` → nothing → ref { semicolonsPart } at `:\n    d`:
  - stream → factor → colonIndentBlock: `:`, `\n`, indent=4>0, body=`d` → 成功。
  - semicolonsPart → [indent_block(d)]。
- semicolonsPart → [`a ?: c`, `indent_block(d)`]。
- expression → `(a ?: c); (indent_block d)`。

**これは新規の有効な構文。** 既存コードではないため後方互換性に影響なし。✓

### 16.7 `?:` 以外の2文字演算子の検証

`:` を末尾に持つ2文字演算子で、先頭文字が前置的に消費されるパスが存在するもの:

| 演算子 | 先頭文字の前置消費パス | 検証 |
|--------|---------------------|------|
| `?:` (Elvis) | `?` が三項演算子の先頭として消費 | §15, §16.5.1で検証済み |
| `!:` (実行) | `!` が前置演算子 `!` として消費 | 下記で検証 |
| `::` (メソッドバインド) | 1番目の `:` が…? | 下記で検証 |
| `:=` (変数宣言) | `:` が…? | 下記で検証 |

#### 16.7.1 `!:` の検証

`!:` は `executionOperator` (L252)。`!` は前置演算子（`unaryOperator` L147）として `!'!' * !'?'` ガード付きで定義されている。

`!:` がパースされるのは `executionOperatorPart` = `-b * executionOperator.result * -b`。これは `streamRightPart` 内で使われる。

仮に `!` が前置演算子として消費された場合: `!` は `unaryOperator` で `-'!' * !'!' * !'?'`。`:` は `!` でも `?` でもないのでガードを通過。`!` が消費される。その後 `-b` → factor。factor位置に `:` が来る。

しかし、`!` が前置演算子として消費されるのは `left` パーサー (L179) の `(unaryOperator.result * -b).zeroOrMore * pow` であり、これはfactorの上の左辺解析。一方 `!:` は `executionOperator` であり、stream レベルで処理される。

**問題のパターン: `a !:\n    b` は `a !: b`（実行演算子）か、`a` の後に `!` 前置 + colonIndentBlock `:\n    b` か？**

`stream` パーサー (L281-284):
```
commas * streamRightPart.zeroOrMore
```

`streamRightPart` (L277-280):
```
pipeOperatorPart * pipeRight
executionOperatorPart * executionRight
```

`executionOperatorPart` = `-b * executionOperator.result * -b`。

解析: `a !:\n    b`
- stream → commas → ... → factor → `a`。chain up → commas = `a`。
- streamRightPart 試行:
  - executionOperatorPart: `-b` → ` ` 消費。executionOperator at `!:` → `!:` 2文字消費。`-b` → `\n    ` 消費。
  - executionRight → commas → condition → ... → factor → `b`。
  - **`a !: b` として成功。**

colonIndentBlock追加後: 同じパス。`!:` は `executionOperator` レベルで2文字として消費される。factorは `a` と `b` の位置でのみ試行され、`:` はそのどちらの位置にもない。

**変化なし** ✓

しかし、もし `commas` 内で `!` が前置演算子として消費される可能性は？ `commas` → `condition` → `or` → ... → `left` → `(unaryOperator * -b).zeroOrMore * pow`。

入力 `a !:\n    b` の場合、factorが `a` をパースした後、chain upしていく過程で `!:` に到達する。`:` の位置は、mul/add/range等の中置演算子位置でチェックされるが、どの演算子にもマッチしない。最終的に `or` レベルまで上昇し、condition に到達。condition のどの選択肢も `:` では始まらない。commas に到達。commas → `a`。

その後 stream レベルで `!:` が `executionOperator` として消費される。**`:` がfactorとして試行される瞬間は存在しない。**

**変化なし** ✓

#### 16.7.2 `::` の検証

`::` は `rightOperator` (L169): `-b * (-"::").result * -b * nonFloatFactor`。

`right` = `factor * rightOperator.zeroOrMore`。factorの後に `::` が試行される。`::` は2文字トークンとして消費される。最初の `:` がfactorとして試行されることはない（factorは**前に**パースされ成功している）。

**改行を含む場合の精密トレース: `a ::\n    b`**

```
a ::
    b
```

解析: `right` = `factor * rightOperator.zeroOrMore`

1. `factor` → `a`（identifier）。成功。
2. `rightOperator` の選択肢L169: `-b * (-"::").result * -b * nonFloatFactor`
   - `-b` → `s * -(br * s).zeroOrMore`。`s` = ` `（スペース）消費。`-(br * s).zeroOrMore` → `br` の位置は `:`。`:` は改行 `\n|\r\n?` ではない → `zeroOrMore` は0回で成功。`-b` 完了。
   - `(-"::").result` → `::` を2文字一括で消費。成功。
   - `-b` → `s` は何も消費しない → `br` → `\n` 消費 → `s` → `    `（4スペース）消費。成功。
   - `nonFloatFactor` → `b`（identifier）。成功。
3. **結果: `a :: b`（InfixColonColonNode）** ✓

**曖昧性が生じない理由:**

1. **rightOperator位置にcolonIndentBlockは存在しない。** colonIndentBlockはfactor/nonFloatFactor位置にのみ存在する。`a` がfactorとして成功した後、rightOperatorが試行される位置ではfactorは試行されない。
2. **`::` は2文字トークン `-"::"` として原子的に消費される。** PEGでは `::` が1文字ずつ `:` + `:` に分割されるパスは存在しない。
3. **エントリー演算子 `:` のガード。** assignmentOperator の `:` は `-':' * !'=' * !':'` であり、次の文字が `:` の場合にマッチしない。したがって、stream レベルで `::` がエントリー演算子 `:` + colonIndentBlock `:` に分割されることもない。
4. **`a : :\n    b`（スペース区切り）は別の話。** これはエントリー演算子 `:` の右辺に colonIndentBlock `:\n    b` が来る新規構文であり、`a :: b` とは文字列が異なる。

**変化なし** ✓

#### 16.7.3 `:=` の検証

`:=` は `assignmentOperator` (L257): `-":="` 。stream レベルで消費される。

`stream` → `commas * assignmentOperatorPart * ref { stream }` — commasの後に `:=` が試行される。factorはcommas内で試行済み。`:=` の位置ではfactorは試行されない。

**変化なし** ✓

### 16.8 三項演算子の `:` がcolonIndentBlockに奪われるケースの検証

三項演算子 `a ? b : c` の `:` は condition レベルで消費される（factor位置ではない）。

```
or * -b * (-'?').result * -b * ref { condition } * -b * -':' * !':' * -b * ref { condition }
```

ここで `-':' * !':'` は、1番目の `ref { condition }` が成功した**後に**試行される。この `:` はfactor位置ではなく、condition パーサーの内部トークン。**colonIndentBlockがこの `:` を消費することはありえない。**

ただし、間接的な影響の可能性:
- 1番目の `ref { condition }` が、colonIndentBlockの追加により**より多くの入力を消費する**ようになった場合、2番目の `:` の位置がずれる

これが起こるのは、1番目の `ref { condition }` の中で、式の解析がcolonIndentBlockにより拡張される場合。しかし、1番目の condition は `condition` レベルであり、factorレベルまで下降する。factorレベルでcolonIndentBlockがマッチするのは `:` がfactor位置にある場合のみ。

**既存の有効なコード `a ? b : c` ではどうか:**

- `ref { condition }` at `b : c`: condition → or → ... → factor → `b`。chain up → or → `b`。condition → `b`（`:` は condition/or のどのレベルの演算子でもないため、`b` で停止）。

`:` は condition の**外**で消費される。factor位置に `:` は来ない。**変化なし** ✓

**改行を含む場合 `a ? b\n: c`:**

- 選択肢A: `?` 消費。`-b` → ` ` 消費。`ref { condition }` at `b\n: c`:
  - condition → or → ... → factor → `b`。chain up → `b`。condition → `b`。position は `b` の後、`\n: c` の前。
- `-b` → `\n` 消費。position at `: c`。
- `-':' * !':'` → `:` 消費。next ` ` ≠ `:`。成功。
- `-b` → ` `。`ref { condition }` → `c`。
- 三項: `a ? b : c`。✓

colonIndentBlock追加後: 同じパス。`ref { condition }` at `b` ではfactor → `b` → 成功。colonIndentBlockは試行されない（`b` はidentifierとして先にマッチ）。`:` は condition の外で消費される。**変化なし** ✓

### 16.9 `-b` パーサーが `:` を飛び越えないことの証明

`b` = `s * -(br * s).zeroOrMore`

`s` = `-(+Regex("""[ \t]+""") + lineComment + blockComment).zeroOrMore`

`s` がマッチするもの: `[ \t]+`（水平空白）、`#` or `//` で始まる行コメント、`/*...*/` ブロックコメント。

**`:` は水平空白でもコメント開始文字でもない。** したがって `s` は `:` を消費しない。

`br` = `+Regex("""\n|\r\n?""")` — 改行のみ。`:` は改行ではない。

**結論: `-b` は `:` を飛び越えない。** `?` の直後に `:` がある場合、`-b` は何も消費せず、次のパーサー（`ref { condition }` など）は `:` の位置から開始する。

### 16.10 テンプレート文字列内の `$` + factor

```kotlin
(-'$').result * ref { factor }
```

テンプレート文字列 `"...$:..."` で `$` の後に `:` が来る場合:

- 既存: factor at `:` → 失敗。`(-'$').result * ref { factor }` 全体が失敗。`:` は `templateStringCharacter` の `[^"$\\]+` にマッチし、リテラル文字として扱われる。

- colonIndentBlock追加後:
  - `$` の後の `:` でcolonIndentBlockが試行される
  - `:` の後に改行があるか？テンプレート文字列は `"..."` で囲まれた中。改行がある場合（複数行テンプレート文字列）:
    ```
    "$:
        body"
    ```
  - colonIndentBlock: `:` 消費、改行あり、インデント増加チェック... これは**既存の無効な構文が新たに有効になるケース**であり、既存の有効なコードの動作が変わるケースではない。
  - **ただし注意:** 既存の `"$:\n    body"` は `$` + factor 失敗 → `$` がリテラル `$` として扱われない。実は `$` はtemplateStringCharacterの `[^"$\\]+` で除外されているため、`$` 単体ではマッチしない。つまり `"$:..."` は `$` でtemplateStringContent の2番目の選択肢が試行される: `(-'$').result * ref { factor }`。factor 失敗 → 2番目の選択肢全体が失敗。3番目の選択肢（formatter）も `$%` でないため失敗。templateStringContent のどの選択肢も失敗 → `zeroOrMore` が停止。次に `-'"'` が試行される → `$` ≠ `"` → **テンプレート文字列全体のパース失敗。**

  したがって、`"$:\n    body"` は**既存でも無効な構文。** 後方互換性に影響なし。

**変化なし** ✓

### 16.11 括弧内の式の先頭

```kotlin
val round: Parser<Node> = (-'(').result * -b * (ref { expression } * -b).optional * -')'
```

`(` の後に `-b` → `expression`。expression → semicolons → semicolonsPart → stream → commas → condition → or → ... → factor。

`(:` のような入力:
- 既存: factor at `:` → 失敗 → expression 失敗 → optional → None → `)` を期待。
- colonIndentBlock追加後: factor → colonIndentBlock at `:` → 改行が必要。`(:b)` のように改行なしなら失敗。

**既存の有効なコードでは `(` の直後に `:` は来ない。変化なし** ✓

### 16.12 結論

**colonIndentBlock を factor の末尾に追加しても、既存の有効なソースコードのパース結果は一切変化しない。**

その根拠:

1. **factor位置の排他性:** 既存の有効なコードでは、factor位置にはfactorとして有効なトークン（識別子、数値、文字列、括弧等）が来る。`:` は既存のfactorではないため、既存コードのfactor位置に `:` が来ることはない。

2. **PEGバックトラックの安全性:** conditionパーサーの選択肢A（三項演算子）で、`?` の後にfactorとして `:` がcolonIndentBlockで消費されうるが、三項演算子パターンは2番目の `:` も必要とする。colonIndentBlockが式を吸収するため2番目の `:` が残らず、選択肢Aは失敗する。選択肢B（Elvis）にフォールバックし、従来と同一のASTが得られる。

3. **`-b` パーサーの不透過性:** `-b` は水平空白・改行・コメントのみを消費し、`:` を消費しない。これにより、`?` と `:` の間に `-b` が挟まっている場合でも、`:` が意図しない位置に移動することはない。

4. **中置演算子位置の分離:** `:` を含む既存の中置演算子（`:`, `:=`, `::`, `?::`, `?:`, `!:`）はすべて、factorより上位の文法レベル（condition, assignmentOperator, executionOperator, rightOperator）で消費される。これらの位置でfactorは試行されないため、colonIndentBlockとの競合は発生しない。

5. **colonIndentBlockのマッチ条件の厳格性:** colonIndentBlockは `:` + 改行 + インデント増加を要求する。同一行上の `:` には決してマッチしない。これにより、`a ?: b` のような同一行上のElvis演算子は影響を受けない。

### 16.13 検証済みパターン一覧

| # | パターン | 既存の解析結果 | colonIndentBlock追加後 | 変化 |
|---|---------|-------------|---------------------|------|
| 1 | `a ?: b` | Elvis: `a ?: b` | 同じ | なし |
| 2 | `a ?:\n    b` | Elvis: `a ?: b` | 同じ | なし |
| 3 | `a ?:\n    b: c` | Elvis: `a ?: (b : c)` | 同じ | なし |
| 4 | `a ?:\n b` | Elvis: `a ?: b` | 同じ | なし |
| 5 | `a ?:\nb` | Elvis: `a ?: b` | 同じ | なし |
| 6 | `a ? b ?: c : d` | 三項: `a ? (b ?: c) : d` | 同じ | なし |
| 7 | `a !:\n    b` | 実行: `a !: b` | 同じ | なし |
| 8 | `key: value` | エントリー: `key : value` | 同じ | なし |
| 9 | `key:\n    value` | エントリー: `key : value` | 同じ | なし |
| 10 | `a :: b` | メソッドバインド | 同じ | なし |
| 10b | `a ::\n    b` | メソッドバインド: `a :: b` | 同じ | なし |
| 11 | `a ?:: b` | Null安全メソッドバインド | 同じ | なし |
| 12 | `x := y` | 変数宣言 | 同じ | なし |
| 13 | `a ? b : c` | 三項: `a ? b : c` | 同じ | なし |
| 14 | `a ? b\n: c` | 三項: `a ? b : c` | 同じ | なし |
| 15 | `a ? b:\n    c` | 三項: `a ? b : c` | 同じ | なし |
| 16 | `(a)` | 丸括弧 | 同じ | なし |
| 17 | `a >> b` | 実行 | 同じ | なし |
| 18 | `a \| b` | パイプ | 同じ | なし |
| 19 | `a => b` | 引数 | 同じ | なし |
| 20 | `!a` | 前置否定 | 同じ | なし |
