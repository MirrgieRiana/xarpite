---
title: CLI
---

# CLI

Xarpite can be executed through a command-line interface (CLI).

There are several CLI-exclusive features and concepts that are not available in the browser version.

<!-- toc -->

## Launcher and Runtime

When executing Xarpite on CLI, there are two layers: launcher and runtime.

---

The launcher refers to the shell script that directly accepts the `xarpite` command.

The launcher determines and launches the runtime to actually start based on environment variables and arguments.

---

The runtime refers to the program that actually operates Xarpite scripts.

The runtime has different implementations on multiple platforms, which are called Xarpite engines.

## Commands to Execute Xarpite

### `xarpite`: Basic Command to Execute Xarpite

The `xarpite` command is the most basic command for executing Xarpite.

```shell
$ xarpite -h
# Usage: xarpite <Launcher Options> <Runtime Options> [--] [scriptfile] <arguments>
# Launcher Options:
#   --native                 Use the native engine
#   --jvm                    Use the JVM engine
#   --node                   Use the Node.js engine
# Runtime Options:
#   -h, --help               Show this help
#   -q                       Run script as a runner
#   -f <scriptfile>          Read script from file
#                            Omit [scriptfile]
#   -e <script>              Evaluate script directly
#                            Omit [scriptfile]
```

---

`Launcher Options` are interpreted by the launcher side, and `Runtime Options` are interpreted by the runtime side.

Therefore, they cannot be specified in reversed order.

---

The `xarpite` command can also be used to directly execute Xarpite scripts via shebang lines.

```shell
$ {
  echo '#!/usr/bin/env xarpite' > script.xa1
  echo '100 + 20 + 3' >> script.xa1
  chmod +x script.xa1

  ./script.xa1

  rm script.xa1
}
# 123
```

### `xa`: Convenient Shortcut to Execute Xarpite Locally

The `xa` command is a shortcut for the `xarpite` command.

```shell
$ xa -h
# Usage: xa <Launcher Options> <Runtime Options> [--] [script] <arguments>
# Launcher Options:
#   --native                 Use the native engine
#   --jvm                    Use the JVM engine
#   --node                   Use the Node.js engine
# Runtime Options:
#   -h, --help               Show this help
#   -q                       Run script as a runner
#   -f <scriptfile>          Read script from file
#                            Omit [script]
#   -e <script>              Evaluate script directly
#                            Omit [script]
```

---

It has generally the same specification as the `xarpite` command, but with important differences:

- The character count is very short at 2 characters.
- The first argument is interpreted as Xarpite script itself by default, not a Xarpite script file.
- **If Xarpite2 etc. is released, the same `xa` command may be used.**

---

Roughly speaking, it's a convenient command for humans to use on their local console.

With the `xa` command, you can do simple calculations with very little notation.

```shell
$ xa '100 + 20 + 3'
# 123
```

---

On the other hand, the `xa` command is not intended for use described in files such as shell scripts.

For that purpose, use the `xarpite` command instead.

## Specifying Xarpite Engine

### `XARPITE_ENGINE`: Environment Variable to Specify Xarpite Engine

The `XARPITE_ENGINE` environment variable specifies the Xarpite execution engine.

- `native`: Use native implementation
- `jvm`: Use JVM
- `node`: Use Node.js

---

Some features are only available on specific engines.

---

If the `XARPITE_ENGINE` environment variable is not specified, the contents of the configuration file `default_engine` are used.

Normally, this configuration file is created when Xarpite is installed.

If this configuration file also does not exist, the `native` engine is used by default.

---

Specifying the Xarpite engine via command-line options takes precedence over specification via environment variables.

## Command-Line Options to Specify Xarpite Engine

Command-line options to specify the Xarpite engine are exclusive and cannot be specified simultaneously.

### `--native`: Use Native Implementation Engine

Uses the natively compiled Xarpite engine.

### `--jvm`: Use JVM Engine

Uses the Xarpite engine running on the JVM.

### `--node`: Use Node.js Engine

Uses the Xarpite engine running on Node.js.

## Return Value Output

In CLI Xarpite, the standard behavior is to output the return value of the entire program to standard output.

---

At this time, stringification of the output value is performed.

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

If the code value is a stream, each element is output one line at a time.

```shell
$ xa '1 .. 3'
# 1
# 2
# 3
```

---

If the code return value is an empty stream, nothing is output.

```shell
$ xa '1 + 2; ,'
```

### `-q`: Suppress Return Value Output

When the `-q` option is specified, return value output is not performed.

To output, you need to use the `OUT` function or similar separately.

