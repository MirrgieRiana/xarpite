---
title: CLI
---

# CLI

Xarpiteはコマンドラインインターフェース（CLI）を通じて実行できます。

ブラウザ版にはない、CLI版限定の機能や概念がいくつか存在します。

<!-- toc -->

## ランチャーとランタイム

CLI上でXarpiteを実行する際には、ランチャーとランタイムという2つのレイヤーが存在します。

---

ランチャーとは `xarpite` コマンドを直接受け付けるシェルスクリプトを指します。

ランチャーは環境変数や引数などに基づいて実際に起動すべきランタイムの決定とその起動を行います。

---

ランタイムとはXarpiteスクリプトを実際に動作させるプログラムを指します。

ランタイムには複数のプラットフォームによる異なる実装があり、これはXarpiteエンジンと呼ばれます。

## Xarpiteを実行するコマンド

### `xarpite`: Xarpiteを実行する基本的なコマンド

`xarpite` コマンドはXarpiteを実行するための最も基本的なコマンドです。

```shell
$ xarpite -h | tail -n +2
# Usage: xarpite <Launcher Options> <Runtime Options> [--] [scriptfile] <arguments>
# Launcher Options:
#   --native                 Use the native engine
#   --jvm                    Use the JVM engine
#   --node                   Use the Node.js engine
# Runtime Options:
#   -h, --help               Show this help
#   -v, --version            Show version
#   -q                       Run script as a runner
#   -f <scriptfile>          Read script from file
#                            Omit [scriptfile]
#   -e <script>              Evaluate script directly
#                            Omit [scriptfile]
```

---

`Launcher Options` はランチャー側で、 `Runtime Options` はランタイム側で解釈されます。

このため、両者は順序を入れ替えて指定することはできません。

---

`xarpite` コマンドはシバン行によってXarpiteスクリプトを直接実行するためにも利用できます。

```shell
$ {
  echo '#!/usr/bin/env xarpite' > script.xa1
  echo '100 + 20 + 3' >> script.xa1
  chmod +x script.xa1

  ./script.xa1

  rm script.xa1
}
# 123
```

### `xa`: Xarpiteを手元で実行する便利なショートカット

`xa` コマンドは `xarpite` コマンドのショートカットです。

```shell
$ xa -h | tail -n +2
# Usage: xa <Launcher Options> <Runtime Options> [--] [script] <arguments>
# Launcher Options:
#   --native                 Use the native engine
#   --jvm                    Use the JVM engine
#   --node                   Use the Node.js engine
# Runtime Options:
#   -h, --help               Show this help
#   -v, --version            Show version
#   -q                       Run script as a runner
#   -f <scriptfile>          Read script from file
#                            Omit [script]
#   -e <script>              Evaluate script directly
#                            Omit [script]
```

---

`xarpite` コマンドと概ね同じ仕様ですが、以下の点で重要な違いがあります。

- 文字数が2文字と非常に短い。
- 第一引数がデフォルトでXarpiteスクリプトファイルではなくXarpiteスクリプトそのものとして解釈される。
- **Xarpite2などが出た場合、同じ `xa` コマンドが使われる可能性がある。**

---

大雑把に言えば、人間が手元のコンソール上で使うための便利なコマンドです。

`xa` コマンドを使えば非常に少ない記述量で簡単な計算をすることができます。

```shell
$ xa '100 + 20 + 3'
# 123
```

---

一方で、 `xa` コマンドはシェルスクリプトなどのファイル内に記述する利用法を想定していません。

その目的には代わりに `xarpite` コマンドを使用してください。

## ヘルプ系のオプション

### `-h`, `--help`: ヘルプの表示

`-h` または `--help` オプションを指定するとヘルプメッセージが表示されます。

### `-v`, `--version`: バージョン情報の表示

`-v` または `--version` オプションを指定するとXarpiteのバージョンが表示されます。

## Xarpiteエンジンの指定

### `XARPITE_ENGINE`: Xarpiteエンジンを指定する環境変数

`XARPITE_ENGINE` 環境変数はXarpiteの実行エンジンを指定します。

- `native`: ネイティブ実装を使用
- `jvm`: JVMを使用
- `node`: Node.jsを使用

---

一部の機能は特定のエンジンでのみ利用可能です。

---

`XARPITE_ENGINE` 環境変数が指定されていない場合、設定ファイル `default_engine` の内容が使用されます。

通常、この設定ファイルはXarpiteのインストール時に作成されます。

この設定ファイルも存在しない場合、デフォルトで `native` エンジンが使用されます。

---

