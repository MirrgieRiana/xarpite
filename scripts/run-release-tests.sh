#!/usr/bin/env bash

script_name=$0

(($# != 1)) && {
  echo "Usage: $script_name <woking-directory>"
  exit 1
}

WORKING_DIR=$1
cd "$WORKING_DIR" || exit 1

export PATH="$(cd . && pwd):$PATH"

fail() {
  echo "FAILED: $script_name:${BASH_LINENO[0]}" >&2
  echo "[expected]" >&2
  echo "$1" >&2
  echo "[actual]" >&2
  echo "$2" >&2
  exit 1
}


# Basic test
expected=123
actual=$(xa '123')
[ "$actual" = "$expected" ] || fail "$expected" "$actual"

# Multi-line output
expected=$'1\n2\n3'
actual=$(xa '1 .. 3')
[ "$actual" = "$expected" ] || fail "$expected" "$actual"


# Version option
actual=$(xa -v)
[ -n "$actual" ] || fail "non-empty version" "$actual"

actual=$(xa --version)
[ -n "$actual" ] || fail "non-empty version" "$actual"


# Native engine
expected=123
actual=$(XARPITE_ENGINE=native xa '123')
[ "$actual" = "$expected" ] || fail "$expected" "$actual"

# JVM engine
expected=123
actual=$(XARPITE_ENGINE=jvm xa '123')
[ "$actual" = "$expected" ] || fail "$expected" "$actual"

# Node.js engine
expected=123
actual=$(XARPITE_ENGINE=node xa '123')
[ "$actual" = "$expected" ] || fail "$expected" "$actual"


echo "ALL TESTS PASSED"
