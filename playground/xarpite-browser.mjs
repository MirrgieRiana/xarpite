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
  this.k6o_1 = $out;
  CoroutineImpl.call(this, resultContinuation);
}
protoOf(evaluate$slambda$slambda).j2i = function (it, $completion) {
  var tmp = this.k2i(it, $completion);
  tmp.m8_1 = Unit_instance;
  tmp.n8_1 = null;
  return tmp.s8();
};
protoOf(evaluate$slambda$slambda).b9 = function (p1, $completion) {
  return this.j2i((!(p1 == null) ? isInterface(p1, FluoriteValue) : false) ? p1 : THROW_CCE(), $completion);
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
          suspendResult = await_0(this.k6o_1(this.l6o_1), this);
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
protoOf(evaluate$slambda$slambda).k2i = function (it, completion) {
  var i = new evaluate$slambda$slambda(this.k6o_1, completion);
  i.l6o_1 = it;
  return i;
};
function evaluate$slambda$slambda_0($out, resultContinuation) {
  var i = new evaluate$slambda$slambda($out, resultContinuation);
  var l = function (it, $completion) {
    return i.j2i(it, $completion);
  };
  l.$arity = 1;
  return l;
}
function evaluate$slambda($quiet, $src, $out, resultContinuation) {
  this.u6o_1 = $quiet;
  this.v6o_1 = $src;
  this.w6o_1 = $out;
  CoroutineImpl.call(this, resultContinuation);
}
protoOf(evaluate$slambda).a6p = function ($this$promise, $completion) {
  var tmp = this.o4a($this$promise, $completion);
  tmp.m8_1 = Unit_instance;
  tmp.n8_1 = null;
  return tmp.s8();
};
protoOf(evaluate$slambda).b9 = function (p1, $completion) {
  return this.a6p((!(p1 == null) ? isInterface(p1, CoroutineScope) : false) ? p1 : THROW_CCE(), $completion);
};
protoOf(evaluate$slambda).s8 = function () {
  var suspendResult = this.m8_1;
  $sm: do
    try {
      var tmp = this.k8_1;
      switch (tmp) {
        case 0:
          this.l8_1 = 5;
          this.z6o_1 = new Evaluator();
          var tmp_0 = get_scope();
          var defaultBuiltinMounts = flatten(listOf([createCommonMounts(tmp_0, evaluate$slambda$slambda_0(this.w6o_1, null)), createJsMounts(), createJsBrowserMounts()]));
          this.k8_1 = 1;
          suspendResult = this.z6o_1.l2a(defaultBuiltinMounts, this);
          if (suspendResult === get_COROUTINE_SUSPENDED()) {
            return suspendResult;
          }

          continue $sm;
        case 1:
          if (this.u6o_1) {
            this.k8_1 = 3;
            suspendResult = this.z6o_1.o2a(this.v6o_1, this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }
            continue $sm;
          } else {
            this.k8_1 = 2;
            suspendResult = this.z6o_1.m2a(this.v6o_1, this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }
            continue $sm;
          }

        case 2:
          this.y6o_1 = suspendResult;
          this.k8_1 = 4;
          continue $sm;
        case 3:
          this.y6o_1 = undefined;
          this.k8_1 = 4;
          continue $sm;
        case 4:
          return this.y6o_1;
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
protoOf(evaluate$slambda).o4a = function ($this$promise, completion) {
  var i = new evaluate$slambda(this.u6o_1, this.v6o_1, this.w6o_1, completion);
  i.x6o_1 = $this$promise;
  return i;
};
function evaluate$slambda_0($quiet, $src, $out, resultContinuation) {
  var i = new evaluate$slambda($quiet, $src, $out, resultContinuation);
  var l = function ($this$promise, $completion) {
    return i.a6p($this$promise, $completion);
  };
  l.$arity = 1;
  return l;
}
function log$slambda$slambda(resultContinuation) {
  CoroutineImpl.call(this, resultContinuation);
}
protoOf(log$slambda$slambda).j2i = function (it, $completion) {
  var tmp = this.k2i(it, $completion);
  tmp.m8_1 = Unit_instance;
  tmp.n8_1 = null;
  return tmp.s8();
};
protoOf(log$slambda$slambda).b9 = function (p1, $completion) {
  return this.j2i((!(p1 == null) ? isInterface(p1, FluoriteValue) : false) ? p1 : THROW_CCE(), $completion);
};
protoOf(log$slambda$slambda).s8 = function () {
  var suspendResult = this.m8_1;
  $sm: do
    try {
      var tmp = this.k8_1;
      if (tmp === 0) {
        this.l8_1 = 1;
        console.log(this.j6p_1);
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
protoOf(log$slambda$slambda).k2i = function (it, completion) {
  var i = new log$slambda$slambda(completion);
  i.j6p_1 = it;
  return i;
};
function log$slambda$slambda_0(resultContinuation) {
  var i = new log$slambda$slambda(resultContinuation);
  var l = function (it, $completion) {
    return i.j2i(it, $completion);
  };
  l.$arity = 1;
  return l;
}
function log$slambda($value, resultContinuation) {
  this.s6p_1 = $value;
  CoroutineImpl.call(this, resultContinuation);
}
protoOf(log$slambda).n4a = function ($this$promise, $completion) {
  var tmp = this.o4a($this$promise, $completion);
  tmp.m8_1 = Unit_instance;
  tmp.n8_1 = null;
  return tmp.s8();
};
protoOf(log$slambda).b9 = function (p1, $completion) {
  return this.n4a((!(p1 == null) ? isInterface(p1, CoroutineScope) : false) ? p1 : THROW_CCE(), $completion);
};
protoOf(log$slambda).s8 = function () {
  var suspendResult = this.m8_1;
  $sm: do
    try {
      var tmp = this.k8_1;
      switch (tmp) {
        case 0:
          this.l8_1 = 3;
          var value = this.s6p_1;
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
protoOf(log$slambda).o4a = function ($this$promise, completion) {
  var i = new log$slambda(this.s6p_1, completion);
  i.t6p_1 = $this$promise;
  return i;
};
function log$slambda_0($value, resultContinuation) {
  var i = new log$slambda($value, resultContinuation);
  var l = function ($this$promise, $completion) {
    return i.n4a($this$promise, $completion);
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
  this.n6q_1 = $isFirst;
  this.o6q_1 = $sb;
  CoroutineImpl.call(this, resultContinuation);
}
protoOf(stringify$slambda$f$slambda).j2i = function (it, $completion) {
  var tmp = this.k2i(it, $completion);
  tmp.m8_1 = Unit_instance;
  tmp.n8_1 = null;
  return tmp.s8();
};
protoOf(stringify$slambda$f$slambda).b9 = function (p1, $completion) {
  return this.j2i((!(p1 == null) ? isInterface(p1, FluoriteValue) : false) ? p1 : THROW_CCE(), $completion);
};
protoOf(stringify$slambda$f$slambda).s8 = function () {
  var suspendResult = this.m8_1;
  $sm: do
    try {
      var tmp = this.k8_1;
      switch (tmp) {
        case 0:
          this.l8_1 = 2;
          if (this.n6q_1._v) {
            this.n6q_1._v = false;
          } else {
            this.o6q_1.s7(_Char___init__impl__6a9atx(10));
          }

          this.k8_1 = 1;
          suspendResult = invoke$f(this.p6q_1, this);
          if (suspendResult === get_COROUTINE_SUSPENDED()) {
            return suspendResult;
          }

          continue $sm;
        case 1:
          var ARGUMENT = suspendResult;
          this.o6q_1.r7(ARGUMENT);
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
protoOf(stringify$slambda$f$slambda).k2i = function (it, completion) {
  var i = new stringify$slambda$f$slambda(this.n6q_1, this.o6q_1, completion);
  i.p6q_1 = it;
  return i;
};
function stringify$slambda$f$slambda_0($isFirst, $sb, resultContinuation) {
  var i = new stringify$slambda$f$slambda($isFirst, $sb, resultContinuation);
  var l = function (it, $completion) {
    return i.j2i(it, $completion);
  };
  l.$arity = 1;
  return l;
}
function $invoke$fCOROUTINE$(value, resultContinuation) {
  CoroutineImpl.call(this, resultContinuation);
  this.c6q_1 = value;
}
protoOf($invoke$fCOROUTINE$).s8 = function () {
  var suspendResult = this.m8_1;
  $sm: do
    try {
      var tmp = this.k8_1;
      switch (tmp) {
        case 0:
          this.l8_1 = 4;
          var tmp_0 = this.c6q_1;
          if (tmp_0 instanceof FluoriteStream) {
            this.e6q_1 = StringBuilder_init_$Create$();
            var isFirst = {_v: true};
            this.k8_1 = 2;
            suspendResult = collect(this.c6q_1, stringify$slambda$f$slambda_0(isFirst, this.e6q_1, null), this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }
            continue $sm;
          } else {
            this.k8_1 = 1;
            suspendResult = toFluoriteString(this.c6q_1, this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }
            continue $sm;
          }

        case 1:
          this.d6q_1 = suspendResult.u2j_1;
          this.k8_1 = 3;
          continue $sm;
        case 2:
          this.d6q_1 = this.e6q_1.toString();
          this.k8_1 = 3;
          continue $sm;
        case 3:
          return this.d6q_1;
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
  this.y6q_1 = $value;
  CoroutineImpl.call(this, resultContinuation);
}
protoOf(stringify$slambda).a6r = function ($this$promise, $completion) {
  var tmp = this.o4a($this$promise, $completion);
  tmp.m8_1 = Unit_instance;
  tmp.n8_1 = null;
  return tmp.s8();
};
protoOf(stringify$slambda).b9 = function (p1, $completion) {
  return this.a6r((!(p1 == null) ? isInterface(p1, CoroutineScope) : false) ? p1 : THROW_CCE(), $completion);
};
protoOf(stringify$slambda).s8 = function () {
  var suspendResult = this.m8_1;
  $sm: do
    try {
      var tmp = this.k8_1;
      switch (tmp) {
        case 0:
          this.l8_1 = 2;
          var value = this.y6q_1;
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
protoOf(stringify$slambda).o4a = function ($this$promise, completion) {
  var i = new stringify$slambda(this.y6q_1, completion);
  i.z6q_1 = $this$promise;
  return i;
};
function stringify$slambda_0($value, resultContinuation) {
  var i = new stringify$slambda($value, resultContinuation);
  var l = function ($this$promise, $completion) {
    return i.a6r($this$promise, $completion);
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
