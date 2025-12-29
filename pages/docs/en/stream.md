---
title: "Range Operators"
---

<!-- toc -->

# Range Operators

## Closed Interval `start .. end`

The closed interval operator creates a stream of integers ranging from the left operand to the right operand.

The end value itself is included in the stream.

```shell
$ xa '1 .. 3'
# 1
# 2
# 3
```

---

If the left side is greater than the right side, it counts down.

```shell
$ xa '3 .. 1'
# 3
# 2
# 1
```

## Half-Open Interval `start ~ end`

The half-open interval operator creates a stream of integers from the left operand up to (but not including) the right operand.

The end value itself is not included in the stream.

```shell
$ xa '1 ~ 3'
# 1
# 2
```

---

Unlike the closed interval operator, the half-open interval operator creates an empty stream when the right operand is less than the left operand.

```shell
$ xa '[3 ~ 1]'
# []
```

# Stream Concatenation Operators

## Stream Concatenation `items, ...`

The operator `,` creates a stream that concatenates left and right elements or streams.

In Xarpite, unless in special places like the left side of lambda operators, `,` is interpreted as a stream concatenation operator, not as a separator for arguments or array elements.

```shell
$ xa '1, 2 .. 4, 5'
# 1
# 2
# 3
# 4
# 5
```

---

Even if you write too many stream concatenation operators, they are ignored.

```shell
$ xa ', , 1, , , , 2, , '
# 1
# 2
```

---

You can write only stream concatenation operators, in which case an empty stream is created.

```shell
$ xa '[,]'
# []
```

---

The xa command outputs the return value of the given source code by default, but outputs nothing for empty streams, so this is sometimes used to suppress output from the xa command.

```shell
$ xa '"Some processing with side effects"; ,'
```

# Stream Operators

Stream operators are operators that process, transform, and assign streams.

## Brief Introduction to Stream Operators

To explain binding precedence, we briefly introduce operators belonging to stream operators.

---

Pipe `stream | argument => formula` gets a stream with `formula` applied to each element of `stream`.

Within `formula`, you can reference that element with `argument`.

```shell
$ xa '1, 2, 3 | x => x * 10'
# 10
# 20
# 30
```

---

Execution pipe `value >> function` passes `value` to `function` and executes it.

```shell
$ xa '1, 2, 3 >> REVERSE'
# 3
# 2
# 1
```

---

Variable declaration `variable := value` declares variable `variable` and initializes its value with `value`.

```shell
$ xa '
  x := 123
  x
'
# 123
```

---

Assignment `variable = value` assigns `value` to variable `variable`.

```shell
$ xa '
  x := 123
  x = 456
  x
'
# 456
```

## About Binding Precedence

For practical reasons, stream operators have complex binding rules expressed by the following grammar:

```
StreamNode :=
    StreamConcatNode AssignmentOp StreamNode
  / StreamConcatNode StreamPostfixPart*

StreamPostfixPart :=
    PipeOp PipeRHS
  / ExecPipeOp ExecPipeRHS

ExecPipeRHS :=
    StreamConcatNode AssignmentOp StreamNode
  / StreamConcatNode

PipeRHS :=
    StreamConcatNode PipeOp PipeRHS
  / StreamConcatNode AssignmentOp StreamNode
  / StreamConcatNode
```

Below, we explain the grammar of stream operators using examples.

---

Pipe operators are, in principle, right-associative.

This allows variables from previous stages to be referenced from later stages.

```shell
$ xa '10, 20 | x => 3, 4 | y => x + y'
# 13
# 14
# 23
# 24

$ xa '10, 20 | x => (3, 4 | y => x + y)'
# 13
# 14
# 23
# 24
```

---

Execution pipe operators take all pipe and execution pipe operators on the left side together.

This allows inputting the entire stream processed in various ways to a function.

```shell
$ xa '10, 20 | x => 3, 4 | y => x + y >> JOIN["-"]'
# 13-14-23-24

$ xa '(10, 20 | x => 3, 4 | y => x + y) >> JOIN["-"]'
# 13-14-23-24
```

Execution pipe operators also take other execution pipe operators on the left side together.

