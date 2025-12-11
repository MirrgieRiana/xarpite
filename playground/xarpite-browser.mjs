import {
  get_scope34wtnlfbrnd6v as get_scope,
  FluoriteValue30lhuyue5ri18 as FluoriteValue,
  Evaluator3lc99pzaljy4w as Evaluator,
  createCommonMountskyfj90elz3se as createCommonMounts,
  createJsMounts3lknrl24nfeh1 as createJsMounts,
  collect31f68c9sl7dii as collect,
  FluoriteStream3lqqtwpvqvu7f as FluoriteStream,
  toFluoriteString1lz4mk5mc08qc as toFluoriteString,
  FluoriteJsObject3k0wbamzw2tef as FluoriteJsObject,
  FluoriteNull_getInstance1o683navtdh47 as FluoriteNull_getInstance,
} from './xarpite-core.mjs';
import {
  VOID3gxj6tk5isa35 as VOID,
  CoroutineImpl2sn3kjnwmfr10 as CoroutineImpl,
  Unit_instance1fbcbse1fwigr as Unit_instance,
  protoOf180f3jzyo7rfj as protoOf,
  THROW_CCE2g6jy02ryeudk as THROW_CCE,
  isInterface3d6p8outrmvmk as isInterface,
  get_COROUTINE_SUSPENDED3ujt3p13qm4iy as get_COROUTINE_SUSPENDED,
  initMetadataForLambda3af3he42mmnh as initMetadataForLambda,
  listOf1jh22dvmctj1r as listOf,
  flatten2dh4kibw1u0qq as flatten,
  _Char___init__impl__6a9atx2js6krycynjoo as _Char___init__impl__6a9atx,
  StringBuilder_init_$Create$2qsge4ydj6bin as StringBuilder_init_$Create$,
  initMetadataForCoroutine1i7lbatuf5bnt as initMetadataForCoroutine,
  to2cs3ny02qtbcb as to,
  mapOf2zpbbmyqk8xpf as mapOf,
  listOfvhqybd2zx248 as listOf_0,
} from './kotlin-kotlin-stdlib.mjs';
import {
  promise1ky6tawqaxbt4 as promise,
  await20nhgj9iqzkt as await_0,
  CoroutineScopefcb5f5dwqcas as CoroutineScope,
} from './kotlinx-coroutines-core.mjs';
//region block: imports
//endregion
//region block: pre-declaration
initMetadataForLambda(evaluate$slambda$slambda, CoroutineImpl, VOID, [1]);
initMetadataForLambda(evaluate$slambda, CoroutineImpl, VOID, [1]);
initMetadataForLambda(log$slambda$slambda, CoroutineImpl, VOID, [1]);
initMetadataForLambda(log$slambda, CoroutineImpl, VOID, [1]);
initMetadataForLambda(stringify$slambda$f$slambda, CoroutineImpl, VOID, [1]);
initMetadataForCoroutine($invoke$fCOROUTINE$, CoroutineImpl);
initMetadataForLambda(stringify$slambda, CoroutineImpl, VOID, [1]);
//endregion
function evaluate(src, quiet, out) {
  var tmp = get_scope();
  return promise(tmp, VOID, VOID, evaluate$slambda_0(quiet, src, out, null));
}
function log(value) {
  var tmp = get_scope();
  return promise(tmp, VOID, VOID, log$slambda_0(value, null));
}
function stringify(value) {
  var tmp = get_scope();
  return promise(tmp, VOID, VOID, stringify$slambda_0(value, null));
}
function evaluate$slambda$slambda($out, resultContinuation) {
  this.g6h_1 = $out;
  CoroutineImpl.call(this, resultContinuation);
}
protoOf(evaluate$slambda$slambda).y2g = function (it, $completion) {
  var tmp = this.z2g(it, $completion);
  tmp.l8_1 = Unit_instance;
  tmp.m8_1 = null;
  return tmp.r8();
};
protoOf(evaluate$slambda$slambda).a9 = function (p1, $completion) {
  return this.y2g((!(p1 == null) ? isInterface(p1, FluoriteValue) : false) ? p1 : THROW_CCE(), $completion);
};
protoOf(evaluate$slambda$slambda).r8 = function () {
  var suspendResult = this.l8_1;
  $sm: do
    try {
      var tmp = this.j8_1;
      switch (tmp) {
        case 0:
          this.k8_1 = 2;
          this.j8_1 = 1;
          suspendResult = await_0(this.g6h_1(this.h6h_1), this);
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
protoOf(evaluate$slambda$slambda).z2g = function (it, completion) {
  var i = new evaluate$slambda$slambda(this.g6h_1, completion);
  i.h6h_1 = it;
  return i;
};
function evaluate$slambda$slambda_0($out, resultContinuation) {
  var i = new evaluate$slambda$slambda($out, resultContinuation);
  var l = function (it, $completion) {
    return i.y2g(it, $completion);
  };
  l.$arity = 1;
  return l;
}
function evaluate$slambda($quiet, $src, $out, resultContinuation) {
  this.q6h_1 = $quiet;
  this.r6h_1 = $src;
  this.s6h_1 = $out;
  CoroutineImpl.call(this, resultContinuation);
}
protoOf(evaluate$slambda).w6h = function ($this$promise, $completion) {
  var tmp = this.h46($this$promise, $completion);
  tmp.l8_1 = Unit_instance;
  tmp.m8_1 = null;
  return tmp.r8();
};
protoOf(evaluate$slambda).a9 = function (p1, $completion) {
  return this.w6h((!(p1 == null) ? isInterface(p1, CoroutineScope) : false) ? p1 : THROW_CCE(), $completion);
};
protoOf(evaluate$slambda).r8 = function () {
  var suspendResult = this.l8_1;
  $sm: do
    try {
      var tmp = this.j8_1;
      switch (tmp) {
        case 0:
          this.k8_1 = 5;
          this.v6h_1 = new Evaluator();
          var tmp_0 = get_scope();
          var defaultBuiltinMounts = flatten(listOf([createCommonMounts(tmp_0, evaluate$slambda$slambda_0(this.s6h_1, null)), createJsMounts(), createJsBrowserMounts()]));
          this.j8_1 = 1;
          suspendResult = this.v6h_1.i28(defaultBuiltinMounts, this);
          if (suspendResult === get_COROUTINE_SUSPENDED()) {
            return suspendResult;
          }

          continue $sm;
        case 1:
          if (this.q6h_1) {
            this.j8_1 = 3;
            suspendResult = this.v6h_1.l28(this.r6h_1, this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }
            continue $sm;
          } else {
            this.j8_1 = 2;
            suspendResult = this.v6h_1.j28(this.r6h_1, this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }
            continue $sm;
          }

        case 2:
          this.u6h_1 = suspendResult;
          this.j8_1 = 4;
          continue $sm;
        case 3:
          this.u6h_1 = undefined;
          this.j8_1 = 4;
          continue $sm;
        case 4:
          return this.u6h_1;
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
protoOf(evaluate$slambda).h46 = function ($this$promise, completion) {
  var i = new evaluate$slambda(this.q6h_1, this.r6h_1, this.s6h_1, completion);
  i.t6h_1 = $this$promise;
  return i;
};
function evaluate$slambda_0($quiet, $src, $out, resultContinuation) {
  var i = new evaluate$slambda($quiet, $src, $out, resultContinuation);
  var l = function ($this$promise, $completion) {
    return i.w6h($this$promise, $completion);
  };
  l.$arity = 1;
  return l;
}
function log$slambda$slambda(resultContinuation) {
  CoroutineImpl.call(this, resultContinuation);
}
protoOf(log$slambda$slambda).y2g = function (it, $completion) {
  var tmp = this.z2g(it, $completion);
  tmp.l8_1 = Unit_instance;
  tmp.m8_1 = null;
  return tmp.r8();
};
protoOf(log$slambda$slambda).a9 = function (p1, $completion) {
  return this.y2g((!(p1 == null) ? isInterface(p1, FluoriteValue) : false) ? p1 : THROW_CCE(), $completion);
};
protoOf(log$slambda$slambda).r8 = function () {
  var suspendResult = this.l8_1;
  $sm: do
    try {
      var tmp = this.j8_1;
      if (tmp === 0) {
        this.k8_1 = 1;
        console.log(this.f6i_1);
        return Unit_instance;
      } else if (tmp === 1) {
        throw this.m8_1;
      }
    } catch ($p) {
      var e = $p;
      throw e;
    }
   while (true);
};
protoOf(log$slambda$slambda).z2g = function (it, completion) {
  var i = new log$slambda$slambda(completion);
  i.f6i_1 = it;
  return i;
};
function log$slambda$slambda_0(resultContinuation) {
  var i = new log$slambda$slambda(resultContinuation);
  var l = function (it, $completion) {
    return i.y2g(it, $completion);
  };
  l.$arity = 1;
  return l;
}
function log$slambda($value, resultContinuation) {
  this.o6i_1 = $value;
  CoroutineImpl.call(this, resultContinuation);
}
protoOf(log$slambda).g46 = function ($this$promise, $completion) {
  var tmp = this.h46($this$promise, $completion);
  tmp.l8_1 = Unit_instance;
  tmp.m8_1 = null;
  return tmp.r8();
};
protoOf(log$slambda).a9 = function (p1, $completion) {
  return this.g46((!(p1 == null) ? isInterface(p1, CoroutineScope) : false) ? p1 : THROW_CCE(), $completion);
};
protoOf(log$slambda).r8 = function () {
  var suspendResult = this.l8_1;
  $sm: do
    try {
      var tmp = this.j8_1;
      switch (tmp) {
        case 0:
          this.k8_1 = 3;
          var value = this.o6i_1;
          if (value instanceof FluoriteStream) {
            this.j8_1 = 1;
            suspendResult = collect(value, log$slambda$slambda_0(null), this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }
            continue $sm;
          } else {
            console.log(value);
            this.j8_1 = 2;
            continue $sm;
          }

        case 1:
          this.j8_1 = 2;
          continue $sm;
        case 2:
          return Unit_instance;
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
protoOf(log$slambda).h46 = function ($this$promise, completion) {
  var i = new log$slambda(this.o6i_1, completion);
  i.p6i_1 = $this$promise;
  return i;
};
function log$slambda_0($value, resultContinuation) {
  var i = new log$slambda($value, resultContinuation);
  var l = function ($this$promise, $completion) {
    return i.g46($this$promise, $completion);
  };
  l.$arity = 1;
  return l;
}
function invoke$f(value, $completion) {
  var tmp = new $invoke$fCOROUTINE$(value, $completion);
  tmp.l8_1 = Unit_instance;
  tmp.m8_1 = null;
  return tmp.r8();
}
function stringify$slambda$f$slambda($isFirst, $sb, resultContinuation) {
  this.j6j_1 = $isFirst;
  this.k6j_1 = $sb;
  CoroutineImpl.call(this, resultContinuation);
}
protoOf(stringify$slambda$f$slambda).y2g = function (it, $completion) {
  var tmp = this.z2g(it, $completion);
  tmp.l8_1 = Unit_instance;
  tmp.m8_1 = null;
  return tmp.r8();
};
protoOf(stringify$slambda$f$slambda).a9 = function (p1, $completion) {
  return this.y2g((!(p1 == null) ? isInterface(p1, FluoriteValue) : false) ? p1 : THROW_CCE(), $completion);
};
protoOf(stringify$slambda$f$slambda).r8 = function () {
  var suspendResult = this.l8_1;
  $sm: do
    try {
      var tmp = this.j8_1;
      switch (tmp) {
        case 0:
          this.k8_1 = 2;
          if (this.j6j_1._v) {
            this.j6j_1._v = false;
          } else {
            this.k6j_1.r7(_Char___init__impl__6a9atx(10));
          }

          this.j8_1 = 1;
          suspendResult = invoke$f(this.l6j_1, this);
          if (suspendResult === get_COROUTINE_SUSPENDED()) {
            return suspendResult;
          }

          continue $sm;
        case 1:
          var ARGUMENT = suspendResult;
          this.k6j_1.q7(ARGUMENT);
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
protoOf(stringify$slambda$f$slambda).z2g = function (it, completion) {
  var i = new stringify$slambda$f$slambda(this.j6j_1, this.k6j_1, completion);
  i.l6j_1 = it;
  return i;
};
function stringify$slambda$f$slambda_0($isFirst, $sb, resultContinuation) {
  var i = new stringify$slambda$f$slambda($isFirst, $sb, resultContinuation);
  var l = function (it, $completion) {
    return i.y2g(it, $completion);
  };
  l.$arity = 1;
  return l;
}
function $invoke$fCOROUTINE$(value, resultContinuation) {
  CoroutineImpl.call(this, resultContinuation);
  this.y6i_1 = value;
}
protoOf($invoke$fCOROUTINE$).r8 = function () {
  var suspendResult = this.l8_1;
  $sm: do
    try {
      var tmp = this.j8_1;
      switch (tmp) {
        case 0:
          this.k8_1 = 4;
          var tmp_0 = this.y6i_1;
          if (tmp_0 instanceof FluoriteStream) {
            this.a6j_1 = StringBuilder_init_$Create$();
            var isFirst = {_v: true};
            this.j8_1 = 2;
            suspendResult = collect(this.y6i_1, stringify$slambda$f$slambda_0(isFirst, this.a6j_1, null), this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }
            continue $sm;
          } else {
            this.j8_1 = 1;
            suspendResult = toFluoriteString(this.y6i_1, this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }
            continue $sm;
          }

        case 1:
          this.z6i_1 = suspendResult.j2i_1;
          this.j8_1 = 3;
          continue $sm;
        case 2:
          this.z6i_1 = this.a6j_1.toString();
          this.j8_1 = 3;
          continue $sm;
        case 3:
          return this.z6i_1;
        case 4:
          throw this.m8_1;
      }
    } catch ($p) {
      var e = $p;
      if (this.k8_1 === 4) {
        throw e;
      } else {
        this.j8_1 = this.k8_1;
        this.m8_1 = e;
      }
    }
   while (true);
};
function stringify$slambda($value, resultContinuation) {
  this.u6j_1 = $value;
  CoroutineImpl.call(this, resultContinuation);
}
protoOf(stringify$slambda).w6j = function ($this$promise, $completion) {
  var tmp = this.h46($this$promise, $completion);
  tmp.l8_1 = Unit_instance;
  tmp.m8_1 = null;
  return tmp.r8();
};
protoOf(stringify$slambda).a9 = function (p1, $completion) {
  return this.w6j((!(p1 == null) ? isInterface(p1, CoroutineScope) : false) ? p1 : THROW_CCE(), $completion);
};
protoOf(stringify$slambda).r8 = function () {
  var suspendResult = this.l8_1;
  $sm: do
    try {
      var tmp = this.j8_1;
      switch (tmp) {
        case 0:
          this.k8_1 = 2;
          var value = this.u6j_1;
          this.j8_1 = 1;
          suspendResult = invoke$f(value, this);
          if (suspendResult === get_COROUTINE_SUSPENDED()) {
            return suspendResult;
          }

          continue $sm;
        case 1:
          return suspendResult;
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
protoOf(stringify$slambda).h46 = function ($this$promise, completion) {
  var i = new stringify$slambda(this.u6j_1, completion);
  i.v6j_1 = $this$promise;
  return i;
};
function stringify$slambda_0($value, resultContinuation) {
  var i = new stringify$slambda($value, resultContinuation);
  var l = function ($this$promise, $completion) {
    return i.w6j($this$promise, $completion);
  };
  l.$arity = 1;
  return l;
}
function createJsBrowserMounts() {
  var tmp;
  try {
    tmp = new FluoriteJsObject(window);
  } catch ($p) {
    var tmp_0;
    if ($p instanceof Error) {
      var _unused_var__etf5q3 = $p;
      tmp_0 = FluoriteNull_getInstance();
    } else {
      throw $p;
    }
    tmp = tmp_0;
  }
  // Inline function 'kotlin.let' call
  var it = mapOf(to('WINDOW', tmp));
  return listOf_0(it);
}
//region block: exports
export {
  evaluate as evaluate,
  log as log,
  stringify as stringify,
};
//endregion

//# sourceMappingURL=xarpite-browser.mjs.map
