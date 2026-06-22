---
title: "Raw String Literal `'contents'`"
---

<!-- toc -->

# Raw String Literal `'contents'`

Raw string literals are strings enclosed in `'` `'` that interpret most characters literally.

| String            | Meaning              |
|-------------------|----------------------|
| `''`              | `'`                  |
| CRLF              | LF                   |
| CR                | LF                   |
| LF                | LF                   |
| `'`               | End of raw string    |
| Other characters  | The character itself |

## Single Quote Content `''`

To write `'` in a raw string, write `''`.

```shell
$ xa " 'abc''def' "
# abc'def
```

## Newline Content

Raw strings can contain newlines, but all are normalized to LF.

This ensures that program behavior remains consistent even if the source code's newline convention changes.

```shell
$ xa " 'abc
def' "
# abc
# def
```

## Character Content `abcABC123`

Characters other than the above are interpreted as written.

This includes `$` and ` \ ` without exception.

```shell
$ xa \''abc$def\nop'\'
# abc$def\nop
```

# Template String Literal `"contents"`

Template string literals are strings enclosed in `"` `"` that support features like escape sequences and variable interpolation.

| String                              | Meaning                                         |
|-------------------------------------|-------------------------------------------------|
| `\"`                                | `"`                                             |
| `\$`                                | `$`                                             |
| ` \\ `                              | ` \ `                                           |
| `\t`                                | Tab character                                   |
| `\r`                                | CR                                              |
| `\n`                                | LF                                              |
| `\xXX`                              | 1 character at code point U+0000~U+00FF         |
| `\uXXXX`                            | 1 UTF-16 code unit                              |
| Other sequences starting with ` \ ` | Syntax error                                    |
| CRLF                                | LF                                              |
| CR                                  | LF                                              |
| LF                                  | LF                                              |
| `$` identifier or parentheses, etc. | Embedding                                       |
| `$%` format specifier parentheses   | Embedding with format                           |
| `"`                                 | End of template string                          |
| Other characters                    | The character itself                            |

## Escape Sequence Content `\n`

Escape sequence content consists of sequences starting with ` \ `, each representing a specific character.

Refer to the table above for a complete list of escape sequences.

Sequences starting with ` \ ` are reserved for future features, and invalid sequences result in syntax errors.

```shell
$ xa ' "abc\"def\\ghi\njkl" '
# abc"def\ghi
# jkl
```

---

Escape sequences (character references) that specify a single Unicode character are also available.

```shell
$ xa ' "\u3042" '
# あ
```

## Newline Content

Same as raw string literal newline content.

## Embedding Content `$factor`

Following `$`, you can write any identifier, literal, or parentheses, and the value is stringified and embedded in the string.

The most common usage forms are embedding arbitrary expressions with parentheses or embedding a single identifier.

```shell
$ xa ' "value is $(100 + 20 + 3)" '
# value is 123

$ xa '
  value := 123
  "value is $value"
'
# value is 123
```

## Embedding with Format Content `$%-+ 07.2f(value)`

Embedding with format content is similar to normal embedding content, but differs in the following ways:

- Following `$`, write a format specifier starting with `%`.
- Direct embedding of identifiers etc. is not possible; only parentheses are allowed.

```shell
$ xa ' "[$%+09.2f(123)]" '
# [+00123.00]
```

---

The format specifier grammar is as follows:

1. `%`

- Required magic word.

2. Flags (optional)

- Zero or more flags from the table below can be specified.

3. Width (optional)

- Pads with half-width spaces if the string length is less than the width.

4. `.` Precision (optional)

- Specifies the number of decimal digits to display.
- If precision is reduced, rounding is performed.
- When the truncated part is exactly in the middle, it always rounds toward the larger absolute value.

5. Conversion

- Specify a conversion from the table below.

| Flag         | Meaning                               |
|--------------|---------------------------------------|
| `-`          | Left-align.                           |
| `+`          | Always display sign.                  |
| Half-width space | Display half-width space for sign. |
| `0`          | Pad with `0` instead of spaces.       |

| Conversion | Meaning                            |
|------------|-------------------------------------|
| d          | Decimal integer                     |
| x          | Hexadecimal integer (lowercase)     |
| X          | Hexadecimal integer (uppercase)     |
| f          | Decimal fraction                    |
| s          | String                              |

## Character Content `abcABC123`

Characters other than the above are interpreted as written.

# Embedded String Literal `%>contents<%`

