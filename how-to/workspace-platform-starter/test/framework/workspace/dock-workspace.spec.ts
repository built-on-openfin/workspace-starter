import type { DockButton, DockProviderRegistration } from "@openfin/workspace";
import type { DockProviderConfigWithIdentity } from "@openfin/workspace-platform/client-api/src";
import type { DockProviderOptions } from "../../../client/src/framework/shapes/dock-shapes";
import type * as DockWorkspaceModule from "../../../client/src/framework/workspace/dock-workspace";

// `@openfin/workspace-platform` subscribes to the InterApplicationBus as a side effect of being
// imported. dock-workspace.ts pulls it in transitively (via endpoint/logger-provider -> modules), so
// it needs to be stubbed for the module to load in a test environment.
jest.mock("@openfin/workspace-platform", () => ({
	getCurrentSync: jest.fn()
}));

jest.mock("@openfin/workspace", () => ({
	Dock: {
		register: jest.fn(),
		deregister: jest.fn(),
		show: jest.fn(),
		minimize: jest.fn()
	}
}));

jest.mock("../../../client/src/framework/endpoint", () => ({
	hasEndpoint: jest.fn()
}));

jest.mock("../../../client/src/framework/workspace/dock-shared", () => ({
	DOCK_ENDPOINT_ID_GET: "dock-get",
	DOCK_ENDPOINT_ID_SET: "dock-set",
	buildButtons: jest.fn(),
	buildWorkspaceButtons: jest.fn(),
	getDockProviderOptions: jest.fn(),
	getRegisteredButtons: jest.fn(),
	requestStoredDockConfig: jest.fn(),
	sendDockConfigToEndpoint: jest.fn(),
	setDockProviderOptions: jest.fn(),
	setRegisteredBootstrapOptions: jest.fn(),
	setRegisteredButtons: jest.fn(),
	subscribeToUpdates: jest.fn(),
	unsubscribeFromUpdates: jest.fn()
}));

const DOCK_WORKSPACE_MODULE_PATH = "../../../client/src/framework/workspace/dock-workspace";
const WORKSPACE_MODULE_PATH = "@openfin/workspace";
const ENDPOINT_MODULE_PATH = "../../../client/src/framework/endpoint";
const DOCK_SHARED_MODULE_PATH = "../../../client/src/framework/workspace/dock-shared";

/**
 * `dock-workspace.ts` has module-level singleton state (`registration`/`registrationInfo`), so every
 * test needs a fresh module instance and fresh mocks.
 * @returns The freshly loaded dock-workspace module along with its mocked dependencies.
 */
