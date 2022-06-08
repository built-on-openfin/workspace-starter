import { register as registerHome, show as showHome, deregister as deregisterHome } from "./home";
import { fin } from "openfin-adapter/src/mock";

export async function init() {
  // you can kick off your bootstrapping process here where you may decide to prompt for authentication,
  // gather reference data etc before starting workspace and interacting with it.
  console.log("Initialising the bootstrapper");

  await registerHome();
  await showHome();

  const providerWindow = fin.Window.getCurrentSync();
  providerWindow.once("close-requested", async (event) => {
    await deregisterHome();
    fin.Platform.getCurrentSync().quit();
  });
}
