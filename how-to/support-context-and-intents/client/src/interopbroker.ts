import { App } from "@openfin/workspace";
import { InteropBroker } from "openfin-adapter/src/api/interop";
import { fin } from "openfin-adapter/src/mock";
import {
  getAppsByIntent,
  getIntentsByContext,
  getIntent,
  getApp,
} from "./apps";
import { launchView, launchSnapshot } from "./launch";

const NoAppsFound = "NoAppsFound";
const ResolverTimeout = "ResolverTimeout";

export class PlatformInteropBroker extends InteropBroker {
  async launchAppWithIntent(app: App, intent) {
    console.log("Launching app with intent.");

    if (app.manifestType !== "view" && app.manifestType !== "inline-view" && app.manifestType !== "snapshot") {
      // optional logic show a prompt to the user to let them know
      console.warn(
        "Unable to raise intent against app as only view/snapshot based apps are supported."
      );
      return null;
    }

    if (app.manifestType === "view" || app.manifestType === "inline-view") {
      console.log("The supporting app is a view (" + app.manifestType + ")");

      let identity = await launchView(app);
      if (identity === null) {
        // optional logic show a prompt to the user to let them know
        console.warn(
          "Unable to raise intent against view as no identity was returned."
        );
        return null;
      } else {
        super.setIntentTarget(intent, identity);
      }
    }

    if (app.manifestType === "snapshot") {
      console.log("The supporting app is a view.");

      let identities = await launchSnapshot(app);
      if (identities === null) {
        // optional logic show a prompt to the user to let them know
        console.warn(
          "Unable to raise intent against target as no identity was returned."
        );
        return null;
      } else {
        for (let i = 0; i < identities.length; i++) {
          super.setIntentTarget(intent, identities[i]);
        }
      }
    }

    return {
      source: app.appId,
      version: app.version,
    };
  }

  async getTargetIdentity(appId) {
    if (appId === undefined || appId === null) {
      return undefined;
    }
    let passedIdentity = appId.split("@");
    let name = passedIdentity[0];
    let uuid = fin.me.identity.uuid;
    if (passedIdentity.length === 2) {
      uuid = passedIdentity[1];
    }
    let resolvedIdentity = { uuid, name };

    try {
      let targetView = await fin.View.wrap({ uuid, name });
      await targetView.getInfo();
      // passed identity found
      return resolvedIdentity;
    } catch {
      // passed identity does not exist
      return undefined;
    }
  }

  async launchAppPicker(options: {
    apps?: App[];
    intent?: any;
    intents?: any;
  }): Promise<{
    appId: string;
    intent: { name: string; displayName: string };
  }> {
    // show menu
    // launch a new window and optionally pass the available intents as customData.apps as part of the window options
    // the window can then use raiseIntent against a specific app (the selected one). This is a very basic example.
    // this logic runs in the provider so we are using it as a way of determining the root (so it works with root hosting and subdirectory based hosting.)
    let url = window.location.href.replace("platform/provider.html", "common/windows/intents/picker.html")
    const winOption = {
      name: "intent-picker",
      includeInSnapshot: false,
      fdc3InteropApi: "1.2",
      defaultWidth: 400,
      defaultHeight: 400,
      showTaskbarIcon: false,
      saveWindowState: false,
      defaultCentered: true,
      customData: {
        apps: options.apps,
        intent: options.intent,
        intents: options.intents,
      },
      url,
      frame: false,
      autoShow: true,
      alwaysOnTop: true,
    };

    let win = await fin.Window.create(winOption);
    let webWindow = win.getWebWindow();
    try {
      let selectedAppId = await webWindow["getIntentSelection"]();
      return selectedAppId;
    } catch (reason) {
      console.error("App for intent not selected/launched.", options.intent);
      return null;
    }
  }

  async isConnectionAuthorized(id: OpenFin.Identity, payload?: any): Promise<boolean>{
    console.log("Interop connection being made by the following identity with payload: ", id, payload);
    // perform connection validation checks here if required and return false if it shouldn't be permissioned.
    return true;
  }

