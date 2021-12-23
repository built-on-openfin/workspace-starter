import { getCurrentSync } from '@openfin/workspace-platform';

let windowIdentity: OpenFin.Identity;

export async function launchView(url: string) {
    const platform = getCurrentSync();
    let createWindow = true;
    if (windowIdentity) {
        const window = fin.Window.wrapSync(windowIdentity);
        if (window) {
            createWindow = false;
        }
    }
    if (createWindow) {
        windowIdentity = await platform.createWindow({
            defaultHeight: 700,
            defaultWidth: 1200,
            layout: {
              content: [
                {
                  type: 'stack',
                  content: [],
                },
              ],
            },
          });
    }
    await platform.createView({ url, target: null }, windowIdentity);
}