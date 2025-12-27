#!/usr/bin/env bash

# このスクリプトの実行場所の判定
if [ "${BASH_SOURCE[0]}" = "" ]
then
  # パイプでbashに渡されて実行された
  SCRIPT_DIR=$(pwd)/xarpite
else
  # ファイルに保存された状態で実行された
  SCRIPT_DIR=$(cd "$(dirname "$(readlink -f "${BASH_SOURCE[0]}")")" && pwd)
fi

# インストール先ディレクトリの生成
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

echo "native" > "$SCRIPT_DIR/default_engine" || exit

# /usr/local/bin/xarpite にインストール
destination=/usr/local/bin/xarpite
echo "Updating $destination"
rm -f "$destination" || exit
ln -s "$SCRIPT_DIR"/xarpite "$destination" || exit

# /usr/local/bin/xa にインストール
destination=/usr/local/bin/xa
echo "Updating $destination"
rm -f "$destination" || exit
ln -s "$SCRIPT_DIR"/xa "$destination" || exit

# /usr/local/bin/xarpite-update にインストール
destination=/usr/local/bin/xarpite-update
echo "Updating $destination"
rm -f "$destination" || exit
ln -s "$SCRIPT_DIR"/install-native.sh "$destination" || exit

echo "OK"
