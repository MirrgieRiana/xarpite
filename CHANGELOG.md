# Changelog

<!-- INSRTION POINT -->

## 4.103.0

**Changes:**

- Changed compound assignment override methods to return their return value instead of the right-hand value.
- Added `accessor` function parameter to compound assignment override methods (`_+=_`, `_-=_`), enabling control over expression get and set operations.

**Improvements:**

- Added `INC` relative path resolution for `USE` function to search modules in `INC` directories.
- Allowed compound assignment operators to work with expressions that don't support setters when an override method is provided.
- Allowed increment and decrement operators to work with expressions that don't support setters when an override method is provided.

**Fixes:**

- Fixed `xarpite-update` to properly clean up temporary files when interrupted with Ctrl-C.
