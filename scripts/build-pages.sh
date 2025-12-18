#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
OUTPUT_DIR="${1:-$ROOT_DIR/build/bundleRelease}"

(
  cd "$ROOT_DIR/docs"
  export JEKYLL_ENV=production
  bundle exec jekyll build
)

if [ ! -d "$OUTPUT_DIR" ]; then
  echo "Error: $OUTPUT_DIR not found. Ensure bundleRelease was built." >&2
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

rsync -a "$ROOT_DIR/docs/_site/" "$OUTPUT_DIR/"
