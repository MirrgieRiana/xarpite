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

### Creating Instances from the Current Time

`INSTANT.now(): INSTANT`

`TIME.now(): TIME`

`LOCAL_TIME.now(): LOCAL_TIME`

The `now` functions create instances based on the current system time.

The contents of INSTANT are independent of the system time zone, while those of TIME and LOCAL_TIME depend on it.

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

The UTC offset, represented by `Z` or `[+-][0-9]{2}:[0-9]{2}`, is required only for `TIME`.

Specifying an offset for `INSTANT` or `LOCAL_TIME` results in an error.

```shell
$ xa 'INSTANT.parse("2001-02-03")'
# 981158400

$ xa 'INSTANT.parse("2001-02-03T04:05:06")'
# 981173106

$ xa 'INSTANT.parse("2001-02-03T04:05:06.007")'
# 981173106.007

$ xa 'INSTANT.parse("2001-02-03T04:05:06.007008009")'
# 981173106.007008009

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

## Other Built-in Members

### `NOW`: Get the Current Time

`NOW(): BIG`

Returns the current time as Unix seconds.

Unix seconds are the integer number of seconds relative to `1970-01-01T00:00:00Z`.

Fractional seconds are rounded down.
