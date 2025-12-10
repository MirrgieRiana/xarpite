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
  this.t14_1 = configuration;
  this.u14_1 = serializersModule;
  this.v14_1 = new DescriptorSchemaCache();
}
protoOf(Json).ep = function () {
  return this.u14_1;
};
protoOf(Json).w14 = function (serializer, value) {
  var result = new JsonToStringWriter();
  try {
    encodeByWriter(this, result, serializer, value);
    return result.toString();
  }finally {
    result.z14();
  }
};
protoOf(Json).x14 = function (deserializer, string) {
  var lexer = StringJsonLexer_0(this, string);
  var input = new StreamingJsonDecoder(this, WriteMode_OBJ_getInstance(), lexer, deserializer.tl(), null);
  var result = input.po(deserializer);
  lexer.m15();
  return result;
};
function Json_0(from, builderAction) {
  from = from === VOID ? Default_getInstance() : from;
  var builder = new JsonBuilder(from);
  builderAction(builder);
  var conf = builder.f16();
  return new JsonImpl(conf, builder.e16_1);
}
function JsonBuilder(json) {
  this.n15_1 = json.t14_1.g16_1;
  this.o15_1 = json.t14_1.l16_1;
  this.p15_1 = json.t14_1.h16_1;
  this.q15_1 = json.t14_1.i16_1;
  this.r15_1 = json.t14_1.k16_1;
  this.s15_1 = json.t14_1.m16_1;
  this.t15_1 = json.t14_1.n16_1;
  this.u15_1 = json.t14_1.p16_1;
  this.v15_1 = json.t14_1.w16_1;
  this.w15_1 = json.t14_1.r16_1;
  this.x15_1 = json.t14_1.s16_1;
  this.y15_1 = json.t14_1.t16_1;
  this.z15_1 = json.t14_1.u16_1;
  this.a16_1 = json.t14_1.v16_1;
  this.b16_1 = json.t14_1.q16_1;
  this.c16_1 = json.t14_1.j16_1;
  this.d16_1 = json.t14_1.o16_1;
  this.e16_1 = json.ep();
}
protoOf(JsonBuilder).f16 = function () {
  if (this.d16_1) {
    // Inline function 'kotlin.require' call
    if (!(this.u15_1 === 'type')) {
      var message = 'Class discriminator should not be specified when array polymorphism is specified';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    // Inline function 'kotlin.require' call
    if (!this.v15_1.equals(ClassDiscriminatorMode_POLYMORPHIC_getInstance())) {
      var message_0 = 'useArrayPolymorphism option can only be used if classDiscriminatorMode in a default POLYMORPHIC state.';
      throw IllegalArgumentException_init_$Create$(toString(message_0));
    }
  }
  if (!this.r15_1) {
    // Inline function 'kotlin.require' call
    if (!(this.s15_1 === '    ')) {
      var message_1 = 'Indent should not be specified when default printing mode is used';
      throw IllegalArgumentException_init_$Create$(toString(message_1));
    }
  } else if (!(this.s15_1 === '    ')) {
    var tmp0 = this.s15_1;
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
      var message_2 = 'Only whitespace, tab, newline and carriage return are allowed as pretty print symbols. Had ' + this.s15_1;
      throw IllegalArgumentException_init_$Create$(toString(message_2));
    }
  }
  return new JsonConfiguration(this.n15_1, this.p15_1, this.q15_1, this.c16_1, this.r15_1, this.o15_1, this.s15_1, this.t15_1, this.d16_1, this.u15_1, this.b16_1, this.w15_1, this.x15_1, this.y15_1, this.z15_1, this.a16_1, this.v15_1);
};
function validateConfiguration($this) {
  if (equals($this.ep(), EmptySerializersModule()))
    return Unit_instance;
  var collector = new JsonSerializersModuleValidator($this.t14_1);
  $this.ep().b14(collector);
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
  this.g16_1 = encodeDefaults;
  this.h16_1 = ignoreUnknownKeys;
  this.i16_1 = isLenient;
  this.j16_1 = allowStructuredMapKeys;
  this.k16_1 = prettyPrint;
  this.l16_1 = explicitNulls;
  this.m16_1 = prettyPrintIndent;
  this.n16_1 = coerceInputValues;
  this.o16_1 = useArrayPolymorphism;
  this.p16_1 = classDiscriminator;
  this.q16_1 = allowSpecialFloatingPointValues;
  this.r16_1 = useAlternativeNames;
  this.s16_1 = namingStrategy;
  this.t16_1 = decodeEnumsCaseInsensitive;
  this.u16_1 = allowTrailingComma;
  this.v16_1 = allowComments;
  this.w16_1 = classDiscriminatorMode;
}
protoOf(JsonConfiguration).toString = function () {
  return 'JsonConfiguration(encodeDefaults=' + this.g16_1 + ', ignoreUnknownKeys=' + this.h16_1 + ', isLenient=' + this.i16_1 + ', ' + ('allowStructuredMapKeys=' + this.j16_1 + ', prettyPrint=' + this.k16_1 + ', explicitNulls=' + this.l16_1 + ', ') + ("prettyPrintIndent='" + this.m16_1 + "', coerceInputValues=" + this.n16_1 + ', useArrayPolymorphism=' + this.o16_1 + ', ') + ("classDiscriminator='" + this.p16_1 + "', allowSpecialFloatingPointValues=" + this.q16_1 + ', ') + ('useAlternativeNames=' + this.r16_1 + ', namingStrategy=' + toString_0(this.s16_1) + ', decodeEnumsCaseInsensitive=' + this.t16_1 + ', ') + ('allowTrailingComma=' + this.u16_1 + ', allowComments=' + this.v16_1 + ', classDiscriminatorMode=' + this.w16_1.toString() + ')');
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
  return this.a17();
};
function Companion_1() {
}
var Companion_instance_1;
function Companion_getInstance_5() {
  return Companion_instance_1;
}
function JsonObject$toString$lambda(_destruct__k2r9zo) {
  // Inline function 'kotlin.collections.component1' call
  var k = _destruct__k2r9zo.k2();
  // Inline function 'kotlin.collections.component2' call
  var v = _destruct__k2r9zo.l2();
  // Inline function 'kotlin.text.buildString' call
  // Inline function 'kotlin.apply' call
  var this_0 = StringBuilder_init_$Create$();
  printQuoted(this_0, k);
  this_0.r7(_Char___init__impl__6a9atx(58));
  this_0.p7(v);
  return this_0.toString();
}
function JsonObject(content) {
  JsonElement.call(this);
  this.b17_1 = content;
}
protoOf(JsonObject).equals = function (other) {
  return equals(this.b17_1, other);
};
protoOf(JsonObject).hashCode = function () {
  return hashCode(this.b17_1);
};
protoOf(JsonObject).toString = function () {
  var tmp = this.b17_1.g2();
  return joinToString(tmp, ',', '{', '}', VOID, VOID, JsonObject$toString$lambda);
};
protoOf(JsonObject).n = function () {
  return this.b17_1.n();
};
protoOf(JsonObject).c17 = function (key) {
  return this.b17_1.h2(key);
};
protoOf(JsonObject).h2 = function (key) {
  if (!(!(key == null) ? typeof key === 'string' : false))
    return false;
  return this.c17((!(key == null) ? typeof key === 'string' : false) ? key : THROW_CCE());
};
protoOf(JsonObject).d17 = function (key) {
  return this.b17_1.j2(key);
};
protoOf(JsonObject).j2 = function (key) {
  if (!(!(key == null) ? typeof key === 'string' : false))
    return null;
  return this.d17((!(key == null) ? typeof key === 'string' : false) ? key : THROW_CCE());
};
protoOf(JsonObject).t = function () {
  return this.b17_1.t();
};
protoOf(JsonObject).e2 = function () {
  return this.b17_1.e2();
};
protoOf(JsonObject).f2 = function () {
  return this.b17_1.f2();
};
protoOf(JsonObject).g2 = function () {
  return this.b17_1.g2();
};
function Companion_2() {
}
var Companion_instance_2;
function Companion_getInstance_6() {
  return Companion_instance_2;
}
function JsonArray(content) {
  JsonElement.call(this);
  this.e17_1 = content;
}
protoOf(JsonArray).equals = function (other) {
  return equals(this.e17_1, other);
};
protoOf(JsonArray).hashCode = function () {
  return hashCode(this.e17_1);
};
protoOf(JsonArray).toString = function () {
  return joinToString(this.e17_1, ',', '[', ']');
};
protoOf(JsonArray).n = function () {
  return this.e17_1.n();
};
protoOf(JsonArray).f17 = function (element) {
  return this.e17_1.w1(element);
};
protoOf(JsonArray).w1 = function (element) {
  if (!(element instanceof JsonElement))
    return false;
  return this.f17(element instanceof JsonElement ? element : THROW_CCE());
};
protoOf(JsonArray).q = function () {
  return this.e17_1.q();
};
protoOf(JsonArray).v = function (index) {
  return this.e17_1.v(index);
};
protoOf(JsonArray).x1 = function (index) {
  return this.e17_1.x1(index);
};
protoOf(JsonArray).y1 = function (fromIndex, toIndex) {
  return this.e17_1.y1(fromIndex, toIndex);
};
protoOf(JsonArray).t = function () {
  return this.e17_1.t();
};
function JsonNull() {
  JsonNull_instance = this;
  JsonPrimitive.call(this);
  this.g17_1 = 'null';
}
protoOf(JsonNull).z16 = function () {
  return false;
};
protoOf(JsonNull).a17 = function () {
  return this.g17_1;
};
protoOf(JsonNull).h17 = function () {
  return JsonNullSerializer_getInstance();
};
protoOf(JsonNull).jw = function (typeParamsSerializers) {
  return this.h17();
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
  this.i17_1 = isString;
  this.j17_1 = coerceToInlineType;
  this.k17_1 = toString(body);
  if (!(this.j17_1 == null)) {
    // Inline function 'kotlin.require' call
    // Inline function 'kotlin.require' call
    if (!this.j17_1.cn()) {
      var message = 'Failed requirement.';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
  }
}
protoOf(JsonLiteral).z16 = function () {
  return this.i17_1;
};
protoOf(JsonLiteral).a17 = function () {
  return this.k17_1;
};
protoOf(JsonLiteral).toString = function () {
  var tmp;
  if (this.i17_1) {
    // Inline function 'kotlin.text.buildString' call
    // Inline function 'kotlin.apply' call
    var this_0 = StringBuilder_init_$Create$();
    printQuoted(this_0, this.k17_1);
    tmp = this_0.toString();
  } else {
    tmp = this.k17_1;
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
  if (!(this.i17_1 === other.i17_1))
    return false;
  if (!(this.k17_1 === other.k17_1))
    return false;
  return true;
};
protoOf(JsonLiteral).hashCode = function () {
  var result = getBooleanHashCode(this.i17_1);
  result = imul(31, result) + getStringHashCode(this.k17_1) | 0;
  return result;
};
function get_booleanOrNull(_this__u8e3s4) {
  _init_properties_JsonElement_kt__7cbdc2();
  return toBooleanStrictOrNull_0(_this__u8e3s4.a17());
}
function parseLongImpl(_this__u8e3s4) {
  _init_properties_JsonElement_kt__7cbdc2();
  return (new StringJsonLexer(_this__u8e3s4.a17())).l17();
}
function get_float(_this__u8e3s4) {
  _init_properties_JsonElement_kt__7cbdc2();
  // Inline function 'kotlin.text.toFloat' call
  var this_0 = _this__u8e3s4.a17();
  // Inline function 'kotlin.js.unsafeCast' call
  // Inline function 'kotlin.js.asDynamic' call
  return toDouble(this_0);
}
function get_double(_this__u8e3s4) {
  _init_properties_JsonElement_kt__7cbdc2();
  return toDouble(_this__u8e3s4.a17());
}
function get_contentOrNull(_this__u8e3s4) {
  _init_properties_JsonElement_kt__7cbdc2();
  var tmp;
  if (_this__u8e3s4 instanceof JsonNull) {
    tmp = null;
  } else {
    tmp = _this__u8e3s4.a17();
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
  $this$buildSerialDescriptor.hm('JsonPrimitive', defer(JsonElementSerializer$descriptor$lambda$lambda));
  $this$buildSerialDescriptor.hm('JsonNull', defer(JsonElementSerializer$descriptor$lambda$lambda_0));
  $this$buildSerialDescriptor.hm('JsonLiteral', defer(JsonElementSerializer$descriptor$lambda$lambda_1));
  $this$buildSerialDescriptor.hm('JsonObject', defer(JsonElementSerializer$descriptor$lambda$lambda_2));
  $this$buildSerialDescriptor.hm('JsonArray', defer(JsonElementSerializer$descriptor$lambda$lambda_3));
  return Unit_instance;
}
function JsonElementSerializer$descriptor$lambda$lambda() {
  return JsonPrimitiveSerializer_getInstance().m17_1;
}
function JsonElementSerializer$descriptor$lambda$lambda_0() {
  return JsonNullSerializer_getInstance().n17_1;
}
function JsonElementSerializer$descriptor$lambda$lambda_1() {
  return JsonLiteralSerializer_getInstance().o17_1;
}
function JsonElementSerializer$descriptor$lambda$lambda_2() {
  return JsonObjectSerializer_getInstance().p17_1;
}
function JsonElementSerializer$descriptor$lambda$lambda_3() {
  return JsonArraySerializer_getInstance().q17_1;
}
function JsonElementSerializer() {
  JsonElementSerializer_instance = this;
  var tmp = this;
  var tmp_0 = SEALED_getInstance();
  tmp.r17_1 = buildSerialDescriptor('kotlinx.serialization.json.JsonElement', tmp_0, [], JsonElementSerializer$descriptor$lambda);
}
protoOf(JsonElementSerializer).tl = function () {
  return this.r17_1;
};
protoOf(JsonElementSerializer).s17 = function (encoder, value) {
  verify(encoder);
  if (value instanceof JsonPrimitive) {
    encoder.gq(JsonPrimitiveSerializer_getInstance(), value);
  } else {
    if (value instanceof JsonObject) {
      encoder.gq(JsonObjectSerializer_getInstance(), value);
    } else {
      if (value instanceof JsonArray) {
        encoder.gq(JsonArraySerializer_getInstance(), value);
      } else {
        noWhenBranchMatchedException();
      }
    }
  }
};
protoOf(JsonElementSerializer).ul = function (encoder, value) {
  return this.s17(encoder, value instanceof JsonElement ? value : THROW_CCE());
};
protoOf(JsonElementSerializer).vl = function (decoder) {
  var input = asJsonDecoder(decoder);
  return input.y16();
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
  this.m17_1 = buildSerialDescriptor('kotlinx.serialization.json.JsonPrimitive', STRING_getInstance(), []);
}
protoOf(JsonPrimitiveSerializer).tl = function () {
  return this.m17_1;
};
protoOf(JsonPrimitiveSerializer).t17 = function (encoder, value) {
  verify(encoder);
  var tmp;
  if (value instanceof JsonNull) {
    encoder.gq(JsonNullSerializer_getInstance(), JsonNull_getInstance());
    tmp = Unit_instance;
  } else {
    var tmp_0 = JsonLiteralSerializer_getInstance();
    encoder.gq(tmp_0, value instanceof JsonLiteral ? value : THROW_CCE());
    tmp = Unit_instance;
  }
  return tmp;
};
protoOf(JsonPrimitiveSerializer).ul = function (encoder, value) {
  return this.t17(encoder, value instanceof JsonPrimitive ? value : THROW_CCE());
};
protoOf(JsonPrimitiveSerializer).vl = function (decoder) {
  var result = asJsonDecoder(decoder).y16();
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
  this.n17_1 = buildSerialDescriptor('kotlinx.serialization.json.JsonNull', ENUM_getInstance(), []);
}
protoOf(JsonNullSerializer).tl = function () {
  return this.n17_1;
};
protoOf(JsonNullSerializer).u17 = function (encoder, value) {
  verify(encoder);
  encoder.kp();
};
protoOf(JsonNullSerializer).ul = function (encoder, value) {
  return this.u17(encoder, value instanceof JsonNull ? value : THROW_CCE());
};
protoOf(JsonNullSerializer).vl = function (decoder) {
  verify_0(decoder);
  if (decoder.co()) {
    throw new JsonDecodingException("Expected 'null' literal");
  }
  decoder.do();
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
  this.o17_1 = PrimitiveSerialDescriptor('kotlinx.serialization.json.JsonLiteral', STRING_getInstance());
}
protoOf(JsonLiteralSerializer).tl = function () {
  return this.o17_1;
};
protoOf(JsonLiteralSerializer).v17 = function (encoder, value) {
  verify(encoder);
  if (value.i17_1) {
    return encoder.tp(value.k17_1);
  }
  if (!(value.j17_1 == null)) {
    return encoder.up(value.j17_1).tp(value.k17_1);
  }
  var tmp0_safe_receiver = toLongOrNull(value.k17_1);
  if (tmp0_safe_receiver == null)
    null;
  else {
    // Inline function 'kotlin.let' call
    return encoder.pp(tmp0_safe_receiver);
  }
  var tmp1_safe_receiver = toULongOrNull(value.k17_1);
  var tmp = tmp1_safe_receiver;
  if ((tmp == null ? null : new ULong(tmp)) == null)
    null;
  else {
    var tmp_0 = tmp1_safe_receiver;
    // Inline function 'kotlin.let' call
    var it = (tmp_0 == null ? null : new ULong(tmp_0)).i1_1;
    var tmp_1 = encoder.up(serializer_0(Companion_getInstance()).tl());
    // Inline function 'kotlin.ULong.toLong' call
    var tmp$ret$1 = _ULong___get_data__impl__fggpzb(it);
    tmp_1.pp(tmp$ret$1);
    return Unit_instance;
  }
  var tmp2_safe_receiver = toDoubleOrNull(value.k17_1);
  if (tmp2_safe_receiver == null)
    null;
  else {
    // Inline function 'kotlin.let' call
    return encoder.rp(tmp2_safe_receiver);
  }
  var tmp3_safe_receiver = toBooleanStrictOrNull(value.k17_1);
  if (tmp3_safe_receiver == null)
    null;
  else {
    // Inline function 'kotlin.let' call
    return encoder.lp(tmp3_safe_receiver);
  }
  encoder.tp(value.k17_1);
};
protoOf(JsonLiteralSerializer).ul = function (encoder, value) {
  return this.v17(encoder, value instanceof JsonLiteral ? value : THROW_CCE());
};
protoOf(JsonLiteralSerializer).vl = function (decoder) {
  var result = asJsonDecoder(decoder).y16();
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
  this.w17_1 = MapSerializer(serializer(StringCompanionObject_instance), JsonElementSerializer_getInstance()).tl();
  this.x17_1 = 'kotlinx.serialization.json.JsonObject';
}
protoOf(JsonObjectDescriptor).an = function () {
  return this.x17_1;
};
protoOf(JsonObjectDescriptor).fn = function (index) {
  return this.w17_1.fn(index);
};
protoOf(JsonObjectDescriptor).gn = function (name) {
  return this.w17_1.gn(name);
};
protoOf(JsonObjectDescriptor).hn = function (index) {
  return this.w17_1.hn(index);
};
protoOf(JsonObjectDescriptor).in = function (index) {
  return this.w17_1.in(index);
};
protoOf(JsonObjectDescriptor).jn = function (index) {
  return this.w17_1.jn(index);
};
protoOf(JsonObjectDescriptor).bn = function () {
  return this.w17_1.bn();
};
protoOf(JsonObjectDescriptor).tm = function () {
  return this.w17_1.tm();
};
protoOf(JsonObjectDescriptor).cn = function () {
  return this.w17_1.cn();
};
protoOf(JsonObjectDescriptor).dn = function () {
  return this.w17_1.dn();
};
protoOf(JsonObjectDescriptor).en = function () {
  return this.w17_1.en();
};
var JsonObjectDescriptor_instance;
function JsonObjectDescriptor_getInstance() {
  if (JsonObjectDescriptor_instance == null)
    new JsonObjectDescriptor();
  return JsonObjectDescriptor_instance;
}
function JsonObjectSerializer() {
  JsonObjectSerializer_instance = this;
  this.p17_1 = JsonObjectDescriptor_getInstance();
}
protoOf(JsonObjectSerializer).tl = function () {
  return this.p17_1;
};
protoOf(JsonObjectSerializer).y17 = function (encoder, value) {
  verify(encoder);
  MapSerializer(serializer(StringCompanionObject_instance), JsonElementSerializer_getInstance()).ul(encoder, value);
};
protoOf(JsonObjectSerializer).ul = function (encoder, value) {
  return this.y17(encoder, value instanceof JsonObject ? value : THROW_CCE());
};
protoOf(JsonObjectSerializer).vl = function (decoder) {
  verify_0(decoder);
  return new JsonObject(MapSerializer(serializer(StringCompanionObject_instance), JsonElementSerializer_getInstance()).vl(decoder));
};
var JsonObjectSerializer_instance;
function JsonObjectSerializer_getInstance() {
  if (JsonObjectSerializer_instance == null)
    new JsonObjectSerializer();
  return JsonObjectSerializer_instance;
}
function JsonArrayDescriptor() {
  JsonArrayDescriptor_instance = this;
  this.z17_1 = ListSerializer(JsonElementSerializer_getInstance()).tl();
  this.a18_1 = 'kotlinx.serialization.json.JsonArray';
}
protoOf(JsonArrayDescriptor).an = function () {
  return this.a18_1;
};
protoOf(JsonArrayDescriptor).fn = function (index) {
  return this.z17_1.fn(index);
};
protoOf(JsonArrayDescriptor).gn = function (name) {
  return this.z17_1.gn(name);
};
protoOf(JsonArrayDescriptor).hn = function (index) {
  return this.z17_1.hn(index);
};
protoOf(JsonArrayDescriptor).in = function (index) {
  return this.z17_1.in(index);
};
protoOf(JsonArrayDescriptor).jn = function (index) {
  return this.z17_1.jn(index);
};
protoOf(JsonArrayDescriptor).bn = function () {
  return this.z17_1.bn();
};
protoOf(JsonArrayDescriptor).tm = function () {
  return this.z17_1.tm();
};
protoOf(JsonArrayDescriptor).cn = function () {
  return this.z17_1.cn();
};
protoOf(JsonArrayDescriptor).dn = function () {
  return this.z17_1.dn();
};
protoOf(JsonArrayDescriptor).en = function () {
  return this.z17_1.en();
};
var JsonArrayDescriptor_instance;
function JsonArrayDescriptor_getInstance() {
  if (JsonArrayDescriptor_instance == null)
    new JsonArrayDescriptor();
  return JsonArrayDescriptor_instance;
}
function JsonArraySerializer() {
  JsonArraySerializer_instance = this;
  this.q17_1 = JsonArrayDescriptor_getInstance();
}
protoOf(JsonArraySerializer).tl = function () {
  return this.q17_1;
};
protoOf(JsonArraySerializer).b18 = function (encoder, value) {
  verify(encoder);
  ListSerializer(JsonElementSerializer_getInstance()).ul(encoder, value);
};
protoOf(JsonArraySerializer).ul = function (encoder, value) {
  return this.b18(encoder, value instanceof JsonArray ? value : THROW_CCE());
};
protoOf(JsonArraySerializer).vl = function (decoder) {
  verify_0(decoder);
  return new JsonArray(ListSerializer(JsonElementSerializer_getInstance()).vl(decoder));
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
  var tmp0 = $this.c18_1;
  var tmp = KProperty1;
  // Inline function 'kotlin.getValue' call
  getPropertyCallableRef('original', 1, tmp, defer$o$_get_original_$ref_3cje7k(), null);
  return tmp0.l2();
}
function defer$o$_get_original_$ref_3cje7k() {
  return function (p0) {
    return _get_original__l7ku1m(p0);
  };
}
function defer$1($deferred) {
  this.c18_1 = lazy($deferred);
}
protoOf(defer$1).an = function () {
  return _get_original__l7ku1m(this).an();
};
protoOf(defer$1).bn = function () {
  return _get_original__l7ku1m(this).bn();
};
protoOf(defer$1).dn = function () {
  return _get_original__l7ku1m(this).dn();
};
protoOf(defer$1).fn = function (index) {
  return _get_original__l7ku1m(this).fn(index);
};
protoOf(defer$1).gn = function (name) {
  return _get_original__l7ku1m(this).gn(name);
};
protoOf(defer$1).hn = function (index) {
  return _get_original__l7ku1m(this).hn(index);
};
protoOf(defer$1).in = function (index) {
  return _get_original__l7ku1m(this).in(index);
};
protoOf(defer$1).jn = function (index) {
  return _get_original__l7ku1m(this).jn(index);
};
function JsonEncoder() {
}
function Composer(writer) {
  this.d18_1 = writer;
  this.e18_1 = true;
}
protoOf(Composer).f18 = function () {
  this.e18_1 = true;
};
protoOf(Composer).g18 = function () {
  return Unit_instance;
};
protoOf(Composer).h18 = function () {
  this.e18_1 = false;
};
protoOf(Composer).i18 = function () {
  this.e18_1 = false;
};
protoOf(Composer).j18 = function () {
  return Unit_instance;
};
protoOf(Composer).k18 = function (v) {
  return this.d18_1.l18(v);
};
protoOf(Composer).m18 = function (v) {
  return this.d18_1.n18(v);
};
protoOf(Composer).o18 = function (v) {
  return this.d18_1.n18(v.toString());
};
protoOf(Composer).p18 = function (v) {
  return this.d18_1.n18(v.toString());
};
protoOf(Composer).q18 = function (v) {
  return this.d18_1.r18(fromInt(v));
};
protoOf(Composer).s18 = function (v) {
  return this.d18_1.r18(fromInt(v));
};
protoOf(Composer).t18 = function (v) {
  return this.d18_1.r18(fromInt(v));
};
protoOf(Composer).u18 = function (v) {
  return this.d18_1.r18(v);
};
protoOf(Composer).v18 = function (v) {
  return this.d18_1.n18(v.toString());
};
protoOf(Composer).w18 = function (value) {
  return this.d18_1.x18(value);
};
function Composer_0(sb, json) {
  return json.t14_1.k16_1 ? new ComposerWithPrettyPrint(sb, json) : new Composer(sb);
}
function ComposerForUnsignedNumbers(writer, forceQuoting) {
  Composer.call(this, writer);
  this.a19_1 = forceQuoting;
}
protoOf(ComposerForUnsignedNumbers).t18 = function (v) {
  if (this.a19_1) {
    // Inline function 'kotlin.toUInt' call
    var tmp$ret$0 = _UInt___init__impl__l7qpdl(v);
    this.w18(UInt__toString_impl_dbgl21(tmp$ret$0));
  } else {
    // Inline function 'kotlin.toUInt' call
    var tmp$ret$1 = _UInt___init__impl__l7qpdl(v);
    this.m18(UInt__toString_impl_dbgl21(tmp$ret$1));
  }
};
protoOf(ComposerForUnsignedNumbers).u18 = function (v) {
  if (this.a19_1) {
    // Inline function 'kotlin.toULong' call
    var tmp$ret$0 = _ULong___init__impl__c78o9k(v);
    this.w18(ULong__toString_impl_f9au7k(tmp$ret$0));
  } else {
    // Inline function 'kotlin.toULong' call
    var tmp$ret$1 = _ULong___init__impl__c78o9k(v);
    this.m18(ULong__toString_impl_f9au7k(tmp$ret$1));
  }
};
protoOf(ComposerForUnsignedNumbers).q18 = function (v) {
  if (this.a19_1) {
    // Inline function 'kotlin.toUByte' call
    var tmp$ret$0 = _UByte___init__impl__g9hnc4(v);
    this.w18(UByte__toString_impl_v72jg(tmp$ret$0));
  } else {
    // Inline function 'kotlin.toUByte' call
    var tmp$ret$1 = _UByte___init__impl__g9hnc4(v);
    this.m18(UByte__toString_impl_v72jg(tmp$ret$1));
  }
};
protoOf(ComposerForUnsignedNumbers).s18 = function (v) {
  if (this.a19_1) {
    // Inline function 'kotlin.toUShort' call
    var tmp$ret$0 = _UShort___init__impl__jigrne(v);
    this.w18(UShort__toString_impl_edaoee(tmp$ret$0));
  } else {
    // Inline function 'kotlin.toUShort' call
    var tmp$ret$1 = _UShort___init__impl__jigrne(v);
    this.m18(UShort__toString_impl_edaoee(tmp$ret$1));
  }
};
function ComposerForUnquotedLiterals(writer, forceQuoting) {
  Composer.call(this, writer);
  this.d19_1 = forceQuoting;
}
protoOf(ComposerForUnquotedLiterals).w18 = function (value) {
  if (this.d19_1) {
    protoOf(Composer).w18.call(this, value);
  } else {
    protoOf(Composer).m18.call(this, value);
  }
};
function ComposerWithPrettyPrint(writer, json) {
  Composer.call(this, writer);
  this.g19_1 = json;
  this.h19_1 = 0;
}
protoOf(ComposerWithPrettyPrint).f18 = function () {
  this.e18_1 = true;
  this.h19_1 = this.h19_1 + 1 | 0;
};
protoOf(ComposerWithPrettyPrint).g18 = function () {
  this.h19_1 = this.h19_1 - 1 | 0;
};
protoOf(ComposerWithPrettyPrint).h18 = function () {
  this.e18_1 = false;
  this.m18('\n');
  // Inline function 'kotlin.repeat' call
  var times = this.h19_1;
  var inductionVariable = 0;
  if (inductionVariable < times)
    do {
      var index = inductionVariable;
      inductionVariable = inductionVariable + 1 | 0;
      this.m18(this.g19_1.t14_1.m16_1);
    }
     while (inductionVariable < times);
};
protoOf(ComposerWithPrettyPrint).i18 = function () {
  if (this.e18_1)
    this.e18_1 = false;
  else {
    this.h18();
  }
};
protoOf(ComposerWithPrettyPrint).j18 = function () {
  this.k18(_Char___init__impl__6a9atx(32));
};
function readIfAbsent($this, descriptor, index) {
  $this.j19_1 = (!descriptor.jn(index) && descriptor.in(index).tm());
  return $this.j19_1;
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
  tmp.i19_1 = new ElementMarker(descriptor, JsonElementMarker$readIfAbsent$ref(this));
  this.j19_1 = false;
}
protoOf(JsonElementMarker).k19 = function (index) {
  this.i19_1.tu(index);
};
protoOf(JsonElementMarker).l19 = function () {
  return this.i19_1.uu();
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
  _this__u8e3s4.m19('Trailing comma before the end of JSON ' + entity, _this__u8e3s4.i15_1 - 1 | 0, "Trailing commas are non-complaint JSON and not allowed by default. Use 'allowTrailingComma = true' in 'Json {}' builder to support them.");
}
function throwInvalidFloatingPointDecoded(_this__u8e3s4, result) {
  _this__u8e3s4.n19('Unexpected special floating-point value ' + toString(result) + '. By default, ' + 'non-finite floating point values are prohibited because they do not conform JSON specification', VOID, "It is possible to deserialize them using 'JsonBuilder.allowSpecialFloatingPointValues = true'");
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
  return new JsonEncodingException("Value of type '" + keyDescriptor.an() + "' can't be used in JSON as a key in the map. " + ("It should have either primitive or enum kind, but its kind is '" + keyDescriptor.bn().toString() + "'.\n") + "Use 'allowStructuredMapKeys = true' in 'Json {}' builder to convert such maps to [key1, value1, key2, value2,...] arrays.");
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
  if (json.t14_1.h16_1) {
    tmp = true;
  } else {
    var tmp0 = _this__u8e3s4.en();
    var tmp$ret$0;
    $l$block_0: {
      // Inline function 'kotlin.collections.any' call
      var tmp_0;
      if (isInterface(tmp0, Collection)) {
        tmp_0 = tmp0.n();
      } else {
        tmp_0 = false;
      }
      if (tmp_0) {
        tmp$ret$0 = false;
        break $l$block_0;
      }
      var _iterator__ex2g4s = tmp0.q();
      while (_iterator__ex2g4s.r()) {
        var element = _iterator__ex2g4s.s();
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
  var index = _this__u8e3s4.gn(name);
  if (!(index === -3))
    return index;
  if (!json.t14_1.r16_1)
    return index;
  return getJsonNameIndexSlowPath(_this__u8e3s4, json, name);
}
function getJsonElementName(_this__u8e3s4, json, index) {
  _init_properties_JsonNamesMap_kt__cbbp0k();
  var strategy = namingStrategy(_this__u8e3s4, json);
  return strategy == null ? _this__u8e3s4.fn(index) : serializationNamesIndices(_this__u8e3s4, json, strategy)[index];
}
function namingStrategy(_this__u8e3s4, json) {
  _init_properties_JsonNamesMap_kt__cbbp0k();
  return equals(_this__u8e3s4.bn(), CLASS_getInstance()) ? json.t14_1.s16_1 : null;
}
function deserializationNamesMap(_this__u8e3s4, descriptor) {
  _init_properties_JsonNamesMap_kt__cbbp0k();
  var tmp = get_schemaCache(_this__u8e3s4);
  var tmp_0 = get_JsonDeserializationNamesKey();
  return tmp.p19(descriptor, tmp_0, deserializationNamesMap$lambda(descriptor, _this__u8e3s4));
}
function decodeCaseInsensitive(_this__u8e3s4, descriptor) {
  _init_properties_JsonNamesMap_kt__cbbp0k();
  return _this__u8e3s4.t14_1.t16_1 && equals(descriptor.bn(), ENUM_getInstance());
}
function getJsonNameIndexSlowPath(_this__u8e3s4, json, name) {
  _init_properties_JsonNamesMap_kt__cbbp0k();
  var tmp0_elvis_lhs = deserializationNamesMap(json, _this__u8e3s4).j2(name);
  return tmp0_elvis_lhs == null ? -3 : tmp0_elvis_lhs;
}
function serializationNamesIndices(_this__u8e3s4, json, strategy) {
  _init_properties_JsonNamesMap_kt__cbbp0k();
  var tmp = get_schemaCache(json);
  var tmp_0 = get_JsonSerializationNamesKey();
  return tmp.p19(_this__u8e3s4, tmp_0, serializationNamesIndices$lambda(_this__u8e3s4, strategy));
}
function buildDeserializationNamesMap(_this__u8e3s4, json) {
  _init_properties_JsonNamesMap_kt__cbbp0k();
  // Inline function 'kotlin.collections.mutableMapOf' call
  var builder = LinkedHashMap_init_$Create$();
  var useLowercaseEnums = decodeCaseInsensitive(json, _this__u8e3s4);
  var strategyForClasses = namingStrategy(_this__u8e3s4, json);
  var inductionVariable = 0;
  var last = _this__u8e3s4.dn();
  if (inductionVariable < last)
    do {
      var i = inductionVariable;
      inductionVariable = inductionVariable + 1 | 0;
      // Inline function 'kotlin.collections.filterIsInstance' call
      var tmp0 = _this__u8e3s4.hn(i);
      // Inline function 'kotlin.collections.filterIsInstanceTo' call
      var destination = ArrayList_init_$Create$();
      var _iterator__ex2g4s = tmp0.q();
      while (_iterator__ex2g4s.r()) {
        var element = _iterator__ex2g4s.s();
        if (element instanceof JsonNames) {
          destination.i(element);
        }
      }
      var tmp0_safe_receiver = singleOrNull(destination);
      var tmp1_safe_receiver = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.q19_1;
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
        tmp_0 = _this__u8e3s4.fn(i).toLowerCase();
      } else if (!(strategyForClasses == null)) {
        tmp_0 = strategyForClasses.r19(_this__u8e3s4, i, _this__u8e3s4.fn(i));
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
  if (builder.n()) {
    tmp_1 = emptyMap();
  } else {
    tmp_1 = builder;
  }
  return tmp_1;
}
function buildDeserializationNamesMap$putOrThrow(_this__u8e3s4, $this_buildDeserializationNamesMap, name, index) {
  var entity = equals($this_buildDeserializationNamesMap.bn(), ENUM_getInstance()) ? 'enum value' : 'property';
  // Inline function 'kotlin.collections.contains' call
  // Inline function 'kotlin.collections.containsKey' call
  if ((isInterface(_this__u8e3s4, KtMap) ? _this__u8e3s4 : THROW_CCE()).h2(name)) {
    throw new JsonException("The suggested name '" + name + "' for " + entity + ' ' + $this_buildDeserializationNamesMap.fn(index) + ' is already one of the names for ' + entity + ' ' + ($this_buildDeserializationNamesMap.fn(getValue(_this__u8e3s4, name)) + ' in ' + toString($this_buildDeserializationNamesMap)));
  }
  // Inline function 'kotlin.collections.set' call
  _this__u8e3s4.a2(name, index);
}
function deserializationNamesMap$lambda($descriptor, $this_deserializationNamesMap) {
  return function () {
    return buildDeserializationNamesMap($descriptor, $this_deserializationNamesMap);
  };
}
function serializationNamesIndices$lambda($this_serializationNamesIndices, $strategy) {
  return function () {
    var tmp = 0;
    var tmp_0 = $this_serializationNamesIndices.dn();
    // Inline function 'kotlin.arrayOfNulls' call
    var tmp_1 = Array(tmp_0);
    while (tmp < tmp_0) {
      var tmp_2 = tmp;
      var baseName = $this_serializationNamesIndices.fn(tmp_2);
      tmp_1[tmp_2] = $strategy.r19($this_serializationNamesIndices, tmp_2, baseName);
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
  var newSize = imul($this.u19_1, 2);
  $this.s19_1 = copyOf($this.s19_1, newSize);
  var tmp = 0;
  var tmp_0 = new Int32Array(newSize);
  while (tmp < newSize) {
    tmp_0[tmp] = -1;
    tmp = tmp + 1 | 0;
  }
  var newIndices = tmp_0;
  // Inline function 'kotlin.collections.copyInto' call
  var this_0 = $this.t19_1;
  var endIndex = this_0.length;
  // Inline function 'kotlin.js.unsafeCast' call
  // Inline function 'kotlin.js.asDynamic' call
  var tmp_1 = this_0;
  // Inline function 'kotlin.js.unsafeCast' call
  // Inline function 'kotlin.js.asDynamic' call
  arrayCopy(tmp_1, newIndices, 0, 0, endIndex);
  $this.t19_1 = newIndices;
}
function JsonPath() {
  var tmp = this;
  // Inline function 'kotlin.arrayOfNulls' call
  tmp.s19_1 = Array(8);
  var tmp_0 = this;
  var tmp_1 = 0;
  var tmp_2 = new Int32Array(8);
  while (tmp_1 < 8) {
    tmp_2[tmp_1] = -1;
    tmp_1 = tmp_1 + 1 | 0;
  }
  tmp_0.t19_1 = tmp_2;
  this.u19_1 = -1;
}
protoOf(JsonPath).v19 = function (sd) {
  this.u19_1 = this.u19_1 + 1 | 0;
  var depth = this.u19_1;
  if (depth === this.s19_1.length) {
    resize(this);
  }
  this.s19_1[depth] = sd;
};
protoOf(JsonPath).w19 = function (index) {
  this.t19_1[this.u19_1] = index;
};
protoOf(JsonPath).x19 = function (key) {
  var tmp;
  if (!(this.t19_1[this.u19_1] === -2)) {
    this.u19_1 = this.u19_1 + 1 | 0;
    tmp = this.u19_1 === this.s19_1.length;
  } else {
    tmp = false;
  }
  if (tmp) {
    resize(this);
  }
  this.s19_1[this.u19_1] = key;
  this.t19_1[this.u19_1] = -2;
};
protoOf(JsonPath).y19 = function () {
  if (this.t19_1[this.u19_1] === -2) {
    this.s19_1[this.u19_1] = Tombstone_instance;
  }
};
protoOf(JsonPath).z19 = function () {
  var depth = this.u19_1;
  if (this.t19_1[depth] === -2) {
    this.t19_1[depth] = -1;
    this.u19_1 = this.u19_1 - 1 | 0;
  }
  if (!(this.u19_1 === -1)) {
    this.u19_1 = this.u19_1 - 1 | 0;
  }
};
protoOf(JsonPath).a1a = function () {
  // Inline function 'kotlin.text.buildString' call
  // Inline function 'kotlin.apply' call
  var this_0 = StringBuilder_init_$Create$();
  this_0.q7('$');
  // Inline function 'kotlin.repeat' call
  var times = this.u19_1 + 1 | 0;
  var inductionVariable = 0;
  if (inductionVariable < times)
    do {
      var index = inductionVariable;
      inductionVariable = inductionVariable + 1 | 0;
      var element = this.s19_1[index];
      if (!(element == null) ? isInterface(element, SerialDescriptor) : false) {
        if (equals(element.bn(), LIST_getInstance())) {
          if (!(this.t19_1[index] === -1)) {
            this_0.q7('[');
            this_0.ib(this.t19_1[index]);
            this_0.q7(']');
          }
        } else {
          var idx = this.t19_1[index];
          if (idx >= 0) {
            this_0.q7('.');
            this_0.q7(element.fn(idx));
          }
        }
      } else {
        if (!(element === Tombstone_instance)) {
          this_0.q7('[');
          this_0.q7("'");
          this_0.p7(element);
          this_0.q7("'");
          this_0.q7(']');
        }
      }
    }
     while (inductionVariable < times);
  return this_0.toString();
};
protoOf(JsonPath).toString = function () {
  return this.a1a();
};
function checkKind($this, descriptor, actualClass) {
  var kind = descriptor.bn();
  var tmp;
  if (kind instanceof PolymorphicKind) {
    tmp = true;
  } else {
    tmp = equals(kind, CONTEXTUAL_getInstance());
  }
  if (tmp) {
    throw IllegalArgumentException_init_$Create$('Serializer for ' + actualClass.w9() + " can't be registered as a subclass for polymorphic serialization " + ('because its kind ' + kind.toString() + ' is not concrete. To work with multiple hierarchies, register it as a base class.'));
  }
  if ($this.c1a_1)
    return Unit_instance;
  if (!$this.d1a_1)
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
    throw IllegalArgumentException_init_$Create$('Serializer for ' + actualClass.w9() + ' of kind ' + kind.toString() + ' cannot be serialized polymorphically with class discriminator.');
  }
}
function checkDiscriminatorCollisions($this, descriptor, actualClass) {
  var inductionVariable = 0;
  var last = descriptor.dn();
  if (inductionVariable < last)
    do {
      var i = inductionVariable;
      inductionVariable = inductionVariable + 1 | 0;
      var name = descriptor.fn(i);
      if (name === $this.b1a_1) {
        throw IllegalArgumentException_init_$Create$('Polymorphic serializer for ' + toString(actualClass) + " has property '" + name + "' that conflicts " + 'with JSON class discriminator. You can either change class discriminator in JsonConfiguration, rename property with @SerialName annotation or fall back to array polymorphism');
      }
    }
     while (inductionVariable < last);
}
function JsonSerializersModuleValidator(configuration) {
  this.b1a_1 = configuration.p16_1;
  this.c1a_1 = configuration.o16_1;
  this.d1a_1 = !configuration.w16_1.equals(ClassDiscriminatorMode_NONE_getInstance());
}
protoOf(JsonSerializersModuleValidator).k14 = function (kClass, provider) {
};
protoOf(JsonSerializersModuleValidator).n14 = function (baseClass, actualClass, actualSerializer) {
  var descriptor = actualSerializer.tl();
  checkKind(this, descriptor, actualClass);
  if (!this.c1a_1 && this.d1a_1) {
    checkDiscriminatorCollisions(this, descriptor, actualClass);
  }
};
protoOf(JsonSerializersModuleValidator).o14 = function (baseClass, defaultSerializerProvider) {
};
protoOf(JsonSerializersModuleValidator).p14 = function (baseClass, defaultDeserializerProvider) {
};
function encodeByWriter(json, writer, serializer, value) {
  var tmp = WriteMode_OBJ_getInstance();
  // Inline function 'kotlin.arrayOfNulls' call
  var size = get_entries().t();
  var tmp$ret$0 = Array(size);
  var encoder = StreamingJsonEncoder_init_$Create$(writer, json, tmp, tmp$ret$0);
  encoder.gq(serializer, value);
}
function readObject($this) {
  // Inline function 'kotlinx.serialization.json.internal.JsonTreeReader.readObjectImpl' call
  var lastToken = $this.n1a_1.r1a(6);
  if ($this.n1a_1.s1a() === 4) {
    $this.n1a_1.n19('Unexpected leading comma');
  }
  // Inline function 'kotlin.collections.linkedMapOf' call
  var result = LinkedHashMap_init_$Create$();
  $l$loop: while ($this.n1a_1.t1a()) {
    var key = $this.o1a_1 ? $this.n1a_1.v1a() : $this.n1a_1.u1a();
    $this.n1a_1.r1a(5);
    var element = $this.w1a();
    // Inline function 'kotlin.collections.set' call
    result.a2(key, element);
    lastToken = $this.n1a_1.x1a();
    var tmp0_subject = lastToken;
    if (tmp0_subject !== 4)
      if (tmp0_subject === 7)
        break $l$loop;
      else {
        $this.n1a_1.n19('Expected end of the object or comma');
      }
  }
  if (lastToken === 6) {
    $this.n1a_1.r1a(7);
  } else if (lastToken === 4) {
    if (!$this.p1a_1) {
      invalidTrailingComma($this.n1a_1);
    }
    $this.n1a_1.r1a(7);
  }
  return new JsonObject(result);
}
function readObject_0($this, _this__u8e3s4, $completion) {
  var tmp = new $readObjectCOROUTINE$($this, _this__u8e3s4, $completion);
  tmp.l8_1 = Unit_instance;
  tmp.m8_1 = null;
  return tmp.r8();
}
function readArray($this) {
  var lastToken = $this.n1a_1.x1a();
  if ($this.n1a_1.s1a() === 4) {
    $this.n1a_1.n19('Unexpected leading comma');
  }
  // Inline function 'kotlin.collections.arrayListOf' call
  var result = ArrayList_init_$Create$();
  while ($this.n1a_1.t1a()) {
    var element = $this.w1a();
    result.i(element);
    lastToken = $this.n1a_1.x1a();
    if (!(lastToken === 4)) {
      var tmp0 = $this.n1a_1;
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonLexer.require' call
      var condition = lastToken === 9;
      var position = tmp0.i15_1;
      if (!condition) {
        var tmp$ret$1 = 'Expected end of the array or comma';
        tmp0.n19(tmp$ret$1, position);
      }
    }
  }
  if (lastToken === 8) {
    $this.n1a_1.r1a(9);
  } else if (lastToken === 4) {
    if (!$this.p1a_1) {
      invalidTrailingComma($this.n1a_1, 'array');
    }
    $this.n1a_1.r1a(9);
  }
  return new JsonArray(result);
}
function readValue($this, isString) {
  var tmp;
  if ($this.o1a_1 || !isString) {
    tmp = $this.n1a_1.v1a();
  } else {
    tmp = $this.n1a_1.u1a();
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
  this.u1b_1 = this$0;
  CoroutineImpl.call(this, resultContinuation);
}
protoOf(JsonTreeReader$readDeepRecursive$slambda).y1b = function ($this$DeepRecursiveFunction, it, $completion) {
  var tmp = this.z1b($this$DeepRecursiveFunction, it, $completion);
  tmp.l8_1 = Unit_instance;
  tmp.m8_1 = null;
  return tmp.r8();
};
protoOf(JsonTreeReader$readDeepRecursive$slambda).z8 = function (p1, p2, $completion) {
  var tmp = p1 instanceof DeepRecursiveScope ? p1 : THROW_CCE();
  return this.y1b(tmp, p2 instanceof Unit ? p2 : THROW_CCE(), $completion);
};
protoOf(JsonTreeReader$readDeepRecursive$slambda).r8 = function () {
  var suspendResult = this.l8_1;
  $sm: do
    try {
      var tmp = this.j8_1;
      switch (tmp) {
        case 0:
          this.k8_1 = 3;
          var tmp0_subject = this.u1b_1.n1a_1.s1a();
          if (tmp0_subject === 1) {
            this.x1b_1 = readValue(this.u1b_1, true);
            this.j8_1 = 2;
            continue $sm;
          } else {
            if (tmp0_subject === 0) {
              this.x1b_1 = readValue(this.u1b_1, false);
              this.j8_1 = 2;
              continue $sm;
            } else {
              if (tmp0_subject === 6) {
                this.j8_1 = 1;
                suspendResult = readObject_0(this.u1b_1, this.v1b_1, this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }
                continue $sm;
              } else {
                if (tmp0_subject === 8) {
                  this.x1b_1 = readArray(this.u1b_1);
                  this.j8_1 = 2;
                  continue $sm;
                } else {
                  var tmp_0 = this;
                  this.u1b_1.n1a_1.n19("Can't begin reading element, unexpected token");
                }
              }
            }
          }

          break;
        case 1:
          this.x1b_1 = suspendResult;
          this.j8_1 = 2;
          continue $sm;
        case 2:
          return this.x1b_1;
        case 3:
          throw this.m8_1;
      }
    } catch ($p) {
      var e = $p;
      if (this.k8_1 === 3) {
        throw e;
      } else {
        this.j8_1 = this.k8_1;
        this.m8_1 = e;
      }
    }
   while (true);
};
protoOf(JsonTreeReader$readDeepRecursive$slambda).z1b = function ($this$DeepRecursiveFunction, it, completion) {
  var i = new JsonTreeReader$readDeepRecursive$slambda(this.u1b_1, completion);
  i.v1b_1 = $this$DeepRecursiveFunction;
  i.w1b_1 = it;
  return i;
};
function JsonTreeReader$readDeepRecursive$slambda_0(this$0, resultContinuation) {
  var i = new JsonTreeReader$readDeepRecursive$slambda(this$0, resultContinuation);
  var l = function ($this$DeepRecursiveFunction, it, $completion) {
    return i.y1b($this$DeepRecursiveFunction, it, $completion);
  };
  l.$arity = 2;
  return l;
}
function $readObjectCOROUTINE$(_this__u8e3s4, _this__u8e3s4_0, resultContinuation) {
  CoroutineImpl.call(this, resultContinuation);
  this.g1b_1 = _this__u8e3s4;
  this.h1b_1 = _this__u8e3s4_0;
}
protoOf($readObjectCOROUTINE$).r8 = function () {
  var suspendResult = this.l8_1;
  $sm: do
    try {
      var tmp = this.j8_1;
      switch (tmp) {
        case 0:
          this.k8_1 = 5;
          this.j1b_1 = this.g1b_1;
          this.k1b_1 = this.j1b_1.n1a_1.r1a(6);
          if (this.j1b_1.n1a_1.s1a() === 4) {
            this.j1b_1.n1a_1.n19('Unexpected leading comma');
          }

          var tmp_0 = this;
          tmp_0.i1b_1 = LinkedHashMap_init_$Create$();
          this.j8_1 = 1;
          continue $sm;
        case 1:
          if (!this.j1b_1.n1a_1.t1a()) {
            this.j8_1 = 4;
            continue $sm;
          }

          this.l1b_1 = this.j1b_1.o1a_1 ? this.j1b_1.n1a_1.v1a() : this.j1b_1.n1a_1.u1a();
          this.j1b_1.n1a_1.r1a(5);
          this.j8_1 = 2;
          suspendResult = this.h1b_1.kj(Unit_instance, this);
          if (suspendResult === get_COROUTINE_SUSPENDED()) {
            return suspendResult;
          }

          continue $sm;
        case 2:
          var element = suspendResult;
          var tmp0 = this.i1b_1;
          var key = this.l1b_1;
          tmp0.a2(key, element);
          this.k1b_1 = this.j1b_1.n1a_1.x1a();
          var tmp0_subject = this.k1b_1;
          if (tmp0_subject === 4) {
            this.j8_1 = 3;
            continue $sm;
          } else {
            if (tmp0_subject === 7) {
              this.j8_1 = 4;
              continue $sm;
            } else {
              this.j1b_1.n1a_1.n19('Expected end of the object or comma');
            }
          }

          break;
        case 3:
          this.j8_1 = 1;
          continue $sm;
        case 4:
          if (this.k1b_1 === 6) {
            this.j1b_1.n1a_1.r1a(7);
          } else if (this.k1b_1 === 4) {
            if (!this.j1b_1.p1a_1) {
              invalidTrailingComma(this.j1b_1.n1a_1);
            }
            this.j1b_1.n1a_1.r1a(7);
          }

          return new JsonObject(this.i1b_1);
        case 5:
          throw this.m8_1;
      }
    } catch ($p) {
      var e = $p;
      if (this.k8_1 === 5) {
        throw e;
      } else {
        this.j8_1 = this.k8_1;
        this.m8_1 = e;
      }
    }
   while (true);
};
function JsonTreeReader(configuration, lexer) {
  this.n1a_1 = lexer;
  this.o1a_1 = configuration.i16_1;
  this.p1a_1 = configuration.u16_1;
  this.q1a_1 = 0;
}
protoOf(JsonTreeReader).w1a = function () {
  var token = this.n1a_1.s1a();
  var tmp;
  if (token === 1) {
    tmp = readValue(this, true);
  } else if (token === 0) {
    tmp = readValue(this, false);
  } else if (token === 6) {
    var tmp_0;
    this.q1a_1 = this.q1a_1 + 1 | 0;
    if (this.q1a_1 === 200) {
      tmp_0 = readDeepRecursive(this);
    } else {
      tmp_0 = readObject(this);
    }
    var result = tmp_0;
    this.q1a_1 = this.q1a_1 - 1 | 0;
    tmp = result;
  } else if (token === 8) {
    tmp = readArray(this);
  } else {
    this.n1a_1.n19('Cannot read Json element because of unexpected ' + tokenDescription(token));
  }
  return tmp;
};
function classDiscriminator(_this__u8e3s4, json) {
  var _iterator__ex2g4s = _this__u8e3s4.en().q();
  while (_iterator__ex2g4s.r()) {
    var annotation = _iterator__ex2g4s.s();
    if (annotation instanceof JsonClassDiscriminator)
      return annotation.a1c_1;
  }
  return json.t14_1.p16_1;
}
function validateIfSealed(serializer, actualSerializer, classDiscriminator) {
  if (!(serializer instanceof SealedClassSerializer))
    return Unit_instance;
  if (jsonCachedSerialNames(actualSerializer.tl()).w1(classDiscriminator)) {
    var baseName = serializer.tl().an();
    var actualName = actualSerializer.tl().an();
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
  this.o19_1 = createMapForCache(16);
}
protoOf(DescriptorSchemaCache).b1c = function (descriptor, key, value) {
  // Inline function 'kotlin.collections.getOrPut' call
  var this_0 = this.o19_1;
  var value_0 = this_0.j2(descriptor);
  var tmp;
  if (value_0 == null) {
    var answer = createMapForCache(2);
    this_0.a2(descriptor, answer);
    tmp = answer;
  } else {
    tmp = value_0;
  }
  var tmp0 = tmp;
  var tmp2 = key instanceof Key ? key : THROW_CCE();
  // Inline function 'kotlin.collections.set' call
  var value_1 = !(value == null) ? value : THROW_CCE();
  tmp0.a2(tmp2, value_1);
};
protoOf(DescriptorSchemaCache).p19 = function (descriptor, key, defaultValue) {
  var tmp0_safe_receiver = this.c1c(descriptor, key);
  if (tmp0_safe_receiver == null)
    null;
  else {
    // Inline function 'kotlin.let' call
    return tmp0_safe_receiver;
  }
  var value = defaultValue();
  this.b1c(descriptor, key, value);
  return value;
};
protoOf(DescriptorSchemaCache).c1c = function (descriptor, key) {
  var tmp0_safe_receiver = this.o19_1.j2(descriptor);
  var tmp;
  if (tmp0_safe_receiver == null) {
    tmp = null;
  } else {
    tmp = tmp0_safe_receiver.j2(key instanceof Key ? key : THROW_CCE());
  }
  var tmp_0 = tmp;
  return !(tmp_0 == null) ? tmp_0 : null;
};
function DiscriminatorHolder(discriminatorToSkip) {
  this.d1c_1 = discriminatorToSkip;
}
function trySkip($this, _this__u8e3s4, unknownKey) {
  if (_this__u8e3s4 == null)
    return false;
  if (_this__u8e3s4.d1c_1 === unknownKey) {
    _this__u8e3s4.d1c_1 = null;
    return true;
  }
  return false;
}
function skipLeftoverElements($this, descriptor) {
  while (!($this.gp(descriptor) === -1)) {
  }
}
function checkLeadingComma($this) {
  if ($this.c15_1.s1a() === 4) {
    $this.c15_1.n19('Unexpected leading comma');
  }
}
function decodeMapIndex($this) {
  var hasComma = false;
  var decodingKey = !(($this.e15_1 % 2 | 0) === 0);
  if (decodingKey) {
    if (!($this.e15_1 === -1)) {
      hasComma = $this.c15_1.f1c();
    }
  } else {
    $this.c15_1.e1c(_Char___init__impl__6a9atx(58));
  }
  var tmp;
  if ($this.c15_1.t1a()) {
    if (decodingKey) {
      if ($this.e15_1 === -1) {
        var tmp0 = $this.c15_1;
        // Inline function 'kotlinx.serialization.json.internal.AbstractJsonLexer.require' call
        var condition = !hasComma;
        var position = tmp0.i15_1;
        if (!condition) {
          var tmp$ret$0 = 'Unexpected leading comma';
          tmp0.n19(tmp$ret$0, position);
        }
      } else {
        var tmp0_0 = $this.c15_1;
        // Inline function 'kotlinx.serialization.json.internal.AbstractJsonLexer.require' call
        var condition_0 = hasComma;
        var position_0 = tmp0_0.i15_1;
        if (!condition_0) {
          var tmp$ret$2 = 'Expected comma after the key-value pair';
          tmp0_0.n19(tmp$ret$2, position_0);
        }
      }
    }
    $this.e15_1 = $this.e15_1 + 1 | 0;
    tmp = $this.e15_1;
  } else {
    if (hasComma && !$this.a15_1.t14_1.u16_1) {
      invalidTrailingComma($this.c15_1);
    }
    tmp = -1;
  }
  return tmp;
}
function coerceInputValue($this, descriptor, index) {
  var tmp0 = $this.a15_1;
  var tmp$ret$1;
  $l$block_2: {
    // Inline function 'kotlinx.serialization.json.internal.tryCoerceValue' call
    var isOptional = descriptor.jn(index);
    var elementDescriptor = descriptor.in(index);
    var tmp;
    if (isOptional && !elementDescriptor.tm()) {
      tmp = $this.c15_1.g1c(true);
    } else {
      tmp = false;
    }
    if (tmp) {
      tmp$ret$1 = true;
      break $l$block_2;
    }
    if (equals(elementDescriptor.bn(), ENUM_getInstance())) {
      var tmp_0;
      if (elementDescriptor.tm()) {
        tmp_0 = $this.c15_1.g1c(false);
      } else {
        tmp_0 = false;
      }
      if (tmp_0) {
        tmp$ret$1 = false;
        break $l$block_2;
      }
      var tmp0_elvis_lhs = $this.c15_1.h1c($this.g15_1.i16_1);
      var tmp_1;
      if (tmp0_elvis_lhs == null) {
        tmp$ret$1 = false;
        break $l$block_2;
      } else {
        tmp_1 = tmp0_elvis_lhs;
      }
      var enumValue = tmp_1;
      var enumIndex = getJsonNameIndex(elementDescriptor, tmp0, enumValue);
      var coerceToNull = !tmp0.t14_1.l16_1 && elementDescriptor.tm();
      if (enumIndex === -3 && (isOptional || coerceToNull)) {
        $this.c15_1.u1a();
        tmp$ret$1 = true;
        break $l$block_2;
      }
    }
    tmp$ret$1 = false;
  }
  return tmp$ret$1;
}
function decodeObjectIndex($this, descriptor) {
  var hasComma = $this.c15_1.f1c();
  while ($this.c15_1.t1a()) {
    hasComma = false;
    var key = decodeStringKey($this);
    $this.c15_1.e1c(_Char___init__impl__6a9atx(58));
    var index = getJsonNameIndex(descriptor, $this.a15_1, key);
    var tmp;
    if (!(index === -3)) {
      var tmp_0;
      if ($this.g15_1.n16_1 && coerceInputValue($this, descriptor, index)) {
        hasComma = $this.c15_1.f1c();
        tmp_0 = false;
      } else {
        var tmp0_safe_receiver = $this.h15_1;
        if (tmp0_safe_receiver == null)
          null;
        else {
          tmp0_safe_receiver.k19(index);
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
  if (hasComma && !$this.a15_1.t14_1.u16_1) {
    invalidTrailingComma($this.c15_1);
  }
  var tmp1_safe_receiver = $this.h15_1;
  var tmp2_elvis_lhs = tmp1_safe_receiver == null ? null : tmp1_safe_receiver.l19();
  return tmp2_elvis_lhs == null ? -1 : tmp2_elvis_lhs;
}
function handleUnknown($this, descriptor, key) {
  if (ignoreUnknownKeys(descriptor, $this.a15_1) || trySkip($this, $this.f15_1, key)) {
    $this.c15_1.j1c($this.g15_1.i16_1);
  } else {
    $this.c15_1.j15_1.z19();
    $this.c15_1.i1c(key);
  }
  return $this.c15_1.f1c();
}
function decodeListIndex($this) {
  var hasComma = $this.c15_1.f1c();
  var tmp;
  if ($this.c15_1.t1a()) {
    if (!($this.e15_1 === -1) && !hasComma) {
      $this.c15_1.n19('Expected end of the array or comma');
    }
    $this.e15_1 = $this.e15_1 + 1 | 0;
    tmp = $this.e15_1;
  } else {
    if (hasComma && !$this.a15_1.t14_1.u16_1) {
      invalidTrailingComma($this.c15_1, 'array');
    }
    tmp = -1;
  }
  return tmp;
}
function decodeStringKey($this) {
  var tmp;
  if ($this.g15_1.i16_1) {
    tmp = $this.c15_1.l1c();
  } else {
    tmp = $this.c15_1.k1c();
  }
  return tmp;
}
function StreamingJsonDecoder(json, mode, lexer, descriptor, discriminatorHolder) {
  AbstractDecoder.call(this);
  this.a15_1 = json;
  this.b15_1 = mode;
  this.c15_1 = lexer;
  this.d15_1 = this.a15_1.ep();
  this.e15_1 = -1;
  this.f15_1 = discriminatorHolder;
  this.g15_1 = this.a15_1.t14_1;
  this.h15_1 = this.g15_1.l16_1 ? null : new JsonElementMarker(descriptor);
}
protoOf(StreamingJsonDecoder).x16 = function () {
  return this.a15_1;
};
protoOf(StreamingJsonDecoder).ep = function () {
  return this.d15_1;
};
protoOf(StreamingJsonDecoder).y16 = function () {
  return (new JsonTreeReader(this.a15_1.t14_1, this.c15_1)).w1a();
};
protoOf(StreamingJsonDecoder).po = function (deserializer) {
  try {
    var tmp;
    if (!(deserializer instanceof AbstractPolymorphicSerializer)) {
      tmp = true;
    } else {
      tmp = this.a15_1.t14_1.o16_1;
    }
    if (tmp) {
      return deserializer.vl(this);
    }
    var discriminator = classDiscriminator(deserializer.tl(), this.a15_1);
    var tmp0_elvis_lhs = this.c15_1.m1c(discriminator, this.g15_1.i16_1);
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
          tmp_1 = this.x16().t14_1.o16_1;
        }
        if (tmp_1) {
          tmp$ret$0 = tmp2.vl(this);
          break $l$block;
        }
        var discriminator_0 = classDiscriminator(tmp2.tl(), this.x16());
        var tmp0 = this.y16();
        // Inline function 'kotlinx.serialization.json.internal.cast' call
        var serialName = tmp2.tl().an();
        if (!(tmp0 instanceof JsonObject)) {
          var tmp_2 = getKClass(JsonObject).w9();
          var tmp_3 = getKClassFromExpression(tmp0).w9();
          var tmp$ret$1 = this.c15_1.j15_1.a1a();
          throw JsonDecodingException_0(-1, 'Expected ' + tmp_2 + ', but had ' + tmp_3 + ' as the serialized body of ' + serialName + ' at element: ' + tmp$ret$1, toString(tmp0));
        }
        var jsonTree = tmp0;
        var tmp0_safe_receiver = jsonTree.d17(discriminator_0);
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
        tmp$ret$0 = readPolymorphicJson(this.x16(), discriminator_0, jsonTree, actualSerializer);
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
        this.c15_1.n19(message, VOID, hint);
      } else {
        throw $p;
      }
      tmp_7 = tmp_8;
    }
    var tmp_9 = tmp_7;
    var actualSerializer_0 = isInterface(tmp_9, DeserializationStrategy) ? tmp_9 : THROW_CCE();
    this.f15_1 = new DiscriminatorHolder(discriminator);
    return actualSerializer_0.vl(this);
  } catch ($p) {
    if ($p instanceof MissingFieldException) {
      var e = $p;
      if (contains(ensureNotNull(e.message), 'at path'))
        throw e;
      throw new MissingFieldException(e.nm_1, plus(e.message, ' at path: ') + this.c15_1.j15_1.a1a(), e);
    } else {
      throw $p;
    }
  }
};
protoOf(StreamingJsonDecoder).qo = function (descriptor) {
  var newMode = switchMode(this.a15_1, descriptor);
  this.c15_1.j15_1.v19(descriptor);
  this.c15_1.e1c(newMode.p1c_1);
  checkLeadingComma(this);
  var tmp;
  switch (newMode.p2_1) {
    case 1:
    case 2:
    case 3:
      tmp = new StreamingJsonDecoder(this.a15_1, newMode, this.c15_1, descriptor, this.f15_1);
      break;
    default:
      var tmp_0;
      if (this.b15_1.equals(newMode) && this.a15_1.t14_1.l16_1) {
        tmp_0 = this;
      } else {
        tmp_0 = new StreamingJsonDecoder(this.a15_1, newMode, this.c15_1, descriptor, this.f15_1);
      }

      tmp = tmp_0;
      break;
  }
  return tmp;
};
protoOf(StreamingJsonDecoder).ro = function (descriptor) {
  if (descriptor.dn() === 0 && ignoreUnknownKeys(descriptor, this.a15_1)) {
    skipLeftoverElements(this, descriptor);
  }
  if (this.c15_1.f1c() && !this.a15_1.t14_1.u16_1) {
    invalidTrailingComma(this.c15_1, '');
  }
  this.c15_1.e1c(this.b15_1.q1c_1);
  this.c15_1.j15_1.z19();
};
protoOf(StreamingJsonDecoder).co = function () {
  var tmp;
  var tmp0_safe_receiver = this.h15_1;
  var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.j19_1;
  if (!(tmp1_elvis_lhs == null ? false : tmp1_elvis_lhs)) {
    tmp = !this.c15_1.r1c();
  } else {
    tmp = false;
  }
  return tmp;
};
protoOf(StreamingJsonDecoder).do = function () {
  return null;
};
protoOf(StreamingJsonDecoder).cp = function (descriptor, index, deserializer, previousValue) {
  var isMapKey = this.b15_1.equals(WriteMode_MAP_getInstance()) && (index & 1) === 0;
  if (isMapKey) {
    this.c15_1.j15_1.y19();
  }
  var value = protoOf(AbstractDecoder).cp.call(this, descriptor, index, deserializer, previousValue);
  if (isMapKey) {
    this.c15_1.j15_1.x19(value);
  }
  return value;
};
protoOf(StreamingJsonDecoder).gp = function (descriptor) {
  var index;
  switch (this.b15_1.p2_1) {
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
  if (!this.b15_1.equals(WriteMode_MAP_getInstance())) {
    this.c15_1.j15_1.w19(index);
  }
  return index;
};
protoOf(StreamingJsonDecoder).eo = function () {
  return this.c15_1.s1c();
};
protoOf(StreamingJsonDecoder).fo = function () {
  var value = this.c15_1.t1c();
  if (!equalsLong(value, fromInt(convertToByte(value)))) {
    this.c15_1.n19("Failed to parse byte for input '" + value.toString() + "'");
  }
  return convertToByte(value);
};
protoOf(StreamingJsonDecoder).go = function () {
  var value = this.c15_1.t1c();
  if (!equalsLong(value, fromInt(convertToShort(value)))) {
    this.c15_1.n19("Failed to parse short for input '" + value.toString() + "'");
  }
  return convertToShort(value);
};
protoOf(StreamingJsonDecoder).ho = function () {
  var value = this.c15_1.t1c();
  if (!equalsLong(value, fromInt(convertToInt(value)))) {
    this.c15_1.n19("Failed to parse int for input '" + value.toString() + "'");
  }
  return convertToInt(value);
};
protoOf(StreamingJsonDecoder).io = function () {
  return this.c15_1.t1c();
};
protoOf(StreamingJsonDecoder).jo = function () {
  var tmp0 = this.c15_1;
  var tmp$ret$4;
  $l$block: {
    // Inline function 'kotlinx.serialization.json.internal.parseString' call
    var input = tmp0.v1a();
    try {
      // Inline function 'kotlin.text.toFloat' call
      // Inline function 'kotlin.js.unsafeCast' call
      // Inline function 'kotlin.js.asDynamic' call
      tmp$ret$4 = toDouble(input);
      break $l$block;
    } catch ($p) {
      if ($p instanceof IllegalArgumentException) {
        var e = $p;
        tmp0.n19("Failed to parse type '" + 'float' + "' for input '" + input + "'");
      } else {
        throw $p;
      }
    }
  }
  var result = tmp$ret$4;
  var specialFp = this.a15_1.t14_1.q16_1;
  if (specialFp || isFinite(result))
    return result;
  throwInvalidFloatingPointDecoded(this.c15_1, result);
};
protoOf(StreamingJsonDecoder).ko = function () {
  var tmp0 = this.c15_1;
  var tmp$ret$1;
  $l$block: {
    // Inline function 'kotlinx.serialization.json.internal.parseString' call
    var input = tmp0.v1a();
    try {
      tmp$ret$1 = toDouble(input);
      break $l$block;
    } catch ($p) {
      if ($p instanceof IllegalArgumentException) {
        var e = $p;
        tmp0.n19("Failed to parse type '" + 'double' + "' for input '" + input + "'");
      } else {
        throw $p;
      }
    }
  }
  var result = tmp$ret$1;
  var specialFp = this.a15_1.t14_1.q16_1;
  if (specialFp || isFinite_0(result))
    return result;
  throwInvalidFloatingPointDecoded(this.c15_1, result);
};
protoOf(StreamingJsonDecoder).lo = function () {
  var string = this.c15_1.v1a();
  if (!(string.length === 1)) {
    this.c15_1.n19("Expected single char, but got '" + string + "'");
  }
  return charCodeAt(string, 0);
};
protoOf(StreamingJsonDecoder).mo = function () {
  var tmp;
  if (this.g15_1.i16_1) {
    tmp = this.c15_1.l1c();
  } else {
    tmp = this.c15_1.u1a();
  }
  return tmp;
};
protoOf(StreamingJsonDecoder).no = function (descriptor) {
  return get_isUnsignedNumber(descriptor) ? new JsonDecoderForUnsignedTypes(this.c15_1, this.a15_1) : protoOf(AbstractDecoder).no.call(this, descriptor);
};
function JsonDecoderForUnsignedTypes(lexer, json) {
  AbstractDecoder.call(this);
  this.u1c_1 = lexer;
  this.v1c_1 = json.ep();
}
protoOf(JsonDecoderForUnsignedTypes).ep = function () {
  return this.v1c_1;
};
protoOf(JsonDecoderForUnsignedTypes).gp = function (descriptor) {
  var message = 'unsupported';
  throw IllegalStateException_init_$Create$(toString(message));
};
protoOf(JsonDecoderForUnsignedTypes).ho = function () {
  var tmp0 = this.u1c_1;
  var tmp$ret$2;
  $l$block: {
    // Inline function 'kotlinx.serialization.json.internal.parseString' call
    var input = tmp0.v1a();
    try {
      // Inline function 'kotlin.UInt.toInt' call
      var this_0 = toUInt(input);
      tmp$ret$2 = _UInt___get_data__impl__f0vqqw(this_0);
      break $l$block;
    } catch ($p) {
      if ($p instanceof IllegalArgumentException) {
        var e = $p;
        tmp0.n19("Failed to parse type '" + 'UInt' + "' for input '" + input + "'");
      } else {
        throw $p;
      }
    }
  }
  return tmp$ret$2;
};
protoOf(JsonDecoderForUnsignedTypes).io = function () {
  var tmp0 = this.u1c_1;
  var tmp$ret$2;
  $l$block: {
    // Inline function 'kotlinx.serialization.json.internal.parseString' call
    var input = tmp0.v1a();
    try {
      // Inline function 'kotlin.ULong.toLong' call
      var this_0 = toULong(input);
      tmp$ret$2 = _ULong___get_data__impl__fggpzb(this_0);
      break $l$block;
    } catch ($p) {
      if ($p instanceof IllegalArgumentException) {
        var e = $p;
        tmp0.n19("Failed to parse type '" + 'ULong' + "' for input '" + input + "'");
      } else {
        throw $p;
      }
    }
  }
  return tmp$ret$2;
};
protoOf(JsonDecoderForUnsignedTypes).fo = function () {
  var tmp0 = this.u1c_1;
  var tmp$ret$2;
  $l$block: {
    // Inline function 'kotlinx.serialization.json.internal.parseString' call
    var input = tmp0.v1a();
    try {
      // Inline function 'kotlin.UByte.toByte' call
      var this_0 = toUByte(input);
      tmp$ret$2 = _UByte___get_data__impl__jof9qr(this_0);
      break $l$block;
    } catch ($p) {
      if ($p instanceof IllegalArgumentException) {
        var e = $p;
        tmp0.n19("Failed to parse type '" + 'UByte' + "' for input '" + input + "'");
      } else {
        throw $p;
      }
    }
  }
  return tmp$ret$2;
};
protoOf(JsonDecoderForUnsignedTypes).go = function () {
  var tmp0 = this.u1c_1;
  var tmp$ret$2;
  $l$block: {
    // Inline function 'kotlinx.serialization.json.internal.parseString' call
    var input = tmp0.v1a();
    try {
      // Inline function 'kotlin.UShort.toShort' call
      var this_0 = toUShort(input);
      tmp$ret$2 = _UShort___get_data__impl__g0245(this_0);
      break $l$block;
    } catch ($p) {
      if ($p instanceof IllegalArgumentException) {
        var e = $p;
        tmp0.n19("Failed to parse type '" + 'UShort' + "' for input '" + input + "'");
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
  $this.e1a_1.h18();
  $this.tp(discriminator);
  $this.e1a_1.k18(_Char___init__impl__6a9atx(58));
  $this.e1a_1.j18();
  $this.tp(serialName);
}
function StreamingJsonEncoder(composer, json, mode, modeReuseCache) {
  AbstractEncoder.call(this);
  this.e1a_1 = composer;
  this.f1a_1 = json;
  this.g1a_1 = mode;
  this.h1a_1 = modeReuseCache;
  this.i1a_1 = this.f1a_1.ep();
  this.j1a_1 = this.f1a_1.t14_1;
  this.k1a_1 = false;
  this.l1a_1 = null;
  this.m1a_1 = null;
  var i = this.g1a_1.p2_1;
  if (!(this.h1a_1 == null)) {
    if (!(this.h1a_1[i] === null) || !(this.h1a_1[i] === this)) {
      this.h1a_1[i] = this;
    }
  }
}
protoOf(StreamingJsonEncoder).x16 = function () {
  return this.f1a_1;
};
protoOf(StreamingJsonEncoder).ep = function () {
  return this.i1a_1;
};
protoOf(StreamingJsonEncoder).gq = function (serializer, value) {
  $l$block: {
    // Inline function 'kotlinx.serialization.json.internal.encodePolymorphically' call
    if (this.x16().t14_1.o16_1) {
      serializer.ul(this, value);
      break $l$block;
    }
    var isPolymorphicSerializer = serializer instanceof AbstractPolymorphicSerializer;
    var tmp;
    if (isPolymorphicSerializer) {
      tmp = !this.x16().t14_1.w16_1.equals(ClassDiscriminatorMode_NONE_getInstance());
    } else {
      var tmp_0;
      switch (this.x16().t14_1.w16_1.p2_1) {
        case 0:
        case 2:
          tmp_0 = false;
          break;
        case 1:
          // Inline function 'kotlin.let' call

          var it = serializer.tl().bn();
          tmp_0 = equals(it, CLASS_getInstance()) || equals(it, OBJECT_getInstance());
          break;
        default:
          noWhenBranchMatchedException();
          break;
      }
      tmp = tmp_0;
    }
    var needDiscriminator = tmp;
    var baseClassDiscriminator = needDiscriminator ? classDiscriminator(serializer.tl(), this.x16()) : null;
    var tmp_1;
    if (isPolymorphicSerializer) {
      var casted = serializer instanceof AbstractPolymorphicSerializer ? serializer : THROW_CCE();
      $l$block_0: {
        // Inline function 'kotlin.requireNotNull' call
        if (value == null) {
          var message = 'Value for serializer ' + toString(serializer.tl()) + ' should always be non-null. Please report issue to the kotlinx.serialization tracker.';
          throw IllegalArgumentException_init_$Create$(toString(message));
        } else {
          break $l$block_0;
        }
      }
      var actual = findPolymorphicSerializer_0(casted, this, value);
      if (!(baseClassDiscriminator == null)) {
        access$validateIfSealed$tPolymorphicKt(serializer, actual, baseClassDiscriminator);
        checkKind_0(actual.tl().bn());
      }
      tmp_1 = isInterface(actual, SerializationStrategy) ? actual : THROW_CCE();
    } else {
      tmp_1 = serializer;
    }
    var actualSerializer = tmp_1;
    if (!(baseClassDiscriminator == null)) {
      var serialName = actualSerializer.tl().an();
      this.l1a_1 = baseClassDiscriminator;
      this.m1a_1 = serialName;
    }
    actualSerializer.ul(this, value);
  }
};
protoOf(StreamingJsonEncoder).qo = function (descriptor) {
  var newMode = switchMode(this.f1a_1, descriptor);
  if (!(newMode.p1c_1 === _Char___init__impl__6a9atx(0))) {
    this.e1a_1.k18(newMode.p1c_1);
    this.e1a_1.f18();
  }
  var discriminator = this.l1a_1;
  if (!(discriminator == null)) {
    var tmp0_elvis_lhs = this.m1a_1;
    encodeTypeInfo(this, discriminator, tmp0_elvis_lhs == null ? descriptor.an() : tmp0_elvis_lhs);
    this.l1a_1 = null;
    this.m1a_1 = null;
  }
  if (this.g1a_1.equals(newMode)) {
    return this;
  }
  var tmp1_safe_receiver = this.h1a_1;
  var tmp2_elvis_lhs = tmp1_safe_receiver == null ? null : tmp1_safe_receiver[newMode.p2_1];
  return tmp2_elvis_lhs == null ? new StreamingJsonEncoder(this.e1a_1, this.f1a_1, newMode, this.h1a_1) : tmp2_elvis_lhs;
};
protoOf(StreamingJsonEncoder).ro = function (descriptor) {
  if (!(this.g1a_1.q1c_1 === _Char___init__impl__6a9atx(0))) {
    this.e1a_1.g18();
    this.e1a_1.i18();
    this.e1a_1.k18(this.g1a_1.q1c_1);
  }
};
protoOf(StreamingJsonEncoder).ip = function (descriptor, index) {
  switch (this.g1a_1.p2_1) {
    case 1:
      if (!this.e1a_1.e18_1) {
        this.e1a_1.k18(_Char___init__impl__6a9atx(44));
      }

      this.e1a_1.h18();
      break;
    case 2:
      if (!this.e1a_1.e18_1) {
        var tmp = this;
        var tmp_0;
        if ((index % 2 | 0) === 0) {
          this.e1a_1.k18(_Char___init__impl__6a9atx(44));
          this.e1a_1.h18();
          tmp_0 = true;
        } else {
          this.e1a_1.k18(_Char___init__impl__6a9atx(58));
          this.e1a_1.j18();
          tmp_0 = false;
        }
        tmp.k1a_1 = tmp_0;
      } else {
        this.k1a_1 = true;
        this.e1a_1.h18();
      }

      break;
    case 3:
      if (index === 0)
        this.k1a_1 = true;
      if (index === 1) {
        this.e1a_1.k18(_Char___init__impl__6a9atx(44));
        this.e1a_1.j18();
        this.k1a_1 = false;
      }

      break;
    default:
      if (!this.e1a_1.e18_1) {
        this.e1a_1.k18(_Char___init__impl__6a9atx(44));
      }

      this.e1a_1.h18();
      this.tp(getJsonElementName(descriptor, this.f1a_1, index));
      this.e1a_1.k18(_Char___init__impl__6a9atx(58));
      this.e1a_1.j18();
      break;
  }
  return true;
};
protoOf(StreamingJsonEncoder).up = function (descriptor) {
  var tmp;
  if (get_isUnsignedNumber(descriptor)) {
    // Inline function 'kotlinx.serialization.json.internal.StreamingJsonEncoder.composerAs' call
    var tmp_0;
    var tmp_1 = this.e1a_1;
    if (tmp_1 instanceof ComposerForUnsignedNumbers) {
      tmp_0 = this.e1a_1;
    } else {
      var tmp0 = this.e1a_1.d18_1;
      var p1 = this.k1a_1;
      tmp_0 = new ComposerForUnsignedNumbers(tmp0, p1);
    }
    var tmp$ret$1 = tmp_0;
    tmp = new StreamingJsonEncoder(tmp$ret$1, this.f1a_1, this.g1a_1, null);
  } else if (get_isUnquotedLiteral(descriptor)) {
    // Inline function 'kotlinx.serialization.json.internal.StreamingJsonEncoder.composerAs' call
    var tmp_2;
    var tmp_3 = this.e1a_1;
    if (tmp_3 instanceof ComposerForUnquotedLiterals) {
      tmp_2 = this.e1a_1;
    } else {
      var tmp0_0 = this.e1a_1.d18_1;
      var p1_0 = this.k1a_1;
      tmp_2 = new ComposerForUnquotedLiterals(tmp0_0, p1_0);
    }
    var tmp$ret$3 = tmp_2;
    tmp = new StreamingJsonEncoder(tmp$ret$3, this.f1a_1, this.g1a_1, null);
  } else if (!(this.l1a_1 == null)) {
    // Inline function 'kotlin.apply' call
    this.m1a_1 = descriptor.an();
    tmp = this;
  } else {
    tmp = protoOf(AbstractEncoder).up.call(this, descriptor);
  }
  return tmp;
};
protoOf(StreamingJsonEncoder).kp = function () {
  this.e1a_1.m18('null');
};
protoOf(StreamingJsonEncoder).lp = function (value) {
  if (this.k1a_1) {
    this.tp(value.toString());
  } else {
    this.e1a_1.v18(value);
  }
};
protoOf(StreamingJsonEncoder).mp = function (value) {
  if (this.k1a_1) {
    this.tp(value.toString());
  } else {
    this.e1a_1.q18(value);
  }
};
protoOf(StreamingJsonEncoder).np = function (value) {
  if (this.k1a_1) {
    this.tp(value.toString());
  } else {
    this.e1a_1.s18(value);
  }
};
protoOf(StreamingJsonEncoder).op = function (value) {
  if (this.k1a_1) {
    this.tp(value.toString());
  } else {
    this.e1a_1.t18(value);
  }
};
protoOf(StreamingJsonEncoder).pp = function (value) {
  if (this.k1a_1) {
    this.tp(value.toString());
  } else {
    this.e1a_1.u18(value);
  }
};
protoOf(StreamingJsonEncoder).qp = function (value) {
  if (this.k1a_1) {
    this.tp(value.toString());
  } else {
    this.e1a_1.o18(value);
  }
  if (!this.j1a_1.q16_1 && !isFinite(value)) {
    throw InvalidFloatingPointEncoded(value, toString(this.e1a_1.d18_1));
  }
};
protoOf(StreamingJsonEncoder).rp = function (value) {
  if (this.k1a_1) {
    this.tp(value.toString());
  } else {
    this.e1a_1.p18(value);
  }
  if (!this.j1a_1.q16_1 && !isFinite_0(value)) {
    throw InvalidFloatingPointEncoded(value, toString(this.e1a_1.d18_1));
  }
};
protoOf(StreamingJsonEncoder).sp = function (value) {
  this.tp(toString_1(value));
};
protoOf(StreamingJsonEncoder).tp = function (value) {
  return this.e1a_1.w18(value);
};
function get_isUnsignedNumber(_this__u8e3s4) {
  _init_properties_StreamingJsonEncoder_kt__pn1bsi();
  return _this__u8e3s4.cn() && get_unsignedNumberDescriptors().w1(_this__u8e3s4);
}
function get_isUnquotedLiteral(_this__u8e3s4) {
  _init_properties_StreamingJsonEncoder_kt__pn1bsi();
  return _this__u8e3s4.cn() && equals(_this__u8e3s4, get_jsonUnquotedLiteralDescriptor());
}
var properties_initialized_StreamingJsonEncoder_kt_6ifwwk;
function _init_properties_StreamingJsonEncoder_kt__pn1bsi() {
  if (!properties_initialized_StreamingJsonEncoder_kt_6ifwwk) {
    properties_initialized_StreamingJsonEncoder_kt_6ifwwk = true;
    unsignedNumberDescriptors = setOf([serializer_1(Companion_getInstance_0()).tl(), serializer_0(Companion_getInstance()).tl(), serializer_2(Companion_getInstance_1()).tl(), serializer_3(Companion_getInstance_2()).tl()]);
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
  _this__u8e3s4.r7(_Char___init__impl__6a9atx(34));
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
        _this__u8e3s4.fb(value, lastPos, i);
        _this__u8e3s4.q7(get_ESCAPE_STRINGS()[c]);
        lastPos = i + 1 | 0;
      }
    }
     while (inductionVariable <= last);
  if (!(lastPos === 0))
    _this__u8e3s4.fb(value, lastPos, value.length);
  else
    _this__u8e3s4.q7(value);
  _this__u8e3s4.r7(_Char___init__impl__6a9atx(34));
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
  throw JsonDecodingException_0(-1, "Failed to parse literal '" + literal.toString() + "' as " + type + ' value at element: ' + $this.c1d(tag), toString($this.d1d()));
}
function AbstractJsonTreeDecoder(json, value, polymorphicDiscriminator) {
  polymorphicDiscriminator = polymorphicDiscriminator === VOID ? null : polymorphicDiscriminator;
  NamedValueDecoder.call(this);
  this.y1c_1 = json;
  this.z1c_1 = value;
  this.a1d_1 = polymorphicDiscriminator;
  this.b1d_1 = this.x16().t14_1;
}
protoOf(AbstractJsonTreeDecoder).x16 = function () {
  return this.y1c_1;
};
protoOf(AbstractJsonTreeDecoder).l2 = function () {
  return this.z1c_1;
};
protoOf(AbstractJsonTreeDecoder).ep = function () {
  return this.x16().ep();
};
protoOf(AbstractJsonTreeDecoder).d1d = function () {
  var tmp0_safe_receiver = this.b12();
  var tmp;
  if (tmp0_safe_receiver == null) {
    tmp = null;
  } else {
    // Inline function 'kotlin.let' call
    tmp = this.e1d(tmp0_safe_receiver);
  }
  var tmp1_elvis_lhs = tmp;
  return tmp1_elvis_lhs == null ? this.l2() : tmp1_elvis_lhs;
};
protoOf(AbstractJsonTreeDecoder).c1d = function (currentTag) {
  return this.d12() + ('.' + currentTag);
};
protoOf(AbstractJsonTreeDecoder).y16 = function () {
  return this.d1d();
};
protoOf(AbstractJsonTreeDecoder).po = function (deserializer) {
  var tmp$ret$0;
  $l$block: {
    // Inline function 'kotlinx.serialization.json.internal.decodeSerializableValuePolymorphic' call
    var tmp;
    if (!(deserializer instanceof AbstractPolymorphicSerializer)) {
      tmp = true;
    } else {
      tmp = this.x16().t14_1.o16_1;
    }
    if (tmp) {
      tmp$ret$0 = deserializer.vl(this);
      break $l$block;
    }
    var discriminator = classDiscriminator(deserializer.tl(), this.x16());
    var tmp0 = this.y16();
    // Inline function 'kotlinx.serialization.json.internal.cast' call
    var serialName = deserializer.tl().an();
    if (!(tmp0 instanceof JsonObject)) {
      var tmp_0 = getKClass(JsonObject).w9();
      var tmp_1 = getKClassFromExpression(tmp0).w9();
      var tmp$ret$1 = this.d12();
      throw JsonDecodingException_0(-1, 'Expected ' + tmp_0 + ', but had ' + tmp_1 + ' as the serialized body of ' + serialName + ' at element: ' + tmp$ret$1, toString(tmp0));
    }
    var jsonTree = tmp0;
    var tmp0_safe_receiver = jsonTree.d17(discriminator);
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
    tmp$ret$0 = readPolymorphicJson(this.x16(), discriminator, jsonTree, actualSerializer);
  }
  return tmp$ret$0;
};
protoOf(AbstractJsonTreeDecoder).c12 = function (parentName, childName) {
  return childName;
};
protoOf(AbstractJsonTreeDecoder).qo = function (descriptor) {
  var currentObject = this.d1d();
  var tmp0_subject = descriptor.bn();
  var tmp;
  var tmp_0;
  if (equals(tmp0_subject, LIST_getInstance())) {
    tmp_0 = true;
  } else {
    tmp_0 = tmp0_subject instanceof PolymorphicKind;
  }
  if (tmp_0) {
    var tmp_1 = this.x16();
    // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
    // Inline function 'kotlinx.serialization.json.internal.cast' call
    var serialName = descriptor.an();
    if (!(currentObject instanceof JsonArray)) {
      var tmp_2 = getKClass(JsonArray).w9();
      var tmp_3 = getKClassFromExpression(currentObject).w9();
      var tmp$ret$0 = this.d12();
      throw JsonDecodingException_0(-1, 'Expected ' + tmp_2 + ', but had ' + tmp_3 + ' as the serialized body of ' + serialName + ' at element: ' + tmp$ret$0, toString(currentObject));
    }
    tmp = new JsonTreeListDecoder(tmp_1, currentObject);
  } else {
    if (equals(tmp0_subject, MAP_getInstance())) {
      // Inline function 'kotlinx.serialization.json.internal.selectMapMode' call
      var this_0 = this.x16();
      var keyDescriptor = carrierDescriptor(descriptor.in(0), this_0.ep());
      var keyKind = keyDescriptor.bn();
      var tmp_4;
      var tmp_5;
      if (keyKind instanceof PrimitiveKind) {
        tmp_5 = true;
      } else {
        tmp_5 = equals(keyKind, ENUM_getInstance());
      }
      if (tmp_5) {
        var tmp_6 = this.x16();
        // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
        // Inline function 'kotlinx.serialization.json.internal.cast' call
        var serialName_0 = descriptor.an();
        if (!(currentObject instanceof JsonObject)) {
          var tmp_7 = getKClass(JsonObject).w9();
          var tmp_8 = getKClassFromExpression(currentObject).w9();
          var tmp$ret$3 = this.d12();
          throw JsonDecodingException_0(-1, 'Expected ' + tmp_7 + ', but had ' + tmp_8 + ' as the serialized body of ' + serialName_0 + ' at element: ' + tmp$ret$3, toString(currentObject));
        }
        tmp_4 = new JsonTreeMapDecoder(tmp_6, currentObject);
      } else {
        if (this_0.t14_1.j16_1) {
          var tmp_9 = this.x16();
          // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
          // Inline function 'kotlinx.serialization.json.internal.cast' call
          var serialName_1 = descriptor.an();
          if (!(currentObject instanceof JsonArray)) {
            var tmp_10 = getKClass(JsonArray).w9();
            var tmp_11 = getKClassFromExpression(currentObject).w9();
            var tmp$ret$7 = this.d12();
            throw JsonDecodingException_0(-1, 'Expected ' + tmp_10 + ', but had ' + tmp_11 + ' as the serialized body of ' + serialName_1 + ' at element: ' + tmp$ret$7, toString(currentObject));
          }
          tmp_4 = new JsonTreeListDecoder(tmp_9, currentObject);
        } else {
          throw InvalidKeyKindException(keyDescriptor);
        }
      }
      tmp = tmp_4;
    } else {
      var tmp_12 = this.x16();
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
      // Inline function 'kotlinx.serialization.json.internal.cast' call
      var serialName_2 = descriptor.an();
      if (!(currentObject instanceof JsonObject)) {
        var tmp_13 = getKClass(JsonObject).w9();
        var tmp_14 = getKClassFromExpression(currentObject).w9();
        var tmp$ret$12 = this.d12();
        throw JsonDecodingException_0(-1, 'Expected ' + tmp_13 + ', but had ' + tmp_14 + ' as the serialized body of ' + serialName_2 + ' at element: ' + tmp$ret$12, toString(currentObject));
      }
      tmp = new JsonTreeDecoder(tmp_12, currentObject, this.a1d_1);
    }
  }
  return tmp;
};
protoOf(AbstractJsonTreeDecoder).ro = function (descriptor) {
};
protoOf(AbstractJsonTreeDecoder).co = function () {
  var tmp = this.d1d();
  return !(tmp instanceof JsonNull);
};
protoOf(AbstractJsonTreeDecoder).f1d = function (tag) {
  return !(this.e1d(tag) === JsonNull_getInstance());
};
protoOf(AbstractJsonTreeDecoder).f12 = function (tag) {
  return this.f1d((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE());
};
protoOf(AbstractJsonTreeDecoder).g1d = function (tag) {
  var tmp$ret$4;
  $l$block: {
    // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.getPrimitiveValue' call
    // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
    // Inline function 'kotlinx.serialization.json.internal.cast' call
    var value = this.e1d(tag);
    if (!(value instanceof JsonPrimitive)) {
      var tmp = getKClass(JsonPrimitive).w9();
      var tmp_0 = getKClassFromExpression(value).w9();
      var tmp$ret$0 = this.c1d(tag);
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
protoOf(AbstractJsonTreeDecoder).g12 = function (tag) {
  return this.g1d((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE());
};
protoOf(AbstractJsonTreeDecoder).h1d = function (tag) {
  var tmp$ret$5;
  $l$block: {
    // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.getPrimitiveValue' call
    // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
    // Inline function 'kotlinx.serialization.json.internal.cast' call
    var value = this.e1d(tag);
    if (!(value instanceof JsonPrimitive)) {
      var tmp = getKClass(JsonPrimitive).w9();
      var tmp_0 = getKClassFromExpression(value).w9();
      var tmp$ret$0 = this.c1d(tag);
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
protoOf(AbstractJsonTreeDecoder).h12 = function (tag) {
  return this.h1d((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE());
};
protoOf(AbstractJsonTreeDecoder).i1d = function (tag) {
  var tmp$ret$5;
  $l$block: {
    // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.getPrimitiveValue' call
    // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
    // Inline function 'kotlinx.serialization.json.internal.cast' call
    var value = this.e1d(tag);
    if (!(value instanceof JsonPrimitive)) {
      var tmp = getKClass(JsonPrimitive).w9();
      var tmp_0 = getKClassFromExpression(value).w9();
      var tmp$ret$0 = this.c1d(tag);
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
protoOf(AbstractJsonTreeDecoder).i12 = function (tag) {
  return this.i1d((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE());
};
protoOf(AbstractJsonTreeDecoder).j1d = function (tag) {
  var tmp$ret$5;
  $l$block: {
    // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.getPrimitiveValue' call
    // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
    // Inline function 'kotlinx.serialization.json.internal.cast' call
    var value = this.e1d(tag);
    if (!(value instanceof JsonPrimitive)) {
      var tmp = getKClass(JsonPrimitive).w9();
      var tmp_0 = getKClassFromExpression(value).w9();
      var tmp$ret$0 = this.c1d(tag);
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
protoOf(AbstractJsonTreeDecoder).j12 = function (tag) {
  return this.j1d((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE());
};
protoOf(AbstractJsonTreeDecoder).k1d = function (tag) {
  var tmp$ret$4;
  $l$block: {
    // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.getPrimitiveValue' call
    // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
    // Inline function 'kotlinx.serialization.json.internal.cast' call
    var value = this.e1d(tag);
    if (!(value instanceof JsonPrimitive)) {
      var tmp = getKClass(JsonPrimitive).w9();
      var tmp_0 = getKClassFromExpression(value).w9();
      var tmp$ret$0 = this.c1d(tag);
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
protoOf(AbstractJsonTreeDecoder).k12 = function (tag) {
  return this.k1d((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE());
};
protoOf(AbstractJsonTreeDecoder).l1d = function (tag) {
  var tmp$ret$4;
  $l$block: {
    // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.getPrimitiveValue' call
    // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
    // Inline function 'kotlinx.serialization.json.internal.cast' call
    var value = this.e1d(tag);
    if (!(value instanceof JsonPrimitive)) {
      var tmp = getKClass(JsonPrimitive).w9();
      var tmp_0 = getKClassFromExpression(value).w9();
      var tmp$ret$0 = this.c1d(tag);
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
  var specialFp = this.x16().t14_1.q16_1;
  if (specialFp || isFinite(result))
    return result;
  throw InvalidFloatingPointDecoded(result, tag, toString(this.d1d()));
};
protoOf(AbstractJsonTreeDecoder).l12 = function (tag) {
  return this.l1d((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE());
};
protoOf(AbstractJsonTreeDecoder).m1d = function (tag) {
  var tmp$ret$4;
  $l$block: {
    // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.getPrimitiveValue' call
    // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
    // Inline function 'kotlinx.serialization.json.internal.cast' call
    var value = this.e1d(tag);
    if (!(value instanceof JsonPrimitive)) {
      var tmp = getKClass(JsonPrimitive).w9();
      var tmp_0 = getKClassFromExpression(value).w9();
      var tmp$ret$0 = this.c1d(tag);
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
  var specialFp = this.x16().t14_1.q16_1;
  if (specialFp || isFinite_0(result))
    return result;
  throw InvalidFloatingPointDecoded(result, tag, toString(this.d1d()));
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
    var value = this.e1d(tag);
    if (!(value instanceof JsonPrimitive)) {
      var tmp = getKClass(JsonPrimitive).w9();
      var tmp_0 = getKClassFromExpression(value).w9();
      var tmp$ret$0 = this.c1d(tag);
      throw JsonDecodingException_0(-1, 'Expected ' + tmp + ', but had ' + tmp_0 + ' as the serialized body of ' + 'char' + ' at element: ' + tmp$ret$0, toString(value));
    }
    var literal = value;
    try {
      var tmp0_elvis_lhs = new Char(single(literal.a17()));
      var tmp_1;
      if (tmp0_elvis_lhs == null) {
        unparsedPrimitive(this, literal, 'char', tag);
      } else {
        tmp_1 = tmp0_elvis_lhs;
      }
      tmp$ret$4 = tmp_1.j1_1;
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
protoOf(AbstractJsonTreeDecoder).n12 = function (tag) {
  return this.n1d((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE());
};
protoOf(AbstractJsonTreeDecoder).o1d = function (tag) {
  // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
  // Inline function 'kotlinx.serialization.json.internal.cast' call
  var value = this.e1d(tag);
  if (!(value instanceof JsonPrimitive)) {
    var tmp = getKClass(JsonPrimitive).w9();
    var tmp_0 = getKClassFromExpression(value).w9();
    var tmp$ret$0 = this.c1d(tag);
    throw JsonDecodingException_0(-1, 'Expected ' + tmp + ', but had ' + tmp_0 + ' as the serialized body of ' + 'string' + ' at element: ' + tmp$ret$0, toString(value));
  }
  var value_0 = value;
  if (!(value_0 instanceof JsonLiteral))
    throw JsonDecodingException_0(-1, "Expected string value for a non-null key '" + tag + "', got null literal instead at element: " + this.c1d(tag), toString(this.d1d()));
  if (!value_0.i17_1 && !this.x16().t14_1.i16_1) {
    throw JsonDecodingException_0(-1, "String literal for key '" + tag + "' should be quoted at element: " + this.c1d(tag) + ".\nUse 'isLenient = true' in 'Json {}' builder to accept non-compliant JSON.", toString(this.d1d()));
  }
  return value_0.k17_1;
};
protoOf(AbstractJsonTreeDecoder).o12 = function (tag) {
  return this.o1d((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE());
};
protoOf(AbstractJsonTreeDecoder).p1d = function (tag, inlineDescriptor) {
  var tmp;
  if (get_isUnsignedNumber(inlineDescriptor)) {
    var tmp_0 = this.x16();
    // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.getPrimitiveValue' call
    var tmp2 = this.e1d(tag);
    // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
    // Inline function 'kotlinx.serialization.json.internal.cast' call
    var serialName = inlineDescriptor.an();
    if (!(tmp2 instanceof JsonPrimitive)) {
      var tmp_1 = getKClass(JsonPrimitive).w9();
      var tmp_2 = getKClassFromExpression(tmp2).w9();
      var tmp$ret$0 = this.c1d(tag);
      throw JsonDecodingException_0(-1, 'Expected ' + tmp_1 + ', but had ' + tmp_2 + ' as the serialized body of ' + serialName + ' at element: ' + tmp$ret$0, toString(tmp2));
    }
    var lexer = StringJsonLexer_0(tmp_0, tmp2.a17());
    tmp = new JsonDecoderForUnsignedTypes(lexer, this.x16());
  } else {
    tmp = protoOf(NamedValueDecoder).p12.call(this, tag, inlineDescriptor);
  }
  return tmp;
};
protoOf(AbstractJsonTreeDecoder).p12 = function (tag, inlineDescriptor) {
  return this.p1d((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE(), inlineDescriptor);
};
protoOf(AbstractJsonTreeDecoder).no = function (descriptor) {
  return !(this.b12() == null) ? protoOf(NamedValueDecoder).no.call(this, descriptor) : (new JsonPrimitiveDecoder(this.x16(), this.l2(), this.a1d_1)).no(descriptor);
};
function setForceNull($this, descriptor, index) {
  $this.z1d_1 = (!$this.x16().t14_1.l16_1 && !descriptor.jn(index) && descriptor.in(index).tm());
  return $this.z1d_1;
}
function JsonTreeDecoder(json, value, polymorphicDiscriminator, polyDescriptor) {
  polymorphicDiscriminator = polymorphicDiscriminator === VOID ? null : polymorphicDiscriminator;
  polyDescriptor = polyDescriptor === VOID ? null : polyDescriptor;
  AbstractJsonTreeDecoder.call(this, json, value, polymorphicDiscriminator);
  this.w1d_1 = value;
  this.x1d_1 = polyDescriptor;
  this.y1d_1 = 0;
  this.z1d_1 = false;
}
protoOf(JsonTreeDecoder).l2 = function () {
  return this.w1d_1;
};
protoOf(JsonTreeDecoder).gp = function (descriptor) {
  $l$loop: while (this.y1d_1 < descriptor.dn()) {
    var _unary__edvuaz = this.y1d_1;
    this.y1d_1 = _unary__edvuaz + 1 | 0;
    var name = this.w11(descriptor, _unary__edvuaz);
    var index = this.y1d_1 - 1 | 0;
    this.z1d_1 = false;
    var tmp;
    // Inline function 'kotlin.collections.contains' call
    // Inline function 'kotlin.collections.containsKey' call
    var this_0 = this.l2();
    if ((isInterface(this_0, KtMap) ? this_0 : THROW_CCE()).h2(name)) {
      tmp = true;
    } else {
      tmp = setForceNull(this, descriptor, index);
    }
    if (tmp) {
      if (!this.b1d_1.n16_1)
        return index;
      var tmp0 = this.x16();
      var tmp$ret$3;
      $l$block_2: {
        // Inline function 'kotlinx.serialization.json.internal.tryCoerceValue' call
        var isOptional = descriptor.jn(index);
        var elementDescriptor = descriptor.in(index);
        var tmp_0;
        if (isOptional && !elementDescriptor.tm()) {
          var tmp_1 = this.a1e(name);
          tmp_0 = tmp_1 instanceof JsonNull;
        } else {
          tmp_0 = false;
        }
        if (tmp_0) {
          tmp$ret$3 = true;
          break $l$block_2;
        }
        if (equals(elementDescriptor.bn(), ENUM_getInstance())) {
          var tmp_2;
          if (elementDescriptor.tm()) {
            var tmp_3 = this.a1e(name);
            tmp_2 = tmp_3 instanceof JsonNull;
          } else {
            tmp_2 = false;
          }
          if (tmp_2) {
            tmp$ret$3 = false;
            break $l$block_2;
          }
          var tmp_4 = this.a1e(name);
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
          var coerceToNull = !tmp0.t14_1.l16_1 && elementDescriptor.tm();
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
protoOf(JsonTreeDecoder).co = function () {
  return !this.z1d_1 && protoOf(AbstractJsonTreeDecoder).co.call(this);
};
protoOf(JsonTreeDecoder).x11 = function (descriptor, index) {
  var strategy = namingStrategy(descriptor, this.x16());
  var baseName = descriptor.fn(index);
  if (strategy == null) {
    if (!this.b1d_1.r16_1)
      return baseName;
    if (this.l2().e2().w1(baseName))
      return baseName;
  }
  var deserializationNamesMap_0 = deserializationNamesMap(this.x16(), descriptor);
  // Inline function 'kotlin.collections.find' call
  var tmp0 = this.l2().e2();
  var tmp$ret$1;
  $l$block: {
    // Inline function 'kotlin.collections.firstOrNull' call
    var _iterator__ex2g4s = tmp0.q();
    while (_iterator__ex2g4s.r()) {
      var element = _iterator__ex2g4s.s();
      if (deserializationNamesMap_0.j2(element) === index) {
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
  var fallbackName = strategy == null ? null : strategy.r19(descriptor, index, baseName);
  return fallbackName == null ? baseName : fallbackName;
};
protoOf(JsonTreeDecoder).e1d = function (tag) {
  return getValue(this.l2(), tag);
};
protoOf(JsonTreeDecoder).a1e = function (tag) {
  return this.l2().d17(tag);
};
protoOf(JsonTreeDecoder).qo = function (descriptor) {
  if (descriptor === this.x1d_1) {
    var tmp = this.x16();
    var tmp2 = this.d1d();
    // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
    // Inline function 'kotlinx.serialization.json.internal.cast' call
    var serialName = this.x1d_1.an();
    if (!(tmp2 instanceof JsonObject)) {
      var tmp_0 = getKClass(JsonObject).w9();
      var tmp_1 = getKClassFromExpression(tmp2).w9();
      var tmp$ret$0 = this.d12();
      throw JsonDecodingException_0(-1, 'Expected ' + tmp_0 + ', but had ' + tmp_1 + ' as the serialized body of ' + serialName + ' at element: ' + tmp$ret$0, toString(tmp2));
    }
    return new JsonTreeDecoder(tmp, tmp2, this.a1d_1, this.x1d_1);
  }
  return protoOf(AbstractJsonTreeDecoder).qo.call(this, descriptor);
};
protoOf(JsonTreeDecoder).ro = function (descriptor) {
  var tmp;
  if (ignoreUnknownKeys(descriptor, this.x16())) {
    tmp = true;
  } else {
    var tmp_0 = descriptor.bn();
    tmp = tmp_0 instanceof PolymorphicKind;
  }
  if (tmp)
    return Unit_instance;
  var strategy = namingStrategy(descriptor, this.x16());
  var tmp_1;
  if (strategy == null && !this.b1d_1.r16_1) {
    tmp_1 = jsonCachedSerialNames(descriptor);
  } else if (!(strategy == null)) {
    tmp_1 = deserializationNamesMap(this.x16(), descriptor).e2();
  } else {
    var tmp_2 = jsonCachedSerialNames(descriptor);
    var tmp0_safe_receiver = get_schemaCache(this.x16()).c1c(descriptor, get_JsonDeserializationNamesKey());
    // Inline function 'kotlin.collections.orEmpty' call
    var tmp0_elvis_lhs = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.e2();
    var tmp$ret$0 = tmp0_elvis_lhs == null ? emptySet() : tmp0_elvis_lhs;
    tmp_1 = plus_0(tmp_2, tmp$ret$0);
  }
  var names = tmp_1;
  var _iterator__ex2g4s = this.l2().e2().q();
  while (_iterator__ex2g4s.r()) {
    var key = _iterator__ex2g4s.s();
    if (!names.w1(key) && !(key === this.a1d_1)) {
      throw JsonDecodingException_1(-1, "Encountered an unknown key '" + key + "' at element: " + this.d12() + '\n' + "Use 'ignoreUnknownKeys = true' in 'Json {}' builder or '@JsonIgnoreUnknownKeys' annotation to ignore unknown keys.\n" + ('JSON input: ' + toString(minify(this.l2().toString()))));
    }
  }
};
function JsonTreeListDecoder(json, value) {
  AbstractJsonTreeDecoder.call(this, json, value);
  this.h1e_1 = value;
  this.i1e_1 = this.h1e_1.t();
  this.j1e_1 = -1;
}
protoOf(JsonTreeListDecoder).l2 = function () {
  return this.h1e_1;
};
protoOf(JsonTreeListDecoder).x11 = function (descriptor, index) {
  return index.toString();
};
protoOf(JsonTreeListDecoder).e1d = function (tag) {
  return this.h1e_1.v(toInt(tag));
};
protoOf(JsonTreeListDecoder).gp = function (descriptor) {
  while (this.j1e_1 < (this.i1e_1 - 1 | 0)) {
    this.j1e_1 = this.j1e_1 + 1 | 0;
    return this.j1e_1;
  }
  return -1;
};
function JsonPrimitiveDecoder(json, value, polymorphicDiscriminator) {
  polymorphicDiscriminator = polymorphicDiscriminator === VOID ? null : polymorphicDiscriminator;
  AbstractJsonTreeDecoder.call(this, json, value, polymorphicDiscriminator);
  this.q1e_1 = value;
  this.q12('primitive');
}
protoOf(JsonPrimitiveDecoder).l2 = function () {
  return this.q1e_1;
};
protoOf(JsonPrimitiveDecoder).gp = function (descriptor) {
  return 0;
};
protoOf(JsonPrimitiveDecoder).e1d = function (tag) {
  // Inline function 'kotlin.require' call
  if (!(tag === 'primitive')) {
    var message = "This input can only handle primitives with 'primitive' tag";
    throw IllegalArgumentException_init_$Create$(toString(message));
  }
  return this.q1e_1;
};
function JsonTreeMapDecoder(json, value) {
  JsonTreeDecoder.call(this, json, value);
  this.b1f_1 = value;
  this.c1f_1 = toList(this.b1f_1.e2());
  this.d1f_1 = imul(this.c1f_1.t(), 2);
  this.e1f_1 = -1;
}
protoOf(JsonTreeMapDecoder).l2 = function () {
  return this.b1f_1;
};
protoOf(JsonTreeMapDecoder).x11 = function (descriptor, index) {
  var i = index / 2 | 0;
  return this.c1f_1.v(i);
};
protoOf(JsonTreeMapDecoder).gp = function (descriptor) {
  while (this.e1f_1 < (this.d1f_1 - 1 | 0)) {
    this.e1f_1 = this.e1f_1 + 1 | 0;
    return this.e1f_1;
  }
  return -1;
};
protoOf(JsonTreeMapDecoder).e1d = function (tag) {
  return (this.e1f_1 % 2 | 0) === 0 ? JsonPrimitive_0(tag) : getValue(this.b1f_1, tag);
};
protoOf(JsonTreeMapDecoder).ro = function (descriptor) {
};
function readPolymorphicJson(_this__u8e3s4, discriminator, element, deserializer) {
  return (new JsonTreeDecoder(_this__u8e3s4, element, discriminator, deserializer.tl())).po(deserializer);
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
  this.p1c_1 = begin;
  this.q1c_1 = end;
}
function switchMode(_this__u8e3s4, desc) {
  var tmp0_subject = desc.bn();
  var tmp;
  if (tmp0_subject instanceof PolymorphicKind) {
    tmp = WriteMode_POLY_OBJ_getInstance();
  } else {
    if (equals(tmp0_subject, LIST_getInstance())) {
      tmp = WriteMode_LIST_getInstance();
    } else {
      if (equals(tmp0_subject, MAP_getInstance())) {
        // Inline function 'kotlinx.serialization.json.internal.selectMapMode' call
        var keyDescriptor = carrierDescriptor(desc.in(0), _this__u8e3s4.ep());
        var keyKind = keyDescriptor.bn();
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
          if (_this__u8e3s4.t14_1.j16_1) {
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
  if (equals(_this__u8e3s4.bn(), CONTEXTUAL_getInstance())) {
    var tmp0_safe_receiver = getContextualDescriptor(module_0, _this__u8e3s4);
    var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : carrierDescriptor(tmp0_safe_receiver, module_0);
    tmp = tmp1_elvis_lhs == null ? _this__u8e3s4 : tmp1_elvis_lhs;
  } else if (_this__u8e3s4.cn()) {
    tmp = carrierDescriptor(_this__u8e3s4.in(0), module_0);
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
  $this.f1f(lastPosition, current);
  return appendEsc($this, current + 1 | 0);
}
function decodedString($this, lastPosition, currentPosition) {
  $this.f1f(lastPosition, currentPosition);
  var result = $this.l15_1.toString();
  $this.l15_1.lb(0);
  return result;
}
function takePeeked($this) {
  // Inline function 'kotlin.also' call
  var this_0 = ensureNotNull($this.k15_1);
  $this.k15_1 = null;
  return this_0;
}
function wasUnquotedString($this) {
  return !(charSequenceGet($this.g1f(), $this.i15_1 - 1 | 0) === _Char___init__impl__6a9atx(34));
}
function appendEsc($this, startPosition) {
  var currentPosition = startPosition;
  currentPosition = $this.h1f(currentPosition);
  if (currentPosition === -1) {
    $this.n19('Expected escape sequence to continue, got EOF');
  }
  var tmp = $this.g1f();
  var _unary__edvuaz = currentPosition;
  currentPosition = _unary__edvuaz + 1 | 0;
  var currentChar = charSequenceGet(tmp, _unary__edvuaz);
  if (currentChar === _Char___init__impl__6a9atx(117)) {
    return appendHex($this, $this.g1f(), currentPosition);
  }
  // Inline function 'kotlin.code' call
  var tmp$ret$0 = Char__toInt_impl_vasixd(currentChar);
  var c = escapeToChar(tmp$ret$0);
  if (c === _Char___init__impl__6a9atx(0)) {
    $this.n19("Invalid escaped char '" + toString_1(currentChar) + "'");
  }
  $this.l15_1.r7(c);
  return currentPosition;
}
function appendHex($this, source, startPos) {
  if ((startPos + 4 | 0) >= charSequenceLength(source)) {
    $this.i15_1 = startPos;
    $this.i1f();
    if (($this.i15_1 + 4 | 0) >= charSequenceLength(source)) {
      $this.n19('Unexpected EOF during unicode escape');
    }
    return appendHex($this, source, $this.i15_1);
  }
  $this.l15_1.r7(numberToChar((((fromHexChar($this, source, startPos) << 12) + (fromHexChar($this, source, startPos + 1 | 0) << 8) | 0) + (fromHexChar($this, source, startPos + 2 | 0) << 4) | 0) + fromHexChar($this, source, startPos + 3 | 0) | 0));
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
    $this.n19("Invalid toHexChar char '" + toString_1(character) + "' in unicode escape");
  }
  return tmp;
}
function consumeBoolean2($this, start) {
  var current = $this.h1f(start);
  if (current >= charSequenceLength($this.g1f()) || current === -1) {
    $this.n19('EOF');
  }
  var tmp = $this.g1f();
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
      $this.n19("Expected valid boolean literal prefix, but had '" + $this.v1a() + "'");
    }
  }
  return tmp_0;
}
function consumeBooleanLiteral($this, literalSuffix, current) {
  if ((charSequenceLength($this.g1f()) - current | 0) < literalSuffix.length) {
    $this.n19('Unexpected end of boolean literal');
  }
  var inductionVariable = 0;
  var last = charSequenceLength(literalSuffix) - 1 | 0;
  if (inductionVariable <= last)
    do {
      var i = inductionVariable;
      inductionVariable = inductionVariable + 1 | 0;
      var expected = charCodeAt(literalSuffix, i);
      var actual = charSequenceGet($this.g1f(), current + i | 0);
      // Inline function 'kotlin.code' call
      var tmp = Char__toInt_impl_vasixd(expected);
      // Inline function 'kotlin.code' call
      if (!(tmp === (Char__toInt_impl_vasixd(actual) | 32))) {
        $this.n19("Expected valid boolean literal prefix, but had '" + $this.v1a() + "'");
      }
    }
     while (inductionVariable <= last);
  $this.i15_1 = current + literalSuffix.length | 0;
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
  this.i15_1 = 0;
  this.j15_1 = new JsonPath();
  this.k15_1 = null;
  this.l15_1 = StringBuilder_init_$Create$();
}
protoOf(AbstractJsonLexer).i1f = function () {
};
protoOf(AbstractJsonLexer).f1c = function () {
  var current = this.j1f();
  var source = this.g1f();
  if (current >= charSequenceLength(source) || current === -1)
    return false;
  if (charSequenceGet(source, current) === _Char___init__impl__6a9atx(44)) {
    this.i15_1 = this.i15_1 + 1 | 0;
    return true;
  }
  return false;
};
protoOf(AbstractJsonLexer).k1f = function (c) {
  return c === _Char___init__impl__6a9atx(125) || c === _Char___init__impl__6a9atx(93) || (c === _Char___init__impl__6a9atx(58) || c === _Char___init__impl__6a9atx(44)) ? false : true;
};
protoOf(AbstractJsonLexer).m15 = function () {
  var nextToken = this.x1a();
  if (!(nextToken === 10)) {
    this.n19('Expected EOF after parsing, but had ' + toString_1(charSequenceGet(this.g1f(), this.i15_1 - 1 | 0)) + ' instead');
  }
};
protoOf(AbstractJsonLexer).r1a = function (expected) {
  var token = this.x1a();
  if (!(token === expected)) {
    // Inline function 'kotlinx.serialization.json.internal.AbstractJsonLexer.fail' call
    var expected_0 = tokenDescription(expected);
    var position = true ? this.i15_1 - 1 | 0 : this.i15_1;
    var s = this.i15_1 === charSequenceLength(this.g1f()) || position < 0 ? 'EOF' : toString_1(charSequenceGet(this.g1f(), position));
    var tmp$ret$0 = 'Expected ' + expected_0 + ", but had '" + s + "' instead";
    this.n19(tmp$ret$0, position);
  }
  return token;
};
protoOf(AbstractJsonLexer).l1f = function (expected) {
  if (this.i15_1 > 0 && expected === _Char___init__impl__6a9atx(34)) {
    var tmp$ret$1;
    $l$block: {
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonLexer.withPositionRollback' call
      var snapshot = this.i15_1;
      try {
        this.i15_1 = this.i15_1 - 1 | 0;
        tmp$ret$1 = this.v1a();
        break $l$block;
      }finally {
        this.i15_1 = snapshot;
      }
    }
    var inputLiteral = tmp$ret$1;
    if (inputLiteral === 'null') {
      this.m19("Expected string literal but 'null' literal was found", this.i15_1 - 1 | 0, "Use 'coerceInputValues = true' in 'Json {}' builder to coerce nulls if property has a default value.");
    }
  }
  // Inline function 'kotlinx.serialization.json.internal.AbstractJsonLexer.fail' call
  var expectedToken = charToTokenClass(expected);
  var expected_0 = tokenDescription(expectedToken);
  var position = true ? this.i15_1 - 1 | 0 : this.i15_1;
  var s = this.i15_1 === charSequenceLength(this.g1f()) || position < 0 ? 'EOF' : toString_1(charSequenceGet(this.g1f(), position));
  var tmp$ret$2 = 'Expected ' + expected_0 + ", but had '" + s + "' instead";
  this.n19(tmp$ret$2, position);
};
protoOf(AbstractJsonLexer).s1a = function () {
  var source = this.g1f();
  var cpos = this.i15_1;
  $l$loop_0: while (true) {
    cpos = this.h1f(cpos);
    if (cpos === -1)
      break $l$loop_0;
    var ch = charSequenceGet(source, cpos);
    if (ch === _Char___init__impl__6a9atx(32) || ch === _Char___init__impl__6a9atx(10) || ch === _Char___init__impl__6a9atx(13) || ch === _Char___init__impl__6a9atx(9)) {
      cpos = cpos + 1 | 0;
      continue $l$loop_0;
    }
    this.i15_1 = cpos;
    return charToTokenClass(ch);
  }
  this.i15_1 = cpos;
  return 10;
};
protoOf(AbstractJsonLexer).g1c = function (doConsume) {
  var current = this.j1f();
  current = this.h1f(current);
  var len = charSequenceLength(this.g1f()) - current | 0;
  if (len < 4 || current === -1)
    return false;
  var inductionVariable = 0;
  if (inductionVariable <= 3)
    do {
      var i = inductionVariable;
      inductionVariable = inductionVariable + 1 | 0;
      if (!(charCodeAt('null', i) === charSequenceGet(this.g1f(), current + i | 0)))
        return false;
    }
     while (inductionVariable <= 3);
  if (len > 4 && charToTokenClass(charSequenceGet(this.g1f(), current + 4 | 0)) === 0)
    return false;
  if (doConsume) {
    this.i15_1 = current + 4 | 0;
  }
  return true;
};
protoOf(AbstractJsonLexer).r1c = function (doConsume, $super) {
  doConsume = doConsume === VOID ? true : doConsume;
  return $super === VOID ? this.g1c(doConsume) : $super.g1c.call(this, doConsume);
};
protoOf(AbstractJsonLexer).h1c = function (isLenient) {
  var token = this.s1a();
  var tmp;
  if (isLenient) {
    if (!(token === 1) && !(token === 0))
      return null;
    tmp = this.v1a();
  } else {
    if (!(token === 1))
      return null;
    tmp = this.u1a();
  }
  var string = tmp;
  this.k15_1 = string;
  return string;
};
protoOf(AbstractJsonLexer).m1f = function () {
  this.k15_1 = null;
};
protoOf(AbstractJsonLexer).mb = function (startPos, endPos) {
  // Inline function 'kotlin.text.substring' call
  var this_0 = this.g1f();
  return toString(charSequenceSubSequence(this_0, startPos, endPos));
};
protoOf(AbstractJsonLexer).u1a = function () {
  if (!(this.k15_1 == null)) {
    return takePeeked(this);
  }
  return this.k1c();
};
protoOf(AbstractJsonLexer).consumeString2 = function (source, startPosition, current) {
  var currentPosition = current;
  var lastPosition = startPosition;
  var char = charSequenceGet(source, currentPosition);
  var usedAppend = false;
  while (!(char === _Char___init__impl__6a9atx(34))) {
    if (char === _Char___init__impl__6a9atx(92)) {
      usedAppend = true;
      currentPosition = this.h1f(appendEscape(this, lastPosition, currentPosition));
      if (currentPosition === -1) {
        this.n19('Unexpected EOF', currentPosition);
      }
      lastPosition = currentPosition;
    } else {
      currentPosition = currentPosition + 1 | 0;
      if (currentPosition >= charSequenceLength(source)) {
        usedAppend = true;
        this.f1f(lastPosition, currentPosition);
        currentPosition = this.h1f(currentPosition);
        if (currentPosition === -1) {
          this.n19('Unexpected EOF', currentPosition);
        }
        lastPosition = currentPosition;
      }
    }
    char = charSequenceGet(source, currentPosition);
  }
  var tmp;
  if (!usedAppend) {
    tmp = this.mb(lastPosition, currentPosition);
  } else {
    tmp = decodedString(this, lastPosition, currentPosition);
  }
  var string = tmp;
  this.i15_1 = currentPosition + 1 | 0;
  return string;
};
protoOf(AbstractJsonLexer).l1c = function () {
  var result = this.v1a();
  if (result === 'null' && wasUnquotedString(this)) {
    this.n19("Unexpected 'null' value instead of string literal");
  }
  return result;
};
protoOf(AbstractJsonLexer).v1a = function () {
  if (!(this.k15_1 == null)) {
    return takePeeked(this);
  }
  var current = this.j1f();
  if (current >= charSequenceLength(this.g1f()) || current === -1) {
    this.n19('EOF', current);
  }
  var token = charToTokenClass(charSequenceGet(this.g1f(), current));
  if (token === 1) {
    return this.u1a();
  }
  if (!(token === 0)) {
    this.n19('Expected beginning of the string, but got ' + toString_1(charSequenceGet(this.g1f(), current)));
  }
  var usedAppend = false;
  while (charToTokenClass(charSequenceGet(this.g1f(), current)) === 0) {
    current = current + 1 | 0;
    if (current >= charSequenceLength(this.g1f())) {
      usedAppend = true;
      this.f1f(this.i15_1, current);
      var eof = this.h1f(current);
      if (eof === -1) {
        this.i15_1 = current;
        return decodedString(this, 0, 0);
      } else {
        current = eof;
      }
    }
  }
  var tmp;
  if (!usedAppend) {
    tmp = this.mb(this.i15_1, current);
  } else {
    tmp = decodedString(this, this.i15_1, current);
  }
  var result = tmp;
  this.i15_1 = current;
  return result;
};
protoOf(AbstractJsonLexer).f1f = function (fromIndex, toIndex) {
  this.l15_1.fb(this.g1f(), fromIndex, toIndex);
};
protoOf(AbstractJsonLexer).j1c = function (allowLenientStrings) {
  // Inline function 'kotlin.collections.mutableListOf' call
  var tokenStack = ArrayList_init_$Create$();
  var lastToken = this.s1a();
  if (!(lastToken === 8) && !(lastToken === 6)) {
    this.v1a();
    return Unit_instance;
  }
  $l$loop: while (true) {
    lastToken = this.s1a();
    if (lastToken === 1) {
      if (allowLenientStrings)
        this.v1a();
      else
        this.k1c();
      continue $l$loop;
    }
    var tmp0_subject = lastToken;
    if (tmp0_subject === 8 || tmp0_subject === 6) {
      tokenStack.i(lastToken);
    } else if (tmp0_subject === 9) {
      if (!(last(tokenStack) === 8))
        throw JsonDecodingException_0(this.i15_1, 'found ] instead of } at path: ' + this.j15_1.toString(), this.g1f());
      removeLast(tokenStack);
    } else if (tmp0_subject === 7) {
      if (!(last(tokenStack) === 6))
        throw JsonDecodingException_0(this.i15_1, 'found } instead of ] at path: ' + this.j15_1.toString(), this.g1f());
      removeLast(tokenStack);
    } else if (tmp0_subject === 10) {
      this.n19('Unexpected end of input due to malformed JSON during ignoring unknown keys');
    }
    this.x1a();
    if (tokenStack.t() === 0)
      return Unit_instance;
  }
};
protoOf(AbstractJsonLexer).toString = function () {
  return "JsonReader(source='" + toString(this.g1f()) + "', currentPosition=" + this.i15_1 + ')';
};
protoOf(AbstractJsonLexer).i1c = function (key) {
  var processed = this.mb(0, this.i15_1);
  var lastIndexOf_0 = lastIndexOf(processed, key);
  throw new JsonDecodingException("Encountered an unknown key '" + key + "' at offset " + lastIndexOf_0 + ' at path: ' + this.j15_1.a1a() + "\nUse 'ignoreUnknownKeys = true' in 'Json {}' builder or '@JsonIgnoreUnknownKeys' annotation to ignore unknown keys.\n" + ('JSON input: ' + toString(minify(this.g1f(), lastIndexOf_0))));
};
protoOf(AbstractJsonLexer).m19 = function (message, position, hint) {
  var tmp;
  // Inline function 'kotlin.text.isEmpty' call
  if (charSequenceLength(hint) === 0) {
    tmp = '';
  } else {
    tmp = '\n' + hint;
  }
  var hintMessage = tmp;
  throw JsonDecodingException_0(position, message + ' at path: ' + this.j15_1.a1a() + hintMessage, this.g1f());
};
protoOf(AbstractJsonLexer).n19 = function (message, position, hint, $super) {
  position = position === VOID ? this.i15_1 : position;
  hint = hint === VOID ? '' : hint;
  return $super === VOID ? this.m19(message, position, hint) : $super.m19.call(this, message, position, hint);
};
protoOf(AbstractJsonLexer).t1c = function () {
  var current = this.j1f();
  current = this.h1f(current);
  if (current >= charSequenceLength(this.g1f()) || current === -1) {
    this.n19('EOF');
  }
  var tmp;
  if (charSequenceGet(this.g1f(), current) === _Char___init__impl__6a9atx(34)) {
    current = current + 1 | 0;
    if (current === charSequenceLength(this.g1f())) {
      this.n19('EOF');
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
  $l$loop_4: while (!(current === charSequenceLength(this.g1f()))) {
    var ch = charSequenceGet(this.g1f(), current);
    if ((ch === _Char___init__impl__6a9atx(101) || ch === _Char___init__impl__6a9atx(69)) && !hasExponent) {
      if (current === start) {
        this.n19('Unexpected symbol ' + toString_1(ch) + ' in numeric literal');
      }
      isExponentPositive = true;
      hasExponent = true;
      current = current + 1 | 0;
      continue $l$loop_4;
    }
    if (ch === _Char___init__impl__6a9atx(45) && hasExponent) {
      if (current === start) {
        this.n19("Unexpected symbol '-' in numeric literal");
      }
      isExponentPositive = false;
      current = current + 1 | 0;
      continue $l$loop_4;
    }
    if (ch === _Char___init__impl__6a9atx(43) && hasExponent) {
      if (current === start) {
        this.n19("Unexpected symbol '+' in numeric literal");
      }
      isExponentPositive = true;
      current = current + 1 | 0;
      continue $l$loop_4;
    }
    if (ch === _Char___init__impl__6a9atx(45)) {
      if (!(current === start)) {
        this.n19("Unexpected symbol '-' in numeric literal");
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
      this.n19("Unexpected symbol '" + toString_1(ch) + "' in numeric literal");
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
      this.n19('Numeric value overflow');
    }
  }
  var hasChars = !(current === start);
  if (start === current || (isNegative && start === (current - 1 | 0))) {
    this.n19('Expected numeric literal');
  }
  if (hasQuotation) {
    if (!hasChars) {
      this.n19('EOF');
    }
    if (!(charSequenceGet(this.g1f(), current) === _Char___init__impl__6a9atx(34))) {
      this.n19('Expected closing quotation mark');
    }
    current = current + 1 | 0;
  }
  this.i15_1 = current;
  if (hasExponent) {
    var doubleAccumulator = toNumber(accumulator) * consumeNumericLiteral$calculateExponent(exponentAccumulator, isExponentPositive);
    if (doubleAccumulator > toNumber(new Long(-1, 2147483647)) || doubleAccumulator < toNumber(new Long(0, -2147483648))) {
      this.n19('Numeric value overflow');
    }
    // Inline function 'kotlin.math.floor' call
    if (!(Math.floor(doubleAccumulator) === doubleAccumulator)) {
      this.n19("Can't convert " + doubleAccumulator + ' to Long');
    }
    accumulator = numberToLong(doubleAccumulator);
  }
  var tmp_0;
  if (isNegative) {
    tmp_0 = accumulator;
  } else if (!equalsLong(accumulator, new Long(0, -2147483648))) {
    tmp_0 = negate(accumulator);
  } else {
    this.n19('Numeric value overflow');
  }
  return tmp_0;
};
protoOf(AbstractJsonLexer).l17 = function () {
  var result = this.t1c();
  var next = this.x1a();
  if (!(next === 10)) {
    // Inline function 'kotlinx.serialization.json.internal.AbstractJsonLexer.fail' call
    var expected = tokenDescription(10);
    var position = true ? this.i15_1 - 1 | 0 : this.i15_1;
    var s = this.i15_1 === charSequenceLength(this.g1f()) || position < 0 ? 'EOF' : toString_1(charSequenceGet(this.g1f(), position));
    var tmp$ret$0 = "Expected input to contain a single valid number, but got '" + s + "' after it";
    this.n19(tmp$ret$0, position);
  }
  return result;
};
protoOf(AbstractJsonLexer).s1c = function () {
  var current = this.j1f();
  if (current === charSequenceLength(this.g1f())) {
    this.n19('EOF');
  }
  var tmp;
  if (charSequenceGet(this.g1f(), current) === _Char___init__impl__6a9atx(34)) {
    current = current + 1 | 0;
    tmp = true;
  } else {
    tmp = false;
  }
  var hasQuotation = tmp;
  var result = consumeBoolean2(this, current);
  if (hasQuotation) {
    if (this.i15_1 === charSequenceLength(this.g1f())) {
      this.n19('EOF');
    }
    if (!(charSequenceGet(this.g1f(), this.i15_1) === _Char___init__impl__6a9atx(34))) {
      this.n19('Expected closing quotation mark');
    }
    this.i15_1 = this.i15_1 + 1 | 0;
  }
  return result;
};
function charToTokenClass(c) {
  var tmp;
  // Inline function 'kotlin.code' call
  if (Char__toInt_impl_vasixd(c) < 126) {
    var tmp_0 = CharMappings_getInstance().o1f_1;
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
  return c < 117 ? CharMappings_getInstance().n1f_1[c] : _Char___init__impl__6a9atx(0);
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
    $this.n1f_1[tmp$ret$0] = numberToChar(c);
  }
}
function initC2ESC_0($this, c, esc) {
  // Inline function 'kotlin.code' call
  var tmp$ret$0 = Char__toInt_impl_vasixd(c);
  return initC2ESC($this, tmp$ret$0, esc);
}
function initC2TC($this, c, cl) {
  $this.o1f_1[c] = cl;
}
function initC2TC_0($this, c, cl) {
  // Inline function 'kotlin.code' call
  var tmp$ret$0 = Char__toInt_impl_vasixd(c);
  return initC2TC($this, tmp$ret$0, cl);
}
function CharMappings() {
  CharMappings_instance = this;
  this.n1f_1 = charArray(117);
  this.o1f_1 = new Int8Array(126);
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
protoOf(StringJsonLexerWithComments).x1a = function () {
  var source = this.g1f();
  var cpos = this.j1f();
  if (cpos >= source.length || cpos === -1)
    return 10;
  this.i15_1 = cpos + 1 | 0;
  return charToTokenClass(charCodeAt(source, cpos));
};
protoOf(StringJsonLexerWithComments).t1a = function () {
  var current = this.j1f();
  if (current >= this.g1f().length || current === -1)
    return false;
  return this.k1f(charCodeAt(this.g1f(), current));
};
protoOf(StringJsonLexerWithComments).e1c = function (expected) {
  var source = this.g1f();
  var current = this.j1f();
  if (current >= source.length || current === -1) {
    this.i15_1 = -1;
    this.l1f(expected);
  }
  var c = charCodeAt(source, current);
  this.i15_1 = current + 1 | 0;
  if (c === expected)
    return Unit_instance;
  else {
    this.l1f(expected);
  }
};
protoOf(StringJsonLexerWithComments).s1a = function () {
  var source = this.g1f();
  var cpos = this.j1f();
  if (cpos >= source.length || cpos === -1)
    return 10;
  this.i15_1 = cpos;
  return charToTokenClass(charCodeAt(source, cpos));
};
protoOf(StringJsonLexerWithComments).j1f = function () {
  var current = this.i15_1;
  if (current === -1)
    return current;
  var source = this.g1f();
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
          this.i15_1 = source.length;
          this.n19('Expected end of the block comment: "*/", but had EOF instead');
        } else {
          current = current + 2 | 0;
        }
        continue $l$loop_1;
      }
    }
    break $l$loop_1;
  }
  this.i15_1 = current;
  return current;
};
function StringJsonLexer(source) {
  AbstractJsonLexer.call(this);
  this.y1f_1 = source;
}
protoOf(StringJsonLexer).g1f = function () {
  return this.y1f_1;
};
protoOf(StringJsonLexer).h1f = function (position) {
  return position < this.g1f().length ? position : -1;
};
protoOf(StringJsonLexer).x1a = function () {
  var source = this.g1f();
  var cpos = this.i15_1;
  $l$loop: while (!(cpos === -1) && cpos < source.length) {
    var _unary__edvuaz = cpos;
    cpos = _unary__edvuaz + 1 | 0;
    var c = charCodeAt(source, _unary__edvuaz);
    // Inline function 'kotlinx.serialization.json.internal.AbstractJsonLexer.isWs' call
    if (c === _Char___init__impl__6a9atx(32) || c === _Char___init__impl__6a9atx(10) || c === _Char___init__impl__6a9atx(13) || c === _Char___init__impl__6a9atx(9))
      continue $l$loop;
    this.i15_1 = cpos;
    return charToTokenClass(c);
  }
  this.i15_1 = source.length;
  return 10;
};
protoOf(StringJsonLexer).t1a = function () {
  var current = this.i15_1;
  if (current === -1)
    return false;
  var source = this.g1f();
  $l$loop: while (current < source.length) {
    var c = charCodeAt(source, current);
    // Inline function 'kotlinx.serialization.json.internal.AbstractJsonLexer.isWs' call
    if (c === _Char___init__impl__6a9atx(32) || c === _Char___init__impl__6a9atx(10) || c === _Char___init__impl__6a9atx(13) || c === _Char___init__impl__6a9atx(9)) {
      current = current + 1 | 0;
      continue $l$loop;
    }
    this.i15_1 = current;
    return this.k1f(c);
  }
  this.i15_1 = current;
  return false;
};
protoOf(StringJsonLexer).j1f = function () {
  var current = this.i15_1;
  if (current === -1)
    return current;
  var source = this.g1f();
  $l$loop: while (current < source.length) {
    var c = charCodeAt(source, current);
    // Inline function 'kotlinx.serialization.json.internal.AbstractJsonLexer.isWs' call
    if (c === _Char___init__impl__6a9atx(32) || c === _Char___init__impl__6a9atx(10) || c === _Char___init__impl__6a9atx(13) || c === _Char___init__impl__6a9atx(9)) {
      current = current + 1 | 0;
    } else {
      break $l$loop;
    }
  }
  this.i15_1 = current;
  return current;
};
protoOf(StringJsonLexer).e1c = function (expected) {
  if (this.i15_1 === -1) {
    this.l1f(expected);
  }
  var source = this.g1f();
  var cpos = this.i15_1;
  $l$loop: while (cpos < source.length) {
    var _unary__edvuaz = cpos;
    cpos = _unary__edvuaz + 1 | 0;
    var c = charCodeAt(source, _unary__edvuaz);
    // Inline function 'kotlinx.serialization.json.internal.AbstractJsonLexer.isWs' call
    if (c === _Char___init__impl__6a9atx(32) || c === _Char___init__impl__6a9atx(10) || c === _Char___init__impl__6a9atx(13) || c === _Char___init__impl__6a9atx(9))
      continue $l$loop;
    this.i15_1 = cpos;
    if (c === expected)
      return Unit_instance;
    this.l1f(expected);
  }
  this.i15_1 = -1;
  this.l1f(expected);
};
protoOf(StringJsonLexer).k1c = function () {
  this.e1c(_Char___init__impl__6a9atx(34));
  var current = this.i15_1;
  var closingQuote = indexOf_0(this.g1f(), _Char___init__impl__6a9atx(34), current);
  if (closingQuote === -1) {
    this.v1a();
    // Inline function 'kotlinx.serialization.json.internal.AbstractJsonLexer.fail' call
    var expected = tokenDescription(1);
    var position = false ? this.i15_1 - 1 | 0 : this.i15_1;
    var s = this.i15_1 === charSequenceLength(this.g1f()) || position < 0 ? 'EOF' : toString_1(charSequenceGet(this.g1f(), position));
    var tmp$ret$0 = 'Expected ' + expected + ", but had '" + s + "' instead";
    this.n19(tmp$ret$0, position);
  }
  var inductionVariable = current;
  if (inductionVariable < closingQuote)
    do {
      var i = inductionVariable;
      inductionVariable = inductionVariable + 1 | 0;
      if (charCodeAt(this.g1f(), i) === _Char___init__impl__6a9atx(92)) {
        return this.consumeString2(this.g1f(), this.i15_1, i);
      }
    }
     while (inductionVariable < closingQuote);
  this.i15_1 = closingQuote + 1 | 0;
  return substring(this.g1f(), current, closingQuote);
};
protoOf(StringJsonLexer).m1c = function (keyToMatch, isLenient) {
  var positionSnapshot = this.i15_1;
  try {
    if (!(this.x1a() === 6))
      return null;
    var firstKey = this.h1c(isLenient);
    if (!(firstKey === keyToMatch))
      return null;
    this.m1f();
    if (!(this.x1a() === 5))
      return null;
    return this.h1c(isLenient);
  }finally {
    this.i15_1 = positionSnapshot;
    this.m1f();
  }
};
function StringJsonLexer_0(json, source) {
  return !json.t14_1.v16_1 ? new StringJsonLexer(source) : new StringJsonLexerWithComments(source);
}
function get_schemaCache(_this__u8e3s4) {
  return _this__u8e3s4.v14_1;
}
function JsonToStringWriter() {
  this.y14_1 = StringBuilder_init_$Create$_0(128);
}
protoOf(JsonToStringWriter).r18 = function (value) {
  this.y14_1.jb(value);
};
protoOf(JsonToStringWriter).l18 = function (char) {
  this.y14_1.r7(char);
};
protoOf(JsonToStringWriter).n18 = function (text) {
  this.y14_1.q7(text);
};
protoOf(JsonToStringWriter).x18 = function (text) {
  printQuoted(this.y14_1, text);
};
protoOf(JsonToStringWriter).z14 = function () {
  this.y14_1.ob();
};
protoOf(JsonToStringWriter).toString = function () {
  return this.y14_1.toString();
};
function createMapForCache(initialCapacity) {
  return HashMap_init_$Create$(initialCapacity);
}
//region block: post-declaration
protoOf(defer$1).tm = get_isNullable;
protoOf(defer$1).cn = get_isInline;
protoOf(defer$1).en = get_annotations;
protoOf(JsonSerializersModuleValidator).m14 = contextual;
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
