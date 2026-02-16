import {
  collectionSizeOrDefault36dulx8yinfqm as collectionSizeOrDefault,
  mapCapacity1h45rc3eh9p2l as mapCapacity,
  coerceAtLeast2bkz8m9ik7hep as coerceAtLeast,
  LinkedHashMap_init_$Create$23uxki4opd0pn as LinkedHashMap_init_$Create$,
  Unit_instance1fbcbse1fwigr as Unit_instance,
  protoOf180f3jzyo7rfj as protoOf,
  initMetadataForCompanion1wyw17z38v6ac as initMetadataForCompanion,
  enumEntries20mr21zbe3az4 as enumEntries,
  Enum3alwj03lh1n41 as Enum,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
  VOID3gxj6tk5isa35 as VOID,
  toString1pkumu07cwy4m as toString,
  getStringHashCode26igk1bx568vk as getStringHashCode,
  THROW_CCE2g6jy02ryeudk as THROW_CCE,
  initMetadataForObject1cxne3s9w65el as initMetadataForObject,
  compareTo3ankvs086tmwq as compareTo,
  ensureNotNull1e947j3ixpazm as ensureNotNull,
  objectCreate1ve4bgxiu4x98 as objectCreate,
} from './kotlin-kotlin-stdlib.mjs';
import {
  toByteArray1i3ns5jnoqlv6 as toByteArray,
  writeText19qfzm98fbm4l as writeText,
} from './ktor-ktor-io.mjs';
import {
  Buffergs925ekssbch as Buffer,
  readByteArray1ri21h2rciakw as readByteArray,
} from './kotlinx-io-kotlinx-io-core.mjs';
//region block: imports
var imul = Math.imul;
//endregion
//region block: pre-declaration
initMetadataForCompanion(Companion);
initMetadataForClass(Codes, 'Codes', VOID, Enum);
initMetadataForClass(CloseReason, 'CloseReason');
initMetadataForObject(NonDisposableHandle, 'NonDisposableHandle');
initMetadataForCompanion(Companion_0);
initMetadataForClass(FrameType, 'FrameType', VOID, Enum);
initMetadataForClass(Frame, 'Frame');
initMetadataForClass(Binary, 'Binary', VOID, Frame);
initMetadataForClass(Text, 'Text', VOID, Frame);
initMetadataForClass(Close, 'Close', Close_init_$Create$_0, Frame);
initMetadataForCompanion(Companion_1);
//endregion
var Codes_NORMAL_instance;
var Codes_GOING_AWAY_instance;
var Codes_PROTOCOL_ERROR_instance;
var Codes_CANNOT_ACCEPT_instance;
var Codes_CLOSED_ABNORMALLY_instance;
var Codes_NOT_CONSISTENT_instance;
var Codes_VIOLATED_POLICY_instance;
var Codes_TOO_BIG_instance;
var Codes_NO_EXTENSION_instance;
var Codes_INTERNAL_ERROR_instance;
var Codes_SERVICE_RESTART_instance;
var Codes_TRY_AGAIN_LATER_instance;
function Companion() {
  Companion_instance = this;
  var tmp = this;
  // Inline function 'kotlin.collections.associateBy' call
  var this_0 = get_entries();
  var capacity = coerceAtLeast(mapCapacity(collectionSizeOrDefault(this_0, 10)), 16);
  // Inline function 'kotlin.collections.associateByTo' call
  var destination = LinkedHashMap_init_$Create$(capacity);
  var _iterator__ex2g4s = this_0.r();
  while (_iterator__ex2g4s.s()) {
    var element = _iterator__ex2g4s.t();
    var tmp$ret$0 = element.o38_1;
    destination.f2(tmp$ret$0, element);
  }
  tmp.p38_1 = destination;
  this.q38_1 = Codes_INTERNAL_ERROR_getInstance();
}
protoOf(Companion).r38 = function (code) {
  return this.p38_1.n2(code);
};
var Companion_instance;
function Companion_getInstance() {
  Codes_initEntries();
  if (Companion_instance == null)
    new Companion();
  return Companion_instance;
}
function values() {
  return [Codes_NORMAL_getInstance(), Codes_GOING_AWAY_getInstance(), Codes_PROTOCOL_ERROR_getInstance(), Codes_CANNOT_ACCEPT_getInstance(), Codes_CLOSED_ABNORMALLY_getInstance(), Codes_NOT_CONSISTENT_getInstance(), Codes_VIOLATED_POLICY_getInstance(), Codes_TOO_BIG_getInstance(), Codes_NO_EXTENSION_getInstance(), Codes_INTERNAL_ERROR_getInstance(), Codes_SERVICE_RESTART_getInstance(), Codes_TRY_AGAIN_LATER_getInstance()];
}
function get_entries() {
  if ($ENTRIES == null)
    $ENTRIES = enumEntries(values());
  return $ENTRIES;
}
var Codes_entriesInitialized;
function Codes_initEntries() {
  if (Codes_entriesInitialized)
    return Unit_instance;
  Codes_entriesInitialized = true;
  Codes_NORMAL_instance = new Codes('NORMAL', 0, 1000);
  Codes_GOING_AWAY_instance = new Codes('GOING_AWAY', 1, 1001);
  Codes_PROTOCOL_ERROR_instance = new Codes('PROTOCOL_ERROR', 2, 1002);
  Codes_CANNOT_ACCEPT_instance = new Codes('CANNOT_ACCEPT', 3, 1003);
  Codes_CLOSED_ABNORMALLY_instance = new Codes('CLOSED_ABNORMALLY', 4, 1006);
  Codes_NOT_CONSISTENT_instance = new Codes('NOT_CONSISTENT', 5, 1007);
  Codes_VIOLATED_POLICY_instance = new Codes('VIOLATED_POLICY', 6, 1008);
  Codes_TOO_BIG_instance = new Codes('TOO_BIG', 7, 1009);
  Codes_NO_EXTENSION_instance = new Codes('NO_EXTENSION', 8, 1010);
  Codes_INTERNAL_ERROR_instance = new Codes('INTERNAL_ERROR', 9, 1011);
  Codes_SERVICE_RESTART_instance = new Codes('SERVICE_RESTART', 10, 1012);
  Codes_TRY_AGAIN_LATER_instance = new Codes('TRY_AGAIN_LATER', 11, 1013);
  Companion_getInstance();
}
var $ENTRIES;
function Codes(name, ordinal, code) {
  Enum.call(this, name, ordinal);
  this.o38_1 = code;
}
function Codes_NORMAL_getInstance() {
  Codes_initEntries();
  return Codes_NORMAL_instance;
}
function Codes_GOING_AWAY_getInstance() {
  Codes_initEntries();
  return Codes_GOING_AWAY_instance;
}
function Codes_PROTOCOL_ERROR_getInstance() {
  Codes_initEntries();
  return Codes_PROTOCOL_ERROR_instance;
}
function Codes_CANNOT_ACCEPT_getInstance() {
  Codes_initEntries();
  return Codes_CANNOT_ACCEPT_instance;
}
function Codes_CLOSED_ABNORMALLY_getInstance() {
  Codes_initEntries();
  return Codes_CLOSED_ABNORMALLY_instance;
}
function Codes_NOT_CONSISTENT_getInstance() {
  Codes_initEntries();
  return Codes_NOT_CONSISTENT_instance;
}
function Codes_VIOLATED_POLICY_getInstance() {
  Codes_initEntries();
  return Codes_VIOLATED_POLICY_instance;
}
function Codes_TOO_BIG_getInstance() {
  Codes_initEntries();
  return Codes_TOO_BIG_instance;
}
function Codes_NO_EXTENSION_getInstance() {
  Codes_initEntries();
  return Codes_NO_EXTENSION_instance;
}
function Codes_INTERNAL_ERROR_getInstance() {
  Codes_initEntries();
  return Codes_INTERNAL_ERROR_instance;
}
function Codes_SERVICE_RESTART_getInstance() {
  Codes_initEntries();
  return Codes_SERVICE_RESTART_instance;
}
function Codes_TRY_AGAIN_LATER_getInstance() {
  Codes_initEntries();
  return Codes_TRY_AGAIN_LATER_instance;
}
function CloseReason(code, message) {
  this.s38_1 = code;
  this.t38_1 = message;
}
protoOf(CloseReason).u38 = function () {
  return Companion_getInstance().r38(this.s38_1);
};
protoOf(CloseReason).toString = function () {
  var tmp0_elvis_lhs = this.u38();
  return 'CloseReason(reason=' + toString(tmp0_elvis_lhs == null ? this.s38_1 : tmp0_elvis_lhs) + ', message=' + this.t38_1 + ')';
};
protoOf(CloseReason).hashCode = function () {
  var result = this.s38_1;
  result = imul(result, 31) + getStringHashCode(this.t38_1) | 0;
  return result;
};
protoOf(CloseReason).equals = function (other) {
  if (this === other)
    return true;
  if (!(other instanceof CloseReason))
    return false;
  var tmp0_other_with_cast = other instanceof CloseReason ? other : THROW_CCE();
  if (!(this.s38_1 === tmp0_other_with_cast.s38_1))
    return false;
  if (!(this.t38_1 === tmp0_other_with_cast.t38_1))
    return false;
  return true;
};
function NonDisposableHandle() {
}
protoOf(NonDisposableHandle).e1u = function () {
  return Unit_instance;
};
protoOf(NonDisposableHandle).toString = function () {
  return 'NonDisposableHandle';
};
protoOf(NonDisposableHandle).hashCode = function () {
  return 207988788;
};
protoOf(NonDisposableHandle).equals = function (other) {
  if (this === other)
    return true;
  if (!(other instanceof NonDisposableHandle))
    return false;
  other instanceof NonDisposableHandle || THROW_CCE();
  return true;
};
var NonDisposableHandle_instance;
function NonDisposableHandle_getInstance() {
  return NonDisposableHandle_instance;
}
var FrameType_TEXT_instance;
var FrameType_BINARY_instance;
var FrameType_CLOSE_instance;
var FrameType_PING_instance;
var FrameType_PONG_instance;
function Companion_0() {
  Companion_instance_0 = this;
  var tmp = this;
  var tmp0 = get_entries_0();
  var tmp$ret$0;
  $l$block_0: {
    // Inline function 'kotlin.collections.maxByOrNull' call
    var iterator = tmp0.r();
    if (!iterator.s()) {
      tmp$ret$0 = null;
      break $l$block_0;
    }
    var maxElem = iterator.t();
    if (!iterator.s()) {
      tmp$ret$0 = maxElem;
      break $l$block_0;
    }
    var maxValue = maxElem.y38_1;
    do {
      var e = iterator.t();
      var v = e.y38_1;
      if (compareTo(maxValue, v) < 0) {
        maxElem = e;
        maxValue = v;
      }
    }
     while (iterator.s());
    tmp$ret$0 = maxElem;
  }
  tmp.z38_1 = ensureNotNull(tmp$ret$0).y38_1;
  var tmp_0 = this;
  var tmp_1 = 0;
  var tmp_2 = this.z38_1 + 1 | 0;
  // Inline function 'kotlin.arrayOfNulls' call
  var tmp_3 = Array(tmp_2);
  while (tmp_1 < tmp_2) {
    var tmp_4 = tmp_1;
    var tmp0_0 = get_entries_0();
    var tmp$ret$5;
    $l$block_2: {
      // Inline function 'kotlin.collections.singleOrNull' call
      var single = null;
      var found = false;
      var _iterator__ex2g4s = tmp0_0.r();
      while (_iterator__ex2g4s.s()) {
        var element = _iterator__ex2g4s.t();
        if (element.y38_1 === tmp_4) {
          if (found) {
            tmp$ret$5 = null;
            break $l$block_2;
          }
          single = element;
          found = true;
        }
      }
      if (!found) {
        tmp$ret$5 = null;
        break $l$block_2;
      }
      tmp$ret$5 = single;
    }
    tmp_3[tmp_4] = tmp$ret$5;
    tmp_1 = tmp_1 + 1 | 0;
  }
  tmp_0.a39_1 = tmp_3;
}
var Companion_instance_0;
function Companion_getInstance_0() {
  FrameType_initEntries();
  if (Companion_instance_0 == null)
    new Companion_0();
  return Companion_instance_0;
}
function values_0() {
  return [FrameType_TEXT_getInstance(), FrameType_BINARY_getInstance(), FrameType_CLOSE_getInstance(), FrameType_PING_getInstance(), FrameType_PONG_getInstance()];
}
function get_entries_0() {
  if ($ENTRIES_0 == null)
    $ENTRIES_0 = enumEntries(values_0());
  return $ENTRIES_0;
}
var FrameType_entriesInitialized;
function FrameType_initEntries() {
  if (FrameType_entriesInitialized)
    return Unit_instance;
  FrameType_entriesInitialized = true;
  FrameType_TEXT_instance = new FrameType('TEXT', 0, false, 1);
  FrameType_BINARY_instance = new FrameType('BINARY', 1, false, 2);
  FrameType_CLOSE_instance = new FrameType('CLOSE', 2, true, 8);
  FrameType_PING_instance = new FrameType('PING', 3, true, 9);
  FrameType_PONG_instance = new FrameType('PONG', 4, true, 10);
  Companion_getInstance_0();
}
var $ENTRIES_0;
function FrameType(name, ordinal, controlFrame, opcode) {
  Enum.call(this, name, ordinal);
  this.x38_1 = controlFrame;
  this.y38_1 = opcode;
}
function FrameType_TEXT_getInstance() {
  FrameType_initEntries();
  return FrameType_TEXT_instance;
}
function FrameType_BINARY_getInstance() {
  FrameType_initEntries();
  return FrameType_BINARY_instance;
}
function FrameType_CLOSE_getInstance() {
  FrameType_initEntries();
  return FrameType_CLOSE_instance;
}
function FrameType_PING_getInstance() {
  FrameType_initEntries();
  return FrameType_PING_instance;
}
function FrameType_PONG_getInstance() {
  FrameType_initEntries();
  return FrameType_PONG_instance;
}
function Binary_init_$Init$(fin, data, $this) {
  Binary.call($this, fin, data, false, false, false);
  return $this;
}
function Binary_init_$Create$(fin, data) {
  return Binary_init_$Init$(fin, data, objectCreate(protoOf(Binary)));
}
function Text_init_$Init$(fin, data, $this) {
  Text.call($this, fin, data, false, false, false);
  return $this;
}
function Text_init_$Init$_0(text, $this) {
  Text_init_$Init$(true, toByteArray(text), $this);
  return $this;
}
function Text_init_$Create$(text) {
  return Text_init_$Init$_0(text, objectCreate(protoOf(Text)));
}
function Close_init_$Init$(reason, $this) {
  // Inline function 'io.ktor.utils.io.core.buildPacket' call
  var builder = new Buffer();
  builder.g2i(reason.s38_1);
  writeText(builder, reason.t38_1);
  Close_init_$Init$_0(builder, $this);
  return $this;
}
function Close_init_$Create$(reason) {
  return Close_init_$Init$(reason, objectCreate(protoOf(Close)));
}
function Close_init_$Init$_0(packet, $this) {
  Close.call($this, readByteArray(packet));
  return $this;
}
function Close_init_$Init$_1($this) {
  Close.call($this, Companion_getInstance_1().b39_1);
  return $this;
}
function Close_init_$Create$_0() {
  return Close_init_$Init$_1(objectCreate(protoOf(Close)));
}
function Binary(fin, data, rsv1, rsv2, rsv3) {
  rsv1 = rsv1 === VOID ? false : rsv1;
  rsv2 = rsv2 === VOID ? false : rsv2;
  rsv3 = rsv3 === VOID ? false : rsv3;
  Frame.call(this, fin, FrameType_BINARY_getInstance(), data, NonDisposableHandle_instance, rsv1, rsv2, rsv3);
}
function Text(fin, data, rsv1, rsv2, rsv3) {
  rsv1 = rsv1 === VOID ? false : rsv1;
  rsv2 = rsv2 === VOID ? false : rsv2;
  rsv3 = rsv3 === VOID ? false : rsv3;
  Frame.call(this, fin, FrameType_TEXT_getInstance(), data, NonDisposableHandle_instance, rsv1, rsv2, rsv3);
}
function Close(data) {
  Frame.call(this, true, FrameType_CLOSE_getInstance(), data, NonDisposableHandle_instance, false, false, false);
}
function Companion_1() {
  Companion_instance_1 = this;
  this.b39_1 = new Int8Array(0);
}
var Companion_instance_1;
function Companion_getInstance_1() {
  if (Companion_instance_1 == null)
    new Companion_1();
  return Companion_instance_1;
}
function Frame(fin, frameType, data, disposableHandle, rsv1, rsv2, rsv3) {
  Companion_getInstance_1();
  disposableHandle = disposableHandle === VOID ? NonDisposableHandle_instance : disposableHandle;
  rsv1 = rsv1 === VOID ? false : rsv1;
  rsv2 = rsv2 === VOID ? false : rsv2;
  rsv3 = rsv3 === VOID ? false : rsv3;
  this.c39_1 = fin;
  this.d39_1 = frameType;
  this.e39_1 = data;
  this.f39_1 = disposableHandle;
  this.g39_1 = rsv1;
  this.h39_1 = rsv2;
  this.i39_1 = rsv3;
}
protoOf(Frame).toString = function () {
  return 'Frame ' + this.d39_1.toString() + ' (fin=' + this.c39_1 + ', buffer len = ' + this.e39_1.length + ')';
};
//region block: init
NonDisposableHandle_instance = new NonDisposableHandle();
//endregion
//region block: exports
export {
  Codes_CLOSED_ABNORMALLY_getInstance as Codes_CLOSED_ABNORMALLY_getInstance36fk4x8bui0mi,
  Codes_NORMAL_getInstance as Codes_NORMAL_getInstance2p2d63s1iongn,
  Binary_init_$Create$ as Binary_init_$Create$3ard3o30qds9x,
  Close_init_$Create$ as Close_init_$Create$37951fhr84rmk,
  Text_init_$Create$ as Text_init_$Create$j4ennvj3nfor,
  Companion_getInstance as Companion_getInstance3hj6iykoiauw8,
  CloseReason as CloseReason10cphaqpp3ct7,
};
//endregion

//# sourceMappingURL=ktor-ktor-shared-ktor-websockets.mjs.map
