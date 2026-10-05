import { OpenFinSystem, WebDriver } from "@openfin/automation-helpers";
import type OpenFin from "@openfin/core";
import {
	closeEbContent,
	findBrowserWindow,
	findPlatformWindow,
	loginToHereId,
	logoutFromMenu,
	closeTab,
	logWindows,
	openViewAsTab,
	quitEnterpriseBrowser,
	restoreProviderPage,
	saveShot,
	ebEnv,
	timed,
	waitForAuthResult,
	waitForLoginWindow,
	waitForPostLoginWindow,
	waitForRelaunchedLoginTarget
} from "./eb-helpers";

/**
 * Launch Enterprise Browser from a manifest URL (the CLI does this), log into HERE ID,
 * open a tab, then log out. Steps run in order and share one session, so a failure
 * early on fails the rest.
 *
 * Run from how-to/automation-testing/default with HERE_ID_USER, HERE_ID_PASSWORD and
 * MANIFEST_URL in the environment: `npm run eb`. See eb/README.md.
 */
/**
 * Assert a value is present and return it narrowed, so later steps need no non-null assertions.
 * @param value The value to check.
 * @param message The assertion message.
 * @returns The value.
 * @throws Error when the value is undefined.
 */
function required<T>(value: T | undefined, message: string): T {
	expect(value, message).toBeDefined();
	if (value === undefined) {
		throw new Error(message);
	}
	return value;
}

describe("Enterprise Browser", () => {
	let platformWindow: OpenFin.Identity | undefined;
	const viewName = `eb-view-${Date.now()}`;
	const viewUrlPattern = new RegExp(new URL(ebEnv.viewUrl).hostname.replace(/\./g, "\\."), "i");

	let quit = false;

	/**
	 * Close what step 3 opened, plus anything restored from an earlier run.
	 * Logout saves the session, so anything left open would be restored on the next launch.
	 */
	async function closeTestContent(): Promise<void> {
		if (!platformWindow || !(await WebDriver.switchToWindow("identity", platformWindow, false))) {
			return;
		}
		await closeEbContent();
		await WebDriver.sleep(1000);
	}

	afterAll(async () => {
		if (quit) {
			return;
		}
		await closeTestContent();
		await logWindows("teardown");
	});

	it("1. launches Enterprise Browser from the manifest", async () => {
		expect(await OpenFinSystem.waitForReady(120000)).toBe(true);
		const windows = await logWindows("after launch");
		expect(windows.length).toBeGreaterThan(0);
		await saveShot("01-launched");
	});

	it("2. logs into HERE ID", async () => {
		const loginShown = await waitForLoginWindow(90000);

		if (!loginShown) {
			// EB may have a persisted session; only accept that if the platform is actually up.
			await logWindows("no login window");
			platformWindow = await findPlatformWindow(30000);
			expect(platformWindow, "neither a HERE ID login window nor a platform window appeared").toBeDefined();
			console.log("[eb] no login window found, treating the session as already authenticated");
			return;
		}

		await loginToHereId();

		const auth = await waitForAuthResult(60000);
		expect(auth, "HERE ID never left the login page").toBeDefined();

		// The provider page has been replaced by about:blank, so its login listener is
		// gone. Reload that page now that the session cookie is set.
		let launched = false;
		if (auth === "success-page") {
			await restoreProviderPage();
			launched = await waitForPostLoginWindow(60000);
		}
		await logWindows("after login");
		expect(launched, "auth succeeded but no splash or browser window opened").toBe(true);

		platformWindow = required(
			await findPlatformWindow(120000),
			"no window exposing fin.Platform appeared after login"
		);
		await WebDriver.switchToWindow("identity", platformWindow, false);
		await saveShot("02-logged-in");
	});

	it("3. opens google.com in a new browser tab, then closes the tab", async () => {
		const provider = required(platformWindow, "step 2 did not find a platform window");

		// Safety net for content an earlier run left in the saved session.
		await closeTestContent();

		const browserWindow = required(
			await findBrowserWindow(),
			"no Enterprise Browser window found to add a tab to"
		);
		console.log(`[eb] browser window: ${browserWindow.name}`);

		expect(await WebDriver.switchToWindow("identity", provider, false)).toBe(true);
		const tab = required(
			await timed("open tab", async () => openViewAsTab(browserWindow, viewName, ebEnv.viewUrl)),
			"the tab or its view was not created"
		);

		const switched = await timed("waitForWindow(view url)", async () =>
			WebDriver.waitForWindow("url", viewUrlPattern, 30000, 500)
		);
		expect(switched, "driver could not switch onto the tab's view").toBe(true);
		console.log(`[eb] view url: ${await WebDriver.getUrl()}`);
		await saveShot("03-google-tab");

		expect(await WebDriver.switchToWindow("identity", provider, false)).toBe(true);
		const closed = await timed("close tab", async () => closeTab(browserWindow, tab));
		expect(closed, "the tab's view was still open after closing the tab").toBe(true);
		await logWindows("after closing the tab");
	});

	it("4. logs out from the menu, then closes Enterprise Browser at the login window", async () => {
		expect(platformWindow).toBeDefined();
		await closeTestContent();

		const how = await timed("logout", async () => logoutFromMenu());
		// Logout relaunches EB as a new runtime process. ChromeDriver is attached to the
		// old one and every call on it hangs from here, so the rest of this step uses
		// the DevTools port directly and afterAll must not touch the driver.
		quit = true;
		expect(how, "could not trigger logout from the menu or its action").not.toBe("failed");

		const login = required(
			await timed("wait for login window after logout", async () => waitForRelaunchedLoginTarget(90000)),
			"the HERE ID login window did not come back after logout"
		);

		const exited = await timed("quit Enterprise Browser", async () => quitEnterpriseBrowser(login));
		expect(exited, "Enterprise Browser did not exit after quit").toBe(true);
	});
});
