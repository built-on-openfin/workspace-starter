import type { DockProviderRegistration } from "@openfin/workspace";

// `@openfin/workspace-platform` subscribes to the InterApplicationBus as a side effect of being
// imported. dock.ts pulls it in transitively (via logger-provider -> modules), so it needs to be
// stubbed for any of these modules to load in a test environment.
jest.mock("@openfin/workspace-platform", () => ({
	getCurrentSync: jest.fn()
}));

import type { DockImplementation, DockProviderOptions } from "../../../client/src/framework/shapes/dock-shapes";
import type * as DockModule from "../../../client/src/framework/workspace/dock";

const DOCK1_MODULE_PATH = "../../../client/src/framework/workspace/dock1";
const DOCK3_MODULE_PATH = "../../../client/src/framework/workspace/dock3";
const DOCK_MODULE_PATH = "../../../client/src/framework/workspace/dock";

/**
 * A mocked dock1/dock3 implementation.
 */
type MockDockImplementation = DockImplementation & {
	register: jest.Mock;
	deregister: jest.Mock;
	show: jest.Mock;
	minimize: jest.Mock;
};

/**
 * The facade has module-level singleton state (`activeImplementation`/`registrationInfo`), so
 * every test needs a fresh module instance and fresh mocks for dock1/dock3.
 * @returns The freshly loaded facade module along with the mocks for dock1/dock3.
 */
function loadDockFacade(): {
	dock: typeof DockModule;
	dock1Mock: MockDockImplementation & { loadConfig: jest.Mock; saveConfig: jest.Mock };
	dock3Mock: MockDockImplementation;
} {
	jest.resetModules();

	jest.doMock(DOCK1_MODULE_PATH, () => ({
		register: jest.fn(),
		deregister: jest.fn(),
		show: jest.fn(),
		minimize: jest.fn(),
		loadConfig: jest.fn(),
		saveConfig: jest.fn()
	}));
	jest.doMock(DOCK3_MODULE_PATH, () => ({
		register: jest.fn(),
		deregister: jest.fn(),
		show: jest.fn(),
		minimize: jest.fn()
	}));

	const dock1Mock = jest.requireMock(DOCK1_MODULE_PATH);
	const dock3Mock = jest.requireMock(DOCK3_MODULE_PATH);
	// eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires
	const dock = require(DOCK_MODULE_PATH);

	return { dock, dock1Mock, dock3Mock };
}

