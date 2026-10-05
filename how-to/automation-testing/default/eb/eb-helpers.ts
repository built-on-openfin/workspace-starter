import { type IWebDriverElement, WebDriver, WebDriverKeys } from "@openfin/automation-helpers";
import type OpenFin from "@openfin/core";

/**
 * The Workspace system app has its own uuid; anything else that exposes the
 * Platform API is assumed to be the Enterprise Browser platform under test.
 */
const WORKSPACE_UUID = "openfin-workspace";

const SCREENSHOT_FOLDER = "./reports/screenshots";

/**
 * Fallback when no submit-typed control exists: a button whose visible text looks like a sign-in action.
 */
const SUBMIT_BUTTON_XPATH =
	"//button[contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), 'sign in')" +
	" or contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), 'log in')" +
	" or contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), 'login')" +
	" or contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), 'continue')" +
	" or contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), 'next')" +
	" or contains(translate(normalize-space(.), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), 'submit')]";

/**
 * Environment-driven knobs so the HERE ID page can be matched without a code change.
 */
export const ebEnv = {
	user: process.env.HERE_ID_USER,
	password: process.env.HERE_ID_PASSWORD,
	// The IdP host only. The success page is on se-dev.is.here.io and must not count as "still logging in".
	loginUrlPattern: new RegExp(
		process.env.HERE_ID_LOGIN_URL_PATTERN ?? "auth(-[a-z0-9]+)?\\.openfin\\.co",
		"i"
	),
	authSuccessUrlPattern: /login\/response\?.*success=true/i,
	emailSelector:
		process.env.HERE_ID_EMAIL_SELECTOR ?? "input[type='email'], input[name='username'], input[name='email']",
	passwordSelector: process.env.HERE_ID_PASSWORD_SELECTOR ?? "input[type='password']",
	submitSelector: process.env.HERE_ID_SUBMIT_SELECTOR ?? "button[type='submit'], input[type='submit']",
	providerUrlPattern: process.env.EB_PROVIDER_URL_PATTERN
		? new RegExp(process.env.EB_PROVIDER_URL_PATTERN, "i")
		: undefined,
	// google.com was already open in this Enterprise Browser, so it is on the allowlist.
	// example.com is not, and EB shows a blank window for a site the admin console has not added.
	viewUrl: process.env.EB_VIEW_URL ?? "https://www.google.com/"
};

/**
 * Print every window the driver can see, so each stage of the run leaves a record
 * of what Enterprise Browser actually opened.
 * @param stage A label for the log output.
 * @returns The windows that were listed.
 */
export async function logWindows(stage: string): Promise<Awaited<ReturnType<typeof WebDriver.getWindows>>> {
	const windows = await WebDriver.getWindows();
	console.log(`\n[eb] windows (${stage}): ${windows.length}`);
	for (const win of windows) {
		const id = win.identity ? `${win.identity.uuid}/${win.identity.name}` : "no fin identity";
		console.log(`  - title="${win.title}" url=${win.url} identity=${id}`);
	}
	return windows;
}

/**
 * Save a screenshot of the current window, never failing the test if it cannot.
 * @param name The file name (without extension).
 */
export async function saveShot(name: string): Promise<void> {
	try {
		await WebDriver.saveScreenshot(SCREENSHOT_FOLDER, `eb-${name}`);
	} catch (err) {
		console.log(`[eb] screenshot ${name} failed: ${err instanceof Error ? err.message : String(err)}`);
	}
}

/**
 * Switch to the given window and report whether it belongs to a platform app
 * that is not the Workspace system app and exposes the Platform API.
 * @param handle The window handle to test.
 * @returns The identity if the window is usable for platform calls.
 */
async function probePlatformWindow(handle: string): Promise<OpenFin.Identity | undefined> {
	if (!(await WebDriver.switchToWindow("handle", handle, false))) {
		return undefined;
	}
	try {
		const result = await WebDriver.executeAsync<
			{ uuid: string; name: string; hasPlatform: boolean } | undefined
		>(
			`(() => {
				if (typeof fin === "undefined" || !fin.me || !fin.me.identity) { return undefined; }
				let hasPlatform = false;
				try { hasPlatform = typeof fin.Platform?.getCurrentSync === "function" && !!fin.Platform.getCurrentSync(); } catch {}
				return { uuid: fin.me.identity.uuid, name: fin.me.identity.name, hasPlatform };
			})()`
		);
		if (result?.hasPlatform && result.uuid !== WORKSPACE_UUID) {
			return { uuid: result.uuid, name: result.name };
		}
	} catch {
		// Not a fin window, or the page is not ready; keep scanning.
	}
	return undefined;
}

