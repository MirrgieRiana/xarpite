#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."

task=":linkXarpiteDebugExecutableLinuxX64"
xarpite=./build/bin/linuxX64/xarpiteDebugExecutable/xarpite.kexe

# Native版EXECが1万分の0.5～10くらいの確率で子プロセスがfork時にフリーズする怪現象のためのテスト
# そのとき、子プロセスはゾンビでなくSになり、プロセス名は親と同じ。おそらくKotlin Nativeのforkの実装が壊れている
# 実際にはもうposix_spawnpを使っているので起きないはず

# ビルド
[ -f "$xarpite" ] || ./gradlew "$task"

# テスト
"$xarpite" -q -e '
  pipe := PIPE(
    1 .. 20000 | i, _ =>
      , -> OUT << EXEC("bash", "-c", "sleep 0.2; echo $i")
  )
  1 .. 64 | LAUNCH ( => pipe | _() )
'

# 正常な場合、無事プロセスは完了する
# 異常な場合、プロセスが何かを待ったままずっと完了しない
