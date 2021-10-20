import { init as initSearch } from './search';
import { start as startWorkspace } from './workspace';

export async function init() {
    // you can kick off your bootstrapping process here where you may decide to prompt for authentication, 
    // gather reference data etc before starting workspace and interacting with it.
    console.log("Initialising the bootstrapper");
    await startWorkspace();
    // only register search logic once workspace is running
    await initSearch();
}