/**
 * Higher is a better place to call platform APIs. The login window also exposes
 * `fin.Platform`, but its renderer stops answering once login finishes, and driving
 * it is what hung the classic-window step.
 * @param win A window from `WebDriver.getWindows()`.
 * @param win.url The window URL.
 * @param win.title The window title.
 * @param win.identity The window's OpenFin identity, if it has one.
 * @param win.identity.uuid The app uuid.
 * @param win.identity.name The window name.
 * @returns A rank, or -1 when the window must not be driven.
 */
function platformWindowRank(win: {
	url?: string;
	title?: string;
	identity?: { uuid: string; name: string };
}): number {
	const identity = win.identity;
	if (!identity || identity.uuid === WORKSPACE_UUID || identity.uuid.includes("notifications")) {
		return -1;
	}
	if (
		identity.name === "platform-auth-login-window" ||
		/splash|dialog|popup-menu|find-in-page|context-menu|dropdown|zoom-controls|bookmark|companion|dock/i.test(
			identity.name
		)
	) {
		return -1;
	}
	if (ebEnv.providerUrlPattern && !ebEnv.providerUrlPattern.test(win.url ?? "")) {
		return -1;
	}
	if (/provider\.html/i.test(win.url ?? "") && identity.name === identity.uuid) {
		return 100;
	}
	if (/\/platform\/enterprise\//i.test(win.url ?? "") && (win.title?.length ?? 0) > 0) {
		return 40;
	}
	return 1;
}

/**
 * Find the Enterprise Browser provider window. That is the hidden page whose name
 * matches the app uuid and whose URL is provider.html.
 * @param timeoutMs How long to keep scanning.
 * @returns The identity of a usable platform window, or undefined.
 */
export async function findPlatformWindow(timeoutMs = 60000): Promise<OpenFin.Identity | undefined> {
	const start = Date.now();
	do {
		const windows = await WebDriver.getWindows();
		const ranked = windows
			.map((win) => ({ win, rank: platformWindowRank(win) }))
			.filter((entry) => entry.rank > 0)
			.sort((a, b) => b.rank - a.rank);

		for (const { win } of ranked) {
			const identity = await probePlatformWindow(win.handle);
			if (identity) {
				console.log(`[eb] platform window: ${identity.uuid}/${identity.name} (${win.url})`);
				return identity;
			}
		}
		await WebDriver.sleep(1000);
	} while (Date.now() - start < timeoutMs);
	return undefined;
}

/**
 * Wait for a HERE ID login window to appear and switch onto it.
 * @param timeoutMs How long to wait.
 * @returns True if a login window is now the current window.
 */
export async function waitForLoginWindow(timeoutMs: number): Promise<boolean> {
	return WebDriver.waitForWindow("url", ebEnv.loginUrlPattern, timeoutMs, 500);
}

/**
 * The first element in the list that is actually on screen. The HERE ID page keeps
 * hidden password inputs in the DOM on the email step, and clicking one of those
 * fails with "element not interactable".
 * @param elements The candidates, in document order.
 * @returns The first displayed element, or undefined.
 */
async function firstDisplayed(elements: IWebDriverElement[]): Promise<IWebDriverElement | undefined> {
	for (const element of elements) {
		try {
			if (await element.isDisplayed()) {
				return element;
			}
		} catch {
			// A stale or detached node is not a field we can type into.
		}
	}
	return undefined;
}

/**
 * Wait for an input, click it and type into it.
 * @param selector The CSS selector for the input.
 * @param value The value to type.
 * @param label Used in error messages.
 * @param timeoutMs How long to wait for the input.
 * @returns The input element.
 */
async function fill(
	selector: string,
	value: string,
	label: string,
	timeoutMs: number
): Promise<IWebDriverElement> {
	const input = await WebDriver.waitForElementByCssSelector(selector, timeoutMs, 250);
	if (!input) {
		await saveShot(`login-missing-${label}`);
		throw new Error(
			`HERE ID ${label} input not found with selector "${selector}" on ${await WebDriver.getUrl()}`
		);
	}
	await input.click();
	await input.sendKeys(value);
	return input;
}

