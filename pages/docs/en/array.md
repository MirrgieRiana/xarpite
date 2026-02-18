---
title: "Arrays"
---

<!-- toc -->

# Arrays

Arrays are data structures that handle zero or more ordered elements.

Arrays in Xarpite are mutable, allowing element assignment and length modification.

Array indices start from 0.

## Creating Arrays

### `[value; ...]`: Array Literals

Array literals are the most basic way to create arrays.

Within `[ ]`, you can write zero or more expressions separated by `;`.

```shell
$ xa '[1; 2; 3]'
# [1;2;3]
```

---

In Xarpite, `;` can be substituted with newlines, so you can omit `;` by writing one element per line.

```shell
$ xa '
  [
    1
    2
    3
  ]
'
# [1;2;3]
```

---

Also, you can write as many extra `;` as you want.

```shell
$ xa '[; ; ; 1; ; ; 2; 3; ; ]'
# [1;2;3]
```

#### Stream Elements in Array Literals

When an array literal element is a stream, each element of the stream is stored in the array, not the stream itself.

```shell
$ xa '[1 .. 3; 4, 5, 6]'
# [1;2;3;4;5;6]

$ xa '
  [
    1 .. 3 | _ * 10
    4 .. 6 | _ * 100
  ]
'
# [10;20;30;400;500;600]
```

### `stream.[]`: Array Conversion Operator

The array conversion operator converts a stream to an array.

```shell
$ xa '(1 .. 3).[]'
# [1;2;3]
```

---

The array conversion operator is convenient for converting streams returned from variables or function calls to arrays with the shortest notation.

```shell
$ seq 1 3 | xa 'I.[]'
# [1;2;3]
```

## Accessing Array Elements

In Xarpite, there are two main ways to access array elements:

- Array invocation
- Property access to array elements

### `array(index)`: Array Invocation

Arrays can be treated as a function that receives an index and returns an element.

```shell
$ xa '
  array := ["zero", "one", "two", "three", "four"]

  array(2)
'
# two
```

For this reason, Xarpite uses parentheses `( )` instead of square brackets `[ ]` to get array elements.

#### Out-of-Range Indices

If an out-of-range index is specified, `NULL` is returned.

```shell
$ xa '
  array := ["zero", "one", "two", "three", "four"]

  array(5)
'
# NULL
```

#### Negative Indices

If the index is negative, it is interpreted as a relative position from the end of the array.

```shell
$ xa '
  array := ["zero", "one", "two", "three", "four"]

  array(-1)
'
# four
```

#### Stream Indices

The index can be a stream.

In that case, a stream of array elements corresponding to each index element of the stream is returned.

```shell
$ xa '
  array := ["zero", "one", "two", "three", "four"]

  array(2, 4, 0)
'
# two
# four
# zero
```

---

This allows arrays to be used like functions that process streams.

```shell
$ xa '
  array := ["zero", "one", "two", "three", "four"]

  3 .. 1 >> array
'
# three
# two
# one
```

#### Integer Conversion of Indices

Indices are converted to numbers and then rounded.

```shell
$ xa '
  array := ["zero", "one", "two", "three", "four"]

  array("2.95")
'
# three
```

---

This property makes it easy to use calculation results of decimals that become integers in calculation.

```shell
$ xa '
  array := ["zero", "one", "two", "three", "four"]

  array(SQRT(16) - SQRT(9))
'
# one
```

### `array()`: Array Streaming

`array()` generates a stream that iterates over all elements of the array in order.

```shell
$ xa '
  array := ["zero", "one", "two", "three", "four"]

  array()
'
# zero
# one
# two
# three
# four
```

### `array[indices]` Getting Subarrays

`array[indices]` allows you to get a subarray of the array.

```shell
$ xa '
  array := ["zero", "one", "two", "three", "four"]

  array[1 .. 3]
'
# [one;two;three]
```

`indices` can be an empty stream or a single index that is not a stream.

---

This syntax, combined with array streaming, makes `array(indices)` and `array[indices]()` equal.

```shell
$ xa '
  array := ["zero", "one", "two", "three", "four"]

  array(1 .. 3)
'
# one
# two
# three

$ xa '
  array := ["zero", "one", "two", "three", "four"]

  array[1 .. 3]()
'
# one
# two
# three
```

This property is similar to the relationship between function calls and partial application of functions.

### `array[]`: Array Duplication

`array[]` creates a shallow copy of the array.

Changes to the generated array are not reflected in the original array.

```shell
$ xa -q '
  array := ["zero", "one", "two", "three", "four"]
  new_array := array[]

  new_array(2) = 99999

  OUT << array
  OUT << new_array
'
# [zero;one;two;three;four]
# [zero;one;99999;three;four]
```

