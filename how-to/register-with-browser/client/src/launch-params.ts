import type { BrowserScenarioId } from "./browser-scenarios";

/**
 * Launch configuration passed from the launcher platform to the runtime platform.
 */
export interface BrowserExampleLaunchParams {
	/** Scenario to run when the runtime platform starts. */
	scenarioId: BrowserScenarioId;
	/** Whether duplicate page titles are permitted for this run. */
	allowDuplicatePageTitles: boolean;
}

/**
 * Read launch parameters from the current application's initial options.
 * @returns Launch parameters passed via startFromManifest userAppConfigArgs.
 */
export async function getBrowserExampleLaunchParamsFromApp(): Promise<
	BrowserExampleLaunchParams | undefined
> {
	const app = fin.Application.getCurrentSync();
	const appInfo = await app.getInfo();
	const args = appInfo.initialOptions?.userAppConfigArgs;
	if (!args?.scenarioId || typeof args.scenarioId !== "string") {
		return undefined;
	}
	const allowRaw = args.allowDuplicatePageTitles;
	const allowDuplicatePageTitles =
		allowRaw === "true" || (Array.isArray(allowRaw) && allowRaw.includes("true"));
	return {
		scenarioId: args.scenarioId as BrowserScenarioId,
		allowDuplicatePageTitles
	};
}
