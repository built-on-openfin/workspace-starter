import type { OpenFin } from "@openfin/core";
import {
	Dock,
	type DockButton,
	type DockProvider,
	type DockProviderRegistration,
	type WorkspaceButton
} from "@openfin/workspace";
import type {
	DockButton as PlatformDockButton,
	DockProviderConfigWithIdentity
} from "@openfin/workspace-platform/client-api/src";
import * as endpointProvider from "../endpoint";
import { createLogger } from "../logger-provider";
import type { BootstrapOptions } from "../shapes/bootstrap-shapes";
import type { DockButtonTypes, DockProviderOptions } from "../shapes/dock-shapes";
import { isEmpty, isStringValue, objectClone } from "../utils";
import {
	buildButtons,
	buildWorkspaceButtons,
	DOCK_ENDPOINT_ID_GET,
	DOCK_ENDPOINT_ID_SET,
	getDockProviderOptions,
	getRegisteredButtons,
	requestStoredDockConfig,
	sendDockConfigToEndpoint,
	setDockProviderOptions,
	setRegisteredBootstrapOptions,
	setRegisteredButtons,
	subscribeToUpdates,
	unsubscribeFromUpdates
} from "./dock-shared";

/**
 * The workspace dock implementation, provided as part of the `@openfin/workspace` package. Implements the
 * `DockImplementation` interface (see dock-shapes.ts) so that dock.ts can delegate to it.
 */

const logger = createLogger("DockWorkspace");

let registration: DockProvider | undefined;
let registrationInfo: DockProviderRegistration | undefined;

/**
 * Register the dock component.
 * @param options The dock provider options.
 * @param bootstrapOptions The bootstrap options.
 * @returns The meta info from the registration.
 */
export async function register(
	options: DockProviderOptions,
	bootstrapOptions: BootstrapOptions | undefined
): Promise<DockProviderRegistration | undefined> {
	setDockProviderOptions(options);
	setRegisteredBootstrapOptions(bootstrapOptions);

	const buttons = await buildButtons();
	logger.info("Dock register about to be called.");

	registration = await buildDockProvider(buttons);

	if (registration) {
		registrationInfo = await Dock.register(registration);

		logger.info("Version:", registrationInfo);
		logger.info("Dock provider initialized");

		subscribeToUpdates(refreshDock);
	}

	return registrationInfo;
}

/**
 * Deregister the dock component.
 * @returns Nothing.
 */
export async function deregister(): Promise<void> {
	unsubscribeFromUpdates();

	registrationInfo = undefined;
	setDockProviderOptions(undefined);
	logger.info("Dock deregister about to be called.");
	return Dock.deregister();
}

/**
 * Show the dock component.
 * @returns Nothing.
 */
export async function show(): Promise<void> {
	logger.info("Dock show called.");
	return Dock.show();
}

/**
 * Minimize the dock component.
 * @returns Nothing.
 */
export async function minimize(): Promise<void> {
	logger.info("Dock minimize called.");
	return Dock.minimize();
}

/**
 * Get the identity of the workspace dock window.
 * @returns The identity of the dock window.
 */
export function getIdentity(): OpenFin.Identity {
	return { uuid: "openfin-workspace", name: "openfin-dock" };
}

/**
 * Build the dock registration.
 * @param buttons The buttons to display on the dock.
 * @returns The dock provider options.
 */
async function buildDockProvider(buttons: DockButton[]): Promise<DockProvider | undefined> {
	const dockProviderOptions = getDockProviderOptions();
	if (dockProviderOptions) {
		setRegisteredButtons(buttons);

		return {
			id: dockProviderOptions.id,
			title: dockProviderOptions.title,
			icon: dockProviderOptions.icon,
			workspaceComponents: buildWorkspaceButtons(
				Array.isArray(registration?.workspaceComponents) ? registration?.workspaceComponents : undefined
			) as WorkspaceButton[],
			disableUserRearrangement: dockProviderOptions?.disableUserRearrangement ?? false,
			buttons: objectClone(buttons)
		};
	}
}

/**
 * Refresh the dock because the color scheme or apps have changed.
 */
async function refreshDock(): Promise<void> {
	if (!isEmpty(registrationInfo)) {
		const newButtons = await buildButtons();

		if (JSON.stringify(newButtons) !== JSON.stringify(getRegisteredButtons())) {
			const dockProvider = await buildDockProvider(newButtons);
			if (dockProvider) {
				await registrationInfo.updateDockProviderConfig(dockProvider);
			}
		}
	}
}

