import type { OpenFin } from "@openfin/core";
import type { DockProviderRegistration } from "@openfin/workspace";
import { createLogger } from "../logger-provider";
import type { BootstrapOptions } from "../shapes/bootstrap-shapes";
import type { DockImplementation, DockProviderOptions } from "../shapes/dock-shapes";
import { isEmpty } from "../utils";
import * as dockPlatform from "./dock-platform";
import * as dockWorkspace from "./dock-workspace";

/**
 * Facade for the dock component. Delegates to the workspace (dock-workspace.ts) or platform
 * (dock-platform.ts) implementation based on `dockProviderOptions.dockType`, so callers
 * (bootstrapper.ts, platform.ts) don't need to know which dock version is active. See dock-shared.ts
 * for the logic shared by both implementations.
 */

export { loadConfig, saveConfig } from "./dock-workspace";

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
		const implementation: DockImplementation = options.dockType === "platform" ? dockPlatform : dockWorkspace;

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

/**
 * Get the identity of the dock window for the active implementation.
 * @returns The identity of the dock window, or undefined if the dock was never registered.
 */
export function getIdentity(): OpenFin.Identity | undefined {
	return activeImplementation?.getIdentity();
}
