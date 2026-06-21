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

### Change to the Behavior of `IN`

On API version 5, `IN` now reads the entire standard input as a single string.

To read the standard input as a stream of lines, rewrite `IN` to `INL`.
