import { getCurrentSync, Page } from '@openfin/workspace-platform';

export async function openUrl(url: string) {
    const platform = getCurrentSync();
    const windowIdentity = await platform.Browser.getLastFocusedWindow();
    await platform.createView({ url, target: null }, windowIdentity);
}