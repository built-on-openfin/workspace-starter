import { createLogger } from "./logger-provider";
import { ModuleDefinition } from "./module-shapes";
import { HeadlessProviderOptions } from "./shapes";

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
		return await fin.Window.create(windowOptions);
	} catch (error) {
		logger.error(`Error launching headless window with id ${headlessEntry.id}`, error);
		return null;
	}
}
export async function init(options?: HeadlessProviderOptions) {
	if (options?.modules === undefined || options?.modules?.length === 0) {
		logger.info("There are no settings for the headless provider. No headless logic required.");
		return;
	}

	logger.info("Initializing Headless Provider", options);

	const numberOfModules = options?.modules?.length ?? 0;

	for (let i = 0; i < numberOfModules; i++) {
		if (options.modules[i].url.endsWith(".js")) {
			logger.error(
				"Unable to process headless provider entry as current support is restricted to launching headless pages and not headless modules.",
				options.modules[i]
			);
		} else if (options.modules[i].enabled ?? true) {
			await launchHeadlessEntry(options.modules[i] as ModuleDefinition<OpenFin.WindowOptions>);
		}
	}
}
