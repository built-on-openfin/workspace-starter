import type OpenFin from "@openfin/core";
import type { WorkspacePlatformProvider } from "@openfin/workspace-platform";
import type { BrowserProviderOptions } from "workspace-platform-starter/shapes/browser-shapes";
import { getApps } from "../apps";
import { createLogger } from "../logger-provider";
import { initializeModules, loadModules } from "../modules";
import type { ModuleDefinition, ModuleEntry } from "../shapes/module-shapes";
import type {
	PlatformOverride,
	PlatformOverrideHelpers,
	PlatformProviderOptions
} from "../shapes/platform-shapes";
const logger = createLogger("PlatformProvider");
const allOverrides: OpenFin.ConstructorOverride<WorkspacePlatformProvider>[] = [];
let modules: ModuleEntry<PlatformOverride, unknown, unknown, ModuleDefinition>[] = [];
let isInitialized = false;

/**
 * Initialize the platform provider.
 * @param options Options for the platform provider.
 * @param browserOptions Options for the browser that the platform should consider
 * @param helpers Module helpers to pass to any loaded modules.
 */
export async function init(
	options: PlatformProviderOptions | undefined,
	browserOptions: BrowserProviderOptions,
	helpers: PlatformOverrideHelpers
): Promise<void> {
	if (options && !isInitialized) {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars

		const moduleOptions = options?.modules;
		// interop broker will need access to all apps where as general modules
		// have access to public apps and will need the specific appId or intent
		// if they want to read/launch them.
		const platformOverrideHelpers: PlatformOverrideHelpers = {
			...helpers,
			getApps
		};

		if (Array.isArray(moduleOptions)) {
			modules = await loadModules<PlatformOverride>(options, "platformOverride");
			await initializeModules<PlatformOverride>(modules, platformOverrideHelpers);
		}

		logger.info("Getting platform overrides...");

		for (const platformModule of modules) {
			const platformConstructor = await platformModule.implementation.getConstructorOverride({
				platformProviderOptions: options,
				browserProviderOptions: browserOptions
			});
			allOverrides.push(platformConstructor);
			logger.info(`Added platformOverride module: ${platformModule.definition.id}`);
		}
		logger.info("Finished setting up interop overrides.");
		isInitialized = true;
	}
}

/**
 * Returns an array of platform overrides to use for this platform.
 * @returns An array of platform overrides.
 * @throws {Error} If the platform provider has not been initialized.
 */
export function getPlatformConstructorOverrides(): OpenFin.ConstructorOverride<WorkspacePlatformProvider>[] {
	if (!isInitialized) {
		throw new Error("Platform provider has not been initialized");
	}
	return allOverrides;
}
