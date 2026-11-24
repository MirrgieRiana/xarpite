---
title: "時刻"
---

<!-- toc -->

# 時刻

## 時刻クラス

時刻を表現するための以下のクラスがあります。

| 型           | 意味                         |
|--------------|------------------------------|
| `INSTANT`    | タイムゾーンに依存しない瞬間 |
| `TIME`       | UTCオフセットが付いた時刻    |
| `LOCAL_TIME` | タイムゾーンが不明な時刻     |

INSTANTは、UNIX時間（`1970-01-01T00:00:00Z`からの経過時間）を、整数である秒数および、整数であるナノ秒によって保持します。

TIMEは、INSTANTに加えて、UTCからの時差を保持することで、地球上の特定の場所における時計の値を表します。

LOCAL_TIMEは、地球上の特定の場所における`1970-01-01T00:00:00`からの経過時間を、整数である秒数および、整数であるナノ秒によって保持します。

### 固定の時刻によるインスタンスの生成

`INSTANT.of(epochSeconds: NUMBER[; nanosecondsOfSecond: NUMBER]): INSTANT`

`TIME.of(epochSeconds: NUMBER[; nanosecondsOfSecond: NUMBER]; offsetSeconds: NUMBER): TIME`

`LOCAL_TIME.of(epochSeconds: NUMBER[; nanosecondsOfSecond: NUMBER]): LOCAL_TIME`

`epochSeconds`および`nanosecondsOfSecond`をUNIX秒と解釈することによりINSTANTを生成します。

`epochSeconds`が小数である場合、小数部は`nanosecondsOfSecond`に分配されます。

`nanosecondsOfSecond`および`offsetSeconds`が小数である場合、整数に丸められます。

`nanosecondsOfSecond`が0～999_999_999の範囲外の値である場合、`epochSeconds`に繰り上げ・繰り下げが発生します。

```shell
$ xa 'INSTANT.of(981173106)'
# 2001-02-03T04:05:06Z

$ xa 'INSTANT.of(981173106.125)'
# 2001-02-03T04:05:06.125Z

$ xa 'INSTANT.of(981173106; 125_000_000)'
# 2001-02-03T04:05:06.125Z

$ xa 'TIME.of(981173106; 0)'
# 2001-02-03T04:05:06Z

$ xa 'TIME.of(981173106.125; 3600)'
# 2001-02-03T05:05:06.125+01:00

$ xa 'TIME.of(981173106; 125_000_000; -3600 * 5)'
# 2001-02-02T23:05:06.125-05:00

$ xa 'LOCAL_TIME.of(981173106)'
# 2001-02-03T04:05:06

$ xa 'LOCAL_TIME.of(981173106.125)'
# 2001-02-03T04:05:06.125

$ xa 'LOCAL_TIME.of(981173106; 125_000_000)'
# 2001-02-03T04:05:06.125
```

### 時刻表記によるインスタンスの生成

`INSTANT.parse(text: STRING): INSTANT`

`TIME.parse(text: STRING): TIME`

`LOCAL_TIME.parse(text: STRING): LOCAL_TIME`

`text`を時刻を表す文字列と解釈して時刻オブジェクトを生成します。

年月日を表す`[0-9]{4}-[0-9]{2}-[0-9]{2}`は、必ず含まれなければなりません。

時分秒を表す`T[0-9]{2}:[0-9]{2}:[0-9]{2}`は、省略すると`T00:00:00`とみなされます。

ナノ秒を表す`.[0-9]{1,9}`は、省略すると0とみなされます。

時分秒を省略した場合は、必ずナノ秒も省略しなければなりません。

ナノ秒の末尾の0は、任意の個数、省略できます。

タイムゾーンを表す`Z`およびUTCオフセット表記`[+-][0-9]{2}:[0-9]{2}`の必要性は、時刻クラスごとに次のようになります。

| クラス       | タイムゾーン表記           |
|--------------|----------------------------|
| `INSTANT`    | 省略可能な`Z`              |
| `TIME`       | `Z`またはUTCオフセット表記 |
| `LOCAL_TIME` | 常に省略                   |

