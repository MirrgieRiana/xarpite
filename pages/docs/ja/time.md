---
title: "時刻"
---

<!-- toc -->

# 時刻

## 時刻クラス

時刻を表現するための以下のクラスがあります。

| 型            | 意味                         |
|---------------|------------------------------|
| `INSTANT`     | タイムゾーンに依存しない瞬間 |
| `OFFSET_TIME` | UTCオフセットが付いた時刻    |
| `LOCAL_TIME`  | タイムゾーンが不明な時刻     |

INSTANTは、UNIX時間（`1970-01-01T00:00:00Z`からの経過時間）を、整数である秒数および、整数であるナノ秒によって保持します。

OFFSET_TIMEは、INSTANTに加えて、UTCからの時差を保持することで、地球上の特定の場所における時計の値を表します。

LOCAL_TIMEは、地球上の特定の場所における`1970-01-01T00:00:00`からの経過時間を、整数である秒数および、整数であるナノ秒によって保持します。

### 固定の時刻によるインスタンスの生成

`INSTANT.of(epochSeconds: NUMBER[; nanosecondsOfSecond: NUMBER]): INSTANT`

`OFFSET_TIME.of(epochSeconds: NUMBER[; nanosecondsOfSecond: NUMBER]; offsetSeconds: NUMBER): OFFSET_TIME`

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

$ xa 'OFFSET_TIME.of(981173106; 0)'
# 2001-02-03T04:05:06Z

$ xa 'OFFSET_TIME.of(981173106.125; 3600)'
# 2001-02-03T05:05:06.125+01:00

$ xa 'OFFSET_TIME.of(981173106; 125_000_000; -3600 * 5)'
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

`OFFSET_TIME.parse(text: STRING): OFFSET_TIME`

`LOCAL_TIME.parse(text: STRING): LOCAL_TIME`

`text`を時刻を表す文字列と解釈して時刻オブジェクトを生成します。

年月日を表す`[0-9]{4}-[0-9]{2}-[0-9]{2}`は、必ず含まれなければなりません。

時分秒を表す`T[0-9]{2}:[0-9]{2}:[0-9]{2}`は、省略すると`T00:00:00`とみなされます。

ナノ秒を表す`.[0-9]{1,9}`は、省略すると0とみなされます。

時分秒を省略した場合は、必ずナノ秒も省略しなければなりません。

ナノ秒の末尾の0は、任意の個数、省略できます。

タイムゾーンを表す`Z`およびUTCオフセット表記`[+-][0-9]{2}:[0-9]{2}`の必要性は、時刻クラスごとに次のようになります。

| クラス        | タイムゾーン表記           |
|---------------|----------------------------|
| `INSTANT`     | 省略可能な`Z`              |
| `OFFSET_TIME` | `Z`またはUTCオフセット表記 |
| `LOCAL_TIME`  | 常に省略                   |

```shell
$ xa 'INSTANT.parse("2001-02-03")'
# 2001-02-03T00:00:00Z

$ xa 'INSTANT.parse("2001-02-03T04:05:06")'
# 2001-02-03T04:05:06Z

$ xa 'INSTANT.parse("2001-02-03T04:05:06.007")'
# 2001-02-03T04:05:06.007Z

$ xa 'INSTANT.parse("2001-02-03T04:05:06.007008009Z")'
# 2001-02-03T04:05:06.007008009Z

$ xa 'OFFSET_TIME.parse("2001-02-03Z")'
# 2001-02-03T00:00:00Z

$ xa 'OFFSET_TIME.parse("2001-02-03T04:05:06+10:00")'
# 2001-02-03T04:05:06+10:00

$ xa 'OFFSET_TIME.parse("2001-02-03T04:05:06.007-10:11")'
# 2001-02-03T04:05:06.007-10:11

$ xa 'OFFSET_TIME.parse("2001-02-03T04:05:06.007008009+10:11")'
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

`OFFSET_TIME.now(): OFFSET_TIME`

`LOCAL_TIME.now(): LOCAL_TIME`

各種 `now` 関数により、システムの現在時刻に基づいたインスタンスを生成できます。

INSTANTの内容はシステムのタイムゾーンに依存せず、OFFSET_TIMEおよびLOCAL_TIMEの内容はシステムのタイムゾーンに依存します。

### 時刻クラスの変換

INSTANT、OFFSET_TIME、LOCAL_TIMEのそれぞれに、それぞれに変換するための関数が用意されています。

```
INSTANT::toInstant(): INSTANT
OFFSET_TIME::toInstant(): INSTANT
LOCAL_TIME::toInstant(offsetSeconds: NUMBER): INSTANT

