import { init as initAuthFlow } from "./framework/auth-flow";
import { createLogger } from "./framework/logger-provider";
import type { Logger } from "./framework/shapes/logger-shapes";
import type { PlatformProviderOptions } from "./framework/shapes/platform-shapes";

let logger: Logger;

async function initProvider(platformSettings?: PlatformProviderOptions): Promise<boolean> {
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
		const mod: { init: () => Promise<void> } = await import(
			/* webpackIgnore: true */ platformSettings.initUrl
		);

		if (!mod?.init) {
			logger.error(
				`The specified provider module '${platformSettings.initUrl}' has no exported init function`
			);
			return;
		}

		await mod.init();
	} catch (err) {
		logger.error("An error occurred while trying to initialize the provider.", err);
		return false;
	}
	return true;
}

export async function init(): Promise<void> {
	logger = createLogger("Shell");
	const isValid = await initAuthFlow(initProvider, logger);
	if (!isValid) {
		logger.error(
			"The platform cannot startup as their was a problem with the initialization of the auth flow."
		);
	}
}
