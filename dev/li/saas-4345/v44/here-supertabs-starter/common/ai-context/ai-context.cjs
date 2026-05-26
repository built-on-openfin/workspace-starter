"use strict";

// src/assets/utils.ts
var partialDenyUrls = ["about:blank"];

// src/assets/ai-context.ts
var getParentIdentity = async (fin2) => {
  let tries = 0;
  let identity = fin2.me.identity;
  return new Promise((resolve, reject) => {
    const timer = setInterval(async () => {
      tries += 1;
      if (tries > 30) {
        clearInterval(timer);
        reject(new Error("Unable to get parent identity"));
        return;
      }
      const parentWin = await fin2.me.getCurrentWindow();
      if (parentWin.identity.uuid === parentWin.identity.name) {
        return;
      }
      identity = parentWin.identity;
      clearInterval(timer);
      resolve(identity);
    }, 100);
  });
};
var executeScript = (fin2) => {
  let chan;
  if (!fin2.me.isView) {
    console.warn(`[preloadScript::ai-context.cjs] must be in a view to run this script.`);
    return;
  }
  const _aiContext = {
    setContextChangedListener: async (listener) => {
      const identity = await getParentIdentity(fin2);
      if (!chan) {
        chan = await fin2.InterApplicationBus.Channel.connect(`ai-context-${fin2.me.identity.uuid}`, { payload: "chat-view" }).catch((error) => {
          console.error(`[preloadScript::ai-context.cjs] ${error}`);
          return void 0;
        });
      }
      if (chan) {
        const key = JSON.stringify({ uuid: identity.uuid, name: identity.name });
        chan.remove(`set-context-changed-${key}`);
        chan.register(`set-context-changed-${key}`, listener);
        console.log(`[preloadScript::ai-context.cjs] registered action: set-context-changed-${key}`);
      } else {
        console.warn(`[preloadScript::ai-context.cjs] unable to set listener`);
      }
    },
    getContext: async () => {
      try {
        const client = await fin2.Platform.getCurrentSync().getClient();
        const identity = await getParentIdentity(fin2);
        return await client.dispatch("getAIContext", identity);
      } catch {
        return void 0;
      }
    }
  };
  Object.assign(window, { _aiContext });
};
if ("fin" in window) {
  const isServiceWorker = "serviceWorker" in navigator && navigator.serviceWorker.controller;
  const shouldExecute = !isServiceWorker && fin.me && fin.me.uuid !== fin.me.name && !partialDenyUrls.includes(window.location.href);
  if (shouldExecute) {
    executeScript(fin);
  }
} else {
  console.warn(`[preloadScript::ai-context.cjs] fin was undefined, not executing script.`);
}
