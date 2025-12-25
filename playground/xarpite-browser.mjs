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
  this.o6r_1 = $out;
  CoroutineImpl.call(this, resultContinuation);
}
protoOf(evaluate$slambda$slambda).h2i = function (it, $completion) {
  var tmp = this.i2i(it, $completion);
  tmp.m8_1 = Unit_instance;
  tmp.n8_1 = null;
  return tmp.s8();
};
protoOf(evaluate$slambda$slambda).b9 = function (p1, $completion) {
  return this.h2i((!(p1 == null) ? isInterface(p1, FluoriteValue) : false) ? p1 : THROW_CCE(), $completion);
};
protoOf(evaluate$slambda$slambda).s8 = function () {
  var suspendResult = this.m8_1;
  $sm: do
    try {
      var tmp = this.k8_1;
      switch (tmp) {
        case 0:
          this.l8_1 = 2;
          this.k8_1 = 1;
          suspendResult = await_0(this.o6r_1(this.p6r_1), this);
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
protoOf(evaluate$slambda$slambda).i2i = function (it, completion) {
  var i = new evaluate$slambda$slambda(this.o6r_1, completion);
  i.p6r_1 = it;
  return i;
};
function evaluate$slambda$slambda_0($out, resultContinuation) {
  var i = new evaluate$slambda$slambda($out, resultContinuation);
  var l = function (it, $completion) {
    return i.h2i(it, $completion);
  };
  l.$arity = 1;
  return l;
}
function evaluate$slambda($quiet, $src, $out, resultContinuation) {
  this.y6r_1 = $quiet;
  this.z6r_1 = $src;
  this.a6s_1 = $out;
  CoroutineImpl.call(this, resultContinuation);
}
protoOf(evaluate$slambda).e6s = function ($this$promise, $completion) {
  var tmp = this.s4d($this$promise, $completion);
  tmp.m8_1 = Unit_instance;
  tmp.n8_1 = null;
  return tmp.s8();
};
protoOf(evaluate$slambda).b9 = function (p1, $completion) {
  return this.e6s((!(p1 == null) ? isInterface(p1, CoroutineScope) : false) ? p1 : THROW_CCE(), $completion);
};
protoOf(evaluate$slambda).s8 = function () {
  var suspendResult = this.m8_1;
  $sm: do
    try {
      var tmp = this.k8_1;
      switch (tmp) {
        case 0:
          this.l8_1 = 5;
          this.d6s_1 = new Evaluator();
          var tmp_0 = get_scope();
          var defaultBuiltinMounts = flatten(listOf([createCommonMounts(tmp_0, evaluate$slambda$slambda_0(this.a6s_1, null)), createJsMounts(), createJsBrowserMounts()]));
          this.k8_1 = 1;
          suspendResult = this.d6s_1.j2a(defaultBuiltinMounts, this);
          if (suspendResult === get_COROUTINE_SUSPENDED()) {
            return suspendResult;
          }

          continue $sm;
        case 1:
          if (this.y6r_1) {
            this.k8_1 = 3;
            suspendResult = this.d6s_1.m2a(this.z6r_1, this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }
            continue $sm;
          } else {
            this.k8_1 = 2;
            suspendResult = this.d6s_1.k2a(this.z6r_1, this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }
            continue $sm;
          }

        case 2:
          this.c6s_1 = suspendResult;
          this.k8_1 = 4;
          continue $sm;
        case 3:
          this.c6s_1 = undefined;
          this.k8_1 = 4;
          continue $sm;
        case 4:
          return this.c6s_1;
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
protoOf(evaluate$slambda).s4d = function ($this$promise, completion) {
  var i = new evaluate$slambda(this.y6r_1, this.z6r_1, this.a6s_1, completion);
  i.b6s_1 = $this$promise;
  return i;
};
function evaluate$slambda_0($quiet, $src, $out, resultContinuation) {
  var i = new evaluate$slambda($quiet, $src, $out, resultContinuation);
  var l = function ($this$promise, $completion) {
    return i.e6s($this$promise, $completion);
  };
  l.$arity = 1;
  return l;
}
function log$slambda$slambda(resultContinuation) {
  CoroutineImpl.call(this, resultContinuation);
}
protoOf(log$slambda$slambda).h2i = function (it, $completion) {
  var tmp = this.i2i(it, $completion);
  tmp.m8_1 = Unit_instance;
  tmp.n8_1 = null;
  return tmp.s8();
};
protoOf(log$slambda$slambda).b9 = function (p1, $completion) {
  return this.h2i((!(p1 == null) ? isInterface(p1, FluoriteValue) : false) ? p1 : THROW_CCE(), $completion);
};
protoOf(log$slambda$slambda).s8 = function () {
  var suspendResult = this.m8_1;
  $sm: do
    try {
      var tmp = this.k8_1;
      if (tmp === 0) {
        this.l8_1 = 1;
        console.log(this.n6s_1);
        return Unit_instance;
      } else if (tmp === 1) {
        throw this.n8_1;
      }
    } catch ($p) {
      var e = $p;
      throw e;
    }
   while (true);
};
protoOf(log$slambda$slambda).i2i = function (it, completion) {
  var i = new log$slambda$slambda(completion);
  i.n6s_1 = it;
  return i;
};
function log$slambda$slambda_0(resultContinuation) {
  var i = new log$slambda$slambda(resultContinuation);
  var l = function (it, $completion) {
    return i.h2i(it, $completion);
  };
  l.$arity = 1;
  return l;
}
function log$slambda($value, resultContinuation) {
  this.w6s_1 = $value;
  CoroutineImpl.call(this, resultContinuation);
}
protoOf(log$slambda).r4d = function ($this$promise, $completion) {
  var tmp = this.s4d($this$promise, $completion);
  tmp.m8_1 = Unit_instance;
  tmp.n8_1 = null;
  return tmp.s8();
};
protoOf(log$slambda).b9 = function (p1, $completion) {
  return this.r4d((!(p1 == null) ? isInterface(p1, CoroutineScope) : false) ? p1 : THROW_CCE(), $completion);
};
protoOf(log$slambda).s8 = function () {
  var suspendResult = this.m8_1;
  $sm: do
    try {
      var tmp = this.k8_1;
      switch (tmp) {
        case 0:
          this.l8_1 = 3;
          var value = this.w6s_1;
          if (value instanceof FluoriteStream) {
            this.k8_1 = 1;
            suspendResult = collect(value, log$slambda$slambda_0(null), this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }
            continue $sm;
          } else {
            console.log(value);
            this.k8_1 = 2;
            continue $sm;
          }

        case 1:
          this.k8_1 = 2;
          continue $sm;
        case 2:
          return Unit_instance;
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
protoOf(log$slambda).s4d = function ($this$promise, completion) {
  var i = new log$slambda(this.w6s_1, completion);
  i.x6s_1 = $this$promise;
  return i;
};
function log$slambda_0($value, resultContinuation) {
  var i = new log$slambda($value, resultContinuation);
  var l = function ($this$promise, $completion) {
    return i.r4d($this$promise, $completion);
  };
  l.$arity = 1;
  return l;
}
function invoke$f(value, $completion) {
  var tmp = new $invoke$fCOROUTINE$(value, $completion);
  tmp.m8_1 = Unit_instance;
  tmp.n8_1 = null;
  return tmp.s8();
}
function stringify$slambda$f$slambda($isFirst, $sb, resultContinuation) {
  this.r6t_1 = $isFirst;
  this.s6t_1 = $sb;
  CoroutineImpl.call(this, resultContinuation);
}
protoOf(stringify$slambda$f$slambda).h2i = function (it, $completion) {
  var tmp = this.i2i(it, $completion);
  tmp.m8_1 = Unit_instance;
  tmp.n8_1 = null;
  return tmp.s8();
};
protoOf(stringify$slambda$f$slambda).b9 = function (p1, $completion) {
  return this.h2i((!(p1 == null) ? isInterface(p1, FluoriteValue) : false) ? p1 : THROW_CCE(), $completion);
};
protoOf(stringify$slambda$f$slambda).s8 = function () {
  var suspendResult = this.m8_1;
  $sm: do
    try {
      var tmp = this.k8_1;
      switch (tmp) {
        case 0:
          this.l8_1 = 2;
          if (this.r6t_1._v) {
            this.r6t_1._v = false;
          } else {
            this.s6t_1.s7(_Char___init__impl__6a9atx(10));
          }

          this.k8_1 = 1;
          suspendResult = invoke$f(this.t6t_1, this);
          if (suspendResult === get_COROUTINE_SUSPENDED()) {
            return suspendResult;
          }

          continue $sm;
        case 1:
          var ARGUMENT = suspendResult;
          this.s6t_1.r7(ARGUMENT);
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
protoOf(stringify$slambda$f$slambda).i2i = function (it, completion) {
  var i = new stringify$slambda$f$slambda(this.r6t_1, this.s6t_1, completion);
  i.t6t_1 = it;
  return i;
};
function stringify$slambda$f$slambda_0($isFirst, $sb, resultContinuation) {
  var i = new stringify$slambda$f$slambda($isFirst, $sb, resultContinuation);
  var l = function (it, $completion) {
    return i.h2i(it, $completion);
  };
  l.$arity = 1;
  return l;
}
function $invoke$fCOROUTINE$(value, resultContinuation) {
  CoroutineImpl.call(this, resultContinuation);
  this.g6t_1 = value;
}
protoOf($invoke$fCOROUTINE$).s8 = function () {
  var suspendResult = this.m8_1;
  $sm: do
    try {
      var tmp = this.k8_1;
      switch (tmp) {
        case 0:
          this.l8_1 = 4;
          var tmp_0 = this.g6t_1;
          if (tmp_0 instanceof FluoriteStream) {
            this.i6t_1 = StringBuilder_init_$Create$();
            var isFirst = {_v: true};
            this.k8_1 = 2;
            suspendResult = collect(this.g6t_1, stringify$slambda$f$slambda_0(isFirst, this.i6t_1, null), this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }
            continue $sm;
          } else {
            this.k8_1 = 1;
            suspendResult = toFluoriteString(this.g6t_1, this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }
            continue $sm;
          }

        case 1:
          this.h6t_1 = suspendResult.s2j_1;
          this.k8_1 = 3;
          continue $sm;
        case 2:
          this.h6t_1 = this.i6t_1.toString();
          this.k8_1 = 3;
          continue $sm;
        case 3:
          return this.h6t_1;
        case 4:
          throw this.n8_1;
      }
    } catch ($p) {
      var e = $p;
      if (this.l8_1 === 4) {
        throw e;
      } else {
        this.k8_1 = this.l8_1;
        this.n8_1 = e;
      }
    }
   while (true);
};
function stringify$slambda($value, resultContinuation) {
  this.c6u_1 = $value;
  CoroutineImpl.call(this, resultContinuation);
}
protoOf(stringify$slambda).e6u = function ($this$promise, $completion) {
  var tmp = this.s4d($this$promise, $completion);
  tmp.m8_1 = Unit_instance;
  tmp.n8_1 = null;
  return tmp.s8();
};
protoOf(stringify$slambda).b9 = function (p1, $completion) {
  return this.e6u((!(p1 == null) ? isInterface(p1, CoroutineScope) : false) ? p1 : THROW_CCE(), $completion);
};
protoOf(stringify$slambda).s8 = function () {
  var suspendResult = this.m8_1;
  $sm: do
    try {
      var tmp = this.k8_1;
      switch (tmp) {
        case 0:
          this.l8_1 = 2;
          var value = this.c6u_1;
          this.k8_1 = 1;
          suspendResult = invoke$f(value, this);
          if (suspendResult === get_COROUTINE_SUSPENDED()) {
            return suspendResult;
          }

          continue $sm;
        case 1:
          return suspendResult;
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
protoOf(stringify$slambda).s4d = function ($this$promise, completion) {
  var i = new stringify$slambda(this.c6u_1, completion);
  i.d6u_1 = $this$promise;
  return i;
};
function stringify$slambda_0($value, resultContinuation) {
  var i = new stringify$slambda($value, resultContinuation);
  var l = function ($this$promise, $completion) {
    return i.e6u($this$promise, $completion);
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
