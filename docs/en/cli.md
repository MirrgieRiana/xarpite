---
title: CLI
---

<!-- toc -->

# Commands

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

# CLI-Specific Built-in Constants and Functions
