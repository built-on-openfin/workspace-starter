import { getCurrentSync, Workspace } from "@openfin/workspace-platform";

export async function getWorkspace(workspaceId: string): Promise<Workspace> {
  const platform = getCurrentSync();
  return platform.Storage.getWorkspace(workspaceId);
}

export async function getWorkspaceIds(): Promise<string[]> {
  const platform = getCurrentSync();
  const entries = await platform.Storage.getWorkspaces();
  const ids: string[] = [];

  for (const wks of entries) {
    ids.push(wks.workspaceId);
  }

  return ids;
}

export async function getWorkspaceTitles(): Promise<string[]> {
  const platform = getCurrentSync();
  const entries = await platform.Storage.getWorkspaces();
  const titles: string[] = [];

  for (const wks of entries) {
    titles.push(wks.title);
  }

  return titles;
}

export async function getWorkspaces(): Promise<Workspace[]> {
  const platform = getCurrentSync();
  return platform.Storage.getWorkspaces();
}

export async function deleteWorkspace(workspaceId: string) {
  const platform = getCurrentSync();
  await platform.Storage.deleteWorkspace(workspaceId);
}

export async function saveWorkspace(workspaceId: string, title: string) {
  const platform = getCurrentSync();
  const snapshot = await platform.getSnapshot();
  const currentWorkspace = await platform.getCurrentWorkspace();
  const currentMetaData = currentWorkspace?.metadata;

  const workspace = {
    workspaceId,
    title,
    metadata: currentMetaData,
    snapshot
  };
  await platform.Storage.saveWorkspace(workspace);
}

export async function launchWorkspace(workspaceId: string) {
  const platform = getCurrentSync();
  const workspace = await getWorkspace(workspaceId);
  await platform.applyWorkspace(workspace);
}