  async isActionAuthorized(action: string, payload: any, identity: OpenFin.ClientIdentity): Promise<boolean> {
    console.log("Interop Broker is action authorized: ", action, payload, identity);
    // perform check here if you wish and return true/false accordingly
    return true;
  }
  
  async handleInfoForIntentsByContext(context, clientIdentity) {
    let intents = await getIntentsByContext(context.type);

    if (intents.length === 0) {
      throw Error(NoAppsFound);
    }

    let mappedIntents = intents.map((entry) => {
      let newEntry = {};
      newEntry["intent"] = entry.intent;
      newEntry["apps"] = entry.apps.map((app) => {
        let appEntry = { name: app.appId, appId: app.appId, title: app.title };
        return appEntry;
      });
      return newEntry;
    });

    return mappedIntents;
  }

  async handleInfoForIntent(options, clientIdentity) {
    let result = await getIntent(options.name, options.context?.type);
    if (result === null) {
      throw Error(NoAppsFound);
    }
    let response = {
      intent: result.intent,
      apps: result.apps.map((app) => {
        let appEntry = { name: app.appId, appId: app.appId, title: app.title };
        return appEntry;
      }),
    };

    return response;
  }

  async handleFiredIntentForContext(contextForIntent, clientIdentity) {
    let availableIntents = await getIntentsByContext(contextForIntent.type);
    if (availableIntents.length === 0) {
      throw Error(NoAppsFound);
    }
    let intent = {
      context: contextForIntent,
      name: undefined,
      displayName: undefined,
    };
    let targetApp: App;
    let targetAppIntent;
    let targetAppIntentCount = 0;

    if (contextForIntent.metadata?.target !== undefined) {
      targetApp = await getApp(contextForIntent.metadata?.target);
    }

    if (targetApp !== undefined && Array.isArray(targetApp.intents)) {
      for (let i = 0; i < targetApp.intents.length; i++) {
        targetAppIntent = targetApp.intents[i];
        if (
          Array.isArray(targetAppIntent.contexts) &&
          targetAppIntent.contexts.indexOf(contextForIntent.type) > -1
        ) {
          targetAppIntentCount++;
        }
      }
    }

    if (
      targetApp !== undefined &&
      targetAppIntent !== undefined &&
      targetAppIntentCount === 1
    ) {
      // a preferred name for an app was given with the context object
      // the app existed and it supported the context type and there was only one intent that supported
      // that context type. Launch the app with that intent otherwise present the user with a list of
      // everything that supports that context type
      intent.name = targetAppIntent.name;
      intent.displayName = targetAppIntent.name;
      let intentResolver = await this.launchAppWithIntent(targetApp, intent);
      if (intentResolver === null) {
        throw Error(NoAppsFound);
      }
      return intentResolver;
    }

    if (availableIntents.length === 1) {
      intent.name = availableIntents[0].intent.name;
      intent.displayName = availableIntents[0].intent.name;
      if (availableIntents[0].apps.length === 1) {
        let intentResolver = await this.launchAppWithIntent(
          availableIntents[0].apps[0],
          intent
        );
        if (intentResolver === null) {
          throw Error(NoAppsFound);
        }
        return intentResolver;
      }
      if (availableIntents[0].apps.length > 1) {
        try {
          let userSelection = await this.launchAppPicker({
            apps: availableIntents[0].apps,
            intent,
          });

          let selectedApp = availableIntents[0].apps.find(
            (entry) =>
              entry.appId === userSelection.appId && entry.appId !== undefined
          );
          if (selectedApp !== null && selectedApp !== undefined) {
            let intentResolver = await this.launchAppWithIntent(
              selectedApp,
              intent
            );
            if (intentResolver === null) {
              throw Error(NoAppsFound);
            }
            return intentResolver;
          } else {
            console.error(
              "We were returned a non existent appId to launch with the intent."
            );
            throw new Error(NoAppsFound);
          }
        } catch (reason) {
          console.error(
            "App for intent by context not selected/launched.",
            intent
          );
          throw new Error(ResolverTimeout);
        }
      }
    } else {
      try {
        let userSelection = await this.launchAppPicker({
          intent,
          intents: availableIntents,
        });

        let selectedIntent = availableIntents.find((entry) => {
          return entry.intent.name === userSelection.intent.name;
        });

        if (selectedIntent === undefined) {
          console.error(
            "The user selected an intent but it's name doesn't match the available intents.",
            userSelection
          );
          throw new Error(NoAppsFound);
        }
        let selectedApp = selectedIntent.apps.find(
          (entry) =>
            entry.appId === userSelection.appId && entry.appId !== undefined
        );
        if (selectedApp !== null && selectedApp !== undefined) {
          intent.displayName = userSelection.intent.displayName;
          intent.name = userSelection.intent.name;
          let intentResolver = await this.launchAppWithIntent(
            selectedApp,
            userSelection.intent
          );
          if (intentResolver === null) {
            throw Error(NoAppsFound);
          }
          return intentResolver;
        } else {
          console.error(
            "We were returned a non existent appId to launch with the intent."
          );
          throw new Error(NoAppsFound);
        }
      } catch (reason) {
        console.error(
          "App for intent by context not selected/launched.",
          intent
        );
        throw new Error(ResolverTimeout);
      }
    }
  }

