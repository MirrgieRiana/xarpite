---
title: CLI
---

# Xarpiteを実行するコマンド

## `xarpite`: Xarpiteコードを実行する

`xa` コマンドの長い形式です。

将来的に `xarpite2` などの新作が登場した場合に備えて用意されています。

シェルスクリプトなど、永続的なファイルにコマンドを記述する際には `xa` コマンドよりもこちらが推奨されます。

他方で、コマンドラインから直接コードを実行する場合には `xa` コマンドの方が短くて便利です。

引数などの仕様は `xa` コマンドと同一です。

## `xa`: Xarpiteコードを実行する

```
$ xa
# Usage: xa [<Launcher Options>] [<Runtime Options>] [--] [<code>] <arguments...>
#
# Launcher Options:
#   --native                 Use the native engine
#   --jvm                    Use the JVM engine
#   --node                   Use the Node.js engine
#
# Runtime Options:
#   -h, --help               Show this help
#   -q                       Run script as a runner
#   -f <file>                Read script from file
```

`xa` はコマンドライン引数に渡されたXarpiteのコードをその場で実行するコマンドです。

`xa` コマンドは標準の動作としてコードの戻り値を出力するため、結果の出力のために明示的に `OUT` 関数などを使う必要はありません。

```shell
$ xa '1 + 2'
# 3
```

---

`Launcher Options` は `Runtime Options` よりも前に指定する必要があります。

`--` はオプションの終端を示します。これ以降の引数はすべてコードおよびコードに渡される引数として解釈されます。

## ランチャー

ランチャーとは、Xarpiteコマンドを直接受け付けるシェルスクリプトを指します。

ランチャーは環境変数や引数などに基づいて実際に起動されるXarpiteエンジンを決定します。

### `XARPITE_ENGINE`: 実行エンジンを指定

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

### `--native`: ネイティブ実装エンジンを使用

ネイティブコンパイルされたXarpiteエンジンを使用します。

---

Xarpiteエンジンを指定するコマンドラインオプションは排他的であり、複数を同時に指定することはできません。

コマンドラインオプションによるXarpiteエンジンの指定は、環境変数による指定よりも優先されます。

### `--jvm`: JVMエンジンを使用

JVM上で動作するXarpiteエンジンを使用します。

コマンドラインオプションとしての基本的な性質は `--native` に準じます。

### `--node`: Node.jsエンジンを使用

Node.js上で動作するXarpiteエンジンを使用します。

コマンドラインオプションとしての基本的な性質は `--native` に準じます。

## ランタイム

ランタイムとは、Xarpite言語を実際に動作させるプログラムです。

### 戻り値の出力

戻り値の出力の際には文字列化が行われます。

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

`-q` オプションを指定すると、全体を文（runner ）として解釈し、戻り値の出力は行われません。

出力を行うには `OUT` 関数などを使う必要があります。

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

厳密には、このオプションはソースコード全体を文（runner）として解釈することを指定するオプションです。

### `-f`: ファイルからスクリプトを読み込む

`-f <file>`

`-f` オプションを指定すると、コマンドライン引数で直接コードを指定する代わりに、指定したファイルからXarpiteスクリプトを読み込んで実行します。

`file` が相対パスで指定された場合、カレントディレクトリを起点として解決されます。

```shell
$ {
  echo '1 + 2' > script.xa1
  xa -f script.xa1
  rm script.xa1
}
# 3
```

---

`-f` オプションが指定された場合、 `code` 引数は解析されず、スクリプトに渡す引数の一部として解釈されます。

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

# その他のコマンド

## `xarpite-update`: Xarpiteを最新版に更新する

現在実行中のXarpiteを最新版に更新します。

このコマンドは特別な実行権限が必要な場合があります。

# CLI版限定組み込み定数・関数

CLI版Xarpiteでのみ利用可能な定数および関数です。

## `ARGS`: コマンドライン引数を取得

コマンドライン引数が配列で格納されています。