function loadDockWorkspace(): {
	dockWorkspace: typeof DockWorkspaceModule;
	dockMock: { register: jest.Mock; deregister: jest.Mock; show: jest.Mock; minimize: jest.Mock };
	endpointMock: { hasEndpoint: jest.Mock };
	dockSharedMock: {
		buildButtons: jest.Mock;
		buildWorkspaceButtons: jest.Mock;
		getDockProviderOptions: jest.Mock;
		getRegisteredButtons: jest.Mock;
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
	const dockWorkspace = require(DOCK_WORKSPACE_MODULE_PATH);
	const dockMock = jest.requireMock(WORKSPACE_MODULE_PATH).Dock;
	const endpointMock = jest.requireMock(ENDPOINT_MODULE_PATH);
	const dockSharedMock = jest.requireMock(DOCK_SHARED_MODULE_PATH);

	return { dockWorkspace, dockMock, endpointMock, dockSharedMock };
}

describe("dock-workspace", () => {
	const options: DockProviderOptions = { id: "dock", title: "Dock", icon: "icon.png" };
	const registrationInfo: DockProviderRegistration = {
		clientAPIVersion: "1.0.0",
		workspaceVersion: "1.0.0",
		updateDockProviderConfig: jest.fn()
	};

	describe("register", () => {
		it("should build a provider and register it with Dock.register", async () => {
			const { dockWorkspace, dockMock, dockSharedMock } = loadDockWorkspace();
			const buttons: DockButton[] = [{ tooltip: "A", action: { id: "a" } } as DockButton];
			dockSharedMock.buildButtons.mockResolvedValue(buttons);
			dockSharedMock.getDockProviderOptions.mockReturnValue(options);
			dockSharedMock.buildWorkspaceButtons.mockReturnValue(["switchWorkspace"]);
			dockMock.register.mockResolvedValue(registrationInfo);

			const result = await dockWorkspace.register(options, { home: true });

			expect(dockSharedMock.setDockProviderOptions).toHaveBeenCalledWith(options);
			expect(dockSharedMock.setRegisteredBootstrapOptions).toHaveBeenCalledWith({ home: true });
			expect(dockSharedMock.buildButtons).toHaveBeenCalled();
			expect(dockMock.register).toHaveBeenCalledWith(
				expect.objectContaining({
					id: options.id,
					title: options.title,
					icon: options.icon,
					workspaceComponents: ["switchWorkspace"],
					disableUserRearrangement: false,
					buttons
				})
			);
			expect(dockSharedMock.subscribeToUpdates).toHaveBeenCalledWith(expect.any(Function));
			expect(result).toBe(registrationInfo);
		});

		it("should never request the platform-only buttons from buildWorkspaceButtons", async () => {
			// Regression guard: the workspace dock must call buildWorkspaceButtons without asking for the
			// platform-only buttons (e.g. "contentMenu"), otherwise the workspace dock UI throws when
			// rendering an unknown workspace component.
			const { dockWorkspace, dockSharedMock } = loadDockWorkspace();
			dockSharedMock.buildButtons.mockResolvedValue([]);
			dockSharedMock.getDockProviderOptions.mockReturnValue(options);
			dockSharedMock.buildWorkspaceButtons.mockReturnValue([]);

			await dockWorkspace.register(options, undefined);

			expect(dockSharedMock.buildWorkspaceButtons).toHaveBeenCalledTimes(1);
			expect(dockSharedMock.buildWorkspaceButtons.mock.calls[0][1]).not.toBe(true);
		});

		it("should not register with Dock or subscribe to updates when there are no dock provider options", async () => {
			const { dockWorkspace, dockMock, dockSharedMock } = loadDockWorkspace();
			dockSharedMock.buildButtons.mockResolvedValue([]);
			dockSharedMock.getDockProviderOptions.mockReturnValue(undefined);

			const result = await dockWorkspace.register(options, undefined);

			expect(dockMock.register).not.toHaveBeenCalled();
			expect(dockSharedMock.subscribeToUpdates).not.toHaveBeenCalled();
			expect(result).toBeUndefined();
		});
	});

	describe("deregister", () => {
		it("should unsubscribe from updates, clear the dock provider options and call Dock.deregister", async () => {
			const { dockWorkspace, dockMock, dockSharedMock } = loadDockWorkspace();
			dockSharedMock.buildButtons.mockResolvedValue([]);
			dockSharedMock.getDockProviderOptions.mockReturnValue(options);
			dockMock.register.mockResolvedValue(registrationInfo);
			await dockWorkspace.register(options, undefined);

			await dockWorkspace.deregister();

			expect(dockSharedMock.unsubscribeFromUpdates).toHaveBeenCalled();
			expect(dockSharedMock.setDockProviderOptions).toHaveBeenCalledWith(undefined);
			expect(dockMock.deregister).toHaveBeenCalled();
		});
	});

	describe("show/minimize", () => {
		it("show() should call Dock.show", async () => {
			const { dockWorkspace, dockMock } = loadDockWorkspace();

			await dockWorkspace.show();

			expect(dockMock.show).toHaveBeenCalled();
		});

		it("minimize() should call Dock.minimize", async () => {
			const { dockWorkspace, dockMock } = loadDockWorkspace();

			await dockWorkspace.minimize();

			expect(dockMock.minimize).toHaveBeenCalled();
		});
	});

	describe("loadConfig", () => {
		it("should request the config from custom storage and skip default storage when a get endpoint is configured", async () => {
			const { dockWorkspace, endpointMock, dockSharedMock } = loadDockWorkspace();
			const availableButtons: DockButton[] = [{ id: "a" } as DockButton];
			endpointMock.hasEndpoint.mockReturnValue(true);
			dockSharedMock.getRegisteredButtons.mockReturnValue(availableButtons);
			const storedConfig = { id: "dock", title: "Dock", icon: "icon.png", buttons: availableButtons };
			dockSharedMock.requestStoredDockConfig.mockResolvedValue(storedConfig);
			dockSharedMock.buildWorkspaceButtons.mockReturnValue(["switchWorkspace"]);
			const defaultStorage = jest.fn();

			const result = await dockWorkspace.loadConfig("dock", defaultStorage);

			expect(dockSharedMock.requestStoredDockConfig).toHaveBeenCalledWith("dock", availableButtons);
			expect(defaultStorage).not.toHaveBeenCalled();
			expect(result?.workspaceComponents).toEqual(["switchWorkspace"]);
		});

		it("should reorder the default storage buttons based on the availableButtons and never request platform-only buttons", async () => {
			const { dockWorkspace, endpointMock, dockSharedMock } = loadDockWorkspace();
			endpointMock.hasEndpoint.mockReturnValue(false);
			const availableButtons: DockButton[] = [
				{ id: "a", tooltip: "A" } as DockButton,
				{ id: "b", tooltip: "B" } as DockButton,
				{ id: "c", tooltip: "C" } as DockButton
			];
			dockSharedMock.getRegisteredButtons.mockReturnValue(availableButtons);
			const storedConfig: DockProviderConfigWithIdentity = {
				id: "dock",
				title: "Dock",
				icon: "icon.png",
				buttons: [{ id: "b" }, { id: "unknown" }] as DockProviderConfigWithIdentity["buttons"]
			};
			const defaultStorage = jest.fn().mockResolvedValue(storedConfig);
			dockSharedMock.buildWorkspaceButtons.mockReturnValue([]);

			const result = await dockWorkspace.loadConfig("dock", defaultStorage);

			expect(defaultStorage).toHaveBeenCalledWith("dock");
			expect(dockSharedMock.requestStoredDockConfig).not.toHaveBeenCalled();
			expect(result?.buttons?.map((button) => button.id)).toEqual(["b", "a", "c"]);
			expect(dockSharedMock.buildWorkspaceButtons).toHaveBeenCalledTimes(1);
			expect(dockSharedMock.buildWorkspaceButtons.mock.calls[0][1]).not.toBe(true);
		});
	});

	describe("saveConfig", () => {
		it("should reorder dockProviderOptions.entries based on the incoming config and use custom storage when a set endpoint is configured", async () => {
			const { dockWorkspace, endpointMock, dockSharedMock } = loadDockWorkspace();
			const entryA = { id: "a", appId: "appA" };
			const entryB = { id: "b", action: { id: "x" } };
			const providerOptions: DockProviderOptions = { ...options, entries: [entryA, entryB] };
			dockSharedMock.getDockProviderOptions.mockReturnValue(providerOptions);
			endpointMock.hasEndpoint.mockReturnValue(true);
			dockSharedMock.sendDockConfigToEndpoint.mockResolvedValue(true);
			const config: DockProviderConfigWithIdentity = {
				id: "dock",
				title: "Dock",
				icon: "icon.png",
				buttons: [{ id: "b" }, { id: "unknown" }] as DockProviderConfigWithIdentity["buttons"]
			};
			const defaultStorage = jest.fn();

			await dockWorkspace.saveConfig(config, defaultStorage);

			expect(providerOptions.entries).toEqual([entryB, entryA]);
			expect(dockSharedMock.sendDockConfigToEndpoint).toHaveBeenCalledWith(config);
			expect(defaultStorage).not.toHaveBeenCalled();
		});

		it("should use default storage when no set endpoint is configured", async () => {
			const { dockWorkspace, endpointMock, dockSharedMock } = loadDockWorkspace();
			dockSharedMock.getDockProviderOptions.mockReturnValue(options);
			endpointMock.hasEndpoint.mockReturnValue(false);
			const config: DockProviderConfigWithIdentity = {
				id: "dock",
				title: "Dock",
				icon: "icon.png",
				buttons: []
			};
			const defaultStorage = jest.fn();

			await dockWorkspace.saveConfig(config, defaultStorage);

			expect(dockSharedMock.sendDockConfigToEndpoint).not.toHaveBeenCalled();
			expect(defaultStorage).toHaveBeenCalledWith(config);
		});
	});
});
