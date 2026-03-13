---
title: "IO"
---

<!-- toc -->

# IO

Provides I/O-related functionality for accessing external resources over HTTP.

## Built-in Functions

### `FETCH`: Fetch Text Content from URL

`FETCH(url: STRING): STRING`

Fetches UTF-8 text content from `url` via GET request.
Raises an error if the HTTP status code is not 2xx.

### `FETCHB`: Fetch Binary Content from URL

`FETCHB(url: STRING): BLOB`

Fetches binary content from `url` via GET request.
Raises an error if the HTTP status code is not 2xx.
