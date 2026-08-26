import { chromium, expect, test, type Page } from "@playwright/test";
import { cdpHttpEndpoint, finSnippets, waitForCdpTarget } from "@openfin/automation-cdp";
import { loadOpenFinConfig } from "../openfin.cdp-config";

const { devToolsPort } = await loadOpenFinConfig();

test("the OpenFin runtime is reachable over CDP", async () => {
	// 1. Confirm OpenFin exposes at least one real page target on the CDP endpoint.
	const pageTarget = await waitForCdpTarget(
		devToolsPort,
		(target) => target.type === "page" && /^https?:/.test(target.url),
		60000
	);
	expect(pageTarget.url).toBeTruthy();

	// 2. Attach Playwright over CDP (does not launch a browser; connects to OpenFin).
	const browser = await chromium.connectOverCDP(cdpHttpEndpoint(devToolsPort));
	try {
		// 3. Find the page that exposes the fin API.
		const pages: Page[] = browser.contexts().flatMap((context) => context.pages());
		let finPage: Page | undefined;
		for (const page of pages) {
			const ready = await page.evaluate(finSnippets.isReady).catch(() => false);
			if (ready) {
				finPage = page;
				break;
			}
		}
		expect(finPage, "expected a page exposing window.fin").toBeTruthy();

		// 4. Drive an OpenFin API over CDP via evaluate.
		const version = await (finPage as Page).evaluate(finSnippets.version);
		expect(version).toMatch(/^\d+\.\d+\.\d+\.\d+$/);
	} finally {
		await browser.close();
	}
});
