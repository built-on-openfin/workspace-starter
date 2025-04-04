/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "../../node_modules/@finos/fdc3/dist/fdc3.esm.js":
/*!*******************************************************!*\
  !*** ../../node_modules/@finos/fdc3/dist/fdc3.esm.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ChannelError: () => (/* binding */ ChannelError),
/* harmony export */   ContextTypes: () => (/* binding */ ContextTypes),
/* harmony export */   Convert: () => (/* binding */ Convert),
/* harmony export */   Intents: () => (/* binding */ Intents),
/* harmony export */   OpenError: () => (/* binding */ OpenError),
/* harmony export */   ResolveError: () => (/* binding */ ResolveError),
/* harmony export */   addContextListener: () => (/* binding */ addContextListener),
/* harmony export */   addIntentListener: () => (/* binding */ addIntentListener),
/* harmony export */   broadcast: () => (/* binding */ broadcast),
/* harmony export */   compareVersionNumbers: () => (/* binding */ compareVersionNumbers),
/* harmony export */   fdc3Ready: () => (/* binding */ fdc3Ready),
/* harmony export */   findIntent: () => (/* binding */ findIntent),
/* harmony export */   findIntentsByContext: () => (/* binding */ findIntentsByContext),
/* harmony export */   getCurrentChannel: () => (/* binding */ getCurrentChannel),
/* harmony export */   getInfo: () => (/* binding */ getInfo),
/* harmony export */   getOrCreateChannel: () => (/* binding */ getOrCreateChannel),
/* harmony export */   getSystemChannels: () => (/* binding */ getSystemChannels),
/* harmony export */   joinChannel: () => (/* binding */ joinChannel),
/* harmony export */   leaveCurrentChannel: () => (/* binding */ leaveCurrentChannel),
/* harmony export */   open: () => (/* binding */ open),
/* harmony export */   raiseIntent: () => (/* binding */ raiseIntent),
/* harmony export */   raiseIntentForContext: () => (/* binding */ raiseIntentForContext),
/* harmony export */   versionIsAtLeast: () => (/* binding */ versionIsAtLeast)
/* harmony export */ });
/**
 * SPDX-License-Identifier: Apache-2.0
 * Copyright 2019 FINOS FDC3 contributors - see NOTICE file
 */
var OpenError;

(function (OpenError) {
  OpenError["AppNotFound"] = "AppNotFound";
  OpenError["ErrorOnLaunch"] = "ErrorOnLaunch";
  OpenError["AppTimeout"] = "AppTimeout";
  OpenError["ResolverUnavailable"] = "ResolverUnavailable";
})(OpenError || (OpenError = {}));

var ResolveError;

(function (ResolveError) {
  ResolveError["NoAppsFound"] = "NoAppsFound";
  ResolveError["ResolverUnavailable"] = "ResolverUnavailable";
  ResolveError["ResolverTimeout"] = "ResolverTimeout";
})(ResolveError || (ResolveError = {}));

var ChannelError;

(function (ChannelError) {
  ChannelError["NoChannelFound"] = "NoChannelFound";
  ChannelError["AccessDenied"] = "AccessDenied";
  ChannelError["CreationFailed"] = "CreationFailed";
})(ChannelError || (ChannelError = {}));

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var runtime_1 = createCommonjsModule(function (module) {
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = (function (exports) {

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined$1; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
    return obj[key];
  }
  try {
    // IE 8 has a broken Object.defineProperty that only works on DOM objects.
    define({}, "");
  } catch (err) {
    define = function(obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunction.displayName = define(
    GeneratorFunctionPrototype,
    toStringTagSymbol,
    "GeneratorFunction"
  );

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      define(prototype, method, function(arg) {
        return this._invoke(method, arg);
      });
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      define(genFun, toStringTagSymbol, "GeneratorFunction");
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;

    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList),
      PromiseImpl
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined$1) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined$1;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined$1;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  define(Gp, toStringTagSymbol, "Generator");

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined$1;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined$1, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined$1;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined$1;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined$1;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined$1;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined$1;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
   module.exports 
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  Function("r", "regeneratorRuntime = r")(runtime);
}
});

var DEFAULT_TIMEOUT = 5000;
var UnavailableError = /*#__PURE__*/new Error('FDC3 DesktopAgent not available at `window.fdc3`.');
var TimeoutError = /*#__PURE__*/new Error('Timed out waiting for `fdc3Ready` event.');
var UnexpectedError = /*#__PURE__*/new Error('`fdc3Ready` event fired, but `window.fdc3` not set to DesktopAgent.');

function rejectIfNoGlobal(f) {
  return window.fdc3 ? f() : Promise.reject(UnavailableError);
}

function throwIfNoGlobal(f) {
  if (!window.fdc3) {
    throw UnavailableError;
  }

  return f();
}

var fdc3Ready = /*#__PURE__*/function () {
  var _ref = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee(waitForMs) {
    return runtime_1.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (waitForMs === void 0) {
              waitForMs = DEFAULT_TIMEOUT;
            }

            return _context.abrupt("return", new Promise(function (resolve, reject) {
              // if the global is already available resolve immediately
              if (window.fdc3) {
                resolve();
              } else {
                // if its not available setup a timeout to return a rejected promise
                var timeout = setTimeout(function () {
                  return window.fdc3 ? resolve() : reject(TimeoutError);
                }, waitForMs); // listen for the fdc3Ready event

                window.addEventListener('fdc3Ready', function () {
                  clearTimeout(timeout);
                  window.fdc3 ? resolve() : reject(UnexpectedError);
                }, {
                  once: true
                });
              }
            }));

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function fdc3Ready(_x) {
    return _ref.apply(this, arguments);
  };
}();
function open(app, context) {
  return rejectIfNoGlobal(function () {
    return window.fdc3.open(app, context);
  });
}
function findIntent(intent, context) {
  return rejectIfNoGlobal(function () {
    return window.fdc3.findIntent(intent, context);
  });
}
function findIntentsByContext(context) {
  return rejectIfNoGlobal(function () {
    return window.fdc3.findIntentsByContext(context);
  });
}
function broadcast(context) {
  throwIfNoGlobal(function () {
    return window.fdc3.broadcast(context);
  });
}
function raiseIntent(intent, context, app) {
  return rejectIfNoGlobal(function () {
    return window.fdc3.raiseIntent(intent, context, app);
  });
}
function raiseIntentForContext(context, app) {
  return rejectIfNoGlobal(function () {
    return window.fdc3.raiseIntentForContext(context, app);
  });
}
function addIntentListener(intent, handler) {
  return throwIfNoGlobal(function () {
    return window.fdc3.addIntentListener(intent, handler);
  });
}
function addContextListener(contextTypeOrHandler, handler) {
  if (typeof contextTypeOrHandler !== 'function') {
    return throwIfNoGlobal(function () {
      return window.fdc3.addContextListener(contextTypeOrHandler, handler);
    });
  } else {
    return throwIfNoGlobal(function () {
      return window.fdc3.addContextListener(contextTypeOrHandler);
    });
  }
}
function getSystemChannels() {
  return rejectIfNoGlobal(function () {
    return window.fdc3.getSystemChannels();
  });
}
function joinChannel(channelId) {
  return rejectIfNoGlobal(function () {
    return window.fdc3.joinChannel(channelId);
  });
}
function getOrCreateChannel(channelId) {
  return rejectIfNoGlobal(function () {
    return window.fdc3.getOrCreateChannel(channelId);
  });
}
function getCurrentChannel() {
  return rejectIfNoGlobal(function () {
    return window.fdc3.getCurrentChannel();
  });
}
function leaveCurrentChannel() {
  return rejectIfNoGlobal(function () {
    return window.fdc3.leaveCurrentChannel();
  });
}
function getInfo() {
  return throwIfNoGlobal(function () {
    return window.fdc3.getInfo();
  });
}
/**
 * Compare numeric semver version number strings (in the form `1.2.3`).
 *
 * Returns `-1` if the first argument is a lower version number than the second,
 * `1` if the first argument is greater than the second, 0 if the arguments are
 * equal and `null` if an error occurred during the comparison.
 *
 * @param a
 * @param b
 */

var compareVersionNumbers = function compareVersionNumbers(a, b) {
  try {
    var aVerArr = a.split('.').map(Number);
    var bVerArr = b.split('.').map(Number);

    for (var index = 0; index < Math.max(aVerArr.length, bVerArr.length); index++) {
      /* If one version number has more digits and the other does not, and they are otherwise equal,
         assume the longer is greater. E.g. 1.1.1 > 1.1 */
      if (index === aVerArr.length || aVerArr[index] < bVerArr[index]) {
        return -1;
      } else if (index === bVerArr.length || aVerArr[index] > bVerArr[index]) {
        return 1;
      }
    }

    return 0;
  } catch (e) {
    console.error('Failed to compare version strings', e);
    return null;
  }
};
/**
 * Check if the FDC3 version in an ImplementationMetadata object is greater than
 * or equal to the supplied numeric semver version number string (in the form `1.2.3`).
 *
 * Returns a boolean or null if an error occurred while comparing the version numbers.
 *
 * @param metadata
 * @param version
 */

var versionIsAtLeast = function versionIsAtLeast(metadata, version) {
  var comparison = compareVersionNumbers(metadata.fdc3Version, version);
  return comparison === null ? null : comparison >= 0 ? true : false;
};

var ContextTypes;

(function (ContextTypes) {
  ContextTypes["Contact"] = "fdc3.contact";
  ContextTypes["ContactList"] = "fdc3.contactList";
  ContextTypes["Country"] = "fdc3.country";
  ContextTypes["Instrument"] = "fdc3.instrument";
  ContextTypes["Organization"] = "fdc3.organization";
  ContextTypes["Portfolio"] = "fdc3.portfolio";
  ContextTypes["Position"] = "fdc3.position";
})(ContextTypes || (ContextTypes = {}));

// To parse this data:
//
//   import { Convert, Context, Contact, ContactList, Instrument, InstrumentList, Country, Organization, Portfolio, Position } from "./file";
//
//   const context = Convert.toContext(json);
//   const contact = Convert.toContact(json);
//   const contactList = Convert.toContactList(json);
//   const instrument = Convert.toInstrument(json);
//   const instrumentList = Convert.toInstrumentList(json);
//   const country = Convert.toCountry(json);
//   const organization = Convert.toOrganization(json);
//   const portfolio = Convert.toPortfolio(json);
//   const position = Convert.toPosition(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.
// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
var Convert = /*#__PURE__*/function () {
  function Convert() {}

  Convert.toContext = function toContext(json) {
    return cast(JSON.parse(json), r('Context'));
  };

  Convert.contextToJson = function contextToJson(value) {
    return JSON.stringify(uncast(value, r('Context')), null, 2);
  };

  Convert.toContact = function toContact(json) {
    return cast(JSON.parse(json), r('Contact'));
  };

  Convert.contactToJson = function contactToJson(value) {
    return JSON.stringify(uncast(value, r('Contact')), null, 2);
  };

  Convert.toContactList = function toContactList(json) {
    return cast(JSON.parse(json), r('ContactList'));
  };

  Convert.contactListToJson = function contactListToJson(value) {
    return JSON.stringify(uncast(value, r('ContactList')), null, 2);
  };

  Convert.toInstrument = function toInstrument(json) {
    return cast(JSON.parse(json), r('Instrument'));
  };

  Convert.instrumentToJson = function instrumentToJson(value) {
    return JSON.stringify(uncast(value, r('Instrument')), null, 2);
  };

  Convert.toInstrumentList = function toInstrumentList(json) {
    return cast(JSON.parse(json), r('InstrumentList'));
  };

  Convert.instrumentListToJson = function instrumentListToJson(value) {
    return JSON.stringify(uncast(value, r('InstrumentList')), null, 2);
  };

  Convert.toCountry = function toCountry(json) {
    return cast(JSON.parse(json), r('Country'));
  };

  Convert.countryToJson = function countryToJson(value) {
    return JSON.stringify(uncast(value, r('Country')), null, 2);
  };

  Convert.toOrganization = function toOrganization(json) {
    return cast(JSON.parse(json), r('Organization'));
  };

  Convert.organizationToJson = function organizationToJson(value) {
    return JSON.stringify(uncast(value, r('Organization')), null, 2);
  };

  Convert.toPortfolio = function toPortfolio(json) {
    return cast(JSON.parse(json), r('Portfolio'));
  };

  Convert.portfolioToJson = function portfolioToJson(value) {
    return JSON.stringify(uncast(value, r('Portfolio')), null, 2);
  };

  Convert.toPosition = function toPosition(json) {
    return cast(JSON.parse(json), r('Position'));
  };

  Convert.positionToJson = function positionToJson(value) {
    return JSON.stringify(uncast(value, r('Position')), null, 2);
  };

  return Convert;
}();

function invalidValue(typ, val, key) {
  if (key === void 0) {
    key = '';
  }

  if (key) {
    throw Error("Invalid value for key \"" + key + "\". Expected type " + JSON.stringify(typ) + " but got " + JSON.stringify(val));
  }

  throw Error("Invalid value " + JSON.stringify(val) + " for type " + JSON.stringify(typ));
}

function jsonToJSProps(typ) {
  if (typ.jsonToJS === undefined) {
    var map = {};
    typ.props.forEach(function (p) {
      return map[p.json] = {
        key: p.js,
        typ: p.typ
      };
    });
    typ.jsonToJS = map;
  }

  return typ.jsonToJS;
}

function jsToJSONProps(typ) {
  if (typ.jsToJSON === undefined) {
    var map = {};
    typ.props.forEach(function (p) {
      return map[p.js] = {
        key: p.json,
        typ: p.typ
      };
    });
    typ.jsToJSON = map;
  }

  return typ.jsToJSON;
}

function transform(val, typ, getProps, key) {
  if (key === void 0) {
    key = '';
  }

  function transformPrimitive(typ, val) {
    if (typeof typ === typeof val) return val;
    return invalidValue(typ, val, key);
  }

  function transformUnion(typs, val) {
    // val must validate against one typ in typs
    var l = typs.length;

    for (var i = 0; i < l; i++) {
      var _typ = typs[i];

      try {
        return transform(val, _typ, getProps);
      } catch (_) {}
    }

    return invalidValue(typs, val);
  }

  function transformEnum(cases, val) {
    if (cases.indexOf(val) !== -1) return val;
    return invalidValue(cases, val);
  }

  function transformArray(typ, val) {
    // val must be an array with no invalid elements
    if (!Array.isArray(val)) return invalidValue('array', val);
    return val.map(function (el) {
      return transform(el, typ, getProps);
    });
  }

  function transformDate(val) {
    if (val === null) {
      return null;
    }

    var d = new Date(val);

    if (isNaN(d.valueOf())) {
      return invalidValue('Date', val);
    }

    return d;
  }

  function transformObject(props, additional, val) {
    if (val === null || typeof val !== 'object' || Array.isArray(val)) {
      return invalidValue('object', val);
    }

    var result = {};
    Object.getOwnPropertyNames(props).forEach(function (key) {
      var prop = props[key];
      var v = Object.prototype.hasOwnProperty.call(val, key) ? val[key] : undefined;
      result[prop.key] = transform(v, prop.typ, getProps, prop.key);
    });
    Object.getOwnPropertyNames(val).forEach(function (key) {
      if (!Object.prototype.hasOwnProperty.call(props, key)) {
        result[key] = transform(val[key], additional, getProps, key);
      }
    });
    return result;
  }

  if (typ === 'any') return val;

  if (typ === null) {
    if (val === null) return val;
    return invalidValue(typ, val);
  }

  if (typ === false) return invalidValue(typ, val);

  while (typeof typ === 'object' && typ.ref !== undefined) {
    typ = typeMap[typ.ref];
  }

  if (Array.isArray(typ)) return transformEnum(typ, val);

  if (typeof typ === 'object') {
    return typ.hasOwnProperty('unionMembers') ? transformUnion(typ.unionMembers, val) : typ.hasOwnProperty('arrayItems') ? transformArray(typ.arrayItems, val) : typ.hasOwnProperty('props') ? transformObject(getProps(typ), typ.additional, val) : invalidValue(typ, val);
  } // Numbers can be parsed by Date but shouldn't be.


  if (typ === Date && typeof val !== 'number') return transformDate(val);
  return transformPrimitive(typ, val);
}

function cast(val, typ) {
  return transform(val, typ, jsonToJSProps);
}

function uncast(val, typ) {
  return transform(val, typ, jsToJSONProps);
}

function a(typ) {
  return {
    arrayItems: typ
  };
}

function u() {
  for (var _len = arguments.length, typs = new Array(_len), _key = 0; _key < _len; _key++) {
    typs[_key] = arguments[_key];
  }

  return {
    unionMembers: typs
  };
}

function o(props, additional) {
  return {
    props: props,
    additional: additional
  };
}

function m(additional) {
  return {
    props: [],
    additional: additional
  };
}

function r(name) {
  return {
    ref: name
  };
}

var typeMap = {
  Context: /*#__PURE__*/o([{
    json: 'id',
    js: 'id',
    typ: /*#__PURE__*/u(undefined, /*#__PURE__*/m(''))
  }, {
    json: 'name',
    js: 'name',
    typ: /*#__PURE__*/u(undefined, '')
  }, {
    json: 'type',
    js: 'type',
    typ: ''
  }], 'any'),
  ContactList: /*#__PURE__*/o([{
    json: 'contacts',
    js: 'contacts',
    typ: /*#__PURE__*/a( /*#__PURE__*/r('Contact'))
  }, {
    json: 'type',
    js: 'type',
    typ: ''
  }, {
    json: 'id',
    js: 'id',
    typ: /*#__PURE__*/u(undefined, /*#__PURE__*/m(''))
  }, {
    json: 'name',
    js: 'name',
    typ: /*#__PURE__*/u(undefined, '')
  }], 'any'),
  Contact: /*#__PURE__*/o([{
    json: 'id',
    js: 'id',
    typ: /*#__PURE__*/r('ContactID')
  }, {
    json: 'type',
    js: 'type',
    typ: ''
  }, {
    json: 'name',
    js: 'name',
    typ: /*#__PURE__*/u(undefined, '')
  }], 'any'),
  ContactID: /*#__PURE__*/o([{
    json: 'email',
    js: 'email',
    typ: /*#__PURE__*/u(undefined, '')
  }, {
    json: 'FDS_ID',
    js: 'FDS_ID',
    typ: /*#__PURE__*/u(undefined, '')
  }], ''),
  InstrumentList: /*#__PURE__*/o([{
    json: 'instruments',
    js: 'instruments',
    typ: /*#__PURE__*/a( /*#__PURE__*/r('Instrument'))
  }, {
    json: 'type',
    js: 'type',
    typ: ''
  }, {
    json: 'id',
    js: 'id',
    typ: /*#__PURE__*/u(undefined, /*#__PURE__*/m(''))
  }, {
    json: 'name',
    js: 'name',
    typ: /*#__PURE__*/u(undefined, '')
  }], 'any'),
  Instrument: /*#__PURE__*/o([{
    json: 'id',
    js: 'id',
    typ: /*#__PURE__*/r('InstrumentID')
  }, {
    json: 'type',
    js: 'type',
    typ: ''
  }, {
    json: 'name',
    js: 'name',
    typ: /*#__PURE__*/u(undefined, '')
  }], 'any'),
  InstrumentID: /*#__PURE__*/o([{
    json: 'BBG',
    js: 'BBG',
    typ: /*#__PURE__*/u(undefined, '')
  }, {
    json: 'CUSIP',
    js: 'CUSIP',
    typ: /*#__PURE__*/u(undefined, '')
  }, {
    json: 'FDS_ID',
    js: 'FDS_ID',
    typ: /*#__PURE__*/u(undefined, '')
  }, {
    json: 'FIGI',
    js: 'FIGI',
    typ: /*#__PURE__*/u(undefined, '')
  }, {
    json: 'ISIN',
    js: 'ISIN',
    typ: /*#__PURE__*/u(undefined, '')
  }, {
    json: 'PERMID',
    js: 'PERMID',
    typ: /*#__PURE__*/u(undefined, '')
  }, {
    json: 'RIC',
    js: 'RIC',
    typ: /*#__PURE__*/u(undefined, '')
  }, {
    json: 'SEDOL',
    js: 'SEDOL',
    typ: /*#__PURE__*/u(undefined, '')
  }, {
    json: 'ticker',
    js: 'ticker',
    typ: /*#__PURE__*/u(undefined, '')
  }], ''),
  Country: /*#__PURE__*/o([{
    json: 'id',
    js: 'id',
    typ: /*#__PURE__*/r('CountryID')
  }, {
    json: 'type',
    js: 'type',
    typ: ''
  }, {
    json: 'name',
    js: 'name',
    typ: /*#__PURE__*/u(undefined, '')
  }], 'any'),
  CountryID: /*#__PURE__*/o([{
    json: 'ISOALPHA2',
    js: 'ISOALPHA2',
    typ: /*#__PURE__*/u(undefined, '')
  }, {
    json: 'ISOALPHA3',
    js: 'ISOALPHA3',
    typ: /*#__PURE__*/u(undefined, '')
  }], ''),
  Organization: /*#__PURE__*/o([{
    json: 'id',
    js: 'id',
    typ: /*#__PURE__*/r('OrganizationID')
  }, {
    json: 'type',
    js: 'type',
    typ: ''
  }, {
    json: 'name',
    js: 'name',
    typ: /*#__PURE__*/u(undefined, '')
  }], 'any'),
  OrganizationID: /*#__PURE__*/o([{
    json: 'FDS_ID',
    js: 'FDS_ID',
    typ: /*#__PURE__*/u(undefined, '')
  }, {
    json: 'LEI',
    js: 'LEI',
    typ: /*#__PURE__*/u(undefined, '')
  }, {
    json: 'PERMID',
    js: 'PERMID',
    typ: /*#__PURE__*/u(undefined, '')
  }], ''),
  Portfolio: /*#__PURE__*/o([{
    json: 'positions',
    js: 'positions',
    typ: /*#__PURE__*/a( /*#__PURE__*/r('Position'))
  }, {
    json: 'type',
    js: 'type',
    typ: ''
  }, {
    json: 'id',
    js: 'id',
    typ: /*#__PURE__*/u(undefined, /*#__PURE__*/m(''))
  }, {
    json: 'name',
    js: 'name',
    typ: /*#__PURE__*/u(undefined, '')
  }], 'any'),
  Position: /*#__PURE__*/o([{
    json: 'holding',
    js: 'holding',
    typ: 3.14
  }, {
    json: 'instrument',
    js: 'instrument',
    typ: /*#__PURE__*/r('Instrument')
  }, {
    json: 'type',
    js: 'type',
    typ: ''
  }, {
    json: 'id',
    js: 'id',
    typ: /*#__PURE__*/u(undefined, /*#__PURE__*/m(''))
  }, {
    json: 'name',
    js: 'name',
    typ: /*#__PURE__*/u(undefined, '')
  }], 'any')
};

var Intents;

(function (Intents) {
  Intents["StartCall"] = "StartCall";
  Intents["StartChat"] = "StartChat";
  Intents["ViewChart"] = "ViewChart";
  Intents["ViewContact"] = "ViewContact";
  Intents["ViewQuote"] = "ViewQuote";
  Intents["ViewNews"] = "ViewNews";
  Intents["ViewInstrument"] = "ViewInstrument";
  Intents["ViewAnalysis"] = "ViewAnalysis";
})(Intents || (Intents = {}));


//# sourceMappingURL=fdc3.esm.js.map


/***/ }),

/***/ "../../node_modules/@openfin/bloomberg/openfin.bloomberg.mjs":
/*!*******************************************************************!*\
  !*** ../../node_modules/@openfin/bloomberg/openfin.bloomberg.mjs ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AdapterError: () => (/* binding */ oe),
