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

### `READ`

`READ` now returns the entire file content as a single string instead of a stream of lines.

To read it as a stream of lines, use `READL`.
