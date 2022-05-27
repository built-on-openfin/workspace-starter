import * as auth0 from "auth0-js";
import { AuthSettings } from "./shapes";

const STORAGE_REALM = "integrate-with-sso";
const STORE_ACCESS_TOKEN = "token";
const STORE_AUTH_STATE = "state";

let authSettings: AuthSettings;
let authWin: OpenFin.Window;
let authenticatedCallback: (isAuthenticated: boolean, userInfo?: auth0.Auth0UserProfile) => Promise<void>
let busyCallback: (isBusy: boolean) => Promise<void>
let informationCallback: (info: string) => void

export async function init(
  settings: AuthSettings,
  authenticatedCb: (isAuthenticated: boolean, userInfo?: auth0.Auth0UserProfile) => Promise<void>,
  busyCb: (isBusy: boolean) => Promise<void>,
  informationCb: (info: string) => void
) {
  authenticatedCallback = authenticatedCb;
  busyCallback = busyCb;
  informationCallback = informationCb;

  informationCallback("Initialising the authentication");

  authSettings = settings;
  if (!authSettings) {
    informationCallback("Error: Settings missing cannot continue");
    return;
  }

  informationCallback("Checking for existing token");
  const accessToken = loadProperty(STORE_ACCESS_TOKEN);
  if (!accessToken) {
    informationCallback("Access token does not exist, show login page");
    await login();
  } else {
    const userInfo = await checkTokenValidity(accessToken);
    if (!userInfo) {
      informationCallback("Access token not valid, show login page");
      await login();
    } else {
      informationCallback("Access token valid, show application");
      await authenticatedCallback(true, userInfo);
    }
  }
}

function createWebAuth(): { webAuth: auth0.WebAuth, state: string } {
  let state = loadProperty(STORE_AUTH_STATE);
  if (!loadProperty(STORE_AUTH_STATE)) {
    state = crypto.randomUUID();
    saveProperty(STORE_AUTH_STATE, state);
  }

  return {
    webAuth: new auth0.WebAuth({
      domain: authSettings.domain,
      clientID: authSettings.clientId,
      responseType: "token"
    }),
    state
  };
}

function loadProperty(propName: string): string {
  return window.localStorage.getItem(`${STORAGE_REALM}/${propName}`);
}

function saveProperty(propName: string, value: string): void {
  window.localStorage.setItem(`${STORAGE_REALM}/${propName}`, value);
}

function removeProperty(propName: string): void {
  window.localStorage.removeItem(`${STORAGE_REALM}/${propName}`);
}

async function checkTokenValidity(accessToken: string): Promise<auth0.Auth0UserProfile | undefined> {
  await busyCallback(true);

  return new Promise<auth0.Auth0UserProfile>(resolve => {
    informationCallback("Check session token is valid");
    const { webAuth } = createWebAuth();
    webAuth.client.userInfo(accessToken, async (err, userInfo) => {
      await busyCallback(false);
      if (err) {
        informationCallback("Check session failed");
        informationCallback(err.original?.message ?? err.description);
        resolve(undefined);
      } else {
        informationCallback("Check session success");
        resolve(userInfo);
      }
    });
  });
}

export async function login() {
  const { webAuth, state } = createWebAuth();

  const authUrl = webAuth.client.buildAuthorizeUrl({
    redirectUri: authSettings.loginUrl,
    responseType: "token",
    state
  });

  removeProperty(STORE_ACCESS_TOKEN);

  await busyCallback(true);

  authWin = await showWindow(authUrl);

  let completePoll;

  const cleanupWindow = async (isManualClose) => {
    informationCallback(isManualClose
      ? "Login page was manually closed"
      : "Login complete page was detected closing login window"
    );
    if (completePoll) {
      clearInterval(completePoll);
      completePoll = undefined;
    }
    if (authWin) {
      const win = authWin;
      authWin = undefined;

      await win.removeAllListeners();
      if (!isManualClose) {
        await win.close(true);
      }
    }
    await busyCallback(false);
  };

  authWin.addListener("closed", async () => {
    if (authWin) {
      await cleanupWindow(true);
    }
  });

  completePoll = setInterval(async () => {
    const winUrl = await checkForUrl(authWin, authSettings.loginUrl);

    if (winUrl) {
      const authenticatedResultOrError = await checkAuthenticationResult(winUrl);

      if (authenticatedResultOrError.err) {
        informationCallback(authenticatedResultOrError.err.description ?? authenticatedResultOrError.err.original?.message);
        removeProperty(STORE_ACCESS_TOKEN);
      } else if (authenticatedResultOrError.result) {
        informationCallback(`Access token: ${authenticatedResultOrError.result.accessToken}`);
        saveProperty(STORE_ACCESS_TOKEN, authenticatedResultOrError.result.accessToken);
      }

      await cleanupWindow(false);

      if (authenticatedResultOrError.result) {
        informationCallback("Authenticated, show application");

        webAuth.client.userInfo(authenticatedResultOrError.result.accessToken, async (err, userInfo) => {
          if (err) {
            informationCallback("Get userInfo failed");
            informationCallback(err.original?.message ?? err.description);
            await authenticatedCallback(false);
          } else {
            informationCallback("Get userInfo success");
            await authenticatedCallback(true, userInfo);
          }
        });
      }
    }
  }, 100);
}

export async function logout() {
  const { webAuth } = createWebAuth();

  const authUrl = webAuth.client.buildLogoutUrl({
    returnTo: authSettings.logoutUrl
  });

  await busyCallback(true);
  authWin = await showWindow(authUrl);

  let completePoll;

  const cleanupWindow = async (isManualClose) => {
    informationCallback(isManualClose
      ? "Logout page was manually closed"
      : "Logout complete page was detected closing logout window"
    );
    if (completePoll) {
      clearInterval(completePoll);
      completePoll = undefined;
    }
    if (authWin) {
      const win = authWin;
      authWin = undefined;

      await win.removeAllListeners();
      if (!isManualClose) {
        await win.close(true);
      }
    }
    await busyCallback(false);
  };

  authWin.addListener("closed", async () => {
    if (authWin) {
      await cleanupWindow(true);
    }
  });

  completePoll = setInterval(async () => {
    const winUrl = await checkForUrl(authWin, authSettings.logoutUrl);

    if (winUrl) {
      removeProperty(STORE_ACCESS_TOKEN);
      removeProperty(STORE_AUTH_STATE);
      await cleanupWindow(false);
      await authenticatedCallback(false);
    }
  }, 100);
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

async function checkAuthenticationResult(url: URL): Promise<{
  result?: auth0.Auth0DecodedHash;
  err?: auth0.Auth0Error;
} | undefined> {
  return new Promise<{
    result?: auth0.Auth0DecodedHash;
    err?: auth0.Auth0Error;
  }>((resolve) => {
    const { webAuth, state } = createWebAuth();
    webAuth.parseHash({ hash: url.hash, state }, (err, result) => {
      resolve({ result, err });
    })
  });
}

async function showWindow(url: string): Promise<OpenFin.Window> {
  return fin.Window.create({
    name: "integrate-with-sso-auth",
    alwaysOnTop: true,
    maximizable: false,
    minimizable: false,
    autoShow: true,
    defaultCentered: true,
    defaultHeight: 700,
    defaultWidth: 600,
    includeInSnapshots: false,
    resizable: false,
    showTaskbarIcon: false,
    saveWindowState: false,
    url
  });
}