  async handleFiredIntent(intent) {
    console.log("Received request for a raised intent: ", intent);
    let intentApps = await getAppsByIntent(intent.name);
    let targetApp;

    if (intent.metadata?.target !== undefined) {
      targetApp = await getApp(intent.metadata?.target);
      if (targetApp === undefined) {
        // check to see if you have been passed a specific identity for a view that should be targetted instead of an app
        let targetIdentity = await this.getTargetIdentity(
          intent.metadata?.target
        );
        if (targetIdentity !== undefined) {
          console.log(
            "We were passed a view identity instead of an app entry when raising/firing an intent. We will fire the intent at that as it exists and no app entry exists with that name.: ",
            targetIdentity,
            intent
          );
          super.setIntentTarget(intent, targetIdentity);
          return {
            source: targetIdentity.name,
          };
        }
      }
    }

    if (intentApps.length === 0) {
      console.log("No apps support this intent.");
      throw new Error(NoAppsFound);
    }

    if (targetApp !== undefined && intentApps.indexOf(targetApp) > -1) {
      console.log("Assigning selected application with intent.", intent);
      intentApps = [targetApp];
    }

    if (intentApps.length === 1) {
      // handle single entry
      let intentResolver = await this.launchAppWithIntent(
        intentApps[0],
        intent
      );
      if (intentResolver === null) {
        throw Error(NoAppsFound);
      }
      return intentResolver;
    } else {
      // show menu
      // launch a new window and optionally pass the available intents as customData.apps as part of the window options
      // the window can then use raiseIntent against a specific app (the selected one). This is a very basic example.
      try {
        let userSelection = await this.launchAppPicker({
          apps: intentApps,
          intent,
        });
        if (intentApps === undefined) {
          console.warn("We should have a list of apps to search from.");
          intentApps = [];
        }
        let selectedApp = intentApps.find(
          (entry) =>
            entry.appId === userSelection.appId && entry.appId !== undefined
        );
        if (selectedApp !== null && selectedApp !== undefined) {
          let intentResolver = await this.launchAppWithIntent(
            selectedApp,
            intent
          );
          if (intentResolver === null) {
            throw Error(NoAppsFound);
          }
          return intentResolver;
        } else {
          console.error(
            "We were returned a non existent appId to launch with the intent."
          );
          throw new Error(NoAppsFound);
        }
      } catch (reason) {
        console.error("App for intent not selected/launched.", intent);
        throw new Error(ResolverTimeout);
      }
    }
  }
}
