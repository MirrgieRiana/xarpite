#!/usr/bin/env bash
set -euo pipefail

APP_VERSION_VALUE="${APP_VERSION:-${GITHUB_SHA:-nightly}}"
export APP_VERSION="$APP_VERSION_VALUE"

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

./gradlew clean bundleRelease --stacktrace

(
  cd docs
  export JEKYLL_ENV=production
  bundle exec jekyll build
)

if [ ! -d "$ROOT_DIR/build/bundleRelease" ]; then
  echo "Error: build/bundleRelease not found. Ensure bundleRelease was built." >&2
  exit 1
fi
if [ ! -d "$ROOT_DIR/docs/_site" ]; then
  echo "Error: Jekyll build failed - docs/_site not found" >&2
  exit 1
fi

if [ -z "$(ls -A "$ROOT_DIR/docs/_site")" ]; then
  echo "Error: Jekyll build produced no output" >&2
  exit 1
fi

rsync -a "$ROOT_DIR/docs/_site/" "$ROOT_DIR/build/bundleRelease/"
