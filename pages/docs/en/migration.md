---
title: "Migration Guide"
---

<!-- toc -->

# Migration Guide

This guide explains how to rewrite existing scripts so that they follow a new API version.

---

This guide provides a section for each API version, and for each breaking change introduced in that generation, it explains how to rewrite existing notations and idioms.

## API Version 5

### `FILES` Now Returns Paths Including the Directory

Up to API version 4, `FILES` returned only the filenames directly under the directory. In API version 5, it returns paths that include `dir` at the beginning.

To preserve the previous behavior, replace calls to `FILES` with `FILE_NAMES`. `FILE_NAMES` always returns only the filenames, just like the previous `FILES`, regardless of the API version.

Before:

```
FILES("dir")
```

After:

```
FILE_NAMES("dir")
```
