---
title: "I/O"
---

<!-- toc -->

# I/O

Provides I/O-related functionality.

## `FETCH`: Fetch Text Content from URL

`FETCH(url: STRING): STRING`

Fetches text content from the URL specified by `url` via HTTP request.

Decodes the response body as UTF-8 and returns it as a string.

## `FETCHB`: Fetch Binary Content from URL

`FETCHB(url: STRING): BLOB`

Fetches binary content from the URL specified by `url` via HTTP request.

Returns the response body as a BLOB.