Also, the result from execution pipe operators can be further processed by other pipe operators.

```shell
$ xa '1 .. 3 | _ * 10 >> REVERSE | _ + 5 >> JOIN["-"]'
# 35-25-15

$ xa '((1 .. 3 | _ * 10) >> REVERSE | _ + 5) >> JOIN["-"]'
# 35-25-15
```

---

Assignment operators separate the right side from the left side.

Execution pipe operators on the right side of assignment operators do not affect the left side of assignment operators.

```shell
$ xa '
  pow2_joiner := stream -> stream | x => x * x >> JOIN["-"]
  pow2_joiner(1, 2, 3)
'
# 1-4-9
```

Below, calling function `setter` assigns to variable `variable` the value obtained by adding 36 to the given number and taking the square root.

The `>>` to the left of `SQRT` takes everything up to the `=` to its left as the left side.

```shell
$ xa '
  variable := NULL
  setter := x -> x + 36 | x2 => variable = x2 >> SQRT
  setter(64)
  variable
'
# 10.0
```

## Assignment to Array Element (Assignment) `array(index) = value`

If the left side is a reference to an array element, the value on the right side is assigned to that element.

```shell
$ xa -q '
  array := [1, 2, 3]
  OUT << array
  array(1) = 4
  OUT << array
'
# [1;2;3]
# [1;4;3]
```

## Entry Operator (Assignment) `key: value`

The entry operator is an operator that creates a 2-element array with both sides as elements.

```shell
$ xa 'a: 1'
# [a;1]
```

---

If the left side is an identifier, it is treated as a string rather than referencing a variable, even if a variable with the same name exists.

```shell
$ xa '
  a := "b"
  a: 1
'
# [a;1]
```

---

If you want to reference a variable on the left side, you can avoid being treated as a string by enclosing it in parentheses.

```shell
$ xa '
  a := "b"
  (a): 1
'
# [b;1]
```

---

Unlike array literals, the entry operator always creates a 2-element array without expanding streams.

```shell
$ xa '["key"; 1 .. 3]'
# [key;1;2;3]

$ xa 'key: 1 .. 3'
# [key;123]
```

---

This operator is useful when creating objects.

```shell
$ xa '
  {
    a: 1
    b: 2
  }
'
# {a:1;b:2}
```

## Left Execution Pipe (Assignment) `function << value`

The left execution pipe calls by specifying the right side value as the first argument of the left side function.

It's a version of the right execution pipe with left and right reversed, but the binding precedence is treated as assignment.

Depending on how it's used, it has potential to contribute to readability.

```shell
$ xa -q '
  OUT << "Hello, World"
'
# Hello, World
```

## Pipe (Pipe) `stream | formula`

The pipe operator `|` evaluates the right side for each value in the left side stream and returns a flat stream of them.

On the right side, you can get the value of each element on the left side with variable `_`.

```shell
$ xa '1 .. 3 | _, _ * 10'
# 1
# 10
# 2
# 20
# 3
# 30
```

---

If the left side is not a stream, the return value of the right side is returned as-is without being rewrapped in a stream.

```shell
$ xa '(5 | _ * 10) + 7'
# 57
```

---

The variable passed to the right side can be changed by `=>`.

```shell
$ xa '5 | x => x * 10'
# 50
```

---

By making the right side argument in the format `index, value => formula`, you can get the index and value of each element of the left side stream.

```shell
$ xa '"a", "b", "c" | i, v => "$i: $v"'
# 0: a
# 1: b
# 2: c
```

---

The pipe operator can also be used like a loop construct.

```shell
$ xa '
  x := 0
  1 .. 10 | (
    x = x + _
  )
  x
'
# 55
```

---

Loop variables are created independently each time the right side is evaluated.

Therefore, the contents of variables do not change due to loop progression, and assignments to variables do not affect each other between different evaluations.

```shell
$ xa '
  accessors := [1 .. 4 | value => {
    set: _ -> value = _
    get: , -> value
  }]
  accessors.2.set() = 99
  accessors().get()
'
# 1
# 2
# 99
# 4
```

