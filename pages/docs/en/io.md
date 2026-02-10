---
title: "IO"
---

<!-- toc -->

# IO

Provides I/O-related functionality for data exchange with external programs.

## Built-in Functions

### `FETCH`: Fetch Text Content from URL

`FETCH(url: STRING): STRING`

Fetches UTF-8 text content from `url` via GET request.

### `FETCHB`: Fetch Binary Content from URL

`FETCHB(url: STRING): BLOB`

Fetches binary content from `url` via GET request.
