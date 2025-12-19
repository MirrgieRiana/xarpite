#!/usr/bin/env bash
set -euo pipefail

# 設定
readonly VERSION_TAG_PATTERN='v[0-9]*.[0-9]*.[0-9]*'
readonly VERSION_TAG_REGEX='^v[0-9]+\.[0-9]+\.[0-9]+$'
readonly FETCH_DEPTH=100
readonly MAX_FETCH_ATTEMPTS=10

# 終了用ヘルパー関数
exit_with_version() { echo "$1"; exit 0; }
exit_with_error() { echo "$1" >&2; exit 1; }

# gitコマンドが利用可能かチェック
command -v git >/dev/null 2>&1 || exit_with_version "0.0.0+0.g0000000.dirty"

# gitリポジトリ内かチェック
git rev-parse --git-dir >/dev/null 2>&1 || exit_with_version "0.0.0+0.g0000000.dirty"

# HEADが存在するかチェック（初期コミットが作成済みか）
git rev-parse HEAD >/dev/null 2>&1 || exit_with_version "0.0.0+0.g0000000.dirty"

# 作業ディレクトリがクリーンかチェックする関数
is_clean() { [ -z "$(git status --porcelain 2>/dev/null)" ]; }

# 短縮コミットハッシュ（7文字）を取得する関数
get_short_hash() { git rev-parse --short=7 HEAD; }

# 最新のバージョンタグ（v1.2.3形式）を探す関数
# 注釈付きタグと軽量タグの両方に対応
find_version_tag() {
  git tag --list "$VERSION_TAG_PATTERN" --merged HEAD --sort=-version:refname | { grep -E "$VERSION_TAG_REGEX" || true; } | head -n 1
}

# タグからHEADまでのコミット数をカウントする関数
count_commits_since() { git rev-list --count "${1}..HEAD"; }

# HEADまでの総コミット数をカウントする関数
count_total_commits() { git rev-list --count HEAD; }

# 浅いクローンの場合にコミットを追加取得する関数（ループ付き）
# 戻り値: 0=タグ発見, 1=shallowでない, 2=最大試行回数到達
fetch_if_shallow_loop() {
  [ "$(git rev-parse --is-shallow-repository)" != "true" ] && return 1
  
  local attempt=0
  
  while [ $attempt -lt "$MAX_FETCH_ATTEMPTS" ]; do
    attempt=$((attempt + 1))
    
    # コミットとタグを追加取得（全出力をstderrにリダイレクト）
    git fetch --deepen="$FETCH_DEPTH" --tags >/dev/null 2>&1 || exit_with_error "Error: git fetch failed"
    
    # タグが見つかったかチェック
    [ -n "$(find_version_tag)" ] && return 0
    
    # まだshallowかチェック
    [ "$(git rev-parse --is-shallow-repository)" != "true" ] && return 1
  done
  
  # 最大試行回数に到達してもタグが見つからなかった
  return 2
}

# 作業ディレクトリがクリーンかチェック
is_clean && CLEAN=true || CLEAN=false

# HEADに直接バージョンタグが付いているかチェック
HEAD_TAG=$(git tag --points-at HEAD --list "$VERSION_TAG_PATTERN" | { grep -E "$VERSION_TAG_REGEX" || true; } | head -n 1)

# クリーンかつHEADに有効なバージョンタグがある場合、接尾辞なしでX.Y.Zを出力
[ "$CLEAN" = true ] && [ -n "$HEAD_TAG" ] && exit_with_version "${HEAD_TAG#v}"

# それ以外は常に接尾辞付き形式を使用
# 祖先から最新のバージョンタグを探す
VERSION_TAG=$(find_version_tag)

# タグが見つからず、リポジトリがshallowの場合は追加取得を試みる
if [ -z "$VERSION_TAG" ]; then
  fetch_if_shallow_loop || fetch_result=$?
  # fetch_result: 0=タグ発見, 1=shallowでない, 2=最大試行回数到達
  
  # 最大試行回数に到達してもタグが見つからなかった - エラー終了
  [ "${fetch_result:-0}" -eq 2 ] && exit_with_error "Error: No version tag found after $MAX_FETCH_ATTEMPTS fetch attempts"
  
  # 取得後に再試行（取得が実行されタグが見つかった場合）
  [ "${fetch_result:-0}" -eq 0 ] && VERSION_TAG=$(find_version_tag)
fi

# バージョン文字列を構築
if [ -n "$VERSION_TAG" ]; then
  # 祖先にバージョンタグが見つかった
  VERSION="${VERSION_TAG#v}+$(count_commits_since "$VERSION_TAG").g$(get_short_hash)"
else
  # バージョンタグが見つからなかった、総コミット数で0.0.0を使用
  VERSION="0.0.0+$(count_total_commits).g$(get_short_hash)"
fi

# 作業ディレクトリがクリーンでない場合は.dirtyを付加
[ "$CLEAN" = false ] && VERSION="${VERSION}.dirty"

exit_with_version "$VERSION"
