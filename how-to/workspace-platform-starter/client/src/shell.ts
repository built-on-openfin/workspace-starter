import { getManifestCustomSettings } from "workspace-platform-starter/settings";
import { init as initAuthFlow } from "./framework/auth-flow";
import { createLogger } from "./framework/logger-provider";
import type { Logger } from "./framework/shapes/logger-shapes";
import type { PlatformProviderOptions } from "./framework/shapes/platform-shapes";

let logger: Logger;

/**
 * Initialize the shell.
 * @returns True if authentication flow is valid.
 */
export async function init(): Promise<boolean> {
	logger = createLogger("Shell");

	const customSettings = await getManifestCustomSettings();
	const isValid = await initAuthFlow(
		customSettings?.authProvider,
		async () => initProvider(customSettings.platformProvider),
		logger
	);
	if (!isValid) {
		logger.error(
			"The platform cannot startup as there was a problem with the initialization of the auth flow."
		);
	}
	return isValid;
}

/**
 * Initialize the provider for the shell.
 * @param platformSettings The platform settings.
 * @returns True if the provider was valid.
 */
async function initProvider(platformSettings: PlatformProviderOptions | undefined): Promise<boolean> {
	if (
		platformSettings?.initUrl === undefined ||
		platformSettings?.initUrl === null ||
		platformSettings?.initUrl.trim() === ""
	) {
		logger.error(
			"When using the shell you must specify an initUrl for your platform in the manifest settings in order for progress to proceed."
		);
		return false;
	}

	try {
		const mod: { init: () => Promise<boolean> } = await import(
			/* webpackIgnore: true */ platformSettings.initUrl
		);

		if (!mod?.init) {
			logger.error(
				`The specified provider module '${platformSettings.initUrl}' has no exported init function`
			);
			return false;
		}

		return await mod.init();
	} catch (err) {
		logger.error("An error occurred while trying to initialize the provider.", err);
		return false;
	}
}
