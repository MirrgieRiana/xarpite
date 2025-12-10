import {
  set_envGetter3hvxpspjt59gr as set_envGetter,
  set_fileSystemGetter1gjx570slh9n as set_fileSystemGetter,
  parseArguments2lef1fjjpcnj4 as parseArguments,
  showUsage1kmttarfmwnj8 as showUsage,
  ShowUsage11o4la4sguagx as ShowUsage,
  get_Object_keys2nolb0l4j8r2q as get_Object_keys,
  createJsMounts3lknrl24nfeh1 as createJsMounts,
  main2ez4fwmz3w728 as main,
} from './xarpite-core.mjs';
import {
  drop258un2a8hqa2a as drop,
  Unit_instance1fbcbse1fwigr as Unit_instance,
  mapCapacity1h45rc3eh9p2l as mapCapacity,
  coerceAtLeast2bkz8m9ik7hep as coerceAtLeast,
  LinkedHashMap_init_$Create$23uxki4opd0pn as LinkedHashMap_init_$Create$,
  CoroutineImpl2sn3kjnwmfr10 as CoroutineImpl,
  protoOf180f3jzyo7rfj as protoOf,
  THROW_CCE2g6jy02ryeudk as THROW_CCE,
  isInterface3d6p8outrmvmk as isInterface,
  get_COROUTINE_SUSPENDED3ujt3p13qm4iy as get_COROUTINE_SUSPENDED,
  initMetadataForLambda3af3he42mmnh as initMetadataForLambda,
  VOID3gxj6tk5isa35 as VOID,
  get_EmptyContinuationn1rwa6yr6j5w as get_EmptyContinuation,
} from './kotlin-kotlin-stdlib.mjs';
import {
  coroutineScope284yy3flyb2v2 as coroutineScope,
  CoroutineScopefcb5f5dwqcas as CoroutineScope,
} from './kotlinx-coroutines-core.mjs';
import { NodeJsFileSystem_getInstance3ojwnh341fjb5 as NodeJsFileSystem_getInstance } from './okio-parent-okio-nodefilesystem.mjs';
//region block: imports
//endregion
//region block: pre-declaration
initMetadataForLambda(main$slambda, CoroutineImpl, VOID, [1]);
//endregion
function main_0($completion) {
  set_envGetter(main$lambda);
  set_fileSystemGetter(main$lambda_0);
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
  return coroutineScope(main$slambda_0(options, null), $completion);
}
function main$lambda() {
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
    result.a2(element, tmp$ret$2);
  }
  return result;
}
function main$lambda_0() {
  return NodeJsFileSystem_getInstance();
}
function main$slambda$lambda() {
  return createJsMounts();
}
function main$slambda($options, resultContinuation) {
  this.j6k_1 = $options;
  CoroutineImpl.call(this, resultContinuation);
}
protoOf(main$slambda).c49 = function ($this$coroutineScope, $completion) {
  var tmp = this.d49($this$coroutineScope, $completion);
  tmp.l8_1 = Unit_instance;
  tmp.m8_1 = null;
  return tmp.r8();
};
protoOf(main$slambda).a9 = function (p1, $completion) {
  return this.c49((!(p1 == null) ? isInterface(p1, CoroutineScope) : false) ? p1 : THROW_CCE(), $completion);
};
protoOf(main$slambda).r8 = function () {
  var suspendResult = this.l8_1;
  $sm: do
    try {
      var tmp = this.j8_1;
      switch (tmp) {
        case 0:
          this.k8_1 = 2;
          this.j8_1 = 1;
          suspendResult = main(this.j6k_1, this.k6k_1, main$slambda$lambda, this);
          if (suspendResult === get_COROUTINE_SUSPENDED()) {
            return suspendResult;
          }

          continue $sm;
        case 1:
          return Unit_instance;
        case 2:
          throw this.m8_1;
      }
    } catch ($p) {
      var e = $p;
      if (this.k8_1 === 2) {
        throw e;
      } else {
        this.j8_1 = this.k8_1;
        this.m8_1 = e;
      }
    }
   while (true);
};
protoOf(main$slambda).d49 = function ($this$coroutineScope, completion) {
  var i = new main$slambda(this.j6k_1, completion);
  i.k6k_1 = $this$coroutineScope;
  return i;
};
function main$slambda_0($options, resultContinuation) {
  var i = new main$slambda($options, resultContinuation);
  var l = function ($this$coroutineScope, $completion) {
    return i.c49($this$coroutineScope, $completion);
  };
  l.$arity = 1;
  return l;
}
function mainWrapper() {
  main_0(get_EmptyContinuation());
}
function get_process() {
  // Inline function 'kotlin.js.unsafeCast' call
  return process;
}
mainWrapper();

//# sourceMappingURL=xarpite-node.mjs.map
