import type { DockProviderRegistration } from "@openfin/workspace";

// `@openfin/workspace-platform` subscribes to the InterApplicationBus as a side effect of being
// imported. dock.ts pulls it in transitively (via logger-provider -> modules), so it needs to be
// stubbed for any of these modules to load in a test environment.
jest.mock("@openfin/workspace-platform", () => ({
	getCurrentSync: jest.fn()
}));

import type {
	DockImplementation,
	DockProviderOptions
} from "../../../client/src/framework/shapes/dock-shapes";
import type * as DockModule from "../../../client/src/framework/workspace/dock";

const DOCK_WORKSPACE_MODULE_PATH = "../../../client/src/framework/workspace/dock-workspace";
const DOCK_PLATFORM_MODULE_PATH = "../../../client/src/framework/workspace/dock-platform";
const DOCK_MODULE_PATH = "../../../client/src/framework/workspace/dock";

/**
 * A mocked workspace/platform dock implementation.
 */
type MockDockImplementation = DockImplementation & {
	register: jest.Mock;
	deregister: jest.Mock;
	show: jest.Mock;
	minimize: jest.Mock;
};

/**
 * The facade has module-level singleton state (`activeImplementation`/`registrationInfo`), so
 * every test needs a fresh module instance and fresh mocks for the workspace/platform dock.
 * @returns The freshly loaded facade module along with the mocks for the workspace/platform dock.
 */
function loadDockFacade(): {
	dock: typeof DockModule;
	dockWorkspaceMock: MockDockImplementation & { loadConfig: jest.Mock; saveConfig: jest.Mock };
	dockPlatformMock: MockDockImplementation;
} {
	jest.resetModules();

	jest.doMock(DOCK_WORKSPACE_MODULE_PATH, () => ({
		register: jest.fn(),
		deregister: jest.fn(),
		show: jest.fn(),
		minimize: jest.fn(),
		loadConfig: jest.fn(),
		saveConfig: jest.fn()
	}));
	jest.doMock(DOCK_PLATFORM_MODULE_PATH, () => ({
		register: jest.fn(),
		deregister: jest.fn(),
		show: jest.fn(),
		minimize: jest.fn()
	}));

	const dockWorkspaceMock = jest.requireMock(DOCK_WORKSPACE_MODULE_PATH);
	const dockPlatformMock = jest.requireMock(DOCK_PLATFORM_MODULE_PATH);
	// eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires
	const dock = require(DOCK_MODULE_PATH);

	return { dock, dockWorkspaceMock, dockPlatformMock };
}

