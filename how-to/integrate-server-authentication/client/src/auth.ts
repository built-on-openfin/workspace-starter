import { AuthSettings } from "./shapes";

let authSettings: AuthSettings;
let authenticatedCallback: (authenticationState: "logging-in" | "authenticated" | "logged-out") => Promise<void>

export async function init(
  settings: AuthSettings,
  authenticatedCb: (authenticationState: "logging-in" | "authenticated" | "logged-out") => Promise<void>
) {
  authenticatedCallback = authenticatedCb;

  authSettings = settings;
  if (!authSettings) {
    throw new Error("Error: Settings missing cannot continue");
  }

  await checkLoggedIn();
}

async function checkLoggedIn() {
  const authWin = await fin.Window.create({
    name: "integrate-with-sso-auth",
    autoShow: true,
    frame: false,
    resizable: false,
    defaultCentered: true,
    defaultHeight: 700,
    defaultWidth: 600,
    includeInSnapshots: false,
    showTaskbarIcon: true,
    saveWindowState: false,
    cornerRounding: {
      width: 10,
      height: 10
    },
    url: authSettings.appUrl
  });

  let completePoll;
  let isShown = false;
  const cleanupWindow = async (isManualClose) => {
    if (completePoll) {
      clearInterval(completePoll);
      completePoll = undefined;
    }
    if (authWin) {
      const win = authWin;

      await win.removeAllListeners();
      if (!isManualClose) {
        await win.close(true);
      }
    }
  };

  completePoll = setInterval(async () => {
    const hasLoginUrl = await checkForUrl(authWin, authSettings.loginUrl);
    if (hasLoginUrl) {
      if (!isShown) {
        isShown = true;
        await authenticatedCallback("logging-in");
        await authWin.show();
      }
    } else {
      const hasAppUrl = await checkForUrl(authWin, authSettings.appUrl);
      if (hasAppUrl) {
        await cleanupWindow(false);
        await authenticatedCallback("authenticated");
      }
    }
  }, 100);

  authWin.addListener("closed", async () => {
    if (authWin) {
      await cleanupWindow(true);
      await authenticatedCallback("logged-out");
    }
  });
}


async function checkForUrl(win: OpenFin.Window, url: string): Promise<URL | undefined> {
  if (!win) {
    return undefined;
  }

  const winInfo = await win.getInfo();
  const isCompleteUrl = winInfo.url.includes(url);

  if (isCompleteUrl) {
    return new URL(winInfo.url);
  }

  return undefined;
}