コマンドラインオプションによるXarpiteエンジンの指定は環境変数による指定よりも優先されます。

## Xarpiteエンジンを指定するコマンドラインオプション

Xarpiteエンジンを指定するコマンドラインオプションは排他的であり、複数を同時に指定することはできません。

### `--native`: ネイティブ実装エンジンを使用

ネイティブコンパイルされたXarpiteエンジンを使用します。

### `--jvm`: JVMエンジンを使用

JVM上で動作するXarpiteエンジンを使用します。

### `--node`: Node.jsエンジンを使用

Node.js上で動作するXarpiteエンジンを使用します。

## 戻り値の出力

CLI版Xarpiteでは、標準の動作としてプログラム全体の戻り値を標準出力に出力します。

---

この際、出力値の文字列化が行われます。

```shell
$ xa '
  Object := {
    new: () -> Object{}
    `&_`: _ -> "Hello, World"
  }
  Object.new()
'
# Hello, World
```

---

コードの値がストリームだった場合、各要素を1行ずつ出力します。

```shell
$ xa '1 .. 3'
# 1
# 2
# 3
```

---

コードの戻り値が空ストリームである場合、何も出力されません。

```shell
$ xa '1 + 2; ,'
```

### `-q`: 戻り値の出力の抑制

`-q` オプションを指定すると、戻り値の出力が行われなくなります。

出力を行うには別途 `OUT` 関数などを使う必要があります。

```shell
$ xa -q '
  OUT << "apple"
  OUT << "banana"
  "orange"
'
# apple
# banana
```

---

厳密には、このオプションはソースコード全体を文（runner）コンテキストとして解釈することを指定するオプションです。

このため末尾式の部分に変数宣言文などの文が書けるようになります。

## スクリプトの指定

実行するXarpiteスクリプトの指定方法は起動コマンドと指定方法で6通りに別れます。

| 起動コマンド    | スクリプトの指定方法 | 記述例                              | 扱い        |
|-----------|------------|----------------------------------|-----------|
| `xarpite` | 第一引数       | `xarpite script.xa1 arg1 ...`    | スクリプトファイル |
| `xarpite` | `-f`       | `xarpite -f script.xa1 arg1 ...` | スクリプトファイル |
| `xarpite` | `-e`       | `xarpite -e '1 + 2' arg1 ...`    | スクリプト     |
| `xa`      | 第一引数       | `xa '1 + 2' arg1 ...`            | スクリプト     |
| `xa`      | `-f`       | `xa -f script.xa1 arg1 ...`      | スクリプトファイル |
| `xa`      | `-e`       | `xa -e '1 + 2' arg1 ...`         | スクリプト     |

### `-f`: ファイルからスクリプトを読み込む

`-f <scriptfile>`

`-f` オプションを指定すると、指定したXarpiteスクリプトファイルからXarpiteスクリプトを読み込んで実行します。

`USE` 関数とは異なり、 `scriptfile` が相対パスで指定された場合、カレントディレクトリを起点として解決されます。

```shell
$ {
  echo '100 + 20 + 3' > script.xa1
  xa -f script.xa1
  rm script.xa1
}
# 123
```

---

`-f` オプションが指定された場合、第1引数はスクリプトに渡す引数の一部として解釈されます。

```shell
$ {
  echo 'ARGS()' > script.xa1
  xa -f script.xa1 '100 + 20 + 3' apple banana cherry
  rm script.xa1
}
# 100 + 20 + 3
# apple
# banana
# cherry
```

---

`-f` オプションと `-e` オプションは排他的であり、同時に指定することはできません。

### `-e`: スクリプトを直接実行

`-e <script>`

`-e` オプションを指定すると、指定したXarpiteスクリプトを直接実行します。

```shell
$ xarpite -e '100 + 20 + 3'
# 123
```

---

`-e` オプションが指定された場合、第1引数はスクリプトに渡す引数の一部として解釈されます。

```shell
$ xa -e 'ARGS()' '100 + 20 + 3' apple banana cherry
# 100 + 20 + 3
# apple
# banana
# cherry
```

---

`-f` オプションと `-e` オプションは排他的であり、同時に指定することはできません。

## その他のコマンド

### `xarpite-update`: Xarpiteを最新版に更新する

現在実行中のXarpiteを最新版に更新します。

このコマンドにはインストールディレクトリに書き込みを行う権限が必要です。

## CLI版限定組み込み定数・関数

### `ARGS`: コマンドライン引数を取得

コマンドライン引数が配列で格納されています。

最初の引数が添え字0に対応し、 `xa` コマンドやワンライナーのソースコードは含まれません。

