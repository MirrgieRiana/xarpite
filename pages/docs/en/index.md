---
title: "Xarpite Documentation"
---

# Xarpite Documentation

Xarpite (xa) - An interpreted language for one-liners

<!-- toc -->

## Overview

Xarpite is an interpreted language designed for one-liners.

This documentation explains Xarpite's syntax, features, and usage with examples.

## Installation

### Download into the current directory

Download the Xarpite release into `./xarpite`.

Using the download script:

```shell
curl -s https://mirrgieriana.github.io/xarpite/download.sh | bash
```

or

Using git clone:

```shell
git clone --single-branch --branch release --depth 1 https://github.com/MirrgieRiana/xarpite.git ./xarpite
```

This is useful if you want to place Xarpite in the current directory without installing commands into `/usr/local/bin`.

You can verify the installation by running:

```shell
./xarpite/xarpite -e '1 .. 9 | [1 .. _]'
```

## Documentation Structure

Please refer to each topic from the menu.
