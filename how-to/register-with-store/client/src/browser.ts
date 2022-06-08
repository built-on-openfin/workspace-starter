import { getCurrentSync, Page } from "@openfin/workspace-platform";

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
  return platform.Storage.deletePage(pageId);
}

export async function launchPage(page: Page) {
  const platform = getCurrentSync();
  return platform.Browser.createWindow({
    workspacePlatform: {
      pages: [page]
    }
  });
}

export async function launchView(
  view: OpenFin.PlatformViewCreationOptions | string,
  targetIdentity?: OpenFin.Identity
) {
  const platform = getCurrentSync();
  let viewOptions: OpenFin.PlatformViewCreationOptions;
  if (typeof view === "string") {
    viewOptions = { url: view, target: null };
  } else {
    viewOptions = view;
  }
  return platform.createView(viewOptions, targetIdentity);
}
