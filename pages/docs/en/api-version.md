---
title: "API Version"
---

<!-- toc -->

# API Version

In addition to Xarpite's own version, Xarpite has a concept called the API version, which is a separate axis from Xarpite's own version.

The API version is an integer representing the generation of breaking changes.

## What the API Version Is

The API version is an integer that expresses up to which generation of breaking changes a script assumes the environment has incorporated.

The API version affects behavior such as the grammar and built-in mounts, and applies to the entire runtime.

Unless the API version assumed by the script and the API version of the runtime match exactly, behavior is not guaranteed.

## Generations of Breaking Changes

Xarpite occasionally introduces changes that break backward compatibility.

By managing compatibility-breaking changes as generations expressed by the integer API version, you can keep running old scripts with the behavior of an old generation, or migrate to the new behavior at any time of your choosing.

Breaking changes include, for example, the following.

- Removal of a function
- A change in existing behavior
- A change in the grammar

## Handling the API Version in Scripts

The API version of the runtime is specified with the `-A` option.

When the `-A` option is not specified, the API version becomes the same value as Xarpite's own major version.

For details on `-A`, see the Command Line Tool page.

---

The API version of the current runtime can be obtained with the `API_VERSION` constant.

```shell
$ xa -A 4 'API_VERSION'
# 4
```

---

For scripts that value portability, it is safe to declare the assumed API version at the beginning using the `API()` function.

```shell
$ xa -A 4 -q '
  API(4)
  OUT << "Hello"
'
# Hello
```

When run in an environment of a generation different from what is assumed, instead of silently changing behavior, `API()` throws an error explicitly at a very early stage of execution.

```shell
$ xa -A 4 -q '
  API(5)
  OUT << "Hello"
'
# ERROR: Script requires API version 5, but the environment API version is 4
#   at -:2:6             API(5)
#   at -:1:1
```

## Why an Exact Match

The check by `API()` is performed not as "greater than or equal to the specified value" but as "exactly equal to the specified value".

This is because breaking changes can break compatibility both forward and backward.

For example, suppose function F1 is removed in API version 5, and function F2 is removed in API version 6.

In that case, running a script that assumes API version 5 in an API version 6 environment will not work correctly, because F2 no longer exists.

Conversely, running a script that assumes API version 6 in an API version 5 environment will diverge from the assumed behavior.

Therefore, declaring "this exact generation is assumed" with an exact match is the only safe approach.

## Breaking Changes and Migration

Breaking changes are introduced in a form that can be opted into via the API version.

The documentation for a feature affected by a breaking change describes how its behavior changes depending on the API version.

In addition, a migration guide is provided as guidance for migrating scripts across generations.

The migration guide explains how to rewrite existing notations, calls, and idioms toward a new generation.

## Current Status

Currently, the only API version provided by the runtime is 4, and the default value is also 4.