INSTANT::toOffsetTime(offsetSeconds: NUMBER): OFFSET_TIME
OFFSET_TIME::toOffsetTime(): OFFSET_TIME
LOCAL_TIME::toOffsetTime(offsetSeconds: NUMBER): OFFSET_TIME

INSTANT::toLocalTime(offsetSeconds: NUMBER): LOCAL_TIME
OFFSET_TIME::toLocalTime(offsetSeconds: NUMBER): LOCAL_TIME
LOCAL_TIME::toLocalTime(): LOCAL_TIME
```

---

| 変換元        | 変換先        | 引数 | 返す値                                                  |
|---------------|---------------|------|---------------------------------------------------------|
| `INSTANT`     | `INSTANT`     | -    | 変換元自体                                              |
| `OFFSET_TIME` | `INSTANT`     | -    | 変換元と同じ瞬間                                        |
| `LOCAL_TIME`  | `INSTANT`     | あり | 変換元に、指定したUTCオフセットを付けた時刻と同じ瞬間   |
| `INSTANT`     | `OFFSET_TIME` | あり | 変換元と同じ瞬間を、指定したUTCオフセットで表現した時刻 |
| `OFFSET_TIME` | `OFFSET_TIME` | -    | 変換元自体                                              |
| `LOCAL_TIME`  | `OFFSET_TIME` | あり | 変換元に、指定したUTCオフセットを付けた時刻             |
| `INSTANT`     | `LOCAL_TIME`  | あり | 変換元と同じ瞬間の、指定したUTCオフセットにおける日時   |
| `OFFSET_TIME` | `LOCAL_TIME`  | あり | 変換元と同じ瞬間の、指定したUTCオフセットにおける日時   |
| `LOCAL_TIME`  | `LOCAL_TIME`  | -    | 変換元自体                                              |

恒等変換の3個は、APIの対称性のために提供されています。

特定の瞬間を表すINSTANTおよびOFFSET_TIMEと、ある場所における時計の値を表すLOCAL_TIMEの間の変換には、UTCオフセットが必要となります。

INSTANTとOFFSET_TIMEの間での変換には、情報量が増える`toOffsetTime`側にだけ、 UTCオフセットが必要となります。

`offsetSeconds`は、UTCからの時差を秒単位で指定します。

`offsetSeconds`の小数部は整数に丸められ、丸めた後の値は-64_800～64_800の範囲でなければなりません。

---

```shell
$ xa 'LOCAL_TIME.parse("2001-02-03T04:05:06")::toOffsetTime(7 * 3600)'
# 2001-02-03T04:05:06+07:00

$ xa 'OFFSET_TIME.parse("2001-02-03T04:05:06+07:00")::toLocalTime(7 * 3600)'
# 2001-02-03T04:05:06

$ xa 'INSTANT.of(981147906)'
# 2001-02-02T21:05:06Z

$ xa 'INSTANT.of(981147906)::toOffsetTime(7 * 3600)'
# 2001-02-03T04:05:06+07:00

$ xa 'INSTANT.of(981147906)::toOffsetTime(7 * 3600)::toInstant()'
# 2001-02-02T21:05:06Z

$ xa 'INSTANT.of(981147906)::toLocalTime(7 * 3600)'
# 2001-02-03T04:05:06

