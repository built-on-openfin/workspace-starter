import { MouseButton, OpenFinView, WebDriver, WebDriverKeys } from "@openfin/automation-helpers";

/**
 * Generic element primitives are demonstrated here against a
 * view the client owns (view1.html), not against OpenFin's own components. This
 * is the "drive your own app" pattern: launch your view, switch to it, then use
 * the low-level element API on your own DOM.
 */
describe("App view (client-owned content)", () => {
	let view: Awaited<ReturnType<typeof OpenFinView.create>>;

	beforeAll(async () => {
		view = await OpenFinView.create({ url: "http://localhost:8080/view1.html", name: "view1" });
		expect(view).toBeDefined();
		// Wait for the view's DOM to be ready before running tests.
		expect(await WebDriver.waitForElementById("greeting", 10000)).toBeDefined();
	});

	afterAll(async () => {
		// This suite shares one runtime session across every spec file, so the
		// content window would otherwise persist for the rest of the run, adding
		// window-enumeration load to every later waitForWindow scan.
		if (view) {
			await OpenFinView.close(view);
		}
	});

	it("can read text from the view", async () => {
		const heading = await WebDriver.findElementById("greeting");
		expect(heading).toBeDefined();
		expect(await heading!.getText()).toBe("Automation Demo View 1");
	});

	it("can set, get and remove an attribute", async () => {
		const input = await WebDriver.findElementById("demo-input");
		await input!.setAttribute("disabled", "true");
		expect(await input!.getAttribute("disabled")).toBe("true");
		await input!.removeAttribute("disabled");
		expect(await input!.getAttribute("disabled")).toBeNull();
	});

	it("can set, get and remove a property", async () => {
		const input = await WebDriver.findElementById("demo-input");
		await input!.setProperty("data-prop", "foo");
		expect(await input!.getProperty("data-prop")).toBe("foo");
		await input!.removeProperty("data-prop");
		expect(await input!.getProperty("data-prop")).toBe(undefined);
	});

	it("can set, get and remove a style (roundtrip to the CSS baseline)", async () => {
		const input = await WebDriver.findElementById("demo-input");
		const initial = (await input!.getStyle()).fontSize;

		await input!.setStyle({ fontSize: "50px" });
		expect((await input!.getStyle()).fontSize).toBe("50px");

		await input!.removeStyle(["fontSize"]);
		expect((await input!.getStyle()).fontSize).toBe(initial);
	});

	it("can type and edit with keyboard and mouse actions", async () => {
		const input = await WebDriver.findElementById("demo-input");

		await WebDriver.actions([
			{ type: "keyPress", key: "tt" },
			{ type: "keyPress", key: WebDriverKeys.Backspace },
			{ type: "keyPress", key: "h" },
			{ type: "keyPress", key: "i" },
			{ type: "keyPress", key: "s" },
			// Drag-select across the field, then delete the selection.
			{ type: "mouseMove", origin: input!, x: 100 },
			{ type: "mouseDown", button: MouseButton.Left },
			{ type: "mouseMove", origin: input!, x: 0 },
			{ type: "mouseUp", button: MouseButton.Left },
			{ type: "keyPress", key: WebDriverKeys.Delete }
		]);

		expect(await input!.getAttribute("value")).toBe("");
	});
});
