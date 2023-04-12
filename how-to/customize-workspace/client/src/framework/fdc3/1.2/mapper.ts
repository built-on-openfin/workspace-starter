import type { Image } from "@openfin/workspace";
import type { PlatformApp } from "customize-workspace/shapes";
import type {
	AppInterop,
	AppIntents as FDC3TwoPointZeroAppIntents
} from "customize-workspace/shapes/fdc3-2-0-shapes";
import type { AppDefinition, AppIcon, AppImage, AppIntents, AppMetadata } from "../../shapes/fdc3-1-2-shapes";

function getIcons(icons: AppIcon[]): Image[] {
	const appIcons: Image[] = [];
	if (!Array.isArray(icons)) {
		return appIcons;
	}
	for (const appIcon of icons) {
		appIcons.push({ src: appIcon.icon });
	}
	return appIcons;
}

function getImages(images: AppImage[]): Image[] {
	const appImages: Image[] = [];
	if (!Array.isArray(images)) {
		return appImages;
	}
	for (const appImage of images) {
		appImages.push({ src: appImage.url });
	}
	return appImages;
}

function getManifest(app: AppDefinition): unknown {
	if (typeof app.manifest === "string" && app.manifest.startsWith("{")) {
		return JSON.parse(app.manifest);
	}

	return app.manifest;
}

function getTags(app: AppDefinition & { tags?: string[] }): string[] {
	const tags: string[] = app.tags ?? [];
	if (tags.length === 0) {
		tags.push(app.manifestType);
	}

	return tags;
}

function getPrivate(app: AppDefinition): boolean {
	return getValue(app?.customConfig?.private, false);
}

function getAutostart(app: AppDefinition): boolean {
	return getValue(app?.customConfig?.autostart, false);
}

function getValue(flag: string | boolean, defaultFlag: boolean) {
	if (flag !== undefined && flag !== null && flag !== "") {
		switch (flag) {
			case "False":
			case "false":
			case false:
				return false;
			case "True":
			case "true":
			case true:
				return true;
			default:
				// if someone has defined a flag then the likely hood was to override the default value
				return !defaultFlag;
		}
	}
	return defaultFlag;
}

export function getInterop(intents: AppIntents[]): AppInterop {
	const listensFor: { [key: string]: FDC3TwoPointZeroAppIntents } = {};

	for (const intent of intents) {
		listensFor[intent.name] = {
			contexts: intent.contexts,
			customConfig: intent.customConfig,
			displayName: intent.displayName
		};
	}

	const interop: AppInterop = {
		intents: { listensFor }
	};

	return interop;
}

export function mapToPlatformApp(app: AppDefinition): PlatformApp {
	const platformApp: PlatformApp = {
		appId: app.appId,
		name: app.name ?? app.appId,
		title: app.title || app.name,
		manifestType: app.manifestType,
		manifest: getManifest(app) as string,
		description: app.description,
		customConfig: app.customConfig,
		intents: app.intents,
		interop: getInterop(app.intents),
		tags: getTags(app),
		version: app.version,
		publisher: app.publisher,
		contactEmail: app.contactEmail,
		supportEmail: app.supportEmail,
		icons: getIcons(app.icons),
		images: getImages(app.images),
		private: getPrivate(app),
		autostart: getAutostart(app),
		instanceMode: app.customConfig?.instanceMode,
		tooltip: app.tooltip
	};
	return platformApp;
}

export function mapToPlatformApps(apps: AppDefinition[]): PlatformApp[] {
	const platformApps: PlatformApp[] = [];

	for (const app of apps) {
		platformApps.push(mapToPlatformApp(app));
	}

	return platformApps;
}

export function mapToAppMetaData(app: PlatformApp): AppMetadata {
	const icons: string[] = [];
	const images: string[] = [];
	if (Array.isArray(app.icons)) {
		for (const icon of app.icons) {
			if (icon.src !== undefined) {
				icons.push(icon.src as string);
			}
		}
	}
	if (Array.isArray(app.images)) {
		for (const image of app.images) {
			if (image.src !== undefined) {
				images.push(image.src as string);
			}
		}
	}
	const appMetaData: AppMetadata = {
		appId: app.appId,
		description: app.description,
		icons,
		images,
		name: app.appId,
		title: app.title,
		tooltip: app.tooltip,
		version: app.version
	};
	return appMetaData;
}
