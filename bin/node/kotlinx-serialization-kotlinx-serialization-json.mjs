import {
  EmptySerializersModule991ju6pz9b79 as EmptySerializersModule,
  Decoder23nde051s631g as Decoder,
  CompositeDecoder2tzm7wpwkr0og as CompositeDecoder,
  SerializerFactory1qv9hivitncuv as SerializerFactory,
  serializer1x79l67jvwntn as serializer,
  InlinePrimitiveDescriptor3i6ccn1a4fw94 as InlinePrimitiveDescriptor,
  SEALED_getInstance3nsev85ow9059 as SEALED_getInstance,
  buildSerialDescriptor2873qmkp8r2ib as buildSerialDescriptor,
  KSerializerzf77vz1967fq as KSerializer,
  STRING_getInstance2ou4lro9xn2qn as STRING_getInstance,
  ENUM_getInstance22lfbrqor0c0a as ENUM_getInstance,
  PrimitiveSerialDescriptor3egfp53lutxj2 as PrimitiveSerialDescriptor,
  serializer2lw83vwvpnyms as serializer_0,
  MapSerializer11kmegt3g5c1g as MapSerializer,
  SerialDescriptor2pelqekb5ic3a as SerialDescriptor,
  ListSerializer1hxuk9dx5n9du as ListSerializer,
  get_isNullable36pbikm8xb7bz as get_isNullable,
  get_isInline5x26qrhi9qs6 as get_isInline,
  get_annotationshjxdbdcl8kmv as get_annotations,
  Encoderqvmrpqtq8hnu as Encoder,
  ElementMarker33ojvsajwmzts as ElementMarker,
  SerializationExceptioneqrdve3ts2n9 as SerializationException,
  SerializationException_init_$Init$nhp5tm45z5re as SerializationException_init_$Init$,
  CLASS_getInstance14ex35co4jkrb as CLASS_getInstance,
  LIST_getInstancey7k5h8d5cvxt as LIST_getInstance,
  CONTEXTUAL_getInstance1845118lbzky0 as CONTEXTUAL_getInstance,
  PolymorphicKindla9gurooefwb as PolymorphicKind,
  PrimitiveKindndgbuh6is7ze as PrimitiveKind,
  MAP_getInstance3s1t6byguxmp9 as MAP_getInstance,
  ENUMlmq49cvwy4ow as ENUM,
  contextual3hpp1gupsu4al as contextual,
  SerializersModuleCollector3dddz14wd7brg as SerializersModuleCollector,
  SealedClassSerializeriwipiibk55zc as SealedClassSerializer,
  jsonCachedSerialNameslxufy2gu43jt as jsonCachedSerialNames,
  AbstractDecoder35guh02ubh2hm as AbstractDecoder,
  AbstractPolymorphicSerializer1ccxwp48nfy58 as AbstractPolymorphicSerializer,
  DeserializationStrategy1z3z5pj9f7zc8 as DeserializationStrategy,
  findPolymorphicSerializer1nm87hvemahcj as findPolymorphicSerializer,
  MissingFieldException24tqif29emcmi as MissingFieldException,
  AbstractEncoder2gxtu3xmy3f8j as AbstractEncoder,
  OBJECT_getInstance26229tfe4t547 as OBJECT_getInstance,
  findPolymorphicSerializerk638ixyjovk5 as findPolymorphicSerializer_0,
  SerializationStrategyh6ouydnm6hci as SerializationStrategy,
  serializer3ikrxnm8b29d6 as serializer_1,
  serializer36584sjyg5661 as serializer_2,
  serializer1q7c5q67ysppr as serializer_3,
  NamedValueDecoderzk26ztf92xbq as NamedValueDecoder,
  getContextualDescriptor2n1gf3b895yb8 as getContextualDescriptor,
} from './kotlinx-serialization-kotlinx-serialization-core.mjs';
import {
  protoOf180f3jzyo7rfj as protoOf,
  initMetadataForObject1cxne3s9w65el as initMetadataForObject,
  VOID3gxj6tk5isa35 as VOID,
  Unit_instance1fbcbse1fwigr as Unit_instance,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
  toString1pkumu07cwy4m as toString,
  IllegalArgumentException_init_$Create$3ewkh27kzt8z8 as IllegalArgumentException_init_$Create$,
  charSequenceLength3278n89t01tmv as charSequenceLength,
  charSequenceGet1vxk1y5n17t1z as charSequenceGet,
  _Char___init__impl__6a9atx2js6krycynjoo as _Char___init__impl__6a9atx,
  equals2au1ep9vhcato as equals,
  toString30pk9tzaqopn as toString_0,
  Enum3alwj03lh1n41 as Enum,
  initMetadataForInterface1egvbzx539z91 as initMetadataForInterface,
  initMetadataForCompanion1wyw17z38v6ac as initMetadataForCompanion,
  StringBuilder_init_$Create$2qsge4ydj6bin as StringBuilder_init_$Create$,
  hashCodeq5arwsb9dgti as hashCode,
  joinToString1cxrrlmo0chqs as joinToString,
  THROW_CCE2g6jy02ryeudk as THROW_CCE,
  KtMap140uvy3s5zad8 as KtMap,
  KtList3hktaavzmj137 as KtList,
  getKClassFromExpression348iqjl4fnx2f as getKClassFromExpression,
  getBooleanHashCode1bbj3u6b3v0a7 as getBooleanHashCode,
  getStringHashCode26igk1bx568vk as getStringHashCode,
  toDouble1kn912gjoizjp as toDouble,
  StringCompanionObject_instance3alxothmy382k as StringCompanionObject_instance,
  noWhenBranchMatchedException2a6r7ubxgky5j as noWhenBranchMatchedException,
  toLongOrNullutqivezb0wx1 as toLongOrNull,
  toULongOrNullojoyxi0i9tgj as toULongOrNull,
  ULong3f9k7s38t3rfp as ULong,
  Companion_getInstance1puqqwzccfvrg as Companion_getInstance,
  _ULong___get_data__impl__fggpzb2qlkrfp9zs48z as _ULong___get_data__impl__fggpzb,
  toDoubleOrNullkxwozihadygj as toDoubleOrNull,
  toBooleanStrictOrNull2j0md398tkvbj as toBooleanStrictOrNull,
  isInterface3d6p8outrmvmk as isInterface,
  IllegalStateException_init_$Create$2w9444nebyjns as IllegalStateException_init_$Create$,
  KProperty1ca4yb4wlo496 as KProperty1,
  getPropertyCallableRef3hckxc0xueiaj as getPropertyCallableRef,
  lazy2hsh8ze7j6ikd as lazy,
  fromInt1lka3ktyu79a4 as fromInt,
  _UInt___init__impl__l7qpdltd1eeof8nsuj as _UInt___init__impl__l7qpdl,
  UInt__toString_impl_dbgl213fqto411a11p0 as UInt__toString_impl_dbgl21,
  _ULong___init__impl__c78o9k1p6qzv0dh0bvg as _ULong___init__impl__c78o9k,
  ULong__toString_impl_f9au7kivnvhcxkib53 as ULong__toString_impl_f9au7k,
  _UByte___init__impl__g9hnc43ude1dscg1q30 as _UByte___init__impl__g9hnc4,
  UByte__toString_impl_v72jg2vnfngefiworp as UByte__toString_impl_v72jg,
  _UShort___init__impl__jigrne2jag2u7194ozm as _UShort___init__impl__jigrne,
  UShort__toString_impl_edaoee3e5ovvzk9wm4f as UShort__toString_impl_edaoee,
  captureStack1fzi4aczwc4hg as captureStack,
  charSequenceSubSequence1iwpdba8s3jc7 as charSequenceSubSequence,
  coerceAtLeast2bkz8m9ik7hep as coerceAtLeast,
  coerceAtMost322komnqp70ag as coerceAtMost,
  Collection1k04j3hzsbod0 as Collection,
  LinkedHashMap_init_$Create$1f9mb1z5f3dxn as LinkedHashMap_init_$Create$,
  ArrayList_init_$Create$149jv2ovkkvnt as ArrayList_init_$Create$,
  singleOrNullrknfaxokm1sl as singleOrNull,
  emptyMapr06gerzljqtm as emptyMap,
  getValue48kllevslyh6 as getValue,
  copyOf2ng0t8oizk6it as copyOf,
  arrayCopytctsywo3h7gj as arrayCopy,
  DeepRecursiveFunction3r49v8igsve1g as DeepRecursiveFunction,
  invoke246lvi6tzooz1 as invoke,
  CoroutineImpl2sn3kjnwmfr10 as CoroutineImpl,
  DeepRecursiveScope1pqaydvh4vdcu as DeepRecursiveScope,
  Unitkvevlwgzwiuc as Unit,
  get_COROUTINE_SUSPENDED3ujt3p13qm4iy as get_COROUTINE_SUSPENDED,
  initMetadataForLambda3af3he42mmnh as initMetadataForLambda,
  initMetadataForCoroutine1i7lbatuf5bnt as initMetadataForCoroutine,
  getKClass3t8tygqu4lcxf as getKClass,
  ensureNotNull1e947j3ixpazm as ensureNotNull,
  substringBefore3n7kj60w69hju as substringBefore,
  removeSuffix3d61x5lsuvuho as removeSuffix,
  substringAfter1hku067gwr5ve as substringAfter,
  contains3ue2qo8xhmpf1 as contains,
  plus17rl43at52ays as plus,
  convertToByte1epqhkuyxuz5a as convertToByte,
  equalsLong28bsrfhwvd686 as equalsLong,
  convertToShortvtefcftm709c as convertToShort,
  convertToIntofdoxh9bstof as convertToInt,
  IllegalArgumentException2asla15b5jaob as IllegalArgumentException,
  isFinite1tx0gn65nl9tj as isFinite,
  isFinite2t9l5a275mxm6 as isFinite_0,
  charCodeAt1yspne1d8erbm as charCodeAt,
  toUInt21lx0mz8wkp7c as toUInt,
  _UInt___get_data__impl__f0vqqw13y1a2xkii3dn as _UInt___get_data__impl__f0vqqw,
  toULong266mnyksbttkw as toULong,
  toUByteh6p4wmqswkrs as toUByte,
  _UByte___get_data__impl__jof9qr2p2xx2i2jvnz8 as _UByte___get_data__impl__jof9qr,
  toUShort7yqspfnhrot4 as toUShort,
  _UShort___get_data__impl__g0245hlms5v6vgvnl as _UShort___get_data__impl__g0245,
  objectCreate1ve4bgxiu4x98 as objectCreate,
  toString3o7ifthqydp6e as toString_1,
  Companion_getInstanceuedpedmz4g65 as Companion_getInstance_0,
  Companion_getInstance1trnkq9cty7vr as Companion_getInstance_1,
  Companion_getInstance2du03jiluw9jj as Companion_getInstance_2,
  setOf45ia9pnfhe90 as setOf,
  Char__toInt_impl_vasixd1agw9q2fuvclj as Char__toInt_impl_vasixd,
  numberToChar93r9buh19yek as numberToChar,
  equals2v6cggk171b6e as equals_0,
  toByte4i43936u611k as toByte,
  startsWith26w8qjqapeeq6 as startsWith,
  numberRangeToNumber25vse2rgp6rs8 as numberRangeToNumber,
  ClosedRangehokgr73im9z3 as ClosedRange,
  contains2c50nlxg7en7o as contains_0,
  single29ec4rh52687r as single,
  Char19o2r8palgjof as Char,
  emptySetcxexqki71qfa as emptySet,
  plus1ogy4liedzq5j as plus_0,
  toInt2q8uldh7sc951 as toInt,
  toList3jhuyej2anx2q as toList,
  enumEntries20mr21zbe3az4 as enumEntries,
  toNumberlmbpvqo27r53 as toNumber,
  last1vo29oleiqj36 as last,
  removeLast3759euu1xvfa3 as removeLast,
  lastIndexOf2d52xhix5ymjr as lastIndexOf,
  Long2qws0ah9gnpki as Long,
  Char__minus_impl_a2frrh3548ixwefqxih as Char__minus_impl_a2frrh,
  multiply18i3gv3wlmcjg as multiply,
  add85si75olwt6n as add,
  subtract16cg4lfi29fq9 as subtract,
  compare2uud5j30pw5xc as compare,
  numberToLong345n6tb1n1i71 as numberToLong,
  negate12tprdg5pyd5t as negate,
  charArray2ujmm1qusno00 as charArray,
  indexOfwa4w6635jewi as indexOf,
  indexOf1xbs558u7wr52 as indexOf_0,
  substringiqarkczpya5m as substring,
  StringBuilder_init_$Create$2ujvu6cqvzuyn as StringBuilder_init_$Create$_0,
  HashMap_init_$Create$36kepqnl5avn5 as HashMap_init_$Create$,
} from './kotlin-kotlin-stdlib.mjs';
//region block: imports
var imul = Math.imul;
//endregion
//region block: pre-declaration
initMetadataForClass(Json, 'Json');
initMetadataForObject(Default, 'Default', VOID, Json);
initMetadataForClass(JsonBuilder, 'JsonBuilder');
initMetadataForClass(JsonImpl, 'JsonImpl', VOID, Json);
initMetadataForClass(JsonClassDiscriminator, 'JsonClassDiscriminator');
initMetadataForClass(JsonIgnoreUnknownKeys, 'JsonIgnoreUnknownKeys');
initMetadataForClass(JsonNames, 'JsonNames');
initMetadataForClass(JsonConfiguration, 'JsonConfiguration');
initMetadataForClass(ClassDiscriminatorMode, 'ClassDiscriminatorMode', VOID, Enum);
initMetadataForInterface(JsonDecoder, 'JsonDecoder', VOID, VOID, [Decoder, CompositeDecoder]);
initMetadataForCompanion(Companion);
initMetadataForClass(JsonElement, 'JsonElement', VOID, VOID, VOID, VOID, VOID, {0: JsonElementSerializer_getInstance});
initMetadataForCompanion(Companion_0);
initMetadataForClass(JsonPrimitive, 'JsonPrimitive', VOID, JsonElement, VOID, VOID, VOID, {0: JsonPrimitiveSerializer_getInstance});
initMetadataForCompanion(Companion_1);
initMetadataForClass(JsonObject, 'JsonObject', VOID, JsonElement, [JsonElement, KtMap], VOID, VOID, {0: JsonObjectSerializer_getInstance});
initMetadataForCompanion(Companion_2);
initMetadataForClass(JsonArray, 'JsonArray', VOID, JsonElement, [JsonElement, KtList], VOID, VOID, {0: JsonArraySerializer_getInstance});
initMetadataForObject(JsonNull, 'JsonNull', VOID, JsonPrimitive, [JsonPrimitive, SerializerFactory], VOID, VOID, {0: JsonNullSerializer_getInstance});
initMetadataForClass(JsonLiteral, 'JsonLiteral', VOID, JsonPrimitive);
initMetadataForObject(JsonElementSerializer, 'JsonElementSerializer', VOID, VOID, [KSerializer]);
initMetadataForObject(JsonPrimitiveSerializer, 'JsonPrimitiveSerializer', VOID, VOID, [KSerializer]);
initMetadataForObject(JsonNullSerializer, 'JsonNullSerializer', VOID, VOID, [KSerializer]);
initMetadataForObject(JsonLiteralSerializer, 'JsonLiteralSerializer', VOID, VOID, [KSerializer]);
initMetadataForObject(JsonObjectDescriptor, 'JsonObjectDescriptor', VOID, VOID, [SerialDescriptor]);
initMetadataForObject(JsonObjectSerializer, 'JsonObjectSerializer', VOID, VOID, [KSerializer]);
initMetadataForObject(JsonArrayDescriptor, 'JsonArrayDescriptor', VOID, VOID, [SerialDescriptor]);
initMetadataForObject(JsonArraySerializer, 'JsonArraySerializer', VOID, VOID, [KSerializer]);
initMetadataForClass(defer$1, VOID, VOID, VOID, [SerialDescriptor]);
initMetadataForInterface(JsonEncoder, 'JsonEncoder', VOID, VOID, [Encoder]);
initMetadataForClass(Composer, 'Composer');
initMetadataForClass(ComposerForUnsignedNumbers, 'ComposerForUnsignedNumbers', VOID, Composer);
initMetadataForClass(ComposerForUnquotedLiterals, 'ComposerForUnquotedLiterals', VOID, Composer);
initMetadataForClass(ComposerWithPrettyPrint, 'ComposerWithPrettyPrint', VOID, Composer);
initMetadataForClass(JsonElementMarker, 'JsonElementMarker');
initMetadataForClass(JsonException, 'JsonException', VOID, SerializationException);
initMetadataForClass(JsonDecodingException, 'JsonDecodingException', VOID, JsonException);
initMetadataForClass(JsonEncodingException, 'JsonEncodingException', VOID, JsonException);
initMetadataForObject(Tombstone, 'Tombstone');
initMetadataForClass(JsonPath, 'JsonPath', JsonPath);
initMetadataForClass(JsonSerializersModuleValidator, 'JsonSerializersModuleValidator', VOID, VOID, [SerializersModuleCollector]);
initMetadataForLambda(JsonTreeReader$readDeepRecursive$slambda, CoroutineImpl, VOID, [2]);
initMetadataForCoroutine($readObjectCOROUTINE$, CoroutineImpl);
initMetadataForClass(JsonTreeReader, 'JsonTreeReader', VOID, VOID, VOID, [1]);
initMetadataForClass(Key, 'Key', Key);
initMetadataForClass(DescriptorSchemaCache, 'DescriptorSchemaCache', DescriptorSchemaCache);
initMetadataForClass(DiscriminatorHolder, 'DiscriminatorHolder');
initMetadataForClass(StreamingJsonDecoder, 'StreamingJsonDecoder', VOID, AbstractDecoder, [JsonDecoder, AbstractDecoder]);
initMetadataForClass(JsonDecoderForUnsignedTypes, 'JsonDecoderForUnsignedTypes', VOID, AbstractDecoder);
initMetadataForClass(StreamingJsonEncoder, 'StreamingJsonEncoder', VOID, AbstractEncoder, [JsonEncoder, AbstractEncoder]);
initMetadataForClass(AbstractJsonTreeDecoder, 'AbstractJsonTreeDecoder', VOID, NamedValueDecoder, [NamedValueDecoder, JsonDecoder]);
initMetadataForClass(JsonTreeDecoder, 'JsonTreeDecoder', VOID, AbstractJsonTreeDecoder);
initMetadataForClass(JsonTreeListDecoder, 'JsonTreeListDecoder', VOID, AbstractJsonTreeDecoder);
initMetadataForClass(JsonPrimitiveDecoder, 'JsonPrimitiveDecoder', VOID, AbstractJsonTreeDecoder);
initMetadataForClass(JsonTreeMapDecoder, 'JsonTreeMapDecoder', VOID, JsonTreeDecoder);
initMetadataForClass(WriteMode, 'WriteMode', VOID, Enum);
initMetadataForClass(AbstractJsonLexer, 'AbstractJsonLexer');
initMetadataForObject(CharMappings, 'CharMappings');
initMetadataForClass(StringJsonLexer, 'StringJsonLexer', VOID, AbstractJsonLexer);
initMetadataForClass(StringJsonLexerWithComments, 'StringJsonLexerWithComments', VOID, StringJsonLexer);
initMetadataForClass(JsonToStringWriter, 'JsonToStringWriter', JsonToStringWriter);
//endregion
function Default() {
  Default_instance = this;
  Json.call(this, new JsonConfiguration(), EmptySerializersModule());
}
var Default_instance;
function Default_getInstance() {
  if (Default_instance == null)
    new Default();
  return Default_instance;
}
function Json(configuration, serializersModule) {
  Default_getInstance();
  this.a15_1 = configuration;
  this.b15_1 = serializersModule;
  this.c15_1 = new DescriptorSchemaCache();
}
protoOf(Json).lp = function () {
  return this.b15_1;
};
protoOf(Json).d15 = function (serializer, value) {
  var result = new JsonToStringWriter();
  try {
    encodeByWriter(this, result, serializer, value);
    return result.toString();
  }finally {
    result.g15();
  }
};
protoOf(Json).e15 = function (deserializer, string) {
  var lexer = StringJsonLexer_0(this, string);
  var input = new StreamingJsonDecoder(this, WriteMode_OBJ_getInstance(), lexer, deserializer.am(), null);
  var result = input.wo(deserializer);
  lexer.t15();
  return result;
};
function Json_0(from, builderAction) {
  from = from === VOID ? Default_getInstance() : from;
  var builder = new JsonBuilder(from);
  builderAction(builder);
  var conf = builder.m16();
  return new JsonImpl(conf, builder.l16_1);
}
function JsonBuilder(json) {
  this.u15_1 = json.a15_1.n16_1;
  this.v15_1 = json.a15_1.s16_1;
  this.w15_1 = json.a15_1.o16_1;
  this.x15_1 = json.a15_1.p16_1;
  this.y15_1 = json.a15_1.r16_1;
  this.z15_1 = json.a15_1.t16_1;
  this.a16_1 = json.a15_1.u16_1;
  this.b16_1 = json.a15_1.w16_1;
  this.c16_1 = json.a15_1.d17_1;
  this.d16_1 = json.a15_1.y16_1;
  this.e16_1 = json.a15_1.z16_1;
  this.f16_1 = json.a15_1.a17_1;
  this.g16_1 = json.a15_1.b17_1;
  this.h16_1 = json.a15_1.c17_1;
  this.i16_1 = json.a15_1.x16_1;
  this.j16_1 = json.a15_1.q16_1;
  this.k16_1 = json.a15_1.v16_1;
  this.l16_1 = json.lp();
}
protoOf(JsonBuilder).m16 = function () {
  if (this.k16_1) {
    // Inline function 'kotlin.require' call
    if (!(this.b16_1 === 'type')) {
      var message = 'Class discriminator should not be specified when array polymorphism is specified';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    // Inline function 'kotlin.require' call
    if (!this.c16_1.equals(ClassDiscriminatorMode_POLYMORPHIC_getInstance())) {
      var message_0 = 'useArrayPolymorphism option can only be used if classDiscriminatorMode in a default POLYMORPHIC state.';
      throw IllegalArgumentException_init_$Create$(toString(message_0));
    }
  }
  if (!this.y15_1) {
    // Inline function 'kotlin.require' call
    if (!(this.z15_1 === '    ')) {
      var message_1 = 'Indent should not be specified when default printing mode is used';
      throw IllegalArgumentException_init_$Create$(toString(message_1));
    }
  } else if (!(this.z15_1 === '    ')) {
    var tmp0 = this.z15_1;
    var tmp$ret$7;
    $l$block: {
      // Inline function 'kotlin.text.all' call
      var inductionVariable = 0;
      while (inductionVariable < charSequenceLength(tmp0)) {
        var element = charSequenceGet(tmp0, inductionVariable);
        inductionVariable = inductionVariable + 1 | 0;
        if (!(element === _Char___init__impl__6a9atx(32) || element === _Char___init__impl__6a9atx(9) || element === _Char___init__impl__6a9atx(13) || element === _Char___init__impl__6a9atx(10))) {
          tmp$ret$7 = false;
          break $l$block;
        }
      }
      tmp$ret$7 = true;
    }
    var allWhitespaces = tmp$ret$7;
    // Inline function 'kotlin.require' call
    if (!allWhitespaces) {
      var message_2 = 'Only whitespace, tab, newline and carriage return are allowed as pretty print symbols. Had ' + this.z15_1;
      throw IllegalArgumentException_init_$Create$(toString(message_2));
    }
  }
  return new JsonConfiguration(this.u15_1, this.w15_1, this.x15_1, this.j16_1, this.y15_1, this.v15_1, this.z15_1, this.a16_1, this.k16_1, this.b16_1, this.i16_1, this.d16_1, this.e16_1, this.f16_1, this.g16_1, this.h16_1, this.c16_1);
};
function validateConfiguration($this) {
  if (equals($this.lp(), EmptySerializersModule()))
    return Unit_instance;
  var collector = new JsonSerializersModuleValidator($this.a15_1);
  $this.lp().i14(collector);
}
function JsonImpl(configuration, module_0) {
  Json.call(this, configuration, module_0);
  validateConfiguration(this);
}
function JsonClassDiscriminator() {
}
function JsonIgnoreUnknownKeys() {
}
function JsonNames() {
}
function JsonConfiguration(encodeDefaults, ignoreUnknownKeys, isLenient, allowStructuredMapKeys, prettyPrint, explicitNulls, prettyPrintIndent, coerceInputValues, useArrayPolymorphism, classDiscriminator, allowSpecialFloatingPointValues, useAlternativeNames, namingStrategy, decodeEnumsCaseInsensitive, allowTrailingComma, allowComments, classDiscriminatorMode) {
  encodeDefaults = encodeDefaults === VOID ? false : encodeDefaults;
  ignoreUnknownKeys = ignoreUnknownKeys === VOID ? false : ignoreUnknownKeys;
  isLenient = isLenient === VOID ? false : isLenient;
  allowStructuredMapKeys = allowStructuredMapKeys === VOID ? false : allowStructuredMapKeys;
  prettyPrint = prettyPrint === VOID ? false : prettyPrint;
  explicitNulls = explicitNulls === VOID ? true : explicitNulls;
  prettyPrintIndent = prettyPrintIndent === VOID ? '    ' : prettyPrintIndent;
  coerceInputValues = coerceInputValues === VOID ? false : coerceInputValues;
  useArrayPolymorphism = useArrayPolymorphism === VOID ? false : useArrayPolymorphism;
  classDiscriminator = classDiscriminator === VOID ? 'type' : classDiscriminator;
  allowSpecialFloatingPointValues = allowSpecialFloatingPointValues === VOID ? false : allowSpecialFloatingPointValues;
  useAlternativeNames = useAlternativeNames === VOID ? true : useAlternativeNames;
  namingStrategy = namingStrategy === VOID ? null : namingStrategy;
  decodeEnumsCaseInsensitive = decodeEnumsCaseInsensitive === VOID ? false : decodeEnumsCaseInsensitive;
  allowTrailingComma = allowTrailingComma === VOID ? false : allowTrailingComma;
  allowComments = allowComments === VOID ? false : allowComments;
  classDiscriminatorMode = classDiscriminatorMode === VOID ? ClassDiscriminatorMode_POLYMORPHIC_getInstance() : classDiscriminatorMode;
  this.n16_1 = encodeDefaults;
  this.o16_1 = ignoreUnknownKeys;
  this.p16_1 = isLenient;
  this.q16_1 = allowStructuredMapKeys;
  this.r16_1 = prettyPrint;
  this.s16_1 = explicitNulls;
  this.t16_1 = prettyPrintIndent;
  this.u16_1 = coerceInputValues;
  this.v16_1 = useArrayPolymorphism;
  this.w16_1 = classDiscriminator;
  this.x16_1 = allowSpecialFloatingPointValues;
  this.y16_1 = useAlternativeNames;
  this.z16_1 = namingStrategy;
  this.a17_1 = decodeEnumsCaseInsensitive;
  this.b17_1 = allowTrailingComma;
  this.c17_1 = allowComments;
  this.d17_1 = classDiscriminatorMode;
}
protoOf(JsonConfiguration).toString = function () {
  return 'JsonConfiguration(encodeDefaults=' + this.n16_1 + ', ignoreUnknownKeys=' + this.o16_1 + ', isLenient=' + this.p16_1 + ', ' + ('allowStructuredMapKeys=' + this.q16_1 + ', prettyPrint=' + this.r16_1 + ', explicitNulls=' + this.s16_1 + ', ') + ("prettyPrintIndent='" + this.t16_1 + "', coerceInputValues=" + this.u16_1 + ', useArrayPolymorphism=' + this.v16_1 + ', ') + ("classDiscriminator='" + this.w16_1 + "', allowSpecialFloatingPointValues=" + this.x16_1 + ', ') + ('useAlternativeNames=' + this.y16_1 + ', namingStrategy=' + toString_0(this.z16_1) + ', decodeEnumsCaseInsensitive=' + this.a17_1 + ', ') + ('allowTrailingComma=' + this.b17_1 + ', allowComments=' + this.c17_1 + ', classDiscriminatorMode=' + this.d17_1.toString() + ')');
};
var ClassDiscriminatorMode_NONE_instance;
var ClassDiscriminatorMode_ALL_JSON_OBJECTS_instance;
var ClassDiscriminatorMode_POLYMORPHIC_instance;
var ClassDiscriminatorMode_entriesInitialized;
function ClassDiscriminatorMode_initEntries() {
  if (ClassDiscriminatorMode_entriesInitialized)
    return Unit_instance;
  ClassDiscriminatorMode_entriesInitialized = true;
  ClassDiscriminatorMode_NONE_instance = new ClassDiscriminatorMode('NONE', 0);
  ClassDiscriminatorMode_ALL_JSON_OBJECTS_instance = new ClassDiscriminatorMode('ALL_JSON_OBJECTS', 1);
  ClassDiscriminatorMode_POLYMORPHIC_instance = new ClassDiscriminatorMode('POLYMORPHIC', 2);
}
function ClassDiscriminatorMode(name, ordinal) {
  Enum.call(this, name, ordinal);
}
function ClassDiscriminatorMode_NONE_getInstance() {
  ClassDiscriminatorMode_initEntries();
  return ClassDiscriminatorMode_NONE_instance;
}
function ClassDiscriminatorMode_POLYMORPHIC_getInstance() {
  ClassDiscriminatorMode_initEntries();
  return ClassDiscriminatorMode_POLYMORPHIC_instance;
}
function JsonDecoder() {
}
function get_jsonUnquotedLiteralDescriptor() {
  _init_properties_JsonElement_kt__7cbdc2();
  return jsonUnquotedLiteralDescriptor;
}
var jsonUnquotedLiteralDescriptor;
function Companion() {
}
var Companion_instance;
function Companion_getInstance_3() {
  return Companion_instance;
}
function JsonElement() {
}
function Companion_0() {
}
var Companion_instance_0;
function Companion_getInstance_4() {
  return Companion_instance_0;
}
function JsonPrimitive() {
  JsonElement.call(this);
}
protoOf(JsonPrimitive).toString = function () {
  return this.h17();
};
function Companion_1() {
}
var Companion_instance_1;
function Companion_getInstance_5() {
  return Companion_instance_1;
}
function JsonObject$toString$lambda(_destruct__k2r9zo) {
  // Inline function 'kotlin.collections.component1' call
  var k = _destruct__k2r9zo.l2();
  // Inline function 'kotlin.collections.component2' call
  var v = _destruct__k2r9zo.m2();
  // Inline function 'kotlin.text.buildString' call
  // Inline function 'kotlin.apply' call
  var this_0 = StringBuilder_init_$Create$();
  printQuoted(this_0, k);
  this_0.s7(_Char___init__impl__6a9atx(58));
  this_0.q7(v);
  return this_0.toString();
}
function JsonObject(content) {
  JsonElement.call(this);
  this.i17_1 = content;
}
protoOf(JsonObject).equals = function (other) {
  return equals(this.i17_1, other);
};
protoOf(JsonObject).hashCode = function () {
  return hashCode(this.i17_1);
};
protoOf(JsonObject).toString = function () {
  var tmp = this.i17_1.h2();
  return joinToString(tmp, ',', '{', '}', VOID, VOID, JsonObject$toString$lambda);
};
protoOf(JsonObject).o = function () {
  return this.i17_1.o();
};
protoOf(JsonObject).j17 = function (key) {
  return this.i17_1.i2(key);
};
protoOf(JsonObject).i2 = function (key) {
  if (!(!(key == null) ? typeof key === 'string' : false))
    return false;
  return this.j17((!(key == null) ? typeof key === 'string' : false) ? key : THROW_CCE());
};
protoOf(JsonObject).k17 = function (key) {
  return this.i17_1.k2(key);
};
protoOf(JsonObject).k2 = function (key) {
  if (!(!(key == null) ? typeof key === 'string' : false))
    return null;
  return this.k17((!(key == null) ? typeof key === 'string' : false) ? key : THROW_CCE());
};
protoOf(JsonObject).u = function () {
  return this.i17_1.u();
};
protoOf(JsonObject).f2 = function () {
  return this.i17_1.f2();
};
protoOf(JsonObject).g2 = function () {
  return this.i17_1.g2();
};
protoOf(JsonObject).h2 = function () {
  return this.i17_1.h2();
};
function Companion_2() {
}
var Companion_instance_2;
function Companion_getInstance_6() {
  return Companion_instance_2;
}
function JsonArray(content) {
  JsonElement.call(this);
  this.l17_1 = content;
}
protoOf(JsonArray).equals = function (other) {
  return equals(this.l17_1, other);
};
protoOf(JsonArray).hashCode = function () {
  return hashCode(this.l17_1);
};
protoOf(JsonArray).toString = function () {
  return joinToString(this.l17_1, ',', '[', ']');
};
protoOf(JsonArray).o = function () {
  return this.l17_1.o();
};
protoOf(JsonArray).m17 = function (element) {
  return this.l17_1.y1(element);
};
protoOf(JsonArray).y1 = function (element) {
  if (!(element instanceof JsonElement))
    return false;
  return this.m17(element instanceof JsonElement ? element : THROW_CCE());
};
protoOf(JsonArray).r = function () {
  return this.l17_1.r();
};
protoOf(JsonArray).w = function (index) {
  return this.l17_1.w(index);
};
protoOf(JsonArray).x = function (index) {
  return this.l17_1.x(index);
};
protoOf(JsonArray).z1 = function (fromIndex, toIndex) {
  return this.l17_1.z1(fromIndex, toIndex);
};
protoOf(JsonArray).u = function () {
  return this.l17_1.u();
};
function JsonNull() {
  JsonNull_instance = this;
  JsonPrimitive.call(this);
  this.n17_1 = 'null';
}
protoOf(JsonNull).g17 = function () {
  return false;
};
protoOf(JsonNull).h17 = function () {
  return this.n17_1;
};
protoOf(JsonNull).o17 = function () {
  return JsonNullSerializer_getInstance();
};
protoOf(JsonNull).qw = function (typeParamsSerializers) {
  return this.o17();
};
var JsonNull_instance;
function JsonNull_getInstance() {
  if (JsonNull_instance == null)
    new JsonNull();
  return JsonNull_instance;
}
function JsonLiteral(body, isString, coerceToInlineType) {
  coerceToInlineType = coerceToInlineType === VOID ? null : coerceToInlineType;
  JsonPrimitive.call(this);
  this.p17_1 = isString;
  this.q17_1 = coerceToInlineType;
  this.r17_1 = toString(body);
  if (!(this.q17_1 == null)) {
    // Inline function 'kotlin.require' call
    // Inline function 'kotlin.require' call
    if (!this.q17_1.jn()) {
      var message = 'Failed requirement.';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
  }
}
protoOf(JsonLiteral).g17 = function () {
  return this.p17_1;
};
protoOf(JsonLiteral).h17 = function () {
  return this.r17_1;
};
protoOf(JsonLiteral).toString = function () {
  var tmp;
  if (this.p17_1) {
    // Inline function 'kotlin.text.buildString' call
    // Inline function 'kotlin.apply' call
    var this_0 = StringBuilder_init_$Create$();
    printQuoted(this_0, this.r17_1);
    tmp = this_0.toString();
  } else {
    tmp = this.r17_1;
  }
  return tmp;
};
protoOf(JsonLiteral).equals = function (other) {
  if (this === other)
    return true;
  if (other == null || !getKClassFromExpression(this).equals(getKClassFromExpression(other)))
    return false;
  if (!(other instanceof JsonLiteral))
    THROW_CCE();
  if (!(this.p17_1 === other.p17_1))
    return false;
  if (!(this.r17_1 === other.r17_1))
    return false;
  return true;
};
protoOf(JsonLiteral).hashCode = function () {
  var result = getBooleanHashCode(this.p17_1);
  result = imul(31, result) + getStringHashCode(this.r17_1) | 0;
  return result;
};
function get_booleanOrNull(_this__u8e3s4) {
  _init_properties_JsonElement_kt__7cbdc2();
  return toBooleanStrictOrNull_0(_this__u8e3s4.h17());
}
function parseLongImpl(_this__u8e3s4) {
  _init_properties_JsonElement_kt__7cbdc2();
  return (new StringJsonLexer(_this__u8e3s4.h17())).s17();
}
function get_float(_this__u8e3s4) {
  _init_properties_JsonElement_kt__7cbdc2();
  // Inline function 'kotlin.text.toFloat' call
  var this_0 = _this__u8e3s4.h17();
  // Inline function 'kotlin.js.unsafeCast' call
  // Inline function 'kotlin.js.asDynamic' call
  return toDouble(this_0);
}
function get_double(_this__u8e3s4) {
  _init_properties_JsonElement_kt__7cbdc2();
  return toDouble(_this__u8e3s4.h17());
}
function get_contentOrNull(_this__u8e3s4) {
  _init_properties_JsonElement_kt__7cbdc2();
  var tmp;
  if (_this__u8e3s4 instanceof JsonNull) {
    tmp = null;
  } else {
    tmp = _this__u8e3s4.h17();
  }
  return tmp;
}
function JsonPrimitive_0(value) {
  _init_properties_JsonElement_kt__7cbdc2();
  if (value == null)
    return JsonNull_getInstance();
  return new JsonLiteral(value, true);
}
function JsonPrimitive_1(value) {
  _init_properties_JsonElement_kt__7cbdc2();
  if (value == null)
    return JsonNull_getInstance();
  return new JsonLiteral(value, false);
}
function JsonPrimitive_2(value) {
  _init_properties_JsonElement_kt__7cbdc2();
  if (value == null)
    return JsonNull_getInstance();
  return new JsonLiteral(value, false);
}
function get_jsonPrimitive(_this__u8e3s4) {
  _init_properties_JsonElement_kt__7cbdc2();
  var tmp0_elvis_lhs = _this__u8e3s4 instanceof JsonPrimitive ? _this__u8e3s4 : null;
  var tmp;
  if (tmp0_elvis_lhs == null) {
    error(_this__u8e3s4, 'JsonPrimitive');
  } else {
    tmp = tmp0_elvis_lhs;
  }
  return tmp;
}
function error(_this__u8e3s4, element) {
  _init_properties_JsonElement_kt__7cbdc2();
  throw IllegalArgumentException_init_$Create$('Element ' + toString(getKClassFromExpression(_this__u8e3s4)) + ' is not a ' + element);
}
var properties_initialized_JsonElement_kt_abxy8s;
function _init_properties_JsonElement_kt__7cbdc2() {
  if (!properties_initialized_JsonElement_kt_abxy8s) {
    properties_initialized_JsonElement_kt_abxy8s = true;
    jsonUnquotedLiteralDescriptor = InlinePrimitiveDescriptor('kotlinx.serialization.json.JsonUnquotedLiteral', serializer(StringCompanionObject_instance));
  }
}
function JsonElementSerializer$descriptor$lambda($this$buildSerialDescriptor) {
  $this$buildSerialDescriptor.om('JsonPrimitive', defer(JsonElementSerializer$descriptor$lambda$lambda));
  $this$buildSerialDescriptor.om('JsonNull', defer(JsonElementSerializer$descriptor$lambda$lambda_0));
  $this$buildSerialDescriptor.om('JsonLiteral', defer(JsonElementSerializer$descriptor$lambda$lambda_1));
  $this$buildSerialDescriptor.om('JsonObject', defer(JsonElementSerializer$descriptor$lambda$lambda_2));
  $this$buildSerialDescriptor.om('JsonArray', defer(JsonElementSerializer$descriptor$lambda$lambda_3));
  return Unit_instance;
}
function JsonElementSerializer$descriptor$lambda$lambda() {
  return JsonPrimitiveSerializer_getInstance().t17_1;
}
function JsonElementSerializer$descriptor$lambda$lambda_0() {
  return JsonNullSerializer_getInstance().u17_1;
}
function JsonElementSerializer$descriptor$lambda$lambda_1() {
  return JsonLiteralSerializer_getInstance().v17_1;
}
function JsonElementSerializer$descriptor$lambda$lambda_2() {
  return JsonObjectSerializer_getInstance().w17_1;
}
function JsonElementSerializer$descriptor$lambda$lambda_3() {
  return JsonArraySerializer_getInstance().x17_1;
}
function JsonElementSerializer() {
  JsonElementSerializer_instance = this;
  var tmp = this;
  var tmp_0 = SEALED_getInstance();
  tmp.y17_1 = buildSerialDescriptor('kotlinx.serialization.json.JsonElement', tmp_0, [], JsonElementSerializer$descriptor$lambda);
}
protoOf(JsonElementSerializer).am = function () {
  return this.y17_1;
};
protoOf(JsonElementSerializer).z17 = function (encoder, value) {
  verify(encoder);
  if (value instanceof JsonPrimitive) {
    encoder.nq(JsonPrimitiveSerializer_getInstance(), value);
  } else {
    if (value instanceof JsonObject) {
      encoder.nq(JsonObjectSerializer_getInstance(), value);
    } else {
      if (value instanceof JsonArray) {
        encoder.nq(JsonArraySerializer_getInstance(), value);
      } else {
        noWhenBranchMatchedException();
      }
    }
  }
};
protoOf(JsonElementSerializer).bm = function (encoder, value) {
  return this.z17(encoder, value instanceof JsonElement ? value : THROW_CCE());
};
protoOf(JsonElementSerializer).cm = function (decoder) {
  var input = asJsonDecoder(decoder);
  return input.f17();
};
var JsonElementSerializer_instance;
function JsonElementSerializer_getInstance() {
  if (JsonElementSerializer_instance == null)
    new JsonElementSerializer();
  return JsonElementSerializer_instance;
}
function defer(deferred) {
  return new defer$1(deferred);
}
function JsonPrimitiveSerializer() {
  JsonPrimitiveSerializer_instance = this;
  this.t17_1 = buildSerialDescriptor('kotlinx.serialization.json.JsonPrimitive', STRING_getInstance(), []);
}
protoOf(JsonPrimitiveSerializer).am = function () {
  return this.t17_1;
};
protoOf(JsonPrimitiveSerializer).a18 = function (encoder, value) {
  verify(encoder);
  var tmp;
  if (value instanceof JsonNull) {
    encoder.nq(JsonNullSerializer_getInstance(), JsonNull_getInstance());
    tmp = Unit_instance;
  } else {
    var tmp_0 = JsonLiteralSerializer_getInstance();
    encoder.nq(tmp_0, value instanceof JsonLiteral ? value : THROW_CCE());
    tmp = Unit_instance;
  }
  return tmp;
};
protoOf(JsonPrimitiveSerializer).bm = function (encoder, value) {
  return this.a18(encoder, value instanceof JsonPrimitive ? value : THROW_CCE());
};
protoOf(JsonPrimitiveSerializer).cm = function (decoder) {
  var result = asJsonDecoder(decoder).f17();
  if (!(result instanceof JsonPrimitive))
    throw JsonDecodingException_0(-1, 'Unexpected JSON element, expected JsonPrimitive, had ' + toString(getKClassFromExpression(result)), toString(result));
  return result;
};
var JsonPrimitiveSerializer_instance;
function JsonPrimitiveSerializer_getInstance() {
  if (JsonPrimitiveSerializer_instance == null)
    new JsonPrimitiveSerializer();
  return JsonPrimitiveSerializer_instance;
}
function JsonNullSerializer() {
  JsonNullSerializer_instance = this;
  this.u17_1 = buildSerialDescriptor('kotlinx.serialization.json.JsonNull', ENUM_getInstance(), []);
}
protoOf(JsonNullSerializer).am = function () {
  return this.u17_1;
};
protoOf(JsonNullSerializer).b18 = function (encoder, value) {
  verify(encoder);
  encoder.rp();
};
protoOf(JsonNullSerializer).bm = function (encoder, value) {
  return this.b18(encoder, value instanceof JsonNull ? value : THROW_CCE());
};
protoOf(JsonNullSerializer).cm = function (decoder) {
  verify_0(decoder);
  if (decoder.jo()) {
    throw new JsonDecodingException("Expected 'null' literal");
  }
  decoder.ko();
  return JsonNull_getInstance();
};
var JsonNullSerializer_instance;
function JsonNullSerializer_getInstance() {
  if (JsonNullSerializer_instance == null)
    new JsonNullSerializer();
  return JsonNullSerializer_instance;
}
function JsonLiteralSerializer() {
  JsonLiteralSerializer_instance = this;
  this.v17_1 = PrimitiveSerialDescriptor('kotlinx.serialization.json.JsonLiteral', STRING_getInstance());
}
protoOf(JsonLiteralSerializer).am = function () {
  return this.v17_1;
};
protoOf(JsonLiteralSerializer).c18 = function (encoder, value) {
  verify(encoder);
  if (value.p17_1) {
    return encoder.aq(value.r17_1);
  }
  if (!(value.q17_1 == null)) {
    return encoder.bq(value.q17_1).aq(value.r17_1);
  }
  var tmp0_safe_receiver = toLongOrNull(value.r17_1);
  if (tmp0_safe_receiver == null)
    null;
  else {
    // Inline function 'kotlin.let' call
    return encoder.wp(tmp0_safe_receiver);
  }
  var tmp1_safe_receiver = toULongOrNull(value.r17_1);
  var tmp = tmp1_safe_receiver;
  if ((tmp == null ? null : new ULong(tmp)) == null)
    null;
  else {
    var tmp_0 = tmp1_safe_receiver;
    // Inline function 'kotlin.let' call
    var it = (tmp_0 == null ? null : new ULong(tmp_0)).l1_1;
    var tmp_1 = encoder.bq(serializer_0(Companion_getInstance()).am());
    // Inline function 'kotlin.ULong.toLong' call
    var tmp$ret$1 = _ULong___get_data__impl__fggpzb(it);
    tmp_1.wp(tmp$ret$1);
    return Unit_instance;
  }
  var tmp2_safe_receiver = toDoubleOrNull(value.r17_1);
  if (tmp2_safe_receiver == null)
    null;
  else {
    // Inline function 'kotlin.let' call
    return encoder.yp(tmp2_safe_receiver);
  }
  var tmp3_safe_receiver = toBooleanStrictOrNull(value.r17_1);
  if (tmp3_safe_receiver == null)
    null;
  else {
    // Inline function 'kotlin.let' call
    return encoder.sp(tmp3_safe_receiver);
  }
  encoder.aq(value.r17_1);
};
protoOf(JsonLiteralSerializer).bm = function (encoder, value) {
  return this.c18(encoder, value instanceof JsonLiteral ? value : THROW_CCE());
};
protoOf(JsonLiteralSerializer).cm = function (decoder) {
  var result = asJsonDecoder(decoder).f17();
  if (!(result instanceof JsonLiteral))
    throw JsonDecodingException_0(-1, 'Unexpected JSON element, expected JsonLiteral, had ' + toString(getKClassFromExpression(result)), toString(result));
  return result;
};
var JsonLiteralSerializer_instance;
function JsonLiteralSerializer_getInstance() {
  if (JsonLiteralSerializer_instance == null)
    new JsonLiteralSerializer();
  return JsonLiteralSerializer_instance;
}
function JsonObjectDescriptor() {
  JsonObjectDescriptor_instance = this;
  this.d18_1 = MapSerializer(serializer(StringCompanionObject_instance), JsonElementSerializer_getInstance()).am();
  this.e18_1 = 'kotlinx.serialization.json.JsonObject';
}
protoOf(JsonObjectDescriptor).hn = function () {
  return this.e18_1;
};
protoOf(JsonObjectDescriptor).mn = function (index) {
  return this.d18_1.mn(index);
};
protoOf(JsonObjectDescriptor).nn = function (name) {
  return this.d18_1.nn(name);
};
protoOf(JsonObjectDescriptor).on = function (index) {
  return this.d18_1.on(index);
};
protoOf(JsonObjectDescriptor).pn = function (index) {
  return this.d18_1.pn(index);
};
protoOf(JsonObjectDescriptor).qn = function (index) {
  return this.d18_1.qn(index);
};
protoOf(JsonObjectDescriptor).in = function () {
  return this.d18_1.in();
};
protoOf(JsonObjectDescriptor).an = function () {
  return this.d18_1.an();
};
protoOf(JsonObjectDescriptor).jn = function () {
  return this.d18_1.jn();
};
protoOf(JsonObjectDescriptor).kn = function () {
  return this.d18_1.kn();
};
protoOf(JsonObjectDescriptor).ln = function () {
  return this.d18_1.ln();
};
var JsonObjectDescriptor_instance;
function JsonObjectDescriptor_getInstance() {
  if (JsonObjectDescriptor_instance == null)
    new JsonObjectDescriptor();
  return JsonObjectDescriptor_instance;
}
function JsonObjectSerializer() {
  JsonObjectSerializer_instance = this;
  this.w17_1 = JsonObjectDescriptor_getInstance();
}
protoOf(JsonObjectSerializer).am = function () {
  return this.w17_1;
};
protoOf(JsonObjectSerializer).f18 = function (encoder, value) {
  verify(encoder);
  MapSerializer(serializer(StringCompanionObject_instance), JsonElementSerializer_getInstance()).bm(encoder, value);
};
protoOf(JsonObjectSerializer).bm = function (encoder, value) {
  return this.f18(encoder, value instanceof JsonObject ? value : THROW_CCE());
};
protoOf(JsonObjectSerializer).cm = function (decoder) {
  verify_0(decoder);
  return new JsonObject(MapSerializer(serializer(StringCompanionObject_instance), JsonElementSerializer_getInstance()).cm(decoder));
};
var JsonObjectSerializer_instance;
function JsonObjectSerializer_getInstance() {
  if (JsonObjectSerializer_instance == null)
    new JsonObjectSerializer();
  return JsonObjectSerializer_instance;
}
function JsonArrayDescriptor() {
  JsonArrayDescriptor_instance = this;
  this.g18_1 = ListSerializer(JsonElementSerializer_getInstance()).am();
  this.h18_1 = 'kotlinx.serialization.json.JsonArray';
}
protoOf(JsonArrayDescriptor).hn = function () {
  return this.h18_1;
};
protoOf(JsonArrayDescriptor).mn = function (index) {
  return this.g18_1.mn(index);
};
protoOf(JsonArrayDescriptor).nn = function (name) {
  return this.g18_1.nn(name);
};
protoOf(JsonArrayDescriptor).on = function (index) {
  return this.g18_1.on(index);
};
protoOf(JsonArrayDescriptor).pn = function (index) {
  return this.g18_1.pn(index);
};
protoOf(JsonArrayDescriptor).qn = function (index) {
  return this.g18_1.qn(index);
};
protoOf(JsonArrayDescriptor).in = function () {
  return this.g18_1.in();
};
protoOf(JsonArrayDescriptor).an = function () {
  return this.g18_1.an();
};
protoOf(JsonArrayDescriptor).jn = function () {
  return this.g18_1.jn();
};
protoOf(JsonArrayDescriptor).kn = function () {
  return this.g18_1.kn();
};
protoOf(JsonArrayDescriptor).ln = function () {
  return this.g18_1.ln();
};
var JsonArrayDescriptor_instance;
function JsonArrayDescriptor_getInstance() {
  if (JsonArrayDescriptor_instance == null)
    new JsonArrayDescriptor();
  return JsonArrayDescriptor_instance;
}
function JsonArraySerializer() {
  JsonArraySerializer_instance = this;
  this.x17_1 = JsonArrayDescriptor_getInstance();
}
protoOf(JsonArraySerializer).am = function () {
  return this.x17_1;
};
protoOf(JsonArraySerializer).i18 = function (encoder, value) {
  verify(encoder);
  ListSerializer(JsonElementSerializer_getInstance()).bm(encoder, value);
};
protoOf(JsonArraySerializer).bm = function (encoder, value) {
  return this.i18(encoder, value instanceof JsonArray ? value : THROW_CCE());
};
protoOf(JsonArraySerializer).cm = function (decoder) {
  verify_0(decoder);
  return new JsonArray(ListSerializer(JsonElementSerializer_getInstance()).cm(decoder));
};
var JsonArraySerializer_instance;
function JsonArraySerializer_getInstance() {
  if (JsonArraySerializer_instance == null)
    new JsonArraySerializer();
  return JsonArraySerializer_instance;
}
function verify(encoder) {
  asJsonEncoder(encoder);
}
function asJsonDecoder(_this__u8e3s4) {
  var tmp0_elvis_lhs = isInterface(_this__u8e3s4, JsonDecoder) ? _this__u8e3s4 : null;
  var tmp;
  if (tmp0_elvis_lhs == null) {
    throw IllegalStateException_init_$Create$('This serializer can be used only with Json format.' + ('Expected Decoder to be JsonDecoder, got ' + toString(getKClassFromExpression(_this__u8e3s4))));
  } else {
    tmp = tmp0_elvis_lhs;
  }
  return tmp;
}
function verify_0(decoder) {
  asJsonDecoder(decoder);
}
function asJsonEncoder(_this__u8e3s4) {
  var tmp0_elvis_lhs = isInterface(_this__u8e3s4, JsonEncoder) ? _this__u8e3s4 : null;
  var tmp;
  if (tmp0_elvis_lhs == null) {
    throw IllegalStateException_init_$Create$('This serializer can be used only with Json format.' + ('Expected Encoder to be JsonEncoder, got ' + toString(getKClassFromExpression(_this__u8e3s4))));
  } else {
    tmp = tmp0_elvis_lhs;
  }
  return tmp;
}
function _get_original__l7ku1m($this) {
  var tmp0 = $this.j18_1;
  var tmp = KProperty1;
  // Inline function 'kotlin.getValue' call
  getPropertyCallableRef('original', 1, tmp, defer$o$_get_original_$ref_3cje7k(), null);
  return tmp0.m2();
}
function defer$o$_get_original_$ref_3cje7k() {
  return function (p0) {
    return _get_original__l7ku1m(p0);
  };
}
function defer$1($deferred) {
  this.j18_1 = lazy($deferred);
}
protoOf(defer$1).hn = function () {
  return _get_original__l7ku1m(this).hn();
};
protoOf(defer$1).in = function () {
  return _get_original__l7ku1m(this).in();
};
protoOf(defer$1).kn = function () {
  return _get_original__l7ku1m(this).kn();
};
protoOf(defer$1).mn = function (index) {
  return _get_original__l7ku1m(this).mn(index);
};
protoOf(defer$1).nn = function (name) {
  return _get_original__l7ku1m(this).nn(name);
};
protoOf(defer$1).on = function (index) {
  return _get_original__l7ku1m(this).on(index);
};
protoOf(defer$1).pn = function (index) {
  return _get_original__l7ku1m(this).pn(index);
};
protoOf(defer$1).qn = function (index) {
  return _get_original__l7ku1m(this).qn(index);
};
function JsonEncoder() {
}
function Composer(writer) {
  this.k18_1 = writer;
  this.l18_1 = true;
}
protoOf(Composer).m18 = function () {
  this.l18_1 = true;
};
protoOf(Composer).n18 = function () {
  return Unit_instance;
};
protoOf(Composer).o18 = function () {
  this.l18_1 = false;
};
protoOf(Composer).p18 = function () {
  this.l18_1 = false;
};
protoOf(Composer).q18 = function () {
  return Unit_instance;
};
protoOf(Composer).r18 = function (v) {
  return this.k18_1.s18(v);
};
protoOf(Composer).t18 = function (v) {
  return this.k18_1.u18(v);
};
protoOf(Composer).v18 = function (v) {
  return this.k18_1.u18(v.toString());
};
protoOf(Composer).w18 = function (v) {
  return this.k18_1.u18(v.toString());
};
protoOf(Composer).x18 = function (v) {
  return this.k18_1.y18(fromInt(v));
};
protoOf(Composer).z18 = function (v) {
  return this.k18_1.y18(fromInt(v));
};
protoOf(Composer).a19 = function (v) {
  return this.k18_1.y18(fromInt(v));
};
protoOf(Composer).b19 = function (v) {
  return this.k18_1.y18(v);
};
protoOf(Composer).c19 = function (v) {
  return this.k18_1.u18(v.toString());
};
protoOf(Composer).d19 = function (value) {
  return this.k18_1.e19(value);
};
function Composer_0(sb, json) {
  return json.a15_1.r16_1 ? new ComposerWithPrettyPrint(sb, json) : new Composer(sb);
}
function ComposerForUnsignedNumbers(writer, forceQuoting) {
  Composer.call(this, writer);
  this.h19_1 = forceQuoting;
}
protoOf(ComposerForUnsignedNumbers).a19 = function (v) {
  if (this.h19_1) {
    // Inline function 'kotlin.toUInt' call
    var tmp$ret$0 = _UInt___init__impl__l7qpdl(v);
    this.d19(UInt__toString_impl_dbgl21(tmp$ret$0));
  } else {
    // Inline function 'kotlin.toUInt' call
    var tmp$ret$1 = _UInt___init__impl__l7qpdl(v);
    this.t18(UInt__toString_impl_dbgl21(tmp$ret$1));
  }
};
protoOf(ComposerForUnsignedNumbers).b19 = function (v) {
  if (this.h19_1) {
    // Inline function 'kotlin.toULong' call
    var tmp$ret$0 = _ULong___init__impl__c78o9k(v);
    this.d19(ULong__toString_impl_f9au7k(tmp$ret$0));
  } else {
    // Inline function 'kotlin.toULong' call
    var tmp$ret$1 = _ULong___init__impl__c78o9k(v);
    this.t18(ULong__toString_impl_f9au7k(tmp$ret$1));
  }
};
protoOf(ComposerForUnsignedNumbers).x18 = function (v) {
  if (this.h19_1) {
    // Inline function 'kotlin.toUByte' call
    var tmp$ret$0 = _UByte___init__impl__g9hnc4(v);
    this.d19(UByte__toString_impl_v72jg(tmp$ret$0));
  } else {
    // Inline function 'kotlin.toUByte' call
    var tmp$ret$1 = _UByte___init__impl__g9hnc4(v);
    this.t18(UByte__toString_impl_v72jg(tmp$ret$1));
  }
};
protoOf(ComposerForUnsignedNumbers).z18 = function (v) {
  if (this.h19_1) {
    // Inline function 'kotlin.toUShort' call
    var tmp$ret$0 = _UShort___init__impl__jigrne(v);
    this.d19(UShort__toString_impl_edaoee(tmp$ret$0));
  } else {
    // Inline function 'kotlin.toUShort' call
    var tmp$ret$1 = _UShort___init__impl__jigrne(v);
    this.t18(UShort__toString_impl_edaoee(tmp$ret$1));
  }
};
function ComposerForUnquotedLiterals(writer, forceQuoting) {
  Composer.call(this, writer);
  this.k19_1 = forceQuoting;
}
protoOf(ComposerForUnquotedLiterals).d19 = function (value) {
  if (this.k19_1) {
    protoOf(Composer).d19.call(this, value);
  } else {
    protoOf(Composer).t18.call(this, value);
  }
};
function ComposerWithPrettyPrint(writer, json) {
  Composer.call(this, writer);
  this.n19_1 = json;
  this.o19_1 = 0;
}
protoOf(ComposerWithPrettyPrint).m18 = function () {
  this.l18_1 = true;
  this.o19_1 = this.o19_1 + 1 | 0;
};
protoOf(ComposerWithPrettyPrint).n18 = function () {
  this.o19_1 = this.o19_1 - 1 | 0;
};
protoOf(ComposerWithPrettyPrint).o18 = function () {
  this.l18_1 = false;
  this.t18('\n');
  // Inline function 'kotlin.repeat' call
  var times = this.o19_1;
  var inductionVariable = 0;
  if (inductionVariable < times)
    do {
      var index = inductionVariable;
      inductionVariable = inductionVariable + 1 | 0;
      this.t18(this.n19_1.a15_1.t16_1);
    }
     while (inductionVariable < times);
};
protoOf(ComposerWithPrettyPrint).p18 = function () {
  if (this.l18_1)
    this.l18_1 = false;
  else {
    this.o18();
  }
};
protoOf(ComposerWithPrettyPrint).q18 = function () {
  this.r18(_Char___init__impl__6a9atx(32));
};
function readIfAbsent($this, descriptor, index) {
  $this.q19_1 = (!descriptor.qn(index) && descriptor.pn(index).an());
  return $this.q19_1;
}
function JsonElementMarker$readIfAbsent$ref(p0) {
  var l = function (_this__u8e3s4, p0_0) {
    var tmp0 = p0;
    return readIfAbsent(tmp0, _this__u8e3s4, p0_0);
  };
  l.callableName = 'readIfAbsent';
  return l;
}
function JsonElementMarker(descriptor) {
  var tmp = this;
  tmp.p19_1 = new ElementMarker(descriptor, JsonElementMarker$readIfAbsent$ref(this));
  this.q19_1 = false;
}
protoOf(JsonElementMarker).r19 = function (index) {
  this.p19_1.av(index);
};
protoOf(JsonElementMarker).s19 = function () {
  return this.p19_1.bv();
};
function JsonDecodingException(message) {
  JsonException.call(this, message);
  captureStack(this, JsonDecodingException);
}
function JsonDecodingException_0(offset, message, input) {
  return JsonDecodingException_1(offset, message + '\nJSON input: ' + toString(minify(input, offset)));
}
function JsonException(message) {
  SerializationException_init_$Init$(message, this);
  captureStack(this, JsonException);
}
function JsonDecodingException_1(offset, message) {
  return new JsonDecodingException(offset >= 0 ? 'Unexpected JSON token at offset ' + offset + ': ' + message : message);
}
function minify(_this__u8e3s4, offset) {
  offset = offset === VOID ? -1 : offset;
  if (charSequenceLength(_this__u8e3s4) < 200)
    return _this__u8e3s4;
  if (offset === -1) {
    var start = charSequenceLength(_this__u8e3s4) - 60 | 0;
    if (start <= 0)
      return _this__u8e3s4;
    // Inline function 'kotlin.text.substring' call
    var endIndex = charSequenceLength(_this__u8e3s4);
    return '.....' + toString(charSequenceSubSequence(_this__u8e3s4, start, endIndex));
  }
  var start_0 = offset - 30 | 0;
  var end = offset + 30 | 0;
  var prefix = start_0 <= 0 ? '' : '.....';
  var suffix = end >= charSequenceLength(_this__u8e3s4) ? '' : '.....';
  var tmp2 = coerceAtLeast(start_0, 0);
  // Inline function 'kotlin.text.substring' call
  var endIndex_0 = coerceAtMost(end, charSequenceLength(_this__u8e3s4));
  return prefix + toString(charSequenceSubSequence(_this__u8e3s4, tmp2, endIndex_0)) + suffix;
}
function invalidTrailingComma(_this__u8e3s4, entity) {
  entity = entity === VOID ? 'object' : entity;
  _this__u8e3s4.t19('Trailing comma before the end of JSON ' + entity, _this__u8e3s4.p15_1 - 1 | 0, "Trailing commas are non-complaint JSON and not allowed by default. Use 'allowTrailingComma = true' in 'Json {}' builder to support them.");
}
function throwInvalidFloatingPointDecoded(_this__u8e3s4, result) {
  _this__u8e3s4.u19('Unexpected special floating-point value ' + toString(result) + '. By default, ' + 'non-finite floating point values are prohibited because they do not conform JSON specification', VOID, "It is possible to deserialize them using 'JsonBuilder.allowSpecialFloatingPointValues = true'");
}
function JsonEncodingException(message) {
  JsonException.call(this, message);
  captureStack(this, JsonEncodingException);
}
function InvalidFloatingPointEncoded(value, output) {
  return new JsonEncodingException('Unexpected special floating-point value ' + toString(value) + '. By default, ' + "non-finite floating point values are prohibited because they do not conform JSON specification. It is possible to deserialize them using 'JsonBuilder.allowSpecialFloatingPointValues = true'\n" + ('Current output: ' + toString(minify(output))));
}
function InvalidFloatingPointDecoded(value, key, output) {
  return JsonDecodingException_1(-1, unexpectedFpErrorMessage(value, key, output));
}
function InvalidKeyKindException(keyDescriptor) {
  return new JsonEncodingException("Value of type '" + keyDescriptor.hn() + "' can't be used in JSON as a key in the map. " + ("It should have either primitive or enum kind, but its kind is '" + keyDescriptor.in().toString() + "'.\n") + "Use 'allowStructuredMapKeys = true' in 'Json {}' builder to convert such maps to [key1, value1, key2, value2,...] arrays.");
}
function unexpectedFpErrorMessage(value, key, output) {
  return 'Unexpected special floating-point value ' + toString(value) + ' with key ' + key + '. By default, ' + "non-finite floating point values are prohibited because they do not conform JSON specification. It is possible to deserialize them using 'JsonBuilder.allowSpecialFloatingPointValues = true'\n" + ('Current output: ' + toString(minify(output)));
}
function get_JsonDeserializationNamesKey() {
  _init_properties_JsonNamesMap_kt__cbbp0k();
  return JsonDeserializationNamesKey;
}
var JsonDeserializationNamesKey;
function get_JsonSerializationNamesKey() {
  _init_properties_JsonNamesMap_kt__cbbp0k();
  return JsonSerializationNamesKey;
}
var JsonSerializationNamesKey;
function ignoreUnknownKeys(_this__u8e3s4, json) {
  _init_properties_JsonNamesMap_kt__cbbp0k();
  var tmp;
  if (json.a15_1.o16_1) {
    tmp = true;
  } else {
    var tmp0 = _this__u8e3s4.ln();
    var tmp$ret$0;
    $l$block_0: {
      // Inline function 'kotlin.collections.any' call
      var tmp_0;
      if (isInterface(tmp0, Collection)) {
        tmp_0 = tmp0.o();
      } else {
        tmp_0 = false;
      }
      if (tmp_0) {
        tmp$ret$0 = false;
        break $l$block_0;
      }
      var _iterator__ex2g4s = tmp0.r();
      while (_iterator__ex2g4s.s()) {
        var element = _iterator__ex2g4s.t();
        if (element instanceof JsonIgnoreUnknownKeys) {
          tmp$ret$0 = true;
          break $l$block_0;
        }
      }
      tmp$ret$0 = false;
    }
    tmp = tmp$ret$0;
  }
  return tmp;
}
function getJsonNameIndex(_this__u8e3s4, json, name) {
  _init_properties_JsonNamesMap_kt__cbbp0k();
  if (decodeCaseInsensitive(json, _this__u8e3s4)) {
    // Inline function 'kotlin.text.lowercase' call
    // Inline function 'kotlin.js.asDynamic' call
    var tmp$ret$1 = name.toLowerCase();
    return getJsonNameIndexSlowPath(_this__u8e3s4, json, tmp$ret$1);
  }
  var strategy = namingStrategy(_this__u8e3s4, json);
  if (!(strategy == null))
    return getJsonNameIndexSlowPath(_this__u8e3s4, json, name);
  var index = _this__u8e3s4.nn(name);
  if (!(index === -3))
    return index;
  if (!json.a15_1.y16_1)
    return index;
  return getJsonNameIndexSlowPath(_this__u8e3s4, json, name);
}
function getJsonElementName(_this__u8e3s4, json, index) {
  _init_properties_JsonNamesMap_kt__cbbp0k();
  var strategy = namingStrategy(_this__u8e3s4, json);
  return strategy == null ? _this__u8e3s4.mn(index) : serializationNamesIndices(_this__u8e3s4, json, strategy)[index];
}
function namingStrategy(_this__u8e3s4, json) {
  _init_properties_JsonNamesMap_kt__cbbp0k();
  return equals(_this__u8e3s4.in(), CLASS_getInstance()) ? json.a15_1.z16_1 : null;
}
function deserializationNamesMap(_this__u8e3s4, descriptor) {
  _init_properties_JsonNamesMap_kt__cbbp0k();
  var tmp = get_schemaCache(_this__u8e3s4);
  var tmp_0 = get_JsonDeserializationNamesKey();
  return tmp.w19(descriptor, tmp_0, deserializationNamesMap$lambda(descriptor, _this__u8e3s4));
}
function decodeCaseInsensitive(_this__u8e3s4, descriptor) {
  _init_properties_JsonNamesMap_kt__cbbp0k();
  return _this__u8e3s4.a15_1.a17_1 && equals(descriptor.in(), ENUM_getInstance());
}
function getJsonNameIndexSlowPath(_this__u8e3s4, json, name) {
  _init_properties_JsonNamesMap_kt__cbbp0k();
  var tmp0_elvis_lhs = deserializationNamesMap(json, _this__u8e3s4).k2(name);
  return tmp0_elvis_lhs == null ? -3 : tmp0_elvis_lhs;
}
function serializationNamesIndices(_this__u8e3s4, json, strategy) {
  _init_properties_JsonNamesMap_kt__cbbp0k();
  var tmp = get_schemaCache(json);
  var tmp_0 = get_JsonSerializationNamesKey();
  return tmp.w19(_this__u8e3s4, tmp_0, serializationNamesIndices$lambda(_this__u8e3s4, strategy));
}
function buildDeserializationNamesMap(_this__u8e3s4, json) {
  _init_properties_JsonNamesMap_kt__cbbp0k();
  // Inline function 'kotlin.collections.mutableMapOf' call
  var builder = LinkedHashMap_init_$Create$();
  var useLowercaseEnums = decodeCaseInsensitive(json, _this__u8e3s4);
  var strategyForClasses = namingStrategy(_this__u8e3s4, json);
  var inductionVariable = 0;
  var last = _this__u8e3s4.kn();
  if (inductionVariable < last)
    do {
      var i = inductionVariable;
      inductionVariable = inductionVariable + 1 | 0;
      // Inline function 'kotlin.collections.filterIsInstance' call
      var tmp0 = _this__u8e3s4.on(i);
      // Inline function 'kotlin.collections.filterIsInstanceTo' call
      var destination = ArrayList_init_$Create$();
      var _iterator__ex2g4s = tmp0.r();
      while (_iterator__ex2g4s.s()) {
        var element = _iterator__ex2g4s.t();
        if (element instanceof JsonNames) {
          destination.j(element);
        }
      }
      var tmp0_safe_receiver = singleOrNull(destination);
      var tmp1_safe_receiver = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.x19_1;
      if (tmp1_safe_receiver == null)
        null;
      else {
        // Inline function 'kotlin.collections.forEach' call
        var inductionVariable_0 = 0;
        var last_0 = tmp1_safe_receiver.length;
        while (inductionVariable_0 < last_0) {
          var element_0 = tmp1_safe_receiver[inductionVariable_0];
          inductionVariable_0 = inductionVariable_0 + 1 | 0;
          var tmp;
          if (useLowercaseEnums) {
            // Inline function 'kotlin.text.lowercase' call
            // Inline function 'kotlin.js.asDynamic' call
            tmp = element_0.toLowerCase();
          } else {
            tmp = element_0;
          }
          buildDeserializationNamesMap$putOrThrow(builder, _this__u8e3s4, tmp, i);
        }
      }
      var tmp_0;
      if (useLowercaseEnums) {
        // Inline function 'kotlin.text.lowercase' call
        // Inline function 'kotlin.js.asDynamic' call
        tmp_0 = _this__u8e3s4.mn(i).toLowerCase();
      } else if (!(strategyForClasses == null)) {
        tmp_0 = strategyForClasses.y19(_this__u8e3s4, i, _this__u8e3s4.mn(i));
      } else {
        tmp_0 = null;
      }
      var nameToPut = tmp_0;
      if (nameToPut == null)
        null;
      else {
        // Inline function 'kotlin.let' call
        buildDeserializationNamesMap$putOrThrow(builder, _this__u8e3s4, nameToPut, i);
      }
    }
     while (inductionVariable < last);
  // Inline function 'kotlin.collections.ifEmpty' call
  var tmp_1;
  if (builder.o()) {
    tmp_1 = emptyMap();
  } else {
    tmp_1 = builder;
  }
  return tmp_1;
}
function buildDeserializationNamesMap$putOrThrow(_this__u8e3s4, $this_buildDeserializationNamesMap, name, index) {
  var entity = equals($this_buildDeserializationNamesMap.in(), ENUM_getInstance()) ? 'enum value' : 'property';
  // Inline function 'kotlin.collections.contains' call
  // Inline function 'kotlin.collections.containsKey' call
  if ((isInterface(_this__u8e3s4, KtMap) ? _this__u8e3s4 : THROW_CCE()).i2(name)) {
    throw new JsonException("The suggested name '" + name + "' for " + entity + ' ' + $this_buildDeserializationNamesMap.mn(index) + ' is already one of the names for ' + entity + ' ' + ($this_buildDeserializationNamesMap.mn(getValue(_this__u8e3s4, name)) + ' in ' + toString($this_buildDeserializationNamesMap)));
  }
  // Inline function 'kotlin.collections.set' call
  _this__u8e3s4.b2(name, index);
}
function deserializationNamesMap$lambda($descriptor, $this_deserializationNamesMap) {
  return function () {
    return buildDeserializationNamesMap($descriptor, $this_deserializationNamesMap);
  };
}
function serializationNamesIndices$lambda($this_serializationNamesIndices, $strategy) {
  return function () {
    var tmp = 0;
    var tmp_0 = $this_serializationNamesIndices.kn();
    // Inline function 'kotlin.arrayOfNulls' call
    var tmp_1 = Array(tmp_0);
    while (tmp < tmp_0) {
      var tmp_2 = tmp;
      var baseName = $this_serializationNamesIndices.mn(tmp_2);
      tmp_1[tmp_2] = $strategy.y19($this_serializationNamesIndices, tmp_2, baseName);
      tmp = tmp + 1 | 0;
    }
    return tmp_1;
  };
}
var properties_initialized_JsonNamesMap_kt_ljpf42;
function _init_properties_JsonNamesMap_kt__cbbp0k() {
  if (!properties_initialized_JsonNamesMap_kt_ljpf42) {
    properties_initialized_JsonNamesMap_kt_ljpf42 = true;
    JsonDeserializationNamesKey = new Key();
    JsonSerializationNamesKey = new Key();
  }
}
function Tombstone() {
}
var Tombstone_instance;
function Tombstone_getInstance() {
  return Tombstone_instance;
}
function resize($this) {
  var newSize = imul($this.b1a_1, 2);
  $this.z19_1 = copyOf($this.z19_1, newSize);
  var tmp = 0;
  var tmp_0 = new Int32Array(newSize);
  while (tmp < newSize) {
    tmp_0[tmp] = -1;
    tmp = tmp + 1 | 0;
  }
  var newIndices = tmp_0;
  // Inline function 'kotlin.collections.copyInto' call
  var this_0 = $this.a1a_1;
  var endIndex = this_0.length;
  // Inline function 'kotlin.js.unsafeCast' call
  // Inline function 'kotlin.js.asDynamic' call
  var tmp_1 = this_0;
  // Inline function 'kotlin.js.unsafeCast' call
  // Inline function 'kotlin.js.asDynamic' call
  arrayCopy(tmp_1, newIndices, 0, 0, endIndex);
  $this.a1a_1 = newIndices;
}
function JsonPath() {
  var tmp = this;
  // Inline function 'kotlin.arrayOfNulls' call
  tmp.z19_1 = Array(8);
  var tmp_0 = this;
  var tmp_1 = 0;
  var tmp_2 = new Int32Array(8);
  while (tmp_1 < 8) {
    tmp_2[tmp_1] = -1;
    tmp_1 = tmp_1 + 1 | 0;
  }
  tmp_0.a1a_1 = tmp_2;
  this.b1a_1 = -1;
}
protoOf(JsonPath).c1a = function (sd) {
  this.b1a_1 = this.b1a_1 + 1 | 0;
  var depth = this.b1a_1;
  if (depth === this.z19_1.length) {
    resize(this);
  }
  this.z19_1[depth] = sd;
};
protoOf(JsonPath).d1a = function (index) {
  this.a1a_1[this.b1a_1] = index;
};
protoOf(JsonPath).e1a = function (key) {
  var tmp;
  if (!(this.a1a_1[this.b1a_1] === -2)) {
    this.b1a_1 = this.b1a_1 + 1 | 0;
    tmp = this.b1a_1 === this.z19_1.length;
  } else {
    tmp = false;
  }
  if (tmp) {
    resize(this);
  }
  this.z19_1[this.b1a_1] = key;
  this.a1a_1[this.b1a_1] = -2;
};
protoOf(JsonPath).f1a = function () {
  if (this.a1a_1[this.b1a_1] === -2) {
    this.z19_1[this.b1a_1] = Tombstone_instance;
  }
};
protoOf(JsonPath).g1a = function () {
  var depth = this.b1a_1;
  if (this.a1a_1[depth] === -2) {
    this.a1a_1[depth] = -1;
    this.b1a_1 = this.b1a_1 - 1 | 0;
  }
  if (!(this.b1a_1 === -1)) {
    this.b1a_1 = this.b1a_1 - 1 | 0;
  }
};
protoOf(JsonPath).h1a = function () {
  // Inline function 'kotlin.text.buildString' call
  // Inline function 'kotlin.apply' call
  var this_0 = StringBuilder_init_$Create$();
  this_0.r7('$');
  // Inline function 'kotlin.repeat' call
  var times = this.b1a_1 + 1 | 0;
  var inductionVariable = 0;
  if (inductionVariable < times)
    do {
      var index = inductionVariable;
      inductionVariable = inductionVariable + 1 | 0;
      var element = this.z19_1[index];
      if (!(element == null) ? isInterface(element, SerialDescriptor) : false) {
        if (equals(element.in(), LIST_getInstance())) {
          if (!(this.a1a_1[index] === -1)) {
            this_0.r7('[');
            this_0.jb(this.a1a_1[index]);
            this_0.r7(']');
          }
        } else {
          var idx = this.a1a_1[index];
          if (idx >= 0) {
            this_0.r7('.');
            this_0.r7(element.mn(idx));
          }
        }
      } else {
        if (!(element === Tombstone_instance)) {
          this_0.r7('[');
          this_0.r7("'");
          this_0.q7(element);
          this_0.r7("'");
          this_0.r7(']');
        }
      }
    }
     while (inductionVariable < times);
  return this_0.toString();
};
protoOf(JsonPath).toString = function () {
  return this.h1a();
};
function checkKind($this, descriptor, actualClass) {
  var kind = descriptor.in();
  var tmp;
  if (kind instanceof PolymorphicKind) {
    tmp = true;
  } else {
    tmp = equals(kind, CONTEXTUAL_getInstance());
  }
  if (tmp) {
    throw IllegalArgumentException_init_$Create$('Serializer for ' + actualClass.x9() + " can't be registered as a subclass for polymorphic serialization " + ('because its kind ' + kind.toString() + ' is not concrete. To work with multiple hierarchies, register it as a base class.'));
  }
  if ($this.j1a_1)
    return Unit_instance;
  if (!$this.k1a_1)
    return Unit_instance;
  var tmp_0;
  var tmp_1;
  if (equals(kind, LIST_getInstance()) || equals(kind, MAP_getInstance())) {
    tmp_1 = true;
  } else {
    tmp_1 = kind instanceof PrimitiveKind;
  }
  if (tmp_1) {
    tmp_0 = true;
  } else {
    tmp_0 = kind instanceof ENUM;
  }
  if (tmp_0) {
    throw IllegalArgumentException_init_$Create$('Serializer for ' + actualClass.x9() + ' of kind ' + kind.toString() + ' cannot be serialized polymorphically with class discriminator.');
  }
}
function checkDiscriminatorCollisions($this, descriptor, actualClass) {
  var inductionVariable = 0;
  var last = descriptor.kn();
  if (inductionVariable < last)
    do {
      var i = inductionVariable;
      inductionVariable = inductionVariable + 1 | 0;
      var name = descriptor.mn(i);
      if (name === $this.i1a_1) {
        throw IllegalArgumentException_init_$Create$('Polymorphic serializer for ' + toString(actualClass) + " has property '" + name + "' that conflicts " + 'with JSON class discriminator. You can either change class discriminator in JsonConfiguration, rename property with @SerialName annotation or fall back to array polymorphism');
      }
    }
     while (inductionVariable < last);
}
function JsonSerializersModuleValidator(configuration) {
  this.i1a_1 = configuration.w16_1;
  this.j1a_1 = configuration.v16_1;
  this.k1a_1 = !configuration.d17_1.equals(ClassDiscriminatorMode_NONE_getInstance());
}
protoOf(JsonSerializersModuleValidator).r14 = function (kClass, provider) {
};
protoOf(JsonSerializersModuleValidator).u14 = function (baseClass, actualClass, actualSerializer) {
  var descriptor = actualSerializer.am();
  checkKind(this, descriptor, actualClass);
  if (!this.j1a_1 && this.k1a_1) {
    checkDiscriminatorCollisions(this, descriptor, actualClass);
  }
};
protoOf(JsonSerializersModuleValidator).v14 = function (baseClass, defaultSerializerProvider) {
};
protoOf(JsonSerializersModuleValidator).w14 = function (baseClass, defaultDeserializerProvider) {
};
function encodeByWriter(json, writer, serializer, value) {
  var tmp = WriteMode_OBJ_getInstance();
  // Inline function 'kotlin.arrayOfNulls' call
  var size = get_entries().u();
  var tmp$ret$0 = Array(size);
  var encoder = StreamingJsonEncoder_init_$Create$(writer, json, tmp, tmp$ret$0);
  encoder.nq(serializer, value);
}
function readObject($this) {
  // Inline function 'kotlinx.serialization.json.internal.JsonTreeReader.readObjectImpl' call
  var lastToken = $this.u1a_1.y1a(6);
  if ($this.u1a_1.z1a() === 4) {
    $this.u1a_1.u19('Unexpected leading comma');
  }
  // Inline function 'kotlin.collections.linkedMapOf' call
  var result = LinkedHashMap_init_$Create$();
  $l$loop: while ($this.u1a_1.a1b()) {
    var key = $this.v1a_1 ? $this.u1a_1.c1b() : $this.u1a_1.b1b();
    $this.u1a_1.y1a(5);
    var element = $this.d1b();
    // Inline function 'kotlin.collections.set' call
    result.b2(key, element);
    lastToken = $this.u1a_1.e1b();
    var tmp0_subject = lastToken;
    if (tmp0_subject !== 4)
      if (tmp0_subject === 7)
        break $l$loop;
      else {
        $this.u1a_1.u19('Expected end of the object or comma');
      }
  }
  if (lastToken === 6) {
    $this.u1a_1.y1a(7);
  } else if (lastToken === 4) {
    if (!$this.w1a_1) {
      invalidTrailingComma($this.u1a_1);
    }
    $this.u1a_1.y1a(7);
  }
  return new JsonObject(result);
}
function readObject_0($this, _this__u8e3s4, $completion) {
  var tmp = new $readObjectCOROUTINE$($this, _this__u8e3s4, $completion);
  tmp.m8_1 = Unit_instance;
  tmp.n8_1 = null;
  return tmp.s8();
}
function readArray($this) {
  var lastToken = $this.u1a_1.e1b();
  if ($this.u1a_1.z1a() === 4) {
    $this.u1a_1.u19('Unexpected leading comma');
  }
  // Inline function 'kotlin.collections.arrayListOf' call
  var result = ArrayList_init_$Create$();
  while ($this.u1a_1.a1b()) {
    var element = $this.d1b();
    result.j(element);
    lastToken = $this.u1a_1.e1b();
    if (!(lastToken === 4)) {
      var tmp0 = $this.u1a_1;
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonLexer.require' call
      var condition = lastToken === 9;
      var position = tmp0.p15_1;
      if (!condition) {
        var tmp$ret$1 = 'Expected end of the array or comma';
        tmp0.u19(tmp$ret$1, position);
      }
    }
  }
  if (lastToken === 8) {
    $this.u1a_1.y1a(9);
  } else if (lastToken === 4) {
    if (!$this.w1a_1) {
      invalidTrailingComma($this.u1a_1, 'array');
    }
    $this.u1a_1.y1a(9);
  }
  return new JsonArray(result);
}
function readValue($this, isString) {
  var tmp;
  if ($this.v1a_1 || !isString) {
    tmp = $this.u1a_1.c1b();
  } else {
    tmp = $this.u1a_1.b1b();
  }
  var string = tmp;
  if (!isString && string === 'null')
    return JsonNull_getInstance();
  return new JsonLiteral(string, isString);
}
function readDeepRecursive($this) {
  return invoke(new DeepRecursiveFunction(JsonTreeReader$readDeepRecursive$slambda_0($this, null)), Unit_instance);
}
function JsonTreeReader$readDeepRecursive$slambda(this$0, resultContinuation) {
  this.b1c_1 = this$0;
  CoroutineImpl.call(this, resultContinuation);
}
protoOf(JsonTreeReader$readDeepRecursive$slambda).f1c = function ($this$DeepRecursiveFunction, it, $completion) {
  var tmp = this.g1c($this$DeepRecursiveFunction, it, $completion);
  tmp.m8_1 = Unit_instance;
  tmp.n8_1 = null;
  return tmp.s8();
};
protoOf(JsonTreeReader$readDeepRecursive$slambda).a9 = function (p1, p2, $completion) {
  var tmp = p1 instanceof DeepRecursiveScope ? p1 : THROW_CCE();
  return this.f1c(tmp, p2 instanceof Unit ? p2 : THROW_CCE(), $completion);
};
protoOf(JsonTreeReader$readDeepRecursive$slambda).s8 = function () {
  var suspendResult = this.m8_1;
  $sm: do
    try {
      var tmp = this.k8_1;
      switch (tmp) {
        case 0:
          this.l8_1 = 3;
          var tmp0_subject = this.b1c_1.u1a_1.z1a();
          if (tmp0_subject === 1) {
            this.e1c_1 = readValue(this.b1c_1, true);
            this.k8_1 = 2;
            continue $sm;
          } else {
            if (tmp0_subject === 0) {
              this.e1c_1 = readValue(this.b1c_1, false);
              this.k8_1 = 2;
              continue $sm;
            } else {
              if (tmp0_subject === 6) {
                this.k8_1 = 1;
                suspendResult = readObject_0(this.b1c_1, this.c1c_1, this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }
                continue $sm;
              } else {
                if (tmp0_subject === 8) {
                  this.e1c_1 = readArray(this.b1c_1);
                  this.k8_1 = 2;
                  continue $sm;
                } else {
                  var tmp_0 = this;
                  this.b1c_1.u1a_1.u19("Can't begin reading element, unexpected token");
                }
              }
            }
          }

          break;
        case 1:
          this.e1c_1 = suspendResult;
          this.k8_1 = 2;
          continue $sm;
        case 2:
          return this.e1c_1;
        case 3:
          throw this.n8_1;
      }
    } catch ($p) {
      var e = $p;
      if (this.l8_1 === 3) {
        throw e;
      } else {
        this.k8_1 = this.l8_1;
        this.n8_1 = e;
      }
    }
   while (true);
};
protoOf(JsonTreeReader$readDeepRecursive$slambda).g1c = function ($this$DeepRecursiveFunction, it, completion) {
  var i = new JsonTreeReader$readDeepRecursive$slambda(this.b1c_1, completion);
  i.c1c_1 = $this$DeepRecursiveFunction;
  i.d1c_1 = it;
  return i;
};
function JsonTreeReader$readDeepRecursive$slambda_0(this$0, resultContinuation) {
  var i = new JsonTreeReader$readDeepRecursive$slambda(this$0, resultContinuation);
  var l = function ($this$DeepRecursiveFunction, it, $completion) {
    return i.f1c($this$DeepRecursiveFunction, it, $completion);
  };
  l.$arity = 2;
  return l;
}
function $readObjectCOROUTINE$(_this__u8e3s4, _this__u8e3s4_0, resultContinuation) {
  CoroutineImpl.call(this, resultContinuation);
  this.n1b_1 = _this__u8e3s4;
  this.o1b_1 = _this__u8e3s4_0;
}
protoOf($readObjectCOROUTINE$).s8 = function () {
  var suspendResult = this.m8_1;
  $sm: do
    try {
      var tmp = this.k8_1;
      switch (tmp) {
        case 0:
          this.l8_1 = 5;
          this.q1b_1 = this.n1b_1;
          this.r1b_1 = this.q1b_1.u1a_1.y1a(6);
          if (this.q1b_1.u1a_1.z1a() === 4) {
            this.q1b_1.u1a_1.u19('Unexpected leading comma');
          }

          var tmp_0 = this;
          tmp_0.p1b_1 = LinkedHashMap_init_$Create$();
          this.k8_1 = 1;
          continue $sm;
        case 1:
          if (!this.q1b_1.u1a_1.a1b()) {
            this.k8_1 = 4;
            continue $sm;
          }

          this.s1b_1 = this.q1b_1.v1a_1 ? this.q1b_1.u1a_1.c1b() : this.q1b_1.u1a_1.b1b();
          this.q1b_1.u1a_1.y1a(5);
          this.k8_1 = 2;
          suspendResult = this.o1b_1.rj(Unit_instance, this);
          if (suspendResult === get_COROUTINE_SUSPENDED()) {
            return suspendResult;
          }

          continue $sm;
        case 2:
          var element = suspendResult;
          var tmp0 = this.p1b_1;
          var key = this.s1b_1;
          tmp0.b2(key, element);
          this.r1b_1 = this.q1b_1.u1a_1.e1b();
          var tmp0_subject = this.r1b_1;
          if (tmp0_subject === 4) {
            this.k8_1 = 3;
            continue $sm;
          } else {
            if (tmp0_subject === 7) {
              this.k8_1 = 4;
              continue $sm;
            } else {
              this.q1b_1.u1a_1.u19('Expected end of the object or comma');
            }
          }

          break;
        case 3:
          this.k8_1 = 1;
          continue $sm;
        case 4:
          if (this.r1b_1 === 6) {
            this.q1b_1.u1a_1.y1a(7);
          } else if (this.r1b_1 === 4) {
            if (!this.q1b_1.w1a_1) {
              invalidTrailingComma(this.q1b_1.u1a_1);
            }
            this.q1b_1.u1a_1.y1a(7);
          }

          return new JsonObject(this.p1b_1);
        case 5:
          throw this.n8_1;
      }
    } catch ($p) {
      var e = $p;
      if (this.l8_1 === 5) {
        throw e;
      } else {
        this.k8_1 = this.l8_1;
        this.n8_1 = e;
      }
    }
   while (true);
};
function JsonTreeReader(configuration, lexer) {
  this.u1a_1 = lexer;
  this.v1a_1 = configuration.p16_1;
  this.w1a_1 = configuration.b17_1;
  this.x1a_1 = 0;
}
protoOf(JsonTreeReader).d1b = function () {
  var token = this.u1a_1.z1a();
  var tmp;
  if (token === 1) {
    tmp = readValue(this, true);
  } else if (token === 0) {
    tmp = readValue(this, false);
  } else if (token === 6) {
    var tmp_0;
    this.x1a_1 = this.x1a_1 + 1 | 0;
    if (this.x1a_1 === 200) {
      tmp_0 = readDeepRecursive(this);
    } else {
      tmp_0 = readObject(this);
    }
    var result = tmp_0;
    this.x1a_1 = this.x1a_1 - 1 | 0;
    tmp = result;
  } else if (token === 8) {
    tmp = readArray(this);
  } else {
    this.u1a_1.u19('Cannot read Json element because of unexpected ' + tokenDescription(token));
  }
  return tmp;
};
function classDiscriminator(_this__u8e3s4, json) {
  var _iterator__ex2g4s = _this__u8e3s4.ln().r();
  while (_iterator__ex2g4s.s()) {
    var annotation = _iterator__ex2g4s.t();
    if (annotation instanceof JsonClassDiscriminator)
      return annotation.h1c_1;
  }
  return json.a15_1.w16_1;
}
function validateIfSealed(serializer, actualSerializer, classDiscriminator) {
  if (!(serializer instanceof SealedClassSerializer))
    return Unit_instance;
  if (jsonCachedSerialNames(actualSerializer.am()).y1(classDiscriminator)) {
    var baseName = serializer.am().hn();
    var actualName = actualSerializer.am().hn();
    // Inline function 'kotlin.error' call
    var message = "Sealed class '" + actualName + "' cannot be serialized as base class '" + baseName + "' because" + (" it has property name that conflicts with JSON class discriminator '" + classDiscriminator + "'. ") + 'You can either change class discriminator in JsonConfiguration, rename property with @SerialName annotation or fall back to array polymorphism';
    throw IllegalStateException_init_$Create$(toString(message));
  }
}
function checkKind_0(kind) {
  if (kind instanceof ENUM) {
    // Inline function 'kotlin.error' call
    var message = "Enums cannot be serialized polymorphically with 'type' parameter. You can use 'JsonBuilder.useArrayPolymorphism' instead";
    throw IllegalStateException_init_$Create$(toString(message));
  }
  if (kind instanceof PrimitiveKind) {
    // Inline function 'kotlin.error' call
    var message_0 = "Primitives cannot be serialized polymorphically with 'type' parameter. You can use 'JsonBuilder.useArrayPolymorphism' instead";
    throw IllegalStateException_init_$Create$(toString(message_0));
  }
  if (kind instanceof PolymorphicKind) {
    // Inline function 'kotlin.error' call
    var message_1 = 'Actual serializer for polymorphic cannot be polymorphic itself';
    throw IllegalStateException_init_$Create$(toString(message_1));
  }
}
function access$validateIfSealed$tPolymorphicKt(serializer, actualSerializer, classDiscriminator) {
  return validateIfSealed(serializer, actualSerializer, classDiscriminator);
}
function Key() {
}
function DescriptorSchemaCache() {
  this.v19_1 = createMapForCache(16);
}
protoOf(DescriptorSchemaCache).i1c = function (descriptor, key, value) {
  // Inline function 'kotlin.collections.getOrPut' call
  var this_0 = this.v19_1;
  var value_0 = this_0.k2(descriptor);
  var tmp;
  if (value_0 == null) {
    var answer = createMapForCache(2);
    this_0.b2(descriptor, answer);
    tmp = answer;
  } else {
    tmp = value_0;
  }
  var tmp0 = tmp;
  var tmp2 = key instanceof Key ? key : THROW_CCE();
  // Inline function 'kotlin.collections.set' call
  var value_1 = !(value == null) ? value : THROW_CCE();
  tmp0.b2(tmp2, value_1);
};
protoOf(DescriptorSchemaCache).w19 = function (descriptor, key, defaultValue) {
  var tmp0_safe_receiver = this.j1c(descriptor, key);
  if (tmp0_safe_receiver == null)
    null;
  else {
    // Inline function 'kotlin.let' call
    return tmp0_safe_receiver;
  }
  var value = defaultValue();
  this.i1c(descriptor, key, value);
  return value;
};
protoOf(DescriptorSchemaCache).j1c = function (descriptor, key) {
  var tmp0_safe_receiver = this.v19_1.k2(descriptor);
  var tmp;
  if (tmp0_safe_receiver == null) {
    tmp = null;
  } else {
    tmp = tmp0_safe_receiver.k2(key instanceof Key ? key : THROW_CCE());
  }
  var tmp_0 = tmp;
  return !(tmp_0 == null) ? tmp_0 : null;
};
function DiscriminatorHolder(discriminatorToSkip) {
  this.k1c_1 = discriminatorToSkip;
}
function trySkip($this, _this__u8e3s4, unknownKey) {
  if (_this__u8e3s4 == null)
    return false;
  if (_this__u8e3s4.k1c_1 === unknownKey) {
    _this__u8e3s4.k1c_1 = null;
    return true;
  }
  return false;
}
function skipLeftoverElements($this, descriptor) {
  while (!($this.np(descriptor) === -1)) {
  }
}
function checkLeadingComma($this) {
  if ($this.j15_1.z1a() === 4) {
    $this.j15_1.u19('Unexpected leading comma');
  }
}
function decodeMapIndex($this) {
  var hasComma = false;
  var decodingKey = !(($this.l15_1 % 2 | 0) === 0);
  if (decodingKey) {
    if (!($this.l15_1 === -1)) {
      hasComma = $this.j15_1.m1c();
    }
  } else {
    $this.j15_1.l1c(_Char___init__impl__6a9atx(58));
  }
  var tmp;
  if ($this.j15_1.a1b()) {
    if (decodingKey) {
      if ($this.l15_1 === -1) {
        var tmp0 = $this.j15_1;
        // Inline function 'kotlinx.serialization.json.internal.AbstractJsonLexer.require' call
        var condition = !hasComma;
        var position = tmp0.p15_1;
        if (!condition) {
          var tmp$ret$0 = 'Unexpected leading comma';
          tmp0.u19(tmp$ret$0, position);
        }
      } else {
        var tmp0_0 = $this.j15_1;
        // Inline function 'kotlinx.serialization.json.internal.AbstractJsonLexer.require' call
        var condition_0 = hasComma;
        var position_0 = tmp0_0.p15_1;
        if (!condition_0) {
          var tmp$ret$2 = 'Expected comma after the key-value pair';
          tmp0_0.u19(tmp$ret$2, position_0);
        }
      }
    }
    $this.l15_1 = $this.l15_1 + 1 | 0;
    tmp = $this.l15_1;
  } else {
    if (hasComma && !$this.h15_1.a15_1.b17_1) {
      invalidTrailingComma($this.j15_1);
    }
    tmp = -1;
  }
  return tmp;
}
function coerceInputValue($this, descriptor, index) {
  var tmp0 = $this.h15_1;
  var tmp$ret$1;
  $l$block_2: {
    // Inline function 'kotlinx.serialization.json.internal.tryCoerceValue' call
    var isOptional = descriptor.qn(index);
    var elementDescriptor = descriptor.pn(index);
    var tmp;
    if (isOptional && !elementDescriptor.an()) {
      tmp = $this.j15_1.n1c(true);
    } else {
      tmp = false;
    }
    if (tmp) {
      tmp$ret$1 = true;
      break $l$block_2;
    }
    if (equals(elementDescriptor.in(), ENUM_getInstance())) {
      var tmp_0;
      if (elementDescriptor.an()) {
        tmp_0 = $this.j15_1.n1c(false);
      } else {
        tmp_0 = false;
      }
      if (tmp_0) {
        tmp$ret$1 = false;
        break $l$block_2;
      }
      var tmp0_elvis_lhs = $this.j15_1.o1c($this.n15_1.p16_1);
      var tmp_1;
      if (tmp0_elvis_lhs == null) {
        tmp$ret$1 = false;
        break $l$block_2;
      } else {
        tmp_1 = tmp0_elvis_lhs;
      }
      var enumValue = tmp_1;
      var enumIndex = getJsonNameIndex(elementDescriptor, tmp0, enumValue);
      var coerceToNull = !tmp0.a15_1.s16_1 && elementDescriptor.an();
      if (enumIndex === -3 && (isOptional || coerceToNull)) {
        $this.j15_1.b1b();
        tmp$ret$1 = true;
        break $l$block_2;
      }
    }
    tmp$ret$1 = false;
  }
  return tmp$ret$1;
}
function decodeObjectIndex($this, descriptor) {
  var hasComma = $this.j15_1.m1c();
  while ($this.j15_1.a1b()) {
    hasComma = false;
    var key = decodeStringKey($this);
    $this.j15_1.l1c(_Char___init__impl__6a9atx(58));
    var index = getJsonNameIndex(descriptor, $this.h15_1, key);
    var tmp;
    if (!(index === -3)) {
      var tmp_0;
      if ($this.n15_1.u16_1 && coerceInputValue($this, descriptor, index)) {
        hasComma = $this.j15_1.m1c();
        tmp_0 = false;
      } else {
        var tmp0_safe_receiver = $this.o15_1;
        if (tmp0_safe_receiver == null)
          null;
        else {
          tmp0_safe_receiver.r19(index);
        }
        return index;
      }
      tmp = tmp_0;
    } else {
      tmp = true;
    }
    var isUnknown = tmp;
    if (isUnknown) {
      hasComma = handleUnknown($this, descriptor, key);
    }
  }
  if (hasComma && !$this.h15_1.a15_1.b17_1) {
    invalidTrailingComma($this.j15_1);
  }
  var tmp1_safe_receiver = $this.o15_1;
  var tmp2_elvis_lhs = tmp1_safe_receiver == null ? null : tmp1_safe_receiver.s19();
  return tmp2_elvis_lhs == null ? -1 : tmp2_elvis_lhs;
}
function handleUnknown($this, descriptor, key) {
  if (ignoreUnknownKeys(descriptor, $this.h15_1) || trySkip($this, $this.m15_1, key)) {
    $this.j15_1.q1c($this.n15_1.p16_1);
  } else {
    $this.j15_1.q15_1.g1a();
    $this.j15_1.p1c(key);
  }
  return $this.j15_1.m1c();
}
function decodeListIndex($this) {
  var hasComma = $this.j15_1.m1c();
  var tmp;
  if ($this.j15_1.a1b()) {
    if (!($this.l15_1 === -1) && !hasComma) {
      $this.j15_1.u19('Expected end of the array or comma');
    }
    $this.l15_1 = $this.l15_1 + 1 | 0;
    tmp = $this.l15_1;
  } else {
    if (hasComma && !$this.h15_1.a15_1.b17_1) {
      invalidTrailingComma($this.j15_1, 'array');
    }
    tmp = -1;
  }
  return tmp;
}
function decodeStringKey($this) {
  var tmp;
  if ($this.n15_1.p16_1) {
    tmp = $this.j15_1.s1c();
  } else {
    tmp = $this.j15_1.r1c();
  }
  return tmp;
}
function StreamingJsonDecoder(json, mode, lexer, descriptor, discriminatorHolder) {
  AbstractDecoder.call(this);
  this.h15_1 = json;
  this.i15_1 = mode;
  this.j15_1 = lexer;
  this.k15_1 = this.h15_1.lp();
  this.l15_1 = -1;
  this.m15_1 = discriminatorHolder;
  this.n15_1 = this.h15_1.a15_1;
  this.o15_1 = this.n15_1.s16_1 ? null : new JsonElementMarker(descriptor);
}
protoOf(StreamingJsonDecoder).e17 = function () {
  return this.h15_1;
};
protoOf(StreamingJsonDecoder).lp = function () {
  return this.k15_1;
};
protoOf(StreamingJsonDecoder).f17 = function () {
  return (new JsonTreeReader(this.h15_1.a15_1, this.j15_1)).d1b();
};
protoOf(StreamingJsonDecoder).wo = function (deserializer) {
  try {
    var tmp;
    if (!(deserializer instanceof AbstractPolymorphicSerializer)) {
      tmp = true;
    } else {
      tmp = this.h15_1.a15_1.v16_1;
    }
    if (tmp) {
      return deserializer.cm(this);
    }
    var discriminator = classDiscriminator(deserializer.am(), this.h15_1);
    var tmp0_elvis_lhs = this.j15_1.t1c(discriminator, this.n15_1.p16_1);
    var tmp_0;
    if (tmp0_elvis_lhs == null) {
      var tmp2 = isInterface(deserializer, DeserializationStrategy) ? deserializer : THROW_CCE();
      var tmp$ret$0;
      $l$block: {
        // Inline function 'kotlinx.serialization.json.internal.decodeSerializableValuePolymorphic' call
        var tmp_1;
        if (!(tmp2 instanceof AbstractPolymorphicSerializer)) {
          tmp_1 = true;
        } else {
          tmp_1 = this.e17().a15_1.v16_1;
        }
        if (tmp_1) {
          tmp$ret$0 = tmp2.cm(this);
          break $l$block;
        }
        var discriminator_0 = classDiscriminator(tmp2.am(), this.e17());
        var tmp0 = this.f17();
        // Inline function 'kotlinx.serialization.json.internal.cast' call
        var serialName = tmp2.am().hn();
        if (!(tmp0 instanceof JsonObject)) {
          var tmp_2 = getKClass(JsonObject).x9();
          var tmp_3 = getKClassFromExpression(tmp0).x9();
          var tmp$ret$1 = this.j15_1.q15_1.h1a();
          throw JsonDecodingException_0(-1, 'Expected ' + tmp_2 + ', but had ' + tmp_3 + ' as the serialized body of ' + serialName + ' at element: ' + tmp$ret$1, toString(tmp0));
        }
        var jsonTree = tmp0;
        var tmp0_safe_receiver = jsonTree.k17(discriminator_0);
        var tmp1_safe_receiver = tmp0_safe_receiver == null ? null : get_jsonPrimitive(tmp0_safe_receiver);
        var type = tmp1_safe_receiver == null ? null : get_contentOrNull(tmp1_safe_receiver);
        var tmp_4;
        try {
          tmp_4 = findPolymorphicSerializer(tmp2, this, type);
        } catch ($p) {
          var tmp_5;
          if ($p instanceof SerializationException) {
            var it = $p;
            throw JsonDecodingException_0(-1, ensureNotNull(it.message), jsonTree.toString());
          } else {
            throw $p;
          }
        }
        var tmp_6 = tmp_4;
        var actualSerializer = isInterface(tmp_6, DeserializationStrategy) ? tmp_6 : THROW_CCE();
        tmp$ret$0 = readPolymorphicJson(this.e17(), discriminator_0, jsonTree, actualSerializer);
      }
      return tmp$ret$0;
    } else {
      tmp_0 = tmp0_elvis_lhs;
    }
    var type_0 = tmp_0;
    var tmp_7;
    try {
      tmp_7 = findPolymorphicSerializer(deserializer, this, type_0);
    } catch ($p) {
      var tmp_8;
      if ($p instanceof SerializationException) {
        var it_0 = $p;
        var message = removeSuffix(substringBefore(ensureNotNull(it_0.message), _Char___init__impl__6a9atx(10)), '.');
        var hint = substringAfter(ensureNotNull(it_0.message), _Char___init__impl__6a9atx(10), '');
        this.j15_1.u19(message, VOID, hint);
      } else {
        throw $p;
      }
      tmp_7 = tmp_8;
    }
    var tmp_9 = tmp_7;
    var actualSerializer_0 = isInterface(tmp_9, DeserializationStrategy) ? tmp_9 : THROW_CCE();
    this.m15_1 = new DiscriminatorHolder(discriminator);
    return actualSerializer_0.cm(this);
  } catch ($p) {
    if ($p instanceof MissingFieldException) {
      var e = $p;
      if (contains(ensureNotNull(e.message), 'at path'))
        throw e;
      throw new MissingFieldException(e.um_1, plus(e.message, ' at path: ') + this.j15_1.q15_1.h1a(), e);
    } else {
      throw $p;
    }
  }
};
protoOf(StreamingJsonDecoder).xo = function (descriptor) {
  var newMode = switchMode(this.h15_1, descriptor);
  this.j15_1.q15_1.c1a(descriptor);
  this.j15_1.l1c(newMode.w1c_1);
  checkLeadingComma(this);
  var tmp;
  switch (newMode.q2_1) {
    case 1:
    case 2:
    case 3:
      tmp = new StreamingJsonDecoder(this.h15_1, newMode, this.j15_1, descriptor, this.m15_1);
      break;
    default:
      var tmp_0;
      if (this.i15_1.equals(newMode) && this.h15_1.a15_1.s16_1) {
        tmp_0 = this;
      } else {
        tmp_0 = new StreamingJsonDecoder(this.h15_1, newMode, this.j15_1, descriptor, this.m15_1);
      }

      tmp = tmp_0;
      break;
  }
  return tmp;
};
protoOf(StreamingJsonDecoder).yo = function (descriptor) {
  if (descriptor.kn() === 0 && ignoreUnknownKeys(descriptor, this.h15_1)) {
    skipLeftoverElements(this, descriptor);
  }
  if (this.j15_1.m1c() && !this.h15_1.a15_1.b17_1) {
    invalidTrailingComma(this.j15_1, '');
  }
  this.j15_1.l1c(this.i15_1.x1c_1);
  this.j15_1.q15_1.g1a();
};
protoOf(StreamingJsonDecoder).jo = function () {
  var tmp;
  var tmp0_safe_receiver = this.o15_1;
  var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.q19_1;
  if (!(tmp1_elvis_lhs == null ? false : tmp1_elvis_lhs)) {
    tmp = !this.j15_1.y1c();
  } else {
    tmp = false;
  }
  return tmp;
};
protoOf(StreamingJsonDecoder).ko = function () {
  return null;
};
protoOf(StreamingJsonDecoder).jp = function (descriptor, index, deserializer, previousValue) {
  var isMapKey = this.i15_1.equals(WriteMode_MAP_getInstance()) && (index & 1) === 0;
  if (isMapKey) {
    this.j15_1.q15_1.f1a();
  }
  var value = protoOf(AbstractDecoder).jp.call(this, descriptor, index, deserializer, previousValue);
  if (isMapKey) {
    this.j15_1.q15_1.e1a(value);
  }
  return value;
};
protoOf(StreamingJsonDecoder).np = function (descriptor) {
  var index;
  switch (this.i15_1.q2_1) {
    case 0:
      index = decodeObjectIndex(this, descriptor);
      break;
    case 2:
      index = decodeMapIndex(this);
      break;
    default:
      index = decodeListIndex(this);
      break;
  }
  if (!this.i15_1.equals(WriteMode_MAP_getInstance())) {
    this.j15_1.q15_1.d1a(index);
  }
  return index;
};
protoOf(StreamingJsonDecoder).lo = function () {
  return this.j15_1.z1c();
};
protoOf(StreamingJsonDecoder).mo = function () {
  var value = this.j15_1.a1d();
  if (!equalsLong(value, fromInt(convertToByte(value)))) {
    this.j15_1.u19("Failed to parse byte for input '" + value.toString() + "'");
  }
  return convertToByte(value);
};
protoOf(StreamingJsonDecoder).no = function () {
  var value = this.j15_1.a1d();
  if (!equalsLong(value, fromInt(convertToShort(value)))) {
    this.j15_1.u19("Failed to parse short for input '" + value.toString() + "'");
  }
  return convertToShort(value);
};
protoOf(StreamingJsonDecoder).oo = function () {
  var value = this.j15_1.a1d();
  if (!equalsLong(value, fromInt(convertToInt(value)))) {
    this.j15_1.u19("Failed to parse int for input '" + value.toString() + "'");
  }
  return convertToInt(value);
};
protoOf(StreamingJsonDecoder).po = function () {
  return this.j15_1.a1d();
};
protoOf(StreamingJsonDecoder).qo = function () {
  var tmp0 = this.j15_1;
  var tmp$ret$4;
  $l$block: {
    // Inline function 'kotlinx.serialization.json.internal.parseString' call
    var input = tmp0.c1b();
    try {
      // Inline function 'kotlin.text.toFloat' call
      // Inline function 'kotlin.js.unsafeCast' call
      // Inline function 'kotlin.js.asDynamic' call
      tmp$ret$4 = toDouble(input);
      break $l$block;
    } catch ($p) {
      if ($p instanceof IllegalArgumentException) {
        var e = $p;
        tmp0.u19("Failed to parse type '" + 'float' + "' for input '" + input + "'");
      } else {
        throw $p;
      }
    }
  }
  var result = tmp$ret$4;
  var specialFp = this.h15_1.a15_1.x16_1;
  if (specialFp || isFinite(result))
    return result;
  throwInvalidFloatingPointDecoded(this.j15_1, result);
};
protoOf(StreamingJsonDecoder).ro = function () {
  var tmp0 = this.j15_1;
  var tmp$ret$1;
  $l$block: {
    // Inline function 'kotlinx.serialization.json.internal.parseString' call
    var input = tmp0.c1b();
    try {
      tmp$ret$1 = toDouble(input);
      break $l$block;
    } catch ($p) {
      if ($p instanceof IllegalArgumentException) {
        var e = $p;
        tmp0.u19("Failed to parse type '" + 'double' + "' for input '" + input + "'");
      } else {
        throw $p;
      }
    }
  }
  var result = tmp$ret$1;
  var specialFp = this.h15_1.a15_1.x16_1;
  if (specialFp || isFinite_0(result))
    return result;
  throwInvalidFloatingPointDecoded(this.j15_1, result);
};
protoOf(StreamingJsonDecoder).so = function () {
  var string = this.j15_1.c1b();
  if (!(string.length === 1)) {
    this.j15_1.u19("Expected single char, but got '" + string + "'");
  }
  return charCodeAt(string, 0);
};
protoOf(StreamingJsonDecoder).to = function () {
  var tmp;
  if (this.n15_1.p16_1) {
    tmp = this.j15_1.s1c();
  } else {
    tmp = this.j15_1.b1b();
  }
  return tmp;
};
protoOf(StreamingJsonDecoder).uo = function (descriptor) {
  return get_isUnsignedNumber(descriptor) ? new JsonDecoderForUnsignedTypes(this.j15_1, this.h15_1) : protoOf(AbstractDecoder).uo.call(this, descriptor);
};
function JsonDecoderForUnsignedTypes(lexer, json) {
  AbstractDecoder.call(this);
  this.b1d_1 = lexer;
  this.c1d_1 = json.lp();
}
protoOf(JsonDecoderForUnsignedTypes).lp = function () {
  return this.c1d_1;
};
protoOf(JsonDecoderForUnsignedTypes).np = function (descriptor) {
  var message = 'unsupported';
  throw IllegalStateException_init_$Create$(toString(message));
};
protoOf(JsonDecoderForUnsignedTypes).oo = function () {
  var tmp0 = this.b1d_1;
  var tmp$ret$2;
  $l$block: {
    // Inline function 'kotlinx.serialization.json.internal.parseString' call
    var input = tmp0.c1b();
    try {
      // Inline function 'kotlin.UInt.toInt' call
      var this_0 = toUInt(input);
      tmp$ret$2 = _UInt___get_data__impl__f0vqqw(this_0);
      break $l$block;
    } catch ($p) {
      if ($p instanceof IllegalArgumentException) {
        var e = $p;
        tmp0.u19("Failed to parse type '" + 'UInt' + "' for input '" + input + "'");
      } else {
        throw $p;
      }
    }
  }
  return tmp$ret$2;
};
protoOf(JsonDecoderForUnsignedTypes).po = function () {
  var tmp0 = this.b1d_1;
  var tmp$ret$2;
  $l$block: {
    // Inline function 'kotlinx.serialization.json.internal.parseString' call
    var input = tmp0.c1b();
    try {
      // Inline function 'kotlin.ULong.toLong' call
      var this_0 = toULong(input);
      tmp$ret$2 = _ULong___get_data__impl__fggpzb(this_0);
      break $l$block;
    } catch ($p) {
      if ($p instanceof IllegalArgumentException) {
        var e = $p;
        tmp0.u19("Failed to parse type '" + 'ULong' + "' for input '" + input + "'");
      } else {
        throw $p;
      }
    }
  }
  return tmp$ret$2;
};
protoOf(JsonDecoderForUnsignedTypes).mo = function () {
  var tmp0 = this.b1d_1;
  var tmp$ret$2;
  $l$block: {
    // Inline function 'kotlinx.serialization.json.internal.parseString' call
    var input = tmp0.c1b();
    try {
      // Inline function 'kotlin.UByte.toByte' call
      var this_0 = toUByte(input);
      tmp$ret$2 = _UByte___get_data__impl__jof9qr(this_0);
      break $l$block;
    } catch ($p) {
      if ($p instanceof IllegalArgumentException) {
        var e = $p;
        tmp0.u19("Failed to parse type '" + 'UByte' + "' for input '" + input + "'");
      } else {
        throw $p;
      }
    }
  }
  return tmp$ret$2;
};
protoOf(JsonDecoderForUnsignedTypes).no = function () {
  var tmp0 = this.b1d_1;
  var tmp$ret$2;
  $l$block: {
    // Inline function 'kotlinx.serialization.json.internal.parseString' call
    var input = tmp0.c1b();
    try {
      // Inline function 'kotlin.UShort.toShort' call
      var this_0 = toUShort(input);
      tmp$ret$2 = _UShort___get_data__impl__g0245(this_0);
      break $l$block;
    } catch ($p) {
      if ($p instanceof IllegalArgumentException) {
        var e = $p;
        tmp0.u19("Failed to parse type '" + 'UShort' + "' for input '" + input + "'");
      } else {
        throw $p;
      }
    }
  }
  return tmp$ret$2;
};
function get_unsignedNumberDescriptors() {
  _init_properties_StreamingJsonEncoder_kt__pn1bsi();
  return unsignedNumberDescriptors;
}
var unsignedNumberDescriptors;
function StreamingJsonEncoder_init_$Init$(output, json, mode, modeReuseCache, $this) {
  StreamingJsonEncoder.call($this, Composer_0(output, json), json, mode, modeReuseCache);
  return $this;
}
function StreamingJsonEncoder_init_$Create$(output, json, mode, modeReuseCache) {
  return StreamingJsonEncoder_init_$Init$(output, json, mode, modeReuseCache, objectCreate(protoOf(StreamingJsonEncoder)));
}
function encodeTypeInfo($this, discriminator, serialName) {
  $this.l1a_1.o18();
  $this.aq(discriminator);
  $this.l1a_1.r18(_Char___init__impl__6a9atx(58));
  $this.l1a_1.q18();
  $this.aq(serialName);
}
function StreamingJsonEncoder(composer, json, mode, modeReuseCache) {
  AbstractEncoder.call(this);
  this.l1a_1 = composer;
  this.m1a_1 = json;
  this.n1a_1 = mode;
  this.o1a_1 = modeReuseCache;
  this.p1a_1 = this.m1a_1.lp();
  this.q1a_1 = this.m1a_1.a15_1;
  this.r1a_1 = false;
  this.s1a_1 = null;
  this.t1a_1 = null;
  var i = this.n1a_1.q2_1;
  if (!(this.o1a_1 == null)) {
    if (!(this.o1a_1[i] === null) || !(this.o1a_1[i] === this)) {
      this.o1a_1[i] = this;
    }
  }
}
protoOf(StreamingJsonEncoder).e17 = function () {
  return this.m1a_1;
};
protoOf(StreamingJsonEncoder).lp = function () {
  return this.p1a_1;
};
protoOf(StreamingJsonEncoder).nq = function (serializer, value) {
  $l$block: {
    // Inline function 'kotlinx.serialization.json.internal.encodePolymorphically' call
    if (this.e17().a15_1.v16_1) {
      serializer.bm(this, value);
      break $l$block;
    }
    var isPolymorphicSerializer = serializer instanceof AbstractPolymorphicSerializer;
    var tmp;
    if (isPolymorphicSerializer) {
      tmp = !this.e17().a15_1.d17_1.equals(ClassDiscriminatorMode_NONE_getInstance());
    } else {
      var tmp_0;
      switch (this.e17().a15_1.d17_1.q2_1) {
        case 0:
        case 2:
          tmp_0 = false;
          break;
        case 1:
          // Inline function 'kotlin.let' call

          var it = serializer.am().in();
          tmp_0 = equals(it, CLASS_getInstance()) || equals(it, OBJECT_getInstance());
          break;
        default:
          noWhenBranchMatchedException();
          break;
      }
      tmp = tmp_0;
    }
    var needDiscriminator = tmp;
    var baseClassDiscriminator = needDiscriminator ? classDiscriminator(serializer.am(), this.e17()) : null;
    var tmp_1;
    if (isPolymorphicSerializer) {
      var casted = serializer instanceof AbstractPolymorphicSerializer ? serializer : THROW_CCE();
      $l$block_0: {
        // Inline function 'kotlin.requireNotNull' call
        if (value == null) {
          var message = 'Value for serializer ' + toString(serializer.am()) + ' should always be non-null. Please report issue to the kotlinx.serialization tracker.';
          throw IllegalArgumentException_init_$Create$(toString(message));
        } else {
          break $l$block_0;
        }
      }
      var actual = findPolymorphicSerializer_0(casted, this, value);
      if (!(baseClassDiscriminator == null)) {
        access$validateIfSealed$tPolymorphicKt(serializer, actual, baseClassDiscriminator);
        checkKind_0(actual.am().in());
      }
      tmp_1 = isInterface(actual, SerializationStrategy) ? actual : THROW_CCE();
    } else {
      tmp_1 = serializer;
    }
    var actualSerializer = tmp_1;
    if (!(baseClassDiscriminator == null)) {
      var serialName = actualSerializer.am().hn();
      this.s1a_1 = baseClassDiscriminator;
      this.t1a_1 = serialName;
    }
    actualSerializer.bm(this, value);
  }
};
protoOf(StreamingJsonEncoder).xo = function (descriptor) {
  var newMode = switchMode(this.m1a_1, descriptor);
  if (!(newMode.w1c_1 === _Char___init__impl__6a9atx(0))) {
    this.l1a_1.r18(newMode.w1c_1);
    this.l1a_1.m18();
  }
  var discriminator = this.s1a_1;
  if (!(discriminator == null)) {
    var tmp0_elvis_lhs = this.t1a_1;
    encodeTypeInfo(this, discriminator, tmp0_elvis_lhs == null ? descriptor.hn() : tmp0_elvis_lhs);
    this.s1a_1 = null;
    this.t1a_1 = null;
  }
  if (this.n1a_1.equals(newMode)) {
    return this;
  }
  var tmp1_safe_receiver = this.o1a_1;
  var tmp2_elvis_lhs = tmp1_safe_receiver == null ? null : tmp1_safe_receiver[newMode.q2_1];
  return tmp2_elvis_lhs == null ? new StreamingJsonEncoder(this.l1a_1, this.m1a_1, newMode, this.o1a_1) : tmp2_elvis_lhs;
};
protoOf(StreamingJsonEncoder).yo = function (descriptor) {
  if (!(this.n1a_1.x1c_1 === _Char___init__impl__6a9atx(0))) {
    this.l1a_1.n18();
    this.l1a_1.p18();
    this.l1a_1.r18(this.n1a_1.x1c_1);
  }
};
protoOf(StreamingJsonEncoder).pp = function (descriptor, index) {
  switch (this.n1a_1.q2_1) {
    case 1:
      if (!this.l1a_1.l18_1) {
        this.l1a_1.r18(_Char___init__impl__6a9atx(44));
      }

      this.l1a_1.o18();
      break;
    case 2:
      if (!this.l1a_1.l18_1) {
        var tmp = this;
        var tmp_0;
        if ((index % 2 | 0) === 0) {
          this.l1a_1.r18(_Char___init__impl__6a9atx(44));
          this.l1a_1.o18();
          tmp_0 = true;
        } else {
          this.l1a_1.r18(_Char___init__impl__6a9atx(58));
          this.l1a_1.q18();
          tmp_0 = false;
        }
        tmp.r1a_1 = tmp_0;
      } else {
        this.r1a_1 = true;
        this.l1a_1.o18();
      }

      break;
    case 3:
      if (index === 0)
        this.r1a_1 = true;
      if (index === 1) {
        this.l1a_1.r18(_Char___init__impl__6a9atx(44));
        this.l1a_1.q18();
        this.r1a_1 = false;
      }

      break;
    default:
      if (!this.l1a_1.l18_1) {
        this.l1a_1.r18(_Char___init__impl__6a9atx(44));
      }

      this.l1a_1.o18();
      this.aq(getJsonElementName(descriptor, this.m1a_1, index));
      this.l1a_1.r18(_Char___init__impl__6a9atx(58));
      this.l1a_1.q18();
      break;
  }
  return true;
};
protoOf(StreamingJsonEncoder).bq = function (descriptor) {
  var tmp;
  if (get_isUnsignedNumber(descriptor)) {
    // Inline function 'kotlinx.serialization.json.internal.StreamingJsonEncoder.composerAs' call
    var tmp_0;
    var tmp_1 = this.l1a_1;
    if (tmp_1 instanceof ComposerForUnsignedNumbers) {
      tmp_0 = this.l1a_1;
    } else {
      var tmp0 = this.l1a_1.k18_1;
      var p1 = this.r1a_1;
      tmp_0 = new ComposerForUnsignedNumbers(tmp0, p1);
    }
    var tmp$ret$1 = tmp_0;
    tmp = new StreamingJsonEncoder(tmp$ret$1, this.m1a_1, this.n1a_1, null);
  } else if (get_isUnquotedLiteral(descriptor)) {
    // Inline function 'kotlinx.serialization.json.internal.StreamingJsonEncoder.composerAs' call
    var tmp_2;
    var tmp_3 = this.l1a_1;
    if (tmp_3 instanceof ComposerForUnquotedLiterals) {
      tmp_2 = this.l1a_1;
    } else {
      var tmp0_0 = this.l1a_1.k18_1;
      var p1_0 = this.r1a_1;
      tmp_2 = new ComposerForUnquotedLiterals(tmp0_0, p1_0);
    }
    var tmp$ret$3 = tmp_2;
    tmp = new StreamingJsonEncoder(tmp$ret$3, this.m1a_1, this.n1a_1, null);
  } else if (!(this.s1a_1 == null)) {
    // Inline function 'kotlin.apply' call
    this.t1a_1 = descriptor.hn();
    tmp = this;
  } else {
    tmp = protoOf(AbstractEncoder).bq.call(this, descriptor);
  }
  return tmp;
};
protoOf(StreamingJsonEncoder).rp = function () {
  this.l1a_1.t18('null');
};
protoOf(StreamingJsonEncoder).sp = function (value) {
  if (this.r1a_1) {
    this.aq(value.toString());
  } else {
    this.l1a_1.c19(value);
  }
};
protoOf(StreamingJsonEncoder).tp = function (value) {
  if (this.r1a_1) {
    this.aq(value.toString());
  } else {
    this.l1a_1.x18(value);
  }
};
protoOf(StreamingJsonEncoder).up = function (value) {
  if (this.r1a_1) {
    this.aq(value.toString());
  } else {
    this.l1a_1.z18(value);
  }
};
protoOf(StreamingJsonEncoder).vp = function (value) {
  if (this.r1a_1) {
    this.aq(value.toString());
  } else {
    this.l1a_1.a19(value);
  }
};
protoOf(StreamingJsonEncoder).wp = function (value) {
  if (this.r1a_1) {
    this.aq(value.toString());
  } else {
    this.l1a_1.b19(value);
  }
};
protoOf(StreamingJsonEncoder).xp = function (value) {
  if (this.r1a_1) {
    this.aq(value.toString());
  } else {
    this.l1a_1.v18(value);
  }
  if (!this.q1a_1.x16_1 && !isFinite(value)) {
    throw InvalidFloatingPointEncoded(value, toString(this.l1a_1.k18_1));
  }
};
protoOf(StreamingJsonEncoder).yp = function (value) {
  if (this.r1a_1) {
    this.aq(value.toString());
  } else {
    this.l1a_1.w18(value);
  }
  if (!this.q1a_1.x16_1 && !isFinite_0(value)) {
    throw InvalidFloatingPointEncoded(value, toString(this.l1a_1.k18_1));
  }
};
protoOf(StreamingJsonEncoder).zp = function (value) {
  this.aq(toString_1(value));
};
protoOf(StreamingJsonEncoder).aq = function (value) {
  return this.l1a_1.d19(value);
};
function get_isUnsignedNumber(_this__u8e3s4) {
  _init_properties_StreamingJsonEncoder_kt__pn1bsi();
  return _this__u8e3s4.jn() && get_unsignedNumberDescriptors().y1(_this__u8e3s4);
}
function get_isUnquotedLiteral(_this__u8e3s4) {
  _init_properties_StreamingJsonEncoder_kt__pn1bsi();
  return _this__u8e3s4.jn() && equals(_this__u8e3s4, get_jsonUnquotedLiteralDescriptor());
}
var properties_initialized_StreamingJsonEncoder_kt_6ifwwk;
function _init_properties_StreamingJsonEncoder_kt__pn1bsi() {
  if (!properties_initialized_StreamingJsonEncoder_kt_6ifwwk) {
    properties_initialized_StreamingJsonEncoder_kt_6ifwwk = true;
    unsignedNumberDescriptors = setOf([serializer_1(Companion_getInstance_0()).am(), serializer_0(Companion_getInstance()).am(), serializer_2(Companion_getInstance_1()).am(), serializer_3(Companion_getInstance_2()).am()]);
  }
}
function get_ESCAPE_STRINGS() {
  _init_properties_StringOps_kt__fcy1db();
  return ESCAPE_STRINGS;
}
var ESCAPE_STRINGS;
var ESCAPE_MARKERS;
function toHexChar(i) {
  _init_properties_StringOps_kt__fcy1db();
  var d = i & 15;
  var tmp;
  if (d < 10) {
    // Inline function 'kotlin.code' call
    var this_0 = _Char___init__impl__6a9atx(48);
    var tmp$ret$0 = Char__toInt_impl_vasixd(this_0);
    tmp = numberToChar(d + tmp$ret$0 | 0);
  } else {
    var tmp_0 = d - 10 | 0;
    // Inline function 'kotlin.code' call
    var this_1 = _Char___init__impl__6a9atx(97);
    var tmp$ret$1 = Char__toInt_impl_vasixd(this_1);
    tmp = numberToChar(tmp_0 + tmp$ret$1 | 0);
  }
  return tmp;
}
function printQuoted(_this__u8e3s4, value) {
  _init_properties_StringOps_kt__fcy1db();
  _this__u8e3s4.s7(_Char___init__impl__6a9atx(34));
  var lastPos = 0;
  var inductionVariable = 0;
  var last = charSequenceLength(value) - 1 | 0;
  if (inductionVariable <= last)
    do {
      var i = inductionVariable;
      inductionVariable = inductionVariable + 1 | 0;
      // Inline function 'kotlin.code' call
      var this_0 = charCodeAt(value, i);
      var c = Char__toInt_impl_vasixd(this_0);
      if (c < get_ESCAPE_STRINGS().length && !(get_ESCAPE_STRINGS()[c] == null)) {
        _this__u8e3s4.gb(value, lastPos, i);
        _this__u8e3s4.r7(get_ESCAPE_STRINGS()[c]);
        lastPos = i + 1 | 0;
      }
    }
     while (inductionVariable <= last);
  if (!(lastPos === 0))
    _this__u8e3s4.gb(value, lastPos, value.length);
  else
    _this__u8e3s4.r7(value);
  _this__u8e3s4.s7(_Char___init__impl__6a9atx(34));
}
function toBooleanStrictOrNull_0(_this__u8e3s4) {
  _init_properties_StringOps_kt__fcy1db();
  return equals_0(_this__u8e3s4, 'true', true) ? true : equals_0(_this__u8e3s4, 'false', true) ? false : null;
}
var properties_initialized_StringOps_kt_wzaea7;
function _init_properties_StringOps_kt__fcy1db() {
  if (!properties_initialized_StringOps_kt_wzaea7) {
    properties_initialized_StringOps_kt_wzaea7 = true;
    // Inline function 'kotlin.arrayOfNulls' call
    // Inline function 'kotlin.apply' call
    var this_0 = Array(93);
    var inductionVariable = 0;
    if (inductionVariable <= 31)
      do {
        var c = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        var c1 = toHexChar(c >> 12);
        var c2 = toHexChar(c >> 8);
        var c3 = toHexChar(c >> 4);
        var c4 = toHexChar(c);
        this_0[c] = '\\u' + toString_1(c1) + toString_1(c2) + toString_1(c3) + toString_1(c4);
      }
       while (inductionVariable <= 31);
    // Inline function 'kotlin.code' call
    var this_1 = _Char___init__impl__6a9atx(34);
    this_0[Char__toInt_impl_vasixd(this_1)] = '\\"';
    // Inline function 'kotlin.code' call
    var this_2 = _Char___init__impl__6a9atx(92);
    this_0[Char__toInt_impl_vasixd(this_2)] = '\\\\';
    // Inline function 'kotlin.code' call
    var this_3 = _Char___init__impl__6a9atx(9);
    this_0[Char__toInt_impl_vasixd(this_3)] = '\\t';
    // Inline function 'kotlin.code' call
    var this_4 = _Char___init__impl__6a9atx(8);
    this_0[Char__toInt_impl_vasixd(this_4)] = '\\b';
    // Inline function 'kotlin.code' call
    var this_5 = _Char___init__impl__6a9atx(10);
    this_0[Char__toInt_impl_vasixd(this_5)] = '\\n';
    // Inline function 'kotlin.code' call
    var this_6 = _Char___init__impl__6a9atx(13);
    this_0[Char__toInt_impl_vasixd(this_6)] = '\\r';
    this_0[12] = '\\f';
    ESCAPE_STRINGS = this_0;
    // Inline function 'kotlin.apply' call
    var this_7 = new Int8Array(93);
    var inductionVariable_0 = 0;
    if (inductionVariable_0 <= 31)
      do {
        var c_0 = inductionVariable_0;
        inductionVariable_0 = inductionVariable_0 + 1 | 0;
        this_7[c_0] = 1;
      }
       while (inductionVariable_0 <= 31);
    // Inline function 'kotlin.code' call
    var this_8 = _Char___init__impl__6a9atx(34);
    var tmp = Char__toInt_impl_vasixd(this_8);
    // Inline function 'kotlin.code' call
    var this_9 = _Char___init__impl__6a9atx(34);
    var tmp$ret$1 = Char__toInt_impl_vasixd(this_9);
    this_7[tmp] = toByte(tmp$ret$1);
    // Inline function 'kotlin.code' call
    var this_10 = _Char___init__impl__6a9atx(92);
    var tmp_0 = Char__toInt_impl_vasixd(this_10);
    // Inline function 'kotlin.code' call
    var this_11 = _Char___init__impl__6a9atx(92);
    var tmp$ret$3 = Char__toInt_impl_vasixd(this_11);
    this_7[tmp_0] = toByte(tmp$ret$3);
    // Inline function 'kotlin.code' call
    var this_12 = _Char___init__impl__6a9atx(9);
    var tmp_1 = Char__toInt_impl_vasixd(this_12);
    // Inline function 'kotlin.code' call
    var this_13 = _Char___init__impl__6a9atx(116);
    var tmp$ret$5 = Char__toInt_impl_vasixd(this_13);
    this_7[tmp_1] = toByte(tmp$ret$5);
    // Inline function 'kotlin.code' call
    var this_14 = _Char___init__impl__6a9atx(8);
    var tmp_2 = Char__toInt_impl_vasixd(this_14);
    // Inline function 'kotlin.code' call
    var this_15 = _Char___init__impl__6a9atx(98);
    var tmp$ret$7 = Char__toInt_impl_vasixd(this_15);
    this_7[tmp_2] = toByte(tmp$ret$7);
    // Inline function 'kotlin.code' call
    var this_16 = _Char___init__impl__6a9atx(10);
    var tmp_3 = Char__toInt_impl_vasixd(this_16);
    // Inline function 'kotlin.code' call
    var this_17 = _Char___init__impl__6a9atx(110);
    var tmp$ret$9 = Char__toInt_impl_vasixd(this_17);
    this_7[tmp_3] = toByte(tmp$ret$9);
    // Inline function 'kotlin.code' call
    var this_18 = _Char___init__impl__6a9atx(13);
    var tmp_4 = Char__toInt_impl_vasixd(this_18);
    // Inline function 'kotlin.code' call
    var this_19 = _Char___init__impl__6a9atx(114);
    var tmp$ret$11 = Char__toInt_impl_vasixd(this_19);
    this_7[tmp_4] = toByte(tmp$ret$11);
    // Inline function 'kotlin.code' call
    var this_20 = _Char___init__impl__6a9atx(102);
    var tmp$ret$12 = Char__toInt_impl_vasixd(this_20);
    this_7[12] = toByte(tmp$ret$12);
    ESCAPE_MARKERS = this_7;
  }
}
function unparsedPrimitive($this, literal, primitive, tag) {
  var type = startsWith(primitive, 'i') ? 'an ' + primitive : 'a ' + primitive;
  throw JsonDecodingException_0(-1, "Failed to parse literal '" + literal.toString() + "' as " + type + ' value at element: ' + $this.j1d(tag), toString($this.k1d()));
}
function AbstractJsonTreeDecoder(json, value, polymorphicDiscriminator) {
  polymorphicDiscriminator = polymorphicDiscriminator === VOID ? null : polymorphicDiscriminator;
  NamedValueDecoder.call(this);
  this.f1d_1 = json;
  this.g1d_1 = value;
  this.h1d_1 = polymorphicDiscriminator;
  this.i1d_1 = this.e17().a15_1;
}
protoOf(AbstractJsonTreeDecoder).e17 = function () {
  return this.f1d_1;
};
protoOf(AbstractJsonTreeDecoder).m2 = function () {
  return this.g1d_1;
};
protoOf(AbstractJsonTreeDecoder).lp = function () {
  return this.e17().lp();
};
protoOf(AbstractJsonTreeDecoder).k1d = function () {
  var tmp0_safe_receiver = this.i12();
  var tmp;
  if (tmp0_safe_receiver == null) {
    tmp = null;
  } else {
    // Inline function 'kotlin.let' call
    tmp = this.l1d(tmp0_safe_receiver);
  }
  var tmp1_elvis_lhs = tmp;
  return tmp1_elvis_lhs == null ? this.m2() : tmp1_elvis_lhs;
};
protoOf(AbstractJsonTreeDecoder).j1d = function (currentTag) {
  return this.k12() + ('.' + currentTag);
};
protoOf(AbstractJsonTreeDecoder).f17 = function () {
  return this.k1d();
};
protoOf(AbstractJsonTreeDecoder).wo = function (deserializer) {
  var tmp$ret$0;
  $l$block: {
    // Inline function 'kotlinx.serialization.json.internal.decodeSerializableValuePolymorphic' call
    var tmp;
    if (!(deserializer instanceof AbstractPolymorphicSerializer)) {
      tmp = true;
    } else {
      tmp = this.e17().a15_1.v16_1;
    }
    if (tmp) {
      tmp$ret$0 = deserializer.cm(this);
      break $l$block;
    }
    var discriminator = classDiscriminator(deserializer.am(), this.e17());
    var tmp0 = this.f17();
    // Inline function 'kotlinx.serialization.json.internal.cast' call
    var serialName = deserializer.am().hn();
    if (!(tmp0 instanceof JsonObject)) {
      var tmp_0 = getKClass(JsonObject).x9();
      var tmp_1 = getKClassFromExpression(tmp0).x9();
      var tmp$ret$1 = this.k12();
      throw JsonDecodingException_0(-1, 'Expected ' + tmp_0 + ', but had ' + tmp_1 + ' as the serialized body of ' + serialName + ' at element: ' + tmp$ret$1, toString(tmp0));
    }
    var jsonTree = tmp0;
    var tmp0_safe_receiver = jsonTree.k17(discriminator);
    var tmp1_safe_receiver = tmp0_safe_receiver == null ? null : get_jsonPrimitive(tmp0_safe_receiver);
    var type = tmp1_safe_receiver == null ? null : get_contentOrNull(tmp1_safe_receiver);
    var tmp_2;
    try {
      tmp_2 = findPolymorphicSerializer(deserializer, this, type);
    } catch ($p) {
      var tmp_3;
      if ($p instanceof SerializationException) {
        var it = $p;
        throw JsonDecodingException_0(-1, ensureNotNull(it.message), jsonTree.toString());
      } else {
        throw $p;
      }
    }
    var tmp_4 = tmp_2;
    var actualSerializer = isInterface(tmp_4, DeserializationStrategy) ? tmp_4 : THROW_CCE();
    tmp$ret$0 = readPolymorphicJson(this.e17(), discriminator, jsonTree, actualSerializer);
  }
  return tmp$ret$0;
};
protoOf(AbstractJsonTreeDecoder).j12 = function (parentName, childName) {
  return childName;
};
protoOf(AbstractJsonTreeDecoder).xo = function (descriptor) {
  var currentObject = this.k1d();
  var tmp0_subject = descriptor.in();
  var tmp;
  var tmp_0;
  if (equals(tmp0_subject, LIST_getInstance())) {
    tmp_0 = true;
  } else {
    tmp_0 = tmp0_subject instanceof PolymorphicKind;
  }
  if (tmp_0) {
    var tmp_1 = this.e17();
    // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
    // Inline function 'kotlinx.serialization.json.internal.cast' call
    var serialName = descriptor.hn();
    if (!(currentObject instanceof JsonArray)) {
      var tmp_2 = getKClass(JsonArray).x9();
      var tmp_3 = getKClassFromExpression(currentObject).x9();
      var tmp$ret$0 = this.k12();
      throw JsonDecodingException_0(-1, 'Expected ' + tmp_2 + ', but had ' + tmp_3 + ' as the serialized body of ' + serialName + ' at element: ' + tmp$ret$0, toString(currentObject));
    }
    tmp = new JsonTreeListDecoder(tmp_1, currentObject);
  } else {
    if (equals(tmp0_subject, MAP_getInstance())) {
      // Inline function 'kotlinx.serialization.json.internal.selectMapMode' call
      var this_0 = this.e17();
      var keyDescriptor = carrierDescriptor(descriptor.pn(0), this_0.lp());
      var keyKind = keyDescriptor.in();
      var tmp_4;
      var tmp_5;
      if (keyKind instanceof PrimitiveKind) {
        tmp_5 = true;
      } else {
        tmp_5 = equals(keyKind, ENUM_getInstance());
      }
      if (tmp_5) {
        var tmp_6 = this.e17();
        // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
        // Inline function 'kotlinx.serialization.json.internal.cast' call
        var serialName_0 = descriptor.hn();
        if (!(currentObject instanceof JsonObject)) {
          var tmp_7 = getKClass(JsonObject).x9();
          var tmp_8 = getKClassFromExpression(currentObject).x9();
          var tmp$ret$3 = this.k12();
          throw JsonDecodingException_0(-1, 'Expected ' + tmp_7 + ', but had ' + tmp_8 + ' as the serialized body of ' + serialName_0 + ' at element: ' + tmp$ret$3, toString(currentObject));
        }
        tmp_4 = new JsonTreeMapDecoder(tmp_6, currentObject);
      } else {
        if (this_0.a15_1.q16_1) {
          var tmp_9 = this.e17();
          // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
          // Inline function 'kotlinx.serialization.json.internal.cast' call
          var serialName_1 = descriptor.hn();
          if (!(currentObject instanceof JsonArray)) {
            var tmp_10 = getKClass(JsonArray).x9();
            var tmp_11 = getKClassFromExpression(currentObject).x9();
            var tmp$ret$7 = this.k12();
            throw JsonDecodingException_0(-1, 'Expected ' + tmp_10 + ', but had ' + tmp_11 + ' as the serialized body of ' + serialName_1 + ' at element: ' + tmp$ret$7, toString(currentObject));
          }
          tmp_4 = new JsonTreeListDecoder(tmp_9, currentObject);
        } else {
          throw InvalidKeyKindException(keyDescriptor);
        }
      }
      tmp = tmp_4;
    } else {
      var tmp_12 = this.e17();
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
      // Inline function 'kotlinx.serialization.json.internal.cast' call
      var serialName_2 = descriptor.hn();
      if (!(currentObject instanceof JsonObject)) {
        var tmp_13 = getKClass(JsonObject).x9();
        var tmp_14 = getKClassFromExpression(currentObject).x9();
        var tmp$ret$12 = this.k12();
        throw JsonDecodingException_0(-1, 'Expected ' + tmp_13 + ', but had ' + tmp_14 + ' as the serialized body of ' + serialName_2 + ' at element: ' + tmp$ret$12, toString(currentObject));
      }
      tmp = new JsonTreeDecoder(tmp_12, currentObject, this.h1d_1);
    }
  }
  return tmp;
};
protoOf(AbstractJsonTreeDecoder).yo = function (descriptor) {
};
protoOf(AbstractJsonTreeDecoder).jo = function () {
  var tmp = this.k1d();
  return !(tmp instanceof JsonNull);
};
protoOf(AbstractJsonTreeDecoder).m1d = function (tag) {
  return !(this.l1d(tag) === JsonNull_getInstance());
};
protoOf(AbstractJsonTreeDecoder).m12 = function (tag) {
  return this.m1d((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE());
};
protoOf(AbstractJsonTreeDecoder).n1d = function (tag) {
  var tmp$ret$4;
  $l$block: {
    // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.getPrimitiveValue' call
    // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
    // Inline function 'kotlinx.serialization.json.internal.cast' call
    var value = this.l1d(tag);
    if (!(value instanceof JsonPrimitive)) {
      var tmp = getKClass(JsonPrimitive).x9();
      var tmp_0 = getKClassFromExpression(value).x9();
      var tmp$ret$0 = this.j1d(tag);
      throw JsonDecodingException_0(-1, 'Expected ' + tmp + ', but had ' + tmp_0 + ' as the serialized body of ' + 'boolean' + ' at element: ' + tmp$ret$0, toString(value));
    }
    var literal = value;
    try {
      var tmp0_elvis_lhs = get_booleanOrNull(literal);
      var tmp_1;
      if (tmp0_elvis_lhs == null) {
        unparsedPrimitive(this, literal, 'boolean', tag);
      } else {
        tmp_1 = tmp0_elvis_lhs;
      }
      tmp$ret$4 = tmp_1;
      break $l$block;
    } catch ($p) {
      if ($p instanceof IllegalArgumentException) {
        var e = $p;
        unparsedPrimitive(this, literal, 'boolean', tag);
      } else {
        throw $p;
      }
    }
  }
  return tmp$ret$4;
};
protoOf(AbstractJsonTreeDecoder).n12 = function (tag) {
  return this.n1d((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE());
};
protoOf(AbstractJsonTreeDecoder).o1d = function (tag) {
  var tmp$ret$5;
  $l$block: {
    // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.getPrimitiveValue' call
    // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
    // Inline function 'kotlinx.serialization.json.internal.cast' call
    var value = this.l1d(tag);
    if (!(value instanceof JsonPrimitive)) {
      var tmp = getKClass(JsonPrimitive).x9();
      var tmp_0 = getKClassFromExpression(value).x9();
      var tmp$ret$0 = this.j1d(tag);
      throw JsonDecodingException_0(-1, 'Expected ' + tmp + ', but had ' + tmp_0 + ' as the serialized body of ' + 'byte' + ' at element: ' + tmp$ret$0, toString(value));
    }
    var literal = value;
    try {
      var result = parseLongImpl(literal);
      var tmp_1;
      // Inline function 'kotlin.ranges.contains' call
      var this_0 = numberRangeToNumber(-128, 127);
      if (contains_0(isInterface(this_0, ClosedRange) ? this_0 : THROW_CCE(), result)) {
        tmp_1 = convertToByte(result);
      } else {
        tmp_1 = null;
      }
      var tmp0_elvis_lhs = tmp_1;
      var tmp_2;
      if (tmp0_elvis_lhs == null) {
        unparsedPrimitive(this, literal, 'byte', tag);
      } else {
        tmp_2 = tmp0_elvis_lhs;
      }
      tmp$ret$5 = tmp_2;
      break $l$block;
    } catch ($p) {
      if ($p instanceof IllegalArgumentException) {
        var e = $p;
        unparsedPrimitive(this, literal, 'byte', tag);
      } else {
        throw $p;
      }
    }
  }
  return tmp$ret$5;
};
protoOf(AbstractJsonTreeDecoder).o12 = function (tag) {
  return this.o1d((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE());
};
protoOf(AbstractJsonTreeDecoder).p1d = function (tag) {
  var tmp$ret$5;
  $l$block: {
    // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.getPrimitiveValue' call
    // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
    // Inline function 'kotlinx.serialization.json.internal.cast' call
    var value = this.l1d(tag);
    if (!(value instanceof JsonPrimitive)) {
      var tmp = getKClass(JsonPrimitive).x9();
      var tmp_0 = getKClassFromExpression(value).x9();
      var tmp$ret$0 = this.j1d(tag);
      throw JsonDecodingException_0(-1, 'Expected ' + tmp + ', but had ' + tmp_0 + ' as the serialized body of ' + 'short' + ' at element: ' + tmp$ret$0, toString(value));
    }
    var literal = value;
    try {
      var result = parseLongImpl(literal);
      var tmp_1;
      // Inline function 'kotlin.ranges.contains' call
      var this_0 = numberRangeToNumber(-32768, 32767);
      if (contains_0(isInterface(this_0, ClosedRange) ? this_0 : THROW_CCE(), result)) {
        tmp_1 = convertToShort(result);
      } else {
        tmp_1 = null;
      }
      var tmp0_elvis_lhs = tmp_1;
      var tmp_2;
      if (tmp0_elvis_lhs == null) {
        unparsedPrimitive(this, literal, 'short', tag);
      } else {
        tmp_2 = tmp0_elvis_lhs;
      }
      tmp$ret$5 = tmp_2;
      break $l$block;
    } catch ($p) {
      if ($p instanceof IllegalArgumentException) {
        var e = $p;
        unparsedPrimitive(this, literal, 'short', tag);
      } else {
        throw $p;
      }
    }
  }
  return tmp$ret$5;
};
protoOf(AbstractJsonTreeDecoder).p12 = function (tag) {
  return this.p1d((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE());
};
protoOf(AbstractJsonTreeDecoder).q1d = function (tag) {
  var tmp$ret$5;
  $l$block: {
    // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.getPrimitiveValue' call
    // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
    // Inline function 'kotlinx.serialization.json.internal.cast' call
    var value = this.l1d(tag);
    if (!(value instanceof JsonPrimitive)) {
      var tmp = getKClass(JsonPrimitive).x9();
      var tmp_0 = getKClassFromExpression(value).x9();
      var tmp$ret$0 = this.j1d(tag);
      throw JsonDecodingException_0(-1, 'Expected ' + tmp + ', but had ' + tmp_0 + ' as the serialized body of ' + 'int' + ' at element: ' + tmp$ret$0, toString(value));
    }
    var literal = value;
    try {
      var result = parseLongImpl(literal);
      var tmp_1;
      // Inline function 'kotlin.ranges.contains' call
      var this_0 = numberRangeToNumber(-2147483648, 2147483647);
      if (contains_0(isInterface(this_0, ClosedRange) ? this_0 : THROW_CCE(), result)) {
        tmp_1 = convertToInt(result);
      } else {
        tmp_1 = null;
      }
      var tmp0_elvis_lhs = tmp_1;
      var tmp_2;
      if (tmp0_elvis_lhs == null) {
        unparsedPrimitive(this, literal, 'int', tag);
      } else {
        tmp_2 = tmp0_elvis_lhs;
      }
      tmp$ret$5 = tmp_2;
      break $l$block;
    } catch ($p) {
      if ($p instanceof IllegalArgumentException) {
        var e = $p;
        unparsedPrimitive(this, literal, 'int', tag);
      } else {
        throw $p;
      }
    }
  }
  return tmp$ret$5;
};
protoOf(AbstractJsonTreeDecoder).q12 = function (tag) {
  return this.q1d((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE());
};
protoOf(AbstractJsonTreeDecoder).r1d = function (tag) {
  var tmp$ret$4;
  $l$block: {
    // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.getPrimitiveValue' call
    // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
    // Inline function 'kotlinx.serialization.json.internal.cast' call
    var value = this.l1d(tag);
    if (!(value instanceof JsonPrimitive)) {
      var tmp = getKClass(JsonPrimitive).x9();
      var tmp_0 = getKClassFromExpression(value).x9();
      var tmp$ret$0 = this.j1d(tag);
      throw JsonDecodingException_0(-1, 'Expected ' + tmp + ', but had ' + tmp_0 + ' as the serialized body of ' + 'long' + ' at element: ' + tmp$ret$0, toString(value));
    }
    var literal = value;
    try {
      var tmp0_elvis_lhs = parseLongImpl(literal);
      var tmp_1;
      if (tmp0_elvis_lhs == null) {
        unparsedPrimitive(this, literal, 'long', tag);
      } else {
        tmp_1 = tmp0_elvis_lhs;
      }
      tmp$ret$4 = tmp_1;
      break $l$block;
    } catch ($p) {
      if ($p instanceof IllegalArgumentException) {
        var e = $p;
        unparsedPrimitive(this, literal, 'long', tag);
      } else {
        throw $p;
      }
    }
  }
  return tmp$ret$4;
};
protoOf(AbstractJsonTreeDecoder).r12 = function (tag) {
  return this.r1d((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE());
};
protoOf(AbstractJsonTreeDecoder).s1d = function (tag) {
  var tmp$ret$4;
  $l$block: {
    // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.getPrimitiveValue' call
    // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
    // Inline function 'kotlinx.serialization.json.internal.cast' call
    var value = this.l1d(tag);
    if (!(value instanceof JsonPrimitive)) {
      var tmp = getKClass(JsonPrimitive).x9();
      var tmp_0 = getKClassFromExpression(value).x9();
      var tmp$ret$0 = this.j1d(tag);
      throw JsonDecodingException_0(-1, 'Expected ' + tmp + ', but had ' + tmp_0 + ' as the serialized body of ' + 'float' + ' at element: ' + tmp$ret$0, toString(value));
    }
    var literal = value;
    try {
      var tmp0_elvis_lhs = get_float(literal);
      var tmp_1;
      if (tmp0_elvis_lhs == null) {
        unparsedPrimitive(this, literal, 'float', tag);
      } else {
        tmp_1 = tmp0_elvis_lhs;
      }
      tmp$ret$4 = tmp_1;
      break $l$block;
    } catch ($p) {
      if ($p instanceof IllegalArgumentException) {
        var e = $p;
        unparsedPrimitive(this, literal, 'float', tag);
      } else {
        throw $p;
      }
    }
  }
  var result = tmp$ret$4;
  var specialFp = this.e17().a15_1.x16_1;
  if (specialFp || isFinite(result))
    return result;
  throw InvalidFloatingPointDecoded(result, tag, toString(this.k1d()));
};
protoOf(AbstractJsonTreeDecoder).s12 = function (tag) {
  return this.s1d((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE());
};
protoOf(AbstractJsonTreeDecoder).t1d = function (tag) {
  var tmp$ret$4;
  $l$block: {
    // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.getPrimitiveValue' call
    // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
    // Inline function 'kotlinx.serialization.json.internal.cast' call
    var value = this.l1d(tag);
    if (!(value instanceof JsonPrimitive)) {
      var tmp = getKClass(JsonPrimitive).x9();
      var tmp_0 = getKClassFromExpression(value).x9();
      var tmp$ret$0 = this.j1d(tag);
      throw JsonDecodingException_0(-1, 'Expected ' + tmp + ', but had ' + tmp_0 + ' as the serialized body of ' + 'double' + ' at element: ' + tmp$ret$0, toString(value));
    }
    var literal = value;
    try {
      var tmp0_elvis_lhs = get_double(literal);
      var tmp_1;
      if (tmp0_elvis_lhs == null) {
        unparsedPrimitive(this, literal, 'double', tag);
      } else {
        tmp_1 = tmp0_elvis_lhs;
      }
      tmp$ret$4 = tmp_1;
      break $l$block;
    } catch ($p) {
      if ($p instanceof IllegalArgumentException) {
        var e = $p;
        unparsedPrimitive(this, literal, 'double', tag);
      } else {
        throw $p;
      }
    }
  }
  var result = tmp$ret$4;
  var specialFp = this.e17().a15_1.x16_1;
  if (specialFp || isFinite_0(result))
    return result;
  throw InvalidFloatingPointDecoded(result, tag, toString(this.k1d()));
};
protoOf(AbstractJsonTreeDecoder).t12 = function (tag) {
  return this.t1d((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE());
};
protoOf(AbstractJsonTreeDecoder).u1d = function (tag) {
  var tmp$ret$4;
  $l$block: {
    // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.getPrimitiveValue' call
    // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
    // Inline function 'kotlinx.serialization.json.internal.cast' call
    var value = this.l1d(tag);
    if (!(value instanceof JsonPrimitive)) {
      var tmp = getKClass(JsonPrimitive).x9();
      var tmp_0 = getKClassFromExpression(value).x9();
      var tmp$ret$0 = this.j1d(tag);
      throw JsonDecodingException_0(-1, 'Expected ' + tmp + ', but had ' + tmp_0 + ' as the serialized body of ' + 'char' + ' at element: ' + tmp$ret$0, toString(value));
    }
    var literal = value;
    try {
      var tmp0_elvis_lhs = new Char(single(literal.h17()));
      var tmp_1;
      if (tmp0_elvis_lhs == null) {
        unparsedPrimitive(this, literal, 'char', tag);
      } else {
        tmp_1 = tmp0_elvis_lhs;
      }
      tmp$ret$4 = tmp_1.m1_1;
      break $l$block;
    } catch ($p) {
      if ($p instanceof IllegalArgumentException) {
        var e = $p;
        unparsedPrimitive(this, literal, 'char', tag);
      } else {
        throw $p;
      }
    }
  }
  return tmp$ret$4;
};
protoOf(AbstractJsonTreeDecoder).u12 = function (tag) {
  return this.u1d((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE());
};
protoOf(AbstractJsonTreeDecoder).v1d = function (tag) {
  // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
  // Inline function 'kotlinx.serialization.json.internal.cast' call
  var value = this.l1d(tag);
  if (!(value instanceof JsonPrimitive)) {
    var tmp = getKClass(JsonPrimitive).x9();
    var tmp_0 = getKClassFromExpression(value).x9();
    var tmp$ret$0 = this.j1d(tag);
    throw JsonDecodingException_0(-1, 'Expected ' + tmp + ', but had ' + tmp_0 + ' as the serialized body of ' + 'string' + ' at element: ' + tmp$ret$0, toString(value));
  }
  var value_0 = value;
  if (!(value_0 instanceof JsonLiteral))
    throw JsonDecodingException_0(-1, "Expected string value for a non-null key '" + tag + "', got null literal instead at element: " + this.j1d(tag), toString(this.k1d()));
  if (!value_0.p17_1 && !this.e17().a15_1.p16_1) {
    throw JsonDecodingException_0(-1, "String literal for key '" + tag + "' should be quoted at element: " + this.j1d(tag) + ".\nUse 'isLenient = true' in 'Json {}' builder to accept non-compliant JSON.", toString(this.k1d()));
  }
  return value_0.r17_1;
};
protoOf(AbstractJsonTreeDecoder).v12 = function (tag) {
  return this.v1d((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE());
};
protoOf(AbstractJsonTreeDecoder).w1d = function (tag, inlineDescriptor) {
  var tmp;
  if (get_isUnsignedNumber(inlineDescriptor)) {
    var tmp_0 = this.e17();
    // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.getPrimitiveValue' call
    var tmp2 = this.l1d(tag);
    // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
    // Inline function 'kotlinx.serialization.json.internal.cast' call
    var serialName = inlineDescriptor.hn();
    if (!(tmp2 instanceof JsonPrimitive)) {
      var tmp_1 = getKClass(JsonPrimitive).x9();
      var tmp_2 = getKClassFromExpression(tmp2).x9();
      var tmp$ret$0 = this.j1d(tag);
      throw JsonDecodingException_0(-1, 'Expected ' + tmp_1 + ', but had ' + tmp_2 + ' as the serialized body of ' + serialName + ' at element: ' + tmp$ret$0, toString(tmp2));
    }
    var lexer = StringJsonLexer_0(tmp_0, tmp2.h17());
    tmp = new JsonDecoderForUnsignedTypes(lexer, this.e17());
  } else {
    tmp = protoOf(NamedValueDecoder).w12.call(this, tag, inlineDescriptor);
  }
  return tmp;
};
protoOf(AbstractJsonTreeDecoder).w12 = function (tag, inlineDescriptor) {
  return this.w1d((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE(), inlineDescriptor);
};
protoOf(AbstractJsonTreeDecoder).uo = function (descriptor) {
  return !(this.i12() == null) ? protoOf(NamedValueDecoder).uo.call(this, descriptor) : (new JsonPrimitiveDecoder(this.e17(), this.m2(), this.h1d_1)).uo(descriptor);
};
function setForceNull($this, descriptor, index) {
  $this.g1e_1 = (!$this.e17().a15_1.s16_1 && !descriptor.qn(index) && descriptor.pn(index).an());
  return $this.g1e_1;
}
function JsonTreeDecoder(json, value, polymorphicDiscriminator, polyDescriptor) {
  polymorphicDiscriminator = polymorphicDiscriminator === VOID ? null : polymorphicDiscriminator;
  polyDescriptor = polyDescriptor === VOID ? null : polyDescriptor;
  AbstractJsonTreeDecoder.call(this, json, value, polymorphicDiscriminator);
  this.d1e_1 = value;
  this.e1e_1 = polyDescriptor;
  this.f1e_1 = 0;
  this.g1e_1 = false;
}
protoOf(JsonTreeDecoder).m2 = function () {
  return this.d1e_1;
};
protoOf(JsonTreeDecoder).np = function (descriptor) {
  $l$loop: while (this.f1e_1 < descriptor.kn()) {
    var _unary__edvuaz = this.f1e_1;
    this.f1e_1 = _unary__edvuaz + 1 | 0;
    var name = this.d12(descriptor, _unary__edvuaz);
    var index = this.f1e_1 - 1 | 0;
    this.g1e_1 = false;
    var tmp;
    // Inline function 'kotlin.collections.contains' call
    // Inline function 'kotlin.collections.containsKey' call
    var this_0 = this.m2();
    if ((isInterface(this_0, KtMap) ? this_0 : THROW_CCE()).i2(name)) {
      tmp = true;
    } else {
      tmp = setForceNull(this, descriptor, index);
    }
    if (tmp) {
      if (!this.i1d_1.u16_1)
        return index;
      var tmp0 = this.e17();
      var tmp$ret$3;
      $l$block_2: {
        // Inline function 'kotlinx.serialization.json.internal.tryCoerceValue' call
        var isOptional = descriptor.qn(index);
        var elementDescriptor = descriptor.pn(index);
        var tmp_0;
        if (isOptional && !elementDescriptor.an()) {
          var tmp_1 = this.h1e(name);
          tmp_0 = tmp_1 instanceof JsonNull;
        } else {
          tmp_0 = false;
        }
        if (tmp_0) {
          tmp$ret$3 = true;
          break $l$block_2;
        }
        if (equals(elementDescriptor.in(), ENUM_getInstance())) {
          var tmp_2;
          if (elementDescriptor.an()) {
            var tmp_3 = this.h1e(name);
            tmp_2 = tmp_3 instanceof JsonNull;
          } else {
            tmp_2 = false;
          }
          if (tmp_2) {
            tmp$ret$3 = false;
            break $l$block_2;
          }
          var tmp_4 = this.h1e(name);
          var tmp0_safe_receiver = tmp_4 instanceof JsonPrimitive ? tmp_4 : null;
          var tmp0_elvis_lhs = tmp0_safe_receiver == null ? null : get_contentOrNull(tmp0_safe_receiver);
          var tmp_5;
          if (tmp0_elvis_lhs == null) {
            tmp$ret$3 = false;
            break $l$block_2;
          } else {
            tmp_5 = tmp0_elvis_lhs;
          }
          var enumValue = tmp_5;
          var enumIndex = getJsonNameIndex(elementDescriptor, tmp0, enumValue);
          var coerceToNull = !tmp0.a15_1.s16_1 && elementDescriptor.an();
          if (enumIndex === -3 && (isOptional || coerceToNull)) {
            if (setForceNull(this, descriptor, index))
              return index;
            tmp$ret$3 = true;
            break $l$block_2;
          }
        }
        tmp$ret$3 = false;
      }
      if (tmp$ret$3)
        continue $l$loop;
      return index;
    }
  }
  return -1;
};
protoOf(JsonTreeDecoder).jo = function () {
  return !this.g1e_1 && protoOf(AbstractJsonTreeDecoder).jo.call(this);
};
protoOf(JsonTreeDecoder).e12 = function (descriptor, index) {
  var strategy = namingStrategy(descriptor, this.e17());
  var baseName = descriptor.mn(index);
  if (strategy == null) {
    if (!this.i1d_1.y16_1)
      return baseName;
    if (this.m2().f2().y1(baseName))
      return baseName;
  }
  var deserializationNamesMap_0 = deserializationNamesMap(this.e17(), descriptor);
  // Inline function 'kotlin.collections.find' call
  var tmp0 = this.m2().f2();
  var tmp$ret$1;
  $l$block: {
    // Inline function 'kotlin.collections.firstOrNull' call
    var _iterator__ex2g4s = tmp0.r();
    while (_iterator__ex2g4s.s()) {
      var element = _iterator__ex2g4s.t();
      if (deserializationNamesMap_0.k2(element) === index) {
        tmp$ret$1 = element;
        break $l$block;
      }
    }
    tmp$ret$1 = null;
  }
  var tmp0_safe_receiver = tmp$ret$1;
  if (tmp0_safe_receiver == null)
    null;
  else {
    // Inline function 'kotlin.let' call
    return tmp0_safe_receiver;
  }
  var fallbackName = strategy == null ? null : strategy.y19(descriptor, index, baseName);
  return fallbackName == null ? baseName : fallbackName;
};
protoOf(JsonTreeDecoder).l1d = function (tag) {
  return getValue(this.m2(), tag);
};
protoOf(JsonTreeDecoder).h1e = function (tag) {
  return this.m2().k17(tag);
};
protoOf(JsonTreeDecoder).xo = function (descriptor) {
  if (descriptor === this.e1e_1) {
    var tmp = this.e17();
    var tmp2 = this.k1d();
    // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
    // Inline function 'kotlinx.serialization.json.internal.cast' call
    var serialName = this.e1e_1.hn();
    if (!(tmp2 instanceof JsonObject)) {
      var tmp_0 = getKClass(JsonObject).x9();
      var tmp_1 = getKClassFromExpression(tmp2).x9();
      var tmp$ret$0 = this.k12();
      throw JsonDecodingException_0(-1, 'Expected ' + tmp_0 + ', but had ' + tmp_1 + ' as the serialized body of ' + serialName + ' at element: ' + tmp$ret$0, toString(tmp2));
    }
    return new JsonTreeDecoder(tmp, tmp2, this.h1d_1, this.e1e_1);
  }
  return protoOf(AbstractJsonTreeDecoder).xo.call(this, descriptor);
};
protoOf(JsonTreeDecoder).yo = function (descriptor) {
  var tmp;
  if (ignoreUnknownKeys(descriptor, this.e17())) {
    tmp = true;
  } else {
    var tmp_0 = descriptor.in();
    tmp = tmp_0 instanceof PolymorphicKind;
  }
  if (tmp)
    return Unit_instance;
  var strategy = namingStrategy(descriptor, this.e17());
  var tmp_1;
  if (strategy == null && !this.i1d_1.y16_1) {
    tmp_1 = jsonCachedSerialNames(descriptor);
  } else if (!(strategy == null)) {
    tmp_1 = deserializationNamesMap(this.e17(), descriptor).f2();
  } else {
    var tmp_2 = jsonCachedSerialNames(descriptor);
    var tmp0_safe_receiver = get_schemaCache(this.e17()).j1c(descriptor, get_JsonDeserializationNamesKey());
    // Inline function 'kotlin.collections.orEmpty' call
    var tmp0_elvis_lhs = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.f2();
    var tmp$ret$0 = tmp0_elvis_lhs == null ? emptySet() : tmp0_elvis_lhs;
    tmp_1 = plus_0(tmp_2, tmp$ret$0);
  }
  var names = tmp_1;
  var _iterator__ex2g4s = this.m2().f2().r();
  while (_iterator__ex2g4s.s()) {
    var key = _iterator__ex2g4s.t();
    if (!names.y1(key) && !(key === this.h1d_1)) {
      throw JsonDecodingException_1(-1, "Encountered an unknown key '" + key + "' at element: " + this.k12() + '\n' + "Use 'ignoreUnknownKeys = true' in 'Json {}' builder or '@JsonIgnoreUnknownKeys' annotation to ignore unknown keys.\n" + ('JSON input: ' + toString(minify(this.m2().toString()))));
    }
  }
};
function JsonTreeListDecoder(json, value) {
  AbstractJsonTreeDecoder.call(this, json, value);
  this.o1e_1 = value;
  this.p1e_1 = this.o1e_1.u();
  this.q1e_1 = -1;
}
protoOf(JsonTreeListDecoder).m2 = function () {
  return this.o1e_1;
};
protoOf(JsonTreeListDecoder).e12 = function (descriptor, index) {
  return index.toString();
};
protoOf(JsonTreeListDecoder).l1d = function (tag) {
  return this.o1e_1.w(toInt(tag));
};
protoOf(JsonTreeListDecoder).np = function (descriptor) {
  while (this.q1e_1 < (this.p1e_1 - 1 | 0)) {
    this.q1e_1 = this.q1e_1 + 1 | 0;
    return this.q1e_1;
  }
  return -1;
};
function JsonPrimitiveDecoder(json, value, polymorphicDiscriminator) {
  polymorphicDiscriminator = polymorphicDiscriminator === VOID ? null : polymorphicDiscriminator;
  AbstractJsonTreeDecoder.call(this, json, value, polymorphicDiscriminator);
  this.x1e_1 = value;
  this.x12('primitive');
}
protoOf(JsonPrimitiveDecoder).m2 = function () {
  return this.x1e_1;
};
protoOf(JsonPrimitiveDecoder).np = function (descriptor) {
  return 0;
};
protoOf(JsonPrimitiveDecoder).l1d = function (tag) {
  // Inline function 'kotlin.require' call
  if (!(tag === 'primitive')) {
    var message = "This input can only handle primitives with 'primitive' tag";
    throw IllegalArgumentException_init_$Create$(toString(message));
  }
  return this.x1e_1;
};
function JsonTreeMapDecoder(json, value) {
  JsonTreeDecoder.call(this, json, value);
  this.i1f_1 = value;
  this.j1f_1 = toList(this.i1f_1.f2());
  this.k1f_1 = imul(this.j1f_1.u(), 2);
  this.l1f_1 = -1;
}
protoOf(JsonTreeMapDecoder).m2 = function () {
  return this.i1f_1;
};
protoOf(JsonTreeMapDecoder).e12 = function (descriptor, index) {
  var i = index / 2 | 0;
  return this.j1f_1.w(i);
};
protoOf(JsonTreeMapDecoder).np = function (descriptor) {
  while (this.l1f_1 < (this.k1f_1 - 1 | 0)) {
    this.l1f_1 = this.l1f_1 + 1 | 0;
    return this.l1f_1;
  }
  return -1;
};
protoOf(JsonTreeMapDecoder).l1d = function (tag) {
  return (this.l1f_1 % 2 | 0) === 0 ? JsonPrimitive_0(tag) : getValue(this.i1f_1, tag);
};
protoOf(JsonTreeMapDecoder).yo = function (descriptor) {
};
function readPolymorphicJson(_this__u8e3s4, discriminator, element, deserializer) {
  return (new JsonTreeDecoder(_this__u8e3s4, element, discriminator, deserializer.am())).wo(deserializer);
}
var WriteMode_OBJ_instance;
var WriteMode_LIST_instance;
var WriteMode_MAP_instance;
var WriteMode_POLY_OBJ_instance;
function values() {
  return [WriteMode_OBJ_getInstance(), WriteMode_LIST_getInstance(), WriteMode_MAP_getInstance(), WriteMode_POLY_OBJ_getInstance()];
}
function get_entries() {
  if ($ENTRIES == null)
    $ENTRIES = enumEntries(values());
  return $ENTRIES;
}
var WriteMode_entriesInitialized;
function WriteMode_initEntries() {
  if (WriteMode_entriesInitialized)
    return Unit_instance;
  WriteMode_entriesInitialized = true;
  WriteMode_OBJ_instance = new WriteMode('OBJ', 0, _Char___init__impl__6a9atx(123), _Char___init__impl__6a9atx(125));
  WriteMode_LIST_instance = new WriteMode('LIST', 1, _Char___init__impl__6a9atx(91), _Char___init__impl__6a9atx(93));
  WriteMode_MAP_instance = new WriteMode('MAP', 2, _Char___init__impl__6a9atx(123), _Char___init__impl__6a9atx(125));
  WriteMode_POLY_OBJ_instance = new WriteMode('POLY_OBJ', 3, _Char___init__impl__6a9atx(91), _Char___init__impl__6a9atx(93));
}
var $ENTRIES;
function WriteMode(name, ordinal, begin, end) {
  Enum.call(this, name, ordinal);
  this.w1c_1 = begin;
  this.x1c_1 = end;
}
function switchMode(_this__u8e3s4, desc) {
  var tmp0_subject = desc.in();
  var tmp;
  if (tmp0_subject instanceof PolymorphicKind) {
    tmp = WriteMode_POLY_OBJ_getInstance();
  } else {
    if (equals(tmp0_subject, LIST_getInstance())) {
      tmp = WriteMode_LIST_getInstance();
    } else {
      if (equals(tmp0_subject, MAP_getInstance())) {
        // Inline function 'kotlinx.serialization.json.internal.selectMapMode' call
        var keyDescriptor = carrierDescriptor(desc.pn(0), _this__u8e3s4.lp());
        var keyKind = keyDescriptor.in();
        var tmp_0;
        var tmp_1;
        if (keyKind instanceof PrimitiveKind) {
          tmp_1 = true;
        } else {
          tmp_1 = equals(keyKind, ENUM_getInstance());
        }
        if (tmp_1) {
          tmp_0 = WriteMode_MAP_getInstance();
        } else {
          if (_this__u8e3s4.a15_1.q16_1) {
            tmp_0 = WriteMode_LIST_getInstance();
          } else {
            throw InvalidKeyKindException(keyDescriptor);
          }
        }
        tmp = tmp_0;
      } else {
        tmp = WriteMode_OBJ_getInstance();
      }
    }
  }
  return tmp;
}
function carrierDescriptor(_this__u8e3s4, module_0) {
  var tmp;
  if (equals(_this__u8e3s4.in(), CONTEXTUAL_getInstance())) {
    var tmp0_safe_receiver = getContextualDescriptor(module_0, _this__u8e3s4);
    var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : carrierDescriptor(tmp0_safe_receiver, module_0);
    tmp = tmp1_elvis_lhs == null ? _this__u8e3s4 : tmp1_elvis_lhs;
  } else if (_this__u8e3s4.jn()) {
    tmp = carrierDescriptor(_this__u8e3s4.pn(0), module_0);
  } else {
    tmp = _this__u8e3s4;
  }
  return tmp;
}
function WriteMode_OBJ_getInstance() {
  WriteMode_initEntries();
  return WriteMode_OBJ_instance;
}
function WriteMode_LIST_getInstance() {
  WriteMode_initEntries();
  return WriteMode_LIST_instance;
}
function WriteMode_MAP_getInstance() {
  WriteMode_initEntries();
  return WriteMode_MAP_instance;
}
function WriteMode_POLY_OBJ_getInstance() {
  WriteMode_initEntries();
  return WriteMode_POLY_OBJ_instance;
}
function appendEscape($this, lastPosition, current) {
  $this.m1f(lastPosition, current);
  return appendEsc($this, current + 1 | 0);
}
function decodedString($this, lastPosition, currentPosition) {
  $this.m1f(lastPosition, currentPosition);
  var result = $this.s15_1.toString();
  $this.s15_1.mb(0);
  return result;
}
function takePeeked($this) {
  // Inline function 'kotlin.also' call
  var this_0 = ensureNotNull($this.r15_1);
  $this.r15_1 = null;
  return this_0;
}
function wasUnquotedString($this) {
  return !(charSequenceGet($this.n1f(), $this.p15_1 - 1 | 0) === _Char___init__impl__6a9atx(34));
}
function appendEsc($this, startPosition) {
  var currentPosition = startPosition;
  currentPosition = $this.o1f(currentPosition);
  if (currentPosition === -1) {
    $this.u19('Expected escape sequence to continue, got EOF');
  }
  var tmp = $this.n1f();
  var _unary__edvuaz = currentPosition;
  currentPosition = _unary__edvuaz + 1 | 0;
  var currentChar = charSequenceGet(tmp, _unary__edvuaz);
  if (currentChar === _Char___init__impl__6a9atx(117)) {
    return appendHex($this, $this.n1f(), currentPosition);
  }
  // Inline function 'kotlin.code' call
  var tmp$ret$0 = Char__toInt_impl_vasixd(currentChar);
  var c = escapeToChar(tmp$ret$0);
  if (c === _Char___init__impl__6a9atx(0)) {
    $this.u19("Invalid escaped char '" + toString_1(currentChar) + "'");
  }
  $this.s15_1.s7(c);
  return currentPosition;
}
function appendHex($this, source, startPos) {
  if ((startPos + 4 | 0) >= charSequenceLength(source)) {
    $this.p15_1 = startPos;
    $this.p1f();
    if (($this.p15_1 + 4 | 0) >= charSequenceLength(source)) {
      $this.u19('Unexpected EOF during unicode escape');
    }
    return appendHex($this, source, $this.p15_1);
  }
  $this.s15_1.s7(numberToChar((((fromHexChar($this, source, startPos) << 12) + (fromHexChar($this, source, startPos + 1 | 0) << 8) | 0) + (fromHexChar($this, source, startPos + 2 | 0) << 4) | 0) + fromHexChar($this, source, startPos + 3 | 0) | 0));
  return startPos + 4 | 0;
}
function fromHexChar($this, source, currentPosition) {
  var character = charSequenceGet(source, currentPosition);
  var tmp;
  if (_Char___init__impl__6a9atx(48) <= character ? character <= _Char___init__impl__6a9atx(57) : false) {
    // Inline function 'kotlin.code' call
    var tmp_0 = Char__toInt_impl_vasixd(character);
    // Inline function 'kotlin.code' call
    var this_0 = _Char___init__impl__6a9atx(48);
    tmp = tmp_0 - Char__toInt_impl_vasixd(this_0) | 0;
  } else if (_Char___init__impl__6a9atx(97) <= character ? character <= _Char___init__impl__6a9atx(102) : false) {
    // Inline function 'kotlin.code' call
    var tmp_1 = Char__toInt_impl_vasixd(character);
    // Inline function 'kotlin.code' call
    var this_1 = _Char___init__impl__6a9atx(97);
    tmp = (tmp_1 - Char__toInt_impl_vasixd(this_1) | 0) + 10 | 0;
  } else if (_Char___init__impl__6a9atx(65) <= character ? character <= _Char___init__impl__6a9atx(70) : false) {
    // Inline function 'kotlin.code' call
    var tmp_2 = Char__toInt_impl_vasixd(character);
    // Inline function 'kotlin.code' call
    var this_2 = _Char___init__impl__6a9atx(65);
    tmp = (tmp_2 - Char__toInt_impl_vasixd(this_2) | 0) + 10 | 0;
  } else {
    $this.u19("Invalid toHexChar char '" + toString_1(character) + "' in unicode escape");
  }
  return tmp;
}
function consumeBoolean2($this, start) {
  var current = $this.o1f(start);
  if (current >= charSequenceLength($this.n1f()) || current === -1) {
    $this.u19('EOF');
  }
  var tmp = $this.n1f();
  var _unary__edvuaz = current;
  current = _unary__edvuaz + 1 | 0;
  // Inline function 'kotlin.code' call
  var this_0 = charSequenceGet(tmp, _unary__edvuaz);
  var tmp0_subject = Char__toInt_impl_vasixd(this_0) | 32;
  var tmp_0;
  // Inline function 'kotlin.code' call
  var this_1 = _Char___init__impl__6a9atx(116);
  if (tmp0_subject === Char__toInt_impl_vasixd(this_1)) {
    consumeBooleanLiteral($this, 'rue', current);
    tmp_0 = true;
  } else {
    // Inline function 'kotlin.code' call
    var this_2 = _Char___init__impl__6a9atx(102);
    if (tmp0_subject === Char__toInt_impl_vasixd(this_2)) {
      consumeBooleanLiteral($this, 'alse', current);
      tmp_0 = false;
    } else {
      $this.u19("Expected valid boolean literal prefix, but had '" + $this.c1b() + "'");
    }
  }
  return tmp_0;
}
function consumeBooleanLiteral($this, literalSuffix, current) {
  if ((charSequenceLength($this.n1f()) - current | 0) < literalSuffix.length) {
    $this.u19('Unexpected end of boolean literal');
  }
  var inductionVariable = 0;
  var last = charSequenceLength(literalSuffix) - 1 | 0;
  if (inductionVariable <= last)
    do {
      var i = inductionVariable;
      inductionVariable = inductionVariable + 1 | 0;
      var expected = charCodeAt(literalSuffix, i);
      var actual = charSequenceGet($this.n1f(), current + i | 0);
      // Inline function 'kotlin.code' call
      var tmp = Char__toInt_impl_vasixd(expected);
      // Inline function 'kotlin.code' call
      if (!(tmp === (Char__toInt_impl_vasixd(actual) | 32))) {
        $this.u19("Expected valid boolean literal prefix, but had '" + $this.c1b() + "'");
      }
    }
     while (inductionVariable <= last);
  $this.p15_1 = current + literalSuffix.length | 0;
}
function consumeNumericLiteral$calculateExponent(exponentAccumulator, isExponentPositive) {
  var tmp;
  switch (isExponentPositive) {
    case false:
      // Inline function 'kotlin.math.pow' call

      var x = -toNumber(exponentAccumulator);
      tmp = Math.pow(10.0, x);
      break;
    case true:
      // Inline function 'kotlin.math.pow' call

      var x_0 = toNumber(exponentAccumulator);
      tmp = Math.pow(10.0, x_0);
      break;
    default:
      noWhenBranchMatchedException();
      break;
  }
  return tmp;
}
function AbstractJsonLexer() {
  this.p15_1 = 0;
  this.q15_1 = new JsonPath();
  this.r15_1 = null;
  this.s15_1 = StringBuilder_init_$Create$();
}
protoOf(AbstractJsonLexer).p1f = function () {
};
protoOf(AbstractJsonLexer).m1c = function () {
  var current = this.q1f();
  var source = this.n1f();
  if (current >= charSequenceLength(source) || current === -1)
    return false;
  if (charSequenceGet(source, current) === _Char___init__impl__6a9atx(44)) {
    this.p15_1 = this.p15_1 + 1 | 0;
    return true;
  }
  return false;
};
protoOf(AbstractJsonLexer).r1f = function (c) {
  return c === _Char___init__impl__6a9atx(125) || c === _Char___init__impl__6a9atx(93) || (c === _Char___init__impl__6a9atx(58) || c === _Char___init__impl__6a9atx(44)) ? false : true;
};
protoOf(AbstractJsonLexer).t15 = function () {
  var nextToken = this.e1b();
  if (!(nextToken === 10)) {
    this.u19('Expected EOF after parsing, but had ' + toString_1(charSequenceGet(this.n1f(), this.p15_1 - 1 | 0)) + ' instead');
  }
};
protoOf(AbstractJsonLexer).y1a = function (expected) {
  var token = this.e1b();
  if (!(token === expected)) {
    // Inline function 'kotlinx.serialization.json.internal.AbstractJsonLexer.fail' call
    var expected_0 = tokenDescription(expected);
    var position = true ? this.p15_1 - 1 | 0 : this.p15_1;
    var s = this.p15_1 === charSequenceLength(this.n1f()) || position < 0 ? 'EOF' : toString_1(charSequenceGet(this.n1f(), position));
    var tmp$ret$0 = 'Expected ' + expected_0 + ", but had '" + s + "' instead";
    this.u19(tmp$ret$0, position);
  }
  return token;
};
protoOf(AbstractJsonLexer).s1f = function (expected) {
  if (this.p15_1 > 0 && expected === _Char___init__impl__6a9atx(34)) {
    var tmp$ret$1;
    $l$block: {
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonLexer.withPositionRollback' call
      var snapshot = this.p15_1;
      try {
        this.p15_1 = this.p15_1 - 1 | 0;
        tmp$ret$1 = this.c1b();
        break $l$block;
      }finally {
        this.p15_1 = snapshot;
      }
    }
    var inputLiteral = tmp$ret$1;
    if (inputLiteral === 'null') {
      this.t19("Expected string literal but 'null' literal was found", this.p15_1 - 1 | 0, "Use 'coerceInputValues = true' in 'Json {}' builder to coerce nulls if property has a default value.");
    }
  }
  // Inline function 'kotlinx.serialization.json.internal.AbstractJsonLexer.fail' call
  var expectedToken = charToTokenClass(expected);
  var expected_0 = tokenDescription(expectedToken);
  var position = true ? this.p15_1 - 1 | 0 : this.p15_1;
  var s = this.p15_1 === charSequenceLength(this.n1f()) || position < 0 ? 'EOF' : toString_1(charSequenceGet(this.n1f(), position));
  var tmp$ret$2 = 'Expected ' + expected_0 + ", but had '" + s + "' instead";
  this.u19(tmp$ret$2, position);
};
protoOf(AbstractJsonLexer).z1a = function () {
  var source = this.n1f();
  var cpos = this.p15_1;
  $l$loop_0: while (true) {
    cpos = this.o1f(cpos);
    if (cpos === -1)
      break $l$loop_0;
    var ch = charSequenceGet(source, cpos);
    if (ch === _Char___init__impl__6a9atx(32) || ch === _Char___init__impl__6a9atx(10) || ch === _Char___init__impl__6a9atx(13) || ch === _Char___init__impl__6a9atx(9)) {
      cpos = cpos + 1 | 0;
      continue $l$loop_0;
    }
    this.p15_1 = cpos;
    return charToTokenClass(ch);
  }
  this.p15_1 = cpos;
  return 10;
};
protoOf(AbstractJsonLexer).n1c = function (doConsume) {
  var current = this.q1f();
  current = this.o1f(current);
  var len = charSequenceLength(this.n1f()) - current | 0;
  if (len < 4 || current === -1)
    return false;
  var inductionVariable = 0;
  if (inductionVariable <= 3)
    do {
      var i = inductionVariable;
      inductionVariable = inductionVariable + 1 | 0;
      if (!(charCodeAt('null', i) === charSequenceGet(this.n1f(), current + i | 0)))
        return false;
    }
     while (inductionVariable <= 3);
  if (len > 4 && charToTokenClass(charSequenceGet(this.n1f(), current + 4 | 0)) === 0)
    return false;
  if (doConsume) {
    this.p15_1 = current + 4 | 0;
  }
  return true;
};
protoOf(AbstractJsonLexer).y1c = function (doConsume, $super) {
  doConsume = doConsume === VOID ? true : doConsume;
  return $super === VOID ? this.n1c(doConsume) : $super.n1c.call(this, doConsume);
};
protoOf(AbstractJsonLexer).o1c = function (isLenient) {
  var token = this.z1a();
  var tmp;
  if (isLenient) {
    if (!(token === 1) && !(token === 0))
      return null;
    tmp = this.c1b();
  } else {
    if (!(token === 1))
      return null;
    tmp = this.b1b();
  }
  var string = tmp;
  this.r15_1 = string;
  return string;
};
protoOf(AbstractJsonLexer).t1f = function () {
  this.r15_1 = null;
};
protoOf(AbstractJsonLexer).nb = function (startPos, endPos) {
  // Inline function 'kotlin.text.substring' call
  var this_0 = this.n1f();
  return toString(charSequenceSubSequence(this_0, startPos, endPos));
};
protoOf(AbstractJsonLexer).b1b = function () {
  if (!(this.r15_1 == null)) {
    return takePeeked(this);
  }
  return this.r1c();
};
protoOf(AbstractJsonLexer).consumeString2 = function (source, startPosition, current) {
  var currentPosition = current;
  var lastPosition = startPosition;
  var char = charSequenceGet(source, currentPosition);
  var usedAppend = false;
  while (!(char === _Char___init__impl__6a9atx(34))) {
    if (char === _Char___init__impl__6a9atx(92)) {
      usedAppend = true;
      currentPosition = this.o1f(appendEscape(this, lastPosition, currentPosition));
      if (currentPosition === -1) {
        this.u19('Unexpected EOF', currentPosition);
      }
      lastPosition = currentPosition;
    } else {
      currentPosition = currentPosition + 1 | 0;
      if (currentPosition >= charSequenceLength(source)) {
        usedAppend = true;
        this.m1f(lastPosition, currentPosition);
        currentPosition = this.o1f(currentPosition);
        if (currentPosition === -1) {
          this.u19('Unexpected EOF', currentPosition);
        }
        lastPosition = currentPosition;
      }
    }
    char = charSequenceGet(source, currentPosition);
  }
  var tmp;
  if (!usedAppend) {
    tmp = this.nb(lastPosition, currentPosition);
  } else {
    tmp = decodedString(this, lastPosition, currentPosition);
  }
  var string = tmp;
  this.p15_1 = currentPosition + 1 | 0;
  return string;
};
protoOf(AbstractJsonLexer).s1c = function () {
  var result = this.c1b();
  if (result === 'null' && wasUnquotedString(this)) {
    this.u19("Unexpected 'null' value instead of string literal");
  }
  return result;
};
protoOf(AbstractJsonLexer).c1b = function () {
  if (!(this.r15_1 == null)) {
    return takePeeked(this);
  }
  var current = this.q1f();
  if (current >= charSequenceLength(this.n1f()) || current === -1) {
    this.u19('EOF', current);
  }
  var token = charToTokenClass(charSequenceGet(this.n1f(), current));
  if (token === 1) {
    return this.b1b();
  }
  if (!(token === 0)) {
    this.u19('Expected beginning of the string, but got ' + toString_1(charSequenceGet(this.n1f(), current)));
  }
  var usedAppend = false;
  while (charToTokenClass(charSequenceGet(this.n1f(), current)) === 0) {
    current = current + 1 | 0;
    if (current >= charSequenceLength(this.n1f())) {
      usedAppend = true;
      this.m1f(this.p15_1, current);
      var eof = this.o1f(current);
      if (eof === -1) {
        this.p15_1 = current;
        return decodedString(this, 0, 0);
      } else {
        current = eof;
      }
    }
  }
  var tmp;
  if (!usedAppend) {
    tmp = this.nb(this.p15_1, current);
  } else {
    tmp = decodedString(this, this.p15_1, current);
  }
  var result = tmp;
  this.p15_1 = current;
  return result;
};
protoOf(AbstractJsonLexer).m1f = function (fromIndex, toIndex) {
  this.s15_1.gb(this.n1f(), fromIndex, toIndex);
};
protoOf(AbstractJsonLexer).q1c = function (allowLenientStrings) {
  // Inline function 'kotlin.collections.mutableListOf' call
  var tokenStack = ArrayList_init_$Create$();
  var lastToken = this.z1a();
  if (!(lastToken === 8) && !(lastToken === 6)) {
    this.c1b();
    return Unit_instance;
  }
  $l$loop: while (true) {
    lastToken = this.z1a();
    if (lastToken === 1) {
      if (allowLenientStrings)
        this.c1b();
      else
        this.r1c();
      continue $l$loop;
    }
    var tmp0_subject = lastToken;
    if (tmp0_subject === 8 || tmp0_subject === 6) {
      tokenStack.j(lastToken);
    } else if (tmp0_subject === 9) {
      if (!(last(tokenStack) === 8))
        throw JsonDecodingException_0(this.p15_1, 'found ] instead of } at path: ' + this.q15_1.toString(), this.n1f());
      removeLast(tokenStack);
    } else if (tmp0_subject === 7) {
      if (!(last(tokenStack) === 6))
        throw JsonDecodingException_0(this.p15_1, 'found } instead of ] at path: ' + this.q15_1.toString(), this.n1f());
      removeLast(tokenStack);
    } else if (tmp0_subject === 10) {
      this.u19('Unexpected end of input due to malformed JSON during ignoring unknown keys');
    }
    this.e1b();
    if (tokenStack.u() === 0)
      return Unit_instance;
  }
};
protoOf(AbstractJsonLexer).toString = function () {
  return "JsonReader(source='" + toString(this.n1f()) + "', currentPosition=" + this.p15_1 + ')';
};
protoOf(AbstractJsonLexer).p1c = function (key) {
  var processed = this.nb(0, this.p15_1);
  var lastIndexOf_0 = lastIndexOf(processed, key);
  throw new JsonDecodingException("Encountered an unknown key '" + key + "' at offset " + lastIndexOf_0 + ' at path: ' + this.q15_1.h1a() + "\nUse 'ignoreUnknownKeys = true' in 'Json {}' builder or '@JsonIgnoreUnknownKeys' annotation to ignore unknown keys.\n" + ('JSON input: ' + toString(minify(this.n1f(), lastIndexOf_0))));
};
protoOf(AbstractJsonLexer).t19 = function (message, position, hint) {
  var tmp;
  // Inline function 'kotlin.text.isEmpty' call
  if (charSequenceLength(hint) === 0) {
    tmp = '';
  } else {
    tmp = '\n' + hint;
  }
  var hintMessage = tmp;
  throw JsonDecodingException_0(position, message + ' at path: ' + this.q15_1.h1a() + hintMessage, this.n1f());
};
protoOf(AbstractJsonLexer).u19 = function (message, position, hint, $super) {
  position = position === VOID ? this.p15_1 : position;
  hint = hint === VOID ? '' : hint;
  return $super === VOID ? this.t19(message, position, hint) : $super.t19.call(this, message, position, hint);
};
protoOf(AbstractJsonLexer).a1d = function () {
  var current = this.q1f();
  current = this.o1f(current);
  if (current >= charSequenceLength(this.n1f()) || current === -1) {
    this.u19('EOF');
  }
  var tmp;
  if (charSequenceGet(this.n1f(), current) === _Char___init__impl__6a9atx(34)) {
    current = current + 1 | 0;
    if (current === charSequenceLength(this.n1f())) {
      this.u19('EOF');
    }
    tmp = true;
  } else {
    tmp = false;
  }
  var hasQuotation = tmp;
  var accumulator = new Long(0, 0);
  var exponentAccumulator = new Long(0, 0);
  var isNegative = false;
  var isExponentPositive = false;
  var hasExponent = false;
  var start = current;
  $l$loop_4: while (!(current === charSequenceLength(this.n1f()))) {
    var ch = charSequenceGet(this.n1f(), current);
    if ((ch === _Char___init__impl__6a9atx(101) || ch === _Char___init__impl__6a9atx(69)) && !hasExponent) {
      if (current === start) {
        this.u19('Unexpected symbol ' + toString_1(ch) + ' in numeric literal');
      }
      isExponentPositive = true;
      hasExponent = true;
      current = current + 1 | 0;
      continue $l$loop_4;
    }
    if (ch === _Char___init__impl__6a9atx(45) && hasExponent) {
      if (current === start) {
        this.u19("Unexpected symbol '-' in numeric literal");
      }
      isExponentPositive = false;
      current = current + 1 | 0;
      continue $l$loop_4;
    }
    if (ch === _Char___init__impl__6a9atx(43) && hasExponent) {
      if (current === start) {
        this.u19("Unexpected symbol '+' in numeric literal");
      }
      isExponentPositive = true;
      current = current + 1 | 0;
      continue $l$loop_4;
    }
    if (ch === _Char___init__impl__6a9atx(45)) {
      if (!(current === start)) {
        this.u19("Unexpected symbol '-' in numeric literal");
      }
      isNegative = true;
      current = current + 1 | 0;
      continue $l$loop_4;
    }
    var token = charToTokenClass(ch);
    if (!(token === 0))
      break $l$loop_4;
    current = current + 1 | 0;
    var digit = Char__minus_impl_a2frrh(ch, _Char___init__impl__6a9atx(48));
    if (!(0 <= digit ? digit <= 9 : false)) {
      this.u19("Unexpected symbol '" + toString_1(ch) + "' in numeric literal");
    }
    if (hasExponent) {
      // Inline function 'kotlin.Long.times' call
      var this_0 = exponentAccumulator;
      // Inline function 'kotlin.Long.plus' call
      var this_1 = multiply(this_0, fromInt(10));
      exponentAccumulator = add(this_1, fromInt(digit));
      continue $l$loop_4;
    }
    // Inline function 'kotlin.Long.times' call
    var this_2 = accumulator;
    // Inline function 'kotlin.Long.minus' call
    var this_3 = multiply(this_2, fromInt(10));
    accumulator = subtract(this_3, fromInt(digit));
    if (compare(accumulator, new Long(0, 0)) > 0) {
      this.u19('Numeric value overflow');
    }
  }
  var hasChars = !(current === start);
  if (start === current || (isNegative && start === (current - 1 | 0))) {
    this.u19('Expected numeric literal');
  }
  if (hasQuotation) {
    if (!hasChars) {
      this.u19('EOF');
    }
    if (!(charSequenceGet(this.n1f(), current) === _Char___init__impl__6a9atx(34))) {
      this.u19('Expected closing quotation mark');
    }
    current = current + 1 | 0;
  }
  this.p15_1 = current;
  if (hasExponent) {
    var doubleAccumulator = toNumber(accumulator) * consumeNumericLiteral$calculateExponent(exponentAccumulator, isExponentPositive);
    if (doubleAccumulator > toNumber(new Long(-1, 2147483647)) || doubleAccumulator < toNumber(new Long(0, -2147483648))) {
      this.u19('Numeric value overflow');
    }
    // Inline function 'kotlin.math.floor' call
    if (!(Math.floor(doubleAccumulator) === doubleAccumulator)) {
      this.u19("Can't convert " + doubleAccumulator + ' to Long');
    }
    accumulator = numberToLong(doubleAccumulator);
  }
  var tmp_0;
  if (isNegative) {
    tmp_0 = accumulator;
  } else if (!equalsLong(accumulator, new Long(0, -2147483648))) {
    tmp_0 = negate(accumulator);
  } else {
    this.u19('Numeric value overflow');
  }
  return tmp_0;
};
protoOf(AbstractJsonLexer).s17 = function () {
  var result = this.a1d();
  var next = this.e1b();
  if (!(next === 10)) {
    // Inline function 'kotlinx.serialization.json.internal.AbstractJsonLexer.fail' call
    var expected = tokenDescription(10);
    var position = true ? this.p15_1 - 1 | 0 : this.p15_1;
    var s = this.p15_1 === charSequenceLength(this.n1f()) || position < 0 ? 'EOF' : toString_1(charSequenceGet(this.n1f(), position));
    var tmp$ret$0 = "Expected input to contain a single valid number, but got '" + s + "' after it";
    this.u19(tmp$ret$0, position);
  }
  return result;
};
protoOf(AbstractJsonLexer).z1c = function () {
  var current = this.q1f();
  if (current === charSequenceLength(this.n1f())) {
    this.u19('EOF');
  }
  var tmp;
  if (charSequenceGet(this.n1f(), current) === _Char___init__impl__6a9atx(34)) {
    current = current + 1 | 0;
    tmp = true;
  } else {
    tmp = false;
  }
  var hasQuotation = tmp;
  var result = consumeBoolean2(this, current);
  if (hasQuotation) {
    if (this.p15_1 === charSequenceLength(this.n1f())) {
      this.u19('EOF');
    }
    if (!(charSequenceGet(this.n1f(), this.p15_1) === _Char___init__impl__6a9atx(34))) {
      this.u19('Expected closing quotation mark');
    }
    this.p15_1 = this.p15_1 + 1 | 0;
  }
  return result;
};
function charToTokenClass(c) {
  var tmp;
  // Inline function 'kotlin.code' call
  if (Char__toInt_impl_vasixd(c) < 126) {
    var tmp_0 = CharMappings_getInstance().v1f_1;
    // Inline function 'kotlin.code' call
    tmp = tmp_0[Char__toInt_impl_vasixd(c)];
  } else {
    tmp = 0;
  }
  return tmp;
}
function tokenDescription(token) {
  return token === 1 ? "quotation mark '\"'" : token === 2 ? "string escape sequence '\\'" : token === 4 ? "comma ','" : token === 5 ? "colon ':'" : token === 6 ? "start of the object '{'" : token === 7 ? "end of the object '}'" : token === 8 ? "start of the array '['" : token === 9 ? "end of the array ']'" : token === 10 ? 'end of the input' : token === 127 ? 'invalid token' : 'valid token';
}
function escapeToChar(c) {
  return c < 117 ? CharMappings_getInstance().u1f_1[c] : _Char___init__impl__6a9atx(0);
}
function initEscape($this) {
  var inductionVariable = 0;
  if (inductionVariable <= 31)
    do {
      var i = inductionVariable;
      inductionVariable = inductionVariable + 1 | 0;
      initC2ESC($this, i, _Char___init__impl__6a9atx(117));
    }
     while (inductionVariable <= 31);
  initC2ESC($this, 8, _Char___init__impl__6a9atx(98));
  initC2ESC($this, 9, _Char___init__impl__6a9atx(116));
  initC2ESC($this, 10, _Char___init__impl__6a9atx(110));
  initC2ESC($this, 12, _Char___init__impl__6a9atx(102));
  initC2ESC($this, 13, _Char___init__impl__6a9atx(114));
  initC2ESC_0($this, _Char___init__impl__6a9atx(47), _Char___init__impl__6a9atx(47));
  initC2ESC_0($this, _Char___init__impl__6a9atx(34), _Char___init__impl__6a9atx(34));
  initC2ESC_0($this, _Char___init__impl__6a9atx(92), _Char___init__impl__6a9atx(92));
}
function initCharToToken($this) {
  var inductionVariable = 0;
  if (inductionVariable <= 32)
    do {
      var i = inductionVariable;
      inductionVariable = inductionVariable + 1 | 0;
      initC2TC($this, i, 127);
    }
     while (inductionVariable <= 32);
  initC2TC($this, 9, 3);
  initC2TC($this, 10, 3);
  initC2TC($this, 13, 3);
  initC2TC($this, 32, 3);
  initC2TC_0($this, _Char___init__impl__6a9atx(44), 4);
  initC2TC_0($this, _Char___init__impl__6a9atx(58), 5);
  initC2TC_0($this, _Char___init__impl__6a9atx(123), 6);
  initC2TC_0($this, _Char___init__impl__6a9atx(125), 7);
  initC2TC_0($this, _Char___init__impl__6a9atx(91), 8);
  initC2TC_0($this, _Char___init__impl__6a9atx(93), 9);
  initC2TC_0($this, _Char___init__impl__6a9atx(34), 1);
  initC2TC_0($this, _Char___init__impl__6a9atx(92), 2);
}
function initC2ESC($this, c, esc) {
  if (!(esc === _Char___init__impl__6a9atx(117))) {
    // Inline function 'kotlin.code' call
    var tmp$ret$0 = Char__toInt_impl_vasixd(esc);
    $this.u1f_1[tmp$ret$0] = numberToChar(c);
  }
}
function initC2ESC_0($this, c, esc) {
  // Inline function 'kotlin.code' call
  var tmp$ret$0 = Char__toInt_impl_vasixd(c);
  return initC2ESC($this, tmp$ret$0, esc);
}
function initC2TC($this, c, cl) {
  $this.v1f_1[c] = cl;
}
function initC2TC_0($this, c, cl) {
  // Inline function 'kotlin.code' call
  var tmp$ret$0 = Char__toInt_impl_vasixd(c);
  return initC2TC($this, tmp$ret$0, cl);
}
function CharMappings() {
  CharMappings_instance = this;
  this.u1f_1 = charArray(117);
  this.v1f_1 = new Int8Array(126);
  initEscape(this);
  initCharToToken(this);
}
var CharMappings_instance;
function CharMappings_getInstance() {
  if (CharMappings_instance == null)
    new CharMappings();
  return CharMappings_instance;
}
function StringJsonLexerWithComments(source) {
  StringJsonLexer.call(this, source);
}
protoOf(StringJsonLexerWithComments).e1b = function () {
  var source = this.n1f();
  var cpos = this.q1f();
  if (cpos >= source.length || cpos === -1)
    return 10;
  this.p15_1 = cpos + 1 | 0;
  return charToTokenClass(charCodeAt(source, cpos));
};
protoOf(StringJsonLexerWithComments).a1b = function () {
  var current = this.q1f();
  if (current >= this.n1f().length || current === -1)
    return false;
  return this.r1f(charCodeAt(this.n1f(), current));
};
protoOf(StringJsonLexerWithComments).l1c = function (expected) {
  var source = this.n1f();
  var current = this.q1f();
  if (current >= source.length || current === -1) {
    this.p15_1 = -1;
    this.s1f(expected);
  }
  var c = charCodeAt(source, current);
  this.p15_1 = current + 1 | 0;
  if (c === expected)
    return Unit_instance;
  else {
    this.s1f(expected);
  }
};
protoOf(StringJsonLexerWithComments).z1a = function () {
  var source = this.n1f();
  var cpos = this.q1f();
  if (cpos >= source.length || cpos === -1)
    return 10;
  this.p15_1 = cpos;
  return charToTokenClass(charCodeAt(source, cpos));
};
protoOf(StringJsonLexerWithComments).q1f = function () {
  var current = this.p15_1;
  if (current === -1)
    return current;
  var source = this.n1f();
  $l$loop_1: while (current < source.length) {
    var c = charCodeAt(source, current);
    // Inline function 'kotlinx.serialization.json.internal.AbstractJsonLexer.isWs' call
    if (c === _Char___init__impl__6a9atx(32) || c === _Char___init__impl__6a9atx(10) || c === _Char___init__impl__6a9atx(13) || c === _Char___init__impl__6a9atx(9)) {
      current = current + 1 | 0;
      continue $l$loop_1;
    }
    if (c === _Char___init__impl__6a9atx(47) && (current + 1 | 0) < source.length) {
      var tmp0_subject = charCodeAt(source, current + 1 | 0);
      if (tmp0_subject === _Char___init__impl__6a9atx(47)) {
        current = indexOf_0(source, _Char___init__impl__6a9atx(10), current + 2 | 0);
        if (current === -1) {
          current = source.length;
        } else {
          current = current + 1 | 0;
        }
        continue $l$loop_1;
      } else if (tmp0_subject === _Char___init__impl__6a9atx(42)) {
        current = indexOf(source, '*/', current + 2 | 0);
        if (current === -1) {
          this.p15_1 = source.length;
          this.u19('Expected end of the block comment: "*/", but had EOF instead');
        } else {
          current = current + 2 | 0;
        }
        continue $l$loop_1;
      }
    }
    break $l$loop_1;
  }
  this.p15_1 = current;
  return current;
};
function StringJsonLexer(source) {
  AbstractJsonLexer.call(this);
  this.f1g_1 = source;
}
protoOf(StringJsonLexer).n1f = function () {
  return this.f1g_1;
};
protoOf(StringJsonLexer).o1f = function (position) {
  return position < this.n1f().length ? position : -1;
};
protoOf(StringJsonLexer).e1b = function () {
  var source = this.n1f();
  var cpos = this.p15_1;
  $l$loop: while (!(cpos === -1) && cpos < source.length) {
    var _unary__edvuaz = cpos;
    cpos = _unary__edvuaz + 1 | 0;
    var c = charCodeAt(source, _unary__edvuaz);
    // Inline function 'kotlinx.serialization.json.internal.AbstractJsonLexer.isWs' call
    if (c === _Char___init__impl__6a9atx(32) || c === _Char___init__impl__6a9atx(10) || c === _Char___init__impl__6a9atx(13) || c === _Char___init__impl__6a9atx(9))
      continue $l$loop;
    this.p15_1 = cpos;
    return charToTokenClass(c);
  }
  this.p15_1 = source.length;
  return 10;
};
protoOf(StringJsonLexer).a1b = function () {
  var current = this.p15_1;
  if (current === -1)
    return false;
  var source = this.n1f();
  $l$loop: while (current < source.length) {
    var c = charCodeAt(source, current);
    // Inline function 'kotlinx.serialization.json.internal.AbstractJsonLexer.isWs' call
    if (c === _Char___init__impl__6a9atx(32) || c === _Char___init__impl__6a9atx(10) || c === _Char___init__impl__6a9atx(13) || c === _Char___init__impl__6a9atx(9)) {
      current = current + 1 | 0;
      continue $l$loop;
    }
    this.p15_1 = current;
    return this.r1f(c);
  }
  this.p15_1 = current;
  return false;
};
protoOf(StringJsonLexer).q1f = function () {
  var current = this.p15_1;
  if (current === -1)
    return current;
  var source = this.n1f();
  $l$loop: while (current < source.length) {
    var c = charCodeAt(source, current);
    // Inline function 'kotlinx.serialization.json.internal.AbstractJsonLexer.isWs' call
    if (c === _Char___init__impl__6a9atx(32) || c === _Char___init__impl__6a9atx(10) || c === _Char___init__impl__6a9atx(13) || c === _Char___init__impl__6a9atx(9)) {
      current = current + 1 | 0;
    } else {
      break $l$loop;
    }
  }
  this.p15_1 = current;
  return current;
};
protoOf(StringJsonLexer).l1c = function (expected) {
  if (this.p15_1 === -1) {
    this.s1f(expected);
  }
  var source = this.n1f();
  var cpos = this.p15_1;
  $l$loop: while (cpos < source.length) {
    var _unary__edvuaz = cpos;
    cpos = _unary__edvuaz + 1 | 0;
    var c = charCodeAt(source, _unary__edvuaz);
    // Inline function 'kotlinx.serialization.json.internal.AbstractJsonLexer.isWs' call
    if (c === _Char___init__impl__6a9atx(32) || c === _Char___init__impl__6a9atx(10) || c === _Char___init__impl__6a9atx(13) || c === _Char___init__impl__6a9atx(9))
      continue $l$loop;
    this.p15_1 = cpos;
    if (c === expected)
      return Unit_instance;
    this.s1f(expected);
  }
  this.p15_1 = -1;
  this.s1f(expected);
};
protoOf(StringJsonLexer).r1c = function () {
  this.l1c(_Char___init__impl__6a9atx(34));
  var current = this.p15_1;
  var closingQuote = indexOf_0(this.n1f(), _Char___init__impl__6a9atx(34), current);
  if (closingQuote === -1) {
    this.c1b();
    // Inline function 'kotlinx.serialization.json.internal.AbstractJsonLexer.fail' call
    var expected = tokenDescription(1);
    var position = false ? this.p15_1 - 1 | 0 : this.p15_1;
    var s = this.p15_1 === charSequenceLength(this.n1f()) || position < 0 ? 'EOF' : toString_1(charSequenceGet(this.n1f(), position));
    var tmp$ret$0 = 'Expected ' + expected + ", but had '" + s + "' instead";
    this.u19(tmp$ret$0, position);
  }
  var inductionVariable = current;
  if (inductionVariable < closingQuote)
    do {
      var i = inductionVariable;
      inductionVariable = inductionVariable + 1 | 0;
      if (charCodeAt(this.n1f(), i) === _Char___init__impl__6a9atx(92)) {
        return this.consumeString2(this.n1f(), this.p15_1, i);
      }
    }
     while (inductionVariable < closingQuote);
  this.p15_1 = closingQuote + 1 | 0;
  return substring(this.n1f(), current, closingQuote);
};
protoOf(StringJsonLexer).t1c = function (keyToMatch, isLenient) {
  var positionSnapshot = this.p15_1;
  try {
    if (!(this.e1b() === 6))
      return null;
    var firstKey = this.o1c(isLenient);
    if (!(firstKey === keyToMatch))
      return null;
    this.t1f();
    if (!(this.e1b() === 5))
      return null;
    return this.o1c(isLenient);
  }finally {
    this.p15_1 = positionSnapshot;
    this.t1f();
  }
};
function StringJsonLexer_0(json, source) {
  return !json.a15_1.c17_1 ? new StringJsonLexer(source) : new StringJsonLexerWithComments(source);
}
function get_schemaCache(_this__u8e3s4) {
  return _this__u8e3s4.c15_1;
}
function JsonToStringWriter() {
  this.f15_1 = StringBuilder_init_$Create$_0(128);
}
protoOf(JsonToStringWriter).y18 = function (value) {
  this.f15_1.kb(value);
};
protoOf(JsonToStringWriter).s18 = function (char) {
  this.f15_1.s7(char);
};
protoOf(JsonToStringWriter).u18 = function (text) {
  this.f15_1.r7(text);
};
protoOf(JsonToStringWriter).e19 = function (text) {
  printQuoted(this.f15_1, text);
};
protoOf(JsonToStringWriter).g15 = function () {
  this.f15_1.pb();
};
protoOf(JsonToStringWriter).toString = function () {
  return this.f15_1.toString();
};
function createMapForCache(initialCapacity) {
  return HashMap_init_$Create$(initialCapacity);
}
//region block: post-declaration
protoOf(defer$1).an = get_isNullable;
protoOf(defer$1).jn = get_isInline;
protoOf(defer$1).ln = get_annotations;
protoOf(JsonSerializersModuleValidator).t14 = contextual;
//endregion
//region block: init
Companion_instance = new Companion();
Companion_instance_0 = new Companion_0();
Companion_instance_1 = new Companion_1();
Companion_instance_2 = new Companion_2();
Tombstone_instance = new Tombstone();
//endregion
//region block: exports
export {
  Default_getInstance as Default_getInstance363hicrc7jsft,
  JsonNull_getInstance as JsonNull_getInstance2gh8fwl8w0wl7,
  JsonArray as JsonArray2urf8ey7u44sd,
  JsonElement as JsonElementf07o4p6p57al,
  JsonObject as JsonObjectee06ihoeeiqj,
  JsonPrimitive_0 as JsonPrimitiveolttw629wj53,
  JsonPrimitive_1 as JsonPrimitive2fp8648nd60dn,
  JsonPrimitive_2 as JsonPrimitive1xkjzc5d7ihuv,
  JsonPrimitive as JsonPrimitive3ttzjh2ft5dnx,
  Json_0 as Jsonsmkyu9xjl7fv,
};
//endregion

//# sourceMappingURL=kotlinx-serialization-kotlinx-serialization-json.mjs.map