/**
 * Submit the login form. The HERE ID page keeps its inputs outside a <form>, so
 * Enter does nothing there; find and click the submit button, falling back to
 * Enter only when no button can be found.
 * @param field The input that was just filled, used for the Enter fallback.
 */
async function submit(field: IWebDriverElement): Promise<void> {
	let button = await firstDisplayed(await WebDriver.findElementsCssSelector(ebEnv.submitSelector));
	if (!button) {
		button = await firstDisplayed(await WebDriver.findElementsByPath(SUBMIT_BUTTON_XPATH));
	}
	if (button) {
		const label = await button.getText();
		console.log(`[eb] clicking submit button "${label.trim()}"`);
		await button.click();
		return;
	}
	console.log("[eb] no visible submit button found, pressing Enter");
	await field.sendKeys(WebDriverKeys.Enter);
}

/**
 * Poll until a password input is on screen. Hidden inputs that exist on the email step do not count.
 * @param timeoutMs How long to wait.
 * @returns The visible password input, or undefined.
 */
async function waitForVisiblePassword(timeoutMs: number): Promise<IWebDriverElement | undefined> {
	const start = Date.now();
	do {
		const password = await firstDisplayed(await WebDriver.findElementsCssSelector(ebEnv.passwordSelector));
		if (password) {
			return password;
		}
		await WebDriver.sleep(250);
	} while (Date.now() - start < timeoutMs);
	return undefined;
}

/**
 * Drive the HERE ID email + password flow in the current (login) window.
 * Handles both a single page with both fields and a two-step email -> password page.
 */
export async function loginToHereId(): Promise<void> {
	if (!ebEnv.user || !ebEnv.password) {
		throw new Error("Set HERE_ID_USER and HERE_ID_PASSWORD in the environment before running the suite");
	}

	console.log(`[eb] login window: ${await WebDriver.getUrl()}`);
	await saveShot("login-page");

	const email = await fill(ebEnv.emailSelector, ebEnv.user, "email", 30000);

	// The email step already has password inputs in the DOM; they are not on screen yet.
	let password = await firstDisplayed(await WebDriver.findElementsCssSelector(ebEnv.passwordSelector));
	if (!password) {
		console.log("[eb] password field is not visible yet, submitting the email step");
		await submit(email);
		password = await waitForVisiblePassword(30000);
		if (!password) {
			await saveShot("login-missing-password");
			throw new Error(`HERE ID password input never became visible on ${await WebDriver.getUrl()}`);
		}
	}
	await password.click();
	await password.sendKeys(ebEnv.password);

	await saveShot("login-filled");
	await submit(password);
}

/**
 * Wait until HERE ID is done: the IdP window is gone, or it has landed on the
 * platform's `login/response?...success=true` page. That page is still the same
 * OpenFin window, so "the login window closed" is the wrong signal.
 * @param timeoutMs How long to wait.
 * @returns "success-page" or "closed", or undefined on timeout.
 */
export async function waitForAuthResult(timeoutMs: number): Promise<"success-page" | "closed" | undefined> {
	const start = Date.now();
	do {
		const windows = await WebDriver.getWindows();
		const success = windows.find((win) => ebEnv.authSuccessUrlPattern.test(win.url ?? ""));
		if (success) {
			console.log(`[eb] auth response page: ${success.url}`);
			return "success-page";
		}
		if (!windows.some((win) => ebEnv.loginUrlPattern.test(win.url ?? ""))) {
			console.log("[eb] HERE ID window is gone");
			return "closed";
		}
		await WebDriver.sleep(500);
	} while (Date.now() - start < timeoutMs);
	return undefined;
}

/**
 * True when some window is no longer the IdP or the auth response page.
 * Splash and the browser both qualify. Blank and internal targets do not.
 * @param timeoutMs How long to wait.
 * @returns True if such a window appeared.
 */
export async function waitForPostLoginWindow(timeoutMs: number): Promise<boolean> {
	const start = Date.now();
	do {
		const windows = await WebDriver.getWindows();
		const ready = windows.some((win) => {
			const url = win.url ?? "";
			if (url.length === 0 || url === "about:blank" || url.startsWith("openfin-internal:")) {
				return false;
			}
			if (ebEnv.loginUrlPattern.test(url) || ebEnv.authSuccessUrlPattern.test(url)) {
				return false;
			}
			return true;
		});
		if (ready) {
			return true;
		}
		await WebDriver.sleep(1000);
	} while (Date.now() - start < timeoutMs);
	return false;
}

