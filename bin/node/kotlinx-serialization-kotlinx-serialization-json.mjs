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
  this.u14_1 = configuration;
  this.v14_1 = serializersModule;
  this.w14_1 = new DescriptorSchemaCache();
}
protoOf(Json).fp = function () {
  return this.v14_1;
};
protoOf(Json).x14 = function (serializer, value) {
  var result = new JsonToStringWriter();
  try {
    encodeByWriter(this, result, serializer, value);
    return result.toString();
  }finally {
    result.a15();
  }
};
protoOf(Json).y14 = function (deserializer, string) {
  var lexer = StringJsonLexer_0(this, string);
  var input = new StreamingJsonDecoder(this, WriteMode_OBJ_getInstance(), lexer, deserializer.ul(), null);
  var result = input.qo(deserializer);
  lexer.n15();
  return result;
};
function Json_0(from, builderAction) {
  from = from === VOID ? Default_getInstance() : from;
  var builder = new JsonBuilder(from);
  builderAction(builder);
  var conf = builder.g16();
  return new JsonImpl(conf, builder.f16_1);
}
function JsonBuilder(json) {
  this.o15_1 = json.u14_1.h16_1;
  this.p15_1 = json.u14_1.m16_1;
  this.q15_1 = json.u14_1.i16_1;
  this.r15_1 = json.u14_1.j16_1;
  this.s15_1 = json.u14_1.l16_1;
  this.t15_1 = json.u14_1.n16_1;
  this.u15_1 = json.u14_1.o16_1;
  this.v15_1 = json.u14_1.q16_1;
  this.w15_1 = json.u14_1.x16_1;
  this.x15_1 = json.u14_1.s16_1;
  this.y15_1 = json.u14_1.t16_1;
  this.z15_1 = json.u14_1.u16_1;
  this.a16_1 = json.u14_1.v16_1;
  this.b16_1 = json.u14_1.w16_1;
  this.c16_1 = json.u14_1.r16_1;
  this.d16_1 = json.u14_1.k16_1;
  this.e16_1 = json.u14_1.p16_1;
  this.f16_1 = json.fp();
}
protoOf(JsonBuilder).g16 = function () {
  if (this.e16_1) {
    // Inline function 'kotlin.require' call
    if (!(this.v15_1 === 'type')) {
      var message = 'Class discriminator should not be specified when array polymorphism is specified';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    // Inline function 'kotlin.require' call
    if (!this.w15_1.equals(ClassDiscriminatorMode_POLYMORPHIC_getInstance())) {
      var message_0 = 'useArrayPolymorphism option can only be used if classDiscriminatorMode in a default POLYMORPHIC state.';
      throw IllegalArgumentException_init_$Create$(toString(message_0));
    }
  }
  if (!this.s15_1) {
    // Inline function 'kotlin.require' call
    if (!(this.t15_1 === '    ')) {
      var message_1 = 'Indent should not be specified when default printing mode is used';
      throw IllegalArgumentException_init_$Create$(toString(message_1));
    }
  } else if (!(this.t15_1 === '    ')) {
    var tmp0 = this.t15_1;
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
      var message_2 = 'Only whitespace, tab, newline and carriage return are allowed as pretty print symbols. Had ' + this.t15_1;
      throw IllegalArgumentException_init_$Create$(toString(message_2));
    }
  }
  return new JsonConfiguration(this.o15_1, this.q15_1, this.r15_1, this.d16_1, this.s15_1, this.p15_1, this.t15_1, this.u15_1, this.e16_1, this.v15_1, this.c16_1, this.x15_1, this.y15_1, this.z15_1, this.a16_1, this.b16_1, this.w15_1);
};
function validateConfiguration($this) {
  if (equals($this.fp(), EmptySerializersModule()))
    return Unit_instance;
  var collector = new JsonSerializersModuleValidator($this.u14_1);
  $this.fp().c14(collector);
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
  this.h16_1 = encodeDefaults;
  this.i16_1 = ignoreUnknownKeys;
  this.j16_1 = isLenient;
  this.k16_1 = allowStructuredMapKeys;
  this.l16_1 = prettyPrint;
  this.m16_1 = explicitNulls;
  this.n16_1 = prettyPrintIndent;
  this.o16_1 = coerceInputValues;
  this.p16_1 = useArrayPolymorphism;
  this.q16_1 = classDiscriminator;
  this.r16_1 = allowSpecialFloatingPointValues;
  this.s16_1 = useAlternativeNames;
  this.t16_1 = namingStrategy;
  this.u16_1 = decodeEnumsCaseInsensitive;
  this.v16_1 = allowTrailingComma;
  this.w16_1 = allowComments;
  this.x16_1 = classDiscriminatorMode;
}
protoOf(JsonConfiguration).toString = function () {
  return 'JsonConfiguration(encodeDefaults=' + this.h16_1 + ', ignoreUnknownKeys=' + this.i16_1 + ', isLenient=' + this.j16_1 + ', ' + ('allowStructuredMapKeys=' + this.k16_1 + ', prettyPrint=' + this.l16_1 + ', explicitNulls=' + this.m16_1 + ', ') + ("prettyPrintIndent='" + this.n16_1 + "', coerceInputValues=" + this.o16_1 + ', useArrayPolymorphism=' + this.p16_1 + ', ') + ("classDiscriminator='" + this.q16_1 + "', allowSpecialFloatingPointValues=" + this.r16_1 + ', ') + ('useAlternativeNames=' + this.s16_1 + ', namingStrategy=' + toString_0(this.t16_1) + ', decodeEnumsCaseInsensitive=' + this.u16_1 + ', ') + ('allowTrailingComma=' + this.v16_1 + ', allowComments=' + this.w16_1 + ', classDiscriminatorMode=' + this.x16_1.toString() + ')');
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
  return this.b17();
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
  this.c17_1 = content;
}
protoOf(JsonObject).equals = function (other) {
  return equals(this.c17_1, other);
};
protoOf(JsonObject).hashCode = function () {
  return hashCode(this.c17_1);
};
protoOf(JsonObject).toString = function () {
  var tmp = this.c17_1.h2();
  return joinToString(tmp, ',', '{', '}', VOID, VOID, JsonObject$toString$lambda);
};
protoOf(JsonObject).o = function () {
  return this.c17_1.o();
};
protoOf(JsonObject).d17 = function (key) {
  return this.c17_1.i2(key);
};
protoOf(JsonObject).i2 = function (key) {
  if (!(!(key == null) ? typeof key === 'string' : false))
    return false;
  return this.d17((!(key == null) ? typeof key === 'string' : false) ? key : THROW_CCE());
};
protoOf(JsonObject).e17 = function (key) {
  return this.c17_1.k2(key);
};
protoOf(JsonObject).k2 = function (key) {
  if (!(!(key == null) ? typeof key === 'string' : false))
    return null;
  return this.e17((!(key == null) ? typeof key === 'string' : false) ? key : THROW_CCE());
};
protoOf(JsonObject).u = function () {
  return this.c17_1.u();
};
protoOf(JsonObject).f2 = function () {
  return this.c17_1.f2();
};
protoOf(JsonObject).g2 = function () {
  return this.c17_1.g2();
};
protoOf(JsonObject).h2 = function () {
  return this.c17_1.h2();
};
function Companion_2() {
}
var Companion_instance_2;
function Companion_getInstance_6() {
  return Companion_instance_2;
}
function JsonArray(content) {
  JsonElement.call(this);
  this.f17_1 = content;
}
protoOf(JsonArray).equals = function (other) {
  return equals(this.f17_1, other);
};
protoOf(JsonArray).hashCode = function () {
  return hashCode(this.f17_1);
};
protoOf(JsonArray).toString = function () {
  return joinToString(this.f17_1, ',', '[', ']');
};
protoOf(JsonArray).o = function () {
  return this.f17_1.o();
};
protoOf(JsonArray).g17 = function (element) {
  return this.f17_1.y1(element);
};
protoOf(JsonArray).y1 = function (element) {
  if (!(element instanceof JsonElement))
    return false;
  return this.g17(element instanceof JsonElement ? element : THROW_CCE());
};
protoOf(JsonArray).r = function () {
  return this.f17_1.r();
};
protoOf(JsonArray).w = function (index) {
  return this.f17_1.w(index);
};
protoOf(JsonArray).x = function (index) {
  return this.f17_1.x(index);
};
protoOf(JsonArray).z1 = function (fromIndex, toIndex) {
  return this.f17_1.z1(fromIndex, toIndex);
};
protoOf(JsonArray).u = function () {
  return this.f17_1.u();
};
function JsonNull() {
  JsonNull_instance = this;
  JsonPrimitive.call(this);
  this.h17_1 = 'null';
}
protoOf(JsonNull).a17 = function () {
  return false;
};
protoOf(JsonNull).b17 = function () {
  return this.h17_1;
};
protoOf(JsonNull).i17 = function () {
  return JsonNullSerializer_getInstance();
};
protoOf(JsonNull).kw = function (typeParamsSerializers) {
  return this.i17();
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
  this.j17_1 = isString;
  this.k17_1 = coerceToInlineType;
  this.l17_1 = toString(body);
  if (!(this.k17_1 == null)) {
    // Inline function 'kotlin.require' call
    // Inline function 'kotlin.require' call
    if (!this.k17_1.dn()) {
      var message = 'Failed requirement.';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
  }
}
protoOf(JsonLiteral).a17 = function () {
  return this.j17_1;
};
protoOf(JsonLiteral).b17 = function () {
  return this.l17_1;
};
protoOf(JsonLiteral).toString = function () {
  var tmp;
  if (this.j17_1) {
    // Inline function 'kotlin.text.buildString' call
    // Inline function 'kotlin.apply' call
    var this_0 = StringBuilder_init_$Create$();
    printQuoted(this_0, this.l17_1);
    tmp = this_0.toString();
  } else {
    tmp = this.l17_1;
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
  if (!(this.j17_1 === other.j17_1))
    return false;
  if (!(this.l17_1 === other.l17_1))
    return false;
  return true;
};
protoOf(JsonLiteral).hashCode = function () {
  var result = getBooleanHashCode(this.j17_1);
  result = imul(31, result) + getStringHashCode(this.l17_1) | 0;
  return result;
};
function get_booleanOrNull(_this__u8e3s4) {
  _init_properties_JsonElement_kt__7cbdc2();
  return toBooleanStrictOrNull_0(_this__u8e3s4.b17());
}
function parseLongImpl(_this__u8e3s4) {
  _init_properties_JsonElement_kt__7cbdc2();
  return (new StringJsonLexer(_this__u8e3s4.b17())).m17();
}
function get_float(_this__u8e3s4) {
  _init_properties_JsonElement_kt__7cbdc2();
  // Inline function 'kotlin.text.toFloat' call
  var this_0 = _this__u8e3s4.b17();
  // Inline function 'kotlin.js.unsafeCast' call
  // Inline function 'kotlin.js.asDynamic' call
  return toDouble(this_0);
}
function get_double(_this__u8e3s4) {
  _init_properties_JsonElement_kt__7cbdc2();
  return toDouble(_this__u8e3s4.b17());
}
function get_contentOrNull(_this__u8e3s4) {
  _init_properties_JsonElement_kt__7cbdc2();
  var tmp;
  if (_this__u8e3s4 instanceof JsonNull) {
    tmp = null;
  } else {
    tmp = _this__u8e3s4.b17();
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
  $this$buildSerialDescriptor.im('JsonPrimitive', defer(JsonElementSerializer$descriptor$lambda$lambda));
  $this$buildSerialDescriptor.im('JsonNull', defer(JsonElementSerializer$descriptor$lambda$lambda_0));
  $this$buildSerialDescriptor.im('JsonLiteral', defer(JsonElementSerializer$descriptor$lambda$lambda_1));
  $this$buildSerialDescriptor.im('JsonObject', defer(JsonElementSerializer$descriptor$lambda$lambda_2));
  $this$buildSerialDescriptor.im('JsonArray', defer(JsonElementSerializer$descriptor$lambda$lambda_3));
  return Unit_instance;
}
function JsonElementSerializer$descriptor$lambda$lambda() {
  return JsonPrimitiveSerializer_getInstance().n17_1;
}
function JsonElementSerializer$descriptor$lambda$lambda_0() {
  return JsonNullSerializer_getInstance().o17_1;
}
function JsonElementSerializer$descriptor$lambda$lambda_1() {
  return JsonLiteralSerializer_getInstance().p17_1;
}
function JsonElementSerializer$descriptor$lambda$lambda_2() {
  return JsonObjectSerializer_getInstance().q17_1;
}
function JsonElementSerializer$descriptor$lambda$lambda_3() {
  return JsonArraySerializer_getInstance().r17_1;
}
function JsonElementSerializer() {
  JsonElementSerializer_instance = this;
  var tmp = this;
  var tmp_0 = SEALED_getInstance();
  tmp.s17_1 = buildSerialDescriptor('kotlinx.serialization.json.JsonElement', tmp_0, [], JsonElementSerializer$descriptor$lambda);
}
protoOf(JsonElementSerializer).ul = function () {
  return this.s17_1;
};
protoOf(JsonElementSerializer).t17 = function (encoder, value) {
  verify(encoder);
  if (value instanceof JsonPrimitive) {
    encoder.hq(JsonPrimitiveSerializer_getInstance(), value);
  } else {
    if (value instanceof JsonObject) {
      encoder.hq(JsonObjectSerializer_getInstance(), value);
    } else {
      if (value instanceof JsonArray) {
        encoder.hq(JsonArraySerializer_getInstance(), value);
      } else {
        noWhenBranchMatchedException();
      }
    }
  }
};
protoOf(JsonElementSerializer).vl = function (encoder, value) {
  return this.t17(encoder, value instanceof JsonElement ? value : THROW_CCE());
};
protoOf(JsonElementSerializer).wl = function (decoder) {
  var input = asJsonDecoder(decoder);
  return input.z16();
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
  this.n17_1 = buildSerialDescriptor('kotlinx.serialization.json.JsonPrimitive', STRING_getInstance(), []);
}
protoOf(JsonPrimitiveSerializer).ul = function () {
  return this.n17_1;
};
protoOf(JsonPrimitiveSerializer).u17 = function (encoder, value) {
  verify(encoder);
  var tmp;
  if (value instanceof JsonNull) {
    encoder.hq(JsonNullSerializer_getInstance(), JsonNull_getInstance());
    tmp = Unit_instance;
  } else {
    var tmp_0 = JsonLiteralSerializer_getInstance();
    encoder.hq(tmp_0, value instanceof JsonLiteral ? value : THROW_CCE());
    tmp = Unit_instance;
  }
  return tmp;
};
protoOf(JsonPrimitiveSerializer).vl = function (encoder, value) {
  return this.u17(encoder, value instanceof JsonPrimitive ? value : THROW_CCE());
};
protoOf(JsonPrimitiveSerializer).wl = function (decoder) {
  var result = asJsonDecoder(decoder).z16();
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
  this.o17_1 = buildSerialDescriptor('kotlinx.serialization.json.JsonNull', ENUM_getInstance(), []);
}
protoOf(JsonNullSerializer).ul = function () {
  return this.o17_1;
};
protoOf(JsonNullSerializer).v17 = function (encoder, value) {
  verify(encoder);
  encoder.lp();
};
protoOf(JsonNullSerializer).vl = function (encoder, value) {
  return this.v17(encoder, value instanceof JsonNull ? value : THROW_CCE());
};
protoOf(JsonNullSerializer).wl = function (decoder) {
  verify_0(decoder);
  if (decoder.do()) {
    throw new JsonDecodingException("Expected 'null' literal");
  }
  decoder.eo();
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
  this.p17_1 = PrimitiveSerialDescriptor('kotlinx.serialization.json.JsonLiteral', STRING_getInstance());
}
protoOf(JsonLiteralSerializer).ul = function () {
  return this.p17_1;
};
protoOf(JsonLiteralSerializer).w17 = function (encoder, value) {
  verify(encoder);
  if (value.j17_1) {
    return encoder.up(value.l17_1);
  }
  if (!(value.k17_1 == null)) {
    return encoder.vp(value.k17_1).up(value.l17_1);
  }
  var tmp0_safe_receiver = toLongOrNull(value.l17_1);
  if (tmp0_safe_receiver == null)
    null;
  else {
    // Inline function 'kotlin.let' call
    return encoder.qp(tmp0_safe_receiver);
  }
  var tmp1_safe_receiver = toULongOrNull(value.l17_1);
  var tmp = tmp1_safe_receiver;
  if ((tmp == null ? null : new ULong(tmp)) == null)
    null;
  else {
    var tmp_0 = tmp1_safe_receiver;
    // Inline function 'kotlin.let' call
    var it = (tmp_0 == null ? null : new ULong(tmp_0)).k1_1;
    var tmp_1 = encoder.vp(serializer_0(Companion_getInstance()).ul());
    // Inline function 'kotlin.ULong.toLong' call
    var tmp$ret$1 = _ULong___get_data__impl__fggpzb(it);
    tmp_1.qp(tmp$ret$1);
    return Unit_instance;
  }
  var tmp2_safe_receiver = toDoubleOrNull(value.l17_1);
  if (tmp2_safe_receiver == null)
    null;
  else {
    // Inline function 'kotlin.let' call
    return encoder.sp(tmp2_safe_receiver);
  }
  var tmp3_safe_receiver = toBooleanStrictOrNull(value.l17_1);
  if (tmp3_safe_receiver == null)
    null;
  else {
    // Inline function 'kotlin.let' call
    return encoder.mp(tmp3_safe_receiver);
  }
  encoder.up(value.l17_1);
};
protoOf(JsonLiteralSerializer).vl = function (encoder, value) {
  return this.w17(encoder, value instanceof JsonLiteral ? value : THROW_CCE());
};
protoOf(JsonLiteralSerializer).wl = function (decoder) {
  var result = asJsonDecoder(decoder).z16();
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
  this.x17_1 = MapSerializer(serializer(StringCompanionObject_instance), JsonElementSerializer_getInstance()).ul();
  this.y17_1 = 'kotlinx.serialization.json.JsonObject';
}
protoOf(JsonObjectDescriptor).bn = function () {
  return this.y17_1;
};
protoOf(JsonObjectDescriptor).gn = function (index) {
  return this.x17_1.gn(index);
};
protoOf(JsonObjectDescriptor).hn = function (name) {
  return this.x17_1.hn(name);
};
protoOf(JsonObjectDescriptor).in = function (index) {
  return this.x17_1.in(index);
};
protoOf(JsonObjectDescriptor).jn = function (index) {
  return this.x17_1.jn(index);
};
protoOf(JsonObjectDescriptor).kn = function (index) {
  return this.x17_1.kn(index);
};
protoOf(JsonObjectDescriptor).cn = function () {
  return this.x17_1.cn();
};
protoOf(JsonObjectDescriptor).um = function () {
  return this.x17_1.um();
};
protoOf(JsonObjectDescriptor).dn = function () {
  return this.x17_1.dn();
};
protoOf(JsonObjectDescriptor).en = function () {
  return this.x17_1.en();
};
protoOf(JsonObjectDescriptor).fn = function () {
  return this.x17_1.fn();
};
var JsonObjectDescriptor_instance;
function JsonObjectDescriptor_getInstance() {
  if (JsonObjectDescriptor_instance == null)
    new JsonObjectDescriptor();
  return JsonObjectDescriptor_instance;
}
function JsonObjectSerializer() {
  JsonObjectSerializer_instance = this;
  this.q17_1 = JsonObjectDescriptor_getInstance();
}
protoOf(JsonObjectSerializer).ul = function () {
  return this.q17_1;
};
protoOf(JsonObjectSerializer).z17 = function (encoder, value) {
  verify(encoder);
  MapSerializer(serializer(StringCompanionObject_instance), JsonElementSerializer_getInstance()).vl(encoder, value);
};
protoOf(JsonObjectSerializer).vl = function (encoder, value) {
  return this.z17(encoder, value instanceof JsonObject ? value : THROW_CCE());
};
protoOf(JsonObjectSerializer).wl = function (decoder) {
  verify_0(decoder);
  return new JsonObject(MapSerializer(serializer(StringCompanionObject_instance), JsonElementSerializer_getInstance()).wl(decoder));
};
var JsonObjectSerializer_instance;
function JsonObjectSerializer_getInstance() {
  if (JsonObjectSerializer_instance == null)
    new JsonObjectSerializer();
  return JsonObjectSerializer_instance;
}
function JsonArrayDescriptor() {
  JsonArrayDescriptor_instance = this;
  this.a18_1 = ListSerializer(JsonElementSerializer_getInstance()).ul();
  this.b18_1 = 'kotlinx.serialization.json.JsonArray';
}
protoOf(JsonArrayDescriptor).bn = function () {
  return this.b18_1;
};
protoOf(JsonArrayDescriptor).gn = function (index) {
  return this.a18_1.gn(index);
};
protoOf(JsonArrayDescriptor).hn = function (name) {
  return this.a18_1.hn(name);
};
protoOf(JsonArrayDescriptor).in = function (index) {
  return this.a18_1.in(index);
};
protoOf(JsonArrayDescriptor).jn = function (index) {
  return this.a18_1.jn(index);
};
protoOf(JsonArrayDescriptor).kn = function (index) {
  return this.a18_1.kn(index);
};
protoOf(JsonArrayDescriptor).cn = function () {
  return this.a18_1.cn();
};
protoOf(JsonArrayDescriptor).um = function () {
  return this.a18_1.um();
};
protoOf(JsonArrayDescriptor).dn = function () {
  return this.a18_1.dn();
};
protoOf(JsonArrayDescriptor).en = function () {
  return this.a18_1.en();
};
protoOf(JsonArrayDescriptor).fn = function () {
  return this.a18_1.fn();
};
var JsonArrayDescriptor_instance;
function JsonArrayDescriptor_getInstance() {
  if (JsonArrayDescriptor_instance == null)
    new JsonArrayDescriptor();
  return JsonArrayDescriptor_instance;
}
function JsonArraySerializer() {
  JsonArraySerializer_instance = this;
  this.r17_1 = JsonArrayDescriptor_getInstance();
}
protoOf(JsonArraySerializer).ul = function () {
  return this.r17_1;
};
protoOf(JsonArraySerializer).c18 = function (encoder, value) {
  verify(encoder);
  ListSerializer(JsonElementSerializer_getInstance()).vl(encoder, value);
};
protoOf(JsonArraySerializer).vl = function (encoder, value) {
  return this.c18(encoder, value instanceof JsonArray ? value : THROW_CCE());
};
protoOf(JsonArraySerializer).wl = function (decoder) {
  verify_0(decoder);
  return new JsonArray(ListSerializer(JsonElementSerializer_getInstance()).wl(decoder));
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
  var tmp0 = $this.d18_1;
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
  this.d18_1 = lazy($deferred);
}
protoOf(defer$1).bn = function () {
  return _get_original__l7ku1m(this).bn();
};
protoOf(defer$1).cn = function () {
  return _get_original__l7ku1m(this).cn();
};
protoOf(defer$1).en = function () {
  return _get_original__l7ku1m(this).en();
};
protoOf(defer$1).gn = function (index) {
  return _get_original__l7ku1m(this).gn(index);
};
protoOf(defer$1).hn = function (name) {
  return _get_original__l7ku1m(this).hn(name);
};
protoOf(defer$1).in = function (index) {
  return _get_original__l7ku1m(this).in(index);
};
protoOf(defer$1).jn = function (index) {
  return _get_original__l7ku1m(this).jn(index);
};
protoOf(defer$1).kn = function (index) {
  return _get_original__l7ku1m(this).kn(index);
};
function JsonEncoder() {
}
function Composer(writer) {
  this.e18_1 = writer;
  this.f18_1 = true;
}
protoOf(Composer).g18 = function () {
  this.f18_1 = true;
};
protoOf(Composer).h18 = function () {
  return Unit_instance;
};
protoOf(Composer).i18 = function () {
  this.f18_1 = false;
};
protoOf(Composer).j18 = function () {
  this.f18_1 = false;
};
protoOf(Composer).k18 = function () {
  return Unit_instance;
};
protoOf(Composer).l18 = function (v) {
  return this.e18_1.m18(v);
};
protoOf(Composer).n18 = function (v) {
  return this.e18_1.o18(v);
};
protoOf(Composer).p18 = function (v) {
  return this.e18_1.o18(v.toString());
};
protoOf(Composer).q18 = function (v) {
  return this.e18_1.o18(v.toString());
};
protoOf(Composer).r18 = function (v) {
  return this.e18_1.s18(fromInt(v));
};
protoOf(Composer).t18 = function (v) {
  return this.e18_1.s18(fromInt(v));
};
protoOf(Composer).u18 = function (v) {
  return this.e18_1.s18(fromInt(v));
};
protoOf(Composer).v18 = function (v) {
  return this.e18_1.s18(v);
};
protoOf(Composer).w18 = function (v) {
  return this.e18_1.o18(v.toString());
};
protoOf(Composer).x18 = function (value) {
  return this.e18_1.y18(value);
};
function Composer_0(sb, json) {
  return json.u14_1.l16_1 ? new ComposerWithPrettyPrint(sb, json) : new Composer(sb);
}
function ComposerForUnsignedNumbers(writer, forceQuoting) {
  Composer.call(this, writer);
  this.b19_1 = forceQuoting;
}
protoOf(ComposerForUnsignedNumbers).u18 = function (v) {
  if (this.b19_1) {
    // Inline function 'kotlin.toUInt' call
    var tmp$ret$0 = _UInt___init__impl__l7qpdl(v);
    this.x18(UInt__toString_impl_dbgl21(tmp$ret$0));
  } else {
    // Inline function 'kotlin.toUInt' call
    var tmp$ret$1 = _UInt___init__impl__l7qpdl(v);
    this.n18(UInt__toString_impl_dbgl21(tmp$ret$1));
  }
};
protoOf(ComposerForUnsignedNumbers).v18 = function (v) {
  if (this.b19_1) {
    // Inline function 'kotlin.toULong' call
    var tmp$ret$0 = _ULong___init__impl__c78o9k(v);
    this.x18(ULong__toString_impl_f9au7k(tmp$ret$0));
  } else {
    // Inline function 'kotlin.toULong' call
    var tmp$ret$1 = _ULong___init__impl__c78o9k(v);
    this.n18(ULong__toString_impl_f9au7k(tmp$ret$1));
  }
};
protoOf(ComposerForUnsignedNumbers).r18 = function (v) {
  if (this.b19_1) {
    // Inline function 'kotlin.toUByte' call
    var tmp$ret$0 = _UByte___init__impl__g9hnc4(v);
    this.x18(UByte__toString_impl_v72jg(tmp$ret$0));
  } else {
    // Inline function 'kotlin.toUByte' call
    var tmp$ret$1 = _UByte___init__impl__g9hnc4(v);
    this.n18(UByte__toString_impl_v72jg(tmp$ret$1));
  }
};
protoOf(ComposerForUnsignedNumbers).t18 = function (v) {
  if (this.b19_1) {
    // Inline function 'kotlin.toUShort' call
    var tmp$ret$0 = _UShort___init__impl__jigrne(v);
    this.x18(UShort__toString_impl_edaoee(tmp$ret$0));
  } else {
    // Inline function 'kotlin.toUShort' call
    var tmp$ret$1 = _UShort___init__impl__jigrne(v);
    this.n18(UShort__toString_impl_edaoee(tmp$ret$1));
  }
};
function ComposerForUnquotedLiterals(writer, forceQuoting) {
  Composer.call(this, writer);
  this.e19_1 = forceQuoting;
}
protoOf(ComposerForUnquotedLiterals).x18 = function (value) {
  if (this.e19_1) {
    protoOf(Composer).x18.call(this, value);
  } else {
    protoOf(Composer).n18.call(this, value);
  }
};
function ComposerWithPrettyPrint(writer, json) {
  Composer.call(this, writer);
  this.h19_1 = json;
  this.i19_1 = 0;
}
protoOf(ComposerWithPrettyPrint).g18 = function () {
  this.f18_1 = true;
  this.i19_1 = this.i19_1 + 1 | 0;
};
protoOf(ComposerWithPrettyPrint).h18 = function () {
  this.i19_1 = this.i19_1 - 1 | 0;
};
protoOf(ComposerWithPrettyPrint).i18 = function () {
  this.f18_1 = false;
  this.n18('\n');
  // Inline function 'kotlin.repeat' call
  var times = this.i19_1;
  var inductionVariable = 0;
  if (inductionVariable < times)
    do {
      var index = inductionVariable;
      inductionVariable = inductionVariable + 1 | 0;
      this.n18(this.h19_1.u14_1.n16_1);
    }
     while (inductionVariable < times);
};
protoOf(ComposerWithPrettyPrint).j18 = function () {
  if (this.f18_1)
    this.f18_1 = false;
  else {
    this.i18();
  }
};
protoOf(ComposerWithPrettyPrint).k18 = function () {
  this.l18(_Char___init__impl__6a9atx(32));
};
function readIfAbsent($this, descriptor, index) {
  $this.k19_1 = (!descriptor.kn(index) && descriptor.jn(index).um());
  return $this.k19_1;
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
  tmp.j19_1 = new ElementMarker(descriptor, JsonElementMarker$readIfAbsent$ref(this));
  this.k19_1 = false;
}
protoOf(JsonElementMarker).l19 = function (index) {
  this.j19_1.uu(index);
};
protoOf(JsonElementMarker).m19 = function () {
  return this.j19_1.vu();
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
  _this__u8e3s4.n19('Trailing comma before the end of JSON ' + entity, _this__u8e3s4.j15_1 - 1 | 0, "Trailing commas are non-complaint JSON and not allowed by default. Use 'allowTrailingComma = true' in 'Json {}' builder to support them.");
}
function throwInvalidFloatingPointDecoded(_this__u8e3s4, result) {
  _this__u8e3s4.o19('Unexpected special floating-point value ' + toString(result) + '. By default, ' + 'non-finite floating point values are prohibited because they do not conform JSON specification', VOID, "It is possible to deserialize them using 'JsonBuilder.allowSpecialFloatingPointValues = true'");
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
  return new JsonEncodingException("Value of type '" + keyDescriptor.bn() + "' can't be used in JSON as a key in the map. " + ("It should have either primitive or enum kind, but its kind is '" + keyDescriptor.cn().toString() + "'.\n") + "Use 'allowStructuredMapKeys = true' in 'Json {}' builder to convert such maps to [key1, value1, key2, value2,...] arrays.");
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
  if (json.u14_1.i16_1) {
    tmp = true;
  } else {
    var tmp0 = _this__u8e3s4.fn();
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
  var index = _this__u8e3s4.hn(name);
  if (!(index === -3))
    return index;
  if (!json.u14_1.s16_1)
    return index;
  return getJsonNameIndexSlowPath(_this__u8e3s4, json, name);
}
function getJsonElementName(_this__u8e3s4, json, index) {
  _init_properties_JsonNamesMap_kt__cbbp0k();
  var strategy = namingStrategy(_this__u8e3s4, json);
  return strategy == null ? _this__u8e3s4.gn(index) : serializationNamesIndices(_this__u8e3s4, json, strategy)[index];
}
function namingStrategy(_this__u8e3s4, json) {
  _init_properties_JsonNamesMap_kt__cbbp0k();
  return equals(_this__u8e3s4.cn(), CLASS_getInstance()) ? json.u14_1.t16_1 : null;
}
function deserializationNamesMap(_this__u8e3s4, descriptor) {
  _init_properties_JsonNamesMap_kt__cbbp0k();
  var tmp = get_schemaCache(_this__u8e3s4);
  var tmp_0 = get_JsonDeserializationNamesKey();
  return tmp.q19(descriptor, tmp_0, deserializationNamesMap$lambda(descriptor, _this__u8e3s4));
}
function decodeCaseInsensitive(_this__u8e3s4, descriptor) {
  _init_properties_JsonNamesMap_kt__cbbp0k();
  return _this__u8e3s4.u14_1.u16_1 && equals(descriptor.cn(), ENUM_getInstance());
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
  return tmp.q19(_this__u8e3s4, tmp_0, serializationNamesIndices$lambda(_this__u8e3s4, strategy));
}
function buildDeserializationNamesMap(_this__u8e3s4, json) {
  _init_properties_JsonNamesMap_kt__cbbp0k();
  // Inline function 'kotlin.collections.mutableMapOf' call
  var builder = LinkedHashMap_init_$Create$();
  var useLowercaseEnums = decodeCaseInsensitive(json, _this__u8e3s4);
  var strategyForClasses = namingStrategy(_this__u8e3s4, json);
  var inductionVariable = 0;
  var last = _this__u8e3s4.en();
  if (inductionVariable < last)
    do {
      var i = inductionVariable;
      inductionVariable = inductionVariable + 1 | 0;
      // Inline function 'kotlin.collections.filterIsInstance' call
      var tmp0 = _this__u8e3s4.in(i);
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
      var tmp1_safe_receiver = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.r19_1;
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
        tmp_0 = _this__u8e3s4.gn(i).toLowerCase();
      } else if (!(strategyForClasses == null)) {
        tmp_0 = strategyForClasses.s19(_this__u8e3s4, i, _this__u8e3s4.gn(i));
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
  var entity = equals($this_buildDeserializationNamesMap.cn(), ENUM_getInstance()) ? 'enum value' : 'property';
  // Inline function 'kotlin.collections.contains' call
  // Inline function 'kotlin.collections.containsKey' call
  if ((isInterface(_this__u8e3s4, KtMap) ? _this__u8e3s4 : THROW_CCE()).i2(name)) {
    throw new JsonException("The suggested name '" + name + "' for " + entity + ' ' + $this_buildDeserializationNamesMap.gn(index) + ' is already one of the names for ' + entity + ' ' + ($this_buildDeserializationNamesMap.gn(getValue(_this__u8e3s4, name)) + ' in ' + toString($this_buildDeserializationNamesMap)));
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
    var tmp_0 = $this_serializationNamesIndices.en();
    // Inline function 'kotlin.arrayOfNulls' call
    var tmp_1 = Array(tmp_0);
    while (tmp < tmp_0) {
      var tmp_2 = tmp;
      var baseName = $this_serializationNamesIndices.gn(tmp_2);
      tmp_1[tmp_2] = $strategy.s19($this_serializationNamesIndices, tmp_2, baseName);
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
  var newSize = imul($this.v19_1, 2);
  $this.t19_1 = copyOf($this.t19_1, newSize);
  var tmp = 0;
  var tmp_0 = new Int32Array(newSize);
  while (tmp < newSize) {
    tmp_0[tmp] = -1;
    tmp = tmp + 1 | 0;
  }
  var newIndices = tmp_0;
  // Inline function 'kotlin.collections.copyInto' call
  var this_0 = $this.u19_1;
  var endIndex = this_0.length;
  // Inline function 'kotlin.js.unsafeCast' call
  // Inline function 'kotlin.js.asDynamic' call
  var tmp_1 = this_0;
  // Inline function 'kotlin.js.unsafeCast' call
  // Inline function 'kotlin.js.asDynamic' call
  arrayCopy(tmp_1, newIndices, 0, 0, endIndex);
  $this.u19_1 = newIndices;
}
function JsonPath() {
  var tmp = this;
  // Inline function 'kotlin.arrayOfNulls' call
  tmp.t19_1 = Array(8);
  var tmp_0 = this;
  var tmp_1 = 0;
  var tmp_2 = new Int32Array(8);
  while (tmp_1 < 8) {
    tmp_2[tmp_1] = -1;
    tmp_1 = tmp_1 + 1 | 0;
  }
  tmp_0.u19_1 = tmp_2;
  this.v19_1 = -1;
}
protoOf(JsonPath).w19 = function (sd) {
  this.v19_1 = this.v19_1 + 1 | 0;
  var depth = this.v19_1;
  if (depth === this.t19_1.length) {
    resize(this);
  }
  this.t19_1[depth] = sd;
};
protoOf(JsonPath).x19 = function (index) {
  this.u19_1[this.v19_1] = index;
};
protoOf(JsonPath).y19 = function (key) {
  var tmp;
  if (!(this.u19_1[this.v19_1] === -2)) {
    this.v19_1 = this.v19_1 + 1 | 0;
    tmp = this.v19_1 === this.t19_1.length;
  } else {
    tmp = false;
  }
  if (tmp) {
    resize(this);
  }
  this.t19_1[this.v19_1] = key;
  this.u19_1[this.v19_1] = -2;
};
protoOf(JsonPath).z19 = function () {
  if (this.u19_1[this.v19_1] === -2) {
    this.t19_1[this.v19_1] = Tombstone_instance;
  }
};
protoOf(JsonPath).a1a = function () {
  var depth = this.v19_1;
  if (this.u19_1[depth] === -2) {
    this.u19_1[depth] = -1;
    this.v19_1 = this.v19_1 - 1 | 0;
  }
  if (!(this.v19_1 === -1)) {
    this.v19_1 = this.v19_1 - 1 | 0;
  }
};
protoOf(JsonPath).b1a = function () {
  // Inline function 'kotlin.text.buildString' call
  // Inline function 'kotlin.apply' call
  var this_0 = StringBuilder_init_$Create$();
  this_0.r7('$');
  // Inline function 'kotlin.repeat' call
  var times = this.v19_1 + 1 | 0;
  var inductionVariable = 0;
  if (inductionVariable < times)
    do {
      var index = inductionVariable;
      inductionVariable = inductionVariable + 1 | 0;
      var element = this.t19_1[index];
      if (!(element == null) ? isInterface(element, SerialDescriptor) : false) {
        if (equals(element.cn(), LIST_getInstance())) {
          if (!(this.u19_1[index] === -1)) {
            this_0.r7('[');
            this_0.jb(this.u19_1[index]);
            this_0.r7(']');
          }
        } else {
          var idx = this.u19_1[index];
          if (idx >= 0) {
            this_0.r7('.');
            this_0.r7(element.gn(idx));
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
  return this.b1a();
};
function checkKind($this, descriptor, actualClass) {
  var kind = descriptor.cn();
  var tmp;
  if (kind instanceof PolymorphicKind) {
    tmp = true;
  } else {
    tmp = equals(kind, CONTEXTUAL_getInstance());
  }
  if (tmp) {
    throw IllegalArgumentException_init_$Create$('Serializer for ' + actualClass.x9() + " can't be registered as a subclass for polymorphic serialization " + ('because its kind ' + kind.toString() + ' is not concrete. To work with multiple hierarchies, register it as a base class.'));
  }
  if ($this.d1a_1)
    return Unit_instance;
  if (!$this.e1a_1)
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
  var last = descriptor.en();
  if (inductionVariable < last)
    do {
      var i = inductionVariable;
      inductionVariable = inductionVariable + 1 | 0;
      var name = descriptor.gn(i);
      if (name === $this.c1a_1) {
        throw IllegalArgumentException_init_$Create$('Polymorphic serializer for ' + toString(actualClass) + " has property '" + name + "' that conflicts " + 'with JSON class discriminator. You can either change class discriminator in JsonConfiguration, rename property with @SerialName annotation or fall back to array polymorphism');
      }
    }
     while (inductionVariable < last);
}
function JsonSerializersModuleValidator(configuration) {
  this.c1a_1 = configuration.q16_1;
  this.d1a_1 = configuration.p16_1;
  this.e1a_1 = !configuration.x16_1.equals(ClassDiscriminatorMode_NONE_getInstance());
}
protoOf(JsonSerializersModuleValidator).l14 = function (kClass, provider) {
};
protoOf(JsonSerializersModuleValidator).o14 = function (baseClass, actualClass, actualSerializer) {
  var descriptor = actualSerializer.ul();
  checkKind(this, descriptor, actualClass);
  if (!this.d1a_1 && this.e1a_1) {
    checkDiscriminatorCollisions(this, descriptor, actualClass);
  }
};
protoOf(JsonSerializersModuleValidator).p14 = function (baseClass, defaultSerializerProvider) {
};
protoOf(JsonSerializersModuleValidator).q14 = function (baseClass, defaultDeserializerProvider) {
};
function encodeByWriter(json, writer, serializer, value) {
  var tmp = WriteMode_OBJ_getInstance();
  // Inline function 'kotlin.arrayOfNulls' call
  var size = get_entries().u();
  var tmp$ret$0 = Array(size);
  var encoder = StreamingJsonEncoder_init_$Create$(writer, json, tmp, tmp$ret$0);
  encoder.hq(serializer, value);
}
function readObject($this) {
  // Inline function 'kotlinx.serialization.json.internal.JsonTreeReader.readObjectImpl' call
  var lastToken = $this.o1a_1.s1a(6);
  if ($this.o1a_1.t1a() === 4) {
    $this.o1a_1.o19('Unexpected leading comma');
  }
  // Inline function 'kotlin.collections.linkedMapOf' call
  var result = LinkedHashMap_init_$Create$();
  $l$loop: while ($this.o1a_1.u1a()) {
    var key = $this.p1a_1 ? $this.o1a_1.w1a() : $this.o1a_1.v1a();
    $this.o1a_1.s1a(5);
    var element = $this.x1a();
    // Inline function 'kotlin.collections.set' call
    result.b2(key, element);
    lastToken = $this.o1a_1.y1a();
    var tmp0_subject = lastToken;
    if (tmp0_subject !== 4)
      if (tmp0_subject === 7)
        break $l$loop;
      else {
        $this.o1a_1.o19('Expected end of the object or comma');
      }
  }
  if (lastToken === 6) {
    $this.o1a_1.s1a(7);
  } else if (lastToken === 4) {
    if (!$this.q1a_1) {
      invalidTrailingComma($this.o1a_1);
    }
    $this.o1a_1.s1a(7);
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
  var lastToken = $this.o1a_1.y1a();
  if ($this.o1a_1.t1a() === 4) {
    $this.o1a_1.o19('Unexpected leading comma');
  }
  // Inline function 'kotlin.collections.arrayListOf' call
  var result = ArrayList_init_$Create$();
  while ($this.o1a_1.u1a()) {
    var element = $this.x1a();
    result.j(element);
    lastToken = $this.o1a_1.y1a();
    if (!(lastToken === 4)) {
      var tmp0 = $this.o1a_1;
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonLexer.require' call
      var condition = lastToken === 9;
      var position = tmp0.j15_1;
      if (!condition) {
        var tmp$ret$1 = 'Expected end of the array or comma';
        tmp0.o19(tmp$ret$1, position);
      }
    }
  }
  if (lastToken === 8) {
    $this.o1a_1.s1a(9);
  } else if (lastToken === 4) {
    if (!$this.q1a_1) {
      invalidTrailingComma($this.o1a_1, 'array');
    }
    $this.o1a_1.s1a(9);
  }
  return new JsonArray(result);
}
function readValue($this, isString) {
  var tmp;
  if ($this.p1a_1 || !isString) {
    tmp = $this.o1a_1.w1a();
  } else {
    tmp = $this.o1a_1.v1a();
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
  this.v1b_1 = this$0;
  CoroutineImpl.call(this, resultContinuation);
}
protoOf(JsonTreeReader$readDeepRecursive$slambda).z1b = function ($this$DeepRecursiveFunction, it, $completion) {
  var tmp = this.a1c($this$DeepRecursiveFunction, it, $completion);
  tmp.m8_1 = Unit_instance;
  tmp.n8_1 = null;
  return tmp.s8();
};
protoOf(JsonTreeReader$readDeepRecursive$slambda).a9 = function (p1, p2, $completion) {
  var tmp = p1 instanceof DeepRecursiveScope ? p1 : THROW_CCE();
  return this.z1b(tmp, p2 instanceof Unit ? p2 : THROW_CCE(), $completion);
};
protoOf(JsonTreeReader$readDeepRecursive$slambda).s8 = function () {
  var suspendResult = this.m8_1;
  $sm: do
    try {
      var tmp = this.k8_1;
      switch (tmp) {
        case 0:
          this.l8_1 = 3;
          var tmp0_subject = this.v1b_1.o1a_1.t1a();
          if (tmp0_subject === 1) {
            this.y1b_1 = readValue(this.v1b_1, true);
            this.k8_1 = 2;
            continue $sm;
          } else {
            if (tmp0_subject === 0) {
              this.y1b_1 = readValue(this.v1b_1, false);
              this.k8_1 = 2;
              continue $sm;
            } else {
              if (tmp0_subject === 6) {
                this.k8_1 = 1;
                suspendResult = readObject_0(this.v1b_1, this.w1b_1, this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }
                continue $sm;
              } else {
                if (tmp0_subject === 8) {
                  this.y1b_1 = readArray(this.v1b_1);
                  this.k8_1 = 2;
                  continue $sm;
                } else {
                  var tmp_0 = this;
                  this.v1b_1.o1a_1.o19("Can't begin reading element, unexpected token");
                }
              }
            }
          }

          break;
        case 1:
          this.y1b_1 = suspendResult;
          this.k8_1 = 2;
          continue $sm;
        case 2:
          return this.y1b_1;
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
protoOf(JsonTreeReader$readDeepRecursive$slambda).a1c = function ($this$DeepRecursiveFunction, it, completion) {
  var i = new JsonTreeReader$readDeepRecursive$slambda(this.v1b_1, completion);
  i.w1b_1 = $this$DeepRecursiveFunction;
  i.x1b_1 = it;
  return i;
};
function JsonTreeReader$readDeepRecursive$slambda_0(this$0, resultContinuation) {
  var i = new JsonTreeReader$readDeepRecursive$slambda(this$0, resultContinuation);
  var l = function ($this$DeepRecursiveFunction, it, $completion) {
    return i.z1b($this$DeepRecursiveFunction, it, $completion);
  };
  l.$arity = 2;
  return l;
}
function $readObjectCOROUTINE$(_this__u8e3s4, _this__u8e3s4_0, resultContinuation) {
  CoroutineImpl.call(this, resultContinuation);
  this.h1b_1 = _this__u8e3s4;
  this.i1b_1 = _this__u8e3s4_0;
}
protoOf($readObjectCOROUTINE$).s8 = function () {
  var suspendResult = this.m8_1;
  $sm: do
    try {
      var tmp = this.k8_1;
      switch (tmp) {
        case 0:
          this.l8_1 = 5;
          this.k1b_1 = this.h1b_1;
          this.l1b_1 = this.k1b_1.o1a_1.s1a(6);
          if (this.k1b_1.o1a_1.t1a() === 4) {
            this.k1b_1.o1a_1.o19('Unexpected leading comma');
          }

          var tmp_0 = this;
          tmp_0.j1b_1 = LinkedHashMap_init_$Create$();
          this.k8_1 = 1;
          continue $sm;
        case 1:
          if (!this.k1b_1.o1a_1.u1a()) {
            this.k8_1 = 4;
            continue $sm;
          }

          this.m1b_1 = this.k1b_1.p1a_1 ? this.k1b_1.o1a_1.w1a() : this.k1b_1.o1a_1.v1a();
          this.k1b_1.o1a_1.s1a(5);
          this.k8_1 = 2;
          suspendResult = this.i1b_1.mj(Unit_instance, this);
          if (suspendResult === get_COROUTINE_SUSPENDED()) {
            return suspendResult;
          }

          continue $sm;
        case 2:
          var element = suspendResult;
          var tmp0 = this.j1b_1;
          var key = this.m1b_1;
          tmp0.b2(key, element);
          this.l1b_1 = this.k1b_1.o1a_1.y1a();
          var tmp0_subject = this.l1b_1;
          if (tmp0_subject === 4) {
            this.k8_1 = 3;
            continue $sm;
          } else {
            if (tmp0_subject === 7) {
              this.k8_1 = 4;
              continue $sm;
            } else {
              this.k1b_1.o1a_1.o19('Expected end of the object or comma');
            }
          }

          break;
        case 3:
          this.k8_1 = 1;
          continue $sm;
        case 4:
          if (this.l1b_1 === 6) {
            this.k1b_1.o1a_1.s1a(7);
          } else if (this.l1b_1 === 4) {
            if (!this.k1b_1.q1a_1) {
              invalidTrailingComma(this.k1b_1.o1a_1);
            }
            this.k1b_1.o1a_1.s1a(7);
          }

          return new JsonObject(this.j1b_1);
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
  this.o1a_1 = lexer;
  this.p1a_1 = configuration.j16_1;
  this.q1a_1 = configuration.v16_1;
  this.r1a_1 = 0;
}
protoOf(JsonTreeReader).x1a = function () {
  var token = this.o1a_1.t1a();
  var tmp;
  if (token === 1) {
    tmp = readValue(this, true);
  } else if (token === 0) {
    tmp = readValue(this, false);
  } else if (token === 6) {
    var tmp_0;
    this.r1a_1 = this.r1a_1 + 1 | 0;
    if (this.r1a_1 === 200) {
      tmp_0 = readDeepRecursive(this);
    } else {
      tmp_0 = readObject(this);
    }
    var result = tmp_0;
    this.r1a_1 = this.r1a_1 - 1 | 0;
    tmp = result;
  } else if (token === 8) {
    tmp = readArray(this);
  } else {
    this.o1a_1.o19('Cannot read Json element because of unexpected ' + tokenDescription(token));
  }
  return tmp;
};
function classDiscriminator(_this__u8e3s4, json) {
  var _iterator__ex2g4s = _this__u8e3s4.fn().r();
  while (_iterator__ex2g4s.s()) {
    var annotation = _iterator__ex2g4s.t();
    if (annotation instanceof JsonClassDiscriminator)
      return annotation.b1c_1;
  }
  return json.u14_1.q16_1;
}
function validateIfSealed(serializer, actualSerializer, classDiscriminator) {
  if (!(serializer instanceof SealedClassSerializer))
    return Unit_instance;
  if (jsonCachedSerialNames(actualSerializer.ul()).y1(classDiscriminator)) {
    var baseName = serializer.ul().bn();
    var actualName = actualSerializer.ul().bn();
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
  this.p19_1 = createMapForCache(16);
}
protoOf(DescriptorSchemaCache).c1c = function (descriptor, key, value) {
  // Inline function 'kotlin.collections.getOrPut' call
  var this_0 = this.p19_1;
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
protoOf(DescriptorSchemaCache).q19 = function (descriptor, key, defaultValue) {
  var tmp0_safe_receiver = this.d1c(descriptor, key);
  if (tmp0_safe_receiver == null)
    null;
  else {
    // Inline function 'kotlin.let' call
    return tmp0_safe_receiver;
  }
  var value = defaultValue();
  this.c1c(descriptor, key, value);
  return value;
};
protoOf(DescriptorSchemaCache).d1c = function (descriptor, key) {
  var tmp0_safe_receiver = this.p19_1.k2(descriptor);
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
  this.e1c_1 = discriminatorToSkip;
}
function trySkip($this, _this__u8e3s4, unknownKey) {
  if (_this__u8e3s4 == null)
    return false;
  if (_this__u8e3s4.e1c_1 === unknownKey) {
    _this__u8e3s4.e1c_1 = null;
    return true;
  }
  return false;
}
function skipLeftoverElements($this, descriptor) {
  while (!($this.hp(descriptor) === -1)) {
  }
}
function checkLeadingComma($this) {
  if ($this.d15_1.t1a() === 4) {
    $this.d15_1.o19('Unexpected leading comma');
  }
}
function decodeMapIndex($this) {
  var hasComma = false;
  var decodingKey = !(($this.f15_1 % 2 | 0) === 0);
  if (decodingKey) {
    if (!($this.f15_1 === -1)) {
      hasComma = $this.d15_1.g1c();
    }
  } else {
    $this.d15_1.f1c(_Char___init__impl__6a9atx(58));
  }
  var tmp;
  if ($this.d15_1.u1a()) {
    if (decodingKey) {
      if ($this.f15_1 === -1) {
        var tmp0 = $this.d15_1;
        // Inline function 'kotlinx.serialization.json.internal.AbstractJsonLexer.require' call
        var condition = !hasComma;
        var position = tmp0.j15_1;
        if (!condition) {
          var tmp$ret$0 = 'Unexpected leading comma';
          tmp0.o19(tmp$ret$0, position);
        }
      } else {
        var tmp0_0 = $this.d15_1;
        // Inline function 'kotlinx.serialization.json.internal.AbstractJsonLexer.require' call
        var condition_0 = hasComma;
        var position_0 = tmp0_0.j15_1;
        if (!condition_0) {
          var tmp$ret$2 = 'Expected comma after the key-value pair';
          tmp0_0.o19(tmp$ret$2, position_0);
        }
      }
    }
    $this.f15_1 = $this.f15_1 + 1 | 0;
    tmp = $this.f15_1;
  } else {
    if (hasComma && !$this.b15_1.u14_1.v16_1) {
      invalidTrailingComma($this.d15_1);
    }
    tmp = -1;
  }
  return tmp;
}
function coerceInputValue($this, descriptor, index) {
  var tmp0 = $this.b15_1;
  var tmp$ret$1;
  $l$block_2: {
    // Inline function 'kotlinx.serialization.json.internal.tryCoerceValue' call
    var isOptional = descriptor.kn(index);
    var elementDescriptor = descriptor.jn(index);
    var tmp;
    if (isOptional && !elementDescriptor.um()) {
      tmp = $this.d15_1.h1c(true);
    } else {
      tmp = false;
    }
    if (tmp) {
      tmp$ret$1 = true;
      break $l$block_2;
    }
    if (equals(elementDescriptor.cn(), ENUM_getInstance())) {
      var tmp_0;
      if (elementDescriptor.um()) {
        tmp_0 = $this.d15_1.h1c(false);
      } else {
        tmp_0 = false;
      }
      if (tmp_0) {
        tmp$ret$1 = false;
        break $l$block_2;
      }
      var tmp0_elvis_lhs = $this.d15_1.i1c($this.h15_1.j16_1);
      var tmp_1;
      if (tmp0_elvis_lhs == null) {
        tmp$ret$1 = false;
        break $l$block_2;
      } else {
        tmp_1 = tmp0_elvis_lhs;
      }
      var enumValue = tmp_1;
      var enumIndex = getJsonNameIndex(elementDescriptor, tmp0, enumValue);
      var coerceToNull = !tmp0.u14_1.m16_1 && elementDescriptor.um();
      if (enumIndex === -3 && (isOptional || coerceToNull)) {
        $this.d15_1.v1a();
        tmp$ret$1 = true;
        break $l$block_2;
      }
    }
    tmp$ret$1 = false;
  }
  return tmp$ret$1;
}
function decodeObjectIndex($this, descriptor) {
  var hasComma = $this.d15_1.g1c();
  while ($this.d15_1.u1a()) {
    hasComma = false;
    var key = decodeStringKey($this);
    $this.d15_1.f1c(_Char___init__impl__6a9atx(58));
    var index = getJsonNameIndex(descriptor, $this.b15_1, key);
    var tmp;
    if (!(index === -3)) {
      var tmp_0;
      if ($this.h15_1.o16_1 && coerceInputValue($this, descriptor, index)) {
        hasComma = $this.d15_1.g1c();
        tmp_0 = false;
      } else {
        var tmp0_safe_receiver = $this.i15_1;
        if (tmp0_safe_receiver == null)
          null;
        else {
          tmp0_safe_receiver.l19(index);
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
  if (hasComma && !$this.b15_1.u14_1.v16_1) {
    invalidTrailingComma($this.d15_1);
  }
  var tmp1_safe_receiver = $this.i15_1;
  var tmp2_elvis_lhs = tmp1_safe_receiver == null ? null : tmp1_safe_receiver.m19();
  return tmp2_elvis_lhs == null ? -1 : tmp2_elvis_lhs;
}
function handleUnknown($this, descriptor, key) {
  if (ignoreUnknownKeys(descriptor, $this.b15_1) || trySkip($this, $this.g15_1, key)) {
    $this.d15_1.k1c($this.h15_1.j16_1);
  } else {
    $this.d15_1.k15_1.a1a();
    $this.d15_1.j1c(key);
  }
  return $this.d15_1.g1c();
}
function decodeListIndex($this) {
  var hasComma = $this.d15_1.g1c();
  var tmp;
  if ($this.d15_1.u1a()) {
    if (!($this.f15_1 === -1) && !hasComma) {
      $this.d15_1.o19('Expected end of the array or comma');
    }
    $this.f15_1 = $this.f15_1 + 1 | 0;
    tmp = $this.f15_1;
  } else {
    if (hasComma && !$this.b15_1.u14_1.v16_1) {
      invalidTrailingComma($this.d15_1, 'array');
    }
    tmp = -1;
  }
  return tmp;
}
function decodeStringKey($this) {
  var tmp;
  if ($this.h15_1.j16_1) {
    tmp = $this.d15_1.m1c();
  } else {
    tmp = $this.d15_1.l1c();
  }
  return tmp;
}
function StreamingJsonDecoder(json, mode, lexer, descriptor, discriminatorHolder) {
  AbstractDecoder.call(this);
  this.b15_1 = json;
  this.c15_1 = mode;
  this.d15_1 = lexer;
  this.e15_1 = this.b15_1.fp();
  this.f15_1 = -1;
  this.g15_1 = discriminatorHolder;
  this.h15_1 = this.b15_1.u14_1;
  this.i15_1 = this.h15_1.m16_1 ? null : new JsonElementMarker(descriptor);
}
protoOf(StreamingJsonDecoder).y16 = function () {
  return this.b15_1;
};
protoOf(StreamingJsonDecoder).fp = function () {
  return this.e15_1;
};
protoOf(StreamingJsonDecoder).z16 = function () {
  return (new JsonTreeReader(this.b15_1.u14_1, this.d15_1)).x1a();
};
protoOf(StreamingJsonDecoder).qo = function (deserializer) {
  try {
    var tmp;
    if (!(deserializer instanceof AbstractPolymorphicSerializer)) {
      tmp = true;
    } else {
      tmp = this.b15_1.u14_1.p16_1;
    }
    if (tmp) {
      return deserializer.wl(this);
    }
    var discriminator = classDiscriminator(deserializer.ul(), this.b15_1);
    var tmp0_elvis_lhs = this.d15_1.n1c(discriminator, this.h15_1.j16_1);
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
          tmp_1 = this.y16().u14_1.p16_1;
        }
        if (tmp_1) {
          tmp$ret$0 = tmp2.wl(this);
          break $l$block;
        }
        var discriminator_0 = classDiscriminator(tmp2.ul(), this.y16());
        var tmp0 = this.z16();
        // Inline function 'kotlinx.serialization.json.internal.cast' call
        var serialName = tmp2.ul().bn();
        if (!(tmp0 instanceof JsonObject)) {
          var tmp_2 = getKClass(JsonObject).x9();
          var tmp_3 = getKClassFromExpression(tmp0).x9();
          var tmp$ret$1 = this.d15_1.k15_1.b1a();
          throw JsonDecodingException_0(-1, 'Expected ' + tmp_2 + ', but had ' + tmp_3 + ' as the serialized body of ' + serialName + ' at element: ' + tmp$ret$1, toString(tmp0));
        }
        var jsonTree = tmp0;
        var tmp0_safe_receiver = jsonTree.e17(discriminator_0);
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
        tmp$ret$0 = readPolymorphicJson(this.y16(), discriminator_0, jsonTree, actualSerializer);
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
        this.d15_1.o19(message, VOID, hint);
      } else {
        throw $p;
      }
      tmp_7 = tmp_8;
    }
    var tmp_9 = tmp_7;
    var actualSerializer_0 = isInterface(tmp_9, DeserializationStrategy) ? tmp_9 : THROW_CCE();
    this.g15_1 = new DiscriminatorHolder(discriminator);
    return actualSerializer_0.wl(this);
  } catch ($p) {
    if ($p instanceof MissingFieldException) {
      var e = $p;
      if (contains(ensureNotNull(e.message), 'at path'))
        throw e;
      throw new MissingFieldException(e.om_1, plus(e.message, ' at path: ') + this.d15_1.k15_1.b1a(), e);
    } else {
      throw $p;
    }
  }
};
protoOf(StreamingJsonDecoder).ro = function (descriptor) {
  var newMode = switchMode(this.b15_1, descriptor);
  this.d15_1.k15_1.w19(descriptor);
  this.d15_1.f1c(newMode.q1c_1);
  checkLeadingComma(this);
  var tmp;
  switch (newMode.q2_1) {
    case 1:
    case 2:
    case 3:
      tmp = new StreamingJsonDecoder(this.b15_1, newMode, this.d15_1, descriptor, this.g15_1);
      break;
    default:
      var tmp_0;
      if (this.c15_1.equals(newMode) && this.b15_1.u14_1.m16_1) {
        tmp_0 = this;
      } else {
        tmp_0 = new StreamingJsonDecoder(this.b15_1, newMode, this.d15_1, descriptor, this.g15_1);
      }

      tmp = tmp_0;
      break;
  }
  return tmp;
};
protoOf(StreamingJsonDecoder).so = function (descriptor) {
  if (descriptor.en() === 0 && ignoreUnknownKeys(descriptor, this.b15_1)) {
    skipLeftoverElements(this, descriptor);
  }
  if (this.d15_1.g1c() && !this.b15_1.u14_1.v16_1) {
    invalidTrailingComma(this.d15_1, '');
  }
  this.d15_1.f1c(this.c15_1.r1c_1);
  this.d15_1.k15_1.a1a();
};
protoOf(StreamingJsonDecoder).do = function () {
  var tmp;
  var tmp0_safe_receiver = this.i15_1;
  var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.k19_1;
  if (!(tmp1_elvis_lhs == null ? false : tmp1_elvis_lhs)) {
    tmp = !this.d15_1.s1c();
  } else {
    tmp = false;
  }
  return tmp;
};
protoOf(StreamingJsonDecoder).eo = function () {
  return null;
};
protoOf(StreamingJsonDecoder).dp = function (descriptor, index, deserializer, previousValue) {
  var isMapKey = this.c15_1.equals(WriteMode_MAP_getInstance()) && (index & 1) === 0;
  if (isMapKey) {
    this.d15_1.k15_1.z19();
  }
  var value = protoOf(AbstractDecoder).dp.call(this, descriptor, index, deserializer, previousValue);
  if (isMapKey) {
    this.d15_1.k15_1.y19(value);
  }
  return value;
};
protoOf(StreamingJsonDecoder).hp = function (descriptor) {
  var index;
  switch (this.c15_1.q2_1) {
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
  if (!this.c15_1.equals(WriteMode_MAP_getInstance())) {
    this.d15_1.k15_1.x19(index);
  }
  return index;
};
protoOf(StreamingJsonDecoder).fo = function () {
  return this.d15_1.t1c();
};
protoOf(StreamingJsonDecoder).go = function () {
  var value = this.d15_1.u1c();
  if (!equalsLong(value, fromInt(convertToByte(value)))) {
    this.d15_1.o19("Failed to parse byte for input '" + value.toString() + "'");
  }
  return convertToByte(value);
};
protoOf(StreamingJsonDecoder).ho = function () {
  var value = this.d15_1.u1c();
  if (!equalsLong(value, fromInt(convertToShort(value)))) {
    this.d15_1.o19("Failed to parse short for input '" + value.toString() + "'");
  }
  return convertToShort(value);
};
protoOf(StreamingJsonDecoder).io = function () {
  var value = this.d15_1.u1c();
  if (!equalsLong(value, fromInt(convertToInt(value)))) {
    this.d15_1.o19("Failed to parse int for input '" + value.toString() + "'");
  }
  return convertToInt(value);
};
protoOf(StreamingJsonDecoder).jo = function () {
  return this.d15_1.u1c();
};
protoOf(StreamingJsonDecoder).ko = function () {
  var tmp0 = this.d15_1;
  var tmp$ret$4;
  $l$block: {
    // Inline function 'kotlinx.serialization.json.internal.parseString' call
    var input = tmp0.w1a();
    try {
      // Inline function 'kotlin.text.toFloat' call
      // Inline function 'kotlin.js.unsafeCast' call
      // Inline function 'kotlin.js.asDynamic' call
      tmp$ret$4 = toDouble(input);
      break $l$block;
    } catch ($p) {
      if ($p instanceof IllegalArgumentException) {
        var e = $p;
        tmp0.o19("Failed to parse type '" + 'float' + "' for input '" + input + "'");
      } else {
        throw $p;
      }
    }
  }
  var result = tmp$ret$4;
  var specialFp = this.b15_1.u14_1.r16_1;
  if (specialFp || isFinite(result))
    return result;
  throwInvalidFloatingPointDecoded(this.d15_1, result);
};
protoOf(StreamingJsonDecoder).lo = function () {
  var tmp0 = this.d15_1;
  var tmp$ret$1;
  $l$block: {
    // Inline function 'kotlinx.serialization.json.internal.parseString' call
    var input = tmp0.w1a();
    try {
      tmp$ret$1 = toDouble(input);
      break $l$block;
    } catch ($p) {
      if ($p instanceof IllegalArgumentException) {
        var e = $p;
        tmp0.o19("Failed to parse type '" + 'double' + "' for input '" + input + "'");
      } else {
        throw $p;
      }
    }
  }
  var result = tmp$ret$1;
  var specialFp = this.b15_1.u14_1.r16_1;
  if (specialFp || isFinite_0(result))
    return result;
  throwInvalidFloatingPointDecoded(this.d15_1, result);
};
protoOf(StreamingJsonDecoder).mo = function () {
  var string = this.d15_1.w1a();
  if (!(string.length === 1)) {
    this.d15_1.o19("Expected single char, but got '" + string + "'");
  }
  return charCodeAt(string, 0);
};
protoOf(StreamingJsonDecoder).no = function () {
  var tmp;
  if (this.h15_1.j16_1) {
    tmp = this.d15_1.m1c();
  } else {
    tmp = this.d15_1.v1a();
  }
  return tmp;
};
protoOf(StreamingJsonDecoder).oo = function (descriptor) {
  return get_isUnsignedNumber(descriptor) ? new JsonDecoderForUnsignedTypes(this.d15_1, this.b15_1) : protoOf(AbstractDecoder).oo.call(this, descriptor);
};
function JsonDecoderForUnsignedTypes(lexer, json) {
  AbstractDecoder.call(this);
  this.v1c_1 = lexer;
  this.w1c_1 = json.fp();
}
protoOf(JsonDecoderForUnsignedTypes).fp = function () {
  return this.w1c_1;
};
protoOf(JsonDecoderForUnsignedTypes).hp = function (descriptor) {
  var message = 'unsupported';
  throw IllegalStateException_init_$Create$(toString(message));
};
protoOf(JsonDecoderForUnsignedTypes).io = function () {
  var tmp0 = this.v1c_1;
  var tmp$ret$2;
  $l$block: {
    // Inline function 'kotlinx.serialization.json.internal.parseString' call
    var input = tmp0.w1a();
    try {
      // Inline function 'kotlin.UInt.toInt' call
      var this_0 = toUInt(input);
      tmp$ret$2 = _UInt___get_data__impl__f0vqqw(this_0);
      break $l$block;
    } catch ($p) {
      if ($p instanceof IllegalArgumentException) {
        var e = $p;
        tmp0.o19("Failed to parse type '" + 'UInt' + "' for input '" + input + "'");
      } else {
        throw $p;
      }
    }
  }
  return tmp$ret$2;
};
protoOf(JsonDecoderForUnsignedTypes).jo = function () {
  var tmp0 = this.v1c_1;
  var tmp$ret$2;
  $l$block: {
    // Inline function 'kotlinx.serialization.json.internal.parseString' call
    var input = tmp0.w1a();
    try {
      // Inline function 'kotlin.ULong.toLong' call
      var this_0 = toULong(input);
      tmp$ret$2 = _ULong___get_data__impl__fggpzb(this_0);
      break $l$block;
    } catch ($p) {
      if ($p instanceof IllegalArgumentException) {
        var e = $p;
        tmp0.o19("Failed to parse type '" + 'ULong' + "' for input '" + input + "'");
      } else {
        throw $p;
      }
    }
  }
  return tmp$ret$2;
};
protoOf(JsonDecoderForUnsignedTypes).go = function () {
  var tmp0 = this.v1c_1;
  var tmp$ret$2;
  $l$block: {
    // Inline function 'kotlinx.serialization.json.internal.parseString' call
    var input = tmp0.w1a();
    try {
      // Inline function 'kotlin.UByte.toByte' call
      var this_0 = toUByte(input);
      tmp$ret$2 = _UByte___get_data__impl__jof9qr(this_0);
      break $l$block;
    } catch ($p) {
      if ($p instanceof IllegalArgumentException) {
        var e = $p;
        tmp0.o19("Failed to parse type '" + 'UByte' + "' for input '" + input + "'");
      } else {
        throw $p;
      }
    }
  }
  return tmp$ret$2;
};
protoOf(JsonDecoderForUnsignedTypes).ho = function () {
  var tmp0 = this.v1c_1;
  var tmp$ret$2;
  $l$block: {
    // Inline function 'kotlinx.serialization.json.internal.parseString' call
    var input = tmp0.w1a();
    try {
      // Inline function 'kotlin.UShort.toShort' call
      var this_0 = toUShort(input);
      tmp$ret$2 = _UShort___get_data__impl__g0245(this_0);
      break $l$block;
    } catch ($p) {
      if ($p instanceof IllegalArgumentException) {
        var e = $p;
        tmp0.o19("Failed to parse type '" + 'UShort' + "' for input '" + input + "'");
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
  $this.f1a_1.i18();
  $this.up(discriminator);
  $this.f1a_1.l18(_Char___init__impl__6a9atx(58));
  $this.f1a_1.k18();
  $this.up(serialName);
}
function StreamingJsonEncoder(composer, json, mode, modeReuseCache) {
  AbstractEncoder.call(this);
  this.f1a_1 = composer;
  this.g1a_1 = json;
  this.h1a_1 = mode;
  this.i1a_1 = modeReuseCache;
  this.j1a_1 = this.g1a_1.fp();
  this.k1a_1 = this.g1a_1.u14_1;
  this.l1a_1 = false;
  this.m1a_1 = null;
  this.n1a_1 = null;
  var i = this.h1a_1.q2_1;
  if (!(this.i1a_1 == null)) {
    if (!(this.i1a_1[i] === null) || !(this.i1a_1[i] === this)) {
      this.i1a_1[i] = this;
    }
  }
}
protoOf(StreamingJsonEncoder).y16 = function () {
  return this.g1a_1;
};
protoOf(StreamingJsonEncoder).fp = function () {
  return this.j1a_1;
};
protoOf(StreamingJsonEncoder).hq = function (serializer, value) {
  $l$block: {
    // Inline function 'kotlinx.serialization.json.internal.encodePolymorphically' call
    if (this.y16().u14_1.p16_1) {
      serializer.vl(this, value);
      break $l$block;
    }
    var isPolymorphicSerializer = serializer instanceof AbstractPolymorphicSerializer;
    var tmp;
    if (isPolymorphicSerializer) {
      tmp = !this.y16().u14_1.x16_1.equals(ClassDiscriminatorMode_NONE_getInstance());
    } else {
      var tmp_0;
      switch (this.y16().u14_1.x16_1.q2_1) {
        case 0:
        case 2:
          tmp_0 = false;
          break;
        case 1:
          // Inline function 'kotlin.let' call

          var it = serializer.ul().cn();
          tmp_0 = equals(it, CLASS_getInstance()) || equals(it, OBJECT_getInstance());
          break;
        default:
          noWhenBranchMatchedException();
          break;
      }
      tmp = tmp_0;
    }
    var needDiscriminator = tmp;
    var baseClassDiscriminator = needDiscriminator ? classDiscriminator(serializer.ul(), this.y16()) : null;
    var tmp_1;
    if (isPolymorphicSerializer) {
      var casted = serializer instanceof AbstractPolymorphicSerializer ? serializer : THROW_CCE();
      $l$block_0: {
        // Inline function 'kotlin.requireNotNull' call
        if (value == null) {
          var message = 'Value for serializer ' + toString(serializer.ul()) + ' should always be non-null. Please report issue to the kotlinx.serialization tracker.';
          throw IllegalArgumentException_init_$Create$(toString(message));
        } else {
          break $l$block_0;
        }
      }
      var actual = findPolymorphicSerializer_0(casted, this, value);
      if (!(baseClassDiscriminator == null)) {
        access$validateIfSealed$tPolymorphicKt(serializer, actual, baseClassDiscriminator);
        checkKind_0(actual.ul().cn());
      }
      tmp_1 = isInterface(actual, SerializationStrategy) ? actual : THROW_CCE();
    } else {
      tmp_1 = serializer;
    }
    var actualSerializer = tmp_1;
    if (!(baseClassDiscriminator == null)) {
      var serialName = actualSerializer.ul().bn();
      this.m1a_1 = baseClassDiscriminator;
      this.n1a_1 = serialName;
    }
    actualSerializer.vl(this, value);
  }
};
protoOf(StreamingJsonEncoder).ro = function (descriptor) {
  var newMode = switchMode(this.g1a_1, descriptor);
  if (!(newMode.q1c_1 === _Char___init__impl__6a9atx(0))) {
    this.f1a_1.l18(newMode.q1c_1);
    this.f1a_1.g18();
  }
  var discriminator = this.m1a_1;
  if (!(discriminator == null)) {
    var tmp0_elvis_lhs = this.n1a_1;
    encodeTypeInfo(this, discriminator, tmp0_elvis_lhs == null ? descriptor.bn() : tmp0_elvis_lhs);
    this.m1a_1 = null;
    this.n1a_1 = null;
  }
  if (this.h1a_1.equals(newMode)) {
    return this;
  }
  var tmp1_safe_receiver = this.i1a_1;
  var tmp2_elvis_lhs = tmp1_safe_receiver == null ? null : tmp1_safe_receiver[newMode.q2_1];
  return tmp2_elvis_lhs == null ? new StreamingJsonEncoder(this.f1a_1, this.g1a_1, newMode, this.i1a_1) : tmp2_elvis_lhs;
};
protoOf(StreamingJsonEncoder).so = function (descriptor) {
  if (!(this.h1a_1.r1c_1 === _Char___init__impl__6a9atx(0))) {
    this.f1a_1.h18();
    this.f1a_1.j18();
    this.f1a_1.l18(this.h1a_1.r1c_1);
  }
};
protoOf(StreamingJsonEncoder).jp = function (descriptor, index) {
  switch (this.h1a_1.q2_1) {
    case 1:
      if (!this.f1a_1.f18_1) {
        this.f1a_1.l18(_Char___init__impl__6a9atx(44));
      }

      this.f1a_1.i18();
      break;
    case 2:
      if (!this.f1a_1.f18_1) {
        var tmp = this;
        var tmp_0;
        if ((index % 2 | 0) === 0) {
          this.f1a_1.l18(_Char___init__impl__6a9atx(44));
          this.f1a_1.i18();
          tmp_0 = true;
        } else {
          this.f1a_1.l18(_Char___init__impl__6a9atx(58));
          this.f1a_1.k18();
          tmp_0 = false;
        }
        tmp.l1a_1 = tmp_0;
      } else {
        this.l1a_1 = true;
        this.f1a_1.i18();
      }

      break;
    case 3:
      if (index === 0)
        this.l1a_1 = true;
      if (index === 1) {
        this.f1a_1.l18(_Char___init__impl__6a9atx(44));
        this.f1a_1.k18();
        this.l1a_1 = false;
      }

      break;
    default:
      if (!this.f1a_1.f18_1) {
        this.f1a_1.l18(_Char___init__impl__6a9atx(44));
      }

      this.f1a_1.i18();
      this.up(getJsonElementName(descriptor, this.g1a_1, index));
      this.f1a_1.l18(_Char___init__impl__6a9atx(58));
      this.f1a_1.k18();
      break;
  }
  return true;
};
protoOf(StreamingJsonEncoder).vp = function (descriptor) {
  var tmp;
  if (get_isUnsignedNumber(descriptor)) {
    // Inline function 'kotlinx.serialization.json.internal.StreamingJsonEncoder.composerAs' call
    var tmp_0;
    var tmp_1 = this.f1a_1;
    if (tmp_1 instanceof ComposerForUnsignedNumbers) {
      tmp_0 = this.f1a_1;
    } else {
      var tmp0 = this.f1a_1.e18_1;
      var p1 = this.l1a_1;
      tmp_0 = new ComposerForUnsignedNumbers(tmp0, p1);
    }
    var tmp$ret$1 = tmp_0;
    tmp = new StreamingJsonEncoder(tmp$ret$1, this.g1a_1, this.h1a_1, null);
  } else if (get_isUnquotedLiteral(descriptor)) {
    // Inline function 'kotlinx.serialization.json.internal.StreamingJsonEncoder.composerAs' call
    var tmp_2;
    var tmp_3 = this.f1a_1;
    if (tmp_3 instanceof ComposerForUnquotedLiterals) {
      tmp_2 = this.f1a_1;
    } else {
      var tmp0_0 = this.f1a_1.e18_1;
      var p1_0 = this.l1a_1;
      tmp_2 = new ComposerForUnquotedLiterals(tmp0_0, p1_0);
    }
    var tmp$ret$3 = tmp_2;
    tmp = new StreamingJsonEncoder(tmp$ret$3, this.g1a_1, this.h1a_1, null);
  } else if (!(this.m1a_1 == null)) {
    // Inline function 'kotlin.apply' call
    this.n1a_1 = descriptor.bn();
    tmp = this;
  } else {
    tmp = protoOf(AbstractEncoder).vp.call(this, descriptor);
  }
  return tmp;
};
protoOf(StreamingJsonEncoder).lp = function () {
  this.f1a_1.n18('null');
};
protoOf(StreamingJsonEncoder).mp = function (value) {
  if (this.l1a_1) {
    this.up(value.toString());
  } else {
    this.f1a_1.w18(value);
  }
};
protoOf(StreamingJsonEncoder).np = function (value) {
  if (this.l1a_1) {
    this.up(value.toString());
  } else {
    this.f1a_1.r18(value);
  }
};
protoOf(StreamingJsonEncoder).op = function (value) {
  if (this.l1a_1) {
    this.up(value.toString());
  } else {
    this.f1a_1.t18(value);
  }
};
protoOf(StreamingJsonEncoder).pp = function (value) {
  if (this.l1a_1) {
    this.up(value.toString());
  } else {
    this.f1a_1.u18(value);
  }
};
protoOf(StreamingJsonEncoder).qp = function (value) {
  if (this.l1a_1) {
    this.up(value.toString());
  } else {
    this.f1a_1.v18(value);
  }
};
protoOf(StreamingJsonEncoder).rp = function (value) {
  if (this.l1a_1) {
    this.up(value.toString());
  } else {
    this.f1a_1.p18(value);
  }
  if (!this.k1a_1.r16_1 && !isFinite(value)) {
    throw InvalidFloatingPointEncoded(value, toString(this.f1a_1.e18_1));
  }
};
protoOf(StreamingJsonEncoder).sp = function (value) {
  if (this.l1a_1) {
    this.up(value.toString());
  } else {
    this.f1a_1.q18(value);
  }
  if (!this.k1a_1.r16_1 && !isFinite_0(value)) {
    throw InvalidFloatingPointEncoded(value, toString(this.f1a_1.e18_1));
  }
};
protoOf(StreamingJsonEncoder).tp = function (value) {
  this.up(toString_1(value));
};
protoOf(StreamingJsonEncoder).up = function (value) {
  return this.f1a_1.x18(value);
};
function get_isUnsignedNumber(_this__u8e3s4) {
  _init_properties_StreamingJsonEncoder_kt__pn1bsi();
  return _this__u8e3s4.dn() && get_unsignedNumberDescriptors().y1(_this__u8e3s4);
}
function get_isUnquotedLiteral(_this__u8e3s4) {
  _init_properties_StreamingJsonEncoder_kt__pn1bsi();
  return _this__u8e3s4.dn() && equals(_this__u8e3s4, get_jsonUnquotedLiteralDescriptor());
}
var properties_initialized_StreamingJsonEncoder_kt_6ifwwk;
function _init_properties_StreamingJsonEncoder_kt__pn1bsi() {
  if (!properties_initialized_StreamingJsonEncoder_kt_6ifwwk) {
    properties_initialized_StreamingJsonEncoder_kt_6ifwwk = true;
    unsignedNumberDescriptors = setOf([serializer_1(Companion_getInstance_0()).ul(), serializer_0(Companion_getInstance()).ul(), serializer_2(Companion_getInstance_1()).ul(), serializer_3(Companion_getInstance_2()).ul()]);
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
  throw JsonDecodingException_0(-1, "Failed to parse literal '" + literal.toString() + "' as " + type + ' value at element: ' + $this.d1d(tag), toString($this.e1d()));
}
function AbstractJsonTreeDecoder(json, value, polymorphicDiscriminator) {
  polymorphicDiscriminator = polymorphicDiscriminator === VOID ? null : polymorphicDiscriminator;
  NamedValueDecoder.call(this);
  this.z1c_1 = json;
  this.a1d_1 = value;
  this.b1d_1 = polymorphicDiscriminator;
  this.c1d_1 = this.y16().u14_1;
}
protoOf(AbstractJsonTreeDecoder).y16 = function () {
  return this.z1c_1;
};
protoOf(AbstractJsonTreeDecoder).m2 = function () {
  return this.a1d_1;
};
protoOf(AbstractJsonTreeDecoder).fp = function () {
  return this.y16().fp();
};
protoOf(AbstractJsonTreeDecoder).e1d = function () {
  var tmp0_safe_receiver = this.c12();
  var tmp;
  if (tmp0_safe_receiver == null) {
    tmp = null;
  } else {
    // Inline function 'kotlin.let' call
    tmp = this.f1d(tmp0_safe_receiver);
  }
  var tmp1_elvis_lhs = tmp;
  return tmp1_elvis_lhs == null ? this.m2() : tmp1_elvis_lhs;
};
protoOf(AbstractJsonTreeDecoder).d1d = function (currentTag) {
  return this.e12() + ('.' + currentTag);
};
protoOf(AbstractJsonTreeDecoder).z16 = function () {
  return this.e1d();
};
protoOf(AbstractJsonTreeDecoder).qo = function (deserializer) {
  var tmp$ret$0;
  $l$block: {
    // Inline function 'kotlinx.serialization.json.internal.decodeSerializableValuePolymorphic' call
    var tmp;
    if (!(deserializer instanceof AbstractPolymorphicSerializer)) {
      tmp = true;
    } else {
      tmp = this.y16().u14_1.p16_1;
    }
    if (tmp) {
      tmp$ret$0 = deserializer.wl(this);
      break $l$block;
    }
    var discriminator = classDiscriminator(deserializer.ul(), this.y16());
    var tmp0 = this.z16();
    // Inline function 'kotlinx.serialization.json.internal.cast' call
    var serialName = deserializer.ul().bn();
    if (!(tmp0 instanceof JsonObject)) {
      var tmp_0 = getKClass(JsonObject).x9();
      var tmp_1 = getKClassFromExpression(tmp0).x9();
      var tmp$ret$1 = this.e12();
      throw JsonDecodingException_0(-1, 'Expected ' + tmp_0 + ', but had ' + tmp_1 + ' as the serialized body of ' + serialName + ' at element: ' + tmp$ret$1, toString(tmp0));
    }
    var jsonTree = tmp0;
    var tmp0_safe_receiver = jsonTree.e17(discriminator);
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
    tmp$ret$0 = readPolymorphicJson(this.y16(), discriminator, jsonTree, actualSerializer);
  }
  return tmp$ret$0;
};
protoOf(AbstractJsonTreeDecoder).d12 = function (parentName, childName) {
  return childName;
};
protoOf(AbstractJsonTreeDecoder).ro = function (descriptor) {
  var currentObject = this.e1d();
  var tmp0_subject = descriptor.cn();
  var tmp;
  var tmp_0;
  if (equals(tmp0_subject, LIST_getInstance())) {
    tmp_0 = true;
  } else {
    tmp_0 = tmp0_subject instanceof PolymorphicKind;
  }
  if (tmp_0) {
    var tmp_1 = this.y16();
    // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
    // Inline function 'kotlinx.serialization.json.internal.cast' call
    var serialName = descriptor.bn();
    if (!(currentObject instanceof JsonArray)) {
      var tmp_2 = getKClass(JsonArray).x9();
      var tmp_3 = getKClassFromExpression(currentObject).x9();
      var tmp$ret$0 = this.e12();
      throw JsonDecodingException_0(-1, 'Expected ' + tmp_2 + ', but had ' + tmp_3 + ' as the serialized body of ' + serialName + ' at element: ' + tmp$ret$0, toString(currentObject));
    }
    tmp = new JsonTreeListDecoder(tmp_1, currentObject);
  } else {
    if (equals(tmp0_subject, MAP_getInstance())) {
      // Inline function 'kotlinx.serialization.json.internal.selectMapMode' call
      var this_0 = this.y16();
      var keyDescriptor = carrierDescriptor(descriptor.jn(0), this_0.fp());
      var keyKind = keyDescriptor.cn();
      var tmp_4;
      var tmp_5;
      if (keyKind instanceof PrimitiveKind) {
        tmp_5 = true;
      } else {
        tmp_5 = equals(keyKind, ENUM_getInstance());
      }
      if (tmp_5) {
        var tmp_6 = this.y16();
        // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
        // Inline function 'kotlinx.serialization.json.internal.cast' call
        var serialName_0 = descriptor.bn();
        if (!(currentObject instanceof JsonObject)) {
          var tmp_7 = getKClass(JsonObject).x9();
          var tmp_8 = getKClassFromExpression(currentObject).x9();
          var tmp$ret$3 = this.e12();
          throw JsonDecodingException_0(-1, 'Expected ' + tmp_7 + ', but had ' + tmp_8 + ' as the serialized body of ' + serialName_0 + ' at element: ' + tmp$ret$3, toString(currentObject));
        }
        tmp_4 = new JsonTreeMapDecoder(tmp_6, currentObject);
      } else {
        if (this_0.u14_1.k16_1) {
          var tmp_9 = this.y16();
          // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
          // Inline function 'kotlinx.serialization.json.internal.cast' call
          var serialName_1 = descriptor.bn();
          if (!(currentObject instanceof JsonArray)) {
            var tmp_10 = getKClass(JsonArray).x9();
            var tmp_11 = getKClassFromExpression(currentObject).x9();
            var tmp$ret$7 = this.e12();
            throw JsonDecodingException_0(-1, 'Expected ' + tmp_10 + ', but had ' + tmp_11 + ' as the serialized body of ' + serialName_1 + ' at element: ' + tmp$ret$7, toString(currentObject));
          }
          tmp_4 = new JsonTreeListDecoder(tmp_9, currentObject);
        } else {
          throw InvalidKeyKindException(keyDescriptor);
        }
      }
      tmp = tmp_4;
    } else {
      var tmp_12 = this.y16();
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
      // Inline function 'kotlinx.serialization.json.internal.cast' call
      var serialName_2 = descriptor.bn();
      if (!(currentObject instanceof JsonObject)) {
        var tmp_13 = getKClass(JsonObject).x9();
        var tmp_14 = getKClassFromExpression(currentObject).x9();
        var tmp$ret$12 = this.e12();
        throw JsonDecodingException_0(-1, 'Expected ' + tmp_13 + ', but had ' + tmp_14 + ' as the serialized body of ' + serialName_2 + ' at element: ' + tmp$ret$12, toString(currentObject));
      }
      tmp = new JsonTreeDecoder(tmp_12, currentObject, this.b1d_1);
    }
  }
  return tmp;
};
protoOf(AbstractJsonTreeDecoder).so = function (descriptor) {
};
protoOf(AbstractJsonTreeDecoder).do = function () {
  var tmp = this.e1d();
  return !(tmp instanceof JsonNull);
};
protoOf(AbstractJsonTreeDecoder).g1d = function (tag) {
  return !(this.f1d(tag) === JsonNull_getInstance());
};
protoOf(AbstractJsonTreeDecoder).g12 = function (tag) {
  return this.g1d((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE());
};
protoOf(AbstractJsonTreeDecoder).h1d = function (tag) {
  var tmp$ret$4;
  $l$block: {
    // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.getPrimitiveValue' call
    // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
    // Inline function 'kotlinx.serialization.json.internal.cast' call
    var value = this.f1d(tag);
    if (!(value instanceof JsonPrimitive)) {
      var tmp = getKClass(JsonPrimitive).x9();
      var tmp_0 = getKClassFromExpression(value).x9();
      var tmp$ret$0 = this.d1d(tag);
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
protoOf(AbstractJsonTreeDecoder).h12 = function (tag) {
  return this.h1d((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE());
};
protoOf(AbstractJsonTreeDecoder).i1d = function (tag) {
  var tmp$ret$5;
  $l$block: {
    // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.getPrimitiveValue' call
    // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
    // Inline function 'kotlinx.serialization.json.internal.cast' call
    var value = this.f1d(tag);
    if (!(value instanceof JsonPrimitive)) {
      var tmp = getKClass(JsonPrimitive).x9();
      var tmp_0 = getKClassFromExpression(value).x9();
      var tmp$ret$0 = this.d1d(tag);
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
protoOf(AbstractJsonTreeDecoder).i12 = function (tag) {
  return this.i1d((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE());
};
protoOf(AbstractJsonTreeDecoder).j1d = function (tag) {
  var tmp$ret$5;
  $l$block: {
    // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.getPrimitiveValue' call
    // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
    // Inline function 'kotlinx.serialization.json.internal.cast' call
    var value = this.f1d(tag);
    if (!(value instanceof JsonPrimitive)) {
      var tmp = getKClass(JsonPrimitive).x9();
      var tmp_0 = getKClassFromExpression(value).x9();
      var tmp$ret$0 = this.d1d(tag);
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
protoOf(AbstractJsonTreeDecoder).j12 = function (tag) {
  return this.j1d((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE());
};
protoOf(AbstractJsonTreeDecoder).k1d = function (tag) {
  var tmp$ret$5;
  $l$block: {
    // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.getPrimitiveValue' call
    // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
    // Inline function 'kotlinx.serialization.json.internal.cast' call
    var value = this.f1d(tag);
    if (!(value instanceof JsonPrimitive)) {
      var tmp = getKClass(JsonPrimitive).x9();
      var tmp_0 = getKClassFromExpression(value).x9();
      var tmp$ret$0 = this.d1d(tag);
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
protoOf(AbstractJsonTreeDecoder).k12 = function (tag) {
  return this.k1d((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE());
};
protoOf(AbstractJsonTreeDecoder).l1d = function (tag) {
  var tmp$ret$4;
  $l$block: {
    // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.getPrimitiveValue' call
    // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
    // Inline function 'kotlinx.serialization.json.internal.cast' call
    var value = this.f1d(tag);
    if (!(value instanceof JsonPrimitive)) {
      var tmp = getKClass(JsonPrimitive).x9();
      var tmp_0 = getKClassFromExpression(value).x9();
      var tmp$ret$0 = this.d1d(tag);
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
protoOf(AbstractJsonTreeDecoder).l12 = function (tag) {
  return this.l1d((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE());
};
protoOf(AbstractJsonTreeDecoder).m1d = function (tag) {
  var tmp$ret$4;
  $l$block: {
    // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.getPrimitiveValue' call
    // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
    // Inline function 'kotlinx.serialization.json.internal.cast' call
    var value = this.f1d(tag);
    if (!(value instanceof JsonPrimitive)) {
      var tmp = getKClass(JsonPrimitive).x9();
      var tmp_0 = getKClassFromExpression(value).x9();
      var tmp$ret$0 = this.d1d(tag);
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
  var specialFp = this.y16().u14_1.r16_1;
  if (specialFp || isFinite(result))
    return result;
  throw InvalidFloatingPointDecoded(result, tag, toString(this.e1d()));
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
    var value = this.f1d(tag);
    if (!(value instanceof JsonPrimitive)) {
      var tmp = getKClass(JsonPrimitive).x9();
      var tmp_0 = getKClassFromExpression(value).x9();
      var tmp$ret$0 = this.d1d(tag);
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
  var specialFp = this.y16().u14_1.r16_1;
  if (specialFp || isFinite_0(result))
    return result;
  throw InvalidFloatingPointDecoded(result, tag, toString(this.e1d()));
};
protoOf(AbstractJsonTreeDecoder).n12 = function (tag) {
  return this.n1d((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE());
};
protoOf(AbstractJsonTreeDecoder).o1d = function (tag) {
  var tmp$ret$4;
  $l$block: {
    // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.getPrimitiveValue' call
    // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
    // Inline function 'kotlinx.serialization.json.internal.cast' call
    var value = this.f1d(tag);
    if (!(value instanceof JsonPrimitive)) {
      var tmp = getKClass(JsonPrimitive).x9();
      var tmp_0 = getKClassFromExpression(value).x9();
      var tmp$ret$0 = this.d1d(tag);
      throw JsonDecodingException_0(-1, 'Expected ' + tmp + ', but had ' + tmp_0 + ' as the serialized body of ' + 'char' + ' at element: ' + tmp$ret$0, toString(value));
    }
    var literal = value;
    try {
      var tmp0_elvis_lhs = new Char(single(literal.b17()));
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
protoOf(AbstractJsonTreeDecoder).o12 = function (tag) {
  return this.o1d((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE());
};
protoOf(AbstractJsonTreeDecoder).p1d = function (tag) {
  // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
  // Inline function 'kotlinx.serialization.json.internal.cast' call
  var value = this.f1d(tag);
  if (!(value instanceof JsonPrimitive)) {
    var tmp = getKClass(JsonPrimitive).x9();
    var tmp_0 = getKClassFromExpression(value).x9();
    var tmp$ret$0 = this.d1d(tag);
    throw JsonDecodingException_0(-1, 'Expected ' + tmp + ', but had ' + tmp_0 + ' as the serialized body of ' + 'string' + ' at element: ' + tmp$ret$0, toString(value));
  }
  var value_0 = value;
  if (!(value_0 instanceof JsonLiteral))
    throw JsonDecodingException_0(-1, "Expected string value for a non-null key '" + tag + "', got null literal instead at element: " + this.d1d(tag), toString(this.e1d()));
  if (!value_0.j17_1 && !this.y16().u14_1.j16_1) {
    throw JsonDecodingException_0(-1, "String literal for key '" + tag + "' should be quoted at element: " + this.d1d(tag) + ".\nUse 'isLenient = true' in 'Json {}' builder to accept non-compliant JSON.", toString(this.e1d()));
  }
  return value_0.l17_1;
};
protoOf(AbstractJsonTreeDecoder).p12 = function (tag) {
  return this.p1d((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE());
};
protoOf(AbstractJsonTreeDecoder).q1d = function (tag, inlineDescriptor) {
  var tmp;
  if (get_isUnsignedNumber(inlineDescriptor)) {
    var tmp_0 = this.y16();
    // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.getPrimitiveValue' call
    var tmp2 = this.f1d(tag);
    // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
    // Inline function 'kotlinx.serialization.json.internal.cast' call
    var serialName = inlineDescriptor.bn();
    if (!(tmp2 instanceof JsonPrimitive)) {
      var tmp_1 = getKClass(JsonPrimitive).x9();
      var tmp_2 = getKClassFromExpression(tmp2).x9();
      var tmp$ret$0 = this.d1d(tag);
      throw JsonDecodingException_0(-1, 'Expected ' + tmp_1 + ', but had ' + tmp_2 + ' as the serialized body of ' + serialName + ' at element: ' + tmp$ret$0, toString(tmp2));
    }
    var lexer = StringJsonLexer_0(tmp_0, tmp2.b17());
    tmp = new JsonDecoderForUnsignedTypes(lexer, this.y16());
  } else {
    tmp = protoOf(NamedValueDecoder).q12.call(this, tag, inlineDescriptor);
  }
  return tmp;
};
protoOf(AbstractJsonTreeDecoder).q12 = function (tag, inlineDescriptor) {
  return this.q1d((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE(), inlineDescriptor);
};
protoOf(AbstractJsonTreeDecoder).oo = function (descriptor) {
  return !(this.c12() == null) ? protoOf(NamedValueDecoder).oo.call(this, descriptor) : (new JsonPrimitiveDecoder(this.y16(), this.m2(), this.b1d_1)).oo(descriptor);
};
function setForceNull($this, descriptor, index) {
  $this.a1e_1 = (!$this.y16().u14_1.m16_1 && !descriptor.kn(index) && descriptor.jn(index).um());
  return $this.a1e_1;
}
function JsonTreeDecoder(json, value, polymorphicDiscriminator, polyDescriptor) {
  polymorphicDiscriminator = polymorphicDiscriminator === VOID ? null : polymorphicDiscriminator;
  polyDescriptor = polyDescriptor === VOID ? null : polyDescriptor;
  AbstractJsonTreeDecoder.call(this, json, value, polymorphicDiscriminator);
  this.x1d_1 = value;
  this.y1d_1 = polyDescriptor;
  this.z1d_1 = 0;
  this.a1e_1 = false;
}
protoOf(JsonTreeDecoder).m2 = function () {
  return this.x1d_1;
};
protoOf(JsonTreeDecoder).hp = function (descriptor) {
  $l$loop: while (this.z1d_1 < descriptor.en()) {
    var _unary__edvuaz = this.z1d_1;
    this.z1d_1 = _unary__edvuaz + 1 | 0;
    var name = this.x11(descriptor, _unary__edvuaz);
    var index = this.z1d_1 - 1 | 0;
    this.a1e_1 = false;
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
      if (!this.c1d_1.o16_1)
        return index;
      var tmp0 = this.y16();
      var tmp$ret$3;
      $l$block_2: {
        // Inline function 'kotlinx.serialization.json.internal.tryCoerceValue' call
        var isOptional = descriptor.kn(index);
        var elementDescriptor = descriptor.jn(index);
        var tmp_0;
        if (isOptional && !elementDescriptor.um()) {
          var tmp_1 = this.b1e(name);
          tmp_0 = tmp_1 instanceof JsonNull;
        } else {
          tmp_0 = false;
        }
        if (tmp_0) {
          tmp$ret$3 = true;
          break $l$block_2;
        }
        if (equals(elementDescriptor.cn(), ENUM_getInstance())) {
          var tmp_2;
          if (elementDescriptor.um()) {
            var tmp_3 = this.b1e(name);
            tmp_2 = tmp_3 instanceof JsonNull;
          } else {
            tmp_2 = false;
          }
          if (tmp_2) {
            tmp$ret$3 = false;
            break $l$block_2;
          }
          var tmp_4 = this.b1e(name);
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
          var coerceToNull = !tmp0.u14_1.m16_1 && elementDescriptor.um();
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
protoOf(JsonTreeDecoder).do = function () {
  return !this.a1e_1 && protoOf(AbstractJsonTreeDecoder).do.call(this);
};
protoOf(JsonTreeDecoder).y11 = function (descriptor, index) {
  var strategy = namingStrategy(descriptor, this.y16());
  var baseName = descriptor.gn(index);
  if (strategy == null) {
    if (!this.c1d_1.s16_1)
      return baseName;
    if (this.m2().f2().y1(baseName))
      return baseName;
  }
  var deserializationNamesMap_0 = deserializationNamesMap(this.y16(), descriptor);
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
  var fallbackName = strategy == null ? null : strategy.s19(descriptor, index, baseName);
  return fallbackName == null ? baseName : fallbackName;
};
protoOf(JsonTreeDecoder).f1d = function (tag) {
  return getValue(this.m2(), tag);
};
protoOf(JsonTreeDecoder).b1e = function (tag) {
  return this.m2().e17(tag);
};
protoOf(JsonTreeDecoder).ro = function (descriptor) {
  if (descriptor === this.y1d_1) {
    var tmp = this.y16();
    var tmp2 = this.e1d();
    // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
    // Inline function 'kotlinx.serialization.json.internal.cast' call
    var serialName = this.y1d_1.bn();
    if (!(tmp2 instanceof JsonObject)) {
      var tmp_0 = getKClass(JsonObject).x9();
      var tmp_1 = getKClassFromExpression(tmp2).x9();
      var tmp$ret$0 = this.e12();
      throw JsonDecodingException_0(-1, 'Expected ' + tmp_0 + ', but had ' + tmp_1 + ' as the serialized body of ' + serialName + ' at element: ' + tmp$ret$0, toString(tmp2));
    }
    return new JsonTreeDecoder(tmp, tmp2, this.b1d_1, this.y1d_1);
  }
  return protoOf(AbstractJsonTreeDecoder).ro.call(this, descriptor);
};
protoOf(JsonTreeDecoder).so = function (descriptor) {
  var tmp;
  if (ignoreUnknownKeys(descriptor, this.y16())) {
    tmp = true;
  } else {
    var tmp_0 = descriptor.cn();
    tmp = tmp_0 instanceof PolymorphicKind;
  }
  if (tmp)
    return Unit_instance;
  var strategy = namingStrategy(descriptor, this.y16());
  var tmp_1;
  if (strategy == null && !this.c1d_1.s16_1) {
    tmp_1 = jsonCachedSerialNames(descriptor);
  } else if (!(strategy == null)) {
    tmp_1 = deserializationNamesMap(this.y16(), descriptor).f2();
  } else {
    var tmp_2 = jsonCachedSerialNames(descriptor);
    var tmp0_safe_receiver = get_schemaCache(this.y16()).d1c(descriptor, get_JsonDeserializationNamesKey());
    // Inline function 'kotlin.collections.orEmpty' call
    var tmp0_elvis_lhs = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.f2();
    var tmp$ret$0 = tmp0_elvis_lhs == null ? emptySet() : tmp0_elvis_lhs;
    tmp_1 = plus_0(tmp_2, tmp$ret$0);
  }
  var names = tmp_1;
  var _iterator__ex2g4s = this.m2().f2().r();
  while (_iterator__ex2g4s.s()) {
    var key = _iterator__ex2g4s.t();
    if (!names.y1(key) && !(key === this.b1d_1)) {
      throw JsonDecodingException_1(-1, "Encountered an unknown key '" + key + "' at element: " + this.e12() + '\n' + "Use 'ignoreUnknownKeys = true' in 'Json {}' builder or '@JsonIgnoreUnknownKeys' annotation to ignore unknown keys.\n" + ('JSON input: ' + toString(minify(this.m2().toString()))));
    }
  }
};
function JsonTreeListDecoder(json, value) {
  AbstractJsonTreeDecoder.call(this, json, value);
  this.i1e_1 = value;
  this.j1e_1 = this.i1e_1.u();
  this.k1e_1 = -1;
}
protoOf(JsonTreeListDecoder).m2 = function () {
  return this.i1e_1;
};
protoOf(JsonTreeListDecoder).y11 = function (descriptor, index) {
  return index.toString();
};
protoOf(JsonTreeListDecoder).f1d = function (tag) {
  return this.i1e_1.w(toInt(tag));
};
protoOf(JsonTreeListDecoder).hp = function (descriptor) {
  while (this.k1e_1 < (this.j1e_1 - 1 | 0)) {
    this.k1e_1 = this.k1e_1 + 1 | 0;
    return this.k1e_1;
  }
  return -1;
};
function JsonPrimitiveDecoder(json, value, polymorphicDiscriminator) {
  polymorphicDiscriminator = polymorphicDiscriminator === VOID ? null : polymorphicDiscriminator;
  AbstractJsonTreeDecoder.call(this, json, value, polymorphicDiscriminator);
  this.r1e_1 = value;
  this.r12('primitive');
}
protoOf(JsonPrimitiveDecoder).m2 = function () {
  return this.r1e_1;
};
protoOf(JsonPrimitiveDecoder).hp = function (descriptor) {
  return 0;
};
protoOf(JsonPrimitiveDecoder).f1d = function (tag) {
  // Inline function 'kotlin.require' call
  if (!(tag === 'primitive')) {
    var message = "This input can only handle primitives with 'primitive' tag";
    throw IllegalArgumentException_init_$Create$(toString(message));
  }
  return this.r1e_1;
};
function JsonTreeMapDecoder(json, value) {
  JsonTreeDecoder.call(this, json, value);
  this.c1f_1 = value;
  this.d1f_1 = toList(this.c1f_1.f2());
  this.e1f_1 = imul(this.d1f_1.u(), 2);
  this.f1f_1 = -1;
}
protoOf(JsonTreeMapDecoder).m2 = function () {
  return this.c1f_1;
};
protoOf(JsonTreeMapDecoder).y11 = function (descriptor, index) {
  var i = index / 2 | 0;
  return this.d1f_1.w(i);
};
protoOf(JsonTreeMapDecoder).hp = function (descriptor) {
  while (this.f1f_1 < (this.e1f_1 - 1 | 0)) {
    this.f1f_1 = this.f1f_1 + 1 | 0;
    return this.f1f_1;
  }
  return -1;
};
protoOf(JsonTreeMapDecoder).f1d = function (tag) {
  return (this.f1f_1 % 2 | 0) === 0 ? JsonPrimitive_0(tag) : getValue(this.c1f_1, tag);
};
protoOf(JsonTreeMapDecoder).so = function (descriptor) {
};
function readPolymorphicJson(_this__u8e3s4, discriminator, element, deserializer) {
  return (new JsonTreeDecoder(_this__u8e3s4, element, discriminator, deserializer.ul())).qo(deserializer);
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
  this.q1c_1 = begin;
  this.r1c_1 = end;
}
function switchMode(_this__u8e3s4, desc) {
  var tmp0_subject = desc.cn();
  var tmp;
  if (tmp0_subject instanceof PolymorphicKind) {
    tmp = WriteMode_POLY_OBJ_getInstance();
  } else {
    if (equals(tmp0_subject, LIST_getInstance())) {
      tmp = WriteMode_LIST_getInstance();
    } else {
      if (equals(tmp0_subject, MAP_getInstance())) {
        // Inline function 'kotlinx.serialization.json.internal.selectMapMode' call
        var keyDescriptor = carrierDescriptor(desc.jn(0), _this__u8e3s4.fp());
        var keyKind = keyDescriptor.cn();
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
          if (_this__u8e3s4.u14_1.k16_1) {
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
  if (equals(_this__u8e3s4.cn(), CONTEXTUAL_getInstance())) {
    var tmp0_safe_receiver = getContextualDescriptor(module_0, _this__u8e3s4);
    var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : carrierDescriptor(tmp0_safe_receiver, module_0);
    tmp = tmp1_elvis_lhs == null ? _this__u8e3s4 : tmp1_elvis_lhs;
  } else if (_this__u8e3s4.dn()) {
    tmp = carrierDescriptor(_this__u8e3s4.jn(0), module_0);
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
  $this.g1f(lastPosition, current);
  return appendEsc($this, current + 1 | 0);
}
function decodedString($this, lastPosition, currentPosition) {
  $this.g1f(lastPosition, currentPosition);
  var result = $this.m15_1.toString();
  $this.m15_1.mb(0);
  return result;
}
function takePeeked($this) {
  // Inline function 'kotlin.also' call
  var this_0 = ensureNotNull($this.l15_1);
  $this.l15_1 = null;
  return this_0;
}
function wasUnquotedString($this) {
  return !(charSequenceGet($this.h1f(), $this.j15_1 - 1 | 0) === _Char___init__impl__6a9atx(34));
}
function appendEsc($this, startPosition) {
  var currentPosition = startPosition;
  currentPosition = $this.i1f(currentPosition);
  if (currentPosition === -1) {
    $this.o19('Expected escape sequence to continue, got EOF');
  }
  var tmp = $this.h1f();
  var _unary__edvuaz = currentPosition;
  currentPosition = _unary__edvuaz + 1 | 0;
  var currentChar = charSequenceGet(tmp, _unary__edvuaz);
  if (currentChar === _Char___init__impl__6a9atx(117)) {
    return appendHex($this, $this.h1f(), currentPosition);
  }
  // Inline function 'kotlin.code' call
  var tmp$ret$0 = Char__toInt_impl_vasixd(currentChar);
  var c = escapeToChar(tmp$ret$0);
  if (c === _Char___init__impl__6a9atx(0)) {
    $this.o19("Invalid escaped char '" + toString_1(currentChar) + "'");
  }
  $this.m15_1.s7(c);
  return currentPosition;
}
function appendHex($this, source, startPos) {
  if ((startPos + 4 | 0) >= charSequenceLength(source)) {
    $this.j15_1 = startPos;
    $this.j1f();
    if (($this.j15_1 + 4 | 0) >= charSequenceLength(source)) {
      $this.o19('Unexpected EOF during unicode escape');
    }
    return appendHex($this, source, $this.j15_1);
  }
  $this.m15_1.s7(numberToChar((((fromHexChar($this, source, startPos) << 12) + (fromHexChar($this, source, startPos + 1 | 0) << 8) | 0) + (fromHexChar($this, source, startPos + 2 | 0) << 4) | 0) + fromHexChar($this, source, startPos + 3 | 0) | 0));
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
    $this.o19("Invalid toHexChar char '" + toString_1(character) + "' in unicode escape");
  }
  return tmp;
}
function consumeBoolean2($this, start) {
  var current = $this.i1f(start);
  if (current >= charSequenceLength($this.h1f()) || current === -1) {
    $this.o19('EOF');
  }
  var tmp = $this.h1f();
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
      $this.o19("Expected valid boolean literal prefix, but had '" + $this.w1a() + "'");
    }
  }
  return tmp_0;
}
function consumeBooleanLiteral($this, literalSuffix, current) {
  if ((charSequenceLength($this.h1f()) - current | 0) < literalSuffix.length) {
    $this.o19('Unexpected end of boolean literal');
  }
  var inductionVariable = 0;
  var last = charSequenceLength(literalSuffix) - 1 | 0;
  if (inductionVariable <= last)
    do {
      var i = inductionVariable;
      inductionVariable = inductionVariable + 1 | 0;
      var expected = charCodeAt(literalSuffix, i);
      var actual = charSequenceGet($this.h1f(), current + i | 0);
      // Inline function 'kotlin.code' call
      var tmp = Char__toInt_impl_vasixd(expected);
      // Inline function 'kotlin.code' call
      if (!(tmp === (Char__toInt_impl_vasixd(actual) | 32))) {
        $this.o19("Expected valid boolean literal prefix, but had '" + $this.w1a() + "'");
      }
    }
     while (inductionVariable <= last);
  $this.j15_1 = current + literalSuffix.length | 0;
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
  this.j15_1 = 0;
  this.k15_1 = new JsonPath();
  this.l15_1 = null;
  this.m15_1 = StringBuilder_init_$Create$();
}
protoOf(AbstractJsonLexer).j1f = function () {
};
protoOf(AbstractJsonLexer).g1c = function () {
  var current = this.k1f();
  var source = this.h1f();
  if (current >= charSequenceLength(source) || current === -1)
    return false;
  if (charSequenceGet(source, current) === _Char___init__impl__6a9atx(44)) {
    this.j15_1 = this.j15_1 + 1 | 0;
    return true;
  }
  return false;
};
protoOf(AbstractJsonLexer).l1f = function (c) {
  return c === _Char___init__impl__6a9atx(125) || c === _Char___init__impl__6a9atx(93) || (c === _Char___init__impl__6a9atx(58) || c === _Char___init__impl__6a9atx(44)) ? false : true;
};
protoOf(AbstractJsonLexer).n15 = function () {
  var nextToken = this.y1a();
  if (!(nextToken === 10)) {
    this.o19('Expected EOF after parsing, but had ' + toString_1(charSequenceGet(this.h1f(), this.j15_1 - 1 | 0)) + ' instead');
  }
};
protoOf(AbstractJsonLexer).s1a = function (expected) {
  var token = this.y1a();
  if (!(token === expected)) {
    // Inline function 'kotlinx.serialization.json.internal.AbstractJsonLexer.fail' call
    var expected_0 = tokenDescription(expected);
    var position = true ? this.j15_1 - 1 | 0 : this.j15_1;
    var s = this.j15_1 === charSequenceLength(this.h1f()) || position < 0 ? 'EOF' : toString_1(charSequenceGet(this.h1f(), position));
    var tmp$ret$0 = 'Expected ' + expected_0 + ", but had '" + s + "' instead";
    this.o19(tmp$ret$0, position);
  }
  return token;
};
protoOf(AbstractJsonLexer).m1f = function (expected) {
  if (this.j15_1 > 0 && expected === _Char___init__impl__6a9atx(34)) {
    var tmp$ret$1;
    $l$block: {
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonLexer.withPositionRollback' call
      var snapshot = this.j15_1;
      try {
        this.j15_1 = this.j15_1 - 1 | 0;
        tmp$ret$1 = this.w1a();
        break $l$block;
      }finally {
        this.j15_1 = snapshot;
      }
    }
    var inputLiteral = tmp$ret$1;
    if (inputLiteral === 'null') {
      this.n19("Expected string literal but 'null' literal was found", this.j15_1 - 1 | 0, "Use 'coerceInputValues = true' in 'Json {}' builder to coerce nulls if property has a default value.");
    }
  }
  // Inline function 'kotlinx.serialization.json.internal.AbstractJsonLexer.fail' call
  var expectedToken = charToTokenClass(expected);
  var expected_0 = tokenDescription(expectedToken);
  var position = true ? this.j15_1 - 1 | 0 : this.j15_1;
  var s = this.j15_1 === charSequenceLength(this.h1f()) || position < 0 ? 'EOF' : toString_1(charSequenceGet(this.h1f(), position));
  var tmp$ret$2 = 'Expected ' + expected_0 + ", but had '" + s + "' instead";
  this.o19(tmp$ret$2, position);
};
protoOf(AbstractJsonLexer).t1a = function () {
  var source = this.h1f();
  var cpos = this.j15_1;
  $l$loop_0: while (true) {
    cpos = this.i1f(cpos);
    if (cpos === -1)
      break $l$loop_0;
    var ch = charSequenceGet(source, cpos);
    if (ch === _Char___init__impl__6a9atx(32) || ch === _Char___init__impl__6a9atx(10) || ch === _Char___init__impl__6a9atx(13) || ch === _Char___init__impl__6a9atx(9)) {
      cpos = cpos + 1 | 0;
      continue $l$loop_0;
    }
    this.j15_1 = cpos;
    return charToTokenClass(ch);
  }
  this.j15_1 = cpos;
  return 10;
};
protoOf(AbstractJsonLexer).h1c = function (doConsume) {
  var current = this.k1f();
  current = this.i1f(current);
  var len = charSequenceLength(this.h1f()) - current | 0;
  if (len < 4 || current === -1)
    return false;
  var inductionVariable = 0;
  if (inductionVariable <= 3)
    do {
      var i = inductionVariable;
      inductionVariable = inductionVariable + 1 | 0;
      if (!(charCodeAt('null', i) === charSequenceGet(this.h1f(), current + i | 0)))
        return false;
    }
     while (inductionVariable <= 3);
  if (len > 4 && charToTokenClass(charSequenceGet(this.h1f(), current + 4 | 0)) === 0)
    return false;
  if (doConsume) {
    this.j15_1 = current + 4 | 0;
  }
  return true;
};
protoOf(AbstractJsonLexer).s1c = function (doConsume, $super) {
  doConsume = doConsume === VOID ? true : doConsume;
  return $super === VOID ? this.h1c(doConsume) : $super.h1c.call(this, doConsume);
};
protoOf(AbstractJsonLexer).i1c = function (isLenient) {
  var token = this.t1a();
  var tmp;
  if (isLenient) {
    if (!(token === 1) && !(token === 0))
      return null;
    tmp = this.w1a();
  } else {
    if (!(token === 1))
      return null;
    tmp = this.v1a();
  }
  var string = tmp;
  this.l15_1 = string;
  return string;
};
protoOf(AbstractJsonLexer).n1f = function () {
  this.l15_1 = null;
};
protoOf(AbstractJsonLexer).nb = function (startPos, endPos) {
  // Inline function 'kotlin.text.substring' call
  var this_0 = this.h1f();
  return toString(charSequenceSubSequence(this_0, startPos, endPos));
};
protoOf(AbstractJsonLexer).v1a = function () {
  if (!(this.l15_1 == null)) {
    return takePeeked(this);
  }
  return this.l1c();
};
protoOf(AbstractJsonLexer).consumeString2 = function (source, startPosition, current) {
  var currentPosition = current;
  var lastPosition = startPosition;
  var char = charSequenceGet(source, currentPosition);
  var usedAppend = false;
  while (!(char === _Char___init__impl__6a9atx(34))) {
    if (char === _Char___init__impl__6a9atx(92)) {
      usedAppend = true;
      currentPosition = this.i1f(appendEscape(this, lastPosition, currentPosition));
      if (currentPosition === -1) {
        this.o19('Unexpected EOF', currentPosition);
      }
      lastPosition = currentPosition;
    } else {
      currentPosition = currentPosition + 1 | 0;
      if (currentPosition >= charSequenceLength(source)) {
        usedAppend = true;
        this.g1f(lastPosition, currentPosition);
        currentPosition = this.i1f(currentPosition);
        if (currentPosition === -1) {
          this.o19('Unexpected EOF', currentPosition);
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
  this.j15_1 = currentPosition + 1 | 0;
  return string;
};
protoOf(AbstractJsonLexer).m1c = function () {
  var result = this.w1a();
  if (result === 'null' && wasUnquotedString(this)) {
    this.o19("Unexpected 'null' value instead of string literal");
  }
  return result;
};
protoOf(AbstractJsonLexer).w1a = function () {
  if (!(this.l15_1 == null)) {
    return takePeeked(this);
  }
  var current = this.k1f();
  if (current >= charSequenceLength(this.h1f()) || current === -1) {
    this.o19('EOF', current);
  }
  var token = charToTokenClass(charSequenceGet(this.h1f(), current));
  if (token === 1) {
    return this.v1a();
  }
  if (!(token === 0)) {
    this.o19('Expected beginning of the string, but got ' + toString_1(charSequenceGet(this.h1f(), current)));
  }
  var usedAppend = false;
  while (charToTokenClass(charSequenceGet(this.h1f(), current)) === 0) {
    current = current + 1 | 0;
    if (current >= charSequenceLength(this.h1f())) {
      usedAppend = true;
      this.g1f(this.j15_1, current);
      var eof = this.i1f(current);
      if (eof === -1) {
        this.j15_1 = current;
        return decodedString(this, 0, 0);
      } else {
        current = eof;
      }
    }
  }
  var tmp;
  if (!usedAppend) {
    tmp = this.nb(this.j15_1, current);
  } else {
    tmp = decodedString(this, this.j15_1, current);
  }
  var result = tmp;
  this.j15_1 = current;
  return result;
};
protoOf(AbstractJsonLexer).g1f = function (fromIndex, toIndex) {
  this.m15_1.gb(this.h1f(), fromIndex, toIndex);
};
protoOf(AbstractJsonLexer).k1c = function (allowLenientStrings) {
  // Inline function 'kotlin.collections.mutableListOf' call
  var tokenStack = ArrayList_init_$Create$();
  var lastToken = this.t1a();
  if (!(lastToken === 8) && !(lastToken === 6)) {
    this.w1a();
    return Unit_instance;
  }
  $l$loop: while (true) {
    lastToken = this.t1a();
    if (lastToken === 1) {
      if (allowLenientStrings)
        this.w1a();
      else
        this.l1c();
      continue $l$loop;
    }
    var tmp0_subject = lastToken;
    if (tmp0_subject === 8 || tmp0_subject === 6) {
      tokenStack.j(lastToken);
    } else if (tmp0_subject === 9) {
      if (!(last(tokenStack) === 8))
        throw JsonDecodingException_0(this.j15_1, 'found ] instead of } at path: ' + this.k15_1.toString(), this.h1f());
      removeLast(tokenStack);
    } else if (tmp0_subject === 7) {
      if (!(last(tokenStack) === 6))
        throw JsonDecodingException_0(this.j15_1, 'found } instead of ] at path: ' + this.k15_1.toString(), this.h1f());
      removeLast(tokenStack);
    } else if (tmp0_subject === 10) {
      this.o19('Unexpected end of input due to malformed JSON during ignoring unknown keys');
    }
    this.y1a();
    if (tokenStack.u() === 0)
      return Unit_instance;
  }
};
protoOf(AbstractJsonLexer).toString = function () {
  return "JsonReader(source='" + toString(this.h1f()) + "', currentPosition=" + this.j15_1 + ')';
};
protoOf(AbstractJsonLexer).j1c = function (key) {
  var processed = this.nb(0, this.j15_1);
  var lastIndexOf_0 = lastIndexOf(processed, key);
  throw new JsonDecodingException("Encountered an unknown key '" + key + "' at offset " + lastIndexOf_0 + ' at path: ' + this.k15_1.b1a() + "\nUse 'ignoreUnknownKeys = true' in 'Json {}' builder or '@JsonIgnoreUnknownKeys' annotation to ignore unknown keys.\n" + ('JSON input: ' + toString(minify(this.h1f(), lastIndexOf_0))));
};
protoOf(AbstractJsonLexer).n19 = function (message, position, hint) {
  var tmp;
  // Inline function 'kotlin.text.isEmpty' call
  if (charSequenceLength(hint) === 0) {
    tmp = '';
  } else {
    tmp = '\n' + hint;
  }
  var hintMessage = tmp;
  throw JsonDecodingException_0(position, message + ' at path: ' + this.k15_1.b1a() + hintMessage, this.h1f());
};
protoOf(AbstractJsonLexer).o19 = function (message, position, hint, $super) {
  position = position === VOID ? this.j15_1 : position;
  hint = hint === VOID ? '' : hint;
  return $super === VOID ? this.n19(message, position, hint) : $super.n19.call(this, message, position, hint);
};
protoOf(AbstractJsonLexer).u1c = function () {
  var current = this.k1f();
  current = this.i1f(current);
  if (current >= charSequenceLength(this.h1f()) || current === -1) {
    this.o19('EOF');
  }
  var tmp;
  if (charSequenceGet(this.h1f(), current) === _Char___init__impl__6a9atx(34)) {
    current = current + 1 | 0;
    if (current === charSequenceLength(this.h1f())) {
      this.o19('EOF');
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
  $l$loop_4: while (!(current === charSequenceLength(this.h1f()))) {
    var ch = charSequenceGet(this.h1f(), current);
    if ((ch === _Char___init__impl__6a9atx(101) || ch === _Char___init__impl__6a9atx(69)) && !hasExponent) {
      if (current === start) {
        this.o19('Unexpected symbol ' + toString_1(ch) + ' in numeric literal');
      }
      isExponentPositive = true;
      hasExponent = true;
      current = current + 1 | 0;
      continue $l$loop_4;
    }
    if (ch === _Char___init__impl__6a9atx(45) && hasExponent) {
      if (current === start) {
        this.o19("Unexpected symbol '-' in numeric literal");
      }
      isExponentPositive = false;
      current = current + 1 | 0;
      continue $l$loop_4;
    }
    if (ch === _Char___init__impl__6a9atx(43) && hasExponent) {
      if (current === start) {
        this.o19("Unexpected symbol '+' in numeric literal");
      }
      isExponentPositive = true;
      current = current + 1 | 0;
      continue $l$loop_4;
    }
    if (ch === _Char___init__impl__6a9atx(45)) {
      if (!(current === start)) {
        this.o19("Unexpected symbol '-' in numeric literal");
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
      this.o19("Unexpected symbol '" + toString_1(ch) + "' in numeric literal");
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
      this.o19('Numeric value overflow');
    }
  }
  var hasChars = !(current === start);
  if (start === current || (isNegative && start === (current - 1 | 0))) {
    this.o19('Expected numeric literal');
  }
  if (hasQuotation) {
    if (!hasChars) {
      this.o19('EOF');
    }
    if (!(charSequenceGet(this.h1f(), current) === _Char___init__impl__6a9atx(34))) {
      this.o19('Expected closing quotation mark');
    }
    current = current + 1 | 0;
  }
  this.j15_1 = current;
  if (hasExponent) {
    var doubleAccumulator = toNumber(accumulator) * consumeNumericLiteral$calculateExponent(exponentAccumulator, isExponentPositive);
    if (doubleAccumulator > toNumber(new Long(-1, 2147483647)) || doubleAccumulator < toNumber(new Long(0, -2147483648))) {
      this.o19('Numeric value overflow');
    }
    // Inline function 'kotlin.math.floor' call
    if (!(Math.floor(doubleAccumulator) === doubleAccumulator)) {
      this.o19("Can't convert " + doubleAccumulator + ' to Long');
    }
    accumulator = numberToLong(doubleAccumulator);
  }
  var tmp_0;
  if (isNegative) {
    tmp_0 = accumulator;
  } else if (!equalsLong(accumulator, new Long(0, -2147483648))) {
    tmp_0 = negate(accumulator);
  } else {
    this.o19('Numeric value overflow');
  }
  return tmp_0;
};
protoOf(AbstractJsonLexer).m17 = function () {
  var result = this.u1c();
  var next = this.y1a();
  if (!(next === 10)) {
    // Inline function 'kotlinx.serialization.json.internal.AbstractJsonLexer.fail' call
    var expected = tokenDescription(10);
    var position = true ? this.j15_1 - 1 | 0 : this.j15_1;
    var s = this.j15_1 === charSequenceLength(this.h1f()) || position < 0 ? 'EOF' : toString_1(charSequenceGet(this.h1f(), position));
    var tmp$ret$0 = "Expected input to contain a single valid number, but got '" + s + "' after it";
    this.o19(tmp$ret$0, position);
  }
  return result;
};
protoOf(AbstractJsonLexer).t1c = function () {
  var current = this.k1f();
  if (current === charSequenceLength(this.h1f())) {
    this.o19('EOF');
  }
  var tmp;
  if (charSequenceGet(this.h1f(), current) === _Char___init__impl__6a9atx(34)) {
    current = current + 1 | 0;
    tmp = true;
  } else {
    tmp = false;
  }
  var hasQuotation = tmp;
  var result = consumeBoolean2(this, current);
  if (hasQuotation) {
    if (this.j15_1 === charSequenceLength(this.h1f())) {
      this.o19('EOF');
    }
    if (!(charSequenceGet(this.h1f(), this.j15_1) === _Char___init__impl__6a9atx(34))) {
      this.o19('Expected closing quotation mark');
    }
    this.j15_1 = this.j15_1 + 1 | 0;
  }
  return result;
};
function charToTokenClass(c) {
  var tmp;
  // Inline function 'kotlin.code' call
  if (Char__toInt_impl_vasixd(c) < 126) {
    var tmp_0 = CharMappings_getInstance().p1f_1;
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
  return c < 117 ? CharMappings_getInstance().o1f_1[c] : _Char___init__impl__6a9atx(0);
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
    $this.o1f_1[tmp$ret$0] = numberToChar(c);
  }
}
function initC2ESC_0($this, c, esc) {
  // Inline function 'kotlin.code' call
  var tmp$ret$0 = Char__toInt_impl_vasixd(c);
  return initC2ESC($this, tmp$ret$0, esc);
}
function initC2TC($this, c, cl) {
  $this.p1f_1[c] = cl;
}
function initC2TC_0($this, c, cl) {
  // Inline function 'kotlin.code' call
  var tmp$ret$0 = Char__toInt_impl_vasixd(c);
  return initC2TC($this, tmp$ret$0, cl);
}
function CharMappings() {
  CharMappings_instance = this;
  this.o1f_1 = charArray(117);
  this.p1f_1 = new Int8Array(126);
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
protoOf(StringJsonLexerWithComments).y1a = function () {
  var source = this.h1f();
  var cpos = this.k1f();
  if (cpos >= source.length || cpos === -1)
    return 10;
  this.j15_1 = cpos + 1 | 0;
  return charToTokenClass(charCodeAt(source, cpos));
};
protoOf(StringJsonLexerWithComments).u1a = function () {
  var current = this.k1f();
  if (current >= this.h1f().length || current === -1)
    return false;
  return this.l1f(charCodeAt(this.h1f(), current));
};
protoOf(StringJsonLexerWithComments).f1c = function (expected) {
  var source = this.h1f();
  var current = this.k1f();
  if (current >= source.length || current === -1) {
    this.j15_1 = -1;
    this.m1f(expected);
  }
  var c = charCodeAt(source, current);
  this.j15_1 = current + 1 | 0;
  if (c === expected)
    return Unit_instance;
  else {
    this.m1f(expected);
  }
};
protoOf(StringJsonLexerWithComments).t1a = function () {
  var source = this.h1f();
  var cpos = this.k1f();
  if (cpos >= source.length || cpos === -1)
    return 10;
  this.j15_1 = cpos;
  return charToTokenClass(charCodeAt(source, cpos));
};
protoOf(StringJsonLexerWithComments).k1f = function () {
  var current = this.j15_1;
  if (current === -1)
    return current;
  var source = this.h1f();
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
          this.j15_1 = source.length;
          this.o19('Expected end of the block comment: "*/", but had EOF instead');
        } else {
          current = current + 2 | 0;
        }
        continue $l$loop_1;
      }
    }
    break $l$loop_1;
  }
  this.j15_1 = current;
  return current;
};
function StringJsonLexer(source) {
  AbstractJsonLexer.call(this);
  this.z1f_1 = source;
}
protoOf(StringJsonLexer).h1f = function () {
  return this.z1f_1;
};
protoOf(StringJsonLexer).i1f = function (position) {
  return position < this.h1f().length ? position : -1;
};
protoOf(StringJsonLexer).y1a = function () {
  var source = this.h1f();
  var cpos = this.j15_1;
  $l$loop: while (!(cpos === -1) && cpos < source.length) {
    var _unary__edvuaz = cpos;
    cpos = _unary__edvuaz + 1 | 0;
    var c = charCodeAt(source, _unary__edvuaz);
    // Inline function 'kotlinx.serialization.json.internal.AbstractJsonLexer.isWs' call
    if (c === _Char___init__impl__6a9atx(32) || c === _Char___init__impl__6a9atx(10) || c === _Char___init__impl__6a9atx(13) || c === _Char___init__impl__6a9atx(9))
      continue $l$loop;
    this.j15_1 = cpos;
    return charToTokenClass(c);
  }
  this.j15_1 = source.length;
  return 10;
};
protoOf(StringJsonLexer).u1a = function () {
  var current = this.j15_1;
  if (current === -1)
    return false;
  var source = this.h1f();
  $l$loop: while (current < source.length) {
    var c = charCodeAt(source, current);
    // Inline function 'kotlinx.serialization.json.internal.AbstractJsonLexer.isWs' call
    if (c === _Char___init__impl__6a9atx(32) || c === _Char___init__impl__6a9atx(10) || c === _Char___init__impl__6a9atx(13) || c === _Char___init__impl__6a9atx(9)) {
      current = current + 1 | 0;
      continue $l$loop;
    }
    this.j15_1 = current;
    return this.l1f(c);
  }
  this.j15_1 = current;
  return false;
};
protoOf(StringJsonLexer).k1f = function () {
  var current = this.j15_1;
  if (current === -1)
    return current;
  var source = this.h1f();
  $l$loop: while (current < source.length) {
    var c = charCodeAt(source, current);
    // Inline function 'kotlinx.serialization.json.internal.AbstractJsonLexer.isWs' call
    if (c === _Char___init__impl__6a9atx(32) || c === _Char___init__impl__6a9atx(10) || c === _Char___init__impl__6a9atx(13) || c === _Char___init__impl__6a9atx(9)) {
      current = current + 1 | 0;
    } else {
      break $l$loop;
    }
  }
  this.j15_1 = current;
  return current;
};
protoOf(StringJsonLexer).f1c = function (expected) {
  if (this.j15_1 === -1) {
    this.m1f(expected);
  }
  var source = this.h1f();
  var cpos = this.j15_1;
  $l$loop: while (cpos < source.length) {
    var _unary__edvuaz = cpos;
    cpos = _unary__edvuaz + 1 | 0;
    var c = charCodeAt(source, _unary__edvuaz);
    // Inline function 'kotlinx.serialization.json.internal.AbstractJsonLexer.isWs' call
    if (c === _Char___init__impl__6a9atx(32) || c === _Char___init__impl__6a9atx(10) || c === _Char___init__impl__6a9atx(13) || c === _Char___init__impl__6a9atx(9))
      continue $l$loop;
    this.j15_1 = cpos;
    if (c === expected)
      return Unit_instance;
    this.m1f(expected);
  }
  this.j15_1 = -1;
  this.m1f(expected);
};
protoOf(StringJsonLexer).l1c = function () {
  this.f1c(_Char___init__impl__6a9atx(34));
  var current = this.j15_1;
  var closingQuote = indexOf_0(this.h1f(), _Char___init__impl__6a9atx(34), current);
  if (closingQuote === -1) {
    this.w1a();
    // Inline function 'kotlinx.serialization.json.internal.AbstractJsonLexer.fail' call
    var expected = tokenDescription(1);
    var position = false ? this.j15_1 - 1 | 0 : this.j15_1;
    var s = this.j15_1 === charSequenceLength(this.h1f()) || position < 0 ? 'EOF' : toString_1(charSequenceGet(this.h1f(), position));
    var tmp$ret$0 = 'Expected ' + expected + ", but had '" + s + "' instead";
    this.o19(tmp$ret$0, position);
  }
  var inductionVariable = current;
  if (inductionVariable < closingQuote)
    do {
      var i = inductionVariable;
      inductionVariable = inductionVariable + 1 | 0;
      if (charCodeAt(this.h1f(), i) === _Char___init__impl__6a9atx(92)) {
        return this.consumeString2(this.h1f(), this.j15_1, i);
      }
    }
     while (inductionVariable < closingQuote);
  this.j15_1 = closingQuote + 1 | 0;
  return substring(this.h1f(), current, closingQuote);
};
protoOf(StringJsonLexer).n1c = function (keyToMatch, isLenient) {
  var positionSnapshot = this.j15_1;
  try {
    if (!(this.y1a() === 6))
      return null;
    var firstKey = this.i1c(isLenient);
    if (!(firstKey === keyToMatch))
      return null;
    this.n1f();
    if (!(this.y1a() === 5))
      return null;
    return this.i1c(isLenient);
  }finally {
    this.j15_1 = positionSnapshot;
    this.n1f();
  }
};
function StringJsonLexer_0(json, source) {
  return !json.u14_1.w16_1 ? new StringJsonLexer(source) : new StringJsonLexerWithComments(source);
}
function get_schemaCache(_this__u8e3s4) {
  return _this__u8e3s4.w14_1;
}
function JsonToStringWriter() {
  this.z14_1 = StringBuilder_init_$Create$_0(128);
}
protoOf(JsonToStringWriter).s18 = function (value) {
  this.z14_1.kb(value);
};
protoOf(JsonToStringWriter).m18 = function (char) {
  this.z14_1.s7(char);
};
protoOf(JsonToStringWriter).o18 = function (text) {
  this.z14_1.r7(text);
};
protoOf(JsonToStringWriter).y18 = function (text) {
  printQuoted(this.z14_1, text);
};
protoOf(JsonToStringWriter).a15 = function () {
  this.z14_1.pb();
};
protoOf(JsonToStringWriter).toString = function () {
  return this.z14_1.toString();
};
function createMapForCache(initialCapacity) {
  return HashMap_init_$Create$(initialCapacity);
}
//region block: post-declaration
protoOf(defer$1).um = get_isNullable;
protoOf(defer$1).dn = get_isInline;
protoOf(defer$1).fn = get_annotations;
protoOf(JsonSerializersModuleValidator).n14 = contextual;
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