Embedded string literals are string literals with a distinctive appearance enclosed by `%>` `<%`.

| String            | Meaning                     |
|-------------------|-----------------------------|
| `<%%`             | `<%`                        |
| CRLF              | LF                          |
| CR                | LF                          |
| LF                | LF                          |
| `<%=` expr `%>`   | Embedding                   |
| `<%#` ... `%>`    | Comment                     |
| `<%`              | End of embedded string      |
| Other characters  | The character itself        |

---

Embedded string literals are particularly compatible with HTML code generation.

```shell
$ xa '
  %>
    <table>
      <tr style="color: red;"><th>x</th><th>x×10</th></tr>
      <%= 1 .. 3 | x => %>
        <tr><td><%= x %></td><td><%= x * 10 %></td></tr>
      <% %>
    </table>
  <%
'
#     <table>
#       <tr style="color: red;"><th>x</th><th>x×10</th></tr>
#
#         <tr><td>1</td><td>10</td></tr>
#
#         <tr><td>2</td><td>20</td></tr>
#
#         <tr><td>3</td><td>30</td></tr>
#
#     </table>
```

<table>
  <tr style="color: red;"><th>x</th><th>x×10</th></tr>
  <tr><td>1</td><td>10</td></tr>
  <tr><td>2</td><td>20</td></tr>
  <tr><td>3</td><td>30</td></tr>
</table>

## Embedded String Termination Sequence Content `<%%`

To write `<%` in an embedded string, write `<%%`.

```shell
$ xa '%>[ <%% ]<%'
# [ <% ]
```

## Newline Content

Same as raw string literal newline content.

## Embedding Content `<%= value %>`

Enclosing with `<%=` `%>` allows embedding any value after stringifying it.

Like parentheses, variables declared inside do not escape outside.

```shell
$ xa ' %>value is <%= 100 + 20 + 3 %><% '
# value is 123
```

## Comment Content `<%# ... %>`

Enclosing with `<%#` `%>` creates a comment. The content of the comment is not output.

```shell
$ xa ' %>hello <%# this is a comment %>world<% '
# hello world
```

## Character Content `abcABC123`

Characters other than the above are interpreted as written.

# Streaming String Characters `string()`

Returns a stream that iterates over each character of the string in order.

```shell
$ xa '"abc"()'
# a
# b
# c
```

# String Element Access `string(index)`

Like arrays, you can access string elements by index.

```shell
$ xa '"abc"(1)'
# b

$ xa '"abc"(-1)'
# c

$ xa '"abc"(2, 0)'
# c
# a
```

# String Element Access `string.index`

You can access string elements with the `.` operator.

```shell
$ xa '"abc".1'
# b
```

---

Like object element access, the right side of `.` can be an expression.

```shell
$ xa '"abc".(1 + 1)'
# c
```

---

If the subscript is negative, `NULL` is returned.

```shell
$ xa '"abc".(-1)'
# NULL
```

---

After the index is converted to a number, it is evaluated after rounding.

```shell
$ xa '"abc".("0.95")'
# b
```

# Stringification `&value`

The prefix `&` operator is used to get the string representation of a value.

```shell
$ xa '&[1..3]'
# [1;2;3]
```

---

The string representation for each value type is as follows:

- NULL becomes `NULL`.
- The string representation of an integer value is its decimal representation.
- TRUE becomes `TRUE`, FALSE becomes `FALSE`.
- The string representation of a string is the string itself.
- The string representation of an array is like `[1;2;3]`, separated by `;` and enclosed in `[` `]`.
- The string representation of an object is like `{a:1;b:2}`, with keys and values separated by `:`, those entries separated by `;`, and the whole enclosed in `{` `}`.

---

Stringification is actually performed by calling the `&_` method of the value.

You can change the stringification process by overriding the `&_` method of an object.

```shell
$ xa '&{`&_`: this -> "The value is $(this.value)"}{value: 100}'
# The value is 100
```

# String Concatenation `string & string`

To concatenate strings, use the `&` operator.

```shell
$ xa '"abc" & "def"'
# abcdef
```

# Getting Substring

`string[indices]` gets a substring.

```shell
$ xa '"abcde"[1..3]'
# bcd
```

# Taking and Dropping Substrings from the Ends

`STRING::take(count: INT): STRING`

`STRING::taker(count: INT): STRING`

`STRING::drop(count: INT): STRING`

`STRING::dropr(count: INT): STRING`

Returns the string obtained by taking or dropping the first or last `count` characters of the string.