```shell
$ xa 'INSTANT.parse("2001-02-03")'
# 2001-02-03T00:00:00Z

$ xa 'INSTANT.parse("2001-02-03T04:05:06")'
# 2001-02-03T04:05:06Z

$ xa 'INSTANT.parse("2001-02-03T04:05:06.007")'
# 2001-02-03T04:05:06.007Z

$ xa 'INSTANT.parse("2001-02-03T04:05:06.007008009Z")'
# 2001-02-03T04:05:06.007008009Z

$ xa 'TIME.parse("2001-02-03Z")'
# 2001-02-03T00:00:00Z

$ xa 'TIME.parse("2001-02-03T04:05:06+10:00")'
# 2001-02-03T04:05:06+10:00

$ xa 'TIME.parse("2001-02-03T04:05:06.007-10:11")'
# 2001-02-03T04:05:06.007-10:11

$ xa 'TIME.parse("2001-02-03T04:05:06.007008009+10:11")'
# 2001-02-03T04:05:06.007008009+10:11

$ xa 'LOCAL_TIME.parse("2001-02-03")'
# 2001-02-03T00:00:00

$ xa 'LOCAL_TIME.parse("2001-02-03T04:05:06")'
# 2001-02-03T04:05:06

$ xa 'LOCAL_TIME.parse("2001-02-03T04:05:06.007")'
# 2001-02-03T04:05:06.007

$ xa 'LOCAL_TIME.parse("2001-02-03T04:05:06.007008009")'
# 2001-02-03T04:05:06.007008009
```

### 現在の時刻に基づいたインスタンスの生成

`INSTANT.now(): INSTANT`

`TIME.now(): TIME`

`LOCAL_TIME.now(): LOCAL_TIME`

各種 `now` 関数により、システムの現在時刻に基づいたインスタンスを生成できます。

INSTANTの内容はシステムのタイムゾーンに依存せず、TIMEおよびLOCAL_TIMEの内容はシステムのタイムゾーンに依存します。

### 日時の値の取得

`INSTANT`、`TIME`、`LOCAL_TIME`では、次のプロパティが利用できます。

| プロパティ   | 型    | 値         | 最小値 | 最大値      |
|--------------|-------|------------|--------|-------------|
| `year`       | `INT` | 年の値     | -      | -           |
| `month`      | `INT` | 月の値     | 1      | 12          |
| `day`        | `INT` | 日の値     | 1      | 31          |
| `dayOfWeek`  | `INT` | 曜日の値   | 1      | 7           |
| `hour`       | `INT` | 時の値     | 0      | 23          |
| `minute`     | `INT` | 分の値     | 0      | 59          |
| `second`     | `INT` | 秒の値     | 0      | 59          |
| `nanosecond` | `INT` | ナノ秒の値 | 0      | 999_999_999 |

各値は、`INSTANT`ではUTC、`TIME`では保持しているUTCオフセット、`LOCAL_TIME`では保持しているローカル日時に基づいて計算されます。

`dayOfWeek`の値は、月曜日が1、日曜日が7に対応します。

`nanosecond`は、秒の小数部全体をナノ秒単位の整数で返します。

```shell
$ xa -q '
  OUT << INSTANT.parse("2001-02-03T04:05:06").hour
  OUT << TIME.parse("2001-02-03T04:05:06+07:00").hour
  OUT << LOCAL_TIME.parse("2001-02-03T04:05:06").hour
'
# 4
# 4
# 4

$ xa -q '
  time := TIME.parse("2001-02-03T04:05:06.007008009+07:00")
  OUT << time.year
  OUT << time.month
  OUT << time.day
  OUT << time.dayOfWeek
  OUT << time.hour
  OUT << time.minute
  OUT << time.second
  OUT << time.nanosecond
'
# 2001
# 2
# 3
# 6
# 4
# 5
# 6
# 7008009
```

### UNIX時間の取得

`INSTANT`および`TIME`では、次のプロパティが利用できます。

