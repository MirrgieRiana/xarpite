import {
  Companion_instance2oawqq9qiaris as Companion_instance,
  Unit_instance1fbcbse1fwigr as Unit_instance,
  _Result___init__impl__xyqfz83hut4nr3dfvi3 as _Result___init__impl__xyqfz8,
  protoOf180f3jzyo7rfj as protoOf,
  initMetadataForCompanion1wyw17z38v6ac as initMetadataForCompanion,
  THROW_CCE2g6jy02ryeudk as THROW_CCE,
  initMetadataForObject1cxne3s9w65el as initMetadataForObject,
  toString30pk9tzaqopn as toString,
  hashCodeq5arwsb9dgti as hashCode,
  equals2au1ep9vhcato as equals,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
  createFailure8paxfkfa5dc7 as createFailure,
  Result3t1vadv16kmzk as Result,
  initMetadataForInterface1egvbzx539z91 as initMetadataForInterface,
  toString1h6jjoch8cjt8 as toString_0,
  newThrowablezl37abp36p5f as newThrowable,
  stackTraceToString2670q6lbhdojj as stackTraceToString,
  VOID3gxj6tk5isa35 as VOID,
  isInterface3d6p8outrmvmk as isInterface,
  CoroutineImpl2sn3kjnwmfr10 as CoroutineImpl,
  fromInt1lka3ktyu79a4 as fromInt,
  compare2uud5j30pw5xc as compare,
  numberToLong345n6tb1n1i71 as numberToLong,
  add85si75olwt6n as add,
  intercepted2ogpsikxxj4u0 as intercepted,
  noWhenBranchMatchedException2a6r7ubxgky5j as noWhenBranchMatchedException,
  returnIfSuspendedqak8u4r448cu as returnIfSuspended,
  get_COROUTINE_SUSPENDED3ujt3p13qm4iy as get_COROUTINE_SUSPENDED,
  Long2qws0ah9gnpki as Long,
  initMetadataForCoroutine1i7lbatuf5bnt as initMetadataForCoroutine,
  convertToIntofdoxh9bstof as convertToInt,
  IllegalStateExceptionkoljg5n0nrlr as IllegalStateException,
  IllegalStateException_init_$Init$3ccqbeatlpw5c as IllegalStateException_init_$Init$,
  captureStack1fzi4aczwc4hg as captureStack,
  subtract16cg4lfi29fq9 as subtract,
  EmptyCoroutineContext_getInstance31fow51ayy30t as EmptyCoroutineContext_getInstance,
  Continuation1aa2oekvx7jm7 as Continuation,
  initMetadataForFunctionReferencen3g5fpj34t8u as initMetadataForFunctionReference,
  initMetadataForLambda3af3he42mmnh as initMetadataForLambda,
  CancellationException_init_$Create$1muhzgve35v78 as CancellationException_init_$Create$,
  CancellationException3b36o9qz53rgr as CancellationException,
  StringBuilder_init_$Create$2ujvu6cqvzuyn as StringBuilder_init_$Create$,
  charSequenceLength3278n89t01tmv as charSequenceLength,
  IllegalStateException_init_$Create$2w9444nebyjns as IllegalStateException_init_$Create$,
  encodeToByteArray22651fhg4p67t as encodeToByteArray,
  toString1pkumu07cwy4m as toString_1,
  _Char___init__impl__6a9atx2js6krycynjoo as _Char___init__impl__6a9atx,
  replaceqbix900hl8kl as replace,
  IllegalArgumentException_init_$Create$3ewkh27kzt8z8 as IllegalArgumentException_init_$Create$,
  getStringHashCode26igk1bx568vk as getStringHashCode,
  charSequenceSubSequence1iwpdba8s3jc7 as charSequenceSubSequence,
  isCharSequence1ju9jr1w86plq as isCharSequence,
  trim11nh7r46at6sx as trim,
  toByte4i43936u611k as toByte,
  decodeToString1x4faah2liw2p as decodeToString,
  setOf45ia9pnfhe90 as setOf,
  charSequenceGet1vxk1y5n17t1z as charSequenceGet,
  Char__toInt_impl_vasixd1agw9q2fuvclj as Char__toInt_impl_vasixd,
} from './kotlin-kotlin-stdlib.mjs';
import {
  CancellableContinuationImpl1cx201opicavg as CancellableContinuationImpl,
  CoroutineScopefcb5f5dwqcas as CoroutineScope,
  launch1c91vkjzdi9sd as launch,
  startCoroutineCancellable18shtfwdieib as startCoroutineCancellable,
  get_job2zvlvce9o9a29 as get_job,
  Job13y4jkazwjho0 as Job,
  cancel1xim2hrvjmwpn as cancel,
  CopyableThrowable1mvc99jcyvivf as CopyableThrowable,
} from './kotlinx-coroutines-core.mjs';
import {
  Buffergs925ekssbch as Buffer,
  IOException_init_$Create$1wkk79fgwuoz2 as IOException_init_$Create$,
  EOFException_init_$Create$2ki37nn86l2yt as EOFException_init_$Create$,
  IOException1wyutdmfe71nu as IOException,
  IOException_init_$Create$2jyze3554lamk as IOException_init_$Create$_0,
  readString2nvggcfaijfhd as readString,
  readByteArray1fhzfwi2j014k as readByteArray,
  readString3v6duspiz33tv as readString_0,
  writeString33ca4btrgctw7 as writeString,
  IOException_init_$Init$3tijvyh8jladu as IOException_init_$Init$,
  readByteArray1ri21h2rciakw as readByteArray_0,
} from './kotlinx-io-kotlinx-io-core.mjs';
import { atomic$ref$130aurmcwdfdf1 as atomic$ref$1 } from './kotlinx-atomicfu.mjs';
//region block: imports
//endregion
//region block: pre-declaration
initMetadataForCompanion(Companion);
initMetadataForObject(Empty, 'Empty');
initMetadataForClass(Closed, 'Closed');
function resume() {
  return this.o2j().w8(Companion_getInstance().l2j_1);
}
function resume_0(throwable) {
  var tmp = this.o2j();
  var tmp_0;
  if (throwable == null) {
    tmp_0 = null;
  } else {
    // Inline function 'kotlin.let' call
    // Inline function 'kotlin.Companion.failure' call
    var tmp$ret$2 = _Result___init__impl__xyqfz8(createFailure(throwable));
    tmp_0 = new Result(tmp$ret$2);
  }
  var tmp1_elvis_lhs = tmp_0;
  return tmp.w8(tmp1_elvis_lhs == null ? Companion_getInstance().l2j_1 : tmp1_elvis_lhs.en_1);
}
initMetadataForInterface(Task, 'Task');
initMetadataForClass(Read, 'Read', VOID, VOID, [Task]);
initMetadataForClass(Write, 'Write', VOID, VOID, [Task]);
initMetadataForCoroutine($awaitContentCOROUTINE$, CoroutineImpl);
initMetadataForCoroutine($flushCOROUTINE$, CoroutineImpl);
initMetadataForCoroutine($flushAndCloseCOROUTINE$, CoroutineImpl);
function awaitContent$default(min, $completion, $super) {
  min = min === VOID ? 1 : min;
  return $super === VOID ? this.s2l(min, $completion) : $super.s2l.call(this, min, $completion);
}
initMetadataForInterface(ByteReadChannel_1, 'ByteReadChannel', VOID, VOID, VOID, [1]);
initMetadataForClass(ByteChannel, 'ByteChannel', ByteChannel, VOID, [ByteReadChannel_1], [1, 0]);
initMetadataForClass(ConcurrentIOException, 'ConcurrentIOException', VOID, IllegalStateException);
initMetadataForClass(ByteReadChannel$Companion$Empty$1, VOID, VOID, VOID, [ByteReadChannel_1], [1]);
initMetadataForCompanion(Companion_0);
initMetadataForCoroutine($readRemainingCOROUTINE$, CoroutineImpl);
initMetadataForCoroutine($readPacketCOROUTINE$, CoroutineImpl);
initMetadataForCoroutine($readAvailableCOROUTINE$, CoroutineImpl);
initMetadataForCoroutine($toByteArrayCOROUTINE$, CoroutineImpl);
initMetadataForCoroutine($copyToCOROUTINE$, CoroutineImpl);
initMetadataForCoroutine($readBufferCOROUTINE$, CoroutineImpl);
initMetadataForCoroutine($flushIfNeededCOROUTINE$, CoroutineImpl);
initMetadataForClass(WriterJob, 'WriterJob');
initMetadataForClass(WriterScope, 'WriterScope', VOID, VOID, [CoroutineScope]);
initMetadataForClass(NO_CALLBACK$1, VOID, VOID, VOID, [Continuation]);
initMetadataForFunctionReference(ByteWriteChannel$flushAndClose$ref, VOID, VOID, [0]);
initMetadataForLambda(writer$slambda, CoroutineImpl, VOID, [1]);
initMetadataForClass(CloseToken, 'CloseToken');
initMetadataForClass(SourceByteReadChannel, 'SourceByteReadChannel', VOID, VOID, [ByteReadChannel_1], [1]);
initMetadataForClass(DefaultPool, 'DefaultPool');
initMetadataForClass(ByteArrayPool$1, VOID, VOID, DefaultPool);
initMetadataForCompanion(Companion_1);
initMetadataForClass(Charset, 'Charset');
initMetadataForObject(Charsets, 'Charsets');
initMetadataForClass(MalformedInputException, 'MalformedInputException', VOID, IOException);
initMetadataForClass(CharsetDecoder, 'CharsetDecoder');
initMetadataForClass(CharsetEncoder, 'CharsetEncoder');
initMetadataForClass(CharsetImpl, 'CharsetImpl', VOID, Charset);
initMetadataForClass(CharsetEncoderImpl, 'CharsetEncoderImpl', VOID, CharsetEncoder);
initMetadataForClass(CharsetDecoderImpl, 'CharsetDecoderImpl', VOID, CharsetDecoder);
initMetadataForClass(toKtor$1);
initMetadataForClass(TextDecoderFallback, 'TextDecoderFallback');
initMetadataForInterface(Closeable, 'Closeable');
//endregion
function Companion() {
  Companion_instance_0 = this;
  this.k2j_1 = new Closed(null);
  var tmp = this;
  // Inline function 'kotlin.Companion.success' call
  tmp.l2j_1 = _Result___init__impl__xyqfz8(Unit_instance);
}
var Companion_instance_0;
function Companion_getInstance() {
  if (Companion_instance_0 == null)
    new Companion();
  return Companion_instance_0;
}
function Empty() {
}
protoOf(Empty).toString = function () {
  return 'Empty';
};
protoOf(Empty).hashCode = function () {
  return -231472095;
};
protoOf(Empty).equals = function (other) {
  if (this === other)
    return true;
  if (!(other instanceof Empty))
    return false;
  other instanceof Empty || THROW_CCE();
  return true;
};
var Empty_instance;
function Empty_getInstance() {
  return Empty_instance;
}
function Closed(cause) {
  this.m2j_1 = cause;
}
protoOf(Closed).toString = function () {
  return 'Closed(cause=' + toString(this.m2j_1) + ')';
};
protoOf(Closed).hashCode = function () {
  return this.m2j_1 == null ? 0 : hashCode(this.m2j_1);
};
protoOf(Closed).equals = function (other) {
  if (this === other)
    return true;
  if (!(other instanceof Closed))
    return false;
  var tmp0_other_with_cast = other instanceof Closed ? other : THROW_CCE();
  if (!equals(this.m2j_1, tmp0_other_with_cast.m2j_1))
    return false;
  return true;
};
function Task() {
}
function Read(continuation) {
  this.s2j_1 = continuation;
  this.t2j_1 = null;
  if (get_DEVELOPMENT_MODE()) {
    var tmp = this;
    // Inline function 'kotlin.also' call
    var this_0 = newThrowable('ReadTask 0x' + toString_0(hashCode(this.s2j_1), 16));
    stackTraceToString(this_0);
    tmp.t2j_1 = this_0;
  }
}
protoOf(Read).o2j = function () {
  return this.s2j_1;
};
protoOf(Read).n2j = function () {
  return this.t2j_1;
};
protoOf(Read).p2j = function () {
  return 'read';
};
function Write(continuation) {
  this.u2j_1 = continuation;
  this.v2j_1 = null;
  if (get_DEVELOPMENT_MODE()) {
    var tmp = this;
    // Inline function 'kotlin.also' call
    var this_0 = newThrowable('WriteTask 0x' + toString_0(hashCode(this.u2j_1), 16));
    stackTraceToString(this_0);
    tmp.v2j_1 = this_0;
  }
}
protoOf(Write).o2j = function () {
  return this.u2j_1;
};
protoOf(Write).n2j = function () {
  return this.v2j_1;
};
protoOf(Write).p2j = function () {
  return 'write';
};
function moveFlushToReadBuffer($this) {
  // Inline function 'io.ktor.utils.io.locks.synchronized' call
  $this.z2j_1;
  $this.x2j_1.q2h($this.b2k_1);
  $this.y2j_1 = 0;
  // Inline function 'io.ktor.utils.io.ByteChannel.resumeSlot' call
  var current = $this.a2k_1.kotlinx$atomicfu$value;
  var tmp;
  if (current instanceof Write) {
    tmp = $this.a2k_1.atomicfu$compareAndSet(current, Empty_instance);
  } else {
    tmp = false;
  }
  if (tmp) {
    current.q2j();
  }
}
function closeSlot($this, cause) {
  var closeContinuation = !(cause == null) ? new Closed(cause) : Companion_getInstance().k2j_1;
  var continuation = $this.a2k_1.atomicfu$getAndSet(closeContinuation);
  if (!isInterface(continuation, Task))
    return Unit_instance;
  continuation.r2j(cause);
}
function $awaitContentCOROUTINE$(_this__u8e3s4, min, resultContinuation) {
  CoroutineImpl.call(this, resultContinuation);
  this.m2k_1 = _this__u8e3s4;
  this.n2k_1 = min;
}
protoOf($awaitContentCOROUTINE$).t8 = function () {
  var suspendResult = this.n8_1;
  $sm: do
    try {
      var tmp = this.l8_1;
      switch (tmp) {
        case 0:
          this.m8_1 = 4;
          rethrowCloseCauseIfNeeded(this.m2k_1);
          if (compare(this.m2k_1.b2k_1.u(), fromInt(this.n2k_1)) >= 0)
            return true;
          this.o2k_1 = this.m2k_1;
          this.l8_1 = 1;
          continue $sm;
        case 1:
          if (!(compare(add(numberToLong(this.m2k_1.y2j_1), this.m2k_1.b2k_1.u()), fromInt(this.n2k_1)) < 0 && this.m2k_1.d2k_1.kotlinx$atomicfu$value == null)) {
            this.l8_1 = 3;
            continue $sm;
          }

          this.l8_1 = 2;
          var cancellable = new CancellableContinuationImpl(intercepted(this), 1);
          cancellable.h1v();
          var tmp0 = this.o2k_1;
          var tmp2 = new Read(cancellable);
          l$ret$1: do {
            var previous = tmp0.a2k_1.kotlinx$atomicfu$value;
            if (!(previous instanceof Closed)) {
              if (!tmp0.a2k_1.atomicfu$compareAndSet(previous, tmp2)) {
                tmp2.q2j();
                break l$ret$1;
              }
            }
            if (previous instanceof Read) {
              previous.r2j(new ConcurrentIOException(tmp2.p2j(), previous.n2j()));
            } else {
              if (isInterface(previous, Task)) {
                previous.q2j();
              } else {
                if (previous instanceof Closed) {
                  tmp2.r2j(previous.m2j_1);
                  break l$ret$1;
                } else {
                  if (!equals(previous, Empty_instance)) {
                    noWhenBranchMatchedException();
                  }
                }
              }
            }
            if (!(compare(add(numberToLong(this.m2k_1.y2j_1), this.m2k_1.b2k_1.u()), fromInt(this.n2k_1)) < 0 && this.m2k_1.d2k_1.kotlinx$atomicfu$value == null)) {
              var current = tmp0.a2k_1.kotlinx$atomicfu$value;
              var tmp_0;
              if (current instanceof Read) {
                tmp_0 = tmp0.a2k_1.atomicfu$compareAndSet(current, Empty_instance);
              } else {
                tmp_0 = false;
              }
              if (tmp_0) {
                current.q2j();
              }
            }
          }
           while (false);
          suspendResult = returnIfSuspended(cancellable.l1t(), this);
          if (suspendResult === get_COROUTINE_SUSPENDED()) {
            return suspendResult;
          }

          continue $sm;
        case 2:
          this.l8_1 = 1;
          continue $sm;
        case 3:
          if (compare(this.m2k_1.b2k_1.u(), new Long(1048576, 0)) < 0) {
            moveFlushToReadBuffer(this.m2k_1);
          }

          return compare(this.m2k_1.b2k_1.u(), fromInt(this.n2k_1)) >= 0;
        case 4:
          throw this.o8_1;
      }
    } catch ($p) {
      var e = $p;
      if (this.m8_1 === 4) {
        throw e;
      } else {
        this.l8_1 = this.m8_1;
        this.o8_1 = e;
      }
    }
   while (true);
};
function $flushCOROUTINE$(_this__u8e3s4, resultContinuation) {
  CoroutineImpl.call(this, resultContinuation);
  this.x2k_1 = _this__u8e3s4;
}
protoOf($flushCOROUTINE$).t8 = function () {
  var suspendResult = this.n8_1;
  $sm: do
    try {
      var tmp = this.l8_1;
      switch (tmp) {
        case 0:
          this.m8_1 = 4;
          rethrowCloseCauseIfNeeded(this.x2k_1);
          this.x2k_1.z2k();
          if (this.x2k_1.y2j_1 < 1048576)
            return Unit_instance;
          this.y2k_1 = this.x2k_1;
          this.l8_1 = 1;
          continue $sm;
        case 1:
          if (!(this.x2k_1.y2j_1 >= 1048576 && this.x2k_1.d2k_1.kotlinx$atomicfu$value == null)) {
            this.l8_1 = 3;
            continue $sm;
          }

          this.l8_1 = 2;
          var cancellable = new CancellableContinuationImpl(intercepted(this), 1);
          cancellable.h1v();
          var tmp0 = this.y2k_1;
          var tmp2 = new Write(cancellable);
          l$ret$1: do {
            var previous = tmp0.a2k_1.kotlinx$atomicfu$value;
            if (!(previous instanceof Closed)) {
              if (!tmp0.a2k_1.atomicfu$compareAndSet(previous, tmp2)) {
                tmp2.q2j();
                break l$ret$1;
              }
            }
            if (previous instanceof Write) {
              previous.r2j(new ConcurrentIOException(tmp2.p2j(), previous.n2j()));
            } else {
              if (isInterface(previous, Task)) {
                previous.q2j();
              } else {
                if (previous instanceof Closed) {
                  tmp2.r2j(previous.m2j_1);
                  break l$ret$1;
                } else {
                  if (!equals(previous, Empty_instance)) {
                    noWhenBranchMatchedException();
                  }
                }
              }
            }
            if (!(this.x2k_1.y2j_1 >= 1048576 && this.x2k_1.d2k_1.kotlinx$atomicfu$value == null)) {
              var current = tmp0.a2k_1.kotlinx$atomicfu$value;
              var tmp_0;
              if (current instanceof Write) {
                tmp_0 = tmp0.a2k_1.atomicfu$compareAndSet(current, Empty_instance);
              } else {
                tmp_0 = false;
              }
              if (tmp_0) {
                current.q2j();
              }
            }
          }
           while (false);
          suspendResult = returnIfSuspended(cancellable.l1t(), this);
          if (suspendResult === get_COROUTINE_SUSPENDED()) {
            return suspendResult;
          }

          continue $sm;
        case 2:
          this.l8_1 = 1;
          continue $sm;
        case 3:
          return Unit_instance;
        case 4:
          throw this.o8_1;
      }
    } catch ($p) {
      var e = $p;
      if (this.m8_1 === 4) {
        throw e;
      } else {
        this.l8_1 = this.m8_1;
        this.o8_1 = e;
      }
    }
   while (true);
};
function $flushAndCloseCOROUTINE$(_this__u8e3s4, resultContinuation) {
  CoroutineImpl.call(this, resultContinuation);
  this.i2l_1 = _this__u8e3s4;
}
protoOf($flushAndCloseCOROUTINE$).t8 = function () {
  var suspendResult = this.n8_1;
  $sm: do
    try {
      var tmp = this.l8_1;
      switch (tmp) {
        case 0:
          this.m8_1 = 4;
          var this_0 = this.i2l_1;
          this.m8_1 = 2;
          var tmp_0 = this;
          tmp_0.k2l_1 = Companion_instance;
          this.l8_1 = 1;
          suspendResult = this_0.l2l(this);
          if (suspendResult === get_COROUTINE_SUSPENDED()) {
            return suspendResult;
          }

          continue $sm;
        case 1:
          var tmp_1 = this;
          this.k2l_1;
          tmp_1.j2l_1 = _Result___init__impl__xyqfz8(Unit_instance);
          this.m8_1 = 4;
          this.l8_1 = 3;
          continue $sm;
        case 2:
          this.m8_1 = 4;
          var tmp_2 = this.o8_1;
          if (tmp_2 instanceof Error) {
            var e = this.o8_1;
            var tmp_3 = this;
            tmp_3.j2l_1 = _Result___init__impl__xyqfz8(createFailure(e));
            this.l8_1 = 3;
            continue $sm;
          } else {
            throw this.o8_1;
          }

        case 3:
          this.m8_1 = 4;
          if (!this.i2l_1.d2k_1.atomicfu$compareAndSet(null, get_CLOSED()))
            return Unit_instance;
          closeSlot(this.i2l_1, null);
          return Unit_instance;
        case 4:
          throw this.o8_1;
      }
    } catch ($p) {
      var e_0 = $p;
      if (this.m8_1 === 4) {
        throw e_0;
      } else {
        this.l8_1 = this.m8_1;
        this.o8_1 = e_0;
      }
    }
   while (true);
};
function ByteChannel(autoFlush) {
  autoFlush = autoFlush === VOID ? false : autoFlush;
  this.w2j_1 = autoFlush;
  this.x2j_1 = new Buffer();
  this.y2j_1 = 0;
  this.z2j_1 = new Object();
  this.a2k_1 = atomic$ref$1(Empty_instance);
  this.b2k_1 = new Buffer();
  this.c2k_1 = new Buffer();
  this.d2k_1 = atomic$ref$1(null);
}
protoOf(ByteChannel).m2l = function () {
  var tmp0_safe_receiver = this.n2l();
  if (tmp0_safe_receiver == null)
    null;
  else {
    // Inline function 'kotlin.let' call
    throw tmp0_safe_receiver;
  }
  if (this.b2k_1.m1m()) {
    moveFlushToReadBuffer(this);
  }
  return this.b2k_1;
};
protoOf(ByteChannel).o2l = function () {
  var tmp0_safe_receiver = this.n2l();
  if (tmp0_safe_receiver == null)
    null;
  else {
    // Inline function 'kotlin.let' call
    throw tmp0_safe_receiver;
  }
  if (this.p2l()) {
    throw IOException_init_$Create$('Channel is closed for write');
  }
  return this.c2k_1;
};
protoOf(ByteChannel).n2l = function () {
  var tmp0_safe_receiver = this.d2k_1.kotlinx$atomicfu$value;
  return tmp0_safe_receiver == null ? null : tmp0_safe_receiver.f();
};
protoOf(ByteChannel).p2l = function () {
  return !(this.d2k_1.kotlinx$atomicfu$value == null);
};
protoOf(ByteChannel).r2l = function () {
  return !(this.n2l() == null) || (this.p2l() && this.y2j_1 === 0 && this.b2k_1.m1m());
};
protoOf(ByteChannel).s2l = function (min, $completion) {
  var tmp = new $awaitContentCOROUTINE$(this, min, $completion);
  tmp.n8_1 = Unit_instance;
  tmp.o8_1 = null;
  return tmp.t8();
};
protoOf(ByteChannel).l2l = function ($completion) {
  var tmp = new $flushCOROUTINE$(this, $completion);
  tmp.n8_1 = Unit_instance;
  tmp.o8_1 = null;
  return tmp.t8();
};
protoOf(ByteChannel).z2k = function () {
  if (this.c2k_1.m1m())
    return Unit_instance;
  // Inline function 'io.ktor.utils.io.locks.synchronized' call
  this.z2j_1;
  var count = convertToInt(this.c2k_1.u());
  this.x2j_1.d2i(this.c2k_1);
  this.y2j_1 = this.y2j_1 + count | 0;
  // Inline function 'io.ktor.utils.io.ByteChannel.resumeSlot' call
  var current = this.a2k_1.kotlinx$atomicfu$value;
  var tmp;
  if (current instanceof Read) {
    tmp = this.a2k_1.atomicfu$compareAndSet(current, Empty_instance);
  } else {
    tmp = false;
  }
  if (tmp) {
    current.q2j();
  }
};
protoOf(ByteChannel).u2l = function ($completion) {
  var tmp = new $flushAndCloseCOROUTINE$(this, $completion);
  tmp.n8_1 = Unit_instance;
  tmp.o8_1 = null;
  return tmp.t8();
};
protoOf(ByteChannel).v2l = function (cause) {
  if (!(this.d2k_1.kotlinx$atomicfu$value == null))
    return Unit_instance;
  var closedToken = new CloseToken(cause);
  this.d2k_1.atomicfu$compareAndSet(null, closedToken);
  var actualCause = closedToken.f();
  closeSlot(this, actualCause);
};
protoOf(ByteChannel).toString = function () {
  return 'ByteChannel[' + hashCode(this) + ']';
};
function ConcurrentIOException(taskName, cause) {
  cause = cause === VOID ? null : cause;
  IllegalStateException_init_$Init$('Concurrent ' + taskName + ' attempts', cause, this);
  captureStack(this, ConcurrentIOException);
}
function ByteReadChannel(content, offset, length) {
  offset = offset === VOID ? 0 : offset;
  length = length === VOID ? content.length : length;
  // Inline function 'kotlin.also' call
  var this_0 = new Buffer();
  this_0.v2h(content, offset, offset + length | 0);
  var source = this_0;
  return ByteReadChannel_0(source);
}
function ByteReadChannel_0(source) {
  return new SourceByteReadChannel(source);
}
function ByteReadChannel$Companion$Empty$1() {
  this.w2l_1 = null;
  this.x2l_1 = new Buffer();
}
protoOf(ByteReadChannel$Companion$Empty$1).n2l = function () {
  return this.w2l_1;
};
protoOf(ByteReadChannel$Companion$Empty$1).r2l = function () {
  return true;
};
protoOf(ByteReadChannel$Companion$Empty$1).m2l = function () {
  return this.x2l_1;
};
protoOf(ByteReadChannel$Companion$Empty$1).s2l = function (min, $completion) {
  return false;
};
protoOf(ByteReadChannel$Companion$Empty$1).v2l = function (cause) {
};
function Companion_0() {
  Companion_instance_1 = this;
  var tmp = this;
  tmp.y2l_1 = new ByteReadChannel$Companion$Empty$1();
}
var Companion_instance_1;
function Companion_getInstance_0() {
  if (Companion_instance_1 == null)
    new Companion_0();
  return Companion_instance_1;
}
function ByteReadChannel_1() {
}
function cancel_0(_this__u8e3s4) {
  _this__u8e3s4.v2l(IOException_init_$Create$('Channel was cancelled'));
}
function readRemaining(_this__u8e3s4, $completion) {
  var tmp = new $readRemainingCOROUTINE$(_this__u8e3s4, $completion);
  tmp.n8_1 = Unit_instance;
  tmp.o8_1 = null;
  return tmp.t8();
}
function get_availableForRead(_this__u8e3s4) {
  return convertToInt(_this__u8e3s4.m2l().s2g().u());
}
function readPacket(_this__u8e3s4, packet, $completion) {
  var tmp = new $readPacketCOROUTINE$(_this__u8e3s4, packet, $completion);
  tmp.n8_1 = Unit_instance;
  tmp.o8_1 = null;
  return tmp.t8();
}
function readAvailable(_this__u8e3s4, buffer, offset, length, $completion) {
  offset = offset === VOID ? 0 : offset;
  length = length === VOID ? buffer.length - offset | 0 : length;
  var tmp = new $readAvailableCOROUTINE$(_this__u8e3s4, buffer, offset, length, $completion);
  tmp.n8_1 = Unit_instance;
  tmp.o8_1 = null;
  return tmp.t8();
}
function toByteArray(_this__u8e3s4, $completion) {
  var tmp = new $toByteArrayCOROUTINE$(_this__u8e3s4, $completion);
  tmp.n8_1 = Unit_instance;
  tmp.o8_1 = null;
  return tmp.t8();
}
function copyTo(_this__u8e3s4, channel, limit, $completion) {
  var tmp = new $copyToCOROUTINE$(_this__u8e3s4, channel, limit, $completion);
  tmp.n8_1 = Unit_instance;
  tmp.o8_1 = null;
  return tmp.t8();
}
function rethrowCloseCauseIfNeeded(_this__u8e3s4) {
  var tmp0_safe_receiver = _this__u8e3s4.n2l();
  if (tmp0_safe_receiver == null)
    null;
  else {
    // Inline function 'kotlin.let' call
    throw tmp0_safe_receiver;
  }
}
function rethrowCloseCauseIfNeeded_0(_this__u8e3s4) {
  var tmp0_safe_receiver = _this__u8e3s4.n2l();
  if (tmp0_safe_receiver == null)
    null;
  else {
    // Inline function 'kotlin.let' call
    throw tmp0_safe_receiver;
  }
}
function readBuffer(_this__u8e3s4, $completion) {
  var tmp = new $readBufferCOROUTINE$(_this__u8e3s4, $completion);
  tmp.n8_1 = Unit_instance;
  tmp.o8_1 = null;
  return tmp.t8();
}
function rethrowCloseCauseIfNeeded_1(_this__u8e3s4) {
  var tmp0_safe_receiver = _this__u8e3s4.n2l();
  if (tmp0_safe_receiver == null)
    null;
  else {
    // Inline function 'kotlin.let' call
    throw tmp0_safe_receiver;
  }
}
function $readRemainingCOROUTINE$(_this__u8e3s4, resultContinuation) {
  CoroutineImpl.call(this, resultContinuation);
  this.h2m_1 = _this__u8e3s4;
}
protoOf($readRemainingCOROUTINE$).t8 = function () {
  var suspendResult = this.n8_1;
  $sm: do
    try {
      var tmp = this.l8_1;
      switch (tmp) {
        case 0:
          this.m8_1 = 4;
          this.i2m_1 = BytePacketBuilder();
          this.l8_1 = 1;
          continue $sm;
        case 1:
          if (!!this.h2m_1.r2l()) {
            this.l8_1 = 3;
            continue $sm;
          }

          this.i2m_1.d2i(this.h2m_1.m2l());
          this.l8_1 = 2;
          suspendResult = this.h2m_1.t2l(VOID, this);
          if (suspendResult === get_COROUTINE_SUSPENDED()) {
            return suspendResult;
          }

          continue $sm;
        case 2:
          this.l8_1 = 1;
          continue $sm;
        case 3:
          rethrowCloseCauseIfNeeded_0(this.h2m_1);
          return this.i2m_1.s2g();
        case 4:
          throw this.o8_1;
      }
    } catch ($p) {
      var e = $p;
      if (this.m8_1 === 4) {
        throw e;
      } else {
        this.l8_1 = this.m8_1;
        this.o8_1 = e;
      }
    }
   while (true);
};
function $readPacketCOROUTINE$(_this__u8e3s4, packet, resultContinuation) {
  CoroutineImpl.call(this, resultContinuation);
  this.r2m_1 = _this__u8e3s4;
  this.s2m_1 = packet;
}
protoOf($readPacketCOROUTINE$).t8 = function () {
  var suspendResult = this.n8_1;
  $sm: do
    try {
      var tmp = this.l8_1;
      switch (tmp) {
        case 0:
          this.m8_1 = 6;
          this.t2m_1 = new Buffer();
          this.l8_1 = 1;
          continue $sm;
        case 1:
          if (!(compare(this.t2m_1.u(), fromInt(this.s2m_1)) < 0)) {
            this.l8_1 = 5;
            continue $sm;
          }

          if (this.r2m_1.m2l().m1m()) {
            this.l8_1 = 2;
            suspendResult = this.r2m_1.t2l(VOID, this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }
            continue $sm;
          } else {
            this.l8_1 = 3;
            continue $sm;
          }

        case 2:
          this.l8_1 = 3;
          continue $sm;
        case 3:
          if (this.r2m_1.r2l()) {
            this.l8_1 = 5;
            continue $sm;
          } else {
            this.l8_1 = 4;
            continue $sm;
          }

        case 4:
          if (compare(get_remaining(this.r2m_1.m2l()), subtract(numberToLong(this.s2m_1), this.t2m_1.u())) > 0) {
            this.r2m_1.m2l().p2h(this.t2m_1, subtract(numberToLong(this.s2m_1), this.t2m_1.u()));
          } else {
            this.r2m_1.m2l().q2h(this.t2m_1);
          }

          this.l8_1 = 1;
          continue $sm;
        case 5:
          if (compare(this.t2m_1.u(), fromInt(this.s2m_1)) < 0) {
            throw EOFException_init_$Create$('Not enough data available, required ' + this.s2m_1 + ' bytes but only ' + this.t2m_1.u().toString() + ' available');
          }

          return this.t2m_1;
        case 6:
          throw this.o8_1;
      }
    } catch ($p) {
      var e = $p;
      if (this.m8_1 === 6) {
        throw e;
      } else {
        this.l8_1 = this.m8_1;
        this.o8_1 = e;
      }
    }
   while (true);
};
function $readAvailableCOROUTINE$(_this__u8e3s4, buffer, offset, length, resultContinuation) {
  CoroutineImpl.call(this, resultContinuation);
  this.c2n_1 = _this__u8e3s4;
  this.d2n_1 = buffer;
  this.e2n_1 = offset;
  this.f2n_1 = length;
}
protoOf($readAvailableCOROUTINE$).t8 = function () {
  var suspendResult = this.n8_1;
  $sm: do
    try {
      var tmp = this.l8_1;
      switch (tmp) {
        case 0:
          this.m8_1 = 3;
          if (this.c2n_1.r2l())
            return -1;
          if (this.c2n_1.m2l().m1m()) {
            this.l8_1 = 1;
            suspendResult = this.c2n_1.t2l(VOID, this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }
            continue $sm;
          } else {
            this.l8_1 = 2;
            continue $sm;
          }

        case 1:
          this.l8_1 = 2;
          continue $sm;
        case 2:
          if (this.c2n_1.r2l())
            return -1;
          return readAvailable_0(this.c2n_1.m2l(), this.d2n_1, this.e2n_1, this.f2n_1);
        case 3:
          throw this.o8_1;
      }
    } catch ($p) {
      var e = $p;
      if (this.m8_1 === 3) {
        throw e;
      } else {
        this.l8_1 = this.m8_1;
        this.o8_1 = e;
      }
    }
   while (true);
};
function $toByteArrayCOROUTINE$(_this__u8e3s4, resultContinuation) {
  CoroutineImpl.call(this, resultContinuation);
  this.o2n_1 = _this__u8e3s4;
}
protoOf($toByteArrayCOROUTINE$).t8 = function () {
  var suspendResult = this.n8_1;
  $sm: do
    try {
      var tmp = this.l8_1;
      switch (tmp) {
        case 0:
          this.m8_1 = 2;
          this.l8_1 = 1;
          suspendResult = readBuffer(this.o2n_1, this);
          if (suspendResult === get_COROUTINE_SUSPENDED()) {
            return suspendResult;
          }

          continue $sm;
        case 1:
          var ARGUMENT = suspendResult;
          return readBytes(ARGUMENT);
        case 2:
          throw this.o8_1;
      }
    } catch ($p) {
      var e = $p;
      if (this.m8_1 === 2) {
        throw e;
      } else {
        this.l8_1 = this.m8_1;
        this.o8_1 = e;
      }
    }
   while (true);
};
function $copyToCOROUTINE$(_this__u8e3s4, channel, limit, resultContinuation) {
  CoroutineImpl.call(this, resultContinuation);
  this.x2n_1 = _this__u8e3s4;
  this.y2n_1 = channel;
  this.z2n_1 = limit;
}
protoOf($copyToCOROUTINE$).t8 = function () {
  var suspendResult = this.n8_1;
  $sm: do
    try {
      var tmp = this.l8_1;
      switch (tmp) {
        case 0:
          this.m8_1 = 12;
          this.a2o_1 = this.z2n_1;
          this.l8_1 = 1;
          continue $sm;
        case 1:
          this.m8_1 = 8;
          this.m8_1 = 7;
          this.l8_1 = 2;
          continue $sm;
        case 2:
          if (!(!this.x2n_1.r2l() && compare(this.a2o_1, new Long(0, 0)) > 0)) {
            this.l8_1 = 6;
            continue $sm;
          }

          if (this.x2n_1.m2l().m1m()) {
            this.l8_1 = 3;
            suspendResult = this.x2n_1.t2l(VOID, this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }
            continue $sm;
          } else {
            this.l8_1 = 4;
            continue $sm;
          }

        case 3:
          this.l8_1 = 4;
          continue $sm;
        case 4:
          var tmp0 = this.a2o_1;
          var b = get_remaining(this.x2n_1.m2l());
          var count = compare(tmp0, b) <= 0 ? tmp0 : b;
          this.x2n_1.m2l().p2h(this.y2n_1.o2l(), count);
          this.a2o_1 = subtract(this.a2o_1, count);
          this.l8_1 = 5;
          suspendResult = this.y2n_1.l2l(this);
          if (suspendResult === get_COROUTINE_SUSPENDED()) {
            return suspendResult;
          }

          continue $sm;
        case 5:
          this.l8_1 = 2;
          continue $sm;
        case 6:
          this.m8_1 = 12;
          this.l8_1 = 10;
          continue $sm;
        case 7:
          this.m8_1 = 8;
          var tmp_0 = this.o8_1;
          if (tmp_0 instanceof Error) {
            var cause = this.o8_1;
            this.x2n_1.v2l(cause);
            close(this.y2n_1, cause);
            throw cause;
          } else {
            throw this.o8_1;
          }

        case 8:
          this.m8_1 = 12;
          this.b2o_1 = this.o8_1;
          this.l8_1 = 9;
          suspendResult = this.y2n_1.l2l(this);
          if (suspendResult === get_COROUTINE_SUSPENDED()) {
            return suspendResult;
          }

          continue $sm;
        case 9:
          throw this.b2o_1;
        case 10:
          this.m8_1 = 12;
          this.l8_1 = 11;
          suspendResult = this.y2n_1.l2l(this);
          if (suspendResult === get_COROUTINE_SUSPENDED()) {
            return suspendResult;
          }

          continue $sm;
        case 11:
          return subtract(this.z2n_1, this.a2o_1);
        case 12:
          throw this.o8_1;
      }
    } catch ($p) {
      var e = $p;
      if (this.m8_1 === 12) {
        throw e;
      } else {
        this.l8_1 = this.m8_1;
        this.o8_1 = e;
      }
    }
   while (true);
};
function $readBufferCOROUTINE$(_this__u8e3s4, resultContinuation) {
  CoroutineImpl.call(this, resultContinuation);
  this.k2o_1 = _this__u8e3s4;
}
protoOf($readBufferCOROUTINE$).t8 = function () {
  var suspendResult = this.n8_1;
  $sm: do
    try {
      var tmp = this.l8_1;
      switch (tmp) {
        case 0:
          this.m8_1 = 4;
          this.l2o_1 = new Buffer();
          this.l8_1 = 1;
          continue $sm;
        case 1:
          if (!!this.k2o_1.r2l()) {
            this.l8_1 = 3;
            continue $sm;
          }

          this.l2o_1.d2i(this.k2o_1.m2l());
          this.l8_1 = 2;
          suspendResult = this.k2o_1.t2l(VOID, this);
          if (suspendResult === get_COROUTINE_SUSPENDED()) {
            return suspendResult;
          }

          continue $sm;
        case 2:
          this.l8_1 = 1;
          continue $sm;
        case 3:
          var tmp0_safe_receiver = this.k2o_1.n2l();
          if (tmp0_safe_receiver == null)
            null;
          else {
            throw tmp0_safe_receiver;
          }

          return this.l2o_1;
        case 4:
          throw this.o8_1;
      }
    } catch ($p) {
      var e = $p;
      if (this.m8_1 === 4) {
        throw e;
      } else {
        this.l8_1 = this.m8_1;
        this.o8_1 = e;
      }
    }
   while (true);
};
function flushIfNeeded(_this__u8e3s4, $completion) {
  var tmp = new $flushIfNeededCOROUTINE$(_this__u8e3s4, $completion);
  tmp.n8_1 = Unit_instance;
  tmp.o8_1 = null;
  return tmp.t8();
}
function $flushIfNeededCOROUTINE$(_this__u8e3s4, resultContinuation) {
  CoroutineImpl.call(this, resultContinuation);
  this.u2o_1 = _this__u8e3s4;
}
protoOf($flushIfNeededCOROUTINE$).t8 = function () {
  var suspendResult = this.n8_1;
  $sm: do
    try {
      var tmp = this.l8_1;
      switch (tmp) {
        case 0:
          this.m8_1 = 3;
          rethrowCloseCauseIfNeeded_1(this.u2o_1);
          var tmp_0;
          var tmp_1 = this.u2o_1;
          var tmp0_safe_receiver = tmp_1 instanceof ByteChannel ? tmp_1 : null;
          if ((tmp0_safe_receiver == null ? null : tmp0_safe_receiver.w2j_1) === true) {
            tmp_0 = true;
          } else {
            tmp_0 = get_size(this.u2o_1.o2l()) >= 1048576;
          }

          if (tmp_0) {
            this.l8_1 = 1;
            suspendResult = this.u2o_1.l2l(this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }
            continue $sm;
          } else {
            this.l8_1 = 2;
            continue $sm;
          }

        case 1:
          this.l8_1 = 2;
          continue $sm;
        case 2:
          return Unit_instance;
        case 3:
          throw this.o8_1;
      }
    } catch ($p) {
      var e = $p;
      if (this.m8_1 === 3) {
        throw e;
      } else {
        this.l8_1 = this.m8_1;
        this.o8_1 = e;
      }
    }
   while (true);
};
function get_NO_CALLBACK() {
  _init_properties_ByteWriteChannelOperations_kt__i7slrs();
  return NO_CALLBACK;
}
var NO_CALLBACK;
function WriterJob(channel, job) {
  this.v2o_1 = channel;
  this.w2o_1 = job;
}
protoOf(WriterJob).p1w = function () {
  return this.w2o_1;
};
function writer(_this__u8e3s4, coroutineContext, autoFlush, block) {
  coroutineContext = coroutineContext === VOID ? EmptyCoroutineContext_getInstance() : coroutineContext;
  autoFlush = autoFlush === VOID ? false : autoFlush;
  _init_properties_ByteWriteChannelOperations_kt__i7slrs();
  return writer_0(_this__u8e3s4, coroutineContext, new ByteChannel(), block);
}
function WriterScope(channel, coroutineContext) {
  this.x2o_1 = channel;
  this.y2o_1 = coroutineContext;
}
protoOf(WriterScope).f1q = function () {
  return this.y2o_1;
};
function writeFully(_this__u8e3s4, value, startIndex, endIndex, $completion) {
  startIndex = startIndex === VOID ? 0 : startIndex;
  endIndex = endIndex === VOID ? value.length : endIndex;
  _this__u8e3s4.o2l().v2h(value, startIndex, endIndex);
  return flushIfNeeded(_this__u8e3s4, $completion);
}
function writePacket(_this__u8e3s4, copy, $completion) {
  _this__u8e3s4.o2l().d2i(copy);
  return flushIfNeeded(_this__u8e3s4, $completion);
}
function get_isCompleted(_this__u8e3s4) {
  _init_properties_ByteWriteChannelOperations_kt__i7slrs();
  return _this__u8e3s4.p1w().a1r();
}
function close(_this__u8e3s4, cause) {
  _init_properties_ByteWriteChannelOperations_kt__i7slrs();
  if (cause == null) {
    fireAndForget(ByteWriteChannel$flushAndClose$ref_0(_this__u8e3s4));
  } else {
    _this__u8e3s4.v2l(cause);
  }
}
function invokeOnCompletion(_this__u8e3s4, block) {
  _init_properties_ByteWriteChannelOperations_kt__i7slrs();
  var tmp = _this__u8e3s4.p1w();
  tmp.h1r(invokeOnCompletion$lambda(block));
}
function writer_0(_this__u8e3s4, coroutineContext, channel, block) {
  coroutineContext = coroutineContext === VOID ? EmptyCoroutineContext_getInstance() : coroutineContext;
  _init_properties_ByteWriteChannelOperations_kt__i7slrs();
  // Inline function 'kotlin.apply' call
  var this_0 = launch(_this__u8e3s4, coroutineContext, VOID, writer$slambda_0(block, channel, null));
  this_0.h1r(writer$lambda(channel));
  var job = this_0;
  return new WriterJob(channel, job);
}
function fireAndForget(_this__u8e3s4) {
  _init_properties_ByteWriteChannelOperations_kt__i7slrs();
  startCoroutineCancellable(_this__u8e3s4, get_NO_CALLBACK());
}
function NO_CALLBACK$1() {
  this.z2o_1 = EmptyCoroutineContext_getInstance();
}
protoOf(NO_CALLBACK$1).r8 = function () {
  return this.z2o_1;
};
protoOf(NO_CALLBACK$1).s8 = function (result) {
  return Unit_instance;
};
protoOf(NO_CALLBACK$1).w8 = function (result) {
  return this.s8(result);
};
function ByteWriteChannel$flushAndClose$ref(p0) {
  this.a2p_1 = p0;
}
protoOf(ByteWriteChannel$flushAndClose$ref).b2p = function ($completion) {
  return this.a2p_1.u2l($completion);
};
protoOf(ByteWriteChannel$flushAndClose$ref).y9 = function ($completion) {
  return this.b2p($completion);
};
function ByteWriteChannel$flushAndClose$ref_0(p0) {
  var i = new ByteWriteChannel$flushAndClose$ref(p0);
  var l = function ($completion) {
    return i.b2p($completion);
  };
  l.callableName = 'flushAndClose';
  l.$arity = 0;
  return l;
}
function invokeOnCompletion$lambda($block) {
  return function (it) {
    $block();
    return Unit_instance;
  };
}
function writer$slambda($block, $channel, resultContinuation) {
  this.k2p_1 = $block;
  this.l2p_1 = $channel;
  CoroutineImpl.call(this, resultContinuation);
}
protoOf(writer$slambda).z2a = function ($this$launch, $completion) {
  var tmp = this.a2b($this$launch, $completion);
  tmp.n8_1 = Unit_instance;
  tmp.o8_1 = null;
  return tmp.t8();
};
protoOf(writer$slambda).b9 = function (p1, $completion) {
  return this.z2a((!(p1 == null) ? isInterface(p1, CoroutineScope) : false) ? p1 : THROW_CCE(), $completion);
};
protoOf(writer$slambda).t8 = function () {
  var suspendResult = this.n8_1;
  $sm: do
    try {
      var tmp = this.l8_1;
      switch (tmp) {
        case 0:
          this.m8_1 = 14;
          this.p2p_1 = Job(get_job(this.m2p_1.f1q()));
          this.l8_1 = 1;
          continue $sm;
        case 1:
          this.m8_1 = 4;
          this.m8_1 = 3;
          this.l8_1 = 2;
          suspendResult = this.k2p_1(new WriterScope(this.l2p_1, this.m2p_1.f1q().ch(this.p2p_1)), this);
          if (suspendResult === get_COROUTINE_SUSPENDED()) {
            return suspendResult;
          }

          continue $sm;
        case 2:
          this.p2p_1.k1x();
          var tmp_0;
          if (get_job(this.m2p_1.f1q()).b1r()) {
            this.l2p_1.v2l(get_job(this.m2p_1.f1q()).e1r());
            tmp_0 = Unit_instance;
          }

          this.m8_1 = 14;
          this.l8_1 = 9;
          continue $sm;
        case 3:
          this.m8_1 = 4;
          var tmp_1 = this.o8_1;
          if (tmp_1 instanceof Error) {
            var cause = this.o8_1;
            cancel(this.p2p_1, 'Exception thrown while writing to channel', cause);
            this.l2p_1.v2l(cause);
            this.m8_1 = 14;
            this.l8_1 = 9;
            continue $sm;
          } else {
            throw this.o8_1;
          }

        case 4:
          this.m8_1 = 14;
          this.q2p_1 = this.o8_1;
          this.l8_1 = 5;
          suspendResult = this.p2p_1.l1r(this);
          if (suspendResult === get_COROUTINE_SUSPENDED()) {
            return suspendResult;
          }

          continue $sm;
        case 5:
          this.m2p_1;
          this.m8_1 = 7;
          var tmp_2 = this;
          tmp_2.s2p_1 = Companion_instance;
          this.l8_1 = 6;
          suspendResult = this.l2p_1.u2l(this);
          if (suspendResult === get_COROUTINE_SUSPENDED()) {
            return suspendResult;
          }

          continue $sm;
        case 6:
          var tmp_3 = this;
          this.s2p_1;
          tmp_3.r2p_1 = _Result___init__impl__xyqfz8(Unit_instance);
          this.m8_1 = 14;
          this.l8_1 = 8;
          continue $sm;
        case 7:
          this.m8_1 = 14;
          var tmp_4 = this.o8_1;
          if (tmp_4 instanceof Error) {
            var e = this.o8_1;
            var tmp_5 = this;
            tmp_5.r2p_1 = _Result___init__impl__xyqfz8(createFailure(e));
            this.l8_1 = 8;
            continue $sm;
          } else {
            throw this.o8_1;
          }

        case 8:
          this.m8_1 = 14;
          throw this.q2p_1;
        case 9:
          this.m8_1 = 14;
          this.l8_1 = 10;
          suspendResult = this.p2p_1.l1r(this);
          if (suspendResult === get_COROUTINE_SUSPENDED()) {
            return suspendResult;
          }

          continue $sm;
        case 10:
          this.m2p_1;
          this.m8_1 = 12;
          var tmp_6 = this;
          tmp_6.o2p_1 = Companion_instance;
          this.l8_1 = 11;
          suspendResult = this.l2p_1.u2l(this);
          if (suspendResult === get_COROUTINE_SUSPENDED()) {
            return suspendResult;
          }

          continue $sm;
        case 11:
          var tmp_7 = this;
          this.o2p_1;
          tmp_7.n2p_1 = _Result___init__impl__xyqfz8(Unit_instance);
          this.m8_1 = 14;
          this.l8_1 = 13;
          continue $sm;
        case 12:
          this.m8_1 = 14;
          var tmp_8 = this.o8_1;
          if (tmp_8 instanceof Error) {
            var e_0 = this.o8_1;
            var tmp_9 = this;
            tmp_9.n2p_1 = _Result___init__impl__xyqfz8(createFailure(e_0));
            this.l8_1 = 13;
            continue $sm;
          } else {
            throw this.o8_1;
          }

        case 13:
          this.m8_1 = 14;
          return Unit_instance;
        case 14:
          throw this.o8_1;
      }
    } catch ($p) {
      var e_1 = $p;
      if (this.m8_1 === 14) {
        throw e_1;
      } else {
        this.l8_1 = this.m8_1;
        this.o8_1 = e_1;
      }
    }
   while (true);
};
protoOf(writer$slambda).a2b = function ($this$launch, completion) {
  var i = new writer$slambda(this.k2p_1, this.l2p_1, completion);
  i.m2p_1 = $this$launch;
  return i;
};
function writer$slambda_0($block, $channel, resultContinuation) {
  var i = new writer$slambda($block, $channel, resultContinuation);
  var l = function ($this$launch, $completion) {
    return i.z2a($this$launch, $completion);
  };
  l.$arity = 1;
  return l;
}
function writer$lambda($channel) {
  return function (it) {
    var tmp;
    if (!(it == null) && !$channel.p2l()) {
      $channel.v2l(it);
      tmp = Unit_instance;
    }
    return Unit_instance;
  };
}
var properties_initialized_ByteWriteChannelOperations_kt_acrf6u;
function _init_properties_ByteWriteChannelOperations_kt__i7slrs() {
  if (!properties_initialized_ByteWriteChannelOperations_kt_acrf6u) {
    properties_initialized_ByteWriteChannelOperations_kt_acrf6u = true;
    NO_CALLBACK = new NO_CALLBACK$1();
  }
}
function get_CLOSED() {
  _init_properties_CloseToken_kt__9ucr41();
  return CLOSED;
}
var CLOSED;
function CloseToken(origin) {
  var tmp = this;
  var tmp_0;
  if (origin == null) {
    tmp_0 = null;
  } else {
    if (origin instanceof CancellationException) {
      var tmp_1;
      if (isInterface(origin, CopyableThrowable)) {
        tmp_1 = origin.z1x();
      } else {
        var tmp0_elvis_lhs = origin.message;
        tmp_1 = CancellationException_init_$Create$(tmp0_elvis_lhs == null ? 'Channel was cancelled' : tmp0_elvis_lhs, origin);
      }
      tmp_0 = tmp_1;
    } else {
      var tmp_2;
      if (origin instanceof IOException) {
        tmp_2 = isInterface(origin, CopyableThrowable);
      } else {
        tmp_2 = false;
      }
      if (tmp_2) {
        tmp_0 = origin.z1x();
      } else {
        var tmp1_elvis_lhs = origin.message;
        tmp_0 = IOException_init_$Create$_0(tmp1_elvis_lhs == null ? 'Channel was closed' : tmp1_elvis_lhs, origin);
      }
    }
  }
  tmp.q2l_1 = tmp_0;
}
protoOf(CloseToken).f = function () {
  var tmp;
  if (this.q2l_1 == null) {
    tmp = null;
  } else {
    var tmp_0 = this.q2l_1;
    if (tmp_0 instanceof IOException) {
      var tmp_1;
      var tmp_2 = this.q2l_1;
      if (isInterface(tmp_2, CopyableThrowable)) {
        tmp_1 = this.q2l_1.z1x();
      } else {
        tmp_1 = IOException_init_$Create$_0(this.q2l_1.message, this.q2l_1);
      }
      tmp = tmp_1;
    } else {
      var tmp_3 = this.q2l_1;
      if (!(tmp_3 == null) ? isInterface(tmp_3, CopyableThrowable) : false) {
        var tmp0_elvis_lhs = this.q2l_1.z1x();
        tmp = tmp0_elvis_lhs == null ? CancellationException_init_$Create$(this.q2l_1.message, this.q2l_1) : tmp0_elvis_lhs;
      } else {
        tmp = CancellationException_init_$Create$(this.q2l_1.message, this.q2l_1);
      }
    }
  }
  return tmp;
};
var properties_initialized_CloseToken_kt_lgg8zn;
function _init_properties_CloseToken_kt__9ucr41() {
  if (!properties_initialized_CloseToken_kt_lgg8zn) {
    properties_initialized_CloseToken_kt_lgg8zn = true;
    CLOSED = new CloseToken(null);
  }
}
function readText(_this__u8e3s4) {
  return readString(_this__u8e3s4);
}
function SourceByteReadChannel(source) {
  this.t2p_1 = source;
  this.u2p_1 = null;
}
protoOf(SourceByteReadChannel).n2l = function () {
  var tmp0_safe_receiver = this.u2p_1;
  return tmp0_safe_receiver == null ? null : tmp0_safe_receiver.f();
};
protoOf(SourceByteReadChannel).r2l = function () {
  return this.t2p_1.m1m();
};
protoOf(SourceByteReadChannel).m2l = function () {
  var tmp0_safe_receiver = this.n2l();
  if (tmp0_safe_receiver == null)
    null;
  else {
    // Inline function 'kotlin.let' call
    throw tmp0_safe_receiver;
  }
  return this.t2p_1;
};
protoOf(SourceByteReadChannel).s2l = function (min, $completion) {
  var tmp0_safe_receiver = this.n2l();
  if (tmp0_safe_receiver == null)
    null;
  else {
    // Inline function 'kotlin.let' call
    throw tmp0_safe_receiver;
  }
  return compare(get_remaining(this.t2p_1), fromInt(min)) >= 0;
};
protoOf(SourceByteReadChannel).v2l = function (cause) {
  if (!(this.u2p_1 == null))
    return Unit_instance;
  this.t2p_1.c1n();
  var tmp = this;
  var tmp1_elvis_lhs = cause == null ? null : cause.message;
  tmp.u2p_1 = new CloseToken(IOException_init_$Create$_0(tmp1_elvis_lhs == null ? 'Channel was cancelled' : tmp1_elvis_lhs, cause));
};
function decode(_this__u8e3s4, input, max) {
  max = max === VOID ? 2147483647 : max;
  var tmp0 = fromInt(max);
  // Inline function 'kotlin.comparisons.minOf' call
  var b = input.s2g().u();
  var tmp$ret$0 = compare(tmp0, b) <= 0 ? tmp0 : b;
  // Inline function 'kotlin.text.buildString' call
  var capacity = convertToInt(tmp$ret$0);
  // Inline function 'kotlin.apply' call
  var this_0 = StringBuilder_init_$Create$(capacity);
  decode_0(_this__u8e3s4, input, this_0, max);
  return this_0.toString();
}
function encode(_this__u8e3s4, input, fromIndex, toIndex) {
  fromIndex = fromIndex === VOID ? 0 : fromIndex;
  toIndex = toIndex === VOID ? charSequenceLength(input) : toIndex;
  // Inline function 'io.ktor.utils.io.core.buildPacket' call
  var builder = new Buffer();
  encodeToImpl(_this__u8e3s4, builder, input, fromIndex, toIndex);
  return builder;
}
function encodeToImpl(_this__u8e3s4, destination, input, fromIndex, toIndex) {
  var start = fromIndex;
  if (start >= toIndex)
    return Unit_instance;
  $l$loop: while (true) {
    var rc = encodeImpl(_this__u8e3s4, input, start, toIndex, destination);
    // Inline function 'kotlin.check' call
    if (!(rc >= 0)) {
      throw IllegalStateException_init_$Create$('Check failed.');
    }
    start = start + rc | 0;
    if (start >= toIndex)
      break $l$loop;
  }
}
function canRead(_this__u8e3s4) {
  return !_this__u8e3s4.m1m();
}
function readBytes(_this__u8e3s4, count) {
  count = count === VOID ? convertToInt(_this__u8e3s4.u()) : count;
  return readByteArray(_this__u8e3s4, count);
}
function BytePacketBuilder() {
  return new Buffer();
}
function writePacket_0(_this__u8e3s4, packet) {
  _this__u8e3s4.d2i(packet);
}
function build(_this__u8e3s4) {
  return _this__u8e3s4.s2g();
}
function writeFully_0(_this__u8e3s4, buffer, offset, length) {
  offset = offset === VOID ? 0 : offset;
  length = length === VOID ? buffer.length - offset | 0 : length;
  _this__u8e3s4.v2h(buffer, offset, offset + length | 0);
}
function get_size(_this__u8e3s4) {
  return convertToInt(_this__u8e3s4.s2g().u());
}
var ByteReadPacketEmpty;
function takeWhile(_this__u8e3s4, block) {
  _init_properties_ByteReadPacket_kt__28475y();
  while (!_this__u8e3s4.m1m() && block(_this__u8e3s4.s2g())) {
  }
}
function get_remaining(_this__u8e3s4) {
  _init_properties_ByteReadPacket_kt__28475y();
  return _this__u8e3s4.s2g().u();
}
var properties_initialized_ByteReadPacket_kt_hw4st4;
function _init_properties_ByteReadPacket_kt__28475y() {
  if (!properties_initialized_ByteReadPacket_kt_hw4st4) {
    properties_initialized_ByteReadPacket_kt_hw4st4 = true;
    ByteReadPacketEmpty = new Buffer();
  }
}
function readAvailable_0(_this__u8e3s4, buffer, offset, length) {
  offset = offset === VOID ? 0 : offset;
  length = length === VOID ? buffer.length - offset | 0 : length;
  var result = _this__u8e3s4.l2h(buffer, offset, offset + length | 0);
  return result === -1 ? 0 : result;
}
function readText_0(_this__u8e3s4, charset, max) {
  charset = charset === VOID ? Charsets_getInstance().v2p_1 : charset;
  max = max === VOID ? 2147483647 : max;
  if (charset.equals(Charsets_getInstance().v2p_1)) {
    if (max === 2147483647)
      return readString(_this__u8e3s4);
    var tmp0 = _this__u8e3s4.s2g().u();
    // Inline function 'kotlin.math.min' call
    var b = fromInt(max);
    var count = compare(tmp0, b) <= 0 ? tmp0 : b;
    return readString_0(_this__u8e3s4, count);
  }
  return decode(charset.y2p(), _this__u8e3s4, max);
}
function toByteArray_0(_this__u8e3s4, charset) {
  charset = charset === VOID ? Charsets_getInstance().v2p_1 : charset;
  if (charset.equals(Charsets_getInstance().v2p_1))
    return encodeToByteArray(_this__u8e3s4, VOID, VOID, true);
  return encodeToByteArray_0(charset.z2p(), _this__u8e3s4, 0, _this__u8e3s4.length);
}
function writeText(_this__u8e3s4, text, fromIndex, toIndex, charset) {
  fromIndex = fromIndex === VOID ? 0 : fromIndex;
  toIndex = toIndex === VOID ? charSequenceLength(text) : toIndex;
  charset = charset === VOID ? Charsets_getInstance().v2p_1 : charset;
  if (charset === Charsets_getInstance().v2p_1) {
    return writeString(_this__u8e3s4, toString_1(text), fromIndex, toIndex);
  }
  encodeToImpl(charset.z2p(), _this__u8e3s4, text, fromIndex, toIndex);
}
function get_ByteArrayPool() {
  _init_properties_ByteArrayPool_kt__kfi3uj();
  return ByteArrayPool;
}
var ByteArrayPool;
function ByteArrayPool$1() {
  DefaultPool.call(this, 128);
}
protoOf(ByteArrayPool$1).d2q = function () {
  return new Int8Array(4096);
};
var properties_initialized_ByteArrayPool_kt_td6pfh;
function _init_properties_ByteArrayPool_kt__kfi3uj() {
  if (!properties_initialized_ByteArrayPool_kt_td6pfh) {
    properties_initialized_ByteArrayPool_kt_td6pfh = true;
    ByteArrayPool = new ByteArrayPool$1();
  }
}
function Companion_1() {
}
protoOf(Companion_1).m2q = function (name) {
  switch (name) {
    case 'UTF-8':
    case 'utf-8':
    case 'UTF8':
    case 'utf8':
      return Charsets_getInstance().v2p_1;
  }
  var tmp;
  var tmp_0;
  switch (name) {
    case 'ISO-8859-1':
    case 'iso-8859-1':
      tmp_0 = true;
      break;
    default:
      // Inline function 'kotlin.let' call

      var it = replace(name, _Char___init__impl__6a9atx(95), _Char___init__impl__6a9atx(45));
      var tmp_1;
      if (it === 'iso-8859-1') {
        tmp_1 = true;
      } else {
        // Inline function 'kotlin.text.lowercase' call
        // Inline function 'kotlin.js.asDynamic' call
        tmp_1 = it.toLowerCase() === 'iso-8859-1';
      }

      tmp_0 = tmp_1;
      break;
  }
  if (tmp_0) {
    tmp = true;
  } else {
    tmp = name === 'latin1' || name === 'Latin1';
  }
  if (tmp) {
    return Charsets_getInstance().w2p_1;
  }
  throw IllegalArgumentException_init_$Create$('Charset ' + name + ' is not supported');
};
var Companion_instance_2;
function Companion_getInstance_1() {
  return Companion_instance_2;
}
function Charset(_name) {
  this.x2p_1 = _name;
}
protoOf(Charset).equals = function (other) {
  if (this === other)
    return true;
  if (other == null || !(this.constructor == other.constructor))
    return false;
  if (!(other instanceof Charset))
    THROW_CCE();
  return this.x2p_1 === other.x2p_1;
};
protoOf(Charset).hashCode = function () {
  return getStringHashCode(this.x2p_1);
};
protoOf(Charset).toString = function () {
  return this.x2p_1;
};
function get_name(_this__u8e3s4) {
  return _this__u8e3s4.x2p_1;
}
function Charsets() {
  Charsets_instance = this;
  this.v2p_1 = new CharsetImpl('UTF-8');
  this.w2p_1 = new CharsetImpl('ISO-8859-1');
}
var Charsets_instance;
function Charsets_getInstance() {
  if (Charsets_instance == null)
    new Charsets();
  return Charsets_instance;
}
function MalformedInputException(message) {
  IOException_init_$Init$(message, this);
  captureStack(this, MalformedInputException);
}
function CharsetDecoder(_charset) {
  this.n2q_1 = _charset;
}
function forName(_this__u8e3s4, name) {
  return Companion_instance_2.m2q(name);
}
function CharsetEncoder(_charset) {
  this.o2q_1 = _charset;
}
function decode_0(_this__u8e3s4, input, dst, max) {
  var decoder = Decoder(get_name(get_charset(_this__u8e3s4)), true);
  var tmp0 = input.s2g().u();
  // Inline function 'kotlin.comparisons.minOf' call
  var b = fromInt(max);
  var count = compare(tmp0, b) <= 0 ? tmp0 : b;
  var tmp = readByteArray(input, convertToInt(count));
  var array = tmp instanceof Int8Array ? tmp : THROW_CCE();
  var tmp_0;
  try {
    tmp_0 = decoder.p2q(array);
  } catch ($p) {
    var tmp_1;
    if ($p instanceof Error) {
      var cause = $p;
      var tmp0_elvis_lhs = cause.message;
      throw new MalformedInputException('Failed to decode bytes: ' + (tmp0_elvis_lhs == null ? 'no cause provided' : tmp0_elvis_lhs));
    } else {
      throw $p;
    }
  }
  var result = tmp_0;
  dst.k(result);
  return result.length;
}
function encodeImpl(_this__u8e3s4, input, fromIndex, toIndex, dst) {
  // Inline function 'kotlin.require' call
  // Inline function 'kotlin.require' call
  if (!(fromIndex <= toIndex)) {
    var message = 'Failed requirement.';
    throw IllegalArgumentException_init_$Create$(toString_1(message));
  }
  if (get_charset_0(_this__u8e3s4).equals(Charsets_getInstance().w2p_1)) {
    return encodeISO88591(input, fromIndex, toIndex, dst);
  }
  // Inline function 'kotlin.require' call
  if (!(get_charset_0(_this__u8e3s4) === Charsets_getInstance().v2p_1)) {
    var message_0 = 'Only UTF-8 encoding is supported in JS';
    throw IllegalArgumentException_init_$Create$(toString_1(message_0));
  }
  var encoder = new TextEncoder();
  // Inline function 'kotlin.text.substring' call
  var tmp$ret$5 = toString_1(charSequenceSubSequence(input, fromIndex, toIndex));
  var result = encoder.encode(tmp$ret$5);
  // Inline function 'kotlin.js.unsafeCast' call
  // Inline function 'kotlin.js.asDynamic' call
  dst.y2h(result);
  return result.length;
}
function encodeToByteArray_0(_this__u8e3s4, input, fromIndex, toIndex) {
  fromIndex = fromIndex === VOID ? 0 : fromIndex;
  toIndex = toIndex === VOID ? charSequenceLength(input) : toIndex;
  return encodeToByteArrayImpl(_this__u8e3s4, input, fromIndex, toIndex);
}
function CharsetImpl(name) {
  Charset.call(this, name);
}
protoOf(CharsetImpl).z2p = function () {
  return new CharsetEncoderImpl(this);
};
protoOf(CharsetImpl).y2p = function () {
  return new CharsetDecoderImpl(this);
};
function get_charset(_this__u8e3s4) {
  return _this__u8e3s4.n2q_1;
}
function get_charset_0(_this__u8e3s4) {
  return _this__u8e3s4.o2q_1;
}
function encodeToByteArrayImpl(_this__u8e3s4, input, fromIndex, toIndex) {
  fromIndex = fromIndex === VOID ? 0 : fromIndex;
  toIndex = toIndex === VOID ? charSequenceLength(input) : toIndex;
  var start = fromIndex;
  if (start >= toIndex)
    return new Int8Array(0);
  var dst = new Buffer();
  var rc = encodeImpl(_this__u8e3s4, input, start, toIndex, dst);
  start = start + rc | 0;
  if (start === toIndex) {
    return readByteArray_0(dst);
  }
  encodeToImpl(_this__u8e3s4, dst, input, start, toIndex);
  return readByteArray_0(dst);
}
function CharsetEncoderImpl(charset) {
  CharsetEncoder.call(this, charset);
  this.s2q_1 = charset;
}
protoOf(CharsetEncoderImpl).toString = function () {
  return 'CharsetEncoderImpl(charset=' + this.s2q_1.toString() + ')';
};
protoOf(CharsetEncoderImpl).hashCode = function () {
  return this.s2q_1.hashCode();
};
protoOf(CharsetEncoderImpl).equals = function (other) {
  if (this === other)
    return true;
  if (!(other instanceof CharsetEncoderImpl))
    return false;
  var tmp0_other_with_cast = other instanceof CharsetEncoderImpl ? other : THROW_CCE();
  if (!this.s2q_1.equals(tmp0_other_with_cast.s2q_1))
    return false;
  return true;
};
function CharsetDecoderImpl(charset) {
  CharsetDecoder.call(this, charset);
  this.u2q_1 = charset;
}
protoOf(CharsetDecoderImpl).toString = function () {
  return 'CharsetDecoderImpl(charset=' + this.u2q_1.toString() + ')';
};
protoOf(CharsetDecoderImpl).hashCode = function () {
  return this.u2q_1.hashCode();
};
protoOf(CharsetDecoderImpl).equals = function (other) {
  if (this === other)
    return true;
  if (!(other instanceof CharsetDecoderImpl))
    return false;
  var tmp0_other_with_cast = other instanceof CharsetDecoderImpl ? other : THROW_CCE();
  if (!this.u2q_1.equals(tmp0_other_with_cast.u2q_1))
    return false;
  return true;
};
function Decoder(encoding, fatal) {
  fatal = fatal === VOID ? true : fatal;
  var tmp;
  try {
    tmp = toKtor(new TextDecoder(encoding, textDecoderOptions(fatal)));
  } catch ($p) {
    var tmp_0;
    if ($p instanceof Error) {
      var cause = $p;
      tmp_0 = new TextDecoderFallback(encoding, fatal);
    } else {
      throw $p;
    }
    tmp = tmp_0;
  }
  return tmp;
}
function toKtor(_this__u8e3s4) {
  return new toKtor$1(_this__u8e3s4);
}
function textDecoderOptions(fatal) {
  fatal = fatal === VOID ? false : fatal;
  // Inline function 'kotlin.apply' call
  var this_0 = new Object();
  // Inline function 'kotlin.js.asDynamic' call
  // Inline function 'kotlin.with' call
  this_0.fatal = fatal;
  return this_0;
}
function toKtor$1($this_toKtor) {
  this.v2q_1 = $this_toKtor;
}
protoOf(toKtor$1).p2q = function (buffer) {
  return this.v2q_1.decode(buffer);
};
function get_ENCODING_ALIASES() {
  _init_properties_TextDecoderFallback_js_kt__an7r6m();
  return ENCODING_ALIASES;
}
var ENCODING_ALIASES;
function get_REPLACEMENT() {
  _init_properties_TextDecoderFallback_js_kt__an7r6m();
  return REPLACEMENT;
}
var REPLACEMENT;
function TextDecoderFallback(encoding, fatal) {
  this.w2q_1 = fatal;
  // Inline function 'kotlin.text.trim' call
  // Inline function 'kotlin.text.lowercase' call
  // Inline function 'kotlin.js.asDynamic' call
  var requestedEncoding = toString_1(trim(isCharSequence(encoding) ? encoding : THROW_CCE())).toLowerCase();
  // Inline function 'kotlin.check' call
  if (!get_ENCODING_ALIASES().b2(requestedEncoding)) {
    var message = encoding + ' is not supported.';
    throw IllegalStateException_init_$Create$(toString_1(message));
  }
}
protoOf(TextDecoderFallback).p2q = function (buffer) {
  // Inline function 'io.ktor.utils.io.core.buildPacket' call
  var builder = new Buffer();
  var bytes = buffer instanceof Int8Array ? buffer : THROW_CCE();
  var inductionVariable = 0;
  var last = bytes.length;
  if (inductionVariable < last)
    $l$loop: do {
      var index = inductionVariable;
      inductionVariable = inductionVariable + 1 | 0;
      // Inline function 'org.khronos.webgl.get' call
      // Inline function 'kotlin.js.asDynamic' call
      var byte = bytes[index];
      var point = toCodePoint(byte);
      if (point < 0) {
        // Inline function 'kotlin.check' call
        if (!!this.w2q_1) {
          var message = 'Invalid character: ' + point;
          throw IllegalStateException_init_$Create$(toString_1(message));
        }
        writeFully_0(builder, get_REPLACEMENT());
        continue $l$loop;
      }
      if (point > 255) {
        builder.e2i(toByte(point >> 8));
      }
      builder.e2i(toByte(point & 255));
    }
     while (inductionVariable < last);
  return decodeToString(readByteArray_0(builder));
};
function toCodePoint(_this__u8e3s4) {
  _init_properties_TextDecoderFallback_js_kt__an7r6m();
  var value = _this__u8e3s4 & 255;
  if (isASCII(value)) {
    return value;
  }
  return get_WIN1252_TABLE()[value - 128 | 0];
}
function isASCII(_this__u8e3s4) {
  _init_properties_TextDecoderFallback_js_kt__an7r6m();
  return 0 <= _this__u8e3s4 ? _this__u8e3s4 <= 127 : false;
}
var properties_initialized_TextDecoderFallback_js_kt_6rekzk;
function _init_properties_TextDecoderFallback_js_kt__an7r6m() {
  if (!properties_initialized_TextDecoderFallback_js_kt_6rekzk) {
    properties_initialized_TextDecoderFallback_js_kt_6rekzk = true;
    ENCODING_ALIASES = setOf(['ansi_x3.4-1968', 'ascii', 'cp1252', 'cp819', 'csisolatin1', 'ibm819', 'iso-8859-1', 'iso-ir-100', 'iso8859-1', 'iso88591', 'iso_8859-1', 'iso_8859-1:1987', 'l1', 'latin1', 'us-ascii', 'windows-1252', 'x-cp1252']);
    // Inline function 'kotlin.byteArrayOf' call
    REPLACEMENT = new Int8Array([-17, -65, -67]);
  }
}
function Closeable() {
}
function encodeISO88591(input, fromIndex, toIndex, dst) {
  if (fromIndex >= toIndex)
    return 0;
  var inductionVariable = fromIndex;
  if (inductionVariable < toIndex)
    do {
      var index = inductionVariable;
      inductionVariable = inductionVariable + 1 | 0;
      // Inline function 'kotlin.code' call
      var this_0 = charSequenceGet(input, index);
      var character = Char__toInt_impl_vasixd(this_0);
      if (character > 255) {
        failedToMapError(character);
      }
      dst.e2i(toByte(character));
    }
     while (inductionVariable < toIndex);
  return toIndex - fromIndex | 0;
}
function failedToMapError(ch) {
  throw new MalformedInputException('The character with unicode point ' + ch + " couldn't be mapped to ISO-8859-1 character");
}
function get_WIN1252_TABLE() {
  _init_properties_Win1252Table_kt__tl0v64();
  return WIN1252_TABLE;
}
var WIN1252_TABLE;
var properties_initialized_Win1252Table_kt_pkmjoq;
function _init_properties_Win1252Table_kt__tl0v64() {
  if (!properties_initialized_Win1252Table_kt_pkmjoq) {
    properties_initialized_Win1252Table_kt_pkmjoq = true;
    // Inline function 'kotlin.intArrayOf' call
    WIN1252_TABLE = new Int32Array([8364, -1, 8218, 402, 8222, 8230, 8224, 8225, 710, 8240, 352, 8249, 338, -1, 381, -1, -1, 8216, 8217, 8220, 8221, 8226, 8211, 8212, 732, 8482, 353, 8250, 339, -1, 382, 376, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 174, 175, 176, 177, 178, 179, 180, 181, 182, 183, 184, 185, 186, 187, 188, 189, 190, 191, 192, 193, 194, 195, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 222, 223, 224, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 235, 236, 237, 238, 239, 240, 241, 242, 243, 244, 245, 246, 247, 248, 249, 250, 251, 252, 253, 254, 255]);
  }
}
function DefaultPool(capacity) {
  this.e2q_1 = capacity;
  var tmp = this;
  // Inline function 'kotlin.arrayOfNulls' call
  var size = this.e2q_1;
  tmp.f2q_1 = Array(size);
  this.g2q_1 = 0;
}
protoOf(DefaultPool).h2q = function (instance) {
};
protoOf(DefaultPool).i2q = function (instance) {
  return instance;
};
protoOf(DefaultPool).j2q = function (instance) {
};
protoOf(DefaultPool).k2q = function () {
  if (this.g2q_1 === 0)
    return this.d2q();
  this.g2q_1 = this.g2q_1 - 1 | 0;
  var idx = this.g2q_1;
  var tmp = this.f2q_1[idx];
  var instance = !(tmp == null) ? tmp : THROW_CCE();
  this.f2q_1[idx] = null;
  return this.i2q(instance);
};
protoOf(DefaultPool).l2q = function (instance) {
  this.j2q(instance);
  if (this.g2q_1 === this.e2q_1) {
    this.h2q(instance);
  } else {
    var _unary__edvuaz = this.g2q_1;
    this.g2q_1 = _unary__edvuaz + 1 | 0;
    this.f2q_1[_unary__edvuaz] = instance;
  }
};
function get_DEVELOPMENT_MODE() {
  return false;
}
//region block: post-declaration
protoOf(Read).q2j = resume;
protoOf(Read).r2j = resume_0;
protoOf(Write).q2j = resume;
protoOf(Write).r2j = resume_0;
protoOf(ByteChannel).t2l = awaitContent$default;
protoOf(ByteReadChannel$Companion$Empty$1).t2l = awaitContent$default;
protoOf(SourceByteReadChannel).t2l = awaitContent$default;
//endregion
//region block: init
Empty_instance = new Empty();
Companion_instance_2 = new Companion_1();
//endregion
//region block: exports
export {
  copyTo as copyTo2vm7vz7rr51or,
  readAvailable as readAvailable22vc1bmbuj93x,
  readPacket as readPacket2q2gamtzwxjd1,
  readRemaining as readRemaining1x8kk1vq7p6gm,
  toByteArray as toByteArrayafjflk7yznm4,
  writeFully as writeFully3gv1ab611t04k,
  writePacket as writePacketg3gtxxix1x9l,
  Charsets_getInstance as Charsets_getInstanceqs70pvl4noow,
  Companion_getInstance_0 as Companion_getInstance2ai11rhpust2a,
  MalformedInputException as MalformedInputExceptionbvc6h5ij0ias,
  decode as decode1t43jmuxrxpmo,
  encode as encode35e4rpnc94tb5,
  forName as forName2faodmskqnoz5,
  get_name as get_name2f11g4r0d5pxp,
  BytePacketBuilder as BytePacketBuilder2biodf4wxvlba,
  Closeable as Closeableu07ioona9oji,
  build as buildjygoh729rhy8,
  canRead as canRead1guo8vbveth0f,
  readText_0 as readText27783kyxjxi1g,
  takeWhile as takeWhile34751tcfg6owx,
  toByteArray_0 as toByteArray1i3ns5jnoqlv6,
  writeFully_0 as writeFully359t6q8kam2g5,
  writePacket_0 as writePacket1weetk0dtcyx2,
  writeText as writeText19qfzm98fbm4l,
  get_ByteArrayPool as get_ByteArrayPool3f7yrgvqxz9ct,
  ByteReadChannel as ByteReadChannel1cb89sbyipkce,
  ByteReadChannel_1 as ByteReadChannel2wzou76jce72d,
  WriterScope as WriterScope3b0bo1enaee6b,
  get_availableForRead as get_availableForRead28yb35u7qm4tu,
  cancel_0 as canceldn4b3cdqcfny,
  close as close3semq7pafb42g,
  invokeOnCompletion as invokeOnCompletionvmw9mjsupd6z,
  get_isCompleted as get_isCompleted2vv2dxgxvs29m,
  readText as readText3frapgncbqrcg,
  writer as writer1eia5its2a1fh,
};
//endregion

//# sourceMappingURL=ktor-ktor-io.mjs.map
