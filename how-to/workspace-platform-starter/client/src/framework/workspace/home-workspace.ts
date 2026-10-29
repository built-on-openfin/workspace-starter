import type { OpenFin } from "@openfin/core";
import { Home, type HomeRegistration } from "@openfin/workspace";
import { createLogger } from "../logger-provider";
import type { HomeProviderOptions } from "../shapes/home-shapes";
import { isEmpty } from "../utils";
import { buildHomeProvider, getHomeProviderOptions, resetHomeState } from "./home-shared";

/**
 * The workspace home implementation, registered through the `@openfin/workspace` package. Implements the
 * `HomeImplementation` interface (see home-shapes.ts) so that home.ts can delegate to it.
 */

const logger = createLogger("HomeWorkspace");

/**
 * Register the home component.
 * @param options The options for the home provider.
 * @returns The registration.
 */
export async function register(options: HomeProviderOptions): Promise<HomeRegistration | undefined> {
	logger.info("Registering home using the @openfin/workspace implementation.");
	const registrationInfo = await Home.register(buildHomeProvider(options, getIdentity));
	logger.info("Version:", registrationInfo);
	logger.info("Home provider initialized");
	return registrationInfo;
}

/**
 * Get the identity of the workspace home window.
 * @returns The identity of the home window.
 */
export function getIdentity(): OpenFin.Identity {
	return { uuid: "openfin-workspace", name: "openfin-home" };
}

/**
 * Deregister the home component.
 * @returns Nothing.
 */
export async function deregister(): Promise<void> {
	const options = getHomeProviderOptions();
	if (!isEmpty(options)) {
		logger.info("About to call Home deregister.");
		await Home.deregister(options.id);
	}
	resetHomeState();
}

/**
 * Show the home component.
 * @returns Nothing.
 */
export async function show(): Promise<void> {
	logger.info("Show Home called.");
	return Home.show();
}

/**
 * Hide the home component.
 * @returns Nothing.
 */
export async function hide(): Promise<void> {
	logger.info("Hide Home called.");
	return Home.hide();
}
