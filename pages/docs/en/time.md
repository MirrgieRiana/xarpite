---
title: "Time"
---

<!-- toc -->

# Time

## Time Classes

The following classes represent times.

| Type          | Meaning                                   |
|---------------|-------------------------------------------|
| `INSTANT`     | A point in time independent of time zones |
| `OFFSET_TIME` | A time with a UTC offset                  |
| `LOCAL_TIME`  | A time in an unknown time zone            |

INSTANT stores Unix time (the elapsed time since `1970-01-01T00:00:00Z`) as integer seconds and integer nanoseconds.

OFFSET_TIME stores a UTC offset in addition to an INSTANT, representing a clock reading at a particular location on Earth.

LOCAL_TIME stores the elapsed time since `1970-01-01T00:00:00` at a particular location on Earth as integer seconds and integer nanoseconds.

### Creating Instances from a Fixed Time

`INSTANT.of(epochSeconds: NUMBER[; nanosecondsOfSecond: NUMBER]): INSTANT`

`OFFSET_TIME.of(epochSeconds: NUMBER[; nanosecondsOfSecond: NUMBER]; offsetSeconds: NUMBER): OFFSET_TIME`

`LOCAL_TIME.of(epochSeconds: NUMBER[; nanosecondsOfSecond: NUMBER]): LOCAL_TIME`

Creates an INSTANT by interpreting `epochSeconds` and `nanosecondsOfSecond` together as Unix seconds.

If `epochSeconds` has a fractional part, it is incorporated into `nanosecondsOfSecond`.

If `nanosecondsOfSecond` or `offsetSeconds` has a fractional part, it is rounded to an integer.

If `nanosecondsOfSecond` is outside the range 0–999_999_999, `epochSeconds` is adjusted accordingly.

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

### Creating Instances from Time Representations

`INSTANT.parse(text: STRING): INSTANT`

`OFFSET_TIME.parse(text: STRING): OFFSET_TIME`

`LOCAL_TIME.parse(text: STRING): LOCAL_TIME`

Interprets `text` as a time representation and creates a time object.

The date, represented by `[0-9]{4}-[0-9]{2}-[0-9]{2}`, is required.

The time of day, represented by `T[0-9]{2}:[0-9]{2}:[0-9]{2}`, defaults to `T00:00:00` when omitted.

The nanosecond part, represented by `.[0-9]{1,9}`, defaults to zero when omitted.

If the time of day is omitted, the nanosecond part must also be omitted.

Any number of trailing zeros in the nanosecond part may be omitted.

The requirements for the time zone designator `Z` and the UTC offset notation `[+-][0-9]{2}:[0-9]{2}` depend on the time class as follows.

| Class         | Time zone notation        |
|---------------|---------------------------|
| `INSTANT`     | Optional `Z`              |
| `OFFSET_TIME` | `Z` or a UTC offset       |
| `LOCAL_TIME`  | Must be omitted           |

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

### Creating Instances from the Current Time

`INSTANT.now(): INSTANT`

`OFFSET_TIME.now(): OFFSET_TIME`

`LOCAL_TIME.now(): LOCAL_TIME`

The `now` functions create instances based on the current system time.

The contents of INSTANT are independent of the system time zone, while those of OFFSET_TIME and LOCAL_TIME depend on it.

### Converting Between Time Classes

INSTANT, OFFSET_TIME, and LOCAL_TIME each provide methods for converting to all three classes.

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

| Source        | Target        | Argument | Return value                                                                    |
|---------------|---------------|----------|---------------------------------------------------------------------------------|
| `INSTANT`     | `INSTANT`     | -        | The source instance itself                                                      |
| `OFFSET_TIME` | `INSTANT`     | -        | The same instant as the source                                                  |
| `LOCAL_TIME`  | `INSTANT`     | Required | The instant represented by the source date and time at the specified UTC offset |
| `INSTANT`     | `OFFSET_TIME` | Required | The same instant as the source, expressed at the specified UTC offset           |
| `OFFSET_TIME` | `OFFSET_TIME` | -        | The source instance itself                                                      |
| `LOCAL_TIME`  | `OFFSET_TIME` | Required | The source date and time with the specified UTC offset attached                 |
| `INSTANT`     | `LOCAL_TIME`  | Required | The date and time of the source instant at the specified UTC offset             |
| `OFFSET_TIME` | `LOCAL_TIME`  | Required | The date and time of the source instant at the specified UTC offset             |
| `LOCAL_TIME`  | `LOCAL_TIME`  | -        | The source instance itself                                                      |

