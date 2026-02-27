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


# PWD tests
# Test that PWD returns a non-empty absolute path
actual=$(xa 'PWD')
[ -n "$actual" ] || fail "non-empty PWD" "$actual"
[[ "$actual" = /* ]] || fail "absolute path starting with /" "$actual"

# Test that PWD matches the current directory (when XARPITE_PWD is set by wrapper)
current_dir=$(pwd)
actual=$(xa 'PWD')
[ "$actual" = "$current_dir" ] || fail "$current_dir" "$actual"

# Test PWD with different engines
# Native engine
actual=$(XARPITE_ENGINE=native xa 'PWD')
[ "$actual" = "$current_dir" ] || fail "$current_dir (native)" "$actual"

# JVM engine
actual=$(XARPITE_ENGINE=jvm xa 'PWD')
[ "$actual" = "$current_dir" ] || fail "$current_dir (jvm)" "$actual"

# Node.js engine
actual=$(XARPITE_ENGINE=node xa 'PWD')
[ "$actual" = "$current_dir" ] || fail "$current_dir (node)" "$actual"


# EXIT tests
# Test that EXIT(0) exits with code 0
xa 'EXIT(0)'
exit_code=$?
[ "$exit_code" = "0" ] || fail "EXIT(0) should exit with code 0" "exit code: $exit_code"

# Test that EXIT(1) exits with code 1
xa 'EXIT(1)'
exit_code=$?
[ "$exit_code" = "1" ] || fail "EXIT(1) should exit with code 1" "exit code: $exit_code"

# Test that EXIT(42) exits with code 42
xa 'EXIT(42)'
exit_code=$?
[ "$exit_code" = "42" ] || fail "EXIT(42) should exit with code 42" "exit code: $exit_code"

# Test that EXIT doesn't produce output
actual=$(xa 'EXIT(0)' 2>&1)
[ -z "$actual" ] || fail "EXIT(0) should not produce output" "$actual"

# Test EXIT with different engines
# Native engine
XARPITE_ENGINE=native xa 'EXIT(0)'
exit_code=$?
[ "$exit_code" = "0" ] || fail "EXIT(0) with native engine should exit with code 0" "exit code: $exit_code"

# JVM engine
XARPITE_ENGINE=jvm xa 'EXIT(0)'
exit_code=$?
[ "$exit_code" = "0" ] || fail "EXIT(0) with jvm engine should exit with code 0" "exit code: $exit_code"

# Node.js engine
XARPITE_ENGINE=node xa 'EXIT(0)'
exit_code=$?
[ "$exit_code" = "0" ] || fail "EXIT(0) with node engine should exit with code 0" "exit code: $exit_code"


echo "ALL TESTS PASSED"
