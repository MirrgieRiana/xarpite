Added the arbitrary-precision integer type `BIG`.
Added the `BIG.of` function to create a `BIG` from a string or a number.
Added support for converting an integer string outside the range of `INT` into a `BIG` without losing precision.
Added support for decoding JSON integers outside the range of `INT` into `BIG` values and encoding `BIG` values back into JSON number literals.