In other words, duplicating an array is the same as getting a subarray with all elements of the original.

### `array(index) = value`: Assignment to Array Invocation

`array(index) = value` assigns a value to an array element.

```shell
$ xa '
  array := ["zero", "one", "two", "three", "four"]

  array(2) = 99999

  array
'
# [zero;one;99999;three;four]
```

### `array.index`: Property Access to Array Elements

Property access to array elements `array.index` provides low-layer access to array elements.

```shell
$ xa '
  array := ["zero", "one", "two", "three", "four"]

  array.2
'
# two
```

#### Property Access Limitations

Unlike array invocation, the following "smart" features are not provided:

- Negative indices
- Specifying indices with streams
- Getting subarrays

---

Instead, you can assign streams directly to array elements without expanding them.

```shell
$ xa '
  array := ["zero", "one", "two", "three", "four"]

  array.2 = 1 .. 3

  array
'
# [zero;one;123;three;four]
```

#### Chaining Property Access

Multiple property accesses can be written consecutively.

```shell
$ xa '
  array := [["one", "two"], ["three", "four"]]

  array.0.1
'
# two
```

---

This means that the `0.1` part in `array.0.1` is interpreted as a chain of property accesses, not as a decimal literal.

### `array.index = value`: Assignment via Property Access to Array Elements

`array.index = value` assigns a value to an array element.

```shell
$ xa '
  array := ["zero", "one", "two", "three", "four"]

  array.2 = 99999

  array
'
# [zero;one;99999;three;four]
```

### `array.(index)`: Property Access to Array Elements with Expressions

By enclosing in parentheses like `array.(index)`, you can specify the index as an expression.

```shell
$ xa '
  array := ["zero", "one", "two", "three", "four"]

  array.(1 + 2)
'
# three
```

## `$#array`: Getting Array Length

## `$#array`: Getting Array Length

`$#array` gets the number of elements in the array.

See [Getting Length](./length.md) for details.

## `array + array`: Array Concatenation

Addition of arrays `array + array` creates and returns a new array concatenating the left and right arrays.

```shell
$ xa '
  array1 := ["zero", "one"]
  array2 := ["two", "three"]

  array1 + array2
'
# [zero;one;two;three]
```

## `unshift` `shift` `push` `pop`: Methods for Adding/Removing at Array Ends

The `unshift` `shift` `push` `pop` methods add/remove elements at the beginning/end of the array respectively.

These methods perform destructive operations.

| Method    | Target | Operation      | Return Value      |
|-----------|--------|----------------|-------------------|
| `unshift` | Start  | Add element    | `NULL`            |
| `shift`   | Start  | Remove element | Removed element   |
| `push`    | End    | Add element    | `NULL`            |
| `pop`     | End    | Remove element | Removed element   |

```shell
$ xa -q '
  array := ["zero", "one", "two", "three", "four"]

  array::unshift("minus one")
  OUT << array

  OUT << array::shift()
  OUT << array

  array::push("five")
  OUT << array

  OUT << array::pop()
  OUT << array
'
# [minus one;zero;one;two;three;four]
# minus one
# [zero;one;two;three;four]
# [zero;one;two;three;four;five]
# five
# [zero;one;two;three;four]
```

### `unshift` `push` with Streams

If you pass a stream to the `unshift` `push` methods, each element of the stream is added to the array.

```shell
$ xa -q '
  array := ["zero", "one", "two", "three", "four"]

  array::unshift("minus two", "minus one")
  OUT << array

  array::push("five", "six")
  OUT << array
'
# [minus two;minus one;zero;one;two;three;four]
# [minus two;minus one;zero;one;two;three;four;five;six]
```

## `array += item`: Adding Elements to an Array

You can add elements to an array using the addition assignment operator.

No assignment operation is performed on the left-hand variable itself; the array itself is modified.

It generally behaves similarly to the `push` method.

```shell
$ xa '
  array := ["apple"]
  array += "banana"
  array
'
# [apple;banana]
```

## `array -= item`: Removing Elements from an Array

You can remove element `item` from array `array` using the subtraction assignment operator.

No assignment operation is performed on the `array` variable itself; the array `array` itself is modified.

If there are multiple matching elements, the one closest to the beginning is removed.

If no matching element exists, nothing happens.

If `item` is a stream, the removal operation is performed for each element of the stream.

```shell
$ xa -q '
  array := ["apple", "banana", "cherry", "banana"]
  OUT << array
  array -= "banana"
  OUT << array
  array -= "apple", "banana", "durian"
  OUT << array
'
# [apple;banana;cherry;banana]
# [apple;cherry;banana]
# [cherry]
```
