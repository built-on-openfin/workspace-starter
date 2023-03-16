import type { ClientIdentity } from "@openfin/core/src/OpenFin";
import type { AppIntent } from "@openfin/workspace-platform";

export interface IntentRegistrationPayload {
	fdc3Version: string;
	handlerId: string;
}

export interface IntentRegistrationEntry {
	fdc3Version: string;
	clientIdentity: ClientIdentity;
	appId?: string;
}

export type IntentTargetMetaData = string | { appId: string; instanceId?: string };

export interface IntentPickerResponse {
	appId: string;
	instanceId?: string;
	intent: Partial<AppIntent>;
}