| プロパティ          | 型    | 値         |
|---------------------|-------|------------|
| `epochSeconds`      | `BIG` | UNIX秒     |
| `epochMilliseconds` | `BIG` | UNIXミリ秒 |
| `epochNanoseconds`  | `BIG` | UNIXナノ秒 |

各値は、`1970-01-01T00:00:00Z`からの経過時間を表します。

`epochSeconds`および`epochMilliseconds`では、単位未満の端数は負の無限大に向かって丸められます。

同じ瞬間を表す`INSTANT`および`TIME`では、各値は一致します。

```shell
$ xa -q '
  time := TIME.parse("2001-02-03T04:05:06.007008009+07:00")
  OUT << time.epochSeconds
  OUT << time.epochMilliseconds
  OUT << time.epochNanoseconds
'
# 981147906
# 981147906007
# 981147906007008009
```

### 文字列化

時刻のクラスを文字列化すると、ISO形式をベースとした文字列表記に変換されます。

タイムゾーン表記は、クラスによって異なります。

| クラス       | タイムゾーン表記           |
|--------------|----------------------------|
| `INSTANT`    | 常に`Z`                    |
| `TIME`       | `Z`またはUTCオフセット表記 |
| `LOCAL_TIME` | なし                       |

秒までは常に表記されますが、秒未満は必要に応じて無表記・3桁・6桁・9桁で表します。

```shell
$ xa 'INSTANT.parse("2001-02-03")'
# 2001-02-03T00:00:00Z

$ xa 'INSTANT.parse("2001-02-03T04:05:06")'
# 2001-02-03T04:05:06Z

$ xa 'INSTANT.parse("2001-02-03T04:05:06.007")'
# 2001-02-03T04:05:06.007Z

$ xa 'INSTANT.parse("2001-02-03T04:05:06.0078")'
# 2001-02-03T04:05:06.007800Z

$ xa 'INSTANT.parse("2001-02-03T04:05:06.007008009")'
# 2001-02-03T04:05:06.007008009Z

$ xa 'TIME.parse("2001-02-03T04:05:06.007008009+03:00")'
# 2001-02-03T04:05:06.007008009+03:00

$ xa 'LOCAL_TIME.parse("2001-02-03T04:05:06.007008009")'
# 2001-02-03T04:05:06.007008009
```

### 等価比較

等価演算子`==`は、同じクラスの時刻オブジェクト同士について、保持する秒数とナノ秒がともに一致する場合に真を返します。

`TIME`では、UTCオフセットも一致する必要があります。

```shell
$ xa 'INSTANT.of(0) == INSTANT.parse("1970-01-01Z")'
# TRUE

$ xa 'TIME.of(0; 0) == TIME.of(0; 3600)'
# FALSE

$ xa 'INSTANT.of(0) == TIME.of(0; 0)'
# FALSE

$ xa '
  a := LOCAL_TIME.of(0)
  b := LOCAL_TIME.of(0)
  [a == b, a === b]
'
# [TRUE;FALSE]
```

## 曜日の定数

次の組み込み定数は、各種時刻クラスの`dayOfWeek`が返す曜日番号に対応します。

| 定数        | 曜日   | 値 |
|-------------|--------|----|
| `MONDAY`    | 月曜日 | 1  |
| `TUESDAY`   | 火曜日 | 2  |
| `WEDNESDAY` | 水曜日 | 3  |
| `THURSDAY`  | 木曜日 | 4  |
| `FRIDAY`    | 金曜日 | 5  |
| `SATURDAY`  | 土曜日 | 6  |
| `SUNDAY`    | 日曜日 | 7  |

```shell
$ xa 'TIME.parse("2001-02-04T04:05:06+07:00").dayOfWeek == SUNDAY'
# TRUE
```

## その他の組み込みメンバ

### `NOW`: 現在時刻の取得

`NOW(): BIG`

現在時刻をUnix秒で返します。

Unix秒は、`1970-01-01T00:00:00Z`を基準とする整数の秒数です。

秒未満は切り捨てられます。
