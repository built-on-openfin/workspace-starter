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
/******/ 		if (!(moduleId in __webpack_modules__)) {
/******/ 			delete __webpack_module_cache__[moduleId];
/******/ 			var e = new Error("Cannot find module '" + moduleId + "'");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmJndGVzdC5idW5kbGUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLDhCQUE4QjtBQUMvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsb0NBQW9DO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsa0NBQWtDO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxvQ0FBb0M7O0FBRXJDO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLHVEQUF1RDtBQUN2RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLGFBQWE7QUFDYixJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1REFBdUQ7QUFDdkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtGQUFrRjtBQUNsRjtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLHNCQUFzQjtBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLFlBQVk7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQ0FBK0MsUUFBUTtBQUN2RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLCtDQUErQyxRQUFRO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSwrQ0FBK0MsUUFBUTtBQUN2RDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSwrQ0FBK0MsUUFBUTtBQUN2RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmO0FBQ0EsZUFBZTtBQUNmO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsSUFBSTtBQUNKO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLElBQUk7QUFDSjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxJQUFJO0FBQ0o7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxJQUFJO0FBQ0o7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0Isa0RBQWtEO0FBQzFFO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsb0NBQW9DOztBQUVyQztBQUNBO0FBQ0EsY0FBYywwTEFBMEw7QUFDeE07QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsc0JBQXNCO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBLElBQUk7QUFDSjtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsT0FBTztBQUMzQjtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNFQUFzRSxhQUFhO0FBQ25GO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNB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QUFnQyxFQUFFLE1BQTBDO0lBQ25HLElBQUksTUFBTSxFQUFFLENBQUM7UUFDWixNQUFNLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztRQUN0QixNQUFNLEdBQUcsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzdDLEdBQUcsQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO1FBQ2YsR0FBRyxDQUFDLElBQUksR0FBRyxxQkFBcUIsQ0FBQztRQUNqQyxHQUFHLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztRQUNwQixHQUFHLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztRQUNwQixNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRW5CLEtBQUssTUFBTSxHQUFHLElBQUksTUFBTSxFQUFFLENBQUM7WUFDMUIsTUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNoRCxNQUFNLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUM7WUFDekIsTUFBTSxDQUFDLElBQUksR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDO1lBQ3hCLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDdkIsQ0FBQztJQUNGLENBQUM7QUFDRixDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vaW50ZWdyYXRlLXdpdGgtYmxvb21iZXJnLWJhc2ljLy4uLy4uL25vZGVfbW9kdWxlcy9AZmlub3MvZmRjMy9kaXN0L2ZkYzMuZXNtLmpzIiwid2VicGFjazovL2ludGVncmF0ZS13aXRoLWJsb29tYmVyZy1iYXNpYy8uLi8uLi9ub2RlX21vZHVsZXMvQG9wZW5maW4vYmxvb21iZXJnL29wZW5maW4uYmxvb21iZXJnLm1qcyIsIndlYnBhY2s6Ly9pbnRlZ3JhdGUtd2l0aC1ibG9vbWJlcmctYmFzaWMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vaW50ZWdyYXRlLXdpdGgtYmxvb21iZXJnLWJhc2ljL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9pbnRlZ3JhdGUtd2l0aC1ibG9vbWJlcmctYmFzaWMvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9pbnRlZ3JhdGUtd2l0aC1ibG9vbWJlcmctYmFzaWMvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9pbnRlZ3JhdGUtd2l0aC1ibG9vbWJlcmctYmFzaWMvLi9jbGllbnQvc3JjL2JiZ3Rlc3QudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXHJcbiAqIENvcHlyaWdodCBGSU5PUyBGREMzIGNvbnRyaWJ1dG9ycyAtIHNlZSBOT1RJQ0UgZmlsZVxyXG4gKi9cbi8qKiBDb25zdGFudHMgcmVwcmVzZW50aW5nIHRoZSBlcnJvcnMgdGhhdCBjYW4gYmUgZW5jb3VudGVyZWQgd2hlbiBjYWxsaW5nIHRoZSBgb3BlbmAgbWV0aG9kIG9uIHRoZSBEZXNrdG9wQWdlbnQgb2JqZWN0IChgZmRjM2ApLiAqL1xudmFyIE9wZW5FcnJvcjtcbihmdW5jdGlvbiAoT3BlbkVycm9yKSB7XG4gIC8qKiBSZXR1cm5lZCBpZiB0aGUgc3BlY2lmaWVkIGFwcGxpY2F0aW9uIGlzIG5vdCBmb3VuZC4qL1xuICBPcGVuRXJyb3JbXCJBcHBOb3RGb3VuZFwiXSA9IFwiQXBwTm90Rm91bmRcIjtcbiAgLyoqIFJldHVybmVkIGlmIHRoZSBzcGVjaWZpZWQgYXBwbGljYXRpb24gZmFpbHMgdG8gbGF1bmNoIGNvcnJlY3RseS4qL1xuICBPcGVuRXJyb3JbXCJFcnJvck9uTGF1bmNoXCJdID0gXCJFcnJvck9uTGF1bmNoXCI7XG4gIC8qKiBSZXR1cm5lZCBpZiB0aGUgc3BlY2lmaWVkIGFwcGxpY2F0aW9uIGxhdW5jaGVzIGJ1dCBmYWlscyB0byBhZGQgYSBjb250ZXh0IGxpc3RlbmVyIGluIG9yZGVyIHRvIHJlY2VpdmUgdGhlIGNvbnRleHQgcGFzc2VkIHRvIHRoZSBgZmRjMy5vcGVuYCBjYWxsLiovXG4gIE9wZW5FcnJvcltcIkFwcFRpbWVvdXRcIl0gPSBcIkFwcFRpbWVvdXRcIjtcbiAgLyoqIFJldHVybmVkIGlmIHRoZSBGREMzIGRlc2t0b3AgYWdlbnQgaW1wbGVtZW50YXRpb24gaXMgbm90IGN1cnJlbnRseSBhYmxlIHRvIGhhbmRsZSB0aGUgcmVxdWVzdC4qL1xuICBPcGVuRXJyb3JbXCJSZXNvbHZlclVuYXZhaWxhYmxlXCJdID0gXCJSZXNvbHZlclVuYXZhaWxhYmxlXCI7XG4gIC8qKiBSZXR1cm5lZCBpZiBhIGNhbGwgdG8gdGhlIGBvcGVuYCBmdW5jdGlvbiBpcyBtYWRlIHdpdGggYW4gaW52YWxpZCBjb250ZXh0IGFyZ3VtZW50LiBDb250ZXh0cyBzaG91bGQgYmUgT2JqZWN0cyB3aXRoIGF0IGxlYXN0IGEgYHR5cGVgIGZpZWxkIHRoYXQgaGFzIGEgYHN0cmluZ2AgdmFsdWUuKi9cbiAgT3BlbkVycm9yW1wiTWFsZm9ybWVkQ29udGV4dFwiXSA9IFwiTWFsZm9ybWVkQ29udGV4dFwiO1xufSkoT3BlbkVycm9yIHx8IChPcGVuRXJyb3IgPSB7fSkpO1xuLyoqIENvbnN0YW50cyByZXByZXNlbnRpbmcgdGhlIGVycm9ycyB0aGF0IGNhbiBiZSBlbmNvdW50ZXJlZCB3aGVuIGNhbGxpbmcgdGhlIGBmaW5kSW50ZW50YCwgYGZpbmRJbnRlbnRzQnlDb250ZXh0YCwgYHJhaXNlSW50ZW50YCBvciBgcmFpc2VJbnRlbnRGb3JDb250ZXh0YCBtZXRob2RzIG9uIHRoZSBEZXNrdG9wQWdlbnQgKGBmZGMzYCkuICovXG52YXIgUmVzb2x2ZUVycm9yO1xuKGZ1bmN0aW9uIChSZXNvbHZlRXJyb3IpIHtcbiAgLyoqIFNIT1VMRCBiZSByZXR1cm5lZCBpZiBubyBhcHBzIGFyZSBhdmFpbGFibGUgdGhhdCBjYW4gcmVzb2x2ZSB0aGUgaW50ZW50IGFuZCBjb250ZXh0IGNvbWJpbmF0aW9uLiovXG4gIFJlc29sdmVFcnJvcltcIk5vQXBwc0ZvdW5kXCJdID0gXCJOb0FwcHNGb3VuZFwiO1xuICAvKiogUmV0dXJuZWQgaWYgdGhlIEZEQzMgZGVza3RvcCBhZ2VudCBpbXBsZW1lbnRhdGlvbiBpcyBub3QgY3VycmVudGx5IGFibGUgdG8gaGFuZGxlIHRoZSByZXF1ZXN0LiovXG4gIFJlc29sdmVFcnJvcltcIlJlc29sdmVyVW5hdmFpbGFibGVcIl0gPSBcIlJlc29sdmVyVW5hdmFpbGFibGVcIjtcbiAgLyoqIFJldHVybmVkIGlmIHRoZSB1c2VyIGNhbmNlbGxlZCB0aGUgcmVzb2x1dGlvbiByZXF1ZXN0LCBmb3IgZXhhbXBsZSBieSBjbG9zaW5nIG9yIGNhbmNlbGxpbmcgYSByZXNvbHZlciBVSS4qL1xuICBSZXNvbHZlRXJyb3JbXCJVc2VyQ2FuY2VsbGVkXCJdID0gXCJVc2VyQ2FuY2VsbGVkUmVzb2x1dGlvblwiO1xuICAvKiogU0hPVUxEIGJlIHJldHVybmVkIGlmIGEgdGltZW91dCBjYW5jZWxzIGFuIGludGVudCByZXNvbHV0aW9uIHRoYXQgcmVxdWlyZWQgdXNlciBpbnRlcmFjdGlvbi4gUGxlYXNlIHVzZSBgUmVzb2x2ZXJVbmF2YWlsYWJsZWAgaW5zdGVhZCBmb3Igc2l0dWF0aW9ucyB3aGVyZSBhIHJlc29sdmVyIFVJIG9yIHNpbWlsYXIgZmFpbHMuKi9cbiAgUmVzb2x2ZUVycm9yW1wiUmVzb2x2ZXJUaW1lb3V0XCJdID0gXCJSZXNvbHZlclRpbWVvdXRcIjtcbiAgLyoqIFJldHVybmVkIGlmIGEgc3BlY2lmaWVkIHRhcmdldCBhcHBsaWNhdGlvbiBpcyBub3QgYXZhaWxhYmxlIG9yIGEgbmV3IGluc3RhbmNlIG9mIGl0IGNhbm5vdCBiZSBvcGVuZWQuICovXG4gIFJlc29sdmVFcnJvcltcIlRhcmdldEFwcFVuYXZhaWxhYmxlXCJdID0gXCJUYXJnZXRBcHBVbmF2YWlsYWJsZVwiO1xuICAvKiogUmV0dXJuZWQgaWYgYSBzcGVjaWZpZWQgdGFyZ2V0IGFwcGxpY2F0aW9uIGluc3RhbmNlIGlzIG5vdCBhdmFpbGFibGUsIGZvciBleGFtcGxlIGJlY2F1c2UgaXQgaGFzIGJlZW4gY2xvc2VkLiAqL1xuICBSZXNvbHZlRXJyb3JbXCJUYXJnZXRJbnN0YW5jZVVuYXZhaWxhYmxlXCJdID0gXCJUYXJnZXRJbnN0YW5jZVVuYXZhaWxhYmxlXCI7XG4gIC8qKiBSZXR1cm5lZCBpZiB0aGUgaW50ZW50IGFuZCBjb250ZXh0IGNvdWxkIG5vdCBiZSBkZWxpdmVyZWQgdG8gdGhlIHNlbGVjdGVkIGFwcGxpY2F0aW9uIG9yIGluc3RhbmNlLCBmb3IgZXhhbXBsZSBiZWNhdXNlIGl0IGhhcyBub3QgYWRkZWQgYW4gaW50ZW50IGhhbmRsZXIgd2l0aGluIGEgdGltZW91dC4qL1xuICBSZXNvbHZlRXJyb3JbXCJJbnRlbnREZWxpdmVyeUZhaWxlZFwiXSA9IFwiSW50ZW50RGVsaXZlcnlGYWlsZWRcIjtcbiAgLyoqIFJldHVybmVkIGlmIGEgY2FsbCB0byBvbmUgb2YgdGhlIGByYWlzZUludGVudGAgZnVuY3Rpb25zIGlzIG1hZGUgd2l0aCBhbiBpbnZhbGlkIGNvbnRleHQgYXJndW1lbnQuIENvbnRleHRzIHNob3VsZCBiZSBPYmplY3RzIHdpdGggYXQgbGVhc3QgYSBgdHlwZWAgZmllbGQgdGhhdCBoYXMgYSBgc3RyaW5nYCB2YWx1ZS4qL1xuICBSZXNvbHZlRXJyb3JbXCJNYWxmb3JtZWRDb250ZXh0XCJdID0gXCJNYWxmb3JtZWRDb250ZXh0XCI7XG59KShSZXNvbHZlRXJyb3IgfHwgKFJlc29sdmVFcnJvciA9IHt9KSk7XG52YXIgUmVzdWx0RXJyb3I7XG4oZnVuY3Rpb24gKFJlc3VsdEVycm9yKSB7XG4gIC8qKiBSZXR1cm5lZCBpZiB0aGUgaW50ZW50IGhhbmRsZXIgZXhpdGVkIHdpdGhvdXQgcmV0dXJuaW5nIGEgdmFsaWQgcmVzdWx0IChhIHByb21pc2UgcmVzb2x2aW5nIHRvIGEgQ29udGV4dCwgQ2hhbm5lbCBvYmplY3Qgb3Igdm9pZCkuICovXG4gIFJlc3VsdEVycm9yW1wiTm9SZXN1bHRSZXR1cm5lZFwiXSA9IFwiTm9SZXN1bHRSZXR1cm5lZFwiO1xuICAvKiogUmV0dXJuZWQgaWYgdGhlIEludGVudCBoYW5kbGVyIGZ1bmN0aW9uIHByb2Nlc3NpbmcgdGhlIHJhaXNlZCBpbnRlbnQgdGhyb3dzIGFuIGVycm9yIG9yIHJlamVjdHMgdGhlIFByb21pc2UgaXQgcmV0dXJuZWQuICovXG4gIFJlc3VsdEVycm9yW1wiSW50ZW50SGFuZGxlclJlamVjdGVkXCJdID0gXCJJbnRlbnRIYW5kbGVyUmVqZWN0ZWRcIjtcbn0pKFJlc3VsdEVycm9yIHx8IChSZXN1bHRFcnJvciA9IHt9KSk7XG52YXIgQ2hhbm5lbEVycm9yO1xuKGZ1bmN0aW9uIChDaGFubmVsRXJyb3IpIHtcbiAgLyoqIFJldHVybmVkIGlmIHRoZSBzcGVjaWZpZWQgY2hhbm5lbCBpcyBub3QgZm91bmQgd2hlbiBhdHRlbXB0aW5nIHRvIGpvaW4gYSBjaGFubmVsIHZpYSB0aGUgYGpvaW5Vc2VyQ2hhbm5lbGAgZnVuY3Rpb24gIG9mIHRoZSBEZXNrdG9wQWdlbnQgKGBmZGMzYCkuKi9cbiAgQ2hhbm5lbEVycm9yW1wiTm9DaGFubmVsRm91bmRcIl0gPSBcIk5vQ2hhbm5lbEZvdW5kXCI7XG4gIC8qKiBTSE9VTEQgYmUgcmV0dXJuZWQgd2hlbiBhIHJlcXVlc3QgdG8gam9pbiBhIHVzZXIgY2hhbm5lbCBvciB0byBhIHJldHJpZXZlIGEgQ2hhbm5lbCBvYmplY3QgdmlhIHRoZSBgam9pblVzZXJDaGFubmVsYCBvciBgZ2V0T3JDcmVhdGVDaGFubmVsYCBtZXRob2RzIG9mIHRoZSBEZXNrdG9wQWdlbnQgKGBmZGMzYCkgb2JqZWN0IGlzIGRlbmllZC4gKi9cbiAgQ2hhbm5lbEVycm9yW1wiQWNjZXNzRGVuaWVkXCJdID0gXCJBY2Nlc3NEZW5pZWRcIjtcbiAgLyoqIFNIT1VMRCBiZSByZXR1cm5lZCB3aGVuIGEgY2hhbm5lbCBjYW5ub3QgYmUgY3JlYXRlZCBvciByZXRyaWV2ZWQgdmlhIHRoZSBgZ2V0T3JDcmVhdGVDaGFubmVsYCBtZXRob2Qgb2YgdGhlIERlc2t0b3BBZ2VudCAoYGZkYzNgKS4qL1xuICBDaGFubmVsRXJyb3JbXCJDcmVhdGlvbkZhaWxlZFwiXSA9IFwiQ3JlYXRpb25GYWlsZWRcIjtcbiAgLyoqIFJldHVybmVkIGlmIGEgY2FsbCB0byB0aGUgYGJyb2FkY2FzdGAgZnVuY3Rpb25zIGlzIG1hZGUgd2l0aCBhbiBpbnZhbGlkIGNvbnRleHQgYXJndW1lbnQuIENvbnRleHRzIHNob3VsZCBiZSBPYmplY3RzIHdpdGggYXQgbGVhc3QgYSBgdHlwZWAgZmllbGQgdGhhdCBoYXMgYSBgc3RyaW5nYCB2YWx1ZS4qL1xuICBDaGFubmVsRXJyb3JbXCJNYWxmb3JtZWRDb250ZXh0XCJdID0gXCJNYWxmb3JtZWRDb250ZXh0XCI7XG59KShDaGFubmVsRXJyb3IgfHwgKENoYW5uZWxFcnJvciA9IHt9KSk7XG5cbmZ1bmN0aW9uIF9yZWdlbmVyYXRvclJ1bnRpbWUoKSB7XG4gIF9yZWdlbmVyYXRvclJ1bnRpbWUgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIGV4cG9ydHM7XG4gIH07XG4gIHZhciBleHBvcnRzID0ge30sXG4gICAgT3AgPSBPYmplY3QucHJvdG90eXBlLFxuICAgIGhhc093biA9IE9wLmhhc093blByb3BlcnR5LFxuICAgIGRlZmluZVByb3BlcnR5ID0gT2JqZWN0LmRlZmluZVByb3BlcnR5IHx8IGZ1bmN0aW9uIChvYmosIGtleSwgZGVzYykge1xuICAgICAgb2JqW2tleV0gPSBkZXNjLnZhbHVlO1xuICAgIH0sXG4gICAgJFN5bWJvbCA9IFwiZnVuY3Rpb25cIiA9PSB0eXBlb2YgU3ltYm9sID8gU3ltYm9sIDoge30sXG4gICAgaXRlcmF0b3JTeW1ib2wgPSAkU3ltYm9sLml0ZXJhdG9yIHx8IFwiQEBpdGVyYXRvclwiLFxuICAgIGFzeW5jSXRlcmF0b3JTeW1ib2wgPSAkU3ltYm9sLmFzeW5jSXRlcmF0b3IgfHwgXCJAQGFzeW5jSXRlcmF0b3JcIixcbiAgICB0b1N0cmluZ1RhZ1N5bWJvbCA9ICRTeW1ib2wudG9TdHJpbmdUYWcgfHwgXCJAQHRvU3RyaW5nVGFnXCI7XG4gIGZ1bmN0aW9uIGRlZmluZShvYmosIGtleSwgdmFsdWUpIHtcbiAgICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7XG4gICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICBlbnVtZXJhYmxlOiAhMCxcbiAgICAgIGNvbmZpZ3VyYWJsZTogITAsXG4gICAgICB3cml0YWJsZTogITBcbiAgICB9KSwgb2JqW2tleV07XG4gIH1cbiAgdHJ5IHtcbiAgICBkZWZpbmUoe30sIFwiXCIpO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICBkZWZpbmUgPSBmdW5jdGlvbiAob2JqLCBrZXksIHZhbHVlKSB7XG4gICAgICByZXR1cm4gb2JqW2tleV0gPSB2YWx1ZTtcbiAgICB9O1xuICB9XG4gIGZ1bmN0aW9uIHdyYXAoaW5uZXJGbiwgb3V0ZXJGbiwgc2VsZiwgdHJ5TG9jc0xpc3QpIHtcbiAgICB2YXIgcHJvdG9HZW5lcmF0b3IgPSBvdXRlckZuICYmIG91dGVyRm4ucHJvdG90eXBlIGluc3RhbmNlb2YgR2VuZXJhdG9yID8gb3V0ZXJGbiA6IEdlbmVyYXRvcixcbiAgICAgIGdlbmVyYXRvciA9IE9iamVjdC5jcmVhdGUocHJvdG9HZW5lcmF0b3IucHJvdG90eXBlKSxcbiAgICAgIGNvbnRleHQgPSBuZXcgQ29udGV4dCh0cnlMb2NzTGlzdCB8fCBbXSk7XG4gICAgcmV0dXJuIGRlZmluZVByb3BlcnR5KGdlbmVyYXRvciwgXCJfaW52b2tlXCIsIHtcbiAgICAgIHZhbHVlOiBtYWtlSW52b2tlTWV0aG9kKGlubmVyRm4sIHNlbGYsIGNvbnRleHQpXG4gICAgfSksIGdlbmVyYXRvcjtcbiAgfVxuICBmdW5jdGlvbiB0cnlDYXRjaChmbiwgb2JqLCBhcmcpIHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogXCJub3JtYWxcIixcbiAgICAgICAgYXJnOiBmbi5jYWxsKG9iaiwgYXJnKVxuICAgICAgfTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHR5cGU6IFwidGhyb3dcIixcbiAgICAgICAgYXJnOiBlcnJcbiAgICAgIH07XG4gICAgfVxuICB9XG4gIGV4cG9ydHMud3JhcCA9IHdyYXA7XG4gIHZhciBDb250aW51ZVNlbnRpbmVsID0ge307XG4gIGZ1bmN0aW9uIEdlbmVyYXRvcigpIHt9XG4gIGZ1bmN0aW9uIEdlbmVyYXRvckZ1bmN0aW9uKCkge31cbiAgZnVuY3Rpb24gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUoKSB7fVxuICB2YXIgSXRlcmF0b3JQcm90b3R5cGUgPSB7fTtcbiAgZGVmaW5lKEl0ZXJhdG9yUHJvdG90eXBlLCBpdGVyYXRvclN5bWJvbCwgZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9KTtcbiAgdmFyIGdldFByb3RvID0gT2JqZWN0LmdldFByb3RvdHlwZU9mLFxuICAgIE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlID0gZ2V0UHJvdG8gJiYgZ2V0UHJvdG8oZ2V0UHJvdG8odmFsdWVzKFtdKSkpO1xuICBOYXRpdmVJdGVyYXRvclByb3RvdHlwZSAmJiBOYXRpdmVJdGVyYXRvclByb3RvdHlwZSAhPT0gT3AgJiYgaGFzT3duLmNhbGwoTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUsIGl0ZXJhdG9yU3ltYm9sKSAmJiAoSXRlcmF0b3JQcm90b3R5cGUgPSBOYXRpdmVJdGVyYXRvclByb3RvdHlwZSk7XG4gIHZhciBHcCA9IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlLnByb3RvdHlwZSA9IEdlbmVyYXRvci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEl0ZXJhdG9yUHJvdG90eXBlKTtcbiAgZnVuY3Rpb24gZGVmaW5lSXRlcmF0b3JNZXRob2RzKHByb3RvdHlwZSkge1xuICAgIFtcIm5leHRcIiwgXCJ0aHJvd1wiLCBcInJldHVyblwiXS5mb3JFYWNoKGZ1bmN0aW9uIChtZXRob2QpIHtcbiAgICAgIGRlZmluZShwcm90b3R5cGUsIG1ldGhvZCwgZnVuY3Rpb24gKGFyZykge1xuICAgICAgICByZXR1cm4gdGhpcy5faW52b2tlKG1ldGhvZCwgYXJnKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG4gIGZ1bmN0aW9uIEFzeW5jSXRlcmF0b3IoZ2VuZXJhdG9yLCBQcm9taXNlSW1wbCkge1xuICAgIGZ1bmN0aW9uIGludm9rZShtZXRob2QsIGFyZywgcmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICB2YXIgcmVjb3JkID0gdHJ5Q2F0Y2goZ2VuZXJhdG9yW21ldGhvZF0sIGdlbmVyYXRvciwgYXJnKTtcbiAgICAgIGlmIChcInRocm93XCIgIT09IHJlY29yZC50eXBlKSB7XG4gICAgICAgIHZhciByZXN1bHQgPSByZWNvcmQuYXJnLFxuICAgICAgICAgIHZhbHVlID0gcmVzdWx0LnZhbHVlO1xuICAgICAgICByZXR1cm4gdmFsdWUgJiYgXCJvYmplY3RcIiA9PSB0eXBlb2YgdmFsdWUgJiYgaGFzT3duLmNhbGwodmFsdWUsIFwiX19hd2FpdFwiKSA/IFByb21pc2VJbXBsLnJlc29sdmUodmFsdWUuX19hd2FpdCkudGhlbihmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICBpbnZva2UoXCJuZXh0XCIsIHZhbHVlLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgaW52b2tlKFwidGhyb3dcIiwgZXJyLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICB9KSA6IFByb21pc2VJbXBsLnJlc29sdmUodmFsdWUpLnRoZW4oZnVuY3Rpb24gKHVud3JhcHBlZCkge1xuICAgICAgICAgIHJlc3VsdC52YWx1ZSA9IHVud3JhcHBlZCwgcmVzb2x2ZShyZXN1bHQpO1xuICAgICAgICB9LCBmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgICByZXR1cm4gaW52b2tlKFwidGhyb3dcIiwgZXJyb3IsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgcmVqZWN0KHJlY29yZC5hcmcpO1xuICAgIH1cbiAgICB2YXIgcHJldmlvdXNQcm9taXNlO1xuICAgIGRlZmluZVByb3BlcnR5KHRoaXMsIFwiX2ludm9rZVwiLCB7XG4gICAgICB2YWx1ZTogZnVuY3Rpb24gKG1ldGhvZCwgYXJnKSB7XG4gICAgICAgIGZ1bmN0aW9uIGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnKCkge1xuICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZUltcGwoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgaW52b2tlKG1ldGhvZCwgYXJnLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBwcmV2aW91c1Byb21pc2UgPSBwcmV2aW91c1Byb21pc2UgPyBwcmV2aW91c1Byb21pc2UudGhlbihjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZywgY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmcpIDogY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmcoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuICBmdW5jdGlvbiBtYWtlSW52b2tlTWV0aG9kKGlubmVyRm4sIHNlbGYsIGNvbnRleHQpIHtcbiAgICB2YXIgc3RhdGUgPSBcInN1c3BlbmRlZFN0YXJ0XCI7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChtZXRob2QsIGFyZykge1xuICAgICAgaWYgKFwiZXhlY3V0aW5nXCIgPT09IHN0YXRlKSB0aHJvdyBuZXcgRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBydW5uaW5nXCIpO1xuICAgICAgaWYgKFwiY29tcGxldGVkXCIgPT09IHN0YXRlKSB7XG4gICAgICAgIGlmIChcInRocm93XCIgPT09IG1ldGhvZCkgdGhyb3cgYXJnO1xuICAgICAgICByZXR1cm4gZG9uZVJlc3VsdCgpO1xuICAgICAgfVxuICAgICAgZm9yIChjb250ZXh0Lm1ldGhvZCA9IG1ldGhvZCwgY29udGV4dC5hcmcgPSBhcmc7Oykge1xuICAgICAgICB2YXIgZGVsZWdhdGUgPSBjb250ZXh0LmRlbGVnYXRlO1xuICAgICAgICBpZiAoZGVsZWdhdGUpIHtcbiAgICAgICAgICB2YXIgZGVsZWdhdGVSZXN1bHQgPSBtYXliZUludm9rZURlbGVnYXRlKGRlbGVnYXRlLCBjb250ZXh0KTtcbiAgICAgICAgICBpZiAoZGVsZWdhdGVSZXN1bHQpIHtcbiAgICAgICAgICAgIGlmIChkZWxlZ2F0ZVJlc3VsdCA9PT0gQ29udGludWVTZW50aW5lbCkgY29udGludWU7XG4gICAgICAgICAgICByZXR1cm4gZGVsZWdhdGVSZXN1bHQ7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChcIm5leHRcIiA9PT0gY29udGV4dC5tZXRob2QpIGNvbnRleHQuc2VudCA9IGNvbnRleHQuX3NlbnQgPSBjb250ZXh0LmFyZztlbHNlIGlmIChcInRocm93XCIgPT09IGNvbnRleHQubWV0aG9kKSB7XG4gICAgICAgICAgaWYgKFwic3VzcGVuZGVkU3RhcnRcIiA9PT0gc3RhdGUpIHRocm93IHN0YXRlID0gXCJjb21wbGV0ZWRcIiwgY29udGV4dC5hcmc7XG4gICAgICAgICAgY29udGV4dC5kaXNwYXRjaEV4Y2VwdGlvbihjb250ZXh0LmFyZyk7XG4gICAgICAgIH0gZWxzZSBcInJldHVyblwiID09PSBjb250ZXh0Lm1ldGhvZCAmJiBjb250ZXh0LmFicnVwdChcInJldHVyblwiLCBjb250ZXh0LmFyZyk7XG4gICAgICAgIHN0YXRlID0gXCJleGVjdXRpbmdcIjtcbiAgICAgICAgdmFyIHJlY29yZCA9IHRyeUNhdGNoKGlubmVyRm4sIHNlbGYsIGNvbnRleHQpO1xuICAgICAgICBpZiAoXCJub3JtYWxcIiA9PT0gcmVjb3JkLnR5cGUpIHtcbiAgICAgICAgICBpZiAoc3RhdGUgPSBjb250ZXh0LmRvbmUgPyBcImNvbXBsZXRlZFwiIDogXCJzdXNwZW5kZWRZaWVsZFwiLCByZWNvcmQuYXJnID09PSBDb250aW51ZVNlbnRpbmVsKSBjb250aW51ZTtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdmFsdWU6IHJlY29yZC5hcmcsXG4gICAgICAgICAgICBkb25lOiBjb250ZXh0LmRvbmVcbiAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIFwidGhyb3dcIiA9PT0gcmVjb3JkLnR5cGUgJiYgKHN0YXRlID0gXCJjb21wbGV0ZWRcIiwgY29udGV4dC5tZXRob2QgPSBcInRocm93XCIsIGNvbnRleHQuYXJnID0gcmVjb3JkLmFyZyk7XG4gICAgICB9XG4gICAgfTtcbiAgfVxuICBmdW5jdGlvbiBtYXliZUludm9rZURlbGVnYXRlKGRlbGVnYXRlLCBjb250ZXh0KSB7XG4gICAgdmFyIG1ldGhvZE5hbWUgPSBjb250ZXh0Lm1ldGhvZCxcbiAgICAgIG1ldGhvZCA9IGRlbGVnYXRlLml0ZXJhdG9yW21ldGhvZE5hbWVdO1xuICAgIGlmICh1bmRlZmluZWQgPT09IG1ldGhvZCkgcmV0dXJuIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsLCBcInRocm93XCIgPT09IG1ldGhvZE5hbWUgJiYgZGVsZWdhdGUuaXRlcmF0b3IucmV0dXJuICYmIChjb250ZXh0Lm1ldGhvZCA9IFwicmV0dXJuXCIsIGNvbnRleHQuYXJnID0gdW5kZWZpbmVkLCBtYXliZUludm9rZURlbGVnYXRlKGRlbGVnYXRlLCBjb250ZXh0KSwgXCJ0aHJvd1wiID09PSBjb250ZXh0Lm1ldGhvZCkgfHwgXCJyZXR1cm5cIiAhPT0gbWV0aG9kTmFtZSAmJiAoY29udGV4dC5tZXRob2QgPSBcInRocm93XCIsIGNvbnRleHQuYXJnID0gbmV3IFR5cGVFcnJvcihcIlRoZSBpdGVyYXRvciBkb2VzIG5vdCBwcm92aWRlIGEgJ1wiICsgbWV0aG9kTmFtZSArIFwiJyBtZXRob2RcIikpLCBDb250aW51ZVNlbnRpbmVsO1xuICAgIHZhciByZWNvcmQgPSB0cnlDYXRjaChtZXRob2QsIGRlbGVnYXRlLml0ZXJhdG9yLCBjb250ZXh0LmFyZyk7XG4gICAgaWYgKFwidGhyb3dcIiA9PT0gcmVjb3JkLnR5cGUpIHJldHVybiBjb250ZXh0Lm1ldGhvZCA9IFwidGhyb3dcIiwgY29udGV4dC5hcmcgPSByZWNvcmQuYXJnLCBjb250ZXh0LmRlbGVnYXRlID0gbnVsbCwgQ29udGludWVTZW50aW5lbDtcbiAgICB2YXIgaW5mbyA9IHJlY29yZC5hcmc7XG4gICAgcmV0dXJuIGluZm8gPyBpbmZvLmRvbmUgPyAoY29udGV4dFtkZWxlZ2F0ZS5yZXN1bHROYW1lXSA9IGluZm8udmFsdWUsIGNvbnRleHQubmV4dCA9IGRlbGVnYXRlLm5leHRMb2MsIFwicmV0dXJuXCIgIT09IGNvbnRleHQubWV0aG9kICYmIChjb250ZXh0Lm1ldGhvZCA9IFwibmV4dFwiLCBjb250ZXh0LmFyZyA9IHVuZGVmaW5lZCksIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsLCBDb250aW51ZVNlbnRpbmVsKSA6IGluZm8gOiAoY29udGV4dC5tZXRob2QgPSBcInRocm93XCIsIGNvbnRleHQuYXJnID0gbmV3IFR5cGVFcnJvcihcIml0ZXJhdG9yIHJlc3VsdCBpcyBub3QgYW4gb2JqZWN0XCIpLCBjb250ZXh0LmRlbGVnYXRlID0gbnVsbCwgQ29udGludWVTZW50aW5lbCk7XG4gIH1cbiAgZnVuY3Rpb24gcHVzaFRyeUVudHJ5KGxvY3MpIHtcbiAgICB2YXIgZW50cnkgPSB7XG4gICAgICB0cnlMb2M6IGxvY3NbMF1cbiAgICB9O1xuICAgIDEgaW4gbG9jcyAmJiAoZW50cnkuY2F0Y2hMb2MgPSBsb2NzWzFdKSwgMiBpbiBsb2NzICYmIChlbnRyeS5maW5hbGx5TG9jID0gbG9jc1syXSwgZW50cnkuYWZ0ZXJMb2MgPSBsb2NzWzNdKSwgdGhpcy50cnlFbnRyaWVzLnB1c2goZW50cnkpO1xuICB9XG4gIGZ1bmN0aW9uIHJlc2V0VHJ5RW50cnkoZW50cnkpIHtcbiAgICB2YXIgcmVjb3JkID0gZW50cnkuY29tcGxldGlvbiB8fCB7fTtcbiAgICByZWNvcmQudHlwZSA9IFwibm9ybWFsXCIsIGRlbGV0ZSByZWNvcmQuYXJnLCBlbnRyeS5jb21wbGV0aW9uID0gcmVjb3JkO1xuICB9XG4gIGZ1bmN0aW9uIENvbnRleHQodHJ5TG9jc0xpc3QpIHtcbiAgICB0aGlzLnRyeUVudHJpZXMgPSBbe1xuICAgICAgdHJ5TG9jOiBcInJvb3RcIlxuICAgIH1dLCB0cnlMb2NzTGlzdC5mb3JFYWNoKHB1c2hUcnlFbnRyeSwgdGhpcyksIHRoaXMucmVzZXQoITApO1xuICB9XG4gIGZ1bmN0aW9uIHZhbHVlcyhpdGVyYWJsZSkge1xuICAgIGlmIChpdGVyYWJsZSkge1xuICAgICAgdmFyIGl0ZXJhdG9yTWV0aG9kID0gaXRlcmFibGVbaXRlcmF0b3JTeW1ib2xdO1xuICAgICAgaWYgKGl0ZXJhdG9yTWV0aG9kKSByZXR1cm4gaXRlcmF0b3JNZXRob2QuY2FsbChpdGVyYWJsZSk7XG4gICAgICBpZiAoXCJmdW5jdGlvblwiID09IHR5cGVvZiBpdGVyYWJsZS5uZXh0KSByZXR1cm4gaXRlcmFibGU7XG4gICAgICBpZiAoIWlzTmFOKGl0ZXJhYmxlLmxlbmd0aCkpIHtcbiAgICAgICAgdmFyIGkgPSAtMSxcbiAgICAgICAgICBuZXh0ID0gZnVuY3Rpb24gbmV4dCgpIHtcbiAgICAgICAgICAgIGZvciAoOyArK2kgPCBpdGVyYWJsZS5sZW5ndGg7KSBpZiAoaGFzT3duLmNhbGwoaXRlcmFibGUsIGkpKSByZXR1cm4gbmV4dC52YWx1ZSA9IGl0ZXJhYmxlW2ldLCBuZXh0LmRvbmUgPSAhMSwgbmV4dDtcbiAgICAgICAgICAgIHJldHVybiBuZXh0LnZhbHVlID0gdW5kZWZpbmVkLCBuZXh0LmRvbmUgPSAhMCwgbmV4dDtcbiAgICAgICAgICB9O1xuICAgICAgICByZXR1cm4gbmV4dC5uZXh0ID0gbmV4dDtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgIG5leHQ6IGRvbmVSZXN1bHRcbiAgICB9O1xuICB9XG4gIGZ1bmN0aW9uIGRvbmVSZXN1bHQoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHZhbHVlOiB1bmRlZmluZWQsXG4gICAgICBkb25lOiAhMFxuICAgIH07XG4gIH1cbiAgcmV0dXJuIEdlbmVyYXRvckZ1bmN0aW9uLnByb3RvdHlwZSA9IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlLCBkZWZpbmVQcm9wZXJ0eShHcCwgXCJjb25zdHJ1Y3RvclwiLCB7XG4gICAgdmFsdWU6IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlLFxuICAgIGNvbmZpZ3VyYWJsZTogITBcbiAgfSksIGRlZmluZVByb3BlcnR5KEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlLCBcImNvbnN0cnVjdG9yXCIsIHtcbiAgICB2YWx1ZTogR2VuZXJhdG9yRnVuY3Rpb24sXG4gICAgY29uZmlndXJhYmxlOiAhMFxuICB9KSwgR2VuZXJhdG9yRnVuY3Rpb24uZGlzcGxheU5hbWUgPSBkZWZpbmUoR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUsIHRvU3RyaW5nVGFnU3ltYm9sLCBcIkdlbmVyYXRvckZ1bmN0aW9uXCIpLCBleHBvcnRzLmlzR2VuZXJhdG9yRnVuY3Rpb24gPSBmdW5jdGlvbiAoZ2VuRnVuKSB7XG4gICAgdmFyIGN0b3IgPSBcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIGdlbkZ1biAmJiBnZW5GdW4uY29uc3RydWN0b3I7XG4gICAgcmV0dXJuICEhY3RvciAmJiAoY3RvciA9PT0gR2VuZXJhdG9yRnVuY3Rpb24gfHwgXCJHZW5lcmF0b3JGdW5jdGlvblwiID09PSAoY3Rvci5kaXNwbGF5TmFtZSB8fCBjdG9yLm5hbWUpKTtcbiAgfSwgZXhwb3J0cy5tYXJrID0gZnVuY3Rpb24gKGdlbkZ1bikge1xuICAgIHJldHVybiBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2YoZ2VuRnVuLCBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSkgOiAoZ2VuRnVuLl9fcHJvdG9fXyA9IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlLCBkZWZpbmUoZ2VuRnVuLCB0b1N0cmluZ1RhZ1N5bWJvbCwgXCJHZW5lcmF0b3JGdW5jdGlvblwiKSksIGdlbkZ1bi5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEdwKSwgZ2VuRnVuO1xuICB9LCBleHBvcnRzLmF3cmFwID0gZnVuY3Rpb24gKGFyZykge1xuICAgIHJldHVybiB7XG4gICAgICBfX2F3YWl0OiBhcmdcbiAgICB9O1xuICB9LCBkZWZpbmVJdGVyYXRvck1ldGhvZHMoQXN5bmNJdGVyYXRvci5wcm90b3R5cGUpLCBkZWZpbmUoQXN5bmNJdGVyYXRvci5wcm90b3R5cGUsIGFzeW5jSXRlcmF0b3JTeW1ib2wsIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfSksIGV4cG9ydHMuQXN5bmNJdGVyYXRvciA9IEFzeW5jSXRlcmF0b3IsIGV4cG9ydHMuYXN5bmMgPSBmdW5jdGlvbiAoaW5uZXJGbiwgb3V0ZXJGbiwgc2VsZiwgdHJ5TG9jc0xpc3QsIFByb21pc2VJbXBsKSB7XG4gICAgdm9pZCAwID09PSBQcm9taXNlSW1wbCAmJiAoUHJvbWlzZUltcGwgPSBQcm9taXNlKTtcbiAgICB2YXIgaXRlciA9IG5ldyBBc3luY0l0ZXJhdG9yKHdyYXAoaW5uZXJGbiwgb3V0ZXJGbiwgc2VsZiwgdHJ5TG9jc0xpc3QpLCBQcm9taXNlSW1wbCk7XG4gICAgcmV0dXJuIGV4cG9ydHMuaXNHZW5lcmF0b3JGdW5jdGlvbihvdXRlckZuKSA/IGl0ZXIgOiBpdGVyLm5leHQoKS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgIHJldHVybiByZXN1bHQuZG9uZSA/IHJlc3VsdC52YWx1ZSA6IGl0ZXIubmV4dCgpO1xuICAgIH0pO1xuICB9LCBkZWZpbmVJdGVyYXRvck1ldGhvZHMoR3ApLCBkZWZpbmUoR3AsIHRvU3RyaW5nVGFnU3ltYm9sLCBcIkdlbmVyYXRvclwiKSwgZGVmaW5lKEdwLCBpdGVyYXRvclN5bWJvbCwgZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9KSwgZGVmaW5lKEdwLCBcInRvU3RyaW5nXCIsIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gXCJbb2JqZWN0IEdlbmVyYXRvcl1cIjtcbiAgfSksIGV4cG9ydHMua2V5cyA9IGZ1bmN0aW9uICh2YWwpIHtcbiAgICB2YXIgb2JqZWN0ID0gT2JqZWN0KHZhbCksXG4gICAgICBrZXlzID0gW107XG4gICAgZm9yICh2YXIga2V5IGluIG9iamVjdCkga2V5cy5wdXNoKGtleSk7XG4gICAgcmV0dXJuIGtleXMucmV2ZXJzZSgpLCBmdW5jdGlvbiBuZXh0KCkge1xuICAgICAgZm9yICg7IGtleXMubGVuZ3RoOykge1xuICAgICAgICB2YXIga2V5ID0ga2V5cy5wb3AoKTtcbiAgICAgICAgaWYgKGtleSBpbiBvYmplY3QpIHJldHVybiBuZXh0LnZhbHVlID0ga2V5LCBuZXh0LmRvbmUgPSAhMSwgbmV4dDtcbiAgICAgIH1cbiAgICAgIHJldHVybiBuZXh0LmRvbmUgPSAhMCwgbmV4dDtcbiAgICB9O1xuICB9LCBleHBvcnRzLnZhbHVlcyA9IHZhbHVlcywgQ29udGV4dC5wcm90b3R5cGUgPSB7XG4gICAgY29uc3RydWN0b3I6IENvbnRleHQsXG4gICAgcmVzZXQ6IGZ1bmN0aW9uIChza2lwVGVtcFJlc2V0KSB7XG4gICAgICBpZiAodGhpcy5wcmV2ID0gMCwgdGhpcy5uZXh0ID0gMCwgdGhpcy5zZW50ID0gdGhpcy5fc2VudCA9IHVuZGVmaW5lZCwgdGhpcy5kb25lID0gITEsIHRoaXMuZGVsZWdhdGUgPSBudWxsLCB0aGlzLm1ldGhvZCA9IFwibmV4dFwiLCB0aGlzLmFyZyA9IHVuZGVmaW5lZCwgdGhpcy50cnlFbnRyaWVzLmZvckVhY2gocmVzZXRUcnlFbnRyeSksICFza2lwVGVtcFJlc2V0KSBmb3IgKHZhciBuYW1lIGluIHRoaXMpIFwidFwiID09PSBuYW1lLmNoYXJBdCgwKSAmJiBoYXNPd24uY2FsbCh0aGlzLCBuYW1lKSAmJiAhaXNOYU4oK25hbWUuc2xpY2UoMSkpICYmICh0aGlzW25hbWVdID0gdW5kZWZpbmVkKTtcbiAgICB9LFxuICAgIHN0b3A6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoaXMuZG9uZSA9ICEwO1xuICAgICAgdmFyIHJvb3RSZWNvcmQgPSB0aGlzLnRyeUVudHJpZXNbMF0uY29tcGxldGlvbjtcbiAgICAgIGlmIChcInRocm93XCIgPT09IHJvb3RSZWNvcmQudHlwZSkgdGhyb3cgcm9vdFJlY29yZC5hcmc7XG4gICAgICByZXR1cm4gdGhpcy5ydmFsO1xuICAgIH0sXG4gICAgZGlzcGF0Y2hFeGNlcHRpb246IGZ1bmN0aW9uIChleGNlcHRpb24pIHtcbiAgICAgIGlmICh0aGlzLmRvbmUpIHRocm93IGV4Y2VwdGlvbjtcbiAgICAgIHZhciBjb250ZXh0ID0gdGhpcztcbiAgICAgIGZ1bmN0aW9uIGhhbmRsZShsb2MsIGNhdWdodCkge1xuICAgICAgICByZXR1cm4gcmVjb3JkLnR5cGUgPSBcInRocm93XCIsIHJlY29yZC5hcmcgPSBleGNlcHRpb24sIGNvbnRleHQubmV4dCA9IGxvYywgY2F1Z2h0ICYmIChjb250ZXh0Lm1ldGhvZCA9IFwibmV4dFwiLCBjb250ZXh0LmFyZyA9IHVuZGVmaW5lZCksICEhY2F1Z2h0O1xuICAgICAgfVxuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV0sXG4gICAgICAgICAgcmVjb3JkID0gZW50cnkuY29tcGxldGlvbjtcbiAgICAgICAgaWYgKFwicm9vdFwiID09PSBlbnRyeS50cnlMb2MpIHJldHVybiBoYW5kbGUoXCJlbmRcIik7XG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPD0gdGhpcy5wcmV2KSB7XG4gICAgICAgICAgdmFyIGhhc0NhdGNoID0gaGFzT3duLmNhbGwoZW50cnksIFwiY2F0Y2hMb2NcIiksXG4gICAgICAgICAgICBoYXNGaW5hbGx5ID0gaGFzT3duLmNhbGwoZW50cnksIFwiZmluYWxseUxvY1wiKTtcbiAgICAgICAgICBpZiAoaGFzQ2F0Y2ggJiYgaGFzRmluYWxseSkge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJldiA8IGVudHJ5LmNhdGNoTG9jKSByZXR1cm4gaGFuZGxlKGVudHJ5LmNhdGNoTG9jLCAhMCk7XG4gICAgICAgICAgICBpZiAodGhpcy5wcmV2IDwgZW50cnkuZmluYWxseUxvYykgcmV0dXJuIGhhbmRsZShlbnRyeS5maW5hbGx5TG9jKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKGhhc0NhdGNoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcmV2IDwgZW50cnkuY2F0Y2hMb2MpIHJldHVybiBoYW5kbGUoZW50cnkuY2F0Y2hMb2MsICEwKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKCFoYXNGaW5hbGx5KSB0aHJvdyBuZXcgRXJyb3IoXCJ0cnkgc3RhdGVtZW50IHdpdGhvdXQgY2F0Y2ggb3IgZmluYWxseVwiKTtcbiAgICAgICAgICAgIGlmICh0aGlzLnByZXYgPCBlbnRyeS5maW5hbGx5TG9jKSByZXR1cm4gaGFuZGxlKGVudHJ5LmZpbmFsbHlMb2MpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgYWJydXB0OiBmdW5jdGlvbiAodHlwZSwgYXJnKSB7XG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA8PSB0aGlzLnByZXYgJiYgaGFzT3duLmNhbGwoZW50cnksIFwiZmluYWxseUxvY1wiKSAmJiB0aGlzLnByZXYgPCBlbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgICAgdmFyIGZpbmFsbHlFbnRyeSA9IGVudHJ5O1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBmaW5hbGx5RW50cnkgJiYgKFwiYnJlYWtcIiA9PT0gdHlwZSB8fCBcImNvbnRpbnVlXCIgPT09IHR5cGUpICYmIGZpbmFsbHlFbnRyeS50cnlMb2MgPD0gYXJnICYmIGFyZyA8PSBmaW5hbGx5RW50cnkuZmluYWxseUxvYyAmJiAoZmluYWxseUVudHJ5ID0gbnVsbCk7XG4gICAgICB2YXIgcmVjb3JkID0gZmluYWxseUVudHJ5ID8gZmluYWxseUVudHJ5LmNvbXBsZXRpb24gOiB7fTtcbiAgICAgIHJldHVybiByZWNvcmQudHlwZSA9IHR5cGUsIHJlY29yZC5hcmcgPSBhcmcsIGZpbmFsbHlFbnRyeSA/ICh0aGlzLm1ldGhvZCA9IFwibmV4dFwiLCB0aGlzLm5leHQgPSBmaW5hbGx5RW50cnkuZmluYWxseUxvYywgQ29udGludWVTZW50aW5lbCkgOiB0aGlzLmNvbXBsZXRlKHJlY29yZCk7XG4gICAgfSxcbiAgICBjb21wbGV0ZTogZnVuY3Rpb24gKHJlY29yZCwgYWZ0ZXJMb2MpIHtcbiAgICAgIGlmIChcInRocm93XCIgPT09IHJlY29yZC50eXBlKSB0aHJvdyByZWNvcmQuYXJnO1xuICAgICAgcmV0dXJuIFwiYnJlYWtcIiA9PT0gcmVjb3JkLnR5cGUgfHwgXCJjb250aW51ZVwiID09PSByZWNvcmQudHlwZSA/IHRoaXMubmV4dCA9IHJlY29yZC5hcmcgOiBcInJldHVyblwiID09PSByZWNvcmQudHlwZSA/ICh0aGlzLnJ2YWwgPSB0aGlzLmFyZyA9IHJlY29yZC5hcmcsIHRoaXMubWV0aG9kID0gXCJyZXR1cm5cIiwgdGhpcy5uZXh0ID0gXCJlbmRcIikgOiBcIm5vcm1hbFwiID09PSByZWNvcmQudHlwZSAmJiBhZnRlckxvYyAmJiAodGhpcy5uZXh0ID0gYWZ0ZXJMb2MpLCBDb250aW51ZVNlbnRpbmVsO1xuICAgIH0sXG4gICAgZmluaXNoOiBmdW5jdGlvbiAoZmluYWxseUxvYykge1xuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIGlmIChlbnRyeS5maW5hbGx5TG9jID09PSBmaW5hbGx5TG9jKSByZXR1cm4gdGhpcy5jb21wbGV0ZShlbnRyeS5jb21wbGV0aW9uLCBlbnRyeS5hZnRlckxvYyksIHJlc2V0VHJ5RW50cnkoZW50cnkpLCBDb250aW51ZVNlbnRpbmVsO1xuICAgICAgfVxuICAgIH0sXG4gICAgY2F0Y2g6IGZ1bmN0aW9uICh0cnlMb2MpIHtcbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuICAgICAgICBpZiAoZW50cnkudHJ5TG9jID09PSB0cnlMb2MpIHtcbiAgICAgICAgICB2YXIgcmVjb3JkID0gZW50cnkuY29tcGxldGlvbjtcbiAgICAgICAgICBpZiAoXCJ0aHJvd1wiID09PSByZWNvcmQudHlwZSkge1xuICAgICAgICAgICAgdmFyIHRocm93biA9IHJlY29yZC5hcmc7XG4gICAgICAgICAgICByZXNldFRyeUVudHJ5KGVudHJ5KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHRocm93bjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiaWxsZWdhbCBjYXRjaCBhdHRlbXB0XCIpO1xuICAgIH0sXG4gICAgZGVsZWdhdGVZaWVsZDogZnVuY3Rpb24gKGl0ZXJhYmxlLCByZXN1bHROYW1lLCBuZXh0TG9jKSB7XG4gICAgICByZXR1cm4gdGhpcy5kZWxlZ2F0ZSA9IHtcbiAgICAgICAgaXRlcmF0b3I6IHZhbHVlcyhpdGVyYWJsZSksXG4gICAgICAgIHJlc3VsdE5hbWU6IHJlc3VsdE5hbWUsXG4gICAgICAgIG5leHRMb2M6IG5leHRMb2NcbiAgICAgIH0sIFwibmV4dFwiID09PSB0aGlzLm1ldGhvZCAmJiAodGhpcy5hcmcgPSB1bmRlZmluZWQpLCBDb250aW51ZVNlbnRpbmVsO1xuICAgIH1cbiAgfSwgZXhwb3J0cztcbn1cbmZ1bmN0aW9uIGFzeW5jR2VuZXJhdG9yU3RlcChnZW4sIHJlc29sdmUsIHJlamVjdCwgX25leHQsIF90aHJvdywga2V5LCBhcmcpIHtcbiAgdHJ5IHtcbiAgICB2YXIgaW5mbyA9IGdlbltrZXldKGFyZyk7XG4gICAgdmFyIHZhbHVlID0gaW5mby52YWx1ZTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZWplY3QoZXJyb3IpO1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoaW5mby5kb25lKSB7XG4gICAgcmVzb2x2ZSh2YWx1ZSk7XG4gIH0gZWxzZSB7XG4gICAgUHJvbWlzZS5yZXNvbHZlKHZhbHVlKS50aGVuKF9uZXh0LCBfdGhyb3cpO1xuICB9XG59XG5mdW5jdGlvbiBfYXN5bmNUb0dlbmVyYXRvcihmbikge1xuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIHZhciBzZWxmID0gdGhpcyxcbiAgICAgIGFyZ3MgPSBhcmd1bWVudHM7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIHZhciBnZW4gPSBmbi5hcHBseShzZWxmLCBhcmdzKTtcbiAgICAgIGZ1bmN0aW9uIF9uZXh0KHZhbHVlKSB7XG4gICAgICAgIGFzeW5jR2VuZXJhdG9yU3RlcChnZW4sIHJlc29sdmUsIHJlamVjdCwgX25leHQsIF90aHJvdywgXCJuZXh0XCIsIHZhbHVlKTtcbiAgICAgIH1cbiAgICAgIGZ1bmN0aW9uIF90aHJvdyhlcnIpIHtcbiAgICAgICAgYXN5bmNHZW5lcmF0b3JTdGVwKGdlbiwgcmVzb2x2ZSwgcmVqZWN0LCBfbmV4dCwgX3Rocm93LCBcInRocm93XCIsIGVycik7XG4gICAgICB9XG4gICAgICBfbmV4dCh1bmRlZmluZWQpO1xuICAgIH0pO1xuICB9O1xufVxuXG52YXIgREVGQVVMVF9USU1FT1VUID0gNTAwMDtcbnZhciBVbmF2YWlsYWJsZUVycm9yID0gLyojX19QVVJFX18qL25ldyBFcnJvcignRkRDMyBEZXNrdG9wQWdlbnQgbm90IGF2YWlsYWJsZSBhdCBgd2luZG93LmZkYzNgLicpO1xudmFyIFRpbWVvdXRFcnJvciA9IC8qI19fUFVSRV9fKi9uZXcgRXJyb3IoJ1RpbWVkIG91dCB3YWl0aW5nIGZvciBgZmRjM1JlYWR5YCBldmVudC4nKTtcbnZhciBVbmV4cGVjdGVkRXJyb3IgPSAvKiNfX1BVUkVfXyovbmV3IEVycm9yKCdgZmRjM1JlYWR5YCBldmVudCBmaXJlZCwgYnV0IGB3aW5kb3cuZmRjM2Agbm90IHNldCB0byBEZXNrdG9wQWdlbnQuJyk7XG5mdW5jdGlvbiByZWplY3RJZk5vR2xvYmFsKGYpIHtcbiAgcmV0dXJuIHdpbmRvdy5mZGMzID8gZigpIDogUHJvbWlzZS5yZWplY3QoVW5hdmFpbGFibGVFcnJvcik7XG59XG4vKipcclxuICogVXRpbGl0eSBmdW5jdGlvbiB0aGF0IHJldHVybnMgYSBwcm9taXNlIHRoYXQgd2lsbCByZXNvbHZlIGltbWVhZGlhdGVseVxyXG4gKiBpZiB0aGUgZGVza3RvcCBhZ2VudCBBUEkgaXMgZm91bmQgYXQgYHdpbmRvdy5mZGMzYC4gSWYgdGhlIEFQSSBpcyBmb3VuZCxcclxuICogdGhlIHByb21pc2Ugd2lsbCByZXNvbHZlIHdoZW4gdGhlIGBmZGMzUmVhZHlgIGV2ZW50IGlzIHJlY2VpdmVkIG9yIGlmIGl0XHJcbiAqIGlzIGZvdW5kIGF0IHRoZSBlbmQgb2YgdGhlIHNwZWNpZmllZCB0aW1lb3V0LiBJZiB0aGUgQVBJIGlzIG5vdCBmb3VuZCwgaXRcclxuICogd2lsbCByZWplY3Qgd2l0aCBhbiBlcnJvci5cclxuICpcclxuICogYGBgamF2YXNjcmlwdFxyXG4gKiBhd2FpdCBmZGMzUmVhZHkoKTtcclxuICogY29uc3QgaW50ZW50TGlzdGVuZXIgPSBhd2FpdCBhZGRJbnRlbnRMaXN0ZW5lcihcIlZpZXdDaGFydFwiLCBpbnRlbnRIYW5kbGVyRm4pO1xyXG4gKiBgYGBcclxuICpcclxuICogQHBhcmFtIHdhaXRGb3JNcyBUaGUgbnVtYmVyIG9mIG1pbGxpc2Vjb25kcyB0byB3YWl0IGZvciB0aGUgRkRDMyBBUEkgdG8gYmVcclxuICogcmVhZHkuIERlZmF1bHRzIHRvIDUgc2Vjb25kcy5cclxuICovXG52YXIgZmRjM1JlYWR5ID0gLyojX19QVVJFX18qL2Z1bmN0aW9uICgpIHtcbiAgdmFyIF9yZWYgPSAvKiNfX1BVUkVfXyovX2FzeW5jVG9HZW5lcmF0b3IoIC8qI19fUFVSRV9fKi9fcmVnZW5lcmF0b3JSdW50aW1lKCkubWFyayhmdW5jdGlvbiBfY2FsbGVlKHdhaXRGb3JNcykge1xuICAgIHJldHVybiBfcmVnZW5lcmF0b3JSdW50aW1lKCkud3JhcChmdW5jdGlvbiBfY2FsbGVlJChfY29udGV4dCkge1xuICAgICAgd2hpbGUgKDEpIHN3aXRjaCAoX2NvbnRleHQucHJldiA9IF9jb250ZXh0Lm5leHQpIHtcbiAgICAgICAgY2FzZSAwOlxuICAgICAgICAgIGlmICh3YWl0Rm9yTXMgPT09IHZvaWQgMCkge1xuICAgICAgICAgICAgd2FpdEZvck1zID0gREVGQVVMVF9USU1FT1VUO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gX2NvbnRleHQuYWJydXB0KFwicmV0dXJuXCIsIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgIC8vIGlmIHRoZSBnbG9iYWwgaXMgYWxyZWFkeSBhdmFpbGFibGUgcmVzb2x2ZSBpbW1lZGlhdGVseVxuICAgICAgICAgICAgaWYgKHdpbmRvdy5mZGMzKSB7XG4gICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIC8vIGlmIGl0cyBub3QgYXZhaWxhYmxlIHNldHVwIGEgdGltZW91dCB0byByZXR1cm4gYSByZWplY3RlZCBwcm9taXNlXG4gICAgICAgICAgICAgIHZhciB0aW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHdpbmRvdy5mZGMzID8gcmVzb2x2ZSgpIDogcmVqZWN0KFRpbWVvdXRFcnJvcik7XG4gICAgICAgICAgICAgIH0sIHdhaXRGb3JNcyk7XG4gICAgICAgICAgICAgIC8vIGxpc3RlbiBmb3IgdGhlIGZkYzNSZWFkeSBldmVudFxuICAgICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignZmRjM1JlYWR5JywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbiAgICAgICAgICAgICAgICB3aW5kb3cuZmRjMyA/IHJlc29sdmUoKSA6IHJlamVjdChVbmV4cGVjdGVkRXJyb3IpO1xuICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgb25jZTogdHJ1ZVxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KSk7XG4gICAgICAgIGNhc2UgMjpcbiAgICAgICAgY2FzZSBcImVuZFwiOlxuICAgICAgICAgIHJldHVybiBfY29udGV4dC5zdG9wKCk7XG4gICAgICB9XG4gICAgfSwgX2NhbGxlZSk7XG4gIH0pKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIGZkYzNSZWFkeShfeCkge1xuICAgIHJldHVybiBfcmVmLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gIH07XG59KCk7XG5mdW5jdGlvbiBpc1N0cmluZyhhcHApIHtcbiAgcmV0dXJuICEhYXBwICYmIHR5cGVvZiBhcHAgPT09ICdzdHJpbmcnO1xufVxuZnVuY3Rpb24gb3BlbihhcHAsIGNvbnRleHQpIHtcbiAgaWYgKGlzU3RyaW5nKGFwcCkpIHtcbiAgICByZXR1cm4gcmVqZWN0SWZOb0dsb2JhbChmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gd2luZG93LmZkYzMub3BlbihhcHAsIGNvbnRleHQpO1xuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiByZWplY3RJZk5vR2xvYmFsKGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiB3aW5kb3cuZmRjMy5vcGVuKGFwcCwgY29udGV4dCk7XG4gICAgfSk7XG4gIH1cbn1cbmZ1bmN0aW9uIGZpbmRJbnRlbnQoaW50ZW50LCBjb250ZXh0LCByZXN1bHRUeXBlKSB7XG4gIHJldHVybiByZWplY3RJZk5vR2xvYmFsKGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gd2luZG93LmZkYzMuZmluZEludGVudChpbnRlbnQsIGNvbnRleHQsIHJlc3VsdFR5cGUpO1xuICB9KTtcbn1cbmZ1bmN0aW9uIGZpbmRJbnRlbnRzQnlDb250ZXh0KGNvbnRleHQsIHJlc3VsdFR5cGUpIHtcbiAgcmV0dXJuIHJlamVjdElmTm9HbG9iYWwoZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB3aW5kb3cuZmRjMy5maW5kSW50ZW50c0J5Q29udGV4dChjb250ZXh0LCByZXN1bHRUeXBlKTtcbiAgfSk7XG59XG5mdW5jdGlvbiBicm9hZGNhc3QoY29udGV4dCkge1xuICByZXR1cm4gcmVqZWN0SWZOb0dsb2JhbChmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHdpbmRvdy5mZGMzLmJyb2FkY2FzdChjb250ZXh0KTtcbiAgfSk7XG59XG5mdW5jdGlvbiByYWlzZUludGVudChpbnRlbnQsIGNvbnRleHQsIGFwcCkge1xuICBpZiAoaXNTdHJpbmcoYXBwKSkge1xuICAgIHJldHVybiByZWplY3RJZk5vR2xvYmFsKGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiB3aW5kb3cuZmRjMy5yYWlzZUludGVudChpbnRlbnQsIGNvbnRleHQsIGFwcCk7XG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHJlamVjdElmTm9HbG9iYWwoZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHdpbmRvdy5mZGMzLnJhaXNlSW50ZW50KGludGVudCwgY29udGV4dCwgYXBwKTtcbiAgICB9KTtcbiAgfVxufVxuZnVuY3Rpb24gcmFpc2VJbnRlbnRGb3JDb250ZXh0KGNvbnRleHQsIGFwcCkge1xuICBpZiAoaXNTdHJpbmcoYXBwKSkge1xuICAgIHJldHVybiByZWplY3RJZk5vR2xvYmFsKGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiB3aW5kb3cuZmRjMy5yYWlzZUludGVudEZvckNvbnRleHQoY29udGV4dCwgYXBwKTtcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gcmVqZWN0SWZOb0dsb2JhbChmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gd2luZG93LmZkYzMucmFpc2VJbnRlbnRGb3JDb250ZXh0KGNvbnRleHQsIGFwcCk7XG4gICAgfSk7XG4gIH1cbn1cbmZ1bmN0aW9uIGFkZEludGVudExpc3RlbmVyKGludGVudCwgaGFuZGxlcikge1xuICByZXR1cm4gcmVqZWN0SWZOb0dsb2JhbChmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHdpbmRvdy5mZGMzLmFkZEludGVudExpc3RlbmVyKGludGVudCwgaGFuZGxlcik7XG4gIH0pO1xufVxuZnVuY3Rpb24gYWRkQ29udGV4dExpc3RlbmVyKGNvbnRleHRUeXBlT3JIYW5kbGVyLCBoYW5kbGVyKSB7XG4gIC8vSGFuZGxlIChkZXByZWNhdGVkKSBmdW5jdGlvbiBzaWduYXR1cmUgdGhhdCBhbGxvd2VkIGNvbnRleHRUeXBlIGFyZ3VtZW50IHRvIGJlIG9taXR0ZWRcbiAgaWYgKHR5cGVvZiBjb250ZXh0VHlwZU9ySGFuZGxlciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiByZWplY3RJZk5vR2xvYmFsKGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiB3aW5kb3cuZmRjMy5hZGRDb250ZXh0TGlzdGVuZXIoY29udGV4dFR5cGVPckhhbmRsZXIsIGhhbmRsZXIpO1xuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiByZWplY3RJZk5vR2xvYmFsKGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiB3aW5kb3cuZmRjMy5hZGRDb250ZXh0TGlzdGVuZXIobnVsbCwgY29udGV4dFR5cGVPckhhbmRsZXIpO1xuICAgIH0pO1xuICB9XG59XG5mdW5jdGlvbiBnZXRVc2VyQ2hhbm5lbHMoKSB7XG4gIHJldHVybiByZWplY3RJZk5vR2xvYmFsKGZ1bmN0aW9uICgpIHtcbiAgICAvL2ZhbGxiYWNrIHRvIGdldFN5c3RlbUNoYW5uZWxzIGZvciBGREMzIDwyLjAgaW1wbGVtZW50YXRpb25zXG4gICAgaWYgKHdpbmRvdy5mZGMzLmdldFVzZXJDaGFubmVscykge1xuICAgICAgcmV0dXJuIHdpbmRvdy5mZGMzLmdldFVzZXJDaGFubmVscygpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gd2luZG93LmZkYzMuZ2V0U3lzdGVtQ2hhbm5lbHMoKTtcbiAgICB9XG4gIH0pO1xufVxuZnVuY3Rpb24gZ2V0U3lzdGVtQ2hhbm5lbHMoKSB7XG4gIC8vZmFsbGZvcndhcmQgdG8gZ2V0VXNlckNoYW5uZWxzIGZvciBGREMzIDIuMCsgaW1wbGVtZW50YXRpb25zXG4gIHJldHVybiBnZXRVc2VyQ2hhbm5lbHMoKTtcbn1cbmZ1bmN0aW9uIGpvaW5Vc2VyQ2hhbm5lbChjaGFubmVsSWQpIHtcbiAgcmV0dXJuIHJlamVjdElmTm9HbG9iYWwoZnVuY3Rpb24gKCkge1xuICAgIC8vZmFsbGJhY2sgdG8gam9pbkNoYW5uZWwgZm9yIEZEQzMgPDIuMCBpbXBsZW1lbnRhdGlvbnNcbiAgICBpZiAod2luZG93LmZkYzMuam9pblVzZXJDaGFubmVsKSB7XG4gICAgICByZXR1cm4gd2luZG93LmZkYzMuam9pblVzZXJDaGFubmVsKGNoYW5uZWxJZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB3aW5kb3cuZmRjMy5qb2luQ2hhbm5lbChjaGFubmVsSWQpO1xuICAgIH1cbiAgfSk7XG59XG5mdW5jdGlvbiBqb2luQ2hhbm5lbChjaGFubmVsSWQpIHtcbiAgLy9mYWxsZm9yd2FyZCB0byBqb2luVXNlckNoYW5uZWwgZm9yIEZEQzMgMi4wKyBpbXBsZW1lbnRhdGlvbnNcbiAgcmV0dXJuIGpvaW5Vc2VyQ2hhbm5lbChjaGFubmVsSWQpO1xufVxuZnVuY3Rpb24gZ2V0T3JDcmVhdGVDaGFubmVsKGNoYW5uZWxJZCkge1xuICByZXR1cm4gcmVqZWN0SWZOb0dsb2JhbChmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHdpbmRvdy5mZGMzLmdldE9yQ3JlYXRlQ2hhbm5lbChjaGFubmVsSWQpO1xuICB9KTtcbn1cbmZ1bmN0aW9uIGdldEN1cnJlbnRDaGFubmVsKCkge1xuICByZXR1cm4gcmVqZWN0SWZOb0dsb2JhbChmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHdpbmRvdy5mZGMzLmdldEN1cnJlbnRDaGFubmVsKCk7XG4gIH0pO1xufVxuZnVuY3Rpb24gbGVhdmVDdXJyZW50Q2hhbm5lbCgpIHtcbiAgcmV0dXJuIHJlamVjdElmTm9HbG9iYWwoZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB3aW5kb3cuZmRjMy5sZWF2ZUN1cnJlbnRDaGFubmVsKCk7XG4gIH0pO1xufVxuZnVuY3Rpb24gY3JlYXRlUHJpdmF0ZUNoYW5uZWwoKSB7XG4gIHJldHVybiByZWplY3RJZk5vR2xvYmFsKGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gd2luZG93LmZkYzMuY3JlYXRlUHJpdmF0ZUNoYW5uZWwoKTtcbiAgfSk7XG59XG5mdW5jdGlvbiBnZXRJbmZvKCkge1xuICByZXR1cm4gcmVqZWN0SWZOb0dsb2JhbChmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHdpbmRvdy5mZGMzLmdldEluZm8oKTtcbiAgfSk7XG59XG5mdW5jdGlvbiBnZXRBcHBNZXRhZGF0YShhcHApIHtcbiAgcmV0dXJuIHJlamVjdElmTm9HbG9iYWwoZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB3aW5kb3cuZmRjMy5nZXRBcHBNZXRhZGF0YShhcHApO1xuICB9KTtcbn1cbmZ1bmN0aW9uIGZpbmRJbnN0YW5jZXMoYXBwKSB7XG4gIHJldHVybiByZWplY3RJZk5vR2xvYmFsKGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gd2luZG93LmZkYzMuZmluZEluc3RhbmNlcyhhcHApO1xuICB9KTtcbn1cbi8qKlxyXG4gKiBDb21wYXJlIG51bWVyaWMgc2VtdmVyIHZlcnNpb24gbnVtYmVyIHN0cmluZ3MgKGluIHRoZSBmb3JtIGAxLjIuM2ApLlxyXG4gKlxyXG4gKiBSZXR1cm5zIGAtMWAgaWYgdGhlIGZpcnN0IGFyZ3VtZW50IGlzIGEgbG93ZXIgdmVyc2lvbiBudW1iZXIgdGhhbiB0aGUgc2Vjb25kLFxyXG4gKiBgMWAgaWYgdGhlIGZpcnN0IGFyZ3VtZW50IGlzIGdyZWF0ZXIgdGhhbiB0aGUgc2Vjb25kLCAwIGlmIHRoZSBhcmd1bWVudHMgYXJlXHJcbiAqIGVxdWFsIGFuZCBgbnVsbGAgaWYgYW4gZXJyb3Igb2NjdXJyZWQgZHVyaW5nIHRoZSBjb21wYXJpc29uLlxyXG4gKlxyXG4gKiBAcGFyYW0gYVxyXG4gKiBAcGFyYW0gYlxyXG4gKi9cbnZhciBjb21wYXJlVmVyc2lvbk51bWJlcnMgPSBmdW5jdGlvbiBjb21wYXJlVmVyc2lvbk51bWJlcnMoYSwgYikge1xuICB0cnkge1xuICAgIHZhciBhVmVyQXJyID0gYS5zcGxpdCgnLicpLm1hcChOdW1iZXIpO1xuICAgIHZhciBiVmVyQXJyID0gYi5zcGxpdCgnLicpLm1hcChOdW1iZXIpO1xuICAgIGZvciAodmFyIGluZGV4ID0gMDsgaW5kZXggPCBNYXRoLm1heChhVmVyQXJyLmxlbmd0aCwgYlZlckFyci5sZW5ndGgpOyBpbmRleCsrKSB7XG4gICAgICAvKiBJZiBvbmUgdmVyc2lvbiBudW1iZXIgaGFzIG1vcmUgZGlnaXRzIGFuZCB0aGUgb3RoZXIgZG9lcyBub3QsIGFuZCB0aGV5IGFyZSBvdGhlcndpc2UgZXF1YWwsXHJcbiAgICAgICAgIGFzc3VtZSB0aGUgbG9uZ2VyIGlzIGdyZWF0ZXIuIEUuZy4gMS4xLjEgPiAxLjEgKi9cbiAgICAgIGlmIChpbmRleCA9PT0gYVZlckFyci5sZW5ndGggfHwgYVZlckFycltpbmRleF0gPCBiVmVyQXJyW2luZGV4XSkge1xuICAgICAgICByZXR1cm4gLTE7XG4gICAgICB9IGVsc2UgaWYgKGluZGV4ID09PSBiVmVyQXJyLmxlbmd0aCB8fCBhVmVyQXJyW2luZGV4XSA+IGJWZXJBcnJbaW5kZXhdKSB7XG4gICAgICAgIHJldHVybiAxO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gMDtcbiAgfSBjYXRjaCAoZSkge1xuICAgIGNvbnNvbGUuZXJyb3IoJ0ZhaWxlZCB0byBjb21wYXJlIHZlcnNpb24gc3RyaW5ncycsIGUpO1xuICAgIHJldHVybiBudWxsO1xuICB9XG59O1xuLyoqXHJcbiAqIENoZWNrIGlmIHRoZSBGREMzIHZlcnNpb24gaW4gYW4gSW1wbGVtZW50YXRpb25NZXRhZGF0YSBvYmplY3QgaXMgZ3JlYXRlciB0aGFuXHJcbiAqIG9yIGVxdWFsIHRvIHRoZSBzdXBwbGllZCBudW1lcmljIHNlbXZlciB2ZXJzaW9uIG51bWJlciBzdHJpbmcgKGluIHRoZSBmb3JtIGAxLjIuM2ApLlxyXG4gKlxyXG4gKiBSZXR1cm5zIGEgYm9vbGVhbiBvciBudWxsIGlmIGFuIGVycm9yIG9jY3VycmVkIHdoaWxlIGNvbXBhcmluZyB0aGUgdmVyc2lvbiBudW1iZXJzLlxyXG4gKlxyXG4gKiBAcGFyYW0gbWV0YWRhdGFcclxuICogQHBhcmFtIHZlcnNpb25cclxuICovXG52YXIgdmVyc2lvbklzQXRMZWFzdCA9IGZ1bmN0aW9uIHZlcnNpb25Jc0F0TGVhc3QobWV0YWRhdGEsIHZlcnNpb24pIHtcbiAgdmFyIGNvbXBhcmlzb24gPSBjb21wYXJlVmVyc2lvbk51bWJlcnMobWV0YWRhdGEuZmRjM1ZlcnNpb24sIHZlcnNpb24pO1xuICByZXR1cm4gY29tcGFyaXNvbiA9PT0gbnVsbCA/IG51bGwgOiBjb21wYXJpc29uID49IDAgPyB0cnVlIDogZmFsc2U7XG59O1xuXG52YXIgQ29udGV4dFR5cGVzO1xuKGZ1bmN0aW9uIChDb250ZXh0VHlwZXMpIHtcbiAgQ29udGV4dFR5cGVzW1wiQ2hhcnRcIl0gPSBcImZkYzMuY2hhcnRcIjtcbiAgQ29udGV4dFR5cGVzW1wiQ2hhdEluaXRTZXR0aW5nc1wiXSA9IFwiZmRjMy5jaGF0LmluaXRTZXR0aW5nc1wiO1xuICBDb250ZXh0VHlwZXNbXCJDb250YWN0XCJdID0gXCJmZGMzLmNvbnRhY3RcIjtcbiAgQ29udGV4dFR5cGVzW1wiQ29udGFjdExpc3RcIl0gPSBcImZkYzMuY29udGFjdExpc3RcIjtcbiAgQ29udGV4dFR5cGVzW1wiQ291bnRyeVwiXSA9IFwiZmRjMy5jb3VudHJ5XCI7XG4gIENvbnRleHRUeXBlc1tcIkN1cnJlbmN5XCJdID0gXCJmZGMzLmN1cnJlbmN5XCI7XG4gIENvbnRleHRUeXBlc1tcIkVtYWlsXCJdID0gXCJmZGMzLmVtYWlsXCI7XG4gIENvbnRleHRUeXBlc1tcIkluc3RydW1lbnRcIl0gPSBcImZkYzMuaW5zdHJ1bWVudFwiO1xuICBDb250ZXh0VHlwZXNbXCJJbnN0cnVtZW50TGlzdFwiXSA9IFwiZmRjMy5pbnN0cnVtZW50TGlzdFwiO1xuICBDb250ZXh0VHlwZXNbXCJPcmdhbml6YXRpb25cIl0gPSBcImZkYzMub3JnYW5pemF0aW9uXCI7XG4gIENvbnRleHRUeXBlc1tcIlBvcnRmb2xpb1wiXSA9IFwiZmRjMy5wb3J0Zm9saW9cIjtcbiAgQ29udGV4dFR5cGVzW1wiUG9zaXRpb25cIl0gPSBcImZkYzMucG9zaXRpb25cIjtcbiAgQ29udGV4dFR5cGVzW1wiTm90aGluZ1wiXSA9IFwiZmRjMy5ub3RoaW5nXCI7XG4gIENvbnRleHRUeXBlc1tcIlRpbWVSYW5nZVwiXSA9IFwiZmRjMy50aW1lcmFuZ2VcIjtcbiAgQ29udGV4dFR5cGVzW1wiVmFsdWF0aW9uXCJdID0gXCJmZGMzLnZhbHVhdGlvblwiO1xufSkoQ29udGV4dFR5cGVzIHx8IChDb250ZXh0VHlwZXMgPSB7fSkpO1xuXG4vLyBUbyBwYXJzZSB0aGlzIGRhdGE6XG4vL1xuLy8gICBpbXBvcnQgeyBDb252ZXJ0LCBDaGFydCwgQ2hhdEluaXRTZXR0aW5ncywgQ29udGFjdCwgQ29udGFjdExpc3QsIENvbnRleHQsIENvdW50cnksIEN1cnJlbmN5LCBFbWFpbCwgSW5zdHJ1bWVudCwgSW5zdHJ1bWVudExpc3QsIE5vdGhpbmcsIE9yZ2FuaXphdGlvbiwgUG9ydGZvbGlvLCBQb3NpdGlvbiwgVGltZVJhbmdlLCBWYWx1YXRpb24gfSBmcm9tIFwiLi9maWxlXCI7XG4vL1xuLy8gICBjb25zdCBjaGFydCA9IENvbnZlcnQudG9DaGFydChqc29uKTtcbi8vICAgY29uc3QgY2hhdEluaXRTZXR0aW5ncyA9IENvbnZlcnQudG9DaGF0SW5pdFNldHRpbmdzKGpzb24pO1xuLy8gICBjb25zdCBjb250YWN0ID0gQ29udmVydC50b0NvbnRhY3QoanNvbik7XG4vLyAgIGNvbnN0IGNvbnRhY3RMaXN0ID0gQ29udmVydC50b0NvbnRhY3RMaXN0KGpzb24pO1xuLy8gICBjb25zdCBjb250ZXh0ID0gQ29udmVydC50b0NvbnRleHQoanNvbik7XG4vLyAgIGNvbnN0IGNvdW50cnkgPSBDb252ZXJ0LnRvQ291bnRyeShqc29uKTtcbi8vICAgY29uc3QgY3VycmVuY3kgPSBDb252ZXJ0LnRvQ3VycmVuY3koanNvbik7XG4vLyAgIGNvbnN0IGVtYWlsID0gQ29udmVydC50b0VtYWlsKGpzb24pO1xuLy8gICBjb25zdCBpbnN0cnVtZW50ID0gQ29udmVydC50b0luc3RydW1lbnQoanNvbik7XG4vLyAgIGNvbnN0IGluc3RydW1lbnRMaXN0ID0gQ29udmVydC50b0luc3RydW1lbnRMaXN0KGpzb24pO1xuLy8gICBjb25zdCBub3RoaW5nID0gQ29udmVydC50b05vdGhpbmcoanNvbik7XG4vLyAgIGNvbnN0IG9yZ2FuaXphdGlvbiA9IENvbnZlcnQudG9Pcmdhbml6YXRpb24oanNvbik7XG4vLyAgIGNvbnN0IHBvcnRmb2xpbyA9IENvbnZlcnQudG9Qb3J0Zm9saW8oanNvbik7XG4vLyAgIGNvbnN0IHBvc2l0aW9uID0gQ29udmVydC50b1Bvc2l0aW9uKGpzb24pO1xuLy8gICBjb25zdCB0aW1lUmFuZ2UgPSBDb252ZXJ0LnRvVGltZVJhbmdlKGpzb24pO1xuLy8gICBjb25zdCB2YWx1YXRpb24gPSBDb252ZXJ0LnRvVmFsdWF0aW9uKGpzb24pO1xuLy9cbi8vIFRoZXNlIGZ1bmN0aW9ucyB3aWxsIHRocm93IGFuIGVycm9yIGlmIHRoZSBKU09OIGRvZXNuJ3Rcbi8vIG1hdGNoIHRoZSBleHBlY3RlZCBpbnRlcmZhY2UsIGV2ZW4gaWYgdGhlIEpTT04gaXMgdmFsaWQuXG52YXIgU3R5bGU7XG4oZnVuY3Rpb24gKFN0eWxlKSB7XG4gIFN0eWxlW1wiQmFyXCJdID0gXCJiYXJcIjtcbiAgU3R5bGVbXCJDYW5kbGVcIl0gPSBcImNhbmRsZVwiO1xuICBTdHlsZVtcIkN1c3RvbVwiXSA9IFwiY3VzdG9tXCI7XG4gIFN0eWxlW1wiSGVhdG1hcFwiXSA9IFwiaGVhdG1hcFwiO1xuICBTdHlsZVtcIkhpc3RvZ3JhbVwiXSA9IFwiaGlzdG9ncmFtXCI7XG4gIFN0eWxlW1wiTGluZVwiXSA9IFwibGluZVwiO1xuICBTdHlsZVtcIk1vdW50YWluXCJdID0gXCJtb3VudGFpblwiO1xuICBTdHlsZVtcIlBpZVwiXSA9IFwicGllXCI7XG4gIFN0eWxlW1wiU2NhdHRlclwiXSA9IFwic2NhdHRlclwiO1xuICBTdHlsZVtcIlN0YWNrZWRCYXJcIl0gPSBcInN0YWNrZWQtYmFyXCI7XG59KShTdHlsZSB8fCAoU3R5bGUgPSB7fSkpO1xuLy8gQ29udmVydHMgSlNPTiBzdHJpbmdzIHRvL2Zyb20geW91ciB0eXBlc1xuLy8gYW5kIGFzc2VydHMgdGhlIHJlc3VsdHMgb2YgSlNPTi5wYXJzZSBhdCBydW50aW1lXG52YXIgQ29udmVydCA9IC8qI19fUFVSRV9fKi9mdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIENvbnZlcnQoKSB7fVxuICBDb252ZXJ0LnRvQ2hhcnQgPSBmdW5jdGlvbiB0b0NoYXJ0KGpzb24pIHtcbiAgICByZXR1cm4gY2FzdChKU09OLnBhcnNlKGpzb24pLCByKCdDaGFydCcpKTtcbiAgfTtcbiAgQ29udmVydC5jaGFydFRvSnNvbiA9IGZ1bmN0aW9uIGNoYXJ0VG9Kc29uKHZhbHVlKSB7XG4gICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHVuY2FzdCh2YWx1ZSwgcignQ2hhcnQnKSksIG51bGwsIDIpO1xuICB9O1xuICBDb252ZXJ0LnRvQ2hhdEluaXRTZXR0aW5ncyA9IGZ1bmN0aW9uIHRvQ2hhdEluaXRTZXR0aW5ncyhqc29uKSB7XG4gICAgcmV0dXJuIGNhc3QoSlNPTi5wYXJzZShqc29uKSwgcignQ2hhdEluaXRTZXR0aW5ncycpKTtcbiAgfTtcbiAgQ29udmVydC5jaGF0SW5pdFNldHRpbmdzVG9Kc29uID0gZnVuY3Rpb24gY2hhdEluaXRTZXR0aW5nc1RvSnNvbih2YWx1ZSkge1xuICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh1bmNhc3QodmFsdWUsIHIoJ0NoYXRJbml0U2V0dGluZ3MnKSksIG51bGwsIDIpO1xuICB9O1xuICBDb252ZXJ0LnRvQ29udGFjdCA9IGZ1bmN0aW9uIHRvQ29udGFjdChqc29uKSB7XG4gICAgcmV0dXJuIGNhc3QoSlNPTi5wYXJzZShqc29uKSwgcignQ29udGFjdCcpKTtcbiAgfTtcbiAgQ29udmVydC5jb250YWN0VG9Kc29uID0gZnVuY3Rpb24gY29udGFjdFRvSnNvbih2YWx1ZSkge1xuICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh1bmNhc3QodmFsdWUsIHIoJ0NvbnRhY3QnKSksIG51bGwsIDIpO1xuICB9O1xuICBDb252ZXJ0LnRvQ29udGFjdExpc3QgPSBmdW5jdGlvbiB0b0NvbnRhY3RMaXN0KGpzb24pIHtcbiAgICByZXR1cm4gY2FzdChKU09OLnBhcnNlKGpzb24pLCByKCdDb250YWN0TGlzdCcpKTtcbiAgfTtcbiAgQ29udmVydC5jb250YWN0TGlzdFRvSnNvbiA9IGZ1bmN0aW9uIGNvbnRhY3RMaXN0VG9Kc29uKHZhbHVlKSB7XG4gICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHVuY2FzdCh2YWx1ZSwgcignQ29udGFjdExpc3QnKSksIG51bGwsIDIpO1xuICB9O1xuICBDb252ZXJ0LnRvQ29udGV4dCA9IGZ1bmN0aW9uIHRvQ29udGV4dChqc29uKSB7XG4gICAgcmV0dXJuIGNhc3QoSlNPTi5wYXJzZShqc29uKSwgcignQ29udGV4dCcpKTtcbiAgfTtcbiAgQ29udmVydC5jb250ZXh0VG9Kc29uID0gZnVuY3Rpb24gY29udGV4dFRvSnNvbih2YWx1ZSkge1xuICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh1bmNhc3QodmFsdWUsIHIoJ0NvbnRleHQnKSksIG51bGwsIDIpO1xuICB9O1xuICBDb252ZXJ0LnRvQ291bnRyeSA9IGZ1bmN0aW9uIHRvQ291bnRyeShqc29uKSB7XG4gICAgcmV0dXJuIGNhc3QoSlNPTi5wYXJzZShqc29uKSwgcignQ291bnRyeScpKTtcbiAgfTtcbiAgQ29udmVydC5jb3VudHJ5VG9Kc29uID0gZnVuY3Rpb24gY291bnRyeVRvSnNvbih2YWx1ZSkge1xuICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh1bmNhc3QodmFsdWUsIHIoJ0NvdW50cnknKSksIG51bGwsIDIpO1xuICB9O1xuICBDb252ZXJ0LnRvQ3VycmVuY3kgPSBmdW5jdGlvbiB0b0N1cnJlbmN5KGpzb24pIHtcbiAgICByZXR1cm4gY2FzdChKU09OLnBhcnNlKGpzb24pLCByKCdDdXJyZW5jeScpKTtcbiAgfTtcbiAgQ29udmVydC5jdXJyZW5jeVRvSnNvbiA9IGZ1bmN0aW9uIGN1cnJlbmN5VG9Kc29uKHZhbHVlKSB7XG4gICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHVuY2FzdCh2YWx1ZSwgcignQ3VycmVuY3knKSksIG51bGwsIDIpO1xuICB9O1xuICBDb252ZXJ0LnRvRW1haWwgPSBmdW5jdGlvbiB0b0VtYWlsKGpzb24pIHtcbiAgICByZXR1cm4gY2FzdChKU09OLnBhcnNlKGpzb24pLCByKCdFbWFpbCcpKTtcbiAgfTtcbiAgQ29udmVydC5lbWFpbFRvSnNvbiA9IGZ1bmN0aW9uIGVtYWlsVG9Kc29uKHZhbHVlKSB7XG4gICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHVuY2FzdCh2YWx1ZSwgcignRW1haWwnKSksIG51bGwsIDIpO1xuICB9O1xuICBDb252ZXJ0LnRvSW5zdHJ1bWVudCA9IGZ1bmN0aW9uIHRvSW5zdHJ1bWVudChqc29uKSB7XG4gICAgcmV0dXJuIGNhc3QoSlNPTi5wYXJzZShqc29uKSwgcignSW5zdHJ1bWVudCcpKTtcbiAgfTtcbiAgQ29udmVydC5pbnN0cnVtZW50VG9Kc29uID0gZnVuY3Rpb24gaW5zdHJ1bWVudFRvSnNvbih2YWx1ZSkge1xuICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh1bmNhc3QodmFsdWUsIHIoJ0luc3RydW1lbnQnKSksIG51bGwsIDIpO1xuICB9O1xuICBDb252ZXJ0LnRvSW5zdHJ1bWVudExpc3QgPSBmdW5jdGlvbiB0b0luc3RydW1lbnRMaXN0KGpzb24pIHtcbiAgICByZXR1cm4gY2FzdChKU09OLnBhcnNlKGpzb24pLCByKCdJbnN0cnVtZW50TGlzdCcpKTtcbiAgfTtcbiAgQ29udmVydC5pbnN0cnVtZW50TGlzdFRvSnNvbiA9IGZ1bmN0aW9uIGluc3RydW1lbnRMaXN0VG9Kc29uKHZhbHVlKSB7XG4gICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHVuY2FzdCh2YWx1ZSwgcignSW5zdHJ1bWVudExpc3QnKSksIG51bGwsIDIpO1xuICB9O1xuICBDb252ZXJ0LnRvTm90aGluZyA9IGZ1bmN0aW9uIHRvTm90aGluZyhqc29uKSB7XG4gICAgcmV0dXJuIGNhc3QoSlNPTi5wYXJzZShqc29uKSwgcignTm90aGluZycpKTtcbiAgfTtcbiAgQ29udmVydC5ub3RoaW5nVG9Kc29uID0gZnVuY3Rpb24gbm90aGluZ1RvSnNvbih2YWx1ZSkge1xuICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh1bmNhc3QodmFsdWUsIHIoJ05vdGhpbmcnKSksIG51bGwsIDIpO1xuICB9O1xuICBDb252ZXJ0LnRvT3JnYW5pemF0aW9uID0gZnVuY3Rpb24gdG9Pcmdhbml6YXRpb24oanNvbikge1xuICAgIHJldHVybiBjYXN0KEpTT04ucGFyc2UoanNvbiksIHIoJ09yZ2FuaXphdGlvbicpKTtcbiAgfTtcbiAgQ29udmVydC5vcmdhbml6YXRpb25Ub0pzb24gPSBmdW5jdGlvbiBvcmdhbml6YXRpb25Ub0pzb24odmFsdWUpIHtcbiAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodW5jYXN0KHZhbHVlLCByKCdPcmdhbml6YXRpb24nKSksIG51bGwsIDIpO1xuICB9O1xuICBDb252ZXJ0LnRvUG9ydGZvbGlvID0gZnVuY3Rpb24gdG9Qb3J0Zm9saW8oanNvbikge1xuICAgIHJldHVybiBjYXN0KEpTT04ucGFyc2UoanNvbiksIHIoJ1BvcnRmb2xpbycpKTtcbiAgfTtcbiAgQ29udmVydC5wb3J0Zm9saW9Ub0pzb24gPSBmdW5jdGlvbiBwb3J0Zm9saW9Ub0pzb24odmFsdWUpIHtcbiAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodW5jYXN0KHZhbHVlLCByKCdQb3J0Zm9saW8nKSksIG51bGwsIDIpO1xuICB9O1xuICBDb252ZXJ0LnRvUG9zaXRpb24gPSBmdW5jdGlvbiB0b1Bvc2l0aW9uKGpzb24pIHtcbiAgICByZXR1cm4gY2FzdChKU09OLnBhcnNlKGpzb24pLCByKCdQb3NpdGlvbicpKTtcbiAgfTtcbiAgQ29udmVydC5wb3NpdGlvblRvSnNvbiA9IGZ1bmN0aW9uIHBvc2l0aW9uVG9Kc29uKHZhbHVlKSB7XG4gICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHVuY2FzdCh2YWx1ZSwgcignUG9zaXRpb24nKSksIG51bGwsIDIpO1xuICB9O1xuICBDb252ZXJ0LnRvVGltZVJhbmdlID0gZnVuY3Rpb24gdG9UaW1lUmFuZ2UoanNvbikge1xuICAgIHJldHVybiBjYXN0KEpTT04ucGFyc2UoanNvbiksIHIoJ1RpbWVSYW5nZScpKTtcbiAgfTtcbiAgQ29udmVydC50aW1lUmFuZ2VUb0pzb24gPSBmdW5jdGlvbiB0aW1lUmFuZ2VUb0pzb24odmFsdWUpIHtcbiAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodW5jYXN0KHZhbHVlLCByKCdUaW1lUmFuZ2UnKSksIG51bGwsIDIpO1xuICB9O1xuICBDb252ZXJ0LnRvVmFsdWF0aW9uID0gZnVuY3Rpb24gdG9WYWx1YXRpb24oanNvbikge1xuICAgIHJldHVybiBjYXN0KEpTT04ucGFyc2UoanNvbiksIHIoJ1ZhbHVhdGlvbicpKTtcbiAgfTtcbiAgQ29udmVydC52YWx1YXRpb25Ub0pzb24gPSBmdW5jdGlvbiB2YWx1YXRpb25Ub0pzb24odmFsdWUpIHtcbiAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodW5jYXN0KHZhbHVlLCByKCdWYWx1YXRpb24nKSksIG51bGwsIDIpO1xuICB9O1xuICByZXR1cm4gQ29udmVydDtcbn0oKTtcbmZ1bmN0aW9uIGludmFsaWRWYWx1ZSh0eXAsIHZhbCwga2V5LCBwYXJlbnQpIHtcbiAgaWYgKHBhcmVudCA9PT0gdm9pZCAwKSB7XG4gICAgcGFyZW50ID0gJyc7XG4gIH1cbiAgdmFyIHByZXR0eVR5cCA9IHByZXR0eVR5cGVOYW1lKHR5cCk7XG4gIHZhciBwYXJlbnRUZXh0ID0gcGFyZW50ID8gXCIgb24gXCIgKyBwYXJlbnQgOiAnJztcbiAgdmFyIGtleVRleHQgPSBrZXkgPyBcIiBmb3Iga2V5IFxcXCJcIiArIGtleSArIFwiXFxcIlwiIDogJyc7XG4gIHRocm93IEVycm9yKFwiSW52YWxpZCB2YWx1ZVwiICsga2V5VGV4dCArIHBhcmVudFRleHQgKyBcIi4gRXhwZWN0ZWQgXCIgKyBwcmV0dHlUeXAgKyBcIiBidXQgZ290IFwiICsgSlNPTi5zdHJpbmdpZnkodmFsKSk7XG59XG5mdW5jdGlvbiBwcmV0dHlUeXBlTmFtZSh0eXApIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkodHlwKSkge1xuICAgIGlmICh0eXAubGVuZ3RoID09PSAyICYmIHR5cFswXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gXCJhbiBvcHRpb25hbCBcIiArIHByZXR0eVR5cGVOYW1lKHR5cFsxXSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBcIm9uZSBvZiBbXCIgKyB0eXAubWFwKGZ1bmN0aW9uIChhKSB7XG4gICAgICAgIHJldHVybiBwcmV0dHlUeXBlTmFtZShhKTtcbiAgICAgIH0pLmpvaW4oJywgJykgKyBcIl1cIjtcbiAgICB9XG4gIH0gZWxzZSBpZiAodHlwZW9mIHR5cCA9PT0gJ29iamVjdCcgJiYgdHlwLmxpdGVyYWwgIT09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiB0eXAubGl0ZXJhbDtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gdHlwZW9mIHR5cDtcbiAgfVxufVxuZnVuY3Rpb24ganNvblRvSlNQcm9wcyh0eXApIHtcbiAgaWYgKHR5cC5qc29uVG9KUyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgdmFyIG1hcCA9IHt9O1xuICAgIHR5cC5wcm9wcy5mb3JFYWNoKGZ1bmN0aW9uIChwKSB7XG4gICAgICByZXR1cm4gbWFwW3AuanNvbl0gPSB7XG4gICAgICAgIGtleTogcC5qcyxcbiAgICAgICAgdHlwOiBwLnR5cFxuICAgICAgfTtcbiAgICB9KTtcbiAgICB0eXAuanNvblRvSlMgPSBtYXA7XG4gIH1cbiAgcmV0dXJuIHR5cC5qc29uVG9KUztcbn1cbmZ1bmN0aW9uIGpzVG9KU09OUHJvcHModHlwKSB7XG4gIGlmICh0eXAuanNUb0pTT04gPT09IHVuZGVmaW5lZCkge1xuICAgIHZhciBtYXAgPSB7fTtcbiAgICB0eXAucHJvcHMuZm9yRWFjaChmdW5jdGlvbiAocCkge1xuICAgICAgcmV0dXJuIG1hcFtwLmpzXSA9IHtcbiAgICAgICAga2V5OiBwLmpzb24sXG4gICAgICAgIHR5cDogcC50eXBcbiAgICAgIH07XG4gICAgfSk7XG4gICAgdHlwLmpzVG9KU09OID0gbWFwO1xuICB9XG4gIHJldHVybiB0eXAuanNUb0pTT047XG59XG5mdW5jdGlvbiB0cmFuc2Zvcm0odmFsLCB0eXAsIGdldFByb3BzLCBrZXksIHBhcmVudCkge1xuICBpZiAoa2V5ID09PSB2b2lkIDApIHtcbiAgICBrZXkgPSAnJztcbiAgfVxuICBpZiAocGFyZW50ID09PSB2b2lkIDApIHtcbiAgICBwYXJlbnQgPSAnJztcbiAgfVxuICBmdW5jdGlvbiB0cmFuc2Zvcm1QcmltaXRpdmUodHlwLCB2YWwpIHtcbiAgICBpZiAodHlwZW9mIHR5cCA9PT0gdHlwZW9mIHZhbCkgcmV0dXJuIHZhbDtcbiAgICByZXR1cm4gaW52YWxpZFZhbHVlKHR5cCwgdmFsLCBrZXksIHBhcmVudCk7XG4gIH1cbiAgZnVuY3Rpb24gdHJhbnNmb3JtVW5pb24odHlwcywgdmFsKSB7XG4gICAgLy8gdmFsIG11c3QgdmFsaWRhdGUgYWdhaW5zdCBvbmUgdHlwIGluIHR5cHNcbiAgICB2YXIgbCA9IHR5cHMubGVuZ3RoO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbDsgaSsrKSB7XG4gICAgICB2YXIgX3R5cCA9IHR5cHNbaV07XG4gICAgICB0cnkge1xuICAgICAgICByZXR1cm4gdHJhbnNmb3JtKHZhbCwgX3R5cCwgZ2V0UHJvcHMpO1xuICAgICAgfSBjYXRjaCAoXykge31cbiAgICB9XG4gICAgcmV0dXJuIGludmFsaWRWYWx1ZSh0eXBzLCB2YWwsIGtleSwgcGFyZW50KTtcbiAgfVxuICBmdW5jdGlvbiB0cmFuc2Zvcm1FbnVtKGNhc2VzLCB2YWwpIHtcbiAgICBpZiAoY2FzZXMuaW5kZXhPZih2YWwpICE9PSAtMSkgcmV0dXJuIHZhbDtcbiAgICByZXR1cm4gaW52YWxpZFZhbHVlKGNhc2VzLm1hcChmdW5jdGlvbiAoYSkge1xuICAgICAgcmV0dXJuIGwoYSk7XG4gICAgfSksIHZhbCwga2V5LCBwYXJlbnQpO1xuICB9XG4gIGZ1bmN0aW9uIHRyYW5zZm9ybUFycmF5KHR5cCwgdmFsKSB7XG4gICAgLy8gdmFsIG11c3QgYmUgYW4gYXJyYXkgd2l0aCBubyBpbnZhbGlkIGVsZW1lbnRzXG4gICAgaWYgKCFBcnJheS5pc0FycmF5KHZhbCkpIHJldHVybiBpbnZhbGlkVmFsdWUobCgnYXJyYXknKSwgdmFsLCBrZXksIHBhcmVudCk7XG4gICAgcmV0dXJuIHZhbC5tYXAoZnVuY3Rpb24gKGVsKSB7XG4gICAgICByZXR1cm4gdHJhbnNmb3JtKGVsLCB0eXAsIGdldFByb3BzKTtcbiAgICB9KTtcbiAgfVxuICBmdW5jdGlvbiB0cmFuc2Zvcm1EYXRlKHZhbCkge1xuICAgIGlmICh2YWwgPT09IG51bGwpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICB2YXIgZCA9IG5ldyBEYXRlKHZhbCk7XG4gICAgaWYgKGlzTmFOKGQudmFsdWVPZigpKSkge1xuICAgICAgcmV0dXJuIGludmFsaWRWYWx1ZShsKCdEYXRlJyksIHZhbCwga2V5LCBwYXJlbnQpO1xuICAgIH1cbiAgICByZXR1cm4gZDtcbiAgfVxuICBmdW5jdGlvbiB0cmFuc2Zvcm1PYmplY3QocHJvcHMsIGFkZGl0aW9uYWwsIHZhbCkge1xuICAgIGlmICh2YWwgPT09IG51bGwgfHwgdHlwZW9mIHZhbCAhPT0gJ29iamVjdCcgfHwgQXJyYXkuaXNBcnJheSh2YWwpKSB7XG4gICAgICByZXR1cm4gaW52YWxpZFZhbHVlKGwocmVmIHx8ICdvYmplY3QnKSwgdmFsLCBrZXksIHBhcmVudCk7XG4gICAgfVxuICAgIHZhciByZXN1bHQgPSB7fTtcbiAgICBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhwcm9wcykuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICB2YXIgcHJvcCA9IHByb3BzW2tleV07XG4gICAgICB2YXIgdiA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbCh2YWwsIGtleSkgPyB2YWxba2V5XSA6IHVuZGVmaW5lZDtcbiAgICAgIHJlc3VsdFtwcm9wLmtleV0gPSB0cmFuc2Zvcm0odiwgcHJvcC50eXAsIGdldFByb3BzLCBrZXksIHJlZik7XG4gICAgfSk7XG4gICAgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModmFsKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgIGlmICghT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHByb3BzLCBrZXkpKSB7XG4gICAgICAgIHJlc3VsdFtrZXldID0gdHJhbnNmb3JtKHZhbFtrZXldLCBhZGRpdGlvbmFsLCBnZXRQcm9wcywga2V5LCByZWYpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbiAgaWYgKHR5cCA9PT0gJ2FueScpIHJldHVybiB2YWw7XG4gIGlmICh0eXAgPT09IG51bGwpIHtcbiAgICBpZiAodmFsID09PSBudWxsKSByZXR1cm4gdmFsO1xuICAgIHJldHVybiBpbnZhbGlkVmFsdWUodHlwLCB2YWwsIGtleSwgcGFyZW50KTtcbiAgfVxuICBpZiAodHlwID09PSBmYWxzZSkgcmV0dXJuIGludmFsaWRWYWx1ZSh0eXAsIHZhbCwga2V5LCBwYXJlbnQpO1xuICB2YXIgcmVmID0gdW5kZWZpbmVkO1xuICB3aGlsZSAodHlwZW9mIHR5cCA9PT0gJ29iamVjdCcgJiYgdHlwLnJlZiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgcmVmID0gdHlwLnJlZjtcbiAgICB0eXAgPSB0eXBlTWFwW3R5cC5yZWZdO1xuICB9XG4gIGlmIChBcnJheS5pc0FycmF5KHR5cCkpIHJldHVybiB0cmFuc2Zvcm1FbnVtKHR5cCwgdmFsKTtcbiAgaWYgKHR5cGVvZiB0eXAgPT09ICdvYmplY3QnKSB7XG4gICAgcmV0dXJuIHR5cC5oYXNPd25Qcm9wZXJ0eSgndW5pb25NZW1iZXJzJykgPyB0cmFuc2Zvcm1Vbmlvbih0eXAudW5pb25NZW1iZXJzLCB2YWwpIDogdHlwLmhhc093blByb3BlcnR5KCdhcnJheUl0ZW1zJykgPyB0cmFuc2Zvcm1BcnJheSh0eXAuYXJyYXlJdGVtcywgdmFsKSA6IHR5cC5oYXNPd25Qcm9wZXJ0eSgncHJvcHMnKSA/IHRyYW5zZm9ybU9iamVjdChnZXRQcm9wcyh0eXApLCB0eXAuYWRkaXRpb25hbCwgdmFsKSA6IGludmFsaWRWYWx1ZSh0eXAsIHZhbCwga2V5LCBwYXJlbnQpO1xuICB9XG4gIC8vIE51bWJlcnMgY2FuIGJlIHBhcnNlZCBieSBEYXRlIGJ1dCBzaG91bGRuJ3QgYmUuXG4gIGlmICh0eXAgPT09IERhdGUgJiYgdHlwZW9mIHZhbCAhPT0gJ251bWJlcicpIHJldHVybiB0cmFuc2Zvcm1EYXRlKHZhbCk7XG4gIHJldHVybiB0cmFuc2Zvcm1QcmltaXRpdmUodHlwLCB2YWwpO1xufVxuZnVuY3Rpb24gY2FzdCh2YWwsIHR5cCkge1xuICByZXR1cm4gdHJhbnNmb3JtKHZhbCwgdHlwLCBqc29uVG9KU1Byb3BzKTtcbn1cbmZ1bmN0aW9uIHVuY2FzdCh2YWwsIHR5cCkge1xuICByZXR1cm4gdHJhbnNmb3JtKHZhbCwgdHlwLCBqc1RvSlNPTlByb3BzKTtcbn1cbmZ1bmN0aW9uIGwodHlwKSB7XG4gIHJldHVybiB7XG4gICAgbGl0ZXJhbDogdHlwXG4gIH07XG59XG5mdW5jdGlvbiBhKHR5cCkge1xuICByZXR1cm4ge1xuICAgIGFycmF5SXRlbXM6IHR5cFxuICB9O1xufVxuZnVuY3Rpb24gdSgpIHtcbiAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIHR5cHMgPSBuZXcgQXJyYXkoX2xlbiksIF9rZXkgPSAwOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgdHlwc1tfa2V5XSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgfVxuICByZXR1cm4ge1xuICAgIHVuaW9uTWVtYmVyczogdHlwc1xuICB9O1xufVxuZnVuY3Rpb24gbyhwcm9wcywgYWRkaXRpb25hbCkge1xuICByZXR1cm4ge1xuICAgIHByb3BzOiBwcm9wcyxcbiAgICBhZGRpdGlvbmFsOiBhZGRpdGlvbmFsXG4gIH07XG59XG5mdW5jdGlvbiBtKGFkZGl0aW9uYWwpIHtcbiAgcmV0dXJuIHtcbiAgICBwcm9wczogW10sXG4gICAgYWRkaXRpb25hbDogYWRkaXRpb25hbFxuICB9O1xufVxuZnVuY3Rpb24gcihuYW1lKSB7XG4gIHJldHVybiB7XG4gICAgcmVmOiBuYW1lXG4gIH07XG59XG52YXIgdHlwZU1hcCA9IHtcbiAgQ2hhcnQ6IC8qI19fUFVSRV9fKi9vKFt7XG4gICAganNvbjogJ2luc3RydW1lbnRzJyxcbiAgICBqczogJ2luc3RydW1lbnRzJyxcbiAgICB0eXA6IC8qI19fUFVSRV9fKi9hKCAvKiNfX1BVUkVfXyovcignSW5zdHJ1bWVudEVsZW1lbnQnKSlcbiAgfSwge1xuICAgIGpzb246ICdvdGhlckNvbmZpZycsXG4gICAganM6ICdvdGhlckNvbmZpZycsXG4gICAgdHlwOiAvKiNfX1BVUkVfXyovdSh1bmRlZmluZWQsIC8qI19fUFVSRV9fKi9tKCdhbnknKSlcbiAgfSwge1xuICAgIGpzb246ICdyYW5nZScsXG4gICAganM6ICdyYW5nZScsXG4gICAgdHlwOiAvKiNfX1BVUkVfXyovdSh1bmRlZmluZWQsIC8qI19fUFVSRV9fKi9yKCdUaW1lUmFuZ2VPYmplY3QnKSlcbiAgfSwge1xuICAgIGpzb246ICdzdHlsZScsXG4gICAganM6ICdzdHlsZScsXG4gICAgdHlwOiAvKiNfX1BVUkVfXyovdSh1bmRlZmluZWQsIC8qI19fUFVSRV9fKi9yKCdTdHlsZScpKVxuICB9LCB7XG4gICAganNvbjogJ3R5cGUnLFxuICAgIGpzOiAndHlwZScsXG4gICAgdHlwOiAnJ1xuICB9LCB7XG4gICAganNvbjogJ2lkJyxcbiAgICBqczogJ2lkJyxcbiAgICB0eXA6IC8qI19fUFVSRV9fKi91KHVuZGVmaW5lZCwgLyojX19QVVJFX18qL20oJ2FueScpKVxuICB9LCB7XG4gICAganNvbjogJ25hbWUnLFxuICAgIGpzOiAnbmFtZScsXG4gICAgdHlwOiAvKiNfX1BVUkVfXyovdSh1bmRlZmluZWQsICcnKVxuICB9XSwgJ2FueScpLFxuICBJbnN0cnVtZW50RWxlbWVudDogLyojX19QVVJFX18qL28oW3tcbiAgICBqc29uOiAnaWQnLFxuICAgIGpzOiAnaWQnLFxuICAgIHR5cDogLyojX19QVVJFX18qL3IoJ1B1cnBsZUlEJylcbiAgfSwge1xuICAgIGpzb246ICdtYXJrZXQnLFxuICAgIGpzOiAnbWFya2V0JyxcbiAgICB0eXA6IC8qI19fUFVSRV9fKi91KHVuZGVmaW5lZCwgLyojX19QVVJFX18qL3IoJ1B1cnBsZU1hcmtldCcpKVxuICB9LCB7XG4gICAganNvbjogJ3R5cGUnLFxuICAgIGpzOiAndHlwZScsXG4gICAgdHlwOiAnJ1xuICB9LCB7XG4gICAganNvbjogJ25hbWUnLFxuICAgIGpzOiAnbmFtZScsXG4gICAgdHlwOiAvKiNfX1BVUkVfXyovdSh1bmRlZmluZWQsICcnKVxuICB9XSwgJ2FueScpLFxuICBQdXJwbGVJRDogLyojX19QVVJFX18qL28oW3tcbiAgICBqc29uOiAnQkJHJyxcbiAgICBqczogJ0JCRycsXG4gICAgdHlwOiAvKiNfX1BVUkVfXyovdSh1bmRlZmluZWQsICcnKVxuICB9LCB7XG4gICAganNvbjogJ0NVU0lQJyxcbiAgICBqczogJ0NVU0lQJyxcbiAgICB0eXA6IC8qI19fUFVSRV9fKi91KHVuZGVmaW5lZCwgJycpXG4gIH0sIHtcbiAgICBqc29uOiAnRkRTX0lEJyxcbiAgICBqczogJ0ZEU19JRCcsXG4gICAgdHlwOiAvKiNfX1BVUkVfXyovdSh1bmRlZmluZWQsICcnKVxuICB9LCB7XG4gICAganNvbjogJ0ZJR0knLFxuICAgIGpzOiAnRklHSScsXG4gICAgdHlwOiAvKiNfX1BVUkVfXyovdSh1bmRlZmluZWQsICcnKVxuICB9LCB7XG4gICAganNvbjogJ0lTSU4nLFxuICAgIGpzOiAnSVNJTicsXG4gICAgdHlwOiAvKiNfX1BVUkVfXyovdSh1bmRlZmluZWQsICcnKVxuICB9LCB7XG4gICAganNvbjogJ1BFUk1JRCcsXG4gICAganM6ICdQRVJNSUQnLFxuICAgIHR5cDogLyojX19QVVJFX18qL3UodW5kZWZpbmVkLCAnJylcbiAgfSwge1xuICAgIGpzb246ICdSSUMnLFxuICAgIGpzOiAnUklDJyxcbiAgICB0eXA6IC8qI19fUFVSRV9fKi91KHVuZGVmaW5lZCwgJycpXG4gIH0sIHtcbiAgICBqc29uOiAnU0VET0wnLFxuICAgIGpzOiAnU0VET0wnLFxuICAgIHR5cDogLyojX19QVVJFX18qL3UodW5kZWZpbmVkLCAnJylcbiAgfSwge1xuICAgIGpzb246ICd0aWNrZXInLFxuICAgIGpzOiAndGlja2VyJyxcbiAgICB0eXA6IC8qI19fUFVSRV9fKi91KHVuZGVmaW5lZCwgJycpXG4gIH1dLCAnYW55JyksXG4gIFB1cnBsZU1hcmtldDogLyojX19QVVJFX18qL28oW3tcbiAgICBqc29uOiAnQkJHJyxcbiAgICBqczogJ0JCRycsXG4gICAgdHlwOiAvKiNfX1BVUkVfXyovdSh1bmRlZmluZWQsICcnKVxuICB9LCB7XG4gICAganNvbjogJ0NPVU5UUllfSVNPQUxQSEEyJyxcbiAgICBqczogJ0NPVU5UUllfSVNPQUxQSEEyJyxcbiAgICB0eXA6IC8qI19fUFVSRV9fKi91KHVuZGVmaW5lZCwgJycpXG4gIH0sIHtcbiAgICBqc29uOiAnTUlDJyxcbiAgICBqczogJ01JQycsXG4gICAgdHlwOiAvKiNfX1BVUkVfXyovdSh1bmRlZmluZWQsICcnKVxuICB9LCB7XG4gICAganNvbjogJ25hbWUnLFxuICAgIGpzOiAnbmFtZScsXG4gICAgdHlwOiAvKiNfX1BVUkVfXyovdSh1bmRlZmluZWQsICcnKVxuICB9XSwgJ2FueScpLFxuICBUaW1lUmFuZ2VPYmplY3Q6IC8qI19fUFVSRV9fKi9vKFt7XG4gICAganNvbjogJ2VuZFRpbWUnLFxuICAgIGpzOiAnZW5kVGltZScsXG4gICAgdHlwOiAvKiNfX1BVUkVfXyovdSh1bmRlZmluZWQsIERhdGUpXG4gIH0sIHtcbiAgICBqc29uOiAnc3RhcnRUaW1lJyxcbiAgICBqczogJ3N0YXJ0VGltZScsXG4gICAgdHlwOiAvKiNfX1BVUkVfXyovdSh1bmRlZmluZWQsIERhdGUpXG4gIH0sIHtcbiAgICBqc29uOiAndHlwZScsXG4gICAganM6ICd0eXBlJyxcbiAgICB0eXA6ICcnXG4gIH0sIHtcbiAgICBqc29uOiAnaWQnLFxuICAgIGpzOiAnaWQnLFxuICAgIHR5cDogLyojX19QVVJFX18qL3UodW5kZWZpbmVkLCAvKiNfX1BVUkVfXyovbSgnYW55JykpXG4gIH0sIHtcbiAgICBqc29uOiAnbmFtZScsXG4gICAganM6ICduYW1lJyxcbiAgICB0eXA6IC8qI19fUFVSRV9fKi91KHVuZGVmaW5lZCwgJycpXG4gIH1dLCAnYW55JyksXG4gIENoYXRJbml0U2V0dGluZ3M6IC8qI19fUFVSRV9fKi9vKFt7XG4gICAganNvbjogJ2NoYXROYW1lJyxcbiAgICBqczogJ2NoYXROYW1lJyxcbiAgICB0eXA6IC8qI19fUFVSRV9fKi91KHVuZGVmaW5lZCwgJycpXG4gIH0sIHtcbiAgICBqc29uOiAnaW5pdE1lc3NhZ2UnLFxuICAgIGpzOiAnaW5pdE1lc3NhZ2UnLFxuICAgIHR5cDogLyojX19QVVJFX18qL3UodW5kZWZpbmVkLCAnJylcbiAgfSwge1xuICAgIGpzb246ICdtZW1iZXJzJyxcbiAgICBqczogJ21lbWJlcnMnLFxuICAgIHR5cDogLyojX19QVVJFX18qL3UodW5kZWZpbmVkLCAvKiNfX1BVUkVfXyovcignQ29udGFjdExpc3RPYmplY3QnKSlcbiAgfSwge1xuICAgIGpzb246ICdvcHRpb25zJyxcbiAgICBqczogJ29wdGlvbnMnLFxuICAgIHR5cDogLyojX19QVVJFX18qL3UodW5kZWZpbmVkLCAnYW55JylcbiAgfSwge1xuICAgIGpzb246ICd0eXBlJyxcbiAgICBqczogJ3R5cGUnLFxuICAgIHR5cDogJ2FueSdcbiAgfV0sICdhbnknKSxcbiAgQ29udGFjdExpc3RPYmplY3Q6IC8qI19fUFVSRV9fKi9vKFt7XG4gICAganNvbjogJ2NvbnRhY3RzJyxcbiAgICBqczogJ2NvbnRhY3RzJyxcbiAgICB0eXA6IC8qI19fUFVSRV9fKi9hKCAvKiNfX1BVUkVfXyovcignQ29udGFjdEVsZW1lbnQnKSlcbiAgfSwge1xuICAgIGpzb246ICd0eXBlJyxcbiAgICBqczogJ3R5cGUnLFxuICAgIHR5cDogJydcbiAgfSwge1xuICAgIGpzb246ICdpZCcsXG4gICAganM6ICdpZCcsXG4gICAgdHlwOiAvKiNfX1BVUkVfXyovdSh1bmRlZmluZWQsIC8qI19fUFVSRV9fKi9tKCdhbnknKSlcbiAgfSwge1xuICAgIGpzb246ICduYW1lJyxcbiAgICBqczogJ25hbWUnLFxuICAgIHR5cDogLyojX19QVVJFX18qL3UodW5kZWZpbmVkLCAnJylcbiAgfV0sICdhbnknKSxcbiAgQ29udGFjdEVsZW1lbnQ6IC8qI19fUFVSRV9fKi9vKFt7XG4gICAganNvbjogJ2lkJyxcbiAgICBqczogJ2lkJyxcbiAgICB0eXA6IC8qI19fUFVSRV9fKi9yKCdGbHVmZnlJRCcpXG4gIH0sIHtcbiAgICBqc29uOiAndHlwZScsXG4gICAganM6ICd0eXBlJyxcbiAgICB0eXA6ICcnXG4gIH0sIHtcbiAgICBqc29uOiAnbmFtZScsXG4gICAganM6ICduYW1lJyxcbiAgICB0eXA6IC8qI19fUFVSRV9fKi91KHVuZGVmaW5lZCwgJycpXG4gIH1dLCAnYW55JyksXG4gIEZsdWZmeUlEOiAvKiNfX1BVUkVfXyovbyhbe1xuICAgIGpzb246ICdlbWFpbCcsXG4gICAganM6ICdlbWFpbCcsXG4gICAgdHlwOiAvKiNfX1BVUkVfXyovdSh1bmRlZmluZWQsICcnKVxuICB9LCB7XG4gICAganNvbjogJ0ZEU19JRCcsXG4gICAganM6ICdGRFNfSUQnLFxuICAgIHR5cDogLyojX19QVVJFX18qL3UodW5kZWZpbmVkLCAnJylcbiAgfV0sICdhbnknKSxcbiAgQ29udGFjdDogLyojX19QVVJFX18qL28oW3tcbiAgICBqc29uOiAnaWQnLFxuICAgIGpzOiAnaWQnLFxuICAgIHR5cDogLyojX19QVVJFX18qL3IoJ1RlbnRhY2xlZElEJylcbiAgfSwge1xuICAgIGpzb246ICd0eXBlJyxcbiAgICBqczogJ3R5cGUnLFxuICAgIHR5cDogJydcbiAgfSwge1xuICAgIGpzb246ICduYW1lJyxcbiAgICBqczogJ25hbWUnLFxuICAgIHR5cDogLyojX19QVVJFX18qL3UodW5kZWZpbmVkLCAnJylcbiAgfV0sICdhbnknKSxcbiAgVGVudGFjbGVkSUQ6IC8qI19fUFVSRV9fKi9vKFt7XG4gICAganNvbjogJ2VtYWlsJyxcbiAgICBqczogJ2VtYWlsJyxcbiAgICB0eXA6IC8qI19fUFVSRV9fKi91KHVuZGVmaW5lZCwgJycpXG4gIH0sIHtcbiAgICBqc29uOiAnRkRTX0lEJyxcbiAgICBqczogJ0ZEU19JRCcsXG4gICAgdHlwOiAvKiNfX1BVUkVfXyovdSh1bmRlZmluZWQsICcnKVxuICB9XSwgJ2FueScpLFxuICBDb250YWN0TGlzdDogLyojX19QVVJFX18qL28oW3tcbiAgICBqc29uOiAnY29udGFjdHMnLFxuICAgIGpzOiAnY29udGFjdHMnLFxuICAgIHR5cDogLyojX19QVVJFX18qL2EoIC8qI19fUFVSRV9fKi9yKCdDb250YWN0RWxlbWVudCcpKVxuICB9LCB7XG4gICAganNvbjogJ3R5cGUnLFxuICAgIGpzOiAndHlwZScsXG4gICAgdHlwOiAnJ1xuICB9LCB7XG4gICAganNvbjogJ2lkJyxcbiAgICBqczogJ2lkJyxcbiAgICB0eXA6IC8qI19fUFVSRV9fKi91KHVuZGVmaW5lZCwgLyojX19QVVJFX18qL20oJ2FueScpKVxuICB9LCB7XG4gICAganNvbjogJ25hbWUnLFxuICAgIGpzOiAnbmFtZScsXG4gICAgdHlwOiAvKiNfX1BVUkVfXyovdSh1bmRlZmluZWQsICcnKVxuICB9XSwgJ2FueScpLFxuICBDb250ZXh0OiAvKiNfX1BVUkVfXyovbyhbe1xuICAgIGpzb246ICdpZCcsXG4gICAganM6ICdpZCcsXG4gICAgdHlwOiAvKiNfX1BVUkVfXyovdSh1bmRlZmluZWQsIC8qI19fUFVSRV9fKi9tKCdhbnknKSlcbiAgfSwge1xuICAgIGpzb246ICduYW1lJyxcbiAgICBqczogJ25hbWUnLFxuICAgIHR5cDogLyojX19QVVJFX18qL3UodW5kZWZpbmVkLCAnJylcbiAgfSwge1xuICAgIGpzb246ICd0eXBlJyxcbiAgICBqczogJ3R5cGUnLFxuICAgIHR5cDogJydcbiAgfV0sICdhbnknKSxcbiAgQ291bnRyeTogLyojX19QVVJFX18qL28oW3tcbiAgICBqc29uOiAnaWQnLFxuICAgIGpzOiAnaWQnLFxuICAgIHR5cDogLyojX19QVVJFX18qL3IoJ0NvdW50cnlJRCcpXG4gIH0sIHtcbiAgICBqc29uOiAndHlwZScsXG4gICAganM6ICd0eXBlJyxcbiAgICB0eXA6ICcnXG4gIH0sIHtcbiAgICBqc29uOiAnbmFtZScsXG4gICAganM6ICduYW1lJyxcbiAgICB0eXA6IC8qI19fUFVSRV9fKi91KHVuZGVmaW5lZCwgJycpXG4gIH1dLCAnYW55JyksXG4gIENvdW50cnlJRDogLyojX19QVVJFX18qL28oW3tcbiAgICBqc29uOiAnQ09VTlRSWV9JU09BTFBIQTInLFxuICAgIGpzOiAnQ09VTlRSWV9JU09BTFBIQTInLFxuICAgIHR5cDogLyojX19QVVJFX18qL3UodW5kZWZpbmVkLCAnJylcbiAgfSwge1xuICAgIGpzb246ICdDT1VOVFJZX0lTT0FMUEhBMycsXG4gICAganM6ICdDT1VOVFJZX0lTT0FMUEhBMycsXG4gICAgdHlwOiAvKiNfX1BVUkVfXyovdSh1bmRlZmluZWQsICcnKVxuICB9LCB7XG4gICAganNvbjogJ0lTT0FMUEhBMicsXG4gICAganM6ICdJU09BTFBIQTInLFxuICAgIHR5cDogLyojX19QVVJFX18qL3UodW5kZWZpbmVkLCAnJylcbiAgfSwge1xuICAgIGpzb246ICdJU09BTFBIQTMnLFxuICAgIGpzOiAnSVNPQUxQSEEzJyxcbiAgICB0eXA6IC8qI19fUFVSRV9fKi91KHVuZGVmaW5lZCwgJycpXG4gIH1dLCAnYW55JyksXG4gIEN1cnJlbmN5OiAvKiNfX1BVUkVfXyovbyhbe1xuICAgIGpzb246ICdpZCcsXG4gICAganM6ICdpZCcsXG4gICAgdHlwOiAvKiNfX1BVUkVfXyovcignQ3VycmVuY3lJRCcpXG4gIH0sIHtcbiAgICBqc29uOiAnbmFtZScsXG4gICAganM6ICduYW1lJyxcbiAgICB0eXA6IC8qI19fUFVSRV9fKi91KHVuZGVmaW5lZCwgJycpXG4gIH0sIHtcbiAgICBqc29uOiAndHlwZScsXG4gICAganM6ICd0eXBlJyxcbiAgICB0eXA6ICcnXG4gIH1dLCAnYW55JyksXG4gIEN1cnJlbmN5SUQ6IC8qI19fUFVSRV9fKi9vKFt7XG4gICAganNvbjogJ0NVUlJFTkNZX0lTT0NPREUnLFxuICAgIGpzOiAnQ1VSUkVOQ1lfSVNPQ09ERScsXG4gICAgdHlwOiAvKiNfX1BVUkVfXyovdSh1bmRlZmluZWQsICcnKVxuICB9XSwgJ2FueScpLFxuICBFbWFpbDogLyojX19QVVJFX18qL28oW3tcbiAgICBqc29uOiAncmVjaXBpZW50cycsXG4gICAganM6ICdyZWNpcGllbnRzJyxcbiAgICB0eXA6IC8qI19fUFVSRV9fKi9yKCdSZWNpcGllbnRzT2JqZWN0JylcbiAgfSwge1xuICAgIGpzb246ICdzdWJqZWN0JyxcbiAgICBqczogJ3N1YmplY3QnLFxuICAgIHR5cDogLyojX19QVVJFX18qL3UodW5kZWZpbmVkLCAnJylcbiAgfSwge1xuICAgIGpzb246ICd0ZXh0Qm9keScsXG4gICAganM6ICd0ZXh0Qm9keScsXG4gICAgdHlwOiAvKiNfX1BVUkVfXyovdSh1bmRlZmluZWQsICcnKVxuICB9LCB7XG4gICAganNvbjogJ3R5cGUnLFxuICAgIGpzOiAndHlwZScsXG4gICAgdHlwOiAnJ1xuICB9LCB7XG4gICAganNvbjogJ2lkJyxcbiAgICBqczogJ2lkJyxcbiAgICB0eXA6IC8qI19fUFVSRV9fKi91KHVuZGVmaW5lZCwgLyojX19QVVJFX18qL20oJ2FueScpKVxuICB9LCB7XG4gICAganNvbjogJ25hbWUnLFxuICAgIGpzOiAnbmFtZScsXG4gICAgdHlwOiAvKiNfX1BVUkVfXyovdSh1bmRlZmluZWQsICcnKVxuICB9XSwgJ2FueScpLFxuICBSZWNpcGllbnRzT2JqZWN0OiAvKiNfX1BVUkVfXyovbyhbe1xuICAgIGpzb246ICdpZCcsXG4gICAganM6ICdpZCcsXG4gICAgdHlwOiAvKiNfX1BVUkVfXyovdSh1bmRlZmluZWQsIC8qI19fUFVSRV9fKi9yKCdSZWNpcGllbnRzSUQnKSlcbiAgfSwge1xuICAgIGpzb246ICd0eXBlJyxcbiAgICBqczogJ3R5cGUnLFxuICAgIHR5cDogJydcbiAgfSwge1xuICAgIGpzb246ICduYW1lJyxcbiAgICBqczogJ25hbWUnLFxuICAgIHR5cDogLyojX19QVVJFX18qL3UodW5kZWZpbmVkLCAnJylcbiAgfSwge1xuICAgIGpzb246ICdjb250YWN0cycsXG4gICAganM6ICdjb250YWN0cycsXG4gICAgdHlwOiAvKiNfX1BVUkVfXyovdSh1bmRlZmluZWQsIC8qI19fUFVSRV9fKi9hKCAvKiNfX1BVUkVfXyovcignQ29udGFjdEVsZW1lbnQnKSkpXG4gIH1dLCAnYW55JyksXG4gIFJlY2lwaWVudHNJRDogLyojX19QVVJFX18qL28oW3tcbiAgICBqc29uOiAnZW1haWwnLFxuICAgIGpzOiAnZW1haWwnLFxuICAgIHR5cDogLyojX19QVVJFX18qL3UodW5kZWZpbmVkLCAnJylcbiAgfSwge1xuICAgIGpzb246ICdGRFNfSUQnLFxuICAgIGpzOiAnRkRTX0lEJyxcbiAgICB0eXA6IC8qI19fUFVSRV9fKi91KHVuZGVmaW5lZCwgJycpXG4gIH1dLCAnYW55JyksXG4gIEluc3RydW1lbnQ6IC8qI19fUFVSRV9fKi9vKFt7XG4gICAganNvbjogJ2lkJyxcbiAgICBqczogJ2lkJyxcbiAgICB0eXA6IC8qI19fUFVSRV9fKi9yKCdTdGlja3lJRCcpXG4gIH0sIHtcbiAgICBqc29uOiAnbWFya2V0JyxcbiAgICBqczogJ21hcmtldCcsXG4gICAgdHlwOiAvKiNfX1BVUkVfXyovdSh1bmRlZmluZWQsIC8qI19fUFVSRV9fKi9yKCdGbHVmZnlNYXJrZXQnKSlcbiAgfSwge1xuICAgIGpzb246ICd0eXBlJyxcbiAgICBqczogJ3R5cGUnLFxuICAgIHR5cDogJydcbiAgfSwge1xuICAgIGpzb246ICduYW1lJyxcbiAgICBqczogJ25hbWUnLFxuICAgIHR5cDogLyojX19QVVJFX18qL3UodW5kZWZpbmVkLCAnJylcbiAgfV0sICdhbnknKSxcbiAgU3RpY2t5SUQ6IC8qI19fUFVSRV9fKi9vKFt7XG4gICAganNvbjogJ0JCRycsXG4gICAganM6ICdCQkcnLFxuICAgIHR5cDogLyojX19QVVJFX18qL3UodW5kZWZpbmVkLCAnJylcbiAgfSwge1xuICAgIGpzb246ICdDVVNJUCcsXG4gICAganM6ICdDVVNJUCcsXG4gICAgdHlwOiAvKiNfX1BVUkVfXyovdSh1bmRlZmluZWQsICcnKVxuICB9LCB7XG4gICAganNvbjogJ0ZEU19JRCcsXG4gICAganM6ICdGRFNfSUQnLFxuICAgIHR5cDogLyojX19QVVJFX18qL3UodW5kZWZpbmVkLCAnJylcbiAgfSwge1xuICAgIGpzb246ICdGSUdJJyxcbiAgICBqczogJ0ZJR0knLFxuICAgIHR5cDogLyojX19QVVJFX18qL3UodW5kZWZpbmVkLCAnJylcbiAgfSwge1xuICAgIGpzb246ICdJU0lOJyxcbiAgICBqczogJ0lTSU4nLFxuICAgIHR5cDogLyojX19QVVJFX18qL3UodW5kZWZpbmVkLCAnJylcbiAgfSwge1xuICAgIGpzb246ICdQRVJNSUQnLFxuICAgIGpzOiAnUEVSTUlEJyxcbiAgICB0eXA6IC8qI19fUFVSRV9fKi91KHVuZGVmaW5lZCwgJycpXG4gIH0sIHtcbiAgICBqc29uOiAnUklDJyxcbiAgICBqczogJ1JJQycsXG4gICAgdHlwOiAvKiNfX1BVUkVfXyovdSh1bmRlZmluZWQsICcnKVxuICB9LCB7XG4gICAganNvbjogJ1NFRE9MJyxcbiAgICBqczogJ1NFRE9MJyxcbiAgICB0eXA6IC8qI19fUFVSRV9fKi91KHVuZGVmaW5lZCwgJycpXG4gIH0sIHtcbiAgICBqc29uOiAndGlja2VyJyxcbiAgICBqczogJ3RpY2tlcicsXG4gICAgdHlwOiAvKiNfX1BVUkVfXyovdSh1bmRlZmluZWQsICcnKVxuICB9XSwgJ2FueScpLFxuICBGbHVmZnlNYXJrZXQ6IC8qI19fUFVSRV9fKi9vKFt7XG4gICAganNvbjogJ0JCRycsXG4gICAganM6ICdCQkcnLFxuICAgIHR5cDogLyojX19QVVJFX18qL3UodW5kZWZpbmVkLCAnJylcbiAgfSwge1xuICAgIGpzb246ICdDT1VOVFJZX0lTT0FMUEhBMicsXG4gICAganM6ICdDT1VOVFJZX0lTT0FMUEhBMicsXG4gICAgdHlwOiAvKiNfX1BVUkVfXyovdSh1bmRlZmluZWQsICcnKVxuICB9LCB7XG4gICAganNvbjogJ01JQycsXG4gICAganM6ICdNSUMnLFxuICAgIHR5cDogLyojX19QVVJFX18qL3UodW5kZWZpbmVkLCAnJylcbiAgfSwge1xuICAgIGpzb246ICduYW1lJyxcbiAgICBqczogJ25hbWUnLFxuICAgIHR5cDogLyojX19QVVJFX18qL3UodW5kZWZpbmVkLCAnJylcbiAgfV0sICdhbnknKSxcbiAgSW5zdHJ1bWVudExpc3Q6IC8qI19fUFVSRV9fKi9vKFt7XG4gICAganNvbjogJ2luc3RydW1lbnRzJyxcbiAgICBqczogJ2luc3RydW1lbnRzJyxcbiAgICB0eXA6IC8qI19fUFVSRV9fKi9hKCAvKiNfX1BVUkVfXyovcignSW5zdHJ1bWVudEVsZW1lbnQnKSlcbiAgfSwge1xuICAgIGpzb246ICd0eXBlJyxcbiAgICBqczogJ3R5cGUnLFxuICAgIHR5cDogJydcbiAgfSwge1xuICAgIGpzb246ICdpZCcsXG4gICAganM6ICdpZCcsXG4gICAgdHlwOiAvKiNfX1BVUkVfXyovdSh1bmRlZmluZWQsIC8qI19fUFVSRV9fKi9tKCdhbnknKSlcbiAgfSwge1xuICAgIGpzb246ICduYW1lJyxcbiAgICBqczogJ25hbWUnLFxuICAgIHR5cDogLyojX19QVVJFX18qL3UodW5kZWZpbmVkLCAnJylcbiAgfV0sICdhbnknKSxcbiAgTm90aGluZzogLyojX19QVVJFX18qL28oW3tcbiAgICBqc29uOiAndHlwZScsXG4gICAganM6ICd0eXBlJyxcbiAgICB0eXA6ICcnXG4gIH0sIHtcbiAgICBqc29uOiAnaWQnLFxuICAgIGpzOiAnaWQnLFxuICAgIHR5cDogLyojX19QVVJFX18qL3UodW5kZWZpbmVkLCAvKiNfX1BVUkVfXyovbSgnYW55JykpXG4gIH0sIHtcbiAgICBqc29uOiAnbmFtZScsXG4gICAganM6ICduYW1lJyxcbiAgICB0eXA6IC8qI19fUFVSRV9fKi91KHVuZGVmaW5lZCwgJycpXG4gIH1dLCAnYW55JyksXG4gIE9yZ2FuaXphdGlvbjogLyojX19QVVJFX18qL28oW3tcbiAgICBqc29uOiAnaWQnLFxuICAgIGpzOiAnaWQnLFxuICAgIHR5cDogLyojX19QVVJFX18qL3IoJ09yZ2FuaXphdGlvbklEJylcbiAgfSwge1xuICAgIGpzb246ICd0eXBlJyxcbiAgICBqczogJ3R5cGUnLFxuICAgIHR5cDogJydcbiAgfSwge1xuICAgIGpzb246ICduYW1lJyxcbiAgICBqczogJ25hbWUnLFxuICAgIHR5cDogLyojX19QVVJFX18qL3UodW5kZWZpbmVkLCAnJylcbiAgfV0sICdhbnknKSxcbiAgT3JnYW5pemF0aW9uSUQ6IC8qI19fUFVSRV9fKi9vKFt7XG4gICAganNvbjogJ0ZEU19JRCcsXG4gICAganM6ICdGRFNfSUQnLFxuICAgIHR5cDogLyojX19QVVJFX18qL3UodW5kZWZpbmVkLCAnJylcbiAgfSwge1xuICAgIGpzb246ICdMRUknLFxuICAgIGpzOiAnTEVJJyxcbiAgICB0eXA6IC8qI19fUFVSRV9fKi91KHVuZGVmaW5lZCwgJycpXG4gIH0sIHtcbiAgICBqc29uOiAnUEVSTUlEJyxcbiAgICBqczogJ1BFUk1JRCcsXG4gICAgdHlwOiAvKiNfX1BVUkVfXyovdSh1bmRlZmluZWQsICcnKVxuICB9XSwgJ2FueScpLFxuICBQb3J0Zm9saW86IC8qI19fUFVSRV9fKi9vKFt7XG4gICAganNvbjogJ3Bvc2l0aW9ucycsXG4gICAganM6ICdwb3NpdGlvbnMnLFxuICAgIHR5cDogLyojX19QVVJFX18qL2EoIC8qI19fUFVSRV9fKi9yKCdQb3NpdGlvbkVsZW1lbnQnKSlcbiAgfSwge1xuICAgIGpzb246ICd0eXBlJyxcbiAgICBqczogJ3R5cGUnLFxuICAgIHR5cDogJydcbiAgfSwge1xuICAgIGpzb246ICdpZCcsXG4gICAganM6ICdpZCcsXG4gICAgdHlwOiAvKiNfX1BVUkVfXyovdSh1bmRlZmluZWQsIC8qI19fUFVSRV9fKi9tKCdhbnknKSlcbiAgfSwge1xuICAgIGpzb246ICduYW1lJyxcbiAgICBqczogJ25hbWUnLFxuICAgIHR5cDogLyojX19QVVJFX18qL3UodW5kZWZpbmVkLCAnJylcbiAgfV0sICdhbnknKSxcbiAgUG9zaXRpb25FbGVtZW50OiAvKiNfX1BVUkVfXyovbyhbe1xuICAgIGpzb246ICdob2xkaW5nJyxcbiAgICBqczogJ2hvbGRpbmcnLFxuICAgIHR5cDogMy4xNFxuICB9LCB7XG4gICAganNvbjogJ2luc3RydW1lbnQnLFxuICAgIGpzOiAnaW5zdHJ1bWVudCcsXG4gICAgdHlwOiAvKiNfX1BVUkVfXyovcignSW5zdHJ1bWVudEVsZW1lbnQnKVxuICB9LCB7XG4gICAganNvbjogJ3R5cGUnLFxuICAgIGpzOiAndHlwZScsXG4gICAgdHlwOiAnJ1xuICB9LCB7XG4gICAganNvbjogJ2lkJyxcbiAgICBqczogJ2lkJyxcbiAgICB0eXA6IC8qI19fUFVSRV9fKi91KHVuZGVmaW5lZCwgLyojX19QVVJFX18qL20oJ2FueScpKVxuICB9LCB7XG4gICAganNvbjogJ25hbWUnLFxuICAgIGpzOiAnbmFtZScsXG4gICAgdHlwOiAvKiNfX1BVUkVfXyovdSh1bmRlZmluZWQsICcnKVxuICB9XSwgJ2FueScpLFxuICBQb3NpdGlvbjogLyojX19QVVJFX18qL28oW3tcbiAgICBqc29uOiAnaG9sZGluZycsXG4gICAganM6ICdob2xkaW5nJyxcbiAgICB0eXA6IDMuMTRcbiAgfSwge1xuICAgIGpzb246ICdpbnN0cnVtZW50JyxcbiAgICBqczogJ2luc3RydW1lbnQnLFxuICAgIHR5cDogLyojX19QVVJFX18qL3IoJ0luc3RydW1lbnRFbGVtZW50JylcbiAgfSwge1xuICAgIGpzb246ICd0eXBlJyxcbiAgICBqczogJ3R5cGUnLFxuICAgIHR5cDogJydcbiAgfSwge1xuICAgIGpzb246ICdpZCcsXG4gICAganM6ICdpZCcsXG4gICAgdHlwOiAvKiNfX1BVUkVfXyovdSh1bmRlZmluZWQsIC8qI19fUFVSRV9fKi9tKCdhbnknKSlcbiAgfSwge1xuICAgIGpzb246ICduYW1lJyxcbiAgICBqczogJ25hbWUnLFxuICAgIHR5cDogLyojX19QVVJFX18qL3UodW5kZWZpbmVkLCAnJylcbiAgfV0sICdhbnknKSxcbiAgVGltZVJhbmdlOiAvKiNfX1BVUkVfXyovbyhbe1xuICAgIGpzb246ICdlbmRUaW1lJyxcbiAgICBqczogJ2VuZFRpbWUnLFxuICAgIHR5cDogLyojX19QVVJFX18qL3UodW5kZWZpbmVkLCBEYXRlKVxuICB9LCB7XG4gICAganNvbjogJ3N0YXJ0VGltZScsXG4gICAganM6ICdzdGFydFRpbWUnLFxuICAgIHR5cDogLyojX19QVVJFX18qL3UodW5kZWZpbmVkLCBEYXRlKVxuICB9LCB7XG4gICAganNvbjogJ3R5cGUnLFxuICAgIGpzOiAndHlwZScsXG4gICAgdHlwOiAnJ1xuICB9LCB7XG4gICAganNvbjogJ2lkJyxcbiAgICBqczogJ2lkJyxcbiAgICB0eXA6IC8qI19fUFVSRV9fKi91KHVuZGVmaW5lZCwgLyojX19QVVJFX18qL20oJ2FueScpKVxuICB9LCB7XG4gICAganNvbjogJ25hbWUnLFxuICAgIGpzOiAnbmFtZScsXG4gICAgdHlwOiAvKiNfX1BVUkVfXyovdSh1bmRlZmluZWQsICcnKVxuICB9XSwgJ2FueScpLFxuICBWYWx1YXRpb246IC8qI19fUFVSRV9fKi9vKFt7XG4gICAganNvbjogJ0NVUlJFTkNZX0lTT0NPREUnLFxuICAgIGpzOiAnQ1VSUkVOQ1lfSVNPQ09ERScsXG4gICAgdHlwOiAnJ1xuICB9LCB7XG4gICAganNvbjogJ2V4cGlyeVRpbWUnLFxuICAgIGpzOiAnZXhwaXJ5VGltZScsXG4gICAgdHlwOiAvKiNfX1BVUkVfXyovdSh1bmRlZmluZWQsIERhdGUpXG4gIH0sIHtcbiAgICBqc29uOiAncHJpY2UnLFxuICAgIGpzOiAncHJpY2UnLFxuICAgIHR5cDogLyojX19QVVJFX18qL3UodW5kZWZpbmVkLCAzLjE0KVxuICB9LCB7XG4gICAganNvbjogJ3R5cGUnLFxuICAgIGpzOiAndHlwZScsXG4gICAgdHlwOiAnJ1xuICB9LCB7XG4gICAganNvbjogJ3ZhbHVhdGlvblRpbWUnLFxuICAgIGpzOiAndmFsdWF0aW9uVGltZScsXG4gICAgdHlwOiAvKiNfX1BVUkVfXyovdSh1bmRlZmluZWQsIERhdGUpXG4gIH0sIHtcbiAgICBqc29uOiAndmFsdWUnLFxuICAgIGpzOiAndmFsdWUnLFxuICAgIHR5cDogMy4xNFxuICB9LCB7XG4gICAganNvbjogJ2lkJyxcbiAgICBqczogJ2lkJyxcbiAgICB0eXA6IC8qI19fUFVSRV9fKi91KHVuZGVmaW5lZCwgLyojX19QVVJFX18qL20oJ2FueScpKVxuICB9LCB7XG4gICAganNvbjogJ25hbWUnLFxuICAgIGpzOiAnbmFtZScsXG4gICAgdHlwOiAvKiNfX1BVUkVfXyovdSh1bmRlZmluZWQsICcnKVxuICB9XSwgJ2FueScpLFxuICBTdHlsZTogWydiYXInLCAnY2FuZGxlJywgJ2N1c3RvbScsICdoZWF0bWFwJywgJ2hpc3RvZ3JhbScsICdsaW5lJywgJ21vdW50YWluJywgJ3BpZScsICdzY2F0dGVyJywgJ3N0YWNrZWQtYmFyJ11cbn07XG5cbnZhciBJbnRlbnRzO1xuKGZ1bmN0aW9uIChJbnRlbnRzKSB7XG4gIEludGVudHNbXCJTdGFydENhbGxcIl0gPSBcIlN0YXJ0Q2FsbFwiO1xuICBJbnRlbnRzW1wiU3RhcnRDaGF0XCJdID0gXCJTdGFydENoYXRcIjtcbiAgSW50ZW50c1tcIlN0YXJ0RW1haWxcIl0gPSBcIlN0YXJ0RW1haWxcIjtcbiAgSW50ZW50c1tcIlZpZXdBbmFseXNpc1wiXSA9IFwiVmlld0FuYWx5c2lzXCI7XG4gIEludGVudHNbXCJWaWV3Q2hhcnRcIl0gPSBcIlZpZXdDaGFydFwiO1xuICBJbnRlbnRzW1wiVmlld0NvbnRhY3RcIl0gPSBcIlZpZXdDb250YWN0XCI7XG4gIEludGVudHNbXCJWaWV3SG9sZGluZ3NcIl0gPSBcIlZpZXdIb2xkaW5nc1wiO1xuICBJbnRlbnRzW1wiVmlld0luc3RydW1lbnRcIl0gPSBcIlZpZXdJbnN0cnVtZW50XCI7XG4gIEludGVudHNbXCJWaWV3SW50ZXJhY3Rpb25zXCJdID0gXCJWaWV3SW50ZXJhY3Rpb25zXCI7XG4gIEludGVudHNbXCJWaWV3TmV3c1wiXSA9IFwiVmlld05ld3NcIjtcbiAgSW50ZW50c1tcIlZpZXdPcmRlcnNcIl0gPSBcIlZpZXdPcmRlcnNcIjtcbiAgSW50ZW50c1tcIlZpZXdQcm9maWxlXCJdID0gXCJWaWV3UHJvZmlsZVwiO1xuICBJbnRlbnRzW1wiVmlld1F1b3RlXCJdID0gXCJWaWV3UXVvdGVcIjtcbiAgSW50ZW50c1tcIlZpZXdSZXNlYXJjaFwiXSA9IFwiVmlld1Jlc2VhcmNoXCI7XG59KShJbnRlbnRzIHx8IChJbnRlbnRzID0ge30pKTtcblxuZXhwb3J0IHsgQ2hhbm5lbEVycm9yLCBDb250ZXh0VHlwZXMsIENvbnZlcnQsIEludGVudHMsIE9wZW5FcnJvciwgUmVzb2x2ZUVycm9yLCBSZXN1bHRFcnJvciwgU3R5bGUsIGFkZENvbnRleHRMaXN0ZW5lciwgYWRkSW50ZW50TGlzdGVuZXIsIGJyb2FkY2FzdCwgY29tcGFyZVZlcnNpb25OdW1iZXJzLCBjcmVhdGVQcml2YXRlQ2hhbm5lbCwgZmRjM1JlYWR5LCBmaW5kSW5zdGFuY2VzLCBmaW5kSW50ZW50LCBmaW5kSW50ZW50c0J5Q29udGV4dCwgZ2V0QXBwTWV0YWRhdGEsIGdldEN1cnJlbnRDaGFubmVsLCBnZXRJbmZvLCBnZXRPckNyZWF0ZUNoYW5uZWwsIGdldFN5c3RlbUNoYW5uZWxzLCBnZXRVc2VyQ2hhbm5lbHMsIGpvaW5DaGFubmVsLCBqb2luVXNlckNoYW5uZWwsIGxlYXZlQ3VycmVudENoYW5uZWwsIG9wZW4sIHJhaXNlSW50ZW50LCByYWlzZUludGVudEZvckNvbnRleHQsIHZlcnNpb25Jc0F0TGVhc3QgfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWZkYzMuZXNtLmpzLm1hcFxuIiwidmFyIGU9e2Q6KHQsbik9Pntmb3IodmFyIHIgaW4gbillLm8obixyKSYmIWUubyh0LHIpJiZPYmplY3QuZGVmaW5lUHJvcGVydHkodCxyLHtlbnVtZXJhYmxlOiEwLGdldDpuW3JdfSl9LG86KGUsdCk9Pk9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChlLHQpfSx0PXt9O2UuZCh0LHtBZGFwdGVyRXJyb3I6KCk9PkFkYXB0ZXJFcnJvcixBcGlFcnJvcjooKT0+QXBpRXJyb3IsSW5pdGlhbGl6YXRpb25FcnJvcjooKT0+SW5pdGlhbGl6YXRpb25FcnJvcixJbnRlcm9wRXJyb3I6KCk9PkludGVyb3BFcnJvcixUZXJtaW5hbENvbm5lY3RSZXF1ZXN0RXJyb3I6KCk9PlRlcm1pbmFsQ29ubmVjdFJlcXVlc3RFcnJvcixUZXJtaW5hbENvbm5lY3Rpb25FcnJvcjooKT0+VGVybWluYWxDb25uZWN0aW9uRXJyb3IsY29ubmVjdDooKT0+dGUsZGlzYWJsZUxvZ2dpbmc6KCk9PkksZW5hYmxlTG9nZ2luZzooKT0+QSxnZXRTZWN1cml0eUZyb21JbnN0cnVtZW50Q29udGV4dDooKT0+Yn0pO2NsYXNzIEFwaUVycm9yIGV4dGVuZHMgRXJyb3J7Y29uc3RydWN0b3IoZT1cIkFuIHVuZXhwZWN0ZWQgZXJyb3IgaGFzIG9jY3VycmVkXCIsdCl7c3VwZXIoZSksdGhpcy5uYW1lPXRoaXMuY29uc3RydWN0b3IubmFtZSx0aGlzLnN0YWNrPXRoaXMuc3RhY2s/LnJlcGxhY2UoL14oXFx3KkVycm9yKS8sYCR7dGhpcy5jb25zdHJ1Y3Rvci5uYW1lfWApLHQmJih0aGlzLmRhdGE9dCl9fWNsYXNzIEFkYXB0ZXJFcnJvciBleHRlbmRzIEFwaUVycm9ye2NvbnN0cnVjdG9yKGU9XCJGYWlsZWQgdG8gZXhlY3V0ZSBhZGFwdGVyIGZ1bmN0aW9uXCIsdCl7c3VwZXIoZSx0KX19Y2xhc3MgSW5pdGlhbGl6YXRpb25FcnJvciBleHRlbmRzIEFwaUVycm9ye2NvbnN0cnVjdG9yKGU9XCJGYWlsZWQgdG8gaW5pdGlhbGl6ZSBhZGFwdGVyXCIsdCl7c3VwZXIoZSx0KX19Y2xhc3MgSW50ZXJvcEVycm9yIGV4dGVuZHMgQXBpRXJyb3J7Y29uc3RydWN0b3IoZT1cIkZhaWxlZCB0byBleGVjdXRlIHRoZSBpbnRlcm9wIGZ1bmN0aW9uXCIsdCl7c3VwZXIoZSx0KX19Y2xhc3MgUGFyYW1ldGVyRXJyb3IgZXh0ZW5kcyBBcGlFcnJvcntjb25zdHJ1Y3RvcihlKXtzdXBlcihlPWU/P1wiSW52YWxpZCBwYXJhbWV0ZXIgZGV0ZWN0ZWRcIil9fWNsYXNzIFRlcm1pbmFsQ29ubmVjdGlvbkVycm9yIGV4dGVuZHMgQXBpRXJyb3J7Y29uc3RydWN0b3IoZT1cIkZhaWxlZCB0byBjb25uZWN0IHRvIHRoZSB0ZXJtaW5hbFwiLHQpe3N1cGVyKGUsdCl9fWNsYXNzIFRlcm1pbmFsQ29ubmVjdFJlcXVlc3RFcnJvciBleHRlbmRzIEFwaUVycm9ye2NvbnN0cnVjdG9yKGU9XCJUZXJtaW5hbCBDb25uZWN0IHJlcXVlc3QgZmFpbGVkXCIsdCl7c3VwZXIoZSx0KX19ZnVuY3Rpb24gbihlKXtyZXR1cm57YXJyYXlJdGVtczplfX1mdW5jdGlvbiByKCl7Zm9yKHZhciBlPWFyZ3VtZW50cy5sZW5ndGgsdD1uZXcgQXJyYXkoZSksbj0wO248ZTtuKyspdFtuXT1hcmd1bWVudHNbbl07cmV0dXJue3VuaW9uTWVtYmVyczp0fX1mdW5jdGlvbiBvKGUsdCl7cmV0dXJue3Byb3BzOmUsYWRkaXRpb25hbDp0fX1mdW5jdGlvbiBhKGUpe3JldHVybntwcm9wczpbXSxhZGRpdGlvbmFsOmV9fWZ1bmN0aW9uIGkoZSl7cmV0dXJue3JlZjplfX12YXIgcyxjLHUsbCxwO0RhdGUsRGF0ZSxEYXRlLERhdGUsRGF0ZSxEYXRlLERhdGUsRGF0ZSxEYXRlLERhdGUsRGF0ZSxEYXRlLERhdGUsRGF0ZSxEYXRlLERhdGUsRGF0ZSxEYXRlLERhdGUsRGF0ZSxEYXRlLERhdGUsRGF0ZSxEYXRlLERhdGUsRGF0ZSxEYXRlLERhdGUsRGF0ZSxEYXRlLERhdGUsRGF0ZSxEYXRlLERhdGUsRGF0ZSxEYXRlLERhdGUsRGF0ZSxEYXRlLERhdGUsRGF0ZSxEYXRlLERhdGUsRGF0ZSxEYXRlLERhdGUsRGF0ZSxEYXRlLERhdGUsRGF0ZSxEYXRlLERhdGUsRGF0ZSxEYXRlLERhdGUsRGF0ZSxEYXRlLERhdGUsRGF0ZSxEYXRlLERhdGUsRGF0ZSxEYXRlLERhdGU7IWZ1bmN0aW9uKGUpe2UuQXBwTm90Rm91bmQ9XCJBcHBOb3RGb3VuZFwiLGUuRXJyb3JPbkxhdW5jaD1cIkVycm9yT25MYXVuY2hcIixlLkFwcFRpbWVvdXQ9XCJBcHBUaW1lb3V0XCIsZS5SZXNvbHZlclVuYXZhaWxhYmxlPVwiUmVzb2x2ZXJVbmF2YWlsYWJsZVwiLGUuTWFsZm9ybWVkQ29udGV4dD1cIk1hbGZvcm1lZENvbnRleHRcIixlLkRlc2t0b3BBZ2VudE5vdEZvdW5kPVwiRGVza3RvcEFnZW50Tm90Rm91bmRcIn0oc3x8KHM9e30pKSxmdW5jdGlvbihlKXtlLk5vQXBwc0ZvdW5kPVwiTm9BcHBzRm91bmRcIixlLlJlc29sdmVyVW5hdmFpbGFibGU9XCJSZXNvbHZlclVuYXZhaWxhYmxlXCIsZS5Vc2VyQ2FuY2VsbGVkPVwiVXNlckNhbmNlbGxlZFJlc29sdXRpb25cIixlLlJlc29sdmVyVGltZW91dD1cIlJlc29sdmVyVGltZW91dFwiLGUuVGFyZ2V0QXBwVW5hdmFpbGFibGU9XCJUYXJnZXRBcHBVbmF2YWlsYWJsZVwiLGUuVGFyZ2V0SW5zdGFuY2VVbmF2YWlsYWJsZT1cIlRhcmdldEluc3RhbmNlVW5hdmFpbGFibGVcIixlLkludGVudERlbGl2ZXJ5RmFpbGVkPVwiSW50ZW50RGVsaXZlcnlGYWlsZWRcIixlLk1hbGZvcm1lZENvbnRleHQ9XCJNYWxmb3JtZWRDb250ZXh0XCIsZS5EZXNrdG9wQWdlbnROb3RGb3VuZD1cIkRlc2t0b3BBZ2VudE5vdEZvdW5kXCJ9KGN8fChjPXt9KSksZnVuY3Rpb24oZSl7ZS5Ob1Jlc3VsdFJldHVybmVkPVwiTm9SZXN1bHRSZXR1cm5lZFwiLGUuSW50ZW50SGFuZGxlclJlamVjdGVkPVwiSW50ZW50SGFuZGxlclJlamVjdGVkXCJ9KHV8fCh1PXt9KSksZnVuY3Rpb24oZSl7ZS5Ob0NoYW5uZWxGb3VuZD1cIk5vQ2hhbm5lbEZvdW5kXCIsZS5BY2Nlc3NEZW5pZWQ9XCJBY2Nlc3NEZW5pZWRcIixlLkNyZWF0aW9uRmFpbGVkPVwiQ3JlYXRpb25GYWlsZWRcIixlLk1hbGZvcm1lZENvbnRleHQ9XCJNYWxmb3JtZWRDb250ZXh0XCJ9KGx8fChsPXt9KSksZnVuY3Rpb24oZSl7ZS5SZXNwb25zZVRpbWVkT3V0PVwiUmVzcG9uc2VUb0JyaWRnZVRpbWVkT3V0XCIsZS5BZ2VudERpc2Nvbm5lY3RlZD1cIkFnZW50RGlzY29ubmVjdGVkXCIsZS5Ob3RDb25uZWN0ZWRUb0JyaWRnZT1cIk5vdENvbm5lY3RlZFRvQnJpZGdlXCIsZS5NYWxmb3JtZWRNZXNzYWdlPVwiTWFsZm9ybWVkTWVzc2FnZVwifShwfHwocD17fSkpO3ZhciBkOyFmdW5jdGlvbihlKXtlLkNoYXJ0PVwiZmRjMy5jaGFydFwiLGUuQ2hhdEluaXRTZXR0aW5ncz1cImZkYzMuY2hhdC5pbml0U2V0dGluZ3NcIixlLkNoYXRSb29tPVwiZmRjMy5jaGF0LnJvb21cIixlLkNvbnRhY3Q9XCJmZGMzLmNvbnRhY3RcIixlLkNvbnRhY3RMaXN0PVwiZmRjMy5jb250YWN0TGlzdFwiLGUuQ291bnRyeT1cImZkYzMuY291bnRyeVwiLGUuQ3VycmVuY3k9XCJmZGMzLmN1cnJlbmN5XCIsZS5FbWFpbD1cImZkYzMuZW1haWxcIixlLkluc3RydW1lbnQ9XCJmZGMzLmluc3RydW1lbnRcIixlLkluc3RydW1lbnRMaXN0PVwiZmRjMy5pbnN0cnVtZW50TGlzdFwiLGUuSW50ZXJhY3Rpb249XCJmZGMzLmludGVyYWN0aW9uXCIsZS5Ob3RoaW5nPVwiZmRjMy5ub3RoaW5nXCIsZS5Pcmdhbml6YXRpb249XCJmZGMzLm9yZ2FuaXphdGlvblwiLGUuUG9ydGZvbGlvPVwiZmRjMy5wb3J0Zm9saW9cIixlLlBvc2l0aW9uPVwiZmRjMy5wb3NpdGlvblwiLGUuQ2hhdFNlYXJjaENyaXRlcmlhPVwiZmRjMy5jaGF0LnNlYXJjaENyaXRlcmlhXCIsZS5UaW1lUmFuZ2U9XCJmZGMzLnRpbWVyYW5nZVwiLGUuVHJhbnNhY3Rpb25SZXN1bHQ9XCJmZGMzLnRyYW5zYWN0aW9uUmVzdWx0XCIsZS5WYWx1YXRpb249XCJmZGMzLnZhbHVhdGlvblwifShkfHwoZD17fSkpO2Z1bmN0aW9uIGcoZSl7cmV0dXJue2FycmF5SXRlbXM6ZX19ZnVuY3Rpb24gbSgpe2Zvcih2YXIgZT1hcmd1bWVudHMubGVuZ3RoLHQ9bmV3IEFycmF5KGUpLG49MDtuPGU7bisrKXRbbl09YXJndW1lbnRzW25dO3JldHVybnt1bmlvbk1lbWJlcnM6dH19ZnVuY3Rpb24gZihlLHQpe3JldHVybntwcm9wczplLGFkZGl0aW9uYWw6dH19ZnVuY3Rpb24gdyhlKXtyZXR1cm57cHJvcHM6W10sYWRkaXRpb25hbDplfX1mdW5jdGlvbiBoKGUpe3JldHVybntyZWY6ZX19dmFyIHk7RGF0ZSxEYXRlLERhdGUsRGF0ZSxEYXRlLERhdGU7IWZ1bmN0aW9uKGUpe2UuQ3JlYXRlSW50ZXJhY3Rpb249XCJDcmVhdGVJbnRlcmFjdGlvblwiLGUuU2VuZENoYXRNZXNzYWdlPVwiU2VuZENoYXRNZXNzYWdlXCIsZS5TdGFydENhbGw9XCJTdGFydENhbGxcIixlLlN0YXJ0Q2hhdD1cIlN0YXJ0Q2hhdFwiLGUuU3RhcnRFbWFpbD1cIlN0YXJ0RW1haWxcIixlLlZpZXdBbmFseXNpcz1cIlZpZXdBbmFseXNpc1wiLGUuVmlld0NoYXQ9XCJWaWV3Q2hhdFwiLGUuVmlld0NoYXJ0PVwiVmlld0NoYXJ0XCIsZS5WaWV3Q29udGFjdD1cIlZpZXdDb250YWN0XCIsZS5WaWV3SG9sZGluZ3M9XCJWaWV3SG9sZGluZ3NcIixlLlZpZXdJbnN0cnVtZW50PVwiVmlld0luc3RydW1lbnRcIixlLlZpZXdJbnRlcmFjdGlvbnM9XCJWaWV3SW50ZXJhY3Rpb25zXCIsZS5WaWV3TWVzc2FnZXM9XCJWaWV3TWVzc2FnZXNcIixlLlZpZXdOZXdzPVwiVmlld05ld3NcIixlLlZpZXdPcmRlcnM9XCJWaWV3T3JkZXJzXCIsZS5WaWV3UHJvZmlsZT1cIlZpZXdQcm9maWxlXCIsZS5WaWV3UXVvdGU9XCJWaWV3UXVvdGVcIixlLlZpZXdSZXNlYXJjaD1cIlZpZXdSZXNlYXJjaFwifSh5fHwoeT17fSkpO2NvbnN0IEM9ZT0+e2NvbnN0IHQ9RGF0ZS5wYXJzZShlKTtpZighTnVtYmVyLmlzTmFOKHQpKXJldHVybiBuZXcgRGF0ZSh0KX0sRT1lPT57bGV0IHQ9L1xccysoW1xcdy1dKyQpLy5leGVjKGUpPy5bMV07aWYodClyZXR1cm4gdD10LmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpK3Quc2xpY2UoMSkudG9Mb3dlckNhc2UoKS5yZXBsYWNlKFwiLW1cIixcIi1NXCIpLHR9LGI9ZT0+e2lmKGUudHlwZSE9PWQuSW5zdHJ1bWVudClyZXR1cm47Y29uc3R7aWQ6dCxtYXJrZXQ6bn09ZSx7QkJHOnIsRklHSTpvLHRpY2tlcjphfT10O2lmKHJ8fG8pcmV0dXJuIHI/P287aWYoIWEpcmV0dXJuO3JldHVybmAke2F9ICR7bj8uQkJHP24uQkJHOlwiVVNcIn0gRXF1aXR5YH07bGV0IHY9ITE7Y29uc3QgRD1cIltAb3BlbmZpbi9ibG9vbWJlcmddXCIsST0oKT0+e3Y9ITF9LEE9KCk9Pnt2PSEwLE4oXCJ2Mi4xLjBcIil9LFI9KGUsdCk9PntpZighdilyZXR1cm47Y29uc3Qgbj10P2Ake0R9ICR7dH1gOkQ7ZSBpbnN0YW5jZW9mIEFwaUVycm9yJiZlLmRhdGE/Y29uc29sZS5lcnJvcihuLGUsZS5kYXRhKTpjb25zb2xlLmVycm9yKG4sZSl9LE49KC4uLmUpPT57diYmY29uc29sZS5sb2coRCwuLi5lKX0seD0oLi4uZSk9Pnt2JiZjb25zb2xlLndhcm4oRCwuLi5lKX07dmFyIFQsUyxNO1widW5kZWZpbmVkXCI9PXR5cGVvZiBmaW4mJk9iamVjdC5hc3NpZ24od2luZG93LHtmaW46e319KSxPYmplY3QuYXNzaWduKGZpbix7SW50ZWdyYXRpb25zOntCbG9vbWJlcmc6e2VuYWJsZUxvZ2dpbmc6QSxkaXNhYmxlTG9nZ2luZzpJfX19KSxmdW5jdGlvbihlKXtlLkNhbmNlbFN1YnNjcmlwdGlvbj1cIkNhbmNlbFN1YnNjcmlwdGlvblwiLGUuQ29ubmVjdD1cIkNvbm5lY3RcIixlLkNyZWF0ZVN1YnNjcmlwdGlvbj1cIkNyZWF0ZVN1YnNjcmlwdGlvblwiLGUuRGlzY29ubmVjdD1cIkRpc2Nvbm5lY3RcIixlLkV4ZWN1dGVSZXF1ZXN0PVwiRXhlY3V0ZVJlcXVlc3RcIixlLkxvZ01lc3NhZ2U9XCJMb2dNZXNzYWdlXCIsZS5TdWJzY3JpcHRpb25FdmVudD1cIlN1YnNjcmlwdGlvbkV2ZW50XCJ9KFR8fChUPXt9KSksZnVuY3Rpb24oZSl7ZVtlLkVycm9yPTBdPVwiRXJyb3JcIixlW2UuSW5mbz0xXT1cIkluZm9cIixlW2UuV2Fybj0yXT1cIldhcm5cIn0oU3x8KFM9e30pKSxmdW5jdGlvbihlKXtlLkxvY2FsPVwiTG9jYWxcIixlLlJlbW90ZT1cIlJlbW90ZVwifShNfHwoTT17fSkpO2NvbnN0IFY9ZT0+YXN5bmMoKT0+e04oXCJSZXRyaWV2aW5nIGxhdW5jaHBhZCBncm91cHNcIik7Y29uc3QgdD17cXVlcnk6XCJxdWVyeSB7XFxuICAgICAgICAgIGdyb3VwcyB7XFxuICAgICAgICAgICAgLi4uIG9uIEdyb3VwcyB7XFxuICAgICAgICAgICAgICBpdGVtcyB7XFxuICAgICAgICAgICAgICAgIGlkXFxuICAgICAgICAgICAgICAgIG5hbWVcXG4gICAgICAgICAgICAgICAgdHlwZVxcbiAgICAgICAgICAgICAgICB2YWx1ZVxcbiAgICAgICAgICAgICAgfVxcbiAgICAgICAgICAgIH1cXG4gICAgICAgICAgICAuLi4gb24gRXJyb3Ige1xcbiAgICAgICAgICAgICAgZXJyb3JDYXRlZ29yeVxcbiAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlXFxuICAgICAgICAgICAgfVxcbiAgICAgICAgICB9XFxuICAgICAgICB9XCJ9O2xldCBuO3RyeXtuPWF3YWl0IGUoVC5FeGVjdXRlUmVxdWVzdCx0KX1jYXRjaChlKXtjb25zdCB0PW5ldyBBZGFwdGVyRXJyb3Iodm9pZCAwLGUpO3Rocm93IFIodCksdH1pZighbi5zdWNjZXNzKXtjb25zdCBlPW5ldyBUZXJtaW5hbENvbm5lY3RSZXF1ZXN0RXJyb3Iobi5lcnJvcj8ubWVzc2FnZSxuLmVycm9yKTt0aHJvdyBSKGUpLGV9aWYoIW4uZGF0YSl7Y29uc3QgZT1uZXcgVGVybWluYWxDb25uZWN0UmVxdWVzdEVycm9yKFwiVW5leHBlY3RlZCBlbXB0eSByZXNwb25zZSBkYXRhXCIsbik7dGhyb3cgUihlKSxlfWNvbnN0e2dyb3VwczpyfT1KU09OLnBhcnNlKG4uZGF0YSk7aWYoci5pdGVtcylyZXR1cm4gci5pdGVtcztjb25zdCBvPW5ldyBUZXJtaW5hbENvbm5lY3RSZXF1ZXN0RXJyb3Ioci5lcnJvck1lc3NhZ2Uscik7dGhyb3cgUihvKSxvfSwkPWU9PmFzeW5jKHQsbik9PntpZihudWxsPT10fHxcIm51bWJlclwiIT10eXBlb2YgdHx8TnVtYmVyLmlzTmFOKHQpKXRocm93IG5ldyBQYXJhbWV0ZXJFcnJvcihcIkdyb3VwIElEIG11c3QgYmUgYSB2YWxpZCBudW1iZXJcIik7aWYoIW4/LnRyaW0oKSl0aHJvdyBuZXcgUGFyYW1ldGVyRXJyb3IoXCJHcm91cCB2YWx1ZSBtdXN0IGJlIGEgbm9uLWVtcHR5IHN0cmluZ1wiKTtOKFwiU2V0dGluZyBncm91cCB2YWx1ZVwiLHtncm91cElkOnQsbmV3VmFsdWU6bn0pO2NvbnN0IHI9e3F1ZXJ5OmBtdXRhdGlvbiB7XFxuICAgICAgICAgIHNldEdyb3VwVmFsdWUoXFxuICAgICAgICAgICAgZmlsdGVyOiB7aWQ6IFske3R9XX0sXFxuICAgICAgICAgICAgdmFsdWU6IFwiJHtufVwiKSB7XFxuICAgICAgICAgICAgLi4uIG9uIEdyb3VwUmVzdWx0cyB7XFxuICAgICAgICAgICAgICByZXN1bHRzIHtcXG4gICAgICAgICAgICAgICAgcmVzdWx0IHtcXG4gICAgICAgICAgICAgICAgICBzdWNjZWVkZWRcXG4gICAgICAgICAgICAgICAgICBkZXRhaWxzXFxuICAgICAgICAgICAgICAgIH1cXG4gICAgICAgICAgICAgIH1cXG4gICAgICAgICAgICB9XFxuICAgICAgICAgICAgLi4uIG9uIEVycm9yIHtcXG4gICAgICAgICAgICAgIGVycm9yQ2F0ZWdvcnlcXG4gICAgICAgICAgICAgIGVycm9yTWVzc2FnZVxcbiAgICAgICAgICAgIH1cXG4gICAgICAgICAgfVxcbiAgICAgICAgfWB9O2xldCBvO3RyeXtvPWF3YWl0IGUoVC5FeGVjdXRlUmVxdWVzdCxyKX1jYXRjaChlKXtjb25zdCB0PW5ldyBBZGFwdGVyRXJyb3Iodm9pZCAwLGUpO3Rocm93IFIodCksdH1pZighby5zdWNjZXNzKXtjb25zdCBlPW5ldyBUZXJtaW5hbENvbm5lY3RSZXF1ZXN0RXJyb3Ioby5lcnJvcj8ubWVzc2FnZSxvLmVycm9yKTt0aHJvdyBSKGUpLGV9aWYoIW8uZGF0YSl7Y29uc3QgZT1uZXcgVGVybWluYWxDb25uZWN0UmVxdWVzdEVycm9yKFwiVW5leHBlY3RlZCBlbXB0eSByZXNwb25zZSBkYXRhXCIsbyk7dGhyb3cgUihlKSxlfWNvbnN0e3NldEdyb3VwVmFsdWU6YX09SlNPTi5wYXJzZShvLmRhdGEpO2lmKFwiZXJyb3JNZXNzYWdlXCJpbiBhKXtjb25zdCBlPW5ldyBUZXJtaW5hbENvbm5lY3RSZXF1ZXN0RXJyb3IoYS5lcnJvck1lc3NhZ2UsYSk7dGhyb3cgUihlKSxlfX0scT1uZXcgTWFwLEI9YXN5bmMoZSx0LG4scik9Pntjb25zdCBvPWF3YWl0IE8oZSkodCk7aWYoIW8pcmV0dXJuO2NvbnN0IGE9YXdhaXQoZT0+YXN5bmModD1bXSk9PntOKFwiQ3JlYXRpbmcgZ3JvdXAgc3Vic2NyaXB0aW9uXCIse2dyb3VwSWRGaWx0ZXI6dH0pO2NvbnN0IG49e3F1ZXJ5OmBzdWJzY3JpcHRpb24ge1xcbiAgICAgICAgc3Vic2NyaWJlR3JvdXBFdmVudHMgKFxcbiAgICAgICAgICBmaWx0ZXI6e1xcbiAgICAgICAgICAgIGV2ZW50OiBbXFxuICAgICAgICAgICAgICBWQUxVRV9DSEFOR0VEXFxuICAgICAgICAgICAgXVxcbiAgICAgICAgICAgICR7dC5sZW5ndGg/YCxncm91cDoge2lkOiAke0pTT04uc3RyaW5naWZ5KHQpfX1gOlwiXCJ9XFxuICAgICAgICAgIH0pe1xcbiAgICAgICAgICB0eXBlXFxuICAgICAgICAgIGdyb3Vwe1xcbiAgICAgICAgICAgIGlkXFxuICAgICAgICAgICAgbmFtZVxcbiAgICAgICAgICAgIHZhbHVlXFxuICAgICAgICAgIH1cXG4gICAgICAgIH1cXG4gICAgICB9YH07bGV0IHI7dHJ5e3I9YXdhaXQgZShULkNyZWF0ZVN1YnNjcmlwdGlvbixuKX1jYXRjaChlKXtjb25zdCB0PW5ldyBBZGFwdGVyRXJyb3Iodm9pZCAwLGUpO3Rocm93IFIodCksdH1pZighci5zdWNjZXNzKXtjb25zdCBlPW5ldyBUZXJtaW5hbENvbm5lY3RSZXF1ZXN0RXJyb3Ioci5lcnJvcj8ubWVzc2FnZSxyLmVycm9yKTt0aHJvdyBSKGUpLGV9aWYoIXIuZGF0YSl7Y29uc3QgZT1uZXcgVGVybWluYWxDb25uZWN0UmVxdWVzdEVycm9yKFwiVW5leHBlY3RlZCBlbXB0eSByZXNwb25zZSBkYXRhXCIscik7dGhyb3cgUihlKSxlfWNvbnN0e3N1YnNjcmlwdGlvbklkOm99PUpTT04ucGFyc2Uoci5kYXRhKTtyZXR1cm4gb30pKGUpKG8pLGk9e2lkOmEsbGlzdGVuZXI6VShuLHIpLHVuc3Vic2NyaWJlOkYoZSxhKX07cmV0dXJuIHEuc2V0KGEsaSksaX0sRj0oZSx0KT0+YXN5bmMoKT0+e04oXCJVbnN1YnNjcmliaW5nIGdyb3VwIGV2ZW50c1wiLHtzdWJzY3JpcHRpb25JZDp0fSk7dHJ5e2F3YWl0KGU9PmFzeW5jIHQ9Pntjb25zdCBuPXtzdWJzY3JpcHRpb25JZDp0fTtsZXQgcjt0cnl7cj1hd2FpdCBlKFQuQ2FuY2VsU3Vic2NyaXB0aW9uLG4pfWNhdGNoKGUpe2NvbnN0IHQ9bmV3IEFkYXB0ZXJFcnJvcih2b2lkIDAsZSk7dGhyb3cgUih0KSx0fWlmKCFyLnN1Y2Nlc3Mpe2NvbnN0IGU9bmV3IFRlcm1pbmFsQ29ubmVjdFJlcXVlc3RFcnJvcihyLmVycm9yPy5tZXNzYWdlLHIuZXJyb3IpO3Rocm93IFIoZSksZX19KShlKSh0KX1jYXRjaChlKXtSKGUpfXEuZGVsZXRlKHQpfSxVPShlLHQpPT5hc3luYyBuPT57dHJ5e2U/LihuKSxOKFwiU2V0dGluZyBuZXcgY29udGV4dDogXCIsbiksYXdhaXQgZmluLm1lLmludGVyb3Auc2V0Q29udGV4dChuKX1jYXRjaChlKXtjb25zdCBuPW5ldyBJbnRlcm9wRXJyb3Iodm9pZCAwLGUpO1IobiksdD8uKG4pfX0sUD1hc3luYyhlLHQpPT57TihcIkdyb3VwIGV2ZW50IHJlY2VpdmVkXCIse2RhdGE6dCxzdWJzY3JpcHRpb25JZDplfSk7Y29uc3R7Z3JvdXA6bn09dC5zdWJzY3JpYmVHcm91cEV2ZW50cztpZighbilyZXR1cm4gdm9pZCB4KFwiUmVjZWl2ZWQgZ3JvdXAgZXZlbnQgd2l0aCBubyBncm91cFwiLHtzdWJzY3JpcHRpb25JZDplfSk7aWYoIXEuaGFzKGUpKXJldHVybiB2b2lkIHgoXCJSZWNlaXZlZCBncm91cCBldmVudCBmb3IgdW5rbm93biBzdWJzY3JpcHRpb25cIix7c3Vic2NyaXB0aW9uSWQ6ZX0pO2NvbnN0IHI9cS5nZXQoZSksbz0oZT0+e2NvbnN0IHQ9e3R5cGU6ZC5JbnN0cnVtZW50LGlkOntCQkc6ZX19O2lmKFwiRXF1aXR5XCI9PT1FKGUpKXtjb25zdFtuLHJdPWUuc3BsaXQoL1xccysvKTt0LmlkLnRpY2tlcj1uPy50b1VwcGVyQ2FzZSgpLHQubWFya2V0PXtCQkc6cj8udG9VcHBlckNhc2UoKX19cmV0dXJuIHR9KShuLnZhbHVlKTtvLm9wZW5maW5CYmdBcGk9ITAscj8ubGlzdGVuZXIobyl9LE89ZT0+YXN5bmMgdD0+e2lmKCF0KXJldHVybjtpZihcIipcIj09PXQpcmV0dXJuW107QXJyYXkuaXNBcnJheSh0KXx8KHQ9W3RdKTtjb25zdCBuPWF3YWl0IFYoZSkoKSxyPXQubWFwKChlPT57Y29uc3QgdD1uLmZpbmQoKHQ9PnQubmFtZT8udG9VcHBlckNhc2UoKT09PWUudG9VcHBlckNhc2UoKSkpPy5pZDtyZXR1cm4gdHx8eChgR3JvdXAgbm90IGZvdW5kOiAke2V9YCksdH0pKS5maWx0ZXIoQm9vbGVhbik7cmV0dXJuIHIubGVuZ3RoP3I6dm9pZCAwfSxHPVwiYmxvb21iZXJnLWFkYXB0ZXJcIixMPWBibG9vbWJlcmctYWRhcHRlci0ke3ZvaWQgMCE9PWNyeXB0by5yYW5kb21VVUlEP2NyeXB0by5yYW5kb21VVUlEKCk6XCIxMDAwMDAwMC0xMDAwLTQwMDAtODAwMC0xMDAwMDAwMDAwMDBcIi5yZXBsYWNlKC9bMDE4XS9nLChlPT57Y29uc3QgdD1jcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKG5ldyBVaW50OEFycmF5KDEpKVswXSYxNT4+TnVtYmVyKGUpLzQ7cmV0dXJuKE51bWJlcihlKV50KS50b1N0cmluZygxNil9KSl9YDtsZXQgaztjb25zdCB6PWFzeW5jKGU9ITEpPT57dHJ5e2lmKCFhd2FpdChhc3luYyBlPT4oYXdhaXQgZmluLkludGVyQXBwbGljYXRpb25CdXMuQ2hhbm5lbC5nZXRBbGxDaGFubmVscygpKS5zb21lKCh0PT50LmNoYW5uZWxOYW1lPT09ZSkpKShMKSl7Y29uc3R7cG9ydDp0LHNlY3VyaXR5UmVhbG06bn09YXdhaXQgZmluLlN5c3RlbS5nZXRSdW50aW1lSW5mbygpLHtsaWNlbnNlS2V5OnJ9PWF3YWl0IGZpbi5BcHBsaWNhdGlvbi5nZXRDdXJyZW50U3luYygpLmdldE1hbmlmZXN0KCksbz1maW4ubWUudXVpZDtOKFwiSW5pdGlhbGl6aW5nIGFkYXB0ZXJcIix7Y2hhbm5lbE5hbWU6TCxsaWNlbnNlS2V5OnIscG9ydDp0LHNlY3VyaXR5UmVhbG06bix1dWlkOm8sYWRhcHRlckxvZ2dpbmdFbmFibGVkOmV9KSxhd2FpdChhc3luYygpPT57Y29uc3QgZT1hd2FpdCBmaW4uQXBwbGljYXRpb24uZ2V0Q3VycmVudFN5bmMoKS5nZXRNYW5pZmVzdCgpLHQ9ZS5hcHBBc3NldHM/LmZpbmQoKGU9PmUuYWxpYXM9PT1HKSk7aWYodClyZXR1cm4gdm9pZCB4KFwiRGV0ZWN0ZWQgYWRhcHRlciBwYWNrYWdlIGluIGFwcCBtYW5pZmVzdCBhcHBBc3NldHNcIix0KTtpZihhd2FpdCBqKCkpcmV0dXJuIHZvaWQgTihcIlVzaW5nIGV4aXN0aW5nIGFkYXB0ZXIgcGFja2FnZVwiKTtjb25zdCBuPXthbGlhczpHLHNyYzpcImh0dHBzOi8vY2RuLm9wZW5maW4uY28vcmVsZWFzZS9pbnRlZ3JhdGlvbnMvYmxvb21iZXJnLzIuMS4wL09wZW5GaW4uQmxvb21iZXJnLnppcFwiLHRhcmdldDpcIk9wZW5GaW4uQmxvb21iZXJnLmV4ZVwiLHZlcnNpb246XCIyLjEuMFwifTtOKFwiRG93bmxvYWRpbmcgYWRhcHRlciBwYWNrYWdlXCIsbik7dHJ5e2F3YWl0IGZpbi5TeXN0ZW0uZG93bmxvYWRBc3NldChuLCgoKT0+e30pKX1jYXRjaChlKXt0aHJvdyBSKFwiVW5hYmxlIHRvIGRvd25sb2FkIGFkYXB0ZXIgcGFja2FnZVwiKSxlfX0pKCksZmluLlN5c3RlbS5sYXVuY2hFeHRlcm5hbFByb2Nlc3Moe2FsaWFzOkcsYXJndW1lbnRzOmBcIiR7b31cIiBcIiR7cj8/XCJcIn1cIiBcIiR7dH1cIiBcIiR7bj8/XCJcIn1cIiBcIiR7TH1cIiBcIiR7ZX1cImAsbGlmZXRpbWU6XCJhcHBsaWNhdGlvblwifSl9Y29uc3Qgbj1maW4uSW50ZXJBcHBsaWNhdGlvbkJ1cy5DaGFubmVsLmNvbm5lY3QoTCx7cGF5bG9hZDp7dmVyc2lvbjpcIjIuMS4wXCJ9fSkscj1uZXcgUHJvbWlzZSgoZT0+e3NldFRpbWVvdXQoZSwyZTQpfSkpLnRoZW4oKCgpPT57dGhyb3cgbmV3IEFwaUVycm9yKFwiQ29ubmVjdGlvbiB0byBhZGFwdGVyIHRpbWVkIG91dFwiKX0pKTtyZXR1cm4gaz1hd2FpdCBQcm9taXNlLnJhY2UoW24scl0pLGsucmVnaXN0ZXIoVC5Mb2dNZXNzYWdlLEgpLGsucmVnaXN0ZXIoVC5TdWJzY3JpcHRpb25FdmVudCxKKSxOKFwiQ29ubmVjdGVkIHRvIGFkYXB0ZXJcIix7dXVpZDprLnByb3ZpZGVySWRlbnRpdHkudXVpZH0pLHtjaGFubmVsTmFtZTpMLGRpc3BhdGNoOiguLi5lKT0+ay5kaXNwYXRjaCguLi5lKSxpbml0VGVybWluYWw6KHQ9ayxhc3luYyBlPT57Y29uc3Qgbj17YXBpS2V5OmV9O2xldCByO3RyeXtyPWF3YWl0IHQuZGlzcGF0Y2goVC5Db25uZWN0LG4pfWNhdGNoKGUpe2NvbnN0IHQ9bmV3IEFkYXB0ZXJFcnJvcih2b2lkIDAsZSk7dGhyb3cgUih0KSx0fWlmKCFyLnN1Y2Nlc3Mpe2NvbnN0IGU9bmV3IFRlcm1pbmFsQ29ubmVjdGlvbkVycm9yKHIuZXJyb3I/Lm1lc3NhZ2Usci5lcnJvcik7dGhyb3cgUihlKSxlfX0pLHZlcnNpb246XCIyLjEuMFwifX1jYXRjaChlKXtjb25zdCB0PWUgaW5zdGFuY2VvZiBBcGlFcnJvcj9uZXcgSW5pdGlhbGl6YXRpb25FcnJvcihlLm1lc3NhZ2UpOm5ldyBJbml0aWFsaXphdGlvbkVycm9yKHZvaWQgMCxlKTt0aHJvdyBSKHQpLHR9dmFyIHR9LEg9ZT0+e2NvbnN0e2xldmVsOnQsbWVzc2FnZTpufT1lLHI9XCJbYWRhcHRlcl1cIjtzd2l0Y2godCl7Y2FzZSBTLkVycm9yOlIobixyKTticmVhaztjYXNlIFMuV2Fybjp4KHIsbik7YnJlYWs7Y2FzZSBTLkluZm86ZGVmYXVsdDpOKHIsbil9fSxKPWFzeW5jIGU9Pntjb25zdHtkYXRhOnQsZXJyb3I6bixzdWJzY3JpcHRpb25JZDpyfT1lO2lmKCFyfHwhdCl7Y29uc3QgdD1uZXcgVGVybWluYWxDb25uZWN0UmVxdWVzdEVycm9yKFwiSW52YWxpZCBzdWJzY3JpcHRpb24gZXZlbnRcIixlKTt0aHJvdyBSKHQpLHR9aWYobil7Y29uc3QgZT1uZXcgVGVybWluYWxDb25uZWN0UmVxdWVzdEVycm9yKHZvaWQgMCxuKTt0aHJvdyBSKGUpLGV9Y29uc3Qgbz1KU09OLnBhcnNlKHQpO2lmKCEwPT09Qm9vbGVhbihvLnN1YnNjcmliZUdyb3VwRXZlbnRzKSlhd2FpdCBQKHIsbyk7ZWxzZSB4KFwiUmVjZWl2ZWQgdW5rbm93biBzdWJzY3JpcHRpb24gZXZlbnRcIix0KX0saj1hc3luYygpPT57dHJ5e3JldHVyblwiMi4xLjBcIj09PShhd2FpdCBmaW4uU3lzdGVtLmdldEFwcEFzc2V0SW5mbyh7YWxpYXM6R30pKS52ZXJzaW9ufWNhdGNoKGUpe3JldHVybiExfX0sUT1hc3luYyhlLHQpPT57aWYoIWUpcmV0dXJuIHZvaWQgeChcIk5vIGFjdGlvbiBzcGVjaWZpZWQsIGlnbm9yaW5nXCIpO2lmKFwiZ3JvdXBcImluIGUpe2NvbnN0e2dyb3VwOm4sc2VjdXJpdHk6cn09ZTtyZXR1cm4gdm9pZCBhd2FpdChlPT5hc3luYyh0LG4pPT57aWYoIW4pcmV0dXJuO04oYFNldHRpbmcgJHtcIipcIj09PXQ/XCJldmVyeSBncm91cFwiOmBncm91cCAke3R9YH0gc2VjdXJpdHkgdG8gJHtufWApO2NvbnN0IHI9YXdhaXQgVihlKSgpO2lmKFwiKlwiPT09dClhd2FpdCBQcm9taXNlLmFsbChyLm1hcCgodD0+dC5pZD8kKGUpKHQuaWQsbik6UHJvbWlzZS5yZXNvbHZlKCkpKSk7ZWxzZXtjb25zdCBvPXIuZmluZCgoZT0+ZS5uYW1lPy50b1VwcGVyQ2FzZSgpPT09dC50b1VwcGVyQ2FzZSgpKSk/LmlkO251bGw9PW8/eChgVW5hYmxlIHRvIHVwZGF0ZSBncm91cCBzZWN1cml0eSBmb3IgJHt0fTogZ3JvdXAgbm90IGZvdW5kYCk6YXdhaXQgJChlKShvLG4pfX0pKHQpKG4scil9Y29uc3R7bW5lbW9uaWM6bixzZWN1cml0aWVzOnIsdGFyZ2V0Om8sdGFpbDphfT1lLFtpLHNdPXI/P1tdO2F3YWl0KGU9PmFzeW5jKHQsbixyLG8sYSk9PntpZighdD8udHJpbSgpKXRocm93IG5ldyBQYXJhbWV0ZXJFcnJvcihcIk1uZW1vbmljIG11c3QgYmUgYSBub24tZW1wdHkgc3RyaW5nXCIpO2lmKG51bGw9PW58fFwic3RyaW5nXCI9PXR5cGVvZiBuJiYhbj8udHJpbSgpKXRocm93IG5ldyBQYXJhbWV0ZXJFcnJvcihcIlRhcmdldCBtdXN0IGJlIGEgbnVtYmVyICgwLTMpIG9yIG5vbi1lbXB0eSBzdHJpbmdcIik7TihcIlJ1bm5pbmcgdGVybWluYWwgZnVuY3Rpb25cIix7bW5lbW9uaWM6dCx0YXJnZXQ6bixzZWN1cml0eTE6cixzZWN1cml0eTI6byx0YWlsOmF9KTtjb25zdCBpPXQudHJpbSgpLnRvVXBwZXJDYXNlKCk7bGV0IHMsYztcIm51bWJlclwiPT10eXBlb2Ygbj8ocz1cInJ1bkZ1bmN0aW9uSW5QYW5lbFwiLGM9XCJwYW5lbDogXCIrKDE9PT1uP1wiT05FXCI6Mj09PW4/XCJUV09cIjozPT09bj9cIlRIUkVFXCI6XCJaRVJPXCIpKToocz1cInJ1bkZ1bmN0aW9uSW5UYWJcIixjPWB0YWJOYW1lOiBcIiR7bi50cmltKCl9XCJgKTtjb25zdCB1PXtxdWVyeTpgbXV0YXRpb24ge1xcbiAgICAgICAgJHtzfShpbnB1dDoge1xcbiAgICAgICAgICBtbmVtb25pYzogXCIke2l9XCIsXFxuICAgICAgICAgICR7Y30sXFxuICAgICAgICAgICR7cj9gc2VjdXJpdHkxOiBcIiR7cn1cImA6XCJcIn1cXG4gICAgICAgICAgJHtvP2BzZWN1cml0eTI6IFwiJHtvfVwiYDpcIlwifVxcbiAgICAgICAgICAke2E/YHRhaWw6IFwiJHthfVwiYDpcIlwifVxcbiAgICAgICAgfSkge1xcbiAgICAgICAgICAuLi4gb24gUmVzdWx0IHtcXG4gICAgICAgICAgICBzdWNjZWVkZWRcXG4gICAgICAgICAgICBkZXRhaWxzXFxuICAgICAgICAgIH1cXG4gICAgICAgICAgLi4uIG9uIEVycm9yIHtcXG4gICAgICAgICAgICBlcnJvckNhdGVnb3J5XFxuICAgICAgICAgICAgZXJyb3JNZXNzYWdlXFxuICAgICAgICAgIH1cXG4gICAgICAgIH1cXG4gICAgICB9YH07bGV0IGw7dHJ5e2w9YXdhaXQgZShULkV4ZWN1dGVSZXF1ZXN0LHUpfWNhdGNoKGUpe2NvbnN0IHQ9bmV3IEFkYXB0ZXJFcnJvcih2b2lkIDAsZSk7dGhyb3cgUih0KSx0fWlmKCFsLnN1Y2Nlc3Mpe2NvbnN0IGU9bmV3IFRlcm1pbmFsQ29ubmVjdFJlcXVlc3RFcnJvcihsLmVycm9yPy5tZXNzYWdlLGwuZXJyb3IpO3Rocm93IFIoZSksZX1pZihsLmRhdGEpe2NvbnN0IGU9SlNPTi5wYXJzZShsLmRhdGEpO2xldCB0O2lmKFwicnVuRnVuY3Rpb25JblRhYlwiaW4gZT90PWUucnVuRnVuY3Rpb25JblRhYi5lcnJvck1lc3NhZ2U6XCJydW5GdW5jdGlvbkluUGFuZWxcImluIGUmJih0PWUucnVuRnVuY3Rpb25JblBhbmVsLmVycm9yTWVzc2FnZSksdCl7Y29uc3Qgbj1uZXcgVGVybWluYWxDb25uZWN0UmVxdWVzdEVycm9yKHQsZSk7dGhyb3cgUihuKSxufX19KSh0KShuLG8saSxzLGEpfSxXPSgpPT5lPT57Y29uc3QgdD1lLHtuYW1lOm4saWQ6cn09dCxvPXI/LkJCRz8/bjtpZihvKXJldHVybnttbmVtb25pYzpcIkJJT1wiLHRhcmdldDowLHRhaWw6b307eChcIk5vIHZhbGlkIGlkZW50aWZpZXIgcHJvdmlkZWQgaW4gY29udGV4dCwgaWdub3JpbmdcIil9LFk9ZT0+dD0+e2NvbnN0IG49Yih0KTtpZihuKXJldHVybnttbmVtb25pYzplLHNlY3VyaXRpZXM6W25dLHRhcmdldDowfTt4KFwiTm8gc2VjdXJpdHkgcHJvdmlkZWQgaW4gY29udGV4dCwgaWdub3JpbmdcIil9LEs9YXN5bmMoZSx0LG4scik9Pntjb25zdCBvPSgoKT0+e2NvbnN0IGU9W10sdD1bXTtyZXR1cm4gZS5wdXNoKFtkLkluc3RydW1lbnQsWShcIkRFU1wiKV0pLGUucHVzaChbZC5Db250YWN0LFcoKV0pLGUucHVzaChbZC5Pcmdhbml6YXRpb24sXygpXSksdC5wdXNoKFt5LlN0YXJ0Q2hhdCxbW2QuTm90aGluZyxaKFwiSUJcIildLFtkLkNvbnRhY3QsZT0+e2NvbnN0e2lkOnQsbmFtZTpufT1lO3JldHVybnttbmVtb25pYzpcIklCXCIsdGFyZ2V0OjAsdGFpbDp0LmVtYWlsPz9ufX1dXV0pLHQucHVzaChbeS5WaWV3QW5hbHlzaXMsW1tkLk5vdGhpbmcsWihcIkFOUlwiKV0sW2QuSW5zdHJ1bWVudCxlPT57Y29uc3QgdD1iKGUpO2lmKCF0KXJldHVybiB2b2lkIHgoXCJObyBzZWN1cml0eSBwcm92aWRlZCBpbiBjb250ZXh0LCBpZ25vcmluZ1wiKTtsZXQgbjtzd2l0Y2goRSh0KSl7Y2FzZVwiRXF1aXR5XCI6Y2FzZVwiSW5kZXhcIjpuPVwiRkFcIjticmVhaztjYXNlXCJDb3JwXCI6Y2FzZVwiR292dFwiOmNhc2VcIk10Z2VcIjpjYXNlXCJNdW5pXCI6Y2FzZVwiUGZkXCI6bj1cIllBU1wiO2JyZWFrO2RlZmF1bHQ6bj1cIkFOUlwifXJldHVybnttbmVtb25pYzpuLHNlY3VyaXRpZXM6W3RdLHRhcmdldDowfX1dXV0pLHQucHVzaChbeS5WaWV3Q2hhcnQsW1tkLk5vdGhpbmcsWihcIkdJUFwiKV0sW2QuSW5zdHJ1bWVudCxZKFwiR0lQXCIpXSxbZC5DaGFydCxlPT57Y29uc3R7aW50ZXJ2YWw6dCxpbnN0cnVtZW50czpuLHJhbmdlOnIsc3R5bGU6b309ZSxhPXttbmVtb25pYzpcIkdJUFwiLHRhcmdldDowfTtsZXQgaT0hMDtjb25zdCBzPWIobj8uWzBdPz9lKTtzJiYoYS5zZWN1cml0aWVzPVtzXSk7Y29uc3R7ZW5kVGltZTpjLHN0YXJ0VGltZTp1fT1yPz97fTtpZih1KXtjb25zdCBlPUModS50b1N0cmluZygpKTtpZihlJiYoYS50YWlsPWAke2UuZ2V0TW9udGgoKSsxfS8ke2UuZ2V0RGF0ZSgpfS8ke2UuZ2V0RnVsbFllYXIoKX1gLGk9ITEsYykpe2NvbnN0IGU9QyhjLnRvU3RyaW5nKCkpO2UmJihhLnRhaWwrPWAgJHtlLmdldE1vbnRoKCkrMX0vJHtlLmdldERhdGUoKX0vJHtlLmdldEZ1bGxZZWFyKCl9YCl9fXN3aXRjaChvPy50b0xvd2VyQ2FzZSgpKXtjYXNlXCJiYXJcIjphLm1uZW1vbmljPWk/XCJJR1BPXCI6XCJHUE9cIjticmVhaztjYXNlXCJjYW5kbGVcIjphLm1uZW1vbmljPWk/XCJJR1BDXCI6XCJHUENcIjticmVhaztkZWZhdWx0OmEubW5lbW9uaWM9aT9cIkdJUFwiOlwiR1BcIn1pZighaSYmdClzd2l0Y2godC50b0xvd2VyQ2FzZSgpKXtjYXNlXCJkYWlseVwiOmEudGFpbCs9XCIgRFwiO2JyZWFrO2Nhc2VcIndlZWtseVwiOmEudGFpbCs9XCIgV1wiO2JyZWFrO2Nhc2VcIm1vbnRobHlcIjphLnRhaWwrPVwiTVwiO2JyZWFrO2Nhc2VcInF1YXJ0ZXJseVwiOmEudGFpbCs9XCIgUVwiO2JyZWFrO2Nhc2VcInllYXJseVwiOmEudGFpbCs9XCIgWVwifXJldHVybiBhfV1dXSksdC5wdXNoKFt5LlZpZXdDaGF0LFtbZC5Ob3RoaW5nLFooXCJJQlwiKV0sW2QuQ29udGFjdCxlPT57Y29uc3R7aWQ6dCxuYW1lOm59PWU7cmV0dXJue21uZW1vbmljOlwiSUJcIix0YXJnZXQ6MCx0YWlsOnQuZW1haWw/P259fV1dXSksdC5wdXNoKFt5LlZpZXdDb250YWN0LFtbZC5Ob3RoaW5nLFooXCJCSU9cIildLFtkLkNvbnRhY3QsVygpXV1dKSx0LnB1c2goW3kuVmlld0luc3RydW1lbnQsW1tkLk5vdGhpbmcsWihcIkRFU1wiKV0sW2QuSW5zdHJ1bWVudCxZKFwiREVTXCIpXV1dKSx0LnB1c2goW3kuVmlld05ld3MsW1tkLk5vdGhpbmcsWihcIkNOXCIpXSxbZC5JbnN0cnVtZW50LFkoXCJDTlwiKV1dXSksdC5wdXNoKFt5LlZpZXdQcm9maWxlLFtbZC5Ob3RoaW5nLFooXCJERVNcIildLFtkLkNvbnRhY3QsVygpXSxbZC5Pcmdhbml6YXRpb24sXygpXV1dKSx0LnB1c2goW3kuVmlld1F1b3RlLFtbZC5Ob3RoaW5nLFooXCJBTExRXCIpXSxbZC5JbnN0cnVtZW50LFkoXCJBTExRXCIpXV1dKSx0LnB1c2goW3kuVmlld1Jlc2VhcmNoLFtbZC5Ob3RoaW5nLFooXCJCUkNcIildLFtkLkluc3RydW1lbnQsWShcIkJSQ1wiKV1dXSkse2NvbnRleHRzOmUsaW50ZW50czp0fX0pKCksYT0oZT0+e2NvbnN0IHQ9KFtlXSk9PiEhKGU/P1wiXCIpLnRyaW0oKTtyZXR1cm57Y29udGV4dHM6Wy4uLmU/LmNvbnRleHRzPz9bXV0uZmlsdGVyKHQpLGludGVudHM6Wy4uLmU/LmludGVudHM/P1tdXS5maWx0ZXIoKChbZSxuXSk9Pntjb25zdCByPVsuLi5uPz9bXV0uZmlsdGVyKHQpO3JldHVybiEhKGU/P1wiXCIpLnRyaW0oKSYmci5sZW5ndGg+MH0pKX19KSh0KSxpPW5ldyBNYXAoby5jb250ZXh0cyk7YS5jb250ZXh0cz8uZm9yRWFjaCgoKFtlXSk9PntpLmhhcyhlKSYmaS5kZWxldGUoZSl9KSksby5jb250ZXh0cz1BcnJheS5mcm9tKGkpO2NvbnN0IHM9bmV3IE1hcChvLmludGVudHMpO2EuaW50ZW50cz8uZm9yRWFjaCgoKFtlXSk9PntzLmhhcyhlKSYmcy5kZWxldGUoZSl9KSksby5pbnRlbnRzPUFycmF5LmZyb20ocyk7Y29uc3QgYz1bLi4uby5jb250ZXh0cywuLi5hLmNvbnRleHRzPz9bXV0sdT1bLi4uby5pbnRlbnRzLC4uLmEuaW50ZW50cz8/W11dLGw9W107bGV0IHA7Yy5sZW5ndGgmJmwucHVzaChmaW4ubWUuaW50ZXJvcC5hZGRDb250ZXh0SGFuZGxlcigoKGUsdCxuLHIpPT5hc3luYyBvPT57bz8hMCE9PW8ub3BlbmZpbkJiZ0FwaSYmKE4oXCJDb250ZXh0IHJlY2VpdmVkXCIsbyksby50eXBlIT09ZC5Ob3RoaW5nP2F3YWl0IFgoZSxvLHQsbixyKTpOKFwiTnVsbCBjb250ZXh0IHJlY2VpdmVkLCBpZ25vcmluZ1wiKSk6TihcIk5vIGNvbnRleHQgaW5mbyBwcm92aWRlZCwgaWdub3JpbmdcIil9KShlLGMsbixyKSkpLHUubGVuZ3RoJiZ1LmZvckVhY2goKChbdCxvXSk9PntsLnB1c2goZmluLm1lLmludGVyb3AucmVnaXN0ZXJJbnRlbnRIYW5kbGVyKCgoZSx0LG4scik9PmFzeW5jIG89PntOKFwiSW50ZW50IHJlY2VpdmVkXCIsbyksdD9hd2FpdCBYKGUsby5jb250ZXh0LHQsbixyKTp4KGBObyBhY3Rpb25zIGhhdmUgYmVlbiBwcm92aWRlZCBmb3IgaW50ZW50ICR7by5uYW1lfSwgaWdub3JpbmdgKX0pKGUsbyxuLHIpLHQpKX0pKTt0cnl7cD1hd2FpdCBQcm9taXNlLmFsbChsKX1jYXRjaChlKXtjb25zdCB0PW5ldyBJbnRlcm9wRXJyb3IoXCJGYWlsZWQgdG8gcmVnaXN0ZXIgaW50ZXJvcCBoYW5kbGVyc1wiLGUpO3Rocm93IFIodCksdH1yZXR1cm4gcH0sWj1lPT50PT4oe21uZW1vbmljOmUsdGFyZ2V0OjB9KSxfPSgpPT5lPT57Y29uc3R7bmFtZTp0fT1lO2lmKHQpcmV0dXJue21uZW1vbmljOlwiU0VBUlwiLHRhcmdldDowLHRhaWw6dH07eChcIk5vIHZhbGlkIGlkZW50aWZpZXIgcHJvdmlkZWQgaW4gY29udGV4dCwgaWdub3JpbmdcIil9LFg9YXN5bmMoZSx0LG4scixvKT0+e3I/Lih0KSxOKFwiUHJvY2Vzc2luZyBjb250ZXh0XCIsdCksbi5zb21lKCgoW2VdKT0+ZT09PXQudHlwZSkpP2F3YWl0IFByb21pc2UuYWxsKG4uZmlsdGVyKCgoW2VdKT0+ZT09PXQudHlwZSkpLm1hcCgoYXN5bmMoWyxuXSk9PntsZXQgcjt0cnl7cj1hd2FpdCBuKHQpfWNhdGNoKGUpe2NvbnN0IHQ9bmV3IEFwaUVycm9yKFwiVW5leHBlY3RlZCBlcnJvciBpbiBjb250ZXh0IGFjdGlvbiBoYW5kbGVyXCIsZSk7cmV0dXJuIFIodCksdm9pZCBvPy4odCl9dHJ5e2F3YWl0IFEocixlKX1jYXRjaChlKXtjb25zdCB0PWUgaW5zdGFuY2VvZiBBcGlFcnJvcj9lOm5ldyBBcGlFcnJvcih2b2lkIDAsZSk7Uih0KSxvPy4odCl9fSkpKTp4KGBObyBhY3Rpb24gaGFzIGJlZW4gZGVmaW5lZCBmb3IgY29udGV4dCB0eXBlICR7dC50eXBlfSwgaWdub3JpbmdgKX07dmFyIGVlOyFmdW5jdGlvbihlKXtlLkJsb29tYmVyZz1cIkJMT09NQkVSR1wifShlZXx8KGVlPXt9KSk7Y29uc3QgdGU9YXN5bmMoZSx0KT0+e04oXCJDcmVhdGluZyBjb25uZWN0aW9uXCIse2NvbmZpZzp0fSkscmUoZWUuQmxvb21iZXJnKTtjb25zdCBuPWF3YWl0IHoodik7YXdhaXQgbi5pbml0VGVybWluYWwoZSk7Y29uc3R7YWN0aW9uczpyLGludGVyb3BEaXNhYmxlZDpvLG9uQ29udGV4dENoYW5nZWQ6YSxvbkVycm9yOml9PXQ/P3t9LHM9dm9pZCAwPT09dD8uZ3JvdXBzP1wiKlwiOnQuZ3JvdXBzLGM9W107aWYoITAhPT1vKXtjLnB1c2goLi4uYXdhaXQgSyhuLmRpc3BhdGNoLHIsYSxpKSk7Y29uc3QgZT1hd2FpdCBCKG4uZGlzcGF0Y2gscyxhLGkpO2UmJmMucHVzaChlKX1yZXR1cm57ZGlzY29ubmVjdDpuZShuLmRpc3BhdGNoLGMpLGV4ZWN1dGVBcGlSZXF1ZXN0Oih1PW4uZGlzcGF0Y2gsYXN5bmMoZSx0KT0+e04oXCJFeGVjdXRpbmcgQVBJIHJlcXVlc3RcIix7cXVlcnk6ZX0pO2NvbnN0IG49e3F1ZXJ5OmV9O2xldCByO3QmJihuLnNlcnZpY2U9dCk7dHJ5e3I9YXdhaXQgdShULkV4ZWN1dGVSZXF1ZXN0LG4pfWNhdGNoKGUpe2NvbnN0IHQ9bmV3IEFkYXB0ZXJFcnJvcih2b2lkIDAsZSk7dGhyb3cgUih0KSx0fWlmKCFyLnN1Y2Nlc3Mpe2NvbnN0IGU9bmV3IFRlcm1pbmFsQ29ubmVjdFJlcXVlc3RFcnJvcihyLmVycm9yPy5tZXNzYWdlLHIuZXJyb3IpO3Rocm93IFIoZSksZX1pZighci5kYXRhKXtjb25zdCBlPW5ldyBUZXJtaW5hbENvbm5lY3RSZXF1ZXN0RXJyb3IoXCJVbmV4cGVjdGVkIGVtcHR5IHJlc3BvbnNlIGRhdGFcIixyKTt0aHJvdyBSKGUpLGV9Y29uc3Qgbz1KU09OLnBhcnNlKHIuZGF0YSk7aWYoXCJlcnJvck1lc3NhZ2VcImluIG8pe2NvbnN0IGU9bmV3IFRlcm1pbmFsQ29ubmVjdFJlcXVlc3RFcnJvcihvLmVycm9yTWVzc2FnZSxvKTt0aHJvdyBSKGUpLGV9cmV0dXJuIG99KX07dmFyIHV9LG5lPShlLHQ9W10pPT5hc3luYygpPT57TihcIkRpc2Nvbm5lY3RpbmdcIik7dHJ5e2F3YWl0IFByb21pc2UuYWxsKHQubWFwKChhc3luYyBlPT57YXdhaXQgZS51bnN1YnNjcmliZSgpfSkpKSxhd2FpdChlPT5hc3luYygpPT57bGV0IHQ7dHJ5e3Q9YXdhaXQgZShULkRpc2Nvbm5lY3QsbnVsbCl9Y2F0Y2goZSl7Y29uc3QgdD1uZXcgQWRhcHRlckVycm9yKHZvaWQgMCxlKTt0aHJvdyBSKHQpLHR9aWYoIXQuc3VjY2Vzcyl7Y29uc3QgZT1uZXcgVGVybWluYWxDb25uZWN0aW9uRXJyb3IoXCJGYWlsZWQgdG8gZGlzY29ubmVjdCB0ZXJtaW5hbFwiLHQuZXJyb3IpO3Rocm93IFIoZSksZX19KShlKSgpfWNhdGNoKGUpe2NvbnN0IHQ9bmV3IEFwaUVycm9yKFwiRGlzY29ubmVjdGlvbiBmYWlsZWRcIixlKTt0aHJvdyBSKHQpLHR9fSxyZT1hc3luYyBlPT57dHJ5e2F3YWl0IGZpbi5TeXN0ZW0ucmVnaXN0ZXJVc2FnZSh7dHlwZTpcImludGVncmF0aW9uLWZlYXR1cmVcIixkYXRhOnthcGlWZXJzaW9uOlwiMi4xLjBcIixjb21wb25lbnROYW1lOmV9fSl9Y2F0Y2godCl7eChgVW5hYmxlIHRvIHJlZ2lzdGVyIHVzYWdlIGZvciBmZWF0dXJlICR7ZX06ICR7dD8ubWVzc2FnZX1gKX19O3ZhciBvZT10LkFkYXB0ZXJFcnJvcixhZT10LkFwaUVycm9yLGllPXQuSW5pdGlhbGl6YXRpb25FcnJvcixzZT10LkludGVyb3BFcnJvcixjZT10LlRlcm1pbmFsQ29ubmVjdFJlcXVlc3RFcnJvcix1ZT10LlRlcm1pbmFsQ29ubmVjdGlvbkVycm9yLGxlPXQuY29ubmVjdCxwZT10LmRpc2FibGVMb2dnaW5nLGRlPXQuZW5hYmxlTG9nZ2luZyxnZT10LmdldFNlY3VyaXR5RnJvbUluc3RydW1lbnRDb250ZXh0O2V4cG9ydHtvZSBhcyBBZGFwdGVyRXJyb3IsYWUgYXMgQXBpRXJyb3IsaWUgYXMgSW5pdGlhbGl6YXRpb25FcnJvcixzZSBhcyBJbnRlcm9wRXJyb3IsY2UgYXMgVGVybWluYWxDb25uZWN0UmVxdWVzdEVycm9yLHVlIGFzIFRlcm1pbmFsQ29ubmVjdGlvbkVycm9yLGxlIGFzIGNvbm5lY3QscGUgYXMgZGlzYWJsZUxvZ2dpbmcsZGUgYXMgZW5hYmxlTG9nZ2luZyxnZSBhcyBnZXRTZWN1cml0eUZyb21JbnN0cnVtZW50Q29udGV4dH07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRpZiAoIShtb2R1bGVJZCBpbiBfX3dlYnBhY2tfbW9kdWxlc19fKSkge1xuXHRcdGRlbGV0ZSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRcdHZhciBlID0gbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIiArIG1vZHVsZUlkICsgXCInXCIpO1xuXHRcdGUuY29kZSA9ICdNT0RVTEVfTk9UX0ZPVU5EJztcblx0XHR0aHJvdyBlO1xuXHR9XG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCAqIGFzIGZkYzMgZnJvbSBcIkBmaW5vcy9mZGMzXCI7XG5pbXBvcnQge1xuXHRjb25uZWN0LFxuXHRnZXRTZWN1cml0eUZyb21JbnN0cnVtZW50Q29udGV4dCxcblx0dHlwZSBCbG9vbWJlcmdHcm91cFVwZGF0ZSxcblx0ZW5hYmxlTG9nZ2luZyxcblx0dHlwZSBCbG9vbWJlcmdDb25uZWN0aW9uQ29uZmlnLFxuXHR0eXBlIEJsb29tYmVyZ0Nvbm5lY3Rpb25cbn0gZnJvbSBcIkBvcGVuZmluL2Jsb29tYmVyZ1wiO1xuaW1wb3J0IHR5cGUgT3BlbkZpbiBmcm9tIFwiQG9wZW5maW4vY29yZVwiO1xuXG5sZXQgYmJnQ29ubmVjdGlvbjogQmxvb21iZXJnQ29ubmVjdGlvbiB8IHVuZGVmaW5lZDtcblxubGV0IHNlbGVjdGVkSW50ZW50VHlwZTogc3RyaW5nID0gXCJcIjtcbmxldCBzZWxlY3RlZEludGVudFZhbHVlOiBzdHJpbmcgPSBcIlwiO1xubGV0IGZkYzNEZW5vbWluYXRpb246IHN0cmluZyA9IFwiXCI7XG5sZXQgYmJnTW5lbW9uaWM6IHN0cmluZyA9IFwiXCI7XG5cbmxldCBidG5Db25uZWN0OiBIVE1MQnV0dG9uRWxlbWVudCB8IG51bGw7XG5sZXQgYnRuRGlzY29ubmVjdDogSFRNTEJ1dHRvbkVsZW1lbnQgfCBudWxsO1xubGV0IGJ0bkNsZWFyTG9nczogSFRNTEJ1dHRvbkVsZW1lbnQgfCBudWxsO1xubGV0IGJ0blF1ZXJ5OiBIVE1MQnV0dG9uRWxlbWVudCB8IG51bGw7XG5sZXQgaW50ZW50VHlwZUVsZW1lbnQ6IEhUTUxTZWxlY3RFbGVtZW50IHwgbnVsbDtcbmxldCBpbnRlbnRWYWx1ZUVsZW1lbnQ6IEhUTUxTZWxlY3RFbGVtZW50IHwgbnVsbDtcbmxldCBsb2dPdXRwdXQ6IEhUTUxQcmVFbGVtZW50IHwgbnVsbDtcblxuY29uc3QgQVBJX0tFWSA9IFwiXCI7XG5cbmNvbnN0IGNvbmZpZzogQmxvb21iZXJnQ29ubmVjdGlvbkNvbmZpZyA9IHtcblx0b25Db250ZXh0Q2hhbmdlZDogKGNvbnRleHQpID0+IHtcblx0XHRsb2dJbmZvcm1hdGlvbihgUmVjZWl2ZWQgY29udGV4dDogJHtKU09OLnN0cmluZ2lmeShjb250ZXh0KX1gKTtcblx0fSxcblx0b25FcnJvcjogKGVycm9yKSA9PiBsb2dJbmZvcm1hdGlvbihlcnJvci5tZXNzYWdlKSxcblx0Z3JvdXBzOiBbXCJHcm91cC1BXCJdLFxuXHRpbnRlcm9wRGlzYWJsZWQ6IGZhbHNlLFxuXHRhY3Rpb25zOiB7XG5cdFx0Y29udGV4dHM6IFtcblx0XHRcdFtcblx0XHRcdFx0ZmRjMy5Db250ZXh0VHlwZXMuSW5zdHJ1bWVudCxcblx0XHRcdFx0KGNvbnRleHQpOiBCbG9vbWJlcmdHcm91cFVwZGF0ZSB8IHVuZGVmaW5lZCA9PiB7XG5cdFx0XHRcdFx0Ly8gVXNlIHRoZSBnZXRTZWN1cml0eUZyb21JbnN0cnVtZW50Q29udGV4dCB1dGlsaXR5IGZ1bmN0aW9uIHRvIGV4dHJhY3QgdGhlIHNlY3VyaXR5IHN0cmluZyBmcm9tIHRoZSBjb250ZXh0XG5cdFx0XHRcdFx0Y29uc3Qgc2VjdXJpdHkgPSBnZXRTZWN1cml0eUZyb21JbnN0cnVtZW50Q29udGV4dChjb250ZXh0KTtcblx0XHRcdFx0XHRpZiAoIXNlY3VyaXR5KSB7XG5cdFx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGxvZ0luZm9ybWF0aW9uKGBSZWNlaXZlZCBJbnN0cnVtZW50IENvbnRleHQ6ICR7c2VjdXJpdHl9YCk7XG5cblx0XHRcdFx0XHQvLyBSZXR1cm4gYSBCbG9vbWJlcmdHcm91cFVwZGF0ZSBvYmplY3QgdGhhdCB1cGRhdGVzIExhdW5jaHBhZCBncm91cCBBIHdpdGggdGhlIHNlY3VyaXR5XG5cdFx0XHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0XHRcdGdyb3VwOiBcIkdyb3VwLUFcIixcblx0XHRcdFx0XHRcdHNlY3VyaXR5XG5cdFx0XHRcdFx0fSBhcyBCbG9vbWJlcmdHcm91cFVwZGF0ZTtcblx0XHRcdFx0fVxuXHRcdFx0XVxuXHRcdF1cblx0fVxufTtcblxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIGFzeW5jICgpID0+IHtcblx0Ly8gRW5hYmxlIGxvZ2dpbmcgaW4gdGhlIEJCRyBwYWNrYWdlXG5cdGVuYWJsZUxvZ2dpbmcoKTtcblxuXHQvLyBJbml0aWFsaXplIHRoZSBET00gZWxlbWVudHMuXG5cdGluaXRpYWxpemVET00oKTtcbn0pO1xuXG4vKipcbiAqIEluaXRpYWxpemUgdGhlIERPTS5cbiAqL1xuZnVuY3Rpb24gaW5pdGlhbGl6ZURPTSgpOiB2b2lkIHtcblx0YnRuQ29ubmVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTEJ1dHRvbkVsZW1lbnQ+KFwiI2J0bkNvbm5lY3RcIik7XG5cdGJ0bkRpc2Nvbm5lY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yPEhUTUxCdXR0b25FbGVtZW50PihcIiNidG5EaXNjb25uZWN0XCIpO1xuXHRidG5DbGVhckxvZ3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yPEhUTUxCdXR0b25FbGVtZW50PihcIiNidG5DbGVhclwiKTtcblx0YnRuUXVlcnkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yPEhUTUxCdXR0b25FbGVtZW50PihcIiNidG5RdWVyeVwiKTtcblx0aW50ZW50VHlwZUVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yPEhUTUxTZWxlY3RFbGVtZW50PihcIiNpbnRlbnRUeXBlXCIpO1xuXHRpbnRlbnRWYWx1ZUVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yPEhUTUxTZWxlY3RFbGVtZW50PihcIiNpbnRlbnRWYWx1ZVwiKTtcblx0bG9nT3V0cHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcjxIVE1MUHJlRWxlbWVudD4oXCIjbG9nT3V0cHV0XCIpO1xuXG5cdGlmIChidG5Db25uZWN0KSB7XG5cdFx0YnRuQ29ubmVjdC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgYXN5bmMgKCkgPT4ge1xuXHRcdFx0aWYgKGJ0bkNvbm5lY3QpIHtcblx0XHRcdFx0YnRuQ29ubmVjdC5kaXNhYmxlZCA9IHRydWU7XG5cdFx0XHR9XG5cdFx0XHRhd2FpdCBjb25uZWN0VG9CQkdUZXJtaW5hbCgpO1xuXHRcdFx0dXBkYXRlU3RhdGUoKTtcblx0XHR9KTtcblx0fVxuXHRpZiAoYnRuRGlzY29ubmVjdCkge1xuXHRcdGJ0bkRpc2Nvbm5lY3QuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGFzeW5jICgpID0+IHtcblx0XHRcdGlmIChidG5EaXNjb25uZWN0KSB7XG5cdFx0XHRcdGJ0bkRpc2Nvbm5lY3QuZGlzYWJsZWQgPSB0cnVlO1xuXHRcdFx0fVxuXHRcdFx0YXdhaXQgZGlzY29ubmVjdEZyb21CQkdUZXJtaW5hbCgpO1xuXHRcdFx0dXBkYXRlU3RhdGUoKTtcblx0XHR9KTtcblx0fVxuXHRpZiAoYnRuQ2xlYXJMb2dzKSB7XG5cdFx0YnRuQ2xlYXJMb2dzLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBjbGVhckxvZ3MpO1xuXHR9XG5cdGlmIChidG5RdWVyeSkge1xuXHRcdGJ0blF1ZXJ5LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmaXJlSW50ZW50Rm9yQkJHKTtcblx0fVxuXG5cdGlmIChpbnRlbnRUeXBlRWxlbWVudCkge1xuXHRcdGludGVudFR5cGVFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgKGV2ZW50KSA9PiB7XG5cdFx0XHRpZiAoaW50ZW50VHlwZUVsZW1lbnQ/LnZhbHVlKSB7XG5cdFx0XHRcdGlmIChidG5RdWVyeSkge1xuXHRcdFx0XHRcdGJ0blF1ZXJ5LmRpc2FibGVkID0gdHJ1ZTtcblx0XHRcdFx0fVxuXHRcdFx0XHRzd2l0Y2ggKGludGVudFR5cGVFbGVtZW50Py52YWx1ZSkge1xuXHRcdFx0XHRcdGNhc2UgXCJWaWV3Q2hhcnRcIjpcblx0XHRcdFx0XHRcdGxvZ0luZm9ybWF0aW9uKFxuXHRcdFx0XHRcdFx0XHRcIkludGVudCB0byBiZSBmaXJlZCBpcyBWaWV3Q2hhcnQuIENvbnRlbnQgVHlwZSBpcyBmZGMzLmluc3RydW1lbnQuIEJsb29tYmVyZyBUZXJtaW5hbCBNbmVtb25pYzogR1BcIlxuXHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRcdHNlbGVjdGVkSW50ZW50VHlwZSA9IFwiVmlld0NoYXJ0XCI7XG5cdFx0XHRcdFx0XHRmZGMzRGVub21pbmF0aW9uID0gXCJmZGMzLmluc3RydW1lbnRcIjtcblx0XHRcdFx0XHRcdGJiZ01uZW1vbmljID0gXCJHUFwiO1xuXHRcdFx0XHRcdFx0cG9wdWxhdGVTZWxlY3QoaW50ZW50VmFsdWVFbGVtZW50LCBbXG5cdFx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0XHR2YWx1ZTogXCJPUkNMXCIsXG5cdFx0XHRcdFx0XHRcdFx0bGFiZWw6IFwiT3JhY2xlIENvcnBcIlxuXHRcdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdFx0dmFsdWU6IFwiTVNGVFwiLFxuXHRcdFx0XHRcdFx0XHRcdGxhYmVsOiBcIk1pY3Jvc29mdFwiXG5cdFx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0XHR2YWx1ZTogXCJJQk1cIixcblx0XHRcdFx0XHRcdFx0XHRsYWJlbDogXCJJQk1cIlxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRdKTtcblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdGNhc2UgXCJWaWV3Q29udGFjdFwiOlxuXHRcdFx0XHRcdFx0bG9nSW5mb3JtYXRpb24oXG5cdFx0XHRcdFx0XHRcdFwiSW50ZW50IHRvIGJlIGZpcmVkIGlzIFZpZXdDb250YWN0LiBDb250ZW50IFR5cGUgaXMgZmRjMy5jb250YWN0LiBCbG9vbWJlcmcgVGVybWluYWwgTW5lbW9uaWM6IEJJT1wiXG5cdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdFx0c2VsZWN0ZWRJbnRlbnRUeXBlID0gXCJWaWV3Q29udGFjdFwiO1xuXHRcdFx0XHRcdFx0ZmRjM0Rlbm9taW5hdGlvbiA9IFwiZmRjMy5jb250YWN0XCI7XG5cdFx0XHRcdFx0XHRiYmdNbmVtb25pYyA9IFwiQklPXCI7XG5cdFx0XHRcdFx0XHRwb3B1bGF0ZVNlbGVjdChpbnRlbnRWYWx1ZUVsZW1lbnQsIFtcblx0XHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRcdHZhbHVlOiBcIldpbGxpYW0gSGVucnkgR2F0ZXNcIixcblx0XHRcdFx0XHRcdFx0XHRsYWJlbDogXCJXaWxsaWFtIEhlbnJ5IEdhdGVzXCJcblx0XHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRcdHZhbHVlOiBcIkxhcnJ5IEVsbGlzb25cIixcblx0XHRcdFx0XHRcdFx0XHRsYWJlbDogXCJMYXJyeSBFbGxpc29uXCJcblx0XHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRcdHZhbHVlOiBcIlJvYmVydCBJZ2VyXCIsXG5cdFx0XHRcdFx0XHRcdFx0bGFiZWw6IFwiUm9iZXJ0IElnZXJcIlxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRdKTtcblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdGNhc2UgXCJWaWV3SW5zdHJ1bWVudFwiOlxuXHRcdFx0XHRcdFx0bG9nSW5mb3JtYXRpb24oXG5cdFx0XHRcdFx0XHRcdFwiSW50ZW50IHRvIGJlIGZpcmVkIGlzIFZpZXdJbnN0cnVtZW50LiBDb250ZW50IFR5cGUgaXMgZmRjMy5pbnN0cnVtZW50LiBCbG9vbWJlcmcgVGVybWluYWwgTW5lbW9uaWM6IERFU1wiXG5cdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdFx0c2VsZWN0ZWRJbnRlbnRUeXBlID0gXCJWaWV3SW5zdHJ1bWVudFwiO1xuXHRcdFx0XHRcdFx0ZmRjM0Rlbm9taW5hdGlvbiA9IFwiZmRjMy5pbnN0cnVtZW50XCI7XG5cdFx0XHRcdFx0XHRiYmdNbmVtb25pYyA9IFwiREVTXCI7XG5cdFx0XHRcdFx0XHRwb3B1bGF0ZVNlbGVjdChpbnRlbnRWYWx1ZUVsZW1lbnQsIFtcblx0XHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRcdHZhbHVlOiBcIk9SQ0xcIixcblx0XHRcdFx0XHRcdFx0XHRsYWJlbDogXCJPcmFjbGUgQ29ycFwiXG5cdFx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0XHR2YWx1ZTogXCJNU0ZUXCIsXG5cdFx0XHRcdFx0XHRcdFx0bGFiZWw6IFwiTWljcm9zb2Z0XCJcblx0XHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRcdHZhbHVlOiBcIklCTVwiLFxuXHRcdFx0XHRcdFx0XHRcdGxhYmVsOiBcIklCTVwiXG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdF0pO1xuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0Y2FzZSBcIlZpZXdRdW90ZVwiOlxuXHRcdFx0XHRcdFx0bG9nSW5mb3JtYXRpb24oXG5cdFx0XHRcdFx0XHRcdFwiSW50ZW50IHRvIGJlIGZpcmVkIGlzIFZpZXdRdW90ZS4gQ29udGVudCBUeXBlIGlzIGZkYzMuaW5zdHJ1bWVudC4gQmxvb21iZXJnIFRlcm1pbmFsIE1uZW1vbmljOiBRXCJcblx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0XHRzZWxlY3RlZEludGVudFR5cGUgPSBcIlZpZXdRdW90ZVwiO1xuXHRcdFx0XHRcdFx0ZmRjM0Rlbm9taW5hdGlvbiA9IFwiZmRjMy5pbnN0cnVtZW50XCI7XG5cdFx0XHRcdFx0XHRiYmdNbmVtb25pYyA9IFwiUVwiO1xuXHRcdFx0XHRcdFx0cG9wdWxhdGVTZWxlY3QoaW50ZW50VmFsdWVFbGVtZW50LCBbXG5cdFx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0XHR2YWx1ZTogXCJPUkNMXCIsXG5cdFx0XHRcdFx0XHRcdFx0bGFiZWw6IFwiT3JhY2xlIENvcnBcIlxuXHRcdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdFx0dmFsdWU6IFwiTVNGVFwiLFxuXHRcdFx0XHRcdFx0XHRcdGxhYmVsOiBcIk1pY3Jvc29mdFwiXG5cdFx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0XHR2YWx1ZTogXCJJQk1cIixcblx0XHRcdFx0XHRcdFx0XHRsYWJlbDogXCJJQk1cIlxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRdKTtcblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHVwZGF0ZVN0YXRlKCk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cblxuXHRpZiAoaW50ZW50VmFsdWVFbGVtZW50KSB7XG5cdFx0aW50ZW50VmFsdWVFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgKCkgPT4ge1xuXHRcdFx0aWYgKGludGVudFZhbHVlRWxlbWVudCkge1xuXHRcdFx0XHRzZWxlY3RlZEludGVudFZhbHVlID0gaW50ZW50VmFsdWVFbGVtZW50LnZhbHVlO1xuXHRcdFx0XHRpZiAoc2VsZWN0ZWRJbnRlbnRWYWx1ZS5sZW5ndGggPiAwKSB7XG5cdFx0XHRcdFx0bG9nSW5mb3JtYXRpb24oXG5cdFx0XHRcdFx0XHRgYWN0aW9uOiAke3NlbGVjdGVkSW50ZW50VHlwZX0sIHR5cGU6ICR7ZmRjM0Rlbm9taW5hdGlvbn0sIGJiZyBtbmVtb25pYzogJHtiYmdNbmVtb25pY30sIHNlYXJjaCB2YWx1ZTogJHtzZWxlY3RlZEludGVudFZhbHVlfWBcblx0XHRcdFx0XHQpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHVwZGF0ZVN0YXRlKCk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cblxuXHR1cGRhdGVTdGF0ZSgpO1xufVxuXG4vKipcbiAqIENvbm5lY3QgdG8gQmxvb21iZXJnIFRlcm1pbmFsLlxuICovXG5hc3luYyBmdW5jdGlvbiBjb25uZWN0VG9CQkdUZXJtaW5hbCgpOiBQcm9taXNlPHZvaWQ+IHtcblx0dHJ5IHtcblx0XHRsb2dJbmZvcm1hdGlvbihcIkNoZWNraW5nIEJsb29tYmVyZyBUZXJtaW5hbCBTdGF0dXNcIik7XG5cblx0XHRiYmdDb25uZWN0aW9uID0gYXdhaXQgY29ubmVjdChBUElfS0VZLCBjb25maWcpO1xuXHRcdGxvZ0luZm9ybWF0aW9uKFwiQ29ubmVjdGlvbiBzdWNjZXNzZnVsXCIpO1xuXHR9IGNhdGNoIChlcnJvcikge1xuXHRcdGJiZ0Nvbm5lY3Rpb24gPSB1bmRlZmluZWQ7XG5cdFx0Y29uc29sZS5sb2coZXJyb3IpO1xuXHRcdGxvZ0luZm9ybWF0aW9uKGVycm9yVG9TdHJpbmcoZXJyb3IpKTtcblx0fVxufVxuXG4vKipcbiAqIERpc2Nvbm5lY3QgZnJvbSBCbG9vbWJlcmcgVGVybWluYWwuXG4gKi9cbmFzeW5jIGZ1bmN0aW9uIGRpc2Nvbm5lY3RGcm9tQkJHVGVybWluYWwoKTogUHJvbWlzZTx2b2lkPiB7XG5cdGlmIChiYmdDb25uZWN0aW9uKSB7XG5cdFx0dHJ5IHtcblx0XHRcdGxvZ0luZm9ybWF0aW9uKFwiRGlzY29ubmVjdGluZyBmcm9tIEJsb29tYmVyZyBUZXJtaW5hbFwiKTtcblx0XHRcdGF3YWl0IGJiZ0Nvbm5lY3Rpb24uZGlzY29ubmVjdCgpO1xuXHRcdH0gZmluYWxseSB7XG5cdFx0XHRiYmdDb25uZWN0aW9uID0gdW5kZWZpbmVkO1xuXHRcdFx0bG9nSW5mb3JtYXRpb24oXCJEaXNjb25uZWN0ZWQgZnJvbSBCbG9vbWJlcmcgVGVybWluYWxcIik7XG5cdFx0fVxuXHR9XG59XG5cbi8qKlxuICogRmlyZSBhbiBpbnRlbnQuXG4gKi9cbmFzeW5jIGZ1bmN0aW9uIGZpcmVJbnRlbnRGb3JCQkcoKTogUHJvbWlzZTx2b2lkPiB7XG5cdGlmIChiYmdDb25uZWN0aW9uKSB7XG5cdFx0dHJ5IHtcblx0XHRcdGxvZ0luZm9ybWF0aW9uKFxuXHRcdFx0XHRgYWN0aW9uOiAke3NlbGVjdGVkSW50ZW50VHlwZX0sIHR5cGU6ICR7ZmRjM0Rlbm9taW5hdGlvbn0sIGJiZyBtbmVtb25pYzogJHtiYmdNbmVtb25pY30sIHNlYXJjaCB2YWx1ZTogJHtzZWxlY3RlZEludGVudFZhbHVlfWBcblx0XHRcdCk7XG5cblx0XHRcdGxldCBpbnRlbnQ6IE9wZW5GaW4uSW50ZW50O1xuXG5cdFx0XHRzd2l0Y2ggKHNlbGVjdGVkSW50ZW50VHlwZSkge1xuXHRcdFx0XHRjYXNlIFwiVmlld0NvbnRhY3RcIjpcblx0XHRcdFx0XHRpbnRlbnQgPSB7XG5cdFx0XHRcdFx0XHRuYW1lOiBzZWxlY3RlZEludGVudFR5cGUsXG5cdFx0XHRcdFx0XHRjb250ZXh0OiB7XG5cdFx0XHRcdFx0XHRcdHR5cGU6IGZkYzNEZW5vbWluYXRpb24sXG5cdFx0XHRcdFx0XHRcdG5hbWU6IHNlbGVjdGVkSW50ZW50VmFsdWUsXG5cdFx0XHRcdFx0XHRcdGlkOiB7fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdFx0aW50ZW50ID0ge1xuXHRcdFx0XHRcdFx0bmFtZTogc2VsZWN0ZWRJbnRlbnRUeXBlLFxuXHRcdFx0XHRcdFx0Y29udGV4dDoge1xuXHRcdFx0XHRcdFx0XHR0eXBlOiBmZGMzRGVub21pbmF0aW9uLFxuXHRcdFx0XHRcdFx0XHRpZDoge1xuXHRcdFx0XHRcdFx0XHRcdHRpY2tlcjogc2VsZWN0ZWRJbnRlbnRWYWx1ZVxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdH1cblxuXHRcdFx0YXdhaXQgZmluLm1lLmludGVyb3AuZmlyZUludGVudChpbnRlbnQpO1xuXHRcdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0XHRsb2dJbmZvcm1hdGlvbihgRXJyb3Igd2hpbGUgdHJ5aW5nIHRvIHJhaXNlIGludGVudDogJHtlcnJvclRvU3RyaW5nKGVycm9yKX1gKTtcblx0XHR9XG5cdH0gZWxzZSB7XG5cdFx0bG9nSW5mb3JtYXRpb24oXCJOb3QgY29ubmVjdGVkIHRvIHRoZSBCbG9vbWJlcmcgVGVybWluYWwuIFBsZWFzZSBjaGVjayB5b3VyIHN0YXR1cyBvciBsb2cgaW4gYWdhaW4uXCIpO1xuXHR9XG59XG5cbi8qKlxuICogVXBkYXRlIHRoZSBzdGF0ZSBvZiB0aGUgRE9NLlxuICovXG5mdW5jdGlvbiB1cGRhdGVTdGF0ZSgpOiB2b2lkIHtcblx0Y29uc3QgaXNDb25uZWN0ZWQgPSBiYmdDb25uZWN0aW9uICE9PSB1bmRlZmluZWQ7XG5cdGlmIChidG5Db25uZWN0KSB7XG5cdFx0YnRuQ29ubmVjdC5kaXNhYmxlZCA9IGlzQ29ubmVjdGVkO1xuXHR9XG5cdGlmIChidG5EaXNjb25uZWN0KSB7XG5cdFx0YnRuRGlzY29ubmVjdC5kaXNhYmxlZCA9ICFpc0Nvbm5lY3RlZDtcblx0fVxuXHRpZiAoaW50ZW50VHlwZUVsZW1lbnQpIHtcblx0XHRpbnRlbnRUeXBlRWxlbWVudC5kaXNhYmxlZCA9ICFpc0Nvbm5lY3RlZDtcblx0fVxuXHRpZiAoaW50ZW50VmFsdWVFbGVtZW50KSB7XG5cdFx0aW50ZW50VmFsdWVFbGVtZW50LmRpc2FibGVkID0gIWlzQ29ubmVjdGVkIHx8IHNlbGVjdGVkSW50ZW50VHlwZS5sZW5ndGggPT09IDA7XG5cdH1cblx0aWYgKGJ0blF1ZXJ5KSB7XG5cdFx0YnRuUXVlcnkuZGlzYWJsZWQgPSAhaXNDb25uZWN0ZWQgfHwgc2VsZWN0ZWRJbnRlbnRWYWx1ZS5sZW5ndGggPT09IDA7XG5cdH1cbn1cblxuLyoqXG4gKiBMb2cgaW5mb3JtYXRpb24gdG8gdGhlIG91dHB1dCBlbGVtZW50LlxuICogQHBhcmFtIGluZm8gVGhlIGluZm9ybWF0aW9uIHRvIGxvZy5cbiAqL1xuZnVuY3Rpb24gbG9nSW5mb3JtYXRpb24oaW5mbzogc3RyaW5nKTogdm9pZCB7XG5cdGlmIChsb2dPdXRwdXQpIHtcblx0XHRsb2dPdXRwdXQudGV4dENvbnRlbnQgPSBgJHtsb2dPdXRwdXQudGV4dENvbnRlbnR9JHtpbmZvfVxcblxcbmA7XG5cdFx0bG9nT3V0cHV0LnNjcm9sbFRvcCA9IGxvZ091dHB1dC5zY3JvbGxIZWlnaHQ7XG5cdH1cbn1cblxuLyoqXG4gKiBDb252ZXJ0IGFuZCBlcnJvciB0byBhIHN0cmluZy5cbiAqIEBwYXJhbSBlcnIgVGhlIGVycm9yIHRvIGNvbnZlcnQuXG4gKiBAcmV0dXJucyBUaGUgZXJyb3IgYXMgYSBzdHJpbmcuXG4gKi9cbmZ1bmN0aW9uIGVycm9yVG9TdHJpbmcoZXJyOiB1bmtub3duKTogc3RyaW5nIHtcblx0aWYgKGVyciBpbnN0YW5jZW9mIEVycm9yKSB7XG5cdFx0cmV0dXJuIGVyci5tZXNzYWdlO1xuXHR9IGVsc2UgaWYgKHR5cGVvZiBlcnIgPT09IFwic3RyaW5nXCIpIHtcblx0XHRyZXR1cm4gZXJyO1xuXHR9XG5cblx0cmV0dXJuIEpTT04uc3RyaW5naWZ5KGVycik7XG59XG5cbi8qKlxuICogQ2xlYXIgdGhlIGxvZ3MuXG4gKi9cbmZ1bmN0aW9uIGNsZWFyTG9ncygpOiB2b2lkIHtcblx0aWYgKGxvZ091dHB1dCkge1xuXHRcdGxvZ091dHB1dC50ZXh0Q29udGVudCA9IFwiXCI7XG5cdFx0bG9nT3V0cHV0LnNjcm9sbFRvcCA9IDA7XG5cdH1cbn1cblxuLyoqXG4gKiBQb3B1bGF0ZSBhIHNlbGVjdCBjb250cm9sIHdpdGggYSBsaXN0IG9mIGl0ZW1zLlxuICogQHBhcmFtIHNlbGVjdCBUaGUgc2VsZWN0IGVsZW1lbnQgdG8gcG9wdWxhdGUuXG4gKiBAcGFyYW0gdmFsdWVzIFRoZSB2YWx1ZXMgdG8gcG9wdWxhdGUgdGhlIGVsZW1lbnQgd2l0aC5cbiAqL1xuZnVuY3Rpb24gcG9wdWxhdGVTZWxlY3Qoc2VsZWN0OiBIVE1MU2VsZWN0RWxlbWVudCB8IG51bGwsIHZhbHVlczogeyB2YWx1ZTogc3RyaW5nOyBsYWJlbDogc3RyaW5nIH1bXSk6IHZvaWQge1xuXHRpZiAoc2VsZWN0KSB7XG5cdFx0c2VsZWN0LmlubmVySFRNTCA9IFwiXCI7XG5cdFx0Y29uc3Qgb3B0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiKTtcblx0XHRvcHQudmFsdWUgPSBcIlwiO1xuXHRcdG9wdC50ZXh0ID0gXCJQbGVhc2Ugc2VsZWN0IHZhbHVlXCI7XG5cdFx0b3B0LmRpc2FibGVkID0gdHJ1ZTtcblx0XHRvcHQuc2VsZWN0ZWQgPSB0cnVlO1xuXHRcdHNlbGVjdC5hcHBlbmQob3B0KTtcblxuXHRcdGZvciAoY29uc3QgdmFsIG9mIHZhbHVlcykge1xuXHRcdFx0Y29uc3Qgb3B0VmFsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiKTtcblx0XHRcdG9wdFZhbC52YWx1ZSA9IHZhbC52YWx1ZTtcblx0XHRcdG9wdFZhbC50ZXh0ID0gdmFsLmxhYmVsO1xuXHRcdFx0c2VsZWN0LmFwcGVuZChvcHRWYWwpO1xuXHRcdH1cblx0fVxufVxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9