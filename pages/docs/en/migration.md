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
