import {
  VOID3gxj6tk5isa35 as VOID,
  copyOfRange3alro60z4hhf8 as copyOfRange,
  protoOf180f3jzyo7rfj as protoOf,
  objectCreate1ve4bgxiu4x98 as objectCreate,
  toCharArray32huqyw9tt7kx as toCharArray,
  initMetadataForCompanion1wyw17z38v6ac as initMetadataForCompanion,
  getKClassFromExpression348iqjl4fnx2f as getKClassFromExpression,
  THROW_CCE2g6jy02ryeudk as THROW_CCE,
  Unit_instance28fytmsmm6r23 as Unit_instance,
  contentEquals1cdp6c846cfdi as contentEquals,
  contentHashCode25jw6rgkgywwr as contentHashCode,
  IndexOutOfBoundsException_init_$Create$1rd2xj3xtaoo6 as IndexOutOfBoundsException_init_$Create$,
  _UByte___init__impl__g9hnc418b8pq346rvu4 as _UByte___init__impl__g9hnc4,
  _UByte___get_data__impl__jof9qrfg5oujomrowy as _UByte___get_data__impl__jof9qr,
  compareTo3ankvs086tmwq as compareTo,
  StringBuilder_init_$Create$39ouzl6b47q8d as StringBuilder_init_$Create$,
  _Char___init__impl__6a9atx1csff5kwtduxl as _Char___init__impl__6a9atx,
  Comparable198qfk8pnblz0 as Comparable,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
  decodeToString1x4faah2liw2p as decodeToString,
  initMetadataForObject1cxne3s9w65el as initMetadataForObject,
} from './kotlin-kotlin-stdlib.mjs';
//region block: imports
var imul = Math.imul;
//endregion
//region block: pre-declaration
initMetadataForCompanion(Companion);
initMetadataForClass(ByteString, 'ByteString', VOID, VOID, [Comparable]);
initMetadataForObject(UnsafeByteStringOperations, 'UnsafeByteStringOperations');
//endregion
function ByteString_init_$Init$(data, startIndex, endIndex, $this) {
  startIndex = startIndex === VOID ? 0 : startIndex;
  endIndex = endIndex === VOID ? data.length : endIndex;
  ByteString.call($this, copyOfRange(data, startIndex, endIndex), null);
  return $this;
}
function ByteString_init_$Create$(data, startIndex, endIndex) {
  return ByteString_init_$Init$(data, startIndex, endIndex, objectCreate(protoOf(ByteString)));
}
function Companion() {
  Companion_instance = this;
  this.k3p_1 = new ByteString(new Int8Array(0), null);
  this.l3p_1 = toCharArray('0123456789abcdef');
}
protoOf(Companion).m3p = function (byteArray) {
  return new ByteString(byteArray, null);
};
var Companion_instance;
function Companion_getInstance() {
  if (Companion_instance == null)
    new Companion();
  return Companion_instance;
}
function ByteString(data, dummy) {
  Companion_getInstance();
  this.n3p_1 = data;
  this.o3p_1 = 0;
}
protoOf(ByteString).u1 = function () {
  return this.n3p_1.length;
};
protoOf(ByteString).equals = function (other) {
  if (this === other)
    return true;
  if (other == null || !getKClassFromExpression(this).equals(getKClassFromExpression(other)))
    return false;
  if (!(other instanceof ByteString))
    THROW_CCE();
  if (!(other.n3p_1.length === this.n3p_1.length))
    return false;
  if (!(other.o3p_1 === 0) && !(this.o3p_1 === 0) && !(other.o3p_1 === this.o3p_1))
    return false;
  return contentEquals(this.n3p_1, other.n3p_1);
};
protoOf(ByteString).hashCode = function () {
  var hc = this.o3p_1;
  if (hc === 0) {
    hc = contentHashCode(this.n3p_1);
    this.o3p_1 = hc;
  }
  return hc;
};
protoOf(ByteString).v1 = function (index) {
  if (index < 0 || index >= this.u1())
    throw IndexOutOfBoundsException_init_$Create$('index (' + index + ') is out of byte string bounds: [0..' + this.u1() + ')');
  return this.n3p_1[index];
};
protoOf(ByteString).ce = function (startIndex, endIndex) {
  var tmp;
  if (startIndex === endIndex) {
    tmp = Companion_getInstance().k3p_1;
  } else {
    tmp = ByteString_init_$Create$(this.n3p_1, startIndex, endIndex);
  }
  return tmp;
};
protoOf(ByteString).p3p = function (startIndex, endIndex, $super) {
  endIndex = endIndex === VOID ? this.u1() : endIndex;
  return $super === VOID ? this.ce(startIndex, endIndex) : $super.ce.call(this, startIndex, endIndex);
};
protoOf(ByteString).q3p = function (other) {
  if (other === this)
    return 0;
  var localData = this.n3p_1;
  var otherData = other.n3p_1;
  var inductionVariable = 0;
  var tmp0 = this.u1();
  // Inline function 'kotlin.math.min' call
  var b = other.u1();
  var last = Math.min(tmp0, b);
  if (inductionVariable < last)
    do {
      var i = inductionVariable;
      inductionVariable = inductionVariable + 1 | 0;
      // Inline function 'kotlin.toUByte' call
      var this_0 = localData[i];
      var tmp0_0 = _UByte___init__impl__g9hnc4(this_0);
      // Inline function 'kotlin.toUByte' call
      var this_1 = otherData[i];
      // Inline function 'kotlin.UByte.compareTo' call
      var other_0 = _UByte___init__impl__g9hnc4(this_1);
      // Inline function 'kotlin.UByte.toInt' call
      var tmp = _UByte___get_data__impl__jof9qr(tmp0_0) & 255;
      // Inline function 'kotlin.UByte.toInt' call
      var tmp$ret$4 = _UByte___get_data__impl__jof9qr(other_0) & 255;
      var cmp = compareTo(tmp, tmp$ret$4);
      if (!(cmp === 0))
        return cmp;
    }
     while (inductionVariable < last);
  return compareTo(this.u1(), other.u1());
};
protoOf(ByteString).d = function (other) {
  return this.q3p(other instanceof ByteString ? other : THROW_CCE());
};
protoOf(ByteString).toString = function () {
  if (isEmpty(this)) {
    return 'ByteString(size=0)';
  }
  var sizeStr = this.u1().toString();
  var len = (22 + sizeStr.length | 0) + imul(this.u1(), 2) | 0;
  // Inline function 'kotlin.with' call
  var $this$with = StringBuilder_init_$Create$(len);
  $this$with.s('ByteString(size=');
  $this$with.s(sizeStr);
  $this$with.s(' hex=');
  var localData = this.n3p_1;
  var inductionVariable = 0;
  var last = this.u1();
  if (inductionVariable < last)
    do {
      var i = inductionVariable;
      inductionVariable = inductionVariable + 1 | 0;
      var b = localData[i];
      $this$with.u(Companion_getInstance().l3p_1[(b >>> 4 | 0) & 15]);
      $this$with.u(Companion_getInstance().l3p_1[b & 15]);
    }
     while (inductionVariable < last);
  return $this$with.u(_Char___init__impl__6a9atx(41)).toString();
};
protoOf(ByteString).r3p = function () {
  return this.n3p_1;
};
function ByteString_0(bytes) {
  var tmp;
  // Inline function 'kotlin.collections.isEmpty' call
  if (bytes.length === 0) {
    tmp = Companion_getInstance().k3p_1;
  } else {
    tmp = Companion_getInstance().m3p(bytes);
  }
  return tmp;
}
function decodeToString_0(_this__u8e3s4) {
  return decodeToString(_this__u8e3s4.r3p());
}
function isEmpty(_this__u8e3s4) {
  return _this__u8e3s4.u1() === 0;
}
function UnsafeByteStringOperations() {
}
protoOf(UnsafeByteStringOperations).s3p = function (array) {
  return Companion_getInstance().m3p(array);
};
var UnsafeByteStringOperations_instance;
function UnsafeByteStringOperations_getInstance() {
  return UnsafeByteStringOperations_instance;
}
//region block: init
UnsafeByteStringOperations_instance = new UnsafeByteStringOperations();
//endregion
//region block: exports
export {
  ByteString_init_$Create$ as ByteString_init_$Create$3r9hvm714j4g,
  UnsafeByteStringOperations_instance as UnsafeByteStringOperations_instance35zx8xrp4hu2p,
  ByteString_0 as ByteString3c9fk8lsh3lvs,
  decodeToString_0 as decodeToString2ede220pr5xir,
};
//endregion

//# sourceMappingURL=kotlinx-io-kotlinx-io-bytestring.mjs.map
