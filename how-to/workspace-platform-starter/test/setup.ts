import * as cryptoLib from "crypto";
import { PRIMARY_MONITOR_RECT, SECONDARY_MONITOR_RECT, TERTIARY_MONITOR_RECT } from "./common";

Object.defineProperty(globalThis, "crypto", {
	value: {
		getRandomValues: (arr) => cryptoLib.randomBytes(arr.length)
	}
});

Object.defineProperty(globalThis, "fin", {
	value: {
		System: {
			getMonitorInfo: async () => ({
				primaryMonitor: {
					monitorRect: PRIMARY_MONITOR_RECT
				},
				nonPrimaryMonitors: [
					{
						monitorRect: SECONDARY_MONITOR_RECT
					},
					{
						monitorRect: TERTIARY_MONITOR_RECT
					}
				]
			})
		}
	}
});
