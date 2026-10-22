import { WebDriver } from "@openfin/automation-helpers";
import type OpenFin from "@openfin/core";
import {
	loadManifest,
	loadSettings,
	type EnterpriseBrowserManifest,
	type EnterpriseBrowserSettings
} from "../../environment.ts";

/**
 * The HERE ID sign-in page. Enterprise Browser shows it in a window of its own app until
 * the user has signed in.
 */
const SIGN_IN_URL = /^https:\/\/auth[\w-]*\.openfin\.co\//;

/**
 * A running Enterprise Browser the driver is attached to.
 */
export interface EnterpriseBrowser {
	/**
	 * The suite settings.
	 */
	settings: EnterpriseBrowserSettings;

	/**
	 * The manifest the browser was launched from.
	 */
	manifest: EnterpriseBrowserManifest;

	/**
	 * The DevTools port the CLI attached to, which a --devToolsPort flag can move from the
	 * configured one.
	 */
	devToolsPort: number;

	/**
	 * The WebDriver handle of the platform provider window, where `fin.Platform` calls run.
	 */
	providerHandle: string;
}

/**
 * A browser window and the urls of the views (tabs) it hosts.
 */
export interface BrowserWindow {
	/**
	 * The window's identity.
	 */
	identity: OpenFin.Identity;

	/**
	 * The urls of the views in the window.
	 */
	viewUrls: string[];
}

/**
 * Build a CSS selector for one of the browser's own `data-testid` attributes, which are
 * stable across builds where its class names are not.
 * @param testId The test id.
 * @returns The selector.
 */
export function byTestId(testId: string): string {
	return `[data-testid="${testId}"]`;
}

/**
 * Build a regular expression matching urls that start with the given url.
 * @param url The url prefix.
 * @returns The expression.
 */
export function urlPrefix(url: string): RegExp {
	return new RegExp(`^${url.replace(/[$()*+.?[\\\]^{|}]/g, "\\$&")}`);
}

/**
 * Find the platform provider of the Enterprise Browser named by the suite's manifest.
 * @param timeoutMs How long to look for the provider window.
 * @returns The attached browser.
 */
export async function connectToEnterpriseBrowser(timeoutMs: number = 30000): Promise<EnterpriseBrowser> {
	const settings = await loadSettings();
	const { manifest, providerUrl } = await loadManifest(settings.manifestUrl);
	const devToolsPort = globalThis.automation?.devToolsPort ?? settings.devToolsPort;

	// The provider is hidden, so switch onto it without activating its native window.
	const found = await WebDriver.waitForWindow("url", urlPrefix(providerUrl), timeoutMs, 500, false);
	const providerWindow = found ? await WebDriver.getWindow() : undefined;
	const providerHandle = providerWindow?.handle;
	if (!providerHandle) {
		throw new Error(
			`Enterprise Browser for ${settings.manifestUrl} is not running on DevTools port ${devToolsPort}. Start it with: npm run launch`
		);
	}
	return { settings, manifest, devToolsPort, providerHandle };
}

/**
 * Run a script in the platform provider window. The script body can use `await`, reads its
 * argument as `input`, and returns a JSON-serializable value. A thrown error is rethrown here
 * rather than surfacing as an undefined result.
 * @param browser The attached browser.
 * @param body The body of an async function.
 * @param input A JSON-serializable value passed to the script as `input`.
 * @returns The value the script returned.
 */
export async function runOnProvider<T>(
	browser: EnterpriseBrowser,
	body: string,
	input?: unknown
): Promise<T> {
	if (!(await WebDriver.switchToWindow("handle", browser.providerHandle, false))) {
		throw new Error("The Enterprise Browser provider window has closed");
	}
	const result = await WebDriver.executeAsync<{ value: T } | { error: string } | undefined>(
		`await (async (input) => {
			try {
				return { value: await (async () => { ${body} })() };
			} catch (err) {
				return { error: String(err) };
			}
		})(JSON.parse(arguments[0]))`,
		[JSON.stringify(input ?? null)],
		false
	);
	if (!result) {
		throw new Error("The provider script returned nothing");
	}
	if ("error" in result) {
		throw new Error(result.error);
	}
	return result.value;
}

/**
 * Get the browser windows that are on screen, with the urls of their views.
 * @param browser The attached browser.
 * @returns The browser windows.
 */
export async function getBrowserWindows(browser: EnterpriseBrowser): Promise<BrowserWindow[]> {
	return runOnProvider<BrowserWindow[]>(
		browser,
		`const windows = [];
		for (const win of await fin.Application.getCurrentSync().getChildWindows()) {
			const views = await win.getCurrentViews();
			if (views.length > 0 && (await win.isShowing())) {
				const viewUrls = await Promise.all(views.map(async (view) => (await view.getInfo()).url));
				windows.push({ identity: win.identity, viewUrls });
			}
		}
		return windows;`
	);
}

/**
 * Get the urls of any HERE ID sign-in windows, which are only open while signed out.
 * @param browser The attached browser.
 * @returns The sign-in window urls.
 */
export async function getSignInUrls(browser: EnterpriseBrowser): Promise<string[]> {
	const urls = await runOnProvider<string[]>(
		browser,
		`const wins = await fin.Application.getCurrentSync().getChildWindows();
		return Promise.all(wins.map(async (win) => (await win.getInfo()).url));`
	);
	return urls.filter((url) => SIGN_IN_URL.test(url));
}
