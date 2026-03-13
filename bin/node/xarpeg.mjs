import {
  KProperty1ca4yb4wlo496 as KProperty1,
  getPropertyCallableRef3hckxc0xueiaj as getPropertyCallableRef,
  LinkedHashMap_init_$Create$3t495nfs82xn as LinkedHashMap_init_$Create$,
  LinkedHashSet_init_$Create$2lru2gvxodydo as LinkedHashSet_init_$Create$,
  lazy2hsh8ze7j6ikd as lazy,
  protoOf180f3jzyo7rfj as protoOf,
  Paire9pteg33gng7 as Pair,
  THROW_CCE2g6jy02ryeudk as THROW_CCE,
  KtMap140uvy3s5zad8 as KtMap,
  isInterface3d6p8outrmvmk as isInterface,
  Unit_instance28fytmsmm6r23 as Unit_instance,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
  ArrayList_init_$Create$1jemgvhi5v0js as ArrayList_init_$Create$,
  Regex_init_$Create$9xrx4twz2i6q as Regex_init_$Create$,
  toString1pkumu07cwy4m as toString,
  IllegalArgumentException_init_$Create$1j1aj36nbo0wg as IllegalArgumentException_init_$Create$,
  binarySearch1nmlzx9onl5pm as binarySearch,
  initMetadataForInterface1egvbzx539z91 as initMetadataForInterface,
  hashCodeq5arwsb9dgti as hashCode,
  equals2au1ep9vhcato as equals,
  Exceptiondt2hlxn7j7vw as Exception,
  Exception_init_$Init$2jymvyiuv5u42 as Exception_init_$Init$,
  captureStack1fzi4aczwc4hg as captureStack,
  VOID3gxj6tk5isa35 as VOID,
  throwOnFailure24snjmtlqgzo8 as throwOnFailure,
  _Result___get_value__impl__bjfvqg3630bgmytqwyb as _Result___get_value__impl__bjfvqg,
  substringiqarkczpya5m as substring,
  Companion_instance25ullnynvxd0w as Companion_instance,
  createFailure8paxfkfa5dc7 as createFailure,
  _Result___init__impl__xyqfz83a5421h46yeyh as _Result___init__impl__xyqfz8,
  StringBuilder_init_$Create$322n630qt3r8c as StringBuilder_init_$Create$,
  charSequenceLength3278n89t01tmv as charSequenceLength,
  charSequenceGet1vxk1y5n17t1z as charSequenceGet,
  toString3dhdjl9yf50de as toString_0,
  isISOControl2rcg25qorqppr as isISOControl,
  _Char___init__impl__6a9atx1csff5kwtduxl as _Char___init__impl__6a9atx,
  Char__toInt_impl_vasixd3jl92hthlhyn7 as Char__toInt_impl_vasixd,
  Char__plus_impl_qi7pgjyhbgymrgrgr1 as Char__plus_impl_qi7pgj,
  Char19o2r8palgjof as Char,
  initMetadataForCompanion1wyw17z38v6ac as initMetadataForCompanion,
  charCodeAt1yspne1d8erbm as charCodeAt,
  initMetadataForObject1cxne3s9w65el as initMetadataForObject,
  toList383f556t1dixk as toList,
  plus20p0vtfmu0596 as plus,
  listOf1jh22dvmctj1r as listOf,
  replace3le3ie7l9k8aq as replace,
  toString30pk9tzaqopn as toString_1,
} from './kotlin-kotlin-stdlib.mjs';
//region block: imports
var imul = Math.imul;
//endregion
//region block: pre-declaration
initMetadataForClass(ParseContext, 'ParseContext');
initMetadataForClass(MatrixPositionCalculator, 'MatrixPositionCalculator');
initMetadataForClass(MatrixPosition, 'MatrixPosition');
function get_name() {
  return null;
}
initMetadataForInterface(Parser, 'Parser');
initMetadataForClass(ParseResult, 'ParseResult');
initMetadataForClass(ParseException, 'ParseException', VOID, Exception);
initMetadataForCompanion(Companion);
initMetadataForClass(CharParser, 'CharParser', VOID, VOID, [Parser]);
initMetadataForObject(EndOfInputParser, 'EndOfInputParser', VOID, VOID, [Parser]);
initMetadataForClass(FixedParser, 'FixedParser', VOID, VOID, [Parser]);
initMetadataForClass(ListParser, 'ListParser', VOID, VOID, [Parser]);
initMetadataForClass(map$$inlined$Parser$1, VOID, VOID, VOID, [Parser]);
initMetadataForClass(mapEx$$inlined$Parser$1, VOID, VOID, VOID, [Parser]);
initMetadataForClass(NegativeLookAheadParser, 'NegativeLookAheadParser', VOID, VOID, [Parser]);
initMetadataForClass(OptionalParser, 'OptionalParser', VOID, VOID, [Parser]);
initMetadataForClass(OrParser, 'OrParser', VOID, VOID, [Parser]);
initMetadataForClass(leftAssociative$$inlined$Parser$1, VOID, VOID, VOID, [Parser]);
initMetadataForClass(ReferenceParser, 'ReferenceParser', VOID, VOID, [Parser]);
initMetadataForClass(RegexParser, 'RegexParser', VOID, VOID, [Parser]);
initMetadataForCompanion(Companion_0);
initMetadataForClass(StringParser, 'StringParser', VOID, VOID, [Parser]);
initMetadataForObject(Tuple0, 'Tuple0');
initMetadataForClass(Tuple4, 'Tuple4');
initMetadataForClass(Tuple3, 'Tuple3');
initMetadataForClass(Tuple2, 'Tuple2');
initMetadataForClass(Tuple1, 'Tuple1');
initMetadataForClass(combine$$inlined$Parser$1, VOID, VOID, VOID, [Parser]);
//endregion
function _get_matrixPositionCalculator__q69tgh($this) {
  var tmp0 = $this.p5b_1;
  var tmp = KProperty1;
  // Inline function 'kotlin.getValue' call
  getPropertyCallableRef('matrixPositionCalculator', 1, tmp, ParseContext$_get_matrixPositionCalculator_$ref_3y2b56(), null);
  return tmp0.u1();
}
function ParseContext$matrixPositionCalculator$delegate$lambda(this$0) {
  return function () {
    return new MatrixPositionCalculator(this$0.i5b_1);
  };
}
function ParseContext$_get_matrixPositionCalculator_$ref_3y2b56() {
  return function (p0) {
    return _get_matrixPositionCalculator__q69tgh(p0);
  };
}
function parseOrNull$parse(this$0, $parser, $start) {
  var tmp;
  if (!this$0.l5b_1 && !($parser.m() == null)) {
    this$0.l5b_1 = true;
    var tmp_0;
    try {
      tmp_0 = $parser.q5b(this$0, $start);
    }finally {
      this$0.l5b_1 = false;
    }
    var result = tmp_0;
    tmp = result;
  } else {
    tmp = $parser.q5b(this$0, $start);
  }
  return tmp;
}
function ParseContext(src, useMemoization) {
  this.i5b_1 = src;
  this.j5b_1 = useMemoization;
  var tmp = this;
  // Inline function 'kotlin.collections.mutableMapOf' call
  tmp.k5b_1 = LinkedHashMap_init_$Create$();
  this.l5b_1 = false;
  this.m5b_1 = false;
  this.n5b_1 = 0;
  var tmp_0 = this;
  // Inline function 'kotlin.collections.mutableSetOf' call
  tmp_0.o5b_1 = LinkedHashSet_init_$Create$();
  var tmp_1 = this;
  tmp_1.p5b_1 = lazy(ParseContext$matrixPositionCalculator$delegate$lambda(this));
}
protoOf(ParseContext).r5b = function (index) {
  return _get_matrixPositionCalculator__q69tgh(this).r5b(index);
};
protoOf(ParseContext).v5b = function (parser, start) {
  var tmp;
  if (this.j5b_1) {
    var key = new Pair(parser, start);
    var tmp_0;
    // Inline function 'kotlin.collections.contains' call
    // Inline function 'kotlin.collections.containsKey' call
    var this_0 = this.k5b_1;
    if ((isInterface(this_0, KtMap) ? this_0 : THROW_CCE()).b3(key)) {
      var tmp_1 = this.k5b_1.d3(key);
      tmp_0 = (tmp_1 == null ? true : tmp_1 instanceof ParseResult) ? tmp_1 : THROW_CCE();
    } else {
      var result = parseOrNull$parse(this, parser, start);
      // Inline function 'kotlin.collections.set' call
      this.k5b_1.v2(key, result);
      tmp_0 = result;
    }
    tmp = tmp_0;
  } else {
    tmp = parseOrNull$parse(this, parser, start);
  }
  var result_0 = tmp;
  if (result_0 == null && !this.l5b_1 && !this.m5b_1 && start >= this.n5b_1) {
    if (start > this.n5b_1) {
      this.n5b_1 = start;
      this.o5b_1.y2();
    }
    if (!(parser.m() == null) && !(parser.m() === '')) {
      // Inline function 'kotlin.collections.plusAssign' call
      this.o5b_1.b1(parser);
    }
  }
  return result_0;
};
function MatrixPositionCalculator(src) {
  this.s5b_1 = src;
  var tmp = this;
  // Inline function 'kotlin.collections.mutableListOf' call
  tmp.t5b_1 = ArrayList_init_$Create$();
  var tmp_0 = this;
  // Inline function 'kotlin.collections.mutableListOf' call
  tmp_0.u5b_1 = ArrayList_init_$Create$();
  // Inline function 'kotlin.collections.plusAssign' call
  this.t5b_1.b1(0);
  // Inline function 'kotlin.text.toRegex' call
  var this_0 = '\\n|\\r\\n?';
  var result = Regex_init_$Create$(this_0).bd(this.s5b_1);
  while (!(result == null)) {
    var tmp0 = this.u5b_1;
    // Inline function 'kotlin.collections.plusAssign' call
    var element = result.gd().x1_1;
    tmp0.b1(element);
    var tmp0_0 = this.t5b_1;
    // Inline function 'kotlin.collections.plusAssign' call
    var element_0 = result.gd().y1_1 + 1 | 0;
    tmp0_0.b1(element_0);
    result = result.v();
  }
  var tmp0_1 = this.u5b_1;
  // Inline function 'kotlin.collections.plusAssign' call
  var element_1 = this.s5b_1.length;
  tmp0_1.b1(element_1);
}
protoOf(MatrixPositionCalculator).r5b = function (index) {
  // Inline function 'kotlin.require' call
  if (!(0 <= index ? index <= this.s5b_1.length : false)) {
    var message = 'index (' + index + ') is out of range for src of length ' + this.s5b_1.length;
    throw IllegalArgumentException_init_$Create$(toString(message));
  }
  // Inline function 'kotlin.let' call
  var it = binarySearch(this.t5b_1, index);
  var lineIndex = it >= 0 ? it : ((-it | 0) - 1 | 0) - 1 | 0;
  var lineStartIndex = this.t5b_1.m1(lineIndex);
  return new MatrixPosition(lineIndex + 1 | 0, (index - lineStartIndex | 0) + 1 | 0);
};
function MatrixPosition(row, column) {
  this.w5b_1 = row;
  this.x5b_1 = column;
}
protoOf(MatrixPosition).toString = function () {
  return 'MatrixPosition(row=' + this.w5b_1 + ', column=' + this.x5b_1 + ')';
};
protoOf(MatrixPosition).hashCode = function () {
  var result = this.w5b_1;
  result = imul(result, 31) + this.x5b_1 | 0;
  return result;
};
protoOf(MatrixPosition).equals = function (other) {
  if (this === other)
    return true;
  if (!(other instanceof MatrixPosition))
    return false;
  if (!(this.w5b_1 === other.w5b_1))
    return false;
  if (!(this.x5b_1 === other.x5b_1))
    return false;
  return true;
};
function Parser() {
}
function ParseResult(value, start, end) {
  this.y5b_1 = value;
  this.z5b_1 = start;
  this.a5c_1 = end;
}
protoOf(ParseResult).toString = function () {
  return 'ParseResult(value=' + toString(this.y5b_1) + ', start=' + this.z5b_1 + ', end=' + this.a5c_1 + ')';
};
protoOf(ParseResult).hashCode = function () {
  var result = hashCode(this.y5b_1);
  result = imul(result, 31) + this.z5b_1 | 0;
  result = imul(result, 31) + this.a5c_1 | 0;
  return result;
};
protoOf(ParseResult).equals = function (other) {
  if (this === other)
    return true;
  if (!(other instanceof ParseResult))
    return false;
  if (!equals(this.y5b_1, other.y5b_1))
    return false;
  if (!(this.z5b_1 === other.z5b_1))
    return false;
  if (!(this.a5c_1 === other.a5c_1))
    return false;
  return true;
};
function ParseException(context, position) {
  // Inline function 'kotlin.run' call
  var matrixPosition = context.r5b(position);
  var tmp$ret$1 = 'Syntax Error at ' + matrixPosition.w5b_1 + ':' + matrixPosition.x5b_1;
  Exception_init_$Init$(tmp$ret$1, this);
  captureStack(this, ParseException);
  this.b5c_1 = context;
  this.c5c_1 = position;
}
function parseAllOrThrow(_this__u8e3s4, src, useMemoization) {
  useMemoization = useMemoization === VOID ? true : useMemoization;
  // Inline function 'kotlin.getOrThrow' call
  var this_0 = parseAll(_this__u8e3s4, src, useMemoization);
  throwOnFailure(this_0);
  var tmp = _Result___get_value__impl__bjfvqg(this_0);
  return (tmp == null ? true : !(tmp == null)) ? tmp : THROW_CCE();
}
function text(_this__u8e3s4, context) {
  return normalize(substring(context.i5b_1, _this__u8e3s4.z5b_1, _this__u8e3s4.a5c_1));
}
function parseAll(_this__u8e3s4, src, useMemoization) {
  useMemoization = useMemoization === VOID ? true : useMemoization;
  var context = new ParseContext(src, useMemoization);
  var tmp0_elvis_lhs = context.v5b(_this__u8e3s4, 0);
  var tmp;
  if (tmp0_elvis_lhs == null) {
    // Inline function 'kotlin.Companion.failure' call
    var exception = new ParseException(context, context.n5b_1);
    return _Result___init__impl__xyqfz8(createFailure(exception));
  } else {
    tmp = tmp0_elvis_lhs;
  }
  var result = tmp;
  if (context.v5b(get_endOfInput(), result.a5c_1) == null) {
    // Inline function 'kotlin.Companion.failure' call
    var exception_0 = new ParseException(context, context.n5b_1);
    return _Result___init__impl__xyqfz8(createFailure(exception_0));
  }
  // Inline function 'kotlin.Companion.success' call
  var value = result.y5b_1;
  return _Result___init__impl__xyqfz8(value);
}
function escapeDoubleQuote(_this__u8e3s4) {
  var sb = StringBuilder_init_$Create$();
  // Inline function 'kotlin.text.forEach' call
  var inductionVariable = 0;
  while (inductionVariable < charSequenceLength(_this__u8e3s4)) {
    var element = charSequenceGet(_this__u8e3s4, inductionVariable);
    inductionVariable = inductionVariable + 1 | 0;
    if (element === _Char___init__impl__6a9atx(92))
      sb.q('\\\\');
    else if (element === _Char___init__impl__6a9atx(34))
      sb.q('\\"');
    else if (element === _Char___init__impl__6a9atx(10))
      sb.q('\\n');
    else if (element === _Char___init__impl__6a9atx(13))
      sb.q('\\r');
    else if (element === _Char___init__impl__6a9atx(9))
      sb.q('\\t');
    else if (isISOControl(element)) {
      appendUnicodeChar(sb, element);
    } else
      sb.q(toString_0(element));
  }
  return sb.toString();
}
function appendUnicodeChar(_this__u8e3s4, char) {
  _this__u8e3s4.q('\\u');
  // Inline function 'kotlin.code' call
  var code = Char__toInt_impl_vasixd(char);
  _this__u8e3s4.s(toHexDigit(code >> 12 & 15));
  _this__u8e3s4.s(toHexDigit(code >> 8 & 15));
  _this__u8e3s4.s(toHexDigit(code >> 4 & 15));
  _this__u8e3s4.s(toHexDigit(code & 15));
}
function toHexDigit(_this__u8e3s4) {
  return _this__u8e3s4 < 10 ? Char__plus_impl_qi7pgj(_Char___init__impl__6a9atx(48), _this__u8e3s4) : Char__plus_impl_qi7pgj(_Char___init__impl__6a9atx(65), _this__u8e3s4 - 10 | 0);
}
function unaryMinus(_this__u8e3s4) {
  return get_ignore(toParser(_this__u8e3s4));
}
function not(_this__u8e3s4) {
  return get_not(toParser(_this__u8e3s4));
}
function toParser(_this__u8e3s4) {
  var tmp;
  if (get_isNative()) {
    tmp = new CharParser(_this__u8e3s4);
  } else {
    var tmp0 = Companion_getInstance().d5c_1;
    // Inline function 'kotlin.collections.getOrPut' call
    var key = new Char(_this__u8e3s4);
    var value = tmp0.d3(key);
    var tmp_0;
    if (value == null) {
      var answer = new CharParser(_this__u8e3s4);
      tmp0.v2(key, answer);
      tmp_0 = answer;
    } else {
      tmp_0 = value;
    }
    tmp = tmp_0;
  }
  return tmp;
}
function Companion() {
  Companion_instance_0 = this;
  var tmp = this;
  // Inline function 'kotlin.collections.mutableMapOf' call
  tmp.d5c_1 = LinkedHashMap_init_$Create$();
}
var Companion_instance_0;
function Companion_getInstance() {
  if (Companion_instance_0 == null)
    new Companion();
  return Companion_instance_0;
}
function CharParser$name$delegate$lambda(this$0) {
  return function () {
    return '"' + escapeDoubleQuote(toString_0(this$0.e5c_1)) + '"';
  };
}
function CharParser$_get_name_$ref_8aiz4u() {
  return function (p0) {
    return p0.m();
  };
}
function CharParser(char) {
  Companion_getInstance();
  this.e5c_1 = char;
  var tmp = this;
  tmp.f5c_1 = lazy(CharParser$name$delegate$lambda(this));
}
protoOf(CharParser).q5b = function (context, start) {
  if (start >= context.i5b_1.length)
    return null;
  if (!(charCodeAt(context.i5b_1, start) === this.e5c_1))
    return null;
  return new ParseResult(new Char(this.e5c_1), start, start + 1 | 0);
};
protoOf(CharParser).m = function () {
  var tmp0 = this.f5c_1;
  var tmp = KProperty1;
  // Inline function 'kotlin.getValue' call
  getPropertyCallableRef('name', 1, tmp, CharParser$_get_name_$ref_8aiz4u(), null);
  return tmp0.u1();
};
function get_endOfInput() {
  _init_properties_EndOfInputParser_kt__7u9cg9();
  return endOfInput;
}
var endOfInput;
function EndOfInputParser() {
  this.g5c_1 = 'EOF';
}
protoOf(EndOfInputParser).q5b = function (context, start) {
  if (!(start === context.i5b_1.length))
    return null;
  return new ParseResult(Tuple0_instance, start, start);
};
protoOf(EndOfInputParser).m = function () {
  return this.g5c_1;
};
var EndOfInputParser_instance;
function EndOfInputParser_getInstance() {
  return EndOfInputParser_instance;
}
var properties_initialized_EndOfInputParser_kt_mp29bt;
function _init_properties_EndOfInputParser_kt__7u9cg9() {
  if (!properties_initialized_EndOfInputParser_kt_mp29bt) {
    properties_initialized_EndOfInputParser_kt_mp29bt = true;
    endOfInput = EndOfInputParser_instance;
  }
}
function fixed(value) {
  return new FixedParser(value);
}
function FixedParser(value) {
  this.h5c_1 = value;
}
protoOf(FixedParser).q5b = function (context, start) {
  return new ParseResult(this.h5c_1, start, start);
};
function unaryMinus_0(_this__u8e3s4) {
  return get_ignore(_this__u8e3s4);
}
function get_ignore(_this__u8e3s4) {
  return map(_this__u8e3s4, _get_ignore_$lambda_eyryvm);
}
function _get_ignore_$lambda_eyryvm(it) {
  return Tuple0_instance;
}
function ListParser(parser, min, max) {
  this.i5c_1 = parser;
  this.j5c_1 = min;
  this.k5c_1 = max;
}
protoOf(ListParser).q5b = function (context, start) {
  // Inline function 'kotlin.collections.mutableListOf' call
  var results = ArrayList_init_$Create$();
  var nextIndex = start;
  $l$loop_0: while (true) {
    var tmp0_elvis_lhs = context.v5b(this.i5c_1, nextIndex);
    var tmp;
    if (tmp0_elvis_lhs == null) {
      break $l$loop_0;
    } else {
      tmp = tmp0_elvis_lhs;
    }
    var result = tmp;
    // Inline function 'kotlin.collections.plusAssign' call
    var element = result.y5b_1;
    results.b1(element);
    nextIndex = result.a5c_1;
    if (results.l1() >= this.k5c_1)
      break $l$loop_0;
  }
  if (results.l1() < this.j5c_1)
    return null;
  return new ParseResult(results, start, nextIndex);
};
function get_zeroOrMore(_this__u8e3s4) {
  return list(_this__u8e3s4);
}
function get_oneOrMore(_this__u8e3s4) {
  return list(_this__u8e3s4, 1);
}
function list(_this__u8e3s4, min, max) {
  min = min === VOID ? 0 : min;
  max = max === VOID ? 2147483647 : max;
  return new ListParser(_this__u8e3s4, min, max);
}
function map(_this__u8e3s4, function_0) {
  // Inline function 'io.github.mirrgieriana.xarpeg.Parser' call
  return new map$$inlined$Parser$1(_this__u8e3s4, function_0);
}
function mapEx(_this__u8e3s4, function_0) {
  // Inline function 'io.github.mirrgieriana.xarpeg.Parser' call
  return new mapEx$$inlined$Parser$1(_this__u8e3s4, function_0);
}
function map$$inlined$Parser$1($this_map, $function) {
  this.l5c_1 = $this_map;
  this.m5c_1 = $function;
}
protoOf(map$$inlined$Parser$1).q5b = function (context, start) {
  var tmp$ret$0;
  $l$block: {
    var tmp0_elvis_lhs = context.v5b(this.l5c_1, start);
    var tmp;
    if (tmp0_elvis_lhs == null) {
      tmp$ret$0 = null;
      break $l$block;
    } else {
      tmp = tmp0_elvis_lhs;
    }
    var result = tmp;
    tmp$ret$0 = new ParseResult(this.m5c_1(result.y5b_1), result.z5b_1, result.a5c_1);
  }
  return tmp$ret$0;
};
function mapEx$$inlined$Parser$1($this_mapEx, $function) {
  this.n5c_1 = $this_mapEx;
  this.o5c_1 = $function;
}
protoOf(mapEx$$inlined$Parser$1).q5b = function (context, start) {
  var tmp$ret$0;
  $l$block: {
    var tmp0_elvis_lhs = context.v5b(this.n5c_1, start);
    var tmp;
    if (tmp0_elvis_lhs == null) {
      tmp$ret$0 = null;
      break $l$block;
    } else {
      tmp = tmp0_elvis_lhs;
    }
    var result = tmp;
    tmp$ret$0 = new ParseResult(this.o5c_1(context, result), result.z5b_1, result.a5c_1);
  }
  return tmp$ret$0;
};
function get_not(_this__u8e3s4) {
  return get_negativeLookAhead(_this__u8e3s4);
}
function get_negativeLookAhead(_this__u8e3s4) {
  return new NegativeLookAheadParser(_this__u8e3s4);
}
function NegativeLookAheadParser(parser) {
  this.p5c_1 = parser;
}
protoOf(NegativeLookAheadParser).q5b = function (context, start) {
  var oldIsInLookAhead = context.m5b_1;
  context.m5b_1 = true;
  var tmp;
  try {
    tmp = context.v5b(this.p5c_1, start);
  }finally {
    context.m5b_1 = oldIsInLookAhead;
  }
  var result = tmp;
  if (!(result == null))
    return null;
  return new ParseResult(Tuple0_instance, start, start);
};
function OptionalParser(parser) {
  this.q5c_1 = parser;
}
protoOf(OptionalParser).q5b = function (context, start) {
  var result = context.v5b(this.q5c_1, start);
  var tmp;
  if (!(result == null)) {
    tmp = new ParseResult(new Tuple1(result.y5b_1), result.z5b_1, result.a5c_1);
  } else {
    tmp = new ParseResult(new Tuple1(null), start, start);
  }
  return tmp;
};
function get_optional(_this__u8e3s4) {
  return new OptionalParser(_this__u8e3s4);
}
function OrParser(parsers) {
  this.r5c_1 = parsers;
}
protoOf(OrParser).q5b = function (context, start) {
  // Inline function 'kotlin.collections.forEach' call
  var _iterator__ex2g4s = this.r5c_1.t();
  while (_iterator__ex2g4s.u()) {
    var element = _iterator__ex2g4s.v();
    var result = context.v5b(element, start);
    if (!(result == null))
      return result;
  }
  return null;
};
function or(parsers) {
  return new OrParser(toList(parsers));
}
function plus_0(_this__u8e3s4, other) {
  return new OrParser(plus(_this__u8e3s4.r5c_1, other));
}
function plus_1(_this__u8e3s4, other) {
  return new OrParser(listOf([_this__u8e3s4, other]));
}
function normalize(_this__u8e3s4) {
  return replace(replace(_this__u8e3s4, '\r\n', '\n'), '\r', '\n');
}
function leftAssociative(term, operator, combinator) {
  // Inline function 'io.github.mirrgieriana.xarpeg.Parser' call
  return new leftAssociative$$inlined$Parser$1(term, operator, combinator);
}
function leftAssociative$$inlined$Parser$1($term, $operator, $combinator) {
  this.s5c_1 = $term;
  this.t5c_1 = $operator;
  this.u5c_1 = $combinator;
}
protoOf(leftAssociative$$inlined$Parser$1).q5b = function (context, start) {
  var tmp$ret$0;
  $l$block: {
    var tmp0_elvis_lhs = context.v5b(this.s5c_1, start);
    var tmp;
    if (tmp0_elvis_lhs == null) {
      tmp$ret$0 = null;
      break $l$block;
    } else {
      tmp = tmp0_elvis_lhs;
    }
    var result = tmp;
    $l$loop_0: while (true) {
      var tmp1_elvis_lhs = context.v5b(this.t5c_1, result.a5c_1);
      var tmp_0;
      if (tmp1_elvis_lhs == null) {
        break $l$loop_0;
      } else {
        tmp_0 = tmp1_elvis_lhs;
      }
      var operatorResult = tmp_0;
      var tmp2_elvis_lhs = context.v5b(this.s5c_1, operatorResult.a5c_1);
      var tmp_1;
      if (tmp2_elvis_lhs == null) {
        break $l$loop_0;
      } else {
        tmp_1 = tmp2_elvis_lhs;
      }
      var rightResult = tmp_1;
      result = new ParseResult(this.u5c_1(result.y5b_1, operatorResult.y5b_1, rightResult.y5b_1), result.z5b_1, rightResult.a5c_1);
    }
    tmp$ret$0 = result;
  }
  return tmp$ret$0;
};
function ref(getter) {
  return new ReferenceParser(getter);
}
function _get_parser__ooioy4($this) {
  var tmp0 = $this.w5c_1;
  var tmp = KProperty1;
  // Inline function 'kotlin.getValue' call
  getPropertyCallableRef('parser', 1, tmp, ReferenceParser$_get_parser_$ref_4t7dh1(), null);
  return tmp0.u1();
}
function ReferenceParser$parser$delegate$lambda(this$0) {
  return function () {
    return this$0.v5c_1();
  };
}
function ReferenceParser$_get_parser_$ref_4t7dh1() {
  return function (p0) {
    return _get_parser__ooioy4(p0);
  };
}
function ReferenceParser(parserGetter) {
  this.v5c_1 = parserGetter;
  var tmp = this;
  tmp.w5c_1 = lazy(ReferenceParser$parser$delegate$lambda(this));
}
protoOf(ReferenceParser).q5b = function (context, start) {
  return context.v5b(_get_parser__ooioy4(this), start);
};
function unaryMinus_1(_this__u8e3s4) {
  return get_ignore(toParser_0(_this__u8e3s4));
}
function unaryPlus(_this__u8e3s4) {
  return toParser_0(_this__u8e3s4);
}
function toParser_0(_this__u8e3s4) {
  return new RegexParser(_this__u8e3s4);
}
function RegexParser$name$delegate$lambda(this$0) {
  return function () {
    return this$0.x5c_1.toString();
  };
}
function RegexParser$_get_name_$ref_swnt83() {
  return function (p0) {
    return p0.m();
  };
}
function RegexParser(regex) {
  this.x5c_1 = regex;
  var tmp = this;
  tmp.y5c_1 = lazy(RegexParser$name$delegate$lambda(this));
}
protoOf(RegexParser).q5b = function (context, start) {
  var tmp0_elvis_lhs = this.x5c_1.ed(context.i5b_1, start);
  var tmp;
  if (tmp0_elvis_lhs == null) {
    return null;
  } else {
    tmp = tmp0_elvis_lhs;
  }
  var matchResult = tmp;
  return new ParseResult(matchResult, start, matchResult.gd().y1_1 + 1 | 0);
};
protoOf(RegexParser).m = function () {
  var tmp0 = this.y5c_1;
  var tmp = KProperty1;
  // Inline function 'kotlin.getValue' call
  getPropertyCallableRef('name', 1, tmp, RegexParser$_get_name_$ref_swnt83(), null);
  return tmp0.u1();
};
function unaryMinus_2(_this__u8e3s4) {
  return get_ignore(toParser_1(_this__u8e3s4));
}
function unaryPlus_0(_this__u8e3s4) {
  return toParser_1(_this__u8e3s4);
}
function toParser_1(_this__u8e3s4) {
  var tmp;
  if (get_isNative()) {
    tmp = new StringParser(_this__u8e3s4);
  } else {
    // Inline function 'kotlin.collections.getOrPut' call
    var this_0 = Companion_getInstance_0().z5c_1;
    var value = this_0.d3(_this__u8e3s4);
    var tmp_0;
    if (value == null) {
      var answer = new StringParser(_this__u8e3s4);
      this_0.v2(_this__u8e3s4, answer);
      tmp_0 = answer;
    } else {
      tmp_0 = value;
    }
    tmp = tmp_0;
  }
  return tmp;
}
function Companion_0() {
  Companion_instance_1 = this;
  var tmp = this;
  // Inline function 'kotlin.collections.mutableMapOf' call
  tmp.z5c_1 = LinkedHashMap_init_$Create$();
}
var Companion_instance_1;
function Companion_getInstance_0() {
  if (Companion_instance_1 == null)
    new Companion_0();
  return Companion_instance_1;
}
function StringParser$name$delegate$lambda(this$0) {
  return function () {
    return '"' + escapeDoubleQuote(this$0.a5d_1) + '"';
  };
}
function StringParser$_get_name_$ref_fqg8l9() {
  return function (p0) {
    return p0.m();
  };
}
function StringParser(string) {
  Companion_getInstance_0();
  this.a5d_1 = string;
  var tmp = this;
  tmp.b5d_1 = lazy(StringParser$name$delegate$lambda(this));
}
protoOf(StringParser).q5b = function (context, start) {
  var nextIndex = start + this.a5d_1.length | 0;
  if (nextIndex > context.i5b_1.length)
    return null;
  var index = 0;
  while (index < this.a5d_1.length) {
    if (!(charCodeAt(context.i5b_1, start + index | 0) === charCodeAt(this.a5d_1, index)))
      return null;
    index = index + 1 | 0;
  }
  return new ParseResult(this.a5d_1, start, nextIndex);
};
protoOf(StringParser).m = function () {
  var tmp0 = this.b5d_1;
  var tmp = KProperty1;
  // Inline function 'kotlin.getValue' call
  getPropertyCallableRef('name', 1, tmp, StringParser$_get_name_$ref_fqg8l9(), null);
  return tmp0.u1();
};
function Tuple0() {
}
var Tuple0_instance;
function Tuple0_getInstance() {
  return Tuple0_instance;
}
function Tuple4(a, b, c, d) {
  this.c5d_1 = a;
  this.d5d_1 = b;
  this.e5d_1 = c;
  this.f5d_1 = d;
}
protoOf(Tuple4).toString = function () {
  return 'Tuple4(a=' + toString_1(this.c5d_1) + ', b=' + toString_1(this.d5d_1) + ', c=' + toString_1(this.e5d_1) + ', d=' + toString_1(this.f5d_1) + ')';
};
protoOf(Tuple4).hashCode = function () {
  var result = this.c5d_1 == null ? 0 : hashCode(this.c5d_1);
  result = imul(result, 31) + (this.d5d_1 == null ? 0 : hashCode(this.d5d_1)) | 0;
  result = imul(result, 31) + (this.e5d_1 == null ? 0 : hashCode(this.e5d_1)) | 0;
  result = imul(result, 31) + (this.f5d_1 == null ? 0 : hashCode(this.f5d_1)) | 0;
  return result;
};
protoOf(Tuple4).equals = function (other) {
  if (this === other)
    return true;
  if (!(other instanceof Tuple4))
    return false;
  if (!equals(this.c5d_1, other.c5d_1))
    return false;
  if (!equals(this.d5d_1, other.d5d_1))
    return false;
  if (!equals(this.e5d_1, other.e5d_1))
    return false;
  if (!equals(this.f5d_1, other.f5d_1))
    return false;
  return true;
};
function Tuple3(a, b, c) {
  this.g5d_1 = a;
  this.h5d_1 = b;
  this.i5d_1 = c;
}
protoOf(Tuple3).toString = function () {
  return 'Tuple3(a=' + toString_1(this.g5d_1) + ', b=' + toString_1(this.h5d_1) + ', c=' + toString_1(this.i5d_1) + ')';
};
protoOf(Tuple3).hashCode = function () {
  var result = this.g5d_1 == null ? 0 : hashCode(this.g5d_1);
  result = imul(result, 31) + (this.h5d_1 == null ? 0 : hashCode(this.h5d_1)) | 0;
  result = imul(result, 31) + (this.i5d_1 == null ? 0 : hashCode(this.i5d_1)) | 0;
  return result;
};
protoOf(Tuple3).equals = function (other) {
  if (this === other)
    return true;
  if (!(other instanceof Tuple3))
    return false;
  if (!equals(this.g5d_1, other.g5d_1))
    return false;
  if (!equals(this.h5d_1, other.h5d_1))
    return false;
  if (!equals(this.i5d_1, other.i5d_1))
    return false;
  return true;
};
function Tuple2(a, b) {
  this.j5d_1 = a;
  this.k5d_1 = b;
}
protoOf(Tuple2).toString = function () {
  return 'Tuple2(a=' + toString_1(this.j5d_1) + ', b=' + toString_1(this.k5d_1) + ')';
};
protoOf(Tuple2).hashCode = function () {
  var result = this.j5d_1 == null ? 0 : hashCode(this.j5d_1);
  result = imul(result, 31) + (this.k5d_1 == null ? 0 : hashCode(this.k5d_1)) | 0;
  return result;
};
protoOf(Tuple2).equals = function (other) {
  if (this === other)
    return true;
  if (!(other instanceof Tuple2))
    return false;
  if (!equals(this.j5d_1, other.j5d_1))
    return false;
  if (!equals(this.k5d_1, other.k5d_1))
    return false;
  return true;
};
function Tuple1(a) {
  this.l5d_1 = a;
}
protoOf(Tuple1).toString = function () {
  return 'Tuple1(a=' + toString_1(this.l5d_1) + ')';
};
protoOf(Tuple1).hashCode = function () {
  return this.l5d_1 == null ? 0 : hashCode(this.l5d_1);
};
protoOf(Tuple1).equals = function (other) {
  if (this === other)
    return true;
  if (!(other instanceof Tuple1))
    return false;
  if (!equals(this.l5d_1, other.l5d_1))
    return false;
  return true;
};
function times(_this__u8e3s4, other) {
  return combine(_this__u8e3s4, other, times$lambda);
}
function times_0(_this__u8e3s4, other) {
  return combine(_this__u8e3s4, other, times$lambda_0);
}
function times_1(_this__u8e3s4, other) {
  return combine(_this__u8e3s4, other, times$lambda_1);
}
function times_2(_this__u8e3s4, other) {
  return combine(_this__u8e3s4, other, times$lambda_2);
}
function times_3(_this__u8e3s4, other) {
  return combine(_this__u8e3s4, other, times$lambda_3);
}
function times_4(_this__u8e3s4, other) {
  return combine(_this__u8e3s4, other, times$lambda_4);
}
function times_5(_this__u8e3s4, other) {
  return combine(_this__u8e3s4, other, times$lambda_5);
}
function times_6(_this__u8e3s4, other) {
  return combine(_this__u8e3s4, other, times$lambda_6);
}
function times_7(_this__u8e3s4, other) {
  return combine(_this__u8e3s4, other, times$lambda_7);
}
function times_8(_this__u8e3s4, other) {
  return combine(_this__u8e3s4, other, times$lambda_8);
}
function times_9(_this__u8e3s4, other) {
  return combine(_this__u8e3s4, other, times$lambda_9);
}
function combine(left, right, function_0) {
  // Inline function 'io.github.mirrgieriana.xarpeg.Parser' call
  return new combine$$inlined$Parser$1(left, right, function_0);
}
function times$lambda(_unused_var__etf5q3, _unused_var__etf5q3_0) {
  return Tuple0_instance;
}
function times$lambda_0(a, _unused_var__etf5q3) {
  return a;
}
function times$lambda_1(_unused_var__etf5q3, b) {
  return b;
}
function times$lambda_2(a, b) {
  return new Tuple4(a.g5d_1, a.h5d_1, a.i5d_1, b);
}
function times$lambda_3(a, b) {
  return new Tuple3(a.j5d_1, a.k5d_1, b.l5d_1);
}
function times$lambda_4(a, b) {
  return new Tuple2(a, b.l5d_1);
}
function times$lambda_5(a, b) {
  return new Tuple2(a, b);
}
function times$lambda_6(a, _unused_var__etf5q3) {
  return a;
}
function times$lambda_7(a, _unused_var__etf5q3) {
  return a;
}
function times$lambda_8(a, b) {
  return new Tuple3(a.j5d_1, a.k5d_1, b);
}
function times$lambda_9(_unused_var__etf5q3, b) {
  return b;
}
function combine$$inlined$Parser$1($left, $right, $function) {
  this.m5d_1 = $left;
  this.n5d_1 = $right;
  this.o5d_1 = $function;
}
protoOf(combine$$inlined$Parser$1).q5b = function (context, start) {
  var tmp$ret$0;
  $l$block_0: {
    var tmp0_elvis_lhs = context.v5b(this.m5d_1, start);
    var tmp;
    if (tmp0_elvis_lhs == null) {
      tmp$ret$0 = null;
      break $l$block_0;
    } else {
      tmp = tmp0_elvis_lhs;
    }
    var resultL = tmp;
    var tmp1_elvis_lhs = context.v5b(this.n5d_1, resultL.a5c_1);
    var tmp_0;
    if (tmp1_elvis_lhs == null) {
      tmp$ret$0 = null;
      break $l$block_0;
    } else {
      tmp_0 = tmp1_elvis_lhs;
    }
    var resultR = tmp_0;
    tmp$ret$0 = new ParseResult(this.o5d_1(resultL.y5b_1, resultR.y5b_1), resultL.z5b_1, resultR.a5c_1);
  }
  return tmp$ret$0;
};
function get_isNative() {
  return isNative;
}
var isNative;
//region block: post-declaration
protoOf(FixedParser).m = get_name;
protoOf(ListParser).m = get_name;
protoOf(map$$inlined$Parser$1).m = get_name;
protoOf(mapEx$$inlined$Parser$1).m = get_name;
protoOf(NegativeLookAheadParser).m = get_name;
protoOf(OptionalParser).m = get_name;
protoOf(OrParser).m = get_name;
protoOf(leftAssociative$$inlined$Parser$1).m = get_name;
protoOf(ReferenceParser).m = get_name;
protoOf(combine$$inlined$Parser$1).m = get_name;
//endregion
//region block: init
EndOfInputParser_instance = new EndOfInputParser();
Tuple0_instance = new Tuple0();
isNative = false;
//endregion
//region block: exports
export {
  fixed as fixed1gmh6x68e7lle,
  leftAssociative as leftAssociative2zbhd8obc6iem,
  mapEx as mapEx2zbp215emnyhb,
  map as map3mh55dgaba4fd,
  normalize as normalizei4x3apwqcusi,
  not as not3eqknc87yxlt1,
  get_oneOrMore as get_oneOrMore3am7unqkh8sxd,
  get_optional as get_optional2kmmfjxuqwddx,
  or as or1miefs360ju75,
  plus_0 as plust7dufx4rb9n0,
  plus_1 as plus28pzjpgcwg7kf,
  ref as ref392bfws1qrqeb,
  times_2 as timesx9qu04ppkzbc,
  times as times1pvdg20ipzycx,
  times_8 as times18tgd1t0ttj3q,
  times_0 as times36vy7z61g2mc3,
  times_7 as times2uggtb25qn5k3,
  times_1 as times3dxrj5bwrcaic,
  times_6 as times19od9kb5odo0o,
  times_3 as times12u623ja0wce2,
  times_9 as times1lp4ztokuqmp5,
  times_4 as times1n8h70gbf9414,
  times_5 as times24vk6zpl3gtbj,
  unaryMinus_1 as unaryMinus1l4d8a6o8tt0l,
  unaryMinus as unaryMinus30lepxojemh4c,
  unaryMinus_2 as unaryMinus28te7h5hnwqo1,
  unaryMinus_0 as unaryMinusdxvbyycd5i2b,
  unaryPlus_0 as unaryPlus3th29so4bwvdp,
  unaryPlus as unaryPlus2zw5mben19sp3,
  get_zeroOrMore as get_zeroOrMore3moq91vlzvtyj,
  parseAllOrThrow as parseAllOrThrow191f25ol6t4na,
  text as textfhi2ork5ifug,
};
//endregion

//# sourceMappingURL=xarpeg.mjs.map
