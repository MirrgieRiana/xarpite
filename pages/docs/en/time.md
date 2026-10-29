---
title: "Time"
---

<!-- toc -->

# Time

## Time Classes

The following classes represent times.

| Type         | Meaning                                   |
|--------------|-------------------------------------------|
| `INSTANT`    | A point in time independent of time zones |
| `TIME`       | A time with a UTC offset                  |
| `LOCAL_TIME` | A time in an unknown time zone            |

INSTANT stores Unix time (the elapsed time since `1970-01-01T00:00:00Z`) as integer seconds and integer nanoseconds.

TIME stores a UTC offset in addition to an INSTANT, representing a clock reading at a particular location on Earth.

LOCAL_TIME stores the elapsed time since `1970-01-01T00:00:00` at a particular location on Earth as integer seconds and integer nanoseconds.

### Creating Instances from a Fixed Time

`INSTANT.of(epochSeconds: NUMBER[; nanosecondsOfSecond: NUMBER]): INSTANT`

`TIME.of(epochSeconds: NUMBER[; nanosecondsOfSecond: NUMBER]; offsetSeconds: NUMBER): TIME`

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

### Creating Instances from Time Representations

`INSTANT.parse(text: STRING): INSTANT`

`TIME.parse(text: STRING): TIME`

`LOCAL_TIME.parse(text: STRING): LOCAL_TIME`

Interprets `text` as a time representation and creates a time object.

The date, represented by `[0-9]{4}-[0-9]{2}-[0-9]{2}`, is required.

The time of day, represented by `T[0-9]{2}:[0-9]{2}:[0-9]{2}`, defaults to `T00:00:00` when omitted.

The nanosecond part, represented by `.[0-9]{1,9}`, defaults to zero when omitted.

If the time of day is omitted, the nanosecond part must also be omitted.

Any number of trailing zeros in the nanosecond part may be omitted.

The requirements for the time zone designator `Z` and the UTC offset notation `[+-][0-9]{2}:[0-9]{2}` depend on the time class as follows.

| Class        | Time zone notation        |
|--------------|---------------------------|
| `INSTANT`    | Optional `Z`              |
| `TIME`       | `Z` or a UTC offset       |
| `LOCAL_TIME` | Must be omitted           |

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

### Creating Instances from the Current Time

`INSTANT.now(): INSTANT`

`TIME.now(): TIME`

`LOCAL_TIME.now(): LOCAL_TIME`

The `now` functions create instances based on the current system time.

The contents of INSTANT are independent of the system time zone, while those of TIME and LOCAL_TIME depend on it.

### String Conversion of `INSTANT`

Converting an `INSTANT` to a string produces an ISO date and time in UTC with a trailing `Z`.

Seconds are always included, and fractional seconds use 3, 6, or 9 digits as needed.

If the fractional seconds are zero, the fractional part is omitted.

```shell
$ xa 'INSTANT.of(0)'
# 1970-01-01T00:00:00Z

$ xa 'INSTANT.of(0; 125_000_000)'
# 1970-01-01T00:00:00.125Z

$ xa 'INSTANT.of(0; 123_456_000)'
# 1970-01-01T00:00:00.123456Z

$ xa 'INSTANT.of(0; 123_456_789)'
# 1970-01-01T00:00:00.123456789Z
```

## Other Built-in Members

### `NOW`: Get the Current Time

`NOW(): BIG`

Returns the current time as Unix seconds.

Unix seconds are the integer number of seconds relative to `1970-01-01T00:00:00Z`.

Fractional seconds are rounded down.
