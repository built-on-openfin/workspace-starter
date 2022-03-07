import { getCurrentSync } from "@openfin/workspace-platform";
import { fin } from 'openfin-adapter/src/mock';

let windowIdentity: OpenFin.Identity;

export async function launchView(url: string) {
  const platform = getCurrentSync();
  let createWindow = true;
  if (windowIdentity) {
    const childWindows = await fin.Application.getCurrentSync().getChildWindows();
    const existingWindow = childWindows.find((window) => window.identity.name === windowIdentity.name);
    if (existingWindow) {
      createWindow = false;
    }
  }
  if (createWindow) {
    windowIdentity = (await platform.createWindow({
      defaultHeight: 700,
      defaultWidth: 1200,
      layout: {
        content: [
          {
            type: "stack",
            content: [],
          },
        ],
      },
    })).identity;
  }
  
  const salesforceLwcPreloadScript: OpenFin.PreloadScript = {
    url: `${window.location.origin}/js/preload.js`
  };
  await platform.createView({ preloadScripts: [salesforceLwcPreloadScript], target: null, url }, windowIdentity);
}
