import { init as initSearch } from './search';
import { init as initStore, show as showStore } from './store';
import { start as startWorkspace } from './workspace';
import { getSettings } from './settings';

export async function init() {
    // you can kick off your bootstrapping process here where you may decide to prompt for authentication, 
    // gather reference data etc before starting workspace and interacting with it.
    console.log("Initialising the bootstrapper");
    let settings = await getSettings();
    let workspaceLoaded = false;
    let setupSearch = settings?.bootstrap?.search ?? true;
    let setupStore = settings?.bootstrap?.store ?? true;

    if(setupSearch) {
        await startWorkspace();
        workspaceLoaded = true;
        // only register search logic once workspace is running
        await initSearch();
    }

    if(setupStore) {
        await initStore();
        if(!workspaceLoaded) {
            await showStore();
        }
    }
}