```shell
$ xa -q '
  OUT << "apple"
  OUT << "banana"
  "orange"
'
# apple
# banana
```

---

Strictly speaking, this option specifies interpreting the entire source code as a statement (runner) context.

Therefore, statements such as variable declaration statements can be written in the trailing expression part.

## Script Specification

There are 6 ways to specify the Xarpite script to execute, divided by launch command and specification method.

| Launch Command | Script Specification | Example                            | Treatment     |
|----------------|----------------------|------------------------------------|---------------|
| `xarpite`      | First argument       | `xarpite script.xa1 arg1 ...`      | Script file   |
| `xarpite`      | `-f`                 | `xarpite -f script.xa1 arg1 ...`   | Script file   |
| `xarpite`      | `-e`                 | `xarpite -e '1 + 2' arg1 ...`      | Script        |
| `xa`           | First argument       | `xa '1 + 2' arg1 ...`              | Script        |
| `xa`           | `-f`                 | `xa -f script.xa1 arg1 ...`        | Script file   |
| `xa`           | `-e`                 | `xa -e '1 + 2' arg1 ...`           | Script        |

### `-f`: Load Script from File

`-f <scriptfile>`

When the `-f` option is specified, it loads and executes the Xarpite script from the specified Xarpite script file.

Unlike the `USE` function, if `scriptfile` is specified as a relative path, it is resolved from the current directory.

```shell
$ {
  echo '100 + 20 + 3' > script.xa1
  xa -f script.xa1
  rm script.xa1
}
# 123
```

---

When the `-f` option is specified, the first argument is interpreted as part of the arguments passed to the script.

```shell
$ {
  echo 'ARGS()' > script.xa1
  xa -f script.xa1 '100 + 20 + 3' apple banana cherry
  rm script.xa1
}
# 100 + 20 + 3
# apple
# banana
# cherry
```

---

The `-f` option and `-e` option are mutually exclusive and cannot be specified simultaneously.

### `-e`: Execute Script Directly

`-e <script>`

When the `-e` option is specified, it directly executes the specified Xarpite script.

```shell
$ xarpite -e '100 + 20 + 3'
# 123
```

---

When the `-e` option is specified, the first argument is interpreted as part of the arguments passed to the script.

```shell
$ xa -e 'ARGS()' '100 + 20 + 3' apple banana cherry
# 100 + 20 + 3
# apple
# banana
# cherry
```

---

The `-f` option and `-e` option are mutually exclusive and cannot be specified simultaneously.

## Other Commands

### `xarpite-update`: Update Xarpite to Latest Version

Updates the currently running Xarpite to the latest version.

This command requires permission to write to the installation directory.

## CLI-Exclusive Built-in Constants and Functions

### `ARGS`: Get Command-Line Arguments

Command-line arguments are stored in an array.

The first argument corresponds to index 0, and the `xa` command or one-liner source code is not included.

```shell
$ xa 'ARGS' 1 2 3
# [1;2;3]
```

### `ENV`: Get Environment Variables

Environment variables are stored as an object.

```shell
$ FOO=bar xa 'ENV.FOO'
# bar
```

If a non-existent variable is accessed, `NULL` is returned.

### `IN`: Read Strings Line by Line from Console

`IN: STREAM<STRING>`

A stream that reads strings line by line from standard input.

```shell
$ { echo 123; echo 456; } | xa 'IN'
# 123
# 456
```

---

Because streams are sequential, even very large iterations can be performed with low memory consumption.

```shell
$ xa '1 .. 10000 | "#" * 10000' | xa 'IN | $#_ >> SUM'
# 100000000
```

---

To read only one line from the console, use the `FIRST` function.

```shell
$ {
  echo 123
  echo 456
} | xa -q '
  OUT << "1: $(FIRST(IN))"
  OUT << "2: $(FIRST(IN))"
'
# 1: 123
# 2: 456
```

Because streams are sequential, even very large iterations can be performed with low memory consumption.

```shell
$ xa '1 .. 10000 | "#" * 10000' | xa 'IN | $#_ >> SUM'
# 100000000
```

---

If `IN` is used even once, `INB` and `INC` cannot be used.

### `INC`: Read Strings Character by Character from Console

`INC: STREAM<STRING>`

A stream that reads strings character by character from standard input.

Each character is returned as a string of length 1.

```shell
$ echo -n "abc" | xa 'INC'
# a
# b
# c
```

---

Newline characters are also read as single characters.

```shell
$ { echo "a"; echo "b"; } | xa 'INC | x => "[" & x & "]"'
# [a]
# [
# ]
# [b]
# [
# ]
```

---

Because streams are sequential, even very large iterations can be performed with low memory consumption.