## Right Execution Pipe (Execution Pipe) `value >> function`

The right execution pipe calls by specifying the left side value as the first argument of the right side function.

```shell
$ xa '1 .. 3 >> JOIN["-"]'
# 1-2-3
```

---

This operator is convenient for executing functions that handle streams.

```shell
$ xa '"1+2+3" >> SPLIT["+"] | +_ * 2 >> JOIN["-"]'
# 2-4-6
```

## Object Inheritance `parent{entry; ...}`

Postfixing `{` `}` to an object creates a child object with that object as parent.

Object inheritance is mainly used for method lookup and entry inheritance does not occur.

The method of creating objects is shared with object literals.

```shell
$ xa '{a: 1; m: this -> 3}{b: 2}'
# {b:2}

$ xa '{a: 1; m: this -> 3}{b: 2}.a'
# NULL

$ xa '{a: 1; m: this -> 3}{b: 2}::m()'
# 3
```

## Object Element Access `object.key`

You can access object elements with the `.` operator.

```shell
$ xa '{x: 123}.x'
# 123
```

---

Even if the object has a parent object, the parent object's elements are not inherited.

```shell
$ xa '{x: 123}{}.x'
# NULL
```

---

By placing parentheses on the right side of `.`, you can reference with arbitrary expressions.

```shell
$ xa '
  obj := {item1: 123; item2: 456}
  index := 2
  obj.("item$index")
'
# 456
```

---

`.` has the property that when the right side is an identifier, it interprets it as a key rather than a variable.

Therefore, there is a difference in the entry referenced depending on the presence or absence of parentheses.

```shell
$ xa '
  key := "item1"
  obj := {key: 123; item1: 456}
  [obj.key; obj.(key)]
'
# [123;456]
```

---

Keys are automatically stringified.

```shell
$ xa '{1: 123}.1'
# 123
```

## Null-Safe Element Access `object?.key`

The `?.` operator returns `NULL` instead of attempting to get the element when the left side is `NULL`.

```shell
$ xa '{x: 1}, NULL, {x: 3} | _?.x'
# 1
# NULL
# 3
```

# Best Practices for Pipe and Execution Pipe Indentation

The pipe operator `|` and execution pipe operator `>>` can be newlined on either the left or right side, and can be written with some freedom.

Here we show recommended indentation styles as best practices.

## Pipe Chain

When newlining at the position of `|`, newline immediately after it or after the following `=>`, and indent the right side.

By doing this, the beginning of a line is always the beginning of an expression, which is consistent.

```
a |
  b
```

```
a | b =>
  c
```

The same applies when chaining.

```
a | b =>
  c |
    d | e =>
      f
```

## Resetting Pipe Indentation with Execution Pipe

When newlining at the position of `>>`, newline immediately before it and remove all indentation by `|` operators up to that point.

By doing this, it becomes clear that the scope of loop variables declared by `|` ended immediately before `>>`.

```
a |
  b | c =>
    d
>> e
>> f
```

When `|` follows `>>`, newline before `|`.

This makes the style of lines with `>>` consistent.

```
a | b =>
  c
>> b
>> e
| f =>
  g |
    h
>> i
```

# Stream Property Access

When you do property access on a stream, it returns a stream that concatenates the results of property access for each element.

```shell
$ xa '
  (
    {a: 1},
    {a: 2 .. 4},
  ).a
'
# 1
# 2
# 3
# 4
```

# Stream Resolution

Operators and functions that return streams as return values may perform stream resolution to ensure stream side effects.

Stream resolution means returning a cached stream that reproduces the element sequence instead of the original stream.

The original stream is evaluated exactly once in its entirety at the time of resolution, and side effects also occur exactly once at that time.

---

This behavior is due to the fact that a stream value is essentially a lazy-evaluated chunk of instructions.

For example, in the following example, the actual iteration start of `stream` is delayed until the actual output of the result of the entire program.

```shell
$ xa '
  array := [1, 2, 3]
  stream := array()
  array::push << 4, 5
  stream
'
# 1
# 2
# 3
# 4
# 5
```

This property can be a hindrance in programs that expect side effect effects.

