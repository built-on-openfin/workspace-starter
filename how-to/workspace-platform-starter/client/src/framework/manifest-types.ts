import type { ManifestTypes } from "./shapes";

export const MANIFEST_TYPES: ManifestTypes = {
	View: {
		id: "view",
		label: "View",
		description:
			"This manifest type expects the manifest setting to be pointed to a json file that contains view options."
	},
	InlineView: {
		id: "inline-view",
		label: "View",
		description:
			"This manifest type expects the manifest setting to have the options inline rather than a url to a json file."
	},
	Window: {
		id: "window",
		label: "Window",
		description:
			"This manifest type expects the manifest setting to point to a json file that contains classic window options."
	},
	InlineWindow: {
		id: "inline-window",
		label: "Window",
		description:
			"This manifest type expects the manifest setting to have the classic window options inline rather than a url to a json file."
	},
	Snapshot: {
		id: "snapshot",
		label: "Snapshot",
		description:
			"This manifest type expects the manifest setting to point to a json file that contains a snapshot (one or more windows)"
	},
	InlineSnapshot: {
		id: "inline-snapshot",
		label: "Snapshot",
		description:
			"This manifest type expects the manifest setting to have a snapshot inline rather than a url to a json file that contains a snapshot (one or more windows)"
	},
	Manifest: {
		id: "manifest",
		label: "App",
		description:
			"This manifest type expects the manifest setting to point to a json file that is an openfin manifest. An openfin app."
	},
	External: {
		id: "external",
		label: "Native App",
		description: "This manifest type expects the manifest setting to point to an exe."
	},
	InlineExternal: {
		id: "inline-external",
		label: "Native App",
		description:
			"This manifest type expects the manifest setting to point to an exe using an inline launch external process request."
	},
	Appasset: {
		id: "appasset",
		label: "Native App",
		description: "This manifest type expects the manifest setting to point to an app asset name."
	},
	InlineAppAsset: {
		id: "inline-appasset",
		label: "Native App",
		description:
			"This manifest type expects the manifest setting to point to an app asset config using an inline launch external process request."
	},
	DesktopBrowser: {
		id: "desktop-browser",
		label: "Desktop Browser",
		description:
			"This manifest type expects the manifest setting to point to a url which will be launched in the default desktop browser."
	},
	Endpoint: {
		id: "endpoint",
		label: "Endpoint",
		description:
			"This manifest type expects the manifest setting to point to an endpoint (which should be defined in the endpointProvider). Action will be called on that endpoint and passed the specified app."
	},
	Connection: {
		id: "connection",
		label: "Connected App",
		description:
			"This manifest type expects the manifest setting to have a uuid. This must match to a connection registered in the connectionProvider with app support."
	},
	UnregisteredApp: {
		id: "unregistered-app",
		label: "Unregistered App",
		description:
			"This manifest type represents web page instances that have been launched that are not linked to an app. This manifest type should not be in the permitted manifest type list for app feeds as it is for dynamic urls."
	}
};
