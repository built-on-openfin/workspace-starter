export interface RaiseIntentPayload {
	name: string;
	context: OpenFin.Context;
}

export interface ShareContextPayload {
	contextGroup: string;
	context: OpenFin.Context;
}
