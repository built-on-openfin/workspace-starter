import { BrowserSnapshot, getCurrentSync } from "@openfin/workspace-platform";
import { PlatformStorage } from "./platform-storage";

export interface ISavedWorkspace {
  id: string;
  title: string;
  description?: string;
  snapshot: BrowserSnapshot;
}

const workspaceStorage = new PlatformStorage("workspace", "workspace");

export async function getWorkspace(workspaceId: string): Promise<ISavedWorkspace> {
  return workspaceStorage.getFromStorage<ISavedWorkspace>(workspaceId);
}

export async function getWorkspaceIds(): Promise<string[]> {
  const entries = await workspaceStorage.getAllStoredEntries();
  return Object.keys(entries);
}

export async function getWorkspaceTitles(): Promise<string[]> {
  const entries = await workspaceStorage.getAllStoredEntries<ISavedWorkspace>();
  const keys = Object.keys(entries);
  const titles: string[] = [];
  for (let i = 0; i < keys.length; i++) {
    titles.push(entries[keys[i]].title);
  }
  return titles;
}

export async function getWorkspaces(): Promise<ISavedWorkspace[]> {
  const entries = await workspaceStorage.getAllStoredEntries<ISavedWorkspace>();
  return Object.values(entries);
}

export async function deleteWorkspace(workspaceId: string) {
  await workspaceStorage.clearStorageEntry(workspaceId);
}

export async function saveWorkspace(workspaceId: string, title: string, description?: string) {
  const plat = getCurrentSync();
  const snapshot = await plat.getSnapshot();
  const workspaceToSave: ISavedWorkspace = {
    id: workspaceId,
    title,
    description,
    snapshot
  };

  await workspaceStorage.saveToStorage<ISavedWorkspace>(workspaceId, workspaceToSave);
}

export async function launchWorkspace(workspaceId: string) {
  const workspace = await workspaceStorage.getFromStorage<ISavedWorkspace>(workspaceId);
  if (workspace?.snapshot !== undefined) {
    const platform = fin.Platform.getCurrentSync();
    await platform.applySnapshot(workspace.snapshot, { closeExistingWindows: true });
  } else {
    console.error(`Error: workspace Id did not have a snapshot: ${workspaceId}`);
  }
}
