Added the arbitrary-precision integer type `BIG`, which can be created with `BIG.of` and is produced when converting an integer string outside the range of `INT`.
Added support for decoding JSON integers outside the range of `INT` into `BIG` values without losing precision, and encoding `BIG` values back into JSON number literals.
