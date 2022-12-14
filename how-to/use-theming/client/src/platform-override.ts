import type { ColorSchemeOptionType, WorkspacePlatformOverrideCallback } from "@openfin/workspace-platform";
import { setColorScheme } from "./themes";

export const overrideCallback: WorkspacePlatformOverrideCallback = async (WorkspacePlatformProvider) => {
	class Override extends WorkspacePlatformProvider {
		public async setSelectedScheme(schemeType: ColorSchemeOptionType) {
			await setColorScheme(schemeType);
			return super.setSelectedScheme(schemeType);
		}
	}
	return new Override();
};
