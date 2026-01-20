#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
OUTPUT_DIR="${1:-$ROOT_DIR/build/bundlePages}"

(
  cd "$ROOT_DIR/pages"
  export JEKYLL_ENV=production
  bundle exec jekyll build
)

if [ ! -d "$OUTPUT_DIR" ]; then
  echo "Error: $OUTPUT_DIR not found. Ensure bundlePages was built." >&2
  exit 1
fi
if [ ! -d "$ROOT_DIR/pages/_site" ]; then
  echo "Error: Jekyll build failed - pages/_site not found" >&2
  exit 1
fi

if [ -z "$(ls -A "$ROOT_DIR/pages/_site")" ]; then
  echo "Error: Jekyll build produced no output" >&2
  exit 1
fi

# Copy Jekyll output to the root of OUTPUT_DIR (not a subdirectory)
# This allows pages/index.md to become the site root at https://mirrgieriana.github.io/xarpite/
# and pages/docs/ja/ to be at https://mirrgieriana.github.io/xarpite/docs/ja/
rsync -a "$ROOT_DIR/pages/_site/" "$OUTPUT_DIR/"
