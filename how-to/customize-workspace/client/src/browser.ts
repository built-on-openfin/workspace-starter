import {
  BrowserCreateWindowRequest,
  BrowserOverrideCallback,
  CreateSavedPageRequest,
  CreateSavedWorkspaceRequest,
  getCurrentSync,
  OpenGlobalContextMenuPayload,
  OpenPageTabContextMenuPayload,
  OpenViewTabContextMenuPayload,
  Page,
  UpdateSavedPageRequest,
  UpdateSavedWorkspaceRequest,
  Workspace
} from "@openfin/workspace-platform";

import { getDefaultToolbarButtons } from "./buttons";
import { getGlobalMenu, getPageMenu, getViewMenu } from "./menu";
import { PlatformStorage } from "./platform-storage";
import { getSettings } from "./settings";

const pageBoundsStorage = new PlatformStorage("page-bounds", "Page Bounds");

async function savePageBounds(pageId: string) {
  const bounds = await getPageBounds(pageId);

  await pageBoundsStorage.saveToStorage<OpenFin.Bounds>(pageId, bounds);
}

async function deletePageBounds(pageId: string) {
  await pageBoundsStorage.clearStorageEntry(pageId);
}

export async function getPage(pageId: string) {
  const platform = getCurrentSync();
  return platform.Storage.getPage(pageId);
}

export async function getPages() {
  const platform = getCurrentSync();
  return platform.Storage.getPages();
}

export async function deletePage(pageId: string) {
  const platform = getCurrentSync();
  await deletePageBounds(pageId);
  return platform.Storage.deletePage(pageId);
}

export async function getPageBounds(pageId: string, fromStorage = false): Promise<OpenFin.Bounds> {
  let bounds = null;

  if (fromStorage) {
    bounds = await pageBoundsStorage.getFromStorage<OpenFin.Bounds>(pageId);
  } else {
    const platform = getCurrentSync();
    const pages = await platform.Browser.getAllAttachedPages();
    let windowId;

    pages.forEach((page) => {
      if (page.pageId === pageId) {
        windowId = page.parentIdentity;
      }
    });

    if (windowId !== undefined) {
      const hostWindow = platform.Browser.wrapSync(windowId);

      bounds = await hostWindow.openfinWindow.getBounds();
    }
  }
  return bounds;
}

export async function launchPage(page: Page, bounds?: OpenFin.Bounds) {
  const customBounds = bounds || (await pageBoundsStorage.getFromStorage<OpenFin.Bounds>(page.pageId));
  const platform = getCurrentSync();
  const newWindow: BrowserCreateWindowRequest = {
    workspacePlatform: {
      pages: [page]
    }
  };

  if (customBounds !== undefined && customBounds !== null) {
    const monitors = await fin.System.getMonitorInfo();

    newWindow.height = customBounds.height;
    newWindow.width = customBounds.width;
    newWindow.defaultHeight = customBounds.height;
    newWindow.defaultWidth = customBounds.width;

    if (monitors.virtualScreen !== undefined) {
      if (monitors.virtualScreen.left !== undefined && customBounds.left >= monitors.virtualScreen.left) {
        newWindow.x = customBounds.left;
        newWindow.defaultLeft = customBounds.left;
      }

      if (monitors.virtualScreen.top !== undefined && customBounds.top >= monitors.virtualScreen.top) {
        newWindow.y = customBounds.top;
        newWindow.defaultTop = customBounds.top;
      }
    }
  }

  return platform.Browser.createWindow(newWindow);
}

export async function launchView(
  view: OpenFin.PlatformViewCreationOptions | string,
  targetIdentity?: OpenFin.Identity
) {
  const platform = getCurrentSync();
  let viewOptions;
  if (typeof view === "string") {
    viewOptions = { url: view };
  } else {
    viewOptions = view;
  }
  return platform.createView(viewOptions, targetIdentity);
}

export async function getDefaultWindowOptions() {
  const settings = await getSettings();

  return {
    icon: settings.browserProvider.windowOptions?.icon,
    workspacePlatform: {
      pages: null,
      title: settings.browserProvider.windowOptions?.title,
      favicon: settings.browserProvider.windowOptions?.icon,
      newTabUrl: settings.browserProvider.windowOptions?.newTabUrl,
      newPageUrl: settings.browserProvider.windowOptions?.newPageUrl,
      toolbarOptions: {
        buttons: await getDefaultToolbarButtons()
      }
    }
  };
}

