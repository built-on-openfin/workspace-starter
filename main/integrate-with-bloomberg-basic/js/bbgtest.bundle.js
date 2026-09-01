/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "../../node_modules/@finos/fdc3/dist/fdc3.esm.js"
/*!*******************************************************!*\
  !*** ../../node_modules/@finos/fdc3/dist/fdc3.esm.js ***!
  \*******************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ChannelError: () => (/* binding */ ChannelError),
/* harmony export */   ContextTypes: () => (/* binding */ ContextTypes),
/* harmony export */   Convert: () => (/* binding */ Convert),
/* harmony export */   Intents: () => (/* binding */ Intents),
/* harmony export */   OpenError: () => (/* binding */ OpenError),
/* harmony export */   ResolveError: () => (/* binding */ ResolveError),
/* harmony export */   ResultError: () => (/* binding */ ResultError),
/* harmony export */   Style: () => (/* binding */ Style),
/* harmony export */   addContextListener: () => (/* binding */ addContextListener),
/* harmony export */   addIntentListener: () => (/* binding */ addIntentListener),
/* harmony export */   broadcast: () => (/* binding */ broadcast),
/* harmony export */   compareVersionNumbers: () => (/* binding */ compareVersionNumbers),
/* harmony export */   createPrivateChannel: () => (/* binding */ createPrivateChannel),
/* harmony export */   fdc3Ready: () => (/* binding */ fdc3Ready),
/* harmony export */   findInstances: () => (/* binding */ findInstances),
/* harmony export */   findIntent: () => (/* binding */ findIntent),
/* harmony export */   findIntentsByContext: () => (/* binding */ findIntentsByContext),
/* harmony export */   getAppMetadata: () => (/* binding */ getAppMetadata),
/* harmony export */   getCurrentChannel: () => (/* binding */ getCurrentChannel),
/* harmony export */   getInfo: () => (/* binding */ getInfo),
/* harmony export */   getOrCreateChannel: () => (/* binding */ getOrCreateChannel),
/* harmony export */   getSystemChannels: () => (/* binding */ getSystemChannels),
/* harmony export */   getUserChannels: () => (/* binding */ getUserChannels),
/* harmony export */   joinChannel: () => (/* binding */ joinChannel),
/* harmony export */   joinUserChannel: () => (/* binding */ joinUserChannel),
/* harmony export */   leaveCurrentChannel: () => (/* binding */ leaveCurrentChannel),
/* harmony export */   open: () => (/* binding */ open),
/* harmony export */   raiseIntent: () => (/* binding */ raiseIntent),
/* harmony export */   raiseIntentForContext: () => (/* binding */ raiseIntentForContext),
/* harmony export */   versionIsAtLeast: () => (/* binding */ versionIsAtLeast)
/* harmony export */ });
/**
 * SPDX-License-Identifier: Apache-2.0
 * Copyright FINOS FDC3 contributors - see NOTICE file
 */
/** Constants representing the errors that can be encountered when calling the `open` method on the DesktopAgent object (`fdc3`). */
var OpenError;
(function (OpenError) {
  /** Returned if the specified application is not found.*/
  OpenError["AppNotFound"] = "AppNotFound";
  /** Returned if the specified application fails to launch correctly.*/
  OpenError["ErrorOnLaunch"] = "ErrorOnLaunch";
  /** Returned if the specified application launches but fails to add a context listener in order to receive the context passed to the `fdc3.open` call.*/
  OpenError["AppTimeout"] = "AppTimeout";
  /** Returned if the FDC3 desktop agent implementation is not currently able to handle the request.*/
  OpenError["ResolverUnavailable"] = "ResolverUnavailable";
  /** Returned if a call to the `open` function is made with an invalid context argument. Contexts should be Objects with at least a `type` field that has a `string` value.*/
  OpenError["MalformedContext"] = "MalformedContext";
})(OpenError || (OpenError = {}));
/** Constants representing the errors that can be encountered when calling the `findIntent`, `findIntentsByContext`, `raiseIntent` or `raiseIntentForContext` methods on the DesktopAgent (`fdc3`). */
var ResolveError;
(function (ResolveError) {
  /** SHOULD be returned if no apps are available that can resolve the intent and context combination.*/
  ResolveError["NoAppsFound"] = "NoAppsFound";
  /** Returned if the FDC3 desktop agent implementation is not currently able to handle the request.*/
  ResolveError["ResolverUnavailable"] = "ResolverUnavailable";
  /** Returned if the user cancelled the resolution request, for example by closing or cancelling a resolver UI.*/
  ResolveError["UserCancelled"] = "UserCancelledResolution";
  /** SHOULD be returned if a timeout cancels an intent resolution that required user interaction. Please use `ResolverUnavailable` instead for situations where a resolver UI or similar fails.*/
  ResolveError["ResolverTimeout"] = "ResolverTimeout";
  /** Returned if a specified target application is not available or a new instance of it cannot be opened. */
  ResolveError["TargetAppUnavailable"] = "TargetAppUnavailable";
  /** Returned if a specified target application instance is not available, for example because it has been closed. */
  ResolveError["TargetInstanceUnavailable"] = "TargetInstanceUnavailable";
  /** Returned if the intent and context could not be delivered to the selected application or instance, for example because it has not added an intent handler within a timeout.*/
  ResolveError["IntentDeliveryFailed"] = "IntentDeliveryFailed";
  /** Returned if a call to one of the `raiseIntent` functions is made with an invalid context argument. Contexts should be Objects with at least a `type` field that has a `string` value.*/
  ResolveError["MalformedContext"] = "MalformedContext";
})(ResolveError || (ResolveError = {}));
var ResultError;
(function (ResultError) {
  /** Returned if the intent handler exited without returning a valid result (a promise resolving to a Context, Channel object or void). */
  ResultError["NoResultReturned"] = "NoResultReturned";
  /** Returned if the Intent handler function processing the raised intent throws an error or rejects the Promise it returned. */
  ResultError["IntentHandlerRejected"] = "IntentHandlerRejected";
})(ResultError || (ResultError = {}));
var ChannelError;
(function (ChannelError) {
  /** Returned if the specified channel is not found when attempting to join a channel via the `joinUserChannel` function  of the DesktopAgent (`fdc3`).*/
  ChannelError["NoChannelFound"] = "NoChannelFound";
  /** SHOULD be returned when a request to join a user channel or to a retrieve a Channel object via the `joinUserChannel` or `getOrCreateChannel` methods of the DesktopAgent (`fdc3`) object is denied. */
  ChannelError["AccessDenied"] = "AccessDenied";
  /** SHOULD be returned when a channel cannot be created or retrieved via the `getOrCreateChannel` method of the DesktopAgent (`fdc3`).*/
  ChannelError["CreationFailed"] = "CreationFailed";
  /** Returned if a call to the `broadcast` functions is made with an invalid context argument. Contexts should be Objects with at least a `type` field that has a `string` value.*/
  ChannelError["MalformedContext"] = "MalformedContext";
})(ChannelError || (ChannelError = {}));

function _regeneratorRuntime() {
  _regeneratorRuntime = function () {
    return exports;
  };
  var exports = {},
    Op = Object.prototype,
    hasOwn = Op.hasOwnProperty,
    defineProperty = Object.defineProperty || function (obj, key, desc) {
      obj[key] = desc.value;
    },
    $Symbol = "function" == typeof Symbol ? Symbol : {},
    iteratorSymbol = $Symbol.iterator || "@@iterator",
    asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator",
    toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
  function define(obj, key, value) {
    return Object.defineProperty(obj, key, {
      value: value,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }), obj[key];
  }
  try {
    define({}, "");
  } catch (err) {
    define = function (obj, key, value) {
      return obj[key] = value;
    };
  }
  function wrap(innerFn, outerFn, self, tryLocsList) {
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator,
      generator = Object.create(protoGenerator.prototype),
      context = new Context(tryLocsList || []);
    return defineProperty(generator, "_invoke", {
      value: makeInvokeMethod(innerFn, self, context)
    }), generator;
  }
  function tryCatch(fn, obj, arg) {
    try {
      return {
        type: "normal",
        arg: fn.call(obj, arg)
      };
    } catch (err) {
      return {
        type: "throw",
        arg: err
      };
    }
  }
  exports.wrap = wrap;
  var ContinueSentinel = {};
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}
  var IteratorPrototype = {};
  define(IteratorPrototype, iteratorSymbol, function () {
    return this;
  });
  var getProto = Object.getPrototypeOf,
    NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype);
  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function (method) {
      define(prototype, method, function (arg) {
        return this._invoke(method, arg);
      });
    });
  }
  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if ("throw" !== record.type) {
        var result = record.arg,
          value = result.value;
        return value && "object" == typeof value && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) {
          invoke("next", value, resolve, reject);
        }, function (err) {
          invoke("throw", err, resolve, reject);
        }) : PromiseImpl.resolve(value).then(function (unwrapped) {
          result.value = unwrapped, resolve(result);
        }, function (error) {
          return invoke("throw", error, resolve, reject);
        });
      }
      reject(record.arg);
    }
    var previousPromise;
    defineProperty(this, "_invoke", {
      value: function (method, arg) {
        function callInvokeWithMethodAndArg() {
          return new PromiseImpl(function (resolve, reject) {
            invoke(method, arg, resolve, reject);
          });
        }
        return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
      }
    });
  }
  function makeInvokeMethod(innerFn, self, context) {
    var state = "suspendedStart";
    return function (method, arg) {
      if ("executing" === state) throw new Error("Generator is already running");
      if ("completed" === state) {
        if ("throw" === method) throw arg;
        return doneResult();
      }
      for (context.method = method, context.arg = arg;;) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }
        if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) {
          if ("suspendedStart" === state) throw state = "completed", context.arg;
          context.dispatchException(context.arg);
        } else "return" === context.method && context.abrupt("return", context.arg);
        state = "executing";
        var record = tryCatch(innerFn, self, context);
        if ("normal" === record.type) {
          if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue;
          return {
            value: record.arg,
            done: context.done
          };
        }
        "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg);
      }
    };
  }
  function maybeInvokeDelegate(delegate, context) {
    var methodName = context.method,
      method = delegate.iterator[methodName];
    if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel;
    var record = tryCatch(method, delegate.iterator, context.arg);
    if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel;
    var info = record.arg;
    return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel);
  }
  function pushTryEntry(locs) {
    var entry = {
      tryLoc: locs[0]
    };
    1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry);
  }
  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal", delete record.arg, entry.completion = record;
  }
  function Context(tryLocsList) {
    this.tryEntries = [{
      tryLoc: "root"
    }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0);
  }
  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) return iteratorMethod.call(iterable);
      if ("function" == typeof iterable.next) return iterable;
      if (!isNaN(iterable.length)) {
        var i = -1,
          next = function next() {
            for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next;
            return next.value = undefined, next.done = !0, next;
          };
        return next.next = next;
      }
    }
    return {
      next: doneResult
    };
  }
  function doneResult() {
    return {
      value: undefined,
      done: !0
    };
  }
  return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", {
    value: GeneratorFunctionPrototype,
    configurable: !0
  }), defineProperty(GeneratorFunctionPrototype, "constructor", {
    value: GeneratorFunction,
    configurable: !0
  }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) {
    var ctor = "function" == typeof genFun && genFun.constructor;
    return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name));
  }, exports.mark = function (genFun) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun;
  }, exports.awrap = function (arg) {
    return {
      __await: arg
    };
  }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
    return this;
  }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    void 0 === PromiseImpl && (PromiseImpl = Promise);
    var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
    return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) {
      return result.done ? result.value : iter.next();
    });
  }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () {
    return this;
  }), define(Gp, "toString", function () {
    return "[object Generator]";
  }), exports.keys = function (val) {
    var object = Object(val),
      keys = [];
    for (var key in object) keys.push(key);
    return keys.reverse(), function next() {
      for (; keys.length;) {
        var key = keys.pop();
        if (key in object) return next.value = key, next.done = !1, next;
      }
      return next.done = !0, next;
    };
  }, exports.values = values, Context.prototype = {
    constructor: Context,
    reset: function (skipTempReset) {
      if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined);
    },
    stop: function () {
      this.done = !0;
      var rootRecord = this.tryEntries[0].completion;
      if ("throw" === rootRecord.type) throw rootRecord.arg;
      return this.rval;
    },
    dispatchException: function (exception) {
      if (this.done) throw exception;
      var context = this;
      function handle(loc, caught) {
        return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught;
      }
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i],
          record = entry.completion;
        if ("root" === entry.tryLoc) return handle("end");
        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc"),
            hasFinally = hasOwn.call(entry, "finallyLoc");
          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
          } else {
            if (!hasFinally) throw new Error("try statement without catch or finally");
            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
          }
        }
      }
    },
    abrupt: function (type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }
      finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null);
      var record = finallyEntry ? finallyEntry.completion : {};
      return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record);
    },
    complete: function (record, afterLoc) {
      if ("throw" === record.type) throw record.arg;
      return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel;
    },
    finish: function (finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel;
      }
    },
    catch: function (tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if ("throw" === record.type) {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }
      throw new Error("illegal catch attempt");
    },
    delegateYield: function (iterable, resultName, nextLoc) {
      return this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      }, "next" === this.method && (this.arg = undefined), ContinueSentinel;
    }
  }, exports;
}
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

var DEFAULT_TIMEOUT = 5000;
var UnavailableError = /*#__PURE__*/new Error('FDC3 DesktopAgent not available at `window.fdc3`.');
var TimeoutError = /*#__PURE__*/new Error('Timed out waiting for `fdc3Ready` event.');
var UnexpectedError = /*#__PURE__*/new Error('`fdc3Ready` event fired, but `window.fdc3` not set to DesktopAgent.');
function rejectIfNoGlobal(f) {
  return window.fdc3 ? f() : Promise.reject(UnavailableError);
}
/**
 * Utility function that returns a promise that will resolve immeadiately
 * if the desktop agent API is found at `window.fdc3`. If the API is found,
 * the promise will resolve when the `fdc3Ready` event is received or if it
 * is found at the end of the specified timeout. If the API is not found, it
 * will reject with an error.
 *
 * ```javascript
 * await fdc3Ready();
 * const intentListener = await addIntentListener("ViewChart", intentHandlerFn);
 * ```
 *
 * @param waitForMs The number of milliseconds to wait for the FDC3 API to be
 * ready. Defaults to 5 seconds.
 */
var fdc3Ready = /*#__PURE__*/function () {
  var _ref = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(waitForMs) {
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
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
              }, waitForMs);
              // listen for the fdc3Ready event
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
    }, _callee);
  }));
  return function fdc3Ready(_x) {
    return _ref.apply(this, arguments);
  };
}();
function isString(app) {
  return !!app && typeof app === 'string';
}
function open(app, context) {
  if (isString(app)) {
    return rejectIfNoGlobal(function () {
      return window.fdc3.open(app, context);
    });
  } else {
    return rejectIfNoGlobal(function () {
      return window.fdc3.open(app, context);
    });
  }
}
function findIntent(intent, context, resultType) {
  return rejectIfNoGlobal(function () {
    return window.fdc3.findIntent(intent, context, resultType);
  });
}
function findIntentsByContext(context, resultType) {
  return rejectIfNoGlobal(function () {
    return window.fdc3.findIntentsByContext(context, resultType);
  });
}
function broadcast(context) {
  return rejectIfNoGlobal(function () {
    return window.fdc3.broadcast(context);
  });
}
function raiseIntent(intent, context, app) {
  if (isString(app)) {
    return rejectIfNoGlobal(function () {
      return window.fdc3.raiseIntent(intent, context, app);
    });
  } else {
    return rejectIfNoGlobal(function () {
      return window.fdc3.raiseIntent(intent, context, app);
    });
  }
}
function raiseIntentForContext(context, app) {
  if (isString(app)) {
    return rejectIfNoGlobal(function () {
      return window.fdc3.raiseIntentForContext(context, app);
    });
  } else {
    return rejectIfNoGlobal(function () {
      return window.fdc3.raiseIntentForContext(context, app);
    });
  }
}
function addIntentListener(intent, handler) {
  return rejectIfNoGlobal(function () {
    return window.fdc3.addIntentListener(intent, handler);
  });
}
function addContextListener(contextTypeOrHandler, handler) {
  //Handle (deprecated) function signature that allowed contextType argument to be omitted
  if (typeof contextTypeOrHandler !== 'function') {
    return rejectIfNoGlobal(function () {
      return window.fdc3.addContextListener(contextTypeOrHandler, handler);
    });
  } else {
    return rejectIfNoGlobal(function () {
      return window.fdc3.addContextListener(null, contextTypeOrHandler);
    });
  }
}
function getUserChannels() {
  return rejectIfNoGlobal(function () {
    //fallback to getSystemChannels for FDC3 <2.0 implementations
    if (window.fdc3.getUserChannels) {
      return window.fdc3.getUserChannels();
    } else {
      return window.fdc3.getSystemChannels();
    }
  });
}
function getSystemChannels() {
  //fallforward to getUserChannels for FDC3 2.0+ implementations
  return getUserChannels();
}
function joinUserChannel(channelId) {
  return rejectIfNoGlobal(function () {
    //fallback to joinChannel for FDC3 <2.0 implementations
    if (window.fdc3.joinUserChannel) {
      return window.fdc3.joinUserChannel(channelId);
    } else {
      return window.fdc3.joinChannel(channelId);
    }
  });
}
function joinChannel(channelId) {
  //fallforward to joinUserChannel for FDC3 2.0+ implementations
  return joinUserChannel(channelId);
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
function createPrivateChannel() {
  return rejectIfNoGlobal(function () {
    return window.fdc3.createPrivateChannel();
  });
}
function getInfo() {
  return rejectIfNoGlobal(function () {
    return window.fdc3.getInfo();
  });
}
function getAppMetadata(app) {
  return rejectIfNoGlobal(function () {
    return window.fdc3.getAppMetadata(app);
  });
}
function findInstances(app) {
  return rejectIfNoGlobal(function () {
    return window.fdc3.findInstances(app);
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
  ContextTypes["Chart"] = "fdc3.chart";
  ContextTypes["ChatInitSettings"] = "fdc3.chat.initSettings";
  ContextTypes["Contact"] = "fdc3.contact";
  ContextTypes["ContactList"] = "fdc3.contactList";
  ContextTypes["Country"] = "fdc3.country";
  ContextTypes["Currency"] = "fdc3.currency";
  ContextTypes["Email"] = "fdc3.email";
  ContextTypes["Instrument"] = "fdc3.instrument";
  ContextTypes["InstrumentList"] = "fdc3.instrumentList";
  ContextTypes["Organization"] = "fdc3.organization";
  ContextTypes["Portfolio"] = "fdc3.portfolio";
  ContextTypes["Position"] = "fdc3.position";
  ContextTypes["Nothing"] = "fdc3.nothing";
  ContextTypes["TimeRange"] = "fdc3.timerange";
  ContextTypes["Valuation"] = "fdc3.valuation";
})(ContextTypes || (ContextTypes = {}));

// To parse this data:
//
//   import { Convert, Chart, ChatInitSettings, Contact, ContactList, Context, Country, Currency, Email, Instrument, InstrumentList, Nothing, Organization, Portfolio, Position, TimeRange, Valuation } from "./file";
//
//   const chart = Convert.toChart(json);
//   const chatInitSettings = Convert.toChatInitSettings(json);
//   const contact = Convert.toContact(json);
//   const contactList = Convert.toContactList(json);
//   const context = Convert.toContext(json);
//   const country = Convert.toCountry(json);
//   const currency = Convert.toCurrency(json);
//   const email = Convert.toEmail(json);
//   const instrument = Convert.toInstrument(json);
//   const instrumentList = Convert.toInstrumentList(json);
//   const nothing = Convert.toNothing(json);
//   const organization = Convert.toOrganization(json);
//   const portfolio = Convert.toPortfolio(json);
//   const position = Convert.toPosition(json);
//   const timeRange = Convert.toTimeRange(json);
//   const valuation = Convert.toValuation(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.
var Style;
(function (Style) {
  Style["Bar"] = "bar";
  Style["Candle"] = "candle";
  Style["Custom"] = "custom";
  Style["Heatmap"] = "heatmap";
  Style["Histogram"] = "histogram";
  Style["Line"] = "line";
  Style["Mountain"] = "mountain";
  Style["Pie"] = "pie";
  Style["Scatter"] = "scatter";
  Style["StackedBar"] = "stacked-bar";
})(Style || (Style = {}));
// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
var Convert = /*#__PURE__*/function () {
  function Convert() {}
  Convert.toChart = function toChart(json) {
    return cast(JSON.parse(json), r('Chart'));
  };
  Convert.chartToJson = function chartToJson(value) {
    return JSON.stringify(uncast(value, r('Chart')), null, 2);
  };
  Convert.toChatInitSettings = function toChatInitSettings(json) {
    return cast(JSON.parse(json), r('ChatInitSettings'));
  };
  Convert.chatInitSettingsToJson = function chatInitSettingsToJson(value) {
    return JSON.stringify(uncast(value, r('ChatInitSettings')), null, 2);
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
  Convert.toContext = function toContext(json) {
    return cast(JSON.parse(json), r('Context'));
  };
  Convert.contextToJson = function contextToJson(value) {
    return JSON.stringify(uncast(value, r('Context')), null, 2);
  };
  Convert.toCountry = function toCountry(json) {
    return cast(JSON.parse(json), r('Country'));
  };
  Convert.countryToJson = function countryToJson(value) {
    return JSON.stringify(uncast(value, r('Country')), null, 2);
  };
  Convert.toCurrency = function toCurrency(json) {
    return cast(JSON.parse(json), r('Currency'));
  };
  Convert.currencyToJson = function currencyToJson(value) {
    return JSON.stringify(uncast(value, r('Currency')), null, 2);
  };
  Convert.toEmail = function toEmail(json) {
    return cast(JSON.parse(json), r('Email'));
  };
  Convert.emailToJson = function emailToJson(value) {
    return JSON.stringify(uncast(value, r('Email')), null, 2);
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
  Convert.toNothing = function toNothing(json) {
    return cast(JSON.parse(json), r('Nothing'));
  };
  Convert.nothingToJson = function nothingToJson(value) {
    return JSON.stringify(uncast(value, r('Nothing')), null, 2);
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
  Convert.toTimeRange = function toTimeRange(json) {
    return cast(JSON.parse(json), r('TimeRange'));
  };
  Convert.timeRangeToJson = function timeRangeToJson(value) {
    return JSON.stringify(uncast(value, r('TimeRange')), null, 2);
  };
  Convert.toValuation = function toValuation(json) {
    return cast(JSON.parse(json), r('Valuation'));
  };
  Convert.valuationToJson = function valuationToJson(value) {
    return JSON.stringify(uncast(value, r('Valuation')), null, 2);
  };
  return Convert;
}();
function invalidValue(typ, val, key, parent) {
  if (parent === void 0) {
    parent = '';
  }
  var prettyTyp = prettyTypeName(typ);
  var parentText = parent ? " on " + parent : '';
  var keyText = key ? " for key \"" + key + "\"" : '';
  throw Error("Invalid value" + keyText + parentText + ". Expected " + prettyTyp + " but got " + JSON.stringify(val));
}
function prettyTypeName(typ) {
  if (Array.isArray(typ)) {
    if (typ.length === 2 && typ[0] === undefined) {
      return "an optional " + prettyTypeName(typ[1]);
    } else {
      return "one of [" + typ.map(function (a) {
        return prettyTypeName(a);
      }).join(', ') + "]";
    }
  } else if (typeof typ === 'object' && typ.literal !== undefined) {
    return typ.literal;
  } else {
    return typeof typ;
  }
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
function transform(val, typ, getProps, key, parent) {
  if (key === void 0) {
    key = '';
  }
  if (parent === void 0) {
    parent = '';
  }
  function transformPrimitive(typ, val) {
    if (typeof typ === typeof val) return val;
    return invalidValue(typ, val, key, parent);
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
    return invalidValue(typs, val, key, parent);
  }
  function transformEnum(cases, val) {
    if (cases.indexOf(val) !== -1) return val;
    return invalidValue(cases.map(function (a) {
      return l(a);
    }), val, key, parent);
  }
  function transformArray(typ, val) {
    // val must be an array with no invalid elements
    if (!Array.isArray(val)) return invalidValue(l('array'), val, key, parent);
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
      return invalidValue(l('Date'), val, key, parent);
    }
    return d;
  }
  function transformObject(props, additional, val) {
    if (val === null || typeof val !== 'object' || Array.isArray(val)) {
      return invalidValue(l(ref || 'object'), val, key, parent);
    }
    var result = {};
    Object.getOwnPropertyNames(props).forEach(function (key) {
      var prop = props[key];
      var v = Object.prototype.hasOwnProperty.call(val, key) ? val[key] : undefined;
      result[prop.key] = transform(v, prop.typ, getProps, key, ref);
    });
    Object.getOwnPropertyNames(val).forEach(function (key) {
      if (!Object.prototype.hasOwnProperty.call(props, key)) {
        result[key] = transform(val[key], additional, getProps, key, ref);
      }
    });
    return result;
  }
  if (typ === 'any') return val;
  if (typ === null) {
    if (val === null) return val;
    return invalidValue(typ, val, key, parent);
  }
  if (typ === false) return invalidValue(typ, val, key, parent);
  var ref = undefined;
  while (typeof typ === 'object' && typ.ref !== undefined) {
    ref = typ.ref;
    typ = typeMap[typ.ref];
  }
  if (Array.isArray(typ)) return transformEnum(typ, val);
  if (typeof typ === 'object') {
    return typ.hasOwnProperty('unionMembers') ? transformUnion(typ.unionMembers, val) : typ.hasOwnProperty('arrayItems') ? transformArray(typ.arrayItems, val) : typ.hasOwnProperty('props') ? transformObject(getProps(typ), typ.additional, val) : invalidValue(typ, val, key, parent);
  }
  // Numbers can be parsed by Date but shouldn't be.
  if (typ === Date && typeof val !== 'number') return transformDate(val);
  return transformPrimitive(typ, val);
}
function cast(val, typ) {
  return transform(val, typ, jsonToJSProps);
}
function uncast(val, typ) {
  return transform(val, typ, jsToJSONProps);
}
function l(typ) {
  return {
    literal: typ
  };
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
  Chart: /*#__PURE__*/o([{
    json: 'instruments',
    js: 'instruments',
    typ: /*#__PURE__*/a( /*#__PURE__*/r('InstrumentElement'))
  }, {
    json: 'otherConfig',
    js: 'otherConfig',
    typ: /*#__PURE__*/u(undefined, /*#__PURE__*/m('any'))
  }, {
    json: 'range',
    js: 'range',
    typ: /*#__PURE__*/u(undefined, /*#__PURE__*/r('TimeRangeObject'))
  }, {
    json: 'style',
    js: 'style',
    typ: /*#__PURE__*/u(undefined, /*#__PURE__*/r('Style'))
  }, {
    json: 'type',
    js: 'type',
    typ: ''
  }, {
    json: 'id',
    js: 'id',
    typ: /*#__PURE__*/u(undefined, /*#__PURE__*/m('any'))
  }, {
    json: 'name',
    js: 'name',
    typ: /*#__PURE__*/u(undefined, '')
  }], 'any'),
  InstrumentElement: /*#__PURE__*/o([{
    json: 'id',
    js: 'id',
    typ: /*#__PURE__*/r('PurpleID')
  }, {
    json: 'market',
    js: 'market',
    typ: /*#__PURE__*/u(undefined, /*#__PURE__*/r('PurpleMarket'))
  }, {
    json: 'type',
    js: 'type',
    typ: ''
  }, {
    json: 'name',
    js: 'name',
    typ: /*#__PURE__*/u(undefined, '')
  }], 'any'),
  PurpleID: /*#__PURE__*/o([{
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
  }], 'any'),
  PurpleMarket: /*#__PURE__*/o([{
    json: 'BBG',
    js: 'BBG',
    typ: /*#__PURE__*/u(undefined, '')
  }, {
    json: 'COUNTRY_ISOALPHA2',
    js: 'COUNTRY_ISOALPHA2',
    typ: /*#__PURE__*/u(undefined, '')
  }, {
    json: 'MIC',
    js: 'MIC',
    typ: /*#__PURE__*/u(undefined, '')
  }, {
    json: 'name',
    js: 'name',
    typ: /*#__PURE__*/u(undefined, '')
  }], 'any'),
  TimeRangeObject: /*#__PURE__*/o([{
    json: 'endTime',
    js: 'endTime',
    typ: /*#__PURE__*/u(undefined, Date)
  }, {
    json: 'startTime',
    js: 'startTime',
    typ: /*#__PURE__*/u(undefined, Date)
  }, {
    json: 'type',
    js: 'type',
    typ: ''
  }, {
    json: 'id',
    js: 'id',
    typ: /*#__PURE__*/u(undefined, /*#__PURE__*/m('any'))
  }, {
    json: 'name',
    js: 'name',
    typ: /*#__PURE__*/u(undefined, '')
  }], 'any'),
  ChatInitSettings: /*#__PURE__*/o([{
    json: 'chatName',
    js: 'chatName',
    typ: /*#__PURE__*/u(undefined, '')
  }, {
    json: 'initMessage',
    js: 'initMessage',
    typ: /*#__PURE__*/u(undefined, '')
  }, {
    json: 'members',
    js: 'members',
    typ: /*#__PURE__*/u(undefined, /*#__PURE__*/r('ContactListObject'))
  }, {
    json: 'options',
    js: 'options',
    typ: /*#__PURE__*/u(undefined, 'any')
  }, {
    json: 'type',
    js: 'type',
    typ: 'any'
  }], 'any'),
  ContactListObject: /*#__PURE__*/o([{
    json: 'contacts',
    js: 'contacts',
    typ: /*#__PURE__*/a( /*#__PURE__*/r('ContactElement'))
  }, {
    json: 'type',
    js: 'type',
    typ: ''
  }, {
    json: 'id',
    js: 'id',
    typ: /*#__PURE__*/u(undefined, /*#__PURE__*/m('any'))
  }, {
    json: 'name',
    js: 'name',
    typ: /*#__PURE__*/u(undefined, '')
  }], 'any'),
  ContactElement: /*#__PURE__*/o([{
    json: 'id',
    js: 'id',
    typ: /*#__PURE__*/r('FluffyID')
  }, {
    json: 'type',
    js: 'type',
    typ: ''
  }, {
    json: 'name',
    js: 'name',
    typ: /*#__PURE__*/u(undefined, '')
  }], 'any'),
  FluffyID: /*#__PURE__*/o([{
    json: 'email',
    js: 'email',
    typ: /*#__PURE__*/u(undefined, '')
  }, {
    json: 'FDS_ID',
    js: 'FDS_ID',
    typ: /*#__PURE__*/u(undefined, '')
  }], 'any'),
  Contact: /*#__PURE__*/o([{
    json: 'id',
    js: 'id',
    typ: /*#__PURE__*/r('TentacledID')
  }, {
    json: 'type',
    js: 'type',
    typ: ''
  }, {
    json: 'name',
    js: 'name',
    typ: /*#__PURE__*/u(undefined, '')
  }], 'any'),
  TentacledID: /*#__PURE__*/o([{
    json: 'email',
    js: 'email',
    typ: /*#__PURE__*/u(undefined, '')
  }, {
    json: 'FDS_ID',
    js: 'FDS_ID',
    typ: /*#__PURE__*/u(undefined, '')
  }], 'any'),
  ContactList: /*#__PURE__*/o([{
    json: 'contacts',
    js: 'contacts',
    typ: /*#__PURE__*/a( /*#__PURE__*/r('ContactElement'))
  }, {
    json: 'type',
    js: 'type',
    typ: ''
  }, {
    json: 'id',
    js: 'id',
    typ: /*#__PURE__*/u(undefined, /*#__PURE__*/m('any'))
  }, {
    json: 'name',
    js: 'name',
    typ: /*#__PURE__*/u(undefined, '')
  }], 'any'),
  Context: /*#__PURE__*/o([{
    json: 'id',
    js: 'id',
    typ: /*#__PURE__*/u(undefined, /*#__PURE__*/m('any'))
  }, {
    json: 'name',
    js: 'name',
    typ: /*#__PURE__*/u(undefined, '')
  }, {
    json: 'type',
    js: 'type',
    typ: ''
  }], 'any'),
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
    json: 'COUNTRY_ISOALPHA2',
    js: 'COUNTRY_ISOALPHA2',
    typ: /*#__PURE__*/u(undefined, '')
  }, {
    json: 'COUNTRY_ISOALPHA3',
    js: 'COUNTRY_ISOALPHA3',
    typ: /*#__PURE__*/u(undefined, '')
  }, {
    json: 'ISOALPHA2',
    js: 'ISOALPHA2',
    typ: /*#__PURE__*/u(undefined, '')
  }, {
    json: 'ISOALPHA3',
    js: 'ISOALPHA3',
    typ: /*#__PURE__*/u(undefined, '')
  }], 'any'),
  Currency: /*#__PURE__*/o([{
    json: 'id',
    js: 'id',
    typ: /*#__PURE__*/r('CurrencyID')
  }, {
    json: 'name',
    js: 'name',
    typ: /*#__PURE__*/u(undefined, '')
  }, {
    json: 'type',
    js: 'type',
    typ: ''
  }], 'any'),
  CurrencyID: /*#__PURE__*/o([{
    json: 'CURRENCY_ISOCODE',
    js: 'CURRENCY_ISOCODE',
    typ: /*#__PURE__*/u(undefined, '')
  }], 'any'),
  Email: /*#__PURE__*/o([{
    json: 'recipients',
    js: 'recipients',
    typ: /*#__PURE__*/r('RecipientsObject')
  }, {
    json: 'subject',
    js: 'subject',
    typ: /*#__PURE__*/u(undefined, '')
  }, {
    json: 'textBody',
    js: 'textBody',
    typ: /*#__PURE__*/u(undefined, '')
  }, {
    json: 'type',
    js: 'type',
    typ: ''
  }, {
    json: 'id',
    js: 'id',
    typ: /*#__PURE__*/u(undefined, /*#__PURE__*/m('any'))
  }, {
    json: 'name',
    js: 'name',
    typ: /*#__PURE__*/u(undefined, '')
  }], 'any'),
  RecipientsObject: /*#__PURE__*/o([{
    json: 'id',
    js: 'id',
    typ: /*#__PURE__*/u(undefined, /*#__PURE__*/r('RecipientsID'))
  }, {
    json: 'type',
    js: 'type',
    typ: ''
  }, {
    json: 'name',
    js: 'name',
    typ: /*#__PURE__*/u(undefined, '')
  }, {
    json: 'contacts',
    js: 'contacts',
    typ: /*#__PURE__*/u(undefined, /*#__PURE__*/a( /*#__PURE__*/r('ContactElement')))
  }], 'any'),
  RecipientsID: /*#__PURE__*/o([{
    json: 'email',
    js: 'email',
    typ: /*#__PURE__*/u(undefined, '')
  }, {
    json: 'FDS_ID',
    js: 'FDS_ID',
    typ: /*#__PURE__*/u(undefined, '')
  }], 'any'),
  Instrument: /*#__PURE__*/o([{
    json: 'id',
    js: 'id',
    typ: /*#__PURE__*/r('StickyID')
  }, {
    json: 'market',
    js: 'market',
    typ: /*#__PURE__*/u(undefined, /*#__PURE__*/r('FluffyMarket'))
  }, {
    json: 'type',
    js: 'type',
    typ: ''
  }, {
    json: 'name',
    js: 'name',
    typ: /*#__PURE__*/u(undefined, '')
  }], 'any'),
  StickyID: /*#__PURE__*/o([{
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
  }], 'any'),
  FluffyMarket: /*#__PURE__*/o([{
    json: 'BBG',
    js: 'BBG',
    typ: /*#__PURE__*/u(undefined, '')
  }, {
    json: 'COUNTRY_ISOALPHA2',
    js: 'COUNTRY_ISOALPHA2',
    typ: /*#__PURE__*/u(undefined, '')
  }, {
    json: 'MIC',
    js: 'MIC',
    typ: /*#__PURE__*/u(undefined, '')
  }, {
    json: 'name',
    js: 'name',
    typ: /*#__PURE__*/u(undefined, '')
  }], 'any'),
  InstrumentList: /*#__PURE__*/o([{
    json: 'instruments',
    js: 'instruments',
    typ: /*#__PURE__*/a( /*#__PURE__*/r('InstrumentElement'))
  }, {
    json: 'type',
    js: 'type',
    typ: ''
  }, {
    json: 'id',
    js: 'id',
    typ: /*#__PURE__*/u(undefined, /*#__PURE__*/m('any'))
  }, {
    json: 'name',
    js: 'name',
    typ: /*#__PURE__*/u(undefined, '')
  }], 'any'),
  Nothing: /*#__PURE__*/o([{
    json: 'type',
    js: 'type',
    typ: ''
  }, {
    json: 'id',
    js: 'id',
    typ: /*#__PURE__*/u(undefined, /*#__PURE__*/m('any'))
  }, {
    json: 'name',
    js: 'name',
    typ: /*#__PURE__*/u(undefined, '')
  }], 'any'),
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
  }], 'any'),
  Portfolio: /*#__PURE__*/o([{
    json: 'positions',
    js: 'positions',
    typ: /*#__PURE__*/a( /*#__PURE__*/r('PositionElement'))
  }, {
    json: 'type',
    js: 'type',
    typ: ''
  }, {
    json: 'id',
    js: 'id',
    typ: /*#__PURE__*/u(undefined, /*#__PURE__*/m('any'))
  }, {
    json: 'name',
    js: 'name',
    typ: /*#__PURE__*/u(undefined, '')
  }], 'any'),
  PositionElement: /*#__PURE__*/o([{
    json: 'holding',
    js: 'holding',
    typ: 3.14
  }, {
    json: 'instrument',
    js: 'instrument',
    typ: /*#__PURE__*/r('InstrumentElement')
  }, {
    json: 'type',
    js: 'type',
    typ: ''
  }, {
    json: 'id',
    js: 'id',
    typ: /*#__PURE__*/u(undefined, /*#__PURE__*/m('any'))
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
    typ: /*#__PURE__*/r('InstrumentElement')
  }, {
    json: 'type',
    js: 'type',
    typ: ''
  }, {
    json: 'id',
    js: 'id',
    typ: /*#__PURE__*/u(undefined, /*#__PURE__*/m('any'))
  }, {
    json: 'name',
    js: 'name',
    typ: /*#__PURE__*/u(undefined, '')
  }], 'any'),
  TimeRange: /*#__PURE__*/o([{
    json: 'endTime',
    js: 'endTime',
    typ: /*#__PURE__*/u(undefined, Date)
  }, {
    json: 'startTime',
    js: 'startTime',
    typ: /*#__PURE__*/u(undefined, Date)
  }, {
    json: 'type',
    js: 'type',
    typ: ''
  }, {
    json: 'id',
    js: 'id',
    typ: /*#__PURE__*/u(undefined, /*#__PURE__*/m('any'))
  }, {
    json: 'name',
    js: 'name',
    typ: /*#__PURE__*/u(undefined, '')
  }], 'any'),
  Valuation: /*#__PURE__*/o([{
    json: 'CURRENCY_ISOCODE',
    js: 'CURRENCY_ISOCODE',
    typ: ''
  }, {
    json: 'expiryTime',
    js: 'expiryTime',
    typ: /*#__PURE__*/u(undefined, Date)
  }, {
    json: 'price',
    js: 'price',
    typ: /*#__PURE__*/u(undefined, 3.14)
  }, {
    json: 'type',
    js: 'type',
    typ: ''
  }, {
    json: 'valuationTime',
    js: 'valuationTime',
    typ: /*#__PURE__*/u(undefined, Date)
  }, {
    json: 'value',
    js: 'value',
    typ: 3.14
  }, {
    json: 'id',
    js: 'id',
    typ: /*#__PURE__*/u(undefined, /*#__PURE__*/m('any'))
  }, {
    json: 'name',
    js: 'name',
    typ: /*#__PURE__*/u(undefined, '')
  }], 'any'),
  Style: ['bar', 'candle', 'custom', 'heatmap', 'histogram', 'line', 'mountain', 'pie', 'scatter', 'stacked-bar']
};

var Intents;
(function (Intents) {
  Intents["StartCall"] = "StartCall";
  Intents["StartChat"] = "StartChat";
  Intents["StartEmail"] = "StartEmail";
  Intents["ViewAnalysis"] = "ViewAnalysis";
  Intents["ViewChart"] = "ViewChart";
  Intents["ViewContact"] = "ViewContact";
  Intents["ViewHoldings"] = "ViewHoldings";
  Intents["ViewInstrument"] = "ViewInstrument";
  Intents["ViewInteractions"] = "ViewInteractions";
  Intents["ViewNews"] = "ViewNews";
  Intents["ViewOrders"] = "ViewOrders";
  Intents["ViewProfile"] = "ViewProfile";
  Intents["ViewQuote"] = "ViewQuote";
  Intents["ViewResearch"] = "ViewResearch";
})(Intents || (Intents = {}));


//# sourceMappingURL=fdc3.esm.js.map


/***/ },

/***/ "../../node_modules/@openfin/bloomberg/openfin.bloomberg.mjs"
/*!*******************************************************************!*\
  !*** ../../node_modules/@openfin/bloomberg/openfin.bloomberg.mjs ***!
  \*******************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

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
var e={d:(t,n)=>{for(var r in n)e.o(n,r)&&!e.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:n[r]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)},t={};e.d(t,{AdapterError:()=>AdapterError,ApiError:()=>ApiError,InitializationError:()=>InitializationError,InteropError:()=>InteropError,TerminalConnectRequestError:()=>TerminalConnectRequestError,TerminalConnectionError:()=>TerminalConnectionError,connect:()=>te,disableLogging:()=>I,enableLogging:()=>A,getSecurityFromInstrumentContext:()=>b});class ApiError extends Error{constructor(e="An unexpected error has occurred",t){super(e),this.name=this.constructor.name,this.stack=this.stack?.replace(/^(\w*Error)/,`${this.constructor.name}`),t&&(this.data=t)}}class AdapterError extends ApiError{constructor(e="Failed to execute adapter function",t){super(e,t)}}class InitializationError extends ApiError{constructor(e="Failed to initialize adapter",t){super(e,t)}}class InteropError extends ApiError{constructor(e="Failed to execute the interop function",t){super(e,t)}}class ParameterError extends ApiError{constructor(e){super(e=e??"Invalid parameter detected")}}class TerminalConnectionError extends ApiError{constructor(e="Failed to connect to the terminal",t){super(e,t)}}class TerminalConnectRequestError extends ApiError{constructor(e="Terminal Connect request failed",t){super(e,t)}}function n(e){return{arrayItems:e}}function r(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return{unionMembers:t}}function o(e,t){return{props:e,additional:t}}function a(e){return{props:[],additional:e}}function i(e){return{ref:e}}var s,c,u,l,p;Date,Date,Date,Date,Date,Date,Date,Date,Date,Date,Date,Date,Date,Date,Date,Date,Date,Date,Date,Date,Date,Date,Date,Date,Date,Date,Date,Date,Date,Date,Date,Date,Date,Date,Date,Date,Date,Date,Date,Date,Date,Date,Date,Date,Date,Date,Date,Date,Date,Date,Date,Date,Date,Date,Date,Date,Date,Date,Date,Date,Date,Date,Date,Date;!function(e){e.AppNotFound="AppNotFound",e.ErrorOnLaunch="ErrorOnLaunch",e.AppTimeout="AppTimeout",e.ResolverUnavailable="ResolverUnavailable",e.MalformedContext="MalformedContext",e.DesktopAgentNotFound="DesktopAgentNotFound"}(s||(s={})),function(e){e.NoAppsFound="NoAppsFound",e.ResolverUnavailable="ResolverUnavailable",e.UserCancelled="UserCancelledResolution",e.ResolverTimeout="ResolverTimeout",e.TargetAppUnavailable="TargetAppUnavailable",e.TargetInstanceUnavailable="TargetInstanceUnavailable",e.IntentDeliveryFailed="IntentDeliveryFailed",e.MalformedContext="MalformedContext",e.DesktopAgentNotFound="DesktopAgentNotFound"}(c||(c={})),function(e){e.NoResultReturned="NoResultReturned",e.IntentHandlerRejected="IntentHandlerRejected"}(u||(u={})),function(e){e.NoChannelFound="NoChannelFound",e.AccessDenied="AccessDenied",e.CreationFailed="CreationFailed",e.MalformedContext="MalformedContext"}(l||(l={})),function(e){e.ResponseTimedOut="ResponseToBridgeTimedOut",e.AgentDisconnected="AgentDisconnected",e.NotConnectedToBridge="NotConnectedToBridge",e.MalformedMessage="MalformedMessage"}(p||(p={}));var d;!function(e){e.Chart="fdc3.chart",e.ChatInitSettings="fdc3.chat.initSettings",e.ChatRoom="fdc3.chat.room",e.Contact="fdc3.contact",e.ContactList="fdc3.contactList",e.Country="fdc3.country",e.Currency="fdc3.currency",e.Email="fdc3.email",e.Instrument="fdc3.instrument",e.InstrumentList="fdc3.instrumentList",e.Interaction="fdc3.interaction",e.Nothing="fdc3.nothing",e.Organization="fdc3.organization",e.Portfolio="fdc3.portfolio",e.Position="fdc3.position",e.ChatSearchCriteria="fdc3.chat.searchCriteria",e.TimeRange="fdc3.timerange",e.TransactionResult="fdc3.transactionResult",e.Valuation="fdc3.valuation"}(d||(d={}));function g(e){return{arrayItems:e}}function m(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return{unionMembers:t}}function f(e,t){return{props:e,additional:t}}function w(e){return{props:[],additional:e}}function h(e){return{ref:e}}var y;Date,Date,Date,Date,Date,Date;!function(e){e.CreateInteraction="CreateInteraction",e.SendChatMessage="SendChatMessage",e.StartCall="StartCall",e.StartChat="StartChat",e.StartEmail="StartEmail",e.ViewAnalysis="ViewAnalysis",e.ViewChat="ViewChat",e.ViewChart="ViewChart",e.ViewContact="ViewContact",e.ViewHoldings="ViewHoldings",e.ViewInstrument="ViewInstrument",e.ViewInteractions="ViewInteractions",e.ViewMessages="ViewMessages",e.ViewNews="ViewNews",e.ViewOrders="ViewOrders",e.ViewProfile="ViewProfile",e.ViewQuote="ViewQuote",e.ViewResearch="ViewResearch"}(y||(y={}));const C=e=>{const t=Date.parse(e);if(!Number.isNaN(t))return new Date(t)},E=e=>{let t=/\s+([\w-]+$)/.exec(e)?.[1];if(t)return t=t.charAt(0).toUpperCase()+t.slice(1).toLowerCase().replace("-m","-M"),t},b=e=>{if(e.type!==d.Instrument)return;const{id:t,market:n}=e,{BBG:r,FIGI:o,ticker:a}=t;if(r||o)return r??o;if(!a)return;return`${a} ${n?.BBG?n.BBG:"US"} Equity`};let v=!1;const D="[@openfin/bloomberg]",I=()=>{v=!1},A=()=>{v=!0,N("v2.1.0")},R=(e,t)=>{if(!v)return;const n=t?`${D} ${t}`:D;e instanceof ApiError&&e.data?console.error(n,e,e.data):console.error(n,e)},N=(...e)=>{v&&console.log(D,...e)},x=(...e)=>{v&&console.warn(D,...e)};var T,S,M;"undefined"==typeof fin&&Object.assign(window,{fin:{}}),Object.assign(fin,{Integrations:{Bloomberg:{enableLogging:A,disableLogging:I}}}),function(e){e.CancelSubscription="CancelSubscription",e.Connect="Connect",e.CreateSubscription="CreateSubscription",e.Disconnect="Disconnect",e.ExecuteRequest="ExecuteRequest",e.LogMessage="LogMessage",e.SubscriptionEvent="SubscriptionEvent"}(T||(T={})),function(e){e[e.Error=0]="Error",e[e.Info=1]="Info",e[e.Warn=2]="Warn"}(S||(S={})),function(e){e.Local="Local",e.Remote="Remote"}(M||(M={}));const V=e=>async()=>{N("Retrieving launchpad groups");const t={query:"query {\n          groups {\n            ... on Groups {\n              items {\n                id\n                name\n                type\n                value\n              }\n            }\n            ... on Error {\n              errorCategory\n              errorMessage\n            }\n          }\n        }"};let n;try{n=await e(T.ExecuteRequest,t)}catch(e){const t=new AdapterError(void 0,e);throw R(t),t}if(!n.success){const e=new TerminalConnectRequestError(n.error?.message,n.error);throw R(e),e}if(!n.data){const e=new TerminalConnectRequestError("Unexpected empty response data",n);throw R(e),e}const{groups:r}=JSON.parse(n.data);if(r.items)return r.items;const o=new TerminalConnectRequestError(r.errorMessage,r);throw R(o),o},$=e=>async(t,n)=>{if(null==t||"number"!=typeof t||Number.isNaN(t))throw new ParameterError("Group ID must be a valid number");if(!n?.trim())throw new ParameterError("Group value must be a non-empty string");N("Setting group value",{groupId:t,newValue:n});const r={query:`mutation {\n          setGroupValue(\n            filter: {id: [${t}]},\n            value: "${n}") {\n            ... on GroupResults {\n              results {\n                result {\n                  succeeded\n                  details\n                }\n              }\n            }\n            ... on Error {\n              errorCategory\n              errorMessage\n            }\n          }\n        }`};let o;try{o=await e(T.ExecuteRequest,r)}catch(e){const t=new AdapterError(void 0,e);throw R(t),t}if(!o.success){const e=new TerminalConnectRequestError(o.error?.message,o.error);throw R(e),e}if(!o.data){const e=new TerminalConnectRequestError("Unexpected empty response data",o);throw R(e),e}const{setGroupValue:a}=JSON.parse(o.data);if("errorMessage"in a){const e=new TerminalConnectRequestError(a.errorMessage,a);throw R(e),e}},q=new Map,B=async(e,t,n,r)=>{const o=await O(e)(t);if(!o)return;const a=await(e=>async(t=[])=>{N("Creating group subscription",{groupIdFilter:t});const n={query:`subscription {\n        subscribeGroupEvents (\n          filter:{\n            event: [\n              VALUE_CHANGED\n            ]\n            ${t.length?`,group: {id: ${JSON.stringify(t)}}`:""}\n          }){\n          type\n          group{\n            id\n            name\n            value\n          }\n        }\n      }`};let r;try{r=await e(T.CreateSubscription,n)}catch(e){const t=new AdapterError(void 0,e);throw R(t),t}if(!r.success){const e=new TerminalConnectRequestError(r.error?.message,r.error);throw R(e),e}if(!r.data){const e=new TerminalConnectRequestError("Unexpected empty response data",r);throw R(e),e}const{subscriptionId:o}=JSON.parse(r.data);return o})(e)(o),i={id:a,listener:U(n,r),unsubscribe:F(e,a)};return q.set(a,i),i},F=(e,t)=>async()=>{N("Unsubscribing group events",{subscriptionId:t});try{await(e=>async t=>{const n={subscriptionId:t};let r;try{r=await e(T.CancelSubscription,n)}catch(e){const t=new AdapterError(void 0,e);throw R(t),t}if(!r.success){const e=new TerminalConnectRequestError(r.error?.message,r.error);throw R(e),e}})(e)(t)}catch(e){R(e)}q.delete(t)},U=(e,t)=>async n=>{try{e?.(n),N("Setting new context: ",n),await fin.me.interop.setContext(n)}catch(e){const n=new InteropError(void 0,e);R(n),t?.(n)}},P=async(e,t)=>{N("Group event received",{data:t,subscriptionId:e});const{group:n}=t.subscribeGroupEvents;if(!n)return void x("Received group event with no group",{subscriptionId:e});if(!q.has(e))return void x("Received group event for unknown subscription",{subscriptionId:e});const r=q.get(e),o=(e=>{const t={type:d.Instrument,id:{BBG:e}};if("Equity"===E(e)){const[n,r]=e.split(/\s+/);t.id.ticker=n?.toUpperCase(),t.market={BBG:r?.toUpperCase()}}return t})(n.value);o.openfinBbgApi=!0,r?.listener(o)},O=e=>async t=>{if(!t)return;if("*"===t)return[];Array.isArray(t)||(t=[t]);const n=await V(e)(),r=t.map((e=>{const t=n.find((t=>t.name?.toUpperCase()===e.toUpperCase()))?.id;return t||x(`Group not found: ${e}`),t})).filter(Boolean);return r.length?r:void 0},G="bloomberg-adapter",L=`bloomberg-adapter-${void 0!==crypto.randomUUID?crypto.randomUUID():"10000000-1000-4000-8000-100000000000".replace(/[018]/g,(e=>{const t=crypto.getRandomValues(new Uint8Array(1))[0]&15>>Number(e)/4;return(Number(e)^t).toString(16)}))}`;let k;const z=async(e=!1)=>{try{if(!await(async e=>(await fin.InterApplicationBus.Channel.getAllChannels()).some((t=>t.channelName===e)))(L)){const{port:t,securityRealm:n}=await fin.System.getRuntimeInfo(),{licenseKey:r}=await fin.Application.getCurrentSync().getManifest(),o=fin.me.uuid;N("Initializing adapter",{channelName:L,licenseKey:r,port:t,securityRealm:n,uuid:o,adapterLoggingEnabled:e}),await(async()=>{const e=await fin.Application.getCurrentSync().getManifest(),t=e.appAssets?.find((e=>e.alias===G));if(t)return void x("Detected adapter package in app manifest appAssets",t);if(await j())return void N("Using existing adapter package");const n={alias:G,src:"https://cdn.openfin.co/release/integrations/bloomberg/2.1.0/OpenFin.Bloomberg.zip",target:"OpenFin.Bloomberg.exe",version:"2.1.0"};N("Downloading adapter package",n);try{await fin.System.downloadAsset(n,(()=>{}))}catch(e){throw R("Unable to download adapter package"),e}})(),fin.System.launchExternalProcess({alias:G,arguments:`"${o}" "${r??""}" "${t}" "${n??""}" "${L}" "${e}"`,lifetime:"application"})}const n=fin.InterApplicationBus.Channel.connect(L,{payload:{version:"2.1.0"}}),r=new Promise((e=>{setTimeout(e,2e4)})).then((()=>{throw new ApiError("Connection to adapter timed out")}));return k=await Promise.race([n,r]),k.register(T.LogMessage,H),k.register(T.SubscriptionEvent,J),N("Connected to adapter",{uuid:k.providerIdentity.uuid}),{channelName:L,dispatch:(...e)=>k.dispatch(...e),initTerminal:(t=k,async e=>{const n={apiKey:e};let r;try{r=await t.dispatch(T.Connect,n)}catch(e){const t=new AdapterError(void 0,e);throw R(t),t}if(!r.success){const e=new TerminalConnectionError(r.error?.message,r.error);throw R(e),e}}),version:"2.1.0"}}catch(e){const t=e instanceof ApiError?new InitializationError(e.message):new InitializationError(void 0,e);throw R(t),t}// removed by dead control flow
 var t; },H=e=>{const{level:t,message:n}=e,r="[adapter]";switch(t){case S.Error:R(n,r);break;case S.Warn:x(r,n);break;case S.Info:default:N(r,n)}},J=async e=>{const{data:t,error:n,subscriptionId:r}=e;if(!r||!t){const t=new TerminalConnectRequestError("Invalid subscription event",e);throw R(t),t}if(n){const e=new TerminalConnectRequestError(void 0,n);throw R(e),e}const o=JSON.parse(t);if(!0===Boolean(o.subscribeGroupEvents))await P(r,o);else x("Received unknown subscription event",t)},j=async()=>{try{return"2.1.0"===(await fin.System.getAppAssetInfo({alias:G})).version}catch(e){return!1}},Q=async(e,t)=>{if(!e)return void x("No action specified, ignoring");if("group"in e){const{group:n,security:r}=e;return void await(e=>async(t,n)=>{if(!n)return;N(`Setting ${"*"===t?"every group":`group ${t}`} security to ${n}`);const r=await V(e)();if("*"===t)await Promise.all(r.map((t=>t.id?$(e)(t.id,n):Promise.resolve())));else{const o=r.find((e=>e.name?.toUpperCase()===t.toUpperCase()))?.id;null==o?x(`Unable to update group security for ${t}: group not found`):await $(e)(o,n)}})(t)(n,r)}const{mnemonic:n,securities:r,target:o,tail:a}=e,[i,s]=r??[];await(e=>async(t,n,r,o,a)=>{if(!t?.trim())throw new ParameterError("Mnemonic must be a non-empty string");if(null==n||"string"==typeof n&&!n?.trim())throw new ParameterError("Target must be a number (0-3) or non-empty string");N("Running terminal function",{mnemonic:t,target:n,security1:r,security2:o,tail:a});const i=t.trim().toUpperCase();let s,c;"number"==typeof n?(s="runFunctionInPanel",c="panel: "+(1===n?"ONE":2===n?"TWO":3===n?"THREE":"ZERO")):(s="runFunctionInTab",c=`tabName: "${n.trim()}"`);const u={query:`mutation {\n        ${s}(input: {\n          mnemonic: "${i}",\n          ${c},\n          ${r?`security1: "${r}"`:""}\n          ${o?`security2: "${o}"`:""}\n          ${a?`tail: "${a}"`:""}\n        }) {\n          ... on Result {\n            succeeded\n            details\n          }\n          ... on Error {\n            errorCategory\n            errorMessage\n          }\n        }\n      }`};let l;try{l=await e(T.ExecuteRequest,u)}catch(e){const t=new AdapterError(void 0,e);throw R(t),t}if(!l.success){const e=new TerminalConnectRequestError(l.error?.message,l.error);throw R(e),e}if(l.data){const e=JSON.parse(l.data);let t;if("runFunctionInTab"in e?t=e.runFunctionInTab.errorMessage:"runFunctionInPanel"in e&&(t=e.runFunctionInPanel.errorMessage),t){const n=new TerminalConnectRequestError(t,e);throw R(n),n}}})(t)(n,o,i,s,a)},W=()=>e=>{const t=e,{name:n,id:r}=t,o=r?.BBG??n;if(o)return{mnemonic:"BIO",target:0,tail:o};x("No valid identifier provided in context, ignoring")},Y=e=>t=>{const n=b(t);if(n)return{mnemonic:e,securities:[n],target:0};x("No security provided in context, ignoring")},K=async(e,t,n,r)=>{const o=(()=>{const e=[],t=[];return e.push([d.Instrument,Y("DES")]),e.push([d.Contact,W()]),e.push([d.Organization,_()]),t.push([y.StartChat,[[d.Nothing,Z("IB")],[d.Contact,e=>{const{id:t,name:n}=e;return{mnemonic:"IB",target:0,tail:t.email??n}}]]]),t.push([y.ViewAnalysis,[[d.Nothing,Z("ANR")],[d.Instrument,e=>{const t=b(e);if(!t)return void x("No security provided in context, ignoring");let n;switch(E(t)){case"Equity":case"Index":n="FA";break;case"Corp":case"Govt":case"Mtge":case"Muni":case"Pfd":n="YAS";break;default:n="ANR"}return{mnemonic:n,securities:[t],target:0}}]]]),t.push([y.ViewChart,[[d.Nothing,Z("GIP")],[d.Instrument,Y("GIP")],[d.Chart,e=>{const{interval:t,instruments:n,range:r,style:o}=e,a={mnemonic:"GIP",target:0};let i=!0;const s=b(n?.[0]??e);s&&(a.securities=[s]);const{endTime:c,startTime:u}=r??{};if(u){const e=C(u.toString());if(e&&(a.tail=`${e.getMonth()+1}/${e.getDate()}/${e.getFullYear()}`,i=!1,c)){const e=C(c.toString());e&&(a.tail+=` ${e.getMonth()+1}/${e.getDate()}/${e.getFullYear()}`)}}switch(o?.toLowerCase()){case"bar":a.mnemonic=i?"IGPO":"GPO";break;case"candle":a.mnemonic=i?"IGPC":"GPC";break;default:a.mnemonic=i?"GIP":"GP"}if(!i&&t)switch(t.toLowerCase()){case"daily":a.tail+=" D";break;case"weekly":a.tail+=" W";break;case"monthly":a.tail+="M";break;case"quarterly":a.tail+=" Q";break;case"yearly":a.tail+=" Y"}return a}]]]),t.push([y.ViewChat,[[d.Nothing,Z("IB")],[d.Contact,e=>{const{id:t,name:n}=e;return{mnemonic:"IB",target:0,tail:t.email??n}}]]]),t.push([y.ViewContact,[[d.Nothing,Z("BIO")],[d.Contact,W()]]]),t.push([y.ViewInstrument,[[d.Nothing,Z("DES")],[d.Instrument,Y("DES")]]]),t.push([y.ViewNews,[[d.Nothing,Z("CN")],[d.Instrument,Y("CN")]]]),t.push([y.ViewProfile,[[d.Nothing,Z("DES")],[d.Contact,W()],[d.Organization,_()]]]),t.push([y.ViewQuote,[[d.Nothing,Z("ALLQ")],[d.Instrument,Y("ALLQ")]]]),t.push([y.ViewResearch,[[d.Nothing,Z("BRC")],[d.Instrument,Y("BRC")]]]),{contexts:e,intents:t}})(),a=(e=>{const t=([e])=>!!(e??"").trim();return{contexts:[...e?.contexts??[]].filter(t),intents:[...e?.intents??[]].filter((([e,n])=>{const r=[...n??[]].filter(t);return!!(e??"").trim()&&r.length>0}))}})(t),i=new Map(o.contexts);a.contexts?.forEach((([e])=>{i.has(e)&&i.delete(e)})),o.contexts=Array.from(i);const s=new Map(o.intents);a.intents?.forEach((([e])=>{s.has(e)&&s.delete(e)})),o.intents=Array.from(s);const c=[...o.contexts,...a.contexts??[]],u=[...o.intents,...a.intents??[]],l=[];let p;c.length&&l.push(fin.me.interop.addContextHandler(((e,t,n,r)=>async o=>{o?!0!==o.openfinBbgApi&&(N("Context received",o),o.type!==d.Nothing?await X(e,o,t,n,r):N("Null context received, ignoring")):N("No context info provided, ignoring")})(e,c,n,r))),u.length&&u.forEach((([t,o])=>{l.push(fin.me.interop.registerIntentHandler(((e,t,n,r)=>async o=>{N("Intent received",o),t?await X(e,o.context,t,n,r):x(`No actions have been provided for intent ${o.name}, ignoring`)})(e,o,n,r),t))}));try{p=await Promise.all(l)}catch(e){const t=new InteropError("Failed to register interop handlers",e);throw R(t),t}return p},Z=e=>t=>({mnemonic:e,target:0}),_=()=>e=>{const{name:t}=e;if(t)return{mnemonic:"SEAR",target:0,tail:t};x("No valid identifier provided in context, ignoring")},X=async(e,t,n,r,o)=>{r?.(t),N("Processing context",t),n.some((([e])=>e===t.type))?await Promise.all(n.filter((([e])=>e===t.type)).map((async([,n])=>{let r;try{r=await n(t)}catch(e){const t=new ApiError("Unexpected error in context action handler",e);return R(t),void o?.(t)}try{await Q(r,e)}catch(e){const t=e instanceof ApiError?e:new ApiError(void 0,e);R(t),o?.(t)}}))):x(`No action has been defined for context type ${t.type}, ignoring`)};var ee;!function(e){e.Bloomberg="BLOOMBERG"}(ee||(ee={}));const te=async(e,t)=>{N("Creating connection",{config:t}),re(ee.Bloomberg);const n=await z(v);await n.initTerminal(e);const{actions:r,interopDisabled:o,onContextChanged:a,onError:i}=t??{},s=void 0===t?.groups?"*":t.groups,c=[];if(!0!==o){c.push(...await K(n.dispatch,r,a,i));const e=await B(n.dispatch,s,a,i);e&&c.push(e)}return{disconnect:ne(n.dispatch,c),executeApiRequest:(u=n.dispatch,async(e,t)=>{N("Executing API request",{query:e});const n={query:e};let r;t&&(n.service=t);try{r=await u(T.ExecuteRequest,n)}catch(e){const t=new AdapterError(void 0,e);throw R(t),t}if(!r.success){const e=new TerminalConnectRequestError(r.error?.message,r.error);throw R(e),e}if(!r.data){const e=new TerminalConnectRequestError("Unexpected empty response data",r);throw R(e),e}const o=JSON.parse(r.data);if("errorMessage"in o){const e=new TerminalConnectRequestError(o.errorMessage,o);throw R(e),e}return o})};// removed by dead control flow
 var u; },ne=(e,t=[])=>async()=>{N("Disconnecting");try{await Promise.all(t.map((async e=>{await e.unsubscribe()}))),await(e=>async()=>{let t;try{t=await e(T.Disconnect,null)}catch(e){const t=new AdapterError(void 0,e);throw R(t),t}if(!t.success){const e=new TerminalConnectionError("Failed to disconnect terminal",t.error);throw R(e),e}})(e)()}catch(e){const t=new ApiError("Disconnection failed",e);throw R(t),t}},re=async e=>{try{await fin.System.registerUsage({type:"integration-feature",data:{apiVersion:"2.1.0",componentName:e}})}catch(t){x(`Unable to register usage for feature ${e}: ${t?.message}`)}};var oe=t.AdapterError,ae=t.ApiError,ie=t.InitializationError,se=t.InteropError,ce=t.TerminalConnectRequestError,ue=t.TerminalConnectionError,le=t.connect,pe=t.disableLogging,de=t.enableLogging,ge=t.getSecurityFromInstrumentContext;

/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	const __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		const cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		const module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		if (!(moduleId in __webpack_modules__)) {
/******/ 			delete __webpack_module_cache__[moduleId];
/******/ 			const e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	// define getter/value functions for harmony exports
/******/ 	__webpack_require__.d = (exports, definition) => {
/******/ 		for(var key in definition) {
/******/ 			if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 				Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 			}
/******/ 		}
/******/ 	};
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop));
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = (exports) => {
/******/ 		Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/ 	
/************************************************************************/
let __webpack_exports__ = {};
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmJndGVzdC5idW5kbGUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLDhCQUE4QjtBQUMvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsb0NBQW9DO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsa0NBQWtDO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxvQ0FBb0M7O0FBRXJDO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLHVEQUF1RDtBQUN2RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLGFBQWE7QUFDYixJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1REFBdUQ7QUFDdkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtGQUFrRjtBQUNsRjtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLHNCQUFzQjtBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLFlBQVk7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQ0FBK0MsUUFBUTtBQUN2RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLCtDQUErQyxRQUFRO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSwrQ0FBK0MsUUFBUTtBQUN2RDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSwrQ0FBK0MsUUFBUTtBQUN2RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmO0FBQ0EsZUFBZTtBQUNmO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsSUFBSTtBQUNKO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLElBQUk7QUFDSjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxJQUFJO0FBQ0o7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxJQUFJO0FBQ0o7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0Isa0RBQWtEO0FBQzFFO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsb0NBQW9DOztBQUVyQztBQUNBO0FBQ0EsY0FBYywwTEFBMEw7QUFDeE07QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsc0JBQXNCO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBLElBQUk7QUFDSjtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsT0FBTztBQUMzQjtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNFQUFzRSxhQUFhO0FBQ25GO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQywwQkFBMEI7O0FBRXdiO0FBQ25kOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN6Z0RBLE9BQU8sVUFBVSwrREFBK0QsdUJBQXVCLEVBQUUsb0RBQW9ELE1BQU0sT0FBTyw2VUFBNlUsRUFBRSw2QkFBNkIsb0RBQW9ELHlGQUF5RixzQkFBc0IscUJBQXFCLG9DQUFvQyxzREFBc0QsWUFBWSwyQ0FBMkMsZ0RBQWdELFlBQVksb0NBQW9DLDBEQUEwRCxZQUFZLHNDQUFzQyxlQUFlLDBDQUEwQywrQ0FBK0MscURBQXFELFlBQVksbURBQW1ELG1EQUFtRCxZQUFZLGNBQWMsT0FBTyxjQUFjLGFBQWEsOENBQThDLElBQUksc0JBQXNCLE9BQU8sZ0JBQWdCLGdCQUFnQixPQUFPLHNCQUFzQixjQUFjLE9BQU8sdUJBQXVCLGNBQWMsT0FBTyxPQUFPLGNBQWMsZ1VBQWdVLGFBQWEsc05BQXNOLFNBQVMsZUFBZSw4WEFBOFgsU0FBUyxlQUFlLHNGQUFzRixTQUFTLGVBQWUsd0lBQXdJLFNBQVMsZUFBZSwwS0FBMEssU0FBUyxHQUFHLE1BQU0sYUFBYSxrbEJBQWtsQixTQUFTLEdBQUcsY0FBYyxPQUFPLGNBQWMsYUFBYSw4Q0FBOEMsSUFBSSxzQkFBc0IsT0FBTyxnQkFBZ0IsZ0JBQWdCLE9BQU8sc0JBQXNCLGNBQWMsT0FBTyx1QkFBdUIsY0FBYyxPQUFPLE9BQU8sTUFBTSw4QkFBOEIsYUFBYSxvZ0JBQW9nQixTQUFTLEdBQUcsWUFBWSxzQkFBc0IsdUNBQXVDLE9BQU8sa0NBQWtDLHNGQUFzRixPQUFPLGdDQUFnQyxNQUFNLGNBQWMsSUFBSSxzQkFBc0IsR0FBRyxvQkFBb0IsYUFBYSxTQUFTLEdBQUcsRUFBRSxtQkFBbUIsU0FBUyxTQUFTLHNDQUFzQyxLQUFLLFFBQVEsaUJBQWlCLFdBQVcsYUFBYSxhQUFhLEdBQUcsRUFBRSxFQUFFLElBQUksMkVBQTJFLFlBQVksdUJBQXVCLFlBQVkseUJBQXlCLFVBQVUsK0NBQStDLE9BQU8scUJBQXFCLGNBQWMsV0FBVyxtQ0FBbUMsY0FBYyxzT0FBc08sU0FBUyxlQUFlLDJEQUEyRCxTQUFTLGVBQWUsa0NBQWtDLFNBQVMsR0FBRyxxQkFBcUIsaUNBQWlDLFNBQVMsY0FBYyxvQkFBb0IsNkJBQTZCLHVCQUF1Qix3R0FBd0csZUFBZSw0QkFBNEIsd0VBQXdFLGFBQWEsV0FBVyxHQUFHLE1BQU0sSUFBSSw4QkFBOEIsU0FBUyxtQ0FBbUMsYUFBYSxlQUFlLGtFQUFrRSxhQUFhLFlBQVksNEVBQTRFLGFBQWEsTUFBTSxTQUFTLG9CQUFvQiwwQkFBMEIsMERBQTBELGFBQWEsbUJBQW1CLDRHQUE0RyxpRkFBaUYseUJBQXlCLHFCQUFxQixFQUFFLFNBQVMsaUJBQWlCLGlEQUFpRCxPQUFPLEVBQUUsRUFBRSx5QkFBeUIsRUFBRSxJQUFJLG1DQUFtQyx5QkFBeUIsMEJBQTBCLDJFQUEyRSxpQkFBaUIsZUFBZSw0QkFBNEIsd0VBQXdFLGFBQWEsV0FBVyxHQUFHLE1BQU0sSUFBSSw4QkFBOEIsU0FBUyxtQ0FBbUMsYUFBYSxlQUFlLGtFQUFrRSxhQUFhLFlBQVksNEVBQTRFLGFBQWEsTUFBTSxnQkFBZ0Isb0JBQW9CLHVCQUF1QiwwREFBMEQsY0FBYyw4QkFBOEIsc0JBQXNCLGFBQWEsK0JBQStCLGlDQUFpQyxnQkFBZ0IsRUFBRSxTQUFTLHFCQUFxQixvREFBb0Qsa0ZBQWtGLG1CQUFtQixNQUFNLG1CQUFtQixLQUFLLGFBQWEsRUFBRSxrQ0FBa0Msa0VBQWtFLFdBQVcsU0FBUyxHQUFHLE1BQU0sSUFBSSxrQ0FBa0MsU0FBUyxtQ0FBbUMsYUFBYSxlQUFlLGtFQUFrRSxhQUFhLFlBQVksNEVBQTRFLGFBQWEsTUFBTSxpQkFBaUIsb0JBQW9CLFNBQVMsV0FBVyx5Q0FBeUMsb0JBQW9CLG9CQUFvQixnQ0FBZ0MsaUJBQWlCLEVBQUUsSUFBSSxtQkFBbUIsU0FBUyxrQkFBa0IsTUFBTSxJQUFJLGtDQUFrQyxTQUFTLG1DQUFtQyxhQUFhLGVBQWUsa0VBQWtFLGNBQWMsUUFBUSxTQUFTLEtBQUssWUFBWSxvQkFBb0IsSUFBSSx1RUFBdUUsU0FBUyxtQ0FBbUMsYUFBYSxnQkFBZ0IsMEJBQTBCLHdCQUF3QixFQUFFLE1BQU0sUUFBUSx3QkFBd0IsMERBQTBELGlCQUFpQixFQUFFLDRFQUE0RSxpQkFBaUIsRUFBRSx3QkFBd0IsU0FBUyxzQkFBc0IsUUFBUSxvQkFBb0IsMEJBQTBCLHVDQUF1QyxzQkFBc0IsU0FBUyxXQUFXLGtDQUFrQyxnQkFBZ0IsYUFBYSxvQkFBb0IsMEJBQTBCLGtDQUFrQyxpRUFBaUUsZ0NBQWdDLEVBQUUsS0FBSyxtQkFBbUIseUJBQXlCLDhDQUE4Qyw0R0FBNEcscUVBQXFFLGlDQUFpQyxHQUFHLEVBQUUsTUFBTSxzQkFBc0IsSUFBSSw4R0FBOEcsTUFBTSx1QkFBdUIsb0NBQW9DLGFBQWEsb0VBQW9FLDBCQUEwQixpRkFBaUYsa0JBQWtCLG1HQUFtRywyRUFBMkUsNkRBQTZELFNBQVMsZ0pBQWdKLG1DQUFtQyxJQUFJLHdDQUF3QyxHQUFHLFNBQVMsaURBQWlELHNDQUFzQyxzQkFBc0IsRUFBRSxLQUFLLE1BQU0sS0FBSyxFQUFFLEtBQUssTUFBTSxLQUFLLEVBQUUsS0FBSyxFQUFFLDBCQUEwQixFQUFFLG1EQUFtRCxTQUFTLGlCQUFpQixxQkFBcUIsa0JBQWtCLGNBQWMsc0RBQXNELEdBQUcsMEhBQTBILDZCQUE2QixHQUFHLDRFQUE0RSxTQUFTLFVBQVUsTUFBTSxJQUFJLGdDQUFnQyxTQUFTLG1DQUFtQyxhQUFhLGVBQWUsOERBQThELGNBQWMsbUJBQW1CLFNBQVMsbUdBQW1HLGFBQWE7QUFBQSxRQUFLLENBQUMsT0FBTyxNQUFNLGtCQUFrQixpQkFBaUIsVUFBVSxvQkFBb0IsTUFBTSxtQkFBbUIsTUFBTSw0QkFBNEIsYUFBYSxNQUFNLGdDQUFnQyxHQUFHLFdBQVcsd0VBQXdFLGFBQWEsTUFBTSxrREFBa0QsYUFBYSxzQkFBc0IscURBQXFELGdEQUFnRCxhQUFhLElBQUksbURBQW1ELFFBQVEsV0FBVyxTQUFTLFVBQVUsZ0JBQWdCLHFEQUFxRCxnQkFBZ0IsTUFBTSxtQkFBbUIsR0FBRyxrQ0FBa0MsYUFBYSxhQUFhLCtCQUErQixFQUFFLEdBQUcsY0FBYyxFQUFFLEdBQUcscUJBQXFCLDhFQUE4RSxLQUFLLGlFQUFpRSxpREFBaUQsRUFBRSxxQ0FBcUMsVUFBVSxNQUFNLHdDQUF3QyxlQUFlLDRCQUE0Qiw4RUFBOEUseUhBQXlILCtCQUErQixtREFBbUQsRUFBRSwrQkFBK0IsUUFBUSw0SUFBNEksU0FBUyxJQUFJLFNBQVMsaUJBQWlCLFlBQVksRUFBRSxTQUFTLHlCQUF5QixFQUFFLGdCQUFnQixFQUFFLGVBQWUsaUJBQWlCLEVBQUUsTUFBTSxjQUFjLGlCQUFpQixFQUFFLE1BQU0sY0FBYyxZQUFZLEVBQUUsTUFBTSxXQUFXLEdBQUcsMkJBQTJCLHlEQUF5RCwwQkFBMEIsa0VBQWtFLFdBQVcsU0FBUyxHQUFHLE1BQU0sSUFBSSw4QkFBOEIsU0FBUyxtQ0FBbUMsYUFBYSxlQUFlLGtFQUFrRSxhQUFhLFdBQVcsMkJBQTJCLE1BQU0sK0hBQStILDZDQUE2QyxlQUFlLGdCQUFnQixXQUFXLFdBQVcsWUFBWSxlQUFlLFlBQVksZ0NBQWdDLHVEQUF1RCxVQUFVLGFBQWEsWUFBWSxvQ0FBb0MsK0NBQStDLG9CQUFvQixjQUFjLGdCQUFnQixvSkFBb0osTUFBTSxZQUFZLEdBQUcsT0FBTyx3Q0FBd0Msb0VBQW9FLGFBQWEsaUVBQWlFLE1BQU0sYUFBYSxnQ0FBZ0MsTUFBTSw4REFBOEQsTUFBTSxnQkFBZ0IsT0FBTyxvQ0FBb0Msb0ZBQW9GLE1BQU0seUNBQXlDLE1BQU0seUJBQXlCLFNBQVMscUJBQXFCLHNCQUFzQixNQUFNLHNCQUFzQixPQUFPLE1BQU0sd0JBQXdCLGlCQUFpQixlQUFlLEdBQUcsWUFBWSxHQUFHLGdCQUFnQixXQUFXLHdCQUF3QixnQkFBZ0IsZUFBZSxHQUFHLFlBQVksR0FBRyxnQkFBZ0IsSUFBSSx5QkFBeUIsb0NBQW9DLE1BQU0sdUNBQXVDLE1BQU0sZ0NBQWdDLGlDQUFpQyx5QkFBeUIsTUFBTSwwQkFBMEIsTUFBTSwwQkFBMEIsTUFBTSw2QkFBNkIsTUFBTSwwQkFBMEIsU0FBUyw0REFBNEQsTUFBTSxZQUFZLEdBQUcsT0FBTyx3Q0FBd0Msb2JBQW9iLHNCQUFzQixXQUFXLGdDQUFnQyxPQUFPLHNGQUFzRiw2QkFBNkIsbUNBQW1DLElBQUksMkJBQTJCLDZCQUE2QixzQkFBc0IsNEJBQTRCLDJCQUEyQiw0QkFBNEIsc0JBQXNCLDJCQUEyQixpRkFBaUYsTUFBTSx3RUFBd0UscUtBQXFLLDRDQUE0QyxrRUFBa0Usa0dBQWtHLE9BQU8sYUFBYSxlQUFlLEdBQUcsSUFBSSx1QkFBdUIsU0FBUyxrRUFBa0UsYUFBYSxTQUFTLFdBQVcsb0JBQW9CLFlBQVksTUFBTSxPQUFPLEdBQUcsWUFBWSxpQ0FBaUMsdURBQXVELHNCQUFzQixnSUFBZ0ksTUFBTSxJQUFJLGFBQWEsU0FBUyxxRUFBcUUsd0JBQXdCLElBQUksYUFBYSxTQUFTLHVEQUF1RCxhQUFhLHFEQUFxRCxPQUFPLGNBQWMsT0FBTyxhQUFhLHdCQUF3QixXQUFXLEdBQUcsc0JBQXNCLHlCQUF5QixTQUFTLG1CQUFtQixtQkFBbUIsd0JBQXdCLE1BQU0seURBQXlELE1BQU0sd0NBQXdDLFdBQVcscUNBQXFDLGtDQUFrQyxhQUFhLE9BQU8seUVBQXlFLDJCQUEyQixRQUFRLEVBQUUsU0FBUyxTQUFTLE1BQU0saUJBQWlCLElBQUksOEJBQThCLFNBQVMsbUNBQW1DLGFBQWEsZUFBZSxrRUFBa0UsYUFBYSxZQUFZLDRFQUE0RSxhQUFhLDJCQUEyQix1QkFBdUIsMERBQTBELGFBQWEsU0FBUyxHQUFHO0FBQUEsUUFBSyxDQUFDLHdCQUF3QixtQkFBbUIsSUFBSSxtQ0FBbUMsc0JBQXNCLHVCQUF1QixNQUFNLElBQUksNkJBQTZCLFNBQVMsbUNBQW1DLGFBQWEsZUFBZSw2RUFBNkUsY0FBYyxPQUFPLFNBQVMsK0NBQStDLGNBQWMsY0FBYyxJQUFJLGdDQUFnQyxpQ0FBaUMsb0NBQW9DLEVBQUUsU0FBUywwQ0FBMEMsRUFBRSxJQUFJLFdBQVcsS0FBSyx1Tzs7Ozs7O1VDQTk5bUI7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7OztVQzVCQTtVQUNBO1VBQ0E7VUFDQTtVQUNBLHlDQUF5Qyx3Q0FBd0M7VUFDakY7VUFDQTtVQUNBLEU7OztVQ1BBLHlGOzs7VUNBQTtVQUNBO1VBQ0Esc0RBQXNELGlCQUFpQjtVQUN2RSxnREFBZ0QsYUFBYTtVQUM3RCxFOzs7Ozs7Ozs7Ozs7QUNKb0M7QUFRUjtBQUc1QixJQUFJLGFBQThDLENBQUM7QUFFbkQsSUFBSSxrQkFBa0IsR0FBVyxFQUFFLENBQUM7QUFDcEMsSUFBSSxtQkFBbUIsR0FBVyxFQUFFLENBQUM7QUFDckMsSUFBSSxnQkFBZ0IsR0FBVyxFQUFFLENBQUM7QUFDbEMsSUFBSSxXQUFXLEdBQVcsRUFBRSxDQUFDO0FBRTdCLElBQUksVUFBb0MsQ0FBQztBQUN6QyxJQUFJLGFBQXVDLENBQUM7QUFDNUMsSUFBSSxZQUFzQyxDQUFDO0FBQzNDLElBQUksUUFBa0MsQ0FBQztBQUN2QyxJQUFJLGlCQUEyQyxDQUFDO0FBQ2hELElBQUksa0JBQTRDLENBQUM7QUFDakQsSUFBSSxTQUFnQyxDQUFDO0FBRXJDLE1BQU0sT0FBTyxHQUFHLEVBQUUsQ0FBQztBQUVuQixNQUFNLE1BQU0sR0FBOEI7SUFDekMsZ0JBQWdCLEVBQUUsQ0FBQyxPQUFPLEVBQUUsRUFBRTtRQUM3QixjQUFjLENBQUMscUJBQXFCLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ2hFLENBQUM7SUFDRCxPQUFPLEVBQUUsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDO0lBQ2pELE1BQU0sRUFBRSxDQUFDLFNBQVMsQ0FBQztJQUNuQixlQUFlLEVBQUUsS0FBSztJQUN0QixPQUFPLEVBQUU7UUFDUixRQUFRLEVBQUU7WUFDVDtnQkFDQyxxREFBaUIsQ0FBQyxVQUFVO2dCQUM1QixDQUFDLE9BQU8sRUFBb0MsRUFBRTtvQkFDN0MsNEdBQTRHO29CQUM1RyxNQUFNLFFBQVEsR0FBRyxvRkFBZ0MsQ0FBQyxPQUFPLENBQUMsQ0FBQztvQkFDM0QsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO3dCQUNmLE9BQU87b0JBQ1IsQ0FBQztvQkFDRCxjQUFjLENBQUMsZ0NBQWdDLFFBQVEsRUFBRSxDQUFDLENBQUM7b0JBRTNELHdGQUF3RjtvQkFDeEYsT0FBTzt3QkFDTixLQUFLLEVBQUUsU0FBUzt3QkFDaEIsUUFBUTtxQkFDZ0IsQ0FBQztnQkFDM0IsQ0FBQzthQUNEO1NBQ0Q7S0FDRDtDQUNELENBQUM7QUFFRixNQUFNLENBQUMsZ0JBQWdCLENBQUMsa0JBQWtCLEVBQUUsS0FBSyxJQUFJLEVBQUU7SUFDdEQsb0NBQW9DO0lBQ3BDLGlFQUFhLEVBQUUsQ0FBQztJQUVoQiwrQkFBK0I7SUFDL0IsYUFBYSxFQUFFLENBQUM7QUFDakIsQ0FBQyxDQUFDLENBQUM7QUFFSDs7R0FFRztBQUNILFNBQVMsYUFBYTtJQUNyQixVQUFVLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBb0IsYUFBYSxDQUFDLENBQUM7SUFDdEUsYUFBYSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQW9CLGdCQUFnQixDQUFDLENBQUM7SUFDNUUsWUFBWSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQW9CLFdBQVcsQ0FBQyxDQUFDO0lBQ3RFLFFBQVEsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFvQixXQUFXLENBQUMsQ0FBQztJQUNsRSxpQkFBaUIsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFvQixhQUFhLENBQUMsQ0FBQztJQUM3RSxrQkFBa0IsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFvQixjQUFjLENBQUMsQ0FBQztJQUMvRSxTQUFTLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBaUIsWUFBWSxDQUFDLENBQUM7SUFFakUsSUFBSSxVQUFVLEVBQUUsQ0FBQztRQUNoQixVQUFVLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLEtBQUssSUFBSSxFQUFFO1lBQy9DLElBQUksVUFBVSxFQUFFLENBQUM7Z0JBQ2hCLFVBQVUsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1lBQzVCLENBQUM7WUFDRCxNQUFNLG9CQUFvQixFQUFFLENBQUM7WUFDN0IsV0FBVyxFQUFFLENBQUM7UUFDZixDQUFDLENBQUMsQ0FBQztJQUNKLENBQUM7SUFDRCxJQUFJLGFBQWEsRUFBRSxDQUFDO1FBQ25CLGFBQWEsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsS0FBSyxJQUFJLEVBQUU7WUFDbEQsSUFBSSxhQUFhLEVBQUUsQ0FBQztnQkFDbkIsYUFBYSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7WUFDL0IsQ0FBQztZQUNELE1BQU0seUJBQXlCLEVBQUUsQ0FBQztZQUNsQyxXQUFXLEVBQUUsQ0FBQztRQUNmLENBQUMsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQUNELElBQUksWUFBWSxFQUFFLENBQUM7UUFDbEIsWUFBWSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxTQUFTLENBQUMsQ0FBQztJQUNuRCxDQUFDO0lBQ0QsSUFBSSxRQUFRLEVBQUUsQ0FBQztRQUNkLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztJQUN0RCxDQUFDO0lBRUQsSUFBSSxpQkFBaUIsRUFBRSxDQUFDO1FBQ3ZCLGlCQUFpQixDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxDQUFDLEtBQUssRUFBRSxFQUFFO1lBQ3RELElBQUksaUJBQWlCLEVBQUUsS0FBSyxFQUFFLENBQUM7Z0JBQzlCLElBQUksUUFBUSxFQUFFLENBQUM7b0JBQ2QsUUFBUSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7Z0JBQzFCLENBQUM7Z0JBQ0QsUUFBUSxpQkFBaUIsRUFBRSxLQUFLLEVBQUUsQ0FBQztvQkFDbEMsS0FBSyxXQUFXO3dCQUNmLGNBQWMsQ0FDYixtR0FBbUcsQ0FDbkcsQ0FBQzt3QkFDRixrQkFBa0IsR0FBRyxXQUFXLENBQUM7d0JBQ2pDLGdCQUFnQixHQUFHLGlCQUFpQixDQUFDO3dCQUNyQyxXQUFXLEdBQUcsSUFBSSxDQUFDO3dCQUNuQixjQUFjLENBQUMsa0JBQWtCLEVBQUU7NEJBQ2xDO2dDQUNDLEtBQUssRUFBRSxNQUFNO2dDQUNiLEtBQUssRUFBRSxhQUFhOzZCQUNwQjs0QkFDRDtnQ0FDQyxLQUFLLEVBQUUsTUFBTTtnQ0FDYixLQUFLLEVBQUUsV0FBVzs2QkFDbEI7NEJBQ0Q7Z0NBQ0MsS0FBSyxFQUFFLEtBQUs7Z0NBQ1osS0FBSyxFQUFFLEtBQUs7NkJBQ1o7eUJBQ0QsQ0FBQyxDQUFDO3dCQUNILE1BQU07b0JBQ1AsS0FBSyxhQUFhO3dCQUNqQixjQUFjLENBQ2IsbUdBQW1HLENBQ25HLENBQUM7d0JBQ0Ysa0JBQWtCLEdBQUcsYUFBYSxDQUFDO3dCQUNuQyxnQkFBZ0IsR0FBRyxjQUFjLENBQUM7d0JBQ2xDLFdBQVcsR0FBRyxLQUFLLENBQUM7d0JBQ3BCLGNBQWMsQ0FBQyxrQkFBa0IsRUFBRTs0QkFDbEM7Z0NBQ0MsS0FBSyxFQUFFLHFCQUFxQjtnQ0FDNUIsS0FBSyxFQUFFLHFCQUFxQjs2QkFDNUI7NEJBQ0Q7Z0NBQ0MsS0FBSyxFQUFFLGVBQWU7Z0NBQ3RCLEtBQUssRUFBRSxlQUFlOzZCQUN0Qjs0QkFDRDtnQ0FDQyxLQUFLLEVBQUUsYUFBYTtnQ0FDcEIsS0FBSyxFQUFFLGFBQWE7NkJBQ3BCO3lCQUNELENBQUMsQ0FBQzt3QkFDSCxNQUFNO29CQUNQLEtBQUssZ0JBQWdCO3dCQUNwQixjQUFjLENBQ2IseUdBQXlHLENBQ3pHLENBQUM7d0JBQ0Ysa0JBQWtCLEdBQUcsZ0JBQWdCLENBQUM7d0JBQ3RDLGdCQUFnQixHQUFHLGlCQUFpQixDQUFDO3dCQUNyQyxXQUFXLEdBQUcsS0FBSyxDQUFDO3dCQUNwQixjQUFjLENBQUMsa0JBQWtCLEVBQUU7NEJBQ2xDO2dDQUNDLEtBQUssRUFBRSxNQUFNO2dDQUNiLEtBQUssRUFBRSxhQUFhOzZCQUNwQjs0QkFDRDtnQ0FDQyxLQUFLLEVBQUUsTUFBTTtnQ0FDYixLQUFLLEVBQUUsV0FBVzs2QkFDbEI7NEJBQ0Q7Z0NBQ0MsS0FBSyxFQUFFLEtBQUs7Z0NBQ1osS0FBSyxFQUFFLEtBQUs7NkJBQ1o7eUJBQ0QsQ0FBQyxDQUFDO3dCQUNILE1BQU07b0JBQ1AsS0FBSyxXQUFXO3dCQUNmLGNBQWMsQ0FDYixrR0FBa0csQ0FDbEcsQ0FBQzt3QkFDRixrQkFBa0IsR0FBRyxXQUFXLENBQUM7d0JBQ2pDLGdCQUFnQixHQUFHLGlCQUFpQixDQUFDO3dCQUNyQyxXQUFXLEdBQUcsR0FBRyxDQUFDO3dCQUNsQixjQUFjLENBQUMsa0JBQWtCLEVBQUU7NEJBQ2xDO2dDQUNDLEtBQUssRUFBRSxNQUFNO2dDQUNiLEtBQUssRUFBRSxhQUFhOzZCQUNwQjs0QkFDRDtnQ0FDQyxLQUFLLEVBQUUsTUFBTTtnQ0FDYixLQUFLLEVBQUUsV0FBVzs2QkFDbEI7NEJBQ0Q7Z0NBQ0MsS0FBSyxFQUFFLEtBQUs7Z0NBQ1osS0FBSyxFQUFFLEtBQUs7NkJBQ1o7eUJBQ0QsQ0FBQyxDQUFDO3dCQUNILE1BQU07Z0JBQ1IsQ0FBQztnQkFDRCxXQUFXLEVBQUUsQ0FBQztZQUNmLENBQUM7UUFDRixDQUFDLENBQUMsQ0FBQztJQUNKLENBQUM7SUFFRCxJQUFJLGtCQUFrQixFQUFFLENBQUM7UUFDeEIsa0JBQWtCLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLEdBQUcsRUFBRTtZQUNsRCxJQUFJLGtCQUFrQixFQUFFLENBQUM7Z0JBQ3hCLG1CQUFtQixHQUFHLGtCQUFrQixDQUFDLEtBQUssQ0FBQztnQkFDL0MsSUFBSSxtQkFBbUIsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUM7b0JBQ3BDLGNBQWMsQ0FDYixXQUFXLGtCQUFrQixXQUFXLGdCQUFnQixtQkFBbUIsV0FBVyxtQkFBbUIsbUJBQW1CLEVBQUUsQ0FDOUgsQ0FBQztnQkFDSCxDQUFDO2dCQUNELFdBQVcsRUFBRSxDQUFDO1lBQ2YsQ0FBQztRQUNGLENBQUMsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQUVELFdBQVcsRUFBRSxDQUFDO0FBQ2YsQ0FBQztBQUVEOztHQUVHO0FBQ0gsS0FBSyxVQUFVLG9CQUFvQjtJQUNsQyxJQUFJLENBQUM7UUFDSixjQUFjLENBQUMsb0NBQW9DLENBQUMsQ0FBQztRQUVyRCxhQUFhLEdBQUcsTUFBTSwyREFBTyxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FBQztRQUMvQyxjQUFjLENBQUMsdUJBQXVCLENBQUMsQ0FBQztJQUN6QyxDQUFDO0lBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQztRQUNoQixhQUFhLEdBQUcsU0FBUyxDQUFDO1FBQzFCLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDbkIsY0FBYyxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQ3RDLENBQUM7QUFDRixDQUFDO0FBRUQ7O0dBRUc7QUFDSCxLQUFLLFVBQVUseUJBQXlCO0lBQ3ZDLElBQUksYUFBYSxFQUFFLENBQUM7UUFDbkIsSUFBSSxDQUFDO1lBQ0osY0FBYyxDQUFDLHVDQUF1QyxDQUFDLENBQUM7WUFDeEQsTUFBTSxhQUFhLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDbEMsQ0FBQztnQkFBUyxDQUFDO1lBQ1YsYUFBYSxHQUFHLFNBQVMsQ0FBQztZQUMxQixjQUFjLENBQUMsc0NBQXNDLENBQUMsQ0FBQztRQUN4RCxDQUFDO0lBQ0YsQ0FBQztBQUNGLENBQUM7QUFFRDs7R0FFRztBQUNILEtBQUssVUFBVSxnQkFBZ0I7SUFDOUIsSUFBSSxhQUFhLEVBQUUsQ0FBQztRQUNuQixJQUFJLENBQUM7WUFDSixjQUFjLENBQ2IsV0FBVyxrQkFBa0IsV0FBVyxnQkFBZ0IsbUJBQW1CLFdBQVcsbUJBQW1CLG1CQUFtQixFQUFFLENBQzlILENBQUM7WUFFRixJQUFJLE1BQXNCLENBQUM7WUFFM0IsUUFBUSxrQkFBa0IsRUFBRSxDQUFDO2dCQUM1QixLQUFLLGFBQWE7b0JBQ2pCLE1BQU0sR0FBRzt3QkFDUixJQUFJLEVBQUUsa0JBQWtCO3dCQUN4QixPQUFPLEVBQUU7NEJBQ1IsSUFBSSxFQUFFLGdCQUFnQjs0QkFDdEIsSUFBSSxFQUFFLG1CQUFtQjs0QkFDekIsRUFBRSxFQUFFLEVBQUU7eUJBQ047cUJBQ0QsQ0FBQztvQkFDRixNQUFNO2dCQUNQO29CQUNDLE1BQU0sR0FBRzt3QkFDUixJQUFJLEVBQUUsa0JBQWtCO3dCQUN4QixPQUFPLEVBQUU7NEJBQ1IsSUFBSSxFQUFFLGdCQUFnQjs0QkFDdEIsRUFBRSxFQUFFO2dDQUNILE1BQU0sRUFBRSxtQkFBbUI7NkJBQzNCO3lCQUNEO3FCQUNELENBQUM7b0JBQ0YsTUFBTTtZQUNSLENBQUM7WUFFRCxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN6QyxDQUFDO1FBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQztZQUNoQixjQUFjLENBQUMsdUNBQXVDLGFBQWEsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDL0UsQ0FBQztJQUNGLENBQUM7U0FBTSxDQUFDO1FBQ1AsY0FBYyxDQUFDLG9GQUFvRixDQUFDLENBQUM7SUFDdEcsQ0FBQztBQUNGLENBQUM7QUFFRDs7R0FFRztBQUNILFNBQVMsV0FBVztJQUNuQixNQUFNLFdBQVcsR0FBRyxhQUFhLEtBQUssU0FBUyxDQUFDO0lBQ2hELElBQUksVUFBVSxFQUFFLENBQUM7UUFDaEIsVUFBVSxDQUFDLFFBQVEsR0FBRyxXQUFXLENBQUM7SUFDbkMsQ0FBQztJQUNELElBQUksYUFBYSxFQUFFLENBQUM7UUFDbkIsYUFBYSxDQUFDLFFBQVEsR0FBRyxDQUFDLFdBQVcsQ0FBQztJQUN2QyxDQUFDO0lBQ0QsSUFBSSxpQkFBaUIsRUFBRSxDQUFDO1FBQ3ZCLGlCQUFpQixDQUFDLFFBQVEsR0FBRyxDQUFDLFdBQVcsQ0FBQztJQUMzQyxDQUFDO0lBQ0QsSUFBSSxrQkFBa0IsRUFBRSxDQUFDO1FBQ3hCLGtCQUFrQixDQUFDLFFBQVEsR0FBRyxDQUFDLFdBQVcsSUFBSSxrQkFBa0IsQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDO0lBQy9FLENBQUM7SUFDRCxJQUFJLFFBQVEsRUFBRSxDQUFDO1FBQ2QsUUFBUSxDQUFDLFFBQVEsR0FBRyxDQUFDLFdBQVcsSUFBSSxtQkFBbUIsQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDO0lBQ3RFLENBQUM7QUFDRixDQUFDO0FBRUQ7OztHQUdHO0FBQ0gsU0FBUyxjQUFjLENBQUMsSUFBWTtJQUNuQyxJQUFJLFNBQVMsRUFBRSxDQUFDO1FBQ2YsU0FBUyxDQUFDLFdBQVcsR0FBRyxHQUFHLFNBQVMsQ0FBQyxXQUFXLEdBQUcsSUFBSSxNQUFNLENBQUM7UUFDOUQsU0FBUyxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUMsWUFBWSxDQUFDO0lBQzlDLENBQUM7QUFDRixDQUFDO0FBRUQ7Ozs7R0FJRztBQUNILFNBQVMsYUFBYSxDQUFDLEdBQVk7SUFDbEMsSUFBSSxHQUFHLFlBQVksS0FBSyxFQUFFLENBQUM7UUFDMUIsT0FBTyxHQUFHLENBQUMsT0FBTyxDQUFDO0lBQ3BCLENBQUM7U0FBTSxJQUFJLE9BQU8sR0FBRyxLQUFLLFFBQVEsRUFBRSxDQUFDO1FBQ3BDLE9BQU8sR0FBRyxDQUFDO0lBQ1osQ0FBQztJQUVELE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUM1QixDQUFDO0FBRUQ7O0dBRUc7QUFDSCxTQUFTLFNBQVM7SUFDakIsSUFBSSxTQUFTLEVBQUUsQ0FBQztRQUNmLFNBQVMsQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFDO1FBQzNCLFNBQVMsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDO0lBQ3pCLENBQUM7QUFDRixDQUFDO0FBRUQ7Ozs7R0FJRztBQUNILFNBQVMsY0FBYyxDQUFDLE1BQWdDLEVBQUUsTUFBMEM7SUFDbkcsSUFBSSxNQUFNLEVBQUUsQ0FBQztRQUNaLE1BQU0sQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO1FBQ3RCLE1BQU0sR0FBRyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDN0MsR0FBRyxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7UUFDZixHQUFHLENBQUMsSUFBSSxHQUFHLHFCQUFxQixDQUFDO1FBQ2pDLEdBQUcsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLEdBQUcsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFbkIsS0FBSyxNQUFNLEdBQUcsSUFBSSxNQUFNLEVBQUUsQ0FBQztZQUMxQixNQUFNLE1BQU0sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ2hELE1BQU0sQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQztZQUN6QixNQUFNLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUM7WUFDeEIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN2QixDQUFDO0lBQ0YsQ0FBQztBQUNGLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9pbnRlZ3JhdGUtd2l0aC1ibG9vbWJlcmctYmFzaWMvLi4vLi4vbm9kZV9tb2R1bGVzL0BmaW5vcy9mZGMzL2Rpc3QvZmRjMy5lc20uanMiLCJ3ZWJwYWNrOi8vaW50ZWdyYXRlLXdpdGgtYmxvb21iZXJnLWJhc2ljLy4uLy4uL25vZGVfbW9kdWxlcy9Ab3BlbmZpbi9ibG9vbWJlcmcvb3BlbmZpbi5ibG9vbWJlcmcubWpzIiwid2VicGFjazovL2ludGVncmF0ZS13aXRoLWJsb29tYmVyZy1iYXNpYy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9pbnRlZ3JhdGUtd2l0aC1ibG9vbWJlcmctYmFzaWMvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2ludGVncmF0ZS13aXRoLWJsb29tYmVyZy1iYXNpYy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2ludGVncmF0ZS13aXRoLWJsb29tYmVyZy1iYXNpYy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2ludGVncmF0ZS13aXRoLWJsb29tYmVyZy1iYXNpYy8uL2NsaWVudC9zcmMvYmJndGVzdC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcclxuICogQ29weXJpZ2h0IEZJTk9TIEZEQzMgY29udHJpYnV0b3JzIC0gc2VlIE5PVElDRSBmaWxlXHJcbiAqL1xuLyoqIENvbnN0YW50cyByZXByZXNlbnRpbmcgdGhlIGVycm9ycyB0aGF0IGNhbiBiZSBlbmNvdW50ZXJlZCB3aGVuIGNhbGxpbmcgdGhlIGBvcGVuYCBtZXRob2Qgb24gdGhlIERlc2t0b3BBZ2VudCBvYmplY3QgKGBmZGMzYCkuICovXG52YXIgT3BlbkVycm9yO1xuKGZ1bmN0aW9uIChPcGVuRXJyb3IpIHtcbiAgLyoqIFJldHVybmVkIGlmIHRoZSBzcGVjaWZpZWQgYXBwbGljYXRpb24gaXMgbm90IGZvdW5kLiovXG4gIE9wZW5FcnJvcltcIkFwcE5vdEZvdW5kXCJdID0gXCJBcHBOb3RGb3VuZFwiO1xuICAvKiogUmV0dXJuZWQgaWYgdGhlIHNwZWNpZmllZCBhcHBsaWNhdGlvbiBmYWlscyB0byBsYXVuY2ggY29ycmVjdGx5LiovXG4gIE9wZW5FcnJvcltcIkVycm9yT25MYXVuY2hcIl0gPSBcIkVycm9yT25MYXVuY2hcIjtcbiAgLyoqIFJldHVybmVkIGlmIHRoZSBzcGVjaWZpZWQgYXBwbGljYXRpb24gbGF1bmNoZXMgYnV0IGZhaWxzIHRvIGFkZCBhIGNvbnRleHQgbGlzdGVuZXIgaW4gb3JkZXIgdG8gcmVjZWl2ZSB0aGUgY29udGV4dCBwYXNzZWQgdG8gdGhlIGBmZGMzLm9wZW5gIGNhbGwuKi9cbiAgT3BlbkVycm9yW1wiQXBwVGltZW91dFwiXSA9IFwiQXBwVGltZW91dFwiO1xuICAvKiogUmV0dXJuZWQgaWYgdGhlIEZEQzMgZGVza3RvcCBhZ2VudCBpbXBsZW1lbnRhdGlvbiBpcyBub3QgY3VycmVudGx5IGFibGUgdG8gaGFuZGxlIHRoZSByZXF1ZXN0LiovXG4gIE9wZW5FcnJvcltcIlJlc29sdmVyVW5hdmFpbGFibGVcIl0gPSBcIlJlc29sdmVyVW5hdmFpbGFibGVcIjtcbiAgLyoqIFJldHVybmVkIGlmIGEgY2FsbCB0byB0aGUgYG9wZW5gIGZ1bmN0aW9uIGlzIG1hZGUgd2l0aCBhbiBpbnZhbGlkIGNvbnRleHQgYXJndW1lbnQuIENvbnRleHRzIHNob3VsZCBiZSBPYmplY3RzIHdpdGggYXQgbGVhc3QgYSBgdHlwZWAgZmllbGQgdGhhdCBoYXMgYSBgc3RyaW5nYCB2YWx1ZS4qL1xuICBPcGVuRXJyb3JbXCJNYWxmb3JtZWRDb250ZXh0XCJdID0gXCJNYWxmb3JtZWRDb250ZXh0XCI7XG59KShPcGVuRXJyb3IgfHwgKE9wZW5FcnJvciA9IHt9KSk7XG4vKiogQ29uc3RhbnRzIHJlcHJlc2VudGluZyB0aGUgZXJyb3JzIHRoYXQgY2FuIGJlIGVuY291bnRlcmVkIHdoZW4gY2FsbGluZyB0aGUgYGZpbmRJbnRlbnRgLCBgZmluZEludGVudHNCeUNvbnRleHRgLCBgcmFpc2VJbnRlbnRgIG9yIGByYWlzZUludGVudEZvckNvbnRleHRgIG1ldGhvZHMgb24gdGhlIERlc2t0b3BBZ2VudCAoYGZkYzNgKS4gKi9cbnZhciBSZXNvbHZlRXJyb3I7XG4oZnVuY3Rpb24gKFJlc29sdmVFcnJvcikge1xuICAvKiogU0hPVUxEIGJlIHJldHVybmVkIGlmIG5vIGFwcHMgYXJlIGF2YWlsYWJsZSB0aGF0IGNhbiByZXNvbHZlIHRoZSBpbnRlbnQgYW5kIGNvbnRleHQgY29tYmluYXRpb24uKi9cbiAgUmVzb2x2ZUVycm9yW1wiTm9BcHBzRm91bmRcIl0gPSBcIk5vQXBwc0ZvdW5kXCI7XG4gIC8qKiBSZXR1cm5lZCBpZiB0aGUgRkRDMyBkZXNrdG9wIGFnZW50IGltcGxlbWVudGF0aW9uIGlzIG5vdCBjdXJyZW50bHkgYWJsZSB0byBoYW5kbGUgdGhlIHJlcXVlc3QuKi9cbiAgUmVzb2x2ZUVycm9yW1wiUmVzb2x2ZXJVbmF2YWlsYWJsZVwiXSA9IFwiUmVzb2x2ZXJVbmF2YWlsYWJsZVwiO1xuICAvKiogUmV0dXJuZWQgaWYgdGhlIHVzZXIgY2FuY2VsbGVkIHRoZSByZXNvbHV0aW9uIHJlcXVlc3QsIGZvciBleGFtcGxlIGJ5IGNsb3Npbmcgb3IgY2FuY2VsbGluZyBhIHJlc29sdmVyIFVJLiovXG4gIFJlc29sdmVFcnJvcltcIlVzZXJDYW5jZWxsZWRcIl0gPSBcIlVzZXJDYW5jZWxsZWRSZXNvbHV0aW9uXCI7XG4gIC8qKiBTSE9VTEQgYmUgcmV0dXJuZWQgaWYgYSB0aW1lb3V0IGNhbmNlbHMgYW4gaW50ZW50IHJlc29sdXRpb24gdGhhdCByZXF1aXJlZCB1c2VyIGludGVyYWN0aW9uLiBQbGVhc2UgdXNlIGBSZXNvbHZlclVuYXZhaWxhYmxlYCBpbnN0ZWFkIGZvciBzaXR1YXRpb25zIHdoZXJlIGEgcmVzb2x2ZXIgVUkgb3Igc2ltaWxhciBmYWlscy4qL1xuICBSZXNvbHZlRXJyb3JbXCJSZXNvbHZlclRpbWVvdXRcIl0gPSBcIlJlc29sdmVyVGltZW91dFwiO1xuICAvKiogUmV0dXJuZWQgaWYgYSBzcGVjaWZpZWQgdGFyZ2V0IGFwcGxpY2F0aW9uIGlzIG5vdCBhdmFpbGFibGUgb3IgYSBuZXcgaW5zdGFuY2Ugb2YgaXQgY2Fubm90IGJlIG9wZW5lZC4gKi9cbiAgUmVzb2x2ZUVycm9yW1wiVGFyZ2V0QXBwVW5hdmFpbGFibGVcIl0gPSBcIlRhcmdldEFwcFVuYXZhaWxhYmxlXCI7XG4gIC8qKiBSZXR1cm5lZCBpZiBhIHNwZWNpZmllZCB0YXJnZXQgYXBwbGljYXRpb24gaW5zdGFuY2UgaXMgbm90IGF2YWlsYWJsZSwgZm9yIGV4YW1wbGUgYmVjYXVzZSBpdCBoYXMgYmVlbiBjbG9zZWQuICovXG4gIFJlc29sdmVFcnJvcltcIlRhcmdldEluc3RhbmNlVW5hdmFpbGFibGVcIl0gPSBcIlRhcmdldEluc3RhbmNlVW5hdmFpbGFibGVcIjtcbiAgLyoqIFJldHVybmVkIGlmIHRoZSBpbnRlbnQgYW5kIGNvbnRleHQgY291bGQgbm90IGJlIGRlbGl2ZXJlZCB0byB0aGUgc2VsZWN0ZWQgYXBwbGljYXRpb24gb3IgaW5zdGFuY2UsIGZvciBleGFtcGxlIGJlY2F1c2UgaXQgaGFzIG5vdCBhZGRlZCBhbiBpbnRlbnQgaGFuZGxlciB3aXRoaW4gYSB0aW1lb3V0LiovXG4gIFJlc29sdmVFcnJvcltcIkludGVudERlbGl2ZXJ5RmFpbGVkXCJdID0gXCJJbnRlbnREZWxpdmVyeUZhaWxlZFwiO1xuICAvKiogUmV0dXJuZWQgaWYgYSBjYWxsIHRvIG9uZSBvZiB0aGUgYHJhaXNlSW50ZW50YCBmdW5jdGlvbnMgaXMgbWFkZSB3aXRoIGFuIGludmFsaWQgY29udGV4dCBhcmd1bWVudC4gQ29udGV4dHMgc2hvdWxkIGJlIE9iamVjdHMgd2l0aCBhdCBsZWFzdCBhIGB0eXBlYCBmaWVsZCB0aGF0IGhhcyBhIGBzdHJpbmdgIHZhbHVlLiovXG4gIFJlc29sdmVFcnJvcltcIk1hbGZvcm1lZENvbnRleHRcIl0gPSBcIk1hbGZvcm1lZENvbnRleHRcIjtcbn0pKFJlc29sdmVFcnJvciB8fCAoUmVzb2x2ZUVycm9yID0ge30pKTtcbnZhciBSZXN1bHRFcnJvcjtcbihmdW5jdGlvbiAoUmVzdWx0RXJyb3IpIHtcbiAgLyoqIFJldHVybmVkIGlmIHRoZSBpbnRlbnQgaGFuZGxlciBleGl0ZWQgd2l0aG91dCByZXR1cm5pbmcgYSB2YWxpZCByZXN1bHQgKGEgcHJvbWlzZSByZXNvbHZpbmcgdG8gYSBDb250ZXh0LCBDaGFubmVsIG9iamVjdCBvciB2b2lkKS4gKi9cbiAgUmVzdWx0RXJyb3JbXCJOb1Jlc3VsdFJldHVybmVkXCJdID0gXCJOb1Jlc3VsdFJldHVybmVkXCI7XG4gIC8qKiBSZXR1cm5lZCBpZiB0aGUgSW50ZW50IGhhbmRsZXIgZnVuY3Rpb24gcHJvY2Vzc2luZyB0aGUgcmFpc2VkIGludGVudCB0aHJvd3MgYW4gZXJyb3Igb3IgcmVqZWN0cyB0aGUgUHJvbWlzZSBpdCByZXR1cm5lZC4gKi9cbiAgUmVzdWx0RXJyb3JbXCJJbnRlbnRIYW5kbGVyUmVqZWN0ZWRcIl0gPSBcIkludGVudEhhbmRsZXJSZWplY3RlZFwiO1xufSkoUmVzdWx0RXJyb3IgfHwgKFJlc3VsdEVycm9yID0ge30pKTtcbnZhciBDaGFubmVsRXJyb3I7XG4oZnVuY3Rpb24gKENoYW5uZWxFcnJvcikge1xuICAvKiogUmV0dXJuZWQgaWYgdGhlIHNwZWNpZmllZCBjaGFubmVsIGlzIG5vdCBmb3VuZCB3aGVuIGF0dGVtcHRpbmcgdG8gam9pbiBhIGNoYW5uZWwgdmlhIHRoZSBgam9pblVzZXJDaGFubmVsYCBmdW5jdGlvbiAgb2YgdGhlIERlc2t0b3BBZ2VudCAoYGZkYzNgKS4qL1xuICBDaGFubmVsRXJyb3JbXCJOb0NoYW5uZWxGb3VuZFwiXSA9IFwiTm9DaGFubmVsRm91bmRcIjtcbiAgLyoqIFNIT1VMRCBiZSByZXR1cm5lZCB3aGVuIGEgcmVxdWVzdCB0byBqb2luIGEgdXNlciBjaGFubmVsIG9yIHRvIGEgcmV0cmlldmUgYSBDaGFubmVsIG9iamVjdCB2aWEgdGhlIGBqb2luVXNlckNoYW5uZWxgIG9yIGBnZXRPckNyZWF0ZUNoYW5uZWxgIG1ldGhvZHMgb2YgdGhlIERlc2t0b3BBZ2VudCAoYGZkYzNgKSBvYmplY3QgaXMgZGVuaWVkLiAqL1xuICBDaGFubmVsRXJyb3JbXCJBY2Nlc3NEZW5pZWRcIl0gPSBcIkFjY2Vzc0RlbmllZFwiO1xuICAvKiogU0hPVUxEIGJlIHJldHVybmVkIHdoZW4gYSBjaGFubmVsIGNhbm5vdCBiZSBjcmVhdGVkIG9yIHJldHJpZXZlZCB2aWEgdGhlIGBnZXRPckNyZWF0ZUNoYW5uZWxgIG1ldGhvZCBvZiB0aGUgRGVza3RvcEFnZW50IChgZmRjM2ApLiovXG4gIENoYW5uZWxFcnJvcltcIkNyZWF0aW9uRmFpbGVkXCJdID0gXCJDcmVhdGlvbkZhaWxlZFwiO1xuICAvKiogUmV0dXJuZWQgaWYgYSBjYWxsIHRvIHRoZSBgYnJvYWRjYXN0YCBmdW5jdGlvbnMgaXMgbWFkZSB3aXRoIGFuIGludmFsaWQgY29udGV4dCBhcmd1bWVudC4gQ29udGV4dHMgc2hvdWxkIGJlIE9iamVjdHMgd2l0aCBhdCBsZWFzdCBhIGB0eXBlYCBmaWVsZCB0aGF0IGhhcyBhIGBzdHJpbmdgIHZhbHVlLiovXG4gIENoYW5uZWxFcnJvcltcIk1hbGZvcm1lZENvbnRleHRcIl0gPSBcIk1hbGZvcm1lZENvbnRleHRcIjtcbn0pKENoYW5uZWxFcnJvciB8fCAoQ2hhbm5lbEVycm9yID0ge30pKTtcblxuZnVuY3Rpb24gX3JlZ2VuZXJhdG9yUnVudGltZSgpIHtcbiAgX3JlZ2VuZXJhdG9yUnVudGltZSA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gZXhwb3J0cztcbiAgfTtcbiAgdmFyIGV4cG9ydHMgPSB7fSxcbiAgICBPcCA9IE9iamVjdC5wcm90b3R5cGUsXG4gICAgaGFzT3duID0gT3AuaGFzT3duUHJvcGVydHksXG4gICAgZGVmaW5lUHJvcGVydHkgPSBPYmplY3QuZGVmaW5lUHJvcGVydHkgfHwgZnVuY3Rpb24gKG9iaiwga2V5LCBkZXNjKSB7XG4gICAgICBvYmpba2V5XSA9IGRlc2MudmFsdWU7XG4gICAgfSxcbiAgICAkU3ltYm9sID0gXCJmdW5jdGlvblwiID09IHR5cGVvZiBTeW1ib2wgPyBTeW1ib2wgOiB7fSxcbiAgICBpdGVyYXRvclN5bWJvbCA9ICRTeW1ib2wuaXRlcmF0b3IgfHwgXCJAQGl0ZXJhdG9yXCIsXG4gICAgYXN5bmNJdGVyYXRvclN5bWJvbCA9ICRTeW1ib2wuYXN5bmNJdGVyYXRvciB8fCBcIkBAYXN5bmNJdGVyYXRvclwiLFxuICAgIHRvU3RyaW5nVGFnU3ltYm9sID0gJFN5bWJvbC50b1N0cmluZ1RhZyB8fCBcIkBAdG9TdHJpbmdUYWdcIjtcbiAgZnVuY3Rpb24gZGVmaW5lKG9iaiwga2V5LCB2YWx1ZSkge1xuICAgIHJldHVybiBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHtcbiAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgIGVudW1lcmFibGU6ICEwLFxuICAgICAgY29uZmlndXJhYmxlOiAhMCxcbiAgICAgIHdyaXRhYmxlOiAhMFxuICAgIH0pLCBvYmpba2V5XTtcbiAgfVxuICB0cnkge1xuICAgIGRlZmluZSh7fSwgXCJcIik7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGRlZmluZSA9IGZ1bmN0aW9uIChvYmosIGtleSwgdmFsdWUpIHtcbiAgICAgIHJldHVybiBvYmpba2V5XSA9IHZhbHVlO1xuICAgIH07XG4gIH1cbiAgZnVuY3Rpb24gd3JhcChpbm5lckZuLCBvdXRlckZuLCBzZWxmLCB0cnlMb2NzTGlzdCkge1xuICAgIHZhciBwcm90b0dlbmVyYXRvciA9IG91dGVyRm4gJiYgb3V0ZXJGbi5wcm90b3R5cGUgaW5zdGFuY2VvZiBHZW5lcmF0b3IgPyBvdXRlckZuIDogR2VuZXJhdG9yLFxuICAgICAgZ2VuZXJhdG9yID0gT2JqZWN0LmNyZWF0ZShwcm90b0dlbmVyYXRvci5wcm90b3R5cGUpLFxuICAgICAgY29udGV4dCA9IG5ldyBDb250ZXh0KHRyeUxvY3NMaXN0IHx8IFtdKTtcbiAgICByZXR1cm4gZGVmaW5lUHJvcGVydHkoZ2VuZXJhdG9yLCBcIl9pbnZva2VcIiwge1xuICAgICAgdmFsdWU6IG1ha2VJbnZva2VNZXRob2QoaW5uZXJGbiwgc2VsZiwgY29udGV4dClcbiAgICB9KSwgZ2VuZXJhdG9yO1xuICB9XG4gIGZ1bmN0aW9uIHRyeUNhdGNoKGZuLCBvYmosIGFyZykge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiBcIm5vcm1hbFwiLFxuICAgICAgICBhcmc6IGZuLmNhbGwob2JqLCBhcmcpXG4gICAgICB9O1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogXCJ0aHJvd1wiLFxuICAgICAgICBhcmc6IGVyclxuICAgICAgfTtcbiAgICB9XG4gIH1cbiAgZXhwb3J0cy53cmFwID0gd3JhcDtcbiAgdmFyIENvbnRpbnVlU2VudGluZWwgPSB7fTtcbiAgZnVuY3Rpb24gR2VuZXJhdG9yKCkge31cbiAgZnVuY3Rpb24gR2VuZXJhdG9yRnVuY3Rpb24oKSB7fVxuICBmdW5jdGlvbiBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSgpIHt9XG4gIHZhciBJdGVyYXRvclByb3RvdHlwZSA9IHt9O1xuICBkZWZpbmUoSXRlcmF0b3JQcm90b3R5cGUsIGl0ZXJhdG9yU3ltYm9sLCBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0pO1xuICB2YXIgZ2V0UHJvdG8gPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YsXG4gICAgTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUgPSBnZXRQcm90byAmJiBnZXRQcm90byhnZXRQcm90byh2YWx1ZXMoW10pKSk7XG4gIE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlICYmIE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlICE9PSBPcCAmJiBoYXNPd24uY2FsbChOYXRpdmVJdGVyYXRvclByb3RvdHlwZSwgaXRlcmF0b3JTeW1ib2wpICYmIChJdGVyYXRvclByb3RvdHlwZSA9IE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlKTtcbiAgdmFyIEdwID0gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUucHJvdG90eXBlID0gR2VuZXJhdG9yLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoSXRlcmF0b3JQcm90b3R5cGUpO1xuICBmdW5jdGlvbiBkZWZpbmVJdGVyYXRvck1ldGhvZHMocHJvdG90eXBlKSB7XG4gICAgW1wibmV4dFwiLCBcInRocm93XCIsIFwicmV0dXJuXCJdLmZvckVhY2goZnVuY3Rpb24gKG1ldGhvZCkge1xuICAgICAgZGVmaW5lKHByb3RvdHlwZSwgbWV0aG9kLCBmdW5jdGlvbiAoYXJnKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pbnZva2UobWV0aG9kLCBhcmcpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbiAgZnVuY3Rpb24gQXN5bmNJdGVyYXRvcihnZW5lcmF0b3IsIFByb21pc2VJbXBsKSB7XG4gICAgZnVuY3Rpb24gaW52b2tlKG1ldGhvZCwgYXJnLCByZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIHZhciByZWNvcmQgPSB0cnlDYXRjaChnZW5lcmF0b3JbbWV0aG9kXSwgZ2VuZXJhdG9yLCBhcmcpO1xuICAgICAgaWYgKFwidGhyb3dcIiAhPT0gcmVjb3JkLnR5cGUpIHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IHJlY29yZC5hcmcsXG4gICAgICAgICAgdmFsdWUgPSByZXN1bHQudmFsdWU7XG4gICAgICAgIHJldHVybiB2YWx1ZSAmJiBcIm9iamVjdFwiID09IHR5cGVvZiB2YWx1ZSAmJiBoYXNPd24uY2FsbCh2YWx1ZSwgXCJfX2F3YWl0XCIpID8gUHJvbWlzZUltcGwucmVzb2x2ZSh2YWx1ZS5fX2F3YWl0KS50aGVuKGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgIGludm9rZShcIm5leHRcIiwgdmFsdWUsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgIH0sIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICBpbnZva2UoXCJ0aHJvd1wiLCBlcnIsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgIH0pIDogUHJvbWlzZUltcGwucmVzb2x2ZSh2YWx1ZSkudGhlbihmdW5jdGlvbiAodW53cmFwcGVkKSB7XG4gICAgICAgICAgcmVzdWx0LnZhbHVlID0gdW53cmFwcGVkLCByZXNvbHZlKHJlc3VsdCk7XG4gICAgICAgIH0sIGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICAgIHJldHVybiBpbnZva2UoXCJ0aHJvd1wiLCBlcnJvciwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICByZWplY3QocmVjb3JkLmFyZyk7XG4gICAgfVxuICAgIHZhciBwcmV2aW91c1Byb21pc2U7XG4gICAgZGVmaW5lUHJvcGVydHkodGhpcywgXCJfaW52b2tlXCIsIHtcbiAgICAgIHZhbHVlOiBmdW5jdGlvbiAobWV0aG9kLCBhcmcpIHtcbiAgICAgICAgZnVuY3Rpb24gY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmcoKSB7XG4gICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlSW1wbChmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICBpbnZva2UobWV0aG9kLCBhcmcsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHByZXZpb3VzUHJvbWlzZSA9IHByZXZpb3VzUHJvbWlzZSA/IHByZXZpb3VzUHJvbWlzZS50aGVuKGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnLCBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZykgOiBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZygpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG4gIGZ1bmN0aW9uIG1ha2VJbnZva2VNZXRob2QoaW5uZXJGbiwgc2VsZiwgY29udGV4dCkge1xuICAgIHZhciBzdGF0ZSA9IFwic3VzcGVuZGVkU3RhcnRcIjtcbiAgICByZXR1cm4gZnVuY3Rpb24gKG1ldGhvZCwgYXJnKSB7XG4gICAgICBpZiAoXCJleGVjdXRpbmdcIiA9PT0gc3RhdGUpIHRocm93IG5ldyBFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IHJ1bm5pbmdcIik7XG4gICAgICBpZiAoXCJjb21wbGV0ZWRcIiA9PT0gc3RhdGUpIHtcbiAgICAgICAgaWYgKFwidGhyb3dcIiA9PT0gbWV0aG9kKSB0aHJvdyBhcmc7XG4gICAgICAgIHJldHVybiBkb25lUmVzdWx0KCk7XG4gICAgICB9XG4gICAgICBmb3IgKGNvbnRleHQubWV0aG9kID0gbWV0aG9kLCBjb250ZXh0LmFyZyA9IGFyZzs7KSB7XG4gICAgICAgIHZhciBkZWxlZ2F0ZSA9IGNvbnRleHQuZGVsZWdhdGU7XG4gICAgICAgIGlmIChkZWxlZ2F0ZSkge1xuICAgICAgICAgIHZhciBkZWxlZ2F0ZVJlc3VsdCA9IG1heWJlSW52b2tlRGVsZWdhdGUoZGVsZWdhdGUsIGNvbnRleHQpO1xuICAgICAgICAgIGlmIChkZWxlZ2F0ZVJlc3VsdCkge1xuICAgICAgICAgICAgaWYgKGRlbGVnYXRlUmVzdWx0ID09PSBDb250aW51ZVNlbnRpbmVsKSBjb250aW51ZTtcbiAgICAgICAgICAgIHJldHVybiBkZWxlZ2F0ZVJlc3VsdDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKFwibmV4dFwiID09PSBjb250ZXh0Lm1ldGhvZCkgY29udGV4dC5zZW50ID0gY29udGV4dC5fc2VudCA9IGNvbnRleHQuYXJnO2Vsc2UgaWYgKFwidGhyb3dcIiA9PT0gY29udGV4dC5tZXRob2QpIHtcbiAgICAgICAgICBpZiAoXCJzdXNwZW5kZWRTdGFydFwiID09PSBzdGF0ZSkgdGhyb3cgc3RhdGUgPSBcImNvbXBsZXRlZFwiLCBjb250ZXh0LmFyZztcbiAgICAgICAgICBjb250ZXh0LmRpc3BhdGNoRXhjZXB0aW9uKGNvbnRleHQuYXJnKTtcbiAgICAgICAgfSBlbHNlIFwicmV0dXJuXCIgPT09IGNvbnRleHQubWV0aG9kICYmIGNvbnRleHQuYWJydXB0KFwicmV0dXJuXCIsIGNvbnRleHQuYXJnKTtcbiAgICAgICAgc3RhdGUgPSBcImV4ZWN1dGluZ1wiO1xuICAgICAgICB2YXIgcmVjb3JkID0gdHJ5Q2F0Y2goaW5uZXJGbiwgc2VsZiwgY29udGV4dCk7XG4gICAgICAgIGlmIChcIm5vcm1hbFwiID09PSByZWNvcmQudHlwZSkge1xuICAgICAgICAgIGlmIChzdGF0ZSA9IGNvbnRleHQuZG9uZSA/IFwiY29tcGxldGVkXCIgOiBcInN1c3BlbmRlZFlpZWxkXCIsIHJlY29yZC5hcmcgPT09IENvbnRpbnVlU2VudGluZWwpIGNvbnRpbnVlO1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB2YWx1ZTogcmVjb3JkLmFyZyxcbiAgICAgICAgICAgIGRvbmU6IGNvbnRleHQuZG9uZVxuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgXCJ0aHJvd1wiID09PSByZWNvcmQudHlwZSAmJiAoc3RhdGUgPSBcImNvbXBsZXRlZFwiLCBjb250ZXh0Lm1ldGhvZCA9IFwidGhyb3dcIiwgY29udGV4dC5hcmcgPSByZWNvcmQuYXJnKTtcbiAgICAgIH1cbiAgICB9O1xuICB9XG4gIGZ1bmN0aW9uIG1heWJlSW52b2tlRGVsZWdhdGUoZGVsZWdhdGUsIGNvbnRleHQpIHtcbiAgICB2YXIgbWV0aG9kTmFtZSA9IGNvbnRleHQubWV0aG9kLFxuICAgICAgbWV0aG9kID0gZGVsZWdhdGUuaXRlcmF0b3JbbWV0aG9kTmFtZV07XG4gICAgaWYgKHVuZGVmaW5lZCA9PT0gbWV0aG9kKSByZXR1cm4gY29udGV4dC5kZWxlZ2F0ZSA9IG51bGwsIFwidGhyb3dcIiA9PT0gbWV0aG9kTmFtZSAmJiBkZWxlZ2F0ZS5pdGVyYXRvci5yZXR1cm4gJiYgKGNvbnRleHQubWV0aG9kID0gXCJyZXR1cm5cIiwgY29udGV4dC5hcmcgPSB1bmRlZmluZWQsIG1heWJlSW52b2tlRGVsZWdhdGUoZGVsZWdhdGUsIGNvbnRleHQpLCBcInRocm93XCIgPT09IGNvbnRleHQubWV0aG9kKSB8fCBcInJldHVyblwiICE9PSBtZXRob2ROYW1lICYmIChjb250ZXh0Lm1ldGhvZCA9IFwidGhyb3dcIiwgY29udGV4dC5hcmcgPSBuZXcgVHlwZUVycm9yKFwiVGhlIGl0ZXJhdG9yIGRvZXMgbm90IHByb3ZpZGUgYSAnXCIgKyBtZXRob2ROYW1lICsgXCInIG1ldGhvZFwiKSksIENvbnRpbnVlU2VudGluZWw7XG4gICAgdmFyIHJlY29yZCA9IHRyeUNhdGNoKG1ldGhvZCwgZGVsZWdhdGUuaXRlcmF0b3IsIGNvbnRleHQuYXJnKTtcbiAgICBpZiAoXCJ0aHJvd1wiID09PSByZWNvcmQudHlwZSkgcmV0dXJuIGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiLCBjb250ZXh0LmFyZyA9IHJlY29yZC5hcmcsIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsLCBDb250aW51ZVNlbnRpbmVsO1xuICAgIHZhciBpbmZvID0gcmVjb3JkLmFyZztcbiAgICByZXR1cm4gaW5mbyA/IGluZm8uZG9uZSA/IChjb250ZXh0W2RlbGVnYXRlLnJlc3VsdE5hbWVdID0gaW5mby52YWx1ZSwgY29udGV4dC5uZXh0ID0gZGVsZWdhdGUubmV4dExvYywgXCJyZXR1cm5cIiAhPT0gY29udGV4dC5tZXRob2QgJiYgKGNvbnRleHQubWV0aG9kID0gXCJuZXh0XCIsIGNvbnRleHQuYXJnID0gdW5kZWZpbmVkKSwgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGwsIENvbnRpbnVlU2VudGluZWwpIDogaW5mbyA6IChjb250ZXh0Lm1ldGhvZCA9IFwidGhyb3dcIiwgY29udGV4dC5hcmcgPSBuZXcgVHlwZUVycm9yKFwiaXRlcmF0b3IgcmVzdWx0IGlzIG5vdCBhbiBvYmplY3RcIiksIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsLCBDb250aW51ZVNlbnRpbmVsKTtcbiAgfVxuICBmdW5jdGlvbiBwdXNoVHJ5RW50cnkobG9jcykge1xuICAgIHZhciBlbnRyeSA9IHtcbiAgICAgIHRyeUxvYzogbG9jc1swXVxuICAgIH07XG4gICAgMSBpbiBsb2NzICYmIChlbnRyeS5jYXRjaExvYyA9IGxvY3NbMV0pLCAyIGluIGxvY3MgJiYgKGVudHJ5LmZpbmFsbHlMb2MgPSBsb2NzWzJdLCBlbnRyeS5hZnRlckxvYyA9IGxvY3NbM10pLCB0aGlzLnRyeUVudHJpZXMucHVzaChlbnRyeSk7XG4gIH1cbiAgZnVuY3Rpb24gcmVzZXRUcnlFbnRyeShlbnRyeSkge1xuICAgIHZhciByZWNvcmQgPSBlbnRyeS5jb21wbGV0aW9uIHx8IHt9O1xuICAgIHJlY29yZC50eXBlID0gXCJub3JtYWxcIiwgZGVsZXRlIHJlY29yZC5hcmcsIGVudHJ5LmNvbXBsZXRpb24gPSByZWNvcmQ7XG4gIH1cbiAgZnVuY3Rpb24gQ29udGV4dCh0cnlMb2NzTGlzdCkge1xuICAgIHRoaXMudHJ5RW50cmllcyA9IFt7XG4gICAgICB0cnlMb2M6IFwicm9vdFwiXG4gICAgfV0sIHRyeUxvY3NMaXN0LmZvckVhY2gocHVzaFRyeUVudHJ5LCB0aGlzKSwgdGhpcy5yZXNldCghMCk7XG4gIH1cbiAgZnVuY3Rpb24gdmFsdWVzKGl0ZXJhYmxlKSB7XG4gICAgaWYgKGl0ZXJhYmxlKSB7XG4gICAgICB2YXIgaXRlcmF0b3JNZXRob2QgPSBpdGVyYWJsZVtpdGVyYXRvclN5bWJvbF07XG4gICAgICBpZiAoaXRlcmF0b3JNZXRob2QpIHJldHVybiBpdGVyYXRvck1ldGhvZC5jYWxsKGl0ZXJhYmxlKTtcbiAgICAgIGlmIChcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIGl0ZXJhYmxlLm5leHQpIHJldHVybiBpdGVyYWJsZTtcbiAgICAgIGlmICghaXNOYU4oaXRlcmFibGUubGVuZ3RoKSkge1xuICAgICAgICB2YXIgaSA9IC0xLFxuICAgICAgICAgIG5leHQgPSBmdW5jdGlvbiBuZXh0KCkge1xuICAgICAgICAgICAgZm9yICg7ICsraSA8IGl0ZXJhYmxlLmxlbmd0aDspIGlmIChoYXNPd24uY2FsbChpdGVyYWJsZSwgaSkpIHJldHVybiBuZXh0LnZhbHVlID0gaXRlcmFibGVbaV0sIG5leHQuZG9uZSA9ICExLCBuZXh0O1xuICAgICAgICAgICAgcmV0dXJuIG5leHQudmFsdWUgPSB1bmRlZmluZWQsIG5leHQuZG9uZSA9ICEwLCBuZXh0O1xuICAgICAgICAgIH07XG4gICAgICAgIHJldHVybiBuZXh0Lm5leHQgPSBuZXh0O1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgbmV4dDogZG9uZVJlc3VsdFxuICAgIH07XG4gIH1cbiAgZnVuY3Rpb24gZG9uZVJlc3VsdCgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdmFsdWU6IHVuZGVmaW5lZCxcbiAgICAgIGRvbmU6ICEwXG4gICAgfTtcbiAgfVxuICByZXR1cm4gR2VuZXJhdG9yRnVuY3Rpb24ucHJvdG90eXBlID0gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUsIGRlZmluZVByb3BlcnR5KEdwLCBcImNvbnN0cnVjdG9yXCIsIHtcbiAgICB2YWx1ZTogR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUsXG4gICAgY29uZmlndXJhYmxlOiAhMFxuICB9KSwgZGVmaW5lUHJvcGVydHkoR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUsIFwiY29uc3RydWN0b3JcIiwge1xuICAgIHZhbHVlOiBHZW5lcmF0b3JGdW5jdGlvbixcbiAgICBjb25maWd1cmFibGU6ICEwXG4gIH0pLCBHZW5lcmF0b3JGdW5jdGlvbi5kaXNwbGF5TmFtZSA9IGRlZmluZShHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSwgdG9TdHJpbmdUYWdTeW1ib2wsIFwiR2VuZXJhdG9yRnVuY3Rpb25cIiksIGV4cG9ydHMuaXNHZW5lcmF0b3JGdW5jdGlvbiA9IGZ1bmN0aW9uIChnZW5GdW4pIHtcbiAgICB2YXIgY3RvciA9IFwiZnVuY3Rpb25cIiA9PSB0eXBlb2YgZ2VuRnVuICYmIGdlbkZ1bi5jb25zdHJ1Y3RvcjtcbiAgICByZXR1cm4gISFjdG9yICYmIChjdG9yID09PSBHZW5lcmF0b3JGdW5jdGlvbiB8fCBcIkdlbmVyYXRvckZ1bmN0aW9uXCIgPT09IChjdG9yLmRpc3BsYXlOYW1lIHx8IGN0b3IubmFtZSkpO1xuICB9LCBleHBvcnRzLm1hcmsgPSBmdW5jdGlvbiAoZ2VuRnVuKSB7XG4gICAgcmV0dXJuIE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5zZXRQcm90b3R5cGVPZihnZW5GdW4sIEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlKSA6IChnZW5GdW4uX19wcm90b19fID0gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUsIGRlZmluZShnZW5GdW4sIHRvU3RyaW5nVGFnU3ltYm9sLCBcIkdlbmVyYXRvckZ1bmN0aW9uXCIpKSwgZ2VuRnVuLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoR3ApLCBnZW5GdW47XG4gIH0sIGV4cG9ydHMuYXdyYXAgPSBmdW5jdGlvbiAoYXJnKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIF9fYXdhaXQ6IGFyZ1xuICAgIH07XG4gIH0sIGRlZmluZUl0ZXJhdG9yTWV0aG9kcyhBc3luY0l0ZXJhdG9yLnByb3RvdHlwZSksIGRlZmluZShBc3luY0l0ZXJhdG9yLnByb3RvdHlwZSwgYXN5bmNJdGVyYXRvclN5bWJvbCwgZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9KSwgZXhwb3J0cy5Bc3luY0l0ZXJhdG9yID0gQXN5bmNJdGVyYXRvciwgZXhwb3J0cy5hc3luYyA9IGZ1bmN0aW9uIChpbm5lckZuLCBvdXRlckZuLCBzZWxmLCB0cnlMb2NzTGlzdCwgUHJvbWlzZUltcGwpIHtcbiAgICB2b2lkIDAgPT09IFByb21pc2VJbXBsICYmIChQcm9taXNlSW1wbCA9IFByb21pc2UpO1xuICAgIHZhciBpdGVyID0gbmV3IEFzeW5jSXRlcmF0b3Iod3JhcChpbm5lckZuLCBvdXRlckZuLCBzZWxmLCB0cnlMb2NzTGlzdCksIFByb21pc2VJbXBsKTtcbiAgICByZXR1cm4gZXhwb3J0cy5pc0dlbmVyYXRvckZ1bmN0aW9uKG91dGVyRm4pID8gaXRlciA6IGl0ZXIubmV4dCgpLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgcmV0dXJuIHJlc3VsdC5kb25lID8gcmVzdWx0LnZhbHVlIDogaXRlci5uZXh0KCk7XG4gICAgfSk7XG4gIH0sIGRlZmluZUl0ZXJhdG9yTWV0aG9kcyhHcCksIGRlZmluZShHcCwgdG9TdHJpbmdUYWdTeW1ib2wsIFwiR2VuZXJhdG9yXCIpLCBkZWZpbmUoR3AsIGl0ZXJhdG9yU3ltYm9sLCBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0pLCBkZWZpbmUoR3AsIFwidG9TdHJpbmdcIiwgZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBcIltvYmplY3QgR2VuZXJhdG9yXVwiO1xuICB9KSwgZXhwb3J0cy5rZXlzID0gZnVuY3Rpb24gKHZhbCkge1xuICAgIHZhciBvYmplY3QgPSBPYmplY3QodmFsKSxcbiAgICAgIGtleXMgPSBbXTtcbiAgICBmb3IgKHZhciBrZXkgaW4gb2JqZWN0KSBrZXlzLnB1c2goa2V5KTtcbiAgICByZXR1cm4ga2V5cy5yZXZlcnNlKCksIGZ1bmN0aW9uIG5leHQoKSB7XG4gICAgICBmb3IgKDsga2V5cy5sZW5ndGg7KSB7XG4gICAgICAgIHZhciBrZXkgPSBrZXlzLnBvcCgpO1xuICAgICAgICBpZiAoa2V5IGluIG9iamVjdCkgcmV0dXJuIG5leHQudmFsdWUgPSBrZXksIG5leHQuZG9uZSA9ICExLCBuZXh0O1xuICAgICAgfVxuICAgICAgcmV0dXJuIG5leHQuZG9uZSA9ICEwLCBuZXh0O1xuICAgIH07XG4gIH0sIGV4cG9ydHMudmFsdWVzID0gdmFsdWVzLCBDb250ZXh0LnByb3RvdHlwZSA9IHtcbiAgICBjb25zdHJ1Y3RvcjogQ29udGV4dCxcbiAgICByZXNldDogZnVuY3Rpb24gKHNraXBUZW1wUmVzZXQpIHtcbiAgICAgIGlmICh0aGlzLnByZXYgPSAwLCB0aGlzLm5leHQgPSAwLCB0aGlzLnNlbnQgPSB0aGlzLl9zZW50ID0gdW5kZWZpbmVkLCB0aGlzLmRvbmUgPSAhMSwgdGhpcy5kZWxlZ2F0ZSA9IG51bGwsIHRoaXMubWV0aG9kID0gXCJuZXh0XCIsIHRoaXMuYXJnID0gdW5kZWZpbmVkLCB0aGlzLnRyeUVudHJpZXMuZm9yRWFjaChyZXNldFRyeUVudHJ5KSwgIXNraXBUZW1wUmVzZXQpIGZvciAodmFyIG5hbWUgaW4gdGhpcykgXCJ0XCIgPT09IG5hbWUuY2hhckF0KDApICYmIGhhc093bi5jYWxsKHRoaXMsIG5hbWUpICYmICFpc05hTigrbmFtZS5zbGljZSgxKSkgJiYgKHRoaXNbbmFtZV0gPSB1bmRlZmluZWQpO1xuICAgIH0sXG4gICAgc3RvcDogZnVuY3Rpb24gKCkge1xuICAgICAgdGhpcy5kb25lID0gITA7XG4gICAgICB2YXIgcm9vdFJlY29yZCA9IHRoaXMudHJ5RW50cmllc1swXS5jb21wbGV0aW9uO1xuICAgICAgaWYgKFwidGhyb3dcIiA9PT0gcm9vdFJlY29yZC50eXBlKSB0aHJvdyByb290UmVjb3JkLmFyZztcbiAgICAgIHJldHVybiB0aGlzLnJ2YWw7XG4gICAgfSxcbiAgICBkaXNwYXRjaEV4Y2VwdGlvbjogZnVuY3Rpb24gKGV4Y2VwdGlvbikge1xuICAgICAgaWYgKHRoaXMuZG9uZSkgdGhyb3cgZXhjZXB0aW9uO1xuICAgICAgdmFyIGNvbnRleHQgPSB0aGlzO1xuICAgICAgZnVuY3Rpb24gaGFuZGxlKGxvYywgY2F1Z2h0KSB7XG4gICAgICAgIHJldHVybiByZWNvcmQudHlwZSA9IFwidGhyb3dcIiwgcmVjb3JkLmFyZyA9IGV4Y2VwdGlvbiwgY29udGV4dC5uZXh0ID0gbG9jLCBjYXVnaHQgJiYgKGNvbnRleHQubWV0aG9kID0gXCJuZXh0XCIsIGNvbnRleHQuYXJnID0gdW5kZWZpbmVkKSwgISFjYXVnaHQ7XG4gICAgICB9XG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXSxcbiAgICAgICAgICByZWNvcmQgPSBlbnRyeS5jb21wbGV0aW9uO1xuICAgICAgICBpZiAoXCJyb290XCIgPT09IGVudHJ5LnRyeUxvYykgcmV0dXJuIGhhbmRsZShcImVuZFwiKTtcbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA8PSB0aGlzLnByZXYpIHtcbiAgICAgICAgICB2YXIgaGFzQ2F0Y2ggPSBoYXNPd24uY2FsbChlbnRyeSwgXCJjYXRjaExvY1wiKSxcbiAgICAgICAgICAgIGhhc0ZpbmFsbHkgPSBoYXNPd24uY2FsbChlbnRyeSwgXCJmaW5hbGx5TG9jXCIpO1xuICAgICAgICAgIGlmIChoYXNDYXRjaCAmJiBoYXNGaW5hbGx5KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcmV2IDwgZW50cnkuY2F0Y2hMb2MpIHJldHVybiBoYW5kbGUoZW50cnkuY2F0Y2hMb2MsICEwKTtcbiAgICAgICAgICAgIGlmICh0aGlzLnByZXYgPCBlbnRyeS5maW5hbGx5TG9jKSByZXR1cm4gaGFuZGxlKGVudHJ5LmZpbmFsbHlMb2MpO1xuICAgICAgICAgIH0gZWxzZSBpZiAoaGFzQ2F0Y2gpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByZXYgPCBlbnRyeS5jYXRjaExvYykgcmV0dXJuIGhhbmRsZShlbnRyeS5jYXRjaExvYywgITApO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoIWhhc0ZpbmFsbHkpIHRocm93IG5ldyBFcnJvcihcInRyeSBzdGF0ZW1lbnQgd2l0aG91dCBjYXRjaCBvciBmaW5hbGx5XCIpO1xuICAgICAgICAgICAgaWYgKHRoaXMucHJldiA8IGVudHJ5LmZpbmFsbHlMb2MpIHJldHVybiBoYW5kbGUoZW50cnkuZmluYWxseUxvYyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICBhYnJ1cHQ6IGZ1bmN0aW9uICh0eXBlLCBhcmcpIHtcbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuICAgICAgICBpZiAoZW50cnkudHJ5TG9jIDw9IHRoaXMucHJldiAmJiBoYXNPd24uY2FsbChlbnRyeSwgXCJmaW5hbGx5TG9jXCIpICYmIHRoaXMucHJldiA8IGVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgICB2YXIgZmluYWxseUVudHJ5ID0gZW50cnk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGZpbmFsbHlFbnRyeSAmJiAoXCJicmVha1wiID09PSB0eXBlIHx8IFwiY29udGludWVcIiA9PT0gdHlwZSkgJiYgZmluYWxseUVudHJ5LnRyeUxvYyA8PSBhcmcgJiYgYXJnIDw9IGZpbmFsbHlFbnRyeS5maW5hbGx5TG9jICYmIChmaW5hbGx5RW50cnkgPSBudWxsKTtcbiAgICAgIHZhciByZWNvcmQgPSBmaW5hbGx5RW50cnkgPyBmaW5hbGx5RW50cnkuY29tcGxldGlvbiA6IHt9O1xuICAgICAgcmV0dXJuIHJlY29yZC50eXBlID0gdHlwZSwgcmVjb3JkLmFyZyA9IGFyZywgZmluYWxseUVudHJ5ID8gKHRoaXMubWV0aG9kID0gXCJuZXh0XCIsIHRoaXMubmV4dCA9IGZpbmFsbHlFbnRyeS5maW5hbGx5TG9jLCBDb250aW51ZVNlbnRpbmVsKSA6IHRoaXMuY29tcGxldGUocmVjb3JkKTtcbiAgICB9LFxuICAgIGNvbXBsZXRlOiBmdW5jdGlvbiAocmVjb3JkLCBhZnRlckxvYykge1xuICAgICAgaWYgKFwidGhyb3dcIiA9PT0gcmVjb3JkLnR5cGUpIHRocm93IHJlY29yZC5hcmc7XG4gICAgICByZXR1cm4gXCJicmVha1wiID09PSByZWNvcmQudHlwZSB8fCBcImNvbnRpbnVlXCIgPT09IHJlY29yZC50eXBlID8gdGhpcy5uZXh0ID0gcmVjb3JkLmFyZyA6IFwicmV0dXJuXCIgPT09IHJlY29yZC50eXBlID8gKHRoaXMucnZhbCA9IHRoaXMuYXJnID0gcmVjb3JkLmFyZywgdGhpcy5tZXRob2QgPSBcInJldHVyblwiLCB0aGlzLm5leHQgPSBcImVuZFwiKSA6IFwibm9ybWFsXCIgPT09IHJlY29yZC50eXBlICYmIGFmdGVyTG9jICYmICh0aGlzLm5leHQgPSBhZnRlckxvYyksIENvbnRpbnVlU2VudGluZWw7XG4gICAgfSxcbiAgICBmaW5pc2g6IGZ1bmN0aW9uIChmaW5hbGx5TG9jKSB7XG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcbiAgICAgICAgaWYgKGVudHJ5LmZpbmFsbHlMb2MgPT09IGZpbmFsbHlMb2MpIHJldHVybiB0aGlzLmNvbXBsZXRlKGVudHJ5LmNvbXBsZXRpb24sIGVudHJ5LmFmdGVyTG9jKSwgcmVzZXRUcnlFbnRyeShlbnRyeSksIENvbnRpbnVlU2VudGluZWw7XG4gICAgICB9XG4gICAgfSxcbiAgICBjYXRjaDogZnVuY3Rpb24gKHRyeUxvYykge1xuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPT09IHRyeUxvYykge1xuICAgICAgICAgIHZhciByZWNvcmQgPSBlbnRyeS5jb21wbGV0aW9uO1xuICAgICAgICAgIGlmIChcInRocm93XCIgPT09IHJlY29yZC50eXBlKSB7XG4gICAgICAgICAgICB2YXIgdGhyb3duID0gcmVjb3JkLmFyZztcbiAgICAgICAgICAgIHJlc2V0VHJ5RW50cnkoZW50cnkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gdGhyb3duO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJpbGxlZ2FsIGNhdGNoIGF0dGVtcHRcIik7XG4gICAgfSxcbiAgICBkZWxlZ2F0ZVlpZWxkOiBmdW5jdGlvbiAoaXRlcmFibGUsIHJlc3VsdE5hbWUsIG5leHRMb2MpIHtcbiAgICAgIHJldHVybiB0aGlzLmRlbGVnYXRlID0ge1xuICAgICAgICBpdGVyYXRvcjogdmFsdWVzKGl0ZXJhYmxlKSxcbiAgICAgICAgcmVzdWx0TmFtZTogcmVzdWx0TmFtZSxcbiAgICAgICAgbmV4dExvYzogbmV4dExvY1xuICAgICAgfSwgXCJuZXh0XCIgPT09IHRoaXMubWV0aG9kICYmICh0aGlzLmFyZyA9IHVuZGVmaW5lZCksIENvbnRpbnVlU2VudGluZWw7XG4gICAgfVxuICB9LCBleHBvcnRzO1xufVxuZnVuY3Rpb24gYXN5bmNHZW5lcmF0b3JTdGVwKGdlbiwgcmVzb2x2ZSwgcmVqZWN0LCBfbmV4dCwgX3Rocm93LCBrZXksIGFyZykge1xuICB0cnkge1xuICAgIHZhciBpbmZvID0gZ2VuW2tleV0oYXJnKTtcbiAgICB2YXIgdmFsdWUgPSBpbmZvLnZhbHVlO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJlamVjdChlcnJvcik7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmIChpbmZvLmRvbmUpIHtcbiAgICByZXNvbHZlKHZhbHVlKTtcbiAgfSBlbHNlIHtcbiAgICBQcm9taXNlLnJlc29sdmUodmFsdWUpLnRoZW4oX25leHQsIF90aHJvdyk7XG4gIH1cbn1cbmZ1bmN0aW9uIF9hc3luY1RvR2VuZXJhdG9yKGZuKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzLFxuICAgICAgYXJncyA9IGFyZ3VtZW50cztcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgdmFyIGdlbiA9IGZuLmFwcGx5KHNlbGYsIGFyZ3MpO1xuICAgICAgZnVuY3Rpb24gX25leHQodmFsdWUpIHtcbiAgICAgICAgYXN5bmNHZW5lcmF0b3JTdGVwKGdlbiwgcmVzb2x2ZSwgcmVqZWN0LCBfbmV4dCwgX3Rocm93LCBcIm5leHRcIiwgdmFsdWUpO1xuICAgICAgfVxuICAgICAgZnVuY3Rpb24gX3Rocm93KGVycikge1xuICAgICAgICBhc3luY0dlbmVyYXRvclN0ZXAoZ2VuLCByZXNvbHZlLCByZWplY3QsIF9uZXh0LCBfdGhyb3csIFwidGhyb3dcIiwgZXJyKTtcbiAgICAgIH1cbiAgICAgIF9uZXh0KHVuZGVmaW5lZCk7XG4gICAgfSk7XG4gIH07XG59XG5cbnZhciBERUZBVUxUX1RJTUVPVVQgPSA1MDAwO1xudmFyIFVuYXZhaWxhYmxlRXJyb3IgPSAvKiNfX1BVUkVfXyovbmV3IEVycm9yKCdGREMzIERlc2t0b3BBZ2VudCBub3QgYXZhaWxhYmxlIGF0IGB3aW5kb3cuZmRjM2AuJyk7XG52YXIgVGltZW91dEVycm9yID0gLyojX19QVVJFX18qL25ldyBFcnJvcignVGltZWQgb3V0IHdhaXRpbmcgZm9yIGBmZGMzUmVhZHlgIGV2ZW50LicpO1xudmFyIFVuZXhwZWN0ZWRFcnJvciA9IC8qI19fUFVSRV9fKi9uZXcgRXJyb3IoJ2BmZGMzUmVhZHlgIGV2ZW50IGZpcmVkLCBidXQgYHdpbmRvdy5mZGMzYCBub3Qgc2V0IHRvIERlc2t0b3BBZ2VudC4nKTtcbmZ1bmN0aW9uIHJlamVjdElmTm9HbG9iYWwoZikge1xuICByZXR1cm4gd2luZG93LmZkYzMgPyBmKCkgOiBQcm9taXNlLnJlamVjdChVbmF2YWlsYWJsZUVycm9yKTtcbn1cbi8qKlxyXG4gKiBVdGlsaXR5IGZ1bmN0aW9uIHRoYXQgcmV0dXJucyBhIHByb21pc2UgdGhhdCB3aWxsIHJlc29sdmUgaW1tZWFkaWF0ZWx5XHJcbiAqIGlmIHRoZSBkZXNrdG9wIGFnZW50IEFQSSBpcyBmb3VuZCBhdCBgd2luZG93LmZkYzNgLiBJZiB0aGUgQVBJIGlzIGZvdW5kLFxyXG4gKiB0aGUgcHJvbWlzZSB3aWxsIHJlc29sdmUgd2hlbiB0aGUgYGZkYzNSZWFkeWAgZXZlbnQgaXMgcmVjZWl2ZWQgb3IgaWYgaXRcclxuICogaXMgZm91bmQgYXQgdGhlIGVuZCBvZiB0aGUgc3BlY2lmaWVkIHRpbWVvdXQuIElmIHRoZSBBUEkgaXMgbm90IGZvdW5kLCBpdFxyXG4gKiB3aWxsIHJlamVjdCB3aXRoIGFuIGVycm9yLlxyXG4gKlxyXG4gKiBgYGBqYXZhc2NyaXB0XHJcbiAqIGF3YWl0IGZkYzNSZWFkeSgpO1xyXG4gKiBjb25zdCBpbnRlbnRMaXN0ZW5lciA9IGF3YWl0IGFkZEludGVudExpc3RlbmVyKFwiVmlld0NoYXJ0XCIsIGludGVudEhhbmRsZXJGbik7XHJcbiAqIGBgYFxyXG4gKlxyXG4gKiBAcGFyYW0gd2FpdEZvck1zIFRoZSBudW1iZXIgb2YgbWlsbGlzZWNvbmRzIHRvIHdhaXQgZm9yIHRoZSBGREMzIEFQSSB0byBiZVxyXG4gKiByZWFkeS4gRGVmYXVsdHMgdG8gNSBzZWNvbmRzLlxyXG4gKi9cbnZhciBmZGMzUmVhZHkgPSAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKCkge1xuICB2YXIgX3JlZiA9IC8qI19fUFVSRV9fKi9fYXN5bmNUb0dlbmVyYXRvciggLyojX19QVVJFX18qL19yZWdlbmVyYXRvclJ1bnRpbWUoKS5tYXJrKGZ1bmN0aW9uIF9jYWxsZWUod2FpdEZvck1zKSB7XG4gICAgcmV0dXJuIF9yZWdlbmVyYXRvclJ1bnRpbWUoKS53cmFwKGZ1bmN0aW9uIF9jYWxsZWUkKF9jb250ZXh0KSB7XG4gICAgICB3aGlsZSAoMSkgc3dpdGNoIChfY29udGV4dC5wcmV2ID0gX2NvbnRleHQubmV4dCkge1xuICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgaWYgKHdhaXRGb3JNcyA9PT0gdm9pZCAwKSB7XG4gICAgICAgICAgICB3YWl0Rm9yTXMgPSBERUZBVUxUX1RJTUVPVVQ7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBfY29udGV4dC5hYnJ1cHQoXCJyZXR1cm5cIiwgbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgLy8gaWYgdGhlIGdsb2JhbCBpcyBhbHJlYWR5IGF2YWlsYWJsZSByZXNvbHZlIGltbWVkaWF0ZWx5XG4gICAgICAgICAgICBpZiAod2luZG93LmZkYzMpIHtcbiAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgLy8gaWYgaXRzIG5vdCBhdmFpbGFibGUgc2V0dXAgYSB0aW1lb3V0IHRvIHJldHVybiBhIHJlamVjdGVkIHByb21pc2VcbiAgICAgICAgICAgICAgdmFyIHRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gd2luZG93LmZkYzMgPyByZXNvbHZlKCkgOiByZWplY3QoVGltZW91dEVycm9yKTtcbiAgICAgICAgICAgICAgfSwgd2FpdEZvck1zKTtcbiAgICAgICAgICAgICAgLy8gbGlzdGVuIGZvciB0aGUgZmRjM1JlYWR5IGV2ZW50XG4gICAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdmZGMzUmVhZHknLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuICAgICAgICAgICAgICAgIHdpbmRvdy5mZGMzID8gcmVzb2x2ZSgpIDogcmVqZWN0KFVuZXhwZWN0ZWRFcnJvcik7XG4gICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBvbmNlOiB0cnVlXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pKTtcbiAgICAgICAgY2FzZSAyOlxuICAgICAgICBjYXNlIFwiZW5kXCI6XG4gICAgICAgICAgcmV0dXJuIF9jb250ZXh0LnN0b3AoKTtcbiAgICAgIH1cbiAgICB9LCBfY2FsbGVlKTtcbiAgfSkpO1xuICByZXR1cm4gZnVuY3Rpb24gZmRjM1JlYWR5KF94KSB7XG4gICAgcmV0dXJuIF9yZWYuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgfTtcbn0oKTtcbmZ1bmN0aW9uIGlzU3RyaW5nKGFwcCkge1xuICByZXR1cm4gISFhcHAgJiYgdHlwZW9mIGFwcCA9PT0gJ3N0cmluZyc7XG59XG5mdW5jdGlvbiBvcGVuKGFwcCwgY29udGV4dCkge1xuICBpZiAoaXNTdHJpbmcoYXBwKSkge1xuICAgIHJldHVybiByZWplY3RJZk5vR2xvYmFsKGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiB3aW5kb3cuZmRjMy5vcGVuKGFwcCwgY29udGV4dCk7XG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHJlamVjdElmTm9HbG9iYWwoZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHdpbmRvdy5mZGMzLm9wZW4oYXBwLCBjb250ZXh0KTtcbiAgICB9KTtcbiAgfVxufVxuZnVuY3Rpb24gZmluZEludGVudChpbnRlbnQsIGNvbnRleHQsIHJlc3VsdFR5cGUpIHtcbiAgcmV0dXJuIHJlamVjdElmTm9HbG9iYWwoZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB3aW5kb3cuZmRjMy5maW5kSW50ZW50KGludGVudCwgY29udGV4dCwgcmVzdWx0VHlwZSk7XG4gIH0pO1xufVxuZnVuY3Rpb24gZmluZEludGVudHNCeUNvbnRleHQoY29udGV4dCwgcmVzdWx0VHlwZSkge1xuICByZXR1cm4gcmVqZWN0SWZOb0dsb2JhbChmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHdpbmRvdy5mZGMzLmZpbmRJbnRlbnRzQnlDb250ZXh0KGNvbnRleHQsIHJlc3VsdFR5cGUpO1xuICB9KTtcbn1cbmZ1bmN0aW9uIGJyb2FkY2FzdChjb250ZXh0KSB7XG4gIHJldHVybiByZWplY3RJZk5vR2xvYmFsKGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gd2luZG93LmZkYzMuYnJvYWRjYXN0KGNvbnRleHQpO1xuICB9KTtcbn1cbmZ1bmN0aW9uIHJhaXNlSW50ZW50KGludGVudCwgY29udGV4dCwgYXBwKSB7XG4gIGlmIChpc1N0cmluZyhhcHApKSB7XG4gICAgcmV0dXJuIHJlamVjdElmTm9HbG9iYWwoZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHdpbmRvdy5mZGMzLnJhaXNlSW50ZW50KGludGVudCwgY29udGV4dCwgYXBwKTtcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gcmVqZWN0SWZOb0dsb2JhbChmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gd2luZG93LmZkYzMucmFpc2VJbnRlbnQoaW50ZW50LCBjb250ZXh0LCBhcHApO1xuICAgIH0pO1xuICB9XG59XG5mdW5jdGlvbiByYWlzZUludGVudEZvckNvbnRleHQoY29udGV4dCwgYXBwKSB7XG4gIGlmIChpc1N0cmluZyhhcHApKSB7XG4gICAgcmV0dXJuIHJlamVjdElmTm9HbG9iYWwoZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHdpbmRvdy5mZGMzLnJhaXNlSW50ZW50Rm9yQ29udGV4dChjb250ZXh0LCBhcHApO1xuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiByZWplY3RJZk5vR2xvYmFsKGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiB3aW5kb3cuZmRjMy5yYWlzZUludGVudEZvckNvbnRleHQoY29udGV4dCwgYXBwKTtcbiAgICB9KTtcbiAgfVxufVxuZnVuY3Rpb24gYWRkSW50ZW50TGlzdGVuZXIoaW50ZW50LCBoYW5kbGVyKSB7XG4gIHJldHVybiByZWplY3RJZk5vR2xvYmFsKGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gd2luZG93LmZkYzMuYWRkSW50ZW50TGlzdGVuZXIoaW50ZW50LCBoYW5kbGVyKTtcbiAgfSk7XG59XG5mdW5jdGlvbiBhZGRDb250ZXh0TGlzdGVuZXIoY29udGV4dFR5cGVPckhhbmRsZXIsIGhhbmRsZXIpIHtcbiAgLy9IYW5kbGUgKGRlcHJlY2F0ZWQpIGZ1bmN0aW9uIHNpZ25hdHVyZSB0aGF0IGFsbG93ZWQgY29udGV4dFR5cGUgYXJndW1lbnQgdG8gYmUgb21pdHRlZFxuICBpZiAodHlwZW9mIGNvbnRleHRUeXBlT3JIYW5kbGVyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuIHJlamVjdElmTm9HbG9iYWwoZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHdpbmRvdy5mZGMzLmFkZENvbnRleHRMaXN0ZW5lcihjb250ZXh0VHlwZU9ySGFuZGxlciwgaGFuZGxlcik7XG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHJlamVjdElmTm9HbG9iYWwoZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHdpbmRvdy5mZGMzLmFkZENvbnRleHRMaXN0ZW5lcihudWxsLCBjb250ZXh0VHlwZU9ySGFuZGxlcik7XG4gICAgfSk7XG4gIH1cbn1cbmZ1bmN0aW9uIGdldFVzZXJDaGFubmVscygpIHtcbiAgcmV0dXJuIHJlamVjdElmTm9HbG9iYWwoZnVuY3Rpb24gKCkge1xuICAgIC8vZmFsbGJhY2sgdG8gZ2V0U3lzdGVtQ2hhbm5lbHMgZm9yIEZEQzMgPDIuMCBpbXBsZW1lbnRhdGlvbnNcbiAgICBpZiAod2luZG93LmZkYzMuZ2V0VXNlckNoYW5uZWxzKSB7XG4gICAgICByZXR1cm4gd2luZG93LmZkYzMuZ2V0VXNlckNoYW5uZWxzKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB3aW5kb3cuZmRjMy5nZXRTeXN0ZW1DaGFubmVscygpO1xuICAgIH1cbiAgfSk7XG59XG5mdW5jdGlvbiBnZXRTeXN0ZW1DaGFubmVscygpIHtcbiAgLy9mYWxsZm9yd2FyZCB0byBnZXRVc2VyQ2hhbm5lbHMgZm9yIEZEQzMgMi4wKyBpbXBsZW1lbnRhdGlvbnNcbiAgcmV0dXJuIGdldFVzZXJDaGFubmVscygpO1xufVxuZnVuY3Rpb24gam9pblVzZXJDaGFubmVsKGNoYW5uZWxJZCkge1xuICByZXR1cm4gcmVqZWN0SWZOb0dsb2JhbChmdW5jdGlvbiAoKSB7XG4gICAgLy9mYWxsYmFjayB0byBqb2luQ2hhbm5lbCBmb3IgRkRDMyA8Mi4wIGltcGxlbWVudGF0aW9uc1xuICAgIGlmICh3aW5kb3cuZmRjMy5qb2luVXNlckNoYW5uZWwpIHtcbiAgICAgIHJldHVybiB3aW5kb3cuZmRjMy5qb2luVXNlckNoYW5uZWwoY2hhbm5lbElkKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHdpbmRvdy5mZGMzLmpvaW5DaGFubmVsKGNoYW5uZWxJZCk7XG4gICAgfVxuICB9KTtcbn1cbmZ1bmN0aW9uIGpvaW5DaGFubmVsKGNoYW5uZWxJZCkge1xuICAvL2ZhbGxmb3J3YXJkIHRvIGpvaW5Vc2VyQ2hhbm5lbCBmb3IgRkRDMyAyLjArIGltcGxlbWVudGF0aW9uc1xuICByZXR1cm4gam9pblVzZXJDaGFubmVsKGNoYW5uZWxJZCk7XG59XG5mdW5jdGlvbiBnZXRPckNyZWF0ZUNoYW5uZWwoY2hhbm5lbElkKSB7XG4gIHJldHVybiByZWplY3RJZk5vR2xvYmFsKGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gd2luZG93LmZkYzMuZ2V0T3JDcmVhdGVDaGFubmVsKGNoYW5uZWxJZCk7XG4gIH0pO1xufVxuZnVuY3Rpb24gZ2V0Q3VycmVudENoYW5uZWwoKSB7XG4gIHJldHVybiByZWplY3RJZk5vR2xvYmFsKGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gd2luZG93LmZkYzMuZ2V0Q3VycmVudENoYW5uZWwoKTtcbiAgfSk7XG59XG5mdW5jdGlvbiBsZWF2ZUN1cnJlbnRDaGFubmVsKCkge1xuICByZXR1cm4gcmVqZWN0SWZOb0dsb2JhbChmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHdpbmRvdy5mZGMzLmxlYXZlQ3VycmVudENoYW5uZWwoKTtcbiAgfSk7XG59XG5mdW5jdGlvbiBjcmVhdGVQcml2YXRlQ2hhbm5lbCgpIHtcbiAgcmV0dXJuIHJlamVjdElmTm9HbG9iYWwoZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB3aW5kb3cuZmRjMy5jcmVhdGVQcml2YXRlQ2hhbm5lbCgpO1xuICB9KTtcbn1cbmZ1bmN0aW9uIGdldEluZm8oKSB7XG4gIHJldHVybiByZWplY3RJZk5vR2xvYmFsKGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gd2luZG93LmZkYzMuZ2V0SW5mbygpO1xuICB9KTtcbn1cbmZ1bmN0aW9uIGdldEFwcE1ldGFkYXRhKGFwcCkge1xuICByZXR1cm4gcmVqZWN0SWZOb0dsb2JhbChmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHdpbmRvdy5mZGMzLmdldEFwcE1ldGFkYXRhKGFwcCk7XG4gIH0pO1xufVxuZnVuY3Rpb24gZmluZEluc3RhbmNlcyhhcHApIHtcbiAgcmV0dXJuIHJlamVjdElmTm9HbG9iYWwoZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB3aW5kb3cuZmRjMy5maW5kSW5zdGFuY2VzKGFwcCk7XG4gIH0pO1xufVxuLyoqXHJcbiAqIENvbXBhcmUgbnVtZXJpYyBzZW12ZXIgdmVyc2lvbiBudW1iZXIgc3RyaW5ncyAoaW4gdGhlIGZvcm0gYDEuMi4zYCkuXHJcbiAqXHJcbiAqIFJldHVybnMgYC0xYCBpZiB0aGUgZmlyc3QgYXJndW1lbnQgaXMgYSBsb3dlciB2ZXJzaW9uIG51bWJlciB0aGFuIHRoZSBzZWNvbmQsXHJcbiAqIGAxYCBpZiB0aGUgZmlyc3QgYXJndW1lbnQgaXMgZ3JlYXRlciB0aGFuIHRoZSBzZWNvbmQsIDAgaWYgdGhlIGFyZ3VtZW50cyBhcmVcclxuICogZXF1YWwgYW5kIGBudWxsYCBpZiBhbiBlcnJvciBvY2N1cnJlZCBkdXJpbmcgdGhlIGNvbXBhcmlzb24uXHJcbiAqXHJcbiAqIEBwYXJhbSBhXHJcbiAqIEBwYXJhbSBiXHJcbiAqL1xudmFyIGNvbXBhcmVWZXJzaW9uTnVtYmVycyA9IGZ1bmN0aW9uIGNvbXBhcmVWZXJzaW9uTnVtYmVycyhhLCBiKSB7XG4gIHRyeSB7XG4gICAgdmFyIGFWZXJBcnIgPSBhLnNwbGl0KCcuJykubWFwKE51bWJlcik7XG4gICAgdmFyIGJWZXJBcnIgPSBiLnNwbGl0KCcuJykubWFwKE51bWJlcik7XG4gICAgZm9yICh2YXIgaW5kZXggPSAwOyBpbmRleCA8IE1hdGgubWF4KGFWZXJBcnIubGVuZ3RoLCBiVmVyQXJyLmxlbmd0aCk7IGluZGV4KyspIHtcbiAgICAgIC8qIElmIG9uZSB2ZXJzaW9uIG51bWJlciBoYXMgbW9yZSBkaWdpdHMgYW5kIHRoZSBvdGhlciBkb2VzIG5vdCwgYW5kIHRoZXkgYXJlIG90aGVyd2lzZSBlcXVhbCxcclxuICAgICAgICAgYXNzdW1lIHRoZSBsb25nZXIgaXMgZ3JlYXRlci4gRS5nLiAxLjEuMSA+IDEuMSAqL1xuICAgICAgaWYgKGluZGV4ID09PSBhVmVyQXJyLmxlbmd0aCB8fCBhVmVyQXJyW2luZGV4XSA8IGJWZXJBcnJbaW5kZXhdKSB7XG4gICAgICAgIHJldHVybiAtMTtcbiAgICAgIH0gZWxzZSBpZiAoaW5kZXggPT09IGJWZXJBcnIubGVuZ3RoIHx8IGFWZXJBcnJbaW5kZXhdID4gYlZlckFycltpbmRleF0pIHtcbiAgICAgICAgcmV0dXJuIDE7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiAwO1xuICB9IGNhdGNoIChlKSB7XG4gICAgY29uc29sZS5lcnJvcignRmFpbGVkIHRvIGNvbXBhcmUgdmVyc2lvbiBzdHJpbmdzJywgZSk7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbn07XG4vKipcclxuICogQ2hlY2sgaWYgdGhlIEZEQzMgdmVyc2lvbiBpbiBhbiBJbXBsZW1lbnRhdGlvbk1ldGFkYXRhIG9iamVjdCBpcyBncmVhdGVyIHRoYW5cclxuICogb3IgZXF1YWwgdG8gdGhlIHN1cHBsaWVkIG51bWVyaWMgc2VtdmVyIHZlcnNpb24gbnVtYmVyIHN0cmluZyAoaW4gdGhlIGZvcm0gYDEuMi4zYCkuXHJcbiAqXHJcbiAqIFJldHVybnMgYSBib29sZWFuIG9yIG51bGwgaWYgYW4gZXJyb3Igb2NjdXJyZWQgd2hpbGUgY29tcGFyaW5nIHRoZSB2ZXJzaW9uIG51bWJlcnMuXHJcbiAqXHJcbiAqIEBwYXJhbSBtZXRhZGF0YVxyXG4gKiBAcGFyYW0gdmVyc2lvblxyXG4gKi9cbnZhciB2ZXJzaW9uSXNBdExlYXN0ID0gZnVuY3Rpb24gdmVyc2lvbklzQXRMZWFzdChtZXRhZGF0YSwgdmVyc2lvbikge1xuICB2YXIgY29tcGFyaXNvbiA9IGNvbXBhcmVWZXJzaW9uTnVtYmVycyhtZXRhZGF0YS5mZGMzVmVyc2lvbiwgdmVyc2lvbik7XG4gIHJldHVybiBjb21wYXJpc29uID09PSBudWxsID8gbnVsbCA6IGNvbXBhcmlzb24gPj0gMCA/IHRydWUgOiBmYWxzZTtcbn07XG5cbnZhciBDb250ZXh0VHlwZXM7XG4oZnVuY3Rpb24gKENvbnRleHRUeXBlcykge1xuICBDb250ZXh0VHlwZXNbXCJDaGFydFwiXSA9IFwiZmRjMy5jaGFydFwiO1xuICBDb250ZXh0VHlwZXNbXCJDaGF0SW5pdFNldHRpbmdzXCJdID0gXCJmZGMzLmNoYXQuaW5pdFNldHRpbmdzXCI7XG4gIENvbnRleHRUeXBlc1tcIkNvbnRhY3RcIl0gPSBcImZkYzMuY29udGFjdFwiO1xuICBDb250ZXh0VHlwZXNbXCJDb250YWN0TGlzdFwiXSA9IFwiZmRjMy5jb250YWN0TGlzdFwiO1xuICBDb250ZXh0VHlwZXNbXCJDb3VudHJ5XCJdID0gXCJmZGMzLmNvdW50cnlcIjtcbiAgQ29udGV4dFR5cGVzW1wiQ3VycmVuY3lcIl0gPSBcImZkYzMuY3VycmVuY3lcIjtcbiAgQ29udGV4dFR5cGVzW1wiRW1haWxcIl0gPSBcImZkYzMuZW1haWxcIjtcbiAgQ29udGV4dFR5cGVzW1wiSW5zdHJ1bWVudFwiXSA9IFwiZmRjMy5pbnN0cnVtZW50XCI7XG4gIENvbnRleHRUeXBlc1tcIkluc3RydW1lbnRMaXN0XCJdID0gXCJmZGMzLmluc3RydW1lbnRMaXN0XCI7XG4gIENvbnRleHRUeXBlc1tcIk9yZ2FuaXphdGlvblwiXSA9IFwiZmRjMy5vcmdhbml6YXRpb25cIjtcbiAgQ29udGV4dFR5cGVzW1wiUG9ydGZvbGlvXCJdID0gXCJmZGMzLnBvcnRmb2xpb1wiO1xuICBDb250ZXh0VHlwZXNbXCJQb3NpdGlvblwiXSA9IFwiZmRjMy5wb3NpdGlvblwiO1xuICBDb250ZXh0VHlwZXNbXCJOb3RoaW5nXCJdID0gXCJmZGMzLm5vdGhpbmdcIjtcbiAgQ29udGV4dFR5cGVzW1wiVGltZVJhbmdlXCJdID0gXCJmZGMzLnRpbWVyYW5nZVwiO1xuICBDb250ZXh0VHlwZXNbXCJWYWx1YXRpb25cIl0gPSBcImZkYzMudmFsdWF0aW9uXCI7XG59KShDb250ZXh0VHlwZXMgfHwgKENvbnRleHRUeXBlcyA9IHt9KSk7XG5cbi8vIFRvIHBhcnNlIHRoaXMgZGF0YTpcbi8vXG4vLyAgIGltcG9ydCB7IENvbnZlcnQsIENoYXJ0LCBDaGF0SW5pdFNldHRpbmdzLCBDb250YWN0LCBDb250YWN0TGlzdCwgQ29udGV4dCwgQ291bnRyeSwgQ3VycmVuY3ksIEVtYWlsLCBJbnN0cnVtZW50LCBJbnN0cnVtZW50TGlzdCwgTm90aGluZywgT3JnYW5pemF0aW9uLCBQb3J0Zm9saW8sIFBvc2l0aW9uLCBUaW1lUmFuZ2UsIFZhbHVhdGlvbiB9IGZyb20gXCIuL2ZpbGVcIjtcbi8vXG4vLyAgIGNvbnN0IGNoYXJ0ID0gQ29udmVydC50b0NoYXJ0KGpzb24pO1xuLy8gICBjb25zdCBjaGF0SW5pdFNldHRpbmdzID0gQ29udmVydC50b0NoYXRJbml0U2V0dGluZ3MoanNvbik7XG4vLyAgIGNvbnN0IGNvbnRhY3QgPSBDb252ZXJ0LnRvQ29udGFjdChqc29uKTtcbi8vICAgY29uc3QgY29udGFjdExpc3QgPSBDb252ZXJ0LnRvQ29udGFjdExpc3QoanNvbik7XG4vLyAgIGNvbnN0IGNvbnRleHQgPSBDb252ZXJ0LnRvQ29udGV4dChqc29uKTtcbi8vICAgY29uc3QgY291bnRyeSA9IENvbnZlcnQudG9Db3VudHJ5KGpzb24pO1xuLy8gICBjb25zdCBjdXJyZW5jeSA9IENvbnZlcnQudG9DdXJyZW5jeShqc29uKTtcbi8vICAgY29uc3QgZW1haWwgPSBDb252ZXJ0LnRvRW1haWwoanNvbik7XG4vLyAgIGNvbnN0IGluc3RydW1lbnQgPSBDb252ZXJ0LnRvSW5zdHJ1bWVudChqc29uKTtcbi8vICAgY29uc3QgaW5zdHJ1bWVudExpc3QgPSBDb252ZXJ0LnRvSW5zdHJ1bWVudExpc3QoanNvbik7XG4vLyAgIGNvbnN0IG5vdGhpbmcgPSBDb252ZXJ0LnRvTm90aGluZyhqc29uKTtcbi8vICAgY29uc3Qgb3JnYW5pemF0aW9uID0gQ29udmVydC50b09yZ2FuaXphdGlvbihqc29uKTtcbi8vICAgY29uc3QgcG9ydGZvbGlvID0gQ29udmVydC50b1BvcnRmb2xpbyhqc29uKTtcbi8vICAgY29uc3QgcG9zaXRpb24gPSBDb252ZXJ0LnRvUG9zaXRpb24oanNvbik7XG4vLyAgIGNvbnN0IHRpbWVSYW5nZSA9IENvbnZlcnQudG9UaW1lUmFuZ2UoanNvbik7XG4vLyAgIGNvbnN0IHZhbHVhdGlvbiA9IENvbnZlcnQudG9WYWx1YXRpb24oanNvbik7XG4vL1xuLy8gVGhlc2UgZnVuY3Rpb25zIHdpbGwgdGhyb3cgYW4gZXJyb3IgaWYgdGhlIEpTT04gZG9lc24ndFxuLy8gbWF0Y2ggdGhlIGV4cGVjdGVkIGludGVyZmFjZSwgZXZlbiBpZiB0aGUgSlNPTiBpcyB2YWxpZC5cbnZhciBTdHlsZTtcbihmdW5jdGlvbiAoU3R5bGUpIHtcbiAgU3R5bGVbXCJCYXJcIl0gPSBcImJhclwiO1xuICBTdHlsZVtcIkNhbmRsZVwiXSA9IFwiY2FuZGxlXCI7XG4gIFN0eWxlW1wiQ3VzdG9tXCJdID0gXCJjdXN0b21cIjtcbiAgU3R5bGVbXCJIZWF0bWFwXCJdID0gXCJoZWF0bWFwXCI7XG4gIFN0eWxlW1wiSGlzdG9ncmFtXCJdID0gXCJoaXN0b2dyYW1cIjtcbiAgU3R5bGVbXCJMaW5lXCJdID0gXCJsaW5lXCI7XG4gIFN0eWxlW1wiTW91bnRhaW5cIl0gPSBcIm1vdW50YWluXCI7XG4gIFN0eWxlW1wiUGllXCJdID0gXCJwaWVcIjtcbiAgU3R5bGVbXCJTY2F0dGVyXCJdID0gXCJzY2F0dGVyXCI7XG4gIFN0eWxlW1wiU3RhY2tlZEJhclwiXSA9IFwic3RhY2tlZC1iYXJcIjtcbn0pKFN0eWxlIHx8IChTdHlsZSA9IHt9KSk7XG4vLyBDb252ZXJ0cyBKU09OIHN0cmluZ3MgdG8vZnJvbSB5b3VyIHR5cGVzXG4vLyBhbmQgYXNzZXJ0cyB0aGUgcmVzdWx0cyBvZiBKU09OLnBhcnNlIGF0IHJ1bnRpbWVcbnZhciBDb252ZXJ0ID0gLyojX19QVVJFX18qL2Z1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gQ29udmVydCgpIHt9XG4gIENvbnZlcnQudG9DaGFydCA9IGZ1bmN0aW9uIHRvQ2hhcnQoanNvbikge1xuICAgIHJldHVybiBjYXN0KEpTT04ucGFyc2UoanNvbiksIHIoJ0NoYXJ0JykpO1xuICB9O1xuICBDb252ZXJ0LmNoYXJ0VG9Kc29uID0gZnVuY3Rpb24gY2hhcnRUb0pzb24odmFsdWUpIHtcbiAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodW5jYXN0KHZhbHVlLCByKCdDaGFydCcpKSwgbnVsbCwgMik7XG4gIH07XG4gIENvbnZlcnQudG9DaGF0SW5pdFNldHRpbmdzID0gZnVuY3Rpb24gdG9DaGF0SW5pdFNldHRpbmdzKGpzb24pIHtcbiAgICByZXR1cm4gY2FzdChKU09OLnBhcnNlKGpzb24pLCByKCdDaGF0SW5pdFNldHRpbmdzJykpO1xuICB9O1xuICBDb252ZXJ0LmNoYXRJbml0U2V0dGluZ3NUb0pzb24gPSBmdW5jdGlvbiBjaGF0SW5pdFNldHRpbmdzVG9Kc29uKHZhbHVlKSB7XG4gICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHVuY2FzdCh2YWx1ZSwgcignQ2hhdEluaXRTZXR0aW5ncycpKSwgbnVsbCwgMik7XG4gIH07XG4gIENvbnZlcnQudG9Db250YWN0ID0gZnVuY3Rpb24gdG9Db250YWN0KGpzb24pIHtcbiAgICByZXR1cm4gY2FzdChKU09OLnBhcnNlKGpzb24pLCByKCdDb250YWN0JykpO1xuICB9O1xuICBDb252ZXJ0LmNvbnRhY3RUb0pzb24gPSBmdW5jdGlvbiBjb250YWN0VG9Kc29uKHZhbHVlKSB7XG4gICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHVuY2FzdCh2YWx1ZSwgcignQ29udGFjdCcpKSwgbnVsbCwgMik7XG4gIH07XG4gIENvbnZlcnQudG9Db250YWN0TGlzdCA9IGZ1bmN0aW9uIHRvQ29udGFjdExpc3QoanNvbikge1xuICAgIHJldHVybiBjYXN0KEpTT04ucGFyc2UoanNvbiksIHIoJ0NvbnRhY3RMaXN0JykpO1xuICB9O1xuICBDb252ZXJ0LmNvbnRhY3RMaXN0VG9Kc29uID0gZnVuY3Rpb24gY29udGFjdExpc3RUb0pzb24odmFsdWUpIHtcbiAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodW5jYXN0KHZhbHVlLCByKCdDb250YWN0TGlzdCcpKSwgbnVsbCwgMik7XG4gIH07XG4gIENvbnZlcnQudG9Db250ZXh0ID0gZnVuY3Rpb24gdG9Db250ZXh0KGpzb24pIHtcbiAgICByZXR1cm4gY2FzdChKU09OLnBhcnNlKGpzb24pLCByKCdDb250ZXh0JykpO1xuICB9O1xuICBDb252ZXJ0LmNvbnRleHRUb0pzb24gPSBmdW5jdGlvbiBjb250ZXh0VG9Kc29uKHZhbHVlKSB7XG4gICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHVuY2FzdCh2YWx1ZSwgcignQ29udGV4dCcpKSwgbnVsbCwgMik7XG4gIH07XG4gIENvbnZlcnQudG9Db3VudHJ5ID0gZnVuY3Rpb24gdG9Db3VudHJ5KGpzb24pIHtcbiAgICByZXR1cm4gY2FzdChKU09OLnBhcnNlKGpzb24pLCByKCdDb3VudHJ5JykpO1xuICB9O1xuICBDb252ZXJ0LmNvdW50cnlUb0pzb24gPSBmdW5jdGlvbiBjb3VudHJ5VG9Kc29uKHZhbHVlKSB7XG4gICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHVuY2FzdCh2YWx1ZSwgcignQ291bnRyeScpKSwgbnVsbCwgMik7XG4gIH07XG4gIENvbnZlcnQudG9DdXJyZW5jeSA9IGZ1bmN0aW9uIHRvQ3VycmVuY3koanNvbikge1xuICAgIHJldHVybiBjYXN0KEpTT04ucGFyc2UoanNvbiksIHIoJ0N1cnJlbmN5JykpO1xuICB9O1xuICBDb252ZXJ0LmN1cnJlbmN5VG9Kc29uID0gZnVuY3Rpb24gY3VycmVuY3lUb0pzb24odmFsdWUpIHtcbiAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodW5jYXN0KHZhbHVlLCByKCdDdXJyZW5jeScpKSwgbnVsbCwgMik7XG4gIH07XG4gIENvbnZlcnQudG9FbWFpbCA9IGZ1bmN0aW9uIHRvRW1haWwoanNvbikge1xuICAgIHJldHVybiBjYXN0KEpTT04ucGFyc2UoanNvbiksIHIoJ0VtYWlsJykpO1xuICB9O1xuICBDb252ZXJ0LmVtYWlsVG9Kc29uID0gZnVuY3Rpb24gZW1haWxUb0pzb24odmFsdWUpIHtcbiAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodW5jYXN0KHZhbHVlLCByKCdFbWFpbCcpKSwgbnVsbCwgMik7XG4gIH07XG4gIENvbnZlcnQudG9JbnN0cnVtZW50ID0gZnVuY3Rpb24gdG9JbnN0cnVtZW50KGpzb24pIHtcbiAgICByZXR1cm4gY2FzdChKU09OLnBhcnNlKGpzb24pLCByKCdJbnN0cnVtZW50JykpO1xuICB9O1xuICBDb252ZXJ0Lmluc3RydW1lbnRUb0pzb24gPSBmdW5jdGlvbiBpbnN0cnVtZW50VG9Kc29uKHZhbHVlKSB7XG4gICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHVuY2FzdCh2YWx1ZSwgcignSW5zdHJ1bWVudCcpKSwgbnVsbCwgMik7XG4gIH07XG4gIENvbnZlcnQudG9JbnN0cnVtZW50TGlzdCA9IGZ1bmN0aW9uIHRvSW5zdHJ1bWVudExpc3QoanNvbikge1xuICAgIHJldHVybiBjYXN0KEpTT04ucGFyc2UoanNvbiksIHIoJ0luc3RydW1lbnRMaXN0JykpO1xuICB9O1xuICBDb252ZXJ0Lmluc3RydW1lbnRMaXN0VG9Kc29uID0gZnVuY3Rpb24gaW5zdHJ1bWVudExpc3RUb0pzb24odmFsdWUpIHtcbiAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodW5jYXN0KHZhbHVlLCByKCdJbnN0cnVtZW50TGlzdCcpKSwgbnVsbCwgMik7XG4gIH07XG4gIENvbnZlcnQudG9Ob3RoaW5nID0gZnVuY3Rpb24gdG9Ob3RoaW5nKGpzb24pIHtcbiAgICByZXR1cm4gY2FzdChKU09OLnBhcnNlKGpzb24pLCByKCdOb3RoaW5nJykpO1xuICB9O1xuICBDb252ZXJ0Lm5vdGhpbmdUb0pzb24gPSBmdW5jdGlvbiBub3RoaW5nVG9Kc29uKHZhbHVlKSB7XG4gICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHVuY2FzdCh2YWx1ZSwgcignTm90aGluZycpKSwgbnVsbCwgMik7XG4gIH07XG4gIENvbnZlcnQudG9Pcmdhbml6YXRpb24gPSBmdW5jdGlvbiB0b09yZ2FuaXphdGlvbihqc29uKSB7XG4gICAgcmV0dXJuIGNhc3QoSlNPTi5wYXJzZShqc29uKSwgcignT3JnYW5pemF0aW9uJykpO1xuICB9O1xuICBDb252ZXJ0Lm9yZ2FuaXphdGlvblRvSnNvbiA9IGZ1bmN0aW9uIG9yZ2FuaXphdGlvblRvSnNvbih2YWx1ZSkge1xuICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh1bmNhc3QodmFsdWUsIHIoJ09yZ2FuaXphdGlvbicpKSwgbnVsbCwgMik7XG4gIH07XG4gIENvbnZlcnQudG9Qb3J0Zm9saW8gPSBmdW5jdGlvbiB0b1BvcnRmb2xpbyhqc29uKSB7XG4gICAgcmV0dXJuIGNhc3QoSlNPTi5wYXJzZShqc29uKSwgcignUG9ydGZvbGlvJykpO1xuICB9O1xuICBDb252ZXJ0LnBvcnRmb2xpb1RvSnNvbiA9IGZ1bmN0aW9uIHBvcnRmb2xpb1RvSnNvbih2YWx1ZSkge1xuICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh1bmNhc3QodmFsdWUsIHIoJ1BvcnRmb2xpbycpKSwgbnVsbCwgMik7XG4gIH07XG4gIENvbnZlcnQudG9Qb3NpdGlvbiA9IGZ1bmN0aW9uIHRvUG9zaXRpb24oanNvbikge1xuICAgIHJldHVybiBjYXN0KEpTT04ucGFyc2UoanNvbiksIHIoJ1Bvc2l0aW9uJykpO1xuICB9O1xuICBDb252ZXJ0LnBvc2l0aW9uVG9Kc29uID0gZnVuY3Rpb24gcG9zaXRpb25Ub0pzb24odmFsdWUpIHtcbiAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodW5jYXN0KHZhbHVlLCByKCdQb3NpdGlvbicpKSwgbnVsbCwgMik7XG4gIH07XG4gIENvbnZlcnQudG9UaW1lUmFuZ2UgPSBmdW5jdGlvbiB0b1RpbWVSYW5nZShqc29uKSB7XG4gICAgcmV0dXJuIGNhc3QoSlNPTi5wYXJzZShqc29uKSwgcignVGltZVJhbmdlJykpO1xuICB9O1xuICBDb252ZXJ0LnRpbWVSYW5nZVRvSnNvbiA9IGZ1bmN0aW9uIHRpbWVSYW5nZVRvSnNvbih2YWx1ZSkge1xuICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh1bmNhc3QodmFsdWUsIHIoJ1RpbWVSYW5nZScpKSwgbnVsbCwgMik7XG4gIH07XG4gIENvbnZlcnQudG9WYWx1YXRpb24gPSBmdW5jdGlvbiB0b1ZhbHVhdGlvbihqc29uKSB7XG4gICAgcmV0dXJuIGNhc3QoSlNPTi5wYXJzZShqc29uKSwgcignVmFsdWF0aW9uJykpO1xuICB9O1xuICBDb252ZXJ0LnZhbHVhdGlvblRvSnNvbiA9IGZ1bmN0aW9uIHZhbHVhdGlvblRvSnNvbih2YWx1ZSkge1xuICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh1bmNhc3QodmFsdWUsIHIoJ1ZhbHVhdGlvbicpKSwgbnVsbCwgMik7XG4gIH07XG4gIHJldHVybiBDb252ZXJ0O1xufSgpO1xuZnVuY3Rpb24gaW52YWxpZFZhbHVlKHR5cCwgdmFsLCBrZXksIHBhcmVudCkge1xuICBpZiAocGFyZW50ID09PSB2b2lkIDApIHtcbiAgICBwYXJlbnQgPSAnJztcbiAgfVxuICB2YXIgcHJldHR5VHlwID0gcHJldHR5VHlwZU5hbWUodHlwKTtcbiAgdmFyIHBhcmVudFRleHQgPSBwYXJlbnQgPyBcIiBvbiBcIiArIHBhcmVudCA6ICcnO1xuICB2YXIga2V5VGV4dCA9IGtleSA/IFwiIGZvciBrZXkgXFxcIlwiICsga2V5ICsgXCJcXFwiXCIgOiAnJztcbiAgdGhyb3cgRXJyb3IoXCJJbnZhbGlkIHZhbHVlXCIgKyBrZXlUZXh0ICsgcGFyZW50VGV4dCArIFwiLiBFeHBlY3RlZCBcIiArIHByZXR0eVR5cCArIFwiIGJ1dCBnb3QgXCIgKyBKU09OLnN0cmluZ2lmeSh2YWwpKTtcbn1cbmZ1bmN0aW9uIHByZXR0eVR5cGVOYW1lKHR5cCkge1xuICBpZiAoQXJyYXkuaXNBcnJheSh0eXApKSB7XG4gICAgaWYgKHR5cC5sZW5ndGggPT09IDIgJiYgdHlwWzBdID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiBcImFuIG9wdGlvbmFsIFwiICsgcHJldHR5VHlwZU5hbWUodHlwWzFdKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIFwib25lIG9mIFtcIiArIHR5cC5tYXAoZnVuY3Rpb24gKGEpIHtcbiAgICAgICAgcmV0dXJuIHByZXR0eVR5cGVOYW1lKGEpO1xuICAgICAgfSkuam9pbignLCAnKSArIFwiXVwiO1xuICAgIH1cbiAgfSBlbHNlIGlmICh0eXBlb2YgdHlwID09PSAnb2JqZWN0JyAmJiB0eXAubGl0ZXJhbCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIHR5cC5saXRlcmFsO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiB0eXBlb2YgdHlwO1xuICB9XG59XG5mdW5jdGlvbiBqc29uVG9KU1Byb3BzKHR5cCkge1xuICBpZiAodHlwLmpzb25Ub0pTID09PSB1bmRlZmluZWQpIHtcbiAgICB2YXIgbWFwID0ge307XG4gICAgdHlwLnByb3BzLmZvckVhY2goZnVuY3Rpb24gKHApIHtcbiAgICAgIHJldHVybiBtYXBbcC5qc29uXSA9IHtcbiAgICAgICAga2V5OiBwLmpzLFxuICAgICAgICB0eXA6IHAudHlwXG4gICAgICB9O1xuICAgIH0pO1xuICAgIHR5cC5qc29uVG9KUyA9IG1hcDtcbiAgfVxuICByZXR1cm4gdHlwLmpzb25Ub0pTO1xufVxuZnVuY3Rpb24ganNUb0pTT05Qcm9wcyh0eXApIHtcbiAgaWYgKHR5cC5qc1RvSlNPTiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgdmFyIG1hcCA9IHt9O1xuICAgIHR5cC5wcm9wcy5mb3JFYWNoKGZ1bmN0aW9uIChwKSB7XG4gICAgICByZXR1cm4gbWFwW3AuanNdID0ge1xuICAgICAgICBrZXk6IHAuanNvbixcbiAgICAgICAgdHlwOiBwLnR5cFxuICAgICAgfTtcbiAgICB9KTtcbiAgICB0eXAuanNUb0pTT04gPSBtYXA7XG4gIH1cbiAgcmV0dXJuIHR5cC5qc1RvSlNPTjtcbn1cbmZ1bmN0aW9uIHRyYW5zZm9ybSh2YWwsIHR5cCwgZ2V0UHJvcHMsIGtleSwgcGFyZW50KSB7XG4gIGlmIChrZXkgPT09IHZvaWQgMCkge1xuICAgIGtleSA9ICcnO1xuICB9XG4gIGlmIChwYXJlbnQgPT09IHZvaWQgMCkge1xuICAgIHBhcmVudCA9ICcnO1xuICB9XG4gIGZ1bmN0aW9uIHRyYW5zZm9ybVByaW1pdGl2ZSh0eXAsIHZhbCkge1xuICAgIGlmICh0eXBlb2YgdHlwID09PSB0eXBlb2YgdmFsKSByZXR1cm4gdmFsO1xuICAgIHJldHVybiBpbnZhbGlkVmFsdWUodHlwLCB2YWwsIGtleSwgcGFyZW50KTtcbiAgfVxuICBmdW5jdGlvbiB0cmFuc2Zvcm1Vbmlvbih0eXBzLCB2YWwpIHtcbiAgICAvLyB2YWwgbXVzdCB2YWxpZGF0ZSBhZ2FpbnN0IG9uZSB0eXAgaW4gdHlwc1xuICAgIHZhciBsID0gdHlwcy5sZW5ndGg7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsOyBpKyspIHtcbiAgICAgIHZhciBfdHlwID0gdHlwc1tpXTtcbiAgICAgIHRyeSB7XG4gICAgICAgIHJldHVybiB0cmFuc2Zvcm0odmFsLCBfdHlwLCBnZXRQcm9wcyk7XG4gICAgICB9IGNhdGNoIChfKSB7fVxuICAgIH1cbiAgICByZXR1cm4gaW52YWxpZFZhbHVlKHR5cHMsIHZhbCwga2V5LCBwYXJlbnQpO1xuICB9XG4gIGZ1bmN0aW9uIHRyYW5zZm9ybUVudW0oY2FzZXMsIHZhbCkge1xuICAgIGlmIChjYXNlcy5pbmRleE9mKHZhbCkgIT09IC0xKSByZXR1cm4gdmFsO1xuICAgIHJldHVybiBpbnZhbGlkVmFsdWUoY2FzZXMubWFwKGZ1bmN0aW9uIChhKSB7XG4gICAgICByZXR1cm4gbChhKTtcbiAgICB9KSwgdmFsLCBrZXksIHBhcmVudCk7XG4gIH1cbiAgZnVuY3Rpb24gdHJhbnNmb3JtQXJyYXkodHlwLCB2YWwpIHtcbiAgICAvLyB2YWwgbXVzdCBiZSBhbiBhcnJheSB3aXRoIG5vIGludmFsaWQgZWxlbWVudHNcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkodmFsKSkgcmV0dXJuIGludmFsaWRWYWx1ZShsKCdhcnJheScpLCB2YWwsIGtleSwgcGFyZW50KTtcbiAgICByZXR1cm4gdmFsLm1hcChmdW5jdGlvbiAoZWwpIHtcbiAgICAgIHJldHVybiB0cmFuc2Zvcm0oZWwsIHR5cCwgZ2V0UHJvcHMpO1xuICAgIH0pO1xuICB9XG4gIGZ1bmN0aW9uIHRyYW5zZm9ybURhdGUodmFsKSB7XG4gICAgaWYgKHZhbCA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHZhciBkID0gbmV3IERhdGUodmFsKTtcbiAgICBpZiAoaXNOYU4oZC52YWx1ZU9mKCkpKSB7XG4gICAgICByZXR1cm4gaW52YWxpZFZhbHVlKGwoJ0RhdGUnKSwgdmFsLCBrZXksIHBhcmVudCk7XG4gICAgfVxuICAgIHJldHVybiBkO1xuICB9XG4gIGZ1bmN0aW9uIHRyYW5zZm9ybU9iamVjdChwcm9wcywgYWRkaXRpb25hbCwgdmFsKSB7XG4gICAgaWYgKHZhbCA9PT0gbnVsbCB8fCB0eXBlb2YgdmFsICE9PSAnb2JqZWN0JyB8fCBBcnJheS5pc0FycmF5KHZhbCkpIHtcbiAgICAgIHJldHVybiBpbnZhbGlkVmFsdWUobChyZWYgfHwgJ29iamVjdCcpLCB2YWwsIGtleSwgcGFyZW50KTtcbiAgICB9XG4gICAgdmFyIHJlc3VsdCA9IHt9O1xuICAgIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHByb3BzKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgIHZhciBwcm9wID0gcHJvcHNba2V5XTtcbiAgICAgIHZhciB2ID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHZhbCwga2V5KSA/IHZhbFtrZXldIDogdW5kZWZpbmVkO1xuICAgICAgcmVzdWx0W3Byb3Aua2V5XSA9IHRyYW5zZm9ybSh2LCBwcm9wLnR5cCwgZ2V0UHJvcHMsIGtleSwgcmVmKTtcbiAgICB9KTtcbiAgICBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh2YWwpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgICAgaWYgKCFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocHJvcHMsIGtleSkpIHtcbiAgICAgICAgcmVzdWx0W2tleV0gPSB0cmFuc2Zvcm0odmFsW2tleV0sIGFkZGl0aW9uYWwsIGdldFByb3BzLCBrZXksIHJlZik7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuICBpZiAodHlwID09PSAnYW55JykgcmV0dXJuIHZhbDtcbiAgaWYgKHR5cCA9PT0gbnVsbCkge1xuICAgIGlmICh2YWwgPT09IG51bGwpIHJldHVybiB2YWw7XG4gICAgcmV0dXJuIGludmFsaWRWYWx1ZSh0eXAsIHZhbCwga2V5LCBwYXJlbnQpO1xuICB9XG4gIGlmICh0eXAgPT09IGZhbHNlKSByZXR1cm4gaW52YWxpZFZhbHVlKHR5cCwgdmFsLCBrZXksIHBhcmVudCk7XG4gIHZhciByZWYgPSB1bmRlZmluZWQ7XG4gIHdoaWxlICh0eXBlb2YgdHlwID09PSAnb2JqZWN0JyAmJiB0eXAucmVmICE9PSB1bmRlZmluZWQpIHtcbiAgICByZWYgPSB0eXAucmVmO1xuICAgIHR5cCA9IHR5cGVNYXBbdHlwLnJlZl07XG4gIH1cbiAgaWYgKEFycmF5LmlzQXJyYXkodHlwKSkgcmV0dXJuIHRyYW5zZm9ybUVudW0odHlwLCB2YWwpO1xuICBpZiAodHlwZW9mIHR5cCA9PT0gJ29iamVjdCcpIHtcbiAgICByZXR1cm4gdHlwLmhhc093blByb3BlcnR5KCd1bmlvbk1lbWJlcnMnKSA/IHRyYW5zZm9ybVVuaW9uKHR5cC51bmlvbk1lbWJlcnMsIHZhbCkgOiB0eXAuaGFzT3duUHJvcGVydHkoJ2FycmF5SXRlbXMnKSA/IHRyYW5zZm9ybUFycmF5KHR5cC5hcnJheUl0ZW1zLCB2YWwpIDogdHlwLmhhc093blByb3BlcnR5KCdwcm9wcycpID8gdHJhbnNmb3JtT2JqZWN0KGdldFByb3BzKHR5cCksIHR5cC5hZGRpdGlvbmFsLCB2YWwpIDogaW52YWxpZFZhbHVlKHR5cCwgdmFsLCBrZXksIHBhcmVudCk7XG4gIH1cbiAgLy8gTnVtYmVycyBjYW4gYmUgcGFyc2VkIGJ5IERhdGUgYnV0IHNob3VsZG4ndCBiZS5cbiAgaWYgKHR5cCA9PT0gRGF0ZSAmJiB0eXBlb2YgdmFsICE9PSAnbnVtYmVyJykgcmV0dXJuIHRyYW5zZm9ybURhdGUodmFsKTtcbiAgcmV0dXJuIHRyYW5zZm9ybVByaW1pdGl2ZSh0eXAsIHZhbCk7XG59XG5mdW5jdGlvbiBjYXN0KHZhbCwgdHlwKSB7XG4gIHJldHVybiB0cmFuc2Zvcm0odmFsLCB0eXAsIGpzb25Ub0pTUHJvcHMpO1xufVxuZnVuY3Rpb24gdW5jYXN0KHZhbCwgdHlwKSB7XG4gIHJldHVybiB0cmFuc2Zvcm0odmFsLCB0eXAsIGpzVG9KU09OUHJvcHMpO1xufVxuZnVuY3Rpb24gbCh0eXApIHtcbiAgcmV0dXJuIHtcbiAgICBsaXRlcmFsOiB0eXBcbiAgfTtcbn1cbmZ1bmN0aW9uIGEodHlwKSB7XG4gIHJldHVybiB7XG4gICAgYXJyYXlJdGVtczogdHlwXG4gIH07XG59XG5mdW5jdGlvbiB1KCkge1xuICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgdHlwcyA9IG5ldyBBcnJheShfbGVuKSwgX2tleSA9IDA7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICB0eXBzW19rZXldID0gYXJndW1lbnRzW19rZXldO1xuICB9XG4gIHJldHVybiB7XG4gICAgdW5pb25NZW1iZXJzOiB0eXBzXG4gIH07XG59XG5mdW5jdGlvbiBvKHByb3BzLCBhZGRpdGlvbmFsKSB7XG4gIHJldHVybiB7XG4gICAgcHJvcHM6IHByb3BzLFxuICAgIGFkZGl0aW9uYWw6IGFkZGl0aW9uYWxcbiAgfTtcbn1cbmZ1bmN0aW9uIG0oYWRkaXRpb25hbCkge1xuICByZXR1cm4ge1xuICAgIHByb3BzOiBbXSxcbiAgICBhZGRpdGlvbmFsOiBhZGRpdGlvbmFsXG4gIH07XG59XG5mdW5jdGlvbiByKG5hbWUpIHtcbiAgcmV0dXJuIHtcbiAgICByZWY6IG5hbWVcbiAgfTtcbn1cbnZhciB0eXBlTWFwID0ge1xuICBDaGFydDogLyojX19QVVJFX18qL28oW3tcbiAgICBqc29uOiAnaW5zdHJ1bWVudHMnLFxuICAgIGpzOiAnaW5zdHJ1bWVudHMnLFxuICAgIHR5cDogLyojX19QVVJFX18qL2EoIC8qI19fUFVSRV9fKi9yKCdJbnN0cnVtZW50RWxlbWVudCcpKVxuICB9LCB7XG4gICAganNvbjogJ290aGVyQ29uZmlnJyxcbiAgICBqczogJ290aGVyQ29uZmlnJyxcbiAgICB0eXA6IC8qI19fUFVSRV9fKi91KHVuZGVmaW5lZCwgLyojX19QVVJFX18qL20oJ2FueScpKVxuICB9LCB7XG4gICAganNvbjogJ3JhbmdlJyxcbiAgICBqczogJ3JhbmdlJyxcbiAgICB0eXA6IC8qI19fUFVSRV9fKi91KHVuZGVmaW5lZCwgLyojX19QVVJFX18qL3IoJ1RpbWVSYW5nZU9iamVjdCcpKVxuICB9LCB7XG4gICAganNvbjogJ3N0eWxlJyxcbiAgICBqczogJ3N0eWxlJyxcbiAgICB0eXA6IC8qI19fUFVSRV9fKi91KHVuZGVmaW5lZCwgLyojX19QVVJFX18qL3IoJ1N0eWxlJykpXG4gIH0sIHtcbiAgICBqc29uOiAndHlwZScsXG4gICAganM6ICd0eXBlJyxcbiAgICB0eXA6ICcnXG4gIH0sIHtcbiAgICBqc29uOiAnaWQnLFxuICAgIGpzOiAnaWQnLFxuICAgIHR5cDogLyojX19QVVJFX18qL3UodW5kZWZpbmVkLCAvKiNfX1BVUkVfXyovbSgnYW55JykpXG4gIH0sIHtcbiAgICBqc29uOiAnbmFtZScsXG4gICAganM6ICduYW1lJyxcbiAgICB0eXA6IC8qI19fUFVSRV9fKi91KHVuZGVmaW5lZCwgJycpXG4gIH1dLCAnYW55JyksXG4gIEluc3RydW1lbnRFbGVtZW50OiAvKiNfX1BVUkVfXyovbyhbe1xuICAgIGpzb246ICdpZCcsXG4gICAganM6ICdpZCcsXG4gICAgdHlwOiAvKiNfX1BVUkVfXyovcignUHVycGxlSUQnKVxuICB9LCB7XG4gICAganNvbjogJ21hcmtldCcsXG4gICAganM6ICdtYXJrZXQnLFxuICAgIHR5cDogLyojX19QVVJFX18qL3UodW5kZWZpbmVkLCAvKiNfX1BVUkVfXyovcignUHVycGxlTWFya2V0JykpXG4gIH0sIHtcbiAgICBqc29uOiAndHlwZScsXG4gICAganM6ICd0eXBlJyxcbiAgICB0eXA6ICcnXG4gIH0sIHtcbiAgICBqc29uOiAnbmFtZScsXG4gICAganM6ICduYW1lJyxcbiAgICB0eXA6IC8qI19fUFVSRV9fKi91KHVuZGVmaW5lZCwgJycpXG4gIH1dLCAnYW55JyksXG4gIFB1cnBsZUlEOiAvKiNfX1BVUkVfXyovbyhbe1xuICAgIGpzb246ICdCQkcnLFxuICAgIGpzOiAnQkJHJyxcbiAgICB0eXA6IC8qI19fUFVSRV9fKi91KHVuZGVmaW5lZCwgJycpXG4gIH0sIHtcbiAgICBqc29uOiAnQ1VTSVAnLFxuICAgIGpzOiAnQ1VTSVAnLFxuICAgIHR5cDogLyojX19QVVJFX18qL3UodW5kZWZpbmVkLCAnJylcbiAgfSwge1xuICAgIGpzb246ICdGRFNfSUQnLFxuICAgIGpzOiAnRkRTX0lEJyxcbiAgICB0eXA6IC8qI19fUFVSRV9fKi91KHVuZGVmaW5lZCwgJycpXG4gIH0sIHtcbiAgICBqc29uOiAnRklHSScsXG4gICAganM6ICdGSUdJJyxcbiAgICB0eXA6IC8qI19fUFVSRV9fKi91KHVuZGVmaW5lZCwgJycpXG4gIH0sIHtcbiAgICBqc29uOiAnSVNJTicsXG4gICAganM6ICdJU0lOJyxcbiAgICB0eXA6IC8qI19fUFVSRV9fKi91KHVuZGVmaW5lZCwgJycpXG4gIH0sIHtcbiAgICBqc29uOiAnUEVSTUlEJyxcbiAgICBqczogJ1BFUk1JRCcsXG4gICAgdHlwOiAvKiNfX1BVUkVfXyovdSh1bmRlZmluZWQsICcnKVxuICB9LCB7XG4gICAganNvbjogJ1JJQycsXG4gICAganM6ICdSSUMnLFxuICAgIHR5cDogLyojX19QVVJFX18qL3UodW5kZWZpbmVkLCAnJylcbiAgfSwge1xuICAgIGpzb246ICdTRURPTCcsXG4gICAganM6ICdTRURPTCcsXG4gICAgdHlwOiAvKiNfX1BVUkVfXyovdSh1bmRlZmluZWQsICcnKVxuICB9LCB7XG4gICAganNvbjogJ3RpY2tlcicsXG4gICAganM6ICd0aWNrZXInLFxuICAgIHR5cDogLyojX19QVVJFX18qL3UodW5kZWZpbmVkLCAnJylcbiAgfV0sICdhbnknKSxcbiAgUHVycGxlTWFya2V0OiAvKiNfX1BVUkVfXyovbyhbe1xuICAgIGpzb246ICdCQkcnLFxuICAgIGpzOiAnQkJHJyxcbiAgICB0eXA6IC8qI19fUFVSRV9fKi91KHVuZGVmaW5lZCwgJycpXG4gIH0sIHtcbiAgICBqc29uOiAnQ09VTlRSWV9JU09BTFBIQTInLFxuICAgIGpzOiAnQ09VTlRSWV9JU09BTFBIQTInLFxuICAgIHR5cDogLyojX19QVVJFX18qL3UodW5kZWZpbmVkLCAnJylcbiAgfSwge1xuICAgIGpzb246ICdNSUMnLFxuICAgIGpzOiAnTUlDJyxcbiAgICB0eXA6IC8qI19fUFVSRV9fKi91KHVuZGVmaW5lZCwgJycpXG4gIH0sIHtcbiAgICBqc29uOiAnbmFtZScsXG4gICAganM6ICduYW1lJyxcbiAgICB0eXA6IC8qI19fUFVSRV9fKi91KHVuZGVmaW5lZCwgJycpXG4gIH1dLCAnYW55JyksXG4gIFRpbWVSYW5nZU9iamVjdDogLyojX19QVVJFX18qL28oW3tcbiAgICBqc29uOiAnZW5kVGltZScsXG4gICAganM6ICdlbmRUaW1lJyxcbiAgICB0eXA6IC8qI19fUFVSRV9fKi91KHVuZGVmaW5lZCwgRGF0ZSlcbiAgfSwge1xuICAgIGpzb246ICdzdGFydFRpbWUnLFxuICAgIGpzOiAnc3RhcnRUaW1lJyxcbiAgICB0eXA6IC8qI19fUFVSRV9fKi91KHVuZGVmaW5lZCwgRGF0ZSlcbiAgfSwge1xuICAgIGpzb246ICd0eXBlJyxcbiAgICBqczogJ3R5cGUnLFxuICAgIHR5cDogJydcbiAgfSwge1xuICAgIGpzb246ICdpZCcsXG4gICAganM6ICdpZCcsXG4gICAgdHlwOiAvKiNfX1BVUkVfXyovdSh1bmRlZmluZWQsIC8qI19fUFVSRV9fKi9tKCdhbnknKSlcbiAgfSwge1xuICAgIGpzb246ICduYW1lJyxcbiAgICBqczogJ25hbWUnLFxuICAgIHR5cDogLyojX19QVVJFX18qL3UodW5kZWZpbmVkLCAnJylcbiAgfV0sICdhbnknKSxcbiAgQ2hhdEluaXRTZXR0aW5nczogLyojX19QVVJFX18qL28oW3tcbiAgICBqc29uOiAnY2hhdE5hbWUnLFxuICAgIGpzOiAnY2hhdE5hbWUnLFxuICAgIHR5cDogLyojX19QVVJFX18qL3UodW5kZWZpbmVkLCAnJylcbiAgfSwge1xuICAgIGpzb246ICdpbml0TWVzc2FnZScsXG4gICAganM6ICdpbml0TWVzc2FnZScsXG4gICAgdHlwOiAvKiNfX1BVUkVfXyovdSh1bmRlZmluZWQsICcnKVxuICB9LCB7XG4gICAganNvbjogJ21lbWJlcnMnLFxuICAgIGpzOiAnbWVtYmVycycsXG4gICAgdHlwOiAvKiNfX1BVUkVfXyovdSh1bmRlZmluZWQsIC8qI19fUFVSRV9fKi9yKCdDb250YWN0TGlzdE9iamVjdCcpKVxuICB9LCB7XG4gICAganNvbjogJ29wdGlvbnMnLFxuICAgIGpzOiAnb3B0aW9ucycsXG4gICAgdHlwOiAvKiNfX1BVUkVfXyovdSh1bmRlZmluZWQsICdhbnknKVxuICB9LCB7XG4gICAganNvbjogJ3R5cGUnLFxuICAgIGpzOiAndHlwZScsXG4gICAgdHlwOiAnYW55J1xuICB9XSwgJ2FueScpLFxuICBDb250YWN0TGlzdE9iamVjdDogLyojX19QVVJFX18qL28oW3tcbiAgICBqc29uOiAnY29udGFjdHMnLFxuICAgIGpzOiAnY29udGFjdHMnLFxuICAgIHR5cDogLyojX19QVVJFX18qL2EoIC8qI19fUFVSRV9fKi9yKCdDb250YWN0RWxlbWVudCcpKVxuICB9LCB7XG4gICAganNvbjogJ3R5cGUnLFxuICAgIGpzOiAndHlwZScsXG4gICAgdHlwOiAnJ1xuICB9LCB7XG4gICAganNvbjogJ2lkJyxcbiAgICBqczogJ2lkJyxcbiAgICB0eXA6IC8qI19fUFVSRV9fKi91KHVuZGVmaW5lZCwgLyojX19QVVJFX18qL20oJ2FueScpKVxuICB9LCB7XG4gICAganNvbjogJ25hbWUnLFxuICAgIGpzOiAnbmFtZScsXG4gICAgdHlwOiAvKiNfX1BVUkVfXyovdSh1bmRlZmluZWQsICcnKVxuICB9XSwgJ2FueScpLFxuICBDb250YWN0RWxlbWVudDogLyojX19QVVJFX18qL28oW3tcbiAgICBqc29uOiAnaWQnLFxuICAgIGpzOiAnaWQnLFxuICAgIHR5cDogLyojX19QVVJFX18qL3IoJ0ZsdWZmeUlEJylcbiAgfSwge1xuICAgIGpzb246ICd0eXBlJyxcbiAgICBqczogJ3R5cGUnLFxuICAgIHR5cDogJydcbiAgfSwge1xuICAgIGpzb246ICduYW1lJyxcbiAgICBqczogJ25hbWUnLFxuICAgIHR5cDogLyojX19QVVJFX18qL3UodW5kZWZpbmVkLCAnJylcbiAgfV0sICdhbnknKSxcbiAgRmx1ZmZ5SUQ6IC8qI19fUFVSRV9fKi9vKFt7XG4gICAganNvbjogJ2VtYWlsJyxcbiAgICBqczogJ2VtYWlsJyxcbiAgICB0eXA6IC8qI19fUFVSRV9fKi91KHVuZGVmaW5lZCwgJycpXG4gIH0sIHtcbiAgICBqc29uOiAnRkRTX0lEJyxcbiAgICBqczogJ0ZEU19JRCcsXG4gICAgdHlwOiAvKiNfX1BVUkVfXyovdSh1bmRlZmluZWQsICcnKVxuICB9XSwgJ2FueScpLFxuICBDb250YWN0OiAvKiNfX1BVUkVfXyovbyhbe1xuICAgIGpzb246ICdpZCcsXG4gICAganM6ICdpZCcsXG4gICAgdHlwOiAvKiNfX1BVUkVfXyovcignVGVudGFjbGVkSUQnKVxuICB9LCB7XG4gICAganNvbjogJ3R5cGUnLFxuICAgIGpzOiAndHlwZScsXG4gICAgdHlwOiAnJ1xuICB9LCB7XG4gICAganNvbjogJ25hbWUnLFxuICAgIGpzOiAnbmFtZScsXG4gICAgdHlwOiAvKiNfX1BVUkVfXyovdSh1bmRlZmluZWQsICcnKVxuICB9XSwgJ2FueScpLFxuICBUZW50YWNsZWRJRDogLyojX19QVVJFX18qL28oW3tcbiAgICBqc29uOiAnZW1haWwnLFxuICAgIGpzOiAnZW1haWwnLFxuICAgIHR5cDogLyojX19QVVJFX18qL3UodW5kZWZpbmVkLCAnJylcbiAgfSwge1xuICAgIGpzb246ICdGRFNfSUQnLFxuICAgIGpzOiAnRkRTX0lEJyxcbiAgICB0eXA6IC8qI19fUFVSRV9fKi91KHVuZGVmaW5lZCwgJycpXG4gIH1dLCAnYW55JyksXG4gIENvbnRhY3RMaXN0OiAvKiNfX1BVUkVfXyovbyhbe1xuICAgIGpzb246ICdjb250YWN0cycsXG4gICAganM6ICdjb250YWN0cycsXG4gICAgdHlwOiAvKiNfX1BVUkVfXyovYSggLyojX19QVVJFX18qL3IoJ0NvbnRhY3RFbGVtZW50JykpXG4gIH0sIHtcbiAgICBqc29uOiAndHlwZScsXG4gICAganM6ICd0eXBlJyxcbiAgICB0eXA6ICcnXG4gIH0sIHtcbiAgICBqc29uOiAnaWQnLFxuICAgIGpzOiAnaWQnLFxuICAgIHR5cDogLyojX19QVVJFX18qL3UodW5kZWZpbmVkLCAvKiNfX1BVUkVfXyovbSgnYW55JykpXG4gIH0sIHtcbiAgICBqc29uOiAnbmFtZScsXG4gICAganM6ICduYW1lJyxcbiAgICB0eXA6IC8qI19fUFVSRV9fKi91KHVuZGVmaW5lZCwgJycpXG4gIH1dLCAnYW55JyksXG4gIENvbnRleHQ6IC8qI19fUFVSRV9fKi9vKFt7XG4gICAganNvbjogJ2lkJyxcbiAgICBqczogJ2lkJyxcbiAgICB0eXA6IC8qI19fUFVSRV9fKi91KHVuZGVmaW5lZCwgLyojX19QVVJFX18qL20oJ2FueScpKVxuICB9LCB7XG4gICAganNvbjogJ25hbWUnLFxuICAgIGpzOiAnbmFtZScsXG4gICAgdHlwOiAvKiNfX1BVUkVfXyovdSh1bmRlZmluZWQsICcnKVxuICB9LCB7XG4gICAganNvbjogJ3R5cGUnLFxuICAgIGpzOiAndHlwZScsXG4gICAgdHlwOiAnJ1xuICB9XSwgJ2FueScpLFxuICBDb3VudHJ5OiAvKiNfX1BVUkVfXyovbyhbe1xuICAgIGpzb246ICdpZCcsXG4gICAganM6ICdpZCcsXG4gICAgdHlwOiAvKiNfX1BVUkVfXyovcignQ291bnRyeUlEJylcbiAgfSwge1xuICAgIGpzb246ICd0eXBlJyxcbiAgICBqczogJ3R5cGUnLFxuICAgIHR5cDogJydcbiAgfSwge1xuICAgIGpzb246ICduYW1lJyxcbiAgICBqczogJ25hbWUnLFxuICAgIHR5cDogLyojX19QVVJFX18qL3UodW5kZWZpbmVkLCAnJylcbiAgfV0sICdhbnknKSxcbiAgQ291bnRyeUlEOiAvKiNfX1BVUkVfXyovbyhbe1xuICAgIGpzb246ICdDT1VOVFJZX0lTT0FMUEhBMicsXG4gICAganM6ICdDT1VOVFJZX0lTT0FMUEhBMicsXG4gICAgdHlwOiAvKiNfX1BVUkVfXyovdSh1bmRlZmluZWQsICcnKVxuICB9LCB7XG4gICAganNvbjogJ0NPVU5UUllfSVNPQUxQSEEzJyxcbiAgICBqczogJ0NPVU5UUllfSVNPQUxQSEEzJyxcbiAgICB0eXA6IC8qI19fUFVSRV9fKi91KHVuZGVmaW5lZCwgJycpXG4gIH0sIHtcbiAgICBqc29uOiAnSVNPQUxQSEEyJyxcbiAgICBqczogJ0lTT0FMUEhBMicsXG4gICAgdHlwOiAvKiNfX1BVUkVfXyovdSh1bmRlZmluZWQsICcnKVxuICB9LCB7XG4gICAganNvbjogJ0lTT0FMUEhBMycsXG4gICAganM6ICdJU09BTFBIQTMnLFxuICAgIHR5cDogLyojX19QVVJFX18qL3UodW5kZWZpbmVkLCAnJylcbiAgfV0sICdhbnknKSxcbiAgQ3VycmVuY3k6IC8qI19fUFVSRV9fKi9vKFt7XG4gICAganNvbjogJ2lkJyxcbiAgICBqczogJ2lkJyxcbiAgICB0eXA6IC8qI19fUFVSRV9fKi9yKCdDdXJyZW5jeUlEJylcbiAgfSwge1xuICAgIGpzb246ICduYW1lJyxcbiAgICBqczogJ25hbWUnLFxuICAgIHR5cDogLyojX19QVVJFX18qL3UodW5kZWZpbmVkLCAnJylcbiAgfSwge1xuICAgIGpzb246ICd0eXBlJyxcbiAgICBqczogJ3R5cGUnLFxuICAgIHR5cDogJydcbiAgfV0sICdhbnknKSxcbiAgQ3VycmVuY3lJRDogLyojX19QVVJFX18qL28oW3tcbiAgICBqc29uOiAnQ1VSUkVOQ1lfSVNPQ09ERScsXG4gICAganM6ICdDVVJSRU5DWV9JU09DT0RFJyxcbiAgICB0eXA6IC8qI19fUFVSRV9fKi91KHVuZGVmaW5lZCwgJycpXG4gIH1dLCAnYW55JyksXG4gIEVtYWlsOiAvKiNfX1BVUkVfXyovbyhbe1xuICAgIGpzb246ICdyZWNpcGllbnRzJyxcbiAgICBqczogJ3JlY2lwaWVudHMnLFxuICAgIHR5cDogLyojX19QVVJFX18qL3IoJ1JlY2lwaWVudHNPYmplY3QnKVxuICB9LCB7XG4gICAganNvbjogJ3N1YmplY3QnLFxuICAgIGpzOiAnc3ViamVjdCcsXG4gICAgdHlwOiAvKiNfX1BVUkVfXyovdSh1bmRlZmluZWQsICcnKVxuICB9LCB7XG4gICAganNvbjogJ3RleHRCb2R5JyxcbiAgICBqczogJ3RleHRCb2R5JyxcbiAgICB0eXA6IC8qI19fUFVSRV9fKi91KHVuZGVmaW5lZCwgJycpXG4gIH0sIHtcbiAgICBqc29uOiAndHlwZScsXG4gICAganM6ICd0eXBlJyxcbiAgICB0eXA6ICcnXG4gIH0sIHtcbiAgICBqc29uOiAnaWQnLFxuICAgIGpzOiAnaWQnLFxuICAgIHR5cDogLyojX19QVVJFX18qL3UodW5kZWZpbmVkLCAvKiNfX1BVUkVfXyovbSgnYW55JykpXG4gIH0sIHtcbiAgICBqc29uOiAnbmFtZScsXG4gICAganM6ICduYW1lJyxcbiAgICB0eXA6IC8qI19fUFVSRV9fKi91KHVuZGVmaW5lZCwgJycpXG4gIH1dLCAnYW55JyksXG4gIFJlY2lwaWVudHNPYmplY3Q6IC8qI19fUFVSRV9fKi9vKFt7XG4gICAganNvbjogJ2lkJyxcbiAgICBqczogJ2lkJyxcbiAgICB0eXA6IC8qI19fUFVSRV9fKi91KHVuZGVmaW5lZCwgLyojX19QVVJFX18qL3IoJ1JlY2lwaWVudHNJRCcpKVxuICB9LCB7XG4gICAganNvbjogJ3R5cGUnLFxuICAgIGpzOiAndHlwZScsXG4gICAgdHlwOiAnJ1xuICB9LCB7XG4gICAganNvbjogJ25hbWUnLFxuICAgIGpzOiAnbmFtZScsXG4gICAgdHlwOiAvKiNfX1BVUkVfXyovdSh1bmRlZmluZWQsICcnKVxuICB9LCB7XG4gICAganNvbjogJ2NvbnRhY3RzJyxcbiAgICBqczogJ2NvbnRhY3RzJyxcbiAgICB0eXA6IC8qI19fUFVSRV9fKi91KHVuZGVmaW5lZCwgLyojX19QVVJFX18qL2EoIC8qI19fUFVSRV9fKi9yKCdDb250YWN0RWxlbWVudCcpKSlcbiAgfV0sICdhbnknKSxcbiAgUmVjaXBpZW50c0lEOiAvKiNfX1BVUkVfXyovbyhbe1xuICAgIGpzb246ICdlbWFpbCcsXG4gICAganM6ICdlbWFpbCcsXG4gICAgdHlwOiAvKiNfX1BVUkVfXyovdSh1bmRlZmluZWQsICcnKVxuICB9LCB7XG4gICAganNvbjogJ0ZEU19JRCcsXG4gICAganM6ICdGRFNfSUQnLFxuICAgIHR5cDogLyojX19QVVJFX18qL3UodW5kZWZpbmVkLCAnJylcbiAgfV0sICdhbnknKSxcbiAgSW5zdHJ1bWVudDogLyojX19QVVJFX18qL28oW3tcbiAgICBqc29uOiAnaWQnLFxuICAgIGpzOiAnaWQnLFxuICAgIHR5cDogLyojX19QVVJFX18qL3IoJ1N0aWNreUlEJylcbiAgfSwge1xuICAgIGpzb246ICdtYXJrZXQnLFxuICAgIGpzOiAnbWFya2V0JyxcbiAgICB0eXA6IC8qI19fUFVSRV9fKi91KHVuZGVmaW5lZCwgLyojX19QVVJFX18qL3IoJ0ZsdWZmeU1hcmtldCcpKVxuICB9LCB7XG4gICAganNvbjogJ3R5cGUnLFxuICAgIGpzOiAndHlwZScsXG4gICAgdHlwOiAnJ1xuICB9LCB7XG4gICAganNvbjogJ25hbWUnLFxuICAgIGpzOiAnbmFtZScsXG4gICAgdHlwOiAvKiNfX1BVUkVfXyovdSh1bmRlZmluZWQsICcnKVxuICB9XSwgJ2FueScpLFxuICBTdGlja3lJRDogLyojX19QVVJFX18qL28oW3tcbiAgICBqc29uOiAnQkJHJyxcbiAgICBqczogJ0JCRycsXG4gICAgdHlwOiAvKiNfX1BVUkVfXyovdSh1bmRlZmluZWQsICcnKVxuICB9LCB7XG4gICAganNvbjogJ0NVU0lQJyxcbiAgICBqczogJ0NVU0lQJyxcbiAgICB0eXA6IC8qI19fUFVSRV9fKi91KHVuZGVmaW5lZCwgJycpXG4gIH0sIHtcbiAgICBqc29uOiAnRkRTX0lEJyxcbiAgICBqczogJ0ZEU19JRCcsXG4gICAgdHlwOiAvKiNfX1BVUkVfXyovdSh1bmRlZmluZWQsICcnKVxuICB9LCB7XG4gICAganNvbjogJ0ZJR0knLFxuICAgIGpzOiAnRklHSScsXG4gICAgdHlwOiAvKiNfX1BVUkVfXyovdSh1bmRlZmluZWQsICcnKVxuICB9LCB7XG4gICAganNvbjogJ0lTSU4nLFxuICAgIGpzOiAnSVNJTicsXG4gICAgdHlwOiAvKiNfX1BVUkVfXyovdSh1bmRlZmluZWQsICcnKVxuICB9LCB7XG4gICAganNvbjogJ1BFUk1JRCcsXG4gICAganM6ICdQRVJNSUQnLFxuICAgIHR5cDogLyojX19QVVJFX18qL3UodW5kZWZpbmVkLCAnJylcbiAgfSwge1xuICAgIGpzb246ICdSSUMnLFxuICAgIGpzOiAnUklDJyxcbiAgICB0eXA6IC8qI19fUFVSRV9fKi91KHVuZGVmaW5lZCwgJycpXG4gIH0sIHtcbiAgICBqc29uOiAnU0VET0wnLFxuICAgIGpzOiAnU0VET0wnLFxuICAgIHR5cDogLyojX19QVVJFX18qL3UodW5kZWZpbmVkLCAnJylcbiAgfSwge1xuICAgIGpzb246ICd0aWNrZXInLFxuICAgIGpzOiAndGlja2VyJyxcbiAgICB0eXA6IC8qI19fUFVSRV9fKi91KHVuZGVmaW5lZCwgJycpXG4gIH1dLCAnYW55JyksXG4gIEZsdWZmeU1hcmtldDogLyojX19QVVJFX18qL28oW3tcbiAgICBqc29uOiAnQkJHJyxcbiAgICBqczogJ0JCRycsXG4gICAgdHlwOiAvKiNfX1BVUkVfXyovdSh1bmRlZmluZWQsICcnKVxuICB9LCB7XG4gICAganNvbjogJ0NPVU5UUllfSVNPQUxQSEEyJyxcbiAgICBqczogJ0NPVU5UUllfSVNPQUxQSEEyJyxcbiAgICB0eXA6IC8qI19fUFVSRV9fKi91KHVuZGVmaW5lZCwgJycpXG4gIH0sIHtcbiAgICBqc29uOiAnTUlDJyxcbiAgICBqczogJ01JQycsXG4gICAgdHlwOiAvKiNfX1BVUkVfXyovdSh1bmRlZmluZWQsICcnKVxuICB9LCB7XG4gICAganNvbjogJ25hbWUnLFxuICAgIGpzOiAnbmFtZScsXG4gICAgdHlwOiAvKiNfX1BVUkVfXyovdSh1bmRlZmluZWQsICcnKVxuICB9XSwgJ2FueScpLFxuICBJbnN0cnVtZW50TGlzdDogLyojX19QVVJFX18qL28oW3tcbiAgICBqc29uOiAnaW5zdHJ1bWVudHMnLFxuICAgIGpzOiAnaW5zdHJ1bWVudHMnLFxuICAgIHR5cDogLyojX19QVVJFX18qL2EoIC8qI19fUFVSRV9fKi9yKCdJbnN0cnVtZW50RWxlbWVudCcpKVxuICB9LCB7XG4gICAganNvbjogJ3R5cGUnLFxuICAgIGpzOiAndHlwZScsXG4gICAgdHlwOiAnJ1xuICB9LCB7XG4gICAganNvbjogJ2lkJyxcbiAgICBqczogJ2lkJyxcbiAgICB0eXA6IC8qI19fUFVSRV9fKi91KHVuZGVmaW5lZCwgLyojX19QVVJFX18qL20oJ2FueScpKVxuICB9LCB7XG4gICAganNvbjogJ25hbWUnLFxuICAgIGpzOiAnbmFtZScsXG4gICAgdHlwOiAvKiNfX1BVUkVfXyovdSh1bmRlZmluZWQsICcnKVxuICB9XSwgJ2FueScpLFxuICBOb3RoaW5nOiAvKiNfX1BVUkVfXyovbyhbe1xuICAgIGpzb246ICd0eXBlJyxcbiAgICBqczogJ3R5cGUnLFxuICAgIHR5cDogJydcbiAgfSwge1xuICAgIGpzb246ICdpZCcsXG4gICAganM6ICdpZCcsXG4gICAgdHlwOiAvKiNfX1BVUkVfXyovdSh1bmRlZmluZWQsIC8qI19fUFVSRV9fKi9tKCdhbnknKSlcbiAgfSwge1xuICAgIGpzb246ICduYW1lJyxcbiAgICBqczogJ25hbWUnLFxuICAgIHR5cDogLyojX19QVVJFX18qL3UodW5kZWZpbmVkLCAnJylcbiAgfV0sICdhbnknKSxcbiAgT3JnYW5pemF0aW9uOiAvKiNfX1BVUkVfXyovbyhbe1xuICAgIGpzb246ICdpZCcsXG4gICAganM6ICdpZCcsXG4gICAgdHlwOiAvKiNfX1BVUkVfXyovcignT3JnYW5pemF0aW9uSUQnKVxuICB9LCB7XG4gICAganNvbjogJ3R5cGUnLFxuICAgIGpzOiAndHlwZScsXG4gICAgdHlwOiAnJ1xuICB9LCB7XG4gICAganNvbjogJ25hbWUnLFxuICAgIGpzOiAnbmFtZScsXG4gICAgdHlwOiAvKiNfX1BVUkVfXyovdSh1bmRlZmluZWQsICcnKVxuICB9XSwgJ2FueScpLFxuICBPcmdhbml6YXRpb25JRDogLyojX19QVVJFX18qL28oW3tcbiAgICBqc29uOiAnRkRTX0lEJyxcbiAgICBqczogJ0ZEU19JRCcsXG4gICAgdHlwOiAvKiNfX1BVUkVfXyovdSh1bmRlZmluZWQsICcnKVxuICB9LCB7XG4gICAganNvbjogJ0xFSScsXG4gICAganM6ICdMRUknLFxuICAgIHR5cDogLyojX19QVVJFX18qL3UodW5kZWZpbmVkLCAnJylcbiAgfSwge1xuICAgIGpzb246ICdQRVJNSUQnLFxuICAgIGpzOiAnUEVSTUlEJyxcbiAgICB0eXA6IC8qI19fUFVSRV9fKi91KHVuZGVmaW5lZCwgJycpXG4gIH1dLCAnYW55JyksXG4gIFBvcnRmb2xpbzogLyojX19QVVJFX18qL28oW3tcbiAgICBqc29uOiAncG9zaXRpb25zJyxcbiAgICBqczogJ3Bvc2l0aW9ucycsXG4gICAgdHlwOiAvKiNfX1BVUkVfXyovYSggLyojX19QVVJFX18qL3IoJ1Bvc2l0aW9uRWxlbWVudCcpKVxuICB9LCB7XG4gICAganNvbjogJ3R5cGUnLFxuICAgIGpzOiAndHlwZScsXG4gICAgdHlwOiAnJ1xuICB9LCB7XG4gICAganNvbjogJ2lkJyxcbiAgICBqczogJ2lkJyxcbiAgICB0eXA6IC8qI19fUFVSRV9fKi91KHVuZGVmaW5lZCwgLyojX19QVVJFX18qL20oJ2FueScpKVxuICB9LCB7XG4gICAganNvbjogJ25hbWUnLFxuICAgIGpzOiAnbmFtZScsXG4gICAgdHlwOiAvKiNfX1BVUkVfXyovdSh1bmRlZmluZWQsICcnKVxuICB9XSwgJ2FueScpLFxuICBQb3NpdGlvbkVsZW1lbnQ6IC8qI19fUFVSRV9fKi9vKFt7XG4gICAganNvbjogJ2hvbGRpbmcnLFxuICAgIGpzOiAnaG9sZGluZycsXG4gICAgdHlwOiAzLjE0XG4gIH0sIHtcbiAgICBqc29uOiAnaW5zdHJ1bWVudCcsXG4gICAganM6ICdpbnN0cnVtZW50JyxcbiAgICB0eXA6IC8qI19fUFVSRV9fKi9yKCdJbnN0cnVtZW50RWxlbWVudCcpXG4gIH0sIHtcbiAgICBqc29uOiAndHlwZScsXG4gICAganM6ICd0eXBlJyxcbiAgICB0eXA6ICcnXG4gIH0sIHtcbiAgICBqc29uOiAnaWQnLFxuICAgIGpzOiAnaWQnLFxuICAgIHR5cDogLyojX19QVVJFX18qL3UodW5kZWZpbmVkLCAvKiNfX1BVUkVfXyovbSgnYW55JykpXG4gIH0sIHtcbiAgICBqc29uOiAnbmFtZScsXG4gICAganM6ICduYW1lJyxcbiAgICB0eXA6IC8qI19fUFVSRV9fKi91KHVuZGVmaW5lZCwgJycpXG4gIH1dLCAnYW55JyksXG4gIFBvc2l0aW9uOiAvKiNfX1BVUkVfXyovbyhbe1xuICAgIGpzb246ICdob2xkaW5nJyxcbiAgICBqczogJ2hvbGRpbmcnLFxuICAgIHR5cDogMy4xNFxuICB9LCB7XG4gICAganNvbjogJ2luc3RydW1lbnQnLFxuICAgIGpzOiAnaW5zdHJ1bWVudCcsXG4gICAgdHlwOiAvKiNfX1BVUkVfXyovcignSW5zdHJ1bWVudEVsZW1lbnQnKVxuICB9LCB7XG4gICAganNvbjogJ3R5cGUnLFxuICAgIGpzOiAndHlwZScsXG4gICAgdHlwOiAnJ1xuICB9LCB7XG4gICAganNvbjogJ2lkJyxcbiAgICBqczogJ2lkJyxcbiAgICB0eXA6IC8qI19fUFVSRV9fKi91KHVuZGVmaW5lZCwgLyojX19QVVJFX18qL20oJ2FueScpKVxuICB9LCB7XG4gICAganNvbjogJ25hbWUnLFxuICAgIGpzOiAnbmFtZScsXG4gICAgdHlwOiAvKiNfX1BVUkVfXyovdSh1bmRlZmluZWQsICcnKVxuICB9XSwgJ2FueScpLFxuICBUaW1lUmFuZ2U6IC8qI19fUFVSRV9fKi9vKFt7XG4gICAganNvbjogJ2VuZFRpbWUnLFxuICAgIGpzOiAnZW5kVGltZScsXG4gICAgdHlwOiAvKiNfX1BVUkVfXyovdSh1bmRlZmluZWQsIERhdGUpXG4gIH0sIHtcbiAgICBqc29uOiAnc3RhcnRUaW1lJyxcbiAgICBqczogJ3N0YXJ0VGltZScsXG4gICAgdHlwOiAvKiNfX1BVUkVfXyovdSh1bmRlZmluZWQsIERhdGUpXG4gIH0sIHtcbiAgICBqc29uOiAndHlwZScsXG4gICAganM6ICd0eXBlJyxcbiAgICB0eXA6ICcnXG4gIH0sIHtcbiAgICBqc29uOiAnaWQnLFxuICAgIGpzOiAnaWQnLFxuICAgIHR5cDogLyojX19QVVJFX18qL3UodW5kZWZpbmVkLCAvKiNfX1BVUkVfXyovbSgnYW55JykpXG4gIH0sIHtcbiAgICBqc29uOiAnbmFtZScsXG4gICAganM6ICduYW1lJyxcbiAgICB0eXA6IC8qI19fUFVSRV9fKi91KHVuZGVmaW5lZCwgJycpXG4gIH1dLCAnYW55JyksXG4gIFZhbHVhdGlvbjogLyojX19QVVJFX18qL28oW3tcbiAgICBqc29uOiAnQ1VSUkVOQ1lfSVNPQ09ERScsXG4gICAganM6ICdDVVJSRU5DWV9JU09DT0RFJyxcbiAgICB0eXA6ICcnXG4gIH0sIHtcbiAgICBqc29uOiAnZXhwaXJ5VGltZScsXG4gICAganM6ICdleHBpcnlUaW1lJyxcbiAgICB0eXA6IC8qI19fUFVSRV9fKi91KHVuZGVmaW5lZCwgRGF0ZSlcbiAgfSwge1xuICAgIGpzb246ICdwcmljZScsXG4gICAganM6ICdwcmljZScsXG4gICAgdHlwOiAvKiNfX1BVUkVfXyovdSh1bmRlZmluZWQsIDMuMTQpXG4gIH0sIHtcbiAgICBqc29uOiAndHlwZScsXG4gICAganM6ICd0eXBlJyxcbiAgICB0eXA6ICcnXG4gIH0sIHtcbiAgICBqc29uOiAndmFsdWF0aW9uVGltZScsXG4gICAganM6ICd2YWx1YXRpb25UaW1lJyxcbiAgICB0eXA6IC8qI19fUFVSRV9fKi91KHVuZGVmaW5lZCwgRGF0ZSlcbiAgfSwge1xuICAgIGpzb246ICd2YWx1ZScsXG4gICAganM6ICd2YWx1ZScsXG4gICAgdHlwOiAzLjE0XG4gIH0sIHtcbiAgICBqc29uOiAnaWQnLFxuICAgIGpzOiAnaWQnLFxuICAgIHR5cDogLyojX19QVVJFX18qL3UodW5kZWZpbmVkLCAvKiNfX1BVUkVfXyovbSgnYW55JykpXG4gIH0sIHtcbiAgICBqc29uOiAnbmFtZScsXG4gICAganM6ICduYW1lJyxcbiAgICB0eXA6IC8qI19fUFVSRV9fKi91KHVuZGVmaW5lZCwgJycpXG4gIH1dLCAnYW55JyksXG4gIFN0eWxlOiBbJ2JhcicsICdjYW5kbGUnLCAnY3VzdG9tJywgJ2hlYXRtYXAnLCAnaGlzdG9ncmFtJywgJ2xpbmUnLCAnbW91bnRhaW4nLCAncGllJywgJ3NjYXR0ZXInLCAnc3RhY2tlZC1iYXInXVxufTtcblxudmFyIEludGVudHM7XG4oZnVuY3Rpb24gKEludGVudHMpIHtcbiAgSW50ZW50c1tcIlN0YXJ0Q2FsbFwiXSA9IFwiU3RhcnRDYWxsXCI7XG4gIEludGVudHNbXCJTdGFydENoYXRcIl0gPSBcIlN0YXJ0Q2hhdFwiO1xuICBJbnRlbnRzW1wiU3RhcnRFbWFpbFwiXSA9IFwiU3RhcnRFbWFpbFwiO1xuICBJbnRlbnRzW1wiVmlld0FuYWx5c2lzXCJdID0gXCJWaWV3QW5hbHlzaXNcIjtcbiAgSW50ZW50c1tcIlZpZXdDaGFydFwiXSA9IFwiVmlld0NoYXJ0XCI7XG4gIEludGVudHNbXCJWaWV3Q29udGFjdFwiXSA9IFwiVmlld0NvbnRhY3RcIjtcbiAgSW50ZW50c1tcIlZpZXdIb2xkaW5nc1wiXSA9IFwiVmlld0hvbGRpbmdzXCI7XG4gIEludGVudHNbXCJWaWV3SW5zdHJ1bWVudFwiXSA9IFwiVmlld0luc3RydW1lbnRcIjtcbiAgSW50ZW50c1tcIlZpZXdJbnRlcmFjdGlvbnNcIl0gPSBcIlZpZXdJbnRlcmFjdGlvbnNcIjtcbiAgSW50ZW50c1tcIlZpZXdOZXdzXCJdID0gXCJWaWV3TmV3c1wiO1xuICBJbnRlbnRzW1wiVmlld09yZGVyc1wiXSA9IFwiVmlld09yZGVyc1wiO1xuICBJbnRlbnRzW1wiVmlld1Byb2ZpbGVcIl0gPSBcIlZpZXdQcm9maWxlXCI7XG4gIEludGVudHNbXCJWaWV3UXVvdGVcIl0gPSBcIlZpZXdRdW90ZVwiO1xuICBJbnRlbnRzW1wiVmlld1Jlc2VhcmNoXCJdID0gXCJWaWV3UmVzZWFyY2hcIjtcbn0pKEludGVudHMgfHwgKEludGVudHMgPSB7fSkpO1xuXG5leHBvcnQgeyBDaGFubmVsRXJyb3IsIENvbnRleHRUeXBlcywgQ29udmVydCwgSW50ZW50cywgT3BlbkVycm9yLCBSZXNvbHZlRXJyb3IsIFJlc3VsdEVycm9yLCBTdHlsZSwgYWRkQ29udGV4dExpc3RlbmVyLCBhZGRJbnRlbnRMaXN0ZW5lciwgYnJvYWRjYXN0LCBjb21wYXJlVmVyc2lvbk51bWJlcnMsIGNyZWF0ZVByaXZhdGVDaGFubmVsLCBmZGMzUmVhZHksIGZpbmRJbnN0YW5jZXMsIGZpbmRJbnRlbnQsIGZpbmRJbnRlbnRzQnlDb250ZXh0LCBnZXRBcHBNZXRhZGF0YSwgZ2V0Q3VycmVudENoYW5uZWwsIGdldEluZm8sIGdldE9yQ3JlYXRlQ2hhbm5lbCwgZ2V0U3lzdGVtQ2hhbm5lbHMsIGdldFVzZXJDaGFubmVscywgam9pbkNoYW5uZWwsIGpvaW5Vc2VyQ2hhbm5lbCwgbGVhdmVDdXJyZW50Q2hhbm5lbCwgb3BlbiwgcmFpc2VJbnRlbnQsIHJhaXNlSW50ZW50Rm9yQ29udGV4dCwgdmVyc2lvbklzQXRMZWFzdCB9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZmRjMy5lc20uanMubWFwXG4iLCJ2YXIgZT17ZDoodCxuKT0+e2Zvcih2YXIgciBpbiBuKWUubyhuLHIpJiYhZS5vKHQscikmJk9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0LHIse2VudW1lcmFibGU6ITAsZ2V0Om5bcl19KX0sbzooZSx0KT0+T2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGUsdCl9LHQ9e307ZS5kKHQse0FkYXB0ZXJFcnJvcjooKT0+QWRhcHRlckVycm9yLEFwaUVycm9yOigpPT5BcGlFcnJvcixJbml0aWFsaXphdGlvbkVycm9yOigpPT5Jbml0aWFsaXphdGlvbkVycm9yLEludGVyb3BFcnJvcjooKT0+SW50ZXJvcEVycm9yLFRlcm1pbmFsQ29ubmVjdFJlcXVlc3RFcnJvcjooKT0+VGVybWluYWxDb25uZWN0UmVxdWVzdEVycm9yLFRlcm1pbmFsQ29ubmVjdGlvbkVycm9yOigpPT5UZXJtaW5hbENvbm5lY3Rpb25FcnJvcixjb25uZWN0OigpPT50ZSxkaXNhYmxlTG9nZ2luZzooKT0+SSxlbmFibGVMb2dnaW5nOigpPT5BLGdldFNlY3VyaXR5RnJvbUluc3RydW1lbnRDb250ZXh0OigpPT5ifSk7Y2xhc3MgQXBpRXJyb3IgZXh0ZW5kcyBFcnJvcntjb25zdHJ1Y3RvcihlPVwiQW4gdW5leHBlY3RlZCBlcnJvciBoYXMgb2NjdXJyZWRcIix0KXtzdXBlcihlKSx0aGlzLm5hbWU9dGhpcy5jb25zdHJ1Y3Rvci5uYW1lLHRoaXMuc3RhY2s9dGhpcy5zdGFjaz8ucmVwbGFjZSgvXihcXHcqRXJyb3IpLyxgJHt0aGlzLmNvbnN0cnVjdG9yLm5hbWV9YCksdCYmKHRoaXMuZGF0YT10KX19Y2xhc3MgQWRhcHRlckVycm9yIGV4dGVuZHMgQXBpRXJyb3J7Y29uc3RydWN0b3IoZT1cIkZhaWxlZCB0byBleGVjdXRlIGFkYXB0ZXIgZnVuY3Rpb25cIix0KXtzdXBlcihlLHQpfX1jbGFzcyBJbml0aWFsaXphdGlvbkVycm9yIGV4dGVuZHMgQXBpRXJyb3J7Y29uc3RydWN0b3IoZT1cIkZhaWxlZCB0byBpbml0aWFsaXplIGFkYXB0ZXJcIix0KXtzdXBlcihlLHQpfX1jbGFzcyBJbnRlcm9wRXJyb3IgZXh0ZW5kcyBBcGlFcnJvcntjb25zdHJ1Y3RvcihlPVwiRmFpbGVkIHRvIGV4ZWN1dGUgdGhlIGludGVyb3AgZnVuY3Rpb25cIix0KXtzdXBlcihlLHQpfX1jbGFzcyBQYXJhbWV0ZXJFcnJvciBleHRlbmRzIEFwaUVycm9ye2NvbnN0cnVjdG9yKGUpe3N1cGVyKGU9ZT8/XCJJbnZhbGlkIHBhcmFtZXRlciBkZXRlY3RlZFwiKX19Y2xhc3MgVGVybWluYWxDb25uZWN0aW9uRXJyb3IgZXh0ZW5kcyBBcGlFcnJvcntjb25zdHJ1Y3RvcihlPVwiRmFpbGVkIHRvIGNvbm5lY3QgdG8gdGhlIHRlcm1pbmFsXCIsdCl7c3VwZXIoZSx0KX19Y2xhc3MgVGVybWluYWxDb25uZWN0UmVxdWVzdEVycm9yIGV4dGVuZHMgQXBpRXJyb3J7Y29uc3RydWN0b3IoZT1cIlRlcm1pbmFsIENvbm5lY3QgcmVxdWVzdCBmYWlsZWRcIix0KXtzdXBlcihlLHQpfX1mdW5jdGlvbiBuKGUpe3JldHVybnthcnJheUl0ZW1zOmV9fWZ1bmN0aW9uIHIoKXtmb3IodmFyIGU9YXJndW1lbnRzLmxlbmd0aCx0PW5ldyBBcnJheShlKSxuPTA7bjxlO24rKyl0W25dPWFyZ3VtZW50c1tuXTtyZXR1cm57dW5pb25NZW1iZXJzOnR9fWZ1bmN0aW9uIG8oZSx0KXtyZXR1cm57cHJvcHM6ZSxhZGRpdGlvbmFsOnR9fWZ1bmN0aW9uIGEoZSl7cmV0dXJue3Byb3BzOltdLGFkZGl0aW9uYWw6ZX19ZnVuY3Rpb24gaShlKXtyZXR1cm57cmVmOmV9fXZhciBzLGMsdSxsLHA7RGF0ZSxEYXRlLERhdGUsRGF0ZSxEYXRlLERhdGUsRGF0ZSxEYXRlLERhdGUsRGF0ZSxEYXRlLERhdGUsRGF0ZSxEYXRlLERhdGUsRGF0ZSxEYXRlLERhdGUsRGF0ZSxEYXRlLERhdGUsRGF0ZSxEYXRlLERhdGUsRGF0ZSxEYXRlLERhdGUsRGF0ZSxEYXRlLERhdGUsRGF0ZSxEYXRlLERhdGUsRGF0ZSxEYXRlLERhdGUsRGF0ZSxEYXRlLERhdGUsRGF0ZSxEYXRlLERhdGUsRGF0ZSxEYXRlLERhdGUsRGF0ZSxEYXRlLERhdGUsRGF0ZSxEYXRlLERhdGUsRGF0ZSxEYXRlLERhdGUsRGF0ZSxEYXRlLERhdGUsRGF0ZSxEYXRlLERhdGUsRGF0ZSxEYXRlLERhdGUsRGF0ZTshZnVuY3Rpb24oZSl7ZS5BcHBOb3RGb3VuZD1cIkFwcE5vdEZvdW5kXCIsZS5FcnJvck9uTGF1bmNoPVwiRXJyb3JPbkxhdW5jaFwiLGUuQXBwVGltZW91dD1cIkFwcFRpbWVvdXRcIixlLlJlc29sdmVyVW5hdmFpbGFibGU9XCJSZXNvbHZlclVuYXZhaWxhYmxlXCIsZS5NYWxmb3JtZWRDb250ZXh0PVwiTWFsZm9ybWVkQ29udGV4dFwiLGUuRGVza3RvcEFnZW50Tm90Rm91bmQ9XCJEZXNrdG9wQWdlbnROb3RGb3VuZFwifShzfHwocz17fSkpLGZ1bmN0aW9uKGUpe2UuTm9BcHBzRm91bmQ9XCJOb0FwcHNGb3VuZFwiLGUuUmVzb2x2ZXJVbmF2YWlsYWJsZT1cIlJlc29sdmVyVW5hdmFpbGFibGVcIixlLlVzZXJDYW5jZWxsZWQ9XCJVc2VyQ2FuY2VsbGVkUmVzb2x1dGlvblwiLGUuUmVzb2x2ZXJUaW1lb3V0PVwiUmVzb2x2ZXJUaW1lb3V0XCIsZS5UYXJnZXRBcHBVbmF2YWlsYWJsZT1cIlRhcmdldEFwcFVuYXZhaWxhYmxlXCIsZS5UYXJnZXRJbnN0YW5jZVVuYXZhaWxhYmxlPVwiVGFyZ2V0SW5zdGFuY2VVbmF2YWlsYWJsZVwiLGUuSW50ZW50RGVsaXZlcnlGYWlsZWQ9XCJJbnRlbnREZWxpdmVyeUZhaWxlZFwiLGUuTWFsZm9ybWVkQ29udGV4dD1cIk1hbGZvcm1lZENvbnRleHRcIixlLkRlc2t0b3BBZ2VudE5vdEZvdW5kPVwiRGVza3RvcEFnZW50Tm90Rm91bmRcIn0oY3x8KGM9e30pKSxmdW5jdGlvbihlKXtlLk5vUmVzdWx0UmV0dXJuZWQ9XCJOb1Jlc3VsdFJldHVybmVkXCIsZS5JbnRlbnRIYW5kbGVyUmVqZWN0ZWQ9XCJJbnRlbnRIYW5kbGVyUmVqZWN0ZWRcIn0odXx8KHU9e30pKSxmdW5jdGlvbihlKXtlLk5vQ2hhbm5lbEZvdW5kPVwiTm9DaGFubmVsRm91bmRcIixlLkFjY2Vzc0RlbmllZD1cIkFjY2Vzc0RlbmllZFwiLGUuQ3JlYXRpb25GYWlsZWQ9XCJDcmVhdGlvbkZhaWxlZFwiLGUuTWFsZm9ybWVkQ29udGV4dD1cIk1hbGZvcm1lZENvbnRleHRcIn0obHx8KGw9e30pKSxmdW5jdGlvbihlKXtlLlJlc3BvbnNlVGltZWRPdXQ9XCJSZXNwb25zZVRvQnJpZGdlVGltZWRPdXRcIixlLkFnZW50RGlzY29ubmVjdGVkPVwiQWdlbnREaXNjb25uZWN0ZWRcIixlLk5vdENvbm5lY3RlZFRvQnJpZGdlPVwiTm90Q29ubmVjdGVkVG9CcmlkZ2VcIixlLk1hbGZvcm1lZE1lc3NhZ2U9XCJNYWxmb3JtZWRNZXNzYWdlXCJ9KHB8fChwPXt9KSk7dmFyIGQ7IWZ1bmN0aW9uKGUpe2UuQ2hhcnQ9XCJmZGMzLmNoYXJ0XCIsZS5DaGF0SW5pdFNldHRpbmdzPVwiZmRjMy5jaGF0LmluaXRTZXR0aW5nc1wiLGUuQ2hhdFJvb209XCJmZGMzLmNoYXQucm9vbVwiLGUuQ29udGFjdD1cImZkYzMuY29udGFjdFwiLGUuQ29udGFjdExpc3Q9XCJmZGMzLmNvbnRhY3RMaXN0XCIsZS5Db3VudHJ5PVwiZmRjMy5jb3VudHJ5XCIsZS5DdXJyZW5jeT1cImZkYzMuY3VycmVuY3lcIixlLkVtYWlsPVwiZmRjMy5lbWFpbFwiLGUuSW5zdHJ1bWVudD1cImZkYzMuaW5zdHJ1bWVudFwiLGUuSW5zdHJ1bWVudExpc3Q9XCJmZGMzLmluc3RydW1lbnRMaXN0XCIsZS5JbnRlcmFjdGlvbj1cImZkYzMuaW50ZXJhY3Rpb25cIixlLk5vdGhpbmc9XCJmZGMzLm5vdGhpbmdcIixlLk9yZ2FuaXphdGlvbj1cImZkYzMub3JnYW5pemF0aW9uXCIsZS5Qb3J0Zm9saW89XCJmZGMzLnBvcnRmb2xpb1wiLGUuUG9zaXRpb249XCJmZGMzLnBvc2l0aW9uXCIsZS5DaGF0U2VhcmNoQ3JpdGVyaWE9XCJmZGMzLmNoYXQuc2VhcmNoQ3JpdGVyaWFcIixlLlRpbWVSYW5nZT1cImZkYzMudGltZXJhbmdlXCIsZS5UcmFuc2FjdGlvblJlc3VsdD1cImZkYzMudHJhbnNhY3Rpb25SZXN1bHRcIixlLlZhbHVhdGlvbj1cImZkYzMudmFsdWF0aW9uXCJ9KGR8fChkPXt9KSk7ZnVuY3Rpb24gZyhlKXtyZXR1cm57YXJyYXlJdGVtczplfX1mdW5jdGlvbiBtKCl7Zm9yKHZhciBlPWFyZ3VtZW50cy5sZW5ndGgsdD1uZXcgQXJyYXkoZSksbj0wO248ZTtuKyspdFtuXT1hcmd1bWVudHNbbl07cmV0dXJue3VuaW9uTWVtYmVyczp0fX1mdW5jdGlvbiBmKGUsdCl7cmV0dXJue3Byb3BzOmUsYWRkaXRpb25hbDp0fX1mdW5jdGlvbiB3KGUpe3JldHVybntwcm9wczpbXSxhZGRpdGlvbmFsOmV9fWZ1bmN0aW9uIGgoZSl7cmV0dXJue3JlZjplfX12YXIgeTtEYXRlLERhdGUsRGF0ZSxEYXRlLERhdGUsRGF0ZTshZnVuY3Rpb24oZSl7ZS5DcmVhdGVJbnRlcmFjdGlvbj1cIkNyZWF0ZUludGVyYWN0aW9uXCIsZS5TZW5kQ2hhdE1lc3NhZ2U9XCJTZW5kQ2hhdE1lc3NhZ2VcIixlLlN0YXJ0Q2FsbD1cIlN0YXJ0Q2FsbFwiLGUuU3RhcnRDaGF0PVwiU3RhcnRDaGF0XCIsZS5TdGFydEVtYWlsPVwiU3RhcnRFbWFpbFwiLGUuVmlld0FuYWx5c2lzPVwiVmlld0FuYWx5c2lzXCIsZS5WaWV3Q2hhdD1cIlZpZXdDaGF0XCIsZS5WaWV3Q2hhcnQ9XCJWaWV3Q2hhcnRcIixlLlZpZXdDb250YWN0PVwiVmlld0NvbnRhY3RcIixlLlZpZXdIb2xkaW5ncz1cIlZpZXdIb2xkaW5nc1wiLGUuVmlld0luc3RydW1lbnQ9XCJWaWV3SW5zdHJ1bWVudFwiLGUuVmlld0ludGVyYWN0aW9ucz1cIlZpZXdJbnRlcmFjdGlvbnNcIixlLlZpZXdNZXNzYWdlcz1cIlZpZXdNZXNzYWdlc1wiLGUuVmlld05ld3M9XCJWaWV3TmV3c1wiLGUuVmlld09yZGVycz1cIlZpZXdPcmRlcnNcIixlLlZpZXdQcm9maWxlPVwiVmlld1Byb2ZpbGVcIixlLlZpZXdRdW90ZT1cIlZpZXdRdW90ZVwiLGUuVmlld1Jlc2VhcmNoPVwiVmlld1Jlc2VhcmNoXCJ9KHl8fCh5PXt9KSk7Y29uc3QgQz1lPT57Y29uc3QgdD1EYXRlLnBhcnNlKGUpO2lmKCFOdW1iZXIuaXNOYU4odCkpcmV0dXJuIG5ldyBEYXRlKHQpfSxFPWU9PntsZXQgdD0vXFxzKyhbXFx3LV0rJCkvLmV4ZWMoZSk/LlsxXTtpZih0KXJldHVybiB0PXQuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkrdC5zbGljZSgxKS50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoXCItbVwiLFwiLU1cIiksdH0sYj1lPT57aWYoZS50eXBlIT09ZC5JbnN0cnVtZW50KXJldHVybjtjb25zdHtpZDp0LG1hcmtldDpufT1lLHtCQkc6cixGSUdJOm8sdGlja2VyOmF9PXQ7aWYocnx8bylyZXR1cm4gcj8/bztpZighYSlyZXR1cm47cmV0dXJuYCR7YX0gJHtuPy5CQkc/bi5CQkc6XCJVU1wifSBFcXVpdHlgfTtsZXQgdj0hMTtjb25zdCBEPVwiW0BvcGVuZmluL2Jsb29tYmVyZ11cIixJPSgpPT57dj0hMX0sQT0oKT0+e3Y9ITAsTihcInYyLjEuMFwiKX0sUj0oZSx0KT0+e2lmKCF2KXJldHVybjtjb25zdCBuPXQ/YCR7RH0gJHt0fWA6RDtlIGluc3RhbmNlb2YgQXBpRXJyb3ImJmUuZGF0YT9jb25zb2xlLmVycm9yKG4sZSxlLmRhdGEpOmNvbnNvbGUuZXJyb3IobixlKX0sTj0oLi4uZSk9Pnt2JiZjb25zb2xlLmxvZyhELC4uLmUpfSx4PSguLi5lKT0+e3YmJmNvbnNvbGUud2FybihELC4uLmUpfTt2YXIgVCxTLE07XCJ1bmRlZmluZWRcIj09dHlwZW9mIGZpbiYmT2JqZWN0LmFzc2lnbih3aW5kb3cse2Zpbjp7fX0pLE9iamVjdC5hc3NpZ24oZmluLHtJbnRlZ3JhdGlvbnM6e0Jsb29tYmVyZzp7ZW5hYmxlTG9nZ2luZzpBLGRpc2FibGVMb2dnaW5nOkl9fX0pLGZ1bmN0aW9uKGUpe2UuQ2FuY2VsU3Vic2NyaXB0aW9uPVwiQ2FuY2VsU3Vic2NyaXB0aW9uXCIsZS5Db25uZWN0PVwiQ29ubmVjdFwiLGUuQ3JlYXRlU3Vic2NyaXB0aW9uPVwiQ3JlYXRlU3Vic2NyaXB0aW9uXCIsZS5EaXNjb25uZWN0PVwiRGlzY29ubmVjdFwiLGUuRXhlY3V0ZVJlcXVlc3Q9XCJFeGVjdXRlUmVxdWVzdFwiLGUuTG9nTWVzc2FnZT1cIkxvZ01lc3NhZ2VcIixlLlN1YnNjcmlwdGlvbkV2ZW50PVwiU3Vic2NyaXB0aW9uRXZlbnRcIn0oVHx8KFQ9e30pKSxmdW5jdGlvbihlKXtlW2UuRXJyb3I9MF09XCJFcnJvclwiLGVbZS5JbmZvPTFdPVwiSW5mb1wiLGVbZS5XYXJuPTJdPVwiV2FyblwifShTfHwoUz17fSkpLGZ1bmN0aW9uKGUpe2UuTG9jYWw9XCJMb2NhbFwiLGUuUmVtb3RlPVwiUmVtb3RlXCJ9KE18fChNPXt9KSk7Y29uc3QgVj1lPT5hc3luYygpPT57TihcIlJldHJpZXZpbmcgbGF1bmNocGFkIGdyb3Vwc1wiKTtjb25zdCB0PXtxdWVyeTpcInF1ZXJ5IHtcXG4gICAgICAgICAgZ3JvdXBzIHtcXG4gICAgICAgICAgICAuLi4gb24gR3JvdXBzIHtcXG4gICAgICAgICAgICAgIGl0ZW1zIHtcXG4gICAgICAgICAgICAgICAgaWRcXG4gICAgICAgICAgICAgICAgbmFtZVxcbiAgICAgICAgICAgICAgICB0eXBlXFxuICAgICAgICAgICAgICAgIHZhbHVlXFxuICAgICAgICAgICAgICB9XFxuICAgICAgICAgICAgfVxcbiAgICAgICAgICAgIC4uLiBvbiBFcnJvciB7XFxuICAgICAgICAgICAgICBlcnJvckNhdGVnb3J5XFxuICAgICAgICAgICAgICBlcnJvck1lc3NhZ2VcXG4gICAgICAgICAgICB9XFxuICAgICAgICAgIH1cXG4gICAgICAgIH1cIn07bGV0IG47dHJ5e249YXdhaXQgZShULkV4ZWN1dGVSZXF1ZXN0LHQpfWNhdGNoKGUpe2NvbnN0IHQ9bmV3IEFkYXB0ZXJFcnJvcih2b2lkIDAsZSk7dGhyb3cgUih0KSx0fWlmKCFuLnN1Y2Nlc3Mpe2NvbnN0IGU9bmV3IFRlcm1pbmFsQ29ubmVjdFJlcXVlc3RFcnJvcihuLmVycm9yPy5tZXNzYWdlLG4uZXJyb3IpO3Rocm93IFIoZSksZX1pZighbi5kYXRhKXtjb25zdCBlPW5ldyBUZXJtaW5hbENvbm5lY3RSZXF1ZXN0RXJyb3IoXCJVbmV4cGVjdGVkIGVtcHR5IHJlc3BvbnNlIGRhdGFcIixuKTt0aHJvdyBSKGUpLGV9Y29uc3R7Z3JvdXBzOnJ9PUpTT04ucGFyc2Uobi5kYXRhKTtpZihyLml0ZW1zKXJldHVybiByLml0ZW1zO2NvbnN0IG89bmV3IFRlcm1pbmFsQ29ubmVjdFJlcXVlc3RFcnJvcihyLmVycm9yTWVzc2FnZSxyKTt0aHJvdyBSKG8pLG99LCQ9ZT0+YXN5bmModCxuKT0+e2lmKG51bGw9PXR8fFwibnVtYmVyXCIhPXR5cGVvZiB0fHxOdW1iZXIuaXNOYU4odCkpdGhyb3cgbmV3IFBhcmFtZXRlckVycm9yKFwiR3JvdXAgSUQgbXVzdCBiZSBhIHZhbGlkIG51bWJlclwiKTtpZighbj8udHJpbSgpKXRocm93IG5ldyBQYXJhbWV0ZXJFcnJvcihcIkdyb3VwIHZhbHVlIG11c3QgYmUgYSBub24tZW1wdHkgc3RyaW5nXCIpO04oXCJTZXR0aW5nIGdyb3VwIHZhbHVlXCIse2dyb3VwSWQ6dCxuZXdWYWx1ZTpufSk7Y29uc3Qgcj17cXVlcnk6YG11dGF0aW9uIHtcXG4gICAgICAgICAgc2V0R3JvdXBWYWx1ZShcXG4gICAgICAgICAgICBmaWx0ZXI6IHtpZDogWyR7dH1dfSxcXG4gICAgICAgICAgICB2YWx1ZTogXCIke259XCIpIHtcXG4gICAgICAgICAgICAuLi4gb24gR3JvdXBSZXN1bHRzIHtcXG4gICAgICAgICAgICAgIHJlc3VsdHMge1xcbiAgICAgICAgICAgICAgICByZXN1bHQge1xcbiAgICAgICAgICAgICAgICAgIHN1Y2NlZWRlZFxcbiAgICAgICAgICAgICAgICAgIGRldGFpbHNcXG4gICAgICAgICAgICAgICAgfVxcbiAgICAgICAgICAgICAgfVxcbiAgICAgICAgICAgIH1cXG4gICAgICAgICAgICAuLi4gb24gRXJyb3Ige1xcbiAgICAgICAgICAgICAgZXJyb3JDYXRlZ29yeVxcbiAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlXFxuICAgICAgICAgICAgfVxcbiAgICAgICAgICB9XFxuICAgICAgICB9YH07bGV0IG87dHJ5e289YXdhaXQgZShULkV4ZWN1dGVSZXF1ZXN0LHIpfWNhdGNoKGUpe2NvbnN0IHQ9bmV3IEFkYXB0ZXJFcnJvcih2b2lkIDAsZSk7dGhyb3cgUih0KSx0fWlmKCFvLnN1Y2Nlc3Mpe2NvbnN0IGU9bmV3IFRlcm1pbmFsQ29ubmVjdFJlcXVlc3RFcnJvcihvLmVycm9yPy5tZXNzYWdlLG8uZXJyb3IpO3Rocm93IFIoZSksZX1pZighby5kYXRhKXtjb25zdCBlPW5ldyBUZXJtaW5hbENvbm5lY3RSZXF1ZXN0RXJyb3IoXCJVbmV4cGVjdGVkIGVtcHR5IHJlc3BvbnNlIGRhdGFcIixvKTt0aHJvdyBSKGUpLGV9Y29uc3R7c2V0R3JvdXBWYWx1ZTphfT1KU09OLnBhcnNlKG8uZGF0YSk7aWYoXCJlcnJvck1lc3NhZ2VcImluIGEpe2NvbnN0IGU9bmV3IFRlcm1pbmFsQ29ubmVjdFJlcXVlc3RFcnJvcihhLmVycm9yTWVzc2FnZSxhKTt0aHJvdyBSKGUpLGV9fSxxPW5ldyBNYXAsQj1hc3luYyhlLHQsbixyKT0+e2NvbnN0IG89YXdhaXQgTyhlKSh0KTtpZighbylyZXR1cm47Y29uc3QgYT1hd2FpdChlPT5hc3luYyh0PVtdKT0+e04oXCJDcmVhdGluZyBncm91cCBzdWJzY3JpcHRpb25cIix7Z3JvdXBJZEZpbHRlcjp0fSk7Y29uc3Qgbj17cXVlcnk6YHN1YnNjcmlwdGlvbiB7XFxuICAgICAgICBzdWJzY3JpYmVHcm91cEV2ZW50cyAoXFxuICAgICAgICAgIGZpbHRlcjp7XFxuICAgICAgICAgICAgZXZlbnQ6IFtcXG4gICAgICAgICAgICAgIFZBTFVFX0NIQU5HRURcXG4gICAgICAgICAgICBdXFxuICAgICAgICAgICAgJHt0Lmxlbmd0aD9gLGdyb3VwOiB7aWQ6ICR7SlNPTi5zdHJpbmdpZnkodCl9fWA6XCJcIn1cXG4gICAgICAgICAgfSl7XFxuICAgICAgICAgIHR5cGVcXG4gICAgICAgICAgZ3JvdXB7XFxuICAgICAgICAgICAgaWRcXG4gICAgICAgICAgICBuYW1lXFxuICAgICAgICAgICAgdmFsdWVcXG4gICAgICAgICAgfVxcbiAgICAgICAgfVxcbiAgICAgIH1gfTtsZXQgcjt0cnl7cj1hd2FpdCBlKFQuQ3JlYXRlU3Vic2NyaXB0aW9uLG4pfWNhdGNoKGUpe2NvbnN0IHQ9bmV3IEFkYXB0ZXJFcnJvcih2b2lkIDAsZSk7dGhyb3cgUih0KSx0fWlmKCFyLnN1Y2Nlc3Mpe2NvbnN0IGU9bmV3IFRlcm1pbmFsQ29ubmVjdFJlcXVlc3RFcnJvcihyLmVycm9yPy5tZXNzYWdlLHIuZXJyb3IpO3Rocm93IFIoZSksZX1pZighci5kYXRhKXtjb25zdCBlPW5ldyBUZXJtaW5hbENvbm5lY3RSZXF1ZXN0RXJyb3IoXCJVbmV4cGVjdGVkIGVtcHR5IHJlc3BvbnNlIGRhdGFcIixyKTt0aHJvdyBSKGUpLGV9Y29uc3R7c3Vic2NyaXB0aW9uSWQ6b309SlNPTi5wYXJzZShyLmRhdGEpO3JldHVybiBvfSkoZSkobyksaT17aWQ6YSxsaXN0ZW5lcjpVKG4sciksdW5zdWJzY3JpYmU6RihlLGEpfTtyZXR1cm4gcS5zZXQoYSxpKSxpfSxGPShlLHQpPT5hc3luYygpPT57TihcIlVuc3Vic2NyaWJpbmcgZ3JvdXAgZXZlbnRzXCIse3N1YnNjcmlwdGlvbklkOnR9KTt0cnl7YXdhaXQoZT0+YXN5bmMgdD0+e2NvbnN0IG49e3N1YnNjcmlwdGlvbklkOnR9O2xldCByO3RyeXtyPWF3YWl0IGUoVC5DYW5jZWxTdWJzY3JpcHRpb24sbil9Y2F0Y2goZSl7Y29uc3QgdD1uZXcgQWRhcHRlckVycm9yKHZvaWQgMCxlKTt0aHJvdyBSKHQpLHR9aWYoIXIuc3VjY2Vzcyl7Y29uc3QgZT1uZXcgVGVybWluYWxDb25uZWN0UmVxdWVzdEVycm9yKHIuZXJyb3I/Lm1lc3NhZ2Usci5lcnJvcik7dGhyb3cgUihlKSxlfX0pKGUpKHQpfWNhdGNoKGUpe1IoZSl9cS5kZWxldGUodCl9LFU9KGUsdCk9PmFzeW5jIG49Pnt0cnl7ZT8uKG4pLE4oXCJTZXR0aW5nIG5ldyBjb250ZXh0OiBcIixuKSxhd2FpdCBmaW4ubWUuaW50ZXJvcC5zZXRDb250ZXh0KG4pfWNhdGNoKGUpe2NvbnN0IG49bmV3IEludGVyb3BFcnJvcih2b2lkIDAsZSk7UihuKSx0Py4obil9fSxQPWFzeW5jKGUsdCk9PntOKFwiR3JvdXAgZXZlbnQgcmVjZWl2ZWRcIix7ZGF0YTp0LHN1YnNjcmlwdGlvbklkOmV9KTtjb25zdHtncm91cDpufT10LnN1YnNjcmliZUdyb3VwRXZlbnRzO2lmKCFuKXJldHVybiB2b2lkIHgoXCJSZWNlaXZlZCBncm91cCBldmVudCB3aXRoIG5vIGdyb3VwXCIse3N1YnNjcmlwdGlvbklkOmV9KTtpZighcS5oYXMoZSkpcmV0dXJuIHZvaWQgeChcIlJlY2VpdmVkIGdyb3VwIGV2ZW50IGZvciB1bmtub3duIHN1YnNjcmlwdGlvblwiLHtzdWJzY3JpcHRpb25JZDplfSk7Y29uc3Qgcj1xLmdldChlKSxvPShlPT57Y29uc3QgdD17dHlwZTpkLkluc3RydW1lbnQsaWQ6e0JCRzplfX07aWYoXCJFcXVpdHlcIj09PUUoZSkpe2NvbnN0W24scl09ZS5zcGxpdCgvXFxzKy8pO3QuaWQudGlja2VyPW4/LnRvVXBwZXJDYXNlKCksdC5tYXJrZXQ9e0JCRzpyPy50b1VwcGVyQ2FzZSgpfX1yZXR1cm4gdH0pKG4udmFsdWUpO28ub3BlbmZpbkJiZ0FwaT0hMCxyPy5saXN0ZW5lcihvKX0sTz1lPT5hc3luYyB0PT57aWYoIXQpcmV0dXJuO2lmKFwiKlwiPT09dClyZXR1cm5bXTtBcnJheS5pc0FycmF5KHQpfHwodD1bdF0pO2NvbnN0IG49YXdhaXQgVihlKSgpLHI9dC5tYXAoKGU9Pntjb25zdCB0PW4uZmluZCgodD0+dC5uYW1lPy50b1VwcGVyQ2FzZSgpPT09ZS50b1VwcGVyQ2FzZSgpKSk/LmlkO3JldHVybiB0fHx4KGBHcm91cCBub3QgZm91bmQ6ICR7ZX1gKSx0fSkpLmZpbHRlcihCb29sZWFuKTtyZXR1cm4gci5sZW5ndGg/cjp2b2lkIDB9LEc9XCJibG9vbWJlcmctYWRhcHRlclwiLEw9YGJsb29tYmVyZy1hZGFwdGVyLSR7dm9pZCAwIT09Y3J5cHRvLnJhbmRvbVVVSUQ/Y3J5cHRvLnJhbmRvbVVVSUQoKTpcIjEwMDAwMDAwLTEwMDAtNDAwMC04MDAwLTEwMDAwMDAwMDAwMFwiLnJlcGxhY2UoL1swMThdL2csKGU9Pntjb25zdCB0PWNyeXB0by5nZXRSYW5kb21WYWx1ZXMobmV3IFVpbnQ4QXJyYXkoMSkpWzBdJjE1Pj5OdW1iZXIoZSkvNDtyZXR1cm4oTnVtYmVyKGUpXnQpLnRvU3RyaW5nKDE2KX0pKX1gO2xldCBrO2NvbnN0IHo9YXN5bmMoZT0hMSk9Pnt0cnl7aWYoIWF3YWl0KGFzeW5jIGU9Pihhd2FpdCBmaW4uSW50ZXJBcHBsaWNhdGlvbkJ1cy5DaGFubmVsLmdldEFsbENoYW5uZWxzKCkpLnNvbWUoKHQ9PnQuY2hhbm5lbE5hbWU9PT1lKSkpKEwpKXtjb25zdHtwb3J0OnQsc2VjdXJpdHlSZWFsbTpufT1hd2FpdCBmaW4uU3lzdGVtLmdldFJ1bnRpbWVJbmZvKCkse2xpY2Vuc2VLZXk6cn09YXdhaXQgZmluLkFwcGxpY2F0aW9uLmdldEN1cnJlbnRTeW5jKCkuZ2V0TWFuaWZlc3QoKSxvPWZpbi5tZS51dWlkO04oXCJJbml0aWFsaXppbmcgYWRhcHRlclwiLHtjaGFubmVsTmFtZTpMLGxpY2Vuc2VLZXk6cixwb3J0OnQsc2VjdXJpdHlSZWFsbTpuLHV1aWQ6byxhZGFwdGVyTG9nZ2luZ0VuYWJsZWQ6ZX0pLGF3YWl0KGFzeW5jKCk9Pntjb25zdCBlPWF3YWl0IGZpbi5BcHBsaWNhdGlvbi5nZXRDdXJyZW50U3luYygpLmdldE1hbmlmZXN0KCksdD1lLmFwcEFzc2V0cz8uZmluZCgoZT0+ZS5hbGlhcz09PUcpKTtpZih0KXJldHVybiB2b2lkIHgoXCJEZXRlY3RlZCBhZGFwdGVyIHBhY2thZ2UgaW4gYXBwIG1hbmlmZXN0IGFwcEFzc2V0c1wiLHQpO2lmKGF3YWl0IGooKSlyZXR1cm4gdm9pZCBOKFwiVXNpbmcgZXhpc3RpbmcgYWRhcHRlciBwYWNrYWdlXCIpO2NvbnN0IG49e2FsaWFzOkcsc3JjOlwiaHR0cHM6Ly9jZG4ub3BlbmZpbi5jby9yZWxlYXNlL2ludGVncmF0aW9ucy9ibG9vbWJlcmcvMi4xLjAvT3BlbkZpbi5CbG9vbWJlcmcuemlwXCIsdGFyZ2V0OlwiT3BlbkZpbi5CbG9vbWJlcmcuZXhlXCIsdmVyc2lvbjpcIjIuMS4wXCJ9O04oXCJEb3dubG9hZGluZyBhZGFwdGVyIHBhY2thZ2VcIixuKTt0cnl7YXdhaXQgZmluLlN5c3RlbS5kb3dubG9hZEFzc2V0KG4sKCgpPT57fSkpfWNhdGNoKGUpe3Rocm93IFIoXCJVbmFibGUgdG8gZG93bmxvYWQgYWRhcHRlciBwYWNrYWdlXCIpLGV9fSkoKSxmaW4uU3lzdGVtLmxhdW5jaEV4dGVybmFsUHJvY2Vzcyh7YWxpYXM6Ryxhcmd1bWVudHM6YFwiJHtvfVwiIFwiJHtyPz9cIlwifVwiIFwiJHt0fVwiIFwiJHtuPz9cIlwifVwiIFwiJHtMfVwiIFwiJHtlfVwiYCxsaWZldGltZTpcImFwcGxpY2F0aW9uXCJ9KX1jb25zdCBuPWZpbi5JbnRlckFwcGxpY2F0aW9uQnVzLkNoYW5uZWwuY29ubmVjdChMLHtwYXlsb2FkOnt2ZXJzaW9uOlwiMi4xLjBcIn19KSxyPW5ldyBQcm9taXNlKChlPT57c2V0VGltZW91dChlLDJlNCl9KSkudGhlbigoKCk9Pnt0aHJvdyBuZXcgQXBpRXJyb3IoXCJDb25uZWN0aW9uIHRvIGFkYXB0ZXIgdGltZWQgb3V0XCIpfSkpO3JldHVybiBrPWF3YWl0IFByb21pc2UucmFjZShbbixyXSksay5yZWdpc3RlcihULkxvZ01lc3NhZ2UsSCksay5yZWdpc3RlcihULlN1YnNjcmlwdGlvbkV2ZW50LEopLE4oXCJDb25uZWN0ZWQgdG8gYWRhcHRlclwiLHt1dWlkOmsucHJvdmlkZXJJZGVudGl0eS51dWlkfSkse2NoYW5uZWxOYW1lOkwsZGlzcGF0Y2g6KC4uLmUpPT5rLmRpc3BhdGNoKC4uLmUpLGluaXRUZXJtaW5hbDoodD1rLGFzeW5jIGU9Pntjb25zdCBuPXthcGlLZXk6ZX07bGV0IHI7dHJ5e3I9YXdhaXQgdC5kaXNwYXRjaChULkNvbm5lY3Qsbil9Y2F0Y2goZSl7Y29uc3QgdD1uZXcgQWRhcHRlckVycm9yKHZvaWQgMCxlKTt0aHJvdyBSKHQpLHR9aWYoIXIuc3VjY2Vzcyl7Y29uc3QgZT1uZXcgVGVybWluYWxDb25uZWN0aW9uRXJyb3Ioci5lcnJvcj8ubWVzc2FnZSxyLmVycm9yKTt0aHJvdyBSKGUpLGV9fSksdmVyc2lvbjpcIjIuMS4wXCJ9fWNhdGNoKGUpe2NvbnN0IHQ9ZSBpbnN0YW5jZW9mIEFwaUVycm9yP25ldyBJbml0aWFsaXphdGlvbkVycm9yKGUubWVzc2FnZSk6bmV3IEluaXRpYWxpemF0aW9uRXJyb3Iodm9pZCAwLGUpO3Rocm93IFIodCksdH12YXIgdH0sSD1lPT57Y29uc3R7bGV2ZWw6dCxtZXNzYWdlOm59PWUscj1cIlthZGFwdGVyXVwiO3N3aXRjaCh0KXtjYXNlIFMuRXJyb3I6UihuLHIpO2JyZWFrO2Nhc2UgUy5XYXJuOngocixuKTticmVhaztjYXNlIFMuSW5mbzpkZWZhdWx0Ok4ocixuKX19LEo9YXN5bmMgZT0+e2NvbnN0e2RhdGE6dCxlcnJvcjpuLHN1YnNjcmlwdGlvbklkOnJ9PWU7aWYoIXJ8fCF0KXtjb25zdCB0PW5ldyBUZXJtaW5hbENvbm5lY3RSZXF1ZXN0RXJyb3IoXCJJbnZhbGlkIHN1YnNjcmlwdGlvbiBldmVudFwiLGUpO3Rocm93IFIodCksdH1pZihuKXtjb25zdCBlPW5ldyBUZXJtaW5hbENvbm5lY3RSZXF1ZXN0RXJyb3Iodm9pZCAwLG4pO3Rocm93IFIoZSksZX1jb25zdCBvPUpTT04ucGFyc2UodCk7aWYoITA9PT1Cb29sZWFuKG8uc3Vic2NyaWJlR3JvdXBFdmVudHMpKWF3YWl0IFAocixvKTtlbHNlIHgoXCJSZWNlaXZlZCB1bmtub3duIHN1YnNjcmlwdGlvbiBldmVudFwiLHQpfSxqPWFzeW5jKCk9Pnt0cnl7cmV0dXJuXCIyLjEuMFwiPT09KGF3YWl0IGZpbi5TeXN0ZW0uZ2V0QXBwQXNzZXRJbmZvKHthbGlhczpHfSkpLnZlcnNpb259Y2F0Y2goZSl7cmV0dXJuITF9fSxRPWFzeW5jKGUsdCk9PntpZighZSlyZXR1cm4gdm9pZCB4KFwiTm8gYWN0aW9uIHNwZWNpZmllZCwgaWdub3JpbmdcIik7aWYoXCJncm91cFwiaW4gZSl7Y29uc3R7Z3JvdXA6bixzZWN1cml0eTpyfT1lO3JldHVybiB2b2lkIGF3YWl0KGU9PmFzeW5jKHQsbik9PntpZighbilyZXR1cm47TihgU2V0dGluZyAke1wiKlwiPT09dD9cImV2ZXJ5IGdyb3VwXCI6YGdyb3VwICR7dH1gfSBzZWN1cml0eSB0byAke259YCk7Y29uc3Qgcj1hd2FpdCBWKGUpKCk7aWYoXCIqXCI9PT10KWF3YWl0IFByb21pc2UuYWxsKHIubWFwKCh0PT50LmlkPyQoZSkodC5pZCxuKTpQcm9taXNlLnJlc29sdmUoKSkpKTtlbHNle2NvbnN0IG89ci5maW5kKChlPT5lLm5hbWU/LnRvVXBwZXJDYXNlKCk9PT10LnRvVXBwZXJDYXNlKCkpKT8uaWQ7bnVsbD09bz94KGBVbmFibGUgdG8gdXBkYXRlIGdyb3VwIHNlY3VyaXR5IGZvciAke3R9OiBncm91cCBub3QgZm91bmRgKTphd2FpdCAkKGUpKG8sbil9fSkodCkobixyKX1jb25zdHttbmVtb25pYzpuLHNlY3VyaXRpZXM6cix0YXJnZXQ6byx0YWlsOmF9PWUsW2ksc109cj8/W107YXdhaXQoZT0+YXN5bmModCxuLHIsbyxhKT0+e2lmKCF0Py50cmltKCkpdGhyb3cgbmV3IFBhcmFtZXRlckVycm9yKFwiTW5lbW9uaWMgbXVzdCBiZSBhIG5vbi1lbXB0eSBzdHJpbmdcIik7aWYobnVsbD09bnx8XCJzdHJpbmdcIj09dHlwZW9mIG4mJiFuPy50cmltKCkpdGhyb3cgbmV3IFBhcmFtZXRlckVycm9yKFwiVGFyZ2V0IG11c3QgYmUgYSBudW1iZXIgKDAtMykgb3Igbm9uLWVtcHR5IHN0cmluZ1wiKTtOKFwiUnVubmluZyB0ZXJtaW5hbCBmdW5jdGlvblwiLHttbmVtb25pYzp0LHRhcmdldDpuLHNlY3VyaXR5MTpyLHNlY3VyaXR5MjpvLHRhaWw6YX0pO2NvbnN0IGk9dC50cmltKCkudG9VcHBlckNhc2UoKTtsZXQgcyxjO1wibnVtYmVyXCI9PXR5cGVvZiBuPyhzPVwicnVuRnVuY3Rpb25JblBhbmVsXCIsYz1cInBhbmVsOiBcIisoMT09PW4/XCJPTkVcIjoyPT09bj9cIlRXT1wiOjM9PT1uP1wiVEhSRUVcIjpcIlpFUk9cIikpOihzPVwicnVuRnVuY3Rpb25JblRhYlwiLGM9YHRhYk5hbWU6IFwiJHtuLnRyaW0oKX1cImApO2NvbnN0IHU9e3F1ZXJ5OmBtdXRhdGlvbiB7XFxuICAgICAgICAke3N9KGlucHV0OiB7XFxuICAgICAgICAgIG1uZW1vbmljOiBcIiR7aX1cIixcXG4gICAgICAgICAgJHtjfSxcXG4gICAgICAgICAgJHtyP2BzZWN1cml0eTE6IFwiJHtyfVwiYDpcIlwifVxcbiAgICAgICAgICAke28/YHNlY3VyaXR5MjogXCIke299XCJgOlwiXCJ9XFxuICAgICAgICAgICR7YT9gdGFpbDogXCIke2F9XCJgOlwiXCJ9XFxuICAgICAgICB9KSB7XFxuICAgICAgICAgIC4uLiBvbiBSZXN1bHQge1xcbiAgICAgICAgICAgIHN1Y2NlZWRlZFxcbiAgICAgICAgICAgIGRldGFpbHNcXG4gICAgICAgICAgfVxcbiAgICAgICAgICAuLi4gb24gRXJyb3Ige1xcbiAgICAgICAgICAgIGVycm9yQ2F0ZWdvcnlcXG4gICAgICAgICAgICBlcnJvck1lc3NhZ2VcXG4gICAgICAgICAgfVxcbiAgICAgICAgfVxcbiAgICAgIH1gfTtsZXQgbDt0cnl7bD1hd2FpdCBlKFQuRXhlY3V0ZVJlcXVlc3QsdSl9Y2F0Y2goZSl7Y29uc3QgdD1uZXcgQWRhcHRlckVycm9yKHZvaWQgMCxlKTt0aHJvdyBSKHQpLHR9aWYoIWwuc3VjY2Vzcyl7Y29uc3QgZT1uZXcgVGVybWluYWxDb25uZWN0UmVxdWVzdEVycm9yKGwuZXJyb3I/Lm1lc3NhZ2UsbC5lcnJvcik7dGhyb3cgUihlKSxlfWlmKGwuZGF0YSl7Y29uc3QgZT1KU09OLnBhcnNlKGwuZGF0YSk7bGV0IHQ7aWYoXCJydW5GdW5jdGlvbkluVGFiXCJpbiBlP3Q9ZS5ydW5GdW5jdGlvbkluVGFiLmVycm9yTWVzc2FnZTpcInJ1bkZ1bmN0aW9uSW5QYW5lbFwiaW4gZSYmKHQ9ZS5ydW5GdW5jdGlvbkluUGFuZWwuZXJyb3JNZXNzYWdlKSx0KXtjb25zdCBuPW5ldyBUZXJtaW5hbENvbm5lY3RSZXF1ZXN0RXJyb3IodCxlKTt0aHJvdyBSKG4pLG59fX0pKHQpKG4sbyxpLHMsYSl9LFc9KCk9PmU9Pntjb25zdCB0PWUse25hbWU6bixpZDpyfT10LG89cj8uQkJHPz9uO2lmKG8pcmV0dXJue21uZW1vbmljOlwiQklPXCIsdGFyZ2V0OjAsdGFpbDpvfTt4KFwiTm8gdmFsaWQgaWRlbnRpZmllciBwcm92aWRlZCBpbiBjb250ZXh0LCBpZ25vcmluZ1wiKX0sWT1lPT50PT57Y29uc3Qgbj1iKHQpO2lmKG4pcmV0dXJue21uZW1vbmljOmUsc2VjdXJpdGllczpbbl0sdGFyZ2V0OjB9O3goXCJObyBzZWN1cml0eSBwcm92aWRlZCBpbiBjb250ZXh0LCBpZ25vcmluZ1wiKX0sSz1hc3luYyhlLHQsbixyKT0+e2NvbnN0IG89KCgpPT57Y29uc3QgZT1bXSx0PVtdO3JldHVybiBlLnB1c2goW2QuSW5zdHJ1bWVudCxZKFwiREVTXCIpXSksZS5wdXNoKFtkLkNvbnRhY3QsVygpXSksZS5wdXNoKFtkLk9yZ2FuaXphdGlvbixfKCldKSx0LnB1c2goW3kuU3RhcnRDaGF0LFtbZC5Ob3RoaW5nLFooXCJJQlwiKV0sW2QuQ29udGFjdCxlPT57Y29uc3R7aWQ6dCxuYW1lOm59PWU7cmV0dXJue21uZW1vbmljOlwiSUJcIix0YXJnZXQ6MCx0YWlsOnQuZW1haWw/P259fV1dXSksdC5wdXNoKFt5LlZpZXdBbmFseXNpcyxbW2QuTm90aGluZyxaKFwiQU5SXCIpXSxbZC5JbnN0cnVtZW50LGU9Pntjb25zdCB0PWIoZSk7aWYoIXQpcmV0dXJuIHZvaWQgeChcIk5vIHNlY3VyaXR5IHByb3ZpZGVkIGluIGNvbnRleHQsIGlnbm9yaW5nXCIpO2xldCBuO3N3aXRjaChFKHQpKXtjYXNlXCJFcXVpdHlcIjpjYXNlXCJJbmRleFwiOm49XCJGQVwiO2JyZWFrO2Nhc2VcIkNvcnBcIjpjYXNlXCJHb3Z0XCI6Y2FzZVwiTXRnZVwiOmNhc2VcIk11bmlcIjpjYXNlXCJQZmRcIjpuPVwiWUFTXCI7YnJlYWs7ZGVmYXVsdDpuPVwiQU5SXCJ9cmV0dXJue21uZW1vbmljOm4sc2VjdXJpdGllczpbdF0sdGFyZ2V0OjB9fV1dXSksdC5wdXNoKFt5LlZpZXdDaGFydCxbW2QuTm90aGluZyxaKFwiR0lQXCIpXSxbZC5JbnN0cnVtZW50LFkoXCJHSVBcIildLFtkLkNoYXJ0LGU9Pntjb25zdHtpbnRlcnZhbDp0LGluc3RydW1lbnRzOm4scmFuZ2U6cixzdHlsZTpvfT1lLGE9e21uZW1vbmljOlwiR0lQXCIsdGFyZ2V0OjB9O2xldCBpPSEwO2NvbnN0IHM9YihuPy5bMF0/P2UpO3MmJihhLnNlY3VyaXRpZXM9W3NdKTtjb25zdHtlbmRUaW1lOmMsc3RhcnRUaW1lOnV9PXI/P3t9O2lmKHUpe2NvbnN0IGU9Qyh1LnRvU3RyaW5nKCkpO2lmKGUmJihhLnRhaWw9YCR7ZS5nZXRNb250aCgpKzF9LyR7ZS5nZXREYXRlKCl9LyR7ZS5nZXRGdWxsWWVhcigpfWAsaT0hMSxjKSl7Y29uc3QgZT1DKGMudG9TdHJpbmcoKSk7ZSYmKGEudGFpbCs9YCAke2UuZ2V0TW9udGgoKSsxfS8ke2UuZ2V0RGF0ZSgpfS8ke2UuZ2V0RnVsbFllYXIoKX1gKX19c3dpdGNoKG8/LnRvTG93ZXJDYXNlKCkpe2Nhc2VcImJhclwiOmEubW5lbW9uaWM9aT9cIklHUE9cIjpcIkdQT1wiO2JyZWFrO2Nhc2VcImNhbmRsZVwiOmEubW5lbW9uaWM9aT9cIklHUENcIjpcIkdQQ1wiO2JyZWFrO2RlZmF1bHQ6YS5tbmVtb25pYz1pP1wiR0lQXCI6XCJHUFwifWlmKCFpJiZ0KXN3aXRjaCh0LnRvTG93ZXJDYXNlKCkpe2Nhc2VcImRhaWx5XCI6YS50YWlsKz1cIiBEXCI7YnJlYWs7Y2FzZVwid2Vla2x5XCI6YS50YWlsKz1cIiBXXCI7YnJlYWs7Y2FzZVwibW9udGhseVwiOmEudGFpbCs9XCJNXCI7YnJlYWs7Y2FzZVwicXVhcnRlcmx5XCI6YS50YWlsKz1cIiBRXCI7YnJlYWs7Y2FzZVwieWVhcmx5XCI6YS50YWlsKz1cIiBZXCJ9cmV0dXJuIGF9XV1dKSx0LnB1c2goW3kuVmlld0NoYXQsW1tkLk5vdGhpbmcsWihcIklCXCIpXSxbZC5Db250YWN0LGU9Pntjb25zdHtpZDp0LG5hbWU6bn09ZTtyZXR1cm57bW5lbW9uaWM6XCJJQlwiLHRhcmdldDowLHRhaWw6dC5lbWFpbD8/bn19XV1dKSx0LnB1c2goW3kuVmlld0NvbnRhY3QsW1tkLk5vdGhpbmcsWihcIkJJT1wiKV0sW2QuQ29udGFjdCxXKCldXV0pLHQucHVzaChbeS5WaWV3SW5zdHJ1bWVudCxbW2QuTm90aGluZyxaKFwiREVTXCIpXSxbZC5JbnN0cnVtZW50LFkoXCJERVNcIildXV0pLHQucHVzaChbeS5WaWV3TmV3cyxbW2QuTm90aGluZyxaKFwiQ05cIildLFtkLkluc3RydW1lbnQsWShcIkNOXCIpXV1dKSx0LnB1c2goW3kuVmlld1Byb2ZpbGUsW1tkLk5vdGhpbmcsWihcIkRFU1wiKV0sW2QuQ29udGFjdCxXKCldLFtkLk9yZ2FuaXphdGlvbixfKCldXV0pLHQucHVzaChbeS5WaWV3UXVvdGUsW1tkLk5vdGhpbmcsWihcIkFMTFFcIildLFtkLkluc3RydW1lbnQsWShcIkFMTFFcIildXV0pLHQucHVzaChbeS5WaWV3UmVzZWFyY2gsW1tkLk5vdGhpbmcsWihcIkJSQ1wiKV0sW2QuSW5zdHJ1bWVudCxZKFwiQlJDXCIpXV1dKSx7Y29udGV4dHM6ZSxpbnRlbnRzOnR9fSkoKSxhPShlPT57Y29uc3QgdD0oW2VdKT0+ISEoZT8/XCJcIikudHJpbSgpO3JldHVybntjb250ZXh0czpbLi4uZT8uY29udGV4dHM/P1tdXS5maWx0ZXIodCksaW50ZW50czpbLi4uZT8uaW50ZW50cz8/W11dLmZpbHRlcigoKFtlLG5dKT0+e2NvbnN0IHI9Wy4uLm4/P1tdXS5maWx0ZXIodCk7cmV0dXJuISEoZT8/XCJcIikudHJpbSgpJiZyLmxlbmd0aD4wfSkpfX0pKHQpLGk9bmV3IE1hcChvLmNvbnRleHRzKTthLmNvbnRleHRzPy5mb3JFYWNoKCgoW2VdKT0+e2kuaGFzKGUpJiZpLmRlbGV0ZShlKX0pKSxvLmNvbnRleHRzPUFycmF5LmZyb20oaSk7Y29uc3Qgcz1uZXcgTWFwKG8uaW50ZW50cyk7YS5pbnRlbnRzPy5mb3JFYWNoKCgoW2VdKT0+e3MuaGFzKGUpJiZzLmRlbGV0ZShlKX0pKSxvLmludGVudHM9QXJyYXkuZnJvbShzKTtjb25zdCBjPVsuLi5vLmNvbnRleHRzLC4uLmEuY29udGV4dHM/P1tdXSx1PVsuLi5vLmludGVudHMsLi4uYS5pbnRlbnRzPz9bXV0sbD1bXTtsZXQgcDtjLmxlbmd0aCYmbC5wdXNoKGZpbi5tZS5pbnRlcm9wLmFkZENvbnRleHRIYW5kbGVyKCgoZSx0LG4scik9PmFzeW5jIG89PntvPyEwIT09by5vcGVuZmluQmJnQXBpJiYoTihcIkNvbnRleHQgcmVjZWl2ZWRcIixvKSxvLnR5cGUhPT1kLk5vdGhpbmc/YXdhaXQgWChlLG8sdCxuLHIpOk4oXCJOdWxsIGNvbnRleHQgcmVjZWl2ZWQsIGlnbm9yaW5nXCIpKTpOKFwiTm8gY29udGV4dCBpbmZvIHByb3ZpZGVkLCBpZ25vcmluZ1wiKX0pKGUsYyxuLHIpKSksdS5sZW5ndGgmJnUuZm9yRWFjaCgoKFt0LG9dKT0+e2wucHVzaChmaW4ubWUuaW50ZXJvcC5yZWdpc3RlckludGVudEhhbmRsZXIoKChlLHQsbixyKT0+YXN5bmMgbz0+e04oXCJJbnRlbnQgcmVjZWl2ZWRcIixvKSx0P2F3YWl0IFgoZSxvLmNvbnRleHQsdCxuLHIpOngoYE5vIGFjdGlvbnMgaGF2ZSBiZWVuIHByb3ZpZGVkIGZvciBpbnRlbnQgJHtvLm5hbWV9LCBpZ25vcmluZ2ApfSkoZSxvLG4sciksdCkpfSkpO3RyeXtwPWF3YWl0IFByb21pc2UuYWxsKGwpfWNhdGNoKGUpe2NvbnN0IHQ9bmV3IEludGVyb3BFcnJvcihcIkZhaWxlZCB0byByZWdpc3RlciBpbnRlcm9wIGhhbmRsZXJzXCIsZSk7dGhyb3cgUih0KSx0fXJldHVybiBwfSxaPWU9PnQ9Pih7bW5lbW9uaWM6ZSx0YXJnZXQ6MH0pLF89KCk9PmU9Pntjb25zdHtuYW1lOnR9PWU7aWYodClyZXR1cm57bW5lbW9uaWM6XCJTRUFSXCIsdGFyZ2V0OjAsdGFpbDp0fTt4KFwiTm8gdmFsaWQgaWRlbnRpZmllciBwcm92aWRlZCBpbiBjb250ZXh0LCBpZ25vcmluZ1wiKX0sWD1hc3luYyhlLHQsbixyLG8pPT57cj8uKHQpLE4oXCJQcm9jZXNzaW5nIGNvbnRleHRcIix0KSxuLnNvbWUoKChbZV0pPT5lPT09dC50eXBlKSk/YXdhaXQgUHJvbWlzZS5hbGwobi5maWx0ZXIoKChbZV0pPT5lPT09dC50eXBlKSkubWFwKChhc3luYyhbLG5dKT0+e2xldCByO3RyeXtyPWF3YWl0IG4odCl9Y2F0Y2goZSl7Y29uc3QgdD1uZXcgQXBpRXJyb3IoXCJVbmV4cGVjdGVkIGVycm9yIGluIGNvbnRleHQgYWN0aW9uIGhhbmRsZXJcIixlKTtyZXR1cm4gUih0KSx2b2lkIG8/Lih0KX10cnl7YXdhaXQgUShyLGUpfWNhdGNoKGUpe2NvbnN0IHQ9ZSBpbnN0YW5jZW9mIEFwaUVycm9yP2U6bmV3IEFwaUVycm9yKHZvaWQgMCxlKTtSKHQpLG8/Lih0KX19KSkpOngoYE5vIGFjdGlvbiBoYXMgYmVlbiBkZWZpbmVkIGZvciBjb250ZXh0IHR5cGUgJHt0LnR5cGV9LCBpZ25vcmluZ2ApfTt2YXIgZWU7IWZ1bmN0aW9uKGUpe2UuQmxvb21iZXJnPVwiQkxPT01CRVJHXCJ9KGVlfHwoZWU9e30pKTtjb25zdCB0ZT1hc3luYyhlLHQpPT57TihcIkNyZWF0aW5nIGNvbm5lY3Rpb25cIix7Y29uZmlnOnR9KSxyZShlZS5CbG9vbWJlcmcpO2NvbnN0IG49YXdhaXQgeih2KTthd2FpdCBuLmluaXRUZXJtaW5hbChlKTtjb25zdHthY3Rpb25zOnIsaW50ZXJvcERpc2FibGVkOm8sb25Db250ZXh0Q2hhbmdlZDphLG9uRXJyb3I6aX09dD8/e30scz12b2lkIDA9PT10Py5ncm91cHM/XCIqXCI6dC5ncm91cHMsYz1bXTtpZighMCE9PW8pe2MucHVzaCguLi5hd2FpdCBLKG4uZGlzcGF0Y2gscixhLGkpKTtjb25zdCBlPWF3YWl0IEIobi5kaXNwYXRjaCxzLGEsaSk7ZSYmYy5wdXNoKGUpfXJldHVybntkaXNjb25uZWN0Om5lKG4uZGlzcGF0Y2gsYyksZXhlY3V0ZUFwaVJlcXVlc3Q6KHU9bi5kaXNwYXRjaCxhc3luYyhlLHQpPT57TihcIkV4ZWN1dGluZyBBUEkgcmVxdWVzdFwiLHtxdWVyeTplfSk7Y29uc3Qgbj17cXVlcnk6ZX07bGV0IHI7dCYmKG4uc2VydmljZT10KTt0cnl7cj1hd2FpdCB1KFQuRXhlY3V0ZVJlcXVlc3Qsbil9Y2F0Y2goZSl7Y29uc3QgdD1uZXcgQWRhcHRlckVycm9yKHZvaWQgMCxlKTt0aHJvdyBSKHQpLHR9aWYoIXIuc3VjY2Vzcyl7Y29uc3QgZT1uZXcgVGVybWluYWxDb25uZWN0UmVxdWVzdEVycm9yKHIuZXJyb3I/Lm1lc3NhZ2Usci5lcnJvcik7dGhyb3cgUihlKSxlfWlmKCFyLmRhdGEpe2NvbnN0IGU9bmV3IFRlcm1pbmFsQ29ubmVjdFJlcXVlc3RFcnJvcihcIlVuZXhwZWN0ZWQgZW1wdHkgcmVzcG9uc2UgZGF0YVwiLHIpO3Rocm93IFIoZSksZX1jb25zdCBvPUpTT04ucGFyc2Uoci5kYXRhKTtpZihcImVycm9yTWVzc2FnZVwiaW4gbyl7Y29uc3QgZT1uZXcgVGVybWluYWxDb25uZWN0UmVxdWVzdEVycm9yKG8uZXJyb3JNZXNzYWdlLG8pO3Rocm93IFIoZSksZX1yZXR1cm4gb30pfTt2YXIgdX0sbmU9KGUsdD1bXSk9PmFzeW5jKCk9PntOKFwiRGlzY29ubmVjdGluZ1wiKTt0cnl7YXdhaXQgUHJvbWlzZS5hbGwodC5tYXAoKGFzeW5jIGU9Pnthd2FpdCBlLnVuc3Vic2NyaWJlKCl9KSkpLGF3YWl0KGU9PmFzeW5jKCk9PntsZXQgdDt0cnl7dD1hd2FpdCBlKFQuRGlzY29ubmVjdCxudWxsKX1jYXRjaChlKXtjb25zdCB0PW5ldyBBZGFwdGVyRXJyb3Iodm9pZCAwLGUpO3Rocm93IFIodCksdH1pZighdC5zdWNjZXNzKXtjb25zdCBlPW5ldyBUZXJtaW5hbENvbm5lY3Rpb25FcnJvcihcIkZhaWxlZCB0byBkaXNjb25uZWN0IHRlcm1pbmFsXCIsdC5lcnJvcik7dGhyb3cgUihlKSxlfX0pKGUpKCl9Y2F0Y2goZSl7Y29uc3QgdD1uZXcgQXBpRXJyb3IoXCJEaXNjb25uZWN0aW9uIGZhaWxlZFwiLGUpO3Rocm93IFIodCksdH19LHJlPWFzeW5jIGU9Pnt0cnl7YXdhaXQgZmluLlN5c3RlbS5yZWdpc3RlclVzYWdlKHt0eXBlOlwiaW50ZWdyYXRpb24tZmVhdHVyZVwiLGRhdGE6e2FwaVZlcnNpb246XCIyLjEuMFwiLGNvbXBvbmVudE5hbWU6ZX19KX1jYXRjaCh0KXt4KGBVbmFibGUgdG8gcmVnaXN0ZXIgdXNhZ2UgZm9yIGZlYXR1cmUgJHtlfTogJHt0Py5tZXNzYWdlfWApfX07dmFyIG9lPXQuQWRhcHRlckVycm9yLGFlPXQuQXBpRXJyb3IsaWU9dC5Jbml0aWFsaXphdGlvbkVycm9yLHNlPXQuSW50ZXJvcEVycm9yLGNlPXQuVGVybWluYWxDb25uZWN0UmVxdWVzdEVycm9yLHVlPXQuVGVybWluYWxDb25uZWN0aW9uRXJyb3IsbGU9dC5jb25uZWN0LHBlPXQuZGlzYWJsZUxvZ2dpbmcsZGU9dC5lbmFibGVMb2dnaW5nLGdlPXQuZ2V0U2VjdXJpdHlGcm9tSW5zdHJ1bWVudENvbnRleHQ7ZXhwb3J0e29lIGFzIEFkYXB0ZXJFcnJvcixhZSBhcyBBcGlFcnJvcixpZSBhcyBJbml0aWFsaXphdGlvbkVycm9yLHNlIGFzIEludGVyb3BFcnJvcixjZSBhcyBUZXJtaW5hbENvbm5lY3RSZXF1ZXN0RXJyb3IsdWUgYXMgVGVybWluYWxDb25uZWN0aW9uRXJyb3IsbGUgYXMgY29ubmVjdCxwZSBhcyBkaXNhYmxlTG9nZ2luZyxkZSBhcyBlbmFibGVMb2dnaW5nLGdlIGFzIGdldFNlY3VyaXR5RnJvbUluc3RydW1lbnRDb250ZXh0fTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG5jb25zdCBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdGNvbnN0IGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHRjb25zdCBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdGlmICghKG1vZHVsZUlkIGluIF9fd2VicGFja19tb2R1bGVzX18pKSB7XG5cdFx0ZGVsZXRlIF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdFx0Y29uc3QgZSA9IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIgKyBtb2R1bGVJZCArIFwiJ1wiKTtcblx0XHRlLmNvZGUgPSAnTU9EVUxFX05PVF9GT1VORCc7XG5cdFx0dGhyb3cgZTtcblx0fVxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIvdmFsdWUgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSk7IiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCAqIGFzIGZkYzMgZnJvbSBcIkBmaW5vcy9mZGMzXCI7XG5pbXBvcnQge1xuXHRjb25uZWN0LFxuXHRnZXRTZWN1cml0eUZyb21JbnN0cnVtZW50Q29udGV4dCxcblx0dHlwZSBCbG9vbWJlcmdHcm91cFVwZGF0ZSxcblx0ZW5hYmxlTG9nZ2luZyxcblx0dHlwZSBCbG9vbWJlcmdDb25uZWN0aW9uQ29uZmlnLFxuXHR0eXBlIEJsb29tYmVyZ0Nvbm5lY3Rpb25cbn0gZnJvbSBcIkBvcGVuZmluL2Jsb29tYmVyZ1wiO1xuaW1wb3J0IHR5cGUgT3BlbkZpbiBmcm9tIFwiQG9wZW5maW4vY29yZVwiO1xuXG5sZXQgYmJnQ29ubmVjdGlvbjogQmxvb21iZXJnQ29ubmVjdGlvbiB8IHVuZGVmaW5lZDtcblxubGV0IHNlbGVjdGVkSW50ZW50VHlwZTogc3RyaW5nID0gXCJcIjtcbmxldCBzZWxlY3RlZEludGVudFZhbHVlOiBzdHJpbmcgPSBcIlwiO1xubGV0IGZkYzNEZW5vbWluYXRpb246IHN0cmluZyA9IFwiXCI7XG5sZXQgYmJnTW5lbW9uaWM6IHN0cmluZyA9IFwiXCI7XG5cbmxldCBidG5Db25uZWN0OiBIVE1MQnV0dG9uRWxlbWVudCB8IG51bGw7XG5sZXQgYnRuRGlzY29ubmVjdDogSFRNTEJ1dHRvbkVsZW1lbnQgfCBudWxsO1xubGV0IGJ0bkNsZWFyTG9nczogSFRNTEJ1dHRvbkVsZW1lbnQgfCBudWxsO1xubGV0IGJ0blF1ZXJ5OiBIVE1MQnV0dG9uRWxlbWVudCB8IG51bGw7XG5sZXQgaW50ZW50VHlwZUVsZW1lbnQ6IEhUTUxTZWxlY3RFbGVtZW50IHwgbnVsbDtcbmxldCBpbnRlbnRWYWx1ZUVsZW1lbnQ6IEhUTUxTZWxlY3RFbGVtZW50IHwgbnVsbDtcbmxldCBsb2dPdXRwdXQ6IEhUTUxQcmVFbGVtZW50IHwgbnVsbDtcblxuY29uc3QgQVBJX0tFWSA9IFwiXCI7XG5cbmNvbnN0IGNvbmZpZzogQmxvb21iZXJnQ29ubmVjdGlvbkNvbmZpZyA9IHtcblx0b25Db250ZXh0Q2hhbmdlZDogKGNvbnRleHQpID0+IHtcblx0XHRsb2dJbmZvcm1hdGlvbihgUmVjZWl2ZWQgY29udGV4dDogJHtKU09OLnN0cmluZ2lmeShjb250ZXh0KX1gKTtcblx0fSxcblx0b25FcnJvcjogKGVycm9yKSA9PiBsb2dJbmZvcm1hdGlvbihlcnJvci5tZXNzYWdlKSxcblx0Z3JvdXBzOiBbXCJHcm91cC1BXCJdLFxuXHRpbnRlcm9wRGlzYWJsZWQ6IGZhbHNlLFxuXHRhY3Rpb25zOiB7XG5cdFx0Y29udGV4dHM6IFtcblx0XHRcdFtcblx0XHRcdFx0ZmRjMy5Db250ZXh0VHlwZXMuSW5zdHJ1bWVudCxcblx0XHRcdFx0KGNvbnRleHQpOiBCbG9vbWJlcmdHcm91cFVwZGF0ZSB8IHVuZGVmaW5lZCA9PiB7XG5cdFx0XHRcdFx0Ly8gVXNlIHRoZSBnZXRTZWN1cml0eUZyb21JbnN0cnVtZW50Q29udGV4dCB1dGlsaXR5IGZ1bmN0aW9uIHRvIGV4dHJhY3QgdGhlIHNlY3VyaXR5IHN0cmluZyBmcm9tIHRoZSBjb250ZXh0XG5cdFx0XHRcdFx0Y29uc3Qgc2VjdXJpdHkgPSBnZXRTZWN1cml0eUZyb21JbnN0cnVtZW50Q29udGV4dChjb250ZXh0KTtcblx0XHRcdFx0XHRpZiAoIXNlY3VyaXR5KSB7XG5cdFx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGxvZ0luZm9ybWF0aW9uKGBSZWNlaXZlZCBJbnN0cnVtZW50IENvbnRleHQ6ICR7c2VjdXJpdHl9YCk7XG5cblx0XHRcdFx0XHQvLyBSZXR1cm4gYSBCbG9vbWJlcmdHcm91cFVwZGF0ZSBvYmplY3QgdGhhdCB1cGRhdGVzIExhdW5jaHBhZCBncm91cCBBIHdpdGggdGhlIHNlY3VyaXR5XG5cdFx0XHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0XHRcdGdyb3VwOiBcIkdyb3VwLUFcIixcblx0XHRcdFx0XHRcdHNlY3VyaXR5XG5cdFx0XHRcdFx0fSBhcyBCbG9vbWJlcmdHcm91cFVwZGF0ZTtcblx0XHRcdFx0fVxuXHRcdFx0XVxuXHRcdF1cblx0fVxufTtcblxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIGFzeW5jICgpID0+IHtcblx0Ly8gRW5hYmxlIGxvZ2dpbmcgaW4gdGhlIEJCRyBwYWNrYWdlXG5cdGVuYWJsZUxvZ2dpbmcoKTtcblxuXHQvLyBJbml0aWFsaXplIHRoZSBET00gZWxlbWVudHMuXG5cdGluaXRpYWxpemVET00oKTtcbn0pO1xuXG4vKipcbiAqIEluaXRpYWxpemUgdGhlIERPTS5cbiAqL1xuZnVuY3Rpb24gaW5pdGlhbGl6ZURPTSgpOiB2b2lkIHtcblx0YnRuQ29ubmVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTEJ1dHRvbkVsZW1lbnQ+KFwiI2J0bkNvbm5lY3RcIik7XG5cdGJ0bkRpc2Nvbm5lY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yPEhUTUxCdXR0b25FbGVtZW50PihcIiNidG5EaXNjb25uZWN0XCIpO1xuXHRidG5DbGVhckxvZ3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yPEhUTUxCdXR0b25FbGVtZW50PihcIiNidG5DbGVhclwiKTtcblx0YnRuUXVlcnkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yPEhUTUxCdXR0b25FbGVtZW50PihcIiNidG5RdWVyeVwiKTtcblx0aW50ZW50VHlwZUVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yPEhUTUxTZWxlY3RFbGVtZW50PihcIiNpbnRlbnRUeXBlXCIpO1xuXHRpbnRlbnRWYWx1ZUVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yPEhUTUxTZWxlY3RFbGVtZW50PihcIiNpbnRlbnRWYWx1ZVwiKTtcblx0bG9nT3V0cHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcjxIVE1MUHJlRWxlbWVudD4oXCIjbG9nT3V0cHV0XCIpO1xuXG5cdGlmIChidG5Db25uZWN0KSB7XG5cdFx0YnRuQ29ubmVjdC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgYXN5bmMgKCkgPT4ge1xuXHRcdFx0aWYgKGJ0bkNvbm5lY3QpIHtcblx0XHRcdFx0YnRuQ29ubmVjdC5kaXNhYmxlZCA9IHRydWU7XG5cdFx0XHR9XG5cdFx0XHRhd2FpdCBjb25uZWN0VG9CQkdUZXJtaW5hbCgpO1xuXHRcdFx0dXBkYXRlU3RhdGUoKTtcblx0XHR9KTtcblx0fVxuXHRpZiAoYnRuRGlzY29ubmVjdCkge1xuXHRcdGJ0bkRpc2Nvbm5lY3QuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGFzeW5jICgpID0+IHtcblx0XHRcdGlmIChidG5EaXNjb25uZWN0KSB7XG5cdFx0XHRcdGJ0bkRpc2Nvbm5lY3QuZGlzYWJsZWQgPSB0cnVlO1xuXHRcdFx0fVxuXHRcdFx0YXdhaXQgZGlzY29ubmVjdEZyb21CQkdUZXJtaW5hbCgpO1xuXHRcdFx0dXBkYXRlU3RhdGUoKTtcblx0XHR9KTtcblx0fVxuXHRpZiAoYnRuQ2xlYXJMb2dzKSB7XG5cdFx0YnRuQ2xlYXJMb2dzLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBjbGVhckxvZ3MpO1xuXHR9XG5cdGlmIChidG5RdWVyeSkge1xuXHRcdGJ0blF1ZXJ5LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmaXJlSW50ZW50Rm9yQkJHKTtcblx0fVxuXG5cdGlmIChpbnRlbnRUeXBlRWxlbWVudCkge1xuXHRcdGludGVudFR5cGVFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgKGV2ZW50KSA9PiB7XG5cdFx0XHRpZiAoaW50ZW50VHlwZUVsZW1lbnQ/LnZhbHVlKSB7XG5cdFx0XHRcdGlmIChidG5RdWVyeSkge1xuXHRcdFx0XHRcdGJ0blF1ZXJ5LmRpc2FibGVkID0gdHJ1ZTtcblx0XHRcdFx0fVxuXHRcdFx0XHRzd2l0Y2ggKGludGVudFR5cGVFbGVtZW50Py52YWx1ZSkge1xuXHRcdFx0XHRcdGNhc2UgXCJWaWV3Q2hhcnRcIjpcblx0XHRcdFx0XHRcdGxvZ0luZm9ybWF0aW9uKFxuXHRcdFx0XHRcdFx0XHRcIkludGVudCB0byBiZSBmaXJlZCBpcyBWaWV3Q2hhcnQuIENvbnRlbnQgVHlwZSBpcyBmZGMzLmluc3RydW1lbnQuIEJsb29tYmVyZyBUZXJtaW5hbCBNbmVtb25pYzogR1BcIlxuXHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRcdHNlbGVjdGVkSW50ZW50VHlwZSA9IFwiVmlld0NoYXJ0XCI7XG5cdFx0XHRcdFx0XHRmZGMzRGVub21pbmF0aW9uID0gXCJmZGMzLmluc3RydW1lbnRcIjtcblx0XHRcdFx0XHRcdGJiZ01uZW1vbmljID0gXCJHUFwiO1xuXHRcdFx0XHRcdFx0cG9wdWxhdGVTZWxlY3QoaW50ZW50VmFsdWVFbGVtZW50LCBbXG5cdFx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0XHR2YWx1ZTogXCJPUkNMXCIsXG5cdFx0XHRcdFx0XHRcdFx0bGFiZWw6IFwiT3JhY2xlIENvcnBcIlxuXHRcdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdFx0dmFsdWU6IFwiTVNGVFwiLFxuXHRcdFx0XHRcdFx0XHRcdGxhYmVsOiBcIk1pY3Jvc29mdFwiXG5cdFx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0XHR2YWx1ZTogXCJJQk1cIixcblx0XHRcdFx0XHRcdFx0XHRsYWJlbDogXCJJQk1cIlxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRdKTtcblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdGNhc2UgXCJWaWV3Q29udGFjdFwiOlxuXHRcdFx0XHRcdFx0bG9nSW5mb3JtYXRpb24oXG5cdFx0XHRcdFx0XHRcdFwiSW50ZW50IHRvIGJlIGZpcmVkIGlzIFZpZXdDb250YWN0LiBDb250ZW50IFR5cGUgaXMgZmRjMy5jb250YWN0LiBCbG9vbWJlcmcgVGVybWluYWwgTW5lbW9uaWM6IEJJT1wiXG5cdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdFx0c2VsZWN0ZWRJbnRlbnRUeXBlID0gXCJWaWV3Q29udGFjdFwiO1xuXHRcdFx0XHRcdFx0ZmRjM0Rlbm9taW5hdGlvbiA9IFwiZmRjMy5jb250YWN0XCI7XG5cdFx0XHRcdFx0XHRiYmdNbmVtb25pYyA9IFwiQklPXCI7XG5cdFx0XHRcdFx0XHRwb3B1bGF0ZVNlbGVjdChpbnRlbnRWYWx1ZUVsZW1lbnQsIFtcblx0XHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRcdHZhbHVlOiBcIldpbGxpYW0gSGVucnkgR2F0ZXNcIixcblx0XHRcdFx0XHRcdFx0XHRsYWJlbDogXCJXaWxsaWFtIEhlbnJ5IEdhdGVzXCJcblx0XHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRcdHZhbHVlOiBcIkxhcnJ5IEVsbGlzb25cIixcblx0XHRcdFx0XHRcdFx0XHRsYWJlbDogXCJMYXJyeSBFbGxpc29uXCJcblx0XHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRcdHZhbHVlOiBcIlJvYmVydCBJZ2VyXCIsXG5cdFx0XHRcdFx0XHRcdFx0bGFiZWw6IFwiUm9iZXJ0IElnZXJcIlxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRdKTtcblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdGNhc2UgXCJWaWV3SW5zdHJ1bWVudFwiOlxuXHRcdFx0XHRcdFx0bG9nSW5mb3JtYXRpb24oXG5cdFx0XHRcdFx0XHRcdFwiSW50ZW50IHRvIGJlIGZpcmVkIGlzIFZpZXdJbnN0cnVtZW50LiBDb250ZW50IFR5cGUgaXMgZmRjMy5pbnN0cnVtZW50LiBCbG9vbWJlcmcgVGVybWluYWwgTW5lbW9uaWM6IERFU1wiXG5cdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdFx0c2VsZWN0ZWRJbnRlbnRUeXBlID0gXCJWaWV3SW5zdHJ1bWVudFwiO1xuXHRcdFx0XHRcdFx0ZmRjM0Rlbm9taW5hdGlvbiA9IFwiZmRjMy5pbnN0cnVtZW50XCI7XG5cdFx0XHRcdFx0XHRiYmdNbmVtb25pYyA9IFwiREVTXCI7XG5cdFx0XHRcdFx0XHRwb3B1bGF0ZVNlbGVjdChpbnRlbnRWYWx1ZUVsZW1lbnQsIFtcblx0XHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRcdHZhbHVlOiBcIk9SQ0xcIixcblx0XHRcdFx0XHRcdFx0XHRsYWJlbDogXCJPcmFjbGUgQ29ycFwiXG5cdFx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0XHR2YWx1ZTogXCJNU0ZUXCIsXG5cdFx0XHRcdFx0XHRcdFx0bGFiZWw6IFwiTWljcm9zb2Z0XCJcblx0XHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRcdHZhbHVlOiBcIklCTVwiLFxuXHRcdFx0XHRcdFx0XHRcdGxhYmVsOiBcIklCTVwiXG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdF0pO1xuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0Y2FzZSBcIlZpZXdRdW90ZVwiOlxuXHRcdFx0XHRcdFx0bG9nSW5mb3JtYXRpb24oXG5cdFx0XHRcdFx0XHRcdFwiSW50ZW50IHRvIGJlIGZpcmVkIGlzIFZpZXdRdW90ZS4gQ29udGVudCBUeXBlIGlzIGZkYzMuaW5zdHJ1bWVudC4gQmxvb21iZXJnIFRlcm1pbmFsIE1uZW1vbmljOiBRXCJcblx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0XHRzZWxlY3RlZEludGVudFR5cGUgPSBcIlZpZXdRdW90ZVwiO1xuXHRcdFx0XHRcdFx0ZmRjM0Rlbm9taW5hdGlvbiA9IFwiZmRjMy5pbnN0cnVtZW50XCI7XG5cdFx0XHRcdFx0XHRiYmdNbmVtb25pYyA9IFwiUVwiO1xuXHRcdFx0XHRcdFx0cG9wdWxhdGVTZWxlY3QoaW50ZW50VmFsdWVFbGVtZW50LCBbXG5cdFx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0XHR2YWx1ZTogXCJPUkNMXCIsXG5cdFx0XHRcdFx0XHRcdFx0bGFiZWw6IFwiT3JhY2xlIENvcnBcIlxuXHRcdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdFx0dmFsdWU6IFwiTVNGVFwiLFxuXHRcdFx0XHRcdFx0XHRcdGxhYmVsOiBcIk1pY3Jvc29mdFwiXG5cdFx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0XHR2YWx1ZTogXCJJQk1cIixcblx0XHRcdFx0XHRcdFx0XHRsYWJlbDogXCJJQk1cIlxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRdKTtcblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHVwZGF0ZVN0YXRlKCk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cblxuXHRpZiAoaW50ZW50VmFsdWVFbGVtZW50KSB7XG5cdFx0aW50ZW50VmFsdWVFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgKCkgPT4ge1xuXHRcdFx0aWYgKGludGVudFZhbHVlRWxlbWVudCkge1xuXHRcdFx0XHRzZWxlY3RlZEludGVudFZhbHVlID0gaW50ZW50VmFsdWVFbGVtZW50LnZhbHVlO1xuXHRcdFx0XHRpZiAoc2VsZWN0ZWRJbnRlbnRWYWx1ZS5sZW5ndGggPiAwKSB7XG5cdFx0XHRcdFx0bG9nSW5mb3JtYXRpb24oXG5cdFx0XHRcdFx0XHRgYWN0aW9uOiAke3NlbGVjdGVkSW50ZW50VHlwZX0sIHR5cGU6ICR7ZmRjM0Rlbm9taW5hdGlvbn0sIGJiZyBtbmVtb25pYzogJHtiYmdNbmVtb25pY30sIHNlYXJjaCB2YWx1ZTogJHtzZWxlY3RlZEludGVudFZhbHVlfWBcblx0XHRcdFx0XHQpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHVwZGF0ZVN0YXRlKCk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cblxuXHR1cGRhdGVTdGF0ZSgpO1xufVxuXG4vKipcbiAqIENvbm5lY3QgdG8gQmxvb21iZXJnIFRlcm1pbmFsLlxuICovXG5hc3luYyBmdW5jdGlvbiBjb25uZWN0VG9CQkdUZXJtaW5hbCgpOiBQcm9taXNlPHZvaWQ+IHtcblx0dHJ5IHtcblx0XHRsb2dJbmZvcm1hdGlvbihcIkNoZWNraW5nIEJsb29tYmVyZyBUZXJtaW5hbCBTdGF0dXNcIik7XG5cblx0XHRiYmdDb25uZWN0aW9uID0gYXdhaXQgY29ubmVjdChBUElfS0VZLCBjb25maWcpO1xuXHRcdGxvZ0luZm9ybWF0aW9uKFwiQ29ubmVjdGlvbiBzdWNjZXNzZnVsXCIpO1xuXHR9IGNhdGNoIChlcnJvcikge1xuXHRcdGJiZ0Nvbm5lY3Rpb24gPSB1bmRlZmluZWQ7XG5cdFx0Y29uc29sZS5sb2coZXJyb3IpO1xuXHRcdGxvZ0luZm9ybWF0aW9uKGVycm9yVG9TdHJpbmcoZXJyb3IpKTtcblx0fVxufVxuXG4vKipcbiAqIERpc2Nvbm5lY3QgZnJvbSBCbG9vbWJlcmcgVGVybWluYWwuXG4gKi9cbmFzeW5jIGZ1bmN0aW9uIGRpc2Nvbm5lY3RGcm9tQkJHVGVybWluYWwoKTogUHJvbWlzZTx2b2lkPiB7XG5cdGlmIChiYmdDb25uZWN0aW9uKSB7XG5cdFx0dHJ5IHtcblx0XHRcdGxvZ0luZm9ybWF0aW9uKFwiRGlzY29ubmVjdGluZyBmcm9tIEJsb29tYmVyZyBUZXJtaW5hbFwiKTtcblx0XHRcdGF3YWl0IGJiZ0Nvbm5lY3Rpb24uZGlzY29ubmVjdCgpO1xuXHRcdH0gZmluYWxseSB7XG5cdFx0XHRiYmdDb25uZWN0aW9uID0gdW5kZWZpbmVkO1xuXHRcdFx0bG9nSW5mb3JtYXRpb24oXCJEaXNjb25uZWN0ZWQgZnJvbSBCbG9vbWJlcmcgVGVybWluYWxcIik7XG5cdFx0fVxuXHR9XG59XG5cbi8qKlxuICogRmlyZSBhbiBpbnRlbnQuXG4gKi9cbmFzeW5jIGZ1bmN0aW9uIGZpcmVJbnRlbnRGb3JCQkcoKTogUHJvbWlzZTx2b2lkPiB7XG5cdGlmIChiYmdDb25uZWN0aW9uKSB7XG5cdFx0dHJ5IHtcblx0XHRcdGxvZ0luZm9ybWF0aW9uKFxuXHRcdFx0XHRgYWN0aW9uOiAke3NlbGVjdGVkSW50ZW50VHlwZX0sIHR5cGU6ICR7ZmRjM0Rlbm9taW5hdGlvbn0sIGJiZyBtbmVtb25pYzogJHtiYmdNbmVtb25pY30sIHNlYXJjaCB2YWx1ZTogJHtzZWxlY3RlZEludGVudFZhbHVlfWBcblx0XHRcdCk7XG5cblx0XHRcdGxldCBpbnRlbnQ6IE9wZW5GaW4uSW50ZW50O1xuXG5cdFx0XHRzd2l0Y2ggKHNlbGVjdGVkSW50ZW50VHlwZSkge1xuXHRcdFx0XHRjYXNlIFwiVmlld0NvbnRhY3RcIjpcblx0XHRcdFx0XHRpbnRlbnQgPSB7XG5cdFx0XHRcdFx0XHRuYW1lOiBzZWxlY3RlZEludGVudFR5cGUsXG5cdFx0XHRcdFx0XHRjb250ZXh0OiB7XG5cdFx0XHRcdFx0XHRcdHR5cGU6IGZkYzNEZW5vbWluYXRpb24sXG5cdFx0XHRcdFx0XHRcdG5hbWU6IHNlbGVjdGVkSW50ZW50VmFsdWUsXG5cdFx0XHRcdFx0XHRcdGlkOiB7fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdFx0aW50ZW50ID0ge1xuXHRcdFx0XHRcdFx0bmFtZTogc2VsZWN0ZWRJbnRlbnRUeXBlLFxuXHRcdFx0XHRcdFx0Y29udGV4dDoge1xuXHRcdFx0XHRcdFx0XHR0eXBlOiBmZGMzRGVub21pbmF0aW9uLFxuXHRcdFx0XHRcdFx0XHRpZDoge1xuXHRcdFx0XHRcdFx0XHRcdHRpY2tlcjogc2VsZWN0ZWRJbnRlbnRWYWx1ZVxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdH1cblxuXHRcdFx0YXdhaXQgZmluLm1lLmludGVyb3AuZmlyZUludGVudChpbnRlbnQpO1xuXHRcdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0XHRsb2dJbmZvcm1hdGlvbihgRXJyb3Igd2hpbGUgdHJ5aW5nIHRvIHJhaXNlIGludGVudDogJHtlcnJvclRvU3RyaW5nKGVycm9yKX1gKTtcblx0XHR9XG5cdH0gZWxzZSB7XG5cdFx0bG9nSW5mb3JtYXRpb24oXCJOb3QgY29ubmVjdGVkIHRvIHRoZSBCbG9vbWJlcmcgVGVybWluYWwuIFBsZWFzZSBjaGVjayB5b3VyIHN0YXR1cyBvciBsb2cgaW4gYWdhaW4uXCIpO1xuXHR9XG59XG5cbi8qKlxuICogVXBkYXRlIHRoZSBzdGF0ZSBvZiB0aGUgRE9NLlxuICovXG5mdW5jdGlvbiB1cGRhdGVTdGF0ZSgpOiB2b2lkIHtcblx0Y29uc3QgaXNDb25uZWN0ZWQgPSBiYmdDb25uZWN0aW9uICE9PSB1bmRlZmluZWQ7XG5cdGlmIChidG5Db25uZWN0KSB7XG5cdFx0YnRuQ29ubmVjdC5kaXNhYmxlZCA9IGlzQ29ubmVjdGVkO1xuXHR9XG5cdGlmIChidG5EaXNjb25uZWN0KSB7XG5cdFx0YnRuRGlzY29ubmVjdC5kaXNhYmxlZCA9ICFpc0Nvbm5lY3RlZDtcblx0fVxuXHRpZiAoaW50ZW50VHlwZUVsZW1lbnQpIHtcblx0XHRpbnRlbnRUeXBlRWxlbWVudC5kaXNhYmxlZCA9ICFpc0Nvbm5lY3RlZDtcblx0fVxuXHRpZiAoaW50ZW50VmFsdWVFbGVtZW50KSB7XG5cdFx0aW50ZW50VmFsdWVFbGVtZW50LmRpc2FibGVkID0gIWlzQ29ubmVjdGVkIHx8IHNlbGVjdGVkSW50ZW50VHlwZS5sZW5ndGggPT09IDA7XG5cdH1cblx0aWYgKGJ0blF1ZXJ5KSB7XG5cdFx0YnRuUXVlcnkuZGlzYWJsZWQgPSAhaXNDb25uZWN0ZWQgfHwgc2VsZWN0ZWRJbnRlbnRWYWx1ZS5sZW5ndGggPT09IDA7XG5cdH1cbn1cblxuLyoqXG4gKiBMb2cgaW5mb3JtYXRpb24gdG8gdGhlIG91dHB1dCBlbGVtZW50LlxuICogQHBhcmFtIGluZm8gVGhlIGluZm9ybWF0aW9uIHRvIGxvZy5cbiAqL1xuZnVuY3Rpb24gbG9nSW5mb3JtYXRpb24oaW5mbzogc3RyaW5nKTogdm9pZCB7XG5cdGlmIChsb2dPdXRwdXQpIHtcblx0XHRsb2dPdXRwdXQudGV4dENvbnRlbnQgPSBgJHtsb2dPdXRwdXQudGV4dENvbnRlbnR9JHtpbmZvfVxcblxcbmA7XG5cdFx0bG9nT3V0cHV0LnNjcm9sbFRvcCA9IGxvZ091dHB1dC5zY3JvbGxIZWlnaHQ7XG5cdH1cbn1cblxuLyoqXG4gKiBDb252ZXJ0IGFuZCBlcnJvciB0byBhIHN0cmluZy5cbiAqIEBwYXJhbSBlcnIgVGhlIGVycm9yIHRvIGNvbnZlcnQuXG4gKiBAcmV0dXJucyBUaGUgZXJyb3IgYXMgYSBzdHJpbmcuXG4gKi9cbmZ1bmN0aW9uIGVycm9yVG9TdHJpbmcoZXJyOiB1bmtub3duKTogc3RyaW5nIHtcblx0aWYgKGVyciBpbnN0YW5jZW9mIEVycm9yKSB7XG5cdFx0cmV0dXJuIGVyci5tZXNzYWdlO1xuXHR9IGVsc2UgaWYgKHR5cGVvZiBlcnIgPT09IFwic3RyaW5nXCIpIHtcblx0XHRyZXR1cm4gZXJyO1xuXHR9XG5cblx0cmV0dXJuIEpTT04uc3RyaW5naWZ5KGVycik7XG59XG5cbi8qKlxuICogQ2xlYXIgdGhlIGxvZ3MuXG4gKi9cbmZ1bmN0aW9uIGNsZWFyTG9ncygpOiB2b2lkIHtcblx0aWYgKGxvZ091dHB1dCkge1xuXHRcdGxvZ091dHB1dC50ZXh0Q29udGVudCA9IFwiXCI7XG5cdFx0bG9nT3V0cHV0LnNjcm9sbFRvcCA9IDA7XG5cdH1cbn1cblxuLyoqXG4gKiBQb3B1bGF0ZSBhIHNlbGVjdCBjb250cm9sIHdpdGggYSBsaXN0IG9mIGl0ZW1zLlxuICogQHBhcmFtIHNlbGVjdCBUaGUgc2VsZWN0IGVsZW1lbnQgdG8gcG9wdWxhdGUuXG4gKiBAcGFyYW0gdmFsdWVzIFRoZSB2YWx1ZXMgdG8gcG9wdWxhdGUgdGhlIGVsZW1lbnQgd2l0aC5cbiAqL1xuZnVuY3Rpb24gcG9wdWxhdGVTZWxlY3Qoc2VsZWN0OiBIVE1MU2VsZWN0RWxlbWVudCB8IG51bGwsIHZhbHVlczogeyB2YWx1ZTogc3RyaW5nOyBsYWJlbDogc3RyaW5nIH1bXSk6IHZvaWQge1xuXHRpZiAoc2VsZWN0KSB7XG5cdFx0c2VsZWN0LmlubmVySFRNTCA9IFwiXCI7XG5cdFx0Y29uc3Qgb3B0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiKTtcblx0XHRvcHQudmFsdWUgPSBcIlwiO1xuXHRcdG9wdC50ZXh0ID0gXCJQbGVhc2Ugc2VsZWN0IHZhbHVlXCI7XG5cdFx0b3B0LmRpc2FibGVkID0gdHJ1ZTtcblx0XHRvcHQuc2VsZWN0ZWQgPSB0cnVlO1xuXHRcdHNlbGVjdC5hcHBlbmQob3B0KTtcblxuXHRcdGZvciAoY29uc3QgdmFsIG9mIHZhbHVlcykge1xuXHRcdFx0Y29uc3Qgb3B0VmFsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiKTtcblx0XHRcdG9wdFZhbC52YWx1ZSA9IHZhbC52YWx1ZTtcblx0XHRcdG9wdFZhbC50ZXh0ID0gdmFsLmxhYmVsO1xuXHRcdFx0c2VsZWN0LmFwcGVuZChvcHRWYWwpO1xuXHRcdH1cblx0fVxufVxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9