---

To read only one character from the console, use the `FIRST` function.

```shell
$ echo -n "abc" | xa -q '
  OUT << "1: $(FIRST(INC))"
  OUT << "2: $(FIRST(INC))"
'
# 1: a
# 2: b
```

---

If `INC` is used even once, `IN` and `INB` cannot be used.

### `INB`: Read Byte Data from Console

`INB: STREAM<BLOB>`

A stream that reads all byte data from standard input as BLOB.

BLOBs are divided into lengths of up to 8192 bytes.

```shell
$ echo -n "abc" | xa 'INB'
# BLOB.of([97;98;99])
```

---

If `INB` is used even once, `IN` and `INC` cannot be used.

### `OUT`: Output to Console

`OUT(value: VALUE): NULL`

Outputs to standard output.

This function is often called by the left-execution pipe `<<`.

```shell
$ xa -q '
  OUT(123)
  OUT << 456
'
# 123
# 456
```

---

When a stream is specified, each element is output one line at a time.

```shell
$ xa -q '
  OUT(1 .. 3)
'
# 1
# 2
# 3
```

---

The `OUT` function itself returns `NULL`.

### `OUTC`: Output Strings Character by Character to Console

`OUTC(value: VALUE): NULL`

Outputs strings character by character to standard output.

This function is often called by the left-execution pipe `<<`.

```shell
$ xa -q '
  OUTC("a")
  OUTC << "b"
'
# ab
```

---

When a stream is specified, each element is stringified and output character by character.

```shell
$ xa -q '
  OUTC("a", "b", "c")
'
# abc
```

---

When a string with a length of 2 or more is specified, the entire string is output at once.

```shell
$ xa -q '
  OUTC("abc")
'
# abc
```

---

Newlines are not automatically added.

```shell
$ xa -q '
  OUTC << "a"
  OUTC << "b"
  OUTC << "c"
'
# abc
```

---

The `OUTC` function itself returns `NULL`.

### `OUTB`: Output Byte Data to Console

`OUTB(blobLike: BLOB_LIKE): NULL`

Converts `blobLike` to a byte sequence and outputs it as a byte sequence to standard output.

If a stream is given, each element is converted to a byte sequence in order and output in order.

Newlines are not automatically added.

```shell
$ xa -q 'OUTB(BLOB.of([65, 66, 67, 10]), BLOB.of([68, 69, 70, 10]))'
# ABC
# DEF
```

---

Other parts generally follow the specification of the `OUT` function.

---

**Note that Xarpite normally automatically outputs the return value of the entire program to standard output.**

If you forget the `-q` option, garbage such as " `NULL` newline" will be attached at the beginning of the byte sequence.

```shell
$ xa -q '65, 66, 67, 10 >> OUTB'
# ABC

$ xa '65, 66, 67, 10 >> OUTB'
# ABC
# NULL
```

When using `OUTB`, note that `OUTB` returns NULL, and remember to use the `-q` option.

### `ERR`: Output to Standard Error

`ERR(value: VALUE): NULL`

Outputs to standard error output.

This function operates similarly to the CLI version `OUT` function, but writes to standard error output instead of standard output.

```shell
$ xa -q 'ERR("Error!")' > /dev/null
Error!
```

### `ERRB`: Output Byte Data to Standard Error

`ERRB(blobLike: BLOB_LIKE): NULL`

Converts `blobLike` to a byte sequence and outputs it as a byte sequence to standard error output.

This function operates similarly to the `OUTB` function, but writes to standard error output instead of standard output.

```shell
$ xa -q '65, 66, 67, 10 >> ERRB' > /dev/null
ABC
```

### `FILES`: Get List of Files in Directory

`FILES(dir: STRING): STREAM<STRING>`

Gets a stream of filenames directly under the directory specified by `dir`.

Filenames do not include directory paths.

Returned files do not include `.` or `..`, but do include directories and other special files.

Returned filenames are sorted in lexicographic order.

```shell
$ {
  mkdir tmp
  touch tmp/file
  mkdir tmp/dir
  xa 'FILES("tmp")'
  rm tmp/file
  rmdir tmp/dir
  rmdir tmp
}
# dir
# file
```

### `READ`: Read from Text File

`READ(file: STRING): STREAM<STRING>`

Reads the contents of the text file specified by `file` line by line as strings.

Newline codes are removed.

```shell
$ {
  echo "apple" > tmp.txt
  echo "banana" >> tmp.txt
  xa 'READ("tmp.txt")'
  rm tmp.txt
}
# apple
# banana
```

### `READB`: Read from Binary File