```shell
$ xa 'ARGS' 1 2 3
# [1;2;3]
```

### `PWD`: カレントディレクトリを取得

`PWD: STRING`

現在のワーキングディレクトリのパスです。

このパスは正規化（ `.` や `..` である階層を含みません）されており、絶対パスです。

---

この定数は以下の優先順位に基づいて値を決定します。

1. 環境変数 `XARPITE_PWD`
   - この環境変数はLinux版のランチャースクリプト内で自動的に付与されます。
   - シンボリックリンクの解決はされません。
2. 環境変数 `PWD`
   - この環境変数は多くの場合Linuxシェルが自動的に付与します。
   - シンボリックリンクの解決はされません。
3. プラットフォーム固有の取得方法
   - どちらの環境変数も利用できなかった場合、プラットフォームごとに固有の方法でカレントディレクトリを取得します。
   - シンボリックリンクの解決が行われる場合があります。

Windows上でJVM版ランタイムを起動した場合は3に該当しますが、ジャンクションの解決は行われないことが判明しています。

### `ENV`: 環境変数を取得

環境変数がオブジェクトとして格納されています。

```shell
$ FOO=bar xa 'ENV.FOO'
# bar
```

存在しない変数にアクセスした場合は `NULL` が返ります。

### `IN`, `I`: コンソールから文字列を1行ずつ読み取る

`IN: STREAM<STRING>`

`I: STREAM<STRING>`

標準入力から文字列を1行ずつ読み取るストリームです。

`I` は `IN` の別名です。

```shell
$ { echo 123; echo 456; } | xa 'IN'
# 123
# 456
```

---

ストリームは逐次的であるため、非常に大きな反復も少ないメモリ消費で行うことができます。

```shell
$ xa '1 .. 10000 | "#" * 10000' | xa 'IN | $#_ >> SUM'
# 100000000
```

---

コンソールから1行だけ読み取るには、 `FIRST` 関数を使用します。

```shell
$ {
  echo 123
  echo 456
} | xa -q '
  OUT << "1: $(FIRST(IN))"
  OUT << "2: $(FIRST(IN))"
'
# 1: 123
# 2: 456
```

ストリームは逐次的であるため、非常に大きな反復も少ないメモリ消費で行うことができます。

```shell
$ xa '1 .. 10000 | "#" * 10000' | xa 'IN | $#_ >> SUM'
# 100000000
```

---

`IN` を一度でも使用した場合、 `INB` を使用することはできません。

### `INB`: コンソールからバイトデータを読み取る

`INB: STREAM<BLOB>`

標準入力からバイトデータをBLOBとしてすべて読み取るストリームです。

BLOBは最大8192バイトの長さに分割されます。

```shell
$ echo -n "abc" | xa 'INB'
# BLOB.of([97;98;99])
```

---

`INB` を一度でも使用した場合、 `IN` を使用することはできません。

### `OUT`, `O`: 標準出力に出力

`OUT(value: VALUE): NULL`

`O(value: VALUE): NULL`

標準出力に出力します。

`O` は `OUT` の別名です。

この関数はしばしば左実行パイプ `<<` によって呼び出されます。

```shell
$ xa -q '
  OUT(123)
  OUT << 456
'
# 123
# 456
```

---

ストリームが指定された場合、各要素を1行ずつ出力します。

```shell
$ xa -q '
  OUT(1 .. 3)
'
# 1
# 2
# 3
```

---

`OUT` 関数自体は `NULL` を返します。

### `OUTB`: バイトデータを標準出力に出力

`OUTB(blobLike: BLOB_LIKE): NULL`

`blobLike` をバイト列に変換し、バイト列のまま標準出力に出力します。

ストリームが与えられた場合は各要素を順にバイト列に変換し、順に出力します。

改行は自動的には付与されません。

```shell
$ xa -q 'OUTB(BLOB.of([65, 66, 67, 10]), BLOB.of([68, 69, 70, 10]))'
# ABC
# DEF
```

---

それ以外の部分は概ね `OUT` 関数の仕様に準じます。

---

**Xarpiteでは通常、プログラム全体の戻り値を自動的に標準出力に出力することに注意してください。**

以下のような場合、 `-q` オプションを忘れると、バイト列の最初に「 `NULL` 改行」などのゴミが付きます。

```shell
$ xa -q '65, 66, 67, 10 >> OUTB'
# ABC

$ xa '65, 66, 67, 10 >> OUTB'
# ABC
# NULL
```

### `ERR`: 標準エラー出力に出力

`ERR(value: VALUE): NULL`

標準エラー出力に出力します。

