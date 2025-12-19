#!/usr/bin/env bash
set -euo pipefail

# Configuration
readonly VERSION_TAG_PATTERN='v[0-9]*.[0-9]*.[0-9]*'
readonly VERSION_TAG_REGEX='^v[0-9]+\.[0-9]+\.[0-9]+$'
readonly FETCH_DEPTH=100
readonly MAX_FETCH_ATTEMPTS=10

# Check if git command is available
if ! command -v git >/dev/null 2>&1; then
  echo "0.0.0+0.g0000000.dirty"
  exit 0
fi

# Check if we're in a git repository
if ! git rev-parse --git-dir >/dev/null 2>&1; then
  echo "0.0.0+0.g0000000.dirty"
  exit 0
fi

# Check if HEAD exists (initial commit has been made)
if ! git rev-parse HEAD >/dev/null 2>&1; then
  echo "0.0.0+0.g0000000.dirty"
  exit 0
fi

# Function to check if working directory is clean
is_clean() {
  [ -z "$(git status --porcelain 2>/dev/null)" ]
}

# Function to get the short commit hash (7 characters)
get_short_hash() {
  git rev-parse --short=7 HEAD
}

# Function to find the most recent version tag (v1.2.3 format)
# Handles both annotated and lightweight tags
find_version_tag() {
  git tag --list "$VERSION_TAG_PATTERN" --merged HEAD --sort=-version:refname | { grep -E "$VERSION_TAG_REGEX" || true; } | head -n 1
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

# Function to fetch more commits if in shallow clone (with loop)
# Returns 0 if tag found, 1 if not shallow, 2 if max attempts reached without finding tag
fetch_if_shallow_loop() {
  if [ "$(git rev-parse --is-shallow-repository)" != "true" ]; then
    return 1
  fi
  
  local attempt=0
  
  while [ $attempt -lt "$MAX_FETCH_ATTEMPTS" ]; do
    attempt=$((attempt + 1))
    
    # Fetch more commits and tags (redirect all output to stderr)
    if ! git fetch --deepen="$FETCH_DEPTH" --tags >/dev/null 2>&1; then
      echo "Error: git fetch failed" >&2
      exit 1
    fi
    
    # Check if we found a tag
    local tag
    tag=$(find_version_tag)
    if [ -n "$tag" ]; then
      return 0
    fi
    
    # Check if still shallow
    if [ "$(git rev-parse --is-shallow-repository)" != "true" ]; then
      # No longer shallow, stop trying
      return 1
    fi
  done
  
  # Max attempts reached without finding tag
  return 2
}

# Check if working directory is clean
if is_clean; then
  CLEAN=true
else
  CLEAN=false
fi

# Check if HEAD has a version tag directly
HEAD_TAG=$(git tag --points-at HEAD --list "$VERSION_TAG_PATTERN" | { grep -E "$VERSION_TAG_REGEX" || true; } | head -n 1)

# If clean and HEAD has valid version tag, output X.Y.Z without suffix
if [ "$CLEAN" = true ] && [ -n "$HEAD_TAG" ]; then
  VERSION="${HEAD_TAG#v}"
  echo "$VERSION"
  exit 0
fi

# Otherwise, always use suffix format
# Find the most recent version tag in ancestors
VERSION_TAG=$(find_version_tag)

# If no tag found and repository is shallow, try to fetch more
if [ -z "$VERSION_TAG" ]; then
  fetch_if_shallow_loop || fetch_result=$?
  # fetch_result: 0=tag found, 1=not shallow, 2=max attempts reached
  
  if [ "${fetch_result:-0}" -eq 2 ]; then
    # Max attempts reached without finding tag - error exit
    echo "Error: No version tag found after $MAX_FETCH_ATTEMPTS fetch attempts" >&2
    exit 1
  fi
  
  # Try again after fetching (if fetch was performed and tag found)
  if [ "${fetch_result:-0}" -eq 0 ]; then
    VERSION_TAG=$(find_version_tag)
  fi
fi

SHORT_HASH=$(get_short_hash)

if [ -n "$VERSION_TAG" ]; then
  # Found a version tag in ancestors
  BASE_VERSION="${VERSION_TAG#v}"
  COMMIT_COUNT=$(count_commits_since "$VERSION_TAG")
  VERSION="${BASE_VERSION}+${COMMIT_COUNT}.g${SHORT_HASH}"
else
  # No version tag found, use 0.0.0 with total commit count
  TOTAL_COMMITS=$(count_total_commits)
  VERSION="0.0.0+${TOTAL_COMMITS}.g${SHORT_HASH}"
fi

# Add .dirty suffix if working directory is not clean
if [ "$CLEAN" = false ]; then
  VERSION="${VERSION}.dirty"
fi

echo "$VERSION"
exit 0
