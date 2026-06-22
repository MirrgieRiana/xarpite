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

### A `#` Line Comment Can No Longer Begin Except at the Start of a Line or After Whitespace

Up to API version 4, a `#` line comment could begin regardless of the preceding character.

In API version 5, a `#` line comment can no longer begin except at the start of a line or immediately after a space or tab.

To preserve the previous behavior, insert a space before any `#` that previously began a line comment without a preceding space.

```diff
- 1#comment
+ 1 #comment
```
