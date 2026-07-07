import { DockButtonNames, type DockButton } from "@openfin/workspace";
import type { Dock3Config } from "@openfin/workspace-platform";
import type { DockProviderOptions } from "../../../client/src/framework/shapes/dock-shapes";
import type * as Dock3Module from "../../../client/src/framework/workspace/dock3";

jest.mock("@openfin/workspace-platform", () => ({
	Dock: { init: jest.fn() },
	CustomActionCallerType: { CustomButton: "custom-button" }
}));

jest.mock("../../../client/src/framework/actions", () => ({
	callAction: jest.fn()
}));

jest.mock("../../../client/src/framework/endpoint", () => ({
	hasEndpoint: jest.fn()
}));

jest.mock("../../../client/src/framework/themes", () => ({
	getCurrentColorSchemeMode: jest.fn().mockResolvedValue("light")
}));

jest.mock("../../../client/src/framework/workspace/dock-shared", () => ({
	DOCK_ENDPOINT_ID_GET: "dock-get",
	DOCK_ENDPOINT_ID_SET: "dock-set",
	buildButtons: jest.fn(),
	buildWorkspaceButtons: jest.fn(),
	getDockProviderOptions: jest.fn(),
	getRegisteredButtons: jest.fn(),
	orderByIds: jest.fn(),
	requestStoredDockConfig: jest.fn(),
	sendDockConfigToEndpoint: jest.fn(),
	setDockProviderOptions: jest.fn(),
	setRegisteredBootstrapOptions: jest.fn(),
	setRegisteredButtons: jest.fn(),
	subscribeToUpdates: jest.fn(),
	unsubscribeFromUpdates: jest.fn()
}));

const DOCK3_MODULE_PATH = "../../../client/src/framework/workspace/dock3";
const WORKSPACE_PLATFORM_MODULE_PATH = "@openfin/workspace-platform";
const ACTIONS_MODULE_PATH = "../../../client/src/framework/actions";
const ENDPOINT_MODULE_PATH = "../../../client/src/framework/endpoint";
const THEMES_MODULE_PATH = "../../../client/src/framework/themes";
const DOCK_SHARED_MODULE_PATH = "../../../client/src/framework/workspace/dock-shared";

/**
 * A mocked dock3 window, as returned by `Dock3Provider.getWindowSync()`.
 */
interface MockDockWindow {
	/**
	 * Show the window.
	 */
	show: jest.Mock;

	/**
	 * Focus the window.
	 */
	focus: jest.Mock;

	/**
	 * Minimize the window.
	 */
	minimize: jest.Mock;

	/**
	 * Get the bounds of the window.
	 */
	getBounds: jest.Mock;

	/**
	 * The identity of the window.
	 */
	identity: { uuid: string; name: string };
}

/**
 * Create a mocked dock3 window.
 * @returns A mocked dock3 window.
 */
function createMockWindow(): MockDockWindow {
	return {
		show: jest.fn().mockResolvedValue(undefined),
		focus: jest.fn().mockResolvedValue(undefined),
		minimize: jest.fn().mockResolvedValue(undefined),
		getBounds: jest.fn().mockResolvedValue({ left: 0, top: 0 }),
		identity: { uuid: "platform", name: "dock3-window" }
	};
}

/**
 * A minimal stand-in for the real Dock3 `Base` class that `Dock.init`'s `override` callback is
 * given. Provides just enough surface (config, getWindowSync, shutdown, updateConfig, loadConfig,
 * saveConfig) for the `CustomProvider` class defined in dock3.ts to extend and for `super.x()`
 * calls to resolve to something observable.
 */
class MockBaseProvider {
	public config: Dock3Config;

	/**
	 * Create a mocked base provider.
	 * @param config The initial dock3 config.
	 */
	constructor(config: Dock3Config) {
		this.config = config;
	}

	/**
	 * Get the dock3 window synchronously.
	 * @throws Always, unless stubbed per test via `jest.spyOn`.
	 */
	public getWindowSync(): MockDockWindow {
		throw new Error("getWindowSync should be stubbed per test via jest.spyOn");
	}

	/**
	 * Shut down the provider.
	 * @returns Nothing.
	 */
	public async shutdown(): Promise<void> {}

	/**
	 * Update the dock3 config.
	 * @param config The new dock3 config.
	 * @returns Nothing.
	 */
	public async updateConfig(config: Dock3Config): Promise<void> {
		this.config = config;
	}

