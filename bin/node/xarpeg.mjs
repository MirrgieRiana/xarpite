import {
  KProperty1ca4yb4wlo496 as KProperty1,
  getPropertyCallableRef3hckxc0xueiaj as getPropertyCallableRef,
  LinkedHashMap_init_$Create$1f9mb1z5f3dxn as LinkedHashMap_init_$Create$,
  LinkedHashSet_init_$Create$3o6z3oewjhki9 as LinkedHashSet_init_$Create$,
  lazy2hsh8ze7j6ikd as lazy,
  protoOf180f3jzyo7rfj as protoOf,
  Paire9pteg33gng7 as Pair,
  THROW_CCE2g6jy02ryeudk as THROW_CCE,
  KtMap140uvy3s5zad8 as KtMap,
  isInterface3d6p8outrmvmk as isInterface,
  Unit_instance1fbcbse1fwigr as Unit_instance,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
  ArrayList_init_$Create$149jv2ovkkvnt as ArrayList_init_$Create$,
  Regex_init_$Create$20u56movc9c5j as Regex_init_$Create$,
  toString1pkumu07cwy4m as toString,
  IllegalArgumentException_init_$Create$3ewkh27kzt8z8 as IllegalArgumentException_init_$Create$,
  binarySearch1nmlzx9onl5pm as binarySearch,
  initMetadataForInterface1egvbzx539z91 as initMetadataForInterface,
  hashCodeq5arwsb9dgti as hashCode,
  equals2au1ep9vhcato as equals,
  Exceptiondt2hlxn7j7vw as Exception,
  Exception_init_$Init$33ewqhqmjrfx6 as Exception_init_$Init$,
  captureStack1fzi4aczwc4hg as captureStack,
  VOID3gxj6tk5isa35 as VOID,
  throwOnFailure24snjmtlqgzo8 as throwOnFailure,
  _Result___get_value__impl__bjfvqg2ei4op8d4d2m as _Result___get_value__impl__bjfvqg,
  substringiqarkczpya5m as substring,
  Companion_instance2oawqq9qiaris as Companion_instance,
  createFailure8paxfkfa5dc7 as createFailure,
  _Result___init__impl__xyqfz83hut4nr3dfvi3 as _Result___init__impl__xyqfz8,
  StringBuilder_init_$Create$2qsge4ydj6bin as StringBuilder_init_$Create$,
  charSequenceLength3278n89t01tmv as charSequenceLength,
  charSequenceGet1vxk1y5n17t1z as charSequenceGet,
  toString3o7ifthqydp6e as toString_0,
  isISOControl2rcg25qorqppr as isISOControl,
  _Char___init__impl__6a9atx2js6krycynjoo as _Char___init__impl__6a9atx,
  Char__toInt_impl_vasixd1agw9q2fuvclj as Char__toInt_impl_vasixd,
  Char__plus_impl_qi7pgj3akekecdud2w6 as Char__plus_impl_qi7pgj,
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
  var tmp0 = $this.c4l_1;
  var tmp = KProperty1;
  // Inline function 'kotlin.getValue' call
  getPropertyCallableRef('matrixPositionCalculator', 1, tmp, ParseContext$_get_matrixPositionCalculator_$ref_3y2b56(), null);
  return tmp0.d1();
}
function parseOrNull$parse(this$0, $parser, $start) {
  var tmp;
  if (!this$0.y4k_1 && !($parser.z1o() == null)) {
    this$0.y4k_1 = true;
    var tmp_0;
    try {
      tmp_0 = $parser.d4l(this$0, $start);
    }finally {
      this$0.y4k_1 = false;
    }
    var result = tmp_0;
    tmp = result;
  } else {
    tmp = $parser.d4l(this$0, $start);
  }
  return tmp;
}
function ParseContext$matrixPositionCalculator$delegate$lambda(this$0) {
  return function () {
    return new MatrixPositionCalculator(this$0.v4k_1);
  };
}
function ParseContext$_get_matrixPositionCalculator_$ref_3y2b56() {
  return function (p0) {
    return _get_matrixPositionCalculator__q69tgh(p0);
  };
}
function ParseContext(src, useMemoization) {
  this.v4k_1 = src;
  this.w4k_1 = useMemoization;
  var tmp = this;
  // Inline function 'kotlin.collections.mutableMapOf' call
  tmp.x4k_1 = LinkedHashMap_init_$Create$();
  this.y4k_1 = false;
  this.z4k_1 = false;
  this.a4l_1 = 0;
  var tmp_0 = this;
  // Inline function 'kotlin.collections.mutableSetOf' call
  tmp_0.b4l_1 = LinkedHashSet_init_$Create$();
  var tmp_1 = this;
  tmp_1.c4l_1 = lazy(ParseContext$matrixPositionCalculator$delegate$lambda(this));
}
protoOf(ParseContext).e4l = function (index) {
  return _get_matrixPositionCalculator__q69tgh(this).e4l(index);
};
protoOf(ParseContext).i4l = function (parser, start) {
  var tmp;
  if (this.w4k_1) {
    var key = new Pair(parser, start);
    var tmp_0;
    // Inline function 'kotlin.collections.contains' call
    // Inline function 'kotlin.collections.containsKey' call
    var this_0 = this.x4k_1;
    if ((isInterface(this_0, KtMap) ? this_0 : THROW_CCE()).l2(key)) {
      var tmp_1 = this.x4k_1.n2(key);
      tmp_0 = (tmp_1 == null ? true : tmp_1 instanceof ParseResult) ? tmp_1 : THROW_CCE();
    } else {
      var result = parseOrNull$parse(this, parser, start);
      // Inline function 'kotlin.collections.set' call
      this.x4k_1.f2(key, result);
      tmp_0 = result;
    }
    tmp = tmp_0;
  } else {
    tmp = parseOrNull$parse(this, parser, start);
  }
  var result_0 = tmp;
  if (result_0 == null && !this.y4k_1 && !this.z4k_1 && start >= this.a4l_1) {
    if (start > this.a4l_1) {
      this.a4l_1 = start;
      this.b4l_1.i2();
    }
    if (!(parser.z1o() == null) && !(parser.z1o() === '')) {
      // Inline function 'kotlin.collections.plusAssign' call
      this.b4l_1.g(parser);
    }
  }
  return result_0;
};
function MatrixPositionCalculator(src) {
  this.f4l_1 = src;
  var tmp = this;
  // Inline function 'kotlin.collections.mutableListOf' call
  tmp.g4l_1 = ArrayList_init_$Create$();
  var tmp_0 = this;
  // Inline function 'kotlin.collections.mutableListOf' call
  tmp_0.h4l_1 = ArrayList_init_$Create$();
  // Inline function 'kotlin.collections.plusAssign' call
  this.g4l_1.g(0);
  // Inline function 'kotlin.text.toRegex' call
  var this_0 = '\\n|\\r\\n?';
  var result = Regex_init_$Create$(this_0).wc(this.f4l_1);
  while (!(result == null)) {
    var tmp0 = this.h4l_1;
    // Inline function 'kotlin.collections.plusAssign' call
    var element = result.bd().g1_1;
    tmp0.g(element);
    var tmp0_0 = this.g4l_1;
    // Inline function 'kotlin.collections.plusAssign' call
    var element_0 = result.bd().h1_1 + 1 | 0;
    tmp0_0.g(element_0);
    result = result.t();
  }
  var tmp0_1 = this.h4l_1;
  // Inline function 'kotlin.collections.plusAssign' call
  var element_1 = this.f4l_1.length;
  tmp0_1.g(element_1);
}
protoOf(MatrixPositionCalculator).e4l = function (index) {
  // Inline function 'kotlin.require' call
  if (!(0 <= index ? index <= this.f4l_1.length : false)) {
    var message = 'index (' + index + ') is out of range for src of length ' + this.f4l_1.length;
    throw IllegalArgumentException_init_$Create$(toString(message));
  }
  // Inline function 'kotlin.let' call
  var it = binarySearch(this.g4l_1, index);
  var lineIndex = it >= 0 ? it : ((-it | 0) - 1 | 0) - 1 | 0;
  var lineStartIndex = this.g4l_1.v(lineIndex);
  return new MatrixPosition(lineIndex + 1 | 0, (index - lineStartIndex | 0) + 1 | 0);
};
function MatrixPosition(row, column) {
  this.j4l_1 = row;
  this.k4l_1 = column;
}
protoOf(MatrixPosition).toString = function () {
  return 'MatrixPosition(row=' + this.j4l_1 + ', column=' + this.k4l_1 + ')';
};
protoOf(MatrixPosition).hashCode = function () {
  var result = this.j4l_1;
  result = imul(result, 31) + this.k4l_1 | 0;
  return result;
};
protoOf(MatrixPosition).equals = function (other) {
  if (this === other)
    return true;
  if (!(other instanceof MatrixPosition))
    return false;
  if (!(this.j4l_1 === other.j4l_1))
    return false;
  if (!(this.k4l_1 === other.k4l_1))
    return false;
  return true;
};
function Parser() {
}
function ParseResult(value, start, end) {
  this.l4l_1 = value;
  this.m4l_1 = start;
  this.n4l_1 = end;
}
protoOf(ParseResult).toString = function () {
  return 'ParseResult(value=' + toString(this.l4l_1) + ', start=' + this.m4l_1 + ', end=' + this.n4l_1 + ')';
};
protoOf(ParseResult).hashCode = function () {
  var result = hashCode(this.l4l_1);
  result = imul(result, 31) + this.m4l_1 | 0;
  result = imul(result, 31) + this.n4l_1 | 0;
  return result;
};
protoOf(ParseResult).equals = function (other) {
  if (this === other)
    return true;
  if (!(other instanceof ParseResult))
    return false;
  if (!equals(this.l4l_1, other.l4l_1))
    return false;
  if (!(this.m4l_1 === other.m4l_1))
    return false;
  if (!(this.n4l_1 === other.n4l_1))
    return false;
  return true;
};
function ParseException(context, position) {
  // Inline function 'kotlin.run' call
  var matrixPosition = context.e4l(position);
  var tmp$ret$1 = 'Syntax Error at ' + matrixPosition.j4l_1 + ':' + matrixPosition.k4l_1;
  Exception_init_$Init$(tmp$ret$1, this);
  captureStack(this, ParseException);
  this.o4l_1 = context;
  this.p4l_1 = position;
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
  return normalize(substring(context.v4k_1, _this__u8e3s4.m4l_1, _this__u8e3s4.n4l_1));
}
function parseAll(_this__u8e3s4, src, useMemoization) {
  useMemoization = useMemoization === VOID ? true : useMemoization;
  var context = new ParseContext(src, useMemoization);
  var tmp0_elvis_lhs = context.i4l(_this__u8e3s4, 0);
  var tmp;
  if (tmp0_elvis_lhs == null) {
    // Inline function 'kotlin.Companion.failure' call
    var exception = new ParseException(context, context.a4l_1);
    return _Result___init__impl__xyqfz8(createFailure(exception));
  } else {
    tmp = tmp0_elvis_lhs;
  }
  var result = tmp;
  if (context.i4l(get_endOfInput(), result.n4l_1) == null) {
    // Inline function 'kotlin.Companion.failure' call
    var exception_0 = new ParseException(context, context.a4l_1);
    return _Result___init__impl__xyqfz8(createFailure(exception_0));
  }
  // Inline function 'kotlin.Companion.success' call
  var value = result.l4l_1;
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
      sb.s7('\\\\');
    else if (element === _Char___init__impl__6a9atx(34))
      sb.s7('\\"');
    else if (element === _Char___init__impl__6a9atx(10))
      sb.s7('\\n');
    else if (element === _Char___init__impl__6a9atx(13))
      sb.s7('\\r');
    else if (element === _Char___init__impl__6a9atx(9))
      sb.s7('\\t');
    else if (isISOControl(element)) {
      appendUnicodeChar(sb, element);
    } else
      sb.s7(toString_0(element));
  }
  return sb.toString();
}
function appendUnicodeChar(_this__u8e3s4, char) {
  _this__u8e3s4.s7('\\u');
  // Inline function 'kotlin.code' call
  var code = Char__toInt_impl_vasixd(char);
  _this__u8e3s4.t7(toHexDigit(code >> 12 & 15));
  _this__u8e3s4.t7(toHexDigit(code >> 8 & 15));
  _this__u8e3s4.t7(toHexDigit(code >> 4 & 15));
  _this__u8e3s4.t7(toHexDigit(code & 15));
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
    var tmp0 = Companion_getInstance().q4l_1;
    // Inline function 'kotlin.collections.getOrPut' call
    var key = new Char(_this__u8e3s4);
    var value = tmp0.n2(key);
    var tmp_0;
    if (value == null) {
      var answer = new CharParser(_this__u8e3s4);
      tmp0.f2(key, answer);
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
  tmp.q4l_1 = LinkedHashMap_init_$Create$();
}
var Companion_instance_0;
function Companion_getInstance() {
  if (Companion_instance_0 == null)
    new Companion();
  return Companion_instance_0;
}
function CharParser$name$delegate$lambda(this$0) {
  return function () {
    return '"' + escapeDoubleQuote(toString_0(this$0.r4l_1)) + '"';
  };
}
function CharParser$_get_name_$ref_8aiz4u() {
  return function (p0) {
    return p0.z1o();
  };
}
function CharParser(char) {
  Companion_getInstance();
  this.r4l_1 = char;
  var tmp = this;
  tmp.s4l_1 = lazy(CharParser$name$delegate$lambda(this));
}
protoOf(CharParser).d4l = function (context, start) {
  if (start >= context.v4k_1.length)
    return null;
  if (!(charCodeAt(context.v4k_1, start) === this.r4l_1))
    return null;
  return new ParseResult(new Char(this.r4l_1), start, start + 1 | 0);
};
protoOf(CharParser).z1o = function () {
  var tmp0 = this.s4l_1;
  var tmp = KProperty1;
  // Inline function 'kotlin.getValue' call
  getPropertyCallableRef('name', 1, tmp, CharParser$_get_name_$ref_8aiz4u(), null);
  return tmp0.d1();
};
function get_endOfInput() {
  _init_properties_EndOfInputParser_kt__7u9cg9();
  return endOfInput;
}
var endOfInput;
function EndOfInputParser() {
  this.t4l_1 = 'EOF';
}
protoOf(EndOfInputParser).d4l = function (context, start) {
  if (!(start === context.v4k_1.length))
    return null;
  return new ParseResult(Tuple0_instance, start, start);
};
protoOf(EndOfInputParser).z1o = function () {
  return this.t4l_1;
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
  this.u4l_1 = value;
}
protoOf(FixedParser).d4l = function (context, start) {
  return new ParseResult(this.u4l_1, start, start);
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
  this.v4l_1 = parser;
  this.w4l_1 = min;
  this.x4l_1 = max;
}
protoOf(ListParser).d4l = function (context, start) {
  // Inline function 'kotlin.collections.mutableListOf' call
  var results = ArrayList_init_$Create$();
  var nextIndex = start;
  $l$loop_0: while (true) {
    var tmp0_elvis_lhs = context.i4l(this.v4l_1, nextIndex);
    var tmp;
    if (tmp0_elvis_lhs == null) {
      break $l$loop_0;
    } else {
      tmp = tmp0_elvis_lhs;
    }
    var result = tmp;
    // Inline function 'kotlin.collections.plusAssign' call
    var element = result.l4l_1;
    results.g(element);
    nextIndex = result.n4l_1;
    if (results.u() >= this.x4l_1)
      break $l$loop_0;
  }
  if (results.u() < this.w4l_1)
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
  this.y4l_1 = $this_map;
  this.z4l_1 = $function;
}
protoOf(map$$inlined$Parser$1).d4l = function (context, start) {
  var tmp$ret$0;
  $l$block: {
    var tmp0_elvis_lhs = context.i4l(this.y4l_1, start);
    var tmp;
    if (tmp0_elvis_lhs == null) {
      tmp$ret$0 = null;
      break $l$block;
    } else {
      tmp = tmp0_elvis_lhs;
    }
    var result = tmp;
    tmp$ret$0 = new ParseResult(this.z4l_1(result.l4l_1), result.m4l_1, result.n4l_1);
  }
  return tmp$ret$0;
};
function mapEx$$inlined$Parser$1($this_mapEx, $function) {
  this.a4m_1 = $this_mapEx;
  this.b4m_1 = $function;
}
protoOf(mapEx$$inlined$Parser$1).d4l = function (context, start) {
  var tmp$ret$0;
  $l$block: {
    var tmp0_elvis_lhs = context.i4l(this.a4m_1, start);
    var tmp;
    if (tmp0_elvis_lhs == null) {
      tmp$ret$0 = null;
      break $l$block;
    } else {
      tmp = tmp0_elvis_lhs;
    }
    var result = tmp;
    tmp$ret$0 = new ParseResult(this.b4m_1(context, result), result.m4l_1, result.n4l_1);
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
  this.c4m_1 = parser;
}
protoOf(NegativeLookAheadParser).d4l = function (context, start) {
  var oldIsInLookAhead = context.z4k_1;
  context.z4k_1 = true;
  var tmp;
  try {
    tmp = context.i4l(this.c4m_1, start);
  }finally {
    context.z4k_1 = oldIsInLookAhead;
  }
  var result = tmp;
  if (!(result == null))
    return null;
  return new ParseResult(Tuple0_instance, start, start);
};
function OptionalParser(parser) {
  this.d4m_1 = parser;
}
protoOf(OptionalParser).d4l = function (context, start) {
  var result = context.i4l(this.d4m_1, start);
  var tmp;
  if (!(result == null)) {
    tmp = new ParseResult(new Tuple1(result.l4l_1), result.m4l_1, result.n4l_1);
  } else {
    tmp = new ParseResult(new Tuple1(null), start, start);
  }
  return tmp;
};
function get_optional(_this__u8e3s4) {
  return new OptionalParser(_this__u8e3s4);
}
function OrParser(parsers) {
  this.e4m_1 = parsers;
}
protoOf(OrParser).d4l = function (context, start) {
  // Inline function 'kotlin.collections.forEach' call
  var _iterator__ex2g4s = this.e4m_1.r();
  while (_iterator__ex2g4s.s()) {
    var element = _iterator__ex2g4s.t();
    var result = context.i4l(element, start);
    if (!(result == null))
      return result;
  }
  return null;
};
function or(parsers) {
  return new OrParser(toList(parsers));
}
function plus_0(_this__u8e3s4, other) {
  return new OrParser(plus(_this__u8e3s4.e4m_1, other));
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
  this.f4m_1 = $term;
  this.g4m_1 = $operator;
  this.h4m_1 = $combinator;
}
protoOf(leftAssociative$$inlined$Parser$1).d4l = function (context, start) {
  var tmp$ret$0;
  $l$block: {
    var tmp0_elvis_lhs = context.i4l(this.f4m_1, start);
    var tmp;
    if (tmp0_elvis_lhs == null) {
      tmp$ret$0 = null;
      break $l$block;
    } else {
      tmp = tmp0_elvis_lhs;
    }
    var result = tmp;
    $l$loop_0: while (true) {
      var tmp1_elvis_lhs = context.i4l(this.g4m_1, result.n4l_1);
      var tmp_0;
      if (tmp1_elvis_lhs == null) {
        break $l$loop_0;
      } else {
        tmp_0 = tmp1_elvis_lhs;
      }
      var operatorResult = tmp_0;
      var tmp2_elvis_lhs = context.i4l(this.f4m_1, operatorResult.n4l_1);
      var tmp_1;
      if (tmp2_elvis_lhs == null) {
        break $l$loop_0;
      } else {
        tmp_1 = tmp2_elvis_lhs;
      }
      var rightResult = tmp_1;
      result = new ParseResult(this.h4m_1(result.l4l_1, operatorResult.l4l_1, rightResult.l4l_1), result.m4l_1, rightResult.n4l_1);
    }
    tmp$ret$0 = result;
  }
  return tmp$ret$0;
};
function ref(getter) {
  return new ReferenceParser(getter);
}
function _get_parser__ooioy4($this) {
  var tmp0 = $this.j4m_1;
  var tmp = KProperty1;
  // Inline function 'kotlin.getValue' call
  getPropertyCallableRef('parser', 1, tmp, ReferenceParser$_get_parser_$ref_4t7dh1(), null);
  return tmp0.d1();
}
function ReferenceParser$parser$delegate$lambda(this$0) {
  return function () {
    return this$0.i4m_1();
  };
}
function ReferenceParser$_get_parser_$ref_4t7dh1() {
  return function (p0) {
    return _get_parser__ooioy4(p0);
  };
}
function ReferenceParser(parserGetter) {
  this.i4m_1 = parserGetter;
  var tmp = this;
  tmp.j4m_1 = lazy(ReferenceParser$parser$delegate$lambda(this));
}
protoOf(ReferenceParser).d4l = function (context, start) {
  return context.i4l(_get_parser__ooioy4(this), start);
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
    return this$0.k4m_1.toString();
  };
}
function RegexParser$_get_name_$ref_swnt83() {
  return function (p0) {
    return p0.z1o();
  };
}
function RegexParser(regex) {
  this.k4m_1 = regex;
  var tmp = this;
  tmp.l4m_1 = lazy(RegexParser$name$delegate$lambda(this));
}
protoOf(RegexParser).d4l = function (context, start) {
  var tmp0_elvis_lhs = this.k4m_1.zc(context.v4k_1, start);
  var tmp;
  if (tmp0_elvis_lhs == null) {
    return null;
  } else {
    tmp = tmp0_elvis_lhs;
  }
  var matchResult = tmp;
  return new ParseResult(matchResult, start, matchResult.bd().h1_1 + 1 | 0);
};
protoOf(RegexParser).z1o = function () {
  var tmp0 = this.l4m_1;
  var tmp = KProperty1;
  // Inline function 'kotlin.getValue' call
  getPropertyCallableRef('name', 1, tmp, RegexParser$_get_name_$ref_swnt83(), null);
  return tmp0.d1();
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
    var this_0 = Companion_getInstance_0().m4m_1;
    var value = this_0.n2(_this__u8e3s4);
    var tmp_0;
    if (value == null) {
      var answer = new StringParser(_this__u8e3s4);
      this_0.f2(_this__u8e3s4, answer);
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
  tmp.m4m_1 = LinkedHashMap_init_$Create$();
}
var Companion_instance_1;
function Companion_getInstance_0() {
  if (Companion_instance_1 == null)
    new Companion_0();
  return Companion_instance_1;
}
function StringParser$name$delegate$lambda(this$0) {
  return function () {
    return '"' + escapeDoubleQuote(this$0.n4m_1) + '"';
  };
}
function StringParser$_get_name_$ref_fqg8l9() {
  return function (p0) {
    return p0.z1o();
  };
}
function StringParser(string) {
  Companion_getInstance_0();
  this.n4m_1 = string;
  var tmp = this;
  tmp.o4m_1 = lazy(StringParser$name$delegate$lambda(this));
}
protoOf(StringParser).d4l = function (context, start) {
  var nextIndex = start + this.n4m_1.length | 0;
  if (nextIndex > context.v4k_1.length)
    return null;
  var index = 0;
  while (index < this.n4m_1.length) {
    if (!(charCodeAt(context.v4k_1, start + index | 0) === charCodeAt(this.n4m_1, index)))
      return null;
    index = index + 1 | 0;
  }
  return new ParseResult(this.n4m_1, start, nextIndex);
};
protoOf(StringParser).z1o = function () {
  var tmp0 = this.o4m_1;
  var tmp = KProperty1;
  // Inline function 'kotlin.getValue' call
  getPropertyCallableRef('name', 1, tmp, StringParser$_get_name_$ref_fqg8l9(), null);
  return tmp0.d1();
};
function Tuple0() {
}
var Tuple0_instance;
function Tuple0_getInstance() {
  return Tuple0_instance;
}
function Tuple4(a, b, c, d) {
  this.p4m_1 = a;
  this.q4m_1 = b;
  this.r4m_1 = c;
  this.s4m_1 = d;
}
protoOf(Tuple4).toString = function () {
  return 'Tuple4(a=' + toString_1(this.p4m_1) + ', b=' + toString_1(this.q4m_1) + ', c=' + toString_1(this.r4m_1) + ', d=' + toString_1(this.s4m_1) + ')';
};
protoOf(Tuple4).hashCode = function () {
  var result = this.p4m_1 == null ? 0 : hashCode(this.p4m_1);
  result = imul(result, 31) + (this.q4m_1 == null ? 0 : hashCode(this.q4m_1)) | 0;
  result = imul(result, 31) + (this.r4m_1 == null ? 0 : hashCode(this.r4m_1)) | 0;
  result = imul(result, 31) + (this.s4m_1 == null ? 0 : hashCode(this.s4m_1)) | 0;
  return result;
};
protoOf(Tuple4).equals = function (other) {
  if (this === other)
    return true;
  if (!(other instanceof Tuple4))
    return false;
  if (!equals(this.p4m_1, other.p4m_1))
    return false;
  if (!equals(this.q4m_1, other.q4m_1))
    return false;
  if (!equals(this.r4m_1, other.r4m_1))
    return false;
  if (!equals(this.s4m_1, other.s4m_1))
    return false;
  return true;
};
function Tuple3(a, b, c) {
  this.t4m_1 = a;
  this.u4m_1 = b;
  this.v4m_1 = c;
}
protoOf(Tuple3).toString = function () {
  return 'Tuple3(a=' + toString_1(this.t4m_1) + ', b=' + toString_1(this.u4m_1) + ', c=' + toString_1(this.v4m_1) + ')';
};
protoOf(Tuple3).hashCode = function () {
  var result = this.t4m_1 == null ? 0 : hashCode(this.t4m_1);
  result = imul(result, 31) + (this.u4m_1 == null ? 0 : hashCode(this.u4m_1)) | 0;
  result = imul(result, 31) + (this.v4m_1 == null ? 0 : hashCode(this.v4m_1)) | 0;
  return result;
};
protoOf(Tuple3).equals = function (other) {
  if (this === other)
    return true;
  if (!(other instanceof Tuple3))
    return false;
  if (!equals(this.t4m_1, other.t4m_1))
    return false;
  if (!equals(this.u4m_1, other.u4m_1))
    return false;
  if (!equals(this.v4m_1, other.v4m_1))
    return false;
  return true;
};
function Tuple2(a, b) {
  this.w4m_1 = a;
  this.x4m_1 = b;
}
protoOf(Tuple2).toString = function () {
  return 'Tuple2(a=' + toString_1(this.w4m_1) + ', b=' + toString_1(this.x4m_1) + ')';
};
protoOf(Tuple2).hashCode = function () {
  var result = this.w4m_1 == null ? 0 : hashCode(this.w4m_1);
  result = imul(result, 31) + (this.x4m_1 == null ? 0 : hashCode(this.x4m_1)) | 0;
  return result;
};
protoOf(Tuple2).equals = function (other) {
  if (this === other)
    return true;
  if (!(other instanceof Tuple2))
    return false;
  if (!equals(this.w4m_1, other.w4m_1))
    return false;
  if (!equals(this.x4m_1, other.x4m_1))
    return false;
  return true;
};
function Tuple1(a) {
  this.y4m_1 = a;
}
protoOf(Tuple1).toString = function () {
  return 'Tuple1(a=' + toString_1(this.y4m_1) + ')';
};
protoOf(Tuple1).hashCode = function () {
  return this.y4m_1 == null ? 0 : hashCode(this.y4m_1);
};
protoOf(Tuple1).equals = function (other) {
  if (this === other)
    return true;
  if (!(other instanceof Tuple1))
    return false;
  if (!equals(this.y4m_1, other.y4m_1))
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
  return new Tuple4(a.t4m_1, a.u4m_1, a.v4m_1, b);
}
function times$lambda_3(a, b) {
  return new Tuple3(a.w4m_1, a.x4m_1, b.y4m_1);
}
function times$lambda_4(a, b) {
  return new Tuple2(a, b.y4m_1);
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
  return new Tuple3(a.w4m_1, a.x4m_1, b);
}
function times$lambda_9(_unused_var__etf5q3, b) {
  return b;
}
function combine$$inlined$Parser$1($left, $right, $function) {
  this.z4m_1 = $left;
  this.a4n_1 = $right;
  this.b4n_1 = $function;
}
protoOf(combine$$inlined$Parser$1).d4l = function (context, start) {
  var tmp$ret$0;
  $l$block_0: {
    var tmp0_elvis_lhs = context.i4l(this.z4m_1, start);
    var tmp;
    if (tmp0_elvis_lhs == null) {
      tmp$ret$0 = null;
      break $l$block_0;
    } else {
      tmp = tmp0_elvis_lhs;
    }
    var resultL = tmp;
    var tmp1_elvis_lhs = context.i4l(this.a4n_1, resultL.n4l_1);
    var tmp_0;
    if (tmp1_elvis_lhs == null) {
      tmp$ret$0 = null;
      break $l$block_0;
    } else {
      tmp_0 = tmp1_elvis_lhs;
    }
    var resultR = tmp_0;
    tmp$ret$0 = new ParseResult(this.b4n_1(resultL.l4l_1, resultR.l4l_1), resultL.m4l_1, resultR.n4l_1);
  }
  return tmp$ret$0;
};
function get_isNative() {
  return isNative;
}
var isNative;
//region block: post-declaration
protoOf(FixedParser).z1o = get_name;
protoOf(ListParser).z1o = get_name;
protoOf(map$$inlined$Parser$1).z1o = get_name;
protoOf(mapEx$$inlined$Parser$1).z1o = get_name;
protoOf(NegativeLookAheadParser).z1o = get_name;
protoOf(OptionalParser).z1o = get_name;
protoOf(OrParser).z1o = get_name;
protoOf(leftAssociative$$inlined$Parser$1).z1o = get_name;
protoOf(ReferenceParser).z1o = get_name;
protoOf(combine$$inlined$Parser$1).z1o = get_name;
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
