import { NativeWindowIntegrationClient } from '@openfin/native-window-integration-client';
import asset from '@openfin/native-window-integration-client/lib/provider.zip';
import { getAppsByTag } from './apps';

let nwiClient:NativeWindowIntegrationClient;

async function init() {
    let nwiApps = await getAppsByTag(["native", "nwi"], true);
    let configuration = [];

    nwiApps.forEach(app => {
        if(app["data"] !== undefined && app["data"]["nwi"] !== undefined) {
            configuration.push(app["data"]["nwi"]);
        }
    });

    if(configuration.length > 0) {
        // we can keep checking to see if nwi apps are added to the list.
        console.log("NWI compatible apps specified: ", configuration);
        try {
            nwiClient = await NativeWindowIntegrationClient.create({local: false, url: asset, configuration, mockConnection:false });
            console.log('Native Window Integration Client connected successfully!');
        } catch (err){
            console.log('Native Window Integration Client not connected successfully', err);
        }
    }
}

export async function decorateSnapshot(snapshot:OpenFin.Snapshot): Promise<OpenFin.Snapshot> {
    if(nwiClient === undefined) {
        await init();
    }
    try {
        const snapshotWithNativeWindows = await nwiClient.decorateSnapshot(snapshot);
        console.log('Native Window Integration sucessfully decorated snapshot.');
        return snapshotWithNativeWindows;
    } catch (error) {
        console.error('Native Window Integration failed to decorate snapshot, returning undecorated snapshot.', error);
        return snapshot;
    }
}

export async function applyDecoratedSnapshot(snapshot: OpenFin.Snapshot) {
    try {
        if(nwiClient === undefined) {
            await init();
        }
        const info = await nwiClient.applySnapshot(snapshot);
        console.log("Native Window Integration applied snapshot", info);
    } catch (error) {
        console.error('Native Window Integration error applying native snapshot:', error);
    }
}
