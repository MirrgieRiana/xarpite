#!/usr/bin/env bash

# インストールディレクトリの判定
if [ "${BASH_SOURCE[0]}" = "" ]
then
  # パイプで渡された
  SCRIPT_DIR=$(pwd)/xarpite
else
  # ファイルを実行した
  SCRIPT_DIR=$(cd "$(dirname "$(readlink -f "${BASH_SOURCE[0]}")")" && pwd)
fi

# インストールディレクトリの準備
echo "Preparing install directory: $SCRIPT_DIR"
mkdir -p "$SCRIPT_DIR" || exit

# リポジトリを最新の状態に更新
if [ -d "$SCRIPT_DIR"/.git ]
then
  echo "Updating repository"
  git -C "$SCRIPT_DIR" fetch origin release || exit
  git -C "$SCRIPT_DIR" reset --hard origin/release || exit
else
  echo "Cloning repository"
  git clone --single-branch --branch release --depth 1 https://github.com/MirrgieRiana/xarpite.git "$SCRIPT_DIR" || exit
fi

echo "@ENGINE@" > "$SCRIPT_DIR/default_engine" || exit

# /usr/local/bin にインストール
echo "Updating /usr/local/bin/xa"
destination=/usr/local/bin/xa
rm -f "$destination" || exit
ln -s "$SCRIPT_DIR"/xa "$destination" || exit
chmod +x "$SCRIPT_DIR"/xa || exit
echo "Updating /usr/local/bin/xa-update"
destination=/usr/local/bin/xa-update
rm -f "$destination" || exit
ln -s "$SCRIPT_DIR"/@SCRIPT_NAME@ "$destination" || exit

echo "OK"
