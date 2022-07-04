import { provider } from "@openfin/workspace/notifications";

let statusInterval: number | undefined;
let lastConnectionStatus: boolean | undefined;

export function addEventListener(event: string, callback: (status: provider.ProviderStatus) => void) {
	if (event === "connection-changed" && statusInterval === undefined) {
		window.setInterval(async () => {
			const status = await provider.getStatus();
			if (status.connected !== lastConnectionStatus) {
				lastConnectionStatus = status.connected;
				callback(status);
			}
		}, 1000);
	}
}

export function removeEventListener(event: string, callback: (status: provider.ProviderStatus) => void) {
	if (event === "connection-changed" && statusInterval) {
		window.clearInterval(statusInterval);
		statusInterval = undefined;
		lastConnectionStatus = undefined;
	}
}
