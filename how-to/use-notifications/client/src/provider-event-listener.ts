import { provider } from "@openfin/workspace/notifications";

let statusIntervalId: number | undefined;
let lastConnectionStatus: boolean | undefined;

export function addEventListener(event: string, callback: (status: provider.ProviderStatus) => void) {
	if (event === "connection-changed" && statusIntervalId === undefined) {
		statusIntervalId = window.setInterval(async () => {
			const status = await provider.getStatus();
			if (status.connected !== lastConnectionStatus) {
				lastConnectionStatus = status.connected;
				callback(status);
			}
		}, 1000);
	}
}

export function removeEventListener(event: string, callback: (status: provider.ProviderStatus) => void) {
	if (event === "connection-changed" && statusIntervalId) {
		window.clearInterval(statusIntervalId);
		statusIntervalId = undefined;
		lastConnectionStatus = undefined;
	}
}
