import { type Page } from "@playwright/test";
import { PlaywrightElement } from "@openfin/automation-playwright";
import { expect, test } from "../fixtures";

/**
 * Generic element primitives are demonstrated here — against a
 * view the client owns (view1.html), not against OpenFin's own components.
 */
test.describe("App view (client-owned content, Playwright over CDP)", () => {
	let view: Page;

	test.beforeAll(async ({ workspace }) => {
		// Open view1.html as a new page on the shared CDP connection.
		view = await workspace.browser.contexts()[0].newPage();
		await view.goto("http://localhost:8080/view1.html");
		await view.waitForLoadState("domcontentloaded");
	});

	test.afterAll(async () => {
		// Close only the page we created; the shared browser is torn down by the
		// worker fixture, not here. Leaving the page open would persist it in the
		// runtime for later specs.
		await view?.close();
	});

	test("can read text from the view", async () => {
		expect(await view.locator("#greeting").innerText()).toBe("Automation Demo View 1");
	});

	test("can set, get and remove an attribute via PlaywrightElement", async () => {
		const input = new PlaywrightElement(view.locator("#demo-input"));
		await input.setAttribute("disabled", "true");
		expect(await input.getAttribute("disabled")).toBe("true");
		await input.removeAttribute("disabled");
		expect(await input.getAttribute("disabled")).toBeNull();
	});

	test("can set, get and remove a property via PlaywrightElement", async () => {
		const input = new PlaywrightElement(view.locator("#demo-input"));
		await input.setProperty("data-prop", "foo");
		expect(await input.getProperty("data-prop")).toBe("foo");
		await input.removeProperty("data-prop");
		expect(await input.getProperty("data-prop")).toBeUndefined();
	});

	test("can set, get and remove a style (roundtrip to the CSS baseline)", async () => {
		const input = new PlaywrightElement(view.locator("#demo-input"));
		const initial = await input.getStyleProperty("fontSize");

		await input.setStyle({ fontSize: "50px" });
		expect(await input.getStyleProperty("fontSize")).toBe("50px");

		await input.removeStyle(["fontSize"]);
		expect(await input.getStyleProperty("fontSize")).toBe(initial);
	});

	test("can type and edit with keyboard and mouse", async () => {
		const input = view.locator("#demo-input");
		await input.click();
		await input.fill("");

		await view.keyboard.type("tt");
		await view.keyboard.press("Backspace");
		await view.keyboard.type("his");
		expect(await input.inputValue()).toBe("this");

		const box = await input.boundingBox();
		expect(box).not.toBeNull();
		const midY = box!.y + box!.height / 2;
		await view.mouse.move(box!.x + box!.width - 5, midY);
		await view.mouse.down();
		await view.mouse.move(box!.x + 2, midY, { steps: 5 });
		await view.mouse.up();
		await view.keyboard.press("Delete");

		expect(await input.inputValue()).toBe("");
	});
});