/* harmony export */   ApiError: () => (/* binding */ ae),
/* harmony export */   InitializationError: () => (/* binding */ ie),
/* harmony export */   InteropError: () => (/* binding */ se),
/* harmony export */   TerminalConnectRequestError: () => (/* binding */ ce),
/* harmony export */   TerminalConnectionError: () => (/* binding */ ue),
/* harmony export */   connect: () => (/* binding */ le),
/* harmony export */   disableLogging: () => (/* binding */ pe),
/* harmony export */   enableLogging: () => (/* binding */ de),
/* harmony export */   getSecurityFromInstrumentContext: () => (/* binding */ ge)
/* harmony export */ });
var e={d:(t,n)=>{for(var r in n)e.o(n,r)&&!e.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:n[r]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)},t={};e.d(t,{AdapterError:()=>AdapterError,ApiError:()=>ApiError,InitializationError:()=>InitializationError,InteropError:()=>InteropError,TerminalConnectRequestError:()=>TerminalConnectRequestError,TerminalConnectionError:()=>TerminalConnectionError,connect:()=>te,disableLogging:()=>I,enableLogging:()=>A,getSecurityFromInstrumentContext:()=>b});class ApiError extends Error{constructor(e="An unexpected error has occurred",t){super(e),this.name=this.constructor.name,this.stack=this.stack?.replace(/^(\w*Error)/,`${this.constructor.name}`),t&&(this.data=t)}}class AdapterError extends ApiError{constructor(e="Failed to execute adapter function",t){super(e,t)}}class InitializationError extends ApiError{constructor(e="Failed to initialize adapter",t){super(e,t)}}class InteropError extends ApiError{constructor(e="Failed to execute the interop function",t){super(e,t)}}class ParameterError extends ApiError{constructor(e){super(e=e??"Invalid parameter detected")}}class TerminalConnectionError extends ApiError{constructor(e="Failed to connect to the terminal",t){super(e,t)}}class TerminalConnectRequestError extends ApiError{constructor(e="Terminal Connect request failed",t){super(e,t)}}function n(e){return{arrayItems:e}}function r(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return{unionMembers:t}}function o(e,t){return{props:e,additional:t}}function a(e){return{props:[],additional:e}}function i(e){return{ref:e}}var s,c,u,l,p;Date,Date,Date,Date,Date,Date,Date,Date,Date,Date,Date,Date,Date,Date,Date,Date,Date,Date,Date,Date,Date,Date,Date,Date,Date,Date,Date,Date,Date,Date,Date,Date,Date,Date,Date,Date,Date,Date,Date,Date,Date,Date,Date,Date,Date,Date,Date,Date,Date,Date,Date,Date,Date,Date,Date,Date,Date,Date,Date,Date,Date,Date,Date,Date;!function(e){e.AppNotFound="AppNotFound",e.ErrorOnLaunch="ErrorOnLaunch",e.AppTimeout="AppTimeout",e.ResolverUnavailable="ResolverUnavailable",e.MalformedContext="MalformedContext",e.DesktopAgentNotFound="DesktopAgentNotFound"}(s||(s={})),function(e){e.NoAppsFound="NoAppsFound",e.ResolverUnavailable="ResolverUnavailable",e.UserCancelled="UserCancelledResolution",e.ResolverTimeout="ResolverTimeout",e.TargetAppUnavailable="TargetAppUnavailable",e.TargetInstanceUnavailable="TargetInstanceUnavailable",e.IntentDeliveryFailed="IntentDeliveryFailed",e.MalformedContext="MalformedContext",e.DesktopAgentNotFound="DesktopAgentNotFound"}(c||(c={})),function(e){e.NoResultReturned="NoResultReturned",e.IntentHandlerRejected="IntentHandlerRejected"}(u||(u={})),function(e){e.NoChannelFound="NoChannelFound",e.AccessDenied="AccessDenied",e.CreationFailed="CreationFailed",e.MalformedContext="MalformedContext"}(l||(l={})),function(e){e.ResponseTimedOut="ResponseToBridgeTimedOut",e.AgentDisconnected="AgentDisconnected",e.NotConnectedToBridge="NotConnectedToBridge",e.MalformedMessage="MalformedMessage"}(p||(p={}));var d;!function(e){e.Chart="fdc3.chart",e.ChatInitSettings="fdc3.chat.initSettings",e.ChatRoom="fdc3.chat.room",e.Contact="fdc3.contact",e.ContactList="fdc3.contactList",e.Country="fdc3.country",e.Currency="fdc3.currency",e.Email="fdc3.email",e.Instrument="fdc3.instrument",e.InstrumentList="fdc3.instrumentList",e.Interaction="fdc3.interaction",e.Nothing="fdc3.nothing",e.Organization="fdc3.organization",e.Portfolio="fdc3.portfolio",e.Position="fdc3.position",e.ChatSearchCriteria="fdc3.chat.searchCriteria",e.TimeRange="fdc3.timerange",e.TransactionResult="fdc3.transactionResult",e.Valuation="fdc3.valuation"}(d||(d={}));function g(e){return{arrayItems:e}}function m(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return{unionMembers:t}}function f(e,t){return{props:e,additional:t}}function w(e){return{props:[],additional:e}}function h(e){return{ref:e}}var y;Date,Date,Date,Date,Date,Date;!function(e){e.CreateInteraction="CreateInteraction",e.SendChatMessage="SendChatMessage",e.StartCall="StartCall",e.StartChat="StartChat",e.StartEmail="StartEmail",e.ViewAnalysis="ViewAnalysis",e.ViewChat="ViewChat",e.ViewChart="ViewChart",e.ViewContact="ViewContact",e.ViewHoldings="ViewHoldings",e.ViewInstrument="ViewInstrument",e.ViewInteractions="ViewInteractions",e.ViewMessages="ViewMessages",e.ViewNews="ViewNews",e.ViewOrders="ViewOrders",e.ViewProfile="ViewProfile",e.ViewQuote="ViewQuote",e.ViewResearch="ViewResearch"}(y||(y={}));const C=e=>{const t=Date.parse(e);if(!Number.isNaN(t))return new Date(t)},E=e=>{let t=/\s+([\w-]+$)/.exec(e)?.[1];if(t)return t=t.charAt(0).toUpperCase()+t.slice(1).toLowerCase().replace("-m","-M"),t},b=e=>{if(e.type!==d.Instrument)return;const{id:t,market:n}=e,{BBG:r,FIGI:o,ticker:a}=t;if(r||o)return r??o;if(!a)return;return`${a} ${n?.BBG?n.BBG:"US"} Equity`};let v=!1;const D="[@openfin/bloomberg]",I=()=>{v=!1},A=()=>{v=!0,N("v2.0.0")},R=(e,t)=>{if(!v)return;const n=t?`${D} ${t}`:D;e instanceof ApiError&&e.data?console.error(n,e,e.data):console.error(n,e)},N=(...e)=>{v&&console.log(D,...e)},x=(...e)=>{v&&console.warn(D,...e)};var T,S,M;"undefined"==typeof fin&&Object.assign(window,{fin:{}}),Object.assign(fin,{Integrations:{Bloomberg:{enableLogging:A,disableLogging:I}}}),function(e){e.CancelSubscription="CancelSubscription",e.Connect="Connect",e.CreateSubscription="CreateSubscription",e.Disconnect="Disconnect",e.ExecuteRequest="ExecuteRequest",e.LogMessage="LogMessage",e.SubscriptionEvent="SubscriptionEvent"}(T||(T={})),function(e){e[e.Error=0]="Error",e[e.Info=1]="Info",e[e.Warn=2]="Warn"}(S||(S={})),function(e){e.Local="Local",e.Remote="Remote"}(M||(M={}));const V=e=>async()=>{N("Retrieving launchpad groups");const t={query:"query {\n          groups {\n            ... on Groups {\n              items {\n                id\n                name\n                type\n                value\n              }\n            }\n            ... on Error {\n              errorCategory\n              errorMessage\n            }\n          }\n        }"};let n;try{n=await e(T.ExecuteRequest,t)}catch(e){const t=new AdapterError(void 0,e);throw R(t),t}if(!n.success){const e=new TerminalConnectRequestError(n.error?.message,n.error);throw R(e),e}if(!n.data){const e=new TerminalConnectRequestError("Unexpected empty response data",n);throw R(e),e}const{groups:r}=JSON.parse(n.data);if(r.items)return r.items;const o=new TerminalConnectRequestError(r.errorMessage,r);throw R(o),o},$=e=>async(t,n)=>{if(null==t||"number"!=typeof t||Number.isNaN(t))throw new ParameterError("Group ID must be a valid number");if(!n?.trim())throw new ParameterError("Group value must be a non-empty string");N("Setting group value",{groupId:t,newValue:n});const r={query:`mutation {\n          setGroupValue(\n            filter: {id: [${t}]},\n            value: "${n}") {\n            ... on GroupResults {\n              results {\n                result {\n                  succeeded\n                  details\n                }\n              }\n            }\n            ... on Error {\n              errorCategory\n              errorMessage\n            }\n          }\n        }`};let o;try{o=await e(T.ExecuteRequest,r)}catch(e){const t=new AdapterError(void 0,e);throw R(t),t}if(!o.success){const e=new TerminalConnectRequestError(o.error?.message,o.error);throw R(e),e}if(!o.data){const e=new TerminalConnectRequestError("Unexpected empty response data",o);throw R(e),e}const{setGroupValue:a}=JSON.parse(o.data);if("errorMessage"in a){const e=new TerminalConnectRequestError(a.errorMessage,a);throw R(e),e}},q=new Map,B=async(e,t,n,r)=>{const o=await O(e)(t);if(!o)return;const a=await(e=>async(t=[])=>{N("Creating group subscription",{groupIdFilter:t});const n={query:`subscription {\n        subscribeGroupEvents (\n          filter:{\n            event: [\n              VALUE_CHANGED\n            ]\n            ${t.length?`,group: {id: ${JSON.stringify(t)}}`:""}\n          }){\n          type\n          group{\n            id\n            name\n            value\n          }\n        }\n      }`};let r;try{r=await e(T.CreateSubscription,n)}catch(e){const t=new AdapterError(void 0,e);throw R(t),t}if(!r.success){const e=new TerminalConnectRequestError(r.error?.message,r.error);throw R(e),e}if(!r.data){const e=new TerminalConnectRequestError("Unexpected empty response data",r);throw R(e),e}const{subscriptionId:o}=JSON.parse(r.data);return o})(e)(o),i={id:a,listener:U(n,r),unsubscribe:F(e,a)};return q.set(a,i),i},F=(e,t)=>async()=>{N("Unsubscribing group events",{subscriptionId:t});try{await(e=>async t=>{const n={subscriptionId:t};let r;try{r=await e(T.CancelSubscription,n)}catch(e){const t=new AdapterError(void 0,e);throw R(t),t}if(!r.success){const e=new TerminalConnectRequestError(r.error?.message,r.error);throw R(e),e}})(e)(t)}catch(e){R(e)}q.delete(t)},U=(e,t)=>async n=>{try{e?.(n),N("Setting new context: ",n),await fin.me.interop.setContext(n)}catch(e){const n=new InteropError(void 0,e);R(n),t?.(n)}},P=async(e,t)=>{N("Group event received",{data:t,subscriptionId:e});const{group:n}=t.subscribeGroupEvents;if(!n)return void x("Received group event with no group",{subscriptionId:e});if(!q.has(e))return void x("Received group event for unknown subscription",{subscriptionId:e});const r=q.get(e),o=(e=>{const t={type:d.Instrument,id:{BBG:e}};if("Equity"===E(e)){const[n,r]=e.split(/\s+/);t.id.ticker=n?.toUpperCase(),t.market={BBG:r?.toUpperCase()}}return t})(n.value);o.openfinBbgApi=!0,r?.listener(o)},O=e=>async t=>{if(!t)return;if("*"===t)return[];Array.isArray(t)||(t=[t]);const n=await V(e)(),r=t.map((e=>{const t=n.find((t=>t.name?.toUpperCase()===e.toUpperCase()))?.id;return t||x(`Group not found: ${e}`),t})).filter(Boolean);return r.length?r:void 0},G="bloomberg-adapter",L=`bloomberg-adapter-${void 0!==crypto.randomUUID?crypto.randomUUID():"10000000-1000-4000-8000-100000000000".replace(/[018]/g,(e=>{const t=crypto.getRandomValues(new Uint8Array(1))[0]&15>>Number(e)/4;return(Number(e)^t).toString(16)}))}`;let k;const z=async(e=!1)=>{try{if(!await(async e=>(await fin.InterApplicationBus.Channel.getAllChannels()).some((t=>t.channelName===e)))(L)){const{port:t,securityRealm:n}=await fin.System.getRuntimeInfo(),{licenseKey:r}=await fin.Application.getCurrentSync().getManifest(),o=fin.me.uuid;N("Initializing adapter",{channelName:L,licenseKey:r,port:t,securityRealm:n,uuid:o,adapterLoggingEnabled:e}),await(async()=>{const e=await fin.Application.getCurrentSync().getManifest(),t=e.appAssets?.find((e=>e.alias===G));if(t)return void x("Detected adapter package in app manifest appAssets",t);if(await j())return void N("Using existing adapter package");const n={alias:G,src:"https://cdn.openfin.co/release/integrations/bloomberg/2.0.0/OpenFin.Bloomberg.zip",target:"OpenFin.Bloomberg.exe",version:"2.0.0"};N("Downloading adapter package",n);try{await fin.System.downloadAsset(n,(()=>{}))}catch(e){throw R("Unable to download adapter package"),e}})(),fin.System.launchExternalProcess({alias:G,arguments:`"${o}" "${r??""}" "${t}" "${n??""}" "${L}" "${e}"`,lifetime:"application"})}const n=fin.InterApplicationBus.Channel.connect(L,{payload:{version:"2.0.0"}}),r=new Promise((e=>{setTimeout(e,2e4)})).then((()=>{throw new ApiError("Connection to adapter timed out")}));return k=await Promise.race([n,r]),k.register(T.LogMessage,H),k.register(T.SubscriptionEvent,J),N("Connected to adapter",{uuid:k.providerIdentity.uuid}),{channelName:L,dispatch:(...e)=>k.dispatch(...e),initTerminal:(t=k,async e=>{const n={apiKey:e};let r;try{r=await t.dispatch(T.Connect,n)}catch(e){const t=new AdapterError(void 0,e);throw R(t),t}if(!r.success){const e=new TerminalConnectionError(r.error?.message,r.error);throw R(e),e}}),version:"2.0.0"}}catch(e){const t=e instanceof ApiError?new InitializationError(e.message):new InitializationError(void 0,e);throw R(t),t}var t},H=e=>{const{level:t,message:n}=e,r="[adapter]";switch(t){case S.Error:R(n,r);break;case S.Warn:x(r,n);break;case S.Info:default:N(r,n)}},J=async e=>{const{data:t,error:n,subscriptionId:r}=e;if(!r||!t){const t=new TerminalConnectRequestError("Invalid subscription event",e);throw R(t),t}if(n){const e=new TerminalConnectRequestError(void 0,n);throw R(e),e}const o=JSON.parse(t);if(!0===Boolean(o.subscribeGroupEvents))await P(r,o);else x("Received unknown subscription event",t)},j=async()=>{try{return"2.0.0"===(await fin.System.getAppAssetInfo({alias:G})).version}catch(e){return!1}},Q=async(e,t)=>{if(!e)return void x("No action specified, ignoring");if("group"in e){const{group:n,security:r}=e;return void await(e=>async(t,n)=>{if(!n)return;N(`Setting ${"*"===t?"every group":`group ${t}`} security to ${n}`);const r=await V(e)();if("*"===t)await Promise.all(r.map((t=>t.id?$(e)(t.id,n):Promise.resolve())));else{const o=r.find((e=>e.name?.toUpperCase()===t.toUpperCase()))?.id;null==o?x(`Unable to update group security for ${t}: group not found`):await $(e)(o,n)}})(t)(n,r)}const{mnemonic:n,securities:r,target:o,tail:a}=e,[i,s]=r??[];await(e=>async(t,n,r,o,a)=>{if(!t?.trim())throw new ParameterError("Mnemonic must be a non-empty string");if(null==n||"string"==typeof n&&!n?.trim())throw new ParameterError("Target must be a number (0-3) or non-empty string");N("Running terminal function",{mnemonic:t,target:n,security1:r,security2:o,tail:a});const i=t.trim().toUpperCase();let s,c;"number"==typeof n?(s="runFunctionInPanel",c="panel: "+(1===n?"ONE":2===n?"TWO":3===n?"THREE":"ZERO")):(s="runFunctionInTab",c=`tabName: "${n.trim()}"`);const u={query:`mutation {\n        ${s}(input: {\n          mnemonic: "${i}",\n          ${c},\n          ${r?`security1: "${r}"`:""}\n          ${o?`security2: "${o}"`:""}\n          ${a?`tail: "${a}"`:""}\n        }) {\n          ... on Result {\n            succeeded\n            details\n          }\n          ... on Error {\n            errorCategory\n            errorMessage\n          }\n        }\n      }`};let l;try{l=await e(T.ExecuteRequest,u)}catch(e){const t=new AdapterError(void 0,e);throw R(t),t}if(!l.success){const e=new TerminalConnectRequestError(l.error?.message,l.error);throw R(e),e}if(l.data){const e=JSON.parse(l.data);let t;if("runFunctionInTab"in e?t=e.runFunctionInTab.errorMessage:"runFunctionInPanel"in e&&(t=e.runFunctionInPanel.errorMessage),t){const n=new TerminalConnectRequestError(t,e);throw R(n),n}}})(t)(n,o,i,s,a)},W=()=>e=>{const t=e,{name:n,id:r}=t,o=r?.BBG??n;if(o)return{mnemonic:"BIO",target:0,tail:o};x("No valid identifier provided in context, ignoring")},Y=e=>t=>{const n=b(t);if(n)return{mnemonic:e,securities:[n],target:0};x("No security provided in context, ignoring")},K=async(e,t,n,r)=>{const o=(()=>{const e=[],t=[];return e.push([d.Instrument,Y("DES")]),e.push([d.Contact,W()]),e.push([d.Organization,_()]),t.push([y.StartChat,[[d.Nothing,Z("IB")],[d.Contact,e=>{const{id:t,name:n}=e;return{mnemonic:"IB",target:0,tail:t.email??n}}]]]),t.push([y.ViewAnalysis,[[d.Nothing,Z("ANR")],[d.Instrument,e=>{const t=b(e);if(!t)return void x("No security provided in context, ignoring");let n;switch(E(t)){case"Equity":case"Index":n="FA";break;case"Corp":case"Govt":case"Mtge":case"Muni":case"Pfd":n="YAS";break;default:n="ANR"}return{mnemonic:n,securities:[t],target:0}}]]]),t.push([y.ViewChart,[[d.Nothing,Z("GIP")],[d.Instrument,Y("GIP")],[d.Chart,e=>{const{interval:t,instruments:n,range:r,style:o}=e,a={mnemonic:"GIP",target:0};let i=!0;const s=b(n?.[0]??e);s&&(a.securities=[s]);const{endTime:c,startTime:u}=r??{};if(u){const e=C(u.toString());if(e&&(a.tail=`${e.getMonth()+1}/${e.getDate()}/${e.getFullYear()}`,i=!1,c)){const e=C(c.toString());e&&(a.tail+=` ${e.getMonth()+1}/${e.getDate()}/${e.getFullYear()}`)}}switch(o?.toLowerCase()){case"bar":a.mnemonic=i?"IGPO":"GPO";break;case"candle":a.mnemonic=i?"IGPC":"GPC";break;default:a.mnemonic=i?"GIP":"GP"}if(!i&&t)switch(t.toLowerCase()){case"daily":a.tail+=" D";break;case"weekly":a.tail+=" W";break;case"monthly":a.tail+="M";break;case"quarterly":a.tail+=" Q";break;case"yearly":a.tail+=" Y"}return a}]]]),t.push([y.ViewChat,[[d.Nothing,Z("IB")],[d.Contact,e=>{const{id:t,name:n}=e;return{mnemonic:"IB",target:0,tail:t.email??n}}]]]),t.push([y.ViewContact,[[d.Nothing,Z("BIO")],[d.Contact,W()]]]),t.push([y.ViewInstrument,[[d.Nothing,Z("DES")],[d.Instrument,Y("DES")]]]),t.push([y.ViewNews,[[d.Nothing,Z("CN")],[d.Instrument,Y("CN")]]]),t.push([y.ViewProfile,[[d.Nothing,Z("DES")],[d.Contact,W()],[d.Organization,_()]]]),t.push([y.ViewQuote,[[d.Nothing,Z("ALLQ")],[d.Instrument,Y("ALLQ")]]]),t.push([y.ViewResearch,[[d.Nothing,Z("BRC")],[d.Instrument,Y("BRC")]]]),{contexts:e,intents:t}})(),a=(e=>{const t=([e])=>!!(e??"").trim();return{contexts:[...e?.contexts??[]].filter(t),intents:[...e?.intents??[]].filter((([e,n])=>{const r=[...n??[]].filter(t);return!!(e??"").trim()&&r.length>0}))}})(t),i=new Map(o.contexts);a.contexts?.forEach((([e])=>{i.has(e)&&i.delete(e)})),o.contexts=Array.from(i);const s=new Map(o.intents);a.intents?.forEach((([e])=>{s.has(e)&&s.delete(e)})),o.intents=Array.from(s);const c=[...o.contexts,...a.contexts??[]],u=[...o.intents,...a.intents??[]],l=[];let p;c.length&&l.push(fin.me.interop.addContextHandler(((e,t,n,r)=>async o=>{o?!0!==o.openfinBbgApi&&(N("Context received",o),o.type!==d.Nothing?await X(e,o,t,n,r):N("Null context received, ignoring")):N("No context info provided, ignoring")})(e,c,n,r))),u.length&&u.forEach((([t,o])=>{l.push(fin.me.interop.registerIntentHandler(((e,t,n,r)=>async o=>{N("Intent received",o),t?await X(e,o.context,t,n,r):x(`No actions have been provided for intent ${o.name}, ignoring`)})(e,o,n,r),t))}));try{p=await Promise.all(l)}catch(e){const t=new InteropError("Failed to register interop handlers",e);throw R(t),t}return p},Z=e=>t=>({mnemonic:e,target:0}),_=()=>e=>{const{name:t}=e;if(t)return{mnemonic:"SEAR",target:0,tail:t};x("No valid identifier provided in context, ignoring")},X=async(e,t,n,r,o)=>{r?.(t),N("Processing context",t),n.some((([e])=>e===t.type))?await Promise.all(n.filter((([e])=>e===t.type)).map((async([,n])=>{let r;try{r=await n(t)}catch(e){const t=new ApiError("Unexpected error in context action handler",e);return R(t),void o?.(t)}try{await Q(r,e)}catch(e){const t=e instanceof ApiError?e:new ApiError(void 0,e);R(t),o?.(t)}}))):x(`No action has been defined for context type ${t.type}, ignoring`)};var ee;!function(e){e.Bloomberg="BLOOMBERG"}(ee||(ee={}));const te=async(e,t)=>{N("Creating connection",{config:t}),re(ee.Bloomberg);const n=await z(v);await n.initTerminal(e);const{actions:r,interopDisabled:o,onContextChanged:a,onError:i}=t??{},s=void 0===t?.groups?"*":t.groups,c=[];if(!0!==o){c.push(...await K(n.dispatch,r,a,i));const e=await B(n.dispatch,s,a,i);e&&c.push(e)}return{disconnect:ne(n.dispatch,c),executeApiRequest:(u=n.dispatch,async(e,t)=>{N("Executing API request",{query:e});const n={query:e};let r;t&&(n.service=t);try{r=await u(T.ExecuteRequest,n)}catch(e){const t=new AdapterError(void 0,e);throw R(t),t}if(!r.success){const e=new TerminalConnectRequestError(r.error?.message,r.error);throw R(e),e}if(!r.data){const e=new TerminalConnectRequestError("Unexpected empty response data",r);throw R(e),e}const o=JSON.parse(r.data);if("errorMessage"in o){const e=new TerminalConnectRequestError(o.errorMessage,o);throw R(e),e}return o})};var u},ne=(e,t=[])=>async()=>{N("Disconnecting");try{await Promise.all(t.map((async e=>{await e.unsubscribe()}))),await(e=>async()=>{let t;try{t=await e(T.Disconnect,null)}catch(e){const t=new AdapterError(void 0,e);throw R(t),t}if(!t.success){const e=new TerminalConnectionError("Failed to disconnect terminal",t.error);throw R(e),e}})(e)()}catch(e){const t=new ApiError("Disconnection failed",e);throw R(t),t}},re=async e=>{try{await fin.System.registerUsage({type:"integration-feature",data:{apiVersion:"2.0.0",componentName:e}})}catch(t){x(`Unable to register usage for feature ${e}: ${t?.message}`)}};var oe=t.AdapterError,ae=t.ApiError,ie=t.InitializationError,se=t.InteropError,ce=t.TerminalConnectRequestError,ue=t.TerminalConnectionError,le=t.connect,pe=t.disableLogging,de=t.enableLogging,ge=t.getSecurityFromInstrumentContext;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!*******************************!*\
  !*** ./client/src/bbgtest.ts ***!
  \*******************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _finos_fdc3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @finos/fdc3 */ "../../node_modules/@finos/fdc3/dist/fdc3.esm.js");
/* harmony import */ var _openfin_bloomberg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @openfin/bloomberg */ "../../node_modules/@openfin/bloomberg/openfin.bloomberg.mjs");


let bbgConnection;
let selectedIntentType = "";
let selectedIntentValue = "";
let fdc3Denomination = "";
let bbgMnemonic = "";
let btnConnect;
let btnDisconnect;
let btnClearLogs;
let btnQuery;
let intentTypeElement;
let intentValueElement;
let logOutput;
const API_KEY = "";
const config = {
    onContextChanged: (context) => {
        logInformation(`Received context: ${JSON.stringify(context)}`);
    },
    onError: (error) => logInformation(error.message),
    groups: ["Group-A"],
    interopDisabled: false,
    actions: {
        contexts: [
            [
                _finos_fdc3__WEBPACK_IMPORTED_MODULE_0__.ContextTypes.Instrument,
                (context) => {
                    // Use the getSecurityFromInstrumentContext utility function to extract the security string from the context
                    const security = (0,_openfin_bloomberg__WEBPACK_IMPORTED_MODULE_1__.getSecurityFromInstrumentContext)(context);
                    if (!security) {
                        return;
                    }
                    logInformation(`Received Instrument Context: ${security}`);
                    // Return a BloombergGroupUpdate object that updates Launchpad group A with the security
                    return {
                        group: "Group-A",
                        security
                    };
                }
            ]
        ]
    }
};
window.addEventListener("DOMContentLoaded", async () => {
    // Enable logging in the BBG package
    (0,_openfin_bloomberg__WEBPACK_IMPORTED_MODULE_1__.enableLogging)();
    // Initialize the DOM elements.
    initializeDOM();
});
/**
 * Initialize the DOM.
 */
function initializeDOM() {
    btnConnect = document.querySelector("#btnConnect");
    btnDisconnect = document.querySelector("#btnDisconnect");
    btnClearLogs = document.querySelector("#btnClear");
    btnQuery = document.querySelector("#btnQuery");
    intentTypeElement = document.querySelector("#intentType");
    intentValueElement = document.querySelector("#intentValue");
    logOutput = document.querySelector("#logOutput");
    if (btnConnect) {
        btnConnect.addEventListener("click", async () => {
            if (btnConnect) {
                btnConnect.disabled = true;
            }
            await connectToBBGTerminal();
            updateState();
        });
    }
    if (btnDisconnect) {
        btnDisconnect.addEventListener("click", async () => {
            if (btnDisconnect) {
                btnDisconnect.disabled = true;
            }
            await disconnectFromBBGTerminal();
            updateState();
        });
    }
    if (btnClearLogs) {
        btnClearLogs.addEventListener("click", clearLogs);
    }
    if (btnQuery) {
        btnQuery.addEventListener("click", fireIntentForBBG);
    }
    if (intentTypeElement) {
        intentTypeElement.addEventListener("change", (event) => {
            if (intentTypeElement?.value) {
                if (btnQuery) {
                    btnQuery.disabled = true;
                }
                switch (intentTypeElement?.value) {
                    case "ViewChart":
                        logInformation("Intent to be fired is ViewChart. Content Type is fdc3.instrument. Bloomberg Terminal Mnemonic: GP");
                        selectedIntentType = "ViewChart";
                        fdc3Denomination = "fdc3.instrument";
                        bbgMnemonic = "GP";
                        populateSelect(intentValueElement, [
                            {
                                value: "ORCL",
                                label: "Oracle Corp"
                            },
                            {
                                value: "MSFT",
                                label: "Microsoft"
                            },
                            {
                                value: "IBM",
                                label: "IBM"
                            }
                        ]);
                        break;
                    case "ViewContact":
                        logInformation("Intent to be fired is ViewContact. Content Type is fdc3.contact. Bloomberg Terminal Mnemonic: BIO");
                        selectedIntentType = "ViewContact";
                        fdc3Denomination = "fdc3.contact";
                        bbgMnemonic = "BIO";
                        populateSelect(intentValueElement, [
                            {
                                value: "William Henry Gates",
                                label: "William Henry Gates"
                            },
                            {
                                value: "Larry Ellison",
                                label: "Larry Ellison"
                            },
                            {
                                value: "Robert Iger",
                                label: "Robert Iger"
                            }
                        ]);
                        break;
                    case "ViewInstrument":
                        logInformation("Intent to be fired is ViewInstrument. Content Type is fdc3.instrument. Bloomberg Terminal Mnemonic: DES");
                        selectedIntentType = "ViewInstrument";
                        fdc3Denomination = "fdc3.instrument";
                        bbgMnemonic = "DES";
                        populateSelect(intentValueElement, [
                            {
                                value: "ORCL",
                                label: "Oracle Corp"
                            },
                            {
                                value: "MSFT",
                                label: "Microsoft"
                            },
                            {
                                value: "IBM",
                                label: "IBM"
                            }
                        ]);
                        break;
                    case "ViewQuote":
                        logInformation("Intent to be fired is ViewQuote. Content Type is fdc3.instrument. Bloomberg Terminal Mnemonic: Q");
                        selectedIntentType = "ViewQuote";
                        fdc3Denomination = "fdc3.instrument";
                        bbgMnemonic = "Q";
                        populateSelect(intentValueElement, [
                            {
                                value: "ORCL",
                                label: "Oracle Corp"
                            },
                            {
                                value: "MSFT",
                                label: "Microsoft"
                            },
                            {
                                value: "IBM",
                                label: "IBM"
                            }
                        ]);
                        break;
                }
                updateState();
            }
        });
    }
    if (intentValueElement) {
        intentValueElement.addEventListener("change", () => {
            if (intentValueElement) {
                selectedIntentValue = intentValueElement.value;
                if (selectedIntentValue.length > 0) {
                    logInformation(`action: ${selectedIntentType}, type: ${fdc3Denomination}, bbg mnemonic: ${bbgMnemonic}, search value: ${selectedIntentValue}`);
                }
                updateState();
            }
        });
    }
    updateState();
}
/**
 * Connect to Bloomberg Terminal.
 */
async function connectToBBGTerminal() {
    try {
        logInformation("Checking Bloomberg Terminal Status");
        bbgConnection = await (0,_openfin_bloomberg__WEBPACK_IMPORTED_MODULE_1__.connect)(API_KEY, config);
        logInformation("Connection successful");
    }
    catch (error) {
        bbgConnection = undefined;
        console.log(error);
        logInformation(errorToString(error));
    }
}
/**
 * Disconnect from Bloomberg Terminal.
 */
async function disconnectFromBBGTerminal() {
    if (bbgConnection) {
        try {
            logInformation("Disconnecting from Bloomberg Terminal");
            await bbgConnection.disconnect();
        }
        finally {
            bbgConnection = undefined;
            logInformation("Disconnected from Bloomberg Terminal");
        }
    }
}
/**
 * Fire an intent.
 */
async function fireIntentForBBG() {
    if (bbgConnection) {
        try {
            logInformation(`action: ${selectedIntentType}, type: ${fdc3Denomination}, bbg mnemonic: ${bbgMnemonic}, search value: ${selectedIntentValue}`);
            let intent;
            switch (selectedIntentType) {
                case "ViewContact":
                    intent = {
                        name: selectedIntentType,
                        context: {
                            type: fdc3Denomination,
                            name: selectedIntentValue,
                            id: {}
                        }
                    };
                    break;
                default:
                    intent = {
                        name: selectedIntentType,
                        context: {
                            type: fdc3Denomination,
                            id: {
                                ticker: selectedIntentValue
                            }
                        }
                    };
                    break;
            }
            await fin.me.interop.fireIntent(intent);
        }
        catch (error) {
            logInformation(`Error while trying to raise intent: ${errorToString(error)}`);
        }
    }
    else {
        logInformation("Not connected to the Bloomberg Terminal. Please check your status or log in again.");
    }
}
/**
 * Update the state of the DOM.
 */
function updateState() {
    const isConnected = bbgConnection !== undefined;
    if (btnConnect) {
        btnConnect.disabled = isConnected;
    }
    if (btnDisconnect) {
        btnDisconnect.disabled = !isConnected;
    }
    if (intentTypeElement) {
        intentTypeElement.disabled = !isConnected;
    }
    if (intentValueElement) {
        intentValueElement.disabled = !isConnected || selectedIntentType.length === 0;
    }
    if (btnQuery) {
        btnQuery.disabled = !isConnected || selectedIntentValue.length === 0;
    }
}
/**
 * Log information to the output element.
 * @param info The information to log.
 */
function logInformation(info) {
    if (logOutput) {
        logOutput.textContent = `${logOutput.textContent}${info}\n\n`;
        logOutput.scrollTop = logOutput.scrollHeight;
    }
}
/**
 * Convert and error to a string.
 * @param err The error to convert.
 * @returns The error as a string.
 */
function errorToString(err) {
    if (err instanceof Error) {
        return err.message;
    }
    else if (typeof err === "string") {
        return err;
    }
    return JSON.stringify(err);
}
/**
 * Clear the logs.
 */
function clearLogs() {
    if (logOutput) {
        logOutput.textContent = "";
        logOutput.scrollTop = 0;
    }
}
/**
 * Populate a select control with a list of items.
 * @param select The select element to populate.
 * @param values The values to populate the element with.
 */
