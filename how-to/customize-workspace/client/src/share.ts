import { create, NotificationOptions, IndicatorColor } from "@openfin/workspace/notifications";
import { getCurrentSync } from "@openfin/workspace-platform";
import { PlatformStorage } from "./platform-storage";
import { getSettings } from "./settings";
import { launchPage } from "./browser";

let shareRegistered = false;
const shareStorage = new PlatformStorage("share-storage", "Shared Entries");

interface IShareCustomData {
    windowIdentity: OpenFin.Identity,
    pageId: string
}

interface IShareEntry {
    type: string,
    expires: number,
    payload: any
}

async function notifyOfSuccessfulLoad() {
    let settings = await getSettings();

    const notification:NotificationOptions = {
        expires: new Date(Date.now() + 30000),
        body: "The share request has been fetched and applied.",
        buttons: [
            {
              submit: false,
              onClick: null,
              index: 3,
              iconUrl: "",
              cta: false,
              title: "Dismiss",
              type: "button"
            }
          ],
        stream: {
          id: "share-requests",
          displayName: "Share Request",
          appId: fin.me.identity.uuid
        },
        priority: 1,
        icon: settings.browserProvider.windowOptions.icon,
        indicator: {
          color: IndicatorColor.GREEN,
          text: "Share Request Applied"
        },
        category: "share",
        title: "Share Request Applied",
        template: "markdown",
      };
      create(notification);
}

async function notifyOfSuccess(url: string, expiryInHours:number) {
    let settings = await getSettings();

    const notification:NotificationOptions = {
        expires: new Date(Date.now() + 30000),
        body: "The share request you raised has been copied to the **clipboard** and will be valid for " + expiryInHours + " hours. \n Share Url: \n\ * **" + url + "**",
        buttons: [
            {
              submit: false,
              onClick: null,
              index: 3,
              iconUrl: "",
              cta: false,
              title: "Dismiss",
              type: "button"
            }
          ],
        stream: {
          id: "share-requests",
          displayName: "Share Request",
          appId: fin.me.identity.uuid
        },
        priority: 1,
        icon: settings.browserProvider.windowOptions.icon,
        indicator: {
          color: IndicatorColor.BLUE,
          text: "Share Request Raised"
        },
        category: "share",
        title: "Share Request Raised",
        template: "markdown",
      };
      create(notification);
}

async function notifyOfFailure(body:string) {
    let settings = await getSettings();

    const notification:NotificationOptions = {
        expires: new Date(Date.now() + 30000),
        body,
        buttons: [
            {
              submit: false,
              onClick: null,
              index: 3,
              iconUrl: "",
              cta: false,
              title: "Dismiss",
              type: "button"
            }
          ],
        stream: {
          id: "share-requests",
          displayName: "Share Request",
          appId: fin.me.identity.uuid
        },
        priority: 1,
        icon: settings.browserProvider.windowOptions.icon,
        indicator: {
          color: IndicatorColor.RED,
          text: "Share Request Failed"
        },
        category: "share",
        title: "Share Request Failed",
        template: "markdown",
      };
      create(notification);
}

async function notifyOfExpiry() {
    let settings = await getSettings();

    const notification:NotificationOptions = {
        expires: new Date(Date.now() + 30000),
        body: "The share request has expired and is no longer available.",
        buttons: [
            {
              submit: false,
              onClick: null,
              index: 3,
              iconUrl: "",
              cta: false,
              title: "Dismiss",
              type: "button"
            }
          ],
        stream: {
          id: "share-requests",
          displayName: "Share Request",
          appId: fin.me.identity.uuid
        },
        priority: 1,
        icon: settings.browserProvider.windowOptions.icon,
        indicator: {
          color: IndicatorColor.RED,
          text: "Share Request Expired"
        },
        category: "share",
        title: "Share Request Expired",
        template: "markdown",
      };
      create(notification);
}

async function saveSharedPage(data: IShareCustomData) {
    let platform = getCurrentSync();
    const targetWindow = platform.Browser.wrapSync(data.windowIdentity);
    const page = await targetWindow.getPage(data.pageId);
    const bounds = await targetWindow.openfinWindow.getBounds();
    const payload = {
        type: "page",
        payload: {
            page,
            bounds
        }
    }
    await saveShareRequest(payload);
}


async function saveSharedWorkspace(data:IShareCustomData) {
    console.log("Share workspace called.", data);
    let platform = getCurrentSync();
    let snapshot = await platform.getSnapshot();
    const payload = {
        type: "workspace",
        payload: {
            snapshot
        }
    };
    await saveShareRequest(payload);
}

