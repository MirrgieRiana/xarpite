# FizzBuzz

以下の条件に従って数値を出力します。

- その数が3で割り切れる場合、 `Fizz` を出力。
- その数が5で割り切れる場合、 `Buzz` を出力。
- その数が3でも5でも割り切れる場合、 `FizzBuzz` を出力。
- それ以外の場合、その数を出力。

```shell
$ xa '1~17|&(_%3?E:"Fizz",_%5?E:"Buzz")||_'
# 1
# 2
# Fizz
# 4
# Buzz
# Fizz
# 7
# 8
# Fizz
# Buzz
# 11
# Fizz
# 13
# 14
# FizzBuzz
# 16
```

---

`1~17` は1以上17未満の整数を順番に生成するストリームです。

`|` は左辺のストリームの各要素について、右辺を評価する演算子です。

`&` は値の前に付けるとその値を文字列化する演算子です。

`_` は `|` 演算子の右辺で使用すると現在の要素を取得できる変数です。

`%` は左辺の値を右辺で割った余りを返す演算子です。

`a:b?c` と書くと、 `a` が真の場合に `b` を、偽の場合に `c` を返します。

`E` は空のストリームを表す定数です。

`,` はストリームや値を連結したストリームを返す演算子です。

`||` は左辺が真の場合に左辺の値を、偽の場合に右辺の値を返す演算子です。空文字列は偽として扱われます。

---

`_%3?E:"Fizz"` は、値が3で割り切れた場合に空ストリームを、そうでない場合に文字列 `Fizz` を得ます。

同様に、 `_%5?E:"Buzz"` は、値が5で割り切れた場合に空ストリームを、そうでない場合に文字列 `Buzz` を得ます。

ここで、 `_%3?E:"Fizz",_%5?E:"Buzz"` は `_` の値によって以下の値を取ります。

- 3で割り切れる場合: `Fizz`
- 5で割り切れる場合: `Buzz`
- 3でも5でも割り切れる場合: `Fizz` , `Buzz`
- それ以外の場合: 空ストリーム

それを `&` 演算子で文字列として連結（空ストリームの場合は空文字列）します。

その結果が空文字列だった場合、元の値を返します。

これを1から順番に繰り返し行います。

# フィボナッチ数列

```shell
$ xa '
  fib := n -> n < 2 ? n : fib(n - 1) + fib(n - 2)
  fib(10)
'
# 55
```

# クイックソート

```shell
$ xa '
  quicksort := list -> $#list < 2 ? list : (
    pivot  := list.0
    high   := [list() >> FILTER [ _ => _ >  pivot ]]
    middle := [list() >> FILTER [ _ => _ == pivot ]]
    low    := [list() >> FILTER [ _ => _ <  pivot ]]
    quicksort(low) + middle + quicksort(high)
  )
  quicksort([3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5])
'
# [1;1;2;3;3;4;5;5;5;6;9]
```

# マージソート

```shell
$ xa '
  m := a, b -> (
    ai := 0
    bi := 0
    [0 ~ $#a + $#b | (
      ai != $#a && (bi == $#b || a(ai) < b(bi)) ? (
        v := a(ai)
        ai = ai + 1
        v
      ) : (
        v := b(bi)
        bi = bi + 1
        v
      )
    )]
  )

  ms := l -> $#l < 2 ? l : (
    c := FLOOR($#l / 2)
    m(
      ms(l[0 ~ c])
      ms(l[c ~ $#l])
    )
  )

  ms([3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5])
'
# [1;1;2;3;3;4;5;5;5;6;9]
```

# 編集距離

```shell
$ xa '
  edit_distance := a, b -> (
    dp := [0 .. $#a + 1 | [0 .. $#b + 1 | 0]]
    0 .. $#a | i => 0 .. $#b | j => (
      dp(i + 1)(j + 1) = a(i) == b(j)
        ? dp(i)(j)
        : 1 + MIN(
          dp(i    )(j    ),
          dp(i + 1)(j    ),
          dp(i    )(j + 1),
        )
    )

    # Output Table
    [
      ["", "", b()]
      0 ~ $#dp | i => [a.(i - 1) ?: "", dp(i)()]
    ]() | OUT << _(__) | "$%2s(_)" >> JOIN[""]

    dp(-1)(-1)
  )
  edit_distance("kitten"; "sitting")
'
#      s i t t i n g
#    0 0 0 0 0 0 0 0 0
#  k 0 1 1 1 1 1 1 1 1
#  i 0 1 1 2 2 1 2 2 2
#  t 0 1 2 1 2 2 2 3 3
#  t 0 1 2 2 1 2 3 3 4
#  e 0 1 2 3 2 2 3 4 4
#  n 0 1 2 3 3 3 2 3 4
#    0 1 2 3 4 4 3 3 3
# 3
```

# 素数判定

```shell
$ xa -q '
  is_prime := n ->
      n < 2 ? FALSE
    : n == 2 ? TRUE
    : !(2 .. FLOOR(SQRT(n)) | n %% _)
  0 .. 4 | x => (
    OUT << 0 .. 9 | y => x * 10 + y | n => "$%4s(is_prime(n) ? n : "-")" >> JOIN[""]
  )
'
#    -   -   2   -   -   5   -   7   -   -
#    -  11   -  13   -   -   -  17   -  19
#    -   -   -  23   -   -   -   -   -  29
#    -  31   -   -   -   -   -  37   -   -
#    -  41   -  43   -   -   -  47   -   -
```

