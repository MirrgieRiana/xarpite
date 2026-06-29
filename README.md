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

# INSTALLATION

## Download into the current directory

Run the following command to download Xarpite into `./xarpite/` in the current directory.

```sh
curl -s https://mirrgieriana.github.io/xarpite/download.sh | bash
```

Verify the downloaded Xarpite with the following command:

```sh
$ ./xarpite/xarpite -e ' "Hello, World!" '
Hello, World!
```

## Install into your environment

Run the following command to install Xarpite into any directory and create links to the executables in any directory.

```sh
curl -s https://mirrgieriana.github.io/xarpite/install.sh | bash -s <install_dir> <bin_dir>
```

---

The following command installs it for a single user.

```sh
curl -s https://mirrgieriana.github.io/xarpite/install.sh | bash -s ~/.local/share/xarpite ~/.local/bin
```

---

The following command installs it system-wide.

```sh
curl -s https://mirrgieriana.github.io/xarpite/install.sh | sudo bash -s /usr/local/lib/xarpite /usr/local/bin
```

## Download from Maven Central Repository

You can also download Xarpite binaries directly from Maven Central Repository.

[https://repo1.maven.org/maven2/io/github/mirrgieriana/xarpite-bin/](https://repo1.maven.org/maven2/io/github/mirrgieriana/xarpite-bin/)

# DOCUMENTATION

- [Japanese](https://mirrgieriana.github.io/xarpite/docs/ja/)

---

*The Xarpite logo and icon use the font [Monaspace Krypton](https://monaspace.githubnext.com/).*
