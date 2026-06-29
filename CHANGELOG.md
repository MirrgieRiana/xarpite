# Changelog

<!-- INSERTION POINT -->

## 4.107.0

**Improvements:**

- Added `-A` option to set the API version of the execution environment.
- Added `API_VERSION` constant that returns the API version of the current environment.
- Added `API` function that throws an error unless the API version of the current environment exactly matches the given version.
- Added the arbitrary-precision integer type `BIG`.
- Added the `BIG.of` function to create a `BIG` from a string or a number.
- Added support for converting an integer string outside the range of `INT` into a `BIG` without losing precision.
- Added support for decoding JSON integers outside the range of `INT` into `BIG` values and encoding `BIG` values back into JSON number literals.
- Added `CHAR_CODE` and `CHAR_CODED` functions for converting between strings and UTF-16 code unit values.
- Added `CHAR_CODES` and `CHAR_CODESD` functions for converting between strings and UTF-16 code unit values.
- Added `CODE_POINT` function that returns the Unicode code point value of a string consisting of exactly one code point.
- Added `CODE_POINTD` function that returns the string consisting of a single Unicode code point for a code point value.
- Added `CODE_POINTS` function that returns the stream of Unicode code point values of a string.
- Added `CODE_POINTSD` function that builds a string from a stream of Unicode code point values.
- Added `-E` option to interpret the entire script as an embedded string literal.
- Added `<%# ... %>` comment syntax in embedded string literals.
- Added `ERROR` class representing a native error.
- Added `ERROR.throwNativeError` function that throws a native error with the given message.
- Added `EXECB` function that executes an external command and returns its standard output as a BLOB.
- Added `GET` function that retrieves the element from a stream at the specified index.
- Added `ASIN`, `ACOS`, and `ATAN` functions that return inverse trigonometric values.
- Added `ATAN2` function that computes the angle of a coordinate.
- Added support for passing `NULL` as the `indent` argument of the `JSON`, `JSONS`, and `JSONL` functions to produce compact output without indentation.
- Added `LINESD` function that concatenates a stream of lines into a string by appending a newline to each element.
- Added a second argument to the `LOG` function that specifies the base of the logarithm.
- Added Maven Central to the default `INC` paths for module search.
- Added `NOP` function that does nothing and returns NULL.
- Added `!~` operator that tests whether a string does not match a regular expression.
- Added `OUTL` as a synonym for `OUT` to write each value to standard output with a trailing newline.
- Added `PARENT` function that returns the parent object of a value.
- Added `LAUNCH2`, `LAZY2`, `WHILE2`, and `TRY2` functions that accept pass-by-formula arguments instead of lambdas.
- Added pass-by-formula argument syntax `name()` for lambda expressions and closure-style function calls.
- Added regular expression matching via string property access (`string./regex/`), equivalent to `string =~ regex`.
- Added a prefix colon `:` that returns its operand as-is.
- Added `REGEX_ESCAPE` function to escape regex metacharacters in a string.
- Added the repository URL to the help message.
- Added `RUN` function that executes a given no-argument function and returns the result.
- Added `SLIDE` function that splits a stream into sliding windows.
- Added the `XARPITE_STACK_SIZE` environment variable to specify the upper limit of the execution stack size as a number with a `K`, `M`, or `G` unit suffix.
- Added STRING methods `take`, `taker`, `drop`, and `dropr` (with the synonyms `takeFirst`, `takeLast`, `dropFirst`, and `dropLast`) for taking and dropping characters from the ends of a string.
- Added STRING methods `first` and `last` that return the first or last character of a string, or `NULL` if the string is empty.
- Added `TSV` and `TSVD` functions that work like `CSV` and `CSVD` but default to tab as the separator character.
- Added `MAJOR`, `MINOR`, and `PATCH` constants to obtain the running Xarpite version number as a number for each component.
- Added `XA` function that evaluates a string as a Xarpite script and returns the result.
- Changed `AND`/`ALL` and `OR`/`ANY` functions to evaluate the second argument lazily, enabling short-circuit evaluation.
- Changed `IN` to read the entire standard input as a single `STRING` in API version 5.
- Changed `READ` to return the entire file content as a single string in API version 5.
- Changed the CLI to exit with a non-zero exit code when a script terminates with an error in API version 5.
- Added `::CONTAINS` extension function as sugar for the `@` containment operator.
- Changed `EXEC` to return the entire standard output as a single `STRING` in API version 5.
- Added the directory to the paths returned by `FILES` in API version 5.
- Added support for passing a stream of indices to the `GET` function, returning the corresponding elements as a stream.
- Added infix usage of `MIN` and `MAX` (`a MIN b`, `a MAX b`) to return the smaller or larger of two values.
- Changed the `JSON` function and the `$&` operator to indent their output with two spaces by default in API version 5.
- Added `PROMISE::awaitException` method to retrieve exception values without throwing.
- Removed the `JSONS` function in API version 5.
- Required a `#` line comment to begin only at the start of a line or immediately after a space or tab in API version 5.
- Changed the `SLEEP` function to interpret its argument as seconds in API version 5.
- Added `-y` option to `xarpite-update` to automatically apply updates without a confirmation prompt.

