---
title: "Migration Guide"
---

<!-- toc -->

# Migration Guide

This guide explains how to rewrite existing notations and idioms into equivalent new ones so that scripts follow a new API version.

## API Version 5

### `IN` Now Reads the Entire Standard Input as a Single String

Up to API version 4, `IN` was a stream that read standard input line by line.

In API version 5, it reads the entire standard input as a single string.

To preserve the previous behavior, replace `IN` with `INL` (or its alias `I`).

```diff
- IN
+ INL
```

### `FILES` Now Returns Paths Including the Directory

Up to API version 4, `FILES` returned only the filenames directly under the directory.

In API version 5, it returns paths that include the specified directory itself at the beginning.

To preserve the previous behavior, replace calls to `FILES` with `FILE_NAMES`.

```diff
- FILES("dir")
+ FILE_NAMES("dir")
```

### `READ` Now Returns a Single String

Up to API version 4, `READ` was an alias of `READL` and returned the file content as a stream of lines.

In API version 5, it returns the entire file content as a single string.

To preserve the previous behavior, replace calls to `READ` with `READL`.

```diff
- READ("file")
+ READL("file")
```

### `EXEC` Now Returns the Entire Standard Output as a Single String

Up to API version 4, `EXEC` returned a stream that reads the standard output line by line.

In API version 5, it returns the entire standard output decoded as UTF-8 as a single string.

To preserve the previous behavior, replace calls to `EXEC` with `EXECL`.

```diff
- EXEC("command")
+ EXECL("command")
```

### `JSONS` Has Been Removed

Up to API version 4, `JSONS` was an alias for `JSONL`.

In API version 5, `JSONS` has been removed.

To preserve the previous behavior, replace calls to `JSONS` with `JSONL`.

```diff
- JSONS
+ JSONL
```

### `SLEEP` Now Takes Its Argument in Seconds

Up to API version 4, `SLEEP` interpreted its argument as milliseconds.

In API version 5, it interprets the argument as seconds.

To preserve the previous behavior, divide the argument by 1000.

```diff
- SLEEP(1000)
+ SLEEP(1)
```

### A `#` Line Comment Can No Longer Begin Except at the Start of a Line or After Whitespace

Up to API version 4, a `#` line comment could begin regardless of the preceding character.

In API version 5, a `#` line comment can no longer begin except at the start of a line or immediately after a space or tab.

To preserve the previous behavior, insert a space before any `#` that previously began a line comment without a preceding space.

```diff
- 1#comment
+ 1 #comment
```
