---
title: "JSON Operations"
---

<!-- toc -->

# JSON Operations

## Functions for Converting Between JSON Strings and Values

Several functions are provided to convert between JSON strings and values:

- `JSON`
- `JSOND`
- `JSONS`
- `JSONSD`

See [data-conversion.md](data-conversion.md) for details.

## Conversion with Operators

### Convert Value to JSON String

`$&value`

The prefix `$&` operator converts a value to a JSON-formatted string.

The detailed specification is the same as the `JSON` function.

```shell
$ xa '$&{a: 1; b: 2}'
# {"a":1,"b":2}
```

When an array or object is specified, internal elements are also recursively converted to JSON.

### Convert JSON String to Value

`$*string`

The prefix `$*` operator parses the given string as a JSON string and converts it to the corresponding value.

The detailed specification is the same as the `JSOND` function.

```shell
$ xa '$*(%> {"a": 1, "b": 2} <%)'
# {a:1;b:2}
```
