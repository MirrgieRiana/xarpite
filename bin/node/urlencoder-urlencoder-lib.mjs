import {
  _Char___init__impl__6a9atx1csff5kwtduxl as _Char___init__impl__6a9atx,
  protoOf180f3jzyo7rfj as protoOf,
  Char__toInt_impl_vasixd3jl92hthlhyn7 as Char__toInt_impl_vasixd,
  numberToChar93r9buh19yek as numberToChar,
  initMetadataForObject1cxne3s9w65el as initMetadataForObject,
  Char__compareTo_impl_ypi4mb3frsmupst9pih as Char__compareTo_impl_ypi4mb,
  Unit_instance28fytmsmm6r23 as Unit_instance,
  get_indices38nlqzzvtaclf as get_indices,
  IndexOutOfBoundsException_init_$Create$1rd2xj3xtaoo6 as IndexOutOfBoundsException_init_$Create$,
  charSequenceLength3278n89t01tmv as charSequenceLength,
  charSequenceGet1vxk1y5n17t1z as charSequenceGet,
  getOrNull1cdnsfrisdp41 as getOrNull,
  isLowSurrogateujxcv7hjn4ma as isLowSurrogate,
  Char19o2r8palgjof as Char,
  isHighSurrogate11jfjw70ar0zf as isHighSurrogate,
  toCharArray32huqyw9tt7kx as toCharArray,
  booleanArray2jdug9b51huk7 as booleanArray,
  Char__plus_impl_qi7pgjyhbgymrgrgr1 as Char__plus_impl_qi7pgj,
  StringBuilder_init_$Create$39ouzl6b47q8d as StringBuilder_init_$Create$,
  charCodeAt1yspne1d8erbm as charCodeAt,
  decodeToString1dbzcjd620q25 as decodeToString,
  toString3dhdjl9yf50de as toString,
  toString1pkumu07cwy4m as toString_0,
  IllegalArgumentException_init_$Create$1j1aj36nbo0wg as IllegalArgumentException_init_$Create$,
  substringiqarkczpya5m as substring,
  toInt5qdj874w69jh as toInt,
  toByte4i43936u611k as toByte,
  IllegalArgumentException_init_$Create$29u2k1uv4mtvs as IllegalArgumentException_init_$Create$_0,
  NumberFormatException3bgsm2s9o4t55 as NumberFormatException,
  charArrayOf27f4r3dozbrk1 as charArrayOf,
  concatToString2syawgu50khxi as concatToString,
  encodeToByteArray1onwao0uakjfh as encodeToByteArray,
  contains2el4s70rdq4ld as contains,
} from './kotlin-kotlin-stdlib.mjs';
//region block: imports
//endregion
//region block: pre-declaration
initMetadataForObject(Character, 'Character');
initMetadataForObject(UrlEncoderUtil, 'UrlEncoderUtil');
//endregion
function Character() {
  Character_instance = this;
  this.a1s_1 = 1114111;
  this.b1s_1 = 65536;
  this.c1s_1 = -56613888;
  this.d1s_1 = _Char___init__impl__6a9atx(55232);
}
protoOf(Character).e1s = function (codePoint) {
  return 65536 <= codePoint ? codePoint <= 1114111 : false;
};
protoOf(Character).f1s = function (highSurrogate, lowSurrogate) {
  // Inline function 'kotlin.code' call
  var tmp = Char__toInt_impl_vasixd(highSurrogate) << 10;
  // Inline function 'kotlin.code' call
  return (tmp + Char__toInt_impl_vasixd(lowSurrogate) | 0) + -56613888 | 0;
};
protoOf(Character).g1s = function (codePoint) {
  return (codePoint >>> 16 | 0) === 0;
};
protoOf(Character).h1s = function (codePoint) {
  var tmp = codePoint >>> 10 | 0;
  // Inline function 'kotlin.code' call
  var this_0 = _Char___init__impl__6a9atx(55232);
  var tmp$ret$0 = Char__toInt_impl_vasixd(this_0);
  return numberToChar(tmp + tmp$ret$0 | 0);
};
protoOf(Character).i1s = function (codePoint) {
  var tmp = codePoint & 1023;
  // Inline function 'kotlin.code' call
  var this_0 = _Char___init__impl__6a9atx(56320);
  var tmp$ret$0 = Char__toInt_impl_vasixd(this_0);
  return numberToChar(tmp + tmp$ret$0 | 0);
};
var Character_instance;
function Character_getInstance() {
  if (Character_instance == null)
    new Character();
  return Character_instance;
}
function isUnreserved($this, _this__u8e3s4) {
  var tmp;
  if (Char__compareTo_impl_ypi4mb(_this__u8e3s4, _Char___init__impl__6a9atx(122)) <= 0) {
    // Inline function 'kotlin.code' call
    var tmp$ret$0 = Char__toInt_impl_vasixd(_this__u8e3s4);
    tmp = $this.k1s_1[tmp$ret$0];
  } else {
    tmp = false;
  }
  return tmp;
}
function appendEncodedDigit($this, _this__u8e3s4, digit) {
  _this__u8e3s4.u($this.j1s_1[digit & 15]);
}
function appendEncodedByte($this, _this__u8e3s4, ch) {
  _this__u8e3s4.s('%');
  appendEncodedDigit($this, _this__u8e3s4, ch >> 4);
  appendEncodedDigit($this, _this__u8e3s4, ch);
}
function codePointAt($this, _this__u8e3s4, index) {
  if (!(0 <= index ? index <= (charSequenceLength(_this__u8e3s4) - 1 | 0) : false))
    throw IndexOutOfBoundsException_init_$Create$('index ' + index + ' was not in range ' + get_indices(_this__u8e3s4).toString());
  var firstChar = charSequenceGet(_this__u8e3s4, index);
  if (isHighSurrogate(firstChar)) {
    var nextChar = getOrNull(_this__u8e3s4, index + 1 | 0);
    var tmp;
    var tmp_0 = nextChar;
    if ((tmp_0 == null ? null : new Char(tmp_0)) == null) {
      tmp = null;
    } else {
      tmp = isLowSurrogate(nextChar);
    }
    if (tmp === true) {
      return Character_getInstance().f1s(firstChar, nextChar);
    }
  }
  // Inline function 'kotlin.code' call
  return Char__toInt_impl_vasixd(firstChar);
}
function UrlEncoderUtil() {
  UrlEncoderUtil_instance = this;
  this.j1s_1 = toCharArray('0123456789ABCDEF');
  var tmp = this;
  // Inline function 'kotlin.code' call
  var this_0 = _Char___init__impl__6a9atx(122);
  var tmp$ret$0 = Char__toInt_impl_vasixd(this_0);
  // Inline function 'kotlin.apply' call
  var this_1 = booleanArray(tmp$ret$0 + 1 | 0);
  // Inline function 'kotlin.code' call
  var this_2 = _Char___init__impl__6a9atx(45);
  this_1[Char__toInt_impl_vasixd(this_2)] = true;
  // Inline function 'kotlin.code' call
  var this_3 = _Char___init__impl__6a9atx(46);
  this_1[Char__toInt_impl_vasixd(this_3)] = true;
  // Inline function 'kotlin.code' call
  var this_4 = _Char___init__impl__6a9atx(95);
  this_1[Char__toInt_impl_vasixd(this_4)] = true;
  var inductionVariable = _Char___init__impl__6a9atx(48);
  if (inductionVariable <= _Char___init__impl__6a9atx(57))
    do {
      var c = inductionVariable;
      inductionVariable = Char__plus_impl_qi7pgj(inductionVariable, 1);
      // Inline function 'kotlin.code' call
      this_1[Char__toInt_impl_vasixd(c)] = true;
    }
     while (inductionVariable <= _Char___init__impl__6a9atx(57));
  var inductionVariable_0 = _Char___init__impl__6a9atx(65);
  if (inductionVariable_0 <= _Char___init__impl__6a9atx(90))
    do {
      var c_0 = inductionVariable_0;
      inductionVariable_0 = Char__plus_impl_qi7pgj(inductionVariable_0, 1);
      // Inline function 'kotlin.code' call
      this_1[Char__toInt_impl_vasixd(c_0)] = true;
    }
     while (inductionVariable_0 <= _Char___init__impl__6a9atx(90));
  var inductionVariable_1 = _Char___init__impl__6a9atx(97);
  if (inductionVariable_1 <= _Char___init__impl__6a9atx(122))
    do {
      var c_1 = inductionVariable_1;
      inductionVariable_1 = Char__plus_impl_qi7pgj(inductionVariable_1, 1);
      // Inline function 'kotlin.code' call
      this_1[Char__toInt_impl_vasixd(c_1)] = true;
    }
     while (inductionVariable_1 <= _Char___init__impl__6a9atx(122));
  tmp.k1s_1 = this_1;
}
protoOf(UrlEncoderUtil).l1s = function (source, plusToSpace) {
  // Inline function 'kotlin.text.isEmpty' call
  if (charSequenceLength(source) === 0) {
    return source;
  }
  var length = source.length;
  var out = StringBuilder_init_$Create$(length);
  var bytesBuffer = null;
  var bytesPos = 0;
  var i = 0;
  var started = false;
  while (i < length) {
    var ch = charCodeAt(source, i);
    if (ch === _Char___init__impl__6a9atx(37)) {
      if (!started) {
        out.wd(source, 0, i);
        started = true;
      }
      if (bytesBuffer == null) {
        bytesBuffer = new Int8Array((length - i | 0) / 3 | 0);
      }
      i = i + 1 | 0;
      // Inline function 'kotlin.require' call
      if (!(length >= (i + 2 | 0))) {
        var message = 'Incomplete trailing escape (' + toString(ch) + ') pattern';
        throw IllegalArgumentException_init_$Create$(toString_0(message));
      }
      try {
        var v = toInt(substring(source, i, i + 2 | 0), 16);
        // Inline function 'kotlin.require' call
        if (!(0 <= v ? v <= 255 : false)) {
          var message_0 = 'Illegal escape value';
          throw IllegalArgumentException_init_$Create$(toString_0(message_0));
        }
        var tmp = bytesBuffer;
        var tmp1 = bytesPos;
        bytesPos = tmp1 + 1 | 0;
        tmp[tmp1] = toByte(v);
        i = i + 2 | 0;
      } catch ($p) {
        if ($p instanceof NumberFormatException) {
          var e = $p;
          throw IllegalArgumentException_init_$Create$_0('Illegal characters in escape sequence: ' + e.toString() + '.message', e);
        } else {
          throw $p;
        }
      }
    } else {
      if (!(bytesBuffer == null)) {
        out.s(decodeToString(bytesBuffer, 0, bytesPos));
        started = true;
        bytesBuffer = null;
        bytesPos = 0;
      }
      if (plusToSpace && ch === _Char___init__impl__6a9atx(43)) {
        if (!started) {
          out.wd(source, 0, i);
          started = true;
        }
        out.s(' ');
      } else if (started) {
        out.u(ch);
      }
      i = i + 1 | 0;
    }
  }
  if (!(bytesBuffer == null)) {
    out.s(decodeToString(bytesBuffer, 0, bytesPos));
  }
  return !started ? source : out.toString();
};
protoOf(UrlEncoderUtil).m1s = function (source, allow, spaceToPlus) {
  // Inline function 'kotlin.text.isEmpty' call
  if (charSequenceLength(source) === 0) {
    return source;
  }
  var out = null;
  var i = 0;
  while (i < source.length) {
    var ch = charCodeAt(source, i);
    if (isUnreserved(this, ch) || contains(allow, ch)) {
      var tmp0_safe_receiver = out;
      if (tmp0_safe_receiver == null)
        null;
      else
        tmp0_safe_receiver.u(ch);
      i = i + 1 | 0;
    } else {
      if (out == null) {
        out = StringBuilder_init_$Create$(source.length);
        out.wd(source, 0, i);
      }
      var cp = codePointAt(this, source, i);
      if (cp < 128) {
        if (spaceToPlus && ch === _Char___init__impl__6a9atx(32)) {
          out.u(_Char___init__impl__6a9atx(43));
        } else {
          appendEncodedByte(this, out, cp);
        }
        i = i + 1 | 0;
      } else if (Character_getInstance().g1s(cp)) {
        var indexedObject = encodeToByteArray(toString(ch));
        var inductionVariable = 0;
        var last = indexedObject.length;
        while (inductionVariable < last) {
          var b = indexedObject[inductionVariable];
          inductionVariable = inductionVariable + 1 | 0;
          appendEncodedByte(this, out, b);
        }
        i = i + 1 | 0;
      } else if (Character_getInstance().e1s(cp)) {
        var high = Character_getInstance().h1s(cp);
        var low = Character_getInstance().i1s(cp);
        // Inline function 'kotlin.charArrayOf' call
        var tmp$ret$1 = charArrayOf([high, low]);
        var indexedObject_0 = encodeToByteArray(concatToString(tmp$ret$1));
        var inductionVariable_0 = 0;
        var last_0 = indexedObject_0.length;
        while (inductionVariable_0 < last_0) {
          var b_0 = indexedObject_0[inductionVariable_0];
          inductionVariable_0 = inductionVariable_0 + 1 | 0;
          appendEncodedByte(this, out, b_0);
        }
        i = i + 2 | 0;
      }
    }
  }
  var tmp6_safe_receiver = out;
  var tmp7_elvis_lhs = tmp6_safe_receiver == null ? null : tmp6_safe_receiver.toString();
  return tmp7_elvis_lhs == null ? source : tmp7_elvis_lhs;
};
var UrlEncoderUtil_instance;
function UrlEncoderUtil_getInstance() {
  if (UrlEncoderUtil_instance == null)
    new UrlEncoderUtil();
  return UrlEncoderUtil_instance;
}
//region block: exports
export {
  UrlEncoderUtil_getInstance as UrlEncoderUtil_getInstance5hrxe7nnt1ly,
};
//endregion

//# sourceMappingURL=urlencoder-urlencoder-lib.mjs.map
