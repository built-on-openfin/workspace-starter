import type { WorkspacePlatformModule } from "@openfin/workspace-platform";
import type { EndpointClient } from "workspace-platform-starter/shapes/endpoint-shapes";
import type { Logger } from "workspace-platform-starter/shapes/logger-shapes";
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
export async function saveShareRequest<T>(
	platform: WorkspacePlatformModule,
	logger: Logger | undefined,
	endpointClient: EndpointClient | undefined,
	endpointId: string | undefined,
	shareType: string,
	payload: T
): Promise<
	| {
			title: string;
			message: string;
			isError: boolean;
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
		const expiryInHours = 24;
		const response = await endpointClient.requestResponse<
			{ type: string; data: { payload: T } },
			{ url: string; id?: string }
		>("share-save", {
			type: shareType,
			data: {
				payload
			}
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
						isError: false
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
		isError: true
	};
}
