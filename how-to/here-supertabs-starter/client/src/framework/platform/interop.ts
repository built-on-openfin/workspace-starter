import type OpenFin from "@openfin/core";
import { getApps } from "../apps";
import { createLogger } from "../logger-provider";
import { initializeModules, loadModules } from "../modules";
import type { WindowPositioningOptions } from "../shapes/browser-shapes";
import type {
	PlatformInteropBrokerHelpers,
	PlatformInteropOverride,
	PlatformInteropOverrideOptions
} from "../shapes/interopbroker-shapes";
import type { ModuleDefinition, ModuleEntry, ModuleHelpers } from "../shapes/module-shapes";
import type { PlatformProviderOptions } from "../shapes/platform-shapes";
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
	if (options && !isInitialized) {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { modules: moduleOptions, ...settings } = options?.interop ?? {};
		const interopOverrideSettings: PlatformInteropOverrideOptions | undefined = settings;

		interopOverrideSettings.windowPositionOptions = windowPositioningOptions;
		interopOverrideSettings.platformRootUrl = options?.rootUrl;
		interopOverrideSettings.intentOptions = {
			intentTimeout: 15000,
			...options?.interop?.intentOptions
		};
		interopOverrideSettings.intentResolver = interopOverrideSettings?.intentResolver ?? {
			fdc3InteropApi: "2.0",
			url: `${options.rootUrl}/common/windows/intents/instance-picker.html`,
			title: "Intent Resolver"
		};
		interopOverrideSettings.openOptions = {
			openStrategy: "fdc3",
			...interopOverrideSettings?.openOptions
		};

		// interop broker will need access to all apps where as general modules
		// have access to public apps and will need the specific appId or intent
		// if they want to read/launch them.
		const platformInteropBrokeHelpers: PlatformInteropBrokerHelpers = {
			...helpers,
			getApps
		};

		if (Array.isArray(moduleOptions)) {
			modules = await loadModules<PlatformInteropOverride>(options.interop, "interopOverride");
			await initializeModules<PlatformInteropOverride>(modules, platformInteropBrokeHelpers);
		}

		logger.info("Getting interop overrides...");

		for (const interopModule of modules) {
			const interopConstructor =
				await interopModule.implementation.getConstructorOverride(interopOverrideSettings);
			allOverrides.push(interopConstructor);
			logger.info(`Added interopOverride module: ${interopModule.definition.id}`);
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
