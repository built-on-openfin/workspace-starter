import type { AppsForIntent, PlatformApp } from "workspace-platform-starter/shapes/app-shapes";
import type { AppIntents } from "workspace-platform-starter/shapes/fdc3-2-0-shapes";
import type { Logger } from "workspace-platform-starter/shapes/logger-shapes";
import { isEmpty } from "workspace-platform-starter/utils";

/**
 * The App Intent Helper inspects app catalogs to discover supported intents and contexts.
 */
export class AppIntentHelper {
	private readonly _getApps: () => Promise<PlatformApp[]>;

	private readonly _logger: Logger;

	/**
	 * Create an instance of the App Intent Helper.
	 * @param getApps returns an array of Apps
	 * @param logger the logger to use.
	 */
	constructor(getApps: () => Promise<PlatformApp[]>, logger: Logger) {
		this._getApps = getApps;
		this._logger = logger;
	}

	/**
	 * Get the application that support the requested intent.
	 * @param intent The intent the application must support.
	 * @returns The list of application that support the intent.
	 */
	public async getAppsByIntent(intent: string): Promise<PlatformApp[]> {
		const apps = await this._getApps();
		return apps.filter((app) => {
			const listensFor = app.interop?.intents?.listensFor;

			if (isEmpty(listensFor)) {
				return false;
			}
			const intentNames = Object.keys(listensFor);
			for (const intentName of intentNames) {
				if (intentName.toLowerCase() === intent.toLowerCase()) {
					return true;
				}
			}
			return false;
		});
	}

	/**
	 * Get an intent and the apps that support it.
	 * @param intent The intent to look for.
	 * @param contextType Optional context type to look for.
	 * @param resultType Optional result type to look for.
	 * @returns The intent and its supporting apps if found.
	 */
	public async getIntent(
		intent: string,
		contextType?: string,
		resultType?: string
	): Promise<AppsForIntent | undefined> {
		const apps = await this._getApps();

		if (apps.length === 0) {
			this._logger.warn("There was no apps returned so we are unable to find apps that support an intent");
			return;
		}

		const intentsMap: { [key: string]: AppsForIntent } = {};

		for (const app of apps) {
			if (app.interop?.intents?.listensFor && !isEmpty(app.interop.intents.listensFor[intent])) {
				const appIntent = app.interop.intents.listensFor[intent];
				const include = this.appIntentContains(appIntent, contextType, resultType);
				if (include) {
					// re-use approach used by getting intents by context for the context map although this will only have one
					this.updateAppIntentsMap(intentsMap, intent, appIntent.displayName, app);
				}
			}
		}

		const results = Object.values(intentsMap);
		if (results.length === 0) {
			this._logger.info(
				`No results found for findIntent for intent ${intent} and context ${contextType} and resultType ${resultType}`
			);
			return;
		} else if (results.length === 1) {
			return results[0];
		}

		this._logger.warn(
			`Received more than one result for findIntent for intent ${intent} and context ${contextType} and resultType ${resultType}. Returning the first entry.`
		);
		return results[0];
	}

	/**
	 * Get the apps that support intents by the context type.
	 * @param contextType The context type the app must support.
	 * @param resultType The optional result type to match as well.
	 * @returns The apps for the specified intent.
	 */
	public async getIntentsByContext(contextType: string, resultType?: string): Promise<AppsForIntent[]> {
		const apps = await this._getApps();

		if (apps.length === 0) {
			this._logger.warn(
				"Unable to get apps so we can not get apps and intents that support a particular context"
			);
			return [];
		}

		const intents: { [key: string]: AppsForIntent } = {};

		for (const app of apps) {
			const listensFor = app.interop?.intents?.listensFor;

			if (!isEmpty(listensFor)) {
				const supportedIntents = Object.keys(listensFor);
				for (const supportedIntent of supportedIntents) {
					const appIntent = listensFor[supportedIntent];
					const include = this.appIntentContains(appIntent, contextType, resultType);
					if (include) {
						this.updateAppIntentsMap(intents, supportedIntent, appIntent.displayName, app);
					}
				}
			}
		}

		return Object.values(intents);
	}

	/**
	 * Check to see if the supplied appIntent supports the context and result types.
	 * @param appIntent The app intent to check.
	 * @param contextType The optional context type to look for.
	 * @param resultType The optional result type to look for.
	 * @returns True if the app intent matches.
	 */
	private appIntentContains(
		appIntent: AppIntents,
		contextType: string | undefined,
		resultType: string | undefined
	): boolean {
		if (!isEmpty(contextType) && !isEmpty(resultType)) {
			if (!appIntent?.contexts?.includes(contextType) || !appIntent.resultType?.includes(resultType)) {
				return false;
			}
		} else if (!isEmpty(contextType) && !appIntent?.contexts?.includes(contextType)) {
			return false;
		} else if (!isEmpty(resultType) && !appIntent?.resultType?.includes(resultType)) {
			return false;
		}
		return true;
	}

	/**
	 * Update the map containing the intent to apps.
	 * @param intentsMap The map to update.
	 * @param name The name of the intent.
	 * @param displayName The Options display name to update with.
	 * @param app The application to update.
	 */
	private updateAppIntentsMap(
		intentsMap: {
			[key: string]: AppsForIntent;
		},
		name: string,
		displayName: string | undefined,
		app: PlatformApp
	): void {
		if (isEmpty(intentsMap[name])) {
			// in a production app you would either need to ensure that every app was populated with the same name & displayName for an intent from a golden source (e.g. intents table) so picking the first entry wouldn't make a difference.
			// or you could pull in a golden source of intents from a service and then do a lookup using the intent name to get an object with intent name and official display name.
			intentsMap[name] = {
				intent: {
					name,
					displayName
				},
				apps: []
			};
		}
		intentsMap[name].apps.push(app);
	}
}
