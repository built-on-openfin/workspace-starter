import {
	closeOpenFinRVM,
	launchOpenFinRVM,
	tempProfileDirCreate,
	waitForDevToolsPort,
	waitForPortFree
} from "@openfin/automation-core";
import { loadOpenFinConfig } from "./openfin.cdp-config";

/**
 * Launch OpenFin with a CDP endpoint before the Playwright run. When the manifest
 * is local, Playwright's `webServer` (see playwright.config.ts) has already served
 * it by this point. Env is inherited by worker processes spawned after this.
 */
export default async function globalSetup(): Promise<void> {
	const config = await loadOpenFinConfig();

	await closeOpenFinRVM(false);
	await waitForPortFree(config.devToolsPort);

	const tempDataDir = await tempProfileDirCreate();
	await launchOpenFinRVM(
		config.manifestUrl,
		config.devToolsPort,
		config.storageFolder,
		false,
		tempDataDir,
		config.workspaceVersion,
		config.notificationsVersion,
		undefined
	);

	await waitForDevToolsPort(config.devToolsPort, 90000);
}
