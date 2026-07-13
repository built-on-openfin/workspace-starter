import { test as base, expect } from "@playwright/test";
import { connectToWorkspace, type WorkspaceConnection } from "@openfin/automation-playwright";
import { loadOpenFinConfig } from "./openfin.cdp-config";

interface WorkspaceWorkerFixtures {
	/**
	 * A single CDP connection to the running OpenFin, with page objects for the
	 * whole Workspace (Dock, Notifications, Store, System). Bound to the Workspace
	 * provider window.
	 */
	workspace: WorkspaceConnection;
}

/**
 * Test object with a **worker-scoped** `workspace` connection.
 *
 * Each `connectToWorkspace` opens a fresh CDP connection, and repeated
 * `connectOverCDP` against an OpenFin runtime grows unreliable as more windows
 * (notification center, storefront, launched views) accumulate and their targets
 * race to complete their CDP attach. Connecting once per worker and sharing it
 * across the component specs avoids that entirely — workers is 1 and the suite is
 * serial, so one connection serves the whole run and is torn down at the end.
 */
export const test = base.extend<object, WorkspaceWorkerFixtures>({
	workspace: [
		// eslint-disable-next-line no-empty-pattern
		async ({}, use) => {
			const { devToolsPort } = await loadOpenFinConfig();
			const connection = await connectToWorkspace(devToolsPort);
			await use(connection);
			// Close only the CDP connection; global teardown stops the runtime.
			await connection.browser.close();
		},
		{ scope: "worker" }
	]
});

export { expect };
