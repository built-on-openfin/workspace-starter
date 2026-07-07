import * as cryptoLib from "crypto";
import { PRIMARY_MONITOR_RECT, SECONDARY_MONITOR_RECT, TERTIARY_MONITOR_RECT } from "./common";

Object.defineProperty(globalThis, "crypto", {
	value: {
		getRandomValues: (arr: Uint8Array) => cryptoLib.randomBytes(arr.length)
	}
});

Object.defineProperty(globalThis, "fin", {
	value: {
		me: {
			identity: {
				uuid: "test-platform"
			}
		},
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
			}),
			getMousePosition: async () => ({ left: 0, top: 0 })
		}
	}
});
