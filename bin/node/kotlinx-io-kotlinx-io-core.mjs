import {
  IndexOutOfBoundsException_init_$Create$1rd2xj3xtaoo6 as IndexOutOfBoundsException_init_$Create$,
  Long2qws0ah9gnpki as Long,
  compare2uud5j30pw5xc as compare,
  IllegalArgumentException_init_$Create$1j1aj36nbo0wg as IllegalArgumentException_init_$Create$,
  subtract16cg4lfi29fq9 as subtract,
  _Char___init__impl__6a9atx1csff5kwtduxl as _Char___init__impl__6a9atx,
  charArrayOf27f4r3dozbrk1 as charArrayOf,
  protoOf180f3jzyo7rfj as protoOf,
  equalsLong28bsrfhwvd686 as equalsLong,
  toString1pkumu07cwy4m as toString,
  Unit_instance28fytmsmm6r23 as Unit_instance,
  toShort36kaw0zjdq3ex as toShort,
  add85si75olwt6n as add,
  ensureNotNull1e947j3ixpazm as ensureNotNull,
  fromInt1lka3ktyu79a4 as fromInt,
  convertToIntofdoxh9bstof as convertToInt,
  StringBuilder_init_$Create$39ouzl6b47q8d as StringBuilder_init_$Create$,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
  VOID3gxj6tk5isa35 as VOID,
  IllegalStateException_init_$Create$2429fvs1h56dm as IllegalStateException_init_$Create$,
  AutoCloseable1l5p57f9lp7kv as AutoCloseable,
  objectCreate1ve4bgxiu4x98 as objectCreate,
  initMetadataForCompanion1wyw17z38v6ac as initMetadataForCompanion,
  arrayCopytctsywo3h7gj as arrayCopy,
  toByte4i43936u611k as toByte,
  IllegalArgumentException_init_$Create$nai51bbwz5t9 as IllegalArgumentException_init_$Create$_0,
  initMetadataForObject1cxne3s9w65el as initMetadataForObject,
  initMetadataForInterface1egvbzx539z91 as initMetadataForInterface,
  multiply18i3gv3wlmcjg as multiply,
  charCodeAt1yspne1d8erbm as charCodeAt,
  Char__toInt_impl_vasixd3jl92hthlhyn7 as Char__toInt_impl_vasixd,
  charArray2ujmm1qusno00 as charArray,
  numberToChar93r9buh19yek as numberToChar,
  concatToString3cxf0c1gqonpo as concatToString,
  Exception_init_$Init$22vtgic9oqkxe as Exception_init_$Init$,
  captureStack1fzi4aczwc4hg as captureStack,
  Exception_init_$Init$2jymvyiuv5u42 as Exception_init_$Init$_0,
  Exception_init_$Init$gwg5c35cbjjd as Exception_init_$Init$_1,
  Exceptiondt2hlxn7j7vw as Exception,
} from './kotlin-kotlin-stdlib.mjs';
import { UnsafeByteStringOperations_instance35zx8xrp4hu2p as UnsafeByteStringOperations_instance } from './kotlinx-io-kotlinx-io-bytestring.mjs';
//region block: imports
var imul = Math.imul;
//endregion
//region block: pre-declaration
initMetadataForInterface(Source, 'Source', VOID, VOID, [AutoCloseable]);
function write$default(source, startIndex, endIndex, $super) {
  startIndex = startIndex === VOID ? 0 : startIndex;
  endIndex = endIndex === VOID ? source.length : endIndex;
  var tmp;
  if ($super === VOID) {
    this.b2l(source, startIndex, endIndex);
    tmp = Unit_instance;
  } else {
    tmp = $super.b2l.call(this, source, startIndex, endIndex);
  }
  return tmp;
}
initMetadataForInterface(Sink, 'Sink', VOID, VOID, [AutoCloseable]);
initMetadataForClass(Buffer, 'Buffer', Buffer, VOID, [Source, Sink]);
initMetadataForClass(PeekSource, 'PeekSource', VOID, VOID, [AutoCloseable]);
initMetadataForClass(RealSource, 'RealSource', VOID, VOID, [Source]);
initMetadataForCompanion(Companion);
initMetadataForClass(Segment, 'Segment');
initMetadataForClass(SegmentCopyTracker, 'SegmentCopyTracker');
initMetadataForObject(AlwaysSharedCopyTracker, 'AlwaysSharedCopyTracker', VOID, SegmentCopyTracker);
initMetadataForObject(UnsafeBufferOperations, 'UnsafeBufferOperations');
initMetadataForClass(SegmentReadContextImpl$1);
initMetadataForClass(SegmentWriteContextImpl$1);
initMetadataForClass(BufferIterationContextImpl$1);
initMetadataForClass(IOException, 'IOException', IOException_init_$Create$, Exception);
initMetadataForClass(EOFException, 'EOFException', EOFException_init_$Create$, IOException);
initMetadataForObject(SegmentPool, 'SegmentPool');
//endregion
function get_HEX_DIGIT_CHARS() {
  _init_properties__Util_kt__g8tcl9();
  return HEX_DIGIT_CHARS;
}
var HEX_DIGIT_CHARS;
function checkBounds(size, startIndex, endIndex) {
  _init_properties__Util_kt__g8tcl9();
  if (compare(startIndex, new Long(0, 0)) < 0 || compare(endIndex, size) > 0) {
    throw IndexOutOfBoundsException_init_$Create$('startIndex (' + startIndex.toString() + ') and endIndex (' + endIndex.toString() + ') are not within the range [0..size(' + size.toString() + '))');
  }
  if (compare(startIndex, endIndex) > 0) {
    throw IllegalArgumentException_init_$Create$('startIndex (' + startIndex.toString() + ') > endIndex (' + endIndex.toString() + ')');
  }
}
function checkOffsetAndCount(size, offset, byteCount) {
  _init_properties__Util_kt__g8tcl9();
  if (compare(offset, new Long(0, 0)) < 0 || compare(offset, size) > 0 || compare(subtract(size, offset), byteCount) < 0 || compare(byteCount, new Long(0, 0)) < 0) {
    throw IllegalArgumentException_init_$Create$('offset (' + offset.toString() + ') and byteCount (' + byteCount.toString() + ') are not within the range [0..size(' + size.toString() + '))');
  }
}
var properties_initialized__Util_kt_67kc5b;
function _init_properties__Util_kt__g8tcl9() {
  if (!properties_initialized__Util_kt_67kc5b) {
    properties_initialized__Util_kt_67kc5b = true;
    // Inline function 'kotlin.charArrayOf' call
    HEX_DIGIT_CHARS = charArrayOf([_Char___init__impl__6a9atx(48), _Char___init__impl__6a9atx(49), _Char___init__impl__6a9atx(50), _Char___init__impl__6a9atx(51), _Char___init__impl__6a9atx(52), _Char___init__impl__6a9atx(53), _Char___init__impl__6a9atx(54), _Char___init__impl__6a9atx(55), _Char___init__impl__6a9atx(56), _Char___init__impl__6a9atx(57), _Char___init__impl__6a9atx(97), _Char___init__impl__6a9atx(98), _Char___init__impl__6a9atx(99), _Char___init__impl__6a9atx(100), _Char___init__impl__6a9atx(101), _Char___init__impl__6a9atx(102)]);
  }
}
function throwEof($this, byteCount) {
  throw EOFException_init_$Create$_0("Buffer doesn't contain required number of bytes (size: " + $this.l1().toString() + ', required: ' + byteCount.toString() + ')');
}
function Buffer() {
  this.v2j_1 = null;
  this.w2j_1 = null;
  this.x2j_1 = new Long(0, 0);
}
protoOf(Buffer).l1 = function () {
  return this.x2j_1;
};
protoOf(Buffer).y2j = function () {
  return this;
};
protoOf(Buffer).j1m = function () {
  return equalsLong(this.l1(), new Long(0, 0));
};
protoOf(Buffer).l1p = function (byteCount) {
  // Inline function 'kotlin.require' call
  if (!(compare(byteCount, new Long(0, 0)) >= 0)) {
    var message = 'byteCount: ' + byteCount.toString();
    throw IllegalArgumentException_init_$Create$(toString(message));
  }
  if (compare(this.l1(), byteCount) < 0) {
    throw EOFException_init_$Create$_0("Buffer doesn't contain required number of bytes (size: " + this.l1().toString() + ', required: ' + byteCount.toString() + ')');
  }
};
protoOf(Buffer).m1p = function (byteCount) {
  // Inline function 'kotlin.require' call
  if (!(compare(byteCount, new Long(0, 0)) >= 0)) {
    var message = 'byteCount: ' + byteCount.toString() + ' < 0';
    throw IllegalArgumentException_init_$Create$(toString(message));
  }
  return compare(this.l1(), byteCount) >= 0;
};
protoOf(Buffer).g1m = function () {
  var tmp0_elvis_lhs = this.v2j_1;
  var tmp;
  if (tmp0_elvis_lhs == null) {
    throwEof(this, new Long(1, 0));
  } else {
    tmp = tmp0_elvis_lhs;
  }
  var segment = tmp;
  var segmentSize = segment.l1();
  if (segmentSize === 0) {
    this.g2k();
    return this.g1m();
  }
  var v = segment.h2k();
  this.x2j_1 = subtract(this.x2j_1, new Long(1, 0));
  if (segmentSize === 1) {
    this.g2k();
  }
  return v;
};
protoOf(Buffer).i2k = function () {
  var tmp0_elvis_lhs = this.v2j_1;
  var tmp;
  if (tmp0_elvis_lhs == null) {
    throwEof(this, new Long(2, 0));
  } else {
    tmp = tmp0_elvis_lhs;
  }
  var segment = tmp;
  var segmentSize = segment.l1();
  if (segmentSize < 2) {
    this.l1p(new Long(2, 0));
    if (segmentSize === 0) {
      this.g2k();
      return this.i2k();
    }
    // Inline function 'kotlinx.io.and' call
    var tmp_0 = (this.g1m() & 255) << 8;
    // Inline function 'kotlinx.io.and' call
    var tmp$ret$1 = this.g1m() & 255;
    return toShort(tmp_0 | tmp$ret$1);
  }
  var v = segment.j2k();
  this.x2j_1 = subtract(this.x2j_1, new Long(2, 0));
  if (segmentSize === 2) {
    this.g2k();
  }
  return v;
};
protoOf(Buffer).k2k = function () {
  return Unit_instance;
};
protoOf(Buffer).l2k = function (out, startIndex, endIndex) {
  checkBounds(this.l1(), startIndex, endIndex);
  if (equalsLong(startIndex, endIndex))
    return Unit_instance;
  var currentOffset = startIndex;
  var remainingByteCount = subtract(endIndex, startIndex);
  out.x2j_1 = add(out.x2j_1, remainingByteCount);
  var s = this.v2j_1;
  while (compare(currentOffset, fromInt(ensureNotNull(s).b2k_1 - s.a2k_1 | 0)) >= 0) {
    currentOffset = subtract(currentOffset, fromInt(s.b2k_1 - s.a2k_1 | 0));
    s = s.e2k_1;
  }
  while (compare(remainingByteCount, new Long(0, 0)) > 0) {
    var copy = ensureNotNull(s).m2k();
    copy.a2k_1 = copy.a2k_1 + convertToInt(currentOffset) | 0;
    var tmp = copy;
    var tmp0 = copy.a2k_1 + convertToInt(remainingByteCount) | 0;
    // Inline function 'kotlin.comparisons.minOf' call
    var b = copy.b2k_1;
    tmp.b2k_1 = Math.min(tmp0, b);
    // Inline function 'kotlinx.io.Buffer.pushSegment' call
    if (out.v2j_1 == null) {
      out.v2j_1 = copy;
      out.w2j_1 = copy;
    } else if (false) {
      out.w2j_1 = ensureNotNull(out.w2j_1).n2k(copy).o2k();
      if (ensureNotNull(out.w2j_1).f2k_1 == null) {
        out.v2j_1 = out.w2j_1;
      }
    } else {
      out.w2j_1 = ensureNotNull(out.w2j_1).n2k(copy);
    }
    remainingByteCount = subtract(remainingByteCount, fromInt(copy.b2k_1 - copy.a2k_1 | 0));
    currentOffset = new Long(0, 0);
    s = s.e2k_1;
  }
};
protoOf(Buffer).p2k = function () {
  var result = this.l1();
  if (equalsLong(result, new Long(0, 0)))
    return new Long(0, 0);
  var tail = ensureNotNull(this.w2j_1);
  if (tail.b2k_1 < 8192 && tail.d2k_1) {
    result = subtract(result, fromInt(tail.b2k_1 - tail.a2k_1 | 0));
  }
  return result;
};
protoOf(Buffer).p1l = function (position) {
  if (compare(position, new Long(0, 0)) < 0 || compare(position, this.l1()) >= 0) {
    throw IndexOutOfBoundsException_init_$Create$('position (' + position.toString() + ') is not within the range [0..size(' + this.l1().toString() + '))');
  }
  if (equalsLong(position, new Long(0, 0))) {
    return ensureNotNull(this.v2j_1).q2k(0);
  }
  // Inline function 'kotlinx.io.seek' call
  if (this.v2j_1 == null) {
    var offset = new Long(-1, -1);
    return ensureNotNull(null).q2k(convertToInt(subtract(position, offset)));
  }
  if (compare(subtract(this.l1(), position), position) < 0) {
    var s = this.w2j_1;
    var offset_0 = this.l1();
    $l$loop: while (!(s == null) && compare(offset_0, position) > 0) {
      offset_0 = subtract(offset_0, fromInt(s.b2k_1 - s.a2k_1 | 0));
      if (compare(offset_0, position) <= 0)
        break $l$loop;
      s = s.f2k_1;
    }
    var tmp0 = s;
    var offset_1 = offset_0;
    return ensureNotNull(tmp0).q2k(convertToInt(subtract(position, offset_1)));
  } else {
    var s_0 = this.v2j_1;
    var offset_2 = new Long(0, 0);
    $l$loop_0: while (!(s_0 == null)) {
      var tmp0_0 = offset_2;
      // Inline function 'kotlin.Long.plus' call
      var other = s_0.b2k_1 - s_0.a2k_1 | 0;
      var nextOffset = add(tmp0_0, fromInt(other));
      if (compare(nextOffset, position) > 0)
        break $l$loop_0;
      s_0 = s_0.e2k_1;
      offset_2 = nextOffset;
    }
    var tmp0_1 = s_0;
    var offset_3 = offset_2;
    return ensureNotNull(tmp0_1).q2k(convertToInt(subtract(position, offset_3)));
  }
};
protoOf(Buffer).y2 = function () {
  return this.r1l(this.l1());
};
protoOf(Buffer).r1l = function (byteCount) {
  // Inline function 'kotlinx.io.checkByteCount' call
  // Inline function 'kotlin.require' call
  if (!(compare(byteCount, new Long(0, 0)) >= 0)) {
    var message = 'byteCount (' + byteCount.toString() + ') < 0';
    throw IllegalArgumentException_init_$Create$(toString(message));
  }
  var remainingByteCount = byteCount;
  while (compare(remainingByteCount, new Long(0, 0)) > 0) {
    var tmp0_elvis_lhs = this.v2j_1;
    var tmp;
    if (tmp0_elvis_lhs == null) {
      throw EOFException_init_$Create$_0('Buffer exhausted before skipping ' + byteCount.toString() + ' bytes.');
    } else {
      tmp = tmp0_elvis_lhs;
    }
    var head = tmp;
    var tmp0 = remainingByteCount;
    // Inline function 'kotlinx.io.minOf' call
    var b = head.b2k_1 - head.a2k_1 | 0;
    // Inline function 'kotlin.comparisons.minOf' call
    var b_0 = fromInt(b);
    var tmp$ret$4 = compare(tmp0, b_0) <= 0 ? tmp0 : b_0;
    var toSkip = convertToInt(tmp$ret$4);
    this.x2j_1 = subtract(this.x2j_1, fromInt(toSkip));
    remainingByteCount = subtract(remainingByteCount, fromInt(toSkip));
    head.a2k_1 = head.a2k_1 + toSkip | 0;
    if (head.a2k_1 === head.b2k_1) {
      this.g2k();
    }
  }
};
protoOf(Buffer).r2k = function (sink, startIndex, endIndex) {
  // Inline function 'kotlinx.io.checkBounds' call
  var size = sink.length;
  checkBounds(fromInt(size), fromInt(startIndex), fromInt(endIndex));
  var tmp0_elvis_lhs = this.v2j_1;
  var tmp;
  if (tmp0_elvis_lhs == null) {
    return -1;
  } else {
    tmp = tmp0_elvis_lhs;
  }
  var s = tmp;
  var tmp0 = endIndex - startIndex | 0;
  // Inline function 'kotlin.comparisons.minOf' call
  var b = s.l1();
  var toCopy = Math.min(tmp0, b);
  s.s2k(sink, startIndex, startIndex + toCopy | 0);
  this.x2j_1 = subtract(this.x2j_1, fromInt(toCopy));
  if (isEmpty(s)) {
    this.g2k();
  }
  return toCopy;
};
protoOf(Buffer).t2k = function (sink, byteCount) {
  // Inline function 'kotlinx.io.checkByteCount' call
  // Inline function 'kotlin.require' call
  if (!(compare(byteCount, new Long(0, 0)) >= 0)) {
    var message = 'byteCount (' + byteCount.toString() + ') < 0';
    throw IllegalArgumentException_init_$Create$(toString(message));
  }
  if (equalsLong(this.l1(), new Long(0, 0)))
    return new Long(-1, -1);
  var bytesWritten = compare(byteCount, this.l1()) > 0 ? this.l1() : byteCount;
  sink.u2k(this, bytesWritten);
  return bytesWritten;
};
protoOf(Buffer).v2k = function (sink, byteCount) {
  // Inline function 'kotlinx.io.checkByteCount' call
  // Inline function 'kotlin.require' call
  if (!(compare(byteCount, new Long(0, 0)) >= 0)) {
    var message = 'byteCount (' + byteCount.toString() + ') < 0';
    throw IllegalArgumentException_init_$Create$(toString(message));
  }
  if (compare(this.l1(), byteCount) < 0) {
    sink.u2k(this, this.l1());
    throw EOFException_init_$Create$_0('Buffer exhausted before writing ' + byteCount.toString() + ' bytes. Only ' + this.l1().toString() + ' bytes were written.');
  }
  sink.u2k(this, byteCount);
};
protoOf(Buffer).w2k = function (sink) {
  var byteCount = this.l1();
  if (compare(byteCount, new Long(0, 0)) > 0) {
    sink.u2k(this, byteCount);
  }
  return byteCount;
};
protoOf(Buffer).x2k = function () {
  return buffered(new PeekSource(this));
};
protoOf(Buffer).y2k = function (minimumCapacity) {
  // Inline function 'kotlin.require' call
  if (!(minimumCapacity >= 1 && minimumCapacity <= 8192)) {
    var message = 'unexpected capacity (' + minimumCapacity + '), should be in range [1, 8192]';
    throw IllegalArgumentException_init_$Create$(toString(message));
  }
  if (this.w2j_1 == null) {
    var result = SegmentPool_instance.g1l();
    this.v2j_1 = result;
    this.w2j_1 = result;
    return result;
  }
  var t = ensureNotNull(this.w2j_1);
  if ((t.b2k_1 + minimumCapacity | 0) > 8192 || !t.d2k_1) {
    var newTail = t.n2k(SegmentPool_instance.g1l());
    this.w2j_1 = newTail;
    return newTail;
  }
  return t;
};
protoOf(Buffer).b2l = function (source, startIndex, endIndex) {
  // Inline function 'kotlinx.io.checkBounds' call
  var size = source.length;
  checkBounds(fromInt(size), fromInt(startIndex), fromInt(endIndex));
  var currentOffset = startIndex;
  while (currentOffset < endIndex) {
    var tail = this.y2k(1);
    var tmp0 = endIndex - currentOffset | 0;
    // Inline function 'kotlin.comparisons.minOf' call
    var b = tail.c2l();
    var toCopy = Math.min(tmp0, b);
    tail.d2l(source, currentOffset, currentOffset + toCopy | 0);
    currentOffset = currentOffset + toCopy | 0;
  }
  var tmp = this;
  var tmp0_0 = this.x2j_1;
  // Inline function 'kotlin.Long.plus' call
  var other = endIndex - startIndex | 0;
  tmp.x2j_1 = add(tmp0_0, fromInt(other));
};
protoOf(Buffer).u2k = function (source, byteCount) {
  // Inline function 'kotlin.require' call
  if (!!(source === this)) {
    var message = 'source == this';
    throw IllegalArgumentException_init_$Create$(toString(message));
  }
  checkOffsetAndCount(source.x2j_1, new Long(0, 0), byteCount);
  var remainingByteCount = byteCount;
  while (compare(remainingByteCount, new Long(0, 0)) > 0) {
    if (compare(remainingByteCount, fromInt(ensureNotNull(source.v2j_1).l1())) < 0) {
      var tail = this.w2j_1;
      var tmp;
      if (!(tail == null) && tail.d2k_1) {
        var tmp0 = remainingByteCount;
        // Inline function 'kotlin.Long.plus' call
        var other = tail.b2k_1;
        var tmp0_0 = add(tmp0, fromInt(other));
        // Inline function 'kotlin.Long.minus' call
        var other_0 = tail.f2l() ? 0 : tail.a2k_1;
        var tmp$ret$3 = subtract(tmp0_0, fromInt(other_0));
        tmp = compare(tmp$ret$3, new Long(8192, 0)) <= 0;
      } else {
        tmp = false;
      }
      if (tmp) {
        ensureNotNull(source.v2j_1).h2l(tail, convertToInt(remainingByteCount));
        source.x2j_1 = subtract(source.x2j_1, remainingByteCount);
        this.x2j_1 = add(this.x2j_1, remainingByteCount);
        return Unit_instance;
      } else {
        source.v2j_1 = ensureNotNull(source.v2j_1).g2l(convertToInt(remainingByteCount));
      }
    }
    var segmentToMove = ensureNotNull(source.v2j_1);
    var movedByteCount = fromInt(segmentToMove.l1());
    source.v2j_1 = segmentToMove.i2l();
    if (source.v2j_1 == null) {
      source.w2j_1 = null;
    }
    // Inline function 'kotlinx.io.Buffer.pushSegment' call
    if (this.v2j_1 == null) {
      this.v2j_1 = segmentToMove;
      this.w2j_1 = segmentToMove;
    } else if (true) {
      this.w2j_1 = ensureNotNull(this.w2j_1).n2k(segmentToMove).o2k();
      if (ensureNotNull(this.w2j_1).f2k_1 == null) {
        this.v2j_1 = this.w2j_1;
      }
    } else {
      this.w2j_1 = ensureNotNull(this.w2j_1).n2k(segmentToMove);
    }
    source.x2j_1 = subtract(source.x2j_1, movedByteCount);
    this.x2j_1 = add(this.x2j_1, movedByteCount);
    remainingByteCount = subtract(remainingByteCount, movedByteCount);
  }
};
protoOf(Buffer).j2l = function (source) {
  var totalBytesRead = new Long(0, 0);
  $l$loop: while (true) {
    var readCount = source.t2k(this, new Long(8192, 0));
    if (equalsLong(readCount, new Long(-1, -1)))
      break $l$loop;
    totalBytesRead = add(totalBytesRead, readCount);
  }
  return totalBytesRead;
};
protoOf(Buffer).k2l = function (byte) {
  this.y2k(1).l2l(byte);
  this.x2j_1 = add(this.x2j_1, new Long(1, 0));
};
protoOf(Buffer).m2l = function (short) {
  this.y2k(2).n2l(short);
  this.x2j_1 = add(this.x2j_1, new Long(2, 0));
};
protoOf(Buffer).g4 = function () {
  return Unit_instance;
};
protoOf(Buffer).toString = function () {
  if (equalsLong(this.l1(), new Long(0, 0)))
    return 'Buffer(size=0)';
  var maxPrintableBytes = 64;
  // Inline function 'kotlinx.io.minOf' call
  var b = this.l1();
  // Inline function 'kotlin.comparisons.minOf' call
  var a = fromInt(maxPrintableBytes);
  var tmp$ret$1 = compare(a, b) <= 0 ? a : b;
  var len = convertToInt(tmp$ret$1);
  var builder = StringBuilder_init_$Create$(imul(len, 2) + (compare(this.l1(), fromInt(maxPrintableBytes)) > 0 ? 1 : 0) | 0);
  var bytesWritten = 0;
  // Inline function 'kotlinx.io.unsafe.UnsafeBufferOperations.forEachSegment' call
  var curr = this.v2j_1;
  while (!(curr == null)) {
    var tmp0 = get_SegmentReadContextImpl();
    var segment = curr;
    var idx = 0;
    while (bytesWritten < len && idx < segment.l1()) {
      var _unary__edvuaz = idx;
      idx = _unary__edvuaz + 1 | 0;
      var b_0 = tmp0.o2l(segment, _unary__edvuaz);
      bytesWritten = bytesWritten + 1 | 0;
      var tmp = get_HEX_DIGIT_CHARS();
      // Inline function 'kotlinx.io.shr' call
      var tmp$ret$2 = b_0 >> 4;
      var tmp_0 = builder.s(tmp[tmp$ret$2 & 15]);
      var tmp_1 = get_HEX_DIGIT_CHARS();
      // Inline function 'kotlinx.io.and' call
      var tmp$ret$3 = b_0 & 15;
      tmp_0.s(tmp_1[tmp$ret$3]);
    }
    curr = curr.e2k_1;
  }
  if (compare(this.l1(), fromInt(maxPrintableBytes)) > 0) {
    builder.s(_Char___init__impl__6a9atx(8230));
  }
  return 'Buffer(size=' + this.l1().toString() + ' hex=' + builder.toString() + ')';
};
protoOf(Buffer).g2k = function () {
  var oldHead = ensureNotNull(this.v2j_1);
  var nextHead = oldHead.e2k_1;
  this.v2j_1 = nextHead;
  if (nextHead == null) {
    this.w2j_1 = null;
  } else {
    nextHead.f2k_1 = null;
  }
  oldHead.e2k_1 = null;
  SegmentPool_instance.p2l(oldHead);
};
protoOf(Buffer).q2l = function () {
  var oldTail = ensureNotNull(this.w2j_1);
  var newTail = oldTail.f2k_1;
  this.w2j_1 = newTail;
  if (newTail == null) {
    this.v2j_1 = null;
  } else {
    newTail.e2k_1 = null;
  }
  oldTail.f2k_1 = null;
  SegmentPool_instance.p2l(oldTail);
};
function indexOf(_this__u8e3s4, byte, startIndex, endIndex) {
  startIndex = startIndex === VOID ? new Long(0, 0) : startIndex;
  endIndex = endIndex === VOID ? _this__u8e3s4.l1() : endIndex;
  // Inline function 'kotlin.comparisons.minOf' call
  var b = _this__u8e3s4.l1();
  var endOffset = compare(endIndex, b) <= 0 ? endIndex : b;
  checkBounds(_this__u8e3s4.l1(), startIndex, endOffset);
  if (equalsLong(startIndex, endOffset))
    return new Long(-1, -1);
  // Inline function 'kotlinx.io.seek' call
  if (_this__u8e3s4.v2j_1 == null) {
    var o = new Long(-1, -1);
    if (equalsLong(o, new Long(-1, -1))) {
      return new Long(-1, -1);
    }
    var segment = null;
    var offset = o;
    do {
      // Inline function 'kotlin.check' call
      if (!(compare(endOffset, offset) > 0)) {
        throw IllegalStateException_init_$Create$('Check failed.');
      }
      ensureNotNull(segment);
      var tmp = segment;
      // Inline function 'kotlin.comparisons.maxOf' call
      var a = convertToInt(subtract(startIndex, offset));
      var tmp_0 = Math.max(a, 0);
      var tmp0 = segment.l1();
      // Inline function 'kotlin.comparisons.minOf' call
      var b_0 = convertToInt(subtract(endOffset, offset));
      var tmp$ret$3 = Math.min(tmp0, b_0);
      var idx = indexOf_0(tmp, byte, tmp_0, tmp$ret$3);
      if (!(idx === -1)) {
        return add(offset, fromInt(idx));
      }
      var tmp0_0 = offset;
      // Inline function 'kotlin.Long.plus' call
      var other = segment.l1();
      offset = add(tmp0_0, fromInt(other));
      segment = segment.e2k_1;
    }
     while (!(segment == null) && compare(offset, endOffset) < 0);
    return new Long(-1, -1);
  }
  if (compare(subtract(_this__u8e3s4.l1(), startIndex), startIndex) < 0) {
    var s = _this__u8e3s4.w2j_1;
    var offset_0 = _this__u8e3s4.l1();
    $l$loop: while (!(s == null) && compare(offset_0, startIndex) > 0) {
      offset_0 = subtract(offset_0, fromInt(s.b2k_1 - s.a2k_1 | 0));
      if (compare(offset_0, startIndex) <= 0)
        break $l$loop;
      s = s.f2k_1;
    }
    var tmp0_1 = s;
    var o_0 = offset_0;
    if (equalsLong(o_0, new Long(-1, -1))) {
      return new Long(-1, -1);
    }
    var segment_0 = tmp0_1;
    var offset_1 = o_0;
    do {
      // Inline function 'kotlin.check' call
      if (!(compare(endOffset, offset_1) > 0)) {
        throw IllegalStateException_init_$Create$('Check failed.');
      }
      ensureNotNull(segment_0);
      var tmp_1 = segment_0;
      // Inline function 'kotlin.comparisons.maxOf' call
      var a_0 = convertToInt(subtract(startIndex, offset_1));
      var tmp_2 = Math.max(a_0, 0);
      var tmp0_2 = segment_0.l1();
      // Inline function 'kotlin.comparisons.minOf' call
      var b_1 = convertToInt(subtract(endOffset, offset_1));
      var tmp$ret$8 = Math.min(tmp0_2, b_1);
      var idx_0 = indexOf_0(tmp_1, byte, tmp_2, tmp$ret$8);
      if (!(idx_0 === -1)) {
        return add(offset_1, fromInt(idx_0));
      }
      var tmp0_3 = offset_1;
      // Inline function 'kotlin.Long.plus' call
      var other_0 = segment_0.l1();
      offset_1 = add(tmp0_3, fromInt(other_0));
      segment_0 = segment_0.e2k_1;
    }
     while (!(segment_0 == null) && compare(offset_1, endOffset) < 0);
    return new Long(-1, -1);
  } else {
    var s_0 = _this__u8e3s4.v2j_1;
    var offset_2 = new Long(0, 0);
    $l$loop_0: while (!(s_0 == null)) {
      var tmp0_4 = offset_2;
      // Inline function 'kotlin.Long.plus' call
      var other_1 = s_0.b2k_1 - s_0.a2k_1 | 0;
      var nextOffset = add(tmp0_4, fromInt(other_1));
      if (compare(nextOffset, startIndex) > 0)
        break $l$loop_0;
      s_0 = s_0.e2k_1;
      offset_2 = nextOffset;
    }
    var tmp0_5 = s_0;
    var o_1 = offset_2;
    if (equalsLong(o_1, new Long(-1, -1))) {
      return new Long(-1, -1);
    }
    var segment_1 = tmp0_5;
    var offset_3 = o_1;
    do {
      // Inline function 'kotlin.check' call
      if (!(compare(endOffset, offset_3) > 0)) {
        throw IllegalStateException_init_$Create$('Check failed.');
      }
      ensureNotNull(segment_1);
      var tmp_3 = segment_1;
      // Inline function 'kotlin.comparisons.maxOf' call
      var a_1 = convertToInt(subtract(startIndex, offset_3));
      var tmp_4 = Math.max(a_1, 0);
      var tmp0_6 = segment_1.l1();
      // Inline function 'kotlin.comparisons.minOf' call
      var b_2 = convertToInt(subtract(endOffset, offset_3));
      var tmp$ret$13 = Math.min(tmp0_6, b_2);
      var idx_1 = indexOf_0(tmp_3, byte, tmp_4, tmp$ret$13);
      if (!(idx_1 === -1)) {
        return add(offset_3, fromInt(idx_1));
      }
      var tmp0_7 = offset_3;
      // Inline function 'kotlin.Long.plus' call
      var other_2 = segment_1.l1();
      offset_3 = add(tmp0_7, fromInt(other_2));
      segment_1 = segment_1.e2k_1;
    }
     while (!(segment_1 == null) && compare(offset_3, endOffset) < 0);
    return new Long(-1, -1);
  }
}
function readByteString(_this__u8e3s4, byteCount) {
  return UnsafeByteStringOperations_instance.u2j(readByteArray_0(_this__u8e3s4, byteCount));
}
function buffered(_this__u8e3s4) {
  return new RealSource(_this__u8e3s4);
}
function PeekSource(upstream) {
  this.r2l_1 = upstream;
  this.s2l_1 = this.r2l_1.y2j();
  this.t2l_1 = this.s2l_1.v2j_1;
  var tmp = this;
  var tmp0_safe_receiver = this.s2l_1.v2j_1;
  var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.a2k_1;
  tmp.u2l_1 = tmp1_elvis_lhs == null ? -1 : tmp1_elvis_lhs;
  this.v2l_1 = false;
  this.w2l_1 = new Long(0, 0);
}
protoOf(PeekSource).t2k = function (sink, byteCount) {
  // Inline function 'kotlin.check' call
  if (!!this.v2l_1) {
    var message = 'Source is closed.';
    throw IllegalStateException_init_$Create$(toString(message));
  }
  // Inline function 'kotlinx.io.checkByteCount' call
  // Inline function 'kotlin.require' call
  if (!(compare(byteCount, new Long(0, 0)) >= 0)) {
    var message_0 = 'byteCount (' + byteCount.toString() + ') < 0';
    throw IllegalArgumentException_init_$Create$(toString(message_0));
  }
  // Inline function 'kotlin.check' call
  if (!(this.t2l_1 == null || (this.t2l_1 === this.s2l_1.v2j_1 && this.u2l_1 === ensureNotNull(this.s2l_1.v2j_1).a2k_1))) {
    var message_1 = 'Peek source is invalid because upstream source was used';
    throw IllegalStateException_init_$Create$(toString(message_1));
  }
  if (equalsLong(byteCount, new Long(0, 0)))
    return new Long(0, 0);
  // Inline function 'kotlin.Long.plus' call
  var this_0 = this.w2l_1;
  var tmp$ret$7 = add(this_0, fromInt(1));
  if (!this.r2l_1.m1p(tmp$ret$7))
    return new Long(-1, -1);
  if (this.t2l_1 == null && !(this.s2l_1.v2j_1 == null)) {
    this.t2l_1 = this.s2l_1.v2j_1;
    this.u2l_1 = ensureNotNull(this.s2l_1.v2j_1).a2k_1;
  }
  // Inline function 'kotlin.comparisons.minOf' call
  var b = subtract(this.s2l_1.l1(), this.w2l_1);
  var toCopy = compare(byteCount, b) <= 0 ? byteCount : b;
  this.s2l_1.l2k(sink, this.w2l_1, add(this.w2l_1, toCopy));
  this.w2l_1 = add(this.w2l_1, toCopy);
  return toCopy;
};
protoOf(PeekSource).g4 = function () {
  this.v2l_1 = true;
};
function RealSource(source) {
  this.x2l_1 = source;
  this.y2l_1 = false;
  this.z2l_1 = new Buffer();
}
protoOf(RealSource).y2j = function () {
  return this.z2l_1;
};
protoOf(RealSource).t2k = function (sink, byteCount) {
  // Inline function 'kotlinx.io.RealSource.checkNotClosed' call
  // Inline function 'kotlin.check' call
  if (!!this.y2l_1) {
    var message = 'Source is closed.';
    throw IllegalStateException_init_$Create$(toString(message));
  }
  // Inline function 'kotlin.require' call
  if (!(compare(byteCount, new Long(0, 0)) >= 0)) {
    var message_0 = 'byteCount: ' + byteCount.toString();
    throw IllegalArgumentException_init_$Create$(toString(message_0));
  }
  if (equalsLong(this.z2l_1.l1(), new Long(0, 0))) {
    var read = this.x2l_1.t2k(this.z2l_1, new Long(8192, 0));
    if (equalsLong(read, new Long(-1, -1)))
      return new Long(-1, -1);
  }
  // Inline function 'kotlin.comparisons.minOf' call
  var b = this.z2l_1.l1();
  var toRead = compare(byteCount, b) <= 0 ? byteCount : b;
  return this.z2l_1.t2k(sink, toRead);
};
protoOf(RealSource).j1m = function () {
  // Inline function 'kotlinx.io.RealSource.checkNotClosed' call
  // Inline function 'kotlin.check' call
  if (!!this.y2l_1) {
    var message = 'Source is closed.';
    throw IllegalStateException_init_$Create$(toString(message));
  }
  return this.z2l_1.j1m() && equalsLong(this.x2l_1.t2k(this.z2l_1, new Long(8192, 0)), new Long(-1, -1));
};
protoOf(RealSource).l1p = function (byteCount) {
  if (!this.m1p(byteCount))
    throw EOFException_init_$Create$_0("Source doesn't contain required number of bytes (" + byteCount.toString() + ').');
};
protoOf(RealSource).m1p = function (byteCount) {
  // Inline function 'kotlinx.io.RealSource.checkNotClosed' call
  // Inline function 'kotlin.check' call
  if (!!this.y2l_1) {
    var message = 'Source is closed.';
    throw IllegalStateException_init_$Create$(toString(message));
  }
  // Inline function 'kotlin.require' call
  if (!(compare(byteCount, new Long(0, 0)) >= 0)) {
    var message_0 = 'byteCount: ' + byteCount.toString();
    throw IllegalArgumentException_init_$Create$(toString(message_0));
  }
  while (compare(this.z2l_1.l1(), byteCount) < 0) {
    if (equalsLong(this.x2l_1.t2k(this.z2l_1, new Long(8192, 0)), new Long(-1, -1)))
      return false;
  }
  return true;
};
protoOf(RealSource).g1m = function () {
  this.l1p(new Long(1, 0));
  return this.z2l_1.g1m();
};
protoOf(RealSource).r2k = function (sink, startIndex, endIndex) {
  // Inline function 'kotlinx.io.checkBounds' call
  var size = sink.length;
  checkBounds(fromInt(size), fromInt(startIndex), fromInt(endIndex));
  if (equalsLong(this.z2l_1.l1(), new Long(0, 0))) {
    var read = this.x2l_1.t2k(this.z2l_1, new Long(8192, 0));
    if (equalsLong(read, new Long(-1, -1)))
      return -1;
  }
  var tmp0 = endIndex - startIndex | 0;
  // Inline function 'kotlinx.io.minOf' call
  var b = this.z2l_1.l1();
  // Inline function 'kotlin.comparisons.minOf' call
  var a = fromInt(tmp0);
  var tmp$ret$2 = compare(a, b) <= 0 ? a : b;
  var toRead = convertToInt(tmp$ret$2);
  return this.z2l_1.r2k(sink, startIndex, startIndex + toRead | 0);
};
protoOf(RealSource).v2k = function (sink, byteCount) {
  try {
    this.l1p(byteCount);
  } catch ($p) {
    if ($p instanceof EOFException) {
      var e = $p;
      sink.u2k(this.z2l_1, this.z2l_1.l1());
      throw e;
    } else {
      throw $p;
    }
  }
  this.z2l_1.v2k(sink, byteCount);
};
protoOf(RealSource).w2k = function (sink) {
  var totalBytesWritten = new Long(0, 0);
  while (!equalsLong(this.x2l_1.t2k(this.z2l_1, new Long(8192, 0)), new Long(-1, -1))) {
    var emitByteCount = this.z2l_1.p2k();
    if (compare(emitByteCount, new Long(0, 0)) > 0) {
      totalBytesWritten = add(totalBytesWritten, emitByteCount);
      sink.u2k(this.z2l_1, emitByteCount);
    }
  }
  if (compare(this.z2l_1.l1(), new Long(0, 0)) > 0) {
    totalBytesWritten = add(totalBytesWritten, this.z2l_1.l1());
    sink.u2k(this.z2l_1, this.z2l_1.l1());
  }
  return totalBytesWritten;
};
protoOf(RealSource).i2k = function () {
  this.l1p(new Long(2, 0));
  return this.z2l_1.i2k();
};
protoOf(RealSource).x2k = function () {
  // Inline function 'kotlinx.io.RealSource.checkNotClosed' call
  // Inline function 'kotlin.check' call
  if (!!this.y2l_1) {
    var message = 'Source is closed.';
    throw IllegalStateException_init_$Create$(toString(message));
  }
  return buffered(new PeekSource(this));
};
protoOf(RealSource).g4 = function () {
  if (this.y2l_1)
    return Unit_instance;
  this.y2l_1 = true;
  this.x2l_1.g4();
  this.z2l_1.y2();
};
protoOf(RealSource).toString = function () {
  return 'buffered(' + toString(this.x2l_1) + ')';
};
function Segment_init_$Init$($this) {
  Segment.call($this);
  $this.z2j_1 = new Int8Array(8192);
  $this.d2k_1 = true;
  $this.c2k_1 = null;
  return $this;
}
function Segment_init_$Create$() {
  return Segment_init_$Init$(objectCreate(protoOf(Segment)));
}
function Segment_init_$Init$_0(data, pos, limit, shareToken, owner, $this) {
  Segment.call($this);
  $this.z2j_1 = data;
  $this.a2k_1 = pos;
  $this.b2k_1 = limit;
  $this.c2k_1 = shareToken;
  $this.d2k_1 = owner;
  return $this;
}
function Segment_init_$Create$_0(data, pos, limit, shareToken, owner) {
  return Segment_init_$Init$_0(data, pos, limit, shareToken, owner, objectCreate(protoOf(Segment)));
}
function Companion() {
  this.a2m_1 = 8192;
  this.b2m_1 = 1024;
}
protoOf(Companion).c2m = function () {
  return Segment_init_$Create$();
};
var Companion_instance;
function Companion_getInstance() {
  return Companion_instance;
}
protoOf(Segment).f2l = function () {
  var tmp0_safe_receiver = this.c2k_1;
  var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.d2m();
  return tmp1_elvis_lhs == null ? false : tmp1_elvis_lhs;
};
protoOf(Segment).m2k = function () {
  var tmp0_elvis_lhs = this.c2k_1;
  var tmp;
  if (tmp0_elvis_lhs == null) {
    // Inline function 'kotlin.also' call
    var this_0 = SegmentPool_instance.e2m();
    this.c2k_1 = this_0;
    tmp = this_0;
  } else {
    tmp = tmp0_elvis_lhs;
  }
  var t = tmp;
  var tmp_0 = this.a2k_1;
  var tmp_1 = this.b2k_1;
  // Inline function 'kotlin.also' call
  t.f2m();
  return Segment_init_$Create$_0(this.z2j_1, tmp_0, tmp_1, t, false);
};
protoOf(Segment).i2l = function () {
  var result = this.e2k_1;
  if (!(this.f2k_1 == null)) {
    ensureNotNull(this.f2k_1).e2k_1 = this.e2k_1;
  }
  if (!(this.e2k_1 == null)) {
    ensureNotNull(this.e2k_1).f2k_1 = this.f2k_1;
  }
  this.e2k_1 = null;
  this.f2k_1 = null;
  return result;
};
protoOf(Segment).n2k = function (segment) {
  segment.f2k_1 = this;
  segment.e2k_1 = this.e2k_1;
  if (!(this.e2k_1 == null)) {
    ensureNotNull(this.e2k_1).f2k_1 = segment;
  }
  this.e2k_1 = segment;
  return segment;
};
protoOf(Segment).g2l = function (byteCount) {
  // Inline function 'kotlin.require' call
  if (!(byteCount > 0 && byteCount <= (this.b2k_1 - this.a2k_1 | 0))) {
    var message = 'byteCount out of range';
    throw IllegalArgumentException_init_$Create$(toString(message));
  }
  var prefix;
  if (byteCount >= 1024) {
    prefix = this.m2k();
  } else {
    prefix = SegmentPool_instance.g1l();
    var tmp0 = this.z2j_1;
    var tmp2 = prefix.z2j_1;
    var tmp5 = this.a2k_1;
    // Inline function 'kotlin.collections.copyInto' call
    var endIndex = this.a2k_1 + byteCount | 0;
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    var tmp = tmp0;
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    arrayCopy(tmp, tmp2, 0, tmp5, endIndex);
  }
  prefix.b2k_1 = prefix.a2k_1 + byteCount | 0;
  this.a2k_1 = this.a2k_1 + byteCount | 0;
  if (!(this.f2k_1 == null)) {
    ensureNotNull(this.f2k_1).n2k(prefix);
  } else {
    prefix.e2k_1 = this;
    this.f2k_1 = prefix;
  }
  return prefix;
};
protoOf(Segment).o2k = function () {
  // Inline function 'kotlin.check' call
  if (!!(this.f2k_1 == null)) {
    var message = 'cannot compact';
    throw IllegalStateException_init_$Create$(toString(message));
  }
  if (!ensureNotNull(this.f2k_1).d2k_1)
    return this;
  var byteCount = this.b2k_1 - this.a2k_1 | 0;
  var availableByteCount = (8192 - ensureNotNull(this.f2k_1).b2k_1 | 0) + (ensureNotNull(this.f2k_1).f2l() ? 0 : ensureNotNull(this.f2k_1).a2k_1) | 0;
  if (byteCount > availableByteCount)
    return this;
  var predecessor = this.f2k_1;
  this.h2l(ensureNotNull(predecessor), byteCount);
  var successor = this.i2l();
  // Inline function 'kotlin.check' call
  if (!(successor == null)) {
    throw IllegalStateException_init_$Create$('Check failed.');
  }
  SegmentPool_instance.p2l(this);
  return predecessor;
};
protoOf(Segment).l2l = function (byte) {
  var _unary__edvuaz = this.b2k_1;
  this.b2k_1 = _unary__edvuaz + 1 | 0;
  this.z2j_1[_unary__edvuaz] = byte;
};
protoOf(Segment).n2l = function (short) {
  var data = this.z2j_1;
  var limit = this.b2k_1;
  var _unary__edvuaz = limit;
  limit = _unary__edvuaz + 1 | 0;
  data[_unary__edvuaz] = toByte((short >>> 8 | 0) & 255);
  var _unary__edvuaz_0 = limit;
  limit = _unary__edvuaz_0 + 1 | 0;
  data[_unary__edvuaz_0] = toByte(short & 255);
  this.b2k_1 = limit;
};
protoOf(Segment).h2k = function () {
  var _unary__edvuaz = this.a2k_1;
  this.a2k_1 = _unary__edvuaz + 1 | 0;
  return this.z2j_1[_unary__edvuaz];
};
protoOf(Segment).j2k = function () {
  var data = this.z2j_1;
  var pos = this.a2k_1;
  var _unary__edvuaz = pos;
  pos = _unary__edvuaz + 1 | 0;
  // Inline function 'kotlinx.io.and' call
  var tmp = (data[_unary__edvuaz] & 255) << 8;
  var _unary__edvuaz_0 = pos;
  pos = _unary__edvuaz_0 + 1 | 0;
  // Inline function 'kotlinx.io.and' call
  var tmp$ret$1 = data[_unary__edvuaz_0] & 255;
  var s = toShort(tmp | tmp$ret$1);
  this.a2k_1 = pos;
  return s;
};
protoOf(Segment).h2l = function (sink, byteCount) {
  // Inline function 'kotlin.check' call
  if (!sink.d2k_1) {
    var message = 'only owner can write';
    throw IllegalStateException_init_$Create$(toString(message));
  }
  if ((sink.b2k_1 + byteCount | 0) > 8192) {
    if (sink.f2l())
      throw IllegalArgumentException_init_$Create$_0();
    if (((sink.b2k_1 + byteCount | 0) - sink.a2k_1 | 0) > 8192)
      throw IllegalArgumentException_init_$Create$_0();
    var tmp0 = sink.z2j_1;
    var tmp2 = sink.z2j_1;
    var tmp5 = sink.a2k_1;
    // Inline function 'kotlin.collections.copyInto' call
    var endIndex = sink.b2k_1;
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    var tmp = tmp0;
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    arrayCopy(tmp, tmp2, 0, tmp5, endIndex);
    sink.b2k_1 = sink.b2k_1 - sink.a2k_1 | 0;
    sink.a2k_1 = 0;
  }
  var tmp0_0 = this.z2j_1;
  var tmp2_0 = sink.z2j_1;
  var tmp4 = sink.b2k_1;
  var tmp6 = this.a2k_1;
  // Inline function 'kotlin.collections.copyInto' call
  var endIndex_0 = this.a2k_1 + byteCount | 0;
  // Inline function 'kotlin.js.unsafeCast' call
  // Inline function 'kotlin.js.asDynamic' call
  var tmp_0 = tmp0_0;
  // Inline function 'kotlin.js.unsafeCast' call
  // Inline function 'kotlin.js.asDynamic' call
  arrayCopy(tmp_0, tmp2_0, tmp4, tmp6, endIndex_0);
  sink.b2k_1 = sink.b2k_1 + byteCount | 0;
  this.a2k_1 = this.a2k_1 + byteCount | 0;
};
protoOf(Segment).s2k = function (dst, dstStartOffset, dstEndOffset) {
  var len = dstEndOffset - dstStartOffset | 0;
  var tmp0 = this.z2j_1;
  var tmp6 = this.a2k_1;
  // Inline function 'kotlin.collections.copyInto' call
  var endIndex = this.a2k_1 + len | 0;
  // Inline function 'kotlin.js.unsafeCast' call
  // Inline function 'kotlin.js.asDynamic' call
  var tmp = tmp0;
  // Inline function 'kotlin.js.unsafeCast' call
  // Inline function 'kotlin.js.asDynamic' call
  arrayCopy(tmp, dst, dstStartOffset, tmp6, endIndex);
  this.a2k_1 = this.a2k_1 + len | 0;
};
protoOf(Segment).d2l = function (src, srcStartOffset, srcEndOffset) {
  var tmp2 = this.z2j_1;
  // Inline function 'kotlin.collections.copyInto' call
  var destinationOffset = this.b2k_1;
  // Inline function 'kotlin.js.unsafeCast' call
  // Inline function 'kotlin.js.asDynamic' call
  var tmp = src;
  // Inline function 'kotlin.js.unsafeCast' call
  // Inline function 'kotlin.js.asDynamic' call
  arrayCopy(tmp, tmp2, destinationOffset, srcStartOffset, srcEndOffset);
  this.b2k_1 = this.b2k_1 + (srcEndOffset - srcStartOffset | 0) | 0;
};
protoOf(Segment).l1 = function () {
  return this.b2k_1 - this.a2k_1 | 0;
};
protoOf(Segment).c2l = function () {
  return this.z2j_1.length - this.b2k_1 | 0;
};
protoOf(Segment).g2m = function (readOnly) {
  return this.z2j_1;
};
protoOf(Segment).q2k = function (index) {
  return this.z2j_1[this.a2k_1 + index | 0];
};
protoOf(Segment).h2m = function (index, value) {
  this.z2j_1[this.b2k_1 + index | 0] = value;
};
protoOf(Segment).i2m = function (index, b0, b1) {
  var d = this.z2j_1;
  var l = this.b2k_1;
  d[l + index | 0] = b0;
  d[(l + index | 0) + 1 | 0] = b1;
};
protoOf(Segment).j2m = function (index, b0, b1, b2) {
  var d = this.z2j_1;
  var l = this.b2k_1;
  d[l + index | 0] = b0;
  d[(l + index | 0) + 1 | 0] = b1;
  d[(l + index | 0) + 2 | 0] = b2;
};
protoOf(Segment).k2m = function (index, b0, b1, b2, b3) {
  var d = this.z2j_1;
  var l = this.b2k_1;
  d[l + index | 0] = b0;
  d[(l + index | 0) + 1 | 0] = b1;
  d[(l + index | 0) + 2 | 0] = b2;
  d[(l + index | 0) + 3 | 0] = b3;
};
function Segment() {
  this.a2k_1 = 0;
  this.b2k_1 = 0;
  this.c2k_1 = null;
  this.d2k_1 = false;
  this.e2k_1 = null;
  this.f2k_1 = null;
}
function isEmpty(_this__u8e3s4) {
  return _this__u8e3s4.l1() === 0;
}
function SegmentCopyTracker() {
}
function AlwaysSharedCopyTracker() {
  AlwaysSharedCopyTracker_instance = this;
  SegmentCopyTracker.call(this);
}
protoOf(AlwaysSharedCopyTracker).d2m = function () {
  return true;
};
protoOf(AlwaysSharedCopyTracker).f2m = function () {
  return Unit_instance;
};
var AlwaysSharedCopyTracker_instance;
function AlwaysSharedCopyTracker_getInstance() {
  if (AlwaysSharedCopyTracker_instance == null)
    new AlwaysSharedCopyTracker();
  return AlwaysSharedCopyTracker_instance;
}
function indexOf_0(_this__u8e3s4, byte, startOffset, endOffset) {
  // Inline function 'kotlin.require' call
  if (!(0 <= startOffset ? startOffset < _this__u8e3s4.l1() : false)) {
    var message = '' + startOffset;
    throw IllegalArgumentException_init_$Create$(toString(message));
  }
  // Inline function 'kotlin.require' call
  if (!(startOffset <= endOffset ? endOffset <= _this__u8e3s4.l1() : false)) {
    var message_0 = '' + endOffset;
    throw IllegalArgumentException_init_$Create$(toString(message_0));
  }
  var p = _this__u8e3s4.a2k_1;
  var data = _this__u8e3s4.g2m(true);
  var inductionVariable = startOffset;
  if (inductionVariable < endOffset)
    do {
      var idx = inductionVariable;
      inductionVariable = inductionVariable + 1 | 0;
      if (data[p + idx | 0] === byte) {
        return idx;
      }
    }
     while (inductionVariable < endOffset);
  return -1;
}
function Sink() {
}
function Source() {
}
function readByteArray(_this__u8e3s4) {
  return readByteArrayImpl(_this__u8e3s4, -1);
}
function readByteArray_0(_this__u8e3s4, byteCount) {
  // Inline function 'kotlinx.io.checkByteCount' call
  var byteCount_0 = fromInt(byteCount);
  // Inline function 'kotlin.require' call
  if (!(compare(byteCount_0, new Long(0, 0)) >= 0)) {
    var message = 'byteCount (' + byteCount_0.toString() + ') < 0';
    throw IllegalArgumentException_init_$Create$(toString(message));
  }
  return readByteArrayImpl(_this__u8e3s4, byteCount);
}
function indexOf_1(_this__u8e3s4, byte, startIndex, endIndex) {
  startIndex = startIndex === VOID ? new Long(0, 0) : startIndex;
  endIndex = endIndex === VOID ? new Long(-1, 2147483647) : endIndex;
  // Inline function 'kotlin.require' call
  if (!(compare(new Long(0, 0), startIndex) <= 0 ? compare(startIndex, endIndex) <= 0 : false)) {
    var tmp;
    if (compare(endIndex, new Long(0, 0)) < 0) {
      tmp = 'startIndex (' + startIndex.toString() + ') and endIndex (' + endIndex.toString() + ') should be non negative';
    } else {
      tmp = 'startIndex (' + startIndex.toString() + ') is not within the range [0..endIndex(' + endIndex.toString() + '))';
    }
    var message = tmp;
    throw IllegalArgumentException_init_$Create$(toString(message));
  }
  if (equalsLong(startIndex, endIndex))
    return new Long(-1, -1);
  var offset = startIndex;
  $l$loop: while (true) {
    var tmp_0;
    if (compare(offset, endIndex) < 0) {
      // Inline function 'kotlin.Long.plus' call
      var this_0 = offset;
      var tmp$ret$2 = add(this_0, fromInt(1));
      tmp_0 = _this__u8e3s4.m1p(tmp$ret$2);
    } else {
      tmp_0 = false;
    }
    if (!tmp_0) {
      break $l$loop;
    }
    var tmp_1 = _this__u8e3s4.y2j();
    var tmp_2 = offset;
    // Inline function 'kotlin.comparisons.minOf' call
    var b = _this__u8e3s4.y2j().l1();
    var tmp$ret$3 = compare(endIndex, b) <= 0 ? endIndex : b;
    var idx = indexOf(tmp_1, byte, tmp_2, tmp$ret$3);
    if (!equalsLong(idx, new Long(-1, -1))) {
      return idx;
    }
    offset = _this__u8e3s4.y2j().l1();
  }
  return new Long(-1, -1);
}
function readByteArrayImpl(_this__u8e3s4, size) {
  var arraySize = size;
  if (size === -1) {
    var fetchSize = new Long(2147483647, 0);
    while (compare(_this__u8e3s4.y2j().l1(), new Long(2147483647, 0)) < 0 && _this__u8e3s4.m1p(fetchSize)) {
      // Inline function 'kotlin.Long.times' call
      var this_0 = fetchSize;
      fetchSize = multiply(this_0, fromInt(2));
    }
    // Inline function 'kotlin.check' call
    if (!(compare(_this__u8e3s4.y2j().l1(), new Long(2147483647, 0)) < 0)) {
      var message = "Can't create an array of size " + _this__u8e3s4.y2j().l1().toString();
      throw IllegalStateException_init_$Create$(toString(message));
    }
    arraySize = convertToInt(_this__u8e3s4.y2j().l1());
  } else {
    _this__u8e3s4.l1p(fromInt(size));
  }
  var array = new Int8Array(arraySize);
  readTo(_this__u8e3s4.y2j(), array);
  return array;
}
function readTo(_this__u8e3s4, sink, startIndex, endIndex) {
  startIndex = startIndex === VOID ? 0 : startIndex;
  endIndex = endIndex === VOID ? sink.length : endIndex;
  // Inline function 'kotlinx.io.checkBounds' call
  var size = sink.length;
  checkBounds(fromInt(size), fromInt(startIndex), fromInt(endIndex));
  var offset = startIndex;
  while (offset < endIndex) {
    var bytesRead = _this__u8e3s4.r2k(sink, offset, endIndex);
    if (bytesRead === -1) {
      throw EOFException_init_$Create$_0('Source exhausted before reading ' + (endIndex - startIndex | 0) + ' bytes. ' + ('Only ' + bytesRead + ' bytes were read.'));
    }
    offset = offset + bytesRead | 0;
  }
}
function readString(_this__u8e3s4, byteCount) {
  _this__u8e3s4.l1p(byteCount);
  return commonReadUtf8(_this__u8e3s4.y2j(), byteCount);
}
function readString_0(_this__u8e3s4) {
  _this__u8e3s4.m1p(new Long(-1, 2147483647));
  return commonReadUtf8(_this__u8e3s4.y2j(), _this__u8e3s4.y2j().l1());
}
function writeString(_this__u8e3s4, string, startIndex, endIndex) {
  startIndex = startIndex === VOID ? 0 : startIndex;
  endIndex = endIndex === VOID ? string.length : endIndex;
  // Inline function 'kotlinx.io.checkBounds' call
  var size = string.length;
  checkBounds(fromInt(size), fromInt(startIndex), fromInt(endIndex));
  // Inline function 'kotlinx.io.writeToInternalBuffer' call
  // Inline function 'kotlinx.io.commonWriteUtf8' call
  var this_0 = _this__u8e3s4.y2j();
  var i = startIndex;
  while (i < endIndex) {
    var p0 = i;
    // Inline function 'kotlin.code' call
    var this_1 = charCodeAt(string, p0);
    var c = Char__toInt_impl_vasixd(this_1);
    if (c < 128) {
      $l$block_0: {
        // Inline function 'kotlinx.io.unsafe.UnsafeBufferOperations.writeToTail' call
        var tail = this_0.y2k(1);
        var ctx = get_SegmentWriteContextImpl();
        var segmentOffset = -i | 0;
        // Inline function 'kotlin.comparisons.minOf' call
        var b = i + tail.c2l() | 0;
        var runLimit = Math.min(endIndex, b);
        var _unary__edvuaz = i;
        i = _unary__edvuaz + 1 | 0;
        ctx.o2m(tail, segmentOffset + _unary__edvuaz | 0, toByte(c));
        $l$loop: while (i < runLimit) {
          var p0_0 = i;
          // Inline function 'kotlin.code' call
          var this_2 = charCodeAt(string, p0_0);
          c = Char__toInt_impl_vasixd(this_2);
          if (c >= 128)
            break $l$loop;
          var _unary__edvuaz_0 = i;
          i = _unary__edvuaz_0 + 1 | 0;
          ctx.o2m(tail, segmentOffset + _unary__edvuaz_0 | 0, toByte(c));
        }
        var bytesWritten = i + segmentOffset | 0;
        if (bytesWritten === 1) {
          tail.b2k_1 = tail.b2k_1 + bytesWritten | 0;
          var tmp = this_0;
          // Inline function 'kotlin.Long.plus' call
          var this_3 = this_0.x2j_1;
          tmp.x2j_1 = add(this_3, fromInt(bytesWritten));
          break $l$block_0;
        }
        // Inline function 'kotlin.check' call
        if (!(0 <= bytesWritten ? bytesWritten <= tail.c2l() : false)) {
          var message = 'Invalid number of bytes written: ' + bytesWritten + '. Should be in 0..' + tail.c2l();
          throw IllegalStateException_init_$Create$(toString(message));
        }
        if (!(bytesWritten === 0)) {
          tail.b2k_1 = tail.b2k_1 + bytesWritten | 0;
          var tmp_0 = this_0;
          // Inline function 'kotlin.Long.plus' call
          var this_4 = this_0.x2j_1;
          tmp_0.x2j_1 = add(this_4, fromInt(bytesWritten));
          break $l$block_0;
        }
        if (isEmpty(tail)) {
          this_0.q2l();
        }
      }
    } else if (c < 2048) {
      $l$block_2: {
        // Inline function 'kotlinx.io.unsafe.UnsafeBufferOperations.writeToTail' call
        var tail_0 = this_0.y2k(2);
        get_SegmentWriteContextImpl().n2m(tail_0, 0, toByte(c >> 6 | 192), toByte(c & 63 | 128));
        var bytesWritten_0 = 2;
        if (bytesWritten_0 === 2) {
          tail_0.b2k_1 = tail_0.b2k_1 + bytesWritten_0 | 0;
          var tmp_1 = this_0;
          // Inline function 'kotlin.Long.plus' call
          var this_5 = this_0.x2j_1;
          tmp_1.x2j_1 = add(this_5, fromInt(bytesWritten_0));
          break $l$block_2;
        }
        // Inline function 'kotlin.check' call
        if (!(0 <= bytesWritten_0 ? bytesWritten_0 <= tail_0.c2l() : false)) {
          var message_0 = 'Invalid number of bytes written: ' + bytesWritten_0 + '. Should be in 0..' + tail_0.c2l();
          throw IllegalStateException_init_$Create$(toString(message_0));
        }
        if (!(bytesWritten_0 === 0)) {
          tail_0.b2k_1 = tail_0.b2k_1 + bytesWritten_0 | 0;
          var tmp_2 = this_0;
          // Inline function 'kotlin.Long.plus' call
          var this_6 = this_0.x2j_1;
          tmp_2.x2j_1 = add(this_6, fromInt(bytesWritten_0));
          break $l$block_2;
        }
        if (isEmpty(tail_0)) {
          this_0.q2l();
        }
      }
      i = i + 1 | 0;
    } else if (c < 55296 || c > 57343) {
      $l$block_4: {
        // Inline function 'kotlinx.io.unsafe.UnsafeBufferOperations.writeToTail' call
        var tail_1 = this_0.y2k(3);
        get_SegmentWriteContextImpl().m2m(tail_1, 0, toByte(c >> 12 | 224), toByte(c >> 6 & 63 | 128), toByte(c & 63 | 128));
        var bytesWritten_1 = 3;
        if (bytesWritten_1 === 3) {
          tail_1.b2k_1 = tail_1.b2k_1 + bytesWritten_1 | 0;
          var tmp_3 = this_0;
          // Inline function 'kotlin.Long.plus' call
          var this_7 = this_0.x2j_1;
          tmp_3.x2j_1 = add(this_7, fromInt(bytesWritten_1));
          break $l$block_4;
        }
        // Inline function 'kotlin.check' call
        if (!(0 <= bytesWritten_1 ? bytesWritten_1 <= tail_1.c2l() : false)) {
          var message_1 = 'Invalid number of bytes written: ' + bytesWritten_1 + '. Should be in 0..' + tail_1.c2l();
          throw IllegalStateException_init_$Create$(toString(message_1));
        }
        if (!(bytesWritten_1 === 0)) {
          tail_1.b2k_1 = tail_1.b2k_1 + bytesWritten_1 | 0;
          var tmp_4 = this_0;
          // Inline function 'kotlin.Long.plus' call
          var this_8 = this_0.x2j_1;
          tmp_4.x2j_1 = add(this_8, fromInt(bytesWritten_1));
          break $l$block_4;
        }
        if (isEmpty(tail_1)) {
          this_0.q2l();
        }
      }
      i = i + 1 | 0;
    } else {
      var tmp_5;
      if ((i + 1 | 0) < endIndex) {
        var p0_1 = i + 1 | 0;
        // Inline function 'kotlin.code' call
        var this_9 = charCodeAt(string, p0_1);
        tmp_5 = Char__toInt_impl_vasixd(this_9);
      } else {
        tmp_5 = 0;
      }
      var low = tmp_5;
      if (c > 56319 || !(56320 <= low ? low <= 57343 : false)) {
        // Inline function 'kotlin.code' call
        var this_10 = _Char___init__impl__6a9atx(63);
        var tmp$ret$26 = Char__toInt_impl_vasixd(this_10);
        this_0.k2l(toByte(tmp$ret$26));
        i = i + 1 | 0;
      } else {
        var codePoint = 65536 + ((c & 1023) << 10 | low & 1023) | 0;
        $l$block_6: {
          // Inline function 'kotlinx.io.unsafe.UnsafeBufferOperations.writeToTail' call
          var tail_2 = this_0.y2k(4);
          get_SegmentWriteContextImpl().l2m(tail_2, 0, toByte(codePoint >> 18 | 240), toByte(codePoint >> 12 & 63 | 128), toByte(codePoint >> 6 & 63 | 128), toByte(codePoint & 63 | 128));
          var bytesWritten_2 = 4;
          if (bytesWritten_2 === 4) {
            tail_2.b2k_1 = tail_2.b2k_1 + bytesWritten_2 | 0;
            var tmp_6 = this_0;
            // Inline function 'kotlin.Long.plus' call
            var this_11 = this_0.x2j_1;
            tmp_6.x2j_1 = add(this_11, fromInt(bytesWritten_2));
            break $l$block_6;
          }
          // Inline function 'kotlin.check' call
          if (!(0 <= bytesWritten_2 ? bytesWritten_2 <= tail_2.c2l() : false)) {
            var message_2 = 'Invalid number of bytes written: ' + bytesWritten_2 + '. Should be in 0..' + tail_2.c2l();
            throw IllegalStateException_init_$Create$(toString(message_2));
          }
          if (!(bytesWritten_2 === 0)) {
            tail_2.b2k_1 = tail_2.b2k_1 + bytesWritten_2 | 0;
            var tmp_7 = this_0;
            // Inline function 'kotlin.Long.plus' call
            var this_12 = this_0.x2j_1;
            tmp_7.x2j_1 = add(this_12, fromInt(bytesWritten_2));
            break $l$block_6;
          }
          if (isEmpty(tail_2)) {
            this_0.q2l();
          }
        }
        i = i + 2 | 0;
      }
    }
  }
  _this__u8e3s4.k2k();
}
function commonReadUtf8(_this__u8e3s4, byteCount) {
  if (equalsLong(byteCount, new Long(0, 0)))
    return '';
  // Inline function 'kotlinx.io.unsafe.UnsafeBufferOperations.forEachSegment' call
  var curr = _this__u8e3s4.v2j_1;
  while (!(curr == null)) {
    get_SegmentReadContextImpl();
    if (compare(fromInt(curr.l1()), byteCount) >= 0) {
      var result = '';
      // Inline function 'kotlinx.io.unsafe.withData' call
      var tmp0 = curr.g2m(true);
      var tmp2 = curr.a2k_1;
      var tmp0_0 = curr.b2k_1;
      // Inline function 'kotlin.math.min' call
      var b = tmp2 + convertToInt(byteCount) | 0;
      var tmp$ret$0 = Math.min(tmp0_0, b);
      result = commonToUtf8String(tmp0, tmp2, tmp$ret$0);
      _this__u8e3s4.r1l(byteCount);
      return result;
    }
    return commonToUtf8String(readByteArray_0(_this__u8e3s4, convertToInt(byteCount)));
  }
  // Inline function 'kotlin.error' call
  var message = 'Unreacheable';
  throw IllegalStateException_init_$Create$(toString(message));
}
function commonToUtf8String(_this__u8e3s4, beginIndex, endIndex) {
  beginIndex = beginIndex === VOID ? 0 : beginIndex;
  endIndex = endIndex === VOID ? _this__u8e3s4.length : endIndex;
  if (beginIndex < 0 || endIndex > _this__u8e3s4.length || beginIndex > endIndex) {
    throw IndexOutOfBoundsException_init_$Create$('size=' + _this__u8e3s4.length + ' beginIndex=' + beginIndex + ' endIndex=' + endIndex);
  }
  var chars = charArray(endIndex - beginIndex | 0);
  var length = 0;
  // Inline function 'kotlinx.io.internal.processUtf16Chars' call
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
      // Inline function 'kotlinx.io.shr' call
      if (b0 >> 5 === -2) {
        var tmp = index;
        var tmp2 = index;
        var tmp$ret$5;
        $l$block_0: {
          // Inline function 'kotlinx.io.internal.process2Utf8Bytes' call
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
          // Inline function 'kotlinx.io.internal.isUtf8Continuation' call
          // Inline function 'kotlinx.io.and' call
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
        // Inline function 'kotlinx.io.shr' call
        if (b0 >> 4 === -2) {
          var tmp_0 = index;
          var tmp2_0 = index;
          var tmp$ret$19;
          $l$block_4: {
            // Inline function 'kotlinx.io.internal.process3Utf8Bytes' call
            if (endIndex <= (tmp2_0 + 2 | 0)) {
              var c_5 = numberToChar(65533);
              var _unary__edvuaz_6 = length;
              length = _unary__edvuaz_6 + 1 | 0;
              chars[_unary__edvuaz_6] = c_5;
              var tmp_1;
              if (endIndex <= (tmp2_0 + 1 | 0)) {
                tmp_1 = true;
              } else {
                // Inline function 'kotlinx.io.internal.isUtf8Continuation' call
                // Inline function 'kotlinx.io.and' call
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
            // Inline function 'kotlinx.io.internal.isUtf8Continuation' call
            // Inline function 'kotlinx.io.and' call
            if (!((b1_0 & 192) === 128)) {
              var c_6 = numberToChar(65533);
              var _unary__edvuaz_7 = length;
              length = _unary__edvuaz_7 + 1 | 0;
              chars[_unary__edvuaz_7] = c_6;
              tmp$ret$19 = 1;
              break $l$block_4;
            }
            var b2 = _this__u8e3s4[tmp2_0 + 2 | 0];
            // Inline function 'kotlinx.io.internal.isUtf8Continuation' call
            // Inline function 'kotlinx.io.and' call
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
          // Inline function 'kotlinx.io.shr' call
          if (b0 >> 3 === -2) {
            var tmp_2 = index;
            var tmp2_1 = index;
            var tmp$ret$41;
            $l$block_10: {
              // Inline function 'kotlinx.io.internal.process4Utf8Bytes' call
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
                  // Inline function 'kotlinx.io.internal.isUtf8Continuation' call
                  // Inline function 'kotlinx.io.and' call
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
                    // Inline function 'kotlinx.io.internal.isUtf8Continuation' call
                    // Inline function 'kotlinx.io.and' call
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
              // Inline function 'kotlinx.io.internal.isUtf8Continuation' call
              // Inline function 'kotlinx.io.and' call
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
              // Inline function 'kotlinx.io.internal.isUtf8Continuation' call
              // Inline function 'kotlinx.io.and' call
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
              // Inline function 'kotlinx.io.internal.isUtf8Continuation' call
              // Inline function 'kotlinx.io.and' call
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
function get_SegmentReadContextImpl() {
  _init_properties_UnsafeBufferOperations_kt__xw75gy();
  return SegmentReadContextImpl;
}
var SegmentReadContextImpl;
function get_SegmentWriteContextImpl() {
  _init_properties_UnsafeBufferOperations_kt__xw75gy();
  return SegmentWriteContextImpl;
}
var SegmentWriteContextImpl;
var BufferIterationContextImpl;
function UnsafeBufferOperations() {
}
var UnsafeBufferOperations_instance;
function UnsafeBufferOperations_getInstance() {
  return UnsafeBufferOperations_instance;
}
function SegmentReadContextImpl$1() {
}
protoOf(SegmentReadContextImpl$1).o2l = function (segment, offset) {
  return segment.q2k(offset);
};
function SegmentWriteContextImpl$1() {
}
protoOf(SegmentWriteContextImpl$1).o2m = function (segment, offset, value) {
  segment.h2m(offset, value);
};
protoOf(SegmentWriteContextImpl$1).n2m = function (segment, offset, b0, b1) {
  segment.i2m(offset, b0, b1);
};
protoOf(SegmentWriteContextImpl$1).m2m = function (segment, offset, b0, b1, b2) {
  segment.j2m(offset, b0, b1, b2);
};
protoOf(SegmentWriteContextImpl$1).l2m = function (segment, offset, b0, b1, b2, b3) {
  segment.k2m(offset, b0, b1, b2, b3);
};
function BufferIterationContextImpl$1() {
}
protoOf(BufferIterationContextImpl$1).o2l = function (segment, offset) {
  return get_SegmentReadContextImpl().o2l(segment, offset);
};
var properties_initialized_UnsafeBufferOperations_kt_2xfgoc;
function _init_properties_UnsafeBufferOperations_kt__xw75gy() {
  if (!properties_initialized_UnsafeBufferOperations_kt_2xfgoc) {
    properties_initialized_UnsafeBufferOperations_kt_2xfgoc = true;
    SegmentReadContextImpl = new SegmentReadContextImpl$1();
    SegmentWriteContextImpl = new SegmentWriteContextImpl$1();
    BufferIterationContextImpl = new BufferIterationContextImpl$1();
  }
}
function IOException_init_$Init$($this) {
  Exception_init_$Init$($this);
  IOException.call($this);
  return $this;
}
function IOException_init_$Create$() {
  var tmp = IOException_init_$Init$(objectCreate(protoOf(IOException)));
  captureStack(tmp, IOException_init_$Create$);
  return tmp;
}
function IOException_init_$Init$_0(message, $this) {
  Exception_init_$Init$_0(message, $this);
  IOException.call($this);
  return $this;
}
function IOException_init_$Create$_0(message) {
  var tmp = IOException_init_$Init$_0(message, objectCreate(protoOf(IOException)));
  captureStack(tmp, IOException_init_$Create$_0);
  return tmp;
}
function IOException_init_$Init$_1(message, cause, $this) {
  Exception_init_$Init$_1(message, cause, $this);
  IOException.call($this);
  return $this;
}
function IOException_init_$Create$_1(message, cause) {
  var tmp = IOException_init_$Init$_1(message, cause, objectCreate(protoOf(IOException)));
  captureStack(tmp, IOException_init_$Create$_1);
  return tmp;
}
function IOException() {
  captureStack(this, IOException);
}
function EOFException_init_$Init$($this) {
  IOException_init_$Init$($this);
  EOFException.call($this);
  return $this;
}
function EOFException_init_$Create$() {
  var tmp = EOFException_init_$Init$(objectCreate(protoOf(EOFException)));
  captureStack(tmp, EOFException_init_$Create$);
  return tmp;
}
function EOFException_init_$Init$_0(message, $this) {
  IOException_init_$Init$_0(message, $this);
  EOFException.call($this);
  return $this;
}
function EOFException_init_$Create$_0(message) {
  var tmp = EOFException_init_$Init$_0(message, objectCreate(protoOf(EOFException)));
  captureStack(tmp, EOFException_init_$Create$_0);
  return tmp;
}
function EOFException() {
  captureStack(this, EOFException);
}
function SegmentPool() {
  this.z2k_1 = 0;
  this.a2l_1 = 0;
}
protoOf(SegmentPool).g1l = function () {
  return Companion_instance.c2m();
};
protoOf(SegmentPool).p2l = function (segment) {
};
protoOf(SegmentPool).e2m = function () {
  return AlwaysSharedCopyTracker_getInstance();
};
var SegmentPool_instance;
function SegmentPool_getInstance() {
  return SegmentPool_instance;
}
//region block: post-declaration
protoOf(Buffer).e2l = write$default;
//endregion
//region block: init
Companion_instance = new Companion();
UnsafeBufferOperations_instance = new UnsafeBufferOperations();
SegmentPool_instance = new SegmentPool();
//endregion
//region block: exports
export {
  EOFException_init_$Create$_0 as EOFException_init_$Create$35zn64u2vfdrf,
  IOException_init_$Init$_0 as IOException_init_$Init$wyx5mfudk66d,
  IOException_init_$Create$_0 as IOException_init_$Create$3s3kcdlhouh9j,
  IOException_init_$Init$_1 as IOException_init_$Init$1najp4oty5euc,
  IOException_init_$Create$_1 as IOException_init_$Create$3dh7c73wuug74,
  Buffer as Buffergs925ekssbch,
  IOException as IOException1wyutdmfe71nu,
  Source as Source1shr0ps16u4p4,
  indexOf_1 as indexOf29nspdgx2e3ap,
  readByteArray_0 as readByteArray1fhzfwi2j014k,
  readByteArray as readByteArray1ri21h2rciakw,
  readByteString as readByteString2hnsbql6t4ads,
  readString_0 as readString2nvggcfaijfhd,
  readString as readString3v6duspiz33tv,
  writeString as writeString33ca4btrgctw7,
};
//endregion

//# sourceMappingURL=kotlinx-io-kotlinx-io-core.mjs.map
