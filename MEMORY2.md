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
