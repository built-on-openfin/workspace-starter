// -------------------------------------------------
// FDC3 Functions
// -------------------------------------------------
export async function systemBroadcast(log, context) {
  if (window.fdc3 !== undefined) {
    const systemChannel = await fdc3.getCurrentChannel();
    if (systemChannel !== null) {
      log(
        `broadcasting on ${systemChannel.type} channel: ${systemChannel.id}`,
        context
      );
      fdc3.broadcast(context);
    } else {
      log(
        "You are not bound to a system channel and are unable to broadcast:",
        context
      );
    }
  }
}

export async function appBroadcast(log, appChannelName, context) {
  if (window.fdc3 !== undefined) {
    if (appChannelName !== undefined) {
      let appChannel = await fdc3.getOrCreateChannel(appChannelName);
      log(
        `broadcasting on ${appChannel.type} channel: ${appChannel.id}`,
        context
      );
      appChannel.broadcast(context);
    }
  }
}

export async function listenToSystemBroadcast(log, onContextReceived, ctxType = null) {
  if (window.fdc3 !== undefined) {
    const systemHandler = (ctx) => {
      log("System Context Received: ", ctx);
      onContextReceived();
    };

    log("Listening for system context.");
    const systemListener = fdc3.addContextListener(ctxType, systemHandler);
  }
}

export async function listenToAppBroadcast(log, appChannelName, onContextReceived) {
  if (window.fdc3 !== undefined) {
    if (appChannelName !== undefined) {
      // listen to a defined application channel
      const appHandler = (ctx) => {
        log("App Channel Context Received: ", ctx);
        onContextReceived();
      };
      let appChannel = await fdc3.getOrCreateChannel(appChannelName);

      // listen for new app channel messages
      log("Listening for app channel: " + appChannelName + " context.");
      let appListener = appChannel.addContextListener(null, appHandler);
    }
  }
}