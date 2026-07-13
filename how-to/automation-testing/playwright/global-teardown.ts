import { closeOpenFinRVM } from "@openfin/automation-core";

/**
 * Stop the OpenFin runtime after the Playwright run. The local fixture platform,
 * if started, is torn down by Playwright's `webServer` handling.
 */
export default async function globalTeardown(): Promise<void> {
	await closeOpenFinRVM(false);
}
