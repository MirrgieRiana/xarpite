---
title: "Xarpite Documentation"
---

# Xarpite Documentation

Xarpite (xa) - An Interpreted Language for One-Liners

<!-- toc -->

## Overview

Xarpite is an interpreted language designed for one-liners.

This documentation explains Xarpite's syntax, features, and usage with examples.

## Documentation Structure

Please refer to each topic from the menu.

## Installation

### Download into the current directory

Run the following command to download Xarpite into `./xarpite/` in the current directory.

```sh
curl -s https://mirrgieriana.github.io/xarpite/download.sh | bash
```

Verify the downloaded Xarpite with the following command:

```sh
$ ./xarpite/xarpite -e ' "Hello, World!" '
Hello, World!
```

### Install into your environment

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
