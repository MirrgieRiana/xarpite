import {
  protoOf180f3jzyo7rfj as protoOf,
  objectCreate1ve4bgxiu4x98 as objectCreate,
  initMetadataForCompanion1wyw17z38v6ac as initMetadataForCompanion,
  ensureNotNull1e947j3ixpazm as ensureNotNull,
  toString1pkumu07cwy4m as toString,
  IllegalArgumentException_init_$Create$3ewkh27kzt8z8 as IllegalArgumentException_init_$Create$,
  Unit_instance1fbcbse1fwigr as Unit_instance,
  arrayCopytctsywo3h7gj as arrayCopy,
  IllegalStateException_init_$Create$2w9444nebyjns as IllegalStateException_init_$Create$,
  IllegalArgumentException_init_$Create$3vjwoodhlckbo as IllegalArgumentException_init_$Create$_0,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
  bitwiseOr1ita6dahwp8zb as bitwiseOr,
  Long2qws0ah9gnpki as Long,
  compare2uud5j30pw5xc as compare,
  subtract16cg4lfi29fq9 as subtract,
  charCodeAt1yspne1d8erbm as charCodeAt,
  _Char___init__impl__6a9atx2js6krycynjoo as _Char___init__impl__6a9atx,
  Char__compareTo_impl_ypi4mbdrkik40uwhqc as Char__compareTo_impl_ypi4mb,
  Char__toInt_impl_vasixd1agw9q2fuvclj as Char__toInt_impl_vasixd,
  toByte4i43936u611k as toByte,
  copyOfwy6h3t5vzqpl as copyOf,
  VOID3gxj6tk5isa35 as VOID,
  charArray2ujmm1qusno00 as charArray,
  numberToChar93r9buh19yek as numberToChar,
  concatToString3cxf0c1gqonpo as concatToString,
  fromInt1lka3ktyu79a4 as fromInt,
  longArrayOf1jqne2a8v34i5 as longArrayOf,
  charArrayOf27f4r3dozbrk1 as charArrayOf,
  Char19o2r8palgjof as Char,
  equals2au1ep9vhcato as equals,
  equalsLong28bsrfhwvd686 as equalsLong,
  ArrayList_init_$Create$149jv2ovkkvnt as ArrayList_init_$Create$,
  removeLastOrNull3odnlbetbttd4 as removeLastOrNull,
  last1vo29oleiqj36 as last,
  concatToString2syawgu50khxi as concatToString_0,
  copyOfRange3alro60z4hhf8 as copyOfRange,
  contentHashCode25jw6rgkgywwr as contentHashCode,
  THROW_CCE2g6jy02ryeudk as THROW_CCE,
  substringiqarkczpya5m as substring,
  replace3le3ie7l9k8aq as replace,
  Comparable198qfk8pnblz0 as Comparable,
  copyOfRangectu1wvlwieiw as copyOfRange_0,
  add85si75olwt6n as add,
  numberToLong345n6tb1n1i71 as numberToLong,
  convertToIntofdoxh9bstof as convertToInt,
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
initMetadataForClass(FileSystem, 'FileSystem');
initMetadataForCompanion(Companion_1);
initMetadataForClass(ByteString, 'ByteString', VOID, VOID, [Comparable]);
initMetadataForClass(SegmentedByteString, 'SegmentedByteString', VOID, ByteString);
initMetadataForClass(UnsafeCursor, 'UnsafeCursor', UnsafeCursor);
initMetadataForClass(Buffer, 'Buffer', Buffer);
initMetadataForClass(ArrayIndexOutOfBoundsException, 'ArrayIndexOutOfBoundsException', VOID, IndexOutOfBoundsException);
initMetadataForClass(IOException, 'IOException', IOException_init_$Create$_0, Exception);
initMetadataForClass(EOFException, 'EOFException', EOFException_init_$Create$, IOException);
initMetadataForClass(FileNotFoundException, 'FileNotFoundException', VOID, IOException);
initMetadataForCompanion(Companion_2);
initMetadataForClass(Path, 'Path', VOID, VOID, [Comparable]);
initMetadataForClass(RealBufferedSource, 'RealBufferedSource');
initMetadataForObject(SegmentPool, 'SegmentPool');
//endregion
function buffer(_this__u8e3s4) {
  return new RealBufferedSource(_this__u8e3s4);
}
function Segment_init_$Init$($this) {
  Segment.call($this);
  $this.a1g_1 = new Int8Array(8192);
  $this.e1g_1 = true;
  $this.d1g_1 = false;
  return $this;
}
function Segment_init_$Create$() {
  return Segment_init_$Init$(objectCreate(protoOf(Segment)));
}
function Segment_init_$Init$_0(data, pos, limit, shared, owner, $this) {
  Segment.call($this);
  $this.a1g_1 = data;
  $this.b1g_1 = pos;
  $this.c1g_1 = limit;
  $this.d1g_1 = shared;
  $this.e1g_1 = owner;
  return $this;
}
function Segment_init_$Create$_0(data, pos, limit, shared, owner) {
  return Segment_init_$Init$_0(data, pos, limit, shared, owner, objectCreate(protoOf(Segment)));
}
function Companion() {
  this.h1g_1 = 8192;
  this.i1g_1 = 1024;
}
var Companion_instance;
function Companion_getInstance() {
  return Companion_instance;
}
protoOf(Segment).j1g = function () {
  this.d1g_1 = true;
  return Segment_init_$Create$_0(this.a1g_1, this.b1g_1, this.c1g_1, true, false);
};
protoOf(Segment).k1g = function () {
  var result = !(this.f1g_1 === this) ? this.f1g_1 : null;
  ensureNotNull(this.g1g_1).f1g_1 = this.f1g_1;
  ensureNotNull(this.f1g_1).g1g_1 = this.g1g_1;
  this.f1g_1 = null;
  this.g1g_1 = null;
  return result;
};
protoOf(Segment).l1g = function (segment) {
  segment.g1g_1 = this;
  segment.f1g_1 = this.f1g_1;
  ensureNotNull(this.f1g_1).g1g_1 = segment;
  this.f1g_1 = segment;
  return segment;
};
protoOf(Segment).m1g = function (byteCount) {
  // Inline function 'kotlin.require' call
  if (!(byteCount > 0 && byteCount <= (this.c1g_1 - this.b1g_1 | 0))) {
    var message = 'byteCount out of range';
    throw IllegalArgumentException_init_$Create$(toString(message));
  }
  var prefix;
  if (byteCount >= 1024) {
    prefix = this.j1g();
  } else {
    prefix = SegmentPool_instance.p1g();
    var tmp0 = this.a1g_1;
    var tmp2 = prefix.a1g_1;
    var tmp4 = this.b1g_1;
    // Inline function 'kotlin.collections.copyInto' call
    var endIndex = this.b1g_1 + byteCount | 0;
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    var tmp = tmp0;
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    arrayCopy(tmp, tmp2, 0, tmp4, endIndex);
  }
  prefix.c1g_1 = prefix.b1g_1 + byteCount | 0;
  this.b1g_1 = this.b1g_1 + byteCount | 0;
  ensureNotNull(this.g1g_1).l1g(prefix);
  return prefix;
};
protoOf(Segment).q1g = function () {
  // Inline function 'kotlin.check' call
  if (!!(this.g1g_1 === this)) {
    var message = 'cannot compact';
    throw IllegalStateException_init_$Create$(toString(message));
  }
  if (!ensureNotNull(this.g1g_1).e1g_1)
    return Unit_instance;
  var byteCount = this.c1g_1 - this.b1g_1 | 0;
  var availableByteCount = (8192 - ensureNotNull(this.g1g_1).c1g_1 | 0) + (ensureNotNull(this.g1g_1).d1g_1 ? 0 : ensureNotNull(this.g1g_1).b1g_1) | 0;
  if (byteCount > availableByteCount)
    return Unit_instance;
  this.r1g(ensureNotNull(this.g1g_1), byteCount);
  this.k1g();
  SegmentPool_instance.s1g(this);
};
protoOf(Segment).r1g = function (sink, byteCount) {
  // Inline function 'kotlin.check' call
  if (!sink.e1g_1) {
    var message = 'only owner can write';
    throw IllegalStateException_init_$Create$(toString(message));
  }
  if ((sink.c1g_1 + byteCount | 0) > 8192) {
    if (sink.d1g_1)
      throw IllegalArgumentException_init_$Create$_0();
    if (((sink.c1g_1 + byteCount | 0) - sink.b1g_1 | 0) > 8192)
      throw IllegalArgumentException_init_$Create$_0();
    var tmp0 = sink.a1g_1;
    var tmp2 = sink.a1g_1;
    var tmp4 = sink.b1g_1;
    // Inline function 'kotlin.collections.copyInto' call
    var endIndex = sink.c1g_1;
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    var tmp = tmp0;
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    arrayCopy(tmp, tmp2, 0, tmp4, endIndex);
    sink.c1g_1 = sink.c1g_1 - sink.b1g_1 | 0;
    sink.b1g_1 = 0;
  }
  var tmp0_0 = this.a1g_1;
  var tmp2_0 = sink.a1g_1;
  var tmp4_0 = sink.c1g_1;
  var tmp6 = this.b1g_1;
  // Inline function 'kotlin.collections.copyInto' call
  var endIndex_0 = this.b1g_1 + byteCount | 0;
  // Inline function 'kotlin.js.unsafeCast' call
  // Inline function 'kotlin.js.asDynamic' call
  var tmp_0 = tmp0_0;
  // Inline function 'kotlin.js.unsafeCast' call
  // Inline function 'kotlin.js.asDynamic' call
  arrayCopy(tmp_0, tmp2_0, tmp4_0, tmp6, endIndex_0);
  sink.c1g_1 = sink.c1g_1 + byteCount | 0;
  this.b1g_1 = this.b1g_1 + byteCount | 0;
};
function Segment() {
  this.b1g_1 = 0;
  this.c1g_1 = 0;
  this.d1g_1 = false;
  this.e1g_1 = false;
  this.f1g_1 = null;
  this.g1g_1 = null;
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
    return _this__u8e3s4.u();
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
function commonAsUtf8ToByteArray(_this__u8e3s4) {
  var bytes = new Int8Array(imul(4, _this__u8e3s4.length));
  var inductionVariable = 0;
  var last = _this__u8e3s4.length;
  if (inductionVariable < last)
    do {
      var index = inductionVariable;
      inductionVariable = inductionVariable + 1 | 0;
      var b0 = charCodeAt(_this__u8e3s4, index);
      if (Char__compareTo_impl_ypi4mb(b0, _Char___init__impl__6a9atx(128)) >= 0) {
        var size = index;
        // Inline function 'okio.processUtf8Bytes' call
        var endIndex = _this__u8e3s4.length;
        var index_0 = index;
        while (index_0 < endIndex) {
          var c = charCodeAt(_this__u8e3s4, index_0);
          if (Char__compareTo_impl_ypi4mb(c, _Char___init__impl__6a9atx(128)) < 0) {
            // Inline function 'kotlin.code' call
            var tmp$ret$0 = Char__toInt_impl_vasixd(c);
            var c_0 = toByte(tmp$ret$0);
            var _unary__edvuaz = size;
            size = _unary__edvuaz + 1 | 0;
            bytes[_unary__edvuaz] = c_0;
            index_0 = index_0 + 1 | 0;
            while (index_0 < endIndex && Char__compareTo_impl_ypi4mb(charCodeAt(_this__u8e3s4, index_0), _Char___init__impl__6a9atx(128)) < 0) {
              var _unary__edvuaz_0 = index_0;
              index_0 = _unary__edvuaz_0 + 1 | 0;
              // Inline function 'kotlin.code' call
              var this_0 = charCodeAt(_this__u8e3s4, _unary__edvuaz_0);
              var tmp$ret$2 = Char__toInt_impl_vasixd(this_0);
              var c_1 = toByte(tmp$ret$2);
              var _unary__edvuaz_1 = size;
              size = _unary__edvuaz_1 + 1 | 0;
              bytes[_unary__edvuaz_1] = c_1;
            }
          } else if (Char__compareTo_impl_ypi4mb(c, _Char___init__impl__6a9atx(2048)) < 0) {
            // Inline function 'kotlin.code' call
            var tmp$ret$4 = Char__toInt_impl_vasixd(c);
            var c_2 = toByte(tmp$ret$4 >> 6 | 192);
            var _unary__edvuaz_2 = size;
            size = _unary__edvuaz_2 + 1 | 0;
            bytes[_unary__edvuaz_2] = c_2;
            // Inline function 'kotlin.code' call
            var tmp$ret$6 = Char__toInt_impl_vasixd(c);
            var c_3 = toByte(tmp$ret$6 & 63 | 128);
            var _unary__edvuaz_3 = size;
            size = _unary__edvuaz_3 + 1 | 0;
            bytes[_unary__edvuaz_3] = c_3;
            index_0 = index_0 + 1 | 0;
          } else if (!(_Char___init__impl__6a9atx(55296) <= c ? c <= _Char___init__impl__6a9atx(57343) : false)) {
            // Inline function 'kotlin.code' call
            var tmp$ret$8 = Char__toInt_impl_vasixd(c);
            var c_4 = toByte(tmp$ret$8 >> 12 | 224);
            var _unary__edvuaz_4 = size;
            size = _unary__edvuaz_4 + 1 | 0;
            bytes[_unary__edvuaz_4] = c_4;
            // Inline function 'kotlin.code' call
            var tmp$ret$10 = Char__toInt_impl_vasixd(c);
            var c_5 = toByte(tmp$ret$10 >> 6 & 63 | 128);
            var _unary__edvuaz_5 = size;
            size = _unary__edvuaz_5 + 1 | 0;
            bytes[_unary__edvuaz_5] = c_5;
            // Inline function 'kotlin.code' call
            var tmp$ret$12 = Char__toInt_impl_vasixd(c);
            var c_6 = toByte(tmp$ret$12 & 63 | 128);
            var _unary__edvuaz_6 = size;
            size = _unary__edvuaz_6 + 1 | 0;
            bytes[_unary__edvuaz_6] = c_6;
            index_0 = index_0 + 1 | 0;
          } else {
            var tmp;
            if (Char__compareTo_impl_ypi4mb(c, _Char___init__impl__6a9atx(56319)) > 0 || endIndex <= (index_0 + 1 | 0)) {
              tmp = true;
            } else {
              var containsArg = charCodeAt(_this__u8e3s4, index_0 + 1 | 0);
              tmp = !(_Char___init__impl__6a9atx(56320) <= containsArg ? containsArg <= _Char___init__impl__6a9atx(57343) : false);
            }
            if (tmp) {
              var _unary__edvuaz_7 = size;
              size = _unary__edvuaz_7 + 1 | 0;
              bytes[_unary__edvuaz_7] = 63;
              index_0 = index_0 + 1 | 0;
            } else {
              // Inline function 'kotlin.code' call
              var tmp_0 = Char__toInt_impl_vasixd(c) << 10;
              // Inline function 'kotlin.code' call
              var this_1 = charCodeAt(_this__u8e3s4, index_0 + 1 | 0);
              var codePoint = (tmp_0 + Char__toInt_impl_vasixd(this_1) | 0) + -56613888 | 0;
              var c_7 = toByte(codePoint >> 18 | 240);
              var _unary__edvuaz_8 = size;
              size = _unary__edvuaz_8 + 1 | 0;
              bytes[_unary__edvuaz_8] = c_7;
              var c_8 = toByte(codePoint >> 12 & 63 | 128);
              var _unary__edvuaz_9 = size;
              size = _unary__edvuaz_9 + 1 | 0;
              bytes[_unary__edvuaz_9] = c_8;
              var c_9 = toByte(codePoint >> 6 & 63 | 128);
              var _unary__edvuaz_10 = size;
              size = _unary__edvuaz_10 + 1 | 0;
              bytes[_unary__edvuaz_10] = c_9;
              var c_10 = toByte(codePoint & 63 | 128);
              var _unary__edvuaz_11 = size;
              size = _unary__edvuaz_11 + 1 | 0;
              bytes[_unary__edvuaz_11] = c_10;
              index_0 = index_0 + 2 | 0;
            }
          }
        }
        return copyOf(bytes, size);
      }
      // Inline function 'kotlin.code' call
      var tmp$ret$22 = Char__toInt_impl_vasixd(b0);
      bytes[index] = toByte(tmp$ret$22);
    }
     while (inductionVariable < last);
  return copyOf(bytes, _this__u8e3s4.length);
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
var HEX_DIGIT_BYTES;
var DigitCountToLargestValue;
function readUtf8Line(_this__u8e3s4, newline) {
  _init_properties_Buffer_kt__ndcom8();
  var tmp;
  var tmp_0;
  if (compare(newline, new Long(0, 0)) > 0) {
    // Inline function 'kotlin.Long.minus' call
    var tmp$ret$0 = subtract(newline, fromInt(1));
    var tmp_1 = _this__u8e3s4.y1g(tmp$ret$0);
    // Inline function 'kotlin.code' call
    var this_0 = _Char___init__impl__6a9atx(13);
    var tmp$ret$1 = Char__toInt_impl_vasixd(this_0);
    tmp_0 = tmp_1 === toByte(tmp$ret$1);
  } else {
    tmp_0 = false;
  }
  if (tmp_0) {
    var result = _this__u8e3s4.z1g(subtract(newline, new Long(1, 0)));
    _this__u8e3s4.a1h(new Long(2, 0));
    tmp = result;
  } else {
    var result_0 = _this__u8e3s4.z1g(newline);
    _this__u8e3s4.a1h(new Long(1, 0));
    tmp = result_0;
  }
  return tmp;
}
var properties_initialized_Buffer_kt_xv4xxe;
function _init_properties_Buffer_kt__ndcom8() {
  if (!properties_initialized_Buffer_kt_xv4xxe) {
    properties_initialized_Buffer_kt_xv4xxe = true;
    HEX_DIGIT_BYTES = asUtf8ToByteArray('0123456789abcdef');
    // Inline function 'kotlin.longArrayOf' call
    DigitCountToLargestValue = longArrayOf([new Long(-1, -1), new Long(9, 0), new Long(99, 0), new Long(999, 0), new Long(9999, 0), new Long(99999, 0), new Long(999999, 0), new Long(9999999, 0), new Long(99999999, 0), new Long(999999999, 0), new Long(1410065407, 2), new Long(1215752191, 23), new Long(-727379969, 232), new Long(1316134911, 2328), new Long(276447231, 23283), new Long(-1530494977, 232830), new Long(1874919423, 2328306), new Long(1569325055, 23283064), new Long(-1486618625, 232830643), new Long(-1, 2147483647)]);
  }
}
function get_HEX_DIGIT_CHARS() {
  _init_properties_ByteString_kt__sqjq7b();
  return HEX_DIGIT_CHARS;
}
var HEX_DIGIT_CHARS;
function commonWrite(_this__u8e3s4, buffer, offset, byteCount) {
  _init_properties_ByteString_kt__sqjq7b();
  buffer.b1h(_this__u8e3s4.t1g_1, offset, byteCount);
}
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
function get_SLASH() {
  _init_properties_Path_kt__cy3pvf();
  return SLASH;
}
var SLASH;
function get_BACKSLASH() {
  _init_properties_Path_kt__cy3pvf();
  return BACKSLASH;
}
var BACKSLASH;
function get_ANY_SLASH() {
  _init_properties_Path_kt__cy3pvf();
  return ANY_SLASH;
}
var ANY_SLASH;
function get_DOT() {
  _init_properties_Path_kt__cy3pvf();
  return DOT;
}
var DOT;
function get_DOT_DOT() {
  _init_properties_Path_kt__cy3pvf();
  return DOT_DOT;
}
var DOT_DOT;
function commonResolve(_this__u8e3s4, child, normalize) {
  _init_properties_Path_kt__cy3pvf();
  var tmp;
  if (child.e1h()) {
    tmp = true;
  } else {
    var tmp_0 = child.d1h();
    tmp = !((tmp_0 == null ? null : new Char(tmp_0)) == null);
  }
  if (tmp)
    return child;
  var tmp0_elvis_lhs = get_slash(_this__u8e3s4);
  var tmp1_elvis_lhs = tmp0_elvis_lhs == null ? get_slash(child) : tmp0_elvis_lhs;
  var slash = tmp1_elvis_lhs == null ? toSlash(Companion_getInstance_2().f1h_1) : tmp1_elvis_lhs;
  var buffer = new Buffer();
  buffer.g1h(_this__u8e3s4.c1h_1);
  if (compare(buffer.x1g_1, new Long(0, 0)) > 0) {
    buffer.g1h(slash);
  }
  buffer.g1h(child.c1h_1);
  return toPath(buffer, normalize);
}
function commonToPath(_this__u8e3s4, normalize) {
  _init_properties_Path_kt__cy3pvf();
  return toPath((new Buffer()).h1h(_this__u8e3s4), normalize);
}
function rootLength(_this__u8e3s4) {
  _init_properties_Path_kt__cy3pvf();
  if (_this__u8e3s4.c1h_1.u() === 0)
    return -1;
  var tmp = _this__u8e3s4.c1h_1.w(0);
  // Inline function 'kotlin.code' call
  var this_0 = _Char___init__impl__6a9atx(47);
  var tmp$ret$0 = Char__toInt_impl_vasixd(this_0);
  if (tmp === toByte(tmp$ret$0))
    return 1;
  var tmp_0 = _this__u8e3s4.c1h_1.w(0);
  // Inline function 'kotlin.code' call
  var this_1 = _Char___init__impl__6a9atx(92);
  var tmp$ret$1 = Char__toInt_impl_vasixd(this_1);
  if (tmp_0 === toByte(tmp$ret$1)) {
    var tmp_1;
    if (_this__u8e3s4.c1h_1.u() > 2) {
      var tmp_2 = _this__u8e3s4.c1h_1.w(1);
      // Inline function 'kotlin.code' call
      var this_2 = _Char___init__impl__6a9atx(92);
      var tmp$ret$2 = Char__toInt_impl_vasixd(this_2);
      tmp_1 = tmp_2 === toByte(tmp$ret$2);
    } else {
      tmp_1 = false;
    }
    if (tmp_1) {
      var uncRootEnd = _this__u8e3s4.c1h_1.i1h(get_BACKSLASH(), 2);
      if (uncRootEnd === -1)
        uncRootEnd = _this__u8e3s4.c1h_1.u();
      return uncRootEnd;
    }
    return 1;
  }
  var tmp_3;
  var tmp_4;
  if (_this__u8e3s4.c1h_1.u() > 2) {
    var tmp_5 = _this__u8e3s4.c1h_1.w(1);
    // Inline function 'kotlin.code' call
    var this_3 = _Char___init__impl__6a9atx(58);
    var tmp$ret$3 = Char__toInt_impl_vasixd(this_3);
    tmp_4 = tmp_5 === toByte(tmp$ret$3);
  } else {
    tmp_4 = false;
  }
  if (tmp_4) {
    var tmp_6 = _this__u8e3s4.c1h_1.w(2);
    // Inline function 'kotlin.code' call
    var this_4 = _Char___init__impl__6a9atx(92);
    var tmp$ret$4 = Char__toInt_impl_vasixd(this_4);
    tmp_3 = tmp_6 === toByte(tmp$ret$4);
  } else {
    tmp_3 = false;
  }
  if (tmp_3) {
    var c = numberToChar(_this__u8e3s4.c1h_1.w(0));
    if (!(_Char___init__impl__6a9atx(97) <= c ? c <= _Char___init__impl__6a9atx(122) : false) && !(_Char___init__impl__6a9atx(65) <= c ? c <= _Char___init__impl__6a9atx(90) : false))
      return -1;
    return 3;
  }
  return -1;
}
function get_indexOfLastSlash(_this__u8e3s4) {
  _init_properties_Path_kt__cy3pvf();
  var lastSlash = _this__u8e3s4.c1h_1.j1h(get_SLASH());
  if (!(lastSlash === -1))
    return lastSlash;
  return _this__u8e3s4.c1h_1.j1h(get_BACKSLASH());
}
function get_slash(_this__u8e3s4) {
  _init_properties_Path_kt__cy3pvf();
  return !(_this__u8e3s4.c1h_1.k1h(get_SLASH()) === -1) ? get_SLASH() : !(_this__u8e3s4.c1h_1.k1h(get_BACKSLASH()) === -1) ? get_BACKSLASH() : null;
}
function toSlash(_this__u8e3s4) {
  _init_properties_Path_kt__cy3pvf();
  var tmp;
  switch (_this__u8e3s4) {
    case '/':
      tmp = get_SLASH();
      break;
    case '\\':
      tmp = get_BACKSLASH();
      break;
    default:
      throw IllegalArgumentException_init_$Create$('not a directory separator: ' + _this__u8e3s4);
  }
  return tmp;
}
function toPath(_this__u8e3s4, normalize) {
  _init_properties_Path_kt__cy3pvf();
  var slash = null;
  var result = new Buffer();
  var leadingSlashCount = 0;
  while (_this__u8e3s4.l1h(new Long(0, 0), get_SLASH()) || _this__u8e3s4.l1h(new Long(0, 0), get_BACKSLASH())) {
    var byte = _this__u8e3s4.m1h();
    var tmp0_elvis_lhs = slash;
    slash = tmp0_elvis_lhs == null ? toSlash_0(byte) : tmp0_elvis_lhs;
    leadingSlashCount = leadingSlashCount + 1 | 0;
  }
  var windowsUncPath = leadingSlashCount >= 2 && equals(slash, get_BACKSLASH());
  if (windowsUncPath) {
    result.g1h(ensureNotNull(slash));
    result.g1h(slash);
  } else if (leadingSlashCount > 0) {
    result.g1h(ensureNotNull(slash));
  } else {
    var limit = _this__u8e3s4.n1h(get_ANY_SLASH());
    var tmp1_elvis_lhs = slash;
    var tmp;
    if (tmp1_elvis_lhs == null) {
      tmp = equalsLong(limit, new Long(-1, -1)) ? toSlash(Companion_getInstance_2().f1h_1) : toSlash_0(_this__u8e3s4.y1g(limit));
    } else {
      tmp = tmp1_elvis_lhs;
    }
    slash = tmp;
    if (startsWithVolumeLetterAndColon(_this__u8e3s4, slash)) {
      if (equalsLong(limit, new Long(2, 0))) {
        result.o1h(_this__u8e3s4, new Long(3, 0));
      } else {
        result.o1h(_this__u8e3s4, new Long(2, 0));
      }
    }
  }
  var absolute = compare(result.x1g_1, new Long(0, 0)) > 0;
  // Inline function 'kotlin.collections.mutableListOf' call
  var canonicalParts = ArrayList_init_$Create$();
  while (!_this__u8e3s4.p1h()) {
    var limit_0 = _this__u8e3s4.n1h(get_ANY_SLASH());
    var part;
    if (equalsLong(limit_0, new Long(-1, -1))) {
      part = _this__u8e3s4.r1h();
    } else {
      part = _this__u8e3s4.q1h(limit_0);
      _this__u8e3s4.m1h();
    }
    if (part.equals(get_DOT_DOT())) {
      if (!absolute || !canonicalParts.o())
        if (!normalize || (!absolute && (canonicalParts.o() || last(canonicalParts).equals(get_DOT_DOT())))) {
          canonicalParts.j(part);
        } else if (!windowsUncPath || canonicalParts.u() !== 1) {
          removeLastOrNull(canonicalParts);
        }
    } else if (!part.equals(get_DOT()) && !part.equals(Companion_getInstance_1().s1h_1)) {
      canonicalParts.j(part);
    }
  }
  var inductionVariable = 0;
  var last_0 = canonicalParts.u();
  if (inductionVariable < last_0)
    do {
      var i = inductionVariable;
      inductionVariable = inductionVariable + 1 | 0;
      if (i > 0) {
        result.g1h(slash);
      }
      result.g1h(canonicalParts.w(i));
    }
     while (inductionVariable < last_0);
  if (equalsLong(result.x1g_1, new Long(0, 0))) {
    result.g1h(get_DOT());
  }
  return new Path(result.r1h());
}
function toSlash_0(_this__u8e3s4) {
  _init_properties_Path_kt__cy3pvf();
  var tmp;
  // Inline function 'kotlin.code' call
  var this_0 = _Char___init__impl__6a9atx(47);
  if (_this__u8e3s4 === Char__toInt_impl_vasixd(this_0)) {
    tmp = get_SLASH();
  } else {
    // Inline function 'kotlin.code' call
    var this_1 = _Char___init__impl__6a9atx(92);
    if (_this__u8e3s4 === Char__toInt_impl_vasixd(this_1)) {
      tmp = get_BACKSLASH();
    } else {
      throw IllegalArgumentException_init_$Create$('not a directory separator: ' + _this__u8e3s4);
    }
  }
  return tmp;
}
function startsWithVolumeLetterAndColon(_this__u8e3s4, slash) {
  _init_properties_Path_kt__cy3pvf();
  if (!slash.equals(get_BACKSLASH()))
    return false;
  if (compare(_this__u8e3s4.x1g_1, new Long(2, 0)) < 0)
    return false;
  var tmp = _this__u8e3s4.y1g(new Long(1, 0));
  // Inline function 'kotlin.code' call
  var this_0 = _Char___init__impl__6a9atx(58);
  var tmp$ret$0 = Char__toInt_impl_vasixd(this_0);
  if (!(tmp === toByte(tmp$ret$0)))
    return false;
  var b = numberToChar(_this__u8e3s4.y1g(new Long(0, 0)));
  return (_Char___init__impl__6a9atx(97) <= b ? b <= _Char___init__impl__6a9atx(122) : false) || (_Char___init__impl__6a9atx(65) <= b ? b <= _Char___init__impl__6a9atx(90) : false);
}
function access$_get_SLASH_$tPathKt_oiy1wy() {
  return get_SLASH();
}
function access$rootLength$tPathKt($receiver) {
  return rootLength($receiver);
}
function access$_get_indexOfLastSlash_$tPathKt_czkh05($receiver) {
  return get_indexOfLastSlash($receiver);
}
var properties_initialized_Path_kt_a3g6iv;
function _init_properties_Path_kt__cy3pvf() {
  if (!properties_initialized_Path_kt_a3g6iv) {
    properties_initialized_Path_kt_a3g6iv = true;
    SLASH = Companion_getInstance_1().t1h('/');
    BACKSLASH = Companion_getInstance_1().t1h('\\');
    ANY_SLASH = Companion_getInstance_1().t1h('/\\');
    DOT = Companion_getInstance_1().t1h('.');
    DOT_DOT = Companion_getInstance_1().t1h('..');
  }
}
function segment(_this__u8e3s4, pos) {
  var i = binarySearch(_this__u8e3s4.y1h_1, pos + 1 | 0, 0, _this__u8e3s4.x1h_1.length);
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
  this.z1h_1 = Companion_getInstance_2().a1i(get_tmpdir());
}
var Companion_instance_0;
function Companion_getInstance_0() {
  if (Companion_instance_0 == null)
    new Companion_0();
  return Companion_instance_0;
}
function FileSystem() {
  Companion_getInstance_0();
}
protoOf(FileSystem).d1i = function () {
};
function get_tmpdir() {
  var tmp0_safe_receiver = get_os();
  var tmp = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.tmpdir();
  var tmp1_elvis_lhs = (!(tmp == null) ? typeof tmp === 'string' : false) ? tmp : null;
  return tmp1_elvis_lhs == null ? '/tmp' : tmp1_elvis_lhs;
}
function get_os() {
  var tmp;
  try {
    tmp = require('os');
  } catch ($p) {
    var tmp_0;
    if ($p instanceof Error) {
      var t = $p;
      tmp_0 = null;
    } else {
      throw $p;
    }
    tmp = tmp_0;
  }
  return tmp;
}
function get_PLATFORM_DIRECTORY_SEPARATOR() {
  var tmp0_safe_receiver = get_path();
  var tmp = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.sep;
  var tmp1_elvis_lhs = (!(tmp == null) ? typeof tmp === 'string' : false) ? tmp : null;
  return tmp1_elvis_lhs == null ? '/' : tmp1_elvis_lhs;
}
function get_path() {
  var tmp;
  try {
    tmp = require('path');
  } catch ($p) {
    var tmp_0;
    if ($p instanceof Error) {
      var t = $p;
      tmp_0 = null;
    } else {
      throw $p;
    }
    tmp = tmp_0;
  }
  return tmp;
}
function Companion_1() {
  Companion_instance_1 = this;
  var tmp = this;
  // Inline function 'kotlin.byteArrayOf' call
  var tmp$ret$0 = new Int8Array([]);
  tmp.s1h_1 = new ByteString(tmp$ret$0);
}
protoOf(Companion_1).t1h = function (_this__u8e3s4) {
  // Inline function 'okio.internal.commonEncodeUtf8' call
  var byteString = new ByteString(asUtf8ToByteArray(_this__u8e3s4));
  byteString.e1i(_this__u8e3s4);
  return byteString;
};
var Companion_instance_1;
function Companion_getInstance_1() {
  if (Companion_instance_1 == null)
    new Companion_1();
  return Companion_instance_1;
}
function ByteString(data) {
  Companion_getInstance_1();
  this.t1g_1 = data;
  this.u1g_1 = 0;
  this.v1g_1 = null;
}
protoOf(ByteString).f1i = function (value) {
};
protoOf(ByteString).e1i = function (value) {
};
protoOf(ByteString).g1i = function () {
  // Inline function 'okio.internal.commonUtf8' call
  var result = this.v1g_1;
  if (result == null) {
    result = toUtf8String(this.h1i());
    this.e1i(result);
  }
  return result;
};
protoOf(ByteString).i1i = function () {
  // Inline function 'okio.internal.commonHex' call
  var result = charArray(imul(this.t1g_1.length, 2));
  var c = 0;
  var indexedObject = this.t1g_1;
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
protoOf(ByteString).mb = function (beginIndex, endIndex) {
  var tmp$ret$6;
  $l$block: {
    // Inline function 'okio.internal.commonSubstring' call
    var endIndex_0 = resolveDefaultParameter(this, endIndex);
    // Inline function 'kotlin.require' call
    if (!(beginIndex >= 0)) {
      var message = 'beginIndex < 0';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    // Inline function 'kotlin.require' call
    if (!(endIndex_0 <= this.t1g_1.length)) {
      var message_0 = 'endIndex > length(' + this.t1g_1.length + ')';
      throw IllegalArgumentException_init_$Create$(toString(message_0));
    }
    var subLen = endIndex_0 - beginIndex | 0;
    // Inline function 'kotlin.require' call
    if (!(subLen >= 0)) {
      var message_1 = 'endIndex < beginIndex';
      throw IllegalArgumentException_init_$Create$(toString(message_1));
    }
    if (beginIndex === 0 && endIndex_0 === this.t1g_1.length) {
      tmp$ret$6 = this;
      break $l$block;
    }
    tmp$ret$6 = new ByteString(copyOfRange(this.t1g_1, beginIndex, endIndex_0));
  }
  return tmp$ret$6;
};
protoOf(ByteString).j1i = function (beginIndex, endIndex, $super) {
  beginIndex = beginIndex === VOID ? 0 : beginIndex;
  endIndex = endIndex === VOID ? get_DEFAULT__ByteString_size() : endIndex;
  return $super === VOID ? this.mb(beginIndex, endIndex) : $super.mb.call(this, beginIndex, endIndex);
};
protoOf(ByteString).k1i = function (pos) {
  if (pos >= this.u() || pos < 0)
    throw new ArrayIndexOutOfBoundsException('size=' + this.u() + ' pos=' + pos);
  // Inline function 'okio.internal.commonGetByte' call
  return this.t1g_1[pos];
};
protoOf(ByteString).w = function (index) {
  return this.k1i(index);
};
protoOf(ByteString).u = function () {
  return this.l1i();
};
protoOf(ByteString).l1i = function () {
  // Inline function 'okio.internal.commonGetSize' call
  return this.t1g_1.length;
};
protoOf(ByteString).h1i = function () {
  // Inline function 'okio.internal.commonInternalArray' call
  return this.t1g_1;
};
protoOf(ByteString).m1i = function (buffer, offset, byteCount) {
  return commonWrite(this, buffer, offset, byteCount);
};
protoOf(ByteString).n1i = function (offset, other, otherOffset, byteCount) {
  // Inline function 'okio.internal.commonRangeEquals' call
  return offset >= 0 && offset <= (this.t1g_1.length - byteCount | 0) && otherOffset >= 0 && otherOffset <= (other.length - byteCount | 0) && arrayRangeEquals(this.t1g_1, offset, other, otherOffset, byteCount);
};
protoOf(ByteString).i1h = function (other, fromIndex) {
  return this.o1i(other.h1i(), fromIndex);
};
protoOf(ByteString).k1h = function (other, fromIndex, $super) {
  fromIndex = fromIndex === VOID ? 0 : fromIndex;
  return $super === VOID ? this.i1h(other, fromIndex) : $super.i1h.call(this, other, fromIndex);
};
protoOf(ByteString).o1i = function (other, fromIndex) {
  var tmp$ret$1;
  $l$block: {
    // Inline function 'okio.internal.commonIndexOf' call
    var limit = this.t1g_1.length - other.length | 0;
    // Inline function 'kotlin.comparisons.maxOf' call
    var inductionVariable = Math.max(fromIndex, 0);
    if (inductionVariable <= limit)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        if (arrayRangeEquals(this.t1g_1, i, other, 0, other.length)) {
          tmp$ret$1 = i;
          break $l$block;
        }
      }
       while (!(i === limit));
    tmp$ret$1 = -1;
  }
  return tmp$ret$1;
};
protoOf(ByteString).p1i = function (other, fromIndex) {
  // Inline function 'okio.internal.commonLastIndexOf' call
  return this.q1i(other.h1i(), fromIndex);
};
protoOf(ByteString).j1h = function (other, fromIndex, $super) {
  fromIndex = fromIndex === VOID ? get_DEFAULT__ByteString_size() : fromIndex;
  return $super === VOID ? this.p1i(other, fromIndex) : $super.p1i.call(this, other, fromIndex);
};
protoOf(ByteString).q1i = function (other, fromIndex) {
  var tmp$ret$1;
  $l$block: {
    // Inline function 'okio.internal.commonLastIndexOf' call
    var fromIndex_0 = resolveDefaultParameter(this, fromIndex);
    var limit = this.t1g_1.length - other.length | 0;
    // Inline function 'kotlin.comparisons.minOf' call
    var inductionVariable = Math.min(fromIndex_0, limit);
    if (0 <= inductionVariable)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + -1 | 0;
        if (arrayRangeEquals(this.t1g_1, i, other, 0, other.length)) {
          tmp$ret$1 = i;
          break $l$block;
        }
      }
       while (0 <= inductionVariable);
    tmp$ret$1 = -1;
  }
  return tmp$ret$1;
};
protoOf(ByteString).equals = function (other) {
  // Inline function 'okio.internal.commonEquals' call
  var tmp;
  if (other === this) {
    tmp = true;
  } else {
    if (other instanceof ByteString) {
      tmp = (other.u() === this.t1g_1.length && other.n1i(0, this.t1g_1, 0, this.t1g_1.length));
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
    var result = this.u1g_1;
    if (!(result === 0)) {
      tmp$ret$0 = result;
      break $l$block;
    }
    // Inline function 'kotlin.also' call
    var this_0 = contentHashCode(this.t1g_1);
    this.f1i(this_0);
    tmp$ret$0 = this_0;
  }
  return tmp$ret$0;
};
protoOf(ByteString).r1i = function (other) {
  var tmp$ret$3;
  $l$block_0: {
    // Inline function 'okio.internal.commonCompareTo' call
    var sizeA = this.u();
    var sizeB = other.u();
    var i = 0;
    // Inline function 'kotlin.comparisons.minOf' call
    var size = Math.min(sizeA, sizeB);
    $l$loop: while (i < size) {
      // Inline function 'okio.and' call
      var byteA = this.w(i) & 255;
      // Inline function 'okio.and' call
      var byteB = other.w(i) & 255;
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
protoOf(ByteString).d = function (other) {
  return this.r1i(other instanceof ByteString ? other : THROW_CCE());
};
protoOf(ByteString).toString = function () {
  var tmp$ret$1;
  $l$block_1: {
    // Inline function 'okio.internal.commonToString' call
    // Inline function 'kotlin.collections.isEmpty' call
    if (this.t1g_1.length === 0) {
      tmp$ret$1 = '[size=0]';
      break $l$block_1;
    }
    var i = access$codePointIndexToCharIndex$tByteStringKt(this.t1g_1, 64);
    if (i === -1) {
      var tmp;
      if (this.t1g_1.length <= 64) {
        tmp = '[hex=' + this.i1i() + ']';
      } else {
        var tmp_0 = this.t1g_1.length;
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
          if (!(endIndex <= this.t1g_1.length)) {
            var message_0 = 'endIndex > length(' + this.t1g_1.length + ')';
            throw IllegalArgumentException_init_$Create$(toString(message_0));
          }
          var subLen = endIndex - 0 | 0;
          // Inline function 'kotlin.require' call
          if (!(subLen >= 0)) {
            var message_1 = 'endIndex < beginIndex';
            throw IllegalArgumentException_init_$Create$(toString(message_1));
          }
          if (0 === 0 && endIndex === this.t1g_1.length) {
            tmp$ret$8 = this;
            break $l$block_0;
          }
          tmp$ret$8 = new ByteString(copyOfRange(this.t1g_1, 0, endIndex));
        }
        tmp = '[size=' + tmp_0 + ' hex=' + tmp$ret$8.i1i() + '\u2026]';
      }
      tmp$ret$1 = tmp;
      break $l$block_1;
    }
    var text = this.g1i();
    var safeText = replace(replace(replace(substring(text, 0, i), '\\', '\\\\'), '\n', '\\n'), '\r', '\\r');
    var tmp_1;
    if (i < text.length) {
      tmp_1 = '[size=' + this.t1g_1.length + ' text=' + safeText + '\u2026]';
    } else {
      tmp_1 = '[text=' + safeText + ']';
    }
    tmp$ret$1 = tmp_1;
  }
  return tmp$ret$1;
};
function toByteString($this) {
  return new ByteString($this.s1i());
}
function SegmentedByteString(segments, directory) {
  ByteString.call(this, Companion_getInstance_1().s1h_1.t1g_1);
  this.x1h_1 = segments;
  this.y1h_1 = directory;
}
protoOf(SegmentedByteString).i1i = function () {
  return toByteString(this).i1i();
};
protoOf(SegmentedByteString).mb = function (beginIndex, endIndex) {
  var tmp$ret$6;
  $l$block_0: {
    // Inline function 'okio.internal.commonSubstring' call
    var endIndex_0 = resolveDefaultParameter(this, endIndex);
    // Inline function 'kotlin.require' call
    if (!(beginIndex >= 0)) {
      var message = 'beginIndex=' + beginIndex + ' < 0';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    // Inline function 'kotlin.require' call
    if (!(endIndex_0 <= this.u())) {
      var message_0 = 'endIndex=' + endIndex_0 + ' > length(' + this.u() + ')';
      throw IllegalArgumentException_init_$Create$(toString(message_0));
    }
    var subLen = endIndex_0 - beginIndex | 0;
    // Inline function 'kotlin.require' call
    if (!(subLen >= 0)) {
      var message_1 = 'endIndex=' + endIndex_0 + ' < beginIndex=' + beginIndex;
      throw IllegalArgumentException_init_$Create$(toString(message_1));
    }
    if (beginIndex === 0 && endIndex_0 === this.u()) {
      tmp$ret$6 = this;
      break $l$block_0;
    } else if (beginIndex === endIndex_0) {
      tmp$ret$6 = Companion_getInstance_1().s1h_1;
      break $l$block_0;
    }
    var beginSegment = segment(this, beginIndex);
    var endSegment = segment(this, endIndex_0 - 1 | 0);
    var newSegments = copyOfRange_0(this.x1h_1, beginSegment, endSegment + 1 | 0);
    var newDirectory = new Int32Array(imul(newSegments.length, 2));
    var index = 0;
    var inductionVariable = beginSegment;
    if (inductionVariable <= endSegment)
      do {
        var s = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        var tmp = index;
        // Inline function 'kotlin.comparisons.minOf' call
        var a = this.y1h_1[s] - beginIndex | 0;
        newDirectory[tmp] = Math.min(a, subLen);
        var _unary__edvuaz = index;
        index = _unary__edvuaz + 1 | 0;
        newDirectory[_unary__edvuaz + newSegments.length | 0] = this.y1h_1[s + this.x1h_1.length | 0];
      }
       while (!(s === endSegment));
    var segmentOffset = beginSegment === 0 ? 0 : this.y1h_1[beginSegment - 1 | 0];
    var _index_0__fvwizt = newSegments.length;
    newDirectory[_index_0__fvwizt] = newDirectory[_index_0__fvwizt] + (beginIndex - segmentOffset | 0) | 0;
    tmp$ret$6 = new SegmentedByteString(newSegments, newDirectory);
  }
  return tmp$ret$6;
};
protoOf(SegmentedByteString).k1i = function (pos) {
  // Inline function 'okio.internal.commonInternalGet' call
  checkOffsetAndCount(fromInt(this.y1h_1[this.x1h_1.length - 1 | 0]), fromInt(pos), new Long(1, 0));
  var segment_0 = segment(this, pos);
  var segmentOffset = segment_0 === 0 ? 0 : this.y1h_1[segment_0 - 1 | 0];
  var segmentPos = this.y1h_1[segment_0 + this.x1h_1.length | 0];
  return this.x1h_1[segment_0][(pos - segmentOffset | 0) + segmentPos | 0];
};
protoOf(SegmentedByteString).l1i = function () {
  // Inline function 'okio.internal.commonGetSize' call
  return this.y1h_1[this.x1h_1.length - 1 | 0];
};
protoOf(SegmentedByteString).s1i = function () {
  // Inline function 'okio.internal.commonToByteArray' call
  var result = new Int8Array(this.u());
  var resultPos = 0;
  // Inline function 'okio.internal.forEachSegment' call
  var segmentCount = this.x1h_1.length;
  var s = 0;
  var pos = 0;
  while (s < segmentCount) {
    var segmentPos = this.y1h_1[segmentCount + s | 0];
    var nextSegmentOffset = this.y1h_1[s];
    var tmp0 = this.x1h_1[s];
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
protoOf(SegmentedByteString).m1i = function (buffer, offset, byteCount) {
  // Inline function 'okio.internal.commonWrite' call
  var endIndex = offset + byteCount | 0;
  var s = segment(this, offset);
  var pos = offset;
  while (pos < endIndex) {
    var segmentOffset = s === 0 ? 0 : this.y1h_1[s - 1 | 0];
    var segmentSize = this.y1h_1[s] - segmentOffset | 0;
    var segmentPos = this.y1h_1[this.x1h_1.length + s | 0];
    // Inline function 'kotlin.comparisons.minOf' call
    var b = segmentOffset + segmentSize | 0;
    var byteCount_0 = Math.min(endIndex, b) - pos | 0;
    var offset_0 = segmentPos + (pos - segmentOffset | 0) | 0;
    var data = this.x1h_1[s];
    var segment_0 = Segment_init_$Create$_0(data, offset_0, offset_0 + byteCount_0 | 0, true, false);
    if (buffer.w1g_1 == null) {
      segment_0.g1g_1 = segment_0;
      segment_0.f1g_1 = segment_0.g1g_1;
      buffer.w1g_1 = segment_0.f1g_1;
    } else {
      ensureNotNull(ensureNotNull(buffer.w1g_1).g1g_1).l1g(segment_0);
    }
    pos = pos + byteCount_0 | 0;
    s = s + 1 | 0;
  }
  var tmp = buffer;
  // Inline function 'kotlin.Long.plus' call
  var this_0 = buffer.x1g_1;
  tmp.x1g_1 = add(this_0, fromInt(byteCount));
  return Unit_instance;
};
protoOf(SegmentedByteString).t1i = function (offset, other, otherOffset, byteCount) {
  var tmp$ret$0;
  $l$block_0: {
    // Inline function 'okio.internal.commonRangeEquals' call
    if (offset < 0 || offset > (this.u() - byteCount | 0)) {
      tmp$ret$0 = false;
      break $l$block_0;
    }
    var otherOffset_0 = otherOffset;
    var endIndex = offset + byteCount | 0;
    var s = segment(this, offset);
    var pos = offset;
    while (pos < endIndex) {
      var segmentOffset = s === 0 ? 0 : this.y1h_1[s - 1 | 0];
      var segmentSize = this.y1h_1[s] - segmentOffset | 0;
      var segmentPos = this.y1h_1[this.x1h_1.length + s | 0];
      // Inline function 'kotlin.comparisons.minOf' call
      var b = segmentOffset + segmentSize | 0;
      var byteCount_0 = Math.min(endIndex, b) - pos | 0;
      var offset_0 = segmentPos + (pos - segmentOffset | 0) | 0;
      var data = this.x1h_1[s];
      if (!other.n1i(otherOffset_0, data, offset_0, byteCount_0)) {
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
protoOf(SegmentedByteString).n1i = function (offset, other, otherOffset, byteCount) {
  var tmp$ret$0;
  $l$block_0: {
    // Inline function 'okio.internal.commonRangeEquals' call
    if (offset < 0 || offset > (this.u() - byteCount | 0) || otherOffset < 0 || otherOffset > (other.length - byteCount | 0)) {
      tmp$ret$0 = false;
      break $l$block_0;
    }
    var otherOffset_0 = otherOffset;
    var endIndex = offset + byteCount | 0;
    var s = segment(this, offset);
    var pos = offset;
    while (pos < endIndex) {
      var segmentOffset = s === 0 ? 0 : this.y1h_1[s - 1 | 0];
      var segmentSize = this.y1h_1[s] - segmentOffset | 0;
      var segmentPos = this.y1h_1[this.x1h_1.length + s | 0];
      // Inline function 'kotlin.comparisons.minOf' call
      var b = segmentOffset + segmentSize | 0;
      var byteCount_0 = Math.min(endIndex, b) - pos | 0;
      var offset_0 = segmentPos + (pos - segmentOffset | 0) | 0;
      var data = this.x1h_1[s];
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
protoOf(SegmentedByteString).o1i = function (other, fromIndex) {
  return toByteString(this).o1i(other, fromIndex);
};
protoOf(SegmentedByteString).q1i = function (other, fromIndex) {
  return toByteString(this).q1i(other, fromIndex);
};
protoOf(SegmentedByteString).h1i = function () {
  return this.s1i();
};
protoOf(SegmentedByteString).equals = function (other) {
  // Inline function 'okio.internal.commonEquals' call
  var tmp;
  if (other === this) {
    tmp = true;
  } else {
    if (other instanceof ByteString) {
      tmp = (other.u() === this.u() && this.t1i(0, other, 0, this.u()));
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
    var result = this.u1g_1;
    if (!(result === 0)) {
      tmp$ret$0 = result;
      break $l$block;
    }
    result = 1;
    // Inline function 'okio.internal.forEachSegment' call
    var segmentCount = this.x1h_1.length;
    var s = 0;
    var pos = 0;
    while (s < segmentCount) {
      var segmentPos = this.y1h_1[segmentCount + s | 0];
      var nextSegmentOffset = this.y1h_1[s];
      var tmp0 = this.x1h_1[s];
      var i = segmentPos;
      var limit = segmentPos + (nextSegmentOffset - pos | 0) | 0;
      while (i < limit) {
        result = imul(31, result) + tmp0[i] | 0;
        i = i + 1 | 0;
      }
      pos = nextSegmentOffset;
      s = s + 1 | 0;
    }
    this.f1i(result);
    tmp$ret$0 = result;
  }
  return tmp$ret$0;
};
protoOf(SegmentedByteString).toString = function () {
  return toByteString(this).toString();
};
function UnsafeCursor() {
  this.u1i_1 = null;
  this.v1i_1 = false;
  this.w1i_1 = null;
  this.x1i_1 = new Long(-1, -1);
  this.y1i_1 = null;
  this.z1i_1 = -1;
  this.a1j_1 = -1;
}
protoOf(UnsafeCursor).d1i = function () {
  // Inline function 'okio.internal.commonClose' call
  // Inline function 'kotlin.check' call
  if (!!(this.u1i_1 == null)) {
    var message = 'not attached to a buffer';
    throw IllegalStateException_init_$Create$(toString(message));
  }
  this.u1i_1 = null;
  this.w1i_1 = null;
  this.x1i_1 = new Long(-1, -1);
  this.y1i_1 = null;
  this.z1i_1 = -1;
  this.a1j_1 = -1;
};
function Buffer() {
  this.w1g_1 = null;
  this.x1g_1 = new Long(0, 0);
}
protoOf(Buffer).p1h = function () {
  return equalsLong(this.x1g_1, new Long(0, 0));
};
protoOf(Buffer).y1g = function (pos) {
  var tmp$ret$0;
  $l$block_1: {
    // Inline function 'okio.internal.commonGet' call
    checkOffsetAndCount(this.x1g_1, pos, new Long(1, 0));
    // Inline function 'okio.internal.seek' call
    var tmp0_elvis_lhs = this.w1g_1;
    var tmp;
    if (tmp0_elvis_lhs == null) {
      var offset = new Long(-1, -1);
      tmp$ret$0 = ensureNotNull(null).a1g_1[convertToInt(subtract(add(numberToLong(null.b1g_1), pos), offset))];
      break $l$block_1;
    } else {
      tmp = tmp0_elvis_lhs;
    }
    var s = tmp;
    if (compare(subtract(this.x1g_1, pos), pos) < 0) {
      var offset_0 = this.x1g_1;
      while (compare(offset_0, pos) > 0) {
        s = ensureNotNull(s.g1g_1);
        offset_0 = subtract(offset_0, fromInt(s.c1g_1 - s.b1g_1 | 0));
      }
      var tmp0 = s;
      var offset_1 = offset_0;
      tmp$ret$0 = ensureNotNull(tmp0).a1g_1[convertToInt(subtract(add(numberToLong(tmp0.b1g_1), pos), offset_1))];
      break $l$block_1;
    } else {
      var offset_2 = new Long(0, 0);
      $l$loop: while (true) {
        var tmp0_0 = offset_2;
        // Inline function 'kotlin.Long.plus' call
        var other = s.c1g_1 - s.b1g_1 | 0;
        var nextOffset = add(tmp0_0, fromInt(other));
        if (compare(nextOffset, pos) > 0)
          break $l$loop;
        s = ensureNotNull(s.f1g_1);
        offset_2 = nextOffset;
      }
      var tmp0_1 = s;
      var offset_3 = offset_2;
      tmp$ret$0 = ensureNotNull(tmp0_1).a1g_1[convertToInt(subtract(add(numberToLong(tmp0_1.b1g_1), pos), offset_3))];
      break $l$block_1;
    }
  }
  return tmp$ret$0;
};
protoOf(Buffer).m1h = function () {
  // Inline function 'okio.internal.commonReadByte' call
  if (equalsLong(this.x1g_1, new Long(0, 0)))
    throw EOFException_init_$Create$();
  var segment = ensureNotNull(this.w1g_1);
  var pos = segment.b1g_1;
  var limit = segment.c1g_1;
  var data = segment.a1g_1;
  var _unary__edvuaz = pos;
  pos = _unary__edvuaz + 1 | 0;
  var b = data[_unary__edvuaz];
  this.x1g_1 = subtract(this.x1g_1, new Long(1, 0));
  if (pos === limit) {
    this.w1g_1 = segment.k1g();
    SegmentPool_instance.s1g(segment);
  } else {
    segment.b1g_1 = pos;
  }
  return b;
};
protoOf(Buffer).r1h = function () {
  // Inline function 'okio.internal.commonReadByteString' call
  return this.q1h(this.x1g_1);
};
protoOf(Buffer).q1h = function (byteCount) {
  var tmp$ret$4;
  $l$block_0: {
    // Inline function 'okio.internal.commonReadByteString' call
    // Inline function 'kotlin.require' call
    if (!(compare(byteCount, new Long(0, 0)) >= 0 && compare(byteCount, new Long(2147483647, 0)) <= 0)) {
      var message = 'byteCount: ' + byteCount.toString();
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    if (compare(this.x1g_1, byteCount) < 0)
      throw EOFException_init_$Create$();
    if (compare(byteCount, new Long(4096, 0)) >= 0) {
      // Inline function 'kotlin.also' call
      var this_0 = this.c1j(convertToInt(byteCount));
      this.a1h(byteCount);
      tmp$ret$4 = this_0;
      break $l$block_0;
    } else {
      tmp$ret$4 = new ByteString(this.b1j(byteCount));
      break $l$block_0;
    }
  }
  return tmp$ret$4;
};
protoOf(Buffer).z1g = function (byteCount) {
  var tmp$ret$2;
  $l$block_0: {
    // Inline function 'okio.internal.commonReadUtf8' call
    // Inline function 'kotlin.require' call
    if (!(compare(byteCount, new Long(0, 0)) >= 0 && compare(byteCount, new Long(2147483647, 0)) <= 0)) {
      var message = 'byteCount: ' + byteCount.toString();
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    if (compare(this.x1g_1, byteCount) < 0)
      throw EOFException_init_$Create$();
    if (equalsLong(byteCount, new Long(0, 0))) {
      tmp$ret$2 = '';
      break $l$block_0;
    }
    var s = ensureNotNull(this.w1g_1);
    if (compare(add(numberToLong(s.b1g_1), byteCount), fromInt(s.c1g_1)) > 0) {
      tmp$ret$2 = commonToUtf8String(this.b1j(byteCount));
      break $l$block_0;
    }
    var result = commonToUtf8String(s.a1g_1, s.b1g_1, s.b1g_1 + convertToInt(byteCount) | 0);
    s.b1g_1 = s.b1g_1 + convertToInt(byteCount) | 0;
    this.x1g_1 = subtract(this.x1g_1, byteCount);
    if (s.b1g_1 === s.c1g_1) {
      this.w1g_1 = s.k1g();
      SegmentPool_instance.s1g(s);
    }
    tmp$ret$2 = result;
  }
  return tmp$ret$2;
};
protoOf(Buffer).d1j = function () {
  // Inline function 'okio.internal.commonReadUtf8Line' call
  // Inline function 'kotlin.code' call
  var this_0 = _Char___init__impl__6a9atx(10);
  var tmp$ret$0 = Char__toInt_impl_vasixd(this_0);
  var newline = this.e1j(toByte(tmp$ret$0));
  return !equalsLong(newline, new Long(-1, -1)) ? readUtf8Line(this, newline) : !equalsLong(this.x1g_1, new Long(0, 0)) ? this.z1g(this.x1g_1) : null;
};
protoOf(Buffer).b1j = function (byteCount) {
  // Inline function 'okio.internal.commonReadByteArray' call
  // Inline function 'kotlin.require' call
  if (!(compare(byteCount, new Long(0, 0)) >= 0 && compare(byteCount, new Long(2147483647, 0)) <= 0)) {
    var message = 'byteCount: ' + byteCount.toString();
    throw IllegalArgumentException_init_$Create$(toString(message));
  }
  if (compare(this.x1g_1, byteCount) < 0)
    throw EOFException_init_$Create$();
  var result = new Int8Array(convertToInt(byteCount));
  this.f1j(result);
  return result;
};
protoOf(Buffer).f1j = function (sink) {
  // Inline function 'okio.internal.commonReadFully' call
  var offset = 0;
  while (offset < sink.length) {
    var read = this.g1j(sink, offset, sink.length - offset | 0);
    if (read === -1)
      throw EOFException_init_$Create$();
    offset = offset + read | 0;
  }
  return Unit_instance;
};
protoOf(Buffer).g1j = function (sink, offset, byteCount) {
  var tmp$ret$0;
  $l$block: {
    // Inline function 'okio.internal.commonRead' call
    checkOffsetAndCount(fromInt(sink.length), fromInt(offset), fromInt(byteCount));
    var tmp0_elvis_lhs = this.w1g_1;
    var tmp;
    if (tmp0_elvis_lhs == null) {
      tmp$ret$0 = -1;
      break $l$block;
    } else {
      tmp = tmp0_elvis_lhs;
    }
    var s = tmp;
    // Inline function 'kotlin.comparisons.minOf' call
    var b = s.c1g_1 - s.b1g_1 | 0;
    var toCopy = Math.min(byteCount, b);
    var tmp0 = s.a1g_1;
    var tmp6 = s.b1g_1;
    // Inline function 'kotlin.collections.copyInto' call
    var endIndex = s.b1g_1 + toCopy | 0;
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    var tmp_0 = tmp0;
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    arrayCopy(tmp_0, sink, offset, tmp6, endIndex);
    s.b1g_1 = s.b1g_1 + toCopy | 0;
    this.x1g_1 = subtract(this.x1g_1, fromInt(toCopy));
    if (s.b1g_1 === s.c1g_1) {
      this.w1g_1 = s.k1g();
      SegmentPool_instance.s1g(s);
    }
    tmp$ret$0 = toCopy;
  }
  return tmp$ret$0;
};
protoOf(Buffer).d2 = function () {
  // Inline function 'okio.internal.commonClear' call
  this.a1h(this.x1g_1);
  return Unit_instance;
};
protoOf(Buffer).a1h = function (byteCount) {
  // Inline function 'okio.internal.commonSkip' call
  var byteCount_0 = byteCount;
  while (compare(byteCount_0, new Long(0, 0)) > 0) {
    var tmp0_elvis_lhs = this.w1g_1;
    var tmp;
    if (tmp0_elvis_lhs == null) {
      throw EOFException_init_$Create$();
    } else {
      tmp = tmp0_elvis_lhs;
    }
    var head = tmp;
    var tmp0 = byteCount_0;
    // Inline function 'okio.minOf' call
    var b = head.c1g_1 - head.b1g_1 | 0;
    // Inline function 'kotlin.comparisons.minOf' call
    var b_0 = fromInt(b);
    var tmp$ret$1 = compare(tmp0, b_0) <= 0 ? tmp0 : b_0;
    var toSkip = convertToInt(tmp$ret$1);
    this.x1g_1 = subtract(this.x1g_1, fromInt(toSkip));
    byteCount_0 = subtract(byteCount_0, fromInt(toSkip));
    head.b1g_1 = head.b1g_1 + toSkip | 0;
    if (head.b1g_1 === head.c1g_1) {
      this.w1g_1 = head.k1g();
      SegmentPool_instance.s1g(head);
    }
  }
  return Unit_instance;
};
protoOf(Buffer).g1h = function (byteString) {
  // Inline function 'okio.internal.commonWrite' call
  var byteCount = byteString.u();
  byteString.m1i(this, 0, byteCount);
  return this;
};
protoOf(Buffer).h1j = function (minimumCapacity) {
  var tmp$ret$2;
  $l$block: {
    // Inline function 'okio.internal.commonWritableSegment' call
    // Inline function 'kotlin.require' call
    if (!(minimumCapacity >= 1 && minimumCapacity <= 8192)) {
      var message = 'unexpected capacity';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    if (this.w1g_1 == null) {
      var result = SegmentPool_instance.p1g();
      this.w1g_1 = result;
      result.g1g_1 = result;
      result.f1g_1 = result;
      tmp$ret$2 = result;
      break $l$block;
    }
    var tail = ensureNotNull(this.w1g_1).g1g_1;
    if ((ensureNotNull(tail).c1g_1 + minimumCapacity | 0) > 8192 || !tail.e1g_1) {
      tail = tail.l1g(SegmentPool_instance.p1g());
    }
    tmp$ret$2 = tail;
  }
  return tmp$ret$2;
};
protoOf(Buffer).h1h = function (string) {
  return this.i1j(string, 0, string.length);
};
protoOf(Buffer).i1j = function (string, beginIndex, endIndex) {
  // Inline function 'okio.internal.commonWriteUtf8' call
  // Inline function 'kotlin.require' call
  if (!(beginIndex >= 0)) {
    var message = 'beginIndex < 0: ' + beginIndex;
    throw IllegalArgumentException_init_$Create$(toString(message));
  }
  // Inline function 'kotlin.require' call
  if (!(endIndex >= beginIndex)) {
    var message_0 = 'endIndex < beginIndex: ' + endIndex + ' < ' + beginIndex;
    throw IllegalArgumentException_init_$Create$(toString(message_0));
  }
  // Inline function 'kotlin.require' call
  if (!(endIndex <= string.length)) {
    var message_1 = 'endIndex > string.length: ' + endIndex + ' > ' + string.length;
    throw IllegalArgumentException_init_$Create$(toString(message_1));
  }
  var i = beginIndex;
  while (i < endIndex) {
    // Inline function 'kotlin.code' call
    var this_0 = charCodeAt(string, i);
    var c = Char__toInt_impl_vasixd(this_0);
    if (c < 128) {
      var tail = this.h1j(1);
      var data = tail.a1g_1;
      var segmentOffset = tail.c1g_1 - i | 0;
      // Inline function 'kotlin.comparisons.minOf' call
      var b = 8192 - segmentOffset | 0;
      var runLimit = Math.min(endIndex, b);
      var _unary__edvuaz = i;
      i = _unary__edvuaz + 1 | 0;
      data[segmentOffset + _unary__edvuaz | 0] = toByte(c);
      $l$loop: while (i < runLimit) {
        // Inline function 'kotlin.code' call
        var this_1 = charCodeAt(string, i);
        c = Char__toInt_impl_vasixd(this_1);
        if (c >= 128)
          break $l$loop;
        var _unary__edvuaz_0 = i;
        i = _unary__edvuaz_0 + 1 | 0;
        data[segmentOffset + _unary__edvuaz_0 | 0] = toByte(c);
      }
      var runSize = (i + segmentOffset | 0) - tail.c1g_1 | 0;
      tail.c1g_1 = tail.c1g_1 + runSize | 0;
      this.x1g_1 = add(this.x1g_1, fromInt(runSize));
    } else if (c < 2048) {
      var tail_0 = this.h1j(2);
      tail_0.a1g_1[tail_0.c1g_1] = toByte(c >> 6 | 192);
      tail_0.a1g_1[tail_0.c1g_1 + 1 | 0] = toByte(c & 63 | 128);
      tail_0.c1g_1 = tail_0.c1g_1 + 2 | 0;
      this.x1g_1 = add(this.x1g_1, new Long(2, 0));
      i = i + 1 | 0;
    } else if (c < 55296 || c > 57343) {
      var tail_1 = this.h1j(3);
      tail_1.a1g_1[tail_1.c1g_1] = toByte(c >> 12 | 224);
      tail_1.a1g_1[tail_1.c1g_1 + 1 | 0] = toByte(c >> 6 & 63 | 128);
      tail_1.a1g_1[tail_1.c1g_1 + 2 | 0] = toByte(c & 63 | 128);
      tail_1.c1g_1 = tail_1.c1g_1 + 3 | 0;
      this.x1g_1 = add(this.x1g_1, new Long(3, 0));
      i = i + 1 | 0;
    } else {
      var tmp;
      if ((i + 1 | 0) < endIndex) {
        // Inline function 'kotlin.code' call
        var this_2 = charCodeAt(string, i + 1 | 0);
        tmp = Char__toInt_impl_vasixd(this_2);
      } else {
        tmp = 0;
      }
      var low = tmp;
      if (c > 56319 || !(56320 <= low ? low <= 57343 : false)) {
        // Inline function 'kotlin.code' call
        var this_3 = _Char___init__impl__6a9atx(63);
        var tmp$ret$10 = Char__toInt_impl_vasixd(this_3);
        this.j1j(tmp$ret$10);
        i = i + 1 | 0;
      } else {
        var codePoint = 65536 + ((c & 1023) << 10 | low & 1023) | 0;
        var tail_2 = this.h1j(4);
        tail_2.a1g_1[tail_2.c1g_1] = toByte(codePoint >> 18 | 240);
        tail_2.a1g_1[tail_2.c1g_1 + 1 | 0] = toByte(codePoint >> 12 & 63 | 128);
        tail_2.a1g_1[tail_2.c1g_1 + 2 | 0] = toByte(codePoint >> 6 & 63 | 128);
        tail_2.a1g_1[tail_2.c1g_1 + 3 | 0] = toByte(codePoint & 63 | 128);
        tail_2.c1g_1 = tail_2.c1g_1 + 4 | 0;
        this.x1g_1 = add(this.x1g_1, new Long(4, 0));
        i = i + 2 | 0;
      }
    }
  }
  return this;
};
protoOf(Buffer).b1h = function (source, offset, byteCount) {
  // Inline function 'okio.internal.commonWrite' call
  var offset_0 = offset;
  checkOffsetAndCount(fromInt(source.length), fromInt(offset_0), fromInt(byteCount));
  var limit = offset_0 + byteCount | 0;
  while (offset_0 < limit) {
    var tail = this.h1j(1);
    var tmp0 = limit - offset_0 | 0;
    // Inline function 'kotlin.comparisons.minOf' call
    var b = 8192 - tail.c1g_1 | 0;
    var toCopy = Math.min(tmp0, b);
    var tmp2 = tail.a1g_1;
    var tmp4 = tail.c1g_1;
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
    tail.c1g_1 = tail.c1g_1 + toCopy | 0;
  }
  this.x1g_1 = add(this.x1g_1, fromInt(byteCount));
  return this;
};
protoOf(Buffer).j1j = function (b) {
  // Inline function 'okio.internal.commonWriteByte' call
  var tail = this.h1j(1);
  var _unary__edvuaz = tail.c1g_1;
  tail.c1g_1 = _unary__edvuaz + 1 | 0;
  tail.a1g_1[_unary__edvuaz] = toByte(b);
  this.x1g_1 = add(this.x1g_1, new Long(1, 0));
  return this;
};
protoOf(Buffer).o1h = function (source, byteCount) {
  var tmp$ret$4;
  $l$block: {
    // Inline function 'okio.internal.commonWrite' call
    var byteCount_0 = byteCount;
    // Inline function 'kotlin.require' call
    if (!!(source === this)) {
      var message = 'source == this';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    checkOffsetAndCount(source.x1g_1, new Long(0, 0), byteCount_0);
    while (compare(byteCount_0, new Long(0, 0)) > 0) {
      if (compare(byteCount_0, fromInt(ensureNotNull(source.w1g_1).c1g_1 - ensureNotNull(source.w1g_1).b1g_1 | 0)) < 0) {
        var tail = !(this.w1g_1 == null) ? ensureNotNull(this.w1g_1).g1g_1 : null;
        var tmp;
        if (!(tail == null) && tail.e1g_1) {
          var tmp0 = byteCount_0;
          // Inline function 'kotlin.Long.plus' call
          var other = tail.c1g_1;
          var tmp0_0 = add(tmp0, fromInt(other));
          // Inline function 'kotlin.Long.minus' call
          var other_0 = tail.d1g_1 ? 0 : tail.b1g_1;
          var tmp$ret$3 = subtract(tmp0_0, fromInt(other_0));
          tmp = compare(tmp$ret$3, new Long(8192, 0)) <= 0;
        } else {
          tmp = false;
        }
        if (tmp) {
          ensureNotNull(source.w1g_1).r1g(tail, convertToInt(byteCount_0));
          source.x1g_1 = subtract(source.x1g_1, byteCount_0);
          this.x1g_1 = add(this.x1g_1, byteCount_0);
          tmp$ret$4 = Unit_instance;
          break $l$block;
        } else {
          source.w1g_1 = ensureNotNull(source.w1g_1).m1g(convertToInt(byteCount_0));
        }
      }
      var segmentToMove = source.w1g_1;
      var movedByteCount = fromInt(ensureNotNull(segmentToMove).c1g_1 - segmentToMove.b1g_1 | 0);
      source.w1g_1 = segmentToMove.k1g();
      if (this.w1g_1 == null) {
        this.w1g_1 = segmentToMove;
        segmentToMove.g1g_1 = segmentToMove;
        segmentToMove.f1g_1 = segmentToMove.g1g_1;
      } else {
        var tail_0 = ensureNotNull(this.w1g_1).g1g_1;
        tail_0 = ensureNotNull(tail_0).l1g(segmentToMove);
        tail_0.q1g();
      }
      source.x1g_1 = subtract(source.x1g_1, movedByteCount);
      this.x1g_1 = add(this.x1g_1, movedByteCount);
      byteCount_0 = subtract(byteCount_0, movedByteCount);
    }
    tmp$ret$4 = Unit_instance;
  }
  return tmp$ret$4;
};
protoOf(Buffer).k1j = function (sink, byteCount) {
  var tmp$ret$2;
  $l$block: {
    // Inline function 'okio.internal.commonRead' call
    var byteCount_0 = byteCount;
    // Inline function 'kotlin.require' call
    if (!(compare(byteCount_0, new Long(0, 0)) >= 0)) {
      var message = 'byteCount < 0: ' + byteCount_0.toString();
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    if (equalsLong(this.x1g_1, new Long(0, 0))) {
      tmp$ret$2 = new Long(-1, -1);
      break $l$block;
    }
    if (compare(byteCount_0, this.x1g_1) > 0)
      byteCount_0 = this.x1g_1;
    sink.o1h(this, byteCount_0);
    tmp$ret$2 = byteCount_0;
  }
  return tmp$ret$2;
};
protoOf(Buffer).e1j = function (b) {
  return this.l1j(b, new Long(0, 0), new Long(-1, 2147483647));
};
protoOf(Buffer).l1j = function (b, fromIndex, toIndex) {
  var tmp$ret$2;
  $l$block_8: {
    // Inline function 'okio.internal.commonIndexOf' call
    var fromIndex_0 = fromIndex;
    var toIndex_0 = toIndex;
    // Inline function 'kotlin.require' call
    if (!(compare(new Long(0, 0), fromIndex_0) <= 0 ? compare(fromIndex_0, toIndex_0) <= 0 : false)) {
      var message = 'size=' + this.x1g_1.toString() + ' fromIndex=' + fromIndex_0.toString() + ' toIndex=' + toIndex_0.toString();
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    if (compare(toIndex_0, this.x1g_1) > 0)
      toIndex_0 = this.x1g_1;
    if (equalsLong(fromIndex_0, toIndex_0)) {
      tmp$ret$2 = new Long(-1, -1);
      break $l$block_8;
    }
    // Inline function 'okio.internal.seek' call
    var fromIndex_1 = fromIndex_0;
    var tmp0_elvis_lhs = this.w1g_1;
    var tmp;
    if (tmp0_elvis_lhs == null) {
      var offset = new Long(-1, -1);
      var tmp_0;
      if (null == null) {
        tmp$ret$2 = new Long(-1, -1);
        break $l$block_8;
      } else {
        tmp_0 = null;
      }
      var s = tmp_0;
      var offset_0 = offset;
      while (compare(offset_0, toIndex_0) < 0) {
        var data = s.a1g_1;
        var tmp0 = fromInt(s.c1g_1);
        // Inline function 'kotlin.comparisons.minOf' call
        var b_0 = subtract(add(numberToLong(s.b1g_1), toIndex_0), offset_0);
        var tmp$ret$3 = compare(tmp0, b_0) <= 0 ? tmp0 : b_0;
        var limit = convertToInt(tmp$ret$3);
        var pos = convertToInt(subtract(add(numberToLong(s.b1g_1), fromIndex_0), offset_0));
        while (pos < limit) {
          if (data[pos] === b) {
            tmp$ret$2 = add(numberToLong(pos - s.b1g_1 | 0), offset_0);
            break $l$block_8;
          }
          pos = pos + 1 | 0;
        }
        offset_0 = add(offset_0, fromInt(s.c1g_1 - s.b1g_1 | 0));
        fromIndex_0 = offset_0;
        s = ensureNotNull(s.f1g_1);
      }
      tmp$ret$2 = new Long(-1, -1);
      break $l$block_8;
    } else {
      tmp = tmp0_elvis_lhs;
    }
    var s_0 = tmp;
    if (compare(subtract(this.x1g_1, fromIndex_1), fromIndex_1) < 0) {
      var offset_1 = this.x1g_1;
      while (compare(offset_1, fromIndex_1) > 0) {
        s_0 = ensureNotNull(s_0.g1g_1);
        offset_1 = subtract(offset_1, fromInt(s_0.c1g_1 - s_0.b1g_1 | 0));
      }
      var tmp0_0 = s_0;
      var offset_2 = offset_1;
      var tmp_1;
      if (tmp0_0 == null) {
        tmp$ret$2 = new Long(-1, -1);
        break $l$block_8;
      } else {
        tmp_1 = tmp0_0;
      }
      var s_1 = tmp_1;
      var offset_3 = offset_2;
      while (compare(offset_3, toIndex_0) < 0) {
        var data_0 = s_1.a1g_1;
        var tmp0_1 = fromInt(s_1.c1g_1);
        // Inline function 'kotlin.comparisons.minOf' call
        var b_1 = subtract(add(numberToLong(s_1.b1g_1), toIndex_0), offset_3);
        var tmp$ret$5 = compare(tmp0_1, b_1) <= 0 ? tmp0_1 : b_1;
        var limit_0 = convertToInt(tmp$ret$5);
        var pos_0 = convertToInt(subtract(add(numberToLong(s_1.b1g_1), fromIndex_0), offset_3));
        while (pos_0 < limit_0) {
          if (data_0[pos_0] === b) {
            tmp$ret$2 = add(numberToLong(pos_0 - s_1.b1g_1 | 0), offset_3);
            break $l$block_8;
          }
          pos_0 = pos_0 + 1 | 0;
        }
        offset_3 = add(offset_3, fromInt(s_1.c1g_1 - s_1.b1g_1 | 0));
        fromIndex_0 = offset_3;
        s_1 = ensureNotNull(s_1.f1g_1);
      }
      tmp$ret$2 = new Long(-1, -1);
      break $l$block_8;
    } else {
      var offset_4 = new Long(0, 0);
      $l$loop: while (true) {
        var tmp0_2 = offset_4;
        // Inline function 'kotlin.Long.plus' call
        var other = s_0.c1g_1 - s_0.b1g_1 | 0;
        var nextOffset = add(tmp0_2, fromInt(other));
        if (compare(nextOffset, fromIndex_1) > 0)
          break $l$loop;
        s_0 = ensureNotNull(s_0.f1g_1);
        offset_4 = nextOffset;
      }
      var tmp0_3 = s_0;
      var offset_5 = offset_4;
      var tmp_2;
      if (tmp0_3 == null) {
        tmp$ret$2 = new Long(-1, -1);
        break $l$block_8;
      } else {
        tmp_2 = tmp0_3;
      }
      var s_2 = tmp_2;
      var offset_6 = offset_5;
      while (compare(offset_6, toIndex_0) < 0) {
        var data_1 = s_2.a1g_1;
        var tmp0_4 = fromInt(s_2.c1g_1);
        // Inline function 'kotlin.comparisons.minOf' call
        var b_2 = subtract(add(numberToLong(s_2.b1g_1), toIndex_0), offset_6);
        var tmp$ret$7 = compare(tmp0_4, b_2) <= 0 ? tmp0_4 : b_2;
        var limit_1 = convertToInt(tmp$ret$7);
        var pos_1 = convertToInt(subtract(add(numberToLong(s_2.b1g_1), fromIndex_0), offset_6));
        while (pos_1 < limit_1) {
          if (data_1[pos_1] === b) {
            tmp$ret$2 = add(numberToLong(pos_1 - s_2.b1g_1 | 0), offset_6);
            break $l$block_8;
          }
          pos_1 = pos_1 + 1 | 0;
        }
        offset_6 = add(offset_6, fromInt(s_2.c1g_1 - s_2.b1g_1 | 0));
        fromIndex_0 = offset_6;
        s_2 = ensureNotNull(s_2.f1g_1);
      }
      tmp$ret$2 = new Long(-1, -1);
      break $l$block_8;
    }
  }
  return tmp$ret$2;
};
protoOf(Buffer).n1h = function (targetBytes) {
  return this.m1j(targetBytes, new Long(0, 0));
};
protoOf(Buffer).m1j = function (targetBytes, fromIndex) {
  var tmp$ret$2;
  $l$block_10: {
    // Inline function 'okio.internal.commonIndexOfElement' call
    var fromIndex_0 = fromIndex;
    // Inline function 'kotlin.require' call
    if (!(compare(fromIndex_0, new Long(0, 0)) >= 0)) {
      var message = 'fromIndex < 0: ' + fromIndex_0.toString();
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    // Inline function 'okio.internal.seek' call
    var fromIndex_1 = fromIndex_0;
    var tmp0_elvis_lhs = this.w1g_1;
    var tmp;
    if (tmp0_elvis_lhs == null) {
      var offset = new Long(-1, -1);
      var tmp_0;
      if (null == null) {
        tmp$ret$2 = new Long(-1, -1);
        break $l$block_10;
      } else {
        tmp_0 = null;
      }
      var s = tmp_0;
      var offset_0 = offset;
      if (targetBytes.u() === 2) {
        var b0 = targetBytes.w(0);
        var b1 = targetBytes.w(1);
        while (compare(offset_0, this.x1g_1) < 0) {
          var data = s.a1g_1;
          var pos = convertToInt(subtract(add(numberToLong(s.b1g_1), fromIndex_0), offset_0));
          var limit = s.c1g_1;
          while (pos < limit) {
            var b = data[pos];
            if (b === b0 || b === b1) {
              tmp$ret$2 = add(numberToLong(pos - s.b1g_1 | 0), offset_0);
              break $l$block_10;
            }
            pos = pos + 1 | 0;
          }
          offset_0 = add(offset_0, fromInt(s.c1g_1 - s.b1g_1 | 0));
          fromIndex_0 = offset_0;
          s = ensureNotNull(s.f1g_1);
        }
      } else {
        var targetByteArray = targetBytes.h1i();
        while (compare(offset_0, this.x1g_1) < 0) {
          var data_0 = s.a1g_1;
          var pos_0 = convertToInt(subtract(add(numberToLong(s.b1g_1), fromIndex_0), offset_0));
          var limit_0 = s.c1g_1;
          while (pos_0 < limit_0) {
            var b_0 = data_0[pos_0];
            var inductionVariable = 0;
            var last = targetByteArray.length;
            while (inductionVariable < last) {
              var t = targetByteArray[inductionVariable];
              inductionVariable = inductionVariable + 1 | 0;
              if (b_0 === t) {
                tmp$ret$2 = add(numberToLong(pos_0 - s.b1g_1 | 0), offset_0);
                break $l$block_10;
              }
            }
            pos_0 = pos_0 + 1 | 0;
          }
          offset_0 = add(offset_0, fromInt(s.c1g_1 - s.b1g_1 | 0));
          fromIndex_0 = offset_0;
          s = ensureNotNull(s.f1g_1);
        }
      }
      tmp$ret$2 = new Long(-1, -1);
      break $l$block_10;
    } else {
      tmp = tmp0_elvis_lhs;
    }
    var s_0 = tmp;
    if (compare(subtract(this.x1g_1, fromIndex_1), fromIndex_1) < 0) {
      var offset_1 = this.x1g_1;
      while (compare(offset_1, fromIndex_1) > 0) {
        s_0 = ensureNotNull(s_0.g1g_1);
        offset_1 = subtract(offset_1, fromInt(s_0.c1g_1 - s_0.b1g_1 | 0));
      }
      var tmp0 = s_0;
      var offset_2 = offset_1;
      var tmp_1;
      if (tmp0 == null) {
        tmp$ret$2 = new Long(-1, -1);
        break $l$block_10;
      } else {
        tmp_1 = tmp0;
      }
      var s_1 = tmp_1;
      var offset_3 = offset_2;
      if (targetBytes.u() === 2) {
        var b0_0 = targetBytes.w(0);
        var b1_0 = targetBytes.w(1);
        while (compare(offset_3, this.x1g_1) < 0) {
          var data_1 = s_1.a1g_1;
          var pos_1 = convertToInt(subtract(add(numberToLong(s_1.b1g_1), fromIndex_0), offset_3));
          var limit_1 = s_1.c1g_1;
          while (pos_1 < limit_1) {
            var b_1 = data_1[pos_1];
            if (b_1 === b0_0 || b_1 === b1_0) {
              tmp$ret$2 = add(numberToLong(pos_1 - s_1.b1g_1 | 0), offset_3);
              break $l$block_10;
            }
            pos_1 = pos_1 + 1 | 0;
          }
          offset_3 = add(offset_3, fromInt(s_1.c1g_1 - s_1.b1g_1 | 0));
          fromIndex_0 = offset_3;
          s_1 = ensureNotNull(s_1.f1g_1);
        }
      } else {
        var targetByteArray_0 = targetBytes.h1i();
        while (compare(offset_3, this.x1g_1) < 0) {
          var data_2 = s_1.a1g_1;
          var pos_2 = convertToInt(subtract(add(numberToLong(s_1.b1g_1), fromIndex_0), offset_3));
          var limit_2 = s_1.c1g_1;
          while (pos_2 < limit_2) {
            var b_2 = data_2[pos_2];
            var inductionVariable_0 = 0;
            var last_0 = targetByteArray_0.length;
            while (inductionVariable_0 < last_0) {
              var t_0 = targetByteArray_0[inductionVariable_0];
              inductionVariable_0 = inductionVariable_0 + 1 | 0;
              if (b_2 === t_0) {
                tmp$ret$2 = add(numberToLong(pos_2 - s_1.b1g_1 | 0), offset_3);
                break $l$block_10;
              }
            }
            pos_2 = pos_2 + 1 | 0;
          }
          offset_3 = add(offset_3, fromInt(s_1.c1g_1 - s_1.b1g_1 | 0));
          fromIndex_0 = offset_3;
          s_1 = ensureNotNull(s_1.f1g_1);
        }
      }
      tmp$ret$2 = new Long(-1, -1);
      break $l$block_10;
    } else {
      var offset_4 = new Long(0, 0);
      $l$loop: while (true) {
        var tmp0_0 = offset_4;
        // Inline function 'kotlin.Long.plus' call
        var other = s_0.c1g_1 - s_0.b1g_1 | 0;
        var nextOffset = add(tmp0_0, fromInt(other));
        if (compare(nextOffset, fromIndex_1) > 0)
          break $l$loop;
        s_0 = ensureNotNull(s_0.f1g_1);
        offset_4 = nextOffset;
      }
      var tmp0_1 = s_0;
      var offset_5 = offset_4;
      var tmp_2;
      if (tmp0_1 == null) {
        tmp$ret$2 = new Long(-1, -1);
        break $l$block_10;
      } else {
        tmp_2 = tmp0_1;
      }
      var s_2 = tmp_2;
      var offset_6 = offset_5;
      if (targetBytes.u() === 2) {
        var b0_1 = targetBytes.w(0);
        var b1_1 = targetBytes.w(1);
        while (compare(offset_6, this.x1g_1) < 0) {
          var data_3 = s_2.a1g_1;
          var pos_3 = convertToInt(subtract(add(numberToLong(s_2.b1g_1), fromIndex_0), offset_6));
          var limit_3 = s_2.c1g_1;
          while (pos_3 < limit_3) {
            var b_3 = data_3[pos_3];
            if (b_3 === b0_1 || b_3 === b1_1) {
              tmp$ret$2 = add(numberToLong(pos_3 - s_2.b1g_1 | 0), offset_6);
              break $l$block_10;
            }
            pos_3 = pos_3 + 1 | 0;
          }
          offset_6 = add(offset_6, fromInt(s_2.c1g_1 - s_2.b1g_1 | 0));
          fromIndex_0 = offset_6;
          s_2 = ensureNotNull(s_2.f1g_1);
        }
      } else {
        var targetByteArray_1 = targetBytes.h1i();
        while (compare(offset_6, this.x1g_1) < 0) {
          var data_4 = s_2.a1g_1;
          var pos_4 = convertToInt(subtract(add(numberToLong(s_2.b1g_1), fromIndex_0), offset_6));
          var limit_4 = s_2.c1g_1;
          while (pos_4 < limit_4) {
            var b_4 = data_4[pos_4];
            var inductionVariable_1 = 0;
            var last_1 = targetByteArray_1.length;
            while (inductionVariable_1 < last_1) {
              var t_1 = targetByteArray_1[inductionVariable_1];
              inductionVariable_1 = inductionVariable_1 + 1 | 0;
              if (b_4 === t_1) {
                tmp$ret$2 = add(numberToLong(pos_4 - s_2.b1g_1 | 0), offset_6);
                break $l$block_10;
              }
            }
            pos_4 = pos_4 + 1 | 0;
          }
          offset_6 = add(offset_6, fromInt(s_2.c1g_1 - s_2.b1g_1 | 0));
          fromIndex_0 = offset_6;
          s_2 = ensureNotNull(s_2.f1g_1);
        }
      }
      tmp$ret$2 = new Long(-1, -1);
      break $l$block_10;
    }
  }
  return tmp$ret$2;
};
protoOf(Buffer).l1h = function (offset, bytes) {
  return this.n1j(offset, bytes, 0, bytes.u());
};
protoOf(Buffer).n1j = function (offset, bytes, bytesOffset, byteCount) {
  var tmp$ret$0;
  $l$block_0: {
    // Inline function 'okio.internal.commonRangeEquals' call
    if (compare(offset, new Long(0, 0)) < 0 || bytesOffset < 0 || byteCount < 0 || compare(subtract(this.x1g_1, offset), fromInt(byteCount)) < 0 || (bytes.u() - bytesOffset | 0) < byteCount) {
      tmp$ret$0 = false;
      break $l$block_0;
    }
    var inductionVariable = 0;
    if (inductionVariable < byteCount)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        // Inline function 'kotlin.Long.plus' call
        var tmp$ret$1 = add(offset, fromInt(i));
        if (!(this.y1g(tmp$ret$1) === bytes.w(bytesOffset + i | 0))) {
          tmp$ret$0 = false;
          break $l$block_0;
        }
      }
       while (inductionVariable < byteCount);
    tmp$ret$0 = true;
  }
  return tmp$ret$0;
};
protoOf(Buffer).d1i = function () {
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
    if (!equalsLong(this.x1g_1, other.x1g_1)) {
      tmp$ret$0 = false;
      break $l$block_3;
    }
    if (equalsLong(this.x1g_1, new Long(0, 0))) {
      tmp$ret$0 = true;
      break $l$block_3;
    }
    var sa = ensureNotNull(this.w1g_1);
    var sb = ensureNotNull(other.w1g_1);
    var posA = sa.b1g_1;
    var posB = sb.b1g_1;
    var pos = new Long(0, 0);
    var count;
    while (compare(pos, this.x1g_1) < 0) {
      var tmp0 = sa.c1g_1 - posA | 0;
      // Inline function 'kotlin.comparisons.minOf' call
      var b = sb.c1g_1 - posB | 0;
      var tmp$ret$1 = Math.min(tmp0, b);
      count = fromInt(tmp$ret$1);
      var inductionVariable = new Long(0, 0);
      if (compare(inductionVariable, count) < 0)
        do {
          var i = inductionVariable;
          inductionVariable = add(inductionVariable, new Long(1, 0));
          var tmp = sa.a1g_1;
          var _unary__edvuaz = posA;
          posA = _unary__edvuaz + 1 | 0;
          var tmp_0 = tmp[_unary__edvuaz];
          var tmp_1 = sb.a1g_1;
          var _unary__edvuaz_0 = posB;
          posB = _unary__edvuaz_0 + 1 | 0;
          if (!(tmp_0 === tmp_1[_unary__edvuaz_0])) {
            tmp$ret$0 = false;
            break $l$block_3;
          }
        }
         while (compare(inductionVariable, count) < 0);
      if (posA === sa.c1g_1) {
        sa = ensureNotNull(sa.f1g_1);
        posA = sa.b1g_1;
      }
      if (posB === sb.c1g_1) {
        sb = ensureNotNull(sb.f1g_1);
        posB = sb.b1g_1;
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
    var tmp0_elvis_lhs = this.w1g_1;
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
      var pos = s.b1g_1;
      var limit = s.c1g_1;
      while (pos < limit) {
        result = imul(31, result) + s.a1g_1[pos] | 0;
        pos = pos + 1 | 0;
      }
      s = ensureNotNull(s.f1g_1);
    }
     while (!(s === this.w1g_1));
    tmp$ret$0 = result;
  }
  return tmp$ret$0;
};
protoOf(Buffer).toString = function () {
  return this.o1j().toString();
};
protoOf(Buffer).o1j = function () {
  // Inline function 'okio.internal.commonSnapshot' call
  // Inline function 'kotlin.check' call
  if (!(compare(this.x1g_1, new Long(2147483647, 0)) <= 0)) {
    var message = 'size > Int.MAX_VALUE: ' + this.x1g_1.toString();
    throw IllegalStateException_init_$Create$(toString(message));
  }
  return this.c1j(convertToInt(this.x1g_1));
};
protoOf(Buffer).c1j = function (byteCount) {
  var tmp$ret$0;
  $l$block: {
    // Inline function 'okio.internal.commonSnapshot' call
    if (byteCount === 0) {
      tmp$ret$0 = Companion_getInstance_1().s1h_1;
      break $l$block;
    }
    checkOffsetAndCount(this.x1g_1, new Long(0, 0), fromInt(byteCount));
    var offset = 0;
    var segmentCount = 0;
    var s = this.w1g_1;
    while (offset < byteCount) {
      if (ensureNotNull(s).c1g_1 === s.b1g_1) {
        throw AssertionError_init_$Create$('s.limit == s.pos');
      }
      offset = offset + (s.c1g_1 - s.b1g_1 | 0) | 0;
      segmentCount = segmentCount + 1 | 0;
      s = s.f1g_1;
    }
    // Inline function 'kotlin.arrayOfNulls' call
    var size = segmentCount;
    var segments = Array(size);
    var directory = new Int32Array(imul(segmentCount, 2));
    offset = 0;
    segmentCount = 0;
    s = this.w1g_1;
    while (offset < byteCount) {
      segments[segmentCount] = ensureNotNull(s).a1g_1;
      offset = offset + (s.c1g_1 - s.b1g_1 | 0) | 0;
      var tmp = segmentCount;
      // Inline function 'kotlin.comparisons.minOf' call
      var a = offset;
      directory[tmp] = Math.min(a, byteCount);
      directory[segmentCount + segments.length | 0] = s.b1g_1;
      s.d1g_1 = true;
      segmentCount = segmentCount + 1 | 0;
      s = s.f1g_1;
    }
    tmp$ret$0 = new SegmentedByteString(isArray(segments) ? segments : THROW_CCE(), directory);
  }
  return tmp$ret$0;
};
function asUtf8ToByteArray(_this__u8e3s4) {
  return commonAsUtf8ToByteArray(_this__u8e3s4);
}
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
function IOException_init_$Create$(message) {
  var tmp = IOException_init_$Init$(message, objectCreate(protoOf(IOException)));
  captureStack(tmp, IOException_init_$Create$);
  return tmp;
}
function IOException_init_$Init$_0($this) {
  IOException.call($this, null, null);
  return $this;
}
function IOException_init_$Create$_0() {
  var tmp = IOException_init_$Init$_0(objectCreate(protoOf(IOException)));
  captureStack(tmp, IOException_init_$Create$_0);
  return tmp;
}
function IOException(message, cause) {
  Exception_init_$Init$(message, cause, this);
  captureStack(this, IOException);
}
function FileNotFoundException(message) {
  IOException_init_$Init$(message, this);
  captureStack(this, FileNotFoundException);
}
function toUtf8String(_this__u8e3s4) {
  return commonToUtf8String(_this__u8e3s4);
}
function Companion_2() {
  Companion_instance_2 = this;
  this.f1h_1 = get_PLATFORM_DIRECTORY_SEPARATOR();
}
protoOf(Companion_2).p1j = function (_this__u8e3s4, normalize) {
  return commonToPath(_this__u8e3s4, normalize);
};
protoOf(Companion_2).a1i = function (_this__u8e3s4, normalize, $super) {
  normalize = normalize === VOID ? false : normalize;
  return $super === VOID ? this.p1j(_this__u8e3s4, normalize) : $super.p1j.call(this, _this__u8e3s4, normalize);
};
var Companion_instance_2;
function Companion_getInstance_2() {
  if (Companion_instance_2 == null)
    new Companion_2();
  return Companion_instance_2;
}
function Path(bytes) {
  Companion_getInstance_2();
  this.c1h_1 = bytes;
}
protoOf(Path).e1h = function () {
  // Inline function 'okio.internal.commonIsAbsolute' call
  return !(access$rootLength$tPathKt(this) === -1);
};
protoOf(Path).d1h = function () {
  var tmp$ret$0;
  $l$block_2: {
    // Inline function 'okio.internal.commonVolumeLetter' call
    if (!(this.c1h_1.k1h(access$_get_SLASH_$tPathKt_oiy1wy()) === -1)) {
      tmp$ret$0 = null;
      break $l$block_2;
    }
    if (this.c1h_1.u() < 2) {
      tmp$ret$0 = null;
      break $l$block_2;
    }
    var tmp = this.c1h_1.w(1);
    // Inline function 'kotlin.code' call
    var this_0 = _Char___init__impl__6a9atx(58);
    var tmp$ret$1 = Char__toInt_impl_vasixd(this_0);
    if (!(tmp === toByte(tmp$ret$1))) {
      tmp$ret$0 = null;
      break $l$block_2;
    }
    var c = numberToChar(this.c1h_1.w(0));
    if (!(_Char___init__impl__6a9atx(97) <= c ? c <= _Char___init__impl__6a9atx(122) : false) && !(_Char___init__impl__6a9atx(65) <= c ? c <= _Char___init__impl__6a9atx(90) : false)) {
      tmp$ret$0 = null;
      break $l$block_2;
    }
    tmp$ret$0 = c;
  }
  return tmp$ret$0;
};
protoOf(Path).q1j = function () {
  // Inline function 'okio.internal.commonNameBytes' call
  var lastSlash = access$_get_indexOfLastSlash_$tPathKt_czkh05(this);
  var tmp;
  if (!(lastSlash === -1)) {
    tmp = this.c1h_1.j1i(lastSlash + 1 | 0);
  } else {
    var tmp_0;
    var tmp_1 = this.d1h();
    if (!((tmp_1 == null ? null : new Char(tmp_1)) == null)) {
      tmp_0 = this.c1h_1.u() === 2;
    } else {
      tmp_0 = false;
    }
    if (tmp_0) {
      tmp = Companion_getInstance_1().s1h_1;
    } else {
      tmp = this.c1h_1;
    }
  }
  return tmp;
};
protoOf(Path).r1j = function () {
  // Inline function 'okio.internal.commonName' call
  return this.q1j().g1i();
};
protoOf(Path).s1j = function (child) {
  // Inline function 'okio.internal.commonResolve' call
  // Inline function 'okio.internal.commonResolve' call
  var child_0 = (new Buffer()).h1h(child);
  return commonResolve(this, toPath(child_0, false), false);
};
protoOf(Path).t1j = function (other) {
  // Inline function 'okio.internal.commonCompareTo' call
  return this.c1h_1.r1i(other.c1h_1);
};
protoOf(Path).d = function (other) {
  return this.t1j(other instanceof Path ? other : THROW_CCE());
};
protoOf(Path).equals = function (other) {
  // Inline function 'okio.internal.commonEquals' call
  var tmp;
  if (other instanceof Path) {
    tmp = other.c1h_1.equals(this.c1h_1);
  } else {
    tmp = false;
  }
  return tmp;
};
protoOf(Path).hashCode = function () {
  // Inline function 'okio.internal.commonHashCode' call
  return this.c1h_1.hashCode();
};
protoOf(Path).toString = function () {
  // Inline function 'okio.internal.commonToString' call
  return this.c1h_1.g1i();
};
function RealBufferedSource(source) {
  this.u1j_1 = source;
  this.v1j_1 = false;
  this.w1j_1 = new Buffer();
}
protoOf(RealBufferedSource).k1j = function (sink, byteCount) {
  var tmp$ret$4;
  $l$block_0: {
    // Inline function 'okio.internal.commonRead' call
    // Inline function 'kotlin.require' call
    if (!(compare(byteCount, new Long(0, 0)) >= 0)) {
      var message = 'byteCount < 0: ' + byteCount.toString();
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    // Inline function 'kotlin.check' call
    if (!!this.v1j_1) {
      var message_0 = 'closed';
      throw IllegalStateException_init_$Create$(toString(message_0));
    }
    if (equalsLong(this.w1j_1.x1g_1, new Long(0, 0))) {
      if (equalsLong(byteCount, new Long(0, 0))) {
        tmp$ret$4 = new Long(0, 0);
        break $l$block_0;
      }
      var read = this.u1j_1.k1j(this.w1j_1, new Long(8192, 0));
      if (equalsLong(read, new Long(-1, -1))) {
        tmp$ret$4 = new Long(-1, -1);
        break $l$block_0;
      }
    }
    // Inline function 'kotlin.comparisons.minOf' call
    var b = this.w1j_1.x1g_1;
    var toRead = compare(byteCount, b) <= 0 ? byteCount : b;
    tmp$ret$4 = this.w1j_1.k1j(sink, toRead);
  }
  return tmp$ret$4;
};
protoOf(RealBufferedSource).x1j = function (byteCount) {
  // Inline function 'okio.internal.commonRequire' call
  if (!this.y1j(byteCount))
    throw EOFException_init_$Create$();
  return Unit_instance;
};
protoOf(RealBufferedSource).y1j = function (byteCount) {
  var tmp$ret$4;
  $l$block: {
    // Inline function 'okio.internal.commonRequest' call
    // Inline function 'kotlin.require' call
    if (!(compare(byteCount, new Long(0, 0)) >= 0)) {
      var message = 'byteCount < 0: ' + byteCount.toString();
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    // Inline function 'kotlin.check' call
    if (!!this.v1j_1) {
      var message_0 = 'closed';
      throw IllegalStateException_init_$Create$(toString(message_0));
    }
    while (compare(this.w1j_1.x1g_1, byteCount) < 0) {
      if (equalsLong(this.u1j_1.k1j(this.w1j_1, new Long(8192, 0)), new Long(-1, -1))) {
        tmp$ret$4 = false;
        break $l$block;
      }
    }
    tmp$ret$4 = true;
  }
  return tmp$ret$4;
};
protoOf(RealBufferedSource).z1g = function (byteCount) {
  // Inline function 'okio.internal.commonReadUtf8' call
  this.x1j(byteCount);
  return this.w1j_1.z1g(byteCount);
};
protoOf(RealBufferedSource).d1j = function () {
  // Inline function 'okio.internal.commonReadUtf8Line' call
  // Inline function 'kotlin.code' call
  var this_0 = _Char___init__impl__6a9atx(10);
  var tmp$ret$0 = Char__toInt_impl_vasixd(this_0);
  var newline = this.e1j(toByte(tmp$ret$0));
  var tmp;
  if (equalsLong(newline, new Long(-1, -1))) {
    var tmp_0;
    if (!equalsLong(this.w1j_1.x1g_1, new Long(0, 0))) {
      tmp_0 = this.z1g(this.w1j_1.x1g_1);
    } else {
      tmp_0 = null;
    }
    tmp = tmp_0;
  } else {
    tmp = readUtf8Line(this.w1j_1, newline);
  }
  return tmp;
};
protoOf(RealBufferedSource).e1j = function (b) {
  return this.l1j(b, new Long(0, 0), new Long(-1, 2147483647));
};
protoOf(RealBufferedSource).l1j = function (b, fromIndex, toIndex) {
  var tmp$ret$4;
  $l$block_0: {
    // Inline function 'okio.internal.commonIndexOf' call
    var fromIndex_0 = fromIndex;
    // Inline function 'kotlin.check' call
    if (!!this.v1j_1) {
      var message = 'closed';
      throw IllegalStateException_init_$Create$(toString(message));
    }
    // Inline function 'kotlin.require' call
    if (!(compare(new Long(0, 0), fromIndex_0) <= 0 ? compare(fromIndex_0, toIndex) <= 0 : false)) {
      var message_0 = 'fromIndex=' + fromIndex_0.toString() + ' toIndex=' + toIndex.toString();
      throw IllegalArgumentException_init_$Create$(toString(message_0));
    }
    while (compare(fromIndex_0, toIndex) < 0) {
      var result = this.w1j_1.l1j(b, fromIndex_0, toIndex);
      if (!equalsLong(result, new Long(-1, -1))) {
        tmp$ret$4 = result;
        break $l$block_0;
      }
      var lastBufferSize = this.w1j_1.x1g_1;
      if (compare(lastBufferSize, toIndex) >= 0 || equalsLong(this.u1j_1.k1j(this.w1j_1, new Long(8192, 0)), new Long(-1, -1))) {
        tmp$ret$4 = new Long(-1, -1);
        break $l$block_0;
      }
      // Inline function 'kotlin.comparisons.maxOf' call
      var a = fromIndex_0;
      fromIndex_0 = compare(a, lastBufferSize) >= 0 ? a : lastBufferSize;
    }
    tmp$ret$4 = new Long(-1, -1);
  }
  return tmp$ret$4;
};
protoOf(RealBufferedSource).d1i = function () {
  var tmp$ret$0;
  $l$block: {
    // Inline function 'okio.internal.commonClose' call
    if (this.v1j_1) {
      tmp$ret$0 = Unit_instance;
      break $l$block;
    }
    this.v1j_1 = true;
    this.u1j_1.d1i();
    this.w1j_1.d2();
    tmp$ret$0 = Unit_instance;
  }
  return tmp$ret$0;
};
protoOf(RealBufferedSource).toString = function () {
  // Inline function 'okio.internal.commonToString' call
  return 'buffer(' + toString(this.u1j_1) + ')';
};
function SegmentPool() {
  this.n1g_1 = 0;
  this.o1g_1 = 0;
}
protoOf(SegmentPool).p1g = function () {
  return Segment_init_$Create$();
};
protoOf(SegmentPool).s1g = function (segment) {
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
  IOException_init_$Create$ as IOException_init_$Create$1nlsccrpovv0q,
  Companion_getInstance_2 as Companion_getInstance2khnd3aviw7kz,
  FileNotFoundException as FileNotFoundException1m3q2rg4pj77g,
  FileSystem as FileSystem239k0lkpj719u,
  buffer as bufferbiiev5vr4b6f,
};
//endregion

//# sourceMappingURL=okio-parent-okio.mjs.map
