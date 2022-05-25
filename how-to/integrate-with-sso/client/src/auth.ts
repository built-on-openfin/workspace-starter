import { logInformation } from "./provider";
import * as auth0 from "auth0-js";

const STORAGE_REALM = "integrate-with-sso";
const STORE_AUTH_TOKEN = "token";
const AUTH_DOMAIN = "open-fin-starter.us.auth0.com";
const AUTH_CLIENT_ID = "F1Z7zuhH0c39EgYpJBqwVcysn0HhrSNv";
const COMPLETE_LOGIN_URL = "http://localhost:8080/platform/login-complete.html";
const COMPLETE_LOGOUT_URL = "http://localhost:8080/platform/logout-complete.html";

let authLoginWin: OpenFin.Window;
let authLogoutWin: OpenFin.Window;
let authToken: string;

export async function init() {
  logInformation("Initialising the authentication");

  const btnLogin = document.querySelector("#btnLogin");
  btnLogin.addEventListener("click", async () => {
    if (!authLoginWin) {
      logInformation("Login page was manually opened");
      await showLoginPage();
    }
  });

  const btnLogout = document.querySelector("#btnLogout");
  btnLogout.addEventListener("click", async () => {
    if (!authLoginWin) {
      logInformation("Logout page was manually opened");
      await showLogoutPage();
    }
  });

  logInformation("Checking for existing token");

  const token = await loadToken();
  if (!token) {
    logInformation("Token does not exist, show login page");
    await showLoginPage();
  }

  updateLoginButtonState();
  updateLogoutButtonState();
}

async function loadToken(): Promise<string | null> {
  return window.localStorage.getItem(`${STORAGE_REALM}/${STORE_AUTH_TOKEN}`);
}

async function saveToken(token: string): Promise<void> {
  window.localStorage.setItem(`${STORAGE_REALM}/${STORE_AUTH_TOKEN}`, token);
}

async function deleteToken(): Promise<void> {
  window.localStorage.removeItem(`${STORAGE_REALM}/${STORE_AUTH_TOKEN}`);
}

async function showLoginPage() {
  const webAuth = new auth0.WebAuth({
    domain: AUTH_DOMAIN,
    clientID: AUTH_CLIENT_ID
  });

  const authUrl = webAuth.client.buildAuthorizeUrl({
    redirectUri: COMPLETE_LOGIN_URL,
    responseType: "token",
    nonce: crypto.randomUUID()
  });

  updateLoginButtonState(true);
  authLoginWin = await fin.Window.create({
    name: window.crypto.randomUUID(),
    alwaysOnTop: true,
    maximizable: false,
    minimizable: false,
    autoShow: true,
    defaultCentered: true,
    defaultHeight: 700,
    defaultWidth: 600,
    includeInSnapshots: false,
    resizable: false,
    saveWindowState: false,
    showTaskbarIcon: false,
    url: authUrl
  });

  let completePoll;

  const cleanupWindow = async (isManualClose) => {
    logInformation(isManualClose
      ? "Login page was manually closed"
      : "Complete page was detected closing login window"
    );
    await authLoginWin.removeAllListeners();
    if (!isManualClose) {
      await authLoginWin.close(true);
    }
    authLoginWin = undefined;
    updateLoginButtonState(false);
    if (completePoll) {
      clearInterval(completePoll);
      completePoll = undefined;
    }
  };

  authLoginWin.addListener("closed", async () => {
    if (authLoginWin) {
      await cleanupWindow(true);
    }
  });

  completePoll = setInterval(async () => {
    const authenticatedResultOrError = await checkAuthenticationResult(authLoginWin, COMPLETE_LOGIN_URL);

    console.log(authenticatedResultOrError);

    if (authenticatedResultOrError) {
      if (authenticatedResultOrError.err) {
        await deleteToken();
        authToken = undefined;
      } else if (authenticatedResultOrError.err) {
        authToken = authenticatedResultOrError.result.accessToken;
        await saveToken(authToken);
      }
      updateLogoutButtonState();
      logInformation(JSON.stringify(authenticatedResultOrError));
      await cleanupWindow(false);
    }
  }, 1000);
}

async function showLogoutPage() {
  const webAuth = new auth0.WebAuth({
    domain: AUTH_DOMAIN,
    clientID: AUTH_CLIENT_ID
  });

  const authUrl = webAuth.client.buildLogoutUrl({
    returnTo: COMPLETE_LOGOUT_URL
  });

  updateLogoutButtonState(true);
  authLogoutWin = await fin.Window.create({
    name: window.crypto.randomUUID(),
    alwaysOnTop: true,
    maximizable: false,
    minimizable: false,
    autoShow: true,
    defaultCentered: true,
    defaultHeight: 700,
    defaultWidth: 600,
    includeInSnapshots: false,
    resizable: false,
    saveWindowState: false,
    showTaskbarIcon: false,
    url: authUrl
  });

  let completePoll;

  const cleanupWindow = async (isManualClose) => {
    logInformation(isManualClose
      ? "Logout page was manually closed"
      : "Complete page was detected closing logout window"
    );
    await authLogoutWin.removeAllListeners();
    if (!isManualClose) {
      await authLogoutWin.close(true);
    }
    authLogoutWin = undefined;
    updateLogoutButtonState(false);
    if (completePoll) {
      clearInterval(completePoll);
      completePoll = undefined;
    }
  };

  authLogoutWin.addListener("closed", async () => {
    if (authLogoutWin) {
      await cleanupWindow(true);
    }
  });

  completePoll = setInterval(async () => {
    const authenticatedResult = await checkAuthenticationResult(authLogoutWin, COMPLETE_LOGOUT_URL);

    if (authenticatedResult) {
      await deleteToken();
      updateLogoutButtonState();
      logInformation(JSON.stringify(authenticatedResult));
      await cleanupWindow(false);
    }
  }, 1000);

}

async function checkAuthenticationResult(win: OpenFin.Window, url: string): Promise<{
  result?: auth0.Auth0DecodedHash;
  err?: auth0.Auth0Error;
} | undefined> {
  if (!win) {
    return undefined;
  }

  const winInfo = await win.getInfo();
  const isCompleteUrl = winInfo.url.includes(url);

  if (isCompleteUrl) {
    const webAuth = new auth0.WebAuth({
      domain: AUTH_DOMAIN,
      clientID: AUTH_CLIENT_ID
    });
    return new Promise<{
      result?: auth0.Auth0DecodedHash;
      err?: auth0.Auth0Error;
    }>((resolve) => {
      webAuth.parseHash({ hash: new URL(winInfo.url).hash }, (err, result) => {
        resolve({ result, err });
      })
    });
  }

  return undefined;
}

function updateLoginButtonState(forceDisabled?: boolean) {
  const btnLogin = document.querySelector<HTMLButtonElement>("#btnLogin");
  btnLogin.disabled = authLoginWin !== undefined || forceDisabled;
}

function updateLogoutButtonState(forceDisabled?: boolean) {
  const btnLogout = document.querySelector<HTMLButtonElement>("#btnLogout");
  btnLogout.disabled = authLogoutWin !== undefined || forceDisabled || authToken === undefined;
}