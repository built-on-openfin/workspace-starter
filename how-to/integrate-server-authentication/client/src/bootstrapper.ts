import { fin } from "@openfin/core";
import { getSettings } from "./settings";

export async function init() {
  console.log("Initialising the bootstrapper");

  const providerWindow = fin.Window.getCurrentSync();

  providerWindow.once("close-requested", async () => {
    await fin.Platform.getCurrentSync().quit();
  });

  const settings = await getSettings();
  setTimeout(async () => {
    // you could decide to try and animate the provider window opacity settings to make it look like it fades out if you prefer
    // for the purpose of the demo we hide it and then launch the main window
    (await fin.Window.getCurrent()).hide();
    // The server authentication is complete as the provider is loading so launch the full app
    const appWin = await fin.Window.create({
      name: "integrate-with-sso-app",
      autoShow: true,
      defaultCentered: true,
      defaultHeight: 800,
      defaultWidth: 1000,
      url: settings.auth?.appUrl
    });

    appWin.addListener("closed", async () => {
      (await fin.Platform.getCurrent()).quit();
    });
  }, 3000);
}
