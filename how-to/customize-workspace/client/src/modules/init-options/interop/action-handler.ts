import { fin } from "@openfin/core";

interface RaiseIntentPayload {
	name: string;
	context: OpenFin.Context;
}

interface ShareContextPayload {
	contextGroup: string;
	context: OpenFin.Context;
}

async function raiseIntent(payload: RaiseIntentPayload) {
	const brokerClient = fin.Interop.connectSync(fin.me.identity.uuid, {});
	console.log(
		`init options interop handler: received intent to raise. Intent Request ${JSON.stringify(
			payload,
			null,
			4
		)}.`
	);
	await brokerClient.fireIntent(payload);
}

async function shareContext(payload: ShareContextPayload) {
	const brokerClient = fin.Interop.connectSync(fin.me.identity.uuid, {});
	const contextGroups = await brokerClient.getContextGroups();
	const targetContextGroup = contextGroups.find((group) => group.id === payload.contextGroup);
	if (targetContextGroup !== undefined) {
		await brokerClient.joinContextGroup(targetContextGroup.id);
		console.log(
			`init options interop handler: received context to send. Context Group ${
				targetContextGroup.id
			}. Context: ${JSON.stringify(payload.context, null, 4)}`
		);
		await brokerClient.setContext(payload.context);
	}
}

export async function init() {
	// the init function could be passed limits (e.g. only support the following intents or contexts. Only publish to the following context groups etc.)
	console.log(`init options interop handler: The interop init options action handler has been loaded`);
}

export async function action(
	requestedAction: string,
	payload?: RaiseIntentPayload | ShareContextPayload
): Promise<void> {
	if (payload === undefined) {
		console.warn(
			`init options interop handler: Actions passed to the interop init options module require a payload to be passed. Requested action: ${requestedAction} can not be fulfilled.`
		);
		return;
	}
	try {
		switch (requestedAction) {
			case "raise-intent": {
				await raiseIntent(payload as RaiseIntentPayload);
				break;
			}
			case "share-context": {
				await shareContext(payload as ShareContextPayload);
				break;
			}
		}
	} catch (error) {
		console.error(`init options interop handler: Error trying to perform action ${requestedAction}.`, error);
	}
}
