import type { DockProviderRegistration } from "@openfin/workspace";
import { createLogger } from "../logger-provider";
import type { BootstrapOptions } from "../shapes/bootstrap-shapes";
import type { DockImplementation, DockProviderOptions } from "../shapes/dock-shapes";
import { isEmpty } from "../utils";
import * as dock1 from "./dock1";
import * as dock3 from "./dock3";

/**
 * Facade for the dock component. Delegates to the v1 (dock1.ts) or v3 (dock3.ts) implementation
 * based on `dockProviderOptions.dockType`, so callers (bootstrapper.ts, platform.ts) don't need to
 * know which dock version is active. See dock-shared.ts for the logic shared by both implementations.
 */

export { loadConfig, saveConfig } from "./dock1";

const logger = createLogger("Dock");

let activeImplementation: DockImplementation | undefined;
let registrationInfo: DockProviderRegistration | undefined;

/**
 * Register the dock component.
 * @param options The dock provider options.
 * @param bootstrapOptions The bootstrap options.
 * @returns The meta info from the registration.
 */
export async function register(
	options: DockProviderOptions | undefined,
	bootstrapOptions?: BootstrapOptions
): Promise<DockProviderRegistration | undefined> {
	if (isEmpty(activeImplementation) && options) {
		const implementation: DockImplementation = options.dockType === "3" ? dock3 : dock1;

		registrationInfo = await implementation.register(options, bootstrapOptions);
		activeImplementation = implementation;
	}

	return registrationInfo;
}

/**
 * Deregister the dock component.
 * @returns Nothing.
 */
export async function deregister(): Promise<void> {
	if (isEmpty(activeImplementation)) {
		logger.warn("Unable to deregister dock as there is an indication it was never registered");
		return;
	}

	const implementation = activeImplementation;
	activeImplementation = undefined;
	registrationInfo = undefined;
	return implementation.deregister();
}

/**
 * Show the dock component.
 * @returns Nothing.
 */
export async function show(): Promise<void> {
	if (activeImplementation) {
		return activeImplementation.show();
	}
	logger.warn("Unable to show dock as there is an indication it was never registered");
}

/**
 * Minimize the dock component.
 * @returns Nothing.
 */
export async function minimize(): Promise<void> {
	if (activeImplementation) {
		return activeImplementation.minimize();
	}
	logger.warn("Unable to minimize dock as there is an indication it was never registered");
}
