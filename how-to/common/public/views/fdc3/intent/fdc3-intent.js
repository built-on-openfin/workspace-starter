// -------------------------------------------------
// FDC3 Functions
// -------------------------------------------------
export async function raiseIntent(log, intent, context, app) {
  if (window.fdc3 !== undefined) {
    log(`Raising intent ${intent} with context`, context);
    await fdc3.raiseIntent(intent, context, app);
  }
}

export async function raiseIntentByContext(log, context, app) {
  if (window.fdc3 !== undefined) {
    if (app === undefined) {
      log(`Raising intent by context ${context.type}:`, context);
    } else {
      log(
        `Raising intent by context ${context.type} and targeting app: ${app}. Context: `,
        context
      );
    }
    await fdc3.raiseIntentForContext(context, app);
  }
}

export async function listen(log, intentList, onIntentReceived) {
  if (window.fdc3 !== undefined) {
    // ----------------------------------------------------
    // Listening code
    // ----------------------------------------------------
    if (intentList.length > 0) {
      log("View Manifest specified following intents: ", intentList);
    }
    intentList.forEach((intent) => {
      log("Adding intent listener for: " + intent + ".");
      fdc3.addIntentListener(intent, (ctx) => {
        log("Received Context For Intent: " + intent, ctx);
        onIntentReceived();
      });
    });
  }
}
