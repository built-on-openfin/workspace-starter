import {
	DEVTOOLS_HOST,
	fetchJson,
	loadConfig,
	type OpenFinConfig,
	type OpenFinManifest
} from "@openfin/automation-helpers";

/**
 * The environment under test, shared by the launch script and the specs.
 */

/**
 * Settings for the Enterprise Browser suite.
 */
export interface EnterpriseBrowserSettings {
	/**
	 * The Enterprise Browser manifest to launch. Selects the environment.
	 */
	manifestUrl: string;

	/**
	 * The DevTools port configured for the suite (cli.devToolsPort).
	 */
	devToolsPort: number;

	/**
	 * A page the environment allows, opened as a tab by the tab specs.
	 */
	tabUrl: string;

	/**
	 * How long the launch script waits for the browser to come up.
	 */
	launchTimeoutSeconds: number;
}

/**
 * An Enterprise Browser manifest, with the fields the suite reads.
 */
export type EnterpriseBrowserManifest = OpenFinManifest & {
	devtools_port?: number;
	runtime?: { version: string; arguments?: string };
};

/**
 * A page as the DevTools HTTP endpoint lists it.
 */
export interface PageTarget {
	/**
	 * The target id, which is also its WebDriver window handle.
	 */
	id: string;

	/**
	 * The page url.
	 */
	url: string;

	/**
	 * The page title, which is the url until the document has been parsed.
	 */
	title: string;
}

/**
 * The suite's own section of here-automation.config.json, which the CLI ignores.
 */
type SuiteConfig = OpenFinConfig & {
	enterpriseBrowser?: Partial<Pick<EnterpriseBrowserSettings, "tabUrl" | "launchTimeoutSeconds">>;
};

/**
 * Return a setting, or explain where to set it.
 * @param value The setting's value.
 * @param where Where the setting is configured.
 * @returns The value.
 * @throws If the setting is missing.
 */
function required<T>(value: T | undefined, where: string): T {
	if (value === undefined) {
		throw new Error(`Set ${where}`);
	}
	return value;
}

/**
 * Read the suite settings from here-automation.config.json. MANIFEST_URL and EB_TAB_URL
 * override the file, so another environment can be targeted without editing it.
 * @returns The resolved settings.
 */
export async function loadSettings(): Promise<EnterpriseBrowserSettings> {
	const loaded = await loadConfig(process.cwd());
	const config: SuiteConfig | undefined = loaded?.config;
	return {
		manifestUrl: required(
			process.env.MANIFEST_URL ?? config?.platform?.manifestUrl,
			"platform.manifestUrl in here-automation.config.json, or MANIFEST_URL"
		),
		devToolsPort: required(config?.cli?.devToolsPort, "cli.devToolsPort in here-automation.config.json"),
		tabUrl: required(
			process.env.EB_TAB_URL ?? config?.enterpriseBrowser?.tabUrl,
			"enterpriseBrowser.tabUrl in here-automation.config.json, or EB_TAB_URL"
		),
		launchTimeoutSeconds: required(
			config?.enterpriseBrowser?.launchTimeoutSeconds,
			"enterpriseBrowser.launchTimeoutSeconds in here-automation.config.json"
		)
	};
}

/**
 * Fetch the Enterprise Browser manifest.
 * @param manifestUrl The manifest url.
 * @returns The manifest and its platform provider url.
 * @throws If the manifest has no platform provider.
 */
export async function loadManifest(
	manifestUrl: string
): Promise<{ manifest: EnterpriseBrowserManifest; providerUrl: string }> {
	const manifest = await fetchJson<EnterpriseBrowserManifest>(manifestUrl);
	const providerUrl = manifest.platform?.providerUrl;
	if (!providerUrl) {
		throw new Error(
			`${manifestUrl} has no platform.providerUrl, so it is not an Enterprise Browser manifest`
		);
	}
	return { manifest, providerUrl };
}

/**
 * List the pages from a DevTools port's HTTP endpoint. This only reads metadata, so unlike a
 * WebDriver window lookup it never attaches to a page. Use it to wait for a view the browser
 * is still creating or navigating: ChromeDriver attaching to a view mid-navigation can block
 * every command for minutes.
 * @param devToolsPort The DevTools port.
 * @returns The pages.
 */
export async function listPages(devToolsPort: number): Promise<PageTarget[]> {
	const targets = await fetchJson<(PageTarget & { type: string })[]>(
		`http://${DEVTOOLS_HOST}:${devToolsPort}/json/list`
	);
	return targets.filter((target) => target.type === "page").map(({ id, url, title }) => ({ id, url, title }));
}
