import {
  KProperty02ce7r476m8633 as KProperty0,
  getPropertyCallableRef3hckxc0xueiaj as getPropertyCallableRef,
  drop258un2a8hqa2a as drop,
  Unit_instance1fbcbse1fwigr as Unit_instance,
  CoroutineImpl2sn3kjnwmfr10 as CoroutineImpl,
  protoOf180f3jzyo7rfj as protoOf,
  THROW_CCE2g6jy02ryeudk as THROW_CCE,
  isInterface3d6p8outrmvmk as isInterface,
  StringBuilder_init_$Create$2qsge4ydj6bin as StringBuilder_init_$Create$,
  get_COROUTINE_SUSPENDED3ujt3p13qm4iy as get_COROUTINE_SUSPENDED,
  charSequenceLength3278n89t01tmv as charSequenceLength,
  charCodeAt1yspne1d8erbm as charCodeAt,
  _Char___init__impl__6a9atx2js6krycynjoo as _Char___init__impl__6a9atx,
  indexOf1xbs558u7wr52 as indexOf,
  substringiqarkczpya5m as substring,
  substring3saq8ornu0luv as substring_0,
  initMetadataForLambda3af3he42mmnh as initMetadataForLambda,
  VOID3gxj6tk5isa35 as VOID,
  mapCapacity1h45rc3eh9p2l as mapCapacity,
  coerceAtLeast2bkz8m9ik7hep as coerceAtLeast,
  LinkedHashMap_init_$Create$23uxki4opd0pn as LinkedHashMap_init_$Create$,
  lazy2hsh8ze7j6ikd as lazy,
  get_EmptyContinuationn1rwa6yr6j5w as get_EmptyContinuation,
} from './kotlin-kotlin-stdlib.mjs';
import {
  set_envGetter3hvxpspjt59gr as set_envGetter,
  set_fileSystemGetter1gjx570slh9n as set_fileSystemGetter,
  set_readLineFromStdinImplguzbi4v6m34i as set_readLineFromStdinImpl,
  parseArguments2lef1fjjpcnj4 as parseArguments,
  showUsage1kmttarfmwnj8 as showUsage,
  ShowUsage11o4la4sguagx as ShowUsage,
  get_scope34wtnlfbrnd6v as get_scope,
  get_Object_keys2nolb0l4j8r2q as get_Object_keys,
  createJsMounts3lknrl24nfeh1 as createJsMounts,
  main2ez4fwmz3w728 as main,
} from './xarpite-core.mjs';
import {
  coroutineScope284yy3flyb2v2 as coroutineScope,
  flow3tazazxj2t7g4 as flow,
  produceIn1f86ul3o3s9a0 as produceIn,
  FlowCollector26clgpmzihvke as FlowCollector,
  await20nhgj9iqzkt as await_0,
  ChannelResult2y4k69ac6y3du as ChannelResult,
  ChannelResult__getOrNull_impl_f5e07h1mddh1y59r3zw as ChannelResult__getOrNull_impl_f5e07h,
  CoroutineScopefcb5f5dwqcas as CoroutineScope,
} from './kotlinx-coroutines-core.mjs';
import { NodeJsFileSystem_getInstance3ojwnh341fjb5 as NodeJsFileSystem_getInstance } from './okio-parent-okio-nodefilesystem.mjs';
//region block: imports
//endregion
//region block: pre-declaration
initMetadataForLambda(readLineFromStdinIterator$delegate$lambda$slambda, CoroutineImpl, VOID, [1]);
initMetadataForLambda(main$slambda, CoroutineImpl, VOID, [0]);
initMetadataForLambda(main$slambda_1, CoroutineImpl, VOID, [1]);
//endregion
function get_readLineFromStdinIterator() {
  _init_properties_JsNodeMain_kt__uafobg();
  var tmp0 = readLineFromStdinIterator$delegate;
  var tmp = KProperty0;
  // Inline function 'kotlin.getValue' call
  getPropertyCallableRef('readLineFromStdinIterator', 0, tmp, _get_readLineFromStdinIterator_$ref_1patxe(), null);
  return tmp0.m2();
}
var readLineFromStdinIterator$delegate;
function main_0($completion) {
  set_envGetter(main$lambda);
  set_fileSystemGetter(main$lambda_0);
  set_readLineFromStdinImpl(main$slambda_0(null));
  var tmp;
  try {
    tmp = parseArguments(drop(get_process().argv, 2));
  } catch ($p) {
    var tmp_0;
    if ($p instanceof ShowUsage) {
      var _unused_var__etf5q3 = $p;
      showUsage();
      return Unit_instance;
    } else {
      throw $p;
    }
  }
  var options = tmp;
  return coroutineScope(main$slambda_2(options, null), $completion);
}
function readLineFromStdinIterator$delegate$lambda() {
  _init_properties_JsNodeMain_kt__uafobg();
  return produceIn(flow(readLineFromStdinIterator$delegate$lambda$slambda_0(null)), get_scope());
}
function readLineFromStdinIterator$delegate$lambda$slambda(resultContinuation) {
  CoroutineImpl.call(this, resultContinuation);
}
protoOf(readLineFromStdinIterator$delegate$lambda$slambda).p74 = function ($this$flow, $completion) {
  var tmp = this.q74($this$flow, $completion);
  tmp.m8_1 = Unit_instance;
  tmp.n8_1 = null;
  return tmp.s8();
};
protoOf(readLineFromStdinIterator$delegate$lambda$slambda).b9 = function (p1, $completion) {
  return this.p74((!(p1 == null) ? isInterface(p1, FlowCollector) : false) ? p1 : THROW_CCE(), $completion);
};
protoOf(readLineFromStdinIterator$delegate$lambda$slambda).s8 = function () {
  var suspendResult = this.m8_1;
  $sm: do
    try {
      var tmp = this.k8_1;
      switch (tmp) {
        case 0:
          this.l8_1 = 11;
          get_process().stdin.setEncoding('utf8');
          this.o74_1 = function (x) {
            return x[Symbol.asyncIterator]();
          }(get_process().stdin);
          this.i74_1 = StringBuilder_init_$Create$();
          this.j74_1 = false;
          this.k8_1 = 1;
          continue $sm;
        case 1:
          if (!true) {
            this.k8_1 = 12;
            continue $sm;
          }

          this.k8_1 = 2;
          var this_0 = this.o74_1.next();
          suspendResult = await_0(this_0, this);
          if (suspendResult === get_COROUTINE_SUSPENDED()) {
            return suspendResult;
          }

          continue $sm;
        case 2:
          this.n74_1 = suspendResult;
          if (this.n74_1.done) {
            var this_1 = this.i74_1;
            if (charSequenceLength(this_1) > 0) {
              this.k8_1 = 9;
              suspendResult = this.h74_1.k22(this.i74_1.toString(), this);
              if (suspendResult === get_COROUTINE_SUSPENDED()) {
                return suspendResult;
              }
              continue $sm;
            } else {
              this.k8_1 = 10;
              continue $sm;
            }
          } else {
            this.k8_1 = 3;
            continue $sm;
          }

        case 3:
          var tmp_0 = this;
          tmp_0.l74_1 = this.n74_1.value;
          this.m74_1 = 0;
          this.k8_1 = 4;
          continue $sm;
        case 4:
          if (!(this.m74_1 < this.l74_1.length)) {
            this.k8_1 = 8;
            continue $sm;
          }

          if (this.j74_1 && charCodeAt(this.l74_1, this.m74_1) === _Char___init__impl__6a9atx(10)) {
            this.m74_1 = this.m74_1 + 1 | 0;
            this.j74_1 = false;
            this.k8_1 = 4;
            continue $sm;
          } else {
            this.k8_1 = 5;
            continue $sm;
          }

        case 5:
          var r = indexOf(this.l74_1, _Char___init__impl__6a9atx(13), this.m74_1);
          var n = indexOf(this.l74_1, _Char___init__impl__6a9atx(10), this.m74_1);
          var tmp_1 = this;
          var tmp_2;
          if (r === -1) {
            tmp_2 = n;
          } else if (n === -1) {
            tmp_2 = r;
          } else {
            tmp_2 = Math.min(r, n);
          }

          tmp_1.k74_1 = tmp_2;
          if (this.k74_1 === -1) {
            this.i74_1.r7(substring_0(this.l74_1, this.m74_1));
            this.m74_1 = this.l74_1.length;
            this.j74_1 = false;
            this.k8_1 = 7;
            continue $sm;
          } else {
            this.i74_1.r7(substring(this.l74_1, this.m74_1, this.k74_1));
            this.k8_1 = 6;
            suspendResult = this.h74_1.k22(this.i74_1.toString(), this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }
            continue $sm;
          }

        case 6:
          this.i74_1.pb();
          this.m74_1 = this.k74_1 + 1 | 0;
          this.j74_1 = charCodeAt(this.l74_1, this.k74_1) === _Char___init__impl__6a9atx(13);
          this.k8_1 = 7;
          continue $sm;
        case 7:
          this.k8_1 = 4;
          continue $sm;
        case 8:
          this.k8_1 = 1;
          continue $sm;
        case 9:
          this.i74_1.pb();
          this.k8_1 = 10;
          continue $sm;
        case 10:
          this.k8_1 = 12;
          continue $sm;
        case 11:
          throw this.n8_1;
        case 12:
          return Unit_instance;
      }
    } catch ($p) {
      var e = $p;
      if (this.l8_1 === 11) {
        throw e;
      } else {
        this.k8_1 = this.l8_1;
        this.n8_1 = e;
      }
    }
   while (true);
};
protoOf(readLineFromStdinIterator$delegate$lambda$slambda).q74 = function ($this$flow, completion) {
  var i = new readLineFromStdinIterator$delegate$lambda$slambda(completion);
  i.h74_1 = $this$flow;
  return i;
};
function readLineFromStdinIterator$delegate$lambda$slambda_0(resultContinuation) {
  var i = new readLineFromStdinIterator$delegate$lambda$slambda(resultContinuation);
  var l = function ($this$flow, $completion) {
    return i.p74($this$flow, $completion);
  };
  l.$arity = 1;
  return l;
}
function _get_readLineFromStdinIterator_$ref_1patxe() {
  return function () {
    return get_readLineFromStdinIterator();
  };
}
function main$lambda() {
  _init_properties_JsNodeMain_kt__uafobg();
  var env = get_process().env;
  // Inline function 'kotlin.collections.associateWith' call
  var this_0 = get_Object_keys()(env);
  var result = LinkedHashMap_init_$Create$(coerceAtLeast(mapCapacity(this_0.length), 16));
  // Inline function 'kotlin.collections.associateWithTo' call
  var inductionVariable = 0;
  var last = this_0.length;
  while (inductionVariable < last) {
    var element = this_0[inductionVariable];
    inductionVariable = inductionVariable + 1 | 0;
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    var tmp$ret$2 = env[element];
    result.b2(element, tmp$ret$2);
  }
  return result;
}
function main$lambda_0() {
  _init_properties_JsNodeMain_kt__uafobg();
  return NodeJsFileSystem_getInstance();
}
function main$slambda(resultContinuation) {
  CoroutineImpl.call(this, resultContinuation);
}
protoOf(main$slambda).z74 = function ($completion) {
  var tmp = this.q4j($completion);
  tmp.m8_1 = Unit_instance;
  tmp.n8_1 = null;
  return tmp.s8();
};
protoOf(main$slambda).r4j = function ($completion) {
  return this.z74($completion);
};
protoOf(main$slambda).s8 = function () {
  var suspendResult = this.m8_1;
  $sm: do
    try {
      var tmp = this.k8_1;
      switch (tmp) {
        case 0:
          this.l8_1 = 3;
          this.k8_1 = 1;
          suspendResult = get_readLineFromStdinIterator().e20(this);
          if (suspendResult === get_COROUTINE_SUSPENDED()) {
            return suspendResult;
          }

          this.k8_1 = 2;
          continue $sm;
        case 1:
          var unboxed = suspendResult.y1x_1;
          suspendResult = new ChannelResult(unboxed);
          this.k8_1 = 2;
          continue $sm;
        case 2:
          var ARGUMENT = suspendResult.y1x_1;
          return ChannelResult__getOrNull_impl_f5e07h(ARGUMENT);
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
protoOf(main$slambda).q4j = function (completion) {
  return new main$slambda(completion);
};
function main$slambda_0(resultContinuation) {
  var i = new main$slambda(resultContinuation);
  var l = function ($completion) {
    return i.z74($completion);
  };
  l.$arity = 0;
  return l;
}
function main$slambda$lambda() {
  return createJsMounts();
}
function main$slambda_1($options, resultContinuation) {
  this.i75_1 = $options;
  CoroutineImpl.call(this, resultContinuation);
}
protoOf(main$slambda_1).y23 = function ($this$coroutineScope, $completion) {
  var tmp = this.z23($this$coroutineScope, $completion);
  tmp.m8_1 = Unit_instance;
  tmp.n8_1 = null;
  return tmp.s8();
};
protoOf(main$slambda_1).b9 = function (p1, $completion) {
  return this.y23((!(p1 == null) ? isInterface(p1, CoroutineScope) : false) ? p1 : THROW_CCE(), $completion);
};
protoOf(main$slambda_1).s8 = function () {
  var suspendResult = this.m8_1;
  $sm: do
    try {
      var tmp = this.k8_1;
      switch (tmp) {
        case 0:
          this.l8_1 = 2;
          this.k8_1 = 1;
          suspendResult = main(this.i75_1, this.j75_1, main$slambda$lambda, this);
          if (suspendResult === get_COROUTINE_SUSPENDED()) {
            return suspendResult;
          }

          continue $sm;
        case 1:
          return Unit_instance;
        case 2:
          throw this.n8_1;
      }
    } catch ($p) {
      var e = $p;
      if (this.l8_1 === 2) {
        throw e;
      } else {
        this.k8_1 = this.l8_1;
        this.n8_1 = e;
      }
    }
   while (true);
};
protoOf(main$slambda_1).z23 = function ($this$coroutineScope, completion) {
  var i = new main$slambda_1(this.i75_1, completion);
  i.j75_1 = $this$coroutineScope;
  return i;
};
function main$slambda_2($options, resultContinuation) {
  var i = new main$slambda_1($options, resultContinuation);
  var l = function ($this$coroutineScope, $completion) {
    return i.y23($this$coroutineScope, $completion);
  };
  l.$arity = 1;
  return l;
}
var properties_initialized_JsNodeMain_kt_p1jmbq;
function _init_properties_JsNodeMain_kt__uafobg() {
  if (!properties_initialized_JsNodeMain_kt_p1jmbq) {
    properties_initialized_JsNodeMain_kt_p1jmbq = true;
    readLineFromStdinIterator$delegate = lazy(readLineFromStdinIterator$delegate$lambda);
  }
}
function mainWrapper() {
  main_0(get_EmptyContinuation());
}
function get_process() {
  _init_properties_JsNodeUtils_kt__8v8udw();
  var tmp0 = process$delegate;
  var tmp = KProperty0;
  // Inline function 'kotlin.getValue' call
  getPropertyCallableRef('process', 0, tmp, _get_process_$ref_b90brj(), null);
  return tmp0.m2();
}
var process$delegate;
function process$delegate$lambda() {
  _init_properties_JsNodeUtils_kt__8v8udw();
  // Inline function 'kotlin.js.unsafeCast' call
  return process;
}
function _get_process_$ref_b90brj() {
  return function () {
    return get_process();
  };
}
var properties_initialized_JsNodeUtils_kt_h96e2y;
function _init_properties_JsNodeUtils_kt__8v8udw() {
  if (!properties_initialized_JsNodeUtils_kt_h96e2y) {
    properties_initialized_JsNodeUtils_kt_h96e2y = true;
    process$delegate = lazy(process$delegate$lambda);
  }
}
mainWrapper();

//# sourceMappingURL=xarpite-node.mjs.map
