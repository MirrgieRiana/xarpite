---
title: "Functions"
---

<!-- toc -->

# Functions

In Xarpite, functions are treated as values that can be assigned to variables, just like numbers and strings.

Specifically, you create function objects using lambda operators like `arguments -> formula`, assign them to variables as needed, and execute them using function call operators like `function(argument; ...)`.

```shell
$ xa '
  plus := x, y -> x + y
  plus(3; 4)
'
# 7
```

# Lambda Expressions

The lambda operator `arguments -> formula` creates function objects.

On the left side of `->`, you write the parameter names, and on the right side, you write the expression that will be returned when the function is called.

```shell
$ xa '
  f := x -> x + 23
  f(100)
'
# 123
```

## Lambda Expressions Taking Multiple Arguments

By separating argument names with commas `,`, you can create function objects that take multiple arguments.

```shell
$ xa '
  f := x, y -> x + y
  f(100; 23)
'
# 123
```

## Lambda Expressions Taking No Arguments

If there are no arguments, write it as `() -> formula`.

```shell
$ xa '
  f := () -> 123
  f()
'
# 123
```

## More Detailed Specifications of Lambda Operator Argument Part

### Basic Form of Argument Part

The basic form of the argument part of the lambda operator is to separate argument names with `;` as in `(argument; ...) -> formula` and enclose them in `(` `)`.

```shell
$ xa '
  f := (x; y) -> x + y
  f(100; 23)
'
# 123
```

### Omitting Separator on Newlines

When the argument part is on a new line, following the rule that `;` can be substituted with a newline, the separator can be omitted.

```shell
$ xa '
  f := (
    x
    y
  ) -> x + y
  f(100; 23)
'
# 123
```

### Replacing Separator

The separator in the argument part can be freely replaced with `,`.

```shell
$ xa '
  f := (x, y) -> x + y
  f(100; 23)
'
# 123
```

### Omitting Parentheses

If the argument part is not separated by `;`, `(` `)` can be omitted.

```shell
$ xa '
  f := x, y -> x + y
  f(100; 23)
'
# 123
```

### Omitting Argument Names

Argument names separated by separators can be omitted.

In that case, extra separators are simply ignored.

```shell
$ xa '
  f := (x; ; y) -> x + y
  f(100; 23)
'
# 123

$ xa '
  f := , -> 123
  f()
'
# 123
```

## Argument List

The variable `__` receives all given arguments as an array.

This allows receiving variable-length arguments in ways other than using streams.

```shell
$ xa '
  f := () -> "$__"
  f(100; 20; 3)
'
# [100;20;3]
```

### Argument List Containing Streams

In the argument list, you can receive streams specified as arguments as-is without expanding them.

```shell
$ xa '
  f := () -> __.1
  f(NULL; 1 .. 3; NULL)
'
# 1
# 2
# 3
```

# Function Operator

The prefix `\` operator is an operator that creates a function equal to the lambda expression `_ -> body`.

A postfix version `body.\\` also exists.

```shell
$ xa '(_ -> 10)(200)'
# 10

$ xa '(\10)(200)'
# 10

$ xa '(\(10 + _))(200)'
# 210

$ xa '(10 + _).\(200)'
# 210
```

---

The function operator is useful when combined with functions that receive functions like `FILTER` or `SORT`.

```shell
$ xa '
  {name: "Bob"; age: 30},
  {name: "Alice"; age: 25},
  >> SORT[by: \_.name]
'
# {name:Alice;age:25}
# {name:Bob;age:30}
```

## Function Application Operator `*body`

The prefix `*` operator is an operator that calls a function with the variable `_` as the only argument.

```shell
$ xa '10 | *(x -> 10)'
# 10

$ xa '10 | *(x -> x)'
# 10

$ xa '10 | *(x -> x + 5)'
# 15
```

---

The function application operator is useful when combined with pipes.

```shell
$ xa '-2 .. 2 | *ABS'
# 2
# 1
# 0
# 1
# 2
```

# Function Calls

The function call operator `function(argument; ...)` is an operator that executes values like function objects as functions.

Arguments are separated by `;`.

```shell
$ xa 'JOIN("-"; 1, 2, 3)'
# 1-2-3
```

---

Note that in function calls, the comma `,` is not an argument separator but a stream concatenation operator.

## Calling with Different Number of Arguments

In Xarpite, you can make function calls with a different number of arguments than those defined in lambda expressions.

If there are not enough arguments, NULL is passed, and if there are too many, they are simply ignored.

```shell
$ xa '(x, y -> "$x, $y")(1)'
# 1, NULL

$ xa '(x, y -> "$x, $y")(1; 2; 3)'
# 1, 2
```

## Partial Application of Functions

Partial application of functions `function[argument; ...]` generates a "function with partial reservation of argument application" without executing the function.

The original function receives the argument list at the time of partial application followed by the argument list at the time of calling the partially applied function.

---

It's complicated in words, but it's easier to see the following example.

```shell
$ xa 'JOIN("-"; 1, 2, 3)'
# 1-2-3

$ xa 'JOIN["-"](1, 2, 3)'
# 1-2-3

