<br>

<div align="center">
  <img alt="Xarpite Logo" src="assets/xarpite-logo.svg" />
</div>

<br>
<br>

<div align="center">
  <a href="https://github.com/MirrgieRiana/xarpite/actions/workflows/release.yml"><img alt=".github/workflows/release.yml" src="https://github.com/MirrgieRiana/xarpite/actions/workflows/release.yml/badge.svg" /></a>
  <img alt="" src="https://img.shields.io/github/v/tag/MirrgieRiana/xarpite.svg?label=Latest%20Version" />
</div>

# NAME

Xarpite(xa) - Interpreted language for one-liners

# SYNOPSIS

```shell
$ xa ' "Hello, World" '
# Hello, World

$ xa '[1 .. 3 | x => [1 .. 3 | x * _]]'
# [[1;2;3];[2;4;6];[3;6;9]]

$ seq 1 3 | xa 'IN | +_ * 10'
# 10
# 20
# 30

$ echo '{"a": [10, {"b": 30}, 20]}' | xa 'IN | _.$*.a.1.b'
# 30

$ xa 'f := n -> n <= 0 ? 1 : n * f(n - 1); f(5)'
# 120

$ xa '(f -> f(f))(f -> n -> n <= 0 ? 1 : n * f(f)(n - 1))(5)'
# 120
```

# DESCRIPTION

Xarpite is an interpreter language designed for one-liner scripts.
It aims to allow flexibility and functionality in a minimal amount of code
with most basic features accessible through operators.
Its command-line interface is optimized to enable writing executable programs with minimal code.
For example, the command `$ xa ' "Hello, World" '` will display `Hello, World`.

# PLAYGROUND

There is a web tool available online that can run Xarpite.

[Xarpite Playground](https://mirrgieriana.github.io/xarpite/playground/)

# INSTALL

Linux:

```shell
# Using the native binary by default
curl -s https://raw.githubusercontent.com/MirrgieRiana/xarpite/release/install-native.sh | sudo bash
```

or

```shell
# Using the JVM version by default
curl -s https://raw.githubusercontent.com/MirrgieRiana/xarpite/release/install-jvm.sh | sudo bash
```

Download the Xarpite binary to `./xarpite` and install it in `/usr/local/bin/xa`.

# DOCUMENTATION

- [Japanese](https://mirrgieriana.github.io/xarpite/doc/ja/INDEX)

---

*The Xarpite logo and icon uses the font [Monaspace Krypton](https://monaspace.githubnext.com/).*
