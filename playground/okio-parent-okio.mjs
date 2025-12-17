import {
  protoOf180f3jzyo7rfj as protoOf,
  objectCreate1ve4bgxiu4x98 as objectCreate,
  initMetadataForCompanion1wyw17z38v6ac as initMetadataForCompanion,
  ensureNotNull1e947j3ixpazm as ensureNotNull,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
  bitwiseOr1ita6dahwp8zb as bitwiseOr,
  Long2qws0ah9gnpki as Long,
  compare2uud5j30pw5xc as compare,
  subtract16cg4lfi29fq9 as subtract,
  VOID3gxj6tk5isa35 as VOID,
  charArray2ujmm1qusno00 as charArray,
  _Char___init__impl__6a9atx2js6krycynjoo as _Char___init__impl__6a9atx,
  Unit_instance1fbcbse1fwigr as Unit_instance,
  numberToChar93r9buh19yek as numberToChar,
  concatToString3cxf0c1gqonpo as concatToString,
  Char__toInt_impl_vasixd1agw9q2fuvclj as Char__toInt_impl_vasixd,
  charArrayOf27f4r3dozbrk1 as charArrayOf,
  concatToString2syawgu50khxi as concatToString_0,
  contentHashCode25jw6rgkgywwr as contentHashCode,
  THROW_CCE2g6jy02ryeudk as THROW_CCE,
  toString1pkumu07cwy4m as toString,
  IllegalArgumentException_init_$Create$3ewkh27kzt8z8 as IllegalArgumentException_init_$Create$,
  copyOfRange3alro60z4hhf8 as copyOfRange,
  substringiqarkczpya5m as substring,
  replace3le3ie7l9k8aq as replace,
  fromInt1lka3ktyu79a4 as fromInt,
  arrayCopytctsywo3h7gj as arrayCopy,
  IllegalStateException_init_$Create$2w9444nebyjns as IllegalStateException_init_$Create$,
  convertToIntofdoxh9bstof as convertToInt,
  add85si75olwt6n as add,
  toByte4i43936u611k as toByte,
  equalsLong28bsrfhwvd686 as equalsLong,
  AssertionError_init_$Create$3rpc0tgt37vn2 as AssertionError_init_$Create$,
  isArray1hxjqtqy632bc as isArray,
  IndexOutOfBoundsException1qfr429iumro0 as IndexOutOfBoundsException,
  IndexOutOfBoundsException_init_$Init$3rj4wwb4w6z4p as IndexOutOfBoundsException_init_$Init$,
  captureStack1fzi4aczwc4hg as captureStack,
  Exceptiondt2hlxn7j7vw as Exception,
  Exception_init_$Init$393utbttlf2x4 as Exception_init_$Init$,
  initMetadataForObject1cxne3s9w65el as initMetadataForObject,
} from './kotlin-kotlin-stdlib.mjs';
//region block: imports
var imul = Math.imul;
//endregion
//region block: pre-declaration
initMetadataForCompanion(Companion);
initMetadataForClass(Segment, 'Segment', Segment_init_$Create$);
initMetadataForCompanion(Companion_0);
initMetadataForClass(ByteString, 'ByteString');
initMetadataForClass(SegmentedByteString, 'SegmentedByteString', VOID, ByteString);
initMetadataForClass(UnsafeCursor, 'UnsafeCursor', UnsafeCursor);
initMetadataForClass(Buffer, 'Buffer', Buffer);
initMetadataForClass(ArrayIndexOutOfBoundsException, 'ArrayIndexOutOfBoundsException', VOID, IndexOutOfBoundsException);
initMetadataForClass(IOException, 'IOException', IOException_init_$Create$, Exception);
initMetadataForClass(EOFException, 'EOFException', EOFException_init_$Create$, IOException);
initMetadataForObject(SegmentPool, 'SegmentPool');
//endregion
function Segment_init_$Init$($this) {
  Segment.call($this);
  $this.y1f_1 = new Int8Array(8192);
  $this.c1g_1 = true;
  $this.b1g_1 = false;
  return $this;
}
function Segment_init_$Create$() {
  return Segment_init_$Init$(objectCreate(protoOf(Segment)));
}
function Companion() {
  this.f1g_1 = 8192;
  this.g1g_1 = 1024;
}
var Companion_instance;
function Companion_getInstance() {
  return Companion_instance;
}
protoOf(Segment).h1g = function () {
  var result = !(this.d1g_1 === this) ? this.d1g_1 : null;
  ensureNotNull(this.e1g_1).d1g_1 = this.d1g_1;
  ensureNotNull(this.d1g_1).e1g_1 = this.e1g_1;
  this.d1g_1 = null;
  this.e1g_1 = null;
  return result;
};
protoOf(Segment).i1g = function (segment) {
  segment.e1g_1 = this;
  segment.d1g_1 = this.d1g_1;
  ensureNotNull(this.d1g_1).e1g_1 = segment;
  this.d1g_1 = segment;
  return segment;
};
function Segment() {
  this.z1f_1 = 0;
  this.a1g_1 = 0;
  this.b1g_1 = false;
  this.c1g_1 = false;
  this.d1g_1 = null;
  this.e1g_1 = null;
}
var DEFAULT__new_UnsafeCursor;
function get_DEFAULT__ByteString_size() {
  _init_properties_Util_kt__laey5a();
  return DEFAULT__ByteString_size;
}
var DEFAULT__ByteString_size;
function checkOffsetAndCount(size, offset, byteCount) {
  _init_properties_Util_kt__laey5a();
  if (compare(bitwiseOr(offset, byteCount), new Long(0, 0)) < 0 || compare(offset, size) > 0 || compare(subtract(size, offset), byteCount) < 0) {
    throw new ArrayIndexOutOfBoundsException('size=' + size.toString() + ' offset=' + offset.toString() + ' byteCount=' + byteCount.toString());
  }
}
function resolveDefaultParameter(_this__u8e3s4, position) {
  _init_properties_Util_kt__laey5a();
  if (position === get_DEFAULT__ByteString_size())
    return _this__u8e3s4.t();
  return position;
}
function arrayRangeEquals(a, aOffset, b, bOffset, byteCount) {
  _init_properties_Util_kt__laey5a();
  var inductionVariable = 0;
  if (inductionVariable < byteCount)
    do {
      var i = inductionVariable;
      inductionVariable = inductionVariable + 1 | 0;
      if (!(a[i + aOffset | 0] === b[i + bOffset | 0]))
        return false;
    }
     while (inductionVariable < byteCount);
  return true;
}
var properties_initialized_Util_kt_13atj0;
function _init_properties_Util_kt__laey5a() {
  if (!properties_initialized_Util_kt_13atj0) {
    properties_initialized_Util_kt_13atj0 = true;
    DEFAULT__new_UnsafeCursor = new UnsafeCursor();
    DEFAULT__ByteString_size = -1234567890;
  }
}
function commonToUtf8String(_this__u8e3s4, beginIndex, endIndex) {
  beginIndex = beginIndex === VOID ? 0 : beginIndex;
  endIndex = endIndex === VOID ? _this__u8e3s4.length : endIndex;
  if (beginIndex < 0 || endIndex > _this__u8e3s4.length || beginIndex > endIndex) {
    throw new ArrayIndexOutOfBoundsException('size=' + _this__u8e3s4.length + ' beginIndex=' + beginIndex + ' endIndex=' + endIndex);
  }
  var chars = charArray(endIndex - beginIndex | 0);
  var length = 0;
  // Inline function 'okio.processUtf16Chars' call
  var index = beginIndex;
  while (index < endIndex) {
    var b0 = _this__u8e3s4[index];
    if (b0 >= 0) {
      var c = numberToChar(b0);
      var _unary__edvuaz = length;
      length = _unary__edvuaz + 1 | 0;
      chars[_unary__edvuaz] = c;
      index = index + 1 | 0;
      while (index < endIndex && _this__u8e3s4[index] >= 0) {
        var _unary__edvuaz_0 = index;
        index = _unary__edvuaz_0 + 1 | 0;
        var c_0 = numberToChar(_this__u8e3s4[_unary__edvuaz_0]);
        var _unary__edvuaz_1 = length;
        length = _unary__edvuaz_1 + 1 | 0;
        chars[_unary__edvuaz_1] = c_0;
      }
    } else {
      // Inline function 'okio.shr' call
      if (b0 >> 5 === -2) {
        var tmp = index;
        var tmp2 = index;
        var tmp$ret$5;
        $l$block_0: {
          // Inline function 'okio.process2Utf8Bytes' call
          if (endIndex <= (tmp2 + 1 | 0)) {
            var c_1 = numberToChar(65533);
            var _unary__edvuaz_2 = length;
            length = _unary__edvuaz_2 + 1 | 0;
            chars[_unary__edvuaz_2] = c_1;
            tmp$ret$5 = 1;
            break $l$block_0;
          }
          var b0_0 = _this__u8e3s4[tmp2];
          var b1 = _this__u8e3s4[tmp2 + 1 | 0];
          // Inline function 'okio.isUtf8Continuation' call
          // Inline function 'okio.and' call
          if (!((b1 & 192) === 128)) {
            var c_2 = numberToChar(65533);
            var _unary__edvuaz_3 = length;
            length = _unary__edvuaz_3 + 1 | 0;
            chars[_unary__edvuaz_3] = c_2;
            tmp$ret$5 = 1;
            break $l$block_0;
          }
          var codePoint = 3968 ^ b1 ^ b0_0 << 6;
          if (codePoint < 128) {
            var c_3 = numberToChar(65533);
            var _unary__edvuaz_4 = length;
            length = _unary__edvuaz_4 + 1 | 0;
            chars[_unary__edvuaz_4] = c_3;
          } else {
            var c_4 = numberToChar(codePoint);
            var _unary__edvuaz_5 = length;
            length = _unary__edvuaz_5 + 1 | 0;
            chars[_unary__edvuaz_5] = c_4;
          }
          tmp$ret$5 = 2;
        }
        index = tmp + tmp$ret$5 | 0;
      } else {
        // Inline function 'okio.shr' call
        if (b0 >> 4 === -2) {
          var tmp_0 = index;
          var tmp2_0 = index;
          var tmp$ret$19;
          $l$block_4: {
            // Inline function 'okio.process3Utf8Bytes' call
            if (endIndex <= (tmp2_0 + 2 | 0)) {
              var c_5 = numberToChar(65533);
              var _unary__edvuaz_6 = length;
              length = _unary__edvuaz_6 + 1 | 0;
              chars[_unary__edvuaz_6] = c_5;
              var tmp_1;
              if (endIndex <= (tmp2_0 + 1 | 0)) {
                tmp_1 = true;
              } else {
                // Inline function 'okio.isUtf8Continuation' call
                // Inline function 'okio.and' call
                tmp_1 = !((_this__u8e3s4[tmp2_0 + 1 | 0] & 192) === 128);
              }
              if (tmp_1) {
                tmp$ret$19 = 1;
                break $l$block_4;
              } else {
                tmp$ret$19 = 2;
                break $l$block_4;
              }
            }
            var b0_1 = _this__u8e3s4[tmp2_0];
            var b1_0 = _this__u8e3s4[tmp2_0 + 1 | 0];
            // Inline function 'okio.isUtf8Continuation' call
            // Inline function 'okio.and' call
            if (!((b1_0 & 192) === 128)) {
              var c_6 = numberToChar(65533);
              var _unary__edvuaz_7 = length;
              length = _unary__edvuaz_7 + 1 | 0;
              chars[_unary__edvuaz_7] = c_6;
              tmp$ret$19 = 1;
              break $l$block_4;
            }
            var b2 = _this__u8e3s4[tmp2_0 + 2 | 0];
            // Inline function 'okio.isUtf8Continuation' call
            // Inline function 'okio.and' call
            if (!((b2 & 192) === 128)) {
              var c_7 = numberToChar(65533);
              var _unary__edvuaz_8 = length;
              length = _unary__edvuaz_8 + 1 | 0;
              chars[_unary__edvuaz_8] = c_7;
              tmp$ret$19 = 2;
              break $l$block_4;
            }
            var codePoint_0 = -123008 ^ b2 ^ b1_0 << 6 ^ b0_1 << 12;
            if (codePoint_0 < 2048) {
              var c_8 = numberToChar(65533);
              var _unary__edvuaz_9 = length;
              length = _unary__edvuaz_9 + 1 | 0;
              chars[_unary__edvuaz_9] = c_8;
            } else if (55296 <= codePoint_0 ? codePoint_0 <= 57343 : false) {
              var c_9 = numberToChar(65533);
              var _unary__edvuaz_10 = length;
              length = _unary__edvuaz_10 + 1 | 0;
              chars[_unary__edvuaz_10] = c_9;
            } else {
              var c_10 = numberToChar(codePoint_0);
              var _unary__edvuaz_11 = length;
              length = _unary__edvuaz_11 + 1 | 0;
              chars[_unary__edvuaz_11] = c_10;
            }
            tmp$ret$19 = 3;
          }
          index = tmp_0 + tmp$ret$19 | 0;
        } else {
          // Inline function 'okio.shr' call
          if (b0 >> 3 === -2) {
            var tmp_2 = index;
            var tmp2_1 = index;
            var tmp$ret$41;
            $l$block_10: {
              // Inline function 'okio.process4Utf8Bytes' call
              if (endIndex <= (tmp2_1 + 3 | 0)) {
                if (!(65533 === 65533)) {
                  var c_11 = numberToChar((65533 >>> 10 | 0) + 55232 | 0);
                  var _unary__edvuaz_12 = length;
                  length = _unary__edvuaz_12 + 1 | 0;
                  chars[_unary__edvuaz_12] = c_11;
                  var c_12 = numberToChar((65533 & 1023) + 56320 | 0);
                  var _unary__edvuaz_13 = length;
                  length = _unary__edvuaz_13 + 1 | 0;
                  chars[_unary__edvuaz_13] = c_12;
                } else {
                  var c_13 = _Char___init__impl__6a9atx(65533);
                  var _unary__edvuaz_14 = length;
                  length = _unary__edvuaz_14 + 1 | 0;
                  chars[_unary__edvuaz_14] = c_13;
                }
                var tmp_3;
                if (endIndex <= (tmp2_1 + 1 | 0)) {
                  tmp_3 = true;
                } else {
                  // Inline function 'okio.isUtf8Continuation' call
                  // Inline function 'okio.and' call
                  tmp_3 = !((_this__u8e3s4[tmp2_1 + 1 | 0] & 192) === 128);
                }
                if (tmp_3) {
                  tmp$ret$41 = 1;
                  break $l$block_10;
                } else {
                  var tmp_4;
                  if (endIndex <= (tmp2_1 + 2 | 0)) {
                    tmp_4 = true;
                  } else {
                    // Inline function 'okio.isUtf8Continuation' call
                    // Inline function 'okio.and' call
                    tmp_4 = !((_this__u8e3s4[tmp2_1 + 2 | 0] & 192) === 128);
                  }
                  if (tmp_4) {
                    tmp$ret$41 = 2;
                    break $l$block_10;
                  } else {
                    tmp$ret$41 = 3;
                    break $l$block_10;
                  }
                }
              }
              var b0_2 = _this__u8e3s4[tmp2_1];
              var b1_1 = _this__u8e3s4[tmp2_1 + 1 | 0];
              // Inline function 'okio.isUtf8Continuation' call
              // Inline function 'okio.and' call
              if (!((b1_1 & 192) === 128)) {
                if (!(65533 === 65533)) {
                  var c_14 = numberToChar((65533 >>> 10 | 0) + 55232 | 0);
                  var _unary__edvuaz_15 = length;
                  length = _unary__edvuaz_15 + 1 | 0;
                  chars[_unary__edvuaz_15] = c_14;
                  var c_15 = numberToChar((65533 & 1023) + 56320 | 0);
                  var _unary__edvuaz_16 = length;
                  length = _unary__edvuaz_16 + 1 | 0;
                  chars[_unary__edvuaz_16] = c_15;
                } else {
                  var c_16 = _Char___init__impl__6a9atx(65533);
                  var _unary__edvuaz_17 = length;
                  length = _unary__edvuaz_17 + 1 | 0;
                  chars[_unary__edvuaz_17] = c_16;
                }
                tmp$ret$41 = 1;
                break $l$block_10;
              }
              var b2_0 = _this__u8e3s4[tmp2_1 + 2 | 0];
              // Inline function 'okio.isUtf8Continuation' call
              // Inline function 'okio.and' call
              if (!((b2_0 & 192) === 128)) {
                if (!(65533 === 65533)) {
                  var c_17 = numberToChar((65533 >>> 10 | 0) + 55232 | 0);
                  var _unary__edvuaz_18 = length;
                  length = _unary__edvuaz_18 + 1 | 0;
                  chars[_unary__edvuaz_18] = c_17;
                  var c_18 = numberToChar((65533 & 1023) + 56320 | 0);
                  var _unary__edvuaz_19 = length;
                  length = _unary__edvuaz_19 + 1 | 0;
                  chars[_unary__edvuaz_19] = c_18;
                } else {
                  var c_19 = _Char___init__impl__6a9atx(65533);
                  var _unary__edvuaz_20 = length;
                  length = _unary__edvuaz_20 + 1 | 0;
                  chars[_unary__edvuaz_20] = c_19;
                }
                tmp$ret$41 = 2;
                break $l$block_10;
              }
              var b3 = _this__u8e3s4[tmp2_1 + 3 | 0];
              // Inline function 'okio.isUtf8Continuation' call
              // Inline function 'okio.and' call
              if (!((b3 & 192) === 128)) {
                if (!(65533 === 65533)) {
                  var c_20 = numberToChar((65533 >>> 10 | 0) + 55232 | 0);
                  var _unary__edvuaz_21 = length;
                  length = _unary__edvuaz_21 + 1 | 0;
                  chars[_unary__edvuaz_21] = c_20;
                  var c_21 = numberToChar((65533 & 1023) + 56320 | 0);
                  var _unary__edvuaz_22 = length;
                  length = _unary__edvuaz_22 + 1 | 0;
                  chars[_unary__edvuaz_22] = c_21;
                } else {
                  var c_22 = _Char___init__impl__6a9atx(65533);
                  var _unary__edvuaz_23 = length;
                  length = _unary__edvuaz_23 + 1 | 0;
                  chars[_unary__edvuaz_23] = c_22;
                }
                tmp$ret$41 = 3;
                break $l$block_10;
              }
              var codePoint_1 = 3678080 ^ b3 ^ b2_0 << 6 ^ b1_1 << 12 ^ b0_2 << 18;
              if (codePoint_1 > 1114111) {
                if (!(65533 === 65533)) {
                  var c_23 = numberToChar((65533 >>> 10 | 0) + 55232 | 0);
                  var _unary__edvuaz_24 = length;
                  length = _unary__edvuaz_24 + 1 | 0;
                  chars[_unary__edvuaz_24] = c_23;
                  var c_24 = numberToChar((65533 & 1023) + 56320 | 0);
                  var _unary__edvuaz_25 = length;
                  length = _unary__edvuaz_25 + 1 | 0;
                  chars[_unary__edvuaz_25] = c_24;
                } else {
                  var c_25 = _Char___init__impl__6a9atx(65533);
                  var _unary__edvuaz_26 = length;
                  length = _unary__edvuaz_26 + 1 | 0;
                  chars[_unary__edvuaz_26] = c_25;
                }
              } else if (55296 <= codePoint_1 ? codePoint_1 <= 57343 : false) {
                if (!(65533 === 65533)) {
                  var c_26 = numberToChar((65533 >>> 10 | 0) + 55232 | 0);
                  var _unary__edvuaz_27 = length;
                  length = _unary__edvuaz_27 + 1 | 0;
                  chars[_unary__edvuaz_27] = c_26;
                  var c_27 = numberToChar((65533 & 1023) + 56320 | 0);
                  var _unary__edvuaz_28 = length;
                  length = _unary__edvuaz_28 + 1 | 0;
                  chars[_unary__edvuaz_28] = c_27;
                } else {
                  var c_28 = _Char___init__impl__6a9atx(65533);
                  var _unary__edvuaz_29 = length;
                  length = _unary__edvuaz_29 + 1 | 0;
                  chars[_unary__edvuaz_29] = c_28;
                }
              } else if (codePoint_1 < 65536) {
                if (!(65533 === 65533)) {
                  var c_29 = numberToChar((65533 >>> 10 | 0) + 55232 | 0);
                  var _unary__edvuaz_30 = length;
                  length = _unary__edvuaz_30 + 1 | 0;
                  chars[_unary__edvuaz_30] = c_29;
                  var c_30 = numberToChar((65533 & 1023) + 56320 | 0);
                  var _unary__edvuaz_31 = length;
                  length = _unary__edvuaz_31 + 1 | 0;
                  chars[_unary__edvuaz_31] = c_30;
                } else {
                  var c_31 = _Char___init__impl__6a9atx(65533);
                  var _unary__edvuaz_32 = length;
                  length = _unary__edvuaz_32 + 1 | 0;
                  chars[_unary__edvuaz_32] = c_31;
                }
              } else {
                if (!(codePoint_1 === 65533)) {
                  var c_32 = numberToChar((codePoint_1 >>> 10 | 0) + 55232 | 0);
                  var _unary__edvuaz_33 = length;
                  length = _unary__edvuaz_33 + 1 | 0;
                  chars[_unary__edvuaz_33] = c_32;
                  var c_33 = numberToChar((codePoint_1 & 1023) + 56320 | 0);
                  var _unary__edvuaz_34 = length;
                  length = _unary__edvuaz_34 + 1 | 0;
                  chars[_unary__edvuaz_34] = c_33;
                } else {
                  var c_34 = _Char___init__impl__6a9atx(65533);
                  var _unary__edvuaz_35 = length;
                  length = _unary__edvuaz_35 + 1 | 0;
                  chars[_unary__edvuaz_35] = c_34;
                }
              }
              tmp$ret$41 = 4;
            }
            index = tmp_2 + tmp$ret$41 | 0;
          } else {
            var c_35 = _Char___init__impl__6a9atx(65533);
            var _unary__edvuaz_36 = length;
            length = _unary__edvuaz_36 + 1 | 0;
            chars[_unary__edvuaz_36] = c_35;
            index = index + 1 | 0;
          }
        }
      }
    }
  }
  return concatToString(chars, 0, length);
}
function get_HEX_DIGIT_CHARS() {
  _init_properties_ByteString_kt__sqjq7b();
  return HEX_DIGIT_CHARS;
}
var HEX_DIGIT_CHARS;
function codePointIndexToCharIndex(s, codePointCount) {
  _init_properties_ByteString_kt__sqjq7b();
  var charCount = 0;
  var j = 0;
  // Inline function 'okio.processUtf8CodePoints' call
  var endIndex = s.length;
  var index = 0;
  while (index < endIndex) {
    var b0 = s[index];
    if (b0 >= 0) {
      var _unary__edvuaz = j;
      j = _unary__edvuaz + 1 | 0;
      if (_unary__edvuaz === codePointCount) {
        return charCount;
      }
      var tmp;
      var tmp_0;
      var tmp_1;
      // Inline function 'kotlin.code' call
      var this_0 = _Char___init__impl__6a9atx(10);
      if (!(b0 === Char__toInt_impl_vasixd(this_0))) {
        // Inline function 'kotlin.code' call
        var this_1 = _Char___init__impl__6a9atx(13);
        tmp_1 = !(b0 === Char__toInt_impl_vasixd(this_1));
      } else {
        tmp_1 = false;
      }
      if (tmp_1) {
        // Inline function 'okio.isIsoControl' call
        tmp_0 = (0 <= b0 ? b0 <= 31 : false) || (127 <= b0 ? b0 <= 159 : false);
      } else {
        tmp_0 = false;
      }
      if (tmp_0) {
        tmp = true;
      } else {
        tmp = b0 === 65533;
      }
      if (tmp) {
        return -1;
      }
      charCount = charCount + (b0 < 65536 ? 1 : 2) | 0;
      index = index + 1 | 0;
      while (index < endIndex && s[index] >= 0) {
        var _unary__edvuaz_0 = index;
        index = _unary__edvuaz_0 + 1 | 0;
        var c = s[_unary__edvuaz_0];
        var _unary__edvuaz_1 = j;
        j = _unary__edvuaz_1 + 1 | 0;
        if (_unary__edvuaz_1 === codePointCount) {
          return charCount;
        }
        var tmp_2;
        var tmp_3;
        var tmp_4;
        // Inline function 'kotlin.code' call
        var this_2 = _Char___init__impl__6a9atx(10);
        if (!(c === Char__toInt_impl_vasixd(this_2))) {
          // Inline function 'kotlin.code' call
          var this_3 = _Char___init__impl__6a9atx(13);
          tmp_4 = !(c === Char__toInt_impl_vasixd(this_3));
        } else {
          tmp_4 = false;
        }
        if (tmp_4) {
          // Inline function 'okio.isIsoControl' call
          tmp_3 = (0 <= c ? c <= 31 : false) || (127 <= c ? c <= 159 : false);
        } else {
          tmp_3 = false;
        }
        if (tmp_3) {
          tmp_2 = true;
        } else {
          tmp_2 = c === 65533;
        }
        if (tmp_2) {
          return -1;
        }
        charCount = charCount + (c < 65536 ? 1 : 2) | 0;
      }
    } else {
      // Inline function 'okio.shr' call
      if (b0 >> 5 === -2) {
        var tmp_5 = index;
        var tmp2 = index;
        var tmp$ret$14;
        $l$block_0: {
          // Inline function 'okio.process2Utf8Bytes' call
          if (endIndex <= (tmp2 + 1 | 0)) {
            var _unary__edvuaz_2 = j;
            j = _unary__edvuaz_2 + 1 | 0;
            if (_unary__edvuaz_2 === codePointCount) {
              return charCount;
            }
            var tmp_6;
            var tmp_7;
            var tmp_8;
            // Inline function 'kotlin.code' call
            var this_4 = _Char___init__impl__6a9atx(10);
            if (!(65533 === Char__toInt_impl_vasixd(this_4))) {
              // Inline function 'kotlin.code' call
              var this_5 = _Char___init__impl__6a9atx(13);
              tmp_8 = !(65533 === Char__toInt_impl_vasixd(this_5));
            } else {
              tmp_8 = false;
            }
            if (tmp_8) {
              // Inline function 'okio.isIsoControl' call
              tmp_7 = (0 <= 65533 ? 65533 <= 31 : false) || (127 <= 65533 ? 65533 <= 159 : false);
            } else {
              tmp_7 = false;
            }
            if (tmp_7) {
              tmp_6 = true;
            } else {
              tmp_6 = 65533 === 65533;
            }
            if (tmp_6) {
              return -1;
            }
            charCount = charCount + (65533 < 65536 ? 1 : 2) | 0;
            tmp$ret$14 = 1;
            break $l$block_0;
          }
          var b0_0 = s[tmp2];
          var b1 = s[tmp2 + 1 | 0];
          // Inline function 'okio.isUtf8Continuation' call
          // Inline function 'okio.and' call
          if (!((b1 & 192) === 128)) {
            var _unary__edvuaz_3 = j;
            j = _unary__edvuaz_3 + 1 | 0;
            if (_unary__edvuaz_3 === codePointCount) {
              return charCount;
            }
            var tmp_9;
            var tmp_10;
            var tmp_11;
            // Inline function 'kotlin.code' call
            var this_6 = _Char___init__impl__6a9atx(10);
            if (!(65533 === Char__toInt_impl_vasixd(this_6))) {
              // Inline function 'kotlin.code' call
              var this_7 = _Char___init__impl__6a9atx(13);
              tmp_11 = !(65533 === Char__toInt_impl_vasixd(this_7));
            } else {
              tmp_11 = false;
            }
            if (tmp_11) {
              // Inline function 'okio.isIsoControl' call
              tmp_10 = (0 <= 65533 ? 65533 <= 31 : false) || (127 <= 65533 ? 65533 <= 159 : false);
            } else {
              tmp_10 = false;
            }
            if (tmp_10) {
              tmp_9 = true;
            } else {
              tmp_9 = 65533 === 65533;
            }
            if (tmp_9) {
              return -1;
            }
            charCount = charCount + (65533 < 65536 ? 1 : 2) | 0;
            tmp$ret$14 = 1;
            break $l$block_0;
          }
          var codePoint = 3968 ^ b1 ^ b0_0 << 6;
          if (codePoint < 128) {
            var _unary__edvuaz_4 = j;
            j = _unary__edvuaz_4 + 1 | 0;
            if (_unary__edvuaz_4 === codePointCount) {
              return charCount;
            }
            var tmp_12;
            var tmp_13;
            var tmp_14;
            // Inline function 'kotlin.code' call
            var this_8 = _Char___init__impl__6a9atx(10);
            if (!(65533 === Char__toInt_impl_vasixd(this_8))) {
              // Inline function 'kotlin.code' call
              var this_9 = _Char___init__impl__6a9atx(13);
              tmp_14 = !(65533 === Char__toInt_impl_vasixd(this_9));
            } else {
              tmp_14 = false;
            }
            if (tmp_14) {
              // Inline function 'okio.isIsoControl' call
              tmp_13 = (0 <= 65533 ? 65533 <= 31 : false) || (127 <= 65533 ? 65533 <= 159 : false);
            } else {
              tmp_13 = false;
            }
            if (tmp_13) {
              tmp_12 = true;
            } else {
              tmp_12 = 65533 === 65533;
            }
            if (tmp_12) {
              return -1;
            }
            charCount = charCount + (65533 < 65536 ? 1 : 2) | 0;
          } else {
            var _unary__edvuaz_5 = j;
            j = _unary__edvuaz_5 + 1 | 0;
            if (_unary__edvuaz_5 === codePointCount) {
              return charCount;
            }
            var tmp_15;
            var tmp_16;
            var tmp_17;
            // Inline function 'kotlin.code' call
            var this_10 = _Char___init__impl__6a9atx(10);
            if (!(codePoint === Char__toInt_impl_vasixd(this_10))) {
              // Inline function 'kotlin.code' call
              var this_11 = _Char___init__impl__6a9atx(13);
              tmp_17 = !(codePoint === Char__toInt_impl_vasixd(this_11));
            } else {
              tmp_17 = false;
            }
            if (tmp_17) {
              // Inline function 'okio.isIsoControl' call
              tmp_16 = (0 <= codePoint ? codePoint <= 31 : false) || (127 <= codePoint ? codePoint <= 159 : false);
            } else {
              tmp_16 = false;
            }
            if (tmp_16) {
              tmp_15 = true;
            } else {
              tmp_15 = codePoint === 65533;
            }
            if (tmp_15) {
              return -1;
            }
            charCount = charCount + (codePoint < 65536 ? 1 : 2) | 0;
          }
          tmp$ret$14 = 2;
        }
        index = tmp_5 + tmp$ret$14 | 0;
      } else {
        // Inline function 'okio.shr' call
        if (b0 >> 4 === -2) {
          var tmp_18 = index;
          var tmp2_0 = index;
          var tmp$ret$40;
          $l$block_4: {
            // Inline function 'okio.process3Utf8Bytes' call
            if (endIndex <= (tmp2_0 + 2 | 0)) {
              var _unary__edvuaz_6 = j;
              j = _unary__edvuaz_6 + 1 | 0;
              if (_unary__edvuaz_6 === codePointCount) {
                return charCount;
              }
              var tmp_19;
              var tmp_20;
              var tmp_21;
              // Inline function 'kotlin.code' call
              var this_12 = _Char___init__impl__6a9atx(10);
              if (!(65533 === Char__toInt_impl_vasixd(this_12))) {
                // Inline function 'kotlin.code' call
                var this_13 = _Char___init__impl__6a9atx(13);
                tmp_21 = !(65533 === Char__toInt_impl_vasixd(this_13));
              } else {
                tmp_21 = false;
              }
              if (tmp_21) {
                // Inline function 'okio.isIsoControl' call
                tmp_20 = (0 <= 65533 ? 65533 <= 31 : false) || (127 <= 65533 ? 65533 <= 159 : false);
              } else {
                tmp_20 = false;
              }
              if (tmp_20) {
                tmp_19 = true;
              } else {
                tmp_19 = 65533 === 65533;
              }
              if (tmp_19) {
                return -1;
              }
              charCount = charCount + (65533 < 65536 ? 1 : 2) | 0;
              var tmp_22;
              if (endIndex <= (tmp2_0 + 1 | 0)) {
                tmp_22 = true;
              } else {
                // Inline function 'okio.isUtf8Continuation' call
                // Inline function 'okio.and' call
                tmp_22 = !((s[tmp2_0 + 1 | 0] & 192) === 128);
              }
              if (tmp_22) {
                tmp$ret$40 = 1;
                break $l$block_4;
              } else {
                tmp$ret$40 = 2;
                break $l$block_4;
              }
            }
            var b0_1 = s[tmp2_0];
            var b1_0 = s[tmp2_0 + 1 | 0];
            // Inline function 'okio.isUtf8Continuation' call
            // Inline function 'okio.and' call
            if (!((b1_0 & 192) === 128)) {
              var _unary__edvuaz_7 = j;
              j = _unary__edvuaz_7 + 1 | 0;
              if (_unary__edvuaz_7 === codePointCount) {
                return charCount;
              }
              var tmp_23;
              var tmp_24;
              var tmp_25;
              // Inline function 'kotlin.code' call
              var this_14 = _Char___init__impl__6a9atx(10);
              if (!(65533 === Char__toInt_impl_vasixd(this_14))) {
                // Inline function 'kotlin.code' call
                var this_15 = _Char___init__impl__6a9atx(13);
                tmp_25 = !(65533 === Char__toInt_impl_vasixd(this_15));
              } else {
                tmp_25 = false;
              }
              if (tmp_25) {
                // Inline function 'okio.isIsoControl' call
                tmp_24 = (0 <= 65533 ? 65533 <= 31 : false) || (127 <= 65533 ? 65533 <= 159 : false);
              } else {
                tmp_24 = false;
              }
              if (tmp_24) {
                tmp_23 = true;
              } else {
                tmp_23 = 65533 === 65533;
              }
              if (tmp_23) {
                return -1;
              }
              charCount = charCount + (65533 < 65536 ? 1 : 2) | 0;
              tmp$ret$40 = 1;
              break $l$block_4;
            }
            var b2 = s[tmp2_0 + 2 | 0];
            // Inline function 'okio.isUtf8Continuation' call
            // Inline function 'okio.and' call
            if (!((b2 & 192) === 128)) {
              var _unary__edvuaz_8 = j;
              j = _unary__edvuaz_8 + 1 | 0;
              if (_unary__edvuaz_8 === codePointCount) {
                return charCount;
              }
              var tmp_26;
              var tmp_27;
              var tmp_28;
              // Inline function 'kotlin.code' call
              var this_16 = _Char___init__impl__6a9atx(10);
              if (!(65533 === Char__toInt_impl_vasixd(this_16))) {
                // Inline function 'kotlin.code' call
                var this_17 = _Char___init__impl__6a9atx(13);
                tmp_28 = !(65533 === Char__toInt_impl_vasixd(this_17));
              } else {
                tmp_28 = false;
              }
              if (tmp_28) {
                // Inline function 'okio.isIsoControl' call
                tmp_27 = (0 <= 65533 ? 65533 <= 31 : false) || (127 <= 65533 ? 65533 <= 159 : false);
              } else {
                tmp_27 = false;
              }
              if (tmp_27) {
                tmp_26 = true;
              } else {
                tmp_26 = 65533 === 65533;
              }
              if (tmp_26) {
                return -1;
              }
              charCount = charCount + (65533 < 65536 ? 1 : 2) | 0;
              tmp$ret$40 = 2;
              break $l$block_4;
            }
            var codePoint_0 = -123008 ^ b2 ^ b1_0 << 6 ^ b0_1 << 12;
            if (codePoint_0 < 2048) {
              var _unary__edvuaz_9 = j;
              j = _unary__edvuaz_9 + 1 | 0;
              if (_unary__edvuaz_9 === codePointCount) {
                return charCount;
              }
              var tmp_29;
              var tmp_30;
              var tmp_31;
              // Inline function 'kotlin.code' call
              var this_18 = _Char___init__impl__6a9atx(10);
              if (!(65533 === Char__toInt_impl_vasixd(this_18))) {
                // Inline function 'kotlin.code' call
                var this_19 = _Char___init__impl__6a9atx(13);
                tmp_31 = !(65533 === Char__toInt_impl_vasixd(this_19));
              } else {
                tmp_31 = false;
              }
              if (tmp_31) {
                // Inline function 'okio.isIsoControl' call
                tmp_30 = (0 <= 65533 ? 65533 <= 31 : false) || (127 <= 65533 ? 65533 <= 159 : false);
              } else {
                tmp_30 = false;
              }
              if (tmp_30) {
                tmp_29 = true;
              } else {
                tmp_29 = 65533 === 65533;
              }
              if (tmp_29) {
                return -1;
              }
              charCount = charCount + (65533 < 65536 ? 1 : 2) | 0;
            } else if (55296 <= codePoint_0 ? codePoint_0 <= 57343 : false) {
              var _unary__edvuaz_10 = j;
              j = _unary__edvuaz_10 + 1 | 0;
              if (_unary__edvuaz_10 === codePointCount) {
                return charCount;
              }
              var tmp_32;
              var tmp_33;
              var tmp_34;
              // Inline function 'kotlin.code' call
              var this_20 = _Char___init__impl__6a9atx(10);
              if (!(65533 === Char__toInt_impl_vasixd(this_20))) {
                // Inline function 'kotlin.code' call
                var this_21 = _Char___init__impl__6a9atx(13);
                tmp_34 = !(65533 === Char__toInt_impl_vasixd(this_21));
              } else {
                tmp_34 = false;
              }
              if (tmp_34) {
                // Inline function 'okio.isIsoControl' call
                tmp_33 = (0 <= 65533 ? 65533 <= 31 : false) || (127 <= 65533 ? 65533 <= 159 : false);
              } else {
                tmp_33 = false;
              }
              if (tmp_33) {
                tmp_32 = true;
              } else {
                tmp_32 = 65533 === 65533;
              }
              if (tmp_32) {
                return -1;
              }
              charCount = charCount + (65533 < 65536 ? 1 : 2) | 0;
            } else {
              var _unary__edvuaz_11 = j;
              j = _unary__edvuaz_11 + 1 | 0;
              if (_unary__edvuaz_11 === codePointCount) {
                return charCount;
              }
              var tmp_35;
              var tmp_36;
              var tmp_37;
              // Inline function 'kotlin.code' call
              var this_22 = _Char___init__impl__6a9atx(10);
              if (!(codePoint_0 === Char__toInt_impl_vasixd(this_22))) {
                // Inline function 'kotlin.code' call
                var this_23 = _Char___init__impl__6a9atx(13);
                tmp_37 = !(codePoint_0 === Char__toInt_impl_vasixd(this_23));
              } else {
                tmp_37 = false;
              }
              if (tmp_37) {
                // Inline function 'okio.isIsoControl' call
                tmp_36 = (0 <= codePoint_0 ? codePoint_0 <= 31 : false) || (127 <= codePoint_0 ? codePoint_0 <= 159 : false);
              } else {
                tmp_36 = false;
              }
              if (tmp_36) {
                tmp_35 = true;
              } else {
                tmp_35 = codePoint_0 === 65533;
              }
              if (tmp_35) {
                return -1;
              }
              charCount = charCount + (codePoint_0 < 65536 ? 1 : 2) | 0;
            }
            tmp$ret$40 = 3;
          }
          index = tmp_18 + tmp$ret$40 | 0;
        } else {
          // Inline function 'okio.shr' call
          if (b0 >> 3 === -2) {
            var tmp_38 = index;
            var tmp2_1 = index;
            var tmp$ret$78;
            $l$block_10: {
              // Inline function 'okio.process4Utf8Bytes' call
              if (endIndex <= (tmp2_1 + 3 | 0)) {
                var _unary__edvuaz_12 = j;
                j = _unary__edvuaz_12 + 1 | 0;
                if (_unary__edvuaz_12 === codePointCount) {
                  return charCount;
                }
                var tmp_39;
                var tmp_40;
                var tmp_41;
                // Inline function 'kotlin.code' call
                var this_24 = _Char___init__impl__6a9atx(10);
                if (!(65533 === Char__toInt_impl_vasixd(this_24))) {
                  // Inline function 'kotlin.code' call
                  var this_25 = _Char___init__impl__6a9atx(13);
                  tmp_41 = !(65533 === Char__toInt_impl_vasixd(this_25));
                } else {
                  tmp_41 = false;
                }
                if (tmp_41) {
                  // Inline function 'okio.isIsoControl' call
                  tmp_40 = (0 <= 65533 ? 65533 <= 31 : false) || (127 <= 65533 ? 65533 <= 159 : false);
                } else {
                  tmp_40 = false;
                }
                if (tmp_40) {
                  tmp_39 = true;
                } else {
                  tmp_39 = 65533 === 65533;
                }
                if (tmp_39) {
                  return -1;
                }
                charCount = charCount + (65533 < 65536 ? 1 : 2) | 0;
                var tmp_42;
                if (endIndex <= (tmp2_1 + 1 | 0)) {
                  tmp_42 = true;
                } else {
                  // Inline function 'okio.isUtf8Continuation' call
                  // Inline function 'okio.and' call
                  tmp_42 = !((s[tmp2_1 + 1 | 0] & 192) === 128);
                }
                if (tmp_42) {
                  tmp$ret$78 = 1;
                  break $l$block_10;
                } else {
                  var tmp_43;
                  if (endIndex <= (tmp2_1 + 2 | 0)) {
                    tmp_43 = true;
                  } else {
                    // Inline function 'okio.isUtf8Continuation' call
                    // Inline function 'okio.and' call
                    tmp_43 = !((s[tmp2_1 + 2 | 0] & 192) === 128);
                  }
                  if (tmp_43) {
                    tmp$ret$78 = 2;
                    break $l$block_10;
                  } else {
                    tmp$ret$78 = 3;
                    break $l$block_10;
                  }
                }
              }
              var b0_2 = s[tmp2_1];
              var b1_1 = s[tmp2_1 + 1 | 0];
              // Inline function 'okio.isUtf8Continuation' call
              // Inline function 'okio.and' call
              if (!((b1_1 & 192) === 128)) {
                var _unary__edvuaz_13 = j;
                j = _unary__edvuaz_13 + 1 | 0;
                if (_unary__edvuaz_13 === codePointCount) {
                  return charCount;
                }
                var tmp_44;
                var tmp_45;
                var tmp_46;
                // Inline function 'kotlin.code' call
                var this_26 = _Char___init__impl__6a9atx(10);
                if (!(65533 === Char__toInt_impl_vasixd(this_26))) {
                  // Inline function 'kotlin.code' call
                  var this_27 = _Char___init__impl__6a9atx(13);
                  tmp_46 = !(65533 === Char__toInt_impl_vasixd(this_27));
                } else {
                  tmp_46 = false;
                }
                if (tmp_46) {
                  // Inline function 'okio.isIsoControl' call
                  tmp_45 = (0 <= 65533 ? 65533 <= 31 : false) || (127 <= 65533 ? 65533 <= 159 : false);
                } else {
                  tmp_45 = false;
                }
                if (tmp_45) {
                  tmp_44 = true;
                } else {
                  tmp_44 = 65533 === 65533;
                }
                if (tmp_44) {
                  return -1;
                }
                charCount = charCount + (65533 < 65536 ? 1 : 2) | 0;
                tmp$ret$78 = 1;
                break $l$block_10;
              }
              var b2_0 = s[tmp2_1 + 2 | 0];
              // Inline function 'okio.isUtf8Continuation' call
              // Inline function 'okio.and' call
              if (!((b2_0 & 192) === 128)) {
                var _unary__edvuaz_14 = j;
                j = _unary__edvuaz_14 + 1 | 0;
                if (_unary__edvuaz_14 === codePointCount) {
                  return charCount;
                }
                var tmp_47;
                var tmp_48;
                var tmp_49;
                // Inline function 'kotlin.code' call
                var this_28 = _Char___init__impl__6a9atx(10);
                if (!(65533 === Char__toInt_impl_vasixd(this_28))) {
                  // Inline function 'kotlin.code' call
                  var this_29 = _Char___init__impl__6a9atx(13);
                  tmp_49 = !(65533 === Char__toInt_impl_vasixd(this_29));
                } else {
                  tmp_49 = false;
                }
                if (tmp_49) {
                  // Inline function 'okio.isIsoControl' call
                  tmp_48 = (0 <= 65533 ? 65533 <= 31 : false) || (127 <= 65533 ? 65533 <= 159 : false);
                } else {
                  tmp_48 = false;
                }
                if (tmp_48) {
                  tmp_47 = true;
                } else {
                  tmp_47 = 65533 === 65533;
                }
                if (tmp_47) {
                  return -1;
                }
                charCount = charCount + (65533 < 65536 ? 1 : 2) | 0;
                tmp$ret$78 = 2;
                break $l$block_10;
              }
              var b3 = s[tmp2_1 + 3 | 0];
              // Inline function 'okio.isUtf8Continuation' call
              // Inline function 'okio.and' call
              if (!((b3 & 192) === 128)) {
                var _unary__edvuaz_15 = j;
                j = _unary__edvuaz_15 + 1 | 0;
                if (_unary__edvuaz_15 === codePointCount) {
                  return charCount;
                }
                var tmp_50;
                var tmp_51;
                var tmp_52;
                // Inline function 'kotlin.code' call
                var this_30 = _Char___init__impl__6a9atx(10);
                if (!(65533 === Char__toInt_impl_vasixd(this_30))) {
                  // Inline function 'kotlin.code' call
                  var this_31 = _Char___init__impl__6a9atx(13);
                  tmp_52 = !(65533 === Char__toInt_impl_vasixd(this_31));
                } else {
                  tmp_52 = false;
                }
                if (tmp_52) {
                  // Inline function 'okio.isIsoControl' call
                  tmp_51 = (0 <= 65533 ? 65533 <= 31 : false) || (127 <= 65533 ? 65533 <= 159 : false);
                } else {
                  tmp_51 = false;
                }
                if (tmp_51) {
                  tmp_50 = true;
                } else {
                  tmp_50 = 65533 === 65533;
                }
                if (tmp_50) {
                  return -1;
                }
                charCount = charCount + (65533 < 65536 ? 1 : 2) | 0;
                tmp$ret$78 = 3;
                break $l$block_10;
              }
              var codePoint_1 = 3678080 ^ b3 ^ b2_0 << 6 ^ b1_1 << 12 ^ b0_2 << 18;
              if (codePoint_1 > 1114111) {
                var _unary__edvuaz_16 = j;
                j = _unary__edvuaz_16 + 1 | 0;
                if (_unary__edvuaz_16 === codePointCount) {
                  return charCount;
                }
                var tmp_53;
                var tmp_54;
                var tmp_55;
                // Inline function 'kotlin.code' call
                var this_32 = _Char___init__impl__6a9atx(10);
                if (!(65533 === Char__toInt_impl_vasixd(this_32))) {
                  // Inline function 'kotlin.code' call
                  var this_33 = _Char___init__impl__6a9atx(13);
                  tmp_55 = !(65533 === Char__toInt_impl_vasixd(this_33));
                } else {
                  tmp_55 = false;
                }
                if (tmp_55) {
                  // Inline function 'okio.isIsoControl' call
                  tmp_54 = (0 <= 65533 ? 65533 <= 31 : false) || (127 <= 65533 ? 65533 <= 159 : false);
                } else {
                  tmp_54 = false;
                }
                if (tmp_54) {
                  tmp_53 = true;
                } else {
                  tmp_53 = 65533 === 65533;
                }
                if (tmp_53) {
                  return -1;
                }
                charCount = charCount + (65533 < 65536 ? 1 : 2) | 0;
              } else if (55296 <= codePoint_1 ? codePoint_1 <= 57343 : false) {
                var _unary__edvuaz_17 = j;
                j = _unary__edvuaz_17 + 1 | 0;
                if (_unary__edvuaz_17 === codePointCount) {
                  return charCount;
                }
                var tmp_56;
                var tmp_57;
                var tmp_58;
                // Inline function 'kotlin.code' call
                var this_34 = _Char___init__impl__6a9atx(10);
                if (!(65533 === Char__toInt_impl_vasixd(this_34))) {
                  // Inline function 'kotlin.code' call
                  var this_35 = _Char___init__impl__6a9atx(13);
                  tmp_58 = !(65533 === Char__toInt_impl_vasixd(this_35));
                } else {
                  tmp_58 = false;
                }
                if (tmp_58) {
                  // Inline function 'okio.isIsoControl' call
                  tmp_57 = (0 <= 65533 ? 65533 <= 31 : false) || (127 <= 65533 ? 65533 <= 159 : false);
                } else {
                  tmp_57 = false;
                }
                if (tmp_57) {
                  tmp_56 = true;
                } else {
                  tmp_56 = 65533 === 65533;
                }
                if (tmp_56) {
                  return -1;
                }
                charCount = charCount + (65533 < 65536 ? 1 : 2) | 0;
              } else if (codePoint_1 < 65536) {
                var _unary__edvuaz_18 = j;
                j = _unary__edvuaz_18 + 1 | 0;
                if (_unary__edvuaz_18 === codePointCount) {
                  return charCount;
                }
                var tmp_59;
                var tmp_60;
                var tmp_61;
                // Inline function 'kotlin.code' call
                var this_36 = _Char___init__impl__6a9atx(10);
                if (!(65533 === Char__toInt_impl_vasixd(this_36))) {
                  // Inline function 'kotlin.code' call
                  var this_37 = _Char___init__impl__6a9atx(13);
                  tmp_61 = !(65533 === Char__toInt_impl_vasixd(this_37));
                } else {
                  tmp_61 = false;
                }
                if (tmp_61) {
                  // Inline function 'okio.isIsoControl' call
                  tmp_60 = (0 <= 65533 ? 65533 <= 31 : false) || (127 <= 65533 ? 65533 <= 159 : false);
                } else {
                  tmp_60 = false;
                }
                if (tmp_60) {
                  tmp_59 = true;
                } else {
                  tmp_59 = 65533 === 65533;
                }
                if (tmp_59) {
                  return -1;
                }
                charCount = charCount + (65533 < 65536 ? 1 : 2) | 0;
              } else {
                var _unary__edvuaz_19 = j;
                j = _unary__edvuaz_19 + 1 | 0;
                if (_unary__edvuaz_19 === codePointCount) {
                  return charCount;
                }
                var tmp_62;
                var tmp_63;
                var tmp_64;
                // Inline function 'kotlin.code' call
                var this_38 = _Char___init__impl__6a9atx(10);
                if (!(codePoint_1 === Char__toInt_impl_vasixd(this_38))) {
                  // Inline function 'kotlin.code' call
                  var this_39 = _Char___init__impl__6a9atx(13);
                  tmp_64 = !(codePoint_1 === Char__toInt_impl_vasixd(this_39));
                } else {
                  tmp_64 = false;
                }
                if (tmp_64) {
                  // Inline function 'okio.isIsoControl' call
                  tmp_63 = (0 <= codePoint_1 ? codePoint_1 <= 31 : false) || (127 <= codePoint_1 ? codePoint_1 <= 159 : false);
                } else {
                  tmp_63 = false;
                }
                if (tmp_63) {
                  tmp_62 = true;
                } else {
                  tmp_62 = codePoint_1 === 65533;
                }
                if (tmp_62) {
                  return -1;
                }
                charCount = charCount + (codePoint_1 < 65536 ? 1 : 2) | 0;
              }
              tmp$ret$78 = 4;
            }
            index = tmp_38 + tmp$ret$78 | 0;
          } else {
            var _unary__edvuaz_20 = j;
            j = _unary__edvuaz_20 + 1 | 0;
            if (_unary__edvuaz_20 === codePointCount) {
              return charCount;
            }
            var tmp_65;
            var tmp_66;
            var tmp_67;
            // Inline function 'kotlin.code' call
            var this_40 = _Char___init__impl__6a9atx(10);
            if (!(65533 === Char__toInt_impl_vasixd(this_40))) {
              // Inline function 'kotlin.code' call
              var this_41 = _Char___init__impl__6a9atx(13);
              tmp_67 = !(65533 === Char__toInt_impl_vasixd(this_41));
            } else {
              tmp_67 = false;
            }
            if (tmp_67) {
              // Inline function 'okio.isIsoControl' call
              tmp_66 = (0 <= 65533 ? 65533 <= 31 : false) || (127 <= 65533 ? 65533 <= 159 : false);
            } else {
              tmp_66 = false;
            }
            if (tmp_66) {
              tmp_65 = true;
            } else {
              tmp_65 = 65533 === 65533;
            }
            if (tmp_65) {
              return -1;
            }
            charCount = charCount + (65533 < 65536 ? 1 : 2) | 0;
            index = index + 1 | 0;
          }
        }
      }
    }
  }
  return charCount;
}
function access$codePointIndexToCharIndex$tByteStringKt(s, codePointCount) {
  return codePointIndexToCharIndex(s, codePointCount);
}
var properties_initialized_ByteString_kt_8ybv8b;
function _init_properties_ByteString_kt__sqjq7b() {
  if (!properties_initialized_ByteString_kt_8ybv8b) {
    properties_initialized_ByteString_kt_8ybv8b = true;
    // Inline function 'kotlin.charArrayOf' call
    HEX_DIGIT_CHARS = charArrayOf([_Char___init__impl__6a9atx(48), _Char___init__impl__6a9atx(49), _Char___init__impl__6a9atx(50), _Char___init__impl__6a9atx(51), _Char___init__impl__6a9atx(52), _Char___init__impl__6a9atx(53), _Char___init__impl__6a9atx(54), _Char___init__impl__6a9atx(55), _Char___init__impl__6a9atx(56), _Char___init__impl__6a9atx(57), _Char___init__impl__6a9atx(97), _Char___init__impl__6a9atx(98), _Char___init__impl__6a9atx(99), _Char___init__impl__6a9atx(100), _Char___init__impl__6a9atx(101), _Char___init__impl__6a9atx(102)]);
  }
}
function segment(_this__u8e3s4, pos) {
  var i = binarySearch(_this__u8e3s4.q1g_1, pos + 1 | 0, 0, _this__u8e3s4.p1g_1.length);
  return i >= 0 ? i : ~i;
}
function binarySearch(_this__u8e3s4, value, fromIndex, toIndex) {
  var left = fromIndex;
  var right = toIndex - 1 | 0;
  while (left <= right) {
    var mid = (left + right | 0) >>> 1 | 0;
    var midVal = _this__u8e3s4[mid];
    if (midVal < value)
      left = mid + 1 | 0;
    else if (midVal > value)
      right = mid - 1 | 0;
    else
      return mid;
  }
  return (-left | 0) - 1 | 0;
}
function Companion_0() {
  Companion_instance_0 = this;
  var tmp = this;
  // Inline function 'kotlin.byteArrayOf' call
  var tmp$ret$0 = new Int8Array([]);
  tmp.r1g_1 = new ByteString(tmp$ret$0);
}
var Companion_instance_0;
function Companion_getInstance_0() {
  if (Companion_instance_0 == null)
    new Companion_0();
  return Companion_instance_0;
}
function ByteString(data) {
  Companion_getInstance_0();
  this.j1g_1 = data;
  this.k1g_1 = 0;
  this.l1g_1 = null;
}
protoOf(ByteString).s1g = function (value) {
};
protoOf(ByteString).t1g = function (value) {
};
protoOf(ByteString).u1g = function () {
  // Inline function 'okio.internal.commonUtf8' call
  var result = this.l1g_1;
  if (result == null) {
    result = toUtf8String(this.v1g());
    this.t1g(result);
  }
  return result;
};
protoOf(ByteString).w1g = function () {
  // Inline function 'okio.internal.commonHex' call
  var result = charArray(imul(this.j1g_1.length, 2));
  var c = 0;
  var indexedObject = this.j1g_1;
  var inductionVariable = 0;
  var last = indexedObject.length;
  while (inductionVariable < last) {
    var b = indexedObject[inductionVariable];
    inductionVariable = inductionVariable + 1 | 0;
    var _unary__edvuaz = c;
    c = _unary__edvuaz + 1 | 0;
    var tmp = get_HEX_DIGIT_CHARS();
    // Inline function 'okio.shr' call
    result[_unary__edvuaz] = tmp[b >> 4 & 15];
    var _unary__edvuaz_0 = c;
    c = _unary__edvuaz_0 + 1 | 0;
    var tmp_0 = get_HEX_DIGIT_CHARS();
    // Inline function 'okio.and' call
    result[_unary__edvuaz_0] = tmp_0[b & 15];
  }
  return concatToString_0(result);
};
protoOf(ByteString).x1g = function (pos) {
  if (pos >= this.t() || pos < 0)
    throw new ArrayIndexOutOfBoundsException('size=' + this.t() + ' pos=' + pos);
  // Inline function 'okio.internal.commonGetByte' call
  return this.j1g_1[pos];
};
protoOf(ByteString).v = function (index) {
  return this.x1g(index);
};
protoOf(ByteString).t = function () {
  return this.y1g();
};
protoOf(ByteString).y1g = function () {
  // Inline function 'okio.internal.commonGetSize' call
  return this.j1g_1.length;
};
protoOf(ByteString).v1g = function () {
  // Inline function 'okio.internal.commonInternalArray' call
  return this.j1g_1;
};
protoOf(ByteString).z1g = function (offset, other, otherOffset, byteCount) {
  // Inline function 'okio.internal.commonRangeEquals' call
  return offset >= 0 && offset <= (this.j1g_1.length - byteCount | 0) && otherOffset >= 0 && otherOffset <= (other.length - byteCount | 0) && arrayRangeEquals(this.j1g_1, offset, other, otherOffset, byteCount);
};
protoOf(ByteString).equals = function (other) {
  // Inline function 'okio.internal.commonEquals' call
  var tmp;
  if (other === this) {
    tmp = true;
  } else {
    if (other instanceof ByteString) {
      tmp = (other.t() === this.j1g_1.length && other.z1g(0, this.j1g_1, 0, this.j1g_1.length));
    } else {
      tmp = false;
    }
  }
  return tmp;
};
protoOf(ByteString).hashCode = function () {
  var tmp$ret$0;
  $l$block: {
    // Inline function 'okio.internal.commonHashCode' call
    var result = this.k1g_1;
    if (!(result === 0)) {
      tmp$ret$0 = result;
      break $l$block;
    }
    // Inline function 'kotlin.also' call
    var this_0 = contentHashCode(this.j1g_1);
    this.s1g(this_0);
    tmp$ret$0 = this_0;
  }
  return tmp$ret$0;
};
protoOf(ByteString).a1h = function (other) {
  var tmp$ret$3;
  $l$block_0: {
    // Inline function 'okio.internal.commonCompareTo' call
    var sizeA = this.t();
    var sizeB = other.t();
    var i = 0;
    // Inline function 'kotlin.comparisons.minOf' call
    var size = Math.min(sizeA, sizeB);
    $l$loop: while (i < size) {
      // Inline function 'okio.and' call
      var byteA = this.v(i) & 255;
      // Inline function 'okio.and' call
      var byteB = other.v(i) & 255;
      if (byteA === byteB) {
        i = i + 1 | 0;
        continue $l$loop;
      }
      tmp$ret$3 = byteA < byteB ? -1 : 1;
      break $l$block_0;
    }
    if (sizeA === sizeB) {
      tmp$ret$3 = 0;
      break $l$block_0;
    }
    tmp$ret$3 = sizeA < sizeB ? -1 : 1;
  }
  return tmp$ret$3;
};
protoOf(ByteString).w1 = function (other) {
  return this.a1h(other instanceof ByteString ? other : THROW_CCE());
};
protoOf(ByteString).toString = function () {
  var tmp$ret$1;
  $l$block_1: {
    // Inline function 'okio.internal.commonToString' call
    // Inline function 'kotlin.collections.isEmpty' call
    if (this.j1g_1.length === 0) {
      tmp$ret$1 = '[size=0]';
      break $l$block_1;
    }
    var i = access$codePointIndexToCharIndex$tByteStringKt(this.j1g_1, 64);
    if (i === -1) {
      var tmp;
      if (this.j1g_1.length <= 64) {
        tmp = '[hex=' + this.w1g() + ']';
      } else {
        var tmp_0 = this.j1g_1.length;
        var tmp$ret$8;
        $l$block_0: {
          // Inline function 'okio.internal.commonSubstring' call
          var endIndex = resolveDefaultParameter(this, 64);
          // Inline function 'kotlin.require' call
          if (!(0 >= 0)) {
            var message = 'beginIndex < 0';
            throw IllegalArgumentException_init_$Create$(toString(message));
          }
          // Inline function 'kotlin.require' call
          if (!(endIndex <= this.j1g_1.length)) {
            var message_0 = 'endIndex > length(' + this.j1g_1.length + ')';
            throw IllegalArgumentException_init_$Create$(toString(message_0));
          }
          var subLen = endIndex - 0 | 0;
          // Inline function 'kotlin.require' call
          if (!(subLen >= 0)) {
            var message_1 = 'endIndex < beginIndex';
            throw IllegalArgumentException_init_$Create$(toString(message_1));
          }
          if (0 === 0 && endIndex === this.j1g_1.length) {
            tmp$ret$8 = this;
            break $l$block_0;
          }
          tmp$ret$8 = new ByteString(copyOfRange(this.j1g_1, 0, endIndex));
        }
        tmp = '[size=' + tmp_0 + ' hex=' + tmp$ret$8.w1g() + '\u2026]';
      }
      tmp$ret$1 = tmp;
      break $l$block_1;
    }
    var text = this.u1g();
    var safeText = replace(replace(replace(substring(text, 0, i), '\\', '\\\\'), '\n', '\\n'), '\r', '\\r');
    var tmp_1;
    if (i < text.length) {
      tmp_1 = '[size=' + this.j1g_1.length + ' text=' + safeText + '\u2026]';
    } else {
      tmp_1 = '[text=' + safeText + ']';
    }
    tmp$ret$1 = tmp_1;
  }
  return tmp$ret$1;
};
function toByteString($this) {
  return new ByteString($this.b1h());
}
function SegmentedByteString(segments, directory) {
  ByteString.call(this, Companion_getInstance_0().r1g_1.j1g_1);
  this.p1g_1 = segments;
  this.q1g_1 = directory;
}
protoOf(SegmentedByteString).w1g = function () {
  return toByteString(this).w1g();
};
protoOf(SegmentedByteString).x1g = function (pos) {
  // Inline function 'okio.internal.commonInternalGet' call
  checkOffsetAndCount(fromInt(this.q1g_1[this.p1g_1.length - 1 | 0]), fromInt(pos), new Long(1, 0));
  var segment_0 = segment(this, pos);
  var segmentOffset = segment_0 === 0 ? 0 : this.q1g_1[segment_0 - 1 | 0];
  var segmentPos = this.q1g_1[segment_0 + this.p1g_1.length | 0];
  return this.p1g_1[segment_0][(pos - segmentOffset | 0) + segmentPos | 0];
};
protoOf(SegmentedByteString).y1g = function () {
  // Inline function 'okio.internal.commonGetSize' call
  return this.q1g_1[this.p1g_1.length - 1 | 0];
};
protoOf(SegmentedByteString).b1h = function () {
  // Inline function 'okio.internal.commonToByteArray' call
  var result = new Int8Array(this.t());
  var resultPos = 0;
  // Inline function 'okio.internal.forEachSegment' call
  var segmentCount = this.p1g_1.length;
  var s = 0;
  var pos = 0;
  while (s < segmentCount) {
    var segmentPos = this.q1g_1[segmentCount + s | 0];
    var nextSegmentOffset = this.q1g_1[s];
    var tmp0 = this.p1g_1[s];
    var byteCount = nextSegmentOffset - pos | 0;
    var tmp4 = resultPos;
    // Inline function 'kotlin.collections.copyInto' call
    var endIndex = segmentPos + byteCount | 0;
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    var tmp = tmp0;
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    arrayCopy(tmp, result, tmp4, segmentPos, endIndex);
    resultPos = resultPos + byteCount | 0;
    pos = nextSegmentOffset;
    s = s + 1 | 0;
  }
  return result;
};
protoOf(SegmentedByteString).c1h = function (offset, other, otherOffset, byteCount) {
  var tmp$ret$0;
  $l$block_0: {
    // Inline function 'okio.internal.commonRangeEquals' call
    if (offset < 0 || offset > (this.t() - byteCount | 0)) {
      tmp$ret$0 = false;
      break $l$block_0;
    }
    var otherOffset_0 = otherOffset;
    var endIndex = offset + byteCount | 0;
    var s = segment(this, offset);
    var pos = offset;
    while (pos < endIndex) {
      var segmentOffset = s === 0 ? 0 : this.q1g_1[s - 1 | 0];
      var segmentSize = this.q1g_1[s] - segmentOffset | 0;
      var segmentPos = this.q1g_1[this.p1g_1.length + s | 0];
      // Inline function 'kotlin.comparisons.minOf' call
      var b = segmentOffset + segmentSize | 0;
      var byteCount_0 = Math.min(endIndex, b) - pos | 0;
      var offset_0 = segmentPos + (pos - segmentOffset | 0) | 0;
      var data = this.p1g_1[s];
      if (!other.z1g(otherOffset_0, data, offset_0, byteCount_0)) {
        tmp$ret$0 = false;
        break $l$block_0;
      }
      otherOffset_0 = otherOffset_0 + byteCount_0 | 0;
      pos = pos + byteCount_0 | 0;
      s = s + 1 | 0;
    }
    tmp$ret$0 = true;
  }
  return tmp$ret$0;
};
protoOf(SegmentedByteString).z1g = function (offset, other, otherOffset, byteCount) {
  var tmp$ret$0;
  $l$block_0: {
    // Inline function 'okio.internal.commonRangeEquals' call
    if (offset < 0 || offset > (this.t() - byteCount | 0) || otherOffset < 0 || otherOffset > (other.length - byteCount | 0)) {
      tmp$ret$0 = false;
      break $l$block_0;
    }
    var otherOffset_0 = otherOffset;
    var endIndex = offset + byteCount | 0;
    var s = segment(this, offset);
    var pos = offset;
    while (pos < endIndex) {
      var segmentOffset = s === 0 ? 0 : this.q1g_1[s - 1 | 0];
      var segmentSize = this.q1g_1[s] - segmentOffset | 0;
      var segmentPos = this.q1g_1[this.p1g_1.length + s | 0];
      // Inline function 'kotlin.comparisons.minOf' call
      var b = segmentOffset + segmentSize | 0;
      var byteCount_0 = Math.min(endIndex, b) - pos | 0;
      var offset_0 = segmentPos + (pos - segmentOffset | 0) | 0;
      var data = this.p1g_1[s];
      if (!arrayRangeEquals(data, offset_0, other, otherOffset_0, byteCount_0)) {
        tmp$ret$0 = false;
        break $l$block_0;
      }
      otherOffset_0 = otherOffset_0 + byteCount_0 | 0;
      pos = pos + byteCount_0 | 0;
      s = s + 1 | 0;
    }
    tmp$ret$0 = true;
  }
  return tmp$ret$0;
};
protoOf(SegmentedByteString).v1g = function () {
  return this.b1h();
};
protoOf(SegmentedByteString).equals = function (other) {
  // Inline function 'okio.internal.commonEquals' call
  var tmp;
  if (other === this) {
    tmp = true;
  } else {
    if (other instanceof ByteString) {
      tmp = (other.t() === this.t() && this.c1h(0, other, 0, this.t()));
    } else {
      tmp = false;
    }
  }
  return tmp;
};
protoOf(SegmentedByteString).hashCode = function () {
  var tmp$ret$0;
  $l$block: {
    // Inline function 'okio.internal.commonHashCode' call
    var result = this.k1g_1;
    if (!(result === 0)) {
      tmp$ret$0 = result;
      break $l$block;
    }
    result = 1;
    // Inline function 'okio.internal.forEachSegment' call
    var segmentCount = this.p1g_1.length;
    var s = 0;
    var pos = 0;
    while (s < segmentCount) {
      var segmentPos = this.q1g_1[segmentCount + s | 0];
      var nextSegmentOffset = this.q1g_1[s];
      var tmp0 = this.p1g_1[s];
      var i = segmentPos;
      var limit = segmentPos + (nextSegmentOffset - pos | 0) | 0;
      while (i < limit) {
        result = imul(31, result) + tmp0[i] | 0;
        i = i + 1 | 0;
      }
      pos = nextSegmentOffset;
      s = s + 1 | 0;
    }
    this.s1g(result);
    tmp$ret$0 = result;
  }
  return tmp$ret$0;
};
protoOf(SegmentedByteString).toString = function () {
  return toByteString(this).toString();
};
function UnsafeCursor() {
  this.d1h_1 = null;
  this.e1h_1 = false;
  this.f1h_1 = null;
  this.g1h_1 = new Long(-1, -1);
  this.h1h_1 = null;
  this.i1h_1 = -1;
  this.j1h_1 = -1;
}
protoOf(UnsafeCursor).k1h = function () {
  // Inline function 'okio.internal.commonClose' call
  // Inline function 'kotlin.check' call
  if (!!(this.d1h_1 == null)) {
    var message = 'not attached to a buffer';
    throw IllegalStateException_init_$Create$(toString(message));
  }
  this.d1h_1 = null;
  this.f1h_1 = null;
  this.g1h_1 = new Long(-1, -1);
  this.h1h_1 = null;
  this.i1h_1 = -1;
  this.j1h_1 = -1;
};
function Buffer() {
  this.l1h_1 = null;
  this.m1h_1 = new Long(0, 0);
}
protoOf(Buffer).n1h = function () {
  // Inline function 'okio.internal.commonReadByteArray' call
  return this.o1h(this.m1h_1);
};
protoOf(Buffer).o1h = function (byteCount) {
  // Inline function 'okio.internal.commonReadByteArray' call
  // Inline function 'kotlin.require' call
  if (!(compare(byteCount, new Long(0, 0)) >= 0 && compare(byteCount, new Long(2147483647, 0)) <= 0)) {
    var message = 'byteCount: ' + byteCount.toString();
    throw IllegalArgumentException_init_$Create$(toString(message));
  }
  if (compare(this.m1h_1, byteCount) < 0)
    throw EOFException_init_$Create$();
  var result = new Int8Array(convertToInt(byteCount));
  this.p1h(result);
  return result;
};
protoOf(Buffer).p1h = function (sink) {
  // Inline function 'okio.internal.commonReadFully' call
  var offset = 0;
  while (offset < sink.length) {
    var read = this.q1h(sink, offset, sink.length - offset | 0);
    if (read === -1)
      throw EOFException_init_$Create$();
    offset = offset + read | 0;
  }
  return Unit_instance;
};
protoOf(Buffer).q1h = function (sink, offset, byteCount) {
  var tmp$ret$0;
  $l$block: {
    // Inline function 'okio.internal.commonRead' call
    checkOffsetAndCount(fromInt(sink.length), fromInt(offset), fromInt(byteCount));
    var tmp0_elvis_lhs = this.l1h_1;
    var tmp;
    if (tmp0_elvis_lhs == null) {
      tmp$ret$0 = -1;
      break $l$block;
    } else {
      tmp = tmp0_elvis_lhs;
    }
    var s = tmp;
    // Inline function 'kotlin.comparisons.minOf' call
    var b = s.a1g_1 - s.z1f_1 | 0;
    var toCopy = Math.min(byteCount, b);
    var tmp0 = s.y1f_1;
    var tmp6 = s.z1f_1;
    // Inline function 'kotlin.collections.copyInto' call
    var endIndex = s.z1f_1 + toCopy | 0;
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    var tmp_0 = tmp0;
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    arrayCopy(tmp_0, sink, offset, tmp6, endIndex);
    s.z1f_1 = s.z1f_1 + toCopy | 0;
    this.m1h_1 = subtract(this.m1h_1, fromInt(toCopy));
    if (s.z1f_1 === s.a1g_1) {
      this.l1h_1 = s.h1g();
      SegmentPool_instance.t1h(s);
    }
    tmp$ret$0 = toCopy;
  }
  return tmp$ret$0;
};
protoOf(Buffer).u1h = function (minimumCapacity) {
  var tmp$ret$2;
  $l$block: {
    // Inline function 'okio.internal.commonWritableSegment' call
    // Inline function 'kotlin.require' call
    if (!(minimumCapacity >= 1 && minimumCapacity <= 8192)) {
      var message = 'unexpected capacity';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    if (this.l1h_1 == null) {
      var result = SegmentPool_instance.v1h();
      this.l1h_1 = result;
      result.e1g_1 = result;
      result.d1g_1 = result;
      tmp$ret$2 = result;
      break $l$block;
    }
    var tail = ensureNotNull(this.l1h_1).e1g_1;
    if ((ensureNotNull(tail).a1g_1 + minimumCapacity | 0) > 8192 || !tail.c1g_1) {
      tail = tail.i1g(SegmentPool_instance.v1h());
    }
    tmp$ret$2 = tail;
  }
  return tmp$ret$2;
};
protoOf(Buffer).w1h = function (source) {
  // Inline function 'okio.internal.commonWrite' call
  return this.x1h(source, 0, source.length);
};
protoOf(Buffer).x1h = function (source, offset, byteCount) {
  // Inline function 'okio.internal.commonWrite' call
  var offset_0 = offset;
  checkOffsetAndCount(fromInt(source.length), fromInt(offset_0), fromInt(byteCount));
  var limit = offset_0 + byteCount | 0;
  while (offset_0 < limit) {
    var tail = this.u1h(1);
    var tmp0 = limit - offset_0 | 0;
    // Inline function 'kotlin.comparisons.minOf' call
    var b = 8192 - tail.a1g_1 | 0;
    var toCopy = Math.min(tmp0, b);
    var tmp2 = tail.y1f_1;
    var tmp4 = tail.a1g_1;
    var tmp6 = offset_0;
    // Inline function 'kotlin.collections.copyInto' call
    var endIndex = offset_0 + toCopy | 0;
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    var tmp = source;
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    arrayCopy(tmp, tmp2, tmp4, tmp6, endIndex);
    offset_0 = offset_0 + toCopy | 0;
    tail.a1g_1 = tail.a1g_1 + toCopy | 0;
  }
  this.m1h_1 = add(this.m1h_1, fromInt(byteCount));
  return this;
};
protoOf(Buffer).y1h = function (b) {
  // Inline function 'okio.internal.commonWriteByte' call
  var tail = this.u1h(1);
  var _unary__edvuaz = tail.a1g_1;
  tail.a1g_1 = _unary__edvuaz + 1 | 0;
  tail.y1f_1[_unary__edvuaz] = toByte(b);
  this.m1h_1 = add(this.m1h_1, new Long(1, 0));
  return this;
};
protoOf(Buffer).k1h = function () {
  return Unit_instance;
};
protoOf(Buffer).equals = function (other) {
  var tmp$ret$0;
  $l$block_3: {
    // Inline function 'okio.internal.commonEquals' call
    if (this === other) {
      tmp$ret$0 = true;
      break $l$block_3;
    }
    if (!(other instanceof Buffer)) {
      tmp$ret$0 = false;
      break $l$block_3;
    }
    if (!equalsLong(this.m1h_1, other.m1h_1)) {
      tmp$ret$0 = false;
      break $l$block_3;
    }
    if (equalsLong(this.m1h_1, new Long(0, 0))) {
      tmp$ret$0 = true;
      break $l$block_3;
    }
    var sa = ensureNotNull(this.l1h_1);
    var sb = ensureNotNull(other.l1h_1);
    var posA = sa.z1f_1;
    var posB = sb.z1f_1;
    var pos = new Long(0, 0);
    var count;
    while (compare(pos, this.m1h_1) < 0) {
      var tmp0 = sa.a1g_1 - posA | 0;
      // Inline function 'kotlin.comparisons.minOf' call
      var b = sb.a1g_1 - posB | 0;
      var tmp$ret$1 = Math.min(tmp0, b);
      count = fromInt(tmp$ret$1);
      var inductionVariable = new Long(0, 0);
      if (compare(inductionVariable, count) < 0)
        do {
          var i = inductionVariable;
          inductionVariable = add(inductionVariable, new Long(1, 0));
          var tmp = sa.y1f_1;
          var _unary__edvuaz = posA;
          posA = _unary__edvuaz + 1 | 0;
          var tmp_0 = tmp[_unary__edvuaz];
          var tmp_1 = sb.y1f_1;
          var _unary__edvuaz_0 = posB;
          posB = _unary__edvuaz_0 + 1 | 0;
          if (!(tmp_0 === tmp_1[_unary__edvuaz_0])) {
            tmp$ret$0 = false;
            break $l$block_3;
          }
        }
         while (compare(inductionVariable, count) < 0);
      if (posA === sa.a1g_1) {
        sa = ensureNotNull(sa.d1g_1);
        posA = sa.z1f_1;
      }
      if (posB === sb.a1g_1) {
        sb = ensureNotNull(sb.d1g_1);
        posB = sb.z1f_1;
      }
      pos = add(pos, count);
    }
    tmp$ret$0 = true;
  }
  return tmp$ret$0;
};
protoOf(Buffer).hashCode = function () {
  var tmp$ret$0;
  $l$block: {
    // Inline function 'okio.internal.commonHashCode' call
    var tmp0_elvis_lhs = this.l1h_1;
    var tmp;
    if (tmp0_elvis_lhs == null) {
      tmp$ret$0 = 0;
      break $l$block;
    } else {
      tmp = tmp0_elvis_lhs;
    }
    var s = tmp;
    var result = 1;
    do {
      var pos = s.z1f_1;
      var limit = s.a1g_1;
      while (pos < limit) {
        result = imul(31, result) + s.y1f_1[pos] | 0;
        pos = pos + 1 | 0;
      }
      s = ensureNotNull(s.d1g_1);
    }
     while (!(s === this.l1h_1));
    tmp$ret$0 = result;
  }
  return tmp$ret$0;
};
protoOf(Buffer).toString = function () {
  return this.z1h().toString();
};
protoOf(Buffer).z1h = function () {
  // Inline function 'okio.internal.commonSnapshot' call
  // Inline function 'kotlin.check' call
  if (!(compare(this.m1h_1, new Long(2147483647, 0)) <= 0)) {
    var message = 'size > Int.MAX_VALUE: ' + this.m1h_1.toString();
    throw IllegalStateException_init_$Create$(toString(message));
  }
  return this.a1i(convertToInt(this.m1h_1));
};
protoOf(Buffer).a1i = function (byteCount) {
  var tmp$ret$0;
  $l$block: {
    // Inline function 'okio.internal.commonSnapshot' call
    if (byteCount === 0) {
      tmp$ret$0 = Companion_getInstance_0().r1g_1;
      break $l$block;
    }
    checkOffsetAndCount(this.m1h_1, new Long(0, 0), fromInt(byteCount));
    var offset = 0;
    var segmentCount = 0;
    var s = this.l1h_1;
    while (offset < byteCount) {
      if (ensureNotNull(s).a1g_1 === s.z1f_1) {
        throw AssertionError_init_$Create$('s.limit == s.pos');
      }
      offset = offset + (s.a1g_1 - s.z1f_1 | 0) | 0;
      segmentCount = segmentCount + 1 | 0;
      s = s.d1g_1;
    }
    // Inline function 'kotlin.arrayOfNulls' call
    var size = segmentCount;
    var segments = Array(size);
    var directory = new Int32Array(imul(segmentCount, 2));
    offset = 0;
    segmentCount = 0;
    s = this.l1h_1;
    while (offset < byteCount) {
      segments[segmentCount] = ensureNotNull(s).y1f_1;
      offset = offset + (s.a1g_1 - s.z1f_1 | 0) | 0;
      var tmp = segmentCount;
      // Inline function 'kotlin.comparisons.minOf' call
      var a = offset;
      directory[tmp] = Math.min(a, byteCount);
      directory[segmentCount + segments.length | 0] = s.z1f_1;
      s.b1g_1 = true;
      segmentCount = segmentCount + 1 | 0;
      s = s.d1g_1;
    }
    tmp$ret$0 = new SegmentedByteString(isArray(segments) ? segments : THROW_CCE(), directory);
  }
  return tmp$ret$0;
};
function ArrayIndexOutOfBoundsException(message) {
  IndexOutOfBoundsException_init_$Init$(message, this);
  captureStack(this, ArrayIndexOutOfBoundsException);
}
function EOFException_init_$Init$($this) {
  EOFException.call($this, null);
  return $this;
}
function EOFException_init_$Create$() {
  var tmp = EOFException_init_$Init$(objectCreate(protoOf(EOFException)));
  captureStack(tmp, EOFException_init_$Create$);
  return tmp;
}
function EOFException(message) {
  IOException_init_$Init$(message, this);
  captureStack(this, EOFException);
}
function IOException_init_$Init$(message, $this) {
  IOException.call($this, message, null);
  return $this;
}
function IOException_init_$Init$_0($this) {
  IOException.call($this, null, null);
  return $this;
}
function IOException_init_$Create$() {
  var tmp = IOException_init_$Init$_0(objectCreate(protoOf(IOException)));
  captureStack(tmp, IOException_init_$Create$);
  return tmp;
}
function IOException(message, cause) {
  Exception_init_$Init$(message, cause, this);
  captureStack(this, IOException);
}
function toUtf8String(_this__u8e3s4) {
  return commonToUtf8String(_this__u8e3s4);
}
function SegmentPool() {
  this.r1h_1 = 0;
  this.s1h_1 = 0;
}
protoOf(SegmentPool).v1h = function () {
  return Segment_init_$Create$();
};
protoOf(SegmentPool).t1h = function (segment) {
};
var SegmentPool_instance;
function SegmentPool_getInstance() {
  return SegmentPool_instance;
}
//region block: init
Companion_instance = new Companion();
SegmentPool_instance = new SegmentPool();
//endregion
//region block: exports
export {
  Buffer as Buffer3384y49aj0pxr,
};
//endregion

//# sourceMappingURL=okio-parent-okio.mjs.map