$ xa 'JOIN["-"; 1, 2, 3]()'
# 1-2-3

$ xa 'JOIN["-"][1, 2, 3]()'
# 1-2-3
```

---

Partial application of functions is useful for handling functions that manipulate streams because you can create things like "functions with only the first argument already specified."

```shell
$ xa '1, 2, 3 >> JOIN["-"]'
# 1-2-3
```

## Infix Function Call

By writing a variable representing a function between left and right values, you can call that function with 2 arguments.

```shell
$ xa '
  add := a, b -> a + b

  100 add 23
'
# 123
```

### Negative Infix Function Call

By writing `!` before the function name as in `a !function b`, you can negate the result.
This notation has the same meaning as `!(a function b)`.

```shell
$ xa -q '
  in := item, array -> item @ array

  OUT << "banana"  in ["apple", "banana"] // TRUE
  OUT << "cherry"  in ["apple", "banana"] // FALSE
  OUT << "banana" !in ["apple", "banana"] // FALSE
  OUT << "cherry" !in ["apple", "banana"] // TRUE
'
# TRUE
# FALSE
# FALSE
# TRUE
```

## Assignment to Function Call

When you assign to a function call, the function receives the value to be assigned at the end of the argument list.

The return value of the function is not used.

```shell
$ xa -q '
  map := {}
  properties := key, value -> map.(key) = value

  properties("fruit") = "apple"

  OUT << map
'
# {fruit:apple}
```

---

This behavior can be customized by overriding the `_(__)=_` method.

```shell
$ xa -q '
  Properties := {
    `_(__)=_`: this, key, value -> this.map.(key) = value
    new: () -> Properties{map: {}}
  }

  properties := Properties.new()

  properties("fruit") = "apple"

  OUT << properties
'
# {map:{fruit:apple}}
```

---

Assignment to array elements or object elements is also technically implemented as assignment to function calls.

# Method Calls

The method call operator `receiver::method(argument; ...)` is an operator that calls functions registered in ancestor objects of `receiver` together with `receiver`.

Except that `receiver` is added to the beginning of the argument list, detailed specifications are shared with the function call operator.

```shell
$ xa '
  Adder := {
    add: this, y, z -> this.x + y + z
  }
  adder := Adder{x: 100}

  adder::add(20; 3)
'
# 123
```

## Partial Application of Method Calls

Like function calls, method calls can also be partially applied.

```shell
$ xa '
  Adder := {
    add: this, y, z -> this.x + y + z
  }
  adder := Adder{x: 100}

  adder::add[20](3)
'
# 123
```

## Method Reference

Method reference `receiver::method` creates a function that partially applies a value to a function registered in ancestor objects of that value.

```shell
$ xa '
  Adder := {
    add: this, y, z -> this.x + y + z
  }
  adder := Adder{x: 100}

  function := adder::add

  function(20; 3)
'
# 123
```

---

Conceptually, method calls are equivalent to a combination of method reference and function call.

| Operator         | Notation                          | Meaning                        |
|------------------|-----------------------------------|--------------------------------|
| Method call      | `receiver::method(argument; ...)` | Insert `receiver` and execute  |
| Method reference | `receiver::method`                | Insert `receiver`              |
| Function call    | `function(argument; ...)`         | Execute function               |

## Method Call to Function

By enclosing an expression that returns a function in `( )` instead of a method name, you can call that function like a method.

```shell
$ xa '
  add := a, b -> a + b

  100::(add)(23)
'
# 123
```

## NULL Safety

The `?::` operator does not execute the method if `receiver` is `NULL` and returns `NULL` instead.

| Operator                          | Notation                             |
|-----------------------------------|--------------------------------------|
| NULL-safe method call             | `receiver?::method(argument; ...)`   |
| NULL-safe method partial application | `receiver?::method[argument; ...]` |
| NULL-safe method reference        | `receiver?::method`                  |

```shell
$ xa '
  Object := {
    get_name: this -> this.name
  }

  object1 := Object{name: 1}
  object2 := NULL
  object3 := Object{name: 3}

  object1, object2, object3 | _?::get_name()
'
# 1
# NULL
# 3
```

## Fallback Method

When a reference to a method not defined in the receiver is made, the `_::_` method is called.

The fallback method receives the receiver and method name as arguments and returns "a function that returns a result when it receives arguments" or NULL.

If the fallback method returns NULL, it behaves the same as when the fallback method is not defined.

```shell
$ xa -q '
  Obj := {
    `_::_`: this, method -> () -> "$method$__ called"
  }
  obj := Obj{}

  OUT << obj::apple()
  OUT << obj::banana(1)
  OUT << obj::cherry(1; 2; 3)
'
# apple[] called
# banana[1] called
# cherry[1;2;3] called
```

## Method Call to Stream

A normal method call to a stream becomes a stream of the results of method calls for each element.

```shell
$ xa '("baa", "aba", "aab")::replace("b"; "c")'
# caa
# aca
# aac
```

This corresponds to the following call.

```shell
$ xa '("baa", "aba", "aab") | _::replace("b"; "c")'
# caa
# aca
# aac

