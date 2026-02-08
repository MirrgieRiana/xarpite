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
  this.l16_1 = configuration;
  this.m16_1 = serializersModule;
  this.n16_1 = new DescriptorSchemaCache();
}
protoOf(Json).wq = function () {
  return this.m16_1;
};
protoOf(Json).o16 = function (serializer, value) {
  var result = new JsonToStringWriter();
  try {
    encodeByWriter(this, result, serializer, value);
    return result.toString();
  }finally {
    result.r16();
  }
};
protoOf(Json).p16 = function (deserializer, string) {
  var lexer = StringJsonLexer_0(this, string);
  var input = new StreamingJsonDecoder(this, WriteMode_OBJ_getInstance(), lexer, deserializer.ln(), null);
  var result = input.hq(deserializer);
  lexer.e17();
  return result;
};
function Json_0(from, builderAction) {
  from = from === VOID ? Default_getInstance() : from;
  var builder = new JsonBuilder(from);
  builderAction(builder);
  var conf = builder.x17();
  return new JsonImpl(conf, builder.w17_1);
}
function JsonBuilder(json) {
  this.f17_1 = json.l16_1.y17_1;
  this.g17_1 = json.l16_1.d18_1;
  this.h17_1 = json.l16_1.z17_1;
  this.i17_1 = json.l16_1.a18_1;
  this.j17_1 = json.l16_1.c18_1;
  this.k17_1 = json.l16_1.e18_1;
  this.l17_1 = json.l16_1.f18_1;
  this.m17_1 = json.l16_1.h18_1;
  this.n17_1 = json.l16_1.o18_1;
  this.o17_1 = json.l16_1.j18_1;
  this.p17_1 = json.l16_1.k18_1;
  this.q17_1 = json.l16_1.l18_1;
  this.r17_1 = json.l16_1.m18_1;
  this.s17_1 = json.l16_1.n18_1;
  this.t17_1 = json.l16_1.i18_1;
  this.u17_1 = json.l16_1.b18_1;
  this.v17_1 = json.l16_1.g18_1;
  this.w17_1 = json.wq();
}
protoOf(JsonBuilder).x17 = function () {
  if (this.v17_1) {
    // Inline function 'kotlin.require' call
    if (!(this.m17_1 === 'type')) {
      var message = 'Class discriminator should not be specified when array polymorphism is specified';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    // Inline function 'kotlin.require' call
    if (!this.n17_1.equals(ClassDiscriminatorMode_POLYMORPHIC_getInstance())) {
      var message_0 = 'useArrayPolymorphism option can only be used if classDiscriminatorMode in a default POLYMORPHIC state.';
      throw IllegalArgumentException_init_$Create$(toString(message_0));
    }
  }
  if (!this.j17_1) {
    // Inline function 'kotlin.require' call
    if (!(this.k17_1 === '    ')) {
      var message_1 = 'Indent should not be specified when default printing mode is used';
      throw IllegalArgumentException_init_$Create$(toString(message_1));
    }
  } else if (!(this.k17_1 === '    ')) {
    var tmp0 = this.k17_1;
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
      var message_2 = 'Only whitespace, tab, newline and carriage return are allowed as pretty print symbols. Had ' + this.k17_1;
      throw IllegalArgumentException_init_$Create$(toString(message_2));
    }
  }
  return new JsonConfiguration(this.f17_1, this.h17_1, this.i17_1, this.u17_1, this.j17_1, this.g17_1, this.k17_1, this.l17_1, this.v17_1, this.m17_1, this.t17_1, this.o17_1, this.p17_1, this.q17_1, this.r17_1, this.s17_1, this.n17_1);
};
function validateConfiguration($this) {
  if (equals($this.wq(), EmptySerializersModule()))
    return Unit_instance;
  var collector = new JsonSerializersModuleValidator($this.l16_1);
  $this.wq().t15(collector);
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
  this.y17_1 = encodeDefaults;
  this.z17_1 = ignoreUnknownKeys;
  this.a18_1 = isLenient;
  this.b18_1 = allowStructuredMapKeys;
  this.c18_1 = prettyPrint;
  this.d18_1 = explicitNulls;
  this.e18_1 = prettyPrintIndent;
  this.f18_1 = coerceInputValues;
  this.g18_1 = useArrayPolymorphism;
  this.h18_1 = classDiscriminator;
  this.i18_1 = allowSpecialFloatingPointValues;
  this.j18_1 = useAlternativeNames;
  this.k18_1 = namingStrategy;
  this.l18_1 = decodeEnumsCaseInsensitive;
  this.m18_1 = allowTrailingComma;
  this.n18_1 = allowComments;
  this.o18_1 = classDiscriminatorMode;
}
protoOf(JsonConfiguration).toString = function () {
  return 'JsonConfiguration(encodeDefaults=' + this.y17_1 + ', ignoreUnknownKeys=' + this.z17_1 + ', isLenient=' + this.a18_1 + ', ' + ('allowStructuredMapKeys=' + this.b18_1 + ', prettyPrint=' + this.c18_1 + ', explicitNulls=' + this.d18_1 + ', ') + ("prettyPrintIndent='" + this.e18_1 + "', coerceInputValues=" + this.f18_1 + ', useArrayPolymorphism=' + this.g18_1 + ', ') + ("classDiscriminator='" + this.h18_1 + "', allowSpecialFloatingPointValues=" + this.i18_1 + ', ') + ('useAlternativeNames=' + this.j18_1 + ', namingStrategy=' + toString_0(this.k18_1) + ', decodeEnumsCaseInsensitive=' + this.l18_1 + ', ') + ('allowTrailingComma=' + this.m18_1 + ', allowComments=' + this.n18_1 + ', classDiscriminatorMode=' + this.o18_1.toString() + ')');
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
  return this.s18();
};
function Companion_1() {
}
var Companion_instance_1;
function Companion_getInstance_5() {
  return Companion_instance_1;
}
function JsonObject$toString$lambda(_destruct__k2r9zo) {
  // Inline function 'kotlin.collections.component1' call
  var k = _destruct__k2r9zo.o2();
  // Inline function 'kotlin.collections.component2' call
  var v = _destruct__k2r9zo.p2();
  // Inline function 'kotlin.text.buildString' call
  // Inline function 'kotlin.apply' call
  var this_0 = StringBuilder_init_$Create$();
  printQuoted(this_0, k);
  this_0.t7(_Char___init__impl__6a9atx(58));
  this_0.r7(v);
  return this_0.toString();
}
function JsonObject(content) {
  JsonElement.call(this);
  this.t18_1 = content;
}
protoOf(JsonObject).equals = function (other) {
  return equals(this.t18_1, other);
};
protoOf(JsonObject).hashCode = function () {
  return hashCode(this.t18_1);
};
protoOf(JsonObject).toString = function () {
  var tmp = this.t18_1.i2();
  return joinToString(tmp, ',', '{', '}', VOID, VOID, JsonObject$toString$lambda);
};
protoOf(JsonObject).o = function () {
  return this.t18_1.o();
};
protoOf(JsonObject).u18 = function (key) {
  return this.t18_1.j2(key);
};
protoOf(JsonObject).j2 = function (key) {
  if (!(!(key == null) ? typeof key === 'string' : false))
    return false;
  return this.u18((!(key == null) ? typeof key === 'string' : false) ? key : THROW_CCE());
};
protoOf(JsonObject).v18 = function (key) {
  return this.t18_1.l2(key);
};
protoOf(JsonObject).l2 = function (key) {
  if (!(!(key == null) ? typeof key === 'string' : false))
    return null;
  return this.v18((!(key == null) ? typeof key === 'string' : false) ? key : THROW_CCE());
};
protoOf(JsonObject).u = function () {
  return this.t18_1.u();
};
protoOf(JsonObject).g2 = function () {
  return this.t18_1.g2();
};
protoOf(JsonObject).h2 = function () {
  return this.t18_1.h2();
};
protoOf(JsonObject).i2 = function () {
  return this.t18_1.i2();
};
function Companion_2() {
}
var Companion_instance_2;
function Companion_getInstance_6() {
  return Companion_instance_2;
}
function JsonArray(content) {
  JsonElement.call(this);
  this.w18_1 = content;
}
protoOf(JsonArray).equals = function (other) {
  return equals(this.w18_1, other);
};
protoOf(JsonArray).hashCode = function () {
  return hashCode(this.w18_1);
};
protoOf(JsonArray).toString = function () {
  return joinToString(this.w18_1, ',', '[', ']');
};
protoOf(JsonArray).o = function () {
  return this.w18_1.o();
};
protoOf(JsonArray).x18 = function (element) {
  return this.w18_1.y1(element);
};
protoOf(JsonArray).y1 = function (element) {
  if (!(element instanceof JsonElement))
    return false;
  return this.x18(element instanceof JsonElement ? element : THROW_CCE());
};
protoOf(JsonArray).r = function () {
  return this.w18_1.r();
};
protoOf(JsonArray).w = function (index) {
  return this.w18_1.w(index);
};
protoOf(JsonArray).y18 = function (element) {
  return this.w18_1.z1(element);
};
protoOf(JsonArray).z1 = function (element) {
  if (!(element instanceof JsonElement))
    return -1;
  return this.y18(element instanceof JsonElement ? element : THROW_CCE());
};
protoOf(JsonArray).x = function (index) {
  return this.w18_1.x(index);
};
protoOf(JsonArray).a2 = function (fromIndex, toIndex) {
  return this.w18_1.a2(fromIndex, toIndex);
};
protoOf(JsonArray).u = function () {
  return this.w18_1.u();
};
function JsonNull() {
  JsonNull_instance = this;
  JsonPrimitive.call(this);
  this.z18_1 = 'null';
}
protoOf(JsonNull).r18 = function () {
  return false;
};
protoOf(JsonNull).s18 = function () {
  return this.z18_1;
};
protoOf(JsonNull).a19 = function () {
  return JsonNullSerializer_getInstance();
};
protoOf(JsonNull).by = function (typeParamsSerializers) {
  return this.a19();
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
  this.b19_1 = isString;
  this.c19_1 = coerceToInlineType;
  this.d19_1 = toString(body);
  if (!(this.c19_1 == null)) {
    // Inline function 'kotlin.require' call
    // Inline function 'kotlin.require' call
    if (!this.c19_1.uo()) {
      var message = 'Failed requirement.';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
  }
}
protoOf(JsonLiteral).r18 = function () {
  return this.b19_1;
};
protoOf(JsonLiteral).s18 = function () {
  return this.d19_1;
};
protoOf(JsonLiteral).toString = function () {
  var tmp;
  if (this.b19_1) {
    // Inline function 'kotlin.text.buildString' call
    // Inline function 'kotlin.apply' call
    var this_0 = StringBuilder_init_$Create$();
    printQuoted(this_0, this.d19_1);
    tmp = this_0.toString();
  } else {
    tmp = this.d19_1;
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
  if (!(this.b19_1 === other.b19_1))
    return false;
  if (!(this.d19_1 === other.d19_1))
    return false;
  return true;
};
protoOf(JsonLiteral).hashCode = function () {
  var result = getBooleanHashCode(this.b19_1);
  result = imul(31, result) + getStringHashCode(this.d19_1) | 0;
  return result;
};
function get_booleanOrNull(_this__u8e3s4) {
  _init_properties_JsonElement_kt__7cbdc2();
  return toBooleanStrictOrNull_0(_this__u8e3s4.s18());
}
function parseLongImpl(_this__u8e3s4) {
  _init_properties_JsonElement_kt__7cbdc2();
  return (new StringJsonLexer(_this__u8e3s4.s18())).e19();
}
function get_float(_this__u8e3s4) {
  _init_properties_JsonElement_kt__7cbdc2();
  // Inline function 'kotlin.text.toFloat' call
  var this_0 = _this__u8e3s4.s18();
  // Inline function 'kotlin.js.unsafeCast' call
  // Inline function 'kotlin.js.asDynamic' call
  return toDouble(this_0);
}
function get_double(_this__u8e3s4) {
  _init_properties_JsonElement_kt__7cbdc2();
  return toDouble(_this__u8e3s4.s18());
}
function get_contentOrNull(_this__u8e3s4) {
  _init_properties_JsonElement_kt__7cbdc2();
  var tmp;
  if (_this__u8e3s4 instanceof JsonNull) {
    tmp = null;
  } else {
    tmp = _this__u8e3s4.s18();
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
  $this$buildSerialDescriptor.zn('JsonPrimitive', defer(JsonElementSerializer$descriptor$lambda$lambda));
  $this$buildSerialDescriptor.zn('JsonNull', defer(JsonElementSerializer$descriptor$lambda$lambda_0));
  $this$buildSerialDescriptor.zn('JsonLiteral', defer(JsonElementSerializer$descriptor$lambda$lambda_1));
  $this$buildSerialDescriptor.zn('JsonObject', defer(JsonElementSerializer$descriptor$lambda$lambda_2));
  $this$buildSerialDescriptor.zn('JsonArray', defer(JsonElementSerializer$descriptor$lambda$lambda_3));
  return Unit_instance;
}
function JsonElementSerializer$descriptor$lambda$lambda() {
  return JsonPrimitiveSerializer_getInstance().f19_1;
}
function JsonElementSerializer$descriptor$lambda$lambda_0() {
  return JsonNullSerializer_getInstance().g19_1;
}
function JsonElementSerializer$descriptor$lambda$lambda_1() {
  return JsonLiteralSerializer_getInstance().h19_1;
}
function JsonElementSerializer$descriptor$lambda$lambda_2() {
  return JsonObjectSerializer_getInstance().i19_1;
}
function JsonElementSerializer$descriptor$lambda$lambda_3() {
  return JsonArraySerializer_getInstance().j19_1;
}
function JsonElementSerializer() {
  JsonElementSerializer_instance = this;
  var tmp = this;
  var tmp_0 = SEALED_getInstance();
  tmp.k19_1 = buildSerialDescriptor('kotlinx.serialization.json.JsonElement', tmp_0, [], JsonElementSerializer$descriptor$lambda);
}
protoOf(JsonElementSerializer).ln = function () {
  return this.k19_1;
};
protoOf(JsonElementSerializer).l19 = function (encoder, value) {
  verify(encoder);
  if (value instanceof JsonPrimitive) {
    encoder.yr(JsonPrimitiveSerializer_getInstance(), value);
  } else {
    if (value instanceof JsonObject) {
      encoder.yr(JsonObjectSerializer_getInstance(), value);
    } else {
      if (value instanceof JsonArray) {
        encoder.yr(JsonArraySerializer_getInstance(), value);
      } else {
        noWhenBranchMatchedException();
      }
    }
  }
};
protoOf(JsonElementSerializer).mn = function (encoder, value) {
  return this.l19(encoder, value instanceof JsonElement ? value : THROW_CCE());
};
protoOf(JsonElementSerializer).nn = function (decoder) {
  var input = asJsonDecoder(decoder);
  return input.q18();
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
  this.f19_1 = buildSerialDescriptor('kotlinx.serialization.json.JsonPrimitive', STRING_getInstance(), []);
}
protoOf(JsonPrimitiveSerializer).ln = function () {
  return this.f19_1;
};
protoOf(JsonPrimitiveSerializer).m19 = function (encoder, value) {
  verify(encoder);
  var tmp;
  if (value instanceof JsonNull) {
    encoder.yr(JsonNullSerializer_getInstance(), JsonNull_getInstance());
    tmp = Unit_instance;
  } else {
    var tmp_0 = JsonLiteralSerializer_getInstance();
    encoder.yr(tmp_0, value instanceof JsonLiteral ? value : THROW_CCE());
    tmp = Unit_instance;
  }
  return tmp;
};
protoOf(JsonPrimitiveSerializer).mn = function (encoder, value) {
  return this.m19(encoder, value instanceof JsonPrimitive ? value : THROW_CCE());
};
protoOf(JsonPrimitiveSerializer).nn = function (decoder) {
  var result = asJsonDecoder(decoder).q18();
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
  this.g19_1 = buildSerialDescriptor('kotlinx.serialization.json.JsonNull', ENUM_getInstance(), []);
}
protoOf(JsonNullSerializer).ln = function () {
  return this.g19_1;
};
protoOf(JsonNullSerializer).n19 = function (encoder, value) {
  verify(encoder);
  encoder.cr();
};
protoOf(JsonNullSerializer).mn = function (encoder, value) {
  return this.n19(encoder, value instanceof JsonNull ? value : THROW_CCE());
};
protoOf(JsonNullSerializer).nn = function (decoder) {
  verify_0(decoder);
  if (decoder.up()) {
    throw new JsonDecodingException("Expected 'null' literal");
  }
  decoder.vp();
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
  this.h19_1 = PrimitiveSerialDescriptor('kotlinx.serialization.json.JsonLiteral', STRING_getInstance());
}
protoOf(JsonLiteralSerializer).ln = function () {
  return this.h19_1;
};
protoOf(JsonLiteralSerializer).o19 = function (encoder, value) {
  verify(encoder);
  if (value.b19_1) {
    return encoder.lr(value.d19_1);
  }
  if (!(value.c19_1 == null)) {
    return encoder.mr(value.c19_1).lr(value.d19_1);
  }
  var tmp0_safe_receiver = toLongOrNull(value.d19_1);
  if (tmp0_safe_receiver == null)
    null;
  else {
    // Inline function 'kotlin.let' call
    return encoder.hr(tmp0_safe_receiver);
  }
  var tmp1_safe_receiver = toULongOrNull(value.d19_1);
  var tmp = tmp1_safe_receiver;
  if ((tmp == null ? null : new ULong(tmp)) == null)
    null;
  else {
    var tmp_0 = tmp1_safe_receiver;
    // Inline function 'kotlin.let' call
    var it = (tmp_0 == null ? null : new ULong(tmp_0)).l1_1;
    var tmp_1 = encoder.mr(serializer_0(Companion_getInstance()).ln());
    // Inline function 'kotlin.ULong.toLong' call
    var tmp$ret$1 = _ULong___get_data__impl__fggpzb(it);
    tmp_1.hr(tmp$ret$1);
    return Unit_instance;
  }
  var tmp2_safe_receiver = toDoubleOrNull(value.d19_1);
  if (tmp2_safe_receiver == null)
    null;
  else {
    // Inline function 'kotlin.let' call
    return encoder.jr(tmp2_safe_receiver);
  }
  var tmp3_safe_receiver = toBooleanStrictOrNull(value.d19_1);
  if (tmp3_safe_receiver == null)
    null;
  else {
    // Inline function 'kotlin.let' call
    return encoder.dr(tmp3_safe_receiver);
  }
  encoder.lr(value.d19_1);
};
protoOf(JsonLiteralSerializer).mn = function (encoder, value) {
  return this.o19(encoder, value instanceof JsonLiteral ? value : THROW_CCE());
};
protoOf(JsonLiteralSerializer).nn = function (decoder) {
  var result = asJsonDecoder(decoder).q18();
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
  this.p19_1 = MapSerializer(serializer(StringCompanionObject_instance), JsonElementSerializer_getInstance()).ln();
  this.q19_1 = 'kotlinx.serialization.json.JsonObject';
}
protoOf(JsonObjectDescriptor).so = function () {
  return this.q19_1;
};
protoOf(JsonObjectDescriptor).xo = function (index) {
  return this.p19_1.xo(index);
};
protoOf(JsonObjectDescriptor).yo = function (name) {
  return this.p19_1.yo(name);
};
protoOf(JsonObjectDescriptor).zo = function (index) {
  return this.p19_1.zo(index);
};
protoOf(JsonObjectDescriptor).ap = function (index) {
  return this.p19_1.ap(index);
};
protoOf(JsonObjectDescriptor).bp = function (index) {
  return this.p19_1.bp(index);
};
protoOf(JsonObjectDescriptor).to = function () {
  return this.p19_1.to();
};
protoOf(JsonObjectDescriptor).lo = function () {
  return this.p19_1.lo();
};
protoOf(JsonObjectDescriptor).uo = function () {
  return this.p19_1.uo();
};
protoOf(JsonObjectDescriptor).vo = function () {
  return this.p19_1.vo();
};
protoOf(JsonObjectDescriptor).wo = function () {
  return this.p19_1.wo();
};
var JsonObjectDescriptor_instance;
function JsonObjectDescriptor_getInstance() {
  if (JsonObjectDescriptor_instance == null)
    new JsonObjectDescriptor();
  return JsonObjectDescriptor_instance;
}
function JsonObjectSerializer() {
  JsonObjectSerializer_instance = this;
  this.i19_1 = JsonObjectDescriptor_getInstance();
}
protoOf(JsonObjectSerializer).ln = function () {
  return this.i19_1;
};
protoOf(JsonObjectSerializer).r19 = function (encoder, value) {
  verify(encoder);
  MapSerializer(serializer(StringCompanionObject_instance), JsonElementSerializer_getInstance()).mn(encoder, value);
};
protoOf(JsonObjectSerializer).mn = function (encoder, value) {
  return this.r19(encoder, value instanceof JsonObject ? value : THROW_CCE());
};
protoOf(JsonObjectSerializer).nn = function (decoder) {
  verify_0(decoder);
  return new JsonObject(MapSerializer(serializer(StringCompanionObject_instance), JsonElementSerializer_getInstance()).nn(decoder));
};
var JsonObjectSerializer_instance;
function JsonObjectSerializer_getInstance() {
  if (JsonObjectSerializer_instance == null)
    new JsonObjectSerializer();
  return JsonObjectSerializer_instance;
}
function JsonArrayDescriptor() {
  JsonArrayDescriptor_instance = this;
  this.s19_1 = ListSerializer(JsonElementSerializer_getInstance()).ln();
  this.t19_1 = 'kotlinx.serialization.json.JsonArray';
}
protoOf(JsonArrayDescriptor).so = function () {
  return this.t19_1;
};
protoOf(JsonArrayDescriptor).xo = function (index) {
  return this.s19_1.xo(index);
};
protoOf(JsonArrayDescriptor).yo = function (name) {
  return this.s19_1.yo(name);
};
protoOf(JsonArrayDescriptor).zo = function (index) {
  return this.s19_1.zo(index);
};
protoOf(JsonArrayDescriptor).ap = function (index) {
  return this.s19_1.ap(index);
};
protoOf(JsonArrayDescriptor).bp = function (index) {
  return this.s19_1.bp(index);
};
protoOf(JsonArrayDescriptor).to = function () {
  return this.s19_1.to();
};
protoOf(JsonArrayDescriptor).lo = function () {
  return this.s19_1.lo();
};
protoOf(JsonArrayDescriptor).uo = function () {
  return this.s19_1.uo();
};
protoOf(JsonArrayDescriptor).vo = function () {
  return this.s19_1.vo();
};
protoOf(JsonArrayDescriptor).wo = function () {
  return this.s19_1.wo();
};
var JsonArrayDescriptor_instance;
function JsonArrayDescriptor_getInstance() {
  if (JsonArrayDescriptor_instance == null)
    new JsonArrayDescriptor();
  return JsonArrayDescriptor_instance;
}
function JsonArraySerializer() {
  JsonArraySerializer_instance = this;
  this.j19_1 = JsonArrayDescriptor_getInstance();
}
protoOf(JsonArraySerializer).ln = function () {
  return this.j19_1;
};
protoOf(JsonArraySerializer).u19 = function (encoder, value) {
  verify(encoder);
  ListSerializer(JsonElementSerializer_getInstance()).mn(encoder, value);
};
protoOf(JsonArraySerializer).mn = function (encoder, value) {
  return this.u19(encoder, value instanceof JsonArray ? value : THROW_CCE());
};
protoOf(JsonArraySerializer).nn = function (decoder) {
  verify_0(decoder);
  return new JsonArray(ListSerializer(JsonElementSerializer_getInstance()).nn(decoder));
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
  var tmp0 = $this.v19_1;
  var tmp = KProperty1;
  // Inline function 'kotlin.getValue' call
  getPropertyCallableRef('original', 1, tmp, defer$o$_get_original_$ref_3cje7k(), null);
  return tmp0.p2();
}
function defer$o$_get_original_$ref_3cje7k() {
  return function (p0) {
    return _get_original__l7ku1m(p0);
  };
}
function defer$1($deferred) {
  this.v19_1 = lazy($deferred);
}
protoOf(defer$1).so = function () {
  return _get_original__l7ku1m(this).so();
};
protoOf(defer$1).to = function () {
  return _get_original__l7ku1m(this).to();
};
protoOf(defer$1).vo = function () {
  return _get_original__l7ku1m(this).vo();
};
protoOf(defer$1).xo = function (index) {
  return _get_original__l7ku1m(this).xo(index);
};
protoOf(defer$1).yo = function (name) {
  return _get_original__l7ku1m(this).yo(name);
};
protoOf(defer$1).zo = function (index) {
  return _get_original__l7ku1m(this).zo(index);
};
protoOf(defer$1).ap = function (index) {
  return _get_original__l7ku1m(this).ap(index);
};
protoOf(defer$1).bp = function (index) {
  return _get_original__l7ku1m(this).bp(index);
};
function JsonEncoder() {
}
function Composer(writer) {
  this.w19_1 = writer;
  this.x19_1 = true;
}
protoOf(Composer).y19 = function () {
  this.x19_1 = true;
};
protoOf(Composer).z19 = function () {
  return Unit_instance;
};
protoOf(Composer).a1a = function () {
  this.x19_1 = false;
};
protoOf(Composer).b1a = function () {
  this.x19_1 = false;
};
protoOf(Composer).c1a = function () {
  return Unit_instance;
};
protoOf(Composer).d1a = function (v) {
  return this.w19_1.e1a(v);
};
protoOf(Composer).f1a = function (v) {
  return this.w19_1.g1a(v);
};
protoOf(Composer).h1a = function (v) {
  return this.w19_1.g1a(v.toString());
};
protoOf(Composer).i1a = function (v) {
  return this.w19_1.g1a(v.toString());
};
protoOf(Composer).j1a = function (v) {
  return this.w19_1.k1a(fromInt(v));
};
protoOf(Composer).l1a = function (v) {
  return this.w19_1.k1a(fromInt(v));
};
protoOf(Composer).m1a = function (v) {
  return this.w19_1.k1a(fromInt(v));
};
protoOf(Composer).n1a = function (v) {
  return this.w19_1.k1a(v);
};
protoOf(Composer).o1a = function (v) {
  return this.w19_1.g1a(v.toString());
};
protoOf(Composer).p1a = function (value) {
  return this.w19_1.q1a(value);
};
function Composer_0(sb, json) {
  return json.l16_1.c18_1 ? new ComposerWithPrettyPrint(sb, json) : new Composer(sb);
}
function ComposerForUnsignedNumbers(writer, forceQuoting) {
  Composer.call(this, writer);
  this.t1a_1 = forceQuoting;
}
protoOf(ComposerForUnsignedNumbers).m1a = function (v) {
  if (this.t1a_1) {
    // Inline function 'kotlin.toUInt' call
    var tmp$ret$0 = _UInt___init__impl__l7qpdl(v);
    this.p1a(UInt__toString_impl_dbgl21(tmp$ret$0));
  } else {
    // Inline function 'kotlin.toUInt' call
    var tmp$ret$1 = _UInt___init__impl__l7qpdl(v);
    this.f1a(UInt__toString_impl_dbgl21(tmp$ret$1));
  }
};
protoOf(ComposerForUnsignedNumbers).n1a = function (v) {
  if (this.t1a_1) {
    // Inline function 'kotlin.toULong' call
    var tmp$ret$0 = _ULong___init__impl__c78o9k(v);
    this.p1a(ULong__toString_impl_f9au7k(tmp$ret$0));
  } else {
    // Inline function 'kotlin.toULong' call
    var tmp$ret$1 = _ULong___init__impl__c78o9k(v);
    this.f1a(ULong__toString_impl_f9au7k(tmp$ret$1));
  }
};
protoOf(ComposerForUnsignedNumbers).j1a = function (v) {
  if (this.t1a_1) {
    // Inline function 'kotlin.toUByte' call
    var tmp$ret$0 = _UByte___init__impl__g9hnc4(v);
    this.p1a(UByte__toString_impl_v72jg(tmp$ret$0));
  } else {
    // Inline function 'kotlin.toUByte' call
    var tmp$ret$1 = _UByte___init__impl__g9hnc4(v);
    this.f1a(UByte__toString_impl_v72jg(tmp$ret$1));
  }
};
protoOf(ComposerForUnsignedNumbers).l1a = function (v) {
  if (this.t1a_1) {
    // Inline function 'kotlin.toUShort' call
    var tmp$ret$0 = _UShort___init__impl__jigrne(v);
    this.p1a(UShort__toString_impl_edaoee(tmp$ret$0));
  } else {
    // Inline function 'kotlin.toUShort' call
    var tmp$ret$1 = _UShort___init__impl__jigrne(v);
    this.f1a(UShort__toString_impl_edaoee(tmp$ret$1));
  }
};
function ComposerForUnquotedLiterals(writer, forceQuoting) {
  Composer.call(this, writer);
  this.w1a_1 = forceQuoting;
}
protoOf(ComposerForUnquotedLiterals).p1a = function (value) {
  if (this.w1a_1) {
    protoOf(Composer).p1a.call(this, value);
  } else {
    protoOf(Composer).f1a.call(this, value);
  }
};
function ComposerWithPrettyPrint(writer, json) {
  Composer.call(this, writer);
  this.z1a_1 = json;
  this.a1b_1 = 0;
}
protoOf(ComposerWithPrettyPrint).y19 = function () {
  this.x19_1 = true;
  this.a1b_1 = this.a1b_1 + 1 | 0;
};
protoOf(ComposerWithPrettyPrint).z19 = function () {
  this.a1b_1 = this.a1b_1 - 1 | 0;
};
protoOf(ComposerWithPrettyPrint).a1a = function () {
  this.x19_1 = false;
  this.f1a('\n');
  // Inline function 'kotlin.repeat' call
  var times = this.a1b_1;
  var inductionVariable = 0;
  if (inductionVariable < times)
    do {
      var index = inductionVariable;
      inductionVariable = inductionVariable + 1 | 0;
      this.f1a(this.z1a_1.l16_1.e18_1);
    }
     while (inductionVariable < times);
};
protoOf(ComposerWithPrettyPrint).b1a = function () {
  if (this.x19_1)
    this.x19_1 = false;
  else {
    this.a1a();
  }
};
protoOf(ComposerWithPrettyPrint).c1a = function () {
  this.d1a(_Char___init__impl__6a9atx(32));
};
function readIfAbsent($this, descriptor, index) {
  $this.c1b_1 = (!descriptor.bp(index) && descriptor.ap(index).lo());
  return $this.c1b_1;
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
  tmp.b1b_1 = new ElementMarker(descriptor, JsonElementMarker$readIfAbsent$ref(this));
  this.c1b_1 = false;
}
protoOf(JsonElementMarker).d1b = function (index) {
  this.b1b_1.lw(index);
};
protoOf(JsonElementMarker).e1b = function () {
  return this.b1b_1.mw();
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
  _this__u8e3s4.f1b('Trailing comma before the end of JSON ' + entity, _this__u8e3s4.a17_1 - 1 | 0, "Trailing commas are non-complaint JSON and not allowed by default. Use 'allowTrailingComma = true' in 'Json {}' builder to support them.");
}
function throwInvalidFloatingPointDecoded(_this__u8e3s4, result) {
  _this__u8e3s4.g1b('Unexpected special floating-point value ' + toString(result) + '. By default, ' + 'non-finite floating point values are prohibited because they do not conform JSON specification', VOID, "It is possible to deserialize them using 'JsonBuilder.allowSpecialFloatingPointValues = true'");
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
  return new JsonEncodingException("Value of type '" + keyDescriptor.so() + "' can't be used in JSON as a key in the map. " + ("It should have either primitive or enum kind, but its kind is '" + keyDescriptor.to().toString() + "'.\n") + "Use 'allowStructuredMapKeys = true' in 'Json {}' builder to convert such maps to [key1, value1, key2, value2,...] arrays.");
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
  if (json.l16_1.z17_1) {
    tmp = true;
  } else {
    var tmp0 = _this__u8e3s4.wo();
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
  var index = _this__u8e3s4.yo(name);
  if (!(index === -3))
    return index;
  if (!json.l16_1.j18_1)
    return index;
  return getJsonNameIndexSlowPath(_this__u8e3s4, json, name);
}
function getJsonElementName(_this__u8e3s4, json, index) {
  _init_properties_JsonNamesMap_kt__cbbp0k();
  var strategy = namingStrategy(_this__u8e3s4, json);
  return strategy == null ? _this__u8e3s4.xo(index) : serializationNamesIndices(_this__u8e3s4, json, strategy)[index];
}
function namingStrategy(_this__u8e3s4, json) {
  _init_properties_JsonNamesMap_kt__cbbp0k();
  return equals(_this__u8e3s4.to(), CLASS_getInstance()) ? json.l16_1.k18_1 : null;
}
function deserializationNamesMap(_this__u8e3s4, descriptor) {
  _init_properties_JsonNamesMap_kt__cbbp0k();
  var tmp = get_schemaCache(_this__u8e3s4);
  var tmp_0 = get_JsonDeserializationNamesKey();
  return tmp.i1b(descriptor, tmp_0, deserializationNamesMap$lambda(descriptor, _this__u8e3s4));
}
function decodeCaseInsensitive(_this__u8e3s4, descriptor) {
  _init_properties_JsonNamesMap_kt__cbbp0k();
  return _this__u8e3s4.l16_1.l18_1 && equals(descriptor.to(), ENUM_getInstance());
}
function getJsonNameIndexSlowPath(_this__u8e3s4, json, name) {
  _init_properties_JsonNamesMap_kt__cbbp0k();
  var tmp0_elvis_lhs = deserializationNamesMap(json, _this__u8e3s4).l2(name);
  return tmp0_elvis_lhs == null ? -3 : tmp0_elvis_lhs;
}
function serializationNamesIndices(_this__u8e3s4, json, strategy) {
  _init_properties_JsonNamesMap_kt__cbbp0k();
  var tmp = get_schemaCache(json);
  var tmp_0 = get_JsonSerializationNamesKey();
  return tmp.i1b(_this__u8e3s4, tmp_0, serializationNamesIndices$lambda(_this__u8e3s4, strategy));
}
function buildDeserializationNamesMap(_this__u8e3s4, json) {
  _init_properties_JsonNamesMap_kt__cbbp0k();
  // Inline function 'kotlin.collections.mutableMapOf' call
  var builder = LinkedHashMap_init_$Create$();
  var useLowercaseEnums = decodeCaseInsensitive(json, _this__u8e3s4);
  var strategyForClasses = namingStrategy(_this__u8e3s4, json);
  var inductionVariable = 0;
  var last = _this__u8e3s4.vo();
  if (inductionVariable < last)
    do {
      var i = inductionVariable;
      inductionVariable = inductionVariable + 1 | 0;
      // Inline function 'kotlin.collections.filterIsInstance' call
      var tmp0 = _this__u8e3s4.zo(i);
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
      var tmp1_safe_receiver = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.j1b_1;
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
        tmp_0 = _this__u8e3s4.xo(i).toLowerCase();
      } else if (!(strategyForClasses == null)) {
        tmp_0 = strategyForClasses.k1b(_this__u8e3s4, i, _this__u8e3s4.xo(i));
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
  var entity = equals($this_buildDeserializationNamesMap.to(), ENUM_getInstance()) ? 'enum value' : 'property';
  // Inline function 'kotlin.collections.contains' call
  // Inline function 'kotlin.collections.containsKey' call
  if ((isInterface(_this__u8e3s4, KtMap) ? _this__u8e3s4 : THROW_CCE()).j2(name)) {
    throw new JsonException("The suggested name '" + name + "' for " + entity + ' ' + $this_buildDeserializationNamesMap.xo(index) + ' is already one of the names for ' + entity + ' ' + ($this_buildDeserializationNamesMap.xo(getValue(_this__u8e3s4, name)) + ' in ' + toString($this_buildDeserializationNamesMap)));
  }
  // Inline function 'kotlin.collections.set' call
  _this__u8e3s4.c2(name, index);
}
function deserializationNamesMap$lambda($descriptor, $this_deserializationNamesMap) {
  return function () {
    return buildDeserializationNamesMap($descriptor, $this_deserializationNamesMap);
  };
}
function serializationNamesIndices$lambda($this_serializationNamesIndices, $strategy) {
  return function () {
    var tmp = 0;
    var tmp_0 = $this_serializationNamesIndices.vo();
    // Inline function 'kotlin.arrayOfNulls' call
    var tmp_1 = Array(tmp_0);
    while (tmp < tmp_0) {
      var tmp_2 = tmp;
      var baseName = $this_serializationNamesIndices.xo(tmp_2);
      tmp_1[tmp_2] = $strategy.k1b($this_serializationNamesIndices, tmp_2, baseName);
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
  var newSize = imul($this.n1b_1, 2);
  $this.l1b_1 = copyOf($this.l1b_1, newSize);
  var tmp = 0;
  var tmp_0 = new Int32Array(newSize);
  while (tmp < newSize) {
    tmp_0[tmp] = -1;
    tmp = tmp + 1 | 0;
  }
  var newIndices = tmp_0;
  // Inline function 'kotlin.collections.copyInto' call
  var this_0 = $this.m1b_1;
  var endIndex = this_0.length;
  // Inline function 'kotlin.js.unsafeCast' call
  // Inline function 'kotlin.js.asDynamic' call
  var tmp_1 = this_0;
  // Inline function 'kotlin.js.unsafeCast' call
  // Inline function 'kotlin.js.asDynamic' call
  arrayCopy(tmp_1, newIndices, 0, 0, endIndex);
  $this.m1b_1 = newIndices;
}
function JsonPath() {
  var tmp = this;
  // Inline function 'kotlin.arrayOfNulls' call
  tmp.l1b_1 = Array(8);
  var tmp_0 = this;
  var tmp_1 = 0;
  var tmp_2 = new Int32Array(8);
  while (tmp_1 < 8) {
    tmp_2[tmp_1] = -1;
    tmp_1 = tmp_1 + 1 | 0;
  }
  tmp_0.m1b_1 = tmp_2;
  this.n1b_1 = -1;
}
protoOf(JsonPath).o1b = function (sd) {
  this.n1b_1 = this.n1b_1 + 1 | 0;
  var depth = this.n1b_1;
  if (depth === this.l1b_1.length) {
    resize(this);
  }
  this.l1b_1[depth] = sd;
};
protoOf(JsonPath).p1b = function (index) {
  this.m1b_1[this.n1b_1] = index;
};
protoOf(JsonPath).q1b = function (key) {
  var tmp;
  if (!(this.m1b_1[this.n1b_1] === -2)) {
    this.n1b_1 = this.n1b_1 + 1 | 0;
    tmp = this.n1b_1 === this.l1b_1.length;
  } else {
    tmp = false;
  }
  if (tmp) {
    resize(this);
  }
  this.l1b_1[this.n1b_1] = key;
  this.m1b_1[this.n1b_1] = -2;
};
protoOf(JsonPath).r1b = function () {
  if (this.m1b_1[this.n1b_1] === -2) {
    this.l1b_1[this.n1b_1] = Tombstone_instance;
  }
};
protoOf(JsonPath).s1b = function () {
  var depth = this.n1b_1;
  if (this.m1b_1[depth] === -2) {
    this.m1b_1[depth] = -1;
    this.n1b_1 = this.n1b_1 - 1 | 0;
  }
  if (!(this.n1b_1 === -1)) {
    this.n1b_1 = this.n1b_1 - 1 | 0;
  }
};
protoOf(JsonPath).t1b = function () {
  // Inline function 'kotlin.text.buildString' call
  // Inline function 'kotlin.apply' call
  var this_0 = StringBuilder_init_$Create$();
  this_0.s7('$');
  // Inline function 'kotlin.repeat' call
  var times = this.n1b_1 + 1 | 0;
  var inductionVariable = 0;
  if (inductionVariable < times)
    do {
      var index = inductionVariable;
      inductionVariable = inductionVariable + 1 | 0;
      var element = this.l1b_1[index];
      if (!(element == null) ? isInterface(element, SerialDescriptor) : false) {
        if (equals(element.to(), LIST_getInstance())) {
          if (!(this.m1b_1[index] === -1)) {
            this_0.s7('[');
            this_0.kb(this.m1b_1[index]);
            this_0.s7(']');
          }
        } else {
          var idx = this.m1b_1[index];
          if (idx >= 0) {
            this_0.s7('.');
            this_0.s7(element.xo(idx));
          }
        }
      } else {
        if (!(element === Tombstone_instance)) {
          this_0.s7('[');
          this_0.s7("'");
          this_0.r7(element);
          this_0.s7("'");
          this_0.s7(']');
        }
      }
    }
     while (inductionVariable < times);
  return this_0.toString();
};
protoOf(JsonPath).toString = function () {
  return this.t1b();
};
function checkKind($this, descriptor, actualClass) {
  var kind = descriptor.to();
  var tmp;
  if (kind instanceof PolymorphicKind) {
    tmp = true;
  } else {
    tmp = equals(kind, CONTEXTUAL_getInstance());
  }
  if (tmp) {
    throw IllegalArgumentException_init_$Create$('Serializer for ' + actualClass.y9() + " can't be registered as a subclass for polymorphic serialization " + ('because its kind ' + kind.toString() + ' is not concrete. To work with multiple hierarchies, register it as a base class.'));
  }
  if ($this.v1b_1)
    return Unit_instance;
  if (!$this.w1b_1)
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
    throw IllegalArgumentException_init_$Create$('Serializer for ' + actualClass.y9() + ' of kind ' + kind.toString() + ' cannot be serialized polymorphically with class discriminator.');
  }
}
function checkDiscriminatorCollisions($this, descriptor, actualClass) {
  var inductionVariable = 0;
  var last = descriptor.vo();
  if (inductionVariable < last)
    do {
      var i = inductionVariable;
      inductionVariable = inductionVariable + 1 | 0;
      var name = descriptor.xo(i);
      if (name === $this.u1b_1) {
        throw IllegalArgumentException_init_$Create$('Polymorphic serializer for ' + toString(actualClass) + " has property '" + name + "' that conflicts " + 'with JSON class discriminator. You can either change class discriminator in JsonConfiguration, rename property with @SerialName annotation or fall back to array polymorphism');
      }
    }
     while (inductionVariable < last);
}
function JsonSerializersModuleValidator(configuration) {
  this.u1b_1 = configuration.h18_1;
  this.v1b_1 = configuration.g18_1;
  this.w1b_1 = !configuration.o18_1.equals(ClassDiscriminatorMode_NONE_getInstance());
}
protoOf(JsonSerializersModuleValidator).c16 = function (kClass, provider) {
};
protoOf(JsonSerializersModuleValidator).f16 = function (baseClass, actualClass, actualSerializer) {
  var descriptor = actualSerializer.ln();
  checkKind(this, descriptor, actualClass);
  if (!this.v1b_1 && this.w1b_1) {
    checkDiscriminatorCollisions(this, descriptor, actualClass);
  }
};
protoOf(JsonSerializersModuleValidator).g16 = function (baseClass, defaultSerializerProvider) {
};
protoOf(JsonSerializersModuleValidator).h16 = function (baseClass, defaultDeserializerProvider) {
};
function encodeByWriter(json, writer, serializer, value) {
  var tmp = WriteMode_OBJ_getInstance();
  // Inline function 'kotlin.arrayOfNulls' call
  var size = get_entries().u();
  var tmp$ret$0 = Array(size);
  var encoder = StreamingJsonEncoder_init_$Create$(writer, json, tmp, tmp$ret$0);
  encoder.yr(serializer, value);
}
function readObject($this) {
  // Inline function 'kotlinx.serialization.json.internal.JsonTreeReader.readObjectImpl' call
  var lastToken = $this.g1c_1.k1c(6);
  if ($this.g1c_1.l1c() === 4) {
    $this.g1c_1.g1b('Unexpected leading comma');
  }
  // Inline function 'kotlin.collections.linkedMapOf' call
  var result = LinkedHashMap_init_$Create$();
  $l$loop: while ($this.g1c_1.m1c()) {
    var key = $this.h1c_1 ? $this.g1c_1.o1c() : $this.g1c_1.n1c();
    $this.g1c_1.k1c(5);
    var element = $this.p1c();
    // Inline function 'kotlin.collections.set' call
    result.c2(key, element);
    lastToken = $this.g1c_1.q1c();
    var tmp0_subject = lastToken;
    if (tmp0_subject !== 4)
      if (tmp0_subject === 7)
        break $l$loop;
      else {
        $this.g1c_1.g1b('Expected end of the object or comma');
      }
  }
  if (lastToken === 6) {
    $this.g1c_1.k1c(7);
  } else if (lastToken === 4) {
    if (!$this.i1c_1) {
      invalidTrailingComma($this.g1c_1);
    }
    $this.g1c_1.k1c(7);
  }
  return new JsonObject(result);
}
function readObject_0($this, _this__u8e3s4, $completion) {
  var tmp = new $readObjectCOROUTINE$($this, _this__u8e3s4, $completion);
  tmp.n8_1 = Unit_instance;
  tmp.o8_1 = null;
  return tmp.t8();
}
function readArray($this) {
  var lastToken = $this.g1c_1.q1c();
  if ($this.g1c_1.l1c() === 4) {
    $this.g1c_1.g1b('Unexpected leading comma');
  }
  // Inline function 'kotlin.collections.arrayListOf' call
  var result = ArrayList_init_$Create$();
  while ($this.g1c_1.m1c()) {
    var element = $this.p1c();
    result.j(element);
    lastToken = $this.g1c_1.q1c();
    if (!(lastToken === 4)) {
      var tmp0 = $this.g1c_1;
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonLexer.require' call
      var condition = lastToken === 9;
      var position = tmp0.a17_1;
      if (!condition) {
        var tmp$ret$1 = 'Expected end of the array or comma';
        tmp0.g1b(tmp$ret$1, position);
      }
    }
  }
  if (lastToken === 8) {
    $this.g1c_1.k1c(9);
  } else if (lastToken === 4) {
    if (!$this.i1c_1) {
      invalidTrailingComma($this.g1c_1, 'array');
    }
    $this.g1c_1.k1c(9);
  }
  return new JsonArray(result);
}
function readValue($this, isString) {
  var tmp;
  if ($this.h1c_1 || !isString) {
    tmp = $this.g1c_1.o1c();
  } else {
    tmp = $this.g1c_1.n1c();
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
  this.n1d_1 = this$0;
  CoroutineImpl.call(this, resultContinuation);
}
protoOf(JsonTreeReader$readDeepRecursive$slambda).r1d = function ($this$DeepRecursiveFunction, it, $completion) {
  var tmp = this.s1d($this$DeepRecursiveFunction, it, $completion);
  tmp.n8_1 = Unit_instance;
  tmp.o8_1 = null;
  return tmp.t8();
};
protoOf(JsonTreeReader$readDeepRecursive$slambda).b9 = function (p1, p2, $completion) {
  var tmp = p1 instanceof DeepRecursiveScope ? p1 : THROW_CCE();
  return this.r1d(tmp, p2 instanceof Unit ? p2 : THROW_CCE(), $completion);
};
protoOf(JsonTreeReader$readDeepRecursive$slambda).t8 = function () {
  var suspendResult = this.n8_1;
  $sm: do
    try {
      var tmp = this.l8_1;
      switch (tmp) {
        case 0:
          this.m8_1 = 3;
          var tmp0_subject = this.n1d_1.g1c_1.l1c();
          if (tmp0_subject === 1) {
            this.q1d_1 = readValue(this.n1d_1, true);
            this.l8_1 = 2;
            continue $sm;
          } else {
            if (tmp0_subject === 0) {
              this.q1d_1 = readValue(this.n1d_1, false);
              this.l8_1 = 2;
              continue $sm;
            } else {
              if (tmp0_subject === 6) {
                this.l8_1 = 1;
                suspendResult = readObject_0(this.n1d_1, this.o1d_1, this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }
                continue $sm;
              } else {
                if (tmp0_subject === 8) {
                  this.q1d_1 = readArray(this.n1d_1);
                  this.l8_1 = 2;
                  continue $sm;
                } else {
                  var tmp_0 = this;
                  this.n1d_1.g1c_1.g1b("Can't begin reading element, unexpected token");
                }
              }
            }
          }

          break;
        case 1:
          this.q1d_1 = suspendResult;
          this.l8_1 = 2;
          continue $sm;
        case 2:
          return this.q1d_1;
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
protoOf(JsonTreeReader$readDeepRecursive$slambda).s1d = function ($this$DeepRecursiveFunction, it, completion) {
  var i = new JsonTreeReader$readDeepRecursive$slambda(this.n1d_1, completion);
  i.o1d_1 = $this$DeepRecursiveFunction;
  i.p1d_1 = it;
  return i;
};
function JsonTreeReader$readDeepRecursive$slambda_0(this$0, resultContinuation) {
  var i = new JsonTreeReader$readDeepRecursive$slambda(this$0, resultContinuation);
  var l = function ($this$DeepRecursiveFunction, it, $completion) {
    return i.r1d($this$DeepRecursiveFunction, it, $completion);
  };
  l.$arity = 2;
  return l;
}
function $readObjectCOROUTINE$(_this__u8e3s4, _this__u8e3s4_0, resultContinuation) {
  CoroutineImpl.call(this, resultContinuation);
  this.z1c_1 = _this__u8e3s4;
  this.a1d_1 = _this__u8e3s4_0;
}
protoOf($readObjectCOROUTINE$).t8 = function () {
  var suspendResult = this.n8_1;
  $sm: do
    try {
      var tmp = this.l8_1;
      switch (tmp) {
        case 0:
          this.m8_1 = 5;
          this.c1d_1 = this.z1c_1;
          this.d1d_1 = this.c1d_1.g1c_1.k1c(6);
          if (this.c1d_1.g1c_1.l1c() === 4) {
            this.c1d_1.g1c_1.g1b('Unexpected leading comma');
          }

          var tmp_0 = this;
          tmp_0.b1d_1 = LinkedHashMap_init_$Create$();
          this.l8_1 = 1;
          continue $sm;
        case 1:
          if (!this.c1d_1.g1c_1.m1c()) {
            this.l8_1 = 4;
            continue $sm;
          }

          this.e1d_1 = this.c1d_1.h1c_1 ? this.c1d_1.g1c_1.o1c() : this.c1d_1.g1c_1.n1c();
          this.c1d_1.g1c_1.k1c(5);
          this.l8_1 = 2;
          suspendResult = this.a1d_1.cl(Unit_instance, this);
          if (suspendResult === get_COROUTINE_SUSPENDED()) {
            return suspendResult;
          }

          continue $sm;
        case 2:
          var element = suspendResult;
          var tmp0 = this.b1d_1;
          var key = this.e1d_1;
          tmp0.c2(key, element);
          this.d1d_1 = this.c1d_1.g1c_1.q1c();
          var tmp0_subject = this.d1d_1;
          if (tmp0_subject === 4) {
            this.l8_1 = 3;
            continue $sm;
          } else {
            if (tmp0_subject === 7) {
              this.l8_1 = 4;
              continue $sm;
            } else {
              this.c1d_1.g1c_1.g1b('Expected end of the object or comma');
            }
          }

          break;
        case 3:
          this.l8_1 = 1;
          continue $sm;
        case 4:
          if (this.d1d_1 === 6) {
            this.c1d_1.g1c_1.k1c(7);
          } else if (this.d1d_1 === 4) {
            if (!this.c1d_1.i1c_1) {
              invalidTrailingComma(this.c1d_1.g1c_1);
            }
            this.c1d_1.g1c_1.k1c(7);
          }

          return new JsonObject(this.b1d_1);
        case 5:
          throw this.o8_1;
      }
    } catch ($p) {
      var e = $p;
      if (this.m8_1 === 5) {
        throw e;
      } else {
        this.l8_1 = this.m8_1;
        this.o8_1 = e;
      }
    }
   while (true);
};
function JsonTreeReader(configuration, lexer) {
  this.g1c_1 = lexer;
  this.h1c_1 = configuration.a18_1;
  this.i1c_1 = configuration.m18_1;
  this.j1c_1 = 0;
}
protoOf(JsonTreeReader).p1c = function () {
  var token = this.g1c_1.l1c();
  var tmp;
  if (token === 1) {
    tmp = readValue(this, true);
  } else if (token === 0) {
    tmp = readValue(this, false);
  } else if (token === 6) {
    var tmp_0;
    this.j1c_1 = this.j1c_1 + 1 | 0;
    if (this.j1c_1 === 200) {
      tmp_0 = readDeepRecursive(this);
    } else {
      tmp_0 = readObject(this);
    }
    var result = tmp_0;
    this.j1c_1 = this.j1c_1 - 1 | 0;
    tmp = result;
  } else if (token === 8) {
    tmp = readArray(this);
  } else {
    this.g1c_1.g1b('Cannot read Json element because of unexpected ' + tokenDescription(token));
  }
  return tmp;
};
function classDiscriminator(_this__u8e3s4, json) {
  var _iterator__ex2g4s = _this__u8e3s4.wo().r();
  while (_iterator__ex2g4s.s()) {
    var annotation = _iterator__ex2g4s.t();
    if (annotation instanceof JsonClassDiscriminator)
      return annotation.t1d_1;
  }
  return json.l16_1.h18_1;
}
function validateIfSealed(serializer, actualSerializer, classDiscriminator) {
  if (!(serializer instanceof SealedClassSerializer))
    return Unit_instance;
  if (jsonCachedSerialNames(actualSerializer.ln()).y1(classDiscriminator)) {
    var baseName = serializer.ln().so();
    var actualName = actualSerializer.ln().so();
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
  this.h1b_1 = createMapForCache(16);
}
protoOf(DescriptorSchemaCache).u1d = function (descriptor, key, value) {
  // Inline function 'kotlin.collections.getOrPut' call
  var this_0 = this.h1b_1;
  var value_0 = this_0.l2(descriptor);
  var tmp;
  if (value_0 == null) {
    var answer = createMapForCache(2);
    this_0.c2(descriptor, answer);
    tmp = answer;
  } else {
    tmp = value_0;
  }
  var tmp0 = tmp;
  var tmp2 = key instanceof Key ? key : THROW_CCE();
  // Inline function 'kotlin.collections.set' call
  var value_1 = !(value == null) ? value : THROW_CCE();
  tmp0.c2(tmp2, value_1);
};
protoOf(DescriptorSchemaCache).i1b = function (descriptor, key, defaultValue) {
  var tmp0_safe_receiver = this.v1d(descriptor, key);
  if (tmp0_safe_receiver == null)
    null;
  else {
    // Inline function 'kotlin.let' call
    return tmp0_safe_receiver;
  }
  var value = defaultValue();
  this.u1d(descriptor, key, value);
  return value;
};
protoOf(DescriptorSchemaCache).v1d = function (descriptor, key) {
  var tmp0_safe_receiver = this.h1b_1.l2(descriptor);
  var tmp;
  if (tmp0_safe_receiver == null) {
    tmp = null;
  } else {
    tmp = tmp0_safe_receiver.l2(key instanceof Key ? key : THROW_CCE());
  }
  var tmp_0 = tmp;
  return !(tmp_0 == null) ? tmp_0 : null;
};
function DiscriminatorHolder(discriminatorToSkip) {
  this.w1d_1 = discriminatorToSkip;
}
function trySkip($this, _this__u8e3s4, unknownKey) {
  if (_this__u8e3s4 == null)
    return false;
  if (_this__u8e3s4.w1d_1 === unknownKey) {
    _this__u8e3s4.w1d_1 = null;
    return true;
  }
  return false;
}
function skipLeftoverElements($this, descriptor) {
  while (!($this.yq(descriptor) === -1)) {
  }
}
function checkLeadingComma($this) {
  if ($this.u16_1.l1c() === 4) {
    $this.u16_1.g1b('Unexpected leading comma');
  }
}
function decodeMapIndex($this) {
  var hasComma = false;
  var decodingKey = !(($this.w16_1 % 2 | 0) === 0);
  if (decodingKey) {
    if (!($this.w16_1 === -1)) {
      hasComma = $this.u16_1.y1d();
    }
  } else {
    $this.u16_1.x1d(_Char___init__impl__6a9atx(58));
  }
  var tmp;
  if ($this.u16_1.m1c()) {
    if (decodingKey) {
      if ($this.w16_1 === -1) {
        var tmp0 = $this.u16_1;
        // Inline function 'kotlinx.serialization.json.internal.AbstractJsonLexer.require' call
        var condition = !hasComma;
        var position = tmp0.a17_1;
        if (!condition) {
          var tmp$ret$0 = 'Unexpected leading comma';
          tmp0.g1b(tmp$ret$0, position);
        }
      } else {
        var tmp0_0 = $this.u16_1;
        // Inline function 'kotlinx.serialization.json.internal.AbstractJsonLexer.require' call
        var condition_0 = hasComma;
        var position_0 = tmp0_0.a17_1;
        if (!condition_0) {
          var tmp$ret$2 = 'Expected comma after the key-value pair';
          tmp0_0.g1b(tmp$ret$2, position_0);
        }
      }
    }
    $this.w16_1 = $this.w16_1 + 1 | 0;
    tmp = $this.w16_1;
  } else {
    if (hasComma && !$this.s16_1.l16_1.m18_1) {
      invalidTrailingComma($this.u16_1);
    }
    tmp = -1;
  }
  return tmp;
}
function coerceInputValue($this, descriptor, index) {
  var tmp0 = $this.s16_1;
  var tmp$ret$1;
  $l$block_2: {
    // Inline function 'kotlinx.serialization.json.internal.tryCoerceValue' call
    var isOptional = descriptor.bp(index);
    var elementDescriptor = descriptor.ap(index);
    var tmp;
    if (isOptional && !elementDescriptor.lo()) {
      tmp = $this.u16_1.z1d(true);
    } else {
      tmp = false;
    }
    if (tmp) {
      tmp$ret$1 = true;
      break $l$block_2;
    }
    if (equals(elementDescriptor.to(), ENUM_getInstance())) {
      var tmp_0;
      if (elementDescriptor.lo()) {
        tmp_0 = $this.u16_1.z1d(false);
      } else {
        tmp_0 = false;
      }
      if (tmp_0) {
        tmp$ret$1 = false;
        break $l$block_2;
      }
      var tmp0_elvis_lhs = $this.u16_1.a1e($this.y16_1.a18_1);
      var tmp_1;
      if (tmp0_elvis_lhs == null) {
        tmp$ret$1 = false;
        break $l$block_2;
      } else {
        tmp_1 = tmp0_elvis_lhs;
      }
      var enumValue = tmp_1;
      var enumIndex = getJsonNameIndex(elementDescriptor, tmp0, enumValue);
      var coerceToNull = !tmp0.l16_1.d18_1 && elementDescriptor.lo();
      if (enumIndex === -3 && (isOptional || coerceToNull)) {
        $this.u16_1.n1c();
        tmp$ret$1 = true;
        break $l$block_2;
      }
    }
    tmp$ret$1 = false;
  }
  return tmp$ret$1;
}
function decodeObjectIndex($this, descriptor) {
  var hasComma = $this.u16_1.y1d();
  while ($this.u16_1.m1c()) {
    hasComma = false;
    var key = decodeStringKey($this);
    $this.u16_1.x1d(_Char___init__impl__6a9atx(58));
    var index = getJsonNameIndex(descriptor, $this.s16_1, key);
    var tmp;
    if (!(index === -3)) {
      var tmp_0;
      if ($this.y16_1.f18_1 && coerceInputValue($this, descriptor, index)) {
        hasComma = $this.u16_1.y1d();
        tmp_0 = false;
      } else {
        var tmp0_safe_receiver = $this.z16_1;
        if (tmp0_safe_receiver == null)
          null;
        else {
          tmp0_safe_receiver.d1b(index);
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
  if (hasComma && !$this.s16_1.l16_1.m18_1) {
    invalidTrailingComma($this.u16_1);
  }
  var tmp1_safe_receiver = $this.z16_1;
  var tmp2_elvis_lhs = tmp1_safe_receiver == null ? null : tmp1_safe_receiver.e1b();
  return tmp2_elvis_lhs == null ? -1 : tmp2_elvis_lhs;
}
function handleUnknown($this, descriptor, key) {
  if (ignoreUnknownKeys(descriptor, $this.s16_1) || trySkip($this, $this.x16_1, key)) {
    $this.u16_1.c1e($this.y16_1.a18_1);
  } else {
    $this.u16_1.b17_1.s1b();
    $this.u16_1.b1e(key);
  }
  return $this.u16_1.y1d();
}
function decodeListIndex($this) {
  var hasComma = $this.u16_1.y1d();
  var tmp;
  if ($this.u16_1.m1c()) {
    if (!($this.w16_1 === -1) && !hasComma) {
      $this.u16_1.g1b('Expected end of the array or comma');
    }
    $this.w16_1 = $this.w16_1 + 1 | 0;
    tmp = $this.w16_1;
  } else {
    if (hasComma && !$this.s16_1.l16_1.m18_1) {
      invalidTrailingComma($this.u16_1, 'array');
    }
    tmp = -1;
  }
  return tmp;
}
function decodeStringKey($this) {
  var tmp;
  if ($this.y16_1.a18_1) {
    tmp = $this.u16_1.e1e();
  } else {
    tmp = $this.u16_1.d1e();
  }
  return tmp;
}
function StreamingJsonDecoder(json, mode, lexer, descriptor, discriminatorHolder) {
  AbstractDecoder.call(this);
  this.s16_1 = json;
  this.t16_1 = mode;
  this.u16_1 = lexer;
  this.v16_1 = this.s16_1.wq();
  this.w16_1 = -1;
  this.x16_1 = discriminatorHolder;
  this.y16_1 = this.s16_1.l16_1;
  this.z16_1 = this.y16_1.d18_1 ? null : new JsonElementMarker(descriptor);
}
protoOf(StreamingJsonDecoder).p18 = function () {
  return this.s16_1;
};
protoOf(StreamingJsonDecoder).wq = function () {
  return this.v16_1;
};
protoOf(StreamingJsonDecoder).q18 = function () {
  return (new JsonTreeReader(this.s16_1.l16_1, this.u16_1)).p1c();
};
protoOf(StreamingJsonDecoder).hq = function (deserializer) {
  try {
    var tmp;
    if (!(deserializer instanceof AbstractPolymorphicSerializer)) {
      tmp = true;
    } else {
      tmp = this.s16_1.l16_1.g18_1;
    }
    if (tmp) {
      return deserializer.nn(this);
    }
    var discriminator = classDiscriminator(deserializer.ln(), this.s16_1);
    var tmp0_elvis_lhs = this.u16_1.f1e(discriminator, this.y16_1.a18_1);
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
          tmp_1 = this.p18().l16_1.g18_1;
        }
        if (tmp_1) {
          tmp$ret$0 = tmp2.nn(this);
          break $l$block;
        }
        var discriminator_0 = classDiscriminator(tmp2.ln(), this.p18());
        var tmp0 = this.q18();
        // Inline function 'kotlinx.serialization.json.internal.cast' call
        var serialName = tmp2.ln().so();
        if (!(tmp0 instanceof JsonObject)) {
          var tmp_2 = getKClass(JsonObject).y9();
          var tmp_3 = getKClassFromExpression(tmp0).y9();
          var tmp$ret$1 = this.u16_1.b17_1.t1b();
          throw JsonDecodingException_0(-1, 'Expected ' + tmp_2 + ', but had ' + tmp_3 + ' as the serialized body of ' + serialName + ' at element: ' + tmp$ret$1, toString(tmp0));
        }
        var jsonTree = tmp0;
        var tmp0_safe_receiver = jsonTree.v18(discriminator_0);
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
        tmp$ret$0 = readPolymorphicJson(this.p18(), discriminator_0, jsonTree, actualSerializer);
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
        this.u16_1.g1b(message, VOID, hint);
      } else {
        throw $p;
      }
      tmp_7 = tmp_8;
    }
    var tmp_9 = tmp_7;
    var actualSerializer_0 = isInterface(tmp_9, DeserializationStrategy) ? tmp_9 : THROW_CCE();
    this.x16_1 = new DiscriminatorHolder(discriminator);
    return actualSerializer_0.nn(this);
  } catch ($p) {
    if ($p instanceof MissingFieldException) {
      var e = $p;
      if (contains(ensureNotNull(e.message), 'at path'))
        throw e;
      throw new MissingFieldException(e.fo_1, plus(e.message, ' at path: ') + this.u16_1.b17_1.t1b(), e);
    } else {
      throw $p;
    }
  }
};
protoOf(StreamingJsonDecoder).iq = function (descriptor) {
  var newMode = switchMode(this.s16_1, descriptor);
  this.u16_1.b17_1.o1b(descriptor);
  this.u16_1.x1d(newMode.i1e_1);
  checkLeadingComma(this);
  var tmp;
  switch (newMode.r2_1) {
    case 1:
    case 2:
    case 3:
      tmp = new StreamingJsonDecoder(this.s16_1, newMode, this.u16_1, descriptor, this.x16_1);
      break;
    default:
      var tmp_0;
      if (this.t16_1.equals(newMode) && this.s16_1.l16_1.d18_1) {
        tmp_0 = this;
      } else {
        tmp_0 = new StreamingJsonDecoder(this.s16_1, newMode, this.u16_1, descriptor, this.x16_1);
      }

      tmp = tmp_0;
      break;
  }
  return tmp;
};
protoOf(StreamingJsonDecoder).jq = function (descriptor) {
  if (descriptor.vo() === 0 && ignoreUnknownKeys(descriptor, this.s16_1)) {
    skipLeftoverElements(this, descriptor);
  }
  if (this.u16_1.y1d() && !this.s16_1.l16_1.m18_1) {
    invalidTrailingComma(this.u16_1, '');
  }
  this.u16_1.x1d(this.t16_1.j1e_1);
  this.u16_1.b17_1.s1b();
};
protoOf(StreamingJsonDecoder).up = function () {
  var tmp;
  var tmp0_safe_receiver = this.z16_1;
  var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.c1b_1;
  if (!(tmp1_elvis_lhs == null ? false : tmp1_elvis_lhs)) {
    tmp = !this.u16_1.k1e();
  } else {
    tmp = false;
  }
  return tmp;
};
protoOf(StreamingJsonDecoder).vp = function () {
  return null;
};
protoOf(StreamingJsonDecoder).uq = function (descriptor, index, deserializer, previousValue) {
  var isMapKey = this.t16_1.equals(WriteMode_MAP_getInstance()) && (index & 1) === 0;
  if (isMapKey) {
    this.u16_1.b17_1.r1b();
  }
  var value = protoOf(AbstractDecoder).uq.call(this, descriptor, index, deserializer, previousValue);
  if (isMapKey) {
    this.u16_1.b17_1.q1b(value);
  }
  return value;
};
protoOf(StreamingJsonDecoder).yq = function (descriptor) {
  var index;
  switch (this.t16_1.r2_1) {
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
  if (!this.t16_1.equals(WriteMode_MAP_getInstance())) {
    this.u16_1.b17_1.p1b(index);
  }
  return index;
};
protoOf(StreamingJsonDecoder).wp = function () {
  return this.u16_1.l1e();
};
protoOf(StreamingJsonDecoder).xp = function () {
  var value = this.u16_1.m1e();
  if (!equalsLong(value, fromInt(convertToByte(value)))) {
    this.u16_1.g1b("Failed to parse byte for input '" + value.toString() + "'");
  }
  return convertToByte(value);
};
protoOf(StreamingJsonDecoder).yp = function () {
  var value = this.u16_1.m1e();
  if (!equalsLong(value, fromInt(convertToShort(value)))) {
    this.u16_1.g1b("Failed to parse short for input '" + value.toString() + "'");
  }
  return convertToShort(value);
};
protoOf(StreamingJsonDecoder).zp = function () {
  var value = this.u16_1.m1e();
  if (!equalsLong(value, fromInt(convertToInt(value)))) {
    this.u16_1.g1b("Failed to parse int for input '" + value.toString() + "'");
  }
  return convertToInt(value);
};
protoOf(StreamingJsonDecoder).aq = function () {
  return this.u16_1.m1e();
};
protoOf(StreamingJsonDecoder).bq = function () {
  var tmp0 = this.u16_1;
  var tmp$ret$4;
  $l$block: {
    // Inline function 'kotlinx.serialization.json.internal.parseString' call
    var input = tmp0.o1c();
    try {
      // Inline function 'kotlin.text.toFloat' call
      // Inline function 'kotlin.js.unsafeCast' call
      // Inline function 'kotlin.js.asDynamic' call
      tmp$ret$4 = toDouble(input);
      break $l$block;
    } catch ($p) {
      if ($p instanceof IllegalArgumentException) {
        var e = $p;
        tmp0.g1b("Failed to parse type '" + 'float' + "' for input '" + input + "'");
      } else {
        throw $p;
      }
    }
  }
  var result = tmp$ret$4;
  var specialFp = this.s16_1.l16_1.i18_1;
  if (specialFp || isFinite(result))
    return result;
  throwInvalidFloatingPointDecoded(this.u16_1, result);
};
protoOf(StreamingJsonDecoder).cq = function () {
  var tmp0 = this.u16_1;
  var tmp$ret$1;
  $l$block: {
    // Inline function 'kotlinx.serialization.json.internal.parseString' call
    var input = tmp0.o1c();
    try {
      tmp$ret$1 = toDouble(input);
      break $l$block;
    } catch ($p) {
      if ($p instanceof IllegalArgumentException) {
        var e = $p;
        tmp0.g1b("Failed to parse type '" + 'double' + "' for input '" + input + "'");
      } else {
        throw $p;
      }
    }
  }
  var result = tmp$ret$1;
  var specialFp = this.s16_1.l16_1.i18_1;
  if (specialFp || isFinite_0(result))
    return result;
  throwInvalidFloatingPointDecoded(this.u16_1, result);
};
protoOf(StreamingJsonDecoder).dq = function () {
  var string = this.u16_1.o1c();
  if (!(string.length === 1)) {
    this.u16_1.g1b("Expected single char, but got '" + string + "'");
  }
  return charCodeAt(string, 0);
};
protoOf(StreamingJsonDecoder).eq = function () {
  var tmp;
  if (this.y16_1.a18_1) {
    tmp = this.u16_1.e1e();
  } else {
    tmp = this.u16_1.n1c();
  }
  return tmp;
};
protoOf(StreamingJsonDecoder).fq = function (descriptor) {
  return get_isUnsignedNumber(descriptor) ? new JsonDecoderForUnsignedTypes(this.u16_1, this.s16_1) : protoOf(AbstractDecoder).fq.call(this, descriptor);
};
function JsonDecoderForUnsignedTypes(lexer, json) {
  AbstractDecoder.call(this);
  this.n1e_1 = lexer;
  this.o1e_1 = json.wq();
}
protoOf(JsonDecoderForUnsignedTypes).wq = function () {
  return this.o1e_1;
};
protoOf(JsonDecoderForUnsignedTypes).yq = function (descriptor) {
  var message = 'unsupported';
  throw IllegalStateException_init_$Create$(toString(message));
};
protoOf(JsonDecoderForUnsignedTypes).zp = function () {
  var tmp0 = this.n1e_1;
  var tmp$ret$2;
  $l$block: {
    // Inline function 'kotlinx.serialization.json.internal.parseString' call
    var input = tmp0.o1c();
    try {
      // Inline function 'kotlin.UInt.toInt' call
      var this_0 = toUInt(input);
      tmp$ret$2 = _UInt___get_data__impl__f0vqqw(this_0);
      break $l$block;
    } catch ($p) {
      if ($p instanceof IllegalArgumentException) {
        var e = $p;
        tmp0.g1b("Failed to parse type '" + 'UInt' + "' for input '" + input + "'");
      } else {
        throw $p;
      }
    }
  }
  return tmp$ret$2;
};
protoOf(JsonDecoderForUnsignedTypes).aq = function () {
  var tmp0 = this.n1e_1;
  var tmp$ret$2;
  $l$block: {
    // Inline function 'kotlinx.serialization.json.internal.parseString' call
    var input = tmp0.o1c();
    try {
      // Inline function 'kotlin.ULong.toLong' call
      var this_0 = toULong(input);
      tmp$ret$2 = _ULong___get_data__impl__fggpzb(this_0);
      break $l$block;
    } catch ($p) {
      if ($p instanceof IllegalArgumentException) {
        var e = $p;
        tmp0.g1b("Failed to parse type '" + 'ULong' + "' for input '" + input + "'");
      } else {
        throw $p;
      }
    }
  }
  return tmp$ret$2;
};
protoOf(JsonDecoderForUnsignedTypes).xp = function () {
  var tmp0 = this.n1e_1;
  var tmp$ret$2;
  $l$block: {
    // Inline function 'kotlinx.serialization.json.internal.parseString' call
    var input = tmp0.o1c();
    try {
      // Inline function 'kotlin.UByte.toByte' call
      var this_0 = toUByte(input);
      tmp$ret$2 = _UByte___get_data__impl__jof9qr(this_0);
      break $l$block;
    } catch ($p) {
      if ($p instanceof IllegalArgumentException) {
        var e = $p;
        tmp0.g1b("Failed to parse type '" + 'UByte' + "' for input '" + input + "'");
      } else {
        throw $p;
      }
    }
  }
  return tmp$ret$2;
};
protoOf(JsonDecoderForUnsignedTypes).yp = function () {
  var tmp0 = this.n1e_1;
  var tmp$ret$2;
  $l$block: {
    // Inline function 'kotlinx.serialization.json.internal.parseString' call
    var input = tmp0.o1c();
    try {
      // Inline function 'kotlin.UShort.toShort' call
      var this_0 = toUShort(input);
      tmp$ret$2 = _UShort___get_data__impl__g0245(this_0);
      break $l$block;
    } catch ($p) {
      if ($p instanceof IllegalArgumentException) {
        var e = $p;
        tmp0.g1b("Failed to parse type '" + 'UShort' + "' for input '" + input + "'");
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
  $this.x1b_1.a1a();
  $this.lr(discriminator);
  $this.x1b_1.d1a(_Char___init__impl__6a9atx(58));
  $this.x1b_1.c1a();
  $this.lr(serialName);
}
function StreamingJsonEncoder(composer, json, mode, modeReuseCache) {
  AbstractEncoder.call(this);
  this.x1b_1 = composer;
  this.y1b_1 = json;
  this.z1b_1 = mode;
  this.a1c_1 = modeReuseCache;
  this.b1c_1 = this.y1b_1.wq();
  this.c1c_1 = this.y1b_1.l16_1;
  this.d1c_1 = false;
  this.e1c_1 = null;
  this.f1c_1 = null;
  var i = this.z1b_1.r2_1;
  if (!(this.a1c_1 == null)) {
    if (!(this.a1c_1[i] === null) || !(this.a1c_1[i] === this)) {
      this.a1c_1[i] = this;
    }
  }
}
protoOf(StreamingJsonEncoder).p18 = function () {
  return this.y1b_1;
};
protoOf(StreamingJsonEncoder).wq = function () {
  return this.b1c_1;
};
protoOf(StreamingJsonEncoder).yr = function (serializer, value) {
  $l$block: {
    // Inline function 'kotlinx.serialization.json.internal.encodePolymorphically' call
    if (this.p18().l16_1.g18_1) {
      serializer.mn(this, value);
      break $l$block;
    }
    var isPolymorphicSerializer = serializer instanceof AbstractPolymorphicSerializer;
    var tmp;
    if (isPolymorphicSerializer) {
      tmp = !this.p18().l16_1.o18_1.equals(ClassDiscriminatorMode_NONE_getInstance());
    } else {
      var tmp_0;
      switch (this.p18().l16_1.o18_1.r2_1) {
        case 0:
        case 2:
          tmp_0 = false;
          break;
        case 1:
          // Inline function 'kotlin.let' call

          var it = serializer.ln().to();
          tmp_0 = equals(it, CLASS_getInstance()) || equals(it, OBJECT_getInstance());
          break;
        default:
          noWhenBranchMatchedException();
          break;
      }
      tmp = tmp_0;
    }
    var needDiscriminator = tmp;
    var baseClassDiscriminator = needDiscriminator ? classDiscriminator(serializer.ln(), this.p18()) : null;
    var tmp_1;
    if (isPolymorphicSerializer) {
      var casted = serializer instanceof AbstractPolymorphicSerializer ? serializer : THROW_CCE();
      $l$block_0: {
        // Inline function 'kotlin.requireNotNull' call
        if (value == null) {
          var message = 'Value for serializer ' + toString(serializer.ln()) + ' should always be non-null. Please report issue to the kotlinx.serialization tracker.';
          throw IllegalArgumentException_init_$Create$(toString(message));
        } else {
          break $l$block_0;
        }
      }
      var actual = findPolymorphicSerializer_0(casted, this, value);
      if (!(baseClassDiscriminator == null)) {
        access$validateIfSealed$tPolymorphicKt(serializer, actual, baseClassDiscriminator);
        checkKind_0(actual.ln().to());
      }
      tmp_1 = isInterface(actual, SerializationStrategy) ? actual : THROW_CCE();
    } else {
      tmp_1 = serializer;
    }
    var actualSerializer = tmp_1;
    if (!(baseClassDiscriminator == null)) {
      var serialName = actualSerializer.ln().so();
      this.e1c_1 = baseClassDiscriminator;
      this.f1c_1 = serialName;
    }
    actualSerializer.mn(this, value);
  }
};
protoOf(StreamingJsonEncoder).iq = function (descriptor) {
  var newMode = switchMode(this.y1b_1, descriptor);
  if (!(newMode.i1e_1 === _Char___init__impl__6a9atx(0))) {
    this.x1b_1.d1a(newMode.i1e_1);
    this.x1b_1.y19();
  }
  var discriminator = this.e1c_1;
  if (!(discriminator == null)) {
    var tmp0_elvis_lhs = this.f1c_1;
    encodeTypeInfo(this, discriminator, tmp0_elvis_lhs == null ? descriptor.so() : tmp0_elvis_lhs);
    this.e1c_1 = null;
    this.f1c_1 = null;
  }
  if (this.z1b_1.equals(newMode)) {
    return this;
  }
  var tmp1_safe_receiver = this.a1c_1;
  var tmp2_elvis_lhs = tmp1_safe_receiver == null ? null : tmp1_safe_receiver[newMode.r2_1];
  return tmp2_elvis_lhs == null ? new StreamingJsonEncoder(this.x1b_1, this.y1b_1, newMode, this.a1c_1) : tmp2_elvis_lhs;
};
protoOf(StreamingJsonEncoder).jq = function (descriptor) {
  if (!(this.z1b_1.j1e_1 === _Char___init__impl__6a9atx(0))) {
    this.x1b_1.z19();
    this.x1b_1.b1a();
    this.x1b_1.d1a(this.z1b_1.j1e_1);
  }
};
protoOf(StreamingJsonEncoder).ar = function (descriptor, index) {
  switch (this.z1b_1.r2_1) {
    case 1:
      if (!this.x1b_1.x19_1) {
        this.x1b_1.d1a(_Char___init__impl__6a9atx(44));
      }

      this.x1b_1.a1a();
      break;
    case 2:
      if (!this.x1b_1.x19_1) {
        var tmp = this;
        var tmp_0;
        if ((index % 2 | 0) === 0) {
          this.x1b_1.d1a(_Char___init__impl__6a9atx(44));
          this.x1b_1.a1a();
          tmp_0 = true;
        } else {
          this.x1b_1.d1a(_Char___init__impl__6a9atx(58));
          this.x1b_1.c1a();
          tmp_0 = false;
        }
        tmp.d1c_1 = tmp_0;
      } else {
        this.d1c_1 = true;
        this.x1b_1.a1a();
      }

      break;
    case 3:
      if (index === 0)
        this.d1c_1 = true;
      if (index === 1) {
        this.x1b_1.d1a(_Char___init__impl__6a9atx(44));
        this.x1b_1.c1a();
        this.d1c_1 = false;
      }

      break;
    default:
      if (!this.x1b_1.x19_1) {
        this.x1b_1.d1a(_Char___init__impl__6a9atx(44));
      }

      this.x1b_1.a1a();
      this.lr(getJsonElementName(descriptor, this.y1b_1, index));
      this.x1b_1.d1a(_Char___init__impl__6a9atx(58));
      this.x1b_1.c1a();
      break;
  }
  return true;
};
protoOf(StreamingJsonEncoder).mr = function (descriptor) {
  var tmp;
  if (get_isUnsignedNumber(descriptor)) {
    // Inline function 'kotlinx.serialization.json.internal.StreamingJsonEncoder.composerAs' call
    var tmp_0;
    var tmp_1 = this.x1b_1;
    if (tmp_1 instanceof ComposerForUnsignedNumbers) {
      tmp_0 = this.x1b_1;
    } else {
      var tmp0 = this.x1b_1.w19_1;
      var p1 = this.d1c_1;
      tmp_0 = new ComposerForUnsignedNumbers(tmp0, p1);
    }
    var tmp$ret$1 = tmp_0;
    tmp = new StreamingJsonEncoder(tmp$ret$1, this.y1b_1, this.z1b_1, null);
  } else if (get_isUnquotedLiteral(descriptor)) {
    // Inline function 'kotlinx.serialization.json.internal.StreamingJsonEncoder.composerAs' call
    var tmp_2;
    var tmp_3 = this.x1b_1;
    if (tmp_3 instanceof ComposerForUnquotedLiterals) {
      tmp_2 = this.x1b_1;
    } else {
      var tmp0_0 = this.x1b_1.w19_1;
      var p1_0 = this.d1c_1;
      tmp_2 = new ComposerForUnquotedLiterals(tmp0_0, p1_0);
    }
    var tmp$ret$3 = tmp_2;
    tmp = new StreamingJsonEncoder(tmp$ret$3, this.y1b_1, this.z1b_1, null);
  } else if (!(this.e1c_1 == null)) {
    // Inline function 'kotlin.apply' call
    this.f1c_1 = descriptor.so();
    tmp = this;
  } else {
    tmp = protoOf(AbstractEncoder).mr.call(this, descriptor);
  }
  return tmp;
};
protoOf(StreamingJsonEncoder).cr = function () {
  this.x1b_1.f1a('null');
};
protoOf(StreamingJsonEncoder).dr = function (value) {
  if (this.d1c_1) {
    this.lr(value.toString());
  } else {
    this.x1b_1.o1a(value);
  }
};
protoOf(StreamingJsonEncoder).er = function (value) {
  if (this.d1c_1) {
    this.lr(value.toString());
  } else {
    this.x1b_1.j1a(value);
  }
};
protoOf(StreamingJsonEncoder).fr = function (value) {
  if (this.d1c_1) {
    this.lr(value.toString());
  } else {
    this.x1b_1.l1a(value);
  }
};
protoOf(StreamingJsonEncoder).gr = function (value) {
  if (this.d1c_1) {
    this.lr(value.toString());
  } else {
    this.x1b_1.m1a(value);
  }
};
protoOf(StreamingJsonEncoder).hr = function (value) {
  if (this.d1c_1) {
    this.lr(value.toString());
  } else {
    this.x1b_1.n1a(value);
  }
};
protoOf(StreamingJsonEncoder).ir = function (value) {
  if (this.d1c_1) {
    this.lr(value.toString());
  } else {
    this.x1b_1.h1a(value);
  }
  if (!this.c1c_1.i18_1 && !isFinite(value)) {
    throw InvalidFloatingPointEncoded(value, toString(this.x1b_1.w19_1));
  }
};
protoOf(StreamingJsonEncoder).jr = function (value) {
  if (this.d1c_1) {
    this.lr(value.toString());
  } else {
    this.x1b_1.i1a(value);
  }
  if (!this.c1c_1.i18_1 && !isFinite_0(value)) {
    throw InvalidFloatingPointEncoded(value, toString(this.x1b_1.w19_1));
  }
};
protoOf(StreamingJsonEncoder).kr = function (value) {
  this.lr(toString_1(value));
};
protoOf(StreamingJsonEncoder).lr = function (value) {
  return this.x1b_1.p1a(value);
};
function get_isUnsignedNumber(_this__u8e3s4) {
  _init_properties_StreamingJsonEncoder_kt__pn1bsi();
  return _this__u8e3s4.uo() && get_unsignedNumberDescriptors().y1(_this__u8e3s4);
}
function get_isUnquotedLiteral(_this__u8e3s4) {
  _init_properties_StreamingJsonEncoder_kt__pn1bsi();
  return _this__u8e3s4.uo() && equals(_this__u8e3s4, get_jsonUnquotedLiteralDescriptor());
}
var properties_initialized_StreamingJsonEncoder_kt_6ifwwk;
function _init_properties_StreamingJsonEncoder_kt__pn1bsi() {
  if (!properties_initialized_StreamingJsonEncoder_kt_6ifwwk) {
    properties_initialized_StreamingJsonEncoder_kt_6ifwwk = true;
    unsignedNumberDescriptors = setOf([serializer_1(Companion_getInstance_0()).ln(), serializer_0(Companion_getInstance()).ln(), serializer_2(Companion_getInstance_1()).ln(), serializer_3(Companion_getInstance_2()).ln()]);
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
  _this__u8e3s4.t7(_Char___init__impl__6a9atx(34));
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
        _this__u8e3s4.hb(value, lastPos, i);
        _this__u8e3s4.s7(get_ESCAPE_STRINGS()[c]);
        lastPos = i + 1 | 0;
      }
    }
     while (inductionVariable <= last);
  if (!(lastPos === 0))
    _this__u8e3s4.hb(value, lastPos, value.length);
  else
    _this__u8e3s4.s7(value);
  _this__u8e3s4.t7(_Char___init__impl__6a9atx(34));
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
  throw JsonDecodingException_0(-1, "Failed to parse literal '" + literal.toString() + "' as " + type + ' value at element: ' + $this.v1e(tag), toString($this.w1e()));
}
function AbstractJsonTreeDecoder(json, value, polymorphicDiscriminator) {
  polymorphicDiscriminator = polymorphicDiscriminator === VOID ? null : polymorphicDiscriminator;
  NamedValueDecoder.call(this);
  this.r1e_1 = json;
  this.s1e_1 = value;
  this.t1e_1 = polymorphicDiscriminator;
  this.u1e_1 = this.p18().l16_1;
}
protoOf(AbstractJsonTreeDecoder).p18 = function () {
  return this.r1e_1;
};
protoOf(AbstractJsonTreeDecoder).p2 = function () {
  return this.s1e_1;
};
protoOf(AbstractJsonTreeDecoder).wq = function () {
  return this.p18().wq();
};
protoOf(AbstractJsonTreeDecoder).w1e = function () {
  var tmp0_safe_receiver = this.t13();
  var tmp;
  if (tmp0_safe_receiver == null) {
    tmp = null;
  } else {
    // Inline function 'kotlin.let' call
    tmp = this.x1e(tmp0_safe_receiver);
  }
  var tmp1_elvis_lhs = tmp;
  return tmp1_elvis_lhs == null ? this.p2() : tmp1_elvis_lhs;
};
protoOf(AbstractJsonTreeDecoder).v1e = function (currentTag) {
  return this.v13() + ('.' + currentTag);
};
protoOf(AbstractJsonTreeDecoder).q18 = function () {
  return this.w1e();
};
protoOf(AbstractJsonTreeDecoder).hq = function (deserializer) {
  var tmp$ret$0;
  $l$block: {
    // Inline function 'kotlinx.serialization.json.internal.decodeSerializableValuePolymorphic' call
    var tmp;
    if (!(deserializer instanceof AbstractPolymorphicSerializer)) {
      tmp = true;
    } else {
      tmp = this.p18().l16_1.g18_1;
    }
    if (tmp) {
      tmp$ret$0 = deserializer.nn(this);
      break $l$block;
    }
    var discriminator = classDiscriminator(deserializer.ln(), this.p18());
    var tmp0 = this.q18();
    // Inline function 'kotlinx.serialization.json.internal.cast' call
    var serialName = deserializer.ln().so();
    if (!(tmp0 instanceof JsonObject)) {
      var tmp_0 = getKClass(JsonObject).y9();
      var tmp_1 = getKClassFromExpression(tmp0).y9();
      var tmp$ret$1 = this.v13();
      throw JsonDecodingException_0(-1, 'Expected ' + tmp_0 + ', but had ' + tmp_1 + ' as the serialized body of ' + serialName + ' at element: ' + tmp$ret$1, toString(tmp0));
    }
    var jsonTree = tmp0;
    var tmp0_safe_receiver = jsonTree.v18(discriminator);
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
    tmp$ret$0 = readPolymorphicJson(this.p18(), discriminator, jsonTree, actualSerializer);
  }
  return tmp$ret$0;
};
protoOf(AbstractJsonTreeDecoder).u13 = function (parentName, childName) {
  return childName;
};
protoOf(AbstractJsonTreeDecoder).iq = function (descriptor) {
  var currentObject = this.w1e();
  var tmp0_subject = descriptor.to();
  var tmp;
  var tmp_0;
  if (equals(tmp0_subject, LIST_getInstance())) {
    tmp_0 = true;
  } else {
    tmp_0 = tmp0_subject instanceof PolymorphicKind;
  }
  if (tmp_0) {
    var tmp_1 = this.p18();
    // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
    // Inline function 'kotlinx.serialization.json.internal.cast' call
    var serialName = descriptor.so();
    if (!(currentObject instanceof JsonArray)) {
      var tmp_2 = getKClass(JsonArray).y9();
      var tmp_3 = getKClassFromExpression(currentObject).y9();
      var tmp$ret$0 = this.v13();
      throw JsonDecodingException_0(-1, 'Expected ' + tmp_2 + ', but had ' + tmp_3 + ' as the serialized body of ' + serialName + ' at element: ' + tmp$ret$0, toString(currentObject));
    }
    tmp = new JsonTreeListDecoder(tmp_1, currentObject);
  } else {
    if (equals(tmp0_subject, MAP_getInstance())) {
      // Inline function 'kotlinx.serialization.json.internal.selectMapMode' call
      var this_0 = this.p18();
      var keyDescriptor = carrierDescriptor(descriptor.ap(0), this_0.wq());
      var keyKind = keyDescriptor.to();
      var tmp_4;
      var tmp_5;
      if (keyKind instanceof PrimitiveKind) {
        tmp_5 = true;
      } else {
        tmp_5 = equals(keyKind, ENUM_getInstance());
      }
      if (tmp_5) {
        var tmp_6 = this.p18();
        // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
        // Inline function 'kotlinx.serialization.json.internal.cast' call
        var serialName_0 = descriptor.so();
        if (!(currentObject instanceof JsonObject)) {
          var tmp_7 = getKClass(JsonObject).y9();
          var tmp_8 = getKClassFromExpression(currentObject).y9();
          var tmp$ret$3 = this.v13();
          throw JsonDecodingException_0(-1, 'Expected ' + tmp_7 + ', but had ' + tmp_8 + ' as the serialized body of ' + serialName_0 + ' at element: ' + tmp$ret$3, toString(currentObject));
        }
        tmp_4 = new JsonTreeMapDecoder(tmp_6, currentObject);
      } else {
        if (this_0.l16_1.b18_1) {
          var tmp_9 = this.p18();
          // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
          // Inline function 'kotlinx.serialization.json.internal.cast' call
          var serialName_1 = descriptor.so();
          if (!(currentObject instanceof JsonArray)) {
            var tmp_10 = getKClass(JsonArray).y9();
            var tmp_11 = getKClassFromExpression(currentObject).y9();
            var tmp$ret$7 = this.v13();
            throw JsonDecodingException_0(-1, 'Expected ' + tmp_10 + ', but had ' + tmp_11 + ' as the serialized body of ' + serialName_1 + ' at element: ' + tmp$ret$7, toString(currentObject));
          }
          tmp_4 = new JsonTreeListDecoder(tmp_9, currentObject);
        } else {
          throw InvalidKeyKindException(keyDescriptor);
        }
      }
      tmp = tmp_4;
    } else {
      var tmp_12 = this.p18();
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
      // Inline function 'kotlinx.serialization.json.internal.cast' call
      var serialName_2 = descriptor.so();
      if (!(currentObject instanceof JsonObject)) {
        var tmp_13 = getKClass(JsonObject).y9();
        var tmp_14 = getKClassFromExpression(currentObject).y9();
        var tmp$ret$12 = this.v13();
        throw JsonDecodingException_0(-1, 'Expected ' + tmp_13 + ', but had ' + tmp_14 + ' as the serialized body of ' + serialName_2 + ' at element: ' + tmp$ret$12, toString(currentObject));
      }
      tmp = new JsonTreeDecoder(tmp_12, currentObject, this.t1e_1);
    }
  }
  return tmp;
};
protoOf(AbstractJsonTreeDecoder).jq = function (descriptor) {
};
protoOf(AbstractJsonTreeDecoder).up = function () {
  var tmp = this.w1e();
  return !(tmp instanceof JsonNull);
};
protoOf(AbstractJsonTreeDecoder).y1e = function (tag) {
  return !(this.x1e(tag) === JsonNull_getInstance());
};
protoOf(AbstractJsonTreeDecoder).x13 = function (tag) {
  return this.y1e((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE());
};
protoOf(AbstractJsonTreeDecoder).z1e = function (tag) {
  var tmp$ret$4;
  $l$block: {
    // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.getPrimitiveValue' call
    // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
    // Inline function 'kotlinx.serialization.json.internal.cast' call
    var value = this.x1e(tag);
    if (!(value instanceof JsonPrimitive)) {
      var tmp = getKClass(JsonPrimitive).y9();
      var tmp_0 = getKClassFromExpression(value).y9();
      var tmp$ret$0 = this.v1e(tag);
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
protoOf(AbstractJsonTreeDecoder).y13 = function (tag) {
  return this.z1e((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE());
};
protoOf(AbstractJsonTreeDecoder).a1f = function (tag) {
  var tmp$ret$5;
  $l$block: {
    // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.getPrimitiveValue' call
    // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
    // Inline function 'kotlinx.serialization.json.internal.cast' call
    var value = this.x1e(tag);
    if (!(value instanceof JsonPrimitive)) {
      var tmp = getKClass(JsonPrimitive).y9();
      var tmp_0 = getKClassFromExpression(value).y9();
      var tmp$ret$0 = this.v1e(tag);
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
protoOf(AbstractJsonTreeDecoder).z13 = function (tag) {
  return this.a1f((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE());
};
protoOf(AbstractJsonTreeDecoder).b1f = function (tag) {
  var tmp$ret$5;
  $l$block: {
    // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.getPrimitiveValue' call
    // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
    // Inline function 'kotlinx.serialization.json.internal.cast' call
    var value = this.x1e(tag);
    if (!(value instanceof JsonPrimitive)) {
      var tmp = getKClass(JsonPrimitive).y9();
      var tmp_0 = getKClassFromExpression(value).y9();
      var tmp$ret$0 = this.v1e(tag);
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
protoOf(AbstractJsonTreeDecoder).a14 = function (tag) {
  return this.b1f((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE());
};
protoOf(AbstractJsonTreeDecoder).c1f = function (tag) {
  var tmp$ret$5;
  $l$block: {
    // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.getPrimitiveValue' call
    // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
    // Inline function 'kotlinx.serialization.json.internal.cast' call
    var value = this.x1e(tag);
    if (!(value instanceof JsonPrimitive)) {
      var tmp = getKClass(JsonPrimitive).y9();
      var tmp_0 = getKClassFromExpression(value).y9();
      var tmp$ret$0 = this.v1e(tag);
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
protoOf(AbstractJsonTreeDecoder).b14 = function (tag) {
  return this.c1f((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE());
};
protoOf(AbstractJsonTreeDecoder).d1f = function (tag) {
  var tmp$ret$4;
  $l$block: {
    // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.getPrimitiveValue' call
    // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
    // Inline function 'kotlinx.serialization.json.internal.cast' call
    var value = this.x1e(tag);
    if (!(value instanceof JsonPrimitive)) {
      var tmp = getKClass(JsonPrimitive).y9();
      var tmp_0 = getKClassFromExpression(value).y9();
      var tmp$ret$0 = this.v1e(tag);
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
protoOf(AbstractJsonTreeDecoder).c14 = function (tag) {
  return this.d1f((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE());
};
protoOf(AbstractJsonTreeDecoder).e1f = function (tag) {
  var tmp$ret$4;
  $l$block: {
    // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.getPrimitiveValue' call
    // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
    // Inline function 'kotlinx.serialization.json.internal.cast' call
    var value = this.x1e(tag);
    if (!(value instanceof JsonPrimitive)) {
      var tmp = getKClass(JsonPrimitive).y9();
      var tmp_0 = getKClassFromExpression(value).y9();
      var tmp$ret$0 = this.v1e(tag);
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
  var specialFp = this.p18().l16_1.i18_1;
  if (specialFp || isFinite(result))
    return result;
  throw InvalidFloatingPointDecoded(result, tag, toString(this.w1e()));
};
protoOf(AbstractJsonTreeDecoder).d14 = function (tag) {
  return this.e1f((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE());
};
protoOf(AbstractJsonTreeDecoder).f1f = function (tag) {
  var tmp$ret$4;
  $l$block: {
    // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.getPrimitiveValue' call
    // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
    // Inline function 'kotlinx.serialization.json.internal.cast' call
    var value = this.x1e(tag);
    if (!(value instanceof JsonPrimitive)) {
      var tmp = getKClass(JsonPrimitive).y9();
      var tmp_0 = getKClassFromExpression(value).y9();
      var tmp$ret$0 = this.v1e(tag);
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
  var specialFp = this.p18().l16_1.i18_1;
  if (specialFp || isFinite_0(result))
    return result;
  throw InvalidFloatingPointDecoded(result, tag, toString(this.w1e()));
};
protoOf(AbstractJsonTreeDecoder).e14 = function (tag) {
  return this.f1f((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE());
};
protoOf(AbstractJsonTreeDecoder).g1f = function (tag) {
  var tmp$ret$4;
  $l$block: {
    // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.getPrimitiveValue' call
    // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
    // Inline function 'kotlinx.serialization.json.internal.cast' call
    var value = this.x1e(tag);
    if (!(value instanceof JsonPrimitive)) {
      var tmp = getKClass(JsonPrimitive).y9();
      var tmp_0 = getKClassFromExpression(value).y9();
      var tmp$ret$0 = this.v1e(tag);
      throw JsonDecodingException_0(-1, 'Expected ' + tmp + ', but had ' + tmp_0 + ' as the serialized body of ' + 'char' + ' at element: ' + tmp$ret$0, toString(value));
    }
    var literal = value;
    try {
      var tmp0_elvis_lhs = new Char(single(literal.s18()));
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
protoOf(AbstractJsonTreeDecoder).f14 = function (tag) {
  return this.g1f((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE());
};
protoOf(AbstractJsonTreeDecoder).h1f = function (tag) {
  // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
  // Inline function 'kotlinx.serialization.json.internal.cast' call
  var value = this.x1e(tag);
  if (!(value instanceof JsonPrimitive)) {
    var tmp = getKClass(JsonPrimitive).y9();
    var tmp_0 = getKClassFromExpression(value).y9();
    var tmp$ret$0 = this.v1e(tag);
    throw JsonDecodingException_0(-1, 'Expected ' + tmp + ', but had ' + tmp_0 + ' as the serialized body of ' + 'string' + ' at element: ' + tmp$ret$0, toString(value));
  }
  var value_0 = value;
  if (!(value_0 instanceof JsonLiteral))
    throw JsonDecodingException_0(-1, "Expected string value for a non-null key '" + tag + "', got null literal instead at element: " + this.v1e(tag), toString(this.w1e()));
  if (!value_0.b19_1 && !this.p18().l16_1.a18_1) {
    throw JsonDecodingException_0(-1, "String literal for key '" + tag + "' should be quoted at element: " + this.v1e(tag) + ".\nUse 'isLenient = true' in 'Json {}' builder to accept non-compliant JSON.", toString(this.w1e()));
  }
  return value_0.d19_1;
};
protoOf(AbstractJsonTreeDecoder).g14 = function (tag) {
  return this.h1f((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE());
};
protoOf(AbstractJsonTreeDecoder).i1f = function (tag, inlineDescriptor) {
  var tmp;
  if (get_isUnsignedNumber(inlineDescriptor)) {
    var tmp_0 = this.p18();
    // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.getPrimitiveValue' call
    var tmp2 = this.x1e(tag);
    // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
    // Inline function 'kotlinx.serialization.json.internal.cast' call
    var serialName = inlineDescriptor.so();
    if (!(tmp2 instanceof JsonPrimitive)) {
      var tmp_1 = getKClass(JsonPrimitive).y9();
      var tmp_2 = getKClassFromExpression(tmp2).y9();
      var tmp$ret$0 = this.v1e(tag);
      throw JsonDecodingException_0(-1, 'Expected ' + tmp_1 + ', but had ' + tmp_2 + ' as the serialized body of ' + serialName + ' at element: ' + tmp$ret$0, toString(tmp2));
    }
    var lexer = StringJsonLexer_0(tmp_0, tmp2.s18());
    tmp = new JsonDecoderForUnsignedTypes(lexer, this.p18());
  } else {
    tmp = protoOf(NamedValueDecoder).h14.call(this, tag, inlineDescriptor);
  }
  return tmp;
};
protoOf(AbstractJsonTreeDecoder).h14 = function (tag, inlineDescriptor) {
  return this.i1f((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE(), inlineDescriptor);
};
protoOf(AbstractJsonTreeDecoder).fq = function (descriptor) {
  return !(this.t13() == null) ? protoOf(NamedValueDecoder).fq.call(this, descriptor) : (new JsonPrimitiveDecoder(this.p18(), this.p2(), this.t1e_1)).fq(descriptor);
};
function setForceNull($this, descriptor, index) {
  $this.s1f_1 = (!$this.p18().l16_1.d18_1 && !descriptor.bp(index) && descriptor.ap(index).lo());
  return $this.s1f_1;
}
function JsonTreeDecoder(json, value, polymorphicDiscriminator, polyDescriptor) {
  polymorphicDiscriminator = polymorphicDiscriminator === VOID ? null : polymorphicDiscriminator;
  polyDescriptor = polyDescriptor === VOID ? null : polyDescriptor;
  AbstractJsonTreeDecoder.call(this, json, value, polymorphicDiscriminator);
  this.p1f_1 = value;
  this.q1f_1 = polyDescriptor;
  this.r1f_1 = 0;
  this.s1f_1 = false;
}
protoOf(JsonTreeDecoder).p2 = function () {
  return this.p1f_1;
};
protoOf(JsonTreeDecoder).yq = function (descriptor) {
  $l$loop: while (this.r1f_1 < descriptor.vo()) {
    var _unary__edvuaz = this.r1f_1;
    this.r1f_1 = _unary__edvuaz + 1 | 0;
    var name = this.o13(descriptor, _unary__edvuaz);
    var index = this.r1f_1 - 1 | 0;
    this.s1f_1 = false;
    var tmp;
    // Inline function 'kotlin.collections.contains' call
    // Inline function 'kotlin.collections.containsKey' call
    var this_0 = this.p2();
    if ((isInterface(this_0, KtMap) ? this_0 : THROW_CCE()).j2(name)) {
      tmp = true;
    } else {
      tmp = setForceNull(this, descriptor, index);
    }
    if (tmp) {
      if (!this.u1e_1.f18_1)
        return index;
      var tmp0 = this.p18();
      var tmp$ret$3;
      $l$block_2: {
        // Inline function 'kotlinx.serialization.json.internal.tryCoerceValue' call
        var isOptional = descriptor.bp(index);
        var elementDescriptor = descriptor.ap(index);
        var tmp_0;
        if (isOptional && !elementDescriptor.lo()) {
          var tmp_1 = this.t1f(name);
          tmp_0 = tmp_1 instanceof JsonNull;
        } else {
          tmp_0 = false;
        }
        if (tmp_0) {
          tmp$ret$3 = true;
          break $l$block_2;
        }
        if (equals(elementDescriptor.to(), ENUM_getInstance())) {
          var tmp_2;
          if (elementDescriptor.lo()) {
            var tmp_3 = this.t1f(name);
            tmp_2 = tmp_3 instanceof JsonNull;
          } else {
            tmp_2 = false;
          }
          if (tmp_2) {
            tmp$ret$3 = false;
            break $l$block_2;
          }
          var tmp_4 = this.t1f(name);
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
          var coerceToNull = !tmp0.l16_1.d18_1 && elementDescriptor.lo();
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
protoOf(JsonTreeDecoder).up = function () {
  return !this.s1f_1 && protoOf(AbstractJsonTreeDecoder).up.call(this);
};
protoOf(JsonTreeDecoder).p13 = function (descriptor, index) {
  var strategy = namingStrategy(descriptor, this.p18());
  var baseName = descriptor.xo(index);
  if (strategy == null) {
    if (!this.u1e_1.j18_1)
      return baseName;
    if (this.p2().g2().y1(baseName))
      return baseName;
  }
  var deserializationNamesMap_0 = deserializationNamesMap(this.p18(), descriptor);
  // Inline function 'kotlin.collections.find' call
  var tmp0 = this.p2().g2();
  var tmp$ret$1;
  $l$block: {
    // Inline function 'kotlin.collections.firstOrNull' call
    var _iterator__ex2g4s = tmp0.r();
    while (_iterator__ex2g4s.s()) {
      var element = _iterator__ex2g4s.t();
      if (deserializationNamesMap_0.l2(element) === index) {
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
  var fallbackName = strategy == null ? null : strategy.k1b(descriptor, index, baseName);
  return fallbackName == null ? baseName : fallbackName;
};
protoOf(JsonTreeDecoder).x1e = function (tag) {
  return getValue(this.p2(), tag);
};
protoOf(JsonTreeDecoder).t1f = function (tag) {
  return this.p2().v18(tag);
};
protoOf(JsonTreeDecoder).iq = function (descriptor) {
  if (descriptor === this.q1f_1) {
    var tmp = this.p18();
    var tmp2 = this.w1e();
    // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
    // Inline function 'kotlinx.serialization.json.internal.cast' call
    var serialName = this.q1f_1.so();
    if (!(tmp2 instanceof JsonObject)) {
      var tmp_0 = getKClass(JsonObject).y9();
      var tmp_1 = getKClassFromExpression(tmp2).y9();
      var tmp$ret$0 = this.v13();
      throw JsonDecodingException_0(-1, 'Expected ' + tmp_0 + ', but had ' + tmp_1 + ' as the serialized body of ' + serialName + ' at element: ' + tmp$ret$0, toString(tmp2));
    }
    return new JsonTreeDecoder(tmp, tmp2, this.t1e_1, this.q1f_1);
  }
  return protoOf(AbstractJsonTreeDecoder).iq.call(this, descriptor);
};
protoOf(JsonTreeDecoder).jq = function (descriptor) {
  var tmp;
  if (ignoreUnknownKeys(descriptor, this.p18())) {
    tmp = true;
  } else {
    var tmp_0 = descriptor.to();
    tmp = tmp_0 instanceof PolymorphicKind;
  }
  if (tmp)
    return Unit_instance;
  var strategy = namingStrategy(descriptor, this.p18());
  var tmp_1;
  if (strategy == null && !this.u1e_1.j18_1) {
    tmp_1 = jsonCachedSerialNames(descriptor);
  } else if (!(strategy == null)) {
    tmp_1 = deserializationNamesMap(this.p18(), descriptor).g2();
  } else {
    var tmp_2 = jsonCachedSerialNames(descriptor);
    var tmp0_safe_receiver = get_schemaCache(this.p18()).v1d(descriptor, get_JsonDeserializationNamesKey());
    // Inline function 'kotlin.collections.orEmpty' call
    var tmp0_elvis_lhs = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.g2();
    var tmp$ret$0 = tmp0_elvis_lhs == null ? emptySet() : tmp0_elvis_lhs;
    tmp_1 = plus_0(tmp_2, tmp$ret$0);
  }
  var names = tmp_1;
  var _iterator__ex2g4s = this.p2().g2().r();
  while (_iterator__ex2g4s.s()) {
    var key = _iterator__ex2g4s.t();
    if (!names.y1(key) && !(key === this.t1e_1)) {
      throw JsonDecodingException_1(-1, "Encountered an unknown key '" + key + "' at element: " + this.v13() + '\n' + "Use 'ignoreUnknownKeys = true' in 'Json {}' builder or '@JsonIgnoreUnknownKeys' annotation to ignore unknown keys.\n" + ('JSON input: ' + toString(minify(this.p2().toString()))));
    }
  }
};
function JsonTreeListDecoder(json, value) {
  AbstractJsonTreeDecoder.call(this, json, value);
  this.a1g_1 = value;
  this.b1g_1 = this.a1g_1.u();
  this.c1g_1 = -1;
}
protoOf(JsonTreeListDecoder).p2 = function () {
  return this.a1g_1;
};
protoOf(JsonTreeListDecoder).p13 = function (descriptor, index) {
  return index.toString();
};
protoOf(JsonTreeListDecoder).x1e = function (tag) {
  return this.a1g_1.w(toInt(tag));
};
protoOf(JsonTreeListDecoder).yq = function (descriptor) {
  while (this.c1g_1 < (this.b1g_1 - 1 | 0)) {
    this.c1g_1 = this.c1g_1 + 1 | 0;
    return this.c1g_1;
  }
  return -1;
};
function JsonPrimitiveDecoder(json, value, polymorphicDiscriminator) {
  polymorphicDiscriminator = polymorphicDiscriminator === VOID ? null : polymorphicDiscriminator;
  AbstractJsonTreeDecoder.call(this, json, value, polymorphicDiscriminator);
  this.j1g_1 = value;
  this.i14('primitive');
}
protoOf(JsonPrimitiveDecoder).p2 = function () {
  return this.j1g_1;
};
protoOf(JsonPrimitiveDecoder).yq = function (descriptor) {
  return 0;
};
protoOf(JsonPrimitiveDecoder).x1e = function (tag) {
  // Inline function 'kotlin.require' call
  if (!(tag === 'primitive')) {
    var message = "This input can only handle primitives with 'primitive' tag";
    throw IllegalArgumentException_init_$Create$(toString(message));
  }
  return this.j1g_1;
};
function JsonTreeMapDecoder(json, value) {
  JsonTreeDecoder.call(this, json, value);
  this.u1g_1 = value;
  this.v1g_1 = toList(this.u1g_1.g2());
  this.w1g_1 = imul(this.v1g_1.u(), 2);
  this.x1g_1 = -1;
}
protoOf(JsonTreeMapDecoder).p2 = function () {
  return this.u1g_1;
};
protoOf(JsonTreeMapDecoder).p13 = function (descriptor, index) {
  var i = index / 2 | 0;
  return this.v1g_1.w(i);
};
protoOf(JsonTreeMapDecoder).yq = function (descriptor) {
  while (this.x1g_1 < (this.w1g_1 - 1 | 0)) {
    this.x1g_1 = this.x1g_1 + 1 | 0;
    return this.x1g_1;
  }
  return -1;
};
protoOf(JsonTreeMapDecoder).x1e = function (tag) {
  return (this.x1g_1 % 2 | 0) === 0 ? JsonPrimitive_0(tag) : getValue(this.u1g_1, tag);
};
protoOf(JsonTreeMapDecoder).jq = function (descriptor) {
};
function readPolymorphicJson(_this__u8e3s4, discriminator, element, deserializer) {
  return (new JsonTreeDecoder(_this__u8e3s4, element, discriminator, deserializer.ln())).hq(deserializer);
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
  this.i1e_1 = begin;
  this.j1e_1 = end;
}
function switchMode(_this__u8e3s4, desc) {
  var tmp0_subject = desc.to();
  var tmp;
  if (tmp0_subject instanceof PolymorphicKind) {
    tmp = WriteMode_POLY_OBJ_getInstance();
  } else {
    if (equals(tmp0_subject, LIST_getInstance())) {
      tmp = WriteMode_LIST_getInstance();
    } else {
      if (equals(tmp0_subject, MAP_getInstance())) {
        // Inline function 'kotlinx.serialization.json.internal.selectMapMode' call
        var keyDescriptor = carrierDescriptor(desc.ap(0), _this__u8e3s4.wq());
        var keyKind = keyDescriptor.to();
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
          if (_this__u8e3s4.l16_1.b18_1) {
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
  if (equals(_this__u8e3s4.to(), CONTEXTUAL_getInstance())) {
    var tmp0_safe_receiver = getContextualDescriptor(module_0, _this__u8e3s4);
    var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : carrierDescriptor(tmp0_safe_receiver, module_0);
    tmp = tmp1_elvis_lhs == null ? _this__u8e3s4 : tmp1_elvis_lhs;
  } else if (_this__u8e3s4.uo()) {
    tmp = carrierDescriptor(_this__u8e3s4.ap(0), module_0);
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
  $this.y1g(lastPosition, current);
  return appendEsc($this, current + 1 | 0);
}
function decodedString($this, lastPosition, currentPosition) {
  $this.y1g(lastPosition, currentPosition);
  var result = $this.d17_1.toString();
  $this.d17_1.nb(0);
  return result;
}
function takePeeked($this) {
  // Inline function 'kotlin.also' call
  var this_0 = ensureNotNull($this.c17_1);
  $this.c17_1 = null;
  return this_0;
}
function wasUnquotedString($this) {
  return !(charSequenceGet($this.z1g(), $this.a17_1 - 1 | 0) === _Char___init__impl__6a9atx(34));
}
function appendEsc($this, startPosition) {
  var currentPosition = startPosition;
  currentPosition = $this.a1h(currentPosition);
  if (currentPosition === -1) {
    $this.g1b('Expected escape sequence to continue, got EOF');
  }
  var tmp = $this.z1g();
  var _unary__edvuaz = currentPosition;
  currentPosition = _unary__edvuaz + 1 | 0;
  var currentChar = charSequenceGet(tmp, _unary__edvuaz);
  if (currentChar === _Char___init__impl__6a9atx(117)) {
    return appendHex($this, $this.z1g(), currentPosition);
  }
  // Inline function 'kotlin.code' call
  var tmp$ret$0 = Char__toInt_impl_vasixd(currentChar);
  var c = escapeToChar(tmp$ret$0);
  if (c === _Char___init__impl__6a9atx(0)) {
    $this.g1b("Invalid escaped char '" + toString_1(currentChar) + "'");
  }
  $this.d17_1.t7(c);
  return currentPosition;
}
function appendHex($this, source, startPos) {
  if ((startPos + 4 | 0) >= charSequenceLength(source)) {
    $this.a17_1 = startPos;
    $this.b1h();
    if (($this.a17_1 + 4 | 0) >= charSequenceLength(source)) {
      $this.g1b('Unexpected EOF during unicode escape');
    }
    return appendHex($this, source, $this.a17_1);
  }
  $this.d17_1.t7(numberToChar((((fromHexChar($this, source, startPos) << 12) + (fromHexChar($this, source, startPos + 1 | 0) << 8) | 0) + (fromHexChar($this, source, startPos + 2 | 0) << 4) | 0) + fromHexChar($this, source, startPos + 3 | 0) | 0));
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
    $this.g1b("Invalid toHexChar char '" + toString_1(character) + "' in unicode escape");
  }
  return tmp;
}
function consumeBoolean2($this, start) {
  var current = $this.a1h(start);
  if (current >= charSequenceLength($this.z1g()) || current === -1) {
    $this.g1b('EOF');
  }
  var tmp = $this.z1g();
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
      $this.g1b("Expected valid boolean literal prefix, but had '" + $this.o1c() + "'");
    }
  }
  return tmp_0;
}
function consumeBooleanLiteral($this, literalSuffix, current) {
  if ((charSequenceLength($this.z1g()) - current | 0) < literalSuffix.length) {
    $this.g1b('Unexpected end of boolean literal');
  }
  var inductionVariable = 0;
  var last = charSequenceLength(literalSuffix) - 1 | 0;
  if (inductionVariable <= last)
    do {
      var i = inductionVariable;
      inductionVariable = inductionVariable + 1 | 0;
      var expected = charCodeAt(literalSuffix, i);
      var actual = charSequenceGet($this.z1g(), current + i | 0);
      // Inline function 'kotlin.code' call
      var tmp = Char__toInt_impl_vasixd(expected);
      // Inline function 'kotlin.code' call
      if (!(tmp === (Char__toInt_impl_vasixd(actual) | 32))) {
        $this.g1b("Expected valid boolean literal prefix, but had '" + $this.o1c() + "'");
      }
    }
     while (inductionVariable <= last);
  $this.a17_1 = current + literalSuffix.length | 0;
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
  this.a17_1 = 0;
  this.b17_1 = new JsonPath();
  this.c17_1 = null;
  this.d17_1 = StringBuilder_init_$Create$();
}
protoOf(AbstractJsonLexer).b1h = function () {
};
protoOf(AbstractJsonLexer).y1d = function () {
  var current = this.c1h();
  var source = this.z1g();
  if (current >= charSequenceLength(source) || current === -1)
    return false;
  if (charSequenceGet(source, current) === _Char___init__impl__6a9atx(44)) {
    this.a17_1 = this.a17_1 + 1 | 0;
    return true;
  }
  return false;
};
protoOf(AbstractJsonLexer).d1h = function (c) {
  return c === _Char___init__impl__6a9atx(125) || c === _Char___init__impl__6a9atx(93) || (c === _Char___init__impl__6a9atx(58) || c === _Char___init__impl__6a9atx(44)) ? false : true;
};
protoOf(AbstractJsonLexer).e17 = function () {
  var nextToken = this.q1c();
  if (!(nextToken === 10)) {
    this.g1b('Expected EOF after parsing, but had ' + toString_1(charSequenceGet(this.z1g(), this.a17_1 - 1 | 0)) + ' instead');
  }
};
protoOf(AbstractJsonLexer).k1c = function (expected) {
  var token = this.q1c();
  if (!(token === expected)) {
    // Inline function 'kotlinx.serialization.json.internal.AbstractJsonLexer.fail' call
    var expected_0 = tokenDescription(expected);
    var position = true ? this.a17_1 - 1 | 0 : this.a17_1;
    var s = this.a17_1 === charSequenceLength(this.z1g()) || position < 0 ? 'EOF' : toString_1(charSequenceGet(this.z1g(), position));
    var tmp$ret$0 = 'Expected ' + expected_0 + ", but had '" + s + "' instead";
    this.g1b(tmp$ret$0, position);
  }
  return token;
};
protoOf(AbstractJsonLexer).e1h = function (expected) {
  if (this.a17_1 > 0 && expected === _Char___init__impl__6a9atx(34)) {
    var tmp$ret$1;
    $l$block: {
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonLexer.withPositionRollback' call
      var snapshot = this.a17_1;
      try {
        this.a17_1 = this.a17_1 - 1 | 0;
        tmp$ret$1 = this.o1c();
        break $l$block;
      }finally {
        this.a17_1 = snapshot;
      }
    }
    var inputLiteral = tmp$ret$1;
    if (inputLiteral === 'null') {
      this.f1b("Expected string literal but 'null' literal was found", this.a17_1 - 1 | 0, "Use 'coerceInputValues = true' in 'Json {}' builder to coerce nulls if property has a default value.");
    }
  }
  // Inline function 'kotlinx.serialization.json.internal.AbstractJsonLexer.fail' call
  var expectedToken = charToTokenClass(expected);
  var expected_0 = tokenDescription(expectedToken);
  var position = true ? this.a17_1 - 1 | 0 : this.a17_1;
  var s = this.a17_1 === charSequenceLength(this.z1g()) || position < 0 ? 'EOF' : toString_1(charSequenceGet(this.z1g(), position));
  var tmp$ret$2 = 'Expected ' + expected_0 + ", but had '" + s + "' instead";
  this.g1b(tmp$ret$2, position);
};
protoOf(AbstractJsonLexer).l1c = function () {
  var source = this.z1g();
  var cpos = this.a17_1;
  $l$loop_0: while (true) {
    cpos = this.a1h(cpos);
    if (cpos === -1)
      break $l$loop_0;
    var ch = charSequenceGet(source, cpos);
    if (ch === _Char___init__impl__6a9atx(32) || ch === _Char___init__impl__6a9atx(10) || ch === _Char___init__impl__6a9atx(13) || ch === _Char___init__impl__6a9atx(9)) {
      cpos = cpos + 1 | 0;
      continue $l$loop_0;
    }
    this.a17_1 = cpos;
    return charToTokenClass(ch);
  }
  this.a17_1 = cpos;
  return 10;
};
protoOf(AbstractJsonLexer).z1d = function (doConsume) {
  var current = this.c1h();
  current = this.a1h(current);
  var len = charSequenceLength(this.z1g()) - current | 0;
  if (len < 4 || current === -1)
    return false;
  var inductionVariable = 0;
  if (inductionVariable <= 3)
    do {
      var i = inductionVariable;
      inductionVariable = inductionVariable + 1 | 0;
      if (!(charCodeAt('null', i) === charSequenceGet(this.z1g(), current + i | 0)))
        return false;
    }
     while (inductionVariable <= 3);
  if (len > 4 && charToTokenClass(charSequenceGet(this.z1g(), current + 4 | 0)) === 0)
    return false;
  if (doConsume) {
    this.a17_1 = current + 4 | 0;
  }
  return true;
};
protoOf(AbstractJsonLexer).k1e = function (doConsume, $super) {
  doConsume = doConsume === VOID ? true : doConsume;
  return $super === VOID ? this.z1d(doConsume) : $super.z1d.call(this, doConsume);
};
protoOf(AbstractJsonLexer).a1e = function (isLenient) {
  var token = this.l1c();
  var tmp;
  if (isLenient) {
    if (!(token === 1) && !(token === 0))
      return null;
    tmp = this.o1c();
  } else {
    if (!(token === 1))
      return null;
    tmp = this.n1c();
  }
  var string = tmp;
  this.c17_1 = string;
  return string;
};
protoOf(AbstractJsonLexer).f1h = function () {
  this.c17_1 = null;
};
protoOf(AbstractJsonLexer).ob = function (startPos, endPos) {
  // Inline function 'kotlin.text.substring' call
  var this_0 = this.z1g();
  return toString(charSequenceSubSequence(this_0, startPos, endPos));
};
protoOf(AbstractJsonLexer).n1c = function () {
  if (!(this.c17_1 == null)) {
    return takePeeked(this);
  }
  return this.d1e();
};
protoOf(AbstractJsonLexer).consumeString2 = function (source, startPosition, current) {
  var currentPosition = current;
  var lastPosition = startPosition;
  var char = charSequenceGet(source, currentPosition);
  var usedAppend = false;
  while (!(char === _Char___init__impl__6a9atx(34))) {
    if (char === _Char___init__impl__6a9atx(92)) {
      usedAppend = true;
      currentPosition = this.a1h(appendEscape(this, lastPosition, currentPosition));
      if (currentPosition === -1) {
        this.g1b('Unexpected EOF', currentPosition);
      }
      lastPosition = currentPosition;
    } else {
      currentPosition = currentPosition + 1 | 0;
      if (currentPosition >= charSequenceLength(source)) {
        usedAppend = true;
        this.y1g(lastPosition, currentPosition);
        currentPosition = this.a1h(currentPosition);
        if (currentPosition === -1) {
          this.g1b('Unexpected EOF', currentPosition);
        }
        lastPosition = currentPosition;
      }
    }
    char = charSequenceGet(source, currentPosition);
  }
  var tmp;
  if (!usedAppend) {
    tmp = this.ob(lastPosition, currentPosition);
  } else {
    tmp = decodedString(this, lastPosition, currentPosition);
  }
  var string = tmp;
  this.a17_1 = currentPosition + 1 | 0;
  return string;
};
protoOf(AbstractJsonLexer).e1e = function () {
  var result = this.o1c();
  if (result === 'null' && wasUnquotedString(this)) {
    this.g1b("Unexpected 'null' value instead of string literal");
  }
  return result;
};
protoOf(AbstractJsonLexer).o1c = function () {
  if (!(this.c17_1 == null)) {
    return takePeeked(this);
  }
  var current = this.c1h();
  if (current >= charSequenceLength(this.z1g()) || current === -1) {
    this.g1b('EOF', current);
  }
  var token = charToTokenClass(charSequenceGet(this.z1g(), current));
  if (token === 1) {
    return this.n1c();
  }
  if (!(token === 0)) {
    this.g1b('Expected beginning of the string, but got ' + toString_1(charSequenceGet(this.z1g(), current)));
  }
  var usedAppend = false;
  while (charToTokenClass(charSequenceGet(this.z1g(), current)) === 0) {
    current = current + 1 | 0;
    if (current >= charSequenceLength(this.z1g())) {
      usedAppend = true;
      this.y1g(this.a17_1, current);
      var eof = this.a1h(current);
      if (eof === -1) {
        this.a17_1 = current;
        return decodedString(this, 0, 0);
      } else {
        current = eof;
      }
    }
  }
  var tmp;
  if (!usedAppend) {
    tmp = this.ob(this.a17_1, current);
  } else {
    tmp = decodedString(this, this.a17_1, current);
  }
  var result = tmp;
  this.a17_1 = current;
  return result;
};
protoOf(AbstractJsonLexer).y1g = function (fromIndex, toIndex) {
  this.d17_1.hb(this.z1g(), fromIndex, toIndex);
};
protoOf(AbstractJsonLexer).c1e = function (allowLenientStrings) {
  // Inline function 'kotlin.collections.mutableListOf' call
  var tokenStack = ArrayList_init_$Create$();
  var lastToken = this.l1c();
  if (!(lastToken === 8) && !(lastToken === 6)) {
    this.o1c();
    return Unit_instance;
  }
  $l$loop: while (true) {
    lastToken = this.l1c();
    if (lastToken === 1) {
      if (allowLenientStrings)
        this.o1c();
      else
        this.d1e();
      continue $l$loop;
    }
    var tmp0_subject = lastToken;
    if (tmp0_subject === 8 || tmp0_subject === 6) {
      tokenStack.j(lastToken);
    } else if (tmp0_subject === 9) {
      if (!(last(tokenStack) === 8))
        throw JsonDecodingException_0(this.a17_1, 'found ] instead of } at path: ' + this.b17_1.toString(), this.z1g());
      removeLast(tokenStack);
    } else if (tmp0_subject === 7) {
      if (!(last(tokenStack) === 6))
        throw JsonDecodingException_0(this.a17_1, 'found } instead of ] at path: ' + this.b17_1.toString(), this.z1g());
      removeLast(tokenStack);
    } else if (tmp0_subject === 10) {
      this.g1b('Unexpected end of input due to malformed JSON during ignoring unknown keys');
    }
    this.q1c();
    if (tokenStack.u() === 0)
      return Unit_instance;
  }
};
protoOf(AbstractJsonLexer).toString = function () {
  return "JsonReader(source='" + toString(this.z1g()) + "', currentPosition=" + this.a17_1 + ')';
};
protoOf(AbstractJsonLexer).b1e = function (key) {
  var processed = this.ob(0, this.a17_1);
  var lastIndexOf_0 = lastIndexOf(processed, key);
  throw new JsonDecodingException("Encountered an unknown key '" + key + "' at offset " + lastIndexOf_0 + ' at path: ' + this.b17_1.t1b() + "\nUse 'ignoreUnknownKeys = true' in 'Json {}' builder or '@JsonIgnoreUnknownKeys' annotation to ignore unknown keys.\n" + ('JSON input: ' + toString(minify(this.z1g(), lastIndexOf_0))));
};
protoOf(AbstractJsonLexer).f1b = function (message, position, hint) {
  var tmp;
  // Inline function 'kotlin.text.isEmpty' call
  if (charSequenceLength(hint) === 0) {
    tmp = '';
  } else {
    tmp = '\n' + hint;
  }
  var hintMessage = tmp;
  throw JsonDecodingException_0(position, message + ' at path: ' + this.b17_1.t1b() + hintMessage, this.z1g());
};
protoOf(AbstractJsonLexer).g1b = function (message, position, hint, $super) {
  position = position === VOID ? this.a17_1 : position;
  hint = hint === VOID ? '' : hint;
  return $super === VOID ? this.f1b(message, position, hint) : $super.f1b.call(this, message, position, hint);
};
protoOf(AbstractJsonLexer).m1e = function () {
  var current = this.c1h();
  current = this.a1h(current);
  if (current >= charSequenceLength(this.z1g()) || current === -1) {
    this.g1b('EOF');
  }
  var tmp;
  if (charSequenceGet(this.z1g(), current) === _Char___init__impl__6a9atx(34)) {
    current = current + 1 | 0;
    if (current === charSequenceLength(this.z1g())) {
      this.g1b('EOF');
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
  $l$loop_4: while (!(current === charSequenceLength(this.z1g()))) {
    var ch = charSequenceGet(this.z1g(), current);
    if ((ch === _Char___init__impl__6a9atx(101) || ch === _Char___init__impl__6a9atx(69)) && !hasExponent) {
      if (current === start) {
        this.g1b('Unexpected symbol ' + toString_1(ch) + ' in numeric literal');
      }
      isExponentPositive = true;
      hasExponent = true;
      current = current + 1 | 0;
      continue $l$loop_4;
    }
    if (ch === _Char___init__impl__6a9atx(45) && hasExponent) {
      if (current === start) {
        this.g1b("Unexpected symbol '-' in numeric literal");
      }
      isExponentPositive = false;
      current = current + 1 | 0;
      continue $l$loop_4;
    }
    if (ch === _Char___init__impl__6a9atx(43) && hasExponent) {
      if (current === start) {
        this.g1b("Unexpected symbol '+' in numeric literal");
      }
      isExponentPositive = true;
      current = current + 1 | 0;
      continue $l$loop_4;
    }
    if (ch === _Char___init__impl__6a9atx(45)) {
      if (!(current === start)) {
        this.g1b("Unexpected symbol '-' in numeric literal");
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
      this.g1b("Unexpected symbol '" + toString_1(ch) + "' in numeric literal");
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
      this.g1b('Numeric value overflow');
    }
  }
  var hasChars = !(current === start);
  if (start === current || (isNegative && start === (current - 1 | 0))) {
    this.g1b('Expected numeric literal');
  }
  if (hasQuotation) {
    if (!hasChars) {
      this.g1b('EOF');
    }
    if (!(charSequenceGet(this.z1g(), current) === _Char___init__impl__6a9atx(34))) {
      this.g1b('Expected closing quotation mark');
    }
    current = current + 1 | 0;
  }
  this.a17_1 = current;
  if (hasExponent) {
    var doubleAccumulator = toNumber(accumulator) * consumeNumericLiteral$calculateExponent(exponentAccumulator, isExponentPositive);
    if (doubleAccumulator > toNumber(new Long(-1, 2147483647)) || doubleAccumulator < toNumber(new Long(0, -2147483648))) {
      this.g1b('Numeric value overflow');
    }
    // Inline function 'kotlin.math.floor' call
    if (!(Math.floor(doubleAccumulator) === doubleAccumulator)) {
      this.g1b("Can't convert " + doubleAccumulator + ' to Long');
    }
    accumulator = numberToLong(doubleAccumulator);
  }
  var tmp_0;
  if (isNegative) {
    tmp_0 = accumulator;
  } else if (!equalsLong(accumulator, new Long(0, -2147483648))) {
    tmp_0 = negate(accumulator);
  } else {
    this.g1b('Numeric value overflow');
  }
  return tmp_0;
};
protoOf(AbstractJsonLexer).e19 = function () {
  var result = this.m1e();
  var next = this.q1c();
  if (!(next === 10)) {
    // Inline function 'kotlinx.serialization.json.internal.AbstractJsonLexer.fail' call
    var expected = tokenDescription(10);
    var position = true ? this.a17_1 - 1 | 0 : this.a17_1;
    var s = this.a17_1 === charSequenceLength(this.z1g()) || position < 0 ? 'EOF' : toString_1(charSequenceGet(this.z1g(), position));
    var tmp$ret$0 = "Expected input to contain a single valid number, but got '" + s + "' after it";
    this.g1b(tmp$ret$0, position);
  }
  return result;
};
protoOf(AbstractJsonLexer).l1e = function () {
  var current = this.c1h();
  if (current === charSequenceLength(this.z1g())) {
    this.g1b('EOF');
  }
  var tmp;
  if (charSequenceGet(this.z1g(), current) === _Char___init__impl__6a9atx(34)) {
    current = current + 1 | 0;
    tmp = true;
  } else {
    tmp = false;
  }
  var hasQuotation = tmp;
  var result = consumeBoolean2(this, current);
  if (hasQuotation) {
    if (this.a17_1 === charSequenceLength(this.z1g())) {
      this.g1b('EOF');
    }
    if (!(charSequenceGet(this.z1g(), this.a17_1) === _Char___init__impl__6a9atx(34))) {
      this.g1b('Expected closing quotation mark');
    }
    this.a17_1 = this.a17_1 + 1 | 0;
  }
  return result;
};
function charToTokenClass(c) {
  var tmp;
  // Inline function 'kotlin.code' call
  if (Char__toInt_impl_vasixd(c) < 126) {
    var tmp_0 = CharMappings_getInstance().h1h_1;
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
  return c < 117 ? CharMappings_getInstance().g1h_1[c] : _Char___init__impl__6a9atx(0);
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
    $this.g1h_1[tmp$ret$0] = numberToChar(c);
  }
}
function initC2ESC_0($this, c, esc) {
  // Inline function 'kotlin.code' call
  var tmp$ret$0 = Char__toInt_impl_vasixd(c);
  return initC2ESC($this, tmp$ret$0, esc);
}
function initC2TC($this, c, cl) {
  $this.h1h_1[c] = cl;
}
function initC2TC_0($this, c, cl) {
  // Inline function 'kotlin.code' call
  var tmp$ret$0 = Char__toInt_impl_vasixd(c);
  return initC2TC($this, tmp$ret$0, cl);
}
function CharMappings() {
  CharMappings_instance = this;
  this.g1h_1 = charArray(117);
  this.h1h_1 = new Int8Array(126);
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
protoOf(StringJsonLexerWithComments).q1c = function () {
  var source = this.z1g();
  var cpos = this.c1h();
  if (cpos >= source.length || cpos === -1)
    return 10;
  this.a17_1 = cpos + 1 | 0;
  return charToTokenClass(charCodeAt(source, cpos));
};
protoOf(StringJsonLexerWithComments).m1c = function () {
  var current = this.c1h();
  if (current >= this.z1g().length || current === -1)
    return false;
  return this.d1h(charCodeAt(this.z1g(), current));
};
protoOf(StringJsonLexerWithComments).x1d = function (expected) {
  var source = this.z1g();
  var current = this.c1h();
  if (current >= source.length || current === -1) {
    this.a17_1 = -1;
    this.e1h(expected);
  }
  var c = charCodeAt(source, current);
  this.a17_1 = current + 1 | 0;
  if (c === expected)
    return Unit_instance;
  else {
    this.e1h(expected);
  }
};
protoOf(StringJsonLexerWithComments).l1c = function () {
  var source = this.z1g();
  var cpos = this.c1h();
  if (cpos >= source.length || cpos === -1)
    return 10;
  this.a17_1 = cpos;
  return charToTokenClass(charCodeAt(source, cpos));
};
protoOf(StringJsonLexerWithComments).c1h = function () {
  var current = this.a17_1;
  if (current === -1)
    return current;
  var source = this.z1g();
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
          this.a17_1 = source.length;
          this.g1b('Expected end of the block comment: "*/", but had EOF instead');
        } else {
          current = current + 2 | 0;
        }
        continue $l$loop_1;
      }
    }
    break $l$loop_1;
  }
  this.a17_1 = current;
  return current;
};
function StringJsonLexer(source) {
  AbstractJsonLexer.call(this);
  this.r1h_1 = source;
}
protoOf(StringJsonLexer).z1g = function () {
  return this.r1h_1;
};
protoOf(StringJsonLexer).a1h = function (position) {
  return position < this.z1g().length ? position : -1;
};
protoOf(StringJsonLexer).q1c = function () {
  var source = this.z1g();
  var cpos = this.a17_1;
  $l$loop: while (!(cpos === -1) && cpos < source.length) {
    var _unary__edvuaz = cpos;
    cpos = _unary__edvuaz + 1 | 0;
    var c = charCodeAt(source, _unary__edvuaz);
    // Inline function 'kotlinx.serialization.json.internal.AbstractJsonLexer.isWs' call
    if (c === _Char___init__impl__6a9atx(32) || c === _Char___init__impl__6a9atx(10) || c === _Char___init__impl__6a9atx(13) || c === _Char___init__impl__6a9atx(9))
      continue $l$loop;
    this.a17_1 = cpos;
    return charToTokenClass(c);
  }
  this.a17_1 = source.length;
  return 10;
};
protoOf(StringJsonLexer).m1c = function () {
  var current = this.a17_1;
  if (current === -1)
    return false;
  var source = this.z1g();
  $l$loop: while (current < source.length) {
    var c = charCodeAt(source, current);
    // Inline function 'kotlinx.serialization.json.internal.AbstractJsonLexer.isWs' call
    if (c === _Char___init__impl__6a9atx(32) || c === _Char___init__impl__6a9atx(10) || c === _Char___init__impl__6a9atx(13) || c === _Char___init__impl__6a9atx(9)) {
      current = current + 1 | 0;
      continue $l$loop;
    }
    this.a17_1 = current;
    return this.d1h(c);
  }
  this.a17_1 = current;
  return false;
};
protoOf(StringJsonLexer).c1h = function () {
  var current = this.a17_1;
  if (current === -1)
    return current;
  var source = this.z1g();
  $l$loop: while (current < source.length) {
    var c = charCodeAt(source, current);
    // Inline function 'kotlinx.serialization.json.internal.AbstractJsonLexer.isWs' call
    if (c === _Char___init__impl__6a9atx(32) || c === _Char___init__impl__6a9atx(10) || c === _Char___init__impl__6a9atx(13) || c === _Char___init__impl__6a9atx(9)) {
      current = current + 1 | 0;
    } else {
      break $l$loop;
    }
  }
  this.a17_1 = current;
  return current;
};
protoOf(StringJsonLexer).x1d = function (expected) {
  if (this.a17_1 === -1) {
    this.e1h(expected);
  }
  var source = this.z1g();
  var cpos = this.a17_1;
  $l$loop: while (cpos < source.length) {
    var _unary__edvuaz = cpos;
    cpos = _unary__edvuaz + 1 | 0;
    var c = charCodeAt(source, _unary__edvuaz);
    // Inline function 'kotlinx.serialization.json.internal.AbstractJsonLexer.isWs' call
    if (c === _Char___init__impl__6a9atx(32) || c === _Char___init__impl__6a9atx(10) || c === _Char___init__impl__6a9atx(13) || c === _Char___init__impl__6a9atx(9))
      continue $l$loop;
    this.a17_1 = cpos;
    if (c === expected)
      return Unit_instance;
    this.e1h(expected);
  }
  this.a17_1 = -1;
  this.e1h(expected);
};
protoOf(StringJsonLexer).d1e = function () {
  this.x1d(_Char___init__impl__6a9atx(34));
  var current = this.a17_1;
  var closingQuote = indexOf_0(this.z1g(), _Char___init__impl__6a9atx(34), current);
  if (closingQuote === -1) {
    this.o1c();
    // Inline function 'kotlinx.serialization.json.internal.AbstractJsonLexer.fail' call
    var expected = tokenDescription(1);
    var position = false ? this.a17_1 - 1 | 0 : this.a17_1;
    var s = this.a17_1 === charSequenceLength(this.z1g()) || position < 0 ? 'EOF' : toString_1(charSequenceGet(this.z1g(), position));
    var tmp$ret$0 = 'Expected ' + expected + ", but had '" + s + "' instead";
    this.g1b(tmp$ret$0, position);
  }
  var inductionVariable = current;
  if (inductionVariable < closingQuote)
    do {
      var i = inductionVariable;
      inductionVariable = inductionVariable + 1 | 0;
      if (charCodeAt(this.z1g(), i) === _Char___init__impl__6a9atx(92)) {
        return this.consumeString2(this.z1g(), this.a17_1, i);
      }
    }
     while (inductionVariable < closingQuote);
  this.a17_1 = closingQuote + 1 | 0;
  return substring(this.z1g(), current, closingQuote);
};
protoOf(StringJsonLexer).f1e = function (keyToMatch, isLenient) {
  var positionSnapshot = this.a17_1;
  try {
    if (!(this.q1c() === 6))
      return null;
    var firstKey = this.a1e(isLenient);
    if (!(firstKey === keyToMatch))
      return null;
    this.f1h();
    if (!(this.q1c() === 5))
      return null;
    return this.a1e(isLenient);
  }finally {
    this.a17_1 = positionSnapshot;
    this.f1h();
  }
};
function StringJsonLexer_0(json, source) {
  return !json.l16_1.n18_1 ? new StringJsonLexer(source) : new StringJsonLexerWithComments(source);
}
function get_schemaCache(_this__u8e3s4) {
  return _this__u8e3s4.n16_1;
}
function JsonToStringWriter() {
  this.q16_1 = StringBuilder_init_$Create$_0(128);
}
protoOf(JsonToStringWriter).k1a = function (value) {
  this.q16_1.lb(value);
};
protoOf(JsonToStringWriter).e1a = function (char) {
  this.q16_1.t7(char);
};
protoOf(JsonToStringWriter).g1a = function (text) {
  this.q16_1.s7(text);
};
protoOf(JsonToStringWriter).q1a = function (text) {
  printQuoted(this.q16_1, text);
};
protoOf(JsonToStringWriter).r16 = function () {
  this.q16_1.qb();
};
protoOf(JsonToStringWriter).toString = function () {
  return this.q16_1.toString();
};
function createMapForCache(initialCapacity) {
  return HashMap_init_$Create$(initialCapacity);
}
//region block: post-declaration
protoOf(defer$1).lo = get_isNullable;
protoOf(defer$1).uo = get_isInline;
protoOf(defer$1).wo = get_annotations;
protoOf(JsonSerializersModuleValidator).e16 = contextual;
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
