import { fin } from "@openfin/core";
import { launchPage, launchView } from "./browser";
import { init as endpointInit } from "./endpoint";
import { deregister as deregisterHome, register as registerHome, show as showHome } from "./home";
import { deregister as deregisterIntegration, register as registerIntegration } from "./integrations";
import { launchSnapshot } from "./launch";
import { deregister as deregisterNotifications, register as registerNotifications } from "./notifications";
import { getSettings } from "./settings";
import { deregister as deregisterShare, register as registerShare } from "./share";
import { deregister as deregisterStore, register as registerStore, show as showStore } from "./store";

export async function init() {
  // you can kick off your bootstrapping process here where you may decide to prompt for authentication,
  // gather reference data etc before starting workspace and interacting with it.
  console.log("Initialising the bootstrapper");
  const settings = await getSettings();
  let workspaceLoaded = false;
  const setupHome = settings?.bootstrap?.home ?? true;
  const setupStore = settings?.bootstrap?.store ?? true;
  const setupNotifications = settings?.bootstrap?.notifications ?? true;
  await endpointInit();
  if (setupHome) {
    // only register search logic once workspace is running
    await registerHome();
    workspaceLoaded = true;
    await showHome();
  }

  if (setupStore) {
    await registerStore();
    if (!workspaceLoaded) {
      await showStore();
    }
  }

  if (setupNotifications) {
    await registerNotifications();
  }

  await registerShare();

  await registerIntegration(
    {
      rootUrl: settings?.platformProvider.rootUrl,
      launchView,
      launchPage,
      launchSnapshot: async (manifestUrl) =>
        launchSnapshot({
          manifestType: "snapshot",
          manifest: manifestUrl,
          appId: "",
          title: "",
          icons: null,
          publisher: null
        }),
      openUrl: async (url) => fin.System.openUrlWithBrowser(url),
      showHome
    },
    settings.integrationProvider
  );

  const providerWindow = fin.Window.getCurrentSync();
  await providerWindow.once("close-requested", async (event) => {
    await deregisterIntegration(settings.integrationProvider);

    await deregisterStore();
    await deregisterHome();
    await deregisterShare();
    await deregisterNotifications();
    await fin.Platform.getCurrentSync().quit();
  });
}