export const overrideCallback: BrowserOverrideCallback = async (WorkspacePlatformProvider) => {
  class Override extends WorkspacePlatformProvider {
    async getSnapshot(...args: [undefined, OpenFin.ClientIdentity]) {
      const snapshot = await super.getSnapshot(...args);
      return snapshot;
    }

    async applySnapshot(...args: [OpenFin.ApplySnapshotPayload, OpenFin.ClientIdentity]) {
      await super.applySnapshot(...args);
    }

    async getSavedWorkspaces(query?: string): Promise<Workspace[]> {
      // you can add your own custom implementation here if you are storing your workspaces
      // in non-default location (e.g. on the server instead of locally)
      return super.getSavedWorkspaces(query);
    }

    async getSavedWorkspace(id: string): Promise<Workspace> {
      // you can add your own custom implementation here if you are storing your workspaces
      // in non-default location (e.g. on the server instead of locally)
      return super.getSavedWorkspace(id);
    }

    async createSavedWorkspace(req: CreateSavedWorkspaceRequest): Promise<void> {
      // you can add your own custom implementation here if you are storing your workspaces
      // in non-default location (e.g. on the server instead of locally)
      return super.createSavedWorkspace(req);
    }

    async updateSavedWorkspace(req: UpdateSavedWorkspaceRequest): Promise<void> {
      // you can add your own custom implementation here if you are storing your workspaces
      // in non-default location (e.g. on the server instead of locally)
      return super.updateSavedWorkspace(req);
    }

    async deleteSavedWorkspace(id: string): Promise<void> {
      // you can add your own custom implementation here if you are storing your workspaces
      // in non-default location (e.g. on the server instead of locally)
      return super.deleteSavedWorkspace(id);
    }

    async getSavedPages(query?: string): Promise<Page[]> {
      // you can add your own custom implementation here if you are storing your pages
      // in non-default location (e.g. on the server instead of locally)
      return super.getSavedPages(query);
    }

    async getSavedPage(id: string): Promise<Page> {
      // you can add your own custom implementation here if you are storing your pages
      // in non-default location (e.g. on the server instead of locally)
      return super.getSavedPage(id);
    }

    async createSavedPage(req: CreateSavedPageRequest): Promise<void> {
      // you can add your own custom implementation here if you are storing your pages
      // in non-default location (e.g. on the server instead of locally)
      await savePageBounds(req.page.pageId);

      super.createSavedPage(req);
    }

    async updateSavedPage(req: UpdateSavedPageRequest): Promise<void> {
      // you can add your own custom implementation here if you are storing your pages
      // in non-default location (e.g. on the server instead of locally)
      await savePageBounds(req.pageId);
      super.updateSavedPage(req);
    }

    async deleteSavedPage(id: string): Promise<void> {
      // you can add your own custom implementation here if you are storing your pages
      // in non-default location (e.g. on the server instead of locally)
      deletePageBounds(id);
      super.deleteSavedPage(id);
    }

    async openGlobalContextMenu(req: OpenGlobalContextMenuPayload, callerIdentity: OpenFin.Identity) {
      return super.openGlobalContextMenu(
        {
          ...req,
          template: await getGlobalMenu(req.template)
        },
        callerIdentity
      );
    }

    async openViewTabContextMenu(req: OpenViewTabContextMenuPayload, callerIdentity: OpenFin.Identity) {
      return super.openViewTabContextMenu(
        {
          ...req,
          template: await getViewMenu(req.template)
        },
        callerIdentity
      );
    }

    async openPageTabContextMenu(req: OpenPageTabContextMenuPayload, callerIdentity: OpenFin.Identity) {
      return super.openPageTabContextMenu(
        {
          ...req,
          template: await getPageMenu(req.template)
        },
        callerIdentity
      );
    }

    async quit(payload, callerIdentity) {
      return super.quit(payload, callerIdentity);
    }
  }
  return new Override();
};
