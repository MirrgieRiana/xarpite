<br>

<div align="center">
  <img alt="Xarpite Logo" src="https://raw.githubusercontent.com/MirrgieRiana/xarpite/refs/heads/main/assets/xarpite-logo.svg" />
</div>

<br>
<br>

<div align="center">
  <a href="https://github.com/MirrgieRiana/xarpite/actions/workflows/release.yml"><img alt=".github/workflows/release.yml" src="https://github.com/MirrgieRiana/xarpite/actions/workflows/release.yml/badge.svg" /></a>
  <img alt="" src="https://img.shields.io/github/v/tag/MirrgieRiana/xarpite.svg?label=Latest%20Version" />
</div>

# NAME

Xarpite (xa) - An interpreted language for one-liners

# SYNOPSIS

```shell
$ xa ' "Hello, World!" '
# Hello, World!

$ xa '1 .. 3 | x => [1 .. 3 | x * _] >> CSV'
# 1,2,3
# 2,4,6
# 3,6,9

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

Xarpite (/ˈʃɑrpaɪt/) is an interpreted language designed for one-liner scripts.
It aims to provide flexibility and functionality in a minimal amount of code
with most of the basic features accessible through operators.
Its command-line interface is optimized for writing executable programs with minimal code.
For example, the command `$ xa ' "Hello, World!" '` will display `Hello, World!`.

# PLAYGROUND

An online playground is available for running Xarpite and trying examples interactively.

[Xarpite Playground](https://mirrgieriana.github.io/xarpite/playground/)

# INSTALL

## Install in a Linux environment

Download the Xarpite release into `./xarpite` and install it in `/usr/local/bin/xarpite`, `/usr/local/bin/xa` and `/usr/local/bin/xarpite-update`.

Using the native binary by default:

```shell
curl -s https://raw.githubusercontent.com/MirrgieRiana/xarpite/release/install-native.sh | sudo bash
```

or

Using the JVM version by default:

```shell
curl -s https://raw.githubusercontent.com/MirrgieRiana/xarpite/release/install-jvm.sh | sudo bash
```

or

Using the Node.js version by default:

```shell
curl -s https://raw.githubusercontent.com/MirrgieRiana/xarpite/release/install-node.sh | sudo bash
```

## Download into the current directory

Download the Xarpite release into `./xarpite`.

```shell
git clone --single-branch --branch release --depth 1 https://github.com/MirrgieRiana/xarpite.git ./xarpite
```

This is useful if you want to place Xarpite in the current directory without installing commands into `/usr/local/bin`.

# DOCUMENTATION

- [Japanese](https://mirrgieriana.github.io/xarpite/docs/ja/)

---

*The Xarpite logo and icon use the font [Monaspace Krypton](https://monaspace.githubnext.com/).*
