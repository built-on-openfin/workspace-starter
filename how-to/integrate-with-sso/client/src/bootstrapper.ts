import { fin } from "@openfin/core";
import { init as authenticationInit } from "./auth";

export async function init() {
  console.log("Initialising the bootstrapper");

  const providerWindow = fin.Window.getCurrentSync();

  providerWindow.once("close-requested", async () => {
    await fin.Platform.getCurrentSync().quit();
  });

  await authenticationInit();
}
