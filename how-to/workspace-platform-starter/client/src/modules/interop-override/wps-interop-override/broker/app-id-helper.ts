import type OpenFin from "@openfin/core";
import type { PlatformApp } from "../../../../framework/shapes/app-shapes";
import type { Logger } from "../../../../framework/shapes/logger-shapes";
/**
 * The AppIdHelper class provides helpful functions related to app ids.
 */
export class AppIdHelper {
	private readonly _validatedAppIds: string[] = [];

	private readonly _invalidAppIds: string[] = [];

	private readonly _unregisteredApp: PlatformApp | undefined;

	private readonly _logger: Logger;

	private readonly _getApp: (appId: string) => Promise<PlatformApp | undefined>;

	private readonly _platformId: string;

	/**
	 * Provides helpful functions related to app ids.
	 * @param getApp The function to use to get an app for validation.
	 * @param platformId The platform id that represents the current platform.
	 * @param logger The logger to use
	 * @param unregisteredApp The app to use as a placeholder for unregistered apps.
	 */
	constructor(
		getApp: (appId: string) => Promise<PlatformApp | undefined>,
		platformId: string,
		logger: Logger,
		unregisteredApp?: PlatformApp
	) {
		this._unregisteredApp = unregisteredApp;
		this._logger = logger;
		this._getApp = getApp;
		this._platformId = platformId;
	}

	/**
	 * Lookup an application identity.
	 * @param clientIdentity The client identity to use.
	 * @returns The application identity.
	 */
	public async lookupAppId(clientIdentity: OpenFin.ClientIdentity): Promise<string | undefined> {
		if (clientIdentity.name.startsWith("internal-generated-")) {
			if (clientIdentity.uuid === this._platformId) {
				if (this._unregisteredApp) {
					this._logger.debug(
						`A window or view that is not an app but runs within the platform is running and a placeholder app has been specified ${this._unregisteredApp?.appId}}.`,
						clientIdentity
					);
					return this._unregisteredApp.appId;
				}
				this._logger.debug(
					"A window or view that is not an app but runs within the platform is running and no unregistered placeholder app is specified so no appId will be returned.",
					clientIdentity
				);
				return;
			}
			this._logger.debug(
				"A window or view that follows the runtime generated naming convention is running from another platform. It will not be assigned an appId.",
				clientIdentity
			);
			return;
		}
		const nameParts = clientIdentity.name.split("/");
		let appId: string | undefined;
		if (nameParts.length === 1 || nameParts.length === 2) {
			appId = nameParts[0];
		} else {
			appId = `${nameParts[0]}/${nameParts[1]}`;
		}

		if (this._validatedAppIds.includes(appId)) {
			return appId;
		}
		if (this._invalidAppIds.includes(appId)) {
			return;
		}

		// perform a lookup to validate the appId
		const app = await this._getApp(appId);

		if (app) {
			this._validatedAppIds.push(appId);
			return appId;
		}
		this._invalidAppIds.push(appId);
		this._logger.warn(
			`AppId ${appId} does not exist in the directory and it isn't a generated view/window that falls under this platform. No app id will be returned as it is unconfirmed.`
		);
	}
}
