import type { Image } from "@openfin/workspace";
import type { PlatformApp } from "../../shapes";
import type { AppDefinition, AppIcon, AppImage, AppIntents, AppMetadata, CustomConfig } from "../../shapes/fdc3-1-2-shapes";
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
		manifest: getManifestFromFDC3(app) as string,
		description: app.description,
		customConfig: app.customConfig,
		intents: app.intents,
		interop: mapInteropFromFDC3(app.intents),
		tags: mapTagsFromFDC3(app),
		version: app.version,
		publisher: app.publisher ?? "",
		contactEmail: app.contactEmail,
		supportEmail: app.supportEmail,
		icons: mapIconsFromFDC3(app.icons),
		images: mapImagesFromFDC3(app.images),
		private: mapPrivateFromFDC3(app),
		autostart: mapAutostartFromFDC3(app),
		instanceMode: app.customConfig?.instanceMode,
		tooltip: app.tooltip
	};
	return platformApp;
}

/**
 * Map a platform app to an FDC3 1.2 app definition.
 * @param app The app definition to map.
 * @returns The fdc3 1.2 app.
 */
export function mapToFDC3App(app: PlatformApp): AppDefinition {
	const manifestType: string = `${app.manifestType}`;

	const fdc3App: AppDefinition = {
		appId: app.appId,
		name: app.name ?? app.appId,
		title: app.title ?? app.name,
		manifestType,
		manifest: app.manifest as string,
		description: app.description,
		customConfig: mapCustomConfigFromPlatformApp(app),
		intents: mapIntentsFromPlatformApp(app),
		categories: app.tags ?? [],
		version: app.version,
		publisher: app.publisher ?? "",
		contactEmail: app.contactEmail,
		supportEmail: app.supportEmail,
		icons: mapIconsFromPlatformApp(app),
		images: mapImagesFromPlatformApp(app),
		tooltip: app.tooltip
	};
	return fdc3App;
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
export function mapInteropFromFDC3(intents: AppIntents[] | undefined): AppInterop | undefined {
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
 * Maps the intents from a platform app to an FDC3 1.2 intents array.
 * @param app The platform app to use as a source
 * @returns an Array of Intents in FDC3 1.2 format
 */
function mapIntentsFromPlatformApp(app: PlatformApp): AppIntents[] {
	const intents: AppIntents[] = [];
	const passedIntents = app.interop?.intents?.listensFor;
	if(!isEmpty(passedIntents)) {
		const keys = Object.keys(passedIntents);
		for(const key of keys) {
			const displayName: string = passedIntents[key].displayName ?? key;
			intents.push({ name: key,
				displayName,
				contexts: passedIntents[key].contexts,
				customConfig: passedIntents[key].customConfig });
		}
	}
	if(intents.length === 0 && !isEmpty(app.intents)) {
		return app.intents;
	}
	return intents;
}

/**
 * Takes a platform app and returns an FDC3 custom config object.
 * @param app The platform app to map into a customConfig object.
 * @returns an FDC3 1.2 customConfig object based on the platform app settings.
 */
function mapCustomConfigFromPlatformApp(app: PlatformApp): CustomConfig {
	const config: CustomConfig = {
		"autostart": mapBooleanValue(app?.autostart, false).toString(),
		"instanceMode": app.instanceMode,
		"private": mapBooleanValue(app.private, false).toString()
	};
	return config;
}

/**
 * Map the icon format.
 * @param icons The icons to map.
 * @returns The mapped icons.
 */
function mapIconsFromFDC3(icons: AppIcon[] | undefined): Image[] {
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
 * Takes a Platform App and converts icons so they are in FDC3 1.2 format.
 * @param app The platform app to use as a source.
 * @returns The array of app icons in FDC3 1.2 format.
 */
function mapIconsFromPlatformApp(app: PlatformApp): AppIcon[] {
	if(!Array.isArray(app.icons)) {
		return [];
	}
	const appIcons: AppIcon[] = [];
	for (const appIcon of app.icons) {
		appIcons.push({ icon: appIcon.src });
	}
	return appIcons;
}

/**
 * Map the image format.
 * @param images The images to map.
 * @returns The mapped images.
 */
function mapImagesFromFDC3(images: AppImage[] | undefined): Image[] {
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
 * Returns an array of images in FDC3 1.2 format from a Platform App.
 * @param app The platform app to use as a source.
 * @returns The mapped images.
 */
function mapImagesFromPlatformApp(app: PlatformApp): AppImage[] {
	if (!Array.isArray(app.images)) {
		return [];
	}
	const appImages: AppImage[] = [];
	for (const appImage of app.images) {
		appImages.push({ url: appImage.src });
	}
	return appImages;
}

/**
 * Get the manifest which can be plain string or JSON.
 * @param app The app to get the manifest from.
 * @returns The manifest.
 */
function getManifestFromFDC3(app: AppDefinition): unknown {
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
function mapTagsFromFDC3(app: AppDefinition & { tags?: string[] }): string[] {
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
function mapPrivateFromFDC3(app: AppDefinition): boolean {
	return mapBooleanValue(app?.customConfig?.private, false);
}

/**
 * Map the autostart flag.
 * @param app The app containing the app.
 * @returns The flag or false if not found.
 */
function mapAutostartFromFDC3(app: AppDefinition): boolean {
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
