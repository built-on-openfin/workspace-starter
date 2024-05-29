import type { PlatformApp } from "../../../../client/src/framework/shapes/app-shapes";
import type { Logger } from "../../../../client/src/framework/shapes/logger-shapes";
import { AppIdHelper } from "../../../../client/src/modules/interop-override/wps-interop-override/broker/app-id-helper";

describe("app-id-helper", () => {
	describe("isAppIdValid", () => {
		const standardApp = "test-app-1";
		const directoryBasedApp = "directory1/test-app-2";
		const internalGeneratedViewWindow = "internal-generated-test";
		const platformId = "platform-id";
		const otherPlatformId = "other-platform-id";
		const unknownAppId = "unknown-app-id";
		const logger: Logger = {
			debug: console.log,
			info: console.log,
			warn: console.warn,
			error: console.error,
			trace: console.trace
		};

		const apps: string[] = [standardApp, directoryBasedApp];
		/**
		 * Get an app by id.
		 * @param appId The app id to get.
		 * @returns The app or undefined if not found.
		 */
		async function getApp(appId: string): Promise<PlatformApp | undefined> {
			if (apps.includes(appId)) {
				return { appId } as PlatformApp;
			}
			return undefined;
		}

		const unregisteredApp: PlatformApp = { appId: "unregistered-app" } as PlatformApp;

		it("should return undefined for internal generated views and windows from other platforms", async () => {
			const appIdHelper = new AppIdHelper(getApp, platformId, logger);
			const validatedAppId = await appIdHelper.lookupAppId({
				name: internalGeneratedViewWindow,
				uuid: platformId,
				endpointId: "x",
				isLocalEndpointId: true
			});
			expect(validatedAppId).toBeUndefined();
		});

		it("should return undefined for internal generated views and windows from the same platform if no unregistered app is passed.", async () => {
			const appIdHelper = new AppIdHelper(getApp, platformId, logger);
			const validatedAppId = await appIdHelper.lookupAppId({
				name: internalGeneratedViewWindow,
				uuid: platformId,
				endpointId: "x",
				isLocalEndpointId: true
			});
			expect(validatedAppId).toBeUndefined();
		});

		it("should return a defined unregistered appId for internal generated views and windows from the same platform if an unregistered app is passed.", async () => {
			const appIdHelper = new AppIdHelper(getApp, platformId, logger, unregisteredApp);
			const validatedAppId = await appIdHelper.lookupAppId({
				name: internalGeneratedViewWindow,
				uuid: platformId,
				endpointId: "x",
				isLocalEndpointId: true
			});
			expect(validatedAppId).toBe(unregisteredApp.appId);
		});

		it("should return an undefined appId for internal generated views and windows from a different platform even if an unregistered app is passed.", async () => {
			const appIdHelper = new AppIdHelper(getApp, platformId, logger, unregisteredApp);
			const validatedAppId = await appIdHelper.lookupAppId({
				name: internalGeneratedViewWindow,
				uuid: otherPlatformId,
				endpointId: "x",
				isLocalEndpointId: false
			});
			expect(validatedAppId).toBeUndefined();
		});

		it("should return a standard appId if it exists in the directory.", async () => {
			const appIdHelper = new AppIdHelper(getApp, platformId, logger, unregisteredApp);
			const validatedAppId = await appIdHelper.lookupAppId({
				name: standardApp,
				uuid: platformId,
				endpointId: "x",
				isLocalEndpointId: true
			});
			expect(validatedAppId).toBe(standardApp);
		});

		it("should return a directory structured appId if it exists in the directory.", async () => {
			const appIdHelper = new AppIdHelper(getApp, platformId, logger, unregisteredApp);
			const validatedAppId = await appIdHelper.lookupAppId({
				name: `${directoryBasedApp}/guid`,
				uuid: platformId,
				endpointId: "x",
				isLocalEndpointId: true
			});
			expect(validatedAppId).toBe(directoryBasedApp);
		});

		it("should return a standard appId if it exists in the directory and comes from a different platform.", async () => {
			const appIdHelper = new AppIdHelper(getApp, platformId, logger, unregisteredApp);
			const validatedAppId = await appIdHelper.lookupAppId({
				name: standardApp,
				uuid: otherPlatformId,
				endpointId: "x",
				isLocalEndpointId: false
			});
			expect(validatedAppId).toBe(standardApp);
		});

		it("should return an undefined appId if an unlisted appId is provided.", async () => {
			const appIdHelper = new AppIdHelper(getApp, platformId, logger, unregisteredApp);
			const validatedAppId = await appIdHelper.lookupAppId({
				name: unknownAppId,
				uuid: platformId,
				endpointId: "x",
				isLocalEndpointId: true
			});
			expect(validatedAppId).toBeUndefined();
		});

		it("A valid appId should not query the app directory more than once if queried more than once.", async () => {
			const getAppSpy = jest.fn(getApp);
			const appIdHelper = new AppIdHelper(getAppSpy, platformId, logger, unregisteredApp);
			const clientIdentity = {
				name: standardApp,
				uuid: platformId,
				endpointId: "x",
				isLocalEndpointId: true
			};
			let validatedAppId = await appIdHelper.lookupAppId(clientIdentity);
			expect(validatedAppId).toBe(standardApp);
			expect(getAppSpy).toHaveBeenCalledTimes(1);
			validatedAppId = await appIdHelper.lookupAppId(clientIdentity);
			expect(validatedAppId).toBe(standardApp);
			expect(getAppSpy).toHaveBeenCalledTimes(1);
		});

		it("An invalid appId should not query the app directory more than once if queried more than once.", async () => {
			const getAppSpy = jest.fn(getApp);
			const appIdHelper = new AppIdHelper(getAppSpy, platformId, logger, unregisteredApp);
			const clientIdentity = {
				name: unknownAppId,
				uuid: platformId,
				endpointId: "x",
				isLocalEndpointId: true
			};
			let validatedAppId = await appIdHelper.lookupAppId(clientIdentity);
			expect(validatedAppId).toBeUndefined();
			expect(getAppSpy).toHaveBeenCalledTimes(1);
			validatedAppId = await appIdHelper.lookupAppId(clientIdentity);
			expect(validatedAppId).toBeUndefined();
			expect(getAppSpy).toHaveBeenCalledTimes(1);
		});

		it("A warning should be logged if an invalid appId is passed.", async () => {
			const loggerSpy = jest.spyOn(logger, "warn");
			const appIdHelper = new AppIdHelper(getApp, platformId, logger, unregisteredApp);
			const clientIdentity = {
				name: unknownAppId,
				uuid: platformId,
				endpointId: "x",
				isLocalEndpointId: true
			};
			const validatedAppId = await appIdHelper.lookupAppId(clientIdentity);
			expect(validatedAppId).toBeUndefined();
			expect(loggerSpy).toHaveBeenCalled();
		});

		it("An invalid appId will only log one warning regardless of how many times it is checked.", async () => {
			const loggerSpy = jest.spyOn(logger, "warn");
			loggerSpy.mockClear();
			const appIdHelper = new AppIdHelper(getApp, platformId, logger, unregisteredApp);
			const clientIdentity = {
				name: unknownAppId,
				uuid: platformId,
				endpointId: "x",
				isLocalEndpointId: true
			};
			let validatedAppId = await appIdHelper.lookupAppId(clientIdentity);
			expect(validatedAppId).toBeUndefined();
			expect(loggerSpy).toHaveBeenCalled();
			validatedAppId = await appIdHelper.lookupAppId(clientIdentity);
			expect(validatedAppId).toBeUndefined();
			expect(loggerSpy).toHaveBeenCalledTimes(1);
		});
	});
});
