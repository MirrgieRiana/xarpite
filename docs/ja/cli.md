# `xa` Xarpiteコードを実行する

```
Usage: xa [-h|--help] [-q] [--] <code> <arguments...>
Options:
  -h, --help               Show this help
  -q                       Run script as a runner
```

`xa` はコマンドライン引数に渡されたXarpiteのコードをその場で実行するコマンドです。

`xa` コマンドは標準の動作としてコードの戻り値を出力するため、結果の出力のために明示的に `OUT` 関数などを使う必要はありません。

```shell
$ xa '1 + 2'
# 3
```

## 戻り値の出力の仕様

戻り値の出力の際には文字列化が行われます。

```shell
$ xa '{`&_`: _ -> "Hello, World"}{}'
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

## 戻り値の出力の抑制

`-q` オプションを指定すると、全体を文として解釈し、戻り値の出力は行われません。

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

# CLI版限定組み込み定数・関数

CLI版Xarpiteでのみ利用可能な定数および関数です。

## `ARGS` コマンドライン引数を取得

コマンドライン引数が配列で格納されています。

`xa` コマンドやワンライナーのソースコードは含まれません。

```shell
$ xa 'ARGS' 1 2 3
# [1;2;3]
```

## `ENV` 環境変数を取得

環境変数がオブジェクトで格納されています。

```shell
$ FOO=bar xa 'ENV.FOO'
# bar
```

存在しない変数にアクセスした場合は `NULL` が返ります。

## `IN` コンソールから1行ずつ入力

標準入力を1行ずつストリームとして読み取ります。

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

## `OUT` コンソールに出力

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

## `FILES` ディレクトリ内のファイルの一覧を取得

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

## `READ' ファイルから読み込み

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
