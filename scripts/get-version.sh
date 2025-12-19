#!/usr/bin/env bash
set -euo pipefail

# Configuration
readonly VERSION_TAG_PATTERN='v[0-9]*.[0-9]*.[0-9]*'
readonly VERSION_TAG_REGEX='^v[0-9]+\.[0-9]+\.[0-9]+$'
readonly FETCH_DEPTH=100
readonly MAX_FETCH_ATTEMPTS=10

# Helper functions for exit
exit_with_version() { echo "$1"; exit 0; }
exit_with_error() { echo "$1" >&2; exit 1; }

# Check if git command is available
command -v git >/dev/null 2>&1 || exit_with_version "0.0.0+0.g0000000.dirty"

# Check if we're in a git repository
git rev-parse --git-dir >/dev/null 2>&1 || exit_with_version "0.0.0+0.g0000000.dirty"

# Check if HEAD exists (initial commit has been made)
git rev-parse HEAD >/dev/null 2>&1 || exit_with_version "0.0.0+0.g0000000.dirty"

# Function to check if working directory is clean
is_clean() { [ -z "$(git status --porcelain 2>/dev/null)" ]; }

# Function to get the short commit hash (7 characters)
get_short_hash() { git rev-parse --short=7 HEAD; }

# Function to find the most recent version tag (v1.2.3 format)
# Handles both annotated and lightweight tags
find_version_tag() {
  git tag --list "$VERSION_TAG_PATTERN" --merged HEAD --sort=-version:refname | { grep -E "$VERSION_TAG_REGEX" || true; } | head -n 1
}

# Function to count commits from a tag to HEAD
count_commits_since() { git rev-list --count "${1}..HEAD"; }

# Function to count total commits up to HEAD
count_total_commits() { git rev-list --count HEAD; }

# Function to fetch more commits if in shallow clone (with loop)
# Returns 0 if tag found, 1 if not shallow, 2 if max attempts reached without finding tag
fetch_if_shallow_loop() {
  [ "$(git rev-parse --is-shallow-repository)" != "true" ] && return 1
  
  local attempt=0
  
  while [ $attempt -lt "$MAX_FETCH_ATTEMPTS" ]; do
    attempt=$((attempt + 1))
    
    # Fetch more commits and tags (redirect all output to stderr)
    git fetch --deepen="$FETCH_DEPTH" --tags >/dev/null 2>&1 || exit_with_error "Error: git fetch failed"
    
    # Check if we found a tag
    [ -n "$(find_version_tag)" ] && return 0
    
    # Check if still shallow
    [ "$(git rev-parse --is-shallow-repository)" != "true" ] && return 1
  done
  
  # Max attempts reached without finding tag
  return 2
}

# Check if working directory is clean
is_clean && CLEAN=true || CLEAN=false

# Check if HEAD has a version tag directly
HEAD_TAG=$(git tag --points-at HEAD --list "$VERSION_TAG_PATTERN" | { grep -E "$VERSION_TAG_REGEX" || true; } | head -n 1)

# If clean and HEAD has valid version tag, output X.Y.Z without suffix
[ "$CLEAN" = true ] && [ -n "$HEAD_TAG" ] && exit_with_version "${HEAD_TAG#v}"

# Otherwise, always use suffix format
# Find the most recent version tag in ancestors
VERSION_TAG=$(find_version_tag)

# If no tag found and repository is shallow, try to fetch more
if [ -z "$VERSION_TAG" ]; then
  fetch_if_shallow_loop || fetch_result=$?
  # fetch_result: 0=tag found, 1=not shallow, 2=max attempts reached
  
  # Max attempts reached without finding tag - error exit
  [ "${fetch_result:-0}" -eq 2 ] && exit_with_error "Error: No version tag found after $MAX_FETCH_ATTEMPTS fetch attempts"
  
  # Try again after fetching (if fetch was performed and tag found)
  [ "${fetch_result:-0}" -eq 0 ] && VERSION_TAG=$(find_version_tag)
fi

# Build version string
if [ -n "$VERSION_TAG" ]; then
  # Found a version tag in ancestors
  VERSION="${VERSION_TAG#v}+$(count_commits_since "$VERSION_TAG").g$(get_short_hash)"
else
  # No version tag found, use 0.0.0 with total commit count
  VERSION="0.0.0+$(count_total_commits).g$(get_short_hash)"
fi

# Add .dirty suffix if working directory is not clean
[ "$CLEAN" = false ] && VERSION="${VERSION}.dirty"

exit_with_version "$VERSION"
