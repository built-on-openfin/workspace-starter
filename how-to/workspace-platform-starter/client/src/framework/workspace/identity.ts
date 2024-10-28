import type { OpenFin } from "@openfin/core";

const workspaceUUID: string = "openfin-workspace";

/**
 * Returns the identity of Workspace Store.
 * @returns The identity of Workspace Store.
 */
export function getStoreIdentity(): OpenFin.Identity {
	return { uuid: workspaceUUID, name: "openfin-storefront" };
}

/**
 * Returns the identity of Workspace Home.
 * @returns The identity of Workspace Home.
 */
export function getHomeIdentity(): OpenFin.Identity {
	return { uuid: workspaceUUID, name: "openfin-home" };
}

/**
 * Returns the identity of Workspace Dock.
 * @returns The identity of Workspace Dock.
 */
export function getDockIdentity(): OpenFin.Identity {
	return { uuid: workspaceUUID, name: "openfin-dock" };
}
