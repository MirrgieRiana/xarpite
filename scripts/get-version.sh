#!/usr/bin/env bash
set -euo pipefail

# Work in the current git repository root
# If not in a git repository, this will fail appropriately
if ! git rev-parse --git-dir >/dev/null 2>&1; then
  echo "Error: Not in a git repository" >&2
  exit 1
fi

# Function to get the short commit hash (7 characters)
get_short_hash() {
  git rev-parse --short=7 HEAD
}

# Function to find the most recent version tag (v1.2.3 format)
find_version_tag() {
  git tag --list 'v[0-9]*.[0-9]*.[0-9]*' --merged HEAD --sort=-version:refname | { grep -E '^v[0-9]+\.[0-9]+\.[0-9]+$' || true; } | head -n 1
}

# Function to count commits from a tag to HEAD
count_commits_since() {
  local tag="$1"
  git rev-list --count "${tag}..HEAD"
}

# Function to count total commits up to HEAD
count_total_commits() {
  git rev-list --count HEAD
}

# Function to fetch more commits if in shallow clone
fetch_if_shallow() {
  if [ "$(git rev-parse --is-shallow-repository)" = "true" ]; then
    git fetch --deepen=100 2>/dev/null || true
    return 0
  fi
  return 1
}

# Check if HEAD has a version tag directly
HEAD_TAG=$(git tag --points-at HEAD --list 'v[0-9]*.[0-9]*.[0-9]*' | { grep -E '^v[0-9]+\.[0-9]+\.[0-9]+$' || true; } | head -n 1)

if [ -n "$HEAD_TAG" ]; then
  # HEAD has a version tag, output without 'v' prefix
  VERSION="${HEAD_TAG#v}"
  echo "$VERSION"
  exit 0
fi

# Find the most recent version tag in ancestors
VERSION_TAG=$(find_version_tag)

# If no tag found and repository is shallow, try to fetch more
if [ -z "$VERSION_TAG" ]; then
  if fetch_if_shallow; then
    # Try again after fetching
    VERSION_TAG=$(find_version_tag)
  fi
fi

if [ -n "$VERSION_TAG" ]; then
  # Found a version tag in ancestors
  BASE_VERSION="${VERSION_TAG#v}"
  COMMIT_COUNT=$(count_commits_since "$VERSION_TAG")
  SHORT_HASH=$(get_short_hash)
  VERSION="${BASE_VERSION}+${COMMIT_COUNT}.g${SHORT_HASH}"
  echo "$VERSION"
  exit 0
else
  # No version tag found, use 0.0.0 with total commit count
  TOTAL_COMMITS=$(count_total_commits)
  SHORT_HASH=$(get_short_hash)
  VERSION="0.0.0+${TOTAL_COMMITS}.g${SHORT_HASH}"
  echo "$VERSION"
  exit 0
fi