# ライフゲーム

横40マス、縦40マス、待機時間200ミリ秒でライフゲームを実行します。

パフォーマンスのためにjvm版で起動します。

```bash
$ XARPITE_ENGINE=jvm xa -q '
  LifeGame := {
    init     : this -> this.b = [0 ~ this.h | [0 ~ this.w | RAND(2)]]
    get      : this, x, y -> this.b(y % this.h)(x % this.w)
    neighbors: this, x, y -> -1 .. 1 | dx => -1 .. 1 | dy => dx == 0 && dy == 0 ? 0 : this::get(x + dx; y + dy) >> SUM
    get_next : this -> [0 ~ this.h | y => [0 ~ this.w | x => this::neighbors(x; y) | +(this::get(x; y) ? _ == 2 || _ == 3 : _ == 3)]]
    step     : this -> this.b = this::get_next()
    `&_`     : this -> this.b() | l => (l() | _ ? "[]" : "  " >> JOIN[""]) >> JOIN["\n"]
  }

  lifeGame := LifeGame{w: +ARGS.0; h: +ARGS.1}
  lifeGame::init()
  OUT << "$lifeGame\n$("--" * +ARGS.0)"
  1 .. 10000 | (
    lifeGame::step()
    OUT << "$lifeGame\n$("--" * +ARGS.0)"
    SLEEP(+ARGS.2)
  )
' 40 40 200
```

# [HTML上でテーブルを表示](https://mirrgieriana.github.io/xarpite/playground/?s=eJxdkctOwzAURPf9ilFQJEAkacUK57FAIFGJxwap6yQ2iYWpI8dpEwH%2FjlM3NelufOdo7uh6s359eNuEVJbdF9tqQiqmHwUb9f2wppee7HTTae8qNIKpp%2FeXZ6TwswWQUL4Dp%2BmEoNWDYKlXSEWZCkopRN60jGBSMWrGq1oTrJZLP4bcMfUh5D4YCNpSGSr2xmATfYiyGriwC6DpjdM1vo82sOdU1wS3rI9Ps2nVbGirmf1Nj1YKTlGIvPx0gGa9DnLBq62pbW7A1OT92mLRv2aJzgvXMvFTrBCGuMMPeqSZvdLR1Mo9ztjhjLU8zUaox7Xx%2FSyJzGAWMEuPXLxzbL3o8FWR%2BatskfiLP%2BeugP4%3D&d=53.63)

```
WINDOW.document::getElementById("output").outerHTML = %>
  <div id="output" style="border-collapse: collapse; height: 100%; overflow-y: scroll;">
    <style>
      #output td, #output th {
        width: 3ex;
        height: 3ex;
        border: 1px solid black;
        text-align: center;
      }
    </style>
    <table>
      <%= 1 .. 9 | x => %>
        <tr>
          <%= 1 .. 9 | y => %>
            <td><%= x * y %></td>
          <% %>
        </tr>
      <% %>
    <table/>
  </div>
<%
```

# [Canvas上でアニメーション](https://mirrgieriana.github.io/xarpite/playground/?s=eJx1UG1rwjAQ%2Ft5fcWSI7cDaioLUth%2B2CRP2xhT8OGpzalhsJUl9gf34JU3rhG0hhCd39zx3zx0ZVVuIEhgEgbNFttmq9rc6fzBqPvrtpbCcvTy8Ln1a5tUOCxVFG1RTjgbfnWfUZdSzFJeUldpXini%2BBigeF89PkEAnjSk7aLGkzUPOMykTsipPJI37OpvGnV8arCiuNfKsOGSylrGQwNF4SEjcSSzUZQSsFxttfJmwVGeOpqWgKCII9yeQJdcOb8b1mRAzQ65OxngzStPHqy3fl4XCk3LJgBLPcQLwfQgDe%2BALGCQpuA7A%2FGk6fXMHgaexlosigRLVQmSFXJdi517iOcdMvGOu3GAC%2BurV18%2BlQBkOzxS6oUmFVylRKhNn0IdwHMAtDP9g9Wpa74fnrxnnc7MIvdLuilfYbVkmU88y0pSR7Xbd0pdKlJ94IQukDdfnrMBlvf4Ehq2eLf9H0XO%2BAT1rupg%3D&d=71.02)

```
width := 200
height := 200
by_id := id -> WINDOW.document::getElementById(id)
by_id("output").outerHTML = %><div id="output" class="box"></div><%
by_id("output").innerHTML = %><canvas id="canvas" width="<%= width %>" height="<%= height %>" style="border: 1px solid #888888;"><%
ctx := by_id("canvas")::getContext("2d")

0 .. 10000000 | i => (
  SLEEP(20)
  ctx::resetTransform()
  ctx::clearRect(0; 0; 200; 200)
  ctx::translate(100; 100)
  ctx::rotate(i / 180 * 4)
  ctx::translate(-100; -100)
  ctx.fillStyle = 'blue'
  ctx::fillRect(50; 50; 100; 100)
  ctx.strokeStyle = 'red'
  ctx.lineWidth = 4
  ctx::strokeRect(50; 50; 100; 100)
)
```
