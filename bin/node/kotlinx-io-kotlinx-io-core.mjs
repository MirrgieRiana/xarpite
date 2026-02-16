import {
  IndexOutOfBoundsException_init_$Create$2w5dv25cjssuw as IndexOutOfBoundsException_init_$Create$,
  Long2qws0ah9gnpki as Long,
  compare2uud5j30pw5xc as compare,
  IllegalArgumentException_init_$Create$3ewkh27kzt8z8 as IllegalArgumentException_init_$Create$,
  subtract16cg4lfi29fq9 as subtract,
  _Char___init__impl__6a9atx2js6krycynjoo as _Char___init__impl__6a9atx,
  charArrayOf27f4r3dozbrk1 as charArrayOf,
  protoOf180f3jzyo7rfj as protoOf,
  equalsLong28bsrfhwvd686 as equalsLong,
  toString1pkumu07cwy4m as toString,
  Unit_instance1fbcbse1fwigr as Unit_instance,
  toShort36kaw0zjdq3ex as toShort,
  add85si75olwt6n as add,
  ensureNotNull1e947j3ixpazm as ensureNotNull,
  fromInt1lka3ktyu79a4 as fromInt,
  convertToIntofdoxh9bstof as convertToInt,
  StringBuilder_init_$Create$2ujvu6cqvzuyn as StringBuilder_init_$Create$,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
  VOID3gxj6tk5isa35 as VOID,
  IllegalStateException_init_$Create$2w9444nebyjns as IllegalStateException_init_$Create$,
  objectCreate1ve4bgxiu4x98 as objectCreate,
  initMetadataForCompanion1wyw17z38v6ac as initMetadataForCompanion,
  arrayCopytctsywo3h7gj as arrayCopy,
  toByte4i43936u611k as toByte,
  IllegalArgumentException_init_$Create$3vjwoodhlckbo as IllegalArgumentException_init_$Create$_0,
  initMetadataForObject1cxne3s9w65el as initMetadataForObject,
  initMetadataForInterface1egvbzx539z91 as initMetadataForInterface,
  multiply18i3gv3wlmcjg as multiply,
  charCodeAt1yspne1d8erbm as charCodeAt,
  Char__toInt_impl_vasixd1agw9q2fuvclj as Char__toInt_impl_vasixd,
  charArray2ujmm1qusno00 as charArray,
  numberToChar93r9buh19yek as numberToChar,
  concatToString3cxf0c1gqonpo as concatToString,
  Exception_init_$Init$7nmtst2tre47 as Exception_init_$Init$,
  captureStack1fzi4aczwc4hg as captureStack,
  Exception_init_$Init$33ewqhqmjrfx6 as Exception_init_$Init$_0,
  Exception_init_$Init$393utbttlf2x4 as Exception_init_$Init$_1,
  Exceptiondt2hlxn7j7vw as Exception,
} from './kotlin-kotlin-stdlib.mjs';
//region block: imports
var imul = Math.imul;
//endregion
//region block: pre-declaration
initMetadataForInterface(Source, 'Source');
function write$default(source, startIndex, endIndex, $super) {
  startIndex = startIndex === VOID ? 0 : startIndex;
  endIndex = endIndex === VOID ? source.length : endIndex;
  var tmp;
  if ($super === VOID) {
    this.v2h(source, startIndex, endIndex);
    tmp = Unit_instance;
  } else {
    tmp = $super.v2h.call(this, source, startIndex, endIndex);
  }
  return tmp;
}
initMetadataForInterface(Sink, 'Sink');
initMetadataForClass(Buffer, 'Buffer', Buffer, VOID, [Source, Sink]);
initMetadataForClass(PeekSource, 'PeekSource');
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
  throw EOFException_init_$Create$_0("Buffer doesn't contain required number of bytes (size: " + $this.u().toString() + ', required: ' + byteCount.toString() + ')');
}
function Buffer() {
  this.p2g_1 = null;
  this.q2g_1 = null;
  this.r2g_1 = new Long(0, 0);
}
protoOf(Buffer).u = function () {
  return this.r2g_1;
};
protoOf(Buffer).s2g = function () {
  return this;
};
protoOf(Buffer).m1m = function () {
  return equalsLong(this.u(), new Long(0, 0));
};
protoOf(Buffer).q1p = function (byteCount) {
  // Inline function 'kotlin.require' call
  if (!(compare(byteCount, new Long(0, 0)) >= 0)) {
    var message = 'byteCount: ' + byteCount.toString();
    throw IllegalArgumentException_init_$Create$(toString(message));
  }
  if (compare(this.u(), byteCount) < 0) {
    throw EOFException_init_$Create$_0("Buffer doesn't contain required number of bytes (size: " + this.u().toString() + ', required: ' + byteCount.toString() + ')');
  }
};
protoOf(Buffer).r1p = function (byteCount) {
  // Inline function 'kotlin.require' call
  if (!(compare(byteCount, new Long(0, 0)) >= 0)) {
    var message = 'byteCount: ' + byteCount.toString() + ' < 0';
    throw IllegalArgumentException_init_$Create$(toString(message));
  }
  return compare(this.u(), byteCount) >= 0;
};
protoOf(Buffer).j1m = function () {
  var tmp0_elvis_lhs = this.p2g_1;
  var tmp;
  if (tmp0_elvis_lhs == null) {
    throwEof(this, new Long(1, 0));
  } else {
    tmp = tmp0_elvis_lhs;
  }
  var segment = tmp;
  var segmentSize = segment.a2h();
  if (segmentSize === 0) {
    this.b2h();
    return this.j1m();
  }
  var v = segment.c2h();
  this.r2g_1 = subtract(this.r2g_1, new Long(1, 0));
  if (segmentSize === 1) {
    this.b2h();
  }
  return v;
};
protoOf(Buffer).d2h = function () {
  var tmp0_elvis_lhs = this.p2g_1;
  var tmp;
  if (tmp0_elvis_lhs == null) {
    throwEof(this, new Long(2, 0));
  } else {
    tmp = tmp0_elvis_lhs;
  }
  var segment = tmp;
  var segmentSize = segment.a2h();
  if (segmentSize < 2) {
    this.q1p(new Long(2, 0));
    if (segmentSize === 0) {
      this.b2h();
      return this.d2h();
    }
    // Inline function 'kotlinx.io.and' call
    var tmp_0 = (this.j1m() & 255) << 8;
    // Inline function 'kotlinx.io.and' call
    var tmp$ret$1 = this.j1m() & 255;
    return toShort(tmp_0 | tmp$ret$1);
  }
  var v = segment.e2h();
  this.r2g_1 = subtract(this.r2g_1, new Long(2, 0));
  if (segmentSize === 2) {
    this.b2h();
  }
  return v;
};
protoOf(Buffer).f2h = function () {
  return Unit_instance;
};
protoOf(Buffer).g2h = function (out, startIndex, endIndex) {
  checkBounds(this.u(), startIndex, endIndex);
  if (equalsLong(startIndex, endIndex))
    return Unit_instance;
  var currentOffset = startIndex;
  var remainingByteCount = subtract(endIndex, startIndex);
  out.r2g_1 = add(out.r2g_1, remainingByteCount);
  var s = this.p2g_1;
  while (compare(currentOffset, fromInt(ensureNotNull(s).v2g_1 - s.u2g_1 | 0)) >= 0) {
    currentOffset = subtract(currentOffset, fromInt(s.v2g_1 - s.u2g_1 | 0));
    s = s.y2g_1;
  }
  while (compare(remainingByteCount, new Long(0, 0)) > 0) {
    var copy = ensureNotNull(s).h2h();
    copy.u2g_1 = copy.u2g_1 + convertToInt(currentOffset) | 0;
    var tmp = copy;
    var tmp0 = copy.u2g_1 + convertToInt(remainingByteCount) | 0;
    // Inline function 'kotlin.comparisons.minOf' call
    var b = copy.v2g_1;
    tmp.v2g_1 = Math.min(tmp0, b);
    // Inline function 'kotlinx.io.Buffer.pushSegment' call
    if (out.p2g_1 == null) {
      out.p2g_1 = copy;
      out.q2g_1 = copy;
    } else if (false) {
      out.q2g_1 = ensureNotNull(out.q2g_1).i2h(copy).j2h();
      if (ensureNotNull(out.q2g_1).z2g_1 == null) {
        out.p2g_1 = out.q2g_1;
      }
    } else {
      out.q2g_1 = ensureNotNull(out.q2g_1).i2h(copy);
    }
    remainingByteCount = subtract(remainingByteCount, fromInt(copy.v2g_1 - copy.u2g_1 | 0));
    currentOffset = new Long(0, 0);
    s = s.y2g_1;
  }
};
protoOf(Buffer).k2h = function () {
  var result = this.u();
  if (equalsLong(result, new Long(0, 0)))
    return new Long(0, 0);
  var tail = ensureNotNull(this.q2g_1);
  if (tail.v2g_1 < 8192 && tail.x2g_1) {
    result = subtract(result, fromInt(tail.v2g_1 - tail.u2g_1 | 0));
  }
  return result;
};
protoOf(Buffer).i2 = function () {
  return this.u1l(this.u());
};
protoOf(Buffer).u1l = function (byteCount) {
  // Inline function 'kotlinx.io.checkByteCount' call
  // Inline function 'kotlin.require' call
  if (!(compare(byteCount, new Long(0, 0)) >= 0)) {
    var message = 'byteCount (' + byteCount.toString() + ') < 0';
    throw IllegalArgumentException_init_$Create$(toString(message));
  }
  var remainingByteCount = byteCount;
  while (compare(remainingByteCount, new Long(0, 0)) > 0) {
    var tmp0_elvis_lhs = this.p2g_1;
    var tmp;
    if (tmp0_elvis_lhs == null) {
      throw EOFException_init_$Create$_0('Buffer exhausted before skipping ' + byteCount.toString() + ' bytes.');
    } else {
      tmp = tmp0_elvis_lhs;
    }
    var head = tmp;
    var tmp0 = remainingByteCount;
    // Inline function 'kotlinx.io.minOf' call
    var b = head.v2g_1 - head.u2g_1 | 0;
    // Inline function 'kotlin.comparisons.minOf' call
    var b_0 = fromInt(b);
    var tmp$ret$4 = compare(tmp0, b_0) <= 0 ? tmp0 : b_0;
    var toSkip = convertToInt(tmp$ret$4);
    this.r2g_1 = subtract(this.r2g_1, fromInt(toSkip));
    remainingByteCount = subtract(remainingByteCount, fromInt(toSkip));
    head.u2g_1 = head.u2g_1 + toSkip | 0;
    if (head.u2g_1 === head.v2g_1) {
      this.b2h();
    }
  }
};
protoOf(Buffer).l2h = function (sink, startIndex, endIndex) {
  // Inline function 'kotlinx.io.checkBounds' call
  var size = sink.length;
  checkBounds(fromInt(size), fromInt(startIndex), fromInt(endIndex));
  var tmp0_elvis_lhs = this.p2g_1;
  var tmp;
  if (tmp0_elvis_lhs == null) {
    return -1;
  } else {
    tmp = tmp0_elvis_lhs;
  }
  var s = tmp;
  var tmp0 = endIndex - startIndex | 0;
  // Inline function 'kotlin.comparisons.minOf' call
  var b = s.a2h();
  var toCopy = Math.min(tmp0, b);
  s.m2h(sink, startIndex, startIndex + toCopy | 0);
  this.r2g_1 = subtract(this.r2g_1, fromInt(toCopy));
  if (isEmpty(s)) {
    this.b2h();
  }
  return toCopy;
};
protoOf(Buffer).n2h = function (sink, byteCount) {
  // Inline function 'kotlinx.io.checkByteCount' call
  // Inline function 'kotlin.require' call
  if (!(compare(byteCount, new Long(0, 0)) >= 0)) {
    var message = 'byteCount (' + byteCount.toString() + ') < 0';
    throw IllegalArgumentException_init_$Create$(toString(message));
  }
  if (equalsLong(this.u(), new Long(0, 0)))
    return new Long(-1, -1);
  var bytesWritten = compare(byteCount, this.u()) > 0 ? this.u() : byteCount;
  sink.o2h(this, bytesWritten);
  return bytesWritten;
};
protoOf(Buffer).p2h = function (sink, byteCount) {
  // Inline function 'kotlinx.io.checkByteCount' call
  // Inline function 'kotlin.require' call
  if (!(compare(byteCount, new Long(0, 0)) >= 0)) {
    var message = 'byteCount (' + byteCount.toString() + ') < 0';
    throw IllegalArgumentException_init_$Create$(toString(message));
  }
  if (compare(this.u(), byteCount) < 0) {
    sink.o2h(this, this.u());
    throw EOFException_init_$Create$_0('Buffer exhausted before writing ' + byteCount.toString() + ' bytes. Only ' + this.u().toString() + ' bytes were written.');
  }
  sink.o2h(this, byteCount);
};
protoOf(Buffer).q2h = function (sink) {
  var byteCount = this.u();
  if (compare(byteCount, new Long(0, 0)) > 0) {
    sink.o2h(this, byteCount);
  }
  return byteCount;
};
protoOf(Buffer).r2h = function () {
  return buffered(new PeekSource(this));
};
protoOf(Buffer).s2h = function (minimumCapacity) {
  // Inline function 'kotlin.require' call
  if (!(minimumCapacity >= 1 && minimumCapacity <= 8192)) {
    var message = 'unexpected capacity';
    throw IllegalArgumentException_init_$Create$(toString(message));
  }
  if (this.q2g_1 == null) {
    var result = SegmentPool_instance.j1l();
    this.p2g_1 = result;
    this.q2g_1 = result;
    return result;
  }
  var t = ensureNotNull(this.q2g_1);
  if ((t.v2g_1 + minimumCapacity | 0) > 8192 || !t.x2g_1) {
    var newTail = t.i2h(SegmentPool_instance.j1l());
    this.q2g_1 = newTail;
    return newTail;
  }
  return t;
};
protoOf(Buffer).v2h = function (source, startIndex, endIndex) {
  // Inline function 'kotlinx.io.checkBounds' call
  var size = source.length;
  checkBounds(fromInt(size), fromInt(startIndex), fromInt(endIndex));
  var currentOffset = startIndex;
  while (currentOffset < endIndex) {
    var tail = this.s2h(1);
    var tmp0 = endIndex - currentOffset | 0;
    // Inline function 'kotlin.comparisons.minOf' call
    var b = tail.w2h();
    var toCopy = Math.min(tmp0, b);
    tail.x2h(source, currentOffset, currentOffset + toCopy | 0);
    currentOffset = currentOffset + toCopy | 0;
  }
  var tmp = this;
  var tmp0_0 = this.r2g_1;
  // Inline function 'kotlin.Long.plus' call
  var other = endIndex - startIndex | 0;
  tmp.r2g_1 = add(tmp0_0, fromInt(other));
};
protoOf(Buffer).o2h = function (source, byteCount) {
  // Inline function 'kotlin.require' call
  if (!!(source === this)) {
    var message = 'source == this';
    throw IllegalArgumentException_init_$Create$(toString(message));
  }
  checkOffsetAndCount(source.r2g_1, new Long(0, 0), byteCount);
  var remainingByteCount = byteCount;
  while (compare(remainingByteCount, new Long(0, 0)) > 0) {
    if (compare(remainingByteCount, fromInt(ensureNotNull(source.p2g_1).a2h())) < 0) {
      var tail = this.q2g_1;
      var tmp;
      if (!(tail == null) && tail.x2g_1) {
        var tmp0 = remainingByteCount;
        // Inline function 'kotlin.Long.plus' call
        var other = tail.v2g_1;
        var tmp0_0 = add(tmp0, fromInt(other));
        // Inline function 'kotlin.Long.minus' call
        var other_0 = tail.z2h() ? 0 : tail.u2g_1;
        var tmp$ret$3 = subtract(tmp0_0, fromInt(other_0));
        tmp = compare(tmp$ret$3, new Long(8192, 0)) <= 0;
      } else {
        tmp = false;
      }
      if (tmp) {
        ensureNotNull(source.p2g_1).b2i(tail, convertToInt(remainingByteCount));
        source.r2g_1 = subtract(source.r2g_1, remainingByteCount);
        this.r2g_1 = add(this.r2g_1, remainingByteCount);
        return Unit_instance;
      } else {
        source.p2g_1 = ensureNotNull(source.p2g_1).a2i(convertToInt(remainingByteCount));
      }
    }
    var segmentToMove = ensureNotNull(source.p2g_1);
    var movedByteCount = fromInt(segmentToMove.a2h());
    source.p2g_1 = segmentToMove.c2i();
    if (source.p2g_1 == null) {
      source.q2g_1 = null;
    }
    // Inline function 'kotlinx.io.Buffer.pushSegment' call
    if (this.p2g_1 == null) {
      this.p2g_1 = segmentToMove;
      this.q2g_1 = segmentToMove;
    } else if (true) {
      this.q2g_1 = ensureNotNull(this.q2g_1).i2h(segmentToMove).j2h();
      if (ensureNotNull(this.q2g_1).z2g_1 == null) {
        this.p2g_1 = this.q2g_1;
      }
    } else {
      this.q2g_1 = ensureNotNull(this.q2g_1).i2h(segmentToMove);
    }
    source.r2g_1 = subtract(source.r2g_1, movedByteCount);
    this.r2g_1 = add(this.r2g_1, movedByteCount);
    remainingByteCount = subtract(remainingByteCount, movedByteCount);
  }
};
protoOf(Buffer).d2i = function (source) {
  var totalBytesRead = new Long(0, 0);
  $l$loop: while (true) {
    var readCount = source.n2h(this, new Long(8192, 0));
    if (equalsLong(readCount, new Long(-1, -1)))
      break $l$loop;
    totalBytesRead = add(totalBytesRead, readCount);
  }
  return totalBytesRead;
};
protoOf(Buffer).e2i = function (byte) {
  this.s2h(1).f2i(byte);
  this.r2g_1 = add(this.r2g_1, new Long(1, 0));
};
protoOf(Buffer).g2i = function (short) {
  this.s2h(2).h2i(short);
  this.r2g_1 = add(this.r2g_1, new Long(2, 0));
};
protoOf(Buffer).c1n = function () {
  return Unit_instance;
};
protoOf(Buffer).toString = function () {
  if (equalsLong(this.u(), new Long(0, 0)))
    return 'Buffer(size=0)';
  var maxPrintableBytes = 64;
  // Inline function 'kotlinx.io.minOf' call
  var b = this.u();
  // Inline function 'kotlin.comparisons.minOf' call
  var a = fromInt(maxPrintableBytes);
  var tmp$ret$1 = compare(a, b) <= 0 ? a : b;
  var len = convertToInt(tmp$ret$1);
  var builder = StringBuilder_init_$Create$(imul(len, 2) + (compare(this.u(), fromInt(maxPrintableBytes)) > 0 ? 1 : 0) | 0);
  var bytesWritten = 0;
  // Inline function 'kotlinx.io.unsafe.UnsafeBufferOperations.forEachSegment' call
  var curr = this.p2g_1;
  while (!(curr == null)) {
    var tmp0 = get_SegmentReadContextImpl();
    var segment = curr;
    var idx = 0;
    while (bytesWritten < len && idx < segment.a2h()) {
      var _unary__edvuaz = idx;
      idx = _unary__edvuaz + 1 | 0;
      var b_0 = tmp0.i2i(segment, _unary__edvuaz);
      bytesWritten = bytesWritten + 1 | 0;
      var tmp = get_HEX_DIGIT_CHARS();
      // Inline function 'kotlinx.io.shr' call
      var tmp$ret$2 = b_0 >> 4;
      var tmp_0 = builder.t7(tmp[tmp$ret$2 & 15]);
      var tmp_1 = get_HEX_DIGIT_CHARS();
      // Inline function 'kotlinx.io.and' call
      var tmp$ret$3 = b_0 & 15;
      tmp_0.t7(tmp_1[tmp$ret$3]);
    }
    curr = curr.y2g_1;
  }
  if (compare(this.u(), fromInt(maxPrintableBytes)) > 0) {
    builder.t7(_Char___init__impl__6a9atx(8230));
  }
  return 'Buffer(size=' + this.u().toString() + ' hex=' + builder.toString() + ')';
};
protoOf(Buffer).b2h = function () {
  var oldHead = ensureNotNull(this.p2g_1);
  var nextHead = oldHead.y2g_1;
  this.p2g_1 = nextHead;
  if (nextHead == null) {
    this.q2g_1 = null;
  } else {
    nextHead.z2g_1 = null;
  }
  oldHead.y2g_1 = null;
  SegmentPool_instance.j2i(oldHead);
};
protoOf(Buffer).k2i = function () {
  var oldTail = ensureNotNull(this.q2g_1);
  var newTail = oldTail.z2g_1;
  this.q2g_1 = newTail;
  if (newTail == null) {
    this.p2g_1 = null;
  } else {
    newTail.y2g_1 = null;
  }
  oldTail.z2g_1 = null;
  SegmentPool_instance.j2i(oldTail);
};
function buffered(_this__u8e3s4) {
  return new RealSource(_this__u8e3s4);
}
function PeekSource(upstream) {
  this.l2i_1 = upstream;
  this.m2i_1 = this.l2i_1.s2g();
  this.n2i_1 = this.m2i_1.p2g_1;
  var tmp = this;
  var tmp0_safe_receiver = this.m2i_1.p2g_1;
  var tmp0_elvis_lhs = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.u2g_1;
  tmp.o2i_1 = tmp0_elvis_lhs == null ? -1 : tmp0_elvis_lhs;
  this.p2i_1 = false;
  this.q2i_1 = new Long(0, 0);
}
protoOf(PeekSource).n2h = function (sink, byteCount) {
  // Inline function 'kotlin.check' call
  if (!!this.p2i_1) {
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
  if (!(this.n2i_1 == null || (this.n2i_1 === this.m2i_1.p2g_1 && this.o2i_1 === ensureNotNull(this.m2i_1.p2g_1).u2g_1))) {
    var message_1 = 'Peek source is invalid because upstream source was used';
    throw IllegalStateException_init_$Create$(toString(message_1));
  }
  if (equalsLong(byteCount, new Long(0, 0)))
    return new Long(0, 0);
  // Inline function 'kotlin.Long.plus' call
  var this_0 = this.q2i_1;
  var tmp$ret$7 = add(this_0, fromInt(1));
  if (!this.l2i_1.r1p(tmp$ret$7))
    return new Long(-1, -1);
  if (this.n2i_1 == null && !(this.m2i_1.p2g_1 == null)) {
    this.n2i_1 = this.m2i_1.p2g_1;
    this.o2i_1 = ensureNotNull(this.m2i_1.p2g_1).u2g_1;
  }
  // Inline function 'kotlin.comparisons.minOf' call
  var b = subtract(this.m2i_1.u(), this.q2i_1);
  var toCopy = compare(byteCount, b) <= 0 ? byteCount : b;
  this.m2i_1.g2h(sink, this.q2i_1, add(this.q2i_1, toCopy));
  this.q2i_1 = add(this.q2i_1, toCopy);
  return toCopy;
};
protoOf(PeekSource).c1n = function () {
  this.p2i_1 = true;
};
function RealSource(source) {
  this.r2i_1 = source;
  this.s2i_1 = false;
  this.t2i_1 = new Buffer();
}
protoOf(RealSource).s2g = function () {
  return this.t2i_1;
};
protoOf(RealSource).n2h = function (sink, byteCount) {
  // Inline function 'kotlinx.io.RealSource.checkNotClosed' call
  // Inline function 'kotlin.check' call
  if (!!this.s2i_1) {
    var message = 'Source is closed.';
    throw IllegalStateException_init_$Create$(toString(message));
  }
  // Inline function 'kotlin.require' call
  if (!(compare(byteCount, new Long(0, 0)) >= 0)) {
    var message_0 = 'byteCount: ' + byteCount.toString();
    throw IllegalArgumentException_init_$Create$(toString(message_0));
  }
  if (equalsLong(this.t2i_1.u(), new Long(0, 0))) {
    var read = this.r2i_1.n2h(this.t2i_1, new Long(8192, 0));
    if (equalsLong(read, new Long(-1, -1)))
      return new Long(-1, -1);
  }
  // Inline function 'kotlin.comparisons.minOf' call
  var b = this.t2i_1.u();
  var toRead = compare(byteCount, b) <= 0 ? byteCount : b;
  return this.t2i_1.n2h(sink, toRead);
};
protoOf(RealSource).m1m = function () {
  // Inline function 'kotlinx.io.RealSource.checkNotClosed' call
  // Inline function 'kotlin.check' call
  if (!!this.s2i_1) {
    var message = 'Source is closed.';
    throw IllegalStateException_init_$Create$(toString(message));
  }
  return this.t2i_1.m1m() && equalsLong(this.r2i_1.n2h(this.t2i_1, new Long(8192, 0)), new Long(-1, -1));
};
protoOf(RealSource).q1p = function (byteCount) {
  if (!this.r1p(byteCount))
    throw EOFException_init_$Create$_0("Source doesn't contain required number of bytes (" + byteCount.toString() + ').');
};
protoOf(RealSource).r1p = function (byteCount) {
  // Inline function 'kotlinx.io.RealSource.checkNotClosed' call
  // Inline function 'kotlin.check' call
  if (!!this.s2i_1) {
    var message = 'Source is closed.';
    throw IllegalStateException_init_$Create$(toString(message));
  }
  // Inline function 'kotlin.require' call
  if (!(compare(byteCount, new Long(0, 0)) >= 0)) {
    var message_0 = 'byteCount: ' + byteCount.toString();
    throw IllegalArgumentException_init_$Create$(toString(message_0));
  }
  while (compare(this.t2i_1.u(), byteCount) < 0) {
    if (equalsLong(this.r2i_1.n2h(this.t2i_1, new Long(8192, 0)), new Long(-1, -1)))
      return false;
  }
  return true;
};
protoOf(RealSource).l2h = function (sink, startIndex, endIndex) {
  // Inline function 'kotlinx.io.checkBounds' call
  var size = sink.length;
  checkBounds(fromInt(size), fromInt(startIndex), fromInt(endIndex));
  if (equalsLong(this.t2i_1.u(), new Long(0, 0))) {
    var read = this.r2i_1.n2h(this.t2i_1, new Long(8192, 0));
    if (equalsLong(read, new Long(-1, -1)))
      return -1;
  }
  var tmp0 = endIndex - startIndex | 0;
  // Inline function 'kotlinx.io.minOf' call
  var b = this.t2i_1.u();
  // Inline function 'kotlin.comparisons.minOf' call
  var a = fromInt(tmp0);
  var tmp$ret$2 = compare(a, b) <= 0 ? a : b;
  var toRead = convertToInt(tmp$ret$2);
  return this.t2i_1.l2h(sink, startIndex, startIndex + toRead | 0);
};
protoOf(RealSource).p2h = function (sink, byteCount) {
  try {
    this.q1p(byteCount);
  } catch ($p) {
    if ($p instanceof EOFException) {
      var e = $p;
      sink.o2h(this.t2i_1, this.t2i_1.u());
      throw e;
    } else {
      throw $p;
    }
  }
  this.t2i_1.p2h(sink, byteCount);
};
protoOf(RealSource).q2h = function (sink) {
  var totalBytesWritten = new Long(0, 0);
  while (!equalsLong(this.r2i_1.n2h(this.t2i_1, new Long(8192, 0)), new Long(-1, -1))) {
    var emitByteCount = this.t2i_1.k2h();
    if (compare(emitByteCount, new Long(0, 0)) > 0) {
      totalBytesWritten = add(totalBytesWritten, emitByteCount);
      sink.o2h(this.t2i_1, emitByteCount);
    }
  }
  if (compare(this.t2i_1.u(), new Long(0, 0)) > 0) {
    totalBytesWritten = add(totalBytesWritten, this.t2i_1.u());
    sink.o2h(this.t2i_1, this.t2i_1.u());
  }
  return totalBytesWritten;
};
protoOf(RealSource).d2h = function () {
  this.q1p(new Long(2, 0));
  return this.t2i_1.d2h();
};
protoOf(RealSource).r2h = function () {
  // Inline function 'kotlinx.io.RealSource.checkNotClosed' call
  // Inline function 'kotlin.check' call
  if (!!this.s2i_1) {
    var message = 'Source is closed.';
    throw IllegalStateException_init_$Create$(toString(message));
  }
  return buffered(new PeekSource(this));
};
protoOf(RealSource).c1n = function () {
  if (this.s2i_1)
    return Unit_instance;
  this.s2i_1 = true;
  this.r2i_1.c1n();
  this.t2i_1.i2();
};
protoOf(RealSource).toString = function () {
  return 'buffered(' + toString(this.r2i_1) + ')';
};
function Segment_init_$Init$($this) {
  Segment.call($this);
  $this.t2g_1 = new Int8Array(8192);
  $this.x2g_1 = true;
  $this.w2g_1 = null;
  return $this;
}
function Segment_init_$Create$() {
  return Segment_init_$Init$(objectCreate(protoOf(Segment)));
}
function Segment_init_$Init$_0(data, pos, limit, shareToken, owner, $this) {
  Segment.call($this);
  $this.t2g_1 = data;
  $this.u2g_1 = pos;
  $this.v2g_1 = limit;
  $this.w2g_1 = shareToken;
  $this.x2g_1 = owner;
  return $this;
}
function Segment_init_$Create$_0(data, pos, limit, shareToken, owner) {
  return Segment_init_$Init$_0(data, pos, limit, shareToken, owner, objectCreate(protoOf(Segment)));
}
function Companion() {
  this.u2i_1 = 8192;
  this.v2i_1 = 1024;
}
protoOf(Companion).w2i = function () {
  return Segment_init_$Create$();
};
var Companion_instance;
function Companion_getInstance() {
  return Companion_instance;
}
protoOf(Segment).z2h = function () {
  var tmp1_safe_receiver = this.w2g_1;
  var tmp0_elvis_lhs = tmp1_safe_receiver == null ? null : tmp1_safe_receiver.x2i();
  return tmp0_elvis_lhs == null ? false : tmp0_elvis_lhs;
};
protoOf(Segment).h2h = function () {
  var tmp0_elvis_lhs = this.w2g_1;
  var tmp;
  if (tmp0_elvis_lhs == null) {
    // Inline function 'kotlin.also' call
    var this_0 = SegmentPool_instance.y2i();
    this.w2g_1 = this_0;
    tmp = this_0;
  } else {
    tmp = tmp0_elvis_lhs;
  }
  var t = tmp;
  var tmp_0 = this.u2g_1;
  var tmp_1 = this.v2g_1;
  // Inline function 'kotlin.also' call
  t.z2i();
  return Segment_init_$Create$_0(this.t2g_1, tmp_0, tmp_1, t, false);
};
protoOf(Segment).c2i = function () {
  var result = this.y2g_1;
  if (!(this.z2g_1 == null)) {
    ensureNotNull(this.z2g_1).y2g_1 = this.y2g_1;
  }
  if (!(this.y2g_1 == null)) {
    ensureNotNull(this.y2g_1).z2g_1 = this.z2g_1;
  }
  this.y2g_1 = null;
  this.z2g_1 = null;
  return result;
};
protoOf(Segment).i2h = function (segment) {
  segment.z2g_1 = this;
  segment.y2g_1 = this.y2g_1;
  if (!(this.y2g_1 == null)) {
    ensureNotNull(this.y2g_1).z2g_1 = segment;
  }
  this.y2g_1 = segment;
  return segment;
};
protoOf(Segment).a2i = function (byteCount) {
  // Inline function 'kotlin.require' call
  if (!(byteCount > 0 && byteCount <= (this.v2g_1 - this.u2g_1 | 0))) {
    var message = 'byteCount out of range';
    throw IllegalArgumentException_init_$Create$(toString(message));
  }
  var prefix;
  if (byteCount >= 1024) {
    prefix = this.h2h();
  } else {
    prefix = SegmentPool_instance.j1l();
    var tmp0 = this.t2g_1;
    var tmp2 = prefix.t2g_1;
    var tmp4 = this.u2g_1;
    // Inline function 'kotlin.collections.copyInto' call
    var endIndex = this.u2g_1 + byteCount | 0;
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    var tmp = tmp0;
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    arrayCopy(tmp, tmp2, 0, tmp4, endIndex);
  }
  prefix.v2g_1 = prefix.u2g_1 + byteCount | 0;
  this.u2g_1 = this.u2g_1 + byteCount | 0;
  if (!(this.z2g_1 == null)) {
    ensureNotNull(this.z2g_1).i2h(prefix);
  } else {
    prefix.y2g_1 = this;
    this.z2g_1 = prefix;
  }
  return prefix;
};
protoOf(Segment).j2h = function () {
  // Inline function 'kotlin.check' call
  if (!!(this.z2g_1 == null)) {
    var message = 'cannot compact';
    throw IllegalStateException_init_$Create$(toString(message));
  }
  if (!ensureNotNull(this.z2g_1).x2g_1)
    return this;
  var byteCount = this.v2g_1 - this.u2g_1 | 0;
  var availableByteCount = (8192 - ensureNotNull(this.z2g_1).v2g_1 | 0) + (ensureNotNull(this.z2g_1).z2h() ? 0 : ensureNotNull(this.z2g_1).u2g_1) | 0;
  if (byteCount > availableByteCount)
    return this;
  var predecessor = this.z2g_1;
  this.b2i(ensureNotNull(predecessor), byteCount);
  var successor = this.c2i();
  // Inline function 'kotlin.check' call
  if (!(successor == null)) {
    throw IllegalStateException_init_$Create$('Check failed.');
  }
  SegmentPool_instance.j2i(this);
  return predecessor;
};
protoOf(Segment).f2i = function (byte) {
  var _unary__edvuaz = this.v2g_1;
  this.v2g_1 = _unary__edvuaz + 1 | 0;
  this.t2g_1[_unary__edvuaz] = byte;
};
protoOf(Segment).h2i = function (short) {
  var data = this.t2g_1;
  var limit = this.v2g_1;
  var _unary__edvuaz = limit;
  limit = _unary__edvuaz + 1 | 0;
  data[_unary__edvuaz] = toByte((short >>> 8 | 0) & 255);
  var _unary__edvuaz_0 = limit;
  limit = _unary__edvuaz_0 + 1 | 0;
  data[_unary__edvuaz_0] = toByte(short & 255);
  this.v2g_1 = limit;
};
protoOf(Segment).c2h = function () {
  var _unary__edvuaz = this.u2g_1;
  this.u2g_1 = _unary__edvuaz + 1 | 0;
  return this.t2g_1[_unary__edvuaz];
};
protoOf(Segment).e2h = function () {
  var data = this.t2g_1;
  var pos = this.u2g_1;
  var _unary__edvuaz = pos;
  pos = _unary__edvuaz + 1 | 0;
  // Inline function 'kotlinx.io.and' call
  var tmp = (data[_unary__edvuaz] & 255) << 8;
  var _unary__edvuaz_0 = pos;
  pos = _unary__edvuaz_0 + 1 | 0;
  // Inline function 'kotlinx.io.and' call
  var tmp$ret$1 = data[_unary__edvuaz_0] & 255;
  var s = toShort(tmp | tmp$ret$1);
  this.u2g_1 = pos;
  return s;
};
protoOf(Segment).b2i = function (sink, byteCount) {
  // Inline function 'kotlin.check' call
  if (!sink.x2g_1) {
    var message = 'only owner can write';
    throw IllegalStateException_init_$Create$(toString(message));
  }
  if ((sink.v2g_1 + byteCount | 0) > 8192) {
    if (sink.z2h())
      throw IllegalArgumentException_init_$Create$_0();
    if (((sink.v2g_1 + byteCount | 0) - sink.u2g_1 | 0) > 8192)
      throw IllegalArgumentException_init_$Create$_0();
    var tmp0 = sink.t2g_1;
    var tmp2 = sink.t2g_1;
    var tmp4 = sink.u2g_1;
    // Inline function 'kotlin.collections.copyInto' call
    var endIndex = sink.v2g_1;
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    var tmp = tmp0;
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    arrayCopy(tmp, tmp2, 0, tmp4, endIndex);
    sink.v2g_1 = sink.v2g_1 - sink.u2g_1 | 0;
    sink.u2g_1 = 0;
  }
  var tmp0_0 = this.t2g_1;
  var tmp2_0 = sink.t2g_1;
  var tmp4_0 = sink.v2g_1;
  var tmp6 = this.u2g_1;
  // Inline function 'kotlin.collections.copyInto' call
  var endIndex_0 = this.u2g_1 + byteCount | 0;
  // Inline function 'kotlin.js.unsafeCast' call
  // Inline function 'kotlin.js.asDynamic' call
  var tmp_0 = tmp0_0;
  // Inline function 'kotlin.js.unsafeCast' call
  // Inline function 'kotlin.js.asDynamic' call
  arrayCopy(tmp_0, tmp2_0, tmp4_0, tmp6, endIndex_0);
  sink.v2g_1 = sink.v2g_1 + byteCount | 0;
  this.u2g_1 = this.u2g_1 + byteCount | 0;
};
protoOf(Segment).m2h = function (dst, dstStartOffset, dstEndOffset) {
  var len = dstEndOffset - dstStartOffset | 0;
  var tmp0 = this.t2g_1;
  var tmp6 = this.u2g_1;
  // Inline function 'kotlin.collections.copyInto' call
  var endIndex = this.u2g_1 + len | 0;
  // Inline function 'kotlin.js.unsafeCast' call
  // Inline function 'kotlin.js.asDynamic' call
  var tmp = tmp0;
  // Inline function 'kotlin.js.unsafeCast' call
  // Inline function 'kotlin.js.asDynamic' call
  arrayCopy(tmp, dst, dstStartOffset, tmp6, endIndex);
  this.u2g_1 = this.u2g_1 + len | 0;
};
protoOf(Segment).x2h = function (src, srcStartOffset, srcEndOffset) {
  var tmp2 = this.t2g_1;
  // Inline function 'kotlin.collections.copyInto' call
  var destinationOffset = this.v2g_1;
  // Inline function 'kotlin.js.unsafeCast' call
  // Inline function 'kotlin.js.asDynamic' call
  var tmp = src;
  // Inline function 'kotlin.js.unsafeCast' call
  // Inline function 'kotlin.js.asDynamic' call
  arrayCopy(tmp, tmp2, destinationOffset, srcStartOffset, srcEndOffset);
  this.v2g_1 = this.v2g_1 + (srcEndOffset - srcStartOffset | 0) | 0;
};
protoOf(Segment).a2h = function () {
  return this.v2g_1 - this.u2g_1 | 0;
};
protoOf(Segment).w2h = function () {
  return this.t2g_1.length - this.v2g_1 | 0;
};
protoOf(Segment).a2j = function (readOnly) {
  return this.t2g_1;
};
protoOf(Segment).b2j = function (index) {
  return this.t2g_1[this.u2g_1 + index | 0];
};
protoOf(Segment).c2j = function (index, value) {
  this.t2g_1[this.v2g_1 + index | 0] = value;
};
protoOf(Segment).d2j = function (index, b0, b1) {
  var d = this.t2g_1;
  var l = this.v2g_1;
  d[l + index | 0] = b0;
  d[(l + index | 0) + 1 | 0] = b1;
};
protoOf(Segment).e2j = function (index, b0, b1, b2) {
  var d = this.t2g_1;
  var l = this.v2g_1;
  d[l + index | 0] = b0;
  d[(l + index | 0) + 1 | 0] = b1;
  d[(l + index | 0) + 2 | 0] = b2;
};
protoOf(Segment).f2j = function (index, b0, b1, b2, b3) {
  var d = this.t2g_1;
  var l = this.v2g_1;
  d[l + index | 0] = b0;
  d[(l + index | 0) + 1 | 0] = b1;
  d[(l + index | 0) + 2 | 0] = b2;
  d[(l + index | 0) + 3 | 0] = b3;
};
function Segment() {
  this.u2g_1 = 0;
  this.v2g_1 = 0;
  this.w2g_1 = null;
  this.x2g_1 = false;
  this.y2g_1 = null;
  this.z2g_1 = null;
}
function isEmpty(_this__u8e3s4) {
  return _this__u8e3s4.a2h() === 0;
}
function SegmentCopyTracker() {
}
function AlwaysSharedCopyTracker() {
  AlwaysSharedCopyTracker_instance = this;
  SegmentCopyTracker.call(this);
}
protoOf(AlwaysSharedCopyTracker).x2i = function () {
  return true;
};
protoOf(AlwaysSharedCopyTracker).z2i = function () {
  return Unit_instance;
};
var AlwaysSharedCopyTracker_instance;
function AlwaysSharedCopyTracker_getInstance() {
  if (AlwaysSharedCopyTracker_instance == null)
    new AlwaysSharedCopyTracker();
  return AlwaysSharedCopyTracker_instance;
}
function Sink() {
}
function Source() {
}
function readByteArray(_this__u8e3s4) {
  return readByteArrayImpl(_this__u8e3s4, -1);
}
function readTo(_this__u8e3s4, sink, startIndex, endIndex) {
  startIndex = startIndex === VOID ? 0 : startIndex;
  endIndex = endIndex === VOID ? sink.length : endIndex;
  // Inline function 'kotlinx.io.checkBounds' call
  var size = sink.length;
  checkBounds(fromInt(size), fromInt(startIndex), fromInt(endIndex));
  var offset = startIndex;
  while (offset < endIndex) {
    var bytesRead = _this__u8e3s4.l2h(sink, offset, endIndex);
    if (bytesRead === -1) {
      throw EOFException_init_$Create$_0('Source exhausted before reading ' + (endIndex - startIndex | 0) + ' bytes. ' + ('Only ' + bytesRead + ' bytes were read.'));
    }
    offset = offset + bytesRead | 0;
  }
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
function readByteArrayImpl(_this__u8e3s4, size) {
  var arraySize = size;
  if (size === -1) {
    var fetchSize = new Long(2147483647, 0);
    while (compare(_this__u8e3s4.s2g().u(), new Long(2147483647, 0)) < 0 && _this__u8e3s4.r1p(fetchSize)) {
      // Inline function 'kotlin.Long.times' call
      var this_0 = fetchSize;
      fetchSize = multiply(this_0, fromInt(2));
    }
    // Inline function 'kotlin.check' call
    if (!(compare(_this__u8e3s4.s2g().u(), new Long(2147483647, 0)) < 0)) {
      var message = "Can't create an array of size " + _this__u8e3s4.s2g().u().toString();
      throw IllegalStateException_init_$Create$(toString(message));
    }
    arraySize = convertToInt(_this__u8e3s4.s2g().u());
  } else {
    _this__u8e3s4.q1p(fromInt(size));
  }
  var array = new Int8Array(arraySize);
  readTo(_this__u8e3s4.s2g(), array);
  return array;
}
function readString(_this__u8e3s4) {
  _this__u8e3s4.r1p(new Long(-1, 2147483647));
  return commonReadUtf8(_this__u8e3s4.s2g(), _this__u8e3s4.s2g().u());
}
function readString_0(_this__u8e3s4, byteCount) {
  _this__u8e3s4.q1p(byteCount);
  return commonReadUtf8(_this__u8e3s4.s2g(), byteCount);
}
function writeString(_this__u8e3s4, string, startIndex, endIndex) {
  startIndex = startIndex === VOID ? 0 : startIndex;
  endIndex = endIndex === VOID ? string.length : endIndex;
  // Inline function 'kotlinx.io.checkBounds' call
  var size = string.length;
  checkBounds(fromInt(size), fromInt(startIndex), fromInt(endIndex));
  // Inline function 'kotlinx.io.writeToInternalBuffer' call
  // Inline function 'kotlinx.io.commonWriteUtf8' call
  var this_0 = _this__u8e3s4.s2g();
  var i = startIndex;
  while (i < endIndex) {
    var p0 = i;
    // Inline function 'kotlin.code' call
    var this_1 = charCodeAt(string, p0);
    var c = Char__toInt_impl_vasixd(this_1);
    if (c < 128) {
      $l$block_0: {
        // Inline function 'kotlinx.io.unsafe.UnsafeBufferOperations.writeToTail' call
        var tail = this_0.s2h(1);
        var ctx = get_SegmentWriteContextImpl();
        var segmentOffset = -i | 0;
        // Inline function 'kotlin.comparisons.minOf' call
        var b = i + tail.w2h() | 0;
        var runLimit = Math.min(endIndex, b);
        var _unary__edvuaz = i;
        i = _unary__edvuaz + 1 | 0;
        ctx.j2j(tail, segmentOffset + _unary__edvuaz | 0, toByte(c));
        $l$loop: while (i < runLimit) {
          var p0_0 = i;
          // Inline function 'kotlin.code' call
          var this_2 = charCodeAt(string, p0_0);
          c = Char__toInt_impl_vasixd(this_2);
          if (c >= 128)
            break $l$loop;
          var _unary__edvuaz_0 = i;
          i = _unary__edvuaz_0 + 1 | 0;
          ctx.j2j(tail, segmentOffset + _unary__edvuaz_0 | 0, toByte(c));
        }
        var bytesWritten = i + segmentOffset | 0;
        if (bytesWritten === 1) {
          tail.v2g_1 = tail.v2g_1 + bytesWritten | 0;
          var tmp = this_0;
          // Inline function 'kotlin.Long.plus' call
          var this_3 = this_0.r2g_1;
          tmp.r2g_1 = add(this_3, fromInt(bytesWritten));
          break $l$block_0;
        }
        // Inline function 'kotlin.check' call
        if (!(0 <= bytesWritten ? bytesWritten <= tail.w2h() : false)) {
          var message = 'Invalid number of bytes written: ' + bytesWritten + '. Should be in 0..' + tail.w2h();
          throw IllegalStateException_init_$Create$(toString(message));
        }
        if (!(bytesWritten === 0)) {
          tail.v2g_1 = tail.v2g_1 + bytesWritten | 0;
          var tmp_0 = this_0;
          // Inline function 'kotlin.Long.plus' call
          var this_4 = this_0.r2g_1;
          tmp_0.r2g_1 = add(this_4, fromInt(bytesWritten));
          break $l$block_0;
        }
        if (isEmpty(tail)) {
          this_0.k2i();
        }
      }
    } else if (c < 2048) {
      $l$block_2: {
        // Inline function 'kotlinx.io.unsafe.UnsafeBufferOperations.writeToTail' call
        var tail_0 = this_0.s2h(2);
        get_SegmentWriteContextImpl().i2j(tail_0, 0, toByte(c >> 6 | 192), toByte(c & 63 | 128));
        var bytesWritten_0 = 2;
        if (bytesWritten_0 === 2) {
          tail_0.v2g_1 = tail_0.v2g_1 + bytesWritten_0 | 0;
          var tmp_1 = this_0;
          // Inline function 'kotlin.Long.plus' call
          var this_5 = this_0.r2g_1;
          tmp_1.r2g_1 = add(this_5, fromInt(bytesWritten_0));
          break $l$block_2;
        }
        // Inline function 'kotlin.check' call
        if (!(0 <= bytesWritten_0 ? bytesWritten_0 <= tail_0.w2h() : false)) {
          var message_0 = 'Invalid number of bytes written: ' + bytesWritten_0 + '. Should be in 0..' + tail_0.w2h();
          throw IllegalStateException_init_$Create$(toString(message_0));
        }
        if (!(bytesWritten_0 === 0)) {
          tail_0.v2g_1 = tail_0.v2g_1 + bytesWritten_0 | 0;
          var tmp_2 = this_0;
          // Inline function 'kotlin.Long.plus' call
          var this_6 = this_0.r2g_1;
          tmp_2.r2g_1 = add(this_6, fromInt(bytesWritten_0));
          break $l$block_2;
        }
        if (isEmpty(tail_0)) {
          this_0.k2i();
        }
      }
      i = i + 1 | 0;
    } else if (c < 55296 || c > 57343) {
      $l$block_4: {
        // Inline function 'kotlinx.io.unsafe.UnsafeBufferOperations.writeToTail' call
        var tail_1 = this_0.s2h(3);
        get_SegmentWriteContextImpl().h2j(tail_1, 0, toByte(c >> 12 | 224), toByte(c >> 6 & 63 | 128), toByte(c & 63 | 128));
        var bytesWritten_1 = 3;
        if (bytesWritten_1 === 3) {
          tail_1.v2g_1 = tail_1.v2g_1 + bytesWritten_1 | 0;
          var tmp_3 = this_0;
          // Inline function 'kotlin.Long.plus' call
          var this_7 = this_0.r2g_1;
          tmp_3.r2g_1 = add(this_7, fromInt(bytesWritten_1));
          break $l$block_4;
        }
        // Inline function 'kotlin.check' call
        if (!(0 <= bytesWritten_1 ? bytesWritten_1 <= tail_1.w2h() : false)) {
          var message_1 = 'Invalid number of bytes written: ' + bytesWritten_1 + '. Should be in 0..' + tail_1.w2h();
          throw IllegalStateException_init_$Create$(toString(message_1));
        }
        if (!(bytesWritten_1 === 0)) {
          tail_1.v2g_1 = tail_1.v2g_1 + bytesWritten_1 | 0;
          var tmp_4 = this_0;
          // Inline function 'kotlin.Long.plus' call
          var this_8 = this_0.r2g_1;
          tmp_4.r2g_1 = add(this_8, fromInt(bytesWritten_1));
          break $l$block_4;
        }
        if (isEmpty(tail_1)) {
          this_0.k2i();
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
        this_0.e2i(toByte(tmp$ret$26));
        i = i + 1 | 0;
      } else {
        var codePoint = 65536 + ((c & 1023) << 10 | low & 1023) | 0;
        $l$block_6: {
          // Inline function 'kotlinx.io.unsafe.UnsafeBufferOperations.writeToTail' call
          var tail_2 = this_0.s2h(4);
          get_SegmentWriteContextImpl().g2j(tail_2, 0, toByte(codePoint >> 18 | 240), toByte(codePoint >> 12 & 63 | 128), toByte(codePoint >> 6 & 63 | 128), toByte(codePoint & 63 | 128));
          var bytesWritten_2 = 4;
          if (bytesWritten_2 === 4) {
            tail_2.v2g_1 = tail_2.v2g_1 + bytesWritten_2 | 0;
            var tmp_6 = this_0;
            // Inline function 'kotlin.Long.plus' call
            var this_11 = this_0.r2g_1;
            tmp_6.r2g_1 = add(this_11, fromInt(bytesWritten_2));
            break $l$block_6;
          }
          // Inline function 'kotlin.check' call
          if (!(0 <= bytesWritten_2 ? bytesWritten_2 <= tail_2.w2h() : false)) {
            var message_2 = 'Invalid number of bytes written: ' + bytesWritten_2 + '. Should be in 0..' + tail_2.w2h();
            throw IllegalStateException_init_$Create$(toString(message_2));
          }
          if (!(bytesWritten_2 === 0)) {
            tail_2.v2g_1 = tail_2.v2g_1 + bytesWritten_2 | 0;
            var tmp_7 = this_0;
            // Inline function 'kotlin.Long.plus' call
            var this_12 = this_0.r2g_1;
            tmp_7.r2g_1 = add(this_12, fromInt(bytesWritten_2));
            break $l$block_6;
          }
          if (isEmpty(tail_2)) {
            this_0.k2i();
          }
        }
        i = i + 2 | 0;
      }
    }
  }
  _this__u8e3s4.f2h();
}
function commonReadUtf8(_this__u8e3s4, byteCount) {
  if (equalsLong(byteCount, new Long(0, 0)))
    return '';
  // Inline function 'kotlinx.io.unsafe.UnsafeBufferOperations.forEachSegment' call
  var curr = _this__u8e3s4.p2g_1;
  while (!(curr == null)) {
    get_SegmentReadContextImpl();
    if (compare(fromInt(curr.a2h()), byteCount) >= 0) {
      var result = '';
      // Inline function 'kotlinx.io.unsafe.withData' call
      var tmp0 = curr.a2j(true);
      var tmp2 = curr.u2g_1;
      var tmp0_0 = curr.v2g_1;
      // Inline function 'kotlin.math.min' call
      var b = tmp2 + convertToInt(byteCount) | 0;
      var tmp$ret$0 = Math.min(tmp0_0, b);
      result = commonToUtf8String(tmp0, tmp2, tmp$ret$0);
      _this__u8e3s4.u1l(byteCount);
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
protoOf(SegmentReadContextImpl$1).i2i = function (segment, offset) {
  return segment.b2j(offset);
};
function SegmentWriteContextImpl$1() {
}
protoOf(SegmentWriteContextImpl$1).j2j = function (segment, offset, value) {
  segment.c2j(offset, value);
};
protoOf(SegmentWriteContextImpl$1).i2j = function (segment, offset, b0, b1) {
  segment.d2j(offset, b0, b1);
};
protoOf(SegmentWriteContextImpl$1).h2j = function (segment, offset, b0, b1, b2) {
  segment.e2j(offset, b0, b1, b2);
};
protoOf(SegmentWriteContextImpl$1).g2j = function (segment, offset, b0, b1, b2, b3) {
  segment.f2j(offset, b0, b1, b2, b3);
};
function BufferIterationContextImpl$1() {
}
protoOf(BufferIterationContextImpl$1).i2i = function (segment, offset) {
  return get_SegmentReadContextImpl().i2i(segment, offset);
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
  this.t2h_1 = 0;
  this.u2h_1 = 0;
}
protoOf(SegmentPool).j1l = function () {
  return Companion_instance.w2i();
};
protoOf(SegmentPool).j2i = function (segment) {
};
protoOf(SegmentPool).y2i = function () {
  return AlwaysSharedCopyTracker_getInstance();
};
var SegmentPool_instance;
function SegmentPool_getInstance() {
  return SegmentPool_instance;
}
//region block: post-declaration
protoOf(Buffer).y2h = write$default;
//endregion
//region block: init
Companion_instance = new Companion();
UnsafeBufferOperations_instance = new UnsafeBufferOperations();
SegmentPool_instance = new SegmentPool();
//endregion
//region block: exports
export {
  EOFException_init_$Create$_0 as EOFException_init_$Create$2ki37nn86l2yt,
  IOException_init_$Init$_0 as IOException_init_$Init$3tijvyh8jladu,
  IOException_init_$Create$_0 as IOException_init_$Create$1wkk79fgwuoz2,
  IOException_init_$Create$_1 as IOException_init_$Create$2jyze3554lamk,
  Buffer as Buffergs925ekssbch,
  IOException as IOException1wyutdmfe71nu,
  Source as Source1shr0ps16u4p4,
  readByteArray_0 as readByteArray1fhzfwi2j014k,
  readByteArray as readByteArray1ri21h2rciakw,
  readString as readString2nvggcfaijfhd,
  readString_0 as readString3v6duspiz33tv,
  writeString as writeString33ca4btrgctw7,
};
//endregion

//# sourceMappingURL=kotlinx-io-kotlinx-io-core.mjs.map
