import type OpenFin from "@openfin/core";
import { createLogger } from "../logger-provider";
import { initializeModules, loadModules } from "../modules";
import type { WindowPositioningOptions } from "../shapes/browser-shapes";
import type { PlatformInteropOverride, PlatformInteropOverrideOptions } from "../shapes/interopbroker-shapes";
import type { ModuleDefinition, ModuleEntry, ModuleHelpers } from "../shapes/module-shapes";
import type { PlatformProviderOptions } from "../shapes/platform-shapes";
import { isEmpty } from "../utils";
import { getConstructorOverride } from "./broker/interopbroker";

const logger = createLogger("InteropProvider");
const allOverrides: OpenFin.ConstructorOverride<OpenFin.InteropBroker>[] = [];
let modules: ModuleEntry<PlatformInteropOverride, unknown, unknown, ModuleDefinition>[] = [];
let isInitialized = false;

/**
 * Initialize the interop provider.
 * @param options Options for the interop provider.
 * @param windowPositioningOptions The window positioning options for the platform.
 * @param helpers Module helpers to pass to any loaded modules.
 */
export async function init(
	options: PlatformProviderOptions | undefined,
	windowPositioningOptions: WindowPositioningOptions,
	helpers: ModuleHelpers
): Promise<void> {
	if (options) {
		const interopOverrideSettings: PlatformInteropOverrideOptions | undefined = options?.interop;
		if(!isEmpty(interopOverrideSettings)) {
			interopOverrideSettings.windowPositionOptions = windowPositioningOptions;
			interopOverrideSettings.platformRootUrl = options?.rootUrl;
		}
		if(Array.isArray(options?.interop?.modules)) {
			modules = await loadModules<PlatformInteropOverride>(options.interop, "interopOverride");
			await initializeModules<PlatformInteropOverride>(modules, helpers);
		}

		logger.info("Getting interop overrides...");
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { modules: moduleOptions, ...settings } = options?.interop ?? {};

		if(settings?.defaultBrokerStrategy === "first") {
			logger.info("Adding default interop override first");
			allOverrides.push(await getConstructorOverride(settings));
		}
		for (const interopModule of modules) {
			const interopConstructor = await interopModule.implementation.getConstructorOverride(settings);
			allOverrides.push(interopConstructor);
			logger.info(`Added interopOverride module: ${interopModule.definition.id}`);
		}
		if(settings?.defaultBrokerStrategy === "last" || isEmpty(settings?.defaultBrokerStrategy)) {
			logger.info("Adding default interop override last");
			allOverrides.push(await getConstructorOverride(settings));
		}
		logger.info("Finished setting up interop overrides.");
		isInitialized = true;
	}
}

/**
 * Returns an array of interop broker overrides to use for this platform.
 * @returns An array of interop broker overrides.
 * @throws {Error} If the interop provider has not been initialized.
 */
export function getInteropConstructorOverrides(): OpenFin.ConstructorOverride<OpenFin.InteropBroker>[] {
	if (!isInitialized) {
		throw new Error("Interop provider has not been initialized");
	}
	return allOverrides;
}

