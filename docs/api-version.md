---
title: "API Version"
---

<!-- toc -->

# API Version

In addition to Xarpite's own version, Xarpite has a concept called the API version, which is a separate axis from Xarpite's own version.

---

The API version is an integer that represents the stage at which breaking changes have been introduced into the language specification that the runtime provides to scripts.

Breaking changes include, for example, the following.

- Removal of a built-in function, a change in its behavior, or a change in its interface
- A change in the grammar

By making breaking changes as additions of API versions rather than as updates to the language itself, the language can be updated while preserving the behavior of existing scripts.

---

The API version is set for the entire evaluation context, not for each individual script file.

## Specifying the API Version

In the CLI version, you can specify the API version with the `-A` option.

## Handling on the Script Side

When writing a Xarpite script file, it is recommended to check the API version that the script conforms to with the `API` function at the beginning.

This also serves to declare the generation of breaking changes that the script has finished following.

Unless the API version that the script conforms to and the API version that the runtime provides match exactly, behavior is not guaranteed.

To update the API version that an existing script conforms to, also refer to the migration guide.