describe("dock facade", () => {
	const options: DockProviderOptions = { id: "dock", title: "Dock", icon: "icon.png" };
	const registration: DockProviderRegistration = {
		clientAPIVersion: "1.0.0",
		workspaceVersion: "1.0.0",
		updateDockProviderConfig: jest.fn()
	};

	afterEach(() => {
		jest.dontMock(DOCK1_MODULE_PATH);
		jest.dontMock(DOCK3_MODULE_PATH);
	});

	describe("register", () => {
		it("should delegate to dock1 when dockType is not specified", async () => {
			const { dock, dock1Mock, dock3Mock } = loadDockFacade();
			dock1Mock.register.mockResolvedValue(registration);

			const result = await dock.register(options, undefined);

			expect(dock1Mock.register).toHaveBeenCalledWith(options, undefined);
			expect(dock3Mock.register).not.toHaveBeenCalled();
			expect(result).toBe(registration);
		});

		it("should delegate to dock1 when dockType is '1'", async () => {
			const { dock, dock1Mock, dock3Mock } = loadDockFacade();
			dock1Mock.register.mockResolvedValue(registration);

			await dock.register({ ...options, dockType: "1" }, undefined);

			expect(dock1Mock.register).toHaveBeenCalled();
			expect(dock3Mock.register).not.toHaveBeenCalled();
		});

		it("should delegate to dock3 when dockType is '3'", async () => {
			const { dock, dock1Mock, dock3Mock } = loadDockFacade();
			dock3Mock.register.mockResolvedValue(registration);

			const bootstrapOptions = { home: true };
			const result = await dock.register({ ...options, dockType: "3" }, bootstrapOptions);

			expect(dock3Mock.register).toHaveBeenCalledWith({ ...options, dockType: "3" }, bootstrapOptions);
			expect(dock1Mock.register).not.toHaveBeenCalled();
			expect(result).toBe(registration);
		});

		it("should return undefined and not call either implementation when options is undefined", async () => {
			const { dock, dock1Mock, dock3Mock } = loadDockFacade();

			const result = await dock.register(undefined, undefined);

			expect(result).toBeUndefined();
			expect(dock1Mock.register).not.toHaveBeenCalled();
			expect(dock3Mock.register).not.toHaveBeenCalled();
		});

		it("should only register once when called multiple times", async () => {
			const { dock, dock1Mock } = loadDockFacade();
			dock1Mock.register.mockResolvedValue(registration);

			const firstResult = await dock.register(options, undefined);
			const secondResult = await dock.register({ ...options, dockType: "3" }, undefined);

			expect(dock1Mock.register).toHaveBeenCalledTimes(1);
			expect(firstResult).toBe(registration);
			expect(secondResult).toBe(registration);
		});
	});

	describe("show/minimize before registration", () => {
		it("show() should not throw and should not call dock1 or dock3", async () => {
			const { dock, dock1Mock, dock3Mock } = loadDockFacade();

			await expect(dock.show()).resolves.toBeUndefined();

			expect(dock1Mock.show).not.toHaveBeenCalled();
			expect(dock3Mock.show).not.toHaveBeenCalled();
		});

		it("minimize() should not throw and should not call dock1 or dock3", async () => {
			const { dock, dock1Mock, dock3Mock } = loadDockFacade();

			await expect(dock.minimize()).resolves.toBeUndefined();

			expect(dock1Mock.minimize).not.toHaveBeenCalled();
			expect(dock3Mock.minimize).not.toHaveBeenCalled();
		});
	});

	describe("show/minimize/deregister after registration", () => {
		it("should delegate show()/minimize()/deregister() to dock1 after a dockType '1' registration", async () => {
			const { dock, dock1Mock, dock3Mock } = loadDockFacade();
			dock1Mock.register.mockResolvedValue(registration);
			await dock.register(options, undefined);

			await dock.show();
			await dock.minimize();
			await dock.deregister();

			expect(dock1Mock.show).toHaveBeenCalledTimes(1);
			expect(dock1Mock.minimize).toHaveBeenCalledTimes(1);
			expect(dock1Mock.deregister).toHaveBeenCalledTimes(1);
			expect(dock3Mock.show).not.toHaveBeenCalled();
			expect(dock3Mock.minimize).not.toHaveBeenCalled();
			expect(dock3Mock.deregister).not.toHaveBeenCalled();
		});

		it("should delegate show()/minimize()/deregister() to dock3 after a dockType '3' registration", async () => {
			const { dock, dock1Mock, dock3Mock } = loadDockFacade();
			dock3Mock.register.mockResolvedValue(registration);
			await dock.register({ ...options, dockType: "3" }, undefined);

			await dock.show();
			await dock.minimize();
			await dock.deregister();

			expect(dock3Mock.show).toHaveBeenCalledTimes(1);
			expect(dock3Mock.minimize).toHaveBeenCalledTimes(1);
			expect(dock3Mock.deregister).toHaveBeenCalledTimes(1);
			expect(dock1Mock.show).not.toHaveBeenCalled();
			expect(dock1Mock.minimize).not.toHaveBeenCalled();
			expect(dock1Mock.deregister).not.toHaveBeenCalled();
		});
	});

	describe("deregister", () => {
		it("should not throw and should not call dock1 or dock3 when nothing was registered", async () => {
			const { dock, dock1Mock, dock3Mock } = loadDockFacade();

			await expect(dock.deregister()).resolves.toBeUndefined();

			expect(dock1Mock.deregister).not.toHaveBeenCalled();
			expect(dock3Mock.deregister).not.toHaveBeenCalled();
		});

		it("should clear state so a subsequent register() call re-registers", async () => {
			const { dock, dock1Mock } = loadDockFacade();
			dock1Mock.register.mockResolvedValue(registration);

			await dock.register(options, undefined);
			await dock.deregister();
			await dock.register(options, undefined);

			expect(dock1Mock.register).toHaveBeenCalledTimes(2);
		});
	});

	describe("loadConfig/saveConfig re-export", () => {
		it("should re-export dock1's loadConfig and saveConfig", () => {
			const { dock, dock1Mock } = loadDockFacade();

			expect(dock.loadConfig).toBe(dock1Mock.loadConfig);
			expect(dock.saveConfig).toBe(dock1Mock.saveConfig);
		});
	});
});
