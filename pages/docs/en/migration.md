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
