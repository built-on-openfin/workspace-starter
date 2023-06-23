import type { Image } from "@openfin/workspace";
import type { PlatformApp } from "../../shapes";
import type { AppDefinition, AppIcon, AppImage, AppIntents, AppMetadata } from "../../shapes/fdc3-1-2-shapes";
import type { AppInterop, AppIntents as FDC3TwoPointZeroAppIntents } from "../../shapes/fdc3-2-0-shapes";
import { isBoolean, isEmpty, isStringValue } from "../../utils";

/**
 * Map the app definition to a platform app.
 * @param app The app definition to map.
 * @returns The platform app.
 */
export function mapToPlatformApp(app: AppDefinition): PlatformApp {
	const platformApp: PlatformApp = {
		appId: app.appId,
		name: app.name ?? app.appId,
		title: app.title ?? app.name,
		manifestType: app.manifestType,
		manifest: getManifest(app) as string,
		description: app.description,
		customConfig: app.customConfig,
		intents: app.intents,
		interop: mapInterop(app.intents),
		tags: mapTags(app),
		version: app.version,
		publisher: app.publisher ?? "",
		contactEmail: app.contactEmail,
		supportEmail: app.supportEmail,
		icons: mapIcons(app.icons),
		images: mapImages(app.images),
		private: mapPrivate(app),
		autostart: mapAutostart(app),
		instanceMode: app.customConfig?.instanceMode,
		tooltip: app.tooltip
	};
	return platformApp;
}

/**
 * Map the platform app to app metadata.
 * @param app The application to map.
 * @returns The app metadata.
 */
export function mapToAppMetaData(app: PlatformApp): AppMetadata {
	const icons: string[] = [];
	const images: string[] = [];
	if (Array.isArray(app.icons)) {
		for (const icon of app.icons) {
			if (!isEmpty(icon.src)) {
				icons.push(icon.src);
			}
		}
	}
	if (Array.isArray(app.images)) {
		for (const image of app.images) {
			if (!isEmpty(image.src)) {
				images.push(image.src);
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

/**
 * Map the app definition interop data to app interop format.
 * @param intents The intents to map.
 * @returns The app interop.
 */
export function mapInterop(intents: AppIntents[] | undefined): AppInterop | undefined {
	if (isEmpty(intents)) {
		return;
	}

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

/**
 * Map the icon format.
 * @param icons The icons to map.
 * @returns The mapped icons.
 */
function mapIcons(icons: AppIcon[] | undefined): Image[] {
	if (!Array.isArray(icons)) {
		return [];
	}
	const appIcons: Image[] = [];
	for (const appIcon of icons) {
		appIcons.push({ src: appIcon.icon });
	}
	return appIcons;
}

/**
 * Map the image format.
 * @param images The images to map.
 * @returns The mapped images.
 */
function mapImages(images: AppImage[] | undefined): Image[] {
	if (!Array.isArray(images)) {
		return [];
	}
	const appImages: Image[] = [];
	for (const appImage of images) {
		appImages.push({ src: appImage.url });
	}
	return appImages;
}

/**
 * Get the manifest which can be plain string or JSON.
 * @param app The app to get the manifest from.
 * @returns The manifest.
 */
function getManifest(app: AppDefinition): unknown {
	if (typeof app.manifest === "string" && app.manifest.startsWith("{")) {
		return JSON.parse(app.manifest);
	}

	return app.manifest;
}

/**
 * Map the tags.
 * @param app The app definition to map the tags for.
 * @returns The mapped tags,
 */
function mapTags(app: AppDefinition & { tags?: string[] }): string[] {
	const tags: string[] = app.tags ?? app.categories ?? [];
	if (tags.length === 0) {
		tags.push(app.manifestType);
	}

	return tags;
}

/**
 * Map the private flag.
 * @param app The app containing the app.
 * @returns The flag or false if not found.
 */
function mapPrivate(app: AppDefinition): boolean {
	return mapBooleanValue(app?.customConfig?.private, false);
}

/**
 * Map the autostart flag.
 * @param app The app containing the app.
 * @returns The flag or false if not found.
 */
function mapAutostart(app: AppDefinition): boolean {
	return mapBooleanValue(app?.customConfig?.autostart, false);
}

/**
 * Map a boolean or string to a real boolean value.
 * @param flag The flag to convert.
 * @param defaultFlag The default value if missing.
 * @returns The mapped flag.
 */
function mapBooleanValue(flag: string | boolean | undefined, defaultFlag: boolean): boolean {
	if (isStringValue(flag) || isBoolean(flag)) {
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
