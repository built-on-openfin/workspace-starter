import { WebDriver } from "@openfin/automation-helpers";
import {
	connectToEnterpriseBrowser,
	getBrowserWindows,
	getSignInUrls,
	runOnProvider,
	type EnterpriseBrowser
} from "./support/enterprise-browser";

/**
 * The suite attaches to a browser someone has already signed in to, so it never handles
 * HERE ID credentials. These checks fail fast, with a clear reason, when that is not the
 * browser it found.
 */
describe("Enterprise Browser session", () => {
	let browser: EnterpriseBrowser;

	beforeAll(async () => {
		browser = await connectToEnterpriseBrowser();
	});

	it("is the platform from the configured manifest", async () => {
		const identity = await runOnProvider<{ uuid: string }>(browser, "return fin.me.identity;");
		expect(identity.uuid).toBe(browser.manifest.platform?.uuid);

		const runtime = await runOnProvider<string>(browser, "return fin.System.getVersion();");
		console.log(`Attached to ${identity.uuid} on runtime ${runtime}`);
	});

	it("is signed in", async () => {
		const signIn = await getSignInUrls(browser);
		expect(signIn, "HERE ID is asking for a sign-in. Sign in, then run the tests again.").toEqual([]);
	});

	it("has a browser window open", async () => {
		const windows = await getBrowserWindows(browser);
		expect(windows.length).toBeGreaterThan(0);

		expect(await WebDriver.switchToWindow("identity", windows[0].identity)).toBe(true);
		await WebDriver.saveScreenshot(undefined, "browser-window");
	});
});
