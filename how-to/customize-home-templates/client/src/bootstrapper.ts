import { fin } from "openfin-adapter/src/mock";
import { register, deregister } from "./home";
import { getSettings } from "./settings";
import { register as registerIntegration, deregister as deregisterIntegration } from "./integrations";

export async function init() {
  // you can kick off your bootstrapping process here where you may decide to prompt for authentication,
  // gather reference data etc before starting workspace and interacting with it.
  console.log("Initialising the bootstrapper");
  const settings = await getSettings();

  await register();

  await registerIntegration(
    {
      openUrl: (url) => fin.System.openUrlWithBrowser(url)
    },
    settings.integrationProvider
  );

  const providerWindow = fin.Window.getCurrentSync();
  providerWindow.once("close-requested", async (event) => {
    await deregisterIntegration(settings.integrationProvider);
    await deregister();
    fin.Platform.getCurrentSync().quit();
  });
}
