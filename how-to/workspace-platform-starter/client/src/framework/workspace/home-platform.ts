import type { OpenFin } from "@openfin/core";
import type { HomeRegistration } from "@openfin/workspace";
import { HomeVpw } from "@openfin/workspace-platform";
import { createLogger } from "../logger-provider";
import type { HomeProviderOptions } from "../shapes/home-shapes";
import { isEmpty } from "../utils";
import { buildHomeProvider, getHomeProviderOptions, resetHomeState } from "./home-shared";

/**
 * The platform home implementation, registered through the `@openfin/workspace-platform` package using the
 * HomeVpw API. Implements the `HomeImplementation` interface (see home-shapes.ts) so that home.ts can
 * delegate to it.
 */

const logger = createLogger("HomePlatform");

/**
 * Register the home component.
 * @param options The options for the home provider.
 * @returns The registration.
 */
export async function register(options: HomeProviderOptions): Promise<HomeRegistration | undefined> {
	logger.info("Registering home using the @openfin/workspace-platform (HomeVpw) implementation.");
	// The provider shape is shared with the workspace implementation (same underlying client-api shapes).
	const provider = buildHomeProvider(options, getIdentity) as Parameters<typeof HomeVpw.register>[0];
	const registrationInfo = await HomeVpw.register(provider);

	// HomeVpw is bundled in @openfin/workspace-platform (it is not loaded from the CDN) so it reports the
	// platform (workspace-platform) version rather than a separate Workspace CDN version. The VPW
	// registration does not populate clientAPIVersion, so we backfill it with the platform version. This
	// ensures the version provider records the platform version instead of an empty value (and instead of
	// the workspace implementation's version).
	const platformVersion = registrationInfo.workspaceVersion;
	const platformRegistration = {
		...registrationInfo,
		workspaceVersion: platformVersion,
		clientAPIVersion: isEmpty(registrationInfo.clientAPIVersion)
			? platformVersion
			: registrationInfo.clientAPIVersion
	} as HomeRegistration;

	logger.info("Version:", platformRegistration);
	logger.info("Home provider initialized");
	return platformRegistration;
}

/**
 * Get the identity of the platform (HomeVpw) home window.
 * @returns The identity of the home window.
 */
export function getIdentity(): OpenFin.Identity {
	return { uuid: fin.me.identity.uuid, name: HomeVpw.HOME_VPW_WINDOW_NAME };
}

/**
 * Deregister the home component.
 * @returns Nothing.
 */
export async function deregister(): Promise<void> {
	const options = getHomeProviderOptions();
	if (!isEmpty(options)) {
		logger.info("About to call HomeVpw deregister.");
		await HomeVpw.deregister(options.id);
	}
	resetHomeState();
}

/**
 * Show the home component.
 * @returns Nothing.
 */
export async function show(): Promise<void> {
	logger.info("Show Home called.");
	return HomeVpw.show();
}

/**
 * Hide the home component.
 * @returns Nothing.
 */
export async function hide(): Promise<void> {
	logger.info("Hide Home called.");
	return HomeVpw.hide();
}