async function saveShareRequest(payload) {
    try {
        let uuid = window.crypto.randomUUID();
        let platform = getCurrentSync();
        let platformInfo = await platform.Application.getInfo();
        let finsLink;
        
        if(platformInfo.manifestUrl.indexOf("https") === 0) {
            finsLink = platformInfo.manifestUrl.replace("https", "fins") + "?$$shareId=" + uuid;
        } else if(platformInfo.manifestUrl.indexOf("http") === 0){
            finsLink = platformInfo.manifestUrl.replace("http", "fin") + "?$$shareId=" + uuid;
        } else {
            console.error("We do not support file based manifest launches. The manifest has to be served over http/https: ", platformInfo.manifestUrl);
            await notifyOfFailure("The share request you raised could not be generated.");
            return;
        }
        const expiryInHours = 24;
        payload.expires = Date.now() + (expiryInHours * 60000);

        let existingEntries = await shareStorage.getAllStoredEntries<IShareEntry>();
        let keys = Object.keys(existingEntries);
        let currentTimeStamp = Date.now();
        // clean up expired entries
        for(let i = 0; i < keys.length; i++) {
            let key = keys[i];
            if(existingEntries[key].expires < currentTimeStamp) {
                await shareStorage.clearStorageEntry(key);
            }
        }
        await shareStorage.saveToStorage(uuid, payload);   
        await fin.Clipboard.writeText({
            data: finsLink
        });
        await notifyOfSuccess(finsLink, expiryInHours); 
    } catch(error) {
        console.error("Error saving share request:", error);
        await notifyOfFailure("The share request you raised could not be generated.");
    }
}

async function loadSharedEntry(id:string) {
    let shareEntry = await shareStorage.getFromStorage<IShareEntry>(id);
    if(shareEntry !== undefined) {
        if(shareEntry.type === "page") {
            await launchPage(shareEntry.payload.page, shareEntry.payload.bounds);
        } else if(shareEntry.type === "workspace") {
            let platform = getCurrentSync();
            await platform.applySnapshot(shareEntry.payload.snapshot);
        } else {
            console.warn("Share entry of unknown type specified: " + shareEntry.type);
            await notifyOfFailure("The specified share link is not supported and cannot be loaded.");
            return;
        }
        await notifyOfSuccessfulLoad();
    } else {
        await notifyOfExpiry();
    }
}

async function queryOnLaunch(userAppConfigArgs) {
    console.log(userAppConfigArgs);
    loadSharedEntry(userAppConfigArgs.shareId);
}

async function queryWhileRunning(event) {
    if (event.userAppConfigArgs) {
        console.log(event.userAppConfigArgs);
        await loadSharedEntry(event.userAppConfigArgs.shareId);
    }
}

async function listenForShareRequests() {
    fin["desktop"].main(queryOnLaunch);
    let platform = getCurrentSync();
    platform.Application.addListener("run-requested", queryWhileRunning);
}

export async function register() {
    if(shareRegistered === false) {
        shareRegistered = true;
        listenForShareRequests();
    } else {
        console.warn("Share cannot be registered more than once.");
    }
}

export async function deregister() {
    if(shareRegistered) {
        // any cleanup logic can go here
        let platform = getCurrentSync();
        platform.Application.removeListener("run-requested", queryWhileRunning);
    } else {
        console.warn("Share isn't registered yet so cannot be deregistered.");
    }
}

export async function share(payload:any) {
    if(shareRegistered) {
        console.log("Share called with payload: ", payload);

        let windowIdentity = payload.windowIdentity;
        let pageId;

        let platformWorkspace = getCurrentSync();
        let currentWindow = platformWorkspace.Browser.wrapSync(windowIdentity);
        let currentPages = await currentWindow.getPages();

        currentPages.forEach(page => {
            if(page.isActive === true) {
                pageId = page.pageId;
            }
        });

        let customData:IShareCustomData = {
            windowIdentity,
            pageId
        };

        const template: OpenFin.MenuItemTemplate[] = [
            {
                label: 'Share Page',
                data: { identity: customData, type:"page" }
            },
            { type: 'separator', data:{} },
            {
                label: 'Share Workspace',
                data: { identity: customData, type:"workspace" }
            }
        ];
        currentWindow.openfinWindow.showPopupMenu({ template, x:payload.x, y:payload.y } as OpenFin.ShowPopupMenuOptions).then(async r => {
            if (r.result === 'closed') {
                console.log('share menu dismissed.');
            } else {
                if(r.data.type === "page") {
                    await saveSharedPage(r.data.identity);
                } else if(r.data.type === "workspace") {
                    await saveSharedWorkspace(r.data.identity);
                }
            }
        });

      
    } else {
        console.warn("Share cannot be triggered as it hasn't been registered yet.");
    }
}