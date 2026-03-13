import {
  EmptySerializersModule991ju6pz9b79 as EmptySerializersModule,
  Decoder23nde051s631g as Decoder,
  CompositeDecoder2tzm7wpwkr0og as CompositeDecoder,
  SerializerFactory1qv9hivitncuv as SerializerFactory,
  serializer1x79l67jvwntn as serializer,
  InlinePrimitiveDescriptor3i6ccn1a4fw94 as InlinePrimitiveDescriptor,
  SEALED_getInstance1vxvpfzfxmg5m as SEALED_getInstance,
  buildSerialDescriptor2873qmkp8r2ib as buildSerialDescriptor,
  KSerializerzf77vz1967fq as KSerializer,
  STRING_getInstance2dgfp43qdvxn4 as STRING_getInstance,
  ENUM_getInstance2btpo8dvnibj3 as ENUM_getInstance,
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
  SerializationException_init_$Init$34gro45mfrpoa as SerializationException_init_$Init$,
  SerializationException_init_$Create$2gf2fbfh3gfxm as SerializationException_init_$Create$,
  CLASS_getInstance3v12utpo53nyi as CLASS_getInstance,
  LIST_getInstance1utapkkkw66ts as LIST_getInstance,
  CONTEXTUAL_getInstancelbs8qycmp7lg as CONTEXTUAL_getInstance,
  PolymorphicKindla9gurooefwb as PolymorphicKind,
  PrimitiveKindndgbuh6is7ze as PrimitiveKind,
  MAP_getInstanceoecfbvb4e1b6 as MAP_getInstance,
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
  OBJECT_getInstance1yzfkijr6copj as OBJECT_getInstance,
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
  Unit_instance28fytmsmm6r23 as Unit_instance,
  initMetadataForClassbxx6q50dy2s7 as initMetadataForClass,
  toString1pkumu07cwy4m as toString,
  IllegalArgumentException_init_$Create$1j1aj36nbo0wg as IllegalArgumentException_init_$Create$,
  charSequenceLength3278n89t01tmv as charSequenceLength,
  charSequenceGet1vxk1y5n17t1z as charSequenceGet,
  _Char___init__impl__6a9atx1csff5kwtduxl as _Char___init__impl__6a9atx,
  equals2au1ep9vhcato as equals,
  toString30pk9tzaqopn as toString_0,
  Enum3alwj03lh1n41 as Enum,
  initMetadataForInterface1egvbzx539z91 as initMetadataForInterface,
  initMetadataForCompanion1wyw17z38v6ac as initMetadataForCompanion,
  StringBuilder_init_$Create$322n630qt3r8c as StringBuilder_init_$Create$,
  hashCodeq5arwsb9dgti as hashCode,
  joinToString1cxrrlmo0chqs as joinToString,
  THROW_CCE2g6jy02ryeudk as THROW_CCE,
  KtMap140uvy3s5zad8 as KtMap,
  KtList3hktaavzmj137 as KtList,
  getKClassFromExpression348iqjl4fnx2f as getKClassFromExpression,
  getBooleanHashCode1bbj3u6b3v0a7 as getBooleanHashCode,
  getStringHashCode26igk1bx568vk as getStringHashCode,
  toDouble1kn912gjoizjp as toDouble,
  StringCompanionObject_instance3sox3h548pjra as StringCompanionObject_instance,
  noWhenBranchMatchedException2a6r7ubxgky5j as noWhenBranchMatchedException,
  toLongOrNullutqivezb0wx1 as toLongOrNull,
  toULongOrNullojoyxi0i9tgj as toULongOrNull,
  ULong3f9k7s38t3rfp as ULong,
  Companion_getInstance3sq3iu5mj6qnr as Companion_getInstance,
  _ULong___get_data__impl__fggpzb3nuonax14svlz as _ULong___get_data__impl__fggpzb,
  toDoubleOrNullkxwozihadygj as toDoubleOrNull,
  toBooleanStrictOrNull2j0md398tkvbj as toBooleanStrictOrNull,
  isInterface3d6p8outrmvmk as isInterface,
  IllegalStateException_init_$Create$2429fvs1h56dm as IllegalStateException_init_$Create$,
  KProperty1ca4yb4wlo496 as KProperty1,
  getPropertyCallableRef3hckxc0xueiaj as getPropertyCallableRef,
  lazy2hsh8ze7j6ikd as lazy,
  fromInt1lka3ktyu79a4 as fromInt,
  _UInt___init__impl__l7qpdl3eewek7byy9h9 as _UInt___init__impl__l7qpdl,
  UInt__toString_impl_dbgl211y5918yopqyzq as UInt__toString_impl_dbgl21,
  _ULong___init__impl__c78o9k2ace6d5rqjy3k as _ULong___init__impl__c78o9k,
  ULong__toString_impl_f9au7k2d1ziqe8sg5kj as ULong__toString_impl_f9au7k,
  _UByte___init__impl__g9hnc418b8pq346rvu4 as _UByte___init__impl__g9hnc4,
  UByte__toString_impl_v72jg29gpkfdk52uly as UByte__toString_impl_v72jg,
  _UShort___init__impl__jigrne3qim87o3qpsbl as _UShort___init__impl__jigrne,
  UShort__toString_impl_edaoee770kqykt9las as UShort__toString_impl_edaoee,
  captureStack1fzi4aczwc4hg as captureStack,
  charSequenceSubSequence1iwpdba8s3jc7 as charSequenceSubSequence,
  coerceAtLeast2bkz8m9ik7hep as coerceAtLeast,
  coerceAtMost322komnqp70ag as coerceAtMost,
  Collection1k04j3hzsbod0 as Collection,
  LinkedHashMap_init_$Create$3t495nfs82xn as LinkedHashMap_init_$Create$,
  ArrayList_init_$Create$1jemgvhi5v0js as ArrayList_init_$Create$,
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
  _UInt___get_data__impl__f0vqqw3lsr2hwtcnhrf as _UInt___get_data__impl__f0vqqw,
  toULong266mnyksbttkw as toULong,
  toUByteh6p4wmqswkrs as toUByte,
  _UByte___get_data__impl__jof9qrfg5oujomrowy as _UByte___get_data__impl__jof9qr,
  toUShort7yqspfnhrot4 as toUShort,
  _UShort___get_data__impl__g02451ec7jdumy4xob as _UShort___get_data__impl__g0245,
  objectCreate1ve4bgxiu4x98 as objectCreate,
  toString3dhdjl9yf50de as toString_1,
  Companion_getInstance18m03xf6clkk8 as Companion_getInstance_0,
  Companion_getInstance3jsnccejczksw as Companion_getInstance_1,
  Companion_getInstance29d4047m08ot as Companion_getInstance_2,
  setOf45ia9pnfhe90 as setOf,
  Char__toInt_impl_vasixd3jl92hthlhyn7 as Char__toInt_impl_vasixd,
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
  Char__minus_impl_a2frrh1dka2ec6zg6dk as Char__minus_impl_a2frrh,
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
  StringBuilder_init_$Create$39ouzl6b47q8d as StringBuilder_init_$Create$_0,
  HashMap_init_$Create$1du0qgfgs3por as HashMap_init_$Create$,
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
  this.x18_1 = configuration;
  this.y18_1 = serializersModule;
  this.z18_1 = new DescriptorSchemaCache();
}
protoOf(Json).os = function () {
  return this.y18_1;
};
protoOf(Json).a19 = function (serializer, value) {
  var result = new JsonToStringWriter();
  try {
    encodeByWriter(this, result, serializer, value);
    return result.toString();
  }finally {
    result.d19();
  }
};
protoOf(Json).b19 = function (deserializer, string) {
  var lexer = StringJsonLexer_0(this, string);
  var input = new StreamingJsonDecoder(this, WriteMode_OBJ_getInstance(), lexer, deserializer.zo(), null);
  var result = input.zr(deserializer);
  lexer.q19();
  return result;
};
function Json_0(from, builderAction) {
  from = from === VOID ? Default_getInstance() : from;
  var builder = new JsonBuilder(from);
  builderAction(builder);
  var conf = builder.j1a();
  return new JsonImpl(conf, builder.i1a_1);
}
function JsonBuilder(json) {
  this.r19_1 = json.x18_1.k1a_1;
  this.s19_1 = json.x18_1.p1a_1;
  this.t19_1 = json.x18_1.l1a_1;
  this.u19_1 = json.x18_1.m1a_1;
  this.v19_1 = json.x18_1.o1a_1;
  this.w19_1 = json.x18_1.q1a_1;
  this.x19_1 = json.x18_1.r1a_1;
  this.y19_1 = json.x18_1.t1a_1;
  this.z19_1 = json.x18_1.a1b_1;
  this.a1a_1 = json.x18_1.v1a_1;
  this.b1a_1 = json.x18_1.w1a_1;
  this.c1a_1 = json.x18_1.x1a_1;
  this.d1a_1 = json.x18_1.y1a_1;
  this.e1a_1 = json.x18_1.z1a_1;
  this.f1a_1 = json.x18_1.u1a_1;
  this.g1a_1 = json.x18_1.n1a_1;
  this.h1a_1 = json.x18_1.s1a_1;
  this.i1a_1 = json.os();
}
protoOf(JsonBuilder).j1a = function () {
  if (this.h1a_1) {
    // Inline function 'kotlin.require' call
    if (!(this.y19_1 === 'type')) {
      var message = 'Class discriminator should not be specified when array polymorphism is specified';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    // Inline function 'kotlin.require' call
    if (!this.z19_1.equals(ClassDiscriminatorMode_POLYMORPHIC_getInstance())) {
      var message_0 = 'useArrayPolymorphism option can only be used if classDiscriminatorMode in a default POLYMORPHIC state.';
      throw IllegalArgumentException_init_$Create$(toString(message_0));
    }
  }
  if (!this.v19_1) {
    // Inline function 'kotlin.require' call
    if (!(this.w19_1 === '    ')) {
      var message_1 = 'Indent should not be specified when default printing mode is used';
      throw IllegalArgumentException_init_$Create$(toString(message_1));
    }
  } else if (!(this.w19_1 === '    ')) {
    var tmp0 = this.w19_1;
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
      var message_2 = 'Only whitespace, tab, newline and carriage return are allowed as pretty print symbols. Had ' + this.w19_1;
      throw IllegalArgumentException_init_$Create$(toString(message_2));
    }
  }
  return new JsonConfiguration(this.r19_1, this.t19_1, this.u19_1, this.g1a_1, this.v19_1, this.s19_1, this.w19_1, this.x19_1, this.h1a_1, this.y19_1, this.f1a_1, this.a1a_1, this.b1a_1, this.c1a_1, this.d1a_1, this.e1a_1, this.z19_1);
};
function validateConfiguration($this) {
  if (equals($this.os(), EmptySerializersModule()))
    return Unit_instance;
  var collector = new JsonSerializersModuleValidator($this.x18_1);
  $this.os().f18(collector);
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
  this.k1a_1 = encodeDefaults;
  this.l1a_1 = ignoreUnknownKeys;
  this.m1a_1 = isLenient;
  this.n1a_1 = allowStructuredMapKeys;
  this.o1a_1 = prettyPrint;
  this.p1a_1 = explicitNulls;
  this.q1a_1 = prettyPrintIndent;
  this.r1a_1 = coerceInputValues;
  this.s1a_1 = useArrayPolymorphism;
  this.t1a_1 = classDiscriminator;
  this.u1a_1 = allowSpecialFloatingPointValues;
  this.v1a_1 = useAlternativeNames;
  this.w1a_1 = namingStrategy;
  this.x1a_1 = decodeEnumsCaseInsensitive;
  this.y1a_1 = allowTrailingComma;
  this.z1a_1 = allowComments;
  this.a1b_1 = classDiscriminatorMode;
}
protoOf(JsonConfiguration).toString = function () {
  return 'JsonConfiguration(encodeDefaults=' + this.k1a_1 + ', ignoreUnknownKeys=' + this.l1a_1 + ', isLenient=' + this.m1a_1 + ', ' + ('allowStructuredMapKeys=' + this.n1a_1 + ', prettyPrint=' + this.o1a_1 + ', explicitNulls=' + this.p1a_1 + ', ') + ("prettyPrintIndent='" + this.q1a_1 + "', coerceInputValues=" + this.r1a_1 + ', useArrayPolymorphism=' + this.s1a_1 + ', ') + ("classDiscriminator='" + this.t1a_1 + "', allowSpecialFloatingPointValues=" + this.u1a_1 + ', ') + ('useAlternativeNames=' + this.v1a_1 + ', namingStrategy=' + toString_0(this.w1a_1) + ', decodeEnumsCaseInsensitive=' + this.x1a_1 + ', ') + ('allowTrailingComma=' + this.y1a_1 + ', allowComments=' + this.z1a_1 + ', classDiscriminatorMode=' + this.a1b_1.toString() + ')');
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
  return this.e1b();
};
function Companion_1() {
}
var Companion_instance_1;
function Companion_getInstance_5() {
  return Companion_instance_1;
}
function JsonObject$toString$lambda(_destruct__k2r9zo) {
  // Inline function 'kotlin.collections.component1' call
  var k = _destruct__k2r9zo.t1();
  // Inline function 'kotlin.collections.component2' call
  var v = _destruct__k2r9zo.u1();
  // Inline function 'kotlin.text.buildString' call
  // Inline function 'kotlin.apply' call
  var this_0 = StringBuilder_init_$Create$();
  printQuoted(this_0, k);
  this_0.s(_Char___init__impl__6a9atx(58));
  this_0.w(v);
  return this_0.toString();
}
function JsonObject(content) {
  JsonElement.call(this);
  this.f1b_1 = content;
}
protoOf(JsonObject).equals = function (other) {
  return equals(this.f1b_1, other);
};
protoOf(JsonObject).hashCode = function () {
  return hashCode(this.f1b_1);
};
protoOf(JsonObject).toString = function () {
  var tmp = this.f1b_1.s1();
  return joinToString(tmp, ',', '{', '}', VOID, VOID, JsonObject$toString$lambda);
};
protoOf(JsonObject).r = function () {
  return this.f1b_1.r();
};
protoOf(JsonObject).g1b = function (key) {
  return this.f1b_1.b3(key);
};
protoOf(JsonObject).b3 = function (key) {
  if (!(!(key == null) ? typeof key === 'string' : false))
    return false;
  return this.g1b((!(key == null) ? typeof key === 'string' : false) ? key : THROW_CCE());
};
protoOf(JsonObject).h1b = function (key) {
  return this.f1b_1.d3(key);
};
protoOf(JsonObject).d3 = function (key) {
  if (!(!(key == null) ? typeof key === 'string' : false))
    return null;
  return this.h1b((!(key == null) ? typeof key === 'string' : false) ? key : THROW_CCE());
};
protoOf(JsonObject).l1 = function () {
  return this.f1b_1.l1();
};
protoOf(JsonObject).z2 = function () {
  return this.f1b_1.z2();
};
protoOf(JsonObject).a3 = function () {
  return this.f1b_1.a3();
};
protoOf(JsonObject).s1 = function () {
  return this.f1b_1.s1();
};
function Companion_2() {
}
var Companion_instance_2;
function Companion_getInstance_6() {
  return Companion_instance_2;
}
function JsonArray(content) {
  JsonElement.call(this);
  this.i1b_1 = content;
}
protoOf(JsonArray).equals = function (other) {
  return equals(this.i1b_1, other);
};
protoOf(JsonArray).hashCode = function () {
  return hashCode(this.i1b_1);
};
protoOf(JsonArray).toString = function () {
  return joinToString(this.i1b_1, ',', '[', ']');
};
protoOf(JsonArray).r = function () {
  return this.i1b_1.r();
};
protoOf(JsonArray).j1b = function (element) {
  return this.i1b_1.r2(element);
};
protoOf(JsonArray).r2 = function (element) {
  if (!(element instanceof JsonElement))
    return false;
  return this.j1b(element instanceof JsonElement ? element : THROW_CCE());
};
protoOf(JsonArray).t = function () {
  return this.i1b_1.t();
};
protoOf(JsonArray).k1b = function (elements) {
  return this.i1b_1.s2(elements);
};
protoOf(JsonArray).s2 = function (elements) {
  return this.k1b(elements);
};
protoOf(JsonArray).m1 = function (index) {
  return this.i1b_1.m1(index);
};
protoOf(JsonArray).l1b = function (element) {
  return this.i1b_1.t2(element);
};
protoOf(JsonArray).t2 = function (element) {
  if (!(element instanceof JsonElement))
    return -1;
  return this.l1b(element instanceof JsonElement ? element : THROW_CCE());
};
protoOf(JsonArray).n1 = function (index) {
  return this.i1b_1.n1(index);
};
protoOf(JsonArray).u2 = function (fromIndex, toIndex) {
  return this.i1b_1.u2(fromIndex, toIndex);
};
protoOf(JsonArray).l1 = function () {
  return this.i1b_1.l1();
};
function JsonNull() {
  JsonNull_instance = this;
  JsonPrimitive.call(this);
  this.m1b_1 = 'null';
}
protoOf(JsonNull).d1b = function () {
  return false;
};
protoOf(JsonNull).e1b = function () {
  return this.m1b_1;
};
protoOf(JsonNull).n1b = function () {
  return JsonNullSerializer_getInstance();
};
protoOf(JsonNull).m10 = function (typeParamsSerializers) {
  return this.n1b();
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
  this.o1b_1 = isString;
  this.p1b_1 = coerceToInlineType;
  this.q1b_1 = toString(body);
  if (!(this.p1b_1 == null)) {
    // Inline function 'kotlin.require' call
    // Inline function 'kotlin.require' call
    if (!this.p1b_1.iq()) {
      var message = 'Failed requirement.';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
  }
}
protoOf(JsonLiteral).d1b = function () {
  return this.o1b_1;
};
protoOf(JsonLiteral).e1b = function () {
  return this.q1b_1;
};
protoOf(JsonLiteral).toString = function () {
  var tmp;
  if (this.o1b_1) {
    // Inline function 'kotlin.text.buildString' call
    // Inline function 'kotlin.apply' call
    var this_0 = StringBuilder_init_$Create$();
    printQuoted(this_0, this.q1b_1);
    tmp = this_0.toString();
  } else {
    tmp = this.q1b_1;
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
  if (!(this.o1b_1 === other.o1b_1))
    return false;
  if (!(this.q1b_1 === other.q1b_1))
    return false;
  return true;
};
protoOf(JsonLiteral).hashCode = function () {
  var result = getBooleanHashCode(this.o1b_1);
  result = imul(31, result) + getStringHashCode(this.q1b_1) | 0;
  return result;
};
function get_booleanOrNull(_this__u8e3s4) {
  _init_properties_JsonElement_kt__7cbdc2();
  return toBooleanStrictOrNull_0(_this__u8e3s4.e1b());
}
function parseLongImpl(_this__u8e3s4) {
  _init_properties_JsonElement_kt__7cbdc2();
  return (new StringJsonLexer(_this__u8e3s4.e1b())).r1b();
}
function get_float(_this__u8e3s4) {
  _init_properties_JsonElement_kt__7cbdc2();
  // Inline function 'kotlin.text.toFloat' call
  var this_0 = _this__u8e3s4.e1b();
  // Inline function 'kotlin.js.unsafeCast' call
  // Inline function 'kotlin.js.asDynamic' call
  return toDouble(this_0);
}
function get_double(_this__u8e3s4) {
  _init_properties_JsonElement_kt__7cbdc2();
  return toDouble(_this__u8e3s4.e1b());
}
function get_contentOrNull(_this__u8e3s4) {
  _init_properties_JsonElement_kt__7cbdc2();
  var tmp;
  if (_this__u8e3s4 instanceof JsonNull) {
    tmp = null;
  } else {
    tmp = _this__u8e3s4.e1b();
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
  $this$buildSerialDescriptor.np('JsonPrimitive', defer(JsonElementSerializer$descriptor$lambda$lambda));
  $this$buildSerialDescriptor.np('JsonNull', defer(JsonElementSerializer$descriptor$lambda$lambda_0));
  $this$buildSerialDescriptor.np('JsonLiteral', defer(JsonElementSerializer$descriptor$lambda$lambda_1));
  $this$buildSerialDescriptor.np('JsonObject', defer(JsonElementSerializer$descriptor$lambda$lambda_2));
  $this$buildSerialDescriptor.np('JsonArray', defer(JsonElementSerializer$descriptor$lambda$lambda_3));
  return Unit_instance;
}
function JsonElementSerializer$descriptor$lambda$lambda() {
  return JsonPrimitiveSerializer_getInstance().s1b_1;
}
function JsonElementSerializer$descriptor$lambda$lambda_0() {
  return JsonNullSerializer_getInstance().t1b_1;
}
function JsonElementSerializer$descriptor$lambda$lambda_1() {
  return JsonLiteralSerializer_getInstance().u1b_1;
}
function JsonElementSerializer$descriptor$lambda$lambda_2() {
  return JsonObjectSerializer_getInstance().v1b_1;
}
function JsonElementSerializer$descriptor$lambda$lambda_3() {
  return JsonArraySerializer_getInstance().w1b_1;
}
function JsonElementSerializer() {
  JsonElementSerializer_instance = this;
  var tmp = this;
  var tmp_0 = SEALED_getInstance();
  tmp.x1b_1 = buildSerialDescriptor('kotlinx.serialization.json.JsonElement', tmp_0, [], JsonElementSerializer$descriptor$lambda);
}
protoOf(JsonElementSerializer).zo = function () {
  return this.x1b_1;
};
protoOf(JsonElementSerializer).y1b = function (encoder, value) {
  verify(encoder);
  if (value instanceof JsonPrimitive) {
    encoder.rt(JsonPrimitiveSerializer_getInstance(), value);
  } else {
    if (value instanceof JsonObject) {
      encoder.rt(JsonObjectSerializer_getInstance(), value);
    } else {
      if (value instanceof JsonArray) {
        encoder.rt(JsonArraySerializer_getInstance(), value);
      } else {
        noWhenBranchMatchedException();
      }
    }
  }
};
protoOf(JsonElementSerializer).ap = function (encoder, value) {
  return this.y1b(encoder, value instanceof JsonElement ? value : THROW_CCE());
};
protoOf(JsonElementSerializer).bp = function (decoder) {
  var input = asJsonDecoder(decoder);
  return input.c1b();
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
  this.s1b_1 = buildSerialDescriptor('kotlinx.serialization.json.JsonPrimitive', STRING_getInstance(), []);
}
protoOf(JsonPrimitiveSerializer).zo = function () {
  return this.s1b_1;
};
protoOf(JsonPrimitiveSerializer).z1b = function (encoder, value) {
  verify(encoder);
  var tmp;
  if (value instanceof JsonNull) {
    encoder.rt(JsonNullSerializer_getInstance(), JsonNull_getInstance());
    tmp = Unit_instance;
  } else {
    var tmp_0 = JsonLiteralSerializer_getInstance();
    encoder.rt(tmp_0, value instanceof JsonLiteral ? value : THROW_CCE());
    tmp = Unit_instance;
  }
  return tmp;
};
protoOf(JsonPrimitiveSerializer).ap = function (encoder, value) {
  return this.z1b(encoder, value instanceof JsonPrimitive ? value : THROW_CCE());
};
protoOf(JsonPrimitiveSerializer).bp = function (decoder) {
  var result = asJsonDecoder(decoder).c1b();
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
  this.t1b_1 = buildSerialDescriptor('kotlinx.serialization.json.JsonNull', ENUM_getInstance(), []);
}
protoOf(JsonNullSerializer).zo = function () {
  return this.t1b_1;
};
protoOf(JsonNullSerializer).a1c = function (encoder, value) {
  verify(encoder);
  encoder.us();
};
protoOf(JsonNullSerializer).ap = function (encoder, value) {
  return this.a1c(encoder, value instanceof JsonNull ? value : THROW_CCE());
};
protoOf(JsonNullSerializer).bp = function (decoder) {
  verify_0(decoder);
  if (decoder.lr()) {
    throw new JsonDecodingException("Expected 'null' literal");
  }
  decoder.mr();
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
  this.u1b_1 = PrimitiveSerialDescriptor('kotlinx.serialization.json.JsonLiteral', STRING_getInstance());
}
protoOf(JsonLiteralSerializer).zo = function () {
  return this.u1b_1;
};
protoOf(JsonLiteralSerializer).b1c = function (encoder, value) {
  verify(encoder);
  if (value.o1b_1) {
    return encoder.dt(value.q1b_1);
  }
  if (!(value.p1b_1 == null)) {
    return encoder.ft(value.p1b_1).dt(value.q1b_1);
  }
  var tmp0_safe_receiver = toLongOrNull(value.q1b_1);
  if (tmp0_safe_receiver == null)
    null;
  else {
    // Inline function 'kotlin.let' call
    return encoder.zs(tmp0_safe_receiver);
  }
  var tmp1_safe_receiver = toULongOrNull(value.q1b_1);
  var tmp = tmp1_safe_receiver;
  if ((tmp == null ? null : new ULong(tmp)) == null)
    null;
  else {
    var tmp_0 = tmp1_safe_receiver;
    // Inline function 'kotlin.let' call
    var it = (tmp_0 == null ? null : new ULong(tmp_0)).e2_1;
    var tmp_1 = encoder.ft(serializer_0(Companion_getInstance()).zo());
    // Inline function 'kotlin.ULong.toLong' call
    var tmp$ret$1 = _ULong___get_data__impl__fggpzb(it);
    tmp_1.zs(tmp$ret$1);
    return Unit_instance;
  }
  var tmp2_safe_receiver = toDoubleOrNull(value.q1b_1);
  if (tmp2_safe_receiver == null)
    null;
  else {
    // Inline function 'kotlin.let' call
    return encoder.bt(tmp2_safe_receiver);
  }
  var tmp3_safe_receiver = toBooleanStrictOrNull(value.q1b_1);
  if (tmp3_safe_receiver == null)
    null;
  else {
    // Inline function 'kotlin.let' call
    return encoder.vs(tmp3_safe_receiver);
  }
  encoder.dt(value.q1b_1);
};
protoOf(JsonLiteralSerializer).ap = function (encoder, value) {
  return this.b1c(encoder, value instanceof JsonLiteral ? value : THROW_CCE());
};
protoOf(JsonLiteralSerializer).bp = function (decoder) {
  var result = asJsonDecoder(decoder).c1b();
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
  this.c1c_1 = MapSerializer(serializer(StringCompanionObject_instance), JsonElementSerializer_getInstance()).zo();
  this.d1c_1 = 'kotlinx.serialization.json.JsonObject';
}
protoOf(JsonObjectDescriptor).gq = function () {
  return this.d1c_1;
};
protoOf(JsonObjectDescriptor).lq = function (index) {
  return this.c1c_1.lq(index);
};
protoOf(JsonObjectDescriptor).mq = function (name) {
  return this.c1c_1.mq(name);
};
protoOf(JsonObjectDescriptor).nq = function (index) {
  return this.c1c_1.nq(index);
};
protoOf(JsonObjectDescriptor).oq = function (index) {
  return this.c1c_1.oq(index);
};
protoOf(JsonObjectDescriptor).pq = function (index) {
  return this.c1c_1.pq(index);
};
protoOf(JsonObjectDescriptor).hq = function () {
  return this.c1c_1.hq();
};
protoOf(JsonObjectDescriptor).zp = function () {
  return this.c1c_1.zp();
};
protoOf(JsonObjectDescriptor).iq = function () {
  return this.c1c_1.iq();
};
protoOf(JsonObjectDescriptor).jq = function () {
  return this.c1c_1.jq();
};
protoOf(JsonObjectDescriptor).kq = function () {
  return this.c1c_1.kq();
};
var JsonObjectDescriptor_instance;
function JsonObjectDescriptor_getInstance() {
  if (JsonObjectDescriptor_instance == null)
    new JsonObjectDescriptor();
  return JsonObjectDescriptor_instance;
}
function JsonObjectSerializer() {
  JsonObjectSerializer_instance = this;
  this.v1b_1 = JsonObjectDescriptor_getInstance();
}
protoOf(JsonObjectSerializer).zo = function () {
  return this.v1b_1;
};
protoOf(JsonObjectSerializer).e1c = function (encoder, value) {
  verify(encoder);
  MapSerializer(serializer(StringCompanionObject_instance), JsonElementSerializer_getInstance()).ap(encoder, value);
};
protoOf(JsonObjectSerializer).ap = function (encoder, value) {
  return this.e1c(encoder, value instanceof JsonObject ? value : THROW_CCE());
};
protoOf(JsonObjectSerializer).bp = function (decoder) {
  verify_0(decoder);
  return new JsonObject(MapSerializer(serializer(StringCompanionObject_instance), JsonElementSerializer_getInstance()).bp(decoder));
};
var JsonObjectSerializer_instance;
function JsonObjectSerializer_getInstance() {
  if (JsonObjectSerializer_instance == null)
    new JsonObjectSerializer();
  return JsonObjectSerializer_instance;
}
function JsonArrayDescriptor() {
  JsonArrayDescriptor_instance = this;
  this.f1c_1 = ListSerializer(JsonElementSerializer_getInstance()).zo();
  this.g1c_1 = 'kotlinx.serialization.json.JsonArray';
}
protoOf(JsonArrayDescriptor).gq = function () {
  return this.g1c_1;
};
protoOf(JsonArrayDescriptor).lq = function (index) {
  return this.f1c_1.lq(index);
};
protoOf(JsonArrayDescriptor).mq = function (name) {
  return this.f1c_1.mq(name);
};
protoOf(JsonArrayDescriptor).nq = function (index) {
  return this.f1c_1.nq(index);
};
protoOf(JsonArrayDescriptor).oq = function (index) {
  return this.f1c_1.oq(index);
};
protoOf(JsonArrayDescriptor).pq = function (index) {
  return this.f1c_1.pq(index);
};
protoOf(JsonArrayDescriptor).hq = function () {
  return this.f1c_1.hq();
};
protoOf(JsonArrayDescriptor).zp = function () {
  return this.f1c_1.zp();
};
protoOf(JsonArrayDescriptor).iq = function () {
  return this.f1c_1.iq();
};
protoOf(JsonArrayDescriptor).jq = function () {
  return this.f1c_1.jq();
};
protoOf(JsonArrayDescriptor).kq = function () {
  return this.f1c_1.kq();
};
var JsonArrayDescriptor_instance;
function JsonArrayDescriptor_getInstance() {
  if (JsonArrayDescriptor_instance == null)
    new JsonArrayDescriptor();
  return JsonArrayDescriptor_instance;
}
function JsonArraySerializer() {
  JsonArraySerializer_instance = this;
  this.w1b_1 = JsonArrayDescriptor_getInstance();
}
protoOf(JsonArraySerializer).zo = function () {
  return this.w1b_1;
};
protoOf(JsonArraySerializer).h1c = function (encoder, value) {
  verify(encoder);
  ListSerializer(JsonElementSerializer_getInstance()).ap(encoder, value);
};
protoOf(JsonArraySerializer).ap = function (encoder, value) {
  return this.h1c(encoder, value instanceof JsonArray ? value : THROW_CCE());
};
protoOf(JsonArraySerializer).bp = function (decoder) {
  verify_0(decoder);
  return new JsonArray(ListSerializer(JsonElementSerializer_getInstance()).bp(decoder));
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
  var tmp0 = $this.i1c_1;
  var tmp = KProperty1;
  // Inline function 'kotlin.getValue' call
  getPropertyCallableRef('original', 1, tmp, defer$o$_get_original_$ref_3cje7k(), null);
  return tmp0.u1();
}
function defer$o$_get_original_$ref_3cje7k() {
  return function (p0) {
    return _get_original__l7ku1m(p0);
  };
}
function defer$1($deferred) {
  this.i1c_1 = lazy($deferred);
}
protoOf(defer$1).gq = function () {
  return _get_original__l7ku1m(this).gq();
};
protoOf(defer$1).hq = function () {
  return _get_original__l7ku1m(this).hq();
};
protoOf(defer$1).jq = function () {
  return _get_original__l7ku1m(this).jq();
};
protoOf(defer$1).lq = function (index) {
  return _get_original__l7ku1m(this).lq(index);
};
protoOf(defer$1).mq = function (name) {
  return _get_original__l7ku1m(this).mq(name);
};
protoOf(defer$1).nq = function (index) {
  return _get_original__l7ku1m(this).nq(index);
};
protoOf(defer$1).oq = function (index) {
  return _get_original__l7ku1m(this).oq(index);
};
protoOf(defer$1).pq = function (index) {
  return _get_original__l7ku1m(this).pq(index);
};
function JsonEncoder() {
}
function Composer(writer) {
  this.j1c_1 = writer;
  this.k1c_1 = true;
}
protoOf(Composer).l1c = function () {
  this.k1c_1 = true;
};
protoOf(Composer).m1c = function () {
  return Unit_instance;
};
protoOf(Composer).n1c = function () {
  this.k1c_1 = false;
};
protoOf(Composer).o1c = function () {
  this.k1c_1 = false;
};
protoOf(Composer).p1c = function () {
  return Unit_instance;
};
protoOf(Composer).q1c = function (v) {
  return this.j1c_1.r1c(v);
};
protoOf(Composer).s1c = function (v) {
  return this.j1c_1.t1c(v);
};
protoOf(Composer).u1c = function (v) {
  return this.j1c_1.t1c(v.toString());
};
protoOf(Composer).v1c = function (v) {
  return this.j1c_1.t1c(v.toString());
};
protoOf(Composer).w1c = function (v) {
  return this.j1c_1.x1c(fromInt(v));
};
protoOf(Composer).y1c = function (v) {
  return this.j1c_1.x1c(fromInt(v));
};
protoOf(Composer).z1c = function (v) {
  return this.j1c_1.x1c(fromInt(v));
};
protoOf(Composer).a1d = function (v) {
  return this.j1c_1.x1c(v);
};
protoOf(Composer).b1d = function (v) {
  return this.j1c_1.t1c(v.toString());
};
protoOf(Composer).c1d = function (value) {
  return this.j1c_1.d1d(value);
};
function Composer_0(sb, json) {
  return json.x18_1.o1a_1 ? new ComposerWithPrettyPrint(sb, json) : new Composer(sb);
}
function ComposerForUnsignedNumbers(writer, forceQuoting) {
  Composer.call(this, writer);
  this.g1d_1 = forceQuoting;
}
protoOf(ComposerForUnsignedNumbers).z1c = function (v) {
  if (this.g1d_1) {
    // Inline function 'kotlin.toUInt' call
    var tmp$ret$0 = _UInt___init__impl__l7qpdl(v);
    this.c1d(UInt__toString_impl_dbgl21(tmp$ret$0));
  } else {
    // Inline function 'kotlin.toUInt' call
    var tmp$ret$1 = _UInt___init__impl__l7qpdl(v);
    this.s1c(UInt__toString_impl_dbgl21(tmp$ret$1));
  }
};
protoOf(ComposerForUnsignedNumbers).a1d = function (v) {
  if (this.g1d_1) {
    // Inline function 'kotlin.toULong' call
    var tmp$ret$0 = _ULong___init__impl__c78o9k(v);
    this.c1d(ULong__toString_impl_f9au7k(tmp$ret$0));
  } else {
    // Inline function 'kotlin.toULong' call
    var tmp$ret$1 = _ULong___init__impl__c78o9k(v);
    this.s1c(ULong__toString_impl_f9au7k(tmp$ret$1));
  }
};
protoOf(ComposerForUnsignedNumbers).w1c = function (v) {
  if (this.g1d_1) {
    // Inline function 'kotlin.toUByte' call
    var tmp$ret$0 = _UByte___init__impl__g9hnc4(v);
    this.c1d(UByte__toString_impl_v72jg(tmp$ret$0));
  } else {
    // Inline function 'kotlin.toUByte' call
    var tmp$ret$1 = _UByte___init__impl__g9hnc4(v);
    this.s1c(UByte__toString_impl_v72jg(tmp$ret$1));
  }
};
protoOf(ComposerForUnsignedNumbers).y1c = function (v) {
  if (this.g1d_1) {
    // Inline function 'kotlin.toUShort' call
    var tmp$ret$0 = _UShort___init__impl__jigrne(v);
    this.c1d(UShort__toString_impl_edaoee(tmp$ret$0));
  } else {
    // Inline function 'kotlin.toUShort' call
    var tmp$ret$1 = _UShort___init__impl__jigrne(v);
    this.s1c(UShort__toString_impl_edaoee(tmp$ret$1));
  }
};
function ComposerForUnquotedLiterals(writer, forceQuoting) {
  Composer.call(this, writer);
  this.j1d_1 = forceQuoting;
}
protoOf(ComposerForUnquotedLiterals).c1d = function (value) {
  if (this.j1d_1) {
    protoOf(Composer).c1d.call(this, value);
  } else {
    protoOf(Composer).s1c.call(this, value);
  }
};
function ComposerWithPrettyPrint(writer, json) {
  Composer.call(this, writer);
  this.m1d_1 = json;
  this.n1d_1 = 0;
}
protoOf(ComposerWithPrettyPrint).l1c = function () {
  this.k1c_1 = true;
  this.n1d_1 = this.n1d_1 + 1 | 0;
};
protoOf(ComposerWithPrettyPrint).m1c = function () {
  this.n1d_1 = this.n1d_1 - 1 | 0;
};
protoOf(ComposerWithPrettyPrint).n1c = function () {
  this.k1c_1 = false;
  this.s1c('\n');
  // Inline function 'kotlin.repeat' call
  var times = this.n1d_1;
  var inductionVariable = 0;
  if (inductionVariable < times)
    do {
      var index = inductionVariable;
      inductionVariable = inductionVariable + 1 | 0;
      this.s1c(this.m1d_1.x18_1.q1a_1);
    }
     while (inductionVariable < times);
};
protoOf(ComposerWithPrettyPrint).o1c = function () {
  if (this.k1c_1)
    this.k1c_1 = false;
  else {
    this.n1c();
  }
};
protoOf(ComposerWithPrettyPrint).p1c = function () {
  this.q1c(_Char___init__impl__6a9atx(32));
};
function readIfAbsent($this, descriptor, index) {
  $this.p1d_1 = (!descriptor.pq(index) && descriptor.oq(index).zp());
  return $this.p1d_1;
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
  tmp.o1d_1 = new ElementMarker(descriptor, JsonElementMarker$readIfAbsent$ref(this));
  this.p1d_1 = false;
}
protoOf(JsonElementMarker).q1d = function (index) {
  this.o1d_1.ey(index);
};
protoOf(JsonElementMarker).r1d = function () {
  return this.o1d_1.fy();
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
  _this__u8e3s4.s1d('Trailing comma before the end of JSON ' + entity, _this__u8e3s4.m19_1 - 1 | 0, "Trailing commas are non-complaint JSON and not allowed by default. Use 'allowTrailingComma = true' in 'Json {}' builder to support them.");
}
function throwInvalidFloatingPointDecoded(_this__u8e3s4, result) {
  _this__u8e3s4.t1d('Unexpected special floating-point value ' + toString(result) + '. By default, ' + 'non-finite floating point values are prohibited because they do not conform JSON specification', VOID, "It is possible to deserialize them using 'JsonBuilder.allowSpecialFloatingPointValues = true'");
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
  return new JsonEncodingException("Value of type '" + keyDescriptor.gq() + "' can't be used in JSON as a key in the map. " + ("It should have either primitive or enum kind, but its kind is '" + keyDescriptor.hq().toString() + "'.\n") + "Use 'allowStructuredMapKeys = true' in 'Json {}' builder to convert such maps to [key1, value1, key2, value2,...] arrays.");
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
  if (json.x18_1.l1a_1) {
    tmp = true;
  } else {
    var tmp0 = _this__u8e3s4.kq();
    var tmp$ret$0;
    $l$block_0: {
      // Inline function 'kotlin.collections.any' call
      var tmp_0;
      if (isInterface(tmp0, Collection)) {
        tmp_0 = tmp0.r();
      } else {
        tmp_0 = false;
      }
      if (tmp_0) {
        tmp$ret$0 = false;
        break $l$block_0;
      }
      var _iterator__ex2g4s = tmp0.t();
      while (_iterator__ex2g4s.u()) {
        var element = _iterator__ex2g4s.v();
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
  var index = _this__u8e3s4.mq(name);
  if (!(index === -3))
    return index;
  if (!json.x18_1.v1a_1)
    return index;
  return getJsonNameIndexSlowPath(_this__u8e3s4, json, name);
}
function getJsonNameIndexOrThrow(_this__u8e3s4, json, name, suffix) {
  suffix = suffix === VOID ? '' : suffix;
  _init_properties_JsonNamesMap_kt__cbbp0k();
  var index = getJsonNameIndex(_this__u8e3s4, json, name);
  if (index === -3)
    throw SerializationException_init_$Create$(_this__u8e3s4.gq() + " does not contain element with name '" + name + "'" + suffix);
  return index;
}
function getJsonElementName(_this__u8e3s4, json, index) {
  _init_properties_JsonNamesMap_kt__cbbp0k();
  var strategy = namingStrategy(_this__u8e3s4, json);
  return strategy == null ? _this__u8e3s4.lq(index) : serializationNamesIndices(_this__u8e3s4, json, strategy)[index];
}
function namingStrategy(_this__u8e3s4, json) {
  _init_properties_JsonNamesMap_kt__cbbp0k();
  return equals(_this__u8e3s4.hq(), CLASS_getInstance()) ? json.x18_1.w1a_1 : null;
}
function deserializationNamesMap(_this__u8e3s4, descriptor) {
  _init_properties_JsonNamesMap_kt__cbbp0k();
  var tmp = get_schemaCache(_this__u8e3s4);
  var tmp_0 = get_JsonDeserializationNamesKey();
  return tmp.v1d(descriptor, tmp_0, deserializationNamesMap$lambda(descriptor, _this__u8e3s4));
}
function decodeCaseInsensitive(_this__u8e3s4, descriptor) {
  _init_properties_JsonNamesMap_kt__cbbp0k();
  return _this__u8e3s4.x18_1.x1a_1 && equals(descriptor.hq(), ENUM_getInstance());
}
function getJsonNameIndexSlowPath(_this__u8e3s4, json, name) {
  _init_properties_JsonNamesMap_kt__cbbp0k();
  var tmp0_elvis_lhs = deserializationNamesMap(json, _this__u8e3s4).d3(name);
  return tmp0_elvis_lhs == null ? -3 : tmp0_elvis_lhs;
}
function serializationNamesIndices(_this__u8e3s4, json, strategy) {
  _init_properties_JsonNamesMap_kt__cbbp0k();
  var tmp = get_schemaCache(json);
  var tmp_0 = get_JsonSerializationNamesKey();
  return tmp.v1d(_this__u8e3s4, tmp_0, serializationNamesIndices$lambda(_this__u8e3s4, strategy));
}
function buildDeserializationNamesMap(_this__u8e3s4, json) {
  _init_properties_JsonNamesMap_kt__cbbp0k();
  // Inline function 'kotlin.collections.mutableMapOf' call
  var builder = LinkedHashMap_init_$Create$();
  var useLowercaseEnums = decodeCaseInsensitive(json, _this__u8e3s4);
  var strategyForClasses = namingStrategy(_this__u8e3s4, json);
  var inductionVariable = 0;
  var last = _this__u8e3s4.jq();
  if (inductionVariable < last)
    do {
      var i = inductionVariable;
      inductionVariable = inductionVariable + 1 | 0;
      // Inline function 'kotlin.collections.filterIsInstance' call
      var tmp0 = _this__u8e3s4.nq(i);
      // Inline function 'kotlin.collections.filterIsInstanceTo' call
      var destination = ArrayList_init_$Create$();
      var _iterator__ex2g4s = tmp0.t();
      while (_iterator__ex2g4s.u()) {
        var element = _iterator__ex2g4s.v();
        if (element instanceof JsonNames) {
          destination.b1(element);
        }
      }
      var tmp0_safe_receiver = singleOrNull(destination);
      var tmp1_safe_receiver = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.w1d_1;
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
        tmp_0 = _this__u8e3s4.lq(i).toLowerCase();
      } else if (!(strategyForClasses == null)) {
        tmp_0 = strategyForClasses.x1d(_this__u8e3s4, i, _this__u8e3s4.lq(i));
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
  if (builder.r()) {
    tmp_1 = emptyMap();
  } else {
    tmp_1 = builder;
  }
  return tmp_1;
}
function deserializationNamesMap$lambda($descriptor, $this_deserializationNamesMap) {
  return function () {
    return buildDeserializationNamesMap($descriptor, $this_deserializationNamesMap);
  };
}
function serializationNamesIndices$lambda($this_serializationNamesIndices, $strategy) {
  return function () {
    var tmp = 0;
    var tmp_0 = $this_serializationNamesIndices.jq();
    // Inline function 'kotlin.arrayOfNulls' call
    var tmp_1 = Array(tmp_0);
    while (tmp < tmp_0) {
      var tmp_2 = tmp;
      var baseName = $this_serializationNamesIndices.lq(tmp_2);
      tmp_1[tmp_2] = $strategy.x1d($this_serializationNamesIndices, tmp_2, baseName);
      tmp = tmp + 1 | 0;
    }
    return tmp_1;
  };
}
function buildDeserializationNamesMap$putOrThrow(_this__u8e3s4, $this_buildDeserializationNamesMap, name, index) {
  var entity = equals($this_buildDeserializationNamesMap.hq(), ENUM_getInstance()) ? 'enum value' : 'property';
  // Inline function 'kotlin.collections.contains' call
  // Inline function 'kotlin.collections.containsKey' call
  if ((isInterface(_this__u8e3s4, KtMap) ? _this__u8e3s4 : THROW_CCE()).b3(name)) {
    throw new JsonException("The suggested name '" + name + "' for " + entity + ' ' + $this_buildDeserializationNamesMap.lq(index) + ' is already one of the names for ' + entity + ' ' + ($this_buildDeserializationNamesMap.lq(getValue(_this__u8e3s4, name)) + ' in ' + toString($this_buildDeserializationNamesMap)));
  }
  // Inline function 'kotlin.collections.set' call
  _this__u8e3s4.v2(name, index);
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
  var newSize = imul($this.a1e_1, 2);
  $this.y1d_1 = copyOf($this.y1d_1, newSize);
  var tmp = 0;
  var tmp_0 = new Int32Array(newSize);
  while (tmp < newSize) {
    tmp_0[tmp] = -1;
    tmp = tmp + 1 | 0;
  }
  var newIndices = tmp_0;
  // Inline function 'kotlin.collections.copyInto' call
  var this_0 = $this.z1d_1;
  var endIndex = this_0.length;
  // Inline function 'kotlin.js.unsafeCast' call
  // Inline function 'kotlin.js.asDynamic' call
  var tmp_1 = this_0;
  // Inline function 'kotlin.js.unsafeCast' call
  // Inline function 'kotlin.js.asDynamic' call
  arrayCopy(tmp_1, newIndices, 0, 0, endIndex);
  $this.z1d_1 = newIndices;
}
function JsonPath() {
  var tmp = this;
  // Inline function 'kotlin.arrayOfNulls' call
  tmp.y1d_1 = Array(8);
  var tmp_0 = this;
  var tmp_1 = 0;
  var tmp_2 = new Int32Array(8);
  while (tmp_1 < 8) {
    tmp_2[tmp_1] = -1;
    tmp_1 = tmp_1 + 1 | 0;
  }
  tmp_0.z1d_1 = tmp_2;
  this.a1e_1 = -1;
}
protoOf(JsonPath).b1e = function (sd) {
  this.a1e_1 = this.a1e_1 + 1 | 0;
  var depth = this.a1e_1;
  if (depth === this.y1d_1.length) {
    resize(this);
  }
  this.y1d_1[depth] = sd;
};
protoOf(JsonPath).c1e = function (index) {
  this.z1d_1[this.a1e_1] = index;
};
protoOf(JsonPath).d1e = function (key) {
  var tmp;
  if (!(this.z1d_1[this.a1e_1] === -2)) {
    this.a1e_1 = this.a1e_1 + 1 | 0;
    tmp = this.a1e_1 === this.y1d_1.length;
  } else {
    tmp = false;
  }
  if (tmp) {
    resize(this);
  }
  this.y1d_1[this.a1e_1] = key;
  this.z1d_1[this.a1e_1] = -2;
};
protoOf(JsonPath).e1e = function () {
  if (this.z1d_1[this.a1e_1] === -2) {
    this.y1d_1[this.a1e_1] = Tombstone_instance;
  }
};
protoOf(JsonPath).f1e = function () {
  var depth = this.a1e_1;
  if (this.z1d_1[depth] === -2) {
    this.z1d_1[depth] = -1;
    this.a1e_1 = this.a1e_1 - 1 | 0;
  }
  if (!(this.a1e_1 === -1)) {
    this.a1e_1 = this.a1e_1 - 1 | 0;
  }
};
protoOf(JsonPath).g1e = function () {
  // Inline function 'kotlin.text.buildString' call
  // Inline function 'kotlin.apply' call
  var this_0 = StringBuilder_init_$Create$();
  this_0.q('$');
  // Inline function 'kotlin.repeat' call
  var times = this.a1e_1 + 1 | 0;
  var inductionVariable = 0;
  if (inductionVariable < times)
    do {
      var index = inductionVariable;
      inductionVariable = inductionVariable + 1 | 0;
      var element = this.y1d_1[index];
      if (!(element == null) ? isInterface(element, SerialDescriptor) : false) {
        if (equals(element.hq(), LIST_getInstance())) {
          if (!(this.z1d_1[index] === -1)) {
            this_0.q('[');
            this_0.ic(this.z1d_1[index]);
            this_0.q(']');
          }
        } else {
          var idx = this.z1d_1[index];
          if (idx >= 0) {
            this_0.q('.');
            this_0.q(element.lq(idx));
          }
        }
      } else {
        if (!(element === Tombstone_instance)) {
          this_0.q('[');
          this_0.q("'");
          this_0.w(element);
          this_0.q("'");
          this_0.q(']');
        }
      }
    }
     while (inductionVariable < times);
  return this_0.toString();
};
protoOf(JsonPath).toString = function () {
  return this.g1e();
};
function checkKind($this, descriptor, actualClass) {
  var kind = descriptor.hq();
  var tmp;
  if (kind instanceof PolymorphicKind) {
    tmp = true;
  } else {
    tmp = equals(kind, CONTEXTUAL_getInstance());
  }
  if (tmp) {
    throw IllegalArgumentException_init_$Create$('Serializer for ' + actualClass.o() + " can't be registered as a subclass for polymorphic serialization " + ('because its kind ' + kind.toString() + ' is not concrete. To work with multiple hierarchies, register it as a base class.'));
  }
  if ($this.i1e_1)
    return Unit_instance;
  if (!$this.j1e_1)
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
    throw IllegalArgumentException_init_$Create$('Serializer for ' + actualClass.o() + ' of kind ' + kind.toString() + ' cannot be serialized polymorphically with class discriminator.');
  }
}
function checkDiscriminatorCollisions($this, descriptor, actualClass) {
  var inductionVariable = 0;
  var last = descriptor.jq();
  if (inductionVariable < last)
    do {
      var i = inductionVariable;
      inductionVariable = inductionVariable + 1 | 0;
      var name = descriptor.lq(i);
      if (name === $this.h1e_1) {
        throw IllegalArgumentException_init_$Create$('Polymorphic serializer for ' + toString(actualClass) + " has property '" + name + "' that conflicts " + 'with JSON class discriminator. You can either change class discriminator in JsonConfiguration, rename property with @SerialName annotation or fall back to array polymorphism');
      }
    }
     while (inductionVariable < last);
}
function JsonSerializersModuleValidator(configuration) {
  this.h1e_1 = configuration.t1a_1;
  this.i1e_1 = configuration.s1a_1;
  this.j1e_1 = !configuration.a1b_1.equals(ClassDiscriminatorMode_NONE_getInstance());
}
protoOf(JsonSerializersModuleValidator).o18 = function (kClass, provider) {
};
protoOf(JsonSerializersModuleValidator).r18 = function (baseClass, actualClass, actualSerializer) {
  var descriptor = actualSerializer.zo();
  checkKind(this, descriptor, actualClass);
  if (!this.i1e_1 && this.j1e_1) {
    checkDiscriminatorCollisions(this, descriptor, actualClass);
  }
};
protoOf(JsonSerializersModuleValidator).s18 = function (baseClass, defaultSerializerProvider) {
};
protoOf(JsonSerializersModuleValidator).t18 = function (baseClass, defaultDeserializerProvider) {
};
function encodeByWriter(json, writer, serializer, value) {
  var tmp = WriteMode_OBJ_getInstance();
  // Inline function 'kotlin.arrayOfNulls' call
  var size = get_entries().l1();
  var tmp$ret$0 = Array(size);
  var encoder = StreamingJsonEncoder_init_$Create$(writer, json, tmp, tmp$ret$0);
  encoder.rt(serializer, value);
}
function readObject($this) {
  // Inline function 'kotlinx.serialization.json.internal.JsonTreeReader.readObjectImpl' call
  var lastToken = $this.t1e_1.x1e(6);
  if ($this.t1e_1.y1e() === 4) {
    $this.t1e_1.t1d('Unexpected leading comma');
  }
  // Inline function 'kotlin.collections.linkedMapOf' call
  var result = LinkedHashMap_init_$Create$();
  $l$loop: while ($this.t1e_1.z1e()) {
    var key = $this.u1e_1 ? $this.t1e_1.b1f() : $this.t1e_1.a1f();
    $this.t1e_1.x1e(5);
    var element = $this.c1f();
    // Inline function 'kotlin.collections.set' call
    result.v2(key, element);
    lastToken = $this.t1e_1.d1f();
    var tmp0_subject = lastToken;
    if (tmp0_subject !== 4)
      if (tmp0_subject === 7)
        break $l$loop;
      else {
        $this.t1e_1.t1d('Expected end of the object or comma');
      }
  }
  if (lastToken === 6) {
    $this.t1e_1.x1e(7);
  } else if (lastToken === 4) {
    if (!$this.v1e_1) {
      invalidTrailingComma($this.t1e_1);
    }
    $this.t1e_1.x1e(7);
  }
  return new JsonObject(result);
}
function readObject_0($this, _this__u8e3s4, $completion) {
  var tmp = new $readObjectCOROUTINE$($this, _this__u8e3s4, $completion);
  tmp.x8_1 = Unit_instance;
  tmp.y8_1 = null;
  return tmp.d9();
}
function readArray($this) {
  var lastToken = $this.t1e_1.d1f();
  if ($this.t1e_1.y1e() === 4) {
    $this.t1e_1.t1d('Unexpected leading comma');
  }
  // Inline function 'kotlin.collections.arrayListOf' call
  var result = ArrayList_init_$Create$();
  while ($this.t1e_1.z1e()) {
    var element = $this.c1f();
    result.b1(element);
    lastToken = $this.t1e_1.d1f();
    if (!(lastToken === 4)) {
      var tmp0 = $this.t1e_1;
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonLexer.require' call
      var condition = lastToken === 9;
      var position = tmp0.m19_1;
      if (!condition) {
        var tmp$ret$1 = 'Expected end of the array or comma';
        tmp0.t1d(tmp$ret$1, position);
      }
    }
  }
  if (lastToken === 8) {
    $this.t1e_1.x1e(9);
  } else if (lastToken === 4) {
    if (!$this.v1e_1) {
      invalidTrailingComma($this.t1e_1, 'array');
    }
    $this.t1e_1.x1e(9);
  }
  return new JsonArray(result);
}
function readValue($this, isString) {
  var tmp;
  if ($this.u1e_1 || !isString) {
    tmp = $this.t1e_1.b1f();
  } else {
    tmp = $this.t1e_1.a1f();
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
  this.a1g_1 = this$0;
  CoroutineImpl.call(this, resultContinuation);
}
protoOf(JsonTreeReader$readDeepRecursive$slambda).e1g = function ($this$DeepRecursiveFunction, it, $completion) {
  var tmp = this.f1g($this$DeepRecursiveFunction, it, $completion);
  tmp.x8_1 = Unit_instance;
  tmp.y8_1 = null;
  return tmp.d9();
};
protoOf(JsonTreeReader$readDeepRecursive$slambda).q9 = function (p1, p2, $completion) {
  var tmp = p1 instanceof DeepRecursiveScope ? p1 : THROW_CCE();
  return this.e1g(tmp, p2 instanceof Unit ? p2 : THROW_CCE(), $completion);
};
protoOf(JsonTreeReader$readDeepRecursive$slambda).d9 = function () {
  var suspendResult = this.x8_1;
  $sm: do
    try {
      var tmp = this.v8_1;
      switch (tmp) {
        case 0:
          this.w8_1 = 3;
          var tmp0_subject = this.a1g_1.t1e_1.y1e();
          if (tmp0_subject === 1) {
            this.d1g_1 = readValue(this.a1g_1, true);
            this.v8_1 = 2;
            continue $sm;
          } else {
            if (tmp0_subject === 0) {
              this.d1g_1 = readValue(this.a1g_1, false);
              this.v8_1 = 2;
              continue $sm;
            } else {
              if (tmp0_subject === 6) {
                this.v8_1 = 1;
                suspendResult = readObject_0(this.a1g_1, this.b1g_1, this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }
                continue $sm;
              } else {
                if (tmp0_subject === 8) {
                  this.d1g_1 = readArray(this.a1g_1);
                  this.v8_1 = 2;
                  continue $sm;
                } else {
                  var tmp_0 = this;
                  this.a1g_1.t1e_1.t1d("Can't begin reading element, unexpected token");
                }
              }
            }
          }

          break;
        case 1:
          this.d1g_1 = suspendResult;
          this.v8_1 = 2;
          continue $sm;
        case 2:
          return this.d1g_1;
        case 3:
          throw this.y8_1;
      }
    } catch ($p) {
      var e = $p;
      if (this.w8_1 === 3) {
        throw e;
      } else {
        this.v8_1 = this.w8_1;
        this.y8_1 = e;
      }
    }
   while (true);
};
protoOf(JsonTreeReader$readDeepRecursive$slambda).f1g = function ($this$DeepRecursiveFunction, it, completion) {
  var i = new JsonTreeReader$readDeepRecursive$slambda(this.a1g_1, completion);
  i.b1g_1 = $this$DeepRecursiveFunction;
  i.c1g_1 = it;
  return i;
};
function JsonTreeReader$readDeepRecursive$slambda_0(this$0, resultContinuation) {
  var i = new JsonTreeReader$readDeepRecursive$slambda(this$0, resultContinuation);
  var l = function ($this$DeepRecursiveFunction, it, $completion) {
    return i.e1g($this$DeepRecursiveFunction, it, $completion);
  };
  l.$arity = 2;
  return l;
}
function $readObjectCOROUTINE$(_this__u8e3s4, _this__u8e3s4_0, resultContinuation) {
  CoroutineImpl.call(this, resultContinuation);
  this.m1f_1 = _this__u8e3s4;
  this.n1f_1 = _this__u8e3s4_0;
}
protoOf($readObjectCOROUTINE$).d9 = function () {
  var suspendResult = this.x8_1;
  $sm: do
    try {
      var tmp = this.v8_1;
      switch (tmp) {
        case 0:
          this.w8_1 = 5;
          this.p1f_1 = this.m1f_1;
          this.q1f_1 = this.p1f_1.t1e_1.x1e(6);
          if (this.p1f_1.t1e_1.y1e() === 4) {
            this.p1f_1.t1e_1.t1d('Unexpected leading comma');
          }

          var tmp_0 = this;
          tmp_0.o1f_1 = LinkedHashMap_init_$Create$();
          this.v8_1 = 1;
          continue $sm;
        case 1:
          if (!this.p1f_1.t1e_1.z1e()) {
            this.v8_1 = 4;
            continue $sm;
          }

          this.r1f_1 = this.p1f_1.u1e_1 ? this.p1f_1.t1e_1.b1f() : this.p1f_1.t1e_1.a1f();
          this.p1f_1.t1e_1.x1e(5);
          this.v8_1 = 2;
          suspendResult = this.n1f_1.nm(Unit_instance, this);
          if (suspendResult === get_COROUTINE_SUSPENDED()) {
            return suspendResult;
          }

          continue $sm;
        case 2:
          var element = suspendResult;
          var tmp0 = this.o1f_1;
          var key = this.r1f_1;
          tmp0.v2(key, element);
          this.q1f_1 = this.p1f_1.t1e_1.d1f();
          var tmp0_subject = this.q1f_1;
          if (tmp0_subject === 4) {
            this.v8_1 = 3;
            continue $sm;
          } else {
            if (tmp0_subject === 7) {
              this.v8_1 = 4;
              continue $sm;
            } else {
              this.p1f_1.t1e_1.t1d('Expected end of the object or comma');
            }
          }

          break;
        case 3:
          this.v8_1 = 1;
          continue $sm;
        case 4:
          if (this.q1f_1 === 6) {
            this.p1f_1.t1e_1.x1e(7);
          } else if (this.q1f_1 === 4) {
            if (!this.p1f_1.v1e_1) {
              invalidTrailingComma(this.p1f_1.t1e_1);
            }
            this.p1f_1.t1e_1.x1e(7);
          }

          return new JsonObject(this.o1f_1);
        case 5:
          throw this.y8_1;
      }
    } catch ($p) {
      var e = $p;
      if (this.w8_1 === 5) {
        throw e;
      } else {
        this.v8_1 = this.w8_1;
        this.y8_1 = e;
      }
    }
   while (true);
};
function JsonTreeReader(configuration, lexer) {
  this.t1e_1 = lexer;
  this.u1e_1 = configuration.m1a_1;
  this.v1e_1 = configuration.y1a_1;
  this.w1e_1 = 0;
}
protoOf(JsonTreeReader).c1f = function () {
  var token = this.t1e_1.y1e();
  var tmp;
  if (token === 1) {
    tmp = readValue(this, true);
  } else if (token === 0) {
    tmp = readValue(this, false);
  } else if (token === 6) {
    var tmp_0;
    this.w1e_1 = this.w1e_1 + 1 | 0;
    if (this.w1e_1 === 200) {
      tmp_0 = readDeepRecursive(this);
    } else {
      tmp_0 = readObject(this);
    }
    var result = tmp_0;
    this.w1e_1 = this.w1e_1 - 1 | 0;
    tmp = result;
  } else if (token === 8) {
    tmp = readArray(this);
  } else {
    this.t1e_1.t1d('Cannot read Json element because of unexpected ' + tokenDescription(token));
  }
  return tmp;
};
function classDiscriminator(_this__u8e3s4, json) {
  var _iterator__ex2g4s = _this__u8e3s4.kq().t();
  while (_iterator__ex2g4s.u()) {
    var annotation = _iterator__ex2g4s.v();
    if (annotation instanceof JsonClassDiscriminator)
      return annotation.g1g_1;
  }
  return json.x18_1.t1a_1;
}
function validateIfSealed(serializer, actualSerializer, classDiscriminator) {
  if (!(serializer instanceof SealedClassSerializer))
    return Unit_instance;
  if (jsonCachedSerialNames(actualSerializer.zo()).r2(classDiscriminator)) {
    var baseName = serializer.zo().gq();
    var actualName = actualSerializer.zo().gq();
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
  this.u1d_1 = createMapForCache(16);
}
protoOf(DescriptorSchemaCache).h1g = function (descriptor, key, value) {
  // Inline function 'kotlin.collections.getOrPut' call
  var this_0 = this.u1d_1;
  var value_0 = this_0.d3(descriptor);
  var tmp;
  if (value_0 == null) {
    var answer = createMapForCache(2);
    this_0.v2(descriptor, answer);
    tmp = answer;
  } else {
    tmp = value_0;
  }
  var tmp0 = tmp;
  var tmp2 = key instanceof Key ? key : THROW_CCE();
  // Inline function 'kotlin.collections.set' call
  var value_1 = !(value == null) ? value : THROW_CCE();
  tmp0.v2(tmp2, value_1);
};
protoOf(DescriptorSchemaCache).v1d = function (descriptor, key, defaultValue) {
  var tmp0_safe_receiver = this.i1g(descriptor, key);
  if (tmp0_safe_receiver == null)
    null;
  else {
    // Inline function 'kotlin.let' call
    return tmp0_safe_receiver;
  }
  var value = defaultValue();
  this.h1g(descriptor, key, value);
  return value;
};
protoOf(DescriptorSchemaCache).i1g = function (descriptor, key) {
  var tmp0_safe_receiver = this.u1d_1.d3(descriptor);
  var tmp;
  if (tmp0_safe_receiver == null) {
    tmp = null;
  } else {
    tmp = tmp0_safe_receiver.d3(key instanceof Key ? key : THROW_CCE());
  }
  var tmp_0 = tmp;
  return !(tmp_0 == null) ? tmp_0 : null;
};
function DiscriminatorHolder(discriminatorToSkip) {
  this.j1g_1 = discriminatorToSkip;
}
function trySkip($this, _this__u8e3s4, unknownKey) {
  if (_this__u8e3s4 == null)
    return false;
  if (_this__u8e3s4.j1g_1 === unknownKey) {
    _this__u8e3s4.j1g_1 = null;
    return true;
  }
  return false;
}
function skipLeftoverElements($this, descriptor) {
  while (!($this.qs(descriptor) === -1)) {
  }
}
function checkLeadingComma($this) {
  if ($this.g19_1.y1e() === 4) {
    $this.g19_1.t1d('Unexpected leading comma');
  }
}
function decodeMapIndex($this) {
  var hasComma = false;
  var decodingKey = !(($this.i19_1 % 2 | 0) === 0);
  if (decodingKey) {
    if (!($this.i19_1 === -1)) {
      hasComma = $this.g19_1.l1g();
    }
  } else {
    $this.g19_1.k1g(_Char___init__impl__6a9atx(58));
  }
  var tmp;
  if ($this.g19_1.z1e()) {
    if (decodingKey) {
      if ($this.i19_1 === -1) {
        var tmp0 = $this.g19_1;
        // Inline function 'kotlinx.serialization.json.internal.AbstractJsonLexer.require' call
        var condition = !hasComma;
        var position = tmp0.m19_1;
        if (!condition) {
          var tmp$ret$0 = 'Unexpected leading comma';
          tmp0.t1d(tmp$ret$0, position);
        }
      } else {
        var tmp0_0 = $this.g19_1;
        // Inline function 'kotlinx.serialization.json.internal.AbstractJsonLexer.require' call
        var condition_0 = hasComma;
        var position_0 = tmp0_0.m19_1;
        if (!condition_0) {
          var tmp$ret$2 = 'Expected comma after the key-value pair';
          tmp0_0.t1d(tmp$ret$2, position_0);
        }
      }
    }
    $this.i19_1 = $this.i19_1 + 1 | 0;
    tmp = $this.i19_1;
  } else {
    if (hasComma && !$this.e19_1.x18_1.y1a_1) {
      invalidTrailingComma($this.g19_1);
    }
    tmp = -1;
  }
  return tmp;
}
function coerceInputValue($this, descriptor, index) {
  var tmp0 = $this.e19_1;
  var tmp$ret$1;
  $l$block_2: {
    // Inline function 'kotlinx.serialization.json.internal.tryCoerceValue' call
    var isOptional = descriptor.pq(index);
    var elementDescriptor = descriptor.oq(index);
    var tmp;
    if (isOptional && !elementDescriptor.zp()) {
      tmp = $this.g19_1.m1g(true);
    } else {
      tmp = false;
    }
    if (tmp) {
      tmp$ret$1 = true;
      break $l$block_2;
    }
    if (equals(elementDescriptor.hq(), ENUM_getInstance())) {
      var tmp_0;
      if (elementDescriptor.zp()) {
        tmp_0 = $this.g19_1.m1g(false);
      } else {
        tmp_0 = false;
      }
      if (tmp_0) {
        tmp$ret$1 = false;
        break $l$block_2;
      }
      var tmp0_elvis_lhs = $this.g19_1.n1g($this.k19_1.m1a_1);
      var tmp_1;
      if (tmp0_elvis_lhs == null) {
        tmp$ret$1 = false;
        break $l$block_2;
      } else {
        tmp_1 = tmp0_elvis_lhs;
      }
      var enumValue = tmp_1;
      var enumIndex = getJsonNameIndex(elementDescriptor, tmp0, enumValue);
      var coerceToNull = !tmp0.x18_1.p1a_1 && elementDescriptor.zp();
      if (enumIndex === -3 && (isOptional || coerceToNull)) {
        $this.g19_1.a1f();
        tmp$ret$1 = true;
        break $l$block_2;
      }
    }
    tmp$ret$1 = false;
  }
  return tmp$ret$1;
}
function decodeObjectIndex($this, descriptor) {
  var hasComma = $this.g19_1.l1g();
  while ($this.g19_1.z1e()) {
    hasComma = false;
    var key = decodeStringKey($this);
    $this.g19_1.k1g(_Char___init__impl__6a9atx(58));
    var index = getJsonNameIndex(descriptor, $this.e19_1, key);
    var tmp;
    if (!(index === -3)) {
      var tmp_0;
      if ($this.k19_1.r1a_1 && coerceInputValue($this, descriptor, index)) {
        hasComma = $this.g19_1.l1g();
        tmp_0 = false;
      } else {
        var tmp0_safe_receiver = $this.l19_1;
        if (tmp0_safe_receiver == null)
          null;
        else {
          tmp0_safe_receiver.q1d(index);
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
  if (hasComma && !$this.e19_1.x18_1.y1a_1) {
    invalidTrailingComma($this.g19_1);
  }
  var tmp1_safe_receiver = $this.l19_1;
  var tmp2_elvis_lhs = tmp1_safe_receiver == null ? null : tmp1_safe_receiver.r1d();
  return tmp2_elvis_lhs == null ? -1 : tmp2_elvis_lhs;
}
function handleUnknown($this, descriptor, key) {
  if (ignoreUnknownKeys(descriptor, $this.e19_1) || trySkip($this, $this.j19_1, key)) {
    $this.g19_1.p1g($this.k19_1.m1a_1);
  } else {
    $this.g19_1.n19_1.f1e();
    $this.g19_1.o1g(key);
  }
  return $this.g19_1.l1g();
}
function decodeListIndex($this) {
  var hasComma = $this.g19_1.l1g();
  var tmp;
  if ($this.g19_1.z1e()) {
    if (!($this.i19_1 === -1) && !hasComma) {
      $this.g19_1.t1d('Expected end of the array or comma');
    }
    $this.i19_1 = $this.i19_1 + 1 | 0;
    tmp = $this.i19_1;
  } else {
    if (hasComma && !$this.e19_1.x18_1.y1a_1) {
      invalidTrailingComma($this.g19_1, 'array');
    }
    tmp = -1;
  }
  return tmp;
}
function decodeStringKey($this) {
  var tmp;
  if ($this.k19_1.m1a_1) {
    tmp = $this.g19_1.r1g();
  } else {
    tmp = $this.g19_1.q1g();
  }
  return tmp;
}
function StreamingJsonDecoder(json, mode, lexer, descriptor, discriminatorHolder) {
  AbstractDecoder.call(this);
  this.e19_1 = json;
  this.f19_1 = mode;
  this.g19_1 = lexer;
  this.h19_1 = this.e19_1.os();
  this.i19_1 = -1;
  this.j19_1 = discriminatorHolder;
  this.k19_1 = this.e19_1.x18_1;
  this.l19_1 = this.k19_1.p1a_1 ? null : new JsonElementMarker(descriptor);
}
protoOf(StreamingJsonDecoder).b1b = function () {
  return this.e19_1;
};
protoOf(StreamingJsonDecoder).os = function () {
  return this.h19_1;
};
protoOf(StreamingJsonDecoder).c1b = function () {
  return (new JsonTreeReader(this.e19_1.x18_1, this.g19_1)).c1f();
};
protoOf(StreamingJsonDecoder).zr = function (deserializer) {
  try {
    var tmp;
    if (!(deserializer instanceof AbstractPolymorphicSerializer)) {
      tmp = true;
    } else {
      tmp = this.e19_1.x18_1.s1a_1;
    }
    if (tmp) {
      return deserializer.bp(this);
    }
    var discriminator = classDiscriminator(deserializer.zo(), this.e19_1);
    var tmp0_elvis_lhs = this.g19_1.s1g(discriminator, this.k19_1.m1a_1);
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
          tmp_1 = this.b1b().x18_1.s1a_1;
        }
        if (tmp_1) {
          tmp$ret$0 = tmp2.bp(this);
          break $l$block;
        }
        var discriminator_0 = classDiscriminator(tmp2.zo(), this.b1b());
        var tmp0 = this.c1b();
        // Inline function 'kotlinx.serialization.json.internal.cast' call
        var serialName = tmp2.zo().gq();
        if (!(tmp0 instanceof JsonObject)) {
          var tmp_2 = getKClass(JsonObject).o();
          var tmp_3 = getKClassFromExpression(tmp0).o();
          var tmp$ret$1 = this.g19_1.n19_1.g1e();
          throw JsonDecodingException_0(-1, 'Expected ' + tmp_2 + ', but had ' + tmp_3 + ' as the serialized body of ' + serialName + ' at element: ' + tmp$ret$1, toString(tmp0));
        }
        var jsonTree = tmp0;
        var tmp0_safe_receiver = jsonTree.h1b(discriminator_0);
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
        tmp$ret$0 = readPolymorphicJson(this.b1b(), discriminator_0, jsonTree, actualSerializer);
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
        this.g19_1.t1d(message, VOID, hint);
      } else {
        throw $p;
      }
      tmp_7 = tmp_8;
    }
    var tmp_9 = tmp_7;
    var actualSerializer_0 = isInterface(tmp_9, DeserializationStrategy) ? tmp_9 : THROW_CCE();
    this.j19_1 = new DiscriminatorHolder(discriminator);
    return actualSerializer_0.bp(this);
  } catch ($p) {
    if ($p instanceof MissingFieldException) {
      var e = $p;
      if (contains(ensureNotNull(e.message), 'at path'))
        throw e;
      throw new MissingFieldException(e.tp_1, plus(e.message, ' at path: ') + this.g19_1.n19_1.g1e(), e);
    } else {
      throw $p;
    }
  }
};
protoOf(StreamingJsonDecoder).as = function (descriptor) {
  var newMode = switchMode(this.e19_1, descriptor);
  this.g19_1.n19_1.b1e(descriptor);
  this.g19_1.k1g(newMode.v1g_1);
  checkLeadingComma(this);
  var tmp;
  switch (newMode.a1_1) {
    case 1:
    case 2:
    case 3:
      tmp = new StreamingJsonDecoder(this.e19_1, newMode, this.g19_1, descriptor, this.j19_1);
      break;
    default:
      var tmp_0;
      if (this.f19_1.equals(newMode) && this.e19_1.x18_1.p1a_1) {
        tmp_0 = this;
      } else {
        tmp_0 = new StreamingJsonDecoder(this.e19_1, newMode, this.g19_1, descriptor, this.j19_1);
      }

      tmp = tmp_0;
      break;
  }
  return tmp;
};
protoOf(StreamingJsonDecoder).bs = function (descriptor) {
  if (descriptor.jq() === 0 && ignoreUnknownKeys(descriptor, this.e19_1)) {
    skipLeftoverElements(this, descriptor);
  }
  if (this.g19_1.l1g() && !this.e19_1.x18_1.y1a_1) {
    invalidTrailingComma(this.g19_1, '');
  }
  this.g19_1.k1g(this.f19_1.w1g_1);
  this.g19_1.n19_1.f1e();
};
protoOf(StreamingJsonDecoder).lr = function () {
  var tmp;
  var tmp0_safe_receiver = this.l19_1;
  var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.p1d_1;
  if (!(tmp1_elvis_lhs == null ? false : tmp1_elvis_lhs)) {
    tmp = !this.g19_1.x1g();
  } else {
    tmp = false;
  }
  return tmp;
};
protoOf(StreamingJsonDecoder).mr = function () {
  return null;
};
protoOf(StreamingJsonDecoder).ms = function (descriptor, index, deserializer, previousValue) {
  var isMapKey = this.f19_1.equals(WriteMode_MAP_getInstance()) && (index & 1) === 0;
  if (isMapKey) {
    this.g19_1.n19_1.e1e();
  }
  var value = protoOf(AbstractDecoder).ms.call(this, descriptor, index, deserializer, previousValue);
  if (isMapKey) {
    this.g19_1.n19_1.d1e(value);
  }
  return value;
};
protoOf(StreamingJsonDecoder).qs = function (descriptor) {
  var index;
  switch (this.f19_1.a1_1) {
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
  if (!this.f19_1.equals(WriteMode_MAP_getInstance())) {
    this.g19_1.n19_1.c1e(index);
  }
  return index;
};
protoOf(StreamingJsonDecoder).nr = function () {
  return this.g19_1.y1g();
};
protoOf(StreamingJsonDecoder).or = function () {
  var value = this.g19_1.z1g();
  if (!equalsLong(value, fromInt(convertToByte(value)))) {
    this.g19_1.t1d("Failed to parse byte for input '" + value.toString() + "'");
  }
  return convertToByte(value);
};
protoOf(StreamingJsonDecoder).pr = function () {
  var value = this.g19_1.z1g();
  if (!equalsLong(value, fromInt(convertToShort(value)))) {
    this.g19_1.t1d("Failed to parse short for input '" + value.toString() + "'");
  }
  return convertToShort(value);
};
protoOf(StreamingJsonDecoder).qr = function () {
  var value = this.g19_1.z1g();
  if (!equalsLong(value, fromInt(convertToInt(value)))) {
    this.g19_1.t1d("Failed to parse int for input '" + value.toString() + "'");
  }
  return convertToInt(value);
};
protoOf(StreamingJsonDecoder).rr = function () {
  return this.g19_1.z1g();
};
protoOf(StreamingJsonDecoder).sr = function () {
  var tmp0 = this.g19_1;
  var tmp$ret$4;
  $l$block: {
    // Inline function 'kotlinx.serialization.json.internal.parseString' call
    var input = tmp0.b1f();
    try {
      // Inline function 'kotlin.text.toFloat' call
      // Inline function 'kotlin.js.unsafeCast' call
      // Inline function 'kotlin.js.asDynamic' call
      tmp$ret$4 = toDouble(input);
      break $l$block;
    } catch ($p) {
      if ($p instanceof IllegalArgumentException) {
        var e = $p;
        tmp0.t1d("Failed to parse type '" + 'float' + "' for input '" + input + "'");
      } else {
        throw $p;
      }
    }
  }
  var result = tmp$ret$4;
  var specialFp = this.e19_1.x18_1.u1a_1;
  if (specialFp || isFinite(result))
    return result;
  throwInvalidFloatingPointDecoded(this.g19_1, result);
};
protoOf(StreamingJsonDecoder).tr = function () {
  var tmp0 = this.g19_1;
  var tmp$ret$1;
  $l$block: {
    // Inline function 'kotlinx.serialization.json.internal.parseString' call
    var input = tmp0.b1f();
    try {
      tmp$ret$1 = toDouble(input);
      break $l$block;
    } catch ($p) {
      if ($p instanceof IllegalArgumentException) {
        var e = $p;
        tmp0.t1d("Failed to parse type '" + 'double' + "' for input '" + input + "'");
      } else {
        throw $p;
      }
    }
  }
  var result = tmp$ret$1;
  var specialFp = this.e19_1.x18_1.u1a_1;
  if (specialFp || isFinite_0(result))
    return result;
  throwInvalidFloatingPointDecoded(this.g19_1, result);
};
protoOf(StreamingJsonDecoder).ur = function () {
  var string = this.g19_1.b1f();
  if (!(string.length === 1)) {
    this.g19_1.t1d("Expected single char, but got '" + string + "'");
  }
  return charCodeAt(string, 0);
};
protoOf(StreamingJsonDecoder).vr = function () {
  var tmp;
  if (this.k19_1.m1a_1) {
    tmp = this.g19_1.r1g();
  } else {
    tmp = this.g19_1.a1f();
  }
  return tmp;
};
protoOf(StreamingJsonDecoder).xr = function (descriptor) {
  return get_isUnsignedNumber(descriptor) ? new JsonDecoderForUnsignedTypes(this.g19_1, this.e19_1) : protoOf(AbstractDecoder).xr.call(this, descriptor);
};
protoOf(StreamingJsonDecoder).wr = function (enumDescriptor) {
  return getJsonNameIndexOrThrow(enumDescriptor, this.e19_1, this.vr(), ' at path ' + this.g19_1.n19_1.g1e());
};
function JsonDecoderForUnsignedTypes(lexer, json) {
  AbstractDecoder.call(this);
  this.a1h_1 = lexer;
  this.b1h_1 = json.os();
}
protoOf(JsonDecoderForUnsignedTypes).os = function () {
  return this.b1h_1;
};
protoOf(JsonDecoderForUnsignedTypes).qs = function (descriptor) {
  var message = 'unsupported';
  throw IllegalStateException_init_$Create$(toString(message));
};
protoOf(JsonDecoderForUnsignedTypes).qr = function () {
  var tmp0 = this.a1h_1;
  var tmp$ret$2;
  $l$block: {
    // Inline function 'kotlinx.serialization.json.internal.parseString' call
    var input = tmp0.b1f();
    try {
      // Inline function 'kotlin.UInt.toInt' call
      var this_0 = toUInt(input);
      tmp$ret$2 = _UInt___get_data__impl__f0vqqw(this_0);
      break $l$block;
    } catch ($p) {
      if ($p instanceof IllegalArgumentException) {
        var e = $p;
        tmp0.t1d("Failed to parse type '" + 'UInt' + "' for input '" + input + "'");
      } else {
        throw $p;
      }
    }
  }
  return tmp$ret$2;
};
protoOf(JsonDecoderForUnsignedTypes).rr = function () {
  var tmp0 = this.a1h_1;
  var tmp$ret$2;
  $l$block: {
    // Inline function 'kotlinx.serialization.json.internal.parseString' call
    var input = tmp0.b1f();
    try {
      // Inline function 'kotlin.ULong.toLong' call
      var this_0 = toULong(input);
      tmp$ret$2 = _ULong___get_data__impl__fggpzb(this_0);
      break $l$block;
    } catch ($p) {
      if ($p instanceof IllegalArgumentException) {
        var e = $p;
        tmp0.t1d("Failed to parse type '" + 'ULong' + "' for input '" + input + "'");
      } else {
        throw $p;
      }
    }
  }
  return tmp$ret$2;
};
protoOf(JsonDecoderForUnsignedTypes).or = function () {
  var tmp0 = this.a1h_1;
  var tmp$ret$2;
  $l$block: {
    // Inline function 'kotlinx.serialization.json.internal.parseString' call
    var input = tmp0.b1f();
    try {
      // Inline function 'kotlin.UByte.toByte' call
      var this_0 = toUByte(input);
      tmp$ret$2 = _UByte___get_data__impl__jof9qr(this_0);
      break $l$block;
    } catch ($p) {
      if ($p instanceof IllegalArgumentException) {
        var e = $p;
        tmp0.t1d("Failed to parse type '" + 'UByte' + "' for input '" + input + "'");
      } else {
        throw $p;
      }
    }
  }
  return tmp$ret$2;
};
protoOf(JsonDecoderForUnsignedTypes).pr = function () {
  var tmp0 = this.a1h_1;
  var tmp$ret$2;
  $l$block: {
    // Inline function 'kotlinx.serialization.json.internal.parseString' call
    var input = tmp0.b1f();
    try {
      // Inline function 'kotlin.UShort.toShort' call
      var this_0 = toUShort(input);
      tmp$ret$2 = _UShort___get_data__impl__g0245(this_0);
      break $l$block;
    } catch ($p) {
      if ($p instanceof IllegalArgumentException) {
        var e = $p;
        tmp0.t1d("Failed to parse type '" + 'UShort' + "' for input '" + input + "'");
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
  $this.k1e_1.n1c();
  $this.dt(discriminator);
  $this.k1e_1.q1c(_Char___init__impl__6a9atx(58));
  $this.k1e_1.p1c();
  $this.dt(serialName);
}
function StreamingJsonEncoder(composer, json, mode, modeReuseCache) {
  AbstractEncoder.call(this);
  this.k1e_1 = composer;
  this.l1e_1 = json;
  this.m1e_1 = mode;
  this.n1e_1 = modeReuseCache;
  this.o1e_1 = this.l1e_1.os();
  this.p1e_1 = this.l1e_1.x18_1;
  this.q1e_1 = false;
  this.r1e_1 = null;
  this.s1e_1 = null;
  var i = this.m1e_1.a1_1;
  if (!(this.n1e_1 == null)) {
    if (!(this.n1e_1[i] === null) || !(this.n1e_1[i] === this)) {
      this.n1e_1[i] = this;
    }
  }
}
protoOf(StreamingJsonEncoder).b1b = function () {
  return this.l1e_1;
};
protoOf(StreamingJsonEncoder).os = function () {
  return this.o1e_1;
};
protoOf(StreamingJsonEncoder).rt = function (serializer, value) {
  $l$block: {
    // Inline function 'kotlinx.serialization.json.internal.encodePolymorphically' call
    if (this.b1b().x18_1.s1a_1) {
      serializer.ap(this, value);
      break $l$block;
    }
    var isPolymorphicSerializer = serializer instanceof AbstractPolymorphicSerializer;
    var tmp;
    if (isPolymorphicSerializer) {
      tmp = !this.b1b().x18_1.a1b_1.equals(ClassDiscriminatorMode_NONE_getInstance());
    } else {
      var tmp_0;
      switch (this.b1b().x18_1.a1b_1.a1_1) {
        case 0:
        case 2:
          tmp_0 = false;
          break;
        case 1:
          // Inline function 'kotlin.let' call

          var it = serializer.zo().hq();
          tmp_0 = equals(it, CLASS_getInstance()) || equals(it, OBJECT_getInstance());
          break;
        default:
          noWhenBranchMatchedException();
          break;
      }
      tmp = tmp_0;
    }
    var needDiscriminator = tmp;
    var baseClassDiscriminator = needDiscriminator ? classDiscriminator(serializer.zo(), this.b1b()) : null;
    var tmp_1;
    if (isPolymorphicSerializer) {
      var casted = serializer instanceof AbstractPolymorphicSerializer ? serializer : THROW_CCE();
      $l$block_0: {
        // Inline function 'kotlin.requireNotNull' call
        if (value == null) {
          var message = 'Value for serializer ' + toString(serializer.zo()) + ' should always be non-null. Please report issue to the kotlinx.serialization tracker.';
          throw IllegalArgumentException_init_$Create$(toString(message));
        } else {
          break $l$block_0;
        }
      }
      var actual = findPolymorphicSerializer_0(casted, this, value);
      if (!(baseClassDiscriminator == null)) {
        access$validateIfSealed$tPolymorphicKt(serializer, actual, baseClassDiscriminator);
        checkKind_0(actual.zo().hq());
      }
      tmp_1 = isInterface(actual, SerializationStrategy) ? actual : THROW_CCE();
    } else {
      tmp_1 = serializer;
    }
    var actualSerializer = tmp_1;
    if (!(baseClassDiscriminator == null)) {
      var serialName = actualSerializer.zo().gq();
      this.r1e_1 = baseClassDiscriminator;
      this.s1e_1 = serialName;
    }
    actualSerializer.ap(this, value);
  }
};
protoOf(StreamingJsonEncoder).as = function (descriptor) {
  var newMode = switchMode(this.l1e_1, descriptor);
  if (!(newMode.v1g_1 === _Char___init__impl__6a9atx(0))) {
    this.k1e_1.q1c(newMode.v1g_1);
    this.k1e_1.l1c();
  }
  var discriminator = this.r1e_1;
  if (!(discriminator == null)) {
    var tmp0_elvis_lhs = this.s1e_1;
    encodeTypeInfo(this, discriminator, tmp0_elvis_lhs == null ? descriptor.gq() : tmp0_elvis_lhs);
    this.r1e_1 = null;
    this.s1e_1 = null;
  }
  if (this.m1e_1.equals(newMode)) {
    return this;
  }
  var tmp1_safe_receiver = this.n1e_1;
  var tmp2_elvis_lhs = tmp1_safe_receiver == null ? null : tmp1_safe_receiver[newMode.a1_1];
  return tmp2_elvis_lhs == null ? new StreamingJsonEncoder(this.k1e_1, this.l1e_1, newMode, this.n1e_1) : tmp2_elvis_lhs;
};
protoOf(StreamingJsonEncoder).bs = function (descriptor) {
  if (!(this.m1e_1.w1g_1 === _Char___init__impl__6a9atx(0))) {
    this.k1e_1.m1c();
    this.k1e_1.o1c();
    this.k1e_1.q1c(this.m1e_1.w1g_1);
  }
};
protoOf(StreamingJsonEncoder).ss = function (descriptor, index) {
  switch (this.m1e_1.a1_1) {
    case 1:
      if (!this.k1e_1.k1c_1) {
        this.k1e_1.q1c(_Char___init__impl__6a9atx(44));
      }

      this.k1e_1.n1c();
      break;
    case 2:
      if (!this.k1e_1.k1c_1) {
        var tmp = this;
        var tmp_0;
        if ((index % 2 | 0) === 0) {
          this.k1e_1.q1c(_Char___init__impl__6a9atx(44));
          this.k1e_1.n1c();
          tmp_0 = true;
        } else {
          this.k1e_1.q1c(_Char___init__impl__6a9atx(58));
          this.k1e_1.p1c();
          tmp_0 = false;
        }
        tmp.q1e_1 = tmp_0;
      } else {
        this.q1e_1 = true;
        this.k1e_1.n1c();
      }

      break;
    case 3:
      if (index === 0)
        this.q1e_1 = true;
      if (index === 1) {
        this.k1e_1.q1c(_Char___init__impl__6a9atx(44));
        this.k1e_1.p1c();
        this.q1e_1 = false;
      }

      break;
    default:
      if (!this.k1e_1.k1c_1) {
        this.k1e_1.q1c(_Char___init__impl__6a9atx(44));
      }

      this.k1e_1.n1c();
      this.dt(getJsonElementName(descriptor, this.l1e_1, index));
      this.k1e_1.q1c(_Char___init__impl__6a9atx(58));
      this.k1e_1.p1c();
      break;
  }
  return true;
};
protoOf(StreamingJsonEncoder).ft = function (descriptor) {
  var tmp;
  if (get_isUnsignedNumber(descriptor)) {
    // Inline function 'kotlinx.serialization.json.internal.StreamingJsonEncoder.composerAs' call
    var tmp_0;
    var tmp_1 = this.k1e_1;
    if (tmp_1 instanceof ComposerForUnsignedNumbers) {
      tmp_0 = this.k1e_1;
    } else {
      var tmp0 = this.k1e_1.j1c_1;
      var p1 = this.q1e_1;
      tmp_0 = new ComposerForUnsignedNumbers(tmp0, p1);
    }
    var tmp$ret$1 = tmp_0;
    tmp = new StreamingJsonEncoder(tmp$ret$1, this.l1e_1, this.m1e_1, null);
  } else if (get_isUnquotedLiteral(descriptor)) {
    // Inline function 'kotlinx.serialization.json.internal.StreamingJsonEncoder.composerAs' call
    var tmp_2;
    var tmp_3 = this.k1e_1;
    if (tmp_3 instanceof ComposerForUnquotedLiterals) {
      tmp_2 = this.k1e_1;
    } else {
      var tmp0_0 = this.k1e_1.j1c_1;
      var p1_0 = this.q1e_1;
      tmp_2 = new ComposerForUnquotedLiterals(tmp0_0, p1_0);
    }
    var tmp$ret$3 = tmp_2;
    tmp = new StreamingJsonEncoder(tmp$ret$3, this.l1e_1, this.m1e_1, null);
  } else if (!(this.r1e_1 == null)) {
    // Inline function 'kotlin.apply' call
    this.s1e_1 = descriptor.gq();
    tmp = this;
  } else {
    tmp = protoOf(AbstractEncoder).ft.call(this, descriptor);
  }
  return tmp;
};
protoOf(StreamingJsonEncoder).us = function () {
  this.k1e_1.s1c('null');
};
protoOf(StreamingJsonEncoder).vs = function (value) {
  if (this.q1e_1) {
    this.dt(value.toString());
  } else {
    this.k1e_1.b1d(value);
  }
};
protoOf(StreamingJsonEncoder).ws = function (value) {
  if (this.q1e_1) {
    this.dt(value.toString());
  } else {
    this.k1e_1.w1c(value);
  }
};
protoOf(StreamingJsonEncoder).xs = function (value) {
  if (this.q1e_1) {
    this.dt(value.toString());
  } else {
    this.k1e_1.y1c(value);
  }
};
protoOf(StreamingJsonEncoder).ys = function (value) {
  if (this.q1e_1) {
    this.dt(value.toString());
  } else {
    this.k1e_1.z1c(value);
  }
};
protoOf(StreamingJsonEncoder).zs = function (value) {
  if (this.q1e_1) {
    this.dt(value.toString());
  } else {
    this.k1e_1.a1d(value);
  }
};
protoOf(StreamingJsonEncoder).at = function (value) {
  if (this.q1e_1) {
    this.dt(value.toString());
  } else {
    this.k1e_1.u1c(value);
  }
  if (!this.p1e_1.u1a_1 && !isFinite(value)) {
    throw InvalidFloatingPointEncoded(value, toString(this.k1e_1.j1c_1));
  }
};
protoOf(StreamingJsonEncoder).bt = function (value) {
  if (this.q1e_1) {
    this.dt(value.toString());
  } else {
    this.k1e_1.v1c(value);
  }
  if (!this.p1e_1.u1a_1 && !isFinite_0(value)) {
    throw InvalidFloatingPointEncoded(value, toString(this.k1e_1.j1c_1));
  }
};
protoOf(StreamingJsonEncoder).ct = function (value) {
  this.dt(toString_1(value));
};
protoOf(StreamingJsonEncoder).dt = function (value) {
  return this.k1e_1.c1d(value);
};
protoOf(StreamingJsonEncoder).et = function (enumDescriptor, index) {
  this.dt(enumDescriptor.lq(index));
};
function get_isUnsignedNumber(_this__u8e3s4) {
  _init_properties_StreamingJsonEncoder_kt__pn1bsi();
  return _this__u8e3s4.iq() && get_unsignedNumberDescriptors().r2(_this__u8e3s4);
}
function get_isUnquotedLiteral(_this__u8e3s4) {
  _init_properties_StreamingJsonEncoder_kt__pn1bsi();
  return _this__u8e3s4.iq() && equals(_this__u8e3s4, get_jsonUnquotedLiteralDescriptor());
}
var properties_initialized_StreamingJsonEncoder_kt_6ifwwk;
function _init_properties_StreamingJsonEncoder_kt__pn1bsi() {
  if (!properties_initialized_StreamingJsonEncoder_kt_6ifwwk) {
    properties_initialized_StreamingJsonEncoder_kt_6ifwwk = true;
    unsignedNumberDescriptors = setOf([serializer_1(Companion_getInstance_0()).zo(), serializer_0(Companion_getInstance()).zo(), serializer_2(Companion_getInstance_1()).zo(), serializer_3(Companion_getInstance_2()).zo()]);
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
  _this__u8e3s4.s(_Char___init__impl__6a9atx(34));
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
        _this__u8e3s4.gc(value, lastPos, i);
        _this__u8e3s4.q(get_ESCAPE_STRINGS()[c]);
        lastPos = i + 1 | 0;
      }
    }
     while (inductionVariable <= last);
  if (!(lastPos === 0))
    _this__u8e3s4.gc(value, lastPos, value.length);
  else
    _this__u8e3s4.q(value);
  _this__u8e3s4.s(_Char___init__impl__6a9atx(34));
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
  throw JsonDecodingException_0(-1, "Failed to parse literal '" + literal.toString() + "' as " + type + ' value at element: ' + $this.i1h(tag), toString($this.j1h()));
}
function AbstractJsonTreeDecoder(json, value, polymorphicDiscriminator) {
  polymorphicDiscriminator = polymorphicDiscriminator === VOID ? null : polymorphicDiscriminator;
  NamedValueDecoder.call(this);
  this.e1h_1 = json;
  this.f1h_1 = value;
  this.g1h_1 = polymorphicDiscriminator;
  this.h1h_1 = this.b1b().x18_1;
}
protoOf(AbstractJsonTreeDecoder).b1b = function () {
  return this.e1h_1;
};
protoOf(AbstractJsonTreeDecoder).u1 = function () {
  return this.f1h_1;
};
protoOf(AbstractJsonTreeDecoder).os = function () {
  return this.b1b().os();
};
protoOf(AbstractJsonTreeDecoder).j1h = function () {
  var tmp0_safe_receiver = this.e16();
  var tmp;
  if (tmp0_safe_receiver == null) {
    tmp = null;
  } else {
    // Inline function 'kotlin.let' call
    tmp = this.k1h(tmp0_safe_receiver);
  }
  var tmp1_elvis_lhs = tmp;
  return tmp1_elvis_lhs == null ? this.u1() : tmp1_elvis_lhs;
};
protoOf(AbstractJsonTreeDecoder).i1h = function (currentTag) {
  return this.g16() + ('.' + currentTag);
};
protoOf(AbstractJsonTreeDecoder).c1b = function () {
  return this.j1h();
};
protoOf(AbstractJsonTreeDecoder).zr = function (deserializer) {
  var tmp$ret$0;
  $l$block: {
    // Inline function 'kotlinx.serialization.json.internal.decodeSerializableValuePolymorphic' call
    var tmp;
    if (!(deserializer instanceof AbstractPolymorphicSerializer)) {
      tmp = true;
    } else {
      tmp = this.b1b().x18_1.s1a_1;
    }
    if (tmp) {
      tmp$ret$0 = deserializer.bp(this);
      break $l$block;
    }
    var discriminator = classDiscriminator(deserializer.zo(), this.b1b());
    var tmp0 = this.c1b();
    // Inline function 'kotlinx.serialization.json.internal.cast' call
    var serialName = deserializer.zo().gq();
    if (!(tmp0 instanceof JsonObject)) {
      var tmp_0 = getKClass(JsonObject).o();
      var tmp_1 = getKClassFromExpression(tmp0).o();
      var tmp$ret$1 = this.g16();
      throw JsonDecodingException_0(-1, 'Expected ' + tmp_0 + ', but had ' + tmp_1 + ' as the serialized body of ' + serialName + ' at element: ' + tmp$ret$1, toString(tmp0));
    }
    var jsonTree = tmp0;
    var tmp0_safe_receiver = jsonTree.h1b(discriminator);
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
    tmp$ret$0 = readPolymorphicJson(this.b1b(), discriminator, jsonTree, actualSerializer);
  }
  return tmp$ret$0;
};
protoOf(AbstractJsonTreeDecoder).f16 = function (parentName, childName) {
  return childName;
};
protoOf(AbstractJsonTreeDecoder).as = function (descriptor) {
  var currentObject = this.j1h();
  var tmp0_subject = descriptor.hq();
  var tmp;
  var tmp_0;
  if (equals(tmp0_subject, LIST_getInstance())) {
    tmp_0 = true;
  } else {
    tmp_0 = tmp0_subject instanceof PolymorphicKind;
  }
  if (tmp_0) {
    var tmp_1 = this.b1b();
    // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
    // Inline function 'kotlinx.serialization.json.internal.cast' call
    var serialName = descriptor.gq();
    if (!(currentObject instanceof JsonArray)) {
      var tmp_2 = getKClass(JsonArray).o();
      var tmp_3 = getKClassFromExpression(currentObject).o();
      var tmp$ret$0 = this.g16();
      throw JsonDecodingException_0(-1, 'Expected ' + tmp_2 + ', but had ' + tmp_3 + ' as the serialized body of ' + serialName + ' at element: ' + tmp$ret$0, toString(currentObject));
    }
    tmp = new JsonTreeListDecoder(tmp_1, currentObject);
  } else {
    if (equals(tmp0_subject, MAP_getInstance())) {
      // Inline function 'kotlinx.serialization.json.internal.selectMapMode' call
      var this_0 = this.b1b();
      var keyDescriptor = carrierDescriptor(descriptor.oq(0), this_0.os());
      var keyKind = keyDescriptor.hq();
      var tmp_4;
      var tmp_5;
      if (keyKind instanceof PrimitiveKind) {
        tmp_5 = true;
      } else {
        tmp_5 = equals(keyKind, ENUM_getInstance());
      }
      if (tmp_5) {
        var tmp_6 = this.b1b();
        // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
        // Inline function 'kotlinx.serialization.json.internal.cast' call
        var serialName_0 = descriptor.gq();
        if (!(currentObject instanceof JsonObject)) {
          var tmp_7 = getKClass(JsonObject).o();
          var tmp_8 = getKClassFromExpression(currentObject).o();
          var tmp$ret$3 = this.g16();
          throw JsonDecodingException_0(-1, 'Expected ' + tmp_7 + ', but had ' + tmp_8 + ' as the serialized body of ' + serialName_0 + ' at element: ' + tmp$ret$3, toString(currentObject));
        }
        tmp_4 = new JsonTreeMapDecoder(tmp_6, currentObject);
      } else {
        if (this_0.x18_1.n1a_1) {
          var tmp_9 = this.b1b();
          // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
          // Inline function 'kotlinx.serialization.json.internal.cast' call
          var serialName_1 = descriptor.gq();
          if (!(currentObject instanceof JsonArray)) {
            var tmp_10 = getKClass(JsonArray).o();
            var tmp_11 = getKClassFromExpression(currentObject).o();
            var tmp$ret$7 = this.g16();
            throw JsonDecodingException_0(-1, 'Expected ' + tmp_10 + ', but had ' + tmp_11 + ' as the serialized body of ' + serialName_1 + ' at element: ' + tmp$ret$7, toString(currentObject));
          }
          tmp_4 = new JsonTreeListDecoder(tmp_9, currentObject);
        } else {
          throw InvalidKeyKindException(keyDescriptor);
        }
      }
      tmp = tmp_4;
    } else {
      var tmp_12 = this.b1b();
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
      // Inline function 'kotlinx.serialization.json.internal.cast' call
      var serialName_2 = descriptor.gq();
      if (!(currentObject instanceof JsonObject)) {
        var tmp_13 = getKClass(JsonObject).o();
        var tmp_14 = getKClassFromExpression(currentObject).o();
        var tmp$ret$12 = this.g16();
        throw JsonDecodingException_0(-1, 'Expected ' + tmp_13 + ', but had ' + tmp_14 + ' as the serialized body of ' + serialName_2 + ' at element: ' + tmp$ret$12, toString(currentObject));
      }
      tmp = new JsonTreeDecoder(tmp_12, currentObject, this.g1h_1);
    }
  }
  return tmp;
};
protoOf(AbstractJsonTreeDecoder).bs = function (descriptor) {
};
protoOf(AbstractJsonTreeDecoder).lr = function () {
  var tmp = this.j1h();
  return !(tmp instanceof JsonNull);
};
protoOf(AbstractJsonTreeDecoder).l1h = function (tag, enumDescriptor) {
  var tmp = this.b1b();
  // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.getPrimitiveValue' call
  var tmp2 = this.k1h(tag);
  // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
  // Inline function 'kotlinx.serialization.json.internal.cast' call
  var serialName = enumDescriptor.gq();
  if (!(tmp2 instanceof JsonPrimitive)) {
    var tmp_0 = getKClass(JsonPrimitive).o();
    var tmp_1 = getKClassFromExpression(tmp2).o();
    var tmp$ret$0 = this.i1h(tag);
    throw JsonDecodingException_0(-1, 'Expected ' + tmp_0 + ', but had ' + tmp_1 + ' as the serialized body of ' + serialName + ' at element: ' + tmp$ret$0, toString(tmp2));
  }
  return getJsonNameIndexOrThrow(enumDescriptor, tmp, tmp2.e1b());
};
protoOf(AbstractJsonTreeDecoder).s16 = function (tag, enumDescriptor) {
  return this.l1h((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE(), enumDescriptor);
};
protoOf(AbstractJsonTreeDecoder).m1h = function (tag) {
  return !(this.k1h(tag) === JsonNull_getInstance());
};
protoOf(AbstractJsonTreeDecoder).i16 = function (tag) {
  return this.m1h((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE());
};
protoOf(AbstractJsonTreeDecoder).n1h = function (tag) {
  var tmp$ret$4;
  $l$block: {
    // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.getPrimitiveValue' call
    // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
    // Inline function 'kotlinx.serialization.json.internal.cast' call
    var value = this.k1h(tag);
    if (!(value instanceof JsonPrimitive)) {
      var tmp = getKClass(JsonPrimitive).o();
      var tmp_0 = getKClassFromExpression(value).o();
      var tmp$ret$0 = this.i1h(tag);
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
protoOf(AbstractJsonTreeDecoder).j16 = function (tag) {
  return this.n1h((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE());
};
protoOf(AbstractJsonTreeDecoder).o1h = function (tag) {
  var tmp$ret$5;
  $l$block: {
    // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.getPrimitiveValue' call
    // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
    // Inline function 'kotlinx.serialization.json.internal.cast' call
    var value = this.k1h(tag);
    if (!(value instanceof JsonPrimitive)) {
      var tmp = getKClass(JsonPrimitive).o();
      var tmp_0 = getKClassFromExpression(value).o();
      var tmp$ret$0 = this.i1h(tag);
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
protoOf(AbstractJsonTreeDecoder).k16 = function (tag) {
  return this.o1h((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE());
};
protoOf(AbstractJsonTreeDecoder).p1h = function (tag) {
  var tmp$ret$5;
  $l$block: {
    // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.getPrimitiveValue' call
    // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
    // Inline function 'kotlinx.serialization.json.internal.cast' call
    var value = this.k1h(tag);
    if (!(value instanceof JsonPrimitive)) {
      var tmp = getKClass(JsonPrimitive).o();
      var tmp_0 = getKClassFromExpression(value).o();
      var tmp$ret$0 = this.i1h(tag);
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
protoOf(AbstractJsonTreeDecoder).l16 = function (tag) {
  return this.p1h((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE());
};
protoOf(AbstractJsonTreeDecoder).q1h = function (tag) {
  var tmp$ret$5;
  $l$block: {
    // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.getPrimitiveValue' call
    // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
    // Inline function 'kotlinx.serialization.json.internal.cast' call
    var value = this.k1h(tag);
    if (!(value instanceof JsonPrimitive)) {
      var tmp = getKClass(JsonPrimitive).o();
      var tmp_0 = getKClassFromExpression(value).o();
      var tmp$ret$0 = this.i1h(tag);
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
protoOf(AbstractJsonTreeDecoder).m16 = function (tag) {
  return this.q1h((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE());
};
protoOf(AbstractJsonTreeDecoder).r1h = function (tag) {
  var tmp$ret$4;
  $l$block: {
    // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.getPrimitiveValue' call
    // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
    // Inline function 'kotlinx.serialization.json.internal.cast' call
    var value = this.k1h(tag);
    if (!(value instanceof JsonPrimitive)) {
      var tmp = getKClass(JsonPrimitive).o();
      var tmp_0 = getKClassFromExpression(value).o();
      var tmp$ret$0 = this.i1h(tag);
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
protoOf(AbstractJsonTreeDecoder).n16 = function (tag) {
  return this.r1h((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE());
};
protoOf(AbstractJsonTreeDecoder).s1h = function (tag) {
  var tmp$ret$4;
  $l$block: {
    // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.getPrimitiveValue' call
    // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
    // Inline function 'kotlinx.serialization.json.internal.cast' call
    var value = this.k1h(tag);
    if (!(value instanceof JsonPrimitive)) {
      var tmp = getKClass(JsonPrimitive).o();
      var tmp_0 = getKClassFromExpression(value).o();
      var tmp$ret$0 = this.i1h(tag);
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
  var specialFp = this.b1b().x18_1.u1a_1;
  if (specialFp || isFinite(result))
    return result;
  throw InvalidFloatingPointDecoded(result, tag, toString(this.j1h()));
};
protoOf(AbstractJsonTreeDecoder).o16 = function (tag) {
  return this.s1h((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE());
};
protoOf(AbstractJsonTreeDecoder).t1h = function (tag) {
  var tmp$ret$4;
  $l$block: {
    // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.getPrimitiveValue' call
    // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
    // Inline function 'kotlinx.serialization.json.internal.cast' call
    var value = this.k1h(tag);
    if (!(value instanceof JsonPrimitive)) {
      var tmp = getKClass(JsonPrimitive).o();
      var tmp_0 = getKClassFromExpression(value).o();
      var tmp$ret$0 = this.i1h(tag);
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
  var specialFp = this.b1b().x18_1.u1a_1;
  if (specialFp || isFinite_0(result))
    return result;
  throw InvalidFloatingPointDecoded(result, tag, toString(this.j1h()));
};
protoOf(AbstractJsonTreeDecoder).p16 = function (tag) {
  return this.t1h((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE());
};
protoOf(AbstractJsonTreeDecoder).u1h = function (tag) {
  var tmp$ret$4;
  $l$block: {
    // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.getPrimitiveValue' call
    // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
    // Inline function 'kotlinx.serialization.json.internal.cast' call
    var value = this.k1h(tag);
    if (!(value instanceof JsonPrimitive)) {
      var tmp = getKClass(JsonPrimitive).o();
      var tmp_0 = getKClassFromExpression(value).o();
      var tmp$ret$0 = this.i1h(tag);
      throw JsonDecodingException_0(-1, 'Expected ' + tmp + ', but had ' + tmp_0 + ' as the serialized body of ' + 'char' + ' at element: ' + tmp$ret$0, toString(value));
    }
    var literal = value;
    try {
      var tmp0_elvis_lhs = new Char(single(literal.e1b()));
      var tmp_1;
      if (tmp0_elvis_lhs == null) {
        unparsedPrimitive(this, literal, 'char', tag);
      } else {
        tmp_1 = tmp0_elvis_lhs;
      }
      tmp$ret$4 = tmp_1.f2_1;
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
protoOf(AbstractJsonTreeDecoder).q16 = function (tag) {
  return this.u1h((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE());
};
protoOf(AbstractJsonTreeDecoder).v1h = function (tag) {
  // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
  // Inline function 'kotlinx.serialization.json.internal.cast' call
  var value = this.k1h(tag);
  if (!(value instanceof JsonPrimitive)) {
    var tmp = getKClass(JsonPrimitive).o();
    var tmp_0 = getKClassFromExpression(value).o();
    var tmp$ret$0 = this.i1h(tag);
    throw JsonDecodingException_0(-1, 'Expected ' + tmp + ', but had ' + tmp_0 + ' as the serialized body of ' + 'string' + ' at element: ' + tmp$ret$0, toString(value));
  }
  var value_0 = value;
  if (!(value_0 instanceof JsonLiteral))
    throw JsonDecodingException_0(-1, "Expected string value for a non-null key '" + tag + "', got null literal instead at element: " + this.i1h(tag), toString(this.j1h()));
  if (!value_0.o1b_1 && !this.b1b().x18_1.m1a_1) {
    throw JsonDecodingException_0(-1, "String literal for key '" + tag + "' should be quoted at element: " + this.i1h(tag) + ".\nUse 'isLenient = true' in 'Json {}' builder to accept non-compliant JSON.", toString(this.j1h()));
  }
  return value_0.q1b_1;
};
protoOf(AbstractJsonTreeDecoder).r16 = function (tag) {
  return this.v1h((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE());
};
protoOf(AbstractJsonTreeDecoder).w1h = function (tag, inlineDescriptor) {
  var tmp;
  if (get_isUnsignedNumber(inlineDescriptor)) {
    var tmp_0 = this.b1b();
    // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.getPrimitiveValue' call
    var tmp2 = this.k1h(tag);
    // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
    // Inline function 'kotlinx.serialization.json.internal.cast' call
    var serialName = inlineDescriptor.gq();
    if (!(tmp2 instanceof JsonPrimitive)) {
      var tmp_1 = getKClass(JsonPrimitive).o();
      var tmp_2 = getKClassFromExpression(tmp2).o();
      var tmp$ret$0 = this.i1h(tag);
      throw JsonDecodingException_0(-1, 'Expected ' + tmp_1 + ', but had ' + tmp_2 + ' as the serialized body of ' + serialName + ' at element: ' + tmp$ret$0, toString(tmp2));
    }
    var lexer = StringJsonLexer_0(tmp_0, tmp2.e1b());
    tmp = new JsonDecoderForUnsignedTypes(lexer, this.b1b());
  } else {
    tmp = protoOf(NamedValueDecoder).t16.call(this, tag, inlineDescriptor);
  }
  return tmp;
};
protoOf(AbstractJsonTreeDecoder).t16 = function (tag, inlineDescriptor) {
  return this.w1h((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE(), inlineDescriptor);
};
protoOf(AbstractJsonTreeDecoder).xr = function (descriptor) {
  return !(this.e16() == null) ? protoOf(NamedValueDecoder).xr.call(this, descriptor) : (new JsonPrimitiveDecoder(this.b1b(), this.u1(), this.g1h_1)).xr(descriptor);
};
function setForceNull($this, descriptor, index) {
  $this.g1i_1 = (!$this.b1b().x18_1.p1a_1 && !descriptor.pq(index) && descriptor.oq(index).zp());
  return $this.g1i_1;
}
function JsonTreeDecoder(json, value, polymorphicDiscriminator, polyDescriptor) {
  polymorphicDiscriminator = polymorphicDiscriminator === VOID ? null : polymorphicDiscriminator;
  polyDescriptor = polyDescriptor === VOID ? null : polyDescriptor;
  AbstractJsonTreeDecoder.call(this, json, value, polymorphicDiscriminator);
  this.d1i_1 = value;
  this.e1i_1 = polyDescriptor;
  this.f1i_1 = 0;
  this.g1i_1 = false;
}
protoOf(JsonTreeDecoder).u1 = function () {
  return this.d1i_1;
};
protoOf(JsonTreeDecoder).qs = function (descriptor) {
  $l$loop: while (this.f1i_1 < descriptor.jq()) {
    var _unary__edvuaz = this.f1i_1;
    this.f1i_1 = _unary__edvuaz + 1 | 0;
    var name = this.z15(descriptor, _unary__edvuaz);
    var index = this.f1i_1 - 1 | 0;
    this.g1i_1 = false;
    var tmp;
    // Inline function 'kotlin.collections.contains' call
    // Inline function 'kotlin.collections.containsKey' call
    var this_0 = this.u1();
    if ((isInterface(this_0, KtMap) ? this_0 : THROW_CCE()).b3(name)) {
      tmp = true;
    } else {
      tmp = setForceNull(this, descriptor, index);
    }
    if (tmp) {
      if (!this.h1h_1.r1a_1)
        return index;
      var tmp0 = this.b1b();
      var tmp$ret$3;
      $l$block_2: {
        // Inline function 'kotlinx.serialization.json.internal.tryCoerceValue' call
        var isOptional = descriptor.pq(index);
        var elementDescriptor = descriptor.oq(index);
        var tmp_0;
        if (isOptional && !elementDescriptor.zp()) {
          var tmp_1 = this.h1i(name);
          tmp_0 = tmp_1 instanceof JsonNull;
        } else {
          tmp_0 = false;
        }
        if (tmp_0) {
          tmp$ret$3 = true;
          break $l$block_2;
        }
        if (equals(elementDescriptor.hq(), ENUM_getInstance())) {
          var tmp_2;
          if (elementDescriptor.zp()) {
            var tmp_3 = this.h1i(name);
            tmp_2 = tmp_3 instanceof JsonNull;
          } else {
            tmp_2 = false;
          }
          if (tmp_2) {
            tmp$ret$3 = false;
            break $l$block_2;
          }
          var tmp_4 = this.h1i(name);
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
          var coerceToNull = !tmp0.x18_1.p1a_1 && elementDescriptor.zp();
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
protoOf(JsonTreeDecoder).lr = function () {
  return !this.g1i_1 && protoOf(AbstractJsonTreeDecoder).lr.call(this);
};
protoOf(JsonTreeDecoder).a16 = function (descriptor, index) {
  var strategy = namingStrategy(descriptor, this.b1b());
  var baseName = descriptor.lq(index);
  if (strategy == null) {
    if (!this.h1h_1.v1a_1)
      return baseName;
    if (this.u1().z2().r2(baseName))
      return baseName;
  }
  var deserializationNamesMap_0 = deserializationNamesMap(this.b1b(), descriptor);
  // Inline function 'kotlin.collections.find' call
  var tmp0 = this.u1().z2();
  var tmp$ret$1;
  $l$block: {
    // Inline function 'kotlin.collections.firstOrNull' call
    var _iterator__ex2g4s = tmp0.t();
    while (_iterator__ex2g4s.u()) {
      var element = _iterator__ex2g4s.v();
      if (deserializationNamesMap_0.d3(element) === index) {
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
  var fallbackName = strategy == null ? null : strategy.x1d(descriptor, index, baseName);
  return fallbackName == null ? baseName : fallbackName;
};
protoOf(JsonTreeDecoder).k1h = function (tag) {
  return getValue(this.u1(), tag);
};
protoOf(JsonTreeDecoder).h1i = function (tag) {
  return this.u1().h1b(tag);
};
protoOf(JsonTreeDecoder).as = function (descriptor) {
  if (descriptor === this.e1i_1) {
    var tmp = this.b1b();
    var tmp2 = this.j1h();
    // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.cast' call
    // Inline function 'kotlinx.serialization.json.internal.cast' call
    var serialName = this.e1i_1.gq();
    if (!(tmp2 instanceof JsonObject)) {
      var tmp_0 = getKClass(JsonObject).o();
      var tmp_1 = getKClassFromExpression(tmp2).o();
      var tmp$ret$0 = this.g16();
      throw JsonDecodingException_0(-1, 'Expected ' + tmp_0 + ', but had ' + tmp_1 + ' as the serialized body of ' + serialName + ' at element: ' + tmp$ret$0, toString(tmp2));
    }
    return new JsonTreeDecoder(tmp, tmp2, this.g1h_1, this.e1i_1);
  }
  return protoOf(AbstractJsonTreeDecoder).as.call(this, descriptor);
};
protoOf(JsonTreeDecoder).bs = function (descriptor) {
  var tmp;
  if (ignoreUnknownKeys(descriptor, this.b1b())) {
    tmp = true;
  } else {
    var tmp_0 = descriptor.hq();
    tmp = tmp_0 instanceof PolymorphicKind;
  }
  if (tmp)
    return Unit_instance;
  var strategy = namingStrategy(descriptor, this.b1b());
  var tmp_1;
  if (strategy == null && !this.h1h_1.v1a_1) {
    tmp_1 = jsonCachedSerialNames(descriptor);
  } else if (!(strategy == null)) {
    tmp_1 = deserializationNamesMap(this.b1b(), descriptor).z2();
  } else {
    var tmp_2 = jsonCachedSerialNames(descriptor);
    var tmp0_safe_receiver = get_schemaCache(this.b1b()).i1g(descriptor, get_JsonDeserializationNamesKey());
    // Inline function 'kotlin.collections.orEmpty' call
    var tmp0_elvis_lhs = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.z2();
    var tmp$ret$0 = tmp0_elvis_lhs == null ? emptySet() : tmp0_elvis_lhs;
    tmp_1 = plus_0(tmp_2, tmp$ret$0);
  }
  var names = tmp_1;
  var _iterator__ex2g4s = this.u1().z2().t();
  while (_iterator__ex2g4s.u()) {
    var key = _iterator__ex2g4s.v();
    if (!names.r2(key) && !(key === this.g1h_1)) {
      throw JsonDecodingException_1(-1, "Encountered an unknown key '" + key + "' at element: " + this.g16() + '\n' + "Use 'ignoreUnknownKeys = true' in 'Json {}' builder or '@JsonIgnoreUnknownKeys' annotation to ignore unknown keys.\n" + ('JSON input: ' + toString(minify(this.u1().toString()))));
    }
  }
};
function JsonTreeListDecoder(json, value) {
  AbstractJsonTreeDecoder.call(this, json, value);
  this.o1i_1 = value;
  this.p1i_1 = this.o1i_1.l1();
  this.q1i_1 = -1;
}
protoOf(JsonTreeListDecoder).u1 = function () {
  return this.o1i_1;
};
protoOf(JsonTreeListDecoder).a16 = function (descriptor, index) {
  return index.toString();
};
protoOf(JsonTreeListDecoder).k1h = function (tag) {
  return this.o1i_1.m1(toInt(tag));
};
protoOf(JsonTreeListDecoder).qs = function (descriptor) {
  while (this.q1i_1 < (this.p1i_1 - 1 | 0)) {
    this.q1i_1 = this.q1i_1 + 1 | 0;
    return this.q1i_1;
  }
  return -1;
};
function JsonPrimitiveDecoder(json, value, polymorphicDiscriminator) {
  polymorphicDiscriminator = polymorphicDiscriminator === VOID ? null : polymorphicDiscriminator;
  AbstractJsonTreeDecoder.call(this, json, value, polymorphicDiscriminator);
  this.x1i_1 = value;
  this.u16('primitive');
}
protoOf(JsonPrimitiveDecoder).u1 = function () {
  return this.x1i_1;
};
protoOf(JsonPrimitiveDecoder).qs = function (descriptor) {
  return 0;
};
protoOf(JsonPrimitiveDecoder).k1h = function (tag) {
  // Inline function 'kotlin.require' call
  if (!(tag === 'primitive')) {
    var message = "This input can only handle primitives with 'primitive' tag";
    throw IllegalArgumentException_init_$Create$(toString(message));
  }
  return this.x1i_1;
};
function JsonTreeMapDecoder(json, value) {
  JsonTreeDecoder.call(this, json, value);
  this.i1j_1 = value;
  this.j1j_1 = toList(this.i1j_1.z2());
  this.k1j_1 = imul(this.j1j_1.l1(), 2);
  this.l1j_1 = -1;
}
protoOf(JsonTreeMapDecoder).u1 = function () {
  return this.i1j_1;
};
protoOf(JsonTreeMapDecoder).a16 = function (descriptor, index) {
  var i = index / 2 | 0;
  return this.j1j_1.m1(i);
};
protoOf(JsonTreeMapDecoder).qs = function (descriptor) {
  while (this.l1j_1 < (this.k1j_1 - 1 | 0)) {
    this.l1j_1 = this.l1j_1 + 1 | 0;
    return this.l1j_1;
  }
  return -1;
};
protoOf(JsonTreeMapDecoder).k1h = function (tag) {
  return (this.l1j_1 % 2 | 0) === 0 ? JsonPrimitive_0(tag) : getValue(this.i1j_1, tag);
};
protoOf(JsonTreeMapDecoder).bs = function (descriptor) {
};
function readPolymorphicJson(_this__u8e3s4, discriminator, element, deserializer) {
  return (new JsonTreeDecoder(_this__u8e3s4, element, discriminator, deserializer.zo())).zr(deserializer);
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
  this.v1g_1 = begin;
  this.w1g_1 = end;
}
function switchMode(_this__u8e3s4, desc) {
  var tmp0_subject = desc.hq();
  var tmp;
  if (tmp0_subject instanceof PolymorphicKind) {
    tmp = WriteMode_POLY_OBJ_getInstance();
  } else {
    if (equals(tmp0_subject, LIST_getInstance())) {
      tmp = WriteMode_LIST_getInstance();
    } else {
      if (equals(tmp0_subject, MAP_getInstance())) {
        // Inline function 'kotlinx.serialization.json.internal.selectMapMode' call
        var keyDescriptor = carrierDescriptor(desc.oq(0), _this__u8e3s4.os());
        var keyKind = keyDescriptor.hq();
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
          if (_this__u8e3s4.x18_1.n1a_1) {
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
  if (equals(_this__u8e3s4.hq(), CONTEXTUAL_getInstance())) {
    var tmp0_safe_receiver = getContextualDescriptor(module_0, _this__u8e3s4);
    var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : carrierDescriptor(tmp0_safe_receiver, module_0);
    tmp = tmp1_elvis_lhs == null ? _this__u8e3s4 : tmp1_elvis_lhs;
  } else if (_this__u8e3s4.iq()) {
    tmp = carrierDescriptor(_this__u8e3s4.oq(0), module_0);
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
  $this.m1j(lastPosition, current);
  return appendEsc($this, current + 1 | 0);
}
function decodedString($this, lastPosition, currentPosition) {
  $this.m1j(lastPosition, currentPosition);
  var result = $this.p19_1.toString();
  $this.p19_1.lc(0);
  return result;
}
function takePeeked($this) {
  // Inline function 'kotlin.also' call
  var this_0 = ensureNotNull($this.o19_1);
  $this.o19_1 = null;
  return this_0;
}
function wasUnquotedString($this) {
  return !(charSequenceGet($this.n1j(), $this.m19_1 - 1 | 0) === _Char___init__impl__6a9atx(34));
}
function appendEsc($this, startPosition) {
  var currentPosition = startPosition;
  currentPosition = $this.o1j(currentPosition);
  if (currentPosition === -1) {
    $this.t1d('Expected escape sequence to continue, got EOF');
  }
  var tmp = $this.n1j();
  var _unary__edvuaz = currentPosition;
  currentPosition = _unary__edvuaz + 1 | 0;
  var currentChar = charSequenceGet(tmp, _unary__edvuaz);
  if (currentChar === _Char___init__impl__6a9atx(117)) {
    return appendHex($this, $this.n1j(), currentPosition);
  }
  // Inline function 'kotlin.code' call
  var tmp$ret$0 = Char__toInt_impl_vasixd(currentChar);
  var c = escapeToChar(tmp$ret$0);
  if (c === _Char___init__impl__6a9atx(0)) {
    $this.t1d("Invalid escaped char '" + toString_1(currentChar) + "'");
  }
  $this.p19_1.s(c);
  return currentPosition;
}
function appendHex($this, source, startPos) {
  if ((startPos + 4 | 0) >= charSequenceLength(source)) {
    $this.m19_1 = startPos;
    $this.p1j();
    if (($this.m19_1 + 4 | 0) >= charSequenceLength(source)) {
      $this.t1d('Unexpected EOF during unicode escape');
    }
    return appendHex($this, source, $this.m19_1);
  }
  $this.p19_1.s(numberToChar((((fromHexChar($this, source, startPos) << 12) + (fromHexChar($this, source, startPos + 1 | 0) << 8) | 0) + (fromHexChar($this, source, startPos + 2 | 0) << 4) | 0) + fromHexChar($this, source, startPos + 3 | 0) | 0));
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
    $this.t1d("Invalid toHexChar char '" + toString_1(character) + "' in unicode escape");
  }
  return tmp;
}
function consumeBoolean2($this, start) {
  var current = $this.o1j(start);
  if (current >= charSequenceLength($this.n1j()) || current === -1) {
    $this.t1d('EOF');
  }
  var tmp = $this.n1j();
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
      $this.t1d("Expected valid boolean literal prefix, but had '" + $this.b1f() + "'");
    }
  }
  return tmp_0;
}
function consumeBooleanLiteral($this, literalSuffix, current) {
  if ((charSequenceLength($this.n1j()) - current | 0) < literalSuffix.length) {
    $this.t1d('Unexpected end of boolean literal');
  }
  var inductionVariable = 0;
  var last = charSequenceLength(literalSuffix) - 1 | 0;
  if (inductionVariable <= last)
    do {
      var i = inductionVariable;
      inductionVariable = inductionVariable + 1 | 0;
      var expected = charCodeAt(literalSuffix, i);
      var actual = charSequenceGet($this.n1j(), current + i | 0);
      // Inline function 'kotlin.code' call
      var tmp = Char__toInt_impl_vasixd(expected);
      // Inline function 'kotlin.code' call
      if (!(tmp === (Char__toInt_impl_vasixd(actual) | 32))) {
        $this.t1d("Expected valid boolean literal prefix, but had '" + $this.b1f() + "'");
      }
    }
     while (inductionVariable <= last);
  $this.m19_1 = current + literalSuffix.length | 0;
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
  this.m19_1 = 0;
  this.n19_1 = new JsonPath();
  this.o19_1 = null;
  this.p19_1 = StringBuilder_init_$Create$();
}
protoOf(AbstractJsonLexer).p1j = function () {
};
protoOf(AbstractJsonLexer).l1g = function () {
  var current = this.q1j();
  var source = this.n1j();
  if (current >= charSequenceLength(source) || current === -1)
    return false;
  if (charSequenceGet(source, current) === _Char___init__impl__6a9atx(44)) {
    this.m19_1 = this.m19_1 + 1 | 0;
    return true;
  }
  return false;
};
protoOf(AbstractJsonLexer).r1j = function (c) {
  return c === _Char___init__impl__6a9atx(125) || c === _Char___init__impl__6a9atx(93) || (c === _Char___init__impl__6a9atx(58) || c === _Char___init__impl__6a9atx(44)) ? false : true;
};
protoOf(AbstractJsonLexer).q19 = function () {
  var nextToken = this.d1f();
  if (!(nextToken === 10)) {
    this.t1d('Expected EOF after parsing, but had ' + toString_1(charSequenceGet(this.n1j(), this.m19_1 - 1 | 0)) + ' instead');
  }
};
protoOf(AbstractJsonLexer).x1e = function (expected) {
  var token = this.d1f();
  if (!(token === expected)) {
    // Inline function 'kotlinx.serialization.json.internal.AbstractJsonLexer.fail' call
    var expected_0 = tokenDescription(expected);
    var position = true ? this.m19_1 - 1 | 0 : this.m19_1;
    var s = this.m19_1 === charSequenceLength(this.n1j()) || position < 0 ? 'EOF' : toString_1(charSequenceGet(this.n1j(), position));
    var tmp$ret$0 = 'Expected ' + expected_0 + ", but had '" + s + "' instead";
    this.t1d(tmp$ret$0, position);
  }
  return token;
};
protoOf(AbstractJsonLexer).s1j = function (expected) {
  if (this.m19_1 > 0 && expected === _Char___init__impl__6a9atx(34)) {
    var tmp$ret$1;
    $l$block: {
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonLexer.withPositionRollback' call
      var snapshot = this.m19_1;
      try {
        this.m19_1 = this.m19_1 - 1 | 0;
        tmp$ret$1 = this.b1f();
        break $l$block;
      }finally {
        this.m19_1 = snapshot;
      }
    }
    var inputLiteral = tmp$ret$1;
    if (inputLiteral === 'null') {
      this.s1d("Expected string literal but 'null' literal was found", this.m19_1 - 1 | 0, "Use 'coerceInputValues = true' in 'Json {}' builder to coerce nulls if property has a default value.");
    }
  }
  // Inline function 'kotlinx.serialization.json.internal.AbstractJsonLexer.fail' call
  var expectedToken = charToTokenClass(expected);
  var expected_0 = tokenDescription(expectedToken);
  var position = true ? this.m19_1 - 1 | 0 : this.m19_1;
  var s = this.m19_1 === charSequenceLength(this.n1j()) || position < 0 ? 'EOF' : toString_1(charSequenceGet(this.n1j(), position));
  var tmp$ret$2 = 'Expected ' + expected_0 + ", but had '" + s + "' instead";
  this.t1d(tmp$ret$2, position);
};
protoOf(AbstractJsonLexer).y1e = function () {
  var source = this.n1j();
  var cpos = this.m19_1;
  $l$loop_0: while (true) {
    cpos = this.o1j(cpos);
    if (cpos === -1)
      break $l$loop_0;
    var ch = charSequenceGet(source, cpos);
    if (ch === _Char___init__impl__6a9atx(32) || ch === _Char___init__impl__6a9atx(10) || ch === _Char___init__impl__6a9atx(13) || ch === _Char___init__impl__6a9atx(9)) {
      cpos = cpos + 1 | 0;
      continue $l$loop_0;
    }
    this.m19_1 = cpos;
    return charToTokenClass(ch);
  }
  this.m19_1 = cpos;
  return 10;
};
protoOf(AbstractJsonLexer).m1g = function (doConsume) {
  var current = this.q1j();
  current = this.o1j(current);
  var len = charSequenceLength(this.n1j()) - current | 0;
  if (len < 4 || current === -1)
    return false;
  var inductionVariable = 0;
  if (inductionVariable <= 3)
    do {
      var i = inductionVariable;
      inductionVariable = inductionVariable + 1 | 0;
      if (!(charCodeAt('null', i) === charSequenceGet(this.n1j(), current + i | 0)))
        return false;
    }
     while (inductionVariable <= 3);
  if (len > 4 && charToTokenClass(charSequenceGet(this.n1j(), current + 4 | 0)) === 0)
    return false;
  if (doConsume) {
    this.m19_1 = current + 4 | 0;
  }
  return true;
};
protoOf(AbstractJsonLexer).x1g = function (doConsume, $super) {
  doConsume = doConsume === VOID ? true : doConsume;
  return $super === VOID ? this.m1g(doConsume) : $super.m1g.call(this, doConsume);
};
protoOf(AbstractJsonLexer).n1g = function (isLenient) {
  var token = this.y1e();
  var tmp;
  if (isLenient) {
    if (!(token === 1) && !(token === 0))
      return null;
    tmp = this.b1f();
  } else {
    if (!(token === 1))
      return null;
    tmp = this.a1f();
  }
  var string = tmp;
  this.o19_1 = string;
  return string;
};
protoOf(AbstractJsonLexer).t1j = function () {
  this.o19_1 = null;
};
protoOf(AbstractJsonLexer).mc = function (startPos, endPos) {
  // Inline function 'kotlin.text.substring' call
  var this_0 = this.n1j();
  return toString(charSequenceSubSequence(this_0, startPos, endPos));
};
protoOf(AbstractJsonLexer).a1f = function () {
  if (!(this.o19_1 == null)) {
    return takePeeked(this);
  }
  return this.q1g();
};
protoOf(AbstractJsonLexer).consumeString2 = function (source, startPosition, current) {
  var currentPosition = current;
  var lastPosition = startPosition;
  var char = charSequenceGet(source, currentPosition);
  var usedAppend = false;
  while (!(char === _Char___init__impl__6a9atx(34))) {
    if (char === _Char___init__impl__6a9atx(92)) {
      usedAppend = true;
      currentPosition = this.o1j(appendEscape(this, lastPosition, currentPosition));
      if (currentPosition === -1) {
        this.t1d('Unexpected EOF', currentPosition);
      }
      lastPosition = currentPosition;
    } else {
      currentPosition = currentPosition + 1 | 0;
      if (currentPosition >= charSequenceLength(source)) {
        usedAppend = true;
        this.m1j(lastPosition, currentPosition);
        currentPosition = this.o1j(currentPosition);
        if (currentPosition === -1) {
          this.t1d('Unexpected EOF', currentPosition);
        }
        lastPosition = currentPosition;
      }
    }
    char = charSequenceGet(source, currentPosition);
  }
  var tmp;
  if (!usedAppend) {
    tmp = this.mc(lastPosition, currentPosition);
  } else {
    tmp = decodedString(this, lastPosition, currentPosition);
  }
  var string = tmp;
  this.m19_1 = currentPosition + 1 | 0;
  return string;
};
protoOf(AbstractJsonLexer).r1g = function () {
  var result = this.b1f();
  if (result === 'null' && wasUnquotedString(this)) {
    this.t1d("Unexpected 'null' value instead of string literal");
  }
  return result;
};
protoOf(AbstractJsonLexer).b1f = function () {
  if (!(this.o19_1 == null)) {
    return takePeeked(this);
  }
  var current = this.q1j();
  if (current >= charSequenceLength(this.n1j()) || current === -1) {
    this.t1d('EOF', current);
  }
  var token = charToTokenClass(charSequenceGet(this.n1j(), current));
  if (token === 1) {
    return this.a1f();
  }
  if (!(token === 0)) {
    this.t1d('Expected beginning of the string, but got ' + toString_1(charSequenceGet(this.n1j(), current)));
  }
  var usedAppend = false;
  while (charToTokenClass(charSequenceGet(this.n1j(), current)) === 0) {
    current = current + 1 | 0;
    if (current >= charSequenceLength(this.n1j())) {
      usedAppend = true;
      this.m1j(this.m19_1, current);
      var eof = this.o1j(current);
      if (eof === -1) {
        this.m19_1 = current;
        return decodedString(this, 0, 0);
      } else {
        current = eof;
      }
    }
  }
  var tmp;
  if (!usedAppend) {
    tmp = this.mc(this.m19_1, current);
  } else {
    tmp = decodedString(this, this.m19_1, current);
  }
  var result = tmp;
  this.m19_1 = current;
  return result;
};
protoOf(AbstractJsonLexer).m1j = function (fromIndex, toIndex) {
  this.p19_1.gc(this.n1j(), fromIndex, toIndex);
};
protoOf(AbstractJsonLexer).p1g = function (allowLenientStrings) {
  // Inline function 'kotlin.collections.mutableListOf' call
  var tokenStack = ArrayList_init_$Create$();
  var lastToken = this.y1e();
  if (!(lastToken === 8) && !(lastToken === 6)) {
    this.b1f();
    return Unit_instance;
  }
  $l$loop: while (true) {
    lastToken = this.y1e();
    if (lastToken === 1) {
      if (allowLenientStrings)
        this.b1f();
      else
        this.q1g();
      continue $l$loop;
    }
    var tmp0_subject = lastToken;
    if (tmp0_subject === 8 || tmp0_subject === 6) {
      tokenStack.b1(lastToken);
    } else if (tmp0_subject === 9) {
      if (!(last(tokenStack) === 8))
        throw JsonDecodingException_0(this.m19_1, 'found ] instead of } at path: ' + this.n19_1.toString(), this.n1j());
      removeLast(tokenStack);
    } else if (tmp0_subject === 7) {
      if (!(last(tokenStack) === 6))
        throw JsonDecodingException_0(this.m19_1, 'found } instead of ] at path: ' + this.n19_1.toString(), this.n1j());
      removeLast(tokenStack);
    } else if (tmp0_subject === 10) {
      this.t1d('Unexpected end of input due to malformed JSON during ignoring unknown keys');
    }
    this.d1f();
    if (tokenStack.l1() === 0)
      return Unit_instance;
  }
};
protoOf(AbstractJsonLexer).toString = function () {
  return "JsonReader(source='" + toString(this.n1j()) + "', currentPosition=" + this.m19_1 + ')';
};
protoOf(AbstractJsonLexer).o1g = function (key) {
  var processed = this.mc(0, this.m19_1);
  var lastIndexOf_0 = lastIndexOf(processed, key);
  throw new JsonDecodingException("Encountered an unknown key '" + key + "' at offset " + lastIndexOf_0 + ' at path: ' + this.n19_1.g1e() + "\nUse 'ignoreUnknownKeys = true' in 'Json {}' builder or '@JsonIgnoreUnknownKeys' annotation to ignore unknown keys.\n" + ('JSON input: ' + toString(minify(this.n1j(), lastIndexOf_0))));
};
protoOf(AbstractJsonLexer).s1d = function (message, position, hint) {
  var tmp;
  // Inline function 'kotlin.text.isEmpty' call
  if (charSequenceLength(hint) === 0) {
    tmp = '';
  } else {
    tmp = '\n' + hint;
  }
  var hintMessage = tmp;
  throw JsonDecodingException_0(position, message + ' at path: ' + this.n19_1.g1e() + hintMessage, this.n1j());
};
protoOf(AbstractJsonLexer).t1d = function (message, position, hint, $super) {
  position = position === VOID ? this.m19_1 : position;
  hint = hint === VOID ? '' : hint;
  return $super === VOID ? this.s1d(message, position, hint) : $super.s1d.call(this, message, position, hint);
};
protoOf(AbstractJsonLexer).z1g = function () {
  var current = this.q1j();
  current = this.o1j(current);
  if (current >= charSequenceLength(this.n1j()) || current === -1) {
    this.t1d('EOF');
  }
  var tmp;
  if (charSequenceGet(this.n1j(), current) === _Char___init__impl__6a9atx(34)) {
    current = current + 1 | 0;
    if (current === charSequenceLength(this.n1j())) {
      this.t1d('EOF');
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
  $l$loop_4: while (!(current === charSequenceLength(this.n1j()))) {
    var ch = charSequenceGet(this.n1j(), current);
    if ((ch === _Char___init__impl__6a9atx(101) || ch === _Char___init__impl__6a9atx(69)) && !hasExponent) {
      if (current === start) {
        this.t1d('Unexpected symbol ' + toString_1(ch) + ' in numeric literal');
      }
      isExponentPositive = true;
      hasExponent = true;
      current = current + 1 | 0;
      continue $l$loop_4;
    }
    if (ch === _Char___init__impl__6a9atx(45) && hasExponent) {
      if (current === start) {
        this.t1d("Unexpected symbol '-' in numeric literal");
      }
      isExponentPositive = false;
      current = current + 1 | 0;
      continue $l$loop_4;
    }
    if (ch === _Char___init__impl__6a9atx(43) && hasExponent) {
      if (current === start) {
        this.t1d("Unexpected symbol '+' in numeric literal");
      }
      isExponentPositive = true;
      current = current + 1 | 0;
      continue $l$loop_4;
    }
    if (ch === _Char___init__impl__6a9atx(45)) {
      if (!(current === start)) {
        this.t1d("Unexpected symbol '-' in numeric literal");
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
      this.t1d("Unexpected symbol '" + toString_1(ch) + "' in numeric literal");
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
      this.t1d('Numeric value overflow');
    }
  }
  var hasChars = !(current === start);
  if (start === current || (isNegative && start === (current - 1 | 0))) {
    this.t1d('Expected numeric literal');
  }
  if (hasQuotation) {
    if (!hasChars) {
      this.t1d('EOF');
    }
    if (!(charSequenceGet(this.n1j(), current) === _Char___init__impl__6a9atx(34))) {
      this.t1d('Expected closing quotation mark');
    }
    current = current + 1 | 0;
  }
  this.m19_1 = current;
  if (hasExponent) {
    var doubleAccumulator = toNumber(accumulator) * consumeNumericLiteral$calculateExponent(exponentAccumulator, isExponentPositive);
    if (doubleAccumulator > toNumber(new Long(-1, 2147483647)) || doubleAccumulator < toNumber(new Long(0, -2147483648))) {
      this.t1d('Numeric value overflow');
    }
    // Inline function 'kotlin.math.floor' call
    if (!(Math.floor(doubleAccumulator) === doubleAccumulator)) {
      this.t1d("Can't convert " + doubleAccumulator + ' to Long');
    }
    accumulator = numberToLong(doubleAccumulator);
  }
  var tmp_0;
  if (isNegative) {
    tmp_0 = accumulator;
  } else if (!equalsLong(accumulator, new Long(0, -2147483648))) {
    tmp_0 = negate(accumulator);
  } else {
    this.t1d('Numeric value overflow');
  }
  return tmp_0;
};
protoOf(AbstractJsonLexer).r1b = function () {
  var result = this.z1g();
  var next = this.d1f();
  if (!(next === 10)) {
    // Inline function 'kotlinx.serialization.json.internal.AbstractJsonLexer.fail' call
    var expected = tokenDescription(10);
    var position = true ? this.m19_1 - 1 | 0 : this.m19_1;
    var s = this.m19_1 === charSequenceLength(this.n1j()) || position < 0 ? 'EOF' : toString_1(charSequenceGet(this.n1j(), position));
    var tmp$ret$0 = "Expected input to contain a single valid number, but got '" + s + "' after it";
    this.t1d(tmp$ret$0, position);
  }
  return result;
};
protoOf(AbstractJsonLexer).y1g = function () {
  var current = this.q1j();
  if (current === charSequenceLength(this.n1j())) {
    this.t1d('EOF');
  }
  var tmp;
  if (charSequenceGet(this.n1j(), current) === _Char___init__impl__6a9atx(34)) {
    current = current + 1 | 0;
    tmp = true;
  } else {
    tmp = false;
  }
  var hasQuotation = tmp;
  var result = consumeBoolean2(this, current);
  if (hasQuotation) {
    if (this.m19_1 === charSequenceLength(this.n1j())) {
      this.t1d('EOF');
    }
    if (!(charSequenceGet(this.n1j(), this.m19_1) === _Char___init__impl__6a9atx(34))) {
      this.t1d('Expected closing quotation mark');
    }
    this.m19_1 = this.m19_1 + 1 | 0;
  }
  return result;
};
function charToTokenClass(c) {
  var tmp;
  // Inline function 'kotlin.code' call
  if (Char__toInt_impl_vasixd(c) < 126) {
    var tmp_0 = CharMappings_getInstance().v1j_1;
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
  return c < 117 ? CharMappings_getInstance().u1j_1[c] : _Char___init__impl__6a9atx(0);
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
    $this.u1j_1[tmp$ret$0] = numberToChar(c);
  }
}
function initC2ESC_0($this, c, esc) {
  // Inline function 'kotlin.code' call
  var tmp$ret$0 = Char__toInt_impl_vasixd(c);
  return initC2ESC($this, tmp$ret$0, esc);
}
function initC2TC($this, c, cl) {
  $this.v1j_1[c] = cl;
}
function initC2TC_0($this, c, cl) {
  // Inline function 'kotlin.code' call
  var tmp$ret$0 = Char__toInt_impl_vasixd(c);
  return initC2TC($this, tmp$ret$0, cl);
}
function CharMappings() {
  CharMappings_instance = this;
  this.u1j_1 = charArray(117);
  this.v1j_1 = new Int8Array(126);
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
protoOf(StringJsonLexerWithComments).d1f = function () {
  var source = this.n1j();
  var cpos = this.q1j();
  if (cpos >= source.length || cpos === -1)
    return 10;
  this.m19_1 = cpos + 1 | 0;
  return charToTokenClass(charCodeAt(source, cpos));
};
protoOf(StringJsonLexerWithComments).z1e = function () {
  var current = this.q1j();
  if (current >= this.n1j().length || current === -1)
    return false;
  return this.r1j(charCodeAt(this.n1j(), current));
};
protoOf(StringJsonLexerWithComments).k1g = function (expected) {
  var source = this.n1j();
  var current = this.q1j();
  if (current >= source.length || current === -1) {
    this.m19_1 = -1;
    this.s1j(expected);
  }
  var c = charCodeAt(source, current);
  this.m19_1 = current + 1 | 0;
  if (c === expected)
    return Unit_instance;
  else {
    this.s1j(expected);
  }
};
protoOf(StringJsonLexerWithComments).y1e = function () {
  var source = this.n1j();
  var cpos = this.q1j();
  if (cpos >= source.length || cpos === -1)
    return 10;
  this.m19_1 = cpos;
  return charToTokenClass(charCodeAt(source, cpos));
};
protoOf(StringJsonLexerWithComments).q1j = function () {
  var current = this.m19_1;
  if (current === -1)
    return current;
  var source = this.n1j();
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
          this.m19_1 = source.length;
          this.t1d('Expected end of the block comment: "*/", but had EOF instead');
        } else {
          current = current + 2 | 0;
        }
        continue $l$loop_1;
      }
    }
    break $l$loop_1;
  }
  this.m19_1 = current;
  return current;
};
function StringJsonLexer(source) {
  AbstractJsonLexer.call(this);
  this.f1k_1 = source;
}
protoOf(StringJsonLexer).n1j = function () {
  return this.f1k_1;
};
protoOf(StringJsonLexer).o1j = function (position) {
  return position < this.n1j().length ? position : -1;
};
protoOf(StringJsonLexer).d1f = function () {
  var source = this.n1j();
  var cpos = this.m19_1;
  $l$loop: while (!(cpos === -1) && cpos < source.length) {
    var _unary__edvuaz = cpos;
    cpos = _unary__edvuaz + 1 | 0;
    var c = charCodeAt(source, _unary__edvuaz);
    // Inline function 'kotlinx.serialization.json.internal.AbstractJsonLexer.isWs' call
    if (c === _Char___init__impl__6a9atx(32) || c === _Char___init__impl__6a9atx(10) || c === _Char___init__impl__6a9atx(13) || c === _Char___init__impl__6a9atx(9))
      continue $l$loop;
    this.m19_1 = cpos;
    return charToTokenClass(c);
  }
  this.m19_1 = source.length;
  return 10;
};
protoOf(StringJsonLexer).z1e = function () {
  var current = this.m19_1;
  if (current === -1)
    return false;
  var source = this.n1j();
  $l$loop: while (current < source.length) {
    var c = charCodeAt(source, current);
    // Inline function 'kotlinx.serialization.json.internal.AbstractJsonLexer.isWs' call
    if (c === _Char___init__impl__6a9atx(32) || c === _Char___init__impl__6a9atx(10) || c === _Char___init__impl__6a9atx(13) || c === _Char___init__impl__6a9atx(9)) {
      current = current + 1 | 0;
      continue $l$loop;
    }
    this.m19_1 = current;
    return this.r1j(c);
  }
  this.m19_1 = current;
  return false;
};
protoOf(StringJsonLexer).q1j = function () {
  var current = this.m19_1;
  if (current === -1)
    return current;
  var source = this.n1j();
  $l$loop: while (current < source.length) {
    var c = charCodeAt(source, current);
    // Inline function 'kotlinx.serialization.json.internal.AbstractJsonLexer.isWs' call
    if (c === _Char___init__impl__6a9atx(32) || c === _Char___init__impl__6a9atx(10) || c === _Char___init__impl__6a9atx(13) || c === _Char___init__impl__6a9atx(9)) {
      current = current + 1 | 0;
    } else {
      break $l$loop;
    }
  }
  this.m19_1 = current;
  return current;
};
protoOf(StringJsonLexer).k1g = function (expected) {
  if (this.m19_1 === -1) {
    this.s1j(expected);
  }
  var source = this.n1j();
  var cpos = this.m19_1;
  $l$loop: while (cpos < source.length) {
    var _unary__edvuaz = cpos;
    cpos = _unary__edvuaz + 1 | 0;
    var c = charCodeAt(source, _unary__edvuaz);
    // Inline function 'kotlinx.serialization.json.internal.AbstractJsonLexer.isWs' call
    if (c === _Char___init__impl__6a9atx(32) || c === _Char___init__impl__6a9atx(10) || c === _Char___init__impl__6a9atx(13) || c === _Char___init__impl__6a9atx(9))
      continue $l$loop;
    this.m19_1 = cpos;
    if (c === expected)
      return Unit_instance;
    this.s1j(expected);
  }
  this.m19_1 = -1;
  this.s1j(expected);
};
protoOf(StringJsonLexer).q1g = function () {
  this.k1g(_Char___init__impl__6a9atx(34));
  var current = this.m19_1;
  var closingQuote = indexOf_0(this.n1j(), _Char___init__impl__6a9atx(34), current);
  if (closingQuote === -1) {
    this.b1f();
    // Inline function 'kotlinx.serialization.json.internal.AbstractJsonLexer.fail' call
    var expected = tokenDescription(1);
    var position = false ? this.m19_1 - 1 | 0 : this.m19_1;
    var s = this.m19_1 === charSequenceLength(this.n1j()) || position < 0 ? 'EOF' : toString_1(charSequenceGet(this.n1j(), position));
    var tmp$ret$0 = 'Expected ' + expected + ", but had '" + s + "' instead";
    this.t1d(tmp$ret$0, position);
  }
  var inductionVariable = current;
  if (inductionVariable < closingQuote)
    do {
      var i = inductionVariable;
      inductionVariable = inductionVariable + 1 | 0;
      if (charCodeAt(this.n1j(), i) === _Char___init__impl__6a9atx(92)) {
        return this.consumeString2(this.n1j(), this.m19_1, i);
      }
    }
     while (inductionVariable < closingQuote);
  this.m19_1 = closingQuote + 1 | 0;
  return substring(this.n1j(), current, closingQuote);
};
protoOf(StringJsonLexer).s1g = function (keyToMatch, isLenient) {
  var positionSnapshot = this.m19_1;
  try {
    if (!(this.d1f() === 6))
      return null;
    var firstKey = this.n1g(isLenient);
    if (!(firstKey === keyToMatch))
      return null;
    this.t1j();
    if (!(this.d1f() === 5))
      return null;
    return this.n1g(isLenient);
  }finally {
    this.m19_1 = positionSnapshot;
    this.t1j();
  }
};
function StringJsonLexer_0(json, source) {
  return !json.x18_1.z1a_1 ? new StringJsonLexer(source) : new StringJsonLexerWithComments(source);
}
function get_schemaCache(_this__u8e3s4) {
  return _this__u8e3s4.z18_1;
}
function JsonToStringWriter() {
  this.c19_1 = StringBuilder_init_$Create$_0(128);
}
protoOf(JsonToStringWriter).x1c = function (value) {
  this.c19_1.jc(value);
};
protoOf(JsonToStringWriter).r1c = function (char) {
  this.c19_1.s(char);
};
protoOf(JsonToStringWriter).t1c = function (text) {
  this.c19_1.q(text);
};
protoOf(JsonToStringWriter).d1d = function (text) {
  printQuoted(this.c19_1, text);
};
protoOf(JsonToStringWriter).d19 = function () {
  this.c19_1.oc();
};
protoOf(JsonToStringWriter).toString = function () {
  return this.c19_1.toString();
};
function createMapForCache(initialCapacity) {
  return HashMap_init_$Create$(initialCapacity);
}
//region block: post-declaration
protoOf(defer$1).zp = get_isNullable;
protoOf(defer$1).iq = get_isInline;
protoOf(defer$1).kq = get_annotations;
protoOf(JsonSerializersModuleValidator).q18 = contextual;
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
  Default_getInstance as Default_getInstancejkv49nkel8hp,
  JsonNull_getInstance as JsonNull_getInstance3cean630pgfyb,
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