**Fixes:**

- Fixed a possible crash on exit after making HTTPS requests in the native build.
- Fixed the catch operator `!?` not catching native errors originating from the host language; such errors are now caught and passed to the `catch` clause as an `ERROR` instance.
- Fixed the usage messages of `TO_ARRAY` and `TO_OBJECT` showing the wrong function name.
- Fixed the JSON encoding and decoding functions throwing a raw host-level exception instead of a normal error on invalid input.
- Fixed lazily-initialized built-in constants such as `IN` being initialized more than once when accessed concurrently from multiple coroutines.
- Fixed `PROMISE::fail` failing with a value of type `ERROR` itself instead of the native error it represents.
- Fixed the module search order of `INC` so that paths closer to the end of the array take precedence.
- Fixed an index, count, or similar value of `NaN` being silently treated as `0` instead of raising an error.
- Simplified the redundant `T | STREAM<T>` notation to `STREAM<T>` in the usage signatures of the `KEYS`, `CSV`, `TSV`, `CSVD`, and `TSVD` functions.
- Fixed the throw operator `!!` throwing a value of type `ERROR` itself instead of rethrowing the native error it represents.
- Fixed `xarpite-update` showing a confirmation prompt even when no changes were detected.

## 4.106.0

**Improvements:**

- Added indent-block syntax using `:` followed by an indented block as an alternative to parenthesized expressions.
- Added `INTERCALATE` function for joining array streams with separator arrays.
- Added `RANDOM` function that selects a random element from a stream.
- Added `SHELL_ESCAPE` / `BASH_ESCAPE` function to escape strings for safe use in shell commands.
- Added `stream.{}` syntax to convert a stream of 2-element arrays to an object.
- Added `TO_STREAM` function to convert a value to a stream.
- Added `TRANSPOSE` function and its synonym `ZIP` to transpose a stream of arrays.
- Added `TRY` control function that executes a block and returns the result as a `PROMISE`, catching exceptions into a rejected `PROMISE`.
- Added `--verbose` option to display Kotlin stack traces for debugging interpreter internals.

## 4.105.0

**Improvements:**

- Added `EXIT` function to terminate the process with a specified exit code.
- Added support for loading modules from `http://` and `https://` URLs via the `INC` module search path array.
- Added `INL` as a synonym for `IN` to read strings line by line from console.
- Added `stream.[]` syntax to convert a stream to an array.

**Fixes:**

- Fixed spurious diffs in `xarpite-update`.
- Fixed an issue where the `FETCH` and `FETCHB` functions returned error page content instead of raising an error on non-2xx HTTP responses.
- Fixed HTTPS requests failing in Linux x86_64 native engine.

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
