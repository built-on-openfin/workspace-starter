import { mapToFDC3App, mapToPlatformApp } from "../../../../client/src/framework/fdc3/2.0/mapper";
import type { PlatformApp } from "../../../../client/src/framework/shapes/app-shapes";
import type { AppDefinition } from "../../../../client/src/framework/shapes/fdc3-2-0-shapes";

/**
 * Build a minimal FDC3 2.0 "other" type app definition for testing hostManifests fallback.
 * @param hostManifests The hostManifests object to attach to the app definition.
 * @returns The app definition.
 */
function buildOtherAppDefinition(hostManifests: AppDefinition["hostManifests"]): AppDefinition {
	return {
		appId: "test-app",
		name: "test-app",
		type: "other",
		details: {},
		hostManifests
	} as AppDefinition;
}

/**
 * Build a minimal FDC3 2.0 "web" type app definition for testing hostManifests fallback.
 * @param hostManifests The hostManifests object to attach to the app definition.
 * @returns The app definition.
 */
function buildWebAppDefinition(hostManifests: AppDefinition["hostManifests"]): AppDefinition {
	return {
		appId: "test-web-app",
		name: "test-web-app",
		type: "web",
		details: { url: "https://example.com/app" },
		hostManifests
	} as AppDefinition;
}

describe("fdc3 2.0 mapper", () => {
	describe("mapToPlatformApp", () => {
		it("should use HERE settings when only HERE is present", () => {
			const app = buildOtherAppDefinition({
				HERE: {
					type: "view",
					details: "https://example.com/here-manifest.json",
					config: { autostart: true, private: true, instanceMode: "single" }
				}
			});

			const platformApp = mapToPlatformApp(app);

			expect(platformApp.manifestType).toBe("view");
			expect(platformApp.manifest).toBe("https://example.com/here-manifest.json");
			expect(platformApp.autostart).toBe(true);
			expect(platformApp.private).toBe(true);
			expect(platformApp.instanceMode).toBe("single");
		});

		it("should fall back to OpenFin settings when HERE is not present", () => {
			const app = buildOtherAppDefinition({
				OpenFin: {
					type: "view",
					details: "https://example.com/openfin-manifest.json",
					config: { autostart: false, private: false, instanceMode: "multi" }
				}
			});

			const platformApp = mapToPlatformApp(app);

			expect(platformApp.manifestType).toBe("view");
			expect(platformApp.manifest).toBe("https://example.com/openfin-manifest.json");
			expect(platformApp.autostart).toBe(false);
			expect(platformApp.private).toBe(false);
			expect(platformApp.instanceMode).toBe("multi");
		});

		it("should prefer HERE settings over OpenFin settings when both are present", () => {
			const app = buildOtherAppDefinition({
				HERE: {
					type: "here-view",
					details: "https://example.com/here-manifest.json",
					config: { autostart: true, instanceMode: "single" }
				},
				OpenFin: {
					type: "openfin-view",
					details: "https://example.com/openfin-manifest.json",
					config: { autostart: false, instanceMode: "multi" }
				}
			});

			const platformApp = mapToPlatformApp(app);

			expect(platformApp.manifestType).toBe("here-view");
			expect(platformApp.manifest).toBe("https://example.com/here-manifest.json");
			expect(platformApp.autostart).toBe(true);
			expect(platformApp.instanceMode).toBe("single");
		});

		it("should return an empty manifest type and undefined config when neither HERE nor OpenFin is present", () => {
			const app = buildOtherAppDefinition(undefined);

			const platformApp = mapToPlatformApp(app);

			expect(platformApp.manifestType).toBe("");
			expect(platformApp.manifest).toBeUndefined();
			expect(platformApp.autostart).toBeUndefined();
			expect(platformApp.private).toBeUndefined();
			expect(platformApp.instanceMode).toBeUndefined();
		});

		it("should merge HERE details into a web app manifest", () => {
			const app = buildWebAppDefinition({
				HERE: { details: { preloadScripts: ["https://example.com/preload.js"] } }
			});

			const platformApp = mapToPlatformApp(app);

			expect(platformApp.manifest).toEqual({
				url: "https://example.com/app",
				fdc3InteropApi: "2.0",
				preloadScripts: ["https://example.com/preload.js"]
			});
		});

		it("should fall back to OpenFin details when merging a web app manifest and HERE is not present", () => {
			const app = buildWebAppDefinition({
				OpenFin: { details: { preloadScripts: ["https://example.com/preload.js"] } }
			});

			const platformApp = mapToPlatformApp(app);

			expect(platformApp.manifest).toEqual({
				url: "https://example.com/app",
				fdc3InteropApi: "2.0",
				preloadScripts: ["https://example.com/preload.js"]
			});
		});

		it("should produce a plain web app manifest when neither HERE nor OpenFin details are present", () => {
			const app = buildWebAppDefinition(undefined);

			const platformApp = mapToPlatformApp(app);

			expect(platformApp.manifest).toEqual({
				url: "https://example.com/app",
				fdc3InteropApi: "2.0"
			});
		});
	});

	describe("mapToFDC3App", () => {
		it("should write settings to hostManifests.HERE and not hostManifests.OpenFin", () => {
			const platformApp = {
				appId: "test-app",
				name: "test-app",
				manifestType: "view",
				manifest: "https://example.com/here-manifest.json",
				autostart: true,
				private: true,
				instanceMode: "single"
			} as PlatformApp;

			const app = mapToFDC3App(platformApp);

			expect(app.hostManifests?.HERE).toEqual({
				type: "view",
				details: "https://example.com/here-manifest.json",
				config: {
					autostart: true,
					private: true,
					instanceMode: "single",
					launchPreference: undefined
				}
			});
			expect(app.hostManifests?.OpenFin).toBeUndefined();
		});
	});
});