	/**
	 * Load the dock3 config from the default (non-custom) storage.
	 * @returns The current dock3 config.
	 */
	public async loadConfig(): Promise<Dock3Config> {
		return this.config;
	}

	/**
	 * Save the dock3 config to the default (non-custom) storage.
	 * @param _options The save options.
	 * @param _options.config The dock3 config to save.
	 * @returns Nothing.
	 */
	public async saveConfig(_options: { config: Dock3Config }): Promise<void> {}
}

/**
 * The `CustomProvider` class defined inside dock3.ts extends `Base` with these additional
 * overrides. `override(MockBaseProvider)` returns that extended class, but TypeScript can't see
 * its shape statically since it's defined dynamically inside dock3.ts, so this type describes it
 * for the purposes of these tests.
 */
type CustomProviderInstance = MockBaseProvider & {
	launchEntry: (payload: unknown) => Promise<void>;
	moreMenuCustomOptionClicked: (payload: unknown) => Promise<void>;
	bookmarkContentMenuEntry: (payload: unknown) => Promise<void>;
};

/**
 * Dock3.ts has module-level singleton state (`initializedDock3Provider`/`dock3RegistrationMetaInfo`),
 * so every test needs a fresh module instance and fresh mocks.
 * @returns The freshly loaded dock3 module along with its mocked dependencies.
 */
function loadDock3(): {
	dock3: typeof Dock3Module;
	workspacePlatformMock: { Dock: { init: jest.Mock }; CustomActionCallerType: { CustomButton: string } };
	actionsMock: { callAction: jest.Mock };
	endpointMock: { hasEndpoint: jest.Mock };
	themesMock: { getCurrentColorSchemeMode: jest.Mock };
	dockSharedMock: {
		buildButtons: jest.Mock;
		buildWorkspaceButtons: jest.Mock;
		getDockProviderOptions: jest.Mock;
		getRegisteredButtons: jest.Mock;
		orderByIds: jest.Mock;
		requestStoredDockConfig: jest.Mock;
		sendDockConfigToEndpoint: jest.Mock;
		setDockProviderOptions: jest.Mock;
		setRegisteredBootstrapOptions: jest.Mock;
		setRegisteredButtons: jest.Mock;
		subscribeToUpdates: jest.Mock;
		unsubscribeFromUpdates: jest.Mock;
	};
} {
	jest.resetModules();

	// eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires
	const dock3 = require(DOCK3_MODULE_PATH);
	const workspacePlatformMock = jest.requireMock(WORKSPACE_PLATFORM_MODULE_PATH);
	const actionsMock = jest.requireMock(ACTIONS_MODULE_PATH);
	const endpointMock = jest.requireMock(ENDPOINT_MODULE_PATH);
	const themesMock = jest.requireMock(THEMES_MODULE_PATH);
	const dockSharedMock = jest.requireMock(DOCK_SHARED_MODULE_PATH);

	return { dock3, workspacePlatformMock, actionsMock, endpointMock, themesMock, dockSharedMock };
}

/**
 * A factory for the `CustomProvider` class, as passed to `Dock.init`'s `override` option.
 */
type DockOverrideFactory = (Base: typeof MockBaseProvider) => typeof MockBaseProvider;

/**
 * Registers dock3, capturing the `CustomProvider` instance created via the `override` callback
 * passed to `Dock.init`, so tests can exercise its overridden methods directly.
 * @param dock3 The dock3 module under test.
 * @param workspacePlatformMock The mocked `@openfin/workspace-platform` module.
 * @param workspacePlatformMock.Dock The mocked `Dock` namespace.
 * @param workspacePlatformMock.Dock.init The mocked `Dock.init` function.
 * @param options The dock provider options to register with.
 * @param mockWindow The mocked dock3 window to return from `getWindowSync`.
 * @returns The `CustomProvider` instance created during registration.
 */
async function registerDock3(
	dock3: typeof Dock3Module,
	workspacePlatformMock: { Dock: { init: jest.Mock } },
	options: DockProviderOptions,
	mockWindow: MockDockWindow
): Promise<{ providerInstance: CustomProviderInstance }> {
	jest.spyOn(MockBaseProvider.prototype, "getWindowSync").mockReturnValue(mockWindow);

	let providerInstance!: CustomProviderInstance;
	workspacePlatformMock.Dock.init.mockImplementation(
		async (initOptions: { config: Dock3Config; override: DockOverrideFactory }) => {
			const providerClass = initOptions.override(MockBaseProvider);
			providerInstance = new providerClass(initOptions.config) as CustomProviderInstance;
			return providerInstance;
		}
	);

	await dock3.register(options, undefined);

	return { providerInstance };
}

