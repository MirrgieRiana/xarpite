---
title: "Migration Guide"
---

<!-- toc -->

# Migration Guide

This guide explains how to rewrite existing notations and idioms into equivalent new ones so that scripts follow a new API version.

## API Version 5

### `FILES` Now Returns Paths Including the Directory

Up to API version 4, `FILES` returned only the filenames directly under the directory.

In API version 5, it returns paths that include the specified directory itself at the beginning.

To preserve the previous behavior, replace calls to `FILES` with `FILE_NAMES`.

```diff
- FILES("dir")
+ FILE_NAMES("dir")
```

### `EXEC` Now Returns the Entire Standard Output as a Single String

Up to API version 4, `EXEC` returned a stream that reads the standard output line by line.

In API version 5, it returns the entire standard output decoded as UTF-8 as a single string.

To preserve the previous behavior, replace calls to `EXEC` with `EXECL`.

```diff
- EXEC("command")
+ EXECL("command")
```
