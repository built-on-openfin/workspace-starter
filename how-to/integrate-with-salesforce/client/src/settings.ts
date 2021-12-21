import { fin } from 'openfin-adapter/src/mock';
import { CustomSettings } from './shapes';

let settings:CustomSettings;

async function getConfiguredSettings(): Promise<CustomSettings> {
    const app = await fin.Application.getCurrent();
    const { customSettings } = await app.getManifest();  
    return customSettings;
}

export async function getSettings(): Promise<CustomSettings> {
    if(settings === undefined) {
        settings = await getConfiguredSettings();
    }
    return settings;
}