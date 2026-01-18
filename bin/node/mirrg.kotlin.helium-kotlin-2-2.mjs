import {
  coerceAtLeast2bkz8m9ik7hep as coerceAtLeast,
  coerceAtMost322komnqp70ag as coerceAtMost,
  VOID3gxj6tk5isa35 as VOID,
  take9j4462mea726 as take,
  joinToString1cxrrlmo0chqs as joinToString,
} from './kotlin-kotlin-stdlib.mjs';
//region block: imports
//endregion
//region block: pre-declaration
//endregion
function atLeast(_this__u8e3s4, other) {
  return coerceAtLeast(_this__u8e3s4, other);
}
function atMost(_this__u8e3s4, other) {
  return coerceAtMost(_this__u8e3s4, other);
}
function truncate(_this__u8e3s4, max, suffix) {
  suffix = suffix === VOID ? '...' : suffix;
  return _this__u8e3s4.length > max ? take(_this__u8e3s4, max) + suffix : _this__u8e3s4;
}
function join(_this__u8e3s4, separator) {
  return joinToString(_this__u8e3s4, separator);
}
//region block: exports
export {
  atLeast as atLeast1wmir1plxesaz,
  atMost as atMost2me5b9kxozwcn,
  join as join306op6wwexm4l,
  truncate as truncate835ryq4aq3b8,
};
//endregion

//# sourceMappingURL=mirrg.kotlin.helium-kotlin-2-2.mjs.map
