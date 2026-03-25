import type OpenFin from "@openfin/core";
import type { Page } from "@openfin/workspace-platform";
import type { Logger, LoggerCreator } from "workspace-platform-starter/shapes/logger-shapes";
import type { ModuleDefinition, ModuleHelpers } from "workspace-platform-starter/shapes/module-shapes";
import type {
	Share,
	ShareConfirmationOptions,
	ShareEntry
} from "workspace-platform-starter/shapes/share-shapes";
import { isEmpty, isStringValue } from "workspace-platform-starter/utils";
import { loadShareRequest, saveShareRequest } from "../common/share-common";
import type { PageShareEntryPayload, PagesShareProviderOptions } from "./shapes";

/**
 * Implementation for the pages share provider.
 */
export class PagesShareProvider implements Share<PagesShareProviderOptions> {
	/**
	 * The module definition including settings.
	 * @internal
	 */
	private _definition: ModuleDefinition<PagesShareProviderOptions> | undefined;

	/**
	 * The logger for displaying information from the module.
	 * @internal
	 */
	private _logger?: Logger;

	/**
	 * Helper methods for the module.
	 * @internal
	 */
	private _helpers: ModuleHelpers | undefined;

	/**
	 * Initialize the module.
	 * @param definition The definition of the module from configuration include custom options.
	 * @param loggerCreator For logging entries.
	 * @param helpers Helper methods for the module to interact with the application core.
	 * @returns Nothing.
	 */
	public async initialize(
		definition: ModuleDefinition<PagesShareProviderOptions>,
		loggerCreator: LoggerCreator,
		helpers: ModuleHelpers
	): Promise<void> {
		this._definition = definition;
		this._logger = loggerCreator("PagesShareProvider");
		this._helpers = helpers;

		this._logger.info("Initializing");
	}

	/**
	 * Close down any resources being used by the module.
	 * @returns Nothing.
	 */
	public async closedown(): Promise<void> {
		this._logger?.info("Closedown");
	}

	/**
	 * Get the list of share types supported by the module.
	 * @returns Nothing.
	 */
	public async getShareTypes(): Promise<string[]> {
		return ["page"];
	}

	/**
	 * Get the shares from the module.
	 * @param windowIdentity The window identity to get the shares for.
	 * @returns Nothing.
	 */
	public async getEntries(windowIdentity: OpenFin.Identity): Promise<ShareEntry[] | undefined> {
		const platform = await this._helpers?.getPlatform?.();

		if (platform) {
			const window = platform.Browser.wrapSync(windowIdentity);
			const pages = await window.getPages();

			let pageId;
			for (const page of pages) {
				if (page.isActive) {
					pageId = page.pageId;
					break;
				}
			}

			if (pageId) {
				const pageShareEntryPayload: PageShareEntryPayload = {
					windowIdentity,
					pageId
				};

				return [
					{
						label: "Share Page",
						type: "page",
						payload: pageShareEntryPayload
					}
				];
			}
		}
	}

	/**
	 * Perform the share for the given entry.
	 * @param type The type of share to perform.
	 * @param payload The data to associate with the share.
	 * @returns Nothing.
	 */
	public async share(type: string, payload?: PageShareEntryPayload): Promise<void> {
		if (type === "page") {
			const platform = await this._helpers?.getPlatform?.();

			if (platform && !isEmpty(payload)) {
				let page: Page | undefined = payload?.page;

				if (isEmpty(payload?.page) && isStringValue(payload.pageId)) {
					let useStorage = true;

					try {
						// Try and get the page details from the passed window
						if (!isEmpty(payload.windowIdentity)) {
							const targetWindow = platform.Browser.wrapSync(payload.windowIdentity);
							page = await targetWindow.getPage(payload.pageId);
							if (isEmpty(page?.customData)) {
								page.customData = {};
							}
							page.customData.windowBounds = await targetWindow.openfinWindow.getBounds();
							useStorage = false;
						}
					} catch {}

					if (isEmpty(page) && isEmpty(payload.windowIdentity)) {
						// we haven't got a passed page and we were not given a window identity but we do have a pageId
						// try and find an attached page which matches
						const attachedPages = await platform.Browser.getAllAttachedPages();
						for (const attachedPage of attachedPages) {
							if (attachedPage.pageId === payload.pageId) {
								page = { ...attachedPage };
								if (!isEmpty(attachedPage.parentIdentity)) {
									const targetWindow = platform.Browser.wrapSync(attachedPage.parentIdentity);
									if (isEmpty(page.customData)) {
										page.customData = {};
									}
									page.customData.windowBounds = await targetWindow.openfinWindow.getBounds();
								}
								useStorage = false;
								break;
							}
						}
					}
					if (useStorage) {
						page = await platform.Storage.getPage(payload.pageId);
					}
				}

				if (!isEmpty(page)) {
					const confirmation = await saveShareRequest(
						platform,
						this._logger,
						await this._helpers?.getEndpointClient?.(),
						this._definition?.data?.setEndpointId,
						type,
						page
					);

					await this.showConfirmation(confirmation, payload.windowIdentity);
				}
			}
		}
	}

	/**
	 * Handle a share activation.
	 * @param type The type of the share.
	 * @param payload The payload for the share.
	 * @param payload.id The payload for the share.
	 * @returns Nothing.
	 */
	public async handle(type: string, payload: { id: string }): Promise<void> {
		if (type === "page") {
			const response = await loadShareRequest<Page>(
				this._logger,
				await this._helpers?.getEndpointClient?.(),
				this._definition?.data?.getEndpointId,
				type,
				payload.id
			);

			const platform = await this._helpers?.getPlatform?.();
			if (platform) {
				const responsePayload = response?.payload;
				if (!isEmpty(responsePayload) && this._helpers?.launchPage) {
					await platform.Storage.savePage(responsePayload);
					await this._helpers.launchPage(responsePayload.pageId, undefined, this._logger);
				}
			}

			await this.showConfirmation(response?.confirmation);
		}
	}

	/**
	 * Show a confirmation.
	 * @param confirmation The confirmation options.
	 * @param parentIdentity The identity of the parent window.
	 */
	private async showConfirmation(
		confirmation: ShareConfirmationOptions | undefined,
		parentIdentity?: OpenFin.Identity
	): Promise<void> {
		if (!isEmpty(confirmation) && this._helpers?.getShareClient) {
			this._logger?.info(confirmation);
			const shareClient = await this._helpers.getShareClient();
			if (shareClient) {
				const iconKey = confirmation.status === "error" ? "error" : "success";
				confirmation.iconUrl = this._definition?.data?.images[iconKey];
				if (this._helpers?.getThemeClient && !isEmpty(confirmation.iconUrl)) {
					const themeClient = await this._helpers.getThemeClient();
					confirmation.iconUrl = await themeClient.themeUrl(confirmation.iconUrl);
				}
				await shareClient.confirmation(
					confirmation,
					this._definition?.data?.confirmationMode,
					parentIdentity
				);
			}
		}
	}
}
