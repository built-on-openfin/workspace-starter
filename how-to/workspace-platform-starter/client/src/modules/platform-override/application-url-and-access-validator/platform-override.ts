// eslint-disable-next-line max-classes-per-file
import type OpenFin from "@openfin/core";
import type { Page, WorkspacePlatformProvider } from "@openfin/workspace-platform";
import type { PlatformApp } from "workspace-platform-starter/shapes";
import type { Logger, LoggerCreator } from "workspace-platform-starter/shapes/logger-shapes";
import type { ModuleDefinition } from "workspace-platform-starter/shapes/module-shapes";
import type {
	PlatformOverride,
	PlatformOverrideHelpers,
	PlatformOverrideOptions
} from "workspace-platform-starter/shapes/platform-shapes";
import type { ApplicationUrlAndAccessValidatorOptions } from "./shapes";

/**
 * Implementation for the application validator platform override.
 */
export class ApplicationUrlAndAccessValidator
	implements PlatformOverride<ApplicationUrlAndAccessValidatorOptions>
{
	/**
	 * The module definition including settings.
	 * @internal
	 */
	private _definition: ModuleDefinition<ApplicationUrlAndAccessValidatorOptions> | undefined;

	/**
	 * The logger for displaying information from the module.
	 * @internal
	 */
	private _logger?: Logger;

	/**
	 * Helper methods for the module.
	 * @internal
	 */
	private _helpers: PlatformOverrideHelpers | undefined;

	/**
	 * Initialize the module.
	 * @param definition The definition of the module from configuration include custom options.
	 * @param loggerCreator For logging entries.
	 * @param helpers Helper methods for the module to interact with the application core.
	 * @returns Nothing.
	 */
	public async initialize(
		definition: ModuleDefinition<ApplicationUrlAndAccessValidatorOptions>,
		loggerCreator: LoggerCreator,
		helpers: PlatformOverrideHelpers
	): Promise<void> {
		this._definition = definition;
		this._logger = loggerCreator("ApplicationUrlAndAccessValidatorPlatformOverride");
		this._helpers = helpers;

		this._logger.info("Initializing");

		// TODO: Add code here to allocate any module resources
		// You can access the configured options e.g. definition.data?.exampleProp
	}

	/**
	 * Close down any resources being used by the module.
	 * @returns Nothing.
	 */
	public async closedown(): Promise<void> {
		this._logger?.info("Closedown");

		// TODO: Add code here to free up any module resources
	}

	/**
	 * Get the override constructor for the platform override (useful if you wish this implementation to be layered with other implementations and passed to the platform's initialization object as part of an array).
	 * @param options The options for the platform override defined as part of the platform.
	 * @returns The override constructor to be used in an array.
	 */
	public async getConstructorOverride(
		options: PlatformOverrideOptions
	): Promise<OpenFin.ConstructorOverride<WorkspacePlatformProvider>> {
		return (Base: OpenFin.Constructor<WorkspacePlatformProvider>) => {
			// use settings passed through the module definition in your override or the default options passed with the function call
			// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-restricted-syntax
			if (this._helpers === undefined) {
				throw new Error(
					"Helpers are required for the the application validator platform override. Please ensure that the platform has been initialized correctly."
				);
			}
			const moduleData = this._definition?.data ?? {};
			const logger = this._logger;
			const helpers = this._helpers;
			const utilClient = helpers.getUtilClient();
			// caching the functions as it is called multiple times in the applySnapshot override.
			const isStringValue = utilClient.general.isStringValue;
			const isEmpty = utilClient.general.isEmpty;
			const randomUUID = utilClient.general.randomUUID;

			/**
			 * Extend the Platform Override.
			 */
			return class CustomPlatformOverride extends Base {
				/**
				 * Constructor for the interop override.
				 */
				constructor() {
					super();
					// this is just an example to show a reference to the options, module data and local reference to the passed helpers.
					logger?.info(
						`Options passed: ${JSON.stringify(options)} and module data: ${JSON.stringify(moduleData)} with session id: ${helpers.sessionId}`
					);
				}

				/**
				 * Implementation for getting a single page in persistent storage.
				 * @param id The id of the page.
				 * @returns a page object or undefined if page doesn't exist.
				 */
				public async getSavedPage(id: string): Promise<Page | undefined> {
					// get the page from the default platform implementation or an override that stores it in an alternative location.
					logger?.info(`Requesting saved page with id: ${id}`);
					const page = await super.getSavedPage(id);
					// process page layout to ensure that any apps are using the correct urls and access should still be allowed.
					if (page) {
						logger?.info(`Processing page layout for page with id: ${id}`);
						const processedLayout: string = await this.validateAppUrlAndAccess(page.layout);
						page.layout = JSON.parse(processedLayout);
					}
					return page;
				}

				/**
				 * An apply snapshot override to check for updated urls and apps that are no longer permissible. If possible you would want this type of logic on the server so it is
				 * only applied to saved workspaces or snapshots (pages are managed by getPage). This is just an example to show the concept.
				 * @param payload the payload for the snapshot
				 * @param identity	the identity of the entity that called applySnapshot
				 * @returns nothing
				 */
				public async applySnapshot(
					payload: OpenFin.ApplySnapshotPayload,
					identity?: OpenFin.Identity
				): Promise<void> {
					// this is an example of how to override the applySnapshot method to check for updated urls and apps that are no longer permissible.
					logger?.info("Processing snapshot windows for app url changes or access updates");
					const processedWindows: string = await this.validateAppUrlAndAccess(payload.snapshot.windows);

					payload.snapshot.windows = JSON.parse(processedWindows);
					logger?.info("Passing processed snapshot to base applySnapshot.");
					return super.applySnapshot(payload, identity);
				}

				/**
				 * This function goes through the payload and checks for app entries and if found checks to see that they
				 * have the latest url for the app if needed and also checks to see if they still have permission for the app.
				 * @param payload The payload to validate.
				 * @returns The validated payload to be parsed as an object.
				 */
				private async validateAppUrlAndAccess(payload: unknown): Promise<string> {
					const appCache: { [key: string]: { exists: boolean; url?: string } } = {};
					const manifestTokens: { [key: string]: { manifest: string; originalUrl: string } } = {};
					let appEntry: { exists: boolean; url?: string } | undefined;
					const apps: PlatformApp[] = [];
					if (helpers.getApps) {
						// rather than caching the apps once for the lifetime of the platform you are letting the app service manage the caching of the apps
						// so that this request would be coming from a cache.
						apps.push(...(await helpers.getApps()));
					}
					let processedPayload: string = JSON.stringify(payload, (_, nestedValue) => {
						if (Array.isArray(nestedValue)) {
							return nestedValue;
						}
						// check to ensure that we have a name field and that we also have a url field in this object (in case name was added to a random part of the layout)
						if (
							isStringValue(nestedValue?.name) &&
							!nestedValue.name.startsWith("internal-generated-") &&
							!isEmpty(nestedValue.url)
						) {
							const appId = nestedValue.name.split("/")[0];
							appEntry = { exists: false };
							let app: PlatformApp | undefined;
							if (!appCache[appId]) {
								app = apps.find((a) => a.appId === appId);
								if (app) {
									appEntry = { exists: true };
									if (app.launchPreference?.options?.type === "window") {
										if (
											Array.isArray(app.launchPreference.options?.updatable) &&
											app.launchPreference.options?.updatable.findIndex((update) => update.name === "url") >
												-1
										) {
											// if an app is marked as having an updatable url (e.g. a crm system entry with an initial app url that can be changed)
											// then we keep the original url but mark that access to the app still exists.
											appEntry = { exists: true };
										} else if (app.launchPreference.options.window?.url) {
											// there is an override for the url provided in the manifest use this instead of the source entry.
											appEntry = { url: app.launchPreference.options.window.url, exists: true };
										}
									} else if (app.launchPreference?.options?.type === "view") {
										if (
											Array.isArray(app.launchPreference.options?.updatable) &&
											app.launchPreference.options?.updatable.findIndex((update) => update.name === "url") >
												-1
										) {
											// if an app is marked as having an updatable url (e.g. a crm system entry with an initial app url that can be changed)
											// then we keep the original url but mark that access to the app still exists.
											appEntry = { exists: true };
										} else if (app.launchPreference.options.view?.url) {
											// there is an override for the url provided in the manifest use this instead of the source entry.
											appEntry = { url: app.launchPreference.options.view.url, exists: true };
										}
									} else if (
										(app?.manifestType === "inline-view" || app?.manifestType === "inline-window") &&
										(app.manifest as { url: string }).url
									) {
										appEntry = { url: (app.manifest as { url: string }).url, exists: true };
									} else if (app?.manifestType === "view" || app?.manifestType === "window") {
										const token = `[[${app.appId}]]`;
										if (isEmpty(manifestTokens[token])) {
											const t = { manifest: app.manifest, originalUrl: nestedValue.url };
											manifestTokens[token] = t;
										}
										appEntry = { url: `[[${app.appId}]]`, exists: true };
									}
								} else {
									appEntry = { exists: false };
								}
								appCache[appId] = appEntry;
							} else {
								appEntry = appCache[appId];
							}
							if (appEntry.exists) {
								nestedValue.url = appEntry.url ?? nestedValue.url;
							} else if (moduleData.deniedAccessUrl) {
								nestedValue.url = moduleData.deniedAccessUrl;
								nestedValue.customData = { appId };
								nestedValue.name = `internal-generated-${randomUUID()}`;
							}
						}
						return nestedValue as unknown;
					});

					const tokens = Object.keys(manifestTokens);
					if (tokens.length > 0) {
						// we are not caching the fetching of the url from the manifest as this is an example
						// if you are going to be calling this multiple times you should cache the results and ensure that
						// the cache is cleared when the app is updated.
						for (const token of tokens) {
							const url = await this.getUrlFromManifest(
								manifestTokens[token].manifest,
								manifestTokens[token].originalUrl
							);
							processedPayload = processedPayload.replaceAll(token, url);
						}
					}

					return processedPayload;
				}

				/**
				 * Fetch the url from the manifest or returns the original url.
				 * @param manifest The manifest to fetch the url from.
				 * @param originalUrl The original url to return if the manifest does not have a url.
				 * @returns The url from the manifest or the original url.
				 */
				private async getUrlFromManifest(manifest: string, originalUrl: string): Promise<string> {
					try {
						const fetchedManifest = await fin.System.fetchManifest(manifest);
						if (fetchedManifest.url) {
							return fetchedManifest.url;
						}
						logger?.warn(`No url found in manifest for ${originalUrl}`);
						return originalUrl;
					} catch (error) {
						logger?.error(`Error fetching manifest for ${originalUrl}`, error);
						return originalUrl;
					}
				}
			};
		};
	}
}