`READB(file: STRING): STREAM<BLOB>`

Reads all contents from the binary file specified by `file` as BLOBs.

BLOBs are split into lengths of up to 8192 bytes.

```shell
$ {
  echo -en '\x20\x21\x22' > tmp.bin
  xa 'READB("tmp.bin")'
  rm tmp.bin
}
# BLOB.of([32;33;34])
```

### `USE`: Get Result of External Xarpite File

`USE(file: STRING): VALUE`

Returns the result of evaluating the specified Xarpite script.

```shell
$ {
  echo '877' > banana.xa1
  xa 'USE("./banana")'
  rm banana.xa1
}
# 877
```

---

`file` must start with `./` and is interpreted as a relative path from the file that called the `USE` function.

For example, if you write `USE("./banana")` in `fruit/apple.xa1`, `fruit/banana.xa1` is loaded.

In `file`, the extension `.xa1` is optional. If you write `USE("./banana")`, if `./banana` exists it is loaded, otherwise `./banana.xa1` is loaded.

If the code is specified directly on the command line, files are resolved from the current directory.

The directory separator character is `/` regardless of the OS on which it is executed.

```shell
$ {
  mkdir modules
  echo '
    {
      getBananaImpl: () -> "Banana"
    }
  ' > modules/banana.xa1
  echo '
    @USE("./banana")
    {
      getBanana: () -> getBananaImpl()
    }
  ' > modules/fruit.xa1
  xa '
    @USE("./modules/fruit")
    getBanana()
  '
  rm modules/banana.xa1
  rm modules/fruit.xa1
  rmdir modules
}
# Banana
```

---

By mounting the return value of the `USE` function, you can achieve a directive-like usage.

```shell
$ {
  echo '
    {
      FRUIT: 877
    }
  ' > banana.xa1
  xa '
    @USE("./banana")
    FRUIT
  '
  rm banana.xa1
}
# 877
```

---

The result of the `USE` function for the same absolute file path is cached and reused by the same call.

Therefore, the returned instance is always the same, and the side effects at load time also occur only once.

If the script result is a stream, that stream is resolved.

Even if the file entity is the same, if it exists on a different absolute path due to symbolic links etc., it is considered a different file.

```shell
$ {
  echo '
    {
      variables: {
        fruit: "apple"
      }
    }
  ' > tmp.xa1
  xa -q '
    a := USE("./tmp")
    b := USE("./tmp")
    OUT << b.variables.fruit
    a.variables.fruit = "banana"
    OUT << b.variables.fruit
  '
  rm tmp.xa1
}
# apple
# banana
```

---

Files written on the premise of being `USE`d are called modules.

Modules often expose APIs by returning objects for mounting, but not always.

APIs provided by modules may be written in uppercase like built-in mounts, or they may not.

### `EXEC`: Execute External Command [EXPERIMENTAL]

`EXEC(command: STREAM<STRING>[; env: OBJECT<STRING>]): STREAM<STRING>`

Executes an external command.

In `command`, specify the process and its arguments one element at a time.

The return value is a stream that reads the standard output of that process line by line.

```shell
$ xa 'EXEC("echo", "Hello, World!")'
# Hello, World!
```

```shell
$ xa 'EXEC("bash", "-c", "seq 1 30 | grep 3")'
# 3
# 13
# 23
# 30
```

---

The `env` argument lets you specify environment variables for the process.

Environment variables are inherited from the calling Xarpite process and then added or overwritten.

```shell
$ xa 'EXEC("bash", "-c", %>echo $FOO<%; env: {FOO: "BAR"})'
# BAR
```

You can delete existing environment variables by specifying an empty string or `NULL`.

```shell
$ A=APPLE B=ANNA xa '
  EXEC("bash", "-c", %>
    echo "A=$A"
    echo "B=$B"
    echo "C=$C"
  <%; env: {
    B: NULL
    C: "CHERRY"
  })
'
# A=APPLE
# B=
# C=CHERRY
```

---

If the called process exits with a non-zero exit code, an exception is thrown.

```shell
$ xa 'EXEC("bash", "-c", "exit 1") !? "ERROR"'
# ERROR
```

---

The standard error output of the called process is redirected to Xarpite's standard error output.

```shell
$ xa -q 'EXEC("bash", "-c", "echo 'ERROR' 1>&2")' 2>&1
# ERROR
```

---

The called process is managed in a separate thread, and the main thread suspends without blocking.

---

This function is an experimental feature and its specification may change in the future.

The return value is not a stream that sequentially reads the process's standard output, but rather the process's standard output split into lines after the process terminates.

**Also, this function is currently only provided in the JVM version.**
