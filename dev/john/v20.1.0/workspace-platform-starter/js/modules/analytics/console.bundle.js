var e={d:(o,t)=>{for(var n in t)e.o(t,n)&&!e.o(o,n)&&Object.defineProperty(o,n,{enumerable:!0,get:t[n]})},o:(e,o)=>Object.prototype.hasOwnProperty.call(e,o)},o={};e.d(o,{k:()=>t});const t={analytics:new class{async initialize(e,o,t){this._logger=o("ConsoleAnalyticsModule"),this._logger.info("Initialized"),this._logger.info("Session Id: ",t.sessionId);const n="trace"===e?.data?.eventLogLevel?"debug":e?.data?.eventLogLevel??"info";this._logEvent=(e,o)=>{this._logger&&this._logger[n](e,JSON.stringify(o))}}async handleAnalytics(e){this._logEvent&&this._logEvent("Received the following analytics events",e)}async closedown(){this._logger&&this._logger.info("closing down")}}};var n=o.k;export{n as entryPoints};
//# sourceMappingURL=console.bundle.js.map