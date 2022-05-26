import { fin } from "@openfin/core";
import { init as authenticationInit } from "./auth";
import { getSettings } from "./settings";

export async function init() {
  console.log("Initialising the bootstrapper");

  const providerWindow = fin.Window.getCurrentSync();

  providerWindow.once("close-requested", async () => {
    await fin.Platform.getCurrentSync().quit();
  });

  const settings = await getSettings();

  await authenticationInit(settings?.auth);
}
