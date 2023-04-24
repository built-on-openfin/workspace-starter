import type OpenFin from "@openfin/core";

export function interopOverride(
	InteropBroker: OpenFin.Constructor<OpenFin.InteropBroker>,
	provider?: OpenFin.ChannelProvider,
	options?: OpenFin.InteropBrokerOptions,
	...args: unknown[]
): OpenFin.InteropBroker {
	class InteropOverride extends InteropBroker {
		public async handleFiredIntent(intent: OpenFin.Intent) {
			console.log("Received request for a raised intent:", intent);
			const targetIdentity = { uuid: fin.me.identity.uuid, name: "bbgTest" };
			await super.setIntentTarget(intent, targetIdentity);
		}
	}

	return new InteropOverride();
}