The three identity conversions are provided for API symmetry.

A UTC offset is required when converting between INSTANT or OFFSET_TIME, which represent a specific instant, and LOCAL_TIME, which represents a clock reading at a particular location.

When converting between INSTANT and OFFSET_TIME, only `toOffsetTime` requires a UTC offset because it adds information.

`offsetSeconds` specifies the offset from UTC in seconds.

A fractional `offsetSeconds` is rounded to an integer, and the rounded value must be between -64_800 and 64_800.

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

### Getting Date and Time Components

The following properties are available on `INSTANT`, `OFFSET_TIME`, and `LOCAL_TIME`.

| Property     | Type  | Value       | Minimum | Maximum     |
|--------------|-------|-------------|---------|-------------|
| `year`       | `INT` | Year        | -       | -           |
| `month`      | `INT` | Month       | 1       | 12          |
| `day`        | `INT` | Day         | 1       | 31          |
| `dayOfWeek`  | `INT` | Day of week | 1       | 7           |
| `hour`       | `INT` | Hour        | 0       | 23          |
| `minute`     | `INT` | Minute      | 0       | 59          |
| `second`     | `INT` | Second      | 0       | 59          |
| `nanosecond` | `INT` | Nanosecond  | 0       | 999_999_999 |

Each value is calculated in UTC for `INSTANT`, using the stored UTC offset for `OFFSET_TIME`, and using the stored local date and time for `LOCAL_TIME`.

For `dayOfWeek`, Monday is 1 and Sunday is 7.

The `nanosecond` property returns the entire fractional part of the second as an integer number of nanoseconds.

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

### Getting Unix Time

The following properties are available on `INSTANT` and `OFFSET_TIME`.

| Property            | Type  | Value             |
|---------------------|-------|-------------------|
| `epochSeconds`      | `BIG` | Unix seconds      |
| `epochMilliseconds` | `BIG` | Unix milliseconds |
| `epochNanoseconds`  | `BIG` | Unix nanoseconds  |

Each value represents the elapsed time since `1970-01-01T00:00:00Z`.

For `epochSeconds` and `epochMilliseconds`, fractions of the unit are rounded toward negative infinity.

`INSTANT` and `OFFSET_TIME` values representing the same instant return the same values for these properties.

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

### Numeric Conversion

Numeric conversion of a time value returns Unix seconds with a fractional part as a `DOUBLE`.

For `LOCAL_TIME`, the stored date and time are interpreted as UTC.

Rounding to `DOUBLE` can change the least significant digits of the nanosecond fraction.

```shell
$ xa '+INSTANT.of(10.125)'
# 10.125

$ xa '+OFFSET_TIME.of(10; 125_000_000; 3600)'
# 10.125

$ xa '+LOCAL_TIME.parse("1970-01-01T00:00:10.125")'
# 10.125
```

### String Conversion

Time instances are converted to strings using an ISO-based representation.

The time zone notation depends on the class.

| Class         | Time zone notation        |
|---------------|---------------------------|
| `INSTANT`     | Always `Z`                |
| `OFFSET_TIME` | `Z` or a UTC offset       |
| `LOCAL_TIME`  | None                      |

Seconds are always included, while fractional seconds are omitted or written with 3, 6, or 9 digits as needed.

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

### Equality Comparison

The equality operator `==` returns true for time objects of the same class when both their stored seconds and nanoseconds match.

For `OFFSET_TIME`, the UTC offsets must also match.

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

## Weekday Constants

The following built-in constants correspond to the weekday numbers returned by the `dayOfWeek` property on the time classes.

| Constant    | Day       | Value |
|-------------|-----------|-------|
| `MONDAY`    | Monday    | 1     |
| `TUESDAY`   | Tuesday   | 2     |
| `WEDNESDAY` | Wednesday | 3     |
| `THURSDAY`  | Thursday  | 4     |
| `FRIDAY`    | Friday    | 5     |
| `SATURDAY`  | Saturday  | 6     |
| `SUNDAY`    | Sunday    | 7     |

```shell
$ xa 'OFFSET_TIME.parse("2001-02-04T04:05:06+07:00").dayOfWeek == SUNDAY'
# TRUE
```

## Other Built-in Members

### `NOW`: Get the Current Time

`NOW(): BIG`

Returns the current time as Unix seconds.

Unix seconds are the integer number of seconds relative to `1970-01-01T00:00:00Z`.

Fractional seconds are rounded down.
