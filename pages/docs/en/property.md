---
title: "Property Access"
---

<!-- toc -->

# Property Access

Property access is syntax for getting and setting "elements" of data structures such as objects, arrays, and strings.

The specific behavior of property access varies depending on the type of container providing the property.

---

Here are examples of property access for each container type:

| Container Type | Property Access Behavior                     |
|----------------|----------------------------------------------|
| `OBJECT`       | Get/set properties by key                    |
| `ARRAY`        | Get/set elements by index                    |
| `STRING`       | Get characters by index                      |

## Basic Syntax of Property Access

`container.key` gets a property of the container.

`container.key = value` sets a property of the container.

## Overriding Property Access

These operations can be customized by overriding the `_._` method and `_._=_` method of `container`.

```shell
$ xa -q '
  globalVariableTable := {}
  DelegatedObject := {
    `_._` : this, key        -> globalVariableTable."item_$key"
    `_._=_`: this, key, value -> globalVariableTable."item_$key" = value
  }
  delegatedObject := DelegatedObject{}

  delegatedObject.a = 100
  delegatedObject.b = delegatedObject.a + 23

  OUT << "globalVariableTable = $globalVariableTable"
  OUT << "delegatedObject = $delegatedObject"
'
# globalVariableTable = {item_a:100;item_b:123}
# delegatedObject = {}
```