function populateSelect(select, values) {
    if (select) {
        select.innerHTML = "";
        const opt = document.createElement("option");
        opt.value = "";
        opt.text = "Please select value";
        opt.disabled = true;
        opt.selected = true;
        select.append(opt);
        for (const val of values) {
            const optVal = document.createElement("option");
            optVal.value = val.value;
            optVal.text = val.label;
            select.append(optVal);
        }
    }
}

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmJndGVzdC5idW5kbGUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyw4QkFBOEI7O0FBRS9COztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxvQ0FBb0M7O0FBRXJDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxvQ0FBb0M7O0FBRXJDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0EsbUJBQW1CLGFBQWE7QUFDaEM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLG1CQUFtQjtBQUNuQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlO0FBQ2YsTUFBTTtBQUNOLGVBQWU7QUFDZjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBEQUEwRDtBQUMxRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0EsV0FBVztBQUNYOztBQUVBO0FBQ0E7QUFDQSx3Q0FBd0MsV0FBVztBQUNuRDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsNEJBQTRCO0FBQzVCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxVQUFVO0FBQ1Y7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHFDQUFxQyxjQUFjO0FBQ25EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGlDQUFpQyxtQkFBbUI7QUFDcEQ7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGtCQUFrQjs7QUFFbEI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCLGdCQUFnQjtBQUN6QztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGFBQWE7QUFDYjtBQUNBOztBQUVBO0FBQ0EsYUFBYTtBQUNiOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsK0NBQStDLFFBQVE7QUFDdkQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBOztBQUVBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7O0FBRUEsWUFBWTtBQUNaO0FBQ0E7QUFDQTs7QUFFQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0EsK0NBQStDLFFBQVE7QUFDdkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTs7QUFFQTtBQUNBLEtBQUs7O0FBRUw7QUFDQSwrQ0FBK0MsUUFBUTtBQUN2RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQSwrQ0FBK0MsUUFBUTtBQUN2RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEI7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLGNBQWM7O0FBRS9CO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBLGFBQWE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxJQUFJO0FBQ0o7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsd0JBQXdCLGtEQUFrRDtBQUMxRTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsb0NBQW9DOztBQUVyQztBQUNBO0FBQ0EsY0FBYyxpSEFBaUg7QUFDL0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLG9CQUFvQixPQUFPO0FBQzNCOztBQUVBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLElBQUk7OztBQUdKO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxzRUFBc0UsYUFBYTtBQUNuRjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FB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YWNrOi8vaW50ZWdyYXRlLXdpdGgtYmxvb21iZXJnLWJhc2ljLy4uLy4uL25vZGVfbW9kdWxlcy9AZmlub3MvZmRjMy9kaXN0L2ZkYzMuZXNtLmpzIiwid2VicGFjazovL2ludGVncmF0ZS13aXRoLWJsb29tYmVyZy1iYXNpYy8uLi8uLi9ub2RlX21vZHVsZXMvQG9wZW5maW4vYmxvb21iZXJnL29wZW5maW4uYmxvb21iZXJnLm1qcyIsIndlYnBhY2s6Ly9pbnRlZ3JhdGUtd2l0aC1ibG9vbWJlcmctYmFzaWMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vaW50ZWdyYXRlLXdpdGgtYmxvb21iZXJnLWJhc2ljL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9pbnRlZ3JhdGUtd2l0aC1ibG9vbWJlcmctYmFzaWMvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9pbnRlZ3JhdGUtd2l0aC1ibG9vbWJlcmctYmFzaWMvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9pbnRlZ3JhdGUtd2l0aC1ibG9vbWJlcmctYmFzaWMvLi9jbGllbnQvc3JjL2JiZ3Rlc3QudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXHJcbiAqIENvcHlyaWdodCAyMDE5IEZJTk9TIEZEQzMgY29udHJpYnV0b3JzIC0gc2VlIE5PVElDRSBmaWxlXHJcbiAqL1xudmFyIE9wZW5FcnJvcjtcblxuKGZ1bmN0aW9uIChPcGVuRXJyb3IpIHtcbiAgT3BlbkVycm9yW1wiQXBwTm90Rm91bmRcIl0gPSBcIkFwcE5vdEZvdW5kXCI7XG4gIE9wZW5FcnJvcltcIkVycm9yT25MYXVuY2hcIl0gPSBcIkVycm9yT25MYXVuY2hcIjtcbiAgT3BlbkVycm9yW1wiQXBwVGltZW91dFwiXSA9IFwiQXBwVGltZW91dFwiO1xuICBPcGVuRXJyb3JbXCJSZXNvbHZlclVuYXZhaWxhYmxlXCJdID0gXCJSZXNvbHZlclVuYXZhaWxhYmxlXCI7XG59KShPcGVuRXJyb3IgfHwgKE9wZW5FcnJvciA9IHt9KSk7XG5cbnZhciBSZXNvbHZlRXJyb3I7XG5cbihmdW5jdGlvbiAoUmVzb2x2ZUVycm9yKSB7XG4gIFJlc29sdmVFcnJvcltcIk5vQXBwc0ZvdW5kXCJdID0gXCJOb0FwcHNGb3VuZFwiO1xuICBSZXNvbHZlRXJyb3JbXCJSZXNvbHZlclVuYXZhaWxhYmxlXCJdID0gXCJSZXNvbHZlclVuYXZhaWxhYmxlXCI7XG4gIFJlc29sdmVFcnJvcltcIlJlc29sdmVyVGltZW91dFwiXSA9IFwiUmVzb2x2ZXJUaW1lb3V0XCI7XG59KShSZXNvbHZlRXJyb3IgfHwgKFJlc29sdmVFcnJvciA9IHt9KSk7XG5cbnZhciBDaGFubmVsRXJyb3I7XG5cbihmdW5jdGlvbiAoQ2hhbm5lbEVycm9yKSB7XG4gIENoYW5uZWxFcnJvcltcIk5vQ2hhbm5lbEZvdW5kXCJdID0gXCJOb0NoYW5uZWxGb3VuZFwiO1xuICBDaGFubmVsRXJyb3JbXCJBY2Nlc3NEZW5pZWRcIl0gPSBcIkFjY2Vzc0RlbmllZFwiO1xuICBDaGFubmVsRXJyb3JbXCJDcmVhdGlvbkZhaWxlZFwiXSA9IFwiQ3JlYXRpb25GYWlsZWRcIjtcbn0pKENoYW5uZWxFcnJvciB8fCAoQ2hhbm5lbEVycm9yID0ge30pKTtcblxuZnVuY3Rpb24gYXN5bmNHZW5lcmF0b3JTdGVwKGdlbiwgcmVzb2x2ZSwgcmVqZWN0LCBfbmV4dCwgX3Rocm93LCBrZXksIGFyZykge1xuICB0cnkge1xuICAgIHZhciBpbmZvID0gZ2VuW2tleV0oYXJnKTtcbiAgICB2YXIgdmFsdWUgPSBpbmZvLnZhbHVlO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJlamVjdChlcnJvcik7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgaWYgKGluZm8uZG9uZSkge1xuICAgIHJlc29sdmUodmFsdWUpO1xuICB9IGVsc2Uge1xuICAgIFByb21pc2UucmVzb2x2ZSh2YWx1ZSkudGhlbihfbmV4dCwgX3Rocm93KTtcbiAgfVxufVxuXG5mdW5jdGlvbiBfYXN5bmNUb0dlbmVyYXRvcihmbikge1xuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIHZhciBzZWxmID0gdGhpcyxcbiAgICAgICAgYXJncyA9IGFyZ3VtZW50cztcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgdmFyIGdlbiA9IGZuLmFwcGx5KHNlbGYsIGFyZ3MpO1xuXG4gICAgICBmdW5jdGlvbiBfbmV4dCh2YWx1ZSkge1xuICAgICAgICBhc3luY0dlbmVyYXRvclN0ZXAoZ2VuLCByZXNvbHZlLCByZWplY3QsIF9uZXh0LCBfdGhyb3csIFwibmV4dFwiLCB2YWx1ZSk7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIF90aHJvdyhlcnIpIHtcbiAgICAgICAgYXN5bmNHZW5lcmF0b3JTdGVwKGdlbiwgcmVzb2x2ZSwgcmVqZWN0LCBfbmV4dCwgX3Rocm93LCBcInRocm93XCIsIGVycik7XG4gICAgICB9XG5cbiAgICAgIF9uZXh0KHVuZGVmaW5lZCk7XG4gICAgfSk7XG4gIH07XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUNvbW1vbmpzTW9kdWxlKGZuLCBtb2R1bGUpIHtcblx0cmV0dXJuIG1vZHVsZSA9IHsgZXhwb3J0czoge30gfSwgZm4obW9kdWxlLCBtb2R1bGUuZXhwb3J0cyksIG1vZHVsZS5leHBvcnRzO1xufVxuXG52YXIgcnVudGltZV8xID0gY3JlYXRlQ29tbW9uanNNb2R1bGUoZnVuY3Rpb24gKG1vZHVsZSkge1xuLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG52YXIgcnVudGltZSA9IChmdW5jdGlvbiAoZXhwb3J0cykge1xuXG4gIHZhciBPcCA9IE9iamVjdC5wcm90b3R5cGU7XG4gIHZhciBoYXNPd24gPSBPcC5oYXNPd25Qcm9wZXJ0eTtcbiAgdmFyIHVuZGVmaW5lZCQxOyAvLyBNb3JlIGNvbXByZXNzaWJsZSB0aGFuIHZvaWQgMC5cbiAgdmFyICRTeW1ib2wgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgPyBTeW1ib2wgOiB7fTtcbiAgdmFyIGl0ZXJhdG9yU3ltYm9sID0gJFN5bWJvbC5pdGVyYXRvciB8fCBcIkBAaXRlcmF0b3JcIjtcbiAgdmFyIGFzeW5jSXRlcmF0b3JTeW1ib2wgPSAkU3ltYm9sLmFzeW5jSXRlcmF0b3IgfHwgXCJAQGFzeW5jSXRlcmF0b3JcIjtcbiAgdmFyIHRvU3RyaW5nVGFnU3ltYm9sID0gJFN5bWJvbC50b1N0cmluZ1RhZyB8fCBcIkBAdG9TdHJpbmdUYWdcIjtcblxuICBmdW5jdGlvbiBkZWZpbmUob2JqLCBrZXksIHZhbHVlKSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7XG4gICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgd3JpdGFibGU6IHRydWVcbiAgICB9KTtcbiAgICByZXR1cm4gb2JqW2tleV07XG4gIH1cbiAgdHJ5IHtcbiAgICAvLyBJRSA4IGhhcyBhIGJyb2tlbiBPYmplY3QuZGVmaW5lUHJvcGVydHkgdGhhdCBvbmx5IHdvcmtzIG9uIERPTSBvYmplY3RzLlxuICAgIGRlZmluZSh7fSwgXCJcIik7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGRlZmluZSA9IGZ1bmN0aW9uKG9iaiwga2V5LCB2YWx1ZSkge1xuICAgICAgcmV0dXJuIG9ialtrZXldID0gdmFsdWU7XG4gICAgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHdyYXAoaW5uZXJGbiwgb3V0ZXJGbiwgc2VsZiwgdHJ5TG9jc0xpc3QpIHtcbiAgICAvLyBJZiBvdXRlckZuIHByb3ZpZGVkIGFuZCBvdXRlckZuLnByb3RvdHlwZSBpcyBhIEdlbmVyYXRvciwgdGhlbiBvdXRlckZuLnByb3RvdHlwZSBpbnN0YW5jZW9mIEdlbmVyYXRvci5cbiAgICB2YXIgcHJvdG9HZW5lcmF0b3IgPSBvdXRlckZuICYmIG91dGVyRm4ucHJvdG90eXBlIGluc3RhbmNlb2YgR2VuZXJhdG9yID8gb3V0ZXJGbiA6IEdlbmVyYXRvcjtcbiAgICB2YXIgZ2VuZXJhdG9yID0gT2JqZWN0LmNyZWF0ZShwcm90b0dlbmVyYXRvci5wcm90b3R5cGUpO1xuICAgIHZhciBjb250ZXh0ID0gbmV3IENvbnRleHQodHJ5TG9jc0xpc3QgfHwgW10pO1xuXG4gICAgLy8gVGhlIC5faW52b2tlIG1ldGhvZCB1bmlmaWVzIHRoZSBpbXBsZW1lbnRhdGlvbnMgb2YgdGhlIC5uZXh0LFxuICAgIC8vIC50aHJvdywgYW5kIC5yZXR1cm4gbWV0aG9kcy5cbiAgICBnZW5lcmF0b3IuX2ludm9rZSA9IG1ha2VJbnZva2VNZXRob2QoaW5uZXJGbiwgc2VsZiwgY29udGV4dCk7XG5cbiAgICByZXR1cm4gZ2VuZXJhdG9yO1xuICB9XG4gIGV4cG9ydHMud3JhcCA9IHdyYXA7XG5cbiAgLy8gVHJ5L2NhdGNoIGhlbHBlciB0byBtaW5pbWl6ZSBkZW9wdGltaXphdGlvbnMuIFJldHVybnMgYSBjb21wbGV0aW9uXG4gIC8vIHJlY29yZCBsaWtlIGNvbnRleHQudHJ5RW50cmllc1tpXS5jb21wbGV0aW9uLiBUaGlzIGludGVyZmFjZSBjb3VsZFxuICAvLyBoYXZlIGJlZW4gKGFuZCB3YXMgcHJldmlvdXNseSkgZGVzaWduZWQgdG8gdGFrZSBhIGNsb3N1cmUgdG8gYmVcbiAgLy8gaW52b2tlZCB3aXRob3V0IGFyZ3VtZW50cywgYnV0IGluIGFsbCB0aGUgY2FzZXMgd2UgY2FyZSBhYm91dCB3ZVxuICAvLyBhbHJlYWR5IGhhdmUgYW4gZXhpc3RpbmcgbWV0aG9kIHdlIHdhbnQgdG8gY2FsbCwgc28gdGhlcmUncyBubyBuZWVkXG4gIC8vIHRvIGNyZWF0ZSBhIG5ldyBmdW5jdGlvbiBvYmplY3QuIFdlIGNhbiBldmVuIGdldCBhd2F5IHdpdGggYXNzdW1pbmdcbiAgLy8gdGhlIG1ldGhvZCB0YWtlcyBleGFjdGx5IG9uZSBhcmd1bWVudCwgc2luY2UgdGhhdCBoYXBwZW5zIHRvIGJlIHRydWVcbiAgLy8gaW4gZXZlcnkgY2FzZSwgc28gd2UgZG9uJ3QgaGF2ZSB0byB0b3VjaCB0aGUgYXJndW1lbnRzIG9iamVjdC4gVGhlXG4gIC8vIG9ubHkgYWRkaXRpb25hbCBhbGxvY2F0aW9uIHJlcXVpcmVkIGlzIHRoZSBjb21wbGV0aW9uIHJlY29yZCwgd2hpY2hcbiAgLy8gaGFzIGEgc3RhYmxlIHNoYXBlIGFuZCBzbyBob3BlZnVsbHkgc2hvdWxkIGJlIGNoZWFwIHRvIGFsbG9jYXRlLlxuICBmdW5jdGlvbiB0cnlDYXRjaChmbiwgb2JqLCBhcmcpIHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIHsgdHlwZTogXCJub3JtYWxcIiwgYXJnOiBmbi5jYWxsKG9iaiwgYXJnKSB9O1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgcmV0dXJuIHsgdHlwZTogXCJ0aHJvd1wiLCBhcmc6IGVyciB9O1xuICAgIH1cbiAgfVxuXG4gIHZhciBHZW5TdGF0ZVN1c3BlbmRlZFN0YXJ0ID0gXCJzdXNwZW5kZWRTdGFydFwiO1xuICB2YXIgR2VuU3RhdGVTdXNwZW5kZWRZaWVsZCA9IFwic3VzcGVuZGVkWWllbGRcIjtcbiAgdmFyIEdlblN0YXRlRXhlY3V0aW5nID0gXCJleGVjdXRpbmdcIjtcbiAgdmFyIEdlblN0YXRlQ29tcGxldGVkID0gXCJjb21wbGV0ZWRcIjtcblxuICAvLyBSZXR1cm5pbmcgdGhpcyBvYmplY3QgZnJvbSB0aGUgaW5uZXJGbiBoYXMgdGhlIHNhbWUgZWZmZWN0IGFzXG4gIC8vIGJyZWFraW5nIG91dCBvZiB0aGUgZGlzcGF0Y2ggc3dpdGNoIHN0YXRlbWVudC5cbiAgdmFyIENvbnRpbnVlU2VudGluZWwgPSB7fTtcblxuICAvLyBEdW1teSBjb25zdHJ1Y3RvciBmdW5jdGlvbnMgdGhhdCB3ZSB1c2UgYXMgdGhlIC5jb25zdHJ1Y3RvciBhbmRcbiAgLy8gLmNvbnN0cnVjdG9yLnByb3RvdHlwZSBwcm9wZXJ0aWVzIGZvciBmdW5jdGlvbnMgdGhhdCByZXR1cm4gR2VuZXJhdG9yXG4gIC8vIG9iamVjdHMuIEZvciBmdWxsIHNwZWMgY29tcGxpYW5jZSwgeW91IG1heSB3aXNoIHRvIGNvbmZpZ3VyZSB5b3VyXG4gIC8vIG1pbmlmaWVyIG5vdCB0byBtYW5nbGUgdGhlIG5hbWVzIG9mIHRoZXNlIHR3byBmdW5jdGlvbnMuXG4gIGZ1bmN0aW9uIEdlbmVyYXRvcigpIHt9XG4gIGZ1bmN0aW9uIEdlbmVyYXRvckZ1bmN0aW9uKCkge31cbiAgZnVuY3Rpb24gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUoKSB7fVxuXG4gIC8vIFRoaXMgaXMgYSBwb2x5ZmlsbCBmb3IgJUl0ZXJhdG9yUHJvdG90eXBlJSBmb3IgZW52aXJvbm1lbnRzIHRoYXRcbiAgLy8gZG9uJ3QgbmF0aXZlbHkgc3VwcG9ydCBpdC5cbiAgdmFyIEl0ZXJhdG9yUHJvdG90eXBlID0ge307XG4gIEl0ZXJhdG9yUHJvdG90eXBlW2l0ZXJhdG9yU3ltYm9sXSA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICB2YXIgZ2V0UHJvdG8gPSBPYmplY3QuZ2V0UHJvdG90eXBlT2Y7XG4gIHZhciBOYXRpdmVJdGVyYXRvclByb3RvdHlwZSA9IGdldFByb3RvICYmIGdldFByb3RvKGdldFByb3RvKHZhbHVlcyhbXSkpKTtcbiAgaWYgKE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlICYmXG4gICAgICBOYXRpdmVJdGVyYXRvclByb3RvdHlwZSAhPT0gT3AgJiZcbiAgICAgIGhhc093bi5jYWxsKE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlLCBpdGVyYXRvclN5bWJvbCkpIHtcbiAgICAvLyBUaGlzIGVudmlyb25tZW50IGhhcyBhIG5hdGl2ZSAlSXRlcmF0b3JQcm90b3R5cGUlOyB1c2UgaXQgaW5zdGVhZFxuICAgIC8vIG9mIHRoZSBwb2x5ZmlsbC5cbiAgICBJdGVyYXRvclByb3RvdHlwZSA9IE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlO1xuICB9XG5cbiAgdmFyIEdwID0gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUucHJvdG90eXBlID1cbiAgICBHZW5lcmF0b3IucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShJdGVyYXRvclByb3RvdHlwZSk7XG4gIEdlbmVyYXRvckZ1bmN0aW9uLnByb3RvdHlwZSA9IEdwLmNvbnN0cnVjdG9yID0gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGU7XG4gIEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlLmNvbnN0cnVjdG9yID0gR2VuZXJhdG9yRnVuY3Rpb247XG4gIEdlbmVyYXRvckZ1bmN0aW9uLmRpc3BsYXlOYW1lID0gZGVmaW5lKFxuICAgIEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlLFxuICAgIHRvU3RyaW5nVGFnU3ltYm9sLFxuICAgIFwiR2VuZXJhdG9yRnVuY3Rpb25cIlxuICApO1xuXG4gIC8vIEhlbHBlciBmb3IgZGVmaW5pbmcgdGhlIC5uZXh0LCAudGhyb3csIGFuZCAucmV0dXJuIG1ldGhvZHMgb2YgdGhlXG4gIC8vIEl0ZXJhdG9yIGludGVyZmFjZSBpbiB0ZXJtcyBvZiBhIHNpbmdsZSAuX2ludm9rZSBtZXRob2QuXG4gIGZ1bmN0aW9uIGRlZmluZUl0ZXJhdG9yTWV0aG9kcyhwcm90b3R5cGUpIHtcbiAgICBbXCJuZXh0XCIsIFwidGhyb3dcIiwgXCJyZXR1cm5cIl0uZm9yRWFjaChmdW5jdGlvbihtZXRob2QpIHtcbiAgICAgIGRlZmluZShwcm90b3R5cGUsIG1ldGhvZCwgZnVuY3Rpb24oYXJnKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pbnZva2UobWV0aG9kLCBhcmcpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBleHBvcnRzLmlzR2VuZXJhdG9yRnVuY3Rpb24gPSBmdW5jdGlvbihnZW5GdW4pIHtcbiAgICB2YXIgY3RvciA9IHR5cGVvZiBnZW5GdW4gPT09IFwiZnVuY3Rpb25cIiAmJiBnZW5GdW4uY29uc3RydWN0b3I7XG4gICAgcmV0dXJuIGN0b3JcbiAgICAgID8gY3RvciA9PT0gR2VuZXJhdG9yRnVuY3Rpb24gfHxcbiAgICAgICAgLy8gRm9yIHRoZSBuYXRpdmUgR2VuZXJhdG9yRnVuY3Rpb24gY29uc3RydWN0b3IsIHRoZSBiZXN0IHdlIGNhblxuICAgICAgICAvLyBkbyBpcyB0byBjaGVjayBpdHMgLm5hbWUgcHJvcGVydHkuXG4gICAgICAgIChjdG9yLmRpc3BsYXlOYW1lIHx8IGN0b3IubmFtZSkgPT09IFwiR2VuZXJhdG9yRnVuY3Rpb25cIlxuICAgICAgOiBmYWxzZTtcbiAgfTtcblxuICBleHBvcnRzLm1hcmsgPSBmdW5jdGlvbihnZW5GdW4pIHtcbiAgICBpZiAoT2JqZWN0LnNldFByb3RvdHlwZU9mKSB7XG4gICAgICBPYmplY3Quc2V0UHJvdG90eXBlT2YoZ2VuRnVuLCBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGdlbkZ1bi5fX3Byb3RvX18gPSBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZTtcbiAgICAgIGRlZmluZShnZW5GdW4sIHRvU3RyaW5nVGFnU3ltYm9sLCBcIkdlbmVyYXRvckZ1bmN0aW9uXCIpO1xuICAgIH1cbiAgICBnZW5GdW4ucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShHcCk7XG4gICAgcmV0dXJuIGdlbkZ1bjtcbiAgfTtcblxuICAvLyBXaXRoaW4gdGhlIGJvZHkgb2YgYW55IGFzeW5jIGZ1bmN0aW9uLCBgYXdhaXQgeGAgaXMgdHJhbnNmb3JtZWQgdG9cbiAgLy8gYHlpZWxkIHJlZ2VuZXJhdG9yUnVudGltZS5hd3JhcCh4KWAsIHNvIHRoYXQgdGhlIHJ1bnRpbWUgY2FuIHRlc3RcbiAgLy8gYGhhc093bi5jYWxsKHZhbHVlLCBcIl9fYXdhaXRcIilgIHRvIGRldGVybWluZSBpZiB0aGUgeWllbGRlZCB2YWx1ZSBpc1xuICAvLyBtZWFudCB0byBiZSBhd2FpdGVkLlxuICBleHBvcnRzLmF3cmFwID0gZnVuY3Rpb24oYXJnKSB7XG4gICAgcmV0dXJuIHsgX19hd2FpdDogYXJnIH07XG4gIH07XG5cbiAgZnVuY3Rpb24gQXN5bmNJdGVyYXRvcihnZW5lcmF0b3IsIFByb21pc2VJbXBsKSB7XG4gICAgZnVuY3Rpb24gaW52b2tlKG1ldGhvZCwgYXJnLCByZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIHZhciByZWNvcmQgPSB0cnlDYXRjaChnZW5lcmF0b3JbbWV0aG9kXSwgZ2VuZXJhdG9yLCBhcmcpO1xuICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgcmVqZWN0KHJlY29yZC5hcmcpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IHJlY29yZC5hcmc7XG4gICAgICAgIHZhciB2YWx1ZSA9IHJlc3VsdC52YWx1ZTtcbiAgICAgICAgaWYgKHZhbHVlICYmXG4gICAgICAgICAgICB0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIgJiZcbiAgICAgICAgICAgIGhhc093bi5jYWxsKHZhbHVlLCBcIl9fYXdhaXRcIikpIHtcbiAgICAgICAgICByZXR1cm4gUHJvbWlzZUltcGwucmVzb2x2ZSh2YWx1ZS5fX2F3YWl0KS50aGVuKGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICBpbnZva2UoXCJuZXh0XCIsIHZhbHVlLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgaW52b2tlKFwidGhyb3dcIiwgZXJyLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIFByb21pc2VJbXBsLnJlc29sdmUodmFsdWUpLnRoZW4oZnVuY3Rpb24odW53cmFwcGVkKSB7XG4gICAgICAgICAgLy8gV2hlbiBhIHlpZWxkZWQgUHJvbWlzZSBpcyByZXNvbHZlZCwgaXRzIGZpbmFsIHZhbHVlIGJlY29tZXNcbiAgICAgICAgICAvLyB0aGUgLnZhbHVlIG9mIHRoZSBQcm9taXNlPHt2YWx1ZSxkb25lfT4gcmVzdWx0IGZvciB0aGVcbiAgICAgICAgICAvLyBjdXJyZW50IGl0ZXJhdGlvbi5cbiAgICAgICAgICByZXN1bHQudmFsdWUgPSB1bndyYXBwZWQ7XG4gICAgICAgICAgcmVzb2x2ZShyZXN1bHQpO1xuICAgICAgICB9LCBmdW5jdGlvbihlcnJvcikge1xuICAgICAgICAgIC8vIElmIGEgcmVqZWN0ZWQgUHJvbWlzZSB3YXMgeWllbGRlZCwgdGhyb3cgdGhlIHJlamVjdGlvbiBiYWNrXG4gICAgICAgICAgLy8gaW50byB0aGUgYXN5bmMgZ2VuZXJhdG9yIGZ1bmN0aW9uIHNvIGl0IGNhbiBiZSBoYW5kbGVkIHRoZXJlLlxuICAgICAgICAgIHJldHVybiBpbnZva2UoXCJ0aHJvd1wiLCBlcnJvciwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFyIHByZXZpb3VzUHJvbWlzZTtcblxuICAgIGZ1bmN0aW9uIGVucXVldWUobWV0aG9kLCBhcmcpIHtcbiAgICAgIGZ1bmN0aW9uIGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnKCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2VJbXBsKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgIGludm9rZShtZXRob2QsIGFyZywgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBwcmV2aW91c1Byb21pc2UgPVxuICAgICAgICAvLyBJZiBlbnF1ZXVlIGhhcyBiZWVuIGNhbGxlZCBiZWZvcmUsIHRoZW4gd2Ugd2FudCB0byB3YWl0IHVudGlsXG4gICAgICAgIC8vIGFsbCBwcmV2aW91cyBQcm9taXNlcyBoYXZlIGJlZW4gcmVzb2x2ZWQgYmVmb3JlIGNhbGxpbmcgaW52b2tlLFxuICAgICAgICAvLyBzbyB0aGF0IHJlc3VsdHMgYXJlIGFsd2F5cyBkZWxpdmVyZWQgaW4gdGhlIGNvcnJlY3Qgb3JkZXIuIElmXG4gICAgICAgIC8vIGVucXVldWUgaGFzIG5vdCBiZWVuIGNhbGxlZCBiZWZvcmUsIHRoZW4gaXQgaXMgaW1wb3J0YW50IHRvXG4gICAgICAgIC8vIGNhbGwgaW52b2tlIGltbWVkaWF0ZWx5LCB3aXRob3V0IHdhaXRpbmcgb24gYSBjYWxsYmFjayB0byBmaXJlLFxuICAgICAgICAvLyBzbyB0aGF0IHRoZSBhc3luYyBnZW5lcmF0b3IgZnVuY3Rpb24gaGFzIHRoZSBvcHBvcnR1bml0eSB0byBkb1xuICAgICAgICAvLyBhbnkgbmVjZXNzYXJ5IHNldHVwIGluIGEgcHJlZGljdGFibGUgd2F5LiBUaGlzIHByZWRpY3RhYmlsaXR5XG4gICAgICAgIC8vIGlzIHdoeSB0aGUgUHJvbWlzZSBjb25zdHJ1Y3RvciBzeW5jaHJvbm91c2x5IGludm9rZXMgaXRzXG4gICAgICAgIC8vIGV4ZWN1dG9yIGNhbGxiYWNrLCBhbmQgd2h5IGFzeW5jIGZ1bmN0aW9ucyBzeW5jaHJvbm91c2x5XG4gICAgICAgIC8vIGV4ZWN1dGUgY29kZSBiZWZvcmUgdGhlIGZpcnN0IGF3YWl0LiBTaW5jZSB3ZSBpbXBsZW1lbnQgc2ltcGxlXG4gICAgICAgIC8vIGFzeW5jIGZ1bmN0aW9ucyBpbiB0ZXJtcyBvZiBhc3luYyBnZW5lcmF0b3JzLCBpdCBpcyBlc3BlY2lhbGx5XG4gICAgICAgIC8vIGltcG9ydGFudCB0byBnZXQgdGhpcyByaWdodCwgZXZlbiB0aG91Z2ggaXQgcmVxdWlyZXMgY2FyZS5cbiAgICAgICAgcHJldmlvdXNQcm9taXNlID8gcHJldmlvdXNQcm9taXNlLnRoZW4oXG4gICAgICAgICAgY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmcsXG4gICAgICAgICAgLy8gQXZvaWQgcHJvcGFnYXRpbmcgZmFpbHVyZXMgdG8gUHJvbWlzZXMgcmV0dXJuZWQgYnkgbGF0ZXJcbiAgICAgICAgICAvLyBpbnZvY2F0aW9ucyBvZiB0aGUgaXRlcmF0b3IuXG4gICAgICAgICAgY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmdcbiAgICAgICAgKSA6IGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnKCk7XG4gICAgfVxuXG4gICAgLy8gRGVmaW5lIHRoZSB1bmlmaWVkIGhlbHBlciBtZXRob2QgdGhhdCBpcyB1c2VkIHRvIGltcGxlbWVudCAubmV4dCxcbiAgICAvLyAudGhyb3csIGFuZCAucmV0dXJuIChzZWUgZGVmaW5lSXRlcmF0b3JNZXRob2RzKS5cbiAgICB0aGlzLl9pbnZva2UgPSBlbnF1ZXVlO1xuICB9XG5cbiAgZGVmaW5lSXRlcmF0b3JNZXRob2RzKEFzeW5jSXRlcmF0b3IucHJvdG90eXBlKTtcbiAgQXN5bmNJdGVyYXRvci5wcm90b3R5cGVbYXN5bmNJdGVyYXRvclN5bWJvbF0gPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG4gIGV4cG9ydHMuQXN5bmNJdGVyYXRvciA9IEFzeW5jSXRlcmF0b3I7XG5cbiAgLy8gTm90ZSB0aGF0IHNpbXBsZSBhc3luYyBmdW5jdGlvbnMgYXJlIGltcGxlbWVudGVkIG9uIHRvcCBvZlxuICAvLyBBc3luY0l0ZXJhdG9yIG9iamVjdHM7IHRoZXkganVzdCByZXR1cm4gYSBQcm9taXNlIGZvciB0aGUgdmFsdWUgb2ZcbiAgLy8gdGhlIGZpbmFsIHJlc3VsdCBwcm9kdWNlZCBieSB0aGUgaXRlcmF0b3IuXG4gIGV4cG9ydHMuYXN5bmMgPSBmdW5jdGlvbihpbm5lckZuLCBvdXRlckZuLCBzZWxmLCB0cnlMb2NzTGlzdCwgUHJvbWlzZUltcGwpIHtcbiAgICBpZiAoUHJvbWlzZUltcGwgPT09IHZvaWQgMCkgUHJvbWlzZUltcGwgPSBQcm9taXNlO1xuXG4gICAgdmFyIGl0ZXIgPSBuZXcgQXN5bmNJdGVyYXRvcihcbiAgICAgIHdyYXAoaW5uZXJGbiwgb3V0ZXJGbiwgc2VsZiwgdHJ5TG9jc0xpc3QpLFxuICAgICAgUHJvbWlzZUltcGxcbiAgICApO1xuXG4gICAgcmV0dXJuIGV4cG9ydHMuaXNHZW5lcmF0b3JGdW5jdGlvbihvdXRlckZuKVxuICAgICAgPyBpdGVyIC8vIElmIG91dGVyRm4gaXMgYSBnZW5lcmF0b3IsIHJldHVybiB0aGUgZnVsbCBpdGVyYXRvci5cbiAgICAgIDogaXRlci5uZXh0KCkudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICByZXR1cm4gcmVzdWx0LmRvbmUgPyByZXN1bHQudmFsdWUgOiBpdGVyLm5leHQoKTtcbiAgICAgICAgfSk7XG4gIH07XG5cbiAgZnVuY3Rpb24gbWFrZUludm9rZU1ldGhvZChpbm5lckZuLCBzZWxmLCBjb250ZXh0KSB7XG4gICAgdmFyIHN0YXRlID0gR2VuU3RhdGVTdXNwZW5kZWRTdGFydDtcblxuICAgIHJldHVybiBmdW5jdGlvbiBpbnZva2UobWV0aG9kLCBhcmcpIHtcbiAgICAgIGlmIChzdGF0ZSA9PT0gR2VuU3RhdGVFeGVjdXRpbmcpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgcnVubmluZ1wiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHN0YXRlID09PSBHZW5TdGF0ZUNvbXBsZXRlZCkge1xuICAgICAgICBpZiAobWV0aG9kID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICB0aHJvdyBhcmc7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBCZSBmb3JnaXZpbmcsIHBlciAyNS4zLjMuMy4zIG9mIHRoZSBzcGVjOlxuICAgICAgICAvLyBodHRwczovL3Blb3BsZS5tb3ppbGxhLm9yZy9+am9yZW5kb3JmZi9lczYtZHJhZnQuaHRtbCNzZWMtZ2VuZXJhdG9ycmVzdW1lXG4gICAgICAgIHJldHVybiBkb25lUmVzdWx0KCk7XG4gICAgICB9XG5cbiAgICAgIGNvbnRleHQubWV0aG9kID0gbWV0aG9kO1xuICAgICAgY29udGV4dC5hcmcgPSBhcmc7XG5cbiAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgIHZhciBkZWxlZ2F0ZSA9IGNvbnRleHQuZGVsZWdhdGU7XG4gICAgICAgIGlmIChkZWxlZ2F0ZSkge1xuICAgICAgICAgIHZhciBkZWxlZ2F0ZVJlc3VsdCA9IG1heWJlSW52b2tlRGVsZWdhdGUoZGVsZWdhdGUsIGNvbnRleHQpO1xuICAgICAgICAgIGlmIChkZWxlZ2F0ZVJlc3VsdCkge1xuICAgICAgICAgICAgaWYgKGRlbGVnYXRlUmVzdWx0ID09PSBDb250aW51ZVNlbnRpbmVsKSBjb250aW51ZTtcbiAgICAgICAgICAgIHJldHVybiBkZWxlZ2F0ZVJlc3VsdDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY29udGV4dC5tZXRob2QgPT09IFwibmV4dFwiKSB7XG4gICAgICAgICAgLy8gU2V0dGluZyBjb250ZXh0Ll9zZW50IGZvciBsZWdhY3kgc3VwcG9ydCBvZiBCYWJlbCdzXG4gICAgICAgICAgLy8gZnVuY3Rpb24uc2VudCBpbXBsZW1lbnRhdGlvbi5cbiAgICAgICAgICBjb250ZXh0LnNlbnQgPSBjb250ZXh0Ll9zZW50ID0gY29udGV4dC5hcmc7XG5cbiAgICAgICAgfSBlbHNlIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgaWYgKHN0YXRlID09PSBHZW5TdGF0ZVN1c3BlbmRlZFN0YXJ0KSB7XG4gICAgICAgICAgICBzdGF0ZSA9IEdlblN0YXRlQ29tcGxldGVkO1xuICAgICAgICAgICAgdGhyb3cgY29udGV4dC5hcmc7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29udGV4dC5kaXNwYXRjaEV4Y2VwdGlvbihjb250ZXh0LmFyZyk7XG5cbiAgICAgICAgfSBlbHNlIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJyZXR1cm5cIikge1xuICAgICAgICAgIGNvbnRleHQuYWJydXB0KFwicmV0dXJuXCIsIGNvbnRleHQuYXJnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHN0YXRlID0gR2VuU3RhdGVFeGVjdXRpbmc7XG5cbiAgICAgICAgdmFyIHJlY29yZCA9IHRyeUNhdGNoKGlubmVyRm4sIHNlbGYsIGNvbnRleHQpO1xuICAgICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwibm9ybWFsXCIpIHtcbiAgICAgICAgICAvLyBJZiBhbiBleGNlcHRpb24gaXMgdGhyb3duIGZyb20gaW5uZXJGbiwgd2UgbGVhdmUgc3RhdGUgPT09XG4gICAgICAgICAgLy8gR2VuU3RhdGVFeGVjdXRpbmcgYW5kIGxvb3AgYmFjayBmb3IgYW5vdGhlciBpbnZvY2F0aW9uLlxuICAgICAgICAgIHN0YXRlID0gY29udGV4dC5kb25lXG4gICAgICAgICAgICA/IEdlblN0YXRlQ29tcGxldGVkXG4gICAgICAgICAgICA6IEdlblN0YXRlU3VzcGVuZGVkWWllbGQ7XG5cbiAgICAgICAgICBpZiAocmVjb3JkLmFyZyA9PT0gQ29udGludWVTZW50aW5lbCkge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHZhbHVlOiByZWNvcmQuYXJnLFxuICAgICAgICAgICAgZG9uZTogY29udGV4dC5kb25lXG4gICAgICAgICAgfTtcblxuICAgICAgICB9IGVsc2UgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICBzdGF0ZSA9IEdlblN0YXRlQ29tcGxldGVkO1xuICAgICAgICAgIC8vIERpc3BhdGNoIHRoZSBleGNlcHRpb24gYnkgbG9vcGluZyBiYWNrIGFyb3VuZCB0byB0aGVcbiAgICAgICAgICAvLyBjb250ZXh0LmRpc3BhdGNoRXhjZXB0aW9uKGNvbnRleHQuYXJnKSBjYWxsIGFib3ZlLlxuICAgICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgICAgIGNvbnRleHQuYXJnID0gcmVjb3JkLmFyZztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gIH1cblxuICAvLyBDYWxsIGRlbGVnYXRlLml0ZXJhdG9yW2NvbnRleHQubWV0aG9kXShjb250ZXh0LmFyZykgYW5kIGhhbmRsZSB0aGVcbiAgLy8gcmVzdWx0LCBlaXRoZXIgYnkgcmV0dXJuaW5nIGEgeyB2YWx1ZSwgZG9uZSB9IHJlc3VsdCBmcm9tIHRoZVxuICAvLyBkZWxlZ2F0ZSBpdGVyYXRvciwgb3IgYnkgbW9kaWZ5aW5nIGNvbnRleHQubWV0aG9kIGFuZCBjb250ZXh0LmFyZyxcbiAgLy8gc2V0dGluZyBjb250ZXh0LmRlbGVnYXRlIHRvIG51bGwsIGFuZCByZXR1cm5pbmcgdGhlIENvbnRpbnVlU2VudGluZWwuXG4gIGZ1bmN0aW9uIG1heWJlSW52b2tlRGVsZWdhdGUoZGVsZWdhdGUsIGNvbnRleHQpIHtcbiAgICB2YXIgbWV0aG9kID0gZGVsZWdhdGUuaXRlcmF0b3JbY29udGV4dC5tZXRob2RdO1xuICAgIGlmIChtZXRob2QgPT09IHVuZGVmaW5lZCQxKSB7XG4gICAgICAvLyBBIC50aHJvdyBvciAucmV0dXJuIHdoZW4gdGhlIGRlbGVnYXRlIGl0ZXJhdG9yIGhhcyBubyAudGhyb3dcbiAgICAgIC8vIG1ldGhvZCBhbHdheXMgdGVybWluYXRlcyB0aGUgeWllbGQqIGxvb3AuXG4gICAgICBjb250ZXh0LmRlbGVnYXRlID0gbnVsbDtcblxuICAgICAgaWYgKGNvbnRleHQubWV0aG9kID09PSBcInRocm93XCIpIHtcbiAgICAgICAgLy8gTm90ZTogW1wicmV0dXJuXCJdIG11c3QgYmUgdXNlZCBmb3IgRVMzIHBhcnNpbmcgY29tcGF0aWJpbGl0eS5cbiAgICAgICAgaWYgKGRlbGVnYXRlLml0ZXJhdG9yW1wicmV0dXJuXCJdKSB7XG4gICAgICAgICAgLy8gSWYgdGhlIGRlbGVnYXRlIGl0ZXJhdG9yIGhhcyBhIHJldHVybiBtZXRob2QsIGdpdmUgaXQgYVxuICAgICAgICAgIC8vIGNoYW5jZSB0byBjbGVhbiB1cC5cbiAgICAgICAgICBjb250ZXh0Lm1ldGhvZCA9IFwicmV0dXJuXCI7XG4gICAgICAgICAgY29udGV4dC5hcmcgPSB1bmRlZmluZWQkMTtcbiAgICAgICAgICBtYXliZUludm9rZURlbGVnYXRlKGRlbGVnYXRlLCBjb250ZXh0KTtcblxuICAgICAgICAgIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgICAvLyBJZiBtYXliZUludm9rZURlbGVnYXRlKGNvbnRleHQpIGNoYW5nZWQgY29udGV4dC5tZXRob2QgZnJvbVxuICAgICAgICAgICAgLy8gXCJyZXR1cm5cIiB0byBcInRocm93XCIsIGxldCB0aGF0IG92ZXJyaWRlIHRoZSBUeXBlRXJyb3IgYmVsb3cuXG4gICAgICAgICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjb250ZXh0Lm1ldGhvZCA9IFwidGhyb3dcIjtcbiAgICAgICAgY29udGV4dC5hcmcgPSBuZXcgVHlwZUVycm9yKFxuICAgICAgICAgIFwiVGhlIGl0ZXJhdG9yIGRvZXMgbm90IHByb3ZpZGUgYSAndGhyb3cnIG1ldGhvZFwiKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfVxuXG4gICAgdmFyIHJlY29yZCA9IHRyeUNhdGNoKG1ldGhvZCwgZGVsZWdhdGUuaXRlcmF0b3IsIGNvbnRleHQuYXJnKTtcblxuICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICBjb250ZXh0Lm1ldGhvZCA9IFwidGhyb3dcIjtcbiAgICAgIGNvbnRleHQuYXJnID0gcmVjb3JkLmFyZztcbiAgICAgIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsO1xuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfVxuXG4gICAgdmFyIGluZm8gPSByZWNvcmQuYXJnO1xuXG4gICAgaWYgKCEgaW5mbykge1xuICAgICAgY29udGV4dC5tZXRob2QgPSBcInRocm93XCI7XG4gICAgICBjb250ZXh0LmFyZyA9IG5ldyBUeXBlRXJyb3IoXCJpdGVyYXRvciByZXN1bHQgaXMgbm90IGFuIG9iamVjdFwiKTtcbiAgICAgIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsO1xuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfVxuXG4gICAgaWYgKGluZm8uZG9uZSkge1xuICAgICAgLy8gQXNzaWduIHRoZSByZXN1bHQgb2YgdGhlIGZpbmlzaGVkIGRlbGVnYXRlIHRvIHRoZSB0ZW1wb3JhcnlcbiAgICAgIC8vIHZhcmlhYmxlIHNwZWNpZmllZCBieSBkZWxlZ2F0ZS5yZXN1bHROYW1lIChzZWUgZGVsZWdhdGVZaWVsZCkuXG4gICAgICBjb250ZXh0W2RlbGVnYXRlLnJlc3VsdE5hbWVdID0gaW5mby52YWx1ZTtcblxuICAgICAgLy8gUmVzdW1lIGV4ZWN1dGlvbiBhdCB0aGUgZGVzaXJlZCBsb2NhdGlvbiAoc2VlIGRlbGVnYXRlWWllbGQpLlxuICAgICAgY29udGV4dC5uZXh0ID0gZGVsZWdhdGUubmV4dExvYztcblxuICAgICAgLy8gSWYgY29udGV4dC5tZXRob2Qgd2FzIFwidGhyb3dcIiBidXQgdGhlIGRlbGVnYXRlIGhhbmRsZWQgdGhlXG4gICAgICAvLyBleGNlcHRpb24sIGxldCB0aGUgb3V0ZXIgZ2VuZXJhdG9yIHByb2NlZWQgbm9ybWFsbHkuIElmXG4gICAgICAvLyBjb250ZXh0Lm1ldGhvZCB3YXMgXCJuZXh0XCIsIGZvcmdldCBjb250ZXh0LmFyZyBzaW5jZSBpdCBoYXMgYmVlblxuICAgICAgLy8gXCJjb25zdW1lZFwiIGJ5IHRoZSBkZWxlZ2F0ZSBpdGVyYXRvci4gSWYgY29udGV4dC5tZXRob2Qgd2FzXG4gICAgICAvLyBcInJldHVyblwiLCBhbGxvdyB0aGUgb3JpZ2luYWwgLnJldHVybiBjYWxsIHRvIGNvbnRpbnVlIGluIHRoZVxuICAgICAgLy8gb3V0ZXIgZ2VuZXJhdG9yLlxuICAgICAgaWYgKGNvbnRleHQubWV0aG9kICE9PSBcInJldHVyblwiKSB7XG4gICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJuZXh0XCI7XG4gICAgICAgIGNvbnRleHQuYXJnID0gdW5kZWZpbmVkJDE7XG4gICAgICB9XG5cbiAgICB9IGVsc2Uge1xuICAgICAgLy8gUmUteWllbGQgdGhlIHJlc3VsdCByZXR1cm5lZCBieSB0aGUgZGVsZWdhdGUgbWV0aG9kLlxuICAgICAgcmV0dXJuIGluZm87XG4gICAgfVxuXG4gICAgLy8gVGhlIGRlbGVnYXRlIGl0ZXJhdG9yIGlzIGZpbmlzaGVkLCBzbyBmb3JnZXQgaXQgYW5kIGNvbnRpbnVlIHdpdGhcbiAgICAvLyB0aGUgb3V0ZXIgZ2VuZXJhdG9yLlxuICAgIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsO1xuICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICB9XG5cbiAgLy8gRGVmaW5lIEdlbmVyYXRvci5wcm90b3R5cGUue25leHQsdGhyb3cscmV0dXJufSBpbiB0ZXJtcyBvZiB0aGVcbiAgLy8gdW5pZmllZCAuX2ludm9rZSBoZWxwZXIgbWV0aG9kLlxuICBkZWZpbmVJdGVyYXRvck1ldGhvZHMoR3ApO1xuXG4gIGRlZmluZShHcCwgdG9TdHJpbmdUYWdTeW1ib2wsIFwiR2VuZXJhdG9yXCIpO1xuXG4gIC8vIEEgR2VuZXJhdG9yIHNob3VsZCBhbHdheXMgcmV0dXJuIGl0c2VsZiBhcyB0aGUgaXRlcmF0b3Igb2JqZWN0IHdoZW4gdGhlXG4gIC8vIEBAaXRlcmF0b3IgZnVuY3Rpb24gaXMgY2FsbGVkIG9uIGl0LiBTb21lIGJyb3dzZXJzJyBpbXBsZW1lbnRhdGlvbnMgb2YgdGhlXG4gIC8vIGl0ZXJhdG9yIHByb3RvdHlwZSBjaGFpbiBpbmNvcnJlY3RseSBpbXBsZW1lbnQgdGhpcywgY2F1c2luZyB0aGUgR2VuZXJhdG9yXG4gIC8vIG9iamVjdCB0byBub3QgYmUgcmV0dXJuZWQgZnJvbSB0aGlzIGNhbGwuIFRoaXMgZW5zdXJlcyB0aGF0IGRvZXNuJ3QgaGFwcGVuLlxuICAvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL3JlZ2VuZXJhdG9yL2lzc3Vlcy8yNzQgZm9yIG1vcmUgZGV0YWlscy5cbiAgR3BbaXRlcmF0b3JTeW1ib2xdID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgR3AudG9TdHJpbmcgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gXCJbb2JqZWN0IEdlbmVyYXRvcl1cIjtcbiAgfTtcblxuICBmdW5jdGlvbiBwdXNoVHJ5RW50cnkobG9jcykge1xuICAgIHZhciBlbnRyeSA9IHsgdHJ5TG9jOiBsb2NzWzBdIH07XG5cbiAgICBpZiAoMSBpbiBsb2NzKSB7XG4gICAgICBlbnRyeS5jYXRjaExvYyA9IGxvY3NbMV07XG4gICAgfVxuXG4gICAgaWYgKDIgaW4gbG9jcykge1xuICAgICAgZW50cnkuZmluYWxseUxvYyA9IGxvY3NbMl07XG4gICAgICBlbnRyeS5hZnRlckxvYyA9IGxvY3NbM107XG4gICAgfVxuXG4gICAgdGhpcy50cnlFbnRyaWVzLnB1c2goZW50cnkpO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVzZXRUcnlFbnRyeShlbnRyeSkge1xuICAgIHZhciByZWNvcmQgPSBlbnRyeS5jb21wbGV0aW9uIHx8IHt9O1xuICAgIHJlY29yZC50eXBlID0gXCJub3JtYWxcIjtcbiAgICBkZWxldGUgcmVjb3JkLmFyZztcbiAgICBlbnRyeS5jb21wbGV0aW9uID0gcmVjb3JkO1xuICB9XG5cbiAgZnVuY3Rpb24gQ29udGV4dCh0cnlMb2NzTGlzdCkge1xuICAgIC8vIFRoZSByb290IGVudHJ5IG9iamVjdCAoZWZmZWN0aXZlbHkgYSB0cnkgc3RhdGVtZW50IHdpdGhvdXQgYSBjYXRjaFxuICAgIC8vIG9yIGEgZmluYWxseSBibG9jaykgZ2l2ZXMgdXMgYSBwbGFjZSB0byBzdG9yZSB2YWx1ZXMgdGhyb3duIGZyb21cbiAgICAvLyBsb2NhdGlvbnMgd2hlcmUgdGhlcmUgaXMgbm8gZW5jbG9zaW5nIHRyeSBzdGF0ZW1lbnQuXG4gICAgdGhpcy50cnlFbnRyaWVzID0gW3sgdHJ5TG9jOiBcInJvb3RcIiB9XTtcbiAgICB0cnlMb2NzTGlzdC5mb3JFYWNoKHB1c2hUcnlFbnRyeSwgdGhpcyk7XG4gICAgdGhpcy5yZXNldCh0cnVlKTtcbiAgfVxuXG4gIGV4cG9ydHMua2V5cyA9IGZ1bmN0aW9uKG9iamVjdCkge1xuICAgIHZhciBrZXlzID0gW107XG4gICAgZm9yICh2YXIga2V5IGluIG9iamVjdCkge1xuICAgICAga2V5cy5wdXNoKGtleSk7XG4gICAgfVxuICAgIGtleXMucmV2ZXJzZSgpO1xuXG4gICAgLy8gUmF0aGVyIHRoYW4gcmV0dXJuaW5nIGFuIG9iamVjdCB3aXRoIGEgbmV4dCBtZXRob2QsIHdlIGtlZXBcbiAgICAvLyB0aGluZ3Mgc2ltcGxlIGFuZCByZXR1cm4gdGhlIG5leHQgZnVuY3Rpb24gaXRzZWxmLlxuICAgIHJldHVybiBmdW5jdGlvbiBuZXh0KCkge1xuICAgICAgd2hpbGUgKGtleXMubGVuZ3RoKSB7XG4gICAgICAgIHZhciBrZXkgPSBrZXlzLnBvcCgpO1xuICAgICAgICBpZiAoa2V5IGluIG9iamVjdCkge1xuICAgICAgICAgIG5leHQudmFsdWUgPSBrZXk7XG4gICAgICAgICAgbmV4dC5kb25lID0gZmFsc2U7XG4gICAgICAgICAgcmV0dXJuIG5leHQ7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gVG8gYXZvaWQgY3JlYXRpbmcgYW4gYWRkaXRpb25hbCBvYmplY3QsIHdlIGp1c3QgaGFuZyB0aGUgLnZhbHVlXG4gICAgICAvLyBhbmQgLmRvbmUgcHJvcGVydGllcyBvZmYgdGhlIG5leHQgZnVuY3Rpb24gb2JqZWN0IGl0c2VsZi4gVGhpc1xuICAgICAgLy8gYWxzbyBlbnN1cmVzIHRoYXQgdGhlIG1pbmlmaWVyIHdpbGwgbm90IGFub255bWl6ZSB0aGUgZnVuY3Rpb24uXG4gICAgICBuZXh0LmRvbmUgPSB0cnVlO1xuICAgICAgcmV0dXJuIG5leHQ7XG4gICAgfTtcbiAgfTtcblxuICBmdW5jdGlvbiB2YWx1ZXMoaXRlcmFibGUpIHtcbiAgICBpZiAoaXRlcmFibGUpIHtcbiAgICAgIHZhciBpdGVyYXRvck1ldGhvZCA9IGl0ZXJhYmxlW2l0ZXJhdG9yU3ltYm9sXTtcbiAgICAgIGlmIChpdGVyYXRvck1ldGhvZCkge1xuICAgICAgICByZXR1cm4gaXRlcmF0b3JNZXRob2QuY2FsbChpdGVyYWJsZSk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgaXRlcmFibGUubmV4dCA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIHJldHVybiBpdGVyYWJsZTtcbiAgICAgIH1cblxuICAgICAgaWYgKCFpc05hTihpdGVyYWJsZS5sZW5ndGgpKSB7XG4gICAgICAgIHZhciBpID0gLTEsIG5leHQgPSBmdW5jdGlvbiBuZXh0KCkge1xuICAgICAgICAgIHdoaWxlICgrK2kgPCBpdGVyYWJsZS5sZW5ndGgpIHtcbiAgICAgICAgICAgIGlmIChoYXNPd24uY2FsbChpdGVyYWJsZSwgaSkpIHtcbiAgICAgICAgICAgICAgbmV4dC52YWx1ZSA9IGl0ZXJhYmxlW2ldO1xuICAgICAgICAgICAgICBuZXh0LmRvbmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgcmV0dXJuIG5leHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgbmV4dC52YWx1ZSA9IHVuZGVmaW5lZCQxO1xuICAgICAgICAgIG5leHQuZG9uZSA9IHRydWU7XG5cbiAgICAgICAgICByZXR1cm4gbmV4dDtcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gbmV4dC5uZXh0ID0gbmV4dDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBSZXR1cm4gYW4gaXRlcmF0b3Igd2l0aCBubyB2YWx1ZXMuXG4gICAgcmV0dXJuIHsgbmV4dDogZG9uZVJlc3VsdCB9O1xuICB9XG4gIGV4cG9ydHMudmFsdWVzID0gdmFsdWVzO1xuXG4gIGZ1bmN0aW9uIGRvbmVSZXN1bHQoKSB7XG4gICAgcmV0dXJuIHsgdmFsdWU6IHVuZGVmaW5lZCQxLCBkb25lOiB0cnVlIH07XG4gIH1cblxuICBDb250ZXh0LnByb3RvdHlwZSA9IHtcbiAgICBjb25zdHJ1Y3RvcjogQ29udGV4dCxcblxuICAgIHJlc2V0OiBmdW5jdGlvbihza2lwVGVtcFJlc2V0KSB7XG4gICAgICB0aGlzLnByZXYgPSAwO1xuICAgICAgdGhpcy5uZXh0ID0gMDtcbiAgICAgIC8vIFJlc2V0dGluZyBjb250ZXh0Ll9zZW50IGZvciBsZWdhY3kgc3VwcG9ydCBvZiBCYWJlbCdzXG4gICAgICAvLyBmdW5jdGlvbi5zZW50IGltcGxlbWVudGF0aW9uLlxuICAgICAgdGhpcy5zZW50ID0gdGhpcy5fc2VudCA9IHVuZGVmaW5lZCQxO1xuICAgICAgdGhpcy5kb25lID0gZmFsc2U7XG4gICAgICB0aGlzLmRlbGVnYXRlID0gbnVsbDtcblxuICAgICAgdGhpcy5tZXRob2QgPSBcIm5leHRcIjtcbiAgICAgIHRoaXMuYXJnID0gdW5kZWZpbmVkJDE7XG5cbiAgICAgIHRoaXMudHJ5RW50cmllcy5mb3JFYWNoKHJlc2V0VHJ5RW50cnkpO1xuXG4gICAgICBpZiAoIXNraXBUZW1wUmVzZXQpIHtcbiAgICAgICAgZm9yICh2YXIgbmFtZSBpbiB0aGlzKSB7XG4gICAgICAgICAgLy8gTm90IHN1cmUgYWJvdXQgdGhlIG9wdGltYWwgb3JkZXIgb2YgdGhlc2UgY29uZGl0aW9uczpcbiAgICAgICAgICBpZiAobmFtZS5jaGFyQXQoMCkgPT09IFwidFwiICYmXG4gICAgICAgICAgICAgIGhhc093bi5jYWxsKHRoaXMsIG5hbWUpICYmXG4gICAgICAgICAgICAgICFpc05hTigrbmFtZS5zbGljZSgxKSkpIHtcbiAgICAgICAgICAgIHRoaXNbbmFtZV0gPSB1bmRlZmluZWQkMTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgc3RvcDogZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLmRvbmUgPSB0cnVlO1xuXG4gICAgICB2YXIgcm9vdEVudHJ5ID0gdGhpcy50cnlFbnRyaWVzWzBdO1xuICAgICAgdmFyIHJvb3RSZWNvcmQgPSByb290RW50cnkuY29tcGxldGlvbjtcbiAgICAgIGlmIChyb290UmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICB0aHJvdyByb290UmVjb3JkLmFyZztcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMucnZhbDtcbiAgICB9LFxuXG4gICAgZGlzcGF0Y2hFeGNlcHRpb246IGZ1bmN0aW9uKGV4Y2VwdGlvbikge1xuICAgICAgaWYgKHRoaXMuZG9uZSkge1xuICAgICAgICB0aHJvdyBleGNlcHRpb247XG4gICAgICB9XG5cbiAgICAgIHZhciBjb250ZXh0ID0gdGhpcztcbiAgICAgIGZ1bmN0aW9uIGhhbmRsZShsb2MsIGNhdWdodCkge1xuICAgICAgICByZWNvcmQudHlwZSA9IFwidGhyb3dcIjtcbiAgICAgICAgcmVjb3JkLmFyZyA9IGV4Y2VwdGlvbjtcbiAgICAgICAgY29udGV4dC5uZXh0ID0gbG9jO1xuXG4gICAgICAgIGlmIChjYXVnaHQpIHtcbiAgICAgICAgICAvLyBJZiB0aGUgZGlzcGF0Y2hlZCBleGNlcHRpb24gd2FzIGNhdWdodCBieSBhIGNhdGNoIGJsb2NrLFxuICAgICAgICAgIC8vIHRoZW4gbGV0IHRoYXQgY2F0Y2ggYmxvY2sgaGFuZGxlIHRoZSBleGNlcHRpb24gbm9ybWFsbHkuXG4gICAgICAgICAgY29udGV4dC5tZXRob2QgPSBcIm5leHRcIjtcbiAgICAgICAgICBjb250ZXh0LmFyZyA9IHVuZGVmaW5lZCQxO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuICEhIGNhdWdodDtcbiAgICAgIH1cblxuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIHZhciByZWNvcmQgPSBlbnRyeS5jb21wbGV0aW9uO1xuXG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPT09IFwicm9vdFwiKSB7XG4gICAgICAgICAgLy8gRXhjZXB0aW9uIHRocm93biBvdXRzaWRlIG9mIGFueSB0cnkgYmxvY2sgdGhhdCBjb3VsZCBoYW5kbGVcbiAgICAgICAgICAvLyBpdCwgc28gc2V0IHRoZSBjb21wbGV0aW9uIHZhbHVlIG9mIHRoZSBlbnRpcmUgZnVuY3Rpb24gdG9cbiAgICAgICAgICAvLyB0aHJvdyB0aGUgZXhjZXB0aW9uLlxuICAgICAgICAgIHJldHVybiBoYW5kbGUoXCJlbmRcIik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZW50cnkudHJ5TG9jIDw9IHRoaXMucHJldikge1xuICAgICAgICAgIHZhciBoYXNDYXRjaCA9IGhhc093bi5jYWxsKGVudHJ5LCBcImNhdGNoTG9jXCIpO1xuICAgICAgICAgIHZhciBoYXNGaW5hbGx5ID0gaGFzT3duLmNhbGwoZW50cnksIFwiZmluYWxseUxvY1wiKTtcblxuICAgICAgICAgIGlmIChoYXNDYXRjaCAmJiBoYXNGaW5hbGx5KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcmV2IDwgZW50cnkuY2F0Y2hMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5jYXRjaExvYywgdHJ1ZSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMucHJldiA8IGVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5maW5hbGx5TG9jKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgIH0gZWxzZSBpZiAoaGFzQ2F0Y2gpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByZXYgPCBlbnRyeS5jYXRjaExvYykge1xuICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGVudHJ5LmNhdGNoTG9jLCB0cnVlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgIH0gZWxzZSBpZiAoaGFzRmluYWxseSkge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJldiA8IGVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5maW5hbGx5TG9jKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJ0cnkgc3RhdGVtZW50IHdpdGhvdXQgY2F0Y2ggb3IgZmluYWxseVwiKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgYWJydXB0OiBmdW5jdGlvbih0eXBlLCBhcmcpIHtcbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuICAgICAgICBpZiAoZW50cnkudHJ5TG9jIDw9IHRoaXMucHJldiAmJlxuICAgICAgICAgICAgaGFzT3duLmNhbGwoZW50cnksIFwiZmluYWxseUxvY1wiKSAmJlxuICAgICAgICAgICAgdGhpcy5wcmV2IDwgZW50cnkuZmluYWxseUxvYykge1xuICAgICAgICAgIHZhciBmaW5hbGx5RW50cnkgPSBlbnRyeTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoZmluYWxseUVudHJ5ICYmXG4gICAgICAgICAgKHR5cGUgPT09IFwiYnJlYWtcIiB8fFxuICAgICAgICAgICB0eXBlID09PSBcImNvbnRpbnVlXCIpICYmXG4gICAgICAgICAgZmluYWxseUVudHJ5LnRyeUxvYyA8PSBhcmcgJiZcbiAgICAgICAgICBhcmcgPD0gZmluYWxseUVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgLy8gSWdub3JlIHRoZSBmaW5hbGx5IGVudHJ5IGlmIGNvbnRyb2wgaXMgbm90IGp1bXBpbmcgdG8gYVxuICAgICAgICAvLyBsb2NhdGlvbiBvdXRzaWRlIHRoZSB0cnkvY2F0Y2ggYmxvY2suXG4gICAgICAgIGZpbmFsbHlFbnRyeSA9IG51bGw7XG4gICAgICB9XG5cbiAgICAgIHZhciByZWNvcmQgPSBmaW5hbGx5RW50cnkgPyBmaW5hbGx5RW50cnkuY29tcGxldGlvbiA6IHt9O1xuICAgICAgcmVjb3JkLnR5cGUgPSB0eXBlO1xuICAgICAgcmVjb3JkLmFyZyA9IGFyZztcblxuICAgICAgaWYgKGZpbmFsbHlFbnRyeSkge1xuICAgICAgICB0aGlzLm1ldGhvZCA9IFwibmV4dFwiO1xuICAgICAgICB0aGlzLm5leHQgPSBmaW5hbGx5RW50cnkuZmluYWxseUxvYztcbiAgICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLmNvbXBsZXRlKHJlY29yZCk7XG4gICAgfSxcblxuICAgIGNvbXBsZXRlOiBmdW5jdGlvbihyZWNvcmQsIGFmdGVyTG9jKSB7XG4gICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICB0aHJvdyByZWNvcmQuYXJnO1xuICAgICAgfVxuXG4gICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwiYnJlYWtcIiB8fFxuICAgICAgICAgIHJlY29yZC50eXBlID09PSBcImNvbnRpbnVlXCIpIHtcbiAgICAgICAgdGhpcy5uZXh0ID0gcmVjb3JkLmFyZztcbiAgICAgIH0gZWxzZSBpZiAocmVjb3JkLnR5cGUgPT09IFwicmV0dXJuXCIpIHtcbiAgICAgICAgdGhpcy5ydmFsID0gdGhpcy5hcmcgPSByZWNvcmQuYXJnO1xuICAgICAgICB0aGlzLm1ldGhvZCA9IFwicmV0dXJuXCI7XG4gICAgICAgIHRoaXMubmV4dCA9IFwiZW5kXCI7XG4gICAgICB9IGVsc2UgaWYgKHJlY29yZC50eXBlID09PSBcIm5vcm1hbFwiICYmIGFmdGVyTG9jKSB7XG4gICAgICAgIHRoaXMubmV4dCA9IGFmdGVyTG9jO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9LFxuXG4gICAgZmluaXNoOiBmdW5jdGlvbihmaW5hbGx5TG9jKSB7XG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcbiAgICAgICAgaWYgKGVudHJ5LmZpbmFsbHlMb2MgPT09IGZpbmFsbHlMb2MpIHtcbiAgICAgICAgICB0aGlzLmNvbXBsZXRlKGVudHJ5LmNvbXBsZXRpb24sIGVudHJ5LmFmdGVyTG9jKTtcbiAgICAgICAgICByZXNldFRyeUVudHJ5KGVudHJ5KTtcbiAgICAgICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG5cbiAgICBcImNhdGNoXCI6IGZ1bmN0aW9uKHRyeUxvYykge1xuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPT09IHRyeUxvYykge1xuICAgICAgICAgIHZhciByZWNvcmQgPSBlbnRyeS5jb21wbGV0aW9uO1xuICAgICAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgICB2YXIgdGhyb3duID0gcmVjb3JkLmFyZztcbiAgICAgICAgICAgIHJlc2V0VHJ5RW50cnkoZW50cnkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gdGhyb3duO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIFRoZSBjb250ZXh0LmNhdGNoIG1ldGhvZCBtdXN0IG9ubHkgYmUgY2FsbGVkIHdpdGggYSBsb2NhdGlvblxuICAgICAgLy8gYXJndW1lbnQgdGhhdCBjb3JyZXNwb25kcyB0byBhIGtub3duIGNhdGNoIGJsb2NrLlxuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiaWxsZWdhbCBjYXRjaCBhdHRlbXB0XCIpO1xuICAgIH0sXG5cbiAgICBkZWxlZ2F0ZVlpZWxkOiBmdW5jdGlvbihpdGVyYWJsZSwgcmVzdWx0TmFtZSwgbmV4dExvYykge1xuICAgICAgdGhpcy5kZWxlZ2F0ZSA9IHtcbiAgICAgICAgaXRlcmF0b3I6IHZhbHVlcyhpdGVyYWJsZSksXG4gICAgICAgIHJlc3VsdE5hbWU6IHJlc3VsdE5hbWUsXG4gICAgICAgIG5leHRMb2M6IG5leHRMb2NcbiAgICAgIH07XG5cbiAgICAgIGlmICh0aGlzLm1ldGhvZCA9PT0gXCJuZXh0XCIpIHtcbiAgICAgICAgLy8gRGVsaWJlcmF0ZWx5IGZvcmdldCB0aGUgbGFzdCBzZW50IHZhbHVlIHNvIHRoYXQgd2UgZG9uJ3RcbiAgICAgICAgLy8gYWNjaWRlbnRhbGx5IHBhc3MgaXQgb24gdG8gdGhlIGRlbGVnYXRlLlxuICAgICAgICB0aGlzLmFyZyA9IHVuZGVmaW5lZCQxO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9XG4gIH07XG5cbiAgLy8gUmVnYXJkbGVzcyBvZiB3aGV0aGVyIHRoaXMgc2NyaXB0IGlzIGV4ZWN1dGluZyBhcyBhIENvbW1vbkpTIG1vZHVsZVxuICAvLyBvciBub3QsIHJldHVybiB0aGUgcnVudGltZSBvYmplY3Qgc28gdGhhdCB3ZSBjYW4gZGVjbGFyZSB0aGUgdmFyaWFibGVcbiAgLy8gcmVnZW5lcmF0b3JSdW50aW1lIGluIHRoZSBvdXRlciBzY29wZSwgd2hpY2ggYWxsb3dzIHRoaXMgbW9kdWxlIHRvIGJlXG4gIC8vIGluamVjdGVkIGVhc2lseSBieSBgYmluL3JlZ2VuZXJhdG9yIC0taW5jbHVkZS1ydW50aW1lIHNjcmlwdC5qc2AuXG4gIHJldHVybiBleHBvcnRzO1xuXG59KFxuICAvLyBJZiB0aGlzIHNjcmlwdCBpcyBleGVjdXRpbmcgYXMgYSBDb21tb25KUyBtb2R1bGUsIHVzZSBtb2R1bGUuZXhwb3J0c1xuICAvLyBhcyB0aGUgcmVnZW5lcmF0b3JSdW50aW1lIG5hbWVzcGFjZS4gT3RoZXJ3aXNlIGNyZWF0ZSBhIG5ldyBlbXB0eVxuICAvLyBvYmplY3QuIEVpdGhlciB3YXksIHRoZSByZXN1bHRpbmcgb2JqZWN0IHdpbGwgYmUgdXNlZCB0byBpbml0aWFsaXplXG4gIC8vIHRoZSByZWdlbmVyYXRvclJ1bnRpbWUgdmFyaWFibGUgYXQgdGhlIHRvcCBvZiB0aGlzIGZpbGUuXG4gICBtb2R1bGUuZXhwb3J0cyBcbikpO1xuXG50cnkge1xuICByZWdlbmVyYXRvclJ1bnRpbWUgPSBydW50aW1lO1xufSBjYXRjaCAoYWNjaWRlbnRhbFN0cmljdE1vZGUpIHtcbiAgLy8gVGhpcyBtb2R1bGUgc2hvdWxkIG5vdCBiZSBydW5uaW5nIGluIHN0cmljdCBtb2RlLCBzbyB0aGUgYWJvdmVcbiAgLy8gYXNzaWdubWVudCBzaG91bGQgYWx3YXlzIHdvcmsgdW5sZXNzIHNvbWV0aGluZyBpcyBtaXNjb25maWd1cmVkLiBKdXN0XG4gIC8vIGluIGNhc2UgcnVudGltZS5qcyBhY2NpZGVudGFsbHkgcnVucyBpbiBzdHJpY3QgbW9kZSwgd2UgY2FuIGVzY2FwZVxuICAvLyBzdHJpY3QgbW9kZSB1c2luZyBhIGdsb2JhbCBGdW5jdGlvbiBjYWxsLiBUaGlzIGNvdWxkIGNvbmNlaXZhYmx5IGZhaWxcbiAgLy8gaWYgYSBDb250ZW50IFNlY3VyaXR5IFBvbGljeSBmb3JiaWRzIHVzaW5nIEZ1bmN0aW9uLCBidXQgaW4gdGhhdCBjYXNlXG4gIC8vIHRoZSBwcm9wZXIgc29sdXRpb24gaXMgdG8gZml4IHRoZSBhY2NpZGVudGFsIHN0cmljdCBtb2RlIHByb2JsZW0uIElmXG4gIC8vIHlvdSd2ZSBtaXNjb25maWd1cmVkIHlvdXIgYnVuZGxlciB0byBmb3JjZSBzdHJpY3QgbW9kZSBhbmQgYXBwbGllZCBhXG4gIC8vIENTUCB0byBmb3JiaWQgRnVuY3Rpb24sIGFuZCB5b3UncmUgbm90IHdpbGxpbmcgdG8gZml4IGVpdGhlciBvZiB0aG9zZVxuICAvLyBwcm9ibGVtcywgcGxlYXNlIGRldGFpbCB5b3VyIHVuaXF1ZSBwcmVkaWNhbWVudCBpbiBhIEdpdEh1YiBpc3N1ZS5cbiAgRnVuY3Rpb24oXCJyXCIsIFwicmVnZW5lcmF0b3JSdW50aW1lID0gclwiKShydW50aW1lKTtcbn1cbn0pO1xuXG52YXIgREVGQVVMVF9USU1FT1VUID0gNTAwMDtcbnZhciBVbmF2YWlsYWJsZUVycm9yID0gLyojX19QVVJFX18qL25ldyBFcnJvcignRkRDMyBEZXNrdG9wQWdlbnQgbm90IGF2YWlsYWJsZSBhdCBgd2luZG93LmZkYzNgLicpO1xudmFyIFRpbWVvdXRFcnJvciA9IC8qI19fUFVSRV9fKi9uZXcgRXJyb3IoJ1RpbWVkIG91dCB3YWl0aW5nIGZvciBgZmRjM1JlYWR5YCBldmVudC4nKTtcbnZhciBVbmV4cGVjdGVkRXJyb3IgPSAvKiNfX1BVUkVfXyovbmV3IEVycm9yKCdgZmRjM1JlYWR5YCBldmVudCBmaXJlZCwgYnV0IGB3aW5kb3cuZmRjM2Agbm90IHNldCB0byBEZXNrdG9wQWdlbnQuJyk7XG5cbmZ1bmN0aW9uIHJlamVjdElmTm9HbG9iYWwoZikge1xuICByZXR1cm4gd2luZG93LmZkYzMgPyBmKCkgOiBQcm9taXNlLnJlamVjdChVbmF2YWlsYWJsZUVycm9yKTtcbn1cblxuZnVuY3Rpb24gdGhyb3dJZk5vR2xvYmFsKGYpIHtcbiAgaWYgKCF3aW5kb3cuZmRjMykge1xuICAgIHRocm93IFVuYXZhaWxhYmxlRXJyb3I7XG4gIH1cblxuICByZXR1cm4gZigpO1xufVxuXG52YXIgZmRjM1JlYWR5ID0gLyojX19QVVJFX18qL2Z1bmN0aW9uICgpIHtcbiAgdmFyIF9yZWYgPSAvKiNfX1BVUkVfXyovX2FzeW5jVG9HZW5lcmF0b3IoIC8qI19fUFVSRV9fKi9ydW50aW1lXzEubWFyayhmdW5jdGlvbiBfY2FsbGVlKHdhaXRGb3JNcykge1xuICAgIHJldHVybiBydW50aW1lXzEud3JhcChmdW5jdGlvbiBfY2FsbGVlJChfY29udGV4dCkge1xuICAgICAgd2hpbGUgKDEpIHtcbiAgICAgICAgc3dpdGNoIChfY29udGV4dC5wcmV2ID0gX2NvbnRleHQubmV4dCkge1xuICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgIGlmICh3YWl0Rm9yTXMgPT09IHZvaWQgMCkge1xuICAgICAgICAgICAgICB3YWl0Rm9yTXMgPSBERUZBVUxUX1RJTUVPVVQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBfY29udGV4dC5hYnJ1cHQoXCJyZXR1cm5cIiwgbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgICAvLyBpZiB0aGUgZ2xvYmFsIGlzIGFscmVhZHkgYXZhaWxhYmxlIHJlc29sdmUgaW1tZWRpYXRlbHlcbiAgICAgICAgICAgICAgaWYgKHdpbmRvdy5mZGMzKSB7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIGlmIGl0cyBub3QgYXZhaWxhYmxlIHNldHVwIGEgdGltZW91dCB0byByZXR1cm4gYSByZWplY3RlZCBwcm9taXNlXG4gICAgICAgICAgICAgICAgdmFyIHRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiB3aW5kb3cuZmRjMyA/IHJlc29sdmUoKSA6IHJlamVjdChUaW1lb3V0RXJyb3IpO1xuICAgICAgICAgICAgICAgIH0sIHdhaXRGb3JNcyk7IC8vIGxpc3RlbiBmb3IgdGhlIGZkYzNSZWFkeSBldmVudFxuXG4gICAgICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2ZkYzNSZWFkeScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbiAgICAgICAgICAgICAgICAgIHdpbmRvdy5mZGMzID8gcmVzb2x2ZSgpIDogcmVqZWN0KFVuZXhwZWN0ZWRFcnJvcik7XG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgb25jZTogdHJ1ZVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KSk7XG5cbiAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgY2FzZSBcImVuZFwiOlxuICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0LnN0b3AoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sIF9jYWxsZWUpO1xuICB9KSk7XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIGZkYzNSZWFkeShfeCkge1xuICAgIHJldHVybiBfcmVmLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gIH07XG59KCk7XG5mdW5jdGlvbiBvcGVuKGFwcCwgY29udGV4dCkge1xuICByZXR1cm4gcmVqZWN0SWZOb0dsb2JhbChmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHdpbmRvdy5mZGMzLm9wZW4oYXBwLCBjb250ZXh0KTtcbiAgfSk7XG59XG5mdW5jdGlvbiBmaW5kSW50ZW50KGludGVudCwgY29udGV4dCkge1xuICByZXR1cm4gcmVqZWN0SWZOb0dsb2JhbChmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHdpbmRvdy5mZGMzLmZpbmRJbnRlbnQoaW50ZW50LCBjb250ZXh0KTtcbiAgfSk7XG59XG5mdW5jdGlvbiBmaW5kSW50ZW50c0J5Q29udGV4dChjb250ZXh0KSB7XG4gIHJldHVybiByZWplY3RJZk5vR2xvYmFsKGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gd2luZG93LmZkYzMuZmluZEludGVudHNCeUNvbnRleHQoY29udGV4dCk7XG4gIH0pO1xufVxuZnVuY3Rpb24gYnJvYWRjYXN0KGNvbnRleHQpIHtcbiAgdGhyb3dJZk5vR2xvYmFsKGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gd2luZG93LmZkYzMuYnJvYWRjYXN0KGNvbnRleHQpO1xuICB9KTtcbn1cbmZ1bmN0aW9uIHJhaXNlSW50ZW50KGludGVudCwgY29udGV4dCwgYXBwKSB7XG4gIHJldHVybiByZWplY3RJZk5vR2xvYmFsKGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gd2luZG93LmZkYzMucmFpc2VJbnRlbnQoaW50ZW50LCBjb250ZXh0LCBhcHApO1xuICB9KTtcbn1cbmZ1bmN0aW9uIHJhaXNlSW50ZW50Rm9yQ29udGV4dChjb250ZXh0LCBhcHApIHtcbiAgcmV0dXJuIHJlamVjdElmTm9HbG9iYWwoZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB3aW5kb3cuZmRjMy5yYWlzZUludGVudEZvckNvbnRleHQoY29udGV4dCwgYXBwKTtcbiAgfSk7XG59XG5mdW5jdGlvbiBhZGRJbnRlbnRMaXN0ZW5lcihpbnRlbnQsIGhhbmRsZXIpIHtcbiAgcmV0dXJuIHRocm93SWZOb0dsb2JhbChmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHdpbmRvdy5mZGMzLmFkZEludGVudExpc3RlbmVyKGludGVudCwgaGFuZGxlcik7XG4gIH0pO1xufVxuZnVuY3Rpb24gYWRkQ29udGV4dExpc3RlbmVyKGNvbnRleHRUeXBlT3JIYW5kbGVyLCBoYW5kbGVyKSB7XG4gIGlmICh0eXBlb2YgY29udGV4dFR5cGVPckhhbmRsZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICByZXR1cm4gdGhyb3dJZk5vR2xvYmFsKGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiB3aW5kb3cuZmRjMy5hZGRDb250ZXh0TGlzdGVuZXIoY29udGV4dFR5cGVPckhhbmRsZXIsIGhhbmRsZXIpO1xuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiB0aHJvd0lmTm9HbG9iYWwoZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHdpbmRvdy5mZGMzLmFkZENvbnRleHRMaXN0ZW5lcihjb250ZXh0VHlwZU9ySGFuZGxlcik7XG4gICAgfSk7XG4gIH1cbn1cbmZ1bmN0aW9uIGdldFN5c3RlbUNoYW5uZWxzKCkge1xuICByZXR1cm4gcmVqZWN0SWZOb0dsb2JhbChmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHdpbmRvdy5mZGMzLmdldFN5c3RlbUNoYW5uZWxzKCk7XG4gIH0pO1xufVxuZnVuY3Rpb24gam9pbkNoYW5uZWwoY2hhbm5lbElkKSB7XG4gIHJldHVybiByZWplY3RJZk5vR2xvYmFsKGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gd2luZG93LmZkYzMuam9pbkNoYW5uZWwoY2hhbm5lbElkKTtcbiAgfSk7XG59XG5mdW5jdGlvbiBnZXRPckNyZWF0ZUNoYW5uZWwoY2hhbm5lbElkKSB7XG4gIHJldHVybiByZWplY3RJZk5vR2xvYmFsKGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gd2luZG93LmZkYzMuZ2V0T3JDcmVhdGVDaGFubmVsKGNoYW5uZWxJZCk7XG4gIH0pO1xufVxuZnVuY3Rpb24gZ2V0Q3VycmVudENoYW5uZWwoKSB7XG4gIHJldHVybiByZWplY3RJZk5vR2xvYmFsKGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gd2luZG93LmZkYzMuZ2V0Q3VycmVudENoYW5uZWwoKTtcbiAgfSk7XG59XG5mdW5jdGlvbiBsZWF2ZUN1cnJlbnRDaGFubmVsKCkge1xuICByZXR1cm4gcmVqZWN0SWZOb0dsb2JhbChmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHdpbmRvdy5mZGMzLmxlYXZlQ3VycmVudENoYW5uZWwoKTtcbiAgfSk7XG59XG5mdW5jdGlvbiBnZXRJbmZvKCkge1xuICByZXR1cm4gdGhyb3dJZk5vR2xvYmFsKGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gd2luZG93LmZkYzMuZ2V0SW5mbygpO1xuICB9KTtcbn1cbi8qKlxyXG4gKiBDb21wYXJlIG51bWVyaWMgc2VtdmVyIHZlcnNpb24gbnVtYmVyIHN0cmluZ3MgKGluIHRoZSBmb3JtIGAxLjIuM2ApLlxyXG4gKlxyXG4gKiBSZXR1cm5zIGAtMWAgaWYgdGhlIGZpcnN0IGFyZ3VtZW50IGlzIGEgbG93ZXIgdmVyc2lvbiBudW1iZXIgdGhhbiB0aGUgc2Vjb25kLFxyXG4gKiBgMWAgaWYgdGhlIGZpcnN0IGFyZ3VtZW50IGlzIGdyZWF0ZXIgdGhhbiB0aGUgc2Vjb25kLCAwIGlmIHRoZSBhcmd1bWVudHMgYXJlXHJcbiAqIGVxdWFsIGFuZCBgbnVsbGAgaWYgYW4gZXJyb3Igb2NjdXJyZWQgZHVyaW5nIHRoZSBjb21wYXJpc29uLlxyXG4gKlxyXG4gKiBAcGFyYW0gYVxyXG4gKiBAcGFyYW0gYlxyXG4gKi9cblxudmFyIGNvbXBhcmVWZXJzaW9uTnVtYmVycyA9IGZ1bmN0aW9uIGNvbXBhcmVWZXJzaW9uTnVtYmVycyhhLCBiKSB7XG4gIHRyeSB7XG4gICAgdmFyIGFWZXJBcnIgPSBhLnNwbGl0KCcuJykubWFwKE51bWJlcik7XG4gICAgdmFyIGJWZXJBcnIgPSBiLnNwbGl0KCcuJykubWFwKE51bWJlcik7XG5cbiAgICBmb3IgKHZhciBpbmRleCA9IDA7IGluZGV4IDwgTWF0aC5tYXgoYVZlckFyci5sZW5ndGgsIGJWZXJBcnIubGVuZ3RoKTsgaW5kZXgrKykge1xuICAgICAgLyogSWYgb25lIHZlcnNpb24gbnVtYmVyIGhhcyBtb3JlIGRpZ2l0cyBhbmQgdGhlIG90aGVyIGRvZXMgbm90LCBhbmQgdGhleSBhcmUgb3RoZXJ3aXNlIGVxdWFsLFxyXG4gICAgICAgICBhc3N1bWUgdGhlIGxvbmdlciBpcyBncmVhdGVyLiBFLmcuIDEuMS4xID4gMS4xICovXG4gICAgICBpZiAoaW5kZXggPT09IGFWZXJBcnIubGVuZ3RoIHx8IGFWZXJBcnJbaW5kZXhdIDwgYlZlckFycltpbmRleF0pIHtcbiAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgfSBlbHNlIGlmIChpbmRleCA9PT0gYlZlckFyci5sZW5ndGggfHwgYVZlckFycltpbmRleF0gPiBiVmVyQXJyW2luZGV4XSkge1xuICAgICAgICByZXR1cm4gMTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gMDtcbiAgfSBjYXRjaCAoZSkge1xuICAgIGNvbnNvbGUuZXJyb3IoJ0ZhaWxlZCB0byBjb21wYXJlIHZlcnNpb24gc3RyaW5ncycsIGUpO1xuICAgIHJldHVybiBudWxsO1xuICB9XG59O1xuLyoqXHJcbiAqIENoZWNrIGlmIHRoZSBGREMzIHZlcnNpb24gaW4gYW4gSW1wbGVtZW50YXRpb25NZXRhZGF0YSBvYmplY3QgaXMgZ3JlYXRlciB0aGFuXHJcbiAqIG9yIGVxdWFsIHRvIHRoZSBzdXBwbGllZCBudW1lcmljIHNlbXZlciB2ZXJzaW9uIG51bWJlciBzdHJpbmcgKGluIHRoZSBmb3JtIGAxLjIuM2ApLlxyXG4gKlxyXG4gKiBSZXR1cm5zIGEgYm9vbGVhbiBvciBudWxsIGlmIGFuIGVycm9yIG9jY3VycmVkIHdoaWxlIGNvbXBhcmluZyB0aGUgdmVyc2lvbiBudW1iZXJzLlxyXG4gKlxyXG4gKiBAcGFyYW0gbWV0YWRhdGFcclxuICogQHBhcmFtIHZlcnNpb25cclxuICovXG5cbnZhciB2ZXJzaW9uSXNBdExlYXN0ID0gZnVuY3Rpb24gdmVyc2lvbklzQXRMZWFzdChtZXRhZGF0YSwgdmVyc2lvbikge1xuICB2YXIgY29tcGFyaXNvbiA9IGNvbXBhcmVWZXJzaW9uTnVtYmVycyhtZXRhZGF0YS5mZGMzVmVyc2lvbiwgdmVyc2lvbik7XG4gIHJldHVybiBjb21wYXJpc29uID09PSBudWxsID8gbnVsbCA6IGNvbXBhcmlzb24gPj0gMCA/IHRydWUgOiBmYWxzZTtcbn07XG5cbnZhciBDb250ZXh0VHlwZXM7XG5cbihmdW5jdGlvbiAoQ29udGV4dFR5cGVzKSB7XG4gIENvbnRleHRUeXBlc1tcIkNvbnRhY3RcIl0gPSBcImZkYzMuY29udGFjdFwiO1xuICBDb250ZXh0VHlwZXNbXCJDb250YWN0TGlzdFwiXSA9IFwiZmRjMy5jb250YWN0TGlzdFwiO1xuICBDb250ZXh0VHlwZXNbXCJDb3VudHJ5XCJdID0gXCJmZGMzLmNvdW50cnlcIjtcbiAgQ29udGV4dFR5cGVzW1wiSW5zdHJ1bWVudFwiXSA9IFwiZmRjMy5pbnN0cnVtZW50XCI7XG4gIENvbnRleHRUeXBlc1tcIk9yZ2FuaXphdGlvblwiXSA9IFwiZmRjMy5vcmdhbml6YXRpb25cIjtcbiAgQ29udGV4dFR5cGVzW1wiUG9ydGZvbGlvXCJdID0gXCJmZGMzLnBvcnRmb2xpb1wiO1xuICBDb250ZXh0VHlwZXNbXCJQb3NpdGlvblwiXSA9IFwiZmRjMy5wb3NpdGlvblwiO1xufSkoQ29udGV4dFR5cGVzIHx8IChDb250ZXh0VHlwZXMgPSB7fSkpO1xuXG4vLyBUbyBwYXJzZSB0aGlzIGRhdGE6XG4vL1xuLy8gICBpbXBvcnQgeyBDb252ZXJ0LCBDb250ZXh0LCBDb250YWN0LCBDb250YWN0TGlzdCwgSW5zdHJ1bWVudCwgSW5zdHJ1bWVudExpc3QsIENvdW50cnksIE9yZ2FuaXphdGlvbiwgUG9ydGZvbGlvLCBQb3NpdGlvbiB9IGZyb20gXCIuL2ZpbGVcIjtcbi8vXG4vLyAgIGNvbnN0IGNvbnRleHQgPSBDb252ZXJ0LnRvQ29udGV4dChqc29uKTtcbi8vICAgY29uc3QgY29udGFjdCA9IENvbnZlcnQudG9Db250YWN0KGpzb24pO1xuLy8gICBjb25zdCBjb250YWN0TGlzdCA9IENvbnZlcnQudG9Db250YWN0TGlzdChqc29uKTtcbi8vICAgY29uc3QgaW5zdHJ1bWVudCA9IENvbnZlcnQudG9JbnN0cnVtZW50KGpzb24pO1xuLy8gICBjb25zdCBpbnN0cnVtZW50TGlzdCA9IENvbnZlcnQudG9JbnN0cnVtZW50TGlzdChqc29uKTtcbi8vICAgY29uc3QgY291bnRyeSA9IENvbnZlcnQudG9Db3VudHJ5KGpzb24pO1xuLy8gICBjb25zdCBvcmdhbml6YXRpb24gPSBDb252ZXJ0LnRvT3JnYW5pemF0aW9uKGpzb24pO1xuLy8gICBjb25zdCBwb3J0Zm9saW8gPSBDb252ZXJ0LnRvUG9ydGZvbGlvKGpzb24pO1xuLy8gICBjb25zdCBwb3NpdGlvbiA9IENvbnZlcnQudG9Qb3NpdGlvbihqc29uKTtcbi8vXG4vLyBUaGVzZSBmdW5jdGlvbnMgd2lsbCB0aHJvdyBhbiBlcnJvciBpZiB0aGUgSlNPTiBkb2Vzbid0XG4vLyBtYXRjaCB0aGUgZXhwZWN0ZWQgaW50ZXJmYWNlLCBldmVuIGlmIHRoZSBKU09OIGlzIHZhbGlkLlxuLy8gQ29udmVydHMgSlNPTiBzdHJpbmdzIHRvL2Zyb20geW91ciB0eXBlc1xuLy8gYW5kIGFzc2VydHMgdGhlIHJlc3VsdHMgb2YgSlNPTi5wYXJzZSBhdCBydW50aW1lXG52YXIgQ29udmVydCA9IC8qI19fUFVSRV9fKi9mdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIENvbnZlcnQoKSB7fVxuXG4gIENvbnZlcnQudG9Db250ZXh0ID0gZnVuY3Rpb24gdG9Db250ZXh0KGpzb24pIHtcbiAgICByZXR1cm4gY2FzdChKU09OLnBhcnNlKGpzb24pLCByKCdDb250ZXh0JykpO1xuICB9O1xuXG4gIENvbnZlcnQuY29udGV4dFRvSnNvbiA9IGZ1bmN0aW9uIGNvbnRleHRUb0pzb24odmFsdWUpIHtcbiAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodW5jYXN0KHZhbHVlLCByKCdDb250ZXh0JykpLCBudWxsLCAyKTtcbiAgfTtcblxuICBDb252ZXJ0LnRvQ29udGFjdCA9IGZ1bmN0aW9uIHRvQ29udGFjdChqc29uKSB7XG4gICAgcmV0dXJuIGNhc3QoSlNPTi5wYXJzZShqc29uKSwgcignQ29udGFjdCcpKTtcbiAgfTtcblxuICBDb252ZXJ0LmNvbnRhY3RUb0pzb24gPSBmdW5jdGlvbiBjb250YWN0VG9Kc29uKHZhbHVlKSB7XG4gICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHVuY2FzdCh2YWx1ZSwgcignQ29udGFjdCcpKSwgbnVsbCwgMik7XG4gIH07XG5cbiAgQ29udmVydC50b0NvbnRhY3RMaXN0ID0gZnVuY3Rpb24gdG9Db250YWN0TGlzdChqc29uKSB7XG4gICAgcmV0dXJuIGNhc3QoSlNPTi5wYXJzZShqc29uKSwgcignQ29udGFjdExpc3QnKSk7XG4gIH07XG5cbiAgQ29udmVydC5jb250YWN0TGlzdFRvSnNvbiA9IGZ1bmN0aW9uIGNvbnRhY3RMaXN0VG9Kc29uKHZhbHVlKSB7XG4gICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHVuY2FzdCh2YWx1ZSwgcignQ29udGFjdExpc3QnKSksIG51bGwsIDIpO1xuICB9O1xuXG4gIENvbnZlcnQudG9JbnN0cnVtZW50ID0gZnVuY3Rpb24gdG9JbnN0cnVtZW50KGpzb24pIHtcbiAgICByZXR1cm4gY2FzdChKU09OLnBhcnNlKGpzb24pLCByKCdJbnN0cnVtZW50JykpO1xuICB9O1xuXG4gIENvbnZlcnQuaW5zdHJ1bWVudFRvSnNvbiA9IGZ1bmN0aW9uIGluc3RydW1lbnRUb0pzb24odmFsdWUpIHtcbiAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodW5jYXN0KHZhbHVlLCByKCdJbnN0cnVtZW50JykpLCBudWxsLCAyKTtcbiAgfTtcblxuICBDb252ZXJ0LnRvSW5zdHJ1bWVudExpc3QgPSBmdW5jdGlvbiB0b0luc3RydW1lbnRMaXN0KGpzb24pIHtcbiAgICByZXR1cm4gY2FzdChKU09OLnBhcnNlKGpzb24pLCByKCdJbnN0cnVtZW50TGlzdCcpKTtcbiAgfTtcblxuICBDb252ZXJ0Lmluc3RydW1lbnRMaXN0VG9Kc29uID0gZnVuY3Rpb24gaW5zdHJ1bWVudExpc3RUb0pzb24odmFsdWUpIHtcbiAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodW5jYXN0KHZhbHVlLCByKCdJbnN0cnVtZW50TGlzdCcpKSwgbnVsbCwgMik7XG4gIH07XG5cbiAgQ29udmVydC50b0NvdW50cnkgPSBmdW5jdGlvbiB0b0NvdW50cnkoanNvbikge1xuICAgIHJldHVybiBjYXN0KEpTT04ucGFyc2UoanNvbiksIHIoJ0NvdW50cnknKSk7XG4gIH07XG5cbiAgQ29udmVydC5jb3VudHJ5VG9Kc29uID0gZnVuY3Rpb24gY291bnRyeVRvSnNvbih2YWx1ZSkge1xuICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh1bmNhc3QodmFsdWUsIHIoJ0NvdW50cnknKSksIG51bGwsIDIpO1xuICB9O1xuXG4gIENvbnZlcnQudG9Pcmdhbml6YXRpb24gPSBmdW5jdGlvbiB0b09yZ2FuaXphdGlvbihqc29uKSB7XG4gICAgcmV0dXJuIGNhc3QoSlNPTi5wYXJzZShqc29uKSwgcignT3JnYW5pemF0aW9uJykpO1xuICB9O1xuXG4gIENvbnZlcnQub3JnYW5pemF0aW9uVG9Kc29uID0gZnVuY3Rpb24gb3JnYW5pemF0aW9uVG9Kc29uKHZhbHVlKSB7XG4gICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHVuY2FzdCh2YWx1ZSwgcignT3JnYW5pemF0aW9uJykpLCBudWxsLCAyKTtcbiAgfTtcblxuICBDb252ZXJ0LnRvUG9ydGZvbGlvID0gZnVuY3Rpb24gdG9Qb3J0Zm9saW8oanNvbikge1xuICAgIHJldHVybiBjYXN0KEpTT04ucGFyc2UoanNvbiksIHIoJ1BvcnRmb2xpbycpKTtcbiAgfTtcblxuICBDb252ZXJ0LnBvcnRmb2xpb1RvSnNvbiA9IGZ1bmN0aW9uIHBvcnRmb2xpb1RvSnNvbih2YWx1ZSkge1xuICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh1bmNhc3QodmFsdWUsIHIoJ1BvcnRmb2xpbycpKSwgbnVsbCwgMik7XG4gIH07XG5cbiAgQ29udmVydC50b1Bvc2l0aW9uID0gZnVuY3Rpb24gdG9Qb3NpdGlvbihqc29uKSB7XG4gICAgcmV0dXJuIGNhc3QoSlNPTi5wYXJzZShqc29uKSwgcignUG9zaXRpb24nKSk7XG4gIH07XG5cbiAgQ29udmVydC5wb3NpdGlvblRvSnNvbiA9IGZ1bmN0aW9uIHBvc2l0aW9uVG9Kc29uKHZhbHVlKSB7XG4gICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHVuY2FzdCh2YWx1ZSwgcignUG9zaXRpb24nKSksIG51bGwsIDIpO1xuICB9O1xuXG4gIHJldHVybiBDb252ZXJ0O1xufSgpO1xuXG5mdW5jdGlvbiBpbnZhbGlkVmFsdWUodHlwLCB2YWwsIGtleSkge1xuICBpZiAoa2V5ID09PSB2b2lkIDApIHtcbiAgICBrZXkgPSAnJztcbiAgfVxuXG4gIGlmIChrZXkpIHtcbiAgICB0aHJvdyBFcnJvcihcIkludmFsaWQgdmFsdWUgZm9yIGtleSBcXFwiXCIgKyBrZXkgKyBcIlxcXCIuIEV4cGVjdGVkIHR5cGUgXCIgKyBKU09OLnN0cmluZ2lmeSh0eXApICsgXCIgYnV0IGdvdCBcIiArIEpTT04uc3RyaW5naWZ5KHZhbCkpO1xuICB9XG5cbiAgdGhyb3cgRXJyb3IoXCJJbnZhbGlkIHZhbHVlIFwiICsgSlNPTi5zdHJpbmdpZnkodmFsKSArIFwiIGZvciB0eXBlIFwiICsgSlNPTi5zdHJpbmdpZnkodHlwKSk7XG59XG5cbmZ1bmN0aW9uIGpzb25Ub0pTUHJvcHModHlwKSB7XG4gIGlmICh0eXAuanNvblRvSlMgPT09IHVuZGVmaW5lZCkge1xuICAgIHZhciBtYXAgPSB7fTtcbiAgICB0eXAucHJvcHMuZm9yRWFjaChmdW5jdGlvbiAocCkge1xuICAgICAgcmV0dXJuIG1hcFtwLmpzb25dID0ge1xuICAgICAgICBrZXk6IHAuanMsXG4gICAgICAgIHR5cDogcC50eXBcbiAgICAgIH07XG4gICAgfSk7XG4gICAgdHlwLmpzb25Ub0pTID0gbWFwO1xuICB9XG5cbiAgcmV0dXJuIHR5cC5qc29uVG9KUztcbn1cblxuZnVuY3Rpb24ganNUb0pTT05Qcm9wcyh0eXApIHtcbiAgaWYgKHR5cC5qc1RvSlNPTiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgdmFyIG1hcCA9IHt9O1xuICAgIHR5cC5wcm9wcy5mb3JFYWNoKGZ1bmN0aW9uIChwKSB7XG4gICAgICByZXR1cm4gbWFwW3AuanNdID0ge1xuICAgICAgICBrZXk6IHAuanNvbixcbiAgICAgICAgdHlwOiBwLnR5cFxuICAgICAgfTtcbiAgICB9KTtcbiAgICB0eXAuanNUb0pTT04gPSBtYXA7XG4gIH1cblxuICByZXR1cm4gdHlwLmpzVG9KU09OO1xufVxuXG5mdW5jdGlvbiB0cmFuc2Zvcm0odmFsLCB0eXAsIGdldFByb3BzLCBrZXkpIHtcbiAgaWYgKGtleSA9PT0gdm9pZCAwKSB7XG4gICAga2V5ID0gJyc7XG4gIH1cblxuICBmdW5jdGlvbiB0cmFuc2Zvcm1QcmltaXRpdmUodHlwLCB2YWwpIHtcbiAgICBpZiAodHlwZW9mIHR5cCA9PT0gdHlwZW9mIHZhbCkgcmV0dXJuIHZhbDtcbiAgICByZXR1cm4gaW52YWxpZFZhbHVlKHR5cCwgdmFsLCBrZXkpO1xuICB9XG5cbiAgZnVuY3Rpb24gdHJhbnNmb3JtVW5pb24odHlwcywgdmFsKSB7XG4gICAgLy8gdmFsIG11c3QgdmFsaWRhdGUgYWdhaW5zdCBvbmUgdHlwIGluIHR5cHNcbiAgICB2YXIgbCA9IHR5cHMubGVuZ3RoO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsOyBpKyspIHtcbiAgICAgIHZhciBfdHlwID0gdHlwc1tpXTtcblxuICAgICAgdHJ5IHtcbiAgICAgICAgcmV0dXJuIHRyYW5zZm9ybSh2YWwsIF90eXAsIGdldFByb3BzKTtcbiAgICAgIH0gY2F0Y2ggKF8pIHt9XG4gICAgfVxuXG4gICAgcmV0dXJuIGludmFsaWRWYWx1ZSh0eXBzLCB2YWwpO1xuICB9XG5cbiAgZnVuY3Rpb24gdHJhbnNmb3JtRW51bShjYXNlcywgdmFsKSB7XG4gICAgaWYgKGNhc2VzLmluZGV4T2YodmFsKSAhPT0gLTEpIHJldHVybiB2YWw7XG4gICAgcmV0dXJuIGludmFsaWRWYWx1ZShjYXNlcywgdmFsKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHRyYW5zZm9ybUFycmF5KHR5cCwgdmFsKSB7XG4gICAgLy8gdmFsIG11c3QgYmUgYW4gYXJyYXkgd2l0aCBubyBpbnZhbGlkIGVsZW1lbnRzXG4gICAgaWYgKCFBcnJheS5pc0FycmF5KHZhbCkpIHJldHVybiBpbnZhbGlkVmFsdWUoJ2FycmF5JywgdmFsKTtcbiAgICByZXR1cm4gdmFsLm1hcChmdW5jdGlvbiAoZWwpIHtcbiAgICAgIHJldHVybiB0cmFuc2Zvcm0oZWwsIHR5cCwgZ2V0UHJvcHMpO1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gdHJhbnNmb3JtRGF0ZSh2YWwpIHtcbiAgICBpZiAodmFsID09PSBudWxsKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICB2YXIgZCA9IG5ldyBEYXRlKHZhbCk7XG5cbiAgICBpZiAoaXNOYU4oZC52YWx1ZU9mKCkpKSB7XG4gICAgICByZXR1cm4gaW52YWxpZFZhbHVlKCdEYXRlJywgdmFsKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZDtcbiAgfVxuXG4gIGZ1bmN0aW9uIHRyYW5zZm9ybU9iamVjdChwcm9wcywgYWRkaXRpb25hbCwgdmFsKSB7XG4gICAgaWYgKHZhbCA9PT0gbnVsbCB8fCB0eXBlb2YgdmFsICE9PSAnb2JqZWN0JyB8fCBBcnJheS5pc0FycmF5KHZhbCkpIHtcbiAgICAgIHJldHVybiBpbnZhbGlkVmFsdWUoJ29iamVjdCcsIHZhbCk7XG4gICAgfVxuXG4gICAgdmFyIHJlc3VsdCA9IHt9O1xuICAgIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHByb3BzKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgIHZhciBwcm9wID0gcHJvcHNba2V5XTtcbiAgICAgIHZhciB2ID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHZhbCwga2V5KSA/IHZhbFtrZXldIDogdW5kZWZpbmVkO1xuICAgICAgcmVzdWx0W3Byb3Aua2V5XSA9IHRyYW5zZm9ybSh2LCBwcm9wLnR5cCwgZ2V0UHJvcHMsIHByb3Aua2V5KTtcbiAgICB9KTtcbiAgICBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh2YWwpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgICAgaWYgKCFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocHJvcHMsIGtleSkpIHtcbiAgICAgICAgcmVzdWx0W2tleV0gPSB0cmFuc2Zvcm0odmFsW2tleV0sIGFkZGl0aW9uYWwsIGdldFByb3BzLCBrZXkpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBpZiAodHlwID09PSAnYW55JykgcmV0dXJuIHZhbDtcblxuICBpZiAodHlwID09PSBudWxsKSB7XG4gICAgaWYgKHZhbCA9PT0gbnVsbCkgcmV0dXJuIHZhbDtcbiAgICByZXR1cm4gaW52YWxpZFZhbHVlKHR5cCwgdmFsKTtcbiAgfVxuXG4gIGlmICh0eXAgPT09IGZhbHNlKSByZXR1cm4gaW52YWxpZFZhbHVlKHR5cCwgdmFsKTtcblxuICB3aGlsZSAodHlwZW9mIHR5cCA9PT0gJ29iamVjdCcgJiYgdHlwLnJlZiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgdHlwID0gdHlwZU1hcFt0eXAucmVmXTtcbiAgfVxuXG4gIGlmIChBcnJheS5pc0FycmF5KHR5cCkpIHJldHVybiB0cmFuc2Zvcm1FbnVtKHR5cCwgdmFsKTtcblxuICBpZiAodHlwZW9mIHR5cCA9PT0gJ29iamVjdCcpIHtcbiAgICByZXR1cm4gdHlwLmhhc093blByb3BlcnR5KCd1bmlvbk1lbWJlcnMnKSA/IHRyYW5zZm9ybVVuaW9uKHR5cC51bmlvbk1lbWJlcnMsIHZhbCkgOiB0eXAuaGFzT3duUHJvcGVydHkoJ2FycmF5SXRlbXMnKSA/IHRyYW5zZm9ybUFycmF5KHR5cC5hcnJheUl0ZW1zLCB2YWwpIDogdHlwLmhhc093blByb3BlcnR5KCdwcm9wcycpID8gdHJhbnNmb3JtT2JqZWN0KGdldFByb3BzKHR5cCksIHR5cC5hZGRpdGlvbmFsLCB2YWwpIDogaW52YWxpZFZhbHVlKHR5cCwgdmFsKTtcbiAgfSAvLyBOdW1iZXJzIGNhbiBiZSBwYXJzZWQgYnkgRGF0ZSBidXQgc2hvdWxkbid0IGJlLlxuXG5cbiAgaWYgKHR5cCA9PT0gRGF0ZSAmJiB0eXBlb2YgdmFsICE9PSAnbnVtYmVyJykgcmV0dXJuIHRyYW5zZm9ybURhdGUodmFsKTtcbiAgcmV0dXJuIHRyYW5zZm9ybVByaW1pdGl2ZSh0eXAsIHZhbCk7XG59XG5cbmZ1bmN0aW9uIGNhc3QodmFsLCB0eXApIHtcbiAgcmV0dXJuIHRyYW5zZm9ybSh2YWwsIHR5cCwganNvblRvSlNQcm9wcyk7XG59XG5cbmZ1bmN0aW9uIHVuY2FzdCh2YWwsIHR5cCkge1xuICByZXR1cm4gdHJhbnNmb3JtKHZhbCwgdHlwLCBqc1RvSlNPTlByb3BzKTtcbn1cblxuZnVuY3Rpb24gYSh0eXApIHtcbiAgcmV0dXJuIHtcbiAgICBhcnJheUl0ZW1zOiB0eXBcbiAgfTtcbn1cblxuZnVuY3Rpb24gdSgpIHtcbiAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIHR5cHMgPSBuZXcgQXJyYXkoX2xlbiksIF9rZXkgPSAwOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgdHlwc1tfa2V5XSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgdW5pb25NZW1iZXJzOiB0eXBzXG4gIH07XG59XG5cbmZ1bmN0aW9uIG8ocHJvcHMsIGFkZGl0aW9uYWwpIHtcbiAgcmV0dXJuIHtcbiAgICBwcm9wczogcHJvcHMsXG4gICAgYWRkaXRpb25hbDogYWRkaXRpb25hbFxuICB9O1xufVxuXG5mdW5jdGlvbiBtKGFkZGl0aW9uYWwpIHtcbiAgcmV0dXJuIHtcbiAgICBwcm9wczogW10sXG4gICAgYWRkaXRpb25hbDogYWRkaXRpb25hbFxuICB9O1xufVxuXG5mdW5jdGlvbiByKG5hbWUpIHtcbiAgcmV0dXJuIHtcbiAgICByZWY6IG5hbWVcbiAgfTtcbn1cblxudmFyIHR5cGVNYXAgPSB7XG4gIENvbnRleHQ6IC8qI19fUFVSRV9fKi9vKFt7XG4gICAganNvbjogJ2lkJyxcbiAgICBqczogJ2lkJyxcbiAgICB0eXA6IC8qI19fUFVSRV9fKi91KHVuZGVmaW5lZCwgLyojX19QVVJFX18qL20oJycpKVxuICB9LCB7XG4gICAganNvbjogJ25hbWUnLFxuICAgIGpzOiAnbmFtZScsXG4gICAgdHlwOiAvKiNfX1BVUkVfXyovdSh1bmRlZmluZWQsICcnKVxuICB9LCB7XG4gICAganNvbjogJ3R5cGUnLFxuICAgIGpzOiAndHlwZScsXG4gICAgdHlwOiAnJ1xuICB9XSwgJ2FueScpLFxuICBDb250YWN0TGlzdDogLyojX19QVVJFX18qL28oW3tcbiAgICBqc29uOiAnY29udGFjdHMnLFxuICAgIGpzOiAnY29udGFjdHMnLFxuICAgIHR5cDogLyojX19QVVJFX18qL2EoIC8qI19fUFVSRV9fKi9yKCdDb250YWN0JykpXG4gIH0sIHtcbiAgICBqc29uOiAndHlwZScsXG4gICAganM6ICd0eXBlJyxcbiAgICB0eXA6ICcnXG4gIH0sIHtcbiAgICBqc29uOiAnaWQnLFxuICAgIGpzOiAnaWQnLFxuICAgIHR5cDogLyojX19QVVJFX18qL3UodW5kZWZpbmVkLCAvKiNfX1BVUkVfXyovbSgnJykpXG4gIH0sIHtcbiAgICBqc29uOiAnbmFtZScsXG4gICAganM6ICduYW1lJyxcbiAgICB0eXA6IC8qI19fUFVSRV9fKi91KHVuZGVmaW5lZCwgJycpXG4gIH1dLCAnYW55JyksXG4gIENvbnRhY3Q6IC8qI19fUFVSRV9fKi9vKFt7XG4gICAganNvbjogJ2lkJyxcbiAgICBqczogJ2lkJyxcbiAgICB0eXA6IC8qI19fUFVSRV9fKi9yKCdDb250YWN0SUQnKVxuICB9LCB7XG4gICAganNvbjogJ3R5cGUnLFxuICAgIGpzOiAndHlwZScsXG4gICAgdHlwOiAnJ1xuICB9LCB7XG4gICAganNvbjogJ25hbWUnLFxuICAgIGpzOiAnbmFtZScsXG4gICAgdHlwOiAvKiNfX1BVUkVfXyovdSh1bmRlZmluZWQsICcnKVxuICB9XSwgJ2FueScpLFxuICBDb250YWN0SUQ6IC8qI19fUFVSRV9fKi9vKFt7XG4gICAganNvbjogJ2VtYWlsJyxcbiAgICBqczogJ2VtYWlsJyxcbiAgICB0eXA6IC8qI19fUFVSRV9fKi91KHVuZGVmaW5lZCwgJycpXG4gIH0sIHtcbiAgICBqc29uOiAnRkRTX0lEJyxcbiAgICBqczogJ0ZEU19JRCcsXG4gICAgdHlwOiAvKiNfX1BVUkVfXyovdSh1bmRlZmluZWQsICcnKVxuICB9XSwgJycpLFxuICBJbnN0cnVtZW50TGlzdDogLyojX19QVVJFX18qL28oW3tcbiAgICBqc29uOiAnaW5zdHJ1bWVudHMnLFxuICAgIGpzOiAnaW5zdHJ1bWVudHMnLFxuICAgIHR5cDogLyojX19QVVJFX18qL2EoIC8qI19fUFVSRV9fKi9yKCdJbnN0cnVtZW50JykpXG4gIH0sIHtcbiAgICBqc29uOiAndHlwZScsXG4gICAganM6ICd0eXBlJyxcbiAgICB0eXA6ICcnXG4gIH0sIHtcbiAgICBqc29uOiAnaWQnLFxuICAgIGpzOiAnaWQnLFxuICAgIHR5cDogLyojX19QVVJFX18qL3UodW5kZWZpbmVkLCAvKiNfX1BVUkVfXyovbSgnJykpXG4gIH0sIHtcbiAgICBqc29uOiAnbmFtZScsXG4gICAganM6ICduYW1lJyxcbiAgICB0eXA6IC8qI19fUFVSRV9fKi91KHVuZGVmaW5lZCwgJycpXG4gIH1dLCAnYW55JyksXG4gIEluc3RydW1lbnQ6IC8qI19fUFVSRV9fKi9vKFt7XG4gICAganNvbjogJ2lkJyxcbiAgICBqczogJ2lkJyxcbiAgICB0eXA6IC8qI19fUFVSRV9fKi9yKCdJbnN0cnVtZW50SUQnKVxuICB9LCB7XG4gICAganNvbjogJ3R5cGUnLFxuICAgIGpzOiAndHlwZScsXG4gICAgdHlwOiAnJ1xuICB9LCB7XG4gICAganNvbjogJ25hbWUnLFxuICAgIGpzOiAnbmFtZScsXG4gICAgdHlwOiAvKiNfX1BVUkVfXyovdSh1bmRlZmluZWQsICcnKVxuICB9XSwgJ2FueScpLFxuICBJbnN0cnVtZW50SUQ6IC8qI19fUFVSRV9fKi9vKFt7XG4gICAganNvbjogJ0JCRycsXG4gICAganM6ICdCQkcnLFxuICAgIHR5cDogLyojX19QVVJFX18qL3UodW5kZWZpbmVkLCAnJylcbiAgfSwge1xuICAgIGpzb246ICdDVVNJUCcsXG4gICAganM6ICdDVVNJUCcsXG4gICAgdHlwOiAvKiNfX1BVUkVfXyovdSh1bmRlZmluZWQsICcnKVxuICB9LCB7XG4gICAganNvbjogJ0ZEU19JRCcsXG4gICAganM6ICdGRFNfSUQnLFxuICAgIHR5cDogLyojX19QVVJFX18qL3UodW5kZWZpbmVkLCAnJylcbiAgfSwge1xuICAgIGpzb246ICdGSUdJJyxcbiAgICBqczogJ0ZJR0knLFxuICAgIHR5cDogLyojX19QVVJFX18qL3UodW5kZWZpbmVkLCAnJylcbiAgfSwge1xuICAgIGpzb246ICdJU0lOJyxcbiAgICBqczogJ0lTSU4nLFxuICAgIHR5cDogLyojX19QVVJFX18qL3UodW5kZWZpbmVkLCAnJylcbiAgfSwge1xuICAgIGpzb246ICdQRVJNSUQnLFxuICAgIGpzOiAnUEVSTUlEJyxcbiAgICB0eXA6IC8qI19fUFVSRV9fKi91KHVuZGVmaW5lZCwgJycpXG4gIH0sIHtcbiAgICBqc29uOiAnUklDJyxcbiAgICBqczogJ1JJQycsXG4gICAgdHlwOiAvKiNfX1BVUkVfXyovdSh1bmRlZmluZWQsICcnKVxuICB9LCB7XG4gICAganNvbjogJ1NFRE9MJyxcbiAgICBqczogJ1NFRE9MJyxcbiAgICB0eXA6IC8qI19fUFVSRV9fKi91KHVuZGVmaW5lZCwgJycpXG4gIH0sIHtcbiAgICBqc29uOiAndGlja2VyJyxcbiAgICBqczogJ3RpY2tlcicsXG4gICAgdHlwOiAvKiNfX1BVUkVfXyovdSh1bmRlZmluZWQsICcnKVxuICB9XSwgJycpLFxuICBDb3VudHJ5OiAvKiNfX1BVUkVfXyovbyhbe1xuICAgIGpzb246ICdpZCcsXG4gICAganM6ICdpZCcsXG4gICAgdHlwOiAvKiNfX1BVUkVfXyovcignQ291bnRyeUlEJylcbiAgfSwge1xuICAgIGpzb246ICd0eXBlJyxcbiAgICBqczogJ3R5cGUnLFxuICAgIHR5cDogJydcbiAgfSwge1xuICAgIGpzb246ICduYW1lJyxcbiAgICBqczogJ25hbWUnLFxuICAgIHR5cDogLyojX19QVVJFX18qL3UodW5kZWZpbmVkLCAnJylcbiAgfV0sICdhbnknKSxcbiAgQ291bnRyeUlEOiAvKiNfX1BVUkVfXyovbyhbe1xuICAgIGpzb246ICdJU09BTFBIQTInLFxuICAgIGpzOiAnSVNPQUxQSEEyJyxcbiAgICB0eXA6IC8qI19fUFVSRV9fKi91KHVuZGVmaW5lZCwgJycpXG4gIH0sIHtcbiAgICBqc29uOiAnSVNPQUxQSEEzJyxcbiAgICBqczogJ0lTT0FMUEhBMycsXG4gICAgdHlwOiAvKiNfX1BVUkVfXyovdSh1bmRlZmluZWQsICcnKVxuICB9XSwgJycpLFxuICBPcmdhbml6YXRpb246IC8qI19fUFVSRV9fKi9vKFt7XG4gICAganNvbjogJ2lkJyxcbiAgICBqczogJ2lkJyxcbiAgICB0eXA6IC8qI19fUFVSRV9fKi9yKCdPcmdhbml6YXRpb25JRCcpXG4gIH0sIHtcbiAgICBqc29uOiAndHlwZScsXG4gICAganM6ICd0eXBlJyxcbiAgICB0eXA6ICcnXG4gIH0sIHtcbiAgICBqc29uOiAnbmFtZScsXG4gICAganM6ICduYW1lJyxcbiAgICB0eXA6IC8qI19fUFVSRV9fKi91KHVuZGVmaW5lZCwgJycpXG4gIH1dLCAnYW55JyksXG4gIE9yZ2FuaXphdGlvbklEOiAvKiNfX1BVUkVfXyovbyhbe1xuICAgIGpzb246ICdGRFNfSUQnLFxuICAgIGpzOiAnRkRTX0lEJyxcbiAgICB0eXA6IC8qI19fUFVSRV9fKi91KHVuZGVmaW5lZCwgJycpXG4gIH0sIHtcbiAgICBqc29uOiAnTEVJJyxcbiAgICBqczogJ0xFSScsXG4gICAgdHlwOiAvKiNfX1BVUkVfXyovdSh1bmRlZmluZWQsICcnKVxuICB9LCB7XG4gICAganNvbjogJ1BFUk1JRCcsXG4gICAganM6ICdQRVJNSUQnLFxuICAgIHR5cDogLyojX19QVVJFX18qL3UodW5kZWZpbmVkLCAnJylcbiAgfV0sICcnKSxcbiAgUG9ydGZvbGlvOiAvKiNfX1BVUkVfXyovbyhbe1xuICAgIGpzb246ICdwb3NpdGlvbnMnLFxuICAgIGpzOiAncG9zaXRpb25zJyxcbiAgICB0eXA6IC8qI19fUFVSRV9fKi9hKCAvKiNfX1BVUkVfXyovcignUG9zaXRpb24nKSlcbiAgfSwge1xuICAgIGpzb246ICd0eXBlJyxcbiAgICBqczogJ3R5cGUnLFxuICAgIHR5cDogJydcbiAgfSwge1xuICAgIGpzb246ICdpZCcsXG4gICAganM6ICdpZCcsXG4gICAgdHlwOiAvKiNfX1BVUkVfXyovdSh1bmRlZmluZWQsIC8qI19fUFVSRV9fKi9tKCcnKSlcbiAgfSwge1xuICAgIGpzb246ICduYW1lJyxcbiAgICBqczogJ25hbWUnLFxuICAgIHR5cDogLyojX19QVVJFX18qL3UodW5kZWZpbmVkLCAnJylcbiAgfV0sICdhbnknKSxcbiAgUG9zaXRpb246IC8qI19fUFVSRV9fKi9vKFt7XG4gICAganNvbjogJ2hvbGRpbmcnLFxuICAgIGpzOiAnaG9sZGluZycsXG4gICAgdHlwOiAzLjE0XG4gIH0sIHtcbiAgICBqc29uOiAnaW5zdHJ1bWVudCcsXG4gICAganM6ICdpbnN0cnVtZW50JyxcbiAgICB0eXA6IC8qI19fUFVSRV9fKi9yKCdJbnN0cnVtZW50JylcbiAgfSwge1xuICAgIGpzb246ICd0eXBlJyxcbiAgICBqczogJ3R5cGUnLFxuICAgIHR5cDogJydcbiAgfSwge1xuICAgIGpzb246ICdpZCcsXG4gICAganM6ICdpZCcsXG4gICAgdHlwOiAvKiNfX1BVUkVfXyovdSh1bmRlZmluZWQsIC8qI19fUFVSRV9fKi9tKCcnKSlcbiAgfSwge1xuICAgIGpzb246ICduYW1lJyxcbiAgICBqczogJ25hbWUnLFxuICAgIHR5cDogLyojX19QVVJFX18qL3UodW5kZWZpbmVkLCAnJylcbiAgfV0sICdhbnknKVxufTtcblxudmFyIEludGVudHM7XG5cbihmdW5jdGlvbiAoSW50ZW50cykge1xuICBJbnRlbnRzW1wiU3RhcnRDYWxsXCJdID0gXCJTdGFydENhbGxcIjtcbiAgSW50ZW50c1tcIlN0YXJ0Q2hhdFwiXSA9IFwiU3RhcnRDaGF0XCI7XG4gIEludGVudHNbXCJWaWV3Q2hhcnRcIl0gPSBcIlZpZXdDaGFydFwiO1xuICBJbnRlbnRzW1wiVmlld0NvbnRhY3RcIl0gPSBcIlZpZXdDb250YWN0XCI7XG4gIEludGVudHNbXCJWaWV3UXVvdGVcIl0gPSBcIlZpZXdRdW90ZVwiO1xuICBJbnRlbnRzW1wiVmlld05ld3NcIl0gPSBcIlZpZXdOZXdzXCI7XG4gIEludGVudHNbXCJWaWV3SW5zdHJ1bWVudFwiXSA9IFwiVmlld0luc3RydW1lbnRcIjtcbiAgSW50ZW50c1tcIlZpZXdBbmFseXNpc1wiXSA9IFwiVmlld0FuYWx5c2lzXCI7XG59KShJbnRlbnRzIHx8IChJbnRlbnRzID0ge30pKTtcblxuZXhwb3J0IHsgQ2hhbm5lbEVycm9yLCBDb250ZXh0VHlwZXMsIENvbnZlcnQsIEludGVudHMsIE9wZW5FcnJvciwgUmVzb2x2ZUVycm9yLCBhZGRDb250ZXh0TGlzdGVuZXIsIGFkZEludGVudExpc3RlbmVyLCBicm9hZGNhc3QsIGNvbXBhcmVWZXJzaW9uTnVtYmVycywgZmRjM1JlYWR5LCBmaW5kSW50ZW50LCBmaW5kSW50ZW50c0J5Q29udGV4dCwgZ2V0Q3VycmVudENoYW5uZWwsIGdldEluZm8sIGdldE9yQ3JlYXRlQ2hhbm5lbCwgZ2V0U3lzdGVtQ2hhbm5lbHMsIGpvaW5DaGFubmVsLCBsZWF2ZUN1cnJlbnRDaGFubmVsLCBvcGVuLCByYWlzZUludGVudCwgcmFpc2VJbnRlbnRGb3JDb250ZXh0LCB2ZXJzaW9uSXNBdExlYXN0IH07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1mZGMzLmVzbS5qcy5tYXBcbiIsInZhciBlPXtkOih0LG4pPT57Zm9yKHZhciByIGluIG4pZS5vKG4scikmJiFlLm8odCxyKSYmT2JqZWN0LmRlZmluZVByb3BlcnR5KHQscix7ZW51bWVyYWJsZTohMCxnZXQ6bltyXX0pfSxvOihlLHQpPT5PYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoZSx0KX0sdD17fTtlLmQodCx7QWRhcHRlckVycm9yOigpPT5BZGFwdGVyRXJyb3IsQXBpRXJyb3I6KCk9PkFwaUVycm9yLEluaXRpYWxpemF0aW9uRXJyb3I6KCk9PkluaXRpYWxpemF0aW9uRXJyb3IsSW50ZXJvcEVycm9yOigpPT5JbnRlcm9wRXJyb3IsVGVybWluYWxDb25uZWN0UmVxdWVzdEVycm9yOigpPT5UZXJtaW5hbENvbm5lY3RSZXF1ZXN0RXJyb3IsVGVybWluYWxDb25uZWN0aW9uRXJyb3I6KCk9PlRlcm1pbmFsQ29ubmVjdGlvbkVycm9yLGNvbm5lY3Q6KCk9PnRlLGRpc2FibGVMb2dnaW5nOigpPT5JLGVuYWJsZUxvZ2dpbmc6KCk9PkEsZ2V0U2VjdXJpdHlGcm9tSW5zdHJ1bWVudENvbnRleHQ6KCk9PmJ9KTtjbGFzcyBBcGlFcnJvciBleHRlbmRzIEVycm9ye2NvbnN0cnVjdG9yKGU9XCJBbiB1bmV4cGVjdGVkIGVycm9yIGhhcyBvY2N1cnJlZFwiLHQpe3N1cGVyKGUpLHRoaXMubmFtZT10aGlzLmNvbnN0cnVjdG9yLm5hbWUsdGhpcy5zdGFjaz10aGlzLnN0YWNrPy5yZXBsYWNlKC9eKFxcdypFcnJvcikvLGAke3RoaXMuY29uc3RydWN0b3IubmFtZX1gKSx0JiYodGhpcy5kYXRhPXQpfX1jbGFzcyBBZGFwdGVyRXJyb3IgZXh0ZW5kcyBBcGlFcnJvcntjb25zdHJ1Y3RvcihlPVwiRmFpbGVkIHRvIGV4ZWN1dGUgYWRhcHRlciBmdW5jdGlvblwiLHQpe3N1cGVyKGUsdCl9fWNsYXNzIEluaXRpYWxpemF0aW9uRXJyb3IgZXh0ZW5kcyBBcGlFcnJvcntjb25zdHJ1Y3RvcihlPVwiRmFpbGVkIHRvIGluaXRpYWxpemUgYWRhcHRlclwiLHQpe3N1cGVyKGUsdCl9fWNsYXNzIEludGVyb3BFcnJvciBleHRlbmRzIEFwaUVycm9ye2NvbnN0cnVjdG9yKGU9XCJGYWlsZWQgdG8gZXhlY3V0ZSB0aGUgaW50ZXJvcCBmdW5jdGlvblwiLHQpe3N1cGVyKGUsdCl9fWNsYXNzIFBhcmFtZXRlckVycm9yIGV4dGVuZHMgQXBpRXJyb3J7Y29uc3RydWN0b3IoZSl7c3VwZXIoZT1lPz9cIkludmFsaWQgcGFyYW1ldGVyIGRldGVjdGVkXCIpfX1jbGFzcyBUZXJtaW5hbENvbm5lY3Rpb25FcnJvciBleHRlbmRzIEFwaUVycm9ye2NvbnN0cnVjdG9yKGU9XCJGYWlsZWQgdG8gY29ubmVjdCB0byB0aGUgdGVybWluYWxcIix0KXtzdXBlcihlLHQpfX1jbGFzcyBUZXJtaW5hbENvbm5lY3RSZXF1ZXN0RXJyb3IgZXh0ZW5kcyBBcGlFcnJvcntjb25zdHJ1Y3RvcihlPVwiVGVybWluYWwgQ29ubmVjdCByZXF1ZXN0IGZhaWxlZFwiLHQpe3N1cGVyKGUsdCl9fWZ1bmN0aW9uIG4oZSl7cmV0dXJue2FycmF5SXRlbXM6ZX19ZnVuY3Rpb24gcigpe2Zvcih2YXIgZT1hcmd1bWVudHMubGVuZ3RoLHQ9bmV3IEFycmF5KGUpLG49MDtuPGU7bisrKXRbbl09YXJndW1lbnRzW25dO3JldHVybnt1bmlvbk1lbWJlcnM6dH19ZnVuY3Rpb24gbyhlLHQpe3JldHVybntwcm9wczplLGFkZGl0aW9uYWw6dH19ZnVuY3Rpb24gYShlKXtyZXR1cm57cHJvcHM6W10sYWRkaXRpb25hbDplfX1mdW5jdGlvbiBpKGUpe3JldHVybntyZWY6ZX19dmFyIHMsYyx1LGwscDtEYXRlLERhdGUsRGF0ZSxEYXRlLERhdGUsRGF0ZSxEYXRlLERhdGUsRGF0ZSxEYXRlLERhdGUsRGF0ZSxEYXRlLERhdGUsRGF0ZSxEYXRlLERhdGUsRGF0ZSxEYXRlLERhdGUsRGF0ZSxEYXRlLERhdGUsRGF0ZSxEYXRlLERhdGUsRGF0ZSxEYXRlLERhdGUsRGF0ZSxEYXRlLERhdGUsRGF0ZSxEYXRlLERhdGUsRGF0ZSxEYXRlLERhdGUsRGF0ZSxEYXRlLERhdGUsRGF0ZSxEYXRlLERhdGUsRGF0ZSxEYXRlLERhdGUsRGF0ZSxEYXRlLERhdGUsRGF0ZSxEYXRlLERhdGUsRGF0ZSxEYXRlLERhdGUsRGF0ZSxEYXRlLERhdGUsRGF0ZSxEYXRlLERhdGUsRGF0ZSxEYXRlOyFmdW5jdGlvbihlKXtlLkFwcE5vdEZvdW5kPVwiQXBwTm90Rm91bmRcIixlLkVycm9yT25MYXVuY2g9XCJFcnJvck9uTGF1bmNoXCIsZS5BcHBUaW1lb3V0PVwiQXBwVGltZW91dFwiLGUuUmVzb2x2ZXJVbmF2YWlsYWJsZT1cIlJlc29sdmVyVW5hdmFpbGFibGVcIixlLk1hbGZvcm1lZENvbnRleHQ9XCJNYWxmb3JtZWRDb250ZXh0XCIsZS5EZXNrdG9wQWdlbnROb3RGb3VuZD1cIkRlc2t0b3BBZ2VudE5vdEZvdW5kXCJ9KHN8fChzPXt9KSksZnVuY3Rpb24oZSl7ZS5Ob0FwcHNGb3VuZD1cIk5vQXBwc0ZvdW5kXCIsZS5SZXNvbHZlclVuYXZhaWxhYmxlPVwiUmVzb2x2ZXJVbmF2YWlsYWJsZVwiLGUuVXNlckNhbmNlbGxlZD1cIlVzZXJDYW5jZWxsZWRSZXNvbHV0aW9uXCIsZS5SZXNvbHZlclRpbWVvdXQ9XCJSZXNvbHZlclRpbWVvdXRcIixlLlRhcmdldEFwcFVuYXZhaWxhYmxlPVwiVGFyZ2V0QXBwVW5hdmFpbGFibGVcIixlLlRhcmdldEluc3RhbmNlVW5hdmFpbGFibGU9XCJUYXJnZXRJbnN0YW5jZVVuYXZhaWxhYmxlXCIsZS5JbnRlbnREZWxpdmVyeUZhaWxlZD1cIkludGVudERlbGl2ZXJ5RmFpbGVkXCIsZS5NYWxmb3JtZWRDb250ZXh0PVwiTWFsZm9ybWVkQ29udGV4dFwiLGUuRGVza3RvcEFnZW50Tm90Rm91bmQ9XCJEZXNrdG9wQWdlbnROb3RGb3VuZFwifShjfHwoYz17fSkpLGZ1bmN0aW9uKGUpe2UuTm9SZXN1bHRSZXR1cm5lZD1cIk5vUmVzdWx0UmV0dXJuZWRcIixlLkludGVudEhhbmRsZXJSZWplY3RlZD1cIkludGVudEhhbmRsZXJSZWplY3RlZFwifSh1fHwodT17fSkpLGZ1bmN0aW9uKGUpe2UuTm9DaGFubmVsRm91bmQ9XCJOb0NoYW5uZWxGb3VuZFwiLGUuQWNjZXNzRGVuaWVkPVwiQWNjZXNzRGVuaWVkXCIsZS5DcmVhdGlvbkZhaWxlZD1cIkNyZWF0aW9uRmFpbGVkXCIsZS5NYWxmb3JtZWRDb250ZXh0PVwiTWFsZm9ybWVkQ29udGV4dFwifShsfHwobD17fSkpLGZ1bmN0aW9uKGUpe2UuUmVzcG9uc2VUaW1lZE91dD1cIlJlc3BvbnNlVG9CcmlkZ2VUaW1lZE91dFwiLGUuQWdlbnREaXNjb25uZWN0ZWQ9XCJBZ2VudERpc2Nvbm5lY3RlZFwiLGUuTm90Q29ubmVjdGVkVG9CcmlkZ2U9XCJOb3RDb25uZWN0ZWRUb0JyaWRnZVwiLGUuTWFsZm9ybWVkTWVzc2FnZT1cIk1hbGZvcm1lZE1lc3NhZ2VcIn0ocHx8KHA9e30pKTt2YXIgZDshZnVuY3Rpb24oZSl7ZS5DaGFydD1cImZkYzMuY2hhcnRcIixlLkNoYXRJbml0U2V0dGluZ3M9XCJmZGMzLmNoYXQuaW5pdFNldHRpbmdzXCIsZS5DaGF0Um9vbT1cImZkYzMuY2hhdC5yb29tXCIsZS5Db250YWN0PVwiZmRjMy5jb250YWN0XCIsZS5Db250YWN0TGlzdD1cImZkYzMuY29udGFjdExpc3RcIixlLkNvdW50cnk9XCJmZGMzLmNvdW50cnlcIixlLkN1cnJlbmN5PVwiZmRjMy5jdXJyZW5jeVwiLGUuRW1haWw9XCJmZGMzLmVtYWlsXCIsZS5JbnN0cnVtZW50PVwiZmRjMy5pbnN0cnVtZW50XCIsZS5JbnN0cnVtZW50TGlzdD1cImZkYzMuaW5zdHJ1bWVudExpc3RcIixlLkludGVyYWN0aW9uPVwiZmRjMy5pbnRlcmFjdGlvblwiLGUuTm90aGluZz1cImZkYzMubm90aGluZ1wiLGUuT3JnYW5pemF0aW9uPVwiZmRjMy5vcmdhbml6YXRpb25cIixlLlBvcnRmb2xpbz1cImZkYzMucG9ydGZvbGlvXCIsZS5Qb3NpdGlvbj1cImZkYzMucG9zaXRpb25cIixlLkNoYXRTZWFyY2hDcml0ZXJpYT1cImZkYzMuY2hhdC5zZWFyY2hDcml0ZXJpYVwiLGUuVGltZVJhbmdlPVwiZmRjMy50aW1lcmFuZ2VcIixlLlRyYW5zYWN0aW9uUmVzdWx0PVwiZmRjMy50cmFuc2FjdGlvblJlc3VsdFwiLGUuVmFsdWF0aW9uPVwiZmRjMy52YWx1YXRpb25cIn0oZHx8KGQ9e30pKTtmdW5jdGlvbiBnKGUpe3JldHVybnthcnJheUl0ZW1zOmV9fWZ1bmN0aW9uIG0oKXtmb3IodmFyIGU9YXJndW1lbnRzLmxlbmd0aCx0PW5ldyBBcnJheShlKSxuPTA7bjxlO24rKyl0W25dPWFyZ3VtZW50c1tuXTtyZXR1cm57dW5pb25NZW1iZXJzOnR9fWZ1bmN0aW9uIGYoZSx0KXtyZXR1cm57cHJvcHM6ZSxhZGRpdGlvbmFsOnR9fWZ1bmN0aW9uIHcoZSl7cmV0dXJue3Byb3BzOltdLGFkZGl0aW9uYWw6ZX19ZnVuY3Rpb24gaChlKXtyZXR1cm57cmVmOmV9fXZhciB5O0RhdGUsRGF0ZSxEYXRlLERhdGUsRGF0ZSxEYXRlOyFmdW5jdGlvbihlKXtlLkNyZWF0ZUludGVyYWN0aW9uPVwiQ3JlYXRlSW50ZXJhY3Rpb25cIixlLlNlbmRDaGF0TWVzc2FnZT1cIlNlbmRDaGF0TWVzc2FnZVwiLGUuU3RhcnRDYWxsPVwiU3RhcnRDYWxsXCIsZS5TdGFydENoYXQ9XCJTdGFydENoYXRcIixlLlN0YXJ0RW1haWw9XCJTdGFydEVtYWlsXCIsZS5WaWV3QW5hbHlzaXM9XCJWaWV3QW5hbHlzaXNcIixlLlZpZXdDaGF0PVwiVmlld0NoYXRcIixlLlZpZXdDaGFydD1cIlZpZXdDaGFydFwiLGUuVmlld0NvbnRhY3Q9XCJWaWV3Q29udGFjdFwiLGUuVmlld0hvbGRpbmdzPVwiVmlld0hvbGRpbmdzXCIsZS5WaWV3SW5zdHJ1bWVudD1cIlZpZXdJbnN0cnVtZW50XCIsZS5WaWV3SW50ZXJhY3Rpb25zPVwiVmlld0ludGVyYWN0aW9uc1wiLGUuVmlld01lc3NhZ2VzPVwiVmlld01lc3NhZ2VzXCIsZS5WaWV3TmV3cz1cIlZpZXdOZXdzXCIsZS5WaWV3T3JkZXJzPVwiVmlld09yZGVyc1wiLGUuVmlld1Byb2ZpbGU9XCJWaWV3UHJvZmlsZVwiLGUuVmlld1F1b3RlPVwiVmlld1F1b3RlXCIsZS5WaWV3UmVzZWFyY2g9XCJWaWV3UmVzZWFyY2hcIn0oeXx8KHk9e30pKTtjb25zdCBDPWU9Pntjb25zdCB0PURhdGUucGFyc2UoZSk7aWYoIU51bWJlci5pc05hTih0KSlyZXR1cm4gbmV3IERhdGUodCl9LEU9ZT0+e2xldCB0PS9cXHMrKFtcXHctXSskKS8uZXhlYyhlKT8uWzFdO2lmKHQpcmV0dXJuIHQ9dC5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSt0LnNsaWNlKDEpLnRvTG93ZXJDYXNlKCkucmVwbGFjZShcIi1tXCIsXCItTVwiKSx0fSxiPWU9PntpZihlLnR5cGUhPT1kLkluc3RydW1lbnQpcmV0dXJuO2NvbnN0e2lkOnQsbWFya2V0Om59PWUse0JCRzpyLEZJR0k6byx0aWNrZXI6YX09dDtpZihyfHxvKXJldHVybiByPz9vO2lmKCFhKXJldHVybjtyZXR1cm5gJHthfSAke24/LkJCRz9uLkJCRzpcIlVTXCJ9IEVxdWl0eWB9O2xldCB2PSExO2NvbnN0IEQ9XCJbQG9wZW5maW4vYmxvb21iZXJnXVwiLEk9KCk9Pnt2PSExfSxBPSgpPT57dj0hMCxOKFwidjIuMC4wXCIpfSxSPShlLHQpPT57aWYoIXYpcmV0dXJuO2NvbnN0IG49dD9gJHtEfSAke3R9YDpEO2UgaW5zdGFuY2VvZiBBcGlFcnJvciYmZS5kYXRhP2NvbnNvbGUuZXJyb3IobixlLGUuZGF0YSk6Y29uc29sZS5lcnJvcihuLGUpfSxOPSguLi5lKT0+e3YmJmNvbnNvbGUubG9nKEQsLi4uZSl9LHg9KC4uLmUpPT57diYmY29uc29sZS53YXJuKEQsLi4uZSl9O3ZhciBULFMsTTtcInVuZGVmaW5lZFwiPT10eXBlb2YgZmluJiZPYmplY3QuYXNzaWduKHdpbmRvdyx7ZmluOnt9fSksT2JqZWN0LmFzc2lnbihmaW4se0ludGVncmF0aW9uczp7Qmxvb21iZXJnOntlbmFibGVMb2dnaW5nOkEsZGlzYWJsZUxvZ2dpbmc6SX19fSksZnVuY3Rpb24oZSl7ZS5DYW5jZWxTdWJzY3JpcHRpb249XCJDYW5jZWxTdWJzY3JpcHRpb25cIixlLkNvbm5lY3Q9XCJDb25uZWN0XCIsZS5DcmVhdGVTdWJzY3JpcHRpb249XCJDcmVhdGVTdWJzY3JpcHRpb25cIixlLkRpc2Nvbm5lY3Q9XCJEaXNjb25uZWN0XCIsZS5FeGVjdXRlUmVxdWVzdD1cIkV4ZWN1dGVSZXF1ZXN0XCIsZS5Mb2dNZXNzYWdlPVwiTG9nTWVzc2FnZVwiLGUuU3Vic2NyaXB0aW9uRXZlbnQ9XCJTdWJzY3JpcHRpb25FdmVudFwifShUfHwoVD17fSkpLGZ1bmN0aW9uKGUpe2VbZS5FcnJvcj0wXT1cIkVycm9yXCIsZVtlLkluZm89MV09XCJJbmZvXCIsZVtlLldhcm49Ml09XCJXYXJuXCJ9KFN8fChTPXt9KSksZnVuY3Rpb24oZSl7ZS5Mb2NhbD1cIkxvY2FsXCIsZS5SZW1vdGU9XCJSZW1vdGVcIn0oTXx8KE09e30pKTtjb25zdCBWPWU9PmFzeW5jKCk9PntOKFwiUmV0cmlldmluZyBsYXVuY2hwYWQgZ3JvdXBzXCIpO2NvbnN0IHQ9e3F1ZXJ5OlwicXVlcnkge1xcbiAgICAgICAgICBncm91cHMge1xcbiAgICAgICAgICAgIC4uLiBvbiBHcm91cHMge1xcbiAgICAgICAgICAgICAgaXRlbXMge1xcbiAgICAgICAgICAgICAgICBpZFxcbiAgICAgICAgICAgICAgICBuYW1lXFxuICAgICAgICAgICAgICAgIHR5cGVcXG4gICAgICAgICAgICAgICAgdmFsdWVcXG4gICAgICAgICAgICAgIH1cXG4gICAgICAgICAgICB9XFxuICAgICAgICAgICAgLi4uIG9uIEVycm9yIHtcXG4gICAgICAgICAgICAgIGVycm9yQ2F0ZWdvcnlcXG4gICAgICAgICAgICAgIGVycm9yTWVzc2FnZVxcbiAgICAgICAgICAgIH1cXG4gICAgICAgICAgfVxcbiAgICAgICAgfVwifTtsZXQgbjt0cnl7bj1hd2FpdCBlKFQuRXhlY3V0ZVJlcXVlc3QsdCl9Y2F0Y2goZSl7Y29uc3QgdD1uZXcgQWRhcHRlckVycm9yKHZvaWQgMCxlKTt0aHJvdyBSKHQpLHR9aWYoIW4uc3VjY2Vzcyl7Y29uc3QgZT1uZXcgVGVybWluYWxDb25uZWN0UmVxdWVzdEVycm9yKG4uZXJyb3I/Lm1lc3NhZ2Usbi5lcnJvcik7dGhyb3cgUihlKSxlfWlmKCFuLmRhdGEpe2NvbnN0IGU9bmV3IFRlcm1pbmFsQ29ubmVjdFJlcXVlc3RFcnJvcihcIlVuZXhwZWN0ZWQgZW1wdHkgcmVzcG9uc2UgZGF0YVwiLG4pO3Rocm93IFIoZSksZX1jb25zdHtncm91cHM6cn09SlNPTi5wYXJzZShuLmRhdGEpO2lmKHIuaXRlbXMpcmV0dXJuIHIuaXRlbXM7Y29uc3Qgbz1uZXcgVGVybWluYWxDb25uZWN0UmVxdWVzdEVycm9yKHIuZXJyb3JNZXNzYWdlLHIpO3Rocm93IFIobyksb30sJD1lPT5hc3luYyh0LG4pPT57aWYobnVsbD09dHx8XCJudW1iZXJcIiE9dHlwZW9mIHR8fE51bWJlci5pc05hTih0KSl0aHJvdyBuZXcgUGFyYW1ldGVyRXJyb3IoXCJHcm91cCBJRCBtdXN0IGJlIGEgdmFsaWQgbnVtYmVyXCIpO2lmKCFuPy50cmltKCkpdGhyb3cgbmV3IFBhcmFtZXRlckVycm9yKFwiR3JvdXAgdmFsdWUgbXVzdCBiZSBhIG5vbi1lbXB0eSBzdHJpbmdcIik7TihcIlNldHRpbmcgZ3JvdXAgdmFsdWVcIix7Z3JvdXBJZDp0LG5ld1ZhbHVlOm59KTtjb25zdCByPXtxdWVyeTpgbXV0YXRpb24ge1xcbiAgICAgICAgICBzZXRHcm91cFZhbHVlKFxcbiAgICAgICAgICAgIGZpbHRlcjoge2lkOiBbJHt0fV19LFxcbiAgICAgICAgICAgIHZhbHVlOiBcIiR7bn1cIikge1xcbiAgICAgICAgICAgIC4uLiBvbiBHcm91cFJlc3VsdHMge1xcbiAgICAgICAgICAgICAgcmVzdWx0cyB7XFxuICAgICAgICAgICAgICAgIHJlc3VsdCB7XFxuICAgICAgICAgICAgICAgICAgc3VjY2VlZGVkXFxuICAgICAgICAgICAgICAgICAgZGV0YWlsc1xcbiAgICAgICAgICAgICAgICB9XFxuICAgICAgICAgICAgICB9XFxuICAgICAgICAgICAgfVxcbiAgICAgICAgICAgIC4uLiBvbiBFcnJvciB7XFxuICAgICAgICAgICAgICBlcnJvckNhdGVnb3J5XFxuICAgICAgICAgICAgICBlcnJvck1lc3NhZ2VcXG4gICAgICAgICAgICB9XFxuICAgICAgICAgIH1cXG4gICAgICAgIH1gfTtsZXQgbzt0cnl7bz1hd2FpdCBlKFQuRXhlY3V0ZVJlcXVlc3Qscil9Y2F0Y2goZSl7Y29uc3QgdD1uZXcgQWRhcHRlckVycm9yKHZvaWQgMCxlKTt0aHJvdyBSKHQpLHR9aWYoIW8uc3VjY2Vzcyl7Y29uc3QgZT1uZXcgVGVybWluYWxDb25uZWN0UmVxdWVzdEVycm9yKG8uZXJyb3I/Lm1lc3NhZ2Usby5lcnJvcik7dGhyb3cgUihlKSxlfWlmKCFvLmRhdGEpe2NvbnN0IGU9bmV3IFRlcm1pbmFsQ29ubmVjdFJlcXVlc3RFcnJvcihcIlVuZXhwZWN0ZWQgZW1wdHkgcmVzcG9uc2UgZGF0YVwiLG8pO3Rocm93IFIoZSksZX1jb25zdHtzZXRHcm91cFZhbHVlOmF9PUpTT04ucGFyc2Uoby5kYXRhKTtpZihcImVycm9yTWVzc2FnZVwiaW4gYSl7Y29uc3QgZT1uZXcgVGVybWluYWxDb25uZWN0UmVxdWVzdEVycm9yKGEuZXJyb3JNZXNzYWdlLGEpO3Rocm93IFIoZSksZX19LHE9bmV3IE1hcCxCPWFzeW5jKGUsdCxuLHIpPT57Y29uc3Qgbz1hd2FpdCBPKGUpKHQpO2lmKCFvKXJldHVybjtjb25zdCBhPWF3YWl0KGU9PmFzeW5jKHQ9W10pPT57TihcIkNyZWF0aW5nIGdyb3VwIHN1YnNjcmlwdGlvblwiLHtncm91cElkRmlsdGVyOnR9KTtjb25zdCBuPXtxdWVyeTpgc3Vic2NyaXB0aW9uIHtcXG4gICAgICAgIHN1YnNjcmliZUdyb3VwRXZlbnRzIChcXG4gICAgICAgICAgZmlsdGVyOntcXG4gICAgICAgICAgICBldmVudDogW1xcbiAgICAgICAgICAgICAgVkFMVUVfQ0hBTkdFRFxcbiAgICAgICAgICAgIF1cXG4gICAgICAgICAgICAke3QubGVuZ3RoP2AsZ3JvdXA6IHtpZDogJHtKU09OLnN0cmluZ2lmeSh0KX19YDpcIlwifVxcbiAgICAgICAgICB9KXtcXG4gICAgICAgICAgdHlwZVxcbiAgICAgICAgICBncm91cHtcXG4gICAgICAgICAgICBpZFxcbiAgICAgICAgICAgIG5hbWVcXG4gICAgICAgICAgICB2YWx1ZVxcbiAgICAgICAgICB9XFxuICAgICAgICB9XFxuICAgICAgfWB9O2xldCByO3RyeXtyPWF3YWl0IGUoVC5DcmVhdGVTdWJzY3JpcHRpb24sbil9Y2F0Y2goZSl7Y29uc3QgdD1uZXcgQWRhcHRlckVycm9yKHZvaWQgMCxlKTt0aHJvdyBSKHQpLHR9aWYoIXIuc3VjY2Vzcyl7Y29uc3QgZT1uZXcgVGVybWluYWxDb25uZWN0UmVxdWVzdEVycm9yKHIuZXJyb3I/Lm1lc3NhZ2Usci5lcnJvcik7dGhyb3cgUihlKSxlfWlmKCFyLmRhdGEpe2NvbnN0IGU9bmV3IFRlcm1pbmFsQ29ubmVjdFJlcXVlc3RFcnJvcihcIlVuZXhwZWN0ZWQgZW1wdHkgcmVzcG9uc2UgZGF0YVwiLHIpO3Rocm93IFIoZSksZX1jb25zdHtzdWJzY3JpcHRpb25JZDpvfT1KU09OLnBhcnNlKHIuZGF0YSk7cmV0dXJuIG99KShlKShvKSxpPXtpZDphLGxpc3RlbmVyOlUobixyKSx1bnN1YnNjcmliZTpGKGUsYSl9O3JldHVybiBxLnNldChhLGkpLGl9LEY9KGUsdCk9PmFzeW5jKCk9PntOKFwiVW5zdWJzY3JpYmluZyBncm91cCBldmVudHNcIix7c3Vic2NyaXB0aW9uSWQ6dH0pO3RyeXthd2FpdChlPT5hc3luYyB0PT57Y29uc3Qgbj17c3Vic2NyaXB0aW9uSWQ6dH07bGV0IHI7dHJ5e3I9YXdhaXQgZShULkNhbmNlbFN1YnNjcmlwdGlvbixuKX1jYXRjaChlKXtjb25zdCB0PW5ldyBBZGFwdGVyRXJyb3Iodm9pZCAwLGUpO3Rocm93IFIodCksdH1pZighci5zdWNjZXNzKXtjb25zdCBlPW5ldyBUZXJtaW5hbENvbm5lY3RSZXF1ZXN0RXJyb3Ioci5lcnJvcj8ubWVzc2FnZSxyLmVycm9yKTt0aHJvdyBSKGUpLGV9fSkoZSkodCl9Y2F0Y2goZSl7UihlKX1xLmRlbGV0ZSh0KX0sVT0oZSx0KT0+YXN5bmMgbj0+e3RyeXtlPy4obiksTihcIlNldHRpbmcgbmV3IGNvbnRleHQ6IFwiLG4pLGF3YWl0IGZpbi5tZS5pbnRlcm9wLnNldENvbnRleHQobil9Y2F0Y2goZSl7Y29uc3Qgbj1uZXcgSW50ZXJvcEVycm9yKHZvaWQgMCxlKTtSKG4pLHQ/LihuKX19LFA9YXN5bmMoZSx0KT0+e04oXCJHcm91cCBldmVudCByZWNlaXZlZFwiLHtkYXRhOnQsc3Vic2NyaXB0aW9uSWQ6ZX0pO2NvbnN0e2dyb3VwOm59PXQuc3Vic2NyaWJlR3JvdXBFdmVudHM7aWYoIW4pcmV0dXJuIHZvaWQgeChcIlJlY2VpdmVkIGdyb3VwIGV2ZW50IHdpdGggbm8gZ3JvdXBcIix7c3Vic2NyaXB0aW9uSWQ6ZX0pO2lmKCFxLmhhcyhlKSlyZXR1cm4gdm9pZCB4KFwiUmVjZWl2ZWQgZ3JvdXAgZXZlbnQgZm9yIHVua25vd24gc3Vic2NyaXB0aW9uXCIse3N1YnNjcmlwdGlvbklkOmV9KTtjb25zdCByPXEuZ2V0KGUpLG89KGU9Pntjb25zdCB0PXt0eXBlOmQuSW5zdHJ1bWVudCxpZDp7QkJHOmV9fTtpZihcIkVxdWl0eVwiPT09RShlKSl7Y29uc3RbbixyXT1lLnNwbGl0KC9cXHMrLyk7dC5pZC50aWNrZXI9bj8udG9VcHBlckNhc2UoKSx0Lm1hcmtldD17QkJHOnI/LnRvVXBwZXJDYXNlKCl9fXJldHVybiB0fSkobi52YWx1ZSk7by5vcGVuZmluQmJnQXBpPSEwLHI/Lmxpc3RlbmVyKG8pfSxPPWU9PmFzeW5jIHQ9PntpZighdClyZXR1cm47aWYoXCIqXCI9PT10KXJldHVybltdO0FycmF5LmlzQXJyYXkodCl8fCh0PVt0XSk7Y29uc3Qgbj1hd2FpdCBWKGUpKCkscj10Lm1hcCgoZT0+e2NvbnN0IHQ9bi5maW5kKCh0PT50Lm5hbWU/LnRvVXBwZXJDYXNlKCk9PT1lLnRvVXBwZXJDYXNlKCkpKT8uaWQ7cmV0dXJuIHR8fHgoYEdyb3VwIG5vdCBmb3VuZDogJHtlfWApLHR9KSkuZmlsdGVyKEJvb2xlYW4pO3JldHVybiByLmxlbmd0aD9yOnZvaWQgMH0sRz1cImJsb29tYmVyZy1hZGFwdGVyXCIsTD1gYmxvb21iZXJnLWFkYXB0ZXItJHt2b2lkIDAhPT1jcnlwdG8ucmFuZG9tVVVJRD9jcnlwdG8ucmFuZG9tVVVJRCgpOlwiMTAwMDAwMDAtMTAwMC00MDAwLTgwMDAtMTAwMDAwMDAwMDAwXCIucmVwbGFjZSgvWzAxOF0vZywoZT0+e2NvbnN0IHQ9Y3J5cHRvLmdldFJhbmRvbVZhbHVlcyhuZXcgVWludDhBcnJheSgxKSlbMF0mMTU+Pk51bWJlcihlKS80O3JldHVybihOdW1iZXIoZSledCkudG9TdHJpbmcoMTYpfSkpfWA7bGV0IGs7Y29uc3Qgej1hc3luYyhlPSExKT0+e3RyeXtpZighYXdhaXQoYXN5bmMgZT0+KGF3YWl0IGZpbi5JbnRlckFwcGxpY2F0aW9uQnVzLkNoYW5uZWwuZ2V0QWxsQ2hhbm5lbHMoKSkuc29tZSgodD0+dC5jaGFubmVsTmFtZT09PWUpKSkoTCkpe2NvbnN0e3BvcnQ6dCxzZWN1cml0eVJlYWxtOm59PWF3YWl0IGZpbi5TeXN0ZW0uZ2V0UnVudGltZUluZm8oKSx7bGljZW5zZUtleTpyfT1hd2FpdCBmaW4uQXBwbGljYXRpb24uZ2V0Q3VycmVudFN5bmMoKS5nZXRNYW5pZmVzdCgpLG89ZmluLm1lLnV1aWQ7TihcIkluaXRpYWxpemluZyBhZGFwdGVyXCIse2NoYW5uZWxOYW1lOkwsbGljZW5zZUtleTpyLHBvcnQ6dCxzZWN1cml0eVJlYWxtOm4sdXVpZDpvLGFkYXB0ZXJMb2dnaW5nRW5hYmxlZDplfSksYXdhaXQoYXN5bmMoKT0+e2NvbnN0IGU9YXdhaXQgZmluLkFwcGxpY2F0aW9uLmdldEN1cnJlbnRTeW5jKCkuZ2V0TWFuaWZlc3QoKSx0PWUuYXBwQXNzZXRzPy5maW5kKChlPT5lLmFsaWFzPT09RykpO2lmKHQpcmV0dXJuIHZvaWQgeChcIkRldGVjdGVkIGFkYXB0ZXIgcGFja2FnZSBpbiBhcHAgbWFuaWZlc3QgYXBwQXNzZXRzXCIsdCk7aWYoYXdhaXQgaigpKXJldHVybiB2b2lkIE4oXCJVc2luZyBleGlzdGluZyBhZGFwdGVyIHBhY2thZ2VcIik7Y29uc3Qgbj17YWxpYXM6RyxzcmM6XCJodHRwczovL2Nkbi5vcGVuZmluLmNvL3JlbGVhc2UvaW50ZWdyYXRpb25zL2Jsb29tYmVyZy8yLjAuMC9PcGVuRmluLkJsb29tYmVyZy56aXBcIix0YXJnZXQ6XCJPcGVuRmluLkJsb29tYmVyZy5leGVcIix2ZXJzaW9uOlwiMi4wLjBcIn07TihcIkRvd25sb2FkaW5nIGFkYXB0ZXIgcGFja2FnZVwiLG4pO3RyeXthd2FpdCBmaW4uU3lzdGVtLmRvd25sb2FkQXNzZXQobiwoKCk9Pnt9KSl9Y2F0Y2goZSl7dGhyb3cgUihcIlVuYWJsZSB0byBkb3dubG9hZCBhZGFwdGVyIHBhY2thZ2VcIiksZX19KSgpLGZpbi5TeXN0ZW0ubGF1bmNoRXh0ZXJuYWxQcm9jZXNzKHthbGlhczpHLGFyZ3VtZW50czpgXCIke299XCIgXCIke3I/P1wiXCJ9XCIgXCIke3R9XCIgXCIke24/P1wiXCJ9XCIgXCIke0x9XCIgXCIke2V9XCJgLGxpZmV0aW1lOlwiYXBwbGljYXRpb25cIn0pfWNvbnN0IG49ZmluLkludGVyQXBwbGljYXRpb25CdXMuQ2hhbm5lbC5jb25uZWN0KEwse3BheWxvYWQ6e3ZlcnNpb246XCIyLjAuMFwifX0pLHI9bmV3IFByb21pc2UoKGU9PntzZXRUaW1lb3V0KGUsMmU0KX0pKS50aGVuKCgoKT0+e3Rocm93IG5ldyBBcGlFcnJvcihcIkNvbm5lY3Rpb24gdG8gYWRhcHRlciB0aW1lZCBvdXRcIil9KSk7cmV0dXJuIGs9YXdhaXQgUHJvbWlzZS5yYWNlKFtuLHJdKSxrLnJlZ2lzdGVyKFQuTG9nTWVzc2FnZSxIKSxrLnJlZ2lzdGVyKFQuU3Vic2NyaXB0aW9uRXZlbnQsSiksTihcIkNvbm5lY3RlZCB0byBhZGFwdGVyXCIse3V1aWQ6ay5wcm92aWRlcklkZW50aXR5LnV1aWR9KSx7Y2hhbm5lbE5hbWU6TCxkaXNwYXRjaDooLi4uZSk9PmsuZGlzcGF0Y2goLi4uZSksaW5pdFRlcm1pbmFsOih0PWssYXN5bmMgZT0+e2NvbnN0IG49e2FwaUtleTplfTtsZXQgcjt0cnl7cj1hd2FpdCB0LmRpc3BhdGNoKFQuQ29ubmVjdCxuKX1jYXRjaChlKXtjb25zdCB0PW5ldyBBZGFwdGVyRXJyb3Iodm9pZCAwLGUpO3Rocm93IFIodCksdH1pZighci5zdWNjZXNzKXtjb25zdCBlPW5ldyBUZXJtaW5hbENvbm5lY3Rpb25FcnJvcihyLmVycm9yPy5tZXNzYWdlLHIuZXJyb3IpO3Rocm93IFIoZSksZX19KSx2ZXJzaW9uOlwiMi4wLjBcIn19Y2F0Y2goZSl7Y29uc3QgdD1lIGluc3RhbmNlb2YgQXBpRXJyb3I/bmV3IEluaXRpYWxpemF0aW9uRXJyb3IoZS5tZXNzYWdlKTpuZXcgSW5pdGlhbGl6YXRpb25FcnJvcih2b2lkIDAsZSk7dGhyb3cgUih0KSx0fXZhciB0fSxIPWU9Pntjb25zdHtsZXZlbDp0LG1lc3NhZ2U6bn09ZSxyPVwiW2FkYXB0ZXJdXCI7c3dpdGNoKHQpe2Nhc2UgUy5FcnJvcjpSKG4scik7YnJlYWs7Y2FzZSBTLldhcm46eChyLG4pO2JyZWFrO2Nhc2UgUy5JbmZvOmRlZmF1bHQ6TihyLG4pfX0sSj1hc3luYyBlPT57Y29uc3R7ZGF0YTp0LGVycm9yOm4sc3Vic2NyaXB0aW9uSWQ6cn09ZTtpZighcnx8IXQpe2NvbnN0IHQ9bmV3IFRlcm1pbmFsQ29ubmVjdFJlcXVlc3RFcnJvcihcIkludmFsaWQgc3Vic2NyaXB0aW9uIGV2ZW50XCIsZSk7dGhyb3cgUih0KSx0fWlmKG4pe2NvbnN0IGU9bmV3IFRlcm1pbmFsQ29ubmVjdFJlcXVlc3RFcnJvcih2b2lkIDAsbik7dGhyb3cgUihlKSxlfWNvbnN0IG89SlNPTi5wYXJzZSh0KTtpZighMD09PUJvb2xlYW4oby5zdWJzY3JpYmVHcm91cEV2ZW50cykpYXdhaXQgUChyLG8pO2Vsc2UgeChcIlJlY2VpdmVkIHVua25vd24gc3Vic2NyaXB0aW9uIGV2ZW50XCIsdCl9LGo9YXN5bmMoKT0+e3RyeXtyZXR1cm5cIjIuMC4wXCI9PT0oYXdhaXQgZmluLlN5c3RlbS5nZXRBcHBBc3NldEluZm8oe2FsaWFzOkd9KSkudmVyc2lvbn1jYXRjaChlKXtyZXR1cm4hMX19LFE9YXN5bmMoZSx0KT0+e2lmKCFlKXJldHVybiB2b2lkIHgoXCJObyBhY3Rpb24gc3BlY2lmaWVkLCBpZ25vcmluZ1wiKTtpZihcImdyb3VwXCJpbiBlKXtjb25zdHtncm91cDpuLHNlY3VyaXR5OnJ9PWU7cmV0dXJuIHZvaWQgYXdhaXQoZT0+YXN5bmModCxuKT0+e2lmKCFuKXJldHVybjtOKGBTZXR0aW5nICR7XCIqXCI9PT10P1wiZXZlcnkgZ3JvdXBcIjpgZ3JvdXAgJHt0fWB9IHNlY3VyaXR5IHRvICR7bn1gKTtjb25zdCByPWF3YWl0IFYoZSkoKTtpZihcIipcIj09PXQpYXdhaXQgUHJvbWlzZS5hbGwoci5tYXAoKHQ9PnQuaWQ/JChlKSh0LmlkLG4pOlByb21pc2UucmVzb2x2ZSgpKSkpO2Vsc2V7Y29uc3Qgbz1yLmZpbmQoKGU9PmUubmFtZT8udG9VcHBlckNhc2UoKT09PXQudG9VcHBlckNhc2UoKSkpPy5pZDtudWxsPT1vP3goYFVuYWJsZSB0byB1cGRhdGUgZ3JvdXAgc2VjdXJpdHkgZm9yICR7dH06IGdyb3VwIG5vdCBmb3VuZGApOmF3YWl0ICQoZSkobyxuKX19KSh0KShuLHIpfWNvbnN0e21uZW1vbmljOm4sc2VjdXJpdGllczpyLHRhcmdldDpvLHRhaWw6YX09ZSxbaSxzXT1yPz9bXTthd2FpdChlPT5hc3luYyh0LG4scixvLGEpPT57aWYoIXQ/LnRyaW0oKSl0aHJvdyBuZXcgUGFyYW1ldGVyRXJyb3IoXCJNbmVtb25pYyBtdXN0IGJlIGEgbm9uLWVtcHR5IHN0cmluZ1wiKTtpZihudWxsPT1ufHxcInN0cmluZ1wiPT10eXBlb2YgbiYmIW4/LnRyaW0oKSl0aHJvdyBuZXcgUGFyYW1ldGVyRXJyb3IoXCJUYXJnZXQgbXVzdCBiZSBhIG51bWJlciAoMC0zKSBvciBub24tZW1wdHkgc3RyaW5nXCIpO04oXCJSdW5uaW5nIHRlcm1pbmFsIGZ1bmN0aW9uXCIse21uZW1vbmljOnQsdGFyZ2V0Om4sc2VjdXJpdHkxOnIsc2VjdXJpdHkyOm8sdGFpbDphfSk7Y29uc3QgaT10LnRyaW0oKS50b1VwcGVyQ2FzZSgpO2xldCBzLGM7XCJudW1iZXJcIj09dHlwZW9mIG4/KHM9XCJydW5GdW5jdGlvbkluUGFuZWxcIixjPVwicGFuZWw6IFwiKygxPT09bj9cIk9ORVwiOjI9PT1uP1wiVFdPXCI6Mz09PW4/XCJUSFJFRVwiOlwiWkVST1wiKSk6KHM9XCJydW5GdW5jdGlvbkluVGFiXCIsYz1gdGFiTmFtZTogXCIke24udHJpbSgpfVwiYCk7Y29uc3QgdT17cXVlcnk6YG11dGF0aW9uIHtcXG4gICAgICAgICR7c30oaW5wdXQ6IHtcXG4gICAgICAgICAgbW5lbW9uaWM6IFwiJHtpfVwiLFxcbiAgICAgICAgICAke2N9LFxcbiAgICAgICAgICAke3I/YHNlY3VyaXR5MTogXCIke3J9XCJgOlwiXCJ9XFxuICAgICAgICAgICR7bz9gc2VjdXJpdHkyOiBcIiR7b31cImA6XCJcIn1cXG4gICAgICAgICAgJHthP2B0YWlsOiBcIiR7YX1cImA6XCJcIn1cXG4gICAgICAgIH0pIHtcXG4gICAgICAgICAgLi4uIG9uIFJlc3VsdCB7XFxuICAgICAgICAgICAgc3VjY2VlZGVkXFxuICAgICAgICAgICAgZGV0YWlsc1xcbiAgICAgICAgICB9XFxuICAgICAgICAgIC4uLiBvbiBFcnJvciB7XFxuICAgICAgICAgICAgZXJyb3JDYXRlZ29yeVxcbiAgICAgICAgICAgIGVycm9yTWVzc2FnZVxcbiAgICAgICAgICB9XFxuICAgICAgICB9XFxuICAgICAgfWB9O2xldCBsO3RyeXtsPWF3YWl0IGUoVC5FeGVjdXRlUmVxdWVzdCx1KX1jYXRjaChlKXtjb25zdCB0PW5ldyBBZGFwdGVyRXJyb3Iodm9pZCAwLGUpO3Rocm93IFIodCksdH1pZighbC5zdWNjZXNzKXtjb25zdCBlPW5ldyBUZXJtaW5hbENvbm5lY3RSZXF1ZXN0RXJyb3IobC5lcnJvcj8ubWVzc2FnZSxsLmVycm9yKTt0aHJvdyBSKGUpLGV9aWYobC5kYXRhKXtjb25zdCBlPUpTT04ucGFyc2UobC5kYXRhKTtsZXQgdDtpZihcInJ1bkZ1bmN0aW9uSW5UYWJcImluIGU/dD1lLnJ1bkZ1bmN0aW9uSW5UYWIuZXJyb3JNZXNzYWdlOlwicnVuRnVuY3Rpb25JblBhbmVsXCJpbiBlJiYodD1lLnJ1bkZ1bmN0aW9uSW5QYW5lbC5lcnJvck1lc3NhZ2UpLHQpe2NvbnN0IG49bmV3IFRlcm1pbmFsQ29ubmVjdFJlcXVlc3RFcnJvcih0LGUpO3Rocm93IFIobiksbn19fSkodCkobixvLGkscyxhKX0sVz0oKT0+ZT0+e2NvbnN0IHQ9ZSx7bmFtZTpuLGlkOnJ9PXQsbz1yPy5CQkc/P247aWYobylyZXR1cm57bW5lbW9uaWM6XCJCSU9cIix0YXJnZXQ6MCx0YWlsOm99O3goXCJObyB2YWxpZCBpZGVudGlmaWVyIHByb3ZpZGVkIGluIGNvbnRleHQsIGlnbm9yaW5nXCIpfSxZPWU9PnQ9Pntjb25zdCBuPWIodCk7aWYobilyZXR1cm57bW5lbW9uaWM6ZSxzZWN1cml0aWVzOltuXSx0YXJnZXQ6MH07eChcIk5vIHNlY3VyaXR5IHByb3ZpZGVkIGluIGNvbnRleHQsIGlnbm9yaW5nXCIpfSxLPWFzeW5jKGUsdCxuLHIpPT57Y29uc3Qgbz0oKCk9Pntjb25zdCBlPVtdLHQ9W107cmV0dXJuIGUucHVzaChbZC5JbnN0cnVtZW50LFkoXCJERVNcIildKSxlLnB1c2goW2QuQ29udGFjdCxXKCldKSxlLnB1c2goW2QuT3JnYW5pemF0aW9uLF8oKV0pLHQucHVzaChbeS5TdGFydENoYXQsW1tkLk5vdGhpbmcsWihcIklCXCIpXSxbZC5Db250YWN0LGU9Pntjb25zdHtpZDp0LG5hbWU6bn09ZTtyZXR1cm57bW5lbW9uaWM6XCJJQlwiLHRhcmdldDowLHRhaWw6dC5lbWFpbD8/bn19XV1dKSx0LnB1c2goW3kuVmlld0FuYWx5c2lzLFtbZC5Ob3RoaW5nLFooXCJBTlJcIildLFtkLkluc3RydW1lbnQsZT0+e2NvbnN0IHQ9YihlKTtpZighdClyZXR1cm4gdm9pZCB4KFwiTm8gc2VjdXJpdHkgcHJvdmlkZWQgaW4gY29udGV4dCwgaWdub3JpbmdcIik7bGV0IG47c3dpdGNoKEUodCkpe2Nhc2VcIkVxdWl0eVwiOmNhc2VcIkluZGV4XCI6bj1cIkZBXCI7YnJlYWs7Y2FzZVwiQ29ycFwiOmNhc2VcIkdvdnRcIjpjYXNlXCJNdGdlXCI6Y2FzZVwiTXVuaVwiOmNhc2VcIlBmZFwiOm49XCJZQVNcIjticmVhaztkZWZhdWx0Om49XCJBTlJcIn1yZXR1cm57bW5lbW9uaWM6bixzZWN1cml0aWVzOlt0XSx0YXJnZXQ6MH19XV1dKSx0LnB1c2goW3kuVmlld0NoYXJ0LFtbZC5Ob3RoaW5nLFooXCJHSVBcIildLFtkLkluc3RydW1lbnQsWShcIkdJUFwiKV0sW2QuQ2hhcnQsZT0+e2NvbnN0e2ludGVydmFsOnQsaW5zdHJ1bWVudHM6bixyYW5nZTpyLHN0eWxlOm99PWUsYT17bW5lbW9uaWM6XCJHSVBcIix0YXJnZXQ6MH07bGV0IGk9ITA7Y29uc3Qgcz1iKG4/LlswXT8/ZSk7cyYmKGEuc2VjdXJpdGllcz1bc10pO2NvbnN0e2VuZFRpbWU6YyxzdGFydFRpbWU6dX09cj8/e307aWYodSl7Y29uc3QgZT1DKHUudG9TdHJpbmcoKSk7aWYoZSYmKGEudGFpbD1gJHtlLmdldE1vbnRoKCkrMX0vJHtlLmdldERhdGUoKX0vJHtlLmdldEZ1bGxZZWFyKCl9YCxpPSExLGMpKXtjb25zdCBlPUMoYy50b1N0cmluZygpKTtlJiYoYS50YWlsKz1gICR7ZS5nZXRNb250aCgpKzF9LyR7ZS5nZXREYXRlKCl9LyR7ZS5nZXRGdWxsWWVhcigpfWApfX1zd2l0Y2gobz8udG9Mb3dlckNhc2UoKSl7Y2FzZVwiYmFyXCI6YS5tbmVtb25pYz1pP1wiSUdQT1wiOlwiR1BPXCI7YnJlYWs7Y2FzZVwiY2FuZGxlXCI6YS5tbmVtb25pYz1pP1wiSUdQQ1wiOlwiR1BDXCI7YnJlYWs7ZGVmYXVsdDphLm1uZW1vbmljPWk/XCJHSVBcIjpcIkdQXCJ9aWYoIWkmJnQpc3dpdGNoKHQudG9Mb3dlckNhc2UoKSl7Y2FzZVwiZGFpbHlcIjphLnRhaWwrPVwiIERcIjticmVhaztjYXNlXCJ3ZWVrbHlcIjphLnRhaWwrPVwiIFdcIjticmVhaztjYXNlXCJtb250aGx5XCI6YS50YWlsKz1cIk1cIjticmVhaztjYXNlXCJxdWFydGVybHlcIjphLnRhaWwrPVwiIFFcIjticmVhaztjYXNlXCJ5ZWFybHlcIjphLnRhaWwrPVwiIFlcIn1yZXR1cm4gYX1dXV0pLHQucHVzaChbeS5WaWV3Q2hhdCxbW2QuTm90aGluZyxaKFwiSUJcIildLFtkLkNvbnRhY3QsZT0+e2NvbnN0e2lkOnQsbmFtZTpufT1lO3JldHVybnttbmVtb25pYzpcIklCXCIsdGFyZ2V0OjAsdGFpbDp0LmVtYWlsPz9ufX1dXV0pLHQucHVzaChbeS5WaWV3Q29udGFjdCxbW2QuTm90aGluZyxaKFwiQklPXCIpXSxbZC5Db250YWN0LFcoKV1dXSksdC5wdXNoKFt5LlZpZXdJbnN0cnVtZW50LFtbZC5Ob3RoaW5nLFooXCJERVNcIildLFtkLkluc3RydW1lbnQsWShcIkRFU1wiKV1dXSksdC5wdXNoKFt5LlZpZXdOZXdzLFtbZC5Ob3RoaW5nLFooXCJDTlwiKV0sW2QuSW5zdHJ1bWVudCxZKFwiQ05cIildXV0pLHQucHVzaChbeS5WaWV3UHJvZmlsZSxbW2QuTm90aGluZyxaKFwiREVTXCIpXSxbZC5Db250YWN0LFcoKV0sW2QuT3JnYW5pemF0aW9uLF8oKV1dXSksdC5wdXNoKFt5LlZpZXdRdW90ZSxbW2QuTm90aGluZyxaKFwiQUxMUVwiKV0sW2QuSW5zdHJ1bWVudCxZKFwiQUxMUVwiKV1dXSksdC5wdXNoKFt5LlZpZXdSZXNlYXJjaCxbW2QuTm90aGluZyxaKFwiQlJDXCIpXSxbZC5JbnN0cnVtZW50LFkoXCJCUkNcIildXV0pLHtjb250ZXh0czplLGludGVudHM6dH19KSgpLGE9KGU9Pntjb25zdCB0PShbZV0pPT4hIShlPz9cIlwiKS50cmltKCk7cmV0dXJue2NvbnRleHRzOlsuLi5lPy5jb250ZXh0cz8/W11dLmZpbHRlcih0KSxpbnRlbnRzOlsuLi5lPy5pbnRlbnRzPz9bXV0uZmlsdGVyKCgoW2Usbl0pPT57Y29uc3Qgcj1bLi4ubj8/W11dLmZpbHRlcih0KTtyZXR1cm4hIShlPz9cIlwiKS50cmltKCkmJnIubGVuZ3RoPjB9KSl9fSkodCksaT1uZXcgTWFwKG8uY29udGV4dHMpO2EuY29udGV4dHM/LmZvckVhY2goKChbZV0pPT57aS5oYXMoZSkmJmkuZGVsZXRlKGUpfSkpLG8uY29udGV4dHM9QXJyYXkuZnJvbShpKTtjb25zdCBzPW5ldyBNYXAoby5pbnRlbnRzKTthLmludGVudHM/LmZvckVhY2goKChbZV0pPT57cy5oYXMoZSkmJnMuZGVsZXRlKGUpfSkpLG8uaW50ZW50cz1BcnJheS5mcm9tKHMpO2NvbnN0IGM9Wy4uLm8uY29udGV4dHMsLi4uYS5jb250ZXh0cz8/W11dLHU9Wy4uLm8uaW50ZW50cywuLi5hLmludGVudHM/P1tdXSxsPVtdO2xldCBwO2MubGVuZ3RoJiZsLnB1c2goZmluLm1lLmludGVyb3AuYWRkQ29udGV4dEhhbmRsZXIoKChlLHQsbixyKT0+YXN5bmMgbz0+e28/ITAhPT1vLm9wZW5maW5CYmdBcGkmJihOKFwiQ29udGV4dCByZWNlaXZlZFwiLG8pLG8udHlwZSE9PWQuTm90aGluZz9hd2FpdCBYKGUsbyx0LG4scik6TihcIk51bGwgY29udGV4dCByZWNlaXZlZCwgaWdub3JpbmdcIikpOk4oXCJObyBjb250ZXh0IGluZm8gcHJvdmlkZWQsIGlnbm9yaW5nXCIpfSkoZSxjLG4scikpKSx1Lmxlbmd0aCYmdS5mb3JFYWNoKCgoW3Qsb10pPT57bC5wdXNoKGZpbi5tZS5pbnRlcm9wLnJlZ2lzdGVySW50ZW50SGFuZGxlcigoKGUsdCxuLHIpPT5hc3luYyBvPT57TihcIkludGVudCByZWNlaXZlZFwiLG8pLHQ/YXdhaXQgWChlLG8uY29udGV4dCx0LG4scik6eChgTm8gYWN0aW9ucyBoYXZlIGJlZW4gcHJvdmlkZWQgZm9yIGludGVudCAke28ubmFtZX0sIGlnbm9yaW5nYCl9KShlLG8sbixyKSx0KSl9KSk7dHJ5e3A9YXdhaXQgUHJvbWlzZS5hbGwobCl9Y2F0Y2goZSl7Y29uc3QgdD1uZXcgSW50ZXJvcEVycm9yKFwiRmFpbGVkIHRvIHJlZ2lzdGVyIGludGVyb3AgaGFuZGxlcnNcIixlKTt0aHJvdyBSKHQpLHR9cmV0dXJuIHB9LFo9ZT0+dD0+KHttbmVtb25pYzplLHRhcmdldDowfSksXz0oKT0+ZT0+e2NvbnN0e25hbWU6dH09ZTtpZih0KXJldHVybnttbmVtb25pYzpcIlNFQVJcIix0YXJnZXQ6MCx0YWlsOnR9O3goXCJObyB2YWxpZCBpZGVudGlmaWVyIHByb3ZpZGVkIGluIGNvbnRleHQsIGlnbm9yaW5nXCIpfSxYPWFzeW5jKGUsdCxuLHIsbyk9PntyPy4odCksTihcIlByb2Nlc3NpbmcgY29udGV4dFwiLHQpLG4uc29tZSgoKFtlXSk9PmU9PT10LnR5cGUpKT9hd2FpdCBQcm9taXNlLmFsbChuLmZpbHRlcigoKFtlXSk9PmU9PT10LnR5cGUpKS5tYXAoKGFzeW5jKFssbl0pPT57bGV0IHI7dHJ5e3I9YXdhaXQgbih0KX1jYXRjaChlKXtjb25zdCB0PW5ldyBBcGlFcnJvcihcIlVuZXhwZWN0ZWQgZXJyb3IgaW4gY29udGV4dCBhY3Rpb24gaGFuZGxlclwiLGUpO3JldHVybiBSKHQpLHZvaWQgbz8uKHQpfXRyeXthd2FpdCBRKHIsZSl9Y2F0Y2goZSl7Y29uc3QgdD1lIGluc3RhbmNlb2YgQXBpRXJyb3I/ZTpuZXcgQXBpRXJyb3Iodm9pZCAwLGUpO1IodCksbz8uKHQpfX0pKSk6eChgTm8gYWN0aW9uIGhhcyBiZWVuIGRlZmluZWQgZm9yIGNvbnRleHQgdHlwZSAke3QudHlwZX0sIGlnbm9yaW5nYCl9O3ZhciBlZTshZnVuY3Rpb24oZSl7ZS5CbG9vbWJlcmc9XCJCTE9PTUJFUkdcIn0oZWV8fChlZT17fSkpO2NvbnN0IHRlPWFzeW5jKGUsdCk9PntOKFwiQ3JlYXRpbmcgY29ubmVjdGlvblwiLHtjb25maWc6dH0pLHJlKGVlLkJsb29tYmVyZyk7Y29uc3Qgbj1hd2FpdCB6KHYpO2F3YWl0IG4uaW5pdFRlcm1pbmFsKGUpO2NvbnN0e2FjdGlvbnM6cixpbnRlcm9wRGlzYWJsZWQ6byxvbkNvbnRleHRDaGFuZ2VkOmEsb25FcnJvcjppfT10Pz97fSxzPXZvaWQgMD09PXQ/Lmdyb3Vwcz9cIipcIjp0Lmdyb3VwcyxjPVtdO2lmKCEwIT09byl7Yy5wdXNoKC4uLmF3YWl0IEsobi5kaXNwYXRjaCxyLGEsaSkpO2NvbnN0IGU9YXdhaXQgQihuLmRpc3BhdGNoLHMsYSxpKTtlJiZjLnB1c2goZSl9cmV0dXJue2Rpc2Nvbm5lY3Q6bmUobi5kaXNwYXRjaCxjKSxleGVjdXRlQXBpUmVxdWVzdDoodT1uLmRpc3BhdGNoLGFzeW5jKGUsdCk9PntOKFwiRXhlY3V0aW5nIEFQSSByZXF1ZXN0XCIse3F1ZXJ5OmV9KTtjb25zdCBuPXtxdWVyeTplfTtsZXQgcjt0JiYobi5zZXJ2aWNlPXQpO3RyeXtyPWF3YWl0IHUoVC5FeGVjdXRlUmVxdWVzdCxuKX1jYXRjaChlKXtjb25zdCB0PW5ldyBBZGFwdGVyRXJyb3Iodm9pZCAwLGUpO3Rocm93IFIodCksdH1pZighci5zdWNjZXNzKXtjb25zdCBlPW5ldyBUZXJtaW5hbENvbm5lY3RSZXF1ZXN0RXJyb3Ioci5lcnJvcj8ubWVzc2FnZSxyLmVycm9yKTt0aHJvdyBSKGUpLGV9aWYoIXIuZGF0YSl7Y29uc3QgZT1uZXcgVGVybWluYWxDb25uZWN0UmVxdWVzdEVycm9yKFwiVW5leHBlY3RlZCBlbXB0eSByZXNwb25zZSBkYXRhXCIscik7dGhyb3cgUihlKSxlfWNvbnN0IG89SlNPTi5wYXJzZShyLmRhdGEpO2lmKFwiZXJyb3JNZXNzYWdlXCJpbiBvKXtjb25zdCBlPW5ldyBUZXJtaW5hbENvbm5lY3RSZXF1ZXN0RXJyb3Ioby5lcnJvck1lc3NhZ2Usbyk7dGhyb3cgUihlKSxlfXJldHVybiBvfSl9O3ZhciB1fSxuZT0oZSx0PVtdKT0+YXN5bmMoKT0+e04oXCJEaXNjb25uZWN0aW5nXCIpO3RyeXthd2FpdCBQcm9taXNlLmFsbCh0Lm1hcCgoYXN5bmMgZT0+e2F3YWl0IGUudW5zdWJzY3JpYmUoKX0pKSksYXdhaXQoZT0+YXN5bmMoKT0+e2xldCB0O3RyeXt0PWF3YWl0IGUoVC5EaXNjb25uZWN0LG51bGwpfWNhdGNoKGUpe2NvbnN0IHQ9bmV3IEFkYXB0ZXJFcnJvcih2b2lkIDAsZSk7dGhyb3cgUih0KSx0fWlmKCF0LnN1Y2Nlc3Mpe2NvbnN0IGU9bmV3IFRlcm1pbmFsQ29ubmVjdGlvbkVycm9yKFwiRmFpbGVkIHRvIGRpc2Nvbm5lY3QgdGVybWluYWxcIix0LmVycm9yKTt0aHJvdyBSKGUpLGV9fSkoZSkoKX1jYXRjaChlKXtjb25zdCB0PW5ldyBBcGlFcnJvcihcIkRpc2Nvbm5lY3Rpb24gZmFpbGVkXCIsZSk7dGhyb3cgUih0KSx0fX0scmU9YXN5bmMgZT0+e3RyeXthd2FpdCBmaW4uU3lzdGVtLnJlZ2lzdGVyVXNhZ2Uoe3R5cGU6XCJpbnRlZ3JhdGlvbi1mZWF0dXJlXCIsZGF0YTp7YXBpVmVyc2lvbjpcIjIuMC4wXCIsY29tcG9uZW50TmFtZTplfX0pfWNhdGNoKHQpe3goYFVuYWJsZSB0byByZWdpc3RlciB1c2FnZSBmb3IgZmVhdHVyZSAke2V9OiAke3Q/Lm1lc3NhZ2V9YCl9fTt2YXIgb2U9dC5BZGFwdGVyRXJyb3IsYWU9dC5BcGlFcnJvcixpZT10LkluaXRpYWxpemF0aW9uRXJyb3Isc2U9dC5JbnRlcm9wRXJyb3IsY2U9dC5UZXJtaW5hbENvbm5lY3RSZXF1ZXN0RXJyb3IsdWU9dC5UZXJtaW5hbENvbm5lY3Rpb25FcnJvcixsZT10LmNvbm5lY3QscGU9dC5kaXNhYmxlTG9nZ2luZyxkZT10LmVuYWJsZUxvZ2dpbmcsZ2U9dC5nZXRTZWN1cml0eUZyb21JbnN0cnVtZW50Q29udGV4dDtleHBvcnR7b2UgYXMgQWRhcHRlckVycm9yLGFlIGFzIEFwaUVycm9yLGllIGFzIEluaXRpYWxpemF0aW9uRXJyb3Isc2UgYXMgSW50ZXJvcEVycm9yLGNlIGFzIFRlcm1pbmFsQ29ubmVjdFJlcXVlc3RFcnJvcix1ZSBhcyBUZXJtaW5hbENvbm5lY3Rpb25FcnJvcixsZSBhcyBjb25uZWN0LHBlIGFzIGRpc2FibGVMb2dnaW5nLGRlIGFzIGVuYWJsZUxvZ2dpbmcsZ2UgYXMgZ2V0U2VjdXJpdHlGcm9tSW5zdHJ1bWVudENvbnRleHR9OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0ICogYXMgZmRjMyBmcm9tIFwiQGZpbm9zL2ZkYzNcIjtcbmltcG9ydCB7XG5cdGNvbm5lY3QsXG5cdGdldFNlY3VyaXR5RnJvbUluc3RydW1lbnRDb250ZXh0LFxuXHR0eXBlIEJsb29tYmVyZ0dyb3VwVXBkYXRlLFxuXHRlbmFibGVMb2dnaW5nLFxuXHR0eXBlIEJsb29tYmVyZ0Nvbm5lY3Rpb25Db25maWcsXG5cdHR5cGUgQmxvb21iZXJnQ29ubmVjdGlvblxufSBmcm9tIFwiQG9wZW5maW4vYmxvb21iZXJnXCI7XG5pbXBvcnQgdHlwZSBPcGVuRmluIGZyb20gXCJAb3BlbmZpbi9jb3JlXCI7XG5cbmxldCBiYmdDb25uZWN0aW9uOiBCbG9vbWJlcmdDb25uZWN0aW9uIHwgdW5kZWZpbmVkO1xuXG5sZXQgc2VsZWN0ZWRJbnRlbnRUeXBlOiBzdHJpbmcgPSBcIlwiO1xubGV0IHNlbGVjdGVkSW50ZW50VmFsdWU6IHN0cmluZyA9IFwiXCI7XG5sZXQgZmRjM0Rlbm9taW5hdGlvbjogc3RyaW5nID0gXCJcIjtcbmxldCBiYmdNbmVtb25pYzogc3RyaW5nID0gXCJcIjtcblxubGV0IGJ0bkNvbm5lY3Q6IEhUTUxCdXR0b25FbGVtZW50IHwgbnVsbDtcbmxldCBidG5EaXNjb25uZWN0OiBIVE1MQnV0dG9uRWxlbWVudCB8IG51bGw7XG5sZXQgYnRuQ2xlYXJMb2dzOiBIVE1MQnV0dG9uRWxlbWVudCB8IG51bGw7XG5sZXQgYnRuUXVlcnk6IEhUTUxCdXR0b25FbGVtZW50IHwgbnVsbDtcbmxldCBpbnRlbnRUeXBlRWxlbWVudDogSFRNTFNlbGVjdEVsZW1lbnQgfCBudWxsO1xubGV0IGludGVudFZhbHVlRWxlbWVudDogSFRNTFNlbGVjdEVsZW1lbnQgfCBudWxsO1xubGV0IGxvZ091dHB1dDogSFRNTFByZUVsZW1lbnQgfCBudWxsO1xuXG5jb25zdCBBUElfS0VZID0gXCJcIjtcblxuY29uc3QgY29uZmlnOiBCbG9vbWJlcmdDb25uZWN0aW9uQ29uZmlnID0ge1xuXHRvbkNvbnRleHRDaGFuZ2VkOiAoY29udGV4dCkgPT4ge1xuXHRcdGxvZ0luZm9ybWF0aW9uKGBSZWNlaXZlZCBjb250ZXh0OiAke0pTT04uc3RyaW5naWZ5KGNvbnRleHQpfWApO1xuXHR9LFxuXHRvbkVycm9yOiAoZXJyb3IpID0+IGxvZ0luZm9ybWF0aW9uKGVycm9yLm1lc3NhZ2UpLFxuXHRncm91cHM6IFtcIkdyb3VwLUFcIl0sXG5cdGludGVyb3BEaXNhYmxlZDogZmFsc2UsXG5cdGFjdGlvbnM6IHtcblx0XHRjb250ZXh0czogW1xuXHRcdFx0W1xuXHRcdFx0XHRmZGMzLkNvbnRleHRUeXBlcy5JbnN0cnVtZW50LFxuXHRcdFx0XHQoY29udGV4dCk6IEJsb29tYmVyZ0dyb3VwVXBkYXRlIHwgdW5kZWZpbmVkID0+IHtcblx0XHRcdFx0XHQvLyBVc2UgdGhlIGdldFNlY3VyaXR5RnJvbUluc3RydW1lbnRDb250ZXh0IHV0aWxpdHkgZnVuY3Rpb24gdG8gZXh0cmFjdCB0aGUgc2VjdXJpdHkgc3RyaW5nIGZyb20gdGhlIGNvbnRleHRcblx0XHRcdFx0XHRjb25zdCBzZWN1cml0eSA9IGdldFNlY3VyaXR5RnJvbUluc3RydW1lbnRDb250ZXh0KGNvbnRleHQpO1xuXHRcdFx0XHRcdGlmICghc2VjdXJpdHkpIHtcblx0XHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0bG9nSW5mb3JtYXRpb24oYFJlY2VpdmVkIEluc3RydW1lbnQgQ29udGV4dDogJHtzZWN1cml0eX1gKTtcblxuXHRcdFx0XHRcdC8vIFJldHVybiBhIEJsb29tYmVyZ0dyb3VwVXBkYXRlIG9iamVjdCB0aGF0IHVwZGF0ZXMgTGF1bmNocGFkIGdyb3VwIEEgd2l0aCB0aGUgc2VjdXJpdHlcblx0XHRcdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRcdFx0Z3JvdXA6IFwiR3JvdXAtQVwiLFxuXHRcdFx0XHRcdFx0c2VjdXJpdHlcblx0XHRcdFx0XHR9IGFzIEJsb29tYmVyZ0dyb3VwVXBkYXRlO1xuXHRcdFx0XHR9XG5cdFx0XHRdXG5cdFx0XVxuXHR9XG59O1xuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgYXN5bmMgKCkgPT4ge1xuXHQvLyBFbmFibGUgbG9nZ2luZyBpbiB0aGUgQkJHIHBhY2thZ2Vcblx0ZW5hYmxlTG9nZ2luZygpO1xuXG5cdC8vIEluaXRpYWxpemUgdGhlIERPTSBlbGVtZW50cy5cblx0aW5pdGlhbGl6ZURPTSgpO1xufSk7XG5cbi8qKlxuICogSW5pdGlhbGl6ZSB0aGUgRE9NLlxuICovXG5mdW5jdGlvbiBpbml0aWFsaXplRE9NKCk6IHZvaWQge1xuXHRidG5Db25uZWN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcjxIVE1MQnV0dG9uRWxlbWVudD4oXCIjYnRuQ29ubmVjdFwiKTtcblx0YnRuRGlzY29ubmVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTEJ1dHRvbkVsZW1lbnQ+KFwiI2J0bkRpc2Nvbm5lY3RcIik7XG5cdGJ0bkNsZWFyTG9ncyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTEJ1dHRvbkVsZW1lbnQ+KFwiI2J0bkNsZWFyXCIpO1xuXHRidG5RdWVyeSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTEJ1dHRvbkVsZW1lbnQ+KFwiI2J0blF1ZXJ5XCIpO1xuXHRpbnRlbnRUeXBlRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTFNlbGVjdEVsZW1lbnQ+KFwiI2ludGVudFR5cGVcIik7XG5cdGludGVudFZhbHVlRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTFNlbGVjdEVsZW1lbnQ+KFwiI2ludGVudFZhbHVlXCIpO1xuXHRsb2dPdXRwdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yPEhUTUxQcmVFbGVtZW50PihcIiNsb2dPdXRwdXRcIik7XG5cblx0aWYgKGJ0bkNvbm5lY3QpIHtcblx0XHRidG5Db25uZWN0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBhc3luYyAoKSA9PiB7XG5cdFx0XHRpZiAoYnRuQ29ubmVjdCkge1xuXHRcdFx0XHRidG5Db25uZWN0LmRpc2FibGVkID0gdHJ1ZTtcblx0XHRcdH1cblx0XHRcdGF3YWl0IGNvbm5lY3RUb0JCR1Rlcm1pbmFsKCk7XG5cdFx0XHR1cGRhdGVTdGF0ZSgpO1xuXHRcdH0pO1xuXHR9XG5cdGlmIChidG5EaXNjb25uZWN0KSB7XG5cdFx0YnRuRGlzY29ubmVjdC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgYXN5bmMgKCkgPT4ge1xuXHRcdFx0aWYgKGJ0bkRpc2Nvbm5lY3QpIHtcblx0XHRcdFx0YnRuRGlzY29ubmVjdC5kaXNhYmxlZCA9IHRydWU7XG5cdFx0XHR9XG5cdFx0XHRhd2FpdCBkaXNjb25uZWN0RnJvbUJCR1Rlcm1pbmFsKCk7XG5cdFx0XHR1cGRhdGVTdGF0ZSgpO1xuXHRcdH0pO1xuXHR9XG5cdGlmIChidG5DbGVhckxvZ3MpIHtcblx0XHRidG5DbGVhckxvZ3MuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGNsZWFyTG9ncyk7XG5cdH1cblx0aWYgKGJ0blF1ZXJ5KSB7XG5cdFx0YnRuUXVlcnkuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZpcmVJbnRlbnRGb3JCQkcpO1xuXHR9XG5cblx0aWYgKGludGVudFR5cGVFbGVtZW50KSB7XG5cdFx0aW50ZW50VHlwZUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCAoZXZlbnQpID0+IHtcblx0XHRcdGlmIChpbnRlbnRUeXBlRWxlbWVudD8udmFsdWUpIHtcblx0XHRcdFx0aWYgKGJ0blF1ZXJ5KSB7XG5cdFx0XHRcdFx0YnRuUXVlcnkuZGlzYWJsZWQgPSB0cnVlO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHN3aXRjaCAoaW50ZW50VHlwZUVsZW1lbnQ/LnZhbHVlKSB7XG5cdFx0XHRcdFx0Y2FzZSBcIlZpZXdDaGFydFwiOlxuXHRcdFx0XHRcdFx0bG9nSW5mb3JtYXRpb24oXG5cdFx0XHRcdFx0XHRcdFwiSW50ZW50IHRvIGJlIGZpcmVkIGlzIFZpZXdDaGFydC4gQ29udGVudCBUeXBlIGlzIGZkYzMuaW5zdHJ1bWVudC4gQmxvb21iZXJnIFRlcm1pbmFsIE1uZW1vbmljOiBHUFwiXG5cdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdFx0c2VsZWN0ZWRJbnRlbnRUeXBlID0gXCJWaWV3Q2hhcnRcIjtcblx0XHRcdFx0XHRcdGZkYzNEZW5vbWluYXRpb24gPSBcImZkYzMuaW5zdHJ1bWVudFwiO1xuXHRcdFx0XHRcdFx0YmJnTW5lbW9uaWMgPSBcIkdQXCI7XG5cdFx0XHRcdFx0XHRwb3B1bGF0ZVNlbGVjdChpbnRlbnRWYWx1ZUVsZW1lbnQsIFtcblx0XHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRcdHZhbHVlOiBcIk9SQ0xcIixcblx0XHRcdFx0XHRcdFx0XHRsYWJlbDogXCJPcmFjbGUgQ29ycFwiXG5cdFx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0XHR2YWx1ZTogXCJNU0ZUXCIsXG5cdFx0XHRcdFx0XHRcdFx0bGFiZWw6IFwiTWljcm9zb2Z0XCJcblx0XHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRcdHZhbHVlOiBcIklCTVwiLFxuXHRcdFx0XHRcdFx0XHRcdGxhYmVsOiBcIklCTVwiXG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdF0pO1xuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0Y2FzZSBcIlZpZXdDb250YWN0XCI6XG5cdFx0XHRcdFx0XHRsb2dJbmZvcm1hdGlvbihcblx0XHRcdFx0XHRcdFx0XCJJbnRlbnQgdG8gYmUgZmlyZWQgaXMgVmlld0NvbnRhY3QuIENvbnRlbnQgVHlwZSBpcyBmZGMzLmNvbnRhY3QuIEJsb29tYmVyZyBUZXJtaW5hbCBNbmVtb25pYzogQklPXCJcblx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0XHRzZWxlY3RlZEludGVudFR5cGUgPSBcIlZpZXdDb250YWN0XCI7XG5cdFx0XHRcdFx0XHRmZGMzRGVub21pbmF0aW9uID0gXCJmZGMzLmNvbnRhY3RcIjtcblx0XHRcdFx0XHRcdGJiZ01uZW1vbmljID0gXCJCSU9cIjtcblx0XHRcdFx0XHRcdHBvcHVsYXRlU2VsZWN0KGludGVudFZhbHVlRWxlbWVudCwgW1xuXHRcdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdFx0dmFsdWU6IFwiV2lsbGlhbSBIZW5yeSBHYXRlc1wiLFxuXHRcdFx0XHRcdFx0XHRcdGxhYmVsOiBcIldpbGxpYW0gSGVucnkgR2F0ZXNcIlxuXHRcdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdFx0dmFsdWU6IFwiTGFycnkgRWxsaXNvblwiLFxuXHRcdFx0XHRcdFx0XHRcdGxhYmVsOiBcIkxhcnJ5IEVsbGlzb25cIlxuXHRcdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdFx0dmFsdWU6IFwiUm9iZXJ0IElnZXJcIixcblx0XHRcdFx0XHRcdFx0XHRsYWJlbDogXCJSb2JlcnQgSWdlclwiXG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdF0pO1xuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0Y2FzZSBcIlZpZXdJbnN0cnVtZW50XCI6XG5cdFx0XHRcdFx0XHRsb2dJbmZvcm1hdGlvbihcblx0XHRcdFx0XHRcdFx0XCJJbnRlbnQgdG8gYmUgZmlyZWQgaXMgVmlld0luc3RydW1lbnQuIENvbnRlbnQgVHlwZSBpcyBmZGMzLmluc3RydW1lbnQuIEJsb29tYmVyZyBUZXJtaW5hbCBNbmVtb25pYzogREVTXCJcblx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0XHRzZWxlY3RlZEludGVudFR5cGUgPSBcIlZpZXdJbnN0cnVtZW50XCI7XG5cdFx0XHRcdFx0XHRmZGMzRGVub21pbmF0aW9uID0gXCJmZGMzLmluc3RydW1lbnRcIjtcblx0XHRcdFx0XHRcdGJiZ01uZW1vbmljID0gXCJERVNcIjtcblx0XHRcdFx0XHRcdHBvcHVsYXRlU2VsZWN0KGludGVudFZhbHVlRWxlbWVudCwgW1xuXHRcdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdFx0dmFsdWU6IFwiT1JDTFwiLFxuXHRcdFx0XHRcdFx0XHRcdGxhYmVsOiBcIk9yYWNsZSBDb3JwXCJcblx0XHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRcdHZhbHVlOiBcIk1TRlRcIixcblx0XHRcdFx0XHRcdFx0XHRsYWJlbDogXCJNaWNyb3NvZnRcIlxuXHRcdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdFx0dmFsdWU6IFwiSUJNXCIsXG5cdFx0XHRcdFx0XHRcdFx0bGFiZWw6IFwiSUJNXCJcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XSk7XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRjYXNlIFwiVmlld1F1b3RlXCI6XG5cdFx0XHRcdFx0XHRsb2dJbmZvcm1hdGlvbihcblx0XHRcdFx0XHRcdFx0XCJJbnRlbnQgdG8gYmUgZmlyZWQgaXMgVmlld1F1b3RlLiBDb250ZW50IFR5cGUgaXMgZmRjMy5pbnN0cnVtZW50LiBCbG9vbWJlcmcgVGVybWluYWwgTW5lbW9uaWM6IFFcIlxuXHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRcdHNlbGVjdGVkSW50ZW50VHlwZSA9IFwiVmlld1F1b3RlXCI7XG5cdFx0XHRcdFx0XHRmZGMzRGVub21pbmF0aW9uID0gXCJmZGMzLmluc3RydW1lbnRcIjtcblx0XHRcdFx0XHRcdGJiZ01uZW1vbmljID0gXCJRXCI7XG5cdFx0XHRcdFx0XHRwb3B1bGF0ZVNlbGVjdChpbnRlbnRWYWx1ZUVsZW1lbnQsIFtcblx0XHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRcdHZhbHVlOiBcIk9SQ0xcIixcblx0XHRcdFx0XHRcdFx0XHRsYWJlbDogXCJPcmFjbGUgQ29ycFwiXG5cdFx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0XHR2YWx1ZTogXCJNU0ZUXCIsXG5cdFx0XHRcdFx0XHRcdFx0bGFiZWw6IFwiTWljcm9zb2Z0XCJcblx0XHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRcdHZhbHVlOiBcIklCTVwiLFxuXHRcdFx0XHRcdFx0XHRcdGxhYmVsOiBcIklCTVwiXG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdF0pO1xuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH1cblx0XHRcdFx0dXBkYXRlU3RhdGUoKTtcblx0XHRcdH1cblx0XHR9KTtcblx0fVxuXG5cdGlmIChpbnRlbnRWYWx1ZUVsZW1lbnQpIHtcblx0XHRpbnRlbnRWYWx1ZUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCAoKSA9PiB7XG5cdFx0XHRpZiAoaW50ZW50VmFsdWVFbGVtZW50KSB7XG5cdFx0XHRcdHNlbGVjdGVkSW50ZW50VmFsdWUgPSBpbnRlbnRWYWx1ZUVsZW1lbnQudmFsdWU7XG5cdFx0XHRcdGlmIChzZWxlY3RlZEludGVudFZhbHVlLmxlbmd0aCA+IDApIHtcblx0XHRcdFx0XHRsb2dJbmZvcm1hdGlvbihcblx0XHRcdFx0XHRcdGBhY3Rpb246ICR7c2VsZWN0ZWRJbnRlbnRUeXBlfSwgdHlwZTogJHtmZGMzRGVub21pbmF0aW9ufSwgYmJnIG1uZW1vbmljOiAke2JiZ01uZW1vbmljfSwgc2VhcmNoIHZhbHVlOiAke3NlbGVjdGVkSW50ZW50VmFsdWV9YFxuXHRcdFx0XHRcdCk7XG5cdFx0XHRcdH1cblx0XHRcdFx0dXBkYXRlU3RhdGUoKTtcblx0XHRcdH1cblx0XHR9KTtcblx0fVxuXG5cdHVwZGF0ZVN0YXRlKCk7XG59XG5cbi8qKlxuICogQ29ubmVjdCB0byBCbG9vbWJlcmcgVGVybWluYWwuXG4gKi9cbmFzeW5jIGZ1bmN0aW9uIGNvbm5lY3RUb0JCR1Rlcm1pbmFsKCk6IFByb21pc2U8dm9pZD4ge1xuXHR0cnkge1xuXHRcdGxvZ0luZm9ybWF0aW9uKFwiQ2hlY2tpbmcgQmxvb21iZXJnIFRlcm1pbmFsIFN0YXR1c1wiKTtcblxuXHRcdGJiZ0Nvbm5lY3Rpb24gPSBhd2FpdCBjb25uZWN0KEFQSV9LRVksIGNvbmZpZyk7XG5cdFx0bG9nSW5mb3JtYXRpb24oXCJDb25uZWN0aW9uIHN1Y2Nlc3NmdWxcIik7XG5cdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0YmJnQ29ubmVjdGlvbiA9IHVuZGVmaW5lZDtcblx0XHRjb25zb2xlLmxvZyhlcnJvcik7XG5cdFx0bG9nSW5mb3JtYXRpb24oZXJyb3JUb1N0cmluZyhlcnJvcikpO1xuXHR9XG59XG5cbi8qKlxuICogRGlzY29ubmVjdCBmcm9tIEJsb29tYmVyZyBUZXJtaW5hbC5cbiAqL1xuYXN5bmMgZnVuY3Rpb24gZGlzY29ubmVjdEZyb21CQkdUZXJtaW5hbCgpOiBQcm9taXNlPHZvaWQ+IHtcblx0aWYgKGJiZ0Nvbm5lY3Rpb24pIHtcblx0XHR0cnkge1xuXHRcdFx0bG9nSW5mb3JtYXRpb24oXCJEaXNjb25uZWN0aW5nIGZyb20gQmxvb21iZXJnIFRlcm1pbmFsXCIpO1xuXHRcdFx0YXdhaXQgYmJnQ29ubmVjdGlvbi5kaXNjb25uZWN0KCk7XG5cdFx0fSBmaW5hbGx5IHtcblx0XHRcdGJiZ0Nvbm5lY3Rpb24gPSB1bmRlZmluZWQ7XG5cdFx0XHRsb2dJbmZvcm1hdGlvbihcIkRpc2Nvbm5lY3RlZCBmcm9tIEJsb29tYmVyZyBUZXJtaW5hbFwiKTtcblx0XHR9XG5cdH1cbn1cblxuLyoqXG4gKiBGaXJlIGFuIGludGVudC5cbiAqL1xuYXN5bmMgZnVuY3Rpb24gZmlyZUludGVudEZvckJCRygpOiBQcm9taXNlPHZvaWQ+IHtcblx0aWYgKGJiZ0Nvbm5lY3Rpb24pIHtcblx0XHR0cnkge1xuXHRcdFx0bG9nSW5mb3JtYXRpb24oXG5cdFx0XHRcdGBhY3Rpb246ICR7c2VsZWN0ZWRJbnRlbnRUeXBlfSwgdHlwZTogJHtmZGMzRGVub21pbmF0aW9ufSwgYmJnIG1uZW1vbmljOiAke2JiZ01uZW1vbmljfSwgc2VhcmNoIHZhbHVlOiAke3NlbGVjdGVkSW50ZW50VmFsdWV9YFxuXHRcdFx0KTtcblxuXHRcdFx0bGV0IGludGVudDogT3BlbkZpbi5JbnRlbnQ7XG5cblx0XHRcdHN3aXRjaCAoc2VsZWN0ZWRJbnRlbnRUeXBlKSB7XG5cdFx0XHRcdGNhc2UgXCJWaWV3Q29udGFjdFwiOlxuXHRcdFx0XHRcdGludGVudCA9IHtcblx0XHRcdFx0XHRcdG5hbWU6IHNlbGVjdGVkSW50ZW50VHlwZSxcblx0XHRcdFx0XHRcdGNvbnRleHQ6IHtcblx0XHRcdFx0XHRcdFx0dHlwZTogZmRjM0Rlbm9taW5hdGlvbixcblx0XHRcdFx0XHRcdFx0bmFtZTogc2VsZWN0ZWRJbnRlbnRWYWx1ZSxcblx0XHRcdFx0XHRcdFx0aWQ6IHt9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0XHRpbnRlbnQgPSB7XG5cdFx0XHRcdFx0XHRuYW1lOiBzZWxlY3RlZEludGVudFR5cGUsXG5cdFx0XHRcdFx0XHRjb250ZXh0OiB7XG5cdFx0XHRcdFx0XHRcdHR5cGU6IGZkYzNEZW5vbWluYXRpb24sXG5cdFx0XHRcdFx0XHRcdGlkOiB7XG5cdFx0XHRcdFx0XHRcdFx0dGlja2VyOiBzZWxlY3RlZEludGVudFZhbHVlXG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXG5cdFx0XHRhd2FpdCBmaW4ubWUuaW50ZXJvcC5maXJlSW50ZW50KGludGVudCk7XG5cdFx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRcdGxvZ0luZm9ybWF0aW9uKGBFcnJvciB3aGlsZSB0cnlpbmcgdG8gcmFpc2UgaW50ZW50OiAke2Vycm9yVG9TdHJpbmcoZXJyb3IpfWApO1xuXHRcdH1cblx0fSBlbHNlIHtcblx0XHRsb2dJbmZvcm1hdGlvbihcIk5vdCBjb25uZWN0ZWQgdG8gdGhlIEJsb29tYmVyZyBUZXJtaW5hbC4gUGxlYXNlIGNoZWNrIHlvdXIgc3RhdHVzIG9yIGxvZyBpbiBhZ2Fpbi5cIik7XG5cdH1cbn1cblxuLyoqXG4gKiBVcGRhdGUgdGhlIHN0YXRlIG9mIHRoZSBET00uXG4gKi9cbmZ1bmN0aW9uIHVwZGF0ZVN0YXRlKCk6IHZvaWQge1xuXHRjb25zdCBpc0Nvbm5lY3RlZCA9IGJiZ0Nvbm5lY3Rpb24gIT09IHVuZGVmaW5lZDtcblx0aWYgKGJ0bkNvbm5lY3QpIHtcblx0XHRidG5Db25uZWN0LmRpc2FibGVkID0gaXNDb25uZWN0ZWQ7XG5cdH1cblx0aWYgKGJ0bkRpc2Nvbm5lY3QpIHtcblx0XHRidG5EaXNjb25uZWN0LmRpc2FibGVkID0gIWlzQ29ubmVjdGVkO1xuXHR9XG5cdGlmIChpbnRlbnRUeXBlRWxlbWVudCkge1xuXHRcdGludGVudFR5cGVFbGVtZW50LmRpc2FibGVkID0gIWlzQ29ubmVjdGVkO1xuXHR9XG5cdGlmIChpbnRlbnRWYWx1ZUVsZW1lbnQpIHtcblx0XHRpbnRlbnRWYWx1ZUVsZW1lbnQuZGlzYWJsZWQgPSAhaXNDb25uZWN0ZWQgfHwgc2VsZWN0ZWRJbnRlbnRUeXBlLmxlbmd0aCA9PT0gMDtcblx0fVxuXHRpZiAoYnRuUXVlcnkpIHtcblx0XHRidG5RdWVyeS5kaXNhYmxlZCA9ICFpc0Nvbm5lY3RlZCB8fCBzZWxlY3RlZEludGVudFZhbHVlLmxlbmd0aCA9PT0gMDtcblx0fVxufVxuXG4vKipcbiAqIExvZyBpbmZvcm1hdGlvbiB0byB0aGUgb3V0cHV0IGVsZW1lbnQuXG4gKiBAcGFyYW0gaW5mbyBUaGUgaW5mb3JtYXRpb24gdG8gbG9nLlxuICovXG5mdW5jdGlvbiBsb2dJbmZvcm1hdGlvbihpbmZvOiBzdHJpbmcpOiB2b2lkIHtcblx0aWYgKGxvZ091dHB1dCkge1xuXHRcdGxvZ091dHB1dC50ZXh0Q29udGVudCA9IGAke2xvZ091dHB1dC50ZXh0Q29udGVudH0ke2luZm99XFxuXFxuYDtcblx0XHRsb2dPdXRwdXQuc2Nyb2xsVG9wID0gbG9nT3V0cHV0LnNjcm9sbEhlaWdodDtcblx0fVxufVxuXG4vKipcbiAqIENvbnZlcnQgYW5kIGVycm9yIHRvIGEgc3RyaW5nLlxuICogQHBhcmFtIGVyciBUaGUgZXJyb3IgdG8gY29udmVydC5cbiAqIEByZXR1cm5zIFRoZSBlcnJvciBhcyBhIHN0cmluZy5cbiAqL1xuZnVuY3Rpb24gZXJyb3JUb1N0cmluZyhlcnI6IHVua25vd24pOiBzdHJpbmcge1xuXHRpZiAoZXJyIGluc3RhbmNlb2YgRXJyb3IpIHtcblx0XHRyZXR1cm4gZXJyLm1lc3NhZ2U7XG5cdH0gZWxzZSBpZiAodHlwZW9mIGVyciA9PT0gXCJzdHJpbmdcIikge1xuXHRcdHJldHVybiBlcnI7XG5cdH1cblxuXHRyZXR1cm4gSlNPTi5zdHJpbmdpZnkoZXJyKTtcbn1cblxuLyoqXG4gKiBDbGVhciB0aGUgbG9ncy5cbiAqL1xuZnVuY3Rpb24gY2xlYXJMb2dzKCk6IHZvaWQge1xuXHRpZiAobG9nT3V0cHV0KSB7XG5cdFx0bG9nT3V0cHV0LnRleHRDb250ZW50ID0gXCJcIjtcblx0XHRsb2dPdXRwdXQuc2Nyb2xsVG9wID0gMDtcblx0fVxufVxuXG4vKipcbiAqIFBvcHVsYXRlIGEgc2VsZWN0IGNvbnRyb2wgd2l0aCBhIGxpc3Qgb2YgaXRlbXMuXG4gKiBAcGFyYW0gc2VsZWN0IFRoZSBzZWxlY3QgZWxlbWVudCB0byBwb3B1bGF0ZS5cbiAqIEBwYXJhbSB2YWx1ZXMgVGhlIHZhbHVlcyB0byBwb3B1bGF0ZSB0aGUgZWxlbWVudCB3aXRoLlxuICovXG5mdW5jdGlvbiBwb3B1bGF0ZVNlbGVjdChzZWxlY3Q6IEhUTUxTZWxlY3RFbGVtZW50IHwgbnVsbCwgdmFsdWVzOiB7IHZhbHVlOiBzdHJpbmc7IGxhYmVsOiBzdHJpbmcgfVtdKTogdm9pZCB7XG5cdGlmIChzZWxlY3QpIHtcblx0XHRzZWxlY3QuaW5uZXJIVE1MID0gXCJcIjtcblx0XHRjb25zdCBvcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwib3B0aW9uXCIpO1xuXHRcdG9wdC52YWx1ZSA9IFwiXCI7XG5cdFx0b3B0LnRleHQgPSBcIlBsZWFzZSBzZWxlY3QgdmFsdWVcIjtcblx0XHRvcHQuZGlzYWJsZWQgPSB0cnVlO1xuXHRcdG9wdC5zZWxlY3RlZCA9IHRydWU7XG5cdFx0c2VsZWN0LmFwcGVuZChvcHQpO1xuXG5cdFx0Zm9yIChjb25zdCB2YWwgb2YgdmFsdWVzKSB7XG5cdFx0XHRjb25zdCBvcHRWYWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwib3B0aW9uXCIpO1xuXHRcdFx0b3B0VmFsLnZhbHVlID0gdmFsLnZhbHVlO1xuXHRcdFx0b3B0VmFsLnRleHQgPSB2YWwubGFiZWw7XG5cdFx0XHRzZWxlY3QuYXBwZW5kKG9wdFZhbCk7XG5cdFx0fVxuXHR9XG59XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=