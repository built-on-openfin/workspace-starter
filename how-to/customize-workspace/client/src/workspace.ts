import { getCurrentSync  } from '@openfin/workspace-platform';
import { PlatformStorage } from './platform-storage';

export interface ISavedWorkspace {
    id:string,
    title:string,
    description?:string,
    snapshot:any
}

const workspaceStorage = new PlatformStorage("workspace","workspace");

export async function getWorkspace(workspaceId:string):Promise<ISavedWorkspace> {
    return workspaceStorage.getFromStorage<ISavedWorkspace>(workspaceId);
}

export async function getWorkspaceIds(): Promise<string[]>{
    let entries = await workspaceStorage.getAllStoredEntries();
    return Object.keys(entries);
}

export async function getWorkspaceTitles(): Promise<string[]>{
    let entries = await workspaceStorage.getAllStoredEntries<ISavedWorkspace>();
    let keys = Object.keys(entries);
    let titles = [];
    for(let i = 0; i < keys.length; i++) {
        titles.push(entries[keys[i]].title);
    }
    return titles;
}

export async function getWorkspaces():Promise<ISavedWorkspace[]> {
    let entries = await workspaceStorage.getAllStoredEntries<ISavedWorkspace>();
    return Object.values(entries);
}

export async function deleteWorkspace(workspaceId:string) {
    await workspaceStorage.clearStorageEntry(workspaceId);
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

    await workspaceStorage.saveToStorage<ISavedWorkspace>(workspaceId, workspaceToSave);
}

export async function launchWorkspace(workspaceId:string){
    let workspace = await workspaceStorage.getFromStorage<ISavedWorkspace>(workspaceId);
    if(workspace !== undefined && workspace.snapshot !== undefined){
        let platform = fin.Platform.getCurrentSync();
        await platform.applySnapshot(workspace.snapshot, {  closeExistingWindows : true})
    } else {
        console.error("Error: workspace Id did not have a snapshot: " + workspaceId);
    }
}