この関数は概ねCLI版 `OUT` 関数と共通の動作をしますが、標準出力ではなく標準エラー出力に出力します。

```shell
$ xa -q 'ERR("Error!")' > /dev/null
# Error!
```

### `ERRB`: バイトデータを標準エラー出力に出力

`ERRB(blobLike: BLOB_LIKE): NULL`

`blobLike` をバイト列に変換し、バイト列のまま標準エラー出力に出力します。

この関数は概ね `OUTB` 関数と共通の動作をしますが、標準出力ではなく標準エラー出力に出力します。

```shell
$ xa -q '65, 66, 67, 10 >> ERRB' > /dev/null
# ABC
```

### `FILES`: ディレクトリ内のファイルの一覧を取得

`FILES(dir: STRING): STREAM<STRING>`

`dir` で指定されたディレクトリ直下のファイル名のストリームを取得します。

ファイル名にはディレクトリのパスは含まれません。

返されるファイルには `.` や `..` は含まれず、ディレクトリやその他の特殊なファイルは含まれます。

返されるファイル名は辞書順にソートされます。

```shell
$ {
  mkdir tmp
  touch tmp/file
  mkdir tmp/dir
  xa 'FILES("tmp")'
  rm tmp/file
  rmdir tmp/dir
  rmdir tmp
}
# dir
# file
```

### `READ`: テキストファイルから読み込み

`READ(file: STRING): STREAM<STRING>`

`file` で指定されたテキストファイルの内容を文字列として1行ずつ読み取ります。

改行コードは除去されます。

```shell
$ {
  echo "apple" > tmp.txt
  echo "banana" >> tmp.txt
  xa 'READ("tmp.txt")'
  rm tmp.txt
}
# apple
# banana
```

### `READB`: バイナリファイルから読み込み

`READB(file: STRING): STREAM<BLOB>`

`file` で指定されたバイナリファイルの内容をBLOBとしてすべて読み取ります。

BLOBは最大8192バイトの長さに分割されます。

```shell
$ {
  echo -en '\x20\x21\x22' > tmp.bin
  xa 'READB("tmp.bin")'
  rm tmp.bin
}
# BLOB.of([32;33;34])
```

### `WRITE`: テキストファイルに書き込み

`WRITE(file: STRING; string: STRING): NULL`

`file` で指定されたファイルに `string` をUTF-8エンコードして書き込みます。

改行の付与や正規化は行われません。

ファイルが既に存在する場合は上書きされます。

```shell
$ {
  xa -q 'WRITE("tmp.txt"; "apple")'
  printf '%s\n' "$(cat tmp.txt | tr '\n' ',')"
  rm tmp.txt
}
# apple
```

### `WRITEL`: テキストファイルに行単位で書き込み

`WRITEL(file: STRING; lines: STREAM<STRING>): NULL`

`file` で指定されたファイルに `lines` の各行を書き込みます。

最後の行も含め、各行の末尾には `\n` が付与されます。

ファイルが既に存在する場合は上書きされます。

```shell
$ {
  xa -q 'WRITEL("tmp.txt"; "apple", "banana", "cherry")'
  printf '%s\n' "$(cat tmp.txt | tr '\n' ',')"
  rm tmp.txt
}
# apple,banana,cherry,
```

### `WRITEB`: バイナリファイルに書き込み

`WRITEB(file: STRING; blobLike: BLOB_LIKE): NULL`

`file` で指定されたファイルに `blobLike` を書き込みます。

ファイルが既に存在する場合は上書きされます。

```shell
$ {
  xa -q 'WRITEB("tmp.bin"; 97, 112, 112, 108, 101)'
  printf '%s\n' "$(cat tmp.bin | tr '\n' ',')"
  rm tmp.bin
}
# apple
```

### `USE`: 外部Xarpiteファイルの結果を取得

`USE(file: STRING): VALUE`

指定されたXarpiteスクリプトを評価した結果を返します。

```shell
$ {
  echo ' "Hello, World!" ' > hello.xa1
  xa 'USE("./hello")'
  rm hello.xa1
}
# Hello, World!
```

---

`file` は `./` または `/` で始まる必要があります。

`./` で始まる場合、 `USE` 関数を呼び出したファイルからの相対パスとして解釈されます。

例えば、 `fruit/apple.xa1` 内で `USE("./banana")` と記述した場合、 `fruit/banana.xa1` が読み込まれます。

コードがコマンドライン上で直接指定された場合、相対パスはカレントディレクトリを起点としてファイルを解決します。

`/` で始まる場合、絶対パスとして解釈されます。