describe("dock3", () => {
	const options: DockProviderOptions = { id: "dock", title: "Dock", icon: "icon.png" };

	afterEach(() => {
		jest.restoreAllMocks();
	});

	describe("register", () => {
		it("should always request the dock3-only workspace buttons from buildWorkspaceButtons", async () => {
			// Regression guard: dock3 must always ask for the v3-only buttons (e.g. "contentMenu"),
			// the mirror image of the dock1 guard - dock1 must never ask for them.
			const { dock3, workspacePlatformMock, dockSharedMock } = loadDock3();
			dockSharedMock.buildButtons.mockResolvedValue([]);
			dockSharedMock.buildWorkspaceButtons.mockReturnValue(["switchWorkspace", "contentMenu"]);

			await registerDock3(dock3, workspacePlatformMock, options, createMockWindow());

			expect(dockSharedMock.buildWorkspaceButtons).toHaveBeenCalledWith(undefined, true);
			expect(workspacePlatformMock.Dock.init).toHaveBeenCalledWith(
				expect.objectContaining({
					config: expect.objectContaining({
						title: options.title,
						icon: options.icon,
						defaultDockButtons: ["switchWorkspace", "contentMenu"]
					})
				})
			);
		});

		it("should build the registered buttons and subscribe to lifecycle updates", async () => {
			const { dock3, workspacePlatformMock, dockSharedMock } = loadDock3();
			const buttons: DockButton[] = [{ id: "a", type: DockButtonNames.ActionButton, tooltip: "A", action: { id: "x" } } as DockButton];
			dockSharedMock.buildButtons.mockResolvedValue(buttons);
			dockSharedMock.buildWorkspaceButtons.mockReturnValue([]);

			await registerDock3(dock3, workspacePlatformMock, options, createMockWindow());

			expect(dockSharedMock.setRegisteredButtons).toHaveBeenCalledWith(buttons);
			expect(dockSharedMock.subscribeToUpdates).toHaveBeenCalledWith(expect.any(Function));
		});

		it("should map action buttons to favorites and other buttons to the content menu", async () => {
			const { dock3, workspacePlatformMock, dockSharedMock } = loadDock3();
			const buttons: DockButton[] = [
				{ id: "fav", type: DockButtonNames.ActionButton, tooltip: "Fav", action: { id: "x" } } as DockButton,
				{ id: "menu", tooltip: "Menu", action: { id: "y" } } as DockButton
			];
			dockSharedMock.buildButtons.mockResolvedValue(buttons);
			dockSharedMock.buildWorkspaceButtons.mockReturnValue([]);

			await registerDock3(dock3, workspacePlatformMock, options, createMockWindow());

			expect(workspacePlatformMock.Dock.init).toHaveBeenCalledWith(
				expect.objectContaining({
					config: expect.objectContaining({
						favorites: [expect.objectContaining({ id: "fav" })],
						contentMenu: [expect.objectContaining({ id: "menu" })]
					})
				})
			);
		});
	});

	describe("deregister", () => {
		it("should unsubscribe from updates, clear the dock provider options and shut down the provider", async () => {
			const { dock3, workspacePlatformMock, dockSharedMock } = loadDock3();
			dockSharedMock.buildButtons.mockResolvedValue([]);
			dockSharedMock.buildWorkspaceButtons.mockReturnValue([]);
			const { providerInstance } = await registerDock3(dock3, workspacePlatformMock, options, createMockWindow());
			const shutdownSpy = jest.spyOn(providerInstance, "shutdown");

			await dock3.deregister();

			expect(dockSharedMock.unsubscribeFromUpdates).toHaveBeenCalled();
			expect(dockSharedMock.setDockProviderOptions).toHaveBeenCalledWith(undefined);
			expect(shutdownSpy).toHaveBeenCalled();
		});
	});

	describe("show/minimize", () => {
		it("should not throw and should not touch a window before registration", async () => {
			const { dock3 } = loadDock3();

			await expect(dock3.show()).resolves.toBeUndefined();
			await expect(dock3.minimize()).resolves.toBeUndefined();
		});

		it("show() should show and focus the dock window after registration", async () => {
			const { dock3, workspacePlatformMock, dockSharedMock } = loadDock3();
			dockSharedMock.buildButtons.mockResolvedValue([]);
			dockSharedMock.buildWorkspaceButtons.mockReturnValue([]);
			const mockWindow = createMockWindow();
			await registerDock3(dock3, workspacePlatformMock, options, mockWindow);

			await dock3.show();

			expect(mockWindow.show).toHaveBeenCalled();
			expect(mockWindow.focus).toHaveBeenCalled();
		});

		it("minimize() should minimize the dock window after registration", async () => {
			const { dock3, workspacePlatformMock, dockSharedMock } = loadDock3();
			dockSharedMock.buildButtons.mockResolvedValue([]);
			dockSharedMock.buildWorkspaceButtons.mockReturnValue([]);
			const mockWindow = createMockWindow();
			await registerDock3(dock3, workspacePlatformMock, options, mockWindow);

			await dock3.minimize();

			expect(mockWindow.minimize).toHaveBeenCalled();
		});
	});

	describe("CustomProvider.loadConfig", () => {
		it("should map the stored v1 button order onto favorites/contentMenu when a get endpoint is configured", async () => {
			const { dock3, workspacePlatformMock, endpointMock, dockSharedMock } = loadDock3();
			dockSharedMock.buildButtons.mockResolvedValue([]);
			dockSharedMock.buildWorkspaceButtons.mockReturnValue([]);
			const { providerInstance } = await registerDock3(dock3, workspacePlatformMock, options, createMockWindow());
			providerInstance.config = {
				...providerInstance.config,
				favorites: [{ id: "fav-a" }],
				contentMenu: [{ id: "menu-a" }]
			} as Dock3Config;

			endpointMock.hasEndpoint.mockReturnValue(true);
			dockSharedMock.getDockProviderOptions.mockReturnValue(options);
			dockSharedMock.getRegisteredButtons.mockReturnValue([{ id: "a" }]);
			dockSharedMock.requestStoredDockConfig.mockResolvedValue({
				id: "dock",
				title: "Dock",
				icon: "icon.png",
				buttons: [{ id: "b" }, { id: "a" }]
			});
			const reorderedFavorites = [{ id: "reordered-fav" }];
			const reorderedContentMenu = [{ id: "reordered-menu" }];
			dockSharedMock.orderByIds.mockReturnValueOnce(reorderedFavorites).mockReturnValueOnce(reorderedContentMenu);

			const result = await providerInstance.loadConfig();

			expect(dockSharedMock.requestStoredDockConfig).toHaveBeenCalledWith(options.id, [{ id: "a" }]);
			expect(dockSharedMock.orderByIds).toHaveBeenNthCalledWith(1, [{ id: "fav-a" }], ["b", "a"]);
			expect(dockSharedMock.orderByIds).toHaveBeenNthCalledWith(2, [{ id: "menu-a" }], ["b", "a"]);
			expect(result.favorites).toBe(reorderedFavorites);
			expect(result.contentMenu).toBe(reorderedContentMenu);
		});

		it("should fall back to the default dock3 storage when no get endpoint is configured", async () => {
			const { dock3, workspacePlatformMock, endpointMock, dockSharedMock } = loadDock3();
			dockSharedMock.buildButtons.mockResolvedValue([]);
			dockSharedMock.buildWorkspaceButtons.mockReturnValue([]);
			const { providerInstance } = await registerDock3(dock3, workspacePlatformMock, options, createMockWindow());
			const superLoadConfigSpy = jest.spyOn(MockBaseProvider.prototype, "loadConfig");
			endpointMock.hasEndpoint.mockReturnValue(false);

			const result = await providerInstance.loadConfig();

			expect(superLoadConfigSpy).toHaveBeenCalled();
			expect(dockSharedMock.requestStoredDockConfig).not.toHaveBeenCalled();
			expect(result).toBe(providerInstance.config);
		});
	});

	describe("CustomProvider.saveConfig", () => {
		it("should convert to a v1 config and persist via the custom endpoint when configured", async () => {
			const { dock3, workspacePlatformMock, endpointMock, dockSharedMock } = loadDock3();
			dockSharedMock.buildButtons.mockResolvedValue([]);
			dockSharedMock.buildWorkspaceButtons.mockReturnValue([]);
			const { providerInstance } = await registerDock3(dock3, workspacePlatformMock, options, createMockWindow());

			endpointMock.hasEndpoint.mockReturnValue(true);
			dockSharedMock.getRegisteredButtons.mockReturnValue([{ id: "a" }, { id: "b" }]);
			dockSharedMock.getDockProviderOptions.mockReturnValue(options);
			dockSharedMock.orderByIds.mockReturnValue([{ id: "b" }, { id: "a" }]);
			dockSharedMock.sendDockConfigToEndpoint.mockResolvedValue(true);

			const configToSave = {
				...providerInstance.config,
				favorites: [{ id: "b" }],
				contentMenu: [{ id: "a" }]
			} as Dock3Config;

			await providerInstance.saveConfig({ config: configToSave });

			expect(dockSharedMock.orderByIds).toHaveBeenCalledWith([{ id: "a" }, { id: "b" }], ["b", "a"]);
			expect(dockSharedMock.sendDockConfigToEndpoint).toHaveBeenCalledWith(
				expect.objectContaining({
					id: options.id,
					title: options.title,
					icon: options.icon,
					buttons: [{ id: "b" }, { id: "a" }]
				})
			);
		});

		it("should fall back to the default dock3 storage when no set endpoint is configured", async () => {
			const { dock3, workspacePlatformMock, endpointMock, dockSharedMock } = loadDock3();
			dockSharedMock.buildButtons.mockResolvedValue([]);
			dockSharedMock.buildWorkspaceButtons.mockReturnValue([]);
			const { providerInstance } = await registerDock3(dock3, workspacePlatformMock, options, createMockWindow());
			const superSaveConfigSpy = jest.spyOn(MockBaseProvider.prototype, "saveConfig");
			endpointMock.hasEndpoint.mockReturnValue(false);

			const configToSave = { ...providerInstance.config } as Dock3Config;
			await providerInstance.saveConfig({ config: configToSave });

			expect(superSaveConfigSpy).toHaveBeenCalledWith({ config: configToSave });
			expect(dockSharedMock.sendDockConfigToEndpoint).not.toHaveBeenCalled();
		});
	});

	describe("CustomProvider action overrides", () => {
		it("launchEntry() should call the action with the position info for the dock window", async () => {
			const { dock3, workspacePlatformMock, actionsMock, dockSharedMock } = loadDock3();
			dockSharedMock.buildButtons.mockResolvedValue([]);
			dockSharedMock.buildWorkspaceButtons.mockReturnValue([]);
			const mockWindow = createMockWindow();
			const { providerInstance } = await registerDock3(dock3, workspacePlatformMock, options, mockWindow);

			await providerInstance.launchEntry({
				entry: {
					type: "item",
					itemData: { action: { id: "launch-app", customData: { appId: "app-1" } } }
				}
			});

			expect(actionsMock.callAction).toHaveBeenCalledWith(
				"launch-app",
				expect.objectContaining({
					callerType: "custom-button",
					windowIdentity: mockWindow.identity,
					customData: { appId: "app-1" }
				})
			);
		});

		it("moreMenuCustomOptionClicked() should call the action with the position info for the dock window", async () => {
			const { dock3, workspacePlatformMock, actionsMock, dockSharedMock } = loadDock3();
			dockSharedMock.buildButtons.mockResolvedValue([]);
			dockSharedMock.buildWorkspaceButtons.mockReturnValue([]);
			const mockWindow = createMockWindow();
			const { providerInstance } = await registerDock3(dock3, workspacePlatformMock, options, mockWindow);

			await providerInstance.moreMenuCustomOptionClicked({ action: "more-action", customData: { foo: "bar" } });

			expect(actionsMock.callAction).toHaveBeenCalledWith(
				"more-action",
				expect.objectContaining({
					callerType: "custom-button",
					windowIdentity: mockWindow.identity,
					customData: { foo: "bar" }
				})
			);
		});

		it("bookmarkContentMenuEntry() should not call any action (bookmarking is not supported)", async () => {
			const { dock3, workspacePlatformMock, actionsMock, dockSharedMock } = loadDock3();
			dockSharedMock.buildButtons.mockResolvedValue([]);
			dockSharedMock.buildWorkspaceButtons.mockReturnValue([]);
			const { providerInstance } = await registerDock3(dock3, workspacePlatformMock, options, createMockWindow());

			await expect(
				providerInstance.bookmarkContentMenuEntry({ entry: { id: "a" } })
			).resolves.toBeUndefined();

			expect(actionsMock.callAction).not.toHaveBeenCalled();
		});
	});
});
