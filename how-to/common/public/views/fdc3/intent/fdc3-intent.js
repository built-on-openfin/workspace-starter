// -------------------------------------------------
// FDC3 Functions
// -------------------------------------------------
export async function raiseIntent(log, intent, context, app) {
  if (window.fdc3 !== undefined) {
    log(`Raising intent ${intent} with context`, context);
    const intentResolver = await fdc3.raiseIntent(intent, context, app);
    if(intentResolver !== undefined) {
      log("Intent resolver received: ", intentResolver);
    }
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
    const intentResolver = await fdc3.raiseIntentForContext(context, app);
    if(intentResolver !== undefined) {
      log("Intent resolver received: ", intentResolver);
    }
  }
}

export async function listen(log, intentList, onChange) {
  if (window.fdc3 !== undefined) {
    // ----------------------------------------------------
    // Listening code
    // ----------------------------------------------------
    if (intentList.length > 0) {
      log("View Manifest/Defaults specified following intents: ", intentList);
    }
    try {
      intentList.forEach((intent) => {
        log("Adding intent listener for: " + intent + ".");
        fdc3.addIntentListener(intent, (ctx) => {
          log("Received Context For Intent: " + intent, ctx);
          onChange();
        });
      });
    } catch(error) {
      log("Error while trying to register an intent handler. It may be this platform does not have a custom broker implementation with Intent support.", error);
      onChange();
    }
  }
}