`file` では拡張子の `.xa1` は省略可能です。 `USE("./banana")` と記述した場合、 `./banana` が存在すればそれ、そうでなければ `./banana.xa1` が読み込まれます。

ディレクトリの区切り文字は、それが実行されるOSに関わらず `/` を使用します。

```shell
$ {
  mkdir modules
  echo '
    {
      getBananaImpl: () -> "Banana"
    }
  ' > modules/banana.xa1
  echo '
    @USE("./banana")
    {
      getBanana: () -> getBananaImpl()
    }
  ' > modules/fruit.xa1
  xa '
    @USE("./modules/fruit")
    getBanana()
  '
  rm modules/banana.xa1
  rm modules/fruit.xa1
  rmdir modules
}
# Banana
```

---

`USE` 関数の戻り値をマウントすることで、ディレクティブのような使用感を実現できます。

```shell
$ {
  echo '
    {
      FRUIT: 877
    }
  ' > banana.xa1
  xa '
    @USE("./banana")
    FRUIT
  '
  rm banana.xa1
}
# 877
```

---

同一絶対ファイルパスに対する `USE` 関数の結果はキャッシュされ、同じ呼び出しによって再利用されます。

そのため、返されるインスタンスは常に同一であり、読み込み時の副作用も1度だけ生じます。

スクリプトの結果がストリームである場合、そのストリームは解決されます。

ファイル実体が同一でも、シンボリックリンクなどによって異なる絶対パス上にある場合、別のファイルとみなされます。

```shell
$ {
  echo '
    {
      variables: {
        fruit: "apple"
      }
    }
  ' > tmp.xa1
  xa -q '
    a := USE("./tmp")
    b := USE("./tmp")
    OUT << b.variables.fruit
    a.variables.fruit = "banana"
    OUT << b.variables.fruit
  '
  rm tmp.xa1
}
# apple
# banana
```

---

`USE` されることを前提として記述されたファイルをモジュールと呼びます。

モジュールは多くの場合マウント用のオブジェクトを返すことでAPIを公開しますが、そうでない場合もあります。

モジュールの提供するAPIは、組み込みマウント風に大文字で書かれる場合もあれば、そうでない場合もあります。

### `EXEC`: 外部コマンドを実行 [EXPERIMENTAL]

`EXEC(command: STREAM<STRING>[; env: env: OBJECT<STRING>][; cwd: cwd: STRING]): STREAM<STRING>`

外部コマンドを実行します。

`command` にはプロセスおよびその引数を1要素ずつ指定します。

戻り値はそのプロセスの標準出力を1行ずつ読み取るストリームです。

```shell
$ xa 'EXEC("echo", "Hello, World!")'
# Hello, World!
```

```shell
$ xa 'EXEC("bash", "-c", "seq 1 30 | grep 3")'
# 3
# 13
# 23
# 30
```

---

`env` 引数を指定すると、プロセスの環境変数を指定できます。

環境変数は呼び出したXarpiteプロセスの環境変数を継承した上で追加・上書きされます。

```shell
$ xa 'EXEC("bash", "-c", %>echo $FOO<%; env: {FOO: "BAR"})'
# BAR
```

空文字列もしくはNULLを指定すると、既存の環境変数を削除できます。

```shell
$ A=APPLE B=ANNA xa '
  EXEC("bash", "-c", %>
    echo "A=$A"
    echo "B=$B"
    echo "C=$C"
  <%; env: {
    B: NULL
    C: "CHERRY"
  })
'
# A=APPLE
# B=
# C=CHERRY
```

---

`cwd` 引数を指定すると、プロセスの作業ディレクトリを指定できます。

```shell
$ xa 'EXEC("pwd"; cwd: "/tmp")'
# /tmp
```

---

呼び出したプロセスが0以外の終了コードで終了した場合、例外をスローします。

```shell
$ xa 'EXEC("bash", "-c", "exit 1") !? "ERROR"'
# ERROR
```

---

呼び出したプロセスの標準エラー出力はXarpiteの標準エラー出力にリダイレクトされます。

```shell
$ xa -q 'EXEC("bash", "-c", "echo 'ERROR' 1>&2")' 2>&1
# ERROR
```

---

呼び出したプロセスは別のスレッドで管理され、メインスレッドはブロッキングせずにサスペンドします。

---

この関数は実験的な機能であり、将来的に仕様が変更される可能性があります。

戻り値は、プロセスの標準出力を逐次的に読み取るストリームではなく、プロセスの終了後にその標準出力を行分割したものです。

**また、この関数は現状JVM版とNative版で提供されます。**