`count` is converted to a number and rounded.

Each method has an alias with identical behavior.

| Method  | Alias       | Target | Operation | Behavior when `count` exceeds the string length |
|---------|-------------|--------|-----------|-------------------------------------------------|
| `take`  | `takeFirst` | First  | Take      | The entire string                               |
| `taker` | `takeLast`  | Last   | Take      | The entire string                               |
| `drop`  | `dropFirst` | First  | Drop      | An empty string                                 |
| `dropr` | `dropLast`  | Last   | Drop      | An empty string                                 |

```shell
$ xa '"[" & "abcde"::take(2) & "]"'
# [ab]

$ xa '"[" & "abcde"::taker(2) & "]"'
# [de]

$ xa '"[" & "abcde"::take(0) & "]"'
# []

$ xa '"[" & "abcde"::take(10) & "]"'
# [abcde]

$ xa '"[" & "abcde"::drop(2) & "]"'
# [cde]

$ xa '"[" & "abcde"::dropr(2) & "]"'
# [abc]

$ xa '"[" & "abcde"::drop(0) & "]"'
# [abcde]

$ xa '"[" & "abcde"::drop(10) & "]"'
# []
```

# Taking Characters from the Ends

`STRING::first(): STRING | NULL`

`STRING::last(): STRING | NULL`

The `first` and `last` methods get the first or last single character.

If the string is empty, `NULL` is returned.

```shell
$ xa '"abcde"::first()'
# a

$ xa '"abcde"::last()'
# e

$ xa '""::first()'
# NULL

$ xa '""::last()'
# NULL
```

# String Replacement

`STRING::replace(old: STRING | REGEX; new: STRING | (match: VALUE) -> STRING): STRING`

`STRING::replaceAll(old: STRING | REGEX; new: STRING | (match: VALUE) -> STRING): STRING`

`STRING::replaceFirst(old: STRING | REGEX; new: STRING | (match: VALUE) -> STRING): STRING`

The `replace`, `replaceAll`, and `replaceFirst` methods perform replacement within strings.

## Replacement Targets

The replacement targets for each method are as follows:

| Method         | String Replacement Target | Regular Expression Replacement Target |
|----------------|---------------------------|---------------------------------------|
| `replace`      | All occurrences           | Follow global match flag              |
| `replaceAll`   | All occurrences           | All matched parts                     |
| `replaceFirst` | First occurrence          | First matched part                    |

## Replacement with Strings

If a string is passed to `old`, occurrences that exactly match that string are replaced.

The string version of the `replace` method behaves the same as the `replaceAll` method.

```shell
$ xa '"-ab--ab-"::replace("ab"; "XX")'
# -XX--XX-

$ xa '"-ab--ab-"::replaceAll("ab"; "XX")'
# -XX--XX-

$ xa '"-ab--ab-"::replaceFirst("ab"; "XX")'
# -XX--ab-
```

## Replacement with Regular Expressions

If a regular expression is passed to `old`, all parts matching that regular expression are replaced.

If the regular expression object is not global, only the first matching part is replaced.

```shell
$ xa '"-ab--ab-"::replace(/[a-z]{2}/; "XX")'
# -XX--ab-

$ xa '"-ab--ab-"::replace(/[a-z]{2}/g; "XX")'
# -XX--XX-
```

---

The `replaceAll` and `replaceFirst` methods ignore the global match flag of regular expressions.

```shell
$ xa '"-ab--ab-"::replaceAll(/[a-z]{2}/; "XX")'
# -XX--XX-

$ xa '"-ab--ab-"::replaceAll(/[a-z]{2}/g; "XX")'
# -XX--XX-

$ xa '"-ab--ab-"::replaceFirst(/[a-z]{2}/; "XX")'
# -XX--ab-

$ xa '"-ab--ab-"::replaceFirst(/[a-z]{2}/g; "XX")'
# -XX--ab-
```

## Replacement with Functions

If a function is passed to `new`, that function is called for each matched part, and replacement is done with its return value.

```shell
$ xa '"-ab--ab-"::replace("ab"; m -> m.0 * 2)'
# -abab--abab-

$ xa '"-ab--ab-"::replace(/[a-z]{2}/g; m -> m.0 * 2)'
# -abab--abab-
```

# String Utility Functions

## Conversion Between Characters and Character Codes

`CHAR_CODE(char: STRING): INT`

`CHAR_CODED(charCode: INT): STRING`

`CHAR_CODES(string: STRING): STREAM<INT>`

