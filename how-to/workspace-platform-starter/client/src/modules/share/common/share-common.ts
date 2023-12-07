import type { WorkspacePlatformModule } from "@openfin/workspace-platform";
import type { EndpointClient } from "workspace-platform-starter/shapes/endpoint-shapes";
import type { Logger } from "workspace-platform-starter/shapes/logger-shapes";
import type { ShareConfirmationOptions } from "workspace-platform-starter/shapes/share-shapes";
import { isEmpty, isStringValue } from "workspace-platform-starter/utils";

/**
 * Save the request.
 * @param platform The workspace platform.
 * @param logger The logger for information.
 * @param endpointClient The endpoint client.
 * @param endpointId The endpoint id.
 * @param shareType The share type.
 * @param payload The payload to save.
 * @returns The confirmation to display.
 */
export async function saveShareRequest(
	platform: WorkspacePlatformModule,
	logger: Logger | undefined,
	endpointClient: EndpointClient | undefined,
	endpointId: string | undefined,
	shareType: string,
	payload: unknown
): Promise<ShareConfirmationOptions | undefined> {
	if (isEmpty(endpointClient)) {
		logger?.warn("Endpoint client is not available.");
		return;
	}
	if (isEmpty(endpointClient.requestResponse)) {
		logger?.warn("Endpoint client requestResponse is not available.");
		return;
	}
	if (isEmpty(endpointId)) {
		logger?.warn("Endpoint id is not available.");
		return;
	}
	try {
		const expiryInHours = 24;
		const response = await endpointClient.requestResponse<
			{ type: string; data: unknown },
			{ url: string; id?: string }
		>(endpointId, {
			type: shareType,
			data: payload
		});

		if (response) {
			let id = response.id;
			if (isEmpty(id)) {
				const indexOfId = response.url.lastIndexOf("/");
				if (indexOfId !== -1) {
					id = response.url.slice(indexOfId + 1);
				}
			}

			if (!isEmpty(id)) {
				const platformInfo = await platform.Application.getInfo();
				let finsLink: string | undefined;

				if (platformInfo.manifestUrl.startsWith("http")) {
					finsLink = `${platformInfo.manifestUrl.replace(
						"http",
						"fin"
					)}?$$shareType=${shareType}&$$payload=${btoa(JSON.stringify({ id }))}`;
				} else {
					logger?.error(
						"We do not support file based manifest launches. The manifest has to be served over http/https:",
						platformInfo.manifestUrl
					);
				}

				if (isStringValue(finsLink)) {
					await fin.Clipboard.writeText({
						data: finsLink
					});

					return {
						title: "Share Request Raised",
						message: `The share request you raised has been copied to the **clipboard** and will be valid for ${expiryInHours} hours. \n Share Url: \n * **${finsLink}**`,
						status: "shared"
					};
				}
			}
		}
	} catch (error) {
		logger?.error("Error saving share request:", error);
	}

	return {
		title: "Share Request Failed",
		message: "The share request you raised could not be generated.",
		status: "error"
	};
}

/**
 * Load the request.
 * @param logger The logger for information.
 * @param endpointClient The endpoint client.
 * @param endpointId The endpoint id.
 * @param shareType The share type.
 * @param id The id of the request to load.
 * @returns The loaded payload and any confirmation to display.
 */
export async function loadShareRequest<T>(
	logger: Logger | undefined,
	endpointClient: EndpointClient | undefined,
	endpointId: string | undefined,
	shareType: string,
	id: string
): Promise<
	| {
			payload?: T;
			confirmation: ShareConfirmationOptions | undefined;
	  }
	| undefined
> {
	if (isEmpty(endpointClient)) {
		logger?.warn("Endpoint client is not available.");
		return;
	}
	if (isEmpty(endpointClient.requestResponse)) {
		logger?.warn("Endpoint client requestResponse is not available.");
		return;
	}
	if (isEmpty(endpointId)) {
		logger?.warn("Endpoint id is not available.");
		return;
	}
	try {
		const response = await endpointClient.requestResponse<{ id: string }, { type: string; data: T }>(
			"share-get",
			{ id }
		);
		if (!isEmpty(response)) {
			if (shareType !== response.type) {
				logger?.warn(`Share entry of mismatched type specified: ${response.type} it should be ${shareType}`);
				return {
					confirmation: {
						title: "Share Load Failed",
						message: "The specified share link does not contain the correct data for the share type.",
						status: "error"
					}
				};
			}

			return {
				payload: response.data,
				confirmation: {
					title: "Share Request Applied",
					message: "The share request has been fetched and applied.",
					status: "loaded"
				}
			};
		}
		return {
			confirmation: {
				title: "Share Load Expired",
				message: "The share request has expired and is no longer available.",
				status: "error"
			}
		};
	} catch (error) {
		logger?.error("There has been an error trying to load and apply the share link.", error);
	}

	return {
		confirmation: {
			title: "Share Load Failed",
			message: "The specified share link cannot be loaded.",
			status: "error"
		}
	};
}
