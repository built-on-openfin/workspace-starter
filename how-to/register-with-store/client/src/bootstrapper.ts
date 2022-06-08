import { register as registerHome, show as showHome, deregister as deregisterHome } from "./home";
import { register as registerStore, show as showStore, deregister as deregisterStore } from "./store";
import { fin } from "openfin-adapter/src/mock";
import { getSettings } from "./settings";

export async function init() {
  // you can kick off your bootstrapping process here where you may decide to prompt for authentication,
  // gather reference data etc before starting workspace and interacting with it.
  console.log("Initialising the bootstrapper");
  let settings = await getSettings();
  let workspaceLoaded = false;
  let setupHome = settings?.bootstrap?.home ?? true;
  let setupStore = settings?.bootstrap?.store ?? true;

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

  const providerWindow = fin.Window.getCurrentSync();
  providerWindow.once("close-requested", async (event) => {
    await deregisterStore();
    await deregisterHome();
    fin.Platform.getCurrentSync().quit();
  });
}
