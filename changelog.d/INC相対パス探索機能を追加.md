# INC相対パス探索機能を追加

## USE関数のパス解決

### INC相対パスによる指定

`reference` が絶対パスでも `./` 始まりでもMaven座標形式でもない場合、 `INC` に登録されたディレクトリから相対パスとして検索するようになりました。

拡張子の `.xa1` は省略可能です。

各 `INC` ディレクトリに対して順番に `reference` を相対パスとして解決し、最初に見つかったファイルを読み込みます。

```shell
$ {
  mkdir -p modules

  echo ' "Banana" ' > modules/banana.xa1

  xa '
    INC::push("modules")
    USE("banana")
  '

  rm -r modules
}
# Banana
```

サブディレクトリを含むパスも使用可能です。

```shell
$ {
  mkdir -p lib/fruit

  echo ' "Cherry" ' > lib/fruit/cherry.xa1

  xa '
    INC::push("lib")
    USE("fruit/cherry")
  '

  rm -r lib
}
# Cherry
```
