import type { RegistrationMetaInfo } from "@openfin/workspace";
import { StorefrontVpw } from "@openfin/workspace-platform";
import { createLogger } from "../logger-provider";
import type { StorefrontProviderOptions } from "../shapes/store-shapes";
import { isEmpty } from "../utils";
import {
	buildStorefrontProvider,
	getStoreProviderOptions,
	isStorefrontConfigurationValid,
	resetStoreState,
	subscribeToFavoriteChanges,
	unsubscribeFromFavoriteChanges,
	type StorefrontButtonUpdater
} from "./store-shared";

/**
 * The platform store implementation, registered through the `@openfin/workspace-platform` package using the
 * StorefrontVpw API. Implements the `StorefrontImplementation` interface (see store-shapes.ts) so that
 * store.ts can delegate to it. StorefrontVpw is bundled in @openfin/workspace-platform (it is not loaded
 * from the CDN) so its registration reports the platform (workspace-platform) version.
 */

const logger = createLogger("StorePlatform");

let registrationInfo: Awaited<ReturnType<typeof StorefrontVpw.register>> | undefined;

/**
 * Register the store component.
 * @param options The options for the store provider.
 * @returns The registration.
 */
export async function register(
	options: StorefrontProviderOptions
): Promise<RegistrationMetaInfo | undefined> {
	logger.info(
		"Initializing the storefront provider using the @openfin/workspace-platform (StorefrontVpw) implementation"
	);
	// The provider shape is shared with the workspace implementation (same underlying client-api shapes).
	const provider = buildStorefrontProvider(options) as Parameters<typeof StorefrontVpw.register>[0];

	if (isStorefrontConfigurationValid()) {
		try {
			registrationInfo = await StorefrontVpw.register(provider, {
				windowOptions: options.storefrontWindowOptions
			});
			subscribeToFavoriteChanges(registrationInfo as unknown as StorefrontButtonUpdater);
			logger.info("Version:", registrationInfo);
			logger.info("Storefront provider initialized");
		} catch (err) {
			logger.error("An error was encountered while trying to register the content store provider", err);
		}
	}

	return registrationInfo;
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
		await StorefrontVpw.deregister(options.id);
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
	return StorefrontVpw.show();
}

/**
 * Hide the store component.
 * @returns Nothing.
 */
export async function hide(): Promise<void> {
	logger.info("Hiding the store.");
	return StorefrontVpw.hide();
}
