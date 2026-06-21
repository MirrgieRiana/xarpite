---
title: "Migration Guide"
---

<!-- toc -->

# Migration Guide

This guide explains how to rewrite existing scripts so that they follow a new API version.

---

This guide provides a section for each API version, and for each breaking change introduced in that generation, it explains how to rewrite existing notations and idioms.

---

## API Version 5

### Default Indentation of the `JSON` Function and the `$&` Operator

The default output of the `JSON` function with `indent` omitted, and of the `$&` operator, has changed to indented output using two spaces.

To keep compact output without indentation, explicitly pass `NULL` to `indent`.

- Rewrite `value >> JSON` as `value >> JSON[indent: NULL]`.
- Rewrite `$&value` as `value >> JSON[indent: NULL]`.
