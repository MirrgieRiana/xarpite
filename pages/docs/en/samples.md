---
title: "FizzBuzz"
---

<!-- toc -->

# FizzBuzz

Output numbers according to the following conditions:

- If the number is divisible by 3, output `Fizz`.
- If the number is divisible by 5, output `Buzz`.
- If the number is divisible by both 3 and 5, output `FizzBuzz`.
- Otherwise, output the number.

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

`1~17` is a stream that sequentially generates integers from 1 (inclusive) to 17 (exclusive).

`|` is an operator that evaluates the right side for each element of the stream on the left side.

`&` is an operator that stringifies a value when placed before it.

`_` is a variable that can get the current element when used on the right side of the `|` operator.

`%` is an operator that returns the remainder of dividing the left value by the right.

Writing `a:b?c` returns `b` if `a` is true, and `c` if false.

`E` is a constant representing an empty stream.

`,` is an operator that returns a stream concatenating streams or values.

`||` is an operator that returns the left value if the left side is true, and the right value if false. An empty string is treated as false.

---

`_%3?E:"Fizz"` gets an empty stream if the value is divisible by 3, and the string `Fizz` otherwise.

Similarly, `_%5?E:"Buzz"` gets an empty stream if the value is divisible by 5, and the string `Buzz` otherwise.

Here, `_%3?E:"Fizz",_%5?E:"Buzz"` takes the following values depending on the value of `_`:

- If divisible by 3: `Fizz`
- If divisible by 5: `Buzz`
- If divisible by both 3 and 5: `Fizz` , `Buzz`
- Otherwise: empty stream

This is concatenated as a string (empty string if empty stream) with the `&` operator.

If the result is an empty string, the original value is returned.

This is repeated sequentially from 1.

# Fibonacci Sequence

```shell
$ xa '
  fib := n -> n < 2 ? n : fib(n - 1) + fib(n - 2)
  fib(10)
'
# 55
```

# Quicksort

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

# Merge Sort

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

# Edit Distance

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
    ]() | OUT << _() | "$%2s(_)" >> JOIN[""]

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

# Prime Number Check

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

# Game of Life

Run the Game of Life on a 40x40 grid with a 0.2 second wait time.

Launch with the JVM version for performance.

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
' 40 40 0.2
```

# [Display Table in HTML](https://mirrgieriana.github.io/xarpite/playground/?s=eJxdkctOwzAURPf9ilFQJEAkacUK57FAIFGJxwap6yQ2iYWpI8dpEwH%2FjlM3NelufOdo7uh6s359eNuEVJbdF9tqQiqmHwUb9f2wppee7HTTae8qNIKpp%2FeXZ6TwswWQUL4Dp%2BmEoNWDYKlXSEWZCkopRN60jGBSMWrGq1oTrJZLP4bcMfUh5D4YCNpSGSr2xmATfYiyGriwC6DpjdM1vo82sOdU1wS3rI9Ps2nVbGirmf1Nj1YKTlGIvPx0gGa9DnLBq62pbW7A1OT92mLRv2aJzgvXMvFTrBCGuMMPeqSZvdLR1Mo9ztjhjLU8zUaox7Xx%2FSyJzGAWMEuPXLxzbL3o8FWR%2BatskfiLP%2BeugP4%3D&d=53.63)

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

# [Animation on Canvas](https://mirrgieriana.github.io/xarpite/playground/?s=eJx1UG1rwjAQ%2Ft5fcWSI7cDaioLUth%2B2CRP2xhT8OGpzalhsJUl9gf34JU3rhG0hhCd39zx3zx0ZVVuIEhgEgbNFttmq9rc6fzBqPvrtpbCcvTy8Ln1a5tUOCxVFG1RTjgbfnWfUZdSzFJeUldpXini%2BBigeF89PkEAnjSk7aLGkzUPOMykTsipPJI37OpvGnV8arCiuNfKsOGSylrGQwNF4SEjcSSzUZQSsFxttfJmwVGeOpqWgKCII9yeQJdcOb8b1mRAzQ65OxngzStPHqy3fl4XCk3LJgBLPcQLwfQgDe%2BALGCQpuA7A%2FGk6fXMHgaexlosigRLVQmSFXJdi517iOcdMvGOu3GAC%2BurV18%2BlQBkOzxS6oUmFVylRKhNn0IdwHMAtDP9g9Wpa74fnrxnnc7MIvdLuilfYbVkmU88y0pSR7Xbd0pdKlJ94IQukDdfnrMBlvf4Ehq2eLf9H0XO%2BAT1rupg%3D&d=71.02)

```
width := 200
height := 200
by_id := id -> WINDOW.document::getElementById(id)
by_id("output").outerHTML = %><div id="output" class="box"></div><%
by_id("output").innerHTML = %><canvas id="canvas" width="<%= width %>" height="<%= height %>" style="border: 1px solid #888888;"><%
ctx := by_id("canvas")::getContext("2d")

  0 .. 10000000 | i => (
    SLEEP(0.02)
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
