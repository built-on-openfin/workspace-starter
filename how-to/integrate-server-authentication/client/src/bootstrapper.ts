import { fin } from "@openfin/core";
import { init as authenticationInit } from "./auth";
import { getSettings } from "./settings";

export async function init() {
  console.log("Initialising the bootstrapper");

  const providerWindow = fin.Window.getCurrentSync();

  providerWindow.once("close-requested", async () => {
    await fin.Platform.getCurrentSync().quit();
  });

  const splashVisible = Date.now();

  const closeSplash = async (minTimeToShow) => {
    const remaining = minTimeToShow - (Date.now() - splashVisible);
    setTimeout(async () => {
      (await fin.Window.getCurrent()).hide();
    }, remaining);
  };

  const settings = await getSettings();

  await authenticationInit(
    settings?.auth,
    async (authenticationState) => {
      if (authenticationState === "logging-in") {
        // The auth is showing the login page, so hide the "splash" screen platform window
        await closeSplash(3000);
      } else if (authenticationState === "authenticated") {
        await closeSplash(1000);

        // The authentication is complete so launch the full app
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
      } else {
        // The app has logged out so quit the platform
        (await fin.Platform.getCurrent()).quit();
      }
    }
  );
}
