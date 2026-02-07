Added `accessor` function parameter to compound assignment override methods (`_+=_`, `_-=_`), enabling control over expression get and set operations.
Allowed compound assignment operators to work with expressions that don't support setters when an override method is provided.
!Changed compound assignment override methods to return their return value instead of the right-hand value.