/**
 * The test driver replaces the hidden provider page with about:blank, which
 * drops the listener Enterprise Browser uses to finish login. The session cookie
 * is already valid by then, so send the provider window back to provider.html.
 * A fresh load calls /platform/api/user/me, gets 200, and continues into the browser.
 */
export async function restoreProviderPage(): Promise<void> {
	const windows = await WebDriver.getWindows();
	const success = windows.find((win) => ebEnv.authSuccessUrlPattern.test(win.url ?? ""));
	if (!success || !(await WebDriver.switchToWindow("handle", success.handle, false))) {
		console.log("[eb] could not switch to the auth response window");
		return;
	}

	await WebDriver.executeAsync(
		`(() => {
			window.__ebNav = "pending";
			const url = new URL("/platform/platform/platform/provider.html", location.origin).href;
			try {
				fin.Application.getCurrentSync().getWindow()
					.then((win) => win.navigate(url).then(() => { window.__ebNav = "navigated to " + url; }))
					.catch((err) => { window.__ebNav = "navigate failed: " + (err && err.message ? err.message : String(err)); });
			} catch (err) {
				window.__ebNav = "no fin: " + (err && err.message ? err.message : String(err));
			}
			return "started";
		})()`,
		[],
		false
	);

	const deadline = Date.now() + 10000;
	let nav = "pending";
	do {
		await WebDriver.sleep(500);
		nav = String((await WebDriver.executeAsync("window.__ebNav", [], false)) ?? nav);
	} while (nav === "pending" && Date.now() < deadline);
	console.log(`[eb] restore provider: ${nav}`);
	// Stay off the provider window while it boots. Switching onto it is what blanked it.
	await WebDriver.sleep(8000);
}

/**
 * Run a script in the current window and wait for the value it stores on `window[key]`.
 * `WebDriver.executeAsync` does not await promises, so the script must set the key itself.
 * @param script A synchronous expression that kicks off the work and eventually sets `window[key]`.
 * @param key The global the script writes its result to.
 * @param timeoutMs How long to wait for the result.
 * @returns The stored value, or "pending" on timeout.
 */
async function runInPage(script: string, key: string, timeoutMs: number): Promise<string> {
	await WebDriver.executeAsync(
		`(() => { window.${key} = "pending"; ${script}; return "started"; })()`,
		[],
		false
	);
	const deadline = Date.now() + timeoutMs;
	let value = "pending";
	do {
		await WebDriver.sleep(250);
		value = String((await WebDriver.executeAsync(`window.${key}`, [], false)) ?? value);
	} while (value === "pending" && Date.now() < deadline);
	return value;
}

/**
 * Close every window and view this suite ever opened, including ones restored
 * from a previous run's saved session. Logout persists the session, so anything
 * left open comes back next launch (as "Access Blocked" for views, since they
 * are not admin-console apps). Run from a platform window.
 * @returns A summary of what was closed.
 */
export async function closeEbContent(): Promise<string> {
	const result = await runInPage(
		`(() => {
			const app = fin.Application.getCurrentSync();
			const isEbContent = (t) => /^(eb|spike)-/.test(t.identity.name ?? "");
			Promise.all([app.getChildWindows(), app.getViews()])
				.then(async ([windows, views]) => {
					const closed = [];
					// Views have no close(); the platform closes them and tidies the layout.
					for (const view of views.filter(isEbContent)) {
						await fin.Platform.getCurrentSync().closeView(view.identity).catch(() => view.destroy().catch(() => {}));
						closed.push(view.identity.name);
					}
					for (const win of windows.filter(isEbContent)) {
						await win.close(true).catch(() => {});
						closed.push(win.identity.name);
					}
					window.__ebSweep = closed.length + " closed" + (closed.length ? ": " + closed.join(", ") : "");
				})
				.catch((err) => { window.__ebSweep = "failed: " + (err && err.message ? err.message : String(err)); });
		})()`,
		"__ebSweep",
		20000
	);
	console.log(`[eb] test content ${result}`);
	return result;
}

/**
 * Find the Enterprise Browser window (tab strip and toolbar), without switching to it.
 * @returns The identity, or undefined if no browser window is open.
 */