$ xa '
  "baa"::replace("b"; "c"),
  "aba"::replace("b"; "c"),
  "aab"::replace("b"; "c"),
'
# caa
# aca
# aac
```

### Switching Method Implementation with Fallback Method

The fallback method can be used as a switch to switch method implementation as follows.

```shell
$ xa -q '
  Obj := {
    `_::_`: this, method ->
      method == "apple"  ? this::apple_impl :
      method == "banana" ? this::banana_impl :
      method == "cherry" ? this::cherry_impl :
                           NULL
    apple_impl : this          -> "apple[] called"
    banana_impl: this, x       -> "banana[$x] called"
    cherry_impl: this, x, y, z -> "cherry[$x;$y;$z] called"
  }
  obj := Obj{}

  OUT << obj::apple()
  OUT << obj::banana(1)
  OUT << obj::cherry(1; 2; 3)
  OUT << obj::durian(1; 2; 3; 4; 5; 6) !? (e => e)
'
# apple[] called
# banana[1] called
# cherry[1;2;3] called
# Method not found: {}::durian
```

# Function Call with Closure

Function call with closure `function ( arguments => block )` calls function `function` by passing the `block` part as a function.

Statements can also be written in the `block` part.

It may contribute to readability when used for event listener registration etc.

```shell
$ xa -q '
  register := listener -> (
    event := {x: 100; y: 200}
    listener(event)
  )

  register ( event =>
    string := "X: $(event.x), Y: $(event.y)"
    OUT << string
  )
'
# X: 100, Y: 200
```

## Variations

Function calls with closures can also be written as method calls or partial application of functions.

# Named Arguments

There is no syntax dedicated to named arguments, but you can achieve something close using the entry operator.

```shell
$ xa -q '
  f := a1 -> (
    params := {__(1 ~ $#__)}

    OUT << "a1=$(a1)"
    OUT << "p1=$(params.p1)"
    OUT << "p2=$(params.p2)"
    OUT << "p3=$(params.p3)"
  )

  f("arg1"; p1: "param1"; p2: "param2")
'
# a1=arg1
# p1=param1
# p2=param2
# p3=NULL
```

# Extension Functions

Extension functions are a mechanism that allows calling functions defined on variables or mounts like methods of objects.

## Basics of Extension Functions

The basic syntax of extension functions is as follows:

```
`::method` := (class): this, arguments -> formula
```

---

This can be broken down as follows:

```
function   := this, arguments -> formula
entry      := (class): function
`::method` := entry
```

`function` is the function that becomes the body of the method.

`entry` is a pair of the target class and `function`.

The entry operator `key: value` treats `key` as a string when it is an identifier, so parentheses are needed to reference the class.

The variable name requires the `::` prefix.

Since the variable name contains symbols, it needs to be enclosed in backticks ``` ` ```.

---

Here is an example of actually using extension functions.

```shell
$ xa '
  Adder := {}

  `::add` := (Adder): this, y -> this.x + y

  Adder{x: 100}::add(23)
'
# 123
```

## Overloading Extension Functions

The entry of extension functions can also be an array of entries.

In that case, all entries in the array are valid.

```shell
$ xa '
  NumberAdder := {}
  StringAdder := {}

  `::add` := [
    (NumberAdder): this, y -> this.x + y
    (StringAdder): this, y -> this.x & y
  ]

  NumberAdder{x: 100}::add(23),
  StringAdder{x: "a"}::add("bc"),
'
# 123
# abc
```

## Extension Functions Using Mount

Since variables with the same name are overwritten by those declared later, it is inconvenient for defining extension functions.

Therefore, you can also define extension functions using mount.

```shell
$ xa '
  NumberAdder := {}
  StringAdder := {}

  @{
    `::add`: (NumberAdder): this, y -> this.x + y
  }
  @{
    `::add`: (StringAdder): this, y -> this.x & y
  }

  NumberAdder{x: 100}::add(23),
  StringAdder{x: "a"}::add("bc"),
'
# 123
# abc
```

When resolving method names, all entries with the same name are search targets.

---

Extension functions using mount can also be overloaded with arrays.

```shell
$ xa '
  NumberAdder := {}
  StringAdder := {}

  @{
    `::add`: [
      (NumberAdder): this, y -> this.x + y
      (StringAdder): this, y -> this.x & y
    ]
  }

  NumberAdder{x: 100}::add(23),
  StringAdder{x: "a"}::add("bc"),
'
# 123
# abc
```

## Priority of Methods and Extension Functions

If there are multiple definitions of methods with the same name, priority is given in the following order:

1. Extension functions by variables
2. Methods of that object
3. Fallback methods of that object
4. Extension functions by mount

Note that extension functions by variables take precedence over methods of objects.

This is a specification that arises from the fact that variables are statically resolved and methods of objects are dynamically resolved.

# Built-in Constants

## `CALL` Call a Function

`CALL(function: FUNCTION; arguments: ARRAY<VALUE>): VALUE`

Executes the function in the first argument by passing each element of the array in the second argument as an argument.

```shell
$ xa '
  function := a, b -> a * b

  CALL(function; [2; 3])
'
# 6
```
