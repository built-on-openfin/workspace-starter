import { fin } from '@openfin/core';
import { CustomSettings } from './shapes';

let settings: CustomSettings;

async function getConfiguredSettings(): Promise<CustomSettings> {
    const app = await fin.Application.getCurrent();
    const manifest = await app.getManifest();

    if (manifest.customSettings !== undefined) {
        settings = manifest.customSettings;
    } else {
        settings = {};
    }

    return settings;
}

export async function getSettings(): Promise<CustomSettings> {
    if (settings === undefined) {
        settings = await getConfiguredSettings();
    }
    return settings;
}