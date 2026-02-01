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
    return new MatrixPositionCalculator(this$0.a2d_1);
  };
}
function ParseContext(src, useMemoization) {
  this.a2d_1 = src;
  this.b2d_1 = useMemoization;
  var tmp = this;
  // Inline function 'kotlin.collections.mutableMapOf' call
  tmp.c2d_1 = LinkedHashMap_init_$Create$();
  this.d2d_1 = false;
  this.e2d_1 = 0;
  var tmp_0 = this;
  // Inline function 'kotlin.collections.mutableSetOf' call
  tmp_0.f2d_1 = LinkedHashSet_init_$Create$();
  var tmp_1 = this;
  tmp_1.g2d_1 = lazy(ParseContext$matrixPositionCalculator$delegate$lambda(this));
}
protoOf(ParseContext).h2d = function (parser, start) {
  var tmp;
  if (this.b2d_1) {
    var key = new Pair(parser, start);
    var tmp_0;
    // Inline function 'kotlin.collections.contains' call
    // Inline function 'kotlin.collections.containsKey' call
    var this_0 = this.c2d_1;
    if ((isInterface(this_0, KtMap) ? this_0 : THROW_CCE()).i2(key)) {
      var tmp_1 = this.c2d_1.k2(key);
      tmp_0 = (tmp_1 == null ? true : tmp_1 instanceof ParseResult) ? tmp_1 : THROW_CCE();
    } else {
      var tmp_2;
      if (!this.d2d_1 && !(parser.a1m() == null)) {
        this.d2d_1 = true;
        var tmp_3;
        try {
          tmp_3 = parser.i2d(this, start);
        }finally {
          this.d2d_1 = false;
        }
        var result = tmp_3;
        tmp_2 = result;
      } else {
        tmp_2 = parser.i2d(this, start);
      }
      var result_0 = tmp_2;
      // Inline function 'kotlin.collections.set' call
      this.c2d_1.b2(key, result_0);
      tmp_0 = result_0;
    }
    tmp = tmp_0;
  } else {
    var tmp_4;
    if (!this.d2d_1 && !(parser.a1m() == null)) {
      this.d2d_1 = true;
      var tmp_5;
      try {
        tmp_5 = parser.i2d(this, start);
      }finally {
        this.d2d_1 = false;
      }
      var result_1 = tmp_5;
      tmp_4 = result_1;
    } else {
      tmp_4 = parser.i2d(this, start);
    }
    tmp = tmp_4;
  }
  var result_2 = tmp;
  if (result_2 == null && !this.d2d_1 && start >= this.e2d_1) {
    if (start > this.e2d_1) {
      this.e2d_1 = start;
      this.f2d_1.e2();
    }
    if (!(parser.a1m() == null)) {
      // Inline function 'kotlin.collections.plusAssign' call
      this.f2d_1.g(parser);
    }
  }
  return result_2;
};
function MatrixPositionCalculator(src) {
  this.j2d_1 = src;
  var tmp = this;
  // Inline function 'kotlin.run' call
  var list = mutableListOf([0]);
  // Inline function 'kotlin.text.forEachIndexed' call
  var index = 0;
  var indexedObject = this.j2d_1;
  var inductionVariable = 0;
  while (inductionVariable < charSequenceLength(indexedObject)) {
    var item = charSequenceGet(indexedObject, inductionVariable);
    inductionVariable = inductionVariable + 1 | 0;
    var _unary__edvuaz = index;
    index = _unary__edvuaz + 1 | 0;
    if (item === _Char___init__impl__6a9atx(10)) {
      list.g(_unary__edvuaz + 1 | 0);
    }
  }
  tmp.k2d_1 = list;
}
function Parser() {
}
function ParseResult(value, start, end) {
  this.l2d_1 = value;
  this.m2d_1 = start;
  this.n2d_1 = end;
}
protoOf(ParseResult).toString = function () {
  return 'ParseResult(value=' + toString(this.l2d_1) + ', start=' + this.m2d_1 + ', end=' + this.n2d_1 + ')';
};
protoOf(ParseResult).hashCode = function () {
  var result = hashCode(this.l2d_1);
  result = imul(result, 31) + this.m2d_1 | 0;
  result = imul(result, 31) + this.n2d_1 | 0;
  return result;
};
protoOf(ParseResult).equals = function (other) {
  if (this === other)
    return true;
  if (!(other instanceof ParseResult))
    return false;
  if (!equals(this.l2d_1, other.l2d_1))
    return false;
  if (!(this.m2d_1 === other.m2d_1))
    return false;
  if (!(this.n2d_1 === other.n2d_1))
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
  return normalize(substring(context.a2d_1, _this__u8e3s4.m2d_1, _this__u8e3s4.n2d_1));
}
function parseAll(_this__u8e3s4, src, useMemoization) {
  useMemoization = useMemoization === VOID ? true : useMemoization;
  var context = new ParseContext(src, useMemoization);
  var tmp0_elvis_lhs = context.h2d(_this__u8e3s4, 0);
  var tmp;
  if (tmp0_elvis_lhs == null) {
    // Inline function 'kotlin.Companion.failure' call
    var exception = new UnmatchedInputParseException('Failed to parse.', context, 0);
    return _Result___init__impl__xyqfz8(createFailure(exception));
  } else {
    tmp = tmp0_elvis_lhs;
  }
  var result = tmp;
  if (!(result.n2d_1 === src.length)) {
    var string = escapeDoubleQuote(truncate(drop(src, result.n2d_1), 10, '...'));
    // Inline function 'kotlin.Companion.failure' call
    var exception_0 = new ExtraCharactersParseException('Extra characters found after position ' + result.n2d_1 + ': "' + string + '"', context, result.n2d_1);
    return _Result___init__impl__xyqfz8(createFailure(exception_0));
  }
  // Inline function 'kotlin.Companion.success' call
  var value = result.l2d_1;
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
  this.o2d_1 = context;
  this.p2d_1 = position;
}
function escapeDoubleQuote(_this__u8e3s4) {
  var sb = StringBuilder_init_$Create$();
  // Inline function 'kotlin.text.forEach' call
  var inductionVariable = 0;
  while (inductionVariable < charSequenceLength(_this__u8e3s4)) {
    var element = charSequenceGet(_this__u8e3s4, inductionVariable);
    inductionVariable = inductionVariable + 1 | 0;
    if (element === _Char___init__impl__6a9atx(92))
      sb.r7('\\\\');
    else if (element === _Char___init__impl__6a9atx(34))
      sb.r7('\\"');
    else if (element === _Char___init__impl__6a9atx(10))
      sb.r7('\\n');
    else if (element === _Char___init__impl__6a9atx(13))
      sb.r7('\\r');
    else if (element === _Char___init__impl__6a9atx(9))
      sb.r7('\\t');
    else if (isISOControl(element)) {
      appendUnicodeChar(sb, element);
    } else
      sb.r7(toString_0(element));
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
  _this__u8e3s4.r7('\\u');
  // Inline function 'kotlin.code' call
  var code = Char__toInt_impl_vasixd(char);
  _this__u8e3s4.s7(toHexDigit(code >> 12 & 15));
  _this__u8e3s4.s7(toHexDigit(code >> 8 & 15));
  _this__u8e3s4.s7(toHexDigit(code >> 4 & 15));
  _this__u8e3s4.s7(toHexDigit(code & 15));
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
    var tmp0 = Companion_getInstance().q2d_1;
    // Inline function 'kotlin.collections.getOrPut' call
    var key = new Char(_this__u8e3s4);
    var value = tmp0.k2(key);
    var tmp_0;
    if (value == null) {
      var answer = new CharParser(_this__u8e3s4);
      tmp0.b2(key, answer);
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
  tmp.q2d_1 = LinkedHashMap_init_$Create$();
}
var Companion_instance_0;
function Companion_getInstance() {
  if (Companion_instance_0 == null)
    new Companion();
  return Companion_instance_0;
}
function CharParser$name$delegate$lambda(this$0) {
  return function () {
    return '"' + escapeDoubleQuote(toString_0(this$0.r2d_1)) + '"';
  };
}
function CharParser$_get_name_$ref_8aiz4u() {
  return function (p0) {
    return p0.a1m();
  };
}
function CharParser(char) {
  Companion_getInstance();
  this.r2d_1 = char;
  var tmp = this;
  tmp.s2d_1 = lazy(CharParser$name$delegate$lambda(this));
}
protoOf(CharParser).i2d = function (context, start) {
  if (start >= context.a2d_1.length)
    return null;
  if (!(charCodeAt(context.a2d_1, start) === this.r2d_1))
    return null;
  return new ParseResult(new Char(this.r2d_1), start, start + 1 | 0);
};
protoOf(CharParser).a1m = function () {
  var tmp0 = this.s2d_1;
  var tmp = KProperty1;
  // Inline function 'kotlin.getValue' call
  getPropertyCallableRef('name', 1, tmp, CharParser$_get_name_$ref_8aiz4u(), null);
  return tmp0.m2();
};
function FixedParser(value) {
  this.t2d_1 = value;
}
protoOf(FixedParser).i2d = function (context, start) {
  return new ParseResult(this.t2d_1, start, start);
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
  this.u2d_1 = parser;
  this.v2d_1 = min;
  this.w2d_1 = max;
}
protoOf(ListParser).i2d = function (context, start) {
  // Inline function 'kotlin.collections.mutableListOf' call
  var results = ArrayList_init_$Create$();
  var nextIndex = start;
  $l$loop_0: while (true) {
    var tmp0_elvis_lhs = context.h2d(this.u2d_1, nextIndex);
    var tmp;
    if (tmp0_elvis_lhs == null) {
      break $l$loop_0;
    } else {
      tmp = tmp0_elvis_lhs;
    }
    var result = tmp;
    // Inline function 'kotlin.collections.plusAssign' call
    var element = result.l2d_1;
    results.g(element);
    nextIndex = result.n2d_1;
    if (results.u() >= this.w2d_1)
      break $l$loop_0;
  }
  if (results.u() < this.v2d_1)
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
  this.x2d_1 = $this_map;
  this.y2d_1 = $function;
}
protoOf(map$$inlined$Parser$1).i2d = function (context, start) {
  var tmp$ret$0;
  $l$block: {
    var tmp0_elvis_lhs = context.h2d(this.x2d_1, start);
    var tmp;
    if (tmp0_elvis_lhs == null) {
      tmp$ret$0 = null;
      break $l$block;
    } else {
      tmp = tmp0_elvis_lhs;
    }
    var result = tmp;
    tmp$ret$0 = new ParseResult(this.y2d_1(result.l2d_1), result.m2d_1, result.n2d_1);
  }
  return tmp$ret$0;
};
function mapEx$$inlined$Parser$1($this_mapEx, $function) {
  this.z2d_1 = $this_mapEx;
  this.a2e_1 = $function;
}
protoOf(mapEx$$inlined$Parser$1).i2d = function (context, start) {
  var tmp$ret$0;
  $l$block: {
    var tmp0_elvis_lhs = context.h2d(this.z2d_1, start);
    var tmp;
    if (tmp0_elvis_lhs == null) {
      tmp$ret$0 = null;
      break $l$block;
    } else {
      tmp = tmp0_elvis_lhs;
    }
    var result = tmp;
    tmp$ret$0 = new ParseResult(this.a2e_1(context, result), result.m2d_1, result.n2d_1);
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
  this.b2e_1 = parser;
}
protoOf(NegativeLookAheadParser).i2d = function (context, start) {
  var result = context.h2d(this.b2e_1, start);
  if (!(result == null))
    return null;
  return new ParseResult(Tuple0_instance, start, start);
};
function OptionalParser(parser) {
  this.c2e_1 = parser;
}
protoOf(OptionalParser).i2d = function (context, start) {
  var result = context.h2d(this.c2e_1, start);
  var tmp;
  if (!(result == null)) {
    tmp = new ParseResult(new Tuple1(result.l2d_1), result.m2d_1, result.n2d_1);
  } else {
    tmp = new ParseResult(new Tuple1(null), start, start);
  }
  return tmp;
};
function get_optional(_this__u8e3s4) {
  return new OptionalParser(_this__u8e3s4);
}
function OrParser(parsers) {
  this.d2e_1 = parsers;
}
protoOf(OrParser).i2d = function (context, start) {
  // Inline function 'kotlin.collections.forEach' call
  var _iterator__ex2g4s = this.d2e_1.r();
  while (_iterator__ex2g4s.s()) {
    var element = _iterator__ex2g4s.t();
    var result = context.h2d(element, start);
    if (!(result == null))
      return result;
  }
  return null;
};
function or(parsers) {
  return new OrParser(toList(parsers));
}
function plus_0(_this__u8e3s4, other) {
  return new OrParser(plus(_this__u8e3s4.d2e_1, other));
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
  this.e2e_1 = $term;
  this.f2e_1 = $operator;
  this.g2e_1 = $combinator;
}
protoOf(leftAssociative$$inlined$Parser$1).i2d = function (context, start) {
  var tmp$ret$0;
  $l$block: {
    var tmp0_elvis_lhs = context.h2d(this.e2e_1, start);
    var tmp;
    if (tmp0_elvis_lhs == null) {
      tmp$ret$0 = null;
      break $l$block;
    } else {
      tmp = tmp0_elvis_lhs;
    }
    var result = tmp;
    $l$loop_0: while (true) {
      var tmp1_elvis_lhs = context.h2d(this.f2e_1, result.n2d_1);
      var tmp_0;
      if (tmp1_elvis_lhs == null) {
        break $l$loop_0;
      } else {
        tmp_0 = tmp1_elvis_lhs;
      }
      var operatorResult = tmp_0;
      var tmp2_elvis_lhs = context.h2d(this.e2e_1, operatorResult.n2d_1);
      var tmp_1;
      if (tmp2_elvis_lhs == null) {
        break $l$loop_0;
      } else {
        tmp_1 = tmp2_elvis_lhs;
      }
      var rightResult = tmp_1;
      result = new ParseResult(this.g2e_1(result.l2d_1, operatorResult.l2d_1, rightResult.l2d_1), result.m2d_1, rightResult.n2d_1);
    }
    tmp$ret$0 = result;
  }
  return tmp$ret$0;
};
function _get_parser__ooioy4($this) {
  var tmp0 = $this.i2e_1;
  var tmp = KProperty1;
  // Inline function 'kotlin.getValue' call
  getPropertyCallableRef('parser', 1, tmp, ReferenceParser$_get_parser_$ref_4t7dh1(), null);
  return tmp0.m2();
}
function ReferenceParser$parser$delegate$lambda(this$0) {
  return function () {
    return this$0.h2e_1();
  };
}
function ReferenceParser$_get_parser_$ref_4t7dh1() {
  return function (p0) {
    return _get_parser__ooioy4(p0);
  };
}
function ReferenceParser(parserGetter) {
  this.h2e_1 = parserGetter;
  var tmp = this;
  tmp.i2e_1 = lazy(ReferenceParser$parser$delegate$lambda(this));
}
protoOf(ReferenceParser).i2d = function (context, start) {
  return context.h2d(_get_parser__ooioy4(this), start);
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
    return this$0.j2e_1.toString();
  };
}
function RegexParser$_get_name_$ref_swnt83() {
  return function (p0) {
    return p0.a1m();
  };
}
function RegexParser(regex) {
  this.j2e_1 = regex;
  var tmp = this;
  tmp.k2e_1 = lazy(RegexParser$name$delegate$lambda(this));
}
protoOf(RegexParser).i2d = function (context, start) {
  var tmp0_elvis_lhs = this.j2e_1.gc(context.a2d_1, start);
  var tmp;
  if (tmp0_elvis_lhs == null) {
    return null;
  } else {
    tmp = tmp0_elvis_lhs;
  }
  var matchResult = tmp;
  return new ParseResult(matchResult, start, matchResult.ic().e1_1 + 1 | 0);
};
protoOf(RegexParser).a1m = function () {
  var tmp0 = this.k2e_1;
  var tmp = KProperty1;
  // Inline function 'kotlin.getValue' call
  getPropertyCallableRef('name', 1, tmp, RegexParser$_get_name_$ref_swnt83(), null);
  return tmp0.m2();
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
    var this_0 = Companion_getInstance_0().l2e_1;
    var value = this_0.k2(_this__u8e3s4);
    var tmp_0;
    if (value == null) {
      var answer = new StringParser(_this__u8e3s4);
      this_0.b2(_this__u8e3s4, answer);
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
  tmp.l2e_1 = LinkedHashMap_init_$Create$();
}
var Companion_instance_1;
function Companion_getInstance_0() {
  if (Companion_instance_1 == null)
    new Companion_0();
  return Companion_instance_1;
}
function StringParser$name$delegate$lambda(this$0) {
  return function () {
    return '"' + escapeDoubleQuote(this$0.m2e_1) + '"';
  };
}
function StringParser$_get_name_$ref_fqg8l9() {
  return function (p0) {
    return p0.a1m();
  };
}
function StringParser(string) {
  Companion_getInstance_0();
  this.m2e_1 = string;
  var tmp = this;
  tmp.n2e_1 = lazy(StringParser$name$delegate$lambda(this));
}
protoOf(StringParser).i2d = function (context, start) {
  var nextIndex = start + this.m2e_1.length | 0;
  if (nextIndex > context.a2d_1.length)
    return null;
  var index = 0;
  while (index < this.m2e_1.length) {
    if (!(charCodeAt(context.a2d_1, start + index | 0) === charCodeAt(this.m2e_1, index)))
      return null;
    index = index + 1 | 0;
  }
  return new ParseResult(this.m2e_1, start, nextIndex);
};
protoOf(StringParser).a1m = function () {
  var tmp0 = this.n2e_1;
  var tmp = KProperty1;
  // Inline function 'kotlin.getValue' call
  getPropertyCallableRef('name', 1, tmp, StringParser$_get_name_$ref_fqg8l9(), null);
  return tmp0.m2();
};
function Tuple0() {
}
var Tuple0_instance;
function Tuple0_getInstance() {
  return Tuple0_instance;
}
function Tuple4(a, b, c, d) {
  this.o2e_1 = a;
  this.p2e_1 = b;
  this.q2e_1 = c;
  this.r2e_1 = d;
}
protoOf(Tuple4).toString = function () {
  return 'Tuple4(a=' + toString_1(this.o2e_1) + ', b=' + toString_1(this.p2e_1) + ', c=' + toString_1(this.q2e_1) + ', d=' + toString_1(this.r2e_1) + ')';
};
protoOf(Tuple4).hashCode = function () {
  var result = this.o2e_1 == null ? 0 : hashCode(this.o2e_1);
  result = imul(result, 31) + (this.p2e_1 == null ? 0 : hashCode(this.p2e_1)) | 0;
  result = imul(result, 31) + (this.q2e_1 == null ? 0 : hashCode(this.q2e_1)) | 0;
  result = imul(result, 31) + (this.r2e_1 == null ? 0 : hashCode(this.r2e_1)) | 0;
  return result;
};
protoOf(Tuple4).equals = function (other) {
  if (this === other)
    return true;
  if (!(other instanceof Tuple4))
    return false;
  if (!equals(this.o2e_1, other.o2e_1))
    return false;
  if (!equals(this.p2e_1, other.p2e_1))
    return false;
  if (!equals(this.q2e_1, other.q2e_1))
    return false;
  if (!equals(this.r2e_1, other.r2e_1))
    return false;
  return true;
};
function Tuple3(a, b, c) {
  this.s2e_1 = a;
  this.t2e_1 = b;
  this.u2e_1 = c;
}
protoOf(Tuple3).toString = function () {
  return 'Tuple3(a=' + toString_1(this.s2e_1) + ', b=' + toString_1(this.t2e_1) + ', c=' + toString_1(this.u2e_1) + ')';
};
protoOf(Tuple3).hashCode = function () {
  var result = this.s2e_1 == null ? 0 : hashCode(this.s2e_1);
  result = imul(result, 31) + (this.t2e_1 == null ? 0 : hashCode(this.t2e_1)) | 0;
  result = imul(result, 31) + (this.u2e_1 == null ? 0 : hashCode(this.u2e_1)) | 0;
  return result;
};
protoOf(Tuple3).equals = function (other) {
  if (this === other)
    return true;
  if (!(other instanceof Tuple3))
    return false;
  if (!equals(this.s2e_1, other.s2e_1))
    return false;
  if (!equals(this.t2e_1, other.t2e_1))
    return false;
  if (!equals(this.u2e_1, other.u2e_1))
    return false;
  return true;
};
function Tuple2(a, b) {
  this.v2e_1 = a;
  this.w2e_1 = b;
}
protoOf(Tuple2).toString = function () {
  return 'Tuple2(a=' + toString_1(this.v2e_1) + ', b=' + toString_1(this.w2e_1) + ')';
};
protoOf(Tuple2).hashCode = function () {
  var result = this.v2e_1 == null ? 0 : hashCode(this.v2e_1);
  result = imul(result, 31) + (this.w2e_1 == null ? 0 : hashCode(this.w2e_1)) | 0;
  return result;
};
protoOf(Tuple2).equals = function (other) {
  if (this === other)
    return true;
  if (!(other instanceof Tuple2))
    return false;
  if (!equals(this.v2e_1, other.v2e_1))
    return false;
  if (!equals(this.w2e_1, other.w2e_1))
    return false;
  return true;
};
function Tuple1(a) {
  this.x2e_1 = a;
}
protoOf(Tuple1).toString = function () {
  return 'Tuple1(a=' + toString_1(this.x2e_1) + ')';
};
protoOf(Tuple1).hashCode = function () {
  return this.x2e_1 == null ? 0 : hashCode(this.x2e_1);
};
protoOf(Tuple1).equals = function (other) {
  if (this === other)
    return true;
  if (!(other instanceof Tuple1))
    return false;
  if (!equals(this.x2e_1, other.x2e_1))
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
  return new Tuple4(a.s2e_1, a.t2e_1, a.u2e_1, b);
}
function times$lambda_3(a, b) {
  return new Tuple3(a.v2e_1, a.w2e_1, b.x2e_1);
}
function times$lambda_4(a, b) {
  return new Tuple2(a, b.x2e_1);
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
  return new Tuple3(a.v2e_1, a.w2e_1, b);
}
function times$lambda_9(_unused_var__etf5q3, b) {
  return b;
}
function combine$$inlined$Parser$1($left, $right, $function) {
  this.y2e_1 = $left;
  this.z2e_1 = $right;
  this.a2f_1 = $function;
}
protoOf(combine$$inlined$Parser$1).i2d = function (context, start) {
  var tmp$ret$0;
  $l$block_0: {
    var tmp0_elvis_lhs = context.h2d(this.y2e_1, start);
    var tmp;
    if (tmp0_elvis_lhs == null) {
      tmp$ret$0 = null;
      break $l$block_0;
    } else {
      tmp = tmp0_elvis_lhs;
    }
    var resultL = tmp;
    var tmp1_elvis_lhs = context.h2d(this.z2e_1, resultL.n2d_1);
    var tmp_0;
    if (tmp1_elvis_lhs == null) {
      tmp$ret$0 = null;
      break $l$block_0;
    } else {
      tmp_0 = tmp1_elvis_lhs;
    }
    var resultR = tmp_0;
    tmp$ret$0 = new ParseResult(this.a2f_1(resultL.l2d_1, resultR.l2d_1), resultL.m2d_1, resultR.n2d_1);
  }
  return tmp$ret$0;
};
function get_isNative() {
  return isNative;
}
var isNative;
//region block: post-declaration
protoOf(FixedParser).a1m = get_name;
protoOf(ListParser).a1m = get_name;
protoOf(map$$inlined$Parser$1).a1m = get_name;
protoOf(mapEx$$inlined$Parser$1).a1m = get_name;
protoOf(NegativeLookAheadParser).a1m = get_name;
protoOf(OptionalParser).a1m = get_name;
protoOf(OrParser).a1m = get_name;
protoOf(leftAssociative$$inlined$Parser$1).a1m = get_name;
protoOf(ReferenceParser).a1m = get_name;
protoOf(combine$$inlined$Parser$1).a1m = get_name;
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
