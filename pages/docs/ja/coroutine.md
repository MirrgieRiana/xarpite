---
title: "コルーチン"
---

<!-- toc -->

# コルーチン

コルーチンは、関数の中断（サスペンド）と再開、非同期処理の派生（コルーチンの起動）からなるプログラミングの概念です。

## コルーチンの起動

`LAUNCH` 関数を使用して新たなコルーチンを起動できます。

### `LAUNCH`: 新しいコルーチンを起動する

`<T> LAUNCH(function: () -> T): PROMISE<T>`

`function` をコルーチンとして非同期に起動します。

起動されたコルーチンは、 `LAUNCH` の呼び出し元のスレッドが次にサスペンドした際に実行されます。

この関数は `function` の戻り値もしくは `function` 内でスローされた例外が格納される `PROMISE` を返します。

```shell
$ xa '
  promise := LAUNCH ( =>
    "apple"
  )
  promise::await()
'
# apple
```

---

`function` は呼び出し元とは独立して起動され、呼び出し元スレッドがサスペンドされ次第実行されます。

```shell
$ xa '
  result := PROMISE.new()
  LAUNCH ( =>
    result::complete("apple")
  )
  result::await()
'
# apple
```

---

`function` の戻り値がストリームだった場合、自動的に1度だけイテレートし、その要素列のコピーを保持し、 `await` 時にはコピーされたストリームが返されます。

このため、 `LAUNCH` ブロックの末尾の処理はどのような状況でも必ず丁度1回だけ実行されます。

```shell
$ xa '
  promises := [PROMISE.new(), PROMISE.new(), PROMISE.new()]
  LAUNCH ( =>
    0 .. 2 | (
      promises(_)::complete(_ * 10)
    )
  )
  promises(0)::await(), promises(1)::await(), promises(2)::await()
'
# 0
# 10
# 20
```

```shell
$ xa '
  counter := 0
  promise := LAUNCH ( =>
    1 .. 3 | (
      counter = counter + 1
      counter
    )
  )
  [promise::await()], [promise::await()], [promise::await()], counter
'
# [1;2;3]
# [1;2;3]
# [1;2;3]
# 3
```

---

以下は `LAUNCH` を使って非同期的に標準入力からの命令を受け付けるサンプルです。

先頭のブロック部分を削除すれば、実際にユーザーからの `stop` 命令でプログラムが終了します。

```shell
$ { sleep 0.5; echo stop; } | xa -q '
  stop := PROMISE.new()
  LAUNCH ( =>
    IN | (
      _ == "stop" && (
        OUT << "Stopping..."
        stop::complete()
        break!!
      )
    ) !: break
  )
  LOOP | i, _ => (
    stop::isCompleted() && break!!
    SLEEP << 100
  ) !: break
  OUT << "Stopped!"
'
# Stopping...
# Stopped!
```

## `PROMISE`: 非同期結果コンテナ

`PROMISE` は、遅延して内容が確定するコンテナです。

### `new`: 新しい `PROMISE` を生成する

`<T> PROMISE.new(): PROMISE<T>`

未完了の新しい `PROMISE` を生成します。

### `complete`: `PROMISE` を完了する

`<T> PROMISE<T>::complete([value: T]): NULL`

`PROMISE` を `VALUE` の内容で完了します。

`value` が省略された場合、 `NULL` を内容として `PROMISE` を完了します。

### `fail`: `PROMISE` を失敗として完了する

`<T> PROMISE<T>::fail([error: VALUE]): NULL`

`PROMISE` を `error` で失敗として完了します。

### `await`: `PROMISE` の完了を待機し、内容を取得する

`<T> PROMISE<T>::await(): T`

`PROMISE` の内容が完了するまで待機し、その内容を返します。

---

`PROMISE` が失敗として完了した場合、 `await` はその例外をスローします。

```shell
$ xa '
  promise := PROMISE.new()
  promise::fail("ERROR!!")
  promise::await() !? (e => e)
'
# ERROR!!
```

### `isCompleted`: `PROMISE` の完了状態を調べる

`<T> PROMISE<T>::isCompleted(): BOOLEAN`

`PROMISE` が完了、もしくは失敗として完了しているかどうかを返します。

## `SLEEP`: 指定時間の間処理を停止

`SLEEP([milliseconds: NUMBER]): NULL`

`milliseconds` だけ処理を停止します。

この関数はスレッドをブロッキングせず、関数をサスペンドします。

`milliseconds` が0もしくは省略された場合、関数を一度サスペンドし、即復帰します。

---

以下のサンプルコードでは、実行後1秒おいてから `Hello, world!` が出力されます。

```shell
$ xa '
  SLEEP(1000)
  "Hello, world!"
'
# Hello, world!
```
