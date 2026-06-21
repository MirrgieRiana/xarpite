---
title: "Migration Guide"
---

<!-- toc -->

# Migration Guide

This guide explains how to rewrite existing scripts so that they follow a new API version.

---

This guide provides a section for each API version, and for each breaking change introduced in that generation, it explains how to rewrite existing notations and idioms.

## API Version 5

### Where a `#` line comment can begin

From API version 5 onwards, a `#` line comment can begin only at the start of a line or immediately after a space or tab.

If you previously began a `#` line comment without a preceding space in API version 4 or earlier, insert a space before the `#`.
