# Changelog

<!-- INSERTION POINT -->

## 4.104.0

**Improvements:**

- Added consistent left margin to stack trace to align error positions regardless of column number.
- Added `./.xarpite/lib` to the default `INC` paths for module search.
- Added `array -= item` syntax to remove the first matching element from an array.
- Added `EXECL` as a synonym for `EXEC` function to execute external commands.
- Added `FETCH` function to fetch text content from a URL and `FETCHB` function to fetch binary content as a BLOB.
- Added `FILE_NAMES` function as an alias for `FILES`.
- Added `READL` as a synonym for `READ` function to read text files line by line.
- Added `$path/main.xa1` file search pattern for `USE` function.
- Added `TREE` and `FILE_TREE` CLI functions to recursively traverse directories.
- Added version specification support to `install.sh` and `download.sh` scripts.

**Fixes:**

- Fixed error position reporting for compound assignment operators (`+=`, `-=`), increment/decrement operators (`++`, `--`), and method access operator (`::`).
- Fixed a bug where return statements (`!!`) in lambdas were incorrectly caught by unintended labels (`!:`) when invoked in different contexts.
- Fixed `xarpite-update` to preserve installation directory permissions.

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
