import type OpenFin from "@openfin/core";
import { getCurrentSync } from "@openfin/workspace-platform";
import { createLogger } from "./logger-provider";
import { initializeModules, loadModules } from "./modules";
import * as platformSplashProvider from "./platform/platform-splash";
import type { ContentCreationProviderOptions, ContentCreationRules } from "./shapes/content-creation-shapes";
import type { ModuleEntry, ModuleHelpers } from "./shapes/module-shapes";
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
				let attached = false;
				for (const module of modules) {
					if (module.implementation.handleViewCreated) {
						const matchingRuleIndex = await findMatchingRule(module, e);
						const viewAttached = await module.implementation.handleViewCreated(
							platform,
							e,
							matchingRuleIndex,
							attached
						);
						if (viewAttached) {
							attached = true;
						}
					}
				}
				if (!attached) {
					// The view has not been attached by any of the modules
					// so do a default behavior of attaching it to the original
					// target window
					await platform.createView(e.childOptions, e.target);
				}
			});

			await platform.addListener("view-child-window-created", async (e) => {
				for (const module of modules) {
					if (module.implementation.handleWindowCreated) {
						const matchingRuleIndex = await findMatchingRule(module, e);
						await module.implementation.handleWindowCreated(platform, e, matchingRuleIndex);
					}
				}
			});

			await platform.addListener("view-child-content-opened-in-browser", async (e) => {
				for (const module of modules) {
					if (module.implementation.handleBrowserCreated) {
						const matchingRuleIndex = await findMatchingRule(module, e);
						await module.implementation.handleBrowserCreated(platform, e, matchingRuleIndex);
					}
				}
			});

			await platform.addListener("view-child-content-blocked", async (e) => {
				for (const module of modules) {
					if (module.implementation.handleBlocked) {
						const matchingRuleIndex = await findMatchingRule(module, e);
						await module.implementation.handleBlocked(platform, e, matchingRuleIndex);
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

/**
 * See if the module has a rule which matches the one from the event.
 * @param module The module to match the rules for.
 * @param event The event to find the matching rule.
 * @returns The index of the matching rule, or -1 if it does not exist.
 */
async function findMatchingRule(
	module: ModuleEntry<ContentCreationRules>,
	event: OpenFin.WebContentsEvents.ContentCreationRulesEvent
): Promise<number> {
	let index = -1;
	if (module.implementation?.getRules && !isEmpty(event.rule)) {
		const rules = await module.implementation.getRules();
		index = rules.findIndex(
			(r) =>
				r.behavior === event.rule.behavior && JSON.stringify(r.match) === JSON.stringify(event.rule.match)
		);
	}
	return index;
}
