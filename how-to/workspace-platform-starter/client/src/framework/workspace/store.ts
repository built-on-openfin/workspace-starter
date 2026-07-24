import type { OpenFin } from "@openfin/core";
import type { RegistrationMetaInfo } from "@openfin/workspace";
import { createLogger } from "../logger-provider";
import type { StorefrontImplementation, StorefrontProviderOptions } from "../shapes/store-shapes";
import { isEmpty } from "../utils";
import * as storePlatform from "./store-platform";
import * as storeWorkspace from "./store-workspace";

/**
 * Facade for the store component. Delegates to the workspace (store-workspace.ts) or platform
 * (store-platform.ts) implementation based on `storefrontProviderOptions.storefrontType`, so callers
 * (bootstrapper.ts) don't need to know which store version is active. See store-shared.ts for the logic
 * shared by both implementations.
 */

const logger = createLogger("Store");

let activeImplementation: StorefrontImplementation | undefined;
let registrationInfo: RegistrationMetaInfo | undefined;

/**
 * Register the store component.
 * @param options The options for the store provider.
 * @returns The registration.
 */
export async function register(
	options: StorefrontProviderOptions | undefined
): Promise<RegistrationMetaInfo | undefined> {
	if (isEmpty(activeImplementation) && !isEmpty(options)) {
		const implementation: StorefrontImplementation =
			options.storefrontType === "platform" ? storePlatform : storeWorkspace;

		logger.info(`Registering the '${options.storefrontType ?? "workspace"}' store implementation.`);
		registrationInfo = await implementation.register(options);
		if (!isEmpty(registrationInfo)) {
			activeImplementation = implementation;
		}
	}

	return registrationInfo;
}

/**
 * Deregister the store component.
 * @returns Nothing.
 */
export async function deregister(): Promise<void> {
	if (isEmpty(activeImplementation)) {
		logger.warn(
			"Unable to call store deregister as there is an indication it was never registered successfully."
		);
		return;
	}

	const implementation = activeImplementation;
	activeImplementation = undefined;
	registrationInfo = undefined;
	return implementation.deregister();
}

/**
 * Show the store component.
 * @returns Nothing.
 */
export async function show(): Promise<void> {
	if (activeImplementation) {
		return activeImplementation.show();
	}
	logger.warn("Unable to show store as there is an indication it was never registered");
}

/**
 * Hide the store component.
 * @returns Nothing.
 */
export async function hide(): Promise<void> {
	if (activeImplementation) {
		return activeImplementation.hide();
	}
	logger.warn("Unable to hide store as there is an indication it was never registered");
}

/**
 * Get the identity of the store window for the active implementation.
 * @returns The identity of the store window, or undefined if the store was never registered.
 */
export function getIdentity(): OpenFin.Identity | undefined {
	return activeImplementation?.getIdentity();
}
