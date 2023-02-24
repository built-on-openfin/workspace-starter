import type OpenFin from "@openfin/core";
import {
	ColorSchemeOptionType,
	getCurrentSync,
	WorkspacePlatformOverrideCallback
} from "@openfin/workspace-platform";
import { setColorScheme, updateBrowserWindowButtonsColorScheme } from "./themes";

export const overrideCallback: WorkspacePlatformOverrideCallback = async (WorkspacePlatformProvider) => {
	class Override extends WorkspacePlatformProvider {
		public async createWindow(
			options: OpenFin.PlatformWindowCreationOptions,
			identity?: OpenFin.Identity
		): Promise<OpenFin.Window> {
			const window = await super.createWindow(options, identity);

			try {
				const platform = getCurrentSync();
				const browserWindow = platform.Browser.wrapSync(window.identity);
				await updateBrowserWindowButtonsColorScheme(browserWindow);
			} catch {
				// Probably not a browser window
			}

			return window;
		}

		public async setSelectedScheme(schemeType: ColorSchemeOptionType) {
			await setColorScheme(schemeType);
			return super.setSelectedScheme(schemeType);
		}
	}
	return new Override();
};
