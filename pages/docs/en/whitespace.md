---
title: "Comments"
---

<!-- toc -->

# Comments

## Line Comments `# comment` `// comment`

Line comments can be written following `#` or `//`.

```shell
$ xa '
  [
    1
    2 # Comment
    3 // Comment
    4
  ]
'
# [1;2;3;4]
```

From API version 5 onwards, a `#` line comment can begin only at the start of a line or immediately after a space or tab. This restriction does not apply to `//` line comments.

## Block Comments `/* comment */`

Parts enclosed by `/*` and `*/` are ignored as comments.

```shell
$ xa '1 +  /* comment */  2 + 3'
# 6
```

Block comments can be nested.

```shell
$ xa '1 +  /* /* comment */ */  2 + 3'
# 6
```

Line breaks are allowed within block comments.

```shell
$ xa '
  [
    1
    /*
     * Two
     */
    2
  ]
'
# [1;2]
```
