import type { ClientIdentity } from "@openfin/core/src/OpenFin";

export interface IntentRegistrationPayload {
	fdc3Version: string;
	handlerId: string;
}

export interface IntentRegistrationEntry {
	fdc3Version: string;
	clientIdentity: ClientIdentity;
	appId?: string;
}
