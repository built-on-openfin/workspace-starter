import { WebDriver, WebDriverKeys } from "@openfin/automation-helpers";
import { listPages, type PageTarget } from "../environment.ts";
import {
	byTestId,
	connectToEnterpriseBrowser,
	getBrowserWindows,
	urlPrefix,
	type EnterpriseBrowser
} from "./support/enterprise-browser";

const TAB = byTestId("enterprise-page-tab-button");
const TAB_CLOSE = byTestId("enterprise-page-tab-close-button");
const NEW_TAB = byTestId("enterprise-page-new-page-button");
const ADDRESS_BAR = byTestId("enterprise-nav-address-bar-input");

/**
 * Read the ids of the open tabs. Each tab element carries its page id.
 * @returns The tab ids.
 */
async function getTabIds(): Promise<string[]> {
	return WebDriver.executeAsync<string[]>(
		"[...document.querySelectorAll(arguments[0])].map((tab) => tab.id)",
		[TAB]
	);
}

/**
 * Read the ids of the pages on the DevTools port.
 * @param devToolsPort The DevTools port.
 * @returns The page ids.
 */
async function getPageIds(devToolsPort: number): Promise<string[]> {
	const pages = await listPages(devToolsPort);
	return pages.map((target) => target.id);
}

/**
 * Drive the browser the way a user does: open a tab with +, enter a url in the address
 * bar, read the page, and close the tab. The url comes from enterpriseBrowser.tabUrl in
 * here-automation.config.json (or EB_TAB_URL) and must be allowed for the environment,
 * or an "Access Blocked" page loads instead.
 *
 * While the new tab's view is being created and navigated, the spec only watches the
 * DevTools page list and the browser window it is already on. A WebDriver window lookup in
 * that time attaches to the half-loaded view, and ChromeDriver can then block for minutes.
 */
describe("Enterprise Browser tabs", () => {
	let browser: EnterpriseBrowser;
	let browserWindowHandle: string;
	let tabUrl: RegExp;
	let pagesBeforeTab: string[];
	let openedTabId: string | undefined;
	let page: PageTarget | undefined;

	/**
	 * Switch the driver back onto the browser window, where the tab strip and address bar are.
	 */
	async function onBrowserWindow(): Promise<void> {
		expect(await WebDriver.switchToWindow("handle", browserWindowHandle, false)).toBe(true);
	}

	/**
	 * Give the browser window OS focus. The address bar only acts on Enter while it has it.
	 */
	async function focusBrowserWindow(): Promise<void> {
		expect(await WebDriver.switchToWindow("handle", browserWindowHandle)).toBe(true);
		await WebDriver.executeAsync("await fin.me.focus()");
	}

	/**
	 * Close the tab this spec opened, and only that one. A tab's close button only responds
	 * once the tab is selected, so select it first.
	 * @param tabId The id of the tab to close.
	 */
	async function closeTab(tabId: string): Promise<void> {
		await onBrowserWindow();
		// An address bar still being edited spreads over the tab strip and takes the clicks.
		await WebDriver.executeAsync("document.activeElement?.blur()");
		const tab = await WebDriver.findElementByCssSelector(`[id="${tabId}"] [role="tab"]`);
		await tab?.click();
		const close = await WebDriver.findElementByCssSelector(`[id="${tabId}"] ${TAB_CLOSE}`);
		assert(close, `tab ${tabId} has no close button`);
		await close.click();
	}

	/**
	 * Find the page the spec's tab navigated to, by its url.
	 * @returns The page, or undefined if it has not started loading.
	 */
	async function findPage(): Promise<PageTarget | undefined> {
		const pages = await listPages(browser.devToolsPort);
		return pages.find((target) => !pagesBeforeTab.includes(target.id) && tabUrl.test(target.url));
	}

	beforeAll(async () => {
		browser = await connectToEnterpriseBrowser();
		tabUrl = urlPrefix(new URL(browser.settings.tabUrl).origin);

		const windows = await getBrowserWindows(browser);
		expect(windows.length, "no browser window is open").toBeGreaterThan(0);
		expect(await WebDriver.switchToWindow("identity", windows[0].identity)).toBe(true);
		const browserWindow = await WebDriver.getWindow();
		assert(browserWindow);
		browserWindowHandle = browserWindow.handle;
	});

	afterAll(async () => {
		// Enterprise Browser restores open tabs on its next launch, so leave none behind.
		if (openedTabId) {
			await closeTab(openedTabId);
		}
	});

	it("opens a new tab", async () => {
		await onBrowserWindow();
		const tabsBefore = await getTabIds();
		pagesBeforeTab = await getPageIds(browser.devToolsPort);

		const newTab = await WebDriver.findElementByCssSelector(NEW_TAB);
		assert(newTab);
		await newTab.click();

		let tabs = tabsBefore;
		expect(
			await WebDriver.waitForCondition(async () => {
				tabs = await getTabIds();
				return tabs.length > tabsBefore.length;
			})
		).toBe(true);
		openedTabId = tabs.find((id) => !tabsBefore.includes(id));
		expect(openedTabId).toBeDefined();

		const opened = await WebDriver.findElementByCssSelector(`[id="${openedTabId}"]`);
		expect(await opened?.getAttribute("aria-selected")).toBe("true");
	});

	it("loads a url entered in the address bar", async () => {
		const address = await WebDriver.findElementByCssSelector(ADDRESS_BAR);
		assert(address);
		await focusBrowserWindow();
		await address.sendKeys(browser.settings.tabUrl);

		// The address bar ignores Enter until its suggestions have loaded, so press it until
		// the page starts loading.
		const navigating = await WebDriver.waitForCondition(
			async () => {
				if (await findPage()) {
					return true;
				}
				await address.sendKeys(WebDriverKeys.Enter);
				return false;
			},
			30000,
			1000
		);
		expect(navigating, `${browser.settings.tabUrl} did not open. Check the environment allows it.`).toBe(
			true
		);

		// A page title shows the document has been parsed, so the view is past navigating.
		const loaded = await WebDriver.waitForCondition(
			async () => {
				page = await findPage();
				return page !== undefined && page.title !== "" && page.title !== page.url;
			},
			30000,
			500
		);
		expect(loaded, `${browser.settings.tabUrl} did not finish loading`).toBe(true);
	});

	it("shows the page content", async () => {
		assert(page);
		expect(await WebDriver.switchToWindow("handle", page.id, false)).toBe(true);
		const body = await WebDriver.waitForElementByTag("body", 10000);
		expect(await body?.getText()).not.toBe("");

		await onBrowserWindow();
		await WebDriver.saveScreenshot(undefined, "tab");
	});

	it("closes the tab", async () => {
		const tabId = openedTabId;
		assert(tabId);
		await closeTab(tabId);
		openedTabId = undefined;

		expect(
			await WebDriver.waitForCondition(async () => {
				const tabs = await getTabIds();
				return !tabs.includes(tabId);
			})
		).toBe(true);
		expect(await getPageIds(browser.devToolsPort)).not.toContain(page?.id);
	});
});