In the following example, we expect to add elements to the array using the pipe operator, but the second example does not cause side effects.

```shell
$ xa '
  array := [1, 2, 3]
  4, 5 | *array::push
  array
'
# [1;2;3;4;5]

$ xa '
  array := [1, 2, 3]
  dummy := 4, 5 | *array::push
  array
'
# [1;2;3]
```

An easy way to perform stream resolution and cause side effects on the spot is to execute it as a statement (runner) by a compound statement.

```shell
$ xa '
  array := [1, 2, 3]
  dummy := (4, 5 | *array::push;)
  array
'
# [1;2;3;4;5]
```

---

Holding the cache array may be omitted for memory savings when the result of the resolved stream is not used anywhere.

---

If you attempt to resolve an infinite stream, unless you exit midway with errors or return operators, the program will fall into an infinite loop at that location.

As a result, the program may stop progressing or crash due to out of memory.

For example, the expression `LOOP !? "Error"` falls into an infinite loop.

This is because the catch operator `!?` tries to check if something is thrown somewhere in the infinite NULLs contained in `LOOP`.

To avoid stream resolution, there is a method of exchanging in the state of functions that return streams instead of the streams themselves.

```shell
$ xa '
  getStream := (() -> LOOP | i, _ => i) !? "Error"
  getStream() >> TAKE[3]
'
# 0
# 1
# 2
```

# Stream Functions

## `PIPE`: Create Stream That Remembers Read Position

`<T> PIPE(stream: STREAM<T>): STREAM<T>`

Creates a stream that holds iteration of `stream` and resumes from the held position when iterating.

---

For convenience, streams with such properties are called "pipes".

`IN` etc. that accept standard input on CLI also correspond to pipes.

Pipes shine when combined with functions like `FIRST` and `TAKE` that consume streams halfway.

```shell
$ xa -q '
  pipe := PIPE(1 .. 10)
  OUT << "First: " & FIRST(pipe)
  OUT << "Next 3 items: " & [pipe >> TAKE[3]]
  OUT << "Next: " & FIRST(pipe)
'
# First: 1
# Next 3 items: [2;3;4]
# Next: 5
```

---

A pipe that has been read to the end becomes an empty stream.

```shell
$ xa -q '
  pipe := PIPE(1 .. 10)
  OUT << [pipe]
  OUT << [pipe]
'
# [1;2;3;4;5;6;7;8;9;10]
# []
```

---

By nature, through the returned stream, `stream` is iterated at most only once.

This also prevents side effects caused by `stream` from occurring multiple times.

```shell
$ xa '
  array := []
  pipe := PIPE(
    1 .. 3 | (
      array::push << _
    )
  )

  pipe
  pipe
  pipe

  array
'
# [1;2;3]
```

---

However, `PIPE` may buffer elements of `stream`, and side effects may occur at unintended timing.

To control the timing of side effects, make processing with side effects into a function and execute it on the side that extracted it from the pipe.

```shell
$ xa -q '
  tasks := PIPE(
    1 .. 10 | , -> (
      OUT << "Task $_"
    )
  )

  OUT << "Execute 1 task"
  FIRST(tasks) | _()
  OUT << "Execute 3 tasks"
  TAKE(3; tasks) | _()
  OUT << "Execute 1 task"
  FIRST(tasks) | _()
'
# Execute 1 task
# Task 1
# Execute 3 tasks
# Task 2
# Task 3
# Task 4
# Execute 1 task
# Task 5
```

---

Pipes are lazy evaluation, and if the returned stream is not consumed, iteration of `stream` does not start.

Therefore, side effects also do not occur.

```shell
$ xa '
  array := []
  pipe := PIPE(
    1 .. 10000 | (
      array::push << _
    )
  )
  array
'
# []
```

---

`stream` can be an infinite stream.

Even if the pipe is not read to the end, resources for iterating `stream` are automatically released when the program exits.

```shell
$ xa '
  pipe := PIPE(LOOP | i, _ => i)
  OUT << [pipe >> TAKE[10]]
  "Finished"
'
# [0;1;2;3;4;5;6;7;8;9]
# Finished
```
