import { create, NotificationOptions, IndicatorColor } from "@openfin/workspace/notifications";
import { getCurrentSync, Page } from "@openfin/workspace-platform";
import { PlatformStorage } from "./platform-storage";
import { getSettings } from "./settings";
import { launchPage } from "./browser";
import { getWorkspace } from "./workspace";
import { requestResponse } from './endpoint';

let shareRegistered = false;

export interface IShareCustomData {
    workspaceId?: string,
    windowIdentity?: OpenFin.Identity,
    pageId?: string
    page?: Page,
    bounds?: OpenFin.Bounds
}

interface IShareEntry {
    type: string,
    data: any
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

async function saveSharedPage(data: IShareCustomData ) {
    let page:Page;
    let bounds: OpenFin.Bounds;
    if(data.page !== undefined && data.bounds !== undefined) {
        page = data.page;
        bounds = data.bounds;
    } else {
        let platform = getCurrentSync();
        const targetWindow = platform.Browser.wrapSync(data.windowIdentity);
        page = await targetWindow.getPage(data.pageId);
        bounds = await targetWindow.openfinWindow.getBounds();
    }
    const payload = {
        type: "page",
        data: {
            page,
            bounds
        }
    }
    await saveShareRequest(payload);
}


async function saveSharedWorkspace(workspaceId?:string) {
    let snapshot = null;

    if(workspaceId === undefined) {
        let platform = getCurrentSync();
        snapshot = await platform.getSnapshot();
    } else {
        let savedWorkspace = await getWorkspace(workspaceId);
        if(savedWorkspace !== null) {
            snapshot = savedWorkspace.snapshot;
        }
    }

    if(snapshot === null || snapshot === undefined) {
        await notifyOfFailure("Unable to action your workspace share request.");
    } else {
        const payload = {
            type: "workspace",
            data: {
                snapshot
            }
        };
        await saveShareRequest(payload);
    }
}

async function saveShareRequest(payload) {
    try {
        
        const expiryInHours = 24;
        let response = await requestResponse<any, { url: string, id?:string }>("share-save", payload);   
        let id = response.id;
        if(id === undefined) {
            let indexOfId = response.url.lastIndexOf("/");
            if(indexOfId !== -1) {                
                id = response.url.substring(indexOfId + 1);
            }
        }

        if(id === undefined) {
            await notifyOfFailure("The share request you raised could not be generated.");
            return;
        }

        let platform = getCurrentSync();
        let platformInfo = await platform.Application.getInfo();
        let finsLink;
        
        if(platformInfo.manifestUrl.indexOf("http") === 0){
            finsLink = platformInfo.manifestUrl.replace("http", "fin") + "?$$shareId=" + id;
        } else {
            console.error("We do not support file based manifest launches. The manifest has to be served over http/https: ", platformInfo.manifestUrl);
            await notifyOfFailure("The share request you raised could not be generated.");
            return;
        }

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
    try {
        let shareEntry = await requestResponse<{id:string}, IShareEntry>("share-get", { id });
        if(shareEntry !== undefined && shareEntry !== null) {
            if(shareEntry.type === "page") {
                await launchPage(shareEntry.data.page, shareEntry.data.bounds);
            } else if(shareEntry.type === "workspace") {
                let platform = getCurrentSync();
                await platform.applySnapshot(shareEntry.data.snapshot);
            } else {
                console.warn("Share entry of unknown type specified: " + shareEntry.type);
                await notifyOfFailure("The specified share link is not supported and cannot be loaded.");
                return;
            }
            await notifyOfSuccessfulLoad();
        } else {
            await notifyOfExpiry();
        }
    } catch(error) {
        console.error("There has been an error trying to load and apply the share link.", error);
        await notifyOfFailure("The specified share link cannot be loaded.");
    }
}

async function queryOnLaunch(userAppConfigArgs) {
    console.log("Received during startup: ", userAppConfigArgs);
    if(userAppConfigArgs?.shareId !== undefined){
        loadSharedEntry(userAppConfigArgs?.shareId);
    }
}

async function queryWhileRunning(event) {
    if (event?.userAppConfigArgs !== undefined && event?.userAppConfigArgs?.shareId !== undefined) {
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

export async function showShareOptions(payload:{windowIdentity:OpenFin.Identity, x: number, y:number}) {
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

        const template: OpenFin.MenuItemTemplate[] = [
            {
                label: 'Share Page',
                data: { identity: {windowIdentity,
                    pageId}, type:"page" }
            },
            { type: 'separator', data:{} },
            {
                label: 'Share Workspace',
                data: { identity: {}, type:"workspace" }
            }
        ];
        currentWindow.openfinWindow.showPopupMenu({ template, x:payload.x, y:payload.y } as OpenFin.ShowPopupMenuOptions).then(async r => {
            if (r.result === 'closed') {
                console.log('share menu dismissed.');
            } else {
                if(r.data.type === "page") {
                    await saveSharedPage(r.data.identity);
                } else if(r.data.type === "workspace") {
                    await saveSharedWorkspace();
                }
            }
        });
    } else {
        console.warn("Share cannot be triggered as it hasn't been registered yet.");
    }
}

export async function share(options?:IShareCustomData) {
    if(shareRegistered) {
        if(options === undefined || options.workspaceId !== undefined) {
            console.log("A request to share the workspace has been raised.");
            await saveSharedWorkspace(options?.workspaceId);
        } else {
            console.log("Share called with payload: ", options);
            await saveSharedPage(options);
        }
    } else {
        console.warn("Share cannot be triggered as it hasn't been registered yet.");
    }
}