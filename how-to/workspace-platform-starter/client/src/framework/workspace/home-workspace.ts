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
	const registrationInfo = await Home.register(buildHomeProvider(options));
	logger.info("Version:", registrationInfo);
	logger.info("Home provider initialized");
	return registrationInfo;
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
