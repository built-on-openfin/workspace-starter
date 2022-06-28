import {
  init as workspacePlatformInit,
  BrowserInitConfig,
  BrowserCreateWindowRequest
} from "@openfin/workspace-platform";
import { getSettings } from "./settings";

export async function init() {
  console.log("Initialising platform");
  const browser: BrowserInitConfig = {
    defaultWindowOptions: await getDefaultWindowOptions()
  };

  await workspacePlatformInit({
    browser
  });
}

export async function getDefaultWindowOptions(): Promise<BrowserCreateWindowRequest> {
  const settings = await getSettings();

  return {
    icon: settings.browserProvider.windowOptions?.icon,
    workspacePlatform: {
      pages: [],
      favicon: settings.browserProvider.windowOptions?.icon
    }
  };
}