$ xa 'INSTANT.of(981147906)::toLocalTime(7 * 3600)::toInstant(-11 * 3600)'
# 2001-02-03T15:05:06Z
```

### 日時の値の取得

`INSTANT`、`OFFSET_TIME`、`LOCAL_TIME`では、次のプロパティが利用できます。

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

各値は、`INSTANT`ではUTC、`OFFSET_TIME`では保持しているUTCオフセット、`LOCAL_TIME`では保持しているローカル日時に基づいて計算されます。

`dayOfWeek`の値は、月曜日が1、日曜日が7に対応します。

`nanosecond`は、秒の小数部全体をナノ秒単位の整数で返します。

```shell
$ xa -q '
  OUT << INSTANT.parse("2001-02-03T04:05:06").hour
  OUT << OFFSET_TIME.parse("2001-02-03T04:05:06+07:00").hour
  OUT << LOCAL_TIME.parse("2001-02-03T04:05:06").hour
'
# 4
# 4
# 4

$ xa -q '
  time := OFFSET_TIME.parse("2001-02-03T04:05:06.007008009+07:00")
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

`INSTANT`および`OFFSET_TIME`では、次のプロパティが利用できます。

| プロパティ          | 型    | 値         |
|---------------------|-------|------------|
| `epochSeconds`      | `BIG` | UNIX秒     |
| `epochMilliseconds` | `BIG` | UNIXミリ秒 |
| `epochNanoseconds`  | `BIG` | UNIXナノ秒 |

各値は、`1970-01-01T00:00:00Z`からの経過時間を表します。

`epochSeconds`および`epochMilliseconds`では、単位未満の端数は負の無限大に向かって丸められます。

同じ瞬間を表す`INSTANT`および`OFFSET_TIME`では、各値は一致します。

```shell
$ xa -q '
  time := OFFSET_TIME.parse("2001-02-03T04:05:06.007008009+07:00")
  OUT << time.epochSeconds
  OUT << time.epochMilliseconds
  OUT << time.epochNanoseconds
'
# 981147906
# 981147906007
# 981147906007008009
```

### 数値化

時刻のクラスを数値化すると、小数部付きのUNIX秒を`DOUBLE`で返します。

`LOCAL_TIME`では、保持している日時をUTCとして解釈します。

`DOUBLE`の精度により、ナノ秒の下位桁が丸められる場合があります。

```shell
$ xa '+INSTANT.of(10.125)'
# 10.125

$ xa '+OFFSET_TIME.of(10; 125_000_000; 3600)'
# 10.125

$ xa '+LOCAL_TIME.parse("1970-01-01T00:00:10.125")'
# 10.125
```

### 文字列化

時刻のクラスを文字列化すると、ISO形式をベースとした文字列表記に変換されます。

タイムゾーン表記は、クラスによって異なります。

| クラス        | タイムゾーン表記           |
|---------------|----------------------------|
| `INSTANT`     | 常に`Z`                    |
| `OFFSET_TIME` | `Z`またはUTCオフセット表記 |
| `LOCAL_TIME`  | なし                       |

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

$ xa 'OFFSET_TIME.parse("2001-02-03T04:05:06.007008009+03:00")'
# 2001-02-03T04:05:06.007008009+03:00

$ xa 'LOCAL_TIME.parse("2001-02-03T04:05:06.007008009")'
# 2001-02-03T04:05:06.007008009
```

### 等価比較

等価演算子`==`は、同じクラスの時刻オブジェクト同士について、保持する秒数とナノ秒がともに一致する場合に真を返します。

`OFFSET_TIME`では、UTCオフセットも一致する必要があります。

```shell
$ xa 'INSTANT.of(0) == INSTANT.parse("1970-01-01Z")'
# TRUE

$ xa 'OFFSET_TIME.of(0; 0) == OFFSET_TIME.of(0; 3600)'
# FALSE

$ xa 'INSTANT.of(0) == OFFSET_TIME.of(0; 0)'
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
$ xa 'OFFSET_TIME.parse("2001-02-04T04:05:06+07:00").dayOfWeek == SUNDAY'
# TRUE
```

## その他の組み込みメンバ

### `NOW`: 現在時刻の取得

`NOW(): BIG`

現在時刻をUnix秒で返します。

Unix秒は、`1970-01-01T00:00:00Z`を基準とする整数の秒数です。

秒未満は切り捨てられます。
