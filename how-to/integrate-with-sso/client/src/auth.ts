import { logClear, logInformation } from "./provider";
import * as auth0 from "auth0-js";
import { AuthSettings } from "./shapes";

const STORAGE_REALM = "integrate-with-sso";
const STORE_ACCESS_TOKEN = "token";
const STORE_AUTH_STATE = "state";

let authSettings: AuthSettings;
let authWin: OpenFin.Window;
let appWin: OpenFin.Window;

export async function init(settings: AuthSettings) {
  updateLoginButtonState(true);
  updateLogoutButtonState(true);
  updateAppButtonState(true);  

  authSettings = settings;
  if (!authSettings) {
    logInformation("Error: Settings missing cannot continue");
    return;
  }

  logInformation("Initialising the authentication");
  const btnClear = document.querySelector("#btnClear");
  btnClear.addEventListener("click", async () => {
    logClear();
  });

  const btnApp = document.querySelector<HTMLButtonElement>("#btnApp");
  btnApp.addEventListener("click", async () => {
    await showAppPage();
});

  const btnLogin = document.querySelector("#btnLogin");
  btnLogin.addEventListener("click", async () => {
    if (!authWin) {
      logInformation("Login page was manually opened");
      await showLoginPage();
    }
  });

  const btnLogout = document.querySelector("#btnLogout");
  btnLogout.addEventListener("click", async () => {
    if (!authWin) {
      logInformation("Logout page was manually opened");
      await showLogoutPage();
    }
  });

  logInformation("Checking for existing token");
  const accessToken = loadProperty(STORE_ACCESS_TOKEN);
  if (!accessToken) {
    logInformation("Access token does not exist, show login page");
    await showLoginPage();
  } else {
    const isValid = await checkTokenValidity(accessToken);
    if (!isValid) {
      logInformation("Access token not valid, show login page");
      await showLoginPage();
    } else {
      updateLogoutButtonState();
      logInformation("Access token valid, show application");
      await showAppPage();
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

async function checkTokenValidity(accessToken: string): Promise<boolean> {
  return new Promise<boolean>(resolve => {
    logInformation("Check session token is valid");

    const { webAuth } = createWebAuth();
    webAuth.client.userInfo(accessToken, (err) => {
      if (err) {
        logInformation("Check session failed");
        logInformation(err.original?.message ?? err.description);
        resolve(false);
      } else {
        logInformation("Check session success");
        resolve(true);
      }
    });
  });
}

async function showLoginPage() {
  const { webAuth, state } = createWebAuth();

  const authUrl = webAuth.client.buildAuthorizeUrl({
    redirectUri: authSettings.loginUrl,
    responseType: "token",
    state
  });

  removeProperty(STORE_ACCESS_TOKEN);

  updateLoginButtonState(true);
  updateLogoutButtonState(true);
  updateAppButtonState(true);
  authWin = await showWindow(authUrl, "integrate-with-sso-auth");

  let completePoll;

  const cleanupWindow = async (isManualClose) => {
    logInformation(isManualClose
      ? "Login page was manually closed"
      : "Login complete page was detected closing login window"
    );
    if (authWin) {
      await authWin.removeAllListeners();
      if (!isManualClose) {
        await authWin.close(true);
      }
      authWin = undefined;
    }
    if (completePoll) {
      clearInterval(completePoll);
      completePoll = undefined;
    }
    updateLogoutButtonState();
    updateLoginButtonState();
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
        logInformation(authenticatedResultOrError.err.description ?? authenticatedResultOrError.err.original?.message);
        removeProperty(STORE_ACCESS_TOKEN);
      } else if (authenticatedResultOrError.result) {
        logInformation(`Access token: ${authenticatedResultOrError.result.accessToken}`);
        saveProperty(STORE_ACCESS_TOKEN, authenticatedResultOrError.result.accessToken);
      }

      await cleanupWindow(false);

      if (authenticatedResultOrError.result) {
        logInformation("Authenticated, show application");
        await showAppPage();
      }
    }
  }, 100);
}

async function showLogoutPage() {
  const { webAuth } = createWebAuth();

  const authUrl = webAuth.client.buildLogoutUrl({
    returnTo: authSettings.logoutUrl
  });

  updateLoginButtonState(true);
  updateLogoutButtonState(true);
  updateAppButtonState(true);
  authWin = await showWindow(authUrl, "integrate-with-sso-auth");

  let completePoll;

  const cleanupWindow = async (isManualClose) => {
    logInformation(isManualClose
      ? "Logout page was manually closed"
      : "Logout complete page was detected closing logout window"
    );
    if (authWin) {
      await authWin.removeAllListeners();
      if (!isManualClose) {
        await authWin.close(true);
      }
      authWin = undefined;
    }
    if (completePoll) {
      clearInterval(completePoll);
      completePoll = undefined;
    }
    updateLoginButtonState();
    updateLogoutButtonState();
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
      await hideAppPage();
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

function updateLoginButtonState(forceDisabled?: boolean) {
  const btnLogin = document.querySelector<HTMLButtonElement>("#btnLogin");
  const token = loadProperty(STORE_ACCESS_TOKEN);
  btnLogin.disabled = authWin !== undefined || forceDisabled || token !== null;
}

function updateLogoutButtonState(forceDisabled?: boolean) {
  const btnLogout = document.querySelector<HTMLButtonElement>("#btnLogout");
  const token = loadProperty(STORE_ACCESS_TOKEN);
  btnLogout.disabled = authWin !== undefined || forceDisabled || token === null;
}

function updateAppButtonState(forceDisabled?: boolean) {
  const btnApp = document.querySelector<HTMLButtonElement>("#btnApp");
  const token = loadProperty(STORE_ACCESS_TOKEN);
  btnApp.disabled = appWin !== undefined || forceDisabled || token === null;
}

async function showAppPage() {
  if (!appWin) {
    appWin = await showWindow(authSettings.appUrl, "integrate-with-sso-app");

    appWin.on("closed", () => {
      appWin.removeAllListeners();
      appWin = undefined;

      updateAppButtonState();
    });

    updateAppButtonState();
  }
}

async function hideAppPage() {
  if (appWin) {
    await appWin.close(true);
  } else {
    updateAppButtonState();
  }
}

async function showWindow(url: string, id: string): Promise<OpenFin.Window> {
  return fin.Window.create({
    name: id,
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
    url
  });
}