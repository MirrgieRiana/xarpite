import {
  coerceAtLeast2bkz8m9ik7hep as coerceAtLeast,
  coerceAtMost322komnqp70ag as coerceAtMost,
  isBlank1dvkhjjvox3p0 as isBlank,
  joinToString1cxrrlmo0chqs as joinToString,
  VOID3gxj6tk5isa35 as VOID,
  take9j4462mea726 as take,
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
function get_notBlankOrNull(_this__u8e3s4) {
  // Inline function 'kotlin.text.ifBlank' call
  var tmp;
  if (isBlank(_this__u8e3s4)) {
    tmp = null;
  } else {
    tmp = _this__u8e3s4;
  }
  return tmp;
}
function join(_this__u8e3s4, separator) {
  return joinToString(_this__u8e3s4, separator);
}
function truncate(_this__u8e3s4, max, suffix) {
  suffix = suffix === VOID ? '...' : suffix;
  return _this__u8e3s4.length > max ? take(_this__u8e3s4, max) + suffix : _this__u8e3s4;
}
//region block: exports
export {
  atLeast as atLeast1wmir1plxesaz,
  atMost as atMost2me5b9kxozwcn,
  join as join306op6wwexm4l,
  get_notBlankOrNull as get_notBlankOrNull1fv48dcu8p8g8,
  truncate as truncate835ryq4aq3b8,
};
//endregion

//# sourceMappingURL=mirrg.kotlin.helium-kotlin-2-2.mjs.map