最初の引数が添え字0に対応し、 `xa` コマンドやワンライナーのソースコードは含まれません。

```shell
$ xa 'ARGS' 1 2 3
# [1;2;3]
```

## `ENV`: 環境変数を取得

環境変数がオブジェクトとして格納されています。

```shell
$ FOO=bar xa 'ENV.FOO'
# bar
```

存在しない変数にアクセスした場合は `NULL` が返ります。

## `IN`: コンソールから文字列を1行ずつ読み取る

`IN: STREAM<STRING>`

標準入力から文字列を1行ずつ読み取るストリームです。

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

## `INB`: コンソールからバイトデータを読み取る

`INB: STREAM<BLOB>`

標準入力からバイトデータをBLOBとしてすべて読み取るストリームです。

BLOBは最大8192バイトの長さに分割されます。

```shell
$ echo -n "abc" | xa 'INB'
# BLOB[97;98;99]
```

---

`INB` を一度でも使用した場合、 `IN` を使用することはできません。

## `OUT`: コンソールに出力

`OUT(value: VALUE): NULL`

標準出力に出力します。

```shell
$ xa -q '
  OUT(123)
  OUT(456)
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

---

この関数はしばしば左実行パイプによって書かれます。

```shell
$ xa -q '
  OUT << "Hello, world!"
'
# Hello, world!
```

## `FILES`: ディレクトリ内のファイルの一覧を取得

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

## `READ`: ファイルから読み込み

`READ(file: STRING): STREAM<STRING>`

`file` で指定されたテキストファイルの内容を文字列として1行ずつ読み込みます。

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

## `USE`: 外部Xarpiteファイルの結果を取得

`USE(file: STRING): VALUE`

指定されたXarpiteスクリプトを評価した結果を返します。

```shell
$ {
  echo '877' > banana.xa1
  xa 'USE("./banana")'
  rm banana.xa1
}
# 877
```

---

`file` は `./` で始まる必要があり、 `USE` 関数を呼び出したファイルからの相対パスとして解釈されます。

例えば、 `fruit/apple.xa1` 内で `USE("./banana")` と記述した場合、 `fruit/banana.xa1` が読み込まれます。

`file` では拡張子の `.xa1` は省略可能です。 `USE("./banana")` と記述した場合、 `./banana` が存在すればそれ、そうでなければ `./banana.xa1` が読み込まれます。

コードがコマンドライン上で直接指定された場合、カレントディレクトリを起点としてファイルを解決します。

ディレクトリの区切り文字はそれが実行されるOSに関わらず `/` を使用します。

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

## `EXEC`: 外部コマンドを実行 [EXPERIMENTAL]

`EXEC(command: STREAM<STRING>): STREAM<STRING>`

外部コマンドを実行します。

`command` にはプロセスおよびその引数を1要素ずつ指定します。

戻り値はそのプロセスの標準出力を1行ずつ読み取るストリームです。

```shell
$ xa --jvm 'EXEC("echo", "Hello, World!")'
# Hello, World!
```

```shell
$ xa --jvm 'EXEC("bash", "-c", "seq 1 30 | grep 3")'
# 3
# 13
# 23
# 30
```

---

呼び出したプロセスが0以外の終了コードで終了した場合、例外をスローします。

```shell
$ xa --jvm 'EXEC("bash", "-c", "exit 1") !? "ERROR"'
# ERROR
```

---

呼び出したプロセスの標準エラー出力はXarpiteの標準エラー出力にリダイレクトされます。

```shell
$ xa --jvm -q 'EXEC("bash", "-c", "echo 'ERROR' 1>&2")' 2>&1
# ERROR
```

---

呼び出したプロセスは別のスレッドで管理され、メインスレッドはブロッキングせずにサスペンドします。

---

この関数は実験的な機能であり、将来的に仕様が変更される可能性があります。

戻り値は、プロセスの標準出力を逐次的に読み取るストリームではなく、プロセスの終了後にその標準出力を行分割したものです。

**また、この関数は現状JVM版でのみ提供されます。**
