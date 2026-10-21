import { WebDriver } from "@openfin/automation-helpers";
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
	restoreProviderPage,
	saveShot,
	ebEnv,
	timed,
	waitForAuthResult,
	waitForLoginWindow,
	waitForPostLoginWindow,
	waitForRuntime,
	waitForRuntimeExit,
	waitForVisibleLoginWindow
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
		// Do not call WebDriver here. HERE ID stays hidden for a few seconds, and
		// switching onto it (which getWindows does) replaces the form with about:blank.
		expect(await waitForRuntime(120000)).toBe(true);
	});

	it("2. logs into HERE ID", async () => {
		const loginState = await waitForVisibleLoginWindow(90000);

		if (loginState === "blanked") {
			throw new Error(
				"HERE ID window became about:blank before it finished showing. Leave it alone until it is visible."
			);
		}

		if (loginState !== "visible") {
			// EB may have a persisted session; only accept that if the platform is actually up.
			await logWindows("no login window");
			platformWindow = await findPlatformWindow(30000);
			expect(platformWindow, "neither a HERE ID login window nor a platform window appeared").toBeDefined();
			console.log("[eb] no login window found, treating the session as already authenticated");
			return;
		}

		// The window is on screen now, so it is safe for ChromeDriver to switch onto it.
		expect(await waitForLoginWindow(15000), "could not switch onto the visible HERE ID window").toBe(true);
		await saveShot("01-launched");
		await loginToHereId();

		const auth = await waitForAuthResult(60000);
		expect(auth, "HERE ID never left the login page").toBeDefined();

		// If the auth response page is still present, the provider page has been
		// replaced by about:blank and its login listener is gone. Reload it now that
		// the session cookie is set. When HERE ID closes first, EB may already have
		// opened the browser, so wait for the post-login window in either case.
		if (auth === "success-page") {
			await restoreProviderPage();
		}
		const launched = await waitForPostLoginWindow(60000);
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

	it("4. logs out from the menu", async () => {
		expect(platformWindow).toBeDefined();
		await closeTestContent();

		const how = await timed("logout", async () => logoutFromMenu());
		// Logout ends the runtime process. ChromeDriver is attached to it and every call
		// on it hangs from here, so afterAll must not touch the driver.
		quit = true;
		expect(how, "could not trigger logout from the menu or its action").not.toBe("failed");

		const exited = await timed("wait for runtime exit after logout", async () => waitForRuntimeExit(30000));
		expect(exited, "Enterprise Browser was still running after logout").toBe(true);
	});
});
