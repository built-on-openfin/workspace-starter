import type OpenFin from "@openfin/core";
import { createLogger } from "./logger-provider";
import type { HeadlessProviderOptions } from "./shapes/headless-shapes";
import type { ModuleDefinition } from "./shapes/module-shapes";

const logger = createLogger("HeadlessProvider");

async function launchHeadlessEntry(headlessEntry: ModuleDefinition<OpenFin.WindowOptions>) {
	try {
		logger.info(`Launching headless window with id ${headlessEntry.id}`);
		const windowOptions: OpenFin.WindowOptions & { backgroundThrottling?: boolean } = {
			url: headlessEntry.url,
			name: headlessEntry.id,
			autoShow: false,
			includeInSnapshots: false,
			showTaskbarIcon: false,
			backgroundThrottling: false,
			...headlessEntry.data
		};
		await fin.Window.create(windowOptions);
	} catch (error) {
		logger.error(`Error launching headless window with id ${headlessEntry.id}`, error);
	}
}
export async function init(options?: HeadlessProviderOptions) {
	if (!Array.isArray(options?.modules) || options?.modules?.length === 0) {
		logger.info("There are no settings for the headless provider. No headless logic required.");
		return;
	}

	logger.info("Initializing Headless Provider", options);

	for (const entry of options.modules) {
		if (entry.url.endsWith(".js")) {
			logger.error(
				"Unable to process headless provider entry as current support is restricted to launching headless html pages and not headless js modules.",
				entry
			);
		} else if (entry.enabled ?? true) {
			await launchHeadlessEntry(entry as ModuleDefinition<OpenFin.WindowOptions>);
		}
	}
}
