import type { OpenFin } from "@openfin/core";
import { Storefront, type RegistrationMetaInfo, type StoreRegistration } from "@openfin/workspace";
import { createLogger } from "../logger-provider";
import type { StorefrontProviderOptions } from "../shapes/store-shapes";
import { isEmpty } from "../utils";
import {
	buildStorefrontProvider,
	getStoreProviderOptions,
	isStorefrontConfigurationValid,
	resetStoreState,
	subscribeToFavoriteChanges,
	unsubscribeFromFavoriteChanges
} from "./store-shared";

/**
 * The workspace store implementation, registered through the `@openfin/workspace` package. Implements the
 * `StorefrontImplementation` interface (see store-shapes.ts) so that store.ts can delegate to it.
 */

const logger = createLogger("StoreWorkspace");

let registrationInfo: StoreRegistration | undefined;

/**
 * Register the store component.
 * @param options The options for the store provider.
 * @returns The registration.
 */
export async function register(
	options: StorefrontProviderOptions
): Promise<RegistrationMetaInfo | undefined> {
	logger.info("Initializing the storefront provider using the @openfin/workspace implementation");
	const provider = buildStorefrontProvider(options, getIdentity);

	if (isStorefrontConfigurationValid()) {
		try {
			registrationInfo = await Storefront.register(provider);
			subscribeToFavoriteChanges(registrationInfo);
			logger.info("Version:", registrationInfo);
			logger.info("Storefront provider initialized");
		} catch (err) {
			logger.error("An error was encountered while trying to register the content store provider", err);
		}
	}

	return registrationInfo;
}

/**
 * Get the identity of the workspace store window.
 * @returns The identity of the store window.
 */
export function getIdentity(): OpenFin.Identity {
	return { uuid: "openfin-workspace", name: "openfin-storefront" };
}

/**
 * Deregister the store component.
 * @returns Nothing.
 */
export async function deregister(): Promise<void> {
	if (isEmpty(registrationInfo)) {
		logger.warn(
			"Unable to call store deregister as there is an indication it was never registered successfully."
		);
		return;
	}

	logger.info("About to deregister Store.");
	unsubscribeFromFavoriteChanges();
	const options = getStoreProviderOptions();
	if (!isEmpty(options)) {
		await Storefront.deregister(options.id);
	}
	registrationInfo = undefined;
	resetStoreState();
}

/**
 * Show the store component.
 * @returns Nothing.
 */
export async function show(): Promise<void> {
	logger.info("Showing the store.");
	return Storefront.show();
}

/**
 * Hide the store component.
 * @returns Nothing.
 */
export async function hide(): Promise<void> {
	logger.info("Hiding the store.");
	return Storefront.hide();
}