/**
 * Implementation for getting the dock provider from persistent storage.
 * @param id The id of the dock provider to get.
 * @param defaultStorage The default method for storage.
 * @returns The loaded config.
 */
export async function loadConfig(
	id: string,
	defaultStorage: (id: string) => Promise<DockProviderConfigWithIdentity | undefined>
): Promise<DockProviderConfigWithIdentity | undefined> {
	logger.info(`Checking for custom dock storage with endpoint id: ${DOCK_ENDPOINT_ID_GET}`);
	let config: DockProviderConfigWithIdentity | undefined;

	// All the available buttons based on the configuration settings
	const availableButtons = objectClone(getRegisteredButtons() ?? []);

	if (endpointProvider.hasEndpoint(DOCK_ENDPOINT_ID_GET)) {
		// No ordering is done for an endpoint, it is the responsibility of the endpoint
		// the availableButtons are passed in the request for config so that the endpoint
		// knows all the buttons available and can perform a sorting operation like
		// we do for the default storage case
		config = await requestStoredDockConfig(id, availableButtons);
	} else {
		logger.info("Requesting dock config from default storage");
		config = await defaultStorage(id);

		// We are using default storage so we can order the default buttons based on the stored config
		if (!isEmpty(config) && !isEmpty(config.buttons)) {
			const orderedButtons = [];

			// The order the buttons are in the config is the order we want to display them
			// So find them in the available buttons and add them, removing them from the
			// available list
			for (const button of config.buttons) {
				if (isStringValue(button.id)) {
					const foundIndex = availableButtons.findIndex((b) => b.id === button.id);
					if (foundIndex >= 0) {
						orderedButtons.push(availableButtons[foundIndex]);
						availableButtons.splice(foundIndex, 1);
					}
				}
			}

			// All remaining available buttons we haven't used get added to the end of the list
			orderedButtons.push(...availableButtons);

			// We need to cast this because there is a conflict between DockButtonNames enum
			// between workspace and workspace-platform even though they are essentially the same type
			config.buttons = orderedButtons as PlatformDockButton[];
		}
	}

	if (!isEmpty(config)) {
		// Always build the workspace buttons based on the config,
		// otherwise loaded config can show buttons that it is
		// not supposed to
		config.workspaceComponents = buildWorkspaceButtons(
			Array.isArray(config.workspaceComponents) ? config.workspaceComponents : undefined
		) as WorkspaceButton[];
	}

	return config;
}

/**
 * Implementation for saving a dock provider config to persistent storage.
 * @param config The new dock config to save to persistent storage.
 * @param defaultStorage The default method for storage.
 */
export async function saveConfig(
	config: DockProviderConfigWithIdentity,
	defaultStorage: (config: DockProviderConfigWithIdentity) => Promise<void>
): Promise<void> {
	const dockProviderOptions = getDockProviderOptions();

	// we need to store the new stored config in the dockProviderOptions
	if (dockProviderOptions?.entries) {
		const orderedButtons: DockButtonTypes[] = [];

		// store the buttons in a map for fast, easy lookup
		const currentButtons = new Map<string, DockButtonTypes>();
		for (const entry of dockProviderOptions.entries) {
			currentButtons.set(entry.id, entry);
		}

		// new extract the new buttons from the config
		for (const button of config.buttons ?? []) {
			if (isStringValue(button.id)) {
				const foundButton = currentButtons.get(button.id);
				if (foundButton) {
					orderedButtons.push(foundButton);
					currentButtons.delete(button.id);
				}
			}
		}

		// add any remaining buttons that we failed to find in the config
		const remainingButtons = currentButtons.values();
		if (currentButtons.size > 0) {
			logger.warn(
				`Failed to find ${currentButtons.size} buttons in the new config, they will be appended to the end of the dock`
			);
		}
		orderedButtons.push(...remainingButtons);

		dockProviderOptions.entries = orderedButtons;
	}

	if (registration?.workspaceComponents) {
		registration.workspaceComponents = config.workspaceComponents;
	}

	logger.info(`Checking for custom dock storage with endpoint id: ${DOCK_ENDPOINT_ID_SET}`);

	if (endpointProvider.hasEndpoint(DOCK_ENDPOINT_ID_SET)) {
		logger.info("Storing dock config in custom storage");
		const success = await sendDockConfigToEndpoint(config);
		if (success) {
			logger.info(`Saved dock config with id: ${config.id} to custom storage`);
		} else {
			logger.info(`Unable to save dock config with id: ${config.id} to custom storage`);
		}
	} else {
		logger.info("Storing dock config in default storage");
		await defaultStorage(config);
	}
}
