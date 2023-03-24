import type { ClientIdentity } from "@openfin/core/src/OpenFin";
import type { AppIntent } from "@openfin/workspace-platform";
import type { PlatformApp } from "./app-shapes";

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

export interface IntentOptions {
	/** How long should the broker wait after launching a view/window for it to register an intent handler. The default is 5000 (5 seconds) */
	intentTimeout?: number;
	/** If an unregistered app is included here then it indicates you wish to support selecting views/windows that are not linked to an app from
	 * an intent picker that supports instances. The intents and contexts in this app specify which you support for unregistered instances.
	 * Do not specify a manifest or manifestType for this entry (we don't launch unregistered apps so there is no need for a manifest as it
	 * is existing instances and we specify a custom manifestType for consideration when we are bringing an unregistered web app instance into focus).
	 * */
	unregisteredApp?: PlatformApp;
}

export interface IntentPickerOptions {
	/** The url of the html page that has the intent picker */
	url: string;
	/** the height you wish the window to be */
	height?: number;
	/** the width you wish the window to be */
	width?: number;
	/** the fdc3 api version this picker will support (default is v2) */
	fdc3InteropApi?: string;
	/** A suggested title for the intent picker/resolver ui */
	title?: string;
}
export interface PlatformInteropBrokerOptions {
	/** Intent Picker configuration if you wish to support intents. It needs to support the functions required by the platform */
	intentPicker?: IntentPickerOptions;
	intentOptions: IntentOptions;
}
