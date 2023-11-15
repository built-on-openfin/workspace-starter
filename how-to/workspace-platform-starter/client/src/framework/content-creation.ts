import type OpenFin from "@openfin/core";
import { getCurrentSync } from "@openfin/workspace-platform";
import { createLogger } from "./logger-provider";
import { initializeModules, loadModules } from "./modules";
import * as platformSplashProvider from "./platform/platform-splash";
import type { ModuleEntry, ModuleHelpers } from "./shapes";
import type { ContentCreationProviderOptions, ContentCreationRules } from "./shapes/content-creation-shapes";
import { isEmpty } from "./utils";

const logger = createLogger("ContentCreation");
let modules: ModuleEntry<ContentCreationRules>[] = [];
let enabled = false;

/**
 * Initialize the content creation rules.
 * @param options Options for the snap provider.
 * @param helpers Helpers to pass to the modules.
 */
export async function init(
	options: ContentCreationProviderOptions | undefined,
	helpers: ModuleHelpers
): Promise<void> {
	if (!isEmpty(options)) {
		await platformSplashProvider.updateProgress("Content Creation Rules");
		logger.info("Initializing");

		modules = await loadModules<ContentCreationRules>(options, "contentCreation");

		if (modules.length > 0) {
			enabled = true;

			await initializeModules<ContentCreationRules>(modules, helpers);

			const platform = getCurrentSync();

			await platform.addListener("view-child-view-created", async (e) => {
				for (const module of modules) {
					if (module.implementation.handleViewCreated) {
						await module.implementation.handleViewCreated(platform, e);
					}
				}
			});

			await platform.addListener("view-child-window-created", async (e) => {
				for (const module of modules) {
					if (module.implementation.handleWindowCreated) {
						await module.implementation.handleWindowCreated(platform, e);
					}
				}
			});

			await platform.addListener("view-child-content-opened-in-browser", async (e) => {
				for (const module of modules) {
					if (module.implementation.handleBrowserCreated) {
						await module.implementation.handleBrowserCreated(platform, e);
					}
				}
			});

			await platform.addListener("view-child-content-blocked", async (e) => {
				for (const module of modules) {
					if (module.implementation.handleBlocked) {
						await module.implementation.handleBlocked(platform, e);
					}
				}
			});
		}
	}
}

/**
 * Are the content creation rules enabled.
 * @returns True if the rules are enabled.
 */
export function isEnabled(): boolean {
	return enabled;
}

/**
 * Populate the content creation rules.
 * @param ruleContainer An object containing content creation settings.
 * @param ruleContainer.contentCreation An object containing content creation settings.
 * @returns Nothing.
 */
export async function populateRules(ruleContainer: {
	contentCreation?: OpenFin.ContentCreationOptions;
}): Promise<void> {
	ruleContainer.contentCreation ??= { rules: [] };
	ruleContainer.contentCreation.rules ??= [];

	for (const module of modules) {
		if (module.implementation.getRules) {
			const moduleRules = await module.implementation.getRules();
			ruleContainer.contentCreation.rules.push(...moduleRules);
		}
	}
}
