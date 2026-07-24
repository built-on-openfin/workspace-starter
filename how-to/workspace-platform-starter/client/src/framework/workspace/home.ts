import type { OpenFin } from "@openfin/core";
import type { HomeRegistration } from "@openfin/workspace";
import { createLogger } from "../logger-provider";
import type { HomeImplementation, HomeProviderOptions } from "../shapes/home-shapes";
import { isEmpty } from "../utils";
import * as homePlatform from "./home-platform";
import * as homeWorkspace from "./home-workspace";

/**
 * Facade for the home component. Delegates to the workspace (home-workspace.ts) or platform
 * (home-platform.ts) implementation based on `homeProviderOptions.homeType`, so callers (bootstrapper.ts,
 * actions.ts) don't need to know which home version is active. See home-shared.ts for the search logic
 * shared by both implementations.
 */

const logger = createLogger("Home");

let activeImplementation: HomeImplementation | undefined;
let registrationInfo: HomeRegistration | undefined;

/**
 * Register the home component.
 * @param options The options for the home provider.
 * @returns The registration.
 */
export async function register(
	options: HomeProviderOptions | undefined
): Promise<HomeRegistration | undefined> {
	if (isEmpty(activeImplementation)) {
		logger.info("Initializing home");
		if (isEmpty(options) || isEmpty(options.id) || isEmpty(options.title)) {
			logger.warn(
				"Provider not configured in the customSettings of your manifest correctly. Ensure you have the homeProvider object defined in customSettings with the following defined: id, title"
			);
			return;
		}

		const implementation: HomeImplementation = options.homeType === "platform" ? homePlatform : homeWorkspace;

		logger.info(`Registering the '${options.homeType ?? "workspace"}' home implementation.`);
		registrationInfo = await implementation.register(options);
		if (!isEmpty(registrationInfo)) {
			activeImplementation = implementation;
		}
	}

	return registrationInfo;
}

/**
 * Deregister the home component.
 * @returns Nothing.
 */
export async function deregister(): Promise<void> {
	if (isEmpty(activeImplementation)) {
		logger.warn("Unable to deregister home as there is an indication it was never registered");
		return;
	}

	const implementation = activeImplementation;
	activeImplementation = undefined;
	registrationInfo = undefined;
	return implementation.deregister();
}

/**
 * Show the home component.
 * @returns Nothing.
 */
export async function show(): Promise<void> {
	if (activeImplementation) {
		return activeImplementation.show();
	}
	logger.warn("Unable to show home as there is an indication it was never registered");
}

/**
 * Hide the home component.
 * @returns Nothing.
 */
export async function hide(): Promise<void> {
	if (activeImplementation) {
		return activeImplementation.hide();
	}
	logger.warn("Unable to hide home as there is an indication it was never registered");
}

/**
 * Get the identity of the home window for the active implementation.
 * @returns The identity of the home window, or undefined if home was never registered.
 */
export function getIdentity(): OpenFin.Identity | undefined {
	return activeImplementation?.getIdentity();
}
