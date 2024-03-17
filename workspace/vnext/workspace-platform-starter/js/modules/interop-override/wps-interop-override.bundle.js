/******/ var __webpack_modules__ = ({

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


/***/ }),

/***/ "./client/src/framework/fdc3/1.2/mapper.ts":
/*!*************************************************!*\
  !*** ./client/src/framework/fdc3/1.2/mapper.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   mapInteropFromFDC3: () => (/* binding */ mapInteropFromFDC3),
/* harmony export */   mapToAppMetaData: () => (/* binding */ mapToAppMetaData),
/* harmony export */   mapToFDC3App: () => (/* binding */ mapToFDC3App),
/* harmony export */   mapToPlatformApp: () => (/* binding */ mapToPlatformApp)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils */ "./client/src/framework/utils.ts");

/**
 * Map the app definition to a platform app.
 * @param app The app definition to map.
 * @returns The platform app.
 */
function mapToPlatformApp(app) {
    const platformApp = {
        appId: app.appId,
        name: app.name ?? app.appId,
        title: app.title ?? app.name,
        manifestType: app.manifestType,
        manifest: getManifestFromFDC3(app),
        description: app.description,
        customConfig: app.customConfig,
        intents: app.intents,
        interop: mapInteropFromFDC3(app.intents),
        tags: mapTagsFromFDC3(app),
        version: app.version,
        publisher: app.publisher ?? "",
        contactEmail: app.contactEmail,
        supportEmail: app.supportEmail,
        icons: mapIconsFromFDC3(app.icons),
        images: mapImagesFromFDC3(app.images),
        private: mapPrivateFromFDC3(app),
        autostart: mapAutostartFromFDC3(app),
        instanceMode: app.customConfig?.instanceMode,
        tooltip: app.tooltip,
        launchPreference: app.customConfig?.launchPreference
    };
    return platformApp;
}
/**
 * Map a platform app to an FDC3 1.2 app definition.
 * @param app The app definition to map.
 * @returns The fdc3 1.2 app.
 */
function mapToFDC3App(app) {
    const manifestType = `${app.manifestType}`;
    const fdc3App = {
        appId: app.appId,
        name: app.name ?? app.appId,
        title: app.title ?? app.name,
        manifestType,
        manifest: app.manifest,
        description: app.description,
        customConfig: mapCustomConfigFromPlatformApp(app),
        intents: mapIntentsFromPlatformApp(app),
        categories: app.tags ?? [],
        version: app.version,
        publisher: app.publisher ?? "",
        contactEmail: app.contactEmail,
        supportEmail: app.supportEmail,
        icons: mapIconsFromPlatformApp(app),
        images: mapImagesFromPlatformApp(app),
        tooltip: app.tooltip
    };
    return fdc3App;
}
/**
 * Map the platform app to app metadata.
 * @param app The application to map.
 * @returns The app metadata.
 */
function mapToAppMetaData(app) {
    const icons = [];
    const images = [];
    if (Array.isArray(app.icons)) {
        for (const icon of app.icons) {
            if (!(0,_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(icon.src)) {
                icons.push(icon.src);
            }
        }
    }
    if (Array.isArray(app.images)) {
        for (const image of app.images) {
            if (!(0,_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(image.src)) {
                images.push(image.src);
            }
        }
    }
    const appMetaData = {
        appId: app.appId,
        description: app.description,
        icons,
        images,
        name: app.appId,
        title: app.title,
        tooltip: app.tooltip,
        version: app.version
    };
    return appMetaData;
}
/**
 * Map the app definition interop data to app interop format.
 * @param intents The intents to map.
 * @returns The app interop.
 */
function mapInteropFromFDC3(intents) {
    if ((0,_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(intents)) {
        return;
    }
    const listensFor = {};
    for (const intent of intents) {
        listensFor[intent.name] = {
            contexts: intent.contexts,
            customConfig: intent.customConfig,
            displayName: intent.displayName
        };
    }
    const interop = {
        intents: { listensFor }
    };
    return interop;
}
/**
 * Maps the intents from a platform app to an FDC3 1.2 intents array.
 * @param app The platform app to use as a source
 * @returns an Array of Intents in FDC3 1.2 format
 */
function mapIntentsFromPlatformApp(app) {
    const intents = [];
    const passedIntents = app.interop?.intents?.listensFor;
    if (!(0,_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(passedIntents)) {
        const keys = Object.keys(passedIntents);
        for (const key of keys) {
            const displayName = passedIntents[key].displayName ?? key;
            intents.push({
                name: key,
                displayName,
                contexts: passedIntents[key].contexts,
                customConfig: passedIntents[key].customConfig
            });
        }
    }
    if (intents.length === 0 && !(0,_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(app.intents)) {
        return app.intents;
    }
    return intents;
}
/**
 * Takes a platform app and returns an FDC3 custom config object.
 * @param app The platform app to map into a customConfig object.
 * @returns an FDC3 1.2 customConfig object based on the platform app settings.
 */
function mapCustomConfigFromPlatformApp(app) {
    const config = {
        autostart: mapBooleanValue(app?.autostart, false).toString(),
        instanceMode: app.instanceMode,
        private: mapBooleanValue(app.private, false).toString(),
        launchPreference: app.launchPreference
    };
    return config;
}
/**
 * Map the icon format.
 * @param icons The icons to map.
 * @returns The mapped icons.
 */
function mapIconsFromFDC3(icons) {
    if (!Array.isArray(icons)) {
        return [];
    }
    const appIcons = [];
    for (const appIcon of icons) {
        appIcons.push({ src: appIcon.icon });
    }
    return appIcons;
}
/**
 * Takes a Platform App and converts icons so they are in FDC3 1.2 format.
 * @param app The platform app to use as a source.
 * @returns The array of app icons in FDC3 1.2 format.
 */
function mapIconsFromPlatformApp(app) {
    if (!Array.isArray(app.icons)) {
        return [];
    }
    const appIcons = [];
    for (const appIcon of app.icons) {
        appIcons.push({ icon: appIcon.src });
    }
    return appIcons;
}
/**
 * Map the image format.
 * @param images The images to map.
 * @returns The mapped images.
 */
function mapImagesFromFDC3(images) {
    if (!Array.isArray(images)) {
        return [];
    }
    const appImages = [];
    for (const appImage of images) {
        appImages.push({ src: appImage.url });
    }
    return appImages;
}
/**
 * Returns an array of images in FDC3 1.2 format from a Platform App.
 * @param app The platform app to use as a source.
 * @returns The mapped images.
 */
function mapImagesFromPlatformApp(app) {
    if (!Array.isArray(app.images)) {
        return [];
    }
    const appImages = [];
    for (const appImage of app.images) {
        appImages.push({ url: appImage.src });
    }
    return appImages;
}
/**
 * Get the manifest which can be plain string or JSON.
 * @param app The app to get the manifest from.
 * @returns The manifest.
 */
function getManifestFromFDC3(app) {
    if ((0,_utils__WEBPACK_IMPORTED_MODULE_0__.isStringValue)(app.manifest) && app.manifest.startsWith("{")) {
        return JSON.parse(app.manifest);
    }
    return app.manifest;
}
/**
 * Map the tags.
 * @param app The app definition to map the tags for.
 * @returns The mapped tags,
 */
function mapTagsFromFDC3(app) {
    const tags = app.tags ?? app.categories ?? [];
    if (tags.length === 0) {
        tags.push(app.manifestType);
    }
    return tags;
}
/**
 * Map the private flag.
 * @param app The app containing the app.
 * @returns The flag or false if not found.
 */
function mapPrivateFromFDC3(app) {
    return mapBooleanValue(app?.customConfig?.private, false);
}
/**
 * Map the autostart flag.
 * @param app The app containing the app.
 * @returns The flag or false if not found.
 */
function mapAutostartFromFDC3(app) {
    return mapBooleanValue(app?.customConfig?.autostart, false);
}
/**
 * Map a boolean or string to a real boolean value.
 * @param flag The flag to convert.
 * @param defaultFlag The default value if missing.
 * @returns The mapped flag.
 */
function mapBooleanValue(flag, defaultFlag) {
    if ((0,_utils__WEBPACK_IMPORTED_MODULE_0__.isStringValue)(flag) || (0,_utils__WEBPACK_IMPORTED_MODULE_0__.isBoolean)(flag)) {
        switch (flag) {
            case "False":
            case "false":
            case false:
                return false;
            case "True":
            case "true":
            case true:
                return true;
            default:
                // if someone has defined a flag then the likely hood was to override the default value
                return !defaultFlag;
        }
    }
    return defaultFlag;
}


/***/ }),

/***/ "./client/src/framework/fdc3/2.0/mapper.ts":
/*!*************************************************!*\
  !*** ./client/src/framework/fdc3/2.0/mapper.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   mapIntentsFromFDC3: () => (/* binding */ mapIntentsFromFDC3),
/* harmony export */   mapToAppMetaData: () => (/* binding */ mapToAppMetaData),
/* harmony export */   mapToFDC3App: () => (/* binding */ mapToFDC3App),
/* harmony export */   mapToPlatformApp: () => (/* binding */ mapToPlatformApp)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils */ "./client/src/framework/utils.ts");

/**
 * Map the app definition to a platform app.
 * @param app The app definition to map.
 * @returns The platform app.
 */
function mapToPlatformApp(app) {
    const platformApp = {
        appId: app.appId,
        name: app.name ?? app.appId,
        title: app.title ?? app.name,
        manifestType: mapManifestTypeFromFDC3(app),
        manifest: getManifestFromFDC3(app),
        description: app.description,
        instanceMode: app?.hostManifests?.OpenFin?.config?.instanceMode,
        intents: mapIntentsFromFDC3(app.interop),
        interop: app.interop,
        customConfig: app.customConfig,
        tags: app.categories,
        version: app.version,
        publisher: app.publisher ?? "",
        contactEmail: app.contactEmail,
        supportEmail: app.supportEmail,
        icons: app.icons ?? [],
        images: app.screenshots,
        private: app?.hostManifests?.OpenFin?.config?.private,
        autostart: app?.hostManifests?.OpenFin?.config?.autostart,
        launchPreference: app?.hostManifests?.OpenFin?.config?.launchPreference
    };
    return platformApp;
}
/**
 * Map a platform app to an FDC3 2.0 app definition.
 * @param app The app definition to map.
 * @returns The fdc3 2.0 app.
 */
function mapToFDC3App(app) {
    const fdc3App = {
        appId: app.appId,
        name: app.name ?? app.appId,
        title: app.title ?? app.name,
        type: mapTypeFromPlatformApp(app),
        details: {},
        description: app.description,
        categories: app.tags ?? [],
        version: app.version,
        publisher: app.publisher ?? "",
        contactEmail: app.contactEmail,
        supportEmail: app.supportEmail,
        icons: app.icons,
        screenshots: app.images,
        tooltip: app.tooltip,
        interop: getInteropFromPlatformApp(app),
        hostManifests: getHostManifestsFromPlatformApp(app)
    };
    return fdc3App;
}
/**
 * Map the platform app to app metadata.
 * @param app The application to map.
 * @param resultType The result type to include in the data.
 * @returns The app metadata.
 */
function mapToAppMetaData(app, resultType) {
    const appMetaData = {
        appId: app.appId,
        description: app.description,
        icons: app.icons,
        name: app.name,
        screenshots: app.images,
        title: app.title,
        tooltip: app.tooltip,
        version: app.version,
        resultType
    };
    return appMetaData;
}
/**
 * Map the app definition interop data to app interop format.
 * @param interop The interop to map.
 * @returns The app interop.
 */
function mapIntentsFromFDC3(interop) {
    const intents = [];
    const listensFor = interop?.intents?.listensFor;
    if ((0,_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(listensFor)) {
        return intents;
    }
    const intentIds = Object.keys(listensFor);
    for (const intentName of intentIds) {
        intents.push({
            name: intentName,
            displayName: listensFor[intentName].displayName ?? "",
            contexts: listensFor[intentName].contexts
        });
    }
    return intents;
}
/**
 * Get the interop data from a Platform App in FDC3 2.0 format.
 * @param app The platform app to use as a source.
 * @returns The app interop definition.
 */
function getInteropFromPlatformApp(app) {
    if (!(0,_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(app.interop)) {
        return app.interop;
    }
    const interop = {
        intents: {
            listensFor: {}
        }
    };
    if (Array.isArray(app.intents) && app.intents.length > 0) {
        const listensFor = {};
        for (const intent of app.intents) {
            listensFor[intent.name] = { displayName: intent.displayName, contexts: intent.contexts };
        }
        if (!(0,_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(interop.intents)) {
            interop.intents.listensFor = listensFor;
        }
    }
    return interop;
}
/**
 * Map the manifest type.
 * @param app The app definition to map the manifest type for.
 * @returns The mapped manifest type.
 */
function mapManifestTypeFromFDC3(app) {
    let manifestType;
    switch (app.type) {
        case "web": {
            manifestType = "inline-view";
            break;
        }
        case "native": {
            manifestType = "inline-external";
            break;
        }
        case "onlineNative": {
            manifestType = "desktop-browser";
            break;
        }
        case "other": {
            manifestType = app.hostManifests?.OpenFin?.type ?? "";
            break;
        }
        default: {
            manifestType = app.type;
        }
    }
    return manifestType;
}
/**
 * Maps to an FDC3 2.0 type from the manifest type specified by a platform app.
 * @param app the platform app to use as a source
 * @returns the FDC3 2.0 app definition type
 */
function mapTypeFromPlatformApp(app) {
    let type = "other";
    if ((0,_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(app.manifestType)) {
        return type;
    }
    switch (app.manifestType) {
        case "inline-view": {
            type = "web";
            break;
        }
        case "inline-external": {
            type = "native";
            break;
        }
        case "desktop-browser": {
            type = "onlineNative";
            break;
        }
    }
    return type;
}
/**
 * Get the manifest which can be plain string or JSON.
 * @param app The app to get the manifest from.
 * @returns The manifest.
 */
function getManifestFromFDC3(app) {
    let manifest;
    switch (app.type) {
        case "web": {
            if (!(0,_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(app?.details)) {
                const hostDetails = app.hostManifests?.OpenFin?.details;
                if ((0,_utils__WEBPACK_IMPORTED_MODULE_0__.isObject)(hostDetails)) {
                    manifest = {
                        url: (app?.details).url,
                        fdc3InteropApi: "2.0",
                        ...hostDetails
                    };
                }
                else {
                    manifest = {
                        url: (app?.details).url,
                        fdc3InteropApi: "2.0"
                    };
                }
            }
            break;
        }
        case "native": {
            if (!(0,_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(app?.details)) {
                // our native api supports path and arguments.
                manifest = app.details;
            }
            break;
        }
        case "onlineNative": {
            if (!(0,_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(app?.details)) {
                manifest = (app?.details).url;
            }
            break;
        }
        case "other": {
            manifest = app.hostManifests?.OpenFin?.details;
            break;
        }
        default: {
            manifest = app.details;
        }
    }
    return manifest;
}
/**
 * Get the Host Details from the platform app for this FDC3 2.0 App Definition.
 * @param app The platform app to get the information from.
 * @returns The host specific details.
 */
function getHostManifestsFromPlatformApp(app) {
    const hostManifests = {
        OpenFin: {
            type: app.manifestType,
            details: app.manifest,
            config: {
                autostart: app.autostart,
                private: app.private,
                instanceMode: app.instanceMode,
                launchPreference: app.launchPreference
            }
        }
    };
    return hostManifests;
}


/***/ }),

/***/ "./client/src/framework/manifest-types.ts":
/*!************************************************!*\
  !*** ./client/src/framework/manifest-types.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MANIFEST_TYPES: () => (/* binding */ MANIFEST_TYPES)
/* harmony export */ });
const MANIFEST_TYPES = {
    View: {
        id: "view",
        label: "View",
        description: "This manifest type expects the manifest setting to be pointed to a json file that contains view options."
    },
    InlineView: {
        id: "inline-view",
        label: "View",
        description: "This manifest type expects the manifest setting to have the options inline rather than a url to a json file."
    },
    Window: {
        id: "window",
        label: "Window",
        description: "This manifest type expects the manifest setting to point to a json file that contains classic window options."
    },
    InlineWindow: {
        id: "inline-window",
        label: "Window",
        description: "This manifest type expects the manifest setting to have the classic window options inline rather than a url to a json file."
    },
    Snapshot: {
        id: "snapshot",
        label: "Snapshot",
        description: "This manifest type expects the manifest setting to point to a json file that contains a snapshot (one or more windows)"
    },
    InlineSnapshot: {
        id: "inline-snapshot",
        label: "Snapshot",
        description: "This manifest type expects the manifest setting to have a snapshot inline rather than a url to a json file that contains a snapshot (one or more windows)"
    },
    Manifest: {
        id: "manifest",
        label: "App",
        description: "This manifest type expects the manifest setting to point to a json file that is an openfin manifest. An openfin app."
    },
    External: {
        id: "external",
        label: "Native App",
        description: "This manifest type expects the manifest setting to point to an exe."
    },
    InlineExternal: {
        id: "inline-external",
        label: "Native App",
        description: "This manifest type expects the manifest setting to point to an exe using an inline launch external process request."
    },
    Appasset: {
        id: "appasset",
        label: "Native App",
        description: "This manifest type expects the manifest setting to point to an app asset name."
    },
    InlineAppAsset: {
        id: "inline-appasset",
        label: "Native App",
        description: "This manifest type expects the manifest setting to point to an app asset config using an inline launch external process request."
    },
    DesktopBrowser: {
        id: "desktop-browser",
        label: "Desktop Browser",
        description: "This manifest type expects the manifest setting to point to a url which will be launched in the default desktop browser."
    },
    Endpoint: {
        id: "endpoint",
        label: "Endpoint",
        description: "This manifest type expects the manifest setting to point to an endpoint (which should be defined in the endpointProvider). Action will be called on that endpoint and passed the specified app."
    },
    Connection: {
        id: "connection",
        label: "Connected App",
        description: "This manifest type expects the manifest setting to have a uuid. This must match to a connection registered in the connectionProvider with app support."
    },
    UnregisteredApp: {
        id: "unregistered-app",
        label: "Unregistered App",
        description: "This manifest type represents web page instances that have been launched that are not linked to an app. This manifest type should not be in the permitted manifest type list for app feeds as it is for dynamic urls."
    }
};


/***/ }),

/***/ "./client/src/framework/utils-position.ts":
/*!************************************************!*\
  !*** ./client/src/framework/utils-position.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   centerContentInIdentity: () => (/* binding */ centerContentInIdentity),
/* harmony export */   centerContentInRect: () => (/* binding */ centerContentInRect),
/* harmony export */   findMonitorContainingPoint: () => (/* binding */ findMonitorContainingPoint),
/* harmony export */   getAllVisibleWindows: () => (/* binding */ getAllVisibleWindows),
/* harmony export */   getBoundsCenter: () => (/* binding */ getBoundsCenter),
/* harmony export */   getIdentityBounds: () => (/* binding */ getIdentityBounds),
/* harmony export */   getWindowPositionOptions: () => (/* binding */ getWindowPositionOptions),
/* harmony export */   getWindowPositionUsingStrategy: () => (/* binding */ getWindowPositionUsingStrategy),
/* harmony export */   pointInRect: () => (/* binding */ pointInRect)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./client/src/framework/utils.ts");

/**
 * Provides x and y co-ordinates to position a window of a given size in relation to another window/view.
 * @param clientIdentity The identity of the view/window these x/y co-ordinates should be in relation to.
 * @param dimensions The dimensions of the window that will be placed in the center of the screen.
 * @param dimensions.width The width of the window that is going to be placed.
 * @param dimensions.height The height of the window that is going to be placed.
 * @returns The x, y co-ordinates to position the window
 */
async function centerContentInIdentity(clientIdentity, dimensions) {
    const bounds = await getIdentityBounds(clientIdentity);
    const boundsCenter = getBoundsCenter(bounds);
    const monitorInfo = await findMonitorContainingPoint(boundsCenter);
    return centerContentInRect(monitorInfo.availableRect, dimensions);
}
/**
 * Provides x and y co-ordinates to position content of a given size in relation to a rect.
 * @param availableRect The available rect to position the content in.
 * @param availableRect.left The available rect left to position the content in.
 * @param availableRect.top The available rect top to position the content in.
 * @param availableRect.right The available rect right to position the content in.
 * @param availableRect.bottom The available rect bottom to position the content in.
 * @param contentDimensions The dimensions of the content that will be placed in the center of the screen.
 * @param contentDimensions.width The width of the content that is going to be placed.
 * @param contentDimensions.height The height of the content that is going to be placed.
 * @returns The x, y co-ordinates to position the content
 */
function centerContentInRect(availableRect, contentDimensions) {
    const height = availableRect.bottom - availableRect.top;
    const width = availableRect.right - availableRect.left;
    const dividedRectWidth = width / 2;
    const dividedRectHeight = height / 2;
    const dividedDimensionWidth = contentDimensions.width / 2;
    const dividedDimensionHeight = contentDimensions.height / 2;
    const x = availableRect.left + dividedRectWidth - dividedDimensionWidth;
    const y = availableRect.top + dividedRectHeight - dividedDimensionHeight;
    return { x: Math.round(x), y: Math.round(y) };
}
/**
 * Returns the monitor details for the monitor a view/window is placed on.
 * @param clientIdentity The identity of the view/window to check against.
 * @returns The monitor the view/window lives on or undefined if no match was found.
 */
async function getIdentityBounds(clientIdentity) {
    let bounds;
    let currentWindow;
    try {
        const targetView = fin.View.wrapSync(clientIdentity);
        currentWindow = await targetView.getCurrentWindow();
    }
    catch {
        // we were not passed a view.
    }
    if ((0,_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(bounds)) {
        try {
            const targetWindow = currentWindow ?? fin.Window.wrapSync(clientIdentity);
            bounds = await targetWindow.getBounds();
        }
        catch {
            // it wasn't a window
        }
    }
    if ((0,_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(bounds)) {
        try {
            bounds = await fin.me.getBounds();
        }
        catch {
            // unable to get own bounds
        }
    }
    return bounds;
}
/**
 * Find the monitor which contains the point and returns it.
 * @param point The point coord to locate.
 * @param point.x The x coord
 * @param point.y The y coord
 * @returns The monitor containing the point.
 */
async function findMonitorContainingPoint(point) {
    const monitorInfo = await fin.System.getMonitorInfo();
    const x = point.x;
    const y = point.y;
    if (!(0,_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(x) && !(0,_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(y)) {
        for (const monitor of monitorInfo.nonPrimaryMonitors) {
            if (pointInRect({ x, y }, monitor.monitorRect)) {
                return monitor;
            }
        }
    }
    return monitorInfo.primaryMonitor;
}
/**
 * Is the point in the rectangle.
 * @param point The coord to match.
 * @param point.x The x coord.
 * @param point.y The y coord.
 * @param rect The rect.
 * @param rect.top The rect top.
 * @param rect.left The rect left.
 * @param rect.bottom The rect bottom.
 * @param rect.right The rect right.
 * @returns True if the point is in the rect.
 */
function pointInRect(point, rect) {
    return point.x >= rect.left && point.x <= rect.right && point.y >= rect.top && point.y <= rect.bottom;
}
/**
 * Get the center for a bounding rectangle.
 * @param bounds The rect
 * @param bounds.top The rect top
 * @param bounds.left The rect left
 * @param bounds.width The rect width
 * @param bounds.height The rect height
 * @returns the x and y of the bounds center or an object not containing x or y.
 */
function getBoundsCenter(bounds) {
    let boundsCenterX;
    let boundsCenterY;
    if (!(0,_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(bounds)) {
        const halfWidth = bounds.width / 2;
        const halfHeight = bounds.height / 2;
        boundsCenterX = bounds.left + halfWidth;
        boundsCenterY = bounds.top + halfHeight;
        return { x: Math.round(boundsCenterX), y: Math.round(boundsCenterY) };
    }
    return {};
}
/**
 * Given browser settings what window positioning options should be used?
 * @param settings The browser settings that have been provided.
 * @returns a set of window positioning options.
 */
async function getWindowPositionOptions(settings) {
    const windowPositioningOptions = {};
    windowPositioningOptions.defaults = {};
    if (!(0,_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(settings)) {
        windowPositioningOptions.windowPositioningStrategy = settings.windowPositioningStrategy;
        windowPositioningOptions.disableWindowPositioningStrategy = settings.disableWindowPositioningStrategy;
        if (!(0,_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(settings?.defaultWindowOptions?.defaultLeft)) {
            windowPositioningOptions.defaults.left = settings.defaultWindowOptions.defaultLeft;
        }
        if (!(0,_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(settings?.defaultWindowOptions?.defaultTop)) {
            windowPositioningOptions.defaults.top = settings.defaultWindowOptions.defaultTop;
        }
    }
    if ((0,_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(windowPositioningOptions.defaults.left) || (0,_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(windowPositioningOptions.defaults.top)) {
        const app = await fin.Application.getCurrent();
        const platformManifest = await app.getManifest();
        if (!(0,_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(platformManifest?.platform?.defaultWindowOptions?.defaultLeft)) {
            windowPositioningOptions.defaults.left = platformManifest.platform.defaultWindowOptions.defaultLeft;
        }
        if (!(0,_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(platformManifest?.platform?.defaultWindowOptions?.defaultTop)) {
            windowPositioningOptions.defaults.top = platformManifest.platform.defaultWindowOptions.defaultTop;
        }
    }
    return windowPositioningOptions;
}
/**
 * Get the window position using a strategy.
 * @param windowPositioningOptions The options for window positioning.
 * @param windowPositioningOptions.windowPositioningStrategy The strategy for window positioning.
 * @param windowPositioningOptions.windowPositioningStrategy.x The x coordinate.
 * @param windowPositioningOptions.windowPositioningStrategy.y The y coordinate.
 * @param windowPositioningOptions.disableWindowPositioningStrategy Whether to disable the window positioning strategy.
 * @param relatedTo The related monitor or identity or x/y position.
 * @returns The x and y coordinates of the window position.
 */
async function getWindowPositionUsingStrategy(windowPositioningOptions, relatedTo) {
    if (windowPositioningOptions?.disableWindowPositioningStrategy === true) {
        return;
    }
    let targetMonitor;
    if ((0,_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(relatedTo)) {
        const monitors = await fin.System.getMonitorInfo();
        targetMonitor = monitors.primaryMonitor;
    }
    else if (!(0,_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(relatedTo) && "monitorRect" in relatedTo) {
        targetMonitor = relatedTo;
    }
    else if (!(0,_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(relatedTo) && "x" in relatedTo) {
        targetMonitor = await findMonitorContainingPoint(relatedTo);
    }
    else {
        const bounds = await getIdentityBounds(relatedTo);
        if ((0,_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(bounds)) {
            const monitors = await fin.System.getMonitorInfo();
            targetMonitor = monitors.primaryMonitor;
        }
        else {
            targetMonitor = await findMonitorContainingPoint({ x: bounds.left, y: bounds.top });
        }
    }
    const windowDefaultLeft = windowPositioningOptions?.defaults?.left ?? 0;
    const windowDefaultTop = windowPositioningOptions?.defaults?.top ?? 0;
    // Get the available rect for the display so we can take in to account
    // OS menus, task bar etc
    const availableLeft = targetMonitor.availableRect.left;
    const availableTop = targetMonitor.availableRect.top;
    const windowOffsetsX = windowPositioningOptions?.windowPositioningStrategy?.x ?? 30;
    const windowOffsetsY = windowPositioningOptions?.windowPositioningStrategy?.y ?? 30;
    const windowOffsetsMaxIncrements = windowPositioningOptions?.windowPositioningStrategy?.maxIncrements ?? 8;
    const visibleWindows = await getAllVisibleWindows();
    // Get the top left bounds for all the visible windows
    const topLeftBounds = await Promise.all(visibleWindows.map(async (win) => {
        try {
            const bounds = await win.getBounds();
            return {
                left: bounds.left,
                top: bounds.top,
                right: bounds.left + windowOffsetsX,
                bottom: bounds.top + windowOffsetsY
            };
        }
        catch {
            // return a dummy entry.
            return {
                left: 0,
                top: 0,
                right: 0,
                bottom: 0
            };
        }
    }));
    let minCountVal = 1000;
    let minCountIndex = windowOffsetsMaxIncrements;
    // Now see how many windows appear in each increment slot
    for (let i = 0; i < windowOffsetsMaxIncrements; i++) {
        const xPos = i * windowOffsetsX;
        const yPos = i * windowOffsetsY;
        const leftPos = windowDefaultLeft + xPos;
        const topPos = windowDefaultTop + yPos;
        const foundWins = topLeftBounds.filter((topLeftWinBounds) => topLeftWinBounds.left >= leftPos + availableLeft &&
            topLeftWinBounds.right <= leftPos + windowOffsetsX + availableLeft &&
            topLeftWinBounds.top >= topPos + availableTop &&
            topLeftWinBounds.bottom <= topPos + windowOffsetsY + availableTop);
        // If this slot has less than the current minimum use this slot
        if (foundWins.length < minCountVal) {
            minCountVal = foundWins.length;
            minCountIndex = i;
        }
    }
    const xOffset = minCountIndex * windowOffsetsX;
    const x = windowDefaultLeft + xOffset + availableLeft;
    const yOffset = minCountIndex * windowOffsetsY;
    const y = windowDefaultTop + yOffset + availableTop;
    return { left: x, top: y };
}
/**
 * Get a list of all the visible windows in the platform.
 * @returns The list of visible windows.
 */
async function getAllVisibleWindows() {
    const platform = fin.Platform.getCurrentSync();
    const windows = await platform.Application.getChildWindows();
    const availableWindows = [];
    for (const currentWindow of windows) {
        try {
            const isShowing = await currentWindow.isShowing();
            if (isShowing) {
                availableWindows.push(currentWindow);
            }
        }
        catch {
            // if the window is destroyed before determining if it is showing then
            // we should move to the next window but not throw.
        }
    }
    return availableWindows;
}


/***/ }),

/***/ "./client/src/framework/utils.ts":
/*!***************************************!*\
  !*** ./client/src/framework/utils.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   deepEqual: () => (/* binding */ deepEqual),
/* harmony export */   deepMerge: () => (/* binding */ deepMerge),
/* harmony export */   formatError: () => (/* binding */ formatError),
/* harmony export */   getCommandLineArgs: () => (/* binding */ getCommandLineArgs),
/* harmony export */   isBoolean: () => (/* binding */ isBoolean),
/* harmony export */   isEmpty: () => (/* binding */ isEmpty),
/* harmony export */   isInteger: () => (/* binding */ isInteger),
/* harmony export */   isNumber: () => (/* binding */ isNumber),
/* harmony export */   isNumberValue: () => (/* binding */ isNumberValue),
/* harmony export */   isObject: () => (/* binding */ isObject),
/* harmony export */   isString: () => (/* binding */ isString),
/* harmony export */   isStringValue: () => (/* binding */ isStringValue),
/* harmony export */   objectClone: () => (/* binding */ objectClone),
/* harmony export */   randomUUID: () => (/* binding */ randomUUID),
/* harmony export */   sanitizeString: () => (/* binding */ sanitizeString)
/* harmony export */ });
/**
 * Test if a value is a undefined or null.
 * @param value The value to test.
 * @returns True if the value is null or undefined.
 */
function isEmpty(value) {
    // eslint-disable-next-line no-restricted-syntax
    return value === undefined || value === null;
}
/**
 * Test if a value is an object.
 * @param value The value to test.
 * @returns True if the value is an object.
 */
function isObject(value) {
    // eslint-disable-next-line no-restricted-syntax
    return value !== undefined && value !== null && typeof value === "object" && !Array.isArray(value);
}
/**
 * Test if a value is a string.
 * @param value The value to test.
 * @returns True if the value is a string.
 */
function isString(value) {
    // eslint-disable-next-line no-restricted-syntax
    return value !== undefined && value !== null && typeof value === "string";
}
/**
 * Test if a value is a string that is not empty.
 * @param value The value to test.
 * @returns True if the value is a string that is not empty.
 */
function isStringValue(value) {
    return isString(value) && value.trim().length > 0;
}
/**
 * Test if a value is a number.
 * @param value The value to test.
 * @returns True if the value is a number.
 */
function isNumber(value) {
    // eslint-disable-next-line no-restricted-syntax
    return value !== undefined && value !== null && typeof value === "number";
}
/**
 * Test if a value is a number with a real value i.e. not NaN or Infinite.
 * @param value The value to test.
 * @returns True if the value is a number.
 */
function isNumberValue(value) {
    return isNumber(value) && !Number.isNaN(value) && Number.isFinite(value);
}
/**
 * Test if a value is a boolean.
 * @param value The value to test.
 * @returns True if the value is a boolean.
 */
function isBoolean(value) {
    // eslint-disable-next-line no-restricted-syntax
    return value !== undefined && value !== null && typeof value === "boolean";
}
/**
 * Test if a value is an integer.
 * @param value The value to test.
 * @returns True if the value is an integer.
 */
function isInteger(value) {
    return isNumber(value) && Number.isInteger(value);
}
/**
 * Deep clone an object.
 * @param obj The object to clone.
 * @returns The clone of the object.
 */
function objectClone(obj) {
    // eslint-disable-next-line no-restricted-syntax
    return obj === undefined ? undefined : JSON.parse(JSON.stringify(obj));
}
/**
 * Do a deep comparison of the objects.
 * @param obj1 The first object to compare.
 * @param obj2 The second object to compare.
 * @param matchPropertyOrder If true the properties must be in the same order.
 * @returns True if the objects are the same.
 */
function deepEqual(obj1, obj2, matchPropertyOrder = true) {
    if (isObject(obj1) && isObject(obj2)) {
        const objKeys1 = Object.keys(obj1);
        const objKeys2 = Object.keys(obj2);
        if (objKeys1.length !== objKeys2.length) {
            return false;
        }
        if (matchPropertyOrder && JSON.stringify(objKeys1) !== JSON.stringify(objKeys2)) {
            return false;
        }
        for (const key of objKeys1) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const value1 = obj1[key];
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const value2 = obj2[key];
            if (!deepEqual(value1, value2, matchPropertyOrder)) {
                return false;
            }
        }
        return true;
    }
    else if (Array.isArray(obj1) && Array.isArray(obj2)) {
        if (obj1.length !== obj2.length) {
            return false;
        }
        for (let i = 0; i < obj1.length; i++) {
            if (!deepEqual(obj1[i], obj2[i], matchPropertyOrder)) {
                return false;
            }
        }
    }
    return JSON.stringify(obj1) === JSON.stringify(obj2);
}
/**
 * Deep merge two objects.
 * @param target The object to be merged into.
 * @param sources The objects to merge into the target.
 * @returns The merged object.
 */
function deepMerge(target, ...sources) {
    if (!Array.isArray(sources) || sources.length === 0) {
        return target;
    }
    const targetAsMap = target;
    const source = sources.shift();
    let keys;
    if (isObject(targetAsMap) && isObject(source)) {
        keys = Object.keys(source);
    }
    else if (Array.isArray(source)) {
        if (!Array.isArray(target)) {
            return source;
        }
        keys = Object.keys(source).map((k) => Number.parseInt(k, 10));
    }
    if (keys) {
        const sourceAsMap = source;
        for (const key of keys) {
            const value = sourceAsMap[key];
            if (isObject(value)) {
                if (isEmpty(targetAsMap[key])) {
                    targetAsMap[key] = {};
                }
                deepMerge(targetAsMap[key], value);
            }
            else if (Array.isArray(value)) {
                if (isEmpty(targetAsMap[key])) {
                    targetAsMap[key] = [];
                }
                deepMerge(targetAsMap[key], value);
            }
            else {
                targetAsMap[key] = value;
            }
        }
    }
    return deepMerge(target, ...sources);
}
/**
 * Polyfills randomUUID if running in a non-secure context.
 * @returns The random UUID.
 */
function randomUUID() {
    if ("randomUUID" in globalThis.crypto) {
        // eslint-disable-next-line no-restricted-syntax
        return globalThis.crypto.randomUUID();
    }
    // Polyfill the window.crypto.randomUUID if we are running in a non secure context that doesn't have it
    // we are still using window.crypto.getRandomValues which is always available
    // https://stackoverflow.com/a/2117523/2800218
    /**
     * Get random hex value.
     * @param c The number to base the random value on.
     * @returns The random value.
     */
    function getRandomHex(c) {
        // eslint-disable-next-line no-bitwise
        const rnd = globalThis.crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (Number(c) / 4));
        return (
        // eslint-disable-next-line no-bitwise
        (Number(c) ^ rnd).toString(16));
    }
    return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, getRandomHex);
}
/**
 * Format an error to a readable string.
 * @param err The error to format.
 * @returns The formatted error.
 */
function formatError(err) {
    if (isEmpty(err)) {
        return "";
    }
    else if (err instanceof Error) {
        return err.message;
    }
    else if (isStringValue(err)) {
        return err;
    }
    else if (isObject(err) && "message" in err && isString(err.message)) {
        return err.message;
    }
    return JSON.stringify(err);
}
/**
 * A basic string sanitize function that removes angle brackets <> from a string.
 * @param content the content to sanitize
 * @returns a string without angle brackets <>
 */
function sanitizeString(content) {
    if (isStringValue(content)) {
        return content
            .replace(/<[^>]*>?/gm, "")
            .replace(/&gt;/g, ">")
            .replace(/&lt;/g, "<")
            .replace(/&amp;/g, "&")
            .replace(/&nbsp;/g, " ")
            .replace(/\n\s*\n/g, "\n");
    }
    return "";
}
/**
 * Get the command line arguments from a command line string.
 * Examples of command line strings: arg1 key1=value1 key2="value with spaces" key3='value3' key4='value with more spaces'`.
 * @param commandLine The command line string.
 * @returns The command line arguments or an empty array if none
 */
function getCommandLineArgs(commandLine) {
    if (!isStringValue(commandLine)) {
        return [];
    }
    const matches = commandLine.match(/(\w+=)?("[^"]*"|'[^']*'|[^ ]+)/g);
    if (isEmpty(matches)) {
        return [];
    }
    return matches;
}


/***/ }),

/***/ "./client/src/modules/interop-override/wps-interop-override/broker/app-intent-helper.ts":
/*!**********************************************************************************************!*\
  !*** ./client/src/modules/interop-override/wps-interop-override/broker/app-intent-helper.ts ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AppIntentHelper: () => (/* binding */ AppIntentHelper)
/* harmony export */ });
/* harmony import */ var workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! workspace-platform-starter/utils */ "./client/src/framework/utils.ts");

/**
 * The App Intent Helper inspects app catalogs to discover supported intents and contexts.
 */
class AppIntentHelper {
    /**
     * Create an instance of the App Intent Helper.
     * @param getApps returns an array of Apps
     * @param logger the logger to use.
     */
    constructor(getApps, logger) {
        this._getApps = getApps;
        this._logger = logger;
    }
    /**
     * Get the application that support the requested intent.
     * @param intent The intent the application must support.
     * @returns The list of application that support the intent.
     */
    async getAppsByIntent(intent) {
        const apps = await this._getApps();
        return apps.filter((app) => {
            const listensFor = app.interop?.intents?.listensFor;
            if ((0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(listensFor)) {
                return false;
            }
            const intentNames = Object.keys(listensFor);
            for (const intentName of intentNames) {
                if (intentName.toLowerCase() === intent.toLowerCase()) {
                    return true;
                }
            }
            return false;
        });
    }
    /**
     * Get an intent and the apps that support it.
     * @param intent The intent to look for.
     * @param contextType Optional context type to look for.
     * @param resultType Optional result type to look for.
     * @returns The intent and its supporting apps if found.
     */
    async getIntent(intent, contextType, resultType) {
        const apps = await this._getApps();
        if (apps.length === 0) {
            this._logger.warn("There was no apps returned so we are unable to find apps that support an intent");
            return;
        }
        const intentsMap = {};
        for (const app of apps) {
            if (app.interop?.intents?.listensFor && !(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(app.interop.intents.listensFor[intent])) {
                const appIntent = app.interop.intents.listensFor[intent];
                const include = this.appIntentContains(appIntent, contextType, resultType);
                if (include) {
                    // re-use approach used by getting intents by context for the context map although this will only have one
                    this.updateAppIntentsMap(intentsMap, intent, appIntent.displayName, app);
                }
            }
        }
        const results = Object.values(intentsMap);
        if (results.length === 0) {
            this._logger.info(`No results found for findIntent for intent ${intent} and context ${contextType} and resultType ${resultType}`);
            return;
        }
        else if (results.length === 1) {
            return results[0];
        }
        this._logger.warn(`Received more than one result for findIntent for intent ${intent} and context ${contextType} and resultType ${resultType}. Returning the first entry.`);
        return results[0];
    }
    /**
     * Get the apps that support intents by the context type.
     * @param contextType The context type the app must support.
     * @param resultType The optional result type to match as well.
     * @returns The apps for the specified intent.
     */
    async getIntentsByContext(contextType, resultType) {
        const apps = await this._getApps();
        if (apps.length === 0) {
            this._logger.warn("Unable to get apps so we can not get apps and intents that support a particular context");
            return [];
        }
        const intents = {};
        for (const app of apps) {
            const listensFor = app.interop?.intents?.listensFor;
            if (!(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(listensFor)) {
                const supportedIntents = Object.keys(listensFor);
                for (const supportedIntent of supportedIntents) {
                    const appIntent = listensFor[supportedIntent];
                    const include = this.appIntentContains(appIntent, contextType, resultType);
                    if (include) {
                        this.updateAppIntentsMap(intents, supportedIntent, appIntent.displayName, app);
                    }
                }
            }
        }
        return Object.values(intents);
    }
    /**
     * Check to see if the supplied appIntent supports the context and result types.
     * @param appIntent The app intent to check.
     * @param contextType The optional context type to look for.
     * @param resultType The optional result type to look for.
     * @returns True if the app intent matches.
     */
    appIntentContains(appIntent, contextType, resultType) {
        if (!(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(contextType) && !(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(resultType)) {
            if (!appIntent?.contexts?.includes(contextType) || !appIntent.resultType?.includes(resultType)) {
                return false;
            }
        }
        else if (!(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(contextType) && !appIntent?.contexts?.includes(contextType)) {
            return false;
        }
        else if (!(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(resultType) && !appIntent?.resultType?.includes(resultType)) {
            return false;
        }
        return true;
    }
    /**
     * Update the map containing the intent to apps.
     * @param intentsMap The map to update.
     * @param name The name of the intent.
     * @param displayName The Options display name to update with.
     * @param app The application to update.
     */
    updateAppIntentsMap(intentsMap, name, displayName, app) {
        if ((0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(intentsMap[name])) {
            // in a production app you would either need to ensure that every app was populated with the same name & displayName for an intent from a golden source (e.g. intents table) so picking the first entry wouldn't make a difference.
            // or you could pull in a golden source of intents from a service and then do a lookup using the intent name to get an object with intent name and official display name.
            intentsMap[name] = {
                intent: {
                    name,
                    displayName
                },
                apps: []
            };
        }
        intentsMap[name].apps.push(app);
    }
}


/***/ }),

/***/ "./client/src/modules/interop-override/wps-interop-override/broker/client-registration-helper.ts":
/*!*******************************************************************************************************!*\
  !*** ./client/src/modules/interop-override/wps-interop-override/broker/client-registration-helper.ts ***!
  \*******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ClientRegistrationHelper: () => (/* binding */ ClientRegistrationHelper)
/* harmony export */ });
/* harmony import */ var _finos_fdc3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @finos/fdc3 */ "../../node_modules/@finos/fdc3/dist/fdc3.esm.js");
/* harmony import */ var workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! workspace-platform-starter/utils */ "./client/src/framework/utils.ts");


/**
 * Used to track client interactions with a broker.
 */
class ClientRegistrationHelper {
    /**
     * Create an instance of the Client Registration Helper.
     * @param lookupAppId determine appId based on clientIdentity
     * @param logger the logger to use.
     */
    constructor(lookupAppId, logger) {
        this._logger = logger;
        this._lookupAppId = lookupAppId;
        this._clientReadyRequests = {};
        this._trackedClientConnections = {};
        this._trackedContextHandlers = {};
        this._trackedIntentHandlers = {};
    }
    /**
     * The client has disconnected form the broker.
     * @param clientIdentity The identity of the client that disconnected.
     */
    async clientDisconnected(clientIdentity) {
        this._logger.info("Client Disconnected.", clientIdentity);
        for (const [key, value] of Object.entries(this._trackedIntentHandlers)) {
            this._trackedIntentHandlers[key] = value.filter((entry) => entry.clientIdentity.endpointId !== clientIdentity.endpointId);
        }
        for (const [key, value] of Object.entries(this._trackedContextHandlers)) {
            this._trackedContextHandlers[key] = value.filter((entry) => entry.clientIdentity.endpointId !== clientIdentity.endpointId);
        }
        this.removeTrackedClientConnection(clientIdentity);
    }
    /**
     * Handle an intent handler being registered.
     * @param payload The payload.
     * @param clientIdentity The client identity.
     * @returns Nothing.
     */
    async intentHandlerRegistered(payload, clientIdentity) {
        this._logger.info("intentHandlerRegistered:", payload, clientIdentity);
        if (!(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_1__.isEmpty)(payload)) {
            const intentName = payload.handlerId.replace("intent-handler-", "");
            let trackedIntentHandler = this._trackedIntentHandlers[intentName];
            if ((0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_1__.isEmpty)(trackedIntentHandler)) {
                trackedIntentHandler = [];
                this._trackedIntentHandlers[intentName] = trackedIntentHandler;
            }
            const trackedHandler = this._trackedIntentHandlers[intentName].find((entry) => entry.clientIdentity.endpointId === clientIdentity.endpointId);
            if ((0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_1__.isEmpty)(trackedHandler)) {
                this._logger.info(`intentHandler endpoint not registered. Registering ${clientIdentity.endpointId} against intent ${intentName} and looking up app name.`);
                const appId = await this._lookupAppId(clientIdentity);
                if ((0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_1__.isEmpty)(appId)) {
                    this._logger.warn("Unable to determine app id based on name. This app will not be tracked via intent handler registration.");
                    return;
                }
                this._trackedIntentHandlers[intentName].push({
                    fdc3Version: payload.fdc3Version,
                    clientIdentity,
                    appId
                });
                this._logger.info(`intentHandler endpoint: ${clientIdentity.endpointId} registered against intent: ${intentName} and app Id: ${appId}.`);
            }
            const clientReadyKey = this.getClientReadyKey(clientIdentity, "intent", intentName);
            if (!(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_1__.isEmpty)(this._clientReadyRequests[clientReadyKey])) {
                this._logger.info("Resolving client ready request.");
                this._clientReadyRequests[clientReadyKey](clientIdentity.endpointId);
            }
        }
    }
    /**
     * A context handler has been registered against the broker.
     * @param payload The payload from a context listener registration.
     * @param payload.contextType The context type that the client is listening for.
     * @param payload.handlerId The handler Id for this listener.
     * @param clientIdentity The identity of the application that is adding the context handler.
     */
    async contextHandlerRegistered(payload, clientIdentity) {
        this._logger.info("contextHandlerRegistered:", payload, clientIdentity);
        if (!(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_1__.isEmpty)(payload?.handlerId)) {
            const contextTypeName = payload?.contextType ?? "*";
            const handlerId = payload.handlerId;
            let trackedContextHandler = this._trackedContextHandlers[contextTypeName];
            if ((0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_1__.isEmpty)(trackedContextHandler)) {
                trackedContextHandler = [];
                this._trackedContextHandlers[contextTypeName] = trackedContextHandler;
            }
            const trackedHandler = this._trackedContextHandlers[contextTypeName].find((entry) => entry.clientIdentity.endpointId === clientIdentity.endpointId);
            if ((0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_1__.isEmpty)(trackedHandler)) {
                this._logger.info(`contextHandler endpoint not registered. Registering ${clientIdentity.endpointId} against context handler for context type ${contextTypeName} and looking up app name.`);
                const appId = await this._lookupAppId(clientIdentity);
                if ((0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_1__.isEmpty)(appId)) {
                    this._logger.warn("Unable to determine app id based on name. This app will not be tracked via context handler registration.");
                    return;
                }
                this._trackedContextHandlers[contextTypeName].push({
                    clientIdentity,
                    appId,
                    handlerId
                });
                this._logger.info(`contextHandler endpoint: ${clientIdentity.endpointId} registered against context type: ${contextTypeName} and app Id: ${appId}.`);
            }
            const clientReadyKey = this.getClientReadyKey(clientIdentity, "context", contextTypeName);
            if (!(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_1__.isEmpty)(this._clientReadyRequests[clientReadyKey])) {
                this._logger.info("Resolving client ready request.");
                this._clientReadyRequests[clientReadyKey](clientIdentity.endpointId);
            }
        }
    }
    /**
     * Capture the connection and API version.
     * @param id The client identity to capture from.
     * @param payload The payload.
     */
    async clientConnectionRegistered(id, payload) {
        const key = `${id.uuid}-${id.name}`;
        let apiVersion;
        if ((0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_1__.isEmpty)(this._trackedClientConnections[key])) {
            if (id.uuid !== fin.me.identity.uuid) {
                const payloadApiVersion = payload?.apiVersion;
                if (!(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_1__.isEmpty)(payloadApiVersion) && !(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_1__.isEmpty)(payloadApiVersion?.type)) {
                    apiVersion = payloadApiVersion;
                }
                else if ((0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_1__.isStringValue)(id.connectionUrl)) {
                    // if they haven't specified apiVersion meta data and it is external and has a url then we will assume fdc3 2.0
                    apiVersion = { type: "fdc3", version: "2.0" };
                }
                else {
                    // if a native app has specified a preference through apiVersion then we assume interop
                    apiVersion = { type: "interop" };
                }
            }
            else {
                const entityType = id.entityType;
                if (!(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_1__.isEmpty)(entityType)) {
                    switch (entityType) {
                        case "window": {
                            apiVersion = await this.captureWindowApiUsage(id);
                            break;
                        }
                        case "view": {
                            apiVersion = await this.captureViewApiUsage(id);
                            break;
                        }
                        default: {
                            this._logger.warn(`We currently do not check for entity types that are not views or windows. Entity type: ${entityType}`);
                        }
                    }
                }
                else {
                    apiVersion = await this.captureViewApiUsage(id);
                    if ((0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_1__.isEmpty)(apiVersion)) {
                        // perhaps it is a window
                        apiVersion = await this.captureWindowApiUsage(id);
                    }
                }
            }
            const brokerClientConnection = {
                clientIdentity: id,
                apiMetadata: apiVersion
            };
            this._trackedClientConnections[key] = brokerClientConnection;
            const clientReadyKey = this.getClientReadyKey(id, "connection");
            if (!(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_1__.isEmpty)(this._clientReadyRequests[clientReadyKey])) {
                this._logger.info("Resolving client ready request.");
                this._clientReadyRequests[clientReadyKey](id.endpointId);
            }
        }
    }
    /**
     * Get a context handler that matches the context type name and instance id.
     * @param contextTypeName the name of the context the listener is registered for.
     * @param instanceId the instanceId you wish to check for.
     * @returns The ContextRegistrationEntry or undefined.
     */
    getRegisteredContextHandler(contextTypeName, instanceId) {
        const trackedHandler = this._trackedContextHandlers[contextTypeName]?.find((entry) => entry.clientIdentity.endpointId === instanceId);
        return trackedHandler;
    }
    /**
     * Handle FDC3 find instances for app instances that have registered for an intent.
     * @param app The app identifier to find.
     * @param clientIdentity The client identity.
     * @param type the type of app instances you are after. CONNECTED = anything that has connected to the broker and INTENT means an APP that has registered an Intent Handler.
     * @returns The instance of the app.
     */
    async findAppInstances(app, clientIdentity, type = "connected") {
        const endpointApps = {};
        if (type === "intent") {
            for (const [, value] of Object.entries(this._trackedIntentHandlers)) {
                const entries = value.filter((entry) => entry.appId === app.appId);
                for (const entry of entries) {
                    endpointApps[entry.clientIdentity.endpointId] = {
                        appId: entry.appId ?? "",
                        instanceId: entry.clientIdentity.endpointId
                    };
                }
            }
            return Object.values(endpointApps);
        }
        for (const [, value] of Object.entries(this._trackedClientConnections)) {
            const trackedAppId = await this._lookupAppId(value.clientIdentity);
            if (trackedAppId === app.appId && (0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_1__.isEmpty)(endpointApps[value.clientIdentity.endpointId])) {
                endpointApps[value.clientIdentity.endpointId] = {
                    appId: app.appId ?? "",
                    instanceId: value.clientIdentity.endpointId
                };
            }
        }
        return Object.values(endpointApps);
    }
    /**
     * Get the api version for the identity.
     * @param id The identity to get the api version for.
     * @returns The api metadata.
     */
    getApiVersion(id) {
        const key = `${id.uuid}-${id.name}`;
        const apiVersion = this._trackedClientConnections[key]?.apiMetadata;
        return apiVersion;
    }
    /**
     * Handle client ready event for opening and awaiting a connection to the broker.
     * @param identity The identity of the client.
     * @param timeout The timeout to wait for the client.
     * @returns The instance id.
     */
    async onConnectionClientReady(identity, timeout = 15000) {
        return new Promise((resolve, reject) => {
            const clientIdentity = this.getClientIdentity(identity);
            if (!(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_1__.isEmpty)(clientIdentity)) {
                resolve(clientIdentity.endpointId);
            }
            const key = this.getClientReadyKey(identity, "connection");
            const timerId = setTimeout(() => {
                if (!(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_1__.isEmpty)(this._clientReadyRequests[key])) {
                    delete this._clientReadyRequests[key];
                    reject(_finos_fdc3__WEBPACK_IMPORTED_MODULE_0__.ResolveError.TargetInstanceUnavailable);
                }
            }, timeout);
            this._clientReadyRequests[key] = (instanceId) => {
                clearTimeout(timerId);
                // clear the callback asynchronously
                delete this._clientReadyRequests[key];
                resolve(instanceId);
            };
        });
    }
    /**
     * Handle client ready event for intent handling.
     * @param identity The identity of the client.
     * @param intentName The intent name.
     * @param timeout The timeout to wait for the client.
     * @returns The instance id.
     */
    async onIntentClientReady(identity, intentName, timeout = 15000) {
        return new Promise((resolve, reject) => {
            const registeredHandlers = this._trackedIntentHandlers[intentName];
            let existingInstanceId;
            if (!(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_1__.isEmpty)(registeredHandlers)) {
                for (const handler of registeredHandlers) {
                    if (handler.clientIdentity.uuid === identity.uuid &&
                        handler.clientIdentity.name === identity.name) {
                        existingInstanceId = handler.clientIdentity.endpointId;
                        break;
                    }
                }
            }
            if (!(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_1__.isEmpty)(existingInstanceId)) {
                resolve(existingInstanceId);
            }
            const key = this.getClientReadyKey(identity, "intent", intentName);
            const timerId = setTimeout(() => {
                if (!(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_1__.isEmpty)(this._clientReadyRequests[key])) {
                    delete this._clientReadyRequests[key];
                    reject(_finos_fdc3__WEBPACK_IMPORTED_MODULE_0__.ResolveError.IntentDeliveryFailed);
                }
            }, timeout);
            this._clientReadyRequests[key] = (instanceId) => {
                clearTimeout(timerId);
                // clear the callback asynchronously
                delete this._clientReadyRequests[key];
                resolve(instanceId);
            };
        });
    }
    /**
     * Handle client ready event for context handling.
     * @param identity The identity of the client.
     * @param contextTypeName The contextType name.
     * @param timeout The timeout to wait for the client.
     * @returns The instance id.
     */
    async onContextClientReady(identity, contextTypeName, timeout = 15000) {
        return new Promise((resolve, reject) => {
            const contextRegisteredHandlers = this._trackedContextHandlers[contextTypeName];
            const globalRegisteredHandlers = this._trackedContextHandlers["*"];
            let existingContextHandlerInstanceId;
            if (!(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_1__.isEmpty)(contextRegisteredHandlers)) {
                for (const handler of contextRegisteredHandlers) {
                    if (handler.clientIdentity.uuid === identity.uuid &&
                        handler.clientIdentity.name === identity.name) {
                        existingContextHandlerInstanceId = handler.clientIdentity.endpointId;
                        break;
                    }
                }
            }
            if (!(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_1__.isEmpty)(globalRegisteredHandlers) && (0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_1__.isEmpty)(existingContextHandlerInstanceId)) {
                for (const handler of globalRegisteredHandlers) {
                    if (handler.clientIdentity.uuid === identity.uuid &&
                        handler.clientIdentity.name === identity.name) {
                        existingContextHandlerInstanceId = handler.clientIdentity.endpointId;
                        break;
                    }
                }
            }
            if (!(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_1__.isEmpty)(existingContextHandlerInstanceId)) {
                resolve(existingContextHandlerInstanceId);
                return;
            }
            const contextKey = this.getClientReadyKey(identity, "context", contextTypeName);
            const globalKey = this.getClientReadyKey(identity, "context", "*");
            const timerId = setTimeout(() => {
                const hasContextRequest = !(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_1__.isEmpty)(this._clientReadyRequests[contextKey]);
                const hasGlobalRequest = !(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_1__.isEmpty)(this._clientReadyRequests[globalKey]);
                if (hasContextRequest || hasGlobalRequest) {
                    delete this._clientReadyRequests[contextKey];
                    delete this._clientReadyRequests[globalKey];
                    reject(_finos_fdc3__WEBPACK_IMPORTED_MODULE_0__.OpenError.AppTimeout);
                }
            }, timeout);
            let isResolved = false;
            this._clientReadyRequests[contextKey] = (instanceId) => {
                clearTimeout(timerId);
                if (!isResolved) {
                    isResolved = true;
                    // clear the callback asynchronously
                    delete this._clientReadyRequests[contextKey];
                    delete this._clientReadyRequests[globalKey];
                    resolve(instanceId);
                }
            };
            this._clientReadyRequests[globalKey] = (instanceId) => {
                clearTimeout(timerId);
                if (!isResolved) {
                    isResolved = true;
                    // clear the callback asynchronously
                    delete this._clientReadyRequests[contextKey];
                    delete this._clientReadyRequests[globalKey];
                    resolve(instanceId);
                }
            };
        });
    }
    /**
     * Get the client identity given a standard identity.
     * @param id The identity to get the client identity for.
     * @returns The client identity if available.
     */
    getClientIdentity(id) {
        const key = `${id.uuid}-${id.name}`;
        const clientIdentity = this._trackedClientConnections[key]?.clientIdentity;
        return clientIdentity;
    }
    /**
     * Remove the tracking for the identity.
     * @param id The identity to remove the connection information for.
     */
    removeTrackedClientConnection(id) {
        const key = `${id.uuid}-${id.name}`;
        delete this._trackedClientConnections[key];
    }
    /**
     * Get the fdc3 usage from a window.
     * @param id The if of the view to get the info from.
     * @returns The api metadata.
     */
    async captureWindowApiUsage(id) {
        try {
            const target = fin.Window.wrapSync(id);
            const options = await target.getOptions();
            if (!(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_1__.isEmpty)(options.fdc3InteropApi)) {
                return {
                    type: "fdc3",
                    version: options.fdc3InteropApi
                };
            }
        }
        catch { }
    }
    /**
     * Get the dc3 usage from a view.
     * @param id The id of the window to get the info from.
     * @returns The api metadata.
     */
    async captureViewApiUsage(id) {
        try {
            const target = fin.View.wrapSync(id);
            const options = await target.getOptions();
            if (!(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_1__.isEmpty)(options.fdc3InteropApi)) {
                return {
                    type: "fdc3",
                    version: options.fdc3InteropApi
                };
            }
        }
        catch { }
    }
    /**
     * Get a key that can be used for an identity and client.
     * @param identity The identity to use in the key.
     * @param type The type of ready event you are looking for
     * @param name The name of the type if required to use in the key
     * @returns The key.
     */
    getClientReadyKey(identity, type, name) {
        if ((0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_1__.isEmpty)(name)) {
            return `${identity.uuid}/${identity.name}/${type}`;
        }
        return `${identity.uuid}/${identity.name}/${type}/${name}`;
    }
}


/***/ }),

/***/ "./client/src/modules/interop-override/wps-interop-override/broker/intent-resolver-helper.ts":
/*!***************************************************************************************************!*\
  !*** ./client/src/modules/interop-override/wps-interop-override/broker/intent-resolver-helper.ts ***!
  \***************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   IntentResolverHelper: () => (/* binding */ IntentResolverHelper)
/* harmony export */ });
/* harmony import */ var _finos_fdc3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @finos/fdc3 */ "../../node_modules/@finos/fdc3/dist/fdc3.esm.js");
/* harmony import */ var workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! workspace-platform-starter/utils */ "./client/src/framework/utils.ts");
/* harmony import */ var workspace_platform_starter_utils_position__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! workspace-platform-starter/utils-position */ "./client/src/framework/utils-position.ts");



/**
 * An Intent Resolver Used for resolving intent selection.
 */
class IntentResolverHelper {
    /**
     * Create an instance of the Intent Resolver Helper.
     * @param intentResolverOptions options for the helper
     * @param logger the logger to use.
     * @param unregisteredAppId if you support unregistered apps what Id should they be assigned against.
     */
    constructor(intentResolverOptions, logger, unregisteredAppId) {
        this._defaultIntentResolverHeight = 715;
        this._defaultIntentResolverWidth = 665;
        this._intentResolverOptions = {
            height: this._defaultIntentResolverHeight,
            width: this._defaultIntentResolverWidth,
            fdc3InteropApi: "2.0",
            title: "Intent Resolver",
            ...intentResolverOptions
        };
        this._logger = logger;
    }
    /**
     * Launch the intent resolver.
     * @param launchOptions The options for launching the resolver.
     * @param launchOptions.apps The apps to pick from.
     * @param launchOptions.intent The intent to pick.
     * @param launchOptions.intents The intents to pick from.
     * @param clientIdentity The client that triggered this request.
     * @returns The response from the intent resolver.
     */
    async launchIntentResolver(launchOptions, clientIdentity) {
        // launch a new window and optionally pass the available intents as customData.apps as part of the window
        // options the window can then use raiseIntent against a specific app (the selected one). this logic runs in
        // the provider so we are using it as a way of determining the root (so it works with root hosting and
        // subdirectory based hosting if a url is not provided)
        try {
            const position = await (0,workspace_platform_starter_utils_position__WEBPACK_IMPORTED_MODULE_2__.centerContentInIdentity)(clientIdentity, {
                height: this._intentResolverOptions?.height ?? this._defaultIntentResolverHeight,
                width: this._intentResolverOptions?.width ?? this._defaultIntentResolverWidth
            });
            const winOption = {
                name: "intent-picker",
                includeInSnapshots: false,
                fdc3InteropApi: this._intentResolverOptions?.fdc3InteropApi,
                defaultWidth: this._intentResolverOptions?.width,
                defaultHeight: this._intentResolverOptions?.height,
                showTaskbarIcon: false,
                saveWindowState: false,
                customData: {
                    title: this._intentResolverOptions?.title,
                    apps: launchOptions.apps,
                    intent: launchOptions.intent,
                    intents: launchOptions.intents,
                    unregisteredAppId: this._unregisteredAppId
                },
                url: this._intentResolverOptions?.url,
                frame: false,
                autoShow: true,
                alwaysOnTop: true
            };
            if (!(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_1__.isEmpty)(position)) {
                winOption.defaultLeft = position.x;
                winOption.defaultTop = position.y;
            }
            else {
                winOption.defaultCentered = true;
            }
            const win = await fin.Window.create(winOption);
            const webWindow = win.getWebWindow();
            const webWindowResolver = webWindow;
            const selectedAppId = await webWindowResolver.getIntentSelection();
            return selectedAppId;
        }
        catch (error) {
            const message = (0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_1__.formatError)(error);
            if (message?.includes(_finos_fdc3__WEBPACK_IMPORTED_MODULE_0__.ResolveError.UserCancelled)) {
                this._logger.info("App for intent not selected/launched by user", launchOptions.intent);
                throw new Error(message);
            }
            this._logger.error("Unexpected error from intent picker/resolver for intent", launchOptions.intent);
            throw new Error(_finos_fdc3__WEBPACK_IMPORTED_MODULE_0__.ResolveError.ResolverUnavailable);
        }
    }
}


/***/ }),

/***/ "./client/src/modules/interop-override/wps-interop-override/broker/wps-interop-override.ts":
/*!*************************************************************************************************!*\
  !*** ./client/src/modules/interop-override/wps-interop-override/broker/wps-interop-override.ts ***!
  \*************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getConstructorOverride: () => (/* binding */ getConstructorOverride)
/* harmony export */ });
/* harmony import */ var _finos_fdc3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @finos/fdc3 */ "../../node_modules/@finos/fdc3/dist/fdc3.esm.js");
/* harmony import */ var workspace_platform_starter_fdc3_1_2_mapper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! workspace-platform-starter/fdc3/1.2/mapper */ "./client/src/framework/fdc3/1.2/mapper.ts");
/* harmony import */ var workspace_platform_starter_fdc3_2_0_mapper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! workspace-platform-starter/fdc3/2.0/mapper */ "./client/src/framework/fdc3/2.0/mapper.ts");
/* harmony import */ var workspace_platform_starter_manifest_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! workspace-platform-starter/manifest-types */ "./client/src/framework/manifest-types.ts");
/* harmony import */ var workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! workspace-platform-starter/utils */ "./client/src/framework/utils.ts");
/* harmony import */ var workspace_platform_starter_utils_position__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! workspace-platform-starter/utils-position */ "./client/src/framework/utils-position.ts");
/* harmony import */ var _app_intent_helper__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./app-intent-helper */ "./client/src/modules/interop-override/wps-interop-override/broker/app-intent-helper.ts");
/* harmony import */ var _client_registration_helper__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./client-registration-helper */ "./client/src/modules/interop-override/wps-interop-override/broker/client-registration-helper.ts");
/* harmony import */ var _intent_resolver_helper__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./intent-resolver-helper */ "./client/src/modules/interop-override/wps-interop-override/broker/intent-resolver-helper.ts");









/**
 * Get the override constructor for the interop broker (useful if you wish this implementation to be layered with other implementations and passed to the platform's initialization object as part of an array).
 * @param options The options for the interop broker defined as part of the platform.
 * @param logger The logger to use.
 * @param helpers A collection of helper methods.
 * @returns The override constructor to be used in an array.
 */
async function getConstructorOverride(options, logger, helpers) {
    if (!helpers?.getApp || !helpers?.getApps || !helpers.launchApp) {
        throw new Error("Interop Broker Constructor is missing required helpers. The broker will not function correctly so this error is to flag the issue.");
    }
    const getApp = helpers.getApp;
    const getApps = helpers.getApps;
    let endpointClient;
    if (helpers?.getEndpointClient) {
        endpointClient = await helpers?.getEndpointClient();
    }
    const launch = helpers.launchApp;
    return (Base) => 
    /**
     * Extend the InteropBroker to handle intents.
     */
    class InteropOverride extends Base {
        /**
         * Create a new instance of InteropBroker.
         */
        constructor() {
            super();
            logger.info("Interop Broker Constructor applying settings.");
            this._appIntentHelper = new _app_intent_helper__WEBPACK_IMPORTED_MODULE_6__.AppIntentHelper(getApps, logger);
            this._clientRegistrationHelper = new _client_registration_helper__WEBPACK_IMPORTED_MODULE_7__.ClientRegistrationHelper(async (clientIdentity) => this.lookupAppId(clientIdentity), logger);
            this._metadataKey = `_metadata_${(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_4__.randomUUID)()}`;
            if (options.intentResolver) {
                this._intentResolverHelper = new _intent_resolver_helper__WEBPACK_IMPORTED_MODULE_8__.IntentResolverHelper(options.intentResolver, logger, options?.unregisteredApp?.appId);
            }
            this._openOptions = options?.openOptions;
            this._unregisteredApp = options?.unregisteredApp;
            if (!(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_4__.isEmpty)(this._unregisteredApp)) {
                this._unregisteredApp.manifestType = workspace_platform_starter_manifest_types__WEBPACK_IMPORTED_MODULE_3__.MANIFEST_TYPES.UnregisteredApp.id;
            }
        }
        /**
         * Is the connection authorized.
         * @param id The id of the client identity to check.
         * @param payload The payload to send with the authorization check.
         * @returns True if the connection is authorized.
         */
        async isConnectionAuthorized(id, payload) {
            logger.info("Interop connection being made by the following identity. About to verify connection", id);
            const apiPayload = payload;
            if (!(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_4__.isEmpty)(helpers.isConnectionValid)) {
                const response = await helpers.isConnectionValid(id, payload, { type: "broker" });
                if (response.isValid) {
                    logger.info("Connection validation request was validated and is valid.");
                    await this._clientRegistrationHelper.clientConnectionRegistered(id, apiPayload);
                }
                else {
                    logger.warn(`Connection request from ${JSON.stringify(id)} was validated and rejected.`);
                }
                return response.isValid;
            }
            // we have not been provided with a means to validate the connection so fallback to default behavior and register the connection
            const isValid = await super.isConnectionAuthorized(id, payload);
            if (isValid) {
                await this._clientRegistrationHelper.clientConnectionRegistered(id, apiPayload);
            }
            return isValid;
        }
        /**
         * Sets a context for the context group of the incoming current entity.
         * @param sentContext New context to set.
         * @param sentContext.context The context to send.
         * @param clientIdentity Identity of the client sender.
         */
        async setContext(sentContext, clientIdentity) {
            sentContext.context = await this.processContext(sentContext.context);
            const contextMetadata = await this.getContextMetadata(clientIdentity);
            sentContext.context = {
                ...sentContext.context,
                [this._metadataKey]: contextMetadata
            };
            super.setContext(sentContext, clientIdentity);
        }
        /**
         * Invokes the context handler.
         * @param clientIdentity The client identity.
         * @param handlerId The handler ID.
         * @param context The context to invoke.
         * @returns A promise that resolves when the context handler is invoked.
         */
        async invokeContextHandler(clientIdentity, handlerId, context) {
            const passedContext = { ...context };
            const contextMetadata = passedContext[this._metadataKey];
            if (!(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_4__.isEmpty)(contextMetadata)) {
                delete passedContext[this._metadataKey];
            }
            return super.invokeContextHandler(clientIdentity, handlerId, {
                ...passedContext,
                contextMetadata
            });
        }
        /**
         * Handle the information for intents by context.
         * @param contextOptions The context options.
         * @param clientIdentity The client.
         * @returns The intents mapped to app metadata.
         */
        async handleInfoForIntentsByContext(contextOptions, clientIdentity) {
            let requestedContextType;
            let requestedResultType;
            let request;
            const apiVersion = this._clientRegistrationHelper.getApiVersion(clientIdentity);
            if ("type" in contextOptions) {
                requestedContextType = contextOptions.type;
            }
            else {
                request = contextOptions;
                requestedContextType = request.context.type;
                requestedResultType = request.metadata.resultType;
            }
            const intents = await this._appIntentHelper.getIntentsByContext(requestedContextType, requestedResultType);
            if (intents.length === 0) {
                throw new Error(_finos_fdc3__WEBPACK_IMPORTED_MODULE_0__.ResolveError.NoAppsFound);
            }
            const isFDC32 = apiVersion?.type === "fdc3" && apiVersion.version === "2.0";
            const mappedIntents = intents.map((entry) => ({
                intent: entry.intent,
                apps: entry.apps.map((app) => {
                    let resultType;
                    const listensFor = app?.interop?.intents?.listensFor;
                    if (!(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_4__.isEmpty)(listensFor) && !(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_4__.isEmpty)(listensFor[entry.intent.name])) {
                        resultType = listensFor[entry.intent.name].resultType;
                    }
                    const appEntry = isFDC32 ? (0,workspace_platform_starter_fdc3_2_0_mapper__WEBPACK_IMPORTED_MODULE_2__.mapToAppMetaData)(app, resultType) : (0,workspace_platform_starter_fdc3_1_2_mapper__WEBPACK_IMPORTED_MODULE_1__.mapToAppMetaData)(app);
                    return appEntry;
                })
            }));
            return mappedIntents;
        }
        /**
         * Handle the information for and intent.
         * @param intentOptions The intent options.
         * @param clientIdentity The client.
         * @returns The intents mapped to app metadata.
         */
        async handleInfoForIntent(intentOptions, clientIdentity) {
            const apiVersion = this._clientRegistrationHelper.getApiVersion(clientIdentity);
            let contextType;
            const optContextType = intentOptions?.context?.type;
            if (!(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_4__.isEmpty)(optContextType) && optContextType !== "fdc3.nothing") {
                contextType = optContextType;
            }
            const result = await this._appIntentHelper.getIntent(intentOptions.name, contextType, intentOptions?.metadata?.resultType);
            if ((0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_4__.isEmpty)(result)) {
                throw new Error(_finos_fdc3__WEBPACK_IMPORTED_MODULE_0__.ResolveError.NoAppsFound);
            }
            const isFDC32 = apiVersion?.type === "fdc3" && apiVersion.version === "2.0";
            const response = {
                intent: result.intent,
                apps: result.apps.map((app) => {
                    let resultType;
                    const listensFor = app?.interop?.intents?.listensFor;
                    if (!(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_4__.isEmpty)(listensFor) && !(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_4__.isEmpty)(listensFor[result.intent.name])) {
                        resultType = listensFor[result.intent.name].resultType;
                    }
                    const appEntry = isFDC32 ? (0,workspace_platform_starter_fdc3_2_0_mapper__WEBPACK_IMPORTED_MODULE_2__.mapToAppMetaData)(app, resultType) : (0,workspace_platform_starter_fdc3_1_2_mapper__WEBPACK_IMPORTED_MODULE_1__.mapToAppMetaData)(app);
                    return appEntry;
                })
            };
            return response;
        }
        /**
         * Handle the fired intent for context.
         * @param contextForIntent The context for the intent.
         * @param contextForIntent.type The type of the intent.
         * @param contextForIntent.metadata The metadata for the intent.
         * @param clientIdentity The client identity.
         * @returns The intent resolution.
         */
        async handleFiredIntentForContext(contextForIntent, clientIdentity) {
            const targetAppIdentifier = this.getApplicationIdentity(contextForIntent.metadata);
            const usesAppIdentity = this.usesApplicationIdentity(clientIdentity);
            const intent = {
                context: contextForIntent
            };
            const intentsForSelection = await this._appIntentHelper.getIntentsByContext(contextForIntent.type);
            // app specified flow
            if (!(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_4__.isEmpty)(targetAppIdentifier)) {
                const targetApp = await getApp(targetAppIdentifier.appId);
                if ((0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_4__.isEmpty)(targetApp)) {
                    throw new Error(_finos_fdc3__WEBPACK_IMPORTED_MODULE_0__.ResolveError.TargetAppUnavailable);
                }
                if (!targetApp?.interop?.intents?.listensFor ||
                    !Object.values(targetApp.interop.intents.listensFor).some((listenedForIntent) => listenedForIntent.contexts.includes(contextForIntent.type))) {
                    throw new Error(_finos_fdc3__WEBPACK_IMPORTED_MODULE_0__.ResolveError.NoAppsFound);
                }
                const intentResolver = await this.handleTargetedIntent(targetAppIdentifier, intent, true, clientIdentity);
                return this.shapeIntentResolver(intentResolver, usesAppIdentity);
            }
            // check for unregistered app intent handlers (if enabled)
            const unregisteredAppIntents = await this.getUnregisteredAppIntentByContext(contextForIntent.type, clientIdentity);
            if (unregisteredAppIntents.length > 0 && !(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_4__.isEmpty)(this._unregisteredApp)) {
                const matchedIntents = [];
                for (const intentForSelection of intentsForSelection) {
                    if (unregisteredAppIntents.includes(intentForSelection.intent.name)) {
                        intentForSelection.apps.push(this._unregisteredApp);
                        matchedIntents.push(intentForSelection.intent.name);
                    }
                }
                const missingIntentMatches = unregisteredAppIntents.filter((intentName) => !matchedIntents.includes(intentName));
                for (const missingIntentMatch of missingIntentMatches) {
                    const missingIntent = this._unregisteredApp.intents?.find((entry) => entry.name === missingIntentMatch);
                    if (missingIntent) {
                        intentsForSelection.push({
                            intent: { name: missingIntent.name, displayName: missingIntent.displayName },
                            apps: [this._unregisteredApp]
                        });
                    }
                }
            }
            let userSelection;
            if (intentsForSelection.length === 1) {
                const intentForSelection = intentsForSelection[0];
                // only one intent matches the passed context
                intent.name = intentForSelection.intent.name;
                intent.displayName = intentForSelection.intent.displayName;
                if (intentForSelection.apps.length === 1) {
                    const appInstances = await this._clientRegistrationHelper.findAppInstances(intentForSelection.apps[0], clientIdentity, "intent");
                    // if there are no instances launch a new one otherwise present the choice to the user
                    // by falling through to the next code block
                    if (appInstances.length === 0 || this.createNewInstance(intentForSelection.apps[0])) {
                        const intentResolver = await this.launchAppWithIntent(intentForSelection.apps[0], intent, undefined, clientIdentity);
                        if ((0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_4__.isEmpty)(intentResolver)) {
                            throw new Error(_finos_fdc3__WEBPACK_IMPORTED_MODULE_0__.ResolveError.NoAppsFound);
                        }
                        return this.shapeIntentResolver(intentResolver, usesAppIdentity);
                    }
                }
                userSelection = await this._intentResolverHelper?.launchIntentResolver({
                    apps: intentsForSelection[0].apps,
                    intent
                }, clientIdentity);
            }
            else {
                userSelection = await this._intentResolverHelper?.launchIntentResolver({
                    intent,
                    intents: intentsForSelection
                }, clientIdentity);
            }
            // update intent with user selection
            if ((0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_4__.isEmpty)(userSelection)) {
                throw new Error(_finos_fdc3__WEBPACK_IMPORTED_MODULE_0__.ResolveError.ResolverUnavailable);
            }
            intent.displayName = userSelection.intent.displayName;
            intent.name = userSelection.intent.name;
            const intentResolver = await this.handleIntentPickerSelection(userSelection, intent, clientIdentity);
            return this.shapeIntentResolver(intentResolver, usesAppIdentity);
        }
        /**
         * Handle a fired intent.
         * @param intent The intent to handle.
         * @param clientIdentity The client identity.
         * @returns The intent resolution.
         */
        async handleFiredIntent(intent, clientIdentity) {
            logger.info("Received request for a raised intent", intent);
            const targetAppIdentifier = this.getApplicationIdentity(intent.metadata);
            const usesAppIdentifier = this.usesApplicationIdentity(clientIdentity);
            const matchedIntents = await this._appIntentHelper.getIntent(intent.name, intent?.context?.type);
            const intentApps = [];
            if (!(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_4__.isEmpty)(matchedIntents)) {
                intentApps.push(...matchedIntents.apps);
            }
            if (!(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_4__.isEmpty)(targetAppIdentifier)) {
                const targetApp = await getApp(targetAppIdentifier.appId);
                if ((0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_4__.isEmpty)(targetApp)) {
                    throw new Error(_finos_fdc3__WEBPACK_IMPORTED_MODULE_0__.ResolveError.TargetAppUnavailable);
                }
                // ensure that the specified app is one of the intent apps
                if (!intentApps.some((app) => app.appId === targetAppIdentifier.appId)) {
                    throw new Error(_finos_fdc3__WEBPACK_IMPORTED_MODULE_0__.ResolveError.NoAppsFound);
                }
                const intentResolver = await this.handleTargetedIntent(targetAppIdentifier, intent, false, clientIdentity);
                return this.shapeIntentResolver(intentResolver, usesAppIdentifier);
            }
            if (this._unregisteredApp &&
                (await this.canAddUnregisteredApp(clientIdentity, intent.name, intent?.context?.type))) {
                // We have unregistered app instances that support this intent and support for unregistered instances is enabled
                intentApps.push(this._unregisteredApp);
            }
            if (intentApps.length === 0) {
                logger.info("No apps support this intent");
                throw new Error(_finos_fdc3__WEBPACK_IMPORTED_MODULE_0__.ResolveError.NoAppsFound);
            }
            if (intentApps.length === 1) {
                // handle single entry
                const appInstances = await this._clientRegistrationHelper.findAppInstances(intentApps[0], clientIdentity, "intent");
                // if there are no instances launch a new one otherwise present the choice to the user
                // by falling through to the next code block
                let appInstanceId;
                if (appInstances.length === 1) {
                    appInstanceId = appInstances[0].instanceId;
                }
                if (appInstances.length === 0 ||
                    this.useSingleInstance(intentApps[0]) ||
                    this.createNewInstance(intentApps[0])) {
                    const intentResolver = await this.launchAppWithIntent(intentApps[0], intent, appInstanceId, clientIdentity);
                    if ((0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_4__.isEmpty)(intentResolver)) {
                        throw new Error(_finos_fdc3__WEBPACK_IMPORTED_MODULE_0__.ResolveError.NoAppsFound);
                    }
                    return this.shapeIntentResolver(intentResolver, usesAppIdentifier);
                }
            }
            const userSelection = await this._intentResolverHelper?.launchIntentResolver({
                apps: intentApps,
                intent
            }, clientIdentity);
            if ((0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_4__.isEmpty)(userSelection)) {
                throw new Error(_finos_fdc3__WEBPACK_IMPORTED_MODULE_0__.ResolveError.ResolverUnavailable);
            }
            const intentResolver = await this.handleIntentPickerSelection(userSelection, intent, clientIdentity);
            return this.shapeIntentResolver(intentResolver, usesAppIdentifier);
        }
        /**
         * Invoke the intent handler.
         * @param clientIdentity The client identity.
         * @param handlerId The handler ID.
         * @param intent The intent to invoke.
         * @returns A promise that resolves when the intent handler is invoked.
         */
        async invokeIntentHandler(clientIdentity, handlerId, intent) {
            const { context } = intent;
            let contextMetadata;
            let passedContext;
            if (!(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_4__.isEmpty)(context)) {
                passedContext = { ...context };
                contextMetadata = passedContext[this._metadataKey];
                if (!(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_4__.isEmpty)(contextMetadata)) {
                    delete passedContext[this._metadataKey];
                }
            }
            return super.invokeIntentHandler(clientIdentity, handlerId, {
                ...intent,
                context: {
                    ...passedContext,
                    contextMetadata
                }
            });
        }
        /**
         * Handle the FDC3 open.
         * @param fdc3OpenOptions The options for the open.
         * @param fdc3OpenOptions.app The platform app or its id.
         * @param fdc3OpenOptions.context The context being opened.
         * @param clientIdentity The client identity.
         * @returns The application identifier.
         */
        async fdc3HandleOpen(fdc3OpenOptions, clientIdentity) {
            if ((0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_4__.isEmpty)(fdc3OpenOptions?.app)) {
                logger.error("A request to fdc3.open did not pass an fdc3OpenOptions object");
                throw new Error(_finos_fdc3__WEBPACK_IMPORTED_MODULE_0__.ResolveError.NoAppsFound);
            }
            logger.info(`A request to Open has been sent to the platform by uuid: ${clientIdentity?.uuid}, name: ${clientIdentity?.name}, endpointId: ${clientIdentity.endpointId} with passed context:`, fdc3OpenOptions.context);
            try {
                let requestedId;
                let instanceId;
                let platformIdentities;
                let focusApp = false;
                let appId;
                if ((0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_4__.isString)(fdc3OpenOptions.app)) {
                    requestedId = fdc3OpenOptions.app;
                }
                else {
                    requestedId = fdc3OpenOptions.app.appId ?? fdc3OpenOptions.app.name;
                    instanceId = fdc3OpenOptions.app.instanceId;
                }
                const requestedApp = await getApp(requestedId);
                if ((0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_4__.isEmpty)(requestedApp)) {
                    throw new Error(_finos_fdc3__WEBPACK_IMPORTED_MODULE_0__.OpenError.AppNotFound);
                }
                if (!(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_4__.isEmpty)(instanceId)) {
                    // an instance of an application was selected now look up the uuid and name
                    const allConnectedClients = await this.getAllClientInfo();
                    const clientInfo = allConnectedClients.find((connectedClient) => connectedClient.endpointId === instanceId);
                    if (!(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_4__.isEmpty)(clientInfo)) {
                        logger.info(`App Id: ${requestedId} and instance Id: ${instanceId} was provided and found.`);
                        // the connected instance is available
                        platformIdentities = [
                            {
                                uuid: clientInfo.uuid,
                                name: clientInfo.name,
                                appId: requestedId,
                                instanceId
                            }
                        ];
                    }
                    else {
                        throw new Error(_finos_fdc3__WEBPACK_IMPORTED_MODULE_0__.ResolveError.TargetInstanceUnavailable);
                    }
                }
                const isOpenByIntent = this._openOptions?.openStrategy === "intent";
                if (isOpenByIntent) {
                    const openAppIntent = {
                        context: fdc3OpenOptions.context,
                        name: "OpenApp",
                        metadata: {
                            target: { appId: requestedId }
                        }
                    };
                    const result = await this.launchAppWithIntent(requestedApp, openAppIntent, instanceId, clientIdentity);
                    if ((0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_4__.isString)(result.source)) {
                        appId = result.source;
                    }
                    else {
                        appId = result.source.appId;
                        instanceId = result.source.instanceId;
                    }
                }
                else {
                    if ((0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_4__.isEmpty)(platformIdentities)) {
                        let launchPreference;
                        const bounds = await (0,workspace_platform_starter_utils_position__WEBPACK_IMPORTED_MODULE_5__.getWindowPositionUsingStrategy)(options.windowPositionOptions, clientIdentity);
                        if (!(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_4__.isEmpty)(bounds)) {
                            launchPreference = { bounds };
                        }
                        platformIdentities = await launch(requestedApp?.appId, launchPreference);
                    }
                    else {
                        focusApp = true;
                    }
                    if (!(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_4__.isEmpty)(platformIdentities) && platformIdentities?.length > 0) {
                        appId = platformIdentities[0].appId;
                        const openTimeout = this._openOptions?.connectionTimeout;
                        // if we have a snapshot and multiple identities we will not wait as not all of them might not support intents.
                        instanceId = await this._clientRegistrationHelper.onConnectionClientReady(platformIdentities[0], openTimeout);
                        if (platformIdentities.length > 1) {
                            logger.warn("Open can only return one app and instance id and multiple instances were launched as a result. Returning the first instance. Returned instances: ", platformIdentities);
                        }
                        if (!(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_4__.isEmpty)(fdc3OpenOptions?.context)) {
                            const contextTimeout = options?.intentOptions?.intentTimeout;
                            const contextTypeName = fdc3OpenOptions.context.type;
                            // if we have a snapshot and multiple identities we will not wait as not all of them might not support intents.
                            const clientReadyInstanceId = await this._clientRegistrationHelper.onContextClientReady(platformIdentities[0], contextTypeName, contextTimeout);
                            let trackedHandler = this._clientRegistrationHelper.getRegisteredContextHandler(contextTypeName, clientReadyInstanceId);
                            if ((0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_4__.isEmpty)(trackedHandler)) {
                                trackedHandler = this._clientRegistrationHelper.getRegisteredContextHandler("*", clientReadyInstanceId);
                            }
                            if (!(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_4__.isEmpty)(trackedHandler)) {
                                const contextToPass = await this.processContext(fdc3OpenOptions.context);
                                const contextMetadata = await this.getContextMetadata(clientIdentity);
                                const updatedContext = {
                                    ...contextToPass,
                                    [this._metadataKey]: contextMetadata
                                };
                                await this.invokeContextHandler(trackedHandler.clientIdentity, trackedHandler.handlerId, updatedContext);
                            }
                            else {
                                logger.warn(`Unable to send context of type ${contextTypeName} opened app ${appId} with instanceId of ${clientReadyInstanceId} as we cannot find a tracked context handler.`);
                            }
                        }
                    }
                }
                if (!(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_4__.isEmpty)(appId)) {
                    if (focusApp && !(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_4__.isEmpty)(platformIdentities) && !(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_4__.isEmpty)(helpers?.bringAppToFront)) {
                        await helpers.bringAppToFront(requestedApp, platformIdentities);
                    }
                    return { appId, instanceId };
                }
                // if no id returned then the likelihood is that there was a problem launching the application as a result of the open request.
                throw new Error(_finos_fdc3__WEBPACK_IMPORTED_MODULE_0__.OpenError.ErrorOnLaunch);
            }
            catch (openError) {
                const error = (0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_4__.formatError)(openError);
                if (error === _finos_fdc3__WEBPACK_IMPORTED_MODULE_0__.ResolveError.TargetInstanceUnavailable ||
                    error === _finos_fdc3__WEBPACK_IMPORTED_MODULE_0__.ResolveError.IntentDeliveryFailed ||
                    error === _finos_fdc3__WEBPACK_IMPORTED_MODULE_0__.ResolveError.TargetInstanceUnavailable ||
                    error === _finos_fdc3__WEBPACK_IMPORTED_MODULE_0__.OpenError.AppTimeout) {
                    throw new Error(_finos_fdc3__WEBPACK_IMPORTED_MODULE_0__.OpenError.AppTimeout);
                }
                throw openError;
            }
        }
        /**
         * The client has disconnected form the broker.
         * @param clientIdentity The identity of the client that disconnected.
         */
        async clientDisconnected(clientIdentity) {
            await this._clientRegistrationHelper.clientDisconnected(clientIdentity);
            await super.clientDisconnected(clientIdentity);
        }
        /**
         * Handle FDC3 find instances.
         * @param app The app identifier to find.
         * @param clientIdentity The client identity.
         * @returns The instance of the app.
         */
        async fdc3HandleFindInstances(app, clientIdentity) {
            return this._clientRegistrationHelper.findAppInstances(app, clientIdentity);
        }
        /**
         * Handle request to get FDC3 app metadata.
         * @param app The app to get the metadata for.
         * @param clientIdentity The client identity.
         * @returns The app metadata.
         */
        async fdc3HandleGetAppMetadata(app, clientIdentity) {
            logger.info("fdc3HandleGetAppMetadata call received.", app, clientIdentity);
            // this will only be called by FDC3 2.0+
            let platformApp = await getApp(app.appId);
            if ((0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_4__.isEmpty)(platformApp) && app.appId === this._unregisteredApp?.appId) {
                platformApp = this._unregisteredApp;
            }
            if (!(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_4__.isEmpty)(platformApp)) {
                const appMetaData = (0,workspace_platform_starter_fdc3_2_0_mapper__WEBPACK_IMPORTED_MODULE_2__.mapToAppMetaData)(platformApp);
                if (!(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_4__.isEmpty)(app.instanceId)) {
                    const allConnectedClients = await this.getAllClientInfo();
                    const connectedClient = allConnectedClients.find((client) => client.endpointId === app.instanceId);
                    if (!(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_4__.isEmpty)(connectedClient) && connectedClient.uuid === fin.me.identity.uuid) {
                        const identity = { uuid: connectedClient.uuid, name: connectedClient.name };
                        let title;
                        let preview;
                        try {
                            if (connectedClient.entityType === "window") {
                                const instanceWindow = fin.Window.wrapSync(identity);
                                const isVisibleUserWindow = await instanceWindow.isShowing();
                                if (isVisibleUserWindow) {
                                    const windowInfo = await instanceWindow.getInfo();
                                    title = windowInfo.title;
                                    preview = await this.getPreviewImage(instanceWindow);
                                }
                            }
                            else {
                                const instanceView = fin.View.wrapSync(identity);
                                const viewInfo = await instanceView.getInfo();
                                title = viewInfo.title;
                                preview = await this.getPreviewImage(instanceView);
                            }
                        }
                        catch (error) {
                            logger.warn(`A connected client could not be queried for data. It could be it hasn't unregistered itself from the broker. AppId: ${app.appId}, instanceId: ${app.instanceId}, name: ${identity.name}`, error);
                        }
                        if (!(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_4__.isEmpty)(title)) {
                            // ensure no element tags are provided in the title
                            // we don't know how this information will be used
                            // and title hasn't come from the app directory
                            title = (0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_4__.sanitizeString)(title);
                        }
                        const instanceAppMeta = {
                            ...appMetaData,
                            instanceId: app.instanceId,
                            instanceMetadata: { title, preview }
                        };
                        return instanceAppMeta;
                    }
                }
                return appMetaData;
            }
            throw new Error("TargetAppUnavailable");
        }
        /**
         * Handle the request to get FDC3 info.
         * @param payload The payload.
         * @param payload.fdc3Version The version info to get.
         * @param clientIdentity The client identity.
         * @returns The info.
         */
        async fdc3HandleGetInfo(payload, clientIdentity) {
            logger.info("fdc3HandleGetInfo", payload, clientIdentity);
            if (payload?.fdc3Version === "2.0") {
                const response = (await super.fdc3HandleGetInfo(payload, clientIdentity));
                const appId = await this.lookupAppId(clientIdentity);
                if (!(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_4__.isEmpty)(appId)) {
                    const updatedResponse = {
                        ...response,
                        appMetadata: { appId, instanceId: clientIdentity.endpointId }
                    };
                    return updatedResponse;
                }
                return response;
            }
            return super.fdc3HandleGetInfo(payload, clientIdentity);
        }
        /**
         * Handle an intent handler being registered.
         * @param payload The payload.
         * @param clientIdentity The client identity.
         * @returns Nothing.
         */
        async intentHandlerRegistered(payload, clientIdentity) {
            await this._clientRegistrationHelper.intentHandlerRegistered(payload, clientIdentity);
            await super.intentHandlerRegistered(payload, clientIdentity);
        }
        /**
         * A context handler has been registered against the broker.
         * @param payload The payload from a context listener registration.
         * @param payload.contextType The context type that the client is listening for.
         * @param payload.handlerId The handler Id for this listener.
         * @param clientIdentity The identity of the application that is adding the context handler.
         */
        async contextHandlerRegistered(payload, clientIdentity) {
            await this._clientRegistrationHelper.contextHandlerRegistered(payload, clientIdentity);
            super.contextHandlerRegistered(payload, clientIdentity);
        }
        /**
         * Launch an app with intent.
         * @param app The application to launch.
         * @param intent The intent to open it with.
         * @param instanceId The instance of the app.
         * @param clientIdentity The identity of the source of the request.
         * @returns The intent resolution.
         */
        async launchAppWithIntent(app, intent, instanceId, clientIdentity) {
            logger.info("Launching app with intent");
            let platformIdentities = [];
            let existingInstance = true;
            let contextMetadata;
            if (!(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_4__.isEmpty)(intent?.context)) {
                intent.context = await this.processContext(intent.context);
                if (!(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_4__.isEmpty)(clientIdentity)) {
                    contextMetadata = await this.getContextMetadata(clientIdentity);
                    intent.context = { ...intent.context, [this._metadataKey]: contextMetadata };
                }
            }
            if (!(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_4__.isEmpty)(instanceId)) {
                // an instance of an application was selected
                const allConnectedClients = await this.getAllClientInfo();
                const clientInfo = allConnectedClients.find((connectedClient) => connectedClient.endpointId === instanceId);
                if (!(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_4__.isEmpty)(clientInfo)) {
                    logger.info(`App Id: ${app.appId} and instance Id: ${instanceId} was provided and found.`);
                    // the connected instance is available
                    platformIdentities.push({
                        uuid: clientInfo.uuid,
                        name: clientInfo.name,
                        appId: app.appId,
                        instanceId: clientInfo.endpointId
                    });
                }
                else {
                    throw new Error(_finos_fdc3__WEBPACK_IMPORTED_MODULE_0__.ResolveError.TargetInstanceUnavailable);
                }
            }
            if (platformIdentities.length === 0) {
                let launchPreference;
                const bounds = await (0,workspace_platform_starter_utils_position__WEBPACK_IMPORTED_MODULE_5__.getWindowPositionUsingStrategy)(options.windowPositionOptions, clientIdentity);
                if (!(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_4__.isEmpty)(bounds)) {
                    launchPreference = { bounds };
                }
                platformIdentities = await launch(app.appId, launchPreference);
                if (!platformIdentities?.length) {
                    throw new Error(_finos_fdc3__WEBPACK_IMPORTED_MODULE_0__.ResolveError.IntentDeliveryFailed);
                }
                existingInstance = false;
                if (platformIdentities.length === 1) {
                    const intentTimeout = options?.intentOptions?.intentTimeout;
                    // if we have a snapshot and multiple identities we will not wait as not all of them might not support intents.
                    try {
                        instanceId = await this._clientRegistrationHelper.onIntentClientReady(platformIdentities[0], intent.name, intentTimeout);
                    }
                    catch (intentReadyError) {
                        logger.warn("An error occurred while getting a instance to target an intent at.", intentReadyError);
                        throw new Error(_finos_fdc3__WEBPACK_IMPORTED_MODULE_0__.ResolveError.IntentDeliveryFailed);
                    }
                }
            }
            for (const target of platformIdentities) {
                await super.setIntentTarget(intent, target);
                if (existingInstance) {
                    try {
                        if (helpers.bringAppToFront) {
                            await helpers.bringAppToFront(app, [target]);
                        }
                    }
                    catch (bringToFrontError) {
                        logger.warn(`There was an error bringing app: ${target.appId}, and instance ${target.instanceId} with name: ${target.name} to front.`, bringToFrontError);
                    }
                }
            }
            return {
                source: { appId: app.appId, instanceId },
                version: app.version,
                intent: intent.name
            };
        }
        /**
         * Handle the intent picker selection.
         * @param userSelection The user selection from the intent picker.
         * @param intent The intent.
         * @param clientIdentity The source of the request.
         * @returns The intent resolution.
         */
        async handleIntentPickerSelection(userSelection, intent, clientIdentity) {
            let selectedApp = await getApp(userSelection.appId);
            if ((0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_4__.isEmpty)(selectedApp) && !(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_4__.isEmpty)(this._unregisteredApp)) {
                selectedApp = this._unregisteredApp;
            }
            if ((0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_4__.isEmpty)(selectedApp)) {
                throw new Error(_finos_fdc3__WEBPACK_IMPORTED_MODULE_0__.ResolveError.NoAppsFound);
            }
            const instanceId = userSelection.instanceId;
            const intentResolver = await this.launchAppWithIntent(selectedApp, intent, instanceId, clientIdentity);
            if ((0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_4__.isEmpty)(intentResolver)) {
                throw new Error(_finos_fdc3__WEBPACK_IMPORTED_MODULE_0__.ResolveError.NoAppsFound);
            }
            return intentResolver;
        }
        /**
         * Handle a targeted intent.
         * @param targetAppIdentifier The identifier for the target app.
         * @param intent The intent.
         * @param targetByContext Perform the target by context.
         * @param clientIdentity The client identity.
         * @returns The intent resolution.
         */
        async handleTargetedIntent(targetAppIdentifier, intent, targetByContext, clientIdentity) {
            // app specified flow
            const intentsForSelection = [];
            let targetApp = await getApp(targetAppIdentifier.appId);
            // if the specified app isn't available then let the caller know
            if ((0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_4__.isEmpty)(targetApp)) {
                if (!(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_4__.isEmpty)(targetAppIdentifier.instanceId) &&
                    targetAppIdentifier.appId === this._unregisteredApp?.appId) {
                    targetApp = this._unregisteredApp;
                }
                else {
                    throw new Error(_finos_fdc3__WEBPACK_IMPORTED_MODULE_0__.ResolveError.TargetAppUnavailable);
                }
            }
            // if an instanceId is specified then check to see if it is valid and if it isn't inform the caller
            if (!(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_4__.isEmpty)(targetAppIdentifier.instanceId)) {
                const availableAppInstances = await this._clientRegistrationHelper.findAppInstances(targetAppIdentifier, clientIdentity, "intent");
                if (availableAppInstances.length === 0 ||
                    !availableAppInstances.some((entry) => 
                    // eslint-disable-next-line max-len
                    entry.appId === targetAppIdentifier.appId &&
                        entry.instanceId === targetAppIdentifier.instanceId)) {
                    throw new Error(_finos_fdc3__WEBPACK_IMPORTED_MODULE_0__.ResolveError.TargetInstanceUnavailable);
                }
            }
            if (!Array.isArray(targetApp.intents) || targetApp.intents.length === 0) {
                // an app was specified but it doesn't have any intents. Indicate that something is wrong
                throw new Error(_finos_fdc3__WEBPACK_IMPORTED_MODULE_0__.ResolveError.TargetAppUnavailable);
            }
            const supportedIntents = targetApp.intents.filter((intentEntry) => {
                let contextMatch = true;
                const contextType = intent.context?.type;
                if (!(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_4__.isEmpty)(contextType)) {
                    contextMatch = intentEntry.contexts?.includes(contextType);
                    if (targetByContext) {
                        return contextMatch;
                    }
                }
                return intentEntry.name === intent.name && contextMatch;
            });
            if (supportedIntents.length === 0) {
                // the specified app does have intent support but just none that support this context type
                throw new Error(_finos_fdc3__WEBPACK_IMPORTED_MODULE_0__.ResolveError.TargetAppUnavailable);
            }
            if (supportedIntents.length === 1) {
                // a preferred name for an app was given with the context object
                // the app existed and it supported the context type and there was only one intent that supported
                // that context type. Launch the app with that intent otherwise present the user with a list of
                // everything that supports that context type
                intent.name = supportedIntents[0].name;
                // check for instances
                if (!(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_4__.isEmpty)(targetAppIdentifier.instanceId)) {
                    const intentResolver = await this.launchAppWithIntent(targetApp, intent, targetAppIdentifier.instanceId, clientIdentity);
                    return intentResolver;
                }
                const specifiedAppInstances = await this._clientRegistrationHelper.findAppInstances(targetApp, clientIdentity, "intent");
                // the launch logic is single instance aware but can also bring content to front where possible
                // this will let the context be set and the content brought to front.
                const launchSingleInstanceApp = specifiedAppInstances.length === 1 && this.useSingleInstance(targetApp);
                if (specifiedAppInstances.length === 0 ||
                    this.createNewInstance(targetApp) ||
                    launchSingleInstanceApp) {
                    const intentResolver = await this.launchAppWithIntent(targetApp, intent, undefined, clientIdentity);
                    if ((0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_4__.isEmpty)(intentResolver)) {
                        throw new Error(_finos_fdc3__WEBPACK_IMPORTED_MODULE_0__.ResolveError.IntentDeliveryFailed);
                    }
                    return intentResolver;
                }
            }
            for (const supportedIntent of supportedIntents) {
                const appForIntent = {
                    apps: [targetApp],
                    intent: { name: supportedIntent.name, displayName: supportedIntent.displayName }
                };
                intentsForSelection.push(appForIntent);
            }
            let userSelection;
            if (intentsForSelection.length === 1) {
                if (!(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_4__.isStringValue)(intent.name) &&
                    !(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_4__.isEmpty)(intentsForSelection[0]?.intent?.name) &&
                    !(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_4__.isEmpty)(intent?.context) &&
                    !(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_4__.isEmpty)(intent?.context?.type)) {
                    logger.info(`A request to raise an intent was passed and the intent name was not passed but a context was ${intent?.context?.type} with 1 matching intent. Name: ${intentsForSelection[0]?.intent?.name},  Display Name: ${intentsForSelection[0]?.intent?.displayName}. Updating intent object.`);
                    intent.name = intentsForSelection[0]?.intent?.name;
                }
                userSelection = await this._intentResolverHelper?.launchIntentResolver({
                    apps: intentsForSelection[0].apps,
                    intent
                }, clientIdentity);
            }
            else {
                userSelection = await this._intentResolverHelper?.launchIntentResolver({
                    intent,
                    intents: intentsForSelection
                }, clientIdentity);
                if (!(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_4__.isStringValue)(intent.name) && !(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_4__.isEmpty)(userSelection?.intent?.name)) {
                    logger.info(`A request to raise an intent was passed and the following intent was selected (from a selection of ${intentsForSelection.length}). Name: ${userSelection?.intent?.name},  Display Name: ${userSelection?.intent?.displayName}. Updating intent object.`);
                    intent.name = userSelection?.intent?.name ?? intent.name;
                }
            }
            if ((0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_4__.isEmpty)(userSelection)) {
                throw new Error(_finos_fdc3__WEBPACK_IMPORTED_MODULE_0__.ResolveError.ResolverUnavailable);
            }
            return this.handleIntentPickerSelection(userSelection, intent, clientIdentity);
        }
        /**
         * Shape the intent resolver.
         * @param intentResolver The intent resolver to shape.
         * @param usesAppIdentifier Should it use the app identifier.
         * @returns The shaped intent resolver.
         */
        shapeIntentResolver(intentResolver, usesAppIdentifier) {
            if (usesAppIdentifier) {
                return intentResolver;
            }
            return { source: intentResolver.source.appId, version: intentResolver.version };
        }
        /**
         * Should we use a single instance of the app.
         * @param app The app to check.
         * @returns True if we should use a single instance.
         */
        useSingleInstance(app) {
            return app?.instanceMode === "single";
        }
        /**
         * Should we always use a new instance of the app.
         * @param app The app to check.
         * @returns True if we should always use a new instance.
         */
        createNewInstance(app) {
            return app?.instanceMode === "new";
        }
        /**
         * Get a preview image for a window/view.
         * @param target The target identity to capture.
         * @param target.capturePage The capture page method of the entity.
         * @param target.identity The identity of the entity being captured.
         * @returns The captured preview image.
         */
        async getPreviewImage(target) {
            try {
                const preview = await target.capturePage({ format: "jpg", quality: 85 });
                if ((0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_4__.isStringValue)(preview)) {
                    return preview;
                }
            }
            catch (error) {
                logger.error(`Error while trying to capture a preview image of the view/window: ${target.identity.name}`, error);
            }
        }
        /**
         * Get the unregistered app intent by context.
         * @param type The context type to get.
         * @param clientIdentity The client identity.
         * @returns The list of supported intents.
         */
        async getUnregisteredAppIntentByContext(type, clientIdentity) {
            const intentNames = [];
            const supportedIntentNames = [];
            if ((0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_4__.isEmpty)(this?._unregisteredApp)) {
                return intentNames;
            }
            if (Array.isArray(this?._unregisteredApp?.intents)) {
                for (const intent of this._unregisteredApp.intents) {
                    if (intent.contexts.includes(type)) {
                        const intentName = intent.name;
                        intentNames.push(intentName);
                    }
                }
            }
            if (intentNames.length > 0) {
                // now we need to check if there are any instances as this app can not be launched as it is a placeholder for unregistered instances
                for (const intentName of intentNames) {
                    if (await this.canAddUnregisteredApp(clientIdentity, intentName)) {
                        supportedIntentNames.push(intentName);
                    }
                }
            }
            // the unregisteredAppMeta data lists the supported intents but we only want to return intents that have active instances ready
            return supportedIntentNames;
        }
        /**
         * Can we add an unregistered app.
         * @param clientIdentity The client identity.
         * @param intentName The intent name.
         * @param contextType The context type.
         * @returns True if we can add the app.
         */
        async canAddUnregisteredApp(clientIdentity, intentName, contextType) {
            if ((0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_4__.isEmpty)(this?._unregisteredApp)) {
                return false;
            }
            const listensFor = this._unregisteredApp?.interop?.intents?.listensFor;
            if (!(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_4__.isEmpty)(intentName) && ((0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_4__.isEmpty)(listensFor) || (0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_4__.isEmpty)(listensFor[intentName]))) {
                return false;
            }
            if (!(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_4__.isEmpty)(contextType) &&
                !(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_4__.isEmpty)(listensFor) &&
                !(0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_4__.isEmpty)(intentName) &&
                !listensFor[intentName].contexts.includes(contextType)) {
                return false;
            }
            const instances = await this._clientRegistrationHelper.findAppInstances({ appId: this._unregisteredApp.appId }, clientIdentity, "intent");
            return instances.length > 0;
        }
        /**
         * Get an application identity.
         * @param metadata The metadata for the app.
         * @returns The app identifier.
         */
        getApplicationIdentity(metadata) {
            const target = metadata?.target;
            if ((0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_4__.isEmpty)(target)) {
                return;
            }
            if ((0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_4__.isString)(target)) {
                if (target.trim().length === 0) {
                    return undefined;
                }
                return { appId: target };
            }
            if ((0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_4__.isEmpty)(target.appId)) {
                return undefined;
            }
            return { appId: target.appId, instanceId: target.instanceId };
        }
        /**
         * Does the app use application identity.
         * @param clientIdentity The client app to check.
         * @returns True if the app uses application identity.
         */
        usesApplicationIdentity(clientIdentity) {
            const apiMetadata = this._clientRegistrationHelper.getApiVersion(clientIdentity);
            if ((0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_4__.isEmpty)(apiMetadata)) {
                return false;
            }
            return apiMetadata.type === "fdc3" && apiMetadata.version === "2.0";
        }
        /**
         * Lookup an application identity.
         * @param clientIdentity The client identity to use.
         * @returns The application identity.
         */
        async lookupAppId(clientIdentity) {
            const nameParts = clientIdentity.name.split("/");
            let app;
            if (nameParts.length === 1 || nameParts.length === 2) {
                app = await getApp(nameParts[0]);
            }
            if (nameParts.length > 2) {
                app = await getApp(`${nameParts[0]}/${nameParts[1]}`);
            }
            const appNotFound = (0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_4__.isEmpty)(app);
            if (appNotFound && clientIdentity.uuid !== fin.me.identity.uuid) {
                logger.warn("Lookup made by a non-registered app that is outside of this platform.", clientIdentity);
                return;
            }
            if (appNotFound && (0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_4__.isEmpty)(this._unregisteredApp)) {
                logger.warn("Lookup made by a non-registered app that falls under this platform. No unregistered placeholder app is specified.", clientIdentity);
                return;
            }
            if (appNotFound) {
                app = this._unregisteredApp;
                logger.info("Assigned the following unregistered app to represent the app.", app);
            }
            return app?.appId;
        }
        /**
         * Process a context.
         * @param context The context to process.
         * @returns The processed context.
         */
        async processContext(context) {
            if ((0,workspace_platform_starter_utils__WEBPACK_IMPORTED_MODULE_4__.isEmpty)(endpointClient)) {
                return context;
            }
            const endpointId = `interopbroker.process.${context.type}`;
            if (endpointClient.hasEndpoint(endpointId)) {
                logger.info(`Processing context ${context.type} with endpoint ${endpointId}`);
                const processedContext = await endpointClient.requestResponse(endpointId, {
                    context
                });
                if (processedContext?.context) {
                    return processedContext?.context;
                }
            }
            return context;
        }
        /**
         * Get the context metadata for a client identity.
         * @param clientIdentity The client identity.
         * @returns The context metadata.
         */
        async getContextMetadata(clientIdentity) {
            const appId = (await this.lookupAppId(clientIdentity)) ?? clientIdentity.name;
            return {
                source: {
                    appId,
                    instanceId: clientIdentity.endpointId
                }
            };
        }
    };
}


/***/ }),

/***/ "./client/src/modules/interop-override/wps-interop-override/interop-override.ts":
/*!**************************************************************************************!*\
  !*** ./client/src/modules/interop-override/wps-interop-override/interop-override.ts ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   WpsInteropOverride: () => (/* binding */ WpsInteropOverride)
/* harmony export */ });
/* harmony import */ var _broker_wps_interop_override__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./broker/wps-interop-override */ "./client/src/modules/interop-override/wps-interop-override/broker/wps-interop-override.ts");

/**
 * Implementation for the wps interop override interop override.
 */
class WpsInteropOverride {
    /**
     * Initialize the module.
     * @param definition The definition of the module from configuration include custom options.
     * @param loggerCreator For logging entries.
     * @param helpers Helper methods for the module to interact with the application core.
     * @returns Nothing.
     */
    async initialize(definition, loggerCreator, helpers) {
        this._definition = definition;
        const loggerName = definition.data?.loggerName ?? "WpsInteropOverride";
        this._logger = loggerCreator(loggerName);
        this._helpers = helpers;
        this._logger.info("Initializing");
    }
    /**
     * Close down any resources being used by the module.
     * @returns Nothing.
     */
    async closedown() {
        this._logger?.info("Closedown");
    }
    /**
     * Get the override constructor for the interop broker (useful if you wish this implementation to be layered with other implementations and passed to the platform's initialization object as part of an array).
     * @param options The options for the interop broker defined as part of the platform.
     * @returns The override constructor to be used in an array.
     */
    async getConstructorOverride(options) {
        if (!this._helpers || !this._logger) {
            throw new Error("Module not initialized");
        }
        return (0,_broker_wps_interop_override__WEBPACK_IMPORTED_MODULE_0__.getConstructorOverride)(options, this._logger, this._helpers);
    }
}


/***/ })

/******/ });
/************************************************************************/
/******/ // The module cache
/******/ var __webpack_module_cache__ = {};
/******/ 
/******/ // The require function
/******/ function __webpack_require__(moduleId) {
/******/ 	// Check if module is in cache
/******/ 	var cachedModule = __webpack_module_cache__[moduleId];
/******/ 	if (cachedModule !== undefined) {
/******/ 		return cachedModule.exports;
/******/ 	}
/******/ 	// Create a new module (and put it into the cache)
/******/ 	var module = __webpack_module_cache__[moduleId] = {
/******/ 		// no module.id needed
/******/ 		// no module.loaded needed
/******/ 		exports: {}
/******/ 	};
/******/ 
/******/ 	// Execute the module function
/******/ 	__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 
/******/ 	// Return the exports of the module
/******/ 	return module.exports;
/******/ }
/******/ 
/************************************************************************/
/******/ /* webpack/runtime/define property getters */
/******/ (() => {
/******/ 	// define getter functions for harmony exports
/******/ 	__webpack_require__.d = (exports, definition) => {
/******/ 		for(var key in definition) {
/******/ 			if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 				Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 			}
/******/ 		}
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/hasOwnProperty shorthand */
/******/ (() => {
/******/ 	__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ })();
/******/ 
/******/ /* webpack/runtime/make namespace object */
/******/ (() => {
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = (exports) => {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/ })();
/******/ 
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!***************************************************************************!*\
  !*** ./client/src/modules/interop-override/wps-interop-override/index.ts ***!
  \***************************************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   entryPoints: () => (/* binding */ entryPoints)
/* harmony export */ });
/* harmony import */ var _interop_override__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./interop-override */ "./client/src/modules/interop-override/wps-interop-override/interop-override.ts");

/**
 * Define the entry points for the module.
 */
const entryPoints = {
    interopOverride: new _interop_override__WEBPACK_IMPORTED_MODULE_0__.WpsInteropOverride()
};

})();

var __webpack_exports__entryPoints = __webpack_exports__.entryPoints;
export { __webpack_exports__entryPoints as entryPoints };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxJQUFJO0FBQ0o7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsSUFBSTtBQUNKO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLElBQUk7QUFDSjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLElBQUk7QUFDSjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixrREFBa0Q7QUFDMUU7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxvQ0FBb0M7O0FBRXJDO0FBQ0E7QUFDQSxjQUFjLDBMQUEwTDtBQUN4TTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxzQkFBc0I7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EsSUFBSTtBQUNKO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixPQUFPO0FBQzNCO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0VBQXNFLGFBQWE7QUFDbkY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FB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Ozs7QUNMd0Q7QUFFeEQ7O0dBRUc7QUFDSSxNQUFNLFdBQVcsR0FBcUQ7SUFDNUUsZUFBZSxFQUFFLElBQUksaUVBQWtCLEVBQUU7Q0FDekMsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci8uLi8uLi9ub2RlX21vZHVsZXMvQGZpbm9zL2ZkYzMvZGlzdC9mZGMzLmVzbS5qcyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0td29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvLi9jbGllbnQvc3JjL2ZyYW1ld29yay9mZGMzLzEuMi9tYXBwZXIudHMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXdvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyLy4vY2xpZW50L3NyYy9mcmFtZXdvcmsvZmRjMy8yLjAvbWFwcGVyLnRzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci8uL2NsaWVudC9zcmMvZnJhbWV3b3JrL21hbmlmZXN0LXR5cGVzLnRzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci8uL2NsaWVudC9zcmMvZnJhbWV3b3JrL3V0aWxzLXBvc2l0aW9uLnRzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci8uL2NsaWVudC9zcmMvZnJhbWV3b3JrL3V0aWxzLnRzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci8uL2NsaWVudC9zcmMvbW9kdWxlcy9pbnRlcm9wLW92ZXJyaWRlL3dwcy1pbnRlcm9wLW92ZXJyaWRlL2Jyb2tlci9hcHAtaW50ZW50LWhlbHBlci50cyIsIndlYnBhY2s6Ly9vcGVuZmluLXdvcmtzcGFjZS0td29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvLi9jbGllbnQvc3JjL21vZHVsZXMvaW50ZXJvcC1vdmVycmlkZS93cHMtaW50ZXJvcC1vdmVycmlkZS9icm9rZXIvY2xpZW50LXJlZ2lzdHJhdGlvbi1oZWxwZXIudHMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXdvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyLy4vY2xpZW50L3NyYy9tb2R1bGVzL2ludGVyb3Atb3ZlcnJpZGUvd3BzLWludGVyb3Atb3ZlcnJpZGUvYnJva2VyL2ludGVudC1yZXNvbHZlci1oZWxwZXIudHMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXdvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyLy4vY2xpZW50L3NyYy9tb2R1bGVzL2ludGVyb3Atb3ZlcnJpZGUvd3BzLWludGVyb3Atb3ZlcnJpZGUvYnJva2VyL3dwcy1pbnRlcm9wLW92ZXJyaWRlLnRzIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci8uL2NsaWVudC9zcmMvbW9kdWxlcy9pbnRlcm9wLW92ZXJyaWRlL3dwcy1pbnRlcm9wLW92ZXJyaWRlL2ludGVyb3Atb3ZlcnJpZGUudHMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXdvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL29wZW5maW4td29ya3NwYWNlLS13b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXdvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXdvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vb3BlbmZpbi13b3Jrc3BhY2UtLXdvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyLy4vY2xpZW50L3NyYy9tb2R1bGVzL2ludGVyb3Atb3ZlcnJpZGUvd3BzLWludGVyb3Atb3ZlcnJpZGUvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXHJcbiAqIENvcHlyaWdodCBGSU5PUyBGREMzIGNvbnRyaWJ1dG9ycyAtIHNlZSBOT1RJQ0UgZmlsZVxyXG4gKi9cbi8qKiBDb25zdGFudHMgcmVwcmVzZW50aW5nIHRoZSBlcnJvcnMgdGhhdCBjYW4gYmUgZW5jb3VudGVyZWQgd2hlbiBjYWxsaW5nIHRoZSBgb3BlbmAgbWV0aG9kIG9uIHRoZSBEZXNrdG9wQWdlbnQgb2JqZWN0IChgZmRjM2ApLiAqL1xudmFyIE9wZW5FcnJvcjtcbihmdW5jdGlvbiAoT3BlbkVycm9yKSB7XG4gIC8qKiBSZXR1cm5lZCBpZiB0aGUgc3BlY2lmaWVkIGFwcGxpY2F0aW9uIGlzIG5vdCBmb3VuZC4qL1xuICBPcGVuRXJyb3JbXCJBcHBOb3RGb3VuZFwiXSA9IFwiQXBwTm90Rm91bmRcIjtcbiAgLyoqIFJldHVybmVkIGlmIHRoZSBzcGVjaWZpZWQgYXBwbGljYXRpb24gZmFpbHMgdG8gbGF1bmNoIGNvcnJlY3RseS4qL1xuICBPcGVuRXJyb3JbXCJFcnJvck9uTGF1bmNoXCJdID0gXCJFcnJvck9uTGF1bmNoXCI7XG4gIC8qKiBSZXR1cm5lZCBpZiB0aGUgc3BlY2lmaWVkIGFwcGxpY2F0aW9uIGxhdW5jaGVzIGJ1dCBmYWlscyB0byBhZGQgYSBjb250ZXh0IGxpc3RlbmVyIGluIG9yZGVyIHRvIHJlY2VpdmUgdGhlIGNvbnRleHQgcGFzc2VkIHRvIHRoZSBgZmRjMy5vcGVuYCBjYWxsLiovXG4gIE9wZW5FcnJvcltcIkFwcFRpbWVvdXRcIl0gPSBcIkFwcFRpbWVvdXRcIjtcbiAgLyoqIFJldHVybmVkIGlmIHRoZSBGREMzIGRlc2t0b3AgYWdlbnQgaW1wbGVtZW50YXRpb24gaXMgbm90IGN1cnJlbnRseSBhYmxlIHRvIGhhbmRsZSB0aGUgcmVxdWVzdC4qL1xuICBPcGVuRXJyb3JbXCJSZXNvbHZlclVuYXZhaWxhYmxlXCJdID0gXCJSZXNvbHZlclVuYXZhaWxhYmxlXCI7XG4gIC8qKiBSZXR1cm5lZCBpZiBhIGNhbGwgdG8gdGhlIGBvcGVuYCBmdW5jdGlvbiBpcyBtYWRlIHdpdGggYW4gaW52YWxpZCBjb250ZXh0IGFyZ3VtZW50LiBDb250ZXh0cyBzaG91bGQgYmUgT2JqZWN0cyB3aXRoIGF0IGxlYXN0IGEgYHR5cGVgIGZpZWxkIHRoYXQgaGFzIGEgYHN0cmluZ2AgdmFsdWUuKi9cbiAgT3BlbkVycm9yW1wiTWFsZm9ybWVkQ29udGV4dFwiXSA9IFwiTWFsZm9ybWVkQ29udGV4dFwiO1xufSkoT3BlbkVycm9yIHx8IChPcGVuRXJyb3IgPSB7fSkpO1xuLyoqIENvbnN0YW50cyByZXByZXNlbnRpbmcgdGhlIGVycm9ycyB0aGF0IGNhbiBiZSBlbmNvdW50ZXJlZCB3aGVuIGNhbGxpbmcgdGhlIGBmaW5kSW50ZW50YCwgYGZpbmRJbnRlbnRzQnlDb250ZXh0YCwgYHJhaXNlSW50ZW50YCBvciBgcmFpc2VJbnRlbnRGb3JDb250ZXh0YCBtZXRob2RzIG9uIHRoZSBEZXNrdG9wQWdlbnQgKGBmZGMzYCkuICovXG52YXIgUmVzb2x2ZUVycm9yO1xuKGZ1bmN0aW9uIChSZXNvbHZlRXJyb3IpIHtcbiAgLyoqIFNIT1VMRCBiZSByZXR1cm5lZCBpZiBubyBhcHBzIGFyZSBhdmFpbGFibGUgdGhhdCBjYW4gcmVzb2x2ZSB0aGUgaW50ZW50IGFuZCBjb250ZXh0IGNvbWJpbmF0aW9uLiovXG4gIFJlc29sdmVFcnJvcltcIk5vQXBwc0ZvdW5kXCJdID0gXCJOb0FwcHNGb3VuZFwiO1xuICAvKiogUmV0dXJuZWQgaWYgdGhlIEZEQzMgZGVza3RvcCBhZ2VudCBpbXBsZW1lbnRhdGlvbiBpcyBub3QgY3VycmVudGx5IGFibGUgdG8gaGFuZGxlIHRoZSByZXF1ZXN0LiovXG4gIFJlc29sdmVFcnJvcltcIlJlc29sdmVyVW5hdmFpbGFibGVcIl0gPSBcIlJlc29sdmVyVW5hdmFpbGFibGVcIjtcbiAgLyoqIFJldHVybmVkIGlmIHRoZSB1c2VyIGNhbmNlbGxlZCB0aGUgcmVzb2x1dGlvbiByZXF1ZXN0LCBmb3IgZXhhbXBsZSBieSBjbG9zaW5nIG9yIGNhbmNlbGxpbmcgYSByZXNvbHZlciBVSS4qL1xuICBSZXNvbHZlRXJyb3JbXCJVc2VyQ2FuY2VsbGVkXCJdID0gXCJVc2VyQ2FuY2VsbGVkUmVzb2x1dGlvblwiO1xuICAvKiogU0hPVUxEIGJlIHJldHVybmVkIGlmIGEgdGltZW91dCBjYW5jZWxzIGFuIGludGVudCByZXNvbHV0aW9uIHRoYXQgcmVxdWlyZWQgdXNlciBpbnRlcmFjdGlvbi4gUGxlYXNlIHVzZSBgUmVzb2x2ZXJVbmF2YWlsYWJsZWAgaW5zdGVhZCBmb3Igc2l0dWF0aW9ucyB3aGVyZSBhIHJlc29sdmVyIFVJIG9yIHNpbWlsYXIgZmFpbHMuKi9cbiAgUmVzb2x2ZUVycm9yW1wiUmVzb2x2ZXJUaW1lb3V0XCJdID0gXCJSZXNvbHZlclRpbWVvdXRcIjtcbiAgLyoqIFJldHVybmVkIGlmIGEgc3BlY2lmaWVkIHRhcmdldCBhcHBsaWNhdGlvbiBpcyBub3QgYXZhaWxhYmxlIG9yIGEgbmV3IGluc3RhbmNlIG9mIGl0IGNhbm5vdCBiZSBvcGVuZWQuICovXG4gIFJlc29sdmVFcnJvcltcIlRhcmdldEFwcFVuYXZhaWxhYmxlXCJdID0gXCJUYXJnZXRBcHBVbmF2YWlsYWJsZVwiO1xuICAvKiogUmV0dXJuZWQgaWYgYSBzcGVjaWZpZWQgdGFyZ2V0IGFwcGxpY2F0aW9uIGluc3RhbmNlIGlzIG5vdCBhdmFpbGFibGUsIGZvciBleGFtcGxlIGJlY2F1c2UgaXQgaGFzIGJlZW4gY2xvc2VkLiAqL1xuICBSZXNvbHZlRXJyb3JbXCJUYXJnZXRJbnN0YW5jZVVuYXZhaWxhYmxlXCJdID0gXCJUYXJnZXRJbnN0YW5jZVVuYXZhaWxhYmxlXCI7XG4gIC8qKiBSZXR1cm5lZCBpZiB0aGUgaW50ZW50IGFuZCBjb250ZXh0IGNvdWxkIG5vdCBiZSBkZWxpdmVyZWQgdG8gdGhlIHNlbGVjdGVkIGFwcGxpY2F0aW9uIG9yIGluc3RhbmNlLCBmb3IgZXhhbXBsZSBiZWNhdXNlIGl0IGhhcyBub3QgYWRkZWQgYW4gaW50ZW50IGhhbmRsZXIgd2l0aGluIGEgdGltZW91dC4qL1xuICBSZXNvbHZlRXJyb3JbXCJJbnRlbnREZWxpdmVyeUZhaWxlZFwiXSA9IFwiSW50ZW50RGVsaXZlcnlGYWlsZWRcIjtcbiAgLyoqIFJldHVybmVkIGlmIGEgY2FsbCB0byBvbmUgb2YgdGhlIGByYWlzZUludGVudGAgZnVuY3Rpb25zIGlzIG1hZGUgd2l0aCBhbiBpbnZhbGlkIGNvbnRleHQgYXJndW1lbnQuIENvbnRleHRzIHNob3VsZCBiZSBPYmplY3RzIHdpdGggYXQgbGVhc3QgYSBgdHlwZWAgZmllbGQgdGhhdCBoYXMgYSBgc3RyaW5nYCB2YWx1ZS4qL1xuICBSZXNvbHZlRXJyb3JbXCJNYWxmb3JtZWRDb250ZXh0XCJdID0gXCJNYWxmb3JtZWRDb250ZXh0XCI7XG59KShSZXNvbHZlRXJyb3IgfHwgKFJlc29sdmVFcnJvciA9IHt9KSk7XG52YXIgUmVzdWx0RXJyb3I7XG4oZnVuY3Rpb24gKFJlc3VsdEVycm9yKSB7XG4gIC8qKiBSZXR1cm5lZCBpZiB0aGUgaW50ZW50IGhhbmRsZXIgZXhpdGVkIHdpdGhvdXQgcmV0dXJuaW5nIGEgdmFsaWQgcmVzdWx0IChhIHByb21pc2UgcmVzb2x2aW5nIHRvIGEgQ29udGV4dCwgQ2hhbm5lbCBvYmplY3Qgb3Igdm9pZCkuICovXG4gIFJlc3VsdEVycm9yW1wiTm9SZXN1bHRSZXR1cm5lZFwiXSA9IFwiTm9SZXN1bHRSZXR1cm5lZFwiO1xuICAvKiogUmV0dXJuZWQgaWYgdGhlIEludGVudCBoYW5kbGVyIGZ1bmN0aW9uIHByb2Nlc3NpbmcgdGhlIHJhaXNlZCBpbnRlbnQgdGhyb3dzIGFuIGVycm9yIG9yIHJlamVjdHMgdGhlIFByb21pc2UgaXQgcmV0dXJuZWQuICovXG4gIFJlc3VsdEVycm9yW1wiSW50ZW50SGFuZGxlclJlamVjdGVkXCJdID0gXCJJbnRlbnRIYW5kbGVyUmVqZWN0ZWRcIjtcbn0pKFJlc3VsdEVycm9yIHx8IChSZXN1bHRFcnJvciA9IHt9KSk7XG52YXIgQ2hhbm5lbEVycm9yO1xuKGZ1bmN0aW9uIChDaGFubmVsRXJyb3IpIHtcbiAgLyoqIFJldHVybmVkIGlmIHRoZSBzcGVjaWZpZWQgY2hhbm5lbCBpcyBub3QgZm91bmQgd2hlbiBhdHRlbXB0aW5nIHRvIGpvaW4gYSBjaGFubmVsIHZpYSB0aGUgYGpvaW5Vc2VyQ2hhbm5lbGAgZnVuY3Rpb24gIG9mIHRoZSBEZXNrdG9wQWdlbnQgKGBmZGMzYCkuKi9cbiAgQ2hhbm5lbEVycm9yW1wiTm9DaGFubmVsRm91bmRcIl0gPSBcIk5vQ2hhbm5lbEZvdW5kXCI7XG4gIC8qKiBTSE9VTEQgYmUgcmV0dXJuZWQgd2hlbiBhIHJlcXVlc3QgdG8gam9pbiBhIHVzZXIgY2hhbm5lbCBvciB0byBhIHJldHJpZXZlIGEgQ2hhbm5lbCBvYmplY3QgdmlhIHRoZSBgam9pblVzZXJDaGFubmVsYCBvciBgZ2V0T3JDcmVhdGVDaGFubmVsYCBtZXRob2RzIG9mIHRoZSBEZXNrdG9wQWdlbnQgKGBmZGMzYCkgb2JqZWN0IGlzIGRlbmllZC4gKi9cbiAgQ2hhbm5lbEVycm9yW1wiQWNjZXNzRGVuaWVkXCJdID0gXCJBY2Nlc3NEZW5pZWRcIjtcbiAgLyoqIFNIT1VMRCBiZSByZXR1cm5lZCB3aGVuIGEgY2hhbm5lbCBjYW5ub3QgYmUgY3JlYXRlZCBvciByZXRyaWV2ZWQgdmlhIHRoZSBgZ2V0T3JDcmVhdGVDaGFubmVsYCBtZXRob2Qgb2YgdGhlIERlc2t0b3BBZ2VudCAoYGZkYzNgKS4qL1xuICBDaGFubmVsRXJyb3JbXCJDcmVhdGlvbkZhaWxlZFwiXSA9IFwiQ3JlYXRpb25GYWlsZWRcIjtcbiAgLyoqIFJldHVybmVkIGlmIGEgY2FsbCB0byB0aGUgYGJyb2FkY2FzdGAgZnVuY3Rpb25zIGlzIG1hZGUgd2l0aCBhbiBpbnZhbGlkIGNvbnRleHQgYXJndW1lbnQuIENvbnRleHRzIHNob3VsZCBiZSBPYmplY3RzIHdpdGggYXQgbGVhc3QgYSBgdHlwZWAgZmllbGQgdGhhdCBoYXMgYSBgc3RyaW5nYCB2YWx1ZS4qL1xuICBDaGFubmVsRXJyb3JbXCJNYWxmb3JtZWRDb250ZXh0XCJdID0gXCJNYWxmb3JtZWRDb250ZXh0XCI7XG59KShDaGFubmVsRXJyb3IgfHwgKENoYW5uZWxFcnJvciA9IHt9KSk7XG5cbmZ1bmN0aW9uIF9yZWdlbmVyYXRvclJ1bnRpbWUoKSB7XG4gIF9yZWdlbmVyYXRvclJ1bnRpbWUgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIGV4cG9ydHM7XG4gIH07XG4gIHZhciBleHBvcnRzID0ge30sXG4gICAgT3AgPSBPYmplY3QucHJvdG90eXBlLFxuICAgIGhhc093biA9IE9wLmhhc093blByb3BlcnR5LFxuICAgIGRlZmluZVByb3BlcnR5ID0gT2JqZWN0LmRlZmluZVByb3BlcnR5IHx8IGZ1bmN0aW9uIChvYmosIGtleSwgZGVzYykge1xuICAgICAgb2JqW2tleV0gPSBkZXNjLnZhbHVlO1xuICAgIH0sXG4gICAgJFN5bWJvbCA9IFwiZnVuY3Rpb25cIiA9PSB0eXBlb2YgU3ltYm9sID8gU3ltYm9sIDoge30sXG4gICAgaXRlcmF0b3JTeW1ib2wgPSAkU3ltYm9sLml0ZXJhdG9yIHx8IFwiQEBpdGVyYXRvclwiLFxuICAgIGFzeW5jSXRlcmF0b3JTeW1ib2wgPSAkU3ltYm9sLmFzeW5jSXRlcmF0b3IgfHwgXCJAQGFzeW5jSXRlcmF0b3JcIixcbiAgICB0b1N0cmluZ1RhZ1N5bWJvbCA9ICRTeW1ib2wudG9TdHJpbmdUYWcgfHwgXCJAQHRvU3RyaW5nVGFnXCI7XG4gIGZ1bmN0aW9uIGRlZmluZShvYmosIGtleSwgdmFsdWUpIHtcbiAgICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7XG4gICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICBlbnVtZXJhYmxlOiAhMCxcbiAgICAgIGNvbmZpZ3VyYWJsZTogITAsXG4gICAgICB3cml0YWJsZTogITBcbiAgICB9KSwgb2JqW2tleV07XG4gIH1cbiAgdHJ5IHtcbiAgICBkZWZpbmUoe30sIFwiXCIpO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICBkZWZpbmUgPSBmdW5jdGlvbiAob2JqLCBrZXksIHZhbHVlKSB7XG4gICAgICByZXR1cm4gb2JqW2tleV0gPSB2YWx1ZTtcbiAgICB9O1xuICB9XG4gIGZ1bmN0aW9uIHdyYXAoaW5uZXJGbiwgb3V0ZXJGbiwgc2VsZiwgdHJ5TG9jc0xpc3QpIHtcbiAgICB2YXIgcHJvdG9HZW5lcmF0b3IgPSBvdXRlckZuICYmIG91dGVyRm4ucHJvdG90eXBlIGluc3RhbmNlb2YgR2VuZXJhdG9yID8gb3V0ZXJGbiA6IEdlbmVyYXRvcixcbiAgICAgIGdlbmVyYXRvciA9IE9iamVjdC5jcmVhdGUocHJvdG9HZW5lcmF0b3IucHJvdG90eXBlKSxcbiAgICAgIGNvbnRleHQgPSBuZXcgQ29udGV4dCh0cnlMb2NzTGlzdCB8fCBbXSk7XG4gICAgcmV0dXJuIGRlZmluZVByb3BlcnR5KGdlbmVyYXRvciwgXCJfaW52b2tlXCIsIHtcbiAgICAgIHZhbHVlOiBtYWtlSW52b2tlTWV0aG9kKGlubmVyRm4sIHNlbGYsIGNvbnRleHQpXG4gICAgfSksIGdlbmVyYXRvcjtcbiAgfVxuICBmdW5jdGlvbiB0cnlDYXRjaChmbiwgb2JqLCBhcmcpIHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogXCJub3JtYWxcIixcbiAgICAgICAgYXJnOiBmbi5jYWxsKG9iaiwgYXJnKVxuICAgICAgfTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHR5cGU6IFwidGhyb3dcIixcbiAgICAgICAgYXJnOiBlcnJcbiAgICAgIH07XG4gICAgfVxuICB9XG4gIGV4cG9ydHMud3JhcCA9IHdyYXA7XG4gIHZhciBDb250aW51ZVNlbnRpbmVsID0ge307XG4gIGZ1bmN0aW9uIEdlbmVyYXRvcigpIHt9XG4gIGZ1bmN0aW9uIEdlbmVyYXRvckZ1bmN0aW9uKCkge31cbiAgZnVuY3Rpb24gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUoKSB7fVxuICB2YXIgSXRlcmF0b3JQcm90b3R5cGUgPSB7fTtcbiAgZGVmaW5lKEl0ZXJhdG9yUHJvdG90eXBlLCBpdGVyYXRvclN5bWJvbCwgZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9KTtcbiAgdmFyIGdldFByb3RvID0gT2JqZWN0LmdldFByb3RvdHlwZU9mLFxuICAgIE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlID0gZ2V0UHJvdG8gJiYgZ2V0UHJvdG8oZ2V0UHJvdG8odmFsdWVzKFtdKSkpO1xuICBOYXRpdmVJdGVyYXRvclByb3RvdHlwZSAmJiBOYXRpdmVJdGVyYXRvclByb3RvdHlwZSAhPT0gT3AgJiYgaGFzT3duLmNhbGwoTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUsIGl0ZXJhdG9yU3ltYm9sKSAmJiAoSXRlcmF0b3JQcm90b3R5cGUgPSBOYXRpdmVJdGVyYXRvclByb3RvdHlwZSk7XG4gIHZhciBHcCA9IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlLnByb3RvdHlwZSA9IEdlbmVyYXRvci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEl0ZXJhdG9yUHJvdG90eXBlKTtcbiAgZnVuY3Rpb24gZGVmaW5lSXRlcmF0b3JNZXRob2RzKHByb3RvdHlwZSkge1xuICAgIFtcIm5leHRcIiwgXCJ0aHJvd1wiLCBcInJldHVyblwiXS5mb3JFYWNoKGZ1bmN0aW9uIChtZXRob2QpIHtcbiAgICAgIGRlZmluZShwcm90b3R5cGUsIG1ldGhvZCwgZnVuY3Rpb24gKGFyZykge1xuICAgICAgICByZXR1cm4gdGhpcy5faW52b2tlKG1ldGhvZCwgYXJnKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG4gIGZ1bmN0aW9uIEFzeW5jSXRlcmF0b3IoZ2VuZXJhdG9yLCBQcm9taXNlSW1wbCkge1xuICAgIGZ1bmN0aW9uIGludm9rZShtZXRob2QsIGFyZywgcmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICB2YXIgcmVjb3JkID0gdHJ5Q2F0Y2goZ2VuZXJhdG9yW21ldGhvZF0sIGdlbmVyYXRvciwgYXJnKTtcbiAgICAgIGlmIChcInRocm93XCIgIT09IHJlY29yZC50eXBlKSB7XG4gICAgICAgIHZhciByZXN1bHQgPSByZWNvcmQuYXJnLFxuICAgICAgICAgIHZhbHVlID0gcmVzdWx0LnZhbHVlO1xuICAgICAgICByZXR1cm4gdmFsdWUgJiYgXCJvYmplY3RcIiA9PSB0eXBlb2YgdmFsdWUgJiYgaGFzT3duLmNhbGwodmFsdWUsIFwiX19hd2FpdFwiKSA/IFByb21pc2VJbXBsLnJlc29sdmUodmFsdWUuX19hd2FpdCkudGhlbihmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICBpbnZva2UoXCJuZXh0XCIsIHZhbHVlLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgaW52b2tlKFwidGhyb3dcIiwgZXJyLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICB9KSA6IFByb21pc2VJbXBsLnJlc29sdmUodmFsdWUpLnRoZW4oZnVuY3Rpb24gKHVud3JhcHBlZCkge1xuICAgICAgICAgIHJlc3VsdC52YWx1ZSA9IHVud3JhcHBlZCwgcmVzb2x2ZShyZXN1bHQpO1xuICAgICAgICB9LCBmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgICByZXR1cm4gaW52b2tlKFwidGhyb3dcIiwgZXJyb3IsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgcmVqZWN0KHJlY29yZC5hcmcpO1xuICAgIH1cbiAgICB2YXIgcHJldmlvdXNQcm9taXNlO1xuICAgIGRlZmluZVByb3BlcnR5KHRoaXMsIFwiX2ludm9rZVwiLCB7XG4gICAgICB2YWx1ZTogZnVuY3Rpb24gKG1ldGhvZCwgYXJnKSB7XG4gICAgICAgIGZ1bmN0aW9uIGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnKCkge1xuICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZUltcGwoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgaW52b2tlKG1ldGhvZCwgYXJnLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBwcmV2aW91c1Byb21pc2UgPSBwcmV2aW91c1Byb21pc2UgPyBwcmV2aW91c1Byb21pc2UudGhlbihjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZywgY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmcpIDogY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmcoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuICBmdW5jdGlvbiBtYWtlSW52b2tlTWV0aG9kKGlubmVyRm4sIHNlbGYsIGNvbnRleHQpIHtcbiAgICB2YXIgc3RhdGUgPSBcInN1c3BlbmRlZFN0YXJ0XCI7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChtZXRob2QsIGFyZykge1xuICAgICAgaWYgKFwiZXhlY3V0aW5nXCIgPT09IHN0YXRlKSB0aHJvdyBuZXcgRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBydW5uaW5nXCIpO1xuICAgICAgaWYgKFwiY29tcGxldGVkXCIgPT09IHN0YXRlKSB7XG4gICAgICAgIGlmIChcInRocm93XCIgPT09IG1ldGhvZCkgdGhyb3cgYXJnO1xuICAgICAgICByZXR1cm4gZG9uZVJlc3VsdCgpO1xuICAgICAgfVxuICAgICAgZm9yIChjb250ZXh0Lm1ldGhvZCA9IG1ldGhvZCwgY29udGV4dC5hcmcgPSBhcmc7Oykge1xuICAgICAgICB2YXIgZGVsZWdhdGUgPSBjb250ZXh0LmRlbGVnYXRlO1xuICAgICAgICBpZiAoZGVsZWdhdGUpIHtcbiAgICAgICAgICB2YXIgZGVsZWdhdGVSZXN1bHQgPSBtYXliZUludm9rZURlbGVnYXRlKGRlbGVnYXRlLCBjb250ZXh0KTtcbiAgICAgICAgICBpZiAoZGVsZWdhdGVSZXN1bHQpIHtcbiAgICAgICAgICAgIGlmIChkZWxlZ2F0ZVJlc3VsdCA9PT0gQ29udGludWVTZW50aW5lbCkgY29udGludWU7XG4gICAgICAgICAgICByZXR1cm4gZGVsZWdhdGVSZXN1bHQ7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChcIm5leHRcIiA9PT0gY29udGV4dC5tZXRob2QpIGNvbnRleHQuc2VudCA9IGNvbnRleHQuX3NlbnQgPSBjb250ZXh0LmFyZztlbHNlIGlmIChcInRocm93XCIgPT09IGNvbnRleHQubWV0aG9kKSB7XG4gICAgICAgICAgaWYgKFwic3VzcGVuZGVkU3RhcnRcIiA9PT0gc3RhdGUpIHRocm93IHN0YXRlID0gXCJjb21wbGV0ZWRcIiwgY29udGV4dC5hcmc7XG4gICAgICAgICAgY29udGV4dC5kaXNwYXRjaEV4Y2VwdGlvbihjb250ZXh0LmFyZyk7XG4gICAgICAgIH0gZWxzZSBcInJldHVyblwiID09PSBjb250ZXh0Lm1ldGhvZCAmJiBjb250ZXh0LmFicnVwdChcInJldHVyblwiLCBjb250ZXh0LmFyZyk7XG4gICAgICAgIHN0YXRlID0gXCJleGVjdXRpbmdcIjtcbiAgICAgICAgdmFyIHJlY29yZCA9IHRyeUNhdGNoKGlubmVyRm4sIHNlbGYsIGNvbnRleHQpO1xuICAgICAgICBpZiAoXCJub3JtYWxcIiA9PT0gcmVjb3JkLnR5cGUpIHtcbiAgICAgICAgICBpZiAoc3RhdGUgPSBjb250ZXh0LmRvbmUgPyBcImNvbXBsZXRlZFwiIDogXCJzdXNwZW5kZWRZaWVsZFwiLCByZWNvcmQuYXJnID09PSBDb250aW51ZVNlbnRpbmVsKSBjb250aW51ZTtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdmFsdWU6IHJlY29yZC5hcmcsXG4gICAgICAgICAgICBkb25lOiBjb250ZXh0LmRvbmVcbiAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIFwidGhyb3dcIiA9PT0gcmVjb3JkLnR5cGUgJiYgKHN0YXRlID0gXCJjb21wbGV0ZWRcIiwgY29udGV4dC5tZXRob2QgPSBcInRocm93XCIsIGNvbnRleHQuYXJnID0gcmVjb3JkLmFyZyk7XG4gICAgICB9XG4gICAgfTtcbiAgfVxuICBmdW5jdGlvbiBtYXliZUludm9rZURlbGVnYXRlKGRlbGVnYXRlLCBjb250ZXh0KSB7XG4gICAgdmFyIG1ldGhvZE5hbWUgPSBjb250ZXh0Lm1ldGhvZCxcbiAgICAgIG1ldGhvZCA9IGRlbGVnYXRlLml0ZXJhdG9yW21ldGhvZE5hbWVdO1xuICAgIGlmICh1bmRlZmluZWQgPT09IG1ldGhvZCkgcmV0dXJuIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsLCBcInRocm93XCIgPT09IG1ldGhvZE5hbWUgJiYgZGVsZWdhdGUuaXRlcmF0b3IucmV0dXJuICYmIChjb250ZXh0Lm1ldGhvZCA9IFwicmV0dXJuXCIsIGNvbnRleHQuYXJnID0gdW5kZWZpbmVkLCBtYXliZUludm9rZURlbGVnYXRlKGRlbGVnYXRlLCBjb250ZXh0KSwgXCJ0aHJvd1wiID09PSBjb250ZXh0Lm1ldGhvZCkgfHwgXCJyZXR1cm5cIiAhPT0gbWV0aG9kTmFtZSAmJiAoY29udGV4dC5tZXRob2QgPSBcInRocm93XCIsIGNvbnRleHQuYXJnID0gbmV3IFR5cGVFcnJvcihcIlRoZSBpdGVyYXRvciBkb2VzIG5vdCBwcm92aWRlIGEgJ1wiICsgbWV0aG9kTmFtZSArIFwiJyBtZXRob2RcIikpLCBDb250aW51ZVNlbnRpbmVsO1xuICAgIHZhciByZWNvcmQgPSB0cnlDYXRjaChtZXRob2QsIGRlbGVnYXRlLml0ZXJhdG9yLCBjb250ZXh0LmFyZyk7XG4gICAgaWYgKFwidGhyb3dcIiA9PT0gcmVjb3JkLnR5cGUpIHJldHVybiBjb250ZXh0Lm1ldGhvZCA9IFwidGhyb3dcIiwgY29udGV4dC5hcmcgPSByZWNvcmQuYXJnLCBjb250ZXh0LmRlbGVnYXRlID0gbnVsbCwgQ29udGludWVTZW50aW5lbDtcbiAgICB2YXIgaW5mbyA9IHJlY29yZC5hcmc7XG4gICAgcmV0dXJuIGluZm8gPyBpbmZvLmRvbmUgPyAoY29udGV4dFtkZWxlZ2F0ZS5yZXN1bHROYW1lXSA9IGluZm8udmFsdWUsIGNvbnRleHQubmV4dCA9IGRlbGVnYXRlLm5leHRMb2MsIFwicmV0dXJuXCIgIT09IGNvbnRleHQubWV0aG9kICYmIChjb250ZXh0Lm1ldGhvZCA9IFwibmV4dFwiLCBjb250ZXh0LmFyZyA9IHVuZGVmaW5lZCksIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsLCBDb250aW51ZVNlbnRpbmVsKSA6IGluZm8gOiAoY29udGV4dC5tZXRob2QgPSBcInRocm93XCIsIGNvbnRleHQuYXJnID0gbmV3IFR5cGVFcnJvcihcIml0ZXJhdG9yIHJlc3VsdCBpcyBub3QgYW4gb2JqZWN0XCIpLCBjb250ZXh0LmRlbGVnYXRlID0gbnVsbCwgQ29udGludWVTZW50aW5lbCk7XG4gIH1cbiAgZnVuY3Rpb24gcHVzaFRyeUVudHJ5KGxvY3MpIHtcbiAgICB2YXIgZW50cnkgPSB7XG4gICAgICB0cnlMb2M6IGxvY3NbMF1cbiAgICB9O1xuICAgIDEgaW4gbG9jcyAmJiAoZW50cnkuY2F0Y2hMb2MgPSBsb2NzWzFdKSwgMiBpbiBsb2NzICYmIChlbnRyeS5maW5hbGx5TG9jID0gbG9jc1syXSwgZW50cnkuYWZ0ZXJMb2MgPSBsb2NzWzNdKSwgdGhpcy50cnlFbnRyaWVzLnB1c2goZW50cnkpO1xuICB9XG4gIGZ1bmN0aW9uIHJlc2V0VHJ5RW50cnkoZW50cnkpIHtcbiAgICB2YXIgcmVjb3JkID0gZW50cnkuY29tcGxldGlvbiB8fCB7fTtcbiAgICByZWNvcmQudHlwZSA9IFwibm9ybWFsXCIsIGRlbGV0ZSByZWNvcmQuYXJnLCBlbnRyeS5jb21wbGV0aW9uID0gcmVjb3JkO1xuICB9XG4gIGZ1bmN0aW9uIENvbnRleHQodHJ5TG9jc0xpc3QpIHtcbiAgICB0aGlzLnRyeUVudHJpZXMgPSBbe1xuICAgICAgdHJ5TG9jOiBcInJvb3RcIlxuICAgIH1dLCB0cnlMb2NzTGlzdC5mb3JFYWNoKHB1c2hUcnlFbnRyeSwgdGhpcyksIHRoaXMucmVzZXQoITApO1xuICB9XG4gIGZ1bmN0aW9uIHZhbHVlcyhpdGVyYWJsZSkge1xuICAgIGlmIChpdGVyYWJsZSkge1xuICAgICAgdmFyIGl0ZXJhdG9yTWV0aG9kID0gaXRlcmFibGVbaXRlcmF0b3JTeW1ib2xdO1xuICAgICAgaWYgKGl0ZXJhdG9yTWV0aG9kKSByZXR1cm4gaXRlcmF0b3JNZXRob2QuY2FsbChpdGVyYWJsZSk7XG4gICAgICBpZiAoXCJmdW5jdGlvblwiID09IHR5cGVvZiBpdGVyYWJsZS5uZXh0KSByZXR1cm4gaXRlcmFibGU7XG4gICAgICBpZiAoIWlzTmFOKGl0ZXJhYmxlLmxlbmd0aCkpIHtcbiAgICAgICAgdmFyIGkgPSAtMSxcbiAgICAgICAgICBuZXh0ID0gZnVuY3Rpb24gbmV4dCgpIHtcbiAgICAgICAgICAgIGZvciAoOyArK2kgPCBpdGVyYWJsZS5sZW5ndGg7KSBpZiAoaGFzT3duLmNhbGwoaXRlcmFibGUsIGkpKSByZXR1cm4gbmV4dC52YWx1ZSA9IGl0ZXJhYmxlW2ldLCBuZXh0LmRvbmUgPSAhMSwgbmV4dDtcbiAgICAgICAgICAgIHJldHVybiBuZXh0LnZhbHVlID0gdW5kZWZpbmVkLCBuZXh0LmRvbmUgPSAhMCwgbmV4dDtcbiAgICAgICAgICB9O1xuICAgICAgICByZXR1cm4gbmV4dC5uZXh0ID0gbmV4dDtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgIG5leHQ6IGRvbmVSZXN1bHRcbiAgICB9O1xuICB9XG4gIGZ1bmN0aW9uIGRvbmVSZXN1bHQoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHZhbHVlOiB1bmRlZmluZWQsXG4gICAgICBkb25lOiAhMFxuICAgIH07XG4gIH1cbiAgcmV0dXJuIEdlbmVyYXRvckZ1bmN0aW9uLnByb3RvdHlwZSA9IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlLCBkZWZpbmVQcm9wZXJ0eShHcCwgXCJjb25zdHJ1Y3RvclwiLCB7XG4gICAgdmFsdWU6IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlLFxuICAgIGNvbmZpZ3VyYWJsZTogITBcbiAgfSksIGRlZmluZVByb3BlcnR5KEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlLCBcImNvbnN0cnVjdG9yXCIsIHtcbiAgICB2YWx1ZTogR2VuZXJhdG9yRnVuY3Rpb24sXG4gICAgY29uZmlndXJhYmxlOiAhMFxuICB9KSwgR2VuZXJhdG9yRnVuY3Rpb24uZGlzcGxheU5hbWUgPSBkZWZpbmUoR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUsIHRvU3RyaW5nVGFnU3ltYm9sLCBcIkdlbmVyYXRvckZ1bmN0aW9uXCIpLCBleHBvcnRzLmlzR2VuZXJhdG9yRnVuY3Rpb24gPSBmdW5jdGlvbiAoZ2VuRnVuKSB7XG4gICAgdmFyIGN0b3IgPSBcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIGdlbkZ1biAmJiBnZW5GdW4uY29uc3RydWN0b3I7XG4gICAgcmV0dXJuICEhY3RvciAmJiAoY3RvciA9PT0gR2VuZXJhdG9yRnVuY3Rpb24gfHwgXCJHZW5lcmF0b3JGdW5jdGlvblwiID09PSAoY3Rvci5kaXNwbGF5TmFtZSB8fCBjdG9yLm5hbWUpKTtcbiAgfSwgZXhwb3J0cy5tYXJrID0gZnVuY3Rpb24gKGdlbkZ1bikge1xuICAgIHJldHVybiBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2YoZ2VuRnVuLCBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSkgOiAoZ2VuRnVuLl9fcHJvdG9fXyA9IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlLCBkZWZpbmUoZ2VuRnVuLCB0b1N0cmluZ1RhZ1N5bWJvbCwgXCJHZW5lcmF0b3JGdW5jdGlvblwiKSksIGdlbkZ1bi5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEdwKSwgZ2VuRnVuO1xuICB9LCBleHBvcnRzLmF3cmFwID0gZnVuY3Rpb24gKGFyZykge1xuICAgIHJldHVybiB7XG4gICAgICBfX2F3YWl0OiBhcmdcbiAgICB9O1xuICB9LCBkZWZpbmVJdGVyYXRvck1ldGhvZHMoQXN5bmNJdGVyYXRvci5wcm90b3R5cGUpLCBkZWZpbmUoQXN5bmNJdGVyYXRvci5wcm90b3R5cGUsIGFzeW5jSXRlcmF0b3JTeW1ib2wsIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfSksIGV4cG9ydHMuQXN5bmNJdGVyYXRvciA9IEFzeW5jSXRlcmF0b3IsIGV4cG9ydHMuYXN5bmMgPSBmdW5jdGlvbiAoaW5uZXJGbiwgb3V0ZXJGbiwgc2VsZiwgdHJ5TG9jc0xpc3QsIFByb21pc2VJbXBsKSB7XG4gICAgdm9pZCAwID09PSBQcm9taXNlSW1wbCAmJiAoUHJvbWlzZUltcGwgPSBQcm9taXNlKTtcbiAgICB2YXIgaXRlciA9IG5ldyBBc3luY0l0ZXJhdG9yKHdyYXAoaW5uZXJGbiwgb3V0ZXJGbiwgc2VsZiwgdHJ5TG9jc0xpc3QpLCBQcm9taXNlSW1wbCk7XG4gICAgcmV0dXJuIGV4cG9ydHMuaXNHZW5lcmF0b3JGdW5jdGlvbihvdXRlckZuKSA/IGl0ZXIgOiBpdGVyLm5leHQoKS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgIHJldHVybiByZXN1bHQuZG9uZSA/IHJlc3VsdC52YWx1ZSA6IGl0ZXIubmV4dCgpO1xuICAgIH0pO1xuICB9LCBkZWZpbmVJdGVyYXRvck1ldGhvZHMoR3ApLCBkZWZpbmUoR3AsIHRvU3RyaW5nVGFnU3ltYm9sLCBcIkdlbmVyYXRvclwiKSwgZGVmaW5lKEdwLCBpdGVyYXRvclN5bWJvbCwgZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9KSwgZGVmaW5lKEdwLCBcInRvU3RyaW5nXCIsIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gXCJbb2JqZWN0IEdlbmVyYXRvcl1cIjtcbiAgfSksIGV4cG9ydHMua2V5cyA9IGZ1bmN0aW9uICh2YWwpIHtcbiAgICB2YXIgb2JqZWN0ID0gT2JqZWN0KHZhbCksXG4gICAgICBrZXlzID0gW107XG4gICAgZm9yICh2YXIga2V5IGluIG9iamVjdCkga2V5cy5wdXNoKGtleSk7XG4gICAgcmV0dXJuIGtleXMucmV2ZXJzZSgpLCBmdW5jdGlvbiBuZXh0KCkge1xuICAgICAgZm9yICg7IGtleXMubGVuZ3RoOykge1xuICAgICAgICB2YXIga2V5ID0ga2V5cy5wb3AoKTtcbiAgICAgICAgaWYgKGtleSBpbiBvYmplY3QpIHJldHVybiBuZXh0LnZhbHVlID0ga2V5LCBuZXh0LmRvbmUgPSAhMSwgbmV4dDtcbiAgICAgIH1cbiAgICAgIHJldHVybiBuZXh0LmRvbmUgPSAhMCwgbmV4dDtcbiAgICB9O1xuICB9LCBleHBvcnRzLnZhbHVlcyA9IHZhbHVlcywgQ29udGV4dC5wcm90b3R5cGUgPSB7XG4gICAgY29uc3RydWN0b3I6IENvbnRleHQsXG4gICAgcmVzZXQ6IGZ1bmN0aW9uIChza2lwVGVtcFJlc2V0KSB7XG4gICAgICBpZiAodGhpcy5wcmV2ID0gMCwgdGhpcy5uZXh0ID0gMCwgdGhpcy5zZW50ID0gdGhpcy5fc2VudCA9IHVuZGVmaW5lZCwgdGhpcy5kb25lID0gITEsIHRoaXMuZGVsZWdhdGUgPSBudWxsLCB0aGlzLm1ldGhvZCA9IFwibmV4dFwiLCB0aGlzLmFyZyA9IHVuZGVmaW5lZCwgdGhpcy50cnlFbnRyaWVzLmZvckVhY2gocmVzZXRUcnlFbnRyeSksICFza2lwVGVtcFJlc2V0KSBmb3IgKHZhciBuYW1lIGluIHRoaXMpIFwidFwiID09PSBuYW1lLmNoYXJBdCgwKSAmJiBoYXNPd24uY2FsbCh0aGlzLCBuYW1lKSAmJiAhaXNOYU4oK25hbWUuc2xpY2UoMSkpICYmICh0aGlzW25hbWVdID0gdW5kZWZpbmVkKTtcbiAgICB9LFxuICAgIHN0b3A6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoaXMuZG9uZSA9ICEwO1xuICAgICAgdmFyIHJvb3RSZWNvcmQgPSB0aGlzLnRyeUVudHJpZXNbMF0uY29tcGxldGlvbjtcbiAgICAgIGlmIChcInRocm93XCIgPT09IHJvb3RSZWNvcmQudHlwZSkgdGhyb3cgcm9vdFJlY29yZC5hcmc7XG4gICAgICByZXR1cm4gdGhpcy5ydmFsO1xuICAgIH0sXG4gICAgZGlzcGF0Y2hFeGNlcHRpb246IGZ1bmN0aW9uIChleGNlcHRpb24pIHtcbiAgICAgIGlmICh0aGlzLmRvbmUpIHRocm93IGV4Y2VwdGlvbjtcbiAgICAgIHZhciBjb250ZXh0ID0gdGhpcztcbiAgICAgIGZ1bmN0aW9uIGhhbmRsZShsb2MsIGNhdWdodCkge1xuICAgICAgICByZXR1cm4gcmVjb3JkLnR5cGUgPSBcInRocm93XCIsIHJlY29yZC5hcmcgPSBleGNlcHRpb24sIGNvbnRleHQubmV4dCA9IGxvYywgY2F1Z2h0ICYmIChjb250ZXh0Lm1ldGhvZCA9IFwibmV4dFwiLCBjb250ZXh0LmFyZyA9IHVuZGVmaW5lZCksICEhY2F1Z2h0O1xuICAgICAgfVxuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV0sXG4gICAgICAgICAgcmVjb3JkID0gZW50cnkuY29tcGxldGlvbjtcbiAgICAgICAgaWYgKFwicm9vdFwiID09PSBlbnRyeS50cnlMb2MpIHJldHVybiBoYW5kbGUoXCJlbmRcIik7XG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPD0gdGhpcy5wcmV2KSB7XG4gICAgICAgICAgdmFyIGhhc0NhdGNoID0gaGFzT3duLmNhbGwoZW50cnksIFwiY2F0Y2hMb2NcIiksXG4gICAgICAgICAgICBoYXNGaW5hbGx5ID0gaGFzT3duLmNhbGwoZW50cnksIFwiZmluYWxseUxvY1wiKTtcbiAgICAgICAgICBpZiAoaGFzQ2F0Y2ggJiYgaGFzRmluYWxseSkge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJldiA8IGVudHJ5LmNhdGNoTG9jKSByZXR1cm4gaGFuZGxlKGVudHJ5LmNhdGNoTG9jLCAhMCk7XG4gICAgICAgICAgICBpZiAodGhpcy5wcmV2IDwgZW50cnkuZmluYWxseUxvYykgcmV0dXJuIGhhbmRsZShlbnRyeS5maW5hbGx5TG9jKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKGhhc0NhdGNoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcmV2IDwgZW50cnkuY2F0Y2hMb2MpIHJldHVybiBoYW5kbGUoZW50cnkuY2F0Y2hMb2MsICEwKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKCFoYXNGaW5hbGx5KSB0aHJvdyBuZXcgRXJyb3IoXCJ0cnkgc3RhdGVtZW50IHdpdGhvdXQgY2F0Y2ggb3IgZmluYWxseVwiKTtcbiAgICAgICAgICAgIGlmICh0aGlzLnByZXYgPCBlbnRyeS5maW5hbGx5TG9jKSByZXR1cm4gaGFuZGxlKGVudHJ5LmZpbmFsbHlMb2MpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgYWJydXB0OiBmdW5jdGlvbiAodHlwZSwgYXJnKSB7XG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA8PSB0aGlzLnByZXYgJiYgaGFzT3duLmNhbGwoZW50cnksIFwiZmluYWxseUxvY1wiKSAmJiB0aGlzLnByZXYgPCBlbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgICAgdmFyIGZpbmFsbHlFbnRyeSA9IGVudHJ5O1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBmaW5hbGx5RW50cnkgJiYgKFwiYnJlYWtcIiA9PT0gdHlwZSB8fCBcImNvbnRpbnVlXCIgPT09IHR5cGUpICYmIGZpbmFsbHlFbnRyeS50cnlMb2MgPD0gYXJnICYmIGFyZyA8PSBmaW5hbGx5RW50cnkuZmluYWxseUxvYyAmJiAoZmluYWxseUVudHJ5ID0gbnVsbCk7XG4gICAgICB2YXIgcmVjb3JkID0gZmluYWxseUVudHJ5ID8gZmluYWxseUVudHJ5LmNvbXBsZXRpb24gOiB7fTtcbiAgICAgIHJldHVybiByZWNvcmQudHlwZSA9IHR5cGUsIHJlY29yZC5hcmcgPSBhcmcsIGZpbmFsbHlFbnRyeSA/ICh0aGlzLm1ldGhvZCA9IFwibmV4dFwiLCB0aGlzLm5leHQgPSBmaW5hbGx5RW50cnkuZmluYWxseUxvYywgQ29udGludWVTZW50aW5lbCkgOiB0aGlzLmNvbXBsZXRlKHJlY29yZCk7XG4gICAgfSxcbiAgICBjb21wbGV0ZTogZnVuY3Rpb24gKHJlY29yZCwgYWZ0ZXJMb2MpIHtcbiAgICAgIGlmIChcInRocm93XCIgPT09IHJlY29yZC50eXBlKSB0aHJvdyByZWNvcmQuYXJnO1xuICAgICAgcmV0dXJuIFwiYnJlYWtcIiA9PT0gcmVjb3JkLnR5cGUgfHwgXCJjb250aW51ZVwiID09PSByZWNvcmQudHlwZSA/IHRoaXMubmV4dCA9IHJlY29yZC5hcmcgOiBcInJldHVyblwiID09PSByZWNvcmQudHlwZSA/ICh0aGlzLnJ2YWwgPSB0aGlzLmFyZyA9IHJlY29yZC5hcmcsIHRoaXMubWV0aG9kID0gXCJyZXR1cm5cIiwgdGhpcy5uZXh0ID0gXCJlbmRcIikgOiBcIm5vcm1hbFwiID09PSByZWNvcmQudHlwZSAmJiBhZnRlckxvYyAmJiAodGhpcy5uZXh0ID0gYWZ0ZXJMb2MpLCBDb250aW51ZVNlbnRpbmVsO1xuICAgIH0sXG4gICAgZmluaXNoOiBmdW5jdGlvbiAoZmluYWxseUxvYykge1xuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIGlmIChlbnRyeS5maW5hbGx5TG9jID09PSBmaW5hbGx5TG9jKSByZXR1cm4gdGhpcy5jb21wbGV0ZShlbnRyeS5jb21wbGV0aW9uLCBlbnRyeS5hZnRlckxvYyksIHJlc2V0VHJ5RW50cnkoZW50cnkpLCBDb250aW51ZVNlbnRpbmVsO1xuICAgICAgfVxuICAgIH0sXG4gICAgY2F0Y2g6IGZ1bmN0aW9uICh0cnlMb2MpIHtcbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuICAgICAgICBpZiAoZW50cnkudHJ5TG9jID09PSB0cnlMb2MpIHtcbiAgICAgICAgICB2YXIgcmVjb3JkID0gZW50cnkuY29tcGxldGlvbjtcbiAgICAgICAgICBpZiAoXCJ0aHJvd1wiID09PSByZWNvcmQudHlwZSkge1xuICAgICAgICAgICAgdmFyIHRocm93biA9IHJlY29yZC5hcmc7XG4gICAgICAgICAgICByZXNldFRyeUVudHJ5KGVudHJ5KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHRocm93bjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiaWxsZWdhbCBjYXRjaCBhdHRlbXB0XCIpO1xuICAgIH0sXG4gICAgZGVsZWdhdGVZaWVsZDogZnVuY3Rpb24gKGl0ZXJhYmxlLCByZXN1bHROYW1lLCBuZXh0TG9jKSB7XG4gICAgICByZXR1cm4gdGhpcy5kZWxlZ2F0ZSA9IHtcbiAgICAgICAgaXRlcmF0b3I6IHZhbHVlcyhpdGVyYWJsZSksXG4gICAgICAgIHJlc3VsdE5hbWU6IHJlc3VsdE5hbWUsXG4gICAgICAgIG5leHRMb2M6IG5leHRMb2NcbiAgICAgIH0sIFwibmV4dFwiID09PSB0aGlzLm1ldGhvZCAmJiAodGhpcy5hcmcgPSB1bmRlZmluZWQpLCBDb250aW51ZVNlbnRpbmVsO1xuICAgIH1cbiAgfSwgZXhwb3J0cztcbn1cbmZ1bmN0aW9uIGFzeW5jR2VuZXJhdG9yU3RlcChnZW4sIHJlc29sdmUsIHJlamVjdCwgX25leHQsIF90aHJvdywga2V5LCBhcmcpIHtcbiAgdHJ5IHtcbiAgICB2YXIgaW5mbyA9IGdlbltrZXldKGFyZyk7XG4gICAgdmFyIHZhbHVlID0gaW5mby52YWx1ZTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZWplY3QoZXJyb3IpO1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoaW5mby5kb25lKSB7XG4gICAgcmVzb2x2ZSh2YWx1ZSk7XG4gIH0gZWxzZSB7XG4gICAgUHJvbWlzZS5yZXNvbHZlKHZhbHVlKS50aGVuKF9uZXh0LCBfdGhyb3cpO1xuICB9XG59XG5mdW5jdGlvbiBfYXN5bmNUb0dlbmVyYXRvcihmbikge1xuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIHZhciBzZWxmID0gdGhpcyxcbiAgICAgIGFyZ3MgPSBhcmd1bWVudHM7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIHZhciBnZW4gPSBmbi5hcHBseShzZWxmLCBhcmdzKTtcbiAgICAgIGZ1bmN0aW9uIF9uZXh0KHZhbHVlKSB7XG4gICAgICAgIGFzeW5jR2VuZXJhdG9yU3RlcChnZW4sIHJlc29sdmUsIHJlamVjdCwgX25leHQsIF90aHJvdywgXCJuZXh0XCIsIHZhbHVlKTtcbiAgICAgIH1cbiAgICAgIGZ1bmN0aW9uIF90aHJvdyhlcnIpIHtcbiAgICAgICAgYXN5bmNHZW5lcmF0b3JTdGVwKGdlbiwgcmVzb2x2ZSwgcmVqZWN0LCBfbmV4dCwgX3Rocm93LCBcInRocm93XCIsIGVycik7XG4gICAgICB9XG4gICAgICBfbmV4dCh1bmRlZmluZWQpO1xuICAgIH0pO1xuICB9O1xufVxuXG52YXIgREVGQVVMVF9USU1FT1VUID0gNTAwMDtcbnZhciBVbmF2YWlsYWJsZUVycm9yID0gLyojX19QVVJFX18qL25ldyBFcnJvcignRkRDMyBEZXNrdG9wQWdlbnQgbm90IGF2YWlsYWJsZSBhdCBgd2luZG93LmZkYzNgLicpO1xudmFyIFRpbWVvdXRFcnJvciA9IC8qI19fUFVSRV9fKi9uZXcgRXJyb3IoJ1RpbWVkIG91dCB3YWl0aW5nIGZvciBgZmRjM1JlYWR5YCBldmVudC4nKTtcbnZhciBVbmV4cGVjdGVkRXJyb3IgPSAvKiNfX1BVUkVfXyovbmV3IEVycm9yKCdgZmRjM1JlYWR5YCBldmVudCBmaXJlZCwgYnV0IGB3aW5kb3cuZmRjM2Agbm90IHNldCB0byBEZXNrdG9wQWdlbnQuJyk7XG5mdW5jdGlvbiByZWplY3RJZk5vR2xvYmFsKGYpIHtcbiAgcmV0dXJuIHdpbmRvdy5mZGMzID8gZigpIDogUHJvbWlzZS5yZWplY3QoVW5hdmFpbGFibGVFcnJvcik7XG59XG4vKipcclxuICogVXRpbGl0eSBmdW5jdGlvbiB0aGF0IHJldHVybnMgYSBwcm9taXNlIHRoYXQgd2lsbCByZXNvbHZlIGltbWVhZGlhdGVseVxyXG4gKiBpZiB0aGUgZGVza3RvcCBhZ2VudCBBUEkgaXMgZm91bmQgYXQgYHdpbmRvdy5mZGMzYC4gSWYgdGhlIEFQSSBpcyBmb3VuZCxcclxuICogdGhlIHByb21pc2Ugd2lsbCByZXNvbHZlIHdoZW4gdGhlIGBmZGMzUmVhZHlgIGV2ZW50IGlzIHJlY2VpdmVkIG9yIGlmIGl0XHJcbiAqIGlzIGZvdW5kIGF0IHRoZSBlbmQgb2YgdGhlIHNwZWNpZmllZCB0aW1lb3V0LiBJZiB0aGUgQVBJIGlzIG5vdCBmb3VuZCwgaXRcclxuICogd2lsbCByZWplY3Qgd2l0aCBhbiBlcnJvci5cclxuICpcclxuICogYGBgamF2YXNjcmlwdFxyXG4gKiBhd2FpdCBmZGMzUmVhZHkoKTtcclxuICogY29uc3QgaW50ZW50TGlzdGVuZXIgPSBhd2FpdCBhZGRJbnRlbnRMaXN0ZW5lcihcIlZpZXdDaGFydFwiLCBpbnRlbnRIYW5kbGVyRm4pO1xyXG4gKiBgYGBcclxuICpcclxuICogQHBhcmFtIHdhaXRGb3JNcyBUaGUgbnVtYmVyIG9mIG1pbGxpc2Vjb25kcyB0byB3YWl0IGZvciB0aGUgRkRDMyBBUEkgdG8gYmVcclxuICogcmVhZHkuIERlZmF1bHRzIHRvIDUgc2Vjb25kcy5cclxuICovXG52YXIgZmRjM1JlYWR5ID0gLyojX19QVVJFX18qL2Z1bmN0aW9uICgpIHtcbiAgdmFyIF9yZWYgPSAvKiNfX1BVUkVfXyovX2FzeW5jVG9HZW5lcmF0b3IoIC8qI19fUFVSRV9fKi9fcmVnZW5lcmF0b3JSdW50aW1lKCkubWFyayhmdW5jdGlvbiBfY2FsbGVlKHdhaXRGb3JNcykge1xuICAgIHJldHVybiBfcmVnZW5lcmF0b3JSdW50aW1lKCkud3JhcChmdW5jdGlvbiBfY2FsbGVlJChfY29udGV4dCkge1xuICAgICAgd2hpbGUgKDEpIHN3aXRjaCAoX2NvbnRleHQucHJldiA9IF9jb250ZXh0Lm5leHQpIHtcbiAgICAgICAgY2FzZSAwOlxuICAgICAgICAgIGlmICh3YWl0Rm9yTXMgPT09IHZvaWQgMCkge1xuICAgICAgICAgICAgd2FpdEZvck1zID0gREVGQVVMVF9USU1FT1VUO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gX2NvbnRleHQuYWJydXB0KFwicmV0dXJuXCIsIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgIC8vIGlmIHRoZSBnbG9iYWwgaXMgYWxyZWFkeSBhdmFpbGFibGUgcmVzb2x2ZSBpbW1lZGlhdGVseVxuICAgICAgICAgICAgaWYgKHdpbmRvdy5mZGMzKSB7XG4gICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIC8vIGlmIGl0cyBub3QgYXZhaWxhYmxlIHNldHVwIGEgdGltZW91dCB0byByZXR1cm4gYSByZWplY3RlZCBwcm9taXNlXG4gICAgICAgICAgICAgIHZhciB0aW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHdpbmRvdy5mZGMzID8gcmVzb2x2ZSgpIDogcmVqZWN0KFRpbWVvdXRFcnJvcik7XG4gICAgICAgICAgICAgIH0sIHdhaXRGb3JNcyk7XG4gICAgICAgICAgICAgIC8vIGxpc3RlbiBmb3IgdGhlIGZkYzNSZWFkeSBldmVudFxuICAgICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignZmRjM1JlYWR5JywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbiAgICAgICAgICAgICAgICB3aW5kb3cuZmRjMyA/IHJlc29sdmUoKSA6IHJlamVjdChVbmV4cGVjdGVkRXJyb3IpO1xuICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgb25jZTogdHJ1ZVxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KSk7XG4gICAgICAgIGNhc2UgMjpcbiAgICAgICAgY2FzZSBcImVuZFwiOlxuICAgICAgICAgIHJldHVybiBfY29udGV4dC5zdG9wKCk7XG4gICAgICB9XG4gICAgfSwgX2NhbGxlZSk7XG4gIH0pKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIGZkYzNSZWFkeShfeCkge1xuICAgIHJldHVybiBfcmVmLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gIH07XG59KCk7XG5mdW5jdGlvbiBpc1N0cmluZyhhcHApIHtcbiAgcmV0dXJuICEhYXBwICYmIHR5cGVvZiBhcHAgPT09ICdzdHJpbmcnO1xufVxuZnVuY3Rpb24gb3BlbihhcHAsIGNvbnRleHQpIHtcbiAgaWYgKGlzU3RyaW5nKGFwcCkpIHtcbiAgICByZXR1cm4gcmVqZWN0SWZOb0dsb2JhbChmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gd2luZG93LmZkYzMub3BlbihhcHAsIGNvbnRleHQpO1xuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiByZWplY3RJZk5vR2xvYmFsKGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiB3aW5kb3cuZmRjMy5vcGVuKGFwcCwgY29udGV4dCk7XG4gICAgfSk7XG4gIH1cbn1cbmZ1bmN0aW9uIGZpbmRJbnRlbnQoaW50ZW50LCBjb250ZXh0LCByZXN1bHRUeXBlKSB7XG4gIHJldHVybiByZWplY3RJZk5vR2xvYmFsKGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gd2luZG93LmZkYzMuZmluZEludGVudChpbnRlbnQsIGNvbnRleHQsIHJlc3VsdFR5cGUpO1xuICB9KTtcbn1cbmZ1bmN0aW9uIGZpbmRJbnRlbnRzQnlDb250ZXh0KGNvbnRleHQsIHJlc3VsdFR5cGUpIHtcbiAgcmV0dXJuIHJlamVjdElmTm9HbG9iYWwoZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB3aW5kb3cuZmRjMy5maW5kSW50ZW50c0J5Q29udGV4dChjb250ZXh0LCByZXN1bHRUeXBlKTtcbiAgfSk7XG59XG5mdW5jdGlvbiBicm9hZGNhc3QoY29udGV4dCkge1xuICByZXR1cm4gcmVqZWN0SWZOb0dsb2JhbChmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHdpbmRvdy5mZGMzLmJyb2FkY2FzdChjb250ZXh0KTtcbiAgfSk7XG59XG5mdW5jdGlvbiByYWlzZUludGVudChpbnRlbnQsIGNvbnRleHQsIGFwcCkge1xuICBpZiAoaXNTdHJpbmcoYXBwKSkge1xuICAgIHJldHVybiByZWplY3RJZk5vR2xvYmFsKGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiB3aW5kb3cuZmRjMy5yYWlzZUludGVudChpbnRlbnQsIGNvbnRleHQsIGFwcCk7XG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHJlamVjdElmTm9HbG9iYWwoZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHdpbmRvdy5mZGMzLnJhaXNlSW50ZW50KGludGVudCwgY29udGV4dCwgYXBwKTtcbiAgICB9KTtcbiAgfVxufVxuZnVuY3Rpb24gcmFpc2VJbnRlbnRGb3JDb250ZXh0KGNvbnRleHQsIGFwcCkge1xuICBpZiAoaXNTdHJpbmcoYXBwKSkge1xuICAgIHJldHVybiByZWplY3RJZk5vR2xvYmFsKGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiB3aW5kb3cuZmRjMy5yYWlzZUludGVudEZvckNvbnRleHQoY29udGV4dCwgYXBwKTtcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gcmVqZWN0SWZOb0dsb2JhbChmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gd2luZG93LmZkYzMucmFpc2VJbnRlbnRGb3JDb250ZXh0KGNvbnRleHQsIGFwcCk7XG4gICAgfSk7XG4gIH1cbn1cbmZ1bmN0aW9uIGFkZEludGVudExpc3RlbmVyKGludGVudCwgaGFuZGxlcikge1xuICByZXR1cm4gcmVqZWN0SWZOb0dsb2JhbChmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHdpbmRvdy5mZGMzLmFkZEludGVudExpc3RlbmVyKGludGVudCwgaGFuZGxlcik7XG4gIH0pO1xufVxuZnVuY3Rpb24gYWRkQ29udGV4dExpc3RlbmVyKGNvbnRleHRUeXBlT3JIYW5kbGVyLCBoYW5kbGVyKSB7XG4gIC8vSGFuZGxlIChkZXByZWNhdGVkKSBmdW5jdGlvbiBzaWduYXR1cmUgdGhhdCBhbGxvd2VkIGNvbnRleHRUeXBlIGFyZ3VtZW50IHRvIGJlIG9taXR0ZWRcbiAgaWYgKHR5cGVvZiBjb250ZXh0VHlwZU9ySGFuZGxlciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiByZWplY3RJZk5vR2xvYmFsKGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiB3aW5kb3cuZmRjMy5hZGRDb250ZXh0TGlzdGVuZXIoY29udGV4dFR5cGVPckhhbmRsZXIsIGhhbmRsZXIpO1xuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiByZWplY3RJZk5vR2xvYmFsKGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiB3aW5kb3cuZmRjMy5hZGRDb250ZXh0TGlzdGVuZXIobnVsbCwgY29udGV4dFR5cGVPckhhbmRsZXIpO1xuICAgIH0pO1xuICB9XG59XG5mdW5jdGlvbiBnZXRVc2VyQ2hhbm5lbHMoKSB7XG4gIHJldHVybiByZWplY3RJZk5vR2xvYmFsKGZ1bmN0aW9uICgpIHtcbiAgICAvL2ZhbGxiYWNrIHRvIGdldFN5c3RlbUNoYW5uZWxzIGZvciBGREMzIDwyLjAgaW1wbGVtZW50YXRpb25zXG4gICAgaWYgKHdpbmRvdy5mZGMzLmdldFVzZXJDaGFubmVscykge1xuICAgICAgcmV0dXJuIHdpbmRvdy5mZGMzLmdldFVzZXJDaGFubmVscygpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gd2luZG93LmZkYzMuZ2V0U3lzdGVtQ2hhbm5lbHMoKTtcbiAgICB9XG4gIH0pO1xufVxuZnVuY3Rpb24gZ2V0U3lzdGVtQ2hhbm5lbHMoKSB7XG4gIC8vZmFsbGZvcndhcmQgdG8gZ2V0VXNlckNoYW5uZWxzIGZvciBGREMzIDIuMCsgaW1wbGVtZW50YXRpb25zXG4gIHJldHVybiBnZXRVc2VyQ2hhbm5lbHMoKTtcbn1cbmZ1bmN0aW9uIGpvaW5Vc2VyQ2hhbm5lbChjaGFubmVsSWQpIHtcbiAgcmV0dXJuIHJlamVjdElmTm9HbG9iYWwoZnVuY3Rpb24gKCkge1xuICAgIC8vZmFsbGJhY2sgdG8gam9pbkNoYW5uZWwgZm9yIEZEQzMgPDIuMCBpbXBsZW1lbnRhdGlvbnNcbiAgICBpZiAod2luZG93LmZkYzMuam9pblVzZXJDaGFubmVsKSB7XG4gICAgICByZXR1cm4gd2luZG93LmZkYzMuam9pblVzZXJDaGFubmVsKGNoYW5uZWxJZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB3aW5kb3cuZmRjMy5qb2luQ2hhbm5lbChjaGFubmVsSWQpO1xuICAgIH1cbiAgfSk7XG59XG5mdW5jdGlvbiBqb2luQ2hhbm5lbChjaGFubmVsSWQpIHtcbiAgLy9mYWxsZm9yd2FyZCB0byBqb2luVXNlckNoYW5uZWwgZm9yIEZEQzMgMi4wKyBpbXBsZW1lbnRhdGlvbnNcbiAgcmV0dXJuIGpvaW5Vc2VyQ2hhbm5lbChjaGFubmVsSWQpO1xufVxuZnVuY3Rpb24gZ2V0T3JDcmVhdGVDaGFubmVsKGNoYW5uZWxJZCkge1xuICByZXR1cm4gcmVqZWN0SWZOb0dsb2JhbChmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHdpbmRvdy5mZGMzLmdldE9yQ3JlYXRlQ2hhbm5lbChjaGFubmVsSWQpO1xuICB9KTtcbn1cbmZ1bmN0aW9uIGdldEN1cnJlbnRDaGFubmVsKCkge1xuICByZXR1cm4gcmVqZWN0SWZOb0dsb2JhbChmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHdpbmRvdy5mZGMzLmdldEN1cnJlbnRDaGFubmVsKCk7XG4gIH0pO1xufVxuZnVuY3Rpb24gbGVhdmVDdXJyZW50Q2hhbm5lbCgpIHtcbiAgcmV0dXJuIHJlamVjdElmTm9HbG9iYWwoZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB3aW5kb3cuZmRjMy5sZWF2ZUN1cnJlbnRDaGFubmVsKCk7XG4gIH0pO1xufVxuZnVuY3Rpb24gY3JlYXRlUHJpdmF0ZUNoYW5uZWwoKSB7XG4gIHJldHVybiByZWplY3RJZk5vR2xvYmFsKGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gd2luZG93LmZkYzMuY3JlYXRlUHJpdmF0ZUNoYW5uZWwoKTtcbiAgfSk7XG59XG5mdW5jdGlvbiBnZXRJbmZvKCkge1xuICByZXR1cm4gcmVqZWN0SWZOb0dsb2JhbChmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHdpbmRvdy5mZGMzLmdldEluZm8oKTtcbiAgfSk7XG59XG5mdW5jdGlvbiBnZXRBcHBNZXRhZGF0YShhcHApIHtcbiAgcmV0dXJuIHJlamVjdElmTm9HbG9iYWwoZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB3aW5kb3cuZmRjMy5nZXRBcHBNZXRhZGF0YShhcHApO1xuICB9KTtcbn1cbmZ1bmN0aW9uIGZpbmRJbnN0YW5jZXMoYXBwKSB7XG4gIHJldHVybiByZWplY3RJZk5vR2xvYmFsKGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gd2luZG93LmZkYzMuZmluZEluc3RhbmNlcyhhcHApO1xuICB9KTtcbn1cbi8qKlxyXG4gKiBDb21wYXJlIG51bWVyaWMgc2VtdmVyIHZlcnNpb24gbnVtYmVyIHN0cmluZ3MgKGluIHRoZSBmb3JtIGAxLjIuM2ApLlxyXG4gKlxyXG4gKiBSZXR1cm5zIGAtMWAgaWYgdGhlIGZpcnN0IGFyZ3VtZW50IGlzIGEgbG93ZXIgdmVyc2lvbiBudW1iZXIgdGhhbiB0aGUgc2Vjb25kLFxyXG4gKiBgMWAgaWYgdGhlIGZpcnN0IGFyZ3VtZW50IGlzIGdyZWF0ZXIgdGhhbiB0aGUgc2Vjb25kLCAwIGlmIHRoZSBhcmd1bWVudHMgYXJlXHJcbiAqIGVxdWFsIGFuZCBgbnVsbGAgaWYgYW4gZXJyb3Igb2NjdXJyZWQgZHVyaW5nIHRoZSBjb21wYXJpc29uLlxyXG4gKlxyXG4gKiBAcGFyYW0gYVxyXG4gKiBAcGFyYW0gYlxyXG4gKi9cbnZhciBjb21wYXJlVmVyc2lvbk51bWJlcnMgPSBmdW5jdGlvbiBjb21wYXJlVmVyc2lvbk51bWJlcnMoYSwgYikge1xuICB0cnkge1xuICAgIHZhciBhVmVyQXJyID0gYS5zcGxpdCgnLicpLm1hcChOdW1iZXIpO1xuICAgIHZhciBiVmVyQXJyID0gYi5zcGxpdCgnLicpLm1hcChOdW1iZXIpO1xuICAgIGZvciAodmFyIGluZGV4ID0gMDsgaW5kZXggPCBNYXRoLm1heChhVmVyQXJyLmxlbmd0aCwgYlZlckFyci5sZW5ndGgpOyBpbmRleCsrKSB7XG4gICAgICAvKiBJZiBvbmUgdmVyc2lvbiBudW1iZXIgaGFzIG1vcmUgZGlnaXRzIGFuZCB0aGUgb3RoZXIgZG9lcyBub3QsIGFuZCB0aGV5IGFyZSBvdGhlcndpc2UgZXF1YWwsXHJcbiAgICAgICAgIGFzc3VtZSB0aGUgbG9uZ2VyIGlzIGdyZWF0ZXIuIEUuZy4gMS4xLjEgPiAxLjEgKi9cbiAgICAgIGlmIChpbmRleCA9PT0gYVZlckFyci5sZW5ndGggfHwgYVZlckFycltpbmRleF0gPCBiVmVyQXJyW2luZGV4XSkge1xuICAgICAgICByZXR1cm4gLTE7XG4gICAgICB9IGVsc2UgaWYgKGluZGV4ID09PSBiVmVyQXJyLmxlbmd0aCB8fCBhVmVyQXJyW2luZGV4XSA+IGJWZXJBcnJbaW5kZXhdKSB7XG4gICAgICAgIHJldHVybiAxO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gMDtcbiAgfSBjYXRjaCAoZSkge1xuICAgIGNvbnNvbGUuZXJyb3IoJ0ZhaWxlZCB0byBjb21wYXJlIHZlcnNpb24gc3RyaW5ncycsIGUpO1xuICAgIHJldHVybiBudWxsO1xuICB9XG59O1xuLyoqXHJcbiAqIENoZWNrIGlmIHRoZSBGREMzIHZlcnNpb24gaW4gYW4gSW1wbGVtZW50YXRpb25NZXRhZGF0YSBvYmplY3QgaXMgZ3JlYXRlciB0aGFuXHJcbiAqIG9yIGVxdWFsIHRvIHRoZSBzdXBwbGllZCBudW1lcmljIHNlbXZlciB2ZXJzaW9uIG51bWJlciBzdHJpbmcgKGluIHRoZSBmb3JtIGAxLjIuM2ApLlxyXG4gKlxyXG4gKiBSZXR1cm5zIGEgYm9vbGVhbiBvciBudWxsIGlmIGFuIGVycm9yIG9jY3VycmVkIHdoaWxlIGNvbXBhcmluZyB0aGUgdmVyc2lvbiBudW1iZXJzLlxyXG4gKlxyXG4gKiBAcGFyYW0gbWV0YWRhdGFcclxuICogQHBhcmFtIHZlcnNpb25cclxuICovXG52YXIgdmVyc2lvbklzQXRMZWFzdCA9IGZ1bmN0aW9uIHZlcnNpb25Jc0F0TGVhc3QobWV0YWRhdGEsIHZlcnNpb24pIHtcbiAgdmFyIGNvbXBhcmlzb24gPSBjb21wYXJlVmVyc2lvbk51bWJlcnMobWV0YWRhdGEuZmRjM1ZlcnNpb24sIHZlcnNpb24pO1xuICByZXR1cm4gY29tcGFyaXNvbiA9PT0gbnVsbCA/IG51bGwgOiBjb21wYXJpc29uID49IDAgPyB0cnVlIDogZmFsc2U7XG59O1xuXG52YXIgQ29udGV4dFR5cGVzO1xuKGZ1bmN0aW9uIChDb250ZXh0VHlwZXMpIHtcbiAgQ29udGV4dFR5cGVzW1wiQ2hhcnRcIl0gPSBcImZkYzMuY2hhcnRcIjtcbiAgQ29udGV4dFR5cGVzW1wiQ2hhdEluaXRTZXR0aW5nc1wiXSA9IFwiZmRjMy5jaGF0LmluaXRTZXR0aW5nc1wiO1xuICBDb250ZXh0VHlwZXNbXCJDb250YWN0XCJdID0gXCJmZGMzLmNvbnRhY3RcIjtcbiAgQ29udGV4dFR5cGVzW1wiQ29udGFjdExpc3RcIl0gPSBcImZkYzMuY29udGFjdExpc3RcIjtcbiAgQ29udGV4dFR5cGVzW1wiQ291bnRyeVwiXSA9IFwiZmRjMy5jb3VudHJ5XCI7XG4gIENvbnRleHRUeXBlc1tcIkN1cnJlbmN5XCJdID0gXCJmZGMzLmN1cnJlbmN5XCI7XG4gIENvbnRleHRUeXBlc1tcIkVtYWlsXCJdID0gXCJmZGMzLmVtYWlsXCI7XG4gIENvbnRleHRUeXBlc1tcIkluc3RydW1lbnRcIl0gPSBcImZkYzMuaW5zdHJ1bWVudFwiO1xuICBDb250ZXh0VHlwZXNbXCJJbnN0cnVtZW50TGlzdFwiXSA9IFwiZmRjMy5pbnN0cnVtZW50TGlzdFwiO1xuICBDb250ZXh0VHlwZXNbXCJPcmdhbml6YXRpb25cIl0gPSBcImZkYzMub3JnYW5pemF0aW9uXCI7XG4gIENvbnRleHRUeXBlc1tcIlBvcnRmb2xpb1wiXSA9IFwiZmRjMy5wb3J0Zm9saW9cIjtcbiAgQ29udGV4dFR5cGVzW1wiUG9zaXRpb25cIl0gPSBcImZkYzMucG9zaXRpb25cIjtcbiAgQ29udGV4dFR5cGVzW1wiTm90aGluZ1wiXSA9IFwiZmRjMy5ub3RoaW5nXCI7XG4gIENvbnRleHRUeXBlc1tcIlRpbWVSYW5nZVwiXSA9IFwiZmRjMy50aW1lcmFuZ2VcIjtcbiAgQ29udGV4dFR5cGVzW1wiVmFsdWF0aW9uXCJdID0gXCJmZGMzLnZhbHVhdGlvblwiO1xufSkoQ29udGV4dFR5cGVzIHx8IChDb250ZXh0VHlwZXMgPSB7fSkpO1xuXG4vLyBUbyBwYXJzZSB0aGlzIGRhdGE6XG4vL1xuLy8gICBpbXBvcnQgeyBDb252ZXJ0LCBDaGFydCwgQ2hhdEluaXRTZXR0aW5ncywgQ29udGFjdCwgQ29udGFjdExpc3QsIENvbnRleHQsIENvdW50cnksIEN1cnJlbmN5LCBFbWFpbCwgSW5zdHJ1bWVudCwgSW5zdHJ1bWVudExpc3QsIE5vdGhpbmcsIE9yZ2FuaXphdGlvbiwgUG9ydGZvbGlvLCBQb3NpdGlvbiwgVGltZVJhbmdlLCBWYWx1YXRpb24gfSBmcm9tIFwiLi9maWxlXCI7XG4vL1xuLy8gICBjb25zdCBjaGFydCA9IENvbnZlcnQudG9DaGFydChqc29uKTtcbi8vICAgY29uc3QgY2hhdEluaXRTZXR0aW5ncyA9IENvbnZlcnQudG9DaGF0SW5pdFNldHRpbmdzKGpzb24pO1xuLy8gICBjb25zdCBjb250YWN0ID0gQ29udmVydC50b0NvbnRhY3QoanNvbik7XG4vLyAgIGNvbnN0IGNvbnRhY3RMaXN0ID0gQ29udmVydC50b0NvbnRhY3RMaXN0KGpzb24pO1xuLy8gICBjb25zdCBjb250ZXh0ID0gQ29udmVydC50b0NvbnRleHQoanNvbik7XG4vLyAgIGNvbnN0IGNvdW50cnkgPSBDb252ZXJ0LnRvQ291bnRyeShqc29uKTtcbi8vICAgY29uc3QgY3VycmVuY3kgPSBDb252ZXJ0LnRvQ3VycmVuY3koanNvbik7XG4vLyAgIGNvbnN0IGVtYWlsID0gQ29udmVydC50b0VtYWlsKGpzb24pO1xuLy8gICBjb25zdCBpbnN0cnVtZW50ID0gQ29udmVydC50b0luc3RydW1lbnQoanNvbik7XG4vLyAgIGNvbnN0IGluc3RydW1lbnRMaXN0ID0gQ29udmVydC50b0luc3RydW1lbnRMaXN0KGpzb24pO1xuLy8gICBjb25zdCBub3RoaW5nID0gQ29udmVydC50b05vdGhpbmcoanNvbik7XG4vLyAgIGNvbnN0IG9yZ2FuaXphdGlvbiA9IENvbnZlcnQudG9Pcmdhbml6YXRpb24oanNvbik7XG4vLyAgIGNvbnN0IHBvcnRmb2xpbyA9IENvbnZlcnQudG9Qb3J0Zm9saW8oanNvbik7XG4vLyAgIGNvbnN0IHBvc2l0aW9uID0gQ29udmVydC50b1Bvc2l0aW9uKGpzb24pO1xuLy8gICBjb25zdCB0aW1lUmFuZ2UgPSBDb252ZXJ0LnRvVGltZVJhbmdlKGpzb24pO1xuLy8gICBjb25zdCB2YWx1YXRpb24gPSBDb252ZXJ0LnRvVmFsdWF0aW9uKGpzb24pO1xuLy9cbi8vIFRoZXNlIGZ1bmN0aW9ucyB3aWxsIHRocm93IGFuIGVycm9yIGlmIHRoZSBKU09OIGRvZXNuJ3Rcbi8vIG1hdGNoIHRoZSBleHBlY3RlZCBpbnRlcmZhY2UsIGV2ZW4gaWYgdGhlIEpTT04gaXMgdmFsaWQuXG52YXIgU3R5bGU7XG4oZnVuY3Rpb24gKFN0eWxlKSB7XG4gIFN0eWxlW1wiQmFyXCJdID0gXCJiYXJcIjtcbiAgU3R5bGVbXCJDYW5kbGVcIl0gPSBcImNhbmRsZVwiO1xuICBTdHlsZVtcIkN1c3RvbVwiXSA9IFwiY3VzdG9tXCI7XG4gIFN0eWxlW1wiSGVhdG1hcFwiXSA9IFwiaGVhdG1hcFwiO1xuICBTdHlsZVtcIkhpc3RvZ3JhbVwiXSA9IFwiaGlzdG9ncmFtXCI7XG4gIFN0eWxlW1wiTGluZVwiXSA9IFwibGluZVwiO1xuICBTdHlsZVtcIk1vdW50YWluXCJdID0gXCJtb3VudGFpblwiO1xuICBTdHlsZVtcIlBpZVwiXSA9IFwicGllXCI7XG4gIFN0eWxlW1wiU2NhdHRlclwiXSA9IFwic2NhdHRlclwiO1xuICBTdHlsZVtcIlN0YWNrZWRCYXJcIl0gPSBcInN0YWNrZWQtYmFyXCI7XG59KShTdHlsZSB8fCAoU3R5bGUgPSB7fSkpO1xuLy8gQ29udmVydHMgSlNPTiBzdHJpbmdzIHRvL2Zyb20geW91ciB0eXBlc1xuLy8gYW5kIGFzc2VydHMgdGhlIHJlc3VsdHMgb2YgSlNPTi5wYXJzZSBhdCBydW50aW1lXG52YXIgQ29udmVydCA9IC8qI19fUFVSRV9fKi9mdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIENvbnZlcnQoKSB7fVxuICBDb252ZXJ0LnRvQ2hhcnQgPSBmdW5jdGlvbiB0b0NoYXJ0KGpzb24pIHtcbiAgICByZXR1cm4gY2FzdChKU09OLnBhcnNlKGpzb24pLCByKCdDaGFydCcpKTtcbiAgfTtcbiAgQ29udmVydC5jaGFydFRvSnNvbiA9IGZ1bmN0aW9uIGNoYXJ0VG9Kc29uKHZhbHVlKSB7XG4gICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHVuY2FzdCh2YWx1ZSwgcignQ2hhcnQnKSksIG51bGwsIDIpO1xuICB9O1xuICBDb252ZXJ0LnRvQ2hhdEluaXRTZXR0aW5ncyA9IGZ1bmN0aW9uIHRvQ2hhdEluaXRTZXR0aW5ncyhqc29uKSB7XG4gICAgcmV0dXJuIGNhc3QoSlNPTi5wYXJzZShqc29uKSwgcignQ2hhdEluaXRTZXR0aW5ncycpKTtcbiAgfTtcbiAgQ29udmVydC5jaGF0SW5pdFNldHRpbmdzVG9Kc29uID0gZnVuY3Rpb24gY2hhdEluaXRTZXR0aW5nc1RvSnNvbih2YWx1ZSkge1xuICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh1bmNhc3QodmFsdWUsIHIoJ0NoYXRJbml0U2V0dGluZ3MnKSksIG51bGwsIDIpO1xuICB9O1xuICBDb252ZXJ0LnRvQ29udGFjdCA9IGZ1bmN0aW9uIHRvQ29udGFjdChqc29uKSB7XG4gICAgcmV0dXJuIGNhc3QoSlNPTi5wYXJzZShqc29uKSwgcignQ29udGFjdCcpKTtcbiAgfTtcbiAgQ29udmVydC5jb250YWN0VG9Kc29uID0gZnVuY3Rpb24gY29udGFjdFRvSnNvbih2YWx1ZSkge1xuICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh1bmNhc3QodmFsdWUsIHIoJ0NvbnRhY3QnKSksIG51bGwsIDIpO1xuICB9O1xuICBDb252ZXJ0LnRvQ29udGFjdExpc3QgPSBmdW5jdGlvbiB0b0NvbnRhY3RMaXN0KGpzb24pIHtcbiAgICByZXR1cm4gY2FzdChKU09OLnBhcnNlKGpzb24pLCByKCdDb250YWN0TGlzdCcpKTtcbiAgfTtcbiAgQ29udmVydC5jb250YWN0TGlzdFRvSnNvbiA9IGZ1bmN0aW9uIGNvbnRhY3RMaXN0VG9Kc29uKHZhbHVlKSB7XG4gICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHVuY2FzdCh2YWx1ZSwgcignQ29udGFjdExpc3QnKSksIG51bGwsIDIpO1xuICB9O1xuICBDb252ZXJ0LnRvQ29udGV4dCA9IGZ1bmN0aW9uIHRvQ29udGV4dChqc29uKSB7XG4gICAgcmV0dXJuIGNhc3QoSlNPTi5wYXJzZShqc29uKSwgcignQ29udGV4dCcpKTtcbiAgfTtcbiAgQ29udmVydC5jb250ZXh0VG9Kc29uID0gZnVuY3Rpb24gY29udGV4dFRvSnNvbih2YWx1ZSkge1xuICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh1bmNhc3QodmFsdWUsIHIoJ0NvbnRleHQnKSksIG51bGwsIDIpO1xuICB9O1xuICBDb252ZXJ0LnRvQ291bnRyeSA9IGZ1bmN0aW9uIHRvQ291bnRyeShqc29uKSB7XG4gICAgcmV0dXJuIGNhc3QoSlNPTi5wYXJzZShqc29uKSwgcignQ291bnRyeScpKTtcbiAgfTtcbiAgQ29udmVydC5jb3VudHJ5VG9Kc29uID0gZnVuY3Rpb24gY291bnRyeVRvSnNvbih2YWx1ZSkge1xuICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh1bmNhc3QodmFsdWUsIHIoJ0NvdW50cnknKSksIG51bGwsIDIpO1xuICB9O1xuICBDb252ZXJ0LnRvQ3VycmVuY3kgPSBmdW5jdGlvbiB0b0N1cnJlbmN5KGpzb24pIHtcbiAgICByZXR1cm4gY2FzdChKU09OLnBhcnNlKGpzb24pLCByKCdDdXJyZW5jeScpKTtcbiAgfTtcbiAgQ29udmVydC5jdXJyZW5jeVRvSnNvbiA9IGZ1bmN0aW9uIGN1cnJlbmN5VG9Kc29uKHZhbHVlKSB7XG4gICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHVuY2FzdCh2YWx1ZSwgcignQ3VycmVuY3knKSksIG51bGwsIDIpO1xuICB9O1xuICBDb252ZXJ0LnRvRW1haWwgPSBmdW5jdGlvbiB0b0VtYWlsKGpzb24pIHtcbiAgICByZXR1cm4gY2FzdChKU09OLnBhcnNlKGpzb24pLCByKCdFbWFpbCcpKTtcbiAgfTtcbiAgQ29udmVydC5lbWFpbFRvSnNvbiA9IGZ1bmN0aW9uIGVtYWlsVG9Kc29uKHZhbHVlKSB7XG4gICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHVuY2FzdCh2YWx1ZSwgcignRW1haWwnKSksIG51bGwsIDIpO1xuICB9O1xuICBDb252ZXJ0LnRvSW5zdHJ1bWVudCA9IGZ1bmN0aW9uIHRvSW5zdHJ1bWVudChqc29uKSB7XG4gICAgcmV0dXJuIGNhc3QoSlNPTi5wYXJzZShqc29uKSwgcignSW5zdHJ1bWVudCcpKTtcbiAgfTtcbiAgQ29udmVydC5pbnN0cnVtZW50VG9Kc29uID0gZnVuY3Rpb24gaW5zdHJ1bWVudFRvSnNvbih2YWx1ZSkge1xuICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh1bmNhc3QodmFsdWUsIHIoJ0luc3RydW1lbnQnKSksIG51bGwsIDIpO1xuICB9O1xuICBDb252ZXJ0LnRvSW5zdHJ1bWVudExpc3QgPSBmdW5jdGlvbiB0b0luc3RydW1lbnRMaXN0KGpzb24pIHtcbiAgICByZXR1cm4gY2FzdChKU09OLnBhcnNlKGpzb24pLCByKCdJbnN0cnVtZW50TGlzdCcpKTtcbiAgfTtcbiAgQ29udmVydC5pbnN0cnVtZW50TGlzdFRvSnNvbiA9IGZ1bmN0aW9uIGluc3RydW1lbnRMaXN0VG9Kc29uKHZhbHVlKSB7XG4gICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHVuY2FzdCh2YWx1ZSwgcignSW5zdHJ1bWVudExpc3QnKSksIG51bGwsIDIpO1xuICB9O1xuICBDb252ZXJ0LnRvTm90aGluZyA9IGZ1bmN0aW9uIHRvTm90aGluZyhqc29uKSB7XG4gICAgcmV0dXJuIGNhc3QoSlNPTi5wYXJzZShqc29uKSwgcignTm90aGluZycpKTtcbiAgfTtcbiAgQ29udmVydC5ub3RoaW5nVG9Kc29uID0gZnVuY3Rpb24gbm90aGluZ1RvSnNvbih2YWx1ZSkge1xuICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh1bmNhc3QodmFsdWUsIHIoJ05vdGhpbmcnKSksIG51bGwsIDIpO1xuICB9O1xuICBDb252ZXJ0LnRvT3JnYW5pemF0aW9uID0gZnVuY3Rpb24gdG9Pcmdhbml6YXRpb24oanNvbikge1xuICAgIHJldHVybiBjYXN0KEpTT04ucGFyc2UoanNvbiksIHIoJ09yZ2FuaXphdGlvbicpKTtcbiAgfTtcbiAgQ29udmVydC5vcmdhbml6YXRpb25Ub0pzb24gPSBmdW5jdGlvbiBvcmdhbml6YXRpb25Ub0pzb24odmFsdWUpIHtcbiAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodW5jYXN0KHZhbHVlLCByKCdPcmdhbml6YXRpb24nKSksIG51bGwsIDIpO1xuICB9O1xuICBDb252ZXJ0LnRvUG9ydGZvbGlvID0gZnVuY3Rpb24gdG9Qb3J0Zm9saW8oanNvbikge1xuICAgIHJldHVybiBjYXN0KEpTT04ucGFyc2UoanNvbiksIHIoJ1BvcnRmb2xpbycpKTtcbiAgfTtcbiAgQ29udmVydC5wb3J0Zm9saW9Ub0pzb24gPSBmdW5jdGlvbiBwb3J0Zm9saW9Ub0pzb24odmFsdWUpIHtcbiAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodW5jYXN0KHZhbHVlLCByKCdQb3J0Zm9saW8nKSksIG51bGwsIDIpO1xuICB9O1xuICBDb252ZXJ0LnRvUG9zaXRpb24gPSBmdW5jdGlvbiB0b1Bvc2l0aW9uKGpzb24pIHtcbiAgICByZXR1cm4gY2FzdChKU09OLnBhcnNlKGpzb24pLCByKCdQb3NpdGlvbicpKTtcbiAgfTtcbiAgQ29udmVydC5wb3NpdGlvblRvSnNvbiA9IGZ1bmN0aW9uIHBvc2l0aW9uVG9Kc29uKHZhbHVlKSB7XG4gICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHVuY2FzdCh2YWx1ZSwgcignUG9zaXRpb24nKSksIG51bGwsIDIpO1xuICB9O1xuICBDb252ZXJ0LnRvVGltZVJhbmdlID0gZnVuY3Rpb24gdG9UaW1lUmFuZ2UoanNvbikge1xuICAgIHJldHVybiBjYXN0KEpTT04ucGFyc2UoanNvbiksIHIoJ1RpbWVSYW5nZScpKTtcbiAgfTtcbiAgQ29udmVydC50aW1lUmFuZ2VUb0pzb24gPSBmdW5jdGlvbiB0aW1lUmFuZ2VUb0pzb24odmFsdWUpIHtcbiAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodW5jYXN0KHZhbHVlLCByKCdUaW1lUmFuZ2UnKSksIG51bGwsIDIpO1xuICB9O1xuICBDb252ZXJ0LnRvVmFsdWF0aW9uID0gZnVuY3Rpb24gdG9WYWx1YXRpb24oanNvbikge1xuICAgIHJldHVybiBjYXN0KEpTT04ucGFyc2UoanNvbiksIHIoJ1ZhbHVhdGlvbicpKTtcbiAgfTtcbiAgQ29udmVydC52YWx1YXRpb25Ub0pzb24gPSBmdW5jdGlvbiB2YWx1YXRpb25Ub0pzb24odmFsdWUpIHtcbiAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodW5jYXN0KHZhbHVlLCByKCdWYWx1YXRpb24nKSksIG51bGwsIDIpO1xuICB9O1xuICByZXR1cm4gQ29udmVydDtcbn0oKTtcbmZ1bmN0aW9uIGludmFsaWRWYWx1ZSh0eXAsIHZhbCwga2V5LCBwYXJlbnQpIHtcbiAgaWYgKHBhcmVudCA9PT0gdm9pZCAwKSB7XG4gICAgcGFyZW50ID0gJyc7XG4gIH1cbiAgdmFyIHByZXR0eVR5cCA9IHByZXR0eVR5cGVOYW1lKHR5cCk7XG4gIHZhciBwYXJlbnRUZXh0ID0gcGFyZW50ID8gXCIgb24gXCIgKyBwYXJlbnQgOiAnJztcbiAgdmFyIGtleVRleHQgPSBrZXkgPyBcIiBmb3Iga2V5IFxcXCJcIiArIGtleSArIFwiXFxcIlwiIDogJyc7XG4gIHRocm93IEVycm9yKFwiSW52YWxpZCB2YWx1ZVwiICsga2V5VGV4dCArIHBhcmVudFRleHQgKyBcIi4gRXhwZWN0ZWQgXCIgKyBwcmV0dHlUeXAgKyBcIiBidXQgZ290IFwiICsgSlNPTi5zdHJpbmdpZnkodmFsKSk7XG59XG5mdW5jdGlvbiBwcmV0dHlUeXBlTmFtZSh0eXApIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkodHlwKSkge1xuICAgIGlmICh0eXAubGVuZ3RoID09PSAyICYmIHR5cFswXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gXCJhbiBvcHRpb25hbCBcIiArIHByZXR0eVR5cGVOYW1lKHR5cFsxXSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBcIm9uZSBvZiBbXCIgKyB0eXAubWFwKGZ1bmN0aW9uIChhKSB7XG4gICAgICAgIHJldHVybiBwcmV0dHlUeXBlTmFtZShhKTtcbiAgICAgIH0pLmpvaW4oJywgJykgKyBcIl1cIjtcbiAgICB9XG4gIH0gZWxzZSBpZiAodHlwZW9mIHR5cCA9PT0gJ29iamVjdCcgJiYgdHlwLmxpdGVyYWwgIT09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiB0eXAubGl0ZXJhbDtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gdHlwZW9mIHR5cDtcbiAgfVxufVxuZnVuY3Rpb24ganNvblRvSlNQcm9wcyh0eXApIHtcbiAgaWYgKHR5cC5qc29uVG9KUyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgdmFyIG1hcCA9IHt9O1xuICAgIHR5cC5wcm9wcy5mb3JFYWNoKGZ1bmN0aW9uIChwKSB7XG4gICAgICByZXR1cm4gbWFwW3AuanNvbl0gPSB7XG4gICAgICAgIGtleTogcC5qcyxcbiAgICAgICAgdHlwOiBwLnR5cFxuICAgICAgfTtcbiAgICB9KTtcbiAgICB0eXAuanNvblRvSlMgPSBtYXA7XG4gIH1cbiAgcmV0dXJuIHR5cC5qc29uVG9KUztcbn1cbmZ1bmN0aW9uIGpzVG9KU09OUHJvcHModHlwKSB7XG4gIGlmICh0eXAuanNUb0pTT04gPT09IHVuZGVmaW5lZCkge1xuICAgIHZhciBtYXAgPSB7fTtcbiAgICB0eXAucHJvcHMuZm9yRWFjaChmdW5jdGlvbiAocCkge1xuICAgICAgcmV0dXJuIG1hcFtwLmpzXSA9IHtcbiAgICAgICAga2V5OiBwLmpzb24sXG4gICAgICAgIHR5cDogcC50eXBcbiAgICAgIH07XG4gICAgfSk7XG4gICAgdHlwLmpzVG9KU09OID0gbWFwO1xuICB9XG4gIHJldHVybiB0eXAuanNUb0pTT047XG59XG5mdW5jdGlvbiB0cmFuc2Zvcm0odmFsLCB0eXAsIGdldFByb3BzLCBrZXksIHBhcmVudCkge1xuICBpZiAoa2V5ID09PSB2b2lkIDApIHtcbiAgICBrZXkgPSAnJztcbiAgfVxuICBpZiAocGFyZW50ID09PSB2b2lkIDApIHtcbiAgICBwYXJlbnQgPSAnJztcbiAgfVxuICBmdW5jdGlvbiB0cmFuc2Zvcm1QcmltaXRpdmUodHlwLCB2YWwpIHtcbiAgICBpZiAodHlwZW9mIHR5cCA9PT0gdHlwZW9mIHZhbCkgcmV0dXJuIHZhbDtcbiAgICByZXR1cm4gaW52YWxpZFZhbHVlKHR5cCwgdmFsLCBrZXksIHBhcmVudCk7XG4gIH1cbiAgZnVuY3Rpb24gdHJhbnNmb3JtVW5pb24odHlwcywgdmFsKSB7XG4gICAgLy8gdmFsIG11c3QgdmFsaWRhdGUgYWdhaW5zdCBvbmUgdHlwIGluIHR5cHNcbiAgICB2YXIgbCA9IHR5cHMubGVuZ3RoO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbDsgaSsrKSB7XG4gICAgICB2YXIgX3R5cCA9IHR5cHNbaV07XG4gICAgICB0cnkge1xuICAgICAgICByZXR1cm4gdHJhbnNmb3JtKHZhbCwgX3R5cCwgZ2V0UHJvcHMpO1xuICAgICAgfSBjYXRjaCAoXykge31cbiAgICB9XG4gICAgcmV0dXJuIGludmFsaWRWYWx1ZSh0eXBzLCB2YWwsIGtleSwgcGFyZW50KTtcbiAgfVxuICBmdW5jdGlvbiB0cmFuc2Zvcm1FbnVtKGNhc2VzLCB2YWwpIHtcbiAgICBpZiAoY2FzZXMuaW5kZXhPZih2YWwpICE9PSAtMSkgcmV0dXJuIHZhbDtcbiAgICByZXR1cm4gaW52YWxpZFZhbHVlKGNhc2VzLm1hcChmdW5jdGlvbiAoYSkge1xuICAgICAgcmV0dXJuIGwoYSk7XG4gICAgfSksIHZhbCwga2V5LCBwYXJlbnQpO1xuICB9XG4gIGZ1bmN0aW9uIHRyYW5zZm9ybUFycmF5KHR5cCwgdmFsKSB7XG4gICAgLy8gdmFsIG11c3QgYmUgYW4gYXJyYXkgd2l0aCBubyBpbnZhbGlkIGVsZW1lbnRzXG4gICAgaWYgKCFBcnJheS5pc0FycmF5KHZhbCkpIHJldHVybiBpbnZhbGlkVmFsdWUobCgnYXJyYXknKSwgdmFsLCBrZXksIHBhcmVudCk7XG4gICAgcmV0dXJuIHZhbC5tYXAoZnVuY3Rpb24gKGVsKSB7XG4gICAgICByZXR1cm4gdHJhbnNmb3JtKGVsLCB0eXAsIGdldFByb3BzKTtcbiAgICB9KTtcbiAgfVxuICBmdW5jdGlvbiB0cmFuc2Zvcm1EYXRlKHZhbCkge1xuICAgIGlmICh2YWwgPT09IG51bGwpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICB2YXIgZCA9IG5ldyBEYXRlKHZhbCk7XG4gICAgaWYgKGlzTmFOKGQudmFsdWVPZigpKSkge1xuICAgICAgcmV0dXJuIGludmFsaWRWYWx1ZShsKCdEYXRlJyksIHZhbCwga2V5LCBwYXJlbnQpO1xuICAgIH1cbiAgICByZXR1cm4gZDtcbiAgfVxuICBmdW5jdGlvbiB0cmFuc2Zvcm1PYmplY3QocHJvcHMsIGFkZGl0aW9uYWwsIHZhbCkge1xuICAgIGlmICh2YWwgPT09IG51bGwgfHwgdHlwZW9mIHZhbCAhPT0gJ29iamVjdCcgfHwgQXJyYXkuaXNBcnJheSh2YWwpKSB7XG4gICAgICByZXR1cm4gaW52YWxpZFZhbHVlKGwocmVmIHx8ICdvYmplY3QnKSwgdmFsLCBrZXksIHBhcmVudCk7XG4gICAgfVxuICAgIHZhciByZXN1bHQgPSB7fTtcbiAgICBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhwcm9wcykuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICB2YXIgcHJvcCA9IHByb3BzW2tleV07XG4gICAgICB2YXIgdiA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbCh2YWwsIGtleSkgPyB2YWxba2V5XSA6IHVuZGVmaW5lZDtcbiAgICAgIHJlc3VsdFtwcm9wLmtleV0gPSB0cmFuc2Zvcm0odiwgcHJvcC50eXAsIGdldFByb3BzLCBrZXksIHJlZik7XG4gICAgfSk7XG4gICAgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModmFsKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgIGlmICghT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHByb3BzLCBrZXkpKSB7XG4gICAgICAgIHJlc3VsdFtrZXldID0gdHJhbnNmb3JtKHZhbFtrZXldLCBhZGRpdGlvbmFsLCBnZXRQcm9wcywga2V5LCByZWYpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbiAgaWYgKHR5cCA9PT0gJ2FueScpIHJldHVybiB2YWw7XG4gIGlmICh0eXAgPT09IG51bGwpIHtcbiAgICBpZiAodmFsID09PSBudWxsKSByZXR1cm4gdmFsO1xuICAgIHJldHVybiBpbnZhbGlkVmFsdWUodHlwLCB2YWwsIGtleSwgcGFyZW50KTtcbiAgfVxuICBpZiAodHlwID09PSBmYWxzZSkgcmV0dXJuIGludmFsaWRWYWx1ZSh0eXAsIHZhbCwga2V5LCBwYXJlbnQpO1xuICB2YXIgcmVmID0gdW5kZWZpbmVkO1xuICB3aGlsZSAodHlwZW9mIHR5cCA9PT0gJ29iamVjdCcgJiYgdHlwLnJlZiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgcmVmID0gdHlwLnJlZjtcbiAgICB0eXAgPSB0eXBlTWFwW3R5cC5yZWZdO1xuICB9XG4gIGlmIChBcnJheS5pc0FycmF5KHR5cCkpIHJldHVybiB0cmFuc2Zvcm1FbnVtKHR5cCwgdmFsKTtcbiAgaWYgKHR5cGVvZiB0eXAgPT09ICdvYmplY3QnKSB7XG4gICAgcmV0dXJuIHR5cC5oYXNPd25Qcm9wZXJ0eSgndW5pb25NZW1iZXJzJykgPyB0cmFuc2Zvcm1Vbmlvbih0eXAudW5pb25NZW1iZXJzLCB2YWwpIDogdHlwLmhhc093blByb3BlcnR5KCdhcnJheUl0ZW1zJykgPyB0cmFuc2Zvcm1BcnJheSh0eXAuYXJyYXlJdGVtcywgdmFsKSA6IHR5cC5oYXNPd25Qcm9wZXJ0eSgncHJvcHMnKSA/IHRyYW5zZm9ybU9iamVjdChnZXRQcm9wcyh0eXApLCB0eXAuYWRkaXRpb25hbCwgdmFsKSA6IGludmFsaWRWYWx1ZSh0eXAsIHZhbCwga2V5LCBwYXJlbnQpO1xuICB9XG4gIC8vIE51bWJlcnMgY2FuIGJlIHBhcnNlZCBieSBEYXRlIGJ1dCBzaG91bGRuJ3QgYmUuXG4gIGlmICh0eXAgPT09IERhdGUgJiYgdHlwZW9mIHZhbCAhPT0gJ251bWJlcicpIHJldHVybiB0cmFuc2Zvcm1EYXRlKHZhbCk7XG4gIHJldHVybiB0cmFuc2Zvcm1QcmltaXRpdmUodHlwLCB2YWwpO1xufVxuZnVuY3Rpb24gY2FzdCh2YWwsIHR5cCkge1xuICByZXR1cm4gdHJhbnNmb3JtKHZhbCwgdHlwLCBqc29uVG9KU1Byb3BzKTtcbn1cbmZ1bmN0aW9uIHVuY2FzdCh2YWwsIHR5cCkge1xuICByZXR1cm4gdHJhbnNmb3JtKHZhbCwgdHlwLCBqc1RvSlNPTlByb3BzKTtcbn1cbmZ1bmN0aW9uIGwodHlwKSB7XG4gIHJldHVybiB7XG4gICAgbGl0ZXJhbDogdHlwXG4gIH07XG59XG5mdW5jdGlvbiBhKHR5cCkge1xuICByZXR1cm4ge1xuICAgIGFycmF5SXRlbXM6IHR5cFxuICB9O1xufVxuZnVuY3Rpb24gdSgpIHtcbiAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIHR5cHMgPSBuZXcgQXJyYXkoX2xlbiksIF9rZXkgPSAwOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgdHlwc1tfa2V5XSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgfVxuICByZXR1cm4ge1xuICAgIHVuaW9uTWVtYmVyczogdHlwc1xuICB9O1xufVxuZnVuY3Rpb24gbyhwcm9wcywgYWRkaXRpb25hbCkge1xuICByZXR1cm4ge1xuICAgIHByb3BzOiBwcm9wcyxcbiAgICBhZGRpdGlvbmFsOiBhZGRpdGlvbmFsXG4gIH07XG59XG5mdW5jdGlvbiBtKGFkZGl0aW9uYWwpIHtcbiAgcmV0dXJuIHtcbiAgICBwcm9wczogW10sXG4gICAgYWRkaXRpb25hbDogYWRkaXRpb25hbFxuICB9O1xufVxuZnVuY3Rpb24gcihuYW1lKSB7XG4gIHJldHVybiB7XG4gICAgcmVmOiBuYW1lXG4gIH07XG59XG52YXIgdHlwZU1hcCA9IHtcbiAgQ2hhcnQ6IC8qI19fUFVSRV9fKi9vKFt7XG4gICAganNvbjogJ2luc3RydW1lbnRzJyxcbiAgICBqczogJ2luc3RydW1lbnRzJyxcbiAgICB0eXA6IC8qI19fUFVSRV9fKi9hKCAvKiNfX1BVUkVfXyovcignSW5zdHJ1bWVudEVsZW1lbnQnKSlcbiAgfSwge1xuICAgIGpzb246ICdvdGhlckNvbmZpZycsXG4gICAganM6ICdvdGhlckNvbmZpZycsXG4gICAgdHlwOiAvKiNfX1BVUkVfXyovdSh1bmRlZmluZWQsIC8qI19fUFVSRV9fKi9tKCdhbnknKSlcbiAgfSwge1xuICAgIGpzb246ICdyYW5nZScsXG4gICAganM6ICdyYW5nZScsXG4gICAgdHlwOiAvKiNfX1BVUkVfXyovdSh1bmRlZmluZWQsIC8qI19fUFVSRV9fKi9yKCdUaW1lUmFuZ2VPYmplY3QnKSlcbiAgfSwge1xuICAgIGpzb246ICdzdHlsZScsXG4gICAganM6ICdzdHlsZScsXG4gICAgdHlwOiAvKiNfX1BVUkVfXyovdSh1bmRlZmluZWQsIC8qI19fUFVSRV9fKi9yKCdTdHlsZScpKVxuICB9LCB7XG4gICAganNvbjogJ3R5cGUnLFxuICAgIGpzOiAndHlwZScsXG4gICAgdHlwOiAnJ1xuICB9LCB7XG4gICAganNvbjogJ2lkJyxcbiAgICBqczogJ2lkJyxcbiAgICB0eXA6IC8qI19fUFVSRV9fKi91KHVuZGVmaW5lZCwgLyojX19QVVJFX18qL20oJ2FueScpKVxuICB9LCB7XG4gICAganNvbjogJ25hbWUnLFxuICAgIGpzOiAnbmFtZScsXG4gICAgdHlwOiAvKiNfX1BVUkVfXyovdSh1bmRlZmluZWQsICcnKVxuICB9XSwgJ2FueScpLFxuICBJbnN0cnVtZW50RWxlbWVudDogLyojX19QVVJFX18qL28oW3tcbiAgICBqc29uOiAnaWQnLFxuICAgIGpzOiAnaWQnLFxuICAgIHR5cDogLyojX19QVVJFX18qL3IoJ1B1cnBsZUlEJylcbiAgfSwge1xuICAgIGpzb246ICdtYXJrZXQnLFxuICAgIGpzOiAnbWFya2V0JyxcbiAgICB0eXA6IC8qI19fUFVSRV9fKi91KHVuZGVmaW5lZCwgLyojX19QVVJFX18qL3IoJ1B1cnBsZU1hcmtldCcpKVxuICB9LCB7XG4gICAganNvbjogJ3R5cGUnLFxuICAgIGpzOiAndHlwZScsXG4gICAgdHlwOiAnJ1xuICB9LCB7XG4gICAganNvbjogJ25hbWUnLFxuICAgIGpzOiAnbmFtZScsXG4gICAgdHlwOiAvKiNfX1BVUkVfXyovdSh1bmRlZmluZWQsICcnKVxuICB9XSwgJ2FueScpLFxuICBQdXJwbGVJRDogLyojX19QVVJFX18qL28oW3tcbiAgICBqc29uOiAnQkJHJyxcbiAgICBqczogJ0JCRycsXG4gICAgdHlwOiAvKiNfX1BVUkVfXyovdSh1bmRlZmluZWQsICcnKVxuICB9LCB7XG4gICAganNvbjogJ0NVU0lQJyxcbiAgICBqczogJ0NVU0lQJyxcbiAgICB0eXA6IC8qI19fUFVSRV9fKi91KHVuZGVmaW5lZCwgJycpXG4gIH0sIHtcbiAgICBqc29uOiAnRkRTX0lEJyxcbiAgICBqczogJ0ZEU19JRCcsXG4gICAgdHlwOiAvKiNfX1BVUkVfXyovdSh1bmRlZmluZWQsICcnKVxuICB9LCB7XG4gICAganNvbjogJ0ZJR0knLFxuICAgIGpzOiAnRklHSScsXG4gICAgdHlwOiAvKiNfX1BVUkVfXyovdSh1bmRlZmluZWQsICcnKVxuICB9LCB7XG4gICAganNvbjogJ0lTSU4nLFxuICAgIGpzOiAnSVNJTicsXG4gICAgdHlwOiAvKiNfX1BVUkVfXyovdSh1bmRlZmluZWQsICcnKVxuICB9LCB7XG4gICAganNvbjogJ1BFUk1JRCcsXG4gICAganM6ICdQRVJNSUQnLFxuICAgIHR5cDogLyojX19QVVJFX18qL3UodW5kZWZpbmVkLCAnJylcbiAgfSwge1xuICAgIGpzb246ICdSSUMnLFxuICAgIGpzOiAnUklDJyxcbiAgICB0eXA6IC8qI19fUFVSRV9fKi91KHVuZGVmaW5lZCwgJycpXG4gIH0sIHtcbiAgICBqc29uOiAnU0VET0wnLFxuICAgIGpzOiAnU0VET0wnLFxuICAgIHR5cDogLyojX19QVVJFX18qL3UodW5kZWZpbmVkLCAnJylcbiAgfSwge1xuICAgIGpzb246ICd0aWNrZXInLFxuICAgIGpzOiAndGlja2VyJyxcbiAgICB0eXA6IC8qI19fUFVSRV9fKi91KHVuZGVmaW5lZCwgJycpXG4gIH1dLCAnYW55JyksXG4gIFB1cnBsZU1hcmtldDogLyojX19QVVJFX18qL28oW3tcbiAgICBqc29uOiAnQkJHJyxcbiAgICBqczogJ0JCRycsXG4gICAgdHlwOiAvKiNfX1BVUkVfXyovdSh1bmRlZmluZWQsICcnKVxuICB9LCB7XG4gICAganNvbjogJ0NPVU5UUllfSVNPQUxQSEEyJyxcbiAgICBqczogJ0NPVU5UUllfSVNPQUxQSEEyJyxcbiAgICB0eXA6IC8qI19fUFVSRV9fKi91KHVuZGVmaW5lZCwgJycpXG4gIH0sIHtcbiAgICBqc29uOiAnTUlDJyxcbiAgICBqczogJ01JQycsXG4gICAgdHlwOiAvKiNfX1BVUkVfXyovdSh1bmRlZmluZWQsICcnKVxuICB9LCB7XG4gICAganNvbjogJ25hbWUnLFxuICAgIGpzOiAnbmFtZScsXG4gICAgdHlwOiAvKiNfX1BVUkVfXyovdSh1bmRlZmluZWQsICcnKVxuICB9XSwgJ2FueScpLFxuICBUaW1lUmFuZ2VPYmplY3Q6IC8qI19fUFVSRV9fKi9vKFt7XG4gICAganNvbjogJ2VuZFRpbWUnLFxuICAgIGpzOiAnZW5kVGltZScsXG4gICAgdHlwOiAvKiNfX1BVUkVfXyovdSh1bmRlZmluZWQsIERhdGUpXG4gIH0sIHtcbiAgICBqc29uOiAnc3RhcnRUaW1lJyxcbiAgICBqczogJ3N0YXJ0VGltZScsXG4gICAgdHlwOiAvKiNfX1BVUkVfXyovdSh1bmRlZmluZWQsIERhdGUpXG4gIH0sIHtcbiAgICBqc29uOiAndHlwZScsXG4gICAganM6ICd0eXBlJyxcbiAgICB0eXA6ICcnXG4gIH0sIHtcbiAgICBqc29uOiAnaWQnLFxuICAgIGpzOiAnaWQnLFxuICAgIHR5cDogLyojX19QVVJFX18qL3UodW5kZWZpbmVkLCAvKiNfX1BVUkVfXyovbSgnYW55JykpXG4gIH0sIHtcbiAgICBqc29uOiAnbmFtZScsXG4gICAganM6ICduYW1lJyxcbiAgICB0eXA6IC8qI19fUFVSRV9fKi91KHVuZGVmaW5lZCwgJycpXG4gIH1dLCAnYW55JyksXG4gIENoYXRJbml0U2V0dGluZ3M6IC8qI19fUFVSRV9fKi9vKFt7XG4gICAganNvbjogJ2NoYXROYW1lJyxcbiAgICBqczogJ2NoYXROYW1lJyxcbiAgICB0eXA6IC8qI19fUFVSRV9fKi91KHVuZGVmaW5lZCwgJycpXG4gIH0sIHtcbiAgICBqc29uOiAnaW5pdE1lc3NhZ2UnLFxuICAgIGpzOiAnaW5pdE1lc3NhZ2UnLFxuICAgIHR5cDogLyojX19QVVJFX18qL3UodW5kZWZpbmVkLCAnJylcbiAgfSwge1xuICAgIGpzb246ICdtZW1iZXJzJyxcbiAgICBqczogJ21lbWJlcnMnLFxuICAgIHR5cDogLyojX19QVVJFX18qL3UodW5kZWZpbmVkLCAvKiNfX1BVUkVfXyovcignQ29udGFjdExpc3RPYmplY3QnKSlcbiAgfSwge1xuICAgIGpzb246ICdvcHRpb25zJyxcbiAgICBqczogJ29wdGlvbnMnLFxuICAgIHR5cDogLyojX19QVVJFX18qL3UodW5kZWZpbmVkLCAnYW55JylcbiAgfSwge1xuICAgIGpzb246ICd0eXBlJyxcbiAgICBqczogJ3R5cGUnLFxuICAgIHR5cDogJ2FueSdcbiAgfV0sICdhbnknKSxcbiAgQ29udGFjdExpc3RPYmplY3Q6IC8qI19fUFVSRV9fKi9vKFt7XG4gICAganNvbjogJ2NvbnRhY3RzJyxcbiAgICBqczogJ2NvbnRhY3RzJyxcbiAgICB0eXA6IC8qI19fUFVSRV9fKi9hKCAvKiNfX1BVUkVfXyovcignQ29udGFjdEVsZW1lbnQnKSlcbiAgfSwge1xuICAgIGpzb246ICd0eXBlJyxcbiAgICBqczogJ3R5cGUnLFxuICAgIHR5cDogJydcbiAgfSwge1xuICAgIGpzb246ICdpZCcsXG4gICAganM6ICdpZCcsXG4gICAgdHlwOiAvKiNfX1BVUkVfXyovdSh1bmRlZmluZWQsIC8qI19fUFVSRV9fKi9tKCdhbnknKSlcbiAgfSwge1xuICAgIGpzb246ICduYW1lJyxcbiAgICBqczogJ25hbWUnLFxuICAgIHR5cDogLyojX19QVVJFX18qL3UodW5kZWZpbmVkLCAnJylcbiAgfV0sICdhbnknKSxcbiAgQ29udGFjdEVsZW1lbnQ6IC8qI19fUFVSRV9fKi9vKFt7XG4gICAganNvbjogJ2lkJyxcbiAgICBqczogJ2lkJyxcbiAgICB0eXA6IC8qI19fUFVSRV9fKi9yKCdGbHVmZnlJRCcpXG4gIH0sIHtcbiAgICBqc29uOiAndHlwZScsXG4gICAganM6ICd0eXBlJyxcbiAgICB0eXA6ICcnXG4gIH0sIHtcbiAgICBqc29uOiAnbmFtZScsXG4gICAganM6ICduYW1lJyxcbiAgICB0eXA6IC8qI19fUFVSRV9fKi91KHVuZGVmaW5lZCwgJycpXG4gIH1dLCAnYW55JyksXG4gIEZsdWZmeUlEOiAvKiNfX1BVUkVfXyovbyhbe1xuICAgIGpzb246ICdlbWFpbCcsXG4gICAganM6ICdlbWFpbCcsXG4gICAgdHlwOiAvKiNfX1BVUkVfXyovdSh1bmRlZmluZWQsICcnKVxuICB9LCB7XG4gICAganNvbjogJ0ZEU19JRCcsXG4gICAganM6ICdGRFNfSUQnLFxuICAgIHR5cDogLyojX19QVVJFX18qL3UodW5kZWZpbmVkLCAnJylcbiAgfV0sICdhbnknKSxcbiAgQ29udGFjdDogLyojX19QVVJFX18qL28oW3tcbiAgICBqc29uOiAnaWQnLFxuICAgIGpzOiAnaWQnLFxuICAgIHR5cDogLyojX19QVVJFX18qL3IoJ1RlbnRhY2xlZElEJylcbiAgfSwge1xuICAgIGpzb246ICd0eXBlJyxcbiAgICBqczogJ3R5cGUnLFxuICAgIHR5cDogJydcbiAgfSwge1xuICAgIGpzb246ICduYW1lJyxcbiAgICBqczogJ25hbWUnLFxuICAgIHR5cDogLyojX19QVVJFX18qL3UodW5kZWZpbmVkLCAnJylcbiAgfV0sICdhbnknKSxcbiAgVGVudGFjbGVkSUQ6IC8qI19fUFVSRV9fKi9vKFt7XG4gICAganNvbjogJ2VtYWlsJyxcbiAgICBqczogJ2VtYWlsJyxcbiAgICB0eXA6IC8qI19fUFVSRV9fKi91KHVuZGVmaW5lZCwgJycpXG4gIH0sIHtcbiAgICBqc29uOiAnRkRTX0lEJyxcbiAgICBqczogJ0ZEU19JRCcsXG4gICAgdHlwOiAvKiNfX1BVUkVfXyovdSh1bmRlZmluZWQsICcnKVxuICB9XSwgJ2FueScpLFxuICBDb250YWN0TGlzdDogLyojX19QVVJFX18qL28oW3tcbiAgICBqc29uOiAnY29udGFjdHMnLFxuICAgIGpzOiAnY29udGFjdHMnLFxuICAgIHR5cDogLyojX19QVVJFX18qL2EoIC8qI19fUFVSRV9fKi9yKCdDb250YWN0RWxlbWVudCcpKVxuICB9LCB7XG4gICAganNvbjogJ3R5cGUnLFxuICAgIGpzOiAndHlwZScsXG4gICAgdHlwOiAnJ1xuICB9LCB7XG4gICAganNvbjogJ2lkJyxcbiAgICBqczogJ2lkJyxcbiAgICB0eXA6IC8qI19fUFVSRV9fKi91KHVuZGVmaW5lZCwgLyojX19QVVJFX18qL20oJ2FueScpKVxuICB9LCB7XG4gICAganNvbjogJ25hbWUnLFxuICAgIGpzOiAnbmFtZScsXG4gICAgdHlwOiAvKiNfX1BVUkVfXyovdSh1bmRlZmluZWQsICcnKVxuICB9XSwgJ2FueScpLFxuICBDb250ZXh0OiAvKiNfX1BVUkVfXyovbyhbe1xuICAgIGpzb246ICdpZCcsXG4gICAganM6ICdpZCcsXG4gICAgdHlwOiAvKiNfX1BVUkVfXyovdSh1bmRlZmluZWQsIC8qI19fUFVSRV9fKi9tKCdhbnknKSlcbiAgfSwge1xuICAgIGpzb246ICduYW1lJyxcbiAgICBqczogJ25hbWUnLFxuICAgIHR5cDogLyojX19QVVJFX18qL3UodW5kZWZpbmVkLCAnJylcbiAgfSwge1xuICAgIGpzb246ICd0eXBlJyxcbiAgICBqczogJ3R5cGUnLFxuICAgIHR5cDogJydcbiAgfV0sICdhbnknKSxcbiAgQ291bnRyeTogLyojX19QVVJFX18qL28oW3tcbiAgICBqc29uOiAnaWQnLFxuICAgIGpzOiAnaWQnLFxuICAgIHR5cDogLyojX19QVVJFX18qL3IoJ0NvdW50cnlJRCcpXG4gIH0sIHtcbiAgICBqc29uOiAndHlwZScsXG4gICAganM6ICd0eXBlJyxcbiAgICB0eXA6ICcnXG4gIH0sIHtcbiAgICBqc29uOiAnbmFtZScsXG4gICAganM6ICduYW1lJyxcbiAgICB0eXA6IC8qI19fUFVSRV9fKi91KHVuZGVmaW5lZCwgJycpXG4gIH1dLCAnYW55JyksXG4gIENvdW50cnlJRDogLyojX19QVVJFX18qL28oW3tcbiAgICBqc29uOiAnQ09VTlRSWV9JU09BTFBIQTInLFxuICAgIGpzOiAnQ09VTlRSWV9JU09BTFBIQTInLFxuICAgIHR5cDogLyojX19QVVJFX18qL3UodW5kZWZpbmVkLCAnJylcbiAgfSwge1xuICAgIGpzb246ICdDT1VOVFJZX0lTT0FMUEhBMycsXG4gICAganM6ICdDT1VOVFJZX0lTT0FMUEhBMycsXG4gICAgdHlwOiAvKiNfX1BVUkVfXyovdSh1bmRlZmluZWQsICcnKVxuICB9LCB7XG4gICAganNvbjogJ0lTT0FMUEhBMicsXG4gICAganM6ICdJU09BTFBIQTInLFxuICAgIHR5cDogLyojX19QVVJFX18qL3UodW5kZWZpbmVkLCAnJylcbiAgfSwge1xuICAgIGpzb246ICdJU09BTFBIQTMnLFxuICAgIGpzOiAnSVNPQUxQSEEzJyxcbiAgICB0eXA6IC8qI19fUFVSRV9fKi91KHVuZGVmaW5lZCwgJycpXG4gIH1dLCAnYW55JyksXG4gIEN1cnJlbmN5OiAvKiNfX1BVUkVfXyovbyhbe1xuICAgIGpzb246ICdpZCcsXG4gICAganM6ICdpZCcsXG4gICAgdHlwOiAvKiNfX1BVUkVfXyovcignQ3VycmVuY3lJRCcpXG4gIH0sIHtcbiAgICBqc29uOiAnbmFtZScsXG4gICAganM6ICduYW1lJyxcbiAgICB0eXA6IC8qI19fUFVSRV9fKi91KHVuZGVmaW5lZCwgJycpXG4gIH0sIHtcbiAgICBqc29uOiAndHlwZScsXG4gICAganM6ICd0eXBlJyxcbiAgICB0eXA6ICcnXG4gIH1dLCAnYW55JyksXG4gIEN1cnJlbmN5SUQ6IC8qI19fUFVSRV9fKi9vKFt7XG4gICAganNvbjogJ0NVUlJFTkNZX0lTT0NPREUnLFxuICAgIGpzOiAnQ1VSUkVOQ1lfSVNPQ09ERScsXG4gICAgdHlwOiAvKiNfX1BVUkVfXyovdSh1bmRlZmluZWQsICcnKVxuICB9XSwgJ2FueScpLFxuICBFbWFpbDogLyojX19QVVJFX18qL28oW3tcbiAgICBqc29uOiAncmVjaXBpZW50cycsXG4gICAganM6ICdyZWNpcGllbnRzJyxcbiAgICB0eXA6IC8qI19fUFVSRV9fKi9yKCdSZWNpcGllbnRzT2JqZWN0JylcbiAgfSwge1xuICAgIGpzb246ICdzdWJqZWN0JyxcbiAgICBqczogJ3N1YmplY3QnLFxuICAgIHR5cDogLyojX19QVVJFX18qL3UodW5kZWZpbmVkLCAnJylcbiAgfSwge1xuICAgIGpzb246ICd0ZXh0Qm9keScsXG4gICAganM6ICd0ZXh0Qm9keScsXG4gICAgdHlwOiAvKiNfX1BVUkVfXyovdSh1bmRlZmluZWQsICcnKVxuICB9LCB7XG4gICAganNvbjogJ3R5cGUnLFxuICAgIGpzOiAndHlwZScsXG4gICAgdHlwOiAnJ1xuICB9LCB7XG4gICAganNvbjogJ2lkJyxcbiAgICBqczogJ2lkJyxcbiAgICB0eXA6IC8qI19fUFVSRV9fKi91KHVuZGVmaW5lZCwgLyojX19QVVJFX18qL20oJ2FueScpKVxuICB9LCB7XG4gICAganNvbjogJ25hbWUnLFxuICAgIGpzOiAnbmFtZScsXG4gICAgdHlwOiAvKiNfX1BVUkVfXyovdSh1bmRlZmluZWQsICcnKVxuICB9XSwgJ2FueScpLFxuICBSZWNpcGllbnRzT2JqZWN0OiAvKiNfX1BVUkVfXyovbyhbe1xuICAgIGpzb246ICdpZCcsXG4gICAganM6ICdpZCcsXG4gICAgdHlwOiAvKiNfX1BVUkVfXyovdSh1bmRlZmluZWQsIC8qI19fUFVSRV9fKi9yKCdSZWNpcGllbnRzSUQnKSlcbiAgfSwge1xuICAgIGpzb246ICd0eXBlJyxcbiAgICBqczogJ3R5cGUnLFxuICAgIHR5cDogJydcbiAgfSwge1xuICAgIGpzb246ICduYW1lJyxcbiAgICBqczogJ25hbWUnLFxuICAgIHR5cDogLyojX19QVVJFX18qL3UodW5kZWZpbmVkLCAnJylcbiAgfSwge1xuICAgIGpzb246ICdjb250YWN0cycsXG4gICAganM6ICdjb250YWN0cycsXG4gICAgdHlwOiAvKiNfX1BVUkVfXyovdSh1bmRlZmluZWQsIC8qI19fUFVSRV9fKi9hKCAvKiNfX1BVUkVfXyovcignQ29udGFjdEVsZW1lbnQnKSkpXG4gIH1dLCAnYW55JyksXG4gIFJlY2lwaWVudHNJRDogLyojX19QVVJFX18qL28oW3tcbiAgICBqc29uOiAnZW1haWwnLFxuICAgIGpzOiAnZW1haWwnLFxuICAgIHR5cDogLyojX19QVVJFX18qL3UodW5kZWZpbmVkLCAnJylcbiAgfSwge1xuICAgIGpzb246ICdGRFNfSUQnLFxuICAgIGpzOiAnRkRTX0lEJyxcbiAgICB0eXA6IC8qI19fUFVSRV9fKi91KHVuZGVmaW5lZCwgJycpXG4gIH1dLCAnYW55JyksXG4gIEluc3RydW1lbnQ6IC8qI19fUFVSRV9fKi9vKFt7XG4gICAganNvbjogJ2lkJyxcbiAgICBqczogJ2lkJyxcbiAgICB0eXA6IC8qI19fUFVSRV9fKi9yKCdTdGlja3lJRCcpXG4gIH0sIHtcbiAgICBqc29uOiAnbWFya2V0JyxcbiAgICBqczogJ21hcmtldCcsXG4gICAgdHlwOiAvKiNfX1BVUkVfXyovdSh1bmRlZmluZWQsIC8qI19fUFVSRV9fKi9yKCdGbHVmZnlNYXJrZXQnKSlcbiAgfSwge1xuICAgIGpzb246ICd0eXBlJyxcbiAgICBqczogJ3R5cGUnLFxuICAgIHR5cDogJydcbiAgfSwge1xuICAgIGpzb246ICduYW1lJyxcbiAgICBqczogJ25hbWUnLFxuICAgIHR5cDogLyojX19QVVJFX18qL3UodW5kZWZpbmVkLCAnJylcbiAgfV0sICdhbnknKSxcbiAgU3RpY2t5SUQ6IC8qI19fUFVSRV9fKi9vKFt7XG4gICAganNvbjogJ0JCRycsXG4gICAganM6ICdCQkcnLFxuICAgIHR5cDogLyojX19QVVJFX18qL3UodW5kZWZpbmVkLCAnJylcbiAgfSwge1xuICAgIGpzb246ICdDVVNJUCcsXG4gICAganM6ICdDVVNJUCcsXG4gICAgdHlwOiAvKiNfX1BVUkVfXyovdSh1bmRlZmluZWQsICcnKVxuICB9LCB7XG4gICAganNvbjogJ0ZEU19JRCcsXG4gICAganM6ICdGRFNfSUQnLFxuICAgIHR5cDogLyojX19QVVJFX18qL3UodW5kZWZpbmVkLCAnJylcbiAgfSwge1xuICAgIGpzb246ICdGSUdJJyxcbiAgICBqczogJ0ZJR0knLFxuICAgIHR5cDogLyojX19QVVJFX18qL3UodW5kZWZpbmVkLCAnJylcbiAgfSwge1xuICAgIGpzb246ICdJU0lOJyxcbiAgICBqczogJ0lTSU4nLFxuICAgIHR5cDogLyojX19QVVJFX18qL3UodW5kZWZpbmVkLCAnJylcbiAgfSwge1xuICAgIGpzb246ICdQRVJNSUQnLFxuICAgIGpzOiAnUEVSTUlEJyxcbiAgICB0eXA6IC8qI19fUFVSRV9fKi91KHVuZGVmaW5lZCwgJycpXG4gIH0sIHtcbiAgICBqc29uOiAnUklDJyxcbiAgICBqczogJ1JJQycsXG4gICAgdHlwOiAvKiNfX1BVUkVfXyovdSh1bmRlZmluZWQsICcnKVxuICB9LCB7XG4gICAganNvbjogJ1NFRE9MJyxcbiAgICBqczogJ1NFRE9MJyxcbiAgICB0eXA6IC8qI19fUFVSRV9fKi91KHVuZGVmaW5lZCwgJycpXG4gIH0sIHtcbiAgICBqc29uOiAndGlja2VyJyxcbiAgICBqczogJ3RpY2tlcicsXG4gICAgdHlwOiAvKiNfX1BVUkVfXyovdSh1bmRlZmluZWQsICcnKVxuICB9XSwgJ2FueScpLFxuICBGbHVmZnlNYXJrZXQ6IC8qI19fUFVSRV9fKi9vKFt7XG4gICAganNvbjogJ0JCRycsXG4gICAganM6ICdCQkcnLFxuICAgIHR5cDogLyojX19QVVJFX18qL3UodW5kZWZpbmVkLCAnJylcbiAgfSwge1xuICAgIGpzb246ICdDT1VOVFJZX0lTT0FMUEhBMicsXG4gICAganM6ICdDT1VOVFJZX0lTT0FMUEhBMicsXG4gICAgdHlwOiAvKiNfX1BVUkVfXyovdSh1bmRlZmluZWQsICcnKVxuICB9LCB7XG4gICAganNvbjogJ01JQycsXG4gICAganM6ICdNSUMnLFxuICAgIHR5cDogLyojX19QVVJFX18qL3UodW5kZWZpbmVkLCAnJylcbiAgfSwge1xuICAgIGpzb246ICduYW1lJyxcbiAgICBqczogJ25hbWUnLFxuICAgIHR5cDogLyojX19QVVJFX18qL3UodW5kZWZpbmVkLCAnJylcbiAgfV0sICdhbnknKSxcbiAgSW5zdHJ1bWVudExpc3Q6IC8qI19fUFVSRV9fKi9vKFt7XG4gICAganNvbjogJ2luc3RydW1lbnRzJyxcbiAgICBqczogJ2luc3RydW1lbnRzJyxcbiAgICB0eXA6IC8qI19fUFVSRV9fKi9hKCAvKiNfX1BVUkVfXyovcignSW5zdHJ1bWVudEVsZW1lbnQnKSlcbiAgfSwge1xuICAgIGpzb246ICd0eXBlJyxcbiAgICBqczogJ3R5cGUnLFxuICAgIHR5cDogJydcbiAgfSwge1xuICAgIGpzb246ICdpZCcsXG4gICAganM6ICdpZCcsXG4gICAgdHlwOiAvKiNfX1BVUkVfXyovdSh1bmRlZmluZWQsIC8qI19fUFVSRV9fKi9tKCdhbnknKSlcbiAgfSwge1xuICAgIGpzb246ICduYW1lJyxcbiAgICBqczogJ25hbWUnLFxuICAgIHR5cDogLyojX19QVVJFX18qL3UodW5kZWZpbmVkLCAnJylcbiAgfV0sICdhbnknKSxcbiAgTm90aGluZzogLyojX19QVVJFX18qL28oW3tcbiAgICBqc29uOiAndHlwZScsXG4gICAganM6ICd0eXBlJyxcbiAgICB0eXA6ICcnXG4gIH0sIHtcbiAgICBqc29uOiAnaWQnLFxuICAgIGpzOiAnaWQnLFxuICAgIHR5cDogLyojX19QVVJFX18qL3UodW5kZWZpbmVkLCAvKiNfX1BVUkVfXyovbSgnYW55JykpXG4gIH0sIHtcbiAgICBqc29uOiAnbmFtZScsXG4gICAganM6ICduYW1lJyxcbiAgICB0eXA6IC8qI19fUFVSRV9fKi91KHVuZGVmaW5lZCwgJycpXG4gIH1dLCAnYW55JyksXG4gIE9yZ2FuaXphdGlvbjogLyojX19QVVJFX18qL28oW3tcbiAgICBqc29uOiAnaWQnLFxuICAgIGpzOiAnaWQnLFxuICAgIHR5cDogLyojX19QVVJFX18qL3IoJ09yZ2FuaXphdGlvbklEJylcbiAgfSwge1xuICAgIGpzb246ICd0eXBlJyxcbiAgICBqczogJ3R5cGUnLFxuICAgIHR5cDogJydcbiAgfSwge1xuICAgIGpzb246ICduYW1lJyxcbiAgICBqczogJ25hbWUnLFxuICAgIHR5cDogLyojX19QVVJFX18qL3UodW5kZWZpbmVkLCAnJylcbiAgfV0sICdhbnknKSxcbiAgT3JnYW5pemF0aW9uSUQ6IC8qI19fUFVSRV9fKi9vKFt7XG4gICAganNvbjogJ0ZEU19JRCcsXG4gICAganM6ICdGRFNfSUQnLFxuICAgIHR5cDogLyojX19QVVJFX18qL3UodW5kZWZpbmVkLCAnJylcbiAgfSwge1xuICAgIGpzb246ICdMRUknLFxuICAgIGpzOiAnTEVJJyxcbiAgICB0eXA6IC8qI19fUFVSRV9fKi91KHVuZGVmaW5lZCwgJycpXG4gIH0sIHtcbiAgICBqc29uOiAnUEVSTUlEJyxcbiAgICBqczogJ1BFUk1JRCcsXG4gICAgdHlwOiAvKiNfX1BVUkVfXyovdSh1bmRlZmluZWQsICcnKVxuICB9XSwgJ2FueScpLFxuICBQb3J0Zm9saW86IC8qI19fUFVSRV9fKi9vKFt7XG4gICAganNvbjogJ3Bvc2l0aW9ucycsXG4gICAganM6ICdwb3NpdGlvbnMnLFxuICAgIHR5cDogLyojX19QVVJFX18qL2EoIC8qI19fUFVSRV9fKi9yKCdQb3NpdGlvbkVsZW1lbnQnKSlcbiAgfSwge1xuICAgIGpzb246ICd0eXBlJyxcbiAgICBqczogJ3R5cGUnLFxuICAgIHR5cDogJydcbiAgfSwge1xuICAgIGpzb246ICdpZCcsXG4gICAganM6ICdpZCcsXG4gICAgdHlwOiAvKiNfX1BVUkVfXyovdSh1bmRlZmluZWQsIC8qI19fUFVSRV9fKi9tKCdhbnknKSlcbiAgfSwge1xuICAgIGpzb246ICduYW1lJyxcbiAgICBqczogJ25hbWUnLFxuICAgIHR5cDogLyojX19QVVJFX18qL3UodW5kZWZpbmVkLCAnJylcbiAgfV0sICdhbnknKSxcbiAgUG9zaXRpb25FbGVtZW50OiAvKiNfX1BVUkVfXyovbyhbe1xuICAgIGpzb246ICdob2xkaW5nJyxcbiAgICBqczogJ2hvbGRpbmcnLFxuICAgIHR5cDogMy4xNFxuICB9LCB7XG4gICAganNvbjogJ2luc3RydW1lbnQnLFxuICAgIGpzOiAnaW5zdHJ1bWVudCcsXG4gICAgdHlwOiAvKiNfX1BVUkVfXyovcignSW5zdHJ1bWVudEVsZW1lbnQnKVxuICB9LCB7XG4gICAganNvbjogJ3R5cGUnLFxuICAgIGpzOiAndHlwZScsXG4gICAgdHlwOiAnJ1xuICB9LCB7XG4gICAganNvbjogJ2lkJyxcbiAgICBqczogJ2lkJyxcbiAgICB0eXA6IC8qI19fUFVSRV9fKi91KHVuZGVmaW5lZCwgLyojX19QVVJFX18qL20oJ2FueScpKVxuICB9LCB7XG4gICAganNvbjogJ25hbWUnLFxuICAgIGpzOiAnbmFtZScsXG4gICAgdHlwOiAvKiNfX1BVUkVfXyovdSh1bmRlZmluZWQsICcnKVxuICB9XSwgJ2FueScpLFxuICBQb3NpdGlvbjogLyojX19QVVJFX18qL28oW3tcbiAgICBqc29uOiAnaG9sZGluZycsXG4gICAganM6ICdob2xkaW5nJyxcbiAgICB0eXA6IDMuMTRcbiAgfSwge1xuICAgIGpzb246ICdpbnN0cnVtZW50JyxcbiAgICBqczogJ2luc3RydW1lbnQnLFxuICAgIHR5cDogLyojX19QVVJFX18qL3IoJ0luc3RydW1lbnRFbGVtZW50JylcbiAgfSwge1xuICAgIGpzb246ICd0eXBlJyxcbiAgICBqczogJ3R5cGUnLFxuICAgIHR5cDogJydcbiAgfSwge1xuICAgIGpzb246ICdpZCcsXG4gICAganM6ICdpZCcsXG4gICAgdHlwOiAvKiNfX1BVUkVfXyovdSh1bmRlZmluZWQsIC8qI19fUFVSRV9fKi9tKCdhbnknKSlcbiAgfSwge1xuICAgIGpzb246ICduYW1lJyxcbiAgICBqczogJ25hbWUnLFxuICAgIHR5cDogLyojX19QVVJFX18qL3UodW5kZWZpbmVkLCAnJylcbiAgfV0sICdhbnknKSxcbiAgVGltZVJhbmdlOiAvKiNfX1BVUkVfXyovbyhbe1xuICAgIGpzb246ICdlbmRUaW1lJyxcbiAgICBqczogJ2VuZFRpbWUnLFxuICAgIHR5cDogLyojX19QVVJFX18qL3UodW5kZWZpbmVkLCBEYXRlKVxuICB9LCB7XG4gICAganNvbjogJ3N0YXJ0VGltZScsXG4gICAganM6ICdzdGFydFRpbWUnLFxuICAgIHR5cDogLyojX19QVVJFX18qL3UodW5kZWZpbmVkLCBEYXRlKVxuICB9LCB7XG4gICAganNvbjogJ3R5cGUnLFxuICAgIGpzOiAndHlwZScsXG4gICAgdHlwOiAnJ1xuICB9LCB7XG4gICAganNvbjogJ2lkJyxcbiAgICBqczogJ2lkJyxcbiAgICB0eXA6IC8qI19fUFVSRV9fKi91KHVuZGVmaW5lZCwgLyojX19QVVJFX18qL20oJ2FueScpKVxuICB9LCB7XG4gICAganNvbjogJ25hbWUnLFxuICAgIGpzOiAnbmFtZScsXG4gICAgdHlwOiAvKiNfX1BVUkVfXyovdSh1bmRlZmluZWQsICcnKVxuICB9XSwgJ2FueScpLFxuICBWYWx1YXRpb246IC8qI19fUFVSRV9fKi9vKFt7XG4gICAganNvbjogJ0NVUlJFTkNZX0lTT0NPREUnLFxuICAgIGpzOiAnQ1VSUkVOQ1lfSVNPQ09ERScsXG4gICAgdHlwOiAnJ1xuICB9LCB7XG4gICAganNvbjogJ2V4cGlyeVRpbWUnLFxuICAgIGpzOiAnZXhwaXJ5VGltZScsXG4gICAgdHlwOiAvKiNfX1BVUkVfXyovdSh1bmRlZmluZWQsIERhdGUpXG4gIH0sIHtcbiAgICBqc29uOiAncHJpY2UnLFxuICAgIGpzOiAncHJpY2UnLFxuICAgIHR5cDogLyojX19QVVJFX18qL3UodW5kZWZpbmVkLCAzLjE0KVxuICB9LCB7XG4gICAganNvbjogJ3R5cGUnLFxuICAgIGpzOiAndHlwZScsXG4gICAgdHlwOiAnJ1xuICB9LCB7XG4gICAganNvbjogJ3ZhbHVhdGlvblRpbWUnLFxuICAgIGpzOiAndmFsdWF0aW9uVGltZScsXG4gICAgdHlwOiAvKiNfX1BVUkVfXyovdSh1bmRlZmluZWQsIERhdGUpXG4gIH0sIHtcbiAgICBqc29uOiAndmFsdWUnLFxuICAgIGpzOiAndmFsdWUnLFxuICAgIHR5cDogMy4xNFxuICB9LCB7XG4gICAganNvbjogJ2lkJyxcbiAgICBqczogJ2lkJyxcbiAgICB0eXA6IC8qI19fUFVSRV9fKi91KHVuZGVmaW5lZCwgLyojX19QVVJFX18qL20oJ2FueScpKVxuICB9LCB7XG4gICAganNvbjogJ25hbWUnLFxuICAgIGpzOiAnbmFtZScsXG4gICAgdHlwOiAvKiNfX1BVUkVfXyovdSh1bmRlZmluZWQsICcnKVxuICB9XSwgJ2FueScpLFxuICBTdHlsZTogWydiYXInLCAnY2FuZGxlJywgJ2N1c3RvbScsICdoZWF0bWFwJywgJ2hpc3RvZ3JhbScsICdsaW5lJywgJ21vdW50YWluJywgJ3BpZScsICdzY2F0dGVyJywgJ3N0YWNrZWQtYmFyJ11cbn07XG5cbnZhciBJbnRlbnRzO1xuKGZ1bmN0aW9uIChJbnRlbnRzKSB7XG4gIEludGVudHNbXCJTdGFydENhbGxcIl0gPSBcIlN0YXJ0Q2FsbFwiO1xuICBJbnRlbnRzW1wiU3RhcnRDaGF0XCJdID0gXCJTdGFydENoYXRcIjtcbiAgSW50ZW50c1tcIlN0YXJ0RW1haWxcIl0gPSBcIlN0YXJ0RW1haWxcIjtcbiAgSW50ZW50c1tcIlZpZXdBbmFseXNpc1wiXSA9IFwiVmlld0FuYWx5c2lzXCI7XG4gIEludGVudHNbXCJWaWV3Q2hhcnRcIl0gPSBcIlZpZXdDaGFydFwiO1xuICBJbnRlbnRzW1wiVmlld0NvbnRhY3RcIl0gPSBcIlZpZXdDb250YWN0XCI7XG4gIEludGVudHNbXCJWaWV3SG9sZGluZ3NcIl0gPSBcIlZpZXdIb2xkaW5nc1wiO1xuICBJbnRlbnRzW1wiVmlld0luc3RydW1lbnRcIl0gPSBcIlZpZXdJbnN0cnVtZW50XCI7XG4gIEludGVudHNbXCJWaWV3SW50ZXJhY3Rpb25zXCJdID0gXCJWaWV3SW50ZXJhY3Rpb25zXCI7XG4gIEludGVudHNbXCJWaWV3TmV3c1wiXSA9IFwiVmlld05ld3NcIjtcbiAgSW50ZW50c1tcIlZpZXdPcmRlcnNcIl0gPSBcIlZpZXdPcmRlcnNcIjtcbiAgSW50ZW50c1tcIlZpZXdQcm9maWxlXCJdID0gXCJWaWV3UHJvZmlsZVwiO1xuICBJbnRlbnRzW1wiVmlld1F1b3RlXCJdID0gXCJWaWV3UXVvdGVcIjtcbiAgSW50ZW50c1tcIlZpZXdSZXNlYXJjaFwiXSA9IFwiVmlld1Jlc2VhcmNoXCI7XG59KShJbnRlbnRzIHx8IChJbnRlbnRzID0ge30pKTtcblxuZXhwb3J0IHsgQ2hhbm5lbEVycm9yLCBDb250ZXh0VHlwZXMsIENvbnZlcnQsIEludGVudHMsIE9wZW5FcnJvciwgUmVzb2x2ZUVycm9yLCBSZXN1bHRFcnJvciwgU3R5bGUsIGFkZENvbnRleHRMaXN0ZW5lciwgYWRkSW50ZW50TGlzdGVuZXIsIGJyb2FkY2FzdCwgY29tcGFyZVZlcnNpb25OdW1iZXJzLCBjcmVhdGVQcml2YXRlQ2hhbm5lbCwgZmRjM1JlYWR5LCBmaW5kSW5zdGFuY2VzLCBmaW5kSW50ZW50LCBmaW5kSW50ZW50c0J5Q29udGV4dCwgZ2V0QXBwTWV0YWRhdGEsIGdldEN1cnJlbnRDaGFubmVsLCBnZXRJbmZvLCBnZXRPckNyZWF0ZUNoYW5uZWwsIGdldFN5c3RlbUNoYW5uZWxzLCBnZXRVc2VyQ2hhbm5lbHMsIGpvaW5DaGFubmVsLCBqb2luVXNlckNoYW5uZWwsIGxlYXZlQ3VycmVudENoYW5uZWwsIG9wZW4sIHJhaXNlSW50ZW50LCByYWlzZUludGVudEZvckNvbnRleHQsIHZlcnNpb25Jc0F0TGVhc3QgfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWZkYzMuZXNtLmpzLm1hcFxuIiwiaW1wb3J0IHR5cGUgeyBJbWFnZSB9IGZyb20gXCJAb3BlbmZpbi93b3Jrc3BhY2VcIjtcbmltcG9ydCB0eXBlIHsgUGxhdGZvcm1BcHAgfSBmcm9tIFwiLi4vLi4vc2hhcGVzL2FwcC1zaGFwZXNcIjtcbmltcG9ydCB0eXBlIHtcblx0QXBwRGVmaW5pdGlvbixcblx0QXBwSWNvbixcblx0QXBwSW1hZ2UsXG5cdEFwcEludGVudHMsXG5cdEFwcE1ldGFkYXRhLFxuXHRDdXN0b21Db25maWdcbn0gZnJvbSBcIi4uLy4uL3NoYXBlcy9mZGMzLTEtMi1zaGFwZXNcIjtcbmltcG9ydCB0eXBlIHsgQXBwSW50ZXJvcCwgQXBwSW50ZW50cyBhcyBGREMzVHdvUG9pbnRaZXJvQXBwSW50ZW50cyB9IGZyb20gXCIuLi8uLi9zaGFwZXMvZmRjMy0yLTAtc2hhcGVzXCI7XG5pbXBvcnQgeyBpc0Jvb2xlYW4sIGlzRW1wdHksIGlzU3RyaW5nVmFsdWUgfSBmcm9tIFwiLi4vLi4vdXRpbHNcIjtcblxuLyoqXG4gKiBNYXAgdGhlIGFwcCBkZWZpbml0aW9uIHRvIGEgcGxhdGZvcm0gYXBwLlxuICogQHBhcmFtIGFwcCBUaGUgYXBwIGRlZmluaXRpb24gdG8gbWFwLlxuICogQHJldHVybnMgVGhlIHBsYXRmb3JtIGFwcC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG1hcFRvUGxhdGZvcm1BcHAoYXBwOiBBcHBEZWZpbml0aW9uKTogUGxhdGZvcm1BcHAge1xuXHRjb25zdCBwbGF0Zm9ybUFwcDogUGxhdGZvcm1BcHAgPSB7XG5cdFx0YXBwSWQ6IGFwcC5hcHBJZCxcblx0XHRuYW1lOiBhcHAubmFtZSA/PyBhcHAuYXBwSWQsXG5cdFx0dGl0bGU6IGFwcC50aXRsZSA/PyBhcHAubmFtZSxcblx0XHRtYW5pZmVzdFR5cGU6IGFwcC5tYW5pZmVzdFR5cGUsXG5cdFx0bWFuaWZlc3Q6IGdldE1hbmlmZXN0RnJvbUZEQzMoYXBwKSBhcyBzdHJpbmcsXG5cdFx0ZGVzY3JpcHRpb246IGFwcC5kZXNjcmlwdGlvbixcblx0XHRjdXN0b21Db25maWc6IGFwcC5jdXN0b21Db25maWcsXG5cdFx0aW50ZW50czogYXBwLmludGVudHMsXG5cdFx0aW50ZXJvcDogbWFwSW50ZXJvcEZyb21GREMzKGFwcC5pbnRlbnRzKSxcblx0XHR0YWdzOiBtYXBUYWdzRnJvbUZEQzMoYXBwKSxcblx0XHR2ZXJzaW9uOiBhcHAudmVyc2lvbixcblx0XHRwdWJsaXNoZXI6IGFwcC5wdWJsaXNoZXIgPz8gXCJcIixcblx0XHRjb250YWN0RW1haWw6IGFwcC5jb250YWN0RW1haWwsXG5cdFx0c3VwcG9ydEVtYWlsOiBhcHAuc3VwcG9ydEVtYWlsLFxuXHRcdGljb25zOiBtYXBJY29uc0Zyb21GREMzKGFwcC5pY29ucyksXG5cdFx0aW1hZ2VzOiBtYXBJbWFnZXNGcm9tRkRDMyhhcHAuaW1hZ2VzKSxcblx0XHRwcml2YXRlOiBtYXBQcml2YXRlRnJvbUZEQzMoYXBwKSxcblx0XHRhdXRvc3RhcnQ6IG1hcEF1dG9zdGFydEZyb21GREMzKGFwcCksXG5cdFx0aW5zdGFuY2VNb2RlOiBhcHAuY3VzdG9tQ29uZmlnPy5pbnN0YW5jZU1vZGUsXG5cdFx0dG9vbHRpcDogYXBwLnRvb2x0aXAsXG5cdFx0bGF1bmNoUHJlZmVyZW5jZTogYXBwLmN1c3RvbUNvbmZpZz8ubGF1bmNoUHJlZmVyZW5jZVxuXHR9O1xuXHRyZXR1cm4gcGxhdGZvcm1BcHA7XG59XG5cbi8qKlxuICogTWFwIGEgcGxhdGZvcm0gYXBwIHRvIGFuIEZEQzMgMS4yIGFwcCBkZWZpbml0aW9uLlxuICogQHBhcmFtIGFwcCBUaGUgYXBwIGRlZmluaXRpb24gdG8gbWFwLlxuICogQHJldHVybnMgVGhlIGZkYzMgMS4yIGFwcC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG1hcFRvRkRDM0FwcChhcHA6IFBsYXRmb3JtQXBwKTogQXBwRGVmaW5pdGlvbiB7XG5cdGNvbnN0IG1hbmlmZXN0VHlwZTogc3RyaW5nID0gYCR7YXBwLm1hbmlmZXN0VHlwZX1gO1xuXG5cdGNvbnN0IGZkYzNBcHA6IEFwcERlZmluaXRpb24gPSB7XG5cdFx0YXBwSWQ6IGFwcC5hcHBJZCxcblx0XHRuYW1lOiBhcHAubmFtZSA/PyBhcHAuYXBwSWQsXG5cdFx0dGl0bGU6IGFwcC50aXRsZSA/PyBhcHAubmFtZSxcblx0XHRtYW5pZmVzdFR5cGUsXG5cdFx0bWFuaWZlc3Q6IGFwcC5tYW5pZmVzdCBhcyBzdHJpbmcsXG5cdFx0ZGVzY3JpcHRpb246IGFwcC5kZXNjcmlwdGlvbixcblx0XHRjdXN0b21Db25maWc6IG1hcEN1c3RvbUNvbmZpZ0Zyb21QbGF0Zm9ybUFwcChhcHApLFxuXHRcdGludGVudHM6IG1hcEludGVudHNGcm9tUGxhdGZvcm1BcHAoYXBwKSxcblx0XHRjYXRlZ29yaWVzOiBhcHAudGFncyA/PyBbXSxcblx0XHR2ZXJzaW9uOiBhcHAudmVyc2lvbixcblx0XHRwdWJsaXNoZXI6IGFwcC5wdWJsaXNoZXIgPz8gXCJcIixcblx0XHRjb250YWN0RW1haWw6IGFwcC5jb250YWN0RW1haWwsXG5cdFx0c3VwcG9ydEVtYWlsOiBhcHAuc3VwcG9ydEVtYWlsLFxuXHRcdGljb25zOiBtYXBJY29uc0Zyb21QbGF0Zm9ybUFwcChhcHApLFxuXHRcdGltYWdlczogbWFwSW1hZ2VzRnJvbVBsYXRmb3JtQXBwKGFwcCksXG5cdFx0dG9vbHRpcDogYXBwLnRvb2x0aXBcblx0fTtcblx0cmV0dXJuIGZkYzNBcHA7XG59XG5cbi8qKlxuICogTWFwIHRoZSBwbGF0Zm9ybSBhcHAgdG8gYXBwIG1ldGFkYXRhLlxuICogQHBhcmFtIGFwcCBUaGUgYXBwbGljYXRpb24gdG8gbWFwLlxuICogQHJldHVybnMgVGhlIGFwcCBtZXRhZGF0YS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG1hcFRvQXBwTWV0YURhdGEoYXBwOiBQbGF0Zm9ybUFwcCk6IEFwcE1ldGFkYXRhIHtcblx0Y29uc3QgaWNvbnM6IHN0cmluZ1tdID0gW107XG5cdGNvbnN0IGltYWdlczogc3RyaW5nW10gPSBbXTtcblx0aWYgKEFycmF5LmlzQXJyYXkoYXBwLmljb25zKSkge1xuXHRcdGZvciAoY29uc3QgaWNvbiBvZiBhcHAuaWNvbnMpIHtcblx0XHRcdGlmICghaXNFbXB0eShpY29uLnNyYykpIHtcblx0XHRcdFx0aWNvbnMucHVzaChpY29uLnNyYyk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cdGlmIChBcnJheS5pc0FycmF5KGFwcC5pbWFnZXMpKSB7XG5cdFx0Zm9yIChjb25zdCBpbWFnZSBvZiBhcHAuaW1hZ2VzKSB7XG5cdFx0XHRpZiAoIWlzRW1wdHkoaW1hZ2Uuc3JjKSkge1xuXHRcdFx0XHRpbWFnZXMucHVzaChpbWFnZS5zcmMpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXHRjb25zdCBhcHBNZXRhRGF0YTogQXBwTWV0YWRhdGEgPSB7XG5cdFx0YXBwSWQ6IGFwcC5hcHBJZCxcblx0XHRkZXNjcmlwdGlvbjogYXBwLmRlc2NyaXB0aW9uLFxuXHRcdGljb25zLFxuXHRcdGltYWdlcyxcblx0XHRuYW1lOiBhcHAuYXBwSWQsXG5cdFx0dGl0bGU6IGFwcC50aXRsZSxcblx0XHR0b29sdGlwOiBhcHAudG9vbHRpcCxcblx0XHR2ZXJzaW9uOiBhcHAudmVyc2lvblxuXHR9O1xuXHRyZXR1cm4gYXBwTWV0YURhdGE7XG59XG5cbi8qKlxuICogTWFwIHRoZSBhcHAgZGVmaW5pdGlvbiBpbnRlcm9wIGRhdGEgdG8gYXBwIGludGVyb3AgZm9ybWF0LlxuICogQHBhcmFtIGludGVudHMgVGhlIGludGVudHMgdG8gbWFwLlxuICogQHJldHVybnMgVGhlIGFwcCBpbnRlcm9wLlxuICovXG5leHBvcnQgZnVuY3Rpb24gbWFwSW50ZXJvcEZyb21GREMzKGludGVudHM6IEFwcEludGVudHNbXSB8IHVuZGVmaW5lZCk6IEFwcEludGVyb3AgfCB1bmRlZmluZWQge1xuXHRpZiAoaXNFbXB0eShpbnRlbnRzKSkge1xuXHRcdHJldHVybjtcblx0fVxuXG5cdGNvbnN0IGxpc3RlbnNGb3I6IHsgW2tleTogc3RyaW5nXTogRkRDM1R3b1BvaW50WmVyb0FwcEludGVudHMgfSA9IHt9O1xuXG5cdGZvciAoY29uc3QgaW50ZW50IG9mIGludGVudHMpIHtcblx0XHRsaXN0ZW5zRm9yW2ludGVudC5uYW1lXSA9IHtcblx0XHRcdGNvbnRleHRzOiBpbnRlbnQuY29udGV4dHMsXG5cdFx0XHRjdXN0b21Db25maWc6IGludGVudC5jdXN0b21Db25maWcsXG5cdFx0XHRkaXNwbGF5TmFtZTogaW50ZW50LmRpc3BsYXlOYW1lXG5cdFx0fTtcblx0fVxuXG5cdGNvbnN0IGludGVyb3A6IEFwcEludGVyb3AgPSB7XG5cdFx0aW50ZW50czogeyBsaXN0ZW5zRm9yIH1cblx0fTtcblxuXHRyZXR1cm4gaW50ZXJvcDtcbn1cblxuLyoqXG4gKiBNYXBzIHRoZSBpbnRlbnRzIGZyb20gYSBwbGF0Zm9ybSBhcHAgdG8gYW4gRkRDMyAxLjIgaW50ZW50cyBhcnJheS5cbiAqIEBwYXJhbSBhcHAgVGhlIHBsYXRmb3JtIGFwcCB0byB1c2UgYXMgYSBzb3VyY2VcbiAqIEByZXR1cm5zIGFuIEFycmF5IG9mIEludGVudHMgaW4gRkRDMyAxLjIgZm9ybWF0XG4gKi9cbmZ1bmN0aW9uIG1hcEludGVudHNGcm9tUGxhdGZvcm1BcHAoYXBwOiBQbGF0Zm9ybUFwcCk6IEFwcEludGVudHNbXSB7XG5cdGNvbnN0IGludGVudHM6IEFwcEludGVudHNbXSA9IFtdO1xuXHRjb25zdCBwYXNzZWRJbnRlbnRzID0gYXBwLmludGVyb3A/LmludGVudHM/Lmxpc3RlbnNGb3I7XG5cdGlmICghaXNFbXB0eShwYXNzZWRJbnRlbnRzKSkge1xuXHRcdGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhwYXNzZWRJbnRlbnRzKTtcblx0XHRmb3IgKGNvbnN0IGtleSBvZiBrZXlzKSB7XG5cdFx0XHRjb25zdCBkaXNwbGF5TmFtZTogc3RyaW5nID0gcGFzc2VkSW50ZW50c1trZXldLmRpc3BsYXlOYW1lID8/IGtleTtcblx0XHRcdGludGVudHMucHVzaCh7XG5cdFx0XHRcdG5hbWU6IGtleSxcblx0XHRcdFx0ZGlzcGxheU5hbWUsXG5cdFx0XHRcdGNvbnRleHRzOiBwYXNzZWRJbnRlbnRzW2tleV0uY29udGV4dHMsXG5cdFx0XHRcdGN1c3RvbUNvbmZpZzogcGFzc2VkSW50ZW50c1trZXldLmN1c3RvbUNvbmZpZ1xuXHRcdFx0fSk7XG5cdFx0fVxuXHR9XG5cdGlmIChpbnRlbnRzLmxlbmd0aCA9PT0gMCAmJiAhaXNFbXB0eShhcHAuaW50ZW50cykpIHtcblx0XHRyZXR1cm4gYXBwLmludGVudHM7XG5cdH1cblx0cmV0dXJuIGludGVudHM7XG59XG5cbi8qKlxuICogVGFrZXMgYSBwbGF0Zm9ybSBhcHAgYW5kIHJldHVybnMgYW4gRkRDMyBjdXN0b20gY29uZmlnIG9iamVjdC5cbiAqIEBwYXJhbSBhcHAgVGhlIHBsYXRmb3JtIGFwcCB0byBtYXAgaW50byBhIGN1c3RvbUNvbmZpZyBvYmplY3QuXG4gKiBAcmV0dXJucyBhbiBGREMzIDEuMiBjdXN0b21Db25maWcgb2JqZWN0IGJhc2VkIG9uIHRoZSBwbGF0Zm9ybSBhcHAgc2V0dGluZ3MuXG4gKi9cbmZ1bmN0aW9uIG1hcEN1c3RvbUNvbmZpZ0Zyb21QbGF0Zm9ybUFwcChhcHA6IFBsYXRmb3JtQXBwKTogQ3VzdG9tQ29uZmlnIHtcblx0Y29uc3QgY29uZmlnOiBDdXN0b21Db25maWcgPSB7XG5cdFx0YXV0b3N0YXJ0OiBtYXBCb29sZWFuVmFsdWUoYXBwPy5hdXRvc3RhcnQsIGZhbHNlKS50b1N0cmluZygpLFxuXHRcdGluc3RhbmNlTW9kZTogYXBwLmluc3RhbmNlTW9kZSxcblx0XHRwcml2YXRlOiBtYXBCb29sZWFuVmFsdWUoYXBwLnByaXZhdGUsIGZhbHNlKS50b1N0cmluZygpLFxuXHRcdGxhdW5jaFByZWZlcmVuY2U6IGFwcC5sYXVuY2hQcmVmZXJlbmNlXG5cdH07XG5cdHJldHVybiBjb25maWc7XG59XG5cbi8qKlxuICogTWFwIHRoZSBpY29uIGZvcm1hdC5cbiAqIEBwYXJhbSBpY29ucyBUaGUgaWNvbnMgdG8gbWFwLlxuICogQHJldHVybnMgVGhlIG1hcHBlZCBpY29ucy5cbiAqL1xuZnVuY3Rpb24gbWFwSWNvbnNGcm9tRkRDMyhpY29uczogQXBwSWNvbltdIHwgdW5kZWZpbmVkKTogSW1hZ2VbXSB7XG5cdGlmICghQXJyYXkuaXNBcnJheShpY29ucykpIHtcblx0XHRyZXR1cm4gW107XG5cdH1cblx0Y29uc3QgYXBwSWNvbnM6IEltYWdlW10gPSBbXTtcblx0Zm9yIChjb25zdCBhcHBJY29uIG9mIGljb25zKSB7XG5cdFx0YXBwSWNvbnMucHVzaCh7IHNyYzogYXBwSWNvbi5pY29uIH0pO1xuXHR9XG5cdHJldHVybiBhcHBJY29ucztcbn1cblxuLyoqXG4gKiBUYWtlcyBhIFBsYXRmb3JtIEFwcCBhbmQgY29udmVydHMgaWNvbnMgc28gdGhleSBhcmUgaW4gRkRDMyAxLjIgZm9ybWF0LlxuICogQHBhcmFtIGFwcCBUaGUgcGxhdGZvcm0gYXBwIHRvIHVzZSBhcyBhIHNvdXJjZS5cbiAqIEByZXR1cm5zIFRoZSBhcnJheSBvZiBhcHAgaWNvbnMgaW4gRkRDMyAxLjIgZm9ybWF0LlxuICovXG5mdW5jdGlvbiBtYXBJY29uc0Zyb21QbGF0Zm9ybUFwcChhcHA6IFBsYXRmb3JtQXBwKTogQXBwSWNvbltdIHtcblx0aWYgKCFBcnJheS5pc0FycmF5KGFwcC5pY29ucykpIHtcblx0XHRyZXR1cm4gW107XG5cdH1cblx0Y29uc3QgYXBwSWNvbnM6IEFwcEljb25bXSA9IFtdO1xuXHRmb3IgKGNvbnN0IGFwcEljb24gb2YgYXBwLmljb25zKSB7XG5cdFx0YXBwSWNvbnMucHVzaCh7IGljb246IGFwcEljb24uc3JjIH0pO1xuXHR9XG5cdHJldHVybiBhcHBJY29ucztcbn1cblxuLyoqXG4gKiBNYXAgdGhlIGltYWdlIGZvcm1hdC5cbiAqIEBwYXJhbSBpbWFnZXMgVGhlIGltYWdlcyB0byBtYXAuXG4gKiBAcmV0dXJucyBUaGUgbWFwcGVkIGltYWdlcy5cbiAqL1xuZnVuY3Rpb24gbWFwSW1hZ2VzRnJvbUZEQzMoaW1hZ2VzOiBBcHBJbWFnZVtdIHwgdW5kZWZpbmVkKTogSW1hZ2VbXSB7XG5cdGlmICghQXJyYXkuaXNBcnJheShpbWFnZXMpKSB7XG5cdFx0cmV0dXJuIFtdO1xuXHR9XG5cdGNvbnN0IGFwcEltYWdlczogSW1hZ2VbXSA9IFtdO1xuXHRmb3IgKGNvbnN0IGFwcEltYWdlIG9mIGltYWdlcykge1xuXHRcdGFwcEltYWdlcy5wdXNoKHsgc3JjOiBhcHBJbWFnZS51cmwgfSk7XG5cdH1cblx0cmV0dXJuIGFwcEltYWdlcztcbn1cblxuLyoqXG4gKiBSZXR1cm5zIGFuIGFycmF5IG9mIGltYWdlcyBpbiBGREMzIDEuMiBmb3JtYXQgZnJvbSBhIFBsYXRmb3JtIEFwcC5cbiAqIEBwYXJhbSBhcHAgVGhlIHBsYXRmb3JtIGFwcCB0byB1c2UgYXMgYSBzb3VyY2UuXG4gKiBAcmV0dXJucyBUaGUgbWFwcGVkIGltYWdlcy5cbiAqL1xuZnVuY3Rpb24gbWFwSW1hZ2VzRnJvbVBsYXRmb3JtQXBwKGFwcDogUGxhdGZvcm1BcHApOiBBcHBJbWFnZVtdIHtcblx0aWYgKCFBcnJheS5pc0FycmF5KGFwcC5pbWFnZXMpKSB7XG5cdFx0cmV0dXJuIFtdO1xuXHR9XG5cdGNvbnN0IGFwcEltYWdlczogQXBwSW1hZ2VbXSA9IFtdO1xuXHRmb3IgKGNvbnN0IGFwcEltYWdlIG9mIGFwcC5pbWFnZXMpIHtcblx0XHRhcHBJbWFnZXMucHVzaCh7IHVybDogYXBwSW1hZ2Uuc3JjIH0pO1xuXHR9XG5cdHJldHVybiBhcHBJbWFnZXM7XG59XG5cbi8qKlxuICogR2V0IHRoZSBtYW5pZmVzdCB3aGljaCBjYW4gYmUgcGxhaW4gc3RyaW5nIG9yIEpTT04uXG4gKiBAcGFyYW0gYXBwIFRoZSBhcHAgdG8gZ2V0IHRoZSBtYW5pZmVzdCBmcm9tLlxuICogQHJldHVybnMgVGhlIG1hbmlmZXN0LlxuICovXG5mdW5jdGlvbiBnZXRNYW5pZmVzdEZyb21GREMzKGFwcDogQXBwRGVmaW5pdGlvbik6IHVua25vd24ge1xuXHRpZiAoaXNTdHJpbmdWYWx1ZShhcHAubWFuaWZlc3QpICYmIGFwcC5tYW5pZmVzdC5zdGFydHNXaXRoKFwie1wiKSkge1xuXHRcdHJldHVybiBKU09OLnBhcnNlKGFwcC5tYW5pZmVzdCk7XG5cdH1cblxuXHRyZXR1cm4gYXBwLm1hbmlmZXN0O1xufVxuXG4vKipcbiAqIE1hcCB0aGUgdGFncy5cbiAqIEBwYXJhbSBhcHAgVGhlIGFwcCBkZWZpbml0aW9uIHRvIG1hcCB0aGUgdGFncyBmb3IuXG4gKiBAcmV0dXJucyBUaGUgbWFwcGVkIHRhZ3MsXG4gKi9cbmZ1bmN0aW9uIG1hcFRhZ3NGcm9tRkRDMyhhcHA6IEFwcERlZmluaXRpb24gJiB7IHRhZ3M/OiBzdHJpbmdbXSB9KTogc3RyaW5nW10ge1xuXHRjb25zdCB0YWdzOiBzdHJpbmdbXSA9IGFwcC50YWdzID8/IGFwcC5jYXRlZ29yaWVzID8/IFtdO1xuXHRpZiAodGFncy5sZW5ndGggPT09IDApIHtcblx0XHR0YWdzLnB1c2goYXBwLm1hbmlmZXN0VHlwZSk7XG5cdH1cblxuXHRyZXR1cm4gdGFncztcbn1cblxuLyoqXG4gKiBNYXAgdGhlIHByaXZhdGUgZmxhZy5cbiAqIEBwYXJhbSBhcHAgVGhlIGFwcCBjb250YWluaW5nIHRoZSBhcHAuXG4gKiBAcmV0dXJucyBUaGUgZmxhZyBvciBmYWxzZSBpZiBub3QgZm91bmQuXG4gKi9cbmZ1bmN0aW9uIG1hcFByaXZhdGVGcm9tRkRDMyhhcHA6IEFwcERlZmluaXRpb24pOiBib29sZWFuIHtcblx0cmV0dXJuIG1hcEJvb2xlYW5WYWx1ZShhcHA/LmN1c3RvbUNvbmZpZz8ucHJpdmF0ZSwgZmFsc2UpO1xufVxuXG4vKipcbiAqIE1hcCB0aGUgYXV0b3N0YXJ0IGZsYWcuXG4gKiBAcGFyYW0gYXBwIFRoZSBhcHAgY29udGFpbmluZyB0aGUgYXBwLlxuICogQHJldHVybnMgVGhlIGZsYWcgb3IgZmFsc2UgaWYgbm90IGZvdW5kLlxuICovXG5mdW5jdGlvbiBtYXBBdXRvc3RhcnRGcm9tRkRDMyhhcHA6IEFwcERlZmluaXRpb24pOiBib29sZWFuIHtcblx0cmV0dXJuIG1hcEJvb2xlYW5WYWx1ZShhcHA/LmN1c3RvbUNvbmZpZz8uYXV0b3N0YXJ0LCBmYWxzZSk7XG59XG5cbi8qKlxuICogTWFwIGEgYm9vbGVhbiBvciBzdHJpbmcgdG8gYSByZWFsIGJvb2xlYW4gdmFsdWUuXG4gKiBAcGFyYW0gZmxhZyBUaGUgZmxhZyB0byBjb252ZXJ0LlxuICogQHBhcmFtIGRlZmF1bHRGbGFnIFRoZSBkZWZhdWx0IHZhbHVlIGlmIG1pc3NpbmcuXG4gKiBAcmV0dXJucyBUaGUgbWFwcGVkIGZsYWcuXG4gKi9cbmZ1bmN0aW9uIG1hcEJvb2xlYW5WYWx1ZShmbGFnOiBzdHJpbmcgfCBib29sZWFuIHwgdW5kZWZpbmVkLCBkZWZhdWx0RmxhZzogYm9vbGVhbik6IGJvb2xlYW4ge1xuXHRpZiAoaXNTdHJpbmdWYWx1ZShmbGFnKSB8fCBpc0Jvb2xlYW4oZmxhZykpIHtcblx0XHRzd2l0Y2ggKGZsYWcpIHtcblx0XHRcdGNhc2UgXCJGYWxzZVwiOlxuXHRcdFx0Y2FzZSBcImZhbHNlXCI6XG5cdFx0XHRjYXNlIGZhbHNlOlxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRjYXNlIFwiVHJ1ZVwiOlxuXHRcdFx0Y2FzZSBcInRydWVcIjpcblx0XHRcdGNhc2UgdHJ1ZTpcblx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHQvLyBpZiBzb21lb25lIGhhcyBkZWZpbmVkIGEgZmxhZyB0aGVuIHRoZSBsaWtlbHkgaG9vZCB3YXMgdG8gb3ZlcnJpZGUgdGhlIGRlZmF1bHQgdmFsdWVcblx0XHRcdFx0cmV0dXJuICFkZWZhdWx0RmxhZztcblx0XHR9XG5cdH1cblx0cmV0dXJuIGRlZmF1bHRGbGFnO1xufVxuIiwiaW1wb3J0IHR5cGUgeyBBcHBNZXRhZGF0YSB9IGZyb20gXCJAZmlub3MvZmRjM1wiO1xuaW1wb3J0IHR5cGUgeyBBcHBJbnRlbnQgfSBmcm9tIFwiQG9wZW5maW4vd29ya3NwYWNlXCI7XG5pbXBvcnQgdHlwZSB7IFBsYXRmb3JtQXBwIH0gZnJvbSBcIi4uLy4uL3NoYXBlcy9hcHAtc2hhcGVzXCI7XG5pbXBvcnQgdHlwZSB7XG5cdEFwcERlZmluaXRpb24sXG5cdFdlYkFwcERldGFpbHMsXG5cdE5hdGl2ZUFwcERldGFpbHMsXG5cdE9ubGluZU5hdGl2ZUFwcERldGFpbHMsXG5cdEFwcEludGVyb3AsXG5cdEFwcERlZmluaXRpb25UeXBlLFxuXHRBcHBJbnRlbnRzLFxuXHRIb3N0TWFuaWZlc3RzXG59IGZyb20gXCIuLi8uLi9zaGFwZXMvZmRjMy0yLTAtc2hhcGVzXCI7XG5pbXBvcnQgeyBpc0VtcHR5LCBpc09iamVjdCB9IGZyb20gXCIuLi8uLi91dGlsc1wiO1xuXG4vKipcbiAqIE1hcCB0aGUgYXBwIGRlZmluaXRpb24gdG8gYSBwbGF0Zm9ybSBhcHAuXG4gKiBAcGFyYW0gYXBwIFRoZSBhcHAgZGVmaW5pdGlvbiB0byBtYXAuXG4gKiBAcmV0dXJucyBUaGUgcGxhdGZvcm0gYXBwLlxuICovXG5leHBvcnQgZnVuY3Rpb24gbWFwVG9QbGF0Zm9ybUFwcChhcHA6IEFwcERlZmluaXRpb24pOiBQbGF0Zm9ybUFwcCB7XG5cdGNvbnN0IHBsYXRmb3JtQXBwOiBQbGF0Zm9ybUFwcCA9IHtcblx0XHRhcHBJZDogYXBwLmFwcElkLFxuXHRcdG5hbWU6IGFwcC5uYW1lID8/IGFwcC5hcHBJZCxcblx0XHR0aXRsZTogYXBwLnRpdGxlID8/IGFwcC5uYW1lLFxuXHRcdG1hbmlmZXN0VHlwZTogbWFwTWFuaWZlc3RUeXBlRnJvbUZEQzMoYXBwKSxcblx0XHRtYW5pZmVzdDogZ2V0TWFuaWZlc3RGcm9tRkRDMyhhcHApIGFzIHN0cmluZyxcblx0XHRkZXNjcmlwdGlvbjogYXBwLmRlc2NyaXB0aW9uLFxuXHRcdGluc3RhbmNlTW9kZTogYXBwPy5ob3N0TWFuaWZlc3RzPy5PcGVuRmluPy5jb25maWc/Lmluc3RhbmNlTW9kZSxcblx0XHRpbnRlbnRzOiBtYXBJbnRlbnRzRnJvbUZEQzMoYXBwLmludGVyb3ApLFxuXHRcdGludGVyb3A6IGFwcC5pbnRlcm9wLFxuXHRcdGN1c3RvbUNvbmZpZzogYXBwLmN1c3RvbUNvbmZpZyxcblx0XHR0YWdzOiBhcHAuY2F0ZWdvcmllcyxcblx0XHR2ZXJzaW9uOiBhcHAudmVyc2lvbixcblx0XHRwdWJsaXNoZXI6IGFwcC5wdWJsaXNoZXIgPz8gXCJcIixcblx0XHRjb250YWN0RW1haWw6IGFwcC5jb250YWN0RW1haWwsXG5cdFx0c3VwcG9ydEVtYWlsOiBhcHAuc3VwcG9ydEVtYWlsLFxuXHRcdGljb25zOiBhcHAuaWNvbnMgPz8gW10sXG5cdFx0aW1hZ2VzOiBhcHAuc2NyZWVuc2hvdHMsXG5cdFx0cHJpdmF0ZTogYXBwPy5ob3N0TWFuaWZlc3RzPy5PcGVuRmluPy5jb25maWc/LnByaXZhdGUsXG5cdFx0YXV0b3N0YXJ0OiBhcHA/Lmhvc3RNYW5pZmVzdHM/Lk9wZW5GaW4/LmNvbmZpZz8uYXV0b3N0YXJ0LFxuXHRcdGxhdW5jaFByZWZlcmVuY2U6IGFwcD8uaG9zdE1hbmlmZXN0cz8uT3BlbkZpbj8uY29uZmlnPy5sYXVuY2hQcmVmZXJlbmNlXG5cdH07XG5cdHJldHVybiBwbGF0Zm9ybUFwcDtcbn1cblxuLyoqXG4gKiBNYXAgYSBwbGF0Zm9ybSBhcHAgdG8gYW4gRkRDMyAyLjAgYXBwIGRlZmluaXRpb24uXG4gKiBAcGFyYW0gYXBwIFRoZSBhcHAgZGVmaW5pdGlvbiB0byBtYXAuXG4gKiBAcmV0dXJucyBUaGUgZmRjMyAyLjAgYXBwLlxuICovXG5leHBvcnQgZnVuY3Rpb24gbWFwVG9GREMzQXBwKGFwcDogUGxhdGZvcm1BcHApOiBBcHBEZWZpbml0aW9uIHtcblx0Y29uc3QgZmRjM0FwcDogQXBwRGVmaW5pdGlvbiA9IHtcblx0XHRhcHBJZDogYXBwLmFwcElkLFxuXHRcdG5hbWU6IGFwcC5uYW1lID8/IGFwcC5hcHBJZCxcblx0XHR0aXRsZTogYXBwLnRpdGxlID8/IGFwcC5uYW1lLFxuXHRcdHR5cGU6IG1hcFR5cGVGcm9tUGxhdGZvcm1BcHAoYXBwKSxcblx0XHRkZXRhaWxzOiB7fSxcblx0XHRkZXNjcmlwdGlvbjogYXBwLmRlc2NyaXB0aW9uLFxuXHRcdGNhdGVnb3JpZXM6IGFwcC50YWdzID8/IFtdLFxuXHRcdHZlcnNpb246IGFwcC52ZXJzaW9uLFxuXHRcdHB1Ymxpc2hlcjogYXBwLnB1Ymxpc2hlciA/PyBcIlwiLFxuXHRcdGNvbnRhY3RFbWFpbDogYXBwLmNvbnRhY3RFbWFpbCxcblx0XHRzdXBwb3J0RW1haWw6IGFwcC5zdXBwb3J0RW1haWwsXG5cdFx0aWNvbnM6IGFwcC5pY29ucyxcblx0XHRzY3JlZW5zaG90czogYXBwLmltYWdlcyxcblx0XHR0b29sdGlwOiBhcHAudG9vbHRpcCxcblx0XHRpbnRlcm9wOiBnZXRJbnRlcm9wRnJvbVBsYXRmb3JtQXBwKGFwcCksXG5cdFx0aG9zdE1hbmlmZXN0czogZ2V0SG9zdE1hbmlmZXN0c0Zyb21QbGF0Zm9ybUFwcChhcHApXG5cdH07XG5cdHJldHVybiBmZGMzQXBwO1xufVxuXG4vKipcbiAqIE1hcCB0aGUgcGxhdGZvcm0gYXBwIHRvIGFwcCBtZXRhZGF0YS5cbiAqIEBwYXJhbSBhcHAgVGhlIGFwcGxpY2F0aW9uIHRvIG1hcC5cbiAqIEBwYXJhbSByZXN1bHRUeXBlIFRoZSByZXN1bHQgdHlwZSB0byBpbmNsdWRlIGluIHRoZSBkYXRhLlxuICogQHJldHVybnMgVGhlIGFwcCBtZXRhZGF0YS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG1hcFRvQXBwTWV0YURhdGEoYXBwOiBQbGF0Zm9ybUFwcCwgcmVzdWx0VHlwZT86IHN0cmluZyk6IEFwcE1ldGFkYXRhIHtcblx0Y29uc3QgYXBwTWV0YURhdGE6IEFwcE1ldGFkYXRhID0ge1xuXHRcdGFwcElkOiBhcHAuYXBwSWQsXG5cdFx0ZGVzY3JpcHRpb246IGFwcC5kZXNjcmlwdGlvbixcblx0XHRpY29uczogYXBwLmljb25zLFxuXHRcdG5hbWU6IGFwcC5uYW1lLFxuXHRcdHNjcmVlbnNob3RzOiBhcHAuaW1hZ2VzLFxuXHRcdHRpdGxlOiBhcHAudGl0bGUsXG5cdFx0dG9vbHRpcDogYXBwLnRvb2x0aXAsXG5cdFx0dmVyc2lvbjogYXBwLnZlcnNpb24sXG5cdFx0cmVzdWx0VHlwZVxuXHR9O1xuXHRyZXR1cm4gYXBwTWV0YURhdGE7XG59XG5cbi8qKlxuICogTWFwIHRoZSBhcHAgZGVmaW5pdGlvbiBpbnRlcm9wIGRhdGEgdG8gYXBwIGludGVyb3AgZm9ybWF0LlxuICogQHBhcmFtIGludGVyb3AgVGhlIGludGVyb3AgdG8gbWFwLlxuICogQHJldHVybnMgVGhlIGFwcCBpbnRlcm9wLlxuICovXG5leHBvcnQgZnVuY3Rpb24gbWFwSW50ZW50c0Zyb21GREMzKGludGVyb3A6IEFwcEludGVyb3AgfCB1bmRlZmluZWQpOiBBcHBJbnRlbnRbXSB7XG5cdGNvbnN0IGludGVudHM6IEFwcEludGVudFtdID0gW107XG5cblx0Y29uc3QgbGlzdGVuc0ZvciA9IGludGVyb3A/LmludGVudHM/Lmxpc3RlbnNGb3I7XG5cdGlmIChpc0VtcHR5KGxpc3RlbnNGb3IpKSB7XG5cdFx0cmV0dXJuIGludGVudHM7XG5cdH1cblxuXHRjb25zdCBpbnRlbnRJZHMgPSBPYmplY3Qua2V5cyhsaXN0ZW5zRm9yKTtcblx0Zm9yIChjb25zdCBpbnRlbnROYW1lIG9mIGludGVudElkcykge1xuXHRcdGludGVudHMucHVzaCh7XG5cdFx0XHRuYW1lOiBpbnRlbnROYW1lLFxuXHRcdFx0ZGlzcGxheU5hbWU6IGxpc3RlbnNGb3JbaW50ZW50TmFtZV0uZGlzcGxheU5hbWUgPz8gXCJcIixcblx0XHRcdGNvbnRleHRzOiBsaXN0ZW5zRm9yW2ludGVudE5hbWVdLmNvbnRleHRzXG5cdFx0fSk7XG5cdH1cblxuXHRyZXR1cm4gaW50ZW50cztcbn1cblxuLyoqXG4gKiBHZXQgdGhlIGludGVyb3AgZGF0YSBmcm9tIGEgUGxhdGZvcm0gQXBwIGluIEZEQzMgMi4wIGZvcm1hdC5cbiAqIEBwYXJhbSBhcHAgVGhlIHBsYXRmb3JtIGFwcCB0byB1c2UgYXMgYSBzb3VyY2UuXG4gKiBAcmV0dXJucyBUaGUgYXBwIGludGVyb3AgZGVmaW5pdGlvbi5cbiAqL1xuZnVuY3Rpb24gZ2V0SW50ZXJvcEZyb21QbGF0Zm9ybUFwcChhcHA6IFBsYXRmb3JtQXBwKTogQXBwSW50ZXJvcCB7XG5cdGlmICghaXNFbXB0eShhcHAuaW50ZXJvcCkpIHtcblx0XHRyZXR1cm4gYXBwLmludGVyb3A7XG5cdH1cblx0Y29uc3QgaW50ZXJvcDogQXBwSW50ZXJvcCA9IHtcblx0XHRpbnRlbnRzOiB7XG5cdFx0XHRsaXN0ZW5zRm9yOiB7fVxuXHRcdH1cblx0fTtcblxuXHRpZiAoQXJyYXkuaXNBcnJheShhcHAuaW50ZW50cykgJiYgYXBwLmludGVudHMubGVuZ3RoID4gMCkge1xuXHRcdGNvbnN0IGxpc3RlbnNGb3I6IHsgW2tleTogc3RyaW5nXTogQXBwSW50ZW50cyB9ID0ge307XG5cdFx0Zm9yIChjb25zdCBpbnRlbnQgb2YgYXBwLmludGVudHMpIHtcblx0XHRcdGxpc3RlbnNGb3JbaW50ZW50Lm5hbWVdID0geyBkaXNwbGF5TmFtZTogaW50ZW50LmRpc3BsYXlOYW1lLCBjb250ZXh0czogaW50ZW50LmNvbnRleHRzIH07XG5cdFx0fVxuXHRcdGlmICghaXNFbXB0eShpbnRlcm9wLmludGVudHMpKSB7XG5cdFx0XHRpbnRlcm9wLmludGVudHMubGlzdGVuc0ZvciA9IGxpc3RlbnNGb3I7XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIGludGVyb3A7XG59XG5cbi8qKlxuICogTWFwIHRoZSBtYW5pZmVzdCB0eXBlLlxuICogQHBhcmFtIGFwcCBUaGUgYXBwIGRlZmluaXRpb24gdG8gbWFwIHRoZSBtYW5pZmVzdCB0eXBlIGZvci5cbiAqIEByZXR1cm5zIFRoZSBtYXBwZWQgbWFuaWZlc3QgdHlwZS5cbiAqL1xuZnVuY3Rpb24gbWFwTWFuaWZlc3RUeXBlRnJvbUZEQzMoYXBwOiBBcHBEZWZpbml0aW9uKTogc3RyaW5nIHtcblx0bGV0IG1hbmlmZXN0VHlwZTogc3RyaW5nO1xuXG5cdHN3aXRjaCAoYXBwLnR5cGUpIHtcblx0XHRjYXNlIFwid2ViXCI6IHtcblx0XHRcdG1hbmlmZXN0VHlwZSA9IFwiaW5saW5lLXZpZXdcIjtcblx0XHRcdGJyZWFrO1xuXHRcdH1cblx0XHRjYXNlIFwibmF0aXZlXCI6IHtcblx0XHRcdG1hbmlmZXN0VHlwZSA9IFwiaW5saW5lLWV4dGVybmFsXCI7XG5cdFx0XHRicmVhaztcblx0XHR9XG5cdFx0Y2FzZSBcIm9ubGluZU5hdGl2ZVwiOiB7XG5cdFx0XHRtYW5pZmVzdFR5cGUgPSBcImRlc2t0b3AtYnJvd3NlclwiO1xuXHRcdFx0YnJlYWs7XG5cdFx0fVxuXHRcdGNhc2UgXCJvdGhlclwiOiB7XG5cdFx0XHRtYW5pZmVzdFR5cGUgPSBhcHAuaG9zdE1hbmlmZXN0cz8uT3BlbkZpbj8udHlwZSA/PyBcIlwiO1xuXHRcdFx0YnJlYWs7XG5cdFx0fVxuXHRcdGRlZmF1bHQ6IHtcblx0XHRcdG1hbmlmZXN0VHlwZSA9IGFwcC50eXBlO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gbWFuaWZlc3RUeXBlO1xufVxuXG4vKipcbiAqIE1hcHMgdG8gYW4gRkRDMyAyLjAgdHlwZSBmcm9tIHRoZSBtYW5pZmVzdCB0eXBlIHNwZWNpZmllZCBieSBhIHBsYXRmb3JtIGFwcC5cbiAqIEBwYXJhbSBhcHAgdGhlIHBsYXRmb3JtIGFwcCB0byB1c2UgYXMgYSBzb3VyY2VcbiAqIEByZXR1cm5zIHRoZSBGREMzIDIuMCBhcHAgZGVmaW5pdGlvbiB0eXBlXG4gKi9cbmZ1bmN0aW9uIG1hcFR5cGVGcm9tUGxhdGZvcm1BcHAoYXBwOiBQbGF0Zm9ybUFwcCk6IEFwcERlZmluaXRpb25UeXBlIHtcblx0bGV0IHR5cGU6IEFwcERlZmluaXRpb25UeXBlID0gXCJvdGhlclwiO1xuXHRpZiAoaXNFbXB0eShhcHAubWFuaWZlc3RUeXBlKSkge1xuXHRcdHJldHVybiB0eXBlO1xuXHR9XG5cdHN3aXRjaCAoYXBwLm1hbmlmZXN0VHlwZSkge1xuXHRcdGNhc2UgXCJpbmxpbmUtdmlld1wiOiB7XG5cdFx0XHR0eXBlID0gXCJ3ZWJcIjtcblx0XHRcdGJyZWFrO1xuXHRcdH1cblx0XHRjYXNlIFwiaW5saW5lLWV4dGVybmFsXCI6IHtcblx0XHRcdHR5cGUgPSBcIm5hdGl2ZVwiO1xuXHRcdFx0YnJlYWs7XG5cdFx0fVxuXHRcdGNhc2UgXCJkZXNrdG9wLWJyb3dzZXJcIjoge1xuXHRcdFx0dHlwZSA9IFwib25saW5lTmF0aXZlXCI7XG5cdFx0XHRicmVhaztcblx0XHR9XG5cdH1cblx0cmV0dXJuIHR5cGU7XG59XG5cbi8qKlxuICogR2V0IHRoZSBtYW5pZmVzdCB3aGljaCBjYW4gYmUgcGxhaW4gc3RyaW5nIG9yIEpTT04uXG4gKiBAcGFyYW0gYXBwIFRoZSBhcHAgdG8gZ2V0IHRoZSBtYW5pZmVzdCBmcm9tLlxuICogQHJldHVybnMgVGhlIG1hbmlmZXN0LlxuICovXG5mdW5jdGlvbiBnZXRNYW5pZmVzdEZyb21GREMzKGFwcDogQXBwRGVmaW5pdGlvbik6IHN0cmluZyB8IHVua25vd24ge1xuXHRsZXQgbWFuaWZlc3Q6IHN0cmluZyB8IHVua25vd247XG5cblx0c3dpdGNoIChhcHAudHlwZSkge1xuXHRcdGNhc2UgXCJ3ZWJcIjoge1xuXHRcdFx0aWYgKCFpc0VtcHR5KGFwcD8uZGV0YWlscykpIHtcblx0XHRcdFx0Y29uc3QgaG9zdERldGFpbHMgPSBhcHAuaG9zdE1hbmlmZXN0cz8uT3BlbkZpbj8uZGV0YWlscztcblx0XHRcdFx0aWYgKGlzT2JqZWN0KGhvc3REZXRhaWxzKSkge1xuXHRcdFx0XHRcdG1hbmlmZXN0ID0ge1xuXHRcdFx0XHRcdFx0dXJsOiAoYXBwPy5kZXRhaWxzIGFzIFdlYkFwcERldGFpbHMpLnVybCxcblx0XHRcdFx0XHRcdGZkYzNJbnRlcm9wQXBpOiBcIjIuMFwiLFxuXHRcdFx0XHRcdFx0Li4uaG9zdERldGFpbHNcblx0XHRcdFx0XHR9O1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdG1hbmlmZXN0ID0ge1xuXHRcdFx0XHRcdFx0dXJsOiAoYXBwPy5kZXRhaWxzIGFzIFdlYkFwcERldGFpbHMpLnVybCxcblx0XHRcdFx0XHRcdGZkYzNJbnRlcm9wQXBpOiBcIjIuMFwiXG5cdFx0XHRcdFx0fTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0YnJlYWs7XG5cdFx0fVxuXHRcdGNhc2UgXCJuYXRpdmVcIjoge1xuXHRcdFx0aWYgKCFpc0VtcHR5KGFwcD8uZGV0YWlscykpIHtcblx0XHRcdFx0Ly8gb3VyIG5hdGl2ZSBhcGkgc3VwcG9ydHMgcGF0aCBhbmQgYXJndW1lbnRzLlxuXHRcdFx0XHRtYW5pZmVzdCA9IGFwcC5kZXRhaWxzIGFzIE5hdGl2ZUFwcERldGFpbHM7XG5cdFx0XHR9XG5cdFx0XHRicmVhaztcblx0XHR9XG5cdFx0Y2FzZSBcIm9ubGluZU5hdGl2ZVwiOiB7XG5cdFx0XHRpZiAoIWlzRW1wdHkoYXBwPy5kZXRhaWxzKSkge1xuXHRcdFx0XHRtYW5pZmVzdCA9IChhcHA/LmRldGFpbHMgYXMgT25saW5lTmF0aXZlQXBwRGV0YWlscykudXJsO1xuXHRcdFx0fVxuXHRcdFx0YnJlYWs7XG5cdFx0fVxuXHRcdGNhc2UgXCJvdGhlclwiOiB7XG5cdFx0XHRtYW5pZmVzdCA9IGFwcC5ob3N0TWFuaWZlc3RzPy5PcGVuRmluPy5kZXRhaWxzO1xuXHRcdFx0YnJlYWs7XG5cdFx0fVxuXHRcdGRlZmF1bHQ6IHtcblx0XHRcdG1hbmlmZXN0ID0gYXBwLmRldGFpbHM7XG5cdFx0fVxuXHR9XG5cdHJldHVybiBtYW5pZmVzdDtcbn1cblxuLyoqXG4gKiBHZXQgdGhlIEhvc3QgRGV0YWlscyBmcm9tIHRoZSBwbGF0Zm9ybSBhcHAgZm9yIHRoaXMgRkRDMyAyLjAgQXBwIERlZmluaXRpb24uXG4gKiBAcGFyYW0gYXBwIFRoZSBwbGF0Zm9ybSBhcHAgdG8gZ2V0IHRoZSBpbmZvcm1hdGlvbiBmcm9tLlxuICogQHJldHVybnMgVGhlIGhvc3Qgc3BlY2lmaWMgZGV0YWlscy5cbiAqL1xuZnVuY3Rpb24gZ2V0SG9zdE1hbmlmZXN0c0Zyb21QbGF0Zm9ybUFwcChhcHA6IFBsYXRmb3JtQXBwKTogSG9zdE1hbmlmZXN0cyB7XG5cdGNvbnN0IGhvc3RNYW5pZmVzdHM6IEhvc3RNYW5pZmVzdHMgPSB7XG5cdFx0T3BlbkZpbjoge1xuXHRcdFx0dHlwZTogYXBwLm1hbmlmZXN0VHlwZSxcblx0XHRcdGRldGFpbHM6IGFwcC5tYW5pZmVzdCxcblx0XHRcdGNvbmZpZzoge1xuXHRcdFx0XHRhdXRvc3RhcnQ6IGFwcC5hdXRvc3RhcnQsXG5cdFx0XHRcdHByaXZhdGU6IGFwcC5wcml2YXRlLFxuXHRcdFx0XHRpbnN0YW5jZU1vZGU6IGFwcC5pbnN0YW5jZU1vZGUsXG5cdFx0XHRcdGxhdW5jaFByZWZlcmVuY2U6IGFwcC5sYXVuY2hQcmVmZXJlbmNlXG5cdFx0XHR9XG5cdFx0fVxuXHR9O1xuXHRyZXR1cm4gaG9zdE1hbmlmZXN0cztcbn1cbiIsImltcG9ydCB0eXBlIHsgTWFuaWZlc3RUeXBlcyB9IGZyb20gXCIuL3NoYXBlcy9hcHAtc2hhcGVzXCI7XG5cbmV4cG9ydCBjb25zdCBNQU5JRkVTVF9UWVBFUzogTWFuaWZlc3RUeXBlcyA9IHtcblx0Vmlldzoge1xuXHRcdGlkOiBcInZpZXdcIixcblx0XHRsYWJlbDogXCJWaWV3XCIsXG5cdFx0ZGVzY3JpcHRpb246XG5cdFx0XHRcIlRoaXMgbWFuaWZlc3QgdHlwZSBleHBlY3RzIHRoZSBtYW5pZmVzdCBzZXR0aW5nIHRvIGJlIHBvaW50ZWQgdG8gYSBqc29uIGZpbGUgdGhhdCBjb250YWlucyB2aWV3IG9wdGlvbnMuXCJcblx0fSxcblx0SW5saW5lVmlldzoge1xuXHRcdGlkOiBcImlubGluZS12aWV3XCIsXG5cdFx0bGFiZWw6IFwiVmlld1wiLFxuXHRcdGRlc2NyaXB0aW9uOlxuXHRcdFx0XCJUaGlzIG1hbmlmZXN0IHR5cGUgZXhwZWN0cyB0aGUgbWFuaWZlc3Qgc2V0dGluZyB0byBoYXZlIHRoZSBvcHRpb25zIGlubGluZSByYXRoZXIgdGhhbiBhIHVybCB0byBhIGpzb24gZmlsZS5cIlxuXHR9LFxuXHRXaW5kb3c6IHtcblx0XHRpZDogXCJ3aW5kb3dcIixcblx0XHRsYWJlbDogXCJXaW5kb3dcIixcblx0XHRkZXNjcmlwdGlvbjpcblx0XHRcdFwiVGhpcyBtYW5pZmVzdCB0eXBlIGV4cGVjdHMgdGhlIG1hbmlmZXN0IHNldHRpbmcgdG8gcG9pbnQgdG8gYSBqc29uIGZpbGUgdGhhdCBjb250YWlucyBjbGFzc2ljIHdpbmRvdyBvcHRpb25zLlwiXG5cdH0sXG5cdElubGluZVdpbmRvdzoge1xuXHRcdGlkOiBcImlubGluZS13aW5kb3dcIixcblx0XHRsYWJlbDogXCJXaW5kb3dcIixcblx0XHRkZXNjcmlwdGlvbjpcblx0XHRcdFwiVGhpcyBtYW5pZmVzdCB0eXBlIGV4cGVjdHMgdGhlIG1hbmlmZXN0IHNldHRpbmcgdG8gaGF2ZSB0aGUgY2xhc3NpYyB3aW5kb3cgb3B0aW9ucyBpbmxpbmUgcmF0aGVyIHRoYW4gYSB1cmwgdG8gYSBqc29uIGZpbGUuXCJcblx0fSxcblx0U25hcHNob3Q6IHtcblx0XHRpZDogXCJzbmFwc2hvdFwiLFxuXHRcdGxhYmVsOiBcIlNuYXBzaG90XCIsXG5cdFx0ZGVzY3JpcHRpb246XG5cdFx0XHRcIlRoaXMgbWFuaWZlc3QgdHlwZSBleHBlY3RzIHRoZSBtYW5pZmVzdCBzZXR0aW5nIHRvIHBvaW50IHRvIGEganNvbiBmaWxlIHRoYXQgY29udGFpbnMgYSBzbmFwc2hvdCAob25lIG9yIG1vcmUgd2luZG93cylcIlxuXHR9LFxuXHRJbmxpbmVTbmFwc2hvdDoge1xuXHRcdGlkOiBcImlubGluZS1zbmFwc2hvdFwiLFxuXHRcdGxhYmVsOiBcIlNuYXBzaG90XCIsXG5cdFx0ZGVzY3JpcHRpb246XG5cdFx0XHRcIlRoaXMgbWFuaWZlc3QgdHlwZSBleHBlY3RzIHRoZSBtYW5pZmVzdCBzZXR0aW5nIHRvIGhhdmUgYSBzbmFwc2hvdCBpbmxpbmUgcmF0aGVyIHRoYW4gYSB1cmwgdG8gYSBqc29uIGZpbGUgdGhhdCBjb250YWlucyBhIHNuYXBzaG90IChvbmUgb3IgbW9yZSB3aW5kb3dzKVwiXG5cdH0sXG5cdE1hbmlmZXN0OiB7XG5cdFx0aWQ6IFwibWFuaWZlc3RcIixcblx0XHRsYWJlbDogXCJBcHBcIixcblx0XHRkZXNjcmlwdGlvbjpcblx0XHRcdFwiVGhpcyBtYW5pZmVzdCB0eXBlIGV4cGVjdHMgdGhlIG1hbmlmZXN0IHNldHRpbmcgdG8gcG9pbnQgdG8gYSBqc29uIGZpbGUgdGhhdCBpcyBhbiBvcGVuZmluIG1hbmlmZXN0LiBBbiBvcGVuZmluIGFwcC5cIlxuXHR9LFxuXHRFeHRlcm5hbDoge1xuXHRcdGlkOiBcImV4dGVybmFsXCIsXG5cdFx0bGFiZWw6IFwiTmF0aXZlIEFwcFwiLFxuXHRcdGRlc2NyaXB0aW9uOiBcIlRoaXMgbWFuaWZlc3QgdHlwZSBleHBlY3RzIHRoZSBtYW5pZmVzdCBzZXR0aW5nIHRvIHBvaW50IHRvIGFuIGV4ZS5cIlxuXHR9LFxuXHRJbmxpbmVFeHRlcm5hbDoge1xuXHRcdGlkOiBcImlubGluZS1leHRlcm5hbFwiLFxuXHRcdGxhYmVsOiBcIk5hdGl2ZSBBcHBcIixcblx0XHRkZXNjcmlwdGlvbjpcblx0XHRcdFwiVGhpcyBtYW5pZmVzdCB0eXBlIGV4cGVjdHMgdGhlIG1hbmlmZXN0IHNldHRpbmcgdG8gcG9pbnQgdG8gYW4gZXhlIHVzaW5nIGFuIGlubGluZSBsYXVuY2ggZXh0ZXJuYWwgcHJvY2VzcyByZXF1ZXN0LlwiXG5cdH0sXG5cdEFwcGFzc2V0OiB7XG5cdFx0aWQ6IFwiYXBwYXNzZXRcIixcblx0XHRsYWJlbDogXCJOYXRpdmUgQXBwXCIsXG5cdFx0ZGVzY3JpcHRpb246IFwiVGhpcyBtYW5pZmVzdCB0eXBlIGV4cGVjdHMgdGhlIG1hbmlmZXN0IHNldHRpbmcgdG8gcG9pbnQgdG8gYW4gYXBwIGFzc2V0IG5hbWUuXCJcblx0fSxcblx0SW5saW5lQXBwQXNzZXQ6IHtcblx0XHRpZDogXCJpbmxpbmUtYXBwYXNzZXRcIixcblx0XHRsYWJlbDogXCJOYXRpdmUgQXBwXCIsXG5cdFx0ZGVzY3JpcHRpb246XG5cdFx0XHRcIlRoaXMgbWFuaWZlc3QgdHlwZSBleHBlY3RzIHRoZSBtYW5pZmVzdCBzZXR0aW5nIHRvIHBvaW50IHRvIGFuIGFwcCBhc3NldCBjb25maWcgdXNpbmcgYW4gaW5saW5lIGxhdW5jaCBleHRlcm5hbCBwcm9jZXNzIHJlcXVlc3QuXCJcblx0fSxcblx0RGVza3RvcEJyb3dzZXI6IHtcblx0XHRpZDogXCJkZXNrdG9wLWJyb3dzZXJcIixcblx0XHRsYWJlbDogXCJEZXNrdG9wIEJyb3dzZXJcIixcblx0XHRkZXNjcmlwdGlvbjpcblx0XHRcdFwiVGhpcyBtYW5pZmVzdCB0eXBlIGV4cGVjdHMgdGhlIG1hbmlmZXN0IHNldHRpbmcgdG8gcG9pbnQgdG8gYSB1cmwgd2hpY2ggd2lsbCBiZSBsYXVuY2hlZCBpbiB0aGUgZGVmYXVsdCBkZXNrdG9wIGJyb3dzZXIuXCJcblx0fSxcblx0RW5kcG9pbnQ6IHtcblx0XHRpZDogXCJlbmRwb2ludFwiLFxuXHRcdGxhYmVsOiBcIkVuZHBvaW50XCIsXG5cdFx0ZGVzY3JpcHRpb246XG5cdFx0XHRcIlRoaXMgbWFuaWZlc3QgdHlwZSBleHBlY3RzIHRoZSBtYW5pZmVzdCBzZXR0aW5nIHRvIHBvaW50IHRvIGFuIGVuZHBvaW50ICh3aGljaCBzaG91bGQgYmUgZGVmaW5lZCBpbiB0aGUgZW5kcG9pbnRQcm92aWRlcikuIEFjdGlvbiB3aWxsIGJlIGNhbGxlZCBvbiB0aGF0IGVuZHBvaW50IGFuZCBwYXNzZWQgdGhlIHNwZWNpZmllZCBhcHAuXCJcblx0fSxcblx0Q29ubmVjdGlvbjoge1xuXHRcdGlkOiBcImNvbm5lY3Rpb25cIixcblx0XHRsYWJlbDogXCJDb25uZWN0ZWQgQXBwXCIsXG5cdFx0ZGVzY3JpcHRpb246XG5cdFx0XHRcIlRoaXMgbWFuaWZlc3QgdHlwZSBleHBlY3RzIHRoZSBtYW5pZmVzdCBzZXR0aW5nIHRvIGhhdmUgYSB1dWlkLiBUaGlzIG11c3QgbWF0Y2ggdG8gYSBjb25uZWN0aW9uIHJlZ2lzdGVyZWQgaW4gdGhlIGNvbm5lY3Rpb25Qcm92aWRlciB3aXRoIGFwcCBzdXBwb3J0LlwiXG5cdH0sXG5cdFVucmVnaXN0ZXJlZEFwcDoge1xuXHRcdGlkOiBcInVucmVnaXN0ZXJlZC1hcHBcIixcblx0XHRsYWJlbDogXCJVbnJlZ2lzdGVyZWQgQXBwXCIsXG5cdFx0ZGVzY3JpcHRpb246XG5cdFx0XHRcIlRoaXMgbWFuaWZlc3QgdHlwZSByZXByZXNlbnRzIHdlYiBwYWdlIGluc3RhbmNlcyB0aGF0IGhhdmUgYmVlbiBsYXVuY2hlZCB0aGF0IGFyZSBub3QgbGlua2VkIHRvIGFuIGFwcC4gVGhpcyBtYW5pZmVzdCB0eXBlIHNob3VsZCBub3QgYmUgaW4gdGhlIHBlcm1pdHRlZCBtYW5pZmVzdCB0eXBlIGxpc3QgZm9yIGFwcCBmZWVkcyBhcyBpdCBpcyBmb3IgZHluYW1pYyB1cmxzLlwiXG5cdH1cbn07XG4iLCJpbXBvcnQgdHlwZSBPcGVuRmluIGZyb20gXCJAb3BlbmZpbi9jb3JlXCI7XG5pbXBvcnQgdHlwZSB7IEJyb3dzZXJQcm92aWRlck9wdGlvbnMsIFdpbmRvd1Bvc2l0aW9uaW5nT3B0aW9ucyB9IGZyb20gXCIuL3NoYXBlcy9icm93c2VyLXNoYXBlc1wiO1xuaW1wb3J0IHsgaXNFbXB0eSB9IGZyb20gXCIuL3V0aWxzXCI7XG5cbi8qKlxuICogUHJvdmlkZXMgeCBhbmQgeSBjby1vcmRpbmF0ZXMgdG8gcG9zaXRpb24gYSB3aW5kb3cgb2YgYSBnaXZlbiBzaXplIGluIHJlbGF0aW9uIHRvIGFub3RoZXIgd2luZG93L3ZpZXcuXG4gKiBAcGFyYW0gY2xpZW50SWRlbnRpdHkgVGhlIGlkZW50aXR5IG9mIHRoZSB2aWV3L3dpbmRvdyB0aGVzZSB4L3kgY28tb3JkaW5hdGVzIHNob3VsZCBiZSBpbiByZWxhdGlvbiB0by5cbiAqIEBwYXJhbSBkaW1lbnNpb25zIFRoZSBkaW1lbnNpb25zIG9mIHRoZSB3aW5kb3cgdGhhdCB3aWxsIGJlIHBsYWNlZCBpbiB0aGUgY2VudGVyIG9mIHRoZSBzY3JlZW4uXG4gKiBAcGFyYW0gZGltZW5zaW9ucy53aWR0aCBUaGUgd2lkdGggb2YgdGhlIHdpbmRvdyB0aGF0IGlzIGdvaW5nIHRvIGJlIHBsYWNlZC5cbiAqIEBwYXJhbSBkaW1lbnNpb25zLmhlaWdodCBUaGUgaGVpZ2h0IG9mIHRoZSB3aW5kb3cgdGhhdCBpcyBnb2luZyB0byBiZSBwbGFjZWQuXG4gKiBAcmV0dXJucyBUaGUgeCwgeSBjby1vcmRpbmF0ZXMgdG8gcG9zaXRpb24gdGhlIHdpbmRvd1xuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gY2VudGVyQ29udGVudEluSWRlbnRpdHkoXG5cdGNsaWVudElkZW50aXR5OiBPcGVuRmluLklkZW50aXR5LFxuXHRkaW1lbnNpb25zOiB7IHdpZHRoOiBudW1iZXI7IGhlaWdodDogbnVtYmVyIH1cbik6IFByb21pc2U8eyB4OiBudW1iZXI7IHk6IG51bWJlciB9IHwgdW5kZWZpbmVkPiB7XG5cdGNvbnN0IGJvdW5kcyA9IGF3YWl0IGdldElkZW50aXR5Qm91bmRzKGNsaWVudElkZW50aXR5KTtcblx0Y29uc3QgYm91bmRzQ2VudGVyID0gZ2V0Qm91bmRzQ2VudGVyKGJvdW5kcyk7XG5cdGNvbnN0IG1vbml0b3JJbmZvID0gYXdhaXQgZmluZE1vbml0b3JDb250YWluaW5nUG9pbnQoYm91bmRzQ2VudGVyKTtcblx0cmV0dXJuIGNlbnRlckNvbnRlbnRJblJlY3QobW9uaXRvckluZm8uYXZhaWxhYmxlUmVjdCwgZGltZW5zaW9ucyk7XG59XG5cbi8qKlxuICogUHJvdmlkZXMgeCBhbmQgeSBjby1vcmRpbmF0ZXMgdG8gcG9zaXRpb24gY29udGVudCBvZiBhIGdpdmVuIHNpemUgaW4gcmVsYXRpb24gdG8gYSByZWN0LlxuICogQHBhcmFtIGF2YWlsYWJsZVJlY3QgVGhlIGF2YWlsYWJsZSByZWN0IHRvIHBvc2l0aW9uIHRoZSBjb250ZW50IGluLlxuICogQHBhcmFtIGF2YWlsYWJsZVJlY3QubGVmdCBUaGUgYXZhaWxhYmxlIHJlY3QgbGVmdCB0byBwb3NpdGlvbiB0aGUgY29udGVudCBpbi5cbiAqIEBwYXJhbSBhdmFpbGFibGVSZWN0LnRvcCBUaGUgYXZhaWxhYmxlIHJlY3QgdG9wIHRvIHBvc2l0aW9uIHRoZSBjb250ZW50IGluLlxuICogQHBhcmFtIGF2YWlsYWJsZVJlY3QucmlnaHQgVGhlIGF2YWlsYWJsZSByZWN0IHJpZ2h0IHRvIHBvc2l0aW9uIHRoZSBjb250ZW50IGluLlxuICogQHBhcmFtIGF2YWlsYWJsZVJlY3QuYm90dG9tIFRoZSBhdmFpbGFibGUgcmVjdCBib3R0b20gdG8gcG9zaXRpb24gdGhlIGNvbnRlbnQgaW4uXG4gKiBAcGFyYW0gY29udGVudERpbWVuc2lvbnMgVGhlIGRpbWVuc2lvbnMgb2YgdGhlIGNvbnRlbnQgdGhhdCB3aWxsIGJlIHBsYWNlZCBpbiB0aGUgY2VudGVyIG9mIHRoZSBzY3JlZW4uXG4gKiBAcGFyYW0gY29udGVudERpbWVuc2lvbnMud2lkdGggVGhlIHdpZHRoIG9mIHRoZSBjb250ZW50IHRoYXQgaXMgZ29pbmcgdG8gYmUgcGxhY2VkLlxuICogQHBhcmFtIGNvbnRlbnREaW1lbnNpb25zLmhlaWdodCBUaGUgaGVpZ2h0IG9mIHRoZSBjb250ZW50IHRoYXQgaXMgZ29pbmcgdG8gYmUgcGxhY2VkLlxuICogQHJldHVybnMgVGhlIHgsIHkgY28tb3JkaW5hdGVzIHRvIHBvc2l0aW9uIHRoZSBjb250ZW50XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjZW50ZXJDb250ZW50SW5SZWN0KFxuXHRhdmFpbGFibGVSZWN0OiB7IGxlZnQ6IG51bWJlcjsgdG9wOiBudW1iZXI7IHJpZ2h0OiBudW1iZXI7IGJvdHRvbTogbnVtYmVyIH0sXG5cdGNvbnRlbnREaW1lbnNpb25zOiB7IHdpZHRoOiBudW1iZXI7IGhlaWdodDogbnVtYmVyIH1cbik6IHsgeDogbnVtYmVyOyB5OiBudW1iZXIgfSB7XG5cdGNvbnN0IGhlaWdodCA9IGF2YWlsYWJsZVJlY3QuYm90dG9tIC0gYXZhaWxhYmxlUmVjdC50b3A7XG5cdGNvbnN0IHdpZHRoID0gYXZhaWxhYmxlUmVjdC5yaWdodCAtIGF2YWlsYWJsZVJlY3QubGVmdDtcblx0Y29uc3QgZGl2aWRlZFJlY3RXaWR0aCA9IHdpZHRoIC8gMjtcblx0Y29uc3QgZGl2aWRlZFJlY3RIZWlnaHQgPSBoZWlnaHQgLyAyO1xuXHRjb25zdCBkaXZpZGVkRGltZW5zaW9uV2lkdGggPSBjb250ZW50RGltZW5zaW9ucy53aWR0aCAvIDI7XG5cdGNvbnN0IGRpdmlkZWREaW1lbnNpb25IZWlnaHQgPSBjb250ZW50RGltZW5zaW9ucy5oZWlnaHQgLyAyO1xuXHRjb25zdCB4ID0gYXZhaWxhYmxlUmVjdC5sZWZ0ICsgZGl2aWRlZFJlY3RXaWR0aCAtIGRpdmlkZWREaW1lbnNpb25XaWR0aDtcblx0Y29uc3QgeSA9IGF2YWlsYWJsZVJlY3QudG9wICsgZGl2aWRlZFJlY3RIZWlnaHQgLSBkaXZpZGVkRGltZW5zaW9uSGVpZ2h0O1xuXG5cdHJldHVybiB7IHg6IE1hdGgucm91bmQoeCksIHk6IE1hdGgucm91bmQoeSkgfTtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBtb25pdG9yIGRldGFpbHMgZm9yIHRoZSBtb25pdG9yIGEgdmlldy93aW5kb3cgaXMgcGxhY2VkIG9uLlxuICogQHBhcmFtIGNsaWVudElkZW50aXR5IFRoZSBpZGVudGl0eSBvZiB0aGUgdmlldy93aW5kb3cgdG8gY2hlY2sgYWdhaW5zdC5cbiAqIEByZXR1cm5zIFRoZSBtb25pdG9yIHRoZSB2aWV3L3dpbmRvdyBsaXZlcyBvbiBvciB1bmRlZmluZWQgaWYgbm8gbWF0Y2ggd2FzIGZvdW5kLlxuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0SWRlbnRpdHlCb3VuZHMoXG5cdGNsaWVudElkZW50aXR5OiBPcGVuRmluLklkZW50aXR5XG4pOiBQcm9taXNlPE9wZW5GaW4uQm91bmRzIHwgdW5kZWZpbmVkPiB7XG5cdGxldCBib3VuZHM6IE9wZW5GaW4uQm91bmRzIHwgdW5kZWZpbmVkO1xuXHRsZXQgY3VycmVudFdpbmRvdzogT3BlbkZpbi5XaW5kb3cgfCB1bmRlZmluZWQ7XG5cblx0dHJ5IHtcblx0XHRjb25zdCB0YXJnZXRWaWV3ID0gZmluLlZpZXcud3JhcFN5bmMoY2xpZW50SWRlbnRpdHkpO1xuXHRcdGN1cnJlbnRXaW5kb3cgPSBhd2FpdCB0YXJnZXRWaWV3LmdldEN1cnJlbnRXaW5kb3coKTtcblx0fSBjYXRjaCB7XG5cdFx0Ly8gd2Ugd2VyZSBub3QgcGFzc2VkIGEgdmlldy5cblx0fVxuXG5cdGlmIChpc0VtcHR5KGJvdW5kcykpIHtcblx0XHR0cnkge1xuXHRcdFx0Y29uc3QgdGFyZ2V0V2luZG93ID0gY3VycmVudFdpbmRvdyA/PyBmaW4uV2luZG93LndyYXBTeW5jKGNsaWVudElkZW50aXR5KTtcblx0XHRcdGJvdW5kcyA9IGF3YWl0IHRhcmdldFdpbmRvdy5nZXRCb3VuZHMoKTtcblx0XHR9IGNhdGNoIHtcblx0XHRcdC8vIGl0IHdhc24ndCBhIHdpbmRvd1xuXHRcdH1cblx0fVxuXG5cdGlmIChpc0VtcHR5KGJvdW5kcykpIHtcblx0XHR0cnkge1xuXHRcdFx0Ym91bmRzID0gYXdhaXQgZmluLm1lLmdldEJvdW5kcygpO1xuXHRcdH0gY2F0Y2gge1xuXHRcdFx0Ly8gdW5hYmxlIHRvIGdldCBvd24gYm91bmRzXG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIGJvdW5kcztcbn1cblxuLyoqXG4gKiBGaW5kIHRoZSBtb25pdG9yIHdoaWNoIGNvbnRhaW5zIHRoZSBwb2ludCBhbmQgcmV0dXJucyBpdC5cbiAqIEBwYXJhbSBwb2ludCBUaGUgcG9pbnQgY29vcmQgdG8gbG9jYXRlLlxuICogQHBhcmFtIHBvaW50LnggVGhlIHggY29vcmRcbiAqIEBwYXJhbSBwb2ludC55IFRoZSB5IGNvb3JkXG4gKiBAcmV0dXJucyBUaGUgbW9uaXRvciBjb250YWluaW5nIHRoZSBwb2ludC5cbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGZpbmRNb25pdG9yQ29udGFpbmluZ1BvaW50KHBvaW50OiB7XG5cdHg/OiBudW1iZXI7XG5cdHk/OiBudW1iZXI7XG59KTogUHJvbWlzZTxPcGVuRmluLk1vbml0b3JEZXRhaWxzPiB7XG5cdGNvbnN0IG1vbml0b3JJbmZvID0gYXdhaXQgZmluLlN5c3RlbS5nZXRNb25pdG9ySW5mbygpO1xuXG5cdGNvbnN0IHggPSBwb2ludC54O1xuXHRjb25zdCB5ID0gcG9pbnQueTtcblx0aWYgKCFpc0VtcHR5KHgpICYmICFpc0VtcHR5KHkpKSB7XG5cdFx0Zm9yIChjb25zdCBtb25pdG9yIG9mIG1vbml0b3JJbmZvLm5vblByaW1hcnlNb25pdG9ycykge1xuXHRcdFx0aWYgKHBvaW50SW5SZWN0KHsgeCwgeSB9LCBtb25pdG9yLm1vbml0b3JSZWN0KSkge1xuXHRcdFx0XHRyZXR1cm4gbW9uaXRvcjtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gbW9uaXRvckluZm8ucHJpbWFyeU1vbml0b3I7XG59XG5cbi8qKlxuICogSXMgdGhlIHBvaW50IGluIHRoZSByZWN0YW5nbGUuXG4gKiBAcGFyYW0gcG9pbnQgVGhlIGNvb3JkIHRvIG1hdGNoLlxuICogQHBhcmFtIHBvaW50LnggVGhlIHggY29vcmQuXG4gKiBAcGFyYW0gcG9pbnQueSBUaGUgeSBjb29yZC5cbiAqIEBwYXJhbSByZWN0IFRoZSByZWN0LlxuICogQHBhcmFtIHJlY3QudG9wIFRoZSByZWN0IHRvcC5cbiAqIEBwYXJhbSByZWN0LmxlZnQgVGhlIHJlY3QgbGVmdC5cbiAqIEBwYXJhbSByZWN0LmJvdHRvbSBUaGUgcmVjdCBib3R0b20uXG4gKiBAcGFyYW0gcmVjdC5yaWdodCBUaGUgcmVjdCByaWdodC5cbiAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHBvaW50IGlzIGluIHRoZSByZWN0LlxuICovXG5leHBvcnQgZnVuY3Rpb24gcG9pbnRJblJlY3QoXG5cdHBvaW50OiB7IHg6IG51bWJlcjsgeTogbnVtYmVyIH0sXG5cdHJlY3Q6IHtcblx0XHR0b3A6IG51bWJlcjtcblx0XHRsZWZ0OiBudW1iZXI7XG5cdFx0Ym90dG9tOiBudW1iZXI7XG5cdFx0cmlnaHQ6IG51bWJlcjtcblx0fVxuKTogYm9vbGVhbiB7XG5cdHJldHVybiBwb2ludC54ID49IHJlY3QubGVmdCAmJiBwb2ludC54IDw9IHJlY3QucmlnaHQgJiYgcG9pbnQueSA+PSByZWN0LnRvcCAmJiBwb2ludC55IDw9IHJlY3QuYm90dG9tO1xufVxuXG4vKipcbiAqIEdldCB0aGUgY2VudGVyIGZvciBhIGJvdW5kaW5nIHJlY3RhbmdsZS5cbiAqIEBwYXJhbSBib3VuZHMgVGhlIHJlY3RcbiAqIEBwYXJhbSBib3VuZHMudG9wIFRoZSByZWN0IHRvcFxuICogQHBhcmFtIGJvdW5kcy5sZWZ0IFRoZSByZWN0IGxlZnRcbiAqIEBwYXJhbSBib3VuZHMud2lkdGggVGhlIHJlY3Qgd2lkdGhcbiAqIEBwYXJhbSBib3VuZHMuaGVpZ2h0IFRoZSByZWN0IGhlaWdodFxuICogQHJldHVybnMgdGhlIHggYW5kIHkgb2YgdGhlIGJvdW5kcyBjZW50ZXIgb3IgYW4gb2JqZWN0IG5vdCBjb250YWluaW5nIHggb3IgeS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldEJvdW5kc0NlbnRlcihib3VuZHM/OiBPcGVuRmluLkJvdW5kcyk6IHsgeD86IG51bWJlcjsgeT86IG51bWJlciB9IHtcblx0bGV0IGJvdW5kc0NlbnRlclg6IG51bWJlciB8IHVuZGVmaW5lZDtcblx0bGV0IGJvdW5kc0NlbnRlclk6IG51bWJlciB8IHVuZGVmaW5lZDtcblx0aWYgKCFpc0VtcHR5KGJvdW5kcykpIHtcblx0XHRjb25zdCBoYWxmV2lkdGggPSBib3VuZHMud2lkdGggLyAyO1xuXHRcdGNvbnN0IGhhbGZIZWlnaHQgPSBib3VuZHMuaGVpZ2h0IC8gMjtcblx0XHRib3VuZHNDZW50ZXJYID0gYm91bmRzLmxlZnQgKyBoYWxmV2lkdGg7XG5cdFx0Ym91bmRzQ2VudGVyWSA9IGJvdW5kcy50b3AgKyBoYWxmSGVpZ2h0O1xuXHRcdHJldHVybiB7IHg6IE1hdGgucm91bmQoYm91bmRzQ2VudGVyWCksIHk6IE1hdGgucm91bmQoYm91bmRzQ2VudGVyWSkgfTtcblx0fVxuXHRyZXR1cm4ge307XG59XG5cbi8qKlxuICogR2l2ZW4gYnJvd3NlciBzZXR0aW5ncyB3aGF0IHdpbmRvdyBwb3NpdGlvbmluZyBvcHRpb25zIHNob3VsZCBiZSB1c2VkP1xuICogQHBhcmFtIHNldHRpbmdzIFRoZSBicm93c2VyIHNldHRpbmdzIHRoYXQgaGF2ZSBiZWVuIHByb3ZpZGVkLlxuICogQHJldHVybnMgYSBzZXQgb2Ygd2luZG93IHBvc2l0aW9uaW5nIG9wdGlvbnMuXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRXaW5kb3dQb3NpdGlvbk9wdGlvbnMoXG5cdHNldHRpbmdzPzogQnJvd3NlclByb3ZpZGVyT3B0aW9uc1xuKTogUHJvbWlzZTxXaW5kb3dQb3NpdGlvbmluZ09wdGlvbnM+IHtcblx0Y29uc3Qgd2luZG93UG9zaXRpb25pbmdPcHRpb25zOiBXaW5kb3dQb3NpdGlvbmluZ09wdGlvbnMgPSB7fTtcblx0d2luZG93UG9zaXRpb25pbmdPcHRpb25zLmRlZmF1bHRzID0ge307XG5cdGlmICghaXNFbXB0eShzZXR0aW5ncykpIHtcblx0XHR3aW5kb3dQb3NpdGlvbmluZ09wdGlvbnMud2luZG93UG9zaXRpb25pbmdTdHJhdGVneSA9IHNldHRpbmdzLndpbmRvd1Bvc2l0aW9uaW5nU3RyYXRlZ3k7XG5cdFx0d2luZG93UG9zaXRpb25pbmdPcHRpb25zLmRpc2FibGVXaW5kb3dQb3NpdGlvbmluZ1N0cmF0ZWd5ID0gc2V0dGluZ3MuZGlzYWJsZVdpbmRvd1Bvc2l0aW9uaW5nU3RyYXRlZ3k7XG5cdFx0aWYgKCFpc0VtcHR5KHNldHRpbmdzPy5kZWZhdWx0V2luZG93T3B0aW9ucz8uZGVmYXVsdExlZnQpKSB7XG5cdFx0XHR3aW5kb3dQb3NpdGlvbmluZ09wdGlvbnMuZGVmYXVsdHMubGVmdCA9IHNldHRpbmdzLmRlZmF1bHRXaW5kb3dPcHRpb25zLmRlZmF1bHRMZWZ0O1xuXHRcdH1cblx0XHRpZiAoIWlzRW1wdHkoc2V0dGluZ3M/LmRlZmF1bHRXaW5kb3dPcHRpb25zPy5kZWZhdWx0VG9wKSkge1xuXHRcdFx0d2luZG93UG9zaXRpb25pbmdPcHRpb25zLmRlZmF1bHRzLnRvcCA9IHNldHRpbmdzLmRlZmF1bHRXaW5kb3dPcHRpb25zLmRlZmF1bHRUb3A7XG5cdFx0fVxuXHR9XG5cdGlmIChpc0VtcHR5KHdpbmRvd1Bvc2l0aW9uaW5nT3B0aW9ucy5kZWZhdWx0cy5sZWZ0KSB8fCBpc0VtcHR5KHdpbmRvd1Bvc2l0aW9uaW5nT3B0aW9ucy5kZWZhdWx0cy50b3ApKSB7XG5cdFx0Y29uc3QgYXBwID0gYXdhaXQgZmluLkFwcGxpY2F0aW9uLmdldEN1cnJlbnQoKTtcblx0XHRjb25zdCBwbGF0Zm9ybU1hbmlmZXN0OiBPcGVuRmluLk1hbmlmZXN0ID0gYXdhaXQgYXBwLmdldE1hbmlmZXN0KCk7XG5cdFx0aWYgKCFpc0VtcHR5KHBsYXRmb3JtTWFuaWZlc3Q/LnBsYXRmb3JtPy5kZWZhdWx0V2luZG93T3B0aW9ucz8uZGVmYXVsdExlZnQpKSB7XG5cdFx0XHR3aW5kb3dQb3NpdGlvbmluZ09wdGlvbnMuZGVmYXVsdHMubGVmdCA9IHBsYXRmb3JtTWFuaWZlc3QucGxhdGZvcm0uZGVmYXVsdFdpbmRvd09wdGlvbnMuZGVmYXVsdExlZnQ7XG5cdFx0fVxuXHRcdGlmICghaXNFbXB0eShwbGF0Zm9ybU1hbmlmZXN0Py5wbGF0Zm9ybT8uZGVmYXVsdFdpbmRvd09wdGlvbnM/LmRlZmF1bHRUb3ApKSB7XG5cdFx0XHR3aW5kb3dQb3NpdGlvbmluZ09wdGlvbnMuZGVmYXVsdHMudG9wID0gcGxhdGZvcm1NYW5pZmVzdC5wbGF0Zm9ybS5kZWZhdWx0V2luZG93T3B0aW9ucy5kZWZhdWx0VG9wO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gd2luZG93UG9zaXRpb25pbmdPcHRpb25zO1xufVxuXG4vKipcbiAqIEdldCB0aGUgd2luZG93IHBvc2l0aW9uIHVzaW5nIGEgc3RyYXRlZ3kuXG4gKiBAcGFyYW0gd2luZG93UG9zaXRpb25pbmdPcHRpb25zIFRoZSBvcHRpb25zIGZvciB3aW5kb3cgcG9zaXRpb25pbmcuXG4gKiBAcGFyYW0gd2luZG93UG9zaXRpb25pbmdPcHRpb25zLndpbmRvd1Bvc2l0aW9uaW5nU3RyYXRlZ3kgVGhlIHN0cmF0ZWd5IGZvciB3aW5kb3cgcG9zaXRpb25pbmcuXG4gKiBAcGFyYW0gd2luZG93UG9zaXRpb25pbmdPcHRpb25zLndpbmRvd1Bvc2l0aW9uaW5nU3RyYXRlZ3kueCBUaGUgeCBjb29yZGluYXRlLlxuICogQHBhcmFtIHdpbmRvd1Bvc2l0aW9uaW5nT3B0aW9ucy53aW5kb3dQb3NpdGlvbmluZ1N0cmF0ZWd5LnkgVGhlIHkgY29vcmRpbmF0ZS5cbiAqIEBwYXJhbSB3aW5kb3dQb3NpdGlvbmluZ09wdGlvbnMuZGlzYWJsZVdpbmRvd1Bvc2l0aW9uaW5nU3RyYXRlZ3kgV2hldGhlciB0byBkaXNhYmxlIHRoZSB3aW5kb3cgcG9zaXRpb25pbmcgc3RyYXRlZ3kuXG4gKiBAcGFyYW0gcmVsYXRlZFRvIFRoZSByZWxhdGVkIG1vbml0b3Igb3IgaWRlbnRpdHkgb3IgeC95IHBvc2l0aW9uLlxuICogQHJldHVybnMgVGhlIHggYW5kIHkgY29vcmRpbmF0ZXMgb2YgdGhlIHdpbmRvdyBwb3NpdGlvbi5cbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFdpbmRvd1Bvc2l0aW9uVXNpbmdTdHJhdGVneShcblx0d2luZG93UG9zaXRpb25pbmdPcHRpb25zPzogV2luZG93UG9zaXRpb25pbmdPcHRpb25zLFxuXHRyZWxhdGVkVG8/OiBPcGVuRmluLk1vbml0b3JEZXRhaWxzIHwgT3BlbkZpbi5JZGVudGl0eSB8IHsgeDogbnVtYmVyOyB5OiBudW1iZXIgfVxuKTogUHJvbWlzZTx7IGxlZnQ6IG51bWJlcjsgdG9wOiBudW1iZXIgfSB8IHVuZGVmaW5lZD4ge1xuXHRpZiAod2luZG93UG9zaXRpb25pbmdPcHRpb25zPy5kaXNhYmxlV2luZG93UG9zaXRpb25pbmdTdHJhdGVneSA9PT0gdHJ1ZSkge1xuXHRcdHJldHVybjtcblx0fVxuXHRsZXQgdGFyZ2V0TW9uaXRvcjogT3BlbkZpbi5Nb25pdG9yRGV0YWlscyB8IHVuZGVmaW5lZDtcblxuXHRpZiAoaXNFbXB0eShyZWxhdGVkVG8pKSB7XG5cdFx0Y29uc3QgbW9uaXRvcnMgPSBhd2FpdCBmaW4uU3lzdGVtLmdldE1vbml0b3JJbmZvKCk7XG5cdFx0dGFyZ2V0TW9uaXRvciA9IG1vbml0b3JzLnByaW1hcnlNb25pdG9yO1xuXHR9IGVsc2UgaWYgKCFpc0VtcHR5KHJlbGF0ZWRUbykgJiYgXCJtb25pdG9yUmVjdFwiIGluIHJlbGF0ZWRUbykge1xuXHRcdHRhcmdldE1vbml0b3IgPSByZWxhdGVkVG87XG5cdH0gZWxzZSBpZiAoIWlzRW1wdHkocmVsYXRlZFRvKSAmJiBcInhcIiBpbiByZWxhdGVkVG8pIHtcblx0XHR0YXJnZXRNb25pdG9yID0gYXdhaXQgZmluZE1vbml0b3JDb250YWluaW5nUG9pbnQocmVsYXRlZFRvKTtcblx0fSBlbHNlIHtcblx0XHRjb25zdCBib3VuZHMgPSBhd2FpdCBnZXRJZGVudGl0eUJvdW5kcyhyZWxhdGVkVG8pO1xuXHRcdGlmIChpc0VtcHR5KGJvdW5kcykpIHtcblx0XHRcdGNvbnN0IG1vbml0b3JzID0gYXdhaXQgZmluLlN5c3RlbS5nZXRNb25pdG9ySW5mbygpO1xuXHRcdFx0dGFyZ2V0TW9uaXRvciA9IG1vbml0b3JzLnByaW1hcnlNb25pdG9yO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0YXJnZXRNb25pdG9yID0gYXdhaXQgZmluZE1vbml0b3JDb250YWluaW5nUG9pbnQoeyB4OiBib3VuZHMubGVmdCwgeTogYm91bmRzLnRvcCB9KTtcblx0XHR9XG5cdH1cblx0Y29uc3Qgd2luZG93RGVmYXVsdExlZnQgPSB3aW5kb3dQb3NpdGlvbmluZ09wdGlvbnM/LmRlZmF1bHRzPy5sZWZ0ID8/IDA7XG5cdGNvbnN0IHdpbmRvd0RlZmF1bHRUb3AgPSB3aW5kb3dQb3NpdGlvbmluZ09wdGlvbnM/LmRlZmF1bHRzPy50b3AgPz8gMDtcblxuXHQvLyBHZXQgdGhlIGF2YWlsYWJsZSByZWN0IGZvciB0aGUgZGlzcGxheSBzbyB3ZSBjYW4gdGFrZSBpbiB0byBhY2NvdW50XG5cdC8vIE9TIG1lbnVzLCB0YXNrIGJhciBldGNcblx0Y29uc3QgYXZhaWxhYmxlTGVmdCA9IHRhcmdldE1vbml0b3IuYXZhaWxhYmxlUmVjdC5sZWZ0O1xuXHRjb25zdCBhdmFpbGFibGVUb3AgPSB0YXJnZXRNb25pdG9yLmF2YWlsYWJsZVJlY3QudG9wO1xuXHRjb25zdCB3aW5kb3dPZmZzZXRzWDogbnVtYmVyID0gd2luZG93UG9zaXRpb25pbmdPcHRpb25zPy53aW5kb3dQb3NpdGlvbmluZ1N0cmF0ZWd5Py54ID8/IDMwO1xuXHRjb25zdCB3aW5kb3dPZmZzZXRzWTogbnVtYmVyID0gd2luZG93UG9zaXRpb25pbmdPcHRpb25zPy53aW5kb3dQb3NpdGlvbmluZ1N0cmF0ZWd5Py55ID8/IDMwO1xuXHRjb25zdCB3aW5kb3dPZmZzZXRzTWF4SW5jcmVtZW50czogbnVtYmVyID1cblx0XHR3aW5kb3dQb3NpdGlvbmluZ09wdGlvbnM/LndpbmRvd1Bvc2l0aW9uaW5nU3RyYXRlZ3k/Lm1heEluY3JlbWVudHMgPz8gODtcblx0Y29uc3QgdmlzaWJsZVdpbmRvd3MgPSBhd2FpdCBnZXRBbGxWaXNpYmxlV2luZG93cygpO1xuXHQvLyBHZXQgdGhlIHRvcCBsZWZ0IGJvdW5kcyBmb3IgYWxsIHRoZSB2aXNpYmxlIHdpbmRvd3Ncblx0Y29uc3QgdG9wTGVmdEJvdW5kcyA9IGF3YWl0IFByb21pc2UuYWxsKFxuXHRcdHZpc2libGVXaW5kb3dzLm1hcChhc3luYyAod2luKSA9PiB7XG5cdFx0XHR0cnkge1xuXHRcdFx0XHRjb25zdCBib3VuZHMgPSBhd2FpdCB3aW4uZ2V0Qm91bmRzKCk7XG5cdFx0XHRcdHJldHVybiB7XG5cdFx0XHRcdFx0bGVmdDogYm91bmRzLmxlZnQsXG5cdFx0XHRcdFx0dG9wOiBib3VuZHMudG9wLFxuXHRcdFx0XHRcdHJpZ2h0OiBib3VuZHMubGVmdCArIHdpbmRvd09mZnNldHNYLFxuXHRcdFx0XHRcdGJvdHRvbTogYm91bmRzLnRvcCArIHdpbmRvd09mZnNldHNZXG5cdFx0XHRcdH07XG5cdFx0XHR9IGNhdGNoIHtcblx0XHRcdFx0Ly8gcmV0dXJuIGEgZHVtbXkgZW50cnkuXG5cdFx0XHRcdHJldHVybiB7XG5cdFx0XHRcdFx0bGVmdDogMCxcblx0XHRcdFx0XHR0b3A6IDAsXG5cdFx0XHRcdFx0cmlnaHQ6IDAsXG5cdFx0XHRcdFx0Ym90dG9tOiAwXG5cdFx0XHRcdH07XG5cdFx0XHR9XG5cdFx0fSlcblx0KTtcblxuXHRsZXQgbWluQ291bnRWYWw6IG51bWJlciA9IDEwMDA7XG5cdGxldCBtaW5Db3VudEluZGV4ID0gd2luZG93T2Zmc2V0c01heEluY3JlbWVudHM7XG5cblx0Ly8gTm93IHNlZSBob3cgbWFueSB3aW5kb3dzIGFwcGVhciBpbiBlYWNoIGluY3JlbWVudCBzbG90XG5cdGZvciAobGV0IGkgPSAwOyBpIDwgd2luZG93T2Zmc2V0c01heEluY3JlbWVudHM7IGkrKykge1xuXHRcdGNvbnN0IHhQb3MgPSBpICogd2luZG93T2Zmc2V0c1g7XG5cdFx0Y29uc3QgeVBvcyA9IGkgKiB3aW5kb3dPZmZzZXRzWTtcblx0XHRjb25zdCBsZWZ0UG9zID0gd2luZG93RGVmYXVsdExlZnQgKyB4UG9zO1xuXHRcdGNvbnN0IHRvcFBvcyA9IHdpbmRvd0RlZmF1bHRUb3AgKyB5UG9zO1xuXHRcdGNvbnN0IGZvdW5kV2lucyA9IHRvcExlZnRCb3VuZHMuZmlsdGVyKFxuXHRcdFx0KHRvcExlZnRXaW5Cb3VuZHMpID0+XG5cdFx0XHRcdHRvcExlZnRXaW5Cb3VuZHMubGVmdCA+PSBsZWZ0UG9zICsgYXZhaWxhYmxlTGVmdCAmJlxuXHRcdFx0XHR0b3BMZWZ0V2luQm91bmRzLnJpZ2h0IDw9IGxlZnRQb3MgKyB3aW5kb3dPZmZzZXRzWCArIGF2YWlsYWJsZUxlZnQgJiZcblx0XHRcdFx0dG9wTGVmdFdpbkJvdW5kcy50b3AgPj0gdG9wUG9zICsgYXZhaWxhYmxlVG9wICYmXG5cdFx0XHRcdHRvcExlZnRXaW5Cb3VuZHMuYm90dG9tIDw9IHRvcFBvcyArIHdpbmRvd09mZnNldHNZICsgYXZhaWxhYmxlVG9wXG5cdFx0KTtcblx0XHQvLyBJZiB0aGlzIHNsb3QgaGFzIGxlc3MgdGhhbiB0aGUgY3VycmVudCBtaW5pbXVtIHVzZSB0aGlzIHNsb3Rcblx0XHRpZiAoZm91bmRXaW5zLmxlbmd0aCA8IG1pbkNvdW50VmFsKSB7XG5cdFx0XHRtaW5Db3VudFZhbCA9IGZvdW5kV2lucy5sZW5ndGg7XG5cdFx0XHRtaW5Db3VudEluZGV4ID0gaTtcblx0XHR9XG5cdH1cblxuXHRjb25zdCB4T2Zmc2V0ID0gbWluQ291bnRJbmRleCAqIHdpbmRvd09mZnNldHNYO1xuXHRjb25zdCB4ID0gd2luZG93RGVmYXVsdExlZnQgKyB4T2Zmc2V0ICsgYXZhaWxhYmxlTGVmdDtcblx0Y29uc3QgeU9mZnNldCA9IG1pbkNvdW50SW5kZXggKiB3aW5kb3dPZmZzZXRzWTtcblx0Y29uc3QgeSA9IHdpbmRvd0RlZmF1bHRUb3AgKyB5T2Zmc2V0ICsgYXZhaWxhYmxlVG9wO1xuXG5cdHJldHVybiB7IGxlZnQ6IHgsIHRvcDogeSB9O1xufVxuXG4vKipcbiAqIEdldCBhIGxpc3Qgb2YgYWxsIHRoZSB2aXNpYmxlIHdpbmRvd3MgaW4gdGhlIHBsYXRmb3JtLlxuICogQHJldHVybnMgVGhlIGxpc3Qgb2YgdmlzaWJsZSB3aW5kb3dzLlxuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0QWxsVmlzaWJsZVdpbmRvd3MoKTogUHJvbWlzZTxPcGVuRmluLldpbmRvd1tdPiB7XG5cdGNvbnN0IHBsYXRmb3JtID0gZmluLlBsYXRmb3JtLmdldEN1cnJlbnRTeW5jKCk7XG5cdGNvbnN0IHdpbmRvd3MgPSBhd2FpdCBwbGF0Zm9ybS5BcHBsaWNhdGlvbi5nZXRDaGlsZFdpbmRvd3MoKTtcblx0Y29uc3QgYXZhaWxhYmxlV2luZG93czogT3BlbkZpbi5XaW5kb3dbXSA9IFtdO1xuXHRmb3IgKGNvbnN0IGN1cnJlbnRXaW5kb3cgb2Ygd2luZG93cykge1xuXHRcdHRyeSB7XG5cdFx0XHRjb25zdCBpc1Nob3dpbmcgPSBhd2FpdCBjdXJyZW50V2luZG93LmlzU2hvd2luZygpO1xuXHRcdFx0aWYgKGlzU2hvd2luZykge1xuXHRcdFx0XHRhdmFpbGFibGVXaW5kb3dzLnB1c2goY3VycmVudFdpbmRvdyk7XG5cdFx0XHR9XG5cdFx0fSBjYXRjaCB7XG5cdFx0XHQvLyBpZiB0aGUgd2luZG93IGlzIGRlc3Ryb3llZCBiZWZvcmUgZGV0ZXJtaW5pbmcgaWYgaXQgaXMgc2hvd2luZyB0aGVuXG5cdFx0XHQvLyB3ZSBzaG91bGQgbW92ZSB0byB0aGUgbmV4dCB3aW5kb3cgYnV0IG5vdCB0aHJvdy5cblx0XHR9XG5cdH1cblx0cmV0dXJuIGF2YWlsYWJsZVdpbmRvd3M7XG59XG4iLCIvKipcbiAqIFRlc3QgaWYgYSB2YWx1ZSBpcyBhIHVuZGVmaW5lZCBvciBudWxsLlxuICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byB0ZXN0LlxuICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgbnVsbCBvciB1bmRlZmluZWQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc0VtcHR5KHZhbHVlOiB1bmtub3duKTogdmFsdWUgaXMgbnVsbCB8IHVuZGVmaW5lZCB7XG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuXHRyZXR1cm4gdmFsdWUgPT09IHVuZGVmaW5lZCB8fCB2YWx1ZSA9PT0gbnVsbDtcbn1cblxuLyoqXG4gKiBUZXN0IGlmIGEgdmFsdWUgaXMgYW4gb2JqZWN0LlxuICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byB0ZXN0LlxuICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgYW4gb2JqZWN0LlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNPYmplY3QodmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBvYmplY3Qge1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcblx0cmV0dXJuIHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwgJiYgdHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiICYmICFBcnJheS5pc0FycmF5KHZhbHVlKTtcbn1cblxuLyoqXG4gKiBUZXN0IGlmIGEgdmFsdWUgaXMgYSBzdHJpbmcuXG4gKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHRvIHRlc3QuXG4gKiBAcmV0dXJucyBUcnVlIGlmIHRoZSB2YWx1ZSBpcyBhIHN0cmluZy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzU3RyaW5nKHZhbHVlOiB1bmtub3duKTogdmFsdWUgaXMgc3RyaW5nIHtcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG5cdHJldHVybiB2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsICYmIHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIjtcbn1cblxuLyoqXG4gKiBUZXN0IGlmIGEgdmFsdWUgaXMgYSBzdHJpbmcgdGhhdCBpcyBub3QgZW1wdHkuXG4gKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHRvIHRlc3QuXG4gKiBAcmV0dXJucyBUcnVlIGlmIHRoZSB2YWx1ZSBpcyBhIHN0cmluZyB0aGF0IGlzIG5vdCBlbXB0eS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzU3RyaW5nVmFsdWUodmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBzdHJpbmcge1xuXHRyZXR1cm4gaXNTdHJpbmcodmFsdWUpICYmIHZhbHVlLnRyaW0oKS5sZW5ndGggPiAwO1xufVxuXG4vKipcbiAqIFRlc3QgaWYgYSB2YWx1ZSBpcyBhIG51bWJlci5cbiAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gdGVzdC5cbiAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHZhbHVlIGlzIGEgbnVtYmVyLlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNOdW1iZXIodmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBudW1iZXIge1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcblx0cmV0dXJuIHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwgJiYgdHlwZW9mIHZhbHVlID09PSBcIm51bWJlclwiO1xufVxuXG4vKipcbiAqIFRlc3QgaWYgYSB2YWx1ZSBpcyBhIG51bWJlciB3aXRoIGEgcmVhbCB2YWx1ZSBpLmUuIG5vdCBOYU4gb3IgSW5maW5pdGUuXG4gKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHRvIHRlc3QuXG4gKiBAcmV0dXJucyBUcnVlIGlmIHRoZSB2YWx1ZSBpcyBhIG51bWJlci5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzTnVtYmVyVmFsdWUodmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBudW1iZXIge1xuXHRyZXR1cm4gaXNOdW1iZXIodmFsdWUpICYmICFOdW1iZXIuaXNOYU4odmFsdWUpICYmIE51bWJlci5pc0Zpbml0ZSh2YWx1ZSk7XG59XG5cbi8qKlxuICogVGVzdCBpZiBhIHZhbHVlIGlzIGEgYm9vbGVhbi5cbiAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gdGVzdC5cbiAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHZhbHVlIGlzIGEgYm9vbGVhbi5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzQm9vbGVhbih2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIGJvb2xlYW4ge1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcblx0cmV0dXJuIHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwgJiYgdHlwZW9mIHZhbHVlID09PSBcImJvb2xlYW5cIjtcbn1cblxuLyoqXG4gKiBUZXN0IGlmIGEgdmFsdWUgaXMgYW4gaW50ZWdlci5cbiAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gdGVzdC5cbiAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHZhbHVlIGlzIGFuIGludGVnZXIuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc0ludGVnZXIodmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBudW1iZXIge1xuXHRyZXR1cm4gaXNOdW1iZXIodmFsdWUpICYmIE51bWJlci5pc0ludGVnZXIodmFsdWUpO1xufVxuXG4vKipcbiAqIERlZXAgY2xvbmUgYW4gb2JqZWN0LlxuICogQHBhcmFtIG9iaiBUaGUgb2JqZWN0IHRvIGNsb25lLlxuICogQHJldHVybnMgVGhlIGNsb25lIG9mIHRoZSBvYmplY3QuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBvYmplY3RDbG9uZTxUPihvYmo6IFQpOiBUIHtcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG5cdHJldHVybiBvYmogPT09IHVuZGVmaW5lZCA/IHVuZGVmaW5lZCA6IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkob2JqKSk7XG59XG5cbi8qKlxuICogRG8gYSBkZWVwIGNvbXBhcmlzb24gb2YgdGhlIG9iamVjdHMuXG4gKiBAcGFyYW0gb2JqMSBUaGUgZmlyc3Qgb2JqZWN0IHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0gb2JqMiBUaGUgc2Vjb25kIG9iamVjdCB0byBjb21wYXJlLlxuICogQHBhcmFtIG1hdGNoUHJvcGVydHlPcmRlciBJZiB0cnVlIHRoZSBwcm9wZXJ0aWVzIG11c3QgYmUgaW4gdGhlIHNhbWUgb3JkZXIuXG4gKiBAcmV0dXJucyBUcnVlIGlmIHRoZSBvYmplY3RzIGFyZSB0aGUgc2FtZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRlZXBFcXVhbChvYmoxOiB1bmtub3duLCBvYmoyOiB1bmtub3duLCBtYXRjaFByb3BlcnR5T3JkZXI6IGJvb2xlYW4gPSB0cnVlKTogYm9vbGVhbiB7XG5cdGlmIChpc09iamVjdChvYmoxKSAmJiBpc09iamVjdChvYmoyKSkge1xuXHRcdGNvbnN0IG9iaktleXMxID0gT2JqZWN0LmtleXMob2JqMSk7XG5cdFx0Y29uc3Qgb2JqS2V5czIgPSBPYmplY3Qua2V5cyhvYmoyKTtcblxuXHRcdGlmIChvYmpLZXlzMS5sZW5ndGggIT09IG9iaktleXMyLmxlbmd0aCkge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdGlmIChtYXRjaFByb3BlcnR5T3JkZXIgJiYgSlNPTi5zdHJpbmdpZnkob2JqS2V5czEpICE9PSBKU09OLnN0cmluZ2lmeShvYmpLZXlzMikpIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHRmb3IgKGNvbnN0IGtleSBvZiBvYmpLZXlzMSkge1xuXHRcdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcblx0XHRcdGNvbnN0IHZhbHVlMSA9IChvYmoxIGFzIGFueSlba2V5XTtcblx0XHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG5cdFx0XHRjb25zdCB2YWx1ZTIgPSAob2JqMiBhcyBhbnkpW2tleV07XG5cblx0XHRcdGlmICghZGVlcEVxdWFsKHZhbHVlMSwgdmFsdWUyLCBtYXRjaFByb3BlcnR5T3JkZXIpKSB7XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHRydWU7XG5cdH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheShvYmoxKSAmJiBBcnJheS5pc0FycmF5KG9iajIpKSB7XG5cdFx0aWYgKG9iajEubGVuZ3RoICE9PSBvYmoyLmxlbmd0aCkge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IG9iajEubGVuZ3RoOyBpKyspIHtcblx0XHRcdGlmICghZGVlcEVxdWFsKG9iajFbaV0sIG9iajJbaV0sIG1hdGNoUHJvcGVydHlPcmRlcikpIHtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHJldHVybiBKU09OLnN0cmluZ2lmeShvYmoxKSA9PT0gSlNPTi5zdHJpbmdpZnkob2JqMik7XG59XG5cbi8qKlxuICogRGVlcCBtZXJnZSB0d28gb2JqZWN0cy5cbiAqIEBwYXJhbSB0YXJnZXQgVGhlIG9iamVjdCB0byBiZSBtZXJnZWQgaW50by5cbiAqIEBwYXJhbSBzb3VyY2VzIFRoZSBvYmplY3RzIHRvIG1lcmdlIGludG8gdGhlIHRhcmdldC5cbiAqIEByZXR1cm5zIFRoZSBtZXJnZWQgb2JqZWN0LlxuICovXG5leHBvcnQgZnVuY3Rpb24gZGVlcE1lcmdlPFQgPSB1bmtub3duPih0YXJnZXQ6IFQsIC4uLnNvdXJjZXM6IFRbXSk6IFQge1xuXHRpZiAoIUFycmF5LmlzQXJyYXkoc291cmNlcykgfHwgc291cmNlcy5sZW5ndGggPT09IDApIHtcblx0XHRyZXR1cm4gdGFyZ2V0O1xuXHR9XG5cblx0Y29uc3QgdGFyZ2V0QXNNYXAgPSB0YXJnZXQgYXMgeyBbaWQ6IHN0cmluZ106IHVua25vd24gfTtcblx0Y29uc3Qgc291cmNlID0gc291cmNlcy5zaGlmdCgpO1xuXG5cdGxldCBrZXlzO1xuXHRpZiAoaXNPYmplY3QodGFyZ2V0QXNNYXApICYmIGlzT2JqZWN0KHNvdXJjZSkpIHtcblx0XHRrZXlzID0gT2JqZWN0LmtleXMoc291cmNlKTtcblx0fSBlbHNlIGlmIChBcnJheS5pc0FycmF5KHNvdXJjZSkpIHtcblx0XHRpZiAoIUFycmF5LmlzQXJyYXkodGFyZ2V0KSkge1xuXHRcdFx0cmV0dXJuIHNvdXJjZTtcblx0XHR9XG5cdFx0a2V5cyA9IE9iamVjdC5rZXlzKHNvdXJjZSkubWFwKChrKSA9PiBOdW1iZXIucGFyc2VJbnQoaywgMTApKTtcblx0fVxuXG5cdGlmIChrZXlzKSB7XG5cdFx0Y29uc3Qgc291cmNlQXNNYXAgPSBzb3VyY2UgYXMgeyBbaWQ6IHN0cmluZ106IHVua25vd24gfTtcblx0XHRmb3IgKGNvbnN0IGtleSBvZiBrZXlzKSB7XG5cdFx0XHRjb25zdCB2YWx1ZSA9IHNvdXJjZUFzTWFwW2tleV07XG5cdFx0XHRpZiAoaXNPYmplY3QodmFsdWUpKSB7XG5cdFx0XHRcdGlmIChpc0VtcHR5KHRhcmdldEFzTWFwW2tleV0pKSB7XG5cdFx0XHRcdFx0dGFyZ2V0QXNNYXBba2V5XSA9IHt9O1xuXHRcdFx0XHR9XG5cdFx0XHRcdGRlZXBNZXJnZSh0YXJnZXRBc01hcFtrZXldLCB2YWx1ZSk7XG5cdFx0XHR9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG5cdFx0XHRcdGlmIChpc0VtcHR5KHRhcmdldEFzTWFwW2tleV0pKSB7XG5cdFx0XHRcdFx0dGFyZ2V0QXNNYXBba2V5XSA9IFtdO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGRlZXBNZXJnZSh0YXJnZXRBc01hcFtrZXldLCB2YWx1ZSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR0YXJnZXRBc01hcFtrZXldID0gdmFsdWU7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIGRlZXBNZXJnZSh0YXJnZXQsIC4uLnNvdXJjZXMpO1xufVxuXG4vKipcbiAqIFBvbHlmaWxscyByYW5kb21VVUlEIGlmIHJ1bm5pbmcgaW4gYSBub24tc2VjdXJlIGNvbnRleHQuXG4gKiBAcmV0dXJucyBUaGUgcmFuZG9tIFVVSUQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByYW5kb21VVUlEKCk6IHN0cmluZyB7XG5cdGlmIChcInJhbmRvbVVVSURcIiBpbiBnbG9iYWxUaGlzLmNyeXB0bykge1xuXHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuXHRcdHJldHVybiBnbG9iYWxUaGlzLmNyeXB0by5yYW5kb21VVUlEKCk7XG5cdH1cblx0Ly8gUG9seWZpbGwgdGhlIHdpbmRvdy5jcnlwdG8ucmFuZG9tVVVJRCBpZiB3ZSBhcmUgcnVubmluZyBpbiBhIG5vbiBzZWN1cmUgY29udGV4dCB0aGF0IGRvZXNuJ3QgaGF2ZSBpdFxuXHQvLyB3ZSBhcmUgc3RpbGwgdXNpbmcgd2luZG93LmNyeXB0by5nZXRSYW5kb21WYWx1ZXMgd2hpY2ggaXMgYWx3YXlzIGF2YWlsYWJsZVxuXHQvLyBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMjExNzUyMy8yODAwMjE4XG5cdC8qKlxuXHQgKiBHZXQgcmFuZG9tIGhleCB2YWx1ZS5cblx0ICogQHBhcmFtIGMgVGhlIG51bWJlciB0byBiYXNlIHRoZSByYW5kb20gdmFsdWUgb24uXG5cdCAqIEByZXR1cm5zIFRoZSByYW5kb20gdmFsdWUuXG5cdCAqL1xuXHRmdW5jdGlvbiBnZXRSYW5kb21IZXgoYzogc3RyaW5nKTogc3RyaW5nIHtcblx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tYml0d2lzZVxuXHRcdGNvbnN0IHJuZCA9IGdsb2JhbFRoaXMuY3J5cHRvLmdldFJhbmRvbVZhbHVlcyhuZXcgVWludDhBcnJheSgxKSlbMF0gJiAoMTUgPj4gKE51bWJlcihjKSAvIDQpKTtcblx0XHRyZXR1cm4gKFxuXHRcdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWJpdHdpc2Vcblx0XHRcdChOdW1iZXIoYykgXiBybmQpLnRvU3RyaW5nKDE2KVxuXHRcdCk7XG5cdH1cblx0cmV0dXJuIFwiMTAwMDAwMDAtMTAwMC00MDAwLTgwMDAtMTAwMDAwMDAwMDAwXCIucmVwbGFjZSgvWzAxOF0vZywgZ2V0UmFuZG9tSGV4KTtcbn1cblxuLyoqXG4gKiBGb3JtYXQgYW4gZXJyb3IgdG8gYSByZWFkYWJsZSBzdHJpbmcuXG4gKiBAcGFyYW0gZXJyIFRoZSBlcnJvciB0byBmb3JtYXQuXG4gKiBAcmV0dXJucyBUaGUgZm9ybWF0dGVkIGVycm9yLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZm9ybWF0RXJyb3IoZXJyOiB1bmtub3duKTogc3RyaW5nIHtcblx0aWYgKGlzRW1wdHkoZXJyKSkge1xuXHRcdHJldHVybiBcIlwiO1xuXHR9IGVsc2UgaWYgKGVyciBpbnN0YW5jZW9mIEVycm9yKSB7XG5cdFx0cmV0dXJuIGVyci5tZXNzYWdlO1xuXHR9IGVsc2UgaWYgKGlzU3RyaW5nVmFsdWUoZXJyKSkge1xuXHRcdHJldHVybiBlcnI7XG5cdH0gZWxzZSBpZiAoaXNPYmplY3QoZXJyKSAmJiBcIm1lc3NhZ2VcIiBpbiBlcnIgJiYgaXNTdHJpbmcoZXJyLm1lc3NhZ2UpKSB7XG5cdFx0cmV0dXJuIGVyci5tZXNzYWdlO1xuXHR9XG5cdHJldHVybiBKU09OLnN0cmluZ2lmeShlcnIpO1xufVxuXG4vKipcbiAqIEEgYmFzaWMgc3RyaW5nIHNhbml0aXplIGZ1bmN0aW9uIHRoYXQgcmVtb3ZlcyBhbmdsZSBicmFja2V0cyA8PiBmcm9tIGEgc3RyaW5nLlxuICogQHBhcmFtIGNvbnRlbnQgdGhlIGNvbnRlbnQgdG8gc2FuaXRpemVcbiAqIEByZXR1cm5zIGEgc3RyaW5nIHdpdGhvdXQgYW5nbGUgYnJhY2tldHMgPD5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNhbml0aXplU3RyaW5nKGNvbnRlbnQ6IHVua25vd24pOiBzdHJpbmcge1xuXHRpZiAoaXNTdHJpbmdWYWx1ZShjb250ZW50KSkge1xuXHRcdHJldHVybiBjb250ZW50XG5cdFx0XHQucmVwbGFjZSgvPFtePl0qPj8vZ20sIFwiXCIpXG5cdFx0XHQucmVwbGFjZSgvJmd0Oy9nLCBcIj5cIilcblx0XHRcdC5yZXBsYWNlKC8mbHQ7L2csIFwiPFwiKVxuXHRcdFx0LnJlcGxhY2UoLyZhbXA7L2csIFwiJlwiKVxuXHRcdFx0LnJlcGxhY2UoLyZuYnNwOy9nLCBcIiBcIilcblx0XHRcdC5yZXBsYWNlKC9cXG5cXHMqXFxuL2csIFwiXFxuXCIpO1xuXHR9XG5cdHJldHVybiBcIlwiO1xufVxuXG4vKipcbiAqIEdldCB0aGUgY29tbWFuZCBsaW5lIGFyZ3VtZW50cyBmcm9tIGEgY29tbWFuZCBsaW5lIHN0cmluZy5cbiAqIEV4YW1wbGVzIG9mIGNvbW1hbmQgbGluZSBzdHJpbmdzOiBhcmcxIGtleTE9dmFsdWUxIGtleTI9XCJ2YWx1ZSB3aXRoIHNwYWNlc1wiIGtleTM9J3ZhbHVlMycga2V5ND0ndmFsdWUgd2l0aCBtb3JlIHNwYWNlcydgLlxuICogQHBhcmFtIGNvbW1hbmRMaW5lIFRoZSBjb21tYW5kIGxpbmUgc3RyaW5nLlxuICogQHJldHVybnMgVGhlIGNvbW1hbmQgbGluZSBhcmd1bWVudHMgb3IgYW4gZW1wdHkgYXJyYXkgaWYgbm9uZVxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q29tbWFuZExpbmVBcmdzKGNvbW1hbmRMaW5lOiBzdHJpbmcpOiBzdHJpbmdbXSB7XG5cdGlmICghaXNTdHJpbmdWYWx1ZShjb21tYW5kTGluZSkpIHtcblx0XHRyZXR1cm4gW107XG5cdH1cblx0Y29uc3QgbWF0Y2hlcyA9IGNvbW1hbmRMaW5lLm1hdGNoKC8oXFx3Kz0pPyhcIlteXCJdKlwifCdbXiddKid8W14gXSspL2cpO1xuXHRpZiAoaXNFbXB0eShtYXRjaGVzKSkge1xuXHRcdHJldHVybiBbXTtcblx0fVxuXHRyZXR1cm4gbWF0Y2hlcztcbn1cbiIsImltcG9ydCB0eXBlIHsgQXBwc0ZvckludGVudCwgUGxhdGZvcm1BcHAgfSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvc2hhcGVzL2FwcC1zaGFwZXNcIjtcbmltcG9ydCB0eXBlIHsgQXBwSW50ZW50cyB9IGZyb20gXCJ3b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci9zaGFwZXMvZmRjMy0yLTAtc2hhcGVzXCI7XG5pbXBvcnQgdHlwZSB7IExvZ2dlciB9IGZyb20gXCJ3b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci9zaGFwZXMvbG9nZ2VyLXNoYXBlc1wiO1xuaW1wb3J0IHsgaXNFbXB0eSB9IGZyb20gXCJ3b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci91dGlsc1wiO1xuXG4vKipcbiAqIFRoZSBBcHAgSW50ZW50IEhlbHBlciBpbnNwZWN0cyBhcHAgY2F0YWxvZ3MgdG8gZGlzY292ZXIgc3VwcG9ydGVkIGludGVudHMgYW5kIGNvbnRleHRzLlxuICovXG5leHBvcnQgY2xhc3MgQXBwSW50ZW50SGVscGVyIHtcblx0cHJpdmF0ZSByZWFkb25seSBfZ2V0QXBwczogKCkgPT4gUHJvbWlzZTxQbGF0Zm9ybUFwcFtdPjtcblxuXHRwcml2YXRlIHJlYWRvbmx5IF9sb2dnZXI6IExvZ2dlcjtcblxuXHQvKipcblx0ICogQ3JlYXRlIGFuIGluc3RhbmNlIG9mIHRoZSBBcHAgSW50ZW50IEhlbHBlci5cblx0ICogQHBhcmFtIGdldEFwcHMgcmV0dXJucyBhbiBhcnJheSBvZiBBcHBzXG5cdCAqIEBwYXJhbSBsb2dnZXIgdGhlIGxvZ2dlciB0byB1c2UuXG5cdCAqL1xuXHRjb25zdHJ1Y3RvcihnZXRBcHBzOiAoKSA9PiBQcm9taXNlPFBsYXRmb3JtQXBwW10+LCBsb2dnZXI6IExvZ2dlcikge1xuXHRcdHRoaXMuX2dldEFwcHMgPSBnZXRBcHBzO1xuXHRcdHRoaXMuX2xvZ2dlciA9IGxvZ2dlcjtcblx0fVxuXG5cdC8qKlxuXHQgKiBHZXQgdGhlIGFwcGxpY2F0aW9uIHRoYXQgc3VwcG9ydCB0aGUgcmVxdWVzdGVkIGludGVudC5cblx0ICogQHBhcmFtIGludGVudCBUaGUgaW50ZW50IHRoZSBhcHBsaWNhdGlvbiBtdXN0IHN1cHBvcnQuXG5cdCAqIEByZXR1cm5zIFRoZSBsaXN0IG9mIGFwcGxpY2F0aW9uIHRoYXQgc3VwcG9ydCB0aGUgaW50ZW50LlxuXHQgKi9cblx0cHVibGljIGFzeW5jIGdldEFwcHNCeUludGVudChpbnRlbnQ6IHN0cmluZyk6IFByb21pc2U8UGxhdGZvcm1BcHBbXT4ge1xuXHRcdGNvbnN0IGFwcHMgPSBhd2FpdCB0aGlzLl9nZXRBcHBzKCk7XG5cdFx0cmV0dXJuIGFwcHMuZmlsdGVyKChhcHApID0+IHtcblx0XHRcdGNvbnN0IGxpc3RlbnNGb3IgPSBhcHAuaW50ZXJvcD8uaW50ZW50cz8ubGlzdGVuc0ZvcjtcblxuXHRcdFx0aWYgKGlzRW1wdHkobGlzdGVuc0ZvcikpIHtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXHRcdFx0Y29uc3QgaW50ZW50TmFtZXMgPSBPYmplY3Qua2V5cyhsaXN0ZW5zRm9yKTtcblx0XHRcdGZvciAoY29uc3QgaW50ZW50TmFtZSBvZiBpbnRlbnROYW1lcykge1xuXHRcdFx0XHRpZiAoaW50ZW50TmFtZS50b0xvd2VyQ2FzZSgpID09PSBpbnRlbnQudG9Mb3dlckNhc2UoKSkge1xuXHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fSk7XG5cdH1cblxuXHQvKipcblx0ICogR2V0IGFuIGludGVudCBhbmQgdGhlIGFwcHMgdGhhdCBzdXBwb3J0IGl0LlxuXHQgKiBAcGFyYW0gaW50ZW50IFRoZSBpbnRlbnQgdG8gbG9vayBmb3IuXG5cdCAqIEBwYXJhbSBjb250ZXh0VHlwZSBPcHRpb25hbCBjb250ZXh0IHR5cGUgdG8gbG9vayBmb3IuXG5cdCAqIEBwYXJhbSByZXN1bHRUeXBlIE9wdGlvbmFsIHJlc3VsdCB0eXBlIHRvIGxvb2sgZm9yLlxuXHQgKiBAcmV0dXJucyBUaGUgaW50ZW50IGFuZCBpdHMgc3VwcG9ydGluZyBhcHBzIGlmIGZvdW5kLlxuXHQgKi9cblx0cHVibGljIGFzeW5jIGdldEludGVudChcblx0XHRpbnRlbnQ6IHN0cmluZyxcblx0XHRjb250ZXh0VHlwZT86IHN0cmluZyxcblx0XHRyZXN1bHRUeXBlPzogc3RyaW5nXG5cdCk6IFByb21pc2U8QXBwc0ZvckludGVudCB8IHVuZGVmaW5lZD4ge1xuXHRcdGNvbnN0IGFwcHMgPSBhd2FpdCB0aGlzLl9nZXRBcHBzKCk7XG5cblx0XHRpZiAoYXBwcy5sZW5ndGggPT09IDApIHtcblx0XHRcdHRoaXMuX2xvZ2dlci53YXJuKFwiVGhlcmUgd2FzIG5vIGFwcHMgcmV0dXJuZWQgc28gd2UgYXJlIHVuYWJsZSB0byBmaW5kIGFwcHMgdGhhdCBzdXBwb3J0IGFuIGludGVudFwiKTtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHRjb25zdCBpbnRlbnRzTWFwOiB7IFtrZXk6IHN0cmluZ106IEFwcHNGb3JJbnRlbnQgfSA9IHt9O1xuXG5cdFx0Zm9yIChjb25zdCBhcHAgb2YgYXBwcykge1xuXHRcdFx0aWYgKGFwcC5pbnRlcm9wPy5pbnRlbnRzPy5saXN0ZW5zRm9yICYmICFpc0VtcHR5KGFwcC5pbnRlcm9wLmludGVudHMubGlzdGVuc0ZvcltpbnRlbnRdKSkge1xuXHRcdFx0XHRjb25zdCBhcHBJbnRlbnQgPSBhcHAuaW50ZXJvcC5pbnRlbnRzLmxpc3RlbnNGb3JbaW50ZW50XTtcblx0XHRcdFx0Y29uc3QgaW5jbHVkZSA9IHRoaXMuYXBwSW50ZW50Q29udGFpbnMoYXBwSW50ZW50LCBjb250ZXh0VHlwZSwgcmVzdWx0VHlwZSk7XG5cdFx0XHRcdGlmIChpbmNsdWRlKSB7XG5cdFx0XHRcdFx0Ly8gcmUtdXNlIGFwcHJvYWNoIHVzZWQgYnkgZ2V0dGluZyBpbnRlbnRzIGJ5IGNvbnRleHQgZm9yIHRoZSBjb250ZXh0IG1hcCBhbHRob3VnaCB0aGlzIHdpbGwgb25seSBoYXZlIG9uZVxuXHRcdFx0XHRcdHRoaXMudXBkYXRlQXBwSW50ZW50c01hcChpbnRlbnRzTWFwLCBpbnRlbnQsIGFwcEludGVudC5kaXNwbGF5TmFtZSwgYXBwKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGNvbnN0IHJlc3VsdHMgPSBPYmplY3QudmFsdWVzKGludGVudHNNYXApO1xuXHRcdGlmIChyZXN1bHRzLmxlbmd0aCA9PT0gMCkge1xuXHRcdFx0dGhpcy5fbG9nZ2VyLmluZm8oXG5cdFx0XHRcdGBObyByZXN1bHRzIGZvdW5kIGZvciBmaW5kSW50ZW50IGZvciBpbnRlbnQgJHtpbnRlbnR9IGFuZCBjb250ZXh0ICR7Y29udGV4dFR5cGV9IGFuZCByZXN1bHRUeXBlICR7cmVzdWx0VHlwZX1gXG5cdFx0XHQpO1xuXHRcdFx0cmV0dXJuO1xuXHRcdH0gZWxzZSBpZiAocmVzdWx0cy5sZW5ndGggPT09IDEpIHtcblx0XHRcdHJldHVybiByZXN1bHRzWzBdO1xuXHRcdH1cblxuXHRcdHRoaXMuX2xvZ2dlci53YXJuKFxuXHRcdFx0YFJlY2VpdmVkIG1vcmUgdGhhbiBvbmUgcmVzdWx0IGZvciBmaW5kSW50ZW50IGZvciBpbnRlbnQgJHtpbnRlbnR9IGFuZCBjb250ZXh0ICR7Y29udGV4dFR5cGV9IGFuZCByZXN1bHRUeXBlICR7cmVzdWx0VHlwZX0uIFJldHVybmluZyB0aGUgZmlyc3QgZW50cnkuYFxuXHRcdCk7XG5cdFx0cmV0dXJuIHJlc3VsdHNbMF07XG5cdH1cblxuXHQvKipcblx0ICogR2V0IHRoZSBhcHBzIHRoYXQgc3VwcG9ydCBpbnRlbnRzIGJ5IHRoZSBjb250ZXh0IHR5cGUuXG5cdCAqIEBwYXJhbSBjb250ZXh0VHlwZSBUaGUgY29udGV4dCB0eXBlIHRoZSBhcHAgbXVzdCBzdXBwb3J0LlxuXHQgKiBAcGFyYW0gcmVzdWx0VHlwZSBUaGUgb3B0aW9uYWwgcmVzdWx0IHR5cGUgdG8gbWF0Y2ggYXMgd2VsbC5cblx0ICogQHJldHVybnMgVGhlIGFwcHMgZm9yIHRoZSBzcGVjaWZpZWQgaW50ZW50LlxuXHQgKi9cblx0cHVibGljIGFzeW5jIGdldEludGVudHNCeUNvbnRleHQoY29udGV4dFR5cGU6IHN0cmluZywgcmVzdWx0VHlwZT86IHN0cmluZyk6IFByb21pc2U8QXBwc0ZvckludGVudFtdPiB7XG5cdFx0Y29uc3QgYXBwcyA9IGF3YWl0IHRoaXMuX2dldEFwcHMoKTtcblxuXHRcdGlmIChhcHBzLmxlbmd0aCA9PT0gMCkge1xuXHRcdFx0dGhpcy5fbG9nZ2VyLndhcm4oXG5cdFx0XHRcdFwiVW5hYmxlIHRvIGdldCBhcHBzIHNvIHdlIGNhbiBub3QgZ2V0IGFwcHMgYW5kIGludGVudHMgdGhhdCBzdXBwb3J0IGEgcGFydGljdWxhciBjb250ZXh0XCJcblx0XHRcdCk7XG5cdFx0XHRyZXR1cm4gW107XG5cdFx0fVxuXG5cdFx0Y29uc3QgaW50ZW50czogeyBba2V5OiBzdHJpbmddOiBBcHBzRm9ySW50ZW50IH0gPSB7fTtcblxuXHRcdGZvciAoY29uc3QgYXBwIG9mIGFwcHMpIHtcblx0XHRcdGNvbnN0IGxpc3RlbnNGb3IgPSBhcHAuaW50ZXJvcD8uaW50ZW50cz8ubGlzdGVuc0ZvcjtcblxuXHRcdFx0aWYgKCFpc0VtcHR5KGxpc3RlbnNGb3IpKSB7XG5cdFx0XHRcdGNvbnN0IHN1cHBvcnRlZEludGVudHMgPSBPYmplY3Qua2V5cyhsaXN0ZW5zRm9yKTtcblx0XHRcdFx0Zm9yIChjb25zdCBzdXBwb3J0ZWRJbnRlbnQgb2Ygc3VwcG9ydGVkSW50ZW50cykge1xuXHRcdFx0XHRcdGNvbnN0IGFwcEludGVudCA9IGxpc3RlbnNGb3Jbc3VwcG9ydGVkSW50ZW50XTtcblx0XHRcdFx0XHRjb25zdCBpbmNsdWRlID0gdGhpcy5hcHBJbnRlbnRDb250YWlucyhhcHBJbnRlbnQsIGNvbnRleHRUeXBlLCByZXN1bHRUeXBlKTtcblx0XHRcdFx0XHRpZiAoaW5jbHVkZSkge1xuXHRcdFx0XHRcdFx0dGhpcy51cGRhdGVBcHBJbnRlbnRzTWFwKGludGVudHMsIHN1cHBvcnRlZEludGVudCwgYXBwSW50ZW50LmRpc3BsYXlOYW1lLCBhcHApO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiBPYmplY3QudmFsdWVzKGludGVudHMpO1xuXHR9XG5cblx0LyoqXG5cdCAqIENoZWNrIHRvIHNlZSBpZiB0aGUgc3VwcGxpZWQgYXBwSW50ZW50IHN1cHBvcnRzIHRoZSBjb250ZXh0IGFuZCByZXN1bHQgdHlwZXMuXG5cdCAqIEBwYXJhbSBhcHBJbnRlbnQgVGhlIGFwcCBpbnRlbnQgdG8gY2hlY2suXG5cdCAqIEBwYXJhbSBjb250ZXh0VHlwZSBUaGUgb3B0aW9uYWwgY29udGV4dCB0eXBlIHRvIGxvb2sgZm9yLlxuXHQgKiBAcGFyYW0gcmVzdWx0VHlwZSBUaGUgb3B0aW9uYWwgcmVzdWx0IHR5cGUgdG8gbG9vayBmb3IuXG5cdCAqIEByZXR1cm5zIFRydWUgaWYgdGhlIGFwcCBpbnRlbnQgbWF0Y2hlcy5cblx0ICovXG5cdHByaXZhdGUgYXBwSW50ZW50Q29udGFpbnMoXG5cdFx0YXBwSW50ZW50OiBBcHBJbnRlbnRzLFxuXHRcdGNvbnRleHRUeXBlOiBzdHJpbmcgfCB1bmRlZmluZWQsXG5cdFx0cmVzdWx0VHlwZTogc3RyaW5nIHwgdW5kZWZpbmVkXG5cdCk6IGJvb2xlYW4ge1xuXHRcdGlmICghaXNFbXB0eShjb250ZXh0VHlwZSkgJiYgIWlzRW1wdHkocmVzdWx0VHlwZSkpIHtcblx0XHRcdGlmICghYXBwSW50ZW50Py5jb250ZXh0cz8uaW5jbHVkZXMoY29udGV4dFR5cGUpIHx8ICFhcHBJbnRlbnQucmVzdWx0VHlwZT8uaW5jbHVkZXMocmVzdWx0VHlwZSkpIHtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSBpZiAoIWlzRW1wdHkoY29udGV4dFR5cGUpICYmICFhcHBJbnRlbnQ/LmNvbnRleHRzPy5pbmNsdWRlcyhjb250ZXh0VHlwZSkpIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9IGVsc2UgaWYgKCFpc0VtcHR5KHJlc3VsdFR5cGUpICYmICFhcHBJbnRlbnQ/LnJlc3VsdFR5cGU/LmluY2x1ZGVzKHJlc3VsdFR5cGUpKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXHRcdHJldHVybiB0cnVlO1xuXHR9XG5cblx0LyoqXG5cdCAqIFVwZGF0ZSB0aGUgbWFwIGNvbnRhaW5pbmcgdGhlIGludGVudCB0byBhcHBzLlxuXHQgKiBAcGFyYW0gaW50ZW50c01hcCBUaGUgbWFwIHRvIHVwZGF0ZS5cblx0ICogQHBhcmFtIG5hbWUgVGhlIG5hbWUgb2YgdGhlIGludGVudC5cblx0ICogQHBhcmFtIGRpc3BsYXlOYW1lIFRoZSBPcHRpb25zIGRpc3BsYXkgbmFtZSB0byB1cGRhdGUgd2l0aC5cblx0ICogQHBhcmFtIGFwcCBUaGUgYXBwbGljYXRpb24gdG8gdXBkYXRlLlxuXHQgKi9cblx0cHJpdmF0ZSB1cGRhdGVBcHBJbnRlbnRzTWFwKFxuXHRcdGludGVudHNNYXA6IHtcblx0XHRcdFtrZXk6IHN0cmluZ106IEFwcHNGb3JJbnRlbnQ7XG5cdFx0fSxcblx0XHRuYW1lOiBzdHJpbmcsXG5cdFx0ZGlzcGxheU5hbWU6IHN0cmluZyB8IHVuZGVmaW5lZCxcblx0XHRhcHA6IFBsYXRmb3JtQXBwXG5cdCk6IHZvaWQge1xuXHRcdGlmIChpc0VtcHR5KGludGVudHNNYXBbbmFtZV0pKSB7XG5cdFx0XHQvLyBpbiBhIHByb2R1Y3Rpb24gYXBwIHlvdSB3b3VsZCBlaXRoZXIgbmVlZCB0byBlbnN1cmUgdGhhdCBldmVyeSBhcHAgd2FzIHBvcHVsYXRlZCB3aXRoIHRoZSBzYW1lIG5hbWUgJiBkaXNwbGF5TmFtZSBmb3IgYW4gaW50ZW50IGZyb20gYSBnb2xkZW4gc291cmNlIChlLmcuIGludGVudHMgdGFibGUpIHNvIHBpY2tpbmcgdGhlIGZpcnN0IGVudHJ5IHdvdWxkbid0IG1ha2UgYSBkaWZmZXJlbmNlLlxuXHRcdFx0Ly8gb3IgeW91IGNvdWxkIHB1bGwgaW4gYSBnb2xkZW4gc291cmNlIG9mIGludGVudHMgZnJvbSBhIHNlcnZpY2UgYW5kIHRoZW4gZG8gYSBsb29rdXAgdXNpbmcgdGhlIGludGVudCBuYW1lIHRvIGdldCBhbiBvYmplY3Qgd2l0aCBpbnRlbnQgbmFtZSBhbmQgb2ZmaWNpYWwgZGlzcGxheSBuYW1lLlxuXHRcdFx0aW50ZW50c01hcFtuYW1lXSA9IHtcblx0XHRcdFx0aW50ZW50OiB7XG5cdFx0XHRcdFx0bmFtZSxcblx0XHRcdFx0XHRkaXNwbGF5TmFtZVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRhcHBzOiBbXVxuXHRcdFx0fTtcblx0XHR9XG5cdFx0aW50ZW50c01hcFtuYW1lXS5hcHBzLnB1c2goYXBwKTtcblx0fVxufVxuIiwiaW1wb3J0IHsgT3BlbkVycm9yLCBSZXNvbHZlRXJyb3IsIHR5cGUgQXBwSWRlbnRpZmllciB9IGZyb20gXCJAZmlub3MvZmRjM1wiO1xuaW1wb3J0IHR5cGUgT3BlbkZpbiBmcm9tIFwiQG9wZW5maW4vY29yZVwiO1xuaW1wb3J0IHR5cGUge1xuXHRJbnRlbnRSZWdpc3RyYXRpb25FbnRyeSxcblx0Q29udGV4dFJlZ2lzdHJhdGlvbkVudHJ5LFxuXHRCcm9rZXJDbGllbnRDb25uZWN0aW9uLFxuXHRJbnRlbnRSZWdpc3RyYXRpb25QYXlsb2FkLFxuXHRDYXB0dXJlQXBpUGF5bG9hZCxcblx0QXBpTWV0YWRhdGFcbn0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3NoYXBlcy9pbnRlcm9wYnJva2VyLXNoYXBlc1wiO1xuaW1wb3J0IHR5cGUgeyBMb2dnZXIgfSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvc2hhcGVzL2xvZ2dlci1zaGFwZXNcIjtcbmltcG9ydCB7IGlzRW1wdHksIGlzU3RyaW5nVmFsdWUgfSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvdXRpbHNcIjtcblxuLyoqXG4gKiBVc2VkIHRvIHRyYWNrIGNsaWVudCBpbnRlcmFjdGlvbnMgd2l0aCBhIGJyb2tlci5cbiAqL1xuZXhwb3J0IGNsYXNzIENsaWVudFJlZ2lzdHJhdGlvbkhlbHBlciB7XG5cdHByaXZhdGUgcmVhZG9ubHkgX2xvZ2dlcjogTG9nZ2VyO1xuXG5cdHByaXZhdGUgcmVhZG9ubHkgX2xvb2t1cEFwcElkOiAoY2xpZW50SWRlbnRpdHk6IE9wZW5GaW4uQ2xpZW50SWRlbnRpdHkpID0+IFByb21pc2U8c3RyaW5nIHwgdW5kZWZpbmVkPjtcblxuXHRwcml2YXRlIHJlYWRvbmx5IF9jbGllbnRSZWFkeVJlcXVlc3RzOiB7IFtrZXk6IHN0cmluZ106IChpbnN0YW5jZUlkOiBzdHJpbmcpID0+IHZvaWQgfTtcblxuXHRwcml2YXRlIHJlYWRvbmx5IF90cmFja2VkQ2xpZW50Q29ubmVjdGlvbnM6IHsgW2tleTogc3RyaW5nXTogQnJva2VyQ2xpZW50Q29ubmVjdGlvbiB9O1xuXG5cdHByaXZhdGUgcmVhZG9ubHkgX3RyYWNrZWRDb250ZXh0SGFuZGxlcnM6IHsgW2tleTogc3RyaW5nXTogQ29udGV4dFJlZ2lzdHJhdGlvbkVudHJ5W10gfTtcblxuXHRwcml2YXRlIHJlYWRvbmx5IF90cmFja2VkSW50ZW50SGFuZGxlcnM6IHsgW2tleTogc3RyaW5nXTogSW50ZW50UmVnaXN0cmF0aW9uRW50cnlbXSB9O1xuXG5cdC8qKlxuXHQgKiBDcmVhdGUgYW4gaW5zdGFuY2Ugb2YgdGhlIENsaWVudCBSZWdpc3RyYXRpb24gSGVscGVyLlxuXHQgKiBAcGFyYW0gbG9va3VwQXBwSWQgZGV0ZXJtaW5lIGFwcElkIGJhc2VkIG9uIGNsaWVudElkZW50aXR5XG5cdCAqIEBwYXJhbSBsb2dnZXIgdGhlIGxvZ2dlciB0byB1c2UuXG5cdCAqL1xuXHRjb25zdHJ1Y3Rvcihcblx0XHRsb29rdXBBcHBJZDogKGNsaWVudElkZW50aXR5OiBPcGVuRmluLkNsaWVudElkZW50aXR5KSA9PiBQcm9taXNlPHN0cmluZyB8IHVuZGVmaW5lZD4sXG5cdFx0bG9nZ2VyOiBMb2dnZXJcblx0KSB7XG5cdFx0dGhpcy5fbG9nZ2VyID0gbG9nZ2VyO1xuXHRcdHRoaXMuX2xvb2t1cEFwcElkID0gbG9va3VwQXBwSWQ7XG5cdFx0dGhpcy5fY2xpZW50UmVhZHlSZXF1ZXN0cyA9IHt9O1xuXHRcdHRoaXMuX3RyYWNrZWRDbGllbnRDb25uZWN0aW9ucyA9IHt9O1xuXHRcdHRoaXMuX3RyYWNrZWRDb250ZXh0SGFuZGxlcnMgPSB7fTtcblx0XHR0aGlzLl90cmFja2VkSW50ZW50SGFuZGxlcnMgPSB7fTtcblx0fVxuXG5cdC8qKlxuXHQgKiBUaGUgY2xpZW50IGhhcyBkaXNjb25uZWN0ZWQgZm9ybSB0aGUgYnJva2VyLlxuXHQgKiBAcGFyYW0gY2xpZW50SWRlbnRpdHkgVGhlIGlkZW50aXR5IG9mIHRoZSBjbGllbnQgdGhhdCBkaXNjb25uZWN0ZWQuXG5cdCAqL1xuXHRwdWJsaWMgYXN5bmMgY2xpZW50RGlzY29ubmVjdGVkKGNsaWVudElkZW50aXR5OiBPcGVuRmluLkNsaWVudElkZW50aXR5KTogUHJvbWlzZTx2b2lkPiB7XG5cdFx0dGhpcy5fbG9nZ2VyLmluZm8oXCJDbGllbnQgRGlzY29ubmVjdGVkLlwiLCBjbGllbnRJZGVudGl0eSk7XG5cblx0XHRmb3IgKGNvbnN0IFtrZXksIHZhbHVlXSBvZiBPYmplY3QuZW50cmllcyh0aGlzLl90cmFja2VkSW50ZW50SGFuZGxlcnMpKSB7XG5cdFx0XHR0aGlzLl90cmFja2VkSW50ZW50SGFuZGxlcnNba2V5XSA9IHZhbHVlLmZpbHRlcihcblx0XHRcdFx0KGVudHJ5KSA9PiBlbnRyeS5jbGllbnRJZGVudGl0eS5lbmRwb2ludElkICE9PSBjbGllbnRJZGVudGl0eS5lbmRwb2ludElkXG5cdFx0XHQpO1xuXHRcdH1cblxuXHRcdGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIE9iamVjdC5lbnRyaWVzKHRoaXMuX3RyYWNrZWRDb250ZXh0SGFuZGxlcnMpKSB7XG5cdFx0XHR0aGlzLl90cmFja2VkQ29udGV4dEhhbmRsZXJzW2tleV0gPSB2YWx1ZS5maWx0ZXIoXG5cdFx0XHRcdChlbnRyeSkgPT4gZW50cnkuY2xpZW50SWRlbnRpdHkuZW5kcG9pbnRJZCAhPT0gY2xpZW50SWRlbnRpdHkuZW5kcG9pbnRJZFxuXHRcdFx0KTtcblx0XHR9XG5cdFx0dGhpcy5yZW1vdmVUcmFja2VkQ2xpZW50Q29ubmVjdGlvbihjbGllbnRJZGVudGl0eSk7XG5cdH1cblxuXHQvKipcblx0ICogSGFuZGxlIGFuIGludGVudCBoYW5kbGVyIGJlaW5nIHJlZ2lzdGVyZWQuXG5cdCAqIEBwYXJhbSBwYXlsb2FkIFRoZSBwYXlsb2FkLlxuXHQgKiBAcGFyYW0gY2xpZW50SWRlbnRpdHkgVGhlIGNsaWVudCBpZGVudGl0eS5cblx0ICogQHJldHVybnMgTm90aGluZy5cblx0ICovXG5cdHB1YmxpYyBhc3luYyBpbnRlbnRIYW5kbGVyUmVnaXN0ZXJlZChcblx0XHRwYXlsb2FkOiBJbnRlbnRSZWdpc3RyYXRpb25QYXlsb2FkLFxuXHRcdGNsaWVudElkZW50aXR5OiBPcGVuRmluLkNsaWVudElkZW50aXR5XG5cdCk6IFByb21pc2U8dm9pZD4ge1xuXHRcdHRoaXMuX2xvZ2dlci5pbmZvKFwiaW50ZW50SGFuZGxlclJlZ2lzdGVyZWQ6XCIsIHBheWxvYWQsIGNsaWVudElkZW50aXR5KTtcblx0XHRpZiAoIWlzRW1wdHkocGF5bG9hZCkpIHtcblx0XHRcdGNvbnN0IGludGVudE5hbWU6IHN0cmluZyA9IHBheWxvYWQuaGFuZGxlcklkLnJlcGxhY2UoXCJpbnRlbnQtaGFuZGxlci1cIiwgXCJcIik7XG5cblx0XHRcdGxldCB0cmFja2VkSW50ZW50SGFuZGxlciA9IHRoaXMuX3RyYWNrZWRJbnRlbnRIYW5kbGVyc1tpbnRlbnROYW1lXTtcblxuXHRcdFx0aWYgKGlzRW1wdHkodHJhY2tlZEludGVudEhhbmRsZXIpKSB7XG5cdFx0XHRcdHRyYWNrZWRJbnRlbnRIYW5kbGVyID0gW107XG5cdFx0XHRcdHRoaXMuX3RyYWNrZWRJbnRlbnRIYW5kbGVyc1tpbnRlbnROYW1lXSA9IHRyYWNrZWRJbnRlbnRIYW5kbGVyO1xuXHRcdFx0fVxuXG5cdFx0XHRjb25zdCB0cmFja2VkSGFuZGxlciA9IHRoaXMuX3RyYWNrZWRJbnRlbnRIYW5kbGVyc1tpbnRlbnROYW1lXS5maW5kKFxuXHRcdFx0XHQoZW50cnkpID0+IGVudHJ5LmNsaWVudElkZW50aXR5LmVuZHBvaW50SWQgPT09IGNsaWVudElkZW50aXR5LmVuZHBvaW50SWRcblx0XHRcdCk7XG5cblx0XHRcdGlmIChpc0VtcHR5KHRyYWNrZWRIYW5kbGVyKSkge1xuXHRcdFx0XHR0aGlzLl9sb2dnZXIuaW5mbyhcblx0XHRcdFx0XHRgaW50ZW50SGFuZGxlciBlbmRwb2ludCBub3QgcmVnaXN0ZXJlZC4gUmVnaXN0ZXJpbmcgJHtjbGllbnRJZGVudGl0eS5lbmRwb2ludElkfSBhZ2FpbnN0IGludGVudCAke2ludGVudE5hbWV9IGFuZCBsb29raW5nIHVwIGFwcCBuYW1lLmBcblx0XHRcdFx0KTtcblx0XHRcdFx0Y29uc3QgYXBwSWQgPSBhd2FpdCB0aGlzLl9sb29rdXBBcHBJZChjbGllbnRJZGVudGl0eSk7XG5cblx0XHRcdFx0aWYgKGlzRW1wdHkoYXBwSWQpKSB7XG5cdFx0XHRcdFx0dGhpcy5fbG9nZ2VyLndhcm4oXG5cdFx0XHRcdFx0XHRcIlVuYWJsZSB0byBkZXRlcm1pbmUgYXBwIGlkIGJhc2VkIG9uIG5hbWUuIFRoaXMgYXBwIHdpbGwgbm90IGJlIHRyYWNrZWQgdmlhIGludGVudCBoYW5kbGVyIHJlZ2lzdHJhdGlvbi5cIlxuXHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHRoaXMuX3RyYWNrZWRJbnRlbnRIYW5kbGVyc1tpbnRlbnROYW1lXS5wdXNoKHtcblx0XHRcdFx0XHRmZGMzVmVyc2lvbjogcGF5bG9hZC5mZGMzVmVyc2lvbixcblx0XHRcdFx0XHRjbGllbnRJZGVudGl0eSxcblx0XHRcdFx0XHRhcHBJZFxuXHRcdFx0XHR9KTtcblx0XHRcdFx0dGhpcy5fbG9nZ2VyLmluZm8oXG5cdFx0XHRcdFx0YGludGVudEhhbmRsZXIgZW5kcG9pbnQ6ICR7Y2xpZW50SWRlbnRpdHkuZW5kcG9pbnRJZH0gcmVnaXN0ZXJlZCBhZ2FpbnN0IGludGVudDogJHtpbnRlbnROYW1lfSBhbmQgYXBwIElkOiAke2FwcElkfS5gXG5cdFx0XHRcdCk7XG5cdFx0XHR9XG5cblx0XHRcdGNvbnN0IGNsaWVudFJlYWR5S2V5ID0gdGhpcy5nZXRDbGllbnRSZWFkeUtleShjbGllbnRJZGVudGl0eSwgXCJpbnRlbnRcIiwgaW50ZW50TmFtZSk7XG5cdFx0XHRpZiAoIWlzRW1wdHkodGhpcy5fY2xpZW50UmVhZHlSZXF1ZXN0c1tjbGllbnRSZWFkeUtleV0pKSB7XG5cdFx0XHRcdHRoaXMuX2xvZ2dlci5pbmZvKFwiUmVzb2x2aW5nIGNsaWVudCByZWFkeSByZXF1ZXN0LlwiKTtcblx0XHRcdFx0dGhpcy5fY2xpZW50UmVhZHlSZXF1ZXN0c1tjbGllbnRSZWFkeUtleV0oY2xpZW50SWRlbnRpdHkuZW5kcG9pbnRJZCk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIEEgY29udGV4dCBoYW5kbGVyIGhhcyBiZWVuIHJlZ2lzdGVyZWQgYWdhaW5zdCB0aGUgYnJva2VyLlxuXHQgKiBAcGFyYW0gcGF5bG9hZCBUaGUgcGF5bG9hZCBmcm9tIGEgY29udGV4dCBsaXN0ZW5lciByZWdpc3RyYXRpb24uXG5cdCAqIEBwYXJhbSBwYXlsb2FkLmNvbnRleHRUeXBlIFRoZSBjb250ZXh0IHR5cGUgdGhhdCB0aGUgY2xpZW50IGlzIGxpc3RlbmluZyBmb3IuXG5cdCAqIEBwYXJhbSBwYXlsb2FkLmhhbmRsZXJJZCBUaGUgaGFuZGxlciBJZCBmb3IgdGhpcyBsaXN0ZW5lci5cblx0ICogQHBhcmFtIGNsaWVudElkZW50aXR5IFRoZSBpZGVudGl0eSBvZiB0aGUgYXBwbGljYXRpb24gdGhhdCBpcyBhZGRpbmcgdGhlIGNvbnRleHQgaGFuZGxlci5cblx0ICovXG5cdHB1YmxpYyBhc3luYyBjb250ZXh0SGFuZGxlclJlZ2lzdGVyZWQoXG5cdFx0cGF5bG9hZDogeyBjb250ZXh0VHlwZTogc3RyaW5nIHwgdW5kZWZpbmVkOyBoYW5kbGVySWQ6IHN0cmluZyB9LFxuXHRcdGNsaWVudElkZW50aXR5OiBPcGVuRmluLkNsaWVudElkZW50aXR5XG5cdCk6IFByb21pc2U8dm9pZD4ge1xuXHRcdHRoaXMuX2xvZ2dlci5pbmZvKFwiY29udGV4dEhhbmRsZXJSZWdpc3RlcmVkOlwiLCBwYXlsb2FkLCBjbGllbnRJZGVudGl0eSk7XG5cdFx0aWYgKCFpc0VtcHR5KHBheWxvYWQ/LmhhbmRsZXJJZCkpIHtcblx0XHRcdGNvbnN0IGNvbnRleHRUeXBlTmFtZTogc3RyaW5nID0gcGF5bG9hZD8uY29udGV4dFR5cGUgPz8gXCIqXCI7XG5cdFx0XHRjb25zdCBoYW5kbGVySWQgPSBwYXlsb2FkLmhhbmRsZXJJZDtcblx0XHRcdGxldCB0cmFja2VkQ29udGV4dEhhbmRsZXIgPSB0aGlzLl90cmFja2VkQ29udGV4dEhhbmRsZXJzW2NvbnRleHRUeXBlTmFtZV07XG5cblx0XHRcdGlmIChpc0VtcHR5KHRyYWNrZWRDb250ZXh0SGFuZGxlcikpIHtcblx0XHRcdFx0dHJhY2tlZENvbnRleHRIYW5kbGVyID0gW107XG5cdFx0XHRcdHRoaXMuX3RyYWNrZWRDb250ZXh0SGFuZGxlcnNbY29udGV4dFR5cGVOYW1lXSA9IHRyYWNrZWRDb250ZXh0SGFuZGxlcjtcblx0XHRcdH1cblxuXHRcdFx0Y29uc3QgdHJhY2tlZEhhbmRsZXIgPSB0aGlzLl90cmFja2VkQ29udGV4dEhhbmRsZXJzW2NvbnRleHRUeXBlTmFtZV0uZmluZChcblx0XHRcdFx0KGVudHJ5KSA9PiBlbnRyeS5jbGllbnRJZGVudGl0eS5lbmRwb2ludElkID09PSBjbGllbnRJZGVudGl0eS5lbmRwb2ludElkXG5cdFx0XHQpO1xuXG5cdFx0XHRpZiAoaXNFbXB0eSh0cmFja2VkSGFuZGxlcikpIHtcblx0XHRcdFx0dGhpcy5fbG9nZ2VyLmluZm8oXG5cdFx0XHRcdFx0YGNvbnRleHRIYW5kbGVyIGVuZHBvaW50IG5vdCByZWdpc3RlcmVkLiBSZWdpc3RlcmluZyAke2NsaWVudElkZW50aXR5LmVuZHBvaW50SWR9IGFnYWluc3QgY29udGV4dCBoYW5kbGVyIGZvciBjb250ZXh0IHR5cGUgJHtjb250ZXh0VHlwZU5hbWV9IGFuZCBsb29raW5nIHVwIGFwcCBuYW1lLmBcblx0XHRcdFx0KTtcblx0XHRcdFx0Y29uc3QgYXBwSWQgPSBhd2FpdCB0aGlzLl9sb29rdXBBcHBJZChjbGllbnRJZGVudGl0eSk7XG5cblx0XHRcdFx0aWYgKGlzRW1wdHkoYXBwSWQpKSB7XG5cdFx0XHRcdFx0dGhpcy5fbG9nZ2VyLndhcm4oXG5cdFx0XHRcdFx0XHRcIlVuYWJsZSB0byBkZXRlcm1pbmUgYXBwIGlkIGJhc2VkIG9uIG5hbWUuIFRoaXMgYXBwIHdpbGwgbm90IGJlIHRyYWNrZWQgdmlhIGNvbnRleHQgaGFuZGxlciByZWdpc3RyYXRpb24uXCJcblx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fVxuXHRcdFx0XHR0aGlzLl90cmFja2VkQ29udGV4dEhhbmRsZXJzW2NvbnRleHRUeXBlTmFtZV0ucHVzaCh7XG5cdFx0XHRcdFx0Y2xpZW50SWRlbnRpdHksXG5cdFx0XHRcdFx0YXBwSWQsXG5cdFx0XHRcdFx0aGFuZGxlcklkXG5cdFx0XHRcdH0pO1xuXHRcdFx0XHR0aGlzLl9sb2dnZXIuaW5mbyhcblx0XHRcdFx0XHRgY29udGV4dEhhbmRsZXIgZW5kcG9pbnQ6ICR7Y2xpZW50SWRlbnRpdHkuZW5kcG9pbnRJZH0gcmVnaXN0ZXJlZCBhZ2FpbnN0IGNvbnRleHQgdHlwZTogJHtjb250ZXh0VHlwZU5hbWV9IGFuZCBhcHAgSWQ6ICR7YXBwSWR9LmBcblx0XHRcdFx0KTtcblx0XHRcdH1cblxuXHRcdFx0Y29uc3QgY2xpZW50UmVhZHlLZXkgPSB0aGlzLmdldENsaWVudFJlYWR5S2V5KGNsaWVudElkZW50aXR5LCBcImNvbnRleHRcIiwgY29udGV4dFR5cGVOYW1lKTtcblx0XHRcdGlmICghaXNFbXB0eSh0aGlzLl9jbGllbnRSZWFkeVJlcXVlc3RzW2NsaWVudFJlYWR5S2V5XSkpIHtcblx0XHRcdFx0dGhpcy5fbG9nZ2VyLmluZm8oXCJSZXNvbHZpbmcgY2xpZW50IHJlYWR5IHJlcXVlc3QuXCIpO1xuXHRcdFx0XHR0aGlzLl9jbGllbnRSZWFkeVJlcXVlc3RzW2NsaWVudFJlYWR5S2V5XShjbGllbnRJZGVudGl0eS5lbmRwb2ludElkKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogQ2FwdHVyZSB0aGUgY29ubmVjdGlvbiBhbmQgQVBJIHZlcnNpb24uXG5cdCAqIEBwYXJhbSBpZCBUaGUgY2xpZW50IGlkZW50aXR5IHRvIGNhcHR1cmUgZnJvbS5cblx0ICogQHBhcmFtIHBheWxvYWQgVGhlIHBheWxvYWQuXG5cdCAqL1xuXHRwdWJsaWMgYXN5bmMgY2xpZW50Q29ubmVjdGlvblJlZ2lzdGVyZWQoXG5cdFx0aWQ6IE9wZW5GaW4uQ2xpZW50SWRlbnRpdHkgJiB7IGNvbm5lY3Rpb25Vcmw/OiBzdHJpbmc7IGVudGl0eVR5cGU/OiBzdHJpbmcgfSxcblx0XHRwYXlsb2FkPzogQ2FwdHVyZUFwaVBheWxvYWRcblx0KTogUHJvbWlzZTx2b2lkPiB7XG5cdFx0Y29uc3Qga2V5ID0gYCR7aWQudXVpZH0tJHtpZC5uYW1lfWA7XG5cdFx0bGV0IGFwaVZlcnNpb246IEFwaU1ldGFkYXRhIHwgdW5kZWZpbmVkO1xuXHRcdGlmIChpc0VtcHR5KHRoaXMuX3RyYWNrZWRDbGllbnRDb25uZWN0aW9uc1trZXldKSkge1xuXHRcdFx0aWYgKGlkLnV1aWQgIT09IGZpbi5tZS5pZGVudGl0eS51dWlkKSB7XG5cdFx0XHRcdGNvbnN0IHBheWxvYWRBcGlWZXJzaW9uID0gcGF5bG9hZD8uYXBpVmVyc2lvbjtcblx0XHRcdFx0aWYgKCFpc0VtcHR5KHBheWxvYWRBcGlWZXJzaW9uKSAmJiAhaXNFbXB0eShwYXlsb2FkQXBpVmVyc2lvbj8udHlwZSkpIHtcblx0XHRcdFx0XHRhcGlWZXJzaW9uID0gcGF5bG9hZEFwaVZlcnNpb247XG5cdFx0XHRcdH0gZWxzZSBpZiAoaXNTdHJpbmdWYWx1ZShpZC5jb25uZWN0aW9uVXJsKSkge1xuXHRcdFx0XHRcdC8vIGlmIHRoZXkgaGF2ZW4ndCBzcGVjaWZpZWQgYXBpVmVyc2lvbiBtZXRhIGRhdGEgYW5kIGl0IGlzIGV4dGVybmFsIGFuZCBoYXMgYSB1cmwgdGhlbiB3ZSB3aWxsIGFzc3VtZSBmZGMzIDIuMFxuXHRcdFx0XHRcdGFwaVZlcnNpb24gPSB7IHR5cGU6IFwiZmRjM1wiLCB2ZXJzaW9uOiBcIjIuMFwiIH07XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0Ly8gaWYgYSBuYXRpdmUgYXBwIGhhcyBzcGVjaWZpZWQgYSBwcmVmZXJlbmNlIHRocm91Z2ggYXBpVmVyc2lvbiB0aGVuIHdlIGFzc3VtZSBpbnRlcm9wXG5cdFx0XHRcdFx0YXBpVmVyc2lvbiA9IHsgdHlwZTogXCJpbnRlcm9wXCIgfTtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Y29uc3QgZW50aXR5VHlwZSA9IGlkLmVudGl0eVR5cGU7XG5cdFx0XHRcdGlmICghaXNFbXB0eShlbnRpdHlUeXBlKSkge1xuXHRcdFx0XHRcdHN3aXRjaCAoZW50aXR5VHlwZSkge1xuXHRcdFx0XHRcdFx0Y2FzZSBcIndpbmRvd1wiOiB7XG5cdFx0XHRcdFx0XHRcdGFwaVZlcnNpb24gPSBhd2FpdCB0aGlzLmNhcHR1cmVXaW5kb3dBcGlVc2FnZShpZCk7XG5cdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0Y2FzZSBcInZpZXdcIjoge1xuXHRcdFx0XHRcdFx0XHRhcGlWZXJzaW9uID0gYXdhaXQgdGhpcy5jYXB0dXJlVmlld0FwaVVzYWdlKGlkKTtcblx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRkZWZhdWx0OiB7XG5cdFx0XHRcdFx0XHRcdHRoaXMuX2xvZ2dlci53YXJuKFxuXHRcdFx0XHRcdFx0XHRcdGBXZSBjdXJyZW50bHkgZG8gbm90IGNoZWNrIGZvciBlbnRpdHkgdHlwZXMgdGhhdCBhcmUgbm90IHZpZXdzIG9yIHdpbmRvd3MuIEVudGl0eSB0eXBlOiAke2VudGl0eVR5cGV9YFxuXHRcdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRhcGlWZXJzaW9uID0gYXdhaXQgdGhpcy5jYXB0dXJlVmlld0FwaVVzYWdlKGlkKTtcblx0XHRcdFx0XHRpZiAoaXNFbXB0eShhcGlWZXJzaW9uKSkge1xuXHRcdFx0XHRcdFx0Ly8gcGVyaGFwcyBpdCBpcyBhIHdpbmRvd1xuXHRcdFx0XHRcdFx0YXBpVmVyc2lvbiA9IGF3YWl0IHRoaXMuY2FwdHVyZVdpbmRvd0FwaVVzYWdlKGlkKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGNvbnN0IGJyb2tlckNsaWVudENvbm5lY3Rpb246IEJyb2tlckNsaWVudENvbm5lY3Rpb24gPSB7XG5cdFx0XHRcdGNsaWVudElkZW50aXR5OiBpZCxcblx0XHRcdFx0YXBpTWV0YWRhdGE6IGFwaVZlcnNpb25cblx0XHRcdH07XG5cblx0XHRcdHRoaXMuX3RyYWNrZWRDbGllbnRDb25uZWN0aW9uc1trZXldID0gYnJva2VyQ2xpZW50Q29ubmVjdGlvbjtcblx0XHRcdGNvbnN0IGNsaWVudFJlYWR5S2V5ID0gdGhpcy5nZXRDbGllbnRSZWFkeUtleShpZCwgXCJjb25uZWN0aW9uXCIpO1xuXHRcdFx0aWYgKCFpc0VtcHR5KHRoaXMuX2NsaWVudFJlYWR5UmVxdWVzdHNbY2xpZW50UmVhZHlLZXldKSkge1xuXHRcdFx0XHR0aGlzLl9sb2dnZXIuaW5mbyhcIlJlc29sdmluZyBjbGllbnQgcmVhZHkgcmVxdWVzdC5cIik7XG5cdFx0XHRcdHRoaXMuX2NsaWVudFJlYWR5UmVxdWVzdHNbY2xpZW50UmVhZHlLZXldKGlkLmVuZHBvaW50SWQpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBHZXQgYSBjb250ZXh0IGhhbmRsZXIgdGhhdCBtYXRjaGVzIHRoZSBjb250ZXh0IHR5cGUgbmFtZSBhbmQgaW5zdGFuY2UgaWQuXG5cdCAqIEBwYXJhbSBjb250ZXh0VHlwZU5hbWUgdGhlIG5hbWUgb2YgdGhlIGNvbnRleHQgdGhlIGxpc3RlbmVyIGlzIHJlZ2lzdGVyZWQgZm9yLlxuXHQgKiBAcGFyYW0gaW5zdGFuY2VJZCB0aGUgaW5zdGFuY2VJZCB5b3Ugd2lzaCB0byBjaGVjayBmb3IuXG5cdCAqIEByZXR1cm5zIFRoZSBDb250ZXh0UmVnaXN0cmF0aW9uRW50cnkgb3IgdW5kZWZpbmVkLlxuXHQgKi9cblx0cHVibGljIGdldFJlZ2lzdGVyZWRDb250ZXh0SGFuZGxlcihcblx0XHRjb250ZXh0VHlwZU5hbWU6IHN0cmluZyxcblx0XHRpbnN0YW5jZUlkOiBzdHJpbmdcblx0KTogQ29udGV4dFJlZ2lzdHJhdGlvbkVudHJ5IHwgdW5kZWZpbmVkIHtcblx0XHRjb25zdCB0cmFja2VkSGFuZGxlciA9IHRoaXMuX3RyYWNrZWRDb250ZXh0SGFuZGxlcnNbY29udGV4dFR5cGVOYW1lXT8uZmluZChcblx0XHRcdChlbnRyeSkgPT4gZW50cnkuY2xpZW50SWRlbnRpdHkuZW5kcG9pbnRJZCA9PT0gaW5zdGFuY2VJZFxuXHRcdCk7XG5cdFx0cmV0dXJuIHRyYWNrZWRIYW5kbGVyO1xuXHR9XG5cblx0LyoqXG5cdCAqIEhhbmRsZSBGREMzIGZpbmQgaW5zdGFuY2VzIGZvciBhcHAgaW5zdGFuY2VzIHRoYXQgaGF2ZSByZWdpc3RlcmVkIGZvciBhbiBpbnRlbnQuXG5cdCAqIEBwYXJhbSBhcHAgVGhlIGFwcCBpZGVudGlmaWVyIHRvIGZpbmQuXG5cdCAqIEBwYXJhbSBjbGllbnRJZGVudGl0eSBUaGUgY2xpZW50IGlkZW50aXR5LlxuXHQgKiBAcGFyYW0gdHlwZSB0aGUgdHlwZSBvZiBhcHAgaW5zdGFuY2VzIHlvdSBhcmUgYWZ0ZXIuIENPTk5FQ1RFRCA9IGFueXRoaW5nIHRoYXQgaGFzIGNvbm5lY3RlZCB0byB0aGUgYnJva2VyIGFuZCBJTlRFTlQgbWVhbnMgYW4gQVBQIHRoYXQgaGFzIHJlZ2lzdGVyZWQgYW4gSW50ZW50IEhhbmRsZXIuXG5cdCAqIEByZXR1cm5zIFRoZSBpbnN0YW5jZSBvZiB0aGUgYXBwLlxuXHQgKi9cblx0cHVibGljIGFzeW5jIGZpbmRBcHBJbnN0YW5jZXMoXG5cdFx0YXBwOiBBcHBJZGVudGlmaWVyLFxuXHRcdGNsaWVudElkZW50aXR5OiBPcGVuRmluLkNsaWVudElkZW50aXR5LFxuXHRcdHR5cGU6IFwiY29ubmVjdGVkXCIgfCBcImludGVudFwiID0gXCJjb25uZWN0ZWRcIlxuXHQpOiBQcm9taXNlPEFwcElkZW50aWZpZXJbXT4ge1xuXHRcdGNvbnN0IGVuZHBvaW50QXBwczogeyBba2V5OiBzdHJpbmddOiBBcHBJZGVudGlmaWVyIH0gPSB7fTtcblxuXHRcdGlmICh0eXBlID09PSBcImludGVudFwiKSB7XG5cdFx0XHRmb3IgKGNvbnN0IFssIHZhbHVlXSBvZiBPYmplY3QuZW50cmllcyh0aGlzLl90cmFja2VkSW50ZW50SGFuZGxlcnMpKSB7XG5cdFx0XHRcdGNvbnN0IGVudHJpZXMgPSB2YWx1ZS5maWx0ZXIoKGVudHJ5KSA9PiBlbnRyeS5hcHBJZCA9PT0gYXBwLmFwcElkKTtcblx0XHRcdFx0Zm9yIChjb25zdCBlbnRyeSBvZiBlbnRyaWVzKSB7XG5cdFx0XHRcdFx0ZW5kcG9pbnRBcHBzW2VudHJ5LmNsaWVudElkZW50aXR5LmVuZHBvaW50SWRdID0ge1xuXHRcdFx0XHRcdFx0YXBwSWQ6IGVudHJ5LmFwcElkID8/IFwiXCIsXG5cdFx0XHRcdFx0XHRpbnN0YW5jZUlkOiBlbnRyeS5jbGllbnRJZGVudGl0eS5lbmRwb2ludElkXG5cdFx0XHRcdFx0fTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIE9iamVjdC52YWx1ZXMoZW5kcG9pbnRBcHBzKTtcblx0XHR9XG5cblx0XHRmb3IgKGNvbnN0IFssIHZhbHVlXSBvZiBPYmplY3QuZW50cmllcyh0aGlzLl90cmFja2VkQ2xpZW50Q29ubmVjdGlvbnMpKSB7XG5cdFx0XHRjb25zdCB0cmFja2VkQXBwSWQgPSBhd2FpdCB0aGlzLl9sb29rdXBBcHBJZCh2YWx1ZS5jbGllbnRJZGVudGl0eSk7XG5cdFx0XHRpZiAodHJhY2tlZEFwcElkID09PSBhcHAuYXBwSWQgJiYgaXNFbXB0eShlbmRwb2ludEFwcHNbdmFsdWUuY2xpZW50SWRlbnRpdHkuZW5kcG9pbnRJZF0pKSB7XG5cdFx0XHRcdGVuZHBvaW50QXBwc1t2YWx1ZS5jbGllbnRJZGVudGl0eS5lbmRwb2ludElkXSA9IHtcblx0XHRcdFx0XHRhcHBJZDogYXBwLmFwcElkID8/IFwiXCIsXG5cdFx0XHRcdFx0aW5zdGFuY2VJZDogdmFsdWUuY2xpZW50SWRlbnRpdHkuZW5kcG9pbnRJZFxuXHRcdFx0XHR9O1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiBPYmplY3QudmFsdWVzKGVuZHBvaW50QXBwcyk7XG5cdH1cblxuXHQvKipcblx0ICogR2V0IHRoZSBhcGkgdmVyc2lvbiBmb3IgdGhlIGlkZW50aXR5LlxuXHQgKiBAcGFyYW0gaWQgVGhlIGlkZW50aXR5IHRvIGdldCB0aGUgYXBpIHZlcnNpb24gZm9yLlxuXHQgKiBAcmV0dXJucyBUaGUgYXBpIG1ldGFkYXRhLlxuXHQgKi9cblx0cHVibGljIGdldEFwaVZlcnNpb24oaWQ6IE9wZW5GaW4uSWRlbnRpdHkpOiBBcGlNZXRhZGF0YSB8IHVuZGVmaW5lZCB7XG5cdFx0Y29uc3Qga2V5ID0gYCR7aWQudXVpZH0tJHtpZC5uYW1lfWA7XG5cdFx0Y29uc3QgYXBpVmVyc2lvbjogQXBpTWV0YWRhdGEgfCB1bmRlZmluZWQgPSB0aGlzLl90cmFja2VkQ2xpZW50Q29ubmVjdGlvbnNba2V5XT8uYXBpTWV0YWRhdGE7XG5cdFx0cmV0dXJuIGFwaVZlcnNpb247XG5cdH1cblxuXHQvKipcblx0ICogSGFuZGxlIGNsaWVudCByZWFkeSBldmVudCBmb3Igb3BlbmluZyBhbmQgYXdhaXRpbmcgYSBjb25uZWN0aW9uIHRvIHRoZSBicm9rZXIuXG5cdCAqIEBwYXJhbSBpZGVudGl0eSBUaGUgaWRlbnRpdHkgb2YgdGhlIGNsaWVudC5cblx0ICogQHBhcmFtIHRpbWVvdXQgVGhlIHRpbWVvdXQgdG8gd2FpdCBmb3IgdGhlIGNsaWVudC5cblx0ICogQHJldHVybnMgVGhlIGluc3RhbmNlIGlkLlxuXHQgKi9cblx0cHVibGljIGFzeW5jIG9uQ29ubmVjdGlvbkNsaWVudFJlYWR5KGlkZW50aXR5OiBPcGVuRmluLklkZW50aXR5LCB0aW1lb3V0OiBudW1iZXIgPSAxNTAwMCk6IFByb21pc2U8c3RyaW5nPiB7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlPHN0cmluZz4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0Y29uc3QgY2xpZW50SWRlbnRpdHkgPSB0aGlzLmdldENsaWVudElkZW50aXR5KGlkZW50aXR5KTtcblx0XHRcdGlmICghaXNFbXB0eShjbGllbnRJZGVudGl0eSkpIHtcblx0XHRcdFx0cmVzb2x2ZShjbGllbnRJZGVudGl0eS5lbmRwb2ludElkKTtcblx0XHRcdH1cblx0XHRcdGNvbnN0IGtleSA9IHRoaXMuZ2V0Q2xpZW50UmVhZHlLZXkoaWRlbnRpdHksIFwiY29ubmVjdGlvblwiKTtcblx0XHRcdGNvbnN0IHRpbWVySWQgPSBzZXRUaW1lb3V0KCgpID0+IHtcblx0XHRcdFx0aWYgKCFpc0VtcHR5KHRoaXMuX2NsaWVudFJlYWR5UmVxdWVzdHNba2V5XSkpIHtcblx0XHRcdFx0XHRkZWxldGUgdGhpcy5fY2xpZW50UmVhZHlSZXF1ZXN0c1trZXldO1xuXHRcdFx0XHRcdHJlamVjdChSZXNvbHZlRXJyb3IuVGFyZ2V0SW5zdGFuY2VVbmF2YWlsYWJsZSk7XG5cdFx0XHRcdH1cblx0XHRcdH0sIHRpbWVvdXQpO1xuXHRcdFx0dGhpcy5fY2xpZW50UmVhZHlSZXF1ZXN0c1trZXldID0gKGluc3RhbmNlSWQ6IHN0cmluZyk6IHZvaWQgPT4ge1xuXHRcdFx0XHRjbGVhclRpbWVvdXQodGltZXJJZCk7XG5cdFx0XHRcdC8vIGNsZWFyIHRoZSBjYWxsYmFjayBhc3luY2hyb25vdXNseVxuXHRcdFx0XHRkZWxldGUgdGhpcy5fY2xpZW50UmVhZHlSZXF1ZXN0c1trZXldO1xuXHRcdFx0XHRyZXNvbHZlKGluc3RhbmNlSWQpO1xuXHRcdFx0fTtcblx0XHR9KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBIYW5kbGUgY2xpZW50IHJlYWR5IGV2ZW50IGZvciBpbnRlbnQgaGFuZGxpbmcuXG5cdCAqIEBwYXJhbSBpZGVudGl0eSBUaGUgaWRlbnRpdHkgb2YgdGhlIGNsaWVudC5cblx0ICogQHBhcmFtIGludGVudE5hbWUgVGhlIGludGVudCBuYW1lLlxuXHQgKiBAcGFyYW0gdGltZW91dCBUaGUgdGltZW91dCB0byB3YWl0IGZvciB0aGUgY2xpZW50LlxuXHQgKiBAcmV0dXJucyBUaGUgaW5zdGFuY2UgaWQuXG5cdCAqL1xuXHRwdWJsaWMgYXN5bmMgb25JbnRlbnRDbGllbnRSZWFkeShcblx0XHRpZGVudGl0eTogT3BlbkZpbi5JZGVudGl0eSxcblx0XHRpbnRlbnROYW1lOiBzdHJpbmcsXG5cdFx0dGltZW91dDogbnVtYmVyID0gMTUwMDBcblx0KTogUHJvbWlzZTxzdHJpbmc+IHtcblx0XHRyZXR1cm4gbmV3IFByb21pc2U8c3RyaW5nPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0XHRjb25zdCByZWdpc3RlcmVkSGFuZGxlcnMgPSB0aGlzLl90cmFja2VkSW50ZW50SGFuZGxlcnNbaW50ZW50TmFtZV07XG5cdFx0XHRsZXQgZXhpc3RpbmdJbnN0YW5jZUlkOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG5cdFx0XHRpZiAoIWlzRW1wdHkocmVnaXN0ZXJlZEhhbmRsZXJzKSkge1xuXHRcdFx0XHRmb3IgKGNvbnN0IGhhbmRsZXIgb2YgcmVnaXN0ZXJlZEhhbmRsZXJzKSB7XG5cdFx0XHRcdFx0aWYgKFxuXHRcdFx0XHRcdFx0aGFuZGxlci5jbGllbnRJZGVudGl0eS51dWlkID09PSBpZGVudGl0eS51dWlkICYmXG5cdFx0XHRcdFx0XHRoYW5kbGVyLmNsaWVudElkZW50aXR5Lm5hbWUgPT09IGlkZW50aXR5Lm5hbWVcblx0XHRcdFx0XHQpIHtcblx0XHRcdFx0XHRcdGV4aXN0aW5nSW5zdGFuY2VJZCA9IGhhbmRsZXIuY2xpZW50SWRlbnRpdHkuZW5kcG9pbnRJZDtcblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0aWYgKCFpc0VtcHR5KGV4aXN0aW5nSW5zdGFuY2VJZCkpIHtcblx0XHRcdFx0cmVzb2x2ZShleGlzdGluZ0luc3RhbmNlSWQpO1xuXHRcdFx0fVxuXHRcdFx0Y29uc3Qga2V5ID0gdGhpcy5nZXRDbGllbnRSZWFkeUtleShpZGVudGl0eSwgXCJpbnRlbnRcIiwgaW50ZW50TmFtZSk7XG5cdFx0XHRjb25zdCB0aW1lcklkID0gc2V0VGltZW91dCgoKSA9PiB7XG5cdFx0XHRcdGlmICghaXNFbXB0eSh0aGlzLl9jbGllbnRSZWFkeVJlcXVlc3RzW2tleV0pKSB7XG5cdFx0XHRcdFx0ZGVsZXRlIHRoaXMuX2NsaWVudFJlYWR5UmVxdWVzdHNba2V5XTtcblx0XHRcdFx0XHRyZWplY3QoUmVzb2x2ZUVycm9yLkludGVudERlbGl2ZXJ5RmFpbGVkKTtcblx0XHRcdFx0fVxuXHRcdFx0fSwgdGltZW91dCk7XG5cdFx0XHR0aGlzLl9jbGllbnRSZWFkeVJlcXVlc3RzW2tleV0gPSAoaW5zdGFuY2VJZDogc3RyaW5nKTogdm9pZCA9PiB7XG5cdFx0XHRcdGNsZWFyVGltZW91dCh0aW1lcklkKTtcblx0XHRcdFx0Ly8gY2xlYXIgdGhlIGNhbGxiYWNrIGFzeW5jaHJvbm91c2x5XG5cdFx0XHRcdGRlbGV0ZSB0aGlzLl9jbGllbnRSZWFkeVJlcXVlc3RzW2tleV07XG5cdFx0XHRcdHJlc29sdmUoaW5zdGFuY2VJZCk7XG5cdFx0XHR9O1xuXHRcdH0pO1xuXHR9XG5cblx0LyoqXG5cdCAqIEhhbmRsZSBjbGllbnQgcmVhZHkgZXZlbnQgZm9yIGNvbnRleHQgaGFuZGxpbmcuXG5cdCAqIEBwYXJhbSBpZGVudGl0eSBUaGUgaWRlbnRpdHkgb2YgdGhlIGNsaWVudC5cblx0ICogQHBhcmFtIGNvbnRleHRUeXBlTmFtZSBUaGUgY29udGV4dFR5cGUgbmFtZS5cblx0ICogQHBhcmFtIHRpbWVvdXQgVGhlIHRpbWVvdXQgdG8gd2FpdCBmb3IgdGhlIGNsaWVudC5cblx0ICogQHJldHVybnMgVGhlIGluc3RhbmNlIGlkLlxuXHQgKi9cblx0cHVibGljIGFzeW5jIG9uQ29udGV4dENsaWVudFJlYWR5KFxuXHRcdGlkZW50aXR5OiBPcGVuRmluLklkZW50aXR5LFxuXHRcdGNvbnRleHRUeXBlTmFtZTogc3RyaW5nLFxuXHRcdHRpbWVvdXQ6IG51bWJlciA9IDE1MDAwXG5cdCk6IFByb21pc2U8c3RyaW5nPiB7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlPHN0cmluZz4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0Y29uc3QgY29udGV4dFJlZ2lzdGVyZWRIYW5kbGVycyA9IHRoaXMuX3RyYWNrZWRDb250ZXh0SGFuZGxlcnNbY29udGV4dFR5cGVOYW1lXTtcblx0XHRcdGNvbnN0IGdsb2JhbFJlZ2lzdGVyZWRIYW5kbGVycyA9IHRoaXMuX3RyYWNrZWRDb250ZXh0SGFuZGxlcnNbXCIqXCJdO1xuXHRcdFx0bGV0IGV4aXN0aW5nQ29udGV4dEhhbmRsZXJJbnN0YW5jZUlkOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG5cblx0XHRcdGlmICghaXNFbXB0eShjb250ZXh0UmVnaXN0ZXJlZEhhbmRsZXJzKSkge1xuXHRcdFx0XHRmb3IgKGNvbnN0IGhhbmRsZXIgb2YgY29udGV4dFJlZ2lzdGVyZWRIYW5kbGVycykge1xuXHRcdFx0XHRcdGlmIChcblx0XHRcdFx0XHRcdGhhbmRsZXIuY2xpZW50SWRlbnRpdHkudXVpZCA9PT0gaWRlbnRpdHkudXVpZCAmJlxuXHRcdFx0XHRcdFx0aGFuZGxlci5jbGllbnRJZGVudGl0eS5uYW1lID09PSBpZGVudGl0eS5uYW1lXG5cdFx0XHRcdFx0KSB7XG5cdFx0XHRcdFx0XHRleGlzdGluZ0NvbnRleHRIYW5kbGVySW5zdGFuY2VJZCA9IGhhbmRsZXIuY2xpZW50SWRlbnRpdHkuZW5kcG9pbnRJZDtcblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRpZiAoIWlzRW1wdHkoZ2xvYmFsUmVnaXN0ZXJlZEhhbmRsZXJzKSAmJiBpc0VtcHR5KGV4aXN0aW5nQ29udGV4dEhhbmRsZXJJbnN0YW5jZUlkKSkge1xuXHRcdFx0XHRmb3IgKGNvbnN0IGhhbmRsZXIgb2YgZ2xvYmFsUmVnaXN0ZXJlZEhhbmRsZXJzKSB7XG5cdFx0XHRcdFx0aWYgKFxuXHRcdFx0XHRcdFx0aGFuZGxlci5jbGllbnRJZGVudGl0eS51dWlkID09PSBpZGVudGl0eS51dWlkICYmXG5cdFx0XHRcdFx0XHRoYW5kbGVyLmNsaWVudElkZW50aXR5Lm5hbWUgPT09IGlkZW50aXR5Lm5hbWVcblx0XHRcdFx0XHQpIHtcblx0XHRcdFx0XHRcdGV4aXN0aW5nQ29udGV4dEhhbmRsZXJJbnN0YW5jZUlkID0gaGFuZGxlci5jbGllbnRJZGVudGl0eS5lbmRwb2ludElkO1xuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRpZiAoIWlzRW1wdHkoZXhpc3RpbmdDb250ZXh0SGFuZGxlckluc3RhbmNlSWQpKSB7XG5cdFx0XHRcdHJlc29sdmUoZXhpc3RpbmdDb250ZXh0SGFuZGxlckluc3RhbmNlSWQpO1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdGNvbnN0IGNvbnRleHRLZXkgPSB0aGlzLmdldENsaWVudFJlYWR5S2V5KGlkZW50aXR5LCBcImNvbnRleHRcIiwgY29udGV4dFR5cGVOYW1lKTtcblx0XHRcdGNvbnN0IGdsb2JhbEtleSA9IHRoaXMuZ2V0Q2xpZW50UmVhZHlLZXkoaWRlbnRpdHksIFwiY29udGV4dFwiLCBcIipcIik7XG5cdFx0XHRjb25zdCB0aW1lcklkID0gc2V0VGltZW91dCgoKSA9PiB7XG5cdFx0XHRcdGNvbnN0IGhhc0NvbnRleHRSZXF1ZXN0ID0gIWlzRW1wdHkodGhpcy5fY2xpZW50UmVhZHlSZXF1ZXN0c1tjb250ZXh0S2V5XSk7XG5cdFx0XHRcdGNvbnN0IGhhc0dsb2JhbFJlcXVlc3QgPSAhaXNFbXB0eSh0aGlzLl9jbGllbnRSZWFkeVJlcXVlc3RzW2dsb2JhbEtleV0pO1xuXG5cdFx0XHRcdGlmIChoYXNDb250ZXh0UmVxdWVzdCB8fCBoYXNHbG9iYWxSZXF1ZXN0KSB7XG5cdFx0XHRcdFx0ZGVsZXRlIHRoaXMuX2NsaWVudFJlYWR5UmVxdWVzdHNbY29udGV4dEtleV07XG5cdFx0XHRcdFx0ZGVsZXRlIHRoaXMuX2NsaWVudFJlYWR5UmVxdWVzdHNbZ2xvYmFsS2V5XTtcblx0XHRcdFx0XHRyZWplY3QoT3BlbkVycm9yLkFwcFRpbWVvdXQpO1xuXHRcdFx0XHR9XG5cdFx0XHR9LCB0aW1lb3V0KTtcblx0XHRcdGxldCBpc1Jlc29sdmVkID0gZmFsc2U7XG5cdFx0XHR0aGlzLl9jbGllbnRSZWFkeVJlcXVlc3RzW2NvbnRleHRLZXldID0gKGluc3RhbmNlSWQ6IHN0cmluZyk6IHZvaWQgPT4ge1xuXHRcdFx0XHRjbGVhclRpbWVvdXQodGltZXJJZCk7XG5cdFx0XHRcdGlmICghaXNSZXNvbHZlZCkge1xuXHRcdFx0XHRcdGlzUmVzb2x2ZWQgPSB0cnVlO1xuXHRcdFx0XHRcdC8vIGNsZWFyIHRoZSBjYWxsYmFjayBhc3luY2hyb25vdXNseVxuXHRcdFx0XHRcdGRlbGV0ZSB0aGlzLl9jbGllbnRSZWFkeVJlcXVlc3RzW2NvbnRleHRLZXldO1xuXHRcdFx0XHRcdGRlbGV0ZSB0aGlzLl9jbGllbnRSZWFkeVJlcXVlc3RzW2dsb2JhbEtleV07XG5cdFx0XHRcdFx0cmVzb2x2ZShpbnN0YW5jZUlkKTtcblx0XHRcdFx0fVxuXHRcdFx0fTtcblx0XHRcdHRoaXMuX2NsaWVudFJlYWR5UmVxdWVzdHNbZ2xvYmFsS2V5XSA9IChpbnN0YW5jZUlkOiBzdHJpbmcpOiB2b2lkID0+IHtcblx0XHRcdFx0Y2xlYXJUaW1lb3V0KHRpbWVySWQpO1xuXHRcdFx0XHRpZiAoIWlzUmVzb2x2ZWQpIHtcblx0XHRcdFx0XHRpc1Jlc29sdmVkID0gdHJ1ZTtcblx0XHRcdFx0XHQvLyBjbGVhciB0aGUgY2FsbGJhY2sgYXN5bmNocm9ub3VzbHlcblx0XHRcdFx0XHRkZWxldGUgdGhpcy5fY2xpZW50UmVhZHlSZXF1ZXN0c1tjb250ZXh0S2V5XTtcblx0XHRcdFx0XHRkZWxldGUgdGhpcy5fY2xpZW50UmVhZHlSZXF1ZXN0c1tnbG9iYWxLZXldO1xuXHRcdFx0XHRcdHJlc29sdmUoaW5zdGFuY2VJZCk7XG5cdFx0XHRcdH1cblx0XHRcdH07XG5cdFx0fSk7XG5cdH1cblxuXHQvKipcblx0ICogR2V0IHRoZSBjbGllbnQgaWRlbnRpdHkgZ2l2ZW4gYSBzdGFuZGFyZCBpZGVudGl0eS5cblx0ICogQHBhcmFtIGlkIFRoZSBpZGVudGl0eSB0byBnZXQgdGhlIGNsaWVudCBpZGVudGl0eSBmb3IuXG5cdCAqIEByZXR1cm5zIFRoZSBjbGllbnQgaWRlbnRpdHkgaWYgYXZhaWxhYmxlLlxuXHQgKi9cblx0cHJpdmF0ZSBnZXRDbGllbnRJZGVudGl0eShpZDogT3BlbkZpbi5JZGVudGl0eSk6IE9wZW5GaW4uQ2xpZW50SWRlbnRpdHkgfCB1bmRlZmluZWQge1xuXHRcdGNvbnN0IGtleSA9IGAke2lkLnV1aWR9LSR7aWQubmFtZX1gO1xuXHRcdGNvbnN0IGNsaWVudElkZW50aXR5OiBPcGVuRmluLkNsaWVudElkZW50aXR5IHwgdW5kZWZpbmVkID1cblx0XHRcdHRoaXMuX3RyYWNrZWRDbGllbnRDb25uZWN0aW9uc1trZXldPy5jbGllbnRJZGVudGl0eTtcblx0XHRyZXR1cm4gY2xpZW50SWRlbnRpdHk7XG5cdH1cblxuXHQvKipcblx0ICogUmVtb3ZlIHRoZSB0cmFja2luZyBmb3IgdGhlIGlkZW50aXR5LlxuXHQgKiBAcGFyYW0gaWQgVGhlIGlkZW50aXR5IHRvIHJlbW92ZSB0aGUgY29ubmVjdGlvbiBpbmZvcm1hdGlvbiBmb3IuXG5cdCAqL1xuXHRwcml2YXRlIHJlbW92ZVRyYWNrZWRDbGllbnRDb25uZWN0aW9uKGlkOiBPcGVuRmluLklkZW50aXR5KTogdm9pZCB7XG5cdFx0Y29uc3Qga2V5ID0gYCR7aWQudXVpZH0tJHtpZC5uYW1lfWA7XG5cdFx0ZGVsZXRlIHRoaXMuX3RyYWNrZWRDbGllbnRDb25uZWN0aW9uc1trZXldO1xuXHR9XG5cblx0LyoqXG5cdCAqIEdldCB0aGUgZmRjMyB1c2FnZSBmcm9tIGEgd2luZG93LlxuXHQgKiBAcGFyYW0gaWQgVGhlIGlmIG9mIHRoZSB2aWV3IHRvIGdldCB0aGUgaW5mbyBmcm9tLlxuXHQgKiBAcmV0dXJucyBUaGUgYXBpIG1ldGFkYXRhLlxuXHQgKi9cblx0cHJpdmF0ZSBhc3luYyBjYXB0dXJlV2luZG93QXBpVXNhZ2UoaWQ6IE9wZW5GaW4uQ2xpZW50SWRlbnRpdHkpOiBQcm9taXNlPEFwaU1ldGFkYXRhIHwgdW5kZWZpbmVkPiB7XG5cdFx0dHJ5IHtcblx0XHRcdGNvbnN0IHRhcmdldCA9IGZpbi5XaW5kb3cud3JhcFN5bmMoaWQpO1xuXHRcdFx0Y29uc3Qgb3B0aW9ucyA9IGF3YWl0IHRhcmdldC5nZXRPcHRpb25zKCk7XG5cdFx0XHRpZiAoIWlzRW1wdHkob3B0aW9ucy5mZGMzSW50ZXJvcEFwaSkpIHtcblx0XHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0XHR0eXBlOiBcImZkYzNcIixcblx0XHRcdFx0XHR2ZXJzaW9uOiBvcHRpb25zLmZkYzNJbnRlcm9wQXBpXG5cdFx0XHRcdH07XG5cdFx0XHR9XG5cdFx0fSBjYXRjaCB7fVxuXHR9XG5cblx0LyoqXG5cdCAqIEdldCB0aGUgZGMzIHVzYWdlIGZyb20gYSB2aWV3LlxuXHQgKiBAcGFyYW0gaWQgVGhlIGlkIG9mIHRoZSB3aW5kb3cgdG8gZ2V0IHRoZSBpbmZvIGZyb20uXG5cdCAqIEByZXR1cm5zIFRoZSBhcGkgbWV0YWRhdGEuXG5cdCAqL1xuXHRwcml2YXRlIGFzeW5jIGNhcHR1cmVWaWV3QXBpVXNhZ2UoaWQ6IE9wZW5GaW4uQ2xpZW50SWRlbnRpdHkpOiBQcm9taXNlPEFwaU1ldGFkYXRhIHwgdW5kZWZpbmVkPiB7XG5cdFx0dHJ5IHtcblx0XHRcdGNvbnN0IHRhcmdldCA9IGZpbi5WaWV3LndyYXBTeW5jKGlkKTtcblx0XHRcdGNvbnN0IG9wdGlvbnMgPSBhd2FpdCB0YXJnZXQuZ2V0T3B0aW9ucygpO1xuXHRcdFx0aWYgKCFpc0VtcHR5KG9wdGlvbnMuZmRjM0ludGVyb3BBcGkpKSB7XG5cdFx0XHRcdHJldHVybiB7XG5cdFx0XHRcdFx0dHlwZTogXCJmZGMzXCIsXG5cdFx0XHRcdFx0dmVyc2lvbjogb3B0aW9ucy5mZGMzSW50ZXJvcEFwaVxuXHRcdFx0XHR9O1xuXHRcdFx0fVxuXHRcdH0gY2F0Y2gge31cblx0fVxuXG5cdC8qKlxuXHQgKiBHZXQgYSBrZXkgdGhhdCBjYW4gYmUgdXNlZCBmb3IgYW4gaWRlbnRpdHkgYW5kIGNsaWVudC5cblx0ICogQHBhcmFtIGlkZW50aXR5IFRoZSBpZGVudGl0eSB0byB1c2UgaW4gdGhlIGtleS5cblx0ICogQHBhcmFtIHR5cGUgVGhlIHR5cGUgb2YgcmVhZHkgZXZlbnQgeW91IGFyZSBsb29raW5nIGZvclxuXHQgKiBAcGFyYW0gbmFtZSBUaGUgbmFtZSBvZiB0aGUgdHlwZSBpZiByZXF1aXJlZCB0byB1c2UgaW4gdGhlIGtleVxuXHQgKiBAcmV0dXJucyBUaGUga2V5LlxuXHQgKi9cblx0cHJpdmF0ZSBnZXRDbGllbnRSZWFkeUtleShcblx0XHRpZGVudGl0eTogT3BlbkZpbi5JZGVudGl0eSxcblx0XHR0eXBlOiBcImNvbm5lY3Rpb25cIiB8IFwiY29udGV4dFwiIHwgXCJpbnRlbnRcIixcblx0XHRuYW1lPzogc3RyaW5nXG5cdCk6IHN0cmluZyB7XG5cdFx0aWYgKGlzRW1wdHkobmFtZSkpIHtcblx0XHRcdHJldHVybiBgJHtpZGVudGl0eS51dWlkfS8ke2lkZW50aXR5Lm5hbWV9LyR7dHlwZX1gO1xuXHRcdH1cblx0XHRyZXR1cm4gYCR7aWRlbnRpdHkudXVpZH0vJHtpZGVudGl0eS5uYW1lfS8ke3R5cGV9LyR7bmFtZX1gO1xuXHR9XG59XG4iLCJpbXBvcnQgeyBSZXNvbHZlRXJyb3IgfSBmcm9tIFwiQGZpbm9zL2ZkYzNcIjtcbmltcG9ydCB0eXBlIE9wZW5GaW4gZnJvbSBcIkBvcGVuZmluL2NvcmVcIjtcbmltcG9ydCB0eXBlIHsgQXBwSW50ZW50IH0gZnJvbSBcIkBvcGVuZmluL3dvcmtzcGFjZS1wbGF0Zm9ybVwiO1xuaW1wb3J0IHR5cGUgeyBQbGF0Zm9ybUFwcCB9IGZyb20gXCJ3b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci9zaGFwZXMvYXBwLXNoYXBlc1wiO1xuaW1wb3J0IHR5cGUge1xuXHRJbnRlbnRSZXNvbHZlclJlc3BvbnNlLFxuXHRJbnRlbnRSZXNvbHZlck9wdGlvbnNcbn0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3NoYXBlcy9pbnRlcm9wYnJva2VyLXNoYXBlc1wiO1xuaW1wb3J0IHR5cGUgeyBMb2dnZXIgfSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvc2hhcGVzL2xvZ2dlci1zaGFwZXNcIjtcbmltcG9ydCB7IGZvcm1hdEVycm9yLCBpc0VtcHR5IH0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3V0aWxzXCI7XG5pbXBvcnQgeyBjZW50ZXJDb250ZW50SW5JZGVudGl0eSB9IGZyb20gXCJ3b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci91dGlscy1wb3NpdGlvblwiO1xuXG4vKipcbiAqIEFuIEludGVudCBSZXNvbHZlciBVc2VkIGZvciByZXNvbHZpbmcgaW50ZW50IHNlbGVjdGlvbi5cbiAqL1xuZXhwb3J0IGNsYXNzIEludGVudFJlc29sdmVySGVscGVyIHtcblx0cHJpdmF0ZSByZWFkb25seSBfbG9nZ2VyOiBMb2dnZXI7XG5cblx0cHJpdmF0ZSByZWFkb25seSBfaW50ZW50UmVzb2x2ZXJPcHRpb25zPzogSW50ZW50UmVzb2x2ZXJPcHRpb25zO1xuXG5cdHByaXZhdGUgcmVhZG9ubHkgX3VucmVnaXN0ZXJlZEFwcElkPzogc3RyaW5nO1xuXG5cdHByaXZhdGUgcmVhZG9ubHkgX2RlZmF1bHRJbnRlbnRSZXNvbHZlckhlaWdodDogbnVtYmVyO1xuXG5cdHByaXZhdGUgcmVhZG9ubHkgX2RlZmF1bHRJbnRlbnRSZXNvbHZlcldpZHRoOiBudW1iZXI7XG5cblx0LyoqXG5cdCAqIENyZWF0ZSBhbiBpbnN0YW5jZSBvZiB0aGUgSW50ZW50IFJlc29sdmVyIEhlbHBlci5cblx0ICogQHBhcmFtIGludGVudFJlc29sdmVyT3B0aW9ucyBvcHRpb25zIGZvciB0aGUgaGVscGVyXG5cdCAqIEBwYXJhbSBsb2dnZXIgdGhlIGxvZ2dlciB0byB1c2UuXG5cdCAqIEBwYXJhbSB1bnJlZ2lzdGVyZWRBcHBJZCBpZiB5b3Ugc3VwcG9ydCB1bnJlZ2lzdGVyZWQgYXBwcyB3aGF0IElkIHNob3VsZCB0aGV5IGJlIGFzc2lnbmVkIGFnYWluc3QuXG5cdCAqL1xuXHRjb25zdHJ1Y3RvcihpbnRlbnRSZXNvbHZlck9wdGlvbnM6IEludGVudFJlc29sdmVyT3B0aW9ucywgbG9nZ2VyOiBMb2dnZXIsIHVucmVnaXN0ZXJlZEFwcElkPzogc3RyaW5nKSB7XG5cdFx0dGhpcy5fZGVmYXVsdEludGVudFJlc29sdmVySGVpZ2h0ID0gNzE1O1xuXHRcdHRoaXMuX2RlZmF1bHRJbnRlbnRSZXNvbHZlcldpZHRoID0gNjY1O1xuXHRcdHRoaXMuX2ludGVudFJlc29sdmVyT3B0aW9ucyA9IHtcblx0XHRcdGhlaWdodDogdGhpcy5fZGVmYXVsdEludGVudFJlc29sdmVySGVpZ2h0LFxuXHRcdFx0d2lkdGg6IHRoaXMuX2RlZmF1bHRJbnRlbnRSZXNvbHZlcldpZHRoLFxuXHRcdFx0ZmRjM0ludGVyb3BBcGk6IFwiMi4wXCIsXG5cdFx0XHR0aXRsZTogXCJJbnRlbnQgUmVzb2x2ZXJcIixcblx0XHRcdC4uLmludGVudFJlc29sdmVyT3B0aW9uc1xuXHRcdH07XG5cdFx0dGhpcy5fbG9nZ2VyID0gbG9nZ2VyO1xuXHR9XG5cblx0LyoqXG5cdCAqIExhdW5jaCB0aGUgaW50ZW50IHJlc29sdmVyLlxuXHQgKiBAcGFyYW0gbGF1bmNoT3B0aW9ucyBUaGUgb3B0aW9ucyBmb3IgbGF1bmNoaW5nIHRoZSByZXNvbHZlci5cblx0ICogQHBhcmFtIGxhdW5jaE9wdGlvbnMuYXBwcyBUaGUgYXBwcyB0byBwaWNrIGZyb20uXG5cdCAqIEBwYXJhbSBsYXVuY2hPcHRpb25zLmludGVudCBUaGUgaW50ZW50IHRvIHBpY2suXG5cdCAqIEBwYXJhbSBsYXVuY2hPcHRpb25zLmludGVudHMgVGhlIGludGVudHMgdG8gcGljayBmcm9tLlxuXHQgKiBAcGFyYW0gY2xpZW50SWRlbnRpdHkgVGhlIGNsaWVudCB0aGF0IHRyaWdnZXJlZCB0aGlzIHJlcXVlc3QuXG5cdCAqIEByZXR1cm5zIFRoZSByZXNwb25zZSBmcm9tIHRoZSBpbnRlbnQgcmVzb2x2ZXIuXG5cdCAqL1xuXHRwdWJsaWMgYXN5bmMgbGF1bmNoSW50ZW50UmVzb2x2ZXIoXG5cdFx0bGF1bmNoT3B0aW9uczoge1xuXHRcdFx0YXBwcz86IFBsYXRmb3JtQXBwW107XG5cdFx0XHRpbnRlbnQ/OiBQYXJ0aWFsPEFwcEludGVudD47XG5cdFx0XHRpbnRlbnRzPzogeyBpbnRlbnQ6IFBhcnRpYWw8QXBwSW50ZW50PjsgYXBwczogUGxhdGZvcm1BcHBbXSB9W107XG5cdFx0fSxcblx0XHRjbGllbnRJZGVudGl0eTogT3BlbkZpbi5DbGllbnRJZGVudGl0eVxuXHQpOiBQcm9taXNlPEludGVudFJlc29sdmVyUmVzcG9uc2U+IHtcblx0XHQvLyBsYXVuY2ggYSBuZXcgd2luZG93IGFuZCBvcHRpb25hbGx5IHBhc3MgdGhlIGF2YWlsYWJsZSBpbnRlbnRzIGFzIGN1c3RvbURhdGEuYXBwcyBhcyBwYXJ0IG9mIHRoZSB3aW5kb3dcblx0XHQvLyBvcHRpb25zIHRoZSB3aW5kb3cgY2FuIHRoZW4gdXNlIHJhaXNlSW50ZW50IGFnYWluc3QgYSBzcGVjaWZpYyBhcHAgKHRoZSBzZWxlY3RlZCBvbmUpLiB0aGlzIGxvZ2ljIHJ1bnMgaW5cblx0XHQvLyB0aGUgcHJvdmlkZXIgc28gd2UgYXJlIHVzaW5nIGl0IGFzIGEgd2F5IG9mIGRldGVybWluaW5nIHRoZSByb290IChzbyBpdCB3b3JrcyB3aXRoIHJvb3QgaG9zdGluZyBhbmRcblx0XHQvLyBzdWJkaXJlY3RvcnkgYmFzZWQgaG9zdGluZyBpZiBhIHVybCBpcyBub3QgcHJvdmlkZWQpXG5cdFx0dHJ5IHtcblx0XHRcdGNvbnN0IHBvc2l0aW9uID0gYXdhaXQgY2VudGVyQ29udGVudEluSWRlbnRpdHkoY2xpZW50SWRlbnRpdHksIHtcblx0XHRcdFx0aGVpZ2h0OiB0aGlzLl9pbnRlbnRSZXNvbHZlck9wdGlvbnM/LmhlaWdodCA/PyB0aGlzLl9kZWZhdWx0SW50ZW50UmVzb2x2ZXJIZWlnaHQsXG5cdFx0XHRcdHdpZHRoOiB0aGlzLl9pbnRlbnRSZXNvbHZlck9wdGlvbnM/LndpZHRoID8/IHRoaXMuX2RlZmF1bHRJbnRlbnRSZXNvbHZlcldpZHRoXG5cdFx0XHR9KTtcblxuXHRcdFx0Y29uc3Qgd2luT3B0aW9uOiBPcGVuRmluLldpbmRvd0NyZWF0aW9uT3B0aW9ucyA9IHtcblx0XHRcdFx0bmFtZTogXCJpbnRlbnQtcGlja2VyXCIsXG5cdFx0XHRcdGluY2x1ZGVJblNuYXBzaG90czogZmFsc2UsXG5cdFx0XHRcdGZkYzNJbnRlcm9wQXBpOiB0aGlzLl9pbnRlbnRSZXNvbHZlck9wdGlvbnM/LmZkYzNJbnRlcm9wQXBpLFxuXHRcdFx0XHRkZWZhdWx0V2lkdGg6IHRoaXMuX2ludGVudFJlc29sdmVyT3B0aW9ucz8ud2lkdGgsXG5cdFx0XHRcdGRlZmF1bHRIZWlnaHQ6IHRoaXMuX2ludGVudFJlc29sdmVyT3B0aW9ucz8uaGVpZ2h0LFxuXHRcdFx0XHRzaG93VGFza2Jhckljb246IGZhbHNlLFxuXHRcdFx0XHRzYXZlV2luZG93U3RhdGU6IGZhbHNlLFxuXHRcdFx0XHRjdXN0b21EYXRhOiB7XG5cdFx0XHRcdFx0dGl0bGU6IHRoaXMuX2ludGVudFJlc29sdmVyT3B0aW9ucz8udGl0bGUsXG5cdFx0XHRcdFx0YXBwczogbGF1bmNoT3B0aW9ucy5hcHBzLFxuXHRcdFx0XHRcdGludGVudDogbGF1bmNoT3B0aW9ucy5pbnRlbnQsXG5cdFx0XHRcdFx0aW50ZW50czogbGF1bmNoT3B0aW9ucy5pbnRlbnRzLFxuXHRcdFx0XHRcdHVucmVnaXN0ZXJlZEFwcElkOiB0aGlzLl91bnJlZ2lzdGVyZWRBcHBJZFxuXHRcdFx0XHR9LFxuXHRcdFx0XHR1cmw6IHRoaXMuX2ludGVudFJlc29sdmVyT3B0aW9ucz8udXJsLFxuXHRcdFx0XHRmcmFtZTogZmFsc2UsXG5cdFx0XHRcdGF1dG9TaG93OiB0cnVlLFxuXHRcdFx0XHRhbHdheXNPblRvcDogdHJ1ZVxuXHRcdFx0fTtcblx0XHRcdGlmICghaXNFbXB0eShwb3NpdGlvbikpIHtcblx0XHRcdFx0d2luT3B0aW9uLmRlZmF1bHRMZWZ0ID0gcG9zaXRpb24ueDtcblx0XHRcdFx0d2luT3B0aW9uLmRlZmF1bHRUb3AgPSBwb3NpdGlvbi55O1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0d2luT3B0aW9uLmRlZmF1bHRDZW50ZXJlZCA9IHRydWU7XG5cdFx0XHR9XG5cblx0XHRcdGNvbnN0IHdpbiA9IGF3YWl0IGZpbi5XaW5kb3cuY3JlYXRlKHdpbk9wdGlvbik7XG5cdFx0XHRjb25zdCB3ZWJXaW5kb3cgPSB3aW4uZ2V0V2ViV2luZG93KCk7XG5cdFx0XHRjb25zdCB3ZWJXaW5kb3dSZXNvbHZlciA9IHdlYldpbmRvdyBhcyB1bmtub3duIGFzIHtcblx0XHRcdFx0Z2V0SW50ZW50U2VsZWN0aW9uOiAoKSA9PiBQcm9taXNlPEludGVudFJlc29sdmVyUmVzcG9uc2U+O1xuXHRcdFx0fTtcblx0XHRcdGNvbnN0IHNlbGVjdGVkQXBwSWQ6IEludGVudFJlc29sdmVyUmVzcG9uc2UgPSBhd2FpdCB3ZWJXaW5kb3dSZXNvbHZlci5nZXRJbnRlbnRTZWxlY3Rpb24oKTtcblx0XHRcdHJldHVybiBzZWxlY3RlZEFwcElkO1xuXHRcdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0XHRjb25zdCBtZXNzYWdlID0gZm9ybWF0RXJyb3IoZXJyb3IpO1xuXG5cdFx0XHRpZiAobWVzc2FnZT8uaW5jbHVkZXMoUmVzb2x2ZUVycm9yLlVzZXJDYW5jZWxsZWQpKSB7XG5cdFx0XHRcdHRoaXMuX2xvZ2dlci5pbmZvKFwiQXBwIGZvciBpbnRlbnQgbm90IHNlbGVjdGVkL2xhdW5jaGVkIGJ5IHVzZXJcIiwgbGF1bmNoT3B0aW9ucy5pbnRlbnQpO1xuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSk7XG5cdFx0XHR9XG5cdFx0XHR0aGlzLl9sb2dnZXIuZXJyb3IoXCJVbmV4cGVjdGVkIGVycm9yIGZyb20gaW50ZW50IHBpY2tlci9yZXNvbHZlciBmb3IgaW50ZW50XCIsIGxhdW5jaE9wdGlvbnMuaW50ZW50KTtcblx0XHRcdHRocm93IG5ldyBFcnJvcihSZXNvbHZlRXJyb3IuUmVzb2x2ZXJVbmF2YWlsYWJsZSk7XG5cdFx0fVxuXHR9XG59XG4iLCJpbXBvcnQge1xuXHRPcGVuRXJyb3IsXG5cdFJlc29sdmVFcnJvcixcblx0dHlwZSBBcHBJZGVudGlmaWVyLFxuXHR0eXBlIEFwcE1ldGFkYXRhLFxuXHR0eXBlIEltcGxlbWVudGF0aW9uTWV0YWRhdGEsXG5cdHR5cGUgSW50ZW50UmVzb2x1dGlvbixcblx0dHlwZSBDb250ZXh0TWV0YWRhdGFcbn0gZnJvbSBcIkBmaW5vcy9mZGMzXCI7XG5pbXBvcnQgdHlwZSBPcGVuRmluIGZyb20gXCJAb3BlbmZpbi9jb3JlXCI7XG5pbXBvcnQgeyBtYXBUb0FwcE1ldGFEYXRhIGFzIG1hcFRvMTJBcHBNZXRhRGF0YSB9IGZyb20gXCJ3b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci9mZGMzLzEuMi9tYXBwZXJcIjtcbmltcG9ydCB7IG1hcFRvQXBwTWV0YURhdGEgYXMgbWFwVG8yMEFwcE1ldGFEYXRhIH0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL2ZkYzMvMi4wL21hcHBlclwiO1xuaW1wb3J0IHsgTUFOSUZFU1RfVFlQRVMgfSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvbWFuaWZlc3QtdHlwZXNcIjtcbmltcG9ydCB0eXBlIHsgRW5kcG9pbnRDbGllbnQgfSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvc2hhcGVzXCI7XG5pbXBvcnQgdHlwZSB7XG5cdEFwcHNGb3JJbnRlbnQsXG5cdExhdW5jaFByZWZlcmVuY2UsXG5cdFBsYXRmb3JtQXBwLFxuXHRQbGF0Zm9ybUFwcElkZW50aWZpZXJcbn0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3NoYXBlcy9hcHAtc2hhcGVzXCI7XG5pbXBvcnQgdHlwZSB7IEFwcE1ldGFkYXRhIGFzIEFwcE1ldGFkYXRhVjFQb2ludDIgfSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvc2hhcGVzL2ZkYzMtMS0yLXNoYXBlc1wiO1xuaW1wb3J0IHR5cGUge1xuXHRBcGlNZXRhZGF0YSxcblx0Q2FwdHVyZUFwaVBheWxvYWQsXG5cdENvbnRleHRUb1Byb2Nlc3MsXG5cdE9wZW5PcHRpb25zLFxuXHRJbnRlbnRSZXNvbHZlclJlc3BvbnNlLFxuXHRJbnRlbnRSZWdpc3RyYXRpb25QYXlsb2FkLFxuXHRJbnRlbnRUYXJnZXRNZXRhRGF0YSxcblx0UHJvY2Vzc2VkQ29udGV4dCxcblx0UGxhdGZvcm1JbnRlcm9wT3ZlcnJpZGVPcHRpb25zXG59IGZyb20gXCJ3b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci9zaGFwZXMvaW50ZXJvcGJyb2tlci1zaGFwZXNcIjtcbmltcG9ydCB0eXBlIHsgTG9nZ2VyIH0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3NoYXBlcy9sb2dnZXItc2hhcGVzXCI7XG5pbXBvcnQgdHlwZSB7IE1vZHVsZUhlbHBlcnMgfSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvc2hhcGVzL21vZHVsZS1zaGFwZXNcIjtcbmltcG9ydCB7XG5cdGZvcm1hdEVycm9yLFxuXHRpc0VtcHR5LFxuXHRpc1N0cmluZyxcblx0aXNTdHJpbmdWYWx1ZSxcblx0cmFuZG9tVVVJRCxcblx0c2FuaXRpemVTdHJpbmdcbn0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3V0aWxzXCI7XG5pbXBvcnQgeyBnZXRXaW5kb3dQb3NpdGlvblVzaW5nU3RyYXRlZ3kgfSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvdXRpbHMtcG9zaXRpb25cIjtcbmltcG9ydCB7IEFwcEludGVudEhlbHBlciB9IGZyb20gXCIuL2FwcC1pbnRlbnQtaGVscGVyXCI7XG5pbXBvcnQgeyBDbGllbnRSZWdpc3RyYXRpb25IZWxwZXIgfSBmcm9tIFwiLi9jbGllbnQtcmVnaXN0cmF0aW9uLWhlbHBlclwiO1xuaW1wb3J0IHsgSW50ZW50UmVzb2x2ZXJIZWxwZXIgfSBmcm9tIFwiLi9pbnRlbnQtcmVzb2x2ZXItaGVscGVyXCI7XG5cbi8qKlxuICogR2V0IHRoZSBvdmVycmlkZSBjb25zdHJ1Y3RvciBmb3IgdGhlIGludGVyb3AgYnJva2VyICh1c2VmdWwgaWYgeW91IHdpc2ggdGhpcyBpbXBsZW1lbnRhdGlvbiB0byBiZSBsYXllcmVkIHdpdGggb3RoZXIgaW1wbGVtZW50YXRpb25zIGFuZCBwYXNzZWQgdG8gdGhlIHBsYXRmb3JtJ3MgaW5pdGlhbGl6YXRpb24gb2JqZWN0IGFzIHBhcnQgb2YgYW4gYXJyYXkpLlxuICogQHBhcmFtIG9wdGlvbnMgVGhlIG9wdGlvbnMgZm9yIHRoZSBpbnRlcm9wIGJyb2tlciBkZWZpbmVkIGFzIHBhcnQgb2YgdGhlIHBsYXRmb3JtLlxuICogQHBhcmFtIGxvZ2dlciBUaGUgbG9nZ2VyIHRvIHVzZS5cbiAqIEBwYXJhbSBoZWxwZXJzIEEgY29sbGVjdGlvbiBvZiBoZWxwZXIgbWV0aG9kcy5cbiAqIEByZXR1cm5zIFRoZSBvdmVycmlkZSBjb25zdHJ1Y3RvciB0byBiZSB1c2VkIGluIGFuIGFycmF5LlxuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0Q29uc3RydWN0b3JPdmVycmlkZShcblx0b3B0aW9uczogUGxhdGZvcm1JbnRlcm9wT3ZlcnJpZGVPcHRpb25zLFxuXHRsb2dnZXI6IExvZ2dlcixcblx0aGVscGVyczogTW9kdWxlSGVscGVyc1xuKTogUHJvbWlzZTxPcGVuRmluLkNvbnN0cnVjdG9yT3ZlcnJpZGU8T3BlbkZpbi5JbnRlcm9wQnJva2VyPj4ge1xuXHRpZiAoIWhlbHBlcnM/LmdldEFwcCB8fCAhaGVscGVycz8uZ2V0QXBwcyB8fCAhaGVscGVycy5sYXVuY2hBcHApIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoXG5cdFx0XHRcIkludGVyb3AgQnJva2VyIENvbnN0cnVjdG9yIGlzIG1pc3NpbmcgcmVxdWlyZWQgaGVscGVycy4gVGhlIGJyb2tlciB3aWxsIG5vdCBmdW5jdGlvbiBjb3JyZWN0bHkgc28gdGhpcyBlcnJvciBpcyB0byBmbGFnIHRoZSBpc3N1ZS5cIlxuXHRcdCk7XG5cdH1cblx0Y29uc3QgZ2V0QXBwID0gaGVscGVycy5nZXRBcHA7XG5cdGNvbnN0IGdldEFwcHMgPSBoZWxwZXJzLmdldEFwcHM7XG5cdGxldCBlbmRwb2ludENsaWVudDogRW5kcG9pbnRDbGllbnQgfCB1bmRlZmluZWQ7XG5cdGlmIChoZWxwZXJzPy5nZXRFbmRwb2ludENsaWVudCkge1xuXHRcdGVuZHBvaW50Q2xpZW50ID0gYXdhaXQgaGVscGVycz8uZ2V0RW5kcG9pbnRDbGllbnQoKTtcblx0fVxuXG5cdGNvbnN0IGxhdW5jaCA9IGhlbHBlcnMubGF1bmNoQXBwO1xuXHRyZXR1cm4gKEJhc2U6IE9wZW5GaW4uQ29uc3RydWN0b3I8T3BlbkZpbi5JbnRlcm9wQnJva2VyPikgPT5cblx0XHQvKipcblx0XHQgKiBFeHRlbmQgdGhlIEludGVyb3BCcm9rZXIgdG8gaGFuZGxlIGludGVudHMuXG5cdFx0ICovXG5cdFx0Y2xhc3MgSW50ZXJvcE92ZXJyaWRlIGV4dGVuZHMgQmFzZSB7XG5cdFx0XHRwcml2YXRlIHJlYWRvbmx5IF9vcGVuT3B0aW9ucz86IE9wZW5PcHRpb25zO1xuXG5cdFx0XHRwcml2YXRlIHJlYWRvbmx5IF91bnJlZ2lzdGVyZWRBcHA6IFBsYXRmb3JtQXBwIHwgdW5kZWZpbmVkO1xuXG5cdFx0XHRwcml2YXRlIHJlYWRvbmx5IF9hcHBJbnRlbnRIZWxwZXI6IEFwcEludGVudEhlbHBlcjtcblxuXHRcdFx0cHJpdmF0ZSByZWFkb25seSBfY2xpZW50UmVnaXN0cmF0aW9uSGVscGVyOiBDbGllbnRSZWdpc3RyYXRpb25IZWxwZXI7XG5cblx0XHRcdHByaXZhdGUgcmVhZG9ubHkgX2ludGVudFJlc29sdmVySGVscGVyPzogSW50ZW50UmVzb2x2ZXJIZWxwZXI7XG5cblx0XHRcdHByaXZhdGUgcmVhZG9ubHkgX21ldGFkYXRhS2V5OiBSZWFkb25seTxzdHJpbmc+O1xuXG5cdFx0XHQvKipcblx0XHRcdCAqIENyZWF0ZSBhIG5ldyBpbnN0YW5jZSBvZiBJbnRlcm9wQnJva2VyLlxuXHRcdFx0ICovXG5cdFx0XHRjb25zdHJ1Y3RvcigpIHtcblx0XHRcdFx0c3VwZXIoKTtcblx0XHRcdFx0bG9nZ2VyLmluZm8oXCJJbnRlcm9wIEJyb2tlciBDb25zdHJ1Y3RvciBhcHBseWluZyBzZXR0aW5ncy5cIik7XG5cdFx0XHRcdHRoaXMuX2FwcEludGVudEhlbHBlciA9IG5ldyBBcHBJbnRlbnRIZWxwZXIoZ2V0QXBwcywgbG9nZ2VyKTtcblx0XHRcdFx0dGhpcy5fY2xpZW50UmVnaXN0cmF0aW9uSGVscGVyID0gbmV3IENsaWVudFJlZ2lzdHJhdGlvbkhlbHBlcihcblx0XHRcdFx0XHRhc3luYyAoY2xpZW50SWRlbnRpdHk6IE9wZW5GaW4uQ2xpZW50SWRlbnRpdHkpID0+IHRoaXMubG9va3VwQXBwSWQoY2xpZW50SWRlbnRpdHkpLFxuXHRcdFx0XHRcdGxvZ2dlclxuXHRcdFx0XHQpO1xuXHRcdFx0XHR0aGlzLl9tZXRhZGF0YUtleSA9IGBfbWV0YWRhdGFfJHtyYW5kb21VVUlEKCl9YDtcblx0XHRcdFx0aWYgKG9wdGlvbnMuaW50ZW50UmVzb2x2ZXIpIHtcblx0XHRcdFx0XHR0aGlzLl9pbnRlbnRSZXNvbHZlckhlbHBlciA9IG5ldyBJbnRlbnRSZXNvbHZlckhlbHBlcihcblx0XHRcdFx0XHRcdG9wdGlvbnMuaW50ZW50UmVzb2x2ZXIsXG5cdFx0XHRcdFx0XHRsb2dnZXIsXG5cdFx0XHRcdFx0XHRvcHRpb25zPy51bnJlZ2lzdGVyZWRBcHA/LmFwcElkXG5cdFx0XHRcdFx0KTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHRoaXMuX29wZW5PcHRpb25zID0gb3B0aW9ucz8ub3Blbk9wdGlvbnM7XG5cdFx0XHRcdHRoaXMuX3VucmVnaXN0ZXJlZEFwcCA9IG9wdGlvbnM/LnVucmVnaXN0ZXJlZEFwcDtcblx0XHRcdFx0aWYgKCFpc0VtcHR5KHRoaXMuX3VucmVnaXN0ZXJlZEFwcCkpIHtcblx0XHRcdFx0XHR0aGlzLl91bnJlZ2lzdGVyZWRBcHAubWFuaWZlc3RUeXBlID0gTUFOSUZFU1RfVFlQRVMuVW5yZWdpc3RlcmVkQXBwLmlkO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8qKlxuXHRcdFx0ICogSXMgdGhlIGNvbm5lY3Rpb24gYXV0aG9yaXplZC5cblx0XHRcdCAqIEBwYXJhbSBpZCBUaGUgaWQgb2YgdGhlIGNsaWVudCBpZGVudGl0eSB0byBjaGVjay5cblx0XHRcdCAqIEBwYXJhbSBwYXlsb2FkIFRoZSBwYXlsb2FkIHRvIHNlbmQgd2l0aCB0aGUgYXV0aG9yaXphdGlvbiBjaGVjay5cblx0XHRcdCAqIEByZXR1cm5zIFRydWUgaWYgdGhlIGNvbm5lY3Rpb24gaXMgYXV0aG9yaXplZC5cblx0XHRcdCAqL1xuXHRcdFx0cHVibGljIGFzeW5jIGlzQ29ubmVjdGlvbkF1dGhvcml6ZWQoaWQ6IE9wZW5GaW4uQ2xpZW50SWRlbnRpdHksIHBheWxvYWQ/OiB1bmtub3duKTogUHJvbWlzZTxib29sZWFuPiB7XG5cdFx0XHRcdGxvZ2dlci5pbmZvKFxuXHRcdFx0XHRcdFwiSW50ZXJvcCBjb25uZWN0aW9uIGJlaW5nIG1hZGUgYnkgdGhlIGZvbGxvd2luZyBpZGVudGl0eS4gQWJvdXQgdG8gdmVyaWZ5IGNvbm5lY3Rpb25cIixcblx0XHRcdFx0XHRpZFxuXHRcdFx0XHQpO1xuXHRcdFx0XHRjb25zdCBhcGlQYXlsb2FkOiBDYXB0dXJlQXBpUGF5bG9hZCA9IHBheWxvYWQgYXMgQ2FwdHVyZUFwaVBheWxvYWQ7XG5cdFx0XHRcdGlmICghaXNFbXB0eShoZWxwZXJzLmlzQ29ubmVjdGlvblZhbGlkKSkge1xuXHRcdFx0XHRcdGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgaGVscGVycy5pc0Nvbm5lY3Rpb25WYWxpZChpZCwgcGF5bG9hZCwgeyB0eXBlOiBcImJyb2tlclwiIH0pO1xuXHRcdFx0XHRcdGlmIChyZXNwb25zZS5pc1ZhbGlkKSB7XG5cdFx0XHRcdFx0XHRsb2dnZXIuaW5mbyhcIkNvbm5lY3Rpb24gdmFsaWRhdGlvbiByZXF1ZXN0IHdhcyB2YWxpZGF0ZWQgYW5kIGlzIHZhbGlkLlwiKTtcblx0XHRcdFx0XHRcdGF3YWl0IHRoaXMuX2NsaWVudFJlZ2lzdHJhdGlvbkhlbHBlci5jbGllbnRDb25uZWN0aW9uUmVnaXN0ZXJlZChpZCwgYXBpUGF5bG9hZCk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdGxvZ2dlci53YXJuKGBDb25uZWN0aW9uIHJlcXVlc3QgZnJvbSAke0pTT04uc3RyaW5naWZ5KGlkKX0gd2FzIHZhbGlkYXRlZCBhbmQgcmVqZWN0ZWQuYCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHJldHVybiByZXNwb25zZS5pc1ZhbGlkO1xuXHRcdFx0XHR9XG5cdFx0XHRcdC8vIHdlIGhhdmUgbm90IGJlZW4gcHJvdmlkZWQgd2l0aCBhIG1lYW5zIHRvIHZhbGlkYXRlIHRoZSBjb25uZWN0aW9uIHNvIGZhbGxiYWNrIHRvIGRlZmF1bHQgYmVoYXZpb3IgYW5kIHJlZ2lzdGVyIHRoZSBjb25uZWN0aW9uXG5cdFx0XHRcdGNvbnN0IGlzVmFsaWQgPSBhd2FpdCBzdXBlci5pc0Nvbm5lY3Rpb25BdXRob3JpemVkKGlkLCBwYXlsb2FkKTtcblx0XHRcdFx0aWYgKGlzVmFsaWQpIHtcblx0XHRcdFx0XHRhd2FpdCB0aGlzLl9jbGllbnRSZWdpc3RyYXRpb25IZWxwZXIuY2xpZW50Q29ubmVjdGlvblJlZ2lzdGVyZWQoaWQsIGFwaVBheWxvYWQpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiBpc1ZhbGlkO1xuXHRcdFx0fVxuXG5cdFx0XHQvKipcblx0XHRcdCAqIFNldHMgYSBjb250ZXh0IGZvciB0aGUgY29udGV4dCBncm91cCBvZiB0aGUgaW5jb21pbmcgY3VycmVudCBlbnRpdHkuXG5cdFx0XHQgKiBAcGFyYW0gc2VudENvbnRleHQgTmV3IGNvbnRleHQgdG8gc2V0LlxuXHRcdFx0ICogQHBhcmFtIHNlbnRDb250ZXh0LmNvbnRleHQgVGhlIGNvbnRleHQgdG8gc2VuZC5cblx0XHRcdCAqIEBwYXJhbSBjbGllbnRJZGVudGl0eSBJZGVudGl0eSBvZiB0aGUgY2xpZW50IHNlbmRlci5cblx0XHRcdCAqL1xuXHRcdFx0cHVibGljIGFzeW5jIHNldENvbnRleHQoXG5cdFx0XHRcdHNlbnRDb250ZXh0OiB7IGNvbnRleHQ6IE9wZW5GaW4uQ29udGV4dCB9LFxuXHRcdFx0XHRjbGllbnRJZGVudGl0eTogT3BlbkZpbi5DbGllbnRJZGVudGl0eVxuXHRcdFx0KTogUHJvbWlzZTx2b2lkPiB7XG5cdFx0XHRcdHNlbnRDb250ZXh0LmNvbnRleHQgPSBhd2FpdCB0aGlzLnByb2Nlc3NDb250ZXh0KHNlbnRDb250ZXh0LmNvbnRleHQpO1xuXHRcdFx0XHRjb25zdCBjb250ZXh0TWV0YWRhdGEgPSBhd2FpdCB0aGlzLmdldENvbnRleHRNZXRhZGF0YShjbGllbnRJZGVudGl0eSk7XG5cblx0XHRcdFx0c2VudENvbnRleHQuY29udGV4dCA9IHtcblx0XHRcdFx0XHQuLi5zZW50Q29udGV4dC5jb250ZXh0LFxuXHRcdFx0XHRcdFt0aGlzLl9tZXRhZGF0YUtleV06IGNvbnRleHRNZXRhZGF0YVxuXHRcdFx0XHR9IGFzIHVua25vd24gYXMgT3BlbkZpbi5Db250ZXh0O1xuXHRcdFx0XHRzdXBlci5zZXRDb250ZXh0KHNlbnRDb250ZXh0LCBjbGllbnRJZGVudGl0eSk7XG5cdFx0XHR9XG5cblx0XHRcdC8qKlxuXHRcdFx0ICogSW52b2tlcyB0aGUgY29udGV4dCBoYW5kbGVyLlxuXHRcdFx0ICogQHBhcmFtIGNsaWVudElkZW50aXR5IFRoZSBjbGllbnQgaWRlbnRpdHkuXG5cdFx0XHQgKiBAcGFyYW0gaGFuZGxlcklkIFRoZSBoYW5kbGVyIElELlxuXHRcdFx0ICogQHBhcmFtIGNvbnRleHQgVGhlIGNvbnRleHQgdG8gaW52b2tlLlxuXHRcdFx0ICogQHJldHVybnMgQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2hlbiB0aGUgY29udGV4dCBoYW5kbGVyIGlzIGludm9rZWQuXG5cdFx0XHQgKi9cblx0XHRcdHB1YmxpYyBhc3luYyBpbnZva2VDb250ZXh0SGFuZGxlcihcblx0XHRcdFx0Y2xpZW50SWRlbnRpdHk6IE9wZW5GaW4uQ2xpZW50SWRlbnRpdHksXG5cdFx0XHRcdGhhbmRsZXJJZDogc3RyaW5nLFxuXHRcdFx0XHRjb250ZXh0OiBPcGVuRmluLkNvbnRleHRcblx0XHRcdCk6IFByb21pc2U8dm9pZD4ge1xuXHRcdFx0XHRjb25zdCBwYXNzZWRDb250ZXh0OiB7IFtrZXk6IHN0cmluZ106IHVua25vd24gfSA9IHsgLi4uY29udGV4dCB9O1xuXHRcdFx0XHRjb25zdCBjb250ZXh0TWV0YWRhdGEgPSBwYXNzZWRDb250ZXh0W3RoaXMuX21ldGFkYXRhS2V5XTtcblx0XHRcdFx0aWYgKCFpc0VtcHR5KGNvbnRleHRNZXRhZGF0YSkpIHtcblx0XHRcdFx0XHRkZWxldGUgcGFzc2VkQ29udGV4dFt0aGlzLl9tZXRhZGF0YUtleV07XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIHN1cGVyLmludm9rZUNvbnRleHRIYW5kbGVyKGNsaWVudElkZW50aXR5LCBoYW5kbGVySWQsIHtcblx0XHRcdFx0XHQuLi5wYXNzZWRDb250ZXh0LFxuXHRcdFx0XHRcdGNvbnRleHRNZXRhZGF0YVxuXHRcdFx0XHR9IGFzIHVua25vd24gYXMgT3BlbkZpbi5Db250ZXh0KTtcblx0XHRcdH1cblxuXHRcdFx0LyoqXG5cdFx0XHQgKiBIYW5kbGUgdGhlIGluZm9ybWF0aW9uIGZvciBpbnRlbnRzIGJ5IGNvbnRleHQuXG5cdFx0XHQgKiBAcGFyYW0gY29udGV4dE9wdGlvbnMgVGhlIGNvbnRleHQgb3B0aW9ucy5cblx0XHRcdCAqIEBwYXJhbSBjbGllbnRJZGVudGl0eSBUaGUgY2xpZW50LlxuXHRcdFx0ICogQHJldHVybnMgVGhlIGludGVudHMgbWFwcGVkIHRvIGFwcCBtZXRhZGF0YS5cblx0XHRcdCAqL1xuXHRcdFx0cHVibGljIGFzeW5jIGhhbmRsZUluZm9Gb3JJbnRlbnRzQnlDb250ZXh0KFxuXHRcdFx0XHRjb250ZXh0T3B0aW9uczogT3BlbkZpbi5Db250ZXh0IHwgT3BlbkZpbi5GaW5kSW50ZW50c0J5Q29udGV4dE9wdGlvbnMsXG5cdFx0XHRcdGNsaWVudElkZW50aXR5OiBPcGVuRmluLkNsaWVudElkZW50aXR5XG5cdFx0XHQpOiBQcm9taXNlPFxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0aW50ZW50OiB7IG5hbWU6IHN0cmluZzsgZGlzcGxheU5hbWU/OiBzdHJpbmcgfTtcblx0XHRcdFx0XHRhcHBzOiAoQXBwTWV0YWRhdGFWMVBvaW50MiB8IEFwcE1ldGFkYXRhKVtdO1xuXHRcdFx0XHR9W11cblx0XHRcdD4ge1xuXHRcdFx0XHRsZXQgcmVxdWVzdGVkQ29udGV4dFR5cGU6IHN0cmluZztcblx0XHRcdFx0bGV0IHJlcXVlc3RlZFJlc3VsdFR5cGU6IHN0cmluZyB8IHVuZGVmaW5lZDtcblx0XHRcdFx0bGV0IHJlcXVlc3Q6IHsgY29udGV4dDogeyB0eXBlOiBzdHJpbmcgfTsgbWV0YWRhdGE6IHsgcmVzdWx0VHlwZTogc3RyaW5nIH0gfTtcblx0XHRcdFx0Y29uc3QgYXBpVmVyc2lvbjogQXBpTWV0YWRhdGEgfCB1bmRlZmluZWQgPVxuXHRcdFx0XHRcdHRoaXMuX2NsaWVudFJlZ2lzdHJhdGlvbkhlbHBlci5nZXRBcGlWZXJzaW9uKGNsaWVudElkZW50aXR5KTtcblxuXHRcdFx0XHRpZiAoXCJ0eXBlXCIgaW4gY29udGV4dE9wdGlvbnMpIHtcblx0XHRcdFx0XHRyZXF1ZXN0ZWRDb250ZXh0VHlwZSA9IGNvbnRleHRPcHRpb25zLnR5cGU7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0cmVxdWVzdCA9IGNvbnRleHRPcHRpb25zIGFzIHsgY29udGV4dDogeyB0eXBlOiBzdHJpbmcgfTsgbWV0YWRhdGE6IHsgcmVzdWx0VHlwZTogc3RyaW5nIH0gfTtcblx0XHRcdFx0XHRyZXF1ZXN0ZWRDb250ZXh0VHlwZSA9IHJlcXVlc3QuY29udGV4dC50eXBlO1xuXHRcdFx0XHRcdHJlcXVlc3RlZFJlc3VsdFR5cGUgPSByZXF1ZXN0Lm1ldGFkYXRhLnJlc3VsdFR5cGU7XG5cdFx0XHRcdH1cblx0XHRcdFx0Y29uc3QgaW50ZW50cyA9IGF3YWl0IHRoaXMuX2FwcEludGVudEhlbHBlci5nZXRJbnRlbnRzQnlDb250ZXh0KFxuXHRcdFx0XHRcdHJlcXVlc3RlZENvbnRleHRUeXBlLFxuXHRcdFx0XHRcdHJlcXVlc3RlZFJlc3VsdFR5cGVcblx0XHRcdFx0KTtcblxuXHRcdFx0XHRpZiAoaW50ZW50cy5sZW5ndGggPT09IDApIHtcblx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoUmVzb2x2ZUVycm9yLk5vQXBwc0ZvdW5kKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGNvbnN0IGlzRkRDMzIgPSBhcGlWZXJzaW9uPy50eXBlID09PSBcImZkYzNcIiAmJiBhcGlWZXJzaW9uLnZlcnNpb24gPT09IFwiMi4wXCI7XG5cdFx0XHRcdGNvbnN0IG1hcHBlZEludGVudHMgPSBpbnRlbnRzLm1hcCgoZW50cnkpID0+ICh7XG5cdFx0XHRcdFx0aW50ZW50OiBlbnRyeS5pbnRlbnQsXG5cdFx0XHRcdFx0YXBwczogZW50cnkuYXBwcy5tYXAoKGFwcDogUGxhdGZvcm1BcHApID0+IHtcblx0XHRcdFx0XHRcdGxldCByZXN1bHRUeXBlOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG5cdFx0XHRcdFx0XHRjb25zdCBsaXN0ZW5zRm9yID0gYXBwPy5pbnRlcm9wPy5pbnRlbnRzPy5saXN0ZW5zRm9yO1xuXHRcdFx0XHRcdFx0aWYgKCFpc0VtcHR5KGxpc3RlbnNGb3IpICYmICFpc0VtcHR5KGxpc3RlbnNGb3JbZW50cnkuaW50ZW50Lm5hbWVdKSkge1xuXHRcdFx0XHRcdFx0XHRyZXN1bHRUeXBlID0gbGlzdGVuc0ZvcltlbnRyeS5pbnRlbnQubmFtZV0ucmVzdWx0VHlwZTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGNvbnN0IGFwcEVudHJ5ID0gaXNGREMzMiA/IG1hcFRvMjBBcHBNZXRhRGF0YShhcHAsIHJlc3VsdFR5cGUpIDogbWFwVG8xMkFwcE1ldGFEYXRhKGFwcCk7XG5cblx0XHRcdFx0XHRcdHJldHVybiBhcHBFbnRyeTtcblx0XHRcdFx0XHR9KVxuXHRcdFx0XHR9KSk7XG5cblx0XHRcdFx0cmV0dXJuIG1hcHBlZEludGVudHM7XG5cdFx0XHR9XG5cblx0XHRcdC8qKlxuXHRcdFx0ICogSGFuZGxlIHRoZSBpbmZvcm1hdGlvbiBmb3IgYW5kIGludGVudC5cblx0XHRcdCAqIEBwYXJhbSBpbnRlbnRPcHRpb25zIFRoZSBpbnRlbnQgb3B0aW9ucy5cblx0XHRcdCAqIEBwYXJhbSBjbGllbnRJZGVudGl0eSBUaGUgY2xpZW50LlxuXHRcdFx0ICogQHJldHVybnMgVGhlIGludGVudHMgbWFwcGVkIHRvIGFwcCBtZXRhZGF0YS5cblx0XHRcdCAqL1xuXHRcdFx0cHVibGljIGFzeW5jIGhhbmRsZUluZm9Gb3JJbnRlbnQoXG5cdFx0XHRcdGludGVudE9wdGlvbnM6IE9wZW5GaW4uSW5mb0ZvckludGVudE9wdGlvbnMsXG5cdFx0XHRcdGNsaWVudElkZW50aXR5OiBPcGVuRmluLkNsaWVudElkZW50aXR5XG5cdFx0XHQpOiBQcm9taXNlPHtcblx0XHRcdFx0aW50ZW50OiB7IG5hbWU6IHN0cmluZzsgZGlzcGxheU5hbWU/OiBzdHJpbmcgfTtcblx0XHRcdFx0YXBwczogKEFwcE1ldGFkYXRhVjFQb2ludDIgfCBBcHBNZXRhZGF0YSlbXTtcblx0XHRcdH0+IHtcblx0XHRcdFx0Y29uc3QgYXBpVmVyc2lvbjogQXBpTWV0YWRhdGEgfCB1bmRlZmluZWQgPVxuXHRcdFx0XHRcdHRoaXMuX2NsaWVudFJlZ2lzdHJhdGlvbkhlbHBlci5nZXRBcGlWZXJzaW9uKGNsaWVudElkZW50aXR5KTtcblx0XHRcdFx0bGV0IGNvbnRleHRUeXBlOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG5cblx0XHRcdFx0Y29uc3Qgb3B0Q29udGV4dFR5cGUgPSBpbnRlbnRPcHRpb25zPy5jb250ZXh0Py50eXBlO1xuXHRcdFx0XHRpZiAoIWlzRW1wdHkob3B0Q29udGV4dFR5cGUpICYmIG9wdENvbnRleHRUeXBlICE9PSBcImZkYzMubm90aGluZ1wiKSB7XG5cdFx0XHRcdFx0Y29udGV4dFR5cGUgPSBvcHRDb250ZXh0VHlwZTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGNvbnN0IHJlc3VsdCA9IGF3YWl0IHRoaXMuX2FwcEludGVudEhlbHBlci5nZXRJbnRlbnQoXG5cdFx0XHRcdFx0aW50ZW50T3B0aW9ucy5uYW1lLFxuXHRcdFx0XHRcdGNvbnRleHRUeXBlLFxuXHRcdFx0XHRcdGludGVudE9wdGlvbnM/Lm1ldGFkYXRhPy5yZXN1bHRUeXBlXG5cdFx0XHRcdCk7XG5cdFx0XHRcdGlmIChpc0VtcHR5KHJlc3VsdCkpIHtcblx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoUmVzb2x2ZUVycm9yLk5vQXBwc0ZvdW5kKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGNvbnN0IGlzRkRDMzIgPSBhcGlWZXJzaW9uPy50eXBlID09PSBcImZkYzNcIiAmJiBhcGlWZXJzaW9uLnZlcnNpb24gPT09IFwiMi4wXCI7XG5cdFx0XHRcdGNvbnN0IHJlc3BvbnNlID0ge1xuXHRcdFx0XHRcdGludGVudDogcmVzdWx0LmludGVudCxcblx0XHRcdFx0XHRhcHBzOiByZXN1bHQuYXBwcy5tYXAoKGFwcDogUGxhdGZvcm1BcHApID0+IHtcblx0XHRcdFx0XHRcdGxldCByZXN1bHRUeXBlOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG5cdFx0XHRcdFx0XHRjb25zdCBsaXN0ZW5zRm9yID0gYXBwPy5pbnRlcm9wPy5pbnRlbnRzPy5saXN0ZW5zRm9yO1xuXHRcdFx0XHRcdFx0aWYgKCFpc0VtcHR5KGxpc3RlbnNGb3IpICYmICFpc0VtcHR5KGxpc3RlbnNGb3JbcmVzdWx0LmludGVudC5uYW1lXSkpIHtcblx0XHRcdFx0XHRcdFx0cmVzdWx0VHlwZSA9IGxpc3RlbnNGb3JbcmVzdWx0LmludGVudC5uYW1lXS5yZXN1bHRUeXBlO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0Y29uc3QgYXBwRW50cnkgPSBpc0ZEQzMyID8gbWFwVG8yMEFwcE1ldGFEYXRhKGFwcCwgcmVzdWx0VHlwZSkgOiBtYXBUbzEyQXBwTWV0YURhdGEoYXBwKTtcblxuXHRcdFx0XHRcdFx0cmV0dXJuIGFwcEVudHJ5O1xuXHRcdFx0XHRcdH0pXG5cdFx0XHRcdH07XG5cblx0XHRcdFx0cmV0dXJuIHJlc3BvbnNlO1xuXHRcdFx0fVxuXG5cdFx0XHQvKipcblx0XHRcdCAqIEhhbmRsZSB0aGUgZmlyZWQgaW50ZW50IGZvciBjb250ZXh0LlxuXHRcdFx0ICogQHBhcmFtIGNvbnRleHRGb3JJbnRlbnQgVGhlIGNvbnRleHQgZm9yIHRoZSBpbnRlbnQuXG5cdFx0XHQgKiBAcGFyYW0gY29udGV4dEZvckludGVudC50eXBlIFRoZSB0eXBlIG9mIHRoZSBpbnRlbnQuXG5cdFx0XHQgKiBAcGFyYW0gY29udGV4dEZvckludGVudC5tZXRhZGF0YSBUaGUgbWV0YWRhdGEgZm9yIHRoZSBpbnRlbnQuXG5cdFx0XHQgKiBAcGFyYW0gY2xpZW50SWRlbnRpdHkgVGhlIGNsaWVudCBpZGVudGl0eS5cblx0XHRcdCAqIEByZXR1cm5zIFRoZSBpbnRlbnQgcmVzb2x1dGlvbi5cblx0XHRcdCAqL1xuXHRcdFx0cHVibGljIGFzeW5jIGhhbmRsZUZpcmVkSW50ZW50Rm9yQ29udGV4dChcblx0XHRcdFx0Y29udGV4dEZvckludGVudDogeyB0eXBlOiBzdHJpbmc7IG1ldGFkYXRhPzogT3BlbkZpbi5JbnRlbnRNZXRhZGF0YTxJbnRlbnRUYXJnZXRNZXRhRGF0YT4gfSxcblx0XHRcdFx0Y2xpZW50SWRlbnRpdHk6IE9wZW5GaW4uQ2xpZW50SWRlbnRpdHlcblx0XHRcdCk6IFByb21pc2U8T21pdDxJbnRlbnRSZXNvbHV0aW9uLCBcImdldFJlc3VsdFwiPiB8IHsgc291cmNlOiBzdHJpbmc7IHZlcnNpb24/OiBzdHJpbmcgfT4ge1xuXHRcdFx0XHRjb25zdCB0YXJnZXRBcHBJZGVudGlmaWVyID0gdGhpcy5nZXRBcHBsaWNhdGlvbklkZW50aXR5KGNvbnRleHRGb3JJbnRlbnQubWV0YWRhdGEpO1xuXHRcdFx0XHRjb25zdCB1c2VzQXBwSWRlbnRpdHkgPSB0aGlzLnVzZXNBcHBsaWNhdGlvbklkZW50aXR5KGNsaWVudElkZW50aXR5KTtcblx0XHRcdFx0Y29uc3QgaW50ZW50OiBQYXJ0aWFsPE9wZW5GaW4uSW50ZW50ICYgeyBkaXNwbGF5TmFtZT86IHN0cmluZyB9PiA9IHtcblx0XHRcdFx0XHRjb250ZXh0OiBjb250ZXh0Rm9ySW50ZW50XG5cdFx0XHRcdH07XG5cblx0XHRcdFx0Y29uc3QgaW50ZW50c0ZvclNlbGVjdGlvbjogQXBwc0ZvckludGVudFtdID0gYXdhaXQgdGhpcy5fYXBwSW50ZW50SGVscGVyLmdldEludGVudHNCeUNvbnRleHQoXG5cdFx0XHRcdFx0Y29udGV4dEZvckludGVudC50eXBlXG5cdFx0XHRcdCk7XG5cblx0XHRcdFx0Ly8gYXBwIHNwZWNpZmllZCBmbG93XG5cdFx0XHRcdGlmICghaXNFbXB0eSh0YXJnZXRBcHBJZGVudGlmaWVyKSkge1xuXHRcdFx0XHRcdGNvbnN0IHRhcmdldEFwcCA9IGF3YWl0IGdldEFwcCh0YXJnZXRBcHBJZGVudGlmaWVyLmFwcElkKTtcblxuXHRcdFx0XHRcdGlmIChpc0VtcHR5KHRhcmdldEFwcCkpIHtcblx0XHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcihSZXNvbHZlRXJyb3IuVGFyZ2V0QXBwVW5hdmFpbGFibGUpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRpZiAoXG5cdFx0XHRcdFx0XHQhdGFyZ2V0QXBwPy5pbnRlcm9wPy5pbnRlbnRzPy5saXN0ZW5zRm9yIHx8XG5cdFx0XHRcdFx0XHQhT2JqZWN0LnZhbHVlcyh0YXJnZXRBcHAuaW50ZXJvcC5pbnRlbnRzLmxpc3RlbnNGb3IpLnNvbWUoKGxpc3RlbmVkRm9ySW50ZW50KSA9PlxuXHRcdFx0XHRcdFx0XHRsaXN0ZW5lZEZvckludGVudC5jb250ZXh0cy5pbmNsdWRlcyhjb250ZXh0Rm9ySW50ZW50LnR5cGUpXG5cdFx0XHRcdFx0XHQpXG5cdFx0XHRcdFx0KSB7XG5cdFx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoUmVzb2x2ZUVycm9yLk5vQXBwc0ZvdW5kKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0Y29uc3QgaW50ZW50UmVzb2x2ZXIgPSBhd2FpdCB0aGlzLmhhbmRsZVRhcmdldGVkSW50ZW50KFxuXHRcdFx0XHRcdFx0dGFyZ2V0QXBwSWRlbnRpZmllcixcblx0XHRcdFx0XHRcdGludGVudCBhcyBPcGVuRmluLkludGVudCxcblx0XHRcdFx0XHRcdHRydWUsXG5cdFx0XHRcdFx0XHRjbGllbnRJZGVudGl0eVxuXHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0cmV0dXJuIHRoaXMuc2hhcGVJbnRlbnRSZXNvbHZlcihpbnRlbnRSZXNvbHZlciwgdXNlc0FwcElkZW50aXR5KTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIGNoZWNrIGZvciB1bnJlZ2lzdGVyZWQgYXBwIGludGVudCBoYW5kbGVycyAoaWYgZW5hYmxlZClcblx0XHRcdFx0Y29uc3QgdW5yZWdpc3RlcmVkQXBwSW50ZW50cyA9IGF3YWl0IHRoaXMuZ2V0VW5yZWdpc3RlcmVkQXBwSW50ZW50QnlDb250ZXh0KFxuXHRcdFx0XHRcdGNvbnRleHRGb3JJbnRlbnQudHlwZSxcblx0XHRcdFx0XHRjbGllbnRJZGVudGl0eVxuXHRcdFx0XHQpO1xuXG5cdFx0XHRcdGlmICh1bnJlZ2lzdGVyZWRBcHBJbnRlbnRzLmxlbmd0aCA+IDAgJiYgIWlzRW1wdHkodGhpcy5fdW5yZWdpc3RlcmVkQXBwKSkge1xuXHRcdFx0XHRcdGNvbnN0IG1hdGNoZWRJbnRlbnRzOiBzdHJpbmdbXSA9IFtdO1xuXHRcdFx0XHRcdGZvciAoY29uc3QgaW50ZW50Rm9yU2VsZWN0aW9uIG9mIGludGVudHNGb3JTZWxlY3Rpb24pIHtcblx0XHRcdFx0XHRcdGlmICh1bnJlZ2lzdGVyZWRBcHBJbnRlbnRzLmluY2x1ZGVzKGludGVudEZvclNlbGVjdGlvbi5pbnRlbnQubmFtZSkpIHtcblx0XHRcdFx0XHRcdFx0aW50ZW50Rm9yU2VsZWN0aW9uLmFwcHMucHVzaCh0aGlzLl91bnJlZ2lzdGVyZWRBcHApO1xuXHRcdFx0XHRcdFx0XHRtYXRjaGVkSW50ZW50cy5wdXNoKGludGVudEZvclNlbGVjdGlvbi5pbnRlbnQubmFtZSk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGNvbnN0IG1pc3NpbmdJbnRlbnRNYXRjaGVzID0gdW5yZWdpc3RlcmVkQXBwSW50ZW50cy5maWx0ZXIoXG5cdFx0XHRcdFx0XHQoaW50ZW50TmFtZSkgPT4gIW1hdGNoZWRJbnRlbnRzLmluY2x1ZGVzKGludGVudE5hbWUpXG5cdFx0XHRcdFx0KTtcblxuXHRcdFx0XHRcdGZvciAoY29uc3QgbWlzc2luZ0ludGVudE1hdGNoIG9mIG1pc3NpbmdJbnRlbnRNYXRjaGVzKSB7XG5cdFx0XHRcdFx0XHRjb25zdCBtaXNzaW5nSW50ZW50ID0gdGhpcy5fdW5yZWdpc3RlcmVkQXBwLmludGVudHM/LmZpbmQoXG5cdFx0XHRcdFx0XHRcdChlbnRyeSkgPT4gZW50cnkubmFtZSA9PT0gbWlzc2luZ0ludGVudE1hdGNoXG5cdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdFx0aWYgKG1pc3NpbmdJbnRlbnQpIHtcblx0XHRcdFx0XHRcdFx0aW50ZW50c0ZvclNlbGVjdGlvbi5wdXNoKHtcblx0XHRcdFx0XHRcdFx0XHRpbnRlbnQ6IHsgbmFtZTogbWlzc2luZ0ludGVudC5uYW1lLCBkaXNwbGF5TmFtZTogbWlzc2luZ0ludGVudC5kaXNwbGF5TmFtZSB9LFxuXHRcdFx0XHRcdFx0XHRcdGFwcHM6IFt0aGlzLl91bnJlZ2lzdGVyZWRBcHBdXG5cdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdGxldCB1c2VyU2VsZWN0aW9uOiBJbnRlbnRSZXNvbHZlclJlc3BvbnNlIHwgdW5kZWZpbmVkO1xuXG5cdFx0XHRcdGlmIChpbnRlbnRzRm9yU2VsZWN0aW9uLmxlbmd0aCA9PT0gMSkge1xuXHRcdFx0XHRcdGNvbnN0IGludGVudEZvclNlbGVjdGlvbiA9IGludGVudHNGb3JTZWxlY3Rpb25bMF07XG5cdFx0XHRcdFx0Ly8gb25seSBvbmUgaW50ZW50IG1hdGNoZXMgdGhlIHBhc3NlZCBjb250ZXh0XG5cdFx0XHRcdFx0aW50ZW50Lm5hbWUgPSBpbnRlbnRGb3JTZWxlY3Rpb24uaW50ZW50Lm5hbWU7XG5cdFx0XHRcdFx0aW50ZW50LmRpc3BsYXlOYW1lID0gaW50ZW50Rm9yU2VsZWN0aW9uLmludGVudC5kaXNwbGF5TmFtZTtcblxuXHRcdFx0XHRcdGlmIChpbnRlbnRGb3JTZWxlY3Rpb24uYXBwcy5sZW5ndGggPT09IDEpIHtcblx0XHRcdFx0XHRcdGNvbnN0IGFwcEluc3RhbmNlcyA9IGF3YWl0IHRoaXMuX2NsaWVudFJlZ2lzdHJhdGlvbkhlbHBlci5maW5kQXBwSW5zdGFuY2VzKFxuXHRcdFx0XHRcdFx0XHRpbnRlbnRGb3JTZWxlY3Rpb24uYXBwc1swXSxcblx0XHRcdFx0XHRcdFx0Y2xpZW50SWRlbnRpdHksXG5cdFx0XHRcdFx0XHRcdFwiaW50ZW50XCJcblx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0XHQvLyBpZiB0aGVyZSBhcmUgbm8gaW5zdGFuY2VzIGxhdW5jaCBhIG5ldyBvbmUgb3RoZXJ3aXNlIHByZXNlbnQgdGhlIGNob2ljZSB0byB0aGUgdXNlclxuXHRcdFx0XHRcdFx0Ly8gYnkgZmFsbGluZyB0aHJvdWdoIHRvIHRoZSBuZXh0IGNvZGUgYmxvY2tcblx0XHRcdFx0XHRcdGlmIChhcHBJbnN0YW5jZXMubGVuZ3RoID09PSAwIHx8IHRoaXMuY3JlYXRlTmV3SW5zdGFuY2UoaW50ZW50Rm9yU2VsZWN0aW9uLmFwcHNbMF0pKSB7XG5cdFx0XHRcdFx0XHRcdGNvbnN0IGludGVudFJlc29sdmVyID0gYXdhaXQgdGhpcy5sYXVuY2hBcHBXaXRoSW50ZW50KFxuXHRcdFx0XHRcdFx0XHRcdGludGVudEZvclNlbGVjdGlvbi5hcHBzWzBdLFxuXHRcdFx0XHRcdFx0XHRcdGludGVudCBhcyBPcGVuRmluLkludGVudCxcblx0XHRcdFx0XHRcdFx0XHR1bmRlZmluZWQsXG5cdFx0XHRcdFx0XHRcdFx0Y2xpZW50SWRlbnRpdHlcblx0XHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRcdFx0aWYgKGlzRW1wdHkoaW50ZW50UmVzb2x2ZXIpKSB7XG5cdFx0XHRcdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKFJlc29sdmVFcnJvci5Ob0FwcHNGb3VuZCk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0cmV0dXJuIHRoaXMuc2hhcGVJbnRlbnRSZXNvbHZlcihpbnRlbnRSZXNvbHZlciwgdXNlc0FwcElkZW50aXR5KTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0dXNlclNlbGVjdGlvbiA9IGF3YWl0IHRoaXMuX2ludGVudFJlc29sdmVySGVscGVyPy5sYXVuY2hJbnRlbnRSZXNvbHZlcihcblx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0YXBwczogaW50ZW50c0ZvclNlbGVjdGlvblswXS5hcHBzLFxuXHRcdFx0XHRcdFx0XHRpbnRlbnRcblx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRjbGllbnRJZGVudGl0eVxuXHRcdFx0XHRcdCk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dXNlclNlbGVjdGlvbiA9IGF3YWl0IHRoaXMuX2ludGVudFJlc29sdmVySGVscGVyPy5sYXVuY2hJbnRlbnRSZXNvbHZlcihcblx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0aW50ZW50LFxuXHRcdFx0XHRcdFx0XHRpbnRlbnRzOiBpbnRlbnRzRm9yU2VsZWN0aW9uXG5cdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0Y2xpZW50SWRlbnRpdHlcblx0XHRcdFx0XHQpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdC8vIHVwZGF0ZSBpbnRlbnQgd2l0aCB1c2VyIHNlbGVjdGlvblxuXHRcdFx0XHRpZiAoaXNFbXB0eSh1c2VyU2VsZWN0aW9uKSkge1xuXHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcihSZXNvbHZlRXJyb3IuUmVzb2x2ZXJVbmF2YWlsYWJsZSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0aW50ZW50LmRpc3BsYXlOYW1lID0gdXNlclNlbGVjdGlvbi5pbnRlbnQuZGlzcGxheU5hbWU7XG5cdFx0XHRcdGludGVudC5uYW1lID0gdXNlclNlbGVjdGlvbi5pbnRlbnQubmFtZTtcblx0XHRcdFx0Y29uc3QgaW50ZW50UmVzb2x2ZXIgPSBhd2FpdCB0aGlzLmhhbmRsZUludGVudFBpY2tlclNlbGVjdGlvbihcblx0XHRcdFx0XHR1c2VyU2VsZWN0aW9uLFxuXHRcdFx0XHRcdGludGVudCBhcyBPcGVuRmluLkludGVudCxcblx0XHRcdFx0XHRjbGllbnRJZGVudGl0eVxuXHRcdFx0XHQpO1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5zaGFwZUludGVudFJlc29sdmVyKGludGVudFJlc29sdmVyLCB1c2VzQXBwSWRlbnRpdHkpO1xuXHRcdFx0fVxuXG5cdFx0XHQvKipcblx0XHRcdCAqIEhhbmRsZSBhIGZpcmVkIGludGVudC5cblx0XHRcdCAqIEBwYXJhbSBpbnRlbnQgVGhlIGludGVudCB0byBoYW5kbGUuXG5cdFx0XHQgKiBAcGFyYW0gY2xpZW50SWRlbnRpdHkgVGhlIGNsaWVudCBpZGVudGl0eS5cblx0XHRcdCAqIEByZXR1cm5zIFRoZSBpbnRlbnQgcmVzb2x1dGlvbi5cblx0XHRcdCAqL1xuXHRcdFx0cHVibGljIGFzeW5jIGhhbmRsZUZpcmVkSW50ZW50KFxuXHRcdFx0XHRpbnRlbnQ6IE9wZW5GaW4uSW50ZW50PE9wZW5GaW4uSW50ZW50TWV0YWRhdGE8SW50ZW50VGFyZ2V0TWV0YURhdGE+Pixcblx0XHRcdFx0Y2xpZW50SWRlbnRpdHk6IE9wZW5GaW4uQ2xpZW50SWRlbnRpdHlcblx0XHRcdCk6IFByb21pc2U8T21pdDxJbnRlbnRSZXNvbHV0aW9uLCBcImdldFJlc3VsdFwiPiB8IHsgc291cmNlOiBzdHJpbmc7IHZlcnNpb24/OiBzdHJpbmcgfT4ge1xuXHRcdFx0XHRsb2dnZXIuaW5mbyhcIlJlY2VpdmVkIHJlcXVlc3QgZm9yIGEgcmFpc2VkIGludGVudFwiLCBpbnRlbnQpO1xuXHRcdFx0XHRjb25zdCB0YXJnZXRBcHBJZGVudGlmaWVyID0gdGhpcy5nZXRBcHBsaWNhdGlvbklkZW50aXR5KGludGVudC5tZXRhZGF0YSk7XG5cdFx0XHRcdGNvbnN0IHVzZXNBcHBJZGVudGlmaWVyID0gdGhpcy51c2VzQXBwbGljYXRpb25JZGVudGl0eShjbGllbnRJZGVudGl0eSk7XG5cblx0XHRcdFx0Y29uc3QgbWF0Y2hlZEludGVudHMgPSBhd2FpdCB0aGlzLl9hcHBJbnRlbnRIZWxwZXIuZ2V0SW50ZW50KGludGVudC5uYW1lLCBpbnRlbnQ/LmNvbnRleHQ/LnR5cGUpO1xuXHRcdFx0XHRjb25zdCBpbnRlbnRBcHBzOiBQbGF0Zm9ybUFwcFtdID0gW107XG5cblx0XHRcdFx0aWYgKCFpc0VtcHR5KG1hdGNoZWRJbnRlbnRzKSkge1xuXHRcdFx0XHRcdGludGVudEFwcHMucHVzaCguLi5tYXRjaGVkSW50ZW50cy5hcHBzKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAoIWlzRW1wdHkodGFyZ2V0QXBwSWRlbnRpZmllcikpIHtcblx0XHRcdFx0XHRjb25zdCB0YXJnZXRBcHAgPSBhd2FpdCBnZXRBcHAodGFyZ2V0QXBwSWRlbnRpZmllci5hcHBJZCk7XG5cdFx0XHRcdFx0aWYgKGlzRW1wdHkodGFyZ2V0QXBwKSkge1xuXHRcdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKFJlc29sdmVFcnJvci5UYXJnZXRBcHBVbmF2YWlsYWJsZSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdC8vIGVuc3VyZSB0aGF0IHRoZSBzcGVjaWZpZWQgYXBwIGlzIG9uZSBvZiB0aGUgaW50ZW50IGFwcHNcblx0XHRcdFx0XHRpZiAoIWludGVudEFwcHMuc29tZSgoYXBwKSA9PiBhcHAuYXBwSWQgPT09IHRhcmdldEFwcElkZW50aWZpZXIuYXBwSWQpKSB7XG5cdFx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoUmVzb2x2ZUVycm9yLk5vQXBwc0ZvdW5kKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0Y29uc3QgaW50ZW50UmVzb2x2ZXIgPSBhd2FpdCB0aGlzLmhhbmRsZVRhcmdldGVkSW50ZW50KFxuXHRcdFx0XHRcdFx0dGFyZ2V0QXBwSWRlbnRpZmllcixcblx0XHRcdFx0XHRcdGludGVudCxcblx0XHRcdFx0XHRcdGZhbHNlLFxuXHRcdFx0XHRcdFx0Y2xpZW50SWRlbnRpdHlcblx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdHJldHVybiB0aGlzLnNoYXBlSW50ZW50UmVzb2x2ZXIoaW50ZW50UmVzb2x2ZXIsIHVzZXNBcHBJZGVudGlmaWVyKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmIChcblx0XHRcdFx0XHR0aGlzLl91bnJlZ2lzdGVyZWRBcHAgJiZcblx0XHRcdFx0XHQoYXdhaXQgdGhpcy5jYW5BZGRVbnJlZ2lzdGVyZWRBcHAoY2xpZW50SWRlbnRpdHksIGludGVudC5uYW1lLCBpbnRlbnQ/LmNvbnRleHQ/LnR5cGUpKVxuXHRcdFx0XHQpIHtcblx0XHRcdFx0XHQvLyBXZSBoYXZlIHVucmVnaXN0ZXJlZCBhcHAgaW5zdGFuY2VzIHRoYXQgc3VwcG9ydCB0aGlzIGludGVudCBhbmQgc3VwcG9ydCBmb3IgdW5yZWdpc3RlcmVkIGluc3RhbmNlcyBpcyBlbmFibGVkXG5cdFx0XHRcdFx0aW50ZW50QXBwcy5wdXNoKHRoaXMuX3VucmVnaXN0ZXJlZEFwcCk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAoaW50ZW50QXBwcy5sZW5ndGggPT09IDApIHtcblx0XHRcdFx0XHRsb2dnZXIuaW5mbyhcIk5vIGFwcHMgc3VwcG9ydCB0aGlzIGludGVudFwiKTtcblx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoUmVzb2x2ZUVycm9yLk5vQXBwc0ZvdW5kKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmIChpbnRlbnRBcHBzLmxlbmd0aCA9PT0gMSkge1xuXHRcdFx0XHRcdC8vIGhhbmRsZSBzaW5nbGUgZW50cnlcblx0XHRcdFx0XHRjb25zdCBhcHBJbnN0YW5jZXMgPSBhd2FpdCB0aGlzLl9jbGllbnRSZWdpc3RyYXRpb25IZWxwZXIuZmluZEFwcEluc3RhbmNlcyhcblx0XHRcdFx0XHRcdGludGVudEFwcHNbMF0sXG5cdFx0XHRcdFx0XHRjbGllbnRJZGVudGl0eSxcblx0XHRcdFx0XHRcdFwiaW50ZW50XCJcblx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdC8vIGlmIHRoZXJlIGFyZSBubyBpbnN0YW5jZXMgbGF1bmNoIGEgbmV3IG9uZSBvdGhlcndpc2UgcHJlc2VudCB0aGUgY2hvaWNlIHRvIHRoZSB1c2VyXG5cdFx0XHRcdFx0Ly8gYnkgZmFsbGluZyB0aHJvdWdoIHRvIHRoZSBuZXh0IGNvZGUgYmxvY2tcblx0XHRcdFx0XHRsZXQgYXBwSW5zdGFuY2VJZDogc3RyaW5nIHwgdW5kZWZpbmVkO1xuXHRcdFx0XHRcdGlmIChhcHBJbnN0YW5jZXMubGVuZ3RoID09PSAxKSB7XG5cdFx0XHRcdFx0XHRhcHBJbnN0YW5jZUlkID0gYXBwSW5zdGFuY2VzWzBdLmluc3RhbmNlSWQ7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGlmIChcblx0XHRcdFx0XHRcdGFwcEluc3RhbmNlcy5sZW5ndGggPT09IDAgfHxcblx0XHRcdFx0XHRcdHRoaXMudXNlU2luZ2xlSW5zdGFuY2UoaW50ZW50QXBwc1swXSkgfHxcblx0XHRcdFx0XHRcdHRoaXMuY3JlYXRlTmV3SW5zdGFuY2UoaW50ZW50QXBwc1swXSlcblx0XHRcdFx0XHQpIHtcblx0XHRcdFx0XHRcdGNvbnN0IGludGVudFJlc29sdmVyID0gYXdhaXQgdGhpcy5sYXVuY2hBcHBXaXRoSW50ZW50KFxuXHRcdFx0XHRcdFx0XHRpbnRlbnRBcHBzWzBdLFxuXHRcdFx0XHRcdFx0XHRpbnRlbnQsXG5cdFx0XHRcdFx0XHRcdGFwcEluc3RhbmNlSWQsXG5cdFx0XHRcdFx0XHRcdGNsaWVudElkZW50aXR5XG5cdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdFx0aWYgKGlzRW1wdHkoaW50ZW50UmVzb2x2ZXIpKSB7XG5cdFx0XHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcihSZXNvbHZlRXJyb3IuTm9BcHBzRm91bmQpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0cmV0dXJuIHRoaXMuc2hhcGVJbnRlbnRSZXNvbHZlcihpbnRlbnRSZXNvbHZlciwgdXNlc0FwcElkZW50aWZpZXIpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdGNvbnN0IHVzZXJTZWxlY3Rpb24gPSBhd2FpdCB0aGlzLl9pbnRlbnRSZXNvbHZlckhlbHBlcj8ubGF1bmNoSW50ZW50UmVzb2x2ZXIoXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0YXBwczogaW50ZW50QXBwcyxcblx0XHRcdFx0XHRcdGludGVudFxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0Y2xpZW50SWRlbnRpdHlcblx0XHRcdFx0KTtcblxuXHRcdFx0XHRpZiAoaXNFbXB0eSh1c2VyU2VsZWN0aW9uKSkge1xuXHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcihSZXNvbHZlRXJyb3IuUmVzb2x2ZXJVbmF2YWlsYWJsZSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRjb25zdCBpbnRlbnRSZXNvbHZlciA9IGF3YWl0IHRoaXMuaGFuZGxlSW50ZW50UGlja2VyU2VsZWN0aW9uKHVzZXJTZWxlY3Rpb24sIGludGVudCwgY2xpZW50SWRlbnRpdHkpO1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5zaGFwZUludGVudFJlc29sdmVyKGludGVudFJlc29sdmVyLCB1c2VzQXBwSWRlbnRpZmllcik7XG5cdFx0XHR9XG5cblx0XHRcdC8qKlxuXHRcdFx0ICogSW52b2tlIHRoZSBpbnRlbnQgaGFuZGxlci5cblx0XHRcdCAqIEBwYXJhbSBjbGllbnRJZGVudGl0eSBUaGUgY2xpZW50IGlkZW50aXR5LlxuXHRcdFx0ICogQHBhcmFtIGhhbmRsZXJJZCBUaGUgaGFuZGxlciBJRC5cblx0XHRcdCAqIEBwYXJhbSBpbnRlbnQgVGhlIGludGVudCB0byBpbnZva2UuXG5cdFx0XHQgKiBAcmV0dXJucyBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aGVuIHRoZSBpbnRlbnQgaGFuZGxlciBpcyBpbnZva2VkLlxuXHRcdFx0ICovXG5cdFx0XHRwdWJsaWMgYXN5bmMgaW52b2tlSW50ZW50SGFuZGxlcihcblx0XHRcdFx0Y2xpZW50SWRlbnRpdHk6IE9wZW5GaW4uQ2xpZW50SWRlbnRpdHksXG5cdFx0XHRcdGhhbmRsZXJJZDogc3RyaW5nLFxuXHRcdFx0XHRpbnRlbnQ6IE9wZW5GaW4uSW50ZW50XG5cdFx0XHQpOiBQcm9taXNlPHZvaWQ+IHtcblx0XHRcdFx0Y29uc3QgeyBjb250ZXh0IH0gPSBpbnRlbnQ7XG5cdFx0XHRcdGxldCBjb250ZXh0TWV0YWRhdGE6IENvbnRleHRNZXRhZGF0YSB8IHVuZGVmaW5lZDtcblx0XHRcdFx0bGV0IHBhc3NlZENvbnRleHQ6IHsgW2tleTogc3RyaW5nXTogdW5rbm93biB9IHwgdW5kZWZpbmVkO1xuXHRcdFx0XHRpZiAoIWlzRW1wdHkoY29udGV4dCkpIHtcblx0XHRcdFx0XHRwYXNzZWRDb250ZXh0ID0geyAuLi5jb250ZXh0IH07XG5cdFx0XHRcdFx0Y29udGV4dE1ldGFkYXRhID0gcGFzc2VkQ29udGV4dFt0aGlzLl9tZXRhZGF0YUtleV0gYXMgQ29udGV4dE1ldGFkYXRhO1xuXHRcdFx0XHRcdGlmICghaXNFbXB0eShjb250ZXh0TWV0YWRhdGEpKSB7XG5cdFx0XHRcdFx0XHRkZWxldGUgcGFzc2VkQ29udGV4dFt0aGlzLl9tZXRhZGF0YUtleV07XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiBzdXBlci5pbnZva2VJbnRlbnRIYW5kbGVyKGNsaWVudElkZW50aXR5LCBoYW5kbGVySWQsIHtcblx0XHRcdFx0XHQuLi5pbnRlbnQsXG5cdFx0XHRcdFx0Y29udGV4dDoge1xuXHRcdFx0XHRcdFx0Li4ucGFzc2VkQ29udGV4dCxcblx0XHRcdFx0XHRcdGNvbnRleHRNZXRhZGF0YVxuXHRcdFx0XHRcdH0gYXMgdW5rbm93biBhcyBPcGVuRmluLkNvbnRleHRcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cblx0XHRcdC8qKlxuXHRcdFx0ICogSGFuZGxlIHRoZSBGREMzIG9wZW4uXG5cdFx0XHQgKiBAcGFyYW0gZmRjM09wZW5PcHRpb25zIFRoZSBvcHRpb25zIGZvciB0aGUgb3Blbi5cblx0XHRcdCAqIEBwYXJhbSBmZGMzT3Blbk9wdGlvbnMuYXBwIFRoZSBwbGF0Zm9ybSBhcHAgb3IgaXRzIGlkLlxuXHRcdFx0ICogQHBhcmFtIGZkYzNPcGVuT3B0aW9ucy5jb250ZXh0IFRoZSBjb250ZXh0IGJlaW5nIG9wZW5lZC5cblx0XHRcdCAqIEBwYXJhbSBjbGllbnRJZGVudGl0eSBUaGUgY2xpZW50IGlkZW50aXR5LlxuXHRcdFx0ICogQHJldHVybnMgVGhlIGFwcGxpY2F0aW9uIGlkZW50aWZpZXIuXG5cdFx0XHQgKi9cblx0XHRcdHB1YmxpYyBhc3luYyBmZGMzSGFuZGxlT3Blbihcblx0XHRcdFx0ZmRjM09wZW5PcHRpb25zOiB7IGFwcDogKFBsYXRmb3JtQXBwICYgQXBwSWRlbnRpZmllcikgfCBzdHJpbmc7IGNvbnRleHQ6IE9wZW5GaW4uQ29udGV4dCB9LFxuXHRcdFx0XHRjbGllbnRJZGVudGl0eTogT3BlbkZpbi5DbGllbnRJZGVudGl0eVxuXHRcdFx0KTogUHJvbWlzZTxBcHBJZGVudGlmaWVyPiB7XG5cdFx0XHRcdGlmIChpc0VtcHR5KGZkYzNPcGVuT3B0aW9ucz8uYXBwKSkge1xuXHRcdFx0XHRcdGxvZ2dlci5lcnJvcihcIkEgcmVxdWVzdCB0byBmZGMzLm9wZW4gZGlkIG5vdCBwYXNzIGFuIGZkYzNPcGVuT3B0aW9ucyBvYmplY3RcIik7XG5cdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKFJlc29sdmVFcnJvci5Ob0FwcHNGb3VuZCk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRsb2dnZXIuaW5mbyhcblx0XHRcdFx0XHRgQSByZXF1ZXN0IHRvIE9wZW4gaGFzIGJlZW4gc2VudCB0byB0aGUgcGxhdGZvcm0gYnkgdXVpZDogJHtjbGllbnRJZGVudGl0eT8udXVpZH0sIG5hbWU6ICR7Y2xpZW50SWRlbnRpdHk/Lm5hbWV9LCBlbmRwb2ludElkOiAke2NsaWVudElkZW50aXR5LmVuZHBvaW50SWR9IHdpdGggcGFzc2VkIGNvbnRleHQ6YCxcblx0XHRcdFx0XHRmZGMzT3Blbk9wdGlvbnMuY29udGV4dFxuXHRcdFx0XHQpO1xuXHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdGxldCByZXF1ZXN0ZWRJZDogc3RyaW5nO1xuXHRcdFx0XHRcdGxldCBpbnN0YW5jZUlkOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG5cdFx0XHRcdFx0bGV0IHBsYXRmb3JtSWRlbnRpdGllczogUGxhdGZvcm1BcHBJZGVudGlmaWVyW10gfCB1bmRlZmluZWQ7XG5cdFx0XHRcdFx0bGV0IGZvY3VzQXBwID0gZmFsc2U7XG5cdFx0XHRcdFx0bGV0IGFwcElkOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG5cblx0XHRcdFx0XHRpZiAoaXNTdHJpbmcoZmRjM09wZW5PcHRpb25zLmFwcCkpIHtcblx0XHRcdFx0XHRcdHJlcXVlc3RlZElkID0gZmRjM09wZW5PcHRpb25zLmFwcDtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0cmVxdWVzdGVkSWQgPSBmZGMzT3Blbk9wdGlvbnMuYXBwLmFwcElkID8/IGZkYzNPcGVuT3B0aW9ucy5hcHAubmFtZTtcblx0XHRcdFx0XHRcdGluc3RhbmNlSWQgPSBmZGMzT3Blbk9wdGlvbnMuYXBwLmluc3RhbmNlSWQ7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0Y29uc3QgcmVxdWVzdGVkQXBwID0gYXdhaXQgZ2V0QXBwKHJlcXVlc3RlZElkKTtcblx0XHRcdFx0XHRpZiAoaXNFbXB0eShyZXF1ZXN0ZWRBcHApKSB7XG5cdFx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoT3BlbkVycm9yLkFwcE5vdEZvdW5kKTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRpZiAoIWlzRW1wdHkoaW5zdGFuY2VJZCkpIHtcblx0XHRcdFx0XHRcdC8vIGFuIGluc3RhbmNlIG9mIGFuIGFwcGxpY2F0aW9uIHdhcyBzZWxlY3RlZCBub3cgbG9vayB1cCB0aGUgdXVpZCBhbmQgbmFtZVxuXHRcdFx0XHRcdFx0Y29uc3QgYWxsQ29ubmVjdGVkQ2xpZW50cyA9IGF3YWl0IHRoaXMuZ2V0QWxsQ2xpZW50SW5mbygpO1xuXHRcdFx0XHRcdFx0Y29uc3QgY2xpZW50SW5mbyA9IGFsbENvbm5lY3RlZENsaWVudHMuZmluZChcblx0XHRcdFx0XHRcdFx0KGNvbm5lY3RlZENsaWVudCkgPT4gY29ubmVjdGVkQ2xpZW50LmVuZHBvaW50SWQgPT09IGluc3RhbmNlSWRcblx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0XHRpZiAoIWlzRW1wdHkoY2xpZW50SW5mbykpIHtcblx0XHRcdFx0XHRcdFx0bG9nZ2VyLmluZm8oYEFwcCBJZDogJHtyZXF1ZXN0ZWRJZH0gYW5kIGluc3RhbmNlIElkOiAke2luc3RhbmNlSWR9IHdhcyBwcm92aWRlZCBhbmQgZm91bmQuYCk7XG5cdFx0XHRcdFx0XHRcdC8vIHRoZSBjb25uZWN0ZWQgaW5zdGFuY2UgaXMgYXZhaWxhYmxlXG5cdFx0XHRcdFx0XHRcdHBsYXRmb3JtSWRlbnRpdGllcyA9IFtcblx0XHRcdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdFx0XHR1dWlkOiBjbGllbnRJbmZvLnV1aWQsXG5cdFx0XHRcdFx0XHRcdFx0XHRuYW1lOiBjbGllbnRJbmZvLm5hbWUsXG5cdFx0XHRcdFx0XHRcdFx0XHRhcHBJZDogcmVxdWVzdGVkSWQsXG5cdFx0XHRcdFx0XHRcdFx0XHRpbnN0YW5jZUlkXG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRdO1xuXHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKFJlc29sdmVFcnJvci5UYXJnZXRJbnN0YW5jZVVuYXZhaWxhYmxlKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRjb25zdCBpc09wZW5CeUludGVudCA9IHRoaXMuX29wZW5PcHRpb25zPy5vcGVuU3RyYXRlZ3kgPT09IFwiaW50ZW50XCI7XG5cblx0XHRcdFx0XHRpZiAoaXNPcGVuQnlJbnRlbnQpIHtcblx0XHRcdFx0XHRcdGNvbnN0IG9wZW5BcHBJbnRlbnQ6IE9wZW5GaW4uSW50ZW50ID0ge1xuXHRcdFx0XHRcdFx0XHRjb250ZXh0OiBmZGMzT3Blbk9wdGlvbnMuY29udGV4dCxcblx0XHRcdFx0XHRcdFx0bmFtZTogXCJPcGVuQXBwXCIsXG5cdFx0XHRcdFx0XHRcdG1ldGFkYXRhOiB7XG5cdFx0XHRcdFx0XHRcdFx0dGFyZ2V0OiB7IGFwcElkOiByZXF1ZXN0ZWRJZCB9XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0XHRjb25zdCByZXN1bHQgPSBhd2FpdCB0aGlzLmxhdW5jaEFwcFdpdGhJbnRlbnQoXG5cdFx0XHRcdFx0XHRcdHJlcXVlc3RlZEFwcCxcblx0XHRcdFx0XHRcdFx0b3BlbkFwcEludGVudCxcblx0XHRcdFx0XHRcdFx0aW5zdGFuY2VJZCxcblx0XHRcdFx0XHRcdFx0Y2xpZW50SWRlbnRpdHlcblx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0XHRpZiAoaXNTdHJpbmcocmVzdWx0LnNvdXJjZSkpIHtcblx0XHRcdFx0XHRcdFx0YXBwSWQgPSByZXN1bHQuc291cmNlO1xuXHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0YXBwSWQgPSByZXN1bHQuc291cmNlLmFwcElkO1xuXHRcdFx0XHRcdFx0XHRpbnN0YW5jZUlkID0gcmVzdWx0LnNvdXJjZS5pbnN0YW5jZUlkO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRpZiAoaXNFbXB0eShwbGF0Zm9ybUlkZW50aXRpZXMpKSB7XG5cdFx0XHRcdFx0XHRcdGxldCBsYXVuY2hQcmVmZXJlbmNlOiBMYXVuY2hQcmVmZXJlbmNlIHwgdW5kZWZpbmVkO1xuXHRcdFx0XHRcdFx0XHRjb25zdCBib3VuZHMgPSBhd2FpdCBnZXRXaW5kb3dQb3NpdGlvblVzaW5nU3RyYXRlZ3koXG5cdFx0XHRcdFx0XHRcdFx0b3B0aW9ucy53aW5kb3dQb3NpdGlvbk9wdGlvbnMsXG5cdFx0XHRcdFx0XHRcdFx0Y2xpZW50SWRlbnRpdHlcblx0XHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRcdFx0aWYgKCFpc0VtcHR5KGJvdW5kcykpIHtcblx0XHRcdFx0XHRcdFx0XHRsYXVuY2hQcmVmZXJlbmNlID0geyBib3VuZHMgfTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRwbGF0Zm9ybUlkZW50aXRpZXMgPSBhd2FpdCBsYXVuY2gocmVxdWVzdGVkQXBwPy5hcHBJZCwgbGF1bmNoUHJlZmVyZW5jZSk7XG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRmb2N1c0FwcCA9IHRydWU7XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdGlmICghaXNFbXB0eShwbGF0Zm9ybUlkZW50aXRpZXMpICYmIHBsYXRmb3JtSWRlbnRpdGllcz8ubGVuZ3RoID4gMCkge1xuXHRcdFx0XHRcdFx0XHRhcHBJZCA9IHBsYXRmb3JtSWRlbnRpdGllc1swXS5hcHBJZDtcblx0XHRcdFx0XHRcdFx0Y29uc3Qgb3BlblRpbWVvdXQ6IG51bWJlciB8IHVuZGVmaW5lZCA9IHRoaXMuX29wZW5PcHRpb25zPy5jb25uZWN0aW9uVGltZW91dDtcblx0XHRcdFx0XHRcdFx0Ly8gaWYgd2UgaGF2ZSBhIHNuYXBzaG90IGFuZCBtdWx0aXBsZSBpZGVudGl0aWVzIHdlIHdpbGwgbm90IHdhaXQgYXMgbm90IGFsbCBvZiB0aGVtIG1pZ2h0IG5vdCBzdXBwb3J0IGludGVudHMuXG5cdFx0XHRcdFx0XHRcdGluc3RhbmNlSWQgPSBhd2FpdCB0aGlzLl9jbGllbnRSZWdpc3RyYXRpb25IZWxwZXIub25Db25uZWN0aW9uQ2xpZW50UmVhZHkoXG5cdFx0XHRcdFx0XHRcdFx0cGxhdGZvcm1JZGVudGl0aWVzWzBdLFxuXHRcdFx0XHRcdFx0XHRcdG9wZW5UaW1lb3V0XG5cdFx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0XHRcdGlmIChwbGF0Zm9ybUlkZW50aXRpZXMubGVuZ3RoID4gMSkge1xuXHRcdFx0XHRcdFx0XHRcdGxvZ2dlci53YXJuKFxuXHRcdFx0XHRcdFx0XHRcdFx0XCJPcGVuIGNhbiBvbmx5IHJldHVybiBvbmUgYXBwIGFuZCBpbnN0YW5jZSBpZCBhbmQgbXVsdGlwbGUgaW5zdGFuY2VzIHdlcmUgbGF1bmNoZWQgYXMgYSByZXN1bHQuIFJldHVybmluZyB0aGUgZmlyc3QgaW5zdGFuY2UuIFJldHVybmVkIGluc3RhbmNlczogXCIsXG5cdFx0XHRcdFx0XHRcdFx0XHRwbGF0Zm9ybUlkZW50aXRpZXNcblx0XHRcdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdGlmICghaXNFbXB0eShmZGMzT3Blbk9wdGlvbnM/LmNvbnRleHQpKSB7XG5cdFx0XHRcdFx0XHRcdFx0Y29uc3QgY29udGV4dFRpbWVvdXQ6IG51bWJlciB8IHVuZGVmaW5lZCA9IG9wdGlvbnM/LmludGVudE9wdGlvbnM/LmludGVudFRpbWVvdXQ7XG5cdFx0XHRcdFx0XHRcdFx0Y29uc3QgY29udGV4dFR5cGVOYW1lID0gZmRjM09wZW5PcHRpb25zLmNvbnRleHQudHlwZTtcblx0XHRcdFx0XHRcdFx0XHQvLyBpZiB3ZSBoYXZlIGEgc25hcHNob3QgYW5kIG11bHRpcGxlIGlkZW50aXRpZXMgd2Ugd2lsbCBub3Qgd2FpdCBhcyBub3QgYWxsIG9mIHRoZW0gbWlnaHQgbm90IHN1cHBvcnQgaW50ZW50cy5cblx0XHRcdFx0XHRcdFx0XHRjb25zdCBjbGllbnRSZWFkeUluc3RhbmNlSWQgPSBhd2FpdCB0aGlzLl9jbGllbnRSZWdpc3RyYXRpb25IZWxwZXIub25Db250ZXh0Q2xpZW50UmVhZHkoXG5cdFx0XHRcdFx0XHRcdFx0XHRwbGF0Zm9ybUlkZW50aXRpZXNbMF0sXG5cdFx0XHRcdFx0XHRcdFx0XHRjb250ZXh0VHlwZU5hbWUsXG5cdFx0XHRcdFx0XHRcdFx0XHRjb250ZXh0VGltZW91dFxuXHRcdFx0XHRcdFx0XHRcdCk7XG5cblx0XHRcdFx0XHRcdFx0XHRsZXQgdHJhY2tlZEhhbmRsZXIgPSB0aGlzLl9jbGllbnRSZWdpc3RyYXRpb25IZWxwZXIuZ2V0UmVnaXN0ZXJlZENvbnRleHRIYW5kbGVyKFxuXHRcdFx0XHRcdFx0XHRcdFx0Y29udGV4dFR5cGVOYW1lLFxuXHRcdFx0XHRcdFx0XHRcdFx0Y2xpZW50UmVhZHlJbnN0YW5jZUlkXG5cdFx0XHRcdFx0XHRcdFx0KTtcblxuXHRcdFx0XHRcdFx0XHRcdGlmIChpc0VtcHR5KHRyYWNrZWRIYW5kbGVyKSkge1xuXHRcdFx0XHRcdFx0XHRcdFx0dHJhY2tlZEhhbmRsZXIgPSB0aGlzLl9jbGllbnRSZWdpc3RyYXRpb25IZWxwZXIuZ2V0UmVnaXN0ZXJlZENvbnRleHRIYW5kbGVyKFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcIipcIixcblx0XHRcdFx0XHRcdFx0XHRcdFx0Y2xpZW50UmVhZHlJbnN0YW5jZUlkXG5cdFx0XHRcdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0XHRcdGlmICghaXNFbXB0eSh0cmFja2VkSGFuZGxlcikpIHtcblx0XHRcdFx0XHRcdFx0XHRcdGNvbnN0IGNvbnRleHRUb1Bhc3MgPSBhd2FpdCB0aGlzLnByb2Nlc3NDb250ZXh0KGZkYzNPcGVuT3B0aW9ucy5jb250ZXh0KTtcblx0XHRcdFx0XHRcdFx0XHRcdGNvbnN0IGNvbnRleHRNZXRhZGF0YSA9IGF3YWl0IHRoaXMuZ2V0Q29udGV4dE1ldGFkYXRhKGNsaWVudElkZW50aXR5KTtcblx0XHRcdFx0XHRcdFx0XHRcdGNvbnN0IHVwZGF0ZWRDb250ZXh0OiBPcGVuRmluLkNvbnRleHQgPSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdC4uLmNvbnRleHRUb1Bhc3MsXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFt0aGlzLl9tZXRhZGF0YUtleV06IGNvbnRleHRNZXRhZGF0YVxuXHRcdFx0XHRcdFx0XHRcdFx0fTtcblx0XHRcdFx0XHRcdFx0XHRcdGF3YWl0IHRoaXMuaW52b2tlQ29udGV4dEhhbmRsZXIoXG5cdFx0XHRcdFx0XHRcdFx0XHRcdHRyYWNrZWRIYW5kbGVyLmNsaWVudElkZW50aXR5LFxuXHRcdFx0XHRcdFx0XHRcdFx0XHR0cmFja2VkSGFuZGxlci5oYW5kbGVySWQsXG5cdFx0XHRcdFx0XHRcdFx0XHRcdHVwZGF0ZWRDb250ZXh0XG5cdFx0XHRcdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRsb2dnZXIud2Fybihcblx0XHRcdFx0XHRcdFx0XHRcdFx0YFVuYWJsZSB0byBzZW5kIGNvbnRleHQgb2YgdHlwZSAke2NvbnRleHRUeXBlTmFtZX0gb3BlbmVkIGFwcCAke2FwcElkfSB3aXRoIGluc3RhbmNlSWQgb2YgJHtjbGllbnRSZWFkeUluc3RhbmNlSWR9IGFzIHdlIGNhbm5vdCBmaW5kIGEgdHJhY2tlZCBjb250ZXh0IGhhbmRsZXIuYFxuXHRcdFx0XHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRpZiAoIWlzRW1wdHkoYXBwSWQpKSB7XG5cdFx0XHRcdFx0XHRpZiAoZm9jdXNBcHAgJiYgIWlzRW1wdHkocGxhdGZvcm1JZGVudGl0aWVzKSAmJiAhaXNFbXB0eShoZWxwZXJzPy5icmluZ0FwcFRvRnJvbnQpKSB7XG5cdFx0XHRcdFx0XHRcdGF3YWl0IGhlbHBlcnMuYnJpbmdBcHBUb0Zyb250KHJlcXVlc3RlZEFwcCwgcGxhdGZvcm1JZGVudGl0aWVzKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdHJldHVybiB7IGFwcElkLCBpbnN0YW5jZUlkIH07XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0Ly8gaWYgbm8gaWQgcmV0dXJuZWQgdGhlbiB0aGUgbGlrZWxpaG9vZCBpcyB0aGF0IHRoZXJlIHdhcyBhIHByb2JsZW0gbGF1bmNoaW5nIHRoZSBhcHBsaWNhdGlvbiBhcyBhIHJlc3VsdCBvZiB0aGUgb3BlbiByZXF1ZXN0LlxuXHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcihPcGVuRXJyb3IuRXJyb3JPbkxhdW5jaCk7XG5cdFx0XHRcdH0gY2F0Y2ggKG9wZW5FcnJvcikge1xuXHRcdFx0XHRcdGNvbnN0IGVycm9yID0gZm9ybWF0RXJyb3Iob3BlbkVycm9yKTtcblx0XHRcdFx0XHRpZiAoXG5cdFx0XHRcdFx0XHRlcnJvciA9PT0gUmVzb2x2ZUVycm9yLlRhcmdldEluc3RhbmNlVW5hdmFpbGFibGUgfHxcblx0XHRcdFx0XHRcdGVycm9yID09PSBSZXNvbHZlRXJyb3IuSW50ZW50RGVsaXZlcnlGYWlsZWQgfHxcblx0XHRcdFx0XHRcdGVycm9yID09PSBSZXNvbHZlRXJyb3IuVGFyZ2V0SW5zdGFuY2VVbmF2YWlsYWJsZSB8fFxuXHRcdFx0XHRcdFx0ZXJyb3IgPT09IE9wZW5FcnJvci5BcHBUaW1lb3V0XG5cdFx0XHRcdFx0KSB7XG5cdFx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoT3BlbkVycm9yLkFwcFRpbWVvdXQpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHR0aHJvdyBvcGVuRXJyb3I7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0LyoqXG5cdFx0XHQgKiBUaGUgY2xpZW50IGhhcyBkaXNjb25uZWN0ZWQgZm9ybSB0aGUgYnJva2VyLlxuXHRcdFx0ICogQHBhcmFtIGNsaWVudElkZW50aXR5IFRoZSBpZGVudGl0eSBvZiB0aGUgY2xpZW50IHRoYXQgZGlzY29ubmVjdGVkLlxuXHRcdFx0ICovXG5cdFx0XHRwdWJsaWMgYXN5bmMgY2xpZW50RGlzY29ubmVjdGVkKGNsaWVudElkZW50aXR5OiBPcGVuRmluLkNsaWVudElkZW50aXR5KTogUHJvbWlzZTx2b2lkPiB7XG5cdFx0XHRcdGF3YWl0IHRoaXMuX2NsaWVudFJlZ2lzdHJhdGlvbkhlbHBlci5jbGllbnREaXNjb25uZWN0ZWQoY2xpZW50SWRlbnRpdHkpO1xuXHRcdFx0XHRhd2FpdCBzdXBlci5jbGllbnREaXNjb25uZWN0ZWQoY2xpZW50SWRlbnRpdHkpO1xuXHRcdFx0fVxuXG5cdFx0XHQvKipcblx0XHRcdCAqIEhhbmRsZSBGREMzIGZpbmQgaW5zdGFuY2VzLlxuXHRcdFx0ICogQHBhcmFtIGFwcCBUaGUgYXBwIGlkZW50aWZpZXIgdG8gZmluZC5cblx0XHRcdCAqIEBwYXJhbSBjbGllbnRJZGVudGl0eSBUaGUgY2xpZW50IGlkZW50aXR5LlxuXHRcdFx0ICogQHJldHVybnMgVGhlIGluc3RhbmNlIG9mIHRoZSBhcHAuXG5cdFx0XHQgKi9cblx0XHRcdHB1YmxpYyBhc3luYyBmZGMzSGFuZGxlRmluZEluc3RhbmNlcyhcblx0XHRcdFx0YXBwOiBBcHBJZGVudGlmaWVyLFxuXHRcdFx0XHRjbGllbnRJZGVudGl0eTogT3BlbkZpbi5DbGllbnRJZGVudGl0eVxuXHRcdFx0KTogUHJvbWlzZTxBcHBJZGVudGlmaWVyW10+IHtcblx0XHRcdFx0cmV0dXJuIHRoaXMuX2NsaWVudFJlZ2lzdHJhdGlvbkhlbHBlci5maW5kQXBwSW5zdGFuY2VzKGFwcCwgY2xpZW50SWRlbnRpdHkpO1xuXHRcdFx0fVxuXG5cdFx0XHQvKipcblx0XHRcdCAqIEhhbmRsZSByZXF1ZXN0IHRvIGdldCBGREMzIGFwcCBtZXRhZGF0YS5cblx0XHRcdCAqIEBwYXJhbSBhcHAgVGhlIGFwcCB0byBnZXQgdGhlIG1ldGFkYXRhIGZvci5cblx0XHRcdCAqIEBwYXJhbSBjbGllbnRJZGVudGl0eSBUaGUgY2xpZW50IGlkZW50aXR5LlxuXHRcdFx0ICogQHJldHVybnMgVGhlIGFwcCBtZXRhZGF0YS5cblx0XHRcdCAqL1xuXHRcdFx0cHVibGljIGFzeW5jIGZkYzNIYW5kbGVHZXRBcHBNZXRhZGF0YShcblx0XHRcdFx0YXBwOiBBcHBJZGVudGlmaWVyLFxuXHRcdFx0XHRjbGllbnRJZGVudGl0eTogT3BlbkZpbi5DbGllbnRJZGVudGl0eVxuXHRcdFx0KTogUHJvbWlzZTxBcHBNZXRhZGF0YT4ge1xuXHRcdFx0XHRsb2dnZXIuaW5mbyhcImZkYzNIYW5kbGVHZXRBcHBNZXRhZGF0YSBjYWxsIHJlY2VpdmVkLlwiLCBhcHAsIGNsaWVudElkZW50aXR5KTtcblx0XHRcdFx0Ly8gdGhpcyB3aWxsIG9ubHkgYmUgY2FsbGVkIGJ5IEZEQzMgMi4wK1xuXHRcdFx0XHRsZXQgcGxhdGZvcm1BcHAgPSBhd2FpdCBnZXRBcHAoYXBwLmFwcElkKTtcblx0XHRcdFx0aWYgKGlzRW1wdHkocGxhdGZvcm1BcHApICYmIGFwcC5hcHBJZCA9PT0gdGhpcy5fdW5yZWdpc3RlcmVkQXBwPy5hcHBJZCkge1xuXHRcdFx0XHRcdHBsYXRmb3JtQXBwID0gdGhpcy5fdW5yZWdpc3RlcmVkQXBwO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmICghaXNFbXB0eShwbGF0Zm9ybUFwcCkpIHtcblx0XHRcdFx0XHRjb25zdCBhcHBNZXRhRGF0YTogQXBwTWV0YWRhdGEgPSBtYXBUbzIwQXBwTWV0YURhdGEocGxhdGZvcm1BcHApO1xuXHRcdFx0XHRcdGlmICghaXNFbXB0eShhcHAuaW5zdGFuY2VJZCkpIHtcblx0XHRcdFx0XHRcdGNvbnN0IGFsbENvbm5lY3RlZENsaWVudHMgPSBhd2FpdCB0aGlzLmdldEFsbENsaWVudEluZm8oKTtcblx0XHRcdFx0XHRcdGNvbnN0IGNvbm5lY3RlZENsaWVudCA9IGFsbENvbm5lY3RlZENsaWVudHMuZmluZChcblx0XHRcdFx0XHRcdFx0KGNsaWVudCkgPT4gY2xpZW50LmVuZHBvaW50SWQgPT09IGFwcC5pbnN0YW5jZUlkXG5cdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdFx0aWYgKCFpc0VtcHR5KGNvbm5lY3RlZENsaWVudCkgJiYgY29ubmVjdGVkQ2xpZW50LnV1aWQgPT09IGZpbi5tZS5pZGVudGl0eS51dWlkKSB7XG5cdFx0XHRcdFx0XHRcdGNvbnN0IGlkZW50aXR5ID0geyB1dWlkOiBjb25uZWN0ZWRDbGllbnQudXVpZCwgbmFtZTogY29ubmVjdGVkQ2xpZW50Lm5hbWUgfTtcblx0XHRcdFx0XHRcdFx0bGV0IHRpdGxlOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG5cdFx0XHRcdFx0XHRcdGxldCBwcmV2aWV3OiBzdHJpbmcgfCB1bmRlZmluZWQ7XG5cdFx0XHRcdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0XHRcdFx0aWYgKGNvbm5lY3RlZENsaWVudC5lbnRpdHlUeXBlID09PSBcIndpbmRvd1wiKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRjb25zdCBpbnN0YW5jZVdpbmRvdyA9IGZpbi5XaW5kb3cud3JhcFN5bmMoaWRlbnRpdHkpO1xuXHRcdFx0XHRcdFx0XHRcdFx0Y29uc3QgaXNWaXNpYmxlVXNlcldpbmRvdyA9IGF3YWl0IGluc3RhbmNlV2luZG93LmlzU2hvd2luZygpO1xuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKGlzVmlzaWJsZVVzZXJXaW5kb3cpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0Y29uc3Qgd2luZG93SW5mbyA9IGF3YWl0IGluc3RhbmNlV2luZG93LmdldEluZm8oKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0dGl0bGUgPSB3aW5kb3dJbmZvLnRpdGxlO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRwcmV2aWV3ID0gYXdhaXQgdGhpcy5nZXRQcmV2aWV3SW1hZ2UoaW5zdGFuY2VXaW5kb3cpO1xuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRjb25zdCBpbnN0YW5jZVZpZXcgPSBmaW4uVmlldy53cmFwU3luYyhpZGVudGl0eSk7XG5cdFx0XHRcdFx0XHRcdFx0XHRjb25zdCB2aWV3SW5mbyA9IGF3YWl0IGluc3RhbmNlVmlldy5nZXRJbmZvKCk7XG5cdFx0XHRcdFx0XHRcdFx0XHR0aXRsZSA9IHZpZXdJbmZvLnRpdGxlO1xuXHRcdFx0XHRcdFx0XHRcdFx0cHJldmlldyA9IGF3YWl0IHRoaXMuZ2V0UHJldmlld0ltYWdlKGluc3RhbmNlVmlldyk7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9IGNhdGNoIChlcnJvcikge1xuXHRcdFx0XHRcdFx0XHRcdGxvZ2dlci53YXJuKFxuXHRcdFx0XHRcdFx0XHRcdFx0YEEgY29ubmVjdGVkIGNsaWVudCBjb3VsZCBub3QgYmUgcXVlcmllZCBmb3IgZGF0YS4gSXQgY291bGQgYmUgaXQgaGFzbid0IHVucmVnaXN0ZXJlZCBpdHNlbGYgZnJvbSB0aGUgYnJva2VyLiBBcHBJZDogJHthcHAuYXBwSWR9LCBpbnN0YW5jZUlkOiAke2FwcC5pbnN0YW5jZUlkfSwgbmFtZTogJHtpZGVudGl0eS5uYW1lfWAsXG5cdFx0XHRcdFx0XHRcdFx0XHRlcnJvclxuXHRcdFx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0aWYgKCFpc0VtcHR5KHRpdGxlKSkge1xuXHRcdFx0XHRcdFx0XHRcdC8vIGVuc3VyZSBubyBlbGVtZW50IHRhZ3MgYXJlIHByb3ZpZGVkIGluIHRoZSB0aXRsZVxuXHRcdFx0XHRcdFx0XHRcdC8vIHdlIGRvbid0IGtub3cgaG93IHRoaXMgaW5mb3JtYXRpb24gd2lsbCBiZSB1c2VkXG5cdFx0XHRcdFx0XHRcdFx0Ly8gYW5kIHRpdGxlIGhhc24ndCBjb21lIGZyb20gdGhlIGFwcCBkaXJlY3Rvcnlcblx0XHRcdFx0XHRcdFx0XHR0aXRsZSA9IHNhbml0aXplU3RyaW5nKHRpdGxlKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRjb25zdCBpbnN0YW5jZUFwcE1ldGE6IEFwcE1ldGFkYXRhID0ge1xuXHRcdFx0XHRcdFx0XHRcdC4uLmFwcE1ldGFEYXRhLFxuXHRcdFx0XHRcdFx0XHRcdGluc3RhbmNlSWQ6IGFwcC5pbnN0YW5jZUlkLFxuXHRcdFx0XHRcdFx0XHRcdGluc3RhbmNlTWV0YWRhdGE6IHsgdGl0bGUsIHByZXZpZXcgfVxuXHRcdFx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gaW5zdGFuY2VBcHBNZXRhO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRyZXR1cm4gYXBwTWV0YURhdGE7XG5cdFx0XHRcdH1cblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiVGFyZ2V0QXBwVW5hdmFpbGFibGVcIik7XG5cdFx0XHR9XG5cblx0XHRcdC8qKlxuXHRcdFx0ICogSGFuZGxlIHRoZSByZXF1ZXN0IHRvIGdldCBGREMzIGluZm8uXG5cdFx0XHQgKiBAcGFyYW0gcGF5bG9hZCBUaGUgcGF5bG9hZC5cblx0XHRcdCAqIEBwYXJhbSBwYXlsb2FkLmZkYzNWZXJzaW9uIFRoZSB2ZXJzaW9uIGluZm8gdG8gZ2V0LlxuXHRcdFx0ICogQHBhcmFtIGNsaWVudElkZW50aXR5IFRoZSBjbGllbnQgaWRlbnRpdHkuXG5cdFx0XHQgKiBAcmV0dXJucyBUaGUgaW5mby5cblx0XHRcdCAqL1xuXHRcdFx0cHVibGljIGFzeW5jIGZkYzNIYW5kbGVHZXRJbmZvKFxuXHRcdFx0XHRwYXlsb2FkOiB7XG5cdFx0XHRcdFx0ZmRjM1ZlcnNpb246IHN0cmluZztcblx0XHRcdFx0fSxcblx0XHRcdFx0Y2xpZW50SWRlbnRpdHk6IE9wZW5GaW4uQ2xpZW50SWRlbnRpdHlcblx0XHRcdCk6IFByb21pc2U8dW5rbm93bj4ge1xuXHRcdFx0XHRsb2dnZXIuaW5mbyhcImZkYzNIYW5kbGVHZXRJbmZvXCIsIHBheWxvYWQsIGNsaWVudElkZW50aXR5KTtcblx0XHRcdFx0aWYgKHBheWxvYWQ/LmZkYzNWZXJzaW9uID09PSBcIjIuMFwiKSB7XG5cdFx0XHRcdFx0Y29uc3QgcmVzcG9uc2U6IEltcGxlbWVudGF0aW9uTWV0YWRhdGEgPSAoYXdhaXQgc3VwZXIuZmRjM0hhbmRsZUdldEluZm8oXG5cdFx0XHRcdFx0XHRwYXlsb2FkLFxuXHRcdFx0XHRcdFx0Y2xpZW50SWRlbnRpdHlcblx0XHRcdFx0XHQpKSBhcyBJbXBsZW1lbnRhdGlvbk1ldGFkYXRhO1xuXHRcdFx0XHRcdGNvbnN0IGFwcElkID0gYXdhaXQgdGhpcy5sb29rdXBBcHBJZChjbGllbnRJZGVudGl0eSk7XG5cdFx0XHRcdFx0aWYgKCFpc0VtcHR5KGFwcElkKSkge1xuXHRcdFx0XHRcdFx0Y29uc3QgdXBkYXRlZFJlc3BvbnNlID0ge1xuXHRcdFx0XHRcdFx0XHQuLi5yZXNwb25zZSxcblx0XHRcdFx0XHRcdFx0YXBwTWV0YWRhdGE6IHsgYXBwSWQsIGluc3RhbmNlSWQ6IGNsaWVudElkZW50aXR5LmVuZHBvaW50SWQgfVxuXHRcdFx0XHRcdFx0fTtcblx0XHRcdFx0XHRcdHJldHVybiB1cGRhdGVkUmVzcG9uc2U7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHJldHVybiByZXNwb25zZTtcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gc3VwZXIuZmRjM0hhbmRsZUdldEluZm8ocGF5bG9hZCwgY2xpZW50SWRlbnRpdHkpO1xuXHRcdFx0fVxuXG5cdFx0XHQvKipcblx0XHRcdCAqIEhhbmRsZSBhbiBpbnRlbnQgaGFuZGxlciBiZWluZyByZWdpc3RlcmVkLlxuXHRcdFx0ICogQHBhcmFtIHBheWxvYWQgVGhlIHBheWxvYWQuXG5cdFx0XHQgKiBAcGFyYW0gY2xpZW50SWRlbnRpdHkgVGhlIGNsaWVudCBpZGVudGl0eS5cblx0XHRcdCAqIEByZXR1cm5zIE5vdGhpbmcuXG5cdFx0XHQgKi9cblx0XHRcdHB1YmxpYyBhc3luYyBpbnRlbnRIYW5kbGVyUmVnaXN0ZXJlZChcblx0XHRcdFx0cGF5bG9hZDogSW50ZW50UmVnaXN0cmF0aW9uUGF5bG9hZCxcblx0XHRcdFx0Y2xpZW50SWRlbnRpdHk6IE9wZW5GaW4uQ2xpZW50SWRlbnRpdHlcblx0XHRcdCk6IFByb21pc2U8dm9pZD4ge1xuXHRcdFx0XHRhd2FpdCB0aGlzLl9jbGllbnRSZWdpc3RyYXRpb25IZWxwZXIuaW50ZW50SGFuZGxlclJlZ2lzdGVyZWQocGF5bG9hZCwgY2xpZW50SWRlbnRpdHkpO1xuXHRcdFx0XHRhd2FpdCBzdXBlci5pbnRlbnRIYW5kbGVyUmVnaXN0ZXJlZChwYXlsb2FkLCBjbGllbnRJZGVudGl0eSk7XG5cdFx0XHR9XG5cblx0XHRcdC8qKlxuXHRcdFx0ICogQSBjb250ZXh0IGhhbmRsZXIgaGFzIGJlZW4gcmVnaXN0ZXJlZCBhZ2FpbnN0IHRoZSBicm9rZXIuXG5cdFx0XHQgKiBAcGFyYW0gcGF5bG9hZCBUaGUgcGF5bG9hZCBmcm9tIGEgY29udGV4dCBsaXN0ZW5lciByZWdpc3RyYXRpb24uXG5cdFx0XHQgKiBAcGFyYW0gcGF5bG9hZC5jb250ZXh0VHlwZSBUaGUgY29udGV4dCB0eXBlIHRoYXQgdGhlIGNsaWVudCBpcyBsaXN0ZW5pbmcgZm9yLlxuXHRcdFx0ICogQHBhcmFtIHBheWxvYWQuaGFuZGxlcklkIFRoZSBoYW5kbGVyIElkIGZvciB0aGlzIGxpc3RlbmVyLlxuXHRcdFx0ICogQHBhcmFtIGNsaWVudElkZW50aXR5IFRoZSBpZGVudGl0eSBvZiB0aGUgYXBwbGljYXRpb24gdGhhdCBpcyBhZGRpbmcgdGhlIGNvbnRleHQgaGFuZGxlci5cblx0XHRcdCAqL1xuXHRcdFx0cHVibGljIGFzeW5jIGNvbnRleHRIYW5kbGVyUmVnaXN0ZXJlZChcblx0XHRcdFx0cGF5bG9hZDogeyBjb250ZXh0VHlwZTogc3RyaW5nIHwgdW5kZWZpbmVkOyBoYW5kbGVySWQ6IHN0cmluZyB9LFxuXHRcdFx0XHRjbGllbnRJZGVudGl0eTogT3BlbkZpbi5DbGllbnRJZGVudGl0eVxuXHRcdFx0KTogUHJvbWlzZTx2b2lkPiB7XG5cdFx0XHRcdGF3YWl0IHRoaXMuX2NsaWVudFJlZ2lzdHJhdGlvbkhlbHBlci5jb250ZXh0SGFuZGxlclJlZ2lzdGVyZWQocGF5bG9hZCwgY2xpZW50SWRlbnRpdHkpO1xuXHRcdFx0XHRzdXBlci5jb250ZXh0SGFuZGxlclJlZ2lzdGVyZWQocGF5bG9hZCwgY2xpZW50SWRlbnRpdHkpO1xuXHRcdFx0fVxuXG5cdFx0XHQvKipcblx0XHRcdCAqIExhdW5jaCBhbiBhcHAgd2l0aCBpbnRlbnQuXG5cdFx0XHQgKiBAcGFyYW0gYXBwIFRoZSBhcHBsaWNhdGlvbiB0byBsYXVuY2guXG5cdFx0XHQgKiBAcGFyYW0gaW50ZW50IFRoZSBpbnRlbnQgdG8gb3BlbiBpdCB3aXRoLlxuXHRcdFx0ICogQHBhcmFtIGluc3RhbmNlSWQgVGhlIGluc3RhbmNlIG9mIHRoZSBhcHAuXG5cdFx0XHQgKiBAcGFyYW0gY2xpZW50SWRlbnRpdHkgVGhlIGlkZW50aXR5IG9mIHRoZSBzb3VyY2Ugb2YgdGhlIHJlcXVlc3QuXG5cdFx0XHQgKiBAcmV0dXJucyBUaGUgaW50ZW50IHJlc29sdXRpb24uXG5cdFx0XHQgKi9cblx0XHRcdHByaXZhdGUgYXN5bmMgbGF1bmNoQXBwV2l0aEludGVudChcblx0XHRcdFx0YXBwOiBQbGF0Zm9ybUFwcCxcblx0XHRcdFx0aW50ZW50OiBPcGVuRmluLkludGVudCxcblx0XHRcdFx0aW5zdGFuY2VJZD86IHN0cmluZyxcblx0XHRcdFx0Y2xpZW50SWRlbnRpdHk/OiBPcGVuRmluLkNsaWVudElkZW50aXR5XG5cdFx0XHQpOiBQcm9taXNlPE9taXQ8SW50ZW50UmVzb2x1dGlvbiwgXCJnZXRSZXN1bHRcIj4+IHtcblx0XHRcdFx0bG9nZ2VyLmluZm8oXCJMYXVuY2hpbmcgYXBwIHdpdGggaW50ZW50XCIpO1xuXHRcdFx0XHRsZXQgcGxhdGZvcm1JZGVudGl0aWVzOiBQbGF0Zm9ybUFwcElkZW50aWZpZXJbXSB8IHVuZGVmaW5lZCA9IFtdO1xuXHRcdFx0XHRsZXQgZXhpc3RpbmdJbnN0YW5jZSA9IHRydWU7XG5cdFx0XHRcdGxldCBjb250ZXh0TWV0YWRhdGE6IENvbnRleHRNZXRhZGF0YSB8IHVuZGVmaW5lZDtcblxuXHRcdFx0XHRpZiAoIWlzRW1wdHkoaW50ZW50Py5jb250ZXh0KSkge1xuXHRcdFx0XHRcdGludGVudC5jb250ZXh0ID0gYXdhaXQgdGhpcy5wcm9jZXNzQ29udGV4dChpbnRlbnQuY29udGV4dCk7XG5cdFx0XHRcdFx0aWYgKCFpc0VtcHR5KGNsaWVudElkZW50aXR5KSkge1xuXHRcdFx0XHRcdFx0Y29udGV4dE1ldGFkYXRhID0gYXdhaXQgdGhpcy5nZXRDb250ZXh0TWV0YWRhdGEoY2xpZW50SWRlbnRpdHkpO1xuXHRcdFx0XHRcdFx0aW50ZW50LmNvbnRleHQgPSB7IC4uLmludGVudC5jb250ZXh0LCBbdGhpcy5fbWV0YWRhdGFLZXldOiBjb250ZXh0TWV0YWRhdGEgfTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAoIWlzRW1wdHkoaW5zdGFuY2VJZCkpIHtcblx0XHRcdFx0XHQvLyBhbiBpbnN0YW5jZSBvZiBhbiBhcHBsaWNhdGlvbiB3YXMgc2VsZWN0ZWRcblx0XHRcdFx0XHRjb25zdCBhbGxDb25uZWN0ZWRDbGllbnRzID0gYXdhaXQgdGhpcy5nZXRBbGxDbGllbnRJbmZvKCk7XG5cdFx0XHRcdFx0Y29uc3QgY2xpZW50SW5mbyA9IGFsbENvbm5lY3RlZENsaWVudHMuZmluZChcblx0XHRcdFx0XHRcdChjb25uZWN0ZWRDbGllbnQpID0+IGNvbm5lY3RlZENsaWVudC5lbmRwb2ludElkID09PSBpbnN0YW5jZUlkXG5cdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRpZiAoIWlzRW1wdHkoY2xpZW50SW5mbykpIHtcblx0XHRcdFx0XHRcdGxvZ2dlci5pbmZvKGBBcHAgSWQ6ICR7YXBwLmFwcElkfSBhbmQgaW5zdGFuY2UgSWQ6ICR7aW5zdGFuY2VJZH0gd2FzIHByb3ZpZGVkIGFuZCBmb3VuZC5gKTtcblx0XHRcdFx0XHRcdC8vIHRoZSBjb25uZWN0ZWQgaW5zdGFuY2UgaXMgYXZhaWxhYmxlXG5cdFx0XHRcdFx0XHRwbGF0Zm9ybUlkZW50aXRpZXMucHVzaCh7XG5cdFx0XHRcdFx0XHRcdHV1aWQ6IGNsaWVudEluZm8udXVpZCxcblx0XHRcdFx0XHRcdFx0bmFtZTogY2xpZW50SW5mby5uYW1lLFxuXHRcdFx0XHRcdFx0XHRhcHBJZDogYXBwLmFwcElkLFxuXHRcdFx0XHRcdFx0XHRpbnN0YW5jZUlkOiBjbGllbnRJbmZvLmVuZHBvaW50SWRcblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoUmVzb2x2ZUVycm9yLlRhcmdldEluc3RhbmNlVW5hdmFpbGFibGUpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmIChwbGF0Zm9ybUlkZW50aXRpZXMubGVuZ3RoID09PSAwKSB7XG5cdFx0XHRcdFx0bGV0IGxhdW5jaFByZWZlcmVuY2U6IExhdW5jaFByZWZlcmVuY2UgfCB1bmRlZmluZWQ7XG5cdFx0XHRcdFx0Y29uc3QgYm91bmRzID0gYXdhaXQgZ2V0V2luZG93UG9zaXRpb25Vc2luZ1N0cmF0ZWd5KG9wdGlvbnMud2luZG93UG9zaXRpb25PcHRpb25zLCBjbGllbnRJZGVudGl0eSk7XG5cdFx0XHRcdFx0aWYgKCFpc0VtcHR5KGJvdW5kcykpIHtcblx0XHRcdFx0XHRcdGxhdW5jaFByZWZlcmVuY2UgPSB7IGJvdW5kcyB9O1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRwbGF0Zm9ybUlkZW50aXRpZXMgPSBhd2FpdCBsYXVuY2goYXBwLmFwcElkLCBsYXVuY2hQcmVmZXJlbmNlKTtcblx0XHRcdFx0XHRpZiAoIXBsYXRmb3JtSWRlbnRpdGllcz8ubGVuZ3RoKSB7XG5cdFx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoUmVzb2x2ZUVycm9yLkludGVudERlbGl2ZXJ5RmFpbGVkKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0ZXhpc3RpbmdJbnN0YW5jZSA9IGZhbHNlO1xuXHRcdFx0XHRcdGlmIChwbGF0Zm9ybUlkZW50aXRpZXMubGVuZ3RoID09PSAxKSB7XG5cdFx0XHRcdFx0XHRjb25zdCBpbnRlbnRUaW1lb3V0OiBudW1iZXIgfCB1bmRlZmluZWQgPSBvcHRpb25zPy5pbnRlbnRPcHRpb25zPy5pbnRlbnRUaW1lb3V0O1xuXHRcdFx0XHRcdFx0Ly8gaWYgd2UgaGF2ZSBhIHNuYXBzaG90IGFuZCBtdWx0aXBsZSBpZGVudGl0aWVzIHdlIHdpbGwgbm90IHdhaXQgYXMgbm90IGFsbCBvZiB0aGVtIG1pZ2h0IG5vdCBzdXBwb3J0IGludGVudHMuXG5cdFx0XHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdFx0XHRpbnN0YW5jZUlkID0gYXdhaXQgdGhpcy5fY2xpZW50UmVnaXN0cmF0aW9uSGVscGVyLm9uSW50ZW50Q2xpZW50UmVhZHkoXG5cdFx0XHRcdFx0XHRcdFx0cGxhdGZvcm1JZGVudGl0aWVzWzBdLFxuXHRcdFx0XHRcdFx0XHRcdGludGVudC5uYW1lLFxuXHRcdFx0XHRcdFx0XHRcdGludGVudFRpbWVvdXRcblx0XHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRcdH0gY2F0Y2ggKGludGVudFJlYWR5RXJyb3IpIHtcblx0XHRcdFx0XHRcdFx0bG9nZ2VyLndhcm4oXG5cdFx0XHRcdFx0XHRcdFx0XCJBbiBlcnJvciBvY2N1cnJlZCB3aGlsZSBnZXR0aW5nIGEgaW5zdGFuY2UgdG8gdGFyZ2V0IGFuIGludGVudCBhdC5cIixcblx0XHRcdFx0XHRcdFx0XHRpbnRlbnRSZWFkeUVycm9yXG5cdFx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcihSZXNvbHZlRXJyb3IuSW50ZW50RGVsaXZlcnlGYWlsZWQpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdGZvciAoY29uc3QgdGFyZ2V0IG9mIHBsYXRmb3JtSWRlbnRpdGllcykge1xuXHRcdFx0XHRcdGF3YWl0IHN1cGVyLnNldEludGVudFRhcmdldChpbnRlbnQsIHRhcmdldCk7XG5cdFx0XHRcdFx0aWYgKGV4aXN0aW5nSW5zdGFuY2UpIHtcblx0XHRcdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0XHRcdGlmIChoZWxwZXJzLmJyaW5nQXBwVG9Gcm9udCkge1xuXHRcdFx0XHRcdFx0XHRcdGF3YWl0IGhlbHBlcnMuYnJpbmdBcHBUb0Zyb250KGFwcCwgW3RhcmdldF0pO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9IGNhdGNoIChicmluZ1RvRnJvbnRFcnJvcikge1xuXHRcdFx0XHRcdFx0XHRsb2dnZXIud2Fybihcblx0XHRcdFx0XHRcdFx0XHRgVGhlcmUgd2FzIGFuIGVycm9yIGJyaW5naW5nIGFwcDogJHt0YXJnZXQuYXBwSWR9LCBhbmQgaW5zdGFuY2UgJHt0YXJnZXQuaW5zdGFuY2VJZH0gd2l0aCBuYW1lOiAke3RhcmdldC5uYW1lfSB0byBmcm9udC5gLFxuXHRcdFx0XHRcdFx0XHRcdGJyaW5nVG9Gcm9udEVycm9yXG5cdFx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0XHRzb3VyY2U6IHsgYXBwSWQ6IGFwcC5hcHBJZCwgaW5zdGFuY2VJZCB9LFxuXHRcdFx0XHRcdHZlcnNpb246IGFwcC52ZXJzaW9uLFxuXHRcdFx0XHRcdGludGVudDogaW50ZW50Lm5hbWVcblx0XHRcdFx0fTtcblx0XHRcdH1cblxuXHRcdFx0LyoqXG5cdFx0XHQgKiBIYW5kbGUgdGhlIGludGVudCBwaWNrZXIgc2VsZWN0aW9uLlxuXHRcdFx0ICogQHBhcmFtIHVzZXJTZWxlY3Rpb24gVGhlIHVzZXIgc2VsZWN0aW9uIGZyb20gdGhlIGludGVudCBwaWNrZXIuXG5cdFx0XHQgKiBAcGFyYW0gaW50ZW50IFRoZSBpbnRlbnQuXG5cdFx0XHQgKiBAcGFyYW0gY2xpZW50SWRlbnRpdHkgVGhlIHNvdXJjZSBvZiB0aGUgcmVxdWVzdC5cblx0XHRcdCAqIEByZXR1cm5zIFRoZSBpbnRlbnQgcmVzb2x1dGlvbi5cblx0XHRcdCAqL1xuXHRcdFx0cHJpdmF0ZSBhc3luYyBoYW5kbGVJbnRlbnRQaWNrZXJTZWxlY3Rpb24oXG5cdFx0XHRcdHVzZXJTZWxlY3Rpb246IEludGVudFJlc29sdmVyUmVzcG9uc2UsXG5cdFx0XHRcdGludGVudDogT3BlbkZpbi5JbnRlbnQ8T3BlbkZpbi5JbnRlbnRNZXRhZGF0YTxJbnRlbnRUYXJnZXRNZXRhRGF0YT4+LFxuXHRcdFx0XHRjbGllbnRJZGVudGl0eT86IE9wZW5GaW4uQ2xpZW50SWRlbnRpdHlcblx0XHRcdCk6IFByb21pc2U8T21pdDxJbnRlbnRSZXNvbHV0aW9uLCBcImdldFJlc3VsdFwiPj4ge1xuXHRcdFx0XHRsZXQgc2VsZWN0ZWRBcHAgPSBhd2FpdCBnZXRBcHAodXNlclNlbGVjdGlvbi5hcHBJZCk7XG5cdFx0XHRcdGlmIChpc0VtcHR5KHNlbGVjdGVkQXBwKSAmJiAhaXNFbXB0eSh0aGlzLl91bnJlZ2lzdGVyZWRBcHApKSB7XG5cdFx0XHRcdFx0c2VsZWN0ZWRBcHAgPSB0aGlzLl91bnJlZ2lzdGVyZWRBcHA7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKGlzRW1wdHkoc2VsZWN0ZWRBcHApKSB7XG5cdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKFJlc29sdmVFcnJvci5Ob0FwcHNGb3VuZCk7XG5cdFx0XHRcdH1cblx0XHRcdFx0Y29uc3QgaW5zdGFuY2VJZDogc3RyaW5nIHwgdW5kZWZpbmVkID0gdXNlclNlbGVjdGlvbi5pbnN0YW5jZUlkO1xuXHRcdFx0XHRjb25zdCBpbnRlbnRSZXNvbHZlciA9IGF3YWl0IHRoaXMubGF1bmNoQXBwV2l0aEludGVudChcblx0XHRcdFx0XHRzZWxlY3RlZEFwcCxcblx0XHRcdFx0XHRpbnRlbnQsXG5cdFx0XHRcdFx0aW5zdGFuY2VJZCxcblx0XHRcdFx0XHRjbGllbnRJZGVudGl0eVxuXHRcdFx0XHQpO1xuXHRcdFx0XHRpZiAoaXNFbXB0eShpbnRlbnRSZXNvbHZlcikpIHtcblx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoUmVzb2x2ZUVycm9yLk5vQXBwc0ZvdW5kKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gaW50ZW50UmVzb2x2ZXI7XG5cdFx0XHR9XG5cblx0XHRcdC8qKlxuXHRcdFx0ICogSGFuZGxlIGEgdGFyZ2V0ZWQgaW50ZW50LlxuXHRcdFx0ICogQHBhcmFtIHRhcmdldEFwcElkZW50aWZpZXIgVGhlIGlkZW50aWZpZXIgZm9yIHRoZSB0YXJnZXQgYXBwLlxuXHRcdFx0ICogQHBhcmFtIGludGVudCBUaGUgaW50ZW50LlxuXHRcdFx0ICogQHBhcmFtIHRhcmdldEJ5Q29udGV4dCBQZXJmb3JtIHRoZSB0YXJnZXQgYnkgY29udGV4dC5cblx0XHRcdCAqIEBwYXJhbSBjbGllbnRJZGVudGl0eSBUaGUgY2xpZW50IGlkZW50aXR5LlxuXHRcdFx0ICogQHJldHVybnMgVGhlIGludGVudCByZXNvbHV0aW9uLlxuXHRcdFx0ICovXG5cdFx0XHRwcml2YXRlIGFzeW5jIGhhbmRsZVRhcmdldGVkSW50ZW50KFxuXHRcdFx0XHR0YXJnZXRBcHBJZGVudGlmaWVyOiBBcHBJZGVudGlmaWVyLFxuXHRcdFx0XHRpbnRlbnQ6IE9wZW5GaW4uSW50ZW50LFxuXHRcdFx0XHR0YXJnZXRCeUNvbnRleHQ6IGJvb2xlYW4sXG5cdFx0XHRcdGNsaWVudElkZW50aXR5OiBPcGVuRmluLkNsaWVudElkZW50aXR5XG5cdFx0XHQpOiBQcm9taXNlPE9taXQ8SW50ZW50UmVzb2x1dGlvbiwgXCJnZXRSZXN1bHRcIj4+IHtcblx0XHRcdFx0Ly8gYXBwIHNwZWNpZmllZCBmbG93XG5cdFx0XHRcdGNvbnN0IGludGVudHNGb3JTZWxlY3Rpb246IEFwcHNGb3JJbnRlbnRbXSA9IFtdO1xuXHRcdFx0XHRsZXQgdGFyZ2V0QXBwID0gYXdhaXQgZ2V0QXBwKHRhcmdldEFwcElkZW50aWZpZXIuYXBwSWQpO1xuXG5cdFx0XHRcdC8vIGlmIHRoZSBzcGVjaWZpZWQgYXBwIGlzbid0IGF2YWlsYWJsZSB0aGVuIGxldCB0aGUgY2FsbGVyIGtub3dcblx0XHRcdFx0aWYgKGlzRW1wdHkodGFyZ2V0QXBwKSkge1xuXHRcdFx0XHRcdGlmIChcblx0XHRcdFx0XHRcdCFpc0VtcHR5KHRhcmdldEFwcElkZW50aWZpZXIuaW5zdGFuY2VJZCkgJiZcblx0XHRcdFx0XHRcdHRhcmdldEFwcElkZW50aWZpZXIuYXBwSWQgPT09IHRoaXMuX3VucmVnaXN0ZXJlZEFwcD8uYXBwSWRcblx0XHRcdFx0XHQpIHtcblx0XHRcdFx0XHRcdHRhcmdldEFwcCA9IHRoaXMuX3VucmVnaXN0ZXJlZEFwcDtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKFJlc29sdmVFcnJvci5UYXJnZXRBcHBVbmF2YWlsYWJsZSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdC8vIGlmIGFuIGluc3RhbmNlSWQgaXMgc3BlY2lmaWVkIHRoZW4gY2hlY2sgdG8gc2VlIGlmIGl0IGlzIHZhbGlkIGFuZCBpZiBpdCBpc24ndCBpbmZvcm0gdGhlIGNhbGxlclxuXHRcdFx0XHRpZiAoIWlzRW1wdHkodGFyZ2V0QXBwSWRlbnRpZmllci5pbnN0YW5jZUlkKSkge1xuXHRcdFx0XHRcdGNvbnN0IGF2YWlsYWJsZUFwcEluc3RhbmNlcyA9IGF3YWl0IHRoaXMuX2NsaWVudFJlZ2lzdHJhdGlvbkhlbHBlci5maW5kQXBwSW5zdGFuY2VzKFxuXHRcdFx0XHRcdFx0dGFyZ2V0QXBwSWRlbnRpZmllcixcblx0XHRcdFx0XHRcdGNsaWVudElkZW50aXR5LFxuXHRcdFx0XHRcdFx0XCJpbnRlbnRcIlxuXHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0aWYgKFxuXHRcdFx0XHRcdFx0YXZhaWxhYmxlQXBwSW5zdGFuY2VzLmxlbmd0aCA9PT0gMCB8fFxuXHRcdFx0XHRcdFx0IWF2YWlsYWJsZUFwcEluc3RhbmNlcy5zb21lKFxuXHRcdFx0XHRcdFx0XHQoZW50cnkpID0+XG5cdFx0XHRcdFx0XHRcdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG1heC1sZW5cblx0XHRcdFx0XHRcdFx0XHRlbnRyeS5hcHBJZCA9PT0gdGFyZ2V0QXBwSWRlbnRpZmllci5hcHBJZCAmJlxuXHRcdFx0XHRcdFx0XHRcdGVudHJ5Lmluc3RhbmNlSWQgPT09IHRhcmdldEFwcElkZW50aWZpZXIuaW5zdGFuY2VJZFxuXHRcdFx0XHRcdFx0KVxuXHRcdFx0XHRcdCkge1xuXHRcdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKFJlc29sdmVFcnJvci5UYXJnZXRJbnN0YW5jZVVuYXZhaWxhYmxlKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAoIUFycmF5LmlzQXJyYXkodGFyZ2V0QXBwLmludGVudHMpIHx8IHRhcmdldEFwcC5pbnRlbnRzLmxlbmd0aCA9PT0gMCkge1xuXHRcdFx0XHRcdC8vIGFuIGFwcCB3YXMgc3BlY2lmaWVkIGJ1dCBpdCBkb2Vzbid0IGhhdmUgYW55IGludGVudHMuIEluZGljYXRlIHRoYXQgc29tZXRoaW5nIGlzIHdyb25nXG5cdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKFJlc29sdmVFcnJvci5UYXJnZXRBcHBVbmF2YWlsYWJsZSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRjb25zdCBzdXBwb3J0ZWRJbnRlbnRzID0gdGFyZ2V0QXBwLmludGVudHMuZmlsdGVyKChpbnRlbnRFbnRyeSkgPT4ge1xuXHRcdFx0XHRcdGxldCBjb250ZXh0TWF0Y2g6IGJvb2xlYW4gPSB0cnVlO1xuXHRcdFx0XHRcdGNvbnN0IGNvbnRleHRUeXBlID0gaW50ZW50LmNvbnRleHQ/LnR5cGU7XG5cdFx0XHRcdFx0aWYgKCFpc0VtcHR5KGNvbnRleHRUeXBlKSkge1xuXHRcdFx0XHRcdFx0Y29udGV4dE1hdGNoID0gaW50ZW50RW50cnkuY29udGV4dHM/LmluY2x1ZGVzKGNvbnRleHRUeXBlKTtcblx0XHRcdFx0XHRcdGlmICh0YXJnZXRCeUNvbnRleHQpIHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIGNvbnRleHRNYXRjaDtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0cmV0dXJuIGludGVudEVudHJ5Lm5hbWUgPT09IGludGVudC5uYW1lICYmIGNvbnRleHRNYXRjaDtcblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0aWYgKHN1cHBvcnRlZEludGVudHMubGVuZ3RoID09PSAwKSB7XG5cdFx0XHRcdFx0Ly8gdGhlIHNwZWNpZmllZCBhcHAgZG9lcyBoYXZlIGludGVudCBzdXBwb3J0IGJ1dCBqdXN0IG5vbmUgdGhhdCBzdXBwb3J0IHRoaXMgY29udGV4dCB0eXBlXG5cdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKFJlc29sdmVFcnJvci5UYXJnZXRBcHBVbmF2YWlsYWJsZSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAoc3VwcG9ydGVkSW50ZW50cy5sZW5ndGggPT09IDEpIHtcblx0XHRcdFx0XHQvLyBhIHByZWZlcnJlZCBuYW1lIGZvciBhbiBhcHAgd2FzIGdpdmVuIHdpdGggdGhlIGNvbnRleHQgb2JqZWN0XG5cdFx0XHRcdFx0Ly8gdGhlIGFwcCBleGlzdGVkIGFuZCBpdCBzdXBwb3J0ZWQgdGhlIGNvbnRleHQgdHlwZSBhbmQgdGhlcmUgd2FzIG9ubHkgb25lIGludGVudCB0aGF0IHN1cHBvcnRlZFxuXHRcdFx0XHRcdC8vIHRoYXQgY29udGV4dCB0eXBlLiBMYXVuY2ggdGhlIGFwcCB3aXRoIHRoYXQgaW50ZW50IG90aGVyd2lzZSBwcmVzZW50IHRoZSB1c2VyIHdpdGggYSBsaXN0IG9mXG5cdFx0XHRcdFx0Ly8gZXZlcnl0aGluZyB0aGF0IHN1cHBvcnRzIHRoYXQgY29udGV4dCB0eXBlXG5cdFx0XHRcdFx0aW50ZW50Lm5hbWUgPSBzdXBwb3J0ZWRJbnRlbnRzWzBdLm5hbWU7XG5cdFx0XHRcdFx0Ly8gY2hlY2sgZm9yIGluc3RhbmNlc1xuXHRcdFx0XHRcdGlmICghaXNFbXB0eSh0YXJnZXRBcHBJZGVudGlmaWVyLmluc3RhbmNlSWQpKSB7XG5cdFx0XHRcdFx0XHRjb25zdCBpbnRlbnRSZXNvbHZlciA9IGF3YWl0IHRoaXMubGF1bmNoQXBwV2l0aEludGVudChcblx0XHRcdFx0XHRcdFx0dGFyZ2V0QXBwLFxuXHRcdFx0XHRcdFx0XHRpbnRlbnQsXG5cdFx0XHRcdFx0XHRcdHRhcmdldEFwcElkZW50aWZpZXIuaW5zdGFuY2VJZCxcblx0XHRcdFx0XHRcdFx0Y2xpZW50SWRlbnRpdHlcblx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0XHRyZXR1cm4gaW50ZW50UmVzb2x2ZXI7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGNvbnN0IHNwZWNpZmllZEFwcEluc3RhbmNlcyA9IGF3YWl0IHRoaXMuX2NsaWVudFJlZ2lzdHJhdGlvbkhlbHBlci5maW5kQXBwSW5zdGFuY2VzKFxuXHRcdFx0XHRcdFx0dGFyZ2V0QXBwLFxuXHRcdFx0XHRcdFx0Y2xpZW50SWRlbnRpdHksXG5cdFx0XHRcdFx0XHRcImludGVudFwiXG5cdFx0XHRcdFx0KTtcblx0XHRcdFx0XHQvLyB0aGUgbGF1bmNoIGxvZ2ljIGlzIHNpbmdsZSBpbnN0YW5jZSBhd2FyZSBidXQgY2FuIGFsc28gYnJpbmcgY29udGVudCB0byBmcm9udCB3aGVyZSBwb3NzaWJsZVxuXHRcdFx0XHRcdC8vIHRoaXMgd2lsbCBsZXQgdGhlIGNvbnRleHQgYmUgc2V0IGFuZCB0aGUgY29udGVudCBicm91Z2h0IHRvIGZyb250LlxuXHRcdFx0XHRcdGNvbnN0IGxhdW5jaFNpbmdsZUluc3RhbmNlQXBwID1cblx0XHRcdFx0XHRcdHNwZWNpZmllZEFwcEluc3RhbmNlcy5sZW5ndGggPT09IDEgJiYgdGhpcy51c2VTaW5nbGVJbnN0YW5jZSh0YXJnZXRBcHApO1xuXG5cdFx0XHRcdFx0aWYgKFxuXHRcdFx0XHRcdFx0c3BlY2lmaWVkQXBwSW5zdGFuY2VzLmxlbmd0aCA9PT0gMCB8fFxuXHRcdFx0XHRcdFx0dGhpcy5jcmVhdGVOZXdJbnN0YW5jZSh0YXJnZXRBcHApIHx8XG5cdFx0XHRcdFx0XHRsYXVuY2hTaW5nbGVJbnN0YW5jZUFwcFxuXHRcdFx0XHRcdCkge1xuXHRcdFx0XHRcdFx0Y29uc3QgaW50ZW50UmVzb2x2ZXIgPSBhd2FpdCB0aGlzLmxhdW5jaEFwcFdpdGhJbnRlbnQoXG5cdFx0XHRcdFx0XHRcdHRhcmdldEFwcCxcblx0XHRcdFx0XHRcdFx0aW50ZW50LFxuXHRcdFx0XHRcdFx0XHR1bmRlZmluZWQsXG5cdFx0XHRcdFx0XHRcdGNsaWVudElkZW50aXR5XG5cdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdFx0aWYgKGlzRW1wdHkoaW50ZW50UmVzb2x2ZXIpKSB7XG5cdFx0XHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcihSZXNvbHZlRXJyb3IuSW50ZW50RGVsaXZlcnlGYWlsZWQpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0cmV0dXJuIGludGVudFJlc29sdmVyO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdGZvciAoY29uc3Qgc3VwcG9ydGVkSW50ZW50IG9mIHN1cHBvcnRlZEludGVudHMpIHtcblx0XHRcdFx0XHRjb25zdCBhcHBGb3JJbnRlbnQ6IEFwcHNGb3JJbnRlbnQgPSB7XG5cdFx0XHRcdFx0XHRhcHBzOiBbdGFyZ2V0QXBwXSxcblx0XHRcdFx0XHRcdGludGVudDogeyBuYW1lOiBzdXBwb3J0ZWRJbnRlbnQubmFtZSwgZGlzcGxheU5hbWU6IHN1cHBvcnRlZEludGVudC5kaXNwbGF5TmFtZSB9XG5cdFx0XHRcdFx0fTtcblx0XHRcdFx0XHRpbnRlbnRzRm9yU2VsZWN0aW9uLnB1c2goYXBwRm9ySW50ZW50KTtcblx0XHRcdFx0fVxuXHRcdFx0XHRsZXQgdXNlclNlbGVjdGlvbjogSW50ZW50UmVzb2x2ZXJSZXNwb25zZSB8IHVuZGVmaW5lZDtcblx0XHRcdFx0aWYgKGludGVudHNGb3JTZWxlY3Rpb24ubGVuZ3RoID09PSAxKSB7XG5cdFx0XHRcdFx0aWYgKFxuXHRcdFx0XHRcdFx0IWlzU3RyaW5nVmFsdWUoaW50ZW50Lm5hbWUpICYmXG5cdFx0XHRcdFx0XHQhaXNFbXB0eShpbnRlbnRzRm9yU2VsZWN0aW9uWzBdPy5pbnRlbnQ/Lm5hbWUpICYmXG5cdFx0XHRcdFx0XHQhaXNFbXB0eShpbnRlbnQ/LmNvbnRleHQpICYmXG5cdFx0XHRcdFx0XHQhaXNFbXB0eShpbnRlbnQ/LmNvbnRleHQ/LnR5cGUpXG5cdFx0XHRcdFx0KSB7XG5cdFx0XHRcdFx0XHRsb2dnZXIuaW5mbyhcblx0XHRcdFx0XHRcdFx0YEEgcmVxdWVzdCB0byByYWlzZSBhbiBpbnRlbnQgd2FzIHBhc3NlZCBhbmQgdGhlIGludGVudCBuYW1lIHdhcyBub3QgcGFzc2VkIGJ1dCBhIGNvbnRleHQgd2FzICR7aW50ZW50Py5jb250ZXh0Py50eXBlfSB3aXRoIDEgbWF0Y2hpbmcgaW50ZW50LiBOYW1lOiAke2ludGVudHNGb3JTZWxlY3Rpb25bMF0/LmludGVudD8ubmFtZX0sICBEaXNwbGF5IE5hbWU6ICR7aW50ZW50c0ZvclNlbGVjdGlvblswXT8uaW50ZW50Py5kaXNwbGF5TmFtZX0uIFVwZGF0aW5nIGludGVudCBvYmplY3QuYFxuXHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRcdGludGVudC5uYW1lID0gaW50ZW50c0ZvclNlbGVjdGlvblswXT8uaW50ZW50Py5uYW1lO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHR1c2VyU2VsZWN0aW9uID0gYXdhaXQgdGhpcy5faW50ZW50UmVzb2x2ZXJIZWxwZXI/LmxhdW5jaEludGVudFJlc29sdmVyKFxuXHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRhcHBzOiBpbnRlbnRzRm9yU2VsZWN0aW9uWzBdLmFwcHMsXG5cdFx0XHRcdFx0XHRcdGludGVudFxuXHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdGNsaWVudElkZW50aXR5XG5cdFx0XHRcdFx0KTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHR1c2VyU2VsZWN0aW9uID0gYXdhaXQgdGhpcy5faW50ZW50UmVzb2x2ZXJIZWxwZXI/LmxhdW5jaEludGVudFJlc29sdmVyKFxuXHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRpbnRlbnQsXG5cdFx0XHRcdFx0XHRcdGludGVudHM6IGludGVudHNGb3JTZWxlY3Rpb25cblx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRjbGllbnRJZGVudGl0eVxuXHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0aWYgKCFpc1N0cmluZ1ZhbHVlKGludGVudC5uYW1lKSAmJiAhaXNFbXB0eSh1c2VyU2VsZWN0aW9uPy5pbnRlbnQ/Lm5hbWUpKSB7XG5cdFx0XHRcdFx0XHRsb2dnZXIuaW5mbyhcblx0XHRcdFx0XHRcdFx0YEEgcmVxdWVzdCB0byByYWlzZSBhbiBpbnRlbnQgd2FzIHBhc3NlZCBhbmQgdGhlIGZvbGxvd2luZyBpbnRlbnQgd2FzIHNlbGVjdGVkIChmcm9tIGEgc2VsZWN0aW9uIG9mICR7aW50ZW50c0ZvclNlbGVjdGlvbi5sZW5ndGh9KS4gTmFtZTogJHt1c2VyU2VsZWN0aW9uPy5pbnRlbnQ/Lm5hbWV9LCAgRGlzcGxheSBOYW1lOiAke3VzZXJTZWxlY3Rpb24/LmludGVudD8uZGlzcGxheU5hbWV9LiBVcGRhdGluZyBpbnRlbnQgb2JqZWN0LmBcblx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0XHRpbnRlbnQubmFtZSA9IHVzZXJTZWxlY3Rpb24/LmludGVudD8ubmFtZSA/PyBpbnRlbnQubmFtZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKGlzRW1wdHkodXNlclNlbGVjdGlvbikpIHtcblx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoUmVzb2x2ZUVycm9yLlJlc29sdmVyVW5hdmFpbGFibGUpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuIHRoaXMuaGFuZGxlSW50ZW50UGlja2VyU2VsZWN0aW9uKHVzZXJTZWxlY3Rpb24sIGludGVudCwgY2xpZW50SWRlbnRpdHkpO1xuXHRcdFx0fVxuXG5cdFx0XHQvKipcblx0XHRcdCAqIFNoYXBlIHRoZSBpbnRlbnQgcmVzb2x2ZXIuXG5cdFx0XHQgKiBAcGFyYW0gaW50ZW50UmVzb2x2ZXIgVGhlIGludGVudCByZXNvbHZlciB0byBzaGFwZS5cblx0XHRcdCAqIEBwYXJhbSB1c2VzQXBwSWRlbnRpZmllciBTaG91bGQgaXQgdXNlIHRoZSBhcHAgaWRlbnRpZmllci5cblx0XHRcdCAqIEByZXR1cm5zIFRoZSBzaGFwZWQgaW50ZW50IHJlc29sdmVyLlxuXHRcdFx0ICovXG5cdFx0XHRwcml2YXRlIHNoYXBlSW50ZW50UmVzb2x2ZXIoXG5cdFx0XHRcdGludGVudFJlc29sdmVyOiBPbWl0PEludGVudFJlc29sdXRpb24sIFwiZ2V0UmVzdWx0XCI+LFxuXHRcdFx0XHR1c2VzQXBwSWRlbnRpZmllcjogYm9vbGVhblxuXHRcdFx0KTogT21pdDxJbnRlbnRSZXNvbHV0aW9uLCBcImdldFJlc3VsdFwiPiB8IHsgc291cmNlOiBzdHJpbmc7IHZlcnNpb24/OiBzdHJpbmcgfSB7XG5cdFx0XHRcdGlmICh1c2VzQXBwSWRlbnRpZmllcikge1xuXHRcdFx0XHRcdHJldHVybiBpbnRlbnRSZXNvbHZlcjtcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4geyBzb3VyY2U6IGludGVudFJlc29sdmVyLnNvdXJjZS5hcHBJZCwgdmVyc2lvbjogaW50ZW50UmVzb2x2ZXIudmVyc2lvbiB9O1xuXHRcdFx0fVxuXG5cdFx0XHQvKipcblx0XHRcdCAqIFNob3VsZCB3ZSB1c2UgYSBzaW5nbGUgaW5zdGFuY2Ugb2YgdGhlIGFwcC5cblx0XHRcdCAqIEBwYXJhbSBhcHAgVGhlIGFwcCB0byBjaGVjay5cblx0XHRcdCAqIEByZXR1cm5zIFRydWUgaWYgd2Ugc2hvdWxkIHVzZSBhIHNpbmdsZSBpbnN0YW5jZS5cblx0XHRcdCAqL1xuXHRcdFx0cHJpdmF0ZSB1c2VTaW5nbGVJbnN0YW5jZShhcHA6IFBsYXRmb3JtQXBwKTogYm9vbGVhbiB7XG5cdFx0XHRcdHJldHVybiBhcHA/Lmluc3RhbmNlTW9kZSA9PT0gXCJzaW5nbGVcIjtcblx0XHRcdH1cblxuXHRcdFx0LyoqXG5cdFx0XHQgKiBTaG91bGQgd2UgYWx3YXlzIHVzZSBhIG5ldyBpbnN0YW5jZSBvZiB0aGUgYXBwLlxuXHRcdFx0ICogQHBhcmFtIGFwcCBUaGUgYXBwIHRvIGNoZWNrLlxuXHRcdFx0ICogQHJldHVybnMgVHJ1ZSBpZiB3ZSBzaG91bGQgYWx3YXlzIHVzZSBhIG5ldyBpbnN0YW5jZS5cblx0XHRcdCAqL1xuXHRcdFx0cHJpdmF0ZSBjcmVhdGVOZXdJbnN0YW5jZShhcHA6IFBsYXRmb3JtQXBwKTogYm9vbGVhbiB7XG5cdFx0XHRcdHJldHVybiBhcHA/Lmluc3RhbmNlTW9kZSA9PT0gXCJuZXdcIjtcblx0XHRcdH1cblxuXHRcdFx0LyoqXG5cdFx0XHQgKiBHZXQgYSBwcmV2aWV3IGltYWdlIGZvciBhIHdpbmRvdy92aWV3LlxuXHRcdFx0ICogQHBhcmFtIHRhcmdldCBUaGUgdGFyZ2V0IGlkZW50aXR5IHRvIGNhcHR1cmUuXG5cdFx0XHQgKiBAcGFyYW0gdGFyZ2V0LmNhcHR1cmVQYWdlIFRoZSBjYXB0dXJlIHBhZ2UgbWV0aG9kIG9mIHRoZSBlbnRpdHkuXG5cdFx0XHQgKiBAcGFyYW0gdGFyZ2V0LmlkZW50aXR5IFRoZSBpZGVudGl0eSBvZiB0aGUgZW50aXR5IGJlaW5nIGNhcHR1cmVkLlxuXHRcdFx0ICogQHJldHVybnMgVGhlIGNhcHR1cmVkIHByZXZpZXcgaW1hZ2UuXG5cdFx0XHQgKi9cblx0XHRcdHByaXZhdGUgYXN5bmMgZ2V0UHJldmlld0ltYWdlKHRhcmdldDoge1xuXHRcdFx0XHRjYXB0dXJlUGFnZTogKG9wdGlvbnM/OiBPcGVuRmluLkNhcHR1cmVQYWdlT3B0aW9ucykgPT4gUHJvbWlzZTxzdHJpbmc+O1xuXHRcdFx0XHRpZGVudGl0eTogT3BlbkZpbi5JZGVudGl0eTtcblx0XHRcdH0pOiBQcm9taXNlPHN0cmluZyB8IHVuZGVmaW5lZD4ge1xuXHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdGNvbnN0IHByZXZpZXcgPSBhd2FpdCB0YXJnZXQuY2FwdHVyZVBhZ2UoeyBmb3JtYXQ6IFwianBnXCIsIHF1YWxpdHk6IDg1IH0pO1xuXHRcdFx0XHRcdGlmIChpc1N0cmluZ1ZhbHVlKHByZXZpZXcpKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gcHJldmlldztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0XHRcdFx0bG9nZ2VyLmVycm9yKFxuXHRcdFx0XHRcdFx0YEVycm9yIHdoaWxlIHRyeWluZyB0byBjYXB0dXJlIGEgcHJldmlldyBpbWFnZSBvZiB0aGUgdmlldy93aW5kb3c6ICR7dGFyZ2V0LmlkZW50aXR5Lm5hbWV9YCxcblx0XHRcdFx0XHRcdGVycm9yXG5cdFx0XHRcdFx0KTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHQvKipcblx0XHRcdCAqIEdldCB0aGUgdW5yZWdpc3RlcmVkIGFwcCBpbnRlbnQgYnkgY29udGV4dC5cblx0XHRcdCAqIEBwYXJhbSB0eXBlIFRoZSBjb250ZXh0IHR5cGUgdG8gZ2V0LlxuXHRcdFx0ICogQHBhcmFtIGNsaWVudElkZW50aXR5IFRoZSBjbGllbnQgaWRlbnRpdHkuXG5cdFx0XHQgKiBAcmV0dXJucyBUaGUgbGlzdCBvZiBzdXBwb3J0ZWQgaW50ZW50cy5cblx0XHRcdCAqL1xuXHRcdFx0cHJpdmF0ZSBhc3luYyBnZXRVbnJlZ2lzdGVyZWRBcHBJbnRlbnRCeUNvbnRleHQoXG5cdFx0XHRcdHR5cGU6IHN0cmluZyxcblx0XHRcdFx0Y2xpZW50SWRlbnRpdHk6IE9wZW5GaW4uQ2xpZW50SWRlbnRpdHlcblx0XHRcdCk6IFByb21pc2U8c3RyaW5nW10+IHtcblx0XHRcdFx0Y29uc3QgaW50ZW50TmFtZXM6IHN0cmluZ1tdID0gW107XG5cdFx0XHRcdGNvbnN0IHN1cHBvcnRlZEludGVudE5hbWVzOiBzdHJpbmdbXSA9IFtdO1xuXHRcdFx0XHRpZiAoaXNFbXB0eSh0aGlzPy5fdW5yZWdpc3RlcmVkQXBwKSkge1xuXHRcdFx0XHRcdHJldHVybiBpbnRlbnROYW1lcztcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAoQXJyYXkuaXNBcnJheSh0aGlzPy5fdW5yZWdpc3RlcmVkQXBwPy5pbnRlbnRzKSkge1xuXHRcdFx0XHRcdGZvciAoY29uc3QgaW50ZW50IG9mIHRoaXMuX3VucmVnaXN0ZXJlZEFwcC5pbnRlbnRzKSB7XG5cdFx0XHRcdFx0XHRpZiAoaW50ZW50LmNvbnRleHRzLmluY2x1ZGVzKHR5cGUpKSB7XG5cdFx0XHRcdFx0XHRcdGNvbnN0IGludGVudE5hbWU6IHN0cmluZyA9IGludGVudC5uYW1lO1xuXHRcdFx0XHRcdFx0XHRpbnRlbnROYW1lcy5wdXNoKGludGVudE5hbWUpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmIChpbnRlbnROYW1lcy5sZW5ndGggPiAwKSB7XG5cdFx0XHRcdFx0Ly8gbm93IHdlIG5lZWQgdG8gY2hlY2sgaWYgdGhlcmUgYXJlIGFueSBpbnN0YW5jZXMgYXMgdGhpcyBhcHAgY2FuIG5vdCBiZSBsYXVuY2hlZCBhcyBpdCBpcyBhIHBsYWNlaG9sZGVyIGZvciB1bnJlZ2lzdGVyZWQgaW5zdGFuY2VzXG5cdFx0XHRcdFx0Zm9yIChjb25zdCBpbnRlbnROYW1lIG9mIGludGVudE5hbWVzKSB7XG5cdFx0XHRcdFx0XHRpZiAoYXdhaXQgdGhpcy5jYW5BZGRVbnJlZ2lzdGVyZWRBcHAoY2xpZW50SWRlbnRpdHksIGludGVudE5hbWUpKSB7XG5cdFx0XHRcdFx0XHRcdHN1cHBvcnRlZEludGVudE5hbWVzLnB1c2goaW50ZW50TmFtZSk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdC8vIHRoZSB1bnJlZ2lzdGVyZWRBcHBNZXRhIGRhdGEgbGlzdHMgdGhlIHN1cHBvcnRlZCBpbnRlbnRzIGJ1dCB3ZSBvbmx5IHdhbnQgdG8gcmV0dXJuIGludGVudHMgdGhhdCBoYXZlIGFjdGl2ZSBpbnN0YW5jZXMgcmVhZHlcblx0XHRcdFx0cmV0dXJuIHN1cHBvcnRlZEludGVudE5hbWVzO1xuXHRcdFx0fVxuXG5cdFx0XHQvKipcblx0XHRcdCAqIENhbiB3ZSBhZGQgYW4gdW5yZWdpc3RlcmVkIGFwcC5cblx0XHRcdCAqIEBwYXJhbSBjbGllbnRJZGVudGl0eSBUaGUgY2xpZW50IGlkZW50aXR5LlxuXHRcdFx0ICogQHBhcmFtIGludGVudE5hbWUgVGhlIGludGVudCBuYW1lLlxuXHRcdFx0ICogQHBhcmFtIGNvbnRleHRUeXBlIFRoZSBjb250ZXh0IHR5cGUuXG5cdFx0XHQgKiBAcmV0dXJucyBUcnVlIGlmIHdlIGNhbiBhZGQgdGhlIGFwcC5cblx0XHRcdCAqL1xuXHRcdFx0cHJpdmF0ZSBhc3luYyBjYW5BZGRVbnJlZ2lzdGVyZWRBcHAoXG5cdFx0XHRcdGNsaWVudElkZW50aXR5OiBPcGVuRmluLkNsaWVudElkZW50aXR5LFxuXHRcdFx0XHRpbnRlbnROYW1lPzogc3RyaW5nLFxuXHRcdFx0XHRjb250ZXh0VHlwZT86IHN0cmluZ1xuXHRcdFx0KTogUHJvbWlzZTxib29sZWFuPiB7XG5cdFx0XHRcdGlmIChpc0VtcHR5KHRoaXM/Ll91bnJlZ2lzdGVyZWRBcHApKSB7XG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Y29uc3QgbGlzdGVuc0ZvciA9IHRoaXMuX3VucmVnaXN0ZXJlZEFwcD8uaW50ZXJvcD8uaW50ZW50cz8ubGlzdGVuc0ZvcjtcblxuXHRcdFx0XHRpZiAoIWlzRW1wdHkoaW50ZW50TmFtZSkgJiYgKGlzRW1wdHkobGlzdGVuc0ZvcikgfHwgaXNFbXB0eShsaXN0ZW5zRm9yW2ludGVudE5hbWVdKSkpIHtcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAoXG5cdFx0XHRcdFx0IWlzRW1wdHkoY29udGV4dFR5cGUpICYmXG5cdFx0XHRcdFx0IWlzRW1wdHkobGlzdGVuc0ZvcikgJiZcblx0XHRcdFx0XHQhaXNFbXB0eShpbnRlbnROYW1lKSAmJlxuXHRcdFx0XHRcdCFsaXN0ZW5zRm9yW2ludGVudE5hbWVdLmNvbnRleHRzLmluY2x1ZGVzKGNvbnRleHRUeXBlKVxuXHRcdFx0XHQpIHtcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRjb25zdCBpbnN0YW5jZXMgPSBhd2FpdCB0aGlzLl9jbGllbnRSZWdpc3RyYXRpb25IZWxwZXIuZmluZEFwcEluc3RhbmNlcyhcblx0XHRcdFx0XHR7IGFwcElkOiB0aGlzLl91bnJlZ2lzdGVyZWRBcHAuYXBwSWQgfSxcblx0XHRcdFx0XHRjbGllbnRJZGVudGl0eSxcblx0XHRcdFx0XHRcImludGVudFwiXG5cdFx0XHRcdCk7XG5cblx0XHRcdFx0cmV0dXJuIGluc3RhbmNlcy5sZW5ndGggPiAwO1xuXHRcdFx0fVxuXG5cdFx0XHQvKipcblx0XHRcdCAqIEdldCBhbiBhcHBsaWNhdGlvbiBpZGVudGl0eS5cblx0XHRcdCAqIEBwYXJhbSBtZXRhZGF0YSBUaGUgbWV0YWRhdGEgZm9yIHRoZSBhcHAuXG5cdFx0XHQgKiBAcmV0dXJucyBUaGUgYXBwIGlkZW50aWZpZXIuXG5cdFx0XHQgKi9cblx0XHRcdHByaXZhdGUgZ2V0QXBwbGljYXRpb25JZGVudGl0eShcblx0XHRcdFx0bWV0YWRhdGE6IE9wZW5GaW4uSW50ZW50TWV0YWRhdGE8SW50ZW50VGFyZ2V0TWV0YURhdGE+IHwgdW5kZWZpbmVkXG5cdFx0XHQpOiBBcHBJZGVudGlmaWVyIHwgdW5kZWZpbmVkIHtcblx0XHRcdFx0Y29uc3QgdGFyZ2V0ID0gbWV0YWRhdGE/LnRhcmdldDtcblx0XHRcdFx0aWYgKGlzRW1wdHkodGFyZ2V0KSkge1xuXHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAoaXNTdHJpbmcodGFyZ2V0KSkge1xuXHRcdFx0XHRcdGlmICh0YXJnZXQudHJpbSgpLmxlbmd0aCA9PT0gMCkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIHVuZGVmaW5lZDtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0cmV0dXJuIHsgYXBwSWQ6IHRhcmdldCB9O1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKGlzRW1wdHkodGFyZ2V0LmFwcElkKSkge1xuXHRcdFx0XHRcdHJldHVybiB1bmRlZmluZWQ7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4geyBhcHBJZDogdGFyZ2V0LmFwcElkLCBpbnN0YW5jZUlkOiB0YXJnZXQuaW5zdGFuY2VJZCB9O1xuXHRcdFx0fVxuXG5cdFx0XHQvKipcblx0XHRcdCAqIERvZXMgdGhlIGFwcCB1c2UgYXBwbGljYXRpb24gaWRlbnRpdHkuXG5cdFx0XHQgKiBAcGFyYW0gY2xpZW50SWRlbnRpdHkgVGhlIGNsaWVudCBhcHAgdG8gY2hlY2suXG5cdFx0XHQgKiBAcmV0dXJucyBUcnVlIGlmIHRoZSBhcHAgdXNlcyBhcHBsaWNhdGlvbiBpZGVudGl0eS5cblx0XHRcdCAqL1xuXHRcdFx0cHJpdmF0ZSB1c2VzQXBwbGljYXRpb25JZGVudGl0eShjbGllbnRJZGVudGl0eTogT3BlbkZpbi5DbGllbnRJZGVudGl0eSk6IGJvb2xlYW4ge1xuXHRcdFx0XHRjb25zdCBhcGlNZXRhZGF0YSA9IHRoaXMuX2NsaWVudFJlZ2lzdHJhdGlvbkhlbHBlci5nZXRBcGlWZXJzaW9uKGNsaWVudElkZW50aXR5KTtcblx0XHRcdFx0aWYgKGlzRW1wdHkoYXBpTWV0YWRhdGEpKSB7XG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiBhcGlNZXRhZGF0YS50eXBlID09PSBcImZkYzNcIiAmJiBhcGlNZXRhZGF0YS52ZXJzaW9uID09PSBcIjIuMFwiO1xuXHRcdFx0fVxuXG5cdFx0XHQvKipcblx0XHRcdCAqIExvb2t1cCBhbiBhcHBsaWNhdGlvbiBpZGVudGl0eS5cblx0XHRcdCAqIEBwYXJhbSBjbGllbnRJZGVudGl0eSBUaGUgY2xpZW50IGlkZW50aXR5IHRvIHVzZS5cblx0XHRcdCAqIEByZXR1cm5zIFRoZSBhcHBsaWNhdGlvbiBpZGVudGl0eS5cblx0XHRcdCAqL1xuXHRcdFx0cHJpdmF0ZSBhc3luYyBsb29rdXBBcHBJZChjbGllbnRJZGVudGl0eTogT3BlbkZpbi5DbGllbnRJZGVudGl0eSk6IFByb21pc2U8c3RyaW5nIHwgdW5kZWZpbmVkPiB7XG5cdFx0XHRcdGNvbnN0IG5hbWVQYXJ0cyA9IGNsaWVudElkZW50aXR5Lm5hbWUuc3BsaXQoXCIvXCIpO1xuXHRcdFx0XHRsZXQgYXBwOiBQbGF0Zm9ybUFwcCB8IHVuZGVmaW5lZDtcblxuXHRcdFx0XHRpZiAobmFtZVBhcnRzLmxlbmd0aCA9PT0gMSB8fCBuYW1lUGFydHMubGVuZ3RoID09PSAyKSB7XG5cdFx0XHRcdFx0YXBwID0gYXdhaXQgZ2V0QXBwKG5hbWVQYXJ0c1swXSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKG5hbWVQYXJ0cy5sZW5ndGggPiAyKSB7XG5cdFx0XHRcdFx0YXBwID0gYXdhaXQgZ2V0QXBwKGAke25hbWVQYXJ0c1swXX0vJHtuYW1lUGFydHNbMV19YCk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRjb25zdCBhcHBOb3RGb3VuZCA9IGlzRW1wdHkoYXBwKTtcblxuXHRcdFx0XHRpZiAoYXBwTm90Rm91bmQgJiYgY2xpZW50SWRlbnRpdHkudXVpZCAhPT0gZmluLm1lLmlkZW50aXR5LnV1aWQpIHtcblx0XHRcdFx0XHRsb2dnZXIud2Fybihcblx0XHRcdFx0XHRcdFwiTG9va3VwIG1hZGUgYnkgYSBub24tcmVnaXN0ZXJlZCBhcHAgdGhhdCBpcyBvdXRzaWRlIG9mIHRoaXMgcGxhdGZvcm0uXCIsXG5cdFx0XHRcdFx0XHRjbGllbnRJZGVudGl0eVxuXHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKGFwcE5vdEZvdW5kICYmIGlzRW1wdHkodGhpcy5fdW5yZWdpc3RlcmVkQXBwKSkge1xuXHRcdFx0XHRcdGxvZ2dlci53YXJuKFxuXHRcdFx0XHRcdFx0XCJMb29rdXAgbWFkZSBieSBhIG5vbi1yZWdpc3RlcmVkIGFwcCB0aGF0IGZhbGxzIHVuZGVyIHRoaXMgcGxhdGZvcm0uIE5vIHVucmVnaXN0ZXJlZCBwbGFjZWhvbGRlciBhcHAgaXMgc3BlY2lmaWVkLlwiLFxuXHRcdFx0XHRcdFx0Y2xpZW50SWRlbnRpdHlcblx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmIChhcHBOb3RGb3VuZCkge1xuXHRcdFx0XHRcdGFwcCA9IHRoaXMuX3VucmVnaXN0ZXJlZEFwcDtcblx0XHRcdFx0XHRsb2dnZXIuaW5mbyhcIkFzc2lnbmVkIHRoZSBmb2xsb3dpbmcgdW5yZWdpc3RlcmVkIGFwcCB0byByZXByZXNlbnQgdGhlIGFwcC5cIiwgYXBwKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gYXBwPy5hcHBJZDtcblx0XHRcdH1cblxuXHRcdFx0LyoqXG5cdFx0XHQgKiBQcm9jZXNzIGEgY29udGV4dC5cblx0XHRcdCAqIEBwYXJhbSBjb250ZXh0IFRoZSBjb250ZXh0IHRvIHByb2Nlc3MuXG5cdFx0XHQgKiBAcmV0dXJucyBUaGUgcHJvY2Vzc2VkIGNvbnRleHQuXG5cdFx0XHQgKi9cblx0XHRcdHByaXZhdGUgYXN5bmMgcHJvY2Vzc0NvbnRleHQoY29udGV4dDogT3BlbkZpbi5Db250ZXh0KTogUHJvbWlzZTxPcGVuRmluLkNvbnRleHQ+IHtcblx0XHRcdFx0aWYgKGlzRW1wdHkoZW5kcG9pbnRDbGllbnQpKSB7XG5cdFx0XHRcdFx0cmV0dXJuIGNvbnRleHQ7XG5cdFx0XHRcdH1cblx0XHRcdFx0Y29uc3QgZW5kcG9pbnRJZCA9IGBpbnRlcm9wYnJva2VyLnByb2Nlc3MuJHtjb250ZXh0LnR5cGV9YDtcblx0XHRcdFx0aWYgKGVuZHBvaW50Q2xpZW50Lmhhc0VuZHBvaW50KGVuZHBvaW50SWQpKSB7XG5cdFx0XHRcdFx0bG9nZ2VyLmluZm8oYFByb2Nlc3NpbmcgY29udGV4dCAke2NvbnRleHQudHlwZX0gd2l0aCBlbmRwb2ludCAke2VuZHBvaW50SWR9YCk7XG5cdFx0XHRcdFx0Y29uc3QgcHJvY2Vzc2VkQ29udGV4dCA9IGF3YWl0IGVuZHBvaW50Q2xpZW50LnJlcXVlc3RSZXNwb25zZTxDb250ZXh0VG9Qcm9jZXNzLCBQcm9jZXNzZWRDb250ZXh0Pihcblx0XHRcdFx0XHRcdGVuZHBvaW50SWQsXG5cdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdGNvbnRleHRcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdGlmIChwcm9jZXNzZWRDb250ZXh0Py5jb250ZXh0KSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gcHJvY2Vzc2VkQ29udGV4dD8uY29udGV4dDtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIGNvbnRleHQ7XG5cdFx0XHR9XG5cblx0XHRcdC8qKlxuXHRcdFx0ICogR2V0IHRoZSBjb250ZXh0IG1ldGFkYXRhIGZvciBhIGNsaWVudCBpZGVudGl0eS5cblx0XHRcdCAqIEBwYXJhbSBjbGllbnRJZGVudGl0eSBUaGUgY2xpZW50IGlkZW50aXR5LlxuXHRcdFx0ICogQHJldHVybnMgVGhlIGNvbnRleHQgbWV0YWRhdGEuXG5cdFx0XHQgKi9cblx0XHRcdHByaXZhdGUgYXN5bmMgZ2V0Q29udGV4dE1ldGFkYXRhKGNsaWVudElkZW50aXR5OiBPcGVuRmluLkNsaWVudElkZW50aXR5KTogUHJvbWlzZTxDb250ZXh0TWV0YWRhdGE+IHtcblx0XHRcdFx0Y29uc3QgYXBwSWQgPSAoYXdhaXQgdGhpcy5sb29rdXBBcHBJZChjbGllbnRJZGVudGl0eSkpID8/IGNsaWVudElkZW50aXR5Lm5hbWU7XG5cdFx0XHRcdHJldHVybiB7XG5cdFx0XHRcdFx0c291cmNlOiB7XG5cdFx0XHRcdFx0XHRhcHBJZCxcblx0XHRcdFx0XHRcdGluc3RhbmNlSWQ6IGNsaWVudElkZW50aXR5LmVuZHBvaW50SWRcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH07XG5cdFx0XHR9XG5cdFx0fTtcbn1cbiIsIi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBtYXgtY2xhc3Nlcy1wZXItZmlsZVxuaW1wb3J0IHR5cGUgT3BlbkZpbiBmcm9tIFwiQG9wZW5maW4vY29yZVwiO1xuaW1wb3J0IHR5cGUge1xuXHRQbGF0Zm9ybUludGVyb3BPdmVycmlkZSxcblx0UGxhdGZvcm1JbnRlcm9wT3ZlcnJpZGVPcHRpb25zXG59IGZyb20gXCJ3b3Jrc3BhY2UtcGxhdGZvcm0tc3RhcnRlci9zaGFwZXMvaW50ZXJvcGJyb2tlci1zaGFwZXNcIjtcbmltcG9ydCB0eXBlIHsgTG9nZ2VyLCBMb2dnZXJDcmVhdG9yIH0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3NoYXBlcy9sb2dnZXItc2hhcGVzXCI7XG5pbXBvcnQgdHlwZSB7IE1vZHVsZURlZmluaXRpb24sIE1vZHVsZUhlbHBlcnMgfSBmcm9tIFwid29ya3NwYWNlLXBsYXRmb3JtLXN0YXJ0ZXIvc2hhcGVzL21vZHVsZS1zaGFwZXNcIjtcbmltcG9ydCB7IGdldENvbnN0cnVjdG9yT3ZlcnJpZGUgYXMgd3BzQ29uc3RydWN0b3JPdmVycmlkZSB9IGZyb20gXCIuL2Jyb2tlci93cHMtaW50ZXJvcC1vdmVycmlkZVwiO1xuaW1wb3J0IHR5cGUgeyBXcHNJbnRlcm9wT3ZlcnJpZGVPcHRpb25zIH0gZnJvbSBcIi4vc2hhcGVzXCI7XG4vKipcbiAqIEltcGxlbWVudGF0aW9uIGZvciB0aGUgd3BzIGludGVyb3Agb3ZlcnJpZGUgaW50ZXJvcCBvdmVycmlkZS5cbiAqL1xuZXhwb3J0IGNsYXNzIFdwc0ludGVyb3BPdmVycmlkZSBpbXBsZW1lbnRzIFBsYXRmb3JtSW50ZXJvcE92ZXJyaWRlPFdwc0ludGVyb3BPdmVycmlkZU9wdGlvbnM+IHtcblx0LyoqXG5cdCAqIFRoZSBtb2R1bGUgZGVmaW5pdGlvbiBpbmNsdWRpbmcgc2V0dGluZ3MuXG5cdCAqIEBpbnRlcm5hbFxuXHQgKi9cblx0cHJpdmF0ZSBfZGVmaW5pdGlvbjogTW9kdWxlRGVmaW5pdGlvbjxXcHNJbnRlcm9wT3ZlcnJpZGVPcHRpb25zPiB8IHVuZGVmaW5lZDtcblxuXHQvKipcblx0ICogVGhlIGxvZ2dlciBmb3IgZGlzcGxheWluZyBpbmZvcm1hdGlvbiBmcm9tIHRoZSBtb2R1bGUuXG5cdCAqIEBpbnRlcm5hbFxuXHQgKi9cblx0cHJpdmF0ZSBfbG9nZ2VyPzogTG9nZ2VyO1xuXG5cdC8qKlxuXHQgKiBIZWxwZXIgbWV0aG9kcyBmb3IgdGhlIG1vZHVsZS5cblx0ICogQGludGVybmFsXG5cdCAqL1xuXHRwcml2YXRlIF9oZWxwZXJzOiBNb2R1bGVIZWxwZXJzIHwgdW5kZWZpbmVkO1xuXG5cdC8qKlxuXHQgKiBJbml0aWFsaXplIHRoZSBtb2R1bGUuXG5cdCAqIEBwYXJhbSBkZWZpbml0aW9uIFRoZSBkZWZpbml0aW9uIG9mIHRoZSBtb2R1bGUgZnJvbSBjb25maWd1cmF0aW9uIGluY2x1ZGUgY3VzdG9tIG9wdGlvbnMuXG5cdCAqIEBwYXJhbSBsb2dnZXJDcmVhdG9yIEZvciBsb2dnaW5nIGVudHJpZXMuXG5cdCAqIEBwYXJhbSBoZWxwZXJzIEhlbHBlciBtZXRob2RzIGZvciB0aGUgbW9kdWxlIHRvIGludGVyYWN0IHdpdGggdGhlIGFwcGxpY2F0aW9uIGNvcmUuXG5cdCAqIEByZXR1cm5zIE5vdGhpbmcuXG5cdCAqL1xuXHRwdWJsaWMgYXN5bmMgaW5pdGlhbGl6ZShcblx0XHRkZWZpbml0aW9uOiBNb2R1bGVEZWZpbml0aW9uPFdwc0ludGVyb3BPdmVycmlkZU9wdGlvbnM+LFxuXHRcdGxvZ2dlckNyZWF0b3I6IExvZ2dlckNyZWF0b3IsXG5cdFx0aGVscGVyczogTW9kdWxlSGVscGVyc1xuXHQpOiBQcm9taXNlPHZvaWQ+IHtcblx0XHR0aGlzLl9kZWZpbml0aW9uID0gZGVmaW5pdGlvbjtcblx0XHRjb25zdCBsb2dnZXJOYW1lID0gZGVmaW5pdGlvbi5kYXRhPy5sb2dnZXJOYW1lID8/IFwiV3BzSW50ZXJvcE92ZXJyaWRlXCI7XG5cdFx0dGhpcy5fbG9nZ2VyID0gbG9nZ2VyQ3JlYXRvcihsb2dnZXJOYW1lKTtcblx0XHR0aGlzLl9oZWxwZXJzID0gaGVscGVycztcblxuXHRcdHRoaXMuX2xvZ2dlci5pbmZvKFwiSW5pdGlhbGl6aW5nXCIpO1xuXHR9XG5cblx0LyoqXG5cdCAqIENsb3NlIGRvd24gYW55IHJlc291cmNlcyBiZWluZyB1c2VkIGJ5IHRoZSBtb2R1bGUuXG5cdCAqIEByZXR1cm5zIE5vdGhpbmcuXG5cdCAqL1xuXHRwdWJsaWMgYXN5bmMgY2xvc2Vkb3duKCk6IFByb21pc2U8dm9pZD4ge1xuXHRcdHRoaXMuX2xvZ2dlcj8uaW5mbyhcIkNsb3NlZG93blwiKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBHZXQgdGhlIG92ZXJyaWRlIGNvbnN0cnVjdG9yIGZvciB0aGUgaW50ZXJvcCBicm9rZXIgKHVzZWZ1bCBpZiB5b3Ugd2lzaCB0aGlzIGltcGxlbWVudGF0aW9uIHRvIGJlIGxheWVyZWQgd2l0aCBvdGhlciBpbXBsZW1lbnRhdGlvbnMgYW5kIHBhc3NlZCB0byB0aGUgcGxhdGZvcm0ncyBpbml0aWFsaXphdGlvbiBvYmplY3QgYXMgcGFydCBvZiBhbiBhcnJheSkuXG5cdCAqIEBwYXJhbSBvcHRpb25zIFRoZSBvcHRpb25zIGZvciB0aGUgaW50ZXJvcCBicm9rZXIgZGVmaW5lZCBhcyBwYXJ0IG9mIHRoZSBwbGF0Zm9ybS5cblx0ICogQHJldHVybnMgVGhlIG92ZXJyaWRlIGNvbnN0cnVjdG9yIHRvIGJlIHVzZWQgaW4gYW4gYXJyYXkuXG5cdCAqL1xuXHRwdWJsaWMgYXN5bmMgZ2V0Q29uc3RydWN0b3JPdmVycmlkZShcblx0XHRvcHRpb25zOiBQbGF0Zm9ybUludGVyb3BPdmVycmlkZU9wdGlvbnNcblx0KTogUHJvbWlzZTxPcGVuRmluLkNvbnN0cnVjdG9yT3ZlcnJpZGU8T3BlbkZpbi5JbnRlcm9wQnJva2VyPj4ge1xuXHRcdGlmICghdGhpcy5faGVscGVycyB8fCAhdGhpcy5fbG9nZ2VyKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJNb2R1bGUgbm90IGluaXRpYWxpemVkXCIpO1xuXHRcdH1cblx0XHRyZXR1cm4gd3BzQ29uc3RydWN0b3JPdmVycmlkZShvcHRpb25zLCB0aGlzLl9sb2dnZXIsIHRoaXMuX2hlbHBlcnMpO1xuXHR9XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB0eXBlIHsgTW9kdWxlSW1wbGVtZW50YXRpb24sIE1vZHVsZVR5cGVzIH0gZnJvbSBcIndvcmtzcGFjZS1wbGF0Zm9ybS1zdGFydGVyL3NoYXBlcy9tb2R1bGUtc2hhcGVzXCI7XG5pbXBvcnQgeyBXcHNJbnRlcm9wT3ZlcnJpZGUgfSBmcm9tIFwiLi9pbnRlcm9wLW92ZXJyaWRlXCI7XG5cbi8qKlxuICogRGVmaW5lIHRoZSBlbnRyeSBwb2ludHMgZm9yIHRoZSBtb2R1bGUuXG4gKi9cbmV4cG9ydCBjb25zdCBlbnRyeVBvaW50czogeyBbdHlwZSBpbiBNb2R1bGVUeXBlc10/OiBNb2R1bGVJbXBsZW1lbnRhdGlvbiB9ID0ge1xuXHRpbnRlcm9wT3ZlcnJpZGU6IG5ldyBXcHNJbnRlcm9wT3ZlcnJpZGUoKVxufTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==