`CHAR_CODESD(charCodes: STREAM<INT>): STRING`

`CODE_POINT(char: STRING): INT`

`CODE_POINTD(codePoint: INT): STRING`

These functions convert between strings and character codes.

The `CHAR_CODE` family works in UTF-16 code units, whereas the `CODE_POINT` family treats a character represented by a surrogate pair (U+10000 and above) as a single Unicode code point.

Functions with the `D` suffix decode, while those without it encode.

| Function      | Pre-decode type | Pre-decode meaning      | Direction   | Post-decode type | Post-decode meaning            |
|---------------|-----------------|-------------------------|-------------|------------------|--------------------------------|
| `CHAR_CODE`   | `INT`           | code unit value         | ← to code   | `STRING`         | exactly one UTF-16 code unit   |
| `CHAR_CODED`  | `INT`           | code unit value         | → to string | `STRING`         | exactly one UTF-16 code unit   |
| `CHAR_CODES`  | `STREAM<INT>`   | value of each code unit | ← to code   | `STRING`         | string                         |
| `CHAR_CODESD` | `STREAM<INT>`   | value of each code unit | → to string | `STRING`         | string                         |
| `CODE_POINT`  | `INT`           | code point value        | ← to code   | `STRING`         | exactly one Unicode code point |
| `CODE_POINTD` | `INT`           | code point value        | → to string | `STRING`         | exactly one Unicode code point |

An error is raised for inputs that fall under any of the following:

- `CHAR_CODED` `CHAR_CODESD`: given a value that is not between 0 and 65535
- `CODE_POINTD`: given a value that is not between 0 and 1114111, or a surrogate code point (U+D800 to U+DFFF)
- `CHAR_CODE` `CODE_POINT`: given a string that does not consist of exactly one code unit or code point, respectively
- `CODE_POINT`: given a string that contains an isolated surrogate

```shell
$ xa 'CHAR_CODE("A")'
# 65

$ xa 'CHAR_CODE("あ")'
# 12354

$ xa 'CHAR_CODED(65)'
# A

$ xa 'CHAR_CODED(12354)'
# あ

$ xa 'CHAR_CODES("ABC") >> JOIN[","]'
# 65,66,67

$ xa 'CHAR_CODESD(65, 66, 67)'
# ABC

$ xa '"Hello" >> CHAR_CODES >> CHAR_CODESD'
# Hello

$ xa 'CODE_POINT("A")'
# 65

$ xa 'CODE_POINT("🍰")'
# 127856

$ xa 'CODE_POINTD(65)'
# A

$ xa 'CODE_POINTD(127856)'
# 🍰
```

## `UC` Convert to Uppercase

`UC(string: STRING): STRING`

`UC(string: STREAM<STRING>): STREAM<STRING>`

Stringifies the argument and converts to uppercase.

If a stream is passed, returns a stream that converts each element to uppercase.

```shell
$ xa 'UC("Ab")'
# AB

$ xa '"Ab", "Cd" >> UC'
# AB
# CD
```

---

There is also an extension function version that can be called with `string::UC()`.

```shell
$ xa '"Ab"::UC()'
# AB
```

## `LC` Convert to Lowercase

`LC(string: STRING): STRING`

`LC(string: STREAM<STRING>): STREAM<STRING>`

Stringifies the argument and converts to lowercase.

Other specifications are shared with `UC`.

```shell
$ xa 'LC("Ab")'
# ab

$ xa '"Ab", "Cd" >> LC'
# ab
# cd
```

---

There is also an extension function version that can be called with `string::LC()`.

```shell
$ xa '"Ab"::LC()'
# ab
```

## `RESOLVE` Path Resolution

`RESOLVE(dir: STRING; file: STRING): STRING`

`STRING::RESOLVE(file: STRING): STRING`

Resolves the path to `file` starting from `dir`.

```shell
$ xa 'RESOLVE("/home/apple"; "Apple.txt")'
# /home/apple/Apple.txt
```

---

The output path is automatically normalized (flattening `.` and `..`).

Symbolic links are not resolved.

```shell
$ xa 'RESOLVE("/"; "Banana.txt")'
# /Banana.txt

$ xa '"/home/apple/"::RESOLVE("../cherry/./Cherry.txt")'
# /home/cherry/Cherry.txt
```

---

Using string concatenation like `"$PWD/file"` generates paths like `//file` for the root directory.

Instead, use the `RESOLVE` function like `PWD::RESOLVE("file")`.