describe("dock facade", () => {
	const options: DockProviderOptions = { id: "dock", title: "Dock", icon: "icon.png" };
	const registration: DockProviderRegistration = {
		clientAPIVersion: "1.0.0",
		workspaceVersion: "1.0.0",
		updateDockProviderConfig: jest.fn()
	};

	afterEach(() => {
		jest.dontMock(DOCK_WORKSPACE_MODULE_PATH);
		jest.dontMock(DOCK_PLATFORM_MODULE_PATH);
	});

	describe("register", () => {
		it("should delegate to the workspace dock when dockType is not specified", async () => {
			const { dock, dockWorkspaceMock, dockPlatformMock } = loadDockFacade();
			dockWorkspaceMock.register.mockResolvedValue(registration);

			const result = await dock.register(options, undefined);

			expect(dockWorkspaceMock.register).toHaveBeenCalledWith(options, undefined);
			expect(dockPlatformMock.register).not.toHaveBeenCalled();
			expect(result).toBe(registration);
		});

		it("should delegate to the workspace dock when dockType is 'workspace'", async () => {
			const { dock, dockWorkspaceMock, dockPlatformMock } = loadDockFacade();
			dockWorkspaceMock.register.mockResolvedValue(registration);

			await dock.register({ ...options, dockType: "workspace" }, undefined);

			expect(dockWorkspaceMock.register).toHaveBeenCalled();
			expect(dockPlatformMock.register).not.toHaveBeenCalled();
		});

		it("should delegate to the platform dock when dockType is 'platform'", async () => {
			const { dock, dockWorkspaceMock, dockPlatformMock } = loadDockFacade();
			dockPlatformMock.register.mockResolvedValue(registration);

			const bootstrapOptions = { home: true };
			const result = await dock.register({ ...options, dockType: "platform" }, bootstrapOptions);

			expect(dockPlatformMock.register).toHaveBeenCalledWith(
				{ ...options, dockType: "platform" },
				bootstrapOptions
			);
			expect(dockWorkspaceMock.register).not.toHaveBeenCalled();
			expect(result).toBe(registration);
		});

		it("should return undefined and not call either implementation when options is undefined", async () => {
			const { dock, dockWorkspaceMock, dockPlatformMock } = loadDockFacade();

			const result = await dock.register(undefined, undefined);

			expect(result).toBeUndefined();
			expect(dockWorkspaceMock.register).not.toHaveBeenCalled();
			expect(dockPlatformMock.register).not.toHaveBeenCalled();
		});

		it("should only register once when called multiple times", async () => {
			const { dock, dockWorkspaceMock } = loadDockFacade();
			dockWorkspaceMock.register.mockResolvedValue(registration);

			const firstResult = await dock.register(options, undefined);
			const secondResult = await dock.register({ ...options, dockType: "platform" }, undefined);

			expect(dockWorkspaceMock.register).toHaveBeenCalledTimes(1);
			expect(firstResult).toBe(registration);
			expect(secondResult).toBe(registration);
		});
	});

	describe("show/minimize before registration", () => {
		it("show() should not throw and should not call the workspace or platform dock", async () => {
			const { dock, dockWorkspaceMock, dockPlatformMock } = loadDockFacade();

			await expect(dock.show()).resolves.toBeUndefined();

			expect(dockWorkspaceMock.show).not.toHaveBeenCalled();
			expect(dockPlatformMock.show).not.toHaveBeenCalled();
		});

		it("minimize() should not throw and should not call the workspace or platform dock", async () => {
			const { dock, dockWorkspaceMock, dockPlatformMock } = loadDockFacade();

			await expect(dock.minimize()).resolves.toBeUndefined();

			expect(dockWorkspaceMock.minimize).not.toHaveBeenCalled();
			expect(dockPlatformMock.minimize).not.toHaveBeenCalled();
		});
	});

	describe("show/minimize/deregister after registration", () => {
		it("should delegate show()/minimize()/deregister() to the workspace dock after a dockType 'workspace' registration", async () => {
			const { dock, dockWorkspaceMock, dockPlatformMock } = loadDockFacade();
			dockWorkspaceMock.register.mockResolvedValue(registration);
			await dock.register(options, undefined);

			await dock.show();
			await dock.minimize();
			await dock.deregister();

			expect(dockWorkspaceMock.show).toHaveBeenCalledTimes(1);
			expect(dockWorkspaceMock.minimize).toHaveBeenCalledTimes(1);
			expect(dockWorkspaceMock.deregister).toHaveBeenCalledTimes(1);
			expect(dockPlatformMock.show).not.toHaveBeenCalled();
			expect(dockPlatformMock.minimize).not.toHaveBeenCalled();
			expect(dockPlatformMock.deregister).not.toHaveBeenCalled();
		});

		it("should delegate show()/minimize()/deregister() to the platform dock after a dockType 'platform' registration", async () => {
			const { dock, dockWorkspaceMock, dockPlatformMock } = loadDockFacade();
			dockPlatformMock.register.mockResolvedValue(registration);
			await dock.register({ ...options, dockType: "platform" }, undefined);

			await dock.show();
			await dock.minimize();
			await dock.deregister();

			expect(dockPlatformMock.show).toHaveBeenCalledTimes(1);
			expect(dockPlatformMock.minimize).toHaveBeenCalledTimes(1);
			expect(dockPlatformMock.deregister).toHaveBeenCalledTimes(1);
			expect(dockWorkspaceMock.show).not.toHaveBeenCalled();
			expect(dockWorkspaceMock.minimize).not.toHaveBeenCalled();
			expect(dockWorkspaceMock.deregister).not.toHaveBeenCalled();
		});
	});

	describe("deregister", () => {
		it("should not throw and should not call the workspace or platform dock when nothing was registered", async () => {
			const { dock, dockWorkspaceMock, dockPlatformMock } = loadDockFacade();

			await expect(dock.deregister()).resolves.toBeUndefined();

			expect(dockWorkspaceMock.deregister).not.toHaveBeenCalled();
			expect(dockPlatformMock.deregister).not.toHaveBeenCalled();
		});

		it("should clear state so a subsequent register() call re-registers", async () => {
			const { dock, dockWorkspaceMock } = loadDockFacade();
			dockWorkspaceMock.register.mockResolvedValue(registration);

			await dock.register(options, undefined);
			await dock.deregister();
			await dock.register(options, undefined);

			expect(dockWorkspaceMock.register).toHaveBeenCalledTimes(2);
		});
	});

	describe("loadConfig/saveConfig re-export", () => {
		it("should re-export the workspace dock's loadConfig and saveConfig", () => {
			const { dock, dockWorkspaceMock } = loadDockFacade();

			expect(dock.loadConfig).toBe(dockWorkspaceMock.loadConfig);
			expect(dock.saveConfig).toBe(dockWorkspaceMock.saveConfig);
		});
	});
});
