---
title: CLI
---

# CLI

This document describes Xarpite's command-line interface.

## `xarpite`: Execute Xarpite Code

This is the long form of the `xa` command.

It is provided in case new versions such as `xarpite2` appear in the future.

This command is recommended over the `xa` command when writing commands in persistent files such as shell scripts.

On the other hand, the `xa` command is shorter and more convenient when executing code directly from the command line.

The specifications of arguments are the same as the `xa` command.

## `xa`: Execute Xarpite Code

```
$ xa
# Usage: xa [<Launcher Options>] [<Runtime Options>] [--] <code> <arguments...>
#
# Launcher Options:
#   --native                 Use the native engine
#   --jvm                    Use the JVM engine
#   --node                   Use the Node.js engine
#
# Runtime Options:
#   -h, --help               Show this help
#   -q                       Run script as a runner
```

`xa` is a command that executes Xarpite code passed in command-line arguments on the spot.

The `xa` command outputs the return value of the code as standard behavior, so you don't need to explicitly use the `OUT` function or similar to output results.

```shell
$ xa '1 + 2'
# 3
```

---

`Launcher Options` must be specified before `Runtime Options`.

`--` indicates the end of options. All subsequent arguments are interpreted as code and arguments passed to the code.

### `XARPITE_ENGINE`: Specify Execution Engine

The `XARPITE_ENGINE` environment variable specifies the Xarpite execution engine.

- `native`: Use native implementation
- `jvm`: Use JVM
- `node`: Use Node.js

---

Some features are only available on specific engines.

---

If the `XARPITE_ENGINE` environment variable is not specified, the contents of the configuration file `default_engine` are used.

Normally, this configuration file is created when Xarpite is installed.

If this configuration file does not exist either, the `native` engine is used by default.

### `--native`: Use Native Implementation Engine

Use the natively compiled Xarpite engine.

---

Command-line options for specifying the Xarpite engine are exclusive, and multiple cannot be specified at the same time.

Specifying the Xarpite engine via command-line options takes precedence over specification via environment variables.

### `--jvm`: Use JVM Engine

Use the Xarpite engine running on the JVM.

The basic properties as a command-line option follow those of `--native`.

### `--node`: Use Node.js Engine

Use the Xarpite engine running on Node.js.

The basic properties as a command-line option follow those of `--native`.

### Return Value Output

String conversion is performed when outputting return values.

```shell
$ xa '
  Object := {
    new: () -> Object{}
    `&_`: _ -> "Hello, World"
  }
  Object.new()
'
# Hello, World
```

---

This behavior can be customized by overriding the `&_` method of the object.

### `-q`: Suppress Return Value Output

The `-q` option suppresses the output of return values.

When this option is specified, you need to explicitly use the `OUT` function or similar to output results.

```shell
$ xa -q '1 + 2'
# (no output)

$ xa -q '
  OUT << (1 + 2)
'
# 3
```

---

This option is useful when writing Xarpite scripts.

## `xarpite-update`: Update Xarpite to the Latest Version

Updates Xarpite to the latest version.

---

Depending on the installation method, this command may not be available.

## `ARGS`: Get Command-Line Arguments

`ARGS: ARRAY<STRING>`

An array containing command-line arguments.

## `ENV`: Get Environment Variables

`ENV: OBJECT<STRING>`

An object containing environment variables.

## `IN`: Read String Line by Line from Console

`IN: STREAM<STRING>`

Reads input from standard input line by line and returns it as a stream.

Each element of the stream is one line.

```shell
$ echo -e "abc\ndef" | xa 'IN'
# abc
# def
```

---

The stream ends when standard input is closed (EOF is reached).

```shell
$ echo -e "abc\ndef" | xa 'IN >> COUNT'
# 2
```

---

The newline characters at the end of lines are removed.

This is consistent with the fact that output via the `OUT` function automatically adds newline characters.

```shell
$ echo -e "abc\ndef" | xa -q 'IN | OUT << _'
# abc
# def
```

## `INB`: Read Byte Data from Console

`INB: STREAM<BLOB>`

Reads byte data from standard input.

Each element of the stream is a BLOB of a certain size.

The stream ends when standard input is closed (EOF is reached).

The size of each BLOB is unspecified.

## `OUT`: Output to Console

`OUT: OBJECT`

An object with methods for outputting to standard output.

### `OUT << value`: Output Value

Outputs the string representation of the value to standard output.

A newline character is automatically added at the end.

```shell
$ xa -q '
  OUT << "abc"
  OUT << "def"
'
# abc
# def
```

---

This output behavior can be customized by overriding the `&_` method of the object.

### `OUT.print(value)`: Output Value Without Newline

Outputs the string representation of the value to standard output without adding a newline character.

```shell
$ xa -q '
  OUT.print("abc")
  OUT.print("def")
'
# abcdef
```

### `OUT.BLOB << blob`: Output Byte Data

Outputs byte data to standard output.

```shell
$ xa -q '
  OUT.BLOB << UTF8("abc")
'
# abc
```

## `FILES`: Get List of Files in Directory

`FILES(path: STRING): STREAM<STRING>`

Returns a stream of file names in the specified directory.

```shell
$ xa 'FILES(".")'
# (list of files in the current directory)
```

---

The returned file names are relative paths from the specified directory.

Subdirectories and hidden files are not included.

## `READ`: Read from File

`READ(path: STRING): STRING`

Reads the contents of the file at the specified path and returns it as a string.

```shell
$ xa 'READ("file.txt")'
# (contents of file.txt)
```

---

`READ.BLOB(path: STRING): BLOB`

Reads the contents of the file at the specified path and returns it as a BLOB.

## `USE`: Get Result of External Xarpite File

`USE(path: STRING): T`

Executes the Xarpite file at the specified path and returns its result.

```shell
$ xa 'USE("module.xa")'
# (result of module.xa)
```
