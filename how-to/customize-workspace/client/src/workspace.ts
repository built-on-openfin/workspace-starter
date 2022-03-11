import { getCurrentSync  } from '@openfin/workspace-platform';

export interface ISavedWorkspace {
    id:string,
    title:string,
    description?:string,
    snapshot:any
}

const storeKey = fin.me.identity.uuid + "-snapshot-store";

async function getFromStore(id:string):Promise<ISavedWorkspace> {
    if(id === undefined) {
        return null;
    } else {
        let store = await getAllStoredEntries();
        let savedEntry = store[id];
        if(savedEntry === undefined) {
            return null;
        }
        return savedEntry;
    }
}

async function saveToStore(entry:ISavedWorkspace) {
    if(entry == undefined) {
        console.error("You need to provide a id for the workspace entry you wish to save.");
    } else {
        let store = await getAllStoredEntries();

        store[entry.id] = entry;

        localStorage.setItem(storeKey, JSON.stringify(store));
    }
}

async function getAllStoredEntries() : Promise<{ [key:string]: ISavedWorkspace }>{
    let store = localStorage.getItem(storeKey);
    if(store === null) {
        return {};
    }

    return JSON.parse(store);
}

async function clearStoreEntry(id:string) {
    if(id === undefined) {
       console.error("An id to clear the saved workspace was not provided.");
    } else {
        let store = await getAllStoredEntries();
        let entry = store[id];

        if(entry !== undefined) {
            delete store[id];
            localStorage.setItem(storeKey, JSON.stringify(store));
        } else {
            console.error("You tried to delete a non-existent workspace");
        }
    }
}


export async function getWorkspace(workspaceId:string):Promise<ISavedWorkspace> {
    return getFromStore(workspaceId);
}

export async function getWorkspaceIds(): Promise<string[]>{
    let entries = await getAllStoredEntries();
    return Object.keys(entries);
}

export async function getWorkspaceTitles(): Promise<string[]>{
    let entries = await getAllStoredEntries();
    let keys = Object.keys(entries);
    let titles = [];
    for(let i = 0; i < keys.length; i++) {
        titles.push(entries[keys[i]].title);
    }
    return titles;
}

export async function getWorkspaces():Promise<ISavedWorkspace[]> {
    let entries = await getAllStoredEntries();
    return Object.values(entries);
}

export async function deleteWorkspace(workspaceId:string) {
    clearStoreEntry(workspaceId);
}

export async function saveWorkspace(workspaceId: string, title: string, description?:string) {
    let plat = getCurrentSync();
    let snapshot = await plat.getSnapshot();
    let workspaceToSave:ISavedWorkspace = {
        id:workspaceId,
        title,
        description,
        snapshot
    };

    await saveToStore(workspaceToSave);
}

export async function launchWorkspace(workspaceId:string){
    let workspace = await getFromStore(workspaceId);
    if(workspace !== undefined && workspace.snapshot !== undefined){
        let platform = fin.Platform.getCurrentSync();
        await platform.applySnapshot(workspace.snapshot, {  closeExistingWindows : true})
    } else {
        console.error("Error: workspace Id did not have a snapshot: " + workspaceId);
    }
}