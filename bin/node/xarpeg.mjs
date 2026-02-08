import {
  LinkedHashMap_init_$Create$1f9mb1z5f3dxn as LinkedHashMap_init_$Create$,
  LinkedHashSet_init_$Create$3o6z3oewjhki9 as LinkedHashSet_init_$Create$,
  lazy2hsh8ze7j6ikd as lazy,
  Paire9pteg33gng7 as Pair,
  THROW_CCE2g6jy02ryeudk as THROW_CCE,
  KtMap140uvy3s5zad8 as KtMap,
  isInterface3d6p8outrmvmk as isInterface,
  Unit_instance1fbcbse1fwigr as Unit_instance,
  protoOf180f3jzyo7rfj as protoOf,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
  mutableListOf6oorvk2mtdmp as mutableListOf,
  charSequenceLength3278n89t01tmv as charSequenceLength,
  charSequenceGet1vxk1y5n17t1z as charSequenceGet,
  _Char___init__impl__6a9atx2js6krycynjoo as _Char___init__impl__6a9atx,
  initMetadataForInterface1egvbzx539z91 as initMetadataForInterface,
  toString1pkumu07cwy4m as toString,
  hashCodeq5arwsb9dgti as hashCode,
  equals2au1ep9vhcato as equals,
  VOID3gxj6tk5isa35 as VOID,
  throwOnFailure24snjmtlqgzo8 as throwOnFailure,
  _Result___get_value__impl__bjfvqg2ei4op8d4d2m as _Result___get_value__impl__bjfvqg,
  substringiqarkczpya5m as substring,
  Companion_instance2oawqq9qiaris as Companion_instance,
  createFailure8paxfkfa5dc7 as createFailure,
  _Result___init__impl__xyqfz83hut4nr3dfvi3 as _Result___init__impl__xyqfz8,
  drop336950s126lmj as drop,
  captureStack1fzi4aczwc4hg as captureStack,
  Exceptiondt2hlxn7j7vw as Exception,
  Exception_init_$Init$33ewqhqmjrfx6 as Exception_init_$Init$,
  StringBuilder_init_$Create$2qsge4ydj6bin as StringBuilder_init_$Create$,
  toString3o7ifthqydp6e as toString_0,
  isISOControl2rcg25qorqppr as isISOControl,
  take9j4462mea726 as take,
  Char__toInt_impl_vasixd1agw9q2fuvclj as Char__toInt_impl_vasixd,
  Char__plus_impl_qi7pgj3akekecdud2w6 as Char__plus_impl_qi7pgj,
  Char19o2r8palgjof as Char,
  initMetadataForCompanion1wyw17z38v6ac as initMetadataForCompanion,
  charCodeAt1yspne1d8erbm as charCodeAt,
  KProperty1ca4yb4wlo496 as KProperty1,
  getPropertyCallableRef3hckxc0xueiaj as getPropertyCallableRef,
  ArrayList_init_$Create$149jv2ovkkvnt as ArrayList_init_$Create$,
  toList383f556t1dixk as toList,
  plus20p0vtfmu0596 as plus,
  listOf1jh22dvmctj1r as listOf,
  replace3le3ie7l9k8aq as replace,
  initMetadataForObject1cxne3s9w65el as initMetadataForObject,
  toString30pk9tzaqopn as toString_1,
} from './kotlin-kotlin-stdlib.mjs';
//region block: imports
var imul = Math.imul;
//endregion
//region block: pre-declaration
initMetadataForClass(ParseContext, 'ParseContext');
initMetadataForClass(MatrixPositionCalculator, 'MatrixPositionCalculator');
function get_name() {
  return null;
}
initMetadataForInterface(Parser, 'Parser');
initMetadataForClass(ParseResult, 'ParseResult');
initMetadataForClass(ParseException, 'ParseException', VOID, Exception);
initMetadataForClass(UnmatchedInputParseException, 'UnmatchedInputParseException', VOID, ParseException);
initMetadataForClass(ExtraCharactersParseException, 'ExtraCharactersParseException', VOID, ParseException);
initMetadataForCompanion(Companion);
initMetadataForClass(CharParser, 'CharParser', VOID, VOID, [Parser]);
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
function ParseContext$matrixPositionCalculator$delegate$lambda(this$0) {
  return function () {
    return new MatrixPositionCalculator(this$0.o2n_1);
  };
}
function ParseContext(src, useMemoization) {
  this.o2n_1 = src;
  this.p2n_1 = useMemoization;
  var tmp = this;
  // Inline function 'kotlin.collections.mutableMapOf' call
  tmp.q2n_1 = LinkedHashMap_init_$Create$();
  this.r2n_1 = false;
  this.s2n_1 = 0;
  var tmp_0 = this;
  // Inline function 'kotlin.collections.mutableSetOf' call
  tmp_0.t2n_1 = LinkedHashSet_init_$Create$();
  var tmp_1 = this;
  tmp_1.u2n_1 = lazy(ParseContext$matrixPositionCalculator$delegate$lambda(this));
}
protoOf(ParseContext).v2n = function (parser, start) {
  var tmp;
  if (this.p2n_1) {
    var key = new Pair(parser, start);
    var tmp_0;
    // Inline function 'kotlin.collections.contains' call
    // Inline function 'kotlin.collections.containsKey' call
    var this_0 = this.q2n_1;
    if ((isInterface(this_0, KtMap) ? this_0 : THROW_CCE()).j2(key)) {
      var tmp_1 = this.q2n_1.l2(key);
      tmp_0 = (tmp_1 == null ? true : tmp_1 instanceof ParseResult) ? tmp_1 : THROW_CCE();
    } else {
      var tmp_2;
      if (!this.r2n_1 && !(parser.f1m() == null)) {
        this.r2n_1 = true;
        var tmp_3;
        try {
          tmp_3 = parser.w2n(this, start);
        }finally {
          this.r2n_1 = false;
        }
        var result = tmp_3;
        tmp_2 = result;
      } else {
        tmp_2 = parser.w2n(this, start);
      }
      var result_0 = tmp_2;
      // Inline function 'kotlin.collections.set' call
      this.q2n_1.c2(key, result_0);
      tmp_0 = result_0;
    }
    tmp = tmp_0;
  } else {
    var tmp_4;
    if (!this.r2n_1 && !(parser.f1m() == null)) {
      this.r2n_1 = true;
      var tmp_5;
      try {
        tmp_5 = parser.w2n(this, start);
      }finally {
        this.r2n_1 = false;
      }
      var result_1 = tmp_5;
      tmp_4 = result_1;
    } else {
      tmp_4 = parser.w2n(this, start);
    }
    tmp = tmp_4;
  }
  var result_2 = tmp;
  if (result_2 == null && !this.r2n_1 && start >= this.s2n_1) {
    if (start > this.s2n_1) {
      this.s2n_1 = start;
      this.t2n_1.f2();
    }
    if (!(parser.f1m() == null)) {
      // Inline function 'kotlin.collections.plusAssign' call
      this.t2n_1.j(parser);
    }
  }
  return result_2;
};
function MatrixPositionCalculator(src) {
  this.x2n_1 = src;
  var tmp = this;
  // Inline function 'kotlin.run' call
  var list = mutableListOf([0]);
  // Inline function 'kotlin.text.forEachIndexed' call
  var index = 0;
  var indexedObject = this.x2n_1;
  var inductionVariable = 0;
  while (inductionVariable < charSequenceLength(indexedObject)) {
    var item = charSequenceGet(indexedObject, inductionVariable);
    inductionVariable = inductionVariable + 1 | 0;
    var _unary__edvuaz = index;
    index = _unary__edvuaz + 1 | 0;
    if (item === _Char___init__impl__6a9atx(10)) {
      list.j(_unary__edvuaz + 1 | 0);
    }
  }
  tmp.y2n_1 = list;
}
function Parser() {
}
function ParseResult(value, start, end) {
  this.z2n_1 = value;
  this.a2o_1 = start;
  this.b2o_1 = end;
}
protoOf(ParseResult).toString = function () {
  return 'ParseResult(value=' + toString(this.z2n_1) + ', start=' + this.a2o_1 + ', end=' + this.b2o_1 + ')';
};
protoOf(ParseResult).hashCode = function () {
  var result = hashCode(this.z2n_1);
  result = imul(result, 31) + this.a2o_1 | 0;
  result = imul(result, 31) + this.b2o_1 | 0;
  return result;
};
protoOf(ParseResult).equals = function (other) {
  if (this === other)
    return true;
  if (!(other instanceof ParseResult))
    return false;
  if (!equals(this.z2n_1, other.z2n_1))
    return false;
  if (!(this.a2o_1 === other.a2o_1))
    return false;
  if (!(this.b2o_1 === other.b2o_1))
    return false;
  return true;
};
function parseAllOrThrow(_this__u8e3s4, src, useMemoization) {
  useMemoization = useMemoization === VOID ? true : useMemoization;
  // Inline function 'kotlin.getOrThrow' call
  var this_0 = parseAll(_this__u8e3s4, src, useMemoization);
  throwOnFailure(this_0);
  var tmp = _Result___get_value__impl__bjfvqg(this_0);
  return (tmp == null ? true : !(tmp == null)) ? tmp : THROW_CCE();
}
function text(_this__u8e3s4, context) {
  return normalize(substring(context.o2n_1, _this__u8e3s4.a2o_1, _this__u8e3s4.b2o_1));
}
function parseAll(_this__u8e3s4, src, useMemoization) {
  useMemoization = useMemoization === VOID ? true : useMemoization;
  var context = new ParseContext(src, useMemoization);
  var tmp0_elvis_lhs = context.v2n(_this__u8e3s4, 0);
  var tmp;
  if (tmp0_elvis_lhs == null) {
    // Inline function 'kotlin.Companion.failure' call
    var exception = new UnmatchedInputParseException('Failed to parse.', context, 0);
    return _Result___init__impl__xyqfz8(createFailure(exception));
  } else {
    tmp = tmp0_elvis_lhs;
  }
  var result = tmp;
  if (!(result.b2o_1 === src.length)) {
    var string = escapeDoubleQuote(truncate(drop(src, result.b2o_1), 10, '...'));
    // Inline function 'kotlin.Companion.failure' call
    var exception_0 = new ExtraCharactersParseException('Extra characters found after position ' + result.b2o_1 + ': "' + string + '"', context, result.b2o_1);
    return _Result___init__impl__xyqfz8(createFailure(exception_0));
  }
  // Inline function 'kotlin.Companion.success' call
  var value = result.z2n_1;
  return _Result___init__impl__xyqfz8(value);
}
function UnmatchedInputParseException(message, context, position) {
  ParseException.call(this, message, context, position);
  captureStack(this, UnmatchedInputParseException);
}
function ExtraCharactersParseException(message, context, position) {
  ParseException.call(this, message, context, position);
  captureStack(this, ExtraCharactersParseException);
}
function ParseException(message, context, position) {
  Exception_init_$Init$(message, this);
  captureStack(this, ParseException);
  this.c2o_1 = context;
  this.d2o_1 = position;
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
function truncate(_this__u8e3s4, maxLength, ellipsis) {
  if (maxLength < 0)
    return '';
  if (_this__u8e3s4.length <= maxLength)
    return _this__u8e3s4;
  return take(_this__u8e3s4, maxLength - ellipsis.length | 0) + ellipsis;
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
    var tmp0 = Companion_getInstance().e2o_1;
    // Inline function 'kotlin.collections.getOrPut' call
    var key = new Char(_this__u8e3s4);
    var value = tmp0.l2(key);
    var tmp_0;
    if (value == null) {
      var answer = new CharParser(_this__u8e3s4);
      tmp0.c2(key, answer);
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
  tmp.e2o_1 = LinkedHashMap_init_$Create$();
}
var Companion_instance_0;
function Companion_getInstance() {
  if (Companion_instance_0 == null)
    new Companion();
  return Companion_instance_0;
}
function CharParser$name$delegate$lambda(this$0) {
  return function () {
    return '"' + escapeDoubleQuote(toString_0(this$0.f2o_1)) + '"';
  };
}
function CharParser$_get_name_$ref_8aiz4u() {
  return function (p0) {
    return p0.f1m();
  };
}
function CharParser(char) {
  Companion_getInstance();
  this.f2o_1 = char;
  var tmp = this;
  tmp.g2o_1 = lazy(CharParser$name$delegate$lambda(this));
}
protoOf(CharParser).w2n = function (context, start) {
  if (start >= context.o2n_1.length)
    return null;
  if (!(charCodeAt(context.o2n_1, start) === this.f2o_1))
    return null;
  return new ParseResult(new Char(this.f2o_1), start, start + 1 | 0);
};
protoOf(CharParser).f1m = function () {
  var tmp0 = this.g2o_1;
  var tmp = KProperty1;
  // Inline function 'kotlin.getValue' call
  getPropertyCallableRef('name', 1, tmp, CharParser$_get_name_$ref_8aiz4u(), null);
  return tmp0.p2();
};
function FixedParser(value) {
  this.h2o_1 = value;
}
protoOf(FixedParser).w2n = function (context, start) {
  return new ParseResult(this.h2o_1, start, start);
};
function fixed(value) {
  return new FixedParser(value);
}
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
  this.i2o_1 = parser;
  this.j2o_1 = min;
  this.k2o_1 = max;
}
protoOf(ListParser).w2n = function (context, start) {
  // Inline function 'kotlin.collections.mutableListOf' call
  var results = ArrayList_init_$Create$();
  var nextIndex = start;
  $l$loop_0: while (true) {
    var tmp0_elvis_lhs = context.v2n(this.i2o_1, nextIndex);
    var tmp;
    if (tmp0_elvis_lhs == null) {
      break $l$loop_0;
    } else {
      tmp = tmp0_elvis_lhs;
    }
    var result = tmp;
    // Inline function 'kotlin.collections.plusAssign' call
    var element = result.z2n_1;
    results.j(element);
    nextIndex = result.b2o_1;
    if (results.u() >= this.k2o_1)
      break $l$loop_0;
  }
  if (results.u() < this.j2o_1)
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
  this.l2o_1 = $this_map;
  this.m2o_1 = $function;
}
protoOf(map$$inlined$Parser$1).w2n = function (context, start) {
  var tmp$ret$0;
  $l$block: {
    var tmp0_elvis_lhs = context.v2n(this.l2o_1, start);
    var tmp;
    if (tmp0_elvis_lhs == null) {
      tmp$ret$0 = null;
      break $l$block;
    } else {
      tmp = tmp0_elvis_lhs;
    }
    var result = tmp;
    tmp$ret$0 = new ParseResult(this.m2o_1(result.z2n_1), result.a2o_1, result.b2o_1);
  }
  return tmp$ret$0;
};
function mapEx$$inlined$Parser$1($this_mapEx, $function) {
  this.n2o_1 = $this_mapEx;
  this.o2o_1 = $function;
}
protoOf(mapEx$$inlined$Parser$1).w2n = function (context, start) {
  var tmp$ret$0;
  $l$block: {
    var tmp0_elvis_lhs = context.v2n(this.n2o_1, start);
    var tmp;
    if (tmp0_elvis_lhs == null) {
      tmp$ret$0 = null;
      break $l$block;
    } else {
      tmp = tmp0_elvis_lhs;
    }
    var result = tmp;
    tmp$ret$0 = new ParseResult(this.o2o_1(context, result), result.a2o_1, result.b2o_1);
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
  this.p2o_1 = parser;
}
protoOf(NegativeLookAheadParser).w2n = function (context, start) {
  var result = context.v2n(this.p2o_1, start);
  if (!(result == null))
    return null;
  return new ParseResult(Tuple0_instance, start, start);
};
function OptionalParser(parser) {
  this.q2o_1 = parser;
}
protoOf(OptionalParser).w2n = function (context, start) {
  var result = context.v2n(this.q2o_1, start);
  var tmp;
  if (!(result == null)) {
    tmp = new ParseResult(new Tuple1(result.z2n_1), result.a2o_1, result.b2o_1);
  } else {
    tmp = new ParseResult(new Tuple1(null), start, start);
  }
  return tmp;
};
function get_optional(_this__u8e3s4) {
  return new OptionalParser(_this__u8e3s4);
}
function OrParser(parsers) {
  this.r2o_1 = parsers;
}
protoOf(OrParser).w2n = function (context, start) {
  // Inline function 'kotlin.collections.forEach' call
  var _iterator__ex2g4s = this.r2o_1.r();
  while (_iterator__ex2g4s.s()) {
    var element = _iterator__ex2g4s.t();
    var result = context.v2n(element, start);
    if (!(result == null))
      return result;
  }
  return null;
};
function or(parsers) {
  return new OrParser(toList(parsers));
}
function plus_0(_this__u8e3s4, other) {
  return new OrParser(plus(_this__u8e3s4.r2o_1, other));
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
  this.s2o_1 = $term;
  this.t2o_1 = $operator;
  this.u2o_1 = $combinator;
}
protoOf(leftAssociative$$inlined$Parser$1).w2n = function (context, start) {
  var tmp$ret$0;
  $l$block: {
    var tmp0_elvis_lhs = context.v2n(this.s2o_1, start);
    var tmp;
    if (tmp0_elvis_lhs == null) {
      tmp$ret$0 = null;
      break $l$block;
    } else {
      tmp = tmp0_elvis_lhs;
    }
    var result = tmp;
    $l$loop_0: while (true) {
      var tmp1_elvis_lhs = context.v2n(this.t2o_1, result.b2o_1);
      var tmp_0;
      if (tmp1_elvis_lhs == null) {
        break $l$loop_0;
      } else {
        tmp_0 = tmp1_elvis_lhs;
      }
      var operatorResult = tmp_0;
      var tmp2_elvis_lhs = context.v2n(this.s2o_1, operatorResult.b2o_1);
      var tmp_1;
      if (tmp2_elvis_lhs == null) {
        break $l$loop_0;
      } else {
        tmp_1 = tmp2_elvis_lhs;
      }
      var rightResult = tmp_1;
      result = new ParseResult(this.u2o_1(result.z2n_1, operatorResult.z2n_1, rightResult.z2n_1), result.a2o_1, rightResult.b2o_1);
    }
    tmp$ret$0 = result;
  }
  return tmp$ret$0;
};
function _get_parser__ooioy4($this) {
  var tmp0 = $this.w2o_1;
  var tmp = KProperty1;
  // Inline function 'kotlin.getValue' call
  getPropertyCallableRef('parser', 1, tmp, ReferenceParser$_get_parser_$ref_4t7dh1(), null);
  return tmp0.p2();
}
function ReferenceParser$parser$delegate$lambda(this$0) {
  return function () {
    return this$0.v2o_1();
  };
}
function ReferenceParser$_get_parser_$ref_4t7dh1() {
  return function (p0) {
    return _get_parser__ooioy4(p0);
  };
}
function ReferenceParser(parserGetter) {
  this.v2o_1 = parserGetter;
  var tmp = this;
  tmp.w2o_1 = lazy(ReferenceParser$parser$delegate$lambda(this));
}
protoOf(ReferenceParser).w2n = function (context, start) {
  return context.v2n(_get_parser__ooioy4(this), start);
};
function ref(getter) {
  return new ReferenceParser(getter);
}
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
    return this$0.x2o_1.toString();
  };
}
function RegexParser$_get_name_$ref_swnt83() {
  return function (p0) {
    return p0.f1m();
  };
}
function RegexParser(regex) {
  this.x2o_1 = regex;
  var tmp = this;
  tmp.y2o_1 = lazy(RegexParser$name$delegate$lambda(this));
}
protoOf(RegexParser).w2n = function (context, start) {
  var tmp0_elvis_lhs = this.x2o_1.gc(context.o2n_1, start);
  var tmp;
  if (tmp0_elvis_lhs == null) {
    return null;
  } else {
    tmp = tmp0_elvis_lhs;
  }
  var matchResult = tmp;
  return new ParseResult(matchResult, start, matchResult.ic().e1_1 + 1 | 0);
};
protoOf(RegexParser).f1m = function () {
  var tmp0 = this.y2o_1;
  var tmp = KProperty1;
  // Inline function 'kotlin.getValue' call
  getPropertyCallableRef('name', 1, tmp, RegexParser$_get_name_$ref_swnt83(), null);
  return tmp0.p2();
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
    var this_0 = Companion_getInstance_0().z2o_1;
    var value = this_0.l2(_this__u8e3s4);
    var tmp_0;
    if (value == null) {
      var answer = new StringParser(_this__u8e3s4);
      this_0.c2(_this__u8e3s4, answer);
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
  tmp.z2o_1 = LinkedHashMap_init_$Create$();
}
var Companion_instance_1;
function Companion_getInstance_0() {
  if (Companion_instance_1 == null)
    new Companion_0();
  return Companion_instance_1;
}
function StringParser$name$delegate$lambda(this$0) {
  return function () {
    return '"' + escapeDoubleQuote(this$0.a2p_1) + '"';
  };
}
function StringParser$_get_name_$ref_fqg8l9() {
  return function (p0) {
    return p0.f1m();
  };
}
function StringParser(string) {
  Companion_getInstance_0();
  this.a2p_1 = string;
  var tmp = this;
  tmp.b2p_1 = lazy(StringParser$name$delegate$lambda(this));
}
protoOf(StringParser).w2n = function (context, start) {
  var nextIndex = start + this.a2p_1.length | 0;
  if (nextIndex > context.o2n_1.length)
    return null;
  var index = 0;
  while (index < this.a2p_1.length) {
    if (!(charCodeAt(context.o2n_1, start + index | 0) === charCodeAt(this.a2p_1, index)))
      return null;
    index = index + 1 | 0;
  }
  return new ParseResult(this.a2p_1, start, nextIndex);
};
protoOf(StringParser).f1m = function () {
  var tmp0 = this.b2p_1;
  var tmp = KProperty1;
  // Inline function 'kotlin.getValue' call
  getPropertyCallableRef('name', 1, tmp, StringParser$_get_name_$ref_fqg8l9(), null);
  return tmp0.p2();
};
function Tuple0() {
}
var Tuple0_instance;
function Tuple0_getInstance() {
  return Tuple0_instance;
}
function Tuple4(a, b, c, d) {
  this.c2p_1 = a;
  this.d2p_1 = b;
  this.e2p_1 = c;
  this.f2p_1 = d;
}
protoOf(Tuple4).toString = function () {
  return 'Tuple4(a=' + toString_1(this.c2p_1) + ', b=' + toString_1(this.d2p_1) + ', c=' + toString_1(this.e2p_1) + ', d=' + toString_1(this.f2p_1) + ')';
};
protoOf(Tuple4).hashCode = function () {
  var result = this.c2p_1 == null ? 0 : hashCode(this.c2p_1);
  result = imul(result, 31) + (this.d2p_1 == null ? 0 : hashCode(this.d2p_1)) | 0;
  result = imul(result, 31) + (this.e2p_1 == null ? 0 : hashCode(this.e2p_1)) | 0;
  result = imul(result, 31) + (this.f2p_1 == null ? 0 : hashCode(this.f2p_1)) | 0;
  return result;
};
protoOf(Tuple4).equals = function (other) {
  if (this === other)
    return true;
  if (!(other instanceof Tuple4))
    return false;
  if (!equals(this.c2p_1, other.c2p_1))
    return false;
  if (!equals(this.d2p_1, other.d2p_1))
    return false;
  if (!equals(this.e2p_1, other.e2p_1))
    return false;
  if (!equals(this.f2p_1, other.f2p_1))
    return false;
  return true;
};
function Tuple3(a, b, c) {
  this.g2p_1 = a;
  this.h2p_1 = b;
  this.i2p_1 = c;
}
protoOf(Tuple3).toString = function () {
  return 'Tuple3(a=' + toString_1(this.g2p_1) + ', b=' + toString_1(this.h2p_1) + ', c=' + toString_1(this.i2p_1) + ')';
};
protoOf(Tuple3).hashCode = function () {
  var result = this.g2p_1 == null ? 0 : hashCode(this.g2p_1);
  result = imul(result, 31) + (this.h2p_1 == null ? 0 : hashCode(this.h2p_1)) | 0;
  result = imul(result, 31) + (this.i2p_1 == null ? 0 : hashCode(this.i2p_1)) | 0;
  return result;
};
protoOf(Tuple3).equals = function (other) {
  if (this === other)
    return true;
  if (!(other instanceof Tuple3))
    return false;
  if (!equals(this.g2p_1, other.g2p_1))
    return false;
  if (!equals(this.h2p_1, other.h2p_1))
    return false;
  if (!equals(this.i2p_1, other.i2p_1))
    return false;
  return true;
};
function Tuple2(a, b) {
  this.j2p_1 = a;
  this.k2p_1 = b;
}
protoOf(Tuple2).toString = function () {
  return 'Tuple2(a=' + toString_1(this.j2p_1) + ', b=' + toString_1(this.k2p_1) + ')';
};
protoOf(Tuple2).hashCode = function () {
  var result = this.j2p_1 == null ? 0 : hashCode(this.j2p_1);
  result = imul(result, 31) + (this.k2p_1 == null ? 0 : hashCode(this.k2p_1)) | 0;
  return result;
};
protoOf(Tuple2).equals = function (other) {
  if (this === other)
    return true;
  if (!(other instanceof Tuple2))
    return false;
  if (!equals(this.j2p_1, other.j2p_1))
    return false;
  if (!equals(this.k2p_1, other.k2p_1))
    return false;
  return true;
};
function Tuple1(a) {
  this.l2p_1 = a;
}
protoOf(Tuple1).toString = function () {
  return 'Tuple1(a=' + toString_1(this.l2p_1) + ')';
};
protoOf(Tuple1).hashCode = function () {
  return this.l2p_1 == null ? 0 : hashCode(this.l2p_1);
};
protoOf(Tuple1).equals = function (other) {
  if (this === other)
    return true;
  if (!(other instanceof Tuple1))
    return false;
  if (!equals(this.l2p_1, other.l2p_1))
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
  return new Tuple4(a.g2p_1, a.h2p_1, a.i2p_1, b);
}
function times$lambda_3(a, b) {
  return new Tuple3(a.j2p_1, a.k2p_1, b.l2p_1);
}
function times$lambda_4(a, b) {
  return new Tuple2(a, b.l2p_1);
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
  return new Tuple3(a.j2p_1, a.k2p_1, b);
}
function times$lambda_9(_unused_var__etf5q3, b) {
  return b;
}
function combine$$inlined$Parser$1($left, $right, $function) {
  this.m2p_1 = $left;
  this.n2p_1 = $right;
  this.o2p_1 = $function;
}
protoOf(combine$$inlined$Parser$1).w2n = function (context, start) {
  var tmp$ret$0;
  $l$block_0: {
    var tmp0_elvis_lhs = context.v2n(this.m2p_1, start);
    var tmp;
    if (tmp0_elvis_lhs == null) {
      tmp$ret$0 = null;
      break $l$block_0;
    } else {
      tmp = tmp0_elvis_lhs;
    }
    var resultL = tmp;
    var tmp1_elvis_lhs = context.v2n(this.n2p_1, resultL.b2o_1);
    var tmp_0;
    if (tmp1_elvis_lhs == null) {
      tmp$ret$0 = null;
      break $l$block_0;
    } else {
      tmp_0 = tmp1_elvis_lhs;
    }
    var resultR = tmp_0;
    tmp$ret$0 = new ParseResult(this.o2p_1(resultL.z2n_1, resultR.z2n_1), resultL.a2o_1, resultR.b2o_1);
  }
  return tmp$ret$0;
};
function get_isNative() {
  return isNative;
}
var isNative;
//region block: post-declaration
protoOf(FixedParser).f1m = get_name;
protoOf(ListParser).f1m = get_name;
protoOf(map$$inlined$Parser$1).f1m = get_name;
protoOf(mapEx$$inlined$Parser$1).f1m = get_name;
protoOf(NegativeLookAheadParser).f1m = get_name;
protoOf(OptionalParser).f1m = get_name;
protoOf(OrParser).f1m = get_name;
protoOf(leftAssociative$$inlined$Parser$1).f1m = get_name;
protoOf(ReferenceParser).f1m = get_name;
protoOf(combine$$inlined$Parser$1).f1m = get_name;
//endregion
//region block: init
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
