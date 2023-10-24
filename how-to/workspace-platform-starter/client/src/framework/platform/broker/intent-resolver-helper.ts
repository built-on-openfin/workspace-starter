import { ResolveError } from "@finos/fdc3";
import type OpenFin from "@openfin/core";
import type { AppIntent } from "@openfin/workspace-platform";
import type { PlatformApp } from "../../shapes/app-shapes";
import type { IntentResolverResponse, IntentResolverOptions } from "../../shapes/interopbroker-shapes";
import type { Logger } from "../../shapes/logger-shapes";
import { formatError, isEmpty } from "../../utils";
import { centerContentInIdentity } from "../../utils-position";

/**
 * An Intent Resolver Used for resolving intent selection.
 */
export class IntentResolverHelper {
	private readonly _logger: Logger;

	private readonly _intentResolverOptions?: IntentResolverOptions;

	private readonly _unregisteredAppId?: string;

	private readonly _defaultIntentResolverHeight: number;

	private readonly _defaultIntentResolverWidth: number;

	/**
	 * Create an instance of the Intent Resolver Helper.
	 * @param intentResolverOptions options for the helper
	 * @param logger the logger to use.
	 * @param unregisteredAppId if you support unregistered apps what Id should they be assigned against.
	 */
	constructor(intentResolverOptions: IntentResolverOptions, logger: Logger, unregisteredAppId?: string) {
		this._defaultIntentResolverHeight = 715;
		this._defaultIntentResolverWidth = 665;
		this._intentResolverOptions = {
			height: this._defaultIntentResolverHeight,
			width: this._defaultIntentResolverWidth,
			fdc3InteropApi: "2.0",
			title: "Intent Resolver",
			...intentResolverOptions
		};
		this._logger = logger;
	}

	/**
	 * Launch the intent resolver.
	 * @param launchOptions The options for launching the resolver.
	 * @param launchOptions.apps The apps to pick from.
	 * @param launchOptions.intent The intent to pick.
	 * @param launchOptions.intents The intents to pick from.
	 * @param clientIdentity The client that triggered this request.
	 * @returns The response from the intent resolver.
	 */
	public async launchIntentResolver(
		launchOptions: {
			apps?: PlatformApp[];
			intent?: Partial<AppIntent>;
			intents?: { intent: Partial<AppIntent>; apps: PlatformApp[] }[];
		},
		clientIdentity: OpenFin.ClientIdentity
	): Promise<IntentResolverResponse> {
		// launch a new window and optionally pass the available intents as customData.apps as part of the window
		// options the window can then use raiseIntent against a specific app (the selected one). this logic runs in
		// the provider so we are using it as a way of determining the root (so it works with root hosting and
		// subdirectory based hosting if a url is not provided)
		try {
			const position = await centerContentInIdentity(clientIdentity, {
				height: this._intentResolverOptions?.height ?? this._defaultIntentResolverHeight,
				width: this._intentResolverOptions?.width ?? this._defaultIntentResolverWidth
			});

			// TODO: Remove the following when the runtime is updated.
			// The popped up window currently does not support interop if running under localhost.
			// this is being fixed in a future runtime and in the interim we swap localhost for 127.0.0.1.
			// other addresses work fine.
			const intentPickerUrl = this._intentResolverOptions?.url.replace("://localhost", "://127.0.0.1");

			const intentPickerResponse: OpenFin.PopupResult<IntentResolverResponse> = await fin.me.showPopupWindow({
				additionalOptions: {
					customData: {
						title: this._intentResolverOptions?.title,
						apps: launchOptions.apps,
						intent: launchOptions.intent,
						intents: launchOptions.intents,
						unregisteredAppId: this._unregisteredAppId
					}
				},
				initialOptions: {
					fdc3InteropApi: this._intentResolverOptions?.fdc3InteropApi,
					defaultWidth: this._intentResolverOptions?.width,
					defaultHeight: this._intentResolverOptions?.height,
					showTaskbarIcon: false
				},
				url: intentPickerUrl,
				resultDispatchBehavior: "close",
				blurBehavior: "modal",
				height: this._intentResolverOptions?.height,
				width: this._intentResolverOptions?.width,
				name: "intent-picker",
				x: position?.x,
				y: position?.y
			});
			if (isEmpty(intentPickerResponse.data)) {
				this._logger.info("App for intent not selected/launched by user", launchOptions.intent);
				throw new Error(ResolveError.UserCancelled);
			}
			return intentPickerResponse.data;
		} catch (error) {
			const message = formatError(error);

			if (message?.includes(ResolveError.UserCancelled)) {
				this._logger.info("App for intent not selected/launched by user", launchOptions.intent);
				throw new Error(message);
			}
			this._logger.error("Unexpected error from intent picker/resolver for intent", launchOptions.intent);
			throw new Error(ResolveError.ResolverUnavailable);
		}
	}
}
