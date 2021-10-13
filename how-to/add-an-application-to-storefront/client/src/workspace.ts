import { fin } from 'openfin-adapter/src/mock';

function getWorkspace() {
  let platform = fin.Platform.wrapSync({ uuid: UUID });
  return platform;
}

async function isWorkspaceRunning() {
  return getWorkspace().Application.isRunning();
}

async function launchOpenFinWorkspace() {
    console.log("Launching Workspace.");
    return fin.System.launchManifest(
        "fins://system-apps/workspace"
    );
}

export async function start(): Promise<boolean> {
  console.log("Initialising workspace.");
  if (await isWorkspaceRunning()) {
    console.log("Workspace already running and initialised.");
    return true;
  }

  return new Promise<boolean>(async (resolve) => {
    getWorkspace().once("platform-api-ready", async () => {
        console.log("Workspace is now ready and initialised.");
        resolve(true);
    });
    await launchOpenFinWorkspace();
    isWorkspaceRunning().then(async (isRunning) => {
      if (isRunning) {
        console.log("Workspace status. Is running and initialised: " + isRunning);
        resolve(isRunning);
      }
    });
  });
}

export const UUID = "openfin-browser";