export async function findBrowserWindow(): Promise<OpenFin.Identity | undefined> {
	const windows = await WebDriver.getWindows();
	return windows.find(
		(win) =>
			(win.identity?.name ?? "").startsWith("internal-generated-window-") &&
			/\/platform\/enterprise\/?$/.test((win.url ?? "").split(/[#?]/)[0])
	)?.identity;
}

/**
 *
 */
export interface SpikeTab {
	/**
	 *
	 */
	pageId: string;
	/**
	 *
	 */
	view: OpenFin.Identity;
	/**
	 *
	 */
	url: string;
}

/**
 * Open a URL as a new tab in an existing browser window. In Enterprise Browser
 * a tab is a "page", so this adds a page with a one-view layout and makes it the
 * active tab. A page's views are only created once it is shown, and the platform
 * may rename the view, so the view is found by polling the window's views.
 * Run from a platform window.
 * @param browserWindow The browser window to add the tab to.
 * @param viewName The requested name for the view.
 * @param url The URL to show.
 * @returns The tab, or undefined if it could not be opened (the reason is logged).
 */
export async function openViewAsTab(
	browserWindow: OpenFin.Identity,
	viewName: string,
	url: string
): Promise<SpikeTab | undefined> {
	const result = await runInPage(
		`(() => {
			const target = ${JSON.stringify(browserWindow)};
			const viewOpts = { name: ${JSON.stringify(viewName)}, url: ${JSON.stringify(url)} };
			const host = new URL(viewOpts.url).hostname;
			const page = {
				pageId: viewOpts.name + "-page",
				title: "Spike",
				layout: { content: [{ type: "stack", content: [{ type: "component", componentName: "view", componentState: viewOpts }] }] }
			};
			const fail = (stage, err) => { window.__ebTab = "error: " + stage + ": " + (err && err.message ? err.message : String(err)); };
			(async () => {
				let client;
				try { client = await fin.Platform.wrapSync({ uuid: target.uuid }).getClient(); } catch (err) { return fail("getClient", err); }
				try { await client.dispatch("addPage", { identity: target, page }); } catch (err) { return fail("addPage", err); }
				try { await client.dispatch("setActivePage", { identity: target, pageId: page.pageId }); } catch (err) { return fail("setActivePage", err); }
				const browser = fin.Window.wrapSync(target);
				for (let i = 0; i < 40; i++) {
					const views = await browser.getCurrentViews().catch(() => []);
					for (const v of views) {
						const info = await v.getInfo().catch(() => undefined);
						const viewUrl = (info && info.url) || "";
						if (v.identity.name === viewOpts.name || viewUrl.includes(host)) {
							window.__ebTab = JSON.stringify({ pageId: page.pageId, view: v.identity, url: viewUrl });
							return;
						}
					}
					await new Promise((r) => setTimeout(r, 500));
				}
				window.__ebTab = "error: tab " + page.pageId + " was added but no " + host + " view appeared in " + target.name;
			})();
		})()`,
		"__ebTab",
		40000
	);
	if (!result.startsWith("{")) {
		console.log(`[eb] open tab failed: ${result}`);
		return undefined;
	}
	const tab = JSON.parse(result) as SpikeTab;
	console.log(`[eb] opened tab ${tab.pageId} in ${browserWindow.name}: view ${tab.view.name} at ${tab.url}`);
	return tab;
}

/**
 * Close a tab opened by `openViewAsTab` and confirm its view is gone.
 * Removing the page is what the tab's close button does. Run from a platform window.
 * @param browserWindow The browser window holding the tab.
 * @param tab The tab to close.
 * @returns True if the view no longer exists.
 */
export async function closeTab(browserWindow: OpenFin.Identity, tab: SpikeTab): Promise<boolean> {
	const result = await runInPage(
		`(() => {
			const target = ${JSON.stringify(browserWindow)};
			const tab = ${JSON.stringify(tab)};
			const gone = async () => {
				try { await fin.View.wrapSync(tab.view).getInfo(); return false; } catch { return true; }
			};
			(async () => {
				try {
					const client = await fin.Platform.wrapSync({ uuid: target.uuid }).getClient();
					await client.dispatch("detachPagesFromWindow", { identity: target, pageIds: [tab.pageId] });
				} catch (err) {
					window.__ebClose = "error: removing the tab failed: " + (err && err.message ? err.message : String(err));
					return;
				}
				for (let i = 0; i < 20; i++) {
					if (await gone()) { window.__ebClose = "closed"; return; }
					await new Promise((r) => setTimeout(r, 250));
				}
				// The tab is gone but its view survived; close it directly so nothing is saved.
				await fin.Platform.getCurrentSync().closeView(tab.view).catch(() => {});
				window.__ebClose = (await gone()) ? "closed (view needed closeView)" : "error: view still exists after closing the tab";
			})();
		})()`,
		"__ebClose",
		15000
	);
	console.log(`[eb] close tab ${tab.pageId}: ${result}`);
	return result.startsWith("closed");
}

/**
 * Switch to the Enterprise Browser window, the one with the tab strip and the top-right menu.
 * @returns The window, or undefined if no browser window is open.
 */
async function switchToBrowserWindow(): Promise<OpenFin.Identity | undefined> {
	const windows = await WebDriver.getWindows();
	const browser = windows.find(
		(win) =>
			(win.identity?.name ?? "").startsWith("internal-generated-window-") &&
			/\/platform\/enterprise\/?$/.test((win.url ?? "").split(/[#?]/)[0])
	);
	if (!browser?.identity || !(await WebDriver.switchToWindow("handle", browser.handle, false))) {
		return undefined;
	}
	return browser.identity;
}

/**
 * Tag the top-right menu button in the browser window so it can be clicked with a
 * real WebDriver click. The browser UI is not ours, so this picks the rightmost
 * button in the title bar that looks like a menu and logs every candidate, which
 * makes a wrong guess easy to correct with EB_MENU_BUTTON_SELECTOR.
 * @returns A description of the tagged button, or undefined.
 */
async function tagMenuButton(): Promise<string | undefined> {
	const found = await runInPage(
		`(() => {
			const describe = (el) => [el.tagName.toLowerCase(), el.id && "#" + el.id, el.getAttribute("aria-label") && "aria-label=" + el.getAttribute("aria-label"),
				el.getAttribute("title") && "title=" + el.getAttribute("title"), el.getAttribute("data-testid") && "data-testid=" + el.getAttribute("data-testid"),
				typeof el.className === "string" && el.className && "class=" + el.className.slice(0, 80)].filter(Boolean).join(" ");
			const buttons = [...document.querySelectorAll("button, [role=button]")]
				.map((el) => ({ el, rect: el.getBoundingClientRect() }))
				.filter(({ rect }) => rect.width > 0 && rect.height > 0 && rect.top < 80);
			const skip = /minimi|maximi|restore|close|tab|page|bookmark|zoom|channel|search|back|forward|reload|refresh|home|ai|new/i;
			const menuish = /menu|more|option|kebab|hamburger|ellipsis|account|profile|user|settings/i;
			const ranked = buttons
				.map(({ el, rect }) => ({ el, rect, text: describe(el) }))
				.filter(({ text }) => menuish.test(text) && !skip.test(text.replace(/class=.*/, "")))
				.sort((a, b) => b.rect.right - a.rect.right);
			window.__ebButtons = buttons.map(({ el, rect }) => Math.round(rect.right) + " " + describe(el)).join("\\n");
			const pick = ranked[0];
			if (pick) { pick.el.setAttribute("data-eb-menu", "1"); window.__ebMenu = pick.text; }
			else { window.__ebMenu = "none"; }
		})()`,
		"__ebMenu",
		5000
	);
	const buttons = String((await WebDriver.executeAsync("window.__ebButtons", [], false)) ?? "");
	console.log(`[eb] title bar buttons (right edge, description):\n${buttons}`);
	return found === "none" || found === "pending" ? undefined : found;
}

/**
 * Click Logout in whichever menu window shows it.
 * @param timeoutMs How long to look for the item after the menu was opened.
 * @returns True if Logout was clicked.
 */
async function clickLogoutMenuItem(timeoutMs: number): Promise<boolean> {
	const xpath = "//*[normalize-space(text())='Logout' or normalize-space(text())='Log out']";
	const deadline = Date.now() + timeoutMs;
	do {
		const windows = await WebDriver.getWindows();
		const menus = windows.filter((win) => /menu|popup/i.test(`${win.identity?.name} ${win.url}`));
		for (const win of menus) {
			if (await WebDriver.switchToWindow("handle", win.handle, false)) {
				const item = await firstDisplayed(await WebDriver.findElementsByPath(xpath));
				if (item) {
					console.log(`[eb] clicking Logout in ${win.identity?.name ?? win.url}`);
					await item.click();
					return true;
				}
			}
		}
		await WebDriver.sleep(500);
	} while (Date.now() < deadline);

	// Show what the menu windows contain, so the selector can be fixed from the log.
	const remaining = await WebDriver.getWindows();
	for (const win of remaining.filter((w) => /menu|popup/i.test(`${w.identity?.name} ${w.url}`))) {
		if (await WebDriver.switchToWindow("handle", win.handle, false)) {
			const text = await WebDriver.executeAsync<string>(
				'(document.body ? document.body.innerText : "").replace(/\\s+/g, " ").slice(0, 300)',
				[],
				false
			);
			console.log(`[eb] menu window ${win.identity?.name}: "${text ?? ""}"`);
		}
	}
	return false;
}

/**
 * Log out the way a user does: top-right menu, then Logout. EB persists the
 * session, logs out of HERE ID, quits and restarts itself, then shows the login
 * window again. If the menu cannot be driven (for example it is a native menu),
 * fire the same custom action the Logout item fires so the rest of the run still works.
 * @returns How logout was triggered.
 */
export async function logoutFromMenu(): Promise<"menu" | "action" | "failed"> {
	const browser = await switchToBrowserWindow();
	if (!browser) {
		console.log("[eb] no browser window to open the menu from");
		return "failed";
	}

	const selector = process.env.EB_MENU_BUTTON_SELECTOR ?? "[data-eb-menu]";
	const tagged = process.env.EB_MENU_BUTTON_SELECTOR ? selector : await tagMenuButton();
	const button = tagged ? await WebDriver.findElementByCssSelector(selector) : undefined;
	if (button) {
		console.log(`[eb] opening the menu: ${tagged}`);
		await button.click();
		await saveShot("05-menu-open");
		if (await clickLogoutMenuItem(5000)) {
			return "menu";
		}
		console.log(
			"[eb] Logout item not found in any menu window (native menu?), using the menu's action instead"
		);
	} else {
		console.log("[eb] could not identify the menu button, using the menu's action instead");
	}

	if (!(await switchToBrowserWindow())) {
		return "failed";
	}
	const result = await runInPage(
		`fin.Platform.wrapSync({ uuid: fin.me.identity.uuid }).getClient()
			.then((client) => {
				// Same payload the global menu sends for its Logout item.
				client.dispatch("invokeCustomActionInternal", {
					actionId: "logout-and-restart",
					payload: { callerType: "GlobalContextMenu", windowIdentity: fin.me.identity, customData: {} }
				}).catch(() => {});
				window.__ebLogout = "dispatched";
			})
			.catch((err) => { window.__ebLogout = "failed: " + (err && err.message ? err.message : String(err)); })`,
		"__ebLogout",
		5000
	);
	console.log(`[eb] logout-and-restart action: ${result}`);
	return result === "dispatched" ? "action" : "failed";
}

/**
 *
 */
interface DevToolsTarget {
	/**
	 *
	 */
	id: string;
	/**
	 *
	 */
	type: string;
	/**
	 *
	 */
	url: string;
	/**
	 *
	 */
	title?: string;
	/**
	 *
	 */
	webSocketDebuggerUrl?: string;
}

const DEVTOOLS_PORT = Number(process.env.EB_DEVTOOLS_PORT ?? 9090);

/**
 * List DevTools page targets on the runtime's debugging port.
 * @returns The targets, or undefined when nothing is listening (runtime gone).
 */
async function devToolsTargets(): Promise<DevToolsTarget[] | undefined> {
	try {
		const res = await fetch(`http://127.0.0.1:${DEVTOOLS_PORT}/json/list`, {
			signal: AbortSignal.timeout(3000)
		});
		return (await res.json()) as DevToolsTarget[];
	} catch {
		return undefined;
	}
}

/**
 * Logout makes the RVM relaunch Enterprise Browser as a brand new runtime
 * process. ChromeDriver stays attached to the dead one, so from here on the
 * test talks to the new process's DevTools port directly (the RVM passes
 * `--remote-debugging-port` through to the relaunch). Wait for its login window.
 * @param timeoutMs How long to wait.
 * @returns The login window target, or undefined.
 */
export async function waitForRelaunchedLoginTarget(timeoutMs: number): Promise<DevToolsTarget | undefined> {
	const start = Date.now();
	let sawRuntimeGone = false;
	do {
		const targets = await devToolsTargets();
		if (!targets) {
			if (!sawRuntimeGone) {
				console.log("[eb] DevTools port is down, waiting for the relaunched runtime");
				sawRuntimeGone = true;
			}
		} else {
			const login = targets.find(
				(target) =>
					target.type === "page" && ebEnv.loginUrlPattern.test(target.url) && target.webSocketDebuggerUrl
			);
			if (login && sawRuntimeGone) {
				console.log(`[eb] relaunched runtime is up, login window: ${login.url.split("?")[0]}`);
				return login;
			}
			if (login && Date.now() - start > 5000) {
				// Port never dropped between the two processes; treat the login page as the new one.
				console.log(`[eb] login window found: ${login.url.split("?")[0]}`);
				return login;
			}
		}
		await new Promise((resolve) => setTimeout(resolve, 1000));
	} while (Date.now() - start < timeoutMs);
	return undefined;
}

/**
 * Evaluate an expression in a DevTools page target without ChromeDriver.
 * @param target The page target.
 * @param expression The expression to run.
 * @param timeoutMs How long to wait for the answer.
 * @returns The result value, or a description of why there is none.
 */
async function evaluateViaDevTools(
	target: DevToolsTarget,
	expression: string,
	timeoutMs = 10000
): Promise<string> {
	if (!target.webSocketDebuggerUrl) {
		return "target has no debugger url";
	}
	const socket = new WebSocket(target.webSocketDebuggerUrl);
	try {
		await new Promise<void>((resolve, reject) => {
			socket.addEventListener("open", () => resolve(), { once: true });
			socket.addEventListener("error", () => reject(new Error("DevTools socket failed")), { once: true });
		});
		const reply = new Promise<string>((resolve) => {
			socket.addEventListener("message", (event) => {
				const msg = JSON.parse(String(event.data)) as {
					id?: number;
					result?: {
						result?: { value?: unknown; description?: string };
						exceptionDetails?: { text?: string };
					};
				};
				if (msg.id === 1) {
					resolve(
						msg.result?.exceptionDetails
							? `threw: ${msg.result.exceptionDetails.text}`
							: String(msg.result?.result?.value ?? msg.result?.result?.description)
					);
				}
			});
		});
		socket.send(
			JSON.stringify({ id: 1, method: "Runtime.evaluate", params: { expression, returnByValue: true } })
		);
		return await Promise.race([
			reply,
			new Promise<string>((resolve) =>
				setTimeout(() => resolve(`no answer within ${timeoutMs}ms`), timeoutMs)
			)
		]);
	} finally {
		socket.close();
	}
}

/**
 * Close Enterprise Browser from inside, so nothing is left for the CLI to kill.
 * Killing the runtime is what produced the "renderer killed, exit code 9" dialog
 * and the orphaned empty window. Quit both apps from the login window, then wait
 * for the runtime to exit; with no app registered for relaunch the RVM lets it go.
 * @param target The login window target in the relaunched runtime.
 * @param timeoutMs How long to wait for the runtime to exit.
 * @returns True if the DevTools port went away, meaning the runtime exited.
 */
export async function quitEnterpriseBrowser(target: DevToolsTarget, timeoutMs = 30000): Promise<boolean> {
	const result = await evaluateViaDevTools(
		target,
		`(() => {
			const uuid = fin.me.identity.uuid;
			fin.Application.wrapSync({ uuid: uuid + "-notifications" }).quit(true).catch(() => {});
			fin.Application.getCurrentSync().quit(true).catch(() => {});
			return "quit requested for " + uuid;
		})()`
	);
	console.log(`[eb] quit Enterprise Browser: ${result}`);

	const start = Date.now();
	do {
		await new Promise((resolve) => setTimeout(resolve, 1000));
		const targets = await devToolsTargets();
		if (!targets) {
			console.log(`[eb] runtime exited after ${Date.now() - start}ms`);
			return true;
		}
		const remaining = targets.filter((t) => t.type === "page" && /here\.io|openfin\.co/.test(t.url));
		if (remaining.length === 0) {
			console.log(`[eb] no Enterprise Browser pages left after ${Date.now() - start}ms (runtime still up)`);
			return true;
		}
	} while (Date.now() - start < timeoutMs);
	console.log("[eb] Enterprise Browser pages still open:");
	for (const t of (await devToolsTargets()) ?? []) {
		console.log(`  - ${t.type} title="${t.title}" url=${t.url}`);
	}
	return false;
}

/**
 * Time a call so a wedged driver shows up in the log instead of as a silent stall.
 * @param label What is being timed.
 * @param op The operation to run.
 * @returns The operation result.
 */
export async function timed<T>(label: string, op: () => Promise<T>): Promise<T> {
	const start = Date.now();
	try {
		return await op();
	} finally {
		console.log(`[eb] ${label} took ${Date.now() - start}ms`